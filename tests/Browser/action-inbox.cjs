const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/collaboration-inbox/index.blade.php', 'utf8');
const modals = blade.slice(blade.indexOf('    <div id="ciCreateModal"'), blade.indexOf('@endsection'))
    .replace(/@foreach\(\$users[\s\S]*?@endforeach/g, '<option value="7">PIC</option>')
    .replace(/@foreach\(\[\s\S]*?@endforeach/g, '<label><input type="checkbox" name="checklist_items[]" value="Bukti" checked>Bukti</label>')
    .replaceAll("{{ route('collaboration-inbox.store') }}", '/collaboration-inbox')
    .replaceAll('@csrf', '<input type="hidden" name="_token" value="synthetic">')
    .replaceAll("@method('PATCH')", '<input type="hidden" name="_method" value="PATCH">')
    .replace(/{{[\s\S]*?}}/g, '');
const actionForm = (id, confirm = false) => `<form id="${id}" method="POST" action="/collaboration-inbox/synthetic/status" ${confirm ? 'data-ci-confirm' : ''}><input type="hidden" name="_token" value="synthetic"><input type="hidden" name="_method" value="PATCH"><input name="version" type="hidden" value="3"><input name="action" type="hidden" value="${confirm ? 'cancel' : 'acknowledge'}"><button type="submit">${id}</button></form>`;
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><main id="collaborationInbox" class="ci-shell" data-index-url="/collaboration-inbox" data-search-url="/ppbj-search"><button id="ciFocusButton">Mode Fokus</button><button id="ciOpenCreate">Buat</button>${actionForm('status')}${actionForm('cancel', true)}<button class="ci-note-action" data-url="/collaboration-inbox/synthetic/status" data-action="return" data-version="3">Kembalikan</button>${modals}`;
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: fixture}));
            await page.goto('https://inbox-fixture.test/collaboration-inbox?priority=high');
            for (const path of ['public/assets/app/form-ux.css', 'public/assets/collaboration-inbox/inbox.css']) await page.addStyleTag({path});
            await page.evaluate(() => {
                window.net = {calls: [], pending: []};
                window.fetch = (url, options) => {net.calls.push({url, method: options.method, body: options.body ? [...options.body.entries()] : [], csrf: options.headers['X-CSRF-TOKEN']}); return new Promise(resolve => net.pending.push(resolve));};
                window.finish = (index, status, payload, html = false) => net.pending[index]({ok: status < 400, status, headers: {get: () => html ? 'text/html' : 'application/json'}, json: async () => payload});
                let full = null;
                Object.defineProperty(document, 'fullscreenElement', {get: () => full});
                document.getElementById('collaborationInbox').requestFullscreen = async () => {await Promise.resolve(); full = document.getElementById('collaborationInbox'); document.dispatchEvent(new Event('fullscreenchange'));};
                document.exitFullscreen = async () => {full = null; document.dispatchEvent(new Event('fullscreenchange'));};
            });
            for (const path of ['public/assets/app/form-ux.js', 'public/assets/collaboration-inbox/inbox.js']) await page.addScriptTag({path});
            await page.click('#ciFocusButton'); assert.match(await page.locator('#ciFocusButton').textContent(), /Keluar Fokus/);
            await page.click('#ciOpenCreate');
            assert.equal(await page.evaluate(() => document.fullscreenElement.contains(document.getElementById('ciCreateModal'))), true);
            await page.locator('#ciCreateForm button[type=submit]').click(); assert.equal(await page.evaluate(() => net.calls.length), 0);
            assert.equal(await page.locator('#ciTitle').getAttribute('aria-invalid'), 'true');
            await page.locator('#ciPrSearch').fill('OLD'); await page.waitForFunction(() => net.calls.length === 1);
            await page.locator('#ciPrSearch').fill('NEW');
            await page.evaluate(() => finish(0, 200, {results: [{id: 1, ppbj_no: 'OLD'}]}));
            assert.equal(await page.locator('#ciPrResults').isVisible(), false);
            await page.waitForFunction(() => net.calls.length === 2);
            await page.evaluate(() => finish(1, 200, {results: [{id: 2, ppbj_no: 'NEW', description: '<img src=x onerror=unsafe=1>'}]}));
            await page.locator('#ciPrResults button').click(); assert.equal(await page.locator('#ciPpbjId').inputValue(), '2');
            assert.equal(await page.locator('img').count(), 0);
            await page.locator('#ciCreateForm textarea').fill('Draft tetap tersedia');
            await page.locator('#ciCreateForm button[type=submit]').click();
            await page.evaluate(() => {document.getElementById('ciCreateForm').requestSubmit(); document.getElementById('ciCloseCreate').click();});
            assert.equal(await page.evaluate(() => net.calls.length), 3); assert.equal(await page.locator('#ciCreateModal').isVisible(), true);
            await page.evaluate(() => finish(2, 422, {errors: {title: ['Judul <img src=x onerror=unsafe=1> tidak sesuai.']}}));
            await page.waitForFunction(() => !document.getElementById('ciTitle').disabled);
            assert.equal(await page.locator('#ciCreateForm textarea').inputValue(), 'Draft tetap tersedia'); assert.equal(await page.locator('img').count(), 0);
            await page.locator('#ciCreateForm button[type=submit]').click(); await page.evaluate(() => finish(3, 409, {}));
            await page.waitForFunction(() => !document.getElementById('ciTitle').disabled);
            assert.equal(await page.locator('#ciCreateForm [data-ci-status] a').getAttribute('href'), 'https://inbox-fixture.test/collaboration-inbox?priority=high');
            await page.click('#ciCloseCreate');
            await page.locator('#cancel button').click(); await page.evaluate(() => document.getElementById('cancel').requestSubmit());
            assert.equal(await page.locator('dialog').count(), 1); await page.locator('dialog button').first().click(); assert.equal(await page.evaluate(() => net.calls.length), 4);
            await page.locator('#cancel button').click(); await page.locator('dialog button').last().click();
            await page.evaluate(() => finish(4, 200, null, true)); await page.waitForFunction(() => !document.querySelector('#cancel button').disabled);
            assert.match(await page.locator('#cancel [data-ci-status]').textContent(), /belum dapat diverifikasi/);
            await page.locator('.ci-note-action').click(); await page.locator('#ciNoteForm textarea').fill('Perlu bukti tambahan');
            await page.locator('#ciNoteForm button[type=submit]').click();
            const sent = await page.evaluate(() => net.calls.at(-1));
            assert.equal(sent.method, 'POST'); assert.equal(sent.csrf, 'synthetic'); assert.equal(new Map(sent.body).get('_method'), 'PATCH'); assert.equal(new Map(sent.body).get('version'), '3');
            await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})));
            await page.evaluate(() => finish(5, 200, {success: true, redirect_url: '/collaboration-inbox'}));
            await page.waitForFunction(() => !document.querySelector('#ciNoteForm textarea').disabled);
            assert.equal(await page.locator('#ciNoteForm textarea').inputValue(), 'Perlu bukti tambahan'); assert.equal(await page.evaluate(() => net.calls.length), 6);
            await page.click('#ciCloseNote'); await page.locator('#status button').click();
            await page.evaluate(() => finish(6, 200, {success: true, redirect_url: 'https://untrusted.test/collaboration-inbox'}));
            await page.waitForFunction(() => !document.querySelector('#status button').disabled);
            assert.match(await page.locator('#status [data-ci-status]').textContent(), /Tujuan halaman belum valid/);
            assert.deepEqual(errors, []);
            console.log(`ACTION_INBOX_BROWSER_OK mobile=${mobile} real_modals=true fullscreen_contains_dialog=true stale_search_ignored=true duplicate_blocked=true drafts_retained=true safe_confirmation=true version_preserved=true late_save_ignored=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
