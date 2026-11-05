import layout from '../data/virtual-office-layout.json' with { type: 'json' };
export { layout as officeLayout };

export function createPilotPhysics(navigation, initial = layout.spawn) {
    let state={x:initial.x,y:initial.y ?? -.12,z:initial.z,yaw:initial.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:true,action:'idle'}, jumpHeld=false,boostReady=true;
    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    function step(seconds,input={},cameraYaw=0,people=[]) {
        const dt=clamp(Number(seconds)||0,0,.05);let x=Number(input.x)||0,z=Number(input.z)||0;
        const length=Math.hypot(x,z);if(length>1){x/=length;z/=length;}
        if(state.stamina<=5)boostReady=false;else if(state.stamina>=30)boostReady=true;
        const boosting=Boolean(input.boost&&length&&boostReady),speed=boosting?9:4.5;
        state.stamina=clamp(state.stamina+(boosting?-23:14)*dt,0,100);
        const dx=(Math.cos(cameraYaw)*x-Math.sin(cameraYaw)*z)*speed,dz=(-Math.sin(cameraYaw)*x-Math.cos(cameraYaw)*z)*speed;
        state.vx=dx;state.vz=dz;
        if(input.jump&&!jumpHeld&&state.grounded){state.vy=7;state.grounded=false;}jumpHeld=Boolean(input.jump);
        const ground=navigation.groundHeight?.(state)??-.12;
        if(!state.grounded){state.vy-=20*dt;state.y+=state.vy*dt;if(state.y<=ground){state.y=ground;state.vy=0;state.grounded=true;}}else state.y=ground;
        let next=navigation.slide(state,{x:state.x+dx*dt,z:state.z+dz*dt});
        if(people.some(p=>Math.hypot(next.x-p.x,next.z-p.z)<.62))next={x:state.x,z:state.z};
        const moved=Math.hypot(next.x-state.x,next.z-state.z)>.0001;state.x=next.x;state.z=next.z;
        if(moved)state.yaw=Math.atan2(dx,dz);
        state.action=!state.grounded?'jump':moved?(boosting?'run':'walk'):'idle';return {...state};
    }
    return {step,state:()=>({...state}),reset(value){state={...state,...value,vx:0,vz:0,vy:0,grounded:(value.y??-.12)<=-.1};jumpHeld=false;},face(point){state.yaw=Math.atan2(point.x-state.x,point.z-state.z);},moving:()=>!state.grounded||Math.hypot(state.vx,state.vz)>.01};
}
export function nearVenue(position,id) { const venue=layout.venues[id];return Boolean(position&&venue&&Math.hypot(position.x-venue.x,position.z-venue.z)<=venue.radius); }
