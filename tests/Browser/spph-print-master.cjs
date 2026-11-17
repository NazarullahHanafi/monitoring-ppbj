const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const appCss = '/build/' + JSON.parse(fs.readFileSync('public/build/manifest.json', 'utf8'))['resources/css/app.css'].file;
const row = {id: 10, type: 'penandatangan_sci', nama: 'Pejabat Penguji', is_active: true, version: 'a'.repeat(64)};
const list = (rows = [row]) => ({options: rows, page: 1, last_page: 1, total: rows.length});
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><link rel="stylesheet" href="${appCss}"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css"><link rel="stylesheet" href="/assets/spph/spph-print.css"><link rel="stylesheet" href="/assets/app/form-ux.css"><button id="open">Master cetak</button><script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/app/form-ux.js"></script><script src="/assets/spph/spph-print-master.js"></script><script>document.querySelector('#open').onclick=()=>window.task=SPPHPrintMasters.open(true);</script>`;
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1440, height: 1000}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('dialog', d => {errors.push('Native dialog'); d.dismiss();});
            await page.addInitScript(() => {
                window.net = {calls: [], pending: [], timers: new Map(), serial: 100000}; const timeout = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
                window.setTimeout = (fn, delay, ...args) => {if (delay === 30000) {const id = ++net.serial; net.timers.set(id, fn); return id;} return timeout(fn, delay, ...args);};
                window.clearTimeout = id => {if (!net.timers.delete(id)) clear(id);};
                window.fetch = (url, options) => {
                    const call = {url, method: options.method || 'GET', body: options.body ? JSON.parse(options.body) : null, csrf: options.headers['X-CSRF-TOKEN'], aborted: false};
                    options.signal.addEventListener('abort', () => call.aborted = true); net.calls.push(call); return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (i, status, payload, stalled = false) => net.pending[i]({ok: status < 400, status, headers: {get: () => 'application/json'}, json: () => stalled ? new Promise(() => {}) : Promise.resolve(payload)});
            });
            await page.route('**/*', route => {const url = new URL(route.request().url()); return url.pathname.startsWith('/assets/') || url.pathname.startsWith('/build/') ? route.fulfill({path: 'public' + url.pathname}) : route.fulfill({contentType: 'text/html', body: fixture});});
            await page.goto('https://print-fixture.test/sp'); if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
            await page.click('#open'); await page.waitForFunction(() => net.calls.length === 1); await page.evaluate(p => finish(0, 200, p), list()); await page.waitForSelector('.sg-master-row');
            await page.locator('[data-sgm=edit]').click(); await page.fill('#sgMasterName', 'Draft <name>'); await page.uncheck('#sgMasterActive');
            await page.fill('#sgMasterQuery', 'OLD'); await page.locator('#sgMasterSearch button').click(); await page.fill('#sgMasterQuery', 'LATEST'); await page.locator('#sgMasterSearch button').click();
            await page.evaluate(p => finish(2, 200, p), list([{...row, nama: 'LATEST'}])); await page.waitForSelector('.sg-master-row'); await page.evaluate(() => finish(1, 500, {message: 'stale failure'}));
            assert.equal(await page.inputValue('#sgMasterName'), 'Draft <name>'); assert.equal(await page.isChecked('#sgMasterActive'), false); assert.doesNotMatch(await page.locator('.spph-signing-content').textContent(), /stale failure/);
            assert.equal(await page.evaluate(() => net.calls[1].aborted), true);
            await page.selectOption('#sgMasterType', 'jabatan_sci'); await page.evaluate(p => finish(3, 200, p), list([{...row, type: 'jabatan_sci'}])); await page.waitForSelector('.sg-master-row'); await page.fill('#sgMasterName', 'Draft title');
            await page.selectOption('#sgMasterType', 'penandatangan_sci'); await page.evaluate(p => finish(4, 200, p), list()); await page.waitForSelector('.sg-master-row');
            assert.equal(await page.inputValue('#sgMasterName'), 'Draft <name>'); assert.equal(await page.isChecked('#sgMasterActive'), false);
            await page.locator('#sgMasterForm button[type=submit]').click(); await page.evaluate(() => document.querySelector('#sgMasterForm').requestSubmit());
            assert.equal(await page.evaluate(() => net.calls.length), 6); assert.equal(await page.locator('.swal2-confirm').isDisabled(), true);
            const sent = await page.evaluate(() => net.calls[5]); assert.equal(sent.method, 'PUT'); assert.equal(sent.body.version, row.version); assert.equal(sent.csrf, 'synthetic-csrf'); assert.equal(sent.body.is_active, false);
            await page.evaluate(() => finish(5, 409, {message: '<img src=x onerror=bad()> Master berubah'})); await page.waitForFunction(() => !document.querySelector('.swal2-confirm').disabled);
            assert.equal(await page.inputValue('#sgMasterName'), 'Draft <name>'); assert.equal(await page.locator('img:not(.swal2-image)').count(), 0);
            await page.locator('#sgMasterForm button[type=submit]').click(); await page.evaluate(() => finish(6, 200, null, true)); await page.evaluate(() => [...net.timers.values()][0]());
            await page.waitForFunction(() => document.querySelector('.sg-status').textContent.includes('koneksi lambat')); assert.equal(await page.locator('#sgMasterForm button[type=submit]').isDisabled(), true);
            await page.locator('[data-sgm=refresh]').click(); await page.evaluate(p => finish(7, 200, p), list()); await page.waitForFunction(() => !document.querySelector('#sgMasterForm button[type=submit]').disabled);
            assert.equal(await page.inputValue('#sgMasterName'), 'Draft <name>');
            await page.locator('#sgMasterForm button[type=submit]').click(); await page.evaluate(p => finish(8, 200, p), {message: 'Master berhasil disimpan.', option: {...row, nama: 'Draft <name>', is_active: false}});
            await page.waitForFunction(() => net.calls.length === 10); await page.evaluate(() => finish(9, 500, {message: 'private server trace'}));
            await page.waitForFunction(() => !document.querySelector('.swal2-confirm').disabled); assert.equal(await page.inputValue('#sgMasterName'), '');
            assert.match(await page.locator('.sg-status').textContent(), /berhasil disimpan.*Daftar belum diperbarui.*jangan ulangi/);
            await page.screenshot({path: `tmp/print-master-${mobile ? 'mobile' : 'desktop'}.png`}); const box = await page.locator('.swal2-popup').boundingBox(); assert.ok(box.x >= 0 && box.width <= (mobile ? 390 : 1440)); assert.ok(box.y >= 0 && box.y + box.height <= (mobile ? 844 : 1000)); const title = await page.locator('.swal2-title').boundingBox(); assert.ok(title.y >= 0);
            await page.locator('.swal2-confirm').click(); await page.waitForSelector('.swal2-popup', {state: 'hidden'});
            await page.evaluate(() => {window.task = SPPHPrintMasters.open(false);}); await page.waitForFunction(() => net.calls.length === 11); await page.evaluate(p => finish(10, 200, p), list()); await page.waitForSelector('.sg-master-row');
            assert.equal(await page.locator('#sgMasterForm').count(), 0); await page.locator('[data-sgm=use]').click(); assert.equal(await page.evaluate(async () => (await task).id), 10);
            assert.deepEqual(errors, []); console.log(`PRINT_MASTER_BROWSER_OK mobile=${mobile} initial_reads=1 drafts_by_type=true stale_results_ignored=true duplicates=false csrf=true timeout_body=true saved_refresh_distinguished=true`); await page.close();
        }
    } finally {await browser.close();}
})().catch(e => {console.error(e); process.exitCode = 1;});
