import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { weatherFor } from './virtual-office-world-state.js';

// Original low-poly terrain and sky. A single points buffer supplies rain/snow;
// no textures, remote assets, extra lights, or per-particle DOM are required.
export function createOfficeEnvironment({ scene, ownedGeometries, materials, sun, hemi, fill, navigation = null }) {
    const group = new THREE.Group(); scene.add(group);
    const own = geometry => { ownedGeometries.add(geometry); return geometry; };
    function mat(key, options) { const value = new THREE.MeshStandardMaterial(options); materials.set('environment:'+key, value); return value; }
    const grass = mat('grass', { color: '#a5b99a', roughness: 1 });
    const rock = mat('rock', { color: '#82958f', roughness: 1, flatShading: true });
    const cap = mat('snowcap', { color: '#ecefe7', roughness: 1, flatShading: true });
    const trees = mat('forest', { color: '#4c7262', roughness: 1 });
    const ground = new THREE.Mesh(own(new THREE.PlaneGeometry(850, 850)), grass); ground.rotation.x = -Math.PI / 2; ground.position.y = -1.3; group.add(ground);
    const mountainParts = [], capParts = [], forestParts = [];
    const matrix = new THREE.Matrix4(), quaternion = new THREE.Quaternion();
    function baked(geometry, destination, x, y, z, sx = 1, sy = 1, sz = 1) {
        const g = geometry.index ? geometry.toNonIndexed() : geometry; if (g !== geometry) geometry.dispose();
        g.applyMatrix4(matrix.compose(new THREE.Vector3(x, y, z), quaternion, new THREE.Vector3(sx, sy, sz))); destination.push(g);
    }
    for (let i = 0; i < 20; i++) {
        const angle = i / 20 * Math.PI * 2, x = Math.cos(angle) * (155 + i % 3 * 18), z = -70 + Math.sin(angle) * 230;
        const height = 35 + i % 5 * 13, radius = 25 + i % 4 * 9;
        baked(new THREE.ConeGeometry(radius, height, 7), mountainParts, x, height / 2 - 1.3, z, 1.2, 1, 1);
        baked(new THREE.ConeGeometry(radius * .28, height * .28, 7), capParts, x, height * .86 - 1.25, z, 1.2, 1, 1);
    }
    for (let i = 0; i < 100; i++) {
        const side = i % 2 ? -1 : 1, x = side * (51 + i % 9 * 4), z = -210 + Math.floor(i / 2) * 5.4, h = 3.5 + i % 4;
        baked(new THREE.ConeGeometry(1.3 + i % 3 * .25, h, 6), forestParts, x, h / 2 - .8, z);
        if(z>=-22&&z<=92)navigation?.addBox(2.6,2.6,x,z,'forest-tree',h);
    }
    function batch(parts, material) { const geometry = own(mergeGeometries(parts, false)); parts.forEach(p => p.dispose()); const mesh = new THREE.Mesh(geometry, material); group.add(mesh); return mesh; }
    const mountains = batch(mountainParts, rock), snowcaps = batch(capParts, cap), forest = batch(forestParts, trees);
    const cloudParts = [];
    for (let i = 0; i < 14; i++) for (let n = 0; n < 4; n++) baked(new THREE.SphereGeometry(1, 9, 6), cloudParts,
        -100 + i % 7 * 32 + (n - 1.5) * 4, 29 + i % 4 * 4 + n % 2 * 1.5, -120 + Math.floor(i / 7) * 165, 7, 3.2, 4.8);
    const cloudMaterial = mat('clouds', { color: '#f5f2e9', roughness: 1, transparent: true, opacity: .75, depthWrite: false });
    const clouds = batch(cloudParts, cloudMaterial);
    const particleCount = 6000, positions = new Float32Array(particleCount * 3), rainPositions=new Float32Array(particleCount*6), origins = [];
    for (let i = 0; i < particleCount; i++) origins.push({ x: ((i * 73.31) % 64) - 32, y: i * 17.73 % 32, z: ((i * 41.71) % 70) - 35 });
    const particleGeometry = own(new THREE.BufferGeometry()); particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setDrawRange(0, 320);
    const particleMaterial = new THREE.PointsMaterial({ color: '#d9eef2', size: .11, transparent: true, opacity: .65, depthWrite: false, sizeAttenuation: true }); materials.set('environment:particles', particleMaterial);
    const precipitation = new THREE.Points(particleGeometry, particleMaterial); precipitation.frustumCulled = false; group.add(precipitation);
    const rainGeometry=own(new THREE.BufferGeometry());rainGeometry.setAttribute('position',new THREE.BufferAttribute(rainPositions,3));
    const rainMaterial=new THREE.LineBasicMaterial({color:'#b7d4e5',transparent:true,opacity:.47,depthWrite:false});materials.set('environment:rain-streaks',rainMaterial);
    const rain=new THREE.LineSegments(rainGeometry,rainMaterial);rain.frustumCulled=false;group.add(rain);
    const auroraGeometry = own(new THREE.PlaneGeometry(260, 24, 48, 4)), auroraColors = new Float32Array(auroraGeometry.attributes.position.count * 3);
    for (let i = 0; i < auroraGeometry.attributes.position.count; i++) {
        const c = new THREE.Color().setHSL(.38 + i % 49 / 49 * .34, .75, .62); c.toArray(auroraColors, i * 3);
    }
    auroraGeometry.setAttribute('color', new THREE.BufferAttribute(auroraColors, 3));
    const auroraMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: .43, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }); materials.set('environment:aurora', auroraMaterial);
    const aurora = new THREE.Mesh(auroraGeometry, auroraMaterial); aurora.position.set(0, 55, -235); group.add(aurora);
    const originalAurora = auroraGeometry.attributes.position.array.slice();
    let settings = {}, offset = 0, current = '', preset = '', low = false, extent = -60;
    const palettes = { alps: ['#a5b99a', '#82958f', '#4c7262'], village: ['#b5bb8d', '#a39b87', '#6b805c'], nordic: ['#9dafaa', '#7a919e', '#3f6864'] };
    function applyTheme(dark) {
        const mode = weatherFor(settings, Date.now() + offset).mode;
        if (mode === current && preset === `${settings.landscape}:${dark}`) return;
        current = mode; preset = `${settings.landscape}:${dark}`;
        const colors = palettes[settings.landscape] || palettes.alps; grass.color.set(colors[0]); rock.color.set(colors[1]); trees.color.set(colors[2]);
        const night = mode === 'aurora';
        scene.background = new THREE.Color(night ? '#102339' : dark ? '#142730' : mode === 'rain' ? '#a6babd' : mode === 'snow' ? '#dce6e8' : '#d6e7e8');
        scene.fog = new THREE.FogExp2(scene.background, mode === 'mist' ? .007 : mode === 'rain' ? .0035 : .0013);
        sun.intensity = night ? .6 : mode === 'rain' ? 1.35 : dark ? 1.65 : 2.7;
        hemi.intensity = night ? 1.6 : dark ? 2.05 : 2.6; fill.intensity = night ? 1.8 : 1.1;
        cloudMaterial.color.set(mode === 'rain' ? '#859c9f' : '#f5f2e9');
        particleMaterial.color.set('#ffffff'); particleMaterial.size = .13;
    }
    return {
        configure(world = {}, energySaver = false) {
            settings = world.settings || {}; if (Number.isFinite(world.server_ms)) offset = world.server_ms - Date.now(); low = energySaver;
            mountains.visible = snowcaps.visible = settings.mountains !== false; clouds.visible = settings.clouds !== false;
            const intensity=settings.precipitation||'heavy';const count=low?900:intensity==='light'?650:intensity==='storm'?5800:3600;
            particleGeometry.setDrawRange(0,count);rainGeometry.setDrawRange(0,count*2);preset = '';
        },
        update(milliseconds, { paused = false, dark = false, center = null } = {}) {
            applyTheme(dark); const mode = current, t = paused ? 0 : milliseconds / 1000;
            clouds.position.x = paused ? 0 : Math.sin(t * .012) * 9;
            precipitation.visible = mode==='snow';rain.visible=mode==='rain'; aurora.visible = mode === 'aurora';
            if (precipitation.visible||rain.visible) {
                const count = particleGeometry.drawRange.count, cx = center?.x || 0, cz = center?.z || 0;
                for (let i = 0; i < count; i++) { const origin = origins[i],x=origin.x+cx+Math.sin(t*.4+i)*(mode==='snow'?.55:.1),y=(origin.y-t*(mode==='snow'?1.4:20)%32+32)%32,z=origin.z+cz;
                    if(mode==='snow'){positions[i*3]=x;positions[i*3+1]=y;positions[i*3+2]=z;}
                    else{const n=i*6;rainPositions[n]=x;rainPositions[n+1]=y;rainPositions[n+2]=z;rainPositions[n+3]=x+.1;rainPositions[n+4]=y-.9;rainPositions[n+5]=z;}
                }
                (mode==='snow'?particleGeometry:rainGeometry).attributes.position.needsUpdate = true;
            }
            if (aurora.visible) { const array = auroraGeometry.attributes.position.array; for (let i = 0; i < array.length; i += 3) { array[i + 1] = originalAurora[i + 1] + Math.sin(originalAurora[i] * .035 + t * .3) * 5; array[i + 2] = Math.cos(originalAurora[i] * .02 + t * .17) * 9; } auroraGeometry.attributes.position.needsUpdate = true; }
        },
        extent(back) { if (back === extent) return; extent = back; forest.scale.z = Math.max(1, Math.abs(back) / 210); },
        dispose() { scene.remove(group); scene.fog = null; group.clear(); }
    };
}
