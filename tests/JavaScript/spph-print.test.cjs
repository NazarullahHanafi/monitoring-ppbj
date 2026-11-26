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
        can_manage:true,ready:true,errors:[],fingerprint:'basis-1',prs:[{number:'PR/1',amount:10000000},{number:'PR/2',amount:20000000}],
        checked_at:'02 Nov 2026',...overrides};
    data.selection=overrides.selection || {signing_mode:'auto',penandatangan:data.name,jabatan:data.title,print_basis:data.fingerprint};
    return data;
}
function runtime() {
    const requests=[],dialogs=[],navigations=[],updates=[],messages=[],nodes={},events={},windowEvents={};
    let visible=true;
    const Swal={close(){const d=dialogs.at(-1);d.options.willClose?.();d.resolve({isDismissed:true});},fire:options=>new Promise(resolve=>dialogs.push({options,resolve})),showLoading(){},isLoading:()=>false,isVisible:()=>visible,
        showValidationMessage:message=>messages.push(message),update:options=>updates.push(options),getHtmlContainer:()=>({addEventListener:(type,fn)=>events[type]=fn})};
    const window={addEventListener:(type,handler)=>windowEvents[type]=handler,location:{assign:url=>navigations.push(url)},alert(){},SPPHPrintMasters:{choices:async()=>({names:[{id:1,nama:'Harits Jansen'},{id:3,nama:'Pejabat Pengganti'}],titles:[{id:2,nama:'Kepala Bidang Dukungan Bisnis'},{id:4,nama:'Jabatan Pengganti'}]})}};
    vm.runInNewContext(source,{window,Swal,URL,URLSearchParams,Intl,AbortController,location:{origin:'https://simon.example'},
        document:{documentElement:{classList:{contains:()=>false}},getElementById:id=>nodes[id]},
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    const respond=(index,data,status=200)=>requests[index].resolve({ok:status===200,status,json:async()=>data});
    return {window,windowEvents,requests,dialogs,navigations,updates,messages,respond,nodes,events,hide:()=>visible=false};
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

test('missing values open manual selection with preview available; unsafe source and helper URLs are not followed',async()=>{
    const h=runtime();await h.window.openSpphPrint('https://evil.example/spph/12/cetak-preview');
    assert.equal(h.requests.length,0);
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');
    h.respond(0,context({ready:false,amount_valid:false,errors:['Nilai belum lengkap'],ppbj_url:'javascript:bad()',master_url:'https://evil.example'}));await tick();
    assert.equal(h.dialogs[1].options.showConfirmButton,true);
    assert.match(h.dialogs[1].options.html,/id="sgSigner"/);
    assert.match(h.dialogs[1].options.html,/Tetap bisa dicetak/);
    assert.doesNotMatch(h.dialogs[1].options.html,/<option value="[13]" selected/);
    assert.match(h.dialogs[1].options.html,/Nilai belum lengkap/);assert.doesNotMatch(h.dialogs[1].options.html,/href=/);
    h.dialogs[1].resolve({isDismissed:true});await task;
});

test('unlinked SPPH keeps explicit manual choice through recheck and all-vendor preview',async()=>{
    const h=runtime(),data={ready:false,amount_valid:false,pr_count:0,prs:[],errors:['PR belum terhubung']};
    const task=h.window.openSpphPrint('/spph/12/cetak-semua-vendor-preview');h.respond(0,context(data));await tick();
    const d=h.dialogs[1];
    assert.equal(d.options.showConfirmButton,true);
    assert.equal(await d.options.preConfirm(),false);assert.match(h.messages.at(-1),/Pilih nama dan jabatan aktif/);
    h.nodes.sgSigner={value:'3'};h.nodes.sgTitle={value:'4'};
    const confirm=d.options.preConfirm();
    const params=new URL(h.requests[1].url,'https://simon.example').searchParams;
    assert.equal(params.get('signing_mode'),'manual');assert.match(params.get('manual_reason'),/PR\/PPBJ belum terhubung/);
    const selection={signing_mode:'manual',signer_id:3,title_id:4,manual_reason:params.get('manual_reason'),penandatangan:'Pejabat Pengganti',jabatan:'Jabatan Pengganti',print_basis:'basis-1'};
    h.respond(1,context({...data,selection}));const url=await confirm;assert.ok(url);
    d.resolve({isConfirmed:true,value:url});await task;
    assert.equal(new URL(h.navigations[0]).pathname,'/spph/12/cetak-semua-vendor-preview');
    assert.equal(new URL(h.navigations[0]).searchParams.get('signer_id'),'3');
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

test('SPPH leaving the page cancels checks and prevents a closed master manager reopening preview',async()=>{
    const h=runtime();let calls=0,finish;
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.windowEvents.pagehide();h.respond(0,context());await task;assert.equal(h.dialogs.length,1);
    h.window.SPPHPrintMasters.open=()=>new Promise(resolve=>finish=resolve);
    h.window.SPPHPrintMasters.choices=async()=>{calls++;return {names:[],titles:[]};};
    const next=h.window.openSpphPrint('/spph/13/cetak-preview');h.respond(1,context());await tick();
    const d=h.dialogs.at(-1);d.options.didOpen();
    const trigger=h.events.click({target:{closest:()=>({hasAttribute:()=>true})}});
    await tick();
    h.windowEvents.pagehide();finish(null);await next;await trigger;assert.equal(calls,0);
});

test('SPPH closing a preview aborts manual choices and ignores its late error',async()=>{
    const h=runtime();let rejectChoice,signal;
    h.window.SPPHPrintMasters.choices=(a,b,c,d,s)=>{signal=s;return new Promise((_,reject)=>rejectChoice=reject);};
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();const d=h.dialogs[1];d.options.didOpen();
    const click=h.events.click({target:{closest:()=>({dataset:{sgMode:'manual'},hasAttribute:()=>false})}});
    d.options.willClose();d.resolve({isDismissed:true});await task;assert.equal(signal.aborted,true);
    rejectChoice(new Error('late failure'));await click;assert.equal(h.messages.length,0);
});

test('SPPH server validation markup is escaped',async()=>{
    const h=runtime(),task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();
    const confirm=h.dialogs[1].options.preConfirm();h.respond(1,{errors:{name:['<img src=x onerror=bad()>']}},422);await confirm;
    assert.match(h.messages.at(-1),/&lt;img/);assert.doesNotMatch(h.messages.at(-1),/<img/);h.dialogs[1].resolve({isDismissed:true});await task;
});

test('SPPH returning from master refreshes both manual selectors with the new preview signal',async()=>{
    const h=runtime();let calls=0,lastSignal;
    h.window.SPPHPrintMasters.choices=async(a,b,c,d,signal)=>{calls++;lastSignal=signal;return {names:[{id:3,nama:'Pejabat Baru'}],titles:[{id:2,nama:'Jabatan Aktif'}]};};
    h.window.SPPHPrintMasters.open=async()=>({id:3,type:'penandatangan_sci',nama:'Pejabat Baru'});
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();h.dialogs[1].options.didOpen();
    await h.events.click({target:{closest:()=>({hasAttribute:()=>true})}});await task;
    assert.equal(h.requests.length,2);h.respond(1,context());await tick();
    assert.equal(calls,1);assert.equal(lastSignal.aborted,false);assert.match(h.dialogs.at(-1).options.html,/Pejabat Baru/);assert.match(h.dialogs.at(-1).options.html,/Jabatan Aktif/);
    h.dialogs.at(-1).options.willClose();h.dialogs.at(-1).resolve({isDismissed:true});await tick();
});

test('repeated SPPH manual-mode clicks share the same pending option lookup',async()=>{
    const h=runtime();let calls=0,finish;
    h.window.SPPHPrintMasters.choices=()=>{calls++;return new Promise(resolve=>finish=resolve);};
    const task=h.window.openSpphPrint('/spph/12/cetak-preview');h.respond(0,context());await tick();const d=h.dialogs[1];d.options.didOpen();
    const event={target:{closest:()=>({dataset:{sgMode:'manual'},hasAttribute:()=>false})}};
    const first=h.events.click(event),second=h.events.click(event);assert.equal(calls,1);finish({names:[],titles:[]});await first;await second;d.resolve({isDismissed:true});await task;
});
