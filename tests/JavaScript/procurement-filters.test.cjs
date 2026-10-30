const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function element() {
    const handlers = {};
    return {value:'', dataset:{}, classList:{remove(){}}, handlers,
        addEventListener(type, handler){ (handlers[type] ||= []).push(handler); },
        fire(type, event = {}){ for (const callback of handlers[type] || []) callback(event); }};
}
function setup() {
    const search = element(), select = element(), apply = element(), hint = element(), root = element();
    let calls = 0, lock = null;
    root.querySelector = key => ({'#searchInput':search, '#filterPendingHint':hint, '#applyProcurementFilters':apply, '#searchSpinner':element()})[key];
    root.querySelectorAll = () => [search, select];
    const window = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/assets/app/procurement-filters.js'), 'utf8'), {window, document:{getElementById:()=>root}});
    const bind = () => window.ProcurementFilters.bind({apply:()=>calls++, lockedSearch:()=>lock});
    bind();
    return {search, select, apply, hint, calls:()=>calls, setLock:v=>lock=v, bind};
}
test('typing and selecting filters never send a request or navigate', () => {
    const h = setup();
    for (let i = 0; i < 30; i++) h.search.fire('input');
    h.select.fire('change');
    assert.equal(h.calls(), 0);
    assert.match(h.hint.textContent, /belum diterapkan/);
});
test('Enter and Apply each apply once; IME composing Enter does not submit', () => {
    const h = setup(); let prevented = 0;
    h.search.fire('keydown', {key:'Enter', isComposing:true});
    assert.equal(h.calls(), 0);
    h.search.fire('keydown', {key:'Enter', preventDefault:()=>prevented++});
    h.apply.fire('click');
    assert.equal(h.calls(), 2); assert.equal(prevented, 1);
});
test('binding twice cannot duplicate requests and secure deletion prevents autofill search', () => {
    const h = setup(); h.bind(); h.apply.fire('click'); assert.equal(h.calls(), 1);
    h.setLock('PR lama'); h.search.value = 'email-autofill@example.com'; h.search.fire('input'); h.apply.fire('click');
    assert.equal(h.calls(), 1); assert.equal(h.search.value, 'PR lama');
});
for (const kind of ['sp', 'spph']) {
    test(`${kind}: clear/quick date only stage filters, and save/delete use shared simulation`, () => {
        const source = fs.readFileSync(path.join(__dirname, `../../public/assets/${kind}/${kind}.js`), 'utf8');
        for (const name of ['clearSearch','clearPic','clearDate','setQuickDate']) {
            const start = source.indexOf(`function ${name}(`);
            const end = source.indexOf('\n        }', start);
            const fragment = source.slice(start, Math.min(end + 10, source.indexOf('\n        function ', start + 1) > 0 ? source.indexOf('\n        function ', start + 1) : end + 10));
            assert.doesNotMatch(fragment, /doSearch\(\)/);
        }
        assert.ok(source.includes(`ProcurementReview.confirm(form, '${kind}', isEdit)`));
        assert.ok(source.includes(`ProcurementReview.confirmDelete('${kind}', url)`));
        assert.doesNotMatch(source, /setTimeout\(doSearch/);
    });
}
