import { safePeople, poseFor, initials, stateLabel, poseLabel, createOfficeReadLoop } from './virtual-office-state.js';

const root = document.getElementById('virtualOffice');
if (root && !root.dataset.initialized) {
    root.dataset.initialized = '1';
    const $ = id => document.getElementById(id);
    const config = JSON.parse($('voConfig').textContent);
    const palette = ['#dce9df', '#eadfcc', '#dde5f1', '#e8dce5', '#d3e8e4', '#f0dfce'];
    let people = [], filter = 'all', selected = null, scene = null, sceneTicket = 0, sceneLoading = false, inView = true, leftPage = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches, mode = '3d';
    try { if (localStorage.getItem('simonpr:office:view') === 'list') mode = 'list'; } catch {}
    const visible = () => !document.hidden && inView && !leftPage;
    const text = (id, value) => { $(id).textContent = value; };
    function personButton(person) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'vo-person';
        button.dataset.personId = person.id; button.setAttribute('aria-pressed', String(selected === person.id));
        const avatar = document.createElement('span'); avatar.className = 'vo-person-avatar'; avatar.style.setProperty('--avatar-bg', palette[person.id % palette.length]); avatar.textContent = initials(person.name);
        const pose = document.createElement('small'); pose.textContent = person.state === 'offline' ? '💤' : person.state === 'idle' ? (poseFor(person) === 'coffee' ? '☕' : poseFor(person) === 'eating' ? '🍽' : '💤') : person.mood || '';
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
        const person = people.find(p => p.id === id); if (!person) return;
        selected = id; $('voDetail').hidden = false;
        text('voDetailAvatar', initials(person.name)); $('voDetailAvatar').style.setProperty('--avatar-bg', palette[person.id % palette.length]);
        text('voDetailDept', person.department === 'umum' ? 'BIDANG UMUM' : 'BIDANG OPERASIONAL');
        text('voDetailName', person.name); text('voDetailStatus', `${stateLabel[person.state]} · ${poseLabel[poseFor(person)]}`);
        text('voDetailMood', person.mood || '✧');
        text('voDetailNote', 'Kehadiran mengikuti heartbeat aplikasi. Pose avatar hanya ilustrasi; tidak menunjukkan aktivitas fisik atau produktivitas anggota tim.');
        $('voChat').disabled = !config.canChat || person.is_me;
        text('voChatNote', !config.canChat ? 'Mode Viewer: Anda dapat melihat tim, tanpa mengirim pesan.' : person.is_me ? 'Ini adalah avatar Anda di ruang virtual.' : 'Membuka draf mention; pesan dikirim setelah Anda menekan Kirim.');
        scene?.select(id, focus); renderPeople();
    }
    function apply(snapshot) {
        people = safePeople(snapshot).map(person => person.is_me
            ? { ...person, state: typeof window.SimonPresenceIdle === 'function' && window.SimonPresenceIdle() ? 'idle' : 'online' }
            : person);
        const count = state => people.filter(p => p.state === state).length;
        text('voOnline', count('online')); text('voIdle', count('idle')); text('voOffline', count('offline')); text('voTotal', people.length);
        const stamp = new Date(snapshot?.updated_at);
        text('voSync', `Diperbarui ${Number.isNaN(stamp.valueOf()) ? 'baru saja' : stamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}${snapshot?.limited ? ' · Maksimal 120 anggota' : ''}`);
        if (selected !== null && !people.some(p => p.id === selected)) { selected = null; $('voDetail').hidden = true; }
        renderPeople(); scene?.setPeople(people);
        if (selected !== null) select(selected);
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
        if (scene || sceneLoading || mode !== '3d' || !visible()) return;
        const ticket = ++sceneTicket; sceneLoading = true; $('voLoading').hidden = false;
        try {
            const { createOfficeScene } = await import('./virtual-office-scene.js');
            if (ticket !== sceneTicket || mode !== '3d' || !visible()) return;
            scene = createOfficeScene({ host: $('voScene'), labels: $('voLabels'), onSelect: id => select(id), onFailure: () => { switchView('list', false); text('voSync', 'Ruang 3D tidak tersedia. Tim tetap dapat dilihat di mode ringan.'); } });
            scene.setPeople(people); scene.setPaused(paused); scene.setVisible(visible());
            if (selected) scene.select(selected);
        } catch {
            if (ticket === sceneTicket) { switchView('list', false); text('voSync', 'Ruang 3D belum dapat dibuka. Mode ringan tetap tersedia.'); }
        } finally { if (ticket === sceneTicket) { sceneLoading = false; $('voLoading').hidden = true; } }
    }
    function switchView(next, persist = true) {
        mode = next; sceneTicket++; sceneLoading = false;
        $('voView3d').setAttribute('aria-pressed', String(mode === '3d')); $('voViewList').setAttribute('aria-pressed', String(mode === 'list'));
        $('voScene').hidden = mode !== '3d'; $('voLabels').hidden = mode !== '3d'; $('voLightView').hidden = mode !== 'list'; $('voLoading').hidden = true;
        if (persist) try { localStorage.setItem('simonpr:office:view', mode); } catch {}
        if (mode === 'list') { scene?.dispose(); scene = null; } else ensureScene();
        $('voSceneHint').textContent = mode === '3d' ? 'Putar ruang dengan geser · Gulir untuk mendekat' : 'Pilih anggota untuk melihat detail dan membuka chat';
    }
    function lifecycle() {
        if (!visible()) { loop.stop(); scene?.setVisible(false); }
        else { if (feedUrl) loop.start(true); scene?.setVisible(mode === '3d'); ensureScene(); }
    }
    $('voSearch').addEventListener('input', renderPeople);
    root.querySelectorAll('[data-vo-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.voFilter; root.querySelectorAll('[data-vo-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); renderPeople(); }));
    root.querySelectorAll('[data-vo-room]').forEach(button => button.addEventListener('click', () => { root.querySelectorAll('[data-vo-room]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); scene?.focusRoom(button.dataset.voRoom); }));
    $('voCloseDetail').addEventListener('click', () => { selected = null; $('voDetail').hidden = true; scene?.select(null); renderPeople(); });
    $('voView3d').addEventListener('click', () => switchView('3d')); $('voViewList').addEventListener('click', () => switchView('list'));
    $('voZoomIn').addEventListener('click', () => scene?.zoom(.82)); $('voZoomOut').addEventListener('click', () => scene?.zoom(1.22)); $('voReset').addEventListener('click', () => scene?.focusRoom('all'));
    function motionButton() { $('voMotion').setAttribute('aria-pressed', String(paused)); $('voMotion').setAttribute('aria-label', paused ? 'Lanjutkan animasi' : 'Jeda animasi'); $('voMotion').textContent = paused ? '▷' : 'Ⅱ'; }
    $('voMotion').addEventListener('click', () => { paused = !paused; motionButton(); scene?.setPaused(paused); });
    reduced.addEventListener('change', event => { paused = event.matches; motionButton(); scene?.setPaused(paused); });
    $('voRefresh').addEventListener('click', () => { if (feedUrl) loop.refresh(true); });
    $('voChat').addEventListener('click', () => { const person = people.find(p => p.id === selected); if (!config.canChat || !person || person.is_me) return; if (typeof window.SimonOfficeMention !== 'function' || !window.SimonOfficeMention(person)) text('voChatNote', 'Chat belum siap atau draf penuh. Buka Chat Tim melalui tombol chat, lalu coba lagi.'); });
    $('voFullscreen').addEventListener('click', async () => {
        const workspace = $('voWorkspace');
        try { if (document.fullscreenElement === workspace) await document.exitFullscreen(); else if (workspace.requestFullscreen) await workspace.requestFullscreen(); else workspace.classList.toggle('vo-expanded'); }
        catch { workspace.classList.toggle('vo-expanded'); }
        scene?.resize();
    });
    document.addEventListener('fullscreenchange', () => scene?.resize());
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('voWorkspace').classList.remove('vo-expanded'); scene?.resize(); } });
    document.addEventListener('visibilitychange', lifecycle);
    window.addEventListener('pagehide', () => { leftPage = true; loop.stop(); scene?.setVisible(false); });
    window.addEventListener('pageshow', event => { if (event.persisted) { leftPage = false; lifecycle(); } });
    if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { const next = entries[0].isIntersecting; if (next !== inView) { inView = next; lifecycle(); } }, { rootMargin: '120px' }); observer.observe($('voWorkspace')); }
    apply(config.initial); motionButton(); switchView(mode, false); if (feedUrl) loop.start();
}
