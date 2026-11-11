const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const asset = name => fs.readFileSync(path.join(__dirname, '../../public/assets', name), 'utf8');

function setup(fields = [], confirmed = true) {
    const dialogs = [], requests = [];
    const inputs = fields.map(([name, value, disabled = false]) => ({name, value, matches: () => disabled}));
    const button = {disabled: false, innerHTML: 'Simpan'};
    const form = {action: 'https://example.test/sp/4', inert: false, dataset: {},
        querySelectorAll: () => inputs, querySelector: () => button};
    const window = {SP_PAGE_CONFIG: {today: '2026-11-11'}, SPPH_PAGE_CONFIG: {today: '2026-11-11'}, location: {href: '/sp'}};
    const context = {window, URL, Intl, document: {querySelector: () => ({content: 'csrf'})},
        FormData: class {set() {} delete() {}},
        fetch: async (url, options) => {requests.push({url, options}); return {ok: true, headers: {get: () => 'application/json'}, json: async () => ({title: 'Pratinjau', summary: [], prs: []})};},
        Swal: {fire: async options => {dialogs.push(options); return {isConfirmed: confirmed};}}};
    window.Swal = context.Swal;
    vm.createContext(context);
    vm.runInContext(asset('app/procurement-date-warning.js'), context);
    vm.runInContext(asset('app/procurement-review.js'), context);
    return {window, form, inputs, button, dialogs, requests, context};
}

test('normal dates and optional empty dates continue without an extra dialog or request', async () => {
    const h = setup([['tanggal_sp', '2026-11-11'], ['tgl_sph', '2026-11-10'], ['promised_date', '2026-12-01'], ['awal_kontrak', '']]);
    assert.equal(await h.window.ProcurementDateWarning.confirm(h.form, 'sp'), true);
    assert.equal(h.dialogs.length, 0); assert.equal(h.requests.length, 0);
});

test('past years and extreme future years warn once together without changing dates', async () => {
    const fields = [['tanggal_sp', '2025-11-11'], ['tgl_sph', '0025-01-01'], ['promised_date', '20260-12-10']];
    const h = setup(fields);
    assert.equal(await h.window.ProcurementDateWarning.confirm(h.form, 'sp'), true);
    assert.equal(h.dialogs.length, 1);
    for (const date of ['11/11/2025', '01/01/0025', '10/12/20260']) assert.ok(h.dialogs[0].html.includes(date));
    assert.equal(h.dialogs[0].confirmButtonText, 'Lanjut simpan');
    assert.equal(h.dialogs[0].cancelButtonText, 'Periksa tanggal');
    assert.deepEqual(h.inputs.map(field => field.value), fields.map(field => field[1]));
    assert.equal(h.requests.length, 0);
});

test('fulfillment warnings include dynamic items in their visible order, including blank preceding rows', async () => {
    const h = setup([['tanggal', '2026-11-11'], ['items[0][tgl_pemenuhan]', '']]);
    h.inputs.push({name: 'items[7][tgl_pemenuhan]', value: '2025-01-12', matches: () => false});
    await h.window.ProcurementDateWarning.confirm(h.form, 'spph');
    assert.match(h.dialogs[0].title, /SPPH/);
    assert.match(h.dialogs[0].html, /barang 2/);
    assert.match(h.dialogs[0].html, /12\/01\/2025/);
    assert.match(h.dialogs[0].html, /lebih awal dari tanggal dokumen/);
});

test('document future dates, SPH after SP and reversed contract dates are advisory', async () => {
    const h = setup([['tanggal_sp', '2026-11-10'], ['tgl_sph', '2026-11-12'], ['tanggal_pemenang', '2026-11-11'], ['promised_date', '2026-11-09'], ['awal_kontrak', '2026-12-10'], ['akhir_kontrak', '2026-12-01']]);
    assert.equal(await h.window.ProcurementDateWarning.confirm(h.form, 'sp'), true);
    const html = h.dialogs[0].html;
    assert.match(html, /masa depan/); assert.match(html, /melewati tanggal SP/);
    assert.match(html, /pemenuhan lebih awal/); assert.match(html, /Akhir kontrak lebih awal/);
});

test('new year uses server calendar and leap day handling does not roll invalid dates over', async () => {
    const h = setup([['promised_date', '2026-12-31'], ['tgl_sph', '2027-02-29']]);
    h.window.SP_PAGE_CONFIG.today = '2027-01-01';
    await h.window.ProcurementDateWarning.confirm(h.form, 'sp');
    assert.match(h.dialogs[0].html, /tahun berjalan 2027/);
    assert.ok(!h.dialogs[0].html.includes('01/03/2027'));
    const leap = setup([['promised_date', '2024-02-29']]);
    await leap.window.ProcurementDateWarning.confirm(leap.form, 'sp');
    assert.match(leap.dialogs[0].html, /29\/02\/2024/);
});

test('disabled dates are excluded and label text is safely escaped', async () => {
    const h = setup([['tgl_sph', '2025-01-01', true], ['other_date', '2025-01-02']]);
    h.inputs[1].labels = [{textContent: '<img src=x onerror=alert(1)>'}];
    await h.window.ProcurementDateWarning.confirm(h.form, 'sp');
    assert.ok(!h.dialogs[0].html.includes('01/01/2025'));
    assert.ok(!h.dialogs[0].html.includes('<img'));
    assert.match(h.dialogs[0].html, /&lt;img/);
});

test('native confirmation fallback allows continuing or returning to the unchanged form', async () => {
    const h = setup([['tanggal', '2025-01-01']]);
    delete h.window.Swal;
    let message;
    h.window.confirm = text => {message = text; return false;};
    assert.equal(await h.window.ProcurementDateWarning.confirm(h.form, 'spph'), false);
    assert.match(message, /01\/01\/2025/);
    h.window.confirm = () => true;
    assert.equal(await h.window.ProcurementDateWarning.confirm(h.form, 'spph'), true);
});

for (const kind of ['sp', 'spph']) {
    test(`${kind} create/edit: cancel never requests preview, continue retains all date inputs`, async () => {
        for (const edit of [false, true]) {
            const fields = [[kind === 'sp' ? 'tanggal_sp' : 'tanggal', '2026-11-11'], ['items[0][tgl_pemenuhan]', '2025-01-01']];
            const canceled = setup(fields, false);
            assert.equal(await canceled.window.ProcurementReview.confirm(canceled.form, kind, edit), false);
            assert.equal(canceled.requests.length, 0); assert.equal(canceled.form.inert, false);
            const accepted = setup(fields, true);
            assert.equal(await accepted.window.ProcurementReview.confirm(accepted.form, kind, edit), true);
            assert.equal(accepted.requests.length, 1); assert.equal(accepted.form.inert, false);
            assert.equal(accepted.requests[0].url, `/procurement-review/${kind}${edit ? '/4' : ''}`);
            assert.deepEqual(accepted.inputs.map(field => field.value), fields.map(field => field[1]));
            // Rechecking after a canceled/retried submission never relies on stale consent.
            accepted.inputs[1].value = '2024-01-01';
            await accepted.window.ProcurementReview.confirm(accepted.form, kind, edit);
            assert.match(accepted.dialogs[2].html, /01\/01\/2024/);
        }
    });

    test(`${kind} AJAX save prevents duplicate submission while awaiting date confirmation and unlocks on return`, async () => {
        const h = setup([['tanggal', '2025-01-01']]);
        const name = kind === 'sp' ? 'submitFormAjaxSp' : 'submitFormAjaxSpph';
        const source = asset(`${kind}/${kind}.js`);
        const start = source.indexOf(`async function ${name}(`);
        const end = source.indexOf('\n            }', start) + '\n            }'.length;
        vm.runInContext(source.slice(start, end), h.context);
        let resolve;
        h.context.Swal.fire = async options => {h.dialogs.push(options); return new Promise(done => {resolve = done;});};
        const first = h.context[name](h.form, false);
        await h.context[name](h.form, false);
        assert.equal(h.dialogs.length, 1); assert.equal(h.button.disabled, true);
        assert.equal(h.form.inert, true); assert.equal(h.requests.length, 0);
        resolve({isConfirmed: false}); await first;
        assert.equal(h.button.disabled, false); assert.equal(h.button.innerHTML, 'Simpan');
        assert.equal(h.form.dataset.procurementSaving, undefined); assert.equal(h.form.inert, false);
    });
}
