import { createOfficeReadLoop } from './virtual-office-state.js';
import { weatherFor, weatherLabels } from './virtual-office-world-state.js';

export function mountOfficeLive({ document: doc, config, visible, getScene, getPeople, onRoom = () => {}, onWorld = () => {} }) {
    const $ = id => doc.getElementById(id), text = (id, value) => { if ($(id)) $(id).textContent = value; };
    let state = { room: null, ready: false, connected: false }, delay = 8000, busy = false, world = config.initial?.world || {}, draftVersion = 0;
    function applyWorld(value) {
        if (!value?.settings) return; world = value; onWorld(value);
        const weather = weatherFor(value.settings, value.server_ms || Date.now());
        const time = new Date(weather.next).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' });
        text('voWeatherStatus', `${weatherLabels[weather.mode]} · ${value.settings.weather === 'auto' ? `berganti ${time} WIB` : 'pilihan pengelola'} · cuaca virtual`);
    }
    function render(data) {
        state = data; delay = data.room ? 3000 : 8000; applyWorld(data.world); onRoom(data);
        const room = data.room, incoming = room?.status === 'pending' && room.to === Number(config.myId);
        $('voMeetingPanel').hidden = !room;
        $('voMeetingAccept').hidden = !incoming; $('voMeetingDecline').hidden = !incoming;
        $('voMeetingEnd').hidden = !room || incoming;
        $('voOfficeChatForm').hidden = room?.status !== 'accepted';
        $('voOfficeChatSend').disabled = !data.ready || !config.canMeet || busy;
        const peerName = room ? (room.from === Number(config.myId) ? room.to_name : room.from_name) : '';
        text('voMeetingTitle', incoming ? `${peerName} mengundang bertemu` : room?.status === 'pending' ? `Menunggu ${peerName}` : `Bertemu ${peerName}`);
        text('voMeetingStatus', !room ? '' : room.status === 'pending' ? 'Undangan berlaku 3 menit. Pertemuan dimulai setelah rekan menerima.' : !data.connected ? 'Menunggu kedua peserta terhubung ke Kantor Virtual…' : !data.ready ? 'Jalan mendekati rekan, lalu klik avatarnya untuk saling menghadap.' : 'Tatap muka siap · pesan diperbarui setiap 3 detik.');
        const host = $('voOfficeMessages'), previousScroll = host.scrollTop, atBottom = host.scrollHeight - host.scrollTop - host.clientHeight < 60;
        host.replaceChildren();
        for (const message of (Array.isArray(data.messages) ? data.messages : []).slice(-30)) {
            const item = doc.createElement('p'), who = doc.createElement('b'), body = doc.createElement('span');
            who.textContent = Number(message.user_id) === Number(config.myId) ? 'Anda' : peerName;
            body.textContent = String(message.message || '').slice(0, 500); item.append(who, body); host.append(item);
        }
        host.scrollTop = atBottom ? host.scrollHeight : previousScroll;
    }
    const loop = createOfficeReadLoop({ visible, interval: () => delay,
        read: async signal => {
            const ready = state.room?.status === 'accepted' && getScene()?.meetingReady?.() ? `?ready=${encodeURIComponent(state.room.id)}` : '';
            const response = await fetch('/virtual-office/live'+ready, { signal, credentials: 'same-origin', cache: 'no-store', headers: { Accept: 'application/json' } });
            if (!response.ok) { const error = new Error(response.status === 401 ? 'Sesi berakhir. Silakan login kembali.' : 'Koneksi langsung belum tersedia. Mencoba kembali…'); error.status = response.status; if (response.status === 429) delay = 30000; throw error; }
            return response.json();
        }, onData: render, onError: error => { state = { ...state, ready: false, connected: false }; onRoom(state); $('voOfficeChatSend').disabled = true; text('voMeetingStatus', error.message); text('voLiveStatus', error.message); } });
    async function post(path, body) {
        if (busy) return null; busy = true; $('voOfficeChatSend').disabled = true;
        const controller = new AbortController(), deadline = setTimeout(() => controller.abort(), 12000);
        try {
            const response = await fetch(path, { method: 'POST', signal: controller.signal, credentials: 'same-origin', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': doc.querySelector('meta[name="csrf-token"]')?.content || '' }, body: JSON.stringify(body) });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || result.error || 'Permintaan belum berhasil. Coba lagi.');
            loop.refresh(true); return result;
        } catch (error) { text('voLiveStatus', controller.signal.aborted ? 'Waktu permintaan habis. Periksa hasil sebelum mencoba kembali.' : error.message); return null; }
        finally { clearTimeout(deadline); busy = false; $('voOfficeChatSend').disabled = !state.ready; }
    }
    async function respond(action) { if (state.room) { const result = await post('/virtual-office/meetings/respond', { id: state.room.id, action }); if (result) text('voLiveStatus', action === 'accept' ? 'Undangan diterima. Jalan mendekati rekan lalu klik avatarnya untuk saling menghadap.' : 'Pertemuan ditutup.'); } }
    $('voMeetingAccept').addEventListener('click', () => respond('accept'));
    $('voMeetingDecline').addEventListener('click', () => respond('decline'));
    $('voMeetingEnd').addEventListener('click', () => respond('end'));
    $('voOfficeChatForm').addEventListener('submit', async event => {
        event.preventDefault(); const input = $('voOfficeChatInput'), message = input.value.trim();
        if (!config.canMeet || !state.ready || !state.room || !message || message.length > 350) return;
        const result = await post('/virtual-office/meetings/send', { id: state.room.id, message });
        if (result) { input.value = ''; getScene()?.say?.(config.myId,message); text('voLiveStatus', 'Pesan langsung terkirim di kawasan.'); }
    });
    if (config.canConfigureWorld && $('voWorldForm')) {
        doc.addEventListener('keydown', event => {
            if ($('voWorldPanel').hidden) return;
            if (event.key === 'Escape') { $('voWorldPanel').hidden = true; $('voOpenWorld').focus(); }
            if (event.key === 'Tab') {
                const fields = [...$('voWorldPanel').querySelectorAll('button, select, input')], first = fields[0], last = fields.at(-1);
                if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        });
        $('voOpenWorld').addEventListener('click', () => {
            draftVersion = world.version || 0;
            for (const key of ['landscape', 'weather', 'cycle_hours', 'particles', 'precipitation']) $('voWorld_'+key).value = world.settings?.[key] ?? '';
            for (const key of ['mountains', 'clouds']) $('voWorld_'+key).checked = world.settings?.[key] !== false;
            $('voWorldPanel').hidden = false; $('voWorld_landscape').focus();
        });
        $('voCloseWorld').addEventListener('click', () => { $('voWorldPanel').hidden = true; $('voOpenWorld').focus(); });
        $('voWorldForm').addEventListener('submit', async event => {
            event.preventDefault(); const settings = {};
            for (const key of ['landscape', 'weather', 'particles', 'precipitation']) settings[key] = $('voWorld_'+key).value;
            settings.cycle_hours = Number($('voWorld_cycle_hours').value);
            for (const key of ['mountains', 'clouds']) settings[key] = $('voWorld_'+key).checked;
            const result = await post('/virtual-office/world', { version: draftVersion, settings });
            if (result) { draftVersion = result.version; applyWorld(result); text('voWorldSaveStatus', 'Kawasan tersimpan. Semua pengguna menerima perubahan pada pembaruan berikutnya.'); }
            else text('voWorldSaveStatus', 'Belum tersimpan. Lihat status koneksi; buka ulang panel untuk memuat versi terbaru.');
        });
    }
    applyWorld(world);
    return {
        start(immediate = false) { if (visible()) loop.start(immediate); }, stop() { loop.stop(); },
        async invite(id) {
            const person = getPeople().find(p => p.id === id);
            if (!config.canMeet || !person || person.is_me || person.state === 'offline' || !person.can_talk) return;
            const result = await post('/virtual-office/meetings', { target_id: id });
            if (result) text('voLiveStatus', 'Undangan dikirim. Rekan perlu membuka Kantor Virtual dan menerimanya.');
        }, state: () => state
    };
}
