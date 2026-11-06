const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const{pathToFileURL}=require('node:url');const load=()=>import(pathToFileURL(path.resolve('resources/js/virtual-office-abilities.js')));
test('every costume has character-specific skills and Naruto includes Rasengan and shadow clones',async()=>{const {skillsFor}=await load(),costumes=require('../../resources/data/virtual-office-costumes.json');for(const c of costumes){const skills=skillsFor(c.id);assert.ok(skills.length>=2&&skills.length<=3,c.id);assert.ok(skills.every(s=>s.name&&s.type&&s.cooldown>=6));}assert.deepEqual(skillsFor('naruto').map(s=>s.id),['rasengan','clones','kurama']);assert.equal(skillsFor('goku')[0].id,'kamehameha');});
test('effects are bounded, clipped at walls, deduplicated, expire and dispose shared geometry',async()=>{const THREE=await import('three'),{createOfficeAbilities}=await load(),scene=new THREE.Scene(),navigation={free:()=>true,segment:(a,b)=>Math.hypot(b.x-a.x,b.z-a.z)<2},figure={group:new THREE.Group(),body:new THREE.Group()};figure.body.add(new THREE.Mesh(new THREE.BoxGeometry(.5,1,.3),new THREE.MeshBasicMaterial()));figure.group.add(figure.body);
    const effects=createOfficeAbilities({THREE,scene,navigation});assert.equal(effects.cast(1,'rasengan',figure),true);assert.equal(effects.cast(1,'clones',figure),false,'Cooldown must block spam.');effects.observe(2,{skill:'clones',skill_at:Date.now()},figure);const clones=scene.children.find(n=>n.userData.officeAbility===2);assert.equal(clones.children.length,6);effects.observe(2,{skill:'clones',skill_at:Date.now()-1},figure);assert.equal(scene.children.length,2);for(let id=3;id<10;id++)effects.observe(id,{skill:'kamehameha',skill_at:Date.now()},figure);assert.ok(scene.children.length<=4);for(const root of scene.children){const beam=root.children.find(n=>n.geometry?.type==='CylinderGeometry');if(beam)assert.ok(beam.scale.y<2);}effects.update(Date.now()+5000);assert.equal(scene.children.length,0);effects.dispose();figure.body.children[0].geometry.dispose();figure.body.children[0].material.dispose();});

test('server timestamps deduplicate effects with clock skew and local echoes never restart the casting pose',async()=>{
    const THREE=await import('three'),{createOfficeAbilities}=await load(),original=Date.now;let now=100000;Date.now=()=>now;
    try{for(const offset of[-7200000,7200000]){const scene=new THREE.Scene(),figure={group:new THREE.Group(),body:new THREE.Group()},effects=createOfficeAbilities({THREE,scene,navigation:{free:()=>true,segment:()=>true}});effects.clock(offset);
        const state={skill:'rasengan',skill_at:now+offset};effects.observe(2,state,figure);const root=scene.children[0];assert.ok(root);
        for(let i=0;i<40;i++){now+=50;effects.observe(2,state,figure);effects.update();assert.equal(scene.children[0],root,'The same server event must reuse its existing effect.');}
        now+=2000;effects.update();effects.observe(2,state,figure);assert.equal(effects.pose(2),undefined);assert.equal(scene.children.length,0);
        effects.observe(2,{...state,skill_at:state.skill_at-1},figure);assert.equal(scene.children.length,0,'Late older snapshots cannot replay a cast.');
        assert.equal(effects.cast(1,'rasengan',figure),true);const local=scene.children[0];now+=500;effects.observe(1,{skill:'rasengan',skill_at:now+offset},figure,true);assert.equal(scene.children[0],local);
        now+=3400;effects.update();assert.equal(effects.pose(1),undefined,'An acknowledgement must not extend the local casting pose.');
        effects.observe(2,{skill:'rasengan',skill_at:now+offset},figure);assert.equal(scene.children.length,1,'A genuinely new cast still plays.');effects.dispose();
    }}finally{Date.now=original;}
});

test('slow clock samples cannot repeatedly expire and resurrect the same transformation',async()=>{
    const THREE=await import('three'),{createOfficeAbilities}=await load(),original=Date.now;let now=100000;Date.now=()=>now;
    const scene=new THREE.Scene(),figure={group:new THREE.Group(),body:new THREE.Group()};let created=0;
    const effects=createOfficeAbilities({THREE,scene,navigation:{},createModel:()=>{created++;return{root:new THREE.Group(),dispose(){},update(){}};}});
    try{effects.clock(5000,40);const state={form:'susanoo',form_at:105000,form_until:165000};effects.observe(1,state,figure);
        const expiry=effects.modeState(1).expires;effects.clock(-3000,1600);assert.equal(effects.modeState(1).expires,expiry,'High-latency response must not alter a better time sample.');
        now=160001;effects.update();assert.equal(effects.form(1),null);effects.clock(-5000);effects.observe(1,state,figure);assert.equal(effects.form(1),null);assert.equal(created,1,'An expired grant cannot be recreated after clock correction.');
        effects.observe(1,{...state,form_at:170000,form_until:230000},figure);assert.equal(created,2,'A new grant can still transform normally.');
    }finally{effects.dispose();Date.now=original;}
});
