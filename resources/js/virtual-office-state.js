export const stateLabel = { online: 'Sedang online', idle: 'Jeda di aplikasi', offline: 'Tidak online' };
export const games = [
    { id: 'tennis', name: 'Tenis', icon: '🎾', x: -32, z: -5, kind: 'court' },
    { id: 'badminton', name: 'Badminton', icon: '🏸', x: -32, z: 12, kind: 'court' },
    { id: 'basketball', name: 'Basket', icon: '🏀', x: 32, z: -5, kind: 'court' },
    { id: 'golf', name: 'Mini Golf', icon: '⛳', x: 32, z: 12, kind: 'court' },
    { id: 'uno', name: 'UNO', icon: '🃏', x: -30, z: 28, kind: 'table' },
    { id: 'pingpong', name: 'Tenis Meja', icon: '🏓', x: -18, z: 28, kind: 'table' },
    { id: 'billiards', name: 'Biliar', icon: '🎱', x: -6, z: 28, kind: 'table' },
    { id: 'chess', name: 'Catur', icon: '♟', x: 6, z: 28, kind: 'table' },
    { id: 'foosball', name: 'Foosball', icon: '⚽', x: 18, z: 28, kind: 'table' },
    { id: 'darts', name: 'Dart', icon: '🎯', x: 30, z: 28, kind: 'table' },
    { id: 'arcade', name: 'Arcade Racing', icon: '🎮', x: -12, z: 41, kind: 'table' },
    { id: 'bowling', name: 'Bowling', icon: '🎳', x: 12, z: 41, kind: 'court' },
];
export const poseLabel = { working: 'Di meja kerja', coffee: 'Menikmati kopi', eating: 'Menikmati camilan', resting: 'Bersantai di lounge', sleeping: 'Tidur di rumah pribadi (17.00–07.00 WIB)', playing: 'Bermain di taman rekreasi' };
export function isOfficeNight(date = new Date()) {
    const hour = (date.getUTCHours() + 7) % 24;
    return hour >= 17 || hour < 7;
}
export function gameFor(person, date = new Date()) {
    const favorite = games.find(g => g.id === person.avatar?.game) || games[Number(person.id) % games.length];
    if (person.state !== 'offline' || isOfficeNight(date)) return favorite;
    const round = Math.floor(date.valueOf() / 180000);
    return round % 3 === 0 ? favorite : games[(games.indexOf(favorite) + round + Number(person.id)) % games.length];
}
export function poseFor(person, date = new Date()) {
    if (person.state === 'offline') return isOfficeNight(date) ? 'sleeping' : 'playing';
    if (person.state === 'idle') return ['coffee', 'eating', 'resting'][Number(person.id) % 3];
    return 'working';
}
export function initials(name) { return String(name || '').trim().split(/\s+/u).slice(0, 2).map(x => Array.from(x)[0] || '').join('').toLocaleUpperCase('id'); }
export function safePeople(payload) {
    const seen = new Set();
    return (Array.isArray(payload?.people) ? payload.people : []).slice(0, 120).filter(p => {
        if (!p || !Number.isSafeInteger(p.id) || p.id <= 0 || seen.has(p.id) || !['umum', 'operasional'].includes(p.department) || !Object.hasOwn(stateLabel, p.state)) return false;
        seen.add(p.id); return true;
    }).map(p => ({ id: p.id, name: String(p.name || 'Anggota tim').slice(0, 150), department: p.department,
        state: p.state, mood: String(p.mood || '').slice(0, 40), is_me: p.is_me === true,
        avatar: safeAvatar(p.avatar), share_activity: p.share_activity !== false,
        can_talk: p.can_talk !== false,
        meeting_with: Number.isSafeInteger(p.meeting_with) && p.meeting_with > 0 ? p.meeting_with : null,
        meeting_spot: Number.isInteger(p.meeting_spot) && p.meeting_spot >= 0 && p.meeting_spot < 12 ? p.meeting_spot : null,
        current_menu: typeof p.current_menu === 'string' ? p.current_menu.slice(0, 60) : null }));
}

export function safeAvatar(value = {}) {
    const options = { style: ['feminine', 'masculine'], hair: ['short', 'bob', 'long', 'ponytail', 'hijab'],
        outfit: ['blazer', 'casual', 'sport', 'dress'], color: ['emerald', 'navy', 'rose', 'cream', 'lavender', 'terracotta'],
        skin: ['light', 'warm', 'tan', 'deep'], accessory: ['none', 'glasses', 'headphones'], game: games.map(g => g.id) };
    return Object.fromEntries(Object.entries(options).map(([key, allowed]) => [key, allowed.includes(value?.[key]) ? value[key] : allowed[0]]));
}

// A single request with a deadline covering fetch AND JSON body parsing.
// Timers are completion-driven; stop/supersede cannot be unlocked by old responses.
export function createOfficeReadLoop({ read, onData, onError = () => {}, visible = () => true,
    setTimer = setTimeout, clearTimer = clearTimeout, timeout = 12000, interval = 45000 }) {
    let timer = null, deadline = null, controller = null, sequence = 0, running = false, enabled = false;
    function clear() { if (timer !== null) clearTimer(timer); timer = null; if (deadline !== null) clearTimer(deadline); deadline = null; }
    function stop() { enabled = false; sequence++; clear(); controller?.abort(); controller = null; running = false; }
    function schedule() { if (enabled && visible()) timer = setTimer(() => { timer = null; refresh(); }, typeof interval === 'function' ? interval() : interval); }
    async function refresh(replace = false) {
        if (!visible() || (running && !replace)) return;
        if (replace) { stop(); enabled = true; }
        enabled = true; clear(); running = true;
        const ticket = ++sequence, own = new AbortController(); controller = own;
        const expired = new Promise((_, reject) => { deadline = setTimer(() => { own.abort(); reject(new Error('Kehadiran belum dapat diperbarui. Coba Perbarui.')); }, timeout); });
        try {
            const result = await Promise.race([Promise.resolve().then(() => read(own.signal)), expired]);
            if (ticket === sequence && !own.signal.aborted && enabled && visible()) onData(result);
        } catch (error) {
            if (ticket === sequence && enabled && visible()) { onError(error); if (error?.status === 401 || error?.status === 403) enabled = false; }
        } finally {
            if (ticket === sequence) { clear(); running = false; controller = null; schedule(); }
        }
    }
    return { stop, refresh, start(immediate = false) { if (enabled || !visible()) return; enabled = true; if (immediate) refresh(); else schedule(); }, busy: () => running };
}
