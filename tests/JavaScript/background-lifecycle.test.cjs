const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, '../../public/assets/', file), 'utf8').replace(/\r\n/g, '\n');
const shell = read('app/app-shell.js');
const guard = shell.slice(shell.indexOf('/* BEGIN SHELL BACKGROUND READS */'), shell.indexOf('/* END SHELL BACKGROUND READS */'));
const presence = shell.slice(shell.indexOf('        var cPP;'), shell.indexOf('        (function () {\n            var URL_MSGS'));
const torpr = read('torpr/torpr.js');
const receipts = torpr.slice(torpr.indexOf('            let receiptRequest = null;'), torpr.lastIndexOf('        })();'));
const chatbot = read('app/chatbot.js');
const badge = chatbot.slice(chatbot.indexOf('if (isAuthenticated) {'), chatbot.indexOf('    const starterResponses'));
const tick = () => new Promise(setImmediate);

function runtime(code, { hidden = false, heavy = false, rows = [] } = {}) {
    const timeouts = new Map(), intervals = new Map(), events = {}, documentEvents = {}, requests = [];
    const badgeNode = { style: {}, textContent: '' };
    let id = 0;
    const sandbox = {
        window: { APP_SHELL_CONFIG: { moodEnabled: false }, TORPR_PAGE_CONFIG: { isHeavy: heavy }, addEventListener: (name, fn) => (events[name] ??= []).push(fn) },
        document: { hidden, querySelector: () => null, querySelectorAll: () => rows,
            getElementById: name => name === 'chatbot-notif-badge' ? badgeNode : null,
            addEventListener: (name, fn) => (documentEvents[name] ??= []).push(fn) },
        setTimeout: (fn, delay) => { const key = ++id; timeouts.set(key, { fn, delay }); return key; }, clearTimeout: key => timeouts.delete(key),
        setInterval: (fn, delay) => { const key = ++id; intervals.set(key, { fn, delay }); return key; }, clearInterval: key => intervals.delete(key),
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })),
        isAuthenticated: true, AbortController, Map, Set, Array, Number, String, Error, console: { error() {} }
    };
    vm.runInNewContext(guard + '\n' + code, sandbox);
    const emit = (handlers, name, event) => (handlers[name] || []).forEach(fn => fn(event));
    return { requests, intervals, timeouts, badgeNode,
        timeout(delay) { const entry = [...timeouts].find(([, v]) => v.delay === delay); assert.ok(entry, `Timer ${delay}ms exists`); timeouts.delete(entry[0]); entry[1].fn(); },
        poll() { [...intervals.values()].forEach(timer => timer.fn()); },
        hide(value) { sandbox.document.hidden = value; emit(documentEvents, 'visibilitychange'); },
        pagehide() { emit(events, 'pagehide'); }, pageshow() { emit(events, 'pageshow', { persisted: true }); },
        respond(index, data, ok = true) { requests[index].resolve({ ok, status: ok ? 200 : 500, json: async () => data }); }
    };
}

test('presence waits for page startup, cannot overlap, times out and resumes after BFCache', async () => {
    const h = runtime(presence); assert.equal(h.requests.length, 0); h.timeout(6500); h.poll(); h.poll(); assert.equal(h.requests.length, 1);
    h.timeout(20000); assert.equal(h.requests[0].options.signal.aborted, true); h.poll(); assert.equal(h.requests.length, 2);
    h.respond(0, { online: [] }); await tick(); h.poll(); assert.equal(h.requests.length, 2, 'Late finalizer cannot unlock replacement');
    h.pagehide(); assert.equal(h.requests[1].options.signal.aborted, true); assert.equal(h.intervals.size, 0);
    h.pageshow(); h.timeout(6500); assert.equal(h.requests.length, 3);
    h.respond(2, {}, false); await tick(); h.poll(); assert.equal(h.requests.length, 4);
    h.hide(true); assert.equal(h.requests[3].options.signal.aborted, true); h.poll(); assert.equal(h.intervals.size, 0);
    const hidden = runtime(presence, { hidden: true }); assert.equal(hidden.timeouts.size, 0); assert.equal(hidden.requests.length, 0);
});

test('TOR receipt refresh has no initial request, is bounded and releases failures', async () => {
    const h = runtime(receipts, { rows: Array.from({ length: 150 }, (_, i) => ({ dataset: { rowId: String(i + 1) }, querySelector: () => null })) });
    assert.equal(h.requests.length, 0); h.poll(); h.poll(); assert.equal(h.requests.length, 1);
    assert.equal(new URL(h.requests[0].url, 'https://example.test').searchParams.get('ids').split(',').length, 100);
    h.respond(0, { '1': { status: 'APPROVED' } }); await tick(); h.poll(); assert.equal(h.requests.length, 2);
    h.respond(1, {}, false); await tick(); h.poll(); assert.equal(h.requests.length, 3);
    h.pagehide(); assert.equal(h.requests[2].options.signal.aborted, true); assert.equal(h.intervals.size, 0);
    h.pageshow(); h.pageshow(); assert.equal(h.intervals.size, 1); h.poll(); assert.equal(h.requests.length, 4);
});

test('TOR timeout ignores stale completion and hidden or heavy pages never poll', async () => {
    const rows = [{ dataset: { rowId: '1' }, querySelector: () => null }];
    const h = runtime(receipts, { rows }); h.poll(); h.timeout(20000); h.poll(); assert.equal(h.requests.length, 2);
    h.respond(0, {}); await tick(); h.poll(); assert.equal(h.requests.length, 2);
    h.hide(true); h.poll(); assert.equal(h.requests[1].options.signal.aborted, true); assert.equal(h.intervals.size, 0);
    const heavy = runtime(receipts, { heavy: true, rows }); assert.equal(heavy.intervals.size, 0);
    const hidden = runtime(receipts, { hidden: true, rows }); assert.equal(hidden.requests.length, 0); assert.equal(hidden.intervals.size, 0);
});

test('chatbot badge times out, cancels hidden work and rejects stale results', async () => {
    const h = runtime(badge); h.poll(); assert.equal(h.requests.length, 1); h.timeout(20000); h.poll(); assert.equal(h.requests.length, 2);
    h.respond(0, { count: 999 }); await tick(); assert.equal(h.badgeNode.textContent, ''); h.poll(); assert.equal(h.requests.length, 2);
    h.respond(1, { count: 4 }); await tick(); assert.equal(h.badgeNode.textContent, 4);
    h.poll(); h.hide(true); assert.equal(h.requests[2].options.signal.aborted, true); assert.equal(h.intervals.size, 0);
    h.hide(false); assert.equal(h.requests.length, 4); h.pagehide(); h.pageshow(); h.pageshow(); assert.equal(h.intervals.size, 1);
    const hidden = runtime(badge, { hidden: true }); assert.equal(hidden.requests.length, 0);
});
