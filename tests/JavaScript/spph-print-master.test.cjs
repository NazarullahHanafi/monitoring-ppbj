const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/spph/spph-print-master.js'),'utf8');
const tick=()=>new Promise(setImmediate);
function runtime(){
    const requests=[],updates=[],events={},nodes={},window={};let dialog;
    const Swal={isVisible:()=>true,update:data=>updates.push(data),getCancelButton:()=>({disabled:false}),
        fire:options=>new Promise(resolve=>dialog={options,resolve}),getHtmlContainer:()=>({addEventListener:(type,handler)=>events[type]=handler})};
    vm.runInNewContext(source,{window,Swal,URLSearchParams,document:{documentElement:{classList:{contains:()=>false}},getElementById:id=>nodes[id],querySelector:()=>({content:'test-csrf'})},
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve}))});
    const respond=(index,data)=>requests[index].resolve({ok:true,json:async()=>data});
    return {window,requests,updates,events,nodes,respond,dialog:()=>dialog};
}
const row={id:10,type:'penandatangan_sci',nama:'Pejabat Penguji',is_active:true,version:'v1'};
const page=rows=>({options:rows,page:1,last_page:1,total:rows.length});

test('master choices are lazy, bounded and prioritize the selected active IDs',async()=>{
    const h=runtime();assert.equal(h.requests.length,0);
    const task=h.window.SPPHPrintMasters.choices(10,20);
    assert.match(h.requests[0].url,/active_only=1/);assert.match(h.requests[0].url,/per_page=50/);assert.match(h.requests[0].url,/include_id=10/);
    h.respond(0,page([row]));h.respond(1,page([{...row,id:20,type:'jabatan_sci'}]));
    const choices=await task;assert.equal(choices.names[0].id,10);assert.equal(choices.titles[0].id,20);
});

test('read-only manager has no mutation controls and escapes names',async()=>{
    const h=runtime();const task=h.window.SPPHPrintMasters.open(false);h.dialog().options.didOpen();
    h.respond(0,page([{...row,nama:'<img src=x>'}]));await tick();
    assert.match(h.updates.at(-1).html,/&lt;img/);assert.doesNotMatch(h.updates.at(-1).html,/sgMasterForm|data-sgm="edit"|data-sgm="toggle"/);
    h.dialog().resolve({isConfirmed:true});await task;
});

test('adding master sends CSRF JSON once; deactivation uses versioned update, never DELETE',async()=>{
    const h=runtime();const task=h.window.SPPHPrintMasters.open(true);h.dialog().options.didOpen();
    h.respond(0,page([row]));await tick();
    h.nodes.sgMasterName={value:'Pejabat Baru'};h.nodes.sgMasterActive={checked:true};
    const save=h.events.submit({target:{id:'sgMasterForm'},preventDefault(){}});
    assert.equal(h.requests[1].options.method,'POST');assert.equal(h.requests[1].options.headers['X-CSRF-TOKEN'],'test-csrf');
    h.respond(1,{message:'Tersimpan',option:{...row,id:11,nama:'Pejabat Baru'}});await tick();h.respond(2,page([row]));await save;
    const click=()=>h.events.click({target:{closest:()=>({dataset:{sgm:'toggle',id:'10'}})}});
    await click();assert.equal(h.requests.length,3);assert.match(h.updates.at(-1).html,/Ya, nonaktifkan/);
    const deactivate=click();assert.equal(h.requests[3].options.method,'PUT');
    assert.equal(JSON.parse(h.requests[3].options.body).version,'v1');assert.equal(JSON.parse(h.requests[3].options.body).is_active,false);
    h.respond(3,{message:'Nonaktif',option:{...row,is_active:false,version:'v2'}});await tick();h.respond(4,page([{...row,is_active:false}]));await deactivate;
    assert.ok(h.requests.every(request=>request.options.method!=='DELETE'));
    h.dialog().resolve({isConfirmed:true});await task;
    assert.doesNotMatch(source,/setInterval|localStorage|sessionStorage/);
});
