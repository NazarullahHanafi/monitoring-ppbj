const test = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const load = import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-state.js')));
const tick = () => new Promise(setImmediate);
async function fixture() {
    const { createOfficeReadLoop } = await load;
    const timers = new Map(), reads = [], data = [], errors = []; let index = 0, hidden = false;
    const loop = createOfficeReadLoop({
        visible: () => !hidden,
        read: signal => new Promise(resolve => reads.push({ signal, resolve })),
        onData: value => data.push(value), onError: error => errors.push(error),
        setTimer: (fn, delay) => { const id = ++index; timers.set(id, { fn, delay }); return id; }, clearTimer: id => timers.delete(id),
    });
    return { loop, reads, data, errors, timers, hide(value) { hidden = value; },
        timer(delay) { const entry = [...timers].find(([, timer]) => timer.delay === delay); assert.ok(entry, `Timer ${delay} exists`); timers.delete(entry[0]); entry[1].fn(); } };
}
test('office uses distinct illustrative resting poses and validates bounded presence data', async () => {
    const { poseFor, safePeople, initials } = await load;
    assert.equal(poseFor({ id: 1, state: 'offline' }, new Date('2026-11-04T10:00:00Z')), 'sleeping');
    assert.equal(poseFor({ id: 1, state: 'offline' }, new Date('2026-11-04T00:00:00Z')), 'playing');
    assert.equal(poseFor({ id: 1, state: 'offline' }, new Date('2026-11-03T23:59:59Z')), 'sleeping');
    assert.equal(poseFor({ id: 1, state: 'offline' }, new Date('2026-11-04T09:59:59Z')), 'playing');
    assert.equal(poseFor({ id: 1, state: 'online' }), 'working');
    assert.deepEqual([0, 1, 2].map(id => poseFor({ id, state: 'idle' })), ['coffee', 'eating', 'sleeping']);
    assert.equal(initials('  Putri  Bunga  '), 'PB');
    const base = { id: 1, department: 'umum', name: '<img src=x onerror=alert(1)>', state: 'online', email: 'private@example.test', role: 'superadmin' };
    const valid = safePeople({ people: [base, base, { ...base, id: -1 }, { ...base, id: 2, department: 'other' }, { ...base, id: 3, state: 'invented' }] });
    assert.equal(valid.length, 1); assert.equal(valid[0].name, base.name, 'Names stay data, rendered with textContent.');
    assert.equal(valid[0].email, undefined); assert.equal(valid[0].role, undefined);
    assert.equal(safePeople({ people: Array.from({ length: 200 }, (_, i) => ({ ...base, id: i + 1 })) }).length, 120);
});
test('office first render schedules one read, slow reads never overlap and completion schedules the next read', async () => {
    const f = await fixture(); f.loop.start(); f.loop.start(); assert.equal(f.timers.size, 1); assert.equal(f.reads.length, 0);
    f.timer(45000); await tick(); assert.equal(f.reads.length, 1);
    f.loop.refresh(); f.loop.refresh(); await tick(); assert.equal(f.reads.length, 1);
    f.reads[0].resolve({ people: [] }); await tick(); assert.equal(f.data.length, 1); assert.equal(f.loop.busy(), false);
    f.timer(45000); await tick(); assert.equal(f.reads.length, 2); f.loop.stop();
});
test('timeout covers unfinished response body and releases the guard without stacking requests', async () => {
    const f = await fixture(); f.loop.start(true); await tick(); f.timer(12000); await tick();
    assert.equal(f.reads[0].signal.aborted, true); assert.equal(f.errors.length, 1); assert.equal(f.loop.busy(), false);
    f.timer(45000); await tick(); assert.equal(f.reads.length, 2);
    f.reads[0].resolve({ stale: true }); await tick(); assert.equal(f.data.length, 0); assert.equal(f.loop.busy(), true); f.loop.stop();
});
test('hidden page cancels reads and timers; explicit superseding refresh ignores previous response', async () => {
    const f = await fixture(); f.hide(true); f.loop.start(); assert.equal(f.timers.size, 0);
    f.hide(false); f.loop.start(true); await tick(); f.loop.refresh(true); await tick();
    assert.equal(f.reads[0].signal.aborted, true); assert.equal(f.reads.length, 2);
    f.reads[0].resolve({ stale: true }); await tick(); assert.equal(f.data.length, 0);
    f.hide(true); f.loop.stop(); assert.equal(f.reads[1].signal.aborted, true); assert.equal(f.timers.size, 0);
    f.reads[1].resolve({ hidden: true }); await tick(); assert.equal(f.data.length, 0);
    f.hide(false); f.loop.start(true); f.loop.start(true); await tick(); assert.equal(f.reads.length, 3); f.loop.stop();
});
test('permanent authorization errors stop automatic reads', async () => {
    const { createOfficeReadLoop } = await load; const timers = new Map(); let count = 0;
    const loop = createOfficeReadLoop({ read: async () => { count++; throw Object.assign(new Error('Sesi berakhir'), { status: 401 }); },
        onData() {}, onError() {}, setTimer: (fn, ms) => { timers.set(ms, fn); return ms; }, clearTimer: key => timers.delete(key) });
    loop.start(true); await tick(); assert.equal(count, 1); assert.equal(timers.size, 0); loop.stop();
});
