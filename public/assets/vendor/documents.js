(function () {
    'use strict';
    const config = window.VENDOR_DOCUMENTS_CONFIG;
    const dialog = document.getElementById('vendorDocuments');
    if (!config || !dialog) return;
    const maxBytes = Math.min(10485760, Number(config.maxBytes) > 0 ? Number(config.maxBytes) : 10485760);
    const maxLabel = `${(maxBytes / 1048576).toFixed(1).replace(/\.0$/, '')} MB`;
    const find = selector => dialog.querySelector(selector);
    const editor = find('[data-vd-editor]'), filter = find('[data-vd-filter]'), list = find('[data-vd-list]');
    const field = name => editor.elements.namedItem(name);
    let vendorId, vendorName, base, busy = false, dirty = false, editDocument = null, uploadId = null;
    let page = 1, applied = { q: '', type: '' }, sequence = 0, listAbort, readAbort;
    let lastAttempt = { page: 1, criteria: { q: '', type: '' } };

    function status(message = '', error = false) {
        const node = find('[data-vd-status]'); node.textContent = message; node.dataset.error = String(error);
    }
    function freeze(value, reading = false) {
        busy = value;
        if (value) { sequence++; listAbort?.abort(); }
        dialog.setAttribute('aria-busy', String(value));
        dialog.querySelectorAll('button,input,textarea,select').forEach(node => { node.disabled = value; });
        if (!value && config.readOnly) find('[data-vd-new]').disabled = true;
        find('[data-vd-cancel-read]').hidden = !reading;
        find('[data-vd-cancel-read]').disabled = !reading;
    }
    async function request(url, options = {}, asFile = false) {
        const controller = new AbortController(); let timer;
        const abort = () => controller.abort();
        if (options.signal?.aborted) controller.abort();
        options.signal?.addEventListener('abort', abort, { once: true });
        try {
            return await Promise.race([
                (async () => {
                    const response = await fetch(url, { ...options, credentials: 'same-origin', signal: controller.signal,
                        headers: { Accept: asFile ? 'application/octet-stream' : 'application/json', 'X-CSRF-TOKEN': config.csrf, ...(options.headers || {}) } });
                    if (response.redirected) throw new Error('Sesi berubah. Muat ulang halaman dan masuk kembali.');
                    if (asFile && response.ok && !response.headers.get('content-type')?.includes('application/json')) {
                        const blob = await response.blob();
                        if (!blob.size || blob.size > 10485760) throw new Error('Ukuran berkas unduhan tidak sesuai.');
                        return blob;
                    }
                    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons server tidak sesuai. Muat ulang daftar sebelum mencoba kembali.');
                    const result = await response.json();
                    if (!response.ok) {
                        const validation = result.errors && Object.values(result.errors).flat()[0];
                        throw new Error(validation || result.message || 'Permintaan belum berhasil. Coba kembali.');
                    }
                    return result;
                })(),
                new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('Respons server terlalu lama. Muat ulang daftar; untuk unggahan, coba kembali dengan berkas yang sama.')); }, options.method || asFile ? 330000 : 30000); }),
            ]);
        } finally {
            clearTimeout(timer); options.signal?.removeEventListener('abort', abort);
        }
    }
    function validDocument(doc) {
        return doc && typeof doc.id === 'string' && /^[a-f0-9-]{36}$/.test(doc.id) && Number.isInteger(doc.version) && doc.version > 0;
    }
    function element(tag, text, className) {
        const node = document.createElement(tag); if (text !== undefined) node.textContent = text;
        if (className) node.className = className; return node;
    }
    function button(text, action) {
        const node = element('button', text); node.type = 'button'; node.addEventListener('click', action); return node;
    }
    function render(rows) {
        list.replaceChildren();
        if (!rows.length) list.append(element('p', 'Belum ada lampiran yang sesuai. Tambahkan lampiran atau ubah filter.'));
        for (const doc of rows) {
            const card = element('article', undefined, 'vd-card');
            card.append(element('span', doc.type_label, 'vd-tag'), element('h3', doc.title));
            const info = [doc.original_name, `${(doc.size / 1024).toFixed(1)} KB`];
            if (doc.document_number) info.push(`Nomor: ${doc.document_number}`);
            if (doc.expires_at) info.push(`Berlaku sampai: ${doc.expires_at}`);
            card.append(element('p', info.join(' · ')));
            card.append(element('p', doc.status === 'ready' ? (doc.has_text ? 'Teks diperiksa · dapat dicari' : 'Metadata dapat dicari · teks scan belum dilengkapi') : doc.status === 'deleting' ? 'Penghapusan belum terkonfirmasi · coba hapus kembali' : 'Unggahan belum terkonfirmasi · ulangi dengan berkas yang sama'));
            const actions = element('div', undefined, 'vd-toolbar');
            if (doc.status === 'ready') {
                const link = element('a', 'Unduh'); link.href = `${base}/${doc.id}/download`; link.target = '_blank'; link.rel = 'noopener'; actions.append(link);
                if (!config.readOnly) actions.append(button('Periksa / ubah', () => edit(doc)));
            } else if (doc.status !== 'deleting' && !config.readOnly) actions.append(button('Lanjutkan unggahan', () => edit(doc, true)));
            if (!config.readOnly) actions.append(button('Hapus', () => remove(doc)));
            card.append(actions); list.append(card);
        }
    }
    async function load(targetPage = page, criteria = applied) {
        if (busy) return;
        lastAttempt = { page: targetPage, criteria: { ...criteria } };
        const ticket = ++sequence; listAbort?.abort(); listAbort = new AbortController();
        list.hidden = true; find('[data-vd-prev]').hidden = find('[data-vd-next]').hidden = true;
        status('Memuat daftar lampiran…');
        try {
            const params = new URLSearchParams({ ...criteria, page: targetPage });
            const result = await request(`${base}?${params}`, { signal: listAbort.signal });
            if (ticket !== sequence) return;
            if (!Array.isArray(result.data) || !result.data.every(validDocument) || typeof result.has_more !== 'boolean') throw new Error('Daftar belum valid. Coba muat ulang.');
            page = targetPage; applied = { ...criteria }; render(result.data); list.hidden = false;
            if (Number.isInteger(result.ready_count) && result.ready_count >= 0) {
                document.querySelectorAll('[data-vd-open]').forEach(node => { if (node.dataset.vendorId === vendorId) node.textContent = `Lampiran · ${result.ready_count}`; });
            }
            find('[data-vd-prev]').hidden = page === 1; find('[data-vd-next]').hidden = !result.has_more;
            find('[data-vd-page]').textContent = `Halaman ${page}`;
            status();
            return true;
        } catch (error) {
            if (ticket === sequence && error.name !== 'AbortError') status(`${error.message} Gunakan Muat ulang daftar untuk mencoba kembali.`, true);
        }
    }
    function discard() { return !dirty || window.confirm('Perubahan lampiran belum disimpan. Buang perubahan ini?'); }
    function resetEditor() {
        editor.reset(); editor.hidden = true; dirty = false; editDocument = null; uploadId = null;
        find('[data-vd-file-wrap]').hidden = false; field('file').required = true;
    }
    async function edit(doc, retry = false) {
        if (busy || !discard()) return;
        freeze(true); status('Memuat dokumen…');
        try {
            const result = await request(`${base}/${doc.id}`);
            if (!validDocument(result.document) || typeof result.search_text !== 'string') throw new Error('Data dokumen belum valid. Muat ulang daftar.');
            resetEditor(); editDocument = retry ? null : result.document; uploadId = retry ? doc.id : null;
            for (const name of ['type', 'title', 'document_number', 'expires_at']) field(name).value = result.document[name] || '';
            field('search_text').value = result.search_text;
            field('text_confirmed').checked = Boolean(result.search_text);
            find('[data-vd-file-wrap]').hidden = !retry; field('file').required = retry;
            find('[data-vd-editor-title]').textContent = retry ? 'Lanjutkan unggahan · pilih berkas yang sama' : 'Periksa teks dan informasi dokumen';
            find('[data-vd-save]').textContent = retry ? 'Simpan ke OneDrive' : 'Simpan hasil pemeriksaan';
            editor.hidden = false; status(); field('title').focus();
        } catch (error) { status(error.message, true); } finally { freeze(false); }
    }
    async function remove(doc) {
        if (busy || !window.confirm(`Hapus lampiran “${doc.title}” dari vendor dan OneDrive?`)) return;
        freeze(true); status('Menghapus berkas dari OneDrive…');
        let succeeded = false;
        try {
            const result = await request(`${base}/${doc.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: doc.version }) });
            if (result.deleted !== true) throw new Error('Penghapusan belum terkonfirmasi. Muat ulang daftar.');
            succeeded = true;
            if (editDocument?.id === doc.id || uploadId === doc.id) resetEditor();
        } catch (error) { status(error.message, true); } finally { freeze(false); }
        if (succeeded && await load(1)) status('Lampiran telah dihapus.');
    }
    document.querySelectorAll('[data-vd-open]').forEach(node => node.addEventListener('click', () => {
        vendorId = node.dataset.vendorId; vendorName = node.dataset.vendorName;
        base = `${config.baseUrl}/${encodeURIComponent(vendorId)}/documents`;
        resetEditor(); filter.reset(); applied = { q: '', type: '' }; page = 1;
        find('[data-vd-name]').textContent = vendorName; dialog.showModal(); dialog.scrollTop = 0; load(1);
    }));
    function close() {
        if (busy || !discard()) return;
        sequence++; listAbort?.abort(); dialog.close(); resetEditor(); status();
    }
    find('[data-vd-close]').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    find('[data-vd-new]').addEventListener('click', () => {
        if (busy || config.readOnly || !discard()) return;
        resetEditor(); editor.hidden = false; uploadId = crypto.randomUUID();
        find('[data-vd-editor-title]').textContent = 'Tambah lampiran'; find('[data-vd-save]').textContent = 'Simpan ke OneDrive';
        field('title').focus();
    });
    find('[data-vd-cancel-editor]').addEventListener('click', () => { if (!busy && discard()) resetEditor(); });
    editor.addEventListener('input', () => { dirty = true; });
    field('search_text').addEventListener('input', () => { field('text_confirmed').checked = false; });
    field('file').addEventListener('change', () => {
        // A changed file must not carry text from another document. Preserve the
        // retry identifier until the pending upload is explicitly cancelled.
        field('search_text').value = ''; field('text_confirmed').checked = false;
        if (!field('title').value && field('file').files[0]) field('title').value = field('file').files[0].name.slice(0, 160);
    });
    editor.addEventListener('submit', async event => {
        event.preventDefault(); if (busy || config.readOnly || !editor.reportValidity()) return;
        if (field('search_text').value.trim() && !field('text_confirmed').checked) { status('Periksa teks lalu centang konfirmasi sebelum menyimpan.', true); field('text_confirmed').focus(); return; }
        const file = field('file').files[0];
        if (!editDocument && (!file || !file.size || file.size > maxBytes)) { status(`Pilih berkas PDF, JPG, atau PNG berukuran maksimal ${maxLabel}.`, true); return; }
        const body = new FormData(editor);
        if (!field('search_text').value.trim()) body.delete('text_confirmed');
        if (editDocument) { body.delete('file'); body.set('version', editDocument.version); body.set('_method', 'PUT'); }
        else { uploadId ||= crypto.randomUUID(); body.set('upload_id', uploadId); }
        freeze(true); status(editDocument ? 'Menyimpan hasil pemeriksaan…' : 'Mengirim ke OneDrive dan memeriksa integritas berkas. Tunggu hingga selesai…');
        let succeeded = false;
        try {
            const result = await request(editDocument ? `${base}/${editDocument.id}` : base, { method: 'POST', body });
            if (!validDocument(result.document) || result.document.status !== 'ready' || result.document.id !== (editDocument?.id || uploadId)) throw new Error('Simpanan belum terkonfirmasi. Muat ulang daftar sebelum mencoba kembali.');
            if (result.reused === true) {
                editDocument = result.document; uploadId = null; dirty = true;
                find('[data-vd-file-wrap]').hidden = true; field('file').required = false;
                find('[data-vd-editor-title]').textContent = 'Berkas sudah tersimpan · periksa perubahan informasi';
                find('[data-vd-save]').textContent = 'Simpan hasil pemeriksaan';
                status('Berkas ini sudah tersimpan sebelumnya. Teks dan informasi pada formulir tetap tersedia; periksa lalu simpan hasil pemeriksaan bila ingin memperbaruinya.');
                return;
            }
            succeeded = true; resetEditor();
        } catch (error) { status(error.message, true); } finally { freeze(false); }
        if (succeeded) { filter.reset(); if (await load(1, { q: '', type: '' })) status('Lampiran tersimpan. Metadata dan teks yang diperiksa sudah dapat dicari.'); }
    });
    find('[data-vd-read]').addEventListener('click', async () => {
        if (busy || config.readOnly) return;
        if (field('search_text').value.trim() && !window.confirm('Ganti teks saat ini dengan hasil pembacaan berkas?')) return;
        let file = field('file').files[0];
        if (!file && !editDocument) { status('Pilih PDF atau foto terlebih dahulu.', true); return; }
        if (file && (!file.size || file.size > maxBytes)) { status(`Berkas harus berukuran 1 byte hingga ${maxLabel}.`, true); return; }
        readAbort = new AbortController(); freeze(true, true); let timer;
        try {
            if (!file) {
                status('Mengambil berkas dari OneDrive untuk dibaca di perangkat…');
                const blob = await request(`${base}/${editDocument.id}/download`, { signal: readAbort.signal }, true);
                file = new File([blob], editDocument.original_name, { type: blob.type });
            }
            const reader = window.ProcurementDocumentReader;
            const method = file.type === 'application/pdf' || /\.pdf$/i.test(file.name) ? 'readPdf' : /^image\/(jpeg|png)$/.test(file.type) ? 'readImage' : null;
            if (!method) throw new Error('Pembaca mendukung PDF, JPG, dan PNG.');
            const result = await Promise.race([
                reader[method](file, message => status(message), readAbort.signal, config.readerUrl),
                new Promise((_, reject) => { timer = setTimeout(() => { readAbort.abort(); reject(new Error('Pembacaan terlalu lama. Perkecil atau pisahkan berkas, atau lengkapi teks secara manual.')); }, 240000); }),
            ]);
            field('search_text').value = result.text; field('text_confirmed').checked = false; dirty = true;
            status(result.text.trim() ? 'Teks selesai dibaca. Periksa ejaan dan nomor, lalu centang konfirmasi sebelum menyimpan.' : 'Teks belum terbaca. Anda dapat mengetik teks pencarian secara manual.');
        } catch (error) { status(readAbort.signal.aborted && error.name === 'AbortError' ? 'Pembacaan dibatalkan. Perubahan sebelumnya tetap tersedia.' : error.message, error.name !== 'AbortError'); }
        finally { clearTimeout(timer); freeze(false); readAbort = null; }
    });
    find('[data-vd-cancel-read]').addEventListener('click', () => readAbort?.abort());
    find('[data-vd-refresh]').addEventListener('click', () => load(lastAttempt.page, lastAttempt.criteria));
    filter.addEventListener('submit', event => { event.preventDefault(); load(1, { q: filter.elements.q.value.trim(), type: filter.elements.type.value }); });
    find('[data-vd-reset]').addEventListener('click', () => { filter.reset(); load(1, { q: '', type: '' }); });
    find('[data-vd-prev]').addEventListener('click', () => load(page - 1));
    find('[data-vd-next]').addEventListener('click', () => load(page + 1));
    window.addEventListener('beforeunload', event => { if (busy || dirty) { event.preventDefault(); event.returnValue = ''; } });
    freeze(false);
})();
