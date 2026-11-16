const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const blade = fs.readFileSync('resources/views/ppbj/index.blade.php', 'utf8');
const fixture = blade.slice(blade.indexOf('    <div id="ppbjNotesModal"'), blade.indexOf('    {{-- ================= MODAL MASTER DATA'));
const source = fs.readFileSync('public/assets/ppbj/ppbj.js', 'utf8');
const script = source.slice(source.indexOf('        (function () {', source.indexOf('// PRE-FLIGHT + COLLABORATION NOTES')));

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native dialog'); dialog.dismiss();});
            await page.setContent('<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><button id="open" onclick="openPpbjNotes(1)">Catatan</button><span id="ppbjMentionHeaderBadge">4</span><span id="ppbjNoteCount_1">53</span><span id="ppbjNoteCount_2">1</span>' + fixture);
            await page.addStyleTag({path: 'public/assets/ppbj/ppbj.css'});
            await page.addStyleTag({content: '.hidden{display:none!important}.flex{display:flex}.flex-col{flex-direction:column}#ppbjNotesModal,#ppbjMentionInboxModal{position:fixed;inset:0;align-items:center;justify-content:center;background:#0005;padding:12px}#ppbjMentionInboxModal{z-index:2}body{margin:0}textarea{box-sizing:border-box}'});
            await page.evaluate(() => {
                window.PPBJ_PAGE_CONFIG = {collaborationBaseUrl: '/notes', csrfToken: 'synthetic-csrf', currentUserId: 1};
                window.ppbjData = {1: {collaboration_unread_count: 2}, 2: {collaboration_unread_count: 1}};
                window.net = {holdReads: false, calls: [], pending: [], notices: [], answer: {isConfirmed: true, value: 'Diedit'}};
                window.Swal = {fire: async options => {net.notices.push(options); return net.answer;}};
                window.note = {id: 10, user_name: '<img src=x onerror=window.unsafe=true>', department: 'Umum', role: 'User', body: 'Catatan awal', mentions: [], created_at: '2026-11-16 10:00:00', can_manage: true};
                window.readPayload = id => ({ppbj: {id, number: 'PR-' + id, description: 'Deskripsi ' + id}, notes: [{...note, id: id === 1 ? 10 : 20}], users: [{id: 2, name: 'Target', department: 'Operasional'}], total_notes: id === 1 ? 53 : 1});
                window.fetch = (url, options) => {
                    net.calls.push({url, options: {method: options.method || 'GET', headers: options.headers}});
                    if (options.method || net.holdReads) return new Promise(resolve => net.pending.push({url, resolve: (status, data) => resolve({ok: status < 400, status, json: async () => data})}));
                    return Promise.resolve({ok: true, json: async () => url.endsWith('/mentions') ? {mentions: []} : readPayload(Number(url.split('/').at(-1)))});
                };
            });
            await page.addScriptTag({content: script});
            if (mobile) await page.tap('#open'); else await page.click('#open');
            await page.waitForFunction(() => !document.querySelector('#ppbjNoteSubmit').disabled);
            assert.equal(await page.locator('#ppbjNoteCount_1').textContent(), '53');
            assert.equal(await page.locator('#ppbjMentionHeaderBadge').textContent(), '2');
            assert.equal(await page.locator('img').count(), 0);
            await page.locator('#ppbjNoteBody').fill('Draft PR satu');
            await page.evaluate(() => openPpbjNotes(2));
            assert.equal(await page.locator('#ppbjNoteBody').inputValue(), '');
            await page.locator('#ppbjNoteBody').fill('Draft PR dua');
            await page.evaluate(() => openPpbjNotes(1));
            assert.equal(await page.locator('#ppbjNoteBody').inputValue(), 'Draft PR satu');
            assert.equal(await page.locator('#ppbjMentionHeaderBadge').textContent(), '1');

            await page.evaluate(() => {
                const form = document.querySelector('#ppbjNotesForm');
                form.dispatchEvent(new Event('submit', {cancelable: true})); form.dispatchEvent(new Event('submit', {cancelable: true}));
                closePpbjNotes(); openPpbjNotes(2);
            });
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.options.method === 'POST').length), 1);
            assert.equal(await page.locator('#ppbjNotesTitle').textContent(), 'PR-1');
            assert.equal(await page.locator('#ppbjNoteSubmit').isDisabled(), true);
            await page.evaluate(() => net.pending.shift().resolve(500, {message: 'Hosting sibuk'}));
            await page.waitForFunction(() => !document.querySelector('#ppbjNoteSubmit').disabled);
            assert.equal(await page.locator('#ppbjNoteBody').inputValue(), 'Draft PR satu');
            assert.match(await page.evaluate(() => net.notices.at(-1).text), /belum terkonfirmasi/);
            const beforeReads = await page.evaluate(() => net.calls.filter(x => x.options.method === 'GET').length);
            await page.locator('#ppbjNoteSubmit').click();
            await page.evaluate(() => net.pending.shift().resolve(201, {note: {...note, id: 11, body: 'Draft PR satu'}}));
            await page.waitForFunction(() => !document.querySelector('#ppbjNoteSubmit').disabled);
            assert.equal(await page.locator('#ppbjNoteBody').inputValue(), '');
            assert.equal(await page.locator('#ppbjNoteCount_1').textContent(), '54');
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.options.method === 'GET').length), beforeReads);
            assert.equal(await page.evaluate(() => net.calls.find(x => x.options.method === 'POST').options.headers['X-CSRF-TOKEN']), 'synthetic-csrf');

            await page.evaluate(() => {editPpbjNote(10); editPpbjNote(10);});
            await page.waitForFunction(() => net.pending.length === 1);
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.options.method === 'PATCH').length), 1);
            await page.evaluate(() => net.pending.shift().resolve(403, {}));
            await page.waitForFunction(() => !document.querySelector('#ppbjNoteSubmit').disabled);
            assert.match(await page.evaluate(() => net.notices.at(-1).text), /izin/);
            await page.evaluate(() => {net.answer = {isConfirmed: false};});
            await page.evaluate(() => deletePpbjNote(10));
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.options.method === 'DELETE').length), 0);
            await page.evaluate(() => {net.answer = {isConfirmed: true}; deletePpbjNote(10); deletePpbjNote(10);});
            await page.waitForFunction(() => net.pending.length === 1);
            assert.equal(await page.evaluate(() => net.calls.filter(x => x.options.method === 'DELETE').length), 1);
            await page.evaluate(() => net.pending.shift().resolve(200, {message: 'Dihapus'}));
            await page.waitForFunction(() => !document.querySelector('#ppbjNoteSubmit').disabled);

            // A delayed PR-1 load must never replace PR-2, even if fetch ignores abort.
            await page.evaluate(() => {net.holdReads = true; openPpbjNotes(1); openPpbjNotes(2);});
            await page.evaluate(() => net.pending.find(x => x.url === '/notes/2').resolve(200, readPayload(2)));
            await page.waitForFunction(() => document.querySelector('#ppbjNotesTitle').textContent === 'PR-2');
            await page.evaluate(() => {net.pending.find(x => x.url === '/notes/1').resolve(200, readPayload(1));});
            await page.waitForTimeout(30);
            assert.equal(await page.locator('#ppbjNotesTitle').textContent(), 'PR-2');
            assert.equal(await page.locator('#ppbjNoteBody').inputValue(), 'Draft PR dua');
            await page.evaluate(() => {net.pending = []; closePpbjNotes(); openPpbjMentionInbox(); closePpbjMentionInbox(); net.pending.shift().resolve(200, {mentions: [{ppbj_id: 99, body: 'LATE'}]});});
            await page.waitForTimeout(30);
            assert.ok(!(await page.locator('#ppbjMentionInboxList').textContent()).includes('LATE'));
            assert.deepEqual(errors, []);
            console.log(`PPBJ_NOTES_BROWSER_OK mobile=${mobile} drafts_isolated=true stale_reads_ignored=true duplicate_writes=false csrf=true true_count=true create_refetch=false`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
