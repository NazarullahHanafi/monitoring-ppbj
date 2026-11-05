const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');const load=n=>import(pathToFileURL(path.resolve('resources/js/'+n+'.js')));
test('closed doors, private ownership and furniture collision work across all residential rows',async()=>{
    const {homeLocation,homeBoxes}=await load('virtual-office-home-layout'),{createOfficeNavigation}=await load('virtual-office-navigation');const nav=createOfficeNavigation();nav.configureHomes(true);
    for(const slot of[0,7,16,127]){const h=homeLocation(slot),outside={x:h.x,z:h.z+5},inside={x:h.x,z:h.z+2.8};assert.equal(nav.segment(outside,inside),false);nav.configureHomes(true,slot);assert.equal(nav.segment(outside,inside),true);assert.equal(nav.free(h.x+2.8,h.z+2.45),false);nav.configureHomes(true);assert.ok(homeBoxes(outside,inside).length>=17);}
    const a=homeLocation(0),b=homeLocation(1);nav.configureHomes(true,0);assert.equal(nav.segment({x:b.x,z:b.z+5},{x:b.x,z:b.z+2.8}),false);assert.equal(nav.groundHeight({x:a.x,z:a.z+2.8}),.22);
    assert.ok(homeBoxes({x:0,z:20}).length===0,'Campus movement must not loop over the whole neighbourhood.');
});
test('sliding along a corner always produces a segment the authoritative server can accept',async()=>{
    const {createOfficeNavigation}=await load('virtual-office-navigation'),nav=createOfficeNavigation();nav.addBox(2,2,0,0);
    for(let i=0;i<100;i++){const a={x:-1.5+i*.001,z:-1.25},b={x:-1.2,z:-.7};const p=nav.slide(a,b);assert.equal(nav.segment(a,p),true);}
});
