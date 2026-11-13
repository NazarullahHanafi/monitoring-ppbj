const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function harness(fetch) {
    const nodes = new Map();
    const make = () => ({textContent: '', attributes: {}, setAttribute(k, v) { this.attributes[k] = v; }, removeAttribute(k) { delete this.attributes[k]; }, remove() { nodes.delete(this.id); }});
    const button = make(), icon = make();
    icon.textContent = 'Refresh';
    button.dataset = {url: '/dashboard/refresh-cache'};
    button.parentElement = {insertAdjacentElement(_, node) { nodes.set(node.id, node); }};
    nodes.set('dashboardRefreshButton', button); nodes.set('refreshIcon', icon);
    let reloads = 0;
    const context = {document: {getElementById: id => nodes.get(id), querySelector: () => ({content: 'synthetic-csrf'}), createElement: make}, window: {location: {reload() { reloads++; }}}, fetch, AbortController, setTimeout: (fn, delay) => setTimeout(fn, delay === 20000 ? 25 : delay), clearTimeout};
    vm.runInNewContext(fs.readFileSync('public/assets/app/dashboard-actions.js', 'utf8'), context);
    return {run: context.window.refreshDashboard, button, icon, nodes, reloads: () => reloads};
}

test('rapid refresh clicks share one CSRF-protected request and reload only after confirmation', async () => {
    let release, calls = [];
    const h = harness((url, options) => { calls.push({url, options}); return new Promise(resolve => { release = resolve; }); });
    const pending = h.run(); await h.run();
    assert.equal(calls.length, 1);
    assert.equal(h.button.disabled, true);
    assert.equal(h.button.attributes['aria-busy'], 'true');
    assert.equal(calls[0].options.headers['X-CSRF-TOKEN'], 'synthetic-csrf');
    assert.equal(calls[0].options.credentials, 'same-origin');
    assert.equal(h.reloads(), 0);
    release({ok: true, json: async () => ({message: 'Refreshed'})}); await pending;
    assert.equal(h.reloads(), 1); assert.equal(h.button.disabled, false);
    assert.equal(h.icon.textContent, 'Refresh');
});

test('denied, throttled, redirected, and unconfirmed responses release controls without reloading', async () => {
    for (const response of [{ok: false, status: 403}, {ok: false, status: 429}, {ok: true, redirected: true}, {ok: true, json: async () => ({})}, {ok: false, status: 500}]) {
        const h = harness(async () => response); await h.run();
        assert.equal(h.reloads(), 0); assert.equal(h.button.disabled, false);
        assert.equal(h.nodes.get('dashboardRefreshError').attributes.role, 'alert');
        assert.ok(h.nodes.get('dashboardRefreshError').textContent.length > 10);
    }
});

test('timeouts abort the request, release controls, and never retry automatically', async () => {
    let calls = 0;
    const h = harness((_, {signal}) => { calls++; return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('Aborted'), {name: 'AbortError'})))); });
    await h.run();
    assert.equal(calls, 1); assert.equal(h.reloads(), 0); assert.equal(h.button.disabled, false);
    assert.match(h.nodes.get('dashboardRefreshError').textContent, /koneksi lambat/);
});

test('network errors use text content and a subsequent click can succeed', async () => {
    let calls = 0;
    const h = harness(async () => { if (++calls === 1) throw new Error('<img onerror=alert(1)>'); return {ok: true, json: async () => ({message: 'Refreshed'})}; });
    await h.run(); assert.equal(h.nodes.get('dashboardRefreshError').textContent, '<img onerror=alert(1)>');
    await h.run(); assert.equal(h.reloads(), 1); assert.equal(h.nodes.has('dashboardRefreshError'), false);
});

test('a user without the refresh control does not send a request', async () => {
    let calls = 0; const h = harness(async () => { calls++; });
    h.nodes.delete('dashboardRefreshButton'); await h.run(); assert.equal(calls, 0);
});
