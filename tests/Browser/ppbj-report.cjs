const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const blade=fs.readFileSync('resources/views/ppbj/report.blade.php','utf8');
const appCss='/build/'+JSON.parse(fs.readFileSync('public/build/manifest.json','utf8'))['resources/css/app.css'].file;
let content=blade.slice(blade.indexOf("@section('content')")+"@section('content')".length,blade.indexOf('@endsection'));
content=content.replace(/{{ route\('([^']+)'\) }}/g,(_,name)=>({'ppbj.report':'/ppbj/report','ppbj.report.data':'/ppbj/report/data','ppbj.report.export':'/ppbj/report/export'}[name]))
    .replace(/{{ config\('app.timezone'\) }}/g,'Asia/Jakarta').replace(/{{ date\('Y-m'\) }}/g,'2026-11')
    .replace(/@foreach \(\(\$portofolios[\s\S]*?@endforeach/g,'<option value="CON">CON</option><option value="0">0</option>')
    .replace(/@foreach \(\(\$vendors[\s\S]*?@endforeach/g,'<option value="PT Audit, Indonesia">PT Audit, Indonesia</option><option value="0">0</option>');
const fixture='<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="'+appCss+'"><link rel="stylesheet" href="/assets/app/form-ux.css">'+content+blade.match(/<style>[\s\S]*?<\/style>/)[0]+'<script src="/assets/app/form-ux.js"></script><script src="/assets/app/ppbj-report.js"></script>';
function payload(total=51,page=1,per_page=50) {
    const length=Math.min(per_page,Math.max(0,total-(page-1)*per_page));
    return {data:Array.from({length},(_,i)=>({ppbj_no:'PR/'+((page-1)*per_page+i+1),created_at:'2026-11-16 10:00:00',uraian:'<img src=x onerror=unsafe=1>',portofolio:'CON',buyer:'Buyer',penyedia_eksternal:'PT Audit, Indonesia',status_sla:'WARNING',progres:25,total_sebelum_ppn:1000,nilai_sp_spk:500,nilai_bpg:200})),
        stats:{total,on_track:0,warning:total,overdue:0,cancelled:0,total_portofolio:1,total_vendor:1,total_value:total*1000,total_sp_value:total*500,total_bpg_value:total*200,avg_progress:25},
        pagination:{page,per_page,total,last_page:Math.max(1,Math.ceil(total/per_page)),from:length?(page-1)*per_page+1:null,to:length?(page-1)*per_page+length:null},breakdown:{portofolio:[{label:'<img src=x onerror=unsafe=1>',total,total_value:1000,total_sp_value:500}],vendor:[]}};
}
(async()=>{
    const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
    try {
        for(const mobile of [false,true]) {
            const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile});
            const errors=[],downloads=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>{errors.push('Native browser dialog');dialog.dismiss();});
            await page.addInitScript(()=>{
                window.net={calls:[],pending:[],timers:new Map(),serial:100000};
                const originalTimeout=window.setTimeout.bind(window),originalClear=window.clearTimeout.bind(window);
                window.setTimeout=(fn,delay,...args)=>{if(delay===20000){const id=++net.serial;net.timers.set(id,fn);return id;}return originalTimeout(fn,delay,...args);};
                window.clearTimeout=id=>{if(!net.timers.delete(id))originalClear(id);};
                window.fetch=(url,options)=>{const call={url,credentials:options.credentials,cache:options.cache,aborted:false};net.calls.push(call);options.signal.addEventListener('abort',()=>call.aborted=true);return new Promise(resolve=>net.pending.push(resolve));};
                window.finish=(index,status,payload,stallBody=false)=>net.pending[index]({ok:status<400,status,headers:{get:()=> 'application/json'},json:()=>stallBody?new Promise(()=>{}):Promise.resolve(payload)});
            });
            await page.route('**/*',route=>{const url=new URL(route.request().url());if(url.pathname===appCss||url.pathname.startsWith('/assets/app/'))return route.fulfill({path:'public'+url.pathname});
                if(url.pathname==='/ppbj/report/export'){downloads.push(url);return route.fulfill({contentType:'text/csv',headers:{'Content-Disposition':'attachment; filename="synthetic-report.csv"'},body:'No PPBJ\nPR/1\n'});}return route.fulfill({contentType:'text/html',body:fixture});});
            await page.goto('https://report-fixture.test/ppbj/report');await page.waitForFunction(()=>net.calls.length===1);
            if(mobile)await page.evaluate(()=>document.documentElement.classList.add('dark'));
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();assert.equal(await page.evaluate(()=>net.calls.length),1);
            await page.locator('#startDate').fill('2026-10');assert.equal(await page.evaluate(()=>net.calls[0].aborted),true);
            await page.locator('#vendorFilter').selectOption('PT Audit, Indonesia');await page.getByRole('button',{name:'Tampilkan',exact:true}).click();
            await page.evaluate(data=>finish(1,200,data),payload());await page.waitForFunction(()=>document.querySelector('#statTotal').textContent==='51');
            await page.evaluate(data=>finish(0,200,data),payload(999));assert.equal(await page.locator('#statTotal').textContent(),'51');assert.equal(await page.locator('#dataTableBody tr').count(),50);assert.equal(await page.locator('img').count(),0);
            assert.equal(new URL(await page.evaluate(()=>net.calls[1].url)).searchParams.get('vendor[]'),'PT Audit, Indonesia');
            await page.getByRole('button',{name:'Berikutnya',exact:true}).click();await page.evaluate(data=>finish(2,200,data),payload(51,2));await page.waitForFunction(()=>document.querySelector('#reportPageInfo').textContent==='Halaman 2 dari 2');assert.equal(await page.locator('#dataTableBody tr').count(),1);
            await page.locator('#reportPerPage').selectOption('100');await page.evaluate(data=>finish(3,200,data),payload(51,1,100));await page.waitForFunction(()=>document.querySelectorAll('#dataTableBody tr').length===51);
            await page.screenshot({path:`tmp/ppbj-report-${mobile?'mobile':'desktop'}.png`,fullPage:false});
            await page.locator('#periodType').selectOption('yearly');assert.equal(await page.locator('#startDate').getAttribute('min'),'1000');
            await page.locator('#periodType').selectOption('monthly');assert.equal(await page.locator('#startDate').getAttribute('min'),'1000-01');assert.equal(await page.locator('#endDate').inputValue(),'');
            await page.locator('#periodType').selectOption('custom');await page.locator('#startDate').fill('2026-11-20');await page.locator('#endDate').fill('2026-11-19');
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.getByRole('button',{name:'Export CSV',exact:true}).click();assert.equal(await page.evaluate(()=>net.calls.length),4);assert.equal(downloads.length,0);assert.equal(await page.locator('#endDate').getAttribute('aria-invalid'),'true');
            await page.getByRole('button',{name:'Reset',exact:true}).click();await page.evaluate(()=>finish(4,422,{errors:{start_date:['Periode perlu diperiksa.']}}));await page.waitForFunction(()=>!document.querySelector('#reportFilters').hasAttribute('aria-busy'));assert.equal(await page.locator('#startDate').getAttribute('aria-invalid'),'true');
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.evaluate(data=>finish(5,200,data),payload(0));await page.waitForFunction(()=>document.querySelector('#statTotal').textContent==='0');assert.equal(await page.locator('#emptyState').isVisible(),true);
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.evaluate(()=>{finish(6,200,null,true);[...net.timers.values()][0]();});await page.waitForFunction(()=>document.querySelector('#reportStatus').textContent.includes('belum selesai'));assert.equal(await page.evaluate(()=>net.calls.length),7);
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});await page.evaluate(data=>finish(7,200,data),payload());assert.equal(await page.evaluate(()=>net.calls[7].aborted),true);assert.equal(await page.locator('#statsSection').isVisible(),false);
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.evaluate(data=>finish(8,200,data),payload(1));await page.waitForFunction(()=>document.querySelector('#statTotal').textContent==='1');
            const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Export CSV',exact:true}).click();await downloaded;
            await page.getByRole('button',{name:'Export CSV',exact:true}).click();assert.equal(downloads.length,1);assert.equal(downloads[0].searchParams.has('page'),false);assert.equal(downloads[0].searchParams.has('per_page'),false);
            await page.getByRole('button',{name:'Tampilkan',exact:true}).click();await page.evaluate(()=>finish(9,500,{message:'SQL private detail'}));await page.waitForFunction(()=>document.querySelector('#reportStatus').textContent.includes('belum dapat dibaca'));assert.equal(await page.locator('#reportStatus').textContent().then(text=>text.includes('SQL')),false);
            assert.deepEqual(errors,[]);console.log(`PPBJ_REPORT_BROWSER_OK mobile=${mobile} actual_blade=true stale_results_ignored=true pagination=true safe_rendering=true date_validation=true reset=true timeout_body=true lifecycle=true native_csv=true duplicate_download_blocked=true`);await page.close();
        }
    } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
