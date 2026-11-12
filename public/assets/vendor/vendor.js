// ===== MODAL =====
        function openModal(id) {
            document.getElementById(id).querySelectorAll('[data-vendor-save-status]').forEach(node => { node.textContent = ''; });
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
            if (document.getElementById(id).querySelector('form[data-saving="true"]')) return;
            document.getElementById(id).classList.add('hidden');
            document.getElementById(id).classList.remove('flex');
            document.body.style.overflow = '';
        }

        // ===== EDIT MODAL =====
        function openEditModal(id, nama, alamat, telepon, fax, email, npwp, direktur, jabatan, isActive) {
            document.getElementById('editFormVendor').action = `/vendors/${id}`;
            document.getElementById('editVendorId').value = id;
            document.getElementById('editNamaVendor').value = nama;
            document.getElementById('editAlamatVendor').value = alamat || '';
            document.getElementById('editTelpVendor').value = telepon || '';
            document.getElementById('editFaxVendor').value = fax || '';
            document.getElementById('editEmailVendor').value = email || '';
            document.getElementById('editNpwpVendor').value = npwp || '';
            document.getElementById('editDirekturVendor').value = direktur || '';
            document.getElementById('editJabatanVendor').value = jabatan || '';
            document.getElementById('editIsActive').checked = isActive == 1;
            openModal('editModal');
        }

        // ===== DELETE =====
        function confirmDelete(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Hapus Vendor?',
                text: 'Data vendor akan dihapus permanen!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Batal',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
            }).then(r => {
                if (r.isConfirmed) e.target.closest('form').submit();
            });
            return false;
        }

        // ===== MANUAL FILTERS (same behavior as SP/SPPH) =====
        const searchInput = document.getElementById('searchInput');
        const VENDOR_PAGE_CONFIG = window.VENDOR_PAGE_CONFIG || {};
        const vendorIndexUrl = VENDOR_PAGE_CONFIG.indexUrl || '/vendors';

        function doSearch() {
            const params = new URLSearchParams();
            const search = searchInput.value.trim();
            if (search) params.set('search', search);
            window.ProcurementFilters.navigate(vendorIndexUrl, params.toString());
        }
        function resetFilters() { window.ProcurementFilters.reset(); }
        function clearSearch() { window.ProcurementFilters.clear('searchInput'); }

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', function () {
            window.ProcurementFilters.bind({ apply: doSearch, lockedSearch: () => null });
            document.querySelector('button[onclick="openModal(\'addModal\')"]').addEventListener('click', () => {
                document.getElementById('addVendorForm').reset();
                document.getElementById('addIsActive').checked = true;
            });

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('search')) {
                searchInput.focus();
                searchInput.select();
            }
            for (const id of ['addVendorForm', 'editFormVendor']) {
                const form = document.getElementById(id);
                if (!form) continue;
                form.addEventListener('submit', async event => {
                    event.preventDefault();
                    if (form.dataset.saving === 'true') return;
                    if (!window.FormUX?.validate(form)) return;
                    const body = new FormData(form);
                    const controls = [...form.querySelectorAll('button,input,select,textarea')];
                    const disabled = controls.map(node => node.disabled);
                    form.dataset.saving = 'true'; form.setAttribute('aria-busy', 'true');
                    controls.forEach(node => { node.disabled = true; });
                    let status = form.querySelector('[data-vendor-save-status]');
                    if (!status) { status = document.createElement('p'); status.dataset.vendorSaveStatus = ''; status.setAttribute('role', 'status'); form.append(status); }
                    status.textContent = 'Menyimpan data vendor…';
                    const controller = new AbortController(); let timer, failure;
                    try {
                        const data = await Promise.race([
                            (async () => {
                                const response = await fetch(form.action, { method: 'POST', body, credentials: 'same-origin', signal: controller.signal,
                                    headers: { Accept: 'application/json', 'X-CSRF-TOKEN': body.get('_token') || document.querySelector('meta[name=csrf-token]')?.content || '' } });
                                if (response.redirected || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Respons belum dapat diverifikasi. Muat ulang daftar sebelum mencoba menyimpan kembali.');
                                const result = await response.json();
                                if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error('Respons server belum lengkap. Muat ulang daftar sebelum mencoba kembali.');
                                if (!response.ok) { const error = new Error(result.message || 'Data belum tersimpan. Periksa isian Anda.'); error.fields = result.errors; throw error; }
                                if (!Number.isSafeInteger(result.id) || !result.redirect_url) throw new Error('Simpanan belum dapat diverifikasi. Muat ulang daftar sebelum mencoba kembali.');
                                return result;
                            })(),
                            new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('Respons server terlalu lama. Data formulir tetap tersedia; periksa daftar sebelum menyimpan ulang.')); }, 30000); }),
                        ]);
                        const target = new URL(data.redirect_url, location.href);
                        if (target.origin !== location.origin || target.pathname !== new URL(vendorIndexUrl, location.href).pathname) throw new Error('Tujuan halaman belum valid. Muat ulang daftar vendor.');
                        status.textContent = 'Vendor tersimpan. Membuka hasil…'; window.location.href = target.href;
                    } catch (error) { failure = error; status.textContent = error.message; }
                    finally {
                        clearTimeout(timer); form.dataset.saving = 'false'; form.removeAttribute('aria-busy');
                        controls.forEach((node, index) => { node.disabled = disabled[index]; });
                        if (failure?.fields) window.FormUX.errors(form, failure.fields);
                    }
                });
            }
        });
