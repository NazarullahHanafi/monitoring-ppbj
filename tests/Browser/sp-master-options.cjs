const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const fixture = fs.readFileSync('tmp/sp-master-fixture.html', 'utf8');
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1440, height: 1000}, isMobile: mobile, hasTouch: mobile});
            const errors = [], calls = []; page.on('pageerror', error => errors.push(error.message)); page.on('dialog', dialog => {errors.push('Native browser dialog'); dialog.dismiss();});
            await page.exposeFunction('captureMasterCall', value => calls.push(value));
            await page.addInitScript(() => {
                window.net = {pending: [], timers: new Map(), serial: 100000};
                const timeout = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
                window.setTimeout = (fn, delay, ...args) => {if (delay === 30000) {const id = ++net.serial; net.timers.set(id, fn); return id;} return timeout(fn, delay, ...args);};
                window.clearTimeout = id => {if (!net.timers.delete(id)) clear(id);};
                window.fetch = (url, options) => {
                    captureMasterCall({url, method: options.method, body: typeof options.body === 'string' ? JSON.parse(options.body) : [...options.body.entries()], csrf: options.headers['X-CSRF-TOKEN']});
                    return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (status, payload, stalled = false) => net.pending.shift()({ok: status < 400, status, headers: {get: () => 'application/json'}, json: () => stalled ? new Promise(() => {}) : Promise.resolve(payload)});
            });
            await page.route('**/*', route => {const url = new URL(route.request().url()); return url.pathname.startsWith('/assets/') || url.pathname.startsWith('/build/') ? route.fulfill({path: 'public' + url.pathname}) : route.fulfill({contentType: 'text/html', body: fixture});});
            await page.goto('https://sp-master-fixture.test/sp-master-options');
            if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
            await page.locator('[onclick="openAddModal()"]').click();
            await page.locator('#addForm [name=nama]').fill(''); await page.locator('#addForm button[type=submit]').click();
            assert.equal(calls.length, 0); assert.equal(await page.locator('#addForm [name=nama]').getAttribute('aria-invalid'), 'true');
            const literal = 'A & "Quote" <img src=x onerror=unsafe=1>';
            await page.locator('#addForm [name=nama]').fill(literal); await page.locator('#addForm [type=checkbox]').uncheck();
            await page.locator('#addForm button[type=submit]').click(); await page.evaluate(() => {document.querySelector('#addForm').requestSubmit(); closeAddModal(); openEditModal(1, 'jabatan_sci', 'overwritten', 1);});
            await page.waitForFunction(() => net.pending.length === 1); assert.equal(calls.length, 1); assert.equal(await page.locator('#addModal').isVisible(), true);
            assert.equal(new Map(calls[0].body).get('is_active'), '0'); assert.equal(new Map(calls[0].body).get('nama'), literal); assert.equal(calls[0].csrf, 'synthetic-csrf');
            await page.evaluate(() => finish(422, {errors: {nama: ['Nama sudah dipakai.']}})); await page.waitForFunction(() => !document.querySelector('#addForm [name=nama]').disabled);
            assert.equal(await page.locator('#addForm [name=nama]').inputValue(), literal); assert.equal(await page.locator('#addForm [name=nama]').getAttribute('aria-invalid'), 'true'); assert.equal(await page.locator('img:not(.swal2-image)').count(), 0);
            await page.locator('#addForm button[type=button]').click(); await page.getByRole('button', {name: 'Edit', exact: true}).click();
            const version = await page.locator('#editForm [name=version]').inputValue(); assert.match(version, /^[a-f0-9]{64}$/);
            await page.locator('#editNama').fill('Draft preserved'); await page.locator('#editForm button[type=submit]').click();
            await page.evaluate(() => finish(409, {message: 'Master sudah berubah. Salin isian sebelum memuat ulang.'})); await page.waitForFunction(() => !document.querySelector('#editNama').disabled);
            assert.equal(await page.locator('#editNama').inputValue(), 'Draft preserved'); assert.match(await page.locator('#editForm [data-master-notice]').textContent(), /sudah berubah/);
            assert.equal(new Map(calls[1].body).get('_method'), 'PUT'); assert.equal(new Map(calls[1].body).get('version'), version);
            await page.locator('#editForm button[type=submit]').click(); await page.evaluate(() => {finish(200, null, true); [...net.timers.values()][0]();});
            await page.waitForFunction(() => !document.querySelector('#editNama').disabled); assert.match(await page.locator('#editForm [data-master-notice]').textContent(), /belum terkonfirmasi/); assert.equal(calls.length, 3);
            await page.locator('#editForm button[type=button]').click(); await page.getByRole('button', {name: 'Hapus', exact: true}).click();
            await page.evaluate(() => deleteMasterOption('duplicate', 'type', '/sp-master-options/1')); assert.equal(await page.locator('.swal2-popup').count(), 1);
            await page.locator('.swal2-cancel').click(); assert.equal(calls.length, 3);
            await page.getByRole('button', {name: 'Hapus', exact: true}).click(); await page.locator('#masterDeletePassword').fill('WrongPass!'); await page.locator('.swal2-confirm').click();
            await page.evaluate(() => finish(422, {message: '<img src=x onerror=unsafe=1> Password salah.'})); await page.waitForFunction(() => document.querySelector('.swal2-validation-message').textContent.includes('Password salah'));
            assert.equal(await page.locator('img:not(.swal2-image)').count(), 0); assert.equal(await page.locator('#masterDeletePassword').inputValue(), ''); assert.equal(calls[3].body.version, version);
            await page.locator('#masterDeletePassword').fill('AnotherPass!'); await page.locator('.swal2-confirm').click(); await page.evaluate(() => {finish(200, null, true); [...net.timers.values()][0]();});
            await page.waitForFunction(() => document.querySelector('.swal2-validation-message').textContent.includes('belum terkonfirmasi')); assert.equal(await page.locator('.swal2-cancel').isEnabled(), true);
            await page.locator('#masterDeletePassword').fill('ThirdPass!'); await page.locator('.swal2-confirm').click();
            await page.evaluate(() => finish(429, {locked: true, message: 'Password salah 3 kali. Dikunci 15 menit.', retry_after: 900, locked_until: 'invalid-date'}));
            await page.waitForSelector('#masterDeleteCountdown'); assert.match(await page.locator('#masterDeleteCountdown').textContent(), /^00:(15:00|14:59)$/);
            await page.getByRole('button', {name: 'Saya mengerti', exact: true}).click();
            await page.locator('[onclick="openAddModal()"]').click(); await page.locator('#addForm [name=nama]').fill('Interrupted draft'); await page.locator('#addForm button[type=submit]').click();
            await page.evaluate(() => {window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true})); finish(201, {option: {id: 2, type: 'jabatan_sci', nama: 'Late result', is_active: false, version: 'a'.repeat(64)}});});
            await page.waitForFunction(() => !document.querySelector('#addForm [name=nama]').disabled);
            assert.equal(await page.locator('#addForm [name=nama]').inputValue(), 'Interrupted draft'); assert.match(await page.locator('#masterStatus').textContent(), /belum terverifikasi/);
            await page.locator('#addForm [name=nama]').fill('Saved once'); await page.locator('#addForm button[type=submit]').click();
            await page.evaluate(() => {document.querySelector('#addForm').requestSubmit(); finish(201, {message: 'Tersimpan', option: {id: 2, type: 'jabatan_sci', nama: 'Saved once', is_active: false, version: 'a'.repeat(64)}});});
            await page.waitForURL('**/sp-master-options?type=jabatan_sci'); assert.equal(calls.length, 8);
            assert.deepEqual(errors, []); await page.screenshot({path: `tmp/sp-master-${mobile ? 'mobile' : 'desktop'}.png`, fullPage: false});
            console.log(`SP_MASTER_BROWSER_OK mobile=${mobile} custom_validation=true explicit_false=true csrf=true stale_drafts=true duplicates=false body_deadline=true delete_password_cleared=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
