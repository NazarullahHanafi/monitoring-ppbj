const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const{pathToFileURL}=require('node:url');
const load=()=>import(pathToFileURL(path.resolve('resources/js/virtual-office-tutorial.js'))),tick=()=>new Promise(setImmediate);

async function fixture({step=0,replay=false,fail=false}={}){
    const {mountOfficeTutorial}=await load(),nodes=new Map(),requests=[],visits=[],calls=[],events={},timers=new Map();let id=0,position=null,serverStep=step,shouldFail=fail;
    class Node{constructor(){this.events={};this.hidden=false;this.textContent='';const values=new Set();this.classList={add:v=>values.add(v),remove:v=>values.delete(v),toggle:(v,b)=>b?values.add(v):values.delete(v),contains:v=>values.has(v)};}addEventListener(k,f){this.events[k]=f;}setAttribute(k,v){this[k]=v;}click(){if(!this.disabled)return this.events.click?.();}}
    const get=id=>{if(!nodes.has(id))nodes.set(id,new Node());return nodes.get(id);};
    const config={active:true,replay,step,startUrl:'/virtual-office/tutorial/start',advanceUrl:'/virtual-office/tutorial',steps:['control','move','avatar','camera','hologram','document','finish'].map(id=>({id,title:id,body:'Try '+id,action:id,target:'voScene'}))};
    const doc={getElementById:get,querySelector:()=>({content:'csrf'})},win={location:{origin:'https://office.test',assign:v=>visits.push(v)},setTimeout:(fn,delay)=>{timers.set(++id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),addEventListener:(k,f)=>events[k]=f};
    const previous=global.fetch;global.fetch=async(url,options)=>{const body=JSON.parse(options.body);requests.push({url,body,options});if(url.endsWith('/start'))return{ok:true,json:async()=>({...config,step:serverStep})};if(shouldFail){shouldFail=false;return{ok:false,json:async()=>({message:'Network retry'})};}serverStep++;return{ok:true,json:async()=>({step:serverStep,completed:serverStep===7})};};
    const scene={pilotState:()=>position};const api=mountOfficeTutorial({document:doc,window:win,config,getScene:()=>scene,actions:Object.fromEntries(['focus','immerse','avatar','hologram','closeWork'].map(k=>[k,()=>calls.push(k)]))});
    return{api,get,requests,visits,calls,events,timers,setPosition:v=>position=v,restore:()=>{global.fetch=previous;},async begin(){get('voTutorialAction').click();await tick();},async pose(v){position=v;api.pose(v);await tick();}};
}

test('practice follows real physics: control, walking and a jump are required before outfit editing',async()=>{
    const f=await fixture();try{
        await f.begin();assert.equal(f.requests.length,1,'Starting alone cannot complete control before a pilot exists.');
        const {createPilotPhysics}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-pilot-physics.js'))),{createOfficeNavigation}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-navigation.js'))),physics=createPilotPhysics(createOfficeNavigation(),{x:0,y:-.12,z:21});
        await f.pose(physics.state());assert.equal(f.api.current().step,1);await f.pose(physics.state());
        for(let i=0;i<30;i++)await f.pose(physics.step(.03,{x:1,z:0}));
        assert.equal(f.api.current().step,1,'Walking without jumping is incomplete.');assert.match(f.get('voTutorialTasks').textContent,/✓ Berjalan/);
        for(let i=0;i<10;i++)await f.pose(physics.step(.03,{jump:true}));
        assert.equal(f.api.current().step,2);assert.equal(f.requests.filter(r=>r.body.evidence?.event==='move').length,1);
        f.get('voTutorialAction').click();assert.ok(f.calls.includes('avatar'));f.api.avatar(false);await tick();assert.equal(f.api.current().step,2);
        f.api.avatar(true);await tick();assert.equal(f.api.current().step,3);
    }finally{f.restore();}
});

test('camera requires both real rotation and zoom, and opening the hologram cannot complete its form',async()=>{
    const f=await fixture({step:3});try{
        await f.begin();f.api.camera({orbit:.3,zoom:0});await tick();assert.equal(f.api.current().step,3);
        f.api.camera({orbit:0,zoom:.2});await tick();assert.equal(f.api.current().step,4);
        f.get('voTutorialAction').click();assert.ok(f.calls.includes('hologram'));assert.equal(f.api.current().step,4);
        f.api.hologram();await tick();assert.equal(f.api.current().step,5);f.get('voTutorialAction').click();assert.equal(f.api.current().step,5);
        f.api.document('signed-training-proof');await tick();assert.equal(f.api.current().step,6);assert.ok(f.calls.includes('closeWork'));
        f.get('voTutorialAction').click();await tick();assert.deepEqual(f.visits,['/virtual-office']);assert.equal(f.timers.size,0);
    }finally{f.restore();}
});

test('a failed progress save is retried once with the same evidence and no duplicate request or timer',async()=>{
    const f=await fixture({step:4,fail:true});try{
        await f.begin();f.api.hologram();f.api.hologram();await tick();assert.equal(f.requests.length,2);assert.equal(f.api.current().step,4);assert.match(f.get('voTutorialStatus').textContent,/Network retry/);
        f.get('voTutorialAction').click();await tick();assert.equal(f.api.current().step,5);assert.deepEqual(f.requests[1].body,f.requests[2].body);assert.equal(f.timers.size,0);
        f.get('voTutorialFold').click();assert.equal(f.get('voTutorialContent').hidden,true);f.get('voTutorialFold').click();assert.equal(f.get('voTutorialContent').hidden,false);
        f.events.pagehide();f.api.document('late');await tick();assert.equal(f.requests.length,3);
    }finally{f.restore();}
});

test('manual replay exercises the same actions but never posts completion or resets account progress',async()=>{
    const f=await fixture({replay:true});try{
        f.setPosition({x:0,y:-.12,z:21,action:'idle'});await f.begin();assert.equal(f.api.current().step,1);
        await f.pose({x:0,y:-.12,z:21,action:'walk'});for(let i=1;i<8;i++)await f.pose({x:i*.5,y:-.12,z:21,action:'walk'});await f.pose({x:3.5,y:.6,z:21,action:'jump'});
        f.api.avatar(true);await tick();f.api.camera({orbit:.3,zoom:.2});await tick();f.api.hologram();await tick();f.api.document('replay-proof');await tick();f.get('voTutorialAction').click();await tick();
        assert.equal(f.requests.length,1,'Replay only initializes; no lifetime progress mutation requests.');assert.deepEqual(f.visits,['/virtual-office']);
    }finally{f.restore();}
});

test('teleports, idle drift and stationary keyboard attempts are not walking practice',async()=>{
    const {createOfficePracticeTracker}=await load(),tracker=createOfficePracticeTracker();
    tracker.pose({x:0,y:-.12,z:0,action:'idle'});tracker.pose({x:80,y:-.12,z:0,action:'walk'});
    for(let i=0;i<20;i++)tracker.pose({x:80+i*.1,y:-.12,z:0,action:'idle'});
    tracker.pose({x:82,y:.5,z:0,action:'jump'});assert.equal(tracker.ready('move'),false);assert.ok(tracker.evidence('move').distance<3);
});
