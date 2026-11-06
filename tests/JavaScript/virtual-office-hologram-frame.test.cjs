const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture({create=true,readonly=false}={}){
    const events={},formEvents={},messages=[],fields=[],buttons=[{},{}];let opens=0,url=null,focused=0,removed=0;
    const form={addEventListener:(k,f)=>formEvents[k]=f,querySelector:()=>({focus(){focused++;}})},getForm={append:field=>fields.push(field),querySelector:()=>({remove(){removed++;}})},doc={body:{dataset:{create:create?'1':'0',readonly:readonly?'1':'0'}},getElementById:id=>id==='torprForm'?form:null,addEventListener:(k,f)=>{const previous=events[k];events[k]=event=>{previous?.(event);f(event);};},querySelector:()=>null,querySelectorAll:s=>s.startsWith('form[')?[getForm]:buttons,createElement:()=>({})};
    const location={href:'https://office.test/virtual-office/hologram/create?office_frame=17',origin:'https://office.test',assign:value=>url=value},win={location,parent:{postMessage:(...v)=>messages.push(v)},openCreateForm:()=>opens++},history={replaceState:(a,b,value)=>url=value.href};
    vm.runInNewContext(fs.readFileSync('public/assets/virtual-office/hologram-frame.js','utf8'),{window:win,document:doc,location,history,URL,Date});
    return{events,formEvents,messages,fields,buttons,get opens(){return opens;},get url(){return url;},get focused(){return focused;},get removed(){return removed;}};
}
test('real create form opens once and subsequent save reload targets its list while navigation retains the message channel',()=>{
    const f=fixture();assert.equal(f.opens,1);assert.equal(f.focused,1);assert.equal(f.url,'https://office.test/virtual-office/hologram/torpr?office_frame=17');assert.equal(f.fields[0].name,'office_frame');assert.equal(f.fields[0].value,'17');assert.equal(f.removed,1,'GET searches cannot leak a CSRF token, including native form.submit().');
    f.formEvents.input({target:{value:'Highly private document text'}});f.formEvents.change();assert.equal(f.messages.filter(([m])=>m.type==='office-hologram-dirty').length,1);assert.ok(f.messages.every(([m,origin])=>m.channel==='17'&&origin==='https://office.test'));assert.ok(!JSON.stringify(f.messages).includes('Highly private'));
    let prevented=false;f.events.keydown({key:'Escape',preventDefault(){prevented=true;}});assert.equal(prevented,true);assert.ok(f.messages.some(([m])=>m.type==='office-hologram-escape'));
});
test('read-only frame cannot auto-open creation and disables create/import/save controls',()=>{
    const f=fixture({readonly:true});assert.equal(f.opens,0);assert.ok(f.buttons.every(b=>b.disabled));assert.equal(f.messages[0][0].type,'office-hologram-ready');
});
