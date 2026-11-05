import { createOfficeReadLoop, games } from './virtual-office-state.js';
import { mountOfficeDining } from './virtual-office-dining.js';

export function mountOfficeClub({ document: doc, config, visible, getPeople, getScene, focusArea = () => {}, requireVenue = () => true,loadPlay=()=>import('./virtual-office-play.js') }) {
    const $ = id => doc.getElementById(id), set = (id, value) => { if ($(id) && $(id).textContent !== String(value)) $(id).textContent = value; };
    if (!$('voClubPanel')) return { start(){}, stop(){}, select(){}, chat(){}, syncScene(){}, openGame(){} };
    const networkKinds = ['badminton','tennis','pingpong','foosball'];
    let section = 'play', peer = null, game = null, play = null, music = null, busy = false, delay = 8000, opening = null, pending = new Map(), mutationEpoch = 0, lastMessages = [], ownActivity = null, instructions = {};
    const seen = new Set(), drafts = new Map();let arenaTicket=0;
    const uuid = () => globalThis.crypto.randomUUID();
    async function request(path, body, signal) {
        const response = await fetch(path, { method: body ? 'POST' : 'GET', signal, credentials:'same-origin', cache:'no-store', headers:{Accept:'application/json', ...(body ? {'Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content || ''}: {})}, ...(body ? {body:JSON.stringify(body)}:{}) });
        const data = await response.json(); if(!response.ok){const retryAfter=Math.max(1,Math.min(120,Number(response.headers?.get?.('Retry-After')||data.retry_after||3)));const error=new Error(response.status===429?`Aktivitas sedang disinkronkan. Lanjutkan dalam ${retryAfter} detik.`:data.message||'Permintaan belum berhasil. Coba lagi.');error.status=response.status;error.retryAfter=retryAfter;throw error;}return data;
    }
    async function post(path, body, idempotent = false) {
        if(busy)return null; busy=true;post.lastError=null; const controller=new AbortController(), deadline=setTimeout(()=>controller.abort(),12000), key=path+JSON.stringify(body);
        if(idempotent&&!body.request_id){if(!pending.has(key))pending.set(key,uuid());body={...body,request_id:pending.get(key)};}
        try { const data=await request(path,body,controller.signal);pending.delete(key);mutationEpoch++;if(path==='/virtual-office/messages'||path==='/virtual-office/game/respond')loop.refresh();return data; }
        catch(error){post.lastError={status:error.status,aborted:controller.signal.aborted};set('voClubStatus',controller.signal.aborted?'Respons terlambat. Periksa pesanan/dompet sebelum mencoba ulang.':error.message);set('voAvatarChatStatus',error.message);set('voGameStatus',error.message);return null;}
        finally{clearTimeout(deadline);busy=false;}
    }
    function controls(){return{aim:Number($('voGameAim').value)/100,power:Number($('voGamePower').value)/100,racket:Number($('voGameRacket').value)/100};}
    function atGameVenue(kind){const allowed=requireVenue(kind);$('voGameCanvas').hidden=!allowed;if(!allowed){const message=`Berjalan ke ${games.find(g=>g.id===kind)?.name||kind} dahulu. Tutup panel ini, ikuti penanda emas, lalu klik area permainan atau tekan E.`;set('voGameStatus',message);set('voClubStatus',message);play?.visible(false);}return allowed;}
    async function ensurePlay(){
        if(!atGameVenue($('voPlayableGame').value))return null;
        if(play){play.visible(visible()&&!$('voClubPanel').hidden&&section==='play');return play;}if(opening)return opening;
        opening=loadPlay().then(({createOfficePlay,playInstructions})=>{instructions=playInstructions;if(game)$('voPlayableGame').value=game.kind;play=createOfficePlay({canvas:$('voGameCanvas'),controls,onAction:()=>$('voGameAction').click(),onScore:value=>set('voGameScore',value),onStatus:value=>set('voGameStatus',value),onPointer:value=>{$('voGameRacket').value=Math.round(value*100);$('voGameAim').value=Math.round(value*100);},onCards:cards=>{$('voGameCards').replaceChildren(...cards.map(card=>{const b=doc.createElement('button');b.type='button';b.className='vo-button';b.textContent=card.label;b.disabled=card.disabled;b.addEventListener('click',card.action);return b;}));}});play.reset($('voPlayableGame').value);set('voGameInstructions',playInstructions[$('voPlayableGame').value]);play.visible(visible()&&!$('voClubPanel').hidden&&section==='play');if(game?.status!=='pending')play.network(game);return play;}).catch(()=>{set('voGameStatus','Permainan belum termuat. Coba buka kembali arena.');return null;}).finally(()=>{opening=null;});return opening;
    }
    function partners(){const selected=$('voPlayPartner').value;const nodes=[['','Komputer · latihan sendiri'],...getPeople().filter(p=>!p.is_me&&p.can_talk).map(p=>[p.id,`${p.name} · ${p.state==='offline'?'OFFLINE / komputer':'online / minta persetujuan'}`])];$('voPlayPartner').replaceChildren(...nodes.map(([value,label])=>{const option=doc.createElement('option');option.value=value;option.textContent=label;return option;}));if(nodes.some(n=>String(n[0])===selected))$('voPlayPartner').value=selected;}
    async function open(next='play'){if(next!=='play')arenaTicket++;
        const portable=next==='orders';
        if(next==='dine'&&!requireVenue('bar'))return;
        section=portable?'dine':['play','dine','music'].includes(next)?next:'play';$('voClubPanel').hidden=false;
        for(const id of ['play','dine','music'])$('voClub'+id[0].toUpperCase()+id.slice(1)).hidden=id!==section;
        doc.querySelectorAll('[data-vo-club]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.voClub===section)));$('voClubPanel').focus();
        if(section==='play'){partners();await ensurePlay();}else play?.visible(false);
        $('voClubPanel').setAttribute('data-section',section);
        if(section==='dine')await dining.open({portable});
    }
    function renderGame(value){
        const changed=game?.revision!==value?.revision||game?.id!==value?.id;game=value;delay=peer||game?2500:8000;
        $('voGameInvitation').hidden=!game;const incoming=game?.status==='pending'&&game.to===Number(config.myId);
        $('voAcceptGame').hidden=!incoming;$('voDeclineGame').hidden=!incoming;$('voEndGame').hidden=!game||incoming;
        set('voGameNotice',incoming?'● Ada ajakan bermain · buka klub':'');
        if(game){const other=game.from===Number(config.myId)?game.to_name:game.from_name;set('voGameInviteText',`${games.find(g=>g.id===game.kind)?.name||game.kind} · ${other}${game.bot?' · OFFLINE / komputer':game.status==='pending'?' · menunggu persetujuan':' · duel giliran langsung'}`);if(incoming)set('voLiveStatus',`${other} mengajak bermain. Buka Main & ajak teman untuk menerima atau menolak.`);}
        if(changed){if(game){$('voPlayableGame').value=game.kind;set('voGameInstructions',instructions[game.kind]||'Duel giliran langsung · posisikan raket lalu pukul.');}getScene()?.setGame?.(game);if(game&&game.status!=='pending'){play?.network(game);set('voGameStatus',game.status==='finished'?'Pertandingan selesai. Akhiri untuk memulai permainan baru.':game.turn===Number(config.myId)?'Giliran Anda. Temui kok/bola di penanda emas; arahkan lalu pukul.':'Menunggu pukulan lawan.');}}
    }
    function renderMessages(messages){
        lastMessages=messages;const selected=getPeople().find(p=>p.id===peer),mine=Number(config.myId);
        const pairs=messages.filter(m=>Number(m.user_id)===peer||Number(m.target_id)===peer);
        const host=$('voAvatarMessages'),atBottom=host.scrollHeight-host.scrollTop-host.clientHeight<65,scroll=host.scrollTop;
        host.replaceChildren(...pairs.map(m=>{const p=doc.createElement('p'),b=doc.createElement('b'),span=doc.createElement('span');b.textContent=Number(m.user_id)===mine?'Anda':selected?.name||'Rekan';span.textContent=String(m.message||'').slice(0,350);p.append(b,span);return p;}));host.scrollTop=atBottom?host.scrollHeight:scroll;
        for(const message of messages){if(seen.has(message.id))continue;seen.add(message.id);const age=Date.now()-new Date(message.created_at.replace?.(' ','T')+(String(message.created_at).includes('T')?'':'+07:00')).getTime();if(age>=0&&age<15000){getScene()?.say?.(Number(message.user_id),String(message.message||'').slice(0,350));if(!peer&&Number(message.target_id)===mine)chat(Number(message.user_id),false);}}
        while(seen.size>160)seen.delete(seen.values().next().value);
    }
    const loop=createOfficeReadLoop({visible,interval:()=>delay,read:async signal=>{
        if(!config.canMeet)return{messages:[],game:null};
        const epoch=mutationEpoch;const [messages,current]=await Promise.all([request('/virtual-office/messages',null,signal),request('/virtual-office/game',null,signal)]);return{messages:messages.messages||[],game:current.game,epoch};
    },onData:data=>{if(data.epoch===undefined||data.epoch===mutationEpoch)renderGame(data.game);renderMessages(data.messages);},onError:error=>{if(error.status===429)delay=(error.retryAfter||30)*1000;set('voLiveStatus',error.message);}});
    function chat(id,focus=true){const person=getPeople().find(p=>p.id===Number(id));if(!config.canMeet||!person||person.is_me||person.state==='offline'||!person.can_talk)return;if(peer)drafts.set(peer,$('voAvatarChatInput').value);peer=person.id;delay=2500;$('voAvatarChat').hidden=false;set('voAvatarChatTitle',person.name);$('voAvatarChatInput').value=drafts.get(peer)||'';renderMessages(lastMessages);if(focus)$('voAvatarChatInput').focus();loop.refresh();}
    $('voCloseAvatarChat').addEventListener('click',()=>{if(peer)drafts.set(peer,$('voAvatarChatInput').value);peer=null;$('voAvatarChat').hidden=true;delay=game?2500:8000;});
    $('voAvatarChatForm').addEventListener('submit',async e=>{e.preventDefault();if(!peer||!config.canMeet)return;const input=$('voAvatarChatInput'),message=input.value.trim(),target_id=peer;if(!message||message.length>350)return;const result=await post('/virtual-office/messages',{target_id,message},true);if(result){if(peer===target_id&&input.value.trim()===message)input.value='';drafts.delete(target_id);getScene()?.say?.(config.myId,message);set('voAvatarChatStatus','Terkirim langsung. Gelembung hanya terlihat bagi Anda dan rekan ini.');}});
    doc.querySelectorAll('[data-vo-club]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.voClub)));
    $('voCloseClub').addEventListener('click',()=>{arenaTicket++;$('voClubPanel').hidden=true;play?.visible(false);doc.querySelector('[data-vo-club]')?.focus();});
    $('voClubPanel').addEventListener('keydown',e=>{if(e.key==='Escape'){$('voCloseClub').click();}if(e.key==='Tab'){const fields=[...$('voClubPanel').querySelectorAll('button:not(:disabled),input,select,canvas[tabindex]')].filter(el=>el.getClientRects().length);const first=fields[0],last=fields.at(-1);if(e.shiftKey&&(doc.activeElement===first||doc.activeElement===$('voClubPanel'))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first?.focus();}}});
    async function move(destination,kind='relax',item=null,send=true){
        if(!requireVenue(destination))return;
        if(send&&ownActivity?.destination===destination&&ownActivity?.kind===kind)return;
        const result=send?await post('/virtual-office/recreation/move',{destination}):true;
        if(result){ownActivity={destination,kind,item,until:Date.now()/1000+900};getScene()?.setRecreation?.(config.myId,ownActivity);focusArea(destination);}
    }
    const dining=mountOfficeDining({document:doc,config,request,post,move,focusArea,set,requireVenue});
    $('voGoRelax').addEventListener('click',()=>move($('voRelaxPlace').value,$('voRelaxPlace').value==='disco'?'dance':'relax'));
    $('voBackOffice').addEventListener('click',()=>move('office'));
    let venueEffects=true;try{venueEffects=localStorage.getItem('simonpr:office:venue-effects')!=='off';}catch{}
    $('voVenueEffects').checked=venueEffects;
    $('voVenueEffects').addEventListener('change',()=>{venueEffects=$('voVenueEffects').checked;getScene()?.setVenueEffects?.(venueEffects);try{localStorage.setItem('simonpr:office:venue-effects',venueEffects?'on':'off');}catch{}});
    for(const item of games){const option=doc.createElement('option');option.value=item.id;option.textContent=`${item.icon} ${item.name}`;$('voPlayableGame').append(option);}$('voPlayableGame').value='archery';
    $('voPlayableGame').addEventListener('change',async()=>{if(game){set('voGameStatus','Akhiri pertandingan aktif sebelum mengganti permainan.');return;}if(!atGameVenue($('voPlayableGame').value))return;const p=await ensurePlay();p?.reset($('voPlayableGame').value);});
    $('voStartGame').addEventListener('click',async()=>{const kind=$('voPlayableGame').value,target=Number($('voPlayPartner').value);if(!atGameVenue(kind))return;if(game){set('voGameStatus','Akhiri undangan/pertandingan aktif terlebih dahulu.');return;}if(target){if(!networkKinds.includes(kind)){set('voGameStatus','Permainan ini tersedia sebagai latihan lokal. Duel rekan tersedia untuk badminton, tenis, tenis meja, dan foosball.');return;}const result=await post('/virtual-office/game/invite',{kind,target_id:target});if(result){renderGame(result.game);const arena=await ensurePlay();arena?.network(result.game.status==='pending'?null:result.game);focusArea(kind);}}else{const p=await ensurePlay();if(!p)return;p.reset(kind);p.visible(visible());focusArea(kind);getScene()?.setGame?.({kind,from:Number(config.myId),to:0,bot:true,status:'playing'});}});
    for(const action of ['accept','decline','end'])$('vo'+action[0].toUpperCase()+action.slice(1)+'Game').addEventListener('click',async()=>{if(!game)return;if(action==='accept'&&!atGameVenue(game.kind))return;const result=await post('/virtual-office/game/respond',{id:game.id,action});if(result){renderGame(result.game);if(action==='accept'){const arena=await ensurePlay();arena?.network(result.game);}else{play?.reset($('voPlayableGame').value);getScene()?.setGame?.(null);}}});
    $('voGameAction').addEventListener('click',async()=>{if(!atGameVenue(game?.kind||$('voPlayableGame').value))return;if(game){if(game.status!=='playing'||game.turn!==Number(config.myId))return;const result=await post('/virtual-office/game/hit',{id:game.id,revision:game.revision,...controls()},true);if(result)renderGame(result.game);}else play?.action();});
    $('voGameReset').addEventListener('click',()=>{if(game)set('voGameStatus','Akhiri pertandingan terlebih dahulu.');else play?.reset($('voPlayableGame').value);});
    for(const id of ['voGameAim','voGamePower','voGameRacket'])$(id).addEventListener('input',()=>play?.draw());
    $('voGameCanvas').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const delta=e.key==='ArrowLeft'?-5:5;for(const id of ['voGameAim','voGameRacket'])$(id).value=Math.max(0,Math.min(100,Number($(id).value)+delta));play?.draw();}if(e.code==='Space'){e.preventDefault();$('voGameAction').click();}});
    async function ensureMusic(){if(!music){const {createOfficeMusic}=await import('./virtual-office-music.js');music=createOfficeMusic();music.volume(Number($('voMusicVolume').value)/100);}return music;}
    $('voMusicPlay').addEventListener('click',async()=>{try{await(await ensureMusic()).play();set('voMusicStatus','Musik diputar di perangkat Anda.');}catch(e){set('voMusicStatus',e.message);}});
    $('voMusicStop').addEventListener('click',()=>{music?.stop();set('voMusicStatus','Musik dijeda.');});
    $('voMusicStyle').addEventListener('change',async()=>{try{await(await ensureMusic()).style($('voMusicStyle').value);$('voMusicFile').value='';set('voMusicStatus','Genre dipilih. Tekan Putar untuk memulai.');}catch(e){set('voMusicStatus',e.message);}});
    $('voMusicVolume').addEventListener('input',()=>music?.volume(Number($('voMusicVolume').value)/100));
    $('voMusicFile').addEventListener('change',async()=>{try{(await ensureMusic()).local($('voMusicFile').files[0]);set('voMusicStatus','Berkas lokal siap. Tekan Putar. Berkas tidak diunggah.');}catch(e){set('voMusicStatus',e.message);}});
    return {start(immediate=false){if(visible()&&config.canMeet)loop.start(immediate);play?.visible(visible()&&!$('voClubPanel').hidden&&section==='play');},stop(){loop.stop();play?.visible(false);music?.stop();},select(id){partners();},chat,
        syncScene(){getScene()?.setVenueEffects?.(venueEffects);if(ownActivity)getScene()?.setRecreation?.(config.myId,ownActivity);getScene()?.setGame?.(game);},
        openVenue(venue='bar'){if(!requireVenue(venue))return;if(['bar','disco'].includes(venue)){open('dine');dining.venue(venue);}else{$('voRelaxPlace').value=venue;open('orders');}},
        async openGame(kind){if(!atGameVenue(kind))return false;const ticket=++arenaTicket;if(game&&game.kind!==kind){set('voGameStatus','Akhiri pertandingan aktif sebelum mengganti arena.');return false;}$('voPlayableGame').value=kind;await open('play');if(ticket!==arenaTicket||$('voClubPanel').hidden||section!=='play')return false;const p=await ensurePlay();if(!p||ticket!==arenaTicket)return false;if(!game){p.reset(kind);getScene()?.setGame?.({kind,from:Number(config.myId),to:0,bot:true,status:'playing'});}p.visible(visible()&&!$('voClubPanel').hidden&&section==='play');set('voGameInstructions',instructions[kind]||'Pilih arah dan kekuatan, lalu gunakan tombol aksi.');return true;}
    };
}
