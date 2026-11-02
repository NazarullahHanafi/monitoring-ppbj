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
    function render(data,state={mode:'auto',names:[],titles:[]}) {
        return `<div class="spph-signing-content">
            <div class="spph-signing-intro"><span class="sg-eyebrow">KONFIRMASI CETAK</span>${escape(data.number)}<p>Rekomendasi otomatis mengikuti nilai PR. Pilihan manual tetap harus sesuai kewenangan penandatangan.</p></div>
            ${data.errors.length?`<div class="spph-signing-warning" role="alert">${data.errors.map(error=>`<p>${escape(error)}</p>`).join('')}${state.mode==='manual'&&data.amount_valid?'<p>Mode manual dapat memakai nama dan jabatan lain yang masih aktif.</p>':''}</div>`:''}
            <div class="spph-signing-grid"><div class="spph-signing-card"><small>TOTAL ${Number(data.pr_count)} PR/PPBJ</small><strong>${data.amount_valid?money(data.amount):'Nilai belum lengkap'}</strong><p>${escape(data.basis)}</p></div>
            <div class="spph-signing-card spph-signing-official"><small>REKOMENDASI OTOMATIS</small><strong>${data.amount_valid?escape(data.name):'Periksa nilai PR dahulu'}</strong><p>${data.amount_valid?escape(data.title):'Tidak memilih pejabat secara acak.'}</p></div></div>
            <div class="sg-modes" role="group" aria-label="Mode penandatangan"><button type="button" data-sg-mode="auto" aria-pressed="${state.mode==='auto'}">✦ Otomatis <span>Sesuai nilai PR</span></button><button type="button" data-sg-mode="manual" aria-pressed="${state.mode==='manual'}">✎ Pilih manual <span>Dari master aktif</span></button></div>
            ${state.mode==='manual'?`<section class="sg-manual"><div class="spph-signing-grid"><label for="sgSigner">Nama penandatangan<select id="sgSigner">${optionHtml(state.names,state.signerId)}</select></label><label for="sgTitle">Jabatan pada surat<select id="sgTitle">${optionHtml(state.titles,state.titleId)}</select></label></div><label for="sgReason">Alasan pilihan manual <small>(minimal 10 karakter)</small><textarea id="sgReason" maxlength="500" rows="2" placeholder="Contoh: penandatangan pengganti sesuai penugasan yang berlaku">${escape(state.reason || '')}</textarea></label><p>Pastikan nama dan jabatan sesuai. Pilihan ini dicatat di audit, bukan pemberian kewenangan tanda tangan.</p></section>`:''}
            <button type="button" class="sg-soft-button sg-manage-button" data-sg-manage>${data.can_manage?'＋ Kelola penandatangan & jabatan':'Lihat daftar master aktif'}</button>
            <details class="spph-signing-rule"><summary>Dasar rekomendasi: ${escape(data.rule)}</summary><p>${data.rules.map(rule=>`${escape(rule.label)} ${money(data.threshold)}: ${escape(rule.name)} · ${escape(rule.title)}`).join('<br>')}</p><p>Jika satu SPPH menggabungkan beberapa PR, semua nilai PR dijumlahkan satu kali. Tidak dikalikan jumlah vendor.</p></details>
            <details class="spph-signing-breakdown"><summary>Lihat rincian nilai pembentuk total (${Number(data.pr_count)} PR)</summary>${data.prs.map(pr=>`<div><span>${escape(pr.number)}</span><strong>${money(pr.amount)}</strong></div>`).join('')}${data.truncated?'<p>20 PR pertama ditampilkan; total tetap menghitung seluruh PR terhubung.</p>':''}</details>
            <ol class="spph-signing-help"><li>Periksa total nilai, nama, dan jabatan di atas.</li><li>Klik <strong>Lanjut Preview</strong>; halaman preview terbuka di tab ini.</li><li>Periksa surat, lalu gunakan tombol unduh yang tersedia. Kembali ke daftar bila perlu memperbaiki data.</li></ol>
            <div class="spph-signing-links">${safeUrl(data.ppbj_url)?`<a class="sg-navigation-card" href="${escape(safeUrl(data.ppbj_url))}" target="_blank" rel="noopener"><span class="sg-navigation-icon" aria-hidden="true">⌕</span><span><strong>Periksa nilai PR</strong><small>Buka Management PPBJ di tab baru</small></span><span aria-hidden="true">↗</span></a>`:''}</div>
            <p class="spph-signing-time">Diperiksa: ${escape(data.checked_at)}. Nilai dan master diperiksa ulang sebelum dokumen dibuat. Proses ini tidak membubuhkan tanda tangan digital.</p>
            ${state.message?`<p class="sg-status" role="status">${escape(state.message)}</p>`:''}
        </div>`;
    }
    function optionHtml(rows,selected) {
        return '<option value="">Pilih dari master aktif…</option>'+rows.map(row=>`<option value="${Number(row.id)}" ${Number(row.id)===Number(selected)?'selected':''}>${escape(row.nama)}</option>`).join('');
    }
    async function getContext(id, signal,query='') {
        const response = await fetch(`/spph/${id}/print-context${query?'?'+query:''}`, {headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest'},cache:'no-store',signal});
        const data=await response.json();
        if(!response.ok) throw new Error(Object.values(data.errors || {}).flat().join(' ') || data.message || 'Pemeriksaan nilai belum berhasil. Silakan coba lagi.');
        return data;
    }
    window.openSpphPrint = async function (rawUrl, retained=null) {
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
            const state=retained || {mode:'auto',names:[],titles:[],signerId:context.name_id,titleId:context.title_id,reason:''};
            let confirmRequest,managing=false;
            const capture=()=>{state.signerId=document.getElementById('sgSigner')?.value ?? state.signerId;state.titleId=document.getElementById('sgTitle')?.value ?? state.titleId;state.reason=document.getElementById('sgReason')?.value ?? state.reason;};
            const ready=()=>state.mode==='manual'?context.amount_valid:context.ready;
            const draw=()=>Swal.update({html:render(context,state),showConfirmButton:ready()});
            async function choices(){
                const data=await window.SPPHPrintMasters.choices(state.signerId,state.titleId);
                state.names=data.names;state.titles=data.titles;
            }
            const result=await Swal.fire({title:'Siapkan penandatangan SPPH',html:render(context,state),...theme(),
                didOpen:()=>{
                    const root=Swal.getHtmlContainer?.();if(!root)return;
                    root.addEventListener('click',async event=>{
                        const button=event.target.closest('[data-sg-mode],[data-sg-manage]');if(!button || Swal.isLoading()||managing)return;
                        capture();
                        try{
                            if(button.hasAttribute('data-sg-manage')){
                                managing=true;
                                Swal.close();const picked=await window.SPPHPrintMasters.open(context.can_manage);
                                if(current!==serial)return;
                                if(picked){state.mode='manual';const key=picked.type==='penandatangan_sci'?'names':'titles';state[key]=state[key].filter(row=>row.id!==picked.id).concat(picked);state[picked.type==='penandatangan_sci'?'signerId':'titleId']=picked.id;}
                                try{await choices();}catch(error){state.message=error.message;}window.openSpphPrint(rawUrl,state);return;
                            }
                            state.mode=button.dataset.sgMode;
                            if(state.mode==='manual')await choices();
                            if(current===serial&&Swal.isVisible()&&!managing)draw();
                        }catch(error){if(current===serial&&Swal.isVisible()&&!managing)Swal.showValidationMessage(error.message);}
                    });
                },
                showCancelButton:true,cancelButtonText:'Batal',showConfirmButton:ready(),
                confirmButtonText:'Lanjut Preview',confirmButtonColor:'#3157d9',focusConfirm:false,showLoaderOnConfirm:true,
                allowOutsideClick:()=>!Swal.isLoading(),willClose:()=>confirmRequest?.abort(),
                preConfirm:async()=>{
                    capture();const params=new URLSearchParams({signing_mode:state.mode});
                    if(state.mode==='manual'){
                        const signer=state.names.find(row=>Number(row.id)===Number(state.signerId)),title=state.titles.find(row=>Number(row.id)===Number(state.titleId));
                        if(!signer||!title||state.reason.trim().length<10){Swal.showValidationMessage('Pilih nama dan jabatan aktif, lalu tulis alasan manual minimal 10 karakter.');return false;}
                        params.set('signer_id',signer.id);params.set('title_id',title.id);params.set('manual_reason',state.reason.trim());params.set('penandatangan',signer.nama);params.set('jabatan',title.nama);
                    }
                    try {
                        confirmRequest=new AbortController();
                        const latest=await getContext(match[1],confirmRequest.signal,params.toString());
                        if(current!==serial || !Swal.isVisible()) return false;
                        if(latest.fingerprint!==context.fingerprint) {
                            context=latest;
                            draw();
                            Swal.showValidationMessage('Data nilai/master berubah dan sudah diperbarui di atas. Periksa kembali sebelum melanjutkan.');
                            return false;
                        }
                        for(const key of ['signing_mode','signer_id','title_id','manual_reason','penandatangan','jabatan','print_basis'])url.searchParams.delete(key);
                        for(const [key,value] of Object.entries(latest.selection))url.searchParams.set(key,value);
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
