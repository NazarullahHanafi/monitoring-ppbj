(() => {
    'use strict';
    const normalize = value => String(value ?? '').trim().replace(/\s+/g, ' ');
    let active = null, epoch = 0;

    async function request(url, options = {}, controller = new AbortController()) {
        const signal = controller.signal;
        let timer, onAbort;
        try {
            const aborted = new Promise((_, reject) => {
                onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
                signal.addEventListener('abort', onAbort, {once: true});
                if (signal.aborted) onAbort();
            });
            const deadline = new Promise((_, reject) => {
                timer = setTimeout(() => {
                    reject(new Error('Penyimpanan belum terkonfirmasi. Koneksi lambat; muat ulang daftar sebelum mencoba lagi.'));
                    controller.abort();
                }, 30000);
            });
            return await Promise.race([deadline, aborted, (async () => {
                const response = await fetch(url, {
                    ...options, credentials: 'same-origin', cache: 'no-store', signal,
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '', ...options.headers}
                });
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Masuk kembali sebelum menyimpan.', 419: 'Sesi formulir berakhir. Muat ulang halaman.',
                        403: 'Anda tidak memiliki izin untuk tindakan ini.', 429: 'Terlalu banyak permintaan. Tunggu sebentar sebelum mencoba lagi.'};
                    const message = messages[response.status] || (response.status === 422 && Object.values(data?.errors || {}).flat()[0]);
                    throw Object.assign(new Error(message || 'Penyimpanan belum terkonfirmasi. Muat ulang daftar sebelum mencoba lagi.'), {status: response.status, errors: data?.errors});
                }
                if (response.redirected || data?.success !== true) throw new Error('Respons penyimpanan tidak valid. Muat ulang daftar untuk memeriksa hasilnya.');
                return data;
            })()]);
        } finally {clearTimeout(timer); signal.removeEventListener('abort', onAbort);}
    }

    function validItem(item) {
        return Number.isSafeInteger(item?.id) && item.id > 0 && typeof item.nama_satuan === 'string'
            && item.nama_satuan.trim().length > 0 && [...item.nama_satuan].length <= 100;
    }

    function createQuick({names, url, csrfToken = '', sentinel = '__add_satuan__'}) {
        return async function quickAdd(select) {
            const previous = select.dataset.previousValue || '';
            if (active) {select.value = previous; return;}
            const captured = epoch, controller = new AbortController();
            active = {form: select.form, controller};
            const wasDisabled = select.disabled;
            select.disabled = true;
            try {
                if (!window.Swal?.fire) throw new Error('Dialog satuan belum siap. Muat ulang halaman.');
                const result = await window.Swal.fire({
                    title: 'Tambah satuan baru', text: 'Satuan baru langsung tersedia untuk rincian SP dan SPPH.',
                    input: 'text', inputPlaceholder: 'Contoh: Roll', inputAttributes: {maxlength: '100'},
                    showCancelButton: true, confirmButtonText: 'Simpan Satuan', cancelButtonText: 'Batal',
                    inputValidator(value) {
                        const name = normalize(value);
                        if (!name) return 'Nama satuan wajib diisi.';
                        if ([...name].length > 100) return 'Nama satuan maksimal 100 karakter.';
                        if (names.some(item => normalize(item).toLowerCase() === name.toLowerCase())) return 'Satuan ini sudah ada.';
                        return null;
                    }
                });
                if (!result.isConfirmed || captured !== epoch || !select.isConnected) return;
                const data = await request(url, {method: 'POST', headers: {'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || csrfToken},
                    body: new URLSearchParams({nama_satuan: normalize(result.value)})}, controller);
                if (captured !== epoch) return;
                if (!validItem(data.satuan)) throw new Error('Data satuan belum lengkap. Muat ulang daftar untuk memeriksa hasilnya.');
                const name = data.satuan.nama_satuan;
                if (!names.includes(name)) {names.push(name); names.sort((a, b) => a.localeCompare(b, 'id', {sensitivity: 'base'}));}
                document.querySelectorAll('select[name$="[satuan]"]').forEach(other => {
                    const keep = other === select ? name : other.value;
                    other.replaceChildren(new Option('-- Pilih --', ''), ...names.map(value => new Option(value, value)));
                    // Legacy values may still be used by other unsaved rows.
                    if (keep && keep !== sentinel && !names.includes(keep)) other.add(new Option(keep, keep));
                    other.add(new Option('+ Tambah satuan baru...', sentinel));
                    other.value = keep === sentinel ? '' : keep;
                    other.dataset.previousValue = other.value;
                });
                window.Swal.fire({toast: true, position: 'top-end', icon: 'success', titleText: `Satuan "${name}" ditambahkan`, showConfirmButton: false, timer: 2200});
            } catch (error) {
                if (captured === epoch && error.name !== 'AbortError') {
                    const text = error instanceof TypeError ? 'Koneksi terputus. Muat ulang daftar untuk memeriksa apakah satuan sudah tersimpan.' : error.message;
                    window.Swal?.fire({title: 'Satuan belum terkonfirmasi', text, icon: 'error'});
                }
            } finally {
                if (select.value === sentinel) select.value = previous;
                select.disabled = wasDisabled;
                if (active?.controller === controller) active = null;
            }
        };
    }

    for (const type of ['submit', 'reset']) document.addEventListener(type, event => {
        if (active?.form === event.target) {event.preventDefault(); event.stopImmediatePropagation();}
    }, true);
    window.addEventListener('pagehide', () => {epoch++; active?.controller.abort(); active = null;});
    window.SatuanUI = {request, validItem, createQuick};
})();
