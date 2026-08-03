@once
    @push('scripts')
        <script>
            window.openArchiveAttachmentUpload = async function (payload) {
                const dark = document.documentElement.classList.contains('dark');
                const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
                const moduleName = payload?.module || 'Dokumen';
                const nomor = payload?.nomor || '-';
                const nomorPr = payload?.nomor_pr || '-';
                const vendor = payload?.vendor || '-';

                const result = await Swal.fire({
                    title: `Upload lampiran ${moduleName}`,
                    html: `
                        <div class="text-left space-y-3">
                            <div class="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-800 dark:border-sky-700 dark:bg-sky-950/60 dark:text-sky-100">
                                <div class="font-extrabold mb-1">📦 Paket dokumen siap audit</div>
                                <div class="grid grid-cols-1 gap-1">
                                    <div><b>No. Dokumen:</b> <span class="font-mono">${escapeArchiveUploadHtml(nomor)}</span></div>
                                    <div><b>No. PR/PPBJ:</b> <span class="font-mono">${escapeArchiveUploadHtml(nomorPr)}</span></div>
                                    <div><b>Vendor:</b> ${escapeArchiveUploadHtml(vendor)}</div>
                                </div>
                            </div>
                            <label class="block">
                                <span class="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">Jenis dokumen</span>
                                <select id="archiveUploadType" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                                    <option value="${moduleName === 'SPPH' ? 'Dokumen SPPH' : 'Dokumen SP'}">${moduleName === 'SPPH' ? 'Dokumen SPPH' : 'Dokumen SP'}</option>
                                    <option value="Penawaran Vendor">Penawaran Vendor</option>
                                    <option value="Kontrak">Kontrak</option>
                                    <option value="BA / Pendukung">BA / Pendukung</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </label>
                            <label class="block">
                                <span class="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">File pendukung</span>
                                <input id="archiveUploadFile" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/csv,text/plain,image/jpeg,image/png"
                                    class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                                <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Format: PDF, Word, Excel, PowerPoint, CSV/TXT, JPG/PNG. Maksimal mengikuti setting server arsip.</p>
                            </label>
                            <label class="block">
                                <span class="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">Catatan singkat</span>
                                <textarea id="archiveUploadNotes" rows="2" maxlength="500" placeholder="Contoh: penawaran final vendor / dokumen pendukung audit..."
                                    class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"></textarea>
                            </label>
                        </div>
                    `,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Upload ke Arsip',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#2563eb',
                    cancelButtonColor: '#64748b',
                    background: dark ? '#0f172a' : '#fff',
                    color: dark ? '#f8fafc' : '#0f172a',
                    width: 560,
                    focusConfirm: false,
                    preConfirm: () => {
                        const type = document.getElementById('archiveUploadType')?.value || '';
                        const file = document.getElementById('archiveUploadFile')?.files?.[0] || null;
                        const notes = document.getElementById('archiveUploadNotes')?.value || '';

                        if (!type) {
                            Swal.showValidationMessage('Jenis dokumen wajib dipilih.');
                            return false;
                        }

                        if (!file) {
                            Swal.showValidationMessage('Pilih file dulu ya, jangan ghosting file-nya 😄');
                            return false;
                        }

                        return { type, file, notes };
                    }
                });

                if (!result.isConfirmed || !result.value) return;

                await submitArchiveUpload(false);

                async function submitArchiveUpload(replaceExisting) {
                    const formData = new FormData();
                    formData.append('document_type', result.value.type);
                    formData.append('document_file', result.value.file);
                    formData.append('notes', result.value.notes);
                    if (replaceExisting) {
                        formData.append('replace_existing', '1');
                    }

                    Swal.fire({
                        title: replaceExisting ? 'Menimpa file lama...' : 'Mengirim ke Sistem Arsip...',
                        html: replaceExisting
                            ? 'File sebelumnya akan diganti dengan file terbaru. Riwayat paket PR tetap aman.'
                            : 'File sedang dikirim. Jika jenis dokumen sudah ada, sistem akan minta konfirmasi dulu.',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        background: dark ? '#0f172a' : '#fff',
                        color: dark ? '#f8fafc' : '#0f172a',
                        didOpen: () => Swal.showLoading()
                    });

                    try {
                        const response = await fetch(payload.url, {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': csrf,
                                'Accept': 'application/json'
                            },
                            body: formData
                        });

                        const data = await response.json().catch(() => ({}));

                        if (response.status === 409 || data.state === 'duplicate') {
                            const previous = data.previous_document || {};
                            const previewUrl = previous.preview_url || previous.download_url || '';
                            const duplicateDecision = await Swal.fire({
                                icon: 'warning',
                                title: 'Dokumen ini sudah pernah diupload',
                                html: `
                                    <div class="text-left text-sm leading-7 text-slate-700 dark:text-slate-200">
                                        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/50">
                                            <b>${escapeArchiveUploadHtml(result.value.type)}</b> untuk nomor
                                            <b class="font-mono">${escapeArchiveUploadHtml(nomor)}</b> sudah ada di Sistem Arsip.
                                            Jika dilanjutkan, file lama akan <b>ditimpa</b> oleh file yang baru dipilih.
                                        </div>
                                        <div class="mt-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                                            <div><b>File sebelumnya:</b> ${escapeArchiveUploadHtml(previous.name || previous.title || 'Lampiran sebelumnya')}</div>
                                            <div><b>Upload:</b> ${escapeArchiveUploadHtml(previous.uploaded_by || '-')}</div>
                                            ${previewUrl ? `<a href="${escapeArchiveUploadHtml(previewUrl)}" target="_blank" class="mt-3 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white">Review file sebelumnya</a>` : ''}
                                        </div>
                                    </div>
                                `,
                                showCancelButton: true,
                                confirmButtonText: 'Ya, timpa file lama',
                                cancelButtonText: 'Batal',
                                confirmButtonColor: '#f97316',
                                cancelButtonColor: '#64748b',
                                background: dark ? '#0f172a' : '#fff',
                                color: dark ? '#f8fafc' : '#0f172a',
                                width: 620
                            });

                            if (duplicateDecision.isConfirmed) {
                                await submitArchiveUpload(true);
                            }

                            return;
                        }

                        if (!response.ok || data.state !== 'uploaded') {
                            throw new Error(data.message || 'Upload ke Sistem Arsip belum berhasil.');
                        }

                        const previewUrl = data.document?.preview_url || data.document?.download_url;
                        await Swal.fire({
                            icon: 'success',
                            title: data.replaced ? 'Lampiran berhasil diperbarui' : 'Lampiran masuk arsip',
                            html: `
                                <div class="text-sm text-slate-600 dark:text-slate-300">
                                    Dokumen <b>${escapeArchiveUploadHtml(moduleName)}</b> ${data.replaced ? 'berhasil menimpa file lama di' : 'berhasil dikirim ke'} Sistem Arsip.
                                    ${previewUrl ? `<div class="mt-3"><a href="${escapeArchiveUploadHtml(previewUrl)}" target="_blank" class="font-bold text-blue-600 dark:text-blue-300">Preview dokumen arsip</a></div>` : ''}
                                </div>
                            `,
                            confirmButtonColor: '#2563eb',
                            background: dark ? '#0f172a' : '#fff',
                            color: dark ? '#f8fafc' : '#0f172a'
                        });
                    } catch (error) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Belum terkirim ke Arsip',
                            text: error.message || 'Sistem Arsip sedang tidak dapat menerima upload.',
                            confirmButtonColor: '#f97316',
                            background: dark ? '#0f172a' : '#fff',
                            color: dark ? '#f8fafc' : '#0f172a'
                        });
                    }
                }
            }

            function escapeArchiveUploadHtml(value) {
                return String(value ?? '').replace(/[&<>"']/g, function (char) {
                    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char];
                });
            }
        </script>
    @endpush
@endonce
