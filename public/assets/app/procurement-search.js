(function () {
    'use strict';
    const root = document.getElementById('procurementUnifiedSearch');
    if (!root || root.dataset.bound) return;
    root.dataset.bound = 'true';
    const get = name => root.querySelector(`[data-pus-${name}]`);
    const form = get('form'), input = get('query'), scope = get('scope'), status = get('status'), results = get('results');
    const pagination = get('pagination'), submit = form.querySelector('[type="submit"]');
    let controller, sequence = 0, currentPage = 1, appliedQuery = '', appliedScope = 'all';
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
        node.href = url.pathname + url.search;
        return node;
    }
    function render(data) {
        results.replaceChildren();
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
                item.append(source, element('p', 'pus-snippet', match.snippet));
                if (match.url) {
                    const anchor = link(match.url, match.kind.startsWith('archive_') ? 'Buka lampiran ↗' : 'Buka dokumen →', 'pus-open');
                    if (match.kind.startsWith('archive_')) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
                    item.append(anchor);
                }
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
        status.textContent = data.total ? `${data.total} PR cocok untuk “${appliedQuery}”. Ditampilkan per PR agar hubungan dokumennya jelas.` : 'Belum ada PR yang cocok. Coba kata yang lebih singkat atau pilih semua sumber.';
        if (backlog) status.textContent += ` ${backlog} lampiran masih diproses bertahap; isi yang sudah terbaca langsung bisa dicari.`;
        if (data.index?.failed) status.textContent += ` ${data.index.failed} lampiran belum berhasil dibaca seluruhnya.`;
        if (data.index?.needs_review) status.textContent += ` ${data.index.needs_review} lampiran perlu diperiksa karena teks/formatnya belum dapat dibaca seluruhnya.`;
        if (data.index?.archive_state === 'deferred') status.textContent += ' Sinkronisasi arsip sedang tertunda; hasil lama yang kedaluwarsa disembunyikan sementara.';
        if (data.index?.state === 'starting') status.textContent += ' Indeks awal sedang disiapkan.';
        currentPage = data.page;
        pagination.hidden = data.last_page <= 1;
        get('page').textContent = `${data.page} / ${data.last_page}`;
        get('prev').disabled = data.page <= 1;
        get('next').disabled = data.page >= data.last_page;
    }
    async function search(page = 1) {
        controller?.abort();
        controller = new AbortController();
        const serial = ++sequence;
        status.dataset.error = 'false';
        status.textContent = 'Mencari barang dan dokumen…';
        submit.disabled = true;
        try {
            const url = new URL(root.dataset.endpoint, window.location.origin);
            url.search = new URLSearchParams({ q: appliedQuery, scope: appliedScope, page });
            const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: controller.signal, credentials: 'same-origin' });
            const data = await response.json();
            if (serial !== sequence) return;
            if (!response.ok) throw new Error(response.status === 429 ? 'Pencarian terlalu sering. Tunggu sebentar, lalu coba lagi.' : response.status === 422 ? 'Periksa kata pencarian dan pilihan sumber.' : 'Pencarian belum dapat dimuat. Coba kembali.');
            render(data);
        } catch (error) {
            if (serial !== sequence || error.name === 'AbortError') return;
            status.dataset.error = 'true';
            status.textContent = error.message === 'Failed to fetch' ? 'Koneksi terputus. Coba kembali.' : error.message;
        } finally { if (serial === sequence) submit.disabled = false; }
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
        controller?.abort(); sequence++; submit.disabled = false; input.value = ''; scope.value = 'all';
        results.replaceChildren(); pagination.hidden = true;
        status.textContent = 'Ketik nama barang untuk mencari PR dan lampiran terkait.';
    });
    get('prev').addEventListener('click', () => search(Math.max(1, currentPage-1)));
    get('next').addEventListener('click', () => search(currentPage+1));
    // Existing SP/SPPH/PPBJ filters feed the same search once after navigation, never on typing.
    if (input.value.trim()) { appliedQuery = input.value.trim(); appliedScope = scope.value; search(); }
})();
