const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const load = import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-state.js')));
const tick = () => new Promise(setImmediate);
async function fixture({ canChat = true, meetingReady = false } = {}) {
    const state = await load, timers = new Map(), requests = [], calls = [], events = {}, documentEvents = {}, nodes = new Map(); let timerId = 0;
    class Element {
        constructor(id = '') { this.id = id; this.dataset = {}; this.attrs = {}; this.children = []; this.events = {}; this.hidden = false; this.value = ''; this.textContent = ''; this.scrollTop = 0; this.style = { setProperty() {} }; const classes = new Set(); this.classList = { add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x), toggle: x => classes.has(x) ? classes.delete(x) : classes.add(x) }; }
        addEventListener(name, fn) { (this.events[name] ??= []).push(fn); }
        setAttribute(key, value) { this.attrs[key] = value; }
        append(...children) { this.children.push(...children); children.forEach(child => { child.parent = this; }); }
        replaceChildren(...children) { this.children = []; this.append(...children); }
        contains(node) { return node === this || this.children.some(child => child.contains?.(node)); }
        querySelector(selector) { const id = /data-person-id="(\d+)"/.exec(selector)?.[1]; return this.children.find(child => String(child.dataset.personId) === id) || null; }
        querySelectorAll() { return this.children; }
        focus() { document.activeElement = this; }
        click() { (this.events.click || []).forEach(fn => fn({})); }
        set innerHTML(value) { throw new Error('Unsafe HTML sink: ' + value); }
    }
    const get = id => { if (!nodes.has(id)) nodes.set(id, new Element(id)); return nodes.get(id); };
    const filters = ['all', 'umum', 'operasional'].map(value => Object.assign(new Element(), { dataset: { voFilter: value } }));
    const rooms = ['all', 'umum', 'operasional', 'lounge', 'residences'].map(value => Object.assign(new Element(), { dataset: { voRoom: value } }));
    get('virtualOffice').querySelectorAll = selector => selector.includes('filter') ? filters : rooms;
    const people = [{ id: 1, name: '<svg onload=alert(1)>', department: 'umum', state: 'idle', mood: '☕', is_me: false },
        { id: 2, name: 'My account', department: 'operasional', state: 'online', mood: '', is_me: true }];
    const avatar = state.safeAvatar();
    get('voConfig').textContent = JSON.stringify({ canChat, canMeet: canChat, myId: 2, feedUrl: '/virtual-office/presence', profileUrl: '/virtual-office/avatar',
        myProfile: { avatar, share_activity: true, version: 0 }, avatarOptions: Object.fromEntries(Object.entries(avatar).map(([key, value]) => [key, [value]])), initial: { people, updated_at: '2026-11-04T10:00:00Z' } });
    const document = { hidden: false, activeElement: null, fullscreenElement: null, getElementById: get,
        createElement: () => new Element(), createTextNode: text => Object.assign(new Element(), { textContent: text }),
        querySelector: () => ({ content: 'test-csrf-token' }), addEventListener: (name, fn) => (documentEvents[name] ??= []).push(fn) };
    const sceneState = { disposed: 0, visible: [], people: [], rooms: [], homes: [], games: [] };
    let resolveScene;
    const scenePromise = new Promise(resolve => { resolveScene = resolve; });
    const window = { location: { origin: 'https://simon.example.test' }, matchMedia: () => ({ matches: false, addEventListener() {} }),
        addEventListener: (name, fn) => (events[name] ??= []).push(fn), SimonOfficeMention: person => { calls.push(person); return true; },
        __loadOfficeScene: () => scenePromise };
    const {mountOfficeViewport}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-viewport.js'))),{skillsFor}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-abilities.js')));
    const sandbox = { ...state,mountOfficeViewport,skillsFor,mountOfficeHologram:()=>({open(){sceneState.holograms=(sceneState.holograms||0)+1;},close:()=>false,escape:()=>false,sync(){}}), mountOfficePilot:()=>({start(){},stop(){},interact:()=>true}), mountOfficeClub: () => ({start(){},stop(){},select(){},syncScene(){},openGame(id){sceneState.games.push(id);},chat(id){if(canChat)calls.push(id);}}), mountOfficeLive: () => ({ start() {}, stop() {}, state: () => ({ ready: meetingReady, room: meetingReady ? { from: 2, to: 1 } : null }), invite() {} }), window, document, localStorage: { getItem: () => 'list', setItem() {} }, URL, Date, AbortController,
        setTimeout: (fn, delay) => { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout: id => timers.delete(id),
        fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })), console };
    let code = fs.readFileSync(path.resolve(__dirname, '../../resources/js/virtual-office.js'), 'utf8');
    code = code.replace(/^import .*?;\s*/gm, '').replace("await import('./virtual-office-scene.js')", 'await window.__loadOfficeScene()');
    vm.runInNewContext(code, sandbox);
    return { get, people, calls, filters, rooms, requests, sceneState, timers,
        search(value) { get('voSearch').value = value; get('voSearch').events.input[0](); },
        hide(hidden) { document.hidden = hidden; (documentEvents.visibilitychange || []).forEach(fn => fn()); },
        key(key){(documentEvents.keydown||[]).forEach(fn=>fn({key}));},
        resolveScene() { resolveScene({ createOfficeScene: () => ({ setPeople: values => sceneState.people.push(values), setPaused() {}, setVisible: value => sceneState.visible.push(value), dispose: () => sceneState.disposed++, focusRoom: value => sceneState.rooms.push(value), visitHome: id => sceneState.homes.push(id), select() {}, resize() {} }) }); } };
}
test('office displays hostile names as inert text, filters locally and never sends a chat automatically', async () => {
    const f = await fixture(); assert.equal(f.requests.length, 0); assert.equal(f.get('voPeople').children.length, 2);
    f.search('<svg'); assert.equal(f.get('voPeople').children.length, 1);
    const person = f.get('voPeople').children[0]; assert.equal(person.children[1].children[0].textContent, f.people[0].name);
    person.click(); assert.equal(f.get('voDetailName').textContent, f.people[0].name); assert.equal(f.calls.length, 1, 'Selecting an online avatar opens the in-world composer without sending.');
    f.get('voChat').click(); assert.equal(f.calls.length, 2); assert.equal(f.requests.length, 0);
    f.filters[2].click(); assert.equal(f.requests.length, 0); f.hide(true);
});

test('office shortcut opens the avatar composer directly without leaving fullscreen', async () => {
    const f = await fixture({ meetingReady: true }); f.get('voPeople').children.find(p => p.dataset.personId === 1).click();
    f.get('voChat').click(); assert.equal(f.calls.length, 2); assert.equal(f.calls[0], 1); assert.equal(f.requests.length, 0); f.hide(true);
});

test('selecting own avatar opens its work hologram instead of a conversation with itself',async()=>{
    const f=await fixture();f.get('voPeople').children.find(p=>p.dataset.personId===2).click();assert.equal(f.sceneState.holograms,1);assert.equal(f.calls.length,0);f.hide(true);
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

test('selecting a game from lightweight mode retains the requested focus after lazy scene loading', async () => {
    const f = await fixture(); assert.equal(f.get('voGames').children.length, 13);
    f.get('voGames').children[1].click(); f.resolveScene(); await tick();
    assert.deepEqual(f.sceneState.games,['badminton']);assert.notEqual(f.sceneState.rooms.at(-1),'badminton','Selecting a distant game must not pull the camera away from manual control.'); f.hide(true);
});

test('visiting a private home from lightweight mode retains its owner after lazy loading', async () => {
    const f = await fixture(); f.get('voPeople').children.find(p => p.dataset.personId === 1).click();
    f.get('voVisitHome').click(); f.resolveScene(); await tick();
    assert.equal(f.sceneState.rooms.at(-1), 'all'); assert.equal(f.sceneState.homes.at(-1), 1);
    assert.equal(f.requests.length, 0, 'Visiting a virtual home does not send a request or change real presence.');
    f.get('voCloseDetail').click(); assert.equal(f.get('voDetail').hidden, true); f.hide(true);
});

test('Escape dismisses house detail and a late lazy scene cannot reopen that home',async()=>{
    const f=await fixture();f.get('voAvatarEditor').hidden=true;f.get('voPeople').children.find(p=>p.dataset.personId===1).click();f.get('voVisitHome').click();f.key('Escape');assert.equal(f.get('voDetail').hidden,true);f.resolveScene();await tick();assert.equal(f.sceneState.homes.length,0);f.hide(true);
});

test('refreshing presence cannot reopen a house detail that was explicitly closed',async()=>{
    const f=await fixture();try{f.get('voPeople').children.find(p=>p.dataset.personId===1).click();f.get('voVisitHome').click();f.resolveScene();await tick();f.get('voCloseDetail').click();f.get('voRefresh').click();await tick();assert.equal(f.requests.length,1);
    f.requests[0].resolve({ok:true,json:async()=>({people:f.people,updated_at:new Date().toISOString()})});await tick();assert.equal(f.get('voDetail').hidden,true);assert.deepEqual(f.sceneState.homes,[1]);}finally{f.hide(true);}
});

test('changing selected person cancels the journal request and ignores its late result', async () => {
    const f = await fixture(); f.get('voPeople').children[0].click(); f.get('voLoadActivity').click();
    assert.equal(f.requests.length, 1); const request = f.requests[0];
    f.get('voPeople').children.find(node => node.dataset.personId === 1).click();
    assert.equal(request.options.signal.aborted, true);
    request.resolve({ ok: true, json: async () => ({ visits: [{ menu: 'Private stale result', at: new Date().toISOString() }] }) }); await tick();
    assert.equal(f.get('voActivityList').children.length, 0); f.hide(true);
});

test('own avatar editor sends only own preference data with csrf and handles stale-version conflicts', async () => {
    const f = await fixture(); f.get('voOpenAvatar').click();
    assert.equal(f.get('voAvatarFields').children.length, 8); assert.equal(f.get('voAvatarPreview').children.length, 16);
    const submit = f.get('voAvatarForm').events.submit[0]({ preventDefault() {} });
    assert.equal(f.requests.length, 1); const request = f.requests[0], body = JSON.parse(request.options.body);
    assert.equal(new URL(request.url).pathname, '/virtual-office/avatar'); assert.equal(body.user_id, undefined);
    assert.equal(body.version, 0); assert.equal(request.options.headers['X-CSRF-TOKEN'], 'test-csrf-token');
    request.resolve({ ok: false, status: 409 }); await submit;
    assert.match(f.get('voAvatarStatus').textContent, /tab lain/); assert.equal(f.get('voSaveAvatar').disabled, false); f.hide(true);
});
