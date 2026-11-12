const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
(async()=>{
 const writes=[];const server=http.createServer(async(req,res)=>{
  if(req.url==='/save'){let body='';for await(const chunk of req)body+=chunk;writes.push(new URLSearchParams(body));res.setHeader('Content-Type','text/html');setTimeout(()=>res.end('Saved'),300);return;}
  if(req.url.startsWith('/assets/')){res.setHeader('Content-Type',req.url.endsWith('.js')?'text/javascript':'text/css');res.end(await fs.readFile('public'+req.url));return;}
  res.setHeader('Content-Type','text/html');res.end(`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/assets/app/form-ux.css"><form id="native" method="post" action="/save" target="result"><label for="name">Nama</label><input id="name" name="name" required><input name="version" type="hidden" value="7"><button name="action" value="approve">Simpan</button></form><form id="custom" method="post"><button type="submit">Async</button></form><iframe name="result" hidden></iframe><div id="messages"></div><script>window.customSaves=0;document.querySelector('#custom').addEventListener('submit',e=>{e.preventDefault();window.customSaves++;});</script><script src="/assets/app/form-ux.js"></script>`);
 });await new Promise(resolve=>server.listen(8798,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 try{for(const mobile of[false,true]){
  const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1200,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push(d.type());d.dismiss();});
  await page.goto('http://127.0.0.1:8798');await page.locator('#native button').click();await page.locator('.ux-error-summary').waitFor();assert.equal(writes.length,mobile?2:0);
  await page.locator('#name').fill('Data utuh');await page.locator('#native button').click();await page.waitForFunction(()=>document.querySelector('#native').classList.contains('ux-submitting'));
  await page.locator('#native').evaluate(form=>form.requestSubmit(form.querySelector('button')));
  await page.waitForTimeout(380);assert.equal(writes.length,mobile?3:1);const body=writes.at(-1);assert.equal(body.get('name'),'Data utuh');assert.equal(body.get('version'),'7');assert.equal(body.get('action'),'approve');
  assert.equal(await page.locator('#name').isDisabled(),false);
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));assert.equal(await page.locator('#native').getAttribute('aria-busy'),null);
  await page.locator('#native button').click();await page.waitForTimeout(380);assert.equal(writes.length,mobile?4:2);
  await page.locator('#custom button').click();await page.locator('#custom button').click();assert.equal(await page.evaluate(()=>customSaves),2);assert.equal(await page.locator('#custom').getAttribute('aria-busy'),null);
  const source=await fs.readFile('public/assets/app/app-shell.js','utf8');const start=source.indexOf('            function appendMsg(m, prepend)');const append=source.slice(start,source.indexOf('            function doStartReply',start));
  await page.addScriptTag({content:`var messagesEl=document.querySelector('#messages'),MY_ID=1;function amMentioned(){return false}function createShareCard(){return null}function renderMentionText(text){return text}function renderReactionsForMessage(){}function scheduleDeleteExpiry(){};${append}`});
  const ids=await page.evaluate(()=>{for(const id of[5,8,3,4,8,1,2])appendMsg({id,user_id:id===8?1:2,message:'Pesan '+id,created_at:'2026-11-12T10:00:00Z',can_delete:false},id<3);return [...messagesEl.querySelectorAll('.msg-wrap')].map(el=>Number(el.dataset.msgId));});
  assert.deepEqual(ids,[1,2,3,4,5,8]);assert.deepEqual(errors,[]);
  console.log(`SITE_INTERACTIONS_OK mobile=${mobile} native_duplicate_blocked=true fields_and_submitter_preserved=true bfcache_restored=true chat_ordered=true`);await page.close();
 }}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
