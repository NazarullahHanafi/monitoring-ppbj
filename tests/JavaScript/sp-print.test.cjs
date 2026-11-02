const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/sp/sp-print.js'),'utf8');
const tick=()=>new Promise(setImmediate);
function data(overrides={}){
    return {number:'SP/1',amount:'49999999.99',amount_valid:true,pr_count:1,threshold:50000000,name_id:1,title_id:2,
        basis:'Nilai SP',rule:'Di bawah Rp50.000.000',name:'Harits Jansen',title:'Kepala Bidang Dukungan Bisnis',ready:true,errors:[],fingerprint:'basis-1',
        rules:[],prs:[{number:'PR/1',amount:999000000,portfolio:'PK - LAB'}],owner_field_id:5,owner_field_name:'LAB',owner_can_learn:false,owner_diagnostics:[],portfolios:['PK - LAB'],can_manage:true,
        selection:{signing_mode:'auto',field_id:5,penandatangan:'Harits Jansen',jabatan:'Kepala Bidang Dukungan Bisnis',print_basis:'basis-1'},...overrides};
}
function runtime(){
    const requests=[],dialogs=[],navigations=[],updates=[],messages=[],nodes={},events={};
    const Swal={fire:options=>new Promise(resolve=>dialogs.push({options,resolve})),showLoading(){},isLoading:()=>false,isVisible:()=>true,showValidationMessage:m=>messages.push(m),update:o=>updates.push(o),getHtmlContainer:()=>({addEventListener:(type,fn)=>events[type]=fn})};
    const window={location:{assign:u=>navigations.push(u)},alert(){},SPPHPrintMasters:{choices:async()=>({names:[{id:1,nama:'Harits Jansen'},{id:3,nama:'Pejabat Pengganti'}],titles:[{id:2,nama:'Kabid'},{id:4,nama:'Jabatan Pengganti'}],fields:[{id:5,nama:'LAB'},{id:6,nama:'Bidang lain'}]})}};
    vm.runInNewContext(source,{window,Swal,URL,URLSearchParams,Intl,AbortController,location:{origin:'https://simon.example'},document:{documentElement:{classList:{contains:()=>false}},getElementById:id=>nodes[id],querySelector:()=>({content:'test-csrf'})},fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    return {window,requests,dialogs,navigations,updates,messages,nodes,events,respond:(i,d,status=200)=>requests[i].resolve({ok:status===200,status,json:async()=>d})};
}
test('SP popup is on demand, escapes data and does not substitute total PR as signing amount',async()=>{
    const h=runtime();assert.equal(h.requests.length,0);const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');
    h.respond(0,data({number:'<img onerror=x>'}));await tick();const dialog=h.dialogs[1];
    assert.match(dialog.options.html,/&lt;img/);assert.match(dialog.options.html,/NILAI SP/);assert.match(dialog.options.html,/Pemetaan portofolio/);
    assert.doesNotMatch(source,/setInterval|localStorage|sessionStorage/);
    dialog.resolve({isDismissed:true});await task;
});
test('SP confirm validates context again and uses server-selected values in same tab',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview?field_id=999');h.respond(0,data());await tick();
    const d=h.dialogs[1];const confirm=d.options.preConfirm();assert.equal(h.requests[1].url,'/sp/12/print-selection');assert.equal(h.requests[1].options.method,'POST');assert.equal(JSON.parse(h.requests[1].options.body).field_id,'5');h.respond(1,data());const url=await confirm;
    d.resolve({isConfirmed:true,value:url});await task;const selected=new URL(h.navigations[0]);assert.equal(selected.searchParams.get('field_id'),'5');assert.equal(selected.searchParams.get('print_basis'),'basis-1');
});
test('unmapped or overridden owner requires an explanation before a server request',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data({owner_field_id:null,owner_field_name:null}));await tick();
    const d=h.dialogs[1];h.nodes.spPrintField={value:'6'};assert.equal(await d.options.preConfirm(),false);assert.equal(h.requests.length,1);
    h.nodes.spPrintFieldReason={value:'Bidang penanggung jawab sesuai konfirmasi'};const confirm=d.options.preConfirm();h.respond(1,data({owner_field_id:null,owner_field_name:null}));await confirm;d.resolve({isDismissed:true});await task;
});
test('manual SCI needs active IDs and a sufficient reason; backend rejection remains visible',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data());await tick();const d=h.dialogs[1];d.options.didOpen();
    await h.events.click({target:{closest:()=>({dataset:{spPrint:'manual'}})}});
    assert.equal(await d.options.preConfirm(),false);assert.match(h.messages.at(-1),/minimal 10/);
    h.nodes.spPrintSigner={value:'3'};h.nodes.spPrintTitle={value:'4'};h.nodes.spPrintReason={value:'Pejabat pengganti sesuai penugasan'};
    const confirm=d.options.preConfirm();assert.equal(JSON.parse(h.requests[1].options.body).signing_mode,'manual');h.respond(1,{errors:{signer:['Master dinonaktifkan']}},422);assert.equal(await confirm,false);assert.match(h.messages.at(-1),/dinonaktifkan/);
    d.resolve({isDismissed:true});await task;
});
test('changed basis requires a second confirmation and cancellation prevents late dialog',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data());await tick();const d=h.dialogs[1];const confirm=d.options.preConfirm();h.respond(1,data({fingerprint:'new-basis'}));assert.equal(await confirm,false);assert.match(h.messages.at(-1),/berubah/);d.resolve({isDismissed:true});await task;
    const task2=h.window.openSpPrintPreview('/sp/13/cetak-preview');h.dialogs[2].resolve({isDismissed:true});await tick();assert.equal(h.requests[2].options.signal.aborted,true);h.respond(2,data());await task2;assert.equal(h.dialogs.length,3);
});
test('cross-origin and unrelated print links are rejected without network calls',async()=>{
    const h=runtime();await h.window.openSpPrintPreview('https://evil.example/sp/12/cetak-preview');await h.window.openSpPrintPreview('/sp/12/delete');assert.equal(h.requests.length,0);
});

test('first portfolio choice is remembered only on explicit confirmation, without a reason or separate manager',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data({owner_field_id:null,owner_field_name:null,owner_can_learn:true}));await tick();
    const d=h.dialogs[1];assert.match(d.options.html,/pilihan otomatis diingat/);assert.doesNotMatch(d.options.html,/id="spPrintFieldReason"/);
    assert.equal(await d.options.preConfirm(),false);assert.equal(h.requests.length,1);h.nodes.spPrintField={value:'6'};
    const confirm=d.options.preConfirm();const req=h.requests[1];const body=JSON.parse(req.options.body);
    assert.equal(body.learn_portfolio,'1');assert.equal(body.print_basis,'basis-1');assert.equal(req.options.headers['X-CSRF-TOKEN'],'test-csrf');
    h.respond(1,data({fingerprint:'new-map-basis',mapping_saved:true,selection:{field_id:6,print_basis:'new-map-basis'}}));const url=await confirm;
    assert.equal(new URL(url).searchParams.get('field_id'),'6');assert.equal(new URL(url).searchParams.has('learn_portfolio'),false);
    d.resolve({isConfirmed:true,value:url});await task;assert.equal(h.navigations.length,1);
    const cancel=runtime();const pending=cancel.window.openSpPrintPreview('/sp/12/cetak-preview');cancel.respond(0,data({owner_can_learn:true}));await tick();cancel.nodes.spPrintField={value:'6'};cancel.dialogs[1].resolve({isDismissed:true});await pending;assert.equal(cancel.requests.length,1);
});

test('read-only viewers do not learn mappings or POST shared settings',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data({can_manage:false,owner_can_learn:true}));await tick();
    const d=h.dialogs[1];assert.match(d.options.html,/id="spPrintFieldReason"/);const confirm=d.options.preConfirm();assert.match(h.requests[1].url,/print-context\?/);assert.doesNotMatch(h.requests[1].url,/learn_portfolio/);h.respond(1,data());await confirm;d.resolve({isDismissed:true});await task;
});

test('stale POST refreshes the read-only context and requires another explicit confirmation',async()=>{
    const h=runtime();const task=h.window.openSpPrintPreview('/sp/12/cetak-preview');h.respond(0,data());await tick();const d=h.dialogs[1];
    const confirm=d.options.preConfirm();h.respond(1,{errors:{print_basis:['Data berubah. Periksa lagi.']}},422);await tick();
    assert.equal(h.requests[2].url,'/sp/12/print-context');h.respond(2,data({fingerprint:'fresh'}));assert.equal(await confirm,false);assert.match(h.messages.at(-1),/Data berubah/);
    d.resolve({isDismissed:true});await task;assert.equal(h.navigations.length,0);
});
