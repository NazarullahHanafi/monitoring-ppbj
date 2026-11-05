const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');
test('camera obstruction never eats the chosen zoom and recovers its comfortable distance after passing a wall',async()=>{
    const T=await import('three'),{officeCameraPosition}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),{createOfficeNavigation}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-navigation.js')));
    const nav=createOfficeNavigation();nav.addBox(.2,12,0,0,'wall',3.5);const target=new T.Vector3(-.6,1.3,0),desired=new T.Vector3(5,4,7),copy=desired.clone();
    for(let i=0;i<500;i++){const result=officeCameraPosition(nav,target,desired,[],3.8);assert.ok(result.distanceTo(target)>=3.8);assert.ok(result.toArray().every(Number.isFinite));assert.deepEqual(desired.toArray(),copy.toArray());}
    const clean=createOfficeNavigation();assert.deepEqual(officeCameraPosition(clean,target,desired).toArray(),desired.toArray());
    assert.ok(officeCameraPosition(clean,target,target.clone()).distanceTo(target)>=3.6);
    assert.ok(officeCameraPosition(clean,target,new T.Vector3(1000,1000,1000)).distanceTo(target)<=35.00001);
});
