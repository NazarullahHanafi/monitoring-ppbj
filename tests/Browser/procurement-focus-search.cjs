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
                    if (url.searchParams.get('totals') === 'only') return route.fulfill({json: {total: 1, totals: 'only'}});
                    const focused = url.searchParams.get('pr_id') === '11';
                    return route.fulfill({json: {total: null, page: 1, last_page: null, totals: 'deferred', has_more: false,
                        elapsed_ms: 28, query: {used: [url.searchParams.get('q')]}, index: {}, rows: (focused ? [11] : [11,12]).map(id => ({
                            id, number: `PKB/PR-26/CON/00${id}`, description: 'Pengadaan kebutuhan kantor', portfolio: 'CON', links: {},
                            matches: [{kind: 'ppbj', label: 'Kebutuhan kantor', snippet: 'Kursi plastik ergonomis', url: '/ppbj?search=kursi'}]}))}});
                }
                return route.fulfill({contentType: 'text/html; charset=utf-8', body: `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>body{margin:0;padding:12px;font-family:Arial;background:#f4f7f9;box-sizing:border-box}*{box-sizing:border-box}.dark body{background:#09131d}</style></head><body>${html}</body></html>`});
            });
            await page.goto(origin); await page.addStyleTag({path: 'public/assets/app/procurement-search.css'});
            await page.evaluate(({origin, mobile}) => {
                const root=document.getElementById('procurementUnifiedSearch');root.dataset.endpoint=`${origin}/procurement/search`;root.dataset.canReview=root.dataset.canPrioritize='0';
                document.querySelector('[data-pus-scope]').value='all'; if(mobile)document.documentElement.classList.add('dark');
            }, {origin, mobile});
            await page.addScriptTag({path:'public/assets/app/procurement-search.js'});
            await page.locator('[data-pus-query]').fill('kursi');assert.equal(requests.length,0);
            await page.locator('[data-pus-form] button[type=submit]').click();
            await page.getByRole('button',{name:'Fokus PR ini',exact:true}).first().click();
            await page.waitForFunction(()=>document.querySelectorAll('.pus-card').length===1);
            assert.equal(requests[1].searchParams.get('pr_id'),'11');assert.equal(await page.locator('[data-pus-focus]').isVisible(),true);
            assert.equal(await page.locator('[data-pus-query]').inputValue(),'kursi');
            await page.locator('[data-pus-query]').fill('plastik');await page.getByRole('button',{name:'Cari di PR ini',exact:true}).click();
            await page.getByText('Hasil cocok untuk “plastik”.',{exact:false}).waitFor();
            assert.equal(requests[2].searchParams.get('pr_id'),'11');assert.equal(requests[2].searchParams.get('q'),'plastik');
            await page.getByRole('button',{name:'Hitung hasil PR ini',exact:true}).click();await page.getByText('Total saat dihitung: 1 PR.',{exact:false}).waitFor();
            assert.equal(requests[3].searchParams.get('pr_id'),'11');
            await page.locator('[data-pus-focus]').scrollIntoViewIfNeeded();await page.screenshot({path:`tmp/focus-search-${mobile?'mobile-dark':'desktop-light'}.png`});
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
            await page.getByRole('button',{name:'Keluar fokus',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('.pus-card').length===2);
            assert.equal(requests[4].searchParams.has('pr_id'),false);assert.equal(await page.locator('[data-pus-focus]').isVisible(),false);
            await page.locator('[data-pus-reset]').click();assert.equal(await page.locator('.pus-card').count(),0);
            console.log(`BROWSER_FOCUS_OK mobile=${mobile} requests=5 scoped_query=true scoped_count=true`);await page.close();
        }
        assert.deepEqual(errors,[]);console.log('BROWSER_FOCUS_ERRORS=0');
    } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
