import assert from 'node:assert/strict';
const fields=['input_tokens','cached_input_tokens','cache_write_input_tokens','output_tokens'];
function count(value,name){assert(Number.isSafeInteger(value)&&value>=0,`missing/invalid ${name}`);return BigInt(value);}
function buckets(v){const n=Object.fromEntries(fields.map(k=>[k,count(v[k],k)]));assert(n.cached_input_tokens+n.cache_write_input_tokens<=n.input_tokens,'input buckets overlap');return n;}
export function priceRequest(v){
 const n=buckets(v),long=n.input_tokens>272000n;
 const ordinary=n.input_tokens-n.cached_input_tokens-n.cache_write_input_tokens;
 return ordinary*(long?8000n:4000n)+n.cached_input_tokens*(long?800n:400n)+n.cache_write_input_tokens*(long?10000n:5000n)+n.output_tokens*(long?30000n:20000n);
}
export function reconcileRollout(events,finalUsage){
 let previous=Object.fromEntries(fields.map(k=>[k,0n])),cost=0n;
 const requests=[];let contexts=0;
 for(const event of events){
  if(event.type==='turn_context'){
   assert.equal(event.payload?.model,'gpt-5.6-sol','model changed');
   assert.equal(event.payload?.effort,'high','effort changed');contexts++;
  }
  if(event.type!=='event_msg'||event.payload?.type!=='token_count'||!event.payload.info)continue;
  const info=event.payload.info,total=buckets(info.total_token_usage);
  if(fields.every(k=>total[k]===previous[k]))continue;
  const last=buckets(info.last_token_usage);
  for(const k of fields)assert.equal(total[k]-previous[k],last[k],`unreconciled cumulative increment ${k}`);
  const nanousd=priceRequest(info.last_token_usage);cost+=nanousd;
  requests.push({request:requests.length+1,timestamp:event.timestamp,...Object.fromEntries(fields.map(k=>[k,Number(last[k])])),context_tier:last.input_tokens>272000n?'long':'standard',api_equivalent_nanousd:nanousd.toString()});
  previous=total;
 }
 assert(contexts>0,'missing model/effort context');assert(requests.length>0,'no request usage');
 for(const k of ['input_tokens','cached_input_tokens','output_tokens'])assert.equal(previous[k],count(finalUsage[k],k),`final total mismatch ${k}`);
 if(Object.hasOwn(finalUsage,'cache_write_input_tokens'))assert.equal(previous.cache_write_input_tokens,count(finalUsage.cache_write_input_tokens,'writes'));
 return {status:'reconciled',requests,total:Object.fromEntries(fields.map(k=>[k,Number(previous[k])])),api_equivalent_nanousd:cost.toString(),api_equivalent_usd:Number(cost)/1e9,pricing_basis:'fixed Sol study tariff; request tiers and explicit writes reconciled to final client usage; not subscription invoice'};
}
