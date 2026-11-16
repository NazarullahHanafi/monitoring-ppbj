const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const source = fs.readFileSync('public/assets/app/contact-messages.js', 'utf8');
const formUX = fs.readFileSync('public/assets/app/form-ux.js', 'utf8');
const css = fs.readFileSync('public/assets/app/form-ux.css', 'utf8');
const view = fs.readFileSync('resources/views/contact_messages/index.blade.php', 'utf8');
const contactCSS = view.match(/<style>([\s\S]*?)<\/style>/)[1];
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const malicious = '<img src=x onerror=window.unsafe=true>';

function fixture(url) {
    const query = new URL(url).searchParams;
    return `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}${contactCSS}body{margin:0;padding:16px}</style>
        <div class="cm-shell"><div id="cmActionFeedback" class="cm-alert" hidden></div>
        <form method="GET" action="/contacts" class="cm-filter" novalidate><input name="search" maxlength="160" aria-label="Pencarian pesan" value="${escape(query.get('search') || '')}"><select name="status"><option value="">Semua</option><option value="read" ${query.get('status') === 'read' ? 'selected' : ''}>Dibaca</option></select><div class="cm-actions"><button type="submit">Filter</button><a href="/contacts">Reset</a></div></form>
        <div class="cm-actions"><form method="POST" action="/messages/1/read" class="cm-read-form"><input type="hidden" name="_token" value="synthetic-csrf"><input type="hidden" name="_method" value="PUT"><input type="hidden" name="read" value="1"><button type="submit">Tandai Dibaca</button></form>
        <form method="POST" action="/messages/2/read" class="cm-read-form"><input type="hidden" name="_token" value="synthetic-csrf"><input type="hidden" name="_method" value="PUT"><input type="hidden" name="read" value="0"><button type="submit">Tandai Belum Dibaca</button></form>
        <form method="POST" action="/messages/1" class="cm-delete-form" data-sender="${escape(malicious)}" data-email="test@example.test" data-subject="${escape(malicious)}"><input type="hidden" name="_token" value="synthetic-csrf"><input type="hidden" name="_method" value="DELETE"><button type="submit">Hapus</button></form></div></div>
        <script>${formUX}</script><script>${source}</script>`;
}

(async () => {
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [], requests = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => {errors.push('Native browser dialog'); dialog.dismiss();});
            await page.route('https://contact.test/**', route => {
                const request = route.request();
                if (request.isNavigationRequest()) requests.push({url: request.url(), method: request.method(), body: request.postData()});
                return route.fulfill({contentType: 'text/html', body: fixture(request.url())});
            });
            await page.goto('https://contact.test/contacts');
            await page.locator('[name="search"]').fill('plastik');
            await page.locator('[name="status"]').selectOption('read');
            assert.equal(requests.length, 1);
            await Promise.all([page.waitForEvent('domcontentloaded'), page.locator('[name="search"]').press('Enter')]);
            assert.equal(new URL(requests.at(-1).url).searchParams.get('search'), 'plastik');
            assert.equal(new URL(requests.at(-1).url).searchParams.get('status'), 'read');
            await Promise.all([page.waitForEvent('domcontentloaded'), page.locator('.cm-filter a').click()]);
            assert.equal(new URL(page.url()).search, '');
            await Promise.all([page.waitForEvent('domcontentloaded'), page.evaluate(() => {
                const form = document.querySelector('.cm-read-form');
                form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
                form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
            })]);
            let posts = requests.filter(item => item.method === 'POST');
            assert.equal(posts.length, 1);
            assert.equal(new URLSearchParams(posts[0].body).get('_token'), 'synthetic-csrf');
            assert.equal(new URLSearchParams(posts[0].body).get('_method'), 'PUT');
            assert.equal(new URLSearchParams(posts[0].body).get('read'), '1');
            if (mobile) await page.tap('.cm-delete-form button'); else await page.click('.cm-delete-form button');
            await page.evaluate(() => document.querySelector('.cm-delete-form').dispatchEvent(new Event('submit', {bubbles: true, cancelable: true})));
            assert.equal(await page.locator('dialog.ux-confirm').count(), 1);
            assert.ok((await page.locator('dialog').textContent()).includes(malicious));
            assert.equal(await page.locator('img').count(), 0);
            await page.locator('dialog button').first().click();
            assert.equal(await page.locator('.cm-delete-form button').isDisabled(), false);
            if (mobile) await page.tap('.cm-delete-form button'); else await page.click('.cm-delete-form button');
            await Promise.all([page.waitForEvent('domcontentloaded'), page.locator('dialog button').last().click()]);
            posts = requests.filter(item => item.method === 'POST'); assert.equal(posts.length, 2);
            assert.equal(new URLSearchParams(posts[1].body).get('_method'), 'DELETE');
            assert.equal(new URLSearchParams(posts[1].body).get('_token'), 'synthetic-csrf');
            await page.evaluate(() => {window.FormUX = undefined;});
            await page.click('.cm-delete-form button');
            assert.match(await page.locator('#cmActionFeedback').textContent(), /Komponen konfirmasi/);
            assert.equal(requests.filter(item => item.method === 'POST').length, 2);
            await Promise.all([page.waitForEvent('domcontentloaded'), page.locator('.cm-read-form').nth(1).locator('button').click()]);
            posts = requests.filter(item => item.method === 'POST');
            assert.equal(new URLSearchParams(posts[2].body).get('read'), '0');
            assert.equal(await page.evaluate(() => Boolean(window.unsafe)), false);
            assert.deepEqual(errors, []);
            console.log(`CONTACT_BROWSER_OK mobile=${mobile} filter_reset=true duplicate_posts=false desired_state_preserved=true csrf=true styled_confirmation=true unsafe_html=false`);
            await page.close();
        }
    } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
