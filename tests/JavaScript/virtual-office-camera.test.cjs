const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const {pathToFileURL}=require('node:url');
test('a clear camera follows a full mouse orbit and zoom in the same frame without trailing motion',async()=>{
    const T=await import('three'),{createOfficeCameraRig}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),rig=createOfficeCameraRig(),target=new T.Vector3(0,1.3,0),nav={cameraLimit:()=>1};
    for(const desired of[new T.Vector3(4,4,5),new T.Vector3(-5,4,4),new T.Vector3(-9,7,-8),new T.Vector3(3,3,-4)]){assert.ok(rig.resolve(nav,target,desired,[],3.8,35,1/60).distanceTo(desired)<1e-10);assert.ok(rig.resolve(nav,target,desired,[],3.8,35,1/60).distanceTo(desired)<1e-10);}
});
test('narrow-space obstruction changes are damped without changing the requested orbit zoom',async()=>{
    const T=await import('three'),{createOfficeCameraRig}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),rig=createOfficeCameraRig(),target=new T.Vector3(0,1.3,0),desired=new T.Vector3(4,4,5),original=desired.clone();let blocked=false,previous=null;
    const nav={cameraLimit:(a,b)=>blocked&&b.y<6?.2:1};
    for(let i=0;i<240;i++){blocked=i>20&&i<160&&i%4!==0;const point=rig.resolve(nav,target,desired,[],3.8,35,1/30);if(previous)assert.ok(point.distanceTo(previous)<.31,'No instantaneous close-up when an obstacle appears/disappears.');assert.ok(point.distanceTo(target)>=3.7999);previous=point;assert.deepEqual(desired.toArray(),original.toArray());}
    assert.ok(previous.distanceTo(desired)<.01);rig.reset();assert.deepEqual(rig.resolve({cameraLimit:()=>1},target,desired).toArray(),desired.toArray());
});
test('camera obstruction never eats the chosen zoom and recovers its comfortable distance after passing a wall',async()=>{
    const T=await import('three'),{officeCameraPosition}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),{createOfficeNavigation}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-navigation.js')));
    const nav=createOfficeNavigation();nav.addBox(.2,12,0,0,'wall',3.5);const target=new T.Vector3(-.6,1.3,0),desired=new T.Vector3(5,4,7),copy=desired.clone();
    for(let i=0;i<500;i++){const result=officeCameraPosition(nav,target,desired,[],3.8);assert.ok(result.distanceTo(target)>=3.8-1e-9);assert.ok(result.toArray().every(Number.isFinite));assert.deepEqual(desired.toArray(),copy.toArray());}
    const clean=createOfficeNavigation();assert.deepEqual(officeCameraPosition(clean,target,desired).toArray(),desired.toArray());
    assert.ok(officeCameraPosition(clean,target,target.clone()).distanceTo(target)>=3.6);
    assert.ok(officeCameraPosition(clean,target,new T.Vector3(1000,1000,1000)).distanceTo(target)<=35.00001);
});

test('large obstacles and clearance recovery cannot rotate the camera away from mouse input',async()=>{
    const T=await import('three'),{createOfficeCameraRig}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),rig=createOfficeCameraRig(),target=new T.Vector3(0,5,0);
    let blocked=true;const nav={cameraLimit:()=>blocked?.01:1};
    for(let i=0;i<240;i++){
        blocked=i<120;const angle=i*.09,offset=new T.Vector3(Math.sin(angle)*15,4,Math.cos(angle)*15),desired=target.clone().add(offset),copy=desired.clone();
        const result=rig.resolve(nav,target,desired,[],5.1,55,1/60),actual=result.clone().sub(target);
        assert.ok(actual.clone().normalize().distanceTo(offset.clone().normalize())<1e-10,'Collision correction must preserve mouse azimuth and pitch, even in the recovery hold.');
        assert.ok(actual.length()>=5.1-1e-9);assert.deepEqual(desired.toArray(),copy.toArray());
    }
});

test('room obstruction keeps the chosen direction and responds immediately to wheel zoom',async()=>{
    const T=await import('three'),{createOfficeCameraRig}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),rig=createOfficeCameraRig(),target=new T.Vector3(3,1.2,-4),nav={cameraLimit:()=>0};
    const far=new T.Vector3(4,3,4).normalize().multiplyScalar(8),near=far.clone().setLength(2.6);
    for(let i=0;i<60;i++)rig.resolve(nav,target,target.clone().add(far),[],2.6,8,1/60);
    const actual=rig.resolve(nav,target,target.clone().add(near),[],2.6,8,1/60).sub(target);
    assert.ok(Math.abs(actual.length()-2.6)<1e-9);assert.ok(actual.normalize().distanceTo(near.normalize())<1e-10);
});

test('every obstruction fallback respects interior zoom bounds and clears old orbit inertia',async()=>{
    const T=await import('three'),{officeCameraPosition,settleOfficeCamera}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-camera.js'))),target=new T.Vector3(1,1,1);
    for(const limit of[()=>0,(a,b)=>b.y-a.y>7?1:0]){const result=officeCameraPosition({cameraLimit:limit},target,new T.Vector3(8,2,8),[],1.7,8);assert.ok(result.distanceTo(target)<=8.000001);assert.ok(result.distanceTo(target)>=1.7);}
    const {OrbitControls}=await import('three/addons/controls/OrbitControls.js'),camera=new T.PerspectiveCamera(44),controls=new OrbitControls(camera);camera.position.set(4,3,5);controls.enableDamping=true;controls.rotateLeft(.9);settleOfficeCamera(controls);
    controls.target.set(3,1,-5);camera.position.set(7,2,4);controls.update();const restored=camera.position.clone();for(let i=0;i<30;i++)controls.update();assert.ok(camera.position.distanceTo(restored)<.000001,'Old drag inertia cannot rotate a newly restored camera.');assert.equal(controls.enableDamping,true);
});
