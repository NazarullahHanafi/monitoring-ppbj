import layout from '../data/virtual-office-layout.json' with { type: 'json' };
import motion from '../data/virtual-office-motion.json' with {type:'json'};
export { layout as officeLayout };

export function createPilotPhysics(navigation, initial = layout.spawn) {
    let state={x:initial.x,y:initial.y ?? -.12,z:initial.z,yaw:initial.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:true,action:'idle',jumps:0,flight:false}, jumpHeld=false,boostReady=true,form=null,expires=0,landing=false,airAccess=Boolean(initial.air_access),launchGround=initial.y??-.12;
    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    function step(seconds,input={},cameraYaw=0,people=[]) {
        const dt=clamp(Number(seconds)||0,0,.05);let x=Number(input.x)||0,z=Number(input.z)||0;
        if(form&&Date.now()>=expires)setForm(null);
        const length=Math.hypot(x,z);if(length>1){x/=length;z/=length;}
        if(state.stamina<=5)boostReady=false;else if(state.stamina>=30)boostReady=true;
        const boosting=Boolean(input.boost&&length&&boostReady),speed=boosting?9:4.5;
        state.stamina=clamp(state.stamina+(boosting?-23:14)*dt,0,100);
        const dx=(Math.cos(cameraYaw)*x-Math.sin(cameraYaw)*z)*speed,dz=(-Math.sin(cameraYaw)*x-Math.cos(cameraYaw)*z)*speed;
        state.vx=dx;state.vz=dz;
        const ground=navigation.groundHeight?.(state,airAccess,form?.radius||.3)??-.12;
        if(state.grounded)launchGround=ground;
        if(state.grounded&&state.y>ground+.08)state.grounded=false;
        if(!state.flight&&!landing&&input.jump&&!jumpHeld&&(state.grounded||state.jumps<motion.maximum_jumps)){state.vy=motion.jump_speed;state.grounded=false;state.jumps++;}jumpHeld=Boolean(input.jump);
        const previousY=state.y;
        if(state.flight){state.vy=(Number(Boolean(input.jump))-Number(Boolean(input.descend)))*motion.flight_speed;state.y=clamp(state.y+state.vy*dt,ground,motion.flight_maximum_y);state.grounded=false;}
        else if(landing){state.y=Math.max(ground,state.y-motion.landing_speed*dt);state.vy=-motion.landing_speed;if(state.y<=ground){landing=false;state.grounded=true;state.vy=0;state.jumps=0;}}
        else if(!state.grounded){state.vy-=motion.gravity*dt;const ceiling=airAccess?Math.min(motion.flight_maximum_y,Math.max(motion.maximum_y,launchGround+motion.maximum_y+.12)):motion.maximum_y;state.y=state.vy>0?Math.min(ceiling,state.y+state.vy*dt):state.y+state.vy*dt;if(state.y<=ground){state.y=ground;state.vy=0;state.grounded=true;state.jumps=0;}}else state.y=ground;
        let next=navigation.slide({...state,y:Math.min(previousY,state.y)},{x:state.x+dx*dt,y:state.y,z:state.z+dz*dt},form?.radius||.3,airAccess);
        if(people.some(p=>state.y<(p.y??-.12)+1.8&&state.y+(form?.height||1.8)>(p.y??-.12)&&Math.hypot(next.x-p.x,next.z-p.z)<.62&&Math.hypot(next.x-p.x,next.z-p.z)<=Math.hypot(state.x-p.x,state.z-p.z)+.0001))next={x:state.x,z:state.z};
        const moved=Math.hypot(next.x-state.x,next.z-state.z)>.0001;state.x=next.x;state.z=next.z;
        if(airAccess&&state.grounded){const support=navigation.groundHeight?.(state,true,form?.radius||.3)??-.12;if(state.y>support+.08)state.grounded=false;else if(!state.flight&&state.y<=(navigation.groundHeight?.(state,false)??-.12)+.12)airAccess=false;}
        state.air_access=airAccess;
        if(moved)state.yaw=Math.atan2(dx,dz);
        state.action=state.flight?'fly':landing?'land':!state.grounded?'jump':moved?(boosting?'run':'walk'):'idle';return {...state};
    }
    function setForm(value,until=Infinity){if(!value&&state.flight){state.flight=false;landing=!state.grounded;}form=value;expires=until;}
    return {step,setForm,toggleFlight(){if(!form?.fly)return false;state.flight=!state.flight;if(state.flight)airAccess=true;landing=!state.flight&&!state.grounded;state.grounded=false;state.vy=0;return state.flight?'fly':'land';},state:()=>({...state,air_access:airAccess}),reset(value){airAccess=Boolean(value.air_access??airAccess);const support=navigation.groundHeight?.(value,airAccess,form?.radius||.3)??-.12;state={...state,...value,vx:0,vz:0,vy:0,jumps:0,grounded:(value.y??-.12)<=support+.01};launchGround=support;landing=!state.flight&&!state.grounded&&state.y>motion.maximum_y;},face(point){state.yaw=Math.atan2(point.x-state.x,point.z-state.z);},moving:()=>!state.grounded||Math.hypot(state.vx,state.vz)>.01};
}
export function nearVenue(position,id) { const venue=layout.venues[id];return Boolean(position&&venue&&Math.hypot(position.x-venue.x,position.z-venue.z)<=venue.radius); }
