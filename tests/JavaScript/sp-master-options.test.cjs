const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/app/sp-master-options.js', 'utf8');
const transport = source.slice(source.indexOf('    async function request('), source.indexOf('    function validOption'));
function harness(fetch, token = 'synthetic-csrf') {
    let timer, cleared = 0;
    const context = {fetch, AbortController, DOMException, document: {querySelector: () => token ? {content: token} : null}, setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => cleared++};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.request, timeout: () => timer(), cleared: () => cleared};
}
const response = (status, payload, extra = {}) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => payload, ...extra});
const flush = async () => {for (let i = 0; i < 8; i++) await Promise.resolve();};
test('master transport retains CSRF, same-origin credentials, content headers and captured payload', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return response(200, {ok: true});});
    await h.request('/sp-master-options/1', {method: 'DELETE', body: '{"version":"synthetic"}', headers: {'Content-Type': 'application/json'}});
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic-csrf'); assert.equal(sent.options.headers['Content-Type'], 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(sent.options.body, '{"version":"synthetic"}'); assert.equal(h.cleared(), 1);
});
test('missing CSRF fails before a write is sent', async () => {
    let count = 0; const h = harness(async () => {count++;}, '');
    await assert.rejects(h.request('/sp-master-options', {method: 'POST'}), /Sesi formulir/); assert.equal(count, 0);
});
test('deadline covers stalled response bodies and never retries the write', async () => {
    let count = 0; const h = harness(async () => {count++; return response(200, null, {json: () => new Promise(() => {})});});
    const pending = h.request('/sp-master-options', {method: 'POST'}); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*koneksi lambat/); assert.equal(count, 1); assert.equal(h.cleared(), 1);
});
test('aborted or pre-aborted operations settle promptly even if fetch ignores cancellation', async () => {
    for (const already of [false, true]) {
        const h = harness(() => new Promise(() => {})); const controller = new AbortController(); if (already) controller.abort();
        const pending = h.request('/sp-master-options', {method: 'POST'}, controller); controller.abort();
        await assert.rejects(pending, error => error.name === 'AbortError'); assert.equal(h.cleared(), 1);
    }
});
test('authentication, stale versions, validation and locked deletion remain distinguishable', async () => {
    for (const [status, payload, text] of [[401, {}, /Sesi berakhir/], [419, {}, /Sesi formulir/], [403, {}, /tidak diizinkan/], [409, {message: 'Master sudah berubah.'}, /sudah berubah/], [422, {errors: {nama: ['Nama sudah ada.']}}, /Nama sudah ada/], [429, {locked: true, retry_after: 900}, /Batas permintaan/]]) {
        const h = harness(async () => response(status, payload));
        await assert.rejects(h.request('/', {method: 'POST'}), error => error.status === status && text.test(error.message) && JSON.stringify(error.payload) === JSON.stringify(payload));
    }
});
test('redirected, HTML and incomplete success bodies never confirm a write; server failures hide internal details', async () => {
    for (const extra of [{redirected: true}, {headers: {get: () => 'text/html'}}]) {
        const h = harness(async () => response(200, {ok: true}, extra));
        await assert.rejects(h.request('/', {method: 'POST'}), /belum dapat diverifikasi/);
    }
    const incomplete = harness(async () => response(200, null)); await assert.rejects(incomplete.request('/', {}), /belum lengkap/);
    const failed = harness(async () => response(500, {message: '/private/secret-token'})); await assert.rejects(failed.request('/', {}), error => !error.message.includes('secret-token'));
});
test('malformed JSON does not display raw response fragments', async () => {
    const h = harness(async () => response(200, null, {json: async () => {throw new SyntaxError('synthetic-private-fragment');}}));
    await assert.rejects(h.request('/', {}), error => /belum dapat dibaca/.test(error.message) && !error.message.includes('private-fragment'));
});
