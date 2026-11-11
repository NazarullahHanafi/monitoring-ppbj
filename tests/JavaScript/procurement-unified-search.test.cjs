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
function setup(initialQuery = '') {
    const nodes = {};
    for (const name of ['form', 'query', 'scope', 'match', 'sort', 'lexical', 'suggestions', 'buyer', 'vendor', 'creator', 'exclude', 'status', 'results', 'pagination', 'prev', 'next', 'reset', 'page', 'submit', 'summary', 'progress', 'progressinfo', 'check-status', 'check-coverage', 'coverage', 'coverage-info', 'coverage-rows', 'coverage-page', 'coverage-prev', 'coverage-next', 'coverage-back', 'catalog-form', 'catalog-query', 'catalog-rows', 'catalog-info', 'catalog-more']) nodes[name] = new Element();
    nodes['catalog-form'].dataset.endpoint = '/procurement/search/archive-catalog';
    nodes['check-coverage'].dataset.coverageEndpoint = '/procurement/search/coverage';
    nodes.scope.value = 'all';
    nodes.query.value = initialQuery;
    nodes.match.value = 'source'; nodes.sort.value = 'relevance'; nodes.lexical.value = 'expanded';
    nodes.form.querySelector = () => nodes.submit;
    const root = new Element(); root.dataset.endpoint = 'https://app.test/procurement/search';
    root.dataset.statusEndpoint = '/procurement/search/status'; root.dataset.priorityBase = '/procurement/search/prs'; root.dataset.csrf = 'session-csrf';
    root.dataset.reviewBase = '/procurement/search/reviews';
    root.querySelector = selector => nodes[selector.match(/data-pus-([\w-]+)/)?.[1]];
    const requests = [];
    const context = { window: { location: { origin: 'https://app.test' } }, document: { getElementById: () => root, createElement: tag => { const node = new Element(); node.tag = tag; return node; } }, URL, URLSearchParams, AbortController, setTimeout: fn => { context.timeout = fn; return 1; }, clearTimeout() {},
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

test('global archive catalog is manual, uses safe text and freezes its own pagination query', async () => {
    const f = setup(); f.nodes['catalog-query'].value = 'plastik'; assert.equal(f.requests.length, 0);
    f.nodes['catalog-form'].fire('submit', { preventDefault() {} });
    assert.equal(new URL(f.requests[0].url).pathname, '/procurement/search/archive-catalog');
    f.requests[0].resolve({ ok: true, json: async () => ({ rows: [{ label: '<img onerror=1>', id: 5, reference: 'REF', prs: [], url: 'https://evil.test/file' }], has_more: true, after: 5 }) }); await flush();
    assert.equal(walk(f.nodes['catalog-rows'], node => node.textContent === '<img onerror=1>').length, 1); assert.equal(walk(f.nodes['catalog-rows'], node => Boolean(node.href)).length, 0);
    f.nodes['catalog-query'].value = 'draft'; f.nodes['catalog-more'].fire('click');
    assert.equal(new URL(f.requests[1].url).searchParams.get('q'), 'plastik'); assert.equal(new URL(f.requests[1].url).searchParams.get('after'), '5');
    f.nodes.reset.fire('click'); assert.equal(f.requests[1].options.signal.aborted, true);
    f.requests[1].resolve({ ok: true, json: async () => ({ rows: [{ label: 'late' }], has_more: false }) }); await flush(); assert.equal(f.nodes['catalog-rows'].children.length, 0);
});

test('human review loads on click and submits an explicit versioned CSRF protected correction', async () => {
    const f = setup(); f.root.dataset.canReview = '1'; f.root.dataset.canPrioritize = '1'; f.nodes['check-coverage'].fire('click');
    f.requests[0].resolve({ ok: true, json: async () => ({ source: 55, label: 'Scan', total: 1, page: 1, last_page: 1, rows: [{ page: 1, state: 'Perlu diperiksa' }] }) }); await flush();
    const trigger = walk(f.nodes['coverage-rows'], node => node.textContent === 'Periksa teks & riwayat')[0]; trigger.fire('click');
    assert.equal(new URL(f.requests[1].url).pathname, '/procurement/search/reviews/55/1');
    f.requests[1].resolve({ ok: true, json: async () => ({ text: '<script>inert</script>', version: 'fingerprint', history: [{ created_at: 'today', name: '<img>', state: 'applied', reason: 'Asli' }] }) }); await flush();
    const textareas = walk(f.nodes['coverage-rows'], node => node.tag === 'textarea'); assert.equal(textareas[0].value, '<script>inert</script>'); textareas[0].value = 'Bacaan benar'; textareas[1].value = 'Dicocokkan dengan asli';
    const save = walk(f.nodes['coverage-rows'], node => node.textContent === 'Simpan pemeriksaan')[0]; save.fire('click'); save.fire('click'); assert.equal(f.requests.length, 3);
    assert.equal(f.requests[2].options.method, 'POST'); assert.equal(f.requests[2].options.headers['X-CSRF-TOKEN'], 'session-csrf'); assert.equal(JSON.parse(f.requests[2].options.body).version, 'fingerprint');
    f.requests[2].resolve({ ok: true, json: async () => ({ message: 'Menunggu indeks' }) }); await flush(); assert.equal(textareas[0].disabled, true); assert.equal(save.disabled, true);
    walk(f.nodes['coverage-rows'], node => node.textContent === 'Tutup')[0].fire('click'); assert.equal(trigger.disabled, false);
});

test('coverage is requested manually and browsing every page leaves search results intact', async () => {
    const f = setup(); assert.equal(f.requests.length, 0); submit(f, 'sensor');
    f.requests[0].resolve({ ok: true, json: async () => data() }); await flush(); const card = f.nodes.results.children[0];
    f.nodes['check-coverage'].fire('click');
    assert.equal(new URL(f.requests[1].url).pathname, '/procurement/search/coverage');
    f.requests[1].resolve({ ok: true, json: async () => ({ total: 1, page: 1, last_page: 1, rows: [{ id: 55, label: '<img onerror=1>', reference: 'REF-55', pages: 26, indexed_pages: 25, coverage_state: 'in_progress', coverage_checked_at: '2026-11-11' }] }) }); await flush();
    assert.equal(f.nodes.results.children[0], card); assert.equal(f.nodes.query.value, 'sensor');
    assert.equal(walk(f.nodes['coverage-rows'], node => node.textContent.includes('<img onerror=1>')).length, 1);
    walk(f.nodes['coverage-rows'], node => node.className === 'pus-secondary pus-page-audit')[0].fire('click');
    assert.equal(new URL(f.requests[2].url).searchParams.get('source'), '55');
    f.requests[2].resolve({ ok: true, json: async () => ({ source: 55, label: 'Scan', unit: 'Halaman', total: 26, page: 1, last_page: 2, rows: [{ page: 1, state: 'Diproses otomatis', url: '/procurement/search/files/55#page=1' }] }) }); await flush();
    assert.equal(walk(f.nodes['coverage-rows'], node => node.href === '/procurement/search/files/55#page=1').length, 1);
    f.nodes['coverage-next'].fire('click'); assert.equal(new URL(f.requests[3].url).searchParams.get('page'), '2');
    f.requests[3].resolve({ ok: true, json: async () => ({ source: 55, label: 'Scan', total: 26, page: 2, last_page: 2, rows: [{ page: 26, state: 'Belum diproses', url: 'https://evil.test/scan' }] }) }); await flush();
    assert.equal(walk(f.nodes['coverage-rows'], node => Boolean(node.href)).length, 0);
    assert.match(f.nodes['coverage-rows'].children[0].children[0].textContent, /26: Belum diproses/);
    assert.equal(f.nodes['coverage-next'].disabled, true); assert.equal(f.nodes['coverage-back'].hidden, false);
    f.nodes['coverage-back'].fire('click'); assert.equal(new URL(f.requests[4].url).searchParams.has('source'), false);
});

test('reset cancels a coverage request and ignores its late result', async () => {
    const f = setup(); f.nodes['check-coverage'].fire('click'); f.nodes.reset.fire('click');
    assert.equal(f.requests[0].options.signal.aborted, true);
    f.requests[0].resolve({ ok: true, json: async () => ({ total: 99, page: 1, last_page: 4, rows: [] }) }); await flush();
    assert.equal(f.nodes.coverage.hidden, true); assert.equal(f.nodes['check-coverage'].disabled, false);
    assert.doesNotMatch(f.nodes['coverage-info'].textContent, /99 lampiran/);
});

test('coverage errors and invalid endpoints release the button for a manual retry', async () => {
    const f = setup(); f.nodes['check-coverage'].fire('click');
    f.requests[0].resolve({ ok: false, status: 429 }); await flush();
    assert.match(f.nodes['coverage-info'].textContent, /Tunggu sebentar/); assert.equal(f.nodes['check-coverage'].disabled, false);
    f.nodes['check-coverage'].dataset.coverageEndpoint = 'https://evil.test/audit'; f.nodes['check-coverage'].fire('click'); await flush();
    assert.equal(f.requests.length, 1); assert.match(f.nodes['coverage-info'].textContent, /Alamat audit tidak valid/); assert.equal(f.nodes['check-coverage'].disabled, false);
});

test('unified search is manual; rebinding and typing do not trigger requests', () => {
    const f = setup();
    f.nodes.query.value = 'kursi'; f.nodes.query.fire('input'); f.nodes.scope.fire('change');
    assert.equal(f.requests.length, 0);
    vm.runInNewContext(f.source, f.context);
    submit(f, 'kursi');
    assert.equal(f.requests.length, 1);
    assert.equal(new URL(f.requests[0].url).searchParams.get('q'), 'kursi');
});

test('a restored search field stays idle until its own form is submitted', () => {
    const f = setup('0454');
    assert.equal(f.requests.length, 0);
    assert.equal(f.nodes.query.value, '0454');
    submit(f, '0454');
    assert.equal(f.requests.length, 1);
    assert.equal(new URL(f.requests[0].url).searchParams.get('q'), '0454');
});

test('queue status loads only on request without searching or replacing existing results', async () => {
    const f = setup(); submit(f, 'sensor'); f.requests[0].resolve({ ok: true, json: async () => data() }); await flush();
    const card = f.nodes.results.children[0];
    f.nodes['check-status'].fire('click'); f.nodes['check-status'].fire('click'); assert.equal(f.requests.length, 2);
    assert.equal(new URL(f.requests[1].url).pathname, '/procurement/search/status');
    f.requests[1].resolve({ ok: true, json: async () => ({ index: { waiting: 719, priority_waiting: 2, checked_at: '2000-01-01T00:00:00Z' } }) }); await flush();
    assert.equal(f.nodes.results.children[0], card); assert.equal(f.nodes.progress.open, true);
    assert.match(f.nodes.progressinfo.textContent, /719 lampiran siap/); assert.match(f.nodes.progressinfo.textContent, /2 di antaranya prioritas/);
    assert.match(f.nodes.progressinfo.textContent, /lebih dari 3 menit/); assert.equal(f.nodes['check-status'].disabled, false);
});

test('priority is an explicit CSRF protected POST and duplicate clicks coalesce', async () => {
    const f = setup(); f.root.dataset.canPrioritize = '1'; submit(f, 'sensor');
    const response = sourceBatch(1, 1); response.rows[0].matches[0].queue = { priority: true };
    f.requests[0].resolve({ ok: true, json: async () => response }); await flush();
    const panel = walk(f.nodes.results, node => node.className === 'pus-details pus-queue')[0];
    assert.notEqual(panel.open, true); panel.fire('toggle'); assert.equal(f.requests.length, 1);
    assert.equal(walk(f.nodes.results, node => node.textContent === 'Giliran prioritas aktif').length, 1);
    const button = panel.children[2]; button.fire('click'); button.fire('click'); assert.equal(f.requests.length, 2);
    assert.equal(new URL(f.requests[1].url).pathname, '/procurement/search/prs/17/priority');
    assert.equal(f.requests[1].options.method, 'POST'); assert.equal(f.requests[1].options.headers['X-CSRF-TOKEN'], 'session-csrf');
    f.requests[1].resolve({ ok: true, json: async () => ({ queued: 3, message: '<script>3 lampiran prioritas</script>' }) }); await flush();
    assert.equal(panel.children[1].textContent, '<script>3 lampiran prioritas</script>'); assert.equal(button.disabled, true);
    button.fire('click'); assert.equal(f.requests.length, 2);
});

test('priority failures release controls and read-only users do not see a request button', async () => {
    const f = setup(); submit(f, 'sensor'); f.requests[0].resolve({ ok: true, json: async () => sourceBatch(1, 1) }); await flush();
    assert.equal(walk(f.nodes.results, node => node.className === 'pus-secondary pus-priority').length, 0);
    f.root.dataset.canPrioritize = '1'; submit(f, 'plastik'); f.requests[1].resolve({ ok: true, json: async () => sourceBatch(1, 1) }); await flush();
    const panel = walk(f.nodes.results, node => node.className === 'pus-details pus-queue')[0], button = panel.children[2];
    button.fire('click'); f.requests[2].resolve({ ok: false, status: 419 }); await flush();
    assert.match(panel.children[1].textContent, /Sesi berakhir/); assert.equal(button.disabled, false);
    button.fire('click'); f.nodes.reset.fire('click'); assert.equal(f.requests[3].options.signal.aborted, true);
    f.requests[3].resolve({ ok: true, json: async () => ({ queued: 3, message: 'Late' }) }); await flush();
    assert.equal(f.nodes.results.children.length, 0); assert.notEqual(panel.children[1].textContent, 'Late');
});

test('reset discards late queue status and a status error remains retryable', async () => {
    const f = setup(); f.nodes['check-status'].fire('click'); f.nodes.reset.fire('click');
    f.requests[0].resolve({ ok: true, json: async () => ({ index: { waiting: 99 } }) }); await flush();
    assert.equal(f.nodes.progress.hidden, true);
    f.nodes['check-status'].fire('click'); f.requests[1].resolve({ ok: false, status: 429 }); await flush();
    assert.match(f.nodes.progressinfo.textContent, /Tunggu sebentar/); assert.equal(f.nodes['check-status'].disabled, false);
});

test('word evidence stays collapsed and distinguishes page links from metadata and unknown positions', async () => {
    const f = setup(); submit(f, 'kursi sens kabel'); const response = data();
    response.rows[0].matches[0].word_evidence = [
        { word: 'kursi', matched: 'chair', type: 'equivalent', location: 'page', page: 7, url: '/procurement/search/files/12#page=7' },
        { word: 'sens', matched: 'sensor', type: 'prefix', location: 'document', page: null, url: null },
        { word: 'kabel', matched: 'kabel', type: 'exact', location: 'unknown', page: null, url: null }
    ];
    f.requests[0].resolve({ ok: true, json: async () => response }); await flush();
    const details = walk(f.nodes.results, node => node.className === 'pus-word-evidence')[0];
    assert.notEqual(details.open, true); details.fire('toggle'); assert.equal(f.requests.length, 1);
    const text = node => node.textContent + node.children.map(text).join(' ');
    assert.match(text(details), /kursi → chair · Padanan/); assert.match(text(details), /sens → sensor · Awalan/);
    assert.match(text(details), /kabel · Kata utuh/); assert.match(text(details), /Data dokumen/); assert.match(text(details), /Lokasi belum tercatat/);
    const links = walk(details, node => Boolean(node.href)); assert.equal(links.length, 1);
    assert.equal(links[0].href, '/procurement/search/files/12#page=7'); assert.equal(links[0].rel, 'noopener noreferrer');
});

test('word evidence cannot execute OCR HTML or navigate to an external or invalid page link', async () => {
    const f = setup(); submit(f, 'kursi'); const response = data();
    response.rows[0].matches[0].word_evidence = [
        { word: '<script>hit</script>', matched: '<img onerror=1>', type: 'equivalent', location: 'page', page: 2, url: 'javascript:alert(1)' },
        { word: 'kursi', matched: 'kursi', type: 'exact', location: 'page', page: 0, url: '/procurement/search/files/12#page=1' },
        { word: 'kursi', matched: 'kursi', type: 'exact', location: 'page', page: 2001, url: 'https://evil.test/' }
    ];
    f.requests[0].resolve({ ok: true, json: async () => response }); await flush();
    const details = walk(f.nodes.results, node => node.className === 'pus-word-evidence')[0];
    assert.equal(walk(details, node => Boolean(node.href)).length, 0);
    assert.equal(walk(details, node => node.textContent.includes('<script>hit</script>')).length, 1);
});

test('additional sources render their own word evidence without fetching another document', async () => {
    const f = setup(); submit(f, 'sensor'); f.requests[0].resolve({ ok: true, json: async () => sourceBatch(1, 4, true) }); await flush();
    const button = walk(f.nodes.results, node => node.className === 'pus-secondary pus-evidence-load')[0]; button.fire('click');
    const next = sourceBatch(5, 5, false); next.rows[0].matches[0].word_evidence = [{ word: 'sensor', matched: 'sensor', type: 'exact', location: 'page', page: 11, url: '/procurement/search/files/5#page=11' }];
    f.requests[1].resolve({ ok: true, json: async () => next }); await flush();
    assert.equal(f.requests.length, 2);
    assert.equal(walk(f.nodes.results, node => node.href === '/procurement/search/files/5#page=11').length, 1);
});

test('word exclusions apply manually and remain frozen for pagination and evidence browsing', async () => {
    const f = setup(); f.nodes.exclude.value = 'bekas rekondisi'; f.nodes.exclude.fire('input');
    assert.equal(f.requests.length, 0);
    submit(f, 'kursi'); assert.equal(new URL(f.requests[0].url).searchParams.get('exclude'), 'bekas rekondisi');
    const response = sourceBatch(1, 4, true); response.last_page = 2;
    f.requests[0].resolve({ ok: true, json: async () => response }); await flush();
    assert.match(f.nodes.status.textContent, /Hindari kata utuh: bekas rekondisi/);
    f.nodes.exclude.value = 'Draft';
    walk(f.nodes.results, node => node.className === 'pus-secondary pus-evidence-load')[0].fire('click');
    assert.equal(new URL(f.requests[1].url).searchParams.get('exclude'), 'bekas rekondisi');
    f.nodes.next.fire('click'); assert.equal(new URL(f.requests[2].url).searchParams.get('exclude'), 'bekas rekondisi');
    f.nodes.reset.fire('click'); assert.equal(f.nodes.exclude.value, '');
    submit(f, 'pompa'); assert.equal(new URL(f.requests[3].url).searchParams.has('exclude'), false);
});

test('accepting a spelling suggestion preserves applied exclusions instead of an unsent draft', async () => {
    const f = setup(); f.nodes.exclude.value = 'bekas'; submit(f, 'xpektrometer');
    f.requests[0].resolve({ ok: true, json: async () => ({ ...data(), suggestions: [{ word: 'xpektrometer', replacement: 'spektrometer', query: 'spektrometer' }] }) }); await flush();
    f.nodes.exclude.value = 'Draft'; f.nodes.suggestions.children[0].fire('click');
    assert.equal(new URL(f.requests[1].url).searchParams.get('exclude'), 'bekas');
    assert.equal(f.nodes.exclude.value, 'bekas');
});

test('related mode and sorting apply manually and pagination retains applied options', async () => {
    const f=setup(); f.nodes.match.value='related'; f.nodes.sort.value='newest';
    f.nodes.match.fire('change'); f.nodes.sort.fire('change'); assert.equal(f.requests.length,0);
    submit(f,'sensor kalibrasi');
    let url=new URL(f.requests[0].url); assert.equal(url.searchParams.get('match'),'related'); assert.equal(url.searchParams.get('sort'),'newest');
    const response={...data(),match:'related',sort:'newest',last_page:2}; response.rows[0].matches[0].matched_words=['sensor'];
    f.requests[0].resolve({ok:true,json:async()=>response}); await flush();
    const text=node=>node.textContent+node.children.map(text).join(' ');
    assert.match(text(f.nodes.results),/Kata cocok: sensor/); assert.match(f.nodes.status.textContent,/dokumen berbeda/);
    f.nodes.match.value='source'; f.nodes.sort.value='relevance'; f.nodes.next.fire('click');
    url=new URL(f.requests[1].url); assert.equal(url.searchParams.get('match'),'related'); assert.equal(url.searchParams.get('sort'),'newest');
    f.nodes.reset.fire('click'); assert.equal(f.nodes.match.value,'source'); assert.equal(f.nodes.sort.value,'relevance');
});

test('spelling suggestions require a click and retain applied filters while clearing unsent drafts', async () => {
    const f=setup(); f.nodes.buyer.value='Nazar'; f.nodes.match.value='related'; submit(f,'plastikk');
    const response={...data(),rows:[],total:0,match:'related',suggestions:[{word:'plastikk',replacement:'plastik',query:'plastik'}]};
    f.requests[0].resolve({ok:true,json:async()=>response}); await flush();
    assert.equal(f.requests.length,1); assert.equal(f.nodes.suggestions.hidden,false);
    assert.equal(f.nodes.suggestions.children[0].textContent,'Coba “plastik”');
    f.nodes.buyer.value='Draft'; f.nodes.scope.value='sp'; f.nodes.match.value='source';
    f.nodes.suggestions.children[0].fire('click');
    const url=new URL(f.requests[1].url); assert.equal(url.searchParams.get('q'),'plastik');
    assert.equal(url.searchParams.get('buyer'),'Nazar'); assert.equal(url.searchParams.get('scope'),'all'); assert.equal(url.searchParams.get('match'),'related');
    assert.equal(f.nodes.buyer.value,'Nazar'); assert.equal(f.nodes.match.value,'related'); assert.equal(f.nodes.suggestions.hidden,true);
    f.nodes.reset.fire('click'); assert.equal(f.nodes.suggestions.children.length,0);
    f.requests[1].resolve({ok:true,json:async()=>response}); await flush(); assert.equal(f.nodes.suggestions.children.length,0);
});

test('suggestion labels and relevance explanations cannot execute HTML', async () => {
    const f=setup(); submit(f,'kursii'); const response=data();
    response.suggestions=[{word:'kursii',replacement:'<img onerror=1>',query:'kursi'}]; response.rows[0].relevance={reason:'<script>reason</script>'};
    f.requests[0].resolve({ok:true,json:async()=>response}); await flush();
    assert.equal(f.nodes.suggestions.children[0].textContent,'Coba “<img onerror=1>”');
    assert.equal(f.nodes.results.children[0].children[1].textContent,'<script>reason</script>');
});

test('bounded query validation returns a useful plain-text correction and releases controls', async () => {
    const f=setup(); submit(f,'a b c d e f g h');
    f.requests[0].resolve({ok:false,status:422,json:async()=>({errors:{q:['Gunakan nama barang atau kata yang lebih lengkap.']}})}); await flush();
    assert.match(f.nodes.status.textContent,/lebih lengkap/); assert.equal(f.nodes.submit.disabled,false);
});

test('context filters apply on submit, persist across pages, and reset together', async () => {
    const f = setup();
    f.nodes.buyer.value = 'Nazar'; f.nodes.vendor.value = '100%_Vendor'; f.nodes.creator.value = 'Ayu';
    f.nodes.vendor.fire('input'); assert.equal(f.requests.length, 0);
    submit(f, 'spektrometer');
    const first = new URL(f.requests[0].url);
    assert.equal(first.searchParams.get('vendor'), '100%_Vendor');
    assert.equal(first.searchParams.get('creator'), 'Ayu');
    f.requests[0].resolve({ ok: true, json: async () => ({ ...data(), last_page: 2 }) }); await flush();
    assert.match(f.nodes.status.textContent, /Buyer: Nazar/);
    f.nodes.creator.value = 'Unsubmitted'; f.nodes.next.fire('click');
    assert.equal(new URL(f.requests[1].url).searchParams.get('creator'), 'Ayu');
    f.nodes.reset.fire('click');
    assert.equal(f.nodes.buyer.value, ''); assert.equal(f.nodes.vendor.value, ''); assert.equal(f.nodes.creator.value, '');
    submit(f, 'kursi'); assert.equal(new URL(f.requests[2].url).searchParams.has('vendor'), false);
});

test('buyer vendor and TOR details are safe text inside a closed disclosure', async () => {
    const f = setup(); submit(f, 'kursi');
    const response = data();
    response.rows[0].context = { buyer: '<script>Buyer</script>', vendor: 'Vendor PPBJ', creator: 'Ayu',
        documents: [{ kind: 'spph', number: 'SPPH-01', vendors: ['Kandidat A', '<img>'], pic: 'PIC', date: '2026-11-01' }],
        provenance: { source_fields: [{ label: 'Pembuat TOR', value: 'Ayu' }], signatures: [{ role: 'Kabid', name: '<script>', date: 'Belum tercatat', status: 'Belum ditandatangani' }] } };
    f.requests[0].resolve({ ok: true, json: async () => response }); await flush();
    const card = f.nodes.results.children[0], summary = card.children[1], details = card.children[4];
    assert.equal(summary.children[0].children[1].textContent, '<script>Buyer</script>');
    assert.equal(details.tag, 'details'); assert.notEqual(details.open, true);
    const text = node => node.textContent + node.children.map(text).join(' ');
    assert.match(text(details), /Kandidat vendor penawaran/);
    assert.match(text(details), /Kandidat A; <img>/);
    assert.match(text(details), /Pembuat TOR/);
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

test('duplicate in-flight submits share one request, HTTP HTML errors recover, and last-page buttons stay disabled', async () => {
    const f = setup(); submit(f, 'kursi'); submit(f, 'kursi');
    assert.equal(f.requests.length, 1);
    f.requests[0].resolve({ ok: false, status: 503, json: async () => { throw Error('PRIVATE HTML'); } }); await flush();
    assert.doesNotMatch(f.nodes.status.textContent, /PRIVATE/);
    assert.equal(f.nodes.submit.disabled, false);
    submit(f, 'kursi'); f.requests[1].resolve({ ok: true, json: async () => data() }); await flush();
    assert.equal(f.nodes.next.disabled, true);
    assert.equal(f.nodes.prev.disabled, true);
});

test('timeout restores controls and reset removes stale error/summary state', async () => {
    const f = setup(); submit(f, 'kursi');
    f.context.timeout();
    assert.equal(f.requests[0].options.signal.aborted, true);
    // Fetch rejects an aborted request in a browser.
    f.requests[0].resolve({ ok: true, json: async () => { throw Object.assign(Error('abort'), { name: 'AbortError' }); } }); await flush();
    assert.equal(f.nodes.submit.disabled, false);
    assert.match(f.nodes.status.textContent, /terlalu lama/);
    f.nodes.reset.fire('click');
    assert.equal(f.nodes.status.dataset.error, 'false');
    assert.equal(f.nodes.summary.hidden, true);
});

test('poor scan quality is visible without disclosing raw scores as accuracy guarantees', async () => {
    const f = setup(); submit(f, 'sensor');
    const result = data(); result.rows[0].matches[0].reading = { engine: 'pdfjs-6-tesseract-7', confidence: 30 };
    f.requests[0].resolve({ ok: true, json: async () => result }); await flush();
    const badges = f.nodes.results.children[0].children[1].children[0].children[0].children.map(n => n.textContent).join(' ');
    assert.match(badges, /Teks PDF \+ scan/); assert.match(badges, /kurang jelas/); assert.doesNotMatch(badges, /30%/);
});

test('unknown words are explained casually without hiding useful results or executing text', async () => {
    const f = setup(); submit(f, 'wefwefwefwe plastik');
    const result = data(); result.query = { mode: 'partial', used: ['plastik'], missing: ['wefwefwefwe', '<img onerror=alert(1)>'] };
    f.requests[0].resolve({ ok: true, json: async () => result }); await flush();
    assert.equal(f.nodes.results.children.length, 1);
    assert.match(f.nodes.status.textContent, /wefwefwefwe.*belum ketemu.*cuy/);
    assert.match(f.nodes.status.textContent, /plastik.*ketemu/);
    assert.match(f.nodes.status.textContent, /<img onerror=alert\(1\)>/);
});

test('scan matches name and open their actual PDF page while discarding arbitrary fragments', async () => {
    const f = setup(); submit(f, 'plastik');
    const result = data(); result.rows[0].matches[0].match_page = 17; result.rows[0].matches[0].url = '/procurement/search/files/44#page=17';
    f.requests[0].resolve({ ok: true, json: async () => result }); await flush();
    const match = f.nodes.results.children[0].children[1].children[0];
    assert.match(match.children[0].children.at(-1).textContent, /halaman 17/);
    assert.equal(match.children[2].href, '/procurement/search/files/44#page=17');
    assert.match(match.children[2].textContent, /halaman 17/);
});

test('keyword highlights keep surrounding OCR text as inert text nodes', async () => {
    const f = setup(); submit(f, 'plastik');
    const result = data(); result.query = { used: ['plastik'], missing: [] }; result.rows[0].matches[0].snippet = '<script>plastik</script> transparan';
    f.requests[0].resolve({ ok: true, json: async () => result }); await flush();
    const snippet = f.nodes.results.children[0].children[1].children[0].children[1];
    assert.equal(snippet.children[1].tag, 'mark');
    assert.equal(snippet.children[1].textContent, 'plastik');
    assert.equal(snippet.children.map(node => node.textContent).join(''), '<script>plastik</script> transparan');
});

test('scan diagnostics use a separate collapsible panel and reset hides it', async () => {
    const f = setup(); submit(f, 'plastik');
    const result = data(); result.index = { state: 'running', pending: 20, failed: 2, unreadable_pages: 3, unlinked_files: 4, pages_processed: 80, pages_known: 150 };
    f.requests[0].resolve({ ok: true, json: async () => result }); await flush();
    assert.equal(f.nodes.progress.hidden, false);
    assert.match(f.nodes.progressinfo.textContent, /20 lampiran/);
    assert.match(f.nodes.progressinfo.textContent, /3 halaman bermasalah/);
    assert.doesNotMatch(f.nodes.status.textContent, /20 lampiran/);
    f.nodes.reset.fire('click'); assert.equal(f.nodes.progress.hidden, true);
});

function walk(node, predicate) { return [node, ...node.children.flatMap(child => walk(child, predicate))].filter(predicate); }
function sourceBatch(start, end, more = false) {
    const response = data(); response.rows[0].id = 17;
    response.rows[0].matches = Array.from({length:end-start+1}, (_,i) => ({...data().rows[0].matches[0], id:start+i}));
    response.rows[0].evidence = {after:end,has_more:more}; response.rows[0].more_sources = more ? 1 : 0;
    return response;
}
test('whole token precision is manual, retained across pages, and does not highlight a prefix', async () => {
    const f=setup(); f.nodes.lexical.value='exact'; f.nodes.lexical.fire('change'); assert.equal(f.requests.length,0);
    submit(f,'sensor'); assert.equal(new URL(f.requests[0].url).searchParams.get('lexical'),'exact');
    const response={...data(),lexical:'exact',query:{used:['sensor']},last_page:2}; response.rows[0].matches[0].snippet='sensorium sensor';
    f.requests[0].resolve({ok:true,json:async()=>response}); await flush();
    assert.deepEqual(walk(f.nodes.results,node=>node.tag==='mark').map(node=>node.textContent),['sensor']);
    assert.match(f.nodes.status.textContent,/Kata utuh/);
    f.nodes.lexical.value='expanded'; f.nodes.next.fire('click'); assert.equal(new URL(f.requests[1].url).searchParams.get('lexical'),'exact');
    f.nodes.reset.fire('click'); assert.equal(f.nodes.lexical.value,'expanded');
    f.nodes.match.value='reference'; submit(f,'RFQ_%01'); assert.equal(new URL(f.requests[2].url).searchParams.get('lexical'),'exact'); assert.equal(f.nodes.lexical.value,'exact');
    const exact={...data(),match:'reference',lexical:'exact'}; exact.rows[0].matches[0].reference='RFQ_%01';
    f.requests[2].resolve({ok:true,json:async()=>exact}); await flush();
    assert.equal(walk(f.nodes.results,node=>node.textContent==='Nomor persis: RFQ_%01').length,1);
});
test('additional evidence is lazy, deduplicated, bounded and uses the applied query snapshot', async () => {
    const f=setup(); f.nodes.lexical.value='exact'; f.nodes.buyer.value='Nazar'; submit(f,'sensor');
    const first=sourceBatch(1,4,true); f.requests[0].resolve({ok:true,json:async()=>first}); await flush();
    const panel=walk(f.nodes.results,node=>node.className==='pus-details pus-evidence')[0];
    assert.notEqual(panel.open,true); panel.fire('toggle'); assert.equal(f.requests.length,1);
    const button=panel.children[3], list=panel.children[2];
    f.nodes.query.value='Unsubmitted'; f.nodes.buyer.value='Draft'; f.nodes.lexical.value='expanded'; f.nodes.scope.value='sp';
    button.fire('click'); button.fire('click'); assert.equal(f.requests.length,2); assert.equal(button.disabled,true);
    let params=new URL(f.requests[1].url).searchParams;
    assert.equal(params.get('q'),'sensor'); assert.equal(params.get('buyer'),'Nazar'); assert.equal(params.get('scope'),'all'); assert.equal(params.get('lexical'),'exact'); assert.equal(params.get('pr'),'17'); assert.equal(params.get('after'),'0');
    f.requests[1].resolve({ok:true,json:async()=>sourceBatch(1,8,true)}); await flush();
    assert.equal(list.children.length,4); assert.equal(button.disabled,false); assert.equal(button.hidden,false);
    button.fire('click'); assert.equal(new URL(f.requests[2].url).searchParams.get('after'),'8');
    f.requests[2].resolve({ok:true,json:async()=>sourceBatch(9,11,false)}); await flush();
    assert.equal(list.children.length,7); assert.equal(button.hidden,true);
    assert.equal(walk(f.nodes.results,node=>node.className==='pus-match').length,11);
});
test('evidence failures can retry without advancing the cursor or duplicating sources', async () => {
    const f=setup(); submit(f,'sensor'); f.requests[0].resolve({ok:true,json:async()=>sourceBatch(1,4,true)}); await flush();
    const panel=walk(f.nodes.results,node=>node.className==='pus-details pus-evidence')[0], button=panel.children[3];
    button.fire('click'); f.requests[1].resolve({ok:false,status:429}); await flush(); assert.match(panel.children[1].textContent,/Tunggu/); assert.equal(button.disabled,false);
    button.fire('click'); assert.equal(new URL(f.requests[2].url).searchParams.get('after'),'0');
    const invalid=sourceBatch(1,8,true); invalid.rows[0].evidence.after=0;
    f.requests[2].resolve({ok:true,json:async()=>invalid}); await flush(); assert.equal(panel.children[2].children.length,0); assert.match(panel.children[1].textContent,/belum dapat/);
    button.fire('click'); f.requests[3].resolve({ok:true,json:async()=>sourceBatch(1,8,true)}); await flush(); assert.equal(panel.children[2].children.length,4);
});
test('new searches and reset cancel additional evidence and discard late responses', async () => {
    for (const action of ['reset','search']) {
        const f=setup(); submit(f,'sensor'); f.requests[0].resolve({ok:true,json:async()=>sourceBatch(1,4,true)}); await flush();
        const panel=walk(f.nodes.results,node=>node.className==='pus-details pus-evidence')[0], button=panel.children[3];
        button.fire('click');
        if(action==='reset') f.nodes.reset.fire('click'); else submit(f,'plastik');
        assert.equal(f.requests[1].options.signal.aborted,true);
        f.requests[1].resolve({ok:true,json:async()=>sourceBatch(1,8,true)}); await flush(); assert.equal(panel.children[2].children.length,0);
    }
});
test('additional evidence uses safe text and never trusts external source links', async () => {
    const f=setup(); submit(f,'sensor'); f.requests[0].resolve({ok:true,json:async()=>sourceBatch(1,4,true)}); await flush();
    const panel=walk(f.nodes.results,node=>node.className==='pus-details pus-evidence')[0]; panel.children[3].fire('click');
    const response=sourceBatch(5,5,false); response.rows[0].matches[0].url='https://evil.test/steal';
    f.requests[1].resolve({ok:true,json:async()=>response}); await flush();
    assert.equal(panel.children[2].children[0].children[0].children[1].textContent,'<img src=x onerror=alert(1)>');
    assert.equal(walk(panel.children[2],node=>Boolean(node.href)).length,0);
});
