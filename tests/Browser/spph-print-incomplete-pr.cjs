const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const appCss = '/build/' + JSON.parse(fs.readFileSync('public/build/manifest.json', 'utf8'))['resources/css/app.css'].file;
const fixture = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="${appCss}"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css"><link rel="stylesheet" href="/assets/spph/spph-print.css"><button id="open">Cetak SPPH</button><script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/spph/spph-print-master.js"></script><script src="/assets/spph/spph-print.js"></script><script>document.querySelector('#open').onclick=()=>openSpphPrint('/spph/12/cetak-preview?vendor=Vendor+A');</script>`;
const context = {
    number: '845/PKU-X/SPPH/2026', amount: '0', amount_valid: false, pr_count: 0, threshold: 50000000,
    ready: false, can_manage: true, errors: ['Belum ada PR/PPBJ terhubung. SPPH tetap dapat dicetak dengan penandatangan manual.'],
    fingerprint: 'a'.repeat(64), prs: [], rules: [], name: 'Harits Jansen', title: 'Kepala Bidang Dukungan Bisnis', name_id: 1, title_id: 2,
    basis: 'Total nilai PR/PPBJ sebelum PPN.', rule: 'Nilai PR/PPBJ belum lengkap; penandatangan dipilih manual.', checked_at: '26 Nov 2026',
};
const row = (id, type, nama) => ({id, type, nama, is_active: true, version: 'b'.repeat(64)});
(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const size = mobile ? {width: 390, height: 844} : {width: 1440, height: 1000};
            const page = await browser.newPage({viewport: size});
            const errors = [], requests = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native validation dialog'); dialog.dismiss();});
            await page.route('**/*', route => {
                const url = new URL(route.request().url());
                if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/build/')) return route.fulfill({path: 'public' + url.pathname});
                if (url.pathname === '/spph/12/print-context') {
                    requests.push(url);
                    const selection = url.searchParams.get('signing_mode') === 'manual'
                        ? {...Object.fromEntries(url.searchParams), penandatangan: 'Bambang Harwanta', jabatan: 'Kepala Cabang', print_basis: context.fingerprint} : null;
                    return route.fulfill({json: {...context, ...(selection ? {selection} : {})}});
                }
                if (url.pathname === '/spph/print-masters') {
                    requests.push(url);
                    return route.fulfill({json: {limit: 50, choices: {
                        penandatangan_sci: [row(1, 'penandatangan_sci', 'Harits Jansen'), row(3, 'penandatangan_sci', 'Bambang Harwanta')],
                        jabatan_sci: [row(2, 'jabatan_sci', 'Kepala Bidang Dukungan Bisnis'), row(4, 'jabatan_sci', 'Kepala Cabang')],
                    }, truncated: {penandatangan_sci: false, jabatan_sci: false}}});
                }
                if (url.pathname === '/spph/12/cetak-preview') return route.fulfill({contentType: 'text/html', body: '<h1>Preview SPPH</h1>'});
                return route.fulfill({contentType: 'text/html', body: fixture});
            });
            await page.goto('https://spph-print.test/spph');
            if (mobile) await page.evaluate(() => document.documentElement.classList.add('dark'));
            await page.click('#open');
            await page.waitForSelector('#sgSigner');
            assert.equal(await page.inputValue('#sgSigner'), '');
            assert.equal(await page.inputValue('#sgTitle'), '');
            assert.equal(await page.isDisabled('[data-sg-mode=auto]'), true);
            await page.locator('.swal2-confirm').click();
            await page.waitForSelector('.swal2-validation-message', {state: 'visible'});
            assert.equal(requests.filter(url => url.pathname.endsWith('/print-context')).length, 1);
            await page.selectOption('#sgSigner', '3'); await page.selectOption('#sgTitle', '4');
            const popup = await page.locator('.swal2-popup').boundingBox();
            const button = await page.locator('.swal2-confirm').boundingBox();
            const title = await page.locator('.swal2-title').boundingBox();
            const content = await page.locator('.swal2-html-container').boundingBox();
            assert.ok(popup.x >= 0 && popup.y >= 0 && popup.width <= size.width && popup.y + popup.height <= size.height);
            assert.ok(button.y >= 0 && button.y + button.height <= size.height, 'Preview action must stay in viewport');
            assert.ok(content.y >= title.y + title.height, 'Scrollable content must remain below the dialog title');
            await page.screenshot({path: `tmp/spph-print-incomplete-${mobile ? 'mobile-dark' : 'desktop-light'}.png`});
            await page.locator('.swal2-confirm').click();
            await page.waitForURL('**/spph/12/cetak-preview?**');
            const result = new URL(page.url());
            assert.equal(result.searchParams.get('signing_mode'), 'manual');
            assert.equal(result.searchParams.get('vendor'), 'Vendor A');
            assert.equal(result.searchParams.get('signer_id'), '3');
            assert.equal(result.searchParams.get('title_id'), '4');
            assert.equal(result.searchParams.get('print_basis'), context.fingerprint);
            assert.equal(requests.length, 3, 'One context read, one batched master read, one selection recheck');
            assert.deepEqual(errors, []);
            console.log(`SPPH_INCOMPLETE_PR_BROWSER_OK mobile=${mobile} explicit_manual=true preview_visible=true bounded_reads=3`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
