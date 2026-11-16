const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/ppbj/ppbj.js', 'utf8');
const transport = source.slice(source.indexOf('            async function collaborationRequest'), source.indexOf('            function rememberDraft'));

function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, AbortController, DOMException, setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.collaborationRequest, timeout: () => timer(), cleared: () => cleared};
}
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

test('reads are private and writes keep CSRF, JSON headers and the captured URL', async () => {
    const calls = [];
    const h = harness(async (url, options) => {calls.push({url, options}); return {ok: true, json: async () => ({message: 'ok'})};});
    await h.request('/notes/7');
    await h.request('/notes/7', {method: 'POST', headers: {'X-CSRF-TOKEN': 'synthetic', 'Content-Type': 'application/json'}, body: '{"body":"hello"}'});
    assert.equal(calls[0].options.cache, 'no-store'); assert.equal(calls[0].options.credentials, 'same-origin');
    assert.equal(calls[1].url, '/notes/7'); assert.equal(calls[1].options.headers['X-CSRF-TOKEN'], 'synthetic');
    assert.equal(calls[1].options.headers.Accept, 'application/json'); assert.equal(h.cleared(), 2);
});

test('deadline covers a stalled JSON body and writes are never retried automatically', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {ok: true, json: () => new Promise(() => {})};});
    const pending = h.request('/notes/1', {method: 'POST'});
    await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*Koneksi lambat/);
    assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});

test('cancellation completes immediately even when the transport ignores abort', async () => {
    let release;
    const h = harness(() => new Promise(resolve => {release = resolve;}));
    const controller = new AbortController();
    const pending = h.request('/notes/1', {}, controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError');
    release({ok: true, json: async () => ({old: true})}); await flush();
    assert.equal(h.cleared(), 1);
});

test('session, permissions and throttling errors remain explicit even with HTML bodies', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [419, /Sesi formulir/], [403, /izin/], [429, /Tunggu/]]) {
        const h = harness(async () => ({ok: false, status, json: async () => {throw new Error('HTML response');}}));
        await assert.rejects(h.request('/notes/1', {method: 'POST'}), error => pattern.test(error.message) && error.status === status);
    }
});

test('validation messages are preserved and malformed success cannot count as confirmation', async () => {
    const invalid = harness(async () => ({ok: false, status: 422, json: async () => ({errors: {mentions: ['User sudah nonaktif.']}})}));
    await assert.rejects(invalid.request('/notes/1', {method: 'POST'}), /User sudah nonaktif/);
    const malformed = harness(async () => ({ok: true, json: async () => null}));
    await assert.rejects(malformed.request('/notes/1', {method: 'POST'}), /belum terkonfirmasi.*belum lengkap/);
});
