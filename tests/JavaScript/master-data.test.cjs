const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('public/assets/ppbj/master-data.js', 'utf8');
const transport = source.slice(source.indexOf('    async function request('), source.indexOf('    function validItem'));

function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, AbortController, DOMException, setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.request, timeout: () => timer(), cleared: () => cleared};
}
const flush = async () => {for (let i = 0; i < 8; i++) await Promise.resolve();};

test('master writes retain captured URL, CSRF and content headers; reads bypass HTTP caches', async () => {
    const calls = [];
    const h = harness(async (url, options) => {calls.push({url, options}); return {ok: true, json: async () => ({item: {id: 1, nama: 'A & B'}})};});
    await h.request('/master/buyer');
    await h.request('/master/buyer/1', {method: 'PUT', headers: {'X-CSRF-TOKEN': 'synthetic', 'Content-Type': 'application/json'}, body: '{"nama":"A & B"}'});
    assert.equal(calls[0].options.cache, 'no-store'); assert.equal(calls[0].options.credentials, 'same-origin');
    assert.equal(calls[1].url, '/master/buyer/1'); assert.equal(calls[1].options.headers['X-CSRF-TOKEN'], 'synthetic');
    assert.equal(calls[1].options.headers.Accept, 'application/json'); assert.equal(h.cleared(), 2);
});

test('stalled JSON body times out without retrying an uncertain write', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {ok: true, json: () => new Promise(() => {})};});
    const pending = h.request('/master/buyer', {method: 'POST'}); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*Koneksi lambat/);
    assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});

test('abort releases the operation even when a response arrives much later', async () => {
    let release;
    const h = harness(() => new Promise(resolve => {release = resolve;}));
    const controller = new AbortController(), pending = h.request('/master/buyer', {}, controller);
    controller.abort(); await assert.rejects(pending, error => error.name === 'AbortError');
    release({ok: true, json: async () => []}); await flush(); assert.equal(h.cleared(), 1);
});

test('HTML session errors and validation errors are visible and keep their real status', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [419, /Sesi formulir/], [403, /izin/], [429, /Tunggu/]]) {
        const h = harness(async () => ({ok: false, status, json: async () => {throw new Error('HTML');}}));
        await assert.rejects(h.request('/master/buyer'), error => error.status === status && pattern.test(error.message));
    }
    const h = harness(async () => ({ok: false, status: 422, json: async () => ({errors: {nama: ['Maksimal 50 karakter.']}})}));
    await assert.rejects(h.request('/master/buyer', {method: 'POST'}), /Maksimal 50/);
});
