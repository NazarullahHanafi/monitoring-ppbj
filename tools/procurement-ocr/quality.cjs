'use strict';

// Readability scores are engine estimates, never a guarantee of correct amounts/PRs.
function score(data) {
    return { text: String(data.text || '').trim(), confidence: Number.isFinite(data.confidence) ? Math.max(0, Math.min(100, Math.round(data.confidence))) : 0 };
}

function mergeText(native, scan) {
    const seen = new Set();
    return [native, scan].flatMap(text => String(text || '').split('\n')).filter(line => {
        const key = line.trim().toLowerCase().replace(/\s+/g, ' ');
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    }).join('\n').trim();
}

function largeRaster(operators, ops, pageArea) {
    // Image pixels alone cannot distinguish a logo from a full-page scan.
    // Track the PDF drawing matrix to inspect its actual area on the page.
    let matrix = [1, 0, 0, 1], stack = [];
    for (let i = 0; i < operators.fnArray.length; i++) {
        const op = operators.fnArray[i], args = operators.argsArray[i];
        if (op === ops.save) stack.push(matrix.slice());
        else if (op === ops.restore) matrix = stack.pop() || [1, 0, 0, 1];
        else if (op === ops.transform && args?.length >= 4) {
            const [a, b, c, d] = matrix, [e, f, g, h] = args;
            matrix = [a*e+c*f, b*e+d*f, a*g+c*h, b*g+d*h];
        } else if ([ops.paintImageXObject, ops.paintInlineImageXObject].includes(op)
            && Math.abs(matrix[0]*matrix[3]-matrix[1]*matrix[2]) >= pageArea * 0.2) return true;
    }
    return false;
}

function enhance(canvas) {
    const ctx = canvas.getContext('2d'), image = ctx.getImageData(0, 0, canvas.width, canvas.height), data = image.data;
    const histogram = new Uint32Array(256);
    for (let i = 0; i < data.length; i += 4) histogram[(data[i]*77+data[i+1]*150+data[i+2]*29) >> 8]++;
    const pixels = data.length/4;
    let low = 0, high = 255, total = 0;
    while (low < 254 && total+histogram[low] < pixels*0.01) total += histogram[low++];
    total = 0;
    while (high > low && total+histogram[high] < pixels*0.01) total += histogram[high--];
    if (high-low < 12) return false;
    for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i]*77+data[i+1]*150+data[i+2]*29) >> 8;
        data[i] = data[i+1] = data[i+2] = Math.max(0, Math.min(255, Math.round((gray-low)*255/(high-low))));
        data[i+3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    return true;
}

module.exports = { score, mergeText, largeRaster, enhance };
