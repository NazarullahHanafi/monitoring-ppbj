const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('tmp/sp-lookup-fixture.html','utf8');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[],writes=[],pending=[];let ppbjMode='linked';
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.bad=0;window.mockSpChecks=[];window.deadlines=new Map();let serial=500000;
   const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window),fetchOriginal=window.fetch.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===20000){const id=++serial;deadlines.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!deadlines.delete(id))clear(id);};
   window.fetch=(raw,options={})=>{
    const url=new URL(raw,location.origin);
    if(url.pathname==='/sp/check-nomor')return new Promise(resolve=>mockSpChecks.push({url:url.href,options,resolve}));
    if(url.pathname==='/sp/suggest-nomor')return Promise.resolve({ok:true,status:200,redirected:false,headers:{get:()=> 'application/json'},json:async()=>({last:'<img src=x onerror=window.bad=1>',suggestions:['903/PKU-XI/SP/2026']})});
    return fetchOriginal(raw,options);
   };
   window.finishSpCheck=(i,data,status=200,stalled=false)=>mockSpChecks[i].resolve({ok:status<400,status,redirected:false,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(()=>{}):Promise.resolve(data)});
  });
  await page.route('**/*',async route=>{const request=route.request(),url=new URL(request.url());
   if(url.origin!=='https://sp-lookups.test')return route.fulfill({body:'',contentType:'text/css'});
   if(url.pathname==='/assets/app/app-shell.js')return route.fulfill({contentType:'text/javascript',body:''});
   if(['/assets/','/build/','/images/'].some(prefix=>url.pathname.startsWith(prefix)))return route.fulfill({path:'public'+decodeURIComponent(url.pathname)});
   if(url.pathname==='/sp'&&request.method()==='GET')return route.fulfill({contentType:'text/html',body:html});
   if(url.pathname==='/sp/check-ppbj'){
    if(ppbjMode==='timeout'){pending.push(route);return;}
    if(ppbjMode==='malformed')return route.fulfill({json:{status:'unknown'}});
    const status=ppbjMode==='cancelled'?'cancelled':'already_linked';return route.fulfill({json:{status,message:'<img src=x onerror=window.bad=2> nomor uji',linked_sp:'<svg>SP</svg>',package_items:[],spph_items:[],spph_vendors:[],warnings:[],uraian:'Uraian uji',total_sebelum_ppn:0}});
   }
   if(request.method()!=='GET'&&/^\/sp(?:\/\d+)?$/.test(url.pathname))writes.push(request.method());
   return route.fulfill({json:{seen:true,finished:true,left:0,users:[],rows:[],results:[],count:0}});
  });
  await page.goto('https://sp-lookups.test/sp');await page.waitForFunction(()=>typeof window.openAddSpCreateModal==='function'&&window.jQuery?.fn.select2);
  if(mobile)await page.evaluate(()=>document.documentElement.classList.add('dark'));
  await page.evaluate(()=>openAddSpCreateModal());await page.waitForSelector('#addModal:not(.hidden)');await page.waitForSelector('#suggBoxSp button');
  assert.equal(await page.locator('#suggBoxSp img').count(),0);assert.match(await page.textContent('#suggBoxSp'),/<img src=x/);
  await page.fill('#nomorSpInput','901/PKU-XI/SP/2026');await page.waitForFunction(()=>mockSpChecks.length===1);
  await page.fill('#nomorSpInput','902/PKU-XI/SP/2026');await page.waitForFunction(()=>mockSpChecks.length===2);
  assert.equal(await page.evaluate(()=>mockSpChecks[0].options.signal.aborted),true);
  await page.evaluate(()=>finishSpCheck(0,{status:'ok',normalized_nomor:'WRONG/OLD'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.equal(await page.inputValue('#nomorSpInput'),'902/PKU-XI/SP/2026');
  await page.evaluate(()=>finishSpCheck(1,{status:'duplicate',message:'<svg onload=window.bad=3>duplikat</svg>'}));await page.waitForFunction(()=>document.getElementById('nomorStatusSp').textContent.includes('duplikat'));
  assert.equal(await page.locator('#nomorStatusSp svg').count(),0);assert.equal(await page.evaluate(()=>bad),0);
  await page.locator('#suggBoxSp button').click();await page.waitForFunction(()=>mockSpChecks.length===3);assert.equal(await page.inputValue('#nomorSpInput'),'903/PKU-XI/SP/2026');assert.equal(writes.length,0);
  await page.evaluate(()=>finishSpCheck(2,null,200,true));await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForSelector('#nomorStatusSp button');assert.match(await page.textContent('#nomorStatusSp'),/terlalu lama/);
  await page.locator('#nomorStatusSp button').click();await page.waitForFunction(()=>mockSpChecks.length===4);await page.evaluate(()=>finishSpCheck(3,{status:'ok'}));await page.waitForFunction(()=>document.getElementById('nomorStatusSp').textContent.includes('Tersedia'));
  await page.evaluate(()=>$('#ppbjSelect').append(new Option('PR/HTML','PR/HTML',true,true)).trigger('change'));await page.waitForFunction(()=>document.getElementById('ppbjStatus').textContent.includes('nomor uji'));assert.equal(await page.locator('#ppbjStatus img').count(),0);
  ppbjMode='cancelled';await page.evaluate(()=>$('#ppbjSelect').trigger('change'));await page.waitForFunction(()=>document.getElementById('ppbjStatus').textContent.includes('nomor uji'));assert.equal(await page.locator('#ppbjStatus img').count(),0);
  ppbjMode='malformed';await page.evaluate(()=>$('#ppbjSelect').trigger('change'));await page.waitForSelector('#ppbjStatus button');assert.match(await page.textContent('#ppbjStatus'),/belum lengkap/);assert.equal(await page.locator('#ppbjInfo.hidden').count(),1);
  ppbjMode='timeout';await page.evaluate(()=>$('#ppbjSelect').trigger('change'));await page.waitForFunction(()=>deadlines.size>0);await page.evaluate(()=>[...deadlines.values()].forEach(fn=>fn()));await page.waitForSelector('#ppbjStatus button');assert.match(await page.textContent('#ppbjStatus'),/terlalu lama/);
  await page.screenshot({path:`tmp/sp-lookups-${mobile?'mobile-dark':'desktop-light'}.png`});
  ppbjMode='linked';await page.locator('#ppbjStatus button').click();await page.waitForFunction(()=>document.getElementById('ppbjStatus').textContent.includes('nomor uji'));
  await page.fill('#nomorSpInput','904/PKU-XI/SP/2026');await page.waitForFunction(()=>mockSpChecks.length===5);await page.evaluate(()=>closeModal('addModal'));
  assert.equal(await page.evaluate(()=>mockSpChecks[4].options.signal.aborted),true);await page.evaluate(()=>finishSpCheck(4,{status:'ok',normalized_nomor:'WRONG/CLOSED'}));await page.evaluate(()=>new Promise(requestAnimationFrame));assert.equal(await page.inputValue('#nomorSpInput'),'904/PKU-XI/SP/2026');assert.equal(await page.evaluate(()=>bad),0);
  for(const route of pending.splice(0))try{await route.fulfill({json:{status:'empty'}});}catch{}
  assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);console.log(`SP_LOOKUPS_BROWSER_OK mobile=${mobile} full_sp_script=true latest_number=true deadline_body=true safe_dom=true ppbj_timeout=true retries=true close_aborts=true`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
