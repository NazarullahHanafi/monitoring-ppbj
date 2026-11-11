'use strict';

// All transformations operate on disposable OCR canvases, never original files.
function estimateSkew(gray, width, height) {
    const points = [];
    for (let y = 4; y < height - 4; y += 2) for (let x = 4; x < width - 4; x += 2) {
        if (gray[y * width + x] < 115) points.push([x - width / 2, y - height / 2]);
    }
    if (points.length < 80 || points.length > width * height / 6) return 0;
    const projection = angle => {
        const r = angle * Math.PI / 180, bins = new Uint32Array(height * 2);
        for (const [x, y] of points) { const row = Math.round(y * Math.cos(r) - x * Math.sin(r)) + height; if (row >= 0 && row < bins.length) bins[row]++; }
        return bins.reduce((sum, n) => sum + n * n, 0);
    };
    const baseline = projection(0); let best = baseline, angle = 0;
    for (let value = -5; value <= 5; value += 0.5) { const score = projection(value); if (score > best) { best = score; angle = value; } }
    return best > baseline * 1.12 ? angle : 0;
}

function prepare(canvas, library) {
    const scale = Math.min(1, 700 / Math.max(canvas.width, canvas.height));
    const preview = library.createCanvas(Math.max(1, Math.round(canvas.width * scale)), Math.max(1, Math.round(canvas.height * scale)));
    preview.getContext('2d').drawImage(canvas, 0, 0, preview.width, preview.height);
    const rgba = preview.getContext('2d').getImageData(0, 0, preview.width, preview.height).data;
    const gray = new Uint8Array(preview.width * preview.height);
    for (let i = 0; i < gray.length; i++) gray[i] = (rgba[i * 4] * 77 + rgba[i * 4 + 1] * 150 + rgba[i * 4 + 2] * 29) >> 8;
    const angle = estimateSkew(gray, preview.width, preview.height); preview.width = preview.height = 0;
    const result = library.createCanvas(canvas.width, canvas.height), ctx = result.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, result.width, result.height);
    ctx.translate(result.width / 2, result.height / 2); ctx.rotate(-angle * Math.PI / 180);
    // Keep rotated corners inside the canvas; no document edge is cropped.
    const radians = Math.abs(angle * Math.PI / 180);
    const fit = Math.min(1, canvas.width / (canvas.width * Math.cos(radians) + canvas.height * Math.sin(radians)), canvas.height / (canvas.height * Math.cos(radians) + canvas.width * Math.sin(radians)));
    ctx.scale(fit, fit); ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2); ctx.resetTransform();
    const image = ctx.getImageData(0, 0, result.width, result.height), pixels = image.data;
    // Normalize uneven illumination per tile without inventing letters or digits.
    for (let top = 0; top < result.height; top += 64) for (let left = 0; left < result.width; left += 64) {
        let light = 0, count = 0;
        for (let y = top; y < Math.min(top + 64, result.height); y += 4) for (let x = left; x < Math.min(left + 64, result.width); x += 4) {
            const i = (y * result.width + x) * 4; light += Math.max(pixels[i], pixels[i + 1], pixels[i + 2]); count++;
        }
        const background = Math.max(160, light / count);
        for (let y = top; y < Math.min(top + 64, result.height); y++) for (let x = left; x < Math.min(left + 64, result.width); x++) {
            const i = (y * result.width + x) * 4, value = (pixels[i] * 77 + pixels[i + 1] * 150 + pixels[i + 2] * 29) >> 8;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.min(255, Math.round(value * 255 / background)); pixels[i + 3] = 255;
        }
    }
    ctx.putImageData(image, 0, 0); return result;
}

function regions(width, height) {
    const half = Math.ceil(height / 2), overlap = Math.min(60, Math.floor(height / 10));
    const bottom = Math.min(height - 1, Math.max(0, half - overlap));
    return [{ x: 0, y: 0, width, height: Math.min(height, half + overlap) }, { x: 0, y: bottom, width, height: height - bottom }];
}
module.exports = { estimateSkew, prepare, regions };
