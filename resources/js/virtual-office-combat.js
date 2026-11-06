import catalog from '../data/virtual-office-combat.json' with {type:'json'};

export function mountOfficeCombat({document:doc,window:win,config,visible,getScene,onStatus=()=>{}}){
    const $=id=>doc.getElementById(id),panel=$('voArmoryPanel'),hud=$('voCombatHud'),workspace=$('voWorkspace');
    if(!panel)return{open(){},pose(){},self(){},close(){},fire(){},aimState(){}};
    let account=null,self={},busy=false,readyAt=0,closed=false,controller=null;
    const pending=new Map(),set=(id,value)=>{if($(id)&&$(id).textContent!==String(value))$(id).textContent=String(value);};
    function status(message){set('voCombatStatus',message);set('voArmoryStatus',message);onStatus(message);}
    function showHud(show,expand=false){if(hud)hud.hidden=!show;$('voCombatToggle')?.setAttribute('aria-expanded',String(show));if(expand)fold(false);}
    function fold(collapsed){if($('voCombatDetails'))$('voCombatDetails').hidden=collapsed;$('voCombatFold')?.setAttribute('aria-expanded',String(!collapsed));}
    function aimState(value){workspace?.classList.toggle('vo-aiming',Boolean(value));workspace?.classList.toggle('vo-sniper',value&&self.weapon==='sniper');$('voCombatAim')?.setAttribute('aria-pressed',String(Boolean(value)));set('voCombatAim',value?'B · Selesai bidik':'B · Bidik');}
    function aim(){const active=getScene()?.setAiming?.(!getScene()?.isAiming?.());aimState(active);if(!active&&!self.weapon&&!getScene()?.activeTransformation?.())status('Pegang senjata atau aktifkan mode Susanoo/Kurama dahulu.');}
    function render(){
        if(!account)return;set('voArmoryBalance','$'+account.balance+' virtual');const list=$('voArmoryItems');list.replaceChildren();
        for(const[kind,spec]of Object.entries(account.weapons)){
            const owned=account.owned.includes(kind),card=doc.createElement('article'),name=doc.createElement('h3'),note=doc.createElement('p'),button=doc.createElement('button');
            name.textContent=spec.name;note.textContent=`$${spec.price} · damage ${spec.damage} · ${spec.range} m`;button.type='button';button.textContent=owned?(self.weapon===kind?'Sedang dipegang':'Pegang senjata'):'Beli & langsung pegang';button.disabled=busy||self.weapon===kind;
            button.addEventListener('click',()=>mutate(owned?'equip':'buy',owned?{weapon:kind}:{weapon:kind,request_id:pending.get(kind)||globalThis.crypto.randomUUID()}));card.append(name,note,button);list.append(card);
        }
        if($('voCombatHolster'))$('voCombatHolster').disabled=busy||!self.weapon;
    }
    async function request(path,body){
        if(busy)return null;busy=true;render();pose();const own=new AbortController();controller=own;const deadline=win.setTimeout(()=>own.abort(),10000);
        try{
            const response=await fetch('/virtual-office/combat'+path,{method:body?'POST':'GET',signal:own.signal,credentials:'same-origin',cache:'no-store',headers:{Accept:'application/json',...(body?{'Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content||''}:{})},...(body?{body:JSON.stringify(body)}:{})});
            const data=await response.json();if(!response.ok)throw new Error(data.message||'Aksi belum berhasil.');return closed?null:data;
        }catch(error){if(!closed)status(own.signal.aborted?'Koneksi terlambat. Periksa inventaris sebelum mencoba ulang.':error.message);return null;}
        finally{win.clearTimeout(deadline);if(controller===own)controller=null;busy=false;render();pose();}
    }
    function apply(data){const state=data?.self;if(!state||(state.combat_revision??0)<(self.combat_revision??0))return;self={...self,...state};getScene()?.combatState?.(state);pose();}
    async function mutate(action,body){
        if(busy)return;if(action==='buy')pending.set(body.weapon,body.request_id);const data=await request('/'+action,body);if(!data)return;
        if(action==='buy'){pending.delete(body.weapon);account=data;}apply(data);render();close();showHud(true,true);
        status(body.weapon?`${catalog.weapons[body.weapon].name} dipegang. B untuk bidik, klik kiri / V menembak.`:'Senjata disimpan.');
    }
    async function open(){
        if(closed||!visible())return;if(busy){status('Menunggu aksi sebelumnya selesai.');return;}getScene()?.setAiming?.(false);aimState(false);panel.hidden=false;
        const value=await request('',null);if(value&&!closed){account=value;apply(value);render();}if(!closed&&!panel.hidden)$('voArmoryClose').focus();
    }
    function close(){panel.hidden=true;getScene()?.focusPilot?.();}
    function pose(value){
        if(value?.hp!==undefined&&(value.combat_revision??0)>=(self.combat_revision??0))self={...self,...value};
        const mode=getScene()?.activeTransformation?.(),special=['susanoo','kurama'].includes(mode?.id),cooling=Date.now()<readyAt;
        if($('voCombatHealth'))$('voCombatHealth').value=self.hp??100;set('voCombatHealthText',(self.hp??100)+' HP');set('voCombatWeapon',catalog.weapons[self.weapon]?.name||mode?.name||'Tanpa senjata');
        set('voCombatTarget','B / tahan klik kanan: bidik · klik kiri / V: tembak');set('voCombatMode',mode?`${mode.name} · ${mode.remaining??''} dtk`:'');if($('voCombatMode'))$('voCombatMode').hidden=!mode;
        $('voCombatSpecial').hidden=!special;set('voCombatSpecial',mode?.id==='susanoo'?'G · Panah Indra':'G · Bijūdama');
        $('voCombatFire').disabled=!self.weapon||busy||cooling;set('voCombatFire',cooling?'Pulih '+Math.ceil((readyAt-Date.now())/1000)+' dtk':'V · Tembak');$('voCombatSpecial').disabled=busy||cooling;
        if($('voCombatAim'))$('voCombatAim').disabled=!self.weapon&&!special;aimState(Boolean(getScene()?.isAiming?.()));
    }
    function blocked(){return !visible()||!panel.hidden||Boolean(doc.querySelector('.vo-hologram-work:not([hidden]),.vo-avatar-editor:not([hidden]),.vo-club-panel:not([hidden]),.vo-world-panel:not([hidden])'));}
    async function fire(special=false){
        if(busy||blocked())return;const mode=getScene()?.activeTransformation?.(),kind=special?(mode?.id==='susanoo'?'indra_arrow':mode?.id==='kurama'?'bijudama':null):self.weapon;
        if(!kind){status('Pegang senjata atau aktifkan mode jurus dahulu.');return;}if(Date.now()<readyAt)return;
        const spec=catalog.weapons[kind]||catalog.specials[kind],point=getScene()?.aimPoint?.(spec.range);
        if(!point||!['x','y','z'].every(k=>Number.isFinite(point[k]))){status('Aktifkan kendali avatar untuk menggunakan bidikan.');return;}
        const data=await request('/fire',{kind,aim:point,request_id:globalThis.crypto.randomUUID()});if(!data)return;
        readyAt=Date.now()+Math.max(0,spec.cooldown);apply(data);status(data.knockout?'Target kalah dan respawn di rumah.':data.hit?`${spec.name} mengenai target · ${data.damage} damage · ${data.hp} HP tersisa.`:data.note||`${spec.name} ditembakkan ke arah bidikan.`);
    }
    $('voArmoryOpen').addEventListener('click',open);$('voArmoryClose').addEventListener('click',close);$('voArmoryRoute').addEventListener('click',()=>{close();getScene()?.guideTo?.('armory');onStatus('Ikuti penanda ke ATLAS Armory di sisi timur kampus.');});
    $('voCombatFire').addEventListener('click',()=>fire());$('voCombatSpecial').addEventListener('click',()=>fire(true));$('voCombatHolster').addEventListener('click',()=>mutate('equip',{weapon:null}));
    $('voCombatAim')?.addEventListener('click',aim);$('voCombatFold')?.addEventListener('click',()=>fold(!$('voCombatDetails').hidden));$('voCombatHide')?.addEventListener('click',()=>{showHud(false);getScene()?.setAiming?.(false);aimState(false);});$('voCombatToggle')?.addEventListener('click',()=>showHud(hud?.hidden===true,true));
    doc.addEventListener('keydown',event=>{
        if(event.repeat||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||event.isComposing)return;const el=doc.activeElement;if(['INPUT','TEXTAREA','SELECT'].includes(el?.tagName)||el?.isContentEditable)return;
        if(!panel.hidden&&event.key==='Escape'){event.preventDefault();close();return;}if(blocked())return;
        if(event.code==='KeyB'){event.preventDefault();aim();}if(['KeyV','KeyG'].includes(event.code)){event.preventDefault();fire(event.code==='KeyG');}
    });
    win.addEventListener('pagehide',()=>{closed=true;controller?.abort();getScene()?.setAiming?.(false);});win.addEventListener('pageshow',()=>{closed=false;});
    fold(true);return{open,close,pose,self:apply,fire,aimState,armed:()=>Boolean(self.weapon||['susanoo','kurama'].includes(getScene()?.activeTransformation?.()?.id)),escape(){if(!panel.hidden){close();return true;}if(getScene()?.isAiming?.()){getScene().setAiming(false);aimState(false);return true;}return false;}};
}
