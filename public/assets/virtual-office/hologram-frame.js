(() => {
    const channel=new URL(location.href).searchParams.get('office_frame')||'';
    const send=(type,value)=>{if(window.parent!==window)window.parent.postMessage({type,value,channel},window.location.origin);};
    const root=document.documentElement,themeButton=document.getElementById('hologramThemeToggle'),tool=document.body.dataset.tool||'create';
    function theme(dark){if(!root)return;root.classList.toggle('dark',dark);root.dataset.theme=dark?'dark':'light';root.style.colorScheme=dark?'dark':'light';if(themeButton){themeButton.textContent=dark?'☀ Terang':'☾ Gelap';themeButton.setAttribute('aria-pressed',String(dark));}}
    theme(root?.classList.contains('dark')||false);
    themeButton?.addEventListener('click',()=>{const dark=!root.classList.contains('dark');try{if(parent!==window&&typeof parent.setThemeMode==='function')parent.setThemeMode(dark?'dark':'light');else localStorage.setItem('theme',dark?'dark':'light');}catch{}theme(dark);});
    window.addEventListener?.('storage',event=>{if(event.key==='theme')theme(event.newValue==='dark');});
    let dirty=false,activityAt=0;
    const changed=()=>{if(!dirty){dirty=true;send('office-hologram-dirty',true);}};
    const writeIds=['torprForm','ppbjForm','addFormSp','editFormSp','addForm','editForm'];
    for(const id of writeIds){const form=document.getElementById(id);form?.addEventListener('input',changed);form?.addEventListener('change',changed);
        if(form){const field=document.createElement('input');field.type='hidden';field.name='office_frame';field.value=channel;form.append(field);}
    }
    function leave(){if(!dirty)return true;if(!window.confirm('Perubahan dokumen belum disimpan. Tinggalkan perubahan ini?'))return false;dirty=false;send('office-hologram-dirty',false);return true;}
    const pages={'/torpr':'torpr','/ppbj':'ppbj','/approval/pr-receipts':'approval','/sp':'sp','/spph':'spph','/tracking-pr':'tracking'};
    const ids=['create','torpr','tracking','ppbj-create','ppbj','approval','sp','spph'];
    function workspaceUrl(input){try{const url=new URL(input||location.href,location.origin);if(url.origin!==location.origin)return null;const id=pages[url.pathname]||ids.find(id=>url.pathname==='/virtual-office/hologram/'+id);if(!id)return null;url.pathname='/virtual-office/hologram/'+id;url.searchParams.set('office_frame',channel);return url;}catch{return null;}}
    // Native GET searches, filters and pagination stay in the current document shell.
    for(const form of document.querySelectorAll('form[method="GET"],form[method="get"]')){
        if(writeIds.includes(form.id))continue;form.querySelector('input[name="_token"]')?.remove();const url=workspaceUrl(form.getAttribute?.('action')||location.href);if(url)form.action=url.pathname;
        let field=form.querySelector('input[name="office_frame"]');if(!field){field=document.createElement('input');field.type='hidden';field.name='office_frame';form.append(field);}field.value=channel;
    }
    document.addEventListener('submit',event=>{const target=event.target;if(target.method?.toLowerCase()==='get'&&!writeIds.includes(target.id)){target.querySelector('input[name="_token"]')?.remove();if(!leave()){event.preventDefault();event.stopImmediatePropagation?.();}}},true);
    document.addEventListener('click',event=>{
        if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button>0)return;
        const link=event.target.closest?.('a[href]');if(!link||link.target==='_blank'||link.hasAttribute('download'))return;
        const url=workspaceUrl(link.href);if(url){event.preventDefault();if(leave())location.assign(url.href);}
    });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!event.defaultPrevented&&!document.querySelector('.swal2-container')){event.preventDefault();send('office-hologram-escape');}});
    for(const event of['pointerdown','keydown','input','scroll'])document.addEventListener(event,()=>{if(Date.now()-activityAt>30000){activityAt=Date.now();send('office-hologram-activity');}},{passive:true});
    if(document.body.dataset.readonly==='1'){
        document.querySelectorAll('[onclick="openCreateForm()"],[onclick="openImportModal()"],[onclick^="openAdd"],[onclick^="openEdit"],[onclick*="approve"],[onclick*="Approve"],[onclick*="reject"],[onclick*="Reject"],[onclick*="delete"],[onclick*="Delete"],#torprForm button[type="submit"],#ppbjForm button[type="submit"],form[method="POST"] button[type="submit"],form[method="post"] button[type="submit"]').forEach(button=>{button.disabled=true;});
        document.addEventListener('submit',event=>{if(writeIds.includes(event.target.id)||event.target.method?.toLowerCase()==='post'){event.preventDefault();event.stopImmediatePropagation?.();send('office-hologram-notice','Mode baca · perubahan dokumen tidak diizinkan.');}},true);
    }else if(document.body.dataset.create==='1'){
        // Both editors retain their own validation, PR-approval checks and save routes.
        if(typeof window.openCreateForm==='function'){
            const url=new URL(location.href);url.pathname='/virtual-office/hologram/'+(tool==='ppbj-create'?'ppbj':'torpr');history.replaceState(null,'',url);
            window.openCreateForm();const form=document.getElementById(tool==='ppbj-create'?'ppbjForm':'torprForm');form?.querySelector('input:not([type="hidden"]),textarea,select')?.focus();
        }else send('office-hologram-notice','Editor belum siap. Muat ulang dokumen atau buka halaman penuh.');
    }
    send('office-hologram-ready',tool);
    if(document.body.dataset.dirty==='1')changed();
})();
