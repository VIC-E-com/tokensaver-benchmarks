import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {priceRequest} from './usage.mjs';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fields=['input_tokens','cached_input_tokens','cache_write_input_tokens','output_tokens'];
for(const [cohort,expected] of [['e',18],['f',6],['g',6],['h',18],['j',6],['k',6],['l',6],['m',6],['n',18],['o',6],['p',6]]) {
 const dir=path.join(base,'evidence',cohort);
 const audit=JSON.parse(fs.readFileSync(path.join(dir,'independent-audit.json')));
 const schedule=JSON.parse(fs.readFileSync(path.join(dir,'schedule.json')));
 const requests=fs.readFileSync(path.join(dir,'request-usage.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
 assert.equal(audit.rows.length,expected);assert.equal(schedule.length,expected);
 const key=r=>`${r.task}/${r.pair}/${r.arm}`;
 assert.equal(new Set(schedule.map(key)).size,expected);
 assert.deepEqual(audit.rows.map(key).sort(),schedule.map(key).sort());
 const known=new Set(audit.rows.map(key));
 for(const q of requests)assert(known.has(key(q)));
 const totals={raw:0n,vice:0n};
 for(const row of audit.rows){
  const rr=requests.filter(r=>key(r)===key(row));assert(rr.length>0);
  let cost=0n;const counts=Object.fromEntries(fields.map(k=>[k,0]));
  for(const [i,q] of rr.entries()){
   assert.equal(q.request,i+1);const dollars=priceRequest(q);
   assert.equal(dollars.toString(),q.api_equivalent_nanousd);cost+=dollars;
   for(const field of fields)counts[field]+=q[field];
  }
  assert.equal(cost.toString(),row.cost_nanousd);
  assert.equal(Number(cost)/1e9,row.cost_usd);
  for(const field of fields)assert.equal(counts[field],row.priced_usage[field]);
  for(const field of ['input_tokens','cached_input_tokens','output_tokens'])assert.equal(counts[field],row.provider_usage[field]);
  assert.equal(row.correct,true);totals[row.arm]+=cost;
 }
 for(const arm of ['raw','vice'])assert.equal(totals[arm].toString(),audit.totals[arm].cost_nanousd);
 const arithmetic=100*(1-Number(totals.vice)/Number(totals.raw));
 if(cohort==='k'){
  assert.equal(audit.clean_comparison,false);
  assert.equal(audit.aggregate_savings_percent,null);
  assert.equal(audit.qualification_savings_percent,null);
  assert.equal(audit.failed_request_usage_unreported,true);
  assert(Math.abs(audit.recorded_usage_savings_percent-arithmetic)<1e-10);
  const recovered=audit.rows.filter(r=>r.recovery);assert.equal(recovered.length,1);
  assert.equal(recovered[0].arm,'raw');assert.equal(recovered[0].cost_upper_bound_usd,null);
  assert.equal(audit.totals.raw.cost_upper_bound_usd,null);
  const rr=requests.filter(r=>key(r)===key(recovered[0]));
  assert.deepEqual([...new Set(rr.map(r=>r.attempt))],[1,2]);
  assert.equal(recovered[0].recovery.failed_request_usage_unreported,true);
  assert.equal(recovered[0].recovery.clean_comparison,false);
 }else assert(Math.abs(audit.aggregate_savings_percent-arithmetic)<1e-10);
 if(['h','j','k','l','m','n','o','p'].includes(cohort))assert.equal(audit.hook_log_complete,true);
 if(cohort==='p') {
  const facts=JSON.parse(fs.readFileSync(path.join(dir,'startup-facts.json')));
  assert.equal(facts.complete,true);assert.equal(facts.rows.length,expected);
  assert.deepEqual(facts.rows.map(key).sort(),schedule.map(key).sort());
  for(const row of facts.rows) {
   assert.equal(row.injected,row.arm==='vice');
   if(row.injected) { assert.equal(row.independent_replay_equal,true);assert.equal(row.source_bytes,0);assert(row.context_bytes>0&&row.context_bytes<=8192);assert(/^[a-f0-9]{64}$/.test(row.context_sha256)); }
  }
 }
 console.log(`${cohort.toUpperCase()}: ${expected} trials, ${requests.length} requests; token buckets and costs verified.`);
}
