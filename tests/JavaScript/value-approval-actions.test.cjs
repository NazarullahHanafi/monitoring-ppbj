const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/app/value-approval-actions.js', 'utf8');
const transport = source.slice(source.indexOf('    async function send('), source.indexOf('    root.querySelectorAll('));
const reply = (data, status = 200) => ({ok:status < 400, status, headers:{get:()=> 'application/json'}, json:async()=>data});
function harness(fetch) {
    let timer; const context = {fetch, URL, AbortController, DOMException, window:{location:{href:'https://fixture.test/sp/value-approvals',origin:'https://fixture.test'}}, setTimeout:fn=>{timer=fn;return 1;},clearTimeout:()=>{}};
    vm.createContext(context); vm.runInContext(transport,context); return {send:context.send,timeout:()=>timer()};
}
test('value decision includes CSRF and caller decision and state token in a private POST', async () => {
    let sent; const h = harness(async(url, options)=>{sent={url,options};return reply({success:true});});
    const body = new URLSearchParams({_token:'synthetic',decision:'rejected',review_token:'state-token'});
    await h.send('/sp/value-approvals/4/decision',body,new AbortController());
    assert.equal(sent.options.body,body);assert.equal(sent.options.method,'POST');assert.equal(sent.options.headers['X-CSRF-TOKEN'],'synthetic');assert.equal(sent.options.credentials,'same-origin');assert.equal(sent.options.cache,'no-store');
});
test('value decision rejects HTML redirects unsuccessful payloads and external targets', async () => {
    for (const response of [{...reply({}),headers:{get:()=> 'text/html'}},{...reply({success:true}),redirected:true},reply({}),reply({success:false})]) {
        await assert.rejects(harness(async()=>response).send('/sp/value-approvals/4/decision',new URLSearchParams(),new AbortController()),/belum dapat diverifikasi|belum lengkap/);
    }
    let calls=0;const h=harness(async()=>{calls++;return reply({success:true});});
    await assert.rejects(h.send('https://untrusted.test/steal',new URLSearchParams(),new AbortController()),/Tujuan pengajuan/);assert.equal(calls,0);
});
test('value decision timeout covers stalled JSON and abort ignores late delivery without retry', async () => {
    let calls=0;const h=harness(async()=>{calls++;return {...reply({}),json:()=>new Promise(()=>{})};});
    const pending=h.send('/decision',new URLSearchParams(),new AbortController());for(let i=0;i<12;i++)await Promise.resolve();h.timeout();
    await assert.rejects(pending,/belum terkonfirmasi/);assert.equal(calls,1);
    const controller=new AbortController(), late=harness(()=>new Promise(()=>{}));const canceled=late.send('/decision',new URLSearchParams(),controller);controller.abort();await assert.rejects(canceled,error=>error.name==='AbortError');
});
test('value decision distinguishes stale context permissions expiry and throttling while hiding server internals', async () => {
    for (const [status, pattern] of [[401,/Sesi berakhir/],[403,/izin/],[409,/Pengajuan telah berubah/],[419,/Sesi formulir/],[429,/Tunggu/],[500,/belum terkonfirmasi/]]) {
        const h=harness(async()=>reply({message:'SQL private detail'},status));
        await assert.rejects(h.send('/decision',new URLSearchParams(),new AbortController()),error=>error.status===status&&pattern.test(error.message)&&!error.message.includes('SQL'));
    }
});
