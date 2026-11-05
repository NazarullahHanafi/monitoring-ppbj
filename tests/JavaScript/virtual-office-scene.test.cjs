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
        append(...nodes) { for(const node of nodes){this.children.push(node);node.parent=this;} }
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
            getDate: () => new Date('2026-11-04T12:00:00Z'),
            rendererFactory: () => ({ domElement: element, setPixelRatio: value => { ratio = value; }, setSize() {},
                render(world, camera) { world.updateMatrixWorld(true); camera.updateMatrixWorld(true); rendered = { world, camera }; }, dispose() { disposed = true; }, forceContextLoss() {} }),
            controlsFactory: camera => ({ target: new THREE.Vector3(), addEventListener() {}, update() { camera.lookAt(this.target); camera.updateMatrixWorld(true); }, dispose() {} }) });
        const people = Array.from({ length: 100 }, (_, index) => ({ id: index + 1, name: `User ${index}`, department: index % 2 ? 'umum' : 'operasional', state: index % 3 === 0 ? 'online' : index % 3 === 1 ? 'idle' : 'offline' }));
        scene.setPeople(people);
        assert.deepEqual(scene.collisionBoxes(),JSON.parse(require('node:fs').readFileSync(path.resolve(__dirname,'../../resources/data/virtual-office-collisions.json'),'utf8')),'Server collision metadata must match every physical scene obstacle.');
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
        assert.ok(meshCount < 750, `Expanded campus and 24 detailed avatars must stay bounded; got ${meshCount} meshes.`);
        const beams=rendered.world.children.filter(n=>n.userData.rivageEffect==='beam');assert.equal(beams.length,4);assert.ok(beams.every(n=>n.material.opacity<.05));
        assert.equal(rendered.world.children.filter(n=>n.userData.officeVenue==='bar').length,2,'Counter and physical menu stand must be clickable.');
        scene.setVenueEffects(false);draw(160);assert.ok(beams.every(n=>!n.visible),'Calm lighting must disable atmospheric beams.');
        scene.setPaused(true); draw(200); assert.equal(frames.size, 0, 'Paused scene must not leave an animation loop.');
        host.clientWidth = 350; host.clientHeight = 430; scene.resize(); scene.focusRoom('all'); draw(300);
        rendered.camera.updateMatrixWorld(true);
        for (const corner of [[-43, 0, -180], [43, 0, -180], [-43, 0, 76], [43, 0, 76]]) {
            const projected = new THREE.Vector3(...corner).project(rendered.camera);
            assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1, `Default mobile camera must contain the office floor: ${projected.toArray()}`);
        }
        scene.setPeople(people.slice(0, 2)); assert.equal(labels.children.length, 2);
        scene.setPeople(people.slice(0, 2).map(person => ({ ...person, state: 'offline' })));
        scene.select(1, true); draw(400);
        let body = null;
        rendered.world.traverse(node => {
            if (node.isGroup && Math.abs(node.rotation.x + Math.PI / 2) < .001) body = node;
        });
        assert.ok(body, 'Sleeping body must lie horizontally on a bed, not slouch on a sofa.');
        const position = new THREE.Vector3(); body.getWorldPosition(position);
        assert.ok(position.z < -20, 'Sleeping avatars must be inside the residential neighbourhood.');
        assert.ok(position.y > .88 && position.y < 1, 'Sleeping avatars must rest at mattress height.');
        const roof = rendered.world.children.find(node => node.userData.residenceLayer === 'roof');
        const instance = new THREE.Matrix4(); roof.getMatrixAt(0, instance); assert.equal(instance.determinant(), 0);
        roof.getMatrixAt(1, instance); assert.ok(instance.determinant() > .9, 'Other homes remain closed.');
        scene.select(null); draw(500); roof.getMatrixAt(0, instance); assert.ok(instance.determinant() > .9, 'Closing detail restores the roof.');
        scene.setMeeting({ connected: true, room: { from: 1, to: 2, spot: 5, id: 'test-meeting' } });
        scene.setPaused(false);
        for (let i = 0; i < 120; i++) draw(600 + i * 40);
        assert.equal(scene.meetingReady(), true, 'Both online avatars must reach unobstructed meeting spots and face each other.');
        scene.setCameraMode('follow', 1); draw(5600); assert.equal(rendered.camera.fov, 44);
        scene.setCameraMode('portrait', 1); draw(5640);
        scene.setPaused(true); draw(5680); assert.equal(scene.meetingReady(), true, 'Reduced motion must still allow face-to-face chat.');
        scene.setMeeting({ room: null, connected: false });
        scene.setPeople(people.slice(0, 2).map(person => ({ ...person, state: 'online' })));
        scene.setPaused(false); scene.setMeeting({ connected: true, room: { from: 1, to: 2, spot: 5, id: 'desk-meeting' } });
        for (let i = 0; i < 900; i++) draw(5800 + i * 40);
        assert.equal(scene.meetingReady(), true, 'Avatars must be able to navigate out of their desks and around other participants.');
        for (let spot = 0; spot < 12; spot++) {
            scene.setMeeting({ room: null, connected: false }); scene.setPeople(people.slice(0, 2).map(person => ({ ...person, state: 'online' })));
            scene.setMeeting({ connected: true, room: { from: 1, to: 2, spot, id: 'spot-'+spot } });
            for (let i = 0; i < 1200; i++) draw(50000 + spot * 50000 + i * 40);
            const positions = []; rendered.world.children.filter(n => n.isGroup).forEach(g => { let id = null; g.traverse(n => { if (n.userData.personId) id = n.userData.personId; }); if (id) positions.push([id, g.position.toArray(), g.rotation.y]); });
            assert.equal(scene.meetingReady(), true, `Both avatars must reach meeting spot ${spot}: ${JSON.stringify(positions)}`);
        }
        scene.setMeeting({room:null,connected:false});
        scene.setPeople([{...people[0],state:'online',is_me:true},{...people[1],state:'offline'}]);
        const positionFor = id => rendered.world.children.find(g=>{if(!g.isGroup)return false;let found=false;g.traverse(n=>{if(n.userData.personId===id)found=true;});return found;})?.position;
        let stamp=700000;
        for(const [destination,x,z]of [['bar',-30.5,49],['disco',-31.5,56],['beach',-33.5,69],['garden',-6.5,61],['terrace',18.5,67],['lounge',-12.5,10]]){
            scene.setRecreation(1,{destination,kind:'drink'});
            for(let i=0;i<2200;i++)draw(stamp+i*40);stamp+=100000;
            const p=positionFor(1);assert.ok(Math.hypot(p.x-x,p.z-z)<1.1,`Avatar must actually reach ${destination}, got ${p.toArray()}`);
        }
        scene.setGame({from:1,to:2,kind:'archery',bot:true,status:'playing'});
        for(let i=0;i<2200;i++)draw(stamp+i*40);
        const npc=positionFor(2);assert.ok(npc.z>37&&npc.x>20,`Offline NPC must arrive from home to the archery range: ${npc.toArray()}`);
        scene.say(1,'<script>inert speech</script>');assert.equal(labels.children.find(l=>l.children[1].textContent===people[0].name).children.at(-1).textContent,'<script>inert speech</script>');
        scene.setGame(null);scene.setMeeting(null);
        scene.setPeople([{...people[0],is_me:true,state:'online',in_office:true},{...people[1],state:'online',in_office:false}]);
        scene.setPilot(1,{x:0,y:-.12,z:21,yaw:0});scene.setPaused(true);
        draw(stamp+100000);let manual=scene.pilotState();assert.equal(manual.z,21);
        scene.setGame({from:1,to:2,kind:'badminton',status:'playing'});draw(stamp+100040);
        assert.equal(scene.pilotState().z,21,'Starting a game cannot move the controlled avatar automatically.');
        assert.ok(positionFor(2).z<0,'A colleague on a business menu remains seated at a computer despite an old invitation.');
        scene.setPilotInput({x:1,boost:true,jump:true});
        for(let i=0;i<12;i++)draw(stamp+100080+i*40);
        manual=scene.pilotState();assert.ok(manual.x>2);assert.ok(manual.y>-.12);
        scene.setPilotGate(()=>true);const frozen=manual.x;draw(stamp+100600);assert.equal(scene.pilotState().x,frozen,'A modal must gate motion at render time.');
        scene.guideTo('archery');assert.equal(rendered.world.children.find(n=>n.userData.pilotGuide).position.x,32);
        assert.equal(scene.canInteract('archery'),false);
        scene.releasePilot();scene.setPilotGate(()=>false);scene.setGame(null);
        scene.setPilot(777,{x:0,y:-.12,z:21,yaw:0},{id:777,name:'Private self',state:'online',department:'umum',is_me:true,private:true});
        scene.setPeople(people.slice(0,2));draw(stamp+100640);assert.ok(positionFor(777),'Own private avatar survives directory refresh without entering the public roster.');
        scene.releasePilot();draw(stamp+100680);assert.equal(positionFor(777),undefined);
        scene.setVisible(false); assert.equal(frames.size, 0);
        scene.dispose(); assert.equal(disposed, true); assert.equal(host.children.length, 0); assert.equal(labels.children.length, 0); assert.equal(frames.size, 0);
    } finally { for (const [key, value] of Object.entries(previous)) { if (value === undefined) delete global[key]; else global[key] = value; } }
});
