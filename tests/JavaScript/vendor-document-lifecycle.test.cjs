const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/vendor/documents.js','utf8').replace(/\r\n/g,'\n');
const requestSource=source.slice(source.indexOf('    async function request('),source.indexOf('    function validDocument('));
const tick=()=>new Promise(setImmediate);
function runtime(){
    const calls=[],timers=new Map();let serial=0;
    const request=vm.runInNewContext('('+requestSource.trim()+')',{AbortController,DOMException,config:{csrf:'synthetic-csrf'},
        setTimeout:(fn,delay)=>{const id=++serial;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),
        fetch:(url,options)=>new Promise(resolve=>calls.push({url,options,resolve}))});
    return{request,calls,timers,respond:(i,data,extra={})=>calls[i].resolve({ok:true,headers:{get:()=> 'application/json'},json:async()=>data,...extra})};
}

test('vendor document cancellation settles even when fetch or body ignores its signal',async()=>{
    for(const body of [false,true]){
        const h=runtime(),controller=new AbortController(),task=h.request('/vendors/1/documents',{signal:controller.signal});
        if(body){h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();}
        controller.abort();await assert.rejects(task,{name:'AbortError'});assert.equal(h.calls[0].options.signal.aborted,true);assert.equal(h.timers.size,0);
    }
});

test('already cancelled vendor reads do not start network work',async()=>{
    const h=runtime(),controller=new AbortController();controller.abort();await assert.rejects(h.request('/vendors/1/documents',{signal:controller.signal}),{name:'AbortError'});assert.equal(h.calls.length,0);assert.equal(h.timers.size,0);
});

test('vendor response body deadline remains a timeout rather than a silent AbortError',async()=>{
    const h=runtime(),task=h.request('/vendors/1/documents');h.respond(0,null,{json:()=>new Promise(()=>{})});await tick();
    const timer=[...h.timers.values()][0];assert.equal(timer.delay,30000);timer.fn();await assert.rejects(task,/Respons server terlalu lama/);assert.equal(h.calls[0].options.signal.aborted,true);assert.equal(h.timers.size,0);
});

test('writes retain CSRF and same-origin credentials; successful JSON parsing releases request timers',async()=>{
    const h=runtime(),task=h.request('/vendors/1/documents',{method:'POST',body:'synthetic'});assert.equal(h.calls[0].options.headers['X-CSRF-TOKEN'],'synthetic-csrf');assert.equal(h.calls[0].options.credentials,'same-origin');
    h.respond(0,{queued:true});assert.equal((await task).queued,true);assert.equal(h.timers.size,0);
});
