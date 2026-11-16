const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const origin = 'https://satuan-fixture.test';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const blade = fs.readFileSync('resources/views/satuan/index.blade.php', 'utf8');
const modals = blade.slice(blade.indexOf('    {{-- MODAL TAMBAH --}}'), blade.indexOf('@endsection'))
    .replaceAll('@csrf', '<input type="hidden" name="_token" value="synthetic">')
    .replaceAll("@method('PUT')", '<input type="hidden" name="_method" value="PUT">')
    .replaceAll("{{ route('satuan.store') }}", '/satuan');
const name = 'A & "Quote"', note = 'First\nSecond <script>unsafe=1</script>';
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic"><main data-satuan-page><p id="satuanStatus" role="status"></p><button id="open" onclick="openModal('addModal')">Tambah Satuan</button><button data-satuan-edit data-url="/satuan/1" data-name="${escape(name)}" data-note="${escape(note)}">Edit</button><form data-satuan-delete action="/satuan/1" method="POST"><input type="hidden" name="_token" value="synthetic"><input type="hidden" name="_method" value="DELETE"><button type="submit">Hapus</button></form></main>${modals}`;

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push(`Native ${dialog.type()}`); dialog.dismiss();});
            let loads = 0, captureBusy;
            const busyRecorded = new Promise(resolve => {captureBusy = resolve;});
            await page.exposeFunction('captureBusy', captureBusy);
            await page.route('**/*', route => {loads++; return route.fulfill({contentType: 'text/html', body: fixture});});
            await page.goto(`${origin}/satuan`);
            await page.addStyleTag({path: 'public/assets/app/form-ux.css'});
            await page.addStyleTag({content: '.hidden{display:none!important}.flex{display:flex}#addModal,#editModal{position:fixed;inset:0;align-items:center;justify-content:center;padding:12px;background:#0005}#addModal>div.relative,#editModal>div.relative{background:white;padding:20px;max-width:340px}input,textarea{display:block;width:100%;box-sizing:border-box}button{min-height:32px}'});
            await page.evaluate(() => {
                window.net = {pending: [], calls: []};
                window.fetch = (url, options) => {
                    net.calls.push({url, method: options.method, csrf: options.headers['X-CSRF-TOKEN'], body: [...options.body.entries()]});
                    return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (status, payload, html = false) => net.pending.shift()({ok: status < 400, status, json: async () => {if (html) throw Error('HTML'); return payload;}});
            });
            for (const file of ['form-ux', 'satuan', 'satuan-page']) await page.addScriptTag({path: `public/assets/app/${file}.js`});
            await page.click('[data-satuan-edit]');
            assert.equal(await page.locator('#editNama').inputValue(), name);
            assert.equal(await page.locator('#editKet').inputValue(), note);
            assert.equal(await page.evaluate(() => window.unsafe), undefined);
            await page.locator('#editForm button[type=submit]').click();
            await page.evaluate(() => {document.querySelector('#editForm').requestSubmit(); closeModal('editModal');});
            assert.equal(await page.evaluate(() => net.calls.length), 1);
            assert.equal(await page.locator('#editModal').isVisible(), true);
            assert.equal(await page.locator('#editKet').isDisabled(), true);
            const sent = await page.evaluate(() => net.calls[0]);
            assert.equal(sent.url, `${origin}/satuan/1`); assert.equal(sent.csrf, 'synthetic');
            assert.equal(new Map(sent.body).get('_method'), 'PUT'); assert.equal(new Map(sent.body).get('keterangan'), note);
            await page.evaluate(() => finish(422, {errors: {nama_satuan: ['Nama sudah ada.']}}));
            await page.waitForFunction(() => !document.querySelector('#editNama').disabled);
            assert.equal(await page.locator('#editNama').inputValue(), name);
            assert.equal(await page.locator('#editNama').getAttribute('aria-invalid'), 'true');
            assert.match(await page.locator('#editForm [data-satuan-notice]').textContent(), /Nama sudah ada/);
            await page.locator('#editForm button[type=button]').click();
            await page.click('#open');
            await page.locator('#addForm button[type=submit]').click();
            assert.equal(await page.evaluate(() => net.calls.length), 1);
            assert.equal(await page.locator('#addForm [name=nama_satuan]').getAttribute('aria-invalid'), 'true');
            await page.locator('#addForm [name=nama_satuan]').fill('Draft Roll');
            await page.locator('#addForm [name=keterangan]').fill('0');
            await page.locator('#addForm button[type=submit]').click();
            await page.evaluate(() => finish(200, null, true));
            await page.waitForFunction(() => !document.querySelector('#addForm [name=nama_satuan]').disabled);
            assert.equal(await page.locator('#addForm [name=nama_satuan]').inputValue(), 'Draft Roll');
            assert.match(await page.locator('#addForm [data-satuan-notice]').textContent(), /Respons penyimpanan tidak valid/);
            await page.locator('#addForm button[type=button]').click();
            await page.locator('[data-satuan-delete] button').click();
            await page.evaluate(() => document.querySelector('[data-satuan-delete]').requestSubmit());
            assert.equal(await page.locator('dialog').count(), 1);
            await page.locator('dialog button').first().click();
            assert.equal(await page.evaluate(() => net.calls.length), 2);
            await page.locator('[data-satuan-delete] button').click();
            await page.locator('dialog button').last().click();
            const deletion = await page.evaluate(() => net.calls.at(-1));
            assert.equal(new Map(deletion.body).get('_method'), 'DELETE');
            await page.evaluate(() => new MutationObserver(() => {
                if (document.querySelector('#satuanStatus').textContent === 'Terhapus') {
                    document.querySelector('[data-satuan-delete]').requestSubmit();
                    window.captureBusy({locked: document.querySelector('[data-satuan-delete] button').disabled, calls: net.calls.length});
                }
            }).observe(document.querySelector('#satuanStatus'), {childList: true}));
            await page.evaluate(() => finish(200, {success: true, message: 'Terhapus'}));
            assert.deepEqual(await busyRecorded, {locked: true, calls: 3});
            await page.waitForFunction(() => !window.net);
            assert.equal(loads, 2);
            assert.deepEqual(errors, []);
            console.log(`SATUAN_BROWSER_OK mobile=${mobile} multiline_safe=true csrf=true duplicate_blocked=true drafts_preserved=true html_rejected=true cancelled_delete=true`);
            await page.close();
        }
        for (const kind of ['sp', 'spph']) {
            const page = await browser.newPage();
            const errors = []; page.on('pageerror', error => errors.push(error.message));
            await page.setContent('<meta name="csrf-token" content="synthetic"><form id="document"><select id="target" name="items[0][satuan]"><option>Unit</option><option value="__add_satuan__">Tambah</option></select><select id="legacy" name="items[1][satuan]"><option>Legacy &amp; Unit</option></select><button>Simpan dokumen</button></form>');
            await page.addStyleTag({path: 'public/assets/vendor/ui/sweetalert2.min.css'});
            await page.addScriptTag({path: 'public/assets/vendor/ui/sweetalert2.all.min.js'});
            await page.addScriptTag({path: 'public/assets/app/satuan.js'});
            const asset = fs.readFileSync(`public/assets/${kind}/${kind}.js`, 'utf8');
            const start = asset.indexOf('        function buildSatOpts(s)'), end = asset.indexOf('\n\n', asset.indexOf('        const quickAddSatuan =', start));
            assert.ok(start > 0 && end > start);
            const block = asset.slice(start, end);
            const view = fs.readFileSync(`resources/views/${kind}/index.blade.php`, 'utf8');
            assert.ok(view.indexOf("asset('assets/app/satuan.js')") < view.indexOf(`asset('assets/${kind}/${kind}.js')`));
            await page.addScriptTag({content: `const SATUANS=['Unit'],SATUAN_STORE_URL='/satuan',ADD_SATUAN_VALUE='__add_satuan__',${kind.toUpperCase()}_PAGE_CONFIG={csrfToken:'synthetic'};function escapedHtml(v){return String(v).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')};${block};document.querySelector('#target').addEventListener('change',event=>quickAddSatuan(event.target));document.querySelector('#target').dataset.previousValue='Unit';window.writes=0;window.fetch=()=>{writes++;return Promise.resolve({ok:true,json:async()=>({success:true,satuan:{id:5,nama_satuan:'Roll Canonical'}})})};window.legacyOptions=buildSatOpts('Old & Unit');`});
            await page.selectOption('#target', '__add_satuan__');
            await page.locator('.swal2-input').fill('Roll'); await page.locator('.swal2-confirm').click();
            await page.waitForFunction(() => document.querySelector('#target').value === 'Roll Canonical');
            assert.equal(await page.locator('#legacy').inputValue(), 'Legacy & Unit');
            assert.match(await page.evaluate(() => legacyOptions), /Old &amp; Unit/);
            assert.equal(await page.evaluate(() => writes), 1); assert.deepEqual(errors, []);
            console.log(`QUICK_SATUAN_BROWSER_OK kind=${kind} canonical_name=true legacy_values_preserved=true writes=1`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
