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

test('document text, secondary text and actions retain readable contrast in both hologram themes',()=>{
    const css=fs.readFileSync('public/assets/virtual-office/hologram-frame.css','utf8');
    const luminance=hex=>{const c=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
    const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
    for(const selector of[':root','html.dark']){const block=css.slice(css.indexOf(selector+'{')).split('}')[0]+'}',values=Object.fromEntries([...block.matchAll(/--hf-([\w-]+):(#[\da-f]{6})(?=[;}])/gi)].map(m=>[m[1],m[2]]));for(const text of['ink','muted','gold'])for(const bg of['base','surface','soft'])assert.ok(contrast(values[text],values[bg])>=4.5,`${selector} ${text}/${bg}`);assert.ok(contrast(values['button-ink'],values.accent)>=4.5);}
});

test('theme control updates the document, parent preference and cross-tab changes',()=>{
    const events={},attrs={},saved=[],classes=new Set(),root={classList:{contains:v=>classes.has(v),toggle:(v,on)=>on?classes.add(v):classes.delete(v)},dataset:{},style:{}},button={addEventListener:(k,f)=>events[k]=f,setAttribute:(k,v)=>attrs[k]=v};
    const parent={setThemeMode:value=>saved.push(value),postMessage(){}},location={href:'https://office.test/virtual-office/hologram/tracking',origin:'https://office.test'},window={parent,location,addEventListener:(k,f)=>events[k]=f};
    const document={documentElement:root,body:{dataset:{}},getElementById:id=>id==='hologramThemeToggle'?button:null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
    vm.runInNewContext(fs.readFileSync('public/assets/virtual-office/hologram-frame.js','utf8'),{window,parent,document,location,URL,Date});
    assert.equal(root.dataset.theme,'light');events.click();assert.deepEqual(saved,['dark']);assert.equal(root.style.colorScheme,'dark');assert.equal(attrs['aria-pressed'],'true');events.storage({key:'theme',newValue:'light'});assert.equal(root.dataset.theme,'light');assert.equal(classes.has('dark'),false);assert.equal(attrs['aria-pressed'],'false');
});
