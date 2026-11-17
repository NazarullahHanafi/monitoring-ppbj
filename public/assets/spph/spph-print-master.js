(function () {
    'use strict';
    const types = {penandatangan_sci: 'Penandatangan', jabatan_sci: 'Jabatan'};
    const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    let activeRun = null, interrupted = false;
    async function json(url, options = {}, controller = new AbortController()) {
        const signal = controller.signal, writing = Boolean(options.method && options.method !== 'GET');
        let timer, onAbort, sent = false;
        try {
            const cancelled = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                signal.addEventListener('abort', onAbort, {once: true}); if (signal.aborted) onAbort();
            });
            const deadline = new Promise((_, reject) => {
                timer = setTimeout(() => {reject(Object.assign(new Error('Hasil belum terkonfirmasi karena koneksi lambat. Muat ulang daftar sebelum mencoba lagi.'), {uncertain: writing})); controller.abort();}, 30000);
            });
            return await Promise.race([cancelled, deadline, (async () => {
                const headers = {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...options.headers};
                if (writing) {
                    const token = document.querySelector('meta[name="csrf-token"]')?.content;
                    if (!token) throw new Error('Sesi formulir berakhir. Muat ulang halaman.');
                    headers['X-CSRF-TOKEN'] = token;
                }
                if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
                sent = true;
                const response = await fetch(url, {...options, credentials: 'same-origin', cache: 'no-store', signal, headers});
                if (response.redirected || !(response.headers.get('content-type') || '').includes('application/json')) throw Object.assign(new Error('Respons belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: writing});
                const data = await response.json();
                if (!data || typeof data !== 'object' || Array.isArray(data)) throw Object.assign(new Error('Respons master belum lengkap. Muat ulang daftar.'), {uncertain: writing});
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Silakan masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Anda tidak diizinkan mengubah master.', 429: 'Batas permintaan tercapai. Tunggu sebelum mencoba lagi.'};
                    const detail = [409, 422].includes(response.status) ? Object.values(data.errors || {}).flat().find(v => typeof v === 'string') || data.message : null;
                    throw Object.assign(new Error(typeof detail === 'string' ? detail : messages[response.status] || 'Hasil belum terkonfirmasi. Muat ulang daftar sebelum mencoba lagi.'), {status: response.status, errors: data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors) ? data.errors : {}, uncertain: writing && response.status >= 500});
                }
                return data;
            })()]);
        } catch (error) {
            if (['SyntaxError', 'TypeError'].includes(error?.name)) throw Object.assign(new Error('Respons server belum dapat dibaca. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: writing && sent});
            throw error;
        } finally {clearTimeout(timer); signal.removeEventListener('abort', onAbort);}
    }
    function validRow(row, type) {
        return Number.isSafeInteger(row?.id) && row.id > 0 && row.type === type && typeof row.nama === 'string' && row.nama.trim() !== ''
            && [...row.nama].length <= 255 && typeof row.is_active === 'boolean' && /^[a-f0-9]{64}$/.test(row.version);
    }
    async function request(url, options = {}, signal) {
        const controller = new AbortController(), cancel = () => controller.abort();
        signal?.addEventListener('abort', cancel, {once: true}); if (signal?.aborted) cancel();
        try {return await json(url, options, controller);}
        finally {signal?.removeEventListener('abort', cancel); controller.abort();}
    }
    async function list(type, query = {}, controller) {
        const data = await json('/spph/print-masters?' + new URLSearchParams({type, ...query}), {}, controller);
        if (!Array.isArray(data.options) || data.options.length > (query.per_page || 12) || !data.options.every(row => validRow(row, type) && (!Number(query.active_only) || row.is_active))
            || !Number.isSafeInteger(data.page) || data.page < 1 || !Number.isSafeInteger(data.last_page) || data.last_page < 1 || !Number.isSafeInteger(data.total) || data.total < 0) throw new Error('Daftar master belum lengkap. Muat ulang daftar.');
        return data;
    }
    async function choices(signerId, titleId, fieldId, withFields = false, signal) {
        const controller = new AbortController(), cancel = () => controller.abort();
        signal?.addEventListener('abort', cancel, {once: true}); if (signal?.aborted) cancel();
        try {
            const result = await Promise.all([['penandatangan_sci', signerId], ['jabatan_sci', titleId], ...(withFields ? [['bidang_pr', fieldId]] : [])]
                .map(([type, id]) => list(type, {active_only: 1, per_page: 50, ...(id ? {include_id: id} : {})}, controller)));
            return {names: result[0].options, titles: result[1].options, ...(withFields ? {fields: result[2].options} : {})};
        } finally {signal?.removeEventListener('abort', cancel); controller.abort();}
    }
    async function run(canManage, initialType, withFields, owner) {
        const allowed = {...types, ...(withFields ? {bidang_pr: 'Bidang pemilik PR'} : {})};
        const s = {type: Object.hasOwn(allowed, initialType) ? initialType : 'penandatangan_sci', types: allowed, q: '', searchDraft: '', page: 1, lastPage: 1,
            rows: [], edit: null, draft: {nama: '', is_active: true}, drafts: {}, busy: false, reading: false, unverified: interrupted, message: '', deactivate: null};
        interrupted = false;
        let picked = null, closed = false, read = null, write = null;
        const alive = () => !closed;
        const capture = () => {
            const name = document.getElementById('sgMasterName');
            if (name) s.draft = {nama: name.value, is_active: Boolean(document.getElementById('sgMasterActive')?.checked)};
            const query = document.getElementById('sgMasterQuery'); if (query) s.searchDraft = query.value;
        };
        const draw = () => {
            if (!alive()) return;
            const focused = document.activeElement, id = focused?.id, start = focused?.selectionStart, end = focused?.selectionEnd;
            Swal.update({html: render(s, canManage)});
            const next = id && document.getElementById(id);
            if (next && !next.disabled) {next.focus?.(); if (typeof start === 'number') next.setSelectionRange?.(start, end);}
        };
        owner.dispose = () => {if (closed) return; if (s.busy) interrupted = true; closed = true; read?.abort(); write?.abort();};
        async function load(successMessage = '', clamped = false) {
            if (!alive() || s.busy && !successMessage) return;
            capture(); read?.abort(); const controller = new AbortController(); read = controller; s.reading = true; s.rows = []; s.deactivate = null;
            s.message = successMessage || 'Memuat master...'; draw();
            try {
                const data = await list(s.type, {q: s.q, page: s.page, per_page: 12, active_only: canManage ? 0 : 1}, controller);
                if (!alive() || read !== controller) return;
                if (!clamped && data.page > data.last_page) {s.page = data.last_page; return await load(successMessage, true);}
                capture(); s.rows = data.options; s.page = data.page; s.lastPage = data.last_page;
                s.message = successMessage || (s.unverified ? 'Daftar terbaru sudah dimuat. Periksa data sebelum mencoba menyimpan kembali.' : ''); s.unverified = false;
            } catch (error) {if (alive() && read === controller && error.name !== 'AbortError') s.message = successMessage ? successMessage + ' Daftar belum diperbarui. Klik Muat ulang daftar; jangan ulangi penyimpanan.' : error.message;}
            finally {if (alive() && read === controller) {read = null; s.reading = false; draw();}}
        }
        async function save(row, payload, resetDraft = false) {
            if (!alive() || s.busy || s.unverified || !canManage) return;
            if (!payload.nama.trim() || [...payload.nama.trim()].length > 255) {s.message = 'Isi nama master, maksimal 255 karakter.'; draw(); return;}
            read?.abort(); read = null; s.reading = false;
            const controller = new AbortController(); write = controller; s.busy = true; s.message = 'Menyimpan master...'; draw();
            const confirm = Swal.getConfirmButton?.(); if (confirm) confirm.disabled = true;
            try {
                const result = await json('/sp-master-options' + (row ? '/' + row.id : ''), {method: row ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...payload, ...(row ? {version: row.version} : {})})}, controller);
                if (!alive() || write !== controller) return;
                if (!validRow(result.option, s.type) || row && result.option.id !== row.id) throw Object.assign(new Error('Hasil penyimpanan belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: true});
                if (resetDraft) {s.edit = null; s.draft = {nama: '', is_active: true}; delete s.drafts[s.type];}
                s.deactivate = null;
                draw(); await load(typeof result.message === 'string' && result.message.trim() ? result.message : 'Master berhasil disimpan.');
            } catch (error) {if (alive() && write === controller && error.name !== 'AbortError') {s.unverified = error.uncertain === true; s.message = error.message;}}
            finally {if (write === controller) {write = null; s.busy = false; if (confirm) confirm.disabled = false; draw();}}
        }
        try {
            const result = await Swal.fire({title: withFields ? 'Master cetak SP' : 'Master penandatangan & jabatan', html: render(s, canManage), width: 760, customClass: {popup: 'spph-signing-popup sg-master-popup'},
                background: document.documentElement.classList.contains('dark') ? '#162034' : '#fff', color: document.documentElement.classList.contains('dark') ? '#edf3ff' : '#18253d',
                showCancelButton: false, confirmButtonText: 'Kembali ke cetak', confirmButtonColor: '#3157d9', focusConfirm: false,
                allowOutsideClick: () => !s.busy, allowEscapeKey: () => !s.busy, willClose: owner.dispose, preConfirm: () => !s.busy,
                didOpen: () => {
                    const root = Swal.getHtmlContainer(); root.addEventListener('input', capture);
                    root.addEventListener('click', async event => {
                        const button = event.target.closest('[data-sgm]'); if (!button || !alive() || s.busy || button.disabled) return;
                        capture(); const action = button.dataset.sgm, row = s.rows.find(item => Number(item.id) === Number(button.dataset.id));
                        if (action === 'refresh') {await load(); return;}
                        if (action === 'prev' || action === 'next') {if (s.reading) return; s.page = Math.max(1, Math.min(s.lastPage, s.page + (action === 'next' ? 1 : -1))); await load();}
                        if (action === 'cancel-edit') {s.edit = null; s.draft = {nama: '', is_active: true}; delete s.drafts[s.type]; s.message = ''; draw();}
                        if (!row || s.reading) return;
                        if (action === 'use' && row.is_active) {picked = row; Swal.clickConfirm();}
                        if (action === 'edit' && canManage) {s.edit = row; s.draft = {nama: row.nama, is_active: row.is_active}; s.deactivate = null; s.message = ''; draw(); document.getElementById('sgMasterName')?.focus();}
                        if (action === 'toggle' && canManage && !s.unverified) {
                            if (row.is_active && s.deactivate !== row.id) {s.deactivate = row.id; s.message = 'Klik Ya, nonaktifkan untuk mengeluarkan pilihan dari dropdown. Dokumen lama tidak dihapus.'; draw();}
                            else await save(row, {type: row.type, nama: row.nama, is_active: !row.is_active});
                        }
                    });
                    root.addEventListener('change', async event => {
                        if (!alive() || s.busy) return; capture();
                        if (event.target.id !== 'sgMasterType' || !Object.hasOwn(s.types, event.target.value)) return;
                        s.drafts[s.type] = {edit: s.edit, draft: {...s.draft}}; s.type = event.target.value; s.page = 1; s.q = ''; s.searchDraft = '';
                        const retained = s.drafts[s.type]; s.edit = retained?.edit ?? null; s.draft = retained ? {...retained.draft} : {nama: '', is_active: true}; draw(); await load();
                    });
                    root.addEventListener('submit', async event => {
                        if (!['sgMasterSearch', 'sgMasterForm'].includes(event.target.id)) return; event.preventDefault(); if (!alive() || s.busy) return; capture();
                        if (event.target.id === 'sgMasterSearch') {
                            if ([...s.searchDraft].length > 100) {s.message = 'Pencarian maksimal 100 karakter.'; draw(); return;}
                            s.q = s.searchDraft; s.page = 1; await load();
                        } else if (canManage) await save(s.edit, {type: s.type, ...s.draft}, true);
                    });
                    load();
                }});
            return result.isConfirmed ? picked : null;
        } finally {owner.dispose();}
    }
    function render(s, canManage) {
        const disabled = s.busy ? 'disabled' : '', locked = s.busy || s.unverified ? 'disabled' : '';
        return `<div class="spph-signing-content"><div class="sg-manager-heading"><span class="sg-eyebrow">MASTER BERSAMA</span><p>Terhubung dengan Master Kontrak SP. Perubahan berlaku untuk dokumen berikutnya; nonaktifkan pilihan lama tanpa menghapus dokumen.</p></div>
        <form id="sgMasterSearch" class="sg-search" novalidate><select id="sgMasterType" aria-label="Jenis master" ${disabled}>${Object.entries(s.types).map(([key, label]) => `<option value="${key}" ${key === s.type ? 'selected' : ''}>${label}</option>`).join('')}</select><input id="sgMasterQuery" maxlength="100" value="${escape(s.searchDraft)}" placeholder="Cari nama atau jabatan..." aria-label="Cari master" ${disabled}><button type="submit" class="sg-soft-button" ${disabled}>Cari</button></form>
        ${canManage ? `<form id="sgMasterForm" class="sg-master-form" novalidate><label for="sgMasterName">${s.edit ? 'Edit' : 'Tambah'} ${s.types[s.type].toLowerCase()}<input id="sgMasterName" maxlength="255" required value="${escape(s.draft.nama)}" placeholder="Masukkan nama lengkap atau jabatan" ${disabled}></label><label class="sg-check"><input type="checkbox" id="sgMasterActive" ${s.draft.is_active ? 'checked' : ''} ${disabled}> Aktif dan dapat dipilih</label><div class="sg-inline-actions"><button type="submit" class="sg-primary" ${locked}>${s.busy ? 'Menyimpan...' : s.edit ? 'Simpan perubahan' : 'Tambah ke master'}</button>${s.edit ? `<button type="button" class="sg-soft-button" data-sgm="cancel-edit" ${disabled}>Batal edit</button>` : ''}</div><p>Isian tersimpan selama popup ini terbuka, termasuk saat berpindah jenis master. Periksa kewenangan penandatangan sebelum mencetak.</p></form>` : '<p>Akses baca-saja: pilih master aktif. Tambah/edit memerlukan akses pengelolaan master.</p>'}
        <p class="sg-status" role="status">${escape(s.message)}</p><button type="button" class="sg-soft-button" data-sgm="refresh" ${disabled}>Muat ulang daftar</button>
        <div class="sg-master-list" aria-busy="${s.reading}">${s.rows.map(row => `<article class="sg-master-row"><div><strong>${escape(row.nama)}</strong><span class="sg-active" data-active="${row.is_active}">${row.is_active ? 'Aktif' : 'Nonaktif'}</span></div><div class="sg-inline-actions">${row.is_active ? `<button type="button" class="sg-soft-button" data-sgm="use" data-id="${row.id}" ${disabled}>Gunakan</button>` : ''}${canManage ? `<button type="button" class="sg-soft-button" data-sgm="edit" data-id="${row.id}" ${disabled}>Edit</button><button type="button" class="sg-soft-button" data-sgm="toggle" data-id="${row.id}" ${locked}>${!row.is_active ? 'Aktifkan' : s.deactivate === row.id ? 'Ya, nonaktifkan' : 'Nonaktifkan'}</button>` : ''}</div></article>`).join('') || `<p>${s.reading ? 'Memuat daftar...' : 'Tidak ada master yang cocok. Ubah pencarian atau muat ulang daftar.'}</p>`}</div>
        <div class="sg-pagination"><button type="button" class="sg-soft-button" data-sgm="prev" ${s.page <= 1 || s.reading || s.busy ? 'disabled' : ''}>Sebelumnya</button><span>Halaman ${s.page} / ${s.lastPage}</span><button type="button" class="sg-soft-button" data-sgm="next" ${s.page >= s.lastPage || s.reading || s.busy ? 'disabled' : ''}>Berikutnya</button></div></div>`;
    }
    window.SPPHPrintMasters = {choices, request, open(canManage, initialType = 'penandatangan_sci', withFields = false) {
        if (activeRun) return activeRun.promise;
        const owner = {}; activeRun = owner;
        owner.promise = run(canManage === true, initialType, withFields, owner).finally(() => {if (activeRun === owner) activeRun = null;});
        return owner.promise;
    }};
    window.addEventListener('pagehide', () => {if (activeRun) {activeRun.dispose?.(); Swal.close();}});
})();
