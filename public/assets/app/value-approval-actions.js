(() => {
    'use strict';
    const root = document.getElementById('spValueApprovals');
    if (!root) return;
    let current = null, epoch = 0;
    function notice(form, message, reload = false) {
        let node = form.querySelector('[data-approval-status]');
        if (!node) {node = document.createElement('p'); node.dataset.approvalStatus = ''; node.className = 'pr-alert'; node.setAttribute('role', 'status'); node.setAttribute('aria-live', 'polite'); form.prepend(node);}
        node.textContent = message;
        if (reload) {const link = document.createElement('a'); link.href = window.location.href; link.textContent = ' Muat ulang pengajuan'; node.append(link);}
    }
    function release(operation) {
        if (current !== operation) return;
        operation.disabled.forEach(([node, disabled]) => {node.disabled = disabled;}); operation.form.removeAttribute('aria-busy'); current = null;
    }
    async function send(url, body, controller) {
        const target = new URL(url, window.location.href);
        if (target.origin !== window.location.origin) throw new Error('Tujuan pengajuan belum valid. Muat ulang halaman.');
        let timer, onAbort;
        try {
            const aborted = new Promise((_, reject) => {onAbort = () => reject(new DOMException('Aborted', 'AbortError')); controller.signal.addEventListener('abort', onAbort, {once: true}); if (controller.signal.aborted) onAbort();});
            const deadline = new Promise((_, reject) => {timer = setTimeout(() => {reject(new Error('Keputusan belum terkonfirmasi. Muat ulang pengajuan untuk memeriksa hasil sebelum mencoba kembali.')); controller.abort();}, 30000);});
            return await Promise.race([aborted, deadline, (async () => {
                const response = await fetch(target.href, {method:'POST', body, credentials:'same-origin', cache:'no-store', signal:controller.signal,
                    headers:{Accept:'application/json', 'X-Requested-With':'XMLHttpRequest', 'X-CSRF-TOKEN':body.get('_token') || ''}});
                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons keputusan belum dapat diverifikasi. Periksa hasil sebelum mencoba kembali.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401:'Sesi berakhir. Masuk kembali.',403:'Anda tidak memiliki izin untuk memutuskan pengajuan ini.',409:'Pengajuan telah berubah. Muat ulang dan periksa kembali sebelum memutuskan.',419:'Sesi formulir berakhir. Muat ulang halaman.',429:'Terlalu banyak permintaan. Tunggu sebentar.'};
                    throw Object.assign(new Error(messages[response.status] || (response.status === 422 && (Object.values(data?.errors || {}).flat()[0] || data?.message)) || 'Keputusan belum terkonfirmasi. Periksa daftar pengajuan.'), {status:response.status, fields:data?.errors});
                }
                if (data?.success !== true) throw new Error('Respons belum lengkap. Periksa daftar pengajuan sebelum mencoba kembali.');
                return data;
            })()]);
        } finally {clearTimeout(timer); controller.signal.removeEventListener('abort', onAbort);}
    }
    root.querySelectorAll('[data-approval-decision]').forEach(form => {
        form.noValidate = true;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (current || !window.FormUX.validate(form)) return;
            const decision = event.submitter?.name === 'decision' ? event.submitter.value : '';
            if (!['approved','rejected'].includes(decision)) {notice(form, 'Pilih Setujui selisih atau Tolak pengajuan untuk melanjutkan.'); return;}
            const body = new FormData(form); body.set('decision', decision);
            const operation = {form, epoch, controller:new AbortController(), disabled:[...root.querySelectorAll('input,textarea,select,button')].map(node => [node, node.disabled])};
            current = operation; operation.disabled.forEach(([node]) => {node.disabled = true;}); form.setAttribute('aria-busy', 'true'); notice(form, 'Menyimpan keputusan...');
            let navigating = false;
            try {
                const data = await send(form.action, body, operation.controller);
                if (current !== operation || epoch !== operation.epoch) return;
                notice(form, data.message || 'Keputusan tersimpan.'); navigating = true; window.location.reload();
            } catch (error) {
                if (current === operation && epoch === operation.epoch && error.name !== 'AbortError') {
                    release(operation); if (error.fields) window.FormUX.errors(form, error.fields);
                    notice(form, error instanceof TypeError ? 'Koneksi terputus. Periksa daftar sebelum mencoba kembali.' : error.message, error.status === 409);
                }
            } finally {if (!navigating) release(operation);}
        });
    });
    window.addEventListener('pagehide', () => {epoch++; if (current) {const operation = current; operation.controller.abort(); release(operation); notice(operation.form, 'Keputusan belum terkonfirmasi. Muat ulang pengajuan untuk memeriksa hasil.');}});
})();
