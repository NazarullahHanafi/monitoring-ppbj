const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

class Element {
    constructor() { this.dataset = {}; this.handlers = {}; this.children = []; this.value = ''; this.textContent = ''; this.disabled = false; }
    addEventListener(type, handler) { (this.handlers[type] ||= []).push(handler); }
    fire(type, event = {}) { for (const callback of this.handlers[type] || []) callback(event); }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = nodes; }
    set innerHTML(_) { assert.fail('Search results must never interpolate untrusted HTML'); }
}
function setup() {
    const nodes = {};
    for (const name of ['form', 'query', 'scope', 'status', 'results', 'pagination', 'prev', 'next', 'reset', 'page', 'submit']) nodes[name] = new Element();
    nodes.scope.value = 'all';
    nodes.form.querySelector = () => nodes.submit;
    const root = new Element(); root.dataset.endpoint = 'https://app.test/procurement/search';
    root.querySelector = selector => nodes[selector.match(/data-pus-(\w+)/)?.[1]];
    const requests = [];
    const context = { window: { location: { origin: 'https://app.test' } }, document: { getElementById: () => root, createElement: () => new Element() }, URL, URLSearchParams, AbortController,
        fetch: (url, options) => new Promise(resolve => requests.push({ url: String(url), options, resolve })) };
    const source = fs.readFileSync(path.join(__dirname, '../../public/assets/app/procurement-search.js'), 'utf8');
    vm.runInNewContext(source, context);
    return { nodes, requests, root, source, context };
}
function data(number = 'PR-001') {
    return { rows: [{ number, description: 'Kursi ergonomis', portfolio: 'CON', matches: [{ kind: 'archive_attachment', label: '<img src=x onerror=alert(1)>', snippet: '<script>alert(1)</script>', state: 'ready', url: '/archive-gateway?pr=PR-001&file=attachment-2&action=preview' }], links: { ppbj: '/ppbj?search=PR-001' }, more_sources: 0 }], total: 1, page: 1, last_page: 1, index: { state: 'running', ready: 1 } };
}
const flush = () => new Promise(resolve => setImmediate(resolve));
function submit(f, query) { f.nodes.query.value = query; f.nodes.form.fire('submit', { preventDefault() {} }); }

test('unified search is manual; rebinding and typing do not trigger requests', () => {
    const f = setup();
    f.nodes.query.value = 'kursi'; f.nodes.query.fire('input'); f.nodes.scope.fire('change');
    assert.equal(f.requests.length, 0);
    vm.runInNewContext(f.source, f.context);
    submit(f, 'kursi');
    assert.equal(f.requests.length, 1);
    assert.equal(new URL(f.requests[0].url).searchParams.get('q'), 'kursi');
});

test('results use text nodes and safe same-origin links for names and OCR content', async () => {
    const f = setup(); submit(f, 'kursi');
    f.requests[0].resolve({ ok: true, json: async () => data() }); await flush();
    const card = f.nodes.results.children[0], match = card.children[1].children[0];
    assert.equal(match.children[0].children[1].textContent, '<img src=x onerror=alert(1)>');
    assert.equal(match.children[1].textContent, '<script>alert(1)</script>');
    assert.match(match.children[2].href, /^\/archive-gateway\?/);
    assert.equal(f.nodes.submit.disabled, false);
});

test('a stale response cannot replace a more recent search or a reset view', async () => {
    const f = setup(); submit(f, 'kursi'); submit(f, 'printer');
    assert.equal(f.requests[0].options.signal.aborted, true);
    f.requests[1].resolve({ ok: true, json: async () => data('NEW') }); await flush();
    f.requests[0].resolve({ ok: true, json: async () => data('OLD') }); await flush();
    assert.equal(f.nodes.results.children[0].children[0].children[0].children[0].textContent, 'NEW');
    submit(f, 'sensor'); f.nodes.reset.fire('click');
    f.requests[2].resolve({ ok: true, json: async () => data('STALE') }); await flush();
    assert.equal(f.nodes.results.children.length, 0);
    assert.equal(f.nodes.query.value, '');
    assert.equal(f.nodes.pagination.hidden, true);
});

test('pagination uses the applied query rather than unsent drafts and errors recover', async () => {
    const f = setup(); submit(f, 'kursi');
    f.requests[0].resolve({ ok: true, json: async () => ({ ...data(), total: 22, last_page: 3 }) }); await flush();
    f.nodes.query.value = 'draft'; f.nodes.next.fire('click');
    const url = new URL(f.requests[1].url);
    assert.equal(url.searchParams.get('q'), 'kursi'); assert.equal(url.searchParams.get('page'), '2');
    f.requests[1].resolve({ ok: false, status: 429, json: async () => ({}) }); await flush();
    assert.equal(f.nodes.status.dataset.error, 'true');
    assert.match(f.nodes.status.textContent, /Tunggu/);
    assert.equal(f.nodes.submit.disabled, false);
});

test('document navigation retains hologram context and attachments open without replacing the office', async () => {
    const f = setup();
    f.context.window.location.pathname = '/virtual-office/hologram/sp';
    f.context.window.location.search = '?office_frame=33';
    submit(f, 'kursi');
    f.requests[0].resolve({ ok: true, json: async () => data() }); await flush();
    const card = f.nodes.results.children[0];
    assert.match(card.children[2].children[0].href, /^\/virtual-office\/hologram\/ppbj\?/);
    assert.match(card.children[2].children[0].href, /office_frame=33/);
    const file = card.children[1].children[0].children[2];
    assert.equal(file.target, '_blank'); assert.equal(file.rel, 'noopener noreferrer');
});
