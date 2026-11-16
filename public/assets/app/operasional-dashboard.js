(function () {
    'use strict';
    const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
    function validData(data) {
        const counts = ['total', 'draft', 'pending', 'approved', 'rejected'];
        return data && counts.every(key => Number.isSafeInteger(data.stats?.[key]) && data.stats[key] >= 0)
            && data.stats.total === counts.slice(1).reduce((sum, key) => sum + data.stats[key], 0)
            && Number.isFinite(data.kpi?.avgPendingHours)
            && Array.isArray(data.chart?.labels) && Array.isArray(data.chart?.series)
            && data.chart.labels.length === data.chart.series.length && data.chart.labels.length <= 6
            && data.chart.labels.every(label => typeof label === 'string') && data.chart.series.every(count => Number.isSafeInteger(count) && count >= 0)
            && Array.isArray(data.latest) && data.latest.length <= 3
            && data.latest.every(row => row && Number.isSafeInteger(row.id) && row.id > 0 && ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'].includes(row.status)
                && ['nomor_pr', 'tujuan_pengadaan', 'tanggal_pr'].every(field => row[field] === null || typeof row[field] === 'string'))
            && Array.isArray(data.topPortofolios) && data.topPortofolios.length <= 6
            && data.topPortofolios.every(row => row && typeof row.portofolio === 'string' && Number.isSafeInteger(row.total_pr) && row.total_pr >= 0
                && Number.isFinite(row.total_harga) && Number.isFinite(row.rata_harga));
    }
    function start(config) {
        let timer, read, manual, generation = 0, paused = document.hidden, blocked = false;
        const button = document.getElementById('refreshBtn'), icon = document.getElementById('refreshIcon');
        const notice = document.getElementById('opsDashboardStatus');
        const announce = (text, error = false) => {
            if (notice) { notice.textContent = text; notice.setAttribute('role', error ? 'alert' : 'status'); }
        };
        const busy = value => {
            if (button) { button.disabled = value; button.setAttribute('aria-busy', String(value)); }
            icon?.classList.toggle('refresh-spin', value);
        };
        const schedule = (delay = 60000) => {
            clearTimeout(timer);
            if (!paused && !blocked && !read && !manual) timer = setTimeout(poll, delay);
        };
        const cancelRead = () => { clearTimeout(timer); const old = read; read = null; old?.controller.abort(); };
        async function request(url, options, op) {
            let timeout, abort;
            const aborted = new Promise((_, reject) => {
                abort = () => reject(new DOMException('Dibatalkan', 'AbortError'));
                op.controller.signal.addEventListener('abort', abort, {once: true});
            });
            try {
                return await Promise.race([
                    (async () => {
                        const response = await fetch(url, {...options, credentials: 'same-origin', signal: op.controller.signal,
                            headers: {'Accept': 'application/json', 'X-CSRF-TOKEN': config.csrf, ...(options.headers || {})}});
                        if ([401, 403, 419, 423].includes(response.status)) {
                            const error = new Error('Sesi atau akses berubah. Muat ulang halaman untuk melanjutkan.');
                            error.permanent = true; throw error;
                        }
                        if (!response.ok || response.redirected) throw new Error(response.status === 429 ? 'Permintaan terlalu sering. Tunggu sebentar lalu coba lagi.' : 'Pembaruan belum terkonfirmasi. Periksa koneksi Anda.');
                        const result = await response.json();
                        if (result?.success !== true) throw new Error('Pembaruan belum dikonfirmasi oleh server.');
                        return result;
                    })(),
                    new Promise((_, reject) => { timeout = setTimeout(() => { reject(new Error('Pembaruan belum terkonfirmasi karena koneksi lambat. Muat ulang halaman untuk memeriksa hasilnya.')); op.controller.abort(); }, 30000); }),
                    aborted,
                ]);
            } finally {
                clearTimeout(timeout); op.controller.signal.removeEventListener('abort', abort);
            }
        }
        async function poll() {
            if (paused || blocked || read || manual) return;
            clearTimeout(timer);
            const op = {controller: new AbortController(), generation}; read = op;
            try {
                const result = await request(config.dataUrl, {}, op);
                if (read !== op || generation !== op.generation || paused) return;
                if (!validData(result.data)) throw new Error('Data pembaruan belum lengkap. Tampilan sebelumnya tetap dipertahankan.');
                config.onData(result.data); announce('');
            } catch (error) {
                if (read === op && generation === op.generation && error.name !== 'AbortError') {
                    if (error.permanent) blocked = true;
                    announce(error instanceof SyntaxError ? 'Respons server belum dapat dibaca. Periksa sesi login Anda.' : error.message, true);
                }
            } finally {
                if (read === op) { read = null; schedule(); }
            }
        }
        async function refresh() {
            if (!button || manual || paused || blocked) return;
            cancelRead(); busy(true);
            const op = {controller: new AbortController(), generation}; manual = op;
            try {
                await request(config.refreshUrl, {method: 'POST'}, op);
                if (manual === op && generation === op.generation) window.location.reload();
            } catch (error) {
                if (manual === op && generation === op.generation && error.name !== 'AbortError') {
                    if (error.permanent) blocked = true;
                    announce(error.message, true);
                }
            } finally {
                if (manual === op) { manual = null; busy(false); schedule(); }
            }
        }
        button?.addEventListener('click', refresh);
        document.addEventListener('visibilitychange', () => {
            paused = document.hidden;
            if (paused) cancelRead(); else schedule(100);
        });
        window.addEventListener('pagehide', () => {
            paused = true; generation++; cancelRead();
            const old = manual; manual = null; old?.controller.abort(); busy(false);
            if (old) announce('Pembaruan sebelumnya belum terkonfirmasi. Muat ulang halaman untuk memeriksa hasilnya.', true);
        });
        window.addEventListener('pageshow', event => {
            if (event.persisted) { paused = document.hidden; schedule(100); }
        });
        schedule();
        return {poll, refresh};
    }
    window.OperationalDashboard = {escapeText, start};
    if (window.OPERATIONAL_DASHBOARD_CONFIG) start(window.OPERATIONAL_DASHBOARD_CONFIG);
})();
