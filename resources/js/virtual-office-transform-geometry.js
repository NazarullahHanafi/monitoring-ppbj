import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
// Original low-poly forms. All shapes are built locally; no downloaded models.
export function createTransformationModel(THREE,spec,{costume='none',reduced=false}={}){
    const root=new THREE.Group(),owned=new Set(),materials=new Map(),wings=[],tails=[],limbs=[];
    root.userData.transformationModel=spec.model;
    function mat(color,glow=false){const key=color+glow;if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:glow?.55:.13,roughness:.55,metalness:.18,transparent:glow,opacity:glow?.78:1,depthWrite:!glow}));return materials.get(key);}
    function part(parent,geometry,color,x,y,z,glow=false){owned.add(geometry);const mesh=new THREE.Mesh(geometry,mat(color,glow));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
    const box=(p,w,h,d,c,x,y,z,g=false)=>part(p,new THREE.BoxGeometry(w,h,d),c,x,y,z,g);
    const ball=(p,x,y,z,sx,sy,sz,c,g=false)=>{const m=part(p,new THREE.SphereGeometry(1,10,7),c,x,y,z,g);m.scale.set(sx,sy,sz);return m;};
    const spike=(p,r,h,c,x,y,z)=>part(p,new THREE.ConeGeometry(r,h,5),c,x,y,z,true);
    const joint=(x,y,z)=>{const g=new THREE.Group();g.position.set(x,y,z);root.add(g);return g;};
    const color=spec.color,light=spec.accent||'#eddbff',dark=spec.dark||'#36214f';
    if(spec.model==='susanoo'){
        // Complete armored silhouette, articulated arms/legs, waist lamellae.
        box(root,1.75,1.65,.85,color,0,3.7,0);box(root,1.1,.65,.75,color,0,2.65,0);
        for(let i=0;i<5;i++)for(const s of[-1,1]){const rib=box(root,.74,.055,.07,light,s*.4,3.15+i*.25,.46,true);rib.rotation.z=s*.18;}
        box(root,1.45,.24,.95,dark,0,2.5,0);
        for(let i=0;i<5;i++){const a=i*Math.PI*2/5,plate=box(root,.85,1,.16,color,Math.sin(a)*.68,2.05,Math.cos(a)*.53);plate.rotation.y=a;plate.rotation.z=Math.sin(a)*.12;}
        for(const s of[-1,1]){
            const leg=joint(s*.47,1.7,0);box(leg,.52,1.1,.58,color,0,-.4,0);box(leg,.64,.4,.7,dark,0,-.8,.04);box(leg,.48,.65,.56,color,0,-1.2,0);box(leg,.6,.3,.95,color,0,-1.57,.2);limbs.push({node:leg,side:s,kind:'leg'});
            const arm=joint(s*1.08,4.25,0);box(arm,.6,1.1,.65,color,0,-.45,0);box(arm,.75,.35,.85,light,0,.04,0);box(arm,.64,.85,.65,dark,0,-1.25,0);box(arm,.58,.35,.55,color,0,-1.85,.07);limbs.push({node:arm,side:s,kind:'arm'});
            for(let i=0;i<3;i++)box(root,.95,.16,.85,color,s*(1.03+i*.05),4.38-i*.17,0);
            // Two layered wings: broad spar and pointed overlapping feather plates.
            const wing=joint(s*.72,4.35,-.43);wing.userData.wingSide=s;wings.push(wing);
            const spar=box(wing,2.2,.24,.23,light,s*1,1.02,-.1,true);spar.rotation.z=s*.48;
            for(let row=0;row<3;row++)for(let i=0;i<(reduced?5:8);i++){const feather=box(wing,.48,1.2+row*.3,.12,color,s*(.55+i*.37),.75-row*.56+i*.12,-.12-row*.04,true);feather.rotation.z=-s*.55;}
            const claw=spike(wing,.16,.55,light,s*2.2,1.7,-.1);claw.rotation.z=-s*.8;
        }
        const head=joint(0,5.05,.02);box(head,.76,.85,.7,color,0,0,0);box(head,.53,.25,.45,dark,0,-.25,.25);
        for(const s of[-1,1]){const eye=box(head,.22,.07,.08,'#fff89e',s*.18,.04,.4,true);eye.rotation.z=-s*.25;const horn=spike(head,.17,.95,color,s*.42,.55,0);horn.rotation.z=-s*.38;}
        const nose=spike(head,.16,.63,light,0,-.02,.58);nose.rotation.x=Math.PI/2;
        const gem=box(head,.18,.22,.05,'#e7abff',0,.29,.39,true);gem.rotation.z=Math.PI/4;
        for(let i=-2;i<=2;i++){const flame=spike(head,.16,.8+Math.abs(i)*.1,color,i*.16,.85,-.08);flame.rotation.z=-i*.15;}
        const sword=joint(-1.15,2.28,.18);box(sword,.14,.8,.14,dark,0,0,0);box(sword,.7,.1,.25,light,0,-.15,0);box(sword,.24,2.4,.08,light,0,-1.4,0,true);sword.rotation.z=-.5;
        if(costume==='itachi'){wings.forEach(w=>w.visible=false);root.userData.variant='armored-itachi';}
    }else if(spec.model==='kurama'){
        // Fox muzzle, pointed ears, claws, black markings, nine separate tails.
        ball(root,0,2.1,-.12,1,1.35,.75,color);ball(root,0,3.52,.35,.82,.78,.65,color);
        ball(root,0,3.27,.98,.5,.27,.5,light);ball(root,0,3.45,1.31,.19,.13,.13,dark);
        for(const s of[-1,1]){const ear=spike(root,.39,1.3,color,s*.58,4.3,.14);ear.rotation.z=-s*.22;box(root,.27,.1,.09,'#fff5c2',s*.38,3.66,.95,true);box(root,.045,.14,.045,'#b93237',s*.38,3.66,1.01,true);const marking=box(root,.39,.1,.06,dark,s*.48,3.56,.92);marking.rotation.z=s*.4;
            const fang=spike(root,.08,.25,'#fff2c8',s*.23,3.11,1.18);fang.rotation.z=Math.PI;
            for(let i=0;i<3;i++){const whisker=box(root,.65,.035,.04,dark,s*.62,3.3-i*.12,1.02);whisker.rotation.z=s*(i-1)*.15;}
            const arm=joint(s*.9,2.85,.1);ball(arm,0,-.4,.15,.33,.78,.35,color);ball(arm,0,-1.04,.33,.43,.22,.44,light);limbs.push({node:arm,side:s,kind:'arm'});
            const leg=joint(s*.52,1.1,-.05);ball(leg,0,-.35,0,.4,.7,.4,color);ball(leg,0,-.85,.25,.5,.25,.6,light);limbs.push({node:leg,side:s,kind:'leg'});
            for(let j=0;j<3;j++)spike(arm,.08,.28,dark,(j-1)*.18,-1.19,.65).rotation.x=Math.PI/2;
        }
        for(let i=0;i<9;i++){const a=(i-4)*.42,tail=joint(Math.sin(a)*.25,1.6,-.6);tail.rotation.y=a;tail.userData.tailIndex=i;
            const curve=new THREE.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(v=>new THREE.Vector3(...v))),segments=14,radial=7,geometry=new THREE.TubeGeometry(curve,segments,.4,radial,false),positions=geometry.attributes.position;
            for(let ring=0;ring<=segments;ring++){const center=curve.getPointAt(ring/segments),taper=1-.93*Math.pow(ring/segments,1.5);for(let j=0;j<=radial;j++){const index=ring*(radial+1)+j,p=new THREE.Vector3().fromBufferAttribute(positions,index).sub(center).multiplyScalar(taper).add(center);positions.setXYZ(index,p.x,p.y,p.z);}}
            geometry.computeVertexNormals();part(tail,geometry,color,0,0,0,true);
            tails.push(tail);
        }
    }else{
        // Character-specific overlays retain the user's original animated body.
        if(spec.model==='saiyan'){for(let i=0;i<9;i++){const a=i*Math.PI*2/9,hair=spike(root,.13,.7,color,Math.sin(a)*.2,2.03,Math.cos(a)*.17);hair.rotation.z=-Math.sin(a)*.7;hair.rotation.x=Math.cos(a)*.6;}}
        if(spec.model==='gear5'){for(let i=0;i<7;i++)ball(root,Math.sin(i)*.2,1.91+Math.cos(i)*.07,Math.cos(i)*.13,.19,.16,.19,'#fff9ef');for(const s of[-1,1])for(let i=0;i<6;i++)ball(root,s*(.35+i*.08),1.2+Math.sin(i)*.13,-.2,.13,.14,.12,'#fff9ef');}
        if(spec.model==='demon'){const horn=spike(root,.12,.6,light,.19,1.96,.09);horn.rotation.z=-.25;for(let i=0;i<6;i++){const vine=box(root,.04,.12,.03,dark,Math.sin(i)*.23,1.02+i*.09,.2);vine.rotation.z=i*.6;}}
        if(spec.model==='monster'){root.scale.setScalar(1.65);ball(root,0,1.05,0,.42,.5,.29,color);for(const s of[-1,1]){const antler=box(root,.06,.65,.06,light,s*.38,1.9,0);antler.rotation.z=-s*.5;}}
        if(spec.model==='slayer'){for(let i=0;i<8;i++){const flame=spike(root,.12,.5,color,Math.sin(i)*.42,.3+i*.14,Math.cos(i)*.35);flame.rotation.z=Math.sin(i)*.4;}}
        if(['hero','icefire','awakened'].includes(spec.model)){for(let i=0;i<8;i++){const bolt=box(root,.04,.38,.04,spec.model==='icefire'&&i%2?'#ff9366':color,Math.sin(i)*.4,.35+i*.17,Math.cos(i)*.28,true);bolt.rotation.z=i%2?.5:-.5;}}
    }
    const ring=part(root,new THREE.TorusGeometry(spec.model==='susanoo'?1.12:spec.model==='kurama'?1:.55,.035,5,28),color,0,.06,0,true);ring.rotation.x=-Math.PI/2;
    // Batch static details within each animated joint; wings/tails still move.
    function batch(parent){for(const child of [...parent.children])if(child.isGroup)batch(child);const groups=new Map();for(const node of [...parent.children])if(node.isMesh){node.updateMatrix();const geometry=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();geometry.applyMatrix4(node.matrix);if(!groups.has(node.material))groups.set(node.material,[]);groups.get(node.material).push(geometry);parent.remove(node);node.geometry.dispose();owned.delete(node.geometry);}
        for(const[material,parts]of groups){const geometry=mergeGeometries(parts,false);parts.forEach(g=>g.dispose());owned.add(geometry);parent.add(new THREE.Mesh(geometry,material));}}
    batch(root);
    return{root,wings,tails,limbs,height:spec.height||2.3,replaceBody:['susanoo','kurama'].includes(spec.model),
        update(time,{flying=false,moving=false}={}){const t=reduced?0:time;wings.forEach((w,i)=>{w.rotation.y=(i?1:-1)*(flying?.18+Math.sin(t*3)*.2:1.25+Math.sin(t*1.3)*.04);});tails.forEach((tail,i)=>{tail.rotation.y=(i-4)*.42+Math.sin(t*1.8+i*.6)*.09;tail.rotation.x=.12+Math.cos(t*1.2+i)*.09;});limbs.forEach(({node,side,kind})=>{node.rotation.x=flying?(kind==='leg'?.3:-.25):moving?Math.sin(t*7+(side<0?Math.PI:0))*(kind==='leg'?.3:-.2):0;});},
        dispose(){owned.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());root.clear();}
    };
}
