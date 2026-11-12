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
                if (url.pathname.endsWith('/evidence')) {
                    requests.push(url);
                    const last = url.searchParams.get('after') === '20';
                    return route.fulfill({json: {source: 55, query: url.searchParams.get('q'), mode: url.searchParams.get('mode'), version: 'a'.repeat(64),
                        scanned: last ? 5 : 20, after: last ? 25 : 20, has_more: !last, stored: 25, pages: 30, unit: 'Halaman', index_complete: false,
                        rows: [{page: last ? 25 : 8, snippet: 'Kursi plastik ergonomis untuk ruang rapat <img src=x onerror=alert(1)>', url: `/procurement/search/files/55#page=${last ? 25 : 8}`}],
                        issues: last ? [{page: 24, reason: 'Bacaan kurang jelas; periksa sumber asli.'}] : []}});
                }
                if (url.pathname === '/procurement/search') {
                    requests.push(url);
                    return route.fulfill({json: {total: 1, page: 1, last_page: 1, query: {used: ['kursi', 'plastik']}, index: {},
                        rows: [{id: 10, number: 'PKB/PR-26/CON/0454', description: 'Pengadaan kebutuhan kantor', portfolio: 'CON', links: {},
                            matches: [{id: 55, kind: 'archive_attachment', label: 'Scan penawaran.pdf', state: 'partial', page: 25, pages: 30, snippet: 'Kursi plastik sesuai lampiran', url: '/procurement/search/files/55'}]}]}});
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
            await page.locator('[data-pus-query]').fill('kursi plastik');
            assert.equal(requests.length, 0);
            await page.locator('[data-pus-form] button[type=submit]').click();
            const panel = page.locator('.pus-page-evidence');
            await panel.locator('summary').click();
            assert.equal(requests.length, 1);
            await panel.locator('select').selectOption('phrase');
            await panel.getByRole('button', {name: 'Telusuri', exact: true}).click();
            await panel.getByText('Halaman 8', {exact: true}).waitFor();
            assert.equal(requests[1].searchParams.get('mode'), 'phrase');
            await panel.locator('input').fill('draft belum diterapkan');
            await panel.getByRole('button', {name: 'Lanjutkan penelusuran'}).click();
            await panel.getByText('Halaman 25', {exact: true}).waitFor();
            assert.equal(requests[2].searchParams.get('q'), 'kursi plastik');
            assert.equal(requests[2].searchParams.get('after'), '20');
            assert.equal(await panel.locator('img').count(), 0);
            assert.equal(await panel.locator('.pus-page-result').count(), 2);
            assert.ok((await panel.innerText()).includes('Indeks belum lengkap'));
            assert.equal(await page.locator('[data-pus-query]').inputValue(), 'kursi plastik');
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await panel.screenshot({path: `tmp/page-evidence-${mobile ? 'mobile-dark' : 'desktop-light'}.png`});
            await page.locator('[data-pus-reset]').click();
            assert.equal(await page.locator('.pus-page-evidence').count(), 0);
            console.log(`BROWSER_PAGE_EVIDENCE_OK mobile=${mobile} requests=3 original_query=true safe_html=true`);
            await page.close();
        }
        assert.deepEqual(errors, []); console.log('BROWSER_PAGE_EVIDENCE_ERRORS=0');
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
