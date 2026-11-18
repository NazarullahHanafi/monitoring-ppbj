const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/sp/sp.js','utf8').replace(/\r\n/g,'\n');
const block=name=>source.slice(source.indexOf(`/* BEGIN ${name} */`),source.indexOf(`/* END ${name} */`));
const tick=()=>new Promise(setImmediate);
class Element {
 constructor(){this.value='';this.dataset={};this.style={};this.children=[];this.events={};this.text='';this.html='';this.classes=new Set();this.classList={add:(...x)=>x.forEach(v=>this.classes.add(v)),remove:(...x)=>x.forEach(v=>this.classes.delete(v)),contains:x=>this.classes.has(x)};}
 set textContent(v){this.text=String(v);this.children=[];this.html='';}get textContent(){return this.text+this.children.map(x=>x.textContent).join('');}
 set innerHTML(v){this.html=v;this.text=v.replace(/<[^>]+>/g,'');this.children=[];}get innerHTML(){return this.html;}
 addEventListener(type,fn){(this.events[type]??=[]).push(fn);}emit(type){for(const fn of this.events[type]||[])fn({type});}
 appendChild(child){this.children.push(child);}replaceChildren(){this.textContent='';}
}
function setup(){
 const nodes=Object.fromEntries(['editFormSp','editRows','editIdSp','editModal','nomorPrManual','editNomorPrManual','ppbjStatus','editPpbjStatus','addDeskripsiBadge','editDeskripsiBadge'].map(id=>[id,new Element()]));nodes.editIdSp.value='1';
 const timers=new Map(),requests=[],dialogs=[],added=[];let timerId=0;
 const context={window:{location:{origin:'https://sp.test'},addEventListener(){}},document:{getElementById:id=>nodes[id],createElement:()=>new Element(),addEventListener(){}},URL,DOMException,AbortController,
  PPBJ_CHECK_URL:'/sp/check-ppbj',currentPrMode:'manual',currentEditPrMode:'manual',editModalLoadSerial:1,
  setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),
  updatePrFinalValue(){},updateEditPrFinalValue(){},Swal:{fire:options=>dialogs.push(options)},addRow:(mode,item)=>{added.push({mode,item});nodes.editRows.appendChild(Object.assign(new Element(),{textContent:item?.nama_barang||'blank'}));}};
 vm.createContext(context);
 vm.runInContext(block('SP LOOKUP READS')+'\n'+source.match(/function escapedHtml\(s\) \{[^\n]+/)[0]+'\n'+source.match(/function setStatus\([^\n]+/)[0]+'\n'+block('SP MANUAL PR READS')+'\n'+block('SP EDIT READS'),context);
 const fire=delay=>{for(const[id,timer]of [...timers])if(timer.delay===delay){timers.delete(id);timer.fn();}};
 const respond=(i,data,extra={})=>requests[i].resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 const type=(value,edit=false)=>{const input=nodes[edit?'editNomorPrManual':'nomorPrManual'];input.value=value;input.emit('input');};
 return{nodes,timers,requests,context,dialogs,added,fire,respond,type,attach:()=>{context.attachManualPrCheck('add');context.attachManualPrCheck('edit');}};
}
test('manual PR checks debounce per form, abort old reads and ignore stale malicious replies',async()=>{
 const h=setup();h.attach();h.type('OLD');h.fire(500);h.type('NEW');h.type('EDIT',true);h.fire(500);assert.equal(h.requests.length,3);assert.equal(h.requests[0].options.signal.aborted,true);
 h.respond(0,{status:'cancelled',message:'STALE'});h.respond(1,{status:'already_linked',message:'<img src=x onerror=alert(1)> sudah terhubung'});h.respond(2,{status:'manual'});await tick();
 assert.doesNotMatch(h.nodes.ppbjStatus.innerHTML,/<img|STALE/);assert.match(h.nodes.ppbjStatus.innerHTML,/&lt;img/);assert.match(h.nodes.editPpbjStatus.textContent,/belum terdaftar/);
});
test('clearing manual input cancels queued checks and all form cleanup aborts in-flight reads',async()=>{
 const h=setup();h.attach();h.type('WAIT');h.type('');h.fire(500);assert.equal(h.requests.length,0);h.type('WAIT');h.fire(500);h.context.cancelSpFormLookups();assert.equal(h.requests[0].options.signal.aborted,true);h.respond(0,{status:'available'});await tick();assert.equal(h.nodes.ppbjStatus.innerHTML,'');
});
test('manual PR responses cannot modify another mode or another edited record',async()=>{
 const h=setup();h.attach();h.type('MODE');h.fire(500);h.context.currentPrMode='ppbj';h.nodes.ppbjStatus.textContent='PPBJ chosen';h.respond(0,{status:'cancelled',message:'wrong'});
 h.type('RECORD',true);h.fire(500);h.nodes.editIdSp.value='2';h.nodes.editPpbjStatus.textContent='Other record';h.respond(1,{status:'available'});await tick();assert.equal(h.nodes.ppbjStatus.textContent,'PPBJ chosen');assert.equal(h.nodes.editPpbjStatus.textContent,'Other record');
});
test('manual PR deadlines cover hung JSON and retry without navigation or saves',async()=>{
 const h=setup();h.attach();h.type('WAIT');h.fire(500);h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();h.fire(20000);await tick();assert.match(h.nodes.ppbjStatus.textContent,/terlalu lama/);assert.equal(h.nodes.ppbjStatus.children[0].type,'button');h.nodes.ppbjStatus.children[0].emit('click');h.fire(500);h.respond(1,{status:'manual'});await tick();assert.match(h.nodes.ppbjStatus.textContent,/belum terdaftar/);
});
test('malformed PR responses never claim availability and can be retried',async()=>{
 for(const data of [null,{status:'unknown'},{status:'manual',message:[]},{status:'manual',message:'x'.repeat(2049)}]){
  const h=setup();h.attach();h.type('PR');h.fire(500);h.respond(0,data);await tick();assert.match(h.nodes.ppbjStatus.textContent,/belum lengkap/);assert.equal(h.nodes.ppbjStatus.children[0].textContent,'Cek ulang');
 }
});
test('a late item failure cannot erase the items of a newly opened record',async()=>{
 const h=setup();const old=h.context.loadEditItems(1);h.context.editModalLoadSerial=2;h.nodes.editIdSp.value='2';const fresh=h.context.loadEditItems(2);h.respond(1,[{nama_barang:'Barang baru'}]);await fresh;h.respond(0,null,{ok:false,status:500});await old;assert.deepEqual(h.added,[{mode:'edit',item:{nama_barang:'Barang baru'}}]);assert.equal(h.nodes.editRows.textContent,'Barang baru');assert.equal(h.nodes.editFormSp.dataset.spItemsState,'ready');
});
test('reopening the same record rejects an older item response using its load generation',async()=>{
 const h=setup();const old=h.context.loadEditItems(1);h.context.editModalLoadSerial=2;const fresh=h.context.loadEditItems(1);h.respond(0,[{nama_barang:'Stale same ID'}]);await old;assert.equal(h.added.length,0);h.respond(1,[]);await fresh;assert.equal(h.added.length,1);assert.equal(h.added[0].item,null);
});
test('item timeout blocks saving until explicit retry loads complete data',async()=>{
 const h=setup();let task=h.context.loadEditItems(1);assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),false);h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();h.fire(20000);await task;assert.equal(h.nodes.editFormSp.dataset.spItemsState,'error');assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),false);assert.match(h.nodes.editRows.textContent,/terlalu lama/);h.nodes.editRows.children[0].emit('click');h.respond(1,[{nama_barang:'Loaded',jumlah:'2',harga_satuan:'10.000'}]);await tick();assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),true);assert.equal(h.dialogs.length,2);
});
test('closed dialogs and malformed item collections cannot replace item rows or mark them ready',async()=>{
 const h=setup();let task=h.context.loadEditItems(1);h.nodes.editModal.classList.add('hidden');h.context.cancelSpFormLookups();h.respond(0,[{nama_barang:'closed'}]);await task;assert.equal(h.added.length,0);
 for(const data of [{rows:[]},[null],[{}],[{nama_barang:[]}],[{nama_barang:'x',jumlah:{}}]]){
  const h=setup();const task=h.context.loadEditItems(1);h.respond(0,data);await task;assert.equal(h.nodes.editFormSp.dataset.spItemsState,'error');assert.equal(h.added.length,0);assert.equal(h.nodes.editRows.children[0].textContent,'Cek ulang');
 }
});
test('edit readiness checks both items and PPBJ reads and accepts legacy forms without readiness state',()=>{
 const h=setup();assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),true);h.nodes.editFormSp.dataset.spItemsState='ready';h.nodes.editFormSp.dataset.spPpbjState='error';assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),false);h.nodes.editFormSp.dataset.spPpbjState='ready';assert.equal(h.context.ensureSpEditDataReady(h.nodes.editFormSp),true);
});
