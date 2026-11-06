const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');
test('narrow-space obstruction changes are damped without changing the requested orbit zoom',async()=>{
    const T=await import('three'),{createOfficeCameraRig}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),rig=createOfficeCameraRig(),target=new T.Vector3(0,1.3,0),desired=new T.Vector3(4,4,5),original=desired.clone();let blocked=false,previous=null;
    const nav={cameraLimit:(a,b)=>blocked&&b.y<6?.2:1};
    for(let i=0;i<240;i++){blocked=i>20&&i<160&&i%4!==0;const point=rig.resolve(nav,target,desired,[],3.8,35,1/30);if(previous)assert.ok(point.distanceTo(previous)<.31,'No instantaneous close-up when an obstacle appears/disappears.');assert.ok(point.distanceTo(target)>=3.7999);previous=point;assert.deepEqual(desired.toArray(),original.toArray());}
    assert.ok(previous.distanceTo(desired)<.01);rig.reset();assert.deepEqual(rig.resolve({cameraLimit:()=>1},target,desired).toArray(),desired.toArray());
});
test('camera obstruction never eats the chosen zoom and recovers its comfortable distance after passing a wall',async()=>{
    const T=await import('three'),{officeCameraPosition}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),{createOfficeNavigation}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-navigation.js')));
    const nav=createOfficeNavigation();nav.addBox(.2,12,0,0,'wall',3.5);const target=new T.Vector3(-.6,1.3,0),desired=new T.Vector3(5,4,7),copy=desired.clone();
    for(let i=0;i<500;i++){const result=officeCameraPosition(nav,target,desired,[],3.8);assert.ok(result.distanceTo(target)>=3.8);assert.ok(result.toArray().every(Number.isFinite));assert.deepEqual(desired.toArray(),copy.toArray());}
    const clean=createOfficeNavigation();assert.deepEqual(officeCameraPosition(clean,target,desired).toArray(),desired.toArray());
    assert.ok(officeCameraPosition(clean,target,target.clone()).distanceTo(target)>=3.6);
    assert.ok(officeCameraPosition(clean,target,new T.Vector3(1000,1000,1000)).distanceTo(target)<=35.00001);
});

test('every obstruction fallback respects interior zoom bounds and clears old orbit inertia',async()=>{
    const T=await import('three'),{officeCameraPosition,settleOfficeCamera}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),target=new T.Vector3(1,1,1);
    for(const limit of[()=>0,(a,b)=>b.y-a.y>7?1:0]){const result=officeCameraPosition({cameraLimit:limit},target,new T.Vector3(8,2,8),[],1.7,8);assert.ok(result.distanceTo(target)<=8.000001);assert.ok(result.distanceTo(target)>=1.7);}
    const {OrbitControls}=await import('three/addons/controls/OrbitControls.js'),camera=new T.PerspectiveCamera(44),controls=new OrbitControls(camera);camera.position.set(4,3,5);controls.enableDamping=true;controls.rotateLeft(.9);settleOfficeCamera(controls);
    controls.target.set(3,1,-5);camera.position.set(7,2,4);controls.update();const restored=camera.position.clone();for(let i=0;i<30;i++)controls.update();assert.ok(camera.position.distanceTo(restored)<.000001,'Old drag inertia cannot rotate a newly restored camera.');assert.equal(controls.enableDamping,true);
});
