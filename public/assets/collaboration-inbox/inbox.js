(() => {
    'use strict';

    const root = document.getElementById('collaborationInbox');
    if (!root) return;

    const createModal = document.getElementById('ciCreateModal');
    const noteModal = document.getElementById('ciNoteModal');
    const searchInput = document.getElementById('ciPrSearch');
    const results = document.getElementById('ciPrResults');
    const hint = document.getElementById('ciPrSearchHint');
    const selected = document.getElementById('ciSelectedPr');
    let timer = null;
    let activeRequest = null;
    let searchEpoch = 0, pageEpoch = 0, mutation = null, focusPending = false;

    async function request(url, options = {}, controller = new AbortController()) {
        const writing = options.method && options.method !== 'GET';
        let timeout, onAbort;
        try {
            const aborted = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                controller.signal.addEventListener('abort', onAbort, {once: true});
                if (controller.signal.aborted) onAbort();
            });
            const deadline = new Promise((_, reject) => {timeout = window.setTimeout(() => {
                reject(new Error(writing ? 'Perubahan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasil sebelum mencoba lagi.' : 'Pencarian terlalu lama. Coba kata pencarian kembali.'));
                controller.abort();
            }, writing ? 30000 : 20000);});
            return await Promise.race([aborted, deadline, (async () => {
                const response = await fetch(url, {...options, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                        ...(writing ? {'X-CSRF-TOKEN': options.body?.get('_token') || document.querySelector('meta[name="csrf-token"]')?.content || ''} : {}), ...options.headers}});
                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang halaman untuk memeriksa hasilnya.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Masuk kembali.', 403: 'Anda tidak memiliki izin untuk mengubah tugas ini.',
                        409: 'Tugas telah berubah. Muat ulang daftar sebelum melanjutkan.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 429: 'Terlalu banyak permintaan. Tunggu sebentar.'};
                    const message = messages[response.status] || (response.status === 422 && (Object.values(data?.errors || {}).flat()[0] || data?.message));
                    throw Object.assign(new Error(message || 'Permintaan belum terkonfirmasi. Periksa kembali daftar tugas.'), {status: response.status, fields: data?.errors});
                }
                if (!data || typeof data !== 'object' || Array.isArray(data) || (writing && data.success !== true)) throw new Error('Respons belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
                return data;
            })()]);
        } finally {window.clearTimeout(timeout); controller.signal.removeEventListener('abort', onAbort);}
    }
    function stopSearch() {searchEpoch++; window.clearTimeout(timer); timer = null; activeRequest?.abort(); activeRequest = null;}
    function notice(form, text, error = false, reload = false) {
        let node = form.querySelector('[data-ci-status]');
        if (!node) {node = document.createElement('p'); node.dataset.ciStatus = ''; node.className = 'ci-form-status'; node.setAttribute('role', 'status'); node.setAttribute('aria-live', 'polite'); form.prepend(node);}
        node.dataset.error = String(error); node.textContent = text;
        if (reload) {const link = document.createElement('a'); link.href = window.location.href; link.textContent = ' Muat ulang tugas'; node.append(link);}
    }
    function release(operation) {
        if (mutation !== operation) return;
        operation.disabled.forEach(([node, disabled]) => {node.disabled = disabled;});
        operation.form.removeAttribute('aria-busy'); mutation = null;
    }

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
    })[char]);

    const setModal = (modal, show) => {
        if (mutation) return;
        if (!show && modal === createModal) {stopSearch(); results.hidden = true; if (selected.hidden) hint.textContent = 'Ketik minimal 2 karakter untuk mencari PR.';}
        modal.hidden = !show;
        document.body.classList.toggle('ci-modal-open', show);
        if (show) window.setTimeout(() => {if (!modal.hidden && !mutation) modal.querySelector('input:not([type="hidden"]), textarea, select, button')?.focus();}, 40);
    };

    document.getElementById('ciOpenCreate')?.addEventListener('click', () => setModal(createModal, true));
    document.getElementById('ciCloseCreate')?.addEventListener('click', () => setModal(createModal, false));
    document.getElementById('ciCancelCreate')?.addEventListener('click', () => setModal(createModal, false));
    createModal?.addEventListener('click', (event) => { if (event.target === createModal) setModal(createModal, false); });

    const closeNote = () => setModal(noteModal, false);
    document.getElementById('ciCloseNote')?.addEventListener('click', closeNote);
    document.getElementById('ciCancelNote')?.addEventListener('click', closeNote);
    noteModal?.addEventListener('click', (event) => { if (event.target === noteModal) closeNote(); });

    document.querySelectorAll('.ci-note-action').forEach((button) => button.addEventListener('click', () => {
        if (mutation) return;
        const action = button.dataset.action;
        document.getElementById('ciNoteForm').action = button.dataset.url;
        document.getElementById('ciNoteAction').value = action;
        document.getElementById('ciNoteVersion').value = button.dataset.version;
        document.getElementById('ciNoteTitle').textContent = action === 'return' ? 'Kembalikan untuk diperbaiki' : 'Kirim ulang serah terima';
        setModal(noteModal, true);
    }));

    const selectPr = (item) => {
        stopSearch();
        const idInput = document.getElementById('ciPpbjId');
        const numberInput = document.getElementById('ciPpbjNo');
        idInput.value = item.id ?? '';
        numberInput.value = item.ppbj_no || '';
        document.getElementById('ciSelectedPrNumber').textContent = item.ppbj_no || '-';
        document.getElementById('ciSelectedPrDescription').textContent = item.description || 'Tanpa uraian';
        document.getElementById('ciTitle').value ||= `Tindak lanjut ${item.ppbj_no || 'PR'}`;
        selected.hidden = false;
        results.hidden = true;
        searchInput.value = item.ppbj_no || '';
        hint.textContent = `${item.portfolio || 'Tanpa portofolio'} · ${item.buyer || 'Belum ada PIC'} · ${item.value || 'Nilai belum tersedia'}`;
    };

    const renderResults = (items) => {
        results.innerHTML = items.length ? items.map((item, index) => `
            <button type="button" data-result-index="${index}">
                <span><strong>${escapeHtml(item.ppbj_no)}</strong><small>${escapeHtml(item.portfolio || 'Tanpa portofolio')} · ${escapeHtml(item.value || '-')}</small></span>
                <p>${escapeHtml(item.description || 'Tanpa uraian')}</p>
                <em>${escapeHtml(item.receiver?.name || item.buyer || 'Belum ada penerima')}</em>
            </button>`).join('') : '<div class="ci-pr-results__empty">PR tidak ditemukan.</div>';
        results.hidden = false;
        results.querySelectorAll('[data-result-index]').forEach((button) => button.addEventListener('click', () => selectPr(items[Number(button.dataset.resultIndex)])));
    };

    searchInput?.addEventListener('input', () => {
        stopSearch(); results.hidden = true;
        const query = searchInput.value.trim();
        document.getElementById('ciPpbjId').value = '';
        document.getElementById('ciPpbjNo').value = '';
        selected.hidden = true;
        if (query.length < 2) {
            results.hidden = true;
            hint.textContent = 'Ketik minimal 2 karakter. Pencarian berjalan saat Anda berhenti mengetik.';
            return;
        }

        hint.textContent = 'Mencari data PR...';
        const captured = searchEpoch;
        timer = window.setTimeout(async () => {
            if (captured !== searchEpoch || createModal.hidden) return;
            const controller = activeRequest = new AbortController();
            const current = () => captured === searchEpoch && activeRequest === controller && !createModal.hidden;
            try {
                const payload = await request(`${root.dataset.searchUrl}?q=${encodeURIComponent(query)}`, {}, controller);
                if (!current()) return;
                const items = payload.results;
                if (!Array.isArray(items) || items.length > 12 || !items.every(item => Number.isSafeInteger(item?.id) && item.id > 0 && typeof item.ppbj_no === 'string')) throw new Error('Hasil PR belum lengkap. Coba pencarian kembali.');
                renderResults(items);
                const shown = payload.meta?.shown ?? items.length;
                const limit = payload.meta?.limit ?? 12;
                hint.textContent = `${shown} PR ditemukan · maksimal ${limit} hasil`;
            } catch (error) {
                if (!current() || error.name === 'AbortError') return;
                results.hidden = true;
                hint.textContent = error.message || 'Pencarian gagal. Coba kembali.';
            } finally {if (activeRequest === controller) activeRequest = null;}
        }, 420);
    });

    const forms = [...new Set([...root.querySelectorAll('form[method="POST"]'), document.getElementById('ciCreateForm'), document.getElementById('ciNoteForm')].filter(Boolean))];
    forms.forEach(form => {
        form.noValidate = true;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (mutation || !window.FormUX.validate(form)) return;
            if (form.id === 'ciCreateForm' && !document.getElementById('ciPpbjId').value && !document.getElementById('ciPpbjNo').value) {
                notice(form, 'Pilih referensi PR dari hasil pencarian terlebih dahulu.', true); searchInput.focus(); return;
            }
            const body = new FormData(form), operation = {form, epoch: pageEpoch, controller: new AbortController(), disabled: []};
            mutation = operation; stopSearch(); results.hidden = true;
            operation.disabled = [...document.querySelectorAll('#collaborationInbox input, #collaborationInbox select, #collaborationInbox textarea, #collaborationInbox button, #ciCreateModal input, #ciCreateModal select, #ciCreateModal textarea, #ciCreateModal button, #ciNoteModal input, #ciNoteModal textarea, #ciNoteModal button')].map(node => [node, node.disabled]);
            operation.disabled.forEach(([node]) => {node.disabled = true;}); form.setAttribute('aria-busy', 'true');
            notice(form, form.hasAttribute('data-ci-confirm') ? 'Menunggu konfirmasi...' : 'Menyimpan perubahan...');
            let navigating = false;
            try {
                if (form.hasAttribute('data-ci-confirm') && !await window.FormUX.confirm({title: 'Batalkan serah terima?', text: 'Serah terima ini akan dibatalkan.', danger: true, accept: 'Batalkan tugas', cancel: 'Kembali'})) {notice(form, ''); return;}
                if (operation.epoch !== pageEpoch) return;
                const data = await request(form.action, {method: 'POST', body}, operation.controller);
                if (operation.epoch !== pageEpoch) return;
                const target = new URL(data.redirect_url, window.location.href);
                if (target.origin !== window.location.origin || target.pathname.replace(/\/$/, '') !== new URL(root.dataset.indexUrl, window.location.href).pathname.replace(/\/$/, '')) throw new Error('Tujuan halaman belum valid. Muat ulang daftar untuk memeriksa hasilnya.');
                notice(form, data.message || 'Perubahan tersimpan.'); navigating = true;
                if (form.id === 'ciCreateForm') window.location.href = target.href; else window.location.reload();
            } catch (error) {
                if (operation.epoch === pageEpoch && error.name !== 'AbortError') {
                    release(operation);
                    const fieldsShown = error.fields && !window.FormUX.errors(form, error.fields);
                    notice(form, fieldsShown ? 'Perbaiki kolom yang ditandai. Isian Anda tetap tersedia.' : error instanceof TypeError ? 'Koneksi terputus. Periksa daftar sebelum mencoba lagi.' : error.message, true, error.status === 409);
                }
            } finally {if (!navigating) release(operation);}
        });
    });

    document.getElementById('ciFocusButton')?.addEventListener('click', async (event) => {
        if (focusPending || mutation) return;
        const button = event.currentTarget;
        focusPending = true;
        try {
            if (!document.fullscreenElement) await root.requestFullscreen();
            else await document.exitFullscreen();
            button.textContent = document.fullscreenElement ? '⛶ Keluar Fokus' : '⛶ Mode Fokus';
        } catch (_) {
            root.classList.toggle('ci-focus-fallback');
            button.textContent = root.classList.contains('ci-focus-fallback') ? '⛶ Keluar Fokus' : '⛶ Mode Fokus';
        } finally {focusPending = false;}
    });

    document.addEventListener('fullscreenchange', () => {
        const button = document.getElementById('ciFocusButton');
        if (button) button.textContent = document.fullscreenElement ? '⛶ Keluar Fokus' : '⛶ Mode Fokus';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!createModal.hidden) setModal(createModal, false);
        if (!noteModal.hidden) closeNote();
    });
    document.addEventListener('visibilitychange', () => {if (document.hidden) stopSearch();});
    window.addEventListener('pagehide', () => {stopSearch(); pageEpoch++; if (mutation) {const operation = mutation; notice(operation.form, 'Perubahan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasilnya.', true); operation.controller.abort(); release(operation);}});
})();
