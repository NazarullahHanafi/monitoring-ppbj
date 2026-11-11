const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const origin = 'https://simonpr-fixture.test';
const source = file => fs.readFileSync(`public/assets/${file}`, 'utf8');
function readFunction(script, declaration, indent) {
    const start = script.indexOf(declaration);
    assert.ok(start >= 0, declaration);
    return script.slice(start, script.indexOf(`\n${indent}}`, start) + indent.length + 2);
}

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        const errors = [];
        for (const kind of ['sp', 'spph']) for (const edit of [false, true]) for (const outcome of ['success', 'html']) {
            const page = await browser.newPage({viewport: {width: 1100, height: 850}});
            page.on('pageerror', error => errors.push(error.message));
            let release, postBody, count = 0;
            let received;
            const requestReceived = new Promise(resolve => {received = resolve;});
            await page.route('**/*', async route => {
                const request = route.request(), url = new URL(request.url());
                assert.equal(url.origin, origin);
                if (url.pathname.startsWith('/procurement-review/')) return route.fulfill({json: {title: 'Pratinjau', summary: [], prs: []}});
                if (request.method() === 'POST') {
                    count++; postBody = request.postData();
                    await new Promise(resolve => {release = resolve; received();});
                    return outcome === 'success'
                        ? route.fulfill({json: {message: 'Tersimpan', redirect: `${origin}/${kind}?done=1`}})
                        : route.fulfill({status: 200, contentType: 'text/html', body: '<h1>Login</h1>'});
                }
                return route.fulfill({contentType: 'text/html', body: `<html lang="id"><head><meta charset="utf-8"></head><body><form action="${origin}/${kind}${edit ? '/4' : ''}"><input type="date" name="${kind === 'sp' ? 'tgl_sph' : 'items[0][tgl_pemenuhan]'}" value="2025-01-12">${edit ? '<input type="hidden" name="_method" value="PUT">' : ''}<button type="submit">Simpan</button></form></body></html>`});
            });
            await page.goto(`${origin}/${kind}`);
            await page.addStyleTag({path: 'public/assets/vendor/ui/sweetalert2.min.css'});
            await page.addStyleTag({path: 'public/assets/app/procurement-review.css'});
            await page.addScriptTag({path: 'public/assets/vendor/ui/sweetalert2.all.min.js'});
            await page.addScriptTag({content: "window.SP_PAGE_CONFIG={today:'2026-11-11'};window.SPPH_PAGE_CONFIG={today:'2026-11-11'};"});
            await page.addScriptTag({path: 'public/assets/app/procurement-date-warning.js'});
            await page.addScriptTag({path: 'public/assets/app/procurement-review.js'});
            const script = source(`${kind}/${kind}.js`), suffix = kind === 'sp' ? 'Sp' : 'Spph';
            const helpers = kind === 'sp' ? script.match(/function escapedHtml\(s\) \{[^\r\n]+/)[0] : readFunction(script, 'function escapedHtml(str)', '        ');
            await page.addScriptTag({content: helpers + '\n' + readFunction(script, `function swalTheme${suffix}()`, '            ') + '\n' + readFunction(script, `function ajaxErrorMessage${suffix}(data)`, '            ') + '\n' + readFunction(script, `async function submitFormAjax${suffix}(`, '            ')});
            await page.evaluate(({suffix, edit}) => {
                window.saveDocument = () => window[`submitFormAjax${suffix}`](document.querySelector('form'), edit);
                document.querySelector('form').addEventListener('submit', event => {event.preventDefault(); window.saveDocument();});
            }, {suffix, edit});
            await page.click('button[type=submit]');
            await page.getByRole('heading', {name: /Yakin menyimpan/}).waitFor();
            await page.click('.swal2-confirm');
            await page.getByRole('heading', {name: 'Pratinjau'}).waitFor();
            await page.click('.swal2-confirm');
            await requestReceived;
            assert.equal(await page.locator('form').evaluate(form => form.inert), true);
            assert.equal(await page.locator('button[type=submit]').isDisabled(), true);
            await page.evaluate(() => window.saveDocument()); assert.equal(count, 1);
            assert.ok(postBody.includes('2025-01-12'));
            assert.equal(postBody.includes('name="_method"'), edit);
            release();
            if (outcome === 'success') {
                await page.getByRole('heading', {name: 'Berhasil disimpan'}).waitFor();
                assert.equal(await page.locator('button[type=submit]').isDisabled(), true);
                await page.evaluate(() => window.saveDocument()); assert.equal(count, 1);
                await page.waitForURL(`${origin}/${kind}?done=1`);
            } else {
                await page.getByRole('heading', {name: 'Periksa status penyimpanan'}).waitFor();
                assert.equal(await page.locator('.swal2-footer a').getAttribute('href'), `/${kind}`);
                await page.click('.swal2-confirm');
                await page.waitForFunction(() => !document.querySelector('form').inert);
                assert.equal(await page.locator('button[type=submit]').isDisabled(), false);
                assert.equal(await page.locator('input[type=date]').inputValue(), '2025-01-12');
            }
            assert.equal(count, 1);
            console.log(`BROWSER_SAVE_OK kind=${kind} edit=${edit} outcome=${outcome} writes=1 original_date=true`);
            await page.close();
        }
        assert.deepEqual(errors, []);
        console.log('BROWSER_SAVE_ERRORS=0');
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
