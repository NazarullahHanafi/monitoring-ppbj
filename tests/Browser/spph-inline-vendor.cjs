const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('tmp/spph-background-fixture.html','utf8').replace('name="csrf-token" content=""','name="csrf-token" content="synthetic-browser-csrf"');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.vendorWrites=[];window.spphWrites=0;window.deadlines=new Map();window.invalidEvents=0;window.bad=0;let serial=500000;
   document.addEventListener('invalid',()=>invalidEvents++,true);
   const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window),fetchOriginal=window.fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===30000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin),response=data=>Promise.resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data});
    if(url.pathname==='/spph/check-nomor')return response({status:'ok'});
    if(url.pathname==='/spph/suggest-nomor')return response({suggestions:['901/PKU-XI/SPPH/2026'],last:null});
    if(url.pathname==='/vendors'&&options.method==='POST')return new Promise(resolve=>vendorWrites.push({url:url.href,options,resolve}));
    if(url.pathname==='/spph'&&options.method==='POST')spphWrites++;
    return fetchOriginal(raw,options);
   };
   window.finishVendor=(i,data,status=201,stalled=false)=>vendorWrites[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(resolve=>vendorWrites[i].finishBody=resolve):Promise.resolve(data)});
  });
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://spph-background.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({contentType:'text/javascript',body:''});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/spph'&&request.method()==='GET')return route.fulfill({contentType:'text/html',body:html});
   return route.fulfill({json:{seen:true,finished:true,left:0,users:[],rows:[],results:[],count:0}});
  });
  await page.goto('https://spph-background.test/spph');await page.waitForFunction(()=>typeof openAddModal==='function'&&window.jQuery?.fn.select2);
  await page.evaluate(mobile=>{if(mobile)document.documentElement.classList.add('dark');openAddModal();},mobile);
  await page.fill('#addDeskripsi','Draft SPPH tetap utuh');await page.fill('#nomorSpphInput','901/PKU-XI/SPPH/2026');await page.evaluate(()=>{const s=document.getElementById('vendorSelect');for(const name of ['Vendor Lama','Vendor Kedua'])s.append(new Option(name,name,true,true));$('#vendorSelect').trigger('change');});await page.locator('#toggleNewVendorSpph').click();
  await page.locator('button[onclick="saveNewVendorSpph()"]').click();assert.match(await page.textContent('#newSpphVendorStatus'),/wajib/);assert.equal(await page.evaluate(()=>vendorWrites.length),0);
  await page.fill('#newSpphVendorNama','Vendor Aman');await page.fill('#newSpphVendorEmail','email salah');await page.locator('button[onclick="saveNewVendorSpph()"]').click();assert.match(await page.textContent('#newSpphVendorStatus'),/email lengkap/);assert.equal(await page.getAttribute('#newSpphVendorEmail','aria-invalid'),'true');assert.equal(await page.evaluate(()=>invalidEvents),0);
  await page.fill('#newSpphVendorEmail','vendor@example.test');await page.fill('#newSpphVendorNpwp','NPWP uji');await page.fill('#newSpphVendorDirektur','Direktur uji');await page.fill('#newSpphVendorJabatan','Ketua');await page.locator('button[onclick="saveNewVendorSpph()"]').click();await page.waitForFunction(()=>vendorWrites.length===1);
  assert.equal(await page.locator('#newSpphVendorNama').isDisabled(),true);assert.equal(await page.locator('#addForm button[type=submit]').isDisabled(),true);
  await page.evaluate(()=>{saveNewVendorSpph();cancelNewVendorSpph();resetNewVendorSpphForm();closeModal('addModal');openAddModal();openEditModal(77,'OTHER/SPPH','2026-11-18','PR/OTHER',[],'Other draft','Other');document.getElementById('addForm').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});
  assert.equal(await page.locator('#addModal:not(.hidden)').count(),1);assert.equal(await page.locator('#editModal:not(.hidden)').count(),0);assert.deepEqual(await page.evaluate(()=>$('#vendorSelect').val()),['Vendor Lama','Vendor Kedua']);assert.equal(await page.inputValue('#addDeskripsi'),'Draft SPPH tetap utuh');assert.equal(await page.inputValue('#newSpphVendorNama'),'Vendor Aman');assert.equal(await page.evaluate(()=>vendorWrites.length),1);assert.equal(await page.evaluate(()=>spphWrites),0);
  assert.equal(await page.evaluate(()=>vendorWrites[0].options.headers['X-CSRF-TOKEN']),await page.getAttribute('meta[name=csrf-token]','content'));assert.equal(await page.evaluate(()=>vendorWrites[0].options.body.get('npwp')),'NPWP uji');
  await page.evaluate(()=>finishVendor(0,{errors:{email:['<img src=x onerror=bad=1> Email perlu diperiksa']}},422));await page.waitForFunction(()=>document.getElementById('addForm').dataset.inlineVendorSaving!=='true');assert.equal(await page.inputValue('#newSpphVendorEmail'),'vendor@example.test');assert.equal(await page.locator('#newSpphVendorStatus img').count(),0);assert.match(await page.textContent('#newSpphVendorStatus'),/Email perlu diperiksa/);
  await page.locator('button[onclick="saveNewVendorSpph()"]').click();await page.waitForFunction(()=>vendorWrites.length===2);await page.evaluate(()=>finishVendor(1,null,201,true));await page.waitForFunction(()=>typeof vendorWrites[1].finishBody==='function');await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForFunction(()=>document.getElementById('addForm').dataset.inlineVendorSaving!=='true');assert.match(await page.textContent('#newSpphVendorStatus'),/belum dapat dipastikan/);assert.equal(await page.getAttribute('#newSpphVendorStatus a','rel'),'noopener');assert.equal(await page.getAttribute('#newSpphVendorStatus a','target'),'_blank');assert.equal(await page.inputValue('#newSpphVendorNama'),'Vendor Aman');
  await page.locator('#newSpphVendorStatus').scrollIntoViewIfNeeded();await page.screenshot({path:`tmp/spph-inline-vendor-${mobile?'mobile-dark':'desktop-light'}.png`});
  const name='<img src=x onerror=bad=1> "Vendor Baru"';await page.fill('#newSpphVendorNama',name);await page.evaluate(()=>vendorWrites[1].finishBody({id:10,nama_vendor:'Vendor Aman'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.equal(await page.inputValue('#newSpphVendorNama'),name);assert.deepEqual(await page.evaluate(()=>$('#vendorSelect').val()),['Vendor Lama','Vendor Kedua']);
  // Reuse an already loaded option instead of appending a duplicate on confirmation.
  await page.evaluate(name=>$('#vendorSelect').append(new Option(name,name,false,false)),name);await page.locator('button[onclick="saveNewVendorSpph()"]').click();await page.waitForFunction(()=>vendorWrites.length===3);await page.evaluate(name=>finishVendor(2,{id:11,nama_vendor:name}),name);await page.waitForSelector('#newVendorBoxSpph.hidden',{state:'attached'});assert.deepEqual(await page.evaluate(()=>$('#vendorSelect').val()),['Vendor Lama','Vendor Kedua',name]);assert.equal(await page.evaluate(name=>Array.from(document.getElementById('vendorSelect').options).filter(option=>option.value===name).length,name),1);assert.equal(await page.locator('.swal2-title img,.swal2-html-container img').count(),0);assert.equal(await page.evaluate(()=>bad),0);assert.equal(await page.inputValue('#addDeskripsi'),'Draft SPPH tetap utuh');assert.equal(await page.inputValue('#newSpphVendorNama'),'');assert.equal(await page.evaluate(()=>spphWrites),0);assert.equal(await page.locator('#addForm button[type=submit]').isDisabled(),false);
  assert.deepEqual(errors,[]);console.log(`SPPH_INLINE_VENDOR_BROWSER_OK mobile=${mobile} double_click=true close_guard=true inline_validation=true no_native_dialog=true timeout_body=true safe_name=true draft_preserved=true spph_writes=0`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
