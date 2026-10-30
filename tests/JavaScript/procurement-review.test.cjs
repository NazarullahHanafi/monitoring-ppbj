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
    const requests = [], dialogs = [], window = {};
    const form = {action:'https://example.com/sp/4', fields:{_method:'PUT', nama_vendor:'Vendor'}, inert:false};
    const context = {window, FormData:FormDataStub, URL, Intl, location:{origin:'https://example.com'}, document:{querySelector:()=>({content:'csrf-test'})},
        fetch:async(url,options)=>{ requests.push({url,options}); return {ok:true,headers:{get:()=> 'application/json'},json:async()=>data}; },
        Swal:{fire:async options=>{dialogs.push(options); return {isConfirmed:confirmed};}, showValidationMessage(){}}};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/assets/app/procurement-review.js'), 'utf8'), context);
    return {form,requests,dialogs,review:window.ProcurementReview};
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
