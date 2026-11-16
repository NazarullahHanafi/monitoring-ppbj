(() => {
    'use strict';
    const modal = document.getElementById('masterModal');
    if (!modal) return;
    const config = window.PPBJ_PAGE_CONFIG || {};
    const labels = {buyer: 'Buyer', portofolio: 'Portofolio', metode_pengadaan: 'Metode Pengadaan', penyedia_eksternal: 'Penyedia Eksternal'};
    const limits = config.masterNameLimits || {buyer: 50, portofolio: 100, metode_pengadaan: 50, penyedia_eksternal: 100};
    const base = config.masterBaseUrl || '/master';
    const input = document.getElementById('masterInput'), list = document.getElementById('masterList');
    const status = document.getElementById('masterStatus');
    let type = null, items = new Map(), loaded = false, busy = false, readController = null, writeController = null, epoch = 0, priorOverflow = '';
    let disabled = [];

    function notice(text = '', error = false) {
        status.textContent = text;
        status.className = error ? 'text-sm text-red-600 dark:text-red-400 mb-3' : 'text-sm text-gray-600 dark:text-gray-300 mb-3';
    }

    function setBusy(value) {
        busy = value;
        if (value) {
            disabled = [...modal.querySelectorAll('button,input')].map(node => [node, node.disabled]);
            disabled.forEach(([node]) => {node.disabled = true;});
        } else {
            disabled.forEach(([node, previous]) => {node.disabled = previous;});
            disabled = [];
        }
        modal.setAttribute('aria-busy', String(value));
    }

    async function request(url, options = {}, controller = new AbortController()) {
        let timedOut = false, onAbort;
        const cancelled = new Promise((_, reject) => {
            onAbort = () => reject(timedOut ? new Error('Koneksi lambat. Coba buka ulang daftar master.') : new DOMException('Dibatalkan', 'AbortError'));
            controller.signal.addEventListener('abort', onAbort, {once: true});
            if (controller.signal.aborted) onAbort();
        });
        const timer = setTimeout(() => {timedOut = true; controller.abort();}, 30000);
        try {
            return await Promise.race([cancelled, (async () => {
                const response = await fetch(url, {credentials: 'same-origin', cache: 'no-store', ...options,
                    headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...options.headers}, signal: controller.signal});
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401: 'Sesi berakhir. Silakan masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Anda tidak memiliki izin untuk tindakan ini.', 429: 'Permintaan terlalu cepat. Tunggu sebentar.'};
                    const error = new Error(messages[response.status] || Object.values(data?.errors || {}).flat()[0] || data?.message || 'Permintaan tidak dapat diproses.');
                    error.status = response.status; throw error;
                }
                if (!data || typeof data !== 'object') throw new Error('Respons server belum lengkap.');
                return data;
            })()]);
        } catch (error) {
            if (options.method && (!error.status || error.status >= 500)) error.message = 'Perubahan belum terkonfirmasi. Periksa daftar sebelum mengirim ulang. ' + error.message;
            throw error;
        } finally {clearTimeout(timer); controller.signal.removeEventListener('abort', onAbort);}
    }

    function validItem(item) {return item && Number.isSafeInteger(item.id) && item.id > 0 && typeof item.nama === 'string';}

    function render() {
        list.replaceChildren();
        for (const item of items.values()) {
            const row = document.createElement('div'); row.className = 'flex items-center gap-2 border rounded-xl p-2';
            const field = document.createElement('input'); field.className = 'border rounded-lg px-2 py-1.5 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
            field.value = item.nama; field.maxLength = limits[type]; field.setAttribute('aria-label', 'Nama master');
            const save = document.createElement('button'); save.type = 'button'; save.textContent = 'Simpan'; save.className = 'bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm';
            const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Hapus'; remove.className = 'bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm';
            save.addEventListener('click', () => mutate('update', item.id, field.value));
            remove.addEventListener('click', () => mutate('delete', item.id));
            field.addEventListener('keydown', event => {if (event.key === 'Enter' && !event.isComposing) {event.preventDefault(); mutate('update', item.id, field.value);}});
            row.append(field, save, remove); list.append(row);
        }
    }

    async function load() {
        readController?.abort();
        const controller = readController = new AbortController(), capturedType = type;
        loaded = false; list.replaceChildren(); notice('Memuat master...');
        try {
            const data = await request(`${base}/${capturedType}`, {}, controller);
            if (readController !== controller || type !== capturedType) return;
            if (!Array.isArray(data) || !data.every(validItem)) throw new Error('Daftar master belum lengkap. Buka kembali panel ini.');
            items = new Map(data.map(item => [item.id, item])); loaded = true;
            render(); notice(data.length ? '' : 'Belum ada data master.');
        } catch (error) {if (readController === controller && error.name !== 'AbortError') notice(error.message, true);}
        finally {if (readController === controller) readController = null;}
    }

    function syncDropdown(capturedType, preferred) {
        const select = document.getElementById(capturedType);
        if (!select) return;
        select.replaceChildren(new Option('-- pilih --', ''));
        for (const item of items.values()) select.add(new Option(item.nama, item.nama));
        if (preferred && ![...select.options].some(option => option.value === preferred)) select.add(new Option(preferred, preferred));
        select.value = preferred || '';
        if (window.jQuery) window.jQuery(select).trigger('change');
    }

    async function mutate(action, id = null, value = '') {
        if (busy || !loaded || !type) return;
        const capturedType = type, old = id ? items.get(Number(id)) : null;
        if (id && !old) return;
        const name = String(value).trim();
        if (action !== 'delete' && (!name || [...name].length > limits[capturedType])) {notice(`Isi nama master, maksimal ${limits[capturedType]} karakter.`, true); return;}
        const operation = ++epoch, controller = writeController = new AbortController();
        setBusy(true);
        try {
            if (action === 'delete') {
                let confirmed;
                const text = `Master “${old.nama}” akan dihapus dari pilihan.`;
                if (window.Swal) confirmed = (await window.Swal.fire({title: 'Hapus master?', text, icon: 'warning', showCancelButton: true, confirmButtonText: 'Hapus', cancelButtonText: 'Batal', focusCancel: true})).isConfirmed;
                else if (window.FormUX?.confirm) confirmed = await window.FormUX.confirm({title: 'Hapus master?', text, accept: 'Hapus', cancel: 'Batal', danger: true});
                else throw new Error('Komponen konfirmasi belum tersedia. Muat ulang halaman.');
                if (!confirmed || operation !== epoch) return;
            }
            notice('Menyimpan perubahan...');
            const data = await request(`${base}/${capturedType}${id ? '/' + Number(id) : ''}`, {
                method: {add: 'POST', update: 'PUT', delete: 'DELETE'}[action],
                headers: {'X-CSRF-TOKEN': config.csrfToken || '', 'Content-Type': 'application/json'},
                ...(action === 'delete' ? {} : {body: JSON.stringify({nama: name})}),
            }, controller);
            if (operation !== epoch) return;
            if (action !== 'delete' && (!validItem(data.item) || (id && data.item.id !== Number(id)))) throw new Error('Simpanan belum terkonfirmasi. Buka kembali daftar master sebelum mencoba lagi.');
            if (action === 'delete' && typeof data.message !== 'string') throw new Error('Penghapusan belum terkonfirmasi. Buka kembali daftar master.');
            const select = document.getElementById(capturedType);
            let preferred = select?.value || '';
            if (action === 'delete') {
                items.delete(Number(id));
                if (preferred === old.nama && ![...items.values()].some(item => item.nama === old.nama)) preferred = '';
            } else {
                items.set(data.item.id, data.item);
                if (action === 'add' || preferred === old?.nama) preferred = data.item.nama;
            }
            syncDropdown(capturedType, preferred);
            input.value = ''; close(true);
            if (typeof window.toastOk === 'function') window.toastOk('Berhasil', data.message);
        } catch (error) {if (operation === epoch) notice(error.message, true);}
        finally {if (writeController === controller) writeController = null; if (operation === epoch) setBusy(false);}
    }

    function close(force = false) {
        if (busy && force !== true) return;
        readController?.abort(); readController = null; loaded = false;
        modal.classList.add('hidden'); modal.classList.remove('flex');
        document.body.style.overflow = priorOverflow;
    }

    window.openMaster = function (nextType) {
        if (busy || !Object.hasOwn(labels, nextType)) return;
        if (modal.classList.contains('hidden')) priorOverflow = document.body.style.overflow;
        type = nextType; input.value = ''; input.maxLength = limits[type];
        document.getElementById('masterTitle').textContent = 'Kelola Master ' + labels[type];
        modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow = 'hidden';
        return load();
    };
    window.closeMaster = () => close();
    window.addMaster = () => mutate('add', null, input.value);
    window.updateMaster = (id, name) => mutate('update', id, name);
    window.deleteMaster = id => mutate('delete', id);
    input.addEventListener('keydown', event => {if (event.key === 'Enter' && !event.isComposing) {event.preventDefault(); window.addMaster();}});
    document.addEventListener('keydown', event => {if (event.key === 'Escape' && !modal.classList.contains('hidden')) close();});
    window.addEventListener('pagehide', () => {epoch++; readController?.abort(); readController = null; writeController?.abort(); writeController = null; setBusy(false);});
    window.addEventListener('pageshow', event => {if (event.persisted && !modal.classList.contains('hidden')) {notice('Periksa daftar master sebelum mengirim ulang.'); load();}});
})();
