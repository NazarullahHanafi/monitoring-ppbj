'use strict';
const VENDOR_PAGE_CONFIG = window.VENDOR_PAGE_CONFIG || {};
const vendorIndexUrl = VENDOR_PAGE_CONFIG.indexUrl || '/vendors';
const searchInput = document.getElementById('searchInput');
let vendorOperation = null, vendorEpoch = 0;

function openModal(id) {
    if (vendorOperation) return;
    const modal = document.getElementById(id);
    modal.querySelectorAll('[data-vendor-save-status]').forEach(node => {node.textContent = '';});
    modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    if (vendorOperation) return;
    const modal = document.getElementById(id);
    modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.style.overflow = '';
}
function openEditModal(id, nama, alamat, telepon, fax, email, npwp, direktur, jabatan, isActive) {
    if (vendorOperation) return;
    document.getElementById('editFormVendor').action = `${new URL(vendorIndexUrl, window.location.href).pathname}/${id}`;
    const values = {editVendorId: id, editNamaVendor: nama, editAlamatVendor: alamat, editTelpVendor: telepon,
        editFaxVendor: fax, editEmailVendor: email, editNpwpVendor: npwp, editDirekturVendor: direktur, editJabatanVendor: jabatan};
    for (const [field, value] of Object.entries(values)) document.getElementById(field).value = value ?? '';
    document.getElementById('editIsActive').checked = isActive == 1;
    window.FormUX.clear(document.getElementById('editFormVendor'));
    openModal('editModal');
}

async function vendorRequest(url, body, controller) {
    let timer, onAbort;
    try {
        const aborted = new Promise((_, reject) => {
            onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
            controller.signal.addEventListener('abort', onAbort, {once: true});
            if (controller.signal.aborted) onAbort();
        });
        const deadline = new Promise((_, reject) => {timer = setTimeout(() => {
            reject(new Error('Respons server terlalu lama. Data formulir tetap tersedia; periksa daftar sebelum menyimpan ulang.'));
            controller.abort();
        }, 30000);});
        return await Promise.race([aborted, deadline, (async () => {
            const response = await fetch(url, {method: 'POST', body, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
                headers: {Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': body.get('_token') || document.querySelector('meta[name=csrf-token]')?.content || ''}});
            if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang daftar sebelum mencoba menyimpan kembali.');
            const data = await response.json().catch(() => {throw new Error('Respons server belum lengkap. Muat ulang daftar sebelum mencoba kembali.');});
            if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Respons server belum lengkap. Muat ulang daftar sebelum mencoba kembali.');
            if (!response.ok) {
                const messages = {401: 'Sesi berakhir. Masuk kembali.', 419: 'Sesi formulir berakhir. Muat ulang halaman.', 403: 'Tindakan ini tidak diizinkan.', 429: 'Terlalu banyak permintaan. Tunggu sebentar.'};
                const message = messages[response.status] || (response.status === 422 && Object.values(data.errors || {}).flat()[0]);
                throw Object.assign(new Error(message || 'Perubahan belum terkonfirmasi. Periksa daftar sebelum mencoba lagi.'), {fields: data.errors, status: response.status});
            }
            return data;
        })()]);
    } finally {clearTimeout(timer); controller.signal.removeEventListener('abort', onAbort);}
}

function vendorTarget(value) {
    const target = new URL(value, window.location.href);
    if (target.origin !== window.location.origin || target.pathname !== new URL(vendorIndexUrl, window.location.href).pathname) throw new Error('Tujuan halaman belum valid. Muat ulang daftar vendor.');
    return target.href;
}
function releaseVendor(operation) {
    if (vendorOperation !== operation) return;
    operation.disabled.forEach(([node, value]) => {node.disabled = value;});
    operation.form.dataset.saving = 'false'; operation.form.removeAttribute('aria-busy');
    vendorOperation = null;
}
async function submitVendor(form, action = 'save') {
    if (vendorOperation) return;
    if (action === 'save' && !window.FormUX.validate(form)) return;
    const body = new FormData(form);
    const operation = {form, epoch: vendorEpoch, controller: new AbortController(), disabled: []};
    vendorOperation = operation;
    const controls = new Set([...form.querySelectorAll('button,input,select,textarea'),
        ...document.querySelectorAll('[data-vendor-action] button, button[onclick*="openModal"], button[onclick*="openEditModal"]')]);
    operation.disabled = [...controls].map(node => [node, node.disabled]);
    operation.disabled.forEach(([node]) => {node.disabled = true;});
    form.dataset.saving = 'true'; form.setAttribute('aria-busy', 'true');
    let status = action === 'save' ? form.querySelector('[data-vendor-save-status]') : document.getElementById('vendorActionStatus');
    if (!status) {status = document.createElement('p'); status.dataset.vendorSaveStatus = ''; status.setAttribute('role', 'status'); form.append(status);}
    operation.status = status;
    status.textContent = action === 'delete' ? 'Menunggu konfirmasi...' : 'Menyimpan perubahan vendor...';
    let navigating = false;
    try {
        if (action === 'delete' && !await window.FormUX.confirm({title: 'Hapus Vendor?', text: 'Vendor akan dihapus. Vendor dengan lampiran atau SP harus dinonaktifkan sebagai gantinya.', danger: true, accept: 'Hapus', cancel: 'Batal'})) {status.textContent = ''; return;}
        if (operation.epoch !== vendorEpoch) return;
        const data = await vendorRequest(form.action, body, operation.controller);
        if (operation.epoch !== vendorEpoch) return;
        if (action === 'save' ? !Number.isSafeInteger(data.id) || data.id < 1 || typeof data.redirect_url !== 'string'
            : data.success !== true || (action === 'status' && data.is_active !== (body.get('is_active') === '1'))) throw new Error('Perubahan belum dapat diverifikasi. Muat ulang daftar sebelum mencoba kembali.');
        const target = action === 'status' ? null : vendorTarget(data.redirect_url);
        status.textContent = 'Perubahan tersimpan. Memuat daftar vendor...'; navigating = true;
        if (target) window.location.href = target; else window.location.reload();
    } catch (error) {
        if (operation.epoch === vendorEpoch && error.name !== 'AbortError') {
            releaseVendor(operation);
            const fieldsShown = error.fields && action === 'save' && !window.FormUX.errors(form, error.fields);
            status.textContent = fieldsShown ? 'Perbaiki kolom yang ditandai. Data belum disimpan.'
                : error instanceof TypeError ? 'Koneksi terputus. Periksa daftar untuk memastikan hasil penyimpanan.' : error.message;
        }
    } finally {if (!navigating) releaseVendor(operation);}
}
// Compatibility for pages rendered before this asset was deployed.
function confirmDelete(event) {event.preventDefault(); void submitVendor(event.target.closest('form'), 'delete'); return false;}
function doSearch() {
    if (vendorOperation) return;
    const params = new URLSearchParams(), value = searchInput.value.trim();
    if (value) params.set('search', value);
    window.ProcurementFilters.navigate(vendorIndexUrl, params.toString());
}
function resetFilters() {window.ProcurementFilters.reset();}
function clearSearch() {window.ProcurementFilters.clear('searchInput');}

function initializeVendor() {
    window.ProcurementFilters.bind({apply: doSearch, lockedSearch: () => vendorOperation ? searchInput.value : null});
    document.querySelector('button[onclick="openModal(\'addModal\')"]')?.addEventListener('click', () => {
        if (vendorOperation) return;
        document.getElementById('addVendorForm').reset(); document.getElementById('addIsActive').checked = true;
    });
    if (new URLSearchParams(window.location.search).has('search')) {searchInput.focus(); searchInput.select();}
    for (const id of ['addVendorForm', 'editFormVendor']) {
        const form = document.getElementById(id);
        form?.addEventListener('submit', event => {event.preventDefault(); void submitVendor(form);});
    }
    document.querySelectorAll('[data-vendor-action]').forEach(form => form.addEventListener('submit', event => {
        event.preventDefault(); void submitVendor(form, form.dataset.vendorAction);
    }));
}
document.addEventListener('DOMContentLoaded', initializeVendor, {once: true});
window.addEventListener('pagehide', () => {
    vendorEpoch++;
    if (vendorOperation) {
        const operation = vendorOperation;
        operation.status.textContent = 'Perubahan belum terkonfirmasi. Muat ulang daftar untuk memeriksa hasilnya.';
        operation.controller.abort(); releaseVendor(operation);
    }
});
