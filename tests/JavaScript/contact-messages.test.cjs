const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

function harness(confirm) {
    const timers = new Map(), events = {}, submitted = [];
    let sequence = 0;
    const button = {disabled: false}, filterButton = {disabled: false}, reset = {addEventListener: (key, fn) => {events.reset = fn;}};
    function form(kind) {
        const listeners = {}, attributes = {};
        return {kind, dataset: {sender: '<img src=x>', email: 'test@example.test', subject: '<script>unsafe</script>'}, listeners,
            classList: {contains: name => name === 'cm-delete-form' && kind === 'delete'},
            addEventListener: (key, fn) => {listeners[key] = fn;}, getAttribute: key => attributes[key] ?? null,
            setAttribute: (key, value) => {attributes[key] = value;}, removeAttribute: key => {delete attributes[key];},
            submit: () => listeners.submit({preventDefault() {}})};
    }
    const read = form('read'), remove = form('delete'), feedback = {dataset: {}, hidden: true};
    const filter = {addEventListener: (key, fn) => {events.filter = fn;}, querySelector: () => reset};
    const document = {querySelector: () => filter, querySelectorAll: selector => selector === '.cm-read-form, .cm-delete-form' ? [read, remove] : [button, filterButton], getElementById: () => feedback, documentElement: {classList: {contains: () => false}}};
    const window = {Swal: confirm ? {fire: confirm} : undefined, addEventListener: (key, fn) => {events[key] = fn;}};
    const context = {document, window, setTimeout: fn => {timers.set(++sequence, fn); return sequence;}, clearTimeout: id => timers.delete(id), HTMLFormElement: {prototype: {submit() {submitted.push(this.kind);}}}};
    vm.runInNewContext(fs.readFileSync('public/assets/app/contact-messages.js', 'utf8'), context);
    return {read, remove, feedback, events, submitted, button, filterButton, window, timers};
}

test('repeated status submissions and another action cannot send a second native request', async () => {
    const h = harness();
    await h.read.submit(); await h.read.submit(); await h.remove.submit();
    assert.deepEqual(h.submitted, ['read']); assert.equal(h.button.disabled, true);
    let blocked = 0; h.events.filter({preventDefault() {blocked++;}}); h.events.reset({preventDefault() {blocked++;}});
    assert.equal(blocked, 2);
    h.events.pageshow(); assert.equal(h.button.disabled, false); assert.equal(h.timers.size, 0);
});

test('one delete confirmation owns the operation and cancel restores controls', async () => {
    let release, prompts = 0;
    const h = harness(options => {prompts++; assert.equal(options.html, undefined); assert.match(options.text, /<img src=x>/); return new Promise(resolve => {release = resolve;});});
    const pending = h.remove.submit(); await h.remove.submit(); await h.read.submit();
    assert.equal(prompts, 1); assert.equal(h.button.disabled, true); assert.equal(h.submitted.length, 0);
    release({isConfirmed: false}); await pending;
    assert.equal(h.button.disabled, false); assert.equal(h.feedback.hidden, true);
    await h.read.submit(); assert.deepEqual(h.submitted, ['read']);
});

test('navigation cancels pending confirmation so a late dialog cannot submit on return', async () => {
    let release;
    const h = harness(() => new Promise(resolve => {release = resolve;}));
    const pending = h.remove.submit(); h.events.pagehide(); h.events.pageshow();
    release({isConfirmed: true}); await pending;
    assert.equal(h.submitted.length, 0); assert.equal(h.button.disabled, false);
});

test('missing confirmation components fail visibly and never invoke a native confirmation', async () => {
    const h = harness(); await h.remove.submit();
    assert.equal(h.submitted.length, 0); assert.equal(h.button.disabled, false);
    assert.match(h.feedback.textContent, /Komponen konfirmasi/); assert.equal(h.feedback.dataset.tone, 'error');
    h.window.FormUX = {confirm: async () => true}; await h.remove.submit();
    assert.deepEqual(h.submitted, ['delete']);
});

test('a navigation deadline releases the UI with uncertainty and never retries', async () => {
    const h = harness(); h.filterButton.disabled = true;
    await h.read.submit(); [...h.timers.values()][0]();
    assert.equal(h.button.disabled, false); assert.equal(h.filterButton.disabled, true);
    assert.match(h.feedback.textContent, /belum terkonfirmasi/); assert.deepEqual(h.submitted, ['read']);
});

test('custom validation can block filters while an idle reset remains available', () => {
    const h = harness(); h.window.FormUX = {validate: () => false};
    let blocked = 0; h.events.filter({preventDefault() {blocked++;}}); h.events.reset({preventDefault() {blocked++;}});
    assert.equal(blocked, 1);
});
