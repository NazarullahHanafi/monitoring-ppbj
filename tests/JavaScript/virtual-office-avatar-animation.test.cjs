const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');
const load=()=>import(pathToFileURL(path.resolve('resources/js/virtual-office-avatar-animation.js')));
function actor(){const part=()=>({rotation:{x:0,y:0,z:0},position:{y:0}});return{body:part(),head:part(),legs:[part(),part()],arms:[part(),part()],eyes:[{scale:{y:1}}]};}
test('idle, sprint, jump and four rest poses have distinct finite transitions and can return to walking',async()=>{
    const {animateOfficeAvatar}=await load(),f=actor();animateOfficeAvatar(f,{action:'run'},{time:1,dt:.033});assert.ok(f.body.rotation.x>0);assert.notEqual(f.legs[0].rotation.x,f.legs[1].rotation.x);
    const previous=f.body.rotation.x;animateOfficeAvatar(f,{action:'rest',pose:'nap'},{time:2,dt:.033});assert.ok(f.body.rotation.x>-Math.PI/2&&f.body.rotation.x<previous,'Entering a rest pose must interpolate.');
    for(const pose of['sit','recline','nap','meditate']){for(let i=0;i<45;i++)animateOfficeAvatar(f,{action:'rest',pose},{time:2+i/30,dt:1/30});if(pose==='nap'){assert.ok(f.body.rotation.x<-1.55);assert.ok(f.eyes[0].scale.y<.2);}if(pose==='meditate')assert.notEqual(f.legs[0].rotation.z,f.legs[1].rotation.z);assert.ok(Number.isFinite(f.body.position.y));}
    for(let i=0;i<40;i++)animateOfficeAvatar(f,{action:'walk'},{time:4+i/30,dt:1/30});assert.ok(Math.abs(f.body.rotation.x)<.1);assert.ok(Math.abs(f.legs[0].rotation.z)<.001);
});
test('a lying avatar rotates into available space without changing its position',async()=>{const {restingHeading}=await load();const p={x:0,z:0,yaw:0};const nav={free:(x,z)=>z>-.4};const yaw=restingHeading(nav,p);assert.notEqual(yaw,null);assert.notEqual(yaw,0);assert.deepEqual(p,{x:0,z:0,yaw:0});assert.equal(restingHeading({free:()=>false},p),null);});
