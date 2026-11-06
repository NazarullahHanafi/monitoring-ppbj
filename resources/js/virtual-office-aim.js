import * as THREE from 'three';

// Direct mouse input: no inertia or frame-rate-dependent rotation.
export function createOfficeAim(){
    let yaw=0,pitch=0;
    return{
        start(position,target){const delta=target.clone().sub(position);yaw=Math.atan2(-delta.x,-delta.z);pitch=Math.atan2(delta.y,Math.hypot(delta.x,delta.z));},
        move(x,y){if(!Number.isFinite(x)||!Number.isFinite(y))return;yaw-=x*.0022;pitch=THREE.MathUtils.clamp(pitch-y*.0022,-1.35,1.35);},
        yaw:()=>yaw,pitch:()=>pitch,
        direction:()=>new THREE.Vector3(-Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch))
    };
}
