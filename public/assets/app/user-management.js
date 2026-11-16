(() => {
    'use strict';
    const config = window.USER_MANAGEMENT_CONFIG || {}, base = config.baseUrl || '/users';
    let current = null, epoch = 0, priorFocus = null, priorOverflow = '';
    function notice(form, text) {
        let node = form ? form.querySelector('[data-user-notice]') : document.getElementById('userActionStatus');
        if (!node && form) {node = document.createElement('p'); node.dataset.userNotice = ''; node.setAttribute('role', 'status'); node.setAttribute('aria-live', 'polite'); form.prepend(node);}
        if (node) node.textContent = text;
    }
    function release(operation) {
        if (current !== operation) return;
        operation.disabled.forEach(([node, value]) => {node.disabled = value;});
        operation.form?.removeAttribute('aria-busy'); current = null;
    }
    function validId(value) {return /^[1-9]\d*$/.test(String(value)) && Number.isSafeInteger(Number(value));}
    async function request(url, body, method, controller) {
        let timer, onAbort;
        try {
            const aborted = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                controller.signal.addEventListener('abort', onAbort, {once: true});
                if (controller.signal.aborted) onAbort();
            });
            const deadline = new Promise((_, reject) => {timer = setTimeout(() => {
                reject(new Error('Perubahan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasil sebelum mencoba lagi.'));
                controller.abort();
            }, 30000);});
            return await Promise.race([aborted, deadline, (async () => {
                const response = await fetch(url, {method, body, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': config.csrfToken || document.querySelector('meta[name="csrf-token"]')?.content || ''}});
                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang daftar untuk memeriksa hasilnya.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Anda tidak memiliki izin untuk tindakan ini.', 429: 'Terlalu banyak permintaan. Tunggu sebentar.'};
                    const message = messages[response.status] || (response.status === 422 && (Object.values(data?.errors || {}).flat()[0] || data?.message));
                    throw Object.assign(new Error(message || 'Perubahan belum terkonfirmasi. Periksa daftar sebelum mencoba lagi.'), {fields: data?.errors, status: response.status});
                }
                if (data?.success !== true) throw new Error('Respons perubahan belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
                return data;
            })()]);
        } finally {clearTimeout(timer); controller.signal.removeEventListener('abort', onAbort);}
    }
    function show(id) {
        if (current) return;
        const modal = document.getElementById(id);
        if (!modal.classList.contains('hidden')) return;
        if (['addUserModal', 'editUserModal', 'passwordModal'].some(other => other !== id && !document.getElementById(other).classList.contains('hidden'))) return;
        priorFocus = document.activeElement; priorOverflow = document.body.style.overflow;
        const form = modal.querySelector('form'); window.FormUX.clear(form); notice(form, '');
        modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow = 'hidden';
        modal.querySelector('input:not([type=hidden]),select')?.focus();
    }
    function close(id, reset = false) {
        if (current) return;
        const modal = document.getElementById(id);
        if (modal.classList.contains('hidden')) return;
        modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.style.overflow = priorOverflow;
        if (reset) {
            const form = modal.querySelector('form'); form.reset();
            form.querySelectorAll('[name=password]').forEach(input => {input.type = 'password';});
            modal.querySelectorAll('.password-strength-bar').forEach(bar => {bar.className = 'password-strength-bar'; bar.style.width = '';});
        }
        priorFocus?.focus();
    }
    async function mutate(kind, form = null, id = null, name = '') {
        if (current) return;
        if (kind !== 'add' && !validId(id)) {notice(form, 'Pengguna belum dipilih. Buka ulang formulir dari daftar.'); return;}
        if (form && !window.FormUX.validate(form)) return;
        const body = form ? new FormData(form) : undefined;
        if (kind === 'edit' || kind === 'password') body.set('_method', 'PUT');
        const operation = {form, epoch, controller: new AbortController(), disabled: []}; current = operation;
        operation.disabled = [...document.querySelectorAll('[data-user-directory] input, [data-user-directory] select, [data-user-directory] button, #addUserModal input, #addUserModal select, #addUserModal button, #editUserModal input, #editUserModal select, #editUserModal button, #passwordModal input, #passwordModal button')]
            .map(node => [node, node.disabled]);
        operation.disabled.forEach(([node]) => {node.disabled = true;}); form?.setAttribute('aria-busy', 'true');
        notice(form, kind === 'delete' ? 'Menunggu konfirmasi...' : 'Menyimpan perubahan pengguna...');
        let navigating = false;
        try {
            if (kind === 'delete' && !await window.FormUX.confirm({title: 'Hapus Pengguna?', text: `Hapus akun ${name}? Tindakan ini tidak dapat dibatalkan.`, danger: true, accept: 'Hapus', cancel: 'Batal'})) {notice(null, ''); return;}
            if (operation.epoch !== epoch) return;
            const url = kind === 'add' ? (config.storeUrl || base) : `${base}/${id}${kind === 'password' ? '/password' : ''}`;
            const data = await request(url, body, kind === 'delete' ? 'DELETE' : 'POST', operation.controller);
            if (operation.epoch !== epoch) return;
            notice(form, data.message || 'Perubahan berhasil disimpan.');
            if (kind === 'password') {
                release(operation); close('passwordModal', true); notice(null, 'Password berhasil diperbarui.');
            } else {navigating = true; window.location.reload();}
        } catch (error) {
            if (operation.epoch === epoch && error.name !== 'AbortError') {
                release(operation);
                const fieldsShown = form && error.fields && !window.FormUX.errors(form, error.fields);
                notice(form, fieldsShown ? 'Perbaiki kolom yang ditandai. Isian Anda tetap tersedia.'
                    : error instanceof TypeError ? 'Koneksi terputus. Muat ulang daftar untuk memeriksa hasil perubahan.' : error.message);
            }
        } finally {if (!navigating) release(operation);}
    }
    function randomIndex(maximum) {
        const limit = Math.floor(4294967296 / maximum) * maximum, buffer = new Uint32Array(1);
        do {window.crypto.getRandomValues(buffer);} while (buffer[0] >= limit);
        return buffer[0] % maximum;
    }
    function securePassword() {
        const groups = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*'];
        const all = groups.join(''), characters = groups.map(group => group[randomIndex(group.length)]);
        while (characters.length < 16) characters.push(all[randomIndex(all.length)]);
        for (let index = characters.length - 1; index > 0; index--) {const other = randomIndex(index + 1); [characters[index], characters[other]] = [characters[other], characters[index]];}
        return characters.join('');
    }
    window.checkPasswordStrength = (inputId, strengthId) => {
        const value = document.getElementById(inputId).value, bar = document.getElementById(strengthId);
        const missing = [];
        if (value.length < 8) missing.push('minimal 8 karakter');
        if (!/[A-Z]/.test(value)) missing.push('huruf besar');
        if (!/[a-z]/.test(value)) missing.push('huruf kecil');
        if (!/\d/.test(value)) missing.push('angka');
        bar.className = `password-strength-bar ${!value || missing.length > 1 ? 'strength-weak' : missing.length ? 'strength-medium' : 'strength-strong'}`;
        bar.style.width = value ? `${Math.max(10, (4 - missing.length) * 25)}%` : '0%';
        const text = document.getElementById(`${inputId}Text`);
        if (text) text.textContent = missing.length ? `Lengkapi: ${missing.join(', ')}.` : 'Memenuhi aturan panjang dan kombinasi karakter.';
    };
    window.generatePassword = async (inputId, strengthId) => {
        if (current) return;
        const input = document.getElementById(inputId);
        try {
            const password = securePassword(), captured = epoch; input.type = 'text'; input.value = password;
            window.checkPasswordStrength(inputId, strengthId);
            notice(input.form, 'Password baru sudah dibuat.');
            try {await navigator.clipboard.writeText(password); if (!current && captured === epoch && input.value === password) notice(input.form, 'Password baru dibuat dan disalin.');}
            catch {if (!current && captured === epoch && input.value === password) notice(input.form, 'Password baru dibuat. Salin dari kolom password jika diperlukan.');}
        } catch {notice(input.form, 'Generator aman belum tersedia. Muat ulang halaman atau isi password sendiri.');}
    };
    window.togglePassword = id => {if (!current) {const input = document.getElementById(id); input.type = input.type === 'password' ? 'text' : 'password';}};
    window.openAddUserModal = () => show('addUserModal'); window.closeAddUserModal = () => close('addUserModal', true);
    window.openEditModal = (id, name, email, role, department, gender, buyer) => {
        if (current) return;
        document.getElementById('editUserForm').action = `${base}/${id}`;
        for (const [field, value] of Object.entries({editUserId: id, editName: name, editEmail: email, editRole: role, editDept: department, editGender: gender, editBuyerName: buyer})) document.getElementById(field).value = value ?? '';
        show('editUserModal');
    };
    window.closeEditUserModal = () => close('editUserModal');
    window.openPasswordModal = (id, name) => {if (!current) {document.getElementById('passwordForm').action = `${base}/${id}/password`; document.getElementById('passwordUserId').value = id; document.getElementById('targetUserName').textContent = name; show('passwordModal');}};
    window.closePasswordModal = () => close('passwordModal', true);
    for (const [handler, kind, id] of [['handleAddUser', 'add', null], ['handleEditUser', 'edit', 'editUserId'], ['handlePasswordChange', 'password', 'passwordUserId']]) {
        window[handler] = event => {event.preventDefault(); return mutate(kind, event.target, id ? document.getElementById(id).value : null);};
    }
    window.deleteUser = (id, name) => mutate('delete', null, id, name);
    document.addEventListener('keydown', event => {if (event.key === 'Escape') ['addUserModal', 'editUserModal', 'passwordModal'].forEach(id => close(id, id !== 'editUserModal'));});
    window.addEventListener('pagehide', () => {epoch++; if (current) {const operation = current; notice(operation.form, 'Perubahan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasilnya.'); operation.controller.abort(); release(operation);}});
})();
