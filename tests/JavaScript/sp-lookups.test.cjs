const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/sp/sp.js','utf8').replace(/\r\n/g,'\n');
const block=source.slice(source.indexOf('/* BEGIN SP LOOKUP READS */'),source.indexOf('/* END SP LOOKUP READS */'));
const functions=source.slice(source.indexOf('        function getSuggestionUrlSp('),source.indexOf('        function openEditModal('));
const escape=source.match(/function escapedHtml\(s\) \{[^\n]+/)[0],status=source.match(/function setStatus\([^\n]+/)[0];
const tick=()=>new Promise(setImmediate);
class Element {
 constructor(tag='div'){this.tagName=tag;this.value='';this.children=[];this.events={};this._text='';this._html='';this.classes=new Set();this.classList={add:(...names)=>names.forEach(n=>this.classes.add(n)),remove:(...names)=>names.forEach(n=>this.classes.delete(n)),contains:n=>this.classes.has(n)};}
 set textContent(value){this._text=String(value);this._html='';this.children=[];}get textContent(){return this._text+this.children.map(x=>x.textContent).join('');}
 set innerHTML(value){this._html=String(value);this._text=String(value).replace(/<[^>]+>/g,'');this.children=[];}get innerHTML(){return this._html;}
 appendChild(child){this.children.push(child);return child;}replaceChildren(){this.children=[];this._text='';this._html='';}
 addEventListener(name,fn){(this.events[name]??=[]).push(fn);}dispatchEvent(event){for(const fn of this.events[event.type]||[])fn(event);}
 emit(type){this.dispatchEvent({type});}
}
function runtime(){
 const nodes=Object.fromEntries(['nomorSpInput','nomorStatusSp','tanggalSpInput','editNomorSp','editNomorStatusSp','editTanggalSp','suggBoxSp'].map(id=>[id,new Element(id.includes('Input')||id.includes('Tanggal')||id==='editNomorSp'?'input':'div')]));
 nodes.tanggalSpInput.value=nodes.editTanggalSp.value='2026-11-18';
 const timers=new Map(),requests=[],windowEvents={},documentEvents={};let serial=0;
 const sandbox={window:{location:{origin:'https://sp.test'},addEventListener:(name,fn)=>windowEvents[name]=fn},document:{hidden:false,getElementById:id=>nodes[id]||null,createElement:tag=>new Element(tag),addEventListener:(name,fn)=>documentEvents[name]=fn},URL,AbortController,DOMException,Event:class{constructor(type){this.type=type;}},
  CHECK_URL_SP:'/sp/check-nomor',SUGGEST_URL_SP:'/sp/suggest-nomor',ORACLE_MODE_SP:false,
  setTimeout:(fn,delay)=>{timers.set(++serial,{fn,delay});return serial;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))};
 vm.createContext(sandbox);vm.runInContext(block+escape+'\n'+status+'\n'+functions,sandbox);
 const fire=delay=>{for(const[id,timer]of [...timers])if(timer.delay===delay){timers.delete(id);timer.fn();}};
 const respond=(i,data,status=200,extra={})=>requests[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 return{sandbox,nodes,timers,requests,windowEvents,documentEvents,fire,respond,attach:(edit=false,getExclude=()=>edit?4:0)=>sandbox.attachNomorCheck(edit?'editNomorSp':'nomorSpInput',edit?'editNomorStatusSp':'nomorStatusSp',getExclude,edit?'editTanggalSp':'tanggalSpInput'),type:(value,edit=false)=>{const node=nodes[edit?'editNomorSp':'nomorSpInput'];node.value=value;node.emit('input');},pending:()=>vm.runInContext('spLookupRequests.size',sandbox)};
}

test('number checks debounce independently for add and edit rather than cancelling each other',async()=>{
 const h=runtime();h.attach();h.attach(true);h.type('001');h.type('002');h.type('EDIT',true);h.fire(400);
 assert.equal(h.requests.length,2);assert.equal(new URL(h.requests[0].url).searchParams.get('nomor'),'002');assert.equal(new URL(h.requests[1].url).searchParams.get('exclude_id'),'4');
 h.respond(0,{status:'ok'});h.respond(1,{status:'duplicate',message:'Sudah digunakan'});await tick();assert.match(h.nodes.nomorStatusSp.innerHTML,/Tersedia/);assert.match(h.nodes.editNomorStatusSp.innerHTML,/Sudah digunakan/);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
});

test('late normalized replies never overwrite a newly typed number or a cleared field',async()=>{
 const h=runtime();h.attach();h.type('OLD');h.fire(400);h.type('NEW');assert.equal(h.requests[0].options.signal.aborted,true);h.fire(400);h.respond(0,{status:'ok',normalized_nomor:'OLD/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpInput.value,'NEW');
 h.respond(1,{status:'ok',normalized_nomor:'NEW/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpInput.value,'NEW/NORMALIZED');
 h.type('WAIT');h.fire(400);h.type('');h.respond(2,{status:'ok',normalized_nomor:'WAIT/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpInput.value,'');assert.equal(h.nodes.nomorStatusSp.innerHTML,'');
});

test('date changes and edit-record switches invalidate old checks before applying normalization',async()=>{
 const h=runtime();let id=4;h.attach(true,()=>id);h.type('SP/OLD',true);h.fire(400);h.nodes.editTanggalSp.value='2027-01-01';h.nodes.editTanggalSp.emit('change');h.fire(400);
 assert.equal(new URL(h.requests[1].url).searchParams.get('tanggal'),'2027-01-01');h.respond(0,{status:'ok',normalized_nomor:'OLD/2026'});await tick();assert.equal(h.nodes.editNomorSp.value,'SP/OLD');
 id=5;h.respond(1,{status:'ok',normalized_nomor:'WRONG/RECORD'});await tick();assert.equal(h.nodes.editNomorSp.value,'SP/OLD');
});

test('a stalled response body reaches its deadline and retry requires one explicit action',async()=>{
 const h=runtime();h.attach();h.type('SP/1');h.fire(400);h.respond(0,null,200,{json:()=>new Promise(()=>{})});await tick();h.fire(20000);await tick();
 assert.equal(h.requests[0].options.signal.aborted,true);assert.match(h.nodes.nomorStatusSp.textContent,/terlalu lama/);assert.equal(h.nodes.nomorStatusSp.children[0].textContent,'Cek ulang');assert.equal(h.pending(),0);
 h.nodes.nomorStatusSp.children[0].emit('click');h.fire(400);assert.equal(h.requests.length,2);h.respond(1,{status:'ok'});await tick();assert.match(h.nodes.nomorStatusSp.innerHTML,/Tersedia/);
});

test('HTML, login redirects, rate limits and incomplete data never mark a number available',async()=>{
 for(const [payload,code,extra,expected] of [[{},200,{headers:{get:()=> 'text/html'}},/belum berhasil/],[{},200,{redirected:true},/Sesi/],[{},429,{},/Terlalu banyak/],[{status:'unexpected'},200,{},/belum lengkap/],[{status:'ok',normalized_nomor:[]},200,{},/belum lengkap/]]){
  const h=runtime();h.attach();h.type('KEEP');h.fire(400);h.respond(0,payload,code,extra);await tick();assert.equal(h.nodes.nomorSpInput.value,'KEEP');assert.match(h.nodes.nomorStatusSp.textContent,expected);assert.doesNotMatch(h.nodes.nomorStatusSp.innerHTML,/Tersedia/);assert.equal(h.nodes.nomorStatusSp.children[0].textContent,'Cek ulang');
 }
});

test('number feedback treats stored markup as text and preserves duplicate status',async()=>{
 const h=runtime();h.attach();h.type('SP/1');h.fire(400);h.respond(0,{status:'duplicate',message:'<img src=x onerror=bad()> & "duplikat"'});await tick();
 assert.match(h.nodes.nomorStatusSp.innerHTML,/&lt;img/);assert.doesNotMatch(h.nodes.nomorStatusSp.innerHTML,/<img/);assert.equal(h.nodes.nomorSpInput.classes.has('nomor-input-error'),true);
});

test('suggestions replace stale reads, render all strings literally and only fill on explicit click',async()=>{
 const h=runtime();const first=h.sandbox.loadSuggestionsSp();h.nodes.tanggalSpInput.value='2027-01-01';const second=h.sandbox.loadSuggestionsSp();
 assert.equal(h.requests[0].options.signal.aborted,true);h.respond(0,{last:'OLD',suggestions:['OLD']});await first;assert.equal(h.nodes.suggBoxSp.children.length,0);
 h.respond(1,{last:'<img src=x>',suggestions:['<svg>SP/2027']});await second;assert.equal(h.nodes.suggBoxSp.children[0].textContent,'Terakhir: <img src=x> →');assert.equal(h.nodes.nomorSpInput.value,'');
 const button=h.nodes.suggBoxSp.children[1];assert.equal(button.type,'button');assert.equal(button.innerHTML,'');button.emit('click');assert.equal(h.nodes.nomorSpInput.value,'<svg>SP/2027');
 h.nodes.tanggalSpInput.value='2028-01-01';button.emit('click');assert.equal(h.nodes.nomorSpInput.value,'<svg>SP/2027');
});

test('tab hiding cancels timers and pending checks without disabling already rendered suggestions',async()=>{
 const h=runtime();h.attach();let task=h.sandbox.loadSuggestionsSp();h.respond(0,{last:null,suggestions:['SP/1']});await task;
 h.type('WAIT');h.sandbox.document.hidden=true;h.documentEvents.visibilitychange();h.fire(400);assert.equal(h.requests.length,1);assert.equal(h.nodes.nomorStatusSp.innerHTML,'');
 h.sandbox.document.hidden=false;h.nodes.suggBoxSp.children[1].emit('click');assert.equal(h.nodes.nomorSpInput.value,'SP/1');h.fire(400);h.windowEvents.pagehide();assert.equal(h.requests[1].options.signal.aborted,true);h.respond(1,{status:'ok',normalized_nomor:'STALE'});await tick();assert.equal(h.nodes.nomorSpInput.value,'SP/1');
});

test('closing a form settles uncooperative suggestion fetches and offers a bounded explicit retry',async()=>{
 const h=runtime();const task=h.sandbox.loadSuggestionsSp();h.sandbox.cancelSpFormLookups();await task;assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.equal(h.nodes.suggBoxSp.children[0].textContent,'Cek ulang');
 h.respond(0,{last:'STALE',suggestions:['STALE']});await tick();assert.doesNotMatch(h.nodes.suggBoxSp.textContent,/STALE/);
 h.nodes.suggBoxSp.children[0].emit('click');h.respond(1,{last:null,suggestions:['FRESH']});await tick();assert.match(h.nodes.suggBoxSp.textContent,/FRESH/);
});

test('Oracle suggestions make no requests and external URLs are rejected without navigation or fetching',async()=>{
 const h=runtime();h.sandbox.ORACLE_MODE_SP=true;await h.sandbox.loadSuggestionsSp();assert.equal(h.requests.length,0);assert.match(h.nodes.suggBoxSp.textContent,/Oracle/);
 await assert.rejects(h.sandbox.readSpLookup('test','https://outside.test/private'),/tidak valid/);assert.equal(h.requests.length,0);
});

test('oversized or malformed suggestion collections are rejected and old field drafts stay intact',async()=>{
 for(const data of [{suggestions:Array(6).fill('SP')},{suggestions:[{}]},{suggestions:['x'.repeat(256)]},{suggestions:[],last:[]}]){
  const h=runtime();h.nodes.nomorSpInput.value='DRAFT';const task=h.sandbox.loadSuggestionsSp();h.respond(0,data);await task;assert.equal(h.nodes.nomorSpInput.value,'DRAFT');assert.match(h.nodes.suggBoxSp.textContent,/belum lengkap/);assert.equal(h.nodes.suggBoxSp.children[0].tagName,'button');
 }
});
