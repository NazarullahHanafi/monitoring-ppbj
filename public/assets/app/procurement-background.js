(function () {
    'use strict';

    // Background reads and ephemeral presence only; business writes stay in their forms.
    function create(options) {
        const channels = Object.fromEntries(Object.entries(options.channels).map(([key, config]) =>
            [key, { ...config, timer: null, lease: null, failures: 0 }]));
        const presence = { timer: null, lease: null, desired: false, failures: 0 };
        let active = true, denied = false, started = false;
        const sameOrigin = raw => {
            const url = new URL(raw, window.location.origin);
            if (url.origin !== window.location.origin) throw new Error('Invalid background endpoint');
            return url.href;
        };
        const allowed = state => active && !denied && !document.hidden && (!state.enabled || state.enabled());
        const delay = state => Math.min(300000, state.interval * (2 ** state.failures));
        function schedule(key, wait = delay(channels[key])) {
            const state = channels[key];
            clearTimeout(state.timer); state.timer = null;
            if (!allowed(state) || state.lease) return;
            state.timer = setTimeout(() => { state.timer = null; run(key); }, wait);
        }
        function pause() {
            for (const state of Object.values(channels)) {
                clearTimeout(state.timer); state.timer = null;
                const lease = state.lease; state.lease = null; lease?.cancel();
                state.onPause?.();
            }
        }
        function stopUnauthorized() {
            denied = true; pause();
            clearTimeout(presence.timer); presence.timer = null; presence.desired = false;
            presence.lease?.cancel();
        }
        async function boundedRequest(rawUrl, init, lease, milliseconds, json) {
            const url = sameOrigin(rawUrl), controller = new AbortController();
            let timer;
            const cancelled = new Promise((resolve, reject) => {
                lease.cancel = () => { clearTimeout(timer); controller.abort(); reject(new DOMException('Cancelled', 'AbortError')); };
                timer = setTimeout(() => { lease.timedOut = true; lease.cancel(); }, milliseconds);
            });
            try {
                return await Promise.race([cancelled, (async () => {
                    const response = await fetch(url, { ...init, signal: controller.signal, credentials: 'same-origin', cache: 'no-store' });
                    if (controller.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
                    if ([401, 403, 419].includes(response.status) || response.redirected) throw Object.assign(new Error('Access expired'), { status: response.redirected ? 401 : response.status });
                    if (!response.ok) throw Object.assign(new Error('Background request failed'), { status: response.status });
                    if (!json) return;
                    if (!response.headers.get('Content-Type')?.toLowerCase().includes('application/json')) throw new Error('Unexpected response');
                    const data = await response.json();
                    if (controller.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
                    return data;
                })()]);
            } finally { clearTimeout(timer); }
        }
        async function run(key) {
            const state = channels[key];
            if (!state || !allowed(state) || state.lease) return;
            clearTimeout(state.timer); state.timer = null;
            const lease = {}; state.lease = lease;
            try {
                const url = typeof state.url === 'function' ? state.url() : state.url;
                const data = await boundedRequest(url, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } }, lease, 20000, true);
                if (state.lease !== lease || !allowed(state)) return;
                state.apply(data); state.failures = 0;
            } catch (error) {
                if (state.lease !== lease) return;
                if ([401, 403, 419].includes(error.status)) { stopUnauthorized(); return; }
                if (lease.timedOut || error.name !== 'AbortError') state.failures = Math.min(state.failures + 1, 4);
                state.onError?.();
            } finally {
                if (state.lease === lease) { state.lease = null; schedule(key); }
            }
        }
        async function heartbeat(wanted) {
            presence.desired = Boolean(wanted);
            clearTimeout(presence.timer); presence.timer = null;
            if (presence.lease || !active || denied || (wanted && document.hidden) || !options.presence) return;
            const lease = {}, sent = presence.desired; presence.lease = lease;
            try {
                const token = options.presence.csrf();
                if (typeof token !== 'string' || !token) throw new Error('Missing CSRF');
                await boundedRequest(sent ? options.presence.startUrl : options.presence.stopUrl,
                    { method: 'POST', headers: { Accept: 'application/json', 'X-CSRF-TOKEN': token } }, lease, 10000, false);
                presence.failures = 0;
            } catch (error) {
                if ([401, 403, 419].includes(error.status)) { stopUnauthorized(); return; }
                if (lease.timedOut || error.name !== 'AbortError') presence.failures = Math.min(presence.failures + 1, 3);
            } finally {
                if (presence.lease === lease) {
                    presence.lease = null;
                    if (active && !denied) {
                        if (presence.desired !== sent) heartbeat(presence.desired);
                        else if (sent && options.isEditing() && !document.hidden) {
                            presence.timer = setTimeout(() => heartbeat(true), Math.min(120000, 15000 * (2 ** presence.failures)));
                        }
                    }
                }
            }
        }
        function resume(initial = false) {
            for (const [key, state] of Object.entries(channels)) schedule(key, initial ? (state.initialDelay ?? state.interval) : delay(state));
        }
        function start() {
            if (started) return;
            started = true; resume(true);
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) { pause(); if (options.isEditing()) heartbeat(false); }
                else { resume(); if (options.isEditing()) heartbeat(true); }
            });
            window.addEventListener('pagehide', () => {
                active = false; pause(); clearTimeout(presence.timer); presence.timer = null;
                presence.desired = false; presence.lease?.cancel();
                if (options.isEditing() && options.presence && !denied) {
                    try {
                        const body = new FormData(); body.append('_token', options.presence.csrf());
                        navigator.sendBeacon(sameOrigin(options.presence.stopUrl), body);
                    } catch { /* Server-side expiry is the fallback for ephemeral presence. */ }
                }
            });
            window.addEventListener('pageshow', event => {
                if (!event.persisted) return;
                active = true; resume();
                if (options.isEditing() && !document.hidden) heartbeat(true);
            });
        }
        return Object.freeze({ start, run, heartbeat });
    }
    window.ProcurementBackground = Object.freeze({ create });
})();
