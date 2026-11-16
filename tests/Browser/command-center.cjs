const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/command-center/index.blade.php', 'utf8');
const fixture = '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic">' + blade.slice(blade.indexOf('<div id="commandCenter"'), blade.indexOf('@endsection'))
    .replace(/@foreach[\s\S]*?@endforeach/g, '')
    .replace(/{{ route\('command-center\.([^']+)'\) }}/g, (_, name) => '/command-center/' + name.replace('.', '/'))
    .replaceAll("{{ url('/command-center/journey') }}", '/command-center/journey')
    .replace(/{{ hash\([\s\S]*?}}/g, 'actor-A')
    .replace(/{{[\s\S]*?}}/g, '');
const overview = {generated_at: 'Synthetic', stats: {total: 3}, flow: [], risks: [], contracts: [], monthly: []};
const row = id => ({id, ppbj_no: 'PR-' + id, uraian: '<img src=x onerror=unsafe=1>', action_urls: {ppbj: 'javascript:alert(1)', sp: '/sp'}});
const journey = id => ({record: row(id), stages: [], real_tracking: [], audit: [], tracking_url: 'javascript:alert(1)', qr_url: '', archive_url: '/ppbj/' + id + '/archive'});
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = []; page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: fixture}));
            await page.goto('https://command-fixture.test/command-center'); await page.addStyleTag({path: 'public/assets/command-center/command-center.css'});
            await page.evaluate(() => {
                window.net = {calls: [], pending: []};
                window.fetch = (url, options) => {net.calls.push({url, method: options.method, body: options.body, signal: options.signal, csrf: options.headers['X-CSRF-TOKEN']}); return new Promise(resolve => net.pending.push(resolve));};
                window.finish = (index, status, payload, html = false) => net.pending[index]({ok: status < 400, status, headers: {get: () => html ? 'text/html' : 'application/json'}, json: async () => payload});
                document.documentElement.requestFullscreen = async () => {throw Error('Synthetic denied');};
            });
            await page.addScriptTag({path: 'public/assets/command-center/command-center.js'});
            await page.evaluate(data => finish(0, 200, data), overview); await page.waitForFunction(() => !document.getElementById('ccRefresh').disabled);
            assert.equal(await page.evaluate(() => Object.keys(sessionStorage).some(key => key.endsWith('actor-A'))), true);
            await page.click('#ccRefresh'); await page.evaluate(() => document.getElementById('ccRefresh').dispatchEvent(new Event('click')));
            assert.equal(await page.evaluate(() => net.calls.length), 2); await page.evaluate(data => finish(1, 200, data), overview); await page.waitForFunction(() => !document.getElementById('ccRefresh').disabled);
            await page.locator('#ccSearchInput').fill('OLD'); await page.locator('#ccSearchInput').press('Enter'); await page.locator('#ccSearchInput').press('Enter');
            assert.equal(await page.evaluate(() => net.calls.length), 3);
            await page.locator('#ccSearchInput').fill('NEW'); assert.equal(await page.evaluate(() => net.calls[2].signal.aborted), true);
            await page.evaluate(() => finish(2, 200, {count: 0, results: []})); assert.equal(await page.locator('#ccResultsModal').getAttribute('aria-hidden'), 'true');
            await page.locator('#ccSearchInput').press('Enter'); await page.evaluate(rows => finish(3, 200, {count: rows.length, results: rows}), [row(2), row(3)]);
            await page.waitForFunction(() => document.getElementById('ccResultsModal').classList.contains('open'));
            assert.equal(await page.locator('#ccResults a[href^="javascript:"]').count(), 0); assert.equal(await page.locator('#ccResults img').count(), 0);
            await page.evaluate(() => {document.querySelector('[data-journey="2"]').click(); document.querySelector('[data-journey="2"]').click();});
            assert.equal(await page.evaluate(() => net.calls.length), 5);
            await page.locator('#ccJourneyModal button[data-close-modal]').click(); await page.evaluate(data => finish(4, 200, data), journey(2));
            assert.equal(await page.locator('#ccJourneyModal').getAttribute('aria-hidden'), 'true'); assert.equal(await page.locator('#ccArchiveButton').count(), 0);
            await page.evaluate(() => {document.querySelector('[data-journey="2"]').click(); document.querySelector('[data-journey="3"]').click();});
            await page.evaluate(data => finish(5, 200, data), journey(2)); await page.evaluate(data => finish(6, 200, data), journey(3));
            await page.waitForFunction(() => document.querySelector('#ccJourney h2')?.textContent === 'PR-3');
            assert.equal(await page.locator('#ccJourney a[href^="javascript:"]').count(), 0);
            await page.click('#ccArchiveButton'); await page.evaluate(() => document.getElementById('ccArchiveButton').dispatchEvent(new Event('click')));
            assert.equal(await page.evaluate(() => net.calls.length), 8);
            await page.evaluate(() => document.querySelector('[data-journey="2"]').click());
            await page.evaluate(() => finish(7, 200, {state: 'available', documents: [{name: 'WRONG ARCHIVE'}]}));
            await page.evaluate(data => finish(8, 200, data), journey(2)); await page.waitForFunction(() => document.querySelector('#ccJourney h2')?.textContent === 'PR-2');
            assert.doesNotMatch(await page.locator('#ccJourney').textContent(), /WRONG ARCHIVE/);
            await page.click('#ccArchiveButton'); await page.evaluate(() => finish(9, 200, {state: 'available', documents: [{name: '<img src=x onerror=unsafe=1>', download_url: 'javascript:alert(1)', preview_url: 'https://example.test/doc'}]}));
            await page.waitForFunction(() => !document.getElementById('ccArchiveButton').disabled);
            await page.click('#ccArchiveButton'); assert.equal(await page.evaluate(() => net.calls.length), 10);
            assert.equal(await page.locator('#ccArchivePanel img').count(), 0); assert.equal(await page.locator('#ccArchivePanel a').count(), 1);
            await page.locator('#ccJourneyModal button[data-close-modal]').click();
            await page.locator('#ccAskInput').fill('PR belum SPPH'); await page.locator('#ccAskInput').press('Enter'); await page.locator('#ccAskInput').press('Enter');
            assert.equal(await page.evaluate(() => net.calls.length), 11); assert.equal(await page.evaluate(() => net.calls[10].csrf), 'synthetic');
            await page.click('#ccReconciliationButton'); await page.evaluate(() => finish(10, 200, {answer: 'OLD ANSWER', results: []}));
            await page.evaluate(() => finish(11, 200, {summary: {}, results: []}));
            await page.waitForFunction(() => document.getElementById('ccResultsModal').classList.contains('open'));
            assert.match(await page.locator('#ccResultsTitle').textContent(), /Rekonsiliasi/); assert.doesNotMatch(await page.locator('#ccResultsSummary').textContent(), /OLD ANSWER/);
            await page.locator('#ccResultsModal button[data-close-modal]').click();
            await page.click('#ccSearchButton'); await page.evaluate(() => finish(12, 200, null, true)); await page.waitForFunction(() => !document.getElementById('ccSearchButton').disabled);
            assert.match(await page.locator('#ccRequestStatus').textContent(), /belum dapat diverifikasi/);
            await page.click('#ccSearchButton'); await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})));
            await page.evaluate(() => {finish(13, 200, {results: [], count: 0}); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}));});
            assert.equal(await page.locator('#ccResultsModal').getAttribute('aria-hidden'), 'true');
            await page.click('#ccFullscreen'); assert.equal(await page.locator('body').evaluate(node => node.classList.contains('cc-fullscreen')), true);
            await page.click('#ccSearchButton'); await page.evaluate(() => finish(14, 200, {results: [], count: 0}));
            await page.waitForFunction(() => document.getElementById('ccResultsModal').classList.contains('open')); await page.keyboard.press('Escape');
            assert.equal(await page.locator('body').evaluate(node => node.classList.contains('cc-fullscreen')), true); await page.keyboard.press('Escape');
            assert.equal(await page.locator('body').evaluate(node => node.classList.contains('cc-fullscreen')), false);
            assert.deepEqual(errors, []);
            console.log(`COMMAND_CENTER_BROWSER_OK mobile=${mobile} refresh_singleflight=true stale_search_ignored=true closed_modal_stays_closed=true passport_identity=true archive_isolation=true duplicate_blocked=true safe_urls=true scoped_cache=true fullscreen_fallback=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
