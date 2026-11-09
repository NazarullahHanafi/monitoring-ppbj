// One private projection, with shared geometries and no render targets/textures.
export function createOfficeHologramProjection(THREE, scene) {
    const root=new THREE.Group(),screen=new THREE.Group(),geometries=[],materials=[];root.visible=false;root.userData.officeHologram=true;scene.add(root);root.add(screen);
    const material=(color,opacity)=>{const m=new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide});materials.push(m);return m;};
    const cyan=material('#77e6ed',.4),gold=material('#ddc38c',.55),glass=material('#244f69',.035),beam=material('#70dfe5',.045);beam.blending=THREE.AdditiveBlending;
    // The projected frame sits behind the floating menu, rather than drawing
    // another empty rectangle between the menu and the avatar's head.
    screen.position.y=.85;
    const plane=new THREE.PlaneGeometry(2.9,1.6),bar=new THREE.BoxGeometry(1,1,.018),ring=new THREE.TorusGeometry(.48,.014,4,40),cone=new THREE.ConeGeometry(.95,1.6,12,1,true);geometries.push(plane,bar,ring,cone);
    const panel=new THREE.Mesh(plane,glass);screen.add(panel);
    const strips=new Map([[cyan,[]],[gold,[]]]),add=(x,y,w,h,mat=cyan)=>strips.get(mat).push({x,y,w,h});
    for(const x of[-1.45,1.45]){add(x,0,.018,1.6);for(const y of[-.8,.8])add(x-Math.sign(x)*.15,y,.3,.03,gold);}
    add(0,.8,2.9,.012);add(0,-.8,2.9,.012);add(-.55,.42,1.25,.035,gold);
    for(let i=0;i<3;i++){add(-.34,.08-i*.23,1.65-i*.2,.018);add(-1.15,.08-i*.23,.08,.08,gold);}
    for(let i=0;i<24;i++){const angle=i*Math.PI/12;add(.92+Math.cos(angle)*.28,.1+Math.sin(angle)*.28,.035,.035);}
    add(0,0,2.85,.025);let scanning=null;const scanMatrix=new THREE.Matrix4();
    for(const[mat,parts]of strips){const mesh=new THREE.InstancedMesh(bar,mat,parts.length),matrix=new THREE.Matrix4();parts.forEach((p,i)=>{matrix.makeScale(p.w,p.h,1);matrix.setPosition(p.x,p.y,.015);mesh.setMatrixAt(i,matrix);});mesh.computeBoundingSphere();screen.add(mesh);if(mat===cyan){scanning={mesh,index:parts.length-1};mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);}}
    const halo=new THREE.Mesh(ring,cyan);halo.rotation.x=-Math.PI/2;halo.position.y=-1.1;root.add(halo);
    const light=new THREE.Mesh(cone,beam);light.rotation.z=Math.PI;light.position.y=-.85;root.add(light);
    return {
        update(figure,camera,{time=0,height=1.8,reduced=false}={}){root.visible=Boolean(figure);if(!figure){root.userData.officeAbility=null;return null;}if(root.userData.officeAbility!==figure.person.id)root.traverse(node=>{if(node.isMesh)node.userData.officeHologramOwner=figure.person.id;});root.userData.officeAbility=figure.person.id;
            root.position.copy(figure.group.position);root.position.y+=height+1.55+(reduced?0:Math.sin(time*1.4)*.035);screen.quaternion.copy(camera.quaternion);halo.rotation.z=reduced?0:time*.2;scanMatrix.makeScale(2.85,.025,1);scanMatrix.setPosition(0,reduced?0:Math.sin(time*.9)*.75,.03);scanning.mesh.setMatrixAt(scanning.index,scanMatrix);scanning.mesh.instanceMatrix.needsUpdate=true;
            return root.position.clone().project(camera);},
        hide(){root.visible=false;root.userData.officeAbility=null;},dispose(){scene.remove(root);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},root,
    };
}
