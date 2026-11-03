const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../../public/assets/app/archive-popup.js'), 'utf8');
const tick = () => new Promise(setImmediate);
function runtime() {
    const dialogs = [], requests = [], timers = new Map(), events = {};
    let id = 0;
    const window = { location: { origin: 'https://simon.example' }, addEventListener: (name, fn) => events[name] = fn };
    const sandbox = { window, document: { documentElement: { classList: { contains: () => false } } }, URL, AbortController,
        setTimeout: fn => { const key = ++id; timers.set(key, fn); return key; }, clearTimeout: key => timers.delete(key),
        Swal: { fire: options => new Promise(resolve => dialogs.push({ options, resolve })), showLoading() {} },
        fetch: (url, options) => new Promise((resolve, reject) => {
            const request = { url, options, resolve, reject }; requests.push(request);
            options.signal.addEventListener('abort', () => reject(Object.assign(new Error('Cancelled'), { name: 'AbortError' })));
        }) };
    vm.runInNewContext(source, sandbox);
    return { window, dialogs, requests, events, timers,
        open: (payload = {}) => window.openArchiveAttachmentList({ module: 'SP', nomor: 'SP/1', url: '/sp/12/archive', ...payload }),
        respond: (index, data = {}) => requests[index].resolve({ ok: true, json: async () => data }) };
}
test('archive metadata is fetched only on click; cancelling loading aborts without another popup', async () => {
    const h = runtime(); assert.equal(h.requests.length, 0); const task = h.open();
    assert.equal(h.dialogs[0].options.showCancelButton, true); h.dialogs[0].resolve({ isDismissed: true }); await task;
    assert.equal(h.requests[0].options.signal.aborted, true); assert.equal(h.dialogs.length, 1); assert.equal(h.timers.size, 0);
});
test('archive timeout explains recovery and pagehide quietly cancels work', async () => {
    const h = runtime(); const task = h.open(); [...h.timers.values()][0](); await tick();
    assert.match(h.dialogs[1].options.text, /terlalu lama/); h.dialogs[1].resolve({}); await task;
    const next = h.open(); h.events.pagehide(); await next; assert.equal(h.dialogs.length, 3);
});
test('new archive request supersedes old results; partial result stays readable and refresh is explicit', async () => {
    const h = runtime(); const old = h.open(); const current = h.open({ url: '/sp/13/archive' }); await old;
    assert.equal(h.requests[0].options.signal.aborted, true);
    h.respond(1, { message: 'Sebagian PR belum bisa diperiksa.', partial: true, sources: [], documents: [] }); await tick();
    const result = h.dialogs.at(-1); assert.match(result.options.html, /Sebagian PR/); assert.equal(h.requests.length, 2);
    result.resolve({}); await current; assert.equal(h.timers.size, 0);
});
test('external archive metadata URLs are rejected without a network request', async () => {
    const h = runtime(); const task = h.open({ url: 'https://untrusted.example/metadata' });
    assert.equal(h.requests.length, 0); assert.match(h.dialogs[1].options.text, /tidak valid/); h.dialogs[1].resolve({}); await task;
});
