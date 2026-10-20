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

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
    })[char]);

    const setModal = (modal, show) => {
        modal.hidden = !show;
        document.body.classList.toggle('ci-modal-open', show);
        if (show) window.setTimeout(() => modal.querySelector('input, textarea, select, button')?.focus(), 40);
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
        const action = button.dataset.action;
        document.getElementById('ciNoteForm').action = button.dataset.url;
        document.getElementById('ciNoteAction').value = action;
        document.getElementById('ciNoteVersion').value = button.dataset.version;
        document.getElementById('ciNoteTitle').textContent = action === 'return' ? 'Kembalikan untuk diperbaiki' : 'Kirim ulang serah terima';
        setModal(noteModal, true);
    }));

    const selectPr = (item) => {
        document.getElementById('ciPpbjId').value = item.id;
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
        window.clearTimeout(timer);
        const query = searchInput.value.trim();
        document.getElementById('ciPpbjId').value = '';
        selected.hidden = true;
        if (query.length < 2) {
            results.hidden = true;
            hint.textContent = 'Ketik minimal 2 karakter. Pencarian berjalan saat Anda berhenti mengetik.';
            return;
        }

        hint.textContent = 'Mencari data PR...';
        timer = window.setTimeout(async () => {
            activeRequest?.abort();
            activeRequest = new AbortController();
            try {
                const response = await fetch(`${root.dataset.searchUrl}?q=${encodeURIComponent(query)}`, {
                    headers: { Accept: 'application/json' }, signal: activeRequest.signal
                });
                if (!response.ok) throw new Error('Pencarian PR tidak tersedia.');
                const payload = await response.json();
                const items = payload.results || [];
                renderResults(items);
                const shown = payload.meta?.shown ?? items.length;
                const limit = payload.meta?.limit ?? 12;
                hint.textContent = `${shown} PR ditemukan · maksimal ${limit} hasil`;
            } catch (error) {
                if (error.name === 'AbortError') return;
                results.hidden = true;
                hint.textContent = error.message || 'Pencarian gagal. Coba kembali.';
            }
        }, 420);
    });

    document.getElementById('ciFocusButton')?.addEventListener('click', async (event) => {
        try {
            if (!document.fullscreenElement) await root.requestFullscreen();
            else await document.exitFullscreen();
            event.currentTarget.textContent = document.fullscreenElement ? '⛶ Keluar Fokus' : '⛶ Mode Fokus';
        } catch (_) {
            root.classList.toggle('ci-focus-fallback');
            event.currentTarget.textContent = root.classList.contains('ci-focus-fallback') ? '⛶ Keluar Fokus' : '⛶ Mode Fokus';
        }
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
})();
