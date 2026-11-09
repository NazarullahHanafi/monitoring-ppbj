const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture() {
    function element() {
        const handlers = {};
        return {
            value: '', dataset: {}, handlers, focus() {}, select() {},
            addEventListener(name, callback) { (handlers[name] ||= []).push(callback); },
            fire(name, event = {}) { for (const callback of handlers[name] || []) callback(event); },
        };
    }
    const search = element(), apply = element(), hint = element(), root = element();
    root.querySelector = selector => ({ '#searchInput': search, '#applyProcurementFilters': apply, '#filterPendingHint': hint })[selector] || null;
    root.querySelectorAll = () => [search];
    const ready = [], visits = [], addButton = element();
    const location = { origin: 'https://procurement.test', search: '?search=lama&page=4' };
    let href = location.origin + '/vendors' + location.search;
    Object.defineProperty(location, 'href', {
        get: () => new URL(href, location.origin).href,
        set: value => { href = value; visits.push(value); },
    });
    const context = vm.createContext({
        URL, URLSearchParams,
        window: { location, VENDOR_PAGE_CONFIG: { indexUrl: location.origin + '/vendors' } },
        document: {
            getElementById: id => ({ searchInput: search, procurementFilters: root })[id],
            querySelector: () => addButton,
            addEventListener: (name, callback) => { if (name === 'DOMContentLoaded') ready.push(callback); },
        },
        setTimeout() { assert.fail('Typing must not schedule automatic navigation'); },
    });
    for (const asset of ['app/procurement-filters.js', 'vendor/vendor.js']) {
        vm.runInContext(fs.readFileSync(path.join(__dirname, '../../public/assets', asset), 'utf8'), context);
    }
    ready.forEach(callback => callback());
    return { search, apply, hint, visits, context };
}

test('Vendor typing/paste/change stay on the current page and show the pending hint', () => {
    const f = fixture();
    for (const text of ['P', 'PT', 'PT Satu', 'PT Satu & Rekan']) {
        f.search.value = text;
        f.search.fire('input');
    }
    f.search.fire('change');
    assert.deepEqual(f.visits, []);
    assert.match(f.hint.textContent, /belum diterapkan/);
});

test('Vendor Apply trims and encodes search safely and returns to page one', () => {
    const f = fixture();
    f.search.value = '  PT Satu & Rekan + Cabang  ';
    f.apply.fire('click');
    assert.equal(f.visits.length, 1);
    const url = new URL(f.visits[0], 'https://procurement.test');
    assert.equal(url.pathname, '/vendors');
    assert.equal(url.searchParams.get('search'), 'PT Satu & Rekan + Cabang');
    assert.equal(url.searchParams.has('page'), false);
});

test('Vendor Enter applies once while composing Enter leaves the input alone', () => {
    const f = fixture();
    f.search.value = 'Nusantara';
    f.search.fire('keydown', { key: 'Enter', isComposing: true });
    assert.deepEqual(f.visits, []);
    let prevented = 0;
    f.search.fire('keydown', { key: 'Enter', preventDefault() { prevented++; } });
    assert.deepEqual(f.visits, ['/vendors?search=Nusantara']);
    assert.equal(prevented, 1);
});

test('Vendor Reset and the applied search chip clear drafts and immediately refresh once', () => {
    for (const action of ['resetFilters', 'clearSearch']) {
        const f = fixture();
        f.search.value = 'draft belum diterapkan';
        f.context[action]();
        assert.equal(f.search.value, '');
        assert.deepEqual(f.visits, ['/vendors']);
    }
});

test('Vendor empty search clears pagination and zero remains searchable', () => {
    for (const [value, destination] of [['  ', '/vendors'], ['0', '/vendors?search=0']]) {
        const f = fixture();
        f.search.value = value;
        f.apply.fire('click');
        assert.deepEqual(f.visits, [destination]);
    }
});
