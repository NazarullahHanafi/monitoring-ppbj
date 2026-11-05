import homes from '../data/virtual-office-homes.json' with {type:'json'};
export function homeLocation(slot){return Number.isInteger(slot)&&slot>=0&&slot<homes.capacity?{slot,x:homes.startX+slot%homes.columns*homes.spacingX,z:homes.startZ-Math.floor(slot/homes.columns)*homes.spacingZ}:null;}
export function homeBoxes(a,b=a,openSlot=null,plots=homes.capacity){
    const result=[],minX=Math.min(a.x,b.x)-.4,maxX=Math.max(a.x,b.x)+.4,minZ=Math.min(a.z,b.z)-.4,maxZ=Math.max(a.z,b.z)+.4;
    const firstCol=Math.max(0,Math.ceil((minX-5.1-homes.startX)/homes.spacingX)),lastCol=Math.min(homes.columns-1,Math.floor((maxX+5.1-homes.startX)/homes.spacingX));
    const firstRow=Math.max(0,Math.ceil((homes.startZ-maxZ-5.3)/homes.spacingZ)),lastRow=Math.min(Math.ceil(homes.capacity/homes.columns)-1,Math.floor((homes.startZ-minZ+5.3)/homes.spacingZ));
    for(let row=firstRow;row<=lastRow;row++)for(let col=firstCol;col<=lastCol;col++){
        const slot=row*homes.columns+col,p=homeLocation(slot);if(!p||slot>=plots)continue;
        for(const box of homes.boxes){if(box.tag==='home-door'&&slot===openSlot)continue;result.push({left:p.x+box.x-box.w/2,right:p.x+box.x+box.w/2,back:p.z+box.z-box.d/2,front:p.z+box.z+box.d/2,top:box.top,tag:box.tag});}
    }return result;
}
export function insideHome(point,home){return Boolean(home&&point&&Math.abs(point.x-home.x)<4.4&&Math.abs(point.z-home.z)<3.7);}
