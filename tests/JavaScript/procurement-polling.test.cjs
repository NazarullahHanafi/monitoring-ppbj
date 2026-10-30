const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

for (const module of ['sp', 'spph']) {
    const source = fs.readFileSync(path.join(__dirname, `../../public/assets/${module}/${module}.js`), 'utf8');
    // Run the actual polling functions, independently of unrelated form/UI setup.
    function functionSource(name, singleLine = false) {
        const start = source.indexOf(`async function ${name}(`);
        assert.ok(start >= 0);
        const end = singleLine ? source.indexOf('\n', start) : source.indexOf('\n        }', start) + 10;
        return source.slice(start, end);
    }
    function setup() {
        let calls = 0;
        let finish;
        const deferred = new Promise(resolve => { finish = resolve; });
        const context = vm.createContext({
            IS_FIRST: true, IS_FIRST_PAGE: true, HAS_FILTER: false,
            pollInFlight: false, presenceInFlight: false,
            lastId: 1, lastIdSp: 1, POLL_URL: '/spph/poll', POLL_URL_SP: '/sp/poll', PRESENCE_URL: '/presence',
            document: { hidden: false, getElementById: () => ({ classList: { add() {}, remove() {} } }) },
            fetch: () => { calls++; return deferred; },
        });
        vm.runInContext(functionSource('pollNow'), context);
        vm.runInContext(functionSource(module === 'sp' ? 'pollPresence' : 'pollPres', true), context);
        return { context, calls: () => calls, finish };
    }
    test(`${module}: hidden or filtered page sends no data poll`, async () => {
        const h = setup();
        h.context.document.hidden = true;
        await h.context.pollNow();
        h.context.document.hidden = false;
        h.context.HAS_FILTER = true;
        await h.context.pollNow();
        h.context.HAS_FILTER = false;
        h.context.IS_FIRST = h.context.IS_FIRST_PAGE = false;
        await h.context.pollNow();
        assert.equal(h.calls(), 0);
    });
    test(`${module}: slow data requests cannot overlap and release guard on completion`, async () => {
        const h = setup();
        const first = h.context.pollNow();
        await h.context.pollNow();
        assert.equal(h.calls(), 1);
        h.finish({ ok: true, json: async () => ({ rows: [] }) });
        await first;
        assert.equal(h.context.pollInFlight, false);
        await h.context.pollNow();
        assert.equal(h.calls(), 2);
    });
    test(`${module}: HTTP failure releases data guard`, async () => {
        const h = setup();
        const first = h.context.pollNow();
        h.finish({ ok: false });
        await first;
        assert.equal(h.context.pollInFlight, false);
    });
    test(`${module}: presence pauses while hidden and cannot overlap`, async () => {
        const h = setup();
        const presence = module === 'sp' ? h.context.pollPresence : h.context.pollPres;
        h.context.document.hidden = true;
        await presence();
        assert.equal(h.calls(), 0);
        h.context.document.hidden = false;
        const first = presence();
        await presence();
        assert.equal(h.calls(), 1);
        h.finish({ ok: true, json: async () => ({ users: [] }) });
        await first;
        assert.equal(h.context.presenceInFlight, false);
    });
    test(`${module}: presence guard releases after network failure`, async () => {
        const h = setup();
        h.context.fetch = async () => { throw new Error('offline'); };
        await (module === 'sp' ? h.context.pollPresence() : h.context.pollPres());
        assert.equal(h.context.presenceInFlight, false);
    });
}
