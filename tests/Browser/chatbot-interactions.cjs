const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');

(async () => {
    const php = process.env.PHP_BINARY || (process.platform === 'win32' ? 'C:/laragon/bin/php/php-8.5.12-Win32-vs17-x64/php.exe' : 'php');
    const fragment = execFileSync(php, ['tests/Browser/render-chatbot.php'], {encoding: 'utf8'})
        .replace(/<script\b[^>]*\bsrc=[\s\S]*?<\/script>/g, '');
    const browser = await chromium.launch({executablePath: process.env.BROWSER_EXECUTABLE || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined), headless: true});
    try {
        for (const mobile of [false, true]) {
            const page = await browser.newPage({viewport: mobile ? {width: 390, height: 844} : {width: 1280, height: 900}, isMobile: mobile, hasTouch: mobile});
            const errors = [], writes = [];
            let clearFailure = true, releaseClear;
            page.on('pageerror', error => errors.push(error.message));
            page.on('dialog', dialog => { errors.push('Native dialog'); dialog.dismiss(); });
            await page.route('https://assistant.test/**', async route => {
                const request = route.request(), url = new URL(request.url());
                if (url.pathname === '/chatbot/notifications/count') return route.fulfill({json: {count: 0}});
                if (request.method() === 'DELETE') {
                    writes.push({method: 'DELETE', headers: request.headers()});
                    if (clearFailure) await new Promise(resolve => { releaseClear = resolve; });
                    return route.fulfill({status: clearFailure ? 500 : 200, json: clearFailure ? {success: false, message: 'Synthetic clear failure'} : {success: true, message: 'Deleted'}});
                }
                if (request.method() === 'POST') {
                    const data = request.postDataJSON(); writes.push({method: 'POST', data});
                    return route.fulfill({json: {success: true, message: 'Synthetic answer ' + data.message}});
                }
                return route.fulfill({contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="csrf-token" content="synthetic-csrf">' + fragment});
            });
            await page.goto('https://assistant.test/widget');
            await page.evaluate(() => localStorage.setItem('chatbot_pos', '{corrupt-json'));
            await page.addScriptTag({path: 'public/assets/app/chatbot.js'});
            const toggle = async () => mobile ? page.tap('#chatbot-toggle-btn') : page.locator('#chatbot-toggle-btn').click();
            await toggle();
            await page.waitForTimeout(180);
            assert.equal(await page.locator('#chatbot-window-panel').evaluate(node => node.style.display), 'flex');
            await toggle();
            assert.equal(await page.locator('#chatbot-window-panel').evaluate(node => node.style.display), 'none');
            await toggle();
            assert.equal(await page.locator('#chatbot-window-panel').evaluate(node => node.style.display), 'flex');
            await page.evaluate(async () => {
                for (let index = 0; index < 14; index++) {
                    document.querySelector('#chatbot-input').value = 'Question ' + index;
                    await sendMessage(new Event('submit'));
                }
            });
            const sent = writes.filter(row => row.method === 'POST');
            assert.equal(sent.length, 14);
            for (const row of sent) {
                assert.ok(row.data.conversation.length <= 20);
                assert.equal(row.data.conversation.some(turn => turn.content === row.data.message), false);
            }
            const userCountBefore = await page.locator('#chatbot-msg-container').evaluate(node => node.children.length);
            await page.evaluate(() => { sendStarterMessage('Bagaimana cara tracking PR?'); sendStarterMessage('Bagaimana cara tracking PR?'); });
            await page.waitForTimeout(950);
            assert.equal(writes.filter(row => row.method === 'POST').length, 14);
            assert.equal(await page.locator('#chatbot-msg-container').evaluate(node => node.children.length), userCountBefore + 2);

            await page.evaluate(() => { window.pendingClear = confirmClearConversation(); });
            const deadline = Date.now() + 5000;
            while (!releaseClear && Date.now() < deadline) await page.waitForTimeout(10);
            assert.ok(releaseClear, 'Clear request must start');
            assert.equal(await page.locator('#send-btn').isDisabled(), true);
            assert.ok((await page.locator('#chatbot-msg-container').textContent()).includes('Question 0'));
            assert.equal(writes.at(-1).headers['x-csrf-token'], 'synthetic-csrf');
            releaseClear(); await page.evaluate(() => window.pendingClear);
            assert.ok((await page.locator('#chatbot-msg-container').textContent()).includes('Question 0'));
            assert.ok((await page.locator('[role=alert]').last().textContent()).includes('Synthetic clear failure'));
            clearFailure = false;
            await page.evaluate(() => confirmClearConversation());
            assert.equal((await page.locator('#chatbot-msg-container').textContent()).includes('Question 0'), false);

            await page.evaluate(() => {
                const nativeTimeout = window.setTimeout.bind(window);
                window.setTimeout = (fn, delay, ...args) => nativeTimeout(fn, delay === 55000 ? 50 : delay, ...args);
                window.fetch = () => new Promise(() => {});
                document.querySelector('#chatbot-input').value = 'Keep the draft';
                window.pendingSend = sendMessage(new Event('submit'));
            });
            await page.evaluate(() => window.pendingSend);
            assert.equal(await page.locator('#chatbot-input').inputValue(), 'Keep the draft');
            assert.equal(await page.locator('#send-btn').isDisabled(), false);
            assert.ok((await page.locator('[role=alert]').last().textContent()).includes('Periksa hasil'));
            assert.deepEqual(errors, []);
            console.log(`CHATBOT_INTERACTIONS_OK mobile=${mobile} bounded_history=true csrf_clear=true failure_preserves_history=true deadline_releases_controls=true corrupt_storage_safe=true`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
