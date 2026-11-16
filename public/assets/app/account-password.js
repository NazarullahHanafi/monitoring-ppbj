(() => {
    'use strict';
    const form = document.getElementById('changePasswordForm');
    if (!form) return;
    const oldPassword = document.getElementById('currentPassword'), newPassword = document.getElementById('newPassword'), confirmation = document.getElementById('confirmPassword');
    let current = null, epoch = 0, generation = 0;
    form.noValidate = true;

    function notice(text, error = false) {
        let node = form.querySelector('[data-account-status]');
        if (!node) {node = document.createElement('p'); node.dataset.accountStatus = ''; node.className = 'account-request-status'; node.setAttribute('role', 'status'); node.setAttribute('aria-live', 'polite'); form.prepend(node);}
        node.dataset.error = String(error); node.textContent = text;
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
    function passwordErrors(value, confirm, maximumBytes) {
        const errors = {};
        if (value.length < 8 || value.length > 255 || !/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) errors.password = 'Gunakan 8–255 karakter dengan huruf besar, huruf kecil, dan angka.';
        if (value.includes('\0')) errors.password = 'Password tidak boleh berisi karakter null.';
        if (maximumBytes > 0 && new TextEncoder().encode(value).length > maximumBytes) errors.password = `Password maksimal ${maximumBytes} byte. Kurangi panjang password Anda.`;
        if (value !== confirm) errors.password_confirmation = 'Konfirmasi password tidak sama.';
        return errors;
    }
    function updateIndicators() {
        const value = newPassword.value, errors = passwordErrors(value, value, Number(form.dataset.maxPasswordBytes));
        const bar = document.getElementById('newPasswordStrength'), text = document.getElementById('newPasswordText'), match = document.getElementById('passwordMatchText');
        if (bar) {bar.className = 'password-strength-bar ' + (!value || errors.password ? 'strength-weak' : value.length >= 12 && /[^A-Za-z0-9]/.test(value) ? 'strength-strong' : 'strength-medium'); bar.style.width = value ? '' : '0%';}
        if (text) text.textContent = !value ? 'Minimal 8 karakter dengan huruf besar, kecil, dan angka.' : errors.password || 'Memenuhi persyaratan format. Gunakan password unik untuk akun ini.';
        if (match) match.textContent = !confirmation.value ? '' : value === confirmation.value ? 'Password cocok.' : 'Konfirmasi password tidak sama.';
    }
    function mask() {[oldPassword, newPassword, confirmation].forEach(field => {field.type = 'password';});}
    function clearSecrets() {form.reset(); [oldPassword, newPassword, confirmation].forEach(field => {field.value = '';}); mask(); updateIndicators(); window.FormUX.clear(form);}
    function release(operation) {
        if (current !== operation) return;
        operation.disabled.forEach(([node, disabled]) => {node.disabled = disabled;}); form.removeAttribute('aria-busy'); current = null;
    }
    async function request(body, controller) {
        const target = new URL(form.action, window.location.href);
        if (target.origin !== window.location.origin) throw new Error('Tujuan formulir belum valid. Muat ulang halaman.');
        let timer, abort;
        try {
            const aborted = new Promise((_, reject) => {abort = () => reject(new DOMException('Aborted', 'AbortError')); controller.signal.addEventListener('abort', abort, {once: true}); if (controller.signal.aborted) abort();});
            const deadline = new Promise((_, reject) => {timer = setTimeout(() => {reject(new Error('Perubahan belum terkonfirmasi. Periksa hasil sebelum mencoba kembali.')); controller.abort();}, 30000);});
            return await Promise.race([aborted, deadline, (async () => {
                const response = await fetch(target.href, {method: 'POST', body, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': body.get('_token') || ''}});
                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Periksa hasil sebelum mencoba kembali.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Masuk kembali.', 403: 'Perubahan password tidak diizinkan untuk akun ini.', 409: 'Password akun telah berubah. Masukkan password terbaru.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 429: 'Terlalu banyak percobaan. Tunggu sebentar.'};
                    throw Object.assign(new Error(messages[response.status] || (response.status === 422 && (Object.values(data?.errors || {}).flat()[0] || data?.message)) || 'Perubahan belum terkonfirmasi. Periksa hasil sebelum mencoba kembali.'), {fields: data?.errors, status: response.status});
                }
                if (data?.success !== true) throw new Error('Respons belum lengkap. Periksa hasil sebelum mencoba kembali.');
                return data;
            })()]);
        } finally {clearTimeout(timer); controller.signal.removeEventListener('abort', abort);}
    }

    window.checkPasswordStrength = updateIndicators;
    window.checkPasswordMatch = updateIndicators;
    window.togglePassword = id => {const field = document.getElementById(id); if (!current && [oldPassword, newPassword, confirmation].includes(field)) field.type = field.type === 'password' ? 'text' : 'password';};
    window.generatePassword = async () => {
        if (current) return;
        const captured = ++generation;
        try {
            const password = securePassword(); newPassword.value = password; confirmation.value = password; mask(); window.FormUX.clear(form); updateIndicators();
            notice('Password 16 karakter dibuat. Simpan dengan aman sebelum mengirim perubahan.');
            try {await navigator.clipboard.writeText(password); if (captured === generation && !current) notice('Password dibuat dan disalin. Simpan dengan aman sebelum mengirim perubahan.');}
            catch (_) {if (captured === generation && !current) notice('Password dibuat. Gunakan tombol tampilkan untuk menyalin secara manual.');}
        } catch (_) {notice('Generator aman belum tersedia. Ketik password baru secara manual.', true);}
    };
    form.addEventListener('input', () => {generation++;});
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (current || !window.FormUX.validate(form)) return;
        const errors = passwordErrors(newPassword.value, confirmation.value, Number(form.dataset.maxPasswordBytes));
        if (oldPassword.value.includes('\0')) errors.current_password = 'Password lama tidak boleh berisi karakter null.';
        if (Object.keys(errors).length) {window.FormUX.errors(form, errors); return;}
        const body = new FormData(form), operation = {epoch, controller: new AbortController(), disabled: [...form.querySelectorAll('input,button')].map(node => [node, node.disabled])};
        current = operation; generation++; mask();
        operation.disabled.forEach(([node]) => {node.disabled = true;}); form.setAttribute('aria-busy', 'true'); notice('Menyimpan perubahan password...');
        try {
            const data = await request(body, operation.controller);
            if (current !== operation || epoch !== operation.epoch) return;
            clearSecrets(); notice(data.message || 'Password berhasil diperbarui.');
        } catch (error) {
            if (current === operation && epoch === operation.epoch && error.name !== 'AbortError') {
                release(operation);
                if (error.status === 409) oldPassword.value = '';
                if (error.fields) window.FormUX.errors(form, error.fields);
                notice(error instanceof TypeError ? 'Koneksi terputus. Periksa hasil sebelum mencoba kembali.' : error.message, true);
            }
        } finally {release(operation);}
    });
    document.addEventListener('visibilitychange', () => {if (document.hidden) mask();});
    window.addEventListener('pagehide', () => {epoch++; generation++; if (current) {const operation = current; operation.controller.abort(); release(operation); notice('Perubahan belum terkonfirmasi. Periksa hasil sebelum mencoba kembali.', true);} clearSecrets();});
    if (form.dataset.errorField) document.getElementById(form.dataset.errorField)?.focus();
})();
