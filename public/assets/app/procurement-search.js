(function () {
    'use strict';
    const root = document.getElementById('procurementUnifiedSearch');
    if (!root || root.dataset.bound) return;
    root.dataset.bound = 'true';
    const get = name => root.querySelector(`[data-pus-${name}]`);
    const form = get('form'), input = get('query'), scope = get('scope'), status = get('status'), results = get('results');
    const pagination = get('pagination'), submit = form.querySelector('[type="submit"]');
    let controller, sequence = 0, currentPage = 1, lastPage = 1, appliedQuery = '', appliedScope = 'all', pendingKey = '';
    const labels = { ppbj: 'PPBJ', sp: 'SP', spph: 'SPPH', archive_document: 'Arsip', archive_attachment: 'Lampiran arsip' };
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
        const pattern = needles.length ? new RegExp('\\b(?:' + needles.join('|') + ')', 'ig') : null;
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
    function render(data) {
        results.replaceChildren();
        const summary = get('summary');
        if (summary) {
            summary.hidden = false;
            summary.replaceChildren(element('strong', '', `${data.total || 0} PR ditemukan`), element('span', '', data.elapsed_ms ? `Selesai dalam ${(data.elapsed_ms / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 })} detik` : 'Hasil dikelompokkan per PR'));
            if (data.index?.pages_known) summary.append(element('span', '', `${data.index.pages_processed || 0}/${data.index.pages_known} halaman terpetakan sudah diproses`));
        }
        for (const row of data.rows || []) {
            const card = element('article', 'pus-card');
            const heading = element('div', 'pus-card-head'), title = element('div');
            title.append(element('h3', 'pus-number', row.number), element('p', 'pus-description', row.description));
            heading.append(title, element('span', 'pus-pill', row.portfolio || 'PR terkait'));
            card.append(heading);
            const matches = element('div', 'pus-matches');
            for (const match of row.matches || []) {
                const item = element('div', 'pus-match'), source = element('div', 'pus-source');
                source.append(element('span', 'pus-badge', labels[match.kind] || 'Dokumen'), element('strong', '', match.label));
                if (match.kind.startsWith('archive_')) source.append(element('span', 'pus-badge', ['pending', 'partial', 'failed'].includes(match.state) ? `Isi diproses · ${match.page || 0}/${match.pages || '?'} halaman` : 'Hasil pembacaan otomatis'));
                if (['uncertain', 'empty', 'limited', 'unsupported'].includes(match.state)) source.append(element('span', 'pus-badge', 'Perlu diperiksa'));
                if (match.inferred) source.append(element('span', 'pus-badge', 'Nomor PR terbaca dari scan · periksa kecocokan'));
                const engines = { 'pdfjs-6-text': 'Teks asli PDF', 'pdfjs-6-tesseract-7': 'Teks PDF + scan', 'tesseract-7-ind-eng': 'Scan / foto', 'office-text': 'Teks dokumen' };
                if (engines[match.reading?.engine]) source.append(element('span', 'pus-badge', engines[match.reading.engine]));
                if (match.reading?.confidence != null && match.reading.confidence < 55) source.append(element('span', 'pus-badge pus-warning', 'Bacaan kurang jelas · periksa file asli'));
                if (match.match_page) source.append(element('span', 'pus-badge pus-page-hit', `Ketemu di halaman ${match.match_page}`));
                item.append(source, snippet(match.snippet, data));
                if (match.url) {
                    const anchor = link(match.url, match.kind.startsWith('archive_') ? (match.match_page ? `Buka halaman ${match.match_page} ↗` : 'Buka lampiran ↗') : 'Buka dokumen →', 'pus-open');
                    if (match.kind.startsWith('archive_')) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
                    item.append(anchor);
                }
                if (match.notice) item.append(element('p', 'pus-read-notice', match.notice));
                matches.append(item);
            }
            card.append(matches);
            const links = element('div', 'pus-links');
            for (const [kind, href] of Object.entries(row.links || {})) links.append(link(href, `Buka ${labels[kind] || kind} →`, ''));
            card.append(links);
            if (row.more_sources) card.append(element('p', 'pus-more', 'Masih ada sumber terkait lainnya. Persempit kata atau pilih sumber untuk menelusurinya.'));
            results.append(card);
        }
        const backlog = (data.index?.pending || 0) + (data.index?.partial || 0);
        const progress = [];
        status.textContent = data.total ? `${data.total} PR cocok untuk “${appliedQuery}”. Ditampilkan per PR agar hubungan dokumennya jelas.` : 'Belum ada PR yang cocok. Coba kata yang lebih singkat atau pilih semua sumber.';
        if (data.query?.missing?.length) {
            const missing = data.query.missing.map(word => `“${word}”`).join(', ');
            status.textContent = `Kata ${missing} belum ketemu di indeks sumber ini, cuy.`;
            if (data.query.used?.length) status.textContent += data.total ? ` Tapi “${data.query.used.join(' ')}” ketemu! Ini ${data.total} PR yang cocok.` : ` Kata “${data.query.used.join(' ')}” ada, tapi belum ketemu bersamaan dalam satu dokumen. Coba cari salah satunya dulu.`;
            else status.textContent += ' Coba kata yang lebih singkat atau pilih semua sumber, ya.';
        } else if (!data.total && !data.query?.strict && data.query?.used?.length > 1 && !/[0-9=<>"']/.test(appliedQuery)) {
            status.textContent = 'Kata-katanya ada, cuy, tapi belum ketemu bersamaan dalam satu dokumen. Coba cari salah satu kata atau pilih semua sumber.';
        }
        if (backlog) progress.push(`${backlog} lampiran diproses bertahap; isi yang sudah terbaca langsung bisa dicari.`);
        if (data.index?.failed) progress.push(`${data.index.failed} lampiran belum berhasil dibaca seluruhnya.`);
        if (data.index?.needs_review) progress.push(`${data.index.needs_review} lampiran perlu diperiksa karena teks/formatnya belum dapat dibaca seluruhnya.`);
        if (data.index?.unreadable_pages) progress.push(`${data.index.unreadable_pages} halaman bermasalah ditandai untuk diperiksa; halaman lain tetap diproses.`);
        if (data.index?.unlinked_files) progress.push(`${data.index.unlinked_files} arsip menunggu relasi PR yang valid sebelum bisa muncul sebagai hasil PR.`);
        if (data.index?.files_unmapped) progress.push(`${data.index.files_unmapped} berkas masih didata jumlah halamannya.`);
        if (data.index?.archive_state === 'deferred') progress.push('Sinkronisasi arsip sedang tertunda; hasil kedaluwarsa disembunyikan sementara.');
        if (data.index?.state === 'starting') progress.push('Indeks awal sedang disiapkan.');
        if (get('progress') && get('progressinfo')) {
            get('progress').hidden = progress.length === 0;
            get('progressinfo').textContent = progress.join(' ');
        } else if (progress.length) status.textContent += ' ' + progress.join(' ');
        if (Object.keys(data.equivalents || {}).length) status.textContent += ' Padanan yang turut dicari: ' + Object.entries(data.equivalents).map(([word, equivalents]) => `${word} (${equivalents.join(', ')})`).join('; ') + '.';
        currentPage = data.page;
        lastPage = data.last_page;
        pagination.hidden = data.last_page <= 1;
        get('page').textContent = `${data.page} / ${data.last_page}`;
        get('prev').disabled = data.page <= 1;
        get('next').disabled = data.page >= data.last_page;
    }
    async function search(page = 1) {
        const key = JSON.stringify([appliedQuery, appliedScope, page]);
        if (pendingKey === key) return;
        controller?.abort();
        controller = new AbortController();
        pendingKey = key;
        const serial = ++sequence;
        status.dataset.error = 'false';
        status.textContent = 'Mencari barang dan dokumen…';
        submit.disabled = true;
        get('prev').disabled = get('next').disabled = true;
        const timeout = setTimeout(() => { if (serial === sequence) controller.abort(); }, 20000);
        try {
            const url = new URL(root.dataset.endpoint, window.location.origin);
            url.search = new URLSearchParams({ q: appliedQuery, scope: appliedScope, page });
            const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: controller.signal, credentials: 'same-origin' });
            if (serial !== sequence) return;
            if (!response.ok) throw new Error(response.status === 429 ? 'Pencarian terlalu sering. Tunggu sebentar, lalu coba lagi.' : response.status === 422 ? 'Periksa kata pencarian dan pilihan sumber.' : 'Pencarian belum dapat dimuat. Coba kembali.');
            let data;
            try { data = await response.json(); } catch (error) {
                if (error.name === 'AbortError') throw error;
                throw new Error('Hasil belum dapat dibaca. Muat ulang halaman dan coba kembali.');
            }
            if (serial !== sequence) return;
            render(data);
        } catch (error) {
            if (serial !== sequence) return;
            status.dataset.error = 'true';
            status.textContent = error.name === 'AbortError' ? 'Pencarian terlalu lama. Coba lagi dengan kata yang lebih spesifik.' : error.message === 'Failed to fetch' ? 'Koneksi terputus. Coba kembali.' : error.message;
        } finally {
            clearTimeout(timeout);
            if (serial === sequence) { submit.disabled = false; pendingKey = ''; get('prev').disabled = currentPage <= 1; get('next').disabled = currentPage >= lastPage; }
        }
    }
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value.trim()) return;
        appliedQuery = input.value.trim(); appliedScope = scope.value;
        search();
    });
    input.addEventListener('input', () => { status.textContent = 'Pilihan belum diterapkan. Tekan Enter atau klik Cari.'; });
    scope.addEventListener('change', () => { status.textContent = 'Pilihan belum diterapkan. Klik Cari untuk menerapkan.'; });
    get('reset').addEventListener('click', () => {
        controller?.abort(); sequence++; pendingKey = ''; submit.disabled = false; input.value = ''; scope.value = 'all';
        currentPage = lastPage = 1;
        results.replaceChildren(); pagination.hidden = true;
        if (get('summary')) get('summary').hidden = true;
        if (get('progress')) get('progress').hidden = true;
        status.dataset.error = 'false';
        status.textContent = 'Ketik nama barang untuk mencari PR dan lampiran terkait.';
    });
    get('prev').addEventListener('click', () => search(Math.max(1, currentPage-1)));
    get('next').addEventListener('click', () => search(currentPage+1));
    // Existing SP/SPPH/PPBJ filters feed the same search once after navigation, never on typing.
    if (input.value.trim()) { appliedQuery = input.value.trim(); appliedScope = scope.value; search(); }
})();
