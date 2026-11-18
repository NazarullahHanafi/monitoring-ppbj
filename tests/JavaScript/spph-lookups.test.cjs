const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/spph/spph.js','utf8').replace(/\r\n/g,'\n');
const block=source.slice(source.indexOf('/* BEGIN SPPH LOOKUP READS */'),source.indexOf('/* END SPPH LOOKUP READS */'));
const functions=source.slice(source.indexOf('/* BEGIN SPPH NUMBER LOOKUPS */'),source.indexOf('/* END SPPH NUMBER LOOKUPS */'));
const escape=source.slice(source.indexOf('        function escapedHtml(str)'),source.indexOf('        function formatPackageMoney(')),status=source.match(/function setStatus\([^\n]+/)[0];
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
 const nodes=Object.fromEntries(['nomorSpphInput','nomorStatus','tanggalSpphInput','editNomor','editNomorStatus','editTanggal','suggBox'].map(id=>[id,new Element(id.includes('Input')||id.includes('Tanggal')||id==='editNomor'?'input':'div')]));
 nodes.tanggalSpphInput.value=nodes.editTanggal.value='2026-11-18';
 const timers=new Map(),requests=[],windowEvents={},documentEvents={};let serial=0;
 const sandbox={window:{location:{origin:'https://spph.test'},addEventListener:(name,fn)=>windowEvents[name]=fn},document:{hidden:false,getElementById:id=>nodes[id]||null,createElement:tag=>new Element(tag),addEventListener:(name,fn)=>documentEvents[name]=fn},URL,AbortController,DOMException,Event:class{constructor(type){this.type=type;}},
  CHECK_URL:'/spph/check-nomor',SUGGEST_URL:'/spph/suggest-nomor',
  setTimeout:(fn,delay)=>{timers.set(++serial,{fn,delay});return serial;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))};
 vm.createContext(sandbox);vm.runInContext(block+escape+'\n'+status+'\n'+functions,sandbox);
 const fire=delay=>{for(const[id,timer]of [...timers])if(timer.delay===delay){timers.delete(id);timer.fn();}};
 const respond=(i,data,status=200,extra={})=>requests[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 return{sandbox,nodes,timers,requests,windowEvents,documentEvents,fire,respond,attach:(edit=false,getExclude=()=>edit?4:0)=>sandbox.attachCheck(edit?'editNomor':'nomorSpphInput',edit?'editNomorStatus':'nomorStatus',getExclude,edit?'editTanggal':'tanggalSpphInput'),type:(value,edit=false)=>{const node=nodes[edit?'editNomor':'nomorSpphInput'];node.value=value;node.emit('input');},pending:()=>vm.runInContext('spphLookupRequests.size',sandbox)};
}

test('number checks debounce independently for add and edit rather than cancelling each other',async()=>{
 const h=runtime();h.attach();h.attach(true);h.type('001');h.type('002');h.type('EDIT',true);h.fire(400);
 assert.equal(h.requests.length,2);assert.equal(new URL(h.requests[0].url).searchParams.get('nomor'),'002');assert.equal(new URL(h.requests[1].url).searchParams.get('exclude_id'),'4');
 h.respond(0,{status:'ok'});h.respond(1,{status:'duplicate',message:'Sudah digunakan'});await tick();assert.match(h.nodes.nomorStatus.innerHTML,/Tersedia/);assert.match(h.nodes.editNomorStatus.innerHTML,/Sudah digunakan/);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
});

test('late normalized replies never overwrite a newly typed number or a cleared field',async()=>{
 const h=runtime();h.attach();h.type('OLD');h.fire(400);h.type('NEW');assert.equal(h.requests[0].options.signal.aborted,true);h.fire(400);h.respond(0,{status:'ok',normalized_nomor:'OLD/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpphInput.value,'NEW');
 h.respond(1,{status:'ok',normalized_nomor:'NEW/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpphInput.value,'NEW/NORMALIZED');
 h.type('WAIT');h.fire(400);h.type('');h.respond(2,{status:'ok',normalized_nomor:'WAIT/NORMALIZED'});await tick();assert.equal(h.nodes.nomorSpphInput.value,'');assert.equal(h.nodes.nomorStatus.innerHTML,'');
});

test('date changes and edit-record switches invalidate old checks before applying normalization',async()=>{
 const h=runtime();let id=4;h.attach(true,()=>id);h.type('SP/OLD',true);h.fire(400);h.nodes.editTanggal.value='2027-01-01';h.nodes.editTanggal.emit('change');h.fire(400);
 assert.equal(new URL(h.requests[1].url).searchParams.get('tanggal'),'2027-01-01');h.respond(0,{status:'ok',normalized_nomor:'OLD/2026'});await tick();assert.equal(h.nodes.editNomor.value,'SP/OLD');
 id=5;h.respond(1,{status:'ok',normalized_nomor:'WRONG/RECORD'});await tick();assert.equal(h.nodes.editNomor.value,'SP/OLD');
});

test('a stalled response body reaches its deadline and retry requires one explicit action',async()=>{
 const h=runtime();h.attach();h.type('SP/1');h.fire(400);h.respond(0,null,200,{json:()=>new Promise(()=>{})});await tick();h.fire(20000);await tick();
 assert.equal(h.requests[0].options.signal.aborted,true);assert.match(h.nodes.nomorStatus.textContent,/terlalu lama/);assert.equal(h.nodes.nomorStatus.children[0].textContent,'Cek ulang');assert.equal(h.pending(),0);
 h.nodes.nomorStatus.children[0].emit('click');h.fire(400);assert.equal(h.requests.length,2);h.respond(1,{status:'ok'});await tick();assert.match(h.nodes.nomorStatus.innerHTML,/Tersedia/);
});

test('HTML, login redirects, rate limits and incomplete data never mark a number available',async()=>{
 for(const [payload,code,extra,expected] of [[{},200,{headers:{get:()=> 'text/html'}},/belum berhasil/],[{},200,{redirected:true},/Sesi/],[{},429,{},/Terlalu banyak/],[{status:'unexpected'},200,{},/belum lengkap/],[{status:'ok',normalized_nomor:[]},200,{},/belum lengkap/]]){
  const h=runtime();h.attach();h.type('KEEP');h.fire(400);h.respond(0,payload,code,extra);await tick();assert.equal(h.nodes.nomorSpphInput.value,'KEEP');assert.match(h.nodes.nomorStatus.textContent,expected);assert.doesNotMatch(h.nodes.nomorStatus.innerHTML,/Tersedia/);assert.equal(h.nodes.nomorStatus.children[0].textContent,'Cek ulang');
 }
});

test('number feedback treats stored markup as text and preserves duplicate status',async()=>{
 const h=runtime();h.attach();h.type('SP/1');h.fire(400);h.respond(0,{status:'duplicate',message:'<img src=x onerror=bad()> & "duplikat"'});await tick();
 assert.match(h.nodes.nomorStatus.innerHTML,/&lt;img/);assert.doesNotMatch(h.nodes.nomorStatus.innerHTML,/<img/);assert.equal(h.nodes.nomorSpphInput.classes.has('nomor-input-error'),true);
});

test('suggestions replace stale reads, render all strings literally and only fill on explicit click',async()=>{
 const h=runtime();const first=h.sandbox.loadSuggestions();h.nodes.tanggalSpphInput.value='2027-01-01';const second=h.sandbox.loadSuggestions();
 assert.equal(h.requests[0].options.signal.aborted,true);h.respond(0,{last:'OLD',suggestions:['OLD']});await first;assert.equal(h.nodes.suggBox.children.length,0);
 h.respond(1,{last:'<img src=x>',suggestions:['<svg>SP/2027']});await second;assert.equal(h.nodes.suggBox.children[0].textContent,'Terakhir: <img src=x> →');assert.equal(h.nodes.nomorSpphInput.value,'');
 const button=h.nodes.suggBox.children[1];assert.equal(button.type,'button');assert.equal(button.innerHTML,'');button.emit('click');assert.equal(h.nodes.nomorSpphInput.value,'<svg>SP/2027');
 h.nodes.tanggalSpphInput.value='2028-01-01';button.emit('click');assert.equal(h.nodes.nomorSpphInput.value,'<svg>SP/2027');
});

test('tab hiding cancels timers and pending checks without disabling already rendered suggestions',async()=>{
 const h=runtime();h.attach();let task=h.sandbox.loadSuggestions();h.respond(0,{last:null,suggestions:['SP/1']});await task;
 h.type('WAIT');h.sandbox.document.hidden=true;h.documentEvents.visibilitychange();h.fire(400);assert.equal(h.requests.length,1);assert.equal(h.nodes.nomorStatus.innerHTML,'');
 h.sandbox.document.hidden=false;h.nodes.suggBox.children[1].emit('click');assert.equal(h.nodes.nomorSpphInput.value,'SP/1');h.fire(400);h.windowEvents.pagehide();assert.equal(h.requests[1].options.signal.aborted,true);h.respond(1,{status:'ok',normalized_nomor:'STALE'});await tick();assert.equal(h.nodes.nomorSpphInput.value,'SP/1');
});

test('closing a form settles uncooperative suggestion fetches and offers a bounded explicit retry',async()=>{
 const h=runtime();const task=h.sandbox.loadSuggestions();h.sandbox.cancelSpphFormLookups();await task;assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.equal(h.nodes.suggBox.children[0].textContent,'Cek ulang');
 h.respond(0,{last:'STALE',suggestions:['STALE']});await tick();assert.doesNotMatch(h.nodes.suggBox.textContent,/STALE/);
 h.nodes.suggBox.children[0].emit('click');h.respond(1,{last:null,suggestions:['FRESH']});await tick();assert.match(h.nodes.suggBox.textContent,/FRESH/);
});

test('external lookup URLs are rejected before sending data',async()=>{
 const h=runtime();
 await assert.rejects(h.sandbox.readSpphLookup('test','https://outside.test/private'),/tidak valid/);assert.equal(h.requests.length,0);
});

test('oversized or malformed suggestion collections are rejected and old field drafts stay intact',async()=>{
 for(const data of [{suggestions:Array(6).fill('SP')},{suggestions:[{}]},{suggestions:['x'.repeat(256)]},{suggestions:[],last:[]}]){
  const h=runtime();h.nodes.nomorSpphInput.value='DRAFT';const task=h.sandbox.loadSuggestions();h.respond(0,data);await task;assert.equal(h.nodes.nomorSpphInput.value,'DRAFT');assert.match(h.nodes.suggBox.textContent,/belum lengkap/);assert.equal(h.nodes.suggBox.children[0].tagName,'button');
 }
});
