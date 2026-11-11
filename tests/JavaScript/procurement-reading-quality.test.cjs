const test = require('node:test');
const assert = require('node:assert/strict');
const { mergeText, score, largeRaster, enhance } = require('../../tools/procurement-ocr/quality.cjs');

test('hybrid text keeps native-only references and scan-only items without duplicate lines', () => {
    assert.equal(mergeText('PR-26-0001\nKursi kantor', 'kursi kantor\nSensor tekanan'), 'PR-26-0001\nKursi kantor\nSensor tekanan');
    assert.equal(score({ text: '  Sensor  ', confidence: 82.3 }).confidence, 82);
    assert.equal(score({ confidence: NaN }).confidence, 0);
});

test('image placement, nested transforms and restore distinguish page scans from small logos', () => {
    const ops = { save: 1, restore: 2, transform: 3, paintImageXObject: 4, paintInlineImageXObject: 5 };
    assert.equal(largeRaster({ fnArray: [1, 3, 4, 2], argsArray: [[], [30, 0, 0, 30], ['logo'], []] }, ops, 500000), false);
    assert.equal(largeRaster({ fnArray: [3, 1, 3, 4, 2, 3, 4], argsArray: [[2, 0, 0, 2], [], [10, 0, 0, 10], ['logo'], [], [300, 0, 0, 400], ['scan']] }, ops, 500000), true);
});

test('adaptive enhancement stretches faint grayscale text and skips blank pages', () => {
    const pixels = new Uint8ClampedArray([150,150,150,255,210,210,210,255]);
    let written;
    const canvas = { width: 2, height: 1, getContext: () => ({ getImageData: () => ({ data: pixels }), putImageData: image => { written = image; } }) };
    assert.equal(enhance(canvas), true);
    assert.deepEqual([...written.data], [0,0,0,255,255,255,255,255]);
    pixels.fill(255);
    assert.equal(enhance(canvas), false);
});
