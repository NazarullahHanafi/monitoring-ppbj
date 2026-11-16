const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/account/edit.blade.php', 'utf8');
const form = blade.slice(blade.indexOf('            <form method="POST"'), blade.indexOf('</form>') + 7)
    .replaceAll("{{ route('account.password') }}", '/account/password')
    .replace(/data-max-password-bytes="{{[\s\S]*?}}"/g, 'data-max-password-bytes="72"')
    .replace(/@error\('[^']+'\)[\s\S]*?@enderror/g, '')
    .replaceAll('@csrf', '<input type="hidden" name="_token" value="synthetic">')
    .replace(/{{[\s\S]*?}}/g, '').replace(/{--[\s\S]*?--}/g, '');
const fixture = '<meta name="viewport" content="width=device-width,initial-scale=1">' + form;
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: fixture}));
            await page.goto('https://account-fixture.test/account'); await page.addStyleTag({path: 'public/assets/app/form-ux.css'});
            await page.addStyleTag({content: 'body{font:14px Arial;padding:16px}form{max-width:520px;margin:auto}form>div{margin:14px 0}input{box-sizing:border-box;width:100%;padding:8px}button{padding:8px;min-height:32px}svg{width:18px;height:18px}.relative{display:flex}label{display:block}'});
            await page.evaluate(() => {
                Object.defineProperty(navigator, 'clipboard', {value: {writeText: () => Promise.reject(Error('Synthetic denied'))}, configurable: true});
                window.net = {calls: [], pending: []};
                window.fetch = (url, options) => {net.calls.push({url, method: options.method, body: [...options.body.entries()], csrf: options.headers['X-CSRF-TOKEN']}); return new Promise(resolve => net.pending.push(resolve));};
                window.finish = (index, status, payload, html = false) => net.pending[index]({ok: status < 400, status, headers: {get: () => html ? 'text/html' : 'application/json'}, json: async () => payload});
            });
            for (const name of ['form-ux', 'account-password']) await page.addScriptTag({path: `public/assets/app/${name}.js`});
            await page.click('#submitBtn'); assert.equal(await page.evaluate(() => net.calls.length), 0); assert.equal(await page.locator('#currentPassword').getAttribute('aria-invalid'), 'true');
            await page.locator('#currentPassword').fill('OldSynthetic123'); await page.locator('#newPassword').fill('Aa1!' + 'é'.repeat(35)); await page.locator('#confirmPassword').fill('Aa1!' + 'é'.repeat(35));
            await page.click('#submitBtn'); assert.equal(await page.evaluate(() => net.calls.length), 0); assert.match(await page.locator('.ux-error-summary').textContent(), /isian perlu diperiksa/);
            await page.locator('button[onclick^="generatePassword"]').click(); await page.waitForFunction(() => document.querySelector('[data-account-status]').textContent.includes('manual'));
            const generated = await page.locator('#newPassword').inputValue(); assert.equal(generated.length, 16); assert.equal(await page.locator('#confirmPassword').inputValue(), generated);
            assert.equal(await page.locator('#newPassword').getAttribute('type'), 'password');
            await page.click('#submitBtn'); await page.evaluate(() => {document.getElementById('changePasswordForm').requestSubmit(); generatePassword(); togglePassword('newPassword');});
            assert.equal(await page.evaluate(() => net.calls.length), 1); assert.equal(await page.locator('#newPassword').inputValue(), generated); assert.equal(await page.locator('#newPassword').getAttribute('type'), 'password');
            const sent = await page.evaluate(() => net.calls[0]); assert.equal(sent.method, 'POST'); assert.equal(sent.csrf, 'synthetic'); assert.equal(new Map(sent.body).get('password'), generated);
            await page.evaluate(() => finish(0, 422, {errors: {current_password: ['Password lama <img src=x onerror=unsafe=1> salah.']}})); await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
            assert.equal(await page.locator('img').count(), 0); assert.equal(await page.locator('#newPassword').inputValue(), generated);
            await page.click('#submitBtn'); await page.evaluate(() => finish(1, 200, null, true)); await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
            assert.match(await page.locator('[data-account-status]').textContent(), /belum dapat diverifikasi/);
            await page.click('#submitBtn'); await page.evaluate(() => finish(2, 409, {errors: {current_password: ['Password telah berubah.']}})); await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
            assert.equal(await page.locator('#currentPassword').inputValue(), ''); assert.equal(await page.locator('#newPassword').inputValue(), generated);
            await page.locator('#currentPassword').fill('CurrentSynthetic123'); await page.click('#submitBtn'); await page.evaluate(() => finish(3, 200, {success: true, message: 'Password berhasil diperbarui.'}));
            await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
            for (const id of ['currentPassword', 'newPassword', 'confirmPassword']) {assert.equal(await page.locator('#' + id).inputValue(), ''); assert.equal(await page.locator('#' + id).getAttribute('type'), 'password');}
            assert.match(await page.locator('[data-account-status]').textContent(), /berhasil/);
            for (const [id, value] of [['currentPassword', 'CurrentSynthetic123'], ['newPassword', 'NextSynthetic123'], ['confirmPassword', 'NextSynthetic123']]) await page.locator('#' + id).fill(value);
            await page.click('#submitBtn'); await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})));
            assert.equal(await page.locator('#newPassword').inputValue(), ''); await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true})));
            await page.locator('#newPassword').fill('DraftAfterReturn123'); await page.evaluate(() => finish(4, 200, {success: true}));
            assert.equal(await page.locator('#newPassword').inputValue(), 'DraftAfterReturn123'); assert.equal(await page.evaluate(() => net.calls.length), 5);
            await page.evaluate(() => {togglePassword('newPassword'); Object.defineProperty(document, 'hidden', {value: true, configurable: true}); document.dispatchEvent(new Event('visibilitychange'));});
            assert.equal(await page.locator('#newPassword').getAttribute('type'), 'password'); assert.deepEqual(errors, []);
            console.log(`ACCOUNT_PASSWORD_BROWSER_OK mobile=${mobile} real_form=true crypto_generator=true clipboard_fallback=true byte_limits=true duplicate_blocked=true literal_errors=true stale_password=true success_clears_secrets=true pagehide_clears_secrets=true late_save_ignored=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
