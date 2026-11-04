const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('procedural 3D office builds valid batched geometry, bounds avatars and releases frames/resources', async () => {
    const THREE = await import('three');
    const { createOfficeScene } = await import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-scene.js')));
    const previous = {};
    for (const key of ['window', 'document', 'ResizeObserver', 'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame']) previous[key] = global[key];
    const frames = new Map(); let frameId = 0, rendered = null, disposed = false;
    class Node {
        constructor() { this.style = {}; this.children = []; this.events = {}; this.clientWidth = 1000; this.clientHeight = 600; }
        append(node) { this.children.push(node); node.parent = this; }
        addEventListener(name, fn) { this.events[name] = fn; }
        removeEventListener(name) { delete this.events[name]; }
        setAttribute() {}
        remove() { if (this.parent) this.parent.children = this.parent.children.filter(node => node !== this); }
        getBoundingClientRect() { return { width: this.clientWidth, height: this.clientHeight, left: 0, top: 0 }; }
        getContext() { return { clearRect() {}, fillRect() {}, fillText() {}, createRadialGradient: () => ({ addColorStop() {} }) }; }
    }
    try {
        global.window = { devicePixelRatio: 3 };
        global.document = { createElement: () => new Node(), documentElement: { classList: { contains: () => false } } };
        global.ResizeObserver = global.MutationObserver = class { observe() {} disconnect() {} };
        global.requestAnimationFrame = fn => { const id = ++frameId; frames.set(id, fn); return id; };
        global.cancelAnimationFrame = id => frames.delete(id);
        const host = new Node(), labels = new Node(), element = new Node(); let ratio;
        const scene = createOfficeScene({ host, labels, onSelect() {}, onFailure() {},
            rendererFactory: () => ({ domElement: element, setPixelRatio: value => { ratio = value; }, setSize() {},
                render(world, camera) { world.updateMatrixWorld(true); camera.updateMatrixWorld(true); rendered = { world, camera }; }, dispose() { disposed = true; }, forceContextLoss() {} }),
            controlsFactory: camera => ({ target: new THREE.Vector3(), addEventListener() {}, update() { camera.lookAt(this.target); camera.updateMatrixWorld(true); }, dispose() {} }) });
        const people = Array.from({ length: 100 }, (_, index) => ({ id: index + 1, name: `User ${index}`, department: index % 2 ? 'umum' : 'operasional', state: index % 3 === 0 ? 'online' : index % 3 === 1 ? 'idle' : 'offline' }));
        scene.setPeople(people);
        assert.equal(labels.children.length, 24);
        assert.equal(ratio, 1.5, 'GPU resolution must be bounded on high-DPI screens.');
        const draw = now => { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(now); };
        draw(100);
        assert.ok(rendered); let meshCount = 0, coordinateCount = 0;
        rendered.world.traverse(node => {
            if (!node.isMesh) return; meshCount++;
            const coordinates = node.geometry.getAttribute('position');
            for (const value of coordinates.array) { assert.ok(Number.isFinite(value)); coordinateCount++; }
            assert.ok(node.position.toArray().every(Number.isFinite));
        });
        assert.ok(coordinateCount > 10000, 'The room must contain actual geometry.');
        assert.ok(meshCount < 500, `Static furniture should be batched; got ${meshCount} meshes.`);
        scene.setPaused(true); draw(200); assert.equal(frames.size, 0, 'Paused scene must not leave an animation loop.');
        host.clientWidth = 350; host.clientHeight = 430; scene.resize(); scene.focusRoom('all'); draw(300);
        rendered.camera.updateMatrixWorld(true);
        for (const corner of [[-20.25, 0, -13.5], [20.25, 0, -13.5], [-20.25, 0, 13.5], [20.25, 0, 13.5]]) {
            const projected = new THREE.Vector3(...corner).project(rendered.camera);
            assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1, `Default mobile camera must contain the office floor: ${projected.toArray()}`);
        }
        scene.setPeople(people.slice(0, 2)); assert.equal(labels.children.length, 2);
        scene.setVisible(false); assert.equal(frames.size, 0);
        scene.dispose(); assert.equal(disposed, true); assert.equal(host.children.length, 0); assert.equal(labels.children.length, 0); assert.equal(frames.size, 0);
    } finally { for (const [key, value] of Object.entries(previous)) { if (value === undefined) delete global[key]; else global[key] = value; } }
});
