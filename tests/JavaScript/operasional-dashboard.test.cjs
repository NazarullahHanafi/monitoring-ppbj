const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const payload = () => ({success: true, data: {stats: {total: 0, draft: 0, pending: 0, approved: 0, rejected: 0}, kpi: {avgPendingHours: 0}, chart: {labels: [], series: []}, latest: [], topPortofolios: []}});
const ok = () => ({ok: true, status: 200, json: async () => payload()});

function harness(fetch) {
    let sequence = 0, reloads = 0;
    const timers = new Map(), docEvents = new Map(), windowEvents = new Map(), applied = [];
    const button = {disabled: false, attrs: {}, events: {}, setAttribute(k, v) { this.attrs[k] = v; }, addEventListener(k, v) { this.events[k] = v; }};
    const icon = {classList: {toggle() {}}}, notice = {textContent: '', setAttribute() {}};
    const document = {hidden: false, getElementById: id => ({refreshBtn: button, refreshIcon: icon, opsDashboardStatus: notice}[id]), addEventListener: (key, fn) => docEvents.set(key, fn)};
    const window = {location: {reload() { reloads++; }}, addEventListener: (key, fn) => windowEvents.set(key, fn)};
    const context = {window, document, fetch, AbortController, DOMException, setTimeout: (fn, delay) => { timers.set(++sequence, {fn, delay}); return sequence; }, clearTimeout: id => timers.delete(id)};
    vm.runInNewContext(fs.readFileSync('public/assets/app/operasional-dashboard.js', 'utf8'), context);
    const api = window.OperationalDashboard.start({dataUrl: '/data', refreshUrl: '/refresh', csrf: 'synthetic-csrf', onData: data => applied.push(data)});
    return {api, button, notice, timers, applied, document, docEvents, windowEvents, reloads: () => reloads, escape: window.OperationalDashboard.escapeText,
        fire: delay => { const entry = [...timers].find(([, timer]) => timer.delay === delay); assert.ok(entry, 'Timer ' + delay); timers.delete(entry[0]); return entry[1].fn(); }};
}

test('reads start after initial render and overlapping reads share one operation', async () => {
    let calls = 0, release;
    const h = harness(() => { calls++; return new Promise(resolve => { release = resolve; }); });
    assert.equal(calls, 0); assert.equal([...h.timers.values()][0].delay, 60000);
    const pending = h.api.poll(); await h.api.poll(); assert.equal(calls, 1);
    release(ok()); await pending;
    assert.equal(h.applied.length, 1); assert.equal(h.timers.size, 1);
});

test('hidden and restored pages abort old reads and never apply stale payloads or stale auth errors', async () => {
    let release, calls = 0;
    const h = harness(() => ++calls === 1 ? new Promise(resolve => { release = resolve; }) : Promise.resolve(ok()));
    const pending = h.api.poll();
    h.windowEvents.get('pagehide')(); await pending;
    assert.equal(h.timers.size, 0);
    h.windowEvents.get('pageshow')({persisted: true});
    release({ok: false, status: 403});
    await Promise.resolve(); await Promise.resolve();
    await h.fire(100);
    assert.equal(calls, 2); assert.equal(h.applied.length, 1);
    h.document.hidden = true; h.docEvents.get('visibilitychange')(); await h.api.poll();
    assert.equal(calls, 2); assert.equal(h.timers.size, 0);
});

test('timeout covers JSON body, releases single-flight state, and keeps the previous data', async () => {
    let calls = 0;
    const h = harness(async () => { calls++; return {ok: true, json: () => new Promise(() => {})}; });
    const pending = h.api.poll(); await Promise.resolve(); h.fire(30000); await pending;
    assert.equal(h.applied.length, 0); assert.match(h.notice.textContent, /koneksi lambat/);
    assert.equal(calls, 1); assert.equal(h.timers.size, 1);
});

test('manual refresh cancels polling, sends CSRF once, and waits for server confirmation', async () => {
    const calls = []; let release;
    const h = harness((url, options) => { calls.push({url, options}); return new Promise(resolve => { release = resolve; }); });
    const pending = h.api.refresh(); await h.api.refresh(); await h.api.poll();
    assert.equal(calls.length, 1); assert.equal(calls[0].options.method, 'POST');
    assert.equal(calls[0].options.headers['X-CSRF-TOKEN'], 'synthetic-csrf');
    assert.equal(h.button.disabled, true); assert.equal(h.reloads(), 0);
    release({ok: true, json: async () => ({success: true})}); await pending;
    assert.equal(h.reloads(), 1); assert.equal(h.button.disabled, false);
});

test('failed and interrupted manual refresh releases controls without retrying or reloading', async () => {
    const h = harness(async () => ({ok: false, status: 429})); await h.api.refresh();
    assert.equal(h.button.disabled, false); assert.equal(h.reloads(), 0); assert.match(h.notice.textContent, /Tunggu/);
    let release;
    const restored = harness(() => new Promise(resolve => { release = resolve; }));
    const pending = restored.api.refresh(); restored.windowEvents.get('pagehide')(); await pending;
    release({ok: true, json: async () => ({success: true})}); await Promise.resolve();
    assert.equal(restored.reloads(), 0); assert.equal(restored.button.disabled, false);
    assert.match(restored.notice.textContent, /belum terkonfirmasi/);
});

test('incomplete data never reaches rendering and current authorization errors stop automatic reads', async () => {
    const bad = payload(); bad.data.latest = [null];
    const h = harness(async () => ({ok: true, json: async () => bad})); await h.api.poll();
    assert.equal(h.applied.length, 0); assert.match(h.notice.textContent, /belum lengkap/);
    let calls = 0;
    const denied = harness(async () => { calls++; return {ok: false, status: 401}; });
    await denied.api.poll(); await denied.api.poll(); assert.equal(calls, 1); assert.equal(denied.timers.size, 0);
});

test('HTML text and attribute payloads are escaped and stale rows are cleared by actual renderers', () => {
    const h = harness(async () => ok());
    assert.equal(h.escape('"<script>&\''), '&quot;&lt;script&gt;&amp;&#39;');
    const source = fs.readFileSync('resources/views/operasional/dashboard.blade.php', 'utf8');
    const start = source.indexOf('    function formatRupiahDashboard');
    const end = source.indexOf('    // ================= MANUAL', start);
    const rows = {innerHTML: 'stale rows'}, portfolios = {innerHTML: 'stale portfolios'};
    const context = {document: {getElementById: id => id === 'latest-rows-tbody' ? rows : portfolios}, OperationalDashboard: {escapeText: h.escape}};
    vm.runInNewContext(source.slice(start, end), context);
    context.updateLatestRows([]); context.updateTopPortofolios([]);
    assert.doesNotMatch(rows.innerHTML, /stale rows/); assert.doesNotMatch(portfolios.innerHTML, /stale portfolios/);
    context.updateLatestRows([{nomor_pr: '<img onerror=1>', tujuan_pengadaan: '<svg/onload=1>', tanggal_pr: '<b>date</b>', status: 'PENDING'}]);
    context.updateTopPortofolios([{portofolio: '"><img onerror=1>', total_pr: 1, total_harga: 1, rata_harga: 1}]);
    assert.doesNotMatch(rows.innerHTML, /<img|<svg\/onload|<b>date/); assert.doesNotMatch(portfolios.innerHTML, /<img/);
    assert.match(portfolios.innerHTML, /&quot;&gt;&lt;img/);
});
