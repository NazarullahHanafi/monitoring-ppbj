import catalog from '../data/virtual-office-abilities.json' with {type:'json'};
export const skillsFor=costume=>(catalog.characters[costume]||catalog.characters.none).map(id=>({id,...catalog.skills[id],cooldown:catalog.skills[id].cooldown||6}));

export function createOfficeAbilities({THREE,scene,navigation,reduced=()=>false}){
    const active=new Map(),seen=new Map(),cooldowns=new Map();
    const geometries={orb:new THREE.SphereGeometry(.24,12,8),ring:new THREE.TorusGeometry(.7,.045,5,24),beam:new THREE.CylinderGeometry(.09,.2,1,8),shard:new THREE.ConeGeometry(.18,1.3,5)};
    function cast(id,skill,figure,event=Date.now(),remote=false){
        const spec=catalog.skills[skill],now=Date.now();if(!spec||!figure||now-event>4500||event>now+1500)return false;
        if(!remote&&(cooldowns.get(id)||0)>now)return false;
        if(active.has(id))remove(id);
        if(spec.type==='clones')for(const[other,effect]of active)if(effect.spec.type==='clones')remove(other);
        // Four simultaneous effects maximum; never duplicate the entire scene.
        if(active.size>=4)remove(active.keys().next().value);
        cooldowns.set(id,now+(spec.cooldown||6)*1000);
        const root=new THREE.Group();root.userData.officeAbility=id;root.position.copy(figure.group.position);root.rotation.y=figure.group.rotation.y;
        const mat=new THREE.MeshBasicMaterial({color:spec.color,transparent:true,opacity:.7,depthWrite:false,side:THREE.DoubleSide}),parts=[];
        const add=(shape,x,y,z)=>{const mesh=new THREE.Mesh(geometries[shape],mat);mesh.position.set(x,y,z);root.add(mesh);parts.push(mesh);return mesh;};
        if(spec.type==='clones'){
            for(let i=0;i<6;i++){const a=i*Math.PI/3,x=Math.sin(a)*1.6,z=Math.cos(a)*1.6,world={x:root.position.x+x,z:root.position.z+z};if(!navigation.free(world.x,world.z)||!navigation.segment(root.position,world))continue;
                const clone=figure.body.clone(true);clone.position.set(x,.02,z);clone.userData.shadowClone=true;root.add(clone);parts.push(clone);}
        }else if(spec.type==='orb'){add('orb',-.4,1.15,.7);for(let i=0;i<3;i++){const ring=add('ring',-.4,1.15,.7);ring.scale.setScalar(.48);ring.rotation.set(i,0,i*.8);}}
        else if(spec.type==='beam'){let reach=0;const origin=figure.group.position;for(let d=.25;d<=6;d+=.25){if(!navigation.segment(origin,{x:origin.x+Math.sin(root.rotation.y)*d,z:origin.z+Math.cos(root.rotation.y)*d}))break;reach=d;}
            const start=Math.min(.6,reach),length=Math.max(.01,reach-start),beam=add('beam',0,1.2,start+length/2);beam.rotation.x=Math.PI/2;beam.scale.y=length;add('orb',0,1.2,start);}
        else for(let i=0;i<(reduced()?3:8);i++){const a=i*Math.PI/4,mesh=add(spec.type==='ice'?'shard':spec.type==='swarm'?'orb':'ring',Math.sin(a)*.85,.2+i*.14,Math.cos(a)*.85);if(spec.type==='swarm')mesh.scale.setScalar(.3);else if(spec.type!=='ice')mesh.rotation.x=Math.PI/2;}
        scene.add(root);active.set(id,{root,mat,parts,spec,started:now,figure});seen.set(id,event);return true;
    }
    function remove(id){const effect=active.get(id);if(!effect)return;scene.remove(effect.root);effect.mat.dispose();active.delete(id);}
    return{cast,cancel:remove,pose:id=>active.get(id)?.spec.type,observe(id,state,figure){if(state?.skill&&state.skill_at&&seen.get(id)!==state.skill_at)cast(id,state.skill,figure,state.skill_at,true);},
        update(now=Date.now()){for(const[id,e]of active){const age=(now-e.started)/1000;if(age>3.8){remove(id);continue;}if(!['clones','beam'].includes(e.spec.type)){e.root.position.copy(e.figure.group.position);e.root.rotation.y=e.figure.group.rotation.y;}e.mat.opacity=Math.min(.75,(3.8-age)*.65);if(reduced())continue;
            e.parts.forEach((part,i)=>{if(e.spec.type==='clones'){part.position.y=.02+Math.sin(age*3+i)*.015;part.rotation.y=Math.sin(age+i)*.04;}else{if(e.spec.type!=='beam'){part.rotation.z+=.035;part.rotation.y+=.05;}if(e.spec.type==='orb')part.scale.setScalar(part.geometry===geometries.ring ? .48*(1+Math.sin(age*7)*.1) : 1+Math.sin(age*9)*.08);else if(e.spec.type!=='beam')part.position.y+=Math.sin(age*3+i)*.006;}});}},
        cooldown:id=>Math.max(0,Math.ceil(((cooldowns.get(id)||0)-Date.now())/1000)),
        dispose(){for(const id of active.keys())remove(id);Object.values(geometries).forEach(g=>g.dispose());seen.clear();cooldowns.clear();}
    };
}
