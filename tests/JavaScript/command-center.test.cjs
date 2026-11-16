const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/command-center/command-center.js', 'utf8');
const transport = source.slice(source.indexOf('    async function fetchJson('), source.indexOf('    function cancelOperation('));
function harness(fetch) {
    let timer, cleared = 0;
    const context = {fetch, URL, AbortController, DOMException, csrf: 'synthetic', window: {location: {href: 'https://fixture.test/command-center', origin: 'https://fixture.test'}},
        setTimeout: fn => {timer = fn; return 1;}, clearTimeout: () => {cleared++;}};
    vm.createContext(context); vm.runInContext(transport, context);
    return {request: context.fetchJson, timeout: () => timer(), cleared: () => cleared};
}
const reply = (data, status = 200) => ({ok: status < 400, status, headers: {get: () => 'application/json'}, json: async () => data});
const flush = async () => {for (let i = 0; i < 12; i++) await Promise.resolve();};

test('command center reads and questions keep private transport settings and CSRF', async () => {
    let sent;
    const h = harness(async (url, options) => {sent = {url, options}; return reply({results: []});});
    await h.request('/command-center/ask', {method: 'POST', body: '{"question":"PR belum SPPH"}'});
    assert.equal(sent.url, 'https://fixture.test/command-center/ask'); assert.equal(sent.options.method, 'POST');
    assert.equal(sent.options.headers['X-CSRF-TOKEN'], 'synthetic'); assert.equal(sent.options.headers.Accept, 'application/json');
    assert.equal(sent.options.credentials, 'same-origin'); assert.equal(sent.options.cache, 'no-store'); assert.equal(h.cleared(), 1);
});

test('command center deadline covers a stalled response body without relying on fetch cancellation', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return {...reply({}), json: () => new Promise(() => {})};});
    const pending = h.request('/command-center/search'); await flush(); h.timeout();
    await assert.rejects(pending, /Respons terlalu lama/); assert.equal(calls, 1); assert.equal(h.cleared(), 1);
});

test('command center rejects redirects HTML invalid JSON and array payloads', async () => {
    for (const response of [{...reply({}), headers: {get: () => 'text/html'}}, {...reply({}), redirected: true}, reply(null), reply([]), {...reply({}), json: async () => {throw Error('private parser detail');}}]) {
        const h = harness(async () => response);
        await assert.rejects(h.request('/command-center/search'), /belum dapat diverifikasi|belum lengkap/);
    }
});

test('command center errors suppress internal server details and retain useful validation messages', async () => {
    for (const [status, pattern] of [[401, /Sesi berakhir/], [403, /izin/], [419, /Sesi formulir/], [429, /Tunggu/], [500, /belum berhasil/]]) {
        const h = harness(async () => reply({message: 'SQL private detail'}, status));
        await assert.rejects(h.request('/command-center/search'), error => pattern.test(error.message) && !error.message.includes('SQL'));
    }
    const h = harness(async () => reply({errors: {q: ['Kata pencarian terlalu panjang.']}}, 422));
    await assert.rejects(h.request('/command-center/search'), /terlalu panjang/);
});

test('aborted command center reads ignore responses from a transport that does not honor cancellation', async () => {
    let finish;
    const h = harness(() => new Promise(resolve => {finish = resolve;})), controller = new AbortController();
    const pending = h.request('/command-center/journey/3', {}, controller); controller.abort();
    await assert.rejects(pending, error => error.name === 'AbortError');
    finish(reply({record: {id: 3}})); await flush(); assert.equal(h.cleared(), 1);
});

test('command center never sends its CSRF token to an external response-provided URL', async () => {
    let calls = 0; const h = harness(async () => {calls++; return reply({});});
    for (const url of ['https://untrusted.test/archive', '//untrusted.test/archive', 'javascript:alert(1)']) await assert.rejects(h.request(url), /Tujuan permintaan belum valid/);
    assert.equal(calls, 0);
});
