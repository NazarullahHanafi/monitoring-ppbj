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
function scanPdf(jpeg, width, height, mixed = false, damaged = false) {
    const native = mixed ? 'BT /F1 10 Tf 3 Tr 36 750 Td (NATIVE-REFERENCE-777 '+ 'Digital document header retained for verification. '.repeat(8) + ') Tj ET\n' : '';
    const draw = Buffer.from(native + 'q 540 0 0 255 36 360 cm /Im Do Q\n');
    const objects = [
        Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'),
        Buffer.from('<< /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >>'),
        ...[1, 2, 3].map(() => Buffer.from('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im 7 0 R >> /Font << /F1 8 0 R >> >> /Contents 6 0 R >>')),
        Buffer.concat([Buffer.from(`<< /Length ${draw.length} >>\nstream\n`), draw, Buffer.from('endstream')]),
        Buffer.concat([Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`), jpeg, Buffer.from('\nendstream')]),
        Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'),
    ];
    if (damaged) {
        objects[3] = Buffer.from('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im 9 0 R >> >> /Contents 6 0 R >>');
        objects.push(Buffer.from('<< /Type /XObject /Subtype /Image /Width 10 /Height 10 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length 8 >>\nstream\nNOTAJPEG\nendstream'));
    }
    const size = objects.length + 1;
    const parts = [Buffer.from('%PDF-1.4\n')], offsets = [0]; let length = parts[0].length;
    objects.forEach((obj, i) => { offsets.push(length); const item = Buffer.concat([Buffer.from(`${i+1} 0 obj\n`), obj, Buffer.from('\nendobj\n')]); parts.push(item); length += item.length; });
    parts.push(Buffer.from(`xref\n0 ${size}\n0000000000 65535 f \n${offsets.slice(1).map(x => String(x).padStart(10, '0')+' 00000 n ').join('\n')}\ntrailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${length}\n%%EOF`));
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
        fs.writeFileSync(path.join(root, 'mixed.pdf'), scanPdf(canvas.toBuffer('image/jpeg'), canvas.width, canvas.height, true));
        const layout = createCanvas(1800, 1400), lc = layout.getContext('2d');
        lc.fillStyle = '#fff'; lc.fillRect(0, 0, layout.width, layout.height); lc.fillStyle = '#111'; lc.font = '40px Arial';
        lc.fillText('VENDOR NUSANTARA', 80, 110); lc.fillText('PR-2026-TEST-009', 1120, 110);
        lc.fillText('SPEKTROMETER OPTIK', 90, 420); lc.fillText('SENSOR TEKANAN', 1090, 420);
        lc.fillText('PEMBUAT TOR AYU', 90, 1180); lc.fillText('BUYER NAZAR', 1120, 1180);
        fs.writeFileSync(path.join(root, 'layout.png'), layout.toBuffer('image/png'));
        const scattered = JSON.parse(cp.execFileSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: path.join(root, 'layout.png'), root, extension: 'png', languages }), encoding: 'utf8', timeout: 20000, stdio: ['pipe', 'pipe', 'pipe'] }));
        for (const keyword of ['VENDOR', 'SPEKTROMETER', 'SENSOR', 'PEMBUAT', 'BUYER']) assert.match(scattered.text, new RegExp(keyword, 'i'));
        assert.ok(scattered.metrics.peak_rss_mb <= 448);
        const deep = JSON.parse(cp.execFileSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: path.join(root, 'layout.png'), root, extension: 'png', languages, max_pixels: 8000000, profile: 'deep' }), encoding: 'utf8', timeout: 40000, stdio: ['pipe', 'pipe', 'pipe'] }));
        for (const keyword of ['SPEKTROMETER', 'SENSOR', 'PEMBUAT']) assert.match(deep.text, new RegExp(keyword, 'i'));
        assert.ok(deep.metrics.peak_rss_mb <= 1024);
        for (const [file, extension, start] of [['photo.png', 'png', 1], ['scan.pdf', 'pdf', 1], ['scan.pdf', 'pdf', 2], ['scan.pdf', 'pdf', 3], ['mixed.pdf', 'pdf', 1]]) {
            const output = cp.execFileSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: path.join(root, file), root, extension, start, count: 1, languages }), encoding: 'utf8', timeout: 20000, stdio: ['pipe', 'pipe', 'pipe'] });
            const result = JSON.parse(output);
            assert.match(result.text, /KURSI/i); assert.match(result.text, /PRINTER/i);
            assert.ok(result.confidence >= 55 && result.confidence <= 100);
            if (file === 'mixed.pdf') { assert.match(result.text, /NATIVE-REFERENCE-777/); assert.equal(result.engine, 'pdfjs-6-tesseract-7'); }
            assert.equal(result.page, start);
            assert.equal(result.passages.length, 1);
            assert.equal(result.passages[0].page, start);
            assert.match(result.passages[0].text, /KURSI/i);
            if (extension === 'pdf') { assert.equal(result.pages, 3); assert.equal(result.done, start === 3); }
        }
        fs.writeFileSync(path.join(root, 'damaged.pdf'), scanPdf(canvas.toBuffer('image/jpeg'), canvas.width, canvas.height, false, true));
        const damaged = cp.spawnSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: path.join(root, 'damaged.pdf'), root, extension: 'pdf', start: 1, count: 3, languages, progress: true }), encoding: 'utf8', timeout: 30000 });
        assert.equal(damaged.status, 0, damaged.stderr);
        const recovered = JSON.parse(damaged.stdout);
        assert.equal(recovered.passages.length, 3); assert.equal(recovered.done, true);
        assert.match(recovered.passages[2].text, /KURSI/i);
        assert.ok(recovered.unreadable > 0);
        assert.match(damaged.stderr, /OCR_PAGES=3/);
        const bad = cp.spawnSync(process.execPath, [path.join(runtime, 'read.cjs')], { input: JSON.stringify({ file: __filename, root, extension: 'txt', languages }), encoding: 'utf8' });
        assert.notEqual(bad.status, 0); assert.equal(bad.stdout, '');
    } finally {
        // Only known synthetic fixtures in this newly created test directory are removed.
        for (const file of ['photo.png', 'scan.pdf', 'mixed.pdf', 'damaged.pdf', 'layout.png']) if (fs.existsSync(path.join(root, file))) fs.unlinkSync(path.join(root, file));
        fs.rmdirSync(root);
    }
});
