// Read-only listing of every tool call in completed trials. No model reasoning text is emitted.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.argv[2];
assert(/^\/home\/bench\/ts-sonnet-real-[a-zA-Z0-9-]+$/.test(root));
for(const {task,arm,pair}of JSON.parse(fs.readFileSync(root+'/schedule.json'))){
 const dir=path.join(root,task,'runs',`pair${pair}-${arm}`);
 if(!fs.existsSync(dir+'/summary.json'))continue;
 const calls=new Map(),results=new Map();
 for(const line of fs.readFileSync(dir+'/events.jsonl','utf8').trim().split('\n')){
  const e=JSON.parse(line);
  for(const b of e.message?.content??[]){
   if(e.type==='assistant'&&b.type==='tool_use'&&!calls.has(b.id))calls.set(b.id,{request:e.message.id,...b});
   if(e.type==='user'&&b.type==='tool_result')results.set(b.tool_use_id,b);
  }
 }
 const rows=[...calls.values()].map(c=>{
  const r=results.get(c.id);
  const input=['Edit','Write'].includes(c.name)?{file_path:c.input.file_path}:c.input;
  return{request:c.request,name:c.name,input,error:r?.is_error??null,result_bytes:r?Buffer.byteLength(JSON.stringify(r.content)):null};
 });
 console.log(JSON.stringify({task,arm,pair,requests:new Set(rows.map(r=>r.request)).size,rows}));
}
