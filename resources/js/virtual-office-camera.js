import * as THREE from 'three';

// Resolve obstruction for this draw only. OrbitControls retains the user's zoom,
// so passing a wall cannot progressively collapse the camera into the avatar.
export function officeCameraPosition(navigation,target,desired,extra=[],minimum=3.6,maximum=35){
    const offset=desired.clone().sub(target);if(!Number.isFinite(offset.lengthSq())||offset.lengthSq()<.001)offset.set(4,3,5);
    if(offset.length()<minimum||offset.length()>maximum)offset.setLength(THREE.MathUtils.clamp(offset.length(),minimum,maximum));
    const goal=target.clone().add(offset),fraction=navigation.cameraLimit(target,goal,extra);
    if(fraction>=1)return goal;
    if(offset.length()*fraction>=minimum)return target.clone().addScaledVector(offset,fraction);
    // Prefer looking over nearby furniture/walls instead of moving inside a face.
    for(const height of[4.5,6,9]){
        const candidate=target.clone().add(new THREE.Vector3(offset.x*.4,height,offset.z*.4));
        if(navigation.cameraLimit(target,candidate,extra)>=.99)return candidate;
    }
    return target.clone().add(new THREE.Vector3(0,Math.max(minimum,6),0));
}
