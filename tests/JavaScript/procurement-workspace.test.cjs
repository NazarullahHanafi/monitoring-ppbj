const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../../public/assets/app/procurement-workspace.js'),'utf8');

function simpleElement() {
    return {dataset:{},children:[],classes:new Set(),innerHTML:'',textContent:'',disabled:false,isConnected:true,
        classList:{toggle(name,hide){if(hide) this.owner.classes.add(name); else this.owner.classes.delete(name);}},
        setAttribute(){},querySelector(){return this.children.find(child=>child.dataset?.wsDetail);},
        appendChild(child){const existing=this.children.indexOf(child);if(existing>=0)this.children.splice(existing,1);this.children.push(child);},
    };
}
function element() { const el=simpleElement(); el.classList.owner=el; return el; }
function baseContext(extra = {}) {
    const window={},events={};
    const document={addEventListener:(type,fn)=>{(events[type] ||= []).push(fn);},getElementById:()=>null,createElement:()=>element()};
    const context={window,document,URL,URLSearchParams,Intl,AbortController,location:{origin:'https://simon.example',search:''},...extra};
    vm.runInNewContext(source,context);
    return {context,window,events};
}
test('favorite URLs allow only known page filters, encode values and preserve multi-selection',()=>{
    const {window}=baseContext();
    const url=window.ProcurementWorkspaceUI.favoriteUrl('ppbj',{search:'kursi & meja',buyer:['Nazar','Yoga'],redirect:'https://evil.example',page:'99'},['search','buyer']);
    const parsed=new URL(url,'https://simon.example');
    assert.equal(parsed.pathname,'/ppbj'); assert.equal(parsed.searchParams.get('search'),'kursi & meja');
    assert.deepEqual(parsed.searchParams.getAll('buyer[]'),['Nazar','Yoga']);
    assert.equal(parsed.searchParams.has('redirect'),false); assert.equal(parsed.searchParams.has('page'),false);
});
test('table layout is local DOM work, stable on repeat, protects key columns and handles newly polled rows',()=>{
    const {window}=baseContext();
    const head={rows:[]},tbody={rows:[]},table={tHead:head,tBodies:[tbody],dataset:{}};
    function row(parent,id) {
        const row=element();row.parentElement=parent;row.dataset.id=id;
        row.children=[element(),element(),element(),element()];
        row.children.forEach(cell=>cell.colSpan=1);parent.rows.push(row);return row;
    }
    const header=row(head),first=row(tbody,'12');
    const empty=element();empty.children=[{colSpan:4}];tbody.rows.push(empty);
    const columns={number:'Nomor',description:'Uraian',vendor:'Vendor',actions:'Aksi'};
    const layout={visible:['number','description','actions'],order:['number','vendor','description','actions'],density:'compact'};
    const apply=()=>window.ProcurementWorkspaceUI.applyLayout(table,columns,layout,'sp');
    apply();apply();
    assert.deepEqual(first.children.map(cell=>cell.dataset.wsColumn),layout.order);
    assert.ok(first.children[1].classes.has('ws-column-hidden'));
    assert.equal(first.children[0].children.length,1);assert.equal(header.children[0].children.length,0);
    const added=row(tbody,'13');apply();assert.equal(added.children[0].children[0].dataset.wsDetail,'13');
    assert.equal(table.dataset.wsDensity,'compact');
    layout.visible=[];apply();assert.equal(first.children[0].classes.has('ws-column-hidden'),false);
    assert.equal(first.children[3].classes.has('ws-column-hidden'),false);
});

function runtime() {
    const requests=[],handlers={},window={};
    const config={page:'sp',columns:{number:'Nomor',description:'Uraian',actions:'Aksi'},filterKeys:['search'],saveUrl:'/procurement-workspace/sp',
        state:{version:0,settings:{layout:{visible:['number','description','actions'],order:['number','description','actions'],density:'comfortable'},favorites:[]}}};
    const status=element(),body=element(),title=element(),close=element();
    const dialog={...element(),open:false,querySelector:()=>close,querySelectorAll:()=>[],showModal(){this.open=true;},
        addEventListener:(type,fn)=>handlers[type]=fn,close(){this.open=false;handlers.close?.();}};
    const nodes={wsConfig:{textContent:JSON.stringify(config)},wsDialog:dialog,wsStatus:status,wsBody:body,wsDialogTitle:title};
    const events={};
    const document={activeElement:{isConnected:true,focus(){}},getElementById:id=>nodes[id],querySelector:()=>null,
        createElement:()=>element(),addEventListener:(type,fn)=>{(events[type] ||= []).push(fn);}};
    vm.runInNewContext(source,{window,document,URL,URLSearchParams,Intl,AbortController,
        location:{origin:'https://simon.example',search:'?search=kursi'},
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),
    });
    events.DOMContentLoaded[0]();
    const click=dataset=>{
        const button={dataset,hasAttribute:name=>name==='data-ws-detail' && !!dataset.wsDetail};
        return events.click[0]({target:{closest:()=>button},preventDefault(){}});
    };
    return {requests,dialog,body,status,click};
}
const response=data=>({ok:true,json:async()=>data});
const detail=number=>({kind:'sp',number,title:'<img src=x onerror=alert(1)>',cache_seconds:20,fields:[{label:'Uraian',value:'<script>bad()</script>'}],items:[],prs:[]});
test('opening workspace adds no request; quick detail is fetched only on click and HTML is escaped',async()=>{
    const h=runtime();assert.equal(h.requests.length,0);
    await h.click({wsDetail:'1',wsKind:'sp'});
    assert.equal(h.requests.length,1);assert.equal(h.requests[0].url,'/procurement-quick-detail/sp/1');
    h.requests[0].resolve(response(detail('SP-1')));
    await new Promise(setImmediate);
    assert.match(h.body.innerHTML,/&lt;img/);assert.doesNotMatch(h.body.innerHTML,/<script>/);
    assert.equal(h.requests[0].options.cache,'no-store');
});
test('new detail aborts old request and stale response never overwrites the new panel',async()=>{
    const h=runtime();await h.click({wsDetail:'1',wsKind:'sp'});await h.click({wsDetail:'2',wsKind:'sp'});
    assert.equal(h.requests[0].options.signal.aborted,true);
    h.requests[1].resolve(response(detail('SP-2')));await new Promise(setImmediate);
    h.requests[0].resolve(response(detail('SP-1')));await new Promise(setImmediate);
    assert.match(h.body.innerHTML,/SP-2/);assert.doesNotMatch(h.body.innerHTML,/SP-1/);
});
test('closing panel aborts fetch and no longer renders the response',async()=>{
    const h=runtime();await h.click({wsDetail:'1',wsKind:'sp'});h.dialog.close();
    assert.equal(h.requests[0].options.signal.aborted,true);
    h.requests[0].resolve(response(detail('SHOULD-NOT-RENDER')));await new Promise(setImmediate);
    assert.doesNotMatch(h.body.innerHTML,/SHOULD-NOT-RENDER/);
});
test('observer watches row inserts only; new feature never polls or uses persistent browser storage',()=>{
    assert.ok(source.includes('.observe(table.tBodies[0],{childList:true})'));
    assert.doesNotMatch(source,/setInterval|localStorage|sessionStorage/);
});
