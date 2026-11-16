const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/app/ppbj-report.js','utf8');
const methods=source.slice(source.indexOf('    function localUrl('),source.indexOf('    async function loadReport('));
function payload(total=1,page=1,per_page=50) {
    const length=Math.min(per_page,Math.max(0,total-(page-1)*per_page));
    return {data:Array.from({length},()=>({ppbj_no:'PR'})),pagination:{page,per_page,total,last_page:Math.max(1,Math.ceil(total/per_page)),from:length?(page-1)*per_page+1:null,to:length?(page-1)*per_page+length:null},
        stats:{total,on_track:0,warning:0,overdue:0,cancelled:0,total_portofolio:0,total_vendor:0,total_value:0,total_sp_value:0,total_bpg_value:0,avg_progress:0},breakdown:{portofolio:[],vendor:[]}};
}
const reply=(data,status=200)=>({ok:status<400,status,headers:{get:()=> 'application/json'},json:async()=>data});
function harness(fetch) {
    const timers=new Map();let serial=0;
    const context={URL,AbortController,DOMException,window:{location:{href:'https://fixture.test/ppbj/report',origin:'https://fixture.test'}},fetch,setTimeout:fn=>{timers.set(++serial,fn);return serial;},clearTimeout:id=>timers.delete(id)};
    vm.createContext(context);vm.runInContext(methods,context);
    return {...context,timers};
}
test('report pagination accepts empty pages and every bounded supported page size',()=>{
    const h=harness();for(const perPage of [25,50,100])for(const total of [0,1,perPage,perPage+1]) {
        const data=payload(total,1,perPage);assert.equal(h.validateResult(data),data);
        if(total>perPage)assert.equal(h.validateResult(payload(total,2,perPage)).data.length,1);
    }
});
test('report pagination rejects missing truncated inconsistent or oversized responses',()=>{
    const h=harness();for(const change of [data=>delete data.pagination,data=>data.data.pop(),data=>data.pagination.total++,data=>data.pagination.from=999,data=>data.pagination.per_page=1000,
        data=>data.breakdown.vendor=Array(21).fill({}),data=>data.data[0]=null,data=>data.stats.total_value='private SQL',data=>delete data.stats.on_track]) {
        const data=payload();change(data);assert.throws(()=>h.validateResult(data),/belum lengkap/);
    }
});
test('report reads explicitly avoid browser cache and use private same-origin credentials',async()=>{
    let options;const h=harness(async(url,input)=>{options=input;return reply(payload());});
    const result=await h.requestReport('/data',new AbortController());assert.equal(result.stats.total,1);assert.equal(options.credentials,'same-origin');assert.equal(options.cache,'no-store');assert.equal(options.headers.Accept,'application/json');assert.equal(h.timers.size,0);
});
test('report timeout includes a stalled JSON body and never automatically retries',async()=>{
    let calls=0;const h=harness(async()=>{calls++;return {...reply({}),json:()=>new Promise(()=>{})};});
    const controller=new AbortController(),pending=h.requestReport('/data',controller);for(let i=0;i<10;i++)await Promise.resolve();[...h.timers.values()][0]();
    await assert.rejects(pending,/belum selesai/);assert.equal(controller.signal.aborted,true);assert.equal(calls,1);assert.equal(h.timers.size,0);
});
test('report cancellation rejects unfinished reads and pre-aborted reads never call transport',async()=>{
    let calls=0;const h=harness(()=>{calls++;return new Promise(()=>{});}),controller=new AbortController();
    const pending=h.requestReport('/data',controller);controller.abort();await assert.rejects(pending,error=>error.name==='AbortError');
    await assert.rejects(h.requestReport('/data',controller),error=>error.name==='AbortError');assert.equal(calls,1);assert.equal(h.timers.size,0);
});
test('report errors describe access expiry validation and limits without exposing server diagnostics',async()=>{
    for(const [status,pattern] of [[401,/Sesi berakhir/],[403,/izin/],[419,/Sesi berakhir/],[422,/Filter laporan/],[429,/Tunggu/],[500,/belum dapat dibaca/]]) {
        const h=harness(async()=>reply({message:'SQL private detail',errors:{start_date:['Tanggal salah']}},status));
        await assert.rejects(h.requestReport('/data',new AbortController()),error=>pattern.test(error.message)&&!error.message.includes('SQL')&&(status!==422||error.fields.start_date[0]==='Tanggal salah'));
    }
});
test('report refuses login HTML redirects malformed JSON and external destinations',async()=>{
    for(const response of [{...reply({}),headers:{get:()=> 'text/html'}},{...reply({}),redirected:true},{...reply({}),json:async()=>{throw Error('malformed');}}]) {
        await assert.rejects(harness(async()=>response).requestReport('/data',new AbortController()),/belum dapat diverifikasi|belum lengkap/);
    }
    const h=harness();assert.throws(()=>h.localUrl('https://untrusted.test/data',new URLSearchParams()),/Tujuan laporan/);
    assert.equal(h.localUrl('/export',new URLSearchParams({'vendor[]':'PT Audit, Indonesia'})),'https://fixture.test/export?vendor%5B%5D=PT+Audit%2C+Indonesia');
});
test('report local date follows the application timezone around UTC midnight',()=>{
    const today=source.slice(source.indexOf('    function today('),source.indexOf('    function configurePeriod('));
    const context={root:{dataset:{timezone:'Asia/Jakarta'}},Intl,Date:class extends Date {constructor(){super('2026-11-15T18:01:00Z');}}};vm.createContext(context);vm.runInContext(today,context);assert.equal(context.today(),'2026-11-16');
});
