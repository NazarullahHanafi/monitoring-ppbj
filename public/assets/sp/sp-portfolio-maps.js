(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    const key = value => String(value ?? '').trim().replace(/\s+/g, ' ').toLocaleUpperCase('id-ID');
    let activeRun = null, interrupted = false;

    async function json(url, options = {}, controller = new AbortController()) {
        const signal = controller.signal;
        const writing = options.method && !['GET', 'HEAD'].includes(options.method);
        let timer, onAbort, sent = false;
        try {
            const cancelled = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                signal.addEventListener('abort', onAbort, {once: true}); if (signal.aborted) onAbort();
            });
            const deadline = new Promise((_, reject) => {
                timer = setTimeout(() => {reject(Object.assign(new Error('Hasil belum terkonfirmasi karena koneksi lambat. Muat ulang daftar sebelum mencoba lagi.'), {uncertain: Boolean(writing && sent)})); controller.abort();}, 30000);
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
                if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
                if (response.redirected || !(response.headers.get('content-type') || '').toLowerCase().includes('application/json')) throw Object.assign(new Error('Respons belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: Boolean(writing)});
                const data = await response.json();
                if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
                if (!data || typeof data !== 'object' || Array.isArray(data)) throw Object.assign(new Error('Respons pemetaan belum lengkap. Muat ulang daftar.'), {uncertain: Boolean(writing)});
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Silakan masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Anda tidak diizinkan mengubah pemetaan.', 429: 'Batas permintaan tercapai. Tunggu sebelum mencoba lagi.'};
                    const field = [409, 422].includes(response.status) ? Object.values(data.errors || {}).flat().find(value => typeof value === 'string' && value.length <= 1000) : null;
                    const detail = [409, 422].includes(response.status) && typeof data.message === 'string' && data.message.length <= 2000 ? data.message : null;
                    throw Object.assign(new Error(field || detail || messages[response.status] || 'Hasil belum terkonfirmasi. Muat ulang daftar sebelum mencoba lagi.'), {status: response.status, uncertain: Boolean(writing && response.status >= 500)});
                }
                return data;
            })()]);
        } catch (error) {
            if (error instanceof SyntaxError || error?.name === 'SyntaxError') throw Object.assign(new Error('Respons pemetaan belum dapat dibaca. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: Boolean(writing && sent)});
            if (error instanceof TypeError || error?.name === 'TypeError') throw Object.assign(new Error('Koneksi terputus. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: Boolean(writing && sent)});
            throw error;
        } finally {clearTimeout(timer); signal.removeEventListener('abort', onAbort);}
    }
    function validRow(row) {
        return Number.isSafeInteger(row?.id) && row.id > 0 && typeof row.portfolio === 'string' && row.portfolio.trim() !== '' && [...row.portfolio].length <= 150
            && Number.isSafeInteger(row.field_id) && row.field_id > 0 && (row.field_name === null || typeof row.field_name === 'string' && [...row.field_name].length <= 255)
            && typeof row.field_available === 'boolean' && typeof row.is_active === 'boolean' && /^[a-f0-9]{64}$/.test(row.version);
    }
    function portfolioChoices(s, context) {
        const selected = s.draft.portfolio, seen = new Set();
        const unique = rows => rows.filter(value => {const normalized = key(value); if (!normalized || seen.has(normalized)) return false; seen.add(normalized); return true;});
        const current = unique([selected, ...context.portfolios].filter(value => key(value) !== ''));
        const other = unique(s.portfolios), needle = key(s.portfolioQuery);
        const options = rows => rows.filter(value => !needle || key(value).includes(needle) || key(value) === key(selected))
            .map(value => `<option value="${escape(value)}" ${key(value) === key(selected) ? 'selected' : ''}>${escape(value)}</option>`).join('');
        const group = (label, values) => {const html = options(values); return html ? `<optgroup label="${label}">${html}</optgroup>` : '';};
        return '<option value="">Pilih portofolio...</option>' + group('Dari PR SP ini / pilihan saat ini', current) + group('Portofolio lainnya', other);
    }
    async function run(rawContext, owner) {
        const context = {can_manage: rawContext?.can_manage === true, portfolios: Array.isArray(rawContext?.portfolios) ? rawContext.portfolios.filter(value => typeof value === 'string' && value.trim() !== '' && [...value].length <= 150).slice(0, 500) : []};
        const s = {rows: [], fields: [], selectedField: null, portfolios: [], optionsLoaded: false, optionsTruncated: false, portfolioQuery: '', manual: false,
            edit: null, draft: {portfolio: context.portfolios[0] ?? '', field_id: '', is_active: true}, page: 1, last: 1, q: '', searchDraft: '', fieldQuery: '',
            message: '', fieldMessage: '', fieldTotal: 0, listState: 'idle', reading: false, fieldsLoading: false, busy: false, unverified: interrupted, editStale: false,
            notice: interrupted ? 'Hasil tindakan sebelumnya belum terverifikasi. Periksa daftar sebelum mengirim ulang.' : ''};
        interrupted = false;
        let closed = false, read = null, fieldRead = null, write = null, writeConfirmed = false;
        const alive = () => !closed;
        const capture = () => {
            const portfolio = document.getElementById('spMapPortfolio');
            if (portfolio) {
                s.draft = {portfolio: portfolio.value, field_id: document.getElementById('spMapField')?.value || '', is_active: Boolean(document.getElementById('spMapActive')?.checked)};
                const selected = s.fields.find(field => Number(field.id) === Number(s.draft.field_id)); if (selected) s.selectedField = selected;
            }
            const query = document.getElementById('spMapQuery'); if (query) s.searchDraft = query.value;
            const fieldQuery = document.getElementById('spMapFieldQuery'); if (fieldQuery) s.fieldQuery = fieldQuery.value;
        };
        const draw = () => {
            if (!alive()) return;
            const focused = document.activeElement, id = focused?.id, start = focused?.selectionStart, end = focused?.selectionEnd;
            Swal.update({html: render(s, context)});
            const next = id && document.getElementById(id);
            if (next && !next.disabled) {next.focus?.(); if (typeof start === 'number') next.setSelectionRange?.(start, end);}
        };
        function stopReads() {read?.abort(); fieldRead?.abort(); read = null; fieldRead = null; s.reading = false; s.fieldsLoading = false;}
        owner.dispose = () => {if (closed) return; if (s.unverified || s.busy && !writeConfirmed) interrupted = true; closed = true; stopReads(); write?.abort();};
        async function loadMaps(successMessage = '', clamped = false) {
            if (!alive() || s.busy && !successMessage) return;
            capture(); read?.abort(); const controller = new AbortController(); read = controller; s.reading = true; s.listState = 'loading'; s.rows = []; s.message = successMessage || 'Memuat pemetaan...'; draw();
            try {
                const data = await json('/sp/portfolio-mappings?' + new URLSearchParams({q: s.q, page: s.page, ...(!s.optionsLoaded && context.can_manage ? {include_options: 1} : {})}), {}, controller);
                if (!alive() || read !== controller) return;
                if (!Array.isArray(data.rows) || data.rows.length > 12 || !data.rows.every(validRow) || new Set(data.rows.map(row => row.id)).size !== data.rows.length
                    || !Number.isSafeInteger(data.page) || data.page < 1 || data.page > 100000 || !Number.isSafeInteger(data.total) || data.total < 0
                    || !Number.isSafeInteger(data.last_page) || data.last_page !== Math.max(1, Math.ceil(data.total / 12))
                    || data.rows.length !== Math.min(12, Math.max(0, data.total - (data.page - 1) * 12))
                    || data.portfolio_options !== undefined && (!Array.isArray(data.portfolio_options) || data.portfolio_options.length > 500 || !data.portfolio_options.every(value => typeof value === 'string' && [...value].length <= 150) || typeof data.options_truncated !== 'boolean')) throw new Error('Daftar pemetaan belum lengkap. Muat ulang daftar.');
                if (!clamped && data.page > data.last_page) {s.page = data.last_page; return await loadMaps(successMessage, true);}
                capture(); s.rows = data.rows; s.page = data.page; s.last = data.last_page; s.listState = 'ready';
                s.message = successMessage || (s.unverified ? 'Daftar terbaru sudah dimuat. Periksa hasil sebelumnya sebelum menyimpan kembali; gunakan Edit pada baris yang sudah ada.' : '');
                s.unverified = false; s.notice = '';
                if (Array.isArray(data.portfolio_options)) {
                    s.portfolios = data.portfolio_options.filter(value => typeof value === 'string' && [...value].length <= 150).slice(0, 500);
                    s.optionsLoaded = true; s.optionsTruncated = data.options_truncated === true;
                }
            } catch (error) {if (alive() && read === controller && error.name !== 'AbortError') {s.listState = 'error'; s.message = successMessage ? successMessage + ' Daftar belum diperbarui. Klik Muat ulang daftar; jangan ulangi penyimpanan.' : error.message;}}
            finally {if (alive() && read === controller) {read = null; s.reading = false; draw();}}
        }
        async function loadFields(query = s.fieldQuery) {
            if (!alive() || !context.can_manage || s.busy) return;
            capture(); fieldRead?.abort(); const controller = new AbortController(); fieldRead = controller; s.fieldsLoading = true; s.fieldMessage = 'Memuat bidang PR...'; draw();
            try {
                const selected = Number(s.draft.field_id);
                const data = await json('/spph/print-masters?' + new URLSearchParams({type: 'bidang_pr', active_only: 1, per_page: 50, q: query, ...(selected > 0 ? {include_id: selected} : {})}), {}, controller);
                if (!alive() || fieldRead !== controller) return;
                if (!Array.isArray(data.options) || data.options.length > 50 || !data.options.every(field => Number.isSafeInteger(field.id) && field.id > 0 && field.type === 'bidang_pr' && field.is_active === true && typeof field.nama === 'string') || !Number.isInteger(data.total) || data.total < 0) throw new Error('Daftar bidang belum lengkap. Cari atau muat ulang bidang.');
                capture(); s.fields = data.options; s.fieldTotal = data.total;
                const found = s.fields.find(field => Number(field.id) === Number(s.draft.field_id)); if (found) s.selectedField = found;
                else if (!String(query).trim() && s.selectedField) s.selectedField = {...s.selectedField, is_active: false};
                s.fieldMessage = data.total > 50 ? 'Menampilkan maksimal 50 bidang. Gunakan Cari bidang PR untuk pilihan lainnya.' : s.fields.length ? '' : 'Tidak ada bidang aktif yang cocok. Ubah pencarian atau periksa Master Kontrak SP.';
            } catch (error) {if (alive() && fieldRead === controller && error.name !== 'AbortError') s.fieldMessage = error.message;}
            finally {if (alive() && fieldRead === controller) {fieldRead = null; s.fieldsLoading = false; draw();}}
        }
        async function save(form) {
            if (!alive() || s.busy || s.unverified || s.editStale || !context.can_manage || s.fieldsLoading) return;
            capture();
            if (!s.draft.portfolio.trim() || [...s.draft.portfolio].length > 150) {s.message = 'Isi portofolio yang benar, maksimal 150 karakter.'; draw(); return;}
            if (![...s.fields, s.selectedField].some(field => field?.is_active === true && Number(field.id) === Number(s.draft.field_id))) {s.message = 'Pilih bidang PR aktif terlebih dahulu.'; draw(); return;}
            if (window.FormUX && !window.FormUX.validate(form)) return;
            const row = s.edit, payload = {...s.draft, ...(row ? {version: row.version} : {})};
            stopReads(); const controller = new AbortController(); write = controller; writeConfirmed = false; s.busy = true; s.message = 'Menyimpan pemetaan...'; draw();
            const confirm = Swal.getConfirmButton?.(); if (confirm) confirm.disabled = true;
            try {
                const result = await json('/sp/portfolio-mappings' + (row ? '/' + row.id : ''), {method: row ? 'PUT' : 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)}, controller);
                if (!alive() || write !== controller) return;
                if (!validRow(result.row) || !result.row.field_available || row && result.row.id !== row.id || result.row.portfolio !== payload.portfolio.trim()
                    || result.row.field_id !== Number(payload.field_id) || result.row.is_active !== payload.is_active) throw Object.assign(new Error('Hasil penyimpanan belum cocok dengan isian. Muat ulang daftar untuk memeriksa hasilnya.'), {uncertain: true});
                writeConfirmed = true;
                s.portfolios = [...new Set([result.row.portfolio, ...s.portfolios])].slice(0, 500); s.edit = null;
                s.draft = {portfolio: context.portfolios[0] ?? '', field_id: '', is_active: true}; s.selectedField = null; s.manual = false; s.portfolioQuery = '';
                draw(); await loadMaps(typeof result.message === 'string' && result.message.trim() && result.message.length <= 2000 ? result.message : 'Pemetaan berhasil disimpan.');
            } catch (error) {if (alive() && write === controller && error.name !== 'AbortError') {
                s.unverified = error.uncertain === true; s.editStale = Boolean(row && error.status === 409);
                s.message = error.message;
                if (s.editStale) { s.rows = []; s.listState = 'error'; s.message += ' Draft tetap ada. Muat ulang daftar, lalu pilih Edit pada baris terbaru sebelum menyimpan lagi.'; }
            }}
            finally {if (write === controller) {write = null; s.busy = false; if (confirm) confirm.disabled = false; draw();}}
        }
        try {
            await Swal.fire({title: 'Pemetaan portofolio ke bidang PR', width: 760, customClass: {popup: 'spph-signing-popup'}, background: document.documentElement.classList.contains('dark') ? '#162034' : '#fff', color: document.documentElement.classList.contains('dark') ? '#edf3ff' : '#18253d', html: render(s, context),
                confirmButtonText: 'Kembali ke cetak', confirmButtonColor: '#3157d9', focusConfirm: false,
                allowOutsideClick: () => !s.busy, allowEscapeKey: () => !s.busy, preConfirm: () => !s.busy, willClose: owner.dispose,
                didOpen: () => {
                    const root = Swal.getHtmlContainer();
                    root.addEventListener('click', event => {
                        const button = event.target.closest('[data-sp-map]'); if (!button || s.busy) return;
                        const action = button.dataset.spMap; capture();
                        if (action === 'refresh') {loadMaps(); if (context.can_manage && !s.fields.length) loadFields();}
                        if (action === 'edit' && context.can_manage && !s.reading) {
                            const row = s.rows.find(item => Number(item.id) === Number(button.dataset.id)); if (!row) return;
                            s.edit = row; s.editStale = false; s.draft = {portfolio: row.portfolio, field_id: String(row.field_id), is_active: row.is_active}; s.manual = false; s.portfolioQuery = ''; s.message = '';
                            s.selectedField = s.fields.find(field => field.id === row.field_id) || {id: row.field_id, nama: row.field_name || 'Bidang lama tidak tersedia', is_active: row.field_available !== false && row.field_name !== null};
                            draw(); if (!s.fields.some(field => field.id === row.field_id)) {s.fieldQuery = ''; loadFields('');}
                        }
                        if (action === 'cancel') {s.edit = null; s.editStale = false; s.draft = {portfolio: context.portfolios[0] ?? '', field_id: '', is_active: true}; s.selectedField = null; s.manual = false; s.portfolioQuery = ''; s.message = ''; draw();}
                        if (action === 'manual') {s.manual = !s.manual; s.portfolioQuery = ''; draw(); document.getElementById('spMapPortfolio')?.focus();}
                        if (['prev', 'next'].includes(action) && !s.reading) {const page = s.page + (action === 'next' ? 1 : -1); if (page >= 1 && page <= s.last) {s.page = page; loadMaps();}}
                    });
                    for (const type of ['input', 'change']) root.addEventListener(type, event => {
                        if (s.busy) return; capture();
                        if (event.target.id === 'spMapPortfolioQuery') {s.portfolioQuery = event.target.value; const select = document.getElementById('spMapPortfolio'); if (select) select.innerHTML = portfolioChoices(s, context);}
                    });
                    root.addEventListener('submit', event => {
                        if (!['spMapSearch', 'spMapFieldSearch', 'spMapForm'].includes(event.target.id)) return;
                        event.preventDefault(); if (s.busy) return; capture();
                        if (event.target.id === 'spMapSearch') {s.q = s.searchDraft.trim(); s.page = 1; loadMaps();}
                        else if (event.target.id === 'spMapFieldSearch') loadFields();
                        else save(event.target);
                    });
                    loadMaps(); if (context.can_manage) loadFields();
                }});
        } finally {owner.dispose();}
    }
    function render(s, context) {
        const disabled = s.busy ? 'disabled' : '', fields = [...s.fields];
        if (s.selectedField && !fields.some(field => Number(field.id) === Number(s.selectedField.id))) fields.unshift(s.selectedField);
        return `<div class="spph-signing-content"><span class="sg-eyebrow">PENGATURAN BERSAMA - DIAUDIT</span><p>Pilih portofolio dan bidang pemilik PR. Perubahan berlaku untuk rekomendasi cetak berikutnya; dokumen yang sudah diunduh tidak berubah.</p>
        ${s.notice ? `<p class="sg-status" role="status">${escape(s.notice)}</p>` : ''}
        ${s.unverified ? '<p class="sg-status" role="status">Penyimpanan belum terverifikasi. Isian tetap ada. Gunakan Muat ulang daftar dan periksa hasilnya sebelum menyimpan kembali.</p>' : ''}
        ${s.editStale ? '<p class="sg-status" role="status">Versi edit sudah berubah. Muat ulang daftar, lalu pilih Edit pada baris terbaru. Isian belum diganti otomatis.</p>' : ''}
        <form id="spMapSearch" class="sp-map-search" novalidate><label for="spMapQuery">Cari pemetaan tersimpan<input id="spMapQuery" maxlength="150" value="${escape(s.searchDraft)}" placeholder="Contoh: IT - FERS" ${disabled}></label><button type="submit" class="sg-soft-button" ${disabled}>Cari pemetaan</button><button type="button" class="sg-soft-button" data-sp-map="refresh" ${disabled}>Muat ulang daftar</button></form>
        ${context.can_manage ? `<form id="spMapFieldSearch" class="sp-map-search" novalidate><label for="spMapFieldQuery">Cari bidang PR aktif<input id="spMapFieldQuery" maxlength="100" value="${escape(s.fieldQuery)}" placeholder="Contoh: Pengujian" ${disabled}></label><button type="submit" class="sg-soft-button" ${disabled}>Cari bidang PR</button></form><p class="sg-status" role="status">${escape(s.fieldMessage)}</p>
        <form id="spMapForm" class="sg-master-form" novalidate><span class="sg-eyebrow">${s.edit ? 'EDIT PEMETAAN' : 'BUAT PEMETAAN BARU'}</span>
        ${!s.manual ? `<label for="spMapPortfolioQuery">Saring pilihan portofolio (tanpa request server)<input id="spMapPortfolioQuery" maxlength="150" value="${escape(s.portfolioQuery)}" placeholder="Ketik FERS, LAB, QAQC..." autocomplete="off" ${disabled}></label>` : ''}
        <label for="spMapPortfolio">1. ${s.manual ? 'Ketik nama portofolio' : 'Pilih portofolio'} ${s.manual ? `<input id="spMapPortfolio" required maxlength="150" value="${escape(s.draft.portfolio)}" placeholder="Gunakan nama persis seperti data PR" ${disabled}>` : `<select id="spMapPortfolio" class="sp-map-select" required ${disabled}>${portfolioChoices(s, context)}</select>`}</label>
        <button type="button" class="sg-soft-button" data-sp-map="manual" ${disabled}>${s.manual ? 'Kembali ke dropdown portofolio' : 'Portofolio belum ada? Isi manual'}</button>
        ${s.optionsTruncated ? '<p>Daftar dibatasi agar tetap ringan. Bila belum tercantum, gunakan Isi manual.</p>' : ''}
        <label for="spMapField">2. Pilih bidang pemilik PR<select id="spMapField" class="sp-map-select" required ${disabled}><option value="">Pilih bidang aktif...</option>${fields.map(field => `<option value="${Number(field.id)}" ${Number(field.id) === Number(s.draft.field_id) ? 'selected' : ''} ${field.is_active ? '' : 'disabled'}>${escape(field.nama)}${field.is_active ? '' : ' (tidak aktif / tidak tersedia)'}</option>`).join('')}</select></label>
        <label class="sg-check"><input type="checkbox" id="spMapActive" ${s.draft.is_active ? 'checked' : ''} ${disabled}>Pemetaan aktif</label>
        <div class="sg-inline-actions"><button type="submit" class="sg-primary" ${s.busy || s.unverified || s.editStale || s.fieldsLoading || !fields.some(field => field.is_active) ? 'disabled' : ''}>${s.busy ? 'Menyimpan...' : s.edit ? 'Simpan perubahan' : 'Simpan pemetaan'}</button>${s.edit ? `<button type="button" class="sg-soft-button" data-sp-map="cancel" ${disabled}>Batal edit</button>` : ''}</div></form>` : '<p>Akses baca-saja. Hubungi petugas Umum untuk mengubah pemetaan.</p>'}
        <p class="sg-status" role="status">${escape(s.message)}</p><h3 class="sp-map-list-title">Pemetaan tersimpan</h3>
        ${s.rows.map(row => `<article class="sg-master-row"><strong>${escape(row.portfolio)}</strong><p>${escape(row.field_name || 'Master bidang tidak tersedia')} - ${row.is_active ? 'Aktif' : 'Nonaktif'}</p>${context.can_manage ? `<button type="button" class="sg-soft-button" data-sp-map="edit" data-id="${row.id}" ${s.busy || s.reading ? 'disabled' : ''}>Edit pemetaan</button>` : ''}</article>`).join('') || `<p>${s.reading ? 'Memuat daftar...' : s.listState !== 'ready' ? 'Daftar pemetaan belum dapat dimuat. Gunakan Muat ulang daftar.' : 'Tidak ada pemetaan yang cocok.'}</p>`}
        <div class="sg-pagination"><button type="button" class="sg-soft-button" data-sp-map="prev" ${s.page <= 1 || s.reading || s.busy ? 'disabled' : ''}>Sebelumnya</button><span>Halaman ${s.page} / ${s.last}</span><button type="button" class="sg-soft-button" data-sp-map="next" ${s.page >= s.last || s.reading || s.busy ? 'disabled' : ''}>Berikutnya</button></div></div>`;
    }
    window.SPPortfolioMaps = {open(context) {
        if (activeRun) return activeRun.promise;
        const owner = {}; activeRun = owner;
        owner.promise = run(context, owner).finally(() => {if (activeRun === owner) activeRun = null;});
        return owner.promise;
    }};
    window.addEventListener('pagehide', () => {if (activeRun) {activeRun.dispose?.(); Swal.close();}});
})();
