const test = require('node:test');
const assert = require('node:assert/strict');
const { estimateSkew, prepare, regions } = require('../../tools/procurement-ocr/recovery.cjs');
const { validate } = require('../../tools/procurement-ocr/offload.cjs');

test('skew detection identifies tilted text baselines and leaves blank pages alone', () => {
    const width = 600, height = 450, pixels = new Uint8Array(width * height).fill(255), angle = 3 * Math.PI / 180;
    assert.equal(estimateSkew(pixels, width, height), 0);
    for (let y = 70; y < 400; y += 50) for (let x = 40; x < 550; x++) for (let thick = 0; thick < 4; thick++) pixels[(y + Math.round((x - width / 2) * Math.tan(angle)) + thick) * width + x] = 0;
    assert.ok(Math.abs(estimateSkew(pixels, width, height) - 3) <= 0.5);
});
test('recovery regions cover all document rows with overlap and no out of bounds areas', () => {
    for (const height of [1, 10, 99, 1000]) {
        const chunks = regions(500, height); assert.equal(chunks[0].y, 0); assert.equal(chunks[1].y + chunks[1].height, height);
        assert.ok(chunks[0].height >= chunks[1].y); assert.ok(chunks.every(chunk => chunk.height > 0 && chunk.y >= 0 && chunk.y + chunk.height <= height));
    }
});
test('offload rejects shell syntax and invalid hosts before spawning any transport', () => {
    const config = { host: 'archive.example.test', user: 'reader', port: 53431, remote: '/home4/reader/application', key: __filename };
    assert.equal(validate(config), config);
    for (const bad of [{ host: 'host;id' }, { user: 'reader;id' }, { remote: '/home4/reader/app;id' }, { port: 0 }, { key: 'missing-private-key' }]) assert.throws(() => validate({ ...config, ...bad }), /invalid_worker_config/);
});
test('illumination recovery preserves canvas extent and provides opaque OCR input', () => {
    const { createCanvas } = require('../../tools/procurement-ocr/node_modules/@napi-rs/canvas');
    const canvas = createCanvas(500, 300), ctx = canvas.getContext('2d');ctx.fillStyle = '#ddd';ctx.fillRect(0, 0, 500, 300);ctx.fillStyle = '#222';ctx.font = '30px Arial';ctx.fillText('ARSIP NEGARA', 30, 130);
    const output = prepare(canvas, { createCanvas });assert.equal(output.width, 500);assert.equal(output.height, 300);
    const rgba = output.getContext('2d').getImageData(0, 0, 500, 300).data;assert.ok(rgba.some((value, i) => i % 4 !== 3 && value < 100));assert.ok(rgba.every((value, i) => i % 4 !== 3 || value === 255));
    output.width = output.height = canvas.width = canvas.height = 0;
});
