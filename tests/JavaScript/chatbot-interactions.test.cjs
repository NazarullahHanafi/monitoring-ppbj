const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/app/chatbot.js', 'utf8');
const prefix = source.slice(0, source.indexOf('    const prKeywords'));
const sending = source.slice(source.indexOf('    async function sendMessage('), source.indexOf('    function appendMessage('));
const shortcuts = source.slice(source.indexOf('    function sendStarterMessage('), source.indexOf('    function checkIfAboutNazar('));
const clearing = source.slice(source.indexOf('    function showClearConfirmation('), source.indexOf('    function resetChatbotConversation('));
const tick = () => new Promise(setImmediate);

function fixture(authenticated = true) {
    const nodes = new Map(), events = {}, timers = new Map(), requests = [], messages = [];
    let next = 0, resets = 0;
    const node = id => {
        if (!nodes.has(id)) nodes.set(id, {value: '', disabled: false, style: {}, setAttribute() {}, focus() {}});
        return nodes.get(id);
    };
    const scope = vm.createContext({
        window: {CHATBOT_CONFIG: {authenticated}, addEventListener(name, fn) { events[name] = fn; }},
        document: {getElementById: node, querySelector: () => ({content: 'csrf-synthetic'}), querySelectorAll: () => [node('clear-button')]},
        AbortController, Event, Error, TypeError, SyntaxError, Number, Array, String, Object, JSON, Promise,
        setTimeout(fn, delay) { const id = ++next; timers.set(id, {fn, delay}); return id; },
        clearTimeout(id) { timers.delete(id); },
        fetch(url, options) { return new Promise(resolve => requests.push({url, options, resolve})); },
        appendMessage(text, sender, error) { messages.push({text, sender, error}); },
        showTyping() {}, removeTyping() {}, checkIfAboutNazar: () => false,
        starterResponses: {local: {skipAPI: true, response: 'Local answer'}},
        resetChatbotConversation() { resets++; vm.runInContext('conversationHistory = []', scope); },
    });
    vm.runInContext(prefix + sending + shortcuts + clearing, scope);
    const respond = (index, data, {status = 200, type = 'application/json', json} = {}) => requests[index].resolve({
        ok: status >= 200 && status < 300, status, redirected: false,
        headers: {get: () => type}, json: json || (async () => data)
    });
    return {scope, events, requests, timers, messages, node, respond, resets: () => resets,
        history: () => JSON.parse(vm.runInContext('JSON.stringify(conversationHistory)', scope)),
        setHistory(rows) { vm.runInContext('conversationHistory = ' + JSON.stringify(rows), scope); },
        send(text) { node('chatbot-input').value = text; return scope.sendMessage({preventDefault() {}}); },
        timeout(delay) { const [id, timer] = [...timers.entries()].find(([, item]) => item.delay === delay); timers.delete(id); timer.fn(); },
    };
}

test('long conversations send bounded recent context and never duplicate the current user message', async () => {
    const f = fixture();
    f.setHistory(Array.from({length: 100}, (_, i) => ({role: i % 2 ? 'assistant' : 'user', content: 'turn-' + i + ' ' + 'x'.repeat(600)})));
    const pending = f.send('New question');
    const body = JSON.parse(f.requests[0].options.body);
    assert.equal(body.message, 'New question');
    assert.ok(body.conversation.length <= 20);
    assert.ok(body.conversation.reduce((sum, row) => sum + Array.from(row.content).length, 0) <= 12000);
    assert.equal(body.conversation.some(row => row.content === 'New question'), false);
    f.respond(0, {success: true, message: '😀'.repeat(2400)}); await pending;
    assert.equal(f.history().length, 20);
    assert.equal(Array.from(f.history().at(-1).content).length, 2000);
    const second = f.send('Another question');
    const next = JSON.parse(f.requests[1].options.body);
    assert.equal(next.conversation.filter(row => row.content === 'New question').length, 1);
    f.respond(1, {success: true, message: 'Done'}); await second;
});

test('duplicate submit and shortcuts share one in-flight operation without changing its message', async () => {
    const f = fixture();
    const pending = f.send('Original');
    f.scope.sendQuickReply('Other'); f.scope.sendStarterMessage('local');
    await f.scope.sendMessage({preventDefault() {}});
    assert.equal(f.requests.length, 1);
    assert.equal(f.messages.filter(row => row.sender === 'user').length, 1);
    assert.equal(f.node('chatbot-input').disabled, true);
    f.respond(0, {success: true, message: 'Answer'}); await pending;
    assert.equal(f.node('chatbot-input').disabled, false);
    assert.equal(f.timers.size, 0);
});

test('deadline also covers a hung JSON body and releases controls without retrying the request', async () => {
    const f = fixture();
    const pending = f.send('Keep draft');
    f.respond(0, {}, {json: () => new Promise(() => {})}); await tick();
    f.timeout(55000); await pending;
    assert.equal(f.node('chatbot-input').value, 'Keep draft');
    assert.equal(f.node('send-btn').disabled, false);
    assert.equal(f.requests.length, 1);
    assert.deepEqual(f.history(), []);
    assert.match(f.messages.at(-1).text, /Periksa hasil/);
});

test('HTML redirects, validation failures and malformed responses preserve drafts and history', async () => {
    for (const response of [{data: {}, type: 'text/html'}, {data: {success: false, errors: {message: ['Periksa pesan']}}, status: 422},
        {data: {success: true}}, {data: {}, json: async () => { throw new SyntaxError('bad JSON'); }}]) {
        const f = fixture(); f.setHistory([{role: 'user', content: 'Earlier'}]);
        const pending = f.send('Unsaved'); f.respond(0, response.data, response); await pending;
        assert.equal(f.node('chatbot-input').value, 'Unsaved');
        assert.deepEqual(f.history(), [{role: 'user', content: 'Earlier'}]);
        assert.equal(f.node('send-btn').disabled, false);
        assert.equal(f.requests.length, 1);
    }
});

test('clear sends CSRF and waits for confirmed success before resetting local history', async () => {
    const f = fixture(); f.setHistory([{role: 'user', content: 'Keep this'}]);
    const pending = f.scope.confirmClearConversation();
    assert.equal(f.resets(), 0);
    assert.equal(f.requests[0].options.headers['X-CSRF-TOKEN'], 'csrf-synthetic');
    assert.equal(f.requests[0].options.method, 'DELETE');
    assert.equal(f.requests[0].options.credentials, 'same-origin');
    f.respond(0, {success: false, message: 'Tidak dapat menghapus'}, {status: 500}); await pending;
    assert.equal(f.resets(), 0); assert.equal(f.history().length, 1);
    const retry = f.scope.confirmClearConversation();
    f.respond(1, {success: true, message: 'Deleted'}); await retry;
    assert.equal(f.resets(), 1); assert.deepEqual(f.history(), []);
});

test('page restore ignores late results from the previous request and preserves the pending draft', async () => {
    const f = fixture();
    const old = f.send('Previous'); f.events.pagehide();
    assert.equal(f.node('chatbot-input').value, 'Previous');
    f.events.pageshow();
    const newer = f.send('Current'); await old;
    assert.equal(f.node('send-btn').disabled, true);
    f.respond(0, {success: true, message: 'Stale answer'}); await tick();
    assert.equal(f.messages.some(row => row.text === 'Stale answer'), false);
    f.respond(1, {success: true, message: 'Fresh answer'}); await newer;
    assert.equal(f.messages.at(-1).text, 'Fresh answer');
    assert.equal(f.node('send-btn').disabled, false);
});

test('local starters block overlap and cancellation without contacting an API', async () => {
    const f = fixture();
    const pending = f.scope.sendStarterMessage('local');
    f.scope.sendStarterMessage('local');
    await f.scope.confirmClearConversation();
    assert.equal(f.resets(), 0);
    f.timeout(800); await pending;
    assert.equal(f.requests.length, 0);
    assert.equal(f.messages.filter(row => row.sender === 'user').length, 1);
    assert.equal(f.messages.at(-1).text, 'Local answer');
});

test('guest context and input are bounded; clearing guest UI does not call an authenticated endpoint', async () => {
    const f = fixture(false);
    await f.send('x'.repeat(501)); assert.equal(f.requests.length, 0);
    f.setHistory(Array.from({length: 20}, (_, i) => ({role: 'user', content: 'Guest ' + i})));
    const pending = f.send('Allowed');
    assert.equal(JSON.parse(f.requests[0].options.body).conversation.length, 6);
    f.respond(0, {success: true, message: 'Answer'}); await pending;
    await f.scope.confirmClearConversation();
    assert.equal(f.requests.length, 1); assert.equal(f.resets(), 1);
});
