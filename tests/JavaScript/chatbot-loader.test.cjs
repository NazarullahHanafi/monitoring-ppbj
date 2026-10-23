const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../public/assets/app/chatbot-loader.js'), 'utf8');

function fixture(hidden = false) {
    const events = {};
    const windowEvents = {};
    const timers = new Map();
    const scripts = [];
    const attributes = new Map();
    let click;
    let nextTimer = 0;
    let toggles = 0;
    const toggle = {
        addEventListener(name, handler) { if (name === 'click') click = handler; },
        setAttribute(name, value) { attributes.set(name, value); },
        removeAttribute(name) { attributes.delete(name); }
    };
    const document = {
        hidden,
        currentScript: { dataset: { runtimeUrl: '/assets/app/chatbot.js?v=test' } },
        getElementById: () => toggle,
        createElement: () => ({ remove() {} }),
        body: { appendChild(script) { scripts.push(script); } },
        addEventListener(name, handler) { events[name] = handler; }
    };
    const window = {
        setTimeout(fn) { const id = ++nextTimer; timers.set(id, fn); return id; },
        clearTimeout(id) { timers.delete(id); },
        addEventListener(name, handler) { windowEvents[name] = handler; },
        toggleChatbot() { toggles++; }
    };
    vm.runInNewContext(source, { document, window, Promise, Error });
    return {
        scripts, timers, attributes,
        click() { click({ preventDefault() {}, stopImmediatePropagation() {} }); },
        visibility(hidden) { document.hidden = hidden; events.visibilitychange(); },
        tick() { const pending = [...timers.values()]; timers.clear(); pending.forEach(fn => fn()); },
        pagehide() { windowEvents.pagehide(); },
        pageshow() { windowEvents.pageshow(); },
        toggles: () => toggles
    };
}

test('chat runtime is not downloaded during the initial render and waits while hidden', () => {
    const f = fixture();
    assert.equal(f.scripts.length, 0);
    f.visibility(true);
    f.tick();
    assert.equal(f.scripts.length, 0);
    f.visibility(false);
    f.tick();
    assert.equal(f.scripts.length, 1);
    assert.equal(f.scripts[0].src, '/assets/app/chatbot.js?v=test');
});

test('first click opens only once after download, without duplicate loads', async () => {
    const f = fixture();
    f.click();
    f.click();
    assert.equal(f.scripts.length, 1);
    assert.equal(f.toggles(), 0);
    f.scripts[0].onload();
    await new Promise(setImmediate);
    assert.equal(f.toggles(), 1);
    assert.equal(f.attributes.has('aria-busy'), false);
    f.tick();
    assert.equal(f.scripts.length, 1);
});

test('failed download can be retried instead of leaving an unresponsive button', async () => {
    const f = fixture();
    f.click();
    f.scripts[0].onerror();
    await new Promise(setImmediate);
    f.click();
    assert.equal(f.scripts.length, 2);
    f.scripts[1].onload();
    await new Promise(setImmediate);
    assert.equal(f.toggles(), 1);
});

test('back/forward page restore reschedules a cancelled idle load', () => {
    const f = fixture();
    f.pagehide();
    assert.equal(f.timers.size, 0);
    f.pageshow();
    f.tick();
    assert.equal(f.scripts.length, 1);
});

test('archive popup functions remain available from the cacheable asset', async () => {
    const archiveSource = fs.readFileSync(path.join(__dirname, '../../public/assets/app/archive-popup.js'), 'utf8');
    let dialog;
    const scope = {
        window: {}, document: { documentElement: { classList: { contains: () => true } } },
        Swal: { async fire(options) { dialog = options; } }
    };
    vm.runInNewContext(archiveSource, scope);
    assert.equal(typeof scope.window.openArchiveAttachmentList, 'function');
    assert.equal(typeof scope.window.openArchiveAttachmentUpload, 'function');
    await scope.window.openArchiveAttachmentList({});
    assert.equal(dialog.title, 'Alamat arsip belum tersedia');
    assert.equal(dialog.background, '#0f172a');
});
