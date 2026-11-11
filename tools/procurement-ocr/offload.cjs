'use strict';
// Run on a trusted workstation. Only aggregate progress reaches stdout/logs.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const readline = require('node:readline');

function validate(config) {
    if (!/^[a-zA-Z0-9.-]+$/.test(config.host) || !/^[a-zA-Z0-9_-]+$/.test(config.user) || !Number.isInteger(config.port) || config.port < 1 || config.port > 65535
        || !/^\/home\d*\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(config.remote) || !fs.existsSync(config.key)) throw Error('invalid_worker_config');
    return config;
}
function capture(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'], ...options });let output = '';
        const timer = setTimeout(() => child.kill(), options.timeout || 30000);
        child.stdout.on('data', data => { output += data; if (output.length > 6 * 1024 * 1024) child.kill(); });
        child.stderr.on('data', () => {});child.on('error', error => { clearTimeout(timer); reject(Error('worker_process')); });
        child.on('close', code => { clearTimeout(timer); code === 0 ? resolve(output) : reject(Error('worker_process')); });
        child.stdin.end(options.input || '');
    });
}
async function pass(config, root) {
    const ssh = config.ssh || 'ssh', scp = config.scp || 'scp';
    const args = ['-i', config.key, '-p', String(config.port), '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'ConnectTimeout=15', `${config.user}@${config.host}`, `cd ${config.remote} && php artisan procurement:search-offload --no-ansi`];
    return new Promise((resolve, reject) => {
        const child = spawn(ssh, args, { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });let processing = Promise.resolve(), done, failed = false;
        child.stdin.on('error', () => { failed = true; });
        const timer = setTimeout(() => child.kill(), 250000);
        child.stderr.on('data', () => {});child.on('error', () => { clearTimeout(timer); reject(Error('ssh_worker')); });
        const lines = readline.createInterface({ input: child.stdout });
        lines.on('line', line => {
            processing = processing.then(async () => {
                if (line.length > 65536) throw Error('invalid_worker_packet');
                const job = JSON.parse(line);
                if (job.type !== 'ocr') { done = job; return; }
                if (!/^[a-f0-9]{32}$/.test(job.id) || !/^[a-f0-9]{64}$/.test(job.checksum) || job.bytes > 30 * 1024 * 1024 || job.bytes <= 0
                    || path.posix.dirname(job.path) !== config.remote + '/storage/app/private/procurement-search/work' || !/\/(?:[a-f0-9]{32}\.bin|asset-[a-f0-9]{32}\.image)$/.test(job.path)
                    || !['pdf', 'jpg', 'jpeg', 'png', 'bmp', 'webp', 'gif'].includes(job.extension) || !Number.isSafeInteger(job.start) || job.start < 1 || job.start > 2000) throw Error('invalid_worker_job');
                const local = path.join(root, job.checksum + '.bin');
                try {
                    if (!fs.existsSync(local) || crypto.createHash('sha256').update(fs.readFileSync(local)).digest('hex') !== job.checksum) {
                        await capture(scp, ['-i', config.key, '-P', String(config.port), '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', `${config.user}@${config.host}:${job.path}`, local], { timeout: 25000 });
                    }
                    if (fs.statSync(local).size !== job.bytes || crypto.createHash('sha256').update(fs.readFileSync(local)).digest('hex') !== job.checksum) throw Error('checksum');
                    const output = await capture(process.execPath, ['--max-old-space-size=640', path.join(__dirname, 'read.cjs')], { timeout: 140000,
                        env: { ...process.env, OMP_THREAD_LIMIT: '1', RAYON_NUM_THREADS: '1' },
                        input: JSON.stringify({ file: local, root, extension: job.extension, start: job.start, count: 1, max_pixels: 8000000, profile: 'deep', languages: config.languages }) });
                    const result = JSON.parse(output);
                    child.stdin.write(JSON.stringify({ id: job.id, checksum: job.checksum, result }) + '\n');
                } catch (_) { child.stdin.write(JSON.stringify({ id: job.id, checksum: job.checksum, error: 'local_read_failed' }) + '\n'); }
                // Keep at most 90 MiB of private cache, known checksum filenames only.
                const files = fs.readdirSync(root).filter(file => /^[a-f0-9]{64}\.bin$/.test(file)).map(file => ({ file, stat: fs.statSync(path.join(root, file)) })).sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs);
                let bytes = 0; for (const item of files) { bytes += item.stat.size; if (bytes > 90 * 1024 * 1024) fs.unlinkSync(path.join(root, item.file)); }
            }).catch(() => { failed = true; child.kill(); });
        });
        child.on('close', async code => { clearTimeout(timer); await processing; code === 0 && !failed && done ? resolve(done) : reject(Error('offload_pass')); });
    });
}
async function main() {
    const config = validate(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
    const root = path.resolve(__dirname, '../../storage/app/private/procurement-search/offload');fs.mkdirSync(root, { recursive: true, mode: 0o700 });
    const lock = path.join(root, 'worker.lock');
    if (fs.existsSync(lock)) {
        const pid = Number(fs.readFileSync(lock, 'utf8'));
        if (Number.isSafeInteger(pid) && pid > 0) {
            try { process.kill(pid, 0); } catch (error) { if (error.code === 'ESRCH') fs.unlinkSync(lock); }
        }
    }
    try { fs.writeFileSync(lock, String(process.pid), { flag: 'wx', mode: 0o600 }); } catch (_) { throw Error('worker_already_running'); }
    const minutes = Math.max(1, Math.min(1440, Number(process.argv[3]) || 60)), deadline = Date.now() + minutes * 60000;
    let errors = 0;
    try {
        while (Date.now() < deadline) {
            try {
                const result = await pass(config, root);errors = 0;
                process.stdout.write(JSON.stringify({ at: new Date().toISOString(), ...result }) + '\n');
                if (result.type === 'done' && !result.worked) await new Promise(resolve => setTimeout(resolve, 60000));
                else if (result.type === 'busy') await new Promise(resolve => setTimeout(resolve, 15000));
                else await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (_) { errors++;process.stdout.write(JSON.stringify({ at: new Date().toISOString(), type: 'transport_retry', attempt: errors }) + '\n');if (errors >= 3) break;await new Promise(resolve => setTimeout(resolve, 15000)); }
        }
    } finally { if (fs.readFileSync(lock, 'utf8') === String(process.pid)) fs.unlinkSync(lock); }
}
if (require.main === module) main().catch(() => { process.stderr.write('PRIVATE_OFFLOAD_WORKER_STOPPED\n');process.exitCode = 1; });
module.exports = { validate, pass };
