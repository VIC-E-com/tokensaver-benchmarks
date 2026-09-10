import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.argv[2];if(!root)throw Error('Study root required');
const rows=[];const missing=[];
let schedule;
try { schedule=JSON.parse(await fs.readFile(path.join(root,'schedule.json'))); }
catch(e) { if(e.code!=='ENOENT')throw e; schedule=['duration-carry','utc-offset','symlink-traversal'].flatMap(task=>['raw','vice'].map(arm=>({task,arm,pair:1}))); }
assert(Array.isArray(schedule)&&schedule.length>0);
assert.equal(new Set(schedule.map(x=>`${x.task}/${x.pair}/${x.arm}`)).size,schedule.length);
for(const {task:id,arm,pair} of schedule){
  assert(/^[a-z0-9-]+$/.test(id)&&['raw','vice'].includes(arm)&&Number.isSafeInteger(pair)&&pair>0);
  const trial=path.join(root,id,'runs',`pair${pair}-${arm}`);let s;
  try{s=JSON.parse(await fs.readFile(path.join(trial,'summary.json')));}catch(e){if(e.code==='ENOENT'){missing.push(`${id}/${arm}`);continue;}throw e;}
  let result;let count=0;
  for await(const line of createInterface({input:createReadStream(path.join(trial,'events.jsonl')),crlfDelay:Infinity})){
   if(!line)continue;const e=JSON.parse(line);if(e.type==='result'){result=e;count++;}
  }
  assert.equal(count,1); // Failed but metered attempts also remain in the denominator.
  assert.deepEqual(Object.keys(result.modelUsage),['claude-sonnet-5']);
  const u=result.usage;const n=k=>{assert(Number.isSafeInteger(u[k])&&u[k]>=0,k);return BigInt(u[k]);};
  const i=n('input_tokens'),r=n('cache_read_input_tokens'),w=n('cache_creation_input_tokens'),o=n('output_tokens');
  const c=u.cache_creation;assert(c&&typeof c==='object');
  const w5=BigInt(c.ephemeral_5m_input_tokens),w1=BigInt(c.ephemeral_1h_input_tokens);assert.equal(w5+w1,w);
  const cost=i*2000n+r*200n+w5*2500n+w1*4000n+o*10000n;
  assert.equal(BigInt(s.usage.api_equivalent_nanousd),cost);
  const resources=JSON.parse(await fs.readFile(path.join(trial,'resources.json')));
  const after=JSON.parse(await fs.readFile(path.join(trial,'stats-after.json')));
  const before=JSON.parse(await fs.readFile(path.join(trial,'stats-before.json')));
  let provider_delta=null;
  if(arm==='vice') {
   const a=after.provider_usage,b=before.provider_usage;
   assert(a&&b);assert.equal(a.session_started_unix_ms,b.session_started_unix_ms);
   assert.equal(a.telemetry_complete,true);assert.equal(a.pricing_complete,true);assert.equal(a.overflow,false);
   const delta=k=>{const x=a[k],y=b.observed===0&&b[k]===null?0:b[k];assert(Number.isFinite(x)&&Number.isFinite(y)&&x>=y,k);return x-y;};
   const fields={input_tokens:Number(i+r+w),cached_input_tokens:Number(r),cache_write_input_tokens:Number(w),cache_write_1h_input_tokens:Number(w1),output_tokens:Number(o)};
   provider_delta=Object.fromEntries(Object.entries(fields).map(([k,expected])=>{const actual=delta(k);assert.equal(actual,expected,`${id}/${pair}/${k}`);return [k,actual];}));
   provider_delta.cost_usd=delta('cost_usd');
   assert(Math.abs(provider_delta.cost_usd-Number(cost)/1e9)<0.5e-9,'provider cost delta differs from original events');
   assert.equal(delta('missing'),0);
  }
  rows.push({task:id,arm,pair,correct:s.quality.passed,agent_success:s.agent_success,ordinary_input:Number(i),cached_input:Number(r),cache_write_5m:Number(w5),cache_write_1h:Number(w1),new_input:Number(i+w),all_input:Number(i+r+w),output_including_thinking:Number(o),api_equivalent_nanousd:Number(cost),api_equivalent_usd:Number(cost)/1e9,cli_cost_diagnostic:result.total_cost_usd,seconds:s.elapsed_seconds,tool_calls:s.tool_calls,resources,provider_delta});
}
const pairs=[];
for(const key of new Set(schedule.map(x=>`${x.task}/${x.pair}`))){
 const [task,p]=key.split('/'),pair=Number(p);
 const r=rows.find(x=>x.task===task&&x.pair===pair&&x.arm==='raw'),v=rows.find(x=>x.task===task&&x.pair===pair&&x.arm==='vice');
 if(r&&v)pairs.push({task,pair,raw_usd:r.api_equivalent_usd,vice_usd:v.api_equivalent_usd,savings_percent:100*(r.api_equivalent_nanousd-v.api_equivalent_nanousd)/r.api_equivalent_nanousd,both_correct:r.correct&&v.correct,raw_seconds:r.seconds,vice_seconds:v.seconds});
}
const totals=Object.fromEntries(['raw','vice'].map(arm=>[arm,Object.fromEntries(['ordinary_input','cached_input','cache_write_5m','cache_write_1h','new_input','all_input','output_including_thinking','api_equivalent_nanousd','seconds','tool_calls'].map(k=>[k,rows.filter(r=>r.arm===arm).reduce((n,r)=>n+r[k],0)]))]));
const report={status:missing.length?'incomplete':'complete',scope:'internal development pilot; not a public savings claim',missing,rows,pairs,totals,aggregate_savings_percent:missing.length?null:100*(totals.raw.api_equivalent_nanousd-totals.vice.api_equivalent_nanousd)/totals.raw.api_equivalent_nanousd};
await fs.writeFile(path.join(root,'independent-audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({status:report.status,completed:rows.length,pairs,aggregate_savings_percent:report.aggregate_savings_percent},null,2));
