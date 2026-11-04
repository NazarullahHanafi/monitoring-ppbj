export const stateLabel = { online: 'Sedang online', idle: 'Jeda di aplikasi', offline: 'Tidak online' };
export const poseLabel = { working: 'Di meja kerja', coffee: 'Menikmati kopi', eating: 'Menikmati camilan', sleeping: 'Beristirahat di lounge' };
export function poseFor(person) {
    if (person.state === 'offline') return 'sleeping';
    if (person.state === 'idle') return ['coffee', 'eating', 'sleeping'][Number(person.id) % 3];
    return 'working';
}
export function initials(name) { return String(name || '').trim().split(/\s+/u).slice(0, 2).map(x => Array.from(x)[0] || '').join('').toLocaleUpperCase('id'); }
export function safePeople(payload) {
    const seen = new Set();
    return (Array.isArray(payload?.people) ? payload.people : []).slice(0, 120).filter(p => {
        if (!p || !Number.isSafeInteger(p.id) || p.id <= 0 || seen.has(p.id) || !['umum', 'operasional'].includes(p.department) || !Object.hasOwn(stateLabel, p.state)) return false;
        seen.add(p.id); return true;
    }).map(p => ({ id: p.id, name: String(p.name || 'Anggota tim').slice(0, 150), department: p.department,
        state: p.state, mood: String(p.mood || '').slice(0, 40), is_me: p.is_me === true }));
}

// A single request with a deadline covering fetch AND JSON body parsing.
// Timers are completion-driven; stop/supersede cannot be unlocked by old responses.
export function createOfficeReadLoop({ read, onData, onError = () => {}, visible = () => true,
    setTimer = setTimeout, clearTimer = clearTimeout, timeout = 12000, interval = 45000 }) {
    let timer = null, deadline = null, controller = null, sequence = 0, running = false, enabled = false;
    function clear() { if (timer !== null) clearTimer(timer); timer = null; if (deadline !== null) clearTimer(deadline); deadline = null; }
    function stop() { enabled = false; sequence++; clear(); controller?.abort(); controller = null; running = false; }
    function schedule() { if (enabled && visible()) timer = setTimer(() => { timer = null; refresh(); }, interval); }
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
