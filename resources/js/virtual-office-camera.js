import * as THREE from 'three';

// Flush old drag/zoom inertia before a programmatic camera transition.
export function settleOfficeCamera(controls){const damping=controls.enableDamping;controls.enableDamping=false;controls.update?.();controls.enableDamping=damping;}

// Resolve obstruction for this draw only. OrbitControls retains the user's zoom,
// so passing a wall cannot progressively collapse the camera into the avatar.
export function officeCameraPosition(navigation,target,desired,extra=[],minimum=3.6,maximum=35){
    const offset=desired.clone().sub(target);if(!Number.isFinite(offset.lengthSq())||offset.lengthSq()<.001)offset.set(4,3,5);
    if(offset.length()<minimum||offset.length()>maximum)offset.setLength(THREE.MathUtils.clamp(offset.length(),minimum,maximum));
    const goal=target.clone().add(offset),fraction=navigation.cameraLimit(target,goal,extra);
    if(fraction>=1)return goal;
    if(fraction>=.72&&offset.length()*fraction>=minimum)return target.clone().addScaledVector(offset,fraction);
    // Prefer looking over nearby furniture/walls instead of moving inside a face.
    for(const height of[4.5,6,9]){
        const candidate=target.clone().add(new THREE.Vector3(offset.x*.4,height,offset.z*.4));
        candidate.sub(target).clampLength(minimum,maximum).add(target);
        if(navigation.cameraLimit(target,candidate,extra)>=.99)return candidate;
    }
    return target.clone().add(new THREE.Vector3(0,THREE.MathUtils.clamp(6,minimum,maximum),0));
}

// Smooth the obstruction offset, not OrbitControls' desired zoom. A short hold
// prevents alternating between overhead and shoulder views at a narrow doorway.
export function createOfficeCameraRig(){
    let offset=null,obstructed=false,clearFor=0,held=null;
    return{reset(){offset=null;held=null;obstructed=false;clearFor=0;},resolve(navigation,target,desired,extra=[],minimum=3.6,maximum=35,seconds=1/30){
        const dt=THREE.MathUtils.clamp(Number(seconds)||1/30,.001,.06),goal=officeCameraPosition(navigation,target,desired,extra,minimum,maximum),wanted=goal.sub(target),direct=desired.clone().sub(target).clampLength(minimum,maximum),blocked=wanted.distanceTo(direct)>.05;
        if(blocked){obstructed=true;clearFor=0;held=wanted.clone();}else if(obstructed){clearFor+=dt;if(clearFor<.35&&held)wanted.copy(held);else{obstructed=false;held=null;}}
        if(!offset)offset=wanted.clone();else{const delta=wanted.clone().sub(offset).multiplyScalar(1-Math.exp(-dt*7));delta.clampLength(0,Math.max(8,minimum*2)*dt);offset.add(delta);}
        offset.clampLength(minimum,maximum);return target.clone().add(offset);
    }};
}
