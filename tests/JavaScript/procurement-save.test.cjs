const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(kind, response = {}) {
    const source = fs.readFileSync(path.join(__dirname, `../../public/assets/${kind}/${kind}.js`), 'utf8');
    const suffix = kind === 'sp' ? 'Sp' : 'Spph';
    const name = `submitFormAjax${suffix}`;
    const dialogs = [], requests = [], timers = new Map(), cleared = [];
    const button = {disabled: false, innerHTML: 'Simpan'};
    const fields = {tgl_sph: '2025-01-12', 'items[0][tgl_pemenuhan]': '2025-01-12', _method: 'PUT'};
    const form = {action: `https://example.test/${kind}/4`, dataset: {}, inert: false, fields, querySelector: () => button};
    const window = {location: {href: `/${kind}`}, SP_PAGE_CONFIG: {},
        ProcurementDetails: {beforeSave: async () => true}, ProcurementReview: {confirm: async () => true}};
    const context = {window, AbortController, document: {documentElement: {classList: {contains: () => false}}},
        FormData: class {constructor(input) {this.values = {...input.fields};}},
        setTimeout: (callback, duration) => {const id = timers.size + 1; timers.set(id, {callback, duration}); return id;},
        clearTimeout: id => {cleared.push(id);},
        fetch: async (url, options) => {requests.push({url, options}); return {ok: true, redirected: false, headers: {get: () => 'application/json'},
            json: async () => ({message: 'Tersimpan', redirect: `/${kind}?saved=1`}), ...response};},
        Swal: {fire: async options => {dialogs.push(options); return {isConfirmed: false};}}};
    vm.createContext(context);
    const readFunction = (declaration, indent) => {
        const start = source.indexOf(declaration);
        assert.ok(start >= 0, declaration);
        const end = source.indexOf(`\n${indent}}`, start) + indent.length + 2;
        vm.runInContext(source.slice(start, end), context);
    };
    if (kind === 'sp') vm.runInContext(source.match(/function escapedHtml\(s\) \{[^\r\n]+/)[0], context);
    else readFunction('function escapedHtml(str)', '        ');
    readFunction(`function swalTheme${suffix}()`, '            ');
    readFunction(`function ajaxErrorMessage${suffix}(data)`, '            ');
    readFunction(`async function ${name}(`, '            ');
    return {form, fields, button, dialogs, requests, timers, cleared, context, window, save: () => context[name](form, true)};
}

for (const kind of ['sp', 'spph']) {
    test(`${kind}: successful save holds the lock until navigation and sends dates and edit method intact`, async () => {
        const h = setup(kind);
        let finish;
        h.context.Swal.fire = async options => {h.dialogs.push(options); return new Promise(resolve => {finish = resolve;});};
        const pending = h.save();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(h.dialogs[0].title, 'Berhasil disimpan');
        assert.equal(h.form.inert, true); assert.equal(h.button.disabled, true);
        await h.save(); assert.equal(h.requests.length, 1);
        assert.deepEqual(h.requests[0].options.body.values, h.fields);
        assert.equal(h.requests[0].options.method, 'POST');
        assert.equal(h.cleared.length, 1);
        finish({}); await pending;
        assert.equal(h.window.location.href, `/${kind}?saved=1`);
        assert.equal(h.button.disabled, true); assert.equal(h.form.dataset.procurementSaving, 'true');
        await h.save(); assert.equal(h.requests.length, 1);
    });

    for (const [description, response] of [
        ['HTML login page', {headers: {get: () => 'text/html'}, redirected: true}],
        ['redirected response', {redirected: true}],
        ['incomplete JSON', {json: async () => ({})}],
        ['truncated JSON', {json: async () => {throw new SyntaxError('Unexpected end');}}]
    ]) test(`${kind}: ${description} cannot be announced as a successful save`, async () => {
        const h = setup(kind, response);
        await h.save();
        assert.equal(h.requests.length, 1);
        assert.equal(h.dialogs[0].title, 'Periksa status penyimpanan');
        assert.match(h.dialogs[0].text, /sebelum menyimpan ulang/);
        assert.equal(h.form.inert, false); assert.equal(h.button.disabled, false);
        assert.equal(h.fields['items[0][tgl_pemenuhan]'], '2025-01-12');
        assert.equal(h.form.dataset.procurementSaving, undefined);
        assert.equal(h.cleared.length, 1);
        assert.equal(h.window.location.href, `/${kind}`);
    });

    test(`${kind}: stalled save aborts once, preserves fields, links to the list and never resends automatically`, async () => {
        const h = setup(kind);
        h.window.SP_PAGE_CONFIG.oracleMode = true;
        let attempts = 0;
        h.context.fetch = async (url, options) => {attempts++; return new Promise((resolve, reject) => {
            options.signal.addEventListener('abort', () => reject(new Error('aborted')));
        });};
        const pending = h.save();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(h.form.inert, true); assert.equal(h.button.disabled, true);
        const timer = Array.from(h.timers.values())[0];
        assert.equal(timer.duration, 90000); timer.callback();
        await pending;
        assert.equal(attempts, 1); assert.equal(h.cleared.length, 1);
        assert.match(h.dialogs[0].text, /belum dapat dipastikan/);
        assert.ok(h.dialogs[0].footer.includes(kind === 'sp' ? '/sp?oracle=1' : '/spph'));
        assert.equal(h.form.inert, false); assert.equal(h.button.disabled, false);
        assert.equal(h.fields.tgl_sph, '2025-01-12');
    });

    test(`${kind}: validation error restores controls and conflict text cannot inject markup`, async () => {
        const error = '<img src=x onerror=alert(1)>';
        const h = setup(kind, {ok: false, status: 409, json: async () => ({message: error, conflict: true})});
        await h.save();
        assert.equal(h.dialogs[0].title, 'Nomor bentrok / data berubah');
        assert.ok(!h.dialogs[0].html.includes('<img'));
        assert.match(h.dialogs[0].html, /&lt;img/);
        assert.equal(h.form.inert, false); assert.equal(h.button.disabled, false);
        const validation = setup(kind, {ok: false, status: 422, json: async () => ({errors: {nomor_sp: ['Nomor sudah digunakan']}})});
        await validation.save();
        assert.equal(validation.dialogs[0].text, 'Nomor sudah digunakan');
        assert.equal(validation.form.inert, false); assert.equal(validation.button.disabled, false);
    });

    test(`${kind}: preparation failure never sends a write or mislabels its outcome`, async () => {
        const h = setup(kind);
        h.window.ProcurementDetails.beforeSave = async () => {throw new Error('Preparation failed');};
        await h.save();
        assert.equal(h.requests.length, 0); assert.equal(h.timers.size, 0);
        assert.equal(h.dialogs[0].title, 'Persiapan simpan belum selesai');
        assert.equal(h.form.inert, false); assert.equal(h.button.disabled, false);
    });
}
