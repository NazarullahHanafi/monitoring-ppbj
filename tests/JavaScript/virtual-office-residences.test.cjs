const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('each account has a stable private home; only the selected roof/front open and instances stay bounded', async () => {
    const THREE = await import('three');
    const { createResidences } = await import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-residences.js')));
    const scene = new THREE.Scene(), geometries = new Set(), materials = new Map();
    const homes = createResidences({ scene, ownedGeometries: geometries, material: color => {
        if (!materials.has(color)) materials.set(color, new THREE.MeshBasicMaterial({ color }));
        return materials.get(color);
    } });
    const people = [{ id: 91 }, { id: 5 }, { id: 12 }]; homes.sync(people);
    const positions = new Map(people.map(p => [p.id, homes.location(p.id)]));
    assert.equal(new Set([...positions.values()].map(p => `${p.x},${p.z}`)).size, 3);
    const roof = homes.meshes.find(mesh => mesh.userData.residenceLayer === 'roof');
    const front = homes.meshes.find(mesh => mesh.userData.residenceLayer === 'front');
    const shell = homes.meshes.find(mesh => mesh.userData.residenceLayer === 'shell');
    const inside = homes.meshes.find(mesh => mesh.userData.residenceLayer === 'inside');
    const matrix = new THREE.Matrix4();
    const visible = (mesh, instance) => { mesh.getMatrixAt(instance, matrix); return Math.abs(matrix.determinant()) > .1; };
    assert.ok(visible(roof, 0)); assert.ok(visible(front, 0)); assert.ok(visible(roof, 1));
    assert.equal(homes.personForHit({ object: roof, instanceId: 0 }), 5);
    homes.select(5);
    assert.equal(visible(roof, 0), false); assert.equal(visible(front, 0), false);
    assert.equal(visible(shell, 0), true); assert.equal(visible(inside, 0), true);
    assert.equal(visible(roof, 1), true); assert.equal(visible(front, 1), true);
    homes.sync([...people].reverse());
    for (const person of people) assert.deepEqual(homes.location(person.id), positions.get(person.id), 'Changing presence order must not exchange owners.');
    assert.deepEqual(homes.bed(5), [positions.get(5).x - 2.05, .92, positions.get(5).z - .5]);
    homes.select(null); assert.equal(visible(roof, 0), true); assert.equal(visible(front, 0), true);
    const door=homes.meshes.find(mesh=>mesh.userData.residenceLayer==='door');homes.setDoor(5,true);door.getMatrixAt(0,matrix);assert.ok(Math.abs(matrix.elements[0])<.001,'The door swings around its hinge.');homes.setDoor(5,false);door.getMatrixAt(0,matrix);assert.ok(Math.abs(matrix.elements[0]-1)<.001);
    homes.sync(Array.from({ length: 200 }, (_, id) => ({ id: id + 1 })));
    assert.ok(homes.meshes.length < 45, '120 furnished houses should share a small fixed number of instanced draw calls.');
    for (const mesh of homes.meshes) {
        assert.equal(mesh.count, 128);
        assert.ok([...mesh.instanceMatrix.array].every(Number.isFinite));
        assert.ok([...mesh.geometry.getAttribute('position').array].every(Number.isFinite));
    }
    assert.equal(homes.location(129), null);
    homes.sync([]); homes.meshes.forEach(mesh => assert.equal(mesh.count, 0));
    homes.dispose(); assert.equal(scene.children.length, 0);
    geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
});
