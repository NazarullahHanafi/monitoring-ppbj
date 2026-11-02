const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/sp/sp-portfolio-maps.js'),'utf8');
const tick=()=>new Promise(setImmediate);
function runtime(){
    const requests=[],updates=[],events={},nodes={},window={SPPHPrintMasters:{choices:async()=>({fields:[{id:5,nama:'Bidang LAB'}]})}};let dialog;
    const Swal={update:data=>updates.push(data),fire:options=>new Promise(resolve=>dialog={options,resolve}),getHtmlContainer:()=>({addEventListener:(type,handler)=>events[type]=handler})};
    vm.runInNewContext(source,{window,Swal,URLSearchParams,document:{documentElement:{classList:{contains:()=>true}},getElementById:id=>nodes[id],querySelector:()=>({content:'test-csrf'})},fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    return {window,requests,updates,events,nodes,dialog:()=>dialog,respond:(index,data,status=200)=>requests[index].resolve({ok:status<300,json:async()=>data})};
}
const row={id:1,portfolio:'PK - LAB',field_id:5,field_name:'Bidang LAB',is_active:true,version:'version-1'};
const page=rows=>({rows,page:1,last_page:1});
test('mapping manager is lazy, read-only has no writes, and portfolio text is escaped',async()=>{
    const h=runtime();assert.equal(h.requests.length,0);const task=h.window.SPPortfolioMaps.open({can_manage:false,portfolios:[]});const opened=h.dialog().options.didOpen();await tick();h.respond(0,page([{...row,portfolio:'<img onerror=x>'}]));await opened;
    assert.match(h.updates.at(-1).html,/&lt;img/);assert.doesNotMatch(h.updates.at(-1).html,/id="spMapForm"|Edit pemetaan/);assert.equal(h.requests.length,1);
    h.dialog().options.willClose();h.dialog().resolve({});await task;assert.doesNotMatch(source,/setInterval|localStorage|sessionStorage/);
});
test('mapping search runs on submit only; failed save retains draft and sends CSRF once',async()=>{
    const h=runtime();const task=h.window.SPPortfolioMaps.open({can_manage:true,portfolios:['PK - LAB']});const opened=h.dialog().options.didOpen();await tick();h.respond(0,page([]));await opened;
    h.nodes.spMapQuery={value:'QAQC'};assert.equal(h.requests.length,1);const search=h.events.submit({target:{id:'spMapSearch'},preventDefault(){}});assert.match(h.requests[1].url,/q=QAQC/);h.respond(1,page([]));await search;
    h.nodes.spMapPortfolio={value:'PK - QAQC'};h.nodes.spMapField={value:'5'};h.nodes.spMapActive={checked:true};
    const save=h.events.submit({target:{id:'spMapForm'},preventDefault(){}});assert.equal(h.requests[2].options.method,'POST');assert.equal(h.requests[2].options.headers['X-CSRF-TOKEN'],'test-csrf');
    await h.events.submit({target:{id:'spMapForm'},preventDefault(){}});assert.equal(h.requests.length,3);
    h.respond(2,{message:'Pemetaan sudah ada'},422);await save;assert.match(h.updates.at(-1).html,/value="PK - QAQC"/);assert.match(h.updates.at(-1).html,/Pemetaan sudah ada/);
    h.dialog().resolve({});await task;
});
test('mapping edits use versioned PUT and deactivation never permanently deletes',async()=>{
    const h=runtime();const task=h.window.SPPortfolioMaps.open({can_manage:true,portfolios:['PK - LAB']});const opened=h.dialog().options.didOpen();await tick();h.respond(0,page([row]));await opened;
    h.events.click({target:{closest:()=>({dataset:{spMap:'edit',id:'1'}})}});
    h.nodes.spMapPortfolio={value:'PK - LAB'};h.nodes.spMapField={value:'5'};h.nodes.spMapActive={checked:false};const save=h.events.submit({target:{id:'spMapForm'},preventDefault(){}});
    const payload=JSON.parse(h.requests[1].options.body);assert.equal(h.requests[1].options.method,'PUT');assert.equal(payload.version,'version-1');assert.equal(payload.is_active,false);
    h.respond(1,{message:'Tersimpan'});await tick();h.respond(2,page([{...row,is_active:false}]));await save;assert.ok(h.requests.every(r=>r.options.method!=='DELETE'));
    h.dialog().resolve({});await task;
});
