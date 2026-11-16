const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('public/assets/app/satuan.js', 'utf8');
function harness(fetch, selects = [], fire = async () => ({isConfirmed: false})) {
    let timer, cleared = 0;
    const listeners = {}, page = {};
    function Option(text, value) {this.text = text; this.value = value;}
    const window = {Swal: {fire}, addEventListener: (name, fn) => {page[name] = fn;}};
    const context = {window, fetch, Option, URLSearchParams, AbortController, DOMException,
        setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;},
        document: {querySelector: () => ({content: 'synthetic'}), querySelectorAll: () => selects,
            addEventListener: (name, fn) => {listeners[name] = fn;}}};
    vm.runInNewContext(source, context);
    return {...window.SatuanUI, timeout: () => timer(), cleared: () => cleared, listeners, page};
}
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};
const reply = (data, status = 200) => ({ok: status < 400, status, json: async () => data});
const select = value => ({value, form: {}, isConnected: true, disabled: false, dataset: {previousValue: 'Unit'}, options: [],
    replaceChildren(...items) {this.options = items;}, add(item) {this.options.push(item);}});

test('satuan writes carry CSRF and same-origin credentials and bypass HTTP caches', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return reply({success: true});});
    await h.request('/satuan', {method: 'POST', body: 'draft'});
    assert.equal(sent.url, '/satuan'); assert.equal(sent.options.method, 'POST'); assert.equal(sent.options.body, 'draft');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(h.cleared(), 1);
});
test('timeout covers a stalled JSON body and never retries an uncertain write', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {ok: true, json: () => new Promise(() => {})};});
    const pending = h.request('/satuan', {method: 'POST'}); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*Koneksi lambat/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});
test('HTML, redirects and malformed successes never become saved units', async () => {
    for (const response of [{ok: true, json: async () => {throw Error('HTML');}}, {...reply({success: true}), redirected: true}, reply({}), reply({success: false})]) {
        const h = harness(async () => response); await assert.rejects(h.request('/satuan'), /Respons penyimpanan tidak valid/);
    }
    const h = harness();
    for (const item of [null, {}, {id: '1', nama_satuan: 'Unit'}, {id: 0, nama_satuan: 'Unit'}, {id: 1, nama_satuan: ''}, {id: 1, nama_satuan: 'x'.repeat(101)}]) assert.equal(h.validItem(item), false);
    assert.equal(h.validItem({id: 1, nama_satuan: 'A & "B"'}), true);
});
test('permission, session and validation failures retain actionable messages', async () => {
    for (const [status, expected] of [[401, /Sesi berakhir/], [419, /Sesi formulir/], [403, /izin/], [429, /Tunggu/], [500, /belum terkonfirmasi/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request('/satuan'), error => error.status === status && expected.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {nama_satuan: ['Nama sudah tersedia.']}}, 422));
    await assert.rejects(h.request('/satuan'), error => /Nama sudah tersedia/.test(error.message) && error.errors.nama_satuan[0] === 'Nama sudah tersedia.');
});
test('quick add uses the server canonical name, preserves legacy rows and guards submit/reset', async () => {
    const target = select('__add_satuan__'), other = select('Legacy & "Unit"'), names = ['Unit'];
    let finish, calls = 0, prompt;
    const h = harness(() => {calls++; return new Promise(resolve => {finish = resolve;});}, [target, other], async options => {
        if (options.input) {prompt = options; return {isConfirmed: true, value: 'Roll'};} return {};
    });
    const add = h.createQuick({names, url: '/satuan'}), pending = add(target); await flush();
    assert.equal(target.disabled, true);
    for (const type of ['submit', 'reset']) {
        let prevented = false, stopped = false;
        h.listeners[type]({target: target.form, preventDefault: () => {prevented = true;}, stopImmediatePropagation: () => {stopped = true;}});
        assert.equal(prevented && stopped, true);
    }
    await add(select('__add_satuan__')); assert.equal(calls, 1);
    assert.match(prompt.inputValidator(' Unit '), /sudah ada/); assert.match(prompt.inputValidator(' '), /wajib/);
    finish(reply({success: true, satuan: {id: 4, nama_satuan: 'Roll Canonical'}})); await pending;
    assert.equal(target.value, 'Roll Canonical'); assert.equal(target.dataset.previousValue, 'Roll Canonical');
    assert.equal(other.value, 'Legacy & "Unit"'); assert.equal(other.options.some(item => item.value === other.value), true);
    assert.deepEqual(names, ['Roll Canonical', 'Unit']); assert.equal(target.disabled, false);
});
test('cancelled and failed quick adds restore the previous selection without claiming success', async () => {
    for (const cancel of [true, false]) {
        const target = select('__add_satuan__'), names = ['Unit'], notices = []; let calls = 0;
        const h = harness(async () => {calls++; return reply({success: true});}, [target], async options => {
            if (options.input) return {isConfirmed: !cancel, value: 'Roll'};
            notices.push(options); return {};
        });
        await h.createQuick({names, url: '/satuan'})(target);
        assert.equal(target.value, 'Unit'); assert.equal(target.disabled, false); assert.deepEqual(names, ['Unit']);
        assert.equal(calls, cancel ? 0 : 1); assert.equal(notices.some(item => item.icon === 'success'), false);
    }
});
test('leaving the page aborts writes and ignores late results', async () => {
    const target = select('__add_satuan__'), names = ['Unit']; let finish;
    const h = harness(() => new Promise(resolve => {finish = resolve;}), [target], async () => ({isConfirmed: true, value: 'Roll'}));
    const pending = h.createQuick({names, url: '/satuan'})(target); await flush(); h.page.pagehide(); await pending;
    finish(reply({success: true, satuan: {id: 2, nama_satuan: 'Roll'}})); await flush();
    assert.deepEqual(names, ['Unit']); assert.equal(target.value, 'Unit'); assert.equal(target.disabled, false);
});
