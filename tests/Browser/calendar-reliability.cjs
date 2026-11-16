const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

// Use the actual Blade content and production assets, with synthetic data only.
let fixture = fs.readFileSync('resources/views/collaboration-calendar/index.blade.php', 'utf8').split("@section('content')")[1].split('@endsection')[0];
fixture = fixture.replace(/@foreach[\s\S]*?@endforeach/g, '').replace(/@unless[^\n]*\n/g, '').replace(/@endunless/g, '').replace(/\{\{[\s\S]*?\}\}/g, '');

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1440, height: 1000}, isMobile: mobile, hasTouch: mobile});
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => { errors.push('Native browser dialog'); dialog.dismiss(); });
            await page.route('https://calendar.test/**', route => route.fulfill({contentType: 'text/html', body: '<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="csrf-token" content="synthetic-csrf">' + fixture}));
            await page.goto('https://calendar.test/page');
            await page.addStyleTag({path: 'public/assets/collaboration-calendar/calendar.css'});
            await page.evaluate(() => {
                Object.assign(document.querySelector('#collabCalendar').dataset, {eventsUrl: '/events', prSearchUrl: '/search', storeUrl: '/events', journeyTemplate: '/journey/__PPBJ__', updateTemplate: '/events/__EVENT__', statusTemplate: '/events/__EVENT__/status', readonly: '0'});
                const start = new Date(); start.setHours(9, 0, 0, 0);
                window.eventFixture = {id: 'event-one', title: '<img src=x onerror=window.unsafe=true>', start: start.toISOString(), end: null, source: 'collaboration', priority: 'normal', status: 'planned', audience: 'all', version: 1, can_edit: true, can_delete: true, can_status: true, creator: {name: 'Synthetic'}, ppbj: {id: 1}};
                window.net = {calls: [], pending: [], holdReads: false, holdWrites: true};
                window.Swal = {fire: async options => ({isConfirmed: Boolean(options.showCancelButton)})};
                window.fetch = (url, options) => {
                    net.calls.push({url, method: options.method || 'GET', headers: options.headers, body: options.body});
                    const body = url.startsWith('/search') ? {results: [{id: 1, ppbj_no: 'PR-TEST', description: 'Plastik'}]} : {events: [eventFixture], meta: {}};
                    if ((options.method && net.holdWrites) || (!options.method && net.holdReads)) {
                        // Deliberately ignore abort to verify late responses never reach the UI.
                        return new Promise(resolve => net.pending.push({url, resolve: (status, data) => resolve({ok: status < 400, status, json: async () => data})}));
                    }
                    return Promise.resolve({ok: true, status: 200, json: async () => body});
                };
            });
            await page.addScriptTag({path: 'public/assets/collaboration-calendar/calendar.js'});
            await page.waitForSelector('.day-event');
            assert.equal(await page.locator('img').count(), 0);
            assert.equal(await page.evaluate(() => Boolean(window.unsafe)), false);

            // A real tap/click opens the form; repeated submit events still send once.
            if (mobile) await page.tap('#calendarAdd'); else await page.click('#calendarAdd');
            await page.locator('[name="title"]').fill('Agenda percobaan');
            await page.evaluate(() => {
                const form = document.querySelector('#calendarForm');
                form.dispatchEvent(new Event('submit', {cancelable: true}));
                form.dispatchEvent(new Event('submit', {cancelable: true}));
            });
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.method === 'POST').length), 1);
            assert.equal(await page.locator('#calendarSave').isDisabled(), true);
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#calendarFormModal').isVisible(), true);
            await page.evaluate(() => net.pending.shift().resolve(500, {message: 'Koneksi putus'}));
            await page.waitForFunction(() => !document.querySelector('#calendarSave').disabled);
            assert.match(await page.locator('#calendarFormError').textContent(), /belum terkonfirmasi/);
            assert.equal(await page.locator('[name="title"]').inputValue(), 'Agenda percobaan');
            assert.equal(await page.evaluate(() => net.calls.find(x => x.method === 'POST').headers['X-CSRF-TOKEN']), 'synthetic-csrf');
            await page.locator('#calendarSave').click();
            await page.evaluate(() => net.pending.shift().resolve(201, {message: 'Tersimpan'}));
            await page.waitForFunction(() => document.querySelector('#calendarFormModal').hidden);

            await page.locator('.day-event').first().click();
            await page.evaluate(() => {
                document.querySelector('[data-status="done"]').click();
                document.querySelector('[data-status="in_progress"]').click();
            });
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.method === 'PATCH').length), 1);
            await page.evaluate(() => net.pending.shift().resolve(409, {message: 'Agenda sudah diperbarui pengguna lain.'}));
            await page.waitForFunction(() => !document.querySelector('[data-status="done"]').disabled);
            assert.match(await page.locator('#calendarDetailError').textContent(), /pengguna lain/);
            await page.evaluate(() => { window.Swal.fire = async () => ({isConfirmed: false}); });
            await page.locator('#calendarDelete').click();
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.method === 'DELETE').length), 0);
            await page.evaluate(() => {
                window.Swal.fire = async () => ({isConfirmed: true});
                document.querySelector('#calendarDelete').click();
                document.querySelector('#calendarDelete').click();
            });
            await page.waitForFunction(() => net.pending.length === 1);
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.method === 'DELETE').length), 1);
            await page.evaluate(() => net.pending.shift().resolve(200, {message: 'Dihapus'}));
            await page.waitForFunction(() => document.querySelector('#calendarDetailModal').hidden);

            await page.click('#calendarPrFinderOpen');
            await page.locator('#calendarPrQuery').fill('plastik');
            await page.waitForSelector('.pr-result');
            await page.evaluate(() => { net.holdReads = true; });
            await page.locator('#calendarPrQuery').fill('pencarian lama');
            await page.waitForFunction(() => net.pending.length === 1);
            await page.locator('#calendarPrQuery').fill('');
            await page.evaluate(() => net.pending.shift().resolve(200, {results: [{id: 99, ppbj_no: 'HASIL-LAMA'}]}));
            await page.waitForTimeout(350);
            assert.equal(await page.locator('.pr-result').count(), 0);
            assert.match(await page.locator('#calendarPrState').textContent(), /minimal 2/);
            await page.keyboard.press('Escape');

            await page.selectOption('#calendarSource', 'sla');
            await page.waitForFunction(() => net.pending.length === 1);
            await page.selectOption('#calendarSource', 'all');
            await page.evaluate(() => net.pending.shift().resolve(200, {events: [{...eventFixture, title: 'STALE EVENT'}]}));
            await page.waitForTimeout(50);
            assert.equal(await page.locator('#calendarLoading').isVisible(), false);
            assert.ok(!(await page.locator('#calendarGrid').textContent()).includes('STALE EVENT'));
            assert.deepEqual(errors, []);
            console.log(`CALENDAR_BROWSER_OK mobile=${mobile} stale_reads_ignored=true duplicate_write=false csrf=true conflict_recovery=true literal_text=true`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
