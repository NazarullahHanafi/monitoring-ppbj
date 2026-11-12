(function () {
    'use strict';
    if (window.FormUX) return;
    let serial = 0;
    const originalDescriptions = new WeakMap();
    function label(field) {
        const explicit = field.id && document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
        const source = field.getAttribute('aria-label') || explicit?.textContent || field.closest('label')?.firstChild?.textContent || field.placeholder || field.name || 'Kolom ini';
        return source.trim().replace(/\s+/g, ' ').slice(0, 90);
    }
    function message(field) {
        const validity = field.validity;
        if (validity.valueMissing || (field.required && typeof field.value === 'string' && !field.value.trim())) return `${label(field)} perlu diisi.`;
        if (validity.typeMismatch) return field.type === 'email' ? 'Masukkan alamat email yang lengkap, misalnya nama@perusahaan.co.id.' : `${label(field)} belum sesuai format.`;
        if (validity.badInput) return `${label(field)} belum lengkap. Periksa kembali angka atau tanggalnya.`;
        if (validity.tooLong) return `Maksimal ${field.maxLength} karakter untuk ${label(field)}.`;
        if (validity.tooShort) return `Isi minimal ${field.minLength} karakter untuk ${label(field)}.`;
        if (validity.rangeUnderflow) return `Nilai minimal ${field.min} untuk ${label(field)}.`;
        if (validity.rangeOverflow) return `Nilai maksimal ${field.max} untuk ${label(field)}.`;
        if (validity.patternMismatch || validity.stepMismatch || validity.customError) return `${label(field)} belum sesuai. Periksa kembali isian ini.`;
        return '';
    }
    function clearField(field) {
        if (!field?.dataset?.uxError) return;
        document.getElementById(field.dataset.uxError)?.remove();
        field.removeAttribute('aria-invalid');
        const original = originalDescriptions.get(field);
        if (original) field.setAttribute('aria-describedby', original); else field.removeAttribute('aria-describedby');
        delete field.dataset.uxError;
    }
    function fieldError(field, text) {
        clearField(field);
        const error = document.createElement('span'); error.className = 'ux-field-error'; error.id = `uxError${++serial}`; error.textContent = text;
        originalDescriptions.set(field, field.getAttribute('aria-describedby') || '');
        field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', [originalDescriptions.get(field), error.id].filter(Boolean).join(' '));
        field.dataset.uxError = error.id; field.insertAdjacentElement('afterend', error);
    }
    function summary(form) {
        const fields = [...form.querySelectorAll('[data-ux-error]')];
        let box = form.querySelector('[data-ux-summary]');
        if (!fields.length) { box?.remove(); return; }
        if (!box) { box = document.createElement('div'); box.className = 'ux-error-summary'; box.dataset.uxSummary = ''; box.setAttribute('role', 'alert'); form.prepend(box); }
        box.replaceChildren();
        const title = document.createElement('strong'); title.textContent = `${fields.length} isian perlu diperiksa`; box.append(title);
        const text = document.createElement('p'); text.textContent = 'Data Anda tetap tersedia. Perbaiki kolom yang ditandai lalu simpan kembali.'; box.append(text);
    }
    function errors(form, values, focus = true) {
        let first;
        for (const [name, value] of Object.entries(values || {})) {
            const field = [...form.elements].find(node => node.name === name && !node.disabled);
            if (!field) continue;
            fieldError(field, Array.isArray(value) ? value[0] : String(value)); first ||= field;
        }
        summary(form); if (focus) first?.focus(); return !first;
    }
    function clear(form) { form.querySelectorAll('[data-ux-error]').forEach(clearField); summary(form); }
    function validate(form) {
        clear(form); let first;
        for (const field of [...form.elements]) {
            if (!field.willValidate || field.disabled) continue;
            const text = message(field);
            if (text) { fieldError(field, text); first ||= field; }
        }
        summary(form); first?.focus(); return !first;
    }
    const queued = new Set();
    document.addEventListener('invalid', event => {
        event.preventDefault(); const field = event.target, form = field.form;
        if (!form) return;
        fieldError(field, message(field) || 'Periksa kembali isian ini.');
        if (!queued.has(form)) { queued.add(form); queueMicrotask(() => { queued.delete(form); summary(form); form.querySelector('[data-ux-error]')?.focus(); }); }
    }, true);
    document.addEventListener('input', event => { const field = event.target; if (field.dataset?.uxError) { clearField(field); if (field.form) summary(field.form); } });
    document.addEventListener('change', event => { const field = event.target; if (field.dataset?.uxError) { clearField(field); if (field.form) summary(field.form); } });
    document.addEventListener('reset', event => { if (event.target.tagName === 'FORM') clear(event.target); });
    const submissions = new Map();
    function releaseSubmission(form) {
        const state = submissions.get(form); if (!state) return;
        clearTimeout(state.timer); submissions.delete(form); form.classList.remove('ux-submitting');
        if (state.busy === null) form.removeAttribute('aria-busy'); else form.setAttribute('aria-busy', state.busy);
        for (const [button, value] of state.buttons) {
            if (value === null) button.removeAttribute('aria-disabled'); else button.setAttribute('aria-disabled', value);
        }
    }
    document.addEventListener('submit', event => {
        if (submissions.has(event.target)) { event.preventDefault(); event.stopImmediatePropagation(); }
    }, true);
    window.addEventListener('submit', event => {
        const form = event.target;
        queueMicrotask(() => {
            // Async/confirmation handlers own their submit lifecycle. Preserve
            // every enabled field and submitter value for normal form encoding.
            const method = event.submitter?.getAttribute('formmethod') || form.getAttribute('method') || 'get';
            const target = event.submitter?.getAttribute('formtarget') || form.getAttribute('target');
            if (event.defaultPrevented || method.toLowerCase() === 'get' || target === '_blank'
                || form.dataset.uxNativeGuard === 'off' || submissions.has(form)) return;
            const state = { busy: form.getAttribute('aria-busy'), buttons: [...form.querySelectorAll('button[type=submit],button:not([type]),input[type=submit]')].map(button => [button, button.getAttribute('aria-disabled')]) };
            submissions.set(form, state); form.classList.add('ux-submitting'); form.setAttribute('aria-busy', 'true');
            state.buttons.forEach(([button]) => button.setAttribute('aria-disabled', 'true'));
            state.timer = setTimeout(() => releaseSubmission(form), 60000);
        });
    });
    window.addEventListener('pageshow', () => [...submissions.keys()].forEach(releaseSubmission));
    async function confirm(options) {
        const prior = document.activeElement, dialog = document.createElement('dialog'); dialog.className = 'ux-confirm';
        const title = document.createElement('h2'); title.id = `uxConfirm${++serial}`; title.textContent = options.title || 'Konfirmasi'; dialog.setAttribute('aria-labelledby', title.id);
        const text = document.createElement('p'); text.textContent = options.text;
        const actions = document.createElement('div'); actions.className = 'ux-confirm-actions';
        const cancel = document.createElement('button'); cancel.type = 'button'; cancel.textContent = options.cancel || 'Kembali';
        const accept = document.createElement('button'); accept.type = 'button'; accept.className = options.danger ? 'ux-danger' : 'ux-accept'; accept.textContent = options.accept || 'Lanjutkan';
        actions.append(cancel, accept); dialog.append(title, text, actions); document.body.append(dialog);
        return new Promise(resolve => {
            const finish = value => { dialog.close(); dialog.remove(); prior?.focus(); resolve(value); };
            cancel.onclick = () => finish(false); accept.onclick = () => finish(true);
            dialog.addEventListener('cancel', event => { event.preventDefault(); finish(false); });
            dialog.showModal(); cancel.focus();
        });
    }
    window.FormUX = { validate, errors, clear, confirm };
})();
