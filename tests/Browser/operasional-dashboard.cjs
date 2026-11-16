const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
    const blade = fs.readFileSync('resources/views/operasional/dashboard.blade.php', 'utf8');
    const start = blade.indexOf('    function formatRupiahDashboard');
    const end = blade.indexOf('    // ================= MANUAL', start);
    const renderers = blade.slice(start, end).replaceAll("{{ route('torpr.index') }}", '/torpr');
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [], requests = [];
            let postStatus = 500, release;
            const malicious = '"><img src=x onerror="window.unsafe=true">';
            let data = {stats: {total: 1, draft: 0, pending: 1, approved: 0, rejected: 0}, kpi: {avgPendingHours: 1}, chart: {labels: [], series: []},
                latest: [{id: 1, nomor_pr: malicious, tujuan_pengadaan: '<svg/onload=window.unsafe=true>', tanggal_pr: '2026-11-13', status: 'PENDING'}],
                topPortofolios: [{portofolio: malicious, total_pr: 1, total_harga: 100, rata_harga: 100}]};
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => { errors.push('Native dialog'); dialog.dismiss(); });
            await page.route('https://ops.test/**', async route => {
                const request = route.request(), path = new URL(request.url()).pathname;
                if (path === '/data') return route.fulfill({json: {success: true, data}});
                if (path === '/refresh') {
                    requests.push(request.headers());
                    if (postStatus === 500) await new Promise(resolve => { release = resolve; });
                    return route.fulfill({status: postStatus, json: {success: postStatus === 200}});
                }
                if (path !== '/dashboard') errors.push('Unexpected content request ' + path);
                return route.fulfill({contentType: 'text/html', body: '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><button type="button" id="refreshBtn"><span id="refreshIcon">Refresh</span></button><p id="opsDashboardStatus"></p><div id="top-portofolio-list"></div><table><tbody id="latest-rows-tbody"></tbody></table>'});
            });
            await page.goto('https://ops.test/dashboard');
            await page.addScriptTag({path: 'public/assets/app/operasional-dashboard.js'});
            await page.addScriptTag({content: renderers});
            await page.evaluate(async () => {
                window.control = OperationalDashboard.start({dataUrl: '/data', refreshUrl: '/refresh', csrf: 'synthetic-csrf', onData(data) { updateLatestRows(data.latest); updateTopPortofolios(data.topPortofolios); }});
                await control.poll();
            });
            assert.equal(await page.locator('#top-portofolio-list img, #latest-rows-tbody img, svg[onload]').count(), 0);
            assert.equal(await page.evaluate(() => window.unsafe === true), false);
            assert.ok((await page.locator('#top-portofolio-list').textContent()).includes(malicious));
            data = {...data, stats: {total: 0, draft: 0, pending: 0, approved: 0, rejected: 0}, latest: [], topPortofolios: []};
            await page.evaluate(() => control.poll());
            assert.ok((await page.locator('#latest-rows-tbody').textContent()).includes('Belum ada'));
            assert.ok((await page.locator('#top-portofolio-list').textContent()).includes('Belum ada'));
            if (mobile) await page.tap('#refreshBtn'); else await page.click('#refreshBtn');
            await page.evaluate(() => { control.refresh(); control.refresh(); });
            const deadline = Date.now() + 5000;
            while (!release && Date.now() < deadline) await page.waitForTimeout(10);
            assert.ok(release); assert.equal(requests.length, 1); assert.equal(requests[0]['x-csrf-token'], 'synthetic-csrf');
            assert.equal(await page.locator('#refreshBtn').isDisabled(), true);
            release();
            await page.waitForFunction(() => !document.querySelector('#refreshBtn').disabled);
            assert.ok((await page.locator('#opsDashboardStatus').textContent()).includes('belum terkonfirmasi'));
            postStatus = 200;
            await Promise.all([page.waitForEvent('domcontentloaded'), page.click('#refreshBtn')]);
            assert.deepEqual(errors, []);
            console.log(`OPERATIONAL_DASHBOARD_OK mobile=${mobile} html_injection=false empty_lists_cleared=true csrf=true duplicate_refresh=false failure_recovered=true`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
