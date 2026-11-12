const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const origin='https://attachment-fixture.test';
function attachment(index){const id=`00000000-0000-4000-8000-00000000000${index}`;return {id,name:`rincian-${index}.pdf`,text:`Teks asli ${index}`,version:1,reviewed:false,method:'pdf-text',download_url:`${origin}/file/${id}`,review_url:`${origin}/review/${id}`,delete_url:`${origin}/delete/${id}`};}

(async()=>{
    const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
    try {
        for(const mobile of [false,true]){
            const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1360,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
            let items=[attachment(1),attachment(2)],writes=0,release,received;let outcome='delayed';
            const arrived=()=>new Promise(resolve=>{received=resolve;});let waiting=arrived();
            await page.route('**/*',async route=>{
                const req=route.request(),url=new URL(req.url());assert.equal(url.origin,origin);
                if(req.method()==='PUT'){
                    writes++;const body=req.postDataJSON();assert.equal(body.version,items[0].version);received();
                    if(outcome==='delayed')await new Promise(resolve=>{release=resolve;});
                    if(outcome==='conflict')return route.fulfill({status:409,json:{message:'Isi lampiran sudah berubah. Muat ulang sebelum memeriksa kembali.'}});
                    items[0]={...items[0],text:body.text,reviewed:true,version:items[0].version+1};return route.fulfill({json:{attachment:items[0]}});
                }
                if(req.method()==='POST'){
                    writes++;
                    if(outcome==='html')return route.fulfill({contentType:'text/html',body:'<html>Login</html>'});
                    if(outcome==='malformed')return route.fulfill({json:{attachment:null}});
                    items.push(attachment(3));return route.fulfill({status:201,json:{attachment:items[2]}});
                }
                if(url.pathname==='/procurement/details/sp/10')return route.fulfill({json:{number:'SP-10',can_manage:true,attachments:items}});
                return route.fulfill({contentType:'text/html',body:'<!doctype html><html><body><button data-detail-open data-kind="sp" data-id="10">Lampiran</button></body></html>'});
            });
            await page.goto(origin);await page.addStyleTag({path:'public/assets/app/procurement-details.css'});
            await page.evaluate(origin=>{window.PROCUREMENT_DETAILS_CONFIG={baseUrl:`${origin}/procurement/details`,csrf:'test'};},origin);
            await page.addScriptTag({path:process.env.DETAIL_SCRIPT_FILE||'public/assets/app/procurement-details.js'});
            await page.getByRole('button',{name:'Lampiran',exact:true}).click();await page.locator('.pd-file').nth(1).waitFor();
            const second=page.locator('.pd-file textarea').nth(1);await second.fill('Koreksi penting belum disimpan');
            await page.locator('[data-pd-review]').first().click();await waiting;
            assert.equal(await second.isDisabled(),true);assert.equal(await page.locator('[data-pd-cancel]').isVisible(),false);
            release();await page.getByText('Isi telah dikonfirmasi.',{exact:false}).waitFor();
            assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(),'Koreksi penting belum disimpan');
            assert.equal(writes,1);assert.match(await page.locator('.pd-file').nth(1).innerText(),/Perubahan belum disimpan/);
            await page.locator('.pd-file textarea').first().fill('Koreksi sebelum konflik');outcome='conflict';waiting=arrived();
            await page.locator('[data-pd-review]').first().click();await waiting;await page.getByText('Isi lampiran sudah berubah.',{exact:false}).waitFor();
            assert.equal(writes,2);assert.equal(await page.locator('.pd-file textarea').first().inputValue(),'Koreksi sebelum konflik');
            await page.getByRole('button',{name:'Muat ulang daftar lampiran',exact:true}).click();await page.getByText('Daftar diperbarui.',{exact:false}).waitFor();
            assert.equal(await page.locator('.pd-file textarea').first().inputValue(),'Koreksi sebelum konflik');assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(),'Koreksi penting belum disimpan');
            for(const failure of ['html','malformed']){
                outcome=failure;await page.locator('#pdFile').setInputFiles({name:'rincian.docx',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',buffer:Buffer.from('fixture')});
                await page.waitForFunction(()=>document.querySelector('[data-pd-status]').dataset.error==='true'&&!document.querySelector('#pdFile').disabled);
                assert.equal(await page.locator('.pd-file').count(),2);assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(),'Koreksi penting belum disimpan');
                await page.locator('#pdFile').setInputFiles([]);
            }
            outcome='success';await page.locator('#pdFile').setInputFiles({name:'rincian.docx',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',buffer:Buffer.from('fixture')});
            await page.getByText('Lampiran tersimpan.',{exact:false}).waitFor();assert.equal(await page.locator('.pd-file').count(),3);
            assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(),'Koreksi penting belum disimpan');assert.equal(writes,5);
            await page.clock.install();
            await page.evaluate(()=>{const original=window.fetch;window.fetch=(url,options)=>options?.method==='PUT'?Promise.resolve({ok:true,redirected:false,headers:new Headers({'content-type':'application/json'}),json:()=>new Promise(()=>{})}):original(url,options);});
            await page.locator('[data-pd-review]').first().click();await page.clock.fastForward(30001);
            await page.getByText('Respons server terlalu lama.',{exact:false}).waitFor();
            assert.equal(await page.locator('[data-pd-done]').isDisabled(),false);assert.equal(await page.locator('.pd-file textarea').nth(1).inputValue(),'Koreksi penting belum disimpan');
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
            await page.screenshot({path:`tmp/attachment-recovery-${mobile?'mobile':'desktop'}.png`});assert.deepEqual(errors,[]);
            console.log(`ATTACHMENT_RECOVERY_OK mobile=${mobile} drafts_retained=true malformed_responses_safe=true writes=5`);await page.close();
        }
    }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
