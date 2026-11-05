import { createOfficeReadLoop, games } from './virtual-office-state.js';

export function mountOfficeClub({ document: doc, config, visible, getPeople, getScene, focusArea = () => {} }) {
    const $ = id => doc.getElementById(id), set = (id, value) => { if ($(id) && $(id).textContent !== String(value)) $(id).textContent = value; };
    if (!$('voClubPanel')) return { start(){}, stop(){}, select(){}, chat(){}, syncScene(){}, openGame(){} };
    const networkKinds = ['badminton','tennis','pingpong','foosball'];
    let section = 'play', peer = null, game = null, account = null, catalog = [], group = '', play = null, music = null, busy = false, delay = 8000, opening = null, pending = new Map(), lastMessages = [], ownActivity = null, instructions = {};
    const seen = new Set(), drafts = new Map();
    const uuid = () => globalThis.crypto.randomUUID();
    async function request(path, body, signal) {
        const response = await fetch(path, { method: body ? 'POST' : 'GET', signal, credentials:'same-origin', cache:'no-store', headers:{Accept:'application/json', ...(body ? {'Content-Type':'application/json','X-CSRF-TOKEN':doc.querySelector('meta[name="csrf-token"]')?.content || ''}: {})}, ...(body ? {body:JSON.stringify(body)}:{}) });
        const data = await response.json(); if(!response.ok){const error=new Error(data.message||'Permintaan belum berhasil. Coba lagi.');error.status=response.status;throw error;}return data;
    }
    async function post(path, body, idempotent = false) {
        if(busy)return null; busy=true; const controller=new AbortController(), deadline=setTimeout(()=>controller.abort(),12000), key=path+JSON.stringify(body);
        if(idempotent){if(!pending.has(key))pending.set(key,uuid());body={...body,request_id:pending.get(key)};}
        try { const data=await request(path,body,controller.signal);pending.delete(key);loop.refresh(true);return data; }
        catch(error){set('voClubStatus',controller.signal.aborted?'Respons terlambat. Periksa pesanan/dompet sebelum mencoba ulang.':error.message);set('voAvatarChatStatus',error.message);set('voGameStatus',error.message);return null;}
        finally{clearTimeout(deadline);busy=false;}
    }
    const dollars=n=>`$${Number(n||0).toLocaleString('en-US')}`;
    function balance(data){account={...account,...data};set('voWallet',`${dollars(account.balance)} · virtual`);set('voDineBalance',dollars(account.balance));
        $('voWalletHistory').replaceChildren(...(account.ledger||[]).map(row=>{const p=doc.createElement('p');p.textContent=`${new Date(row.created_at).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})} · ${row.amount>0?'+':''}${dollars(row.amount)} · ${row.reference.startsWith('daily:')?'Bonus harian':'Pesanan'} · saldo ${dollars(row.balance)}`;return p;}));
        const orders=account.orders||[];$('voMyOrders').replaceChildren(...orders.map(row=>{const item=catalog.find(i=>i.id===row.item),host=doc.createElement('div'),name=doc.createElement('span'),button=doc.createElement('button');name.textContent=`${item?.name||row.item} · ${row.remaining} porsi`;button.type='button';button.className='vo-button';button.textContent='Nikmati di '+$('voRelaxPlace').selectedOptions[0].textContent;button.addEventListener('click',async()=>{const destination=$('voRelaxPlace').value,result=await post('/virtual-office/recreation/consume',{id:row.id,destination},true);if(result){balance(result);ownActivity={destination,kind:item?.kind||'drink',item:row.item};getScene()?.setRecreation?.(config.myId,ownActivity);focusArea(destination);set('voClubStatus',`Selamat menikmati ${item?.name||row.item}. Avatar Anda menuju tempat pilihan.`);}});host.append(name,button);return host;}));if(!orders.length)set('voMyOrders','Belum ada pesanan tersimpan.');
    }
    async function loadAccount(){
        if(!config.canChat){set('voClubStatus','Mode Viewer: nikmati musik dan latihan lokal. Pembelian virtual tersedia untuk akun anggota.');return;}
        const controller=new AbortController(),deadline=setTimeout(()=>controller.abort(),12000);
        try{const data=await request('/virtual-office/recreation',null,controller.signal);catalog=data.catalog||[];balance(data);menu();set('voDailyBonus',`Bonus $1.000 virtual sudah diberikan untuk ${data.awarded_on} (WIB). Sekali sehari; tidak dapat diuangkan.`);set('voClubStatus','Selamat datang. Pilih menu dan tempat untuk menikmatinya.');}catch(error){set('voClubStatus',error.message);}finally{clearTimeout(deadline);}
    }
    function menu(){
        const groups=['Semua',...new Set(catalog.map(i=>i.group))];$('voMenuGroups').replaceChildren(...groups.map(name=>{const b=doc.createElement('button');b.type='button';b.textContent=name;b.setAttribute('aria-pressed',String((group||'Semua')===name));b.addEventListener('click',()=>{group=name==='Semua'?'':name;menu();});return b;}));
        const query=$('voMenuSearch').value.trim().toLocaleLowerCase('id');const items=catalog.filter(i=>(!group||i.group===group)&&i.name.toLocaleLowerCase('id').includes(query));
        $('voFoodMenu').replaceChildren(...items.map(item=>{const card=doc.createElement('article'),eyebrow=doc.createElement('small'),name=doc.createElement('h4'),price=doc.createElement('b'),button=doc.createElement('button');eyebrow.textContent=item.group;name.textContent=item.name;price.textContent=dollars(item.price);button.type='button';button.className='vo-button';button.textContent='Pesan 1 porsi';button.disabled=!config.canChat;button.addEventListener('click',async()=>{const result=await post('/virtual-office/recreation/order',{item:item.id,quantity:1,destination:$('voRelaxPlace').value},true);if(result){balance(result);set('voClubStatus',`${item.name} dipesan · ${dollars(item.price)} virtual. Pilih Nikmati di pesanan Anda.`);}});card.append(eyebrow,name,price,button);return card;}));if(!items.length)set('voFoodMenu','Menu tidak ditemukan.');
    }
    function controls(){return{aim:Number($('voGameAim').value)/100,power:Number($('voGamePower').value)/100,racket:Number($('voGameRacket').value)/100};}
    async function ensurePlay(){
        if(play)return play;if(opening)return opening;
        opening=import('./virtual-office-play.js').then(({createOfficePlay,playInstructions})=>{instructions=playInstructions;if(game)$('voPlayableGame').value=game.kind;play=createOfficePlay({canvas:$('voGameCanvas'),controls,onScore:value=>set('voGameScore',value),onStatus:value=>set('voGameStatus',value),onPointer:value=>{$('voGameRacket').value=Math.round(value*100);$('voGameAim').value=Math.round(value*100);},onCards:cards=>{$('voGameCards').replaceChildren(...cards.map(card=>{const b=doc.createElement('button');b.type='button';b.className='vo-button';b.textContent=card.label;b.disabled=card.disabled;b.addEventListener('click',card.action);return b;}));}});play.reset($('voPlayableGame').value);set('voGameInstructions',playInstructions[$('voPlayableGame').value]);play.visible(visible()&&!$('voClubPanel').hidden&&section==='play');if(game?.status!=='pending')play.network(game);return play;}).catch(()=>set('voGameStatus','Permainan belum termuat. Muat ulang halaman.')).finally(()=>{opening=null;});return opening;
    }
    function partners(){const selected=$('voPlayPartner').value;const nodes=[['','Komputer · latihan sendiri'],...getPeople().filter(p=>!p.is_me&&p.can_talk).map(p=>[p.id,`${p.name} · ${p.state==='offline'?'OFFLINE / komputer':'online / minta persetujuan'}`])];$('voPlayPartner').replaceChildren(...nodes.map(([value,label])=>{const option=doc.createElement('option');option.value=value;option.textContent=label;return option;}));if(nodes.some(n=>String(n[0])===selected))$('voPlayPartner').value=selected;}
    async function open(next='play'){
        section=['play','dine','music'].includes(next)?next:'play';$('voClubPanel').hidden=false;
        for(const id of ['play','dine','music'])$('voClub'+id[0].toUpperCase()+id.slice(1)).hidden=id!==section;
        doc.querySelectorAll('[data-vo-club]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.voClub===section)));$('voClubPanel').focus();
        if(section==='play'){partners();await ensurePlay();}else play?.visible(false);
        if(section==='dine')await loadAccount();
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
        const [messages,current]=await Promise.all([request('/virtual-office/messages',null,signal),request('/virtual-office/game',null,signal)]);return{messages:messages.messages||[],game:current.game};
    },onData:data=>{renderGame(data.game);renderMessages(data.messages);},onError:error=>{if(error.status===429)delay=30000;set('voLiveStatus',error.message);}});
    function chat(id,focus=true){const person=getPeople().find(p=>p.id===Number(id));if(!config.canMeet||!person||person.is_me||person.state==='offline'||!person.can_talk)return;if(peer)drafts.set(peer,$('voAvatarChatInput').value);peer=person.id;delay=2500;$('voAvatarChat').hidden=false;set('voAvatarChatTitle',person.name);$('voAvatarChatInput').value=drafts.get(peer)||'';renderMessages(lastMessages);if(focus)$('voAvatarChatInput').focus();loop.refresh(true);}
    $('voCloseAvatarChat').addEventListener('click',()=>{if(peer)drafts.set(peer,$('voAvatarChatInput').value);peer=null;$('voAvatarChat').hidden=true;delay=game?2500:8000;});
    $('voAvatarChatForm').addEventListener('submit',async e=>{e.preventDefault();if(!peer||!config.canMeet)return;const input=$('voAvatarChatInput'),message=input.value.trim(),target_id=peer;if(!message||message.length>350)return;const result=await post('/virtual-office/messages',{target_id,message},true);if(result){if(peer===target_id&&input.value.trim()===message)input.value='';drafts.delete(target_id);getScene()?.say?.(config.myId,message);set('voAvatarChatStatus','Terkirim langsung. Gelembung hanya terlihat bagi Anda dan rekan ini.');}});
    doc.querySelectorAll('[data-vo-club]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.voClub)));
    $('voCloseClub').addEventListener('click',()=>{$('voClubPanel').hidden=true;play?.visible(false);doc.querySelector('[data-vo-club]')?.focus();});
    $('voClubPanel').addEventListener('keydown',e=>{if(e.key==='Escape'){$('voCloseClub').click();}if(e.key==='Tab'){const fields=[...$('voClubPanel').querySelectorAll('button:not(:disabled),input,select,canvas[tabindex]')].filter(el=>el.getClientRects().length);const first=fields[0],last=fields.at(-1);if(e.shiftKey&&(doc.activeElement===first||doc.activeElement===$('voClubPanel'))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first?.focus();}}});
    $('voMenuSearch').addEventListener('input',menu);$('voRelaxPlace').addEventListener('change',()=>{if(account)balance(account);});
    async function move(destination){const result=await post('/virtual-office/recreation/move',{destination});if(result){ownActivity={destination,kind:'relax'};getScene()?.setRecreation?.(config.myId,ownActivity);focusArea(destination);set('voClubStatus','Avatar Anda menuju '+(destination==='office'?'kantor':$('voRelaxPlace').selectedOptions[0].textContent)+'.');}}
    $('voGoRelax').addEventListener('click',()=>move($('voRelaxPlace').value));$('voBackOffice').addEventListener('click',()=>move('office'));
    for(const item of games){const option=doc.createElement('option');option.value=item.id;option.textContent=`${item.icon} ${item.name}`;$('voPlayableGame').append(option);}$('voPlayableGame').value='archery';
    $('voPlayableGame').addEventListener('change',async()=>{if(game){set('voGameStatus','Akhiri pertandingan aktif sebelum mengganti permainan.');return;}const p=await ensurePlay();p?.reset($('voPlayableGame').value);});
    $('voStartGame').addEventListener('click',async()=>{const kind=$('voPlayableGame').value,target=Number($('voPlayPartner').value);if(game){set('voGameStatus','Akhiri undangan/pertandingan aktif terlebih dahulu.');return;}if(target){if(!networkKinds.includes(kind)){set('voGameStatus','Permainan ini tersedia sebagai latihan lokal. Duel rekan tersedia untuk badminton, tenis, tenis meja, dan foosball.');return;}const result=await post('/virtual-office/game/invite',{kind,target_id:target});if(result){renderGame(result.game);await ensurePlay();play.network(result.game.status==='pending'?null:result.game);focusArea(kind);}}else{const p=await ensurePlay();p?.reset(kind);p?.visible(visible());focusArea(kind);getScene()?.setGame?.({kind,from:Number(config.myId),to:0,bot:true,status:'playing'});}});
    for(const action of ['accept','decline','end'])$('vo'+action[0].toUpperCase()+action.slice(1)+'Game').addEventListener('click',async()=>{if(!game)return;const result=await post('/virtual-office/game/respond',{id:game.id,action});if(result){renderGame(result.game);if(action==='accept'){await ensurePlay();play.network(result.game);}else{play?.reset($('voPlayableGame').value);getScene()?.setGame?.(null);}}});
    $('voGameAction').addEventListener('click',async()=>{if(game){if(game.status!=='playing'||game.turn!==Number(config.myId))return;const result=await post('/virtual-office/game/hit',{id:game.id,revision:game.revision,...controls()},true);if(result)renderGame(result.game);}else play?.action();});
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
        syncScene(){if(ownActivity)getScene()?.setRecreation?.(config.myId,ownActivity);getScene()?.setGame?.(game);},
        openGame(kind){$('voPlayableGame').value=kind;open('play');if(!game)ensurePlay().then(p=>p?.reset(kind));}
    };
}
