@once
    @push('styles')
        <style>
            .archive-browser-shell { text-align: left; color: #334155; }
            .archive-browser-summary {
                display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
                margin-bottom: 14px; padding: 15px 16px; border: 1px solid #bae6fd;
                border-radius: 15px; background: linear-gradient(135deg, #f0f9ff, #eef2ff);
            }
            .archive-browser-summary-label {
                margin: 0 0 4px; color: #0369a1; font-size: 10px; font-weight: 900;
                letter-spacing: .12em; text-transform: uppercase;
            }
            .archive-browser-summary-title { margin: 0; color: #0f172a; font-size: 14px; font-weight: 850; }
            .archive-browser-summary-meta { margin: 4px 0 0; color: #64748b; font-size: 11px; line-height: 1.5; }
            .archive-browser-count {
                display: inline-flex; flex: 0 0 auto; min-width: 54px; height: 54px; align-items: center;
                justify-content: center; border-radius: 14px; background: #2563eb; color: #fff;
                font-size: 18px; font-weight: 900; box-shadow: 0 8px 20px rgba(37, 99, 235, .2);
            }
            .archive-browser-sources { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 13px; }
            .archive-browser-source {
                display: inline-flex; align-items: center; gap: 5px; max-width: 100%; padding: 5px 8px;
                border: 1px solid #dbeafe; border-radius: 8px; background: #f8fafc; color: #475569;
                font-size: 10px; font-weight: 750;
            }
            .archive-browser-source-dot { width: 6px; height: 6px; border-radius: 999px; background: #94a3b8; }
            .archive-browser-source.is-available .archive-browser-source-dot { background: #10b981; }
            .archive-browser-source.is-unavailable .archive-browser-source-dot { background: #f59e0b; }
            .archive-browser-list { display: grid; gap: 9px; max-height: min(52vh, 520px); overflow-y: auto; padding-right: 3px; }
            .archive-browser-item {
                display: flex; align-items: center; justify-content: space-between; gap: 12px;
                padding: 12px 13px; border: 1px solid #e2e8f0; border-radius: 13px; background: #fff;
            }
            .archive-browser-item.is-package { border-color: #a7f3d0; background: #ecfdf5; }
            .archive-browser-item-info { min-width: 0; flex: 1; }
            .archive-browser-item-name {
                margin: 0; overflow: hidden; color: #1e293b; font-size: 12px; font-weight: 850;
                text-overflow: ellipsis; white-space: nowrap;
            }
            .archive-browser-item-meta { margin: 4px 0 0; color: #64748b; font-size: 10px; line-height: 1.45; }
            .archive-browser-location {
                display: inline-flex; margin-top: 6px; padding: 4px 7px; border-radius: 7px;
                background: #fffbeb; color: #a16207; font-size: 9px; font-weight: 750;
            }
            .archive-browser-link {
                display: inline-flex; flex: 0 0 auto; min-height: 34px; align-items: center; justify-content: center;
                padding: 0 12px; border-radius: 9px; background: #2563eb; color: #fff !important;
                font-size: 10px; font-weight: 850; text-decoration: none;
            }
            .archive-browser-item.is-package .archive-browser-link { background: #059669; }
            .archive-browser-empty {
                padding: 24px 18px; border: 1px dashed #cbd5e1; border-radius: 14px;
                background: #f8fafc; color: #64748b; text-align: center;
            }
            .archive-browser-empty strong { display: block; margin-bottom: 5px; color: #334155; font-size: 13px; }
            .archive-browser-empty span { font-size: 11px; line-height: 1.55; }
            .dark .archive-browser-shell { color: #cbd5e1; }
            .dark .archive-browser-summary { border-color: #1e40af; background: linear-gradient(135deg, #172554, #1e1b4b); }
            .dark .archive-browser-summary-label { color: #7dd3fc; }
            .dark .archive-browser-summary-title { color: #f8fafc; }
            .dark .archive-browser-summary-meta { color: #94a3b8; }
            .dark .archive-browser-source { border-color: #334155; background: #172033; color: #cbd5e1; }
            .dark .archive-browser-item { border-color: #334155; background: #172033; }
            .dark .archive-browser-item.is-package { border-color: #065f46; background: rgba(6, 78, 59, .28); }
            .dark .archive-browser-item-name { color: #f8fafc; }
            .dark .archive-browser-item-meta { color: #94a3b8; }
            .dark .archive-browser-location { background: rgba(146, 64, 14, .28); color: #fde68a; }
            .dark .archive-browser-empty { border-color: #475569; background: #172033; color: #94a3b8; }
            .dark .archive-browser-empty strong { color: #f1f5f9; }
            @media (max-width: 640px) {
                .archive-browser-summary, .archive-browser-item { align-items: stretch; }
                .archive-browser-item { flex-direction: column; }
                .archive-browser-link { width: 100%; }
                .archive-browser-list { max-height: 48vh; }
            }
        </style>
    @endpush
    @push('scripts')
        <script>
            window.openArchiveAttachmentList = async function (payload) {
                const dark = document.documentElement.classList.contains('dark');
                const moduleName = String(payload?.module || 'Dokumen');
                const nomor = String(payload?.nomor || '-');

                if (!payload?.url) {
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Alamat arsip belum tersedia',
                        confirmButtonColor: '#2563eb',
                        background: dark ? '#0f172a' : '#fff',
                        color: dark ? '#f8fafc' : '#0f172a'
                    });
                    return;
                }

                Swal.fire({
                    title: 'Memuat arsip...',
                    text: `Mencari lampiran ${moduleName} ${nomor}`,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    background: dark ? '#0f172a' : '#fff',
                    color: dark ? '#f8fafc' : '#0f172a',
                    didOpen: () => Swal.showLoading()
                });

                try {
                    const endpoint = new URL(payload.url, window.location.origin);
                    if (payload.refresh) endpoint.searchParams.set('refresh', '1');

                    const response = await fetch(endpoint.toString(), {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    const data = await response.json().catch(() => ({}));
                    if (!response.ok) {
                        throw new Error(data.message || 'Status arsip gagal diperiksa.');
                    }

                    const decision = await Swal.fire({
                        title: `Arsip ${escapeArchiveUploadHtml(moduleName)}`,
                        html: renderArchiveAttachmentList(data, { moduleName, nomor }),
                        width: 760,
                        showDenyButton: true,
                        confirmButtonText: 'Tutup',
                        denyButtonText: 'Muat ulang',
                        confirmButtonColor: '#2563eb',
                        denyButtonColor: '#64748b',
                        background: dark ? '#0f172a' : '#fff',
                        color: dark ? '#f8fafc' : '#0f172a'
                    });

                    if (decision.isDenied) {
                        await window.openArchiveAttachmentList({ ...payload, refresh: true });
                    }
                } catch (error) {
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Arsip belum dapat dibuka',
                        text: error.message || 'Sistem Arsip sedang tidak dapat dihubungi.',
                        confirmButtonColor: '#f97316',
                        background: dark ? '#0f172a' : '#fff',
                        color: dark ? '#f8fafc' : '#0f172a'
                    });
                }
            };

            window.openArchiveAttachmentUpload = async function (payload) {
                const dark = document.documentElement.classList.contains('dark');
                const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
                const moduleName = payload?.module || 'Dokumen';
                const nomor = payload?.nomor || '-';
                const nomorPr = payload?.nomor_pr || '-';
                const vendor = payload?.vendor || '-';
                const defaultDocumentType = moduleName === 'SPPH'
                    ? 'Dokumen SPPH'
                    : (moduleName === 'PPBJ' ? 'Dokumen PPBJ/PR' : 'Dokumen SP');

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
                                    <option value="${defaultDocumentType}">${defaultDocumentType}</option>
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

            function safeArchiveAttachmentUrl(value) {
                try {
                    const url = new URL(String(value || ''), window.location.origin);
                    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
                } catch (error) {
                    return '';
                }
            }

            function formatArchiveAttachmentDate(value) {
                if (!value) return '';
                const date = new Date(String(value).replace(' ', 'T'));
                if (Number.isNaN(date.getTime())) return String(value);
                return date.toLocaleString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
            }

            function formatArchiveAttachmentLocation(location) {
                if (!location || typeof location !== 'object') return '';
                if (location.label) return String(location.label);
                return [
                    location.rak || (location.rak_number ? `Rak ${location.rak_number}` : ''),
                    location.tingkat ? `Tingkat ${location.tingkat}` : '',
                    location.box ? `Box ${location.box}` : '',
                    location.box_code ? `Kode ${location.box_code}` : ''
                ].filter(Boolean).join(' • ');
            }

            function renderArchiveAttachmentList(data, context) {
                const documents = Array.isArray(data?.documents) ? data.documents : [];
                const packages = Array.isArray(data?.packages) ? data.packages : [];
                const sources = Array.isArray(data?.sources) ? data.sources : [];
                const count = Number(data?.document_count || documents.length || 0);
                const sourceLabels = sources.length
                    ? sources.map((source) => {
                        const state = String(source?.state || 'empty');
                        const stateClass = state === 'available' ? 'is-available' : (state === 'unavailable' ? 'is-unavailable' : '');
                        return `<span class="archive-browser-source ${stateClass}"><i class="archive-browser-source-dot"></i>${escapeArchiveUploadHtml(source?.nomor_pr || '-')}</span>`;
                    }).join('')
                    : (Array.isArray(context?.nomor_prs) ? context.nomor_prs : []).map((number) =>
                        `<span class="archive-browser-source"><i class="archive-browser-source-dot"></i>${escapeArchiveUploadHtml(number)}</span>`
                    ).join('');

                const packageCards = packages.map((item) => {
                    const url = safeArchiveAttachmentUrl(item?.package_download_url);
                    if (!url) return '';
                    const meta = [
                        item?.nomor_pr ? `PR ${item.nomor_pr}` : '',
                        item?.document_number || '',
                        Number(item?.file_count || 0) ? `${Number(item.file_count)} file` : ''
                    ].filter(Boolean).map(escapeArchiveUploadHtml).join(' • ');
                    return `<div class="archive-browser-item is-package">
                        <div class="archive-browser-item-info">
                            <p class="archive-browser-item-name">${escapeArchiveUploadHtml(item?.name || 'Paket arsip lengkap')}</p>
                            <p class="archive-browser-item-meta">${meta || 'Paket ZIP siap audit'}</p>
                        </div>
                        <a class="archive-browser-link" href="${escapeArchiveUploadHtml(url)}" target="_blank" rel="noopener noreferrer">Buka ZIP</a>
                    </div>`;
                }).join('');

                const documentCards = documents.map((item) => {
                    const url = safeArchiveAttachmentUrl(item?.preview_url || item?.download_url);
                    const meta = [
                        item?.nomor_pr ? `PR ${item.nomor_pr}` : '',
                        item?.type || '', item?.size || '',
                        formatArchiveAttachmentDate(item?.uploaded_at || item?.date),
                        item?.uploaded_by ? `oleh ${item.uploaded_by}` : ''
                    ].filter(Boolean).map(escapeArchiveUploadHtml).join(' • ');
                    const location = formatArchiveAttachmentLocation(item?.location);
                    return `<div class="archive-browser-item">
                        <div class="archive-browser-item-info">
                            <p class="archive-browser-item-name" title="${escapeArchiveUploadHtml(item?.name || 'Dokumen arsip')}">${escapeArchiveUploadHtml(item?.name || 'Dokumen arsip')}</p>
                            <p class="archive-browser-item-meta">${meta || 'Dokumen arsip'}</p>
                            ${location ? `<span class="archive-browser-location">Lokasi fisik: ${escapeArchiveUploadHtml(location)}</span>` : ''}
                        </div>
                        ${url ? `<a class="archive-browser-link" href="${escapeArchiveUploadHtml(url)}" target="_blank" rel="noopener noreferrer">Preview</a>` : ''}
                    </div>`;
                }).join('');

                const emptyState = !packageCards && !documentCards
                    ? `<div class="archive-browser-empty"><strong>${escapeArchiveUploadHtml(data?.state === 'unavailable' ? 'Sistem arsip belum terhubung' : 'Belum ada lampiran')}</strong><span>${escapeArchiveUploadHtml(data?.message || 'Belum ada dokumen arsip untuk nomor PR/PPBJ terkait.')}</span></div>`
                    : '';

                return `<div class="archive-browser-shell">
                    <div class="archive-browser-summary">
                        <div>
                            <p class="archive-browser-summary-label">Paket dokumen ${escapeArchiveUploadHtml(context?.moduleName || 'Arsip')}</p>
                            <p class="archive-browser-summary-title">${escapeArchiveUploadHtml(context?.nomor || data?.document_number || '-')}</p>
                            <p class="archive-browser-summary-meta">${escapeArchiveUploadHtml(data?.message || 'Status arsip berhasil diperiksa.')}</p>
                        </div>
                        <span class="archive-browser-count" title="Jumlah dokumen">${escapeArchiveUploadHtml(count)}</span>
                    </div>
                    ${sourceLabels ? `<div class="archive-browser-sources">${sourceLabels}</div>` : ''}
                    <div class="archive-browser-list">${packageCards}${documentCards}${emptyState}</div>
                </div>`;
            }
        </script>
    @endpush
@endonce
