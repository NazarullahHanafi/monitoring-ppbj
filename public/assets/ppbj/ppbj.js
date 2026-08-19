// ==========================================
        // GLOBAL HELPER FUNCTIONS
        // ==========================================

        function escapeHtml(str) {
            return String(str ?? '').replace(/[&<>"']/g, (m) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
            }[m]));
        }

        function formatRupiah(value) {
            return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
        }

        function toastOk(title, text) {
            if (!window.Swal) return;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: title || 'Berhasil',
                text: text || '',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }

        function toastErr(title, text) {
            if (!window.Swal) return;
            let iconType = 'error';
            if (title === 'Sukses') iconType = 'success';
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: iconType,
                title: title || 'Gagal',
                text: text || '',
                showConfirmButton: false,
                confirmButtonText: 'Mengerti',
                timer: iconType === 'success' ? 3000 : 5000,
                timerProgressBar: true
            });
        }

        const ppbjPageConfig = window.PPBJ_PAGE_CONFIG || {};
        const ppbjCsrfToken = ppbjPageConfig.csrfToken || document.querySelector('meta[name="csrf-token"]')?.content || '';

        async function fetchJson(url, options = {}) {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(options.body ? { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': ppbjCsrfToken } : {}),
                    ...(options.headers || {})
                },
                ...options
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || 'Permintaan gagal diproses.');
            }

            return data;
        }

        function formatRealTrackingDate(dateValue) {
            if (!dateValue) return '-';
            try {
                return new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }).format(new Date(`${dateValue}T00:00:00`));
            } catch (_) {
                return dateValue;
            }
        }

        function renderRealTrackingItems(items, ppbjId) {
            if (!items?.length) {
                return `
                    <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300">
                        Belum ada tracking real. Klik tombol cepat di atas untuk mulai mencatat proses lapangan.
                    </div>
                `;
            }

            return items.map((item) => `
                <div class="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/70">
                    <div class="absolute -left-2 top-5 h-4 w-4 rounded-full border-2 border-white bg-cyan-500 shadow dark:border-slate-900"></div>
                    <div class="flex flex-wrap items-start justify-between gap-3">
                        <div class="min-w-0">
                            <div class="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">${escapeHtml(item.event_date_label || formatRealTrackingDate(item.event_date))}</div>
                            <div class="mt-1 text-base font-black text-slate-900 dark:text-white">${escapeHtml(item.title || 'Update proses')}</div>
                            <p class="mt-1 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">${escapeHtml(item.description || '-')}</p>
                            <div class="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                <span>Dibuat: ${escapeHtml(item.created_by || 'Umum')}</span>
                                <span>${escapeHtml(item.created_at || '')}</span>
                                ${item.reminder_date_label ? `<span class="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30">Reminder: ${escapeHtml(item.reminder_date_label)}</span>` : ''}
                            </div>
                        </div>
                        <div class="flex shrink-0 gap-2">
                            <button type="button" onclick="editRealTracking(${ppbjId}, ${item.id})"
                                class="rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30">Edit</button>
                            <button type="button" onclick="deleteRealTracking(${ppbjId}, ${item.id})"
                                class="rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30">Hapus</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function realTrackingModalHtml(data) {
            const ppbj = data.ppbj || {};
            window.realTrackingItemsByPpbj = window.realTrackingItemsByPpbj || {};
            window.realTrackingItemsByPpbj[ppbj.id] = data.items || [];
            const quickButtons = Object.entries(data.templates || {}).map(([key, template]) => `
                <button type="button" onclick="addRealTrackingQuick(${ppbj.id}, '${key}', ${template.requires_date ? 'true' : 'false'})"
                    class="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-cyan-500">
                    <div class="text-lg">${escapeHtml(template.emoji || '•')}</div>
                    <div class="mt-1 text-xs font-black text-slate-900 dark:text-white">${escapeHtml(template.title)}</div>
                </button>
            `).join('');

            return `
                <div class="text-left font-[Montserrat,system-ui,sans-serif]">
                    <div class="rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 p-5 text-white shadow-xl">
                        <div class="text-[11px] font-black uppercase tracking-[0.22em] text-white/75">Tracking Real PPBJ</div>
                        <div class="mt-1 text-2xl font-black">${escapeHtml(ppbj.ppbj_no || '-')}</div>
                        <div class="mt-1 text-sm font-semibold text-white/85">${escapeHtml(ppbj.uraian || '-')}</div>
                        <div class="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                            <span class="rounded-full bg-white/15 px-3 py-1">Buyer: ${escapeHtml(ppbj.buyer || '-')}</span>
                            <span class="rounded-full bg-white/15 px-3 py-1">Progress: ${escapeHtml(ppbj.progress ?? 0)}%</span>
                            <span class="rounded-full bg-white/15 px-3 py-1">Vendor: ${escapeHtml(ppbj.vendor || '-')}</span>
                        </div>
                    </div>

                    <div class="mt-4 rounded-3xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-semibold leading-relaxed text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-100">
                        Fitur masa depan aktif: setiap update bisa diberi <b>tanggal reminder</b>, jadi PPBJ yang butuh follow up bisa ditandai sejak awal.
                    </div>

                    <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">${quickButtons}</div>

                    <form id="realTrackingManualForm" class="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <label class="block">
                                <span class="text-xs font-black uppercase tracking-wide text-slate-600 dark:text-slate-200">Judul tracking</span>
                                <input name="title" maxlength="180" placeholder="Contoh: Submit dokumen ke vendor"
                                    class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                            </label>
                            <label class="block">
                                <span class="text-xs font-black uppercase tracking-wide text-slate-600 dark:text-slate-200">Tanggal kejadian</span>
                                <input name="event_date" type="date"
                                    class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                            </label>
                            <label class="block">
                                <span class="text-xs font-black uppercase tracking-wide text-slate-600 dark:text-slate-200">Reminder follow up</span>
                                <input name="reminder_date" type="date"
                                    class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                            </label>
                            <label class="block md:col-span-2">
                                <span class="text-xs font-black uppercase tracking-wide text-slate-600 dark:text-slate-200">Catatan</span>
                                <textarea name="description" rows="3" maxlength="1000" placeholder="Tambahkan catatan proses singkat..."
                                    class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"></textarea>
                            </label>
                        </div>
                        <button id="realTrackingSubmitBtn" type="submit" disabled
                            class="mt-3 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-400">
                            Simpan Tracking
                        </button>
                        <div id="realTrackingEmptyHint" class="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                            Isi minimal salah satu kolom custom agar tombol simpan aktif.
                        </div>
                    </form>

                    <div class="mt-5 border-l-2 border-cyan-200 pl-4 dark:border-cyan-700">
                        <div class="mb-3 text-sm font-black text-slate-900 dark:text-white">Riwayat Tracking Real</div>
                        <div class="space-y-3">${renderRealTrackingItems(data.items || [], ppbj.id)}</div>
                    </div>
                </div>
            `;
        }

        window.openRealTracking = async function (id) {
            try {
                const data = await fetchJson(`/ppbj/${id}/real-tracking`);
                await Swal.fire({
                    title: '',
                    html: realTrackingModalHtml(data),
                    width: 980,
                    padding: '1rem',
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                        popup: 'rounded-3xl dark:bg-slate-900',
                    },
                    didOpen: () => {
                        const form = document.getElementById('realTrackingManualForm');
                        const submitBtn = document.getElementById('realTrackingSubmitBtn');
                        const emptyHint = document.getElementById('realTrackingEmptyHint');
                        const originalSubmitText = submitBtn?.textContent?.trim() || 'Simpan Tracking';
                        const hasCustomValue = () => {
                            if (!form) return false;
                            const formData = new FormData(form);
                            return ['title', 'event_date', 'reminder_date', 'description'].some((key) => String(formData.get(key) || '').trim() !== '');
                        };
                        const syncSubmitState = () => {
                            const ready = hasCustomValue();
                            if (submitBtn) submitBtn.disabled = !ready;
                            if (emptyHint) {
                                emptyHint.textContent = ready
                                    ? 'Siap disimpan. Sistem juga mencegah tracking yang sama tersimpan dua kali.'
                                    : 'Isi minimal salah satu kolom custom agar tombol simpan aktif.';
                                emptyHint.className = ready
                                    ? 'mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-300'
                                    : 'mt-2 text-xs font-bold text-slate-500 dark:text-slate-400';
                            }
                        };
                        form?.querySelectorAll('input, textarea').forEach((field) => {
                            field.addEventListener('input', syncSubmitState);
                            field.addEventListener('change', syncSubmitState);
                        });
                        syncSubmitState();

                        form?.addEventListener('submit', async (event) => {
                            event.preventDefault();
                            if (!hasCustomValue()) {
                                syncSubmitState();
                                return;
                            }
                            const formData = new FormData(form);
                            try {
                                if (submitBtn) {
                                    submitBtn.disabled = true;
                                    submitBtn.textContent = 'Menyimpan...';
                                }
                                await fetchJson(`/ppbj/${id}/real-tracking`, {
                                    method: 'POST',
                                    body: JSON.stringify(Object.fromEntries(formData.entries()))
                                });
                                toastOk('Tracking tersimpan', 'Riwayat proses berhasil ditambahkan.');
                                window.openRealTracking(id);
                            } catch (error) {
                                toastErr('Gagal simpan', error.message);
                                if (submitBtn) {
                                    submitBtn.textContent = originalSubmitText;
                                }
                                syncSubmitState();
                            }
                        });
                    }
                });
            } catch (error) {
                toastErr('Tracking gagal dibuka', error.message);
            }
        };

        window.addRealTrackingQuick = async function (id, key, needsDate) {
            const payload = { status_key: key };

            if (needsDate) {
                const result = await Swal.fire({
                    title: 'Pilih tanggal Submit KAK',
                    text: 'Tanggal ini akan langsung tersimpan di tracking real PPBJ.',
                    input: 'date',
                    inputValue: new Date().toISOString().slice(0, 10),
                    showCancelButton: true,
                    confirmButtonText: 'Simpan tanggal',
                    cancelButtonText: 'Batal',
                    customClass: { popup: 'rounded-3xl' },
                    inputValidator: (value) => !value ? 'Tanggal wajib dipilih.' : undefined
                });

                if (!result.isConfirmed) {
                    window.openRealTracking(id);
                    return;
                }

                payload.event_date = result.value;
            }

            try {
                await fetchJson(`/ppbj/${id}/real-tracking`, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                toastOk('Tracking real tersimpan', needsDate ? 'Tanggal Submit KAK sudah dicatat.' : 'Status cepat sudah dicatat.');
                window.openRealTracking(id);
            } catch (error) {
                toastErr('Gagal simpan', error.message);
                window.openRealTracking(id);
            }
        };

        window.editRealTracking = async function (ppbjId, trackingId) {
            const item = (window.realTrackingItemsByPpbj?.[ppbjId] || []).find((row) => Number(row.id) === Number(trackingId)) || {};
            const result = await Swal.fire({
                title: 'Edit tracking real',
                html: `
                    <div class="space-y-3 text-left">
                        <input id="rtTitle" class="w-full rounded-xl border px-3 py-2 text-sm" value="${escapeHtml(item.title || '')}" placeholder="Judul">
                        <input id="rtDate" type="date" class="w-full rounded-xl border px-3 py-2 text-sm" value="${escapeHtml(item.event_date || '')}">
                        <input id="rtReminder" type="date" class="w-full rounded-xl border px-3 py-2 text-sm" value="${escapeHtml(item.reminder_date || '')}">
                        <textarea id="rtDesc" rows="4" class="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Catatan">${escapeHtml(item.description || '')}</textarea>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Simpan perubahan',
                cancelButtonText: 'Batal',
                preConfirm: () => ({
                    title: document.getElementById('rtTitle')?.value || '',
                    event_date: document.getElementById('rtDate')?.value || null,
                    reminder_date: document.getElementById('rtReminder')?.value || null,
                    description: document.getElementById('rtDesc')?.value || '',
                })
            });

            if (!result.isConfirmed) {
                window.openRealTracking(ppbjId);
                return;
            }

            try {
                await fetchJson(`/ppbj-real-tracking/${trackingId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(result.value)
                });
                toastOk('Tracking diperbarui', 'Perubahan sudah disimpan.');
                window.openRealTracking(ppbjId);
            } catch (error) {
                toastErr('Gagal update', error.message);
                window.openRealTracking(ppbjId);
            }
        };

        window.deleteRealTracking = async function (ppbjId, trackingId) {
            const confirm = await Swal.fire({
                title: 'Hapus tracking ini?',
                text: 'Riwayat tracking yang dihapus tidak tampil lagi di PPBJ ini.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#dc2626',
            });

            if (!confirm.isConfirmed) {
                window.openRealTracking(ppbjId);
                return;
            }

            try {
                await fetchJson(`/ppbj-real-tracking/${trackingId}`, {
                    method: 'DELETE',
                    body: JSON.stringify({})
                });
                toastOk('Tracking dihapus', 'Riwayat berhasil dihapus.');
                window.openRealTracking(ppbjId);
            } catch (error) {
                toastErr('Gagal hapus', error.message);
                window.openRealTracking(ppbjId);
            }
        };

        window.copyGeneralRegistration = async function (number) {
            const value = String(number || '').trim();
            if (!value) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(value);
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = value;
                    temp.setAttribute('readonly', '');
                    temp.style.position = 'fixed';
                    temp.style.left = '-9999px';
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    temp.remove();
                }

                toastOk('Nomor disalin', value);
            } catch (error) {
                toastErr('Gagal copy', 'Silakan copy nomor registrasi secara manual.');
            }
        };

        // ==========================================
        // EXPORT FUNCTIONALITY
        // ==========================================
        window.exportData = function () {
            const form = document.getElementById('ulala');
            const formData = new FormData(form);
            const params = new URLSearchParams(formData);

            Swal.fire({
                title: 'Export Data?',
                text: 'Data akan diexport sesuai filter yang aktif',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Export',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/ppbj/export?${params.toString()}`;
                    toastOk('Export dimulai', 'File akan segera didownload');
                }
            });
        };

        window.markGoodsArrived = async function (id, ppbjNo) {
            if (!window.Swal) return;

            const result = await Swal.fire({
                title: 'Barang/pekerjaan sudah datang?',
                html: `
                    <div class="text-left space-y-3">
                        <div class="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/30 dark:text-cyan-100">
                            <div class="text-xs font-black uppercase tracking-widest opacity-70">PPBJ / PR</div>
                            <div class="mt-1 font-black">${escapeHtml(ppbjNo || '-')}</div>
                            <div class="mt-2 text-xs leading-relaxed">Status ini akan terlihat oleh Operasional dan masuk ke timeline tracking.</div>
                        </div>
                    </div>
                `,
                input: 'textarea',
                inputLabel: 'Catatan singkat (opsional)',
                inputPlaceholder: 'Contoh: Barang sudah diterima di gudang / pekerjaan sudah selesai di lokasi...',
                inputAttributes: {
                    maxlength: 500,
                },
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, tandai datang',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#0891b2',
                cancelButtonColor: '#64748b',
                preConfirm: async (note) => {
                    try {
                        const response = await fetch(`/ppbj/${id}/goods-arrived`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': ppbjCsrfToken,
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                            body: JSON.stringify({ note: note || '' }),
                        });

                        const data = await response.json().catch(() => ({}));

                        if (!response.ok) {
                            throw new Error(data.message || 'Gagal menandai barang datang.');
                        }

                        return data;
                    } catch (error) {
                        Swal.showValidationMessage(error.message);
                        return false;
                    }
                },
            });

            if (result.isConfirmed) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Progress dikirim',
                    text: result.value?.message || 'Barang/pekerjaan sudah ditandai datang.',
                    timer: 1800,
                    showConfirmButton: false,
                });
                window.location.reload();
            }
        };

        // ==========================================
        // IMPORT FUNCTIONALITY
        // ==========================================
        let previewData = [];

        window.openImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            resetImport();
        };

        window.closeImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resetImport();
        };

        window.resetImport = function () {
            document.getElementById('uploadStep').classList.remove('hidden');
            document.getElementById('previewStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('importFile').value = '';
            document.getElementById('formatNotice')?.classList.add('hidden');
            document.getElementById('importWarnings')?.classList.add('hidden');
            previewData = [];
        };

        window.handleFileSelect = async function (event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validasi ukuran file
            if (file.size > 10 * 1024 * 1024) {
                toastErr('Error', 'Ukuran file maksimal 10MB');
                return;
            }

            // Validasi ekstensi
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['xlsx', 'xls', 'csv', 'txt'].includes(ext)) {
                toastErr('Error', 'Format file harus Excel (.xlsx, .xls), CSV, atau TXT');
                return;
            }

            // Show loading
            document.getElementById('uploadStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.remove('hidden');

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(ppbjPageConfig.importPreviewUrl, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData
                });

                const contentType = response.headers.get('content-type') || '';
                const result = contentType.includes('application/json')
                    ? await response.json()
                    : { message: await response.text() };

                if (!response.ok) {
                    const details = result.details ? ` ${result.details}` : '';
                    throw new Error(`${result.message || 'Gagal memproses file'}${details}`.trim());
                }

                if (!result.success) {
                    throw new Error(result.message);
                }

                // Store data
                previewData = result.data;

                // Show preview
                renderImportPreview(result);

            } catch (error) {
                document.getElementById('loadingStep').classList.add('hidden');
                document.getElementById('uploadStep').classList.remove('hidden');
                toastErr('Error', error.message);
            }
        };

        // ==========================================
        // RENDER IMPORT PREVIEW (SINGLE FUNCTION)
        // ==========================================
        function renderImportPreview(result) {
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('previewStep').classList.remove('hidden');

            // Update Summary
            document.getElementById('totalRows').textContent = result.summary.total;
            document.getElementById('validRows').textContent = result.summary.valid;
            document.getElementById('errorRows').textContent = result.summary.error;

            const formatNotice = document.getElementById('formatNotice');
            if (formatNotice) {
                const recognized = Number(result.format?.recognized_headers || 0);
                formatNotice.innerHTML = `<strong>Format dikenali.</strong> ${escapeHtml(result.format?.message || 'Header berhasil dibaca otomatis.')} ${recognized > 0 ? `(${recognized} kolom dikenali)` : ''}`;
                formatNotice.classList.remove('hidden');
            }

            const warningsBox = document.getElementById('importWarnings');
            const warnings = Array.isArray(result.warnings) ? result.warnings.filter(Boolean) : [];
            if (warningsBox) {
                if (warnings.length > 0) {
                    warningsBox.innerHTML = `<strong>Catatan pemeriksaan:</strong><ul class="mt-1 list-disc pl-5">${warnings.map(warning => `<li>${escapeHtml(warning)}</li>`).join('')}</ul>`;
                    warningsBox.classList.remove('hidden');
                } else {
                    warningsBox.classList.add('hidden');
                }
            }

            // Show/Hide Alert Box
            const errorAlert = document.getElementById('errorAlert');
            const errorCount = document.getElementById('errorCount');

            if (result.summary.error > 0) {
                errorAlert.classList.remove('hidden');
                errorAlert.className = "mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded animate-pulse";
                errorCount.textContent = result.summary.error;
            } else {
                errorAlert.classList.add('hidden');
            }

            // Pisahkan Error dan Valid, lalu gabungkan (Error duluan)
            const errorRows = result.data.filter(d => d.status === 'error');
            const validRows = result.data.filter(d => d.status === 'valid');
            const displayData = [...errorRows, ...validRows];

            // Render Table
            const tbody = document.getElementById('previewTableBody');
            tbody.innerHTML = '';

            // Tampilkan pesan jika semua valid
            if (errorRows.length === 0) {
                const successMsg = document.createElement('tr');
                successMsg.innerHTML = `
                                                                            <td colspan="7" class="px-4 py-6 text-center bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 font-semibold">
                                                                                ✅ Semua data valid! Tidak ditemukan error.
                                                                            </td>
                                                                        `;
                tbody.appendChild(successMsg);
            }

            displayData.forEach((row, index) => {
                const isError = row.status === 'error';

                const statusBadge = isError
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-md uppercase tracking-wide">
                                                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                                ERROR
                                                                               </span>`
                    : `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded uppercase">
                                                                                ✓ Valid
                                                                               </span>`;

                // Format Error Message
                let errorHtml = '<span class="text-gray-400 italic text-xs">-</span>';
                if (row.errors && row.errors.length > 0) {
                    errorHtml = '<div class="space-y-1">';
                    row.errors.forEach(err => {
                        errorHtml += `<div class="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 p-2 rounded shadow-sm text-sm font-medium leading-snug">
                                                                                    ${escapeHtml(err)}
                                                                                </div>`;
                    });
                    errorHtml += '</div>';
                }

                const tr = document.createElement('tr');

                if (isError) {
                    tr.className = 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-b-2 border-red-200 dark:border-red-800 transition-all';
                    tr.style.animation = `fadeIn 0.3s ease-out forwards ${index * 0.05}s`;
                } else {
                    tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 transition-all opacity-75';
                }

                tr.innerHTML = `
                                                                            <td class="px-4 py-3 text-center border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                                                                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-bold ${isError ? 'bg-red-600 text-white shadow-lg ring-2 ring-red-300 dark:ring-red-700' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}">
                                                                                    ${row.row_number}
                                                                                </span>
                                                                            </td>
                                                                            <td class="px-3 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                                                                                ${statusBadge}
                                                                            </td>
                                                                            <td class="px-4 py-3 font-mono text-sm border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-red-900 dark:text-red-300 font-bold' : 'text-gray-700 dark:text-gray-300'} whitespace-nowrap">
                                                                                ${escapeHtml(row.ppbj_no || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-600 dark:text-gray-400'} truncate max-w-[200px]" title="${escapeHtml(row.uraian)}">
                                                                                ${escapeHtml(row.uraian || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                                                ${escapeHtml(row.buyer || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 text-right font-mono text-gray-700 dark:text-gray-300">
                                                                                ${row.total_sebelum_ppn ? formatRupiah(row.total_sebelum_ppn) : '-'}
                                                                            </td>
                                                                            <td class="px-4 py-3 align-top w-1/3 min-w-[400px]">
                                                                                ${errorHtml}
                                                                            </td>
                                                                        `;

                tbody.appendChild(tr);
            });

            // Tombol Process Logic
            const validCount = Number(result.summary.valid || 0);
            const hasErrors = Number(result.summary.error || 0) > 0;
            const btnProcess = document.getElementById('btnProcess');

            if (validCount === 0) {
                btnProcess.disabled = true;
                btnProcess.classList.add('opacity-50', 'cursor-not-allowed');
                btnProcess.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                btnProcess.classList.add('bg-gray-500');
                btnProcess.innerHTML = `
                    <span id="btnProcessText">Tidak Ada Data Valid</span>
                    <span id="btnProcessSpinner" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                `;

                // Auto scroll ke bagian tabel error
                const tableContainer = document.querySelector('#previewStep .overflow-x-auto');
                if (tableContainer) {
                    tableContainer.scrollTop = 0;
                    const firstRow = tbody.querySelector('tr');
                    if (firstRow) {
                        firstRow.classList.add('ring-4', 'ring-red-400', 'dark:ring-red-600');
                        setTimeout(() => {
                            firstRow.classList.remove('ring-4', 'ring-red-400', 'dark:ring-red-600');
                        }, 1000);
                    }
                }
            } else {
                btnProcess.disabled = false;
                btnProcess.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-500');
                btnProcess.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                btnProcess.innerHTML = `
                                                                            <span id="btnProcessText">✓ Import ${validCount} Data Valid${hasErrors ? ' (Error Dilewati)' : ''}</span>
                                                                            <span id="btnProcessSpinner" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                                                        `;
            }
        }

        window.processImport = async function () {
            if (previewData.length === 0) {
                toastErr('Error', 'Tidak ada data untuk diimport');
                return;
            }

            const validData = previewData.filter(d => d.status === 'valid');

            if (validData.length === 0) {
                toastErr('Error', 'Tidak ada data valid untuk diimport');
                return;
            }

            const result = await Swal.fire({
                title: 'Konfirmasi Import',
                html: `Akan mengimport <strong>${validData.length}</strong> data valid.${previewData.length > validData.length ? `<br><strong>${previewData.length - validData.length}</strong> baris bermasalah akan dilewati.` : ''}<br>Lanjutkan?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Import',
                cancelButtonText: 'Batal'
            });

            if (!result.isConfirmed) return;

            const btnProcess = document.getElementById('btnProcess');
            const btnProcessText = document.getElementById('btnProcessText');
            const btnProcessSpinner = document.getElementById('btnProcessSpinner');

            btnProcess.disabled = true;
            btnProcessText.textContent = 'Memproses...';
            btnProcessSpinner.classList.remove('hidden');

            try {
                const response = await fetch(ppbjPageConfig.importProcessUrl, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ data: validData })
                });

                const contentType = response.headers.get('content-type') || '';
                const result = contentType.includes('application/json')
                    ? await response.json()
                    : { message: await response.text() };

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal import data');
                }

                let message = `Berhasil import ${result.imported} data`;
                if (result.failed > 0) {
                    message += `\nGagal: ${result.failed} data`;
                    if (result.errors && result.errors.length > 0) {
                        message += '\n\nError:\n' + result.errors.join('\n');
                    }
                }

                await Swal.fire({
                    title: 'Import Selesai',
                    text: message,
                    icon: result.failed > 0 ? 'warning' : 'success',
                    confirmButtonColor: '#10B981'
                });

                closeImportModal();
                setTimeout(() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('_t', Date.now());
                    window.location.href = url.toString();
                }, 500);

            } catch (error) {
                toastErr('Error', error.message);
            } finally {
                btnProcess.disabled = false;
                btnProcessText.textContent = `✓ Import ${validData.length} Data Valid`;
                btnProcessSpinner.classList.add('hidden');
            }
        };

        // ==========================================
        // MAIN APPLICATION (IIFE)
        // ==========================================
        (function () {
            // ==== DOM refs ====
            const ppbjForm = document.getElementById('ppbjForm');
            const formModal = document.getElementById('formModal');
            const detailModal = document.getElementById('detailModal');
            const detailContent = document.getElementById('detailContent');
            const detailHint = document.getElementById('detailHint');
            const cancelledBanner = document.getElementById('cancelledBanner');
            const cancelReasonText = document.getElementById('cancelReasonText');
            const cancelledByText = document.getElementById('cancelledByText');
            const cancelVerifiedByText = document.getElementById('cancelVerifiedByText');
            const cancelledAtText = document.getElementById('cancelledAtText');
            const detailArchiveCard = document.getElementById('detailArchiveCard');

            const formTitle = document.getElementById('formTitle');
            const ppbjIdInput = document.getElementById('ppbj_id');

            const btnSave = document.getElementById('btnSave');
            const btnSaveSpinner = document.getElementById('btnSaveSpinner');
            const btnSaveText = document.getElementById('btnSaveText');

            const inpPpbjNo = document.getElementById('ppbj_no');
            const errPpbjNo = document.getElementById('err_ppbj_no');
            const hintPpbjNo = document.getElementById('hint_ppbj_no');

            // master modal
            const masterModal = document.getElementById('masterModal');
            const masterTitle = document.getElementById('masterTitle');
            const masterInput = document.getElementById('masterInput');
            const masterList = document.getElementById('masterList');

            // data server
            window.ppbjData = ppbjPageConfig.ppbjData || {};

            // ===== MASTER CONFIG =====
            let currentMasterType = null;

            const masterLabel = {
                buyer: 'Buyer',
                portofolio: 'Portofolio',
                metode_pengadaan: 'Metode Pengadaan',
                penyedia_eksternal: 'Penyedia Eksternal',
            };

            // ===== UTILITY FUNCTIONS =====
            function setFieldError(elInput, elErr, message) {
                if (!elInput || !elErr) return;
                if (!message) {
                    elErr.textContent = '';
                    elErr.classList.add('hidden');
                    elInput.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
                    return;
                }
                elErr.textContent = message;
                elErr.classList.remove('hidden');
                elInput.classList.add('border-red-400', 'ring-2', 'ring-red-300');
            }

            function formatCurrency(input) {
                let value = input.value.replace(/[^\d.]/g, '');
                let parts = value.split('.');
                let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                let decimalPart = parts[1] || '';

                if (parts.length > 1) {
                    decimalPart = decimalPart.substring(0, 2);
                    input.value = integerPart + '.' + decimalPart;
                } else {
                    input.value = integerPart;
                }
            }

            function formatPpbjAuditDate(value) {
                if (!value) return '—';

                const date = new Date(value);
                if (Number.isNaN(date.getTime())) return value;

                return date.toLocaleString('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });
            }

            function toCurrencyString(val) {
                if (!val) return '';
                let num = parseFloat(val);
                if (isNaN(num)) return '';
                return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            function parseToRupiahDisplay(val) {
                if (!val) return '-';
                let num = parseFloat(val);
                if (isNaN(num)) return '-';
                return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            // ===== SELECT2 INIT =====
            // ===== SELECT2 INIT (DIPERBAIKI: Retain Value) =====
            function initSelect2Filter() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia!');
                    return;
                }

                // ✅ STEP 1: Simpan semua value SEBELUM apapun terjadi
                const savedValues = {};
                document.querySelectorAll('select.select2-filter').forEach(function (el) {
                    if (el.name) {
                        savedValues[el.name] = el.value;
                    }
                });

                // ✅ STEP 2: Destroy hanya yang BENAR-BENAR sudah di-init Select2
                document.querySelectorAll('select.select2-filter.select2-hidden-accessible').forEach(function (el) {
                    try {
                        jQuery(el).select2('destroy');
                    } catch (e) {
                        // Ignore error
                    }
                });

                // ✅ STEP 3: Init Select2
                jQuery('.select2-filter').select2({
                    width: '100%',
                    allowClear: true,
                    minimumResultsForSearch: 0,
                    language: {
                        noResults: function () { return "Tidak ada hasil"; },
                        searching: function () { return "Mencari..."; }
                    }
                });

                // ✅ STEP 4: Restore value SETELAH init
                Object.keys(savedValues).forEach(function (name) {
                    var val = savedValues[name];
                    if (val !== null && val !== undefined && val !== '') {
                        var $el = jQuery('select.select2-filter[name="' + name + '"]');
                        if ($el.length) {
                            $el.val(val).trigger('change.select2');
                        }
                    }
                });
            }

            function initSelect2Modal() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia untuk modal!');
                    return;
                }

                setTimeout(() => {
                    // Simpan value sebelum destroy
                    const savedValues = {};
                    $('#formModal .select2').each(function () {
                        const name = this.name;
                        if (name) {
                            savedValues[name] = $(this).val();
                        }
                    });

                    // Destroy yang sudah ada
                    $('#formModal .select2').each(function () {
                        if ($(this).hasClass('select2-hidden-accessible')) {
                            try {
                                $(this).select2('destroy');
                            } catch (e) { }
                        }
                    });

                    // Init
                    $('#formModal .select2').select2({
                        width: '100%',
                        dropdownParent: $('#formModal'),
                        allowClear: true,
                        minimumResultsForSearch: 0,
                        language: {
                            noResults: function () { return "Tidak ada hasil yang cocok"; },
                            searching: function () { return "Mencari..."; }
                        }
                    });

                    // Restore value
                    $('#formModal .select2').each(function () {
                        const name = this.name;
                        if (name && savedValues[name] !== undefined && savedValues[name] !== null && savedValues[name] !== '') {
                            $(this).val(savedValues[name]).trigger('change.select2');
                        }
                    });
                }, 100);
            }

            // ===== TOGGLE DATE INPUTS =====
            window.toggleDateInputs = function () {
                const type = document.getElementById('date_type').value;
                const groups = document.querySelectorAll('.date-input-group');
                const placeholder = document.getElementById('date-placeholder');

                groups.forEach(g => g.classList.add('hidden'));

                if (!type) {
                    placeholder.classList.remove('hidden');
                } else {
                    placeholder.classList.add('hidden');
                    const activeInput = document.getElementById('input-' + type);
                    if (activeInput) {
                        activeInput.classList.remove('hidden');
                        const firstInput = activeInput.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }
                }
            };

            // ===== INIT ON DOM READY =====
            document.addEventListener('DOMContentLoaded', () => {
                toggleDateInputs();
                initSelect2Filter();

                // Cleanup: hapus parameter _t dari URL setelah reload
                const url = new URL(window.location.href);
                if (url.searchParams.has('_t')) {
                    url.searchParams.delete('_t');
                    window.history.replaceState({}, '', url.toString());
                }
            });

            // =========================
            // DRAFT MANAGEMENT
            // =========================
            const DRAFT_KEY = 'ppbj_form_draft_v2';

            function getDraft() {
                try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'); }
                catch { return {}; }
            }

            function setDraft(d) {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(d || {}));
            }

            function clearDraft() {
                localStorage.removeItem(DRAFT_KEY);
            }

            function buildPayloadFromForm() {
                const payload = {};
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    payload[el.name] = (el.value === '' ? null : el.value);
                });
                return payload;
            }

            function applyPayloadToForm(payload) {
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    el.value = payload?.[el.name] ?? '';
                });
            }

            // auto-save draft (debounce)
            let draftTimer = null;
            ppbjForm.addEventListener('input', () => {
                clearTimeout(draftTimer);
                draftTimer = setTimeout(() => setDraft(buildPayloadFromForm()), 300);
            });

            // =========================
            // DETAIL MODAL
            // =========================
            let lastDetailId = null;

            const archiveStateUi = {
                loading: {
                    label: 'Memeriksa',
                    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                    row: 'bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800',
                    dot: 'bg-blue-500 animate-pulse'
                },
                available: {
                    label: 'Arsip tersedia',
                    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                    row: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800',
                    dot: 'bg-emerald-500'
                },
                empty: {
                    label: 'Belum ada arsip',
                    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                    row: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800',
                    dot: 'bg-amber-500'
                },
                unconfigured: {
                    label: 'Belum terhubung',
                    badge: 'bg-slate-200 text-slate-600 dark:bg-gray-700 dark:text-gray-200',
                    row: 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600',
                    dot: 'bg-slate-400'
                },
                unavailable: {
                    label: 'Tidak dapat diperiksa',
                    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                    row: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800',
                    dot: 'bg-red-500'
                }
            };

            function setArchiveState(state, message, ppbjId) {
                const ui = archiveStateUi[state] || archiveStateUi.unavailable;
                const badge = document.getElementById('detailArchiveBadge');
                const messageEl = document.getElementById('detailArchiveMessage');
                const refresh = document.getElementById('detailArchiveRefresh');
                const documents = document.getElementById('detailArchiveDocuments');
                const rowBadge = document.querySelector(`[data-archive-status][data-ppbj-id="${ppbjId}"]`);

                if (badge) {
                    badge.className = `inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${ui.badge}`;
                    badge.textContent = ui.label;
                }
                if (messageEl) messageEl.textContent = message || ui.label;
                if (refresh) refresh.classList.toggle('hidden', state === 'loading' || state === 'unconfigured');
                if (documents) {
                    documents.replaceChildren();
                    documents.classList.add('hidden');
                }
                if (rowBadge) {
                    rowBadge.className = `inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold leading-none ring-1 transition ${ui.row}`;
                    rowBadge.replaceChildren();
                    const dot = document.createElement('span');
                    dot.className = `h-1 w-1 rounded-full ${ui.dot}`;
                    rowBadge.append(dot, document.createTextNode(ui.label));
                }
            }

            function formatArchiveDate(value) {
                if (!value) return null;
                const date = new Date(String(value).replace(' ', 'T'));
                if (Number.isNaN(date.getTime())) return String(value);

                return date.toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            function formatArchiveLocation(location) {
                if (!location || typeof location !== 'object') return null;
                if (location.label) return location.label;

                const parts = [];
                if (location.rak) {
                    parts.push(location.rak);
                } else if (location.rak_number) {
                    parts.push(`Rak ${location.rak_number}`);
                }
                if (location.tingkat) parts.push(`Tingkat ${location.tingkat}`);
                if (location.box) parts.push(`Box ${location.box}`);
                if (location.box_code) parts.push(`Kode ${location.box_code}`);

                return parts.filter(Boolean).join(' • ') || null;
            }

            function renderArchiveDocuments(documents, packages = []) {
                const list = document.getElementById('detailArchiveDocuments');
                if (!list || !Array.isArray(documents) || !documents.length) return;

                if (Array.isArray(packages) && packages.length) {
                    packages.forEach((packageItem) => {
                        if (!packageItem?.package_download_url) return;

                        const packageCard = document.createElement('div');
                        packageCard.className = 'flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-700/50 dark:bg-emerald-900/20';

                        const info = document.createElement('div');
                        info.className = 'min-w-0 flex-1';

                        const title = document.createElement('p');
                        title.className = 'text-sm font-bold text-emerald-900 dark:text-emerald-100';
                        title.textContent = 'Paket arsip lengkap PR/PPBJ';

                        const meta = document.createElement('p');
                        meta.className = 'mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-200';
                        const fileCount = Number(packageItem.file_count || 0);
                        meta.textContent = [
                            packageItem.document_number || packageItem.name || 'Paket arsip',
                            fileCount ? `${fileCount} file siap audit` : null,
                        ].filter(Boolean).join(' • ');

                        info.append(title, meta);

                        const link = document.createElement('a');
                        link.href = packageItem.package_download_url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'inline-flex shrink-0 items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700';
                        link.textContent = 'ZIP Paket';

                        packageCard.append(info, link);
                        list.append(packageCard);
                    });
                }

                documents.forEach((documentItem) => {
                    const item = document.createElement('div');
                    item.className = 'flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800';

                    const info = document.createElement('div');
                    info.className = 'min-w-0 flex-1';
                    const name = document.createElement('p');
                    name.className = 'truncate text-sm font-semibold text-gray-800 dark:text-white';
                    name.textContent = documentItem.name || 'Dokumen arsip';
                    const meta = document.createElement('p');
                    meta.className = 'mt-1 text-[11px] text-gray-500 dark:text-gray-400';
                    meta.textContent = [documentItem.type, documentItem.size, formatArchiveDate(documentItem.date)]
                        .filter(Boolean).join(' • ') || 'Dokumen';
                    info.append(name, meta);

                    const locationText = formatArchiveLocation(documentItem.location);
                    if (locationText) {
                        const location = document.createElement('p');
                        location.className = 'mt-1 inline-flex flex-wrap items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-200';
                        location.textContent = `Lokasi fisik: ${locationText}`;
                        info.append(location);
                    }

                    item.append(info);

                    const previewUrl = documentItem.preview_url || documentItem.download_url;
                    if (previewUrl) {
                        const link = document.createElement('a');
                        link.href = previewUrl;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'inline-flex shrink-0 items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700';
                        link.textContent = 'Preview';
                        item.append(link);
                    }

                    list.append(item);
                });

                list.classList.remove('hidden');
            }

            async function loadPpbjArchive(id, fresh = false) {
                setArchiveState('loading', 'Menghubungi sistem arsip menggunakan nomor PPBJ/PR...', id);

                try {
                    const response = await fetch(`/ppbj/${id}/archive${fresh ? '?refresh=1' : ''}`, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    if (!response.ok) throw new Error('Status arsip gagal diperiksa.');

                    const archive = await response.json();
                    setArchiveState(archive.state, archive.message, id);
                    renderArchiveDocuments(archive.documents || [], archive.packages || []);
                } catch (error) {
                    setArchiveState('unavailable', error.message || 'Sistem arsip sedang tidak dapat dihubungi.', id);
                }
            }

            window.openDetail = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                lastDetailId = id;
                const isCancelled = String(d.status ?? 'ACTIVE').toUpperCase() === 'CANCELLED';

                cancelledBanner.classList.add('hidden');
                detailContent.classList.add('hidden');
                detailArchiveCard?.classList.add('hidden');

                if (isCancelled) {
                    detailHint.textContent = 'Status: CANCELLED';
                    const reason = (d.cancel_reason ?? '').toString().trim();
                    if (cancelReasonText) cancelReasonText.textContent = reason ? reason : '—';
                    if (cancelledByText) cancelledByText.textContent = d.cancelled_by_name || '—';
                    if (cancelVerifiedByText) cancelVerifiedByText.textContent = d.cancel_verified_by_name || '—';
                    if (cancelledAtText) cancelledAtText.textContent = formatPpbjAuditDate(d.cancelled_at);
                    cancelledBanner.classList.remove('hidden');
                } else {
                    detailHint.textContent = '';
                    renderDetail(d);
                    detailContent.classList.remove('hidden');
                }

                detailModal.classList.remove('hidden');
                detailModal.classList.add('flex');
            };

            window.openArchiveDetail = function (id) {
                window.openDetail(id);
                detailArchiveCard?.classList.remove('hidden');
                loadPpbjArchive(id);
                setTimeout(() => detailArchiveCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            };

            window.refreshCurrentPpbjArchive = function () {
                if (lastDetailId) loadPpbjArchive(lastDetailId, true);
            };

            function renderDetail(d) {
                let html = '';
                const currencyKeys = ['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'];
                const hiddenDetailKeys = new Set([
                    'sla_is_complete',
                    'sla_final_label',
                    'sla_outcome_label',
                    'sla_used_days',
                    'sla_final_remaining_days',
                    'sla_current_remaining_days',
                    'sla_start_source_label',
                    'sla_finish_source_label',
                    'sla_running_days',
                    'sla_target_date_label',
                    'sla_explanation',
                    'contract_status_label',
                    'contract_remaining_days',
                    'contract_duration_days',
                    'contract_start_date_label',
                    'contract_end_date_label',
                    'contract_end_date_source_label',
                    'contract_explanation',
                    'goods_arrived_by_user_id',
                    'goods_confirmed_by_user_id',
                    'general_registered_by_user_id',
                ]);
                const detailLabelMap = {
                    ppbj_no: 'Nomor PPBJ / PR',
                    tgl_ppbj: 'Tanggal PPBJ / PR',
                    tgl_terima_pr: 'Tanggal Terima PR',
                    uraian: 'Uraian',
                    portofolio: 'Portofolio',
                    buyer: 'Buyer',
                    general_registration_number: 'Nomor Registrasi Umum',
                    general_registered_at: 'Tanggal Registrasi Umum',
                    general_registered_by_name: 'Diregistrasi Oleh',
                    total_sebelum_ppn: 'Nilai PR',
                    target_sla_hari: 'Target SLA',
                    sisa_target_sla: 'Sisa SLA',
                    realisasi_sla: 'Realisasi SLA',
                    status_sla: 'Status SLA',
                    progres: 'Progress',
                    no_invoice: 'Nomor Invoice',
                    tgl_invoice: 'Tanggal Invoice',
                    penyedia_eksternal: 'Penyedia Eksternal',
                    nilai_sp_spk: 'Nilai SP/SPK',
                    nilai_bpg: 'Nilai BPG',
                    promised_date: 'Tanggal Pemenuhan / Berakhir Kontrak',
                    goods_arrived_at: 'Barang / Pekerjaan Datang',
                    goods_arrived_by_user_id: 'ID Penanda Barang Datang',
                    goods_arrived_by_name: 'Ditandai Datang Oleh',
                    goods_arrived_note: 'Catatan Barang Datang',
                    goods_confirmed_at: 'Dikonfirmasi Operasional',
                    goods_confirmed_by_user_id: 'ID Konfirmasi Operasional',
                    goods_confirmed_by_name: 'Dikonfirmasi Oleh',
                    goods_confirmed_note: 'Catatan Konfirmasi Operasional',
                };
                const slaResultLabel = d.sla_outcome_label || (d.sla_is_complete ? 'SLA berhenti' : d.sla_final_label || '-');
                const slaRemainingValue = Number((d.sla_current_remaining_days ?? d.sisa_target_sla) || 0);
                const slaResultClass = d.sla_is_complete
                    ? 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/30'
                    : (slaRemainingValue < 0
                        ? 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30'
                        : 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30');

                html += `
                    <div class="md:col-span-2 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 shadow-sm dark:border-blue-500/30 dark:from-blue-950/40 dark:via-gray-800 dark:to-emerald-950/30">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">Audit SLA</div>
                                <div class="mt-1 text-base font-black text-gray-900 dark:text-white">Ringkasan perhitungan sisa SLA</div>
                            </div>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${slaResultClass}">
                                ${escapeHtml(slaResultLabel)}
                            </span>
                        </div>

                        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Target</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.target_sla_hari ?? '-')} hari</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Deadline</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_target_date_label || '-')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mulai hitung</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_start_source_label || '-')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">${d.sla_is_complete ? 'Realisasi' : 'Berjalan'}</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml((d.sla_is_complete ? d.sla_used_days : d.sla_running_days) ?? '-')} hari</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status hitung</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_final_label || '-')}</div>
                            </div>
                        </div>

                        <p class="mt-4 rounded-xl border border-blue-100 bg-white/75 p-3 text-sm font-semibold leading-relaxed text-slate-700 dark:border-blue-500/20 dark:bg-gray-950/30 dark:text-slate-200">
                            ${escapeHtml(d.sla_explanation || 'Penjelasan SLA belum tersedia.')}
                        </p>
                    </div>
                `;

                const contractStatus = d.contract_status_label || 'BELUM AKTIF';
                const contractRemaining = d.contract_remaining_days;
                const contractTone = ['MELEWATI BATAS', 'TANGGAL TIDAK VALID'].includes(contractStatus)
                    ? 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30'
                    : (['SANGAT KRITIS', 'KRITIS', 'BERAKHIR HARI INI', 'SEGERA BERAKHIR'].includes(contractStatus)
                        ? 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30'
                        : (contractStatus === 'SUDAH TERPENUHI'
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30'
                            : 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/30'));
                const remainingText = contractRemaining === null || contractRemaining === undefined
                    ? '-'
                    : (Number(contractRemaining) >= 0
                        ? `${Number(contractRemaining)} hari lagi`
                        : `Lewat ${Math.abs(Number(contractRemaining))} hari`);

                html += `
                    <div class="md:col-span-2 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4 shadow-sm dark:border-violet-500/30 dark:from-violet-950/30 dark:via-gray-800 dark:to-cyan-950/30">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div class="text-[11px] font-black uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Masa Pemenuhan / Kontrak</div>
                                <div class="mt-1 text-base font-black text-gray-900 dark:text-white">Pemantauan tanggal SPK sampai batas pemenuhan</div>
                            </div>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${contractTone}">
                                ${escapeHtml(contractStatus)}
                            </span>
                        </div>
                        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mulai kontrak</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.contract_start_date_label || '-')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Batas pemenuhan</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.contract_end_date_label || '-')}</div>
                                <div class="mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">${escapeHtml(d.contract_end_date_source_label || 'Tidak dihitung')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Durasi</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.contract_duration_days === null || d.contract_duration_days === undefined ? '-' : `${d.contract_duration_days} hari`)}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Sisa waktu</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(remainingText)}</div>
                            </div>
                        </div>
                        <p class="mt-4 rounded-xl border border-violet-100 bg-white/75 p-3 text-sm font-semibold leading-relaxed text-slate-700 dark:border-violet-500/20 dark:bg-gray-950/30 dark:text-slate-200">
                            ${escapeHtml(d.contract_explanation || 'Informasi masa pemenuhan belum tersedia.')}
                        </p>
                    </div>
                `;

                Object.entries(d).forEach(([k, v]) => {
                    if (k === 'id') return;
                    if (hiddenDetailKeys.has(k)) return;

                    let displayVal = v ?? '-';
                    if (currencyKeys.includes(k) && v !== null) {
                        displayVal = parseToRupiahDisplay(v);
                    }
                    if (k === 'sisa_target_sla') {
                        const parts = [
                            d.sla_final_label || (v !== null && v !== undefined ? `${v} hari` : '-'),
                            d.sla_outcome_label || null,
                        ].filter(Boolean);
                        displayVal = parts.join(' • ');
                    }
                    if (k === 'realisasi_sla' && d.sla_is_complete && d.sla_used_days !== null && d.sla_used_days !== undefined) {
                        displayVal = `${d.sla_used_days} hari`;
                    }
                    if (k === 'target_sla_hari' && v !== null && v !== undefined && v !== '-') {
                        displayVal = `${v} hari`;
                    }
                    if (k === 'progres' && v !== null && v !== undefined && v !== '-') {
                        displayVal = `${v}%`;
                    }

                    html += `
                                                                                <div class="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-xl">
                                                                                    <div class="text-[11px] text-gray-500 dark:text-gray-400">${escapeHtml(detailLabelMap[k] || k)}</div>
                                                                                    <div class="font-semibold break-all text-gray-800 dark:text-gray-200">${escapeHtml(displayVal)}</div>
                                                                                </div>
                                                                            `;
                });
                detailContent.innerHTML = html;
            }

            window.showCancelledDetail = function () {
                const d = window.ppbjData?.[lastDetailId];
                if (!d) return;

                cancelledBanner.classList.add('hidden');
                renderDetail(d);
                detailContent.classList.remove('hidden');
            };

            window.closeDetail = function () {
                detailModal.classList.add('hidden');
                detailModal.classList.remove('flex');
            };

            // =========================
            // FORM MODAL
            // =========================
            window.openCreateForm = function () {
                Swal.fire({
                    html: `
                                                                                <div class="ppbj-warning-wrapper">
                                                                                    <div class="ppbj-warning-icon-wrap">
                                                                                        <div class="ppbj-warning-ring"></div>
                                                                                        <div class="ppbj-warning-icon">⚠️</div>
                                                                                    </div>

                                                                                    <h3 class="ppbj-warning-title">Perhatian Sebelum Menambah PPBJ</h3>

                                                                                    <div class="ppbj-warning-card">
                                                                                        <div class="ppbj-warning-row">
                                                                                            <div class="ppbj-warning-step">1</div>
                                                                                            <p>Silahkan cek di 
                                                                                            <a href="/approval/pr-receipts" target="_blank" class="ppbj-warning-link">Menu Approval PR</a> 
                                                                                            terlebih dahulu
                                                                                        </p>
                                                                                        </div>
                                                                                        <div class="ppbj-warning-row">
                                                                                            <div class="ppbj-warning-step">2</div>
                                                                                            <p>Pastikan <strong>nomor PR</strong> yang akan digunakan sudah ada</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="ppbj-warning-alert">
                                                                                        <div class="ppbj-warning-alert-icon">🚫</div>
                                                                                        <p>Jangan sampai anda mengabaikan langkah ini!</p>
                                                                                    </div>
                                                                                </div>
                                                                            `,
                    showConfirmButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Mengerti',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: 'ppbj-swal-popup',
                        confirmButton: 'ppbj-swal-btn'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearDraft();
                        ppbjForm.reset();
                        ppbjIdInput.value = '';
                        formTitle.innerText = 'Tambah PPBJ';

                        formModal.classList.remove('hidden');
                        formModal.classList.add('flex');

                        setTimeout(() => {
                            initSelect2Modal();
                            ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                                $(`#${f}`).val('').trigger('change');
                            });
                        }, 50);
                    }
                });
            };

            window.openEditForm = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                ppbjForm.reset();
                ppbjIdInput.value = d.id;
                formTitle.innerText = 'Edit PPBJ';

                setFieldError(inpPpbjNo, errPpbjNo, null);
                if (hintPpbjNo) hintPpbjNo.classList.add('hidden');

                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;

                    if (el.classList.contains('currency-input')) {
                        el.value = toCurrencyString(d[el.name]);
                    } else {
                        el.value = d[el.name] ?? '';
                    }
                });

                formModal.classList.remove('hidden');
                formModal.classList.add('flex');
                setTimeout(() => {
                    initSelect2Modal();
                    ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                        $(`#${f}`).val(d[f] ?? '').trigger('change');
                    });
                }, 50);
            };

            window.closeForm = function () {
                removeApprovalWarning();
                formModal.classList.add('hidden');
                formModal.classList.remove('flex');
            };

            function setSaving(isSaving) {
                if (isSaving) {
                    btnSaveSpinner.classList.remove('hidden');
                    btnSaveText.textContent = 'Menyimpan...';
                    btnSave.disabled = true;
                    btnSave.classList.add('opacity-80', 'cursor-not-allowed');
                } else {
                    btnSaveSpinner.classList.add('hidden');
                    btnSaveText.textContent = 'Simpan';
                    btnSave.disabled = false;
                    btnSave.classList.remove('opacity-80', 'cursor-not-allowed');
                }
            }

            // =========================
            // UNIQUE PPBJ NO CHECK
            // =========================
            function normalizeNo(v) {
                return String(v ?? '').trim().toUpperCase();
            }

            function existsOnPage(ppbjNo, ignoreId) {
                const needle = normalizeNo(ppbjNo);
                if (!needle) return false;
                const items = window.ppbjData || {};
                return Object.values(items).some(it => {
                    const itNo = normalizeNo(it?.ppbj_no);
                    if (!itNo) return false;
                    if (ignoreId && String(it?.id) === String(ignoreId)) return false;
                    return itNo === needle;
                });
            }

            let checkTimer = null;
            let lastChecked = '';
            let lastServerKnownDuplicate = false;
            let approvalWarningBanner = null;

            function showApprovalWarning(data) {
                removeApprovalWarning();

                const statusLabel = {
                    'PENDING': { text: 'MENUNGGU PERSETUJUAN UMUM', icon: '⏳', color: 'amber' },
                };
                const s = statusLabel[data.approval_status] ?? { text: data.approval_status ?? '—', icon: '⚠️', color: 'amber' };

                const palette = {
                    amber: {
                        wrap: 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 dark:border-amber-600',
                        title: 'text-amber-800 dark:text-amber-200',
                        body: 'text-amber-700 dark:text-amber-300',
                        badge: 'bg-amber-100 dark:bg-amber-800/60 text-amber-800 dark:text-amber-200',
                        link: 'text-amber-800 dark:text-amber-200 underline font-bold hover:opacity-80',
                    },
                    green: {
                        wrap: 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600',
                        title: 'text-green-800 dark:text-green-200',
                        body: 'text-green-700 dark:text-green-300',
                        badge: 'bg-green-100 dark:bg-green-800/60 text-green-800 dark:text-green-200',
                        link: 'text-green-800 dark:text-green-200 underline font-bold hover:opacity-80',
                    },
                    red: {
                        wrap: 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600',
                        title: 'text-red-800 dark:text-red-200',
                        body: 'text-red-700 dark:text-red-300',
                        badge: 'bg-red-100 dark:bg-red-800/60 text-red-800 dark:text-red-200',
                        link: 'text-red-800 dark:text-red-200 underline font-bold hover:opacity-80',
                    },
                };
                const c = palette[s.color] ?? palette.amber;

                const banner = document.createElement('div');
                banner.id = 'approvalWarningBanner';
                banner.className = `md:col-span-2 rounded-xl border-l-4 p-4 mt-1 ${c.wrap}`;
                banner.style.animation = 'pop .18s ease-out';

                banner.innerHTML = `
                                                                            <div class="flex items-start gap-3">
                                                                                <div class="text-2xl flex-shrink-0 mt-0.5 select-none">${s.icon}</div>
                                                                                <div class="flex-1 min-w-0 space-y-3">
                                                                                    <div class="font-bold text-sm ${c.title}">
                                                                                        Nomor ini sudah terdaftar di Menu Approval PR
                                                                                    </div>
                                                                                    <div class="text-xs ${c.body} space-y-1">
                                                                                        <div class="flex flex-wrap items-center gap-2">
                                                                                            <span>Status Approval:</span>
                                                                                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${c.badge}">
                                                                                                ${s.icon} ${s.text}
                                                                                            </span>
                                                                                        </div>
                                                                                        ${data.requested_by ? `<div>Diajukan oleh: <strong>${escapeHtml(data.requested_by)}</strong></div>` : ''}
                                                                                        ${data.requested_at ? `<div>Tanggal pengajuan: <strong>${escapeHtml(data.requested_at)}</strong></div>` : ''}
                                                                                        ${data.rejected_reason ? `<div class="mt-1 italic">Alasan ditolak: <strong>${escapeHtml(data.rejected_reason)}</strong></div>` : ''}
                                                                                    </div>
                                                                                    <div class="rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-3 text-xs ${c.body} space-y-2">
                                                                                        <div class="font-bold ${c.title}">📋 Alur SOP yang Benar:</div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                                                                                            <span>Tim Operasional mengajukan PR ke bagian Umum</span>
                                                                                        </div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                                                                                            <span>Umum menyetujui / menolak PR di
                                                                                                <a href="/approval/pr-receipts" target="_blank" class="${c.link}">Menu Approval PR ↗</a>
                                                                                            </span>
                                                                                        </div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                                                                                            <span>Setelah disetujui, data PPBJ akan <strong>otomatis terbuat</strong> oleh sistem</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex items-center gap-2 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-3 py-2.5">
                                                                                        <span class="text-base flex-shrink-0">🚫</span>
                                                                                        <span class="text-xs font-bold text-red-700 dark:text-red-300">
                                                                                        Nomor ini sedang <u>menunggu persetujuan Umum</u>. Setelah disetujui,
                                                                                        PPBJ akan otomatis terbuat — tidak perlu tambah manual.
                                                                                    </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        `;

                const ppbjNoWrapper = inpPpbjNo.closest('[class*="col-span"]') ?? inpPpbjNo.parentElement;
                ppbjNoWrapper.insertAdjacentElement('afterend', banner);
                approvalWarningBanner = banner;
            }

            function removeApprovalWarning() {
                const old = document.getElementById('approvalWarningBanner');
                if (old) old.remove();
                approvalWarningBanner = null;
            }

            async function checkPpbjNoUnique() {
                const id = ppbjIdInput.value || null;
                const v = (inpPpbjNo.value || '').trim();

                lastServerKnownDuplicate = false;
                removeApprovalWarning();

                if (!v) {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                    return;
                }

                if (existsOnPage(v, id)) {
                    setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada (terdeteksi di halaman ini).');
                    return;
                } else {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                }

                if (hintPpbjNo) hintPpbjNo.classList.remove('hidden');

                try {
                    const qs = new URLSearchParams({ ppbj_no: v, ignore_id: id || '' });
                    const res = await fetch(`/ppbj/check-ppbj-no?${qs.toString()}`, {
                        headers: { 'X-Requested-With': 'XMLHttpRequest' }
                    });

                    if (!res.ok) return;

                    const j = await res.json();

                    if (j?.exists_in_approval) {
                        lastServerKnownDuplicate = true;
                        setFieldError(inpPpbjNo, errPpbjNo, 'Nomor ini sudah terdaftar di Approval PR. Lihat panduan di bawah.');
                        showApprovalWarning(j.approval_detail ?? {});
                        return;
                    }

                    if (j?.exists) {
                        lastServerKnownDuplicate = true;
                        setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada.');
                    } else {
                        setFieldError(inpPpbjNo, errPpbjNo, null);
                    }

                } catch (e) {
                    // silent
                } finally {
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                }
            }

            function scheduleCheckUnique() {
                const now = normalizeNo(inpPpbjNo.value);
                if (!now) return;
                if (now === lastChecked) return;

                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    lastChecked = now;
                    await checkPpbjNoUnique();
                }, 350);
            }

            inpPpbjNo?.addEventListener('input', scheduleCheckUnique);
            inpPpbjNo?.addEventListener('blur', () => checkPpbjNoUnique());

            // Currency input handler
            document.addEventListener('input', function (e) {
                if (e.target.classList.contains('currency-input')) {
                    formatCurrency(e.target);
                }
            });

            // =========================
            // FORM SUBMIT
            // =========================
            ppbjForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                await checkPpbjNoUnique();
                const hasClientError = !errPpbjNo.classList.contains('hidden');
                if (hasClientError || lastServerKnownDuplicate) {
                    toastErr('Tidak bisa disimpan', 'No PPBJ sudah ada.');
                    inpPpbjNo.focus();
                    return;
                }

                const id = ppbjIdInput.value;
                const payload = buildPayloadFromForm();

                setSaving(true);
                setFieldError(inpPpbjNo, errPpbjNo, null);

                fetch(id ? `/ppbj/${id}` : '/ppbj', {
                    method: id ? 'PUT' : 'POST',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(async (r) => {
                        if (r.ok) {
                            if (!id) clearDraft();
                            toastOk('Tersimpan', 'Data berhasil disimpan');

                            setTimeout(() => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('_t', Date.now());
                                window.location.href = url.toString();
                            }, 500);
                            return;
                        }

                        if (r.status === 422) {
                            const j = await r.json().catch(() => ({}));
                            const err = j?.errors || {};
                            const msgPpbj = (err?.ppbj_no && err.ppbj_no[0]) ? err.ppbj_no[0] : null;
                            if (msgPpbj) setFieldError(inpPpbjNo, errPpbjNo, msgPpbj);
                            toastErr('Validasi gagal', j?.message || 'Cek input Anda');
                            setSaving(false);
                            return;
                        }

                        const j = await r.json().catch(() => ({}));
                        throw new Error(j?.message || 'Request gagal');
                    })
                    .catch((e) => {
                        setSaving(false);
                        toastErr('Gagal', e?.message || 'Gagal menyimpan data');
                    });
            });

            // =========================
            // CANCEL FUNCTIONALITY
            // =========================
            function paintRowCancelled(id, reason, audit = {}) {
                const row = document.getElementById(`row_${id}`);
                if (!row) return;

                const pill = row.querySelector('.cancelled-pill');
                if (pill) pill.classList.remove('hidden');

                const badge = row.querySelector('.status-badge');
                if (badge) {
                    badge.textContent = 'CANCELLED';
                    badge.classList.remove('bg-green-600', 'bg-yellow-500', 'bg-red-600');
                    badge.classList.add('bg-gray-600');
                }

                const actionsWrap = row.querySelector('.row-actions');
                if (actionsWrap) {
                    actionsWrap.parentElement.innerHTML = `<span class="text-xs text-gray-400">—</span>`;
                }

                if (window.ppbjData && window.ppbjData[id]) {
                    window.ppbjData[id].status = 'CANCELLED';
                    window.ppbjData[id].status_sla = 'CANCELLED';
                    window.ppbjData[id].cancel_reason = reason || window.ppbjData[id].cancel_reason || null;
                    window.ppbjData[id].cancelled_at = audit.cancelled_at || window.ppbjData[id].cancelled_at || null;
                    window.ppbjData[id].cancelled_by_user_id = audit.cancelled_by_user_id || window.ppbjData[id].cancelled_by_user_id || null;
                    window.ppbjData[id].cancel_verified_by_user_id = audit.cancel_verified_by_user_id || window.ppbjData[id].cancel_verified_by_user_id || null;
                    window.ppbjData[id].cancelled_by_name = audit.cancelled_by_name || window.ppbjData[id].cancelled_by_name || '—';
                    window.ppbjData[id].cancel_verified_by_name = audit.cancel_verified_by_name || window.ppbjData[id].cancel_verified_by_name || '—';
                }
            }

            window.cancelData = function (id) {
                const doCancel = (reason, creatorPassword) => fetch(`/ppbj/${id}/cancel`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ reason, creator_password: creatorPassword })
                }).then(async (r) => {
                    const body = await r.json().catch(() => ({}));

                    if (!r.ok) {
                        let msg = body?.message || 'Cancel gagal';

                        if (body?.locked_until) {
                            const unlockAt = new Date(body.locked_until);
                            if (!Number.isNaN(unlockAt.getTime())) {
                                msg += ` Bisa dicoba lagi: ${unlockAt.toLocaleString('id-ID', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false,
                                })}.`;
                            }
                        }

                        throw new Error(msg);
                    }

                    return body;
                });

                if (window.Swal) {
                    const isDark = document.documentElement.classList.contains('dark');
                    const popupBg = isDark ? '#111827' : '#ffffff';
                    const textColor = isDark ? '#f8fafc' : '#111827';
                    const mutedColor = isDark ? '#cbd5e1' : '#475569';
                    const inputBg = isDark ? '#1f2937' : '#f8fafc';
                    const borderColor = isDark ? '#475569' : '#cbd5e1';

                    Swal.fire({
                        title: 'Cancel Data?',
                        icon: 'warning',
                        html: `
                            <div style="text-align:left;display:grid;gap:12px;color:${textColor};font-family:Montserrat,Inter,system-ui,sans-serif">
                                <div style="border:1px solid ${isDark ? '#7f1d1d' : '#fecaca'};background:${isDark ? '#450a0a' : '#fff1f2'};color:${isDark ? '#fecaca' : '#991b1b'};border-radius:14px;padding:12px 14px;font-size:13px;line-height:1.55">
                                    <strong>Data tidak dihapus permanen.</strong><br>
                                    Status akan berubah menjadi <strong>CANCELLED</strong> agar riwayat audit tetap aman.
                                </div>

                                <label for="ppbjCancelReason" style="font-weight:800;font-size:13px">Alasan cancel <span style="color:#ef4444">*</span></label>
                                <textarea id="ppbjCancelReason" maxlength="500" placeholder="Contoh: PR dibatalkan / vendor tidak sanggup / revisi kebutuhan..." style="width:100%;min-height:96px;resize:vertical;border-radius:14px;border:1px solid ${borderColor};background:${inputBg};color:${textColor};padding:12px 14px;outline:none"></textarea>

                                <label for="ppbjCancelPassword" style="font-weight:800;font-size:13px">Password pembuat PPBJ <span style="color:#ef4444">*</span></label>
                                <div style="display:flex;gap:8px;align-items:center;border-radius:14px;border:1px solid ${borderColor};background:${inputBg};padding:6px">
                                    <input id="ppbjCancelPassword" type="password" placeholder="Masukkan password pembuat PPBJ" style="flex:1;min-width:0;border:0;background:transparent;color:${textColor};padding:8px;outline:none">
                                    <button type="button" id="ppbjCancelTogglePassword" style="border:0;border-radius:10px;background:#2563eb;color:white;padding:8px 12px;font-weight:800;font-size:12px;cursor:pointer">Lihat</button>
                                </div>

                                <div style="border:1px solid ${isDark ? '#92400e' : '#fed7aa'};background:${isDark ? '#431407' : '#fffbeb'};color:${isDark ? '#fed7aa' : '#92400e'};border-radius:14px;padding:10px 12px;font-size:12px;line-height:1.5">
                                    Jika salah 3 kali, aksi cancel akan dikunci 15 menit demi keamanan data.
                                </div>
                            </div>
                        `,
                        showCancelButton: true,
                        confirmButtonColor: '#dc2626',
                        cancelButtonColor: '#9ca3af',
                        confirmButtonText: 'Ya, cancel',
                        cancelButtonText: 'Batal',
                        background: popupBg,
                        color: textColor,
                        didOpen: () => {
                            const passwordInput = document.getElementById('ppbjCancelPassword');
                            const toggle = document.getElementById('ppbjCancelTogglePassword');
                            const reasonInput = document.getElementById('ppbjCancelReason');
                            if (reasonInput) reasonInput.focus();
                            if (toggle && passwordInput) {
                                toggle.addEventListener('click', () => {
                                    const shown = passwordInput.type === 'text';
                                    passwordInput.type = shown ? 'password' : 'text';
                                    toggle.textContent = shown ? 'Lihat' : 'Tutup';
                                });
                            }
                        },
                        preConfirm: () => {
                            const reason = (document.getElementById('ppbjCancelReason')?.value || '').trim();
                            const password = (document.getElementById('ppbjCancelPassword')?.value || '').trim();

                            if (!reason) {
                                Swal.showValidationMessage('Alasan cancel wajib diisi');
                                return false;
                            }
                            if (reason.length < 3) {
                                Swal.showValidationMessage('Alasan minimal 3 karakter');
                                return false;
                            }
                            if (!password) {
                                Swal.showValidationMessage('Password pembuat PPBJ wajib diisi');
                                return false;
                            }

                            Swal.showLoading();

                            return doCancel(reason, password)
                                .then((data) => ({ reason, data }))
                                .catch((e) => {
                                    Swal.showValidationMessage(e.message || 'Cancel gagal');
                                    return false;
                                });
                        }
                    }).then((res) => {
                        if (res.isConfirmed && res.value?.reason) {
                            paintRowCancelled(id, res.value.reason, res.value.data || {});
                            toastOk('Cancelled', 'Status berhasil diubah');
                        }
                    });
                } else {
                    const reason = prompt('Alasan cancel (wajib):');
                    if (!reason || !reason.trim()) return;
                    const password = prompt('Password pembuat PPBJ (wajib):');
                    if (!password) return;
                    doCancel(reason.trim(), password)
                        .then((data) => {
                            paintRowCancelled(id, reason.trim(), data || {});
                            alert('Berhasil cancel');
                        })
                        .catch(e => alert(e.message));
                }
            };

            // =========================
            // MASTER CRUD
            // =========================
            window.openMaster = function (type) {
                currentMasterType = type;
                masterTitle.innerText = `Kelola Master ${masterLabel[type] ?? type}`;
                masterInput.value = '';
                masterModal.classList.remove('hidden');
                masterModal.classList.add('flex');
                loadMaster();
            };

            window.closeMaster = function () {
                if (masterModal) {
                    masterModal.classList.add('hidden');
                    masterModal.classList.remove('flex');
                }
            };

            function loadMaster() {
                fetch(`/master/${currentMasterType}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        masterList.innerHTML = items.map(i => `
                                                                                    <div class="flex items-center gap-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl p-2">
                                                                                        <input class="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                                                            value="${escapeHtml(i.nama)}"
                                                                                            onkeydown="if(event.key==='Enter'){event.preventDefault();updateMaster(${i.id}, this.value)}">
                                                                                        <button type="button"
                                                                                            class="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                                                                            onclick="updateMaster(${i.id}, this.previousElementSibling.value)">Simpan</button>
                                                                                        <button type="button"
                                                                                            class="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                                                                                            onclick="deleteMaster(${i.id})">Hapus</button>
                                                                                    </div>
                                                                                `).join('');
                    });
            }

            window.addMaster = function () {
                const nama = masterInput.value.trim();
                if (!nama) return;

                fetch(`/master/${currentMasterType}`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Berhasil ditambahkan') {
                            const select = document.getElementById(currentMasterType);
                            const newOption = document.createElement("option");
                            newOption.value = escapeHtml(data.item.nama);
                            newOption.textContent = escapeHtml(data.item.nama);
                            select.appendChild(newOption);
                            select.value = newOption.value;

                            toastErr('Sukses', 'Data berhasil ditambahkan');
                            closeMaster();
                        } else {
                            toastErr('Gagal', 'Data tidak berhasil ditambahkan');
                        }
                    })
                    .catch(() => toastErr('Error', 'Terjadi kesalahan saat mengirim data'));
            };

            window.updateMaster = function (id, nama) {
                if (!nama || nama.trim() === '') {
                    toastErr('Gagal', 'Nama tidak boleh kosong');
                    return;
                }

                fetch(`/master/${currentMasterType}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': ppbjCsrfToken,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama: nama.trim() })
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => Promise.reject(err));
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.message) {
                            toastErr('Sukses', data.message);
                            refreshDropdown(currentMasterType);
                            closeMaster();
                        } else {
                            toastErr('Gagal', data.message || 'Data tidak berhasil diperbarui');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        let message = 'Terjadi kesalahan saat mengupdate data';
                        if (error.errors) {
                            message = Object.values(error.errors).flat().join(', ');
                        } else if (error.message) {
                            message = error.message;
                        }
                        toastErr('Error', message);
                    });
            };

            window.deleteMaster = function (id) {
                Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: "Data yang dihapus tidak bisa dipulihkan!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, hapus!',
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/master/${currentMasterType}/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': ppbjCsrfToken,
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    return response.json().then(err => Promise.reject(err));
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.message) {
                                    toastErr('Sukses', data.message);
                                    closeMaster();
                                    refreshDropdown(currentMasterType);
                                } else {
                                    toastErr('Gagal', data.message || 'Terjadi kesalahan saat menghapus data');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                const message = error.message || 'Terjadi kesalahan saat menghapus data';
                                toastErr('Error', message);
                            });
                    }
                });
            };

            function refreshDropdown(type) {
                fetch(`/master/${type}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        const select = document.getElementById(type);
                        if (!select) return;

                        const currentValue = select.value;
                        select.innerHTML = `<option value="">-- pilih --</option>` +
                            items.map(i => `<option value="${escapeHtml(i.nama)}">${escapeHtml(i.nama)}</option>`).join('');
                        select.value = currentValue;

                        setTimeout(() => {
                            initSelect2Modal();
                            if (window.jQuery) $(`#${type}`).val(currentValue).trigger('change');
                        }, 100);
                    })
                    .catch(err => {
                        console.error('Error refreshing dropdown:', err);
                    });
            }

        })();
