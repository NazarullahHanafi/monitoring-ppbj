import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { homeLocation } from './virtual-office-home-layout.js';

// Shared, original house geometry. Instancing keeps an entire neighbourhood
// inexpensive; only the chosen home's roof and two camera-facing walls open.
export function createResidences({ scene, material, ownedGeometries }) {
    const capacity = 128, owners = Array(capacity).fill(null), slots = new Map(), parts = new Map(), meshes = [],doors=new Set();
    const matrix = new THREE.Matrix4(), rotation = new THREE.Quaternion(), unit = new THREE.Vector3(1, 1, 1);
    const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
    let selected = null, rows = 1,plots=0,interior=null;
    const palette = {
        '#cbbb9d': '#c1a771', '#c8a178': '#a78a63', '#ab8965': '#8c7055', '#d7c5a7': '#e4dcc9', '#e9dfca': '#e4dcc9',
        '#ba9f6b': '#c1a771', '#cfbb8c': '#c1a771', '#f0cb83': '#edcd8a', '#bca375': '#c1a771',
        '#f4eddf': '#eee9de', '#f8f0df': '#eee9de', '#a38360': '#a78a63', '#bda16a': '#c1a771',
        '#f2eee5': '#eee9de', '#e8e9de': '#eee9de', '#a2b1a6': '#8d9e98', '#56746a': '#47695f',
        '#a78d6c': '#a78a63', '#eee8d8': '#eee9de', '#7c9994': '#71948d', '#baa371': '#c1a771',
        '#e8dcc3': '#eee9de', '#b49a76': '#a78a63', '#a58a64': '#a78a63', '#8c7556': '#8c7055',
        '#eee2c6': '#eee9de', '#aa9270': '#a78a63', '#879f93': '#91aaa1', '#e2ca9e': '#c1a771'
    };
    function bake(geometry, color, x, y, z, layer = 'inside', rz = 0) {
        color = palette[color] || color;
        let g = geometry;
        if (g.index) { g = geometry.toNonIndexed(); geometry.dispose(); }
        rotation.setFromEuler(new THREE.Euler(0, 0, rz));
        g.applyMatrix4(matrix.compose(new THREE.Vector3(x, y, z), rotation, unit));
        const key = `${layer}:${color}`;
        if (!parts.has(key)) parts.set(key, { layer, color, geometries: [] });
        parts.get(key).geometries.push(g);
    }
    const box = (w, h, d, x, y, z, color, layer = 'inside', rz = 0) => bake(new THREE.BoxGeometry(w, h, d), color, x, y, z, layer, rz);
    const cylinder = (r, h, x, y, z, color) => bake(new THREE.CylinderGeometry(r, r, h, 10), color, x, y, z);
    function sphere(r, x, y, z, color) { bake(new THREE.SphereGeometry(r, 9, 6), color, x, y, z); }
    // Foundation, garden, entrance promenade and warm oak parquet.
    box(10.3, .16, 11.7, 0, -.27, .2, '#a5ba9d');
    box(10.3, .06, 1.6, 0, -.15, 5.3, '#e4dcc9');
    box(9.5, .3, 8.1, 0, -.03, 0, '#cbbb9d');
    box(9.2, .08, 7.8, 0, .16, 0, '#c8a178');
    for (let x = -4.2; x < 4.5; x += .7) box(.018, .012, 7.6, x, .21, 0, '#ab8965');
    box(3, .22, 1, 0, -.04, 4.3, '#d7c5a7');
    box(2.4, .12, .6, 0, -.18, 4.95, '#e9dfca');
    // Opaque walls and closed door/windows preserve the sleeping home's exterior.
    box(9.4, 3.45, .18, 0, 1.9, -3.9, '#e7dec9', 'shell');
    box(.18, 3.45, 7.8, -4.6, 1.9, 0, '#e7dec9', 'shell');
    box(.18, 3.45, 7.8, 4.6, 1.9, 0, '#e7dec9', 'front');
    for(const x of[-2.7,2.7])box(4,3.45,.18,x,1.9,3.9,'#e7dec9','front');
    box(1.4,.78,.18,0,3.25,3.9,'#e7dec9','front');
    box(1.25, 2.5, .1, .65, 1.48, 0, '#647d70', 'door');
    box(.08, .36, .1, 1.08, 1.45, .08, '#ba9f6b', 'door');
    for (const x of [-2.85, 2.85]) {
        box(2.35, 1.55, .12, x, 2.05, 4.04, '#71948d', 'front');
        for (const dx of [-1.2, 0, 1.2]) box(.055, 1.65, .14, x + dx, 2.05, 4.12, '#cfbb8c', 'front');
        for (const y of [1.23, 2.87]) box(2.45, .065, .14, x, y, 4.12, '#cfbb8c', 'front');
        box(.23, .5, .14, x < 0 ? -1 : 1, 2.6, 4.08, '#f0cb83', 'front');
    }
    // A pitched slate roof with timber fascia and a small solar array.
    for (const side of [-1, 1]) {
        box(4.95, .22, 8.65, side * 2.37, 3.98, 0, '#47695f', 'roof', side * -.18);
        box(4.95, .12, .12, side * 2.37, 3.96, 4.35, '#c1a771', 'roof', side * -.18);
    }
    box(.18, .18, 8.7, 0, 4.43, 0, '#bca375', 'roof');
    for (const z of [-2, -.5, 1]) box(2.25, .06, 1.25, 2.5, 4.08, z, '#29434f', 'roof', -.18);
    // Bedroom: bed frame, padded headboard, mattress, pillow, duvet, bedside light.
    box(2.65, .4, 3.25, -2.05, .46, -1.35, '#8c7055');
    box(2.85, 1.2, .18, -2.05, .89, -3.02, '#a5b2a1');
    box(2.55, .22, 3.05, -2.05, .77, -1.35, '#f4eddf');
    box(2.18, .17, .65, -2.05, .94, -2.49, '#f8f0df');
    box(2.57, .17, 1.6, -2.05, 1.04, -.62, '#91aaa1');
    box(2.59, .03, .3, -2.05, 1.14, .02, '#cfb786');
    box(.8, .68, .75, -3.85, .56, -2.4, '#a38360');
    cylinder(.05, .35, -3.85, 1.05, -2.4, '#bda16a'); cylinder(.22, .3, -3.85, 1.34, -2.4, '#edcd8a');
    box(1.95, .48, .3, -2.15, 3.02, -3.72, '#f2eee5'); // AC
    for (let n = 0; n < 4; n++) box(1.65, .024, .03, -2.15, 2.88 + n * .045, -3.55, '#8d9e98');
    box(.07, .035, .03, -1.42, 3.08, -3.55, '#74bca6');
    // Kitchenette and fridge: closed refrigerator/freezer doors with handles.
    box(1.05, 2.08, .92, 3.65, 1.25, -2.78, '#e8e9de');
    box(1.02, .035, .04, 3.65, 1.58, -2.29, '#a2b1a6');
    for (const y of [.98, 1.91]) box(.05, .37, .08, 3.29, y, -2.25, '#56746a');
    box(2.5, .95, .86, 2.95, .7, -.75, '#a78d6c');
    box(2.62, .1, .95, 2.95, 1.22, -.75, '#eee8d8');
    box(.78, .035, .62, 3.45, 1.29, -.75, '#7c9994');
    cylinder(.035, .3, 3.45, 1.45, -1.08, '#baa371');
    cylinder(.18, .3, 2.1, 1.43, -.75, '#e8dcc3');
    box(2.45, .65, .28, 2.95, 2.47, -3.65, '#b49a76');
    // A small private bathroom screened from the bed, with shower and washbasin.
    box(1.45, .04, 1.7, .95, .24, -2.72, '#a8beba');
    box(.1, 1.2, 1.8, .16, .81, -2.72, '#dfd9c5');
    box(1.5, 1.2, .1, .95, .81, -1.8, '#dfd9c5');
    cylinder(.2, .33, .85, .43, -3.15, '#eee9de');
    box(.5, .5, .22, .85, .68, -3.65, '#eee9de');
    box(.55, .12, .42, 1.5, 1, -2.1, '#eee9de');
    cylinder(.025, 1.65, 1.5, 1.9, -3.65, '#baa371');
    // Living corner with sofa, carpet, low table, television and a reading nook.
    box(3.2, .025, 2.7, 1.6, .23, 1.65, '#d6c8af');
    box(2.35, .42, .88, 2.8, .51, 2.45, '#a7b3a0');
    box(2.35, .7, .22, 2.8, .9, 2.88, '#a7b3a0');
    for (const x of [1.55, 4.05]) box(.23, .57, 1, x, .72, 2.45, '#a7b3a0');
    box(.55, .35, .16, 2.5, .88, 2.65, '#d2b58c');
    box(1.4, .1, .8, 1.2, .72, 1.4, '#a58a64');
    for (const x of [.7, 1.7]) box(.08, .4, .6, x, .48, 1.4, '#8c7556');
    box(.4, .05, .28, 1.1, .81, 1.4, '#eee2c6');
    box(.09, 1.1, 1.8, -.05, 1.55, 1.2, '#24443e');
    box(.08, .85, 1.5, .02, 1.56, 1.2, '#6a9b92');
    box(1.5, 1.25, .34, -2.6, .85, 3.45, '#a78a63');
    for (let n = 0; n < 8; n++) box(.11, .32 + n % 2 * .1, .22, -3.2 + n * .17, 1.65, 3.45, n % 2 ? '#879f93' : '#e2ca9e');
    // Private landscaping, low timber fencing and planted pots.
    for (const x of [-4.9, 4.9]) { box(.08, .7, 10, x, .19, .1, '#aa9270'); for (const z of [-4.7, 0, 4.7]) box(.13, 1, .13, x, .36, z, '#aa9270'); }
    for (const x of [-3.6, 3.6]) { cylinder(.29, .45, x, .14, 4.65, '#b58a69'); sphere(.4, x, .68, 4.65, '#78946e'); }
    for (const { layer, color, geometries } of parts.values()) {
        const geometry = mergeGeometries(geometries, false); geometries.forEach(g => g.dispose());
        ownedGeometries.add(geometry);
        const mesh = new THREE.InstancedMesh(geometry, material(color), capacity);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.count = 0;
        mesh.userData.residenceLayer = layer; scene.add(mesh); meshes.push(mesh);
    }
    parts.clear();
    const groundGeometry = new THREE.BoxGeometry(1, 1, 1); ownedGeometries.add(groundGeometry);
    const ground = new THREE.Mesh(groundGeometry, material('#b4c5ab')); ground.userData.residenceGround = true; scene.add(ground);
    const avenue = new THREE.Mesh(groundGeometry, material('#e4dcc9')); scene.add(avenue);
    function at(index) { const p=homeLocation(index);return{x:p.x,z:p.z}; }
    function update() {
        const count = Math.max(plots,owners.reduce((last, id, index) => id === null ? last : index + 1, 0));
        rows = Math.max(1, Math.ceil(count / 8));
        for (const mesh of meshes) {
            mesh.count = count;
            for (let index = 0; index < count; index++) {
                const id = owners[index], location = at(index);
                if (interior!==null&&id!==interior || id === null&&index>=plots || id!==null&&id === (interior??selected) && ['roof', 'front'].includes(mesh.userData.residenceLayer)) mesh.setMatrixAt(index, hidden);
                else if(mesh.userData.residenceLayer==='door')mesh.setMatrixAt(index,matrix.compose(new THREE.Vector3(location.x-.65,0,location.z+3.99),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),doors.has(id)?-Math.PI/2:0),unit));
                else mesh.setMatrixAt(index, matrix.compose(new THREE.Vector3(location.x, 0, location.z), new THREE.Quaternion(), unit));
            }
            mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere();
        }
        const depth = rows * 12 + 4;
        ground.scale.set(86, .3, depth); ground.position.set(0, -.55, -20 - depth / 2);
        avenue.scale.set(1.5, .04, depth); avenue.position.set(0, -.12, -20 - depth / 2);
        ground.visible = avenue.visible = count > 0&&interior===null;
    }
    return {
        meshes,
        interior(id){interior=slots.has(id)?id:null;update();},
        slotFor:id=>slots.get(id),
        setPlots(value){plots=Math.min(capacity,Math.max(0,Number(value)||0));update();},
        sync(people) {
            const ids = new Set(people.slice(0, capacity).map(p => p.id));
            for (const [id, slot] of slots) if (!ids.has(id)) { owners[slot] = null; slots.delete(id); }
            for(const person of people.slice(0,capacity)){const slot=person.home_slot;if(Number.isInteger(slot)&&slot>=0&&slot<capacity&&slots.get(person.id)!==slot){if(slots.has(person.id))owners[slots.get(person.id)]=null;slots.delete(person.id);}}
            for(const person of people.slice(0,capacity)){const slot=person.home_slot;if(Number.isInteger(slot)&&slot>=0&&slot<capacity&&owners[slot]===null){owners[slot]=person.id;slots.set(person.id,slot);}}
            for (const id of [...ids].sort((a, b) => a - b)) if (!slots.has(id)) { const slot = owners.indexOf(null); owners[slot] = id; slots.set(id, slot); }
            if (!slots.has(selected)) selected = null;
            update();
        },
        select(id) { selected = slots.has(id) ? id : null; update(); },
        setDoor(id,open){if(open)doors.add(id);else doors.delete(id);update();},
        location(id) { const slot = slots.get(id); return slot === undefined ? null : at(slot); },
        bed(id) { const location = this.location(id); return location ? [location.x - 2.05, .92, location.z - .5] : null; },
        cameraBoxes(id) {
            const p = this.location(id); if (!p) return [];
            const box = (x, z, w, d, top) => ({ left: p.x + x - w / 2, right: p.x + x + w / 2, back: p.z + z - d / 2, front: p.z + z + d / 2, top });
            const result = [box(-4.6, 0, .18, 7.8, 3.6), box(0, -3.9, 9.4, .18, 3.6), box(3.65, -2.78, 1.05, .92, 2.3), box(2.95, -.75, 2.62, .95, 1.3), box(2.8, 2.45, 2.6, 1.2, 1.3)];
            if (id !== selected) result.push(box(4.6, 0, .18, 7.8, 3.6), box(0, 3.9, 9.4, .18, 3.6));
            return result;
        },
        personForHit(hit) { return hit?.object?.userData?.residenceLayer && Number.isInteger(hit.instanceId) ? owners[hit.instanceId] : null; },
        bounds() { return { left: -43, right: 43, back: -24 - rows * 12, front: -20 }; },
        dispose() { meshes.forEach(mesh => { mesh.dispose(); scene.remove(mesh); }); scene.remove(ground, avenue); slots.clear(); owners.fill(null); }
    };
}
