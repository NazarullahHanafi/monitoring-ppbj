const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('tmp/sp-lookup-fixture.html','utf8');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.suggestions=[];window.writes=[];window.conflictType='ppbj';window.deadlines=new Map();let serial=500000;
   const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window),fetchOriginal=window.fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===20000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin),response=(data,status=200)=>Promise.resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data});
    if(url.pathname==='/sp/check-nomor')return response({status:'ok'});
    if(/^\/sp\/\d+\/items$/.test(url.pathname))return response([{nama_barang:'Barang uji',satuan:'unit',jumlah:'1',harga_satuan:'1.000.000',subtotal:'1.000.000',tgl_pemenuhan:'2025-04-01'}]);
    if(url.pathname==='/sp/suggest-nomor')return new Promise(resolve=>suggestions.push({url:url.href,options,resolve}));
    if(/^\/sp\/\d+$/.test(url.pathname)&&options.method==='POST'){writes.push({url:url.href,body:options.body});return response({message:'<img src=x onerror=bad=1> Konflik uji',conflict:true,conflict_type:conflictType,renumber_allowed:conflictType==='sp_number'},409);}
    return fetchOriginal(raw,options);
   };
   window.finishSuggestion=(i,stalled=false)=>suggestions[i].resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(()=>{}):Promise.resolve({suggestions:['020/PKU-III/SP/2025']})});
   window.openSyntheticEdit=id=>openEditModal(id,'019/PKU-III/SP/2025','2025-03-01',1000000,'',0,'Vendor uji','Pengadaan uji','Penguji Form SP','','','','','','','','','','','',[]);
   window.submitSyntheticEdit=()=>document.getElementById('editFormSp').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  });
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://sp-lookups.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({contentType:'text/javascript',body:''});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/sp'&&request.method()==='GET')return route.fulfill({contentType:'text/html',body:html});
   return route.fulfill({json:{seen:true,finished:true,left:0,users:[],rows:[],results:[],count:0}});
  });
  await page.goto('https://sp-lookups.test/sp');await page.waitForFunction(()=>typeof openEditModal==='function'&&window.jQuery?.fn.select2);
  await page.evaluate(mobile=>{if(mobile)document.documentElement.classList.add('dark');window.ProcurementDetails={reset(){},beforeSave:async()=>true};window.ProcurementReview={confirm:async()=>true};document.getElementById('tanggalSpInput').value='2026-11-18';document.getElementById('nomorSpInput').value='ADD/DRAFT';},mobile);
  await page.evaluate(()=>openSyntheticEdit(1));await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spItemsState==='ready');
  await page.evaluate(()=>submitSyntheticEdit());await page.waitForSelector('.swal2-popup');assert.equal(await page.textContent('.swal2-confirm'),'Periksa Isian');assert.equal(await page.locator('.swal2-html-container img').count(),0);await page.click('.swal2-confirm');assert.equal(await page.evaluate(()=>suggestions.length),0);await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.procurementSaving!=='true');
  await page.evaluate(()=>{conflictType='sp_number';openSyntheticEdit(2);});await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spItemsState==='ready');await page.evaluate(()=>submitSyntheticEdit());await page.waitForSelector('.swal2-popup');assert.equal(await page.textContent('.swal2-confirm'),'Ambil Nomor Terbaru');await page.click('.swal2-confirm');await page.waitForFunction(()=>suggestions.length===1);assert.equal(await page.evaluate(()=>new URL(suggestions[0].url).searchParams.get('tanggal')),'2025-03-01');await page.evaluate(()=>finishSuggestion(0));await page.waitForFunction(()=>document.querySelector('.swal2-title')?.textContent==='Nomor terbaru siap dipakai');assert.equal(await page.inputValue('#editNomorSp'),'020/PKU-III/SP/2025');assert.equal(await page.inputValue('#nomorSpInput'),'ADD/DRAFT');assert.equal(await page.evaluate(()=>writes.length),2);await page.click('.swal2-confirm');await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.procurementSaving!=='true');
  // An unresponsive suggestion body must release the save guard after its read deadline.
  await page.evaluate(()=>openSyntheticEdit(3));await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spItemsState==='ready');await page.evaluate(()=>submitSyntheticEdit());await page.waitForSelector('.swal2-popup');await page.click('.swal2-confirm');await page.waitForFunction(()=>suggestions.length===2);await page.evaluate(()=>finishSuggestion(1,true));await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForFunction(()=>document.querySelector('.swal2-title')?.textContent==='Saran nomor belum bisa dimuat');assert.equal(await page.inputValue('#editNomorSp'),'019/PKU-III/SP/2025');assert.equal(await page.evaluate(()=>writes.length),3);
  await page.locator('.swal2-popup').evaluate(async element=>Promise.all(element.getAnimations().map(animation=>animation.finished)));
  const box=await page.locator('.swal2-popup').boundingBox();assert.ok(box.y>=0&&box.y+box.height<=(mobile?844:1000));await page.screenshot({path:`tmp/sp-number-recovery-${mobile?'mobile-dark':'desktop-light'}.png`});await page.click('.swal2-confirm');await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.procurementSaving!=='true');assert.equal(await page.locator('#editFormSp button[type=submit]').isDisabled(),false);assert.deepEqual(errors,[]);
  console.log(`SP_NUMBER_RECOVERY_BROWSER_OK mobile=${mobile} real_form_handlers=true correct_edit_date=true ppbj_no_renumber=true deadline=true no_auto_resubmit=true`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
