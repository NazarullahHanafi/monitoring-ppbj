const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.cwd(), origin = 'http://127.0.0.1:8787';
let rows, writes, queries, outcome, release, readOnly = false;
const id = '00000000-0000-4000-8000-000000000001';
function document(extra = {}) { return { id, type: 'nib', type_label: 'NIB', title: 'Izin <img src=x onerror=alert(1)>', document_number: '7300-ABC', expires_at: '2027-11-12', original_name: 'izin.pdf', size: 150, status: 'ready', version: 1, has_text: true, ...extra }; }
async function main() {
    const component = await fs.readFile('tmp/vendor-dialog.html', 'utf8');
    const server = http.createServer(async (req, res) => {
        try {
            const url = new URL(req.url, origin);
            if (url.pathname === '/') {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                return res.end(`<!doctype html><html lang="id"><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/vendor/documents.css"><style>body{font-family:Arial;background:#edf4f5;color:#172b3a;padding:24px}button{cursor:pointer}</style></head><body><button data-vd-open data-vendor-id="1" data-vendor-name="CV Vendor Aman">Lampiran · 1</button>${component}<script>window.VENDOR_DOCUMENTS_CONFIG={baseUrl:'${origin}/vendors',csrf:'test',readOnly:${readOnly},readerUrl:'${origin}/assets/document-reader/v1'};</script><script src="/assets/app/procurement-document-reader.js"></script><script src="/assets/vendor/documents.js"></script></body></html>`);
            }
            if (url.pathname.startsWith('/assets/')) {
                const file = path.resolve(root, 'public', url.pathname.slice(1));
                assert.ok(file.startsWith(path.join(root, 'public') + path.sep));
                const ext = path.extname(file); res.setHeader('Content-Type', ({ '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css' })[ext] || 'application/octet-stream');
                return res.end(await fs.readFile(file));
            }
            res.setHeader('Content-Type', 'application/json');
            if (req.method === 'GET') {
                if (/\/documents$/.test(url.pathname)) {
                    queries.push(url.searchParams.get('q'));
                    if (outcome === 'filter-fail') { res.statusCode = 503; return res.end(JSON.stringify({ message: 'Koneksi sementara gagal.' })); }
                    const filtered = rows.filter(doc => !url.searchParams.get('q') || doc.title.toLowerCase().includes(url.searchParams.get('q').toLowerCase()));
                    return res.end(JSON.stringify({ data: filtered, has_more: false, ready_count: rows.length }));
                }
                return res.end(JSON.stringify({ document: rows.find(doc => url.pathname.endsWith(doc.id)), search_text: 'Industri plastik' }));
            }
            const buffers = []; for await (const chunk of req) buffers.push(chunk); const bytes = Buffer.concat(buffers);
            if (req.method === 'POST') {
                const form = await new Request(origin + req.url, { method: 'POST', headers: req.headers, body: bytes }).formData();
                writes.push(Object.fromEntries(form));
                if (outcome === 'delayed') await new Promise(resolve => { release = resolve; });
                if (outcome === 'html') { res.setHeader('Content-Type', 'text/html'); return res.end('<html>Login</html>'); }
                if (outcome === 'conflict') { res.statusCode = 409; return res.end(JSON.stringify({ message: 'Lampiran berubah. Buka ulang pemeriksaan.' })); }
                if (form.get('_method') === 'PUT') {
                    const index = rows.findIndex(doc => url.pathname.endsWith(doc.id)); assert.equal(Number(form.get('version')), rows[index].version);
                    rows[index] = { ...rows[index], title: form.get('title'), version: rows[index].version + 1 };
                    return res.end(JSON.stringify({ document: rows[index] }));
                }
                if (outcome === 'reused') return res.end(JSON.stringify({ document: document({ id: form.get('upload_id') }), reused: true }));
                const doc = document({ id: form.get('upload_id'), title: form.get('title'), type: form.get('type'), type_label: 'NPWP' }); rows.push(doc);
                res.statusCode = 201; return res.end(JSON.stringify({ document: doc }));
            }
            res.statusCode = 404; res.end('{}');
        } catch (error) { console.error(error); res.statusCode = 500; res.end('{}'); }
    });
    await new Promise(resolve => server.listen(8787, '127.0.0.1', resolve));
    const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true });
    try {
        for (const mobile of [false, true]) {
            rows = [document()]; writes = []; queries = []; outcome = 'success'; readOnly = false;
            const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1100 } });
            const errors = [], external = []; page.on('pageerror', error => errors.push(error.message));
            page.on('request', req => { if (!req.url().startsWith(origin) && !req.url().startsWith('data:') && !req.url().startsWith('blob:')) external.push(req.url()); });
            page.on('dialog', dialog => dialog.accept());
            await page.goto(origin); await page.locator('[data-vd-open]').click(); await page.locator('.vd-card').waitFor();
            assert.equal(await page.locator('.vd-card img').count(), 0);
            const initial = queries.length; await page.locator('[data-vd-filter] [name=q]').fill('Izin'); await page.waitForTimeout(80); assert.equal(queries.length, initial);
            outcome = 'filter-fail'; await page.locator('[data-vd-filter] button[type=submit]').click(); await page.getByText('Koneksi sementara gagal.', { exact: false }).waitFor();
            assert.equal(await page.locator('[data-vd-list]').isVisible(), false);
            outcome = 'success'; await page.locator('[data-vd-refresh]').click(); await page.locator('.vd-card').waitFor(); assert.equal(queries.at(-1), 'Izin');
            await page.locator('[data-vd-reset]').click(); await page.waitForFunction(() => !document.querySelector('[data-vd-status]').textContent);
            await page.locator('[data-vd-new]').click();
            await page.locator('[data-vd-editor] [name=title]').fill('NPWP Perusahaan');
            await page.locator('[name=file]').setInputFiles({ name: 'npwp.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
            await page.locator('[name=search_text]').fill('Industri plastik dari scan');
            await page.locator('[data-vd-save]').click(); await page.getByText('Periksa teks lalu centang', { exact: false }).waitFor(); assert.equal(writes.length, 0);
            await page.locator('[name=text_confirmed]').check(); outcome = 'html';
            await page.locator('[data-vd-save]').click(); await page.getByText('Respons server tidak sesuai.', { exact: false }).waitFor();
            assert.equal(await page.locator('[name=search_text]').inputValue(), 'Industri plastik dari scan'); const uploadId = writes[0].upload_id;
            outcome = 'delayed'; await page.locator('[data-vd-save]').click(); await page.waitForFunction(() => document.querySelector('[data-vd-close]').disabled);
            while (!release) await page.waitForTimeout(10);
            assert.equal(await page.locator('[name=search_text]').isDisabled(), true); release(); release = null;
            await page.getByText('Lampiran tersimpan.', { exact: false }).waitFor(); assert.equal(writes[1].upload_id, uploadId); assert.equal(rows.length, 2);
            assert.equal(await page.locator('[data-vd-open]').innerText(), 'Lampiran · 2');
            outcome = 'success'; await page.locator('.vd-card').first().getByRole('button', { name: 'Periksa / ubah' }).click();
            await page.locator('[name=search_text]').fill('Koreksi belum tersimpan'); await page.locator('[name=text_confirmed]').check(); outcome = 'conflict';
            await page.locator('[data-vd-save]').click(); await page.getByText('Lampiran berubah.', { exact: false }).waitFor();
            assert.equal(await page.locator('[name=search_text]').inputValue(), 'Koreksi belum tersimpan'); assert.equal(writes.at(-1).version, '1');
            outcome = 'success'; await page.locator('[data-vd-refresh]').click(); await page.waitForFunction(() => !document.querySelector('[data-vd-status]').textContent);
            assert.equal(await page.locator('[name=search_text]').inputValue(), 'Koreksi belum tersimpan');
            await page.screenshot({ path: `tmp/vendor-documents-${mobile ? 'mobile' : 'desktop'}.png` });
            await page.evaluate(() => document.documentElement.classList.add('dark')); await page.screenshot({ path: `tmp/vendor-documents-${mobile ? 'mobile' : 'desktop'}-dark.png` });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
            assert.equal(await page.locator('.vd-dialog').evaluate(el => el.scrollWidth > el.clientWidth), false);
            await page.locator('[data-vd-cancel-editor]').click(); await page.locator('[data-vd-new]').click();
            await page.locator('[name=title]').fill('Retry kembali'); await page.locator('[name=file]').setInputFiles({ name: 'npwp.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-test') });
            outcome = 'reused'; await page.locator('[data-vd-save]').click(); await page.getByText('Berkas ini sudah tersimpan sebelumnya.', { exact: false }).waitFor();
            assert.equal(await page.locator('[data-vd-editor] [name=title]').inputValue(), 'Retry kembali');
            assert.equal(await page.locator('[data-vd-save]').innerText(), 'Simpan hasil pemeriksaan');
            assert.deepEqual(errors, []); assert.deepEqual(external, []);
            await page.locator('[data-vd-cancel-editor]').click(); await page.locator('[data-vd-close]').click();
            readOnly = true; await page.reload(); await page.locator('[data-vd-open]').click(); await page.locator('.vd-card').first().waitFor();
            assert.equal(await page.locator('.vd-card button').count(), 0); assert.equal(await page.locator('[data-vd-new]').isDisabled(), true);
            await page.close(); console.log(`VENDOR_DOCUMENTS_UI_OK mobile=${mobile} safe_text=true manual_filter=true retry_id_preserved=true drafts_preserved=true readonly=true`);
        }
        readOnly = false; rows = []; outcome = 'success';
        const page = await browser.newPage(); const external = [], errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('request', req => { if (!req.url().startsWith(origin) && !req.url().startsWith('data:') && !req.url().startsWith('blob:')) external.push(req.url()); });
        await page.goto(origin); await page.locator('[data-vd-open]').click(); await page.locator('[data-vd-new]').click();
        const generator = await browser.newPage();
        await generator.setContent('<html><body style="font:30px Arial"><h1>NIB PERUSAHAAN</h1><p>Industri plastik 73001234</p></body></html>');
        await generator.pdf({ path: 'tmp/vendor-native-fixture.pdf', format: 'A4' });
        await generator.setViewportSize({ width: 1200, height: 800 });
        await generator.screenshot({ path: 'tmp/vendor-image-fixture.png' }); await generator.close();
        for (const name of ['native-fixture.pdf', 'image-fixture.png']) {
            await page.locator('[name=file]').setInputFiles(`tmp/vendor-${name}`); await page.locator('[data-vd-read]').click();
            await page.getByText('Teks selesai dibaca.', { exact: false }).waitFor({ timeout: 120000 });
            assert.match(await page.locator('[name=search_text]').inputValue(), /plastik/i);
            assert.match(await page.locator('[name=search_text]').inputValue(), /73001234/);
            assert.equal(await page.locator('[name=text_confirmed]').isChecked(), false);
            console.log(`VENDOR_LOCAL_READER_OK file=${name} confirmed=false`);
        }
        assert.deepEqual(external, []); assert.deepEqual(errors, []);
        console.log('VENDOR_READER_NO_EXTERNAL_REQUESTS=true'); await page.close();
    } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
