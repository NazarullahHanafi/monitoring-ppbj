// Keyboard/touch input and a bounded single-flight sync loop. No control is sent
// while another form, modal, browser tab, or business page has the user's focus.
export function mountOfficePilot({document:doc,window:win,config,visible,getScene,onStatus=()=>{},onPose=()=>{}}) {
    if(!config.canPilot)return{start(){},stop(){},interact:()=>true};
    const keys=new Set();let session=globalThis.crypto.randomUUID(),generation=0,timer=null,nextDelay=null,controller=null,enabled=false,claimed=false,seq=0,last=null,trail=[],inputFrozen=false,requestStarted=0,unconfirmed=0,reported=null,doorIntent=null;
    const $=id=>doc.getElementById(id);
    const blocked=()=>!visible()||doc.hidden||Boolean(doc.querySelector('.vo-club-panel:not([hidden]),.vo-avatar-editor:not([hidden]),.vo-world-panel:not([hidden])'));
    function input(){const el=doc.activeElement;const typing=el&&['INPUT','TEXTAREA','SELECT','BUTTON'].includes(el.tagName)||el?.isContentEditable;
        const data=blocked()||typing||inputFrozen?{}:{x:Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft')),z:Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown')),boost:keys.has('ShiftLeft')||keys.has('ShiftRight'),jump:keys.has('Space')};getScene()?.setPilotInput?.(data);}
    const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','Space']);
    doc.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.isComposing||blocked())return;const el=doc.activeElement;if(['INPUT','TEXTAREA','SELECT','BUTTON'].includes(el?.tagName)||el?.isContentEditable)return;
        if(movement.has(e.code)){e.preventDefault();keys.add(e.code);input();}if(e.code==='KeyE'&&!e.repeat){e.preventDefault();getScene()?.interactNearest?.();}});
    doc.addEventListener('keyup',e=>{keys.delete(e.code);input();});win.addEventListener('blur',()=>{keys.clear();input();});
    doc.querySelectorAll('[data-vo-key]').forEach(button=>{
        button.addEventListener('pointerdown',e=>{e.preventDefault();getScene()?.focusPilot?.();button.setPointerCapture?.(e.pointerId);keys.add(button.dataset.voKey);input();});
        for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>{keys.delete(button.dataset.voKey);input();});
    });
    $('voPilotTakeControl')?.addEventListener('click',()=>{if(enabled)getScene()?.followPilot?.();else start();});
    $('voPilotFollow')?.addEventListener('click',()=>getScene()?.followPilot?.());
    $('voPilotRelease')?.addEventListener('click',()=>stop());
    $('voHomeRoute')?.addEventListener('click',()=>{getScene()?.guideTo?.('home');getScene()?.followPilot?.();onStatus('Ikuti penanda emas ke pintu rumah Anda. Jalan samping kantor menuju kawasan rumah.');});
    $('voHomeDoor')?.addEventListener('click',toggleDoor);
    $('voRestStart')?.addEventListener('click',()=>{if(!claimed||!getScene()?.setRestPose?.($('voRestPose')?.value||'sit'))onStatus('Datangi pantai, taman, teras, lounge, bar, atau rumah sendiri. Sisakan ruang kosong untuk rebahan.');else{keys.clear();input();getScene()?.focusPilot?.();onStatus('Sedang bersantai. Gunakan tombol gerak untuk berdiri kembali.');}});
    $('voRestStop')?.addEventListener('click',()=>{getScene()?.setRestPose?.(null);getScene()?.focusPilot?.();});
    function toggleDoor(){if(!claimed||!getScene()?.canUseDoor?.()){getScene()?.guideTo?.('home');onStatus('Berjalan mendekati pintu rumah sendiri dahulu.');return;}doorIntent=!getScene().homeDoorOpen();if(!controller){clearTimeout(timer);nextDelay=0;timer=setTimeout(pulse,0);}}
    function state(value){if(!value)return;last=value;onPose(value);if(claimed&&trail.length<32&&(!trail.length||Math.hypot(value.x-trail.at(-1).x,value.z-trail.at(-1).z)>.0001))trail.push({x:value.x,z:value.z});
        if(claimed&&reported)unconfirmed+=Math.hypot(value.x-reported.x,value.z-reported.z);reported={x:value.x,z:value.z};
        // Wake the idle sync promptly when the first movement frame arrives.
        if(enabled&&claimed&&!controller&&nextDelay>300&&['walk','run','jump'].includes(value.action)){clearTimeout(timer);nextDelay=300;timer=setTimeout(pulse,300);}
        if($('voStamina'))$('voStamina').value=Math.round(value.stamina||0);if($('voPilotCoordinates'))$('voPilotCoordinates').textContent=`${Math.round(value.x)} / ${Math.round(value.z)} · ${value.action==='run'?'Berlari':value.action==='jump'?'Melompat':'Kendali manual'}`;
        if(claimed&&(unconfirmed>=4||controller&&Date.now()-requestStarted>1500)){inputFrozen=true;input();onStatus('Menunggu sinkronisasi posisi. Avatar tetap di tempat Anda.');}}
    getScene()?.setPilotReporter?.(state);
    async function pulse(){
        timer=null;nextDelay=null;if(!enabled||!visible()||!getScene()||controller)return;
        getScene()?.setPilotReporter?.(state);getScene()?.setPilotGate?.(blocked);last=getScene()?.pilotState?.()||last;
        const ticket=generation,own=new AbortController();controller=own;requestStarted=Date.now();const deadline=setTimeout(()=>own.abort(),8000),sentTrail=trail,sentDistance=unconfirmed;trail=[];
        const snapshot=last||{x:0,y:-.12,z:20,yaw:0,action:'idle'},mode=claimed?'move':'claim';
        try{
            const headers={Accept:'application/json','Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content||''};
            const response=await fetch('/virtual-office/pilot',{method:'POST',signal:own.signal,credentials:'same-origin',headers,body:JSON.stringify({session_id:session,mode,seq:++seq,x:snapshot.x,y:snapshot.y,z:snapshot.z,yaw:snapshot.yaw,action:snapshot.action||'idle',venue:snapshot.venue||null,pose:snapshot.pose||null,trail:mode==='move'?sentTrail:[]})});
            const data=await response.json();if(!response.ok){const error=new Error(data.message||'Kendali belum tersinkron.');error.status=response.status;error.self=data.self;throw error;}
            if(!enabled||ticket!==generation||own.signal.aborted)return;
            getScene()?.setPeerPilots?.(data.peers||[]);
            if(!claimed){claimed=true;getScene()?.setPilot?.(Number(config.myId),data.self,config.privateSelf);trail=[];reported=data.self;unconfirmed=0;onStatus('WASD / panah · Space lompat · Shift boost · E interaksi');}else unconfirmed=Math.max(0,unconfirmed-sentDistance);
            getScene()?.setHomeDoor?.(Boolean(data.self?.door_open));
            if(doorIntent!==null){const open=doorIntent;doorIntent=null;try{const doorResponse=await fetch('/virtual-office/home/door',{method:'POST',signal:own.signal,credentials:'same-origin',headers,body:JSON.stringify({session_id:session,open})});const door=await doorResponse.json();if(!doorResponse.ok)throw new Error(door.message||'Pintu belum dapat diubah.');if(enabled&&ticket===generation){getScene()?.setHomeDoor?.(door.self.door_open);onStatus(open?'Pintu terbuka. Berjalan masuk ke rumah Anda.':'Pintu rumah tertutup.');getScene()?.focusPilot?.();}}catch(error){if(enabled&&ticket===generation)onStatus(error.message);}}
            inputFrozen=false;input();
        }catch(error){if(enabled&&ticket===generation){onStatus(error.message);keys.clear();inputFrozen=true;input();if([401,403,409].includes(error.status)){enabled=false;claimed=false;getScene()?.releasePilot?.();}else if(error.status===422){trail=[];unconfirmed=0;if(error.self){getScene()?.reconcilePilot?.(error.self);reported=error.self;last=error.self;inputFrozen=false;}else claimed=false;}}}
        finally{clearTimeout(deadline);if(controller===own)controller=null;if(enabled&&ticket===generation&&visible()){nextDelay=claimed&&['walk','run','jump'].includes(last?.action)?300:1200;timer=setTimeout(pulse,nextDelay);}}
    }
    function start(){if(enabled||!visible()||!getScene())return;session=globalThis.crypto.randomUUID();generation++;seq=0;last=null;trail=[];reported=null;unconfirmed=0;doorIntent=null;enabled=true;inputFrozen=false;claimed=false;pulse();}
    function stop(){generation++;enabled=false;claimed=false;doorIntent=null;keys.clear();inputFrozen=true;input();if(timer)clearTimeout(timer);timer=null;nextDelay=null;controller?.abort();controller=null;getScene()?.releasePilot?.();
        const token=doc.querySelector('meta[name="csrf-token"]')?.content||'';try{win.navigator?.sendBeacon?.('/virtual-office/pilot/leave',new Blob([JSON.stringify({session_id:session,_token:token})],{type:'application/json'}));}catch{} }
    return {start,stop,state,toggleDoor,interact(id){const scene=getScene();if(!claimed||!scene?.canInteract?.(id)){scene?.guideTo?.(id);onStatus('Jalan ke '+id+' terlebih dahulu, lalu klik tempatnya atau tekan E.');return false;}return true;}};
}
