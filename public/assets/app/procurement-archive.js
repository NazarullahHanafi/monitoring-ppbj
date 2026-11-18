(function () {
    'use strict';
    let active = null;
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
    const unknown = 'Status pemindahan belum dapat dipastikan. Periksa daftar aktif dan Tempat Sampah sebelum mencoba lagi.';
    function begin(kind, rawUrl) {
        if (active || !['sp', 'spph'].includes(kind) || typeof rawUrl !== 'string') return null;
        let url;
        try {
            url = new URL(rawUrl, window.location.origin);
            const match = url.pathname.match(/^\/(sp|spph)\/([1-9]\d*)$/);
            if (url.origin !== window.location.origin || url.username || url.password || url.search || url.hash || !match || match[1] !== kind || !Number.isSafeInteger(Number(match[2]))) return null;
        } catch { return null; }
        let cleanup, controller, busy = false, uncertain = false;
        const operation = {
            get current() { return active === operation; }, get busy() { return busy; }, get uncertain() { return uncertain; },
            onRelease(fn) { cleanup = fn; },
            cancelRequest() { controller?.abort(); },
            release() {
                if (!operation.current) return;
                active = null; controller?.abort(); cleanup?.(); cleanup = null;
            },
            async request(body, csrf) {
                if (!operation.current || busy || uncertain) throw new Error('Pemindahan masih diproses atau perlu diperiksa terlebih dahulu.');
                if (!csrf) throw new Error('Sesi formulir berakhir. Muat ulang halaman sebelum mencoba lagi.');
                busy = true; controller = new AbortController(); const owner = controller;
                const controls = Array.from(window.Swal?.getPopup?.()?.querySelectorAll('input,button') || []).map(node => [node, node.disabled]);
                controls.forEach(([node]) => { node.disabled = true; });
                let timer, onAbort, sent = false;
                try {
                    const cancelled = new Promise((resolve, reject) => {
                        onAbort = () => reject(new DOMException('Pemindahan dibatalkan.', 'AbortError'));
                        owner.signal.addEventListener('abort', onAbort, {once: true});
                        if (owner.signal.aborted) onAbort();
                    });
                    timer = setTimeout(() => owner.abort(), 30000);
                    return await Promise.race([cancelled, (async () => {
                        sent = true;
                        const response = await fetch(url.href, {method: 'DELETE', credentials: 'same-origin', cache: 'no-store', signal: owner.signal,
                            headers: {Accept: 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': csrf}, body: JSON.stringify(body)});
                        if (owner.signal.aborted) throw new DOMException('Aborted', 'AbortError');
                        if (response.redirected || !response.headers.get('content-type')?.toLowerCase().includes('application/json')) throw new Error(unknown);
                        const data = await response.json();
                        if (owner.signal.aborted) throw new DOMException('Aborted', 'AbortError');
                        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(unknown);
                        if (response.status === 429 && data.locked === true) {
                            if (!Number.isSafeInteger(data.retry_after) || data.retry_after < 1 || data.retry_after > 86400
                                || typeof data.locked_until !== 'string' || data.locked_until.length > 64 || !/^\d{4}-\d{2}-\d{2}T/.test(data.locked_until) || !Number.isFinite(Date.parse(data.locked_until))) throw new Error(unknown);
                            return {locked: true, data: {message: typeof data.message === 'string' && data.message.length <= 2000 ? data.message : 'Aksi dikunci sementara.', retry_after: data.retry_after, locked_until: data.locked_until}};
                        }
                        if (!response.ok) {
                            const messages = {401: 'Sesi berakhir. Masuk kembali sebelum melanjutkan.', 403: 'Anda tidak memiliki akses untuk memindahkan dokumen ini.',
                                404: 'Dokumen tidak ada di daftar aktif. Periksa Tempat Sampah sebelum melanjutkan.', 409: 'Dokumen berubah. Muat ulang daftar sebelum melanjutkan.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 429: 'Batas permintaan tercapai. Tunggu sebelum mencoba lagi.'};
                            const field = response.status === 422 ? Object.values(data.errors || {}).flat().find(value => typeof value === 'string' && value.length <= 1000) : null;
                            const detail = response.status === 422 && typeof data.message === 'string' && data.message.length <= 2000 ? data.message : null;
                            throw Object.assign(new Error(field || detail || messages[response.status] || unknown), {confirmedRejection: [401, 403, 404, 409, 419, 422, 429].includes(response.status)});
                        }
                        if (data.ok !== true || data.archived !== true) throw new Error(unknown);
                        return {ok: true, data: {message: typeof data.message === 'string' && data.message.length <= 2000 ? data.message : ''}};
                    })()]);
                } catch (error) {
                    if (sent && !error.confirmedRejection) uncertain = true;
                    if (uncertain) throw Object.assign(new Error(unknown), {uncertain: true});
                    throw error;
                } finally {
                    clearTimeout(timer); if (onAbort) owner.signal.removeEventListener('abort', onAbort);
                    controls.forEach(([node, disabled]) => { node.disabled = disabled; }); busy = false;
                    if (controller === owner) controller = null;
                }
            }
        };
        active = operation;
        return operation;
    }
    function feedback(error, kind) {
        if (!['sp', 'spph'].includes(kind)) return;
        const links = error.uncertain ? `<p class="mt-2"><a class="font-semibold underline" href="/${kind}" target="_blank" rel="noopener">Periksa daftar aktif</a> · <a class="font-semibold underline" href="/${kind}/trash" target="_blank" rel="noopener">Periksa Tempat Sampah</a></p>` : '';
        window.Swal.showValidationMessage('<div><p>' + escape(error.message) + '</p>' + links + '</div>');
        const validation = window.Swal.getValidationMessage?.();
        if (validation) {
            const dark = window.document?.documentElement.classList.contains('dark');
            Object.assign(validation.style, {backgroundColor: dark ? '#3b2634' : '#fff1f2', color: dark ? '#fecdd3' : '#991b1b', borderRadius: '12px', textAlign: 'left'});
        }
        if (error.uncertain) {
            // SweetAlert restores its loader button after preConfirm returns false.
            // Updating the whole popup would recreate its password/reason inputs.
            const operation = active, popup = window.Swal.getPopup();
            const hideConfirm = () => {
                const button = window.Swal.getConfirmButton();
                if (button) { button.style.setProperty('display', 'none', 'important'); button.disabled = true; }
            };
            hideConfirm();
            const cancel = window.Swal.getCancelButton(); if (cancel) cancel.textContent = 'Tutup dan periksa';
            window.requestAnimationFrame(() => {
                if (active === operation && operation?.uncertain && window.Swal.getPopup() === popup) hideConfirm();
            });
        }
    }
    window.addEventListener('pagehide', () => {
        if (!active) return;
        active.release();
        if (window.Swal?.getPopup?.()?.classList.contains('secure-delete-popup')) window.Swal.close();
    });
    window.ProcurementArchive = {begin, feedback};
})();
