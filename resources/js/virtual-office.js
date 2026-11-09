import { safePeople, poseFor, initials, stateLabel, poseLabel, createOfficeReadLoop, games, gameFor, safeAvatar, isOfficeNight } from './virtual-office-state.js';
import { mountOfficeLive } from './virtual-office-live.js';
import { mountOfficeClub } from './virtual-office-club.js';
import { mountOfficePilot } from './virtual-office-pilot.js';
import { mountOfficeViewport } from './virtual-office-viewport.js';
import { skillsFor } from './virtual-office-abilities.js';
import { mountOfficeHologram } from './virtual-office-hologram.js';
import { mountOfficeCombat } from './virtual-office-combat.js';

const root = document.getElementById('virtualOffice');
if (root && !root.dataset.initialized) {
    root.dataset.initialized = '1';
    const $ = id => document.getElementById(id);
    const config = JSON.parse($('voConfig').textContent);
    function skillButtons(avatar){const skills=skillsFor(avatar?.costume);for(let i=0;i<3;i++){const button=$('voSkill'+i);if(!button)continue;button.hidden=!skills[i];if(skills[i]){button.textContent=['Q','R','T'][i]+' · '+skills[i].name;button.title=skills[i].type==='transform'?'Transformasi 60 detik · perlu area lapang':'Jurus '+skills[i].name;}}}
    function modeHud(value){if(value.interior&&value.transformation)pilot?.endMode?.();const mode=value.transformation;if($('voModeCooldown'))text('voModeCooldown',!mode&&value.transformationCooldown>0?'Transformasi pulih · '+value.transformationCooldown+' dtk':'');if(!$('voModePanel'))return;$('voModePanel').hidden=!mode;if(!mode)return;text('voModeName',mode.name);text('voModeRemaining',mode.remaining+' dtk');$('voModeTime').value=mode.remaining;$('voFlightToggle').hidden=!mode.fly;text('voFlightToggle',value.flight?'F · Mendarat':'F · Terbang');text('voModeGuide',mode.fly?'F terbang / mendarat · Space naik · C turun':'Mode berakhir otomatis. Jurus Q/R/T tetap tersedia.');}
    skillButtons(config.myProfile?.avatar);
    $('voGameAvatar')?.addEventListener('click',()=>$('voOpenAvatar').click());
    const palette = ['#dce9df', '#eadfcc', '#dde5f1', '#e8dce5', '#d3e8e4', '#f0dfce'];
    let people = [], filter = 'all', selected = null, scene = null, sceneTicket = 0, sceneLoading = false, inView = true, leftPage = false;
    let requestedRoom = isOfficeNight() ? 'residences' : 'all', requestedHome = null;
    let worldConfig = config.initial?.world || {}, live = null, club = null, pilot = null, hologram=null, combat=null, viewport=null, sceneUnavailable = false;
    let energySaver = window.matchMedia('(max-width: 650px)').matches || Number(window.navigator?.hardwareConcurrency || 8) <= 4 || Number(window.navigator?.deviceMemory || 8) <= 4;
    try { const preference = localStorage.getItem('simonpr:office:quality'); if (['low', 'standard'].includes(preference)) energySaver = preference === 'low'; } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches, mode = '3d';
    try { if (localStorage.getItem('simonpr:office:view') === 'list') mode = 'list'; } catch {}
    const visible = () => !document.hidden && inView && !leftPage;
    const text = (id, value) => { $(id).textContent = value; };
    let statusTimer=null,lastStatus='';
    function showStatus(message){text('voPilotStatus',message);text('voQuickStatus',message);if(message===lastStatus)return;lastStatus=message;const toast=$('voQuickStatus').parentElement;toast?.classList.add('vo-toast-visible');clearTimeout(statusTimer);statusTimer=setTimeout(()=>{toast?.classList.remove('vo-toast-visible');lastStatus='';},4500);}
    let activityRequest = null, activityTicket = 0, avatarRequest = null, editorReturnFocus = null;
    const officeDate = () => new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10);
    $('voActivityDate').value = officeDate(); $('voActivityDate').max = officeDate();
    $('voActivityDate').min = new Date(Date.now() + 7 * 3600000 - 29 * 86400000).toISOString().slice(0, 10);
    function stopActivity() { activityTicket++; activityRequest?.abort(); activityRequest = null; $('voLoadActivity').disabled = false; }
    function portrait(host, value) {
        const a = safeAvatar(value),costume=(config.costumes||[]).find(c=>c.id===a.costume);host.replaceChildren();host.className = `vo-avatar-preview vo-look-${costume?.style||a.style} vo-hair-${costume?(costume.hairStyle==='long'?'long':costume.hairStyle==='bob'?'bob':'short'):a.hair} vo-outfit-${costume?'casual':a.outfit} vo-accessory-${a.accessory}`;
        if(costume){host.className+=' vo-costume';host.style.setProperty('--vo-hair',costume.hair);host.style.setProperty('--vo-pants',costume.pants);}
        host.style.setProperty('--vo-shirt', { emerald: '#547a71', navy: '#405978', rose: '#b97988', cream: '#d3bc96', lavender: '#9682ae', terracotta: '#bb8265' }[a.color]);
        host.style.setProperty('--vo-skin', { light: '#efd0ae', warm: '#dba77d', tan: '#bc8762', deep: '#895e46' }[a.skin]);
        if(costume)host.style.setProperty('--vo-shirt',costume.shirt);
        for (const part of ['halo', 'hair', 'ear-left', 'ear-right', 'neck', 'body', 'arm-left', 'arm-right', 'leg-left', 'leg-right', 'face', 'fringe', 'eyes', 'smile', 'glasses', 'phones']) { const node = document.createElement('span'); node.className = `vo-doll-${part}`; host.append(node); }
    }
    function chatActions(person) {
        const meeting = live?.state();
        const partner = meeting?.room && (meeting.room.from === Number(config.myId) ? meeting.room.to : meeting.room.from);
        const ready = Boolean(meeting?.ready && partner === person.id && person.state !== 'offline');
        $('voChat').disabled = !config.canMeet || person.is_me || person.state === 'offline' || !person.can_talk;
        $('voInviteMeeting').disabled = !config.canMeet || person.is_me || person.state === 'offline' || !person.can_talk || Boolean(meeting?.room);
        text('voChatNote', !config.canMeet ? 'Akun ini tidak mengirim percakapan pada avatar.' : person.is_me ? 'Ini avatar Anda.' : person.state === 'offline' ? 'Rekan sedang offline. Ajak bermain untuk menghadapi versi komputer.' : 'Ketik langsung di kawasan. Pesan dan gelembung hanya diterima Anda dan rekan ini.');
        text('voChat', 'Chat langsung 💬');
    }
    function personButton(person) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'vo-person';
        button.dataset.personId = person.id; button.setAttribute('aria-pressed', String(selected === person.id));
        const avatar = document.createElement('span'); avatar.className = 'vo-person-avatar'; avatar.style.setProperty('--avatar-bg', palette[person.id % palette.length]); avatar.textContent = initials(person.name);
        const pose = document.createElement('small'), posture = poseFor(person); pose.textContent = posture === 'sleeping' ? '🏠' : posture === 'playing' ? gameFor(person).icon : posture === 'coffee' ? '☕' : posture === 'eating' ? '🍽' : posture === 'resting' ? '🛋' : person.mood || '';
        avatar.append(pose);
        const info = document.createElement('span'); info.className = 'vo-person-info';
        const name = document.createElement('b'); name.textContent = person.name;
        if (person.is_me) { const me = document.createElement('small'); me.textContent = 'ANDA'; name.append(me); }
        const status = document.createElement('span'); const dot = document.createElement('i'); dot.className = `vo-dot ${person.state}`;
        status.append(dot, document.createTextNode(stateLabel[person.state])); info.append(name, status);
        const arrow = document.createElement('span'); arrow.className = 'vo-person-arrow'; arrow.textContent = '↗';
        button.append(avatar, info, arrow); button.addEventListener('click', () => select(person.id, true)); return button;
    }
    function renderPeople() {
        const query = $('voSearch').value.toLocaleLowerCase('id').trim();
        const list = people.filter(p => (filter === 'all' || p.department === filter) && p.name.toLocaleLowerCase('id').includes(query))
            .sort((a, b) => ({ online: 0, idle: 1, offline: 2 }[a.state] - { online: 0, idle: 1, offline: 2 }[b.state]) || a.name.localeCompare(b.name, 'id'));
        for (const id of ['voPeople', 'voLightPeople']) {
            const host = $(id), previousScroll = host.scrollTop, focused = host.contains(document.activeElement) ? document.activeElement.dataset?.personId : null;
            host.replaceChildren(...list.map(personButton)); host.scrollTop = previousScroll;
            if (!list.length) { const empty = document.createElement('p'); empty.className = 'vo-empty'; empty.textContent = people.length ? 'Tidak ada anggota yang cocok. Coba nama atau bidang lain.' : 'Belum ada anggota yang dapat ditampilkan.'; host.append(empty); }
            if (focused) host.querySelector(`[data-person-id="${Number(focused)}"]`)?.focus({ preventScroll: true });
        }
    }
    function select(id, focus = false) {
        const person = people.find(p => p.id === id)||(id===config.privateSelf?.id?config.privateSelf:null); if (!person) return;
        if (selected !== id) { requestedHome = null; stopActivity(); $('voActivityList').replaceChildren(); text('voActivityStatus', 'Pilih tanggal lalu lihat aktivitas menu.'); }
        selected = id; combat?.pose?.(); $('voDetail').hidden = false;
        portrait($('voDetailAvatar'), person.avatar);
        text('voDetailDept', person.department === 'umum' ? 'BIDANG UMUM' : 'BIDANG OPERASIONAL');
        text('voDetailName', person.name); text('voDetailStatus', `${stateLabel[person.state]} · ${poseFor(person) === 'playing' ? 'Simulasi '+gameFor(person).name : poseLabel[poseFor(person)]}`);
        text('voCurrentMenu', person.state === 'offline' ? 'Offline · menu tidak dilacak' : person.current_menu || (person.share_activity ? 'Belum tersedia / halaman lain' : 'Aktivitas tidak dibagikan'));
        $('voEditOwnAvatar').hidden = !person.is_me;
        text('voDetailMood', person.mood || '✧');
        text('voHomeStatus', poseFor(person) === 'sleeping' ? 'Penghuni beristirahat di kasur rumahnya. Pilih Lihat rumah untuk membuka tampilan interior.' : 'Rumah pribadi tetap tersedia; penghuni sedang berada di area lain.');
        text('voDetailNote', 'Kehadiran mengikuti heartbeat aplikasi. Pose avatar hanya ilustrasi; tidak menunjukkan aktivitas fisik atau produktivitas anggota tim.');
        chatActions(person);
        if (focus) {
            viewport?.show('team');
            if (!document.fullscreenElement && !$('voWorkspace').classList.contains('vo-expanded') && window.matchMedia('(max-width: 950px)').matches) $('voDetail').scrollIntoView?.({ block: 'nearest', behavior: paused ? 'auto' : 'smooth' });
        }
        scene?.select(id, focus&&!combat?.armed?.()); renderPeople(); club?.select(id); if(focus&&person.is_me)hologram?.open();else if (focus&&!combat?.armed?.()) club?.chat(id, false);
    }
    function apply(snapshot) {
        people = safePeople(snapshot).map(person => person.is_me
            ? { ...person, state: typeof window.SimonPresenceIdle === 'function' && window.SimonPresenceIdle() ? 'idle' : 'online' }
            : person);
        const count = state => people.filter(p => p.state === state).length;
        text('voOnline', count('online')); text('voIdle', count('idle')); text('voOffline', count('offline')); text('voTotal', people.length);
        const stamp = new Date(snapshot?.updated_at);
        text('voSync', `Diperbarui ${Number.isNaN(stamp.valueOf()) ? 'baru saja' : stamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}${snapshot?.limited ? ' · Maksimal 120 anggota' : ''}`);
        if (selected !== null && selected!==config.privateSelf?.id && !people.some(p => p.id === selected)) closeDetail();
        renderPeople(); scene?.setPeople(people);
        if (snapshot?.world) { worldConfig = snapshot.world; scene?.configureWorld?.(worldConfig); }
        if (selected !== null) select(selected);
        text('voDayPhase', isOfficeNight() ? '17.00–07.00 WIB · tidur di rumah masing-masing' : '07.00–17.00 WIB · avatar offline berekreasi');
    }
    let feedUrl;
    try { feedUrl = new URL(config.feedUrl, window.location.origin); if (feedUrl.origin !== window.location.origin || feedUrl.pathname !== '/virtual-office/presence') throw new Error('Alamat kehadiran tidak valid.'); }
    catch { text('voSync', 'Kehadiran belum tersedia. Muat ulang halaman.'); }
    const loop = createOfficeReadLoop({ visible,
        read: async signal => {
            if (!feedUrl) throw new Error('Kehadiran belum tersedia. Muat ulang halaman.');
            const response = await fetch(feedUrl, { signal, credentials: 'same-origin', headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, cache: 'no-store' });
            if (!response.ok) { const error = new Error(response.status === 401 ? 'Sesi berakhir. Silakan login kembali.' : response.status === 403 ? 'Akses kehadiran tidak tersedia.' : 'Kehadiran belum diperbarui. Coba lagi sebentar.'); error.status = response.status; throw error; }
            return response.json();
        }, onData: apply, onError: error => text('voSync', error.message) });
    async function ensureScene() {
        if (scene || sceneLoading || sceneUnavailable || mode !== '3d' || !visible()) return;
        const ticket = ++sceneTicket; sceneLoading = true; $('voLoading').hidden = false;
        try {
            const { createOfficeScene } = await import('./virtual-office-scene.js');
            if (ticket !== sceneTicket || mode !== '3d' || !visible()) return;
            scene = createOfficeScene({ host: $('voScene'), labels: $('voLabels'), onSelect: id => select(id, true),onCombatFire:special=>combat?.fire?.(special),onAimChange:value=>{combat?.aimState?.(value);if(value)viewport?.closePanels();},onHologramAnchor:point=>hologram?.anchor?.(point), onVenue: venue => venue==='armory'?combat?.open?.():club?.openVenue?.(venue), onGame: id=>club?.openGame?.(id), onDoor:()=>pilot?.toggleDoor?.(), onFailure: () => { sceneUnavailable = true; switchView('list', false); text('voSync', 'Ruang 3D tidak tersedia. Tim tetap dapat dilihat di mode ringan.'); } });
            scene.configureHome?.(Number(config.myId),config.myHome,config.homePlots);scene.setPeople(people); scene.setPaused(paused); scene.setVisible(visible());
            scene.configureWorld?.(worldConfig); scene.setEnergySaver?.(energySaver);
            scene.focusRoom(requestedRoom);
            if (selected) scene.select(selected, true);
            if (requestedHome !== null) scene.visitHome?.(requestedHome);
            if (live) scene.setMeeting?.(live.state());
            club?.syncScene();
            pilot?.start();
            hologram?.sync();
            if (['follow', 'portrait'].includes($('voCameraMode').value)) scene.setCameraMode?.($('voCameraMode').value, selected || people.find(p => p.is_me)?.id);
        } catch {
            if (ticket === sceneTicket) { sceneUnavailable = true; switchView('list', false); text('voSync', 'Ruang 3D belum dapat dibuka. Mode ringan tetap tersedia.'); }
        } finally { if (ticket === sceneTicket) { sceneLoading = false; $('voLoading').hidden = true; } }
    }
    function switchView(next, persist = true) {
        mode = next; sceneTicket++; sceneLoading = false;
        $('voView3d').setAttribute('aria-pressed', String(mode === '3d')); $('voViewList').setAttribute('aria-pressed', String(mode === 'list'));
        $('voScene').hidden = mode !== '3d';if($('voPilotControls'))$('voPilotControls').hidden=mode!=='3d';if($('voTouchControls'))$('voTouchControls').hidden=mode!=='3d'; $('voLabels').hidden = mode !== '3d'; $('voLightView').hidden = mode !== 'list'; $('voLoading').hidden = true;
        if (persist) try { localStorage.setItem('simonpr:office:view', mode); } catch {}
        if (mode === 'list') { pilot?.stop();scene?.dispose(); scene = null; } else ensureScene();
        $('voSceneHint').textContent = mode === '3d' ? 'Putar ruang dengan geser · Gulir untuk mendekat' : 'Pilih anggota untuk melihat detail dan membuka chat';
    }
    function lifecycle() {
        if (!visible()) { loop.stop(); live?.stop(); club?.stop();pilot?.stop(); stopActivity(); scene?.setVisible(false); }
        else { if (feedUrl) loop.start(true); live?.start(true); club?.start(true);if(mode==='3d')pilot?.start(); scene?.setVisible(mode === '3d'); ensureScene(); }
    }
    $('voSearch').addEventListener('input', renderPeople);
    root.querySelectorAll('[data-vo-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.voFilter; root.querySelectorAll('[data-vo-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); renderPeople(); }));
    function focusArea(room) { requestedRoom = room; requestedHome = null; $('voCameraMode').value = 'orbit'; if (mode !== '3d') switchView('3d'); scene?.focusRoom(room); }
    root.querySelectorAll('[data-vo-room]').forEach(button => button.addEventListener('click', () => { root.querySelectorAll('[data-vo-room]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); focusArea(button.dataset.voRoom); }));
    function closeDetail(){stopActivity();selected=null;combat?.pose?.();requestedHome=null;$('voDetail').hidden=true;scene?.select(null);renderPeople();}
    $('voCloseDetail').addEventListener('click', closeDetail);
    $('voVisitHome').addEventListener('click', () => { if (selected === null) return; requestedHome = selected;if(mode!=='3d')switchView('3d');scene?.visitHome?.(selected); text('voSceneHint', 'Interior rumah terpilih · tutup detail untuk menutup atap kembali'); });
    $('voView3d').addEventListener('click', () => { sceneUnavailable = false; switchView('3d'); }); $('voViewList').addEventListener('click', () => switchView('list'));
    $('voZoomIn').addEventListener('click', () => scene?.zoom(.82)); $('voZoomOut').addEventListener('click', () => scene?.zoom(1.22)); $('voReset').addEventListener('click', () => focusArea('all'));
    function motionButton() { $('voMotion').setAttribute('aria-pressed', String(paused)); $('voMotion').setAttribute('aria-label', paused ? 'Lanjutkan animasi' : 'Jeda animasi'); $('voMotion').textContent = paused ? '▷' : 'Ⅱ'; }
    $('voMotion').addEventListener('click', () => { paused = !paused; motionButton(); scene?.setPaused(paused); });
    reduced.addEventListener('change', event => { paused = event.matches; motionButton(); scene?.setPaused(paused); });
    $('voRefresh').addEventListener('click', () => { if (feedUrl) loop.refresh(true); });
    $('voFindMe').addEventListener('click', () => { const me = people.find(p => p.is_me); if (me) select(me.id, true); else text('voSync', 'Akun Anda tidak ditampilkan dalam kehadiran tim. Pengaturan avatar tetap tersedia.'); });
    $('voCameraMode').addEventListener('change', () => { const id = selected || people.find(p => p.is_me)?.id; if (!id && $('voCameraMode').value !== 'orbit') { text('voLiveStatus', 'Pilih avatar melalui daftar tim terlebih dahulu.'); $('voCameraMode').value = 'orbit'; return; } if (mode !== '3d') switchView('3d'); scene?.setCameraMode?.($('voCameraMode').value, id); });
    $('voQuality').value = energySaver ? 'low' : 'standard';
    $('voQuality').addEventListener('change', () => { energySaver = $('voQuality').value === 'low'; scene?.setEnergySaver?.(energySaver); try { localStorage.setItem('simonpr:office:quality', energySaver ? 'low' : 'standard'); } catch {} });
    $('voInviteMeeting').addEventListener('click', () => { if (selected !== null) { if (mode !== '3d') switchView('3d'); live?.invite(selected); } });
    $('voChat').addEventListener('click', () => { if (selected !== null) club?.chat(selected); });
    viewport=mountOfficeViewport({document,getScene:()=>scene,onEscape:()=>{if(combat?.escape?.())return true;if(!$('voAvatarEditor').hidden){closeEditor();return true;}if(hologram?.escape())return true;if(config.canConfigureWorld&&!$('voWorldPanel').hidden){$('voWorldPanel').hidden=true;$('voOpenWorld').focus();return true;}if(selected!==null){closeDetail();return true;}return false;},onEnter:()=>{if(mode!=='3d')switchView('3d');scene?.followPilot?.();}});
    for (const game of games) {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = `${game.icon} ${game.name}`; button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => { if(mode!=='3d')switchView('3d');club?.openGame(game.id); $('voGames').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button))); text('voSceneHint', `${game.name} · pilih Mulai untuk bermain`); }); $('voGames').append(button);
    }
    $('voActivityDate').addEventListener('change', () => { stopActivity(); $('voActivityList').replaceChildren(); text('voActivityStatus', 'Tekan Lihat aktivitas menu untuk tanggal ini.'); });
    $('voLoadActivity').addEventListener('click', async () => {
        const person = people.find(p => p.id === selected); if (!person) return;
        stopActivity(); const ticket = activityTicket, id = person.id, controller = new AbortController(); activityRequest = controller;
        $('voLoadActivity').disabled = true; text('voActivityStatus', 'Membaca riwayat menu…'); $('voActivityList').replaceChildren();
        const deadline = setTimeout(() => controller.abort(), 12000);
        try {
            const response = await fetch(`/virtual-office/people/${id}/activity?date=${encodeURIComponent($('voActivityDate').value || officeDate())}`, { signal: controller.signal, credentials: 'same-origin', cache: 'no-store', headers: { Accept: 'application/json' } });
            if (!response.ok) throw new Error(response.status === 403 ? 'Anggota ini tidak membagikan aktivitas menu.' : response.status === 422 ? 'Pilih tanggal dalam 30 hari terakhir.' : 'Riwayat belum dapat dibuka. Coba lagi.');
            const data = await response.json(); if (ticket !== activityTicket || selected !== id || controller.signal.aborted || !visible()) return;
            const visits = Array.isArray(data.visits) ? data.visits.slice(0, 100) : [];
            visits.forEach(visit => { const row = document.createElement('li'), stamp = new Date(visit.at); row.textContent = `${Number.isNaN(stamp.valueOf()) ? '—' : stamp.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })} WIB · ${String(visit.menu || '').slice(0, 60)}`; $('voActivityList').append(row); });
            text('voActivityStatus', visits.length ? `${visits.length} kunjungan${data.limited ? ' terbaru (batas tampilan)' : ''}. Bukan durasi aktif.` : 'Belum ada kunjungan menu yang tercatat pada tanggal ini.');
        } catch (error) { if (ticket === activityTicket && visible()) text('voActivityStatus', controller.signal.aborted ? 'Permintaan berhenti. Coba lagi.' : error.message); }
        finally { clearTimeout(deadline); if (ticket === activityTicket) { activityRequest = null; $('voLoadActivity').disabled = false; } }
    });
    const captions = { costume: 'Kostum anime / karakter', style: 'Gaya avatar', hair: 'Rambut / penutup kepala', outfit: 'Pakaian', color: 'Warna pakaian', skin: 'Warna kulit', accessory: 'Aksesori', game: 'Permainan favorit' };
    const choices = { feminine: 'Feminin', masculine: 'Maskulin', short: 'Pendek', bob: 'Bob', long: 'Panjang', ponytail: 'Kuncir', hijab: 'Hijab', blazer: 'Blazer', casual: 'Kasual', sport: 'Olahraga', dress: 'Gaun', emerald: 'Emerald', navy: 'Navy', rose: 'Rose', cream: 'Champagne', lavender: 'Lavender', terracotta: 'Terracotta', light: 'Cerah', warm: 'Hangat', tan: 'Sawo matang', deep: 'Gelap', none: 'Tanpa aksesori', glasses: 'Kacamata', headphones: 'Headphone' };
    const avatarFields = new Map(); let profile = config.myProfile || { avatar: safeAvatar(), share_activity: true, version: 0 };
    const avatarDraft = () => Object.fromEntries([...avatarFields].map(([key, select]) => [key, select.value]));
    for (const [key, options] of Object.entries(config.avatarOptions || {})) {
        if (!Object.hasOwn(captions, key) || !Array.isArray(options)) continue;
        const label = document.createElement('label'), caption = document.createElement('span'), select = document.createElement('select'); caption.textContent = captions[key];
        select.name = key; options.forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = key==='costume'?(value==='none'?'Pakaian pribadi':((config.costumes||[]).find(c=>c.id===value)?.anime+' · '+(config.costumes||[]).find(c=>c.id===value)?.name)):choices[value] || games.find(g => g.id === value)?.name || value; select.append(option); });
        select.addEventListener('change', () => portrait($('voAvatarPreview'), avatarDraft())); label.append(caption, select); $('voAvatarFields').append(label); avatarFields.set(key, select);
    }
    function openEditor() {
        editorReturnFocus = document.activeElement;
        avatarFields.forEach((select, key) => { select.value = profile.avatar[key]; }); $('voShareActivity').checked = profile.share_activity;
        portrait($('voAvatarPreview'), profile.avatar); text('voAvatarStatus', 'Hanya avatar akun Anda yang dapat disimpan.');
        if (document.fullscreenElement) document.fullscreenElement.append($('voAvatarEditor'));
        $('voAvatarEditor').hidden = false; $('voAvatarEditor').focus();
    }
    function closeEditor() { if (!$('voAvatarEditor').hidden) { $('voAvatarEditor').hidden = true; editorReturnFocus?.focus(); } }
    $('voOpenAvatar').addEventListener('click', openEditor); $('voEditOwnAvatar').addEventListener('click', openEditor); $('voCloseAvatar').addEventListener('click', closeEditor);
    $('voAvatarEditor').addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const elements = [...$('voAvatarEditor').querySelectorAll('button:not(:disabled), select, input')], first = elements[0], last = elements.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === $('voAvatarEditor'))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
    $('voAvatarForm').addEventListener('submit', async event => {
        event.preventDefault(); if (avatarRequest) return;
        const controller = new AbortController(); avatarRequest = controller; $('voSaveAvatar').disabled = true; text('voAvatarStatus', 'Menyimpan avatar…');
        const deadline = setTimeout(() => controller.abort(), 12000);
        try {
            const url = new URL(config.profileUrl, window.location.origin); if (url.origin !== window.location.origin || url.pathname !== '/virtual-office/avatar') throw new Error('Alamat pengaturan tidak valid.');
            const response = await fetch(url, { method: 'POST', signal: controller.signal, credentials: 'same-origin', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' }, body: JSON.stringify({ avatar: avatarDraft(), share_activity: $('voShareActivity').checked, version: profile.version }) });
            if (!response.ok) throw new Error(response.status === 409 ? 'Avatar berubah di tab lain. Muat ulang halaman sebelum menyimpan.' : response.status === 419 || response.status === 401 ? 'Sesi berakhir. Muat ulang dan login kembali.' : 'Avatar belum tersimpan. Periksa koneksi lalu coba lagi.');
            const saved = await response.json(); if (controller.signal.aborted) return;
            profile = { avatar: safeAvatar(saved.avatar), share_activity: saved.share_activity === true, version: saved.version };
            if(scene?.activeTransformation?.())pilot?.endMode?.();
            skillButtons(profile.avatar);
            people = people.map(p => p.is_me ? { ...p, avatar: profile.avatar, share_activity: profile.share_activity } : p);
            if(config.privateSelf){config.privateSelf.avatar=profile.avatar;scene?.setPrivatePilotProfile?.(profile.avatar);}
            scene?.setPeople(people); renderPeople(); if (selected !== null) select(selected); loop.refresh(true); text('voAvatarStatus', 'Avatar tersimpan. Rekan tim akan melihat perubahan pada pembaruan berikutnya.');
        } catch (error) { text('voAvatarStatus', controller.signal.aborted ? 'Waktu simpan habis. Muat ulang untuk memeriksa hasilnya.' : error.message); }
        finally { clearTimeout(deadline); avatarRequest = null; $('voSaveAvatar').disabled = false; }
    });
    document.addEventListener('visibilitychange', lifecycle);
    window.addEventListener('pagehide', () => { leftPage = true; loop.stop(); live?.stop(); club?.stop();pilot?.stop(); stopActivity(); avatarRequest?.abort(); scene?.setVisible(false); });
    window.addEventListener('pageshow', event => { if (event.persisted) { leftPage = false; lifecycle(); } });
    if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { const next = entries[0].isIntersecting; if (next !== inView) { inView = next; lifecycle(); } }, { rootMargin: '120px' }); observer.observe($('voWorkspace')); }
    root.querySelectorAll('[data-vo-room]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.voRoom === requestedRoom)));
    live = mountOfficeLive({ document, config, visible, getScene: () => scene, getPeople: () => people,
        onWorld: value => { worldConfig = value; scene?.configureWorld?.(value); },
        onRoom: value => { scene?.setMeeting?.(value); const person = people.find(p => p.id === selected); if (person) chatActions(person); if (value.room?.status === 'accepted' && mode !== '3d' && !sceneUnavailable) { switchView('3d'); text('voLiveStatus', 'Ruang 3D dibuka agar kedua avatar dapat bertatap muka.'); } } });
    pilot=mountOfficePilot({document,window,config,visible,getScene:()=>scene,onStatus:showStatus,onPose:value=>{modeHud(value);combat?.pose?.(value);if($('voInteriorStatus'))$('voInteriorStatus').hidden=!value.interior;if($('voHomeDoor')){$('voHomeDoor').disabled=!value.atHome&&!value.nearDoor;$('voHomeDoor').textContent=value.doorOpen?'Tutup pintu':'Buka pintu';}if(value.target)text('voPilotTarget',`${(value.target==='home'?'Rumah saya':games.find(g=>g.id===value.target)?.name)||value.target} · ${value.distance} m · ikuti penanda emas`);}});
    club = mountOfficeClub({ document, config, visible, getPeople: () => people, getScene: () => scene, focusArea, requireVenue:id=>pilot.interact(id) });
    hologram=mountOfficeHologram({document,window,config,getScene:()=>scene,onOpen:()=>viewport?.closePanels(),onWork:()=>pilot?.suspendInput?.(),onActivity:()=>document.dispatchEvent(new Event('pointermove'))});
    combat=mountOfficeCombat({document,window,config,visible,getScene:()=>scene,getTarget:()=>selected,getPeople:()=>people,onOpen:()=>viewport?.closePanels(),onStatus:showStatus});apply(config.initial); motionButton(); switchView(mode, false); if (feedUrl) loop.start(); live.start(); club.start();
}
