const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');

function fixture(kind,{oracle=false,hologram=false}={}){
    const source=fs.readFileSync(`public/assets/${kind}/${kind}.js`,'utf8'),nodes=new Map(),visits=[];let lock=null,dirty=0;
    const get=id=>{if(!nodes.has(id))nodes.set(id,{value:'',dataset:{},listeners:{},classList:{remove(){}},focus(){this.focused=true;},addEventListener(k,f){(this.listeners[k]??=[]).push(f);}});return nodes.get(id);};
    const ids=['searchInput','filterPic','dariInput','sampaiInput',...(kind==='spph'?['filterVendor']:[])],root=get('procurementFilters');
    root.querySelector=selector=>get(selector.slice(1));root.querySelectorAll=()=>ids.map(get);
    const origin='https://procurement.test',initial=hologram?`${origin}/virtual-office/hologram/${kind}?office_frame=17&page=8`:`${origin}/${kind}?page=8`,location={origin};let href=initial;
    Object.defineProperty(location,'href',{get:()=>new URL(href,origin).href,set:value=>{href=value;visits.push(value);}});
    class Clock extends Date{constructor(...args){super(...(args.length?args:['2028-02-29T12:00:00']));}}
    const context=vm.createContext({window:{location},document:{getElementById:get},URL,URLSearchParams,Date:Clock,ORACLE_MODE_SP:oracle});
    vm.runInContext(fs.readFileSync('public/assets/app/procurement-filters.js','utf8'),context);
    const names=[kind==='sp'?'getFilterParams':'getQS','doSearch','doExport','clearSearch','clearPic','clearDate','setQuickDate','resetFilters',...(kind==='spph'?['clearVendor']:[])];
    // Run the actual page helpers, not a second implementation of their behavior.
    for(const name of names){const start=source.indexOf(`function ${name}(`);assert.ok(start>=0,`Missing ${kind} handler ${name}`);const next=source.indexOf('\n        function ',start+1);vm.runInContext(source.slice(start,next<0?source.length:next),context);}
    context.window.ProcurementFilters.bind({apply:()=>context.doSearch(),lockedSearch:()=>lock});
    return{get,ids,context,visits,setLock:value=>lock=value,fill(){get('searchInput').value='  kursi & meja  ';get('filterPic').value='PIC A';get('dariInput').value='2028-02-01';get('sampaiInput').value='2028-02-29';if(kind==='spph')get('filterVendor').value='Vendor & Rekan';},query:()=>new URL(location.href).searchParams};
}

for(const kind of ['sp','spph']){
    test(`${kind}: Reset clears every filter and refreshes the first page exactly once`,()=>{
        const f=fixture(kind);f.fill();f.context.resetFilters();assert.deepEqual(f.visits,[`/${kind}`]);for(const id of f.ids)assert.equal(f.get(id).value,'');
    });
    test(`${kind}: removing a filter chip immediately refreshes the list and preserves the other criteria`,()=>{
        for(const [name,removed]of [['clearSearch',['search']],['clearPic',['pic']],['clearDate',['dari','sampai']],...(kind==='spph'?[['clearVendor',['vendor']]]:[])]){
            const f=fixture(kind);f.fill();f.context[name]();assert.equal(f.visits.length,1);const params=f.query();for(const key of removed)assert.equal(params.has(key),false);
            for(const key of ['search','pic','dari','sampai',...(kind==='spph'?['vendor']:[])].filter(key=>!removed.includes(key)))assert.equal(params.has(key),true,`${name} must preserve ${key}`);assert.equal(params.has('page'),false);
        }
    });
    test(`${kind}: quick dates handle leap day/month/year without an automatic request; Apply and Export use the selected values`,()=>{
        const f=fixture(kind);f.fill();f.context.setQuickDate('today');assert.equal(f.get('dariInput').value,'2028-02-29');assert.equal(f.get('sampaiInput').value,'2028-02-29');
        f.context.setQuickDate('month');assert.equal(f.get('dariInput').value,'2028-02-01');assert.equal(f.get('sampaiInput').value,'2028-02-29');
        f.context.setQuickDate('year');assert.equal(f.get('dariInput').value,'2028-01-01');assert.equal(f.get('sampaiInput').value,'2028-12-31');assert.equal(f.visits.length,0);
        f.context.window.ProcurementFilters.apply();assert.equal(f.visits.length,1);assert.equal(f.query().get('search'),'kursi & meja');assert.equal(f.query().get('pic'),'PIC A');if(kind==='spph')assert.equal(f.query().get('vendor'),'Vendor & Rekan');
        f.context.doExport();assert.equal(f.visits.length,2);assert.match(f.visits[1],new RegExp(`^/${kind}/export\\?`));assert.equal(f.query().get('dari'),'2028-01-01');
    });
    test(`${kind}: invalid date ranges block Apply and Export, while Reset still recovers`,()=>{
        const f=fixture(kind);f.fill();f.get('dariInput').value='2028-03-01';f.context.window.ProcurementFilters.apply();f.context.doExport();assert.equal(f.visits.length,0);assert.match(f.get('filterPendingHint').textContent,/Tanggal mulai/);f.context.resetFilters();assert.deepEqual(f.visits,[`/${kind}`]);
    });
    test(`${kind}: secure deletion locks Reset, clear, Apply and Export without changing filter values`,()=>{
        const f=fixture(kind);f.fill();f.setLock('original search');for(const name of ['resetFilters','clearSearch','clearPic','clearDate','doSearch','doExport',...(kind==='spph'?['clearVendor']:[])])f.context[name]();f.context.window.ProcurementFilters.apply();assert.equal(f.visits.length,0);assert.equal(f.get('searchInput').value,'  kursi & meja  ');assert.equal(f.get('filterPic').value,'PIC A');
    });
    test(`${kind}: hologram filtering/reset retains the current document and frame channel; Export keeps its real download route`,()=>{
        const f=fixture(kind,{hologram:true});f.fill();f.context.doSearch();assert.match(f.visits[0],new RegExp(`^/virtual-office/hologram/${kind}\\?`));assert.equal(f.query().get('office_frame'),'17');f.context.resetFilters();assert.equal(f.visits[1],`/virtual-office/hologram/${kind}?office_frame=17`);f.context.doExport();assert.equal(f.visits[2],`/${kind}/export`);
    });
}

test('SP Oracle Reset, Apply and Export retain Oracle mode while dropping pagination and filters',()=>{
    const f=fixture('sp',{oracle:true});f.fill();f.context.window.ProcurementFilters.apply();assert.equal(f.query().get('mode'),'oracle');f.context.resetFilters();assert.equal(f.visits[1],'/sp?mode=oracle');f.context.doExport();assert.equal(f.visits[2],'/sp/export?mode=oracle');
});
