import catalog from '../data/virtual-office-abilities.json' with {type:'json'};
export const skillsFor=costume=>(catalog.characters[costume]||catalog.characters.none).map(id=>({id,...catalog.skills[id],cooldown:catalog.skills[id].cooldown||6}));
export const transformationFor=id=>catalog.skills[id]?.type==='transform'?{id,...catalog.skills[id]}:null;

export function createOfficeAbilities({THREE,scene,navigation,reduced=()=>false,createModel=()=>null}){
    const active=new Map(),seen=new Map(),cooldowns=new Map(),forms=new Map(),ready=new Map(),expired=new Map();let clockOffset=0,clockSample=null;
    const geometries={orb:new THREE.SphereGeometry(.24,12,8),ring:new THREE.TorusGeometry(.7,.045,5,24),beam:new THREE.CylinderGeometry(.09,.2,1,8),shard:new THREE.ConeGeometry(.18,1.3,5)};
    function cast(id,skill,figure,event=Date.now(),remote=false){
        const spec=catalog.skills[skill],now=Date.now();if(!spec||!figure||now-event>4500||event>now+1500)return false;
        if(spec.type==='transform')return !forms.has(id)&&((ready.get(id)||0)<=now+clockOffset);
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
        scene.add(root);active.set(id,{root,mat,parts,spec,skill,remote,started:remote?Math.min(now,event):now,figure});return true;
    }
    function remove(id){const effect=active.get(id);if(!effect)return;scene.remove(effect.root);effect.mat.dispose();active.delete(id);}
    function appearance(figure,spec){const changes=[],scale=figure.body.scale?.clone();
        figure.body.traverse?.(node=>{if(!node.isMesh)return;if(spec.model==='saiyan'&&node.userData.costumePart==='head'){changes.push(()=>{node.visible=true;});node.visible=false;}
            if(spec.model==='gear5'&&(node.userData.avatarCloth||node.userData.costumePart==='body')){const original=node.material,copy=original.clone();copy.color.set('#fff8ef');copy.vertexColors=false;node.material=copy;changes.push(()=>{node.material=original;copy.dispose();});}});
        if(figure.body.scale)figure.body.scale.setScalar(({gear5:1.12,monster:1.65,demon:1.12,awakened:1.2})[spec.model]||1);
        return()=>{changes.forEach(fn=>fn());if(scale)figure.body.scale.copy(scale);};}
    function clearForm(id){const f=forms.get(id);if(!f)return;f.figure.body.visible=f.bodyVisible;f.restore();scene.remove(f.model.root);f.model.dispose();forms.delete(id);}
    function observeForm(id,state,figure){
        if(!figure)return;ready.set(id,state?.form_ready_at||0);const spec=transformationFor(state?.form),current=forms.get(id);
        if(!spec||state.form_until<=Date.now()+clockOffset){if(spec)expired.set(id,state.form_at);clearForm(id);return;}
        if(expired.get(id)===state.form_at)return;
        if(current?.stamp===state.form_at){if(current.figure!==figure){current.figure.body.visible=current.bodyVisible;current.restore();current.figure=figure;current.bodyVisible=figure.body.visible;current.restore=appearance(figure,spec);}return;}
        clearForm(id);const model=createModel(spec,{costume:figure.person?.avatar?.costume,reduced:reduced()});if(!model)return;
        model.root.userData.officeAbility=id;model.root.userData.officeTransformation=id;model.root.traverse(node=>{if(node.isMesh)node.userData.personId=id;});scene.add(model.root);forms.set(id,{model,spec,figure,stamp:state.form_at,until:state.form_until,bodyVisible:figure.body.visible,restore:appearance(figure,spec)});
    }
    return{cast,cancel:remove,clearForm,targets:()=>[...forms.values()].map(f=>f.model.root).filter(root=>root.visible),clock(value,roundTrip){
            if(!Number.isFinite(value))return;
            // Prefer the least delayed recent response; slow acknowledgements must
            // not move a transformation's deadline backwards and forwards.
            const now=Date.now();if(Number.isFinite(roundTrip)&&roundTrip>=0){if(clockSample&&now-clockSample.at<60000&&roundTrip>clockSample.roundTrip)return;clockSample={at:now,roundTrip};}
            clockOffset=value;
        },form:id=>forms.get(id)?.spec||null,
        modeState(id){const f=forms.get(id);return f?{id:f.spec.id,name:f.spec.name,remaining:Math.max(0,Math.ceil((f.until-Date.now()-clockOffset)/1000)),expires:f.until-clockOffset,fly:Boolean(f.spec.fly),height:f.spec.height}:null;},
        forget(id){remove(id);clearForm(id);ready.delete(id);seen.delete(id);cooldowns.delete(id);expired.delete(id);},
        modeCooldown:id=>Math.max(0,Math.ceil(((ready.get(id)||0)-Date.now()-clockOffset)/1000)),
        pose:id=>active.get(id)?.spec.type,observe(id,state,figure,local=false){observeForm(id,state,figure);
            if(state?.skill&&catalog.skills[state.skill]?.type!=='transform'&&state.skill_at&&(!seen.has(id)||state.skill_at>seen.get(id))){
                const current=active.get(id);
                // Deduplicate in the server timestamp domain, including stale
                // events and our own acknowledgement of an already drawn cast.
                if(!(local&&current&&!current.remote&&current.skill===state.skill))cast(id,state.skill,figure,state.skill_at-clockOffset,true);
                seen.set(id,state.skill_at);
            }
        },
        update(now=Date.now(),focus=null){for(const[id,f]of forms){if(now+clockOffset>=f.until){expired.set(id,f.stamp);clearForm(id);continue;}const detailed=!focus||Math.hypot(f.figure.group.position.x-focus.x,f.figure.group.position.z-focus.z)<55;f.model.root.visible=detailed;f.figure.body.visible=detailed&&f.model.replaceBody?false:f.bodyVisible;
            f.model.root.position.copy(f.figure.group.position);f.model.root.rotation.y=f.figure.group.rotation.y;f.model.update((now-f.stamp+clockOffset)/1000,{flying:f.figure.flight,moving:f.figure.moving});}
            for(const[id,e]of active){const age=(now-e.started)/1000;if(age>3.8){remove(id);continue;}if(!['clones','beam'].includes(e.spec.type)){e.root.position.copy(e.figure.group.position);e.root.rotation.y=e.figure.group.rotation.y;}e.mat.opacity=Math.min(.75,(3.8-age)*.65);if(reduced())continue;
            e.parts.forEach((part,i)=>{if(e.spec.type==='clones'){part.position.y=.02+Math.sin(age*3+i)*.015;part.rotation.y=Math.sin(age+i)*.04;}else{if(e.spec.type!=='beam'){part.rotation.z+=.035;part.rotation.y+=.05;}if(e.spec.type==='orb')part.scale.setScalar(part.geometry===geometries.ring ? .48*(1+Math.sin(age*7)*.1) : 1+Math.sin(age*9)*.08);else if(e.spec.type!=='beam')part.position.y+=Math.sin(age*3+i)*.006;}});}},
        cooldown:id=>Math.max(0,Math.ceil(((cooldowns.get(id)||0)-Date.now())/1000)),
        dispose(){for(const id of active.keys())remove(id);for(const id of forms.keys())clearForm(id);Object.values(geometries).forEach(g=>g.dispose());seen.clear();cooldowns.clear();ready.clear();expired.clear();}
    };
}
