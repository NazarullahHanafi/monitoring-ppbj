// Keyboard/touch input and a bounded single-flight sync loop. No control is sent
// while another form, modal, browser tab, or business page has the user's focus.
import motion from '../data/virtual-office-motion.json' with {type:'json'};
export function mountOfficePilot({document:doc,window:win,config,visible,getScene,onStatus=()=>{},onPose=()=>{}}) {
    if(!config.canPilot)return{start(){},stop(){},interact:()=>true};
    const keys=new Set();let session=globalThis.crypto.randomUUID(),generation=0,timer=null,nextDelay=null,controller=null,enabled=false,claimed=false,seq=0,last=null,trail=[],inputFrozen=false,requestStarted=0,unconfirmed=0,pendingDistance=0,reported=null,doorIntent=null,pendingGuide=null,pendingRest=null,restNotice=false,pendingSkill=null,pendingEnd=false;
    const $=id=>doc.getElementById(id);
    const blocked=()=>!visible()||doc.hidden||Boolean(doc.querySelector('.vo-club-panel:not([hidden]),.vo-avatar-editor:not([hidden]),.vo-world-panel:not([hidden])'));
    const walkingKeys=()=>['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(key=>keys.has(key));
    function input(){const el=doc.activeElement;const typing=el&&['INPUT','TEXTAREA','SELECT'].includes(el.tagName)||el?.isContentEditable;
        const data=blocked()||typing||inputFrozen?{}:{x:Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft')),z:Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown')),boost:keys.has('ShiftLeft')||keys.has('ShiftRight'),jump:keys.has('Space'),descend:keys.has('KeyC')};getScene()?.setPilotInput?.(data);}
    const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','Space','KeyC']);
    doc.addEventListener('keydown',e=>{if(!enabled||!claimed||e.ctrlKey||e.metaKey||e.altKey||e.isComposing||blocked())return;const el=doc.activeElement;if(['INPUT','TEXTAREA','SELECT'].includes(el?.tagName)||el?.isContentEditable||el?.tagName==='BUTTON'&&e.code==='Space')return;
        if(movement.has(e.code)){e.preventDefault();keys.add(e.code);input();}if(e.code==='KeyE'&&!e.repeat){e.preventDefault();interactNearest();}if(e.code==='KeyF'&&!e.repeat){e.preventDefault();flight();}if(['KeyQ','KeyR','KeyT'].includes(e.code)&&!e.repeat){e.preventDefault();cast(['KeyQ','KeyR','KeyT'].indexOf(e.code));}});
    doc.addEventListener('keyup',e=>{keys.delete(e.code);input();});win.addEventListener('blur',()=>{keys.clear();input();});
    doc.querySelectorAll('[data-vo-key]').forEach(button=>{
        button.addEventListener('pointerdown',e=>{e.preventDefault();getScene()?.focusPilot?.();button.setPointerCapture?.(e.pointerId);keys.add(button.dataset.voKey);input();});
        for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>{keys.delete(button.dataset.voKey);input();});
    });
    $('voPilotTakeControl')?.addEventListener('click',()=>{if(enabled)getScene()?.followPilot?.();else start();});
    $('voPilotFollow')?.addEventListener('click',()=>getScene()?.followPilot?.());
    $('voPilotRelease')?.addEventListener('click',()=>stop());
    function interactNearest(){if(!claimed){start();onStatus('Menyiapkan kendali avatar.');return;}if(!getScene()?.interactNearest?.())onStatus('Dekati lapangan atau meja permainan, lalu klik areanya atau tekan E.');}
    $('voNearestAction')?.addEventListener('click',interactNearest);
    function cast(index){if(!claimed){onStatus('Aktifkan kendali avatar dahulu.');return;}if(pendingSkill){onStatus('Menunggu sinkronisasi jurus sebelumnya.');return;}const result=getScene()?.castSkill?.(index);if(!result)return;if(result.error){onStatus(result.error);return;}pendingSkill=result;getScene()?.focusPilot?.();onStatus(result.name+' · menyinkronkan jurus.');if(!controller){clearTimeout(timer);timer=setTimeout(pulse,0);}}
    function flight(){if(!claimed)return;const result=getScene()?.toggleFlight?.();onStatus(result==='fly'?'Terbang aktif · tahan Space naik · C turun · F mendarat.':result==='land'?'Mendarat perlahan.':'Pilih transformasi dengan kemampuan terbang dahulu.');getScene()?.focusPilot?.();}
    function endMode(){if(!claimed)return;pendingEnd=true;getScene()?.endTransformation?.();getScene()?.focusPilot?.();onStatus('Mode diakhiri. Avatar akan mendarat jika sedang terbang.');if(!controller){clearTimeout(timer);timer=setTimeout(pulse,0);}}
    $('voFlightToggle')?.addEventListener('click',flight);$('voModeEnd')?.addEventListener('click',endMode);
    doc.querySelectorAll('[data-vo-skill]').forEach(button=>button.addEventListener('click',()=>cast(Number(button.dataset.voSkill))));
    $('voHomeRoute')?.addEventListener('click',()=>{getScene()?.guideTo?.('home');getScene()?.followPilot?.();onStatus('Ikuti penanda emas ke pintu rumah Anda. Jalan samping kantor menuju kawasan rumah.');});
    $('voHomeDoor')?.addEventListener('click',toggleDoor);
    function rest(pose){if(getScene()?.activeTransformation?.())endMode();keys.clear();input();if(!getScene()?.setRestPose?.(pose))onStatus('Area terlalu sempit. Bergeser ke tempat lapang lalu coba lagi.');else{restNotice=true;getScene()?.focusPilot?.();onStatus('Menyiapkan pose. Avatar akan mendarat atau berjalan sedikit jika ruangnya sempit.');}}
    $('voRestStart')?.addEventListener('click',()=>{const pose=$('voRestPose')?.value||'sit';if(!claimed){pendingRest=pose;start();onStatus('Menyiapkan kendali, lalu langsung bersantai.');return;}rest(pose);});
    $('voRestStop')?.addEventListener('click',()=>{pendingRest=null;restNotice=false;getScene()?.setRestPose?.(null);getScene()?.focusPilot?.();onStatus('Berdiri. WASD / panah untuk bergerak.');});
    function toggleDoor(){if(!claimed||!getScene()?.canUseDoor?.()){getScene()?.guideTo?.('home');onStatus('Berjalan mendekati pintu rumah sendiri dahulu.');return;}doorIntent=!getScene().homeDoorOpen();if(!controller){clearTimeout(timer);nextDelay=0;timer=setTimeout(pulse,0);}}
    function state(value){if(!value)return;last=value;onPose(value);if(value.restBlocked){restNotice=false;onStatus('Jalan menuju tempat santai terhalang. Bergeser sedikit lalu coba lagi.');}if(restNotice&&value.action==='rest'){restNotice=false;onStatus('Sedang '+({sit:'duduk santai',recline:'rebahan',nap:'tidur santai',meditate:'meditasi'}[value.pose]||'bersantai')+'. Tekan Berdiri atau tombol gerak untuk bangun.');}if(claimed&&trail.length<motion.trail_points&&(!trail.length||Math.hypot(value.x-trail.at(-1).x,value.z-trail.at(-1).z)>.0001||Math.abs(value.y-(trail.at(-1).y??value.y))>.005))trail.push({x:value.x,y:value.y,z:value.z});
        if(claimed&&reported)unconfirmed+=Math.hypot(value.x-reported.x,value.z-reported.z);reported={x:value.x,z:value.z};
        // Wake the idle sync promptly when the first movement frame arrives.
        if(enabled&&claimed&&!controller&&nextDelay>motion.moving_interval_ms&&['walk','run','jump','fly','land'].includes(value.action)){clearTimeout(timer);nextDelay=motion.moving_interval_ms;timer=setTimeout(pulse,nextDelay);}
        if($('voStamina'))$('voStamina').value=Math.round(value.stamina||0);if($('voPilotCoordinates'))$('voPilotCoordinates').textContent=`${Math.round(value.x)} / ${Math.round(value.z)} · ${value.action==='run'?'Berlari':value.action==='jump'?'Melompat':value.action==='walk'?(value.stamina<30&&(keys.has('ShiftLeft')||keys.has('ShiftRight'))?'Berjalan · pulihkan stamina':'Berjalan'):'Kendali manual'}`;
        if(claimed&&(unconfirmed-pendingDistance>=motion.prediction_distance||controller&&Date.now()-requestStarted>motion.slow_request_ms)){inputFrozen=true;input();onStatus('Koneksi terlambat. Menunggu sinkronisasi posisi.');}}
    getScene()?.setPilotReporter?.(state);
    async function pulse(){
        timer=null;nextDelay=null;if(!enabled||!visible()||!getScene()||controller)return;
        getScene()?.setPilotReporter?.(state);getScene()?.setPilotGate?.(blocked);last=getScene()?.pilotState?.()||last;
        const ticket=generation,own=new AbortController(),skill=pendingSkill,ending=pendingEnd;controller=own;requestStarted=Date.now();const deadline=setTimeout(()=>own.abort(),8000),sentTrail=trail,sentDistance=unconfirmed;pendingDistance=sentDistance;trail=[];
        let acknowledged=false;
        const snapshot=last||{x:0,y:-.12,z:20,yaw:0,action:'idle'},mode=claimed?'move':'claim';
        try{
            const headers={Accept:'application/json','Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content||''};
            const response=await fetch('/virtual-office/pilot',{method:'POST',signal:own.signal,credentials:'same-origin',headers,body:JSON.stringify({session_id:session,mode,seq:++seq,x:snapshot.x,y:snapshot.y,z:snapshot.z,yaw:snapshot.yaw,action:snapshot.action||'idle',flight:Boolean(snapshot.flight),end_form:ending,venue:snapshot.venue||null,pose:snapshot.pose||null,trail:mode==='move'?sentTrail:[],...(skill?{skill:skill.skill,skill_id:skill.skill_id}:{})})});
            const data=await response.json();if(!response.ok){const error=new Error(data.message||'Kendali belum tersinkron.');error.status=response.status;error.self=data.self;throw error;}
            if(!enabled||ticket!==generation||own.signal.aborted)return;
            acknowledged=true;
            getScene()?.setPeerPilots?.(data.peers||[]);
            if(pendingSkill===skill)pendingSkill=null;
            if(!claimed){claimed=true;getScene()?.setPilot?.(Number(config.myId),data.self,config.privateSelf);trail=[];reported=data.self;unconfirmed=0;onStatus('WASD / panah · Space lompat · Shift boost · E interaksi');}else unconfirmed=Math.max(0,unconfirmed-sentDistance);
            getScene()?.syncPilot?.(data.self,{sentAt:requestStarted,receivedAt:Date.now()});if(ending)pendingEnd=false;
            if(pendingGuide){getScene()?.guideTo?.(pendingGuide);pendingGuide=null;}
            if(pendingRest){const pose=pendingRest;pendingRest=null;rest(pose);}
            pendingDistance=0;getScene()?.setHomeDoor?.(Boolean(data.self?.door_open));
            if(doorIntent!==null){const open=doorIntent;doorIntent=null;try{const doorResponse=await fetch('/virtual-office/home/door',{method:'POST',signal:own.signal,credentials:'same-origin',headers,body:JSON.stringify({session_id:session,open})});const door=await doorResponse.json();if(!doorResponse.ok)throw new Error(door.message||'Pintu belum dapat diubah.');if(enabled&&ticket===generation){getScene()?.setHomeDoor?.(door.self.door_open);onStatus(open?'Pintu terbuka. Berjalan masuk ke rumah Anda.':'Pintu rumah tertutup.');getScene()?.focusPilot?.();}}catch(error){if(enabled&&ticket===generation)onStatus(error.message);}}
            const resumed=inputFrozen;inputFrozen=false;input();if(resumed)onStatus('Koneksi pulih. Kendali avatar aktif kembali.');
        }catch(error){if(enabled&&ticket===generation){if(pendingSkill===skill)pendingSkill=null;onStatus(error.message);if(error.status!==422)keys.clear();inputFrozen=true;input();if([401,403,409].includes(error.status)){enabled=false;claimed=false;getScene()?.releasePilot?.();}else if(error.status===422){trail=[];unconfirmed=0;if(error.self){getScene()?.reconcilePilot?.(error.self);reported=error.self;last=error.self;inputFrozen=false;input();}else claimed=false;}}}
        finally{clearTimeout(deadline);if(controller===own){controller=null;pendingDistance=0;}if(enabled&&ticket===generation&&visible()){nextDelay=!acknowledged?motion.idle_interval_ms:pendingEnd||pendingSkill?0:claimed&&(walkingKeys()||['walk','run','jump','fly','land'].includes(last?.action))?motion.moving_interval_ms:motion.idle_interval_ms;timer=setTimeout(pulse,nextDelay);}}
    }
    function start(){if(enabled||!visible()||!getScene())return;session=globalThis.crypto.randomUUID();generation++;seq=0;last=null;trail=[];reported=null;unconfirmed=0;pendingDistance=0;doorIntent=null;enabled=true;inputFrozen=false;claimed=false;pulse();}
    function stop(){generation++;enabled=false;claimed=false;doorIntent=null;pendingSkill=null;pendingRest=null;pendingEnd=false;keys.clear();inputFrozen=true;input();if(timer)clearTimeout(timer);timer=null;nextDelay=null;controller?.abort();controller=null;getScene()?.releasePilot?.();
        const token=doc.querySelector('meta[name="csrf-token"]')?.content||'';try{win.navigator?.sendBeacon?.('/virtual-office/pilot/leave',new Blob([JSON.stringify({session_id:session,_token:token})],{type:'application/json'}));}catch{} }
    return {start,stop,state,toggleDoor,endMode,interact(id){const scene=getScene();if(!claimed||!scene?.canInteract?.(id)){pendingGuide=id;scene?.guideTo?.(id);onStatus('Jalan ke '+id+' terlebih dahulu, lalu klik tempatnya atau tekan E.');return false;}return true;}};
}
