import * as THREE from 'three';

export function settleOfficeCamera(controls){const damping=controls.enableDamping;controls.enableDamping=false;controls.update?.();controls.enableDamping=damping;}

function cameraOffset(target,desired,minimum,maximum){
    const offset=desired.clone().sub(target);
    if(!Number.isFinite(offset.lengthSq())||offset.lengthSq()<.001)offset.set(4,3,5);
    if(offset.length()<minimum||offset.length()>maximum)offset.clampLength(minimum,maximum);
    return offset;
}

// Obstruction may shorten the radius, never rotate or lift the user's view.
// Keep comfortable avatar clearance even when a very large object is nearby.
export function officeCameraPosition(navigation,target,desired,extra=[],minimum=3.6,maximum=35){
    const offset=cameraOffset(target,desired,minimum,maximum),distance=offset.length();
    const fraction=THREE.MathUtils.clamp(navigation.cameraLimit(target,target.clone().add(offset),extra),0,1);
    if(fraction>=1)return target.clone().add(offset);
    return target.clone().add(offset.setLength(Math.max(minimum,distance*fraction)));
}

export function createOfficeCameraRig(){
    let correction=0,heldCorrection=0,clearFor=0;
    return{reset(){correction=heldCorrection=clearFor=0;},resolve(navigation,target,desired,extra=[],minimum=3.6,maximum=35,seconds=1/30){
        const dt=THREE.MathUtils.clamp(Number(seconds)||1/30,.001,.06),direct=cameraOffset(target,desired,minimum,maximum),distance=direct.length();
        let wanted=distance-officeCameraPosition(navigation,target,desired,extra,minimum,maximum).distanceTo(target);
        if(wanted>.01){heldCorrection=wanted;clearFor=0;}
        else if(heldCorrection>0){clearFor+=dt;if(clearFor<.2)wanted=heldCorrection;else heldCorrection=0;}
        // Smooth only the scalar collision correction. Mouse orbit and wheel
        // input remain immediate, including during the doorway recovery hold.
        const change=(wanted-correction)*(1-Math.exp(-dt*9));
        correction+=THREE.MathUtils.clamp(change,-8*dt,8*dt);
        correction=THREE.MathUtils.clamp(correction,0,Math.max(0,distance-minimum));
        return target.clone().add(correction>.000001?direct.setLength(distance-correction):direct);
    }};
}
