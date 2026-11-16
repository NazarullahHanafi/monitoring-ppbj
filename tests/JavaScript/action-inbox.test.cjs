const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/collaboration-inbox/inbox.js', 'utf8');
const transport = source.slice(source.indexOf('    async function request('), source.indexOf('    function stopSearch('));
function harness(fetch) {
    let timer, cleared = 0;
    const window = {setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    const context = {fetch, window, AbortController, DOMException, document: {querySelector: () => null}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.request, timeout: () => timer(), cleared: () => cleared};
}
const reply = (data, status = 200) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data});
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};

test('inbox writes retain method spoofing, version, CSRF and private request settings', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return reply({success: true});});
    const body = new URLSearchParams({_token: 'synthetic', _method: 'PATCH', version: '3', action: 'return'});
    await h.request('/collaboration-inbox/uuid/status', {method: 'POST', body});
    assert.equal(sent.options.body, body); assert.equal(sent.options.method, 'POST');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(h.cleared(), 1);
});

test('stalled inbox response body times out once without resending a mutation', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {...reply({}), json: () => new Promise(() => {})};});
    const pending = h.request('/collaboration-inbox', {method: 'POST'}); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*memeriksa hasil/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});

test('HTML, redirects, malformed JSON and unsuccessful payloads never acknowledge a saved task', async () => {
    for (const response of [{...reply({}), headers: {get: () => 'text/html'}}, {...reply({success: true}), redirected: true}, reply({}), reply({success: false}), reply([]), {...reply({}), json: async () => {throw Error('private parser detail');}}]) {
        const h = harness(async () => response);
        await assert.rejects(h.request('/collaboration-inbox', {method: 'POST'}), /belum dapat diverifikasi|belum lengkap/);
    }
});

test('inbox permissions, stale versions, expiry and rate limits give safe errors', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [403, /izin/], [409, /Tugas telah berubah/], [419, /Sesi formulir/], [429, /Tunggu/], [500, /belum terkonfirmasi/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request('/collaboration-inbox', {method: 'POST'}), error => error.status === status && pattern.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {checked: ['Checklist tidak dikenali.']}}, 422));
    await assert.rejects(h.request('/collaboration-inbox', {method: 'POST'}), error => error.fields.checked[0] === 'Checklist tidak dikenali.');
});

test('aborting an obsolete inbox search wins even if the server ignores cancellation', async () => {
    let finish;
    const h = harness(() => new Promise(resolve => {finish = resolve;})), controller = new AbortController();
    const pending = h.request('/calendar/ppbj-search?q=old', {}, controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError');
    finish(reply({results: [{id: 1, ppbj_no: 'OLD'}]})); await flush(); assert.equal(h.cleared(), 1);
});
