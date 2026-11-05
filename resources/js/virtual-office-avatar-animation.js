const mix=(from,to,weight)=>from+(to-from)*weight;
export function animateOfficeAvatar(f,state,{time=0,dt=1/30,reduced=false}={}){
    const moving=['walk','run'].includes(state?.action),running=state?.action==='run',rest=state?.action==='rest',lying=rest&&['recline','nap'].includes(state.pose);
    const weight=reduced?1:1-Math.exp(-Math.max(.001,dt)*16),stride=moving?Math.sin(time*(running?13:8))*(running?.78:.48):0;
    let tilt=moving?(running?.16:.06):0,bob=moving?Math.abs(Math.sin(time*(running?13:8)))*(running?.07:.035):reduced?0:Math.sin(time*1.8)*.012;
    const legs=[stride,-stride],arms=[-stride*.85,stride*.85],side=[0,0];
    if(state?.action==='jump'){tilt=-.12;legs.fill(.5);arms.fill(-.7);bob=0;}
    if(state?.action==='fly'){tilt=.16;legs.fill(.3);arms.fill(.15);side[0]=-.12;side[1]=.12;bob=0;}
    if(state?.action==='land'){tilt=-.06;legs.fill(.35);arms.fill(-.3);bob=0;}
    if(rest){tilt=lying?(state.pose==='nap'?-Math.PI/2:-1.38):.04;bob=lying?.4:-.5;legs.fill(lying?0:-1.25);arms.fill(lying?-.08:state.pose==='meditate'?-.4:-.8);if(state.pose==='meditate'){side[0]=-.3;side[1]=.3;}if(!reduced)bob+=Math.sin(time*1.4)*.007;}
    if(state?.action==='play'){arms[1]=-.8+(reduced?0:Math.sin(time*3)*.45);arms[0]=-.3;tilt=.07;}
    if(state?.action==='cast'){arms[0]=state.skillPose==='beam'?-1.25:-.9;arms[1]=-1.4;legs[0]=-.12;legs[1]=.2;tilt=.12;}
    if(state?.action==='drink')arms[1]=-1.2+(reduced?0:Math.sin(time*1.8)*.08);
    if(state?.action==='eat')arms[0]=-1;
    if(state?.action==='dance'){arms[0]=-.8;arms[1]=-.7;legs[0]=reduced?0:Math.sin(time*2.4)*.2;legs[1]=-legs[0];}
    f.body.rotation.x=mix(f.body.rotation.x,tilt,weight);f.body.position.y=mix(f.body.position.y,bob,weight);
    f.body.rotation.z=mix(f.body.rotation.z,state?.action==='dance'&&!reduced?Math.sin(time*2.4)*.12:0,weight);
    f.legs.forEach((leg,i)=>{leg.rotation.x=mix(leg.rotation.x,legs[i],weight);leg.rotation.z=mix(leg.rotation.z,side[i],weight);});
    f.arms.forEach((arm,i)=>{arm.rotation.x=mix(arm.rotation.x,arms[i],weight);arm.rotation.z=mix(arm.rotation.z,running?(i?-.12:.12):0,weight);});
    f.head.rotation.x=mix(f.head.rotation.x,lying&&state.pose==='recline'?.2:0,weight);f.head.rotation.y=mix(f.head.rotation.y,0,weight);
    const blink=rest&&state.pose==='nap'?.15:!reduced&&time%5.3<.12?.25:1;f.eyes.forEach(eye=>eye.scale.y=mix(eye.scale.y,blink,weight));
    return {lying,moving};
}

export function restingHeading(navigation,position,people=[]){
    for(let i=0;i<12;i++){
        const yaw=(position.yaw||0)+i*Math.PI/6;
        const clear=[.2,.7,1.3,1.8].every(d=>[-.25,0,.25].every(side=>{
            const x=position.x+Math.sin(yaw)*d+Math.cos(yaw)*side,z=position.z+Math.cos(yaw)*d-Math.sin(yaw)*side;
            return navigation.free(x,z)&&people.every(p=>Math.hypot(p.x-x,p.z-z)>.65);
        }));if(clear)return yaw;
    }return null;
}

// Walk to a clear nearby spot when a long pose will not fit in a crowded spawn.
export function planOfficeRest(navigation,position,pose,people=[]){
    const lying=['recline','nap'].includes(pose);
    for(const radius of[0,.8,1.6,2.4,3.2])for(let i=0;i<(radius?16:1);i++){
        const point={...position,x:position.x+Math.sin(i*Math.PI/8)*radius,z:position.z+Math.cos(i*Math.PI/8)*radius};
        if(!navigation.free(point.x,point.z)||!navigation.segment(position,point)||people.some(p=>Math.hypot(p.x-point.x,p.z-point.z)<.65))continue;
        const dx=point.x-position.x,dz=point.z-position.z,length=dx*dx+dz*dz;
        if(length&&people.some(p=>{const t=Math.max(0,Math.min(1,((p.x-position.x)*dx+(p.z-position.z)*dz)/length));return Math.hypot(position.x+dx*t-p.x,position.z+dz*t-p.z)<.62&&t>0;}))continue;
        const yaw=lying?restingHeading(navigation,point,people):position.yaw||0;if(yaw!==null)return{...point,yaw};
    }return null;
}
