const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
class FormDataStub {
    constructor(form){ this.values = new Map(Object.entries(form?.fields || {})); }
    set(key,value){ this.values.set(key,value); }
    delete(key){ this.values.delete(key); }
}
function setup(data, confirmed = false) {
    data = {title:'Simulasi', summary:[], prs:[], requires_approval:false, approved:false, nilai_pr:0, nilai_sp:0, selisih:0, ...data};
    const events = new Map(), requests = [], dialogs = [], window = {addEventListener: (name, callback) => events.set(name, callback)};
    const form = {action:'https://example.com/sp/4', fields:{_method:'PUT', nama_vendor:'Vendor'}, inert:false, querySelectorAll:()=>[]};
    const context = {window, FormData:FormDataStub, URL, Intl, AbortController, DOMException, setTimeout, clearTimeout, location:{origin:'https://example.com'}, document:{querySelector:()=>({content:'csrf-test'})},
        fetch:async(url,options)=>{ requests.push({url,options}); return {ok:true,headers:{get:()=> 'application/json'},json:async()=>data}; },
        Swal:{fire:async options=>{dialogs.push(options); return {isConfirmed:confirmed};}, showValidationMessage(){}}};
    window.Swal = context.Swal;
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/assets/app/procurement-date-warning.js'), 'utf8'), context);
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/assets/app/procurement-review.js'), 'utf8'), context);
    return {form,requests,dialogs,review:window.ProcurementReview,window,context,events};
}
test('edit preview strips _method, escapes database text and cancellation never saves', async()=>{
    const h=setup({title:'Simulasi', document:'<img onerror=alert(1)>', vendor:'<script>x</script>', prs:[], summary:[]});
    assert.equal(await h.review.confirm(h.form,'sp',true),false);
    assert.equal(h.requests.length,1);
    assert.equal(h.requests[0].url,'/procurement-review/sp/4');
    assert.equal(h.requests[0].options.body.values.has('_method'),false);
    assert.ok(h.dialogs[0].html.includes('&lt;img'));
    assert.ok(!h.dialogs[0].html.includes('<script>'));
    assert.equal(h.form.inert,false);
});
test('unapproved excess cannot continue to save and does not auto-request approval',async()=>{
    const h=setup({requires_approval:true, approved:false, prs:[], summary:[]});
    assert.equal(await h.review.confirm(h.form,'sp',true),false);
    assert.equal(h.requests.length,1);
    assert.equal(h.dialogs[0].confirmButtonText,'Ajukan persetujuan');
});
test('confirmation permits caller to save only after a successful preview',async()=>{
    const h=setup({title:'Simulasi', prs:[], summary:[]},true);
    assert.equal(await h.review.confirm(h.form,'spph',true),true);
    assert.equal(h.requests.length,1); assert.equal(h.form.inert,false);
});
test('delete preview is read only and cancellation never issues DELETE',async()=>{
    const h=setup({title:'Simulasi Sampah',prs:[],summary:[]});
    assert.equal(await h.review.confirmDelete('sp','/sp/4'),false);
    assert.equal(h.requests[0].url,'/procurement-review/sp/4');
    assert.equal(h.requests[0].options.method,'POST');
    assert.equal(h.requests[0].options.body.values.get('action'),'delete');
});

test('an already open page with an older asset list can still use the save preview', async()=>{
    const h=setup({title:'Simulasi',prs:[],summary:[]},true);
    delete h.window.ProcurementDateWarning;
    assert.equal(await h.review.confirm(h.form,'sp',false),true);
    assert.equal(h.requests.length,1);
});

test('slow preview aborts once, restores form interaction and never retries automatically', async()=>{
    const h=setup({});
    let timeout, cleared=0, attempts=0;
    h.context.setTimeout=(callback, milliseconds)=>{assert.equal(milliseconds,30000);timeout=callback;return 42;};
    h.context.clearTimeout=id=>{assert.equal(id,42);cleared++;};
    h.context.fetch=async(url,options)=>{attempts++;return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new Error('aborted'))));};
    const pending=h.review.confirm(h.form,'sp',false);
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(h.form.inert,true);
    timeout();
    assert.equal(await pending,false);
    assert.equal(attempts,1);assert.equal(cleared,1);assert.equal(h.form.inert,false);
    assert.match(h.dialogs[0].text,/Isian form tetap ada/);
});

test('preview clears its timeout after a server rejection and preserves an already inert form', async()=>{
    const h=setup({});
    let cleared=0;
    h.context.setTimeout=()=>17;
    h.context.clearTimeout=id=>{assert.equal(id,17);cleared++;};
    h.context.fetch=async()=>({ok:false,status:403,headers:{get:()=> 'application/json'},json:async()=>({message:'Akses ditolak'})});
    h.form.inert=true;
    assert.equal(await h.review.confirm(h.form,'sp',true),false);
    assert.equal(h.form.inert,true);assert.equal(cleared,1);
    assert.equal(h.dialogs[0].text,'Anda tidak memiliki izin untuk tindakan ini.');
});

test('duplicate preview and delete calls share one pending review operation', async () => {
    const h = setup({}, true); let finish;
    h.context.fetch = async (url, options) => {h.requests.push({url, options}); return new Promise(resolve => {finish = resolve;});};
    const pending = h.review.confirm(h.form, 'sp', true); await new Promise(resolve => setImmediate(resolve));
    assert.equal(await h.review.confirm(h.form, 'sp', true), false); assert.equal(await h.review.confirmDelete('sp', '/sp/4'), false); assert.equal(h.requests.length, 1);
    finish({ok:true, headers:{get:()=> 'application/json'}, json:async()=>({title:'Preview',summary:[],prs:[],requires_approval:false,approved:false,nilai_pr:0,nilai_sp:0,selisih:0})});
    assert.equal(await pending, true); assert.equal(h.form.inert, false);
});

test('HTML redirects and incomplete SP review payloads cannot permit a save', async () => {
    for (const response of [{ok:true,headers:{get:()=> 'text/html'},json:async()=>({})}, {ok:true,redirected:true,headers:{get:()=> 'application/json'},json:async()=>({})},
        {ok:true,headers:{get:()=> 'application/json'},json:async()=>({title:'Preview',summary:[],prs:[]})}]) {
        const h = setup({}, true); h.context.fetch = async () => response;
        assert.equal(await h.review.confirm(h.form, 'sp', false), false); assert.equal(h.dialogs[0].title, 'Simulasi belum tersedia'); assert.equal(h.form.inert, false);
    }
});

test('preview deadline releases a stalled JSON body even when fetch ignores cancellation', async () => {
    const h = setup({}); let timeout;
    h.context.setTimeout = callback => {timeout = callback; return 1;}; h.context.clearTimeout = () => {};
    h.context.fetch = async () => ({ok:true,headers:{get:()=> 'application/json'},json:()=>new Promise(()=>{})});
    const pending = h.review.confirm(h.form, 'sp', false); await new Promise(resolve => setImmediate(resolve)); timeout();
    assert.equal(await pending, false); assert.equal(h.form.inert, false); assert.match(h.dialogs[0].text, /Isian form tetap ada/);
});

test('page exit cancels a preview and ignores its late success without opening a dialog', async () => {
    const h = setup({}, true); let finish;
    h.context.fetch = () => new Promise(resolve => {finish = resolve;});
    const pending = h.review.confirm(h.form, 'sp', false); await new Promise(resolve => setImmediate(resolve)); h.events.get('pagehide')();
    assert.equal(await pending, false); assert.equal(h.form.inert, false);
    finish({ok:true,headers:{get:()=> 'application/json'},json:async()=>({})}); await new Promise(resolve => setImmediate(resolve)); assert.equal(h.dialogs.length, 0);
});

test('approval preConfirm cannot send the same request twice and reports only a verified acknowledgement', async () => {
    const h = setup({requires_approval:true}); let popup, closePopup, finish, ready;
    const shown = new Promise(resolve => {ready = resolve;});
    h.context.Swal.fire = options => {h.dialogs.push(options); if (options.preConfirm) {popup = options; ready(); return new Promise(resolve => {closePopup = resolve;});} return Promise.resolve({isConfirmed:false});};
    const original = h.context.fetch;
    h.context.fetch = (url, options) => url.startsWith('/sp/value-approvals/') ? new Promise(resolve => {h.requests.push({url,options}); finish = resolve;}) : original(url,options);
    const pending = h.review.confirm(h.form, 'sp', false); await shown;
    const save = popup.preConfirm('Alasan lengkap untuk persetujuan.'); assert.equal(popup.allowEscapeKey(), false);
    assert.equal(await popup.preConfirm('Alasan dikirim lagi.'), false); assert.equal(h.requests.length, 2);
    finish({ok:true,headers:{get:()=> 'application/json'},json:async()=>({success:true,id:8,message:'Pengajuan tersedia.'})});
    const result = await save; closePopup({isConfirmed:true,value:result}); assert.equal(await pending, false); assert.equal(h.requests.length, 2); assert.equal(h.form.inert, false);
});

test('an explicit retry after approval timeout uses a fresh request while the obsolete response stays ignored', async () => {
    const h = setup({requires_approval:true}); let popup, closePopup, ready, firstFinish; const timers=[];
    const shown=new Promise(resolve=>{ready=resolve;});h.context.setTimeout=callback=>{timers.push(callback);return timers.length;};h.context.clearTimeout=()=>{};
    h.context.Swal.fire=options=>{if(options.preConfirm){popup=options;ready();return new Promise(resolve=>{closePopup=resolve;});}return Promise.resolve({isConfirmed:false});};
    const original=h.context.fetch;let writes=0;
    h.context.fetch=(url,options)=>!url.startsWith('/sp/value-approvals/')?original(url,options):++writes===1?new Promise(resolve=>{firstFinish=resolve;}):Promise.resolve({ok:true,headers:{get:()=> 'application/json'},json:async()=>({success:true,id:8,message:'Available'})});
    const pending=h.review.confirm(h.form,'sp',false);await shown;
    const first=popup.preConfirm('Alasan lengkap untuk persetujuan.');timers.at(-1)();assert.equal(await first,false);assert.equal(writes,1);
    const result=await popup.preConfirm('Alasan lengkap untuk persetujuan.');assert.equal(result.id,8);assert.equal(writes,2);
    firstFinish({ok:true,headers:{get:()=> 'application/json'},json:async()=>({success:true,id:99,message:'Obsolete'})});closePopup({isConfirmed:true,value:result});assert.equal(await pending,false);assert.equal(h.form.inert,false);
});
