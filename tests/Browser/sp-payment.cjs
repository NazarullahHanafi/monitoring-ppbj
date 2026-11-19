const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const appCss='/build/'+JSON.parse(fs.readFileSync('public/build/manifest.json','utf8'))['resources/css/app.css'].file;
const fixture=`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><link rel="stylesheet" href="${appCss}"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css"><link rel="stylesheet" href="/assets/spph/spph-print.css"><button id="print" onclick="openSpPrintPreview('/sp/12/cetak-preview')">Cetak SP</button><script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/spph/spph-print-master.js"></script><script src="/assets/sp/sp-print.js"></script>`;
const context={number:'999/PKU-XI/SP/2026',amount:'1000000.00',amount_valid:true,pr_count:1,threshold:50000000,name_id:1,title_id:2,name:'Pejabat Pengujian',title:'Kepala Bidang',basis:'Nilai SP tersimpan',rule:'Di bawah batas',rules:[],ready:true,can_manage:true,errors:[],fingerprint:'a'.repeat(64),prs:[{number:'PR/TEST',amount:1000000,portfolio:'LAB'}],owner_field_id:5,owner_field_name:'LAB',owner_can_learn:false,owner_diagnostics:[],portfolios:['LAB'],checked_at:'17 Nov 2026'};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true])for(const mode of ['full','realization']){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}}),errors=[],posts=[],reads=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push('Native dialog');d.dismiss();});
  await page.route('**/*',route=>{const request=route.request(),url=new URL(request.url());
   if(url.pathname==='/assets/spph/spph-print-master.js'&&process.env.PRINT_MASTER_SCRIPT_FILE)return route.fulfill({path:process.env.PRINT_MASTER_SCRIPT_FILE});
   if(url.pathname.startsWith('/assets/')||url.pathname.startsWith('/build/'))return route.fulfill({path:'public'+url.pathname});
   if(url.pathname==='/sp/12/print-context'){reads.push(url.pathname);return route.fulfill({json:context});}
   if(url.pathname==='/spph/print-masters'){
    reads.push(url.pathname);const requested=url.searchParams.getAll('types[]');
    const row=type=>({id:type==='penandatangan_sci'?1:type==='jabatan_sci'?2:5,type,nama:type==='bidang_pr'?'LAB':type==='jabatan_sci'?'Kepala Bidang':'Pejabat Pengujian',is_active:true,version:'b'.repeat(64)});
    return route.fulfill({json:requested.length?{choices:Object.fromEntries(requested.map(type=>[type,[row(type)]])),truncated:Object.fromEntries(requested.map(type=>[type,false])),limit:50}:{options:[row(url.searchParams.get('type'))],page:1,last_page:1,total:1}});
   }
   if(url.pathname==='/sp/12/print-selection'){assert.equal(request.headers()['x-csrf-token'],'synthetic-csrf');const input=request.postDataJSON();posts.push(input);return route.fulfill({json:{...context,selection:{signing_mode:'auto',field_id:5,field_reason:'',penandatangan:context.name,jabatan:context.title,print_basis:context.fingerprint,payment_mode:input.payment_mode}}});}
   return route.fulfill({contentType:'text/html',body:url.pathname==='/sp/12/cetak-preview'?'<p id="prepared">Preview dokumen uji</p>':fixture});
  });
  await page.goto('https://sp-payment.test/');if(mobile)await page.evaluate(()=>document.documentElement.classList.add('dark'));
  await page.click('#print');await page.waitForSelector('[data-sp-payment=full]');await page.waitForFunction(()=>!Swal.isLoading());
  const initialReads=reads.length;assert.equal(initialReads,2,'One context read plus one batched choice read');await page.locator('[data-sp-payment=realization]').click();
  await page.locator('[data-sp-print=manual]').click();await page.fill('#spPrintReason','Alasan penugasan tetap tersimpan');
  await page.locator('[data-sp-payment=full]').click();assert.equal(await page.inputValue('#spPrintReason'),'Alasan penugasan tetap tersimpan');
  await page.locator('[data-sp-print=auto]').click();await page.locator(`[data-sp-payment=${mode}]`).click();
  assert.equal(reads.length,initialReads);assert.equal(await page.getAttribute(`[data-sp-payment=${mode}]`,'aria-pressed'),'true');
  assert.match(await page.locator('[aria-live=polite]').textContent(),mode==='realization'?/Secara bertahap sesuai dengan realisasi pekerjaan/:/Secara sekaligus 100%/);
  const box=await page.locator('.swal2-popup').boundingBox();assert.ok(box.y>=0&&box.y+box.height<=(mobile?844:1000));
  await page.screenshot({path:`tmp/sp-payment-${mode}-${mobile?'mobile-dark':'desktop-light'}.png`});
  await page.locator('.swal2-cancel').click();assert.equal(posts.length,0);
  await page.click('#print');await page.waitForSelector('[data-sp-payment=full]');await page.waitForFunction(()=>!Swal.isLoading());
  await page.locator(`[data-sp-payment=${mode}]`).click();await page.locator('.swal2-confirm').click();
  await page.waitForURL(url=>url.pathname==='/sp/12/cetak-preview'&&url.searchParams.get('payment_mode')===mode);
  assert.equal(posts.length,1);assert.equal(posts[0].payment_mode,mode);assert.deepEqual(errors,[]);
  console.log(`SP_PAYMENT_BROWSER_OK mobile=${mobile} mode=${mode} no_extra_reads=true drafts=true cancel_no_post=true same_tab_confirmed=true viewport=true`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
