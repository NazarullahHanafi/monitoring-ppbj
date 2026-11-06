import catalog from '../data/virtual-office-combat.json' with {type:'json'};
import {transformationFor} from './virtual-office-abilities.js';

export function createOfficeCombatEffects(THREE,scene){
    const shapes={box:new THREE.BoxGeometry(1,1,1),orb:new THREE.SphereGeometry(1,12,8),ring:new THREE.TorusGeometry(1,.04,5,28),tip:new THREE.ConeGeometry(.15,.6,6)},materials=new Map(),held=new Map(),seen=new Map(),effects=[];
    const material=kind=>{if(!materials.has(kind))materials.set(kind,new THREE.MeshBasicMaterial({color:(catalog.weapons[kind]||catalog.specials[kind]).color,transparent:true,opacity:.8,depthWrite:false}));return materials.get(kind);};
    function part(parent,shape,kind,position,scale){const mesh=new THREE.Mesh(shapes[shape],material(kind));mesh.position.set(...position);mesh.scale.set(...scale);parent.add(mesh);return mesh;}
    function forget(id){const item=held.get(id);item?.root.removeFromParent();held.delete(id);seen.delete(id);}
    return{observe(id,state,figure,now=Date.now()){
        if(!figure)return;const weapon=catalog.weapons[state?.weapon]?state.weapon:null,current=held.get(id);
        if(current?.figure!==figure||current?.kind!==weapon){current?.root.removeFromParent();held.delete(id);if(weapon){const root=new THREE.Group(),length=weapon==='sniper'?1.15:weapon==='pistol'?.45:.8;root.position.set(0,-.3,.14);part(root,'box',weapon,[0,0,.18],[.12,.16,length]);part(root,'box',weapon,[0,-.13,0],[.1,.25,.14]);if(weapon==='sniper')part(root,'box',weapon,[0,.15,.15],[.12,.12,.35]);root.traverse(n=>{if(n.isMesh)n.userData.personId=id;});(figure.arms?.[1]||figure.body).add(root);held.set(id,{root,kind:weapon,figure});}}
        const heldItem=held.get(id);if(heldItem)heldItem.root.visible=!state?.form&&!['rest','play','drink','eat'].includes(state?.action);
        if(!state?.shot_at||seen.get(id)>=state.shot_at)return;seen.set(id,state.shot_at);const kind=state.shot_kind,end=state.shot_end;if(!(catalog.weapons[kind]||catalog.specials[kind])||!end||!['x','y','z'].every(k=>Number.isFinite(end[k]))||now-state.shot_at>2500)return;
        while(effects.length>=8)scene.remove(effects.shift().root);
        const root=new THREE.Group(),height=catalog.specials[kind]?(transformationFor(state.form)?.height||2.2)*.55:1.2,origin=figure.group.position.clone().add(new THREE.Vector3(0,height,0)),target=new THREE.Vector3(end.x,end.y,end.z);root.position.copy(origin);root.lookAt(target);root.userData.officeAbility=id;scene.add(root);
        const projectile=new THREE.Group();root.add(projectile);
        if(kind==='bijudama'){part(projectile,'orb',kind,[0,0,0],[.8,.8,.8]);for(let i=0;i<3;i++){const ring=part(projectile,'ring',kind,[0,0,0],[1,1,1]);ring.rotation.set(i*.9,i*.6,0);}}
        else{part(projectile,'box',kind,[0,0,0],[kind==='indra_arrow'?.1:.035,kind==='indra_arrow'?.1:.035,kind==='indra_arrow'?2:.9]);if(kind==='indra_arrow'){const tip=part(projectile,'tip',kind,[0,0,1.25],[2,2,2]);tip.rotation.x=Math.PI/2;const bow=part(root,'ring',kind,[0,0,.6],[1.25,1.8,1]);bow.rotation.y=Math.PI/2;}}
        effects.push({root,projectile,origin,target,start:now,duration:kind==='bijudama'?1100:kind==='indra_arrow'?650:240,kind});
    },update(now=Date.now(),reduced=false){for(let i=effects.length-1;i>=0;i--){const e=effects[i],age=now-e.start,t=Math.min(1,age/e.duration);if(age>e.duration+180){scene.remove(e.root);effects.splice(i,1);continue;}e.projectile.position.z=e.origin.distanceTo(e.target)*t;if(!reduced&&e.kind==='bijudama')e.projectile.rotation.z=age*.003;e.projectile.scale.setScalar(age>e.duration?Math.max(.1,1-(age-e.duration)/180):1);}},forget,
        dispose(){for(const id of held.keys())forget(id);effects.forEach(e=>scene.remove(e.root));effects.length=0;Object.values(shapes).forEach(g=>g.dispose());materials.forEach(m=>m.dispose());materials.clear();},active:()=>effects.length};
}
