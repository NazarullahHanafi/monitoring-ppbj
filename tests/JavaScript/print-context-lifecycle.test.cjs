const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const tick=()=>new Promise(setImmediate);
function context(module,extra={}){
    const result={number:module.toUpperCase()+'/1',amount:'1000000.00',amount_valid:true,pr_count:1,threshold:50000000,name_id:1,title_id:2,
        basis:'Nilai tersimpan',rule:'Di bawah batas',name:'Pejabat',title:'Kepala Bidang',ready:true,can_manage:true,errors:[],fingerprint:'a'.repeat(64),
        rules:[],prs:[{number:'PR/1',amount:1000000,portfolio:'LAB'}],owner_field_id:5,owner_field_name:'LAB',owner_can_learn:false,owner_diagnostics:[],portfolios:['LAB'],...extra};
    result.selection=extra.selection||{signing_mode:'auto',penandatangan:result.name,jabatan:result.title,print_basis:result.fingerprint,...(module==='sp'?{field_id:5,field_reason:''}:{})};return result;
}
function runtime(module){
    const requests=[],dialogs=[],messages=[],updates=[],navigations=[],nodes={},windowEvents={},events={},timers=new Map();let timer=0,csrf=true;
    const Swal={fire:options=>new Promise(resolve=>dialogs.push({options,resolve})),showLoading(){},isLoading:()=>false,isVisible:()=>true,
        showValidationMessage:m=>messages.push(m),update:d=>updates.push(d),getHtmlContainer:()=>({addEventListener:(type,fn)=>events[type]=fn,querySelectorAll:()=>Object.values(nodes)}),close(){const d=dialogs.at(-1);d.options.willClose?.();d.resolve({isDismissed:true});}};
    const window={addEventListener:(type,handler)=>(windowEvents[type]??=[]).push(handler),alert(){},location:{assign:u=>navigations.push(u)}};
    const sandbox=vm.createContext({window,Swal,URL,URLSearchParams,Intl,AbortController,DOMException,
        setTimeout:fn=>{timers.set(++timer,fn);return timer;},clearTimeout:id=>timers.delete(id),location:{origin:'https://print.test'},
        document:{documentElement:{classList:{contains:()=>false}},getElementById:id=>nodes[id],querySelector:()=>csrf?{content:'synthetic-csrf'}:null},
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    vm.runInContext(fs.readFileSync('public/assets/spph/spph-print-master.js','utf8'),sandbox);
    window.SPPHPrintMasters.choices=async()=>({names:[{id:1,nama:'Pejabat'}],titles:[{id:2,nama:'Kepala Bidang'}],fields:[{id:5,nama:'LAB'}]});
    vm.runInContext(fs.readFileSync(`public/assets/${module}/${module}-print.js`,'utf8'),sandbox);
    return{requests,dialogs,messages,updates,navigations,nodes,timers,noCsrf:()=>csrf=false,
        manual:async()=>{dialogs.at(-1).options.didOpen();await events.click({target:{closest:()=>({dataset:module==='sp'?{spPrint:'manual'}:{sgMode:'manual'},hasAttribute:()=>false})}});},
        open:()=>window[module==='sp'?'openSpPrintPreview':'openSpphPrint'](`/${module}/12/cetak-preview${module==='spph'?'?vendor=Vendor+A':''}`),
        close:()=>Swal.close(),pagehide:()=>windowEvents.pagehide.forEach(fn=>fn()),
        respond:(i,data,status=200,extra={})=>requests[i].resolve({ok:status<400,status,headers:{get:()=> 'application/json'},json:async()=>data,...extra})};
}

for(const module of ['sp','spph']){
    test(`${module}: confirmation refuses another document, signing mode, or automatic official`,async()=>{
        for(const changed of [{number:'OTHER/99'},{selection:{...context(module).selection,signing_mode:'manual'}},{selection:{...context(module).selection,penandatangan:'Other official'}},{selection:{...context(module).selection,jabatan:'Other title'}},{selection:{...context(module).selection,signer_id:99}},{amount_valid:false},{ready:false}]){
            const h=await opened(module),d=h.dialogs[1],confirm=d.options.preConfirm();h.respond(1,context(module,changed));
            assert.equal(await confirm,false,JSON.stringify(changed));assert.equal(h.navigations.length,0);assert.match(h.messages.at(-1),/belum terkonfirmasi/);h.close();await h.task;
        }
    });
    test(`${module}: manual acknowledgment must match the selected IDs, labels and trimmed reason`,async()=>{
        const selected={...context(module).selection,signing_mode:'manual',signer_id:1,title_id:2,manual_reason:'Pejabat sesuai penugasan'};
        for(const changed of [{signer_id:3},{title_id:4},{manual_reason:'A different explanation'},{penandatangan:'Renamed official'},{jabatan:'Renamed title'},{signing_mode:'auto'}]){
            const h=await opened(module);await h.manual();h.nodes[module==='sp'?'spPrintReason':'sgReason']={value:'  Pejabat sesuai penugasan  ',disabled:false};
            const d=h.dialogs[1],confirm=d.options.preConfirm();h.respond(1,context(module,{selection:{...selected,...changed}}));assert.equal(await confirm,false,JSON.stringify(changed));
            assert.match(h.messages.at(-1),/belum terkonfirmasi/);assert.equal(h.nodes[module==='sp'?'spPrintReason':'sgReason'].value,'  Pejabat sesuai penugasan  ');h.close();await h.task;
        }
        const h=await opened(module);await h.manual();h.nodes[module==='sp'?'spPrintReason':'sgReason']={value:'  Pejabat sesuai penugasan  ',disabled:false};
        const d=h.dialogs[1],confirm=d.options.preConfirm(),params=module==='sp'?new URLSearchParams(JSON.parse(h.requests[1].options.body)):new URL(h.requests[1].url,'https://print.test').searchParams;
        assert.equal(params.get('penandatangan'),'Pejabat');assert.equal(params.get('jabatan'),'Kepala Bidang');h.respond(1,context(module,{selection:selected}));
        const url=await confirm;assert.equal(new URL(url).searchParams.get('manual_reason'),'Pejabat sesuai penugasan');h.close();await h.task;
    });
    test(`${module}: native fields are locked during confirmation and restored after rejection or deadline`,async()=>{
        const h=await opened(module),d=h.dialogs[1];h.nodes[module==='sp'?'spPrintField':'sgSigner']={value:module==='sp'?'5':'1',disabled:false};h.nodes.unchanged={value:'',disabled:true};
        const confirm=d.options.preConfirm();assert.equal(Object.values(h.nodes).every(node=>node.disabled),true);h.respond(1,{errors:{choice:['Periksa pilihan']}},422);assert.equal(await confirm,false);
        assert.equal(h.nodes[module==='sp'?'spPrintField':'sgSigner'].disabled,false);assert.equal(h.nodes.unchanged.disabled,true);
        const retry=d.options.preConfirm();assert.equal(Object.values(h.nodes).every(node=>node.disabled),true);h.respond(2,null,200,{json:()=>new Promise(()=>{})});await tick();[...h.timers.values()][0]();await retry;
        assert.equal(h.nodes[module==='sp'?'spPrintField':'sgSigner'].disabled,false);assert.equal(h.nodes.unchanged.disabled,true);h.close();await h.task;
    });
}
test('SP: field, trimmed explanation and mapping acknowledgment must match the request',async()=>{
    for(const changed of [{selection:{...context('sp').selection,field_id:6}},{selection:{...context('sp').selection,field_reason:'Other explanation'}},{mapping_saved:'yes',fingerprint:'b'.repeat(64)},{mapping_saved:true,fingerprint:'b'.repeat(64)}]){
        const h=await opened('sp'),d=h.dialogs[1],confirm=d.options.preConfirm();h.respond(1,context('sp',changed));assert.equal(await confirm,false,JSON.stringify(changed));assert.equal(h.navigations.length,0);h.close();await h.task;
    }
    const h=await opened('sp'),d=h.dialogs[1];h.nodes.spPrintFieldReason={value:'  Catatan bidang sesuai dokumen  ',disabled:false};
    const confirm=d.options.preConfirm();h.respond(1,context('sp',{selection:{...context('sp').selection,field_reason:'Catatan bidang sesuai dokumen'}}));assert.equal(typeof await confirm,'string');h.close();await h.task;
});
async function opened(module,extra={}){const h=runtime(module);h.task=h.open();h.respond(0,context(module,extra));await tick();return h;}

for(const module of ['sp','spph']){
    test(`${module}: cancellation settles an uncooperative initial request without reopening dialogs`,async()=>{
        const h=runtime(module),task=h.open();h.close();await task;assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(h.dialogs.length,1);assert.equal(h.timers.size,0);
        h.respond(0,context(module));await tick();assert.equal(h.dialogs.length,1);
    });
    test(`${module}: the initial deadline includes a stalled JSON body and hides server diagnostics`,async()=>{
        const h=runtime(module),task=h.open();h.respond(0,null,200,{json:()=>new Promise(()=>{})});await tick();[...h.timers.values()][0]();await task;
        assert.match(h.dialogs.at(-1).options.text,/koneksi lambat/);assert.equal(h.timers.size,0);assert.equal(h.navigations.length,0);
    });
    test(`${module}: redirects, HTML, incomplete context and oversized PR arrays are rejected before render`,async()=>{
        for(const [payload,extra] of [[context(module),{redirected:true}],[context(module),{headers:{get:()=> 'text/html'}}],[{},{}],[context(module,{prs:Array(21).fill({number:'PR/1'})}),{}]]){
            const h=runtime(module),task=h.open();h.respond(0,payload,200,extra);await task;assert.equal(h.dialogs.length,2);assert.equal(h.dialogs[1].options.icon,'warning');assert.equal(h.navigations.length,0);
        }
    });
    test(`${module}: duplicate confirmation is ignored and validated selection preserves same-tab navigation`,async()=>{
        const h=await opened(module),d=h.dialogs[1],confirm=d.options.preConfirm();assert.equal(await d.options.preConfirm(),false);assert.equal(h.requests.length,2);assert.equal(d.options.allowEscapeKey(),false);assert.equal(d.options.allowOutsideClick(),false);
        assert.equal(h.requests[1].options.credentials,'same-origin');if(module==='sp')assert.equal(h.requests[1].options.headers['X-CSRF-TOKEN'],'synthetic-csrf');
        h.respond(1,context(module));const url=await confirm;d.resolve({isConfirmed:true,value:url});await h.task;
        assert.equal(new URL(h.navigations[0]).searchParams.get('print_basis'),'a'.repeat(64));if(module==='spph')assert.equal(new URL(url).searchParams.get('vendor'),'Vendor A');assert.equal(h.timers.size,0);
    });
    test(`${module}: confirmation body timeout retains the draft and permits a fresh explicit attempt`,async()=>{
        const h=await opened(module),d=h.dialogs[1];h.nodes[module==='sp'?'spPrintReason':'sgReason']={value:'Draft alasan tersimpan'};
        const confirm=d.options.preConfirm();h.respond(1,null,200,{json:()=>new Promise(()=>{})});await tick();[...h.timers.values()][0]();assert.equal(await confirm,false);assert.match(h.messages.at(-1),/koneksi lambat/);
        const retry=d.options.preConfirm();h.respond(2,context(module));assert.equal(typeof await retry,'string');assert.equal(h.requests.length,3);h.close();await h.task;
    });
    test(`${module}: close and navigation cancel pending confirmation and prevent late UI updates`,async()=>{
        const h=await opened(module),d=h.dialogs[1],confirm=d.options.preConfirm();h.pagehide();h.close();assert.equal(await confirm,false);await h.task;
        h.respond(1,{message:'late private diagnostics'},500);await tick();assert.equal(h.requests[1].options.signal.aborted,true);assert.equal(h.messages.length,0);assert.equal(h.navigations.length,0);
    });
    test(`${module}: missing or unexpected selection fields do not navigate`,async()=>{
        for(const selection of [{},{...context(module).selection,vendor:'different vendor'}]){
            const h=await opened(module),d=h.dialogs[1],confirm=d.options.preConfirm();h.respond(1,context(module,{selection}));assert.equal(await confirm,false);assert.match(h.messages.at(-1),/belum terkonfirmasi/);assert.equal(h.navigations.length,0);h.close();await h.task;
        }
    });
    test(`${module}: backend validation markup stays escaped and unexpected server details stay hidden`,async()=>{
        const h=await opened(module),d=h.dialogs[1],confirm=d.options.preConfirm();h.respond(1,{errors:{field:['<img src=x> Pilihan tidak aktif']}},422);assert.equal(await confirm,false);assert.match(h.messages.at(-1),/&lt;img/);
        const retry=d.options.preConfirm();h.respond(2,{message:'/private/server/path'},500);await retry;assert.doesNotMatch(h.messages.at(-1),/private\/server/);h.close();await h.task;
    });
}
test('SP: missing CSRF sends no POST and stale basis preserves its field error for a read-only refresh',async()=>{
    const h=await opened('sp'),d=h.dialogs[1];h.noCsrf();assert.equal(await d.options.preConfirm(),false);assert.equal(h.requests.length,1);assert.match(h.messages.at(-1),/Sesi formulir/);h.close();await h.task;
    const stale=await opened('sp'),dialog=stale.dialogs[1],confirm=dialog.options.preConfirm();stale.respond(1,{errors:{print_basis:['Basis berubah']}},422);await tick();assert.equal(stale.requests.length,3);assert.equal(stale.requests[2].options.method,undefined);
    stale.respond(2,context('sp',{fingerprint:'b'.repeat(64)}));assert.equal(await confirm,false);assert.equal(stale.updates.length,1);assert.match(stale.messages.at(-1),/Basis berubah/);stale.close();await stale.task;
});
