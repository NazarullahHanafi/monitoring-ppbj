const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const kind of ['sp','spph'])for(const mobile of [false,true]){
  const origin=kind==='sp'?'https://sp-lookups.test':'https://spph-background.test';
  const html=fs.readFileSync(kind==='sp'?'tmp/sp-lookup-fixture.html':'tmp/spph-background-fixture.html','utf8').replace('name="csrf-token" content=""','name="csrf-token" content="synthetic-csrf"');
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.archiveWrites=[];window.reviews=[];window.deadlines=new Map();window.bad=0;let serial=900000;
   const timeout=setTimeout.bind(window),clear=clearTimeout.bind(window),original=fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===30000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(url,options={})=>options.method==='DELETE'?new Promise(resolve=>archiveWrites.push({url,options,resolve})):original(url,options);
   window.finishArchive=(i,data,status=200,bodyStalled=false)=>archiveWrites[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>bodyStalled?new Promise(resolve=>archiveWrites[i].finishBody=resolve):Promise.resolve(data)});
  });
  await page.route('**/*',route=>{const url=new URL(route.request().url());
   if(url.origin!==origin)return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({body:'',contentType:'text/javascript'});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/'+kind)return route.fulfill({body:html,contentType:'text/html'});
   return route.fulfill({json:{stats:{},seen:true,finished:true,users:[],rows:[],results:[]}});
  });
  await page.goto(origin+'/'+kind+'?archive-audit=1');await page.waitForFunction(()=>window.ProcurementArchive&&window.ProcurementReview&&typeof secureDeleteRecord==='function');
  await page.evaluate(mobile=>{if(mobile)document.documentElement.classList.add('dark');window.ProcurementReview.confirmDelete=()=>new Promise(resolve=>reviews.push(resolve));},mobile);
  await page.fill('#searchInput','filter awal');
  await page.evaluate(kind=>{void secureDeleteRecord(kind.toUpperCase(),'<img src=x onerror=bad=1>','/'+kind+'/1');void secureDeleteRecord(kind.toUpperCase(),'Other','/'+kind+'/2');},kind);assert.equal(await page.evaluate(()=>reviews.length),1);
  await page.evaluate(()=>reviews[0](true));await page.waitForSelector('#secureDeletePassword');assert.equal(await page.locator('.secure-delete-danger-title img').count(),0);
  await page.click('.swal2-confirm');assert.match(await page.textContent('.swal2-validation-message'),/Password wajib/);assert.equal(await page.evaluate(()=>archiveWrites.length),0);
  await page.fill('#secureDeletePassword','synthetic-password');await page.fill('#secureDeleteReason','Alasan uji');await page.click('.swal2-confirm');await page.waitForFunction(()=>archiveWrites.length===1);
  await page.evaluate(kind=>{Swal.clickConfirm();void secureDeleteRecord(kind.toUpperCase(),'Other','/'+kind+'/2');},kind);assert.equal(await page.evaluate(()=>archiveWrites.length),1);assert.equal(await page.evaluate(()=>reviews.length),1);assert.equal(await page.locator('#secureDeletePassword').isDisabled(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#secureDeletePassword').count(),1);
  await page.evaluate(()=>{document.getElementById('searchInput').value='password-manager-noise';document.getElementById('searchInput').dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await page.inputValue('#searchInput'),'filter awal');
  assert.equal(await page.evaluate(()=>archiveWrites[0].options.headers['X-CSRF-TOKEN']),await page.getAttribute('meta[name=csrf-token]','content'));
  await page.evaluate(()=>finishArchive(0,{message:'<img src=x onerror=bad=1> Password salah, sisa 2'},422));await page.waitForFunction(()=>!Swal.isLoading());assert.match(await page.textContent('.swal2-validation-message'),/Password salah, sisa 2/);assert.equal(await page.locator('.swal2-validation-message img').count(),0);assert.equal(await page.inputValue('#secureDeleteReason'),'Alasan uji');
  await page.click('.swal2-confirm');await page.waitForFunction(()=>archiveWrites.length===2);await page.evaluate(()=>finishArchive(1,null,200,true));await page.waitForFunction(()=>typeof archiveWrites[1].finishBody==='function');await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForFunction(()=>!Swal.isLoading());assert.match(await page.textContent('.swal2-validation-message'),/belum dapat dipastikan/);await page.waitForFunction(()=>getComputedStyle(Swal.getConfirmButton()).display==='none');assert.equal(await page.locator('.swal2-validation-message a').first().getAttribute('rel'),'noopener');
  await page.evaluate(()=>Swal.clickConfirm());assert.equal(await page.evaluate(()=>archiveWrites.length),2);assert.equal(await page.inputValue('#secureDeletePassword'),'synthetic-password');await page.screenshot({path:`tmp/procurement-archive-${kind}-${mobile?'mobile-dark':'desktop-light'}.png`});
  await page.click('.swal2-cancel');await page.waitForFunction(()=>!Swal.isVisible());assert.equal(await page.inputValue('#searchInput'),'filter awal');
  await page.evaluate(kind=>{void secureDeleteRecord(kind.toUpperCase(),'Next','/'+kind+'/3');},kind);await page.waitForFunction(()=>reviews.length===2);await page.evaluate(()=>reviews[1](true));await page.waitForSelector('#secureDeletePassword');await page.fill('#secureDeletePassword','new-synthetic-password');
  await page.evaluate(()=>archiveWrites[1].finishBody({ok:true,archived:true,message:'Late success'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.equal(await page.inputValue('#secureDeletePassword'),'new-synthetic-password');assert.equal(new URL(page.url()).search,'?archive-audit=1');
  await page.click('.swal2-confirm');await page.waitForFunction(()=>archiveWrites.length===3);await page.evaluate(()=>finishArchive(2,{locked:true,retry_after:900,locked_until:new Date(Date.now()+900000).toISOString(),message:'Lock <img src=x onerror=bad=1>'},429));await page.waitForSelector('#secureDeleteCountdown');assert.equal(await page.locator('.secure-delete-popup .swal2-html-container img').count(),0);assert.match(await page.textContent('#secureDeleteCountdown'),/00:1[45]:/);await page.click('.swal2-confirm');await page.waitForFunction(()=>!Swal.isVisible());
  await page.evaluate(kind=>{void secureDeleteRecord(kind.toUpperCase(),'Success','/'+kind+'/4');},kind);await page.waitForFunction(()=>reviews.length===3);await page.evaluate(()=>reviews[2](true));await page.waitForSelector('#secureDeletePassword');await page.fill('#secureDeletePassword','synthetic-success');await page.click('.swal2-confirm');await page.waitForFunction(()=>archiveWrites.length===4);await page.evaluate(()=>finishArchive(3,{ok:true,archived:true,message:'Success'}));await page.waitForURL(url=>url.pathname==='/'+kind&&url.search==='');
  assert.deepEqual(errors,[]);console.log(`PROCUREMENT_ARCHIVE_BROWSER_OK kind=${kind} mobile=${mobile} review_mutex=true duplicate_write_guard=true body_timeout=true explicit_verification=true literal_errors=true password_lock=true search_preserved=true late_ignored=true confirmed_navigation=true synthetic_deletes=4`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
