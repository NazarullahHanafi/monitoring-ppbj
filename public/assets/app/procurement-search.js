(function () {
    'use strict';
    const root = document.getElementById('procurementUnifiedSearch');
    if (!root || root.dataset.bound) return;
    root.dataset.bound = 'true';
    const get = name => root.querySelector(`[data-pus-${name}]`);
    const form = get('form'), input = get('query'), scope = get('scope'), status = get('status'), results = get('results');
    const pagination = get('pagination'), submit = form.querySelector('[type="submit"]');
    const filterNames = ['buyer', 'vendor', 'creator', 'exclude'];
    let controller, sequence = 0, currentPage = 1, lastPage = 1, appliedQuery = '', appliedScope = 'all', appliedMatch = 'source', appliedSort = 'relevance', appliedLexical = 'expanded', appliedFilters = {}, pendingKey = '';
    const evidenceControllers = new Set();
    let focusedPr = null;
    let retryPage = null;
    const labels = { ppbj: 'PPBJ', sp: 'SP', spph: 'SPPH', archive_document: 'Arsip', archive_attachment: 'Lampiran arsip', local_sp_attachment: 'Lampiran SP', local_spph_attachment: 'Lampiran SPPH' };
    let coverageController, coverageSequence = 0, coveragePage = 1, coverageLast = 1, coverageSource = null;
    async function loadCoverage(page = 1, source = null) {
        const trigger = get('check-coverage'); if (!trigger) return;
        coverageController?.abort(); const pending = new AbortController(); coverageController = pending;
        const serial = ++coverageSequence, timeout = setTimeout(() => pending.abort(), 20000);
        trigger.disabled = true; get('coverage').hidden = false; get('coverage').open = true;
        get('coverage-info').textContent = 'Memuat catatan kelengkapan…';
        try {
            const url = new URL(trigger.dataset.coverageEndpoint, window.location.origin);
            if (url.origin !== window.location.origin) throw new Error('Alamat audit tidak valid.');
            url.search = new URLSearchParams({ page, ...(source ? { source } : {}) });
            const response = await fetch(url, { headers: { Accept: 'application/json' }, credentials: 'same-origin', signal: pending.signal });
            const data = await readResponse(response); if (serial !== coverageSequence) return;
            const rows = get('coverage-rows'); rows.replaceChildren();
            get('coverage-info').textContent = data.source ? `${data.label} · ${data.total || 'Jumlah belum diketahui'} ${data.unit || 'halaman'}. Diproses otomatis belum berarti setiap karakter sudah diverifikasi.` : `${data.total || 0} lampiran dengan relasi PR yang masih berlaku. Masalah ditampilkan dahulu. Halaman yang belum diproses tetap menunggu antrean.`;
            for (const item of (data.rows || []).slice(0, 25)) {
                const row = element('div', 'pus-related-document');
                if (data.source) {
                    row.append(element('strong', '', `${data.unit || 'Halaman'} ${item.page}: ${item.state}`));
                    if (item.reason) row.append(element('p', 'pus-note', `Catatan: ${item.reason}`));
                    if (item.url) { const anchor = link(item.url, 'Buka halaman asli', 'pus-open'); anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; row.append(anchor); }
                    if (root.dataset.canReview === '1') { const button = element('button', 'pus-secondary', 'Periksa teks & riwayat'); button.type = 'button'; button.addEventListener('click', () => reviewPanel(row, data.source, item.page, button)); row.append(button); }
                } else {
                    const states = { unchecked: 'Belum diaudit', in_progress: 'Belum selesai', review: 'Perlu diperiksa', processed: 'Seluruh halaman diproses otomatis' };
                    row.append(element('strong', '', `${item.label} · ${item.reference || ''}`));
                    row.append(element('p', 'pus-note', `${states[item.coverage_state] || 'Belum diaudit'} · ${item.coverage_checked_at ? item.indexed_pages ?? '?' : '?'}/${item.pages ?? '?'} halaman tersimpan · ${item.problem_pages ?? '?'} halaman perlu diperiksa`));
                    row.append(element('p', 'pus-note', `Audit terakhir: ${item.coverage_checked_at || 'menunggu pemeriksaan berikutnya'}`));
                    if (item.error) row.append(element('p', 'pus-note', item.error));
                    if (Number.isSafeInteger(item.id) && item.id > 0) { const button = element('button', 'pus-secondary pus-page-audit', 'Rincian seluruh halaman'); button.type = 'button'; button.addEventListener('click', () => loadCoverage(1, item.id)); row.append(button); }
                }
                rows.append(row);
            }
            coveragePage = data.page; coverageLast = data.last_page; coverageSource = data.source || null;
            get('coverage-page').textContent = `${coveragePage} / ${coverageLast}`;
            get('coverage-prev').disabled = coveragePage <= 1; get('coverage-next').disabled = coveragePage >= coverageLast; get('coverage-back').hidden = !coverageSource;
        } catch (error) { if (serial === coverageSequence) get('coverage-info').textContent = error.name === 'AbortError' ? 'Audit belum dapat dimuat. Klik untuk mencoba lagi.' : error.message; }
        finally { clearTimeout(timeout); if (serial === coverageSequence) trigger.disabled = false; }
    }
    get('check-coverage')?.addEventListener('click', () => loadCoverage());
    get('coverage-prev')?.addEventListener('click', () => loadCoverage(Math.max(1, coveragePage - 1), coverageSource));
    get('coverage-next')?.addEventListener('click', () => loadCoverage(coveragePage + 1, coverageSource));
    get('coverage-back')?.addEventListener('click', () => loadCoverage());
    async function reviewPanel(row, source, page, trigger) {
        if (trigger.disabled) return; trigger.disabled = true;
        const serial = coverageSequence, pending = new AbortController(); evidenceControllers.add(pending); const timeout = setTimeout(() => pending.abort(), 20000);
        const panel = element('div', 'pus-details'), message = element('p', 'pus-note', 'Memuat teks untuk pemeriksaan…'); panel.append(message); row.append(panel);
        try {
            const url = new URL(`${root.dataset.reviewBase}/${source}/${page}`, window.location.origin); if (url.origin !== window.location.origin) throw Error('Alamat pemeriksaan tidak valid.');
            const data = await readResponse(await fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' }, signal: pending.signal })); if (serial !== coverageSequence) return;
            const editor = element('textarea', 'pus-review-text'); editor.value = data.text || ''; editor.maxLength = 1000000; editor.rows = 12;
            const reason = element('textarea'); reason.maxLength = 1000; reason.rows = 2; reason.placeholder = 'Alasan koreksi dan bagian yang dicocokkan dengan file asli';
            const textLabel = element('label', 'pus-field', 'Teks sesuai file asli'); textLabel.append(editor);
            const reasonLabel = element('label', 'pus-field', 'Catatan pemeriksaan (minimal 8 karakter)'); reasonLabel.append(reason);
            const blank = element('input'); blank.type = 'checkbox'; blank.className = 'pus-blank-check'; const blankLabel = element('label', '', 'Saya sudah memeriksa file asli dan bagian ini tidak memiliki teks'); blankLabel.append(blank);
            const save = element('button', 'pus-primary', 'Simpan pemeriksaan'); save.type = 'button'; save.disabled = data.pending || root.dataset.canPrioritize !== '1';
            const close = element('button', 'pus-secondary', 'Tutup'); close.type = 'button'; close.addEventListener('click', () => { panel.replaceChildren(); panel.hidden = true; trigger.disabled = false; });
            message.textContent = data.pending ? 'Pemeriksaan sebelumnya masih menunggu pembaruan indeks. Muat lagi untuk melihat hasilnya.' : 'Cocokkan dengan file asli. Koreksi dicatat beserta pemeriksanya dan diterapkan di latar belakang.';
            panel.append(textLabel, reasonLabel, blankLabel, save, close);
            if (data.url) { const original = link(data.url, 'Buka file asli untuk pencocokan', 'pus-open'); original.target = '_blank'; original.rel = 'noopener noreferrer'; panel.append(original); }
            for (const history of data.history || []) panel.append(element('p', 'pus-note', `${history.created_at} · ${history.name || 'Pemeriksa'} · ${history.state} · ${history.reason}`));
            let busy = false;
            save.addEventListener('click', async () => {
                if (busy) return; if ((!editor.value.trim() && !blank.checked) || reason.value.trim().length < 8) { message.textContent = 'Isi teks atau konfirmasi bagian tanpa teks, beserta alasan minimal 8 karakter.'; return; }
                busy = true; save.disabled = true; const request = new AbortController(); evidenceControllers.add(request); const wait = setTimeout(() => request.abort(), 20000);
                try {
                    const result = await readResponse(await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': root.dataset.csrf || '' }, signal: request.signal, body: JSON.stringify({ text: editor.value, confirm_blank: Boolean(blank.checked), reason: reason.value, version: data.version }) }));
                    if (serial === coverageSequence) { message.textContent = result.message; editor.disabled = reason.disabled = true; }
                } catch (error) { if (serial === coverageSequence) message.textContent = error.name === 'AbortError' ? 'Respons terlambat. Muat ulang riwayat untuk memastikan apakah pemeriksaan sudah tersimpan.' : error.message; save.disabled = false; }
                finally { clearTimeout(wait); evidenceControllers.delete(request); busy = false; }
            });
        } catch (error) { if (serial === coverageSequence) message.textContent = error.message; trigger.disabled = false; }
        finally { clearTimeout(timeout); evidenceControllers.delete(pending); }
    }
    let catalogController, catalogSerial = 0, catalogQuery = '', catalogAfter = 0;
    async function loadCatalog(more = false) {
        if (!get('catalog-form')) return; const query = more ? catalogQuery : get('catalog-query').value.trim(); if (!query) return;
        catalogController?.abort(); const pending = new AbortController(); catalogController = pending; const serial = ++catalogSerial, timeout = setTimeout(() => pending.abort(), 20000);
        get('catalog-more').disabled = true; get('catalog-info').textContent = 'Mencari arsip…';
        try {
            const url = new URL(get('catalog-form').dataset.endpoint, window.location.origin); if (url.origin !== window.location.origin) throw Error('Alamat arsip tidak valid.');
            url.search = new URLSearchParams({ q: query, after: more ? catalogAfter : 0 }); const data = await readResponse(await fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' }, signal: pending.signal })); if (serial !== catalogSerial) return;
            if (!more) get('catalog-rows').replaceChildren();
            for (const item of (data.rows || []).slice(0, 15)) {
                const row = element('div', 'pus-related-document'); row.append(element('strong', '', item.label), element('p', 'pus-note', `${item.reference || ''} · ${item.page || 0}/${item.pages || '?'} halaman · ${item.state}`));
                if (item.url) { const anchor = link(item.url, 'Buka file arsip', 'pus-open'); anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; row.append(anchor); }
                for (const pr of item.prs || []) row.append(link(pr.url, pr.number, 'pus-open'));
                if (!(item.prs || []).length) row.append(element('p', 'pus-note', 'Belum ada relasi PR yang tercatat.'));
                if (Number.isSafeInteger(item.id) && item.id > 0) row.append(pageEvidencePanel(item, {query: {used: [query]}}));
                get('catalog-rows').append(row);
            }
            catalogQuery = query; catalogAfter = data.after; get('catalog-more').hidden = !data.has_more;
            get('catalog-info').textContent = (data.rows || []).length ? 'Kecocokan pada file arsip yang sudah masuk indeks.' : 'Belum ditemukan pada bagian yang sudah diindeks.';
        } catch (error) { if (serial === catalogSerial) get('catalog-info').textContent = error.message; }
        finally { clearTimeout(timeout); if (serial === catalogSerial) get('catalog-more').disabled = false; }
    }
    get('catalog-form')?.addEventListener('submit', event => { event.preventDefault(); loadCatalog(); });
    get('catalog-more')?.addEventListener('click', () => loadCatalog(true));
    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = String(text);
        return node;
    }
    function link(href, text, className) {
        const node = element('a', className, text);
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return element('span', className, text);
        if (/^\/virtual-office\/hologram\/(ppbj|sp|spph)$/.test(window.location.pathname || '') && /^\/(ppbj|sp|spph)$/.test(url.pathname)) {
            url.pathname = '/virtual-office/hologram' + url.pathname;
            const frame = new URLSearchParams(window.location.search).get('office_frame') || '';
            if (/^\d{1,12}$/.test(frame)) url.searchParams.set('office_frame', frame);
        }
        node.href = url.pathname + url.search + (/^#page=[1-9]\d{0,5}$/.test(url.hash) ? url.hash : '');
        return node;
    }
    function snippet(text, data) {
        const node = element('p', 'pus-snippet');
        text = String(text || '');
        const words = (data.query?.used || appliedQuery.toLowerCase().split(/[^a-z0-9]+/)).flatMap(word => [word, ...(data.equivalents?.[word] || [])]);
        const needles = [...new Set(words)].filter(word => /^[a-z0-9]{1,96}$/i.test(word)).slice(0, 64).sort((a, b) => b.length-a.length);
        const pattern = needles.length ? new RegExp('\\b(?:' + needles.join('|') + ')' + (data.lexical === 'exact' ? '\\b' : ''), 'ig') : null;
        const hits = pattern ? [...text.matchAll(pattern)] : [];
        if (!hits.length) { node.textContent = text; return node; }
        let position = 0;
        for (const hit of hits) {
            if (hit.index > position) node.append(element('span', '', text.slice(position, hit.index)));
            node.append(element('mark', '', hit[0]));
            position = hit.index + hit[0].length;
        }
        if (position < text.length) node.append(element('span', '', text.slice(position)));
        return node;
    }
    function field(list, label, value) {
        const pair = element('div');
        pair.append(element('dt', '', label), element('dd', '', value == null || value === '' ? 'Belum tercatat' : value));
        list.append(pair);
    }
    function contextSummary(info) {
        const list = element('dl', 'pus-context');
        const sp = (info.documents || []).find(doc => doc.kind === 'sp' && doc.vendors?.length);
        const spph = (info.documents || []).find(doc => doc.kind === 'spph' && doc.vendors?.length);
        field(list, 'Buyer / PIC PPBJ', info.buyer);
        field(list, info.vendor ? 'Vendor tercatat di PPBJ' : sp ? 'Vendor pada SP terbaru' : spph ? 'Kandidat SPPH terbaru' : 'Vendor tercatat di PPBJ',
            info.vendor || (sp || spph)?.vendors.join('; '));
        field(list, 'Pembuat TOR / PR', info.creator);
        return list;
    }
    function contextDetails(info) {
        const details = element('details', 'pus-details');
        details.append(element('summary', '', 'Asal PR, penanggung jawab & dokumen terkait'));
        const list = element('dl', 'pus-detail-fields');
        field(list, 'Tanggal PPBJ', info.recorded_at);
        field(list, 'Registrasi Umum', info.registration);
        field(list, 'Status tercatat', info.status);
        field(list, 'Progress tercatat', info.progress == null ? null : `${info.progress}%`);
        for (const group of ['source_fields', 'receipt_fields', 'management_fields']) {
            for (const item of info.provenance?.[group] || []) {
                const value = item.type === 'money' && item.value !== '' && item.value != null && Number.isFinite(Number(item.value))
                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.value)) : item.value;
                field(list, item.label, value);
            }
        }
        for (const signer of info.provenance?.signatures || []) field(list, signer.role, `${signer.name} · ${signer.date} · ${signer.status}`);
        details.append(list);
        const docs = element('div', 'pus-related');
        for (const doc of info.documents || []) {
            const item = element('dl', 'pus-detail-fields pus-related-document');
            field(item, doc.kind === 'sp' ? 'SP terkait' : 'SPPH terkait', doc.number);
            field(item, doc.kind === 'sp' ? 'Vendor pada SP' : 'Kandidat vendor penawaran', (doc.vendors || []).join('; '));
            field(item, 'PIC dokumen', doc.pic); field(item, 'Tanggal dokumen', doc.date);
            docs.append(item);
        }
        if (!(info.documents || []).length) docs.append(element('p', 'pus-note', 'SP/SPPH terkait belum tercatat.'));
        if (info.documents_truncated) docs.append(element('p', 'pus-note', 'Menampilkan 5 SP dan 5 SPPH terbaru per PR. Buka menu dokumen untuk melihat seluruhnya.'));
        details.append(docs);
        if (info.provenance?.notice) details.append(element('p', 'pus-note', info.provenance.notice));
        return details;
    }
    function matchElement(match, data) {
        const item = element('div', 'pus-match'), source = element('div', 'pus-source');
        source.append(element('span', 'pus-badge', labels[match.kind] || 'Dokumen'), element('strong', '', match.label));
        const file = match.kind.startsWith('archive_') || match.kind.startsWith('local_');
        if (file) source.append(element('span', 'pus-badge', ['pending', 'partial', 'failed', 'enhance'].includes(match.state) ? `Isi diproses · ${match.page || 0}/${match.pages || '?'} halaman` : 'Hasil pembacaan otomatis'));
        if (match.queue?.priority) source.append(element('span', 'pus-badge', 'Giliran prioritas aktif'));
        if (['uncertain', 'empty', 'limited', 'unsupported'].includes(match.state)) source.append(element('span', 'pus-badge', 'Perlu diperiksa'));
        if (match.inferred) source.append(element('span', 'pus-badge', 'Nomor PR terbaca dari scan · periksa kecocokan'));
        const engines = { 'pdfjs-6-text': 'Teks asli PDF', 'pdfjs-6-tesseract-7': 'Teks PDF + scan', 'tesseract-7-ind-eng': 'Scan / foto', 'office-text': 'Teks dokumen', 'office-image-ocr': 'OCR gambar Office', 'human-review': 'Teks hasil pemeriksaan' };
        if (engines[match.reading?.engine]) source.append(element('span', 'pus-badge', engines[match.reading.engine]));
        if (match.reading?.confidence != null && match.reading.confidence < 55) source.append(element('span', 'pus-badge pus-warning', 'Bacaan kurang jelas · periksa file asli'));
        if (match.match_page) source.append(element('span', 'pus-badge pus-page-hit', `Ketemu di halaman ${match.match_page}`));
        if (data.match === 'related' && match.matched_words?.length) source.append(element('span', 'pus-badge', `Kata cocok: ${match.matched_words.join(', ')}`));
        if (data.match === 'reference') source.append(element('span', 'pus-badge', `Nomor persis: ${match.reference || ''}`));
        item.append(source, snippet(match.snippet, data));
        if (match.url) {
            const anchor = link(match.url, file ? (match.match_page ? `Buka halaman ${match.match_page} ↗` : 'Buka lampiran ↗') : 'Buka dokumen →', 'pus-open');
            if (file) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
            item.append(anchor);
        }
        if (match.notice) item.append(element('p', 'pus-read-notice', match.notice));
        if (match.word_evidence?.length) {
            const details = element('details', 'pus-word-evidence');
            details.append(element('summary', '', 'Bukti kecocokan per kata'));
            details.append(element('p', 'pus-note', 'Lokasi pertama yang tercatat di indeks; kata dapat muncul lagi di halaman lain.'));
            const list = element('ul', 'pus-word-locations');
            for (const hit of match.word_evidence.slice(0, 16)) {
                const row = element('li');
                const type = { exact: 'Kata utuh', prefix: 'Awalan', equivalent: 'Padanan' }[hit.type] || 'Kecocokan';
                row.append(element('span', '', `${hit.word}${hit.word === hit.matched ? '' : ` → ${hit.matched}`} · ${type}`));
                const page = hit.location === 'page' && Number.isSafeInteger(hit.page) && hit.page > 0 && hit.page <= 2000 ? hit.page : null;
                if (page && typeof hit.url === 'string') {
                    const anchor = link(hit.url, `Halaman ${page}`, 'pus-open'); anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; row.append(anchor);
                } else row.append(element('span', '', page ? `Halaman ${page}` : hit.location === 'document' ? 'Data dokumen' : 'Lokasi belum tercatat'));
                list.append(row);
            }
            details.append(list); item.append(details);
        }
        if (file && Number.isSafeInteger(match.id) && match.id > 0) item.append(pageEvidencePanel(match, data));
        return item;
    }
    function pageEvidencePanel(match, data) {
        const panel = element('details', 'pus-details pus-page-evidence');
        panel.append(element('summary', '', 'Penelusur bukti halaman'));
        panel.append(element('p', 'pus-note', 'Cari pada halaman yang sudah tersimpan: kata utuh tanpa padanan atau frasa berurutan. Spasi/tanda baca umum disetarakan; angka dan pecahan tetap utuh.'));
        const controls = element('form'), field = element('input'), mode = element('select');
        field.type = 'search'; field.required = true; field.maxLength = 255;
        field.value = (match.word_evidence || []).map(hit => hit.matched).join(' ') || (data.query?.used || []).join(' ') || appliedQuery;
        const fieldLabel = element('label', 'pus-field', 'Cari di lampiran ini'); fieldLabel.append(field);
        const modeLabel = element('label', 'pus-scope', 'Bukti yang dicari');
        for (const [value, label] of [['words', 'Semua kata di halaman yang sama'], ['phrase', 'Frasa tepat berurutan']]) { const option = element('option', '', label); option.value = value; mode.append(option); }
        mode.value = 'words'; modeLabel.append(mode);
        const search = element('button', 'pus-primary', 'Telusuri'); search.type = 'submit';
        const more = element('button', 'pus-secondary', 'Lanjutkan penelusuran'), cancel = element('button', 'pus-secondary', 'Batal muat'); more.type = cancel.type = 'button'; more.hidden = cancel.hidden = true;
        const message = element('p', 'pus-note', 'Tidak ada permintaan tambahan sebelum Anda menekan Telusuri.'), list = element('div', 'pus-page-results'); message.setAttribute?.('role', 'status');
        controls.append(fieldLabel, modeLabel, search); panel.append(controls, message, list, more, cancel);
        let after = 0, version = '', params, busy = false, pending, scanned = 0, found = 0;
        const seen = new Set();
        cancel.addEventListener('click', () => pending?.abort());
        async function load() {
            if (busy || !params) return;
            busy = true; search.disabled = more.disabled = true; cancel.hidden = false;
            const serial = sequence; pending = new AbortController(); const request = pending; evidenceControllers.add(request);
            const timeout = setTimeout(() => request.abort(), 20000);
            message.textContent = 'Menelusuri satu kelompok halaman…';
            try {
                const url = new URL(`${root.dataset.pageEvidenceBase || '/procurement/search/files'}/${match.id}/evidence`, window.location.origin);
                if (url.origin !== window.location.origin) throw Error('Alamat bukti tidak valid.');
                url.search = new URLSearchParams({...params, after, ...(version ? {version} : {})});
                const next = await readResponse(await fetch(url, {headers: {Accept: 'application/json'}, credentials: 'same-origin', signal: request.signal}));
                if (serial !== sequence || request.signal.aborted) return;
                if (next.source !== match.id || !Number.isSafeInteger(next.after) || next.after < after || (next.has_more && next.after <= after) || !/^[a-f0-9]{64}$/.test(next.version || '')) throw Error('Posisi bukti berubah. Klik Telusuri untuk memulai lagi.');
                for (const row of next.rows || []) {
                    if (!Number.isSafeInteger(row.page) || row.page < 1 || seen.has(row.page)) continue;
                    seen.add(row.page); found++;
                    const card = element('div', 'pus-page-result'); card.append(element('strong', '', `${next.unit === 'Bagian' ? 'Bagian' : 'Halaman'} ${row.page}`));
                    card.append(snippet(row.snippet || '', {query: {used: params.q.toLowerCase().split(/[^a-z0-9]+/)} , lexical: 'exact'}));
                    if (row.reading?.reviewed) card.append(element('span', 'pus-badge', 'Sudah diperiksa manusia'));
                    if (row.url) { const anchor = link(row.url, 'Buka sumber asli ↗', 'pus-open'); anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; card.append(anchor); }
                    list.append(card);
                }
                for (const issue of next.issues || []) list.append(element('p', 'pus-read-notice', `${next.unit === 'Bagian' ? 'Bagian' : 'Halaman'} ${issue.page}: ${issue.reason}`));
                scanned += Number(next.scanned) || 0; after = next.after; version = next.version; more.hidden = !next.has_more;
                const unit = next.unit === 'Bagian' ? 'bagian' : 'halaman';
                message.textContent = `“${params.q}” · ${params.mode === 'phrase' ? 'Frasa berurutan' : 'Kata utuh'}. ${found} ${unit} cocok dari ${scanned} ditelusuri. ${next.stored ?? '?'}/${next.pages ?? '?'} ${unit} tersimpan. ${next.has_more ? 'Lanjutkan untuk kelompok berikutnya.' : 'Selesai menelusuri bagian yang tersedia.'} ${next.index_complete ? '' : 'Indeks belum lengkap.'}${next.unit === 'Bagian' ? ' Bagian Office bukan nomor halaman cetak.' : ''}`;
            } catch (error) {
                if (serial === sequence) message.textContent = error.name === 'AbortError' ? 'Pemuatan dihentikan. Hasil sebelumnya tetap ada; klik Lanjutkan atau Telusuri untuk mencoba lagi.' : `${error.message} Klik Telusuri untuk memulai ulang bila bacaan berubah.`;
            } finally {
                clearTimeout(timeout); evidenceControllers.delete(request); busy = false; search.disabled = more.disabled = false; cancel.hidden = true;
            }
        }
        controls.addEventListener('submit', event => { event.preventDefault(); if (busy || !field.value.trim()) return; params = {q: field.value.trim(), mode: mode.value}; after = scanned = found = 0; version = ''; seen.clear(); list.replaceChildren(); more.hidden = true; load(); });
        more.addEventListener('click', load);
        return panel;
    }
    async function readResponse(response) {
        if (!response.ok) {
            let message = response.status === 429 ? 'Pencarian terlalu sering. Tunggu sebentar, lalu coba lagi.' : response.status === 409 ? 'Bacaan berubah atau pemeriksaan sebelumnya masih diproses. Muat ulang teks dan riwayat.' : response.status === 422 ? 'Periksa kata pencarian dan pilihan sumber.' : 'Pencarian belum dapat dimuat. Coba kembali.';
            if (response.status === 422) {
                try {
                    const details = await response.json();
                    const validation = Object.values(details.errors || {}).flat().find(value => typeof value === 'string' && value.length <= 240);
                    if (validation) message = validation;
                } catch (error) { if (error.name === 'AbortError') throw error; }
            }
            throw new Error(message);
        }
        let data;
        try { data = await response.json(); } catch (error) {
            if (error.name === 'AbortError') throw error;
            throw new Error('Hasil belum dapat dibaca. Muat ulang halaman dan coba kembali.');
        }
        return data;
    }
    function cancelEvidence() {
        for (const pending of evidenceControllers) pending.abort();
        evidenceControllers.clear();
    }
    function evidencePanel(row) {
        const panel = element('details', 'pus-details pus-evidence');
        panel.append(element('summary', '', 'Telusuri sumber lainnya pada PR ini'));
        const list = element('div', 'pus-matches'), message = element('p', 'pus-note', 'Lampiran tambahan dimuat saat Anda meminta.');
        message.setAttribute?.('role', 'status');
        const button = element('button', 'pus-secondary pus-evidence-load', 'Muat sumber lainnya'); button.type = 'button';
        panel.append(message, list, button);
        const params = { q: appliedQuery, scope: appliedScope, match: appliedMatch, sort: appliedSort, lexical: appliedLexical, ...appliedFilters, pr: row.id, page: 1 };
        const seen = new Set((row.matches || []).map(source => source.id));
        let after = 0, busy = false;
        button.addEventListener('click', async () => {
            if (busy) return;
            busy = true; button.disabled = true;
            const serial = sequence, pending = new AbortController(); evidenceControllers.add(pending);
            const timeout = setTimeout(() => pending.abort(), 20000);
            message.textContent = 'Memuat bukti tambahan…';
            try {
                const url = new URL(root.dataset.endpoint, window.location.origin);
                url.search = new URLSearchParams({ ...params, after });
                const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: pending.signal, credentials: 'same-origin' });
                if (serial !== sequence) return;
                const next = await readResponse(response);
                if (serial !== sequence) return;
                const result = (next.rows || []).find(item => Number(item.id) === Number(row.id));
                const sources = (result?.matches || []).slice(0, 8);
                const cursor = result?.evidence?.after;
                if (result?.evidence?.has_more && (!Number.isSafeInteger(cursor) || cursor <= after)) throw new Error('Bukti belum dapat dilanjutkan. Coba kembali.');
                for (const source of sources) {
                    if (!Number.isSafeInteger(source.id) || seen.has(source.id)) continue;
                    seen.add(source.id); list.append(matchElement(source, next));
                }
                after = Number.isSafeInteger(cursor) ? cursor : after;
                button.hidden = !result?.evidence?.has_more;
                button.textContent = 'Muat 8 sumber berikutnya';
                message.textContent = result ? (button.hidden ? 'Seluruh sumber cocok yang tersedia saat ini sudah ditampilkan.' : 'Masih ada sumber. Muat bertahap untuk melanjutkan.') : 'PR atau sumbernya sudah berubah. Jalankan pencarian lagi untuk memperbarui hasil.';
            } catch (error) {
                if (serial !== sequence) return;
                message.textContent = error.name === 'AbortError' ? 'Pemuatan terlalu lama. Klik untuk mencoba lagi.' : error.message === 'Failed to fetch' ? 'Koneksi terputus. Klik untuk mencoba lagi.' : error.message;
            } finally {
                clearTimeout(timeout); evidenceControllers.delete(pending); busy = false; button.disabled = false;
            }
        });
        return panel;
    }
    function showProgress(index) {
        const backlog = (index?.pending || 0) + (index?.partial || 0), progress = [];
        if (backlog) progress.push(`${backlog} lampiran diproses bertahap; isi yang sudah terbaca langsung bisa dicari.`);
        if (index?.failed) progress.push(`${index.failed} lampiran belum berhasil dibaca seluruhnya.`);
        if (index?.enhancement_waiting) progress.push(`${index.enhancement_waiting} lampiran menunggu pemulihan pada pekerja OCR terpisah.`);
        if (index?.missing_files) progress.push(`${index.missing_files} catatan arsip belum mempunyai file sumber yang tersedia; pulihkan file asli dari cadangan.`);
        if (index?.needs_review) progress.push(`${index.needs_review} lampiran perlu diperiksa karena teks/formatnya belum dapat dibaca seluruhnya.`);
        if (index?.unreadable_pages) progress.push(`${index.unreadable_pages} halaman bermasalah ditandai untuk diperiksa; halaman lain tetap diproses.`);
        if (index?.unlinked_files) progress.push(`${index.unlinked_files} arsip menunggu relasi PR yang valid sebelum bisa muncul sebagai hasil PR.`);
        if (index?.files_unmapped) progress.push(`${index.files_unmapped} berkas masih didata jumlah halamannya.`);
        if (index?.archive_state === 'deferred') progress.push('Sinkronisasi arsip sedang tertunda; hasil kedaluwarsa disembunyikan sementara.');
        if (index?.state === 'starting') progress.push('Indeks awal sedang disiapkan.');
        if (index?.coverage) progress.push(`Audit: ${index.coverage.processed_files || 0} file seluruh halamannya diproses otomatis, ${index.coverage.review_files || 0} perlu pemeriksaan, ${index.coverage.unchecked_files || 0} belum diaudit. ${index.coverage.problem_pages || 0} halaman bermasalah. Ini belum membuktikan ketepatan setiap karakter.`);
        if (Number.isFinite(index?.waiting)) progress.push(`${index.waiting} lampiran siap menunggu giliran; ${index.priority_waiting || 0} di antaranya prioritas.`);
        if (index?.checked_at) {
            const checked = new Date(index.checked_at);
            if (Number.isFinite(checked.getTime())) {
                progress.push('Pembaruan terakhir: ' + checked.toLocaleString('id-ID') + '.');
                if (Date.now() - checked.getTime() > 180000) progress.push('Status belum diperbarui lebih dari 3 menit; jadwal pemrosesan mungkin tertunda.');
            }
        }
        if (!progress.length) progress.push('Status pembacaan belum tersedia.');
        if (get('progress') && get('progressinfo')) {
            get('progress').hidden = progress.length === 0;
            get('progressinfo').textContent = progress.join(' ');
        } else if (progress.length) status.textContent += ' ' + progress.join(' ');
    }
    function queuePanel(row) {
        const panel = element('details', 'pus-details pus-queue');
        panel.append(element('summary', '', 'Kesiapan lampiran PR ini'));
        const message = element('p', 'pus-note', 'Minta giliran untuk maksimal 3 lampiran, hingga 4 halaman berikutnya per lampiran. Arsip lama tetap mendapat giliran.');
        const button = element('button', 'pus-secondary pus-priority', 'Dahulukan lampiran PR ini'); button.type = 'button';
        message.setAttribute?.('role', 'status'); panel.append(message, button);
        let busy = false;
        button.addEventListener('click', async () => {
            if (busy || button.disabled) return;
            busy = true; button.disabled = true;
            const pending = new AbortController(), serial = sequence; evidenceControllers.add(pending);
            const timeout = setTimeout(() => pending.abort(), 20000);
            let accepted = false;
            try {
                const url = new URL(root.dataset.priorityBase + '/' + row.id + '/priority', window.location.origin);
                if (url.origin !== window.location.origin || !root.dataset.csrf) throw new Error('Muat ulang halaman sebelum meminta prioritas.');
                const response = await fetch(url, { method: 'POST', headers: { Accept: 'application/json', 'X-CSRF-TOKEN': root.dataset.csrf }, signal: pending.signal, credentials: 'same-origin' });
                if (response.status === 403) throw new Error('Akun atau mode saat ini tidak mengizinkan permintaan prioritas.');
                if (response.status === 419) throw new Error('Sesi berakhir. Muat ulang halaman lalu coba lagi.');
                const result = await readResponse(response);
                if (serial !== sequence) return;
                message.textContent = result.message || 'Permintaan selesai. Cari ulang nanti untuk melihat teks yang baru terbaca.';
                accepted = Boolean(result.queued || result.cooldown);
                if (accepted) button.textContent = 'Prioritas sudah diminta';
            } catch (error) {
                if (serial === sequence) message.textContent = error.name === 'AbortError' ? 'Respons belum diterima. Periksa status sebelum mencoba lagi; permintaan mungkin sudah diproses.' : error.message;
            } finally {
                clearTimeout(timeout); evidenceControllers.delete(pending); busy = false; button.disabled = accepted;
            }
        });
        return panel;
    }
    get('check-status')?.addEventListener('click', async () => {
        const button = get('check-status'); if (button.disabled) return;
        button.disabled = true;
        const pending = new AbortController(), serial = sequence; evidenceControllers.add(pending);
        const timeout = setTimeout(() => pending.abort(), 20000);
        try {
            const url = new URL(root.dataset.statusEndpoint, window.location.origin);
            if (url.origin !== window.location.origin) throw new Error('Alamat status tidak valid.');
            const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: pending.signal, credentials: 'same-origin' });
            const result = await readResponse(response);
            if (serial !== sequence) return;
            showProgress(result.index); if (get('progress')) get('progress').open = true;
        } catch (error) {
            if (serial === sequence && get('progress') && get('progressinfo')) {
                get('progress').hidden = false; get('progress').open = true;
                get('progressinfo').textContent = error.name === 'AbortError' ? 'Status belum dapat dimuat. Klik untuk mencoba lagi.' : error.message;
            }
        } finally { clearTimeout(timeout); evidenceControllers.delete(pending); button.disabled = false; }
    });
    function searchUrl(page, totals) {
        const url = new URL(root.dataset.endpoint, window.location.origin);
        url.search = new URLSearchParams({ q: appliedQuery, scope: appliedScope, match: appliedMatch, sort: appliedSort, lexical: appliedLexical, page, ...appliedFilters, totals });
        return url;
    }
    function restoreAppliedFields() {
        input.value = appliedQuery; scope.value = appliedScope;
        for (const [name, value] of [['match', appliedMatch], ['sort', appliedSort], ['lexical', appliedLexical]]) if (get(name)) get(name).value = value;
        for (const name of filterNames) if (get(name)) get(name).value = appliedFilters[name] || '';
    }
    function showFocus() {
        if (get('focus')) get('focus').hidden = !focusedPr;
        if (get('focus-label')) get('focus-label').textContent = focusedPr ? `Fokus PR: ${focusedPr.number}` : '';
        submit.textContent = focusedPr ? 'Cari di PR ini' : 'Cari di semua PR';
    }
    get('focus-clear')?.addEventListener('click', () => {
        if (!focusedPr) return;
        focusedPr = null; delete appliedFilters.pr_id; showFocus(); restoreAppliedFields(); search();
    });
    function totalButton(summary) {
        const button = element('button', 'pus-secondary', focusedPr ? 'Hitung hasil PR ini' : 'Hitung seluruh PR'); button.type = 'button';
        const message = element('span', 'pus-note', 'Total dihitung hanya saat diperlukan.');
        const url = searchUrl(1, 'only'), serial = sequence;
        button.addEventListener('click', async () => {
            if (button.disabled || serial !== sequence) return;
            const pending = new AbortController(); evidenceControllers.add(pending);
            const timeout = setTimeout(() => pending.abort(), 20000);
            button.disabled = true; message.textContent = 'Menghitung PR sesuai pencarian yang diterapkan…';
            try {
                const response = await fetch(url, {headers: {Accept: 'application/json'}, credentials: 'same-origin', signal: pending.signal});
                const result = await readResponse(response);
                if (serial !== sequence) return;
                if (pending.signal.aborted) throw Error('Perhitungan terlalu lama. Coba lagi bila diperlukan.');
                if (!Number.isSafeInteger(result.total) || result.total < 0 || result.totals !== 'only') throw Error('Total belum dapat diverifikasi. Coba lagi.');
                message.textContent = `Total saat dihitung: ${result.total.toLocaleString('id-ID')} PR. Arsip baru dapat mengubah hasil.`;
                button.hidden = true;
            } catch (error) {
                if (serial === sequence && !pending.signal.aborted) message.textContent = error.message;
                else if (serial === sequence) message.textContent = 'Perhitungan terlalu lama. Coba lagi bila diperlukan.';
            } finally { clearTimeout(timeout); evidenceControllers.delete(pending); button.disabled = false; }
        });
        summary.append(button, message);
    }
    function render(data) {
        results.replaceChildren();
        const deferred = data.totals === 'deferred', hasResults = (data.rows || []).length > 0 || data.total > 0;
        const suggestions = get('suggestions');
        if (suggestions) {
            suggestions.replaceChildren();
            for (const suggestion of (data.suggestions || []).slice(0, 4)) {
                if (typeof suggestion.query !== 'string' || !suggestion.query.trim() || suggestion.query.length > 255) continue;
                const button = element('button', 'pus-suggestion', `Coba “${suggestion.replacement}”`);
                button.type = 'button'; button.title = `Perbaiki “${suggestion.word}” menjadi “${suggestion.replacement}”`;
                button.addEventListener('click', () => {
                    input.value = suggestion.query; appliedQuery = suggestion.query; scope.value = appliedScope;
                    if (get('match')) get('match').value = appliedMatch;
                    if (get('sort')) get('sort').value = appliedSort;
                    if (get('lexical')) get('lexical').value = appliedLexical;
                    for (const name of filterNames) if (get(name)) get(name).value = appliedFilters[name] || '';
                    search();
                });
                suggestions.append(button);
            }
            suggestions.hidden = suggestions.children.length === 0;
        }
        const summary = get('summary');
        if (summary) {
            summary.hidden = false;
            const range = (data.rows || []).length ? `Menampilkan PR ${(data.page - 1) * 10 + 1}–${(data.page - 1) * 10 + data.rows.length}` : 'Tidak ada PR pada halaman ini';
            summary.replaceChildren(element('strong', '', deferred ? range : `${data.total || 0} PR ditemukan`), element('span', '', data.elapsed_ms ? `Selesai dalam ${(data.elapsed_ms / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 })} detik` : 'Hasil dikelompokkan per PR'));
            if (deferred) totalButton(summary);
            if (data.index?.pages_known) summary.append(element('span', '', `${data.index.pages_processed || 0}/${data.index.pages_known} halaman terpetakan sudah diproses`));
        }
        for (const row of data.rows || []) {
            const card = element('article', 'pus-card');
            const heading = element('div', 'pus-card-head'), title = element('div');
            title.append(element('h3', 'pus-number', row.number), element('p', 'pus-description', row.description));
            heading.append(title, element('span', 'pus-pill', row.portfolio || 'PR terkait'));
            card.append(heading);
            if (row.context) card.append(contextSummary(row.context));
            if (row.relevance?.reason) card.append(element('p', 'pus-relevance', row.relevance.reason));
            const matches = element('div', 'pus-matches');
            for (const match of row.matches || []) matches.append(matchElement(match, data));
            card.append(matches);
            const links = element('div', 'pus-links');
            for (const [kind, href] of Object.entries(row.links || {})) links.append(link(href, `Buka ${labels[kind] || kind} →`, ''));
            card.append(links);
            if (!focusedPr && Number.isSafeInteger(row.id) && row.id > 0 && typeof row.number === 'string' && row.number.length <= 255) {
                const focus = element('button', 'pus-secondary pus-focus-button', 'Fokus PR ini'); focus.type = 'button';
                focus.title = `Lanjutkan pencarian hanya pada ${row.number}`;
                const serial = sequence;
                focus.addEventListener('click', () => {
                    if (serial !== sequence) return;
                    focusedPr = {id: row.id, number: row.number}; appliedFilters = {...appliedFilters, pr_id: row.id};
                    showFocus(); restoreAppliedFields(); search(); input.focus?.();
                });
                card.append(focus);
            }
            if (row.context) card.append(contextDetails(row.context));
            if (row.more_sources && Number.isSafeInteger(row.id) && row.id > 0) card.append(evidencePanel(row));
            if (root.dataset.canPrioritize === '1' && Number.isSafeInteger(row.id) && row.id > 0) card.append(queuePanel(row));
            results.append(card);
        }
        status.textContent = hasResults ? `${deferred ? 'Hasil' : `${data.total} PR`} cocok untuk “${appliedQuery}”. Ditampilkan per PR agar hubungan dokumennya jelas.` : 'Belum ada PR yang cocok. Coba kata yang lebih singkat atau pilih semua sumber.';
        if (data.query?.missing?.length) {
            const missing = data.query.missing.map(word => `“${word}”`).join(', ');
            status.textContent = `Kata ${missing} belum ketemu di indeks sumber ini, cuy.`;
            if (data.query.used?.length) status.textContent += hasResults ? ` Tapi “${data.query.used.join(' ')}” ketemu! ${deferred ? 'Berikut PR' : `Ini ${data.total} PR`} yang cocok.` : ` Kata “${data.query.used.join(' ')}” ada, tapi belum ketemu bersamaan dalam ${data.match === 'related' ? 'PR yang sama' : 'satu dokumen'}. Coba cari salah satunya dulu.`;
            else status.textContent += ' Coba kata yang lebih singkat atau pilih semua sumber, ya.';
        } else if (!hasResults && !data.query?.strict && data.query?.used?.length > 1 && !/[0-9=<>"']/.test(appliedQuery)) {
            status.textContent = `Kata-katanya ada, cuy, tapi belum ketemu bersamaan dalam ${data.match === 'related' ? 'PR yang sama' : 'satu dokumen'}. Coba cari salah satu kata atau pilih semua sumber.`;
        }
        showProgress(data.index);
        if (Object.keys(data.equivalents || {}).length) status.textContent += ' Padanan yang turut dicari: ' + Object.entries(data.equivalents).map(([word, equivalents]) => `${word} (${equivalents.join(', ')})`).join('; ') + '.';
        const refinements = filterNames.filter(name => appliedFilters[name]).map(name => `${({ buyer: 'Buyer', vendor: 'Vendor', creator: 'Pembuat TOR', exclude: 'Hindari kata utuh' })[name]}: ${appliedFilters[name]}`);
        if (refinements.length) status.textContent += ' Filter aktif — ' + refinements.join('; ') + '.';
        if (data.match === 'related') status.textContent += ' Kata dapat berasal dari dokumen berbeda dalam PR yang sama.';
        if (data.match === 'reference') status.textContent += ' Seluruh nomor dokumen dicocokkan secara persis.';
        else if (data.lexical === 'exact') status.textContent += ' Kata utuh, tanpa perluasan awalan atau padanan; urutan kata bebas.';
        if (focusedPr) status.textContent += ` Fokus aktif pada ${focusedPr.number}. Pilih Keluar fokus untuk mencari seluruh PR.`;
        currentPage = data.page;
        lastPage = deferred ? data.page + (data.has_more ? 1 : 0) : data.last_page;
        pagination.hidden = data.page <= 1 && !(deferred ? data.has_more : data.last_page > 1);
        get('page').textContent = deferred ? `Halaman ${data.page}${data.has_more ? ' · masih ada hasil' : ' · akhir hasil'}` : `${data.page} / ${data.last_page}`;
        get('prev').disabled = data.page <= 1;
        get('next').disabled = data.page >= lastPage;
    }
    async function search(page = 1) {
        const key = JSON.stringify([appliedQuery, appliedScope, appliedMatch, appliedSort, appliedLexical, appliedFilters, page]);
        if (pendingKey === key) return;
        controller?.abort(); cancelEvidence();
        controller = new AbortController();
        pendingKey = key;
        const serial = ++sequence;
        const pending = controller;
        let succeeded = false, rejectAbort;
        const cancelled = new Promise((_, reject) => { rejectAbort = () => reject(Object.assign(new Error('Dibatalkan'), {name: 'AbortError'})); pending.signal.addEventListener('abort', rejectAbort, {once: true}); });
        retryPage = null;
        if (get('retry')) { get('retry').hidden = true; get('retry').disabled = true; }
        results.hidden = true; pagination.hidden = true;
        status.dataset.error = 'false';
        status.textContent = 'Mencari barang dan dokumen…';
        if (get('suggestions')) get('suggestions').hidden = true;
        if (get('summary')) get('summary').hidden = true;
        submit.disabled = true;
        get('prev').disabled = get('next').disabled = true;
        const timeout = setTimeout(() => pending.abort(), 20000);
        try {
            const url = searchUrl(page, 'deferred');
            const read = async () => {
                const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: pending.signal, credentials: 'same-origin' });
                const data = await readResponse(response);
                if (!data || !Array.isArray(data.rows)) throw Error('Hasil belum lengkap. Coba muat kembali.');
                return data;
            };
            const data = await Promise.race([read(), cancelled]);
            if (serial !== sequence || pending.signal.aborted) return;
            render(data);
            succeeded = true; results.hidden = false;
        } catch (error) {
            if (serial !== sequence) return;
            if (get('summary')) get('summary').hidden = true;
            pagination.hidden = true;
            status.dataset.error = 'true';
            status.textContent = error.name === 'AbortError' ? 'Pencarian terlalu lama. Coba lagi dengan kata yang lebih spesifik.' : error.message === 'Failed to fetch' ? 'Koneksi terputus. Coba kembali.' : error.message;
            retryPage = page;
            if (get('retry')) { get('retry').hidden = false; get('retry').disabled = false; }
        } finally {
            clearTimeout(timeout);
            pending.signal.removeEventListener('abort', rejectAbort);
            if (serial === sequence) { submit.disabled = false; pendingKey = ''; get('prev').disabled = !succeeded || currentPage <= 1; get('next').disabled = !succeeded || currentPage >= lastPage; }
        }
    }
    get('retry')?.addEventListener('click', () => { if (retryPage !== null && !pendingKey) { restoreAppliedFields(); search(retryPage); } });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value.trim()) return;
        appliedQuery = input.value.trim(); appliedScope = scope.value;
        appliedMatch = get('match')?.value || 'source'; appliedSort = get('sort')?.value || 'relevance';
        appliedLexical = appliedMatch === 'reference' ? 'exact' : get('lexical')?.value || 'expanded';
        if (get('lexical')) get('lexical').value = appliedLexical;
        appliedFilters = {...Object.fromEntries(filterNames.map(name => [name, get(name)?.value.trim() || '']).filter(([, value]) => value)), ...(focusedPr ? {pr_id: focusedPr.id} : {})};
        search();
    });
    input.addEventListener('input', () => { status.textContent = 'Pilihan belum diterapkan. Tekan Enter atau klik Cari.'; });
    scope.addEventListener('change', () => { status.textContent = 'Pilihan belum diterapkan. Klik Cari untuk menerapkan.'; });
    for (const name of filterNames) get(name)?.addEventListener('input', () => { status.textContent = 'Filter belum diterapkan. Klik Cari untuk menerapkan.'; });
    for (const name of ['match', 'sort', 'lexical']) get(name)?.addEventListener('change', () => { status.textContent = 'Pilihan belum diterapkan. Klik Cari untuk menerapkan.'; });
    get('reset').addEventListener('click', () => {
        catalogController?.abort(); catalogSerial++; catalogAfter = 0; catalogQuery = '';
        if (get('catalog-query')) get('catalog-query').value = '';
        if (get('catalog-rows')) get('catalog-rows').replaceChildren();
        if (get('catalog-info')) get('catalog-info').textContent = '';
        if (get('catalog-more')) { get('catalog-more').hidden = true; get('catalog-more').disabled = false; }
        coverageController?.abort(); coverageSequence++;
        if (get('check-coverage')) get('check-coverage').disabled = false;
        if (get('coverage')) get('coverage').hidden = true;
        controller?.abort(); cancelEvidence(); sequence++; pendingKey = ''; submit.disabled = false; input.value = ''; scope.value = 'all';
        appliedFilters = {};
        focusedPr = null; showFocus();
        appliedMatch = 'source'; appliedSort = 'relevance'; appliedLexical = 'expanded';
        if (get('lexical')) get('lexical').value = appliedLexical;
        if (get('match')) get('match').value = appliedMatch;
        if (get('sort')) get('sort').value = appliedSort;
        if (get('suggestions')) { get('suggestions').replaceChildren(); get('suggestions').hidden = true; }
        for (const name of filterNames) if (get(name)) get(name).value = '';
        currentPage = lastPage = 1;
        retryPage = null;
        if (get('retry')) { get('retry').hidden = true; get('retry').disabled = false; }
        results.replaceChildren(); pagination.hidden = true;
        if (get('summary')) get('summary').hidden = true;
        if (get('progress')) get('progress').hidden = true;
        status.dataset.error = 'false';
        status.textContent = 'Ketik nama barang untuk mencari PR dan lampiran terkait.';
    });
    get('prev').addEventListener('click', () => { if (!get('prev').disabled) search(Math.max(1, currentPage-1)); });
    get('next').addEventListener('click', () => { if (!get('next').disabled) search(currentPage+1); });
})();
