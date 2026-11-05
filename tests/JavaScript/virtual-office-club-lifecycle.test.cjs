const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');
const load=n=>import(pathToFileURL(path.resolve('resources/js/'+n+'.js')));
async function fixture(delayed=false){
    const {mountOfficeClub}=await load('virtual-office-club'),module=await load('virtual-office-play'),nodes=new Map(),frames=new Map(),states=[];let id=0,arena,imports=0,resolve;
    const ctx=new Proxy({},{get:(o,k)=>o[k]||(()=>{}),set:(o,k,v)=>(o[k]=v,true)});
    class Element{constructor(){this.events={};this.children=[];this.value='';this.hidden=true;this.dataset={};this.selectedOptions=[{textContent:'Bar'}];}addEventListener(k,f){this.events[k]=f;}removeEventListener(k){delete this.events[k];}replaceChildren(...c){this.children=c;}append(...c){this.children.push(...c);}setAttribute(){}focus(){}querySelectorAll(){return [];}getContext(){return ctx;}getBoundingClientRect(){return{left:0,top:0,width:800,height:480};}click(){this.events.click?.({});}}
    const get=k=>{if(!nodes.has(k))nodes.set(k,new Element());return nodes.get(k);};for(const key of['voGameAim','voGameRacket','voGamePower'])get(key).value='50';
    const doc={getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>[],querySelector:s=>s.startsWith('meta')?{content:'csrf'}:get('toolbar')};
    const gate=delayed?new Promise(r=>resolve=r):Promise.resolve();
    const club=mountOfficeClub({document:doc,config:{myId:1,canMeet:true},visible:()=>true,getPeople:()=>[],getScene:()=>({setGame:g=>states.push(g)}),requireVenue:()=>true,loadPlay:async()=>{imports++;await gate;return{...module,createOfficePlay:options=>(arena=module.createOfficePlay({...options,raf:fn=>{frames.set(++id,fn);return id;},caf:i=>frames.delete(i)}))};}});
    return{club,get,frames,states,resolve,get imports(){return imports;},arena:()=>arena,draw(now){const [key,fn]=frames.entries().next().value;frames.delete(key);fn(now);},cleanup(){club.stop();arena?.dispose();}};
}
test('real arenas animate after close and reopen, and after switching between all thirteen games',async()=>{
    const f=await fixture();try{await f.club.openGame('archery');assert.equal(f.frames.size,1);await f.get('voGameAction').events.click();f.draw(100);f.draw(150);const x=f.arena().state().ball.x;assert.ok(x>90);
        f.get('voCloseClub').click();assert.equal(f.frames.size,0);await f.club.openGame('archery');assert.equal(f.frames.size,1);await f.get('voGameAction').events.click();f.draw(200);f.draw(250);assert.ok(f.arena().state().ball.x>90,'Reopened arena must advance, not just redraw a still frame.');
        for(const kind of['badminton','tennis','pingpong','foosball','basketball','billiards','golf','bowling','darts','arcade','uno','chess']){await f.club.openGame(kind);assert.equal(f.arena().kind(),kind);assert.equal(f.frames.size,1);assert.equal(f.states.at(-1).kind,kind);f.get('voCloseClub').click();assert.equal(f.frames.size,0);}assert.equal(f.imports,1);
    }finally{f.cleanup();}
});
test('closing or choosing another game during loading cannot activate a stale arena',async()=>{
    const f=await fixture(true);try{const first=f.club.openGame('archery');f.get('voCloseClub').click();const second=f.club.openGame('bowling');f.resolve();assert.equal(await first,false);assert.equal(await second,true);assert.equal(f.arena().kind(),'bowling');assert.equal(f.frames.size,1);assert.deepEqual(f.states.map(g=>g.kind),['bowling']);}finally{f.cleanup();}
});
