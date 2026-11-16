const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const appCss='/build/'+JSON.parse(fs.readFileSync('public/build/manifest.json','utf8'))['resources/css/app.css'].file;
const blade = fs.readFileSync('resources/views/owner/security.blade.php','utf8');
const forms = [...blade.matchAll(/<form method="POST"[\s\S]*?<\/form>/g)].filter(match=>match[0].includes('data-session-revoke')).map((match,index)=>match[0]
    .replace(/{{ route\([^\n]+? }}/g,`/owner/security/sessions${index?'/'+ 'a'.repeat(64):''}`)
    .replaceAll('@csrf','<input type="hidden" name="_token" value="synthetic">').replaceAll("@method('DELETE')",'<input type="hidden" name="_method" value="DELETE">'));
assert.equal(forms.length,2);
const fixture = '<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="'+appCss+'"><link rel="stylesheet" href="/assets/app/form-ux.css"><div id="ownerSecurity">'+forms.join('')+'<p data-session-status hidden role="status"></p></div><script src="/assets/app/form-ux.js"></script><script src="/assets/app/owner-security.js"></script>';
(async()=>{
    const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || (process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
    try {
        for(const mobile of [false,true]) {
            const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1280,height:900},isMobile:mobile,hasTouch:mobile});
            const errors=[], requests=[];
            page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>{errors.push('Native browser dialog');dialog.dismiss();});
            await page.route('**/*',async route=>{
                const request=route.request(),url=new URL(request.url());
                if(url.pathname.startsWith('/assets/app/')||url.pathname===appCss)return route.fulfill({path:'public'+url.pathname});
                if(request.method()==='POST') {requests.push({url:url.pathname,body:request.postData()});return route.fulfill({contentType:'text/html',body:'<p id="saved">Selesai</p>'});}
                return route.fulfill({contentType:'text/html',body:fixture});
            });
            await page.goto('https://owner-security-fixture.test/owner/security?page=2');
            await page.locator('form').first().locator('button').click();await page.locator('dialog').waitFor();
            await page.evaluate(()=>{document.querySelector('form').requestSubmit();document.querySelectorAll('form')[1].requestSubmit();});
            assert.equal(await page.locator('dialog').count(),1);assert.equal(requests.length,0);
            const bounds=await page.locator('dialog').boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=(mobile?390:1280)+1);
            await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog'));assert.equal(requests.length,0);assert.equal(await page.locator('form').first().getAttribute('aria-busy'),null);
            await page.locator('form').last().locator('button').click();await page.locator('dialog').waitFor();
            await page.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});
            assert.equal(await page.locator('dialog').count(),0);assert.equal(requests.length,0);
            await page.locator('form').last().locator('button').click();await page.locator('dialog').waitFor();
            await page.evaluate(()=>{
                let repeated=false;new MutationObserver(()=>{
                    if(!repeated&&document.querySelector('[data-session-status]').textContent.startsWith('Memproses')) {
                        repeated=true;document.querySelector('form').requestSubmit();document.querySelectorAll('form')[1].requestSubmit();
                    }
                }).observe(document.querySelector('[data-session-status]'),{childList:true});
            });
            await page.getByRole('button',{name:'Ya, akhiri sesi',exact:true}).click();await page.locator('#saved').waitFor();
            assert.equal(requests.length,1);const body=new URLSearchParams(requests[0].body);assert.equal(body.get('_token'),'synthetic');assert.equal(body.get('_method'),'DELETE');
            assert.deepEqual(errors,[]);
            console.log(`OWNER_SECURITY_BROWSER_OK mobile=${mobile} actual_blade_forms=true custom_confirmation=true cancel=true duplicate_blocked=true native_csrf_delete=true lifecycle=true`);await page.close();
        }
    } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
