const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const origin = 'https://search-fixture.test';
const template = fs.readFileSync('resources/views/components/procurement-search.blade.php', 'utf8');
const html = template.slice(template.indexOf('<section'), template.lastIndexOf('</section>') + 10)
    .replace(/\{\{[\s\S]*?\}\}/g, '').replace(/^\s*@(if\([^\r\n]*|endif)\s*$/gm, '');

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        const errors = [];
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1360, height: 1000}});
            const requests = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.route('**/*', async route => {
                const url = new URL(route.request().url()); assert.equal(url.origin, origin);
                if (url.pathname === '/procurement/search') {
                    requests.push(url);
                    if (url.searchParams.get('totals') === 'only') return route.fulfill({json: {total: 11, totals: 'only'}});
                    assert.equal(url.searchParams.get('totals'), 'deferred');
                    const last = url.searchParams.get('page') === '2';
                    return route.fulfill({json: {total: null, page: last ? 2 : 1, last_page: null, totals: 'deferred', has_more: !last,
                        elapsed_ms: 57, query: {used: ['kursi']}, index: {}, rows: Array.from({length: last ? 1 : 10}, (_, i) => ({
                            id: (last ? 11 : i+1), number: `PKB/PR-26/CON/${last ? '0011' : String(i+1).padStart(4,'0')}`, description: 'Pengadaan kebutuhan kantor', portfolio: 'CON', links: {},
                            matches: [{kind: 'ppbj', label: 'Kebutuhan kantor', snippet: 'Kursi ergonomis', url: '/ppbj?search=kursi'}]}))}});
                }
                return route.fulfill({contentType: 'text/html; charset=utf-8', body: `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>body{margin:0;padding:12px;font-family:Arial;background:#f4f7f9;box-sizing:border-box}*{box-sizing:border-box}.dark body{background:#09131d}</style></head><body>${html}</body></html>`});
            });
            await page.goto(origin);
            await page.addStyleTag({path: 'public/assets/app/procurement-search.css'});
            await page.evaluate(({origin, mobile}) => {
                const root = document.getElementById('procurementUnifiedSearch'); root.dataset.endpoint = `${origin}/procurement/search`;
                root.dataset.canReview = root.dataset.canPrioritize = '0';
                document.querySelector('[data-pus-scope]').value = 'all';
                if (mobile) document.documentElement.classList.add('dark');
            }, {origin, mobile});
            await page.addScriptTag({path: 'public/assets/app/procurement-search.js'});
            await page.locator('[data-pus-query]').fill('kursi');
            assert.equal(requests.length, 0);
            await page.locator('[data-pus-form] button[type=submit]').click();
            await page.getByText('Menampilkan PR 1–10', {exact: true}).waitFor();
            assert.equal(requests.length, 1);
            assert.equal(await page.locator('.pus-card').count(), 10);
            await page.locator('[data-pus-query]').fill('draft belum diterapkan');
            await page.getByRole('button', {name: 'Hitung seluruh PR', exact: true}).click();
            await page.getByText('Total saat dihitung: 11 PR.', {exact: false}).waitFor();
            assert.equal(requests[1].searchParams.get('q'), 'kursi');
            assert.equal(await page.locator('.pus-card').count(), 10);
            await page.screenshot({path: `tmp/progressive-search-${mobile ? 'mobile-dark' : 'desktop-light'}.png`});
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await page.locator('[data-pus-next]').click();
            await page.getByText('Menampilkan PR 11–11', {exact: true}).waitFor();
            assert.equal(requests[2].searchParams.get('q'), 'kursi');
            assert.equal(await page.locator('[data-pus-next]').isDisabled(), true);
            assert.equal(await page.locator('[data-pus-prev]').isDisabled(), false);
            await page.locator('[data-pus-reset]').click();
            assert.equal(await page.locator('.pus-card').count(), 0);
            assert.equal(await page.locator('[data-pus-summary]').isVisible(), false);
            console.log(`BROWSER_PROGRESSIVE_OK mobile=${mobile} requests=3 manual_count=true frozen_query=true`);
            await page.close();
        }
        assert.deepEqual(errors, []); console.log('BROWSER_PROGRESSIVE_ERRORS=0');
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
