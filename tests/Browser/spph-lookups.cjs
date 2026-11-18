const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('tmp/spph-background-fixture.html', 'utf8');
(async () => {
    const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true });
    try { for (const mobile of [false, true]) {
        const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } }), errors = [], writes = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.addInitScript(() => {
            window.checks = []; window.suggestions = []; window.deadlines = new Map(); window.slowSuggestions = false; window.bad = 0; let serial = 600000;
            const timeout = setTimeout.bind(window), clear = clearTimeout.bind(window), original = fetch.bind(window);
            window.setTimeout = (fn, delay, ...args) => { if (delay === 20000) { const id = ++serial; deadlines.set(id, fn); return id; } return timeout(fn, delay, ...args); };
            window.clearTimeout = id => { if (!deadlines.delete(id)) clear(id); };
            const response = data => ({ ok: true, status: 200, redirected: false, headers: { get: () => 'application/json' }, json: async () => data });
            window.fetch = (raw, options = {}) => {
                const url = new URL(raw, location.origin);
                if (url.pathname === '/spph/check-nomor') return new Promise(resolve => checks.push({ url: url.href, options, resolve }));
                if (url.pathname === '/spph/suggest-nomor') return slowSuggestions ? new Promise(resolve => suggestions.push({ url: url.href, options, resolve })) : Promise.resolve(response({ last: '<img src=x onerror=bad=1>', suggestions: ['903/PKU-XI/SPPH/2026'] }));
                return original(raw, options);
            };
            window.finishCheck = (i, data, stalled = false) => checks[i].resolve({ ...response(data), json: () => stalled ? new Promise(() => {}) : Promise.resolve(data) });
            window.finishSuggestion = (i, data) => suggestions[i].resolve(response(data));
        });
        await page.route('**/*', route => {
            const request = route.request(), url = new URL(request.url());
            if (url.origin !== 'https://spph-background.test') return route.fulfill({ body: '', contentType: 'text/css' });
            if (url.pathname === '/assets/app/app-shell.js') return route.fulfill({ body: '', contentType: 'text/javascript' });
            if (['/assets/', '/build/', '/images/'].some(prefix => url.pathname.startsWith(prefix))) return route.fulfill({ path: 'public' + decodeURIComponent(url.pathname) });
            if (url.pathname === '/spph' && request.method() === 'GET') return route.fulfill({ body: html, contentType: 'text/html' });
            if (/^\/spph\/\d+\/items$/.test(url.pathname)) return route.fulfill({ json: [] });
            if (request.method() !== 'GET' && /^\/spph(?:\/\d+)?$/.test(url.pathname)) writes.push(request.method());
            return route.fulfill({ json: { stats: {}, seen: true, finished: true, rows: [], users: [], results: [] } });
        });
        await page.goto('https://spph-background.test/spph'); await page.waitForFunction(() => window.jQuery?.fn.select2 && typeof openAddModal === 'function');
        if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
        await page.evaluate(() => openAddModal()); await page.waitForSelector('#suggBox button');
        assert.equal(await page.locator('#suggBox img').count(), 0); assert.match(await page.textContent('#suggBox'), /<img/);
        await page.fill('#nomorSpphInput', '901/PKU-XI/SPPH/2026'); await page.waitForFunction(() => checks.length === 1);
        await page.fill('#nomorSpphInput', '902/PKU-XI/SPPH/2026'); await page.waitForFunction(() => checks.length === 2); assert.equal(await page.evaluate(() => checks[0].options.signal.aborted), true);
        await page.evaluate(() => finishCheck(0, { status: 'ok', normalized_nomor: 'WRONG' })); assert.equal(await page.inputValue('#nomorSpphInput'), '902/PKU-XI/SPPH/2026');
        await page.evaluate(() => finishCheck(1, { status: 'duplicate', message: '<img src=x onerror=bad=1> duplikat' })); await page.waitForFunction(() => document.getElementById('nomorStatus').textContent.includes('duplikat')); assert.equal(await page.locator('#nomorStatus img').count(), 0);
        await page.locator('#suggBox button').click(); await page.waitForFunction(() => checks.length === 3); assert.equal(await page.inputValue('#nomorSpphInput'), '903/PKU-XI/SPPH/2026');
        await page.evaluate(() => finishCheck(2, null, true)); await page.evaluate(() => new Promise(requestAnimationFrame)); await page.evaluate(() => [...deadlines.values()].forEach(fn => fn())); await page.waitForSelector('#nomorStatus button'); assert.match(await page.textContent('#nomorStatus'), /terlalu lama/);
        await page.screenshot({ path: `tmp/spph-lookups-${mobile ? 'mobile-dark' : 'desktop-light'}.png` });
        await page.locator('#nomorStatus button').click(); await page.waitForFunction(() => checks.length === 4); await page.evaluate(() => finishCheck(3, { status: 'ok' }));
        await page.evaluate(() => closeModal('addModal'));
        await page.evaluate(() => openEditModal(11, '005/PKU-III/SPPH/2025', '2025-03-01', '', [], 'Draft edit', ''));
        await page.waitForSelector('#editModal:not(.hidden)');
        await page.evaluate(() => { slowSuggestions = true; window.recovery = applyLatestNumberSpph(true); }); await page.waitForFunction(() => suggestions.length === 1);
        assert.equal(await page.evaluate(() => new URL(suggestions[0].url).searchParams.get('tanggal')), '2025-03-01');
        await page.fill('#editNomor', 'DRAFT BARU'); await page.evaluate(() => finishSuggestion(0, { suggestions: ['WRONG/OLD'] })); assert.equal(await page.evaluate(() => recovery), null); assert.equal(await page.inputValue('#editNomor'), 'DRAFT BARU');
        await page.evaluate(() => { window.recovery = applyLatestNumberSpph(true); }); await page.waitForFunction(() => suggestions.length === 2); await page.evaluate(() => finishSuggestion(1, { suggestions: ['006/PKU-III/SPPH/2025'] }));
        assert.equal(await page.evaluate(() => recovery), '006/PKU-III/SPPH/2025'); assert.equal(await page.inputValue('#editNomor'), '006/PKU-III/SPPH/2025');
        await page.evaluate(() => { window.recovery = applyLatestNumberSpph(true); closeModal('editModal'); }); assert.equal(await page.evaluate(() => recovery), null); assert.equal(await page.evaluate(() => suggestions[2].options.signal.aborted), true);
        await page.evaluate(() => finishSuggestion(2, { suggestions: ['WRONG/CLOSED'] })); assert.equal(await page.inputValue('#editNomor'), '006/PKU-III/SPPH/2025'); assert.equal(await page.evaluate(() => bad), 0);
        assert.deepEqual(errors, []); assert.deepEqual(writes, []); console.log(`SPPH_LOOKUPS_BROWSER_OK mobile=${mobile} stale_checks=true body_timeout=true text_only=true edit_date=true changed_draft=true close_cancel=true procurement_writes=0`); await page.close();
    } } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
