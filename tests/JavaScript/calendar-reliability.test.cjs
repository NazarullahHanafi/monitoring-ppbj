const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('public/assets/collaboration-calendar/calendar.js', 'utf8');
const helpers = source.slice(source.indexOf('    // Cache entries'), source.indexOf('    function openForm'));
const search = source.slice(source.indexOf('    async function searchPpbj'), source.indexOf('    function renderPrResults'));
const journey = source.slice(source.indexOf('    async function loadJourney'), source.indexOf('    function renderJourney'));
const ok = data => ({ok: true, status: 200, json: async () => data});
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

function harness(fetch) {
    const timers = new Map(), rendered = [], errors = [], searches = [], journeys = [];
    let sequence = 0, clock = 1000;
    const state = {cache: new Map(), journeyCache: new Map(), prSearchCache: new Map(), events: []};
    const els = {loading: {hidden: true}, audience: {value: 'all'}, source: {value: 'all'}, prPanel: {}, prResults: {replaceChildren() {}}, prState: {},
        prQuery: {value: 'plastik'}, prPortfolio: {value: ''}, prReceiver: {value: ''}, prDateFrom: {value: ''}, prDateTo: {value: ''},
        journey: {}, journeyLoading: {}, journeyContent: {replaceChildren() {}}, detailError: {}, detailCard: {classList: {add() {}}}};
    const journeyButton = {};
    const context = {state, els, root: {dataset: {eventsUrl: '/events', prSearchUrl: '/search'}}, fetch, AbortController, DOMException, URLSearchParams,
        Date: {now: () => clock}, window: {setTimeout: (fn, delay) => { timers.set(++sequence, {fn, delay}); return sequence; }, clearTimeout: id => timers.delete(id)},
        gridRange: () => ({start: 'start', end: 'end'}), dateKey: x => x, renderGrid: () => rendered.push(state.events), renderFocus() {}, renderStats() {},
        notify: error => errors.push(error), renderPrResults: data => searches.push(data), renderJourney: data => journeys.push(data),
        $: () => journeyButton, routeTemplate: (_, id) => '/journey/' + id, showError: (_, message) => errors.push(message)};
    vm.createContext(context); vm.runInContext(helpers + search + journey, context);
    return {api: context, state, els, timers, rendered, errors, searches, journeys, journeyButton, advance: ms => {clock += ms;}, timeout: () => {
        const [id, timer] = [...timers].find(([, item]) => item.delay === 30000); timers.delete(id); timer.fn();
    }};
}

test('an older month cannot replace a cached month or hide a newer loading indicator', async () => {
    const pending = [];
    const h = harness(() => new Promise(resolve => pending.push(resolve)));
    const a = h.api.loadEvents(); pending.shift()(ok({events: [{title: 'cached'}]})); await a;
    h.els.source.value = 'sla'; const b = h.api.loadEvents();
    h.els.source.value = 'contract'; const c = h.api.loadEvents(); await b;
    assert.equal(h.els.loading.hidden, false);
    h.els.source.value = 'all'; await h.api.loadEvents(); await c;
    assert.equal(h.els.loading.hidden, true);
    pending.forEach(resolve => resolve(ok({events: [{title: 'stale'}]}))); await flush();
    assert.equal(h.state.events[0].title, 'cached'); assert.equal(h.errors.length, 0);
});

test('request deadline includes a stalled response body and permits recovery', async () => {
    let stalled = true, calls = 0;
    const h = harness(async () => { calls++; return stalled ? {ok: true, json: () => new Promise(() => {})} : ok({events: []}); });
    const pending = h.api.loadEvents(); await flush(); h.timeout(); await pending;
    assert.equal(h.els.loading.hidden, true); assert.match(h.errors[0], /Koneksi lambat/);
    stalled = false; await h.api.loadEvents(); assert.equal(calls, 2); assert.equal(h.rendered.length, 1); assert.equal(h.timers.size, 0);
});

test('cache reuse avoids requests but expires after sixty seconds and remains bounded', async () => {
    let calls = 0;
    const h = harness(async () => {calls++; return ok({events: []});});
    await h.api.loadEvents(); await h.api.loadEvents(); assert.equal(calls, 1);
    h.advance(60001); await h.api.loadEvents(); assert.equal(calls, 2);
    for (let i = 0; i < 12; i++) { h.els.source.value = String(i); await h.api.loadEvents(); }
    assert.equal(h.state.cache.size, 8);
});

test('PR reset or cached selection cancels earlier results even when transport ignores abort', async () => {
    const pending = [];
    const h = harness(() => new Promise(resolve => pending.push(resolve)));
    const first = h.api.searchPpbj(); pending.shift()(ok({results: [{id: 1}]})); await first;
    h.els.prQuery.value = 'lama'; const older = h.api.searchPpbj();
    h.els.prQuery.value = 'plastik'; await h.api.searchPpbj(); await older;
    pending.shift()(ok({results: [{id: 2}]})); await flush();
    assert.equal(h.searches.at(-1).results[0].id, 1);
    h.els.prQuery.value = 'reset'; const reset = h.api.searchPpbj(); h.api.cancelRead('prSearchController'); await reset;
    pending.shift()(ok({results: [{id: 3}]})); await flush();
    assert.equal(h.searches.at(-1).results[0].id, 1);
});

test('authorization and HTML responses fail clearly without wiping rendered events or retrying', async () => {
    let response = {ok: false, status: 419, json: async () => {throw new Error('html');}}, calls = 0;
    const h = harness(async () => {calls++; return response;});
    h.state.events = [{title: 'previous'}]; await h.api.loadEvents();
    assert.match(h.errors[0], /Sesi formulir/); assert.equal(h.state.events[0].title, 'previous');
    response = {ok: true, status: 200, json: async () => null}; await h.api.loadEvents();
    assert.match(h.errors[1], /belum lengkap/); assert.equal(calls, 2); assert.equal(h.timers.size, 0);
});

test('successful writes invalidate all three browser caches', async () => {
    const h = harness(async () => ok({events: []}));
    h.api.remember(h.state.journeyCache, '1', {old: true}, 12);
    h.api.remember(h.state.prSearchCache, 'q', {old: true}, 20);
    await h.api.clearCacheAndReload();
    assert.equal(h.state.journeyCache.size, 0); assert.equal(h.state.prSearchCache.size, 0);
});

test('switching to a cached PR journey cancels the previous journey and clears its loading state', async () => {
    let release;
    const h = harness(() => new Promise(resolve => {release = resolve;}));
    h.state.currentEvent = {ppbj: {id: 1}};
    const older = h.api.loadJourney();
    h.api.remember(h.state.journeyCache, '2', {record: {ppbj_no: 'PR-2'}}, 12);
    h.state.currentEvent = {ppbj: {id: 2}};
    await h.api.loadJourney(); await older;
    release(ok({record: {ppbj_no: 'PR-1'}})); await flush();
    assert.equal(h.journeys.at(-1).record.ppbj_no, 'PR-2');
    assert.equal(h.els.journeyLoading.hidden, true); assert.equal(h.errors.length, 0);
});
