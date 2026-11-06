(() => {
    const channel=new URL(location.href).searchParams.get('office_frame')||'';
    const send = (type, value) => { if(window.parent !== window) window.parent.postMessage({type, value,channel}, window.location.origin); };
    const root=document.documentElement,themeButton=document.getElementById('hologramThemeToggle');
    function theme(dark){if(!root)return;root.classList.toggle('dark',dark);root.dataset.theme=dark?'dark':'light';root.style.colorScheme=dark?'dark':'light';if(themeButton){themeButton.textContent=dark?'☀ Mode terang':'☾ Mode gelap';themeButton.setAttribute('aria-pressed',String(dark));}}
    theme(root?.classList.contains('dark')||false);
    themeButton?.addEventListener('click',()=>{const dark=!root.classList.contains('dark');try{if(parent!==window&&typeof parent.setThemeMode==='function')parent.setThemeMode(dark?'dark':'light');else localStorage.setItem('theme',dark?'dark':'light');}catch{}theme(dark);});
    window.addEventListener?.('storage',event=>{if(event.key==='theme')theme(event.newValue==='dark');});
    const form = document.getElementById('torprForm');
    const robot=document.querySelector('.hf-robot'),formHeader=document.getElementById('formTitle')?.parentElement;
    if(robot&&formHeader){const copy=robot.cloneNode(true);copy.classList.add('hf-form-robot');formHeader.prepend(copy);}
    let dirty = false, activityAt = 0;
    const changed = () => { if (!dirty) { dirty = true; send('office-hologram-dirty', true); } };
    form?.addEventListener('input', changed); form?.addEventListener('change', changed);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !event.defaultPrevented && !document.querySelector('.swal2-container')) { event.preventDefault(); send('office-hologram-escape'); } });
    for (const event of ['pointerdown','keydown','input','scroll']) document.addEventListener(event, () => {
        if (Date.now() - activityAt > 30000) { activityAt = Date.now(); send('office-hologram-activity'); }
    }, {passive:true});
    // Keep GET navigation in this workspace. No document content is messaged.
    for(const target of document.querySelectorAll('form[method="GET"],form[method="get"]')){target.querySelector('input[name="_token"]')?.remove();const field=document.createElement('input');field.type='hidden';field.name='office_frame';field.value=channel;target.append(field);}
    document.addEventListener('submit', event => {
        const target = event.target;
        if (target.method?.toLowerCase() === 'get') target.querySelector('input[name="_token"]')?.remove();
    }, true);
    document.addEventListener('click', event => {
        const link = event.target.closest?.('a[href]'); if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
        const url = new URL(link.href, location.origin);
        if (url.origin === location.origin && ['/torpr','/tracking-pr'].includes(url.pathname)) {
            event.preventDefault(); url.pathname = '/virtual-office/hologram/' + (url.pathname === '/torpr' ? 'torpr' : 'tracking');url.searchParams.set('office_frame',channel); location.assign(url.href);
        }else if(url.origin===location.origin&&url.pathname.startsWith('/virtual-office/hologram/')){
            event.preventDefault();url.searchParams.set('office_frame',channel);location.assign(url.href);
        }
    });
    if (document.body.dataset.readonly === '1') {
        document.querySelectorAll('[onclick="openCreateForm()"],[onclick="openImportModal()"],#torprForm button[type="submit"]').forEach(button => { button.disabled = true; });
    } else if (document.body.dataset.create === '1' && typeof window.openCreateForm === 'function') {
        window.openCreateForm();
        // A successful save reloads to the list, rather than opening an empty form.
        const url = new URL(location.href); url.pathname = '/virtual-office/hologram/torpr'; history.replaceState(null, '', url);
        form?.querySelector('input:not([type="hidden"]),textarea,select')?.focus();
    }
    send('office-hologram-ready');
})();
