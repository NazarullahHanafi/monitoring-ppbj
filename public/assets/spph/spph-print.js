(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const money = value => new Intl.NumberFormat('id-ID', {style:'currency',currency:'IDR',maximumFractionDigits:2}).format(Number(value || 0));
    let serial = 0, pending;
    function safeUrl(value) {
        try { const url=new URL(value,location.origin);return typeof value==='string' && url.origin===location.origin && ['https:','http:'].includes(url.protocol)?url.href:null; } catch {return null;}
    }
    const theme = () => ({customClass:{popup:'spph-signing-popup'},width:700,
        background:document.documentElement.classList.contains('dark')?'#162034':'#fff',
        color:document.documentElement.classList.contains('dark')?'#edf3ff':'#18253d'});
    function render(data) {
        return `<div class="spph-signing-content">
            <div class="spph-signing-intro">${escape(data.number)}<p>Sistem memilih penandatangan dari nilai PR/PPBJ yang tersimpan, bukan dari perkiraan.</p></div>
            ${data.errors.length?`<div class="spph-signing-warning" role="alert">${data.errors.map(error=>`<p>${escape(error)}</p>`).join('')}</div>`:''}
            <div class="spph-signing-grid"><div class="spph-signing-card"><small>TOTAL ${Number(data.pr_count)} PR/PPBJ</small><strong>${data.amount_valid?money(data.amount):'Nilai belum lengkap'}</strong><p>${escape(data.basis)}</p></div>
            <div class="spph-signing-card spph-signing-official"><small>PENANDATANGAN SESUAI ATURAN</small><strong>${data.amount_valid?escape(data.name):'Periksa nilai PR dahulu'}</strong><p>${data.amount_valid?escape(data.title):'Tidak memilih pejabat secara acak.'}</p></div></div>
            <div class="spph-signing-rule"><strong>Dasar pilihan: ${escape(data.rule)}</strong><p>${data.rules.map(rule=>`${escape(rule.label)} ${money(data.threshold)}: ${escape(rule.name)} · ${escape(rule.title)}`).join('<br>')}</p><p>Jika satu SPPH menggabungkan beberapa PR, semua nilai PR dijumlahkan satu kali. Tidak dikalikan jumlah vendor.</p></div>
            <details class="spph-signing-breakdown"><summary>Lihat rincian nilai pembentuk total (${Number(data.pr_count)} PR)</summary>${data.prs.map(pr=>`<div><span>${escape(pr.number)}</span><strong>${money(pr.amount)}</strong></div>`).join('')}${data.truncated?'<p>20 PR pertama ditampilkan; total tetap menghitung seluruh PR terhubung.</p>':''}</details>
            <ol class="spph-signing-help"><li>Periksa total nilai, nama, dan jabatan di atas.</li><li>Klik <strong>Lanjut Preview</strong>; halaman preview terbuka di tab ini.</li><li>Periksa surat, lalu gunakan tombol unduh yang tersedia. Kembali ke daftar bila perlu memperbaiki data.</li></ol>
            <div class="spph-signing-links">${safeUrl(data.ppbj_url)?`<a href="${escape(safeUrl(data.ppbj_url))}" target="_blank" rel="noopener">Periksa nilai di Management PPBJ</a>`:''}${!data.ready && safeUrl(data.master_url)?`<a href="${escape(safeUrl(data.master_url))}" target="_blank" rel="noopener">Periksa master penandatangan</a>`:''}</div>
            <p class="spph-signing-time">Diperiksa: ${escape(data.checked_at)}. Nilai dan master diperiksa ulang sebelum dokumen dibuat. Proses ini tidak membubuhkan tanda tangan digital.</p>
        </div>`;
    }
    async function getContext(id, signal) {
        const response = await fetch(`/spph/${id}/print-context`, {headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest'},cache:'no-store',signal});
        if(!response.ok) throw new Error(response.status===403?'Anda tidak memiliki akses mencetak SPPH ini.':response.status===404?'SPPH tidak ditemukan atau sudah dihapus.':'Pemeriksaan nilai belum berhasil. Silakan coba lagi.');
        return response.json();
    }
    window.openSpphPrint = async function (rawUrl) {
        if(typeof Swal==='undefined') { window.alert('Dialog cetak belum siap. Muat ulang halaman dan coba kembali.'); return; }
        let url;
        try { url=new URL(rawUrl,location.origin); } catch { return; }
        const match=url.pathname.match(/^\/spph\/(\d+)\/(cetak-preview|cetak-semua-vendor-preview)$/);
        if(url.origin!==location.origin || !match) return;
        const current=++serial;
        pending?.abort();pending=new AbortController();const controller=pending;
        let loaded=false;
        Swal.fire({title:'Memeriksa nilai PR/PPBJ',text:'Sebentar, sistem memeriksa penandatangan yang sesuai.',showConfirmButton:false,showCancelButton:true,cancelButtonText:'Batal',...theme(),didOpen:()=>Swal.showLoading()})
            .then(result=>{if(result.isDismissed && !loaded) controller.abort();});
        try {
            let context=await getContext(match[1],controller.signal);
            if(controller.signal.aborted || current!==serial) return;
            loaded=true;
            let confirmRequest;
            const result=await Swal.fire({title:'Periksa sebelum preview SPPH',html:render(context),...theme(),
                showCancelButton:true,cancelButtonText:context.ready?'Batal':'Tutup',showConfirmButton:context.ready,
                confirmButtonText:'Lanjut Preview',confirmButtonColor:'#3157d9',focusConfirm:false,showLoaderOnConfirm:true,
                allowOutsideClick:()=>!Swal.isLoading(),willClose:()=>confirmRequest?.abort(),
                preConfirm:async()=>{
                    try {
                        confirmRequest=new AbortController();
                        const latest=await getContext(match[1],confirmRequest.signal);
                        if(current!==serial || !Swal.isVisible()) return false;
                        if(latest.fingerprint!==context.fingerprint || !latest.ready) {
                            context=latest;
                            Swal.update({html:render(context),showConfirmButton:context.ready});
                            Swal.showValidationMessage('Data nilai/master berubah dan sudah diperbarui di atas. Periksa kembali sebelum melanjutkan.');
                            return false;
                        }
                        url.searchParams.set('penandatangan',latest.name);url.searchParams.set('jabatan',latest.title);
                        url.searchParams.set('print_basis',latest.fingerprint);
                        return url.href;
                    } catch(error) { if(error.name!=='AbortError') Swal.showValidationMessage(error.message);return false; }
                }});
            if(current===serial && result.isConfirmed && result.value) window.location.assign(result.value);
        } catch(error) {
            if(error.name!=='AbortError' && current===serial) Swal.fire({icon:'warning',title:'Cetak belum dapat dilanjutkan',text:error.message,confirmButtonText:'Mengerti',...theme()});
        }
    };
    window.openSpphSelectedVendor = function (select) {
        if(select.value) { window.openSpphPrint(select.value);select.value=''; }
    };
})();
