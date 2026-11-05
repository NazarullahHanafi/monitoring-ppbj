const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const load = import(pathToFileURL(path.resolve(__dirname, '../../resources/js/virtual-office-navigation.js')));

test('walking routes go around thin nets, walls and tables, never through their segments', async () => {
    const { createOfficeNavigation } = await load, nav = createOfficeNavigation();
    nav.addBox(.1, 8, 0, 0, 'net', 1.8); nav.addBox(3, 2, 4, 5, 'table', 1.4);
    const from = { x: -3, z: 0 }, to = { x: 3, z: 0 };
    assert.equal(nav.segment(from, to), false); assert.equal(nav.free(0, 0), false);
    const route = nav.path(from, to); assert.ok(route.length > 10);
    let previous = from;
    for (const point of route) { assert.ok(nav.free(point.x, point.z)); assert.ok(nav.segment(previous, point)); previous = point; }
    assert.deepEqual(route.at(-1), to);
    assert.deepEqual(nav.move(from, to, 10), from, 'A long frame must not tunnel through a thin net.');
    assert.equal(nav.free(4, 5), false);assert.equal(nav.free(44,0),true,'Scenic ground outside campus is walkable.'); assert.equal(nav.free(101, 0), false);
});

test('close camera stops before walls but can orbit above their roof height', async () => {
    const { createOfficeNavigation } = await load, nav = createOfficeNavigation(); nav.addBox(.2, 8, 0, 0, 'wall', 3);
    assert.ok(nav.cameraLimit({ x: -2, y: 1.5, z: 0 }, { x: 3, y: 2, z: 0 }) < .5);
    assert.equal(nav.cameraLimit({ x: -2, y: 5, z: 0 }, { x: 3, y: 5, z: 0 }), 1);
});
