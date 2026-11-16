(() => {
    'use strict';
    const filter = document.querySelector('.cm-filter');
    const forms = [...document.querySelectorAll('.cm-read-form, .cm-delete-form')];
    if (!filter && !forms.length) return;
    const feedback = document.getElementById('cmActionFeedback');
    let pending = null;

    function notice(text = '', error = false) {
        if (!feedback) return;
        feedback.textContent = text;
        feedback.hidden = !text;
        feedback.dataset.tone = error ? 'error' : 'info';
    }

    function release(text = '', error = false) {
        const operation = pending;
        pending = null;
        if (operation) {
            clearTimeout(operation.timer);
            operation.buttons.forEach(([button, disabled]) => { button.disabled = disabled; });
            operation.forms.forEach(([form, busy]) => {
                if (busy === null) form.removeAttribute('aria-busy'); else form.setAttribute('aria-busy', busy);
            });
        }
        notice(text, error);
    }

    async function confirmDelete(form) {
        const text = `Pesan dari ${form.dataset.sender || 'Pengirim'} (${form.dataset.email || '-'}), subjek: ${form.dataset.subject || '-'}. Pesan akan dihapus permanen.`;
        if (window.Swal) {
            const dark = document.documentElement.classList.contains('dark');
            return (await window.Swal.fire({
                title: 'Hapus pesan contact?', text, icon: 'warning', showCancelButton: true,
                confirmButtonText: 'Ya, hapus pesan', cancelButtonText: 'Batal', reverseButtons: true, focusCancel: true,
                confirmButtonColor: '#ef4444', background: dark ? '#111827' : '#ffffff', color: dark ? '#f9fafb' : '#111827',
            })).isConfirmed;
        }
        if (window.FormUX?.confirm) return window.FormUX.confirm({title: 'Hapus pesan contact?', text, accept: 'Hapus pesan', cancel: 'Batal', danger: true});
        throw new Error('Komponen konfirmasi belum tersedia. Muat ulang halaman sebelum menghapus pesan.');
    }

    forms.forEach(form => form.addEventListener('submit', async event => {
        event.preventDefault();
        if (pending) return;
        const operation = {
            buttons: [...document.querySelectorAll('.cm-actions button')].map(button => [button, button.disabled]),
            forms: forms.map(item => [item, item.getAttribute('aria-busy')]),
            timer: null,
        };
        pending = operation;
        operation.buttons.forEach(([button]) => { button.disabled = true; });
        operation.forms.forEach(([item]) => item.setAttribute('aria-busy', 'true'));
        notice('Menyiapkan perubahan pesan...');
        try {
            if (form.classList.contains('cm-delete-form')) {
                const confirmed = await confirmDelete(form);
                if (pending !== operation) return;
                if (!confirmed) { release(); return; }
            }
            if (pending !== operation) return;
            notice('Menyimpan perubahan. Tunggu hingga daftar dimuat kembali.');
            operation.timer = setTimeout(() => {
                if (pending === operation) release('Perubahan belum terkonfirmasi. Muat ulang daftar dan periksa status pesan sebelum mencoba kembali.', true);
            }, 60000);
            // Preserve CSRF, method override and the desired read state. Only
            // buttons are disabled; hidden successful form controls stay enabled.
            HTMLFormElement.prototype.submit.call(form);
        } catch (error) {
            if (pending === operation) release(error.message || 'Perubahan belum terkonfirmasi. Muat ulang daftar pesan.', true);
        }
    }));

    filter?.addEventListener('submit', event => {
        if (pending) { event.preventDefault(); return; }
        if (window.FormUX?.validate && !window.FormUX.validate(filter)) event.preventDefault();
    });
    filter?.querySelector('a')?.addEventListener('click', event => {
        if (pending) event.preventDefault();
    });
    window.addEventListener('pagehide', () => release());
    window.addEventListener('pageshow', () => release());
})();
