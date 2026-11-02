(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const money = value => new Intl.NumberFormat('id-ID', {style:'currency',currency:'IDR',maximumFractionDigits:2}).format(Number(value || 0));
    const options = (rows, id) => '<option value="">Pilih master aktif…</option>' + rows.map(row => `<option value="${Number(row.id)}" ${Number(id)===Number(row.id)?'selected':''}>${escape(row.nama)}</option>`).join('');
    const theme = () => ({width:760,customClass:{popup:'spph-signing-popup'},background:document.documentElement.classList.contains('dark')?'#162034':'#fff',color:document.documentElement.classList.contains('dark')?'#edf3ff':'#18253d'});
    const canLearn = data => Boolean(data.owner_can_learn && data.can_manage);
    let serial=0, pending;
    async function readResponse(response) {
        const data=await response.json();
        if(!response.ok){
            const error=new Error(Object.values(data.errors||{}).flat().join(' ')||data.message||'Pemeriksaan belum berhasil. Coba kembali.');
            error.errors=data.errors||{};throw error;
        }
        return data;
    }
    async function context(id, signal, params='') {
        const response=await fetch(`/sp/${id}/print-context${params?'?'+params:''}`,{cache:'no-store',signal,headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest'}});
        return readResponse(response);
    }
    async function confirmSelection(id,signal,params) {
        return readResponse(await fetch(`/sp/${id}/print-selection`,{method:'POST',cache:'no-store',signal,
            headers:{Accept:'application/json','Content-Type':'application/json','X-Requested-With':'XMLHttpRequest','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]')?.content||''},
            body:JSON.stringify(Object.fromEntries(params))}));
    }
    function render(data,s) {
        return `<div class="spph-signing-content"><div class="spph-signing-intro"><span class="sg-eyebrow">SP / KONTRAK · KONFIRMASI CETAK</span>${escape(data.number)}<p>Periksa penandatangan SCI dan bidang pemilik PR sebelum membuat dokumen. Penandatangan vendor tetap mengikuti Master Vendor.</p></div>
        ${data.errors.length?`<div class="spph-signing-warning">${data.errors.map(x=>`<p>${escape(x)}</p>`).join('')}</div>`:''}
        <div class="spph-signing-grid"><div class="spph-signing-card"><small>NILAI SP</small><strong>${money(data.amount)}</strong><p>${escape(data.basis)}</p></div><div class="spph-signing-card spph-signing-official"><small>REKOMENDASI SCI</small><strong>${escape(data.name)}</strong><p>${escape(data.title)}</p></div></div>
        <div class="sg-modes" aria-label="Mode penandatangan"><button type="button" data-sp-print="auto" aria-pressed="${s.mode==='auto'}">Otomatis<span>Sesuai nilai SP</span></button><button type="button" data-sp-print="manual" aria-pressed="${s.mode==='manual'}">Pilih manual<span>Nama dan jabatan dari master aktif</span></button></div>
        ${s.mode==='manual'?`<section class="sg-manual"><div class="spph-signing-grid"><label>Penandatangan SCI<select id="spPrintSigner">${options(s.names,s.signerId)}</select></label><label>Jabatan SCI<select id="spPrintTitle">${options(s.titles,s.titleId)}</select></label></div><label>Alasan manual (minimal 10 karakter)<textarea id="spPrintReason" maxlength="500" rows="2">${escape(s.reason)}</textarea></label><p>Pilihan dicatat di audit. Memilih nama bukan pemberian kewenangan tanda tangan.</p></section>`:''}
        <section class="sg-manual"><span class="sg-eyebrow">BIDANG PEMILIK PR</span><p>Portofolio: <strong>${escape(data.portfolios.join(', ')||'Belum tersedia')}</strong></p><p>${canLearn(data)?'Cukup pilih bidang di bawah. Saat klik <strong>Lanjut Preview</strong>, pilihan otomatis diingat untuk portofolio ini dan cetak berikutnya terisi otomatis.':data.owner_field_name?'Terisi otomatis: '+escape(data.owner_field_name):'Pilih bidang penanggung jawab. Untuk paket lintas portofolio atau pemetaan nonaktif, sertakan alasan.'}</p>
        ${!canLearn(data)&&data.owner_diagnostics.length?`<div class="spph-signing-warning">${data.owner_diagnostics.map(x=>`<p>${escape(x)}</p>`).join('')}</div>`:''}
        <label>Bidang pemilik PR<select id="spPrintField">${options(s.fields,s.fieldId)}</select></label>${canLearn(data)?'<p>Tidak perlu membuka pengaturan pemetaan. Jika klik Batal, pilihan tidak disimpan.</p>':`<label>Alasan jika mengganti bidang / belum dipetakan<textarea id="spPrintFieldReason" rows="2" maxlength="500" placeholder="Contoh: bidang penanggung jawab sesuai konfirmasi pemilik PR">${escape(s.fieldReason)}</textarea></label><p>Perubahan pada pemetaan yang sudah ada tidak disimpan otomatis agar tidak mengubah cetak pengguna lain.</p>`}
        <details class="spph-signing-rule"><summary>Pengaturan lanjutan bidang</summary><div class="sg-inline-actions"><button type="button" class="sg-soft-button" data-sp-print="fields">Kelola bidang</button><button type="button" class="sg-soft-button" data-sp-print="maps">Pemetaan portofolio → bidang</button></div></details></section>
        <button type="button" class="sg-soft-button sg-manage-button" data-sp-print="masters">Kelola penandatangan & jabatan</button>
        <details class="spph-signing-rule"><summary>Aturan: ${escape(data.rule)}</summary>${data.rules.map(x=>`<p>${escape(x.label)} ${money(data.threshold)}: ${escape(x.name)} · ${escape(x.title)}</p>`).join('')}<p>Tepat pada batas memakai Kepala Cabang. Nilai PR tidak menggantikan nilai SP.</p></details>
        <details class="spph-signing-breakdown"><summary>PR terhubung (${Number(data.pr_count)})</summary>${data.prs.map(pr=>`<div><span>${escape(pr.number)}<br>${escape(pr.portfolio||'Tanpa portofolio')}</span><strong>${money(pr.amount)}</strong></div>`).join('')}${data.truncated?'<p>Hanya 20 PR pertama ditampilkan.</p>':''}</details>
        <ol class="spph-signing-help"><li>Periksa nilai, nama, jabatan, serta bidang di atas.</li><li>Lanjut Preview, periksa isi surat, lalu unduh. Tidak ada tanda tangan digital yang dibubuhkan otomatis.</li></ol><p class="spph-signing-time">Diperiksa ${escape(data.checked_at)}. Nilai dan master divalidasi ulang sebelum cetak.</p></div>`;
    }
    window.openSpPrintPreview=async function(rawUrl,retained=null){
        if(typeof Swal==='undefined'){window.alert('Dialog cetak belum siap. Muat ulang halaman.');return;}
        let url;try{url=new URL(rawUrl,location.origin);}catch{return;}
        const match=url.pathname.match(/^\/sp\/(\d+)\/cetak-preview$/);if(!match||url.origin!==location.origin)return;
        const current=++serial;pending?.abort();pending=new AbortController();const controller=pending;
        let loaded=false;
        Swal.fire({title:'Memeriksa nilai SP dan portofolio',showConfirmButton:false,showCancelButton:true,...theme(),didOpen:()=>Swal.showLoading()}).then(r=>{if(r.isDismissed&&!loaded)controller.abort();});
        try{
            let data=await context(match[1],controller.signal);
            const s=retained&&typeof retained==='object'?retained:{mode:'auto',signerId:data.name_id,titleId:data.title_id,reason:'',fieldId:data.owner_field_id,fieldReason:'',fieldManual:false};
            if(!s.fieldManual)s.fieldId=data.owner_field_id;
            Object.assign(s,await window.SPPHPrintMasters.choices(s.signerId,s.titleId,s.fieldId,true));
            if(current!==serial||controller.signal.aborted)return;loaded=true;
            let managing=false,confirmRequest;
            const capture=()=>{s.signerId=document.getElementById('spPrintSigner')?.value??s.signerId;s.titleId=document.getElementById('spPrintTitle')?.value??s.titleId;s.reason=document.getElementById('spPrintReason')?.value??s.reason;s.fieldId=document.getElementById('spPrintField')?.value??s.fieldId;s.fieldReason=document.getElementById('spPrintFieldReason')?.value??s.fieldReason;s.fieldManual=Number(s.fieldId)!==Number(data.owner_field_id);};
            const ready=()=>s.mode==='manual'?data.amount_valid:data.ready;
            const result=await Swal.fire({title:'Siapkan cetak SP / Kontrak',html:render(data,s),...theme(),showCancelButton:true,cancelButtonText:'Batal',showConfirmButton:ready(),confirmButtonText:'Lanjut Preview',confirmButtonColor:'#3157d9',focusConfirm:false,showLoaderOnConfirm:true,allowOutsideClick:()=>!Swal.isLoading(),willClose:()=>confirmRequest?.abort(),
                didOpen:()=>Swal.getHtmlContainer().addEventListener('click',async event=>{
                    const button=event.target.closest('[data-sp-print]');if(!button||managing||Swal.isLoading())return;capture();
                    const action=button.dataset.spPrint;
                    if(['auto','manual'].includes(action)){s.mode=action;Swal.update({html:render(data,s),showConfirmButton:ready()});return;}
                    managing=true;Swal.close();
                    try{
                        if(action==='maps')await window.SPPortfolioMaps.open(data);
                        else{
                            const picked=await window.SPPHPrintMasters.open(data.can_manage,action==='fields'?'bidang_pr':'penandatangan_sci',action==='fields');
                            if(picked){if(picked.type==='bidang_pr'){s.fieldId=picked.id;s.fieldManual=true;}else{s.mode='manual';s[picked.type==='penandatangan_sci'?'signerId':'titleId']=picked.id;}}
                        }
                    }catch(error){await Swal.fire({icon:'warning',text:error.message,...theme()});}
                    if(current===serial)window.openSpPrintPreview(rawUrl,s);
                }),
                preConfirm:async()=>{
                    capture();const params=new URLSearchParams({signing_mode:s.mode,field_id:s.fieldId||'',field_reason:s.fieldReason});
                    if(!s.fieldId){Swal.showValidationMessage('Pilih bidang pemilik PR terlebih dahulu.');return false;}
                    if(s.fieldManual&&!canLearn(data)&&s.fieldReason.trim().length<10){Swal.showValidationMessage('Tuliskan alasan pilihan bidang minimal 10 karakter.');return false;}
                    params.set('print_basis',data.fingerprint);
                    if(canLearn(data))params.set('learn_portfolio','1');
                    if(s.mode==='manual'){
                        if(!s.signerId||!s.titleId||s.reason.trim().length<10){Swal.showValidationMessage('Pilih nama, jabatan, dan alasan manual minimal 10 karakter.');return false;}
                        params.set('signer_id',s.signerId);params.set('title_id',s.titleId);params.set('manual_reason',s.reason.trim());
                    }
                    try{
                        confirmRequest=new AbortController();const latest=data.can_manage?await confirmSelection(match[1],confirmRequest.signal,params):await context(match[1],confirmRequest.signal,params.toString());
                        if(current!==serial||!Swal.isVisible())return false;
                        if(latest.fingerprint!==data.fingerprint&&!latest.mapping_saved){data=latest;Swal.update({html:render(data,s),showConfirmButton:ready()});Swal.showValidationMessage('Data berubah. Periksa rekomendasi terbaru sebelum melanjutkan.');return false;}
                        url.search='';for(const [key,value]of Object.entries(latest.selection))url.searchParams.set(key,value);return url.href;
                    }catch(error){
                        if(error.name==='AbortError')return false;
                        if(error.errors?.print_basis){
                            try{
                                data=await context(match[1],confirmRequest.signal);
                                if(current!==serial||!Swal.isVisible())return false;
                                Swal.update({html:render(data,s),showConfirmButton:ready()});
                            }catch(refreshError){if(refreshError.name==='AbortError')return false;}
                        }
                        if(current===serial&&Swal.isVisible())Swal.showValidationMessage(error.message);return false;
                    }
                }});
            if(current===serial&&result.isConfirmed&&result.value)window.location.assign(result.value);
        }catch(error){if(error.name!=='AbortError'&&current===serial)Swal.fire({icon:'warning',title:'Cetak belum dapat dilanjutkan',text:error.message,...theme()});}
    };
})();
