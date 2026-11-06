const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const tick=()=>new Promise(setImmediate);
test('a skill acknowledgement replaces the syncing message and a rejection never reports success',async()=>{
    const f=fixture();f.scene.castSkill=()=>({skill:'fireball',skill_id:'id',name:'Bola api'});f.pilot.start();f.accept();await tick();f.key('KeyR');let[id,t]=[...f.timers].find(([,v])=>v.delay===0);f.timers.delete(id);t.fn();f.accept(1);await tick();assert.equal(f.statuses.at(-1),'Bola api aktif.');f.key('KeyR');[id,t]=[...f.timers].find(([,v])=>v.delay===0);f.timers.delete(id);t.fn();f.requests[2].resolve({ok:false,status:422,json:async()=>({self:{x:0,y:-.12,z:21,yaw:0},message:'Koreksi jurus'})});await tick();assert.equal(f.statuses.at(-1),'Koreksi jurus');assert.equal(f.statuses.filter(s=>s==='Bola api aktif.').length,1);f.pilot.stop();
});
function fixture(){
    const timers=new Map(),requests=[],events={},windowEvents={},inputs=[],beacons=[],statuses=[],rests=[],syncs=[],flights=[],ends=[],nodes=new Map();let timerId=0,modal=false,show=true,sets=0,releases=0,corrections=[],gate;
    const node=id=>{if(!nodes.has(id))nodes.set(id,{events:{},addEventListener(k,f){this.events[k]=f;},value:0});return nodes.get(id);};
    const doc={hidden:false,activeElement:null,getElementById:node,querySelector:s=>s.startsWith('meta')?{content:'csrf'}:modal?{}:null,querySelectorAll:()=>[],addEventListener(k,f){events[k]=f;}};
    const win={addEventListener(k,f){windowEvents[k]=f;},navigator:{sendBeacon:(...v)=>beacons.push(v)}};
    const scene={syncPilot:v=>syncs.push(v),toggleFlight:()=>{flights.push(true);return 'fly';},endTransformation:()=>ends.push(true),setRestPose:p=>{rests.push(p);return true;},reconcilePilot:v=>corrections.push(v),setPilotInput:v=>inputs.push(v),setPilotReporter(){},setPilotGate:v=>{gate=v;},setPilot(){sets++;},releasePilot(){releases++;},pilotState:()=>({x:0,y:-.12,z:21,yaw:0,action:'idle'}),setPeerPilots(){},canInteract:()=>false,guideTo(){}};
    const context={motion:require('../../resources/data/virtual-office-motion.json'),crypto:require('node:crypto').webcrypto,Blob,AbortController,Date,fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),setTimeout:(fn,delay)=>{const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)};
    const code=fs.readFileSync(path.resolve(__dirname,'../../resources/js/virtual-office-pilot.js'),'utf8').replace(/^import .*?;\s*/gm,'').replace('export function mountOfficePilot','function mountOfficePilot');vm.createContext(context);vm.runInContext(code,context);
    const pilot=context.mountOfficePilot({document:doc,window:win,config:{canPilot:true,myId:1},visible:()=>show,getScene:()=>scene,onStatus:value=>statuses.push(value)});
    return {pilot,scene,doc,requests,inputs,statuses,beacons,rests,syncs,flights,ends,timers,corrections,get:node,get sets(){return sets;},get releases(){return releases;},get gate(){return gate;},modal(v){modal=v;},key(code,type='keydown'){let prevented=false;events[type]({code,preventDefault(){prevented=true;}});return prevented;},blur:()=>windowEvents.blur(),accept(i=0,self={x:0,y:-.12,z:21,yaw:0}){requests[i].resolve({ok:true,json:async()=>({self,peers:[]})});},pulse(){const [id,t]=[...timers].find(([,v])=>v.delay===1200);timers.delete(id);t.fn();}};
}
test('respawn clears old input and trails, retains the lease and acknowledges the new home position',async()=>{
    const f=fixture(),respawns=[];f.scene.respawnPilot=s=>{respawns.push(s);f.scene.pilotState=()=>s;};f.pilot.start();f.accept();await tick();f.key('KeyW');f.pulse();const home={x:-37.75,y:.22,z:-25.5,yaw:0,respawn_id:'test-home-stamp',action:'idle',hp:100};f.accept(1,home);await tick();assert.equal(respawns.length,1);assert.equal(f.inputs.at(-1).z,0);assert.equal(f.releases,0);assert.equal(f.sets,1);f.pulse();const packet=JSON.parse(f.requests[2].options.body);assert.equal(packet.respawn_id,home.respawn_id);assert.equal(packet.x,home.x);assert.equal(packet.trail.length,0);f.accept(2,home);await tick();assert.equal(respawns.length,1);f.pilot.stop();
});
test('keyboard ignores editors and modals, supports arrows/jump/boost, clears held keys on blur',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();assert.equal(f.sets,1);
    assert.equal(f.key('KeyW'),true);assert.equal(f.inputs.at(-1).z,1);f.key('ShiftLeft');f.key('Space');assert.equal(f.inputs.at(-1).boost,true);assert.equal(f.inputs.at(-1).jump,true);
    f.blur();assert.equal(f.inputs.at(-1).z,0);f.doc.activeElement={tagName:'TEXTAREA'};assert.equal(f.key('ArrowUp'),false);f.doc.activeElement=null;
    f.modal(true);assert.equal(f.gate(),true);assert.equal(f.key('KeyW'),false);f.modal(false);f.key('ArrowLeft');assert.equal(f.inputs.at(-1).x,-1);
    assert.equal(f.pilot.interact('archery'),false);f.pilot.stop();assert.equal(f.beacons.length,1);assert.equal(JSON.parse(await f.beacons[0][1].text())._token,'csrf');
});

test('opening a hologram clears held movement without releasing the avatar lease',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();f.key('KeyW');assert.equal(f.inputs.at(-1).z,1);f.modal(true);f.pilot.suspendInput();assert.equal(Object.keys(f.inputs.at(-1)).length,0);f.modal(false);f.key('ShiftLeft');assert.equal(f.inputs.at(-1).z,0);assert.equal(f.releases,0);f.pilot.stop();
});
test('sync is single-flight and a late response cannot resurrect stopped or restarted control',async()=>{
    const f=fixture();f.pilot.start();f.pilot.start();assert.equal(f.requests.length,1);f.accept();await tick();f.pulse();assert.equal(f.requests.length,2);
    const old=JSON.parse(f.requests[1].options.body).session_id;f.pilot.stop();assert.equal(f.requests[1].options.signal.aborted,true);f.pilot.start();assert.equal(f.requests.length,3);
    assert.notEqual(JSON.parse(f.requests[2].options.body).session_id,old);f.accept(1);await tick();assert.equal(f.sets,1);f.accept(2);await tick();assert.equal(f.sets,2);assert.equal([...f.timers.values()].filter(t=>t.delay===1200).length,1);f.pilot.stop();
});
test('the first walking frame accelerates idle sync before a legitimate sprint exhausts its distance credit',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();assert.equal([...f.timers.values()].filter(t=>t.delay===1200).length,1);
    f.pilot.state({x:0,y:-.12,z:20.7,yaw:0,action:'run',stamina:99});
    assert.equal([...f.timers.values()].filter(t=>t.delay===1200).length,0);assert.equal([...f.timers.values()].filter(t=>t.delay===150).length,1);f.pilot.stop();
});
test('a rejected movement reconciles the same avatar without releasing it to a computer or resetting the camera',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();f.pulse();const self={x:2,y:-.12,z:21,yaw:0,action:'idle'};
    f.requests[1].resolve({ok:false,status:422,json:async()=>({self,message:'Posisi dikoreksi'})});await tick();
    assert.equal(f.releases,0);assert.equal(f.sets,1);assert.equal(f.corrections.length,1);assert.equal(f.corrections[0].x,2);
    f.get('voPilotTakeControl').events.click();f.pulse();assert.equal(JSON.parse(f.requests[2].options.body).mode,'move');f.pilot.stop();
});
test('slow requests freeze prediction before the server distance allowance is exhausted',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();f.pulse();for(let i=1;i<=23;i++)f.pilot.state({x:i*.5,y:-.12,z:21,yaw:0,action:'run'});
    assert.equal(Object.keys(f.inputs.at(-1)).length,0);assert.equal(f.releases,0);assert.equal(f.requests.length,2);f.pilot.stop();
});
test('a rest request made before control is claimed is applied once after claim without a second click',async()=>{
    const f=fixture();f.get('voRestPose').value='nap';f.get('voRestStart').events.click();assert.equal(f.requests.length,1);f.accept();await tick();assert.equal(f.sets,1);assert.deepEqual(f.rests,['nap']);f.pulse();f.accept(1);await tick();assert.deepEqual(f.rests,['nap']);f.pilot.stop();
});
test('flight input respects modal focus, grants synchronize, and failed mode cancellation backs off',async()=>{
    const f=fixture();f.pilot.start();f.accept();await tick();assert.equal(f.syncs.length,1);assert.equal(f.key('KeyF'),true);assert.equal(f.flights.length,1);f.key('KeyC');assert.equal(f.inputs.at(-1).descend,true);f.key('KeyC','keyup');assert.equal(f.inputs.at(-1).descend,false);f.modal(true);assert.equal(f.key('KeyF'),false);assert.equal(f.flights.length,1);f.modal(false);
    f.get('voModeEnd').events.click();assert.equal(f.ends.length,1);const[id,timer]=[...f.timers].find(([,t])=>t.delay===0);f.timers.delete(id);timer.fn();assert.equal(JSON.parse(f.requests[1].options.body).end_form,true);
    f.requests[1].resolve({ok:false,status:422,json:async()=>({self:{x:0,y:-.12,z:21,yaw:0},message:'Koreksi'})});await tick();assert.ok([...f.timers.values()].some(t=>t.delay===1200));assert.ok(![...f.timers.values()].some(t=>t.delay===0),'A rejected cancellation must not spin requests.');f.pilot.stop();
});
