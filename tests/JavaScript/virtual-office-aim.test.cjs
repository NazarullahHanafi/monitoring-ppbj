const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
test('mouse aiming follows pixels immediately, clamps vertical look, and never drifts after input stops',async()=>{
    const T=await import('three'),{createOfficeAim}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-aim.js'))),aim=createOfficeAim();
    aim.start(new T.Vector3(0,1.2,0),new T.Vector3(0,1.2,-10));assert.ok(aim.direction().distanceTo(new T.Vector3(0,0,-1))<1e-10);
    aim.move(100,-50);assert.ok(aim.direction().x>.2);assert.ok(aim.direction().y>.1);const heading=aim.direction().clone();for(let i=0;i<1000;i++)assert.deepEqual(aim.direction().toArray(),heading.toArray());
    aim.move(0,-100000);assert.equal(aim.pitch(),1.35);aim.move(0,100000);assert.equal(aim.pitch(),-1.35);const stable=aim.direction().clone();aim.move(NaN,20);assert.deepEqual(aim.direction().toArray(),stable.toArray());
});
