(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const money = value => new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:2}).format(Number(value || 0));
    const theme = () => ({customClass:{popup:'pr-review'}, confirmButtonColor:'#3157d9', cancelButtonColor:'#475569'});
    function payload(form) {
        const data = new FormData(form);
        // Form edit carries _method=PUT. Preview/request endpoints are always POST.
        data.delete('_method');
        return data;
    }
    async function send(url, body) {
        const response = await fetch(url, {method:'POST', body, headers:{Accept:'application/json', 'X-Requested-With':'XMLHttpRequest', 'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]')?.content || ''}});
        const data = (response.headers.get('content-type') || '').includes('application/json') ? await response.json() : {};
        if (!response.ok) throw new Error(Object.values(data.errors || {}).flat()[0] || data.message || 'Simulasi belum dapat dimuat. Silakan coba lagi.');
        return data;
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
        return html;
    }
    window.ProcurementReview = {
        async confirm(form, kind, isEdit) {
            form.inert = true;
            try {
                const id = isEdit ? new URL(form.action).pathname.split('/').filter(Boolean).pop() : '';
                const body = payload(form); body.set('action', 'save');
                const data = await send(`/procurement-review/${kind}${id ? `/${id}` : ''}`, body);
                if (data.requires_approval && !data.approved) {
                    if (data.approval_status === 'pending' && !data.approval_expired) {
                        await Swal.fire({title:'Menunggu persetujuan Umum', html:render(data) + `<div class="pr-alert">Pengajuan #${escape(data.approval_id)} sudah tersedia. Minta akun Umum lain meninjau, kemudian simpan kembali rincian yang sama. Form SP belum disimpan.</div><a href="/sp/value-approvals" target="_blank" rel="noopener" class="pr-secondary">Buka daftar persetujuan</a>`, confirmButtonText:'Kembali ke form', width:760, ...theme()});
                        return false;
                    }
                    const result = await Swal.fire({title:'Persetujuan selisih diperlukan', html:render(data) + `<div class="pr-alert">Status: ${escape(data.approval_status || 'belum diajukan')}. SP belum disimpan. Akun Umum lain harus meninjau selisih ini. Perubahan rincian memerlukan persetujuan baru.</div><a href="/sp/value-approvals" target="_blank" rel="noopener" class="pr-secondary">Buka daftar persetujuan</a>`, input:'textarea', inputPlaceholder:'Jelaskan dasar selisih nilai (minimal 10 karakter)', inputAttributes:{maxlength:'2000', 'aria-label':'Alasan selisih nilai'}, showCancelButton:true, confirmButtonText:'Ajukan persetujuan', cancelButtonText:'Kembali ke form', width:760, ...theme(),
                        preConfirm: async reason => {
                            if ((reason || '').trim().length < 10) { Swal.showValidationMessage('Alasan minimal 10 karakter.'); return false; }
                            try { const requestBody = payload(form); requestBody.set('reason', reason); return await send(`/sp/value-approvals/request${id ? `/${id}` : ''}`, requestBody); }
                            catch (error) { Swal.showValidationMessage(error.message); return false; }
                        }});
                    if (result.isConfirmed) await Swal.fire({title:'Pengajuan tersedia', text:result.value.message, icon:'info', ...theme()});
                    return false;
                }
                const result = await Swal.fire({title:data.title, html:render(data) + (data.approved ? `<div class="pr-alert">Persetujuan #${escape(data.approval_id)} tersedia. Akan diperiksa ulang dan digunakan sekali saat penyimpanan berhasil.</div>` : '') + '<p class="pr-muted">Ini pratinjau, belum mengubah data. Server memvalidasi kembali saat disimpan.</p>', showCancelButton:true, confirmButtonText:'Lanjut simpan', cancelButtonText:'Periksa kembali', width:760, ...theme()});
                return result.isConfirmed;
            } catch (error) { await Swal.fire({title:'Simulasi belum tersedia', text:error.message, icon:'warning', ...theme()}); return false; }
            finally { form.inert = false; }
        },
        async confirmDelete(kind, url) {
            try {
                const id = new URL(url, location.origin).pathname.split('/').filter(Boolean).pop();
                const body = new FormData(); body.set('action', 'delete');
                const data = await send(`/procurement-review/${kind}/${id}`, body);
                const result = await Swal.fire({title:data.title, html:render(data), showCancelButton:true, confirmButtonText:'Lanjut verifikasi sandi', cancelButtonText:'Batal', width:700, ...theme()});
                return result.isConfirmed;
            } catch (error) { await Swal.fire({title:'Simulasi belum tersedia', text:error.message, icon:'warning', ...theme()}); return false; }
        }
    };
})();
