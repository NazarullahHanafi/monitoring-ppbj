const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/sp/sp.js','utf8').replace(/\r\n/g,'\n');
const block=source.slice(source.indexOf('/* BEGIN SP INLINE VENDOR SAVE */'),source.indexOf('/* END SP INLINE VENDOR SAVE */'));
const tick=()=>new Promise(setImmediate);
class Element {
 constructor(){this.value='';this.disabled=false;this.dataset={};this.attributes=new Map();this.children=[];this.text='';this.classes=new Set();this.classList={contains:x=>this.classes.has(x),add:(...x)=>x.forEach(v=>this.classes.add(v)),remove:(...x)=>x.forEach(v=>this.classes.delete(v)),toggle:(x,value)=>{if(value??!this.classes.has(x))this.classes.add(x);else this.classes.delete(x);}};}
 set textContent(value){this.text=String(value);this.children=[];}get textContent(){return this.text+this.children.map(child=>child.textContent).join('');}
 setAttribute(k,v){this.attributes.set(k,String(v));}getAttribute(k){return this.attributes.get(k)??null;}removeAttribute(k){this.attributes.delete(k);}appendChild(child){this.children.push(child);}focus(){this.focused=true;}
 get validity(){return{typeMismatch:this.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)};}
}
function setup(){
 const ids=['newVendorNama','newVendorAlamat','newVendorTelp','newVendorFax','newVendorEmail','newVendorNpwp','newVendorDirektur','newVendorJabatan','newVendorStatus','newVendorBoxSp','newVendorBtnText','newVendorSpinner','addFormSp','addModal','vendorSelectSp','toggleNewVendorSp','saveButton','submitButton','cancelButton','closeButton'];
 const nodes=Object.fromEntries(ids.map(id=>[id,new Element()]));
 nodes.newVendorNama.value='Vendor Aman';nodes.newVendorEmail.value='vendor@example.test';nodes.newVendorBtnText.textContent='Simpan Vendor';nodes.newVendorSpinner.classList.add('hidden');nodes.newVendorFax.disabled=true;nodes.addFormSp.action='/sp';nodes.vendorSelectSp.value='Vendor Lama';
 const inputs=ids.filter(id=>/^newVendor(Nama|Alamat|Telp|Fax|Email|Npwp|Direktur|Jabatan)$/.test(id)).map(id=>nodes[id]);
 nodes.newVendorBoxSp.querySelectorAll=()=>[...inputs,nodes.saveButton,nodes.cancelButton];nodes.addFormSp.querySelectorAll=()=>[nodes.submitButton,nodes.vendorSelectSp,nodes.toggleNewVendorSp];nodes.addModal.querySelectorAll=()=>[nodes.closeButton];
 const requests=[],timers=new Map(),events={},toasts=[],selected=[];let timerId=0;
 const jquery={val:()=>nodes.vendorSelectSp.value,removeData(){}};
 const context={window:{location:{origin:'https://sp.test'},addEventListener:(name,fn)=>events[name]=fn},document:{getElementById:id=>nodes[id],documentElement:{classList:{contains:()=>false}},createElement:()=>new Element()},URL,AbortController,DOMException,FormData,VENDOR_STORE_URL:'/vendors',CSRF_TOKEN:'synthetic-csrf',
  setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),$:()=>jquery,
  setVendorStatus:(text)=>{nodes.newVendorStatus.textContent=text;},ensureSelectHasValue:(selector,value)=>{selected.push(value);nodes.vendorSelectSp.value=value;},resetNewVendorForm:()=>{inputs.forEach(input=>input.value='');},Swal:{fire:options=>toasts.push(options)}};
 vm.createContext(context);vm.runInContext(block,context);
 const respond=(i,data={id:7,nama_vendor:'Vendor Aman'},extra={})=>requests[i].resolve({ok:true,status:201,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 const fire=()=>{for(const[id,timer]of [...timers]){timers.delete(id);timer.fn();}};
 return{nodes,inputs,requests,timers,events,toasts,selected,context,respond,fire,save:()=>context.saveNewVendor(),busy:()=>vm.runInContext('spInlineVendorOperation !== null',context)};
}
test('inline vendor locks repeated clicks and sends one same-origin CSRF-protected write with all profile fields',async()=>{
 const h=setup();h.nodes.newVendorAlamat.value='Alamat';h.nodes.newVendorTelp.value='0761';h.nodes.newVendorNpwp.value='NPWP';h.nodes.newVendorDirektur.value='Direktur';h.nodes.newVendorJabatan.value='Ketua';
 const task=h.save();await h.save();assert.equal(h.requests.length,1);const {options}=h.requests[0];assert.equal(options.headers['X-CSRF-TOKEN'],'synthetic-csrf');assert.equal(options.body.get('_token'),'synthetic-csrf');assert.equal(options.body.get('nama_vendor'),'Vendor Aman');assert.equal(options.body.get('email'),'vendor@example.test');assert.equal(options.body.get('npwp'),'NPWP');assert.equal(options.body.get('direktur'),'Direktur');assert.equal(options.cache,'no-store');assert.equal(options.credentials,'same-origin');assert.equal(h.nodes.submitButton.disabled,true);assert.equal(h.nodes.closeButton.disabled,true);assert.equal(h.nodes.addFormSp.dataset.inlineVendorSaving,'true');h.respond(0);await task;assert.equal(h.selected.length,1);assert.equal(h.nodes.newVendorBoxSp.classList.contains('hidden'),true);assert.equal(h.nodes.newVendorNama.value,'');assert.equal(h.nodes.newVendorFax.disabled,true);assert.equal(h.nodes.submitButton.disabled,false);assert.equal(h.nodes.newVendorSpinner.classList.contains('hidden'),true);assert.equal(h.timers.size,0);
});
test('required, email and length errors receive inline feedback before any write',async()=>{
 for(const [id,value]of [['newVendorNama','  '],['newVendorEmail','invalid email'],['newVendorAlamat','x'.repeat(501)],['newVendorTelp','x'.repeat(51)]]){
  const h=setup();h.nodes[id].value=value;await h.save();assert.equal(h.requests.length,0);assert.equal(h.nodes[id].getAttribute('aria-invalid'),'true');assert.equal(h.nodes[id].focused,true);assert.ok(h.nodes.newVendorStatus.textContent.length>0);assert.equal(h.nodes.submitButton.disabled,false);
 }
});
test('422 field errors preserve the complete draft and remain literal text',async()=>{
 const h=setup(),task=h.save();h.respond(0,{errors:{email:['<img src=x> Email salah']}},{ok:false,status:422});await task;assert.equal(h.nodes.newVendorNama.value,'Vendor Aman');assert.equal(h.nodes.newVendorEmail.value,'vendor@example.test');assert.equal(h.nodes.newVendorEmail.getAttribute('aria-invalid'),'true');assert.match(h.nodes.newVendorStatus.textContent,/<img/);assert.equal(h.nodes.newVendorStatus.children.length,0);assert.equal(h.selected.length,0);assert.equal(h.busy(),false);
});
test('expired sessions, denied access and rate limits get safe feedback without exposing response details',async()=>{
 for(const status of [401,403,419,429]){
  const h=setup(),task=h.save();h.respond(0,{message:'PRIVATE SQL'},{ok:false,status});await task;assert.doesNotMatch(h.nodes.newVendorStatus.textContent,/PRIVATE/);assert.equal(h.nodes.newVendorNama.value,'Vendor Aman');assert.equal(h.requests.length,1);assert.equal(h.busy(),false);
 }
});
test('timeout covers both an unresponsive connection and an unresponsive JSON body, retaining drafts and linking to verification',async()=>{
 for(const stalledBody of [false,true]){
  const h=setup(),task=h.save();if(stalledBody){h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();}h.fire();await task;assert.match(h.nodes.newVendorStatus.textContent,/belum dapat dipastikan/);const link=h.nodes.newVendorStatus.children[0];assert.equal(new URL(link.href).searchParams.get('search'),'Vendor Aman');assert.equal(link.target,'_blank');assert.equal(link.rel,'noopener');assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(h.nodes.newVendorNama.value,'Vendor Aman');assert.equal(h.selected.length,0);assert.equal(h.busy(),false);assert.equal(h.timers.size,0);
 }
});
test('late success after a timeout cannot clear a draft or select a vendor',async()=>{
 const h=setup(),task=h.save();h.fire();await task;h.nodes.newVendorNama.value='New draft';h.respond(0);await tick();assert.equal(h.nodes.newVendorNama.value,'New draft');assert.equal(h.selected.length,0);assert.equal(h.toasts.length,0);
});
test('HTML, redirects, invalid JSON and incomplete or mismatched success responses cannot claim success',async()=>{
 for(const [data,extra]of [[null,{}],[[],{}],[{id:7},{}],[{id:'7',nama_vendor:'Vendor Aman'},{}],[{id:7,nama_vendor:'Other vendor'},{}],[{id:7,nama_vendor:'Vendor Aman'},{redirected:true}],[{},{headers:{get:()=> 'text/html'}}],[{},{json:async()=>{throw new SyntaxError('private detail');}}]]){
  const h=setup(),task=h.save();h.respond(0,data,extra);await task;assert.match(h.nodes.newVendorStatus.textContent,/belum dapat dipastikan/);assert.equal(h.nodes.newVendorNama.value,'Vendor Aman');assert.equal(h.selected.length,0);assert.equal(h.toasts.length,0);
 }
});
test('page departure aborts the outstanding write and ignores late confirmation without resubmitting',async()=>{
 const h=setup(),task=h.save();h.events.pagehide();await task;h.respond(0);await tick();assert.equal(h.requests.length,1);assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(h.nodes.newVendorNama.value,'Vendor Aman');assert.match(h.nodes.newVendorStatus.textContent,/belum terkonfirmasi/);assert.equal(h.selected.length,0);assert.equal(h.busy(),false);
});
test('a confirmed vendor cannot overwrite a changed draft, selection or form action',async()=>{
 for(const change of [h=>h.nodes.newVendorNama.value='Different draft',h=>h.nodes.vendorSelectSp.value='Other choice',h=>h.nodes.addFormSp.action='/sp/new']){
  const h=setup(),task=h.save();change(h);h.respond(0);await task;assert.equal(h.selected.length,0);assert.match(h.nodes.newVendorStatus.textContent,/sudah disimpan/);assert.equal(h.nodes.newVendorBoxSp.classList.contains('hidden'),false);
 }
});
test('names containing markup stay in text-only toast fields and options',async()=>{
 const h=setup();h.nodes.newVendorNama.value='<img src=x onerror=bad=1>';const task=h.save();h.respond(0,{id:7,nama_vendor:h.nodes.newVendorNama.value});await task;assert.equal(h.toasts[0].title,undefined);assert.equal(h.toasts[0].titleText,'Vendor berhasil ditambahkan');assert.equal(h.toasts[0].text,'<img src=x onerror=bad=1>');assert.equal(h.selected[0],'<img src=x onerror=bad=1>');
});
test('hidden panels, active SP saves and foreign endpoints never send an inline write',async()=>{
 const hidden=setup();hidden.nodes.newVendorBoxSp.classList.add('hidden');await hidden.save();assert.equal(hidden.requests.length,0);
 const busy=setup();busy.nodes.addFormSp.dataset.procurementSaving='true';await busy.save();assert.equal(busy.requests.length,0);
 const foreign=setup();foreign.context.VENDOR_STORE_URL='https://outside.test/vendors';await foreign.save();assert.equal(foreign.requests.length,0);assert.match(foreign.nodes.newVendorStatus.textContent,/tidak valid/);
});
