// Keep authoritative world coordinates and collisions while showing one home.
import {settleOfficeCamera} from './virtual-office-camera.js';
export function createOfficeInterior({scene,residences,camera,controls,background}){
    let owner=null,self=null,saved=null;const visibility=new Map();
    function leave(){if(owner===null)return;for(const[node,value]of visibility)node.visible=value;visibility.clear();residences.interior(null);scene.background=saved.background;scene.fog=saved.fog;
        const delta=self.position.clone().sub(saved.anchor);settleOfficeCamera(controls);
        camera.position.copy(saved.position).add(delta);camera.fov=saved.fov;camera.updateProjectionMatrix();controls.target.copy(saved.target).add(delta);controls.minDistance=saved.min;controls.maxDistance=saved.max;owner=null;self=null;saved=null;}
    return{set(id,figure){if(id===owner){self=figure;return;}leave();if(id===null||!figure)return;
            settleOfficeCamera(controls);saved={background:scene.background,fog:scene.fog,position:camera.position.clone(),target:controls.target.clone(),anchor:figure.position.clone(),fov:camera.fov,min:controls.minDistance,max:controls.maxDistance};owner=id;self=figure;
            residences.interior(id);scene.background=background;scene.fog=null;controls.minDistance=2.6;controls.maxDistance=8;controls.target.copy(figure.position).y+=1.2;camera.position.copy(controls.target).add({x:3.2,y:3.4,z:4});camera.fov=58;camera.updateProjectionMatrix();
        },apply(){if(owner===null)return;scene.background=background;scene.fog=null;for(const node of scene.children){if(!visibility.has(node))visibility.set(node,node.visible);node.visible=Boolean(node.isLight||node===self||node.userData.residenceLayer||node.userData.officeAbility===owner||node.userData.officeRestMats);}},
        active:()=>owner!==null,owner:()=>owner,leave,dispose:leave};
}
