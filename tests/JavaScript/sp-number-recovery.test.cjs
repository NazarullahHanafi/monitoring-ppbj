const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/sp/sp.js','utf8').replace(/\r\n/g,'\n');
const helper=source.slice(source.indexOf('        function getSuggestionUrlSp('),source.indexOf('        async function loadSuggestionsSp('));
const reads=source.slice(source.indexOf('/* BEGIN SP LOOKUP READS */'),source.indexOf('/* END SP LOOKUP READS */'));
const tick=()=>new Promise(setImmediate);
class Element {
 constructor(value=''){this.value=value;this.action='/sp/1';this.hidden=false;this.textContent='';this.events=[];this.classList={contains:()=>this.hidden};}
 dispatchEvent(event){this.events.push(event.type);}
}
function setup(){
 const nodes=Object.fromEntries(['editNomorSp','nomorSpInput','editNomorStatusSp','nomorStatusSp','editFormSp','addFormSp','editModal','addModal','editIdSp','tanggalSpInput','editTanggalSp'].map(id=>[id,new Element()]));
 nodes.nomorSpInput.value=nodes.editNomorSp.value='DRAFT';nodes.editIdSp.value='1';nodes.tanggalSpInput.value='2026-11-18';nodes.editTanggalSp.value='2025-03-01';
 const requests=[],timers=new Map();let timerId=0;
 const context={window:{location:{origin:'https://sp.test'},addEventListener(){}},document:{getElementById:id=>nodes[id],addEventListener(){}},URL,AbortController,DOMException,Event,
  ORACLE_MODE_SP:false,SUGGEST_URL_SP:'/sp/suggest-nomor',editModalLoadSerial:1,setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))};
 vm.createContext(context);vm.runInContext(reads+'\n'+helper,context);
 const respond=(i,data,extra={})=>requests[i].resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 const fire=()=>{for(const[id,timer]of [...timers]){timers.delete(id);timer.fn();}};
 return{nodes,requests,timers,context,respond,fire,apply:(edit=true)=>context.applyLatestNumberSp(edit)};
}
test('edit number recovery uses its own document date and only updates that form after success',async()=>{
 const h=setup(),task=h.apply();assert.equal(new URL(h.requests[0].url).searchParams.get('tanggal'),'2025-03-01');assert.equal(h.requests[0].options.cache,'no-store');h.respond(0,{suggestions:['010/PKU-III/SP/2025']});assert.equal(await task,'010/PKU-III/SP/2025');assert.equal(h.nodes.nomorSpInput.value,'DRAFT');assert.equal(h.nodes.editNomorSp.value,'010/PKU-III/SP/2025');assert.deepEqual(h.nodes.editNomorSp.events,['input']);
});
test('add number recovery uses the add date while edit data is present',async()=>{
 const h=setup(),task=h.apply(false);assert.equal(new URL(h.requests[0].url).searchParams.get('tanggal'),'2026-11-18');h.respond(0,{suggestions:['010/PKU-XI/SP/2026']});await task;assert.equal(h.nodes.editNomorSp.value,'DRAFT');assert.equal(h.nodes.nomorSpInput.value,'010/PKU-XI/SP/2026');
});
test('recovery cannot overwrite a number or date changed while the read was pending',async()=>{
 for(const field of ['editNomorSp','editTanggalSp']){
  const h=setup(),task=h.apply();h.nodes[field].value='CHANGED';h.respond(0,{suggestions:['STALE']});assert.equal(await task,null);assert.notEqual(h.nodes.editNomorSp.value,'STALE');assert.deepEqual(h.nodes.editNomorSp.events,[]);
 }
});
test('record, form-action and same-record generation changes invalidate recovery',async()=>{
 for(const change of [h=>h.nodes.editIdSp.value='2',h=>h.nodes.editFormSp.action='/sp/2',h=>h.context.editModalLoadSerial++]){
  const h=setup(),task=h.apply();change(h);h.respond(0,{suggestions:['STALE']});assert.equal(await task,null);assert.equal(h.nodes.editNomorSp.value,'DRAFT');
 }
});
test('closing or cancelling recovery releases even an uncooperative fetch and preserves the draft',async()=>{
 const h=setup(),task=h.apply();h.nodes.editModal.hidden=true;h.context.cancelSpFormLookups();assert.equal(await task,null);assert.equal(h.requests[0].options.signal.aborted,true);h.respond(0,{suggestions:['STALE']});await tick();assert.equal(h.nodes.editNomorSp.value,'DRAFT');assert.equal(h.timers.size,0);
});
test('stalled recovery response bodies reach a deadline without resubmitting a save',async()=>{
 const h=setup(),task=h.apply();h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();h.fire();assert.equal(await task,null);assert.equal(h.nodes.editNomorSp.value,'DRAFT');assert.equal(h.requests.length,1);assert.equal(h.requests[0].options.method,undefined);
});
test('malformed, oversized, manual, redirected and failed recovery responses never change the draft',async()=>{
 for(const data of [null,{}, {suggestions:[{}]},{suggestions:['']},{suggestions:['x'.repeat(61)]},{suggestions:Array(6).fill('x')},{manual:true,suggestions:['ORACLE']}]){
  const h=setup(),task=h.apply();h.respond(0,data);assert.equal(await task,null);assert.equal(h.nodes.editNomorSp.value,'DRAFT');
 }
 for(const extra of [{ok:false,status:429},{redirected:true},{headers:{get:()=> 'text/html'}},{json:async()=>{throw new SyntaxError('truncated');}}]){
  const h=setup(),task=h.apply();h.respond(0,{suggestions:['WRONG']},extra);assert.equal(await task,null);assert.equal(h.nodes.editNomorSp.value,'DRAFT');
 }
});
test('Oracle and hidden forms never request automatic numbering',async()=>{
 const h=setup();h.context.ORACLE_MODE_SP=true;assert.equal(await h.apply(),null);assert.equal(h.requests.length,0);h.context.ORACLE_MODE_SP=false;h.nodes.editModal.hidden=true;assert.equal(await h.apply(),null);assert.equal(h.requests.length,0);
});
test('a newer explicit recovery supersedes an older request without accepting its number',async()=>{
 const h=setup(),old=h.apply(),fresh=h.apply();assert.equal(h.requests[0].options.signal.aborted,true);h.respond(1,{suggestions:['FRESH']});assert.equal(await fresh,'FRESH');assert.equal(await old,null);h.respond(0,{suggestions:['OLD']});await tick();assert.equal(h.nodes.editNomorSp.value,'FRESH');
});
