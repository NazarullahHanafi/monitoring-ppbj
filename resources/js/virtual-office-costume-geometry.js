import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function costumeGeometry(preset,section,cache,owned) {
    const key=preset.id+':'+section;if(cache.has(key))return cache.get(key);const parts=[];
    function add(g,color,x,y,z,rz=0){if(rz)g.rotateZ(rz);g.translate(x,y,z);const flat=g.index?g.toNonIndexed():g;if(flat!==g)g.dispose();const tint=new THREE.Color(color),colors=new Float32Array(flat.attributes.position.count*3);for(let i=0;i<colors.length;i+=3){colors[i]=tint.r;colors[i+1]=tint.g;colors[i+2]=tint.b;}flat.setAttribute('color',new THREE.BufferAttribute(colors,3));parts.push(flat);}
    const box=(w,h,d,color,x,y,z,rz=0)=>add(new THREE.BoxGeometry(w,h,d),color,x,y,z,rz);
    const cyl=(r,h,color,x,y,z,top=r)=>add(new THREE.CylinderGeometry(top,r,h,10),color,x,y,z);
    const {accent,hair,motif,accessory,hairStyle,shirt}=preset;
    if(section==='head'){
        box(.49,.16,.45,hair,0,.23,-.02);box(.45,hairStyle==='long'?.72:.29,.13,hair,0,hairStyle==='long'?-.13:.07,-.22);
        if(['bob','long','side','split','ponytail'].includes(hairStyle))for(const side of [-1,1])box(.09,hairStyle==='long'?.6:.33,.32,hair,side*.24,-.02,-.03);
        if(hairStyle==='spiky')for(let i=0;i<7;i++)add(new THREE.ConeGeometry(.11,.27+(i%3)*.06,5),hair,(i-3)*.066,.39+Math.sin(i)*.025,-.06,(i-3)*-.16);
        if(hairStyle==='split')box(.245,.18,.46,accent,.123,.24,-.015);
        if(hairStyle==='side')box(.26,.25,.05,hair,-.12,.08,.218,-.18);
        if(hairStyle==='ponytail')box(.27,.5,.25,hair,0,-.15,-.37);
        if(accessory.includes('headband')){box(.49,.075,.045,'#303d4b',0,.13,.225);box(.22,.07,.025,'#c6cbd0',0,.13,.254);box(.055,.025,.01,'#4d6170',0,.13,.27);}
        if(accessory==='mask-headband'){box(.44,.18,.035,accent,0,-.12,.22);box(.17,.07,.025,'#7e8d97',-.1,.09,.25,-.15);}
        if(accessory==='strawhat'){cyl(.43,.045,'#dac17e',0,.35,0);cyl(.29,.2,'#e3ce8d',0,.46,0,.23);cyl(.293,.055,shirt,0,.395,0);}
        if(accessory==='antlerhat'){cyl(.37,.05,accent,0,.33,0);cyl(.28,.27,accent,0,.46,0);box(.055,.17,.025,'#f1e8db',0,.46,.28);box(.17,.055,.025,'#f1e8db',0,.46,.29);for(const s of [-1,1]){box(.06,.33,.06,'#94745a',s*.3,.64,0,s*-.3);box(.15,.055,.06,'#94745a',s*.36,.72,0);}}
        if(accessory==='bamboo'){const g=new THREE.CylinderGeometry(.052,.052,.35,10);g.rotateZ(Math.PI/2);add(g,'#88a970',0,-.1,.255);box(.08,.07,.03,accent,.23,.23,-.03);}
        if(accessory==='turban'){cyl(.3,.17,accent,0,.29,0);box(.39,.07,.46,'#d9d4c4',0,.34,0);}
        if(accessory==='goggles'||accessory==='glasses')for(const side of [-1,1]){box(.19,.12,.06,accent,side*.12,accessory==='goggles'?.23:.04,.235);box(.13,.07,.025,'#849d9a',side*.12,accessory==='goggles'?.23:.04,.271);}
        if(accessory==='boarhood'){box(.52,.42,.43,'#95939c',0,.04,-.02);box(.2,.12,.12,'#c3a2a5',0,-.08,.24);for(const s of [-1,1]){box(.12,.2,.08,'#aba2a6',s*.2,.31,0,s*-.35);box(.06,.055,.025,'#84aabb',s*.14,.07,.208);}}
        if(accessory==='butterfly')for(const s of [-1,1])box(.18,.17,.045,accent,s*.15,.31,-.12,s*.4);
        if(accessory==='earrings')for(const s of [-1,1])box(.045,.15,.035,'#e9d6bc',s*.26,-.19,.02);
        if(preset.id==='naruto')for(const side of [-1,1])for(let i=0;i<3;i++)box(.08,.012,.01,'#9f7055',side*.15,-.055-i*.033,.208,side*.1);
    } else {
        box(.48,.08,.37,accent,0,.89,0);
        if(['zipper','vest','jacket','suit','buttons'].includes(motif)){
            box(.028,.53,.035,accent,0,1.23,.19);for(const side of [-1,1])box(.14,.37,.04,accent,side*.14,1.26,.19,side*.08);
            if(motif==='suit'){box(.17,.44,.035,'#ded9c8',0,1.25,.2);box(.05,.29,.025,accent,0,1.3,.23);}
            if(motif==='buttons')for(let i=0;i<3;i++)box(.03,.03,.035,'#eee2ba',0,1.13+i*.12,.23);
        }
        if(motif==='checks'||motif==='triangles'||motif==='clouds')for(let row=0;row<4;row++)for(let col=0;col<4;col++){
            const x=(col-1.5)*.112,y=1+row*.13;
            if(motif==='checks'&&(row+col)%2===0)box(.11,.127,.025,accent,x,y,.19);
            if(motif==='triangles'&&(row+col)%2===0)add(new THREE.ConeGeometry(.035,.065,3),accent,x,y,.205);
            if(motif==='clouds'&&row%2===0&&col%2===0){box(.13,.045,.03,accent,x,y,.2);cyl(.04,.03,accent,x,y+.035,.2);}
        }
        if(motif==='circle')add(new THREE.TorusGeometry(.09,.018,5,16),accent,0,1.22,.205);
        if(['sash','gi','kimono','harness','cross','hero','split','armor','butterfly','cape','fur'].includes(motif)){
            if(motif==='armor'){box(.43,.33,.08,accent,0,1.29,.21);for(let i=0;i<3;i++)box(.32,.015,.02,'#b6a273',0,1.19+i*.07,.26);}
            else if(motif==='split')box(.23,.54,.04,accent,.12,1.2,.19);
            else if(motif==='cape'){box(.65,.89,.07,accent,0,1.14,-.23);box(.65,.15,.43,accent,0,1.49,-.03);}
            else if(motif==='butterfly'){for(const side of [-1,1])box(.12,.51,.07,accent,side*.24,1.22,.16);box(.6,.23,.08,accent,0,.89,-.2);}
            else for(const side of [-1,1])box(.065,.52,.04,accent,side*.1,1.23,.2,side*(motif==='cross'?.52:.22));
        }
        if(['sword','swords','backsword'].includes(accessory))for(let i=0;i<(accessory==='swords'?3:1);i++){const x=.3+i*.06;box(.055,.83,.055,'#373d4a',x,.92,-.18,-.25);box(.09,.23,.07,accent,x+.1,1.4,-.18,-.25);}
        if(accessory==='neckmask')box(.46,.13,.41,'#bcc6c0',0,1.51,.02);
        if(['gloves','gauntlets','roundcuffs','bracelet'].includes(accessory))for(const side of [-1,1])box(accessory==='gauntlets'?.27:.2,.2,.24,accent,side*.37,.99,.05);
    }
    const geometry=mergeGeometries(parts,false);parts.forEach(g=>g.dispose());owned.add(geometry);cache.set(key,geometry);return geometry;
}
