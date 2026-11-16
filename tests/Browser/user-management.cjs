const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/users/index.blade.php', 'utf8');
const modals = blade.slice(blade.indexOf('    <div id="addUserModal"'), blade.indexOf("    @push('scripts')"))
    .replaceAll('@csrf', '<input type="hidden" name="_token" value="synthetic">')
    .replaceAll("@method('PUT')", '<input type="hidden" name="_method" value="PUT">')
    .replace(/@foreach\(\$masterBuyers as \$buyerName\)[\s\S]*?@endforeach/g, '<option value="Buyer">Buyer</option>');
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic"><main data-user-directory><p id="userActionStatus" role="status"></p><button id="open" onclick="openAddUserModal()">Tambah</button><button id="delete" onclick="deleteUser(3,'Synthetic User')">Hapus</button></main>${modals}`;

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            let capture; const busyRecorded = new Promise(resolve => {capture = resolve;});
            await page.exposeFunction('captureBusy', capture);
            await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: fixture}));
            await page.goto('https://users-fixture.test/users');
            await page.addStyleTag({path: 'public/assets/app/form-ux.css'});
            await page.addStyleTag({content: '.hidden{display:none!important}.flex{display:flex}#addUserModal,#editUserModal,#passwordModal{position:fixed;inset:0;align-items:center;justify-content:center;background:#0005;padding:12px}#addUserModal>div,#editUserModal>div,#passwordModal>div{background:white;padding:16px;max-width:410px;max-height:90vh;overflow-y:auto}input,select{max-width:100%;box-sizing:border-box}button{min-height:32px}svg{width:18px;height:18px}'});
            await page.evaluate(() => {
                window.USER_MANAGEMENT_CONFIG = {baseUrl: '/users', storeUrl: '/users', csrfToken: 'synthetic'};
                Object.defineProperty(navigator, 'clipboard', {value: {writeText: () => Promise.reject(Error('Unavailable'))}, configurable: true});
                window.net = {calls: [], pending: []};
                window.fetch = (url, options) => {
                    net.calls.push({url, method: options.method, csrf: options.headers['X-CSRF-TOKEN'], body: options.body ? [...options.body.entries()] : []});
                    return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (status, payload, html = false) => net.pending.shift()({ok: status < 400, status,
                    headers: {get: () => html ? 'text/html' : 'application/json'}, json: async () => payload});
            });
            for (const file of ['form-ux', 'user-management']) await page.addScriptTag({path: `public/assets/app/${file}.js`});
            await page.click('#open'); await page.locator('#addUserForm button[type=submit]').click();
            assert.equal(await page.evaluate(() => net.calls.length), 0);
            assert.equal(await page.locator('#addName').getAttribute('aria-invalid'), 'true');
            await page.locator('#addName').fill('Synthetic User'); await page.locator('#addEmail').fill('synthetic@example.test');
            await page.locator('#addUserForm button[onclick^=generatePassword]').click();
            await page.waitForFunction(() => document.querySelector('#addUserForm [data-user-notice]').textContent.includes('Salin'));
            assert.equal((await page.locator('#addPassword').inputValue()).length, 16);
            await page.locator('#addUserForm button[type=submit]').click();
            await page.evaluate(() => {document.querySelector('#addUserForm').requestSubmit(); closeAddUserModal(); openEditModal(9, 'Wrong', '', 'user', 'umum', '', '');});
            assert.equal(await page.evaluate(() => net.calls.length), 1); assert.equal(await page.locator('#addUserModal').isVisible(), true);
            await page.evaluate(() => finish(422, {errors: {email: ['Email <img src=x onerror=unsafe=1> sudah ada.']}}));
            await page.waitForFunction(() => !document.querySelector('#addName').disabled);
            assert.equal(await page.locator('img').count(), 0); assert.equal(await page.evaluate(() => window.unsafe), undefined);
            assert.equal(await page.locator('#addEmail').inputValue(), 'synthetic@example.test');
            await page.locator('#addUserForm button[type=submit]').click(); await page.evaluate(() => finish(200, null, true));
            await page.waitForFunction(() => !document.querySelector('#addName').disabled);
            assert.match(await page.locator('#addUserForm [data-user-notice]').textContent(), /belum dapat diverifikasi/);
            await page.evaluate(() => closeAddUserModal()); assert.equal(await page.locator('#addPassword').inputValue(), '');
            assert.equal(await page.locator('#addPassword').getAttribute('type'), 'password');
            await page.evaluate(() => openEditModal(3, 'Synthetic User', 'synthetic@example.test', 'user', 'umum', '', ''));
            await page.locator('#editUserForm button[type=submit]').click();
            const edit = await page.evaluate(() => net.calls.at(-1));
            assert.equal(edit.url, '/users/3'); assert.equal(edit.csrf, 'synthetic'); assert.equal(new Map(edit.body).get('_method'), 'PUT');
            await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})));
            await page.evaluate(() => {finish(200, {success: true}); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}));});
            await page.waitForFunction(() => !document.querySelector('#editName').disabled);
            assert.equal(await page.evaluate(() => net.calls.length), 3);
            await page.evaluate(() => {closeEditUserModal(); openPasswordModal(3, '<img src=x onerror=unsafe=1>');});
            assert.equal(await page.locator('#targetUserName').textContent(), '<img src=x onerror=unsafe=1>'); assert.equal(await page.locator('img').count(), 0);
            await page.locator('#changePassword').fill('ChangedPass123!'); await page.locator('#passwordForm button[type=submit]').click();
            await page.evaluate(() => document.querySelector('#passwordForm').requestSubmit());
            const password = await page.evaluate(() => net.calls.at(-1));
            assert.equal(password.url, '/users/3/password'); assert.equal(new Map(password.body).get('_method'), 'PUT');
            assert.equal(await page.evaluate(() => net.calls.length), 4);
            await page.evaluate(() => finish(422, {errors: {password: ['Periksa password.']}}));
            await page.waitForFunction(() => !document.querySelector('#changePassword').disabled);
            assert.equal(await page.locator('#changePassword').inputValue(), 'ChangedPass123!');
            await page.locator('#passwordForm button[type=submit]').click(); await page.evaluate(() => finish(200, {success: true, message: 'Berhasil'}));
            await page.waitForFunction(() => document.querySelector('#passwordModal').classList.contains('hidden'));
            assert.equal(await page.locator('#changePassword').inputValue(), ''); assert.match(await page.locator('#userActionStatus').textContent(), /Password berhasil/);
            await page.click('#delete'); await page.evaluate(() => deleteUser(3, 'Duplicate'));
            assert.equal(await page.locator('dialog').count(), 1); await page.locator('dialog button').first().click();
            assert.equal(await page.evaluate(() => net.calls.length), 5);
            await page.click('#delete'); await page.locator('dialog button').last().click();
            assert.equal(await page.evaluate(() => net.calls.at(-1).method), 'DELETE');
            await page.evaluate(() => finish(403, {message: 'Forbidden'}));
            await page.waitForFunction(() => !document.querySelector('#delete').disabled);
            assert.match(await page.locator('#userActionStatus').textContent(), /izin/);
            await page.click('#delete'); await page.locator('dialog button').last().click();
            await page.evaluate(() => new MutationObserver(() => {
                if (document.querySelector('#userActionStatus').textContent === 'Deleted') {
                    deleteUser(3, 'Duplicate'); window.captureBusy({locked: document.querySelector('#delete').disabled, calls: net.calls.length});
                }
            }).observe(document.querySelector('#userActionStatus'), {childList: true}));
            await page.evaluate(() => finish(200, {success: true, message: 'Deleted'}));
            assert.deepEqual(await busyRecorded, {locked: true, calls: 7}); await page.waitForFunction(() => !window.net);
            assert.deepEqual(errors, []);
            console.log(`USER_MANAGEMENT_BROWSER_OK mobile=${mobile} real_modals=true crypto_generator=true clipboard_fallback=true drafts_retained=true method_spoofing=true duplicate_blocked=true literal_errors=true password_cleared=true late_results_ignored=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
