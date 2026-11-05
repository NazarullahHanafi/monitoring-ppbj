import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Original low-poly staff and guests. They are scenery NPCs, never user presence.
export function createOfficeHospitality({scene,navigation,ownedGeometries,materials,sign}){
    const material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.78});materials.set('hospitality',material);
    const actors=[],targets=[];
    for(const [name,x,z,female,role,color]of[
        ['NIA',-38.7,49,true,'hostess','#f1e5d0'],['CLARA',-21.3,49,true,'hostess','#213f3b'],
        ['ADRIEN',-30,43.2,false,'bartender','#f0ebdf'],['DJ LUC',-30,49.7,false,'dj','#4e445f'],
        ['GUEST',-36,59.4,true,'guest','#9e6c85'],['GUEST',-24,59.4,false,'guest','#526b84']]){
        const group=new THREE.Group();group.position.set(x,-.12,z);group.userData.hospitality=role;scene.add(group);
        const parts=[];
        function box(w,h,d,px,py,pz,color){let g=new THREE.BoxGeometry(w,h,d).toNonIndexed();g.translate(px,py,pz);const c=new THREE.Color(color),colors=new Float32Array(g.attributes.position.count*3);for(let i=0;i<colors.length;i+=3)c.toArray(colors,i);g.setAttribute('color',new THREE.BufferAttribute(colors,3));parts.push(g);}
        box(.49,.66,.32,0,1.15,0,color);box(.41,.45,.4,0,1.7,0,'#e4b492');
        box(.46,.16,.45,0,1.96,-.02,female?'#51352e':'#29272d');box(.46,female?.65:.27,.13,0,female?1.66:1.82,-.21,female?'#51352e':'#29272d');
        if(female){for(const side of[-1,1]){box(.07,.43,.29,side*.23,1.74,-.03,'#51352e');box(.05,.025,.02,side*.13,1.65,.209,'#cf8790');}box(.58,.3,.38,0,.81,0,color);}
        for(const side of[-1,1]){box(.035,.04,.025,side*.1,1.73,.207,'#253b36');box(.18,.65,.2,side*.14,.45,0,'#263e39');box(.22,.13,.33,side*.14,.08,.06,'#1c2b28');box(.16,.4,.2,side*.33,1.2,0,color);box(.15,.26,.16,side*.33,.9,.04,'#e4b492');}
        box(.09,.025,.025,0,1.58,.21,'#b66c78');
        if(role==='hostess'||role==='bartender'){box(.3,.49,.035,0,1.02,.18,female?'#c6a971':'#253e38');box(.08,.06,.03,.12,1.4,.18,'#d8bd7d');box(.1,.07,.04,0,1.44,.19,'#374941');box(.45,.04,.3,.36,.89,.17,'#c5ab71');box(.11,.17,.11,.34,.99,.17,'#e7e2d3');}
        const geometry=mergeGeometries(parts,false);parts.forEach(p=>p.dispose());ownedGeometries.add(geometry);const mesh=new THREE.Mesh(geometry,material);mesh.userData.officeVenue=role==='dj'?'disco':'bar';group.add(mesh);targets.push(mesh);actors.push(group);
        navigation.addBox(.68,.68,x,z,'hospitality-npc',2.1);
        if(role==='hostess')sign(name,'NPC / PELAYAN RIVAGE',2.2,x,2.4,z);
    }
    return {targets,update(now,paused){actors.forEach((actor,i)=>{actor.rotation.y=i<2?Math.sin((paused?0:now)/4500+i)*.1:0;actor.children[0].position.y=paused?0:Math.sin(now/1800+i)*.018;});}};
}
