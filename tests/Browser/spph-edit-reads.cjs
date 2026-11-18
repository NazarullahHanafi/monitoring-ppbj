const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('tmp/spph-background-fixture.html', 'utf8');
(async () => {
    const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true });
    try { for (const mobile of [false, true]) {
        const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } }), errors = [], writes = [];
        page.on('pageerror', error => errors.push(error.message)); page.on('dialog', dialog => { errors.push('Native dialog'); dialog.dismiss(); });
        await page.addInitScript(() => {
            window.reads = []; window.deadlines = new Map(); window.bad = 0; let serial = 700000;
            const timeout = setTimeout.bind(window), clear = clearTimeout.bind(window), original = fetch.bind(window);
            window.setTimeout = (fn, delay, ...args) => { if (delay === 20000) { const id = ++serial; deadlines.set(id, fn); return id; } return timeout(fn, delay, ...args); };
            window.clearTimeout = id => { if (!deadlines.delete(id)) clear(id); };
            window.fetch = (raw, options = {}) => {
                const url = new URL(raw, location.origin);
                if (url.pathname === '/spph/check-ppbj' || /^\/spph\/\d+\/items$/.test(url.pathname)) return new Promise(resolve => reads.push({ url: url.href, options, resolve }));
                if (url.pathname === '/spph/check-nomor') return Promise.resolve({ ok: true, status: 200, redirected: false, headers: { get: () => 'application/json' }, json: async () => ({ status: 'ok' }) });
                return original(raw, options);
            };
            window.finish = (i, data, status = 200, stalled = false) => reads[i].resolve({ ok: status < 400, status, redirected: false, headers: { get: () => 'application/json' }, json: () => stalled ? new Promise(() => {}) : Promise.resolve(data) });
            window.openSynthetic = (id, pr = '', vendor = 'Vendor uji') => { window.openTask = openEditModal(id, '901/PKU-XI/SPPH/2026', '2026-11-18', pr, [vendor], 'Deskripsi tersimpan', '', pr ? [pr] : []); };
        });
        await page.route('**/*', route => {
            const request = route.request(), url = new URL(request.url());
            if (url.origin !== 'https://spph-background.test') return route.fulfill({ body: '', contentType: 'text/css' });
            if (url.pathname === '/assets/app/app-shell.js') return route.fulfill({ body: '', contentType: 'text/javascript' });
            if (['/assets/', '/build/', '/images/'].some(prefix => url.pathname.startsWith(prefix))) return route.fulfill({ path: 'public' + decodeURIComponent(url.pathname) });
            if (url.pathname === '/spph' && request.method() === 'GET') return route.fulfill({ body: html, contentType: 'text/html' });
            if (request.method() !== 'GET' && /^\/spph(?:\/\d+)?$/.test(url.pathname)) writes.push(request.method());
            return route.fulfill({ json: { stats: {}, seen: true, finished: true, rows: [], users: [], results: [] } });
        });
        await page.goto('https://spph-background.test/spph'); await page.waitForFunction(() => window.jQuery?.fn.select2 && typeof openEditModal === 'function');
        if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
        await page.evaluate(() => openSynthetic(1, 'PR/A', 'Vendor ["quoted"]')); await page.waitForFunction(() => reads.length === 2);
        assert.deepEqual(await page.evaluate(() => $('#editVendor').val()), ['Vendor ["quoted"]']);
        await page.evaluate(() => document.getElementById('editForm').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        await page.waitForSelector('.swal2-popup'); assert.match(await page.textContent('.swal2-title'), /belum lengkap/); await page.click('.swal2-confirm'); assert.equal(writes.length, 0);
        await page.evaluate(() => openSynthetic(2, 'PR/B')); await page.waitForFunction(() => reads.length === 4); assert.equal(await page.evaluate(() => reads[0].options.signal.aborted && reads[1].options.signal.aborted), true);
        await page.fill('#editDeskripsi', 'Draft pengguna jangan ditimpa');
        await page.evaluate(() => { finish(2, [{ nama_barang: '<b>Barang baru</b>', jumlah: '2', satuan: 'unit' }]); finish(3, { status: 'already_linked', uraian: 'Uraian berbeda' }); });
        await page.waitForFunction(() => document.getElementById('editForm').dataset.spphItemsState === 'ready' && document.getElementById('editForm').dataset.spphPpbjState === 'ready');
        await page.evaluate(() => { finish(0, null, 500); finish(1, { status: 'manual' }); }); assert.match(await page.textContent('#editRows'), /Barang baru/); assert.equal(await page.inputValue('#editDeskripsi'), 'Draft pengguna jangan ditimpa'); assert.deepEqual(await page.evaluate(() => $('#editPpbjSelect').val()), ['PR/B']);
        await page.evaluate(() => openSynthetic(2)); await page.waitForFunction(() => reads.length === 5); await page.evaluate(() => openSynthetic(2)); await page.waitForFunction(() => reads.length === 6);
        await page.evaluate(() => { finish(4, [{ nama_barang: 'STALE SAME RECORD' }]); finish(5, []); }); await page.waitForFunction(() => document.getElementById('editForm').dataset.spphItemsState === 'ready'); assert.doesNotMatch(await page.textContent('#editRows'), /STALE SAME RECORD/);
        await page.evaluate(() => openSynthetic(3, 'PR/C')); await page.waitForFunction(() => reads.length === 8); await page.evaluate(() => { finish(6, null, 503); finish(7, null, 503); });
        await page.waitForSelector('#editRows button'); await page.waitForSelector('#editPpbjStatus button'); assert.deepEqual(await page.evaluate(() => $('#editPpbjSelect').val()), ['PR/C']); assert.equal(await page.locator('#editPpbjModeBox:not(.hidden)').count(), 1);
        assert.equal(await page.locator('#editModal .btn-add-row').isDisabled(), true); await page.evaluate(() => document.getElementById('editForm').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))); await page.waitForSelector('.swal2-popup'); await page.click('.swal2-confirm'); assert.equal(writes.length, 0);
        await page.locator('#editRows button').click(); await page.waitForFunction(() => reads.length === 9); await page.evaluate(() => finish(8, [])); await page.waitForFunction(() => document.getElementById('editForm').dataset.spphItemsState === 'ready');
        await page.evaluate(() => addRow('edit', { nama_barang: 'Draft tambahan', jumlah: '2' }));
        await page.locator('#editPpbjStatus button').click(); await page.waitForFunction(() => reads.length === 10); await page.evaluate(() => finish(9, { status: 'available' })); await page.waitForFunction(() => document.getElementById('editForm').dataset.spphPpbjState === 'ready'); assert.match(await page.textContent('#editRows'), /Draft tambahan/);
        await page.evaluate(() => $('#editPpbjSelect').append(new Option('PR/NEW', 'PR/NEW', true, true)).val(['PR/NEW']).trigger('change')); await page.waitForFunction(() => reads.length === 11);
        assert.equal(await page.evaluate(() => document.getElementById('editForm').dataset.spphPpbjState), 'loading');
        await page.evaluate(() => finish(10, { status: 'already_linked', message: '<img src=x onerror=bad=1> Terhubung', uraian: 'Jangan timpa', package_items: [] })); await page.waitForFunction(() => document.getElementById('editForm').dataset.spphPpbjState === 'ready'); assert.equal(await page.locator('#editPpbjStatus img').count(), 0); assert.match(await page.textContent('#editPpbjStatus'), /<img/); assert.equal(await page.inputValue('#editDeskripsi'), 'Deskripsi tersimpan');
        await page.evaluate(() => $('#editPpbjSelect').append(new Option('PR/SLOW', 'PR/SLOW', true, true)).val(['PR/SLOW']).trigger('change')); await page.waitForFunction(() => reads.length === 12);
        await page.evaluate(() => finish(11, null, 200, true)); await page.evaluate(() => new Promise(requestAnimationFrame)); await page.evaluate(() => [...deadlines.values()].forEach(fn => fn())); await page.waitForSelector('#editPpbjStatus button'); assert.match(await page.textContent('#editPpbjStatus'), /terlalu lama/);
        await page.screenshot({ path: `tmp/spph-edit-reads-${mobile ? 'mobile-dark' : 'desktop-light'}.png` });
        await page.evaluate(() => openSynthetic(4, 'PR/D')); await page.waitForFunction(() => reads.length === 14); await page.evaluate(() => closeModal('editModal')); assert.equal(await page.evaluate(() => reads[12].options.signal.aborted && reads[13].options.signal.aborted), true);
        await page.evaluate(() => { finish(12, [{ nama_barang: 'CLOSED' }]); finish(13, { status: 'manual', message: 'CLOSED' }); }); assert.doesNotMatch(await page.textContent('#editRows'), /CLOSED/); assert.equal(await page.evaluate(() => bad), 0);
        assert.deepEqual(errors, []); assert.deepEqual(writes, []); console.log(`SPPH_EDIT_READS_BROWSER_OK mobile=${mobile} readiness=true stale_items=true same_record=true stored_pr_preserved=true description_preserved=true retry=true selection_deadline=true safe_messages=true procurement_writes=0`); await page.close();
    } } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
