'use strict';
// Private CLI worker. JSON in/out, no HTTP listener, telemetry, or remote OCR API.
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
const { score, mergeText, largeRaster, enhance } = require('./quality.cjs');
const { prepare, regions } = require('./recovery.cjs');

async function read(input) {
    const filename = fs.realpathSync(input.file);
    const root = fs.realpathSync(input.root);
    if (!filename.startsWith(root + path.sep) || fs.statSync(filename).size > 30 * 1024 * 1024) throw Error('invalid_source');
    const extension = String(input.extension || '').toLowerCase();
    const deep = input.profile === 'deep';
    const maxPixels = Math.max(1000000, Math.min(deep ? 8000000 : 4000000, Number(input.max_pixels) || 4000000));
    const canvasLib = require('@napi-rs/canvas');
    let worker, retries = 0;
    const started = performance.now();
    async function recognize(canvas) {
        if (!worker) {
            const { createWorker } = require('tesseract.js');
            worker = await createWorker('ind+eng', 1, {
                langPath: input.languages, cachePath: root, cacheMethod: 'none',
                logger() {}, errorHandler() {},
            });
        }
        // Documents have columns, tables and scattered labels; SINGLE_BLOCK loses them.
        await worker.setParameters({ tessedit_pageseg_mode: '3' });
        let result = score((await worker.recognize(canvas.toBuffer('image/png'), { rotateAuto: true })).data);
        // One optional retry for the entire pass, only for difficult, non-blank scans.
        if (result.confidence < 55 && retries < 1 && performance.now()-started < 20000 && enhance(canvas)) {
            retries++;
            await worker.setParameters({ tessedit_pageseg_mode: '11' });
            const candidate = score((await worker.recognize(canvas.toBuffer('image/png'), { rotateAuto: true })).data);
            if (candidate.text && (!result.text || candidate.confidence > result.confidence)) result = candidate;
        }
        if (deep && (result.confidence < 75 || result.text.replace(/\s/g, '').length < 80) && performance.now() - started < 90000) {
            const cleaned = prepare(canvas, canvasLib);
            try {
                await worker.setParameters({ tessedit_pageseg_mode: '6' });
                const candidate = score((await worker.recognize(cleaned.toBuffer('image/png'), { rotateAuto: true })).data);
                if (candidate.text && candidate.confidence > result.confidence) result = candidate;
                if (result.confidence < 65 && performance.now() - started < 100000) {
                    const chunks = [];
                    for (const region of regions(cleaned.width, cleaned.height)) {
                        if (performance.now() - started >= 120000) break;
                        await worker.setParameters({ tessedit_pageseg_mode: '11' });
                        const part = score((await worker.recognize(cleaned.toBuffer('image/png'), { rectangle: { left: region.x, top: region.y, width: region.width, height: region.height } })).data);
                        if (part.text && part.confidence >= 55) chunks.push(part);
                    }
                    if (chunks.length === 2) {
                        const combined = { text: mergeText(chunks[0].text, chunks[1].text), confidence: Math.min(...chunks.map(item => item.confidence)) };
                        if (combined.confidence > result.confidence) result = combined;
                    }
                }
            } finally { cleaned.width = cleaned.height = 0; }
        }
        return result;
    }
    let task;
    try {
        if (['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'].includes(extension)) {
            if (input.progress === true && require.main === module) process.stderr.write('OCR_PAGES=1\n');
            const image = await canvasLib.loadImage(filename);
            if (image.width * image.height > 25000000) throw Error('image_dimensions');
            const scale = Math.min(1, Math.sqrt(maxPixels / (image.width * image.height)));
            const canvas = canvasLib.createCanvas(Math.max(1, Math.round(image.width * scale)), Math.max(1, Math.round(image.height * scale)));
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const result = await recognize(canvas);
            canvas.width = canvas.height = 0;
            return { ...result, page: 1, pages: 1, done: true, unreadable: !result.text || result.confidence < 55 ? 1 : 0, engine: 'tesseract-7-ind-eng',
                passages: [{ ...result, page: 1, engine: 'tesseract-7-ind-eng' }] };
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
        if (input.progress === true && require.main === module) process.stderr.write(`OCR_PAGES=${pdf.numPages}\n`);
        const start = Math.max(1, Number(input.start) || 1);
        const end = Math.min(pdf.numPages, start + Math.min(3, Math.max(1, Number(input.count) || 2)) - 1);
        if (start > pdf.numPages) return { text: '', page: pdf.numPages, pages: pdf.numPages, done: true };
        const parts = [], passages = [];
        let ocr = false, unreadable = 0, confidence = null;
        for (let pageNumber = start; pageNumber <= end; pageNumber++) {
            let pageConfidence = null, pageOcr = false;
            let page, text = '';
            try {
                page = await pdf.getPage(pageNumber);
                // A broken text layer may still have a readable scanned image.
                try {
                    const textContent = await page.getTextContent();
                    text = textContent.items.map(item => (item.str || '') + (item.hasEOL ? '\n' : ' ')).join('').trim();
                } catch (_) {}
                const operators = await page.getOperatorList();
                const imageOps = ['paintImageXObject', 'paintInlineImageXObject', 'paintImageMaskXObject', 'paintImageXObjectRepeat', 'paintInlineImageXObjectGroup', 'paintImageMaskXObjectRepeat', 'paintImageMaskXObjectGroup'].map(name => pdfjs.OPS[name]).filter(Number.isInteger);
                const hasImage = operators.fnArray.some(op => imageOps.includes(op));
                const normal = page.getViewport({ scale: 1 });
                if (text.replace(/\s/g, '').length < 40 || (hasImage && (deep || text.length < 250)) || largeRaster(operators, pdfjs.OPS, normal.width*normal.height)) {
                    const scale = Math.min(deep ? 4.2 : 2.5, Math.sqrt(maxPixels / (normal.width * normal.height)));
                    const viewport = page.getViewport({ scale });
                    const canvas = canvasLib.createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
                    try {
                        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                        const result = await recognize(canvas);
                        text = mergeText(text, result.text);
                        confidence = confidence === null ? result.confidence : Math.min(confidence, result.confidence);
                        pageConfidence = result.confidence; pageOcr = true;
                        if (result.confidence < 55) unreadable++;
                    } finally { canvas.width = canvas.height = 0; }
                    ocr = true;
                }
                if (text.length > 1000000) throw Error('page_text_limit');
                passages.push({ page: pageNumber, text, confidence: pageConfidence, engine: pageOcr ? 'pdfjs-6-tesseract-7' : 'pdfjs-6-text' });
                if (text.trim()) parts.push(`[Halaman ${pageNumber}]\n${text}`);
                else unreadable++;
            } catch (error) {
                // One damaged page must not hide readable pages later in the same PDF.
                const retained = text.slice(0, 1000000).replace(/[\uD800-\uDBFF]$/, '');
                passages.push({ page: pageNumber, text: retained, confidence: 0, engine: 'pdfjs-6-tesseract-7', error: error.message === 'page_text_limit' ? 'page_text_limit' : 'page_unreadable' });
                if (retained.trim()) parts.push(`[Halaman ${pageNumber}]\n${retained}`);
                unreadable++; confidence = 0;
            } finally { if (page) page.cleanup(); }
        }
        return { text: parts.join('\n\n'), passages, page: end, pages: pdf.numPages, done: end >= pdf.numPages, unreadable, confidence,
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
        } catch (error) {
            const category = error.name === 'PasswordException' ? 'protected_pdf' : error.name === 'InvalidPDFException' ? 'invalid_pdf'
                : ['page_text_limit', 'page_limit', 'image_dimensions', 'invalid_source', 'unsupported_format'].includes(error.message) ? error.message : 'reader_failed';
            process.stderr.write(`OCR_PROCESS_FAILED:${category}\n`);
            process.exitCode = 1;
        }
    });
}
module.exports = { read };
