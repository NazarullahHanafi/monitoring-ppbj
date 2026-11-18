const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const source = fs.readFileSync('public/assets/app/procurement-details.js', 'utf8');
function setup() {
    const requests = [], timers = new Map(); let serial = 0;
    const context = {
        URL, AbortController, FormData, DOMException, location: { href: 'https://details.test/sp', origin: 'https://details.test' },
        document: { readyState: 'loading', addEventListener() {} },
        window: { PROCUREMENT_DETAILS_CONFIG: { csrf: 'session-csrf' } },
        setTimeout(fn, delay) { timers.set(++serial, { fn, delay }); return serial; }, clearTimeout(id) { timers.delete(id); },
        fetch: async (url, options) => { requests.push({ url, options }); return { ok: true, redirected: false, headers: { get: () => 'application/json' }, json: async () => ({ result: true }) }; },
    };
    vm.runInNewContext(source.replace('    window.ProcurementDetails = {', '    window.testDetails = { localUrl, request, attachmentResult, attachmentList, setState: value => state = value };\n    window.ProcurementDetails = {'), context);
    return { ...context.window.testDetails, requests, timers };
}
function item() {
    return { id: 'attachment-1', name: 'Rincian.pdf', text: 'Kertas A4', reviewed: false, version: 1, download_url: '/file/1', review_url: '/review/1', delete_url: '/delete/1' };
}
test('attachment links and requests reject external origins, credentials and executable URLs', async () => {
    const h = setup();
    for (const url of [null, '', 'javascript:alert(1)', '//foreign.test/file', 'https://user:pass@details.test/file', 'https://foreign.test/file', '/file#fragment']) {
        assert.equal(h.localUrl(url), false);
        await assert.rejects(h.request(url), /Alamat lampiran/);
    }
    assert.equal(h.requests.length, 0); assert.equal(h.timers.size, 0);
    assert.equal(h.localUrl('/file/1'), true); assert.equal(h.localUrl('https://details.test/file/1'), true);
});
test('attachment requests preserve CSRF and use private fresh reads without additional requests', async () => {
    const h = setup(); assert.equal((await h.request('/review/1', { method: 'PUT', body: '{}' })).result, true);
    assert.equal(h.requests.length, 1); const { options } = h.requests[0];
    assert.equal(options.cache, 'no-store'); assert.equal(options.credentials, 'same-origin');
    assert.equal(options.headers['X-CSRF-TOKEN'], 'session-csrf'); assert.equal(options.headers['X-Requested-With'], 'XMLHttpRequest');
    assert.equal(h.timers.size, 0);
});
test('attachment DTO requires a boolean review state, usable version and three safe URLs', () => {
    const h = setup(); assert.equal(h.attachmentResult({ attachment: item() }).id, 'attachment-1');
    for (const patch of [{ reviewed: 'true' }, { reviewed: null }, { version: '1' }, { version: 0 }, { version: Number.MAX_SAFE_INTEGER + 1 }, { text: null }, { name: null }, { download_url: 'javascript:alert(1)' }, { review_url: 'https://foreign.test/review' }, { delete_url: null }]) {
        assert.throws(() => h.attachmentResult({ attachment: { ...item(), ...patch } }), /Data lampiran/);
    }
    assert.throws(() => h.attachmentResult({ attachment: item() }, 'other'), /Data lampiran/);
});
test('invalid or duplicate lists cannot replace known attachments or permissions', () => {
    const h = setup(), state = { items: [item()], canManage: true, listReady: true }; h.setState(state);
    for (const patch of [{ attachments: null }, { can_manage: 'true' }, { number: null }, { attachments: [item(), item()] }, { attachments: [{ ...item(), delete_url: '//foreign.test/delete' }] }]) {
        assert.throws(() => h.attachmentList({ attachments: [], can_manage: false, number: 'SP-1', ...patch }));
        assert.equal(state.items.length, 1); assert.equal(state.canManage, true); assert.equal(state.listReady, true);
    }
    h.attachmentList({ attachments: [], can_manage: false, number: 'SP-1' });
    assert.equal(state.items.length, 0); assert.equal(state.canManage, false);
});
