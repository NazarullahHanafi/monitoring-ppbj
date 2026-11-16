const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {webcrypto} = require('node:crypto');
const source = fs.readFileSync('public/assets/app/account-password.js', 'utf8');
const generator = source.slice(source.indexOf('    function randomIndex('), source.indexOf('    function updateIndicators('));
const transport = source.slice(source.indexOf('    async function request('), source.indexOf('    window.checkPasswordStrength'));
function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, URL, AbortController, DOMException, form: {action: 'https://fixture.test/account/password'}, window: {location: {href: 'https://fixture.test/account', origin: 'https://fixture.test'}},
        setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.request, context, timeout: () => timer(), cleared: () => cleared};
}
const reply = (data, status = 200) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data});
const body = () => new URLSearchParams({_token: 'synthetic', current_password: 'OldSynthetic123', password: 'NewSynthetic123', password_confirmation: 'NewSynthetic123'});
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};

test('account password saves keep CSRF private request settings and exact payload without URL secrets', async () => {
    let sent; const payload = body();
    const h = harness(async (url, options) => {sent = {url, options}; return reply({success: true});});
    await h.request(payload, new AbortController());
    assert.equal(sent.url, 'https://fixture.test/account/password'); assert.equal(sent.options.body, payload); assert.equal(sent.options.method, 'POST');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(h.cleared(), 1);
});

test('stalled password response bodies time out once without automatically repeating the save', async () => {
    let calls = 0; const h = harness(async () => {calls++; return {...reply({}), json: () => new Promise(() => {})};});
    const pending = h.request(body(), new AbortController()); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*Periksa hasil/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});

test('HTML redirects invalid JSON and missing success never acknowledge a password change', async () => {
    for (const response of [{...reply({}), headers: {get: () => 'text/html'}}, {...reply({success: true}), redirected: true}, reply({success: false}), reply({}), {...reply({}), json: async () => {throw Error('private parser detail');}}]) {
        const h = harness(async () => response);
        await assert.rejects(h.request(body(), new AbortController()), /belum dapat diverifikasi|belum lengkap/);
    }
});

test('password failures retain field errors but suppress private server details', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [403, /tidak diizinkan/], [409, /Password akun telah berubah/], [419, /Sesi formulir/], [429, /Tunggu/], [500, /belum terkonfirmasi/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request(body(), new AbortController()), error => error.status === status && pattern.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {current_password: ['Password lama salah.']}}, 422));
    await assert.rejects(h.request(body(), new AbortController()), error => error.fields.current_password[0] === 'Password lama salah.');
});

test('password transport rejects external targets and ignores late results after cancellation', async () => {
    let finish, calls = 0;
    const h = harness(() => {calls++; return new Promise(resolve => {finish = resolve;});}), controller = new AbortController();
    h.context.form.action = 'https://untrusted.test/steal';
    await assert.rejects(h.request(body(), controller), /Tujuan formulir/); assert.equal(calls, 0);
    h.context.form.action = '/account/password'; const pending = h.request(body(), controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError'); finish(reply({success: true})); await flush(); assert.equal(h.cleared(), 1);
});

test('account generator uses unbiased Web Crypto and client checks count bcrypt bytes', () => {
    const context = {window: {crypto: webcrypto}, TextEncoder}; vm.createContext(context); vm.runInContext(generator, context);
    for (let i = 0; i < 100; i++) {
        const value = context.securePassword(); assert.equal(value.length, 16);
        for (const pattern of [/[A-Z]/, /[a-z]/, /\d/, /[!@#$%^&*]/]) assert.match(value, pattern);
    }
    assert.equal(Object.keys(context.passwordErrors('Aa1!' + 'é'.repeat(34), 'Aa1!' + 'é'.repeat(34), 72)).length, 0);
    assert.match(context.passwordErrors('Aa1!' + 'é'.repeat(35), '', 72).password, /72 byte/);
    assert.match(context.passwordErrors('Aa1!abcd\0tail', '', 72).password, /null/);
    let calls = 0; context.window.crypto = {getRandomValues(buffer) {buffer[0] = calls++ === 0 ? 4294967295 : 0;}};
    assert.equal(context.randomIndex(62), 0); assert.equal(calls, 2);
});
