// Small 2D navigation grid for walking avatars. Segment tests prevent tunnelling
// through thin nets/walls; seats/beds remain intentional stationary poses.
import layout from '../data/virtual-office-layout.json' with { type: 'json' };
import { homeBoxes,homeLocation,insideHome } from './virtual-office-home-layout.js';
import motion from '../data/virtual-office-motion.json' with {type:'json'};
export function createOfficeNavigation() {
    const obstacles = [], {minX,maxX,minZ,maxZ}=layout.bounds, cell = .5, radius = .3;
    const width = Math.round((maxX - minX) / cell) + 1, height = Math.round((maxZ - minZ) / cell) + 1;
    let grid = null,homesEnabled=false,openHome=null,homePlots=128;
    const extra=(a,b=a)=>homesEnabled?homeBoxes(a,b,openHome,homePlots):[];
    const vaultable=box=>box.top<=motion.vault_height&&motion.vault_tags.includes(box.tag);
    function free(x, z, y=-.12) {
        return x >= minX + radius && x <= maxX - radius && z >= minZ + radius && z <= maxZ - radius
            && !obstacles.concat(extra({x,z})).some(b => !(vaultable(b)&&y>=b.top+.075)&&x > b.left - radius && x < b.right + radius && z > b.back - radius && z < b.front + radius);
    }
    function segment(a, b) {
        if (!free(b.x, b.z,b.y??-.12)) return false;
        for (const box of obstacles.concat(extra(a,b))) {
            let low = 0, high = 1;
            for (const [axis, start, end] of [['x', box.left - radius, box.right + radius], ['z', box.back - radius, box.front + radius]]) {
                const delta = b[axis] - a[axis];
                if (Math.abs(delta) < 1e-8) { if (a[axis] <= start || a[axis] >= end) { low = 2; break; } }
                else { const t1 = (start - a[axis]) / delta, t2 = (end - a[axis]) / delta; low = Math.max(low, Math.min(t1, t2)); high = Math.min(high, Math.max(t1, t2)); }
            }
            if (low <= high && high > 0 && low < 1) {
                const ay=a.y??-.12,by=b.y??-.12;
                if(vaultable(box)&&Math.min(ay+(by-ay)*Math.max(0,low),ay+(by-ay)*Math.min(1,high))>=box.top+.075)continue;
                return false;
            }
        }
        return true;
    }
    function build() {
        if (grid) return;
        grid = new Uint8Array(width * height).fill(1);
        for(let z=0;z<height;z++)for(let x=0;x<width;x++)if(x===0||z===0||x===width-1||z===height-1)grid[z*width+x]=0;
        for(const b of obstacles.concat(extra({x:minX,z:minZ},{x:maxX,z:maxZ}))){const left=Math.max(0,Math.ceil((b.left-.4-minX)/cell)),right=Math.min(width-1,Math.floor((b.right+.4-minX)/cell)),back=Math.max(0,Math.ceil((b.back-.4-minZ)/cell)),front=Math.min(height-1,Math.floor((b.front+.4-minZ)/cell));
            for(let z=back;z<=front;z++)for(let x=left;x<=right;x++)grid[z*width+x]=0;}
    }
    function avoids(a, b, people) {
        const dx = b.x - a.x, dz = b.z - a.z, length = dx * dx + dz * dz;
        return people.every(p => { const t = length ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / length)) : 0; return Math.hypot(a.x + dx * t - p.x, a.z + dz * t - p.z) >= .62; });
    }
    function nearest(point, occupancy = null, people = []) {
        build(); const cx = Math.round((point.x - minX) / cell), cz = Math.round((point.z - minZ) / cell);
        let best = -1, distance = Infinity;
        for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
            const x = cx + dx, z = cz + dz, index = z * width + x;
            if (x < 0 || z < 0 || x >= width || z >= height || !(occupancy || grid)[index]) continue;
            const d = (minX + x * cell - point.x) ** 2 + (minZ + z * cell - point.z) ** 2;
            if (free(point.x, point.z) && !segment(point, { x: minX + x * cell, z: minZ + z * cell })) continue;
            if (!avoids(point, { x: minX + x * cell, z: minZ + z * cell }, people)) continue;
            if (d < distance) { best = index; distance = d; }
        }
        return best;
    }
    function point(index) { return { x: minX + index % width * cell, z: minZ + Math.floor(index / width) * cell }; }
    function path(from, to, people = []) {
        if (segment(from, to) && avoids(from, to, people)) return [{ x: to.x, z: to.z }];
        build(); const walk = people.length ? grid.slice() : grid;
        for (const person of people) { const cx = Math.round((person.x - minX) / cell), cz = Math.round((person.z - minZ) / cell); for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const x = cx + dx, z = cz + dz; if (x >= 0 && z >= 0 && x < width && z < height && Math.hypot(minX + x * cell - person.x, minZ + z * cell - person.z) < .76) walk[z * width + x] = 0; } }
        const start = nearest(from, walk, people), goal = nearest(to, walk, people); if (start < 0 || goal < 0) return [];
        const heap = [], scores = new Float64Array(width * height).fill(Infinity), previous = new Int32Array(width * height).fill(-1), closed = new Uint8Array(width * height);
        const heuristic = i => Math.abs(i % width - goal % width) + Math.abs(Math.floor(i / width) - Math.floor(goal / width));
        function push(index, score) { heap.push({ index, score }); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p].score <= score) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } }
        function pop() { const first = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; while (true) { let n = i, l = i * 2 + 1, r = l + 1; if (l < heap.length && heap[l].score < heap[n].score) n = l; if (r < heap.length && heap[r].score < heap[n].score) n = r; if (n === i) break; [heap[i], heap[n]] = [heap[n], heap[i]]; i = n; } } return first.index; }
        scores[start] = 0; push(start, heuristic(start)); let visited = 0;
        while (heap.length && visited++ < width * height) {
            const current = pop(); if (closed[current]) continue; closed[current] = 1;
            if (current === goal) {
                const result = []; let at = current;
                while (at !== start) { result.push(point(at)); at = previous[at]; } result.reverse();
                if (free(to.x, to.z) && segment(result.at(-1) || point(start), to) && avoids(result.at(-1) || point(start), to, people)) result.push({ x: to.x, z: to.z });
                if (free(from.x, from.z)) result.unshift(point(start));
                return result;
            }
            const x = current % width, z = Math.floor(current / width);
            for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nx = x + dx, nz = z + dz, next = nz * width + nx;
                if (nx < 0 || nz < 0 || nx >= width || nz >= height || !walk[next] || closed[next]) continue;
                if (!segment(point(current), point(next)) || !avoids(point(current), point(next), people)) continue;
                const score = scores[current] + 1;
                if (score < scores[next]) { scores[next] = score; previous[next] = current; push(next, score + heuristic(next)); }
            }
        }
        return [];
    }
    return {
        configureHomes(enabled,slot=null,plots=homePlots){if(homesEnabled===Boolean(enabled)&&slot===openHome&&plots===homePlots)return;homesEnabled=Boolean(enabled);openHome=slot;homePlots=plots;grid=null;},
        withHomeAccess(slot,callback){if(!homesEnabled||slot===undefined||slot===openHome)return callback();const previous=openHome,previousGrid=grid;openHome=slot;grid=null;try{return callback();}finally{openHome=previous;grid=previousGrid;}},
        groundHeight(point){const col=Math.round((point.x+36.75)/10.5),row=Math.round((-28-point.z)/12);let ground=homesEnabled&&col>=0&&col<8&&row>=0&&insideHome(point,homeLocation(row*8+col))?.22:-.12;
            for(const b of obstacles.concat(extra(point)))if(vaultable(b)&&(point.y??-.12)>=b.top+.07&&point.x>b.left-radius&&point.x<b.right+radius&&point.z>b.back-radius&&point.z<b.front+radius)ground=Math.max(ground,b.top+.08);return ground;},
        boxes:()=>obstacles.map(b=>({...b})),
        slide(from,to){const end={...to,y:to.y??from.y};if(segment(from,end))return{x:to.x,z:to.z};if(segment(from,{...end,z:from.z}))return{x:to.x,z:from.z};if(segment(from,{...end,x:from.x}))return{x:from.x,z:to.z};return{x:from.x,z:from.z};},
        addBox(w, d, x, z, tag = '', top = 2) { obstacles.push({ left: x - w / 2, right: x + w / 2, back: z - d / 2, front: z + d / 2, top, tag }); grid = null; },
        cameraLimit(from, to, extra = []) {
            let limit = 1;
            for (const b of obstacles.concat(extra)) {
                let low = 0, high = 1;
                for (const [axis, start, end] of [['x', b.left - .15, b.right + .15], ['z', b.back - .15, b.front + .15], ['y', -.3, b.top + .15]]) {
                    const delta = to[axis] - from[axis];
                    if (Math.abs(delta) < 1e-8) { if (from[axis] < start || from[axis] > end) { low = 2; break; } }
                    else { const a = (start - from[axis]) / delta, c = (end - from[axis]) / delta; low = Math.max(low, Math.min(a, c)); high = Math.min(high, Math.max(a, c)); }
                }
                if (low <= high && low > .01 && low < limit) limit = Math.max(.02, low - .015);
            }
            return limit;
        },
        free, segment, path, nearest(pointValue) { const index = nearest(pointValue); return index < 0 ? null : point(index); },
        move(from, target, step) {
            const d = Math.hypot(target.x - from.x, target.z - from.z), t = d > 0 ? Math.min(1, step / d) : 0;
            const next = { x: from.x + (target.x - from.x) * t, z: from.z + (target.z - from.z) * t };
            return segment(from, next) ? next : { x: from.x, z: from.z };
        }
    };
}
