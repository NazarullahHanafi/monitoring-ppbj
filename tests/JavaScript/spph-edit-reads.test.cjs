const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/spph/spph.js', 'utf8');
const block = name => source.slice(source.indexOf(`/* BEGIN SPPH ${name} */`), source.indexOf(`/* END SPPH ${name} */`));
const tick = () => new Promise(setImmediate);
class Element {
    constructor() { this.value = ''; this.dataset = {}; this.children = []; this.text = ''; this.events = {}; this.classes = new Set(); this.classList = { add: x => this.classes.add(x), contains: x => this.classes.has(x) }; }
    set textContent(value) { this.text = String(value); this.children = []; } get textContent() { return this.text + this.children.map(x => x.textContent).join(''); }
    appendChild(child) { this.children.push(child); } replaceChildren() { this.textContent = ''; }
    addEventListener(name, fn) { this.events[name] = fn; } click() { this.events.click?.(); }
}
function setup() {
    const nodes = Object.fromEntries(['editForm', 'editRows', 'editId', 'editModal', 'editPpbjStatus', 'editDeskripsi', 'editNomorPrManual'].map(id => [id, new Element()]));
    nodes.editId.value = '1'; nodes.editDeskripsi.value = 'Draft tersimpan';
    const timers = new Map(), requests = [], added = [], dialogs = [], addButton = { disabled: false }; let serial = 0;
    const context = vm.createContext({ URL, AbortController, DOMException, window: { location: { origin: 'https://spph.test' }, addEventListener() {} },
        document: { getElementById: id => nodes[id], createElement: () => new Element(), querySelector: () => addButton, addEventListener() {} },
        editModalLoadSerial: 1, currentEditPrMode: 'ppbj', selected: ['PR/A'], PPBJ_CHECK_URL: '/spph/check-ppbj',
        setTimeout: (fn, delay) => { timers.set(++serial, { fn, delay }); return serial; }, clearTimeout: id => timers.delete(id),
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })), Swal: { fire: data => dialogs.push(data) },
        addRow: (mode, item) => { added.push(item); nodes.editRows.appendChild(Object.assign(new Element(), { textContent: item?.nama_barang || 'blank' })); },
        updateEditPrFinalValue() {}, setEditPrMode: mode => { context.currentEditPrMode = mode; },
        $: selector => ({ val(value) { if (selector === '#editPpbjSelect') return context.selected; if (value === undefined) return nodes[selector.slice(1)].value; nodes[selector.slice(1)].value = value; return this; } }) });
    vm.runInContext(block('LOOKUP READS') + '\n' + block('EDIT READS'), context);
    return { context, nodes, timers, requests, added, dialogs, addButton,
        respond: (i, data, extra = {}) => requests[i].resolve({ ok: true, status: 200, redirected: false, headers: { get: () => 'application/json' }, json: async () => data, ...extra }),
        fire: delay => { for (const [id, timer] of [...timers]) if (timer.delay === delay) { timers.delete(id); timer.fn(); } } };
}
test('SPPH late item failures cannot erase a newly opened record', async () => {
    const h = setup(), old = h.context.loadEditItems(1); h.context.editModalLoadSerial = 2; h.nodes.editId.value = '2'; const fresh = h.context.loadEditItems(2);
    h.respond(1, [{ nama_barang: 'Barang baru' }]); await fresh; h.respond(0, null, { ok: false, status: 500 }); await old;
    assert.equal(h.nodes.editRows.textContent, 'Barang baru'); assert.equal(h.nodes.editForm.dataset.spphItemsState, 'ready'); assert.equal(h.added.length, 1);
});
test('SPPH reopening the same record rejects old item generations', async () => {
    const h = setup(), old = h.context.loadEditItems(1); h.context.editModalLoadSerial = 2; const fresh = h.context.loadEditItems(1);
    h.respond(0, [{ nama_barang: 'Stale' }]); await old; assert.equal(h.added.length, 0); h.respond(1, []); await fresh; assert.deepEqual(h.added, [null]);
});
test('SPPH item deadlines block save and adding rows until an explicit retry succeeds', async () => {
    const h = setup(), task = h.context.loadEditItems(1); assert.equal(h.addButton.disabled, true); assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), false);
    h.respond(0, null, { json: () => new Promise(() => {}) }); await tick(); h.fire(20000); await task;
    assert.equal(h.nodes.editForm.dataset.spphItemsState, 'error'); assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), false); assert.match(h.nodes.editRows.textContent, /terlalu lama/);
    h.nodes.editRows.children[0].click(); h.respond(1, [{ nama_barang: 'Lengkap', jumlah: '2', satuan: 'unit' }]); await tick();
    assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), true); assert.equal(h.addButton.disabled, false);
});
test('SPPH closed dialogs and malformed item responses cannot mark incomplete items ready', async () => {
    const h = setup(), task = h.context.loadEditItems(1); h.nodes.editModal.classList.add('hidden'); h.context.cancelSpphFormLookups(); h.respond(0, [{ nama_barang: 'Closed' }]); await task; assert.equal(h.added.length, 0);
    for (const data of [{ rows: [] }, [null], [{}], [{ nama_barang: [] }], [{ nama_barang: 'x', jumlah: {} }]]) {
        const h = setup(), task = h.context.loadEditItems(1); h.respond(0, data); await task;
        assert.equal(h.nodes.editForm.dataset.spphItemsState, 'error'); assert.equal(h.added.length, 0); assert.equal(h.nodes.editRows.children[0].textContent, 'Cek ulang');
    }
});
test('SPPH PR network failures retain stored references and description; retry never reloads items', async () => {
    const h = setup(), task = h.context.loadEditPpbj(1, ['PR/A'], 1, true); h.respond(0, null, { ok: false, status: 503 }); await task;
    assert.equal(h.context.currentEditPrMode, 'ppbj'); assert.deepEqual(h.context.selected, ['PR/A']); assert.equal(h.nodes.editForm.dataset.spphPpbjState, 'error'); assert.equal(h.nodes.editDeskripsi.value, 'Draft tersimpan');
    h.nodes.editPpbjStatus.children[0].click(); h.respond(1, { status: 'already_linked', uraian: 'Jangan timpa draft', message: '<img src=x>' }); await tick();
    assert.equal(h.nodes.editForm.dataset.spphPpbjState, 'ready'); assert.equal(h.nodes.editDeskripsi.value, 'Draft tersimpan'); assert.equal(h.added.length, 0);
});
test('SPPH known linked or cancelled PRs require review rather than automatic conversion to manual', async () => {
    for (const status of ['manual', 'cancelled', 'unknown']) {
        const h = setup(), task = h.context.loadEditPpbj(1, ['PR/A'], 1, true); h.respond(0, { status }); await task;
        assert.equal(h.context.currentEditPrMode, 'ppbj'); assert.equal(h.nodes.editForm.dataset.spphPpbjState, 'error'); assert.deepEqual(h.context.selected, ['PR/A']);
    }
    const h = setup(), task = h.context.loadEditPpbj(1, ['PR/A'], 1, false); h.respond(0, { status: 'manual' }); await task;
    assert.equal(h.context.currentEditPrMode, 'manual'); assert.equal(h.nodes.editNomorPrManual.value, 'PR/A'); assert.equal(h.nodes.editForm.dataset.spphPpbjState, 'ready');
});
test('SPPH changed selection, mode, record or generation invalidates saved-PR replies', async () => {
    for (const change of [h => h.context.selected = ['PR/B'], h => h.context.currentEditPrMode = 'manual', h => h.nodes.editId.value = '2', h => h.context.editModalLoadSerial++]) {
        const h = setup(), task = h.context.loadEditPpbj(1, ['PR/A'], 1, true); change(h); h.nodes.editPpbjStatus.textContent = 'Niat baru'; h.respond(0, { status: 'manual' }); await task;
        assert.equal(h.nodes.editPpbjStatus.textContent, 'Niat baru');
    }
});
test('SPPH readiness checks both independent reads and accepts legacy forms without state', () => {
    const h = setup(); assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), true);
    for (const field of ['spphItemsState', 'spphPpbjState']) for (const state of ['loading', 'error']) {
        h.nodes.editForm.dataset[field] = state; assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), false); h.nodes.editForm.dataset[field] = 'ready';
    }
    assert.equal(h.context.ensureSpphEditDataReady(h.nodes.editForm), true);
});
