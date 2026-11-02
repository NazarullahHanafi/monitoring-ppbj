(function(){
    'use strict';
    const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    async function json(url,options={}){
        const response=await fetch(url,{cache:'no-store',...options,headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest',...options.headers}});
        const data=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(Object.values(data.errors||{}).flat().join(' ')||data.message||'Pemetaan belum dapat diproses.');return data;
    }
    window.SPPortfolioMaps={open:async function(context){
        const s={rows:[],fields:[],edit:null,draft:null,page:1,last:1,q:'',message:'Memuat pemetaan…',busy:false};let closed=false,nonce=0;
        const draw=()=>{if(!closed)Swal.update({html:render(s,context)});};
        async function load(){const n=++nonce;try{const data=await json('/sp/portfolio-mappings?'+new URLSearchParams({q:s.q,page:s.page}));if(closed||n!==nonce)return;s.rows=data.rows;s.last=data.last_page;s.message='';}catch(error){s.message=error.message;}draw();}
        await Swal.fire({title:'Pemetaan portofolio ke bidang PR',width:760,customClass:{popup:'spph-signing-popup'},background:document.documentElement.classList.contains('dark')?'#162034':'#fff',color:document.documentElement.classList.contains('dark')?'#edf3ff':'#18253d',html:render(s,context),confirmButtonText:'Kembali ke cetak',confirmButtonColor:'#3157d9',focusConfirm:false,allowOutsideClick:()=>!s.busy,allowEscapeKey:()=>!s.busy,preConfirm:()=>!s.busy,willClose:()=>{closed=true;nonce++;},
            didOpen:async()=>{
                const root=Swal.getHtmlContainer();
                root.addEventListener('click',event=>{
                    const b=event.target.closest('[data-sp-map]');if(!b||s.busy)return;
                    if(b.dataset.spMap==='edit'){s.edit=s.rows.find(r=>Number(r.id)===Number(b.dataset.id));s.draft=null;draw();}
                    if(b.dataset.spMap==='cancel'){s.edit=null;s.draft=null;draw();}
                    if(['prev','next'].includes(b.dataset.spMap)){s.page+=b.dataset.spMap==='next'?1:-1;load();}
                });
                root.addEventListener('submit',async event=>{
                    if(!['spMapSearch','spMapForm'].includes(event.target.id))return;event.preventDefault();if(s.busy)return;
                    if(event.target.id==='spMapSearch'){s.q=document.getElementById('spMapQuery').value;s.page=1;await load();return;}
                    if(!context.can_manage)return;
                    const row=s.edit,payload={portfolio:document.getElementById('spMapPortfolio').value,field_id:document.getElementById('spMapField').value,is_active:document.getElementById('spMapActive').checked,...(row?{version:row.version}:{})};
                    s.draft=payload;s.busy=true;s.message='Menyimpan…';draw();
                    try{const result=await json('/sp/portfolio-mappings'+(row?'/'+row.id:''),{method:row?'PUT':'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content},body:JSON.stringify(payload)});s.edit=null;s.draft=null;await load();s.message=result.message;}
                    catch(error){s.message=error.message;}finally{s.busy=false;draw();}
                });
                try{const choices=await window.SPPHPrintMasters.choices(null,null,null,true);if(closed)return;s.fields=choices.fields;await load();}catch(error){s.message=error.message;draw();}
            }});
    }};
    function render(s,context){
        const draft=s.draft||s.edit;
        return `<div class="spph-signing-content"><span class="sg-eyebrow">PENGATURAN BERSAMA · DIAUDIT</span><p>Tentukan bidang dari portofolio yang benar. Setelah disimpan, cetak SP berikutnya otomatis memakai bidang ini. Riwayat lama tidak diubah. Nonaktifkan pemetaan yang tidak berlaku; tidak ada penghapusan permanen di sini.</p>
        <form id="spMapSearch" class="sg-inline-actions"><input id="spMapQuery" maxlength="150" value="${escape(s.q)}" placeholder="Cari portofolio"><button type="submit" class="sg-soft-button">Cari</button></form>
        ${context.can_manage?`<form id="spMapForm" class="sg-master-form"><label>${s.edit?'Edit':'Tambah'} portofolio<input id="spMapPortfolio" list="spMapPortfolios" required maxlength="150" value="${escape(draft?.portfolio||context.portfolios[0]||'')}" placeholder="Gunakan nama portofolio persis seperti data PR"></label><datalist id="spMapPortfolios">${context.portfolios.map(p=>`<option value="${escape(p)}">`).join('')}</datalist><label>Bidang pemilik PR<select id="spMapField" required><option value="">Pilih bidang…</option>${s.fields.map(f=>`<option value="${Number(f.id)}" ${Number(f.id)===Number(draft?.field_id)?'selected':''}>${escape(f.nama)}</option>`).join('')}</select></label><label class="sg-check"><input type="checkbox" id="spMapActive" ${!draft||draft.is_active?'checked':''}>Pemetaan aktif</label><div class="sg-inline-actions"><button type="submit" class="sg-primary" ${s.busy?'disabled':''}>Simpan pemetaan</button>${s.edit?'<button type="button" class="sg-soft-button" data-sp-map="cancel">Batal edit</button>':''}</div></form>`:'<p>Akses baca-saja. Hubungi petugas Umum untuk mengubah pemetaan.</p>'}
        <p class="sg-status" role="status">${escape(s.message)}</p>${s.rows.map(r=>`<article class="sg-master-row"><strong>${escape(r.portfolio)}</strong><p>${escape(r.field_name||'Master bidang tidak tersedia')} · ${r.is_active?'Aktif':'Nonaktif'}</p>${context.can_manage?`<button type="button" class="sg-soft-button" data-sp-map="edit" data-id="${Number(r.id)}">Edit pemetaan</button>`:''}</article>`).join('')||'<p>Belum ada pemetaan yang cocok. Tambahkan setelah bidang dikonfirmasi.</p>'}<div class="sg-pagination"><button type="button" class="sg-soft-button" data-sp-map="prev" ${s.page<=1?'disabled':''}>Sebelumnya</button><span>${s.page} / ${s.last}</span><button type="button" class="sg-soft-button" data-sp-map="next" ${s.page>=s.last?'disabled':''}>Berikutnya</button></div></div>`;
    }
})();
