const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const {pathToFileURL}=require('node:url');
const motion=require('../../resources/data/virtual-office-motion.json');
async function simulation(latency){
    const {createPilotPhysics}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-pilot-physics.js'))),{createOfficeNavigation}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-navigation.js')));
    let clock=0,id=0,physics=null,inputs={},report=()=>{},server=null,active=0,maxActive=0,releases=0,rejected=0;
    const timers=new Map(),events={},nodes=new Map(),statuses=[],actions=[];const later=(fn,ms)=>{timers.set(++id,{at:clock+ms,fn});return id;};
    const node=key=>{if(!nodes.has(key))nodes.set(key,{addEventListener(){},value:0});return nodes.get(key);};
    const doc={hidden:false,activeElement:{tagName:'BUTTON'},getElementById:node,querySelector:s=>s.startsWith('meta')?{content:'csrf'}:null,querySelectorAll:()=>[],addEventListener:(k,f)=>events[k]=f};
    const scene={setPilotReporter:f=>report=f,setPilotGate(){},setPilotInput:v=>inputs=v,setPeerPilots(){},setHomeDoor(){},pilotState:()=>physics?.state(),setPilot(id,p){physics=createPilotPhysics(createOfficeNavigation(),p);},releasePilot(){releases++;},reconcilePilot(p){physics.reset(p);}};
    class FakeDate extends Date{static now(){return clock;}}
    const context={motion,Date:FakeDate,Blob,AbortController,crypto:require('node:crypto').webcrypto,setTimeout:later,clearTimeout:i=>timers.delete(i),fetch:(_url,options)=>new Promise((resolve,reject)=>{
        const data=JSON.parse(options.body);active++;maxActive=Math.max(maxActive,active);let done=false;
        const network=later(()=>{done=true;active--;let ok=true;
            if(data.mode==='claim')server={x:0,y:-.12,z:21,yaw:0,seq:0,updated:clock,credit:.7};
            else{const credit=Math.min(motion.distance_credit,server.credit+(clock-server.updated)/1000*motion.maximum_speed),distance=Math.hypot(data.x-server.x,data.z-server.z);if(distance>credit+.08){ok=false;rejected++;}else server={...data,credit:credit-distance,updated:clock};}
            resolve({ok,status:ok?200:422,json:async()=>({self:server,peers:[],message:'distance correction'})});
        },latency);
        options.signal.addEventListener('abort',()=>{if(!done){done=true;active--;timers.delete(network);reject(new Error('aborted'));}});
    })};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.resolve('resources/js/virtual-office-pilot.js'),'utf8').replace(/^import .*?;\s*/gm,'').replace('export function mountOfficePilot','function mountOfficePilot'),context);
    const pilot=context.mountOfficePilot({document:doc,window:{addEventListener(){},navigator:{sendBeacon(){}}},config:{canPilot:true,myId:1},visible:()=>true,getScene:()=>scene,onStatus:s=>statuses.push(s)});
    let nextFrame=0;async function advance(ms){const end=clock+ms;while(clock<end){clock+=10;for(const [key,t]of[...timers])if(t.at<=clock){timers.delete(key);t.fn();}await new Promise(setImmediate);if(clock>=nextFrame){nextFrame=clock+30;if(physics){const p=physics.step(.03,inputs);actions.push(p.action);report(p);}}}}
    pilot.start();await advance(latency+60);return{pilot,advance,actions,statuses,position:()=>physics.state(),keydown:code=>events.keydown({code,preventDefault(){}}),get maxActive(){return maxActive;},get rejected(){return rejected;},get releases(){return releases;}};
}
test('holding run remains continuous through 30–700 ms replies with real keyboard, sync timers and physics',async()=>{
    for(const latency of[30,150,400,700]){const f=await simulation(latency);f.keydown('KeyD');f.keydown('ShiftLeft');const start=f.actions.length;await f.advance(2500);assert.ok(f.position().x>21.5,`Run distance at ${latency} ms: ${f.position().x}`);assert.equal(f.actions.slice(start).filter(a=>a!=='run').length,0,`No periodic idle frames at ${latency} ms`);await f.advance(7000);assert.equal(f.actions.slice(start).filter(a=>a==='idle').length,0,'Stamina recovery must slow to a walk instead of stopping.');assert.ok(f.actions.slice(start).some(a=>a==='walk'));assert.equal(f.rejected,0);assert.equal(f.releases,0);assert.equal(f.maxActive,1);f.pilot.stop();await new Promise(setImmediate);}
});
test('a genuinely stalled connection pauses bounded prediction without returning the avatar to its desk',async()=>{const f=await simulation(2000);f.keydown('KeyD');f.keydown('ShiftLeft');await f.advance(1800);assert.ok(f.position().x<motion.distance_credit+.1);assert.equal(f.releases,0);assert.ok(f.statuses.some(s=>s.includes('Koneksi terlambat')));f.pilot.stop();await new Promise(setImmediate);});
