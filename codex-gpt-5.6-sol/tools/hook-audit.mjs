// A malformed auxiliary hook log cannot be repaired into invented observations.
export function auditHookLog(text) {
  const records=[],invalid=[];
  const lines=text.split('\n');
  for(const [index,line]of lines.entries()){
    if(!line.trim())continue;
    try{
      const v=JSON.parse(line);
      if(!v||Array.isArray(v)||typeof v.installed_app_success!=='boolean'||typeof v.modified_command!=='boolean'||!['elapsed_us','input_bytes','output_bytes'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0))throw Error('unsupported record');
      records.push(v);
    }catch{invalid.push(index+1)}
  }
  if(text.length&&!text.endsWith('\n'))invalid.push(lines.length);
  const complete=invalid.length===0;
  return {complete,invalid_lines:[...new Set(invalid)],invocations:complete?records.length:null,rewrites:complete?records.filter(v=>v.installed_app_success&&v.modified_command).length:null};
}
