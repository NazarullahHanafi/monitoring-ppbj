const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('tmp/spph-background-fixture.html','utf8');
const stats={stats:{'vendor audit':{name:'Vendor Audit',spph_count:4,sp_count:3,total_count:7,last_used_at:'2026-11-18',last_used_label:'18 Nov 2026',last_document:'<img src=x onerror=bad=1>',status:'cukup-sering',hint:'<script>bad=1</script>'}}};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[],writes=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.usageReads=[];window.deadlines=new Map();window.clockOffset=0;window.bad=0;let serial=600000;
   const now=Date.now.bind(Date),timeout=setTimeout.bind(window),clear=clearTimeout.bind(window),original=fetch.bind(window);Date.now=()=>now()+clockOffset;
   window.setTimeout=(fn,delay,...args)=>{if(delay===20000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin),reply=data=>Promise.resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>data});
    if(url.pathname==='/spph/vendor-usage-stats')return new Promise(resolve=>usageReads.push({options,resolve}));
    if(url.pathname==='/spph/check-nomor')return reply({status:'ok'});
    if(url.pathname==='/spph/suggest-nomor')return reply({suggestions:['901/PKU-XI/SPPH/2026'],last:null});
    return original(raw,options);
   };
   window.finishUsage=(i,data,status=200,stalled=false)=>usageReads[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(resolve=>usageReads[i].finishBody=resolve):Promise.resolve(data)});
   window.chooseVendors=()=>{const select=document.getElementById('vendorSelect');for(const name of ['Vendor Audit','Vendor Baru'])if(!Array.from(select.options).some(o=>o.value===name))select.append(new Option(name,name));$('#vendorSelect').val(['Vendor Audit','Vendor Baru']).trigger('change');};
  });
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://spph-background.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({body:'',contentType:'text/javascript'});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/spph'&&request.method()==='GET')return route.fulfill({body:html,contentType:'text/html'});
   if(request.method()!=='GET'&&/^\/spph(?:\/\d+)?$/.test(url.pathname))writes.push(request.method());
   return route.fulfill({json:{stats:{},seen:true,finished:true,rows:[],users:[],results:[]}});
  });
  await page.goto('https://spph-background.test/spph');await page.waitForFunction(()=>typeof openAddModal==='function'&&window.jQuery?.fn.select2);
  await page.evaluate(mobile=>{if(mobile)document.documentElement.classList.add('dark');openAddModal();chooseVendors();void ensureVendorUsageStats();void ensureVendorUsageStats();},mobile);
  await page.fill('#addDeskripsi','Draft jangan ditimpa statistik');assert.equal(await page.evaluate(()=>usageReads.length),1);assert.match(await page.textContent('#vendorUsagePanel'),/Memuat/);assert.doesNotMatch(await page.textContent('#vendorUsagePanel'),/0x/);assert.match(await page.textContent('#vendorSelect + .select2'),/riwayat belum tersedia/);
  await page.evaluate(()=>finishUsage(0,{stats:{bad:{status:'normal" onclick="bad=1'}}}));await page.waitForSelector('#vendorUsagePanel button');assert.match(await page.textContent('#vendorUsagePanel'),/belum dapat dipastikan/);assert.equal(await page.locator('#vendorUsagePanel [onclick]').count(),0);
  await page.locator('#vendorUsagePanel button').click();await page.waitForFunction(()=>usageReads.length===2);await page.evaluate(()=>finishUsage(1,null,200,true));await page.waitForFunction(()=>typeof usageReads[1].finishBody==='function');await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForSelector('#vendorUsagePanel button');assert.equal(await page.evaluate(()=>usageReads.length),2);assert.equal(await page.evaluate(()=>usageReads[1].options.signal.aborted),true);assert.deepEqual(await page.evaluate(()=>$('#vendorSelect').val()),['Vendor Audit','Vendor Baru']);assert.equal(await page.inputValue('#addDeskripsi'),'Draft jangan ditimpa statistik');
  await page.locator('#vendorUsagePanel').scrollIntoViewIfNeeded();await page.screenshot({path:`tmp/spph-vendor-usage-${mobile?'mobile-dark':'desktop-light'}.png`});
  await page.locator('#vendorUsagePanel button').click();await page.waitForFunction(()=>usageReads.length===3);
  await page.evaluate(()=>{closeModal('addModal');openAddModal();chooseVendors();});await page.waitForFunction(()=>usageReads.length===4);assert.equal(await page.evaluate(()=>usageReads[2].options.signal.aborted),true);await page.fill('#addDeskripsi','Draft setelah buka ulang');
  await page.evaluate(data=>{finishUsage(2,data);usageReads[1].finishBody(data);},stats);await page.evaluate(()=>new Promise(requestAnimationFrame));assert.match(await page.textContent('#vendorUsagePanel'),/Memuat/);
  await page.evaluate(data=>finishUsage(3,data),stats);await page.waitForSelector('#vendorUsagePanel .vendor-usage-count');assert.match(await page.textContent('#vendorUsagePanel'),/7x total/);assert.match(await page.textContent('#vendorUsagePanel'),/0x total/);assert.equal(await page.locator('#vendorUsagePanel img,#vendorUsagePanel script').count(),0);assert.equal(await page.evaluate(()=>bad),0);assert.equal(await page.inputValue('#addDeskripsi'),'Draft setelah buka ulang');
  await page.evaluate(()=>{closeModal('addModal');openAddModal();chooseVendors();});assert.equal(await page.evaluate(()=>usageReads.length),4);assert.match(await page.textContent('#vendorUsagePanel'),/7x total/);
  await page.evaluate(()=>{closeModal('addModal');clockOffset+=60000;openAddModal();chooseVendors();});await page.waitForFunction(()=>usageReads.length===5);assert.doesNotMatch(await page.textContent('#vendorUsagePanel'),/7x total|0x total/);await page.evaluate(()=>finishUsage(4,{message:'PRIVATE SQL'},500));await page.waitForSelector('#vendorUsagePanel button');assert.doesNotMatch(await page.textContent('#vendorUsagePanel'),/PRIVATE SQL|7x total|0x total/);
  await page.evaluate(()=>{window.preparations=0;window.ProcurementDetails.beforeSave=async()=>{preparations++;return false;};document.getElementById('addForm').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});await page.waitForFunction(()=>preparations===1&&document.getElementById('addForm').dataset.procurementSaving!=='true');assert.equal(await page.locator('#addForm button[type=submit]').isDisabled(),false);
  assert.deepEqual(writes,[]);assert.deepEqual(errors,[]);console.log(`SPPH_VENDOR_USAGE_BROWSER_OK mobile=${mobile} unknown_not_zero=true one_read=true timeout_body=true retry=true stale_ignored=true cache_ttl=true literal_markup=true draft_preserved=true save_not_blocked=true procurement_writes=0`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
