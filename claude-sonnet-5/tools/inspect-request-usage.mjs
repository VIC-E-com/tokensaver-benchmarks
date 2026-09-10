import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=process.argv[2],taskFilter=process.argv[3];
assert(/^\/home\/bench\/ts-sonnet-real-[a-zA-Z0-9-]+$/.test(root));
for(const {task,arm,pair}of JSON.parse(fs.readFileSync(root+'/schedule.json'))){
 if(taskFilter&&task!==taskFilter)continue;
 const dir=`${root}/${task}/runs/pair${pair}-${arm}`;
 if(!fs.existsSync(dir+'/summary.json'))continue;
 const requests=new Map(),tools=new Set();let final;
 for(const line of fs.readFileSync(dir+'/events.jsonl','utf8').trim().split('\n')){
  const e=JSON.parse(line);if(e.type==='result')final=e;
  if(e.type!=='assistant')continue;
  const m=e.message,r=requests.get(m.id)??{tools:[],edit_bytes:0};r.usage=m.usage;
  for(const b of m.content??[])if(b.type==='tool_use'&&!tools.has(b.id)){
   tools.add(b.id);r.tools.push(b.name);
   if(['Edit','Write'].includes(b.name))r.edit_bytes+=Buffer.byteLength(b.input.new_string??b.input.content??'');
  }
  requests.set(m.id,r);
 }
 const rows=[...requests.values()].map((r,i)=>({request:i+1,tools:r.tools,edit_bytes:r.edit_bytes,usage:r.usage}));
 const keys=['input_tokens','cache_read_input_tokens','cache_creation_input_tokens','output_tokens'];
 const sums=Object.fromEntries(keys.map(k=>[k,rows.reduce((s,r)=>s+(r.usage?.[k]??NaN),0)]));
 console.log(JSON.stringify({task,arm,pair,per_request_sums_match_final:keys.every(k=>sums[k]===final.usage[k]),sums,final_usage:final.usage,rows}));
}
