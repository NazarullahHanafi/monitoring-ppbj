const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const origin = 'https://detail-guards.test';
const attachment = index => ({ id: `00000000-0000-4000-8000-00000000000${index}`, name: `Rincian ${index}.pdf`, text: `Isi ${index}`, version: 1, reviewed: false, method: 'pdf-text', download_url: `/file/${index}`, review_url: `/review/${index}`, delete_url: `/delete/${index}` });
const html = `<!doctype html><meta charset="utf-8"><form action="/sp/10"><textarea name="deskripsi_pengadaan">Terlampir</textarea><input name="detail_upload_choice"><input name="detail_attachment_token"><div data-detail-form data-kind="sp"><p data-detail-hint></p><p data-detail-form-status></p><button type="button" data-detail-form-open>Lampiran</button><button type="button" data-detail-form-later>Nanti</button></div></form><button data-detail-open data-kind="spph" data-id="20">Lampiran lain</button>`;
(async () => {
    const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true });
    let releaseForCleanup = () => {};
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1360, height: 1000 } }), errors = [];
            page.setDefaultTimeout(10000);
            page.on('pageerror', error => errors.push(error.message));
            let items = [attachment(1), attachment(2)], reads = 0, writes = 0, wrongText = true, listMode = 'valid', releaseDelete, deleteArrived;
            const deletionStarted = new Promise(resolve => { deleteArrived = resolve; });
            await page.route('**/*', async route => {
                const request = route.request(), url = new URL(request.url()); assert.equal(url.origin, origin);
                if (url.pathname.startsWith('/procurement/details/')) {
                    reads++; assert.equal(url.pathname, '/procurement/details/sp/10', 'Another document must not replace the open dialog');
                    if (listMode === 'failed') return route.fulfill({ status: 503, json: { message: 'Daftar sedang tidak tersedia.' } });
                    return route.fulfill({ json: { number: 'SP-10', can_manage: listMode === 'invalid' ? 'true' : true, attachments: items } });
                }
                if (request.method() === 'PUT') {
                    writes++; const input = request.postDataJSON(); assert.equal(input.version, items[0].version);
                    const result = { ...items[0], reviewed: true, version: items[0].version + 1, text: wrongText ? 'Teks lain yang salah' : input.text.trim() };
                    if (!wrongText) items[0] = result;
                    return route.fulfill({ json: { attachment: result } });
                }
                if (request.method() === 'DELETE') {
                    writes++; await new Promise(resolve => { releaseDelete = releaseForCleanup = resolve; deleteArrived(); }); items = items.filter(item => item.id !== attachment(1).id);
                    return route.fulfill({ json: { message: 'Lampiran dihapus.' } });
                }
                return route.fulfill({ contentType: 'text/html', body: html });
            });
            await page.goto(origin);
            await page.addStyleTag({ path: 'public/assets/app/procurement-details.css' });
            await page.addStyleTag({ path: 'public/assets/app/form-ux.css' });
            await page.evaluate(origin => { window.PROCUREMENT_DETAILS_CONFIG = { baseUrl: `${origin}/procurement/details`, csrf: 'test' }; window.AttachmentIntent = { detect: () => true }; }, origin);
            await page.addScriptTag({ path: 'public/assets/app/form-ux.js' });
            await page.addScriptTag({ path: process.env.DETAIL_SCRIPT_FILE || 'public/assets/app/procurement-details.js' });
            await page.evaluate(() => {
                window.statusMutations = 0;
                new MutationObserver(records => { window.statusMutations += records.length; }).observe(document.querySelector('[data-detail-form-status]'), { childList: true });
                for (let index = 0; index < 10; index++) document.querySelector('[name=deskripsi_pengadaan]').dispatchEvent(new Event('input', { bubbles: true }));
            });
            assert.equal(await page.evaluate(() => window.statusMutations), 0, 'Unchanged hints must not trigger repeated DOM writes');
            await page.locator('[data-detail-form-open]').click(); await page.locator('.pd-file').nth(1).waitFor();
            await page.locator('.pd-file textarea').nth(1).fill('Koreksi penting');
            await page.evaluate(() => { document.querySelector('[data-detail-open]').click(); });
            assert.equal(reads, 1); assert.equal(await page.evaluate(() => window.ProcurementDetails.beforeSave(document.querySelector('form'))), false);
            await page.evaluate(() => { document.querySelector('[data-pd-close]').onclick(); document.querySelector('[data-pd-close]').onclick(); document.querySelector('[data-pd-done]').onclick(); });
            await page.locator('dialog.ux-confirm[open]').waitFor(); assert.equal(await page.locator('dialog.ux-confirm').count(), 1);
            assert.equal(await page.locator('#pdFile').isDisabled(), true); assert.equal(await page.locator('.pd-file textarea').nth(1).isDisabled(), true);
            await page.locator('dialog.ux-confirm').getByRole('button', { name: 'Kembali', exact: true }).click();
            assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(), 'Koreksi penting'); assert.equal(await page.locator('[data-pd-done]').isDisabled(), false);
            await page.evaluate(async () => { const original = window.FormUX.confirm; window.FormUX.confirm = async () => { throw Error('Test'); }; await document.querySelector('[data-pd-close]').onclick(); window.FormUX.confirm = original; });
            await page.getByText('Konfirmasi belum dapat dibuka.', { exact: false }).waitFor(); assert.equal(await page.locator('[data-pd-close]').isDisabled(), false);
            await page.evaluate(() => { document.querySelector('[data-pd-delete]').onclick(); document.querySelector('[data-pd-delete]').onclick(); document.querySelector('[data-pd-close]').onclick(); document.querySelector('[data-detail-open]').click(); });
            await page.locator('dialog.ux-confirm[open]').waitFor(); assert.equal(await page.locator('dialog.ux-confirm').count(), 1); assert.equal(writes, 0); assert.equal(reads, 1);
            await page.locator('dialog.ux-confirm').getByRole('button', { name: 'Kembali', exact: true }).click();
            await page.evaluate(() => { window.oldDelete = document.querySelector('[data-pd-delete]').onclick; window.oldReview = document.querySelector('[data-pd-review]').onclick; });
            await page.locator('[data-pd-refresh]').click(); await page.getByText('Daftar diperbarui.', { exact: false }).waitFor();
            await page.evaluate(async () => { await window.oldDelete(); await window.oldReview(); });
            assert.equal(writes, 0); assert.equal(await page.locator('dialog.ux-confirm').count(), 0);
            await page.locator('.pd-file textarea').first().fill('  Koreksi yang benar  ');
            await page.locator('[data-pd-review]').first().click(); await page.getByText('Konfirmasi belum dapat diverifikasi.', { exact: false }).waitFor();
            assert.equal(await page.locator('.pd-file textarea').first().inputValue(), '  Koreksi yang benar  ');
            assert.match(await page.locator('.pd-file').first().innerText(), /Perubahan belum disimpan/);
            wrongText = false; await page.locator('[data-pd-review]').first().click(); await page.getByText('Isi telah dikonfirmasi.', { exact: false }).waitFor();
            assert.equal(await page.locator('.pd-file textarea').first().inputValue(), 'Koreksi yang benar'); assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(), 'Koreksi penting');
            await page.evaluate(() => { document.documentElement.classList.toggle('dark', true); });
            await page.screenshot({ path: `tmp/detail-dialog-guards-${mobile ? 'mobile' : 'desktop'}.png` });
            await page.locator('[data-pd-delete]').first().click();
            await page.locator('dialog.ux-confirm').getByRole('button', { name: 'Hapus lampiran', exact: true }).click();
            await page.waitForFunction(() => document.querySelector('.pd-dialog').getAttribute('aria-busy') === 'true');
            await page.evaluate(() => { document.querySelector('[data-pd-delete]').onclick(); document.querySelector('[data-pd-close]').onclick(); });
            await deletionStarted;
            const countBeforeRelease = writes; releaseDelete(); assert.equal(countBeforeRelease, 3); await page.getByText('Lampiran dihapus.', { exact: true }).waitFor();
            assert.equal(await page.locator('.pd-file').count(), 1); assert.equal(await page.locator('.pd-file textarea').inputValue(), 'Koreksi penting');
            await page.locator('[data-pd-done]').click(); await page.locator('dialog.ux-confirm').getByRole('button', { name: 'Tutup tanpa menyimpan', exact: true }).click();
            await page.waitForFunction(() => !document.querySelector('.pd-dialog').open);
            await page.evaluate(() => { window.guardResult = 'pending'; window.ProcurementDetails.beforeSave(document.querySelector('form')).then(result => window.guardResult = result); });
            await page.locator('.pd-dialog[open]').waitFor(); await page.locator('.pd-file').waitFor();
            assert.equal(await page.evaluate(() => window.ProcurementDetails.beforeSave(document.querySelector('form'))), false);
            await page.evaluate(() => { document.querySelector('[data-detail-open]').click(); });
            await page.locator('[data-pd-done]').click(); await page.waitForFunction(() => window.guardResult === true);
            listMode = 'failed'; await page.locator('[data-detail-form-open]').click(); await page.getByText('Daftar sedang tidak tersedia.', { exact: true }).waitFor();
            assert.match(await page.locator('.pd-empty').innerText(), /belum dapat dipastikan/); assert.equal(await page.locator('[data-pd-upload]').isVisible(), false);
            listMode = 'invalid'; await page.locator('[data-pd-refresh]').click(); await page.getByText('Daftar lampiran belum lengkap.', { exact: false }).waitFor();
            assert.equal(await page.locator('[data-pd-upload]').isVisible(), false);
            listMode = 'valid'; await page.locator('[data-pd-refresh]').click(); await page.getByText('Daftar diperbarui.', { exact: false }).waitFor();
            assert.equal(await page.locator('[data-pd-upload]').isVisible(), true); assert.deepEqual(errors, []);
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            console.log(`DETAIL_DIALOG_GUARDS_OK mobile=${mobile} single_confirm=true single_delete=true drafts_retained=true wrong_text_rejected=true parent_guard_resolved=true`);
            await page.close();
        }
    } finally { releaseForCleanup(); await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
