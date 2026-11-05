const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function fixture({ canMeet = true } = {}) {
    const pure = await import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-world-state.js')));
    const nodes = new Map(), requests = [], meetings = [], worlds = [], timers = new Map(); let options, timerId = 0, stopped = 0;
    class Node {
        constructor() { this.children = []; this.textContent = ''; this.value = ''; this.events = {}; this.scrollTop = 0; this.scrollHeight = 10; this.clientHeight = 100; }
        addEventListener(name, fn) { this.events[name] = fn; }
        append(...children) { this.children.push(...children); }
        replaceChildren() { this.children = []; }
        set innerHTML(value) { throw new Error('Unsafe HTML: '+value); }
        emit(name, event = {}) { return this.events[name]?.({ preventDefault() {}, ...event }); }
    }
    const get = id => { if (!nodes.has(id)) nodes.set(id, new Node()); return nodes.get(id); };
    const doc = { getElementById: get, createElement: () => new Node(), querySelector: () => ({ content: 'csrf-live' }) };
    const sandbox = { ...pure, Date, AbortController, encodeURIComponent, JSON,
        createOfficeReadLoop: value => { options = value; return { start() {}, stop() { stopped++; }, refresh() {} }; },
        setTimeout: fn => { timers.set(++timerId, fn); return timerId; }, clearTimeout: id => timers.delete(id),
        fetch: async (url, init) => { requests.push({ url, init }); return { ok: true, json: async () => ({ message: { id: 10 } }) }; } };
    let code = fs.readFileSync(path.resolve(__dirname, '../../resources/js/virtual-office-live.js'), 'utf8').replace(/^import .*?;\s*/gm, '').replace('export function', 'function');
    const mount = vm.runInNewContext(code+'\nmountOfficeLive;', sandbox);
    const api = mount({ document: doc, config: { canMeet, myId: 1 }, visible: () => true, getScene: () => ({ meetingReady: () => true }),
        getPeople: () => [{ id: 2, name: 'Peer', state: 'online', can_talk: true }], onRoom: value => meetings.push(value), onWorld: value => worlds.push(value) });
    const room = { id: '1e94f633-7017-4fce-a2d9-f98a51a4fc81', from: 1, to: 2, to_name: '<svg onload=alert(1)>', from_name: 'Me', status: 'accepted' };
    return { get, api, room, requests, meetings, worlds, options, timers, stopped: () => stopped };
}

test('live meeting messages stay inert text and sending requires readiness and an explicit submit', async () => {
    const f = await fixture();
    f.options.onData({ room: f.room, ready: false, connected: true, messages: [{ id: 1, user_id: 2, message: '<img src=x onerror=alert(1)>' }] });
    assert.equal(f.requests.length, 0); assert.equal(f.get('voOfficeMessages').children[0].children[1].textContent, '<img src=x onerror=alert(1)>');
    f.get('voOfficeChatInput').value = 'Hello'; await f.get('voOfficeChatForm').emit('submit'); assert.equal(f.requests.length, 0);
    f.options.onData({ room: f.room, ready: true, connected: true, messages: [] }); await f.get('voOfficeChatForm').emit('submit');
    assert.equal(f.requests.length, 1); assert.equal(f.requests[0].url, '/virtual-office/meetings/send');
    const body = JSON.parse(f.requests[0].init.body); assert.equal(body.id, f.room.id); assert.equal(body.message, 'Hello');
    assert.equal(f.requests[0].init.headers['X-CSRF-TOKEN'], 'csrf-live'); assert.equal(f.get('voOfficeChatInput').value, '');
    assert.equal(f.timers.size, 0);
    f.options.onError(new Error('Offline')); assert.equal(f.get('voOfficeChatSend').disabled, true); assert.equal(f.meetings.at(-1).connected, false);
});

test('viewer cannot submit or invite and live reads acknowledge only their own current meeting', async () => {
    const f = await fixture({ canMeet: false }); f.options.onData({ room: f.room, ready: true, connected: true, messages: [] });
    f.get('voOfficeChatInput').value = 'Blocked'; await f.get('voOfficeChatForm').emit('submit'); await f.api.invite(2);
    assert.equal(f.requests.length, 0); await f.options.read(new AbortController().signal);
    assert.match(f.requests[0].url, /^\/virtual-office\/live\?ready=/);
    f.api.stop(); assert.equal(f.stopped(), 1);
});
