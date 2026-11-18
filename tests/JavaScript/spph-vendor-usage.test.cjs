const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('public/assets/spph/spph.js','utf8');
const between=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b));
const lookup=between('/* BEGIN SPPH LOOKUP READS */','/* END SPPH LOOKUP READS */');
const vendor=between('function vendorUsageKey(name)', '        function cancelNewVendorSpph()');
const tick=()=>new Promise(setImmediate);
class Element{
 constructor(){this.children=[];this.value=[];this.attrs={};this.text='';this.html='';this.events={};this.classes=new Set();this.classList={add:(...xs)=>xs.forEach(x=>this.classes.add(x)),remove:(...xs)=>xs.forEach(x=>this.classes.delete(x)),contains:x=>this.classes.has(x)};}
 set textContent(v){this.text=String(v);this.html='';this.children=[];}get textContent(){return this.text+this.children.map(c=>c.textContent).join('');}
 set innerHTML(v){this.html=v;this.text='';this.children=[];}get innerHTML(){return this.html;}
 setAttribute(k,v){this.attrs[k]=v;}appendChild(c){this.children.push(c);}addEventListener(k,fn){this.events[k]=fn;}
}
function setup(){
 const ids=['addModal','editModal','vendorSelect','editVendor','vendorUsagePanel','editVendorUsagePanel'];const nodes=Object.fromEntries(ids.map(id=>[id,new Element()]));
 nodes.editModal.classList.add('hidden');nodes.vendorSelect.value=['Vendor Audit'];
 const requests=[],timers=new Map(),events={},page={};let timerId=0,now=100;
 const document={hidden:false,getElementById:id=>nodes[id],createElement:()=>new Element(),addEventListener:(name,fn)=>(events[name]??=[]).push(fn)};
 const context={document,window:{location:{origin:'https://spph.test'},addEventListener:(name,fn)=>(page[name]??=[]).push(fn)},URL,AbortController,DOMException,
  Date:class extends Date{static now(){return now;}},setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id),
  fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),VENDOR_USAGE_STATS_URL:'/spph/vendor-usage-stats',
  $:selector=>({val:()=>nodes[selector.slice(1)].value,trigger(){return this;}}),
  escapedHtml:value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')};
 vm.createContext(context);vm.runInContext(lookup+'\n'+vendor,context);
 const respond=(i,data={stats:{'vendor audit':row()}},extra={})=>requests[i].resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 return{context,nodes,requests,timers,document,respond,load:()=>context.ensureVendorUsageStats(),state:()=>vm.runInContext('vendorUsageState',context),
  advance:()=>now+=60000,cancel:()=>context.cancelSpphFormLookups(),deadline:()=>{for(const[id,t]of [...timers])if(t.delay===20000){timers.delete(id);t.fn();}},
  event:name=>(events[name]||page[name]||[]).forEach(fn=>fn()),usage:name=>context.vendorUsageFor(name),badge:name=>context.vendorUsageBadgeText(name)};
}
function row(extra={}){return{name:'Vendor Audit',spph_count:2,sp_count:3,total_count:5,last_used_at:'2026-11-18',last_used_label:'18 Nov 2026',last_document:'1/AUDIT/SP/2026',status:'cukup-sering',hint:'Riwayat uji',...extra};}
test('unknown statistics never claim zero and simultaneous callers share one private bounded GET',async()=>{
 const h=setup();assert.equal(h.usage('Vendor Audit'),null);assert.match(h.badge('Vendor Audit'),/belum tersedia/);
 const task=h.load();assert.equal(h.load(),task);assert.equal(h.requests.length,1);assert.match(h.nodes.vendorUsagePanel.textContent,/Memuat/);
 const options=h.requests[0].options;assert.equal(options.cache,'no-store');assert.equal(options.credentials,'same-origin');assert.equal(options.headers.Accept,'application/json');
 h.respond(0);await task;assert.equal(h.badge('Vendor Audit'),'5x');assert.equal(h.usage('Vendor Baru').total_count,0);assert.equal(h.requests.length,1);await h.load();assert.equal(h.requests.length,1);assert.equal(h.timers.size,0);
});
test('fresh cache is reused for a minute and an expired snapshot must finish refreshing before claiming counts',async()=>{
 const h=setup(),first=h.load();h.respond(0);await first;h.advance();const second=h.load();assert.equal(h.requests.length,2);assert.equal(h.usage('Vendor Audit'),null);h.respond(1,{stats:{'vendor audit':row({spph_count:3,total_count:6})}});await second;assert.equal(h.badge('Vendor Audit'),'6x');
});
test('connection and JSON body deadlines release controls, show an explicit retry and never retry automatically',async()=>{
 for(const body of [false,true]){const h=setup(),task=h.load();if(body){h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();}h.deadline();await task;
  assert.equal(h.state(),'error');assert.equal(h.usage('Vendor Audit'),null);assert.match(h.nodes.vendorUsagePanel.textContent,/belum dapat dipastikan/);assert.equal(h.requests.length,1);assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(h.timers.size,0);
  const retry=h.nodes.vendorUsagePanel.children[0].children[0];assert.equal(retry.type,'button');assert.equal(retry.textContent,'Cek ulang');const next=retry.events.click();h.respond(1);await next;assert.equal(h.badge('Vendor Audit'),'5x');}
});
test('cancellation releases ownership immediately and late replies cannot replace a reopened read',async()=>{
 const h=setup(),old=h.load();h.cancel();const next=h.load();assert.equal(h.requests.length,2);h.respond(0,{stats:{}});await old;assert.equal(h.state(),'loading');h.respond(1);await next;assert.equal(h.badge('Vendor Audit'),'5x');
});
test('hidden tabs and page departure cancel the read; returning exposes retry without an automatic request',async()=>{
 for(const departure of [false,true]){const h=setup(),task=h.load();if(!departure)h.document.hidden=true;h.event(departure?'pagehide':'visibilitychange');await task;assert.equal(h.state(),'paused');assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(h.requests.length,1);
  h.document.hidden=true;await h.load();assert.equal(h.requests.length,1);h.document.hidden=false;h.event('visibilitychange');assert.match(h.nodes.vendorUsagePanel.textContent,/Cek ulang/);assert.equal(h.requests.length,1);h.respond(0);await tick();assert.equal(h.state(),'paused');}
});
test('malformed DTOs cannot become cached zero counts or inject status classes',async()=>{
 const bad=[null,{}, {stats:[{}]}, {stats:{x:row({total_count:9})}}, {stats:{x:row({sp_count:-1,total_count:1})}}, {stats:{x:row({spph_count:'2'})}}, {stats:{x:row({status:'normal" onclick="bad=1'})}}, {stats:{x:row({last_document:[]})}}, {stats:{x:row({last_used_at:'invalid'})}}, {stats:{x:row({name:[]})}}];
 for(const data of bad){const h=setup(),task=h.load();h.respond(0,data);await task;assert.equal(h.state(),'error');assert.equal(h.usage('Vendor Audit'),null);assert.doesNotMatch(h.nodes.vendorUsagePanel.innerHTML,/onclick/);}
});
test('HTML, redirects, session, access and rate errors remain unavailable without exposing private details',async()=>{
 for(const extra of [{headers:{get:()=> 'text/html'}},{redirected:true},...[401,403,419,429,500].map(status=>({ok:false,status})),{json:async()=>{throw new SyntaxError('PRIVATE SQL');}}]){
  const h=setup(),task=h.load();h.respond(0,{message:'PRIVATE SQL'},extra);await task;assert.equal(h.state(),'error');assert.equal(h.usage('Vendor Audit'),null);assert.doesNotMatch(h.nodes.vendorUsagePanel.textContent,/PRIVATE SQL/);assert.equal(h.requests.length,1);}
});
test('empty dictionaries are valid, inherited names stay new and own prototype keys remain safe',async()=>{
 for(const stats of [{},[]]){const h=setup(),task=h.load();h.respond(0,{stats});await task;assert.equal(h.badge('constructor'),'0x');assert.equal(h.badge('__proto__'),'0x');}
 const h=setup(),task=h.load();const stats=JSON.parse('{"__proto__":{}}');stats.__proto__=row({name:'__proto__'});h.respond(0,{stats});await task;assert.equal(h.badge('__proto__'),'5x');assert.equal(h.badge('constructor'),'0x');
});
test('literal markup is escaped in loaded cards and supplementary Unicode vendor names remain valid',async()=>{
 const h=setup(),task=h.load();h.respond(0,{stats:{'vendor audit':row({name:'😀'.repeat(255),hint:'<img src=x onerror=bad=1>',last_document:'<script>bad=1</script>'})}});await task;assert.equal(h.state(),'ready');assert.match(h.nodes.vendorUsagePanel.innerHTML,/&lt;img/);assert.match(h.nodes.vendorUsagePanel.innerHTML,/&lt;script/);assert.doesNotMatch(h.nodes.vendorUsagePanel.innerHTML,/<script>|<img/);
});
