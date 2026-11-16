const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {webcrypto} = require('node:crypto');
const source = fs.readFileSync('public/assets/app/user-management.js', 'utf8');
const transport = source.slice(source.indexOf('    async function request('), source.indexOf('    function show('));
const generator = source.slice(source.indexOf('    function randomIndex('), source.indexOf('    window.checkPasswordStrength'));
function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, AbortController, DOMException, config: {csrfToken: 'synthetic'}, document: {querySelector: () => null},
        setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.request, timeout: () => timer(), cleared: () => cleared};
}
const reply = (data, status = 200) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data});
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};

test('user mutations retain their method, payload, CSRF and private request settings', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return reply({success: true});});
    const body = new URLSearchParams({_method: 'PUT', name: 'Synthetic'});
    await h.request('/users/3', body, 'POST', new AbortController());
    assert.equal(sent.url, '/users/3'); assert.equal(sent.options.body, body); assert.equal(sent.options.method, 'POST');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(h.cleared(), 1);
});
test('a stalled user response body times out without retrying the mutation', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {...reply({}), json: () => new Promise(() => {})};});
    const pending = h.request('/users', undefined, 'POST', new AbortController()); await flush(); h.timeout();
    await assert.rejects(pending, /belum terkonfirmasi.*memeriksa hasil/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});
test('HTML, redirects, malformed JSON and unsuccessful payloads are not acknowledged as saved', async () => {
    for (const response of [{...reply({}), headers: {get: () => 'text/html'}}, {...reply({success: true}), redirected: true}, reply({}), reply({success: false}), {...reply({}), json: async () => {throw Error('private parser detail');}}]) {
        const h = harness(async () => response);
        await assert.rejects(h.request('/users', undefined, 'POST', new AbortController()), /belum dapat diverifikasi|belum lengkap/);
    }
});
test('authorization, expiry, validation and server errors preserve safe useful messages', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [419, /Sesi formulir/], [403, /izin/], [429, /Tunggu/], [500, /belum terkonfirmasi/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request('/users', undefined, 'POST', new AbortController()), error => error.status === status && pattern.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {email: ['Email sudah ada.']}}, 422));
    await assert.rejects(h.request('/users', undefined, 'POST', new AbortController()), error => error.fields.email[0] === 'Email sudah ada.');
});
test('abort releases a user action even if the network delivers its result much later', async () => {
    let finish;
    const h = harness(() => new Promise(resolve => {finish = resolve;})), controller = new AbortController();
    const pending = h.request('/users/3', undefined, 'DELETE', controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError');
    finish(reply({success: true})); await flush(); assert.equal(h.cleared(), 1);
});
test('generated passwords use Web Crypto and contain all required character groups', () => {
    const context = {window: {crypto: webcrypto}};
    vm.createContext(context); vm.runInContext(generator, context);
    for (let i = 0; i < 100; i++) {
        const password = context.securePassword();
        assert.equal(password.length, 16); assert.match(password, /^[A-Za-z0-9!@#$%^&*]+$/);
        for (const pattern of [/[A-Z]/, /[a-z]/, /\d/, /[!@#$%^&*]/]) assert.match(password, pattern);
    }
});
test('random selection discards the biased tail before selecting an index', () => {
    let calls = 0;
    const context = {window: {crypto: {getRandomValues(buffer) {buffer[0] = calls++ === 0 ? 4294967295 : 0;}}}};
    vm.createContext(context); vm.runInContext(generator, context);
    assert.equal(context.randomIndex(62), 0); assert.equal(calls, 2);
});
