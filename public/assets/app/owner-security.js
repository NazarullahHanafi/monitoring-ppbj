(() => {
    'use strict';
    const root = document.getElementById('ownerSecurity');
    if (!root || !window.FormUX?.confirm) return;
    const status = root.querySelector('[data-session-status]');
    let current = null, epoch = 0;
    function notice(text) { if (status) {status.hidden = !text; status.textContent = text;} }
    function release(operation) {
        if (current !== operation) return;
        operation.form.removeAttribute('aria-busy');
        operation.buttons.forEach(([button, prior]) => {if (prior === null) button.removeAttribute('aria-disabled'); else button.setAttribute('aria-disabled', prior);});
        current = null;
    }
    root.querySelectorAll('[data-session-revoke]').forEach(form => {
        form.addEventListener('submit', async event => {
            if (current?.form === form && current.ready) {
                current.ready = false;
                current.navigating = true;
                notice('Memproses pengakhiran sesi. Tunggu sampai halaman diperbarui.');
                return;
            }
            event.preventDefault();
            if (current) return;
            const operation = {form, epoch, ready:false, navigating:false, buttons:[...root.querySelectorAll('[data-session-revoke] button')].map(button => [button, button.getAttribute('aria-disabled')])};
            current = operation;
            form.setAttribute('aria-busy', 'true');
            operation.buttons.forEach(([button]) => button.setAttribute('aria-disabled', 'true'));
            notice('Periksa konfirmasi sebelum mengakhiri sesi.');
            let failed = false;
            try {
                const existing = new Set(document.querySelectorAll('dialog.ux-confirm'));
                const confirmation = window.FormUX.confirm({title:form.dataset.confirmTitle, text:form.dataset.confirmText, accept:'Ya, akhiri sesi', cancel:'Batal', danger:true});
                operation.dialog = [...document.querySelectorAll('dialog.ux-confirm')].find(dialog => !existing.has(dialog));
                const accepted = await confirmation;
                if (current !== operation || epoch !== operation.epoch || !accepted) return;
                operation.ready = true;
                // Native form encoding preserves CSRF and DELETE override. No
                // automatic retry: an uncertain revocation must be inspected.
                form.requestSubmit();
            } catch (_) {
                failed = true;
                if (current === operation && epoch === operation.epoch) notice('Konfirmasi belum dapat dibuka. Muat ulang halaman sebelum mencoba kembali.');
            } finally {
                if (current === operation && !operation.navigating) {release(operation); if (!failed) notice('');}
            }
        });
    });
    function restore() {
        epoch++;
        if (current) {const operation = current; release(operation); operation.dialog?.dispatchEvent(new Event('cancel', {cancelable:true}));}
        notice('');
    }
    window.addEventListener('pagehide', restore);
    window.addEventListener('pageshow', restore);
})();
