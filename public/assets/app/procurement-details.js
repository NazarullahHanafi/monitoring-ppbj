(function () {
    'use strict';
    const config = window.PROCUREMENT_DETAILS_CONFIG;
    let dialog, state, pendingSave, busy = false, operation, previousFocus;
    const csrfHeaders = () => ({ 'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf, 'X-Requested-With': 'XMLHttpRequest' });
    const endpoint = (kind, id) => `${config.baseUrl}/${kind}/${id}`;
    const choice = form => form.querySelector('[name="detail_upload_choice"]');
    const token = form => form.querySelector('[name="detail_attachment_token"]');
    function formKind(form) { return form.querySelector('[data-detail-form]').dataset.kind; }
    function formId(form) {
        const match = new URL(form.action, location.href).pathname.match(/\/(?:sp|spph)\/(\d+)$/);
        return match ? Number(match[1]) : null;
    }
    function formText(form) {
        return [...form.querySelectorAll('[name="deskripsi_pengadaan"], [name$="[nama_barang]"], .rt-editor')]
            .map(field => field.matches('.rt-editor') ? field.textContent : field.value).join(' ');
    }
    function updateForm(form) {
        const box = form.querySelector('[data-detail-form]');
        if (!box) return;
        const needed = window.AttachmentIntent.detect(formText(form));
        box.dataset.needed = String(needed);
        box.querySelector('[data-detail-hint]').hidden = !needed;
        box.querySelector('[data-detail-form-status]').textContent = token(form).value
            ? 'Lampiran siap ditautkan saat dokumen disimpan. Isi bisa diperiksa melalui Upload / periksa rincian.'
            : choice(form).value === 'later' ? 'Ditandai menyusul. Anda tetap dapat menyimpan, lalu mengunggah dari baris dokumen.'
                : 'Bisa diunggah sekarang atau dilengkapi setelah dokumen disimpan.';
    }
    function reset(form) {
        if (!form?.querySelector('[data-detail-form]')) return;
        token(form).value = ''; choice(form).value = ''; delete form.detailDraft;
        const id = formId(form);
        const rowState = id && document.querySelector(`[data-detail-open][data-kind="${formKind(form)}"][data-id="${id}"]`)?.dataset.state;
        if (rowState === 'deferred') choice(form).value = 'later';
        if (rowState === 'ready' || rowState === 'review') choice(form).value = 'now';
        setTimeout(() => updateForm(form), 0);
    }
    async function request(url, options = {}) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), options.body instanceof FormData ? 120000 : 30000);
        let rejectAbort;
        const cancelled = new Promise((_, reject) => { rejectAbort = () => reject(new Error('Dibatalkan')); controller.signal.addEventListener('abort', rejectAbort, {once: true}); });
        try {
            const read = async () => {
                const response = await fetch(url, { ...options, headers: { ...csrfHeaders(), ...(options.headers || {}) }, credentials: 'same-origin', signal: controller.signal });
                const type = response.headers.get('content-type') || '';
                if (response.redirected || !type.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang daftar lampiran sebelum mencoba lagi; berkas mungkin sudah tersimpan.');
                const data = await response.json();
                if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Respons lampiran tidak lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
                if (!response.ok) throw new Error(Object.values(data.errors || {}).flat()[0] || data.message || 'Permintaan belum berhasil. Coba muat ulang halaman.');
                return data;
            };
            return await Promise.race([read(), cancelled]);
        } catch (error) {
            if (controller.signal.aborted) throw new Error('Respons server terlalu lama. Muat ulang daftar lampiran untuk memeriksa hasil sebelum mengunggah ulang.');
            if (error instanceof SyntaxError) throw new Error('Respons belum dapat dibaca. Muat ulang daftar lampiran untuk memeriksa hasilnya.');
            throw error;
        } finally { clearTimeout(timer); controller.signal.removeEventListener('abort', rejectAbort); }
    }
    function attachmentResult(data, expectedId = null) {
        const item = data?.attachment;
        if (!item || typeof item.id !== 'string' || !item.id || (expectedId && item.id !== expectedId)
            || !Number.isSafeInteger(item.version) || item.version < 1 || typeof item.text !== 'string' || typeof item.name !== 'string') {
            throw new Error('Data lampiran belum lengkap. Muat ulang daftar sebelum mencoba lagi; teks yang diketik tetap dipertahankan.');
        }
        return item;
    }
    function status(text, error = false) {
        const node = dialog.querySelector('[data-pd-status]'); node.textContent = text; node.dataset.error = String(error);
    }
    function setBusy(value) {
        busy = value;
        dialog.querySelectorAll('button, input[type=file], textarea').forEach(button => { button.disabled = value; });
        dialog.querySelector('[data-pd-cancel]').hidden = !value || !operation;
        dialog.querySelector('[data-pd-cancel]').disabled = false;
        dialog.setAttribute('aria-busy', String(value));
    }
    function createDialog() {
        if (dialog) return;
        dialog = document.createElement('dialog'); dialog.className = 'pd-dialog'; dialog.setAttribute('aria-labelledby', 'pdTitle');
        dialog.innerHTML = `<div class="pd-dialog-head"><div><h2 id="pdTitle">Lampiran rincian barang / jasa</h2><p data-pd-number></p></div><button type="button" class="pd-close" data-pd-close aria-label="Tutup lampiran">×</button></div>
            <div class="pd-dialog-body"><p>Isi Word/PDF dapat ditemukan lewat pencarian setelah Anda memeriksa dan mengonfirmasinya. Pembacaan diproses di server sendiri atau perangkat Anda.</p>
            <div class="pd-drop" data-pd-upload><label for="pdFile"><strong>Pilih Word (.docx) atau PDF</strong></label><input type="file" id="pdFile" accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"><p>Maksimal 10 MB per berkas dan 30 halaman PDF. Word lama (.doc) perlu disimpan sebagai .docx.</p><button type="button" class="pd-button" data-pd-upload-only hidden>Unggah berkas, periksa teks nanti</button></div>
            <div class="pd-progress" data-pd-status role="status" aria-live="polite"></div><button type="button" class="pd-button pd-secondary" data-pd-cancel hidden>Batalkan pembacaan</button><button type="button" class="pd-button pd-secondary" data-pd-refresh hidden>Muat ulang daftar lampiran</button><div class="pd-files" data-pd-files></div></div>
            <div class="pd-dialog-foot"><button type="button" class="pd-button pd-secondary" data-pd-later>Lampiran belum dibuat · lengkapi nanti</button><button type="button" class="pd-button" data-pd-done>Selesai</button></div>`;
        document.body.appendChild(dialog);
        dialog.addEventListener('cancel', event => { event.preventDefault(); if (!busy) close(false); });
        dialog.querySelector('[data-pd-close]').onclick = () => close(false);
        dialog.querySelector('[data-pd-done]').onclick = () => close(true);
        dialog.querySelector('[data-pd-later]').onclick = defer;
        dialog.querySelector('[data-pd-cancel]').onclick = () => operation?.abort();
        dialog.querySelector('[data-pd-refresh]').onclick = async () => {
            if (busy || !state.id) return;
            setBusy(true);
            try {
                const data = await request(endpoint(state.kind, state.id));
                if (!Array.isArray(data.attachments)) throw new Error('Daftar lampiran belum dapat dibaca.');
                for (const item of data.attachments) attachmentResult({attachment: item});
                state.items = data.attachments; state.canManage = data.can_manage === true;
                dialog.querySelector('[data-pd-upload]').hidden = !state.canManage;
                renderFiles(); status('Daftar diperbarui. Koreksi teks yang belum disimpan tetap dipertahankan; cocokkan dengan versi terbaru sebelum konfirmasi.');
            } catch (error) { status(error.message, true); } finally { setBusy(false); }
        };
        dialog.querySelector('#pdFile').addEventListener('change', () => upload(false));
        dialog.querySelector('[data-pd-upload-only]').onclick = () => upload(true);
    }
    function close(proceed) {
        if (busy) return;
        if (dialog.querySelector('[data-pd-dirty="true"]') && !confirm('Perubahan teks belum dikonfirmasi. Tutup tanpa menyimpan perubahan teks tersebut?')) return;
        dialog.close();
        if (state.changed && state.id && !state.form) location.reload();
        if (state.form) updateForm(state.form);
        if (pendingSave) { const resolve = pendingSave; pendingSave = null; resolve(proceed && Boolean(choice(state.form).value || token(state.form).value || state.items.length)); }
        previousFocus?.focus();
    }
    function renderFiles() {
        const container = dialog.querySelector('[data-pd-files]'); container.replaceChildren();
        dialog.querySelector('[data-pd-later]').hidden = !state.canManage || state.items.length > 0;
        if (!state.items.length) {
            const empty = document.createElement('p'); empty.className = 'pd-empty'; empty.textContent = 'Belum ada lampiran rincian. Anda bisa mengunggah sekarang atau memilih lengkapi nanti.'; container.appendChild(empty);
        }
        for (const attachment of state.items) {
            const box = document.createElement('section'); box.className = 'pd-file';
            box.innerHTML = `<div class="pd-file-head"><a target="_blank" rel="noopener"></a><span data-pd-review-state></span></div><small data-pd-method></small><label>Isi yang akan masuk pencarian</label><textarea spellcheck="false" maxlength="200000"></textarea><div class="pd-actions"><button type="button" data-pd-review>Konfirmasi isi untuk pencarian</button><button type="button" class="pd-secondary" data-pd-delete>Hapus lampiran</button></div>`;
            const link = box.querySelector('a'); link.textContent = attachment.name; link.href = attachment.download_url;
            box.querySelector('[data-pd-review-state]').textContent = attachment.reviewed ? '✓ Sudah diperiksa' : 'Perlu diperiksa';
            box.querySelector('[data-pd-method]').textContent = ({ 'docx-structure': 'Teks dan tabel Word dibaca langsung.', 'pdf-text': 'Teks PDF dibaca langsung.', 'pdf-ocr': 'Hasil pembacaan scan di perangkat Anda.', 'pdf-mixed': 'Gabungan teks digital dan pembacaan scan.', 'manual': 'Lengkapi teks dari dokumen sumber.' })[attachment.method];
            const textarea = box.querySelector('textarea'); textarea.value = state.edits.get(attachment.id) ?? attachment.text;
            box.dataset.pdDirty = String(textarea.value !== attachment.text);
            if (box.dataset.pdDirty === 'true') box.querySelector('[data-pd-review-state]').textContent = 'Perubahan belum disimpan';
            textarea.setAttribute('aria-label', `Isi rincian ${attachment.name}`); textarea.readOnly = !state.canManage;
            box.querySelector('.pd-actions').hidden = !state.canManage;
            textarea.addEventListener('input', () => { state.edits.set(attachment.id, textarea.value); box.dataset.pdDirty = String(textarea.value !== attachment.text); box.querySelector('[data-pd-review-state]').textContent = 'Perubahan belum disimpan'; });
            box.querySelector('[data-pd-review]').onclick = async () => {
                if (busy) return;
                if (!textarea.value.trim()) { status('Isi rincian masih kosong. Lengkapi berdasarkan dokumen sebelum dikonfirmasi.', true); return; }
                setBusy(true);
                try {
                    const data = await request(attachment.review_url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: textarea.value, version: attachment.version }) });
                    const confirmed = attachmentResult(data, attachment.id);
                    if (!confirmed.reviewed || confirmed.version <= attachment.version) throw new Error('Konfirmasi belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.');
                    state.items = state.items.map(item => item.id === attachment.id ? confirmed : item);
                    state.edits.delete(attachment.id);
                    if (state.form?.detailDraft?.id === attachment.id) state.form.detailDraft = confirmed;
                    state.changed = true; renderFiles(); status('Isi telah dikonfirmasi. Pencarian menggunakan teks yang Anda periksa.');
                } catch (error) { status(error.message, true); } finally { setBusy(false); }
            };
            box.querySelector('[data-pd-delete]').onclick = async () => {
                if (busy) return;
                if (!confirm(`Hapus lampiran rincian "${attachment.name}"?`)) return;
                setBusy(true);
                try {
                    const result = await request(attachment.delete_url, { method: 'DELETE' });
                    if (typeof result.message !== 'string') throw new Error('Penghapusan belum dapat diverifikasi. Muat ulang daftar sebelum mencoba lagi.');
                    state.items = state.items.filter(item => item.id !== attachment.id);
                    state.edits.delete(attachment.id);
                    if (state.form && token(state.form).value === attachment.id) { token(state.form).value = ''; delete state.form.detailDraft; choice(state.form).value = ''; }
                    state.changed = true; renderFiles(); status('Lampiran dihapus.');
                } catch (error) { status(error.message, true); } finally { setBusy(false); }
            };
            container.appendChild(box);
        }
    }
    async function open(kind, id, form = null, forSave = false) {
        if (busy) return false;
        createDialog(); previousFocus = document.activeElement;
        state = { kind, id, form, forSave, items: [], edits: new Map(), canManage: true, changed: false };
        dialog.querySelector('[data-pd-number]').textContent = forSave ? 'Keterangan mengacu pada lampiran. Pilih unggah sekarang atau lengkapi nanti untuk melanjutkan penyimpanan.' : 'Rincian dan sumber dokumen';
        dialog.querySelector('#pdFile').value = '';
        dialog.querySelector('[data-pd-upload-only]').hidden = true;
        dialog.querySelector('[data-pd-refresh]').hidden = !id;
        dialog.querySelector('[data-pd-done]').textContent = forSave ? 'Selesai · lanjutkan simpan' : 'Selesai';
        status(''); renderFiles(); dialog.showModal();
        if (id) {
            setBusy(true);
            try {
                const data = await request(endpoint(kind, id));
                if (!Array.isArray(data.attachments) || typeof data.can_manage !== 'boolean') throw new Error('Daftar lampiran belum lengkap. Gunakan Muat ulang daftar lampiran untuk mencoba kembali.');
                for (const item of data.attachments) attachmentResult({attachment: item});
                state.items = data.attachments; state.canManage = data.can_manage;
                dialog.querySelector('[data-pd-number]').textContent = data.number;
            } catch (error) { state.canManage = false; status(error.message, true); }
            finally { setBusy(false); }
        } else if (form?.detailDraft) state.items = [form.detailDraft];
        dialog.querySelector('[data-pd-upload]').hidden = !state.canManage;
        dialog.querySelector('[data-pd-later]').hidden = !state.canManage;
        renderFiles();
        if (forSave) return new Promise(resolve => { pendingSave = resolve; });
        return true;
    }
    async function upload(skipReading) {
        const file = dialog.querySelector('#pdFile').files[0];
        if (!file || busy) return;
        if (file.size > 10 * 1024 * 1024 || !/\.(docx|pdf)$/i.test(file.name)) { status('Gunakan Word .docx atau PDF maksimal 10 MB.', true); return; }
        if (!state.id && state.items.length) { status('Satu lampiran sementara sudah tersedia. Hapus dulu jika ingin menggantinya; lampiran tambahan bisa diunggah setelah dokumen disimpan.', true); return; }
        operation = new AbortController(); setBusy(true);
        dialog.querySelector('[data-pd-upload-only]').hidden = true;
        try {
            let result = { text: '', method: 'manual' };
            if (/\.pdf$/i.test(file.name) && !skipReading) {
                try { result = await window.ProcurementDocumentReader.readPdf(file, text => status(text), operation.signal); }
                catch (error) {
                    if (operation.signal.aborted) throw error;
                    dialog.querySelector('[data-pd-upload-only]').hidden = false;
                    throw new Error(`${error.message} Berkas belum diunggah. Anda dapat memilih "Unggah berkas, periksa teks nanti".`);
                }
            }
            if (operation.signal.aborted) throw new DOMException('Dibatalkan', 'AbortError');
            status('Menyimpan lampiran…');
            const body = new FormData(); body.set('document_file', file);
            if (state.id) body.set('document_id', state.id);
            body.set('extracted_text', result.text); body.set('method', result.method);
            // Once upload starts it completes atomically; cancellation is for the local reader only.
            dialog.querySelector('[data-pd-cancel]').hidden = true;
            const data = await request(`${config.baseUrl}/${state.kind}/drafts`, { method: 'POST', body });
            const uploaded = attachmentResult(data);
            state.items.push(uploaded); state.changed = true;
            if (state.form) {
                choice(state.form).value = 'now';
                if (!state.id) { token(state.form).value = uploaded.id; state.form.detailDraft = uploaded; }
            }
            renderFiles(); dialog.querySelector('#pdFile').value = '';
            status(uploaded.text ? 'Lampiran tersimpan. Cocokkan hasil bacaan dengan dokumen, lalu Konfirmasi isi untuk pencarian.' : 'Lampiran tersimpan. Teks belum terbaca; Anda bisa melengkapinya di kotak pemeriksaan sekarang atau nanti.');
        } catch (error) { status(operation.signal.aborted ? 'Pembacaan dibatalkan. Berkas belum diunggah; Anda bisa mencoba lagi atau melengkapi nanti.' : error.message, !operation.signal.aborted); }
        finally { operation = null; setBusy(false); }
    }
    async function defer() {
        if (busy) return;
        setBusy(true);
        try {
            if (state.id) {
                const result = await request(`${endpoint(state.kind, state.id)}/defer`, { method: 'POST' });
                if (typeof result.message !== 'string') throw new Error('Penandaan menyusul belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.');
            }
            if (state.form) choice(state.form).value = 'later';
            state.changed = true; setBusy(false); close(true);
        } catch (error) { status(error.message, true); setBusy(false); }
    }
    function init() {
        document.querySelectorAll('[data-detail-form]').forEach(box => {
            const form = box.closest('form');
            box.querySelector('[data-detail-form-open]').onclick = () => open(formKind(form), formId(form), form);
            box.querySelector('[data-detail-form-later]').onclick = () => { choice(form).value = 'later'; updateForm(form); };
            form.addEventListener('input', () => updateForm(form));
            form.addEventListener('reset', () => reset(form));
            new MutationObserver(() => updateForm(form)).observe(form.querySelector('[id$="Rows"]') || box, { childList: true, subtree: true });
            updateForm(form);
        });
        document.addEventListener('click', event => {
            const button = event.target.closest('[data-detail-open]');
            if (button) open(button.dataset.kind, Number(button.dataset.id)).catch(error => status(error.message, true));
        });
    }
    window.ProcurementDetails = {
        reset,
        async beforeSave(form) {
            if (!form.querySelector('[data-detail-form]')) return true;
            if (!window.AttachmentIntent.detect(formText(form)) || choice(form).value || token(form).value) return true;
            return open(formKind(form), formId(form), form, true);
        },
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
