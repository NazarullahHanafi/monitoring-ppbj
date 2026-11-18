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
   window.vendorWrites=[];window.spWrites=0;window.deadlines=new Map();window.invalidEvents=0;window.bad=0;let serial=500000;
   document.addEventListener('invalid',()=>invalidEvents++,true);
   const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window),fetchOriginal=window.fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===30000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin),response=data=>Promise.resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data});
    if(url.pathname==='/sp/check-nomor')return response({status:'ok'});
    if(url.pathname==='/sp/suggest-nomor')return response({suggestions:['901/PKU-XI/SP/2026'],last:null});
    if(url.pathname==='/vendors'&&options.method==='POST')return new Promise(resolve=>vendorWrites.push({url:url.href,options,resolve}));
    if(url.pathname==='/sp'&&options.method==='POST')spWrites++;
    return fetchOriginal(raw,options);
   };
   window.finishVendor=(i,data,status=201,stalled=false)=>vendorWrites[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(resolve=>vendorWrites[i].finishBody=resolve):Promise.resolve(data)});
  });
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://sp-lookups.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({contentType:'text/javascript',body:''});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/sp'&&request.method()==='GET')return route.fulfill({contentType:'text/html',body:html});
   return route.fulfill({json:{seen:true,finished:true,left:0,users:[],rows:[],results:[],count:0}});
  });
  await page.goto('https://sp-lookups.test/sp');await page.waitForFunction(()=>typeof openAddSpCreateModal==='function'&&window.jQuery?.fn.select2);
  await page.evaluate(mobile=>{if(mobile)document.documentElement.classList.add('dark');openAddSpCreateModal();},mobile);
  await page.fill('#addDeskripsi','Draft SP tetap utuh');await page.fill('#nomorSpInput','901/PKU-XI/SP/2026');await page.locator('#toggleNewVendorSp').click();
  await page.locator('button[onclick="saveNewVendor()"]').click();assert.match(await page.textContent('#newVendorStatus'),/wajib/);assert.equal(await page.evaluate(()=>vendorWrites.length),0);
  await page.fill('#newVendorNama','Vendor Aman');await page.fill('#newVendorEmail','email salah');await page.locator('button[onclick="saveNewVendor()"]').click();assert.match(await page.textContent('#newVendorStatus'),/email lengkap/);assert.equal(await page.getAttribute('#newVendorEmail','aria-invalid'),'true');assert.equal(await page.evaluate(()=>invalidEvents),0);
  await page.fill('#newVendorEmail','vendor@example.test');await page.fill('#newVendorNpwp','NPWP uji');await page.fill('#newVendorDirektur','Direktur uji');await page.fill('#newVendorJabatan','Ketua');await page.locator('button[onclick="saveNewVendor()"]').click();await page.waitForFunction(()=>vendorWrites.length===1);
  assert.equal(await page.locator('#newVendorNama').isDisabled(),true);assert.equal(await page.locator('#addFormSp button[type=submit]').isDisabled(),true);
  await page.evaluate(()=>{saveNewVendor();cancelNewVendor();resetNewVendorForm();closeModal('addModal');openAddSpCreateModal();document.getElementById('addFormSp').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});
  assert.equal(await page.locator('#addModal:not(.hidden)').count(),1);assert.equal(await page.inputValue('#addDeskripsi'),'Draft SP tetap utuh');assert.equal(await page.inputValue('#newVendorNama'),'Vendor Aman');assert.equal(await page.evaluate(()=>vendorWrites.length),1);assert.equal(await page.evaluate(()=>spWrites),0);
  assert.equal(await page.evaluate(()=>vendorWrites[0].options.headers['X-CSRF-TOKEN']),await page.getAttribute('meta[name=csrf-token]','content'));assert.equal(await page.evaluate(()=>vendorWrites[0].options.body.get('npwp')),'NPWP uji');
  await page.evaluate(()=>finishVendor(0,{errors:{email:['<img src=x onerror=bad=1> Email perlu diperiksa']}},422));await page.waitForFunction(()=>document.getElementById('addFormSp').dataset.inlineVendorSaving!=='true');assert.equal(await page.inputValue('#newVendorEmail'),'vendor@example.test');assert.equal(await page.locator('#newVendorStatus img').count(),0);assert.match(await page.textContent('#newVendorStatus'),/Email perlu diperiksa/);
  await page.locator('button[onclick="saveNewVendor()"]').click();await page.waitForFunction(()=>vendorWrites.length===2);await page.evaluate(()=>finishVendor(1,null,201,true));await page.waitForFunction(()=>typeof vendorWrites[1].finishBody==='function');await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForFunction(()=>document.getElementById('addFormSp').dataset.inlineVendorSaving!=='true');assert.match(await page.textContent('#newVendorStatus'),/belum dapat dipastikan/);assert.equal(await page.getAttribute('#newVendorStatus a','rel'),'noopener');assert.equal(await page.getAttribute('#newVendorStatus a','target'),'_blank');assert.equal(await page.inputValue('#newVendorNama'),'Vendor Aman');
  await page.locator('#newVendorStatus').scrollIntoViewIfNeeded();await page.screenshot({path:`tmp/sp-inline-vendor-${mobile?'mobile-dark':'desktop-light'}.png`});
  const name='<img src=x onerror=bad=1> "Vendor Baru"';await page.fill('#newVendorNama',name);await page.evaluate(()=>vendorWrites[1].finishBody({id:10,nama_vendor:'Vendor Aman'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.equal(await page.inputValue('#newVendorNama'),name);assert.equal(await page.inputValue('#vendorSelectSp'),'');
  // Reuse an already loaded option instead of appending a duplicate on confirmation.
  await page.evaluate(name=>$('#vendorSelectSp').append(new Option(name,name,false,false)),name);await page.locator('button[onclick="saveNewVendor()"]').click();await page.waitForFunction(()=>vendorWrites.length===3);await page.evaluate(name=>finishVendor(2,{id:11,nama_vendor:name}),name);await page.waitForSelector('#newVendorBoxSp.hidden',{state:'attached'});assert.equal(await page.inputValue('#vendorSelectSp'),name);assert.equal(await page.evaluate(name=>Array.from(document.getElementById('vendorSelectSp').options).filter(option=>option.value===name).length,name),1);assert.equal(await page.locator('.swal2-title img,.swal2-html-container img').count(),0);assert.equal(await page.evaluate(()=>bad),0);assert.equal(await page.inputValue('#addDeskripsi'),'Draft SP tetap utuh');assert.equal(await page.inputValue('#newVendorNama'),'');assert.equal(await page.evaluate(()=>spWrites),0);assert.equal(await page.locator('#addFormSp button[type=submit]').isDisabled(),false);
  assert.deepEqual(errors,[]);console.log(`SP_INLINE_VENDOR_BROWSER_OK mobile=${mobile} double_click=true close_guard=true inline_validation=true no_native_dialog=true timeout_body=true safe_name=true draft_preserved=true sp_writes=0`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
