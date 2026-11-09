export function mountOfficeHologram({document:doc,window:win,config,getScene,onOpen=()=>{},onWork=()=>{},onActivity=()=>{}}) {
    const $=id=>doc.getElementById(id),menu=$('voHologram'),work=$('voHologramWork'),frame=$('voHologramFrame');
    if(!menu||!work||!frame)return{open(){},close:()=>false,sync(){},escape:()=>false};
    const allowed=['create','torpr','tracking','ppbj-create','ppbj','approval','sp','spph'];
    const tools=(config.hologramTools||[]).filter(tool=>{
        try{const url=new URL(tool.url,win.location.origin);return url.origin===win.location.origin&&allowed.includes(tool.id)&&url.pathname==='/virtual-office/hologram/'+tool.id&&!url.hash&&!url.search;}catch{return false;}
    });
    let opened=false,dirty=false,current=null,returnFocus=null,deadline=null,generation=0,channel='';
    const navigation=new Map(),status=message=>{$('voHologramStatus').textContent=message;};
    function discard(){return !dirty||win.confirm('Perubahan dokumen belum disimpan. Tinggalkan perubahan ini?');}
    function sync(){getScene()?.showHologram?.(opened?Number(config.myId):null);}
    function open(){if(!tools.length)return;if(opened&&!work.hidden)return;returnFocus=doc.activeElement;onOpen();getScene()?.setAiming?.(false);opened=true;menu.hidden=false;$('voHologramOpen')?.setAttribute('aria-expanded','true');sync();$('voHologramClose').focus({preventScroll:true});}
    function resetFrame(){if(deadline!==null)win.clearTimeout(deadline);deadline=null;frame.removeAttribute('src');frame.hidden=true;dirty=false;current=null;work.hidden=true;}
    function close(){if(!opened&&work.hidden)return false;if(!discard())return true;resetFrame();opened=false;menu.hidden=true;sync();$('voHologramOpen')?.setAttribute('aria-expanded','false');returnFocus?.focus?.({preventScroll:true});getScene()?.focusPilot?.();return true;}
    function back(){if(!discard())return;resetFrame();menu.hidden=false;$('voHologramClose').focus({preventScroll:true});}
    function describe(tool){current=tool;$('voHologramTitle').textContent=tool.title;let page;
        try{page=new URL(tool.pageUrl||tool.url,win.location.origin);}catch{page=new URL(tool.url,win.location.origin);}
        $('voHologramExternal').href=page.origin===win.location.origin?page.pathname+page.search:tool.url;
        for(const[id,button]of navigation)button.setAttribute('aria-current',id===tool.id?'page':'false');
    }
    function launch(tool){if(!discard())return;resetFrame();describe(tool);menu.hidden=true;work.hidden=false;getScene()?.setAiming?.(false);onWork();
        $('voHologramLoading').hidden=false;status('Menyiapkan dokumen…');frame.title=tool.title;frame.hidden=false;channel=String(++generation);const url=new URL(tool.url,win.location.origin);url.searchParams.set('office_frame',channel);frame.src=url.pathname+url.search;
        deadline=win.setTimeout(()=>{deadline=null;status('Koneksi belum merespons. Coba muat ulang atau buka halaman penuh.');$('voHologramLoading').hidden=true;},15000);$('voHologramBack').focus({preventScroll:true});
    }
    for(const tool of tools){
        const button=doc.createElement('button');button.type='button';button.className='vo-holo-tool';button.setAttribute('data-primary',String(['create','ppbj-create'].includes(tool.id)));
        const icon=doc.createElement('span'),content=doc.createElement('span'),title=doc.createElement('b'),note=doc.createElement('small'),arrow=doc.createElement('i');
        icon.textContent=({create:'+',torpr:'▤','ppbj-create':'+',ppbj:'▤',approval:'✓',sp:'↗',spph:'≡',tracking:'⌁'})[tool.id];icon.setAttribute('aria-hidden','true');title.textContent=tool.title;note.textContent=tool.description;arrow.textContent='↗';content.append(title,note);button.append(icon,content,arrow);button.addEventListener('click',()=>launch(tool));$('voHologramTools').append(button);
        if($('voHologramWorkTools')){const item=doc.createElement('button');item.type='button';item.textContent=tool.title;item.addEventListener('click',()=>{if(current?.id!==tool.id)launch(tool);});navigation.set(tool.id,item);$('voHologramWorkTools').append(item);}
    }
    $('voHologramOpen')?.addEventListener('click',()=>{if(opened)close();else open();});$('voHologramClose').addEventListener('click',close);$('voHologramWorkClose').addEventListener('click',close);$('voHologramBack').addEventListener('click',back);
    $('voHologramReload').addEventListener('click',()=>{if(current)launch(current);});
    win.addEventListener('message',event=>{
        if(event.origin!==win.location.origin||event.source!==frame.contentWindow||work.hidden||event.data?.channel!==channel)return;
        if(event.data?.type==='office-hologram-dirty')dirty=event.data.value===true;
        if(event.data?.type==='office-hologram-ready'){if(deadline!==null)win.clearTimeout(deadline);deadline=null;dirty=false;const tool=tools.find(t=>t.id===event.data.value);if(tool)describe(tool);$('voHologramLoading').hidden=true;status('Dokumen terhubung · ruang kerja pribadi');}
        if(event.data?.type==='office-hologram-notice'&&typeof event.data.value==='string')status(event.data.value.slice(0,180));
        if(event.data?.type==='office-hologram-escape')close();
        if(event.data?.type==='office-hologram-activity')onActivity();
    });
    frame.addEventListener('load',()=>{if(work.hidden)return;try{if(frame.contentWindow.location.pathname==='/login'){if(deadline!==null)win.clearTimeout(deadline);deadline=null;$('voHologramLoading').hidden=true;status('Sesi berakhir. Buka halaman penuh untuk login kembali.');}}catch{status('Halaman tidak tersedia dalam ruang kerja ini.');}});
    work.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}if(event.key==='Tab'){const first=$('voHologramBack'),last=frame;if(event.shiftKey&&doc.activeElement===first){event.preventDefault();last.focus();}}});
    doc.addEventListener('focusin',event=>{if(!work.hidden&&!work.contains(event.target))$('voHologramBack').focus({preventScroll:true});});
    win.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
    return{open,close,sync,escape:close,anchor(point){if(!opened||!work.hidden)return;const box=menu.parentElement.getBoundingClientRect();menu.style.maxHeight=Math.max(100,box.height-24)+'px';const w=menu.offsetWidth||330,h=Math.min(menu.offsetHeight||220,box.height-24);
        menu.style.left=Math.max(w/2+12,Math.min(box.width-w/2-12,point?.visible?point.x:box.width/2))+'px';menu.style.top=Math.max(h+12,Math.min(box.height-12,point?.visible?point.y:box.height*.65))+'px';
    }};
}
