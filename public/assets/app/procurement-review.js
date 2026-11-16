(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const money = value => new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:2}).format(Number(value || 0));
    const theme = () => ({customClass:{popup:'pr-review'}, confirmButtonColor:'#3157d9', cancelButtonColor:'#475569'});
    let activeOperation = null;
    function current(operation) {return activeOperation === operation && !operation.controller.signal.aborted;}
    function release(operation) {if (activeOperation === operation) {if (operation.form) operation.form.inert = operation.previousInert; activeOperation = null;}}
    function validPreview(data, kind, deleting = false) {
        return typeof data.title === 'string' && data.title.length > 0 && Array.isArray(data.summary) && Array.isArray(data.prs) && data.prs.length <= 20
            && (!data.removed_prs || (Array.isArray(data.removed_prs) && data.removed_prs.length <= 20))
            && (deleting || kind !== 'sp' || (typeof data.requires_approval === 'boolean' && typeof data.approved === 'boolean'
                && ['nilai_pr', 'nilai_sp', 'selisih'].every(key => Number.isFinite(data[key]))));
    }
    function payload(form) {
        const data = new FormData(form);
        // Form edit carries _method=PUT. Preview/request endpoints are always POST.
        data.delete('_method');
        return data;
    }
    async function send(url, body, operation, writing = false) {
        const controller = new AbortController();
        const cancel = () => controller.abort();
        operation.controller.signal.addEventListener('abort', cancel, {once:true});
        if (operation.controller.signal.aborted) cancel();
        let timer, onAbort;
        try {
            const aborted = new Promise((_, reject) => {onAbort = () => reject(new DOMException('Aborted', 'AbortError')); controller.signal.addEventListener('abort', onAbort, {once: true}); if (controller.signal.aborted) onAbort();});
            const deadline = new Promise((_, reject) => {timer = setTimeout(() => {reject(new Error('Respons terlalu lama. Isian form tetap ada. Periksa status pengajuan sebelum mencoba kembali.')); controller.abort();}, 30000);});
            return await Promise.race([aborted, deadline, (async () => {
                const response = await fetch(url, {method:'POST', body, credentials:'same-origin', cache:'no-store', signal:controller.signal, headers:{Accept:'application/json', 'X-Requested-With':'XMLHttpRequest', 'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]')?.content || ''}});
                if (response.redirected || !(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Respons pratinjau belum dapat diverifikasi. Muat ulang halaman sebelum melanjutkan.');
                const data = await response.json().catch(() => null);
                if (!response.ok) {
                    const messages = {401:'Sesi berakhir. Masuk kembali.',403:'Anda tidak memiliki izin untuk tindakan ini.',409:'Pengajuan telah berubah. Muat ulang dan periksa kembali.',419:'Sesi formulir berakhir. Muat ulang halaman.',429:'Terlalu banyak permintaan. Tunggu sebentar.'};
                    throw new Error(messages[response.status] || (response.status === 422 && (Object.values(data?.errors || {}).flat()[0] || data?.message)) || 'Simulasi belum dapat dimuat. Silakan coba lagi.');
                }
                if (!data || typeof data !== 'object' || Array.isArray(data) || (writing && (data.success !== true || !Number.isSafeInteger(data.id) || data.id < 1 || typeof data.message !== 'string'))) throw new Error('Respons belum lengkap. Periksa status pengajuan sebelum mencoba kembali.');
                return data;
            })()]);
        } finally { clearTimeout(timer); controller.signal.removeEventListener('abort', onAbort); operation.controller.signal.removeEventListener('abort', cancel); }
    }
    function render(data) {
        let html = `<h2>${escape(data.document)}</h2>`;
        if (data.vendor) html += `<p><strong>Vendor:</strong> ${escape(data.vendor)}</p>`;
        if (data.previous_vendor && data.previous_vendor !== data.vendor) html += `<p class="pr-muted">Vendor sebelumnya: ${escape(data.previous_vendor)}</p>`;
        if ('nilai_sp' in data) html += `<div class="pr-metrics"><div>PR / gabungan PR<strong>${money(data.nilai_pr)}</strong></div><div>Nilai SP<strong>${money(data.nilai_sp)}</strong></div><div>Selisih SP − PR<strong>${money(data.selisih)}</strong></div></div>`;
        if (data.previous_value != null) html += `<p class="pr-muted">Nilai SP sebelumnya: ${money(data.previous_value)}</p>`;
        if (data.budget_unknown) html += '<div class="pr-alert">Tidak ada nilai acuan PR. Kesesuaian anggaran belum dapat dinilai; periksa dasar pengadaan secara manual.</div>';
        html += (data.summary || []).map(line => `<p>${escape(line)}</p>`).join('');
        html += (data.changes || []).map(change => `<div class="pr-row"><strong>${escape(change.label)}</strong><div class="pr-muted">Sebelum: ${escape(change.before || '—')}</div><div>Sesudah: ${escape(change.after || '—')}</div></div>`).join('');
        html += (data.prs || []).map(pr => `<div class="pr-row"><strong>${escape(pr.nomor)}</strong>${'nilai_pr' in pr ? `<div class="pr-muted">PR ${money(pr.nilai_pr)}${'alokasi' in pr ? ` · Alokasi SP ${money(pr.alokasi)}` : ''}</div>` : ''}${pr.vendor_final ? `<div class="pr-muted">Vendor final dipertahankan: ${escape(pr.vendor_final)}</div>` : ''}</div>`).join('');
        if (data.removed_prs?.length) html += `<div class="pr-alert"><strong>PR dilepas dari dokumen:</strong><p>${data.removed_prs.map(escape).join('<br>')}</p>Referensi dokumen ini akan dibersihkan; dokumen lain tetap dipertahankan.</div>`;
        if (data.prs_truncated) html += `<p class="pr-muted">Menampilkan ${escape(data.prs.length)} dari ${escape(data.total_prs)} PR terkait.</p>`;
        if (data.removed_prs_truncated) html += `<p class="pr-muted">Menampilkan ${escape(data.removed_prs.length)} dari ${escape(data.removed_prs_count)} PR yang dilepas. Seluruh referensi tetap diperiksa saat penyimpanan.</p>`;
        return html;
    }
    window.ProcurementReview = {
        async confirm(form, kind, isEdit) {
            if (activeOperation || !['sp','spph'].includes(kind) || !window.Swal?.fire) return false;
            const operation = {form, previousInert: form.inert, controller: new AbortController(), submitting: false};
            activeOperation = operation;
            try {
                if (window.ProcurementDateWarning && !await window.ProcurementDateWarning.confirm(form, kind)) return false;
                if (!current(operation)) return false;
                form.inert = true;
                const id = isEdit ? new URL(form.action).pathname.split('/').filter(Boolean).pop() : '';
                if (isEdit && !/^[1-9]\d*$/.test(id)) throw new Error('Referensi dokumen belum valid. Muat ulang halaman.');
                const body = payload(form); body.set('action', 'save');
                const data = await send(`/procurement-review/${kind}${id ? `/${id}` : ''}`, body, operation);
                if (!current(operation)) return false;
                if (!validPreview(data, kind)) throw new Error('Pratinjau belum lengkap. Periksa kembali sebelum menyimpan.');
                if (data.requires_approval && !data.approved) {
                    if (data.approval_status === 'pending' && !data.approval_expired) {
                        await Swal.fire({title:'Menunggu persetujuan Umum', html:render(data) + `<div class="pr-alert">Pengajuan #${escape(data.approval_id)} sudah tersedia. Minta akun Umum lain meninjau, kemudian simpan kembali rincian yang sama. Form SP belum disimpan.</div><a href="/sp/value-approvals" target="_blank" rel="noopener" class="pr-secondary">Buka daftar persetujuan</a>`, confirmButtonText:'Kembali ke form', width:760, ...theme()});
                        return false;
                    }
                    const result = await Swal.fire({title:'Persetujuan selisih diperlukan', html:render(data) + `<div class="pr-alert">Status: ${escape(data.approval_status || 'belum diajukan')}. SP belum disimpan. Akun Umum lain harus meninjau selisih ini. Perubahan rincian memerlukan persetujuan baru.</div><a href="/sp/value-approvals" target="_blank" rel="noopener" class="pr-secondary">Buka daftar persetujuan</a>`, input:'textarea', inputPlaceholder:'Jelaskan dasar selisih nilai (minimal 10 karakter)', inputAttributes:{maxlength:'2000', 'aria-label':'Alasan selisih nilai'}, showCancelButton:true, showLoaderOnConfirm:true, allowOutsideClick:() => !operation.submitting, allowEscapeKey:() => !operation.submitting, confirmButtonText:'Ajukan persetujuan', cancelButtonText:'Kembali ke form', width:760, ...theme(),
                        preConfirm: async reason => {
                            if (!current(operation) || operation.submitting) return false;
                            if ((reason || '').trim().length < 10) { Swal.showValidationMessage('Alasan minimal 10 karakter.'); return false; }
                            operation.submitting = true;
                            try { const requestBody = payload(form); requestBody.set('reason', reason); const result = await send(`/sp/value-approvals/request${id ? `/${id}` : ''}`, requestBody, operation, true); return current(operation) ? result : false; }
                            catch (error) { if (current(operation) && error.name !== 'AbortError') Swal.showValidationMessage(error.message); return false; }
                            finally {operation.submitting = false;}
                        }});
                    if (current(operation) && result.isConfirmed) await Swal.fire({title:'Pengajuan tersedia', text:result.value.message, icon:'info', ...theme()});
                    return false;
                }
                const result = await Swal.fire({title:data.title, html:render(data) + (data.approved ? `<div class="pr-alert">Persetujuan #${escape(data.approval_id)} tersedia. Akan diperiksa ulang dan digunakan sekali saat penyimpanan berhasil.</div>` : '') + '<p class="pr-muted">Ini pratinjau, belum mengubah data. Server memvalidasi kembali saat disimpan.</p>', showCancelButton:true, confirmButtonText:'Lanjut simpan', cancelButtonText:'Periksa kembali', width:760, ...theme()});
                return current(operation) && result.isConfirmed;
            } catch (error) { if (activeOperation === operation && error.name !== 'AbortError') await Swal.fire({title:'Simulasi belum tersedia', text:error.message, icon:'warning', ...theme()}); return false; }
            finally { release(operation); }
        },
        async confirmDelete(kind, url) {
            if (activeOperation || !['sp','spph'].includes(kind) || !window.Swal?.fire) return false;
            const operation = {controller: new AbortController()}; activeOperation = operation;
            try {
                const id = new URL(url, location.origin).pathname.split('/').filter(Boolean).pop();
                if (!/^[1-9]\d*$/.test(id)) throw new Error('Referensi dokumen belum valid. Muat ulang halaman.');
                const body = new FormData(); body.set('action', 'delete');
                const data = await send(`/procurement-review/${kind}/${id}`, body, operation);
                if (!current(operation)) return false;
                if (!validPreview(data, kind, true)) throw new Error('Pratinjau belum lengkap. Periksa kembali sebelum melanjutkan.');
                const result = await Swal.fire({title:data.title, html:render(data), showCancelButton:true, confirmButtonText:'Lanjut verifikasi sandi', cancelButtonText:'Batal', width:700, ...theme()});
                return current(operation) && result.isConfirmed;
            } catch (error) { if (activeOperation === operation && error.name !== 'AbortError') await Swal.fire({title:'Simulasi belum tersedia', text:error.message, icon:'warning', ...theme()}); return false; }
            finally {release(operation);}
        }
    };
    window.addEventListener?.('pagehide', () => {if (activeOperation) {const operation = activeOperation; operation.controller.abort(); release(operation); if (window.Swal?.getPopup?.()?.classList.contains('pr-review')) window.Swal.close();}});
})();
