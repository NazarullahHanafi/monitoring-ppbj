const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [], requests = [];
            let release, status = 500, navigations = 0;
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => { errors.push('Native dialog'); dialog.dismiss(); });
            await page.route('https://dashboard.test/**', async route => {
                const request = route.request();
                if (request.method() === 'POST') {
                    requests.push(request.headers());
                    if (status === 500) await new Promise(resolve => { release = resolve; });
                    return route.fulfill({status, json: {message: status === 200 ? 'Refreshed' : 'Synthetic failure'}});
                }
                navigations++;
                return route.fulfill({contentType: 'text/html', body: '<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><div><button type="button" id="dashboardRefreshButton" data-url="/dashboard/refresh-cache" onclick="refreshDashboard()"><span id="refreshIcon">Refresh</span></button></div>'});
            });
            await page.goto('https://dashboard.test/dashboard');
            await page.addScriptTag({path: 'public/assets/app/dashboard-actions.js'});
            if (mobile) await page.tap('#dashboardRefreshButton'); else await page.click('#dashboardRefreshButton');
            await page.evaluate(() => { refreshDashboard(); refreshDashboard(); });
            await page.waitForFunction(() => document.querySelector('#dashboardRefreshButton').disabled);
            const deadline = Date.now() + 5000;
            while (!release && Date.now() < deadline) await page.waitForTimeout(10);
            assert.ok(release);
            assert.equal(requests.length, 1);
            assert.equal(requests[0]['x-csrf-token'], 'synthetic-csrf');
            release();
            await page.locator('[role=alert]').waitFor();
            assert.equal(await page.locator('#dashboardRefreshButton').isDisabled(), false);
            assert.equal(navigations, 1);
            status = 429;
            await page.click('#dashboardRefreshButton');
            await page.waitForFunction(() => document.querySelector('[role=alert]')?.textContent.includes('Tunggu sebentar'));
            assert.equal(await page.locator('[role=alert]').count(), 1);
            assert.equal(await page.locator('#refreshIcon').textContent(), 'Refresh');
            status = 200;
            await Promise.all([page.waitForEvent('domcontentloaded'), page.click('#dashboardRefreshButton')]);
            assert.equal(navigations, 2); assert.equal(requests.length, 3); assert.deepEqual(errors, []);
            console.log(`DASHBOARD_ACTIONS_OK mobile=${mobile} duplicate_requests=false csrf=true failure_recovery=true native_dialogs=false confirmed_reload=true`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
