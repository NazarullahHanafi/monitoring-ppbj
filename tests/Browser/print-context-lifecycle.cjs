const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const appCss='/build/'+JSON.parse(fs.readFileSync('public/build/manifest.json','utf8'))['resources/css/app.css'].file;
const fixture=`<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><link rel="stylesheet" href="${appCss}"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css"><link rel="stylesheet" href="/assets/spph/spph-print.css"><button id="sp" onclick="window.task=openSpPrintPreview('/sp/12/cetak-preview')">SP</button><button id="spph" onclick="window.task=openSpphPrint('/spph/12/cetak-preview?vendor=Vendor+A')">SPPH</button><script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/spph/spph-print-master.js"></script><script src="/assets/sp/sp-print.js"></script><script src="/assets/spph/spph-print.js"></script>`;
function context(module,extra={}){
 const data={number:module.toUpperCase()+'/1',amount:'1000000.00',amount_valid:true,pr_count:1,threshold:50000000,name_id:1,title_id:2,name:'Pejabat',title:'Kepala Bidang',basis:'Nilai tersimpan',rule:'Di bawah batas',rules:[],ready:true,can_manage:true,errors:[],fingerprint:'a'.repeat(64),prs:[{number:'PR/1',amount:1000000,portfolio:'LAB'}],owner_field_id:5,owner_field_name:'LAB',owner_can_learn:false,owner_diagnostics:[],portfolios:['LAB'],...extra};
 data.selection={signing_mode:'manual',signer_id:1,title_id:2,manual_reason:'Pejabat sesuai penugasan',penandatangan:data.name,jabatan:data.title,print_basis:data.fingerprint,...(module==='sp'?{field_id:5,field_reason:''}:{})};return data;
}
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true])for(const module of ['sp','spph']){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.addInitScript(()=>{
   window.net={calls:[],pending:[],timers:new Map(),serial:100000,choiceReads:0};const timeout=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window);
   window.setTimeout=(fn,delay,...args)=>{if(delay===30000){const id=++net.serial;net.timers.set(id,fn);return id;}return timeout(fn,delay,...args);};window.clearTimeout=id=>{if(!net.timers.delete(id))clear(id);};
   window.fetch=(url,options)=>{
    if(url.startsWith('/spph/print-masters?')){
     net.choiceReads++;const params=new URL(url,location.origin).searchParams,types=params.getAll('types[]');
     const row=type=>({id:type==='penandatangan_sci'?1:type==='jabatan_sci'?2:5,type,nama:type==='penandatangan_sci'?'Pejabat':type==='jabatan_sci'?'Kepala Bidang':'LAB',is_active:true,version:'a'.repeat(64)});
     return Promise.resolve({ok:true,status:200,headers:{get:()=> 'application/json'},json:async()=>types.length?{choices:Object.fromEntries(types.map(type=>[type,[row(type)]])),truncated:Object.fromEntries(types.map(type=>[type,false])),limit:50}:{options:[row(params.get('type'))],page:1,last_page:1,total:1}});
    }
    const call={url,method:options.method||'GET',csrf:options.headers['X-CSRF-TOKEN'],aborted:false};options.signal.addEventListener('abort',()=>call.aborted=true);net.calls.push(call);return new Promise(resolve=>net.pending.push(resolve));
   };
   window.finish=(i,data,status=200,stalled=false)=>net.pending[i]({ok:status<400,status,headers:{get:()=> 'application/json'},json:()=>stalled?new Promise(()=>{}):Promise.resolve(data)});
  });
  await page.route('**/*',route=>{const u=new URL(route.request().url());return u.pathname.startsWith('/assets/')||u.pathname.startsWith('/build/')?route.fulfill({path:'public'+u.pathname}):route.fulfill({contentType:'text/html',body:fixture});});
  await page.goto('https://print-context.test/');if(mobile)await page.evaluate(()=>document.documentElement.classList.add('dark'));
  await page.click('#'+module);await page.evaluate(p=>finish(0,p),context(module));await page.waitForFunction(()=>document.querySelector('.swal2-title')?.textContent.startsWith('Siapkan'));
  await page.waitForFunction(()=>!Swal.isLoading());
  await page.locator(module==='sp'?'[data-sp-print=manual]':'[data-sg-mode=manual]').click();const reason=module==='sp'?'#spPrintReason':'#sgReason';await page.fill(reason,'Pejabat sesuai penugasan');
  await page.waitForFunction(()=>net.choiceReads===1);assert.equal(await page.evaluate(()=>net.choiceReads),1,'Choices are fetched in one bounded request when needed');
  await page.locator('.swal2-confirm').click();await page.waitForFunction(()=>net.calls.length===2);await page.keyboard.press('Escape');assert.equal(await page.locator('.swal2-popup').isVisible(),true);
  if(module==='sp')assert.equal(await page.evaluate(()=>net.calls[1].csrf),'synthetic-csrf');
  await page.evaluate(()=>finish(1,{errors:{penandatangan:['<img src=x onerror=bad()> Pilihan tidak aktif']}},422));await page.waitForFunction(()=>!document.querySelector('.swal2-confirm').disabled);
  assert.equal(await page.inputValue(reason),'Pejabat sesuai penugasan');assert.equal(await page.locator('img:not(.swal2-image)').count(),0);
  await page.locator('.swal2-confirm').click();await page.evaluate(()=>finish(2,null,200,true));await page.evaluate(()=>[...net.timers.values()][0]());await page.waitForFunction(()=>!document.querySelector('.swal2-confirm').disabled);assert.match(await page.locator('.swal2-validation-message').textContent(),/koneksi lambat/);
  await page.locator('.swal2-confirm').click();await page.evaluate(p=>finish(3,p),context(module,{fingerprint:'b'.repeat(64)}));await page.waitForFunction(()=>document.querySelector('.swal2-validation-message').textContent.includes('berubah'));assert.equal(await page.inputValue(reason),'Pejabat sesuai penugasan');
  await page.screenshot({path:`tmp/print-context-${module}-${mobile?'mobile':'desktop'}.png`});const box=await page.locator('.swal2-popup').boundingBox();assert.ok(box.y>=0&&box.y+box.height<=(mobile?844:1000));
  await page.locator('.swal2-confirm').click();await page.waitForFunction(()=>net.calls.length===5);await page.evaluate(()=>Swal.close());await page.waitForSelector('.swal2-popup',{state:'hidden'});assert.equal(await page.evaluate(()=>net.calls[4].aborted),true);await page.evaluate(p=>finish(4,p),context(module));
  await page.click('#'+module);await page.waitForFunction(()=>net.calls.length===6);await page.locator('.swal2-cancel').click();await page.evaluate(()=>window.task);assert.equal(await page.evaluate(()=>net.calls[5].aborted),true);
  assert.deepEqual(errors,[]);console.log(`PRINT_CONTEXT_BROWSER_OK module=${module} mobile=${mobile} drafts=true deadline_body=true validation_escaped=true changed_basis_reconfirmed=true close_aborts=true`);await page.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
