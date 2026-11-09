(() => {
    const $=id=>document.getElementById(id),form=$('practiceForm'),kind=document.body.dataset.kind,channel=new URL(location.href).searchParams.get('office_frame')||'';
    const send=(type,value)=>{if(parent!==window)parent.postMessage({type,value,channel},location.origin);};
    let pending=null,token=null;
    try{document.documentElement.classList.toggle('dark',parent!==window&&parent.document.documentElement.classList.contains('dark'));}catch{}
    const put=(name,value)=>{if(form.elements[name])form.elements[name].value=value;};
    $('practiceExample').addEventListener('click',()=>{
        const now=new Date(),local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString();
        if(kind==='ppbj'){put('ppbj_no','LATIHAN/PPBJ/001');put('tgl_ppbj',local.slice(0,10));put('uraian','Pengadaan alat kerja untuk tim');put('total_sebelum_ppn','2500000');}
        else if(kind==='pr'){put('nomor_pr','LATIHAN/PR/001');put('tanggal_pr',local.slice(0,16));put('tujuan_pengadaan','Perlengkapan inspeksi operasional');put('jumlah_pr','2500000');}
        else put('number','LATIHAN/PR/001');
        send('office-hologram-dirty',true);form.querySelector('input:not([type="hidden"])')?.focus();
    });
    form.addEventListener('input',()=>send('office-hologram-dirty',true));
    form.addEventListener('submit',async event=>{
        event.preventDefault();if(pending||!form.reportValidity())return;
        const endpoint=new URL(document.body.dataset.endpoint,location.origin);
        if(endpoint.origin!==location.origin||endpoint.pathname!=='/virtual-office/tutorial/document'){$('practiceError').textContent='Alamat latihan tidak valid.';return;}
        const own=new AbortController();pending=own;$('practiceSubmit').disabled=true;$('practiceError').textContent='';const deadline=setTimeout(()=>own.abort(),12000);
        try{
            const response=await fetch(endpoint.pathname,{method:'POST',credentials:'same-origin',signal:own.signal,headers:{Accept:'application/json','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content},body:new FormData(form)});
            const data=await response.json();if(!response.ok)throw new Error(Object.values(data.errors||{})[0]?.[0]||data.message||'Latihan belum berhasil divalidasi.');
            if(data.simulated!==true||typeof data.token!=='string')throw new Error('Hasil latihan tidak valid.');token=data.token;
            $('practiceSummary').replaceChildren();const labels={ppbj_no:'No. PPBJ',tgl_ppbj:'Tanggal',uraian:'Uraian',total_sebelum_ppn:'Nilai sebelum PPN',nomor_pr:'Nomor PR',tanggal_pr:'Tanggal PR',tujuan_pengadaan:'Tujuan pengadaan',jumlah_pr:'Nilai PR',number:'Nomor contoh'};
            for(const[key,label]of Object.entries(labels)){if(data.data?.[key]===undefined)continue;const term=document.createElement('dt'),detail=document.createElement('dd');term.textContent=label;detail.textContent=String(data.data[key]);$('practiceSummary').append(term,detail);}
            send('office-hologram-dirty',false);$('practiceResult').hidden=false;$('practiceResult').focus();$('practiceResult').scrollIntoView?.({block:'nearest',behavior:'smooth'});
        }catch(error){$('practiceError').textContent=error.name==='AbortError'?'Koneksi terlalu lama. Coba validasi lagi.':error.message;}
        finally{clearTimeout(deadline);pending=null;$('practiceSubmit').disabled=false;}
    });
    $('practiceReturn').addEventListener('click',()=>{if(token)send('office-tutorial-document-complete',token);});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();send('office-hologram-escape');}});
    window.addEventListener('pagehide',()=>pending?.abort());
    send('office-hologram-ready',kind==='pr'?'create':kind==='ppbj'?'ppbj-create':'tracking');
    form.querySelector('input:not([type="hidden"])')?.focus();
})();
