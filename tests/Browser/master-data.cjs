const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/ppbj/index.blade.php', 'utf8');
const fixture = blade.slice(blade.indexOf('    <div id="masterModal"'), blade.indexOf('    {{-- ================= MODAL IMPORT'));

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            await page.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><button id="open" onclick="openMaster(\'buyer\')">Buyer</button><select id="buyer"><option>Buyer Original</option></select><select id="portofolio"><option>Port Original</option></select>' + fixture);
            await page.addStyleTag({path: 'public/assets/app/form-ux.css'});
            await page.addStyleTag({content: '.hidden{display:none!important}.flex{display:flex}#masterModal{position:fixed;inset:0;align-items:center;justify-content:center;background:#0005;padding:12px}#masterModal>div{background:white;max-width:600px;padding:20px}input{min-width:0}'});
            await page.evaluate(() => {
                window.PPBJ_PAGE_CONFIG = {csrfToken: 'synthetic-csrf'};
                window.backend = {buyer: [{id: 1, nama: 'Buyer Original'}], portofolio: [{id: 2, nama: 'Port Original'}], metode_pengadaan: [], penyedia_eksternal: []};
                window.net = {calls: [], pending: [], holdReads: false, changes: [], successes: []};
                window.toastOk = (...args) => net.successes.push(args);
                window.jQuery = select => ({trigger: name => net.changes.push({id: select.id, name})});
                window.fetch = (url, options) => {
                    const type = url.split('/')[2];
                    net.calls.push({url, options});
                    if (options.method || net.holdReads) return new Promise(resolve => net.pending.push({url, options, resolve}));
                    return Promise.resolve({ok: true, status: 200, json: async () => backend[type].map(item => ({...item}))});
                };
                window.finish = (status = 200, payload = null, url = null) => {
                    const index = url ? net.pending.findIndex(item => item.url === url) : 0;
                    const pending = net.pending.splice(index, 1)[0];
                    const [, , type, id] = pending.url.split('/');
                    if (!payload && status < 400) {
                        const name = pending.options.body ? JSON.parse(pending.options.body).nama : null;
                        if (pending.options.method === 'POST') {const item = {id: 3, nama: name}; backend[type].push(item); payload = {item, message: 'Berhasil ditambahkan'};}
                        else if (pending.options.method === 'PUT') {const item = {id: Number(id), nama: name}; backend[type] = backend[type].map(old => old.id === item.id ? item : old); payload = {item, message: 'Berhasil diupdate'};}
                        else if (pending.options.method === 'DELETE') {backend[type] = backend[type].filter(item => item.id !== Number(id)); payload = {message: 'Berhasil dihapus'};}
                        else payload = backend[type];
                    }
                    pending.resolve({ok: status < 400, status, json: async () => payload});
                };
            });
            await page.addScriptTag({path: 'public/assets/app/form-ux.js'});
            await page.addScriptTag({path: 'public/assets/ppbj/master-data.js'});
            if (mobile) await page.tap('#open'); else await page.click('#open');
            await page.waitForFunction(() => document.querySelector('#masterList input'));
            assert.equal(await page.locator('#masterInput').getAttribute('maxlength'), '50');
            await page.evaluate(() => {net.holdReads = true; openMaster('buyer'); openMaster('portofolio'); finish(200, backend.portofolio, '/master/portofolio');});
            await page.waitForFunction(() => document.querySelector('#masterList input')?.value === 'Port Original');
            await page.evaluate(() => {finish(200, backend.buyer, '/master/buyer'); net.holdReads = false;});
            assert.match(await page.locator('#masterTitle').textContent(), /Portofolio/);
            const literal = 'A & B "Quote"';
            await page.locator('#masterInput').fill(literal);
            const reads = await page.evaluate(() => net.calls.filter(item => !item.options.method).length);
            await page.evaluate(() => {addMaster(); addMaster(); closeMaster(); openMaster('buyer');});
            assert.equal(await page.evaluate(() => net.calls.filter(item => item.options.method === 'POST').length), 1);
            assert.match(await page.locator('#masterTitle').textContent(), /Portofolio/);
            assert.equal(await page.locator('#masterModal').isVisible(), true);
            await page.evaluate(() => finish());
            await page.waitForFunction(() => document.querySelector('#masterModal').classList.contains('hidden'));
            assert.equal(await page.locator('#portofolio').inputValue(), literal);
            assert.equal(await page.locator('#portofolio option:checked').textContent(), literal);
            assert.equal(await page.evaluate(() => net.calls.filter(item => !item.options.method).length), reads);
            assert.equal(await page.evaluate(() => net.calls.find(item => item.options.method === 'POST').options.headers['X-CSRF-TOKEN']), 'synthetic-csrf');
            await page.evaluate(() => openMaster('buyer'));
            await page.locator('#masterList input').fill('Renamed & "Buyer"');
            await page.evaluate(() => {updateMaster(1, 'Renamed & "Buyer"'); updateMaster(1, 'Wrong duplicate');});
            await page.evaluate(() => finish(422, {errors: {nama: ['Periksa nama.']}}));
            await page.waitForFunction(() => !document.querySelector('#masterList input').disabled);
            assert.equal(await page.locator('#masterList input').inputValue(), 'Renamed & "Buyer"');
            assert.match(await page.locator('#masterStatus').textContent(), /Periksa nama/);
            await page.locator('#masterList input').press('Enter');
            await page.evaluate(() => finish());
            await page.waitForFunction(() => document.querySelector('#masterModal').classList.contains('hidden'));
            assert.equal(await page.locator('#buyer').inputValue(), 'Renamed & "Buyer"');
            await page.evaluate(() => openMaster('buyer'));
            await page.evaluate(() => {deleteMaster(1); deleteMaster(1);});
            assert.equal(await page.locator('dialog').count(), 1);
            await page.locator('dialog button').first().click();
            assert.equal(await page.evaluate(() => net.calls.filter(item => item.options.method === 'DELETE').length), 0);
            await page.locator('#masterList button').last().click();
            await page.locator('dialog button').last().click();
            await page.evaluate(() => finish());
            await page.waitForFunction(() => document.querySelector('#masterModal').classList.contains('hidden'));
            assert.equal(await page.locator('#buyer').inputValue(), '');
            await page.evaluate(() => openMaster('portofolio'));
            const unsafe = '<img src=x onerror=unsafe=1>';
            await page.locator('#masterInput').fill(unsafe);
            await page.evaluate(() => {addMaster();}); await page.evaluate(() => finish());
            await page.waitForFunction(() => document.querySelector('#masterModal').classList.contains('hidden'));
            assert.equal(await page.locator('img').count(), 0); assert.equal(await page.locator('#portofolio').inputValue(), unsafe);
            assert.deepEqual(errors, []);
            console.log(`MASTER_BROWSER_OK mobile=${mobile} stale_types_ignored=true duplicate_writes=false csrf=true literal_names=true selected_rename=true no_write_refetch=true cancelled_delete=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
