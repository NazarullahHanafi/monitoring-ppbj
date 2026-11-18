const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('tmp/sp-lookup-fixture.html','utf8');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[],writes=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.mockReads=[];window.deadlines=new Map();window.bad=0;let serial=500000;
   const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window),fetchOriginal=window.fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===20000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin);
    const response=data=>Promise.resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data});
    if(url.pathname==='/sp/check-nomor')return response({status:'ok'});
    if(url.pathname==='/sp/suggest-nomor')return response({suggestions:[],last:null});
    if(url.pathname==='/sp/check-ppbj'||/^\/sp\/\d+\/items$/.test(url.pathname))return new Promise(resolve=>mockReads.push({url:url.href,options,resolve}));
    return fetchOriginal(raw,options);
   };
   window.finishRead=(i,data,status=200,stalled=false)=>mockReads[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(()=>{}):Promise.resolve(data)});
   window.openSyntheticEdit=(id,pr='',vendor='Vendor uji')=>openEditModal(id,'901/PKU-XI/SP/2026','2026-11-18',1000000,pr,2000000,vendor,'Pengadaan uji','Penguji Form SP','','','','','','','','','','','',pr?[pr]:[]);
  });
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://sp-lookups.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({contentType:'text/javascript',body:''});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/sp'&&request.method()==='GET')return route.fulfill({contentType:'text/html',body:html});
   if(request.method()!=='GET'&&/^\/sp(?:\/\d+)?$/.test(url.pathname))writes.push(request.method());
   return route.fulfill({json:{seen:true,finished:true,left:0,users:[],rows:[],results:[],count:0}});
  });
  await page.goto('https://sp-lookups.test/sp');await page.waitForFunction(()=>typeof openEditModal==='function'&&window.jQuery?.fn.select2);
  if(mobile)await page.evaluate(()=>document.documentElement.classList.add('dark'));
  await page.evaluate(()=>openSyntheticEdit(1,'PR/A','Vendor ["quoted"]'));
  await page.waitForFunction(()=>mockReads.length===2);assert.equal(await page.inputValue('#editVendorSp'),'Vendor ["quoted"]');
  await page.evaluate(()=>document.getElementById('editFormSp').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
  await page.waitForSelector('.swal2-popup');assert.match(await page.textContent('.swal2-title'),/belum lengkap/);await page.click('.swal2-confirm');assert.equal(writes.length,0);
  await page.evaluate(()=>openSyntheticEdit(2,'PR/B'));
  await page.waitForFunction(()=>mockReads.length===4);assert.equal(await page.evaluate(()=>mockReads[0].options.signal.aborted&&mockReads[1].options.signal.aborted),true);
  await page.evaluate(()=>{finishRead(2,[{nama_barang:'Barang baru',jumlah:'2',satuan:'unit',harga_satuan:'500.000',subtotal:'1.000.000',tgl_pemenuhan:'2026-12-01'}]);finishRead(3,{status:'already_linked',spph_vendors:['Vendor uji'],package_items:[{ppbj_no:'PR/B',nilai:2000000}],spph_nomor:'SPPH/B'});});
  await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spItemsState==='ready'&&document.getElementById('editFormSp').dataset.spPpbjState==='ready');
  await page.evaluate(()=>{finishRead(0,null,500);finishRead(1,{status:'manual'});});await page.evaluate(()=>new Promise(requestAnimationFrame));assert.match(await page.textContent('#editRows'),/Barang baru/);assert.deepEqual(await page.evaluate(()=>$('#editPpbjSelect').val()),['PR/B']);assert.equal(await page.inputValue('#editNomorPrFinal'),'PR/B');
  // Opening the same record again must also invalidate the old read generation.
  await page.evaluate(()=>openSyntheticEdit(2));await page.waitForFunction(()=>mockReads.length===5);await page.evaluate(()=>openSyntheticEdit(2));await page.waitForFunction(()=>mockReads.length===6);
  await page.evaluate(()=>{finishRead(4,[{nama_barang:'Stale same record'}]);finishRead(5,null,200,true);});await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForSelector('#editRows button');assert.equal(await page.getAttribute('#editFormSp','data-sp-items-state'),'error');assert.doesNotMatch(await page.textContent('#editRows'),/Stale same record/);
  await page.evaluate(()=>document.getElementById('editFormSp').dispatchEvent(new Event('submit',{cancelable:true})));await page.waitForSelector('.swal2-popup');await page.click('.swal2-confirm');assert.equal(writes.length,0);
  await page.locator('#editRows button').click();await page.waitForFunction(()=>mockReads.length===7);await page.evaluate(()=>finishRead(6,[]));await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spItemsState==='ready');assert.equal(await page.locator('#editRows .item-row').count(),1);
  // Failed metadata must preserve the stored multi-PR selection and the PPBJ mode.
  await page.evaluate(()=>openSyntheticEdit(3,'PR/C'));await page.waitForFunction(()=>mockReads.length===9);await page.evaluate(()=>{finishRead(7,[]);finishRead(8,null,503);});await page.waitForSelector('#editPpbjStatus button');assert.deepEqual(await page.evaluate(()=>$('#editPpbjSelect').val()),['PR/C']);assert.equal(await page.locator('#editPpbjModeBox:not(.hidden)').count(),1);
  await page.locator('#editPpbjStatus button').click();await page.waitForFunction(()=>mockReads.length===10);await page.evaluate(()=>finishRead(9,{status:'available',spph_vendors:[],package_items:[{ppbj_no:'PR/C',nilai:2000000}]}));await page.waitForFunction(()=>document.getElementById('editFormSp').dataset.spPpbjState==='ready');
  // Manual PR feedback uses the same live deadline/cancellation helper and safe text rendering.
  await page.evaluate(()=>setEditPrMode('manual'));await page.fill('#editNomorPrManual','MANUAL/OLD');await page.waitForFunction(()=>mockReads.length===11);await page.fill('#editNomorPrManual','MANUAL/NEW');await page.waitForFunction(()=>mockReads.length===12);
  await page.evaluate(()=>{finishRead(10,{status:'cancelled',message:'STALE'});finishRead(11,{status:'already_linked',message:'<img src=x onerror=bad=1> sudah terhubung'});});await page.waitForFunction(()=>document.getElementById('editPpbjStatus').textContent.includes('sudah terhubung'));assert.equal(await page.locator('#editPpbjStatus img').count(),0);assert.doesNotMatch(await page.textContent('#editPpbjStatus'),/STALE/);assert.equal(await page.evaluate(()=>bad),0);
  await page.screenshot({path:`tmp/sp-edit-reads-${mobile?'mobile-dark':'desktop-light'}.png`});
  await page.fill('#editNomorPrManual','CLOSE');await page.waitForFunction(()=>mockReads.length===13);await page.evaluate(()=>closeModal('editModal'));assert.equal(await page.evaluate(()=>mockReads[12].options.signal.aborted),true);await page.evaluate(()=>finishRead(12,{status:'cancelled',message:'CLOSED'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.doesNotMatch(await page.textContent('#editPpbjStatus'),/CLOSED/);
  assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);console.log(`SP_EDIT_READS_BROWSER_OK mobile=${mobile} stale_items=true same_record=true readiness_guard=true metadata_retry=true manual_safe=true quoted_vendor=true writes=0`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
