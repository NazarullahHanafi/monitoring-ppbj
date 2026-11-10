const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');

const base = path.resolve(__dirname, '../..');
const runtime = path.join(base, 'tools/procurement-ocr');
const languages = path.join(base, 'public/assets/document-reader/v1/lang');
const available = fs.existsSync(path.join(runtime, 'node_modules/@napi-rs/canvas')) && fs.existsSync(path.join(languages, 'eng.traineddata.gz'));

// A real image-only PDF assembled from a synthetic JPEG, with no embedded text.
function scanPdf(jpeg, width, height) {
    const draw = Buffer.from('q 540 0 0 255 36 360 cm /Im Do Q\n');
    const objects = [
        Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'),
        Buffer.from('<< /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >>'),
        ...[1, 2, 3].map(() => Buffer.from('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im 7 0 R >> >> /Contents 6 0 R >>')),
        Buffer.concat([Buffer.from(`<< /Length ${draw.length} >>\nstream\n`), draw, Buffer.from('endstream')]),
        Buffer.concat([Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`), jpeg, Buffer.from('\nendstream')]),
    ];
    const parts = [Buffer.from('%PDF-1.4\n')], offsets = [0]; let length = parts[0].length;
    objects.forEach((obj, i) => { offsets.push(length); const item = Buffer.concat([Buffer.from(`${i+1} 0 obj\n`), obj, Buffer.from('\nendobj\n')]); parts.push(item); length += item.length; });
    parts.push(Buffer.from(`xref\n0 8\n0000000000 65535 f \n${offsets.slice(1).map(x => String(x).padStart(10, '0')+' 00000 n ').join('\n')}\ntrailer\n<< /Size 8 /Root 1 0 R >>\nstartxref\n${length}\n%%EOF`));
    return Buffer.concat(parts);
}

test('private OCR recognizes a photo and resumes every page of a real scanned PDF offline', { skip: !available, timeout: 65000 }, () => {
    const { createCanvas } = require(path.join(runtime, 'node_modules/@napi-rs/canvas'));
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'simonpr-ocr-test-'));
    try {
        const canvas = createCanvas(1800, 850), ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1800, 850); ctx.fillStyle = '#111'; ctx.font = '64px Arial';
        ctx.fillText('KURSI ERGONOMIS KANTOR', 70, 170); ctx.fillText('PENGADAAN PRINTER LASER', 70, 320); ctx.fillText('PR-2026-TEST-001', 70, 470);
        fs.writeFileSync(path.join(root, 'photo.png'), canvas.toBuffer('image/png'));
        fs.writeFileSync(path.join(root, 'scan.pdf'), scanPdf(canvas.toBuffer('image/jpeg'), canvas.width, canvas.height));
        for (const [file, extension, start] of [['photo.png', 'png', 1], ['scan.pdf', 'pdf', 1], ['scan.pdf', 'pdf', 2], ['scan.pdf', 'pdf', 3]]) {
            const output = cp.execFileSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: path.join(root, file), root, extension, start, count: 1, languages }), encoding: 'utf8', timeout: 20000, stdio: ['pipe', 'pipe', 'pipe'] });
            const result = JSON.parse(output);
            assert.match(result.text, /KURSI/i); assert.match(result.text, /PRINTER/i);
            assert.equal(result.page, start);
            if (extension === 'pdf') { assert.equal(result.pages, 3); assert.equal(result.done, start === 3); }
        }
        const bad = cp.spawnSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: __filename, root, extension: 'txt', languages }), encoding: 'utf8' });
        assert.notEqual(bad.status, 0); assert.equal(bad.stdout, '');
    } finally {
        // Only known synthetic fixtures in this newly created test directory are removed.
        for (const file of ['photo.png', 'scan.pdf']) if (fs.existsSync(path.join(root, file))) fs.unlinkSync(path.join(root, file));
        fs.rmdirSync(root);
    }
});
