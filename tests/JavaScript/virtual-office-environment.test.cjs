const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('weather rotates on shared hour boundaries and explicit administrator choice stays fixed', async () => {
    const { weatherFor } = await import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-world-state.js')));
    const start = Date.UTC(2026, 10, 5), settings = { weather: 'auto', cycle_hours: 3 };
    assert.equal(weatherFor(settings, start).mode, weatherFor(settings, start + 3600000).mode);
    assert.notEqual(weatherFor(settings, start).mode, weatherFor(settings, start + 3 * 3600000).mode);
    assert.equal(weatherFor({ weather: 'snow', cycle_hours: 2 }, start + 50 * 3600000).mode, 'snow');
    assert.ok(weatherFor(settings, start).next > start);
});

test('mountain, clouds, rain, snow and aurora reuse bounded valid geometry and dispose cleanly', async () => {
    const T = await import('three'), { createOfficeEnvironment } = await import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-environment.js')));
    const scene = new T.Scene(), ownedGeometries = new Set(), materials = new Map();
    const environment = createOfficeEnvironment({ scene, ownedGeometries, materials, sun: new T.DirectionalLight(), hemi: new T.HemisphereLight(), fill: new T.DirectionalLight() });
    const count = ownedGeometries.size;
    environment.configure({settings:{weather:'rain',precipitation:'light'}});environment.update(1000);
    let rain;scene.traverse(n=>{if(n.isLineSegments)rain=n;});assert.equal(rain.visible,true);assert.equal(rain.geometry.drawRange.count,1300);
    const buffer=rain.geometry.attributes.position;
    environment.configure({settings:{weather:'rain',precipitation:'storm'}});environment.update(1100);
    assert.equal(rain.geometry.drawRange.count,11600);assert.equal(rain.geometry.attributes.position,buffer,'Storm reuses its original GPU buffer.');
    for (const weather of ['clear', 'rain', 'snow', 'aurora', 'mist']) {
        environment.configure({ settings: { weather, landscape: 'village', particles: 'medium', mountains: true, clouds: true }, server_ms: Date.now() }); environment.update(2000);
        scene.traverse(node => { if (node.geometry) assert.ok([...node.geometry.attributes.position.array].every(Number.isFinite)); if (node.isPoints) assert.ok(node.geometry.drawRange.count <= 6000); });
        assert.equal(ownedGeometries.size, count, 'Switching weather must not allocate another scene or particle buffer.');
    }
    environment.configure({ settings: { weather: 'snow', particles: 'medium' } }, true); environment.update(3000, { paused: true });
    scene.traverse(node => { if (node.isPoints) assert.ok(node.geometry.drawRange.count <= 900); });
    environment.dispose(); assert.equal(scene.children.length, 0); assert.equal(scene.fog, null);
    ownedGeometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
});
