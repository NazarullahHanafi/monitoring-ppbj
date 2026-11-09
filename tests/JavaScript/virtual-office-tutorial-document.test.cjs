const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const tick=()=>new Promise(setImmediate);
function fixture({kind='ppbj',endpoint='/virtual-office/tutorial/document'}={}){
    const nodes=new Map(),requests=[],messages=[],timers=new Map(),events={};let valid=true,id=0;
    class Node{constructor(){this.value='';this.events={};this.children=[];this.classList={toggle(){}};}addEventListener(k,f){this.events[k]=f;}focus(){}scrollIntoView(){}append(...children){this.children.push(...children);}replaceChildren(){this.children=[];}set innerHTML(v){throw new Error('Unsafe HTML: '+v);}}
    const get=id=>{if(!nodes.has(id))nodes.set(id,new Node());return nodes.get(id);};const form=get('practiceForm');form.elements=Object.fromEntries(['ppbj_no','tgl_ppbj','uraian','total_sebelum_ppn','nomor_pr','tanggal_pr','tujuan_pengadaan','jumlah_pr','number'].map(name=>[name,new Node()]));form.querySelector=()=>form.elements.ppbj_no;form.reportValidity=()=>valid;
    const parent={postMessage:(data,origin)=>messages.push({data,origin}),document:{documentElement:new Node()}};
    const document={body:{dataset:{kind,endpoint}},documentElement:new Node(),getElementById:get,querySelector:()=>({content:'csrf'}),createElement:()=>new Node(),addEventListener:(k,f)=>events[k]=f};
    const window={addEventListener:(k,f)=>events[k]=f};const context={document,parent,window,location:{href:'https://office.test/virtual-office/tutorial/document?office_frame=4',origin:'https://office.test'},URL,Date,AbortController,FormData:class{constructor(form){this.fields=Object.fromEntries(Object.entries(form.elements).map(([key,field])=>[key,field.value]));}},setTimeout:(fn,delay)=>{timers.set(++id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),fetch:(url,options)=>new Promise((resolve,reject)=>{options.signal.addEventListener('abort',()=>reject(Object.assign(new Error('Aborted'),{name:'AbortError'})));requests.push({url,options,resolve});})};
    vm.runInNewContext(fs.readFileSync('public/assets/virtual-office/tutorial-document.js','utf8'),context);
    return{get,form,requests,messages,timers,events,valid:v=>valid=v,submit:()=>form.events.submit({preventDefault(){}})};
}

test('example fills real field names, validation stays isolated, and proof is returned only after a successful practice result',async()=>{
    const f=fixture();f.get('practiceExample').events.click();assert.equal(f.form.elements.ppbj_no.value,'LATIHAN/PPBJ/001');
    f.valid(false);f.submit();assert.equal(f.requests.length,0);f.valid(true);f.submit();f.submit();assert.equal(f.requests.length,1);assert.equal(f.requests[0].url,'/virtual-office/tutorial/document');assert.equal(f.requests[0].options.headers['X-CSRF-TOKEN'],'csrf');
    f.requests[0].resolve({ok:true,json:async()=>({simulated:true,token:'proof',data:{ppbj_no:'<img onerror=alert(1)>',uraian:'Alat kerja tim'}})});await tick();
    assert.equal(f.get('practiceSummary').children[1].textContent,'<img onerror=alert(1)>');assert.equal(f.get('practiceResult').hidden,false);assert.equal(f.messages.filter(m=>m.data.type==='office-tutorial-document-complete').length,0);
    f.get('practiceReturn').events.click();assert.equal(f.messages.at(-1).data.value,'proof');assert.equal(f.messages.at(-1).data.channel,'4');assert.equal(f.messages.at(-1).origin,'https://office.test');assert.equal(f.timers.size,0);
});

test('failed validation and pagehide never report success and requests can be retried without overlap',async()=>{
    const f=fixture({kind:'pr'});f.submit();f.requests[0].resolve({ok:false,json:async()=>({errors:{tujuan_pengadaan:['Tujuan wajib diisi']}})});await tick();assert.match(f.get('practiceError').textContent,/Tujuan wajib/);assert.equal(f.get('practiceSubmit').disabled,false);
    f.get('practiceReturn').events.click();assert.equal(f.messages.some(m=>m.data.type==='office-tutorial-document-complete'),false);
    f.submit();f.events.pagehide();await tick();assert.equal(f.requests[1].options.signal.aborted,true);assert.equal(f.timers.size,0);
});

test('even a tampered form endpoint cannot send the simulation into the real PPBJ write route',async()=>{
    const f=fixture({endpoint:'/ppbj'});f.submit();assert.equal(f.requests.length,0);assert.match(f.get('practiceError').textContent,/tidak valid/);
});
