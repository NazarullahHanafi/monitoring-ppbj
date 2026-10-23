(function () {
    'use strict';

    const runtimeUrl = document.currentScript?.dataset.runtimeUrl;
    const toggle = document.getElementById('chatbot-toggle-btn');
    if (!runtimeUrl || !toggle) return;

    let pending = null;
    let ready = false;
    let opening = false;
    let idleTimer = null;

    function loadRuntime() {
        if (pending) return pending;
        pending = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = runtimeUrl;
            script.onload = () => { ready = true; resolve(); };
            script.onerror = () => { script.remove(); pending = null; reject(new Error('Chatbot belum termuat.')); };
            document.body.appendChild(script);
        });
        return pending;
    }

    toggle.addEventListener('click', function (event) {
        if (ready) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (opening) return;
        opening = true;
        toggle.setAttribute('aria-busy', 'true');
        loadRuntime().then(() => {
            if (typeof window.toggleChatbot === 'function') window.toggleChatbot();
        }).catch(() => {
            if (window.Swal) window.Swal.fire({
                icon: 'info', title: 'Asisten belum termuat',
                text: 'Periksa koneksi, lalu klik kembali untuk mencoba.',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
            });
        }).finally(() => { opening = false; toggle.removeAttribute('aria-busy'); });
    }, true);

    function schedule() {
        if (document.hidden || pending || idleTimer) return;
        idleTimer = window.setTimeout(() => {
            idleTimer = null;
            if (document.hidden) return;
            const launch = () => { if (!document.hidden) loadRuntime().catch(() => {}); };
            if ('requestIdleCallback' in window) window.requestIdleCallback(launch, { timeout: 1800 });
            else launch();
        }, 4200);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { window.clearTimeout(idleTimer); idleTimer = null; }
        else schedule();
    });
    window.addEventListener('pagehide', () => { window.clearTimeout(idleTimer); idleTimer = null; });
    window.addEventListener('pageshow', schedule);
    schedule();
})();
