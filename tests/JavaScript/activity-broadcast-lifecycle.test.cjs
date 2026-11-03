const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../../public/assets/app/activity-broadcast.js'), 'utf8');
const tick = () => new Promise(setImmediate);
const items = [{ title: 'PR dibuat', number: 'PR/1', url: '/torpr' }, { title: 'SP dibuat', number: 'PR/2', url: '/sp' }];

function fixture({ hidden = false, cached = false, reduced = false } = {}) {
    const timers = new Map(), frames = new Map(), requests = [], events = {}, windowEvents = {};
    let nextId = 0;
    function element() {
        const handlers = {}, classes = new Set();
        return { hidden: true, dataset: {}, children: [], clientWidth: 500, scrollWidth: 300,
            style: { setProperty() {} }, classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
            addEventListener: (name, fn) => (handlers[name] ??= []).push(fn),
            emit: (name, event = {}) => (handlers[name] || []).forEach(fn => fn(event)),
            appendChild(child) { this.children.push(child); }, replaceChildren() { this.children = []; }, setAttribute() {} };
    }
    const nodes = Object.fromEntries(['track', 'text', 'viewport', 'counter', 'panel', 'list', 'open', 'panel-close', 'prev', 'next', 'close'].map(key => [key, element()]));
    const root = element();
    root.dataset = { feedUrl: '/activity-broadcast/feed', cacheKey: 'user-test' };
    root.querySelector = selector => nodes[selector.slice('[data-broadcast-'.length, -1)];
    root.contains = node => node === root;
    const document = { hidden, getElementById: () => root, createElement: element, createTextNode: text => ({ textContent: text }),
        addEventListener: (name, fn) => (events[name] ??= []).push(fn) };
    const window = { setTimeout: (fn, delay) => { const id = ++nextId; timers.set(id, { fn, delay }); return id; },
        clearTimeout: id => timers.delete(id), requestAnimationFrame: fn => { const id = ++nextId; frames.set(id, fn); return id; },
        cancelAnimationFrame: id => frames.delete(id), matchMedia: () => ({ matches: reduced }),
        addEventListener: (name, fn) => (windowEvents[name] ??= []).push(fn),
        sessionStorage: { getItem: () => cached ? JSON.stringify({ savedAt: Date.now(), items }) : null, setItem() {} } };
    const sandbox = { window, document, AbortController, Error, Date, Number, String,
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })) };
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox);
    const emit = (handlers, name, event = {}) => (handlers[name] || []).forEach(fn => fn(event));
    return { root, nodes, timers, frames, requests, events, windowEvents,
        rerun: () => vm.runInContext(source, sandbox),
        hide(value) { document.hidden = value; emit(events, 'visibilitychange'); },
        pagehide: () => emit(windowEvents, 'pagehide'), pageshow: () => emit(windowEvents, 'pageshow', { persisted: true }),
        timer(delay) { const found = [...timers].find(([, timer]) => timer.delay === delay); assert.ok(found, `Timer ${delay} exists`); timers.delete(found[0]); found[1].fn(); },
        frame() { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); },
        respond(index, data = { items }) { requests[index].resolve({ ok: true, json: async () => data }); } };
}

test('broadcast defers hidden pages, initializes once and sends only one visible feed request', async () => {
    const h = fixture({ hidden: true });
    assert.equal(h.timers.size, 0);
    h.rerun(); h.hide(false); h.hide(false);
    assert.equal(h.timers.size, 1);
    h.timer(5000); assert.equal(h.requests.length, 1);
    assert.equal(h.requests[0].options.headers['X-Requested-With'], 'XMLHttpRequest');
    h.respond(0); await tick();
    assert.equal(h.root.hidden, false); assert.equal(h.nodes.list.children.length, 2);
});

test('broadcast cancels hidden reads and ignores responses superseded after returning to the page', async () => {
    const h = fixture(); h.timer(5000); h.hide(true);
    assert.equal(h.requests[0].options.signal.aborted, true);
    h.hide(false); h.timer(5000);
    h.respond(0); await tick(); assert.equal(h.root.hidden, true);
    h.respond(1); await tick(); assert.equal(h.root.hidden, false);
    assert.equal(h.nodes.list.children.length, 2);
});

test('hung feed times out and BFCache recovery can retry without reopening a dismissed broadcast', async () => {
    const h = fixture(); h.timer(5000); h.timer(15000);
    assert.equal(h.requests[0].options.signal.aborted, true);
    h.respond(0); await tick(); assert.equal(h.root.hidden, true);
    h.pagehide(); h.pageshow(); h.pageshow(); h.timer(5000);
    assert.equal(h.requests.length, 2);
    h.respond(1); await tick();
    h.nodes.close.emit('click'); h.pagehide(); h.pageshow(); h.hide(false);
    assert.equal(h.root.hidden, true); assert.equal(h.timers.size, 0); assert.equal(h.frames.size, 0);
});

test('rapid next/previous actions keep one animation frame chain and one fallback timer', () => {
    const h = fixture({ cached: true });
    h.nodes.next.emit('click'); h.nodes.prev.emit('click'); h.nodes.next.emit('click');
    assert.equal(h.frames.size, 1);
    h.frame(); assert.equal(h.frames.size, 1); h.frame();
    assert.equal(h.timers.size, 1);
    h.hide(true); assert.equal(h.frames.size, 0); assert.equal(h.timers.size, 0);
    h.hide(false); h.frame(); h.frame(); assert.equal(h.timers.size, 1);
    assert.equal(h.requests.length, 0);
});

test('reduced motion rotates information without adding animation or feed polling', () => {
    const h = fixture({ cached: true, reduced: true }); h.frame();
    assert.equal(h.frames.size, 0); h.timer(8000); h.frame();
    assert.equal(h.timers.size, 1); assert.equal(h.requests.length, 0);
    h.pagehide(); assert.equal(h.timers.size, 0);
});

test('a late cancelled frame cannot overwrite the replacement animation handle', () => {
    const h = fixture({ cached: true });
    const staleFrame = [...h.frames.values()][0];
    h.nodes.next.emit('click');
    staleFrame();
    h.pagehide();
    assert.equal(h.frames.size, 0);
    h.pageshow(); assert.equal(h.frames.size, 1);
    h.frame(); h.frame(); assert.equal(h.timers.size, 1);
});
