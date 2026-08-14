// ===== MODAL =====
        function openModal(id) {
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
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

        // ===== SEARCH =====
        let searchTimer = null;
        const searchInput = document.getElementById('searchInput');
        const VENDOR_PAGE_CONFIG = window.VENDOR_PAGE_CONFIG || {};
        const vendorIndexUrl = VENDOR_PAGE_CONFIG.indexUrl || '/vendors';

        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                const q = this.value.trim();
                window.location.href = q ? `${vendorIndexUrl}?search=${encodeURIComponent(q)}` : vendorIndexUrl;
            }, 400);
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimer);
                const q = this.value.trim();
                window.location.href = q ? `${vendorIndexUrl}?search=${encodeURIComponent(q)}` : vendorIndexUrl;
            }
        });

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('button[onclick="openModal(\'addModal\')"]').addEventListener('click', () => {
                document.getElementById('addVendorForm').reset();
                document.getElementById('addIsActive').checked = true;
            });

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('search')) {
                searchInput.focus();
                searchInput.select();
            }
        });
