(function(){
    'use strict';
    const types={penandatangan_sci:'Penandatangan',jabatan_sci:'Jabatan'};
    const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    async function json(url,options={}){
        const response=await fetch(url,{cache:'no-store',...options,headers:{Accept:'application/json','X-Requested-With':'XMLHttpRequest',...options.headers}});
        const data=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(Object.values(data.errors||{}).flat().join(' ')||data.message||'Master belum dapat diproses. Coba kembali.');
        return data;
    }
    const list=(type,query={})=>json('/spph/print-masters?'+new URLSearchParams({type,...query}));
    async function choices(signerId,titleId,fieldId,withFields=false){
        const result=await Promise.all([list('penandatangan_sci',{active_only:1,per_page:50,...(signerId?{include_id:signerId}:{})}),list('jabatan_sci',{active_only:1,per_page:50,...(titleId?{include_id:titleId}:{})}),...(withFields?[list('bidang_pr',{active_only:1,per_page:50,...(fieldId?{include_id:fieldId}:{})})]:[])]);
        return {names:result[0].options,titles:result[1].options,...(withFields?{fields:result[2].options}:{})};
    }
    async function open(canManage,initialType='penandatangan_sci',withFields=false){
        const state={type:initialType,types:{...types,...(withFields?{bidang_pr:'Bidang pemilik PR'}:{})},q:'',page:1,lastPage:1,rows:[],edit:null,busy:false,message:'Memuat master…',deactivate:null};
        let picked=null,closed=false,nonce=0;
        const alive=()=>!closed&&Swal.isVisible();
        const draw=()=>{if(alive())Swal.update({html:render(state,canManage)});};
        async function load(){
            const generation=++nonce;state.message='Memuat master…';draw();
            try{const data=await list(state.type,{q:state.q,page:state.page,per_page:12,active_only:canManage?0:1});if(!alive()||generation!==nonce)return;state.rows=data.options;state.lastPage=data.last_page;state.message='';}
            catch(error){state.message=error.message;}draw();
        }
        async function save(row,payload){
            if(state.busy||!canManage)return;
            state.busy=true;state.message='Menyimpan master…';draw();const cancel=Swal.getCancelButton?.();if(cancel)cancel.disabled=true;
            try{
                const result=await json('/sp-master-options'+(row?'/'+row.id:''),{method:row?'PUT':'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content},body:JSON.stringify({...payload,...(row?{version:row.version}:{})})});
                if(!alive())return;state.edit=null;state.deactivate=null;await load();state.message=result.message;
            }catch(error){state.message=error.message;}finally{state.busy=false;if(cancel)cancel.disabled=false;draw();}
        }
        const result=await Swal.fire({title:'Master penandatangan & jabatan',html:render(state,canManage),width:760,customClass:{popup:'spph-signing-popup'},
            background:document.documentElement.classList.contains('dark')?'#162034':'#fff',color:document.documentElement.classList.contains('dark')?'#edf3ff':'#18253d',
            showCancelButton:false,confirmButtonText:'Kembali ke cetak',confirmButtonColor:'#3157d9',focusConfirm:false,
            allowOutsideClick:()=>!state.busy,allowEscapeKey:()=>!state.busy,willClose:()=>{closed=true;nonce++;},preConfirm:()=>state.busy?false:true,
            didOpen:()=>{
                const root=Swal.getHtmlContainer();
                root.addEventListener('click',async event=>{
                    const button=event.target.closest('[data-sgm]');if(!button||state.busy)return;
                    const action=button.dataset.sgm,row=state.rows.find(item=>Number(item.id)===Number(button.dataset.id));
                    if(action==='prev'||action==='next'){state.page+=action==='next'?1:-1;await load();}
                    if(action==='cancel-edit'){state.edit=null;state.message='';draw();}
                    if(row&&action==='use'){picked=row;Swal.clickConfirm();}
                    if(row&&action==='edit'&&canManage){state.edit=row;state.message='';draw();document.getElementById('sgMasterName')?.focus();}
                    if(row&&action==='toggle'&&canManage){if(row.is_active&&state.deactivate!==row.id){state.deactivate=row.id;state.message='Klik Ya, nonaktifkan untuk mengeluarkan pilihan dari dropdown. Dokumen lama tidak dihapus.';draw();}else await save(row,{type:row.type,nama:row.nama,is_active:!row.is_active});}
                });
                root.addEventListener('change',async event=>{if(event.target.id==='sgMasterType'&&!state.busy){state.type=event.target.value;state.page=1;state.q='';state.edit=null;state.deactivate=null;await load();}});
                root.addEventListener('submit',async event=>{
                    if(!['sgMasterSearch','sgMasterForm'].includes(event.target.id))return;event.preventDefault();if(state.busy)return;
                    if(event.target.id==='sgMasterSearch'){state.q=document.getElementById('sgMasterQuery').value;state.page=1;await load();}
                    else await save(state.edit,{type:state.type,nama:document.getElementById('sgMasterName').value,is_active:document.getElementById('sgMasterActive').checked});
                });
                load();
            }});
        return result.isConfirmed?picked:null;
    }
    function render(s,canManage){
        return `<div class="spph-signing-content"><div class="sg-manager-heading"><span class="sg-eyebrow">MASTER BERSAMA</span><p>Terhubung dengan Master Kontrak SP. Tambah/edit berlaku untuk dokumen berikutnya; nonaktifkan untuk mengeluarkan pilihan lama tanpa menghapusnya permanen.</p></div>
            <form id="sgMasterSearch" class="sg-search"><select id="sgMasterType" aria-label="Jenis master">${Object.entries(s.types).map(([key,label])=>`<option value="${key}" ${key===s.type?'selected':''}>${label}</option>`).join('')}</select><input id="sgMasterQuery" maxlength="100" value="${escape(s.q)}" placeholder="Cari nama atau jabatan…" aria-label="Cari master"><button type="submit" class="sg-soft-button">Cari</button></form>
            ${canManage?`<form id="sgMasterForm" class="sg-master-form"><label for="sgMasterName">${s.edit?'Edit':'Tambah'} ${s.types[s.type].toLowerCase()}<input id="sgMasterName" maxlength="255" required value="${escape(s.edit?.nama||'')}" placeholder="Masukkan nama lengkap atau jabatan"></label><label class="sg-check"><input type="checkbox" id="sgMasterActive" ${!s.edit||s.edit.is_active?'checked':''}> Aktif dan dapat dipilih</label><div class="sg-inline-actions"><button type="submit" class="sg-primary" ${s.busy?'disabled':''}>${s.busy?'Menyimpan…':s.edit?'Simpan perubahan':'Tambah ke master'}</button>${s.edit?'<button type="button" class="sg-soft-button" data-sgm="cancel-edit">Batal edit</button>':''}</div><p>Mengubah atau menonaktifkan nama rekomendasi dapat membuat mode otomatis tidak tersedia. Dokumen yang sudah diunduh tidak berubah.</p></form>`:'<p>Akses baca-saja: pilih master aktif. Tambah/edit memerlukan akses pengelolaan master.</p>'}
            <p class="sg-status" role="status">${escape(s.message)}</p><div class="sg-master-list">${s.rows.map(row=>`<article class="sg-master-row"><div><strong>${escape(row.nama)}</strong><span class="sg-active" data-active="${Boolean(row.is_active)}">${row.is_active?'Aktif':'Nonaktif'}</span></div><div class="sg-inline-actions">${row.is_active?`<button type="button" class="sg-soft-button" data-sgm="use" data-id="${Number(row.id)}">Gunakan</button>`:''}${canManage?`<button type="button" class="sg-soft-button" data-sgm="edit" data-id="${Number(row.id)}">Edit</button><button type="button" class="sg-soft-button" data-sgm="toggle" data-id="${Number(row.id)}">${!row.is_active?'Aktifkan':s.deactivate===row.id?'Ya, nonaktifkan':'Nonaktifkan'}</button>`:''}</div></article>`).join('')||'<p>Tidak ada master yang cocok. Cari nama lain atau tambahkan data baru.</p>'}</div><div class="sg-pagination"><button type="button" class="sg-soft-button" data-sgm="prev" ${s.page<=1?'disabled':''}>← Sebelumnya</button><span>Halaman ${s.page} / ${s.lastPage}</span><button type="button" class="sg-soft-button" data-sgm="next" ${s.page>=s.lastPage?'disabled':''}>Berikutnya →</button></div></div>`;
    }
    window.SPPHPrintMasters={choices,open};
})();
