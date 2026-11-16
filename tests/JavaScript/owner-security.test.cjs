const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/app/owner-security.js', 'utf8');
function harness(options = {}) {
    const callbacks = {}, confirmations = [], dialogs = [], native = [], status = {hidden:true,textContent:''};
    function node() {const attributes = new Map();return {getAttribute:key=>attributes.get(key)??null,setAttribute:(key,value)=>attributes.set(key,value),removeAttribute:key=>attributes.delete(key)};}
    const forms = [0,1].map(index=>({...node(),dataset:{confirmTitle:'Akhiri?',confirmText:'Sesi lain perlu login kembali.'},addEventListener:(name,fn)=>callbacks['submit'+index]=fn}));
    const buttons = [node(),node()];
    function submit(index) {const event={prevented:false,preventDefault(){this.prevented=true;}};const completion=callbacks['submit'+index](event);if(!event.prevented)native.push(index);return {event,completion};}
    forms.forEach((form,index)=>form.requestSubmit=()=>{if(options.submitThrows)throw new Error('submit failed');submit(index);});
    const window = {addEventListener:(name,fn)=>callbacks[name]=fn,FormUX:{confirm:()=>{
        if(options.confirmThrows)throw new Error('dialog failed');
        return new Promise(resolve=>{const dialog={dispatchEvent:()=>{dialogs.splice(dialogs.indexOf(dialog),1);resolve(false);}};dialogs.push(dialog);confirmations.push(value=>{dialogs.splice(dialogs.indexOf(dialog),1);resolve(value);});});
    }}};
    const root={querySelector:()=>status,querySelectorAll:selector=>selector==='[data-session-revoke]'?forms:buttons};
    const document={getElementById:()=>root,querySelectorAll:()=>dialogs};
    vm.runInNewContext(source,{window,document,Event});
    return {forms,buttons,status,native,submit,confirmations,dialogs,callbacks};
}
test('session controls allow only one confirmation across forms and cancel restores original attributes',async()=>{
    const h=harness();h.buttons[1].setAttribute('aria-disabled','true');
    const first=h.submit(0);h.submit(0);h.submit(1);
    assert.equal(h.confirmations.length,1);assert.deepEqual(h.native,[]);assert.equal(h.forms[0].getAttribute('aria-busy'),'true');
    h.confirmations[0](false);await first.completion;
    assert.equal(h.buttons[0].getAttribute('aria-disabled'),null);assert.equal(h.buttons[1].getAttribute('aria-disabled'),'true');assert.equal(h.forms[0].getAttribute('aria-busy'),null);assert.equal(h.status.hidden,true);
});
test('accepted confirmation sends one native form and blocks repeated actions until navigation finishes',async()=>{
    const h=harness(), first=h.submit(1);h.confirmations[0](true);await first.completion;
    assert.deepEqual(h.native,[1]);h.submit(1);h.submit(0);assert.deepEqual(h.native,[1]);assert.match(h.status.textContent,/Memproses/);
    h.callbacks.pageshow();assert.equal(h.buttons[0].getAttribute('aria-disabled'),null);assert.equal(h.forms[1].getAttribute('aria-busy'),null);
    const next=h.submit(0);h.confirmations[1](false);await next.completion;
});
test('page lifecycle cancels owned dialogs and ignores a late confirmation',async()=>{
    const h=harness(), first=h.submit(0);assert.equal(h.dialogs.length,1);h.callbacks.pagehide();h.confirmations[0](true);await first.completion;
    assert.equal(h.dialogs.length,0);assert.deepEqual(h.native,[]);assert.equal(h.forms[0].getAttribute('aria-busy'),null);
    h.callbacks.pageshow();const next=h.submit(1);h.confirmations[1](true);await next.completion;assert.deepEqual(h.native,[1]);
});
test('dialog and native-submit failures release controls with a readable notice',async()=>{
    for(const options of [{confirmThrows:true},{submitThrows:true}]) {
        const h=harness(options), first=h.submit(0);if(!options.confirmThrows)h.confirmations[0](true);await first.completion;
        assert.deepEqual(h.native,[]);assert.match(h.status.textContent,/belum dapat/);assert.equal(h.forms[0].getAttribute('aria-busy'),null);assert.equal(h.buttons[0].getAttribute('aria-disabled'),null);
    }
});
test('unrelated pages and missing shared confirmation leave native forms usable',()=>{
    vm.runInNewContext(source,{document:{getElementById:()=>null},window:{}});
    vm.runInNewContext(source,{document:{getElementById:()=>({})},window:{}});
});
