const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.cwd(), port = 8786, origin = `http://127.0.0.1:${port}`;
let lastUpload;
async function main() {
    await fs.mkdir('tmp', {recursive:true});
    const component = (await fs.readFile('resources/views/components/detail-attachment-form.blade.php', 'utf8')).replaceAll('{{ $detailKind }}', 'spph');
    const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/app/procurement-details.css"><style>body{font-family:Arial;background:#f1f5f9;margin:32px;color:#1e293b}main{max-width:850px;margin:auto;background:white;padding:24px;border-radius:16px}textarea[name=deskripsi_pengadaan]{box-sizing:border-box;width:100%;padding:14px;border:1px solid #cbd5e1;border-radius:8px}h1{font-size:24px}.dark body{background:#0f172a}.dark main{background:#111827;color:#e2e8f0}</style></head><body><main><h1>Penomoran SPPH · Pemeriksaan fitur</h1><form id="addForm" action="/spph"><label>Deskripsi pengadaan<textarea name="deskripsi_pengadaan">ATK terlampir</textarea></label><div id="addRows"></div>${component}</form></main><script>window.PROCUREMENT_DETAILS_CONFIG={baseUrl:'${origin}/procurement/details',readerUrl:'${origin}/assets/document-reader/v1',csrf:'test'};</script><script src="/assets/app/attachment-intent.js"></script><script src="/assets/app/procurement-document-reader.js"></script><script src="/assets/app/procurement-details.js"></script></body></html>`;
    const server = http.createServer(async (req, res) => {
        try {
            if (req.url === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); return res.end(html); }
            if (req.url.startsWith('/assets/')) {
                const file = path.resolve(root, 'public', req.url.slice(1));
                if (!file.startsWith(path.join(root, 'public') + path.sep)) throw new Error('path');
                const ext = path.extname(file); res.setHeader('Content-Type', ({'.js':'text/javascript','.mjs':'text/javascript','.wasm':'application/wasm','.css':'text/css','.json':'application/json'})[ext] || 'application/octet-stream');
                return res.end(await fs.readFile(file));
            }
            const buffers = []; for await (const chunk of req) buffers.push(chunk); const bytes = Buffer.concat(buffers);
            res.setHeader('Content-Type','application/json');
            if (req.method === 'POST' && req.url.endsWith('/drafts')) {
                const form = await new Request(origin+req.url,{method:'POST',headers:req.headers,body:bytes}).formData();
                lastUpload = { text: form.get('extracted_text'), method: form.get('method'), name: form.get('document_file').name };
                return res.end(JSON.stringify({attachment:{id:'7ace907e-d943-4c23-bdf1-7a86a2dadc48',name:lastUpload.name,size:100,method:lastUpload.method,text:lastUpload.text,version:1,reviewed:false,download_url:'/file',review_url:'/review',delete_url:'/delete'}}));
            }
            if (req.method==='PUT') {
                const input = JSON.parse(bytes); return res.end(JSON.stringify({attachment:{id:'7ace907e-d943-4c23-bdf1-7a86a2dadc48',name:lastUpload.name,text:input.text,method:lastUpload.method,version:2,reviewed:true,review_url:'/review',delete_url:'/delete',download_url:'/file'}}));
            }
            res.statusCode=404;res.end('{}');
        } catch(error) { res.statusCode=500;res.end(String(error)); }
    });
    await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
    const browser = await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined),headless:true});
    try {
        const page = await browser.newPage({viewport:{width:1440,height:1050}}), failures=[], external=[];
        page.on('pageerror',error=>failures.push(error.message));
        page.on('request',req=>{if(!req.url().startsWith(origin)&&!req.url().startsWith('data:')&&!req.url().startsWith('blob:'))external.push(req.url());});
        await page.goto(origin); await page.waitForFunction(()=>window.ProcurementDetails);
        assert.equal(await page.locator('[data-detail-form]').getAttribute('data-needed'),'true');
        await page.click('[data-detail-form-later]');
        assert.equal(await page.locator('[name=detail_upload_choice]').inputValue(),'later');
        await page.evaluate(()=>{document.querySelector('form').reset();window.testGuard=window.ProcurementDetails.beforeSave(document.querySelector('form'));});
        await page.locator('dialog[open]').waitFor(); await page.click('[data-pd-later]');
        assert.equal(await page.evaluate(()=>window.testGuard),true);
        console.log('DEFER_AND_SAVE_GUARD_OK');
        const generator = await browser.newPage();
        await generator.setContent('<html><body style="font:24px Arial"><h1>Rincian kebutuhan ATK</h1><table><tr><td>Kertas A4 80 gram</td><td>20 Rim</td></tr><tr><td>Ballpoint biru</td><td>12 Buah</td></tr></table></body></html>');
        await generator.pdf({path:'tmp/detail-native-fixture.pdf',format:'A4'});
        const image = await generator.evaluate(()=>{const c=document.createElement('canvas');c.width=1400;c.height=1000;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='black';ctx.font='bold 50px Arial';ctx.fillText('RINCIAN KEBUTUHAN ATK',80,120);ctx.font='44px Arial';ctx.fillText('Kertas A4 80 gram',80,250);ctx.fillText('20 Rim',900,250);ctx.fillText('Ballpoint biru',80,360);ctx.fillText('12 Buah',900,360);return c.toDataURL();});
        await generator.setContent(`<html><body><img style="width:100%" src="${image}"></body></html>`);
        await generator.pdf({path:'tmp/detail-scanned-fixture.pdf',format:'A4'});await generator.close();
        for(const [fixture,method] of [['native','pdf-text'],['scanned','pdf-ocr']]) {
            await page.reload();await page.click('[data-detail-form-open]');
            await page.locator('#pdFile').setInputFiles(`tmp/detail-${fixture}-fixture.pdf`);
            await page.waitForFunction(()=>document.querySelector('[data-pd-status]').textContent.includes('Lampiran tersimpan'),{},{timeout:120000});
            assert.equal(lastUpload.method,method);
            assert.match(lastUpload.text,/Kertas\s+A4/i);
            assert.match(lastUpload.text,/20\s+Rim/i);
            await page.click('[data-pd-review]');
            await page.waitForFunction(()=>document.querySelector('[data-pd-review-state]').textContent.includes('Sudah diperiksa'));
            assert.equal(await page.locator('[name=detail_upload_choice]').inputValue(),'now');
            await page.screenshot({path:`tmp/detail-${fixture}-desktop.png`,fullPage:true});
            await page.evaluate(()=>document.documentElement.classList.add('dark'));
            await page.screenshot({path:`tmp/detail-${fixture}-dark.png`,fullPage:true});
            console.log(`PDF_${fixture.toUpperCase()}_READER_REVIEW_OK`);
        }
        await page.setViewportSize({width:390,height:844});
        await page.screenshot({path:'tmp/detail-mobile.png',fullPage:true});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        assert.deepEqual(external,[]);
        assert.deepEqual(failures,[]);
        console.log('NO_EXTERNAL_DOCUMENT_REQUESTS=true UI_ERRORS=0 MOBILE_OVERFLOW=false');
    } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
