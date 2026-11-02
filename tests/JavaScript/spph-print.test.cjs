const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/spph/spph-print.js'),'utf8');
function context(overrides={}) {
    const data={number:'SPPH/1',amount:'30000000.00',amount_valid:true,pr_count:2,threshold:50000000,name_id:1,title_id:2,
        basis:'Total sebelum PPN',rule:'Di bawah Rp50.000.000',name:'Harits Jansen',title:'Kepala Bidang Dukungan Bisnis',
        rules:[{label:'Di bawah',name:'Harits Jansen',title:'Kepala Bidang Dukungan Bisnis'},{label:'Mulai dari',name:'Bambang Harwanta',title:'Kepala Cabang'}],
        ready:true,errors:[],fingerprint:'basis-1',prs:[{number:'PR/1',amount:10000000},{number:'PR/2',amount:20000000}],
        checked_at:'02 Nov 2026',...overrides};
    data.selection=overrides.selection || {signing_mode:'auto',penandatangan:data.name,jabatan:data.title,print_basis:data.fingerprint};
    return data;
}
function runtime() {
    const requests=[],dialogs=[],navigations=[],updates=[],messages=[],nodes={},events={};
    let visible=true;
    const Swal={fire:options=>new Promise(resolve=>dialogs.push({options,resolve})),showLoading(){},isLoading:()=>false,isVisible:()=>visible,
        showValidationMessage:message=>messages.push(message),update:options=>updates.push(options),getHtmlContainer:()=>({addEventListener:(type,fn)=>events[type]=fn})};
    const window={location:{assign:url=>navigations.push(url)},alert(){},SPPHPrintMasters:{choices:async()=>({names:[{id:1,nama:'Harits Jansen'},{id:3,nama:'Pejabat Pengganti'}],titles:[{id:2,nama:'Kepala Bidang Dukungan Bisnis'},{id:4,nama:'Jabatan Pengganti'}]})}};
    vm.runInNewContext(source,{window,Swal,URL,URLSearchParams,Intl,AbortController,location:{origin:'https://simon.example'},
        document:{documentElement:{classList:{contains:()=>false}},getElementById:id=>nodes[id]},
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    const respond=(index,data,status=200)=>requests[index].resolve({ok:status===200,status,json:async()=>data});
    return {window,requests,dialogs,navigations,updates,messages,respond,nodes,events,hide:()=>visible=false};
}
const tick=()=>new Promise(setImmediate);

test('print context is on demand only; escaped, human-readable confirmation precedes preview',async()=>{
    const h=runtime();assert.equal(h.requests.length,0);
    const task=h.window.openSpphPrint('/spph/12/cetak-preview?vendor=Vendor+A');
    assert.equal(h.requests[0].url,'/spph/12/print-context');
    h.respond(0,context({number:'<img src=x onerror=bad()>',name:'Harits <script>bad()</script>'}));await tick();
    const dialog=h.dialogs[1];
    assert.match(dialog.options.html,/&lt;img/);assert.doesNotMatch(dialog.options.html,/<script>/);
    assert.match(dialog.options.html,/Tidak dikalikan jumlah vendor/);assert.match(dialog.options.html,/Lanjut Preview/);
    assert.equal(h.navigations.length,0);
    dialog.resolve({isDismissed:true});await task;assert.equal(h.requests.length,1);
});

test('confirm rechecks latest basis and navigates same tab preserving vendor without popup dependency',async()=>{
    const h=runtime();const task=h.window.openSpphPrint('/spph/12/cetak-preview?vendor=Vendor+A');
    h.respond(0,context());await tick();
    const dialog=h.dialogs[1];const confirm=dialog.options.preConfirm();
    h.respond(1,context());const url=await confirm;
    dialog.resolve({isConfirmed:true,value:url});await task;
    const parsed=new URL(h.navigations[0]);
    assert.equal(parsed.searchParams.get('vendor'),'Vendor A');
    assert.equal(parsed.searchParams.get('penandatangan'),'Harits Jansen');
    assert.equal(parsed.searchParams.get('print_basis'),'basis-1');
    assert.equal(h.requests.length,2);
});

test('changed amount refreshes visible recommendation and requires a second confirmation',async()=>{
    const h=runtime();const task=h.window.openSpphPrint('/spph/12/cetak-semua-vendor-preview');
    h.respond(0,context());await tick();
    const dialog=h.dialogs[1];const confirm=dialog.options.preConfirm();
    const latest=context({amount:60000000,name:'Bambang Harwanta',title:'Kepala Cabang',fingerprint:'basis-2'});
    h.respond(1,latest);assert.equal(await confirm,false);
    assert.match(h.updates[0].html,/Bambang Harwanta/);assert.match(h.messages[0],/berubah/);
    assert.equal(h.navigations.length,0);
    const second=dialog.options.preConfirm();h.respond(2,latest);const url=await second;
    dialog.resolve({isConfirmed:true,value:url});await task;
    assert.equal(new URL(h.navigations[0]).searchParams.get('penandatangan'),'Bambang Harwanta');
});

test('missing values disable preview; unsafe source and helper URLs are not followed',async()=>{
    const h=runtime();await h.window.openSpphPrint('https://evil.example/spph/12/cetak-preview');
    assert.equal(h.requests.length,0);
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');
    h.respond(0,context({ready:false,amount_valid:false,errors:['Nilai belum lengkap'],ppbj_url:'javascript:bad()',master_url:'https://evil.example'}));await tick();
    assert.equal(h.dialogs[1].options.showConfirmButton,false);
    assert.match(h.dialogs[1].options.html,/Nilai belum lengkap/);assert.doesNotMatch(h.dialogs[1].options.html,/href=/);
    h.dialogs[1].resolve({isDismissed:true});await task;
});

test('cancel during initial check aborts and a late response cannot open confirmation',async()=>{
    const h=runtime();const task=h.window.openSpphPrint('/spph/12/cetak-preview');
    h.dialogs[0].resolve({isDismissed:true});await tick();
    assert.equal(h.requests[0].options.signal.aborted,true);
    h.respond(0,context());await task;
    assert.equal(h.dialogs.length,1);assert.equal(h.navigations.length,0);
    assert.doesNotMatch(source,/setInterval|localStorage|sessionStorage/);
});

test('manual mode uses selected active master IDs and reason, never an arbitrary typed signer',async()=>{
    const h=runtime();const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();
    const dialog=h.dialogs[1];dialog.options.didOpen();
    await h.events.click({target:{closest:()=>({dataset:{sgMode:'manual'},hasAttribute:()=>false})}});
    assert.match(h.updates.at(-1).html,/Alasan pilihan manual/);
    h.nodes.sgSigner={value:'3'};h.nodes.sgTitle={value:'4'};h.nodes.sgReason={value:'Pejabat pengganti sesuai penugasan'};
    const confirm=dialog.options.preConfirm();
    const request=new URL(h.requests[1].url,'https://simon.example');
    assert.equal(request.searchParams.get('signing_mode'),'manual');assert.equal(request.searchParams.get('signer_id'),'3');
    const selection={signing_mode:'manual',signer_id:3,title_id:4,manual_reason:h.nodes.sgReason.value,penandatangan:'Pejabat Pengganti',jabatan:'Jabatan Pengganti',print_basis:'basis-1'};
    h.respond(1,context({selection}));const url=await confirm;dialog.resolve({isConfirmed:true,value:url});await task;
    assert.equal(new URL(h.navigations[0]).searchParams.get('penandatangan'),'Pejabat Pengganti');
});

test('manual mode cannot continue without a sufficient reason and inactive-master server rejection stays visible',async()=>{
    const h=runtime();const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();
    const dialog=h.dialogs[1];dialog.options.didOpen();await h.events.click({target:{closest:()=>({dataset:{sgMode:'manual'},hasAttribute:()=>false})}});
    assert.equal(await dialog.options.preConfirm(),false);assert.match(h.messages.at(-1),/minimal 10 karakter/);assert.equal(h.requests.length,1);
    h.nodes.sgReason={value:'Penggantian pejabat sesuai penugasan'};
    const confirm=dialog.options.preConfirm();h.respond(1,{errors:{penandatangan:['Master sudah tidak aktif']}},422);
    assert.equal(await confirm,false);assert.match(h.messages.at(-1),/tidak aktif/);assert.equal(h.navigations.length,0);
    dialog.resolve({isDismissed:true});await task;
});
