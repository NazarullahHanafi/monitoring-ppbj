const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('tmp/spph-background-fixture.html', 'utf8');
(async () => {
    const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true });
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.addInitScript(() => {
                window.bgTimers = new Map(); window.bgRequests = []; window.bad = 0; let serial = 800000;
                const timeout = setTimeout.bind(window), clear = clearTimeout.bind(window), originalFetch = fetch.bind(window);
                window.setTimeout = (fn, delay, ...args) => {
                    if ([10000, 12000, 15000, 20000, 45000, 60000, 90000, 120000].includes(delay)) { const id = ++serial; bgTimers.set(id, { fn, delay }); return id; }
                    return timeout(fn, delay, ...args);
                };
                window.clearTimeout = id => { if (!bgTimers.delete(id)) clear(id); };
                window.fireBg = delay => { for (const [id, timer] of [...bgTimers]) if (timer.delay === delay) { bgTimers.delete(id); timer.fn(); } };
                window.fetch = (raw, options = {}) => {
                    const url = new URL(raw, location.origin);
                    if (['/spph/poll', '/spph/presence'].includes(url.pathname)) return new Promise(resolve => bgRequests.push({ url: url.href, options, resolve }));
                    if (url.pathname === '/spph/check-nomor' || url.pathname === '/spph/suggest-nomor') return Promise.resolve({ ok: true, status: 200, redirected: false, headers: { get: () => 'application/json' }, json: async () => ({ status: 'ok', suggestions: ['901/PKU-XI/SP/2026'], last: null }) });
                    return originalFetch(raw, options);
                };
                window.finishBg = (i, data) => bgRequests[i].resolve({ ok: true, status: 200, redirected: false, headers: { get: () => 'application/json' }, json: async () => data });
            });
            await page.route('**/*', route => {
                const url = new URL(route.request().url());
                if (url.origin !== 'https://spph-background.test') return route.fulfill({ body: '', contentType: 'text/css' });
                if (url.pathname === '/assets/app/app-shell.js') return route.fulfill({ contentType: 'text/javascript', body: '' });
                if (['/assets/', '/build/', '/images/'].some(prefix => url.pathname.startsWith(prefix))) return route.fulfill({ path: 'public' + decodeURIComponent(url.pathname) });
                if (url.pathname === '/spph') return route.fulfill({ contentType: 'text/html', body: html });
                return route.fulfill({ json: { seen: true, finished: true, users: [], rows: [], results: [] } });
            });
            await page.goto('https://spph-background.test/spph');
            await page.waitForFunction(() => typeof openAddModal === 'function' && window.jQuery?.fn.select2 && [...bgTimers.values()].some(timer => timer.delay === 45000));
            if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
            const rows = await page.locator('#spphBody tr').count();
            await page.evaluate(() => { Swal.fire({ titleText: 'Konfirmasi yang sedang dipakai', showCancelButton: true }); });
            await page.evaluate(() => fireBg(45000));
            assert.equal(await page.evaluate(() => new URL(bgRequests[0].url).searchParams.get('summary')), '1');
            await page.evaluate(() => finishBg(0, { rows: [{ id: 1, nomor_spph: '<img src=x onerror=bad=1>' }, { id: 1 }] }));
            await page.waitForSelector('#spphUpdates:not(.hidden)');
            assert.match(await page.textContent('#spphUpdatesText'), /^1 SPPH/);
            assert.equal(await page.textContent('.swal2-title'), 'Konfirmasi yang sedang dipakai');
            assert.equal(await page.locator('#spphBody tr').count(), rows);
            await page.evaluate(() => refreshSpphList()); assert.match(await page.textContent('#spphUpdatesHint'), /Selesaikan/);
            await page.evaluate(() => { Swal.close(); openAddModal(); });
            await page.fill('#addDeskripsi', 'Draft tidak boleh hilang');
            await page.evaluate(() => refreshSpphList()); assert.equal(await page.inputValue('#addDeskripsi'), 'Draft tidak boleh hilang');
            assert.equal(await page.locator('#addModal:not(.hidden)').count(), 1);
            await page.evaluate(() => closeModal('addModal'));
            await page.waitForFunction(() => !Swal.isVisible());
            await page.fill('#searchInput', 'Filter belum diterapkan'); await page.evaluate(() => refreshSpphList()); assert.match(await page.textContent('#spphUpdatesHint'), /Terapkan Filter/);
            await page.evaluate(() => fireBg(12000)); await page.waitForFunction(() => bgRequests.length === 2);
            await page.evaluate(() => finishBg(1, { users: [{ name: '<img src=x onerror=bad=1> Penguji' }] }));
            await page.waitForSelector('#presenceBar:not(.hidden)'); assert.equal(await page.locator('#presenceText img').count(), 0); assert.match(await page.textContent('#presenceText'), /<img/); assert.equal(await page.evaluate(() => bad), 0);
            await page.locator('#spphUpdates').scrollIntoViewIfNeeded(); await page.screenshot({ path: `tmp/spph-background-${mobile ? 'mobile-dark' : 'desktop-light'}.png` });
            assert.deepEqual(errors, []);
            console.log(`SPPH_BACKGROUND_BROWSER_OK mobile=${mobile} summary=true dialog_preserved=true draft_preserved=true staged_filter_preserved=true rows_unchanged=true names_literal=true`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
