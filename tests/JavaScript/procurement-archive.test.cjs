const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('public/assets/app/procurement-archive.js','utf8');
const tick=()=>new Promise(setImmediate);
function setup(){
 const requests=[],timers=new Map(),events={},messages=[],updates=[];let id=0,closed=0;
 const controls=[{disabled:false},{disabled:true}],confirm={disabled:false,style:{setProperty(){}}},cancel={textContent:'Batal'},popup={querySelectorAll:()=>controls,classList:{contains:()=>true}};
 const context={URL,DOMException,AbortController,Date,setTimeout:(fn,delay)=>{timers.set(++id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),
  window:{location:{origin:'https://procurement.test'},requestAnimationFrame:fn=>fn(),addEventListener:(name,fn)=>events[name]=fn,Swal:{getPopup:()=>popup,getConfirmButton:()=>confirm,getCancelButton:()=>cancel,close:()=>closed++,showValidationMessage:html=>messages.push(html),update:options=>updates.push(options)}},
  fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))};
 vm.runInNewContext(source,context);
 const respond=(i,data={ok:true,archived:true,message:'Dipindahkan'},extra={})=>requests[i].resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data,...extra});
 return{...context.window.ProcurementArchive,requests,timers,events,messages,updates,controls,confirm,cancel,closed:()=>closed,respond,deadline:()=>{for(const[id,t]of [...timers]){assert.equal(t.delay,30000);timers.delete(id);t.fn();}}};
}
test('archive accepts only matching same-origin numeric document routes and owns review through final release',()=>{
 const h=setup();for(const [kind,url]of [['x','/sp/1'],['sp','/spph/1'],['sp','/sp/0'],['sp','/sp/01'],['sp','/sp/9007199254740992'],['sp','/sp/1?x=1'],['sp','/sp/1#x'],['sp','https://foreign.test/sp/1'],['sp','https://user:pass@procurement.test/sp/1']])assert.equal(h.begin(kind,url),null);
 const op=h.begin('sp','/sp/12');assert.ok(op);assert.equal(h.begin('sp','/sp/13'),null);assert.equal(h.begin('spph','/spph/1'),null);let clean=0;op.onRelease(()=>clean++);op.release();op.release();assert.equal(clean,1);assert.ok(h.begin('spph','/spph/1'));
});
test('one CSRF-protected private DELETE owns the controls and preserves literal password/reason values',async()=>{
 const h=setup(),op=h.begin('sp','/sp/1');const task=op.request({creator_password:' secret ',archive_reason:'Alasan'},'csrf');
 assert.equal(op.busy,true);assert.deepEqual(h.controls.map(x=>x.disabled),[true,true]);await assert.rejects(op.request({},'csrf'),/masih diproses/);assert.equal(h.requests.length,1);
 const {url,options}=h.requests[0];assert.equal(url,'https://procurement.test/sp/1');assert.equal(options.method,'DELETE');assert.equal(options.credentials,'same-origin');assert.equal(options.cache,'no-store');assert.equal(options.headers['X-CSRF-TOKEN'],'csrf');assert.equal(options.headers['X-Requested-With'],'XMLHttpRequest');assert.equal(JSON.parse(options.body).creator_password,' secret ');
 h.respond(0);assert.equal((await task).ok,true);assert.equal(op.busy,false);assert.equal(op.uncertain,false);assert.deepEqual(h.controls.map(x=>x.disabled),[false,true]);assert.equal(h.timers.size,0);op.release();
});
test('missing CSRF never sends a write or locks controls',async()=>{
 const h=setup(),op=h.begin('spph','/spph/1');await assert.rejects(op.request({},''),/Sesi formulir/);assert.equal(h.requests.length,0);assert.equal(op.busy,false);assert.equal(op.uncertain,false);
});
test('connection and body deadlines mark an uncertain result, release controls and prevent every resend',async()=>{
 for(const body of [false,true]){const h=setup(),op=h.begin('spph','/spph/1'),task=op.request({},'csrf');if(body){h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();}h.deadline();await assert.rejects(task,error=>error.uncertain===true);assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(op.busy,false);assert.equal(h.timers.size,0);await assert.rejects(op.request({},'csrf'));assert.equal(h.requests.length,1);}
});
test('HTML, redirected, truncated and incomplete successful responses cannot claim archival',async()=>{
 for(const [data,extra]of [[{},{}],[{ok:true},{}],[{archived:true},{}],[null,{}],[[],{}],[{ok:true,archived:true},{redirected:true}],[{ok:true,archived:true},{headers:{get:()=> 'text/html'}}],[{},{json:async()=>{throw new SyntaxError('PRIVATE');}}]]){
  const h=setup(),op=h.begin('sp','/sp/1'),task=op.request({},'csrf');h.respond(0,data,extra);await assert.rejects(task,error=>error.uncertain===true&&!error.message.includes('PRIVATE'));assert.equal(op.uncertain,true);}
});
test('known rejections preserve explicit password retries, and internal errors expose no private details',async()=>{
 for(const status of [401,403,404,409,419,422,429,500]){const h=setup(),op=h.begin('sp','/sp/1'),task=op.request({},'csrf');h.respond(0,{message:status===422?'Password salah. Sisa percobaan: 2.':'PRIVATE SQL'},{ok:false,status});await assert.rejects(task,error=>!error.message.includes('PRIVATE')&&(status!==422||error.message.includes('Sisa percobaan: 2')));assert.equal(op.uncertain,status===500);if(status!==500){const next=op.request({},'csrf');h.respond(1);assert.equal((await next).ok,true);}}
});
test('only complete lock responses reach the countdown',async()=>{
 for(const valid of [true,false]){const h=setup(),op=h.begin('spph','/spph/1'),task=op.request({},'csrf');h.respond(0,{locked:true,retry_after:valid?900:'900',locked_until:'2026-11-18T18:00:00+07:00',message:'Aksi dikunci'},{ok:false,status:429});if(valid){assert.equal((await task).locked,true);assert.equal(op.uncertain,false);}else await assert.rejects(task,error=>error.uncertain===true);}
});
test('uncertain feedback is escaped, hides resubmit and links only to the matching active/trash lists',()=>{
 const h=setup();h.feedback({message:'<img src=x onerror=bad=1>',uncertain:true},'spph');assert.match(h.messages[0],/&lt;img/);assert.doesNotMatch(h.messages[0],/<img/);assert.match(h.messages[0],/href="\/spph\/trash"/);assert.match(h.messages[0],/rel="noopener"/);assert.equal(h.confirm.disabled,true);assert.equal(h.cancel.textContent,'Tutup dan periksa');assert.equal(h.updates.length,0);h.feedback({message:'bad',uncertain:true},'../evil');assert.equal(h.messages.length,1);
});
test('page departure cancels outstanding writes and releases cleanup once; late success cannot take new ownership',async()=>{
 const h=setup(),op=h.begin('sp','/sp/1');let cleaned=0;op.onRelease(()=>cleaned++);const task=op.request({},'csrf');h.events.pagehide();await assert.rejects(task);assert.equal(cleaned,1);assert.equal(h.closed(),1);assert.equal(op.current,false);const next=h.begin('sp','/sp/2');h.respond(0);await tick();op.release();assert.equal(next.current,true);assert.equal(cleaned,1);
});
