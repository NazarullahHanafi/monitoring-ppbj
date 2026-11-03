// Local-only synthetic latency fixture. No business records, credentials or files.
const http = require('node:http');
let active = 0, peak = 0, requests = 0;
const server = http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/__stop') {
        response.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' });
        response.end(JSON.stringify({ requests, peak }));
        server.close(() => { clearTimeout(watchdog); process.exit(0); });
        return;
    }
    active++; requests++; peak = Math.max(peak, active);
    setTimeout(() => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end('{"documents":[],"document_count":0,"has_archive":false}');
        active--;
    }, 200);
});
server.listen(0, '127.0.0.1', () => process.stdout.write(JSON.stringify({ port: server.address().port }) + '\n'));
const watchdog = setTimeout(() => server.close(() => process.exit(1)), 60000);
