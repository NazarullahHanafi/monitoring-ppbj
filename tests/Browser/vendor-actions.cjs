const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const origin = 'https://vendor-actions.test';
const fixture = `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic"><input id="searchInput" value="audit"><p id="vendorActionStatus" role="status"></p><button onclick="openModal('addModal')">Tambah</button><button id="edit" onclick="openEditModal(1,'Original','','','','','','','',1)">Edit</button><form method="POST" action="/vendors/1/toggle" data-vendor-action="status"><input name="_token" type="hidden" value="synthetic"><input name="is_active" type="hidden" value="0"><button>Status</button></form><form method="POST" action="/vendors/1" data-vendor-action="delete"><input name="_token" type="hidden" value="synthetic"><input name="_method" type="hidden" value="DELETE"><button>Hapus</button></form><div id="addModal" class="hidden"><form id="addVendorForm" action="/vendors" method="POST"><input name="_token" type="hidden" value="synthetic"><input name="nama_vendor" required><input id="addIsActive" type="checkbox" name="is_active" value="1"><button>Simpan</button></form></div><div id="editModal" class="hidden"><form id="editFormVendor" action="/vendors/1" method="POST"><input type="hidden" name="_method" value="PUT"><input id="editVendorId"><input id="editNamaVendor" name="nama_vendor" value="Original" required><input id="editAlamatVendor"><input id="editTelpVendor"><input id="editFaxVendor"><input id="editEmailVendor"><input id="editNpwpVendor"><input id="editDirekturVendor"><input id="editJabatanVendor"><input type="checkbox" id="editIsActive"><button>Simpan</button></form></div>`;

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1200, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            let capture;
            const busyRecorded = new Promise(resolve => {capture = resolve;});
            await page.exposeFunction('captureBusy', capture);
            await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: fixture}));
            await page.goto(`${origin}/vendors?search=audit`);
            await page.addStyleTag({path: 'public/assets/app/form-ux.css'});
            await page.addStyleTag({content: '.hidden{display:none!important}button{min-height:36px}form{margin:12px}'});
            await page.evaluate(() => {
                window.VENDOR_PAGE_CONFIG = {indexUrl: `${location.origin}/vendors`};
                window.filterOptions = null;
                window.ProcurementFilters = {bind(options) {filterOptions = options;}, reset() {}, clear() {}};
                window.net = {pending: [], calls: []};
                window.fetch = (url, options) => {
                    net.calls.push({url, method: options.method, csrf: options.headers['X-CSRF-TOKEN'], body: [...options.body.entries()]});
                    return new Promise(resolve => net.pending.push(resolve));
                };
                window.finish = (status, payload, html = false) => net.pending.shift()({ok: status < 400, status,
                    headers: {get: () => html ? 'text/html' : 'application/json'}, json: async () => payload});
            });
            for (const file of ['app/form-ux.js', 'vendor/vendor.js']) await page.addScriptTag({path: `public/assets/${file}`});
            await page.evaluate(() => document.dispatchEvent(new Event('DOMContentLoaded')));
            await page.locator('[data-vendor-action=status] button').click();
            await page.evaluate(() => {
                document.querySelector('[data-vendor-action=status]').requestSubmit();
                openEditModal(2, 'Wrong', '', '', '', '', '', '', '', 0);
            });
            assert.equal(await page.evaluate(() => net.calls.length), 1);
            assert.equal(await page.locator('#editNamaVendor').inputValue(), 'Original');
            assert.equal(await page.evaluate(() => filterOptions.lockedSearch()), 'audit');
            const sent = await page.evaluate(() => net.calls[0]);
            assert.equal(sent.csrf, 'synthetic'); assert.equal(new Map(sent.body).get('is_active'), '0');
            await page.evaluate(() => finish(403, {message: 'Forbidden'}));
            await page.waitForFunction(() => document.querySelector('[data-vendor-action=status]').dataset.saving === 'false');
            assert.match(await page.locator('#vendorActionStatus').textContent(), /tidak diizinkan/);
            await page.locator('[data-vendor-action=status] button').click();
            await page.evaluate(() => finish(200, {success: true, is_active: true}));
            await page.waitForFunction(() => document.querySelector('[data-vendor-action=status]').dataset.saving === 'false');
            assert.match(await page.locator('#vendorActionStatus').textContent(), /belum dapat diverifikasi/);
            await page.locator('[data-vendor-action=delete] button').click();
            await page.evaluate(() => document.querySelector('[data-vendor-action=delete]').requestSubmit());
            assert.equal(await page.locator('dialog').count(), 1);
            await page.locator('dialog button').first().click();
            assert.equal(await page.evaluate(() => net.calls.length), 2);
            await page.locator('[data-vendor-action=delete] button').click(); await page.locator('dialog button').last().click();
            assert.equal(new Map(await page.evaluate(() => net.calls.at(-1).body)).get('_method'), 'DELETE');
            await page.evaluate(() => finish(422, {errors: {error: ['Vendor masih memiliki lampiran OneDrive.']}}));
            await page.waitForFunction(() => document.querySelector('[data-vendor-action=delete]').dataset.saving === 'false');
            assert.match(await page.locator('#vendorActionStatus').textContent(), /lampiran OneDrive/);
            await page.locator('[data-vendor-action=status] button').click();
            await page.evaluate(() => finish(200, null, true));
            await page.waitForFunction(() => document.querySelector('[data-vendor-action=status]').dataset.saving === 'false');
            assert.match(await page.locator('#vendorActionStatus').textContent(), /Respons belum dapat diverifikasi/);
            await page.locator('[data-vendor-action=status] button').click();
            await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted: true})));
            await page.waitForFunction(() => document.querySelector('[data-vendor-action=status]').dataset.saving === 'false');
            await page.evaluate(() => {finish(200, {success: true, is_active: false}); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted: true}));});
            assert.equal(await page.evaluate(() => net.calls.length), 5);
            await page.locator('[data-vendor-action=status] button').click();
            await page.evaluate(() => new MutationObserver(() => {
                if (document.querySelector('#vendorActionStatus').textContent === 'Perubahan tersimpan. Memuat daftar vendor...') {
                    document.querySelector('[data-vendor-action=status]').requestSubmit();
                    window.captureBusy({locked: document.querySelector('[data-vendor-action=status] button').disabled, writes: net.calls.length});
                }
            }).observe(document.querySelector('#vendorActionStatus'), {childList: true}));
            await page.evaluate(() => finish(200, {success: true, is_active: false}));
            assert.deepEqual(await busyRecorded, {locked: true, writes: 6});
            await page.waitForFunction(() => !window.net);
            assert.deepEqual(errors, []);
            console.log(`VENDOR_ACTIONS_OK mobile=${mobile} explicit_intent=true duplicate_blocked=true cancelled_delete=true protected_documents=true html_rejected=true late_result_ignored=true locked_until_navigation=true`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
