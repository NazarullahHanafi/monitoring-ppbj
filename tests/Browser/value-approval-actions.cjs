const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/sp/value-approvals.blade.php', 'utf8');
const template = blade.slice(blade.indexOf('                    <form method="POST"'), blade.indexOf('</form>', blade.indexOf('                    <form method="POST"')) + 7);
const form = id => template.replace(/{{ route\([^\n]+? }}/g, '/sp/value-approvals/' + id + '/decision')
    .replaceAll('{{ $approval->id }}', String(id)).replace(/{{ app\([^\n]+? }}/g, 'a'.repeat(64))
    .replaceAll('@csrf', '<input type="hidden" name="_token" value="synthetic">');
const fixture = '<meta name="viewport" content="width=device-width,initial-scale=1"><div id="spValueApprovals" class="pr-review">' + form(1) + form(2) + '</div>';
(async () => {
    const browser = await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined),headless:true});
    try {
        for (const mobile of [false,true]) {
            const page = await browser.newPage({viewport:mobile ? {width:390,height:844} : {width:1280,height:900},isMobile:mobile,hasTouch:mobile});
            const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>{errors.push('Native dialog');dialog.dismiss();});
            await page.route('**/*',route=>route.fulfill({contentType:'text/html',body:fixture}));
            await page.goto('https://approval-fixture.test/sp/value-approvals?status=pending&page=2');
            for(const path of ['public/assets/app/procurement-review.css','public/assets/app/form-ux.css'])await page.addStyleTag({path});
            await page.evaluate(()=>{
                window.net={calls:[],pending:[]};window.fetch=(url,options)=>{net.calls.push({url,method:options.method,csrf:options.headers['X-CSRF-TOKEN'],body:[...options.body.entries()]});return new Promise(resolve=>net.pending.push(resolve));};
                window.finish=(index,status,payload,html=false)=>net.pending[index]({ok:status<400,status,headers:{get:()=>html?'text/html':'application/json'},json:async()=>payload});
            });
            for(const name of ['form-ux','value-approval-actions'])await page.addScriptTag({path:`public/assets/app/${name}.js`});
            await page.locator('form').first().locator('button[value=approved]').click();assert.equal(await page.evaluate(()=>net.calls.length),0);
            await page.locator('#note-1').fill('Alasan penolakan telah diperiksa.');await page.locator('form').first().locator('button[value=rejected]').click();
            await page.evaluate(()=>{document.querySelector('form').requestSubmit();document.querySelectorAll('form')[1].requestSubmit();});
            assert.equal(await page.evaluate(()=>net.calls.length),1);
            const sent=await page.evaluate(()=>net.calls[0]);assert.equal(sent.csrf,'synthetic');assert.equal(new Map(sent.body).get('decision'),'rejected');assert.equal(new Map(sent.body).get('review_token'),'a'.repeat(64));
            await page.evaluate(()=>finish(0,409,{}));await page.waitForFunction(()=>!document.querySelector('#note-1').disabled);
            assert.equal(await page.locator('#note-1').inputValue(),'Alasan penolakan telah diperiksa.');assert.equal(await page.locator('[data-approval-status] a').getAttribute('href'),'https://approval-fixture.test/sp/value-approvals?status=pending&page=2');
            await page.locator('form').first().locator('button[value=approved]').click();await page.evaluate(()=>finish(1,422,{errors:{decision_note:['Catatan <img src=x onerror=unsafe=1> perlu diperiksa.']}}));await page.waitForFunction(()=>!document.querySelector('#note-1').disabled);assert.equal(await page.locator('img').count(),0);
            await page.locator('form').first().locator('button[value=approved]').click();await page.evaluate(()=>finish(2,200,null,true));await page.waitForFunction(()=>!document.querySelector('#note-1').disabled);assert.match(await page.locator('[data-approval-status]').textContent(),/belum dapat diverifikasi/);
            await page.locator('form').first().locator('button[value=approved]').click();await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
            await page.locator('#note-1').fill('Draft setelah kembali.');await page.evaluate(()=>{finish(3,200,{success:true});window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});
            assert.equal(await page.locator('#note-1').inputValue(),'Draft setelah kembali.');assert.equal(await page.evaluate(()=>net.calls.length),4);
            let capture;const observed=new Promise(resolve=>{capture=resolve;});await page.exposeFunction('captureBusy',capture);
            await page.locator('form').first().locator('button[value=approved]').click();
            await page.evaluate(()=>new MutationObserver(()=>{if(document.querySelector('[data-approval-status]').textContent==='Saved'){document.querySelector('form').requestSubmit();window.captureBusy({calls:net.calls.length,locked:document.querySelector('#note-1').disabled});}}).observe(document.querySelector('[data-approval-status]'),{childList:true}));
            await page.evaluate(()=>finish(4,200,{success:true,message:'Saved'}));assert.deepEqual(await observed,{calls:5,locked:true});await page.waitForFunction(()=>!window.net);
            assert.deepEqual(errors,[]);console.log(`VALUE_APPROVAL_BROWSER_OK mobile=${mobile} real_form=true explicit_decision=true review_token=true duplicate_blocked=true drafts_retained=true stale_reload=true safe_errors=true late_result_ignored=true navigation_guard=true`);await page.close();
        }
        const page=await browser.newPage();await page.route('**/*',route=>route.fulfill({contentType:'text/html',body:'<meta name="csrf-token" content="synthetic"><form action="https://approval-fixture.test/sp/4"><input name="nama_vendor" value="Vendor"><input name="_method" value="PUT"></form>'}));await page.goto('https://approval-fixture.test/sp');
        for(const name of ['public/assets/vendor/ui/sweetalert2.all.min.js','public/assets/app/procurement-review.js'])await page.addScriptTag({path:name});
        await page.addStyleTag({path:'public/assets/vendor/ui/sweetalert2.min.css'});
        await page.evaluate(()=>{window.requests=[];window.pending=[];window.fetch=(url,options)=>{requests.push({url,body:[...options.body.entries()]});return new Promise(resolve=>pending.push(resolve));};window.finish=(index,payload)=>pending[index]({ok:true,headers:{get:()=> 'application/json'},json:async()=>payload});window.ProcurementReview.confirm(document.querySelector('form'),'sp',true).then(result=>window.reviewResult=result);});
        await page.evaluate(()=>finish(0,{title:'Pratinjau',summary:[],prs:[],requires_approval:true,approved:false,nilai_pr:100,nilai_sp:120,selisih:20}));
        await page.getByRole('heading',{name:'Persetujuan selisih diperlukan'}).waitFor();await page.locator('.swal2-textarea').fill('Alasan selisih sudah diperiksa.');await page.locator('.swal2-confirm').click();await page.keyboard.press('Escape');
        assert.equal(await page.getByRole('heading',{name:'Persetujuan selisih diperlukan'}).isVisible(),true);assert.equal(await page.evaluate(()=>requests.length),2);
        await page.evaluate(()=>finish(1,{success:true,id:8,message:'Pengajuan tersedia.'}));await page.getByRole('heading',{name:'Pengajuan tersedia'}).waitFor();await page.locator('.swal2-confirm').click();await page.waitForFunction(()=>window.reviewResult===false);
        assert.equal(await page.evaluate(()=>document.querySelector('form').inert),false);assert.equal(await page.evaluate(()=>requests.length),2);assert.equal(await page.evaluate(()=>new Map(requests[1].body).has('_method')),false);
        console.log('VALUE_APPROVAL_REQUEST_BROWSER_OK real_sweetalert=true escape_blocked_while_sending=true verified_acknowledgement=true no_sp_save=true');await page.close();
    } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
