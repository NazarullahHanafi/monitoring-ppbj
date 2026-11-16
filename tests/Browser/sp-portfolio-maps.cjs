const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const appCss = '/build/' + JSON.parse(fs.readFileSync('public/build/manifest.json', 'utf8'))['resources/css/app.css'].file;
const row = {id: 1, portfolio: 'PK - LAB', field_id: 5, field_name: 'Bidang LAB', field_available: true, is_active: true, version: 'a'.repeat(64)};
const field = {id: 5, nama: 'Bidang LAB', type: 'bidang_pr', is_active: true, version: 'b'.repeat(64)};
const maps = (rows = [row]) => ({rows, page: 1, last_page: 1, total: rows.length, portfolio_options: ['IT - FERS', 'PK - LAB', 'PK - QAQC', '0'], options_truncated: false});
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><link rel="stylesheet" href="${appCss}"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css"><link rel="stylesheet" href="/assets/spph/spph-print.css"><link rel="stylesheet" href="/assets/app/form-ux.css"><button id="open">Pemetaan</button><script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/app/form-ux.js"></script><script src="/assets/sp/sp-portfolio-maps.js"></script><script>document.querySelector('#open').onclick=()=>window.task=SPPortfolioMaps.open({can_manage:true,portfolios:['IT - FERS']});</script>`;
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1440, height: 1000}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', error => errors.push(error.message)); page.on('dialog', dialog => {errors.push('Native browser dialog'); dialog.dismiss();});
            await page.addInitScript(() => {
                window.net = {calls: [], pending: [], timers: new Map(), serial: 100000};
                const timeout = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
                window.setTimeout = (fn, delay, ...args) => {if (delay === 30000) {const id = ++net.serial; net.timers.set(id, fn); return id;} return timeout(fn, delay, ...args);};
                window.clearTimeout = id => {if (!net.timers.delete(id)) clear(id);};
                window.fetch = (url, options) => {
                    const call = {url, method: options.method || 'GET', body: options.body ? JSON.parse(options.body) : null, csrf: options.headers['X-CSRF-TOKEN'], aborted: false};
                    options.signal.addEventListener('abort', () => call.aborted = true); net.calls.push(call); return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (index, status, payload, stalled = false) => net.pending[index]({ok: status < 400, status, headers: {get: () => 'application/json'}, json: () => stalled ? new Promise(() => {}) : Promise.resolve(payload)});
            });
            await page.route('**/*', route => {const url = new URL(route.request().url()); return url.pathname.startsWith('/assets/') || url.pathname.startsWith('/build/') ? route.fulfill({path: 'public' + url.pathname}) : route.fulfill({contentType: 'text/html', body: fixture});});
            await page.goto('https://portfolio-fixture.test/sp'); if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
            await page.click('#open'); await page.waitForFunction(() => net.calls.length === 2);
            assert.match(await page.evaluate(() => net.calls[1].url), /type=bidang_pr/);
            await page.evaluate(payload => {finish(0, 200, payload.maps); finish(1, 200, {options: [payload.field], total: 1});}, {maps: maps(), field});
            await page.waitForFunction(() => !document.querySelector('#spMapForm button[type=submit]').disabled);
            await page.selectOption('#spMapPortfolio', 'PK - LAB'); await page.selectOption('#spMapField', '5'); await page.uncheck('#spMapActive');
            await page.fill('#spMapQuery', 'OLD'); await page.locator('#spMapSearch button[type=submit]').click(); await page.fill('#spMapQuery', 'LATEST'); await page.locator('#spMapSearch button[type=submit]').click();
            await page.evaluate(payload => finish(3, 200, payload), maps([{...row, portfolio: 'LATEST', field_id: 99, field_name: 'Beyond first fifty'}]));
            await page.waitForFunction(() => document.querySelector('.sg-master-row strong')?.textContent === 'LATEST'); await page.evaluate(() => finish(2, 500, {message: 'stale failure'}));
            assert.equal(await page.inputValue('#spMapPortfolio'), 'PK - LAB'); assert.equal(await page.inputValue('#spMapField'), '5'); assert.equal(await page.isChecked('#spMapActive'), false);
            assert.doesNotMatch(await page.locator('.spph-signing-content').textContent(), /stale failure/); assert.equal(await page.evaluate(() => net.calls[2].aborted), true);
            await page.locator('#spMapForm button[type=submit]').click(); await page.evaluate(() => document.querySelector('#spMapForm').requestSubmit());
            assert.equal(await page.evaluate(() => net.calls.length), 5); assert.equal(await page.locator('.swal2-confirm').isDisabled(), true);
            const sent = await page.evaluate(() => net.calls[4]); assert.equal(sent.csrf, 'synthetic-csrf'); assert.equal(sent.body.is_active, false);
            await page.evaluate(() => finish(4, 422, {message: '<img src=x onerror=unsafe=1> Portfolio already exists'}));
            await page.waitForFunction(() => !document.querySelector('#spMapForm button[type=submit]').disabled); assert.equal(await page.inputValue('#spMapPortfolio'), 'PK - LAB'); assert.equal(await page.locator('img:not(.swal2-image)').count(), 0);
            await page.locator('[data-sp-map=edit]').click(); await page.waitForFunction(() => net.calls.length === 6); assert.match(await page.evaluate(() => net.calls[5].url), /include_id=99/);
            await page.locator('[data-sp-map=manual]').click(); const literal = 'Manual <portfolio> & "name"'; await page.fill('#spMapPortfolio', literal); await page.uncheck('#spMapActive');
            await page.evaluate(payload => finish(5, 200, payload), {options: [{...field, id: 99, nama: 'Beyond first fifty'}], total: 99});
            await page.waitForFunction(() => !document.querySelector('#spMapForm button[type=submit]').disabled); assert.equal(await page.inputValue('#spMapPortfolio'), literal); assert.equal(await page.inputValue('#spMapField'), '99');
            await page.locator('#spMapForm button[type=submit]').click(); await page.evaluate(() => finish(6, 409, {message: 'Pemetaan berubah. Muat ulang daftar.'}));
            await page.waitForFunction(() => !document.querySelector('#spMapForm button[type=submit]').disabled); assert.equal(await page.inputValue('#spMapPortfolio'), literal); assert.equal(await page.evaluate(() => net.calls[6].body.version), row.version);
            await page.locator('[data-sp-map=refresh]').click(); await page.evaluate(() => finish(7, 200, null, true)); await page.evaluate(() => [...net.timers.values()][0]());
            await page.waitForFunction(() => document.querySelector('.spph-signing-content').textContent.includes('belum terkonfirmasi')); assert.equal(await page.inputValue('#spMapPortfolio'), literal);
            await page.locator('#spMapForm button[type=submit]').click(); await page.evaluate(payload => finish(8, 200, payload), {row: {...row, portfolio: literal, field_id: 99, is_active: false, version: 'c'.repeat(64)}, message: 'Pemetaan berhasil disimpan.'});
            await page.waitForFunction(() => net.calls.length === 10); await page.evaluate(() => finish(9, 500, {message: 'private-path'}));
            await page.waitForFunction(() => !document.querySelector('.swal2-confirm').disabled); assert.match(await page.locator('.spph-signing-content').textContent(), /Pemetaan berhasil disimpan.*Daftar belum diperbarui.*jangan ulangi/);
            assert.equal(await page.inputValue('#spMapField'), ''); assert.equal(await page.inputValue('#spMapPortfolio'), 'IT - FERS');
            await page.screenshot({path: `tmp/portfolio-${mobile ? 'mobile' : 'desktop'}.png`, fullPage: false});
            const box = await page.locator('.swal2-popup').boundingBox(); assert.ok(box.x >= 0 && box.width <= (mobile ? 390 : 1440));
            await page.locator('.swal2-confirm').click(); await page.waitForSelector('.swal2-popup', {state: 'hidden'});
            await page.evaluate(() => {window.task = SPPortfolioMaps.open({can_manage: false, portfolios: []});}); await page.waitForFunction(() => net.calls.length === 11); await page.evaluate(payload => finish(10, 200, payload), maps());
            await page.waitForSelector('.sg-master-row'); assert.equal(await page.locator('#spMapForm').count(), 0); assert.equal(await page.locator('[data-sp-map=edit]').count(), 0); await page.locator('.swal2-confirm').click();
            assert.deepEqual(errors, []); console.log(`PORTFOLIO_BROWSER_OK mobile=${mobile} manage_reads=2 viewer_reads=1 stale_reads_ignored=true drafts_preserved=true csrf=true duplicates=false selected_field_outside_page=true confirmed_write_refresh_error=true`); await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
