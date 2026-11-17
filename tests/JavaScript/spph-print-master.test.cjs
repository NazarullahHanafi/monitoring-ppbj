const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/spph/spph-print-master.js', 'utf8');
const tick = () => new Promise(setImmediate);
const row = {id: 10, type: 'penandatangan_sci', nama: 'Pejabat Penguji', is_active: true, version: 'a'.repeat(64)};
const page = (rows = [row], extra = {}) => ({options: rows, page: 1, last_page: 1, total: rows.length, ...extra});
function runtime() {
    const requests = [], updates = [], events = {}, nodes = {}, windowEvents = {}, timers = new Map(); let dialog, timer = 0;
    const decode = v => v.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const draw = html => {
        for (const key of Object.keys(nodes)) delete nodes[key];
        for (const match of html.matchAll(/<input\b[^>]*id="([^"]+)"[^>]*>/g)) {
            const tag = match[0]; nodes[match[1]] = {value: decode(tag.match(/value="([^"]*)"/)?.[1] || ''), checked: /\schecked(?:\s|>)/.test(tag), disabled: /\sdisabled(?:\s|>)/.test(tag), focus() {}};
        }
    };
    const confirm = {disabled: false};
    const Swal = {isVisible: () => true, update: data => {updates.push(data); draw(data.html);}, getConfirmButton: () => confirm,
        fire: options => {draw(options.html); return new Promise(resolve => dialog = {options, resolve});},
        close: () => {dialog.options.willClose(); dialog.resolve({isDismissed: true});}, clickConfirm: () => {dialog.options.willClose(); dialog.resolve({isConfirmed: true});},
        getHtmlContainer: () => ({addEventListener: (type, handler) => events[type] = handler})};
    const window = {addEventListener: (type, handler) => windowEvents[type] = handler};
    vm.runInNewContext(source, {window, Swal, URLSearchParams, AbortController, DOMException,
        setTimeout: fn => {timers.set(++timer, fn); return timer;}, clearTimeout: id => timers.delete(id),
        document: {documentElement: {classList: {contains: () => false}}, getElementById: id => nodes[id], querySelector: () => csrf ? {content: 'test-csrf'} : null},
        fetch: (url, options) => new Promise((resolve, reject) => requests.push({url, options, resolve, reject}))});
    let csrf = true;
    return {window, requests, updates, events, nodes, timers, windowEvents, confirm, noCsrf: () => csrf = false, dialog: () => dialog,
        respond: (i, data, status = 200, extra = {}) => requests[i].resolve({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data, ...extra}),
        click: (sgm, id = 10) => events.click({target: {closest: () => ({dataset: {sgm, id: String(id)}})}}),
        submit: (id = 'sgMasterForm') => events.submit({target: {id}, preventDefault() {}}),
        change: value => events.change({target: {id: 'sgMasterType', value}}),
        close: () => Swal.close(), text: () => updates.at(-1)?.html || dialog.options.html};
}
async function opened(manage = true) {
    const h = runtime(); h.task = h.window.SPPHPrintMasters.open(manage); h.dialog().options.didOpen(); h.respond(0, page()); await tick(); return h;
}

test('choices are lazy, bounded, typed, selected-ID prioritized and abort siblings on failure', async () => {
    const h = runtime(); assert.equal(h.requests.length, 0);
    const task = h.window.SPPHPrintMasters.choices(10, 20, 30, true);
    assert.equal(h.requests.length, 3); assert.match(h.requests[0].url, /active_only=1&per_page=50&include_id=10/);
    h.respond(0, page()); h.respond(1, page([{...row, id: 20, type: 'jabatan_sci'}])); h.respond(2, page([{...row, id: 30, type: 'bidang_pr'}]));
    const result = await task; assert.equal(result.fields[0].id, 30); assert.equal(h.timers.size, 0);
    const failed = h.window.SPPHPrintMasters.choices(10, 20); h.respond(3, page([{...row, type: 'wrong'}]));
    await assert.rejects(failed, /Daftar master/); assert.equal(h.requests[4].options.signal.aborted, true);
});

test('choices honor caller cancellation including before any fetch', async () => {
    const h = runtime(), controller = new AbortController();
    const task = h.window.SPPHPrintMasters.choices(10, 20, null, false, controller.signal); controller.abort();
    await assert.rejects(task, {name: 'AbortError'}); assert.ok(h.requests.every(r => r.options.signal.aborted)); assert.equal(h.timers.size, 0);
    const next = h.window.SPPHPrintMasters.choices(10, 20, null, false, controller.signal); await assert.rejects(next, {name: 'AbortError'}); assert.equal(h.requests.length, 2);
});

test('single popup promise, one explicit initial read and read-only controls remain escaped', async () => {
    const h = runtime(), task = h.window.SPPHPrintMasters.open(false);
    assert.equal(h.window.SPPHPrintMasters.open(true), task); h.dialog().options.didOpen();
    h.respond(0, page([{...row, nama: '<img src=x>'}])); await tick();
    assert.match(h.text(), /&lt;img/); assert.doesNotMatch(h.text(), /sgMasterForm|data-sgm="edit"|data-sgm="toggle"/);
    await h.click('use'); assert.equal((await task).id, 10); assert.equal(h.requests.length, 1);
    assert.doesNotMatch(source, /setInterval|localStorage|sessionStorage/);
});

test('new search aborts old reads and neither stale success nor failure replaces current results or drafts', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'Draft <name>'; h.nodes.sgMasterActive.checked = false;
    h.nodes.sgMasterQuery.value = 'OLD'; const old = h.submit('sgMasterSearch');
    h.nodes.sgMasterQuery.value = 'NEW'; const latest = h.submit('sgMasterSearch');
    assert.equal(h.requests[1].options.signal.aborted, true); h.respond(2, page([{...row, nama: 'LATEST'}])); await latest;
    h.respond(1, {message: 'stale private failure'}, 500); await old; await tick();
    assert.match(h.text(), /LATEST/); assert.doesNotMatch(h.text(), /stale private failure/);
    assert.equal(h.nodes.sgMasterName.value, 'Draft <name>'); assert.equal(h.nodes.sgMasterActive.checked, false); assert.equal(h.nodes.sgMasterQuery.value, 'NEW'); h.close(); await h.task;
});

test('drafts survive type changes and failed versioned edit without native validation', async () => {
    const h = await opened(); await h.click('edit'); h.nodes.sgMasterName.value = 'Updated name'; h.nodes.sgMasterActive.checked = false;
    const change = h.change('jabatan_sci'); h.respond(1, page([{...row, type: 'jabatan_sci'}])); await change;
    h.nodes.sgMasterName.value = 'Draft title'; const back = h.change('penandatangan_sci'); h.respond(2, page()); await back;
    assert.equal(h.nodes.sgMasterName.value, 'Updated name'); assert.equal(h.nodes.sgMasterActive.checked, false);
    const save = h.submit(); assert.equal(h.requests[3].options.method, 'PUT'); assert.equal(JSON.parse(h.requests[3].options.body).version, row.version);
    h.respond(3, {message: '<img src=x> Data berubah'}, 409); await save;
    assert.equal(h.nodes.sgMasterName.value, 'Updated name'); assert.match(h.text(), /&lt;img/); assert.match(h.text(), /novalidate/);
    const again = h.change('jabatan_sci'); h.respond(4, page([{...row, type: 'jabatan_sci'}])); await again; assert.equal(h.nodes.sgMasterName.value, 'Draft title'); h.close(); await h.task;
});

test('CSRF writes lock controls and return, ignore duplicates, and distinguish saved data from failed refresh', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'New official';
    const save = h.submit(); await h.submit(); assert.equal(h.requests.length, 2); assert.equal(h.confirm.disabled, true);
    assert.equal(h.dialog().options.preConfirm(), false); assert.equal(h.dialog().options.allowEscapeKey(), false);
    assert.equal(h.requests[1].options.headers['X-CSRF-TOKEN'], 'test-csrf'); assert.equal(h.requests[1].options.credentials, 'same-origin');
    h.respond(1, {message: 'Master tersimpan.', option: {...row, id: 11, nama: 'New official'}}); await tick();
    assert.equal(h.nodes.sgMasterName.value, ''); h.respond(2, {message: 'private server trace'}, 500); await save;
    assert.match(h.text(), /Master tersimpan.*Daftar belum diperbarui.*jangan ulangi/); assert.doesNotMatch(h.text(), /private server trace/); assert.equal(h.confirm.disabled, false); h.close(); await h.task;
});

test('deactivation is versioned PUT with confirmation and preserves unrelated drafts', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'Unrelated draft'; await h.click('toggle'); assert.equal(h.requests.length, 1);
    const save = h.click('toggle'); assert.equal(h.requests[1].options.method, 'PUT'); assert.equal(JSON.parse(h.requests[1].options.body).is_active, false);
    h.respond(1, {option: {...row, is_active: false}, message: 'Nonaktif'}); await tick(); h.respond(2, page([{...row, is_active: false}])); await save;
    assert.equal(h.nodes.sgMasterName.value, 'Unrelated draft'); assert.ok(h.requests.every(r => r.options.method !== 'DELETE')); h.close(); await h.task;
});

test('stalled response body times out, keeps draft, and requires an explicit read before retrying writes', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'Slow write'; const save = h.submit();
    h.respond(1, null, 200, {json: () => new Promise(() => {})}); await tick(); [...h.timers.values()][0](); await save;
    assert.equal(h.requests[1].options.signal.aborted, true); assert.equal(h.nodes.sgMasterName.value, 'Slow write'); assert.match(h.text(), /koneksi lambat/);
    await h.submit(); assert.equal(h.requests.length, 2);
    const refresh = h.click('refresh'); h.respond(2, page()); await refresh; assert.match(h.text(), /Daftar terbaru/); assert.equal(h.nodes.sgMasterName.value, 'Slow write'); h.close(); await h.task; assert.equal(h.timers.size, 0);
});

test('missing CSRF and blank name never send writes', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = '   '; await h.submit(); assert.equal(h.requests.length, 1); assert.match(h.text(), /Isi nama/);
    h.nodes.sgMasterName.value = 'New official'; h.noCsrf(); await h.submit(); assert.equal(h.requests.length, 1); assert.match(h.text(), /Sesi formulir/); assert.equal(h.nodes.sgMasterName.value, 'New official'); h.close(); await h.task;
});

test('invalid HTML, redirects, malformed JSON, invalid rows and server traces are not accepted', async () => {
    for (const extra of [{headers: {get: () => 'text/html'}}, {redirected: true}, {json: async () => {throw new SyntaxError('private syntax');}}]) {
        const h = runtime(), task = h.window.SPPHPrintMasters.open(false); h.dialog().options.didOpen(); h.respond(0, page(), 200, extra); await tick();
        assert.match(h.text(), /Respons/); assert.doesNotMatch(h.text(), /private syntax|data-sgm="use"/); h.close(); await task;
    }
    const h = await opened(); const read = h.click('refresh'); h.respond(1, page([{...row, version: 'invalid'}])); await read; assert.match(h.text(), /Daftar master belum lengkap/); h.close(); await h.task;
});

test('live page shrink clamps at most once', async () => {
    const h = await opened(); const refresh = h.click('refresh'); h.respond(1, page([], {page: 3, last_page: 1})); await tick();
    assert.equal(new URL(h.requests[2].url, 'https://test').searchParams.get('page'), '1'); h.respond(2, page()); await refresh; assert.equal(h.requests.length, 3); h.close(); await h.task;
});

test('close and pagehide abort requests and ignore late results, with interrupted-write warning on next open', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'Pending'; const save = h.submit(); const before = h.updates.length;
    h.windowEvents.pagehide(); await h.task; await save; assert.equal(h.requests[1].options.signal.aborted, true);
    h.respond(1, {option: row}); await tick(); assert.equal(h.updates.length, before);
    const next = h.window.SPPHPrintMasters.open(true); h.dialog().options.didOpen(); h.respond(2, page()); await tick(); assert.match(h.text(), /Daftar terbaru.*Periksa data/); h.close(); await next;
});

test('confirmed save with an empty message still refreshes, while incomplete write confirmation blocks a blind retry', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'New official'; const save = h.submit();
    h.respond(1, {message: '', option: {...row, id: 11, nama: 'New official'}}); await tick(); assert.equal(h.requests.length, 3);
    h.respond(2, page()); await save; assert.match(h.text(), /Master berhasil disimpan/);
    h.nodes.sgMasterName.value = 'Another official'; const incomplete = h.submit(); h.respond(3, {message: 'OK'}); await incomplete;
    assert.equal(h.nodes.sgMasterName.value, 'Another official'); assert.match(h.text(), /Hasil penyimpanan belum lengkap/);
    await h.submit(); assert.equal(h.requests.length, 4); h.close(); await h.task;
});
