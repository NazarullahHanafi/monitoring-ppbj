const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/vendor/vendor.js', 'utf8');
const transport = source.slice(source.indexOf('async function vendorRequest('), source.indexOf('function releaseVendor('));
function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, URL, AbortController, DOMException, vendorIndexUrl: '/vendors',
        window: {location: {href: 'https://vendor.test/vendors?search=old', origin: 'https://vendor.test'}},
        document: {querySelector: () => ({content: 'fallback-csrf'})},
        setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.vendorRequest, target: context.vendorTarget, timeout: () => timer(), cleared: () => cleared};
}
const body = new URLSearchParams({_token: 'synthetic', is_active: '0'});
const reply = (data, status = 200) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data});
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};

test('vendor action transport sends exact intent and CSRF without dropping form fields', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return reply({success: true, is_active: false});});
    await h.request('/vendors/1/toggle', body, new AbortController());
    assert.equal(sent.url, '/vendors/1/toggle'); assert.equal(sent.options.body, body); assert.equal(sent.options.method, 'POST');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.cache, 'no-store'); assert.equal(sent.options.credentials, 'same-origin'); assert.equal(h.cleared(), 1);
});
test('stalled body reaches its deadline and an uncertain vendor action is never retried', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {...reply({}), json: () => new Promise(() => {})};});
    const pending = h.request('/vendors/1/toggle', body, new AbortController()); await flush(); h.timeout();
    await assert.rejects(pending, /terlalu lama.*periksa daftar/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});
test('HTML login, JSON redirects and invalid response shapes do not become successful actions', async () => {
    for (const response of [{...reply({}), headers: {get: () => 'text/html'}}, {...reply({success: true}), redirected: true}, reply([]), reply(null)]) {
        const h = harness(async () => response);
        await assert.rejects(h.request('/vendors', body, new AbortController()), /belum dapat diverifikasi|belum lengkap/);
    }
});
test('malformed JSON does not expose parser details', async () => {
    const h = harness(async () => ({...reply({}), json: async () => {throw Error('private parser detail');}}));
    await assert.rejects(h.request('/vendors', body, new AbortController()), error => /belum lengkap/.test(error.message) && !error.message.includes('private'));
});
test('known HTTP errors keep useful messages and suppress internal server details', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [419, /Sesi formulir/], [403, /tidak diizinkan/], [429, /Tunggu/], [500, /belum terkonfirmasi/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request('/vendors', body, new AbortController()), error => error.status === status && pattern.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {nama_vendor: ['Nama sudah ada.']}}, 422));
    await assert.rejects(h.request('/vendors', body, new AbortController()), error => error.fields.nama_vendor[0] === 'Nama sudah ada.');
});
test('aborting a vendor request releases even when fetch ignores the abort signal', async () => {
    let finish;
    const h = harness(() => new Promise(resolve => {finish = resolve;})), controller = new AbortController();
    const pending = h.request('/vendors', body, controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError');
    finish(reply({id: 1})); await flush(); assert.equal(h.cleared(), 1);
});
test('navigation is restricted to the vendor index on the application origin', () => {
    const h = harness();
    assert.equal(h.target('/vendors?search=A%20%26%20B'), 'https://vendor.test/vendors?search=A%20%26%20B');
    for (const value of ['https://untrusted.test/vendors', '//untrusted.test/vendors', '/account', 'javascript:alert(1)']) assert.throws(() => h.target(value), /Tujuan halaman belum valid/);
});
