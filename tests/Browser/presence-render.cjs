const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const source=fs.readFileSync('public/assets/app/app-shell.js','utf8');
const start=source.indexOf('        var cPP;');
const presence=source.slice(start,source.indexOf('        })();',start)+'        })();'.length);
const guard=source.slice(source.indexOf('/* BEGIN SHELL BACKGROUND READS */'),source.indexOf('/* END SHELL BACKGROUND READS */'));
const appCss='/build/'+JSON.parse(fs.readFileSync('public/build/manifest.json','utf8'))['resources/css/app.css'].file;
const fixture=`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="${appCss}"><body class="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100" style="padding:24px"><div id="presenceWrap" style="position:relative;display:flex;justify-content:flex-end"><button type="button" id="presenceTrigger" class="flex gap-2 p-3"><span id="avatarStack" class="avatar-stack"></span>Online <span id="onlineCountLabel">0</span><span id="myMoodFloat" class="hidden"></span></button><div class="presence-panel" id="presencePanel"><div class="pp-header"><span class="pp-title">Sedang online</span><span class="pp-count" id="ppCount">0</span></div><div class="pp-list" id="ppList"></div><div class="pp-footer"><button type="button" class="pp-footer-btn" id="btnChangeMood">Ganti mood</button></div></div></div><button id="outside" style="margin-top:550px">Di luar panel</button><script src="/presence-fixture.js"></script>`;
const rows=Array.from({length:12},(_,i)=>({id:i+1,name:i===0?'Presence Tester':'Rekan '+(i+1),department:i%2?'operasional':'umum',initials:i===0?'PT':'RK',color:'#6366f1',mood:i===0?'👩‍💻':'😄',is_me:i===0,idle:false}));
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of [false,true])for(const dark of [false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1280,height:900}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(({rows,dark})=>{
   window.APP_SHELL_CONFIG={moodEnabled:true};window.responseRows=rows;window.bad=0;
   window.quickMoodChat=payload=>window.chatPayload=payload;
   window.fetch=async url=>({ok:true,status:200,json:async()=>url==='/presence/mood'?{mood:'👩‍💻'}:{online:window.responseRows,count:window.responseRows.length}});
   if(dark)document.addEventListener('DOMContentLoaded',()=>document.documentElement.classList.add('dark'));
  },{rows,dark});
  await page.route('**/*',route=>{const pathname=new URL(route.request().url()).pathname;
   if(pathname==='/presence-fixture.js')return route.fulfill({contentType:'text/javascript',body:guard+'\n'+presence});
   if(pathname.startsWith('/build/'))return route.fulfill({path:'public'+pathname});
   return route.fulfill({contentType:'text/html',body:fixture});
  });
  await page.goto('https://presence.test/');await page.click('#presenceTrigger');await page.waitForSelector('.pp-row');
  assert.equal(await page.locator('.pp-row').count(),12);assert.equal(await page.textContent('#onlineCountLabel'),'12');
  assert.equal(await page.textContent('#myMoodFloat'),'👩‍💻');assert.equal(await page.locator('.av-overflow').textContent(),'+8');
  await page.waitForSelector('#ppScrollTools.show');await page.click('#ppScrollBottom');await page.waitForFunction(()=>document.getElementById('ppList').scrollTop>0);
  await page.click('#ppScrollTop');await page.waitForFunction(()=>document.getElementById('ppList').scrollTop===0);
  await page.locator('.pp-chat-btn').first().click();assert.equal(await page.evaluate(()=>chatPayload.id),'2');
  const box=await page.locator('#presencePanel').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=(mobile?390:1280));
  await page.screenshot({path:`tmp/presence-${mobile?'mobile':'desktop'}-${dark?'dark':'light'}.png`});
  await page.click('#outside');assert.equal(await page.locator('#presencePanel').evaluate(el=>el.classList.contains('open')),false);
  await page.evaluate(()=>{window.responseRows=[{id:1,name:'<img src=x onerror=window.bad=2>',department:'<b>Umum</b>',initials:'<svg>',color:'red" onclick="bad',mood:'<svg/onload=window.bad=1>',is_me:true},null,{id:'bad'}];});
  // Resume after pagehide to force one immediate read through the real trigger.
  await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await page.click('#presenceTrigger');
  await page.waitForFunction(()=>document.querySelectorAll('.pp-row').length===1);
  assert.equal(await page.locator('#presenceWrap img,#presenceWrap svg,#presenceWrap [onload],#presenceWrap [onerror],#presenceWrap [onclick]').count(),0);
  assert.equal(await page.evaluate(()=>bad),0);assert.equal(await page.locator('.pp-name').textContent(),'<img src=x onerror=window.bad=2>');
  assert.equal(await page.locator('.pp-av .mood-tag').textContent(),'<svg/onload=window.bad=1>');
  await page.evaluate(()=>closePresencePanel());assert.equal(await page.locator('#presencePanel').evaluate(el=>el.classList.contains('open')),false);
  assert.deepEqual(errors,[]);console.log(`PRESENCE_BROWSER_OK mobile=${mobile} dark=${dark} safe_dom=true counts=true scroll=true chat_payload=true close=true`);await page.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
