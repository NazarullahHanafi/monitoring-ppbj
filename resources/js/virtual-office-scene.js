import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { poseFor, games, gameFor, safeAvatar, isOfficeNight } from './virtual-office-state.js';

// Original procedural scene: no models, textures, or code from the reference site.
// Static furniture is batched by material; animation is capped at 30fps / 24 avatars.
export function createOfficeScene({ host, labels, onSelect, onFailure,
    rendererFactory = options => new THREE.WebGLRenderer(options), controlsFactory = (camera, element) => new OrbitControls(camera, element) }) {
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
    const colors = { base: '#acb9ad', floor: '#f1ece0', edge: '#cebd9c', wood: '#b38b61', woodLight: '#d6b68a', oak: '#705b42',
        wall: '#e5e3d5', stone: '#c4cec5', deep: '#214b40', green: '#537d60', leaf: '#4a7750', lightLeaf: '#86a465',
        pot: '#e2d5bb', white: '#f5f0e5', metal: '#3c4d46', gold: '#b89c68', screen: '#173841', screenLine: '#62baaa',
        rug: '#dbd5bf', sofa: '#9eafa1', pillow: '#d2b48b', black: '#22322d', teal: '#87b6a5', glass: '#9ccfc6' };
    function material(key) {
        if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color: colors[key] || key, roughness: key === 'metal' ? .4 : .82, metalness: key === 'gold' ? .45 : .02,
            ...(key === 'glass' ? { transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide } : {}) }));
        return materials.get(key);
    }
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
    box(86, .6, 70, 0, -.94, 15, 'base', .3);
    box(85.5, .14, 69.5, 0, -.57, 15, '#c6d4bc', .18);
    box(83, .08, 4, 0, -.44, 20, '#e6dfcc', .12);
    box(6, .08, 64, 0, -.44, 16, '#e6dfcc', .1);
    box(78, .08, 4, 0, -.44, 35, '#e6dfcc', .1);
    for (const x of [-41, 41]) for (const z of [-15, -2, 14, 31, 46]) {
        plant(x, z, 1.7); cylinder(.08, 3.2, x + (x < 0 ? 1 : -1), 1.15, z + 2, 'gold');
        orb(.22, .25, .22, x + (x < 0 ? 1 : -1), 2.85, z + 2, 'white');
    }
    const gameBalls = [];
    function net(x, z, width, height) {
        for (const dx of [-width / 2, width / 2]) cylinder(.055, height, x + dx, height / 2, z, 'white');
        for (let h = .3; h <= height; h += .22) box(width, .018, .025, x, h, z, 'white', 0);
        for (let dx = -width / 2; dx <= width / 2; dx += .4) box(.012, height - .3, .018, x + dx, (height + .3) / 2, z, 'white', 0);
    }
    function gameBall(game, color, radius = .16) {
        const geometry = new THREE.SphereGeometry(radius, 10, 8); ownedGeometries.add(geometry);
        const mesh = new THREE.Mesh(geometry, material(color)); scene.add(mesh); gameBalls.push({ mesh, game });
    }
    for (const game of games) {
        const { x, z, id } = game;
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
            box(13, .12, 8, x, -.15, z, '#69885c', .15);
            for (const dx of [-6.5, 6.5]) box(.2, .35, 8, x + dx, -.05, z, 'woodLight');
            for (let n = 0; n < 3; n++) { cylinder(.22, .02, x - 4 + n * 4, -.07, z + (n % 2 ? 2 : -2), 'black'); cylinder(.025, 1.5, x - 4 + n * 4, .65, z + (n % 2 ? 2 : -2), 'gold'); box(.8, .4, .03, x - 3.6 + n * 4, 1.25, z + (n % 2 ? 2 : -2), '#c78362'); }
            gameBall(game, 'white', .12);
        } else if (id === 'bowling') {
            box(5, .09, 11, x, -.13, z, 'woodLight');
            for (const dx of [-2.7, 2.7]) box(.35, .12, 11, x + dx, -.1, z, 'oak');
            for (let row = 0; row < 4; row++) for (let n = 0; n <= row; n++) { const px = x + (n - row / 2) * .55, pz = z - 2 - row * .5; cylinder(.14, .5, px, .17, pz, 'white', .08); orb(.13, .14, .13, px, .49, pz, 'white'); }
            gameBall(game, '#786397', .28);
        } else if (id === 'arcade') {
            for (const dx of [-2.2, 2.2]) {
                box(2.1, 2.6, 1.6, x + dx, 1.1, z, 'deep', .1);
                box(1.6, 1.1, .05, x + dx, 1.7, z + .83, 'screen');
                for (let n = 0; n < 5; n++) box(.05, .6, .02, x + dx + (n - 2) * .2, 1.7, z + .87, n % 2 ? '#e8c877' : 'screenLine', 0);
                cylinder(.18, .06, x + dx, .9, z + 1.1, 'gold'); box(1.2, .45, 1.2, x + dx, .2, z + 2, 'sofa', .1);
            }
        } else if (id === 'darts') {
            box(5, 3, .22, x, 1.25, z - 1.8, 'deep');
            for (let n = 0; n < 4; n++) { const g = new THREE.CylinderGeometry(1.05 - n * .23, 1.05 - n * .23, .025, 24); bake(g, n % 2 ? 'white' : '#bf6f59', x, 1.6, z - 1.64 + n * .025, Math.PI / 2); }
        } else {
            box(5.5, .25, 3.5, x, 1, z, id === 'pingpong' ? '#4c7783' : id === 'billiards' ? '#376a59' : 'woodLight', .1);
            for (const dx of [-2.2, 2.2]) for (const dz of [-1.2, 1.2]) box(.18, 1.1, .18, x + dx, .4, z + dz, 'oak');
            if (id === 'pingpong') { net(x, z, 5.5, 1.45); gameBall(game, 'white', .1); }
            if (id === 'uno') for (let n = 0; n < 16; n++) { const side = n % 4; box(.32, .035, .48, x + (side < 2 ? -1.7 + (n % 4) * .3 : 1.4), 1.16 + n * .002, z + (side % 2 ? -.9 : .9), ['#b85e55', '#c7ac54', '#4b797d', '#719263'][n % 4], .02, n * .3); }
            if (id === 'chess') for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) { box(.34, .02, .34, x + (a - 3.5) * .34, 1.14, z + (b - 3.5) * .34, (a + b) % 2 ? 'deep' : 'white', 0); if (b < 2 || b > 5) { cylinder(.075, .17, x + (a - 3.5) * .34, 1.24, z + (b - 3.5) * .34, b < 2 ? 'white' : 'black'); } }
            if (id === 'billiards') for (let n = 0; n < 10; n++) orb(.12, .12, .12, x + Math.sin(n * 2) * 1.8, 1.25, z + Math.cos(n) * .9, ['gold', 'white', 'deep'][n % 3]);
            if (id === 'foosball') for (let n = 0; n < 5; n++) { box(.045, .045, 4.5, x - 2 + n, 1.4, z, 'metal', 0); for (const dz of [-1, 0, 1]) box(.2, .45, .18, x - 2 + n, 1.48, z + dz, n % 2 ? '#ba7864' : 'deep'); }
            for (const side of [-1, 1]) box(4, .35, .8, x, .28, z + side * 2.8, 'sofa', .1);
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
    for (const [key, parts] of batches) { const combined = mergeGeometries(parts, false); parts.forEach(g => g.dispose()); if (combined) { ownedGeometries.add(combined); scene.add(new THREE.Mesh(combined, material(key))); } }
    batches.clear();
    // A soft ambient contact shadow is one small procedural texture, no shadow-map pass.
    const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d'), gradient = shadowCtx.createRadialGradient(64, 64, 7, 64, 64, 64); gradient.addColorStop(0, '#16382f35'); gradient.addColorStop(1, '#16382f00'); shadowCtx.fillStyle = gradient; shadowCtx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas); textures.add(shadowTexture);
    const shadowGeometry = new THREE.PlaneGeometry(66, 49); ownedGeometries.add(shadowGeometry);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }); materials.set('shadow', shadowMaterial);
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial); shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.98; scene.add(shadow);
    const avatarGeometry = new Map();
    function avatarPart(parent, shape, dims, color, position) {
        const key = shape + dims.join(':');
        if (!avatarGeometry.has(key)) { const geometry = shape === 'sphere' ? new THREE.SphereGeometry(dims[0], 10, 8) : new RoundedBoxGeometry(...dims, 1, .06); avatarGeometry.set(key, geometry); ownedGeometries.add(geometry); }
        const mesh = new THREE.Mesh(avatarGeometry.get(key), material(color)); mesh.position.set(...position); parent.add(mesh); return mesh;
    }
    const shirts = ['#547a71', '#557591', '#ad8a62', '#856c8c', '#6f8362', '#9e7270'];
    function figure(person) {
        const group = new THREE.Group(); scene.add(group);
        const appearance = safeAvatar(person.avatar), feminine = appearance.style === 'feminine';
        const shirt = { emerald: '#547a71', navy: '#405978', rose: '#b97988', cream: '#d3bc96', lavender: '#9682ae', terracotta: '#bb8265' }[appearance.color] || shirts[person.id % shirts.length];
        const body = new THREE.Group(); group.add(body); const skin = { light: '#efd0ae', warm: '#dba77d', tan: '#bc8762', deep: '#895e46' }[appearance.skin];
        const hairColor = appearance.hair === 'hijab' ? shirt : '#352c32';
        avatarPart(body, 'box', [feminine ? .43 : .5, .65, .33], shirt, [0, 1.17, 0]);
        if (appearance.outfit === 'blazer') {
            avatarPart(body, 'box', [.15, .42, .035], 'white', [0, 1.29, .18]);
            for (const side of [-1, 1]) { const lapel = avatarPart(body, 'box', [.07, .32, .035], 'gold', [side * .12, 1.33, .19]); lapel.rotation.z = side * .25; }
        }
        if (appearance.outfit === 'sport') avatarPart(body, 'box', [.32, .055, .02], 'white', [0, 1.3, .18]);
        const skirt = appearance.outfit === 'dress' ? avatarPart(body, 'box', [.6, .4, .44], shirt, [0, .79, 0]) : null;
        const head = new THREE.Group(); head.position.y = 1.69; body.add(head);
        avatarPart(head, 'box', [.43, .46, .4], skin, [0, 0, 0]);
        avatarPart(head, 'box', [.47, .18, .44], hairColor, [0, .21, -.02]);
        avatarPart(head, 'box', [.45, appearance.hair === 'long' || appearance.hair === 'hijab' ? .67 : .3, .12], hairColor, [0, appearance.hair === 'long' || appearance.hair === 'hijab' ? -.12 : .07, -.2]);
        if (appearance.hair !== 'short') for (const side of [-1, 1]) avatarPart(head, 'box', [.09, appearance.hair === 'bob' ? .4 : .53, .32], hairColor, [side * .235, -.01, -.03]);
        if (appearance.hair === 'ponytail') avatarPart(head, 'box', [.24, .53, .22], hairColor, [0, -.02, -.35]);
        if (appearance.hair === 'hijab') avatarPart(body, 'box', [.58, .18, .43], hairColor, [0, 1.44, -.04]);
        for (const x of [-.095, .095]) avatarPart(head, 'box', [.035, .045, .025], '#263833', [x, .035, .205]);
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
            avatarPart(arm, 'box', [.17, .4, .2], shirt, [0, -.19, 0]);
            avatarPart(arm, 'box', [.15, .27, .16], skin, [0, -.45, .05]); arms.push(arm);
        }
        const legs = [];
        for (const x of [-.14, .14]) { const leg = new THREE.Group(); leg.position.set(x, .83, 0); body.add(leg); avatarPart(leg, 'box', [.18, .64, .2], '#35463f', [0, -.32, 0]); avatarPart(leg, 'box', [.23, .14, .34], appearance.outfit === 'sport' ? 'white' : '#24352f', [0, -.7, .07]); legs.push(leg); }
        const cup = avatarPart(arms[1], 'sphere', [.12], 'white', [0, -.49, .14]);
        const plate = avatarPart(arms[0], 'box', [.35, .045, .24], 'white', [0, -.43, .23]);
        const racket = new THREE.Group(); arms[1].add(racket); racket.position.set(0, -.48, .16);
        avatarPart(racket, 'box', [.04, .44, .05], 'gold', [0, -.14, 0]);
        const racketGeometry = new THREE.TorusGeometry(.24, .025, 6, 16); ownedGeometries.add(racketGeometry);
        racket.add(new THREE.Mesh(racketGeometry, material('white'))); racket.rotation.x = Math.PI / 2;
        const ringGeo = new THREE.RingGeometry(.5, .59, 24); ownedGeometries.add(ringGeo);
        const ringMat = new THREE.MeshBasicMaterial({ color: '#c5a061', side: THREE.DoubleSide }); materials.set(`ring-${person.id}`, ringMat);
        const ring = new THREE.Mesh(ringGeo, ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = .02; group.add(ring); ring.visible = false;
        const label = document.createElement('button'); label.type = 'button'; label.className = 'vo-avatar-label'; label.setAttribute('aria-pressed', 'false');
        const dot = document.createElement('i'), name = document.createElement('span'), icon = document.createElement('small'); label.append(dot, name, icon); labels.append(label);
        label.addEventListener('click', () => onSelect(person.id));
        group.traverse(obj => { if (obj.isMesh) obj.userData.personId = person.id; });
        return { group, body, head, arms, legs, skirt, cup, plate, racket, label, dot, name, icon, ring, person, appearance: JSON.stringify(person.avatar),
            privateGeometry: racketGeometry, target: new THREE.Vector3(), phase: person.id * 1.75 };
    }
    let selected = null, paused = false, visible = true, disposed = false, frame = null, lastFrame = 0, lastLabels = 0;
    const targetFocus = new THREE.Vector3(), cameraGoal = new THREE.Vector3(); let easingCamera = false;
    function setPeople(people) {
        const sorted = [...people].sort((a, b) => ({ online: 0, idle: 1, offline: 2 }[a.state] - { online: 0, idle: 1, offline: 2 }[b.state]) || a.id - b.id);
        const chosen = [], seats = { umum: 0, operasional: 0 }; let resting = 0, cafe = 0;
        for (const person of sorted) { if (chosen.length >= 24) break; if (person.state === 'online' && seats[person.department] >= 16) continue; chosen.push(person); if (person.state === 'online') seats[person.department]++; }
        const ids = new Set(chosen.map(p => p.id));
        for (const [id, f] of figures) if (!ids.has(id) || f.appearance !== JSON.stringify(chosen.find(p => p.id === id)?.avatar)) {
            scene.remove(f.group); f.label.remove(); f.ring.geometry.dispose(); ownedGeometries.delete(f.ring.geometry); f.privateGeometry.dispose(); ownedGeometries.delete(f.privateGeometry); f.ring.material.dispose(); materials.delete(`ring-${id}`); figures.delete(id);
        }
        seats.umum = seats.operasional = 0;
        for (const person of chosen) {
            let f = figures.get(person.id), fresh = !f;
            if (!f) { f = figure(person); figures.set(person.id, f); }
            const previousGame = f.game?.id, previousPose = f.pose;
            f.person = person; f.pose = poseFor(person); let placement;
            f.game = gameFor(person);
            if (f.pose === 'working') { placement = desks[person.department][seats[person.department]++]; f.group.rotation.y = Math.PI; }
            else if (f.pose === 'playing') { const side = person.id % 2 ? -1 : 1; placement = [f.game.x + side * (f.game.kind === 'court' ? 3 : 0), -.12, f.game.z + side * (f.game.kind === 'court' ? 3.6 : 2.5)]; f.group.rotation.y = side < 0 ? 0 : Math.PI; }
            else if (f.pose === 'sleeping') { const n = resting++; placement = [-15.8 + (n % 8) * 2.02, .12, 4.7 + Math.floor(n / 8) * 3.3]; f.group.rotation.y = 0; }
            else if (cafe < 8) { const n = cafe++, table = n % 4, side = n < 4 ? 1 : -1; placement = [(table % 2 ? 13.8 : 8) + side * 1.65, .08, table < 2 ? 5.1 : 9.7]; f.group.rotation.y = side * Math.PI / 2; }
            else { const n = resting++; placement = [-15.8 + (n % 8) * 2.02, .12, 4.7 + Math.floor(n / 8) * 3.3]; f.group.rotation.y = 0; }
            f.target.set(...placement); f.home = f.target.clone(); if (fresh || paused) f.group.position.copy(f.target);
            if (!fresh && f.pose === 'playing' && previousPose === 'playing' && previousGame !== f.game.id) {
                // Route between courts via the front promenade rather than
                // crossing desks and the building's glass partitions.
                f.waypoints = [new THREE.Vector3(f.group.position.x, -.12, 20), new THREE.Vector3(f.home.x, -.12, 20), f.home.clone()];
            } else if (f.pose !== 'playing') f.waypoints = [];
            f.dot.className = `vo-dot ${person.state}`; f.name.textContent = person.name;
            f.icon.textContent = `${person.state === 'offline' ? 'OFFLINE ' : person.state === 'idle' ? 'JEDA ' : 'ONLINE '}${f.pose === 'sleeping' ? '☾' : f.pose === 'playing' ? f.game.icon : f.pose === 'coffee' ? '☕' : ''}`;
            f.label.setAttribute('aria-label', `${person.name}, ${person.state === 'online' ? 'online' : person.state === 'idle' ? 'jeda di aplikasi' : 'tidak online'}. Lihat detail anggota.`);
            f.cup.visible = f.pose === 'coffee'; f.plate.visible = f.pose === 'eating';
            f.racket.visible = f.pose === 'playing' && ['tennis', 'badminton', 'pingpong', 'golf'].includes(f.game.id);
            f.ring.visible = selected === person.id; f.label.setAttribute('aria-pressed', String(selected === person.id));
        }
        requestDraw();
    }
    const point = new THREE.Vector3();
    function drawLabels() {
        const rect = host.getBoundingClientRect(), occupied = [];
        for (const f of [...figures.values()].sort((a, b) => Number(b.person.id === selected) - Number(a.person.id === selected))) {
            f.group.getWorldPosition(point); point.y += 2.35; point.project(camera);
            const x = (point.x + 1) / 2 * rect.width, y = (1 - point.y) / 2 * rect.height;
            const width = 166, height = 27; const overlap = occupied.some(r => Math.abs(r.x - x) < width && Math.abs(r.y - y) < height);
            const show = point.z < 1 && point.z > -1 && x > 18 && x < rect.width - 18 && y > 15 && y < rect.height - 65 && (!overlap || f.person.id === selected);
            f.label.hidden = !show;
            if (show) { f.label.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%)`; occupied.push({ x, y }); }
        }
    }
    function render(now = 0) {
        frame = null; if (disposed || !visible) return;
        if (now - lastFrame < 1000 / 30 && !paused) { frame = requestAnimationFrame(render); return; }
        lastFrame = now;
        if (easingCamera) { camera.position.lerp(cameraGoal, .12); controls.target.lerp(targetFocus, .12); if (camera.position.distanceTo(cameraGoal) < .04) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } }
        for (const f of figures.values()) {
            const t = paused ? 0 : now / 1000 + f.phase;
            const playing = f.pose === 'playing', walking = !paused && (playing || (f.pose === 'working' && Math.sin(t / 14) > .8));
            f.target.copy(f.home);
            if (walking) { f.target.x += Math.sin(t * (playing ? .65 : .8)) * (f.game.kind === 'court' && playing ? 1.7 : .4); f.target.z += Math.cos(t * .5) * (playing ? .45 : .2); }
            if (f.waypoints?.length && !paused) {
                const waypoint = f.waypoints[0], distance = f.group.position.distanceTo(waypoint);
                if (distance < .12) f.waypoints.shift();
                else { f.group.rotation.y = Math.atan2(waypoint.x - f.group.position.x, waypoint.z - f.group.position.z); f.group.position.lerp(waypoint, Math.min(1, .13 / distance)); }
            } else f.group.position.lerp(f.target, paused ? 1 : .06);
            f.legs.forEach((leg, i) => { leg.rotation.x = walking ? Math.sin(t * 4 + i * Math.PI) * .32 : f.pose === 'working' || f.pose === 'sleeping' ? -1.1 : 0; });
            f.body.position.y = Math.sin(t * 1.6) * (paused ? 0 : .018);
            f.body.rotation.z = f.pose === 'sleeping' ? .45 : playing ? Math.sin(t * 1.5) * .07 : 0;
            f.head.rotation.x = f.pose === 'sleeping' ? .43 + Math.sin(t * .8) * (paused ? 0 : .05) : Math.sin(t * .6) * (paused ? 0 : .025);
            f.arms[0].rotation.x = f.pose === 'working' ? -.65 + Math.sin(t * 5) * (paused ? 0 : .045) : f.pose === 'eating' ? -1.05 : .1;
            f.arms[1].rotation.x = f.pose === 'working' ? -.65 + Math.sin(t * 5 + 1) * (paused ? 0 : .045) : f.pose === 'coffee' ? -1.2 + Math.sin(t * 1.2) * (paused ? 0 : .13) : f.pose === 'eating' ? -.8 + Math.sin(t * 2) * (paused ? 0 : .13) : .1;
            if (playing) { f.arms[1].rotation.x = -.6 + Math.sin(t * 2.3) * (paused ? 0 : .7); f.arms[0].rotation.x = -.25 + Math.sin(t * 2.3 + 1) * (paused ? 0 : .25); }
        }
        for (const { mesh, game } of gameBalls) {
            const t = paused ? 0 : now / 1000;
            const active = !isOfficeNight() && [...figures.values()].some(f => f.pose === 'playing' && f.game.id === game.id);
            const wave = active ? Math.sin(t * 1.8) : 0;
            mesh.position.set(game.x + (game.id === 'golf' ? wave * 4 : wave * 1.5), game.id === 'pingpong' ? 1.45 + Math.abs(wave) * .65 : game.id === 'basketball' ? .15 + Math.abs(wave) * 2.2 : game.id === 'bowling' || game.id === 'golf' ? .06 : .4 + Math.abs(wave) * 2, game.z + wave * (game.kind === 'court' ? 4 : 1.3));
        }
        controls.update(); renderer.render(scene, camera);
        if (paused || now - lastLabels > 120 || easingCamera) { drawLabels(); lastLabels = now; }
        if (!paused || easingCamera) requestDraw();
    }
    function requestDraw() { if (!disposed && visible && frame === null) frame = requestAnimationFrame(render); }
    function resize() { if (disposed) return; const rect = host.getBoundingClientRect(); if (rect.width < 1 || rect.height < 1) return; renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); requestDraw(); }
    function focusRoom(room = 'all') {
        const narrow = host.clientWidth < 600, views = { all: [[0, 0, 14], [86, 90, 125]], office: [[0, 0, 0], [34, 31, 42]], umum: [[-9, .5, -5], [11, 22, 22]], operasional: [[9, .5, -5], [28, 21, 24]], lounge: [[-3, .4, 7], [17, 23, 31]], park: [[0, 0, 28], [56, 65, 96]] };
        for (const game of games) views[game.id] = [[game.x, .3, game.z], [game.x + 14, 19, game.z + 22]];
        const [target, position] = views[room] || views.all; targetFocus.set(...target); cameraGoal.set(...position);
        if (narrow) cameraGoal.sub(targetFocus).multiplyScalar(room === 'all' ? Math.max(1.23, 1.34 / Math.max(.3, host.clientWidth / host.clientHeight)) : 1.23).add(targetFocus);
        if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; } else easingCamera = true;
        requestDraw();
    }
    let dragStart = null;
    const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
    const down = e => { dragStart = [e.clientX, e.clientY]; };
    const up = e => {
        if (!dragStart || Math.hypot(e.clientX - dragStart[0], e.clientY - dragStart[1]) > 6) return; dragStart = null;
        const rect = renderer.domElement.getBoundingClientRect(); pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1);
        raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects([...figures.values()].map(f => f.group), true)[0]; if (hit?.object.userData.personId) onSelect(hit.object.userData.personId);
    };
    function theme() {
        const dark = document.documentElement.classList.contains('dark'); scene.background = new THREE.Color(dark ? '#101e25' : '#eaf0ec');
        hemi.intensity = dark ? 2.05 : 2.8; sun.intensity = dark ? 1.65 : 3.2; fill.intensity = dark ? 1.4 : 1.1;
        renderer.toneMappingExposure = dark ? 1.02 : 1.18; requestDraw();
    }
    const observer = new ResizeObserver(resize); observer.observe(host);
    const themeObserver = new MutationObserver(theme); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const lost = e => { e.preventDefault(); if (!disposed) onFailure(); };
    renderer.domElement.addEventListener('pointerdown', down); renderer.domElement.addEventListener('pointerup', up); renderer.domElement.addEventListener('webglcontextlost', lost);
    const changed = () => requestDraw(); controls.addEventListener('change', changed); controls.addEventListener('start', () => { easingCamera = false; });
    theme(); focusRoom('all'); camera.position.copy(cameraGoal); controls.target.copy(targetFocus); easingCamera = false; resize();
    return { setPeople, resize, focusRoom,
        select(id, focus = false) { selected = id; for (const [key, f] of figures) { f.ring.visible = key === id; f.label.setAttribute('aria-pressed', String(key === id)); } const f = figures.get(id); if (f && focus) { targetFocus.copy(f.target).add(new THREE.Vector3(0, 1, 0)); cameraGoal.copy(targetFocus).add(new THREE.Vector3(11, 11, 14)); if (paused) { camera.position.copy(cameraGoal); controls.target.copy(targetFocus); } else easingCamera = true; } requestDraw(); },
        zoom(factor) { camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target); controls.update(); requestDraw(); },
        setPaused(value) { paused = value; if (frame !== null) cancelAnimationFrame(frame); frame = null; requestDraw(); },
        setVisible(value) { visible = value; if (!value && frame !== null) { cancelAnimationFrame(frame); frame = null; } else if (value) { lastFrame = 0; resize(); requestDraw(); } },
        dispose() { disposed = true; if (frame !== null) cancelAnimationFrame(frame); frame = null; observer.disconnect(); themeObserver.disconnect(); controls.dispose();
            renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('webglcontextlost', lost);
            for (const geometry of ownedGeometries) geometry.dispose(); for (const mat of materials.values()) mat.dispose(); for (const texture of textures) texture.dispose();
            figures.forEach(f => f.label.remove()); figures.clear(); scene.clear(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); }
    };
}
