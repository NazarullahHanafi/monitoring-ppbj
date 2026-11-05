// Keyboard/touch input and a bounded single-flight sync loop. No control is sent
// while another form, modal, browser tab, or business page has the user's focus.
export function mountOfficePilot({document:doc,window:win,config,visible,getScene,onStatus=()=>{},onPose=()=>{}}) {
    if(!config.canPilot)return{start(){},stop(){},interact:()=>true};
    const keys=new Set();let session=globalThis.crypto.randomUUID(),generation=0,timer=null,nextDelay=null,controller=null,enabled=false,claimed=false,seq=0,last=null,trail=[],inputFrozen=false,requestStarted=0;
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
    $('voPilotTakeControl')?.addEventListener('click',()=>{claimed=false;start();});
    $('voPilotFollow')?.addEventListener('click',()=>getScene()?.followPilot?.());
    $('voPilotRelease')?.addEventListener('click',()=>stop());
    function state(value){if(!value)return;last=value;onPose(value);if(claimed&&trail.length<32&&(!trail.length||Math.hypot(value.x-trail.at(-1).x,value.z-trail.at(-1).z)>.0001))trail.push({x:value.x,z:value.z});
        // Wake the idle sync promptly when the first movement frame arrives.
        if(enabled&&claimed&&!controller&&nextDelay>300&&['walk','run','jump'].includes(value.action)){clearTimeout(timer);nextDelay=300;timer=setTimeout(pulse,300);}
        if($('voStamina'))$('voStamina').value=Math.round(value.stamina||0);if($('voPilotCoordinates'))$('voPilotCoordinates').textContent=`${Math.round(value.x)} / ${Math.round(value.z)} · ${value.action==='run'?'Berlari':value.action==='jump'?'Melompat':'Kendali manual'}`;
        if(controller&&Date.now()-requestStarted>2000){inputFrozen=true;input();onStatus('Koneksi melambat. Gerakan dijeda sampai tersinkron.');}}
    getScene()?.setPilotReporter?.(state);
    async function pulse(){
        timer=null;nextDelay=null;if(!enabled||!visible()||!getScene()||controller)return;
        getScene()?.setPilotReporter?.(state);getScene()?.setPilotGate?.(blocked);last=getScene()?.pilotState?.()||last;
        const ticket=generation,own=new AbortController();controller=own;requestStarted=Date.now();const deadline=setTimeout(()=>own.abort(),8000),sentTrail=trail;trail=[];
        const snapshot=last||{x:0,y:-.12,z:20,yaw:0,action:'idle'},mode=claimed?'move':'claim';
        try{
            const response=await fetch('/virtual-office/pilot',{method:'POST',signal:own.signal,credentials:'same-origin',headers:{Accept:'application/json','Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content||''},body:JSON.stringify({session_id:session,mode,seq:++seq,x:snapshot.x,y:snapshot.y,z:snapshot.z,yaw:snapshot.yaw,action:snapshot.action||'idle',venue:snapshot.venue||null,trail:mode==='move'?sentTrail:[]})});
            const data=await response.json();if(!response.ok){const error=new Error(data.message||'Kendali belum tersinkron.');error.status=response.status;throw error;}
            if(!enabled||ticket!==generation||own.signal.aborted)return;
            getScene()?.setPeerPilots?.(data.peers||[]);
            if(!claimed){claimed=true;getScene()?.setPilot?.(Number(config.myId),data.self,config.privateSelf);trail=[];onStatus('WASD / panah · Space lompat · Shift boost · E interaksi');}
            inputFrozen=false;input();
        }catch(error){if(enabled&&ticket===generation){onStatus(error.message);keys.clear();inputFrozen=true;input();if([401,403,409].includes(error.status)){enabled=false;claimed=false;getScene()?.releasePilot?.();}else if(error.status===422){claimed=false;getScene()?.releasePilot?.();}}}
        finally{clearTimeout(deadline);if(controller===own)controller=null;if(enabled&&ticket===generation&&visible()){nextDelay=claimed&&['walk','run','jump'].includes(last?.action)?300:1200;timer=setTimeout(pulse,nextDelay);}}
    }
    function start(){if(enabled||!visible()||!getScene())return;session=globalThis.crypto.randomUUID();generation++;seq=0;last=null;trail=[];enabled=true;inputFrozen=false;claimed=false;pulse();}
    function stop(){generation++;enabled=false;claimed=false;keys.clear();inputFrozen=true;input();if(timer)clearTimeout(timer);timer=null;nextDelay=null;controller?.abort();controller=null;getScene()?.releasePilot?.();
        const token=doc.querySelector('meta[name="csrf-token"]')?.content||'';try{win.navigator?.sendBeacon?.('/virtual-office/pilot/leave',new Blob([JSON.stringify({session_id:session,_token:token})],{type:'application/json'}));}catch{} }
    return {start,stop,state,interact(id){const scene=getScene();if(!claimed||!scene?.canInteract?.(id)){scene?.guideTo?.(id);onStatus('Jalan ke '+id+' terlebih dahulu, lalu klik tempatnya atau tekan E.');return false;}return true;}};
}
