import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { poseFor, games, gameFor, safeAvatar, isOfficeNight } from './virtual-office-state.js';
import { createResidences } from './virtual-office-residences.js';
import { createOfficeNavigation } from './virtual-office-navigation.js';
import { createOfficeEnvironment } from './virtual-office-environment.js';
import { createRivageBar } from './virtual-office-bar.js';
import { createPilotPhysics, nearVenue, officeLayout } from './virtual-office-pilot-physics.js';
import { costumeFor } from './virtual-office-costumes.js';
import { costumeGeometry } from './virtual-office-costume-geometry.js';
import { officeCameraPosition,settleOfficeCamera } from './virtual-office-camera.js';
import { homeLocation,insideHome } from './virtual-office-home-layout.js';
import { createOfficeHospitality } from './virtual-office-hospitality.js';
import { animateOfficeAvatar,planOfficeRest } from './virtual-office-avatar-animation.js';
import { createOfficeAbilities,skillsFor } from './virtual-office-abilities.js';
import { createTransformationModel } from './virtual-office-transform-geometry.js';
import { createOfficeInterior } from './virtual-office-interior.js';
import { createOfficeHologramProjection } from './virtual-office-hologram-geometry.js';

// Original procedural scene: no models, textures, or code from the reference site.
// Static furniture is batched by material; animation is capped at 30fps / 24 avatars.
export function createOfficeScene({ host, labels, onSelect, onFailure, onVenue = () => {}, onGame = () => {}, onDoor=()=>{},onPilotState = () => {},
    onHologramAnchor=()=>{},rendererFactory = options => new THREE.WebGLRenderer(options), controlsFactory = (camera, element) => new OrbitControls(camera, element), getDate = () => new Date() }) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 1200);
    const renderer = rendererFactory({ antialias: true, alpha: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.18;
    host.append(renderer.domElement);
    const controls = controlsFactory(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = .09; controls.minDistance = 8; controls.maxDistance = 650;
    controls.minPolarAngle = .32; controls.maxPolarAngle = 1.28; controls.target.set(0, 0, 0);
    controls.enablePan = true; controls.panSpeed = .7; controls.rotateSpeed = .55; controls.enableKeys = false;
    const hemi = new THREE.HemisphereLight('#fbf3dc', '#526c61', 2.8); scene.add(hemi);
    const sun = new THREE.DirectionalLight('#fff1cf', 3.2); sun.position.set(-12, 25, 15); scene.add(sun);
    const fill = new THREE.DirectionalLight('#cce5ef', 1.1); fill.position.set(15, 10, -10); scene.add(fill);
    const materials = new Map(), batches = new Map(), ownedGeometries = new Set(), textures = new Set(), figures = new Map();
    const navigation = createOfficeNavigation();
    const abilities=createOfficeAbilities({THREE,scene,navigation,reduced:()=>paused||energySaver,createModel:(spec,options)=>createTransformationModel(THREE,spec,{...options,reduced:paused||energySaver})});
    const hologram=createOfficeHologramProjection(THREE,scene);let hologramId=null,lastHologramAnchor=0;
    const colors = { base: '#acb9ad', floor: '#f1ece0', edge: '#cebd9c', wood: '#b38b61', woodLight: '#d6b68a', oak: '#705b42',
        wall: '#e5e3d5', stone: '#c4cec5', deep: '#214b40', green: '#537d60', leaf: '#4a7750', lightLeaf: '#86a465',
        pot: '#e2d5bb', white: '#f5f0e5', metal: '#3c4d46', gold: '#b89c68', screen: '#173841', screenLine: '#62baaa',
        rug: '#dbd5bf', sofa: '#9eafa1', pillow: '#d2b48b', black: '#22322d', teal: '#87b6a5', glass: '#9ccfc6' };
    function material(key) {
        if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color: colors[key] || key, roughness: key === 'metal' ? .4 : .82, metalness: key === 'gold' ? .45 : .02,
            ...(key === 'glass' ? { transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide } : {}) }));
        return materials.get(key);
    }
    const restGeometry=new THREE.BoxGeometry(1.1,.035,2.2);ownedGeometries.add(restGeometry);
    const restMats=new THREE.InstancedMesh(restGeometry,material('#c9b384'),24);restMats.instanceMatrix.setUsage(THREE.DynamicDrawUsage);restMats.count=0;restMats.frustumCulled=false;scene.add(restMats);
    restMats.userData.officeRestMats=true;
    const restMatrix=new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    function bake(geometry, key, x, y, z, rx = 0, ry = 0, rz = 0) {
        let g = geometry;
        if (geometry.index) { g = geometry.toNonIndexed(); geometry.dispose(); }
        quaternion.setFromEuler(new THREE.Euler(rx, ry, rz));
        g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), quaternion, new THREE.Vector3(1, 1, 1)));
        if (!batches.has(key)) batches.set(key, []); batches.get(key).push(g);
    }
    function box(w, h, d, x, y, z, key, radius = .035, ry = 0) { bake(radius > 0 ? new RoundedBoxGeometry(w, h, d, 1, Math.min(radius, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d), key, x, y, z, 0, ry); }
    function cylinder(r, h, x, y, z, key, top = r) { bake(new THREE.CylinderGeometry(top, r, h, 12), key, x, y, z); }
    function orb(w, h, d, x, y, z, key) { const g = new THREE.SphereGeometry(1, 10, 7); g.scale(w, h, d); bake(g, key, x, y, z); }
    function plant(x, z, scale = 1) {
        navigation.addBox(.85 * scale, .85 * scale, x, z, 'plant', 2 * scale);
        cylinder(.4 * scale, .7 * scale, x, .35 * scale, z, 'pot', .31 * scale);
        cylinder(.045 * scale, 1.4 * scale, x, 1.2 * scale, z, 'oak');
        for (let i = 0; i < 5; i++) { const a = i * 2.4; orb(.48 * scale, .52 * scale, .25 * scale, x + Math.cos(a) * .3 * scale, (1.4 + i * .15) * scale, z + Math.sin(a) * .25 * scale, i % 2 ? 'leaf' : 'lightLeaf'); }
    }
    function sign(text, sub, width, x, y, z, color = '#f2e8d5', ry = 0) {
        const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 192;
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 768, 192); ctx.fillStyle = color;
        ctx.textAlign = 'center'; ctx.font = '500 66px Georgia'; ctx.fillText(text, 384, 88);
        ctx.font = '20px Arial'; ctx.fillText(sub, 384, 139);
        const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.add(texture);
        const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
        const geometry = new THREE.PlaneGeometry(width, width / 4); ownedGeometries.add(geometry);
        const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x, y, z); mesh.rotation.y = ry; scene.add(mesh);
        materials.set(`sign-${text}`, mat);
    }
    // A landscaped campus surrounds the original office. Courts and game
    // furniture are original geometry, batched by material with the building.
    box(86, .6, 96, 0, -.94, 28, 'base', .3);
    box(85.5, .14, 95.5, 0, -.57, 28, '#c6d4bc', .18);
    box(201,.1,115,0,-.25,35,'#a5b99a',.05);
    // Scenic paths extend beyond the campus; low fences mark the walkable world.
    for(const side of [-1,1]){
        box(54,.04,4,side*70,-.17,20,'#e6dfcc',0);box(4,.04,55,side*87,-.17,45,'#e6dfcc',0);
        for(let z=-20;z<92;z+=8){cylinder(.08,1.1,side*99,.35,z,'wood');box(.08,.08,8,side*99,.7,z+4,'wood',0);}
        for(const z of [34,58,80]){box(3,.4,.9,side*92,.05,z,'wood',.06);navigation.addBox(3,.9,side*92,z,'trail-bench',.7);plant(side*80,z,1);}
        sign('SCENIC WALK','BOUNDED EXPLORATION / CAMPUS GATE',7,side*58,1.7,18);
    }
    navigation.addBox(160,40,0,97,'water-boundary',.1);
    navigation.configureHomes(true);
    for(const x of[-99,99])navigation.addBox(.2,114,x,35,'scenic-fence',1.2);
    navigation.addBox(202,.2,0,91,'scenic-boundary',1.2);
    // Waterfront furnishings share the existing static geometry batches.
    box(85,.07,18,0,-.43,67,'#e4cfa5',.1);box(160,.08,48,0,-.64,100,'#6ea6ad',.1);
    for(let n=0;n<8;n++)box(120-n*8,.02,.13,0,-.57,79+n*2.8,'#c4ddd4',0);
    box(7,.07,24,0,-.4,60,'#e6dfcc',.1);
    const rivageBar=createRivageBar({scene,box,cylinder,orb,bake,sign,material,navigation,ownedGeometries,materials});
    const hospitality=createOfficeHospitality({scene,navigation,ownedGeometries,materials,sign});
    for(let n=0;n<8;n++){const x=-36+n*3.7;box(1.5,.25,2.8,x,-.1,67,'white',.1);box(1.4,.17,1,x,.26,66,'sofa',.08);navigation.addBox(1.5,2.8,x,67,'beach-chair',.6);if(n%2===0){cylinder(.05,3,x+1.2,1,65,'gold');bake(new THREE.ConeGeometry(1.8,.6,10),'white',x+1.2,2.7,65);navigation.addBox(.2,.2,x+1.2,65,'parasol',2.8);}}
    box(19,.15,10,22,-.3,65,'wood',.1);sign('LE BELVÉDÈRE','MOUNTAIN TERRACE',9,22,1.6,60.8);
    for(const x of [16,22,28]){cylinder(1.2,.13,x,.8,63,'white');cylinder(.1,1,x,.2,63,'gold');navigation.addBox(2.4,2.4,x,63,'terrace-table',.9);}
    for(const x of [-10,-6,-2]){plant(x,58,.9);for(let n=0;n<4;n++)orb(.15,.2,.15,x+(n-1.5)*.3,.9,58,'#c18b9c');}
    box(83, .08, 4, 0, -.44, 20, '#e6dfcc', .12);
    box(6, .08, 64, 0, -.44, 16, '#e6dfcc', .1);
    box(78, .08, 4, 0, -.44, 35, '#e6dfcc', .1);
    for (const x of [-41, 41]) for (const z of [-15, -2, 14, 31, 46]) {
        plant(x, z, 1.7); cylinder(.08, 3.2, x + (x < 0 ? 1 : -1), 1.15, z + 2, 'gold');
        orb(.22, .25, .22, x + (x < 0 ? 1 : -1), 2.85, z + 2, 'white');
    }
    const gameBalls = [];
    function net(x, z, width, height) {
        navigation.addBox(width, .12, x, z, 'net', height);
        for (const dx of [-width / 2, width / 2]) cylinder(.055, height, x + dx, height / 2, z, 'white');
        for (let h = .3; h <= height; h += .22) box(width, .018, .025, x, h, z, 'white', 0);
        for (let dx = -width / 2; dx <= width / 2; dx += .4) box(.012, height - .3, .018, x + dx, (height + .3) / 2, z, 'white', 0);
    }
    function gameBall(game, color, radius = .16) {
        const geometry = new THREE.SphereGeometry(radius, 10, 8); ownedGeometries.add(geometry);
        const mesh = new THREE.Mesh(geometry, material(color)); mesh.userData.officeBall=game.id;scene.add(mesh); gameBalls.push({ mesh, game });
    }
    for (const game of games) {
        const { x, z, id } = game;
        navigation.addBox(6, .14, x, z - (game.kind === 'court' ? 6 : 4.2), 'sign', 1.2);
        box(game.kind === 'court' ? 17 : 10, .12, game.kind === 'court' ? 13 : 9, x, -.29, z, id === 'tennis' ? '#a77355' : id === 'badminton' ? '#3b7e77' : id === 'basketball' ? '#b99569' : '#dce0ca', .14);
        // Low brass signboards face the open front of each area.
        box(6, 1.1, .12, x, .65, z - (game.kind === 'court' ? 6 : 4.2), 'deep');
        sign(game.name.toUpperCase(), 'RECREATION / AVATAR SIMULATION', 5.7, x, .75, z - (game.kind === 'court' ? 5.91 : 4.11));
        if (id === 'tennis' || id === 'badminton' || id === 'basketball') {
            for (const dx of [-7, 7]) box(.045, .015, 10.8, x + dx, -.21, z, 'white', 0);
            for (const dz of [-5.4, 0, 5.4]) box(14, .015, .045, x, -.21, z + dz, 'white', 0);
            if (id !== 'basketball') {
                for (const dx of [-5.7, 5.7]) box(.035, .015, 10.8, x + dx, -.2, z, 'white', 0);
                net(x, z, 14, id === 'badminton' ? 1.7 : 1.15);
                gameBall(game, id === 'tennis' ? '#d9e56b' : 'white', id === 'tennis' ? .17 : .12);
            } else {
                for (const side of [-1, 1]) {
                    cylinder(.09, 3.6, x, 1.5, z + side * 5, 'metal');
                    box(2.3, 1.35, .13, x, 3.1, z + side * 4.7, 'white');
                    const hoop = new THREE.TorusGeometry(.43, .045, 6, 20); bake(hoop, '#c67543', x, 2.8, z + side * 4.1, Math.PI / 2);
                }
                gameBall(game, '#bd6c32', .25);
            }
        } else if (id === 'golf') {
            for (const dx of [-6.5, 6.5]) navigation.addBox(.2, 8, x + dx, z, 'golf-edge', .5);
            box(13, .12, 8, x, -.15, z, '#69885c', .15);
            for (const dx of [-6.5, 6.5]) box(.2, .35, 8, x + dx, -.05, z, 'woodLight');
            for (let n = 0; n < 3; n++) { cylinder(.22, .02, x - 4 + n * 4, -.07, z + (n % 2 ? 2 : -2), 'black'); cylinder(.025, 1.5, x - 4 + n * 4, .65, z + (n % 2 ? 2 : -2), 'gold'); box(.8, .4, .03, x - 3.6 + n * 4, 1.25, z + (n % 2 ? 2 : -2), '#c78362'); }
            gameBall(game, 'white', .12);
        } else if (id === 'bowling') {
            for (const dx of [-2.7, 2.7]) navigation.addBox(.35, 11, x + dx, z, 'bowling-edge', .4);
            box(5, .09, 11, x, -.13, z, 'woodLight');
            for (const dx of [-2.7, 2.7]) box(.35, .12, 11, x + dx, -.1, z, 'oak');
            for (let row = 0; row < 4; row++) for (let n = 0; n <= row; n++) { const px = x + (n - row / 2) * .55, pz = z - 2 - row * .5; cylinder(.14, .5, px, .17, pz, 'white', .08); orb(.13, .14, .13, px, .49, pz, 'white'); }
            gameBall(game, '#786397', .28);
        } else if (id === 'arcade') {
            for (const dx of [-2.2, 2.2]) {
                navigation.addBox(2.1, 1.6, x + dx, z, 'arcade', 2.5);
                navigation.addBox(1.2, 1.2, x + dx, z + 2, 'seat', .7);
                box(2.1, 2.6, 1.6, x + dx, 1.1, z, 'deep', .1);
                box(1.6, 1.1, .05, x + dx, 1.7, z + .83, 'screen');
                for (let n = 0; n < 5; n++) box(.05, .6, .02, x + dx + (n - 2) * .2, 1.7, z + .87, n % 2 ? '#e8c877' : 'screenLine', 0);
                cylinder(.18, .06, x + dx, .9, z + 1.1, 'gold'); box(1.2, .45, 1.2, x + dx, .2, z + 2, 'sofa', .1);
            }
        } else if (id === 'archery') {
            navigation.addBox(5,.3,x,z-2,'archery-backstop',3.2);box(5,3.2,.25,x,1.2,z-2,'wood');
            for(let n=0;n<5;n++){const g=new THREE.CylinderGeometry(1.1-n*.21,1.1-n*.21,.03,24);bake(g,['white','#283e49','#73a7bf','#c36f60','gold'][n],x,1.6,z-1.82+n*.035,Math.PI/2);}
            box(5,.02,.12,x,-.18,z+2.8,'white',0);
        } else if (id === 'darts') {
            navigation.addBox(5, .22, x, z - 1.8, 'dart-board', 2.8);
            box(5, 3, .22, x, 1.25, z - 1.8, 'deep');
            for (let n = 0; n < 4; n++) { const g = new THREE.CylinderGeometry(1.05 - n * .23, 1.05 - n * .23, .025, 24); bake(g, n % 2 ? 'white' : '#bf6f59', x, 1.6, z - 1.64 + n * .025, Math.PI / 2); }
        } else {
            navigation.addBox(5.5, 3.5, x, z, 'game-table', 1.3);
            box(5.5, .25, 3.5, x, 1, z, id === 'pingpong' ? '#4c7783' : id === 'billiards' ? '#376a59' : 'woodLight', .1);
            for (const dx of [-2.2, 2.2]) for (const dz of [-1.2, 1.2]) box(.18, 1.1, .18, x + dx, .4, z + dz, 'oak');
            if (id === 'pingpong') { net(x, z, 5.5, 1.45); gameBall(game, 'white', .1); }
            if (id === 'uno') for (let n = 0; n < 16; n++) { const side = n % 4; box(.32, .035, .48, x + (side < 2 ? -1.7 + (n % 4) * .3 : 1.4), 1.16 + n * .002, z + (side % 2 ? -.9 : .9), ['#b85e55', '#c7ac54', '#4b797d', '#719263'][n % 4], .02, n * .3); }
            if (id === 'chess') for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) { box(.34, .02, .34, x + (a - 3.5) * .34, 1.14, z + (b - 3.5) * .34, (a + b) % 2 ? 'deep' : 'white', 0); if (b < 2 || b > 5) { cylinder(.075, .17, x + (a - 3.5) * .34, 1.24, z + (b - 3.5) * .34, b < 2 ? 'white' : 'black'); } }
            if (id === 'billiards') for (let n = 0; n < 10; n++) orb(.12, .12, .12, x + Math.sin(n * 2) * 1.8, 1.25, z + Math.cos(n) * .9, ['gold', 'white', 'deep'][n % 3]);
            if (id === 'foosball') for (let n = 0; n < 5; n++) { box(.045, .045, 4.5, x - 2 + n, 1.4, z, 'metal', 0); for (const dz of [-1, 0, 1]) box(.2, .45, .18, x - 2 + n, 1.48, z + dz, n % 2 ? '#ba7864' : 'deep'); }
            for (const side of [-1, 1]) { box(4, .35, .8, x, .28, z + side * 3.8, 'sofa', .1); navigation.addBox(4, .8, x, z + side * 3.8, 'bench', .5); }
        }
    }
    // Floating architectural model, warm stone base and an open front elevation.
    box(40.5, .6, 28, 0, -.6, 0, 'base', .22);
    box(39.8, .22, 27.3, 0, -.2, 0, 'edge', .1);
    box(39.4, .18, 26.9, 0, -.04, 0, 'floor', .08);
    box(37.8, .04, 13.5, 0, .07, -5.8, 'stone', .05);
    box(17.3, .055, 12.8, -9.5, .1, -5.8, '#dce3d8', .1);
    box(17.3, .055, 12.8, 9.5, .1, -5.8, '#d1ddd3', .1);
    for (let x = -18; x < 19; x += 1.9) box(.015, .015, 12.4, x, .14, -5.8, '#c3cfbf', 0);
    box(39.4, 4.8, .32, 0, 2.35, -13.25, 'wall', .04);
    box(39.4, .22, .5, 0, 4.8, -13.25, 'gold');
    box(8, 4.8, .18, 0, 2.35, -13.02, 'deep');
    for (let i = 0; i < 21; i++) box(.06, 4.6, .1, -3.8 + i * .38, 2.35, -12.87, 'wood', .01);
    box(6.8, 2.2, .16, 0, 2.8, -12.7, 'deep', .04);
    sign('SIMONPR', 'PEKANBARU  /  CONNECTED WORKSPACE', 6.2, 0, 3.05, -12.59);
    // High windows, brass frames, low glass partitions.
    for (const x of [-15, -10, 10, 15]) {
        box(4.1, 2.9, .15, x, 2.6, -13, 'glass');
        box(4.2, .08, .23, x, 4.08, -12.85, 'gold');
        box(4.2, .12, .3, x, 1.12, -12.85, 'woodLight');
        for (const dx of [-2, 0, 2]) box(.055, 2.9, .2, x + dx, 2.6, -12.86, 'gold', 0);
    }
    box(.13, 2.8, 10.8, 0, 1.55, -6.4, 'glass');
    box(.08, .08, 10.9, 0, 2.98, -6.4, 'gold', 0);
    for (const z of [-11.8, -6.4, -1]) box(.08, 2.9, .08, 0, 1.5, z, 'gold', 0);
    box(.2, 2.7, 25.7, -19.5, 1.4, -.1, 'glass');
    box(.22, .08, 25.7, -19.5, 2.8, -.1, 'gold');
    box(.2, 2.7, 25.7, 19.5, 1.4, -.1, 'glass');
    box(.22, .08, 25.7, 19.5, 2.8, -.1, 'gold');
    sign('UMUM', 'PROCUREMENT & COORDINATION', 4.4, -10, 4.35, -12.65, '#34584b');
    sign('OPERASIONAL', 'IDEAS & COLLABORATION', 4.9, 10, 4.35, -12.65, '#34584b');
    function desk(x, z, dept) {
        navigation.addBox(2.6, 1.28, x, z, 'desk', 2.3);
        box(2.6, .15, 1.28, x, 1.31, z, 'woodLight', .08);
        for (const dx of [-1.03, 1.03]) { box(.09, 1.17, 1.02, x + dx, .66, z, 'white'); box(.45, .08, .94, x + dx, .15, z, 'metal'); }
        box(1, .66, .08, x, 1.91, z - .22, 'metal');
        box(.9, .54, .02, x, 1.92, z - .166, 'screen');
        for (let i = 0; i < 3; i++) box(.28 + i * .12, .024, .025, x - .14 + i * .04, 2.03 - i * .1, z - .149, 'screenLine', 0);
        cylinder(.07, .25, x, 1.48, z - .2, 'metal');
        box(.45, .035, .25, x, 1.405, z - .19, 'metal');
        box(.71, .035, .24, x, 1.42, z + .32, 'white');
        cylinder(.09, .18, x + .9, 1.49, z + .12, 'deep');
        box(.64, .17, .64, x, .66, z + 1.02, dept === 'umum' ? 'sofa' : 'teal', .1);
        box(.65, .7, .12, x, 1.08, z + 1.33, dept === 'umum' ? 'sofa' : 'teal', .09);
        cylinder(.055, .5, x, .35, z + 1.05, 'metal');
        box(.8, .06, .14, x, .15, z + 1.05, 'metal'); box(.14, .06, .8, x, .15, z + 1.05, 'metal');
    }
    const desks = { umum: [], operasional: [] };
    for (const dept of ['umum', 'operasional']) for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) {
        const x = (dept === 'umum' ? -15 : 3.4) + col * 3.75, z = -10.3 + row * 3.15;
        desks[dept].push([x, .18, z + 1.03]); desk(x, z, dept);
    }
    // Shelves, books, a coffee bar, plants and conversational lounge seating.
    for (const x of [-18.5, 18.5]) {
        box(.7, 2.4, 4.7, x, 1.25, -8.4, 'wood');
        for (let row = 0; row < 3; row++) { box(.86, .06, 4.8, x, .65 + row * .69, -8.4, 'gold'); for (let n = 0; n < 8; n++) box(.5, .38 + (n % 2) * .12, .18, x, .88 + row * .69, -10.3 + n * .5, n % 2 ? 'white' : 'deep'); }
    }
    box(17.5, .04, 10.6, -9, .12, 7.2, 'rug', .18);
    for (const z of [4.7, 8, 11.3]) {
        box(15.8, .45, 1.05, -8.7, .57, z, 'sofa', .16);
        box(15.8, .9, .25, -8.7, .91, z - .62, 'sofa', .12);
        for (let i = 0; i < 8; i++) { box(1.72, .17, .95, -15.8 + i * 2.02, .86, z, i % 3 === 0 ? 'pillow' : 'sofa', .1); }
        for (const x of [-16.7, -.7]) box(.25, .68, 1.35, x, .8, z, 'sofa', .1);
    }
    for (const x of [-11.5, -5]) { box(2.7, .13, 1.2, x, .64, 6.6, 'woodLight', .12); for (const dx of [-.9, .9]) cylinder(.05, .48, x + dx, .37, 6.6, 'gold'); cylinder(.16, .22, x + .4, .81, 6.6, 'white'); }
    box(6.8, 1.25, .12, -9, 1.1, 2.85, 'white', .06);
    for (const x of [-11.5, -6.5]) cylinder(.04, .5, x, .32, 2.85, 'gold');
    sign('THE LOUNGE', 'GOOD COFFEE. BETTER CONVERSATIONS.', 6.4, -9, 1.2, 2.95, '#527367');
    box(10.6, .04, 10, 11.4, .13, 7.3, '#d7c9af', .1);
    box(9.4, 1.28, 1.25, 12.4, .75, 1.6, 'deep', .08);
    box(9.8, .14, 1.5, 12.4, 1.43, 1.6, 'white', .06);
    for (let i = 0; i < 23; i++) box(.055, 1.15, .07, 7.9 + i * .4, .78, 2.26, 'woodLight', .01);
    box(1.15, .93, .8, 15.3, 1.93, 1.5, 'metal', .09); box(.8, .55, .05, 15.3, 1.9, 1.94, 'black');
    cylinder(.18, .24, 14.1, 1.64, 1.5, 'white'); cylinder(.18, .24, 13.6, 1.64, 1.5, 'white');
    sign('LE CAFÉ', 'RECHARGE & RECONNECT', 4.2, 12.4, .86, 2.37);
    for (const x of [8, 13.8]) for (const z of [5.1, 9.7]) {
        cylinder(1.45, .12, x, 1.05, z, 'woodLight'); cylinder(.13, .92, x, .55, z, 'gold'); cylinder(.68, .08, x, .12, z, 'gold');
        for (const offset of [-1.6, 1.6]) { cylinder(.42, .14, x + offset, .67, z, 'deep'); cylinder(.055, .55, x + offset, .34, z, 'gold'); }
        cylinder(.18, .22, x + .4, 1.22, z, 'white'); cylinder(.22, .04, x - .3, 1.14, z + .2, 'white');
    }
    for (const [x, z, scale] of [[-18, -11.6, 1.1], [18, -11.6, 1.1], [-1.6, -12, .8], [1.6, -12, .8], [-18, 1.5, 1.1], [18, 1.5, 1.1], [-18, 11.5, 1.3], [18, 11.5, 1.2], [3, 3, .9], [3, 11, .9]]) plant(x, z, scale);
    navigation.addBox(39.4, .32, 0, -13.25, 'wall', 4.8);
    navigation.addBox(.13, 10.8, 0, -6.4, 'partition', 2.9);
    for (const x of [-19.5, 19.5]) navigation.addBox(.2, 25.7, x, -.1, 'glass-wall', 2.8);
    for (const z of [4.7, 8, 11.3]) navigation.addBox(16.1, 1.5, -8.7, z, 'sofa', 1.4);
    navigation.addBox(6.8, .15, -9, 2.85, 'lounge-sign', 1.8);
    navigation.addBox(9.8, 1.5, 12.4, 1.6, 'coffee-counter', 2.4);
    for (const x of [8, 13.8]) for (const z of [5.1, 9.7]) navigation.addBox(2.9, 2.9, x, z, 'cafe-table', 1.3);
    for (const x of [-18.5, 18.5]) navigation.addBox(.9, 4.8, x, -8.4, 'shelf', 2.6);
    for (const x of [-11.5, -5]) navigation.addBox(2.7, 1.2, x, 6.6, 'lounge-table', .8);
    for (const [key, parts] of batches) { const combined = mergeGeometries(parts, false); parts.forEach(g => g.dispose()); if (combined) { ownedGeometries.add(combined); scene.add(new THREE.Mesh(combined, material(key))); } }
    batches.clear();
    const residences = createResidences({ scene, material, ownedGeometries });
    const interior=createOfficeInterior({scene,residences,camera,controls,background:new THREE.Color('#182c2a')});
    const environment = createOfficeEnvironment({ scene, materials, ownedGeometries, sun, hemi, fill, navigation });
    // A soft ambient contact shadow is one small procedural texture, no shadow-map pass.
    const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d'), gradient = shadowCtx.createRadialGradient(64, 64, 7, 64, 64, 64); gradient.addColorStop(0, '#16382f35'); gradient.addColorStop(1, '#16382f00'); shadowCtx.fillStyle = gradient; shadowCtx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas); textures.add(shadowTexture);
    const shadowGeometry = new THREE.PlaneGeometry(66, 49); ownedGeometries.add(shadowGeometry);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }); materials.set('shadow', shadowMaterial);
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial); shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.98; scene.add(shadow);
    const avatarGeometry = new Map();
    const toolGeometries = new Map();
    function toolGeometry(kind) {
        if(toolGeometries.has(kind))return toolGeometries.get(kind);const pieces=[];
        if(kind==='archery'){const bow=new THREE.TorusGeometry(.34,.025,5,16,Math.PI);bow.rotateZ(-Math.PI/2);pieces.push(bow.toNonIndexed());bow.dispose();const arrow=new THREE.BoxGeometry(.035,.035,.85);arrow.translate(0,0,.1);pieces.push(arrow.toNonIndexed());arrow.dispose();}
        else{const g=new THREE.CylinderGeometry(.017,.03,kind==='billiards'?1.65:1,6);g.rotateX(Math.PI/2);pieces.push(g.toNonIndexed());g.dispose();}
        const combined=mergeGeometries(pieces,false);pieces.forEach(g=>g.dispose());ownedGeometries.add(combined);toolGeometries.set(kind,combined);return combined;
    }
    function avatarPart(parent, shape, dims, color, position) {
        const key = shape + dims.join(':');
        if (!avatarGeometry.has(key)) { const geometry = shape === 'sphere' ? new THREE.SphereGeometry(dims[0], 10, 8) : new RoundedBoxGeometry(...dims, 1, .06); avatarGeometry.set(key, geometry); ownedGeometries.add(geometry); }
        const mesh = new THREE.Mesh(avatarGeometry.get(key), material(color)); mesh.position.set(...position); parent.add(mesh); return mesh;
    }
    const shirts = ['#547a71', '#557591', '#ad8a62', '#856c8c', '#6f8362', '#9e7270'];
    const costumeCache=new Map(),costumeMaterial=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.8});materials.set('costume-vertex',costumeMaterial);
    function figure(person) {
        const group = new THREE.Group(); scene.add(group);
        const appearance = safeAvatar(person.avatar),costume=costumeFor(appearance.costume), feminine = (costume?.style||appearance.style) === 'feminine';
        const shirt = costume?.shirt||{ emerald: '#547a71', navy: '#405978', rose: '#b97988', cream: '#d3bc96', lavender: '#9682ae', terracotta: '#bb8265' }[appearance.color] || shirts[person.id % shirts.length];
        const body = new THREE.Group(); group.add(body); const skin = { light: '#efd0ae', warm: '#dba77d', tan: '#bc8762', deep: '#895e46' }[appearance.skin];
        const hairColor = appearance.hair === 'hijab' ? shirt : '#352c32';
        avatarPart(body, 'box', [feminine ? .43 : .5, .65, .33], shirt, [0, 1.17, 0]).userData.avatarCloth=true;
        if (!costume&&appearance.outfit === 'blazer') {
            avatarPart(body, 'box', [.15, .42, .035], 'white', [0, 1.29, .18]);
            for (const side of [-1, 1]) { const lapel = avatarPart(body, 'box', [.07, .32, .035], 'gold', [side * .12, 1.33, .19]); lapel.rotation.z = side * .25; }
        }
        if (!costume&&appearance.outfit === 'sport') avatarPart(body, 'box', [.32, .055, .02], 'white', [0, 1.3, .18]);
        const skirt = !costume&&appearance.outfit === 'dress' ? avatarPart(body, 'box', [.6, .4, .44], shirt, [0, .79, 0]) : null;
        const head = new THREE.Group(); head.position.y = 1.69; body.add(head);
        avatarPart(head, 'box', [.43, .46, .4], skin, [0, 0, 0]);
        if(costume){const hair=new THREE.Mesh(costumeGeometry(costume,'head',costumeCache,ownedGeometries),costumeMaterial),clothes=new THREE.Mesh(costumeGeometry(costume,'body',costumeCache,ownedGeometries),costumeMaterial);hair.userData.costumePart='head';clothes.userData.costumePart='body';head.add(hair);body.add(clothes);}
        else {
            const key='hair:'+appearance.hair;if(!avatarGeometry.has(key)){
                const specs=[[.47,.18,.44,0,.21,-.02],[.45,appearance.hair==='long'||appearance.hair==='hijab'?.67:.3,.12,0,appearance.hair==='long'||appearance.hair==='hijab'?-.12:.07,-.2]];
                if(appearance.hair!=='short')for(const side of[-1,1])specs.push([.09,appearance.hair==='bob'?.4:.53,.32,side*.235,-.01,-.03]);
                const parts=specs.map(([w,h,d,x,y,z])=>{const g=new THREE.BoxGeometry(w,h,d);g.translate(x,y,z);const flat=g.toNonIndexed();g.dispose();return flat;});const geom=mergeGeometries(parts,false);parts.forEach(g=>g.dispose());avatarGeometry.set(key,geom);ownedGeometries.add(geom);
            }head.add(new THREE.Mesh(avatarGeometry.get(key),material(hairColor)));
        }
        if (!costume&&appearance.hair === 'ponytail') avatarPart(head, 'box', [.24, .53, .22], hairColor, [0, -.02, -.35]);
        if (!costume&&appearance.hair === 'hijab') avatarPart(body, 'box', [.58, .18, .43], hairColor, [0, 1.44, -.04]);
        if(!avatarGeometry.has('eyes')){
            const parts=[-.095,.095].map(x=>{const g=new THREE.BoxGeometry(.035,.045,.025);g.translate(x,.035,.205);const part=g.toNonIndexed();g.dispose();return part;});
            const geometry=mergeGeometries(parts,false);parts.forEach(g=>g.dispose());avatarGeometry.set('eyes',geometry);ownedGeometries.add(geometry);
        }
        const eyeMesh=new THREE.Mesh(avatarGeometry.get('eyes'),material('#263833'));head.add(eyeMesh);const eyes=[eyeMesh];
        avatarPart(head, 'box', [.09, .02, .025], feminine ? '#b96f78' : '#9c6d58', [0, -.105, .21]);
        if (feminine) for (const x of [-.14, .14]) avatarPart(head, 'box', [.065, .025, .02], '#d39589', [x, -.065, .21]);
        if (appearance.accessory === 'glasses') {
            for (const side of [-1, 1]) { avatarPart(head, 'box', [.15, .11, .025], 'gold', [side * .105, .04, .224]); avatarPart(head, 'box', [.11, .07, .025], skin, [side * .105, .04, .24]); }
            avatarPart(head, 'box', [.08, .025, .02], 'gold', [0, .05, .24]);
        }
        if (appearance.accessory === 'headphones') { avatarPart(head, 'box', [.53, .08, .28], 'gold', [0, .32, -.02]); for (const side of [-1, 1]) avatarPart(head, 'box', [.12, .2, .18], 'deep', [side * .28, .07, 0]); }
        const arms = [];
        for (const x of [-.34, .34]) {
            const arm = new THREE.Group(); arm.position.set(x, 1.42, 0); body.add(arm);
            avatarPart(arm, 'box', [.17, .4, .2], shirt, [0, -.19, 0]).userData.avatarCloth=true;
            avatarPart(arm, 'box', [.15, .27, .16], skin, [0, -.45, .05]); arms.push(arm);
        }
        const legs = [], shoes = [];
        for (const x of [-.14, .14]) { const leg = new THREE.Group(); leg.position.set(x, .83, 0); body.add(leg); avatarPart(leg, 'box', [.18, .64, .2], costume?.pants||'#35463f', [0, -.32, 0]).userData.avatarCloth=true; shoes.push(avatarPart(leg, 'box', [.23, .14, .34], costume?.accent||(appearance.outfit === 'sport' ? 'white' : '#24352f'), [0, -.7, .07])); legs.push(leg); }
        const cup = avatarPart(arms[1], 'sphere', [.12], 'white', [0, -.49, .14]);
        const plate = avatarPart(arms[0], 'box', [.35, .045, .24], 'white', [0, -.43, .23]);
        const racket = new THREE.Group(); arms[1].add(racket); racket.position.set(0, -.48, .16);
        avatarPart(racket, 'box', [.04, .44, .05], 'gold', [0, -.14, 0]);
        const racketGeometry = new THREE.TorusGeometry(.24, .025, 6, 16); ownedGeometries.add(racketGeometry);
        racket.add(new THREE.Mesh(racketGeometry, material('white'))); racket.rotation.x = Math.PI / 2;
        const tool=new THREE.Mesh(toolGeometry('billiards'),material('gold'));tool.position.set(0,-.48,.35);arms[1].add(tool);tool.visible=false;
        const ringGeo = new THREE.RingGeometry(.5, .59, 24); ownedGeometries.add(ringGeo);
        const ringMat = new THREE.MeshBasicMaterial({ color: '#c5a061', side: THREE.DoubleSide }); materials.set(`ring-${person.id}`, ringMat);
        const ring = new THREE.Mesh(ringGeo, ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = .02; group.add(ring); ring.visible = false;
        const label = document.createElement('button'); label.type = 'button'; label.className = 'vo-avatar-label'; label.setAttribute('aria-pressed', 'false');
        const dot = document.createElement('i'), name = document.createElement('span'), icon = document.createElement('small'); label.append(dot, name, icon); labels.append(label);
        const bubble=document.createElement('span');bubble.className='vo-speech';bubble.hidden=true;label.append(bubble);
        label.addEventListener('click', () => onSelect(person.id));
        group.traverse(obj => { if (obj.isMesh) obj.userData.personId = person.id; });
        return { group, body, head, arms, legs, shoes, eyes, skirt, cup, plate, racket, tool, bubble, label, dot, name, icon, ring, person, appearance: JSON.stringify(person.avatar),
            privateGeometry: racketGeometry, target: new THREE.Vector3(), phase: person.id * 1.75 };
    }
    let selected = null, paused = false, visible = true, disposed = false, frame = null, lastFrame = 0, lastLabels = 0,lastDrawCamera=null;
    let roster = [], visitingHome = null, homeCamera = null, localMeeting = null, cameraMode = 'orbit', followId = null, energySaver = false, worldConfig = {};
    const recreation=new Map(),speechTimers=new Map();let localGame=null;
    let controlledId=null,privatePilotSelf=null,pilotPhysics=null,pilotInput={},pilotReporter=onPilotState,guide=null,pilotGate=()=>false,pilotActivity=null,restPlan=null,myHome=null,homeOwner=null,homeDoorOpen=false,homePlots=null,endingMode=false,cameraForm=null;
    const guideGeometry=new THREE.RingGeometry(1.2,1.4,32);ownedGeometries.add(guideGeometry);
    const guideMaterial=new THREE.MeshBasicMaterial({color:'#e9be69',side:THREE.DoubleSide,transparent:true,opacity:.85});materials.set('pilot-guide',guideMaterial);
    const guideMarker=new THREE.Mesh(guideGeometry,guideMaterial);guideMarker.rotation.x=-Math.PI/2;guideMarker.visible=false;guideMarker.userData.pilotGuide=true;scene.add(guideMarker);
    const peerPilots=new Map(),gameTargets=[];
    const destinations={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]};
    const targetFocus = new THREE.Vector3(), cameraGoal = new THREE.Vector3(); let easingCamera = false;
    function setPeople(people) {
        if(controlledId&&privatePilotSelf&&!people.some(p=>p.id===controlledId))people=[...people,{...privatePilotSelf,home_slot:myHome?.slot??privatePilotSelf.home_slot}];
        navigation.configureHomes(true,homeDoorOpen?myHome?.slot:null,Math.max(homePlots??0,people.length,...people.map(p=>(p.home_slot??-1)+1)));
        roster = people; residences.sync(people); environment.extent(residences.bounds().back);
        const presented = people.map(person => {
            if (!localMeeting?.connected || !localMeeting.room || ![localMeeting.room.from, localMeeting.room.to].includes(person.id)) {
                const me = people.find(p => p.is_me)?.id;
                return localMeeting && !localMeeting.connected && (person.id === me || person.meeting_with === me) ? { ...person, meeting_with: null, meeting_spot: null } : person;
            }
            return { ...person, state: 'online', meeting_with: localMeeting.room.from === person.id ? localMeeting.room.to : localMeeting.room.from, meeting_spot: localMeeting.room.spot };
        });
        const important=p=>p.id===selected||p.id===followId||p.is_me||localGame&&[localGame.from,localGame.to].includes(p.id);
        const sorted = [...presented].sort((a, b) => Number(Boolean(important(b))) - Number(Boolean(important(a)))
            || Number(Boolean(b.meeting_with)) - Number(Boolean(a.meeting_with))
            || ({ online: 0, idle: 1, offline: 2 }[a.state] - { online: 0, idle: 1, offline: 2 }[b.state]) || a.id - b.id);
        const chosen = [], seats = { umum: 0, operasional: 0 }, occupied = [], gameSeats = new Map(); let resting = 0, cafe = 0;
        for (const person of sorted) { if (chosen.length >= 24) break; if (person.state === 'online' && seats[person.department] >= 16) continue; chosen.push(person); if (person.state === 'online') seats[person.department]++; }
        const ids = new Set(chosen.map(p => p.id));
        for (const [id, f] of figures) if (!ids.has(id) || f.appearance !== JSON.stringify(chosen.find(p => p.id === id)?.avatar)) {
            abilities.forget(id);
            scene.remove(f.group); f.label.remove(); f.ring.geometry.dispose(); ownedGeometries.delete(f.ring.geometry); f.privateGeometry.dispose(); ownedGeometries.delete(f.privateGeometry); f.ring.material.dispose(); materials.delete(`ring-${id}`); figures.delete(id);
        }
        seats.umum = seats.operasional = 0;
        for (const person of chosen) {
            let f = figures.get(person.id), fresh = !f;
            if (!f) { f = figure(person); figures.set(person.id, f); }
            const previousGame = f.game?.id, previousPose = f.pose, oldHome = f.home?.clone();
            const atDesk=person.in_office===false&&person.state!=='offline';
            const remote=atDesk?null:peerPilots.get(person.id)||person.pilot;
            const manual=person.id===controlledId&&pilotPhysics?pilotPhysics.state():remote;
            f.person = person; f.pose = poseFor(person, getDate()); let placement;
            f.game = gameFor(person, getDate());
            const outing=atDesk?null:recreation.get(person.id)||person.recreation;
            const invitedGame=!atDesk&&localGame&&localGame.status!=='pending'&&[localGame.from,localGame.to].includes(person.id);
            if(invitedGame){f.game=games.find(g=>g.id===localGame.kind)||f.game;f.pose='playing';}
            else if(outing?.kind==='game'&&outing.until>Date.now()/1000&&person.state!=='offline'){f.game=games.find(g=>g.id===outing.destination)||f.game;f.pose='playing';}
            const destination=outing&&(!outing.until||outing.until>Date.now()/1000)&&destinations[outing.destination];
            f.destination=Boolean(destination);
            if(destination&&!invitedGame&&person.state!=='offline'){
                f.pose=outing.kind==='drink'?'coffee':outing.kind==='food'?'eating':outing.kind==='dance'?'dancing':'resting';placement=[destination[0]+(person.id%5)*1.6,destination[1],destination[2]+Math.floor(person.id%10/5)*1.3];
                const safe=navigation.nearest({x:placement[0],z:placement[2]});if(safe)placement=[safe.x,placement[1],safe.z];f.group.rotation.y=Math.PI;
            }
            else if (!atDesk&&person.meeting_with && Number.isInteger(person.meeting_spot)&&!invitedGame) {
                f.pose = 'meeting'; const side = person.id < person.meeting_with ? -1 : 1;
                placement = [-36 + person.meeting_spot * 6.5 + side * .9, -.12, 20]; f.facing = side < 0 ? Math.PI / 2 : -Math.PI / 2;
            }
            else if (f.pose === 'working') { placement = desks[person.department][seats[person.department]++]; f.group.rotation.y = Math.PI; }
            else if (f.pose === 'playing') {
                const n = gameSeats.get(f.game.id) || 0; gameSeats.set(f.game.id, n + 1);
                const side = n % 2 ? 1 : -1;
                placement = [f.game.x + (f.game.kind === 'court' ? side * (3 - Math.floor(n / 2) % 3 * 1.7) : Math.floor(n / 2) * .8), -.12, f.game.z + side * (f.game.kind === 'court' ? 3.6 : 2.5)]; f.group.rotation.y = side < 0 ? 0 : Math.PI;
            }
            else if (f.pose === 'sleeping') { placement = residences.bed(person.id); f.group.rotation.y = 0; }
            else if (f.pose === 'resting') { const n = resting++; placement = [-15.8 + (n % 8) * 2.02, .12, 4.7 + Math.floor(n / 8) * 3.3]; f.group.rotation.y = 0; }
            else if (cafe < 8) { const n = cafe++, table = n % 4, side = n < 4 ? 1 : -1; placement = [(table % 2 ? 13.8 : 8) + side * 1.65, .08, table < 2 ? 5.1 : 9.7]; f.group.rotation.y = side * Math.PI / 2; }
            else { const n = resting++; placement = [-15.8 + (n % 8) * 2.02, .12, 4.7 + Math.floor(n / 8) * 3.3]; f.group.rotation.y = 0; }
            if (f.pose === 'playing' && f.game.id === 'darts') placement = [f.game.x + (person.id % 2 ? -1 : 1) * 1.2, -.12, f.game.z + 2.5];
            if (['playing', 'meeting'].includes(f.pose) && !navigation.free(placement[0], placement[2])) { const safe = navigation.nearest({ x: placement[0], z: placement[2] }); if (safe) placement = [safe.x, placement[1], safe.z]; }
            if ((f.pose === 'playing'||destination) && occupied.some(p => Math.hypot(p[0] - placement[0], p[2] - placement[2]) < .7)) {
                outer: for (const radius of [.8, 1.5, 2.2]) for (let i = 0; i < 12; i++) { const x = placement[0] + Math.cos(i * Math.PI / 6) * radius, z = placement[2] + Math.sin(i * Math.PI / 6) * radius; if (navigation.free(x, z) && !occupied.some(p => Math.hypot(p[0] - x, p[2] - z) < .7)) { placement = [x, placement[1], z]; break outer; } }
            }
            if(manual&&person.state!=='offline'){
                placement=[manual.x,manual.y,manual.z];f.pose='manual';f.manual=true;f.group.rotation.y=manual.yaw;f.waypoints=[];
            }else f.manual=false;
            occupied.push(placement);
            f.target.set(...placement); f.home = f.target.clone();
            if (fresh || f.manual&&person.id===controlledId || (previousPose !== f.pose && f.pose !== 'meeting'&&!destination&&!invitedGame)) f.group.position.copy(f.target);
            if (!f.manual&&!fresh && ((f.pose === 'playing'&&(previousGame!==f.game.id||previousPose!=='playing')) || ((destination||f.pose === 'meeting') && (!oldHome || oldHome.distanceTo(f.home) > .1)))) {
                if (!navigation.free(f.group.position.x, f.group.position.z)) { const safe = navigation.nearest(f.group.position)||navigation.nearest({x:0,z:21.5}); if (safe) f.group.position.set(safe.x, placement[1], safe.z); }
                f.waypoints = navigation.withHomeAccess(residences.slotFor(person.id),()=>navigation.path(f.group.position, f.home)).map(p => new THREE.Vector3(p.x, placement[1], p.z));
            } else if (!['playing', 'meeting'].includes(f.pose)&&!destination) f.waypoints = [];
            if (paused && f.pose === 'meeting') { f.group.position.copy(f.home); f.group.rotation.y = f.facing; f.waypoints = []; }
            f.dot.className = `vo-dot ${person.state}`; f.name.textContent = person.name;
            f.icon.textContent = `${person.state === 'offline' ? 'OFFLINE ' : person.state === 'idle' ? 'JEDA ' : 'ONLINE '}${f.pose === 'meeting' ? '💬' : f.pose === 'sleeping' ? '☾ RUMAH' : f.pose === 'playing' ? f.game.icon : f.pose === 'coffee' ? '☕' : ''}`;
            if(invitedGame&&localGame.bot&&person.id===localGame.to)f.icon.textContent='OFFLINE · NPC '+f.game.icon;
            if(f.pose==='dancing')f.icon.textContent=(person.state==='idle'?'JEDA':'ONLINE')+' · ÉCLIPSE ♫';
            f.label.setAttribute('aria-label', `${person.name}, ${person.state === 'online' ? 'online' : person.state === 'idle' ? 'jeda di aplikasi' : 'tidak online'}. Lihat detail anggota.`);
            f.cup.visible = f.pose === 'coffee'; f.plate.visible = f.pose === 'eating';
            if(f.manual){f.cup.visible=manual.action==='drink';f.plate.visible=manual.action==='eat';f.icon.textContent=(person.private?'PRIVAT · ':'ONLINE · ')+(manual.action==='run'?'BOOST':manual.action==='jump'?'LOMPAT':'KENDALI SENDIRI');}
            f.racket.visible = f.pose === 'playing' && ['tennis', 'badminton', 'pingpong', 'golf'].includes(f.game.id);
            f.tool.visible=f.pose==='playing'&&['billiards','archery','darts'].includes(f.game.id);if(f.tool.visible)f.tool.geometry=toolGeometry(f.game.id);
            f.shoes.forEach(shoe => { shoe.visible = f.pose !== 'sleeping'; });
            if(!f.manual)f.eyes.forEach(eye => { eye.scale.y = f.pose === 'sleeping' ? .18 : 1; });
            f.ring.visible = selected === person.id; f.label.setAttribute('aria-pressed', String(selected === person.id));
        }
        residences.select(visitingHome ?? (figures.get(selected)?.pose === 'sleeping' ? selected : null));
        requestDraw();
    }
    const point = new THREE.Vector3();
    function drawLabels() {
        const rect = host.getBoundingClientRect(), occupied = [];
        for (const f of [...figures.values()].sort((a, b) => Number(b.person.id === selected) - Number(a.person.id === selected))) {
            if (f.pose === 'sleeping') { const house = residences.location(f.person.id); point.set(house.x, 5.2, house.z + 1); }
            else { f.group.getWorldPosition(point); point.y += (abilities.form(f.person.id)?.height||1.8)+.55; }
            point.project(camera);
            const x = (point.x + 1) / 2 * rect.width, y = (1 - point.y) / 2 * rect.height;
            if(interior.active()&&f.person.id!==controlledId){f.label.hidden=true;continue;}
            const width = 166, height = 27; const overlap = occupied.some(r => Math.abs(r.x - x) < width && Math.abs(r.y - y) < height);
            const show = point.z < 1 && point.z > -1 && x > 18 && x < rect.width - 18 && y > 15 && y < rect.height - 65 && (!overlap || f.person.id === selected);
            f.label.hidden = !show;
            if (show) { f.label.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%)`; occupied.push({ x, y }); }
        }
    }
    function render(now = 0) {
        frame = null; if (disposed || !visible) return;
        if (now - lastFrame < 1000 / 30 && !paused) { frame = requestAnimationFrame(render); return; }
        const frameStep = Math.min(.06, Math.max(.001, (now - lastFrame) / 1000)); lastFrame = now;
        if (easingCamera) { camera.position.lerp(cameraGoal, .12); controls.target.lerp(targetFocus, .12); if (camera.position.distanceTo(cameraGoal) < .04) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } }
        let restCount=0;
        for (const f of figures.values()) {
            const t = paused ? 0 : now / 1000 + f.phase;
            if(f.person.id===controlledId&&pilotPhysics){
                const yaw=Math.atan2(camera.position.x-controls.target.x,camera.position.z-controls.target.z);
                const others=[...figures.values()].filter(other=>other!==f&&other.pose!=='sleeping').map(other=>other.group.position);
                const gated=pilotGate();let input=gated?{}:pilotInput;
                if(input.x||input.z||input.jump){restPlan=null;pilotActivity=null;}
                if(restPlan)restPlan.elapsed=(restPlan.elapsed||0)+frameStep;if(restPlan?.elapsed>4){restPlan=null;pilotReporter({...pilotPhysics.state(),restBlocked:true});}
                if(restPlan&&!gated){const p=pilotPhysics.state();if(p.grounded){
                    if(!restPlan.point)restPlan.point=planOfficeRest(navigation,p,restPlan.pose,others);
                    if(!restPlan.point)restPlan=null;
                    else{const dx=restPlan.point.x-p.x,dz=restPlan.point.z-p.z,d=Math.hypot(dx,dz);if(d<.04){pilotPhysics.face({x:p.x+Math.sin(restPlan.point.yaw),z:p.z+Math.cos(restPlan.point.yaw)});pilotActivity={action:'rest',pose:restPlan.pose,venue:insideHome(p,myHome)?'home':['beach','garden','terrace','lounge','bar'].find(id=>nearVenue(p,id))||'campus'};restPlan=null;input={};}
                        else{const scale=Math.min(1,d/(4.5*frameStep))/d;input={x:(Math.cos(yaw)*dx-Math.sin(yaw)*dz)*scale,z:(-Math.sin(yaw)*dx-Math.cos(yaw)*dz)*scale};}}}}
                const mode=abilities.modeState(controlledId);if((mode?.id||null)!==cameraForm){cameraForm=mode?.id||null;setCameraMode('follow',controlledId);}pilotPhysics.setForm(abilities.form(controlledId),mode?.expires);
                const state=pilotPhysics.step(frameStep,input,yaw,others);if(['walk','run','jump','fly','land'].includes(state.action))pilotActivity=null;if(pilotActivity)Object.assign(state,pilotActivity);state.transformation=mode;state.transformationCooldown=abilities.modeCooldown(controlledId);
                state.restPending=Boolean(restPlan);
                f.group.position.set(state.x,state.y,state.z);f.group.rotation.y=state.yaw;f.manual=true;f.pose='manual';f.home.copy(f.group.position);f.target.copy(f.group.position);
                if(guide){const place=guide==='home'&&myHome?{x:myHome.x,z:myHome.z+5}:officeLayout.venues[guide];if(place){state.target=guide;state.distance=Math.round(Math.hypot(state.x-place.x,state.z-place.z));}}state.atHome=insideHome(state,myHome);state.nearDoor=Boolean(myHome&&Math.hypot(state.x-myHome.x,state.z-myHome.z-3.9)<=2.8);state.doorOpen=homeDoorOpen;
                if(myHome){const show=insideHome(state,myHome);if(show!==interior.active()){closeHomePreview();easingCamera=false;residences.select(show?homeOwner:null);if(show){cameraMode='follow';followId=controlledId;controls.enablePan=false;}}interior.set(show?homeOwner:null,show?f.group:null);state.interior=show;}else state.interior=false;
                pilotReporter({...state,interior:interior.active()});
                f.icon.textContent=(f.person.private?'PRIVAT · ':'ONLINE · ')+(state.action==='run'?'BOOST':state.action==='jump'?'LOMPAT':'KENDALI SENDIRI');
            }
            if(f.manual){
                const state=f.person.id===controlledId&&pilotPhysics?{...pilotPhysics.state(),...(pilotActivity||{})}:peerPilots.get(f.person.id)||f.person.pilot;
                if(state&&f.person.id!==controlledId){const target=new THREE.Vector3(state.x,state.y,state.z);const next=f.group.position.clone().lerp(target,.35);if(navigation.segment(f.group.position,next))f.group.position.copy(next);else f.group.position.copy(target);f.group.rotation.y=state.yaw;}
                if(f.person.id!==controlledId)abilities.observe(f.person.id,state,f);f.flight=Boolean(state?.flight);f.moving=['walk','run'].includes(state?.action);
                const skillPose=abilities.pose(f.person.id),animation=animateOfficeAvatar(f,skillPose&&!['walk','run','jump','fly','land','rest'].includes(state?.action)?{...state,action:'cast',skillPose}:state,{time:now/1000+f.phase,dt:frameStep,reduced:paused});
                const played=state?.action==='play'?games.find(g=>g.id===state.venue):null;
                f.racket.visible=Boolean(played&&['tennis','badminton','pingpong','golf'].includes(played.id));f.tool.visible=Boolean(played&&['billiards','archery','darts'].includes(played.id));if(f.tool.visible)f.tool.geometry=toolGeometry(played.id);
                f.cup.visible=state?.action==='drink';f.plate.visible=state?.action==='eat';
                if(state?.action==='rest'){
                    f.icon.textContent=state.pose==='nap'?'ONLINE · TIDUR SANTAI':state.pose==='recline'?'ONLINE · REBAHAN':state.pose==='meditate'?'ONLINE · MEDITASI':'ONLINE · BERSANTAI';
                }
                const form=abilities.form(f.person.id);if(form)f.icon.textContent=(f.person.private?'PRIVAT · ':'ONLINE · ')+form.name+(state?.flight?' · TERBANG':'');
                if(animation.lying&&(!interior.active()||f.person.id===controlledId)){restMatrix.compose(new THREE.Vector3(f.group.position.x+Math.sin(f.group.rotation.y)*.7,f.group.position.y+.035,f.group.position.z+Math.cos(f.group.rotation.y)*.7),f.group.quaternion,new THREE.Vector3(1,1,1));restMats.setMatrixAt(restCount++,restMatrix);}
                continue;
            }
            abilities.clearForm(f.person.id);
            const playing = f.pose === 'playing', walking = !paused && (playing || f.waypoints?.length > 0);
            f.target.copy(f.home);
            if (playing && !f.waypoints?.length) { f.target.x += Math.sin(t * .65) * (f.game.kind === 'court' ? 1.4 : .18); f.target.z += Math.cos(t * .5) * (f.game.kind === 'court' ? .3 : .08); }
            if (f.waypoints?.length && !paused) {
                const waypoint = f.waypoints[0], distance = f.group.position.distanceTo(waypoint);
                if (distance < .015) f.waypoints.shift();
                else { f.group.rotation.y = Math.atan2(waypoint.x - f.group.position.x, waypoint.z - f.group.position.z); moveFigure(f, waypoint, frameStep * 3.2); }
            } else if (playing) moveFigure(f, f.target, paused ? 0 : frameStep * 1.4);
            else if (f.pose === 'meeting') { moveFigure(f, f.home, paused ? 0 : frameStep * 3.2); f.group.rotation.y = f.facing; }
            else f.group.position.copy(f.home);
            f.legs.forEach((leg, i) => { leg.rotation.x = walking ? Math.sin(t * 4 + i * Math.PI) * .32 : f.pose === 'working' || f.pose === 'resting' ? -1.1 : 0; });
            f.body.position.y = Math.sin(t * 1.6) * (paused ? 0 : f.pose === 'sleeping' ? .007 : .018);
            f.body.rotation.x = f.pose === 'sleeping' ? -Math.PI / 2 : 0;
            f.body.rotation.z = playing ? Math.sin(t * 1.5) * .07 : 0;
            f.head.rotation.x = f.pose === 'sleeping' ? 0 : Math.sin(t * .6) * (paused ? 0 : .025);
            f.arms[0].rotation.x = f.pose === 'working' ? -.65 + Math.sin(t * 5) * (paused ? 0 : .045) : f.pose === 'eating' ? -1.05 : .1;
            f.arms[1].rotation.x = f.pose === 'working' ? -.65 + Math.sin(t * 5 + 1) * (paused ? 0 : .045) : f.pose === 'coffee' ? -1.2 + Math.sin(t * 1.2) * (paused ? 0 : .13) : f.pose === 'eating' ? -.8 + Math.sin(t * 2) * (paused ? 0 : .13) : .1;
            if (playing) { f.arms[1].rotation.x = -.6 + Math.sin(t * 2.3) * (paused ? 0 : .7); f.arms[0].rotation.x = -.25 + Math.sin(t * 2.3 + 1) * (paused ? 0 : .25); }
            if(f.pose==='dancing'&&!walking){f.body.rotation.z=paused?0:Math.sin(t*2.4)*.13;f.arms.forEach((arm,i)=>{arm.rotation.x=-.8+Math.sin(t*2.4+i)* (paused?0:.5);});f.legs.forEach((leg,i)=>{leg.rotation.x=paused?0:Math.sin(t*2.4+i*Math.PI)*.25;});}
            if (f.pose === 'meeting') { f.arms[1].rotation.x = -.2 + Math.sin(t * 1.7) * (paused || walking ? 0 : .18); f.head.rotation.y = Math.sin(t * .7) * (paused ? 0 : .06); }
            else f.head.rotation.y = 0;
        }
        restMats.count=restCount;restMats.instanceMatrix.needsUpdate=true;
        abilities.update(Date.now(),pilotPhysics?.state());
        const followed = figures.get(followId);
        if (cameraMode !== 'orbit' && followed && !easingCamera) {
            const nextTarget = followed.group.position.clone().add(new THREE.Vector3(0, abilities.form(followId)?.height*.55||(followed.pose === 'sleeping' ? .25 : 1.3), followed.pose === 'sleeping' ? -1.3 : 0));
            const delta = nextTarget.clone().sub(controls.target).multiplyScalar(.25); controls.target.add(delta); camera.position.add(delta);
        }
        environment.update(now, { paused, dark: document.documentElement.classList.contains('dark'), center: controls.target });
        rivageBar.update(now,{paused,energySaver});
        hospitality.update(now,paused);
        for (const { mesh, game } of gameBalls) {
            const t = paused ? 0 : now / 1000;
            const active = [...figures.values()].some(f => f.manual?(f.person.id===controlledId?pilotActivity:peerPilots.get(f.person.id)||f.person.pilot)?.action==='play'&&(f.person.id===controlledId?pilotActivity:peerPilots.get(f.person.id)||f.person.pilot)?.venue===game.id:!isOfficeNight(getDate())&&f.pose==='playing'&&f.game.id===game.id);
            const wave = active ? Math.sin(t * 1.8) : 0;
            mesh.position.set(game.x + (game.id === 'golf' ? wave * 4 : wave * 1.5), game.id === 'pingpong' ? 1.45 + Math.abs(wave) * .65 : game.id === 'basketball' ? .15 + Math.abs(wave) * 2.2 : game.id === 'bowling' || game.id === 'golf' ? .06 : .4 + Math.abs(wave) * 2, game.z + wave * (game.kind === 'court' ? 4 : 1.3));
        }
        controls.update();
        const desiredCamera=camera.position.clone(),desiredOrientation=camera.quaternion.clone();
        if (cameraMode !== 'orbit' && followed)camera.position.copy(officeCameraPosition(navigation,controls.target,desiredCamera,residences.cameraBoxes(followId),interior.active()?1.7:abilities.form(followId)?.height*.85||(cameraMode==='portrait'?2.8:3.8),interior.active()?8:abilities.form(followId)?55:35));
        camera.lookAt(controls.target);camera.updateMatrixWorld(true);if(!lastDrawCamera)lastDrawCamera=camera.clone();else lastDrawCamera.copy(camera);
        const hologramPoint=hologram.update(figures.get(hologramId),camera,{time:now/1000,height:abilities.form(hologramId)?.height||1.8,reduced:paused||energySaver});
        if(paused||now-lastHologramAnchor>100){onHologramAnchor(hologramPoint?{x:(hologramPoint.x+1)/2*host.clientWidth,y:(1-hologramPoint.y)/2*host.clientHeight,visible:hologramPoint.z>-1&&hologramPoint.z<1&&Math.abs(hologramPoint.x)<1&&Math.abs(hologramPoint.y)<1}:null);lastHologramAnchor=now;}
        interior.apply();renderer.render(scene, camera);
        if (paused || now - lastLabels > 120 || easingCamera) { drawLabels(); lastLabels = now; }
        camera.position.copy(desiredCamera);camera.quaternion.copy(desiredOrientation);camera.updateMatrixWorld(true);
        if (!paused || easingCamera || restPlan || pilotPhysics?.moving() || pilotPhysics&&pilotPhysics.state().stamina<100 || !pilotGate()&&(Math.abs(pilotInput.x||0)+Math.abs(pilotInput.z||0)>0 || pilotInput.jump)) requestDraw();
    }
    function requestDraw() { if (!disposed && visible && frame === null) frame = requestAnimationFrame(render); }
    function moveFigure(f,target,step){const home=residences.location(f.person.id),near=home&&Math.abs(f.group.position.x-home.x)<4.8&&Math.abs(f.group.position.z-home.z)<5;if(Boolean(near)!==Boolean(f.npcDoorOpen)){f.npcDoorOpen=Boolean(near);residences.setDoor(f.person.id,Boolean(near));}return navigation.withHomeAccess(residences.slotFor(f.person.id),()=>moveFigureInner(f,target,step));}
    function moveFigureInner(f, target, step) {
        const next = navigation.move(f.group.position, target, step);
        const progress = Math.hypot(next.x - f.group.position.x, next.z - f.group.position.z);
        const blocked = [...figures.values()].some(other => other !== f && other.pose !== 'sleeping' && Math.hypot(next.x - other.group.position.x, next.z - other.group.position.z) < .62);
        if (!blocked) f.group.position.set(next.x, f.home.y, next.z);
        if ((blocked || progress < .001 && f.group.position.distanceTo(target) > .2) && lastFrame >= (f.repathAt || 0) && (f.pose === 'meeting' || f.waypoints?.length)) {
            f.repathAt = lastFrame + 1500;
            const others = [...figures.values()].filter(p => p !== f && p.pose !== 'sleeping').map(p => p.group.position);
            const path = navigation.path(f.group.position, f.home, others);
            if (path.length) f.waypoints = path.map(p => new THREE.Vector3(p.x, f.home.y, p.z));
        }
    }
    function resize() { if (disposed) return; const rect = host.getBoundingClientRect(); if (rect.width < 1 || rect.height < 1) return; renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); requestDraw(); }
    function closeHomePreview(restore=true){
        visitingHome=null;const saved=homeCamera;homeCamera=null;if(!saved)return;
        residences.select(null);if(!restore)return;
        settleOfficeCamera(controls);const anchor=figures.get(saved.followId)?.group.position;
        const delta=saved.anchor&&anchor?anchor.clone().sub(saved.anchor):new THREE.Vector3();
        cameraMode=saved.mode;followId=saved.followId;controls.enablePan=saved.pan;controls.minDistance=saved.min;controls.maxDistance=saved.max;
        camera.fov=saved.fov;camera.updateProjectionMatrix();camera.position.copy(saved.position).add(delta);controls.target.copy(saved.target).add(delta);targetFocus.copy(saved.focus).add(delta);cameraGoal.copy(saved.goal).add(delta);easingCamera=saved.easing;
    }
    function focusRoom(room = 'all') {
        if(interior.active()){setCameraMode('follow',controlledId);return;}
        closeHomePreview(false);settleOfficeCamera(controls);
        cameraMode = 'orbit'; followId = null; camera.fov = 36; camera.updateProjectionMatrix(); controls.enablePan = true; controls.minDistance = 8; controls.maxDistance = 650;
        const narrow = host.clientWidth < 600, views = { all: [[0, 0, 14], [86, 90, 125]], office: [[0, 0, 0], [34, 31, 42]], umum: [[-9, .5, -5], [11, 22, 22]], operasional: [[9, .5, -5], [28, 21, 24]], lounge: [[-3, .4, 7], [17, 23, 31]], park: [[0, 0, 28], [56, 65, 96]] };
        for (const game of games) views[game.id] = [[game.x, .3, game.z], [game.x + 14, 19, game.z + 22]];
        for(const [id,point]of Object.entries(destinations))views[id]=[point,[point[0]+12,19,point[2]+22]];
        const [target, position] = views[room] || views.all; targetFocus.set(...target); cameraGoal.set(...position);
        if (room === 'all' || room === 'residences') {
            const bounds = residences.bounds(), front = room === 'all' ? 76 : bounds.front;
            const width = bounds.right - bounds.left, depth = front - bounds.back;
            targetFocus.set(0, 0, (front + bounds.back) / 2);
            const aspect = Math.max(.3, host.clientWidth / Math.max(1, host.clientHeight));
            const halfFov = Math.min(THREE.MathUtils.degToRad(camera.fov / 2), Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect));
            const distance = Math.hypot(width, depth) / 2 / Math.sin(halfFov) * 1.07;
            cameraGoal.copy(new THREE.Vector3(1, 1.18, 1.3).normalize().multiplyScalar(distance).add(targetFocus));
        } else if (narrow) cameraGoal.sub(targetFocus).multiplyScalar(1.23).add(targetFocus);
        visitingHome = null; residences.select(figures.get(selected)?.pose === 'sleeping' ? selected : null);
        if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } else easingCamera = true;
        requestDraw();
    }
    function visitHome(id) {
        if(interior.active()){setCameraMode('follow',controlledId);return;}
        const location = residences.location(id); if (!location) return;
        settleOfficeCamera(controls);
        if(!homeCamera)homeCamera={mode:cameraMode,followId,anchor:figures.get(followId)?.group.position.clone(),position:camera.position.clone(),target:controls.target.clone(),focus:targetFocus.clone(),goal:cameraGoal.clone(),easing:easingCamera,fov:camera.fov,min:controls.minDistance,max:controls.maxDistance,pan:controls.enablePan};
        cameraMode = 'orbit'; followId = null; controls.enablePan = true; controls.minDistance = 5; controls.maxDistance = 650; camera.fov = 36; camera.updateProjectionMatrix();
        visitingHome = id; residences.select(id);
        targetFocus.set(location.x, 1.2, location.z); cameraGoal.copy(targetFocus).add(new THREE.Vector3(11, 12, 15));
        if (host.clientWidth < 600) cameraGoal.sub(targetFocus).multiplyScalar(1.23).add(targetFocus);
        if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } else easingCamera = true;
        requestDraw();
    }
    function setCameraMode(mode, id = selected) {
        if(interior.active()){mode='follow';id=controlledId;}
        closeHomePreview(false);settleOfficeCamera(controls);
        if (mode === 'orbit') { cameraMode = 'orbit'; followId = null; camera.fov=36;camera.updateProjectionMatrix();controls.enablePan = true; controls.minDistance = 5; controls.maxDistance = 650;requestDraw();return; }
        if (!figures.has(id) && roster.some(p => p.id === id)) { selected = id; setPeople(roster); }
        const f = figures.get(id); if (!f) return;
        const form=abilities.form(id);cameraMode = mode === 'portrait' ? 'portrait' : 'follow'; followId = id; controls.enablePan = false; controls.minDistance = interior.active()?1.7:form?form.height*.85:cameraMode==='portrait'?2.8:3.8; controls.maxDistance = interior.active()?8:form?55:35;
        camera.fov = interior.active()?58:44; camera.updateProjectionMatrix(); targetFocus.copy(f.group.position).add(new THREE.Vector3(0, f.pose === 'sleeping' ? .25 : 1.3, f.pose === 'sleeping' ? -1.3 : 0));
        if(form)targetFocus.y=f.group.position.y+form.height*.55;
        cameraGoal.copy(targetFocus).add(form?new THREE.Vector3(form.height*.85,form.height*.65,form.height*1.1):cameraMode === 'portrait' ? new THREE.Vector3(1.8, .9, 2.7) : new THREE.Vector3(4, 2.5, 5));
        if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } else easingCamera = true; requestDraw();
    }
    let dragStart = null;
    const hotspotMaterial=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.set('game-hotspots',hotspotMaterial);
    for(const game of games){const sign=new THREE.BoxGeometry(6,1.4,.4),floor=new THREE.BoxGeometry(game.kind==='court'?16:9,.18,game.kind==='court'?12:7);sign.translate(0,.7,-(game.kind==='court'?6:4.2));floor.translate(0,-.14,0);const a=sign.toNonIndexed(),b=floor.toNonIndexed(),geometry=mergeGeometries([a,b],false);sign.dispose();floor.dispose();a.dispose();b.dispose();ownedGeometries.add(geometry);const mesh=new THREE.Mesh(geometry,hotspotMaterial);mesh.position.set(game.x,0,game.z);mesh.userData.officeGame=game.id;scene.add(mesh);gameTargets.push(mesh);}
    const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
    const down = e => { dragStart = [e.clientX, e.clientY]; };
    const up = e => {
        if (!dragStart || Math.hypot(e.clientX - dragStart[0], e.clientY - dragStart[1]) > 6) return; dragStart = null;
        const rect = renderer.domElement.getBoundingClientRect(); pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1);
        raycaster.setFromCamera(pointer, lastDrawCamera||camera);
        const hit = raycaster.intersectObjects([...figures.values()].map(f => f.group).concat(residences.meshes,rivageBar.targets,hospitality.targets,gameTargets,abilities.targets(),hologram.root.visible?[hologram.root]:[]), true)[0];
        const resident = residences.personForHit(hit);
        if(resident===homeOwner&&hit?.object.userData.residenceLayer==='door'){onDoor();return;}
        if (resident) { onSelect(resident); visitHome(resident); }
        else if(hit?.object.userData.officeHologramOwner)onSelect(hit.object.userData.officeHologramOwner);
        else if (hit?.object.userData.personId) onSelect(hit.object.userData.personId);
        else if(hit?.object.userData.officeVenue)onVenue(hit.object.userData.officeVenue);
        else if(hit?.object.userData.officeGame)onGame(hit.object.userData.officeGame);
    };
    function theme() {
        const dark = document.documentElement.classList.contains('dark');
        renderer.toneMappingExposure = dark ? 1.02 : 1.18; environment.configure(worldConfig, energySaver); requestDraw();
    }
    const observer = new ResizeObserver(resize); observer.observe(host);
    const themeObserver = new MutationObserver(theme); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const lost = e => { e.preventDefault(); if (!disposed) onFailure(); };
    renderer.domElement.addEventListener('pointerdown', down); renderer.domElement.addEventListener('pointerup', up); renderer.domElement.addEventListener('webglcontextlost', lost);
    const changed = () => requestDraw(); controls.addEventListener('change', changed); controls.addEventListener('start', () => { easingCamera = false; });
    theme(); focusRoom('all'); camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; resize();
    return { setPeople, resize, focusRoom, visitHome, setCameraMode,
        showHologram(id){hologramId=id!==null&&(id===homeOwner||id===controlledId||figures.get(id)?.person.is_me)?id:null;if(hologramId===null)hologram.hide();requestDraw();},
        collisionBoxes:()=>navigation.boxes(),
        setPilotReporter(fn){pilotReporter=fn;},
        castSkill(index=0){const f=figures.get(controlledId);if(!f||!pilotPhysics)return{error:'Aktifkan kendali avatar dahulu.'};const skill=skillsFor(safeAvatar(f.person.avatar).costume)[index];if(!skill)return{error:'Jurus belum tersedia untuk kostum ini.'};if(abilities.cooldown(controlledId))return{error:`Pulihkan energi ${abilities.cooldown(controlledId)} detik lagi.`};
            if(skill.type==='transform'&&(interior.active()||!navigation.free(pilotPhysics.state().x,pilotPhysics.state().z,pilotPhysics.state().y,skill.radius)))return{error:'Cari area lapang di luar rumah sebelum berubah.'};
            if(skill.type==='transform'&&abilities.modeCooldown(controlledId))return{error:`Transformasi pulih dalam ${abilities.modeCooldown(controlledId)} detik.`};
            pilotActivity=null;restPlan=null;if(!abilities.cast(controlledId,skill.id,f))return{error:'Efek belum siap.'};requestDraw();return{skill:skill.id,skill_id:globalThis.crypto.randomUUID(),name:skill.name};},
        syncPilot(state,timing){if(!state||!pilotPhysics)return;const received=timing?.receivedAt??Date.now(),sent=timing?.sentAt??received;if(Number.isFinite(state.updated_ms))abilities.clock(state.updated_ms-(sent+received)/2,Math.max(0,received-sent));if(endingMode&&state.form)return;if(!state.form)endingMode=false;abilities.observe(controlledId,state,figures.get(controlledId),true);const mode=abilities.modeState(controlledId);pilotPhysics.setForm(abilities.form(controlledId),mode?.expires);requestDraw();},
        toggleFlight(){const result=pilotPhysics?.toggleFlight();requestDraw();return result;},
        endTransformation(){endingMode=true;cameraForm=null;abilities.clearForm(controlledId);pilotPhysics?.setForm(null);setCameraMode('follow',controlledId);requestDraw();},
        activeTransformation:()=>abilities.modeState(controlledId),
        setPrivatePilotProfile(avatar){if(privatePilotSelf){privatePilotSelf={...privatePilotSelf,avatar};setPeople(roster.map(p=>p.id===privatePilotSelf.id?privatePilotSelf:p));}},
        setPilotGate(fn){pilotGate=fn;},
        reconcilePilot(state){if(pilotPhysics){pilotPhysics.reset(state);pilotActivity=null;restPlan=null;pilotInput={};requestDraw();}},
        configureHome(id,value,plots=null){homeOwner=id;myHome=value?homeLocation(value.slot):null;homePlots=Number.isInteger(plots)?Math.min(128,plots):null;residences.setPlots(homePlots??0);},
        canUseDoor(){const p=pilotPhysics?.state();return Boolean(myHome&&p&&(insideHome(p,myHome)||Math.hypot(p.x-myHome.x,p.z-myHome.z-3.9)<=2.8));},
        homeDoorOpen:()=>homeDoorOpen,
        setHomeDoor(open){if(homeDoorOpen===Boolean(open))return;homeDoorOpen=Boolean(open);navigation.configureHomes(true,homeDoorOpen?myHome?.slot:null);if(homeOwner)residences.setDoor(homeOwner,homeDoorOpen);requestDraw();},
        setRestPose(pose){if(!pilotPhysics)return false;abilities.cancel(controlledId);restPlan=null;pilotActivity=null;pilotInput={};if(!pose){requestDraw();return true;}if(!['sit','recline','nap','meditate'].includes(pose))return false;
            const p=pilotPhysics.state(),others=[...figures.values()].filter(f=>f.person.id!==controlledId&&f.pose!=='sleeping').map(f=>f.group.position),point=p.grounded?planOfficeRest(navigation,p,pose,others):null;
            if(p.grounded&&!point)return false;restPlan={pose,point};
            if(point&&Math.hypot(point.x-p.x,point.z-p.z)<.04){pilotPhysics.face({x:p.x+Math.sin(point.yaw),z:p.z+Math.cos(point.yaw)});pilotActivity={action:'rest',pose,venue:insideHome(p,myHome)?'home':['beach','garden','terrace','lounge','bar'].find(id=>nearVenue(p,id))||'campus'};restPlan=null;}requestDraw();return true;},
        setPilot(id,state,privateSelf=null){controlledId=id;privatePilotSelf=privateSelf;pilotPhysics=createPilotPhysics(navigation,state);setPeople(roster);setCameraMode('follow',id);requestDraw();},
        releasePilot(){interior.leave();abilities.clearForm(controlledId);endingMode=false;cameraForm=null;const privateId=privatePilotSelf?.id;controlledId=null;privatePilotSelf=null;pilotPhysics=null;pilotInput={};pilotActivity=null;restPlan=null;guide=null;guideMarker.visible=false;setPeople(roster.filter(p=>p.id!==privateId));},
        setPilotInput(value){pilotInput=value||{};requestDraw();},pilotState(){return pilotPhysics?{...pilotPhysics.state(),...(pilotActivity||{})}:null;},
        focusPilot(){host.focus?.({preventScroll:true});},followPilot(){if(controlledId){setCameraMode('follow',controlledId);host.focus?.({preventScroll:true});}},
        setPeerPilots(values){peerPilots.clear();for(const state of values)if(state.id!==controlledId)peerPilots.set(state.id,state);setPeople(roster.map(p=>({...p,pilot:peerPilots.get(p.id)||null,in_office:peerPilots.has(p.id)||p.id===controlledId})));},
        canInteract(id){return nearVenue(pilotPhysics?.state(),id);},
        guideTo(id){const point=id==='home'&&myHome?{x:myHome.x,z:myHome.z+5}:officeLayout.venues[id];guide=point?id:null;guideMarker.visible=Boolean(point);if(point){guideMarker.position.set(point.x,.025,point.z);const me=pilotPhysics?.state();pilotReporter({...me,target:id,distance:me?Math.round(Math.hypot(point.x-me.x,point.z-me.z)):null});requestDraw();}return point;},
        interactNearest(){const point=pilotPhysics?.state();if(!point)return false;if(myHome&&(insideHome(point,myHome)||Math.hypot(point.x-myHome.x,point.z-myHome.z-3.9)<=2.8)){onDoor();return true;}const id=Object.keys(officeLayout.venues).filter(id=>nearVenue(point,id)).sort((a,b)=>Math.hypot(point.x-officeLayout.venues[a].x,point.z-officeLayout.venues[a].z)-Math.hypot(point.x-officeLayout.venues[b].x,point.z-officeLayout.venues[b].z))[0];if(games.some(g=>g.id===id)){onGame(id);return true;}if(['bar','disco','beach','garden','terrace','lounge'].includes(id)){onVenue(id);return true;}return false;},
        setRecreation(id,value){if(Number(id)===controlledId&&value)pilotActivity={action:({drink:'drink',food:'eat',dance:'dance',relax:'rest'})[value.kind]||'idle',venue:value.destination,pose:value.kind==='relax'?'sit':null};recreation.set(Number(id),value?{...value,until:value.until||Date.now()/1000+900}:null);setPeople(roster);},
        setVenueEffects(value){rivageBar.setEnabled(value);requestDraw();},
        setGame(value){if(JSON.stringify(localGame)===JSON.stringify(value))return;localGame=value;if(controlledId&&value?.status==='playing'&&[value.from,value.to].includes(controlledId))pilotActivity={action:'play',venue:value.kind};else if(pilotActivity?.action==='play')pilotActivity=null;setPeople(roster);},
        say(id,message){const f=figures.get(Number(id));if(!f)return;f.bubble.textContent=String(message||'').slice(0,350);f.bubble.hidden=false;if(speechTimers.has(id))clearTimeout(speechTimers.get(id));speechTimers.set(id,setTimeout(()=>{f.bubble.hidden=true;speechTimers.delete(id);requestDraw();},10000));requestDraw();},
        configureWorld(value) { worldConfig = value || {}; environment.configure(worldConfig, energySaver); material('#47695f').color.set(({ alps: '#47695f', village: '#936e53', nordic: '#566c80' })[worldConfig.settings?.landscape] || '#47695f'); requestDraw(); },
        setEnergySaver(value) { energySaver = Boolean(value); renderer.setPixelRatio(energySaver ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)); environment.configure(worldConfig, energySaver); resize(); },
        setMeeting(value) { localMeeting = value; setPeople(roster); },
        meetingReady() { if(controlledId&&localMeeting?.connected&&localMeeting.room){const a=figures.get(localMeeting.room.from),b=figures.get(localMeeting.room.to);if(!a||!b||a.group.position.distanceTo(b.group.position)>3)return false;const dx=b.group.position.x-a.group.position.x,dz=b.group.position.z-a.group.position.z,d=Math.hypot(dx,dz);return d>.2&&(Math.sin(a.group.rotation.y)*dx+Math.cos(a.group.rotation.y)*dz)/d>.45&&(-Math.sin(b.group.rotation.y)*dx-Math.cos(b.group.rotation.y)*dz)/d>.45;}const room = localMeeting?.room; if (!room || !localMeeting.connected) return false; return [room.from, room.to].every(id => { const f = figures.get(id); return f && f.pose === 'meeting' && !f.waypoints?.length && f.group.position.distanceTo(f.home) < .2 && Math.abs(f.group.rotation.y - f.facing) < .15; }); },
        select(id, focus = false) {
            if (selected !== id) closeHomePreview();
            selected = id; if (id && !figures.has(id) && roster.some(p => p.id === id)) setPeople(roster);
            for (const [key, f] of figures) { f.ring.visible = key === id; f.label.setAttribute('aria-pressed', String(key === id)); }
            const f = figures.get(id); residences.select(visitingHome ?? (f?.pose === 'sleeping' ? id : null));
            if(f&&focus&&controlledId&&id!==controlledId&&pilotPhysics){pilotPhysics.face(f.group.position);requestDraw();return;}
            if (f && focus && cameraMode !== 'orbit') { setCameraMode(cameraMode, id); return; }
            if (f && focus && f.pose === 'sleeping') { visitHome(id); return; }
            if (f && focus) { targetFocus.copy(f.target).add(new THREE.Vector3(0, 1, 0)); cameraGoal.copy(targetFocus).add(new THREE.Vector3(11, 11, 14)); if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); } else easingCamera = true; } requestDraw();
        },
        zoom(factor) { if(!Number.isFinite(factor)||factor<=0)return;easingCamera=false;const offset=camera.position.clone().sub(controls.target);offset.setLength(THREE.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(offset);controls.update();requestDraw(); },
        setPaused(value) { paused = value; if(paused&&easingCamera){camera.position.copy(cameraGoal);controls.target.copy(targetFocus);easingCamera=false;}if (paused) for (const f of figures.values()) if (f.pose === 'meeting') { f.group.position.copy(f.home); f.group.rotation.y = f.facing; f.waypoints = []; } if (frame !== null) cancelAnimationFrame(frame); frame = null; requestDraw(); },
        setVisible(value) { visible = value; if (!value && frame !== null) { cancelAnimationFrame(frame); frame = null; } else if (value) { lastFrame = 0; resize(); requestDraw(); } },
        dispose() { disposed = true; if (frame !== null) cancelAnimationFrame(frame); frame = null; observer.disconnect(); themeObserver.disconnect(); controls.dispose();
            interior.dispose();
            abilities.dispose();
            hologram.dispose();
            for(const timer of speechTimers.values())clearTimeout(timer);speechTimers.clear();recreation.clear();
            renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('webglcontextlost', lost);
            residences.dispose();restMats.dispose(); environment.dispose(); for (const geometry of ownedGeometries) geometry.dispose(); for (const mat of materials.values()) mat.dispose(); for (const texture of textures) texture.dispose();
            figures.forEach(f => f.label.remove()); figures.clear(); scene.clear(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); }
    };
}
