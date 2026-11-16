(() => {
    'use strict';
    if (!document.querySelector('[data-satuan-page]')) return;
    const status = document.getElementById('satuanStatus');
    let busy = false, controller = null, epoch = 0, disabled = [], priorOverflow = '', returnFocus = null;
    function notice(form, text) {
        (form?.querySelector('[data-satuan-notice]') || status).textContent = text;
    }
    function lock(value) {
        busy = value;
        if (value) {
            disabled = [...document.querySelectorAll('[data-satuan-page] button, [data-satuan-save] input, [data-satuan-save] textarea, [data-satuan-save] button')]
                .map(node => [node, node.disabled]);
            disabled.forEach(([node]) => {node.disabled = true;});
        } else {disabled.forEach(([node, old]) => {node.disabled = old;}); disabled = [];}
        document.querySelectorAll('[data-satuan-save]').forEach(form => form.setAttribute('aria-busy', String(value)));
    }
    window.openModal = id => {
        if (busy) return;
        const modal = document.getElementById(id);
        if (!modal || !modal.classList.contains('hidden')) return;
        returnFocus = document.activeElement; priorOverflow = document.body.style.overflow;
        modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow = 'hidden';
        modal.querySelector('input:not([type=hidden])')?.focus();
    };
    window.closeModal = id => {
        if (busy) return;
        const modal = document.getElementById(id);
        if (!modal || modal.classList.contains('hidden')) return;
        modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.style.overflow = priorOverflow;
        returnFocus?.focus();
    };
    document.querySelectorAll('[data-satuan-edit]').forEach(button => button.addEventListener('click', () => {
        if (busy) return;
        const form = document.getElementById('editForm');
        window.FormUX.clear(form); notice(form, '');
        form.action = button.dataset.url;
        document.getElementById('editNama').value = button.dataset.name;
        document.getElementById('editKet').value = button.dataset.note;
        window.openModal('editModal');
    }));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') ['addModal', 'editModal'].forEach(id => window.closeModal(id));
    });
    document.querySelectorAll('[data-satuan-save], [data-satuan-delete]').forEach(form => form.addEventListener('submit', async event => {
        event.preventDefault();
        if (busy) return;
        const deleting = form.hasAttribute('data-satuan-delete');
        if (!deleting && !window.FormUX.validate(form)) return;
        const body = new FormData(form), captured = epoch;
        const operation = controller = new AbortController();
        let navigating = false;
        lock(true); notice(form, deleting ? 'Menunggu konfirmasi...' : 'Menyimpan satuan...');
        try {
            if (deleting && !await window.FormUX.confirm({title: 'Hapus Satuan?', text: 'Data satuan akan dihapus. Rincian dokumen yang sudah tersimpan tetap tersedia.', danger: true, accept: 'Hapus', cancel: 'Batal'})) {notice(form, ''); return;}
            if (captured !== epoch) return;
            const data = await window.SatuanUI.request(form.action, {method: 'POST', body}, operation);
            if (captured !== epoch) return;
            if (!deleting && !window.SatuanUI.validItem(data.satuan)) throw new Error('Data satuan belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
            notice(form, data.message || 'Satuan berhasil disimpan.');
            navigating = true;
            window.location.reload();
        } catch (error) {
            if (captured === epoch && error.name !== 'AbortError') {
                lock(false);
                if (error.errors) window.FormUX.errors(form, error.errors);
                notice(form, error instanceof TypeError ? 'Koneksi terputus. Muat ulang daftar untuk memeriksa hasil penyimpanan.' : error.message);
            }
        } finally {if (controller === operation && !navigating) {controller = null; lock(false);}}
    }));
    window.addEventListener('pagehide', () => {epoch++; controller?.abort(); controller = null; lock(false);});
})();
