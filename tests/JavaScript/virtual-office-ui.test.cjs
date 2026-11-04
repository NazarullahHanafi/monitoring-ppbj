const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const load = import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-state.js')));
const tick = () => new Promise(setImmediate);
async function fixture({ canChat = true } = {}) {
    const state = await load, timers = new Map(), requests = [], calls = [], events = {}, documentEvents = {}, nodes = new Map(); let timerId = 0;
    class Element {
        constructor(id = '') { this.id = id; this.dataset = {}; this.attrs = {}; this.children = []; this.events = {}; this.hidden = false; this.value = ''; this.textContent = ''; this.scrollTop = 0; this.style = { setProperty() {} }; this.classList = { add() {}, remove() {}, toggle() {} }; }
        addEventListener(name, fn) { (this.events[name] ??= []).push(fn); }
        setAttribute(key, value) { this.attrs[key] = value; }
        append(...children) { this.children.push(...children); children.forEach(child => { child.parent = this; }); }
        replaceChildren(...children) { this.children = []; this.append(...children); }
        contains(node) { return node === this || this.children.some(child => child.contains?.(node)); }
        querySelector(selector) { const id = /data-person-id="(\d+)"/.exec(selector)?.[1]; return this.children.find(child => String(child.dataset.personId) === id) || null; }
        focus() { document.activeElement = this; }
        click() { (this.events.click || []).forEach(fn => fn({})); }
        set innerHTML(value) { throw new Error('Unsafe HTML sink: ' + value); }
    }
    const get = id => { if (!nodes.has(id)) nodes.set(id, new Element(id)); return nodes.get(id); };
    const filters = ['all', 'umum', 'operasional'].map(value => Object.assign(new Element(), { dataset: { voFilter: value } }));
    const rooms = ['all', 'umum', 'operasional', 'lounge'].map(value => Object.assign(new Element(), { dataset: { voRoom: value } }));
    get('virtualOffice').querySelectorAll = selector => selector.includes('filter') ? filters : rooms;
    const people = [{ id: 1, name: '<svg onload=alert(1)>', department: 'umum', state: 'idle', mood: '☕', is_me: false },
        { id: 2, name: 'My account', department: 'operasional', state: 'online', mood: '', is_me: true }];
    get('voConfig').textContent = JSON.stringify({ canChat, feedUrl: '/virtual-office/presence', initial: { people, updated_at: '2026-11-04T10:00:00Z' } });
    const document = { hidden: false, activeElement: null, fullscreenElement: null, getElementById: get,
        createElement: () => new Element(), createTextNode: text => Object.assign(new Element(), { textContent: text }),
        addEventListener: (name, fn) => (documentEvents[name] ??= []).push(fn) };
    const sceneState = { disposed: 0, visible: [], people: [] };
    let resolveScene;
    const scenePromise = new Promise(resolve => { resolveScene = resolve; });
    const window = { location: { origin: 'https://simon.example.test' }, matchMedia: () => ({ matches: false, addEventListener() {} }),
        addEventListener: (name, fn) => (events[name] ??= []).push(fn), SimonOfficeMention: person => { calls.push(person); return true; },
        __loadOfficeScene: () => scenePromise };
    const sandbox = { ...state, window, document, localStorage: { getItem: () => 'list', setItem() {} }, URL, Date, AbortController,
        setTimeout: (fn, delay) => { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout: id => timers.delete(id),
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })), console };
    let code = fs.readFileSync(path.resolve(__dirname, '../../resources/js/virtual-office.js'), 'utf8');
    code = code.replace(/^import .*?;\s*/, '').replace("await import('./virtual-office-scene.js')", 'await window.__loadOfficeScene()');
    vm.runInNewContext(code, sandbox);
    return { get, people, calls, filters, rooms, requests, sceneState, timers,
        search(value) { get('voSearch').value = value; get('voSearch').events.input[0](); },
        hide(hidden) { document.hidden = hidden; (documentEvents.visibilitychange || []).forEach(fn => fn()); },
        resolveScene() { resolveScene({ createOfficeScene: () => ({ setPeople: values => sceneState.people.push(values), setPaused() {}, setVisible: value => sceneState.visible.push(value), dispose: () => sceneState.disposed++, focusRoom() {}, select() {}, resize() {} }) }); } };
}
test('office displays hostile names as inert text, filters locally and never sends a chat automatically', async () => {
    const f = await fixture(); assert.equal(f.requests.length, 0); assert.equal(f.get('voPeople').children.length, 2);
    f.search('<svg'); assert.equal(f.get('voPeople').children.length, 1);
    const person = f.get('voPeople').children[0]; assert.equal(person.children[1].children[0].textContent, f.people[0].name);
    person.click(); assert.equal(f.get('voDetailName').textContent, f.people[0].name); assert.equal(f.calls.length, 0);
    f.get('voChat').click(); assert.equal(f.calls.length, 1); assert.equal(f.requests.length, 0, 'Mention prepares an existing chat draft; it never sends.');
    f.filters[2].click(); assert.equal(f.requests.length, 0); f.hide(true);
});
test('read-only office cannot invoke chat even if its button handler is called', async () => {
    const f = await fixture({ canChat: false }); f.get('voPeople').children.find(p => p.dataset.personId === 1).click();
    assert.equal(f.get('voChat').disabled, true); f.get('voChat').click(); assert.equal(f.calls.length, 0); f.hide(true);
});
test('switching to lightweight view during loading cannot resurrect a late 3D scene', async () => {
    const f = await fixture(); f.get('voView3d').click(); f.get('voViewList').click(); f.resolveScene(); await tick();
    assert.equal(f.sceneState.people.length, 0); assert.equal(f.get('voLoading').hidden, true); assert.equal(f.get('voLightView').hidden, false); f.hide(true);
});
test('loaded scene is paused on hiding and disposed when selecting lightweight view', async () => {
    const f = await fixture(); f.get('voView3d').click(); f.resolveScene(); await tick();
    assert.equal(f.sceneState.people.length, 1); f.hide(true); assert.equal(f.sceneState.visible.at(-1), false);
    f.get('voViewList').click(); assert.equal(f.sceneState.disposed, 1); assert.equal(f.get('voLoading').hidden, true);
});
