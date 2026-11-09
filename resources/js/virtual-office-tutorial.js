// Observe actual local physics and successful actions; never synthesize input.
export function createOfficePracticeTracker(){
    let previous=null,distance=0,jump=0,orbit=0,zoom=0;
    return{reset(){previous=null;distance=jump=orbit=zoom=0;},pose(value){
        if(!value||![value.x,value.y,value.z].every(Number.isFinite))return;
        if(previous){const moved=Math.hypot(value.x-previous.x,value.z-previous.z);if(moved<1&&['walk','run','jump','land'].includes(value.action))distance+=moved;}
        if(value.action==='jump')jump=Math.max(jump,value.y-(value.ground??-.12));
        previous={x:value.x,z:value.z};
    },camera(value){if(Number.isFinite(value?.orbit))orbit+=Math.max(0,value.orbit);if(Number.isFinite(value?.zoom))zoom+=Math.max(0,value.zoom);},
    evidence(event){return event==='move'?{event,distance:Math.min(1000,distance),jump}:event==='camera'?{event,orbit:Math.min(1000,orbit),zoom:Math.min(1000,zoom)}:{event};},
    ready(event){return event==='move'?distance>=3&&jump>=.25:event==='camera'?orbit>=.12&&zoom>=.1:false;}};
}

export function mountOfficeTutorial({document:doc,window:win,config,getScene,actions,onStep=()=>{}}){
    const $=id=>doc.getElementById(id),card=$('voTutorialCoach');if(!config?.active||!card)return null;
    const tracker=createOfficePracticeTracker();let settings=config,step=config.step||0,started=false,pending=false,controller=null,retry=null,highlight=null,lastTasks='',closed=false;
    const button=$('voTutorialAction'),workspace=$('voWorkspace');
    function status(value){$('voTutorialStatus').textContent=value;}
    function tasks(value){if(value!==lastTasks){lastTasks=value;$('voTutorialTasks').textContent=value;}}
    function render(){
        const item=settings.steps[Math.min(6,step)];
        $('voTutorialStep').textContent=String(Math.min(7,step+1)).padStart(2,'0')+' / 07';
        $('voTutorialMode').textContent=settings.replay?'Praktik ulang':'Satu kali per akun';
        $('voTutorialTitle').textContent=item.title;$('voTutorialBody').textContent=item.body;$('voTutorialProgress').value=step;
        button.disabled=pending||!getScene();button.textContent=pending?'Menyimpan progres…':retry?'Coba simpan progres':!started?(getScene()?'Mulai / lanjutkan praktik':'Menyiapkan dunia 3D…'):item.action;
        highlight?.classList.remove('vo-tutorial-target');highlight=started?$(item.target):null;highlight?.classList.add('vo-tutorial-target');
    }
    async function post(url,data){
        const target=new URL(url,win.location.origin);if(target.origin!==win.location.origin||!['/virtual-office/tutorial/start','/virtual-office/tutorial'].includes(target.pathname))throw new Error('Alamat latihan tidak valid.');
        const own=new AbortController();controller=own;const deadline=win.setTimeout(()=>own.abort(),12000);
        try{const response=await fetch(target.pathname,{method:'POST',credentials:'same-origin',signal:own.signal,headers:{Accept:'application/json','Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content||''},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(Object.values(result.errors||{})[0]?.[0]||result.message||'Progres belum tersimpan. Coba lagi.');return result;}
        finally{win.clearTimeout(deadline);if(controller===own)controller=null;}
    }
    function enter(){
        tracker.reset();tasks('');render();onStep(step);
        status(settings.replay?'Coba tindakannya langsung di kawasan.':'Progres tersimpan per akun setelah tindakan berhasil.');
        if(step===1||step===3)actions.focus();
        if(step===6){actions.closeWork();actions.focus();}
    }
    async function complete(evidence){
        if(!started||pending||closed)return;
        pending=true;retry=evidence;render();
        try{
            const result=settings.replay?{step:step+1,completed:step===6}:await post(settings.advanceUrl,{step,evidence});
            if(closed)return;
            step=result.step;retry=null;
            if(step>=7){closed=true;status('Tutorial selesai. Membuka kawasan dengan menu kerja asli…');highlight?.classList.remove('vo-tutorial-target');win.location.assign('/virtual-office');return;}
            enter();
        }catch(error){if(!closed)status(error.name==='AbortError'?'Koneksi terlalu lama. Tekan Coba simpan progres.':error.message);}
        finally{pending=false;if(!closed)render();}
    }
    async function begin(){
        if(pending||!getScene()||closed)return;
        actions.immerse();pending=true;render();
        try{settings=await post(settings.startUrl,{});if(closed)return;step=settings.step;started=true;enter();actions.focus();}
        catch(error){status(error.name==='AbortError'?'Koneksi terlalu lama. Tekan tombol praktik untuk mencoba lagi.':error.message);}
        finally{pending=false;render();}
        if(started&&step===0&&getScene()?.pilotState?.())complete({event:'control'});
    }
    button.addEventListener('click',()=>{
        if(!started){begin();return;}if(retry){complete(retry);return;}
        if(step===0){actions.focus();if(getScene()?.pilotState?.())complete({event:'control'});else status('Menunggu kendali avatar aktif. Jika avatar dikendalikan tab lain, lepas kendali di tab tersebut dahulu.');}
        else if(step===1||step===3)actions.focus();
        else if(step===2)actions.avatar();
        else if(step===4||step===5)actions.hologram();
        else if(step===6)complete({event:'finish'});
    });
    $('voTutorialFold').addEventListener('click',()=>{const body=$('voTutorialContent');body.hidden=!body.hidden;$('voTutorialFold').textContent=body.hidden?'+':'−';$('voTutorialFold').setAttribute('aria-expanded',String(!body.hidden));});
    win.addEventListener('pagehide',()=>{closed=true;controller?.abort();highlight?.classList.remove('vo-tutorial-target');});
    win.addEventListener('pageshow',event=>{if(event.persisted){closed=false;pending=false;retry=null;started=false;render();status('Tekan lanjutkan untuk menyelaraskan progres akun.');}});
    render();
    return{ready(){render();if(getScene())status('Kawasan siap. Mulai praktik langsung bersama avatar Anda.');else status('Dunia 3D belum tersedia. Pilih Ruang 3D untuk mencoba kembali.');},
        pose(value){if(!started||pending||closed)return;if(step===0&&getScene()?.pilotState?.())complete({event:'control'});
            if(step!==1)return;tracker.pose(value);const proof=tracker.evidence('move');tasks((proof.distance>=3?'✓':'○')+' Berjalan '+Math.min(3,proof.distance).toFixed(1)+' / 3 m\n'+(proof.jump>=.25?'✓':'○')+' Coba melompat dengan Space / Lompat');if(tracker.ready('move'))complete(proof);},
        avatar(changed){if(started&&step===2&&changed)complete({event:'avatar'});else if(started&&step===2)status('Pilih penampilan yang berbeda, lalu simpan agar terlihat perubahannya.');},
        camera(value){if(!started||step!==3||pending||closed)return;tracker.camera(value);const proof=tracker.evidence('camera');tasks((proof.orbit>=.12?'✓':'○')+' Putar kamera dengan geser\n'+(proof.zoom>=.1?'✓':'○')+' Zoom dengan gulir / cubit / + −');if(tracker.ready('camera'))complete(proof);},
        hologram(){if(started&&step===4)complete({event:'hologram',opened:true});},
        document(token){if(started&&step===5)complete({event:'document',token});},
        panel(name,visible){workspace.classList.toggle('vo-practice-'+name,visible===true&&started);},
        current:()=>({step,started,pending}),
    };
}
