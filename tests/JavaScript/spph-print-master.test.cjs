const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/spph/spph-print-master.js', 'utf8');
const tick = () => new Promise(setImmediate);
const row = {id: 10, type: 'penandatangan_sci', nama: 'Pejabat Penguji', is_active: true, version: 'a'.repeat(64)};
const page = (rows = [row], extra = {}) => ({options: rows, page: 1, last_page: 1, total: rows.length, ...extra});
const batch = (fields = true) => ({limit: 50, choices: {penandatangan_sci: [row], jabatan_sci: [{...row, id: 20, type: 'jabatan_sci'}], ...(fields ? {bidang_pr: [{...row, id: 30, type: 'bidang_pr'}]} : {})}, truncated: {penandatangan_sci: false, jabatan_sci: false, ...(fields ? {bidang_pr: false} : {})}});
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

test('choices lazily read all requested types in one private request with selected IDs and bounded output', async () => {
    const h = runtime(); assert.equal(h.requests.length, 0);
    const task = h.window.SPPHPrintMasters.choices(10, 20, 30, true);
    assert.equal(h.requests.length, 1);
    const params = new URLSearchParams(h.requests[0].url.split('?')[1]);
    assert.deepEqual(params.getAll('types[]'), ['penandatangan_sci', 'jabatan_sci', 'bidang_pr']);
    assert.equal(params.get('include_ids[penandatangan_sci]'), '10'); assert.equal(params.get('include_ids[jabatan_sci]'), '20'); assert.equal(params.get('include_ids[bidang_pr]'), '30');
    assert.equal(h.requests[0].options.cache, 'no-store'); assert.equal(h.requests[0].options.credentials, 'same-origin');
    h.respond(0, batch());
    const result = await task; assert.equal(result.fields[0].id, 30); assert.equal(h.timers.size, 0);
    const next = h.window.SPPHPrintMasters.choices(null, '', null, false); h.respond(1, batch(false));
    assert.equal(Object.hasOwn(await next, 'fields'), false); assert.equal(h.requests.length, 2);
});

test('choices honor caller cancellation including before any fetch', async () => {
    const h = runtime(), controller = new AbortController();
    const task = h.window.SPPHPrintMasters.choices(10, 20, null, false, controller.signal); controller.abort();
    await assert.rejects(task, {name: 'AbortError'}); assert.ok(h.requests.every(r => r.options.signal.aborted)); assert.equal(h.timers.size, 0);
    const next = h.window.SPPHPrintMasters.choices(10, 20, null, false, controller.signal); await assert.rejects(next, {name: 'AbortError'}); assert.equal(h.requests.length, 1);
});

test('a batched choice read rejects malformed, partial, inactive, duplicate or oversized results atomically without retries', async () => {
    const invalid = [
        data => delete data.choices.jabatan_sci, data => data.choices.extra = [], data => data.limit = '50', data => data.truncated = [],
        data => data.truncated.jabatan_sci = 'false', data => data.truncated.jabatan_sci = true,
        data => data.choices.jabatan_sci[0].is_active = false, data => data.choices.jabatan_sci[0].type = 'bidang_pr',
        data => data.choices.jabatan_sci[0].id = 10, data => data.choices.jabatan_sci.push({...data.choices.jabatan_sci[0]}),
        data => data.choices.penandatangan_sci[0].version = 'invalid',
        data => data.choices.penandatangan_sci[0].version = ['a'.repeat(64)],
        data => data.choices.jabatan_sci = Array.from({length: 51}, (_, i) => ({...row, id: 100 + i, type: 'jabatan_sci'})),
    ];
    for (const change of invalid) {
        const h = runtime(), task = h.window.SPPHPrintMasters.choices(10, 20, 30, true), data = structuredClone(batch()); change(data); h.respond(0, data);
        await assert.rejects(task, /Daftar master/); assert.equal(h.requests.length, 1); assert.equal(h.timers.size, 0);
    }
});

test('invalid selected choice identifiers never reach the network', async () => {
    for (const id of [0, -1, '01', [], {}, '1&types[]=unknown', Number.MAX_SAFE_INTEGER + 1]) {
        const h = runtime(); await assert.rejects(h.window.SPPHPrintMasters.choices(id, null), /Pilihan master tersimpan/); assert.equal(h.requests.length, 0); assert.equal(h.timers.size, 0);
    }
});

test('batched choice body timeout or cancellation settles the entire read and ignores late data', async () => {
    for (const cancel of [false, true]) {
        const h = runtime(), controller = new AbortController(), task = h.window.SPPHPrintMasters.choices(10, 20, 30, true, controller.signal);
        let finish; h.respond(0, null, 200, {json: () => new Promise(resolve => finish = resolve)}); await tick();
        if (cancel) controller.abort(); else [...h.timers.values()][0]();
        await assert.rejects(task, cancel ? {name: 'AbortError'} : /koneksi lambat/);
        finish(batch()); await tick(); assert.equal(h.requests.length, 1); assert.equal(h.requests[0].options.signal.aborted, true); assert.equal(h.timers.size, 0);
    }
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
    const h = await opened(); const refresh = h.click('refresh'); h.respond(1, page(Array.from({length: 12}, (_, i) => ({...row, id: i + 1})), {total: 13, last_page: 2})); await refresh;
    const next = h.click('next'); assert.equal(new URL(h.requests[2].url, 'https://test').searchParams.get('page'), '2'); h.respond(2, page([], {page: 2, total: 1, last_page: 1})); await tick();
    assert.equal(new URL(h.requests[3].url, 'https://test').searchParams.get('page'), '1'); h.respond(3, page()); await next; assert.equal(h.requests.length, 4); h.close(); await h.task;
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
    assert.equal(h.nodes.sgMasterName.value, 'Another official'); assert.match(h.text(), /Hasil penyimpanan belum cocok/);
    await h.submit(); assert.equal(h.requests.length, 4); h.close(); await h.task;
});

test('save acknowledgment must match the submitted name and active flag before clearing a draft', async () => {
    for (const patch of [{nama: 'Different official'}, {is_active: false}, {type: 'jabatan_sci'}]) {
        const h = await opened(); h.nodes.sgMasterName.value = 'Actual draft'; const save = h.submit();
        try {
            h.respond(1, {option: {...row, id: 11, nama: 'Actual draft', ...patch}}); await tick();
            assert.equal(h.nodes.sgMasterName.value, 'Actual draft'); assert.equal(h.requests.length, 2);
            assert.match(h.text(), /belum cocok|belum lengkap/);
            await h.submit(); assert.equal(h.requests.length, 2);
        } finally {h.close(); await h.task; await save;}
    }
});

test('an obsolete edit version cannot be resubmitted after a 409 until a fresh explicit Edit', async () => {
    const h = await opened(); await h.click('edit'); h.nodes.sgMasterName.value = 'Retained correction'; const save = h.submit();
    try {
        h.respond(1, {message: 'Master berubah.'}, 409); await save;
        assert.equal(h.nodes.sgMasterName.value, 'Retained correction');
        const retry = h.submit(); assert.equal(h.requests.length, 2); await retry;
        const refresh = h.click('refresh'); const latest = {...row, nama: 'New current row', version: 'b'.repeat(64)}; h.respond(2, page([latest])); await refresh;
        assert.equal(h.nodes.sgMasterName.value, 'Retained correction'); await h.submit(); assert.equal(h.requests.length, 3);
        await h.click('edit'); assert.equal(h.nodes.sgMasterName.value, 'New current row'); h.nodes.sgMasterName.value = 'Explicit fresh correction';
        const next = h.submit(); assert.equal(JSON.parse(h.requests[3].options.body).version, latest.version); h.respond(3, {option: {...latest, nama: 'Explicit fresh correction'}}); await tick(); h.respond(4, page()); await next;
    } finally {h.close(); await h.task;}
});

test('duplicate rows or inconsistent pagination cannot replace an unavailable list with usable actions', async () => {
    for (const data of [page([row, row]), page([row], {last_page: 2}), page([row], {page: 2}), page([row], {total: 2}), page([], {page: 100001})]) {
        const h = await opened(); h.nodes.sgMasterName.value = 'Unchanged draft'; const refresh = h.click('refresh'); h.respond(1, data); await refresh;
        assert.match(h.text(), /Daftar master belum lengkap/); assert.doesNotMatch(h.text(), /data-sgm="use"|Tidak ada master yang cocok/);
        assert.equal(h.nodes.sgMasterName.value, 'Unchanged draft'); h.close(); await h.task;
    }
});

test('an uncertain write is unlocked only by a valid read of its own master type', async () => {
    const h = await opened(); h.nodes.sgMasterName.value = 'Unverified signer'; const save = h.submit(); h.respond(1, {message: 'private trace'}, 500); await save;
    const title = h.change('jabatan_sci'); h.respond(2, page([{...row, id: 20, type: 'jabatan_sci'}])); await title;
    const back = h.change('penandatangan_sci'); await h.submit(); assert.equal(h.requests.length, 4);
    h.respond(3, page([row], {total: 2})); await back; await h.submit(); assert.equal(h.requests.length, 4);
    const failed = h.click('refresh'); h.respond(4, {message: 'private trace'}, 503); await failed; await h.submit(); assert.equal(h.requests.length, 5);
    const valid = h.click('refresh'); h.respond(5, page()); await valid;
    assert.equal(h.nodes.sgMasterName.value, 'Unverified signer'); assert.match(h.text(), /Daftar terbaru/); assert.doesNotMatch(h.text(), /private trace/);
    const retry = h.submit(); assert.equal(h.requests.length, 7); assert.equal(JSON.parse(h.requests[6].options.body).type, 'penandatangan_sci');
    h.respond(6, {errors: {nama: ['Nama perlu diperiksa.']}}, 422); await retry; h.close(); await h.task;
});

test('fresh reads detect changed edit versions and preserve that guard and drafts across type changes', async () => {
    const h = await opened(); await h.click('edit'); h.nodes.sgMasterName.value = 'My correction';
    const latest = {...row, nama: 'Someone else changed this', version: 'b'.repeat(64)};
    const refresh = h.click('refresh'); h.respond(1, page([latest])); await refresh; await h.submit(); assert.equal(h.requests.length, 2);
    const other = h.change('jabatan_sci'); h.respond(2, page([{...row, type: 'jabatan_sci'}])); await other;
    const back = h.change('penandatangan_sci'); h.respond(3, page([latest])); await back;
    assert.equal(h.nodes.sgMasterName.value, 'My correction'); assert.match(h.text(), /Versi edit sudah berubah/); await h.submit(); assert.equal(h.requests.length, 4);
    await h.click('cancel-edit'); assert.equal(h.nodes.sgMasterName.value, ''); h.nodes.sgMasterName.value = 'New independent official';
    const create = h.submit(); assert.equal(h.requests[4].options.method, 'POST'); h.respond(4, {option: {...row, id: 11, nama: 'New independent official'}}); await tick(); h.respond(5, page()); await create;
    h.close(); await h.task;
});

test('failed initial reads are shown as unavailable and only a verified empty list claims no matches', async () => {
    const h = runtime(), task = h.window.SPPHPrintMasters.open(false); h.dialog().options.didOpen(); h.respond(0, {message: 'private trace'}, 500); await tick();
    assert.match(h.text(), /Daftar master belum dapat dipastikan/); assert.doesNotMatch(h.text(), /Tidak ada master yang cocok|private trace/);
    const refresh = h.click('refresh'); h.respond(1, page([])); await refresh; assert.match(h.text(), /Tidak ada master yang cocok/);
    h.close(); await task;
});

test('departure after a confirmed save does not mark it uncertain, while closing an uncertain result carries the guard', async () => {
    for (const confirmed of [true, false]) {
        const h = await opened(); h.nodes.sgMasterName.value = 'Departure official'; const save = h.submit();
        h.respond(1, confirmed ? {option: {...row, id: 11, nama: 'Departure official'}} : {message: 'private failure'}, confirmed ? 200 : 500);
        await tick();
        if (confirmed) h.windowEvents.pagehide(); else h.close();
        await h.task; await save;
        const next = h.window.SPPHPrintMasters.open(true); h.dialog().options.didOpen();
        if (confirmed) assert.doesNotMatch(h.text(), /Penyimpanan belum terverifikasi/); else assert.match(h.text(), /Penyimpanan belum terverifikasi/);
        const index = confirmed ? 3 : 2; h.respond(index, page()); await tick();
        if (confirmed) assert.doesNotMatch(h.text(), /Daftar terbaru/); else assert.match(h.text(), /Daftar terbaru/);
        h.close(); await next;
    }
});

test('toggling the record being edited preserves its draft and requires a fresh Edit before saving that old draft', async () => {
    const h = await opened(); await h.click('edit'); h.nodes.sgMasterName.value = 'Keep my separate correction'; await h.click('toggle');
    const toggle = h.click('toggle'), latest = {...row, is_active: false, version: 'b'.repeat(64)};
    assert.equal(JSON.parse(h.requests[1].options.body).nama, row.nama); h.respond(1, {option: latest}); await tick(); h.respond(2, page([latest])); await toggle;
    assert.equal(h.nodes.sgMasterName.value, 'Keep my separate correction'); assert.match(h.text(), /Versi edit sudah berubah/);
    await h.submit(); assert.equal(h.requests.length, 3); h.close(); await h.task;
});
