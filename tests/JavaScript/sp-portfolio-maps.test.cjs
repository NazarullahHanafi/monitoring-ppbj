const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/sp/sp-portfolio-maps.js', 'utf8');
const tick = () => new Promise(setImmediate);
const row = {id: 1, portfolio: 'PK - LAB', field_id: 5, field_name: 'Bidang LAB', field_available: true, is_active: true, version: 'a'.repeat(64)};
const field = {id: 5, nama: 'Bidang LAB', type: 'bidang_pr', is_active: true, version: 'b'.repeat(64)};
const page = (rows, extra = {}) => ({rows, page: 1, last_page: 1, total: rows.length, portfolio_options: ['IT - FERS', 'PK - LAB', 'PK - QAQC'], options_truncated: false, ...extra});
function runtime() {
    const requests = [], updates = [], events = {}, nodes = {}, windowEvents = {}, timers = new Map(), window = {addEventListener: (type, handler) => windowEvents[type] = handler};
    let dialog, serial = 0, confirms = {disabled: false}, csrf = 'test-csrf';
    const Swal = {getConfirmButton: () => confirms, update: value => updates.push(value), getHtmlContainer: () => ({addEventListener: (type, handler) => events[type] = handler}),
        fire: options => new Promise(resolve => dialog = {options, resolve}), close: () => {dialog.options.willClose(); dialog.resolve({});}};
    const context = {window, Swal, URLSearchParams, AbortController, DOMException, document: {activeElement: null, documentElement: {classList: {contains: () => true}}, getElementById: id => nodes[id], querySelector: () => csrf ? {content: csrf} : null},
        setTimeout: fn => {const id = ++serial; timers.set(id, fn); return id;}, clearTimeout: id => timers.delete(id), fetch: (url, options) => new Promise(resolve => requests.push({url, options, resolve}))};
    vm.runInNewContext(source, context);
    return {window, windowEvents, requests, updates, events, nodes, timers, confirms, csrf: value => csrf = value, dialog: () => dialog,
        respond(index, data, status = 200, extra = {}) {requests[index].resolve({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data, ...extra});},
        close() {Swal.close();}, draft(portfolio = 'PK - LAB', enabled = true) {nodes.spMapPortfolio = {value: portfolio, innerHTML: '', focus() {}}; nodes.spMapField = {value: '5'}; nodes.spMapActive = {checked: enabled};}};
}
async function opened(h, rows = [], manage = true) {
    const task = h.window.SPPortfolioMaps.open({can_manage: manage, portfolios: ['IT - FERS']}); h.dialog().options.didOpen();
    h.respond(0, page(rows)); if (manage) h.respond(1, {options: [field], total: 1}); await tick(); return {task};
}
const submit = (h, id) => h.events.submit({target: {id}, preventDefault() {}});
const click = (h, action, id = '1') => h.events.click({target: {closest: () => ({dataset: {spMap: action, id}})}});

test('read-only manager is lazy and uses one read without master lookups or mutation controls', async () => {
    const h = runtime(); assert.equal(h.requests.length, 0); const {task} = await opened(h, [{...row, portfolio: '<img onerror=x>'}], false);
    assert.equal(h.requests.length, 1); assert.match(h.updates.at(-1).html, /&lt;img/); assert.doesNotMatch(h.updates.at(-1).html, /id="spMapForm"|data-sp-map="edit"/);
    h.close(); await task; assert.equal(h.timers.size, 0); assert.doesNotMatch(source, /setInterval|localStorage|sessionStorage/);
});
test('manager opens with two parallel reads and only the needed field type, preserving local filtering and manual drafts', async () => {
    const h = runtime(); const {task} = await opened(h);
    assert.equal(h.requests.length, 2); assert.match(h.requests[0].url, /include_options=1/); assert.match(h.requests[1].url, /type=bidang_pr/); assert.doesNotMatch(h.requests[1].url, /penandatangan|jabatan/);
    h.draft('IT - FERS'); h.events.input({target: {id: 'spMapPortfolioQuery', value: 'LAB'}});
    assert.equal(h.requests.length, 2); assert.match(h.nodes.spMapPortfolio.innerHTML, /PK - LAB/); assert.doesNotMatch(h.nodes.spMapPortfolio.innerHTML, /PK - QAQC/);
    click(h, 'manual'); assert.match(h.updates.at(-1).html, /<input id="spMapPortfolio" required/); assert.match(h.updates.at(-1).html, /value="5" selected/);
    h.nodes.spMapPortfolio.value = 'New <portfolio>'; click(h, 'manual'); assert.match(h.updates.at(-1).html, /New &lt;portfolio&gt;/); h.close(); await task;
});
test('new searches abort old reads and ignore late success and error responses', async () => {
    const h = runtime(); const {task} = await opened(h);
    h.nodes.spMapQuery = {value: 'OLD'}; submit(h, 'spMapSearch'); const old = h.requests[2];
    h.nodes.spMapQuery.value = 'LATEST'; submit(h, 'spMapSearch'); assert.equal(old.options.signal.aborted, true);
    h.respond(3, page([{...row, portfolio: 'LATEST'}])); await tick(); const count = h.updates.length;
    h.respond(2, {message: 'Old failure'}, 500); await tick(); assert.equal(h.updates.length, count); assert.match(h.updates.at(-1).html, /LATEST/);
    assert.doesNotMatch(h.requests[3].url, /include_options/); h.close(); await task;
});
test('write failures keep the draft, explicit false and CSRF, and block duplicate writes', async () => {
    const h = runtime(); const {task} = await opened(h); h.draft('PK - QAQC', false);
    submit(h, 'spMapForm'); submit(h, 'spMapForm'); assert.equal(h.requests.length, 3); assert.equal(h.confirms.disabled, true);
    const sent = h.requests[2]; assert.equal(sent.options.method, 'POST'); assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'test-csrf'); assert.equal(sent.options.credentials, 'same-origin'); assert.equal(JSON.parse(sent.options.body).is_active, false);
    h.respond(2, {message: 'Portfolio already exists'}, 422); await tick(); assert.equal(h.confirms.disabled, false); assert.match(h.updates.at(-1).html, /PK - QAQC/); assert.match(h.updates.at(-1).html, /Portfolio already exists/); h.close(); await task;
});
test('edits use a versioned PUT and successful write with failed refresh is never reported as unsaved', async () => {
    const h = runtime(); const {task} = await opened(h, [row]); click(h, 'edit'); h.draft('PK - LAB', false); submit(h, 'spMapForm');
    assert.equal(h.requests[2].options.method, 'PUT'); assert.equal(JSON.parse(h.requests[2].options.body).version, row.version);
    h.respond(2, {row: {...row, is_active: false}, message: 'Pemetaan disimpan.'}); await tick(); assert.equal(h.requests.length, 4);
    h.respond(3, {message: 'secret-path'}, 500); await tick(); assert.match(h.updates.at(-1).html, /Pemetaan disimpan.*Daftar belum diperbarui.*jangan ulangi/); assert.doesNotMatch(h.updates.at(-1).html, /secret-path/);
    assert.equal(h.requests.filter(item => item.options.method).length, 1); assert.equal(h.confirms.disabled, false); h.close(); await task;
});
test('body deadline releases writes without retry and keeps the draft', async () => {
    const h = runtime(); const {task} = await opened(h); h.draft('Slow draft'); submit(h, 'spMapForm');
    h.respond(2, {}, 200, {json: () => new Promise(() => {})}); await tick(); [...h.timers.values()][0](); await tick();
    assert.equal(h.requests.length, 3); assert.equal(h.confirms.disabled, false); assert.match(h.updates.at(-1).html, /Slow draft/); assert.match(h.updates.at(-1).html, /belum terkonfirmasi/); assert.equal(h.timers.size, 0); h.close(); await task;
});
test('starting a write cancels pending reads and closing ignores all late completions', async () => {
    const h = runtime(); const {task} = await opened(h); h.nodes.spMapQuery = {value: 'pending search'}; submit(h, 'spMapSearch');
    h.draft(); submit(h, 'spMapForm'); assert.equal(h.requests[2].options.signal.aborted, true);
    h.close(); await task; const count = h.updates.length; assert.equal(h.requests[3].options.signal.aborted, true);
    h.respond(2, page([row])); h.respond(3, {row, message: 'late success'}); await tick(); assert.equal(h.updates.length, count); assert.equal(h.timers.size, 0);
});
test('field lookup preserves selections beyond the first page and supports explicit server search', async () => {
    const h = runtime(); const {task} = await opened(h, [{...row, field_id: 99, field_name: 'Beyond first 50'}]); click(h, 'edit');
    assert.match(h.requests[2].url, /include_id=99/); h.respond(2, {options: [{...field, id: 99, nama: 'Beyond first 50'}], total: 99}); await tick();
    assert.match(h.updates.at(-1).html, /value="99" selected/); assert.match(h.updates.at(-1).html, /maksimal 50 bidang/);
    h.nodes.spMapFieldQuery = {value: 'LAB'}; submit(h, 'spMapFieldSearch'); assert.match(h.requests[3].url, /q=LAB/); h.respond(3, {options: [field], total: 1}); await tick();
    assert.match(h.updates.at(-1).html, /Beyond first 50/); h.close(); await task;
});
test('late field responses cannot replace a newer search and corrupt reads are visible', async () => {
    const h = runtime(); const {task} = await opened(h); h.nodes.spMapFieldQuery = {value: 'A'}; submit(h, 'spMapFieldSearch'); h.nodes.spMapFieldQuery.value = 'B'; submit(h, 'spMapFieldSearch');
    h.respond(3, {options: [{...field, nama: 'Latest field'}], total: 1}); await tick(); const count = h.updates.length; h.respond(2, {options: [field], total: 1}); await tick(); assert.equal(h.updates.length, count);
    click(h, 'refresh'); h.respond(4, {rows: 'invalid', page: 1, last_page: 1}); await tick(); assert.match(h.updates.at(-1).html, /Daftar pemetaan belum lengkap/); h.close(); await task;
});
test('duplicate opens share the same dialog; pagehide cancels writes and warns on the next open', async () => {
    const h = runtime(); const {task} = await opened(h); const other = h.window.SPPortfolioMaps.open({can_manage: false}); assert.equal(other, task); h.draft(); submit(h, 'spMapForm');
    h.windowEvents.pagehide(); await task; assert.equal(h.requests[2].options.signal.aborted, true);
    const next = h.window.SPPortfolioMaps.open({can_manage: false, portfolios: []}); assert.match(h.dialog().options.html, /belum terverifikasi/); h.close(); await next;
});
test('out-of-range live pages clamp once and never loop', async () => {
    const h = runtime(); const {task} = await opened(h, [row]); h.nodes.spMapQuery = {value: 'shrink'}; submit(h, 'spMapSearch');
    h.respond(2, page([], {page: 2, last_page: 1})); await tick(); assert.match(h.requests[3].url, /page=1/);
    h.respond(3, page([row])); await tick(); assert.equal(h.requests.length, 4); h.close(); await task;
});
test('HTML sessions, missing CSRF and malformed JSON never confirm or retry writes', async () => {
    const h = runtime(); const {task} = await opened(h); h.draft(); submit(h, 'spMapForm'); h.respond(2, {}, 200, {headers: {get: () => 'text/html'}}); await tick(); assert.match(h.updates.at(-1).html, /belum dapat diverifikasi/);
    submit(h, 'spMapForm'); h.respond(3, {}, 200, {json: async () => {const error = new Error('private-fragment'); error.name = 'SyntaxError'; throw error;}}); await tick(); assert.match(h.updates.at(-1).html, /belum dapat dibaca/); assert.doesNotMatch(h.updates.at(-1).html, /private-fragment/);
    h.csrf(''); submit(h, 'spMapForm'); await tick(); assert.equal(h.requests.length, 4); assert.match(h.updates.at(-1).html, /Sesi formulir berakhir/); h.close(); await task;
});
