'use strict';
// Private CLI worker. JSON in/out, no HTTP listener, telemetry, or remote OCR API.
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');

async function read(input) {
    const filename = fs.realpathSync(input.file);
    const root = fs.realpathSync(input.root);
    if (!filename.startsWith(root + path.sep) || fs.statSync(filename).size > 30 * 1024 * 1024) throw Error('invalid_source');
    const extension = String(input.extension || '').toLowerCase();
    const canvasLib = require('@napi-rs/canvas');
    let worker;
    async function recognize(image) {
        if (!worker) {
            const { createWorker } = require('tesseract.js');
            worker = await createWorker('ind+eng', 1, {
                langPath: input.languages, cachePath: root, cacheMethod: 'none',
                logger() {}, errorHandler() {},
            });
        }
        const result = await worker.recognize(image, { rotateAuto: true });
        return result.data.text.trim();
    }
    let task;
    try {
        if (['jpg', 'jpeg', 'png'].includes(extension)) {
            const image = await canvasLib.loadImage(filename);
            if (image.width * image.height > 25000000) throw Error('image_dimensions');
            const scale = Math.min(1, Math.sqrt(4000000 / (image.width * image.height)));
            const canvas = canvasLib.createCanvas(Math.max(1, Math.round(image.width * scale)), Math.max(1, Math.round(image.height * scale)));
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            const text = await recognize(canvas.toBuffer('image/png'));
            canvas.width = canvas.height = 0;
            return { text, page: 1, pages: 1, done: true, engine: 'tesseract-7-ind-eng' };
        }
        if (extension !== 'pdf') throw Error('unsupported_format');
        const requireFromHere = createRequire(__filename);
        const modulePath = requireFromHere.resolve('pdfjs-dist/legacy/build/pdf.mjs');
        // PDF.js uses these platform-native geometry classes in Node.
        globalThis.DOMMatrix ??= canvasLib.DOMMatrix;
        globalThis.ImageData ??= canvasLib.ImageData;
        globalThis.Path2D ??= canvasLib.Path2D;
        const pdfjs = await import(pathToFileURL(modulePath).href);
        const packageRoot = path.dirname(path.dirname(path.dirname(modulePath)));
        const assetPath = name => path.join(packageRoot, name).replaceAll('\\', '/') + '/';
        task = pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(filename)), isEvalSupported: false,
            maxImageSize: 16000000, useSystemFonts: false, verbosity: 0,
            standardFontDataUrl: assetPath('standard_fonts'),
            cMapUrl: assetPath('cmaps'), cMapPacked: true,
            wasmUrl: assetPath('wasm') });
        const pdf = await task.promise;
        if (pdf.numPages > 2000) throw Error('page_limit');
        const start = Math.max(1, Number(input.start) || 1);
        const end = Math.min(pdf.numPages, start + Math.min(3, Math.max(1, Number(input.count) || 2)) - 1);
        if (start > pdf.numPages) return { text: '', page: pdf.numPages, pages: pdf.numPages, done: true };
        const parts = [];
        let ocr = false, unreadable = 0;
        for (let pageNumber = start; pageNumber <= end; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const textContent = await page.getTextContent();
            let text = textContent.items.map(item => (item.str || '') + (item.hasEOL ? '\n' : ' ')).join('').trim();
            const operators = await page.getOperatorList();
            const hasImage = operators.fnArray.some(op => [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintInlineImageXObject, pdfjs.OPS.paintImageMaskXObject].includes(op));
            if (text.replace(/\s/g, '').length < 40 || (hasImage && text.length < 250)) {
                const normal = page.getViewport({ scale: 1 });
                const scale = Math.min(2.5, Math.sqrt(4000000 / (normal.width * normal.height)));
                const viewport = page.getViewport({ scale });
                const canvas = canvasLib.createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                text = await recognize(canvas.toBuffer('image/png'));
                canvas.width = canvas.height = 0;
                ocr = true;
            }
            if (text.trim()) parts.push(`[Halaman ${pageNumber}]\n${text}`);
            else unreadable++;
            page.cleanup();
        }
        return { text: parts.join('\n\n'), page: end, pages: pdf.numPages, done: end >= pdf.numPages, unreadable,
            engine: ocr ? 'pdfjs-6-tesseract-7' : 'pdfjs-6-text' };
    } finally {
        if (worker) await worker.terminate().catch(() => {});
        if (task) await task.destroy().catch(() => {});
    }
}

if (require.main === module) {
    let raw = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { raw += chunk; if (raw.length > 16384) process.exit(2); });
    process.stdin.on('end', async () => {
        try {
            const started = performance.now();
            const result = await read(JSON.parse(raw));
            process.stdout.write(JSON.stringify({ ...result, metrics: { duration_ms: Math.round(performance.now()-started), peak_rss_mb: Math.round(process.resourceUsage().maxRSS/1024) } }));
        } catch (_) {
            process.stderr.write('OCR_PROCESS_FAILED\n');
            process.exitCode = 1;
        }
    });
}
module.exports = { read };
