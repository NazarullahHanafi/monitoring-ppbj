import * as THREE from 'three';

// A cutaway grand salon: the open front keeps the interior and avatars visible.
// Architecture/furniture join the scene's existing material batches. No shadows,
// video textures, remote assets, flashing lights or extra real-time light passes.
export function createRivageBar({ scene, box, cylinder, orb, bake, sign, material, navigation, ownedGeometries, materials }) {
    box(23,.16,20,-30,-.29,51,'#263e39',.14);
    for(let x=-40;x<=-20;x+=2) for(let z=43;z<=59;z+=2) box(1.98,.025,1.98,x,-.18,z,((x+z)/2)%2?'#e8dfcb':'#d1c6ac',0);
    for(const x of [-41.3,-18.7]) {box(.15,.09,20,x,-.1,51,'gold',0);box(.35,1.4,19.8,x,.45,51,'deep');navigation.addBox(.35,19.8,x,51,'grand-bar-wall',1.3);}
    box(23,4.4,.3,-30,1.75,41,'deep');navigation.addBox(23,.3,-30,41,'bar-back-wall',4.2);
    for(const x of [-40,-20]) for(const z of [42.5,50.5,59.5]){
        cylinder(.35,.25,x,-.03,z,'gold');cylinder(.2,4.7,x,2.3,z,'white');cylinder(.38,.22,x,4.7,z,'gold');
        navigation.addBox(.75,.75,x,z,'grand-bar-column',4.9);
    }
    // Gilded arches and open cornices, rather than an opaque roof.
    for(const z of [42.5,50.5,59.5]){box(20,.2,.35,-30,4.8,z,'gold');for(const x of [-36,-24]){const arch=new THREE.TorusGeometry(2,.075,6,24,Math.PI);bake(arch,'gold',x,3.4,z);}}
    box(16,1.35,1.55,-30,.46,45,'oak');box(16.5,.16,1.9,-30,1.2,45,'#f0e7d3');
    box(15.7,.06,.045,-30,.87,45.81,'gold',0);navigation.addBox(16.5,1.9,-30,45,'marble-bar-counter',1.3);
    for(const z of [41.65,42.3])box(15,.14,.7,-30,1.5+(z-41.65)*2,z,'wood');
    for(let i=0;i<14;i++){const x=-36.5+i;cylinder(.11,.55,x,1.87,41.8,i%2?'#87b6a5':'#b89c68');cylinder(.04,.14,x,2.22,41.8,'gold');}
    for(const x of [-37,-34,-31,-28,-25,-22]) {cylinder(.37,.16,x,.57,47.4,'deep');cylinder(.065,.8,x,.08,47.4,'gold');cylinder(.28,.06,x,-.12,47.4,'gold');navigation.addBox(.75,.75,x,47.4,'bar-stool',.7);}
    sign('MAISON DU RIVAGE','GRAND SALON / LA CARTE / WATERFRONT',15,-30,3.3,41.22);
    // Crystal chandelier: warm metal frame and hanging crystal droplets.
    for(const [cx,cz,r] of [[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){
        cylinder(.025,1.7,cx,4.8,cz,'gold');bake(new THREE.TorusGeometry(r,.035,6,28),'gold',cx,4,cz,Math.PI/2);
        for(let n=0;n<12;n++){const a=n*Math.PI/6,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;cylinder(.014,.46,x,3.75,z,'gold');orb(.09,.19,.09,x,3.47,z,'white');}
    }
    // Velvet conversation booths, brass tables and menu stands.
    for(const x of [-38,-22]){
        box(2.1,.65,5.1,x,.15,54,'#856c8c',.18);box(.3,1,5.2,x+(x<-30?-.85:.85),.75,54,'#856c8c',.1);
        navigation.addBox(2.1,5.1,x,54,'velvet-booth',1.3);cylinder(.68,.12,x+(x<-30?1.8:-1.8),.83,54,'gold');cylinder(.06,.9,x+(x<-30?1.8:-1.8),.32,54,'gold');
        navigation.addBox(1.4,1.4,x+(x<-30?1.8:-1.8),54,'salon-table',.9);
    }
    box(8.8,.12,6.4,-30,-.04,56,'black',.07);
    const hues=['#87668e','#508a87','#b99c68','#5c708c'];
    for(let x=0;x<8;x++)for(let z=0;z<6;z++)box(1.04,.025,1.02,-33.7+x*1.06,.035,53.4+z*1.06,hues[(x+z)%4],.015);
    for(const x of [-34.5,-25.5])box(.04,.06,6.6,x,.02,56,'gold',0);
    box(5.4,1.2,1.1,-30,.51,51.1,'black');box(5.5,.12,1.2,-30,1.14,51.1,'gold');navigation.addBox(5.5,1.2,-30,51.1,'dj-console',1.3);
    for(const x of [-31.4,-28.6]){cylinder(.57,.08,x,1.24,51.1,'black');cylinder(.15,.1,x,1.3,51.1,'gold');}
    for(let n=0;n<6;n++)box(.1,.09,.22,-30.65+n*.25,1.26,51.3,'white',.01);
    for(const x of [-34.5,-25.5]){box(1,2.3,.8,x,1,51,'black');for(const y of [.45,1.35]){const cone=new THREE.CylinderGeometry(.31,.31,.05,12);bake(cone,'metal',x,y,51.43,Math.PI/2);}navigation.addBox(1,.8,x,51,'club-speaker',2.2);}
    sign('ÉCLIPSE','SOCIAL CLUB / MUSIC & DANCE',5,-30,2.7,51.82,'#e5c796');
    box(1.2,1.5,.08,-19.1,.7,59,'deep');sign('LA CARTE','CLICK TO OPEN',1.1,-19.1,.9,59.06);
    // Only eight small dynamic/click meshes; the detailed interior is batched.
    const discoMat=new THREE.MeshStandardMaterial({color:'#c6d4d0',metalness:.85,roughness:.16,flatShading:true});materials.set('rivage-disco-ball',discoMat);
    const ballGeometry=new THREE.IcosahedronGeometry(.62,2);ownedGeometries.add(ballGeometry);const ball=new THREE.Mesh(ballGeometry,discoMat);ball.position.set(-30,4.6,56);scene.add(ball);
    const beamMat=new THREE.MeshBasicMaterial({color:'#b694d0',transparent:true,opacity:.035,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});materials.set('rivage-beams',beamMat);
    const beamGeometry=new THREE.ConeGeometry(1.5,3.4,10,1,true);ownedGeometries.add(beamGeometry);const beams=[];
    for(const x of [-33,-27])for(const z of [54,58]){const beam=new THREE.Mesh(beamGeometry,beamMat);beam.position.set(x,2,z);beam.userData.rivageEffect='beam';scene.add(beam);beams.push(beam);}
    const targets=[];const targetMat=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.set('rivage-hotspot',targetMat);
    for(const [action,w,h,d,x,y,z]of [['bar',16,1.6,2,-30,.5,45],['bar',1.5,2,.25,-19.1,.9,59],['disco',5.5,1.4,1.4,-30,.6,51.1]]){
        const g=new THREE.BoxGeometry(w,h,d);ownedGeometries.add(g);const target=new THREE.Mesh(g,targetMat);target.position.set(x,y,z);target.userData.officeVenue=action;scene.add(target);targets.push(target);
    }
    const danceMaterials=hues.map(color=>{const mat=material(color);mat.emissive.set(color);return mat;});
    let enabled=true;
    return { targets, setEnabled(value){enabled=Boolean(value);}, update(now,{paused,energySaver}){
        if(!paused)ball.rotation.y=now/18000;const calm=paused||energySaver||!enabled;
        for(const mesh of beams)mesh.visible=!calm;
        for(let i=0;i<danceMaterials.length;i++)danceMaterials[i].emissiveIntensity=calm ? .13 : .2+Math.sin(now/4500+i)*.05;
    } };
}
