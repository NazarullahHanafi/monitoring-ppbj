(() => {
    'use strict';
    const root = document.querySelector('[data-sp-master-page]');
    if (!root) return;
    const forms = ['addForm', 'editForm'].map(id => document.getElementById(id));
    let active = null, epoch = 0, interrupted = false, opener = null;
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    const status = (text, form = null) => {
        const node = form?.querySelector('[data-master-notice]') || document.getElementById('masterStatus');
        if (node) node.textContent = text;
    };
    function localUrl(value, item = false) {
        const base = new URL(root.dataset.indexUrl, location.href), url = new URL(value, location.href);
        if (url.origin !== location.origin || (item ? !new RegExp('^' + base.pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/[0-9]+$').test(url.pathname) : url.pathname !== base.pathname)) {
            throw new Error('Alamat tindakan tidak valid. Muat ulang daftar.');
        }
        return url;
    }
    function begin(form = null, dialog = false) {
        if (active) return null;
        const operation = {epoch, form, dialog, controller: new AbortController(), controls: []};
        active = operation;
        document.querySelectorAll('[data-sp-master-page] button, [data-sp-master-page] input, [data-sp-master-page] select, #addModal input, #addModal select, #addModal button, #editModal input, #editModal select, #editModal button').forEach(node => {
            operation.controls.push([node, node.disabled]); node.disabled = true;
        });
        form?.setAttribute('aria-busy', 'true');
        return operation;
    }
    function release(operation) {
        if (operation.released) return;
        operation.released = true;
        operation.controls.forEach(([node, disabled]) => {node.disabled = disabled;});
        operation.form?.removeAttribute('aria-busy');
        if (active === operation) active = null;
    }
    const current = operation => active === operation && operation.epoch === epoch;
    async function request(url, options, controller = new AbortController()) {
        let timer, onAbort;
        const signal = controller.signal;
        try {
            const cancelled = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                signal.addEventListener('abort', onAbort, {once: true}); if (signal.aborted) onAbort();
            });
            const timeout = new Promise((_, reject) => {
                timer = setTimeout(() => {reject(new Error('Hasil belum terkonfirmasi karena koneksi lambat. Muat ulang daftar sebelum mencoba lagi.')); controller.abort();}, 30000);
            });
            return await Promise.race([cancelled, timeout, (async () => {
                const token = document.querySelector('meta[name="csrf-token"]')?.content;
                if (!token) throw new Error('Sesi formulir berakhir. Muat ulang halaman.');
                const response = await fetch(url, {...options, signal, credentials: 'same-origin', cache: 'no-store',
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': token, ...options.headers}});
                if (response.redirected || !(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.');
                const data = await response.json();
                if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Respons belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Silakan masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Akses tindakan ini tidak diizinkan.', 429: 'Batas permintaan tercapai. Tunggu sebelum mencoba lagi.'};
                    const detail = [409, 422].includes(response.status) ? Object.values(data.errors || {}).flat()[0] || data.message : null;
                    throw Object.assign(new Error(detail || messages[response.status] || 'Hasil belum terkonfirmasi. Muat ulang daftar sebelum mencoba lagi.'), {status: response.status, payload: data});
                }
                return data;
            })()]);
        } catch (error) {
            if (error instanceof SyntaxError || error?.name === 'SyntaxError') throw new Error('Respons belum dapat dibaca. Muat ulang daftar untuk memeriksa hasilnya.');
            throw error;
        } finally {clearTimeout(timer); signal.removeEventListener('abort', onAbort);}
    }
    function validOption(option) {
        return Number.isSafeInteger(option?.id) && option.id > 0 && ['bidang_ip_itu', 'bidang_pr', 'penandatangan_sci', 'jabatan_sci'].includes(option.type)
            && typeof option.nama === 'string' && option.nama.trim() !== '' && [...option.nama].length <= 255
            && typeof option.is_active === 'boolean' && /^[a-f0-9]{64}$/.test(option.version);
    }
    function navigate(type) {
        const target = localUrl(root.dataset.indexUrl);
        target.search = ''; target.hash = ''; target.searchParams.set('type', type);
        location.assign(target.href);
    }
    function openModal(id) {
        if (active) return;
        opener = document.activeElement;
        const modal = document.getElementById(id);
        modal.classList.remove('hidden'); modal.classList.add('flex'); modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('select, input:not([type=hidden])')?.focus();
    }
    function closeModal(id) {
        if (active) return;
        const modal = document.getElementById(id);
        modal.classList.add('hidden'); modal.classList.remove('flex'); modal.setAttribute('aria-hidden', 'true');
        opener?.focus();
    }
    window.openAddModal = () => openModal('addModal');
    window.closeAddModal = () => closeModal('addModal');
    window.openEditModal = (id, type, name, enabled, version, url) => {
        if (active) return;
        const form = document.getElementById('editForm');
        try {form.action = localUrl(url || `${root.dataset.indexUrl}/${id}`, true).href;} catch (error) {status(error.message); return;}
        if (!/^[a-f0-9]{64}$/.test(version || '')) {status('Daftar perlu dimuat ulang sebelum mengedit.'); return;}
        window.FormUX?.clear(form);
        document.getElementById('editType').value = type || '';
        document.getElementById('editNama').value = name || '';
        document.getElementById('editActive').checked = Number(enabled) === 1;
        form.elements.version.value = version; status('', form); openModal('editModal');
    };
    window.closeEditModal = () => closeModal('editModal');
    for (const form of forms) form.addEventListener('submit', async event => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        if (active || !window.FormUX?.validate(form)) return;
        let url;
        try {url = localUrl(form.action, form.id === 'editForm');} catch (error) {status(error.message, form); return;}
        const body = new URLSearchParams(new FormData(form)); // Capture before freezing controls.
        const operation = begin(form); if (!operation) return;
        let navigating = false;
        status('Menyimpan master…', form);
        try {
            const data = await request(url.href, {method: 'POST', body}, operation.controller);
            if (!current(operation)) return;
            if (!validOption(data.option)) throw new Error('Data hasil penyimpanan belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
            status(data.message || 'Master tersimpan.', form); navigate(data.option.type); navigating = true;
        } catch (error) {
            if (current(operation) && error.name !== 'AbortError') {
                release(operation);
                if (error.status === 422) window.FormUX?.errors(form, error.payload?.errors);
                status(error instanceof TypeError ? 'Koneksi terputus. Muat ulang daftar untuk memeriksa hasil penyimpanan.' : error.message, form);
            }
        } finally {if (!navigating) release(operation);}
    });
    window.deleteMasterOption = async (name, type, value, version = null) => {
        if (active) return;
        let url;
        try {url = localUrl(value, true);} catch (error) {status(error.message); return;}
        if (!window.Swal?.fire) {status('Dialog verifikasi belum siap. Muat ulang halaman.'); return;}
        const operation = begin(null, true); let writing = false, navigating = false;
        try {
            const result = await window.Swal.fire({icon: 'warning', title: 'Hapus Master Kontrak?',
                html: `<div class="master-delete-stack"><div class="master-delete-danger"><strong>${escape(type)}</strong><p>${escape(name)}</p><p>Master akan dihapus permanen dari pilihan berikutnya.</p></div><div class="master-delete-warning">Gunakan password superadmin umum aktif. Salah 3 kali mengunci tindakan ini selama 15 menit.</div><label for="masterDeletePassword">Password superadmin umum</label><div class="master-delete-password-field"><input id="masterDeletePassword" type="password" class="swal2-input" maxlength="1024" autocomplete="off"><button type="button" id="masterDeleteToggle" class="master-delete-toggle">Lihat</button></div></div>`,
                customClass: {popup: 'master-secure-popup'}, showCancelButton: true, showLoaderOnConfirm: true,
                confirmButtonText: 'Ya, Hapus Master', cancelButtonText: 'Batal', confirmButtonColor: '#ef4444', focusConfirm: false,
                allowOutsideClick: () => !writing, allowEscapeKey: () => !writing,
                didOpen: () => {
                    document.getElementById('masterDeletePassword')?.focus();
                    document.getElementById('masterDeleteToggle')?.addEventListener('click', () => {
                        const input = document.getElementById('masterDeletePassword'); input.type = input.type === 'password' ? 'text' : 'password';
                        document.getElementById('masterDeleteToggle').textContent = input.type === 'password' ? 'Lihat' : 'Sembunyikan';
                    });
                },
                preConfirm: async () => {
                    if (writing || !current(operation)) return false;
                    const input = document.getElementById('masterDeletePassword'), password = input?.value || '';
                    if (!password.trim()) {window.Swal.showValidationMessage('Password superadmin umum perlu diisi.'); return false;}
                    writing = true; operation.controller = new AbortController();
                    const cancel = window.Swal.getCancelButton?.(); if (cancel) cancel.disabled = true;
                    try {
                        const data = await request(url.href, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({admin_password: password, ...(version ? {version} : {})})}, operation.controller);
                        if (!current(operation)) return false;
                        if (data.ok !== true) throw new Error('Penghapusan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasilnya.');
                        return {ok: true};
                    } catch (error) {
                        if (!current(operation)) return false;
                        if (error.status === 429 && error.payload?.locked === true) return {locked: true, payload: error.payload};
                        if (error.name !== 'AbortError') window.Swal.showValidationMessage(escape(error instanceof TypeError ? 'Koneksi terputus. Periksa daftar sebelum mengulang penghapusan.' : error.message));
                        return false;
                    } finally {writing = false; if (cancel) cancel.disabled = false; if (input) {input.value = ''; input.type = 'password';}}
                }
            });
            if (!current(operation) || !result.isConfirmed || !result.value) return;
            if (result.value.locked) {
                const payload = result.value.payload;
                status(payload.message || 'Aksi hapus dikunci sementara.');
                const parsed = Date.parse(payload.locked_until || '');
                const target = Number.isFinite(parsed) ? parsed : Date.now() + Math.min(86400, Math.max(1, Number(payload.retry_after) || 900)) * 1000;
                let timer;
                try {
                    await window.Swal.fire({icon: 'error', title: 'Aksi dikunci sementara', text: payload.message || 'Tunggu sebelum mencoba lagi.',
                        html: `<p>${escape(payload.message || 'Terlalu banyak percobaan password salah.')}</p><p id="masterDeleteCountdown" class="master-delete-countdown"></p><p id="masterDeleteUnlockAt" class="master-delete-time-pill"></p>`,
                        confirmButtonText: 'Saya mengerti', customClass: {popup: 'master-secure-popup'},
                        didOpen: () => {
                            const draw = () => {
                                const seconds = Math.max(0, Math.ceil((target - Date.now()) / 1000));
                                const node = document.getElementById('masterDeleteCountdown');
                                if (node) node.textContent = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
                            };
                            const label = document.getElementById('masterDeleteUnlockAt');
                            if (label) label.textContent = 'Bisa dicoba lagi: ' + new Intl.DateTimeFormat('id-ID', {dateStyle: 'medium', timeStyle: 'medium', timeZone: 'Asia/Jakarta'}).format(target) + ' WIB';
                            draw(); timer = setInterval(draw, 1000);
                        }, willClose: () => clearInterval(timer)});
                } finally {clearInterval(timer);}
                return;
            }
            if (result.value.ok) {status('Master berhasil dihapus.'); navigate(document.querySelector('#masterFilter [name=type]')?.value || ''); navigating = true;}
        } catch (error) {
            if (current(operation)) status('Dialog penghapusan belum selesai. Muat ulang daftar untuk memeriksa hasilnya.');
        } finally {if (!navigating) release(operation);}
    };
    document.addEventListener('keydown', event => {
        if (active) return;
        if (event.key === 'Escape') {closeModal('addModal'); closeModal('editModal');}
        const modal = ['addModal', 'editModal'].map(id => document.getElementById(id)).find(node => !node.classList.contains('hidden'));
        if (event.key === 'Tab' && modal) {
            const fields = [...modal.querySelectorAll('input:not([type=hidden]), select, button')].filter(node => !node.disabled);
            const first = fields[0], last = fields.at(-1);
            if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last?.focus();}
            else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first?.focus();}
        }
    });
    for (const id of ['addModal', 'editModal']) document.getElementById(id).addEventListener('click', event => {if (event.target.id === id) closeModal(id);});
    window.addEventListener('pagehide', () => {
        epoch++; interrupted = Boolean(active);
        if (active) {const operation = active; operation.controller.abort(); if (operation.dialog) window.Swal?.close(); release(operation);}
        const input = document.getElementById('masterDeletePassword'); if (input) input.value = '';
    });
    window.addEventListener('pageshow', () => {if (interrupted) {interrupted = false; status('Hasil tindakan sebelumnya belum terverifikasi. Muat ulang daftar sebelum mencoba lagi.');}});
})();
