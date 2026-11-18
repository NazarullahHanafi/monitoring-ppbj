const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/sp/sp.js', 'utf8');
const block = name => source.slice(source.indexOf(`/* BEGIN SP ${name} */`), source.indexOf(`/* END SP ${name} */`));
const tick = () => new Promise(setImmediate);
function runtime(extra = {}) {
    const timers = new Map(), requests = [], events = {}, nodes = {}, serials = { timer: 0, reload: 0, beacon: 0 };
    for (const id of ['spUpdates', 'spUpdatesText', 'spUpdatesHint', 'presenceBar', 'presenceText']) {
        const classes = new Set(['hidden']);
        nodes[id] = { textContent: '', classList: { remove: x => classes.delete(x), toggle: (x, on) => on ? classes.add(x) : classes.delete(x), contains: x => classes.has(x) } };
    }
    const on = (name, fn) => (events[name] ??= []).push(fn);
    const context = vm.createContext({ URL, AbortController, DOMException, FormData, navigator: { sendBeacon: () => serials.beacon++ },
        IS_FIRST_PAGE: true, HAS_FILTER: false, ORACLE_MODE_SP: false, lastIdSp: 10,
        POLL_URL_SP: '/sp/poll', PRESENCE_URL: '/sp/presence', PRESENCE_START: '/sp/presence/start', PRESENCE_STOP: '/sp/presence/stop',
        modalOpen: false, spInlineVendorOperation: null, secureDeleteSearchSnapshot: null, filters: '', saving: false, dialog: false,
        getFilterParams: () => context.filters,
        window: { location: { origin: 'https://sp.test', reload: () => serials.reload++ }, addEventListener: on, Swal: { isVisible: () => context.dialog } },
        document: { hidden: false, addEventListener: on, getElementById: id => nodes[id], querySelector: selector => selector.startsWith('meta') ? { content: 'csrf' } : context.saving ? {} : null },
        setTimeout: (fn, delay) => { timers.set(++serials.timer, { fn, delay }); return serials.timer; }, clearTimeout: id => timers.delete(id),
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })), ...extra });
    vm.runInContext(block('LOOKUP READS') + '\n' + block('BACKGROUND'), context);
    return { context, nodes, requests, timers, serials,
        emit: (name, event = {}) => (events[name] || []).forEach(fn => fn(event)),
        fire: delay => { for (const [id, timer] of [...timers]) if (timer.delay === delay) { timers.delete(id); timer.fn(); } },
        respond: (i, data, status = 200, extra = {}) => requests[i].resolve({ ok: status < 400, status, redirected: false, headers: { get: () => 'application/json' }, json: async () => data, ...extra }),
        count: delay => [...timers.values()].filter(t => t.delay === delay).length };
}
test('background starts late, uses summary IDs and schedules only after completion', async () => {
    const h = runtime(); h.context.initializeSpBackground();
    assert.equal(h.requests.length, 0); assert.equal(h.count(45000), 1); assert.equal(h.count(12000), 1);
    h.fire(45000); h.fire(45000); await h.context.pollNow();
    assert.equal(h.requests.length, 1); assert.equal(h.count(45000), 0);
    const url = new URL(h.requests[0].url); assert.equal(url.searchParams.get('summary'), '1'); assert.equal(url.searchParams.get('last_id'), '10');
    h.respond(0, { rows: [] }); await tick(); assert.equal(h.count(45000), 1);
});
test('hidden, filtered or later pages never fetch SP data; Oracle remains separate', async () => {
    for (const extra of [{ HAS_FILTER: true }, { IS_FIRST_PAGE: false }]) { const h = runtime(extra); await h.context.pollNow(); assert.equal(h.requests.length, 0); }
    const h = runtime({ ORACLE_MODE_SP: true }); h.context.document.hidden = true; await h.context.pollNow(); await h.context.pollPresence(); assert.equal(h.requests.length, 0);
    h.context.document.hidden = false; const task = h.context.pollNow(); assert.equal(new URL(h.requests[0].url).searchParams.get('mode'), 'oracle'); h.respond(0, { rows: [] }); await task;
});
test('stalled fetch and JSON body reach a deadline, release ownership and back off', async () => {
    for (const stalledBody of [false, true]) {
        const h = runtime(); const task = h.context.pollNow();
        if (stalledBody) { h.respond(0, null, 200, { json: () => new Promise(() => {}) }); await tick(); }
        h.fire(20000); await task;
        assert.equal(h.requests[0].options.signal.aborted, true); assert.equal(h.count(90000), 1);
        h.fire(90000); h.respond(1, { rows: [] }); await tick(); assert.equal(h.count(45000), 1);
    }
});
test('hidden cancellation and late completions cannot overwrite a resumed request', async () => {
    const h = runtime(); h.context.initializeSpBackground(); h.fire(45000);
    h.context.document.hidden = true; h.emit('visibilitychange'); assert.equal(h.requests[0].options.signal.aborted, true); assert.equal(h.timers.size, 0);
    h.context.document.hidden = false; h.emit('visibilitychange'); h.fire(45000);
    h.respond(0, { rows: [{ id: 99 }] }); await tick(); assert.equal(h.nodes.spUpdatesText.textContent, ''); assert.equal(h.count(45000), 0);
    h.respond(1, { rows: [{ id: 11 }] }); await tick(); assert.match(h.nodes.spUpdatesText.textContent, /^1 SP/); assert.equal(h.count(45000), 1);
});
test('HTTP authorization loss stops both background readers until reload', async () => {
    for (const status of [401, 403, 419]) {
        const h = runtime(); h.context.initializeSpBackground(); h.fire(45000); h.respond(0, {}, status); await tick();
        await h.context.pollNow(); await h.context.pollPresence(); h.emit('visibilitychange');
        assert.equal(h.requests.length, 1); assert.equal(h.timers.size, 0);
    }
    const h = runtime(); const task = h.context.pollPresence(); h.respond(0, {}, 200, { redirected: true }); await task; await h.context.pollNow(); assert.equal(h.requests.length, 1);
});
test('network, rate limit, HTML and malformed payloads back off without busy loops', async () => {
    for (const [data, status, extra] of [[{}, 429, {}], [{ rows: [{ id: '<img>' }] }, 200, {}], [{ rows: Array(51).fill({ id: 11 }) }, 200, {}], [{}, 200, { headers: { get: () => 'text/html' } }]]) {
        const h = runtime(); const task = h.context.pollNow(); h.respond(0, data, status, extra); await task; assert.equal(h.count(90000), 1); assert.equal(h.nodes.spUpdatesText.textContent, '');
    }
    const h = runtime(); h.context.fetch = async () => { throw new TypeError('offline'); };
    for (const delay of [90000, 180000, 300000, 300000]) { await h.context.pollNow(); assert.equal(h.count(delay), 1); }
});
test('SP updates only change a bounded notice, deduplicate IDs and never open a dialog', async () => {
    const h = runtime(); h.context.dialog = true; let task = h.context.pollNow();
    h.respond(0, { rows: [{ id: 11, nomor_sp: '<img onerror=bad()>' }, { id: 11 }, { id: 9 }] }); await task;
    assert.match(h.nodes.spUpdatesText.textContent, /^1 SP/); assert.equal(h.context.lastIdSp, 11); assert.equal(h.context.dialog, true); assert.equal(h.nodes.spUpdates.classList.contains('hidden'), false);
    task = h.context.pollNow(); h.respond(1, { rows: [{ id: 11 }, { id: 12 }] }); await task; assert.match(h.nodes.spUpdatesText.textContent, /^2 SP/);
});
test('refresh preserves active dialogs, SP/vendor drafts and staged filters', () => {
    const h = runtime(); h.context.initializeSpBackground();
    for (const flag of ['modalOpen', 'spInlineVendorOperation', 'saving', 'dialog']) {
        h.context[flag] = true; h.context.refreshSpList(); assert.equal(h.serials.reload, 0); h.context[flag] = false;
    }
    h.context.secureDeleteSearchSnapshot = ''; h.context.refreshSpList(); assert.equal(h.serials.reload, 0); h.context.secureDeleteSearchSnapshot = null;
    h.context.filters = 'search=draft'; h.context.refreshSpList(); assert.equal(h.serials.reload, 0); assert.match(h.nodes.spUpdatesHint.textContent, /Terapkan Filter/);
    h.context.filters = ''; h.context.refreshSpList(); assert.equal(h.serials.reload, 1);
});
test('presence uses the same bounded read, treats names as text and cannot overlap', async () => {
    const h = runtime(); const task = h.context.pollPresence(); await h.context.pollPresence(); assert.equal(h.requests.length, 1);
    h.respond(0, { users: [{ name: '<img src=x onerror=bad()>' }] }); await task; assert.match(h.nodes.presenceText.textContent, /<img/); assert.equal(h.count(60000), 1);
    const stalled = h.context.pollPresence(); h.fire(20000); await stalled; assert.equal(h.count(120000), 1);
});
test('pagehide/BFCache restore has exactly one timer per reader and cancels old work', async () => {
    const h = runtime(); h.context.initializeSpBackground(); h.fire(12000); h.emit('pagehide'); assert.equal(h.requests[0].options.signal.aborted, true); assert.equal(h.timers.size, 0);
    h.emit('pageshow', { persisted: true }); h.emit('pageshow', { persisted: true }); assert.equal(h.count(45000), 1); assert.equal(h.count(60000), 1);
    h.respond(0, { users: [{ name: 'stale' }] }); await tick(); assert.equal(h.nodes.presenceText.textContent, ''); assert.equal(h.count(60000), 1);
});
test('heartbeats serialize the latest start/stop, expire stalled writes and stop on logout', async () => {
    const h = runtime(); h.context.modalOpen = true; h.context.startHeartbeat(); h.context.startHeartbeat(); h.context.stopHeartbeat(); assert.equal(h.requests.length, 1);
    h.respond(0, {}); await tick(); assert.equal(h.requests.length, 2); assert.equal(h.requests[1].url, '/sp/presence/stop'); assert.equal(h.requests[1].options.headers['X-CSRF-TOKEN'], 'csrf');
    h.respond(1, {}); await tick(); assert.equal(h.count(15000), 0);
    h.context.startHeartbeat(); h.fire(10000); await tick(); assert.equal(h.requests[2].options.signal.aborted, true); assert.equal(h.count(15000), 1);
    h.fire(15000); h.respond(3, {}, 419); await tick(); assert.equal(h.timers.size, 0); h.context.startHeartbeat(); assert.equal(h.requests.length, 4);
});
