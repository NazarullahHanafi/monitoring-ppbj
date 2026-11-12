const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const origin='http://localhost:8799',id='00000000-0000-4000-8000-000000000001',bundle='00000000-0000-4000-8000-000000000002';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of[false,true]){
  let ready=false,uploaded=false,bundleReady=false,uploads=0,prepares=0,polls=0;const errors=[];
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push(d.type());d.dismiss();});
  // Keep real application timers, except polling intervals shortened for this fixture.
  await page.addInitScript(()=>{crypto.randomUUID=()=> '00000000-0000-4000-8000-000000000001';const timer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,[5000,7000].includes(ms)?50:ms,...args);});
  await page.route('**/*',async route=>{const url=new URL(route.request().url());
   if(url.pathname==='/'){const component=await fs.readFile('tmp/vendor-dialog.html','utf8');return route.fulfill({contentType:'text/html',body:`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/assets/vendor/documents.css"><button data-vd-open data-vendor-id="1" data-vendor-name="Vendor uji">Lampiran</button>${component}<script>window.VENDOR_DOCUMENTS_CONFIG={baseUrl:'/vendors',csrf:'test'};</script><script src="/assets/app/form-ux.js"></script><script src="/assets/vendor/documents.js"></script>`});}
   if(url.pathname.startsWith('/assets/'))return route.fulfill({contentType:url.pathname.endsWith('.js')?'text/javascript':'text/css',body:await fs.readFile('public'+url.pathname)});
   const document={id,type:'nib',type_label:'NIB',title:'Izin usaha',original_name:'izin.pdf',size:40,version:1,status:ready?'ready':'queued'};
   let data;
   if(url.pathname.endsWith('/bundle')&&route.request().method()==='POST'){prepares++;data={id:bundle,status:'queued',completed:0,total:1};}
   else if(url.pathname.endsWith('/bundle/'+bundle)){bundleReady=true;data={id:bundle,status:'ready',completed:1,total:1};}
   else if(url.pathname.endsWith('/transfers')){polls++;ready=true;data={ready_count:1,active_count:0};}
   else if(route.request().method()==='POST'){uploads++;uploaded=true;assert.match(route.request().postData(),/name="background"\r\n\r\n1/);data={document,queued:true};}
   else data={data:uploaded?[document]:[],has_more:false,ready_count:ready?1:0,active_count:uploaded&&!ready?1:0};
   await route.fulfill({status:route.request().method()==='POST'?202:200,contentType:'application/json',body:JSON.stringify(data)});
  });
  await page.goto(origin);await page.locator('[data-vd-open]').click();await page.locator('[data-vd-new]').click();
  await page.locator('[name=title]').fill('Izin usaha');await page.locator('[name=file]').setInputFiles({name:'izin.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\nSynthetic\n%%EOF')});
  await page.locator('[data-vd-save]').click();await page.locator('[data-vd-editor][hidden]').waitFor({state:'attached'});
  await page.locator('a', {hasText:'Unduh cepat'}).waitFor();assert.equal(uploads,1);assert.ok(polls>=1);assert.equal(await page.locator('[data-vd-save]').isEnabled(),true);
  assert.match(await page.locator('a',{hasText:'Unduh cepat'}).getAttribute('href'),/direct=1/);
  await page.locator('[data-vd-bundle]').click();await page.locator('[data-vd-bundle-link]:not([hidden])').waitFor();
  assert.ok(bundleReady);assert.equal(prepares,1);assert.match(await page.locator('[data-vd-bundle-link]').getAttribute('href'),new RegExp(bundle+'/download$'));
  await page.screenshot({path:`tmp/vendor-transfers-${mobile?'mobile':'desktop'}.png`});
  await page.locator('[data-vd-close]').click();const before=polls;await page.waitForTimeout(120);assert.equal(polls,before);assert.deepEqual(errors,[]);
  console.log(`VENDOR_TRANSFERS_UI_OK mobile=${mobile} async_upload=true status_refresh=true zip=true close_stops_polling=true`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
