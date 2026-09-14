import test from 'node:test';import assert from 'node:assert/strict';import {auditHookLog} from './hook-audit.mjs';
const valid={elapsed_us:1,input_bytes:20,output_bytes:30,installed_app_success:true,modified_command:true};
const encode=v=>JSON.stringify(v)+'\n';
test('counts only complete successful rewrite records',()=>{assert.deepEqual(auditHookLog(encode(valid)+encode({...valid,installed_app_success:false})),{complete:true,invalid_lines:[],invocations:2,rewrites:1})});
test('empty observed log has zero records',()=>{assert.deepEqual(auditHookLog(''),{complete:true,invalid_lines:[],invocations:0,rewrites:0})});
test('interleaved concurrent regression makes both counts unavailable',()=>{const r=auditHookLog(encode(valid)+'{{""elapsed_uselapsed_us""::32773354}}\n');assert(!r.complete);assert.equal(r.invocations,null);assert.equal(r.rewrites,null);assert.deepEqual(r.invalid_lines,[2])});
test('missing newline and unsupported records cannot become zero observations',()=>{for(const text of [JSON.stringify(valid),'null\n','[]\n','{}\n',encode({...valid,modified_command:'true'})]){const r=auditHookLog(text);assert(!r.complete);assert.equal(r.invocations,null)}});
test('byte/count boundaries are safe integers with no coercion',()=>{for(const n of [0,Number.MAX_SAFE_INTEGER])assert(auditHookLog(encode({...valid,input_bytes:n})).complete);for(const n of [-1,0.5,Number.MAX_SAFE_INTEGER+1,'1',null])assert(!auditHookLog(encode({...valid,input_bytes:n})).complete)});
