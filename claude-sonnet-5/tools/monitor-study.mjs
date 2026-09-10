import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.argv[2];
assert(/^\/home\/bench\/ts-sonnet-real-[a-zA-Z0-9-]+$/.test(root));
const schedule=JSON.parse(fs.readFileSync(root+'/schedule.json'));
const rows=schedule.map(({task,arm,pair})=>{
 const dir=path.join(root,task,'runs',`pair${pair}-${arm}`);
 if(fs.existsSync(dir+'/summary.json')){
  const s=JSON.parse(fs.readFileSync(dir+'/summary.json'));
  return {task,arm,pair,status:'finished',correct:s.quality.passed,success:s.agent_success,seconds:s.elapsed_seconds,cost:s.usage.api_equivalent_nanousd/1e9,tools:s.tool_calls};
 }
 if(!fs.existsSync(dir))return{task,arm,pair,status:'pending'};
 const events=dir+'/events.jsonl';
 return{task,arm,pair,status:'started',event_bytes:fs.existsSync(events)?fs.statSync(events).size:0,last_event:fs.existsSync(events)?fs.statSync(events).mtime.toISOString():null};
});
console.log(JSON.stringify({time:new Date().toISOString(),complete:fs.existsSync(root+'/confirmation-complete.json'),rows,log_tail:fs.existsSync(root+'/logs/run.log')?fs.readFileSync(root+'/logs/run.log','utf8').split('\n').slice(-7):[]},null,2));
