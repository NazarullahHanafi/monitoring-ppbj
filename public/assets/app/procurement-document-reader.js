(function () {
    'use strict';
    let pdfModule;
    let ocrLibrary;
    function loadOcr(base) {
        if (!ocrLibrary) ocrLibrary = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${base}/tesseract.min.js`;
            script.onload = () => resolve(window.Tesseract);
            script.onerror = () => { ocrLibrary = null; reject(new Error('Pembaca scan belum berhasil dimuat. Coba lagi atau unggah berkas terlebih dahulu.')); };
            document.head.appendChild(script);
        });
        return ocrLibrary;
    }
    function check(signal) { if (signal.aborted) throw new DOMException('Dibatalkan', 'AbortError'); }
    async function readPdf(file, update, signal, readerBase) {
        const base = readerBase || window.PROCUREMENT_DETAILS_CONFIG.readerUrl;
        update('Menyiapkan pembaca PDF di perangkat Anda…');
        if (!pdfModule) pdfModule = import(`${base}/pdf.min.mjs`).catch(error => { pdfModule = null; throw error; });
        const pdfjs = await pdfModule;
        check(signal);
        pdfjs.GlobalWorkerOptions.workerSrc = `${base}/pdf.worker.min.mjs`;
        pdfjs.GlobalWorkerOptions.rendererSrc = `${base}/pdf.renderer.min.mjs`;
        const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()), isEvalSupported: false,
            standardFontDataUrl: `${base}/standard_fonts/`, cMapUrl: `${base}/cmaps/`, cMapPacked: true,
            wasmUrl: `${base}/wasm/`, maxImageSize: 16000000 });
        let pdf, worker;
        const cancel = () => { task.destroy(); if (worker) worker.terminate(); };
        signal.addEventListener('abort', cancel, { once: true });
        try {
            pdf = await task.promise;
            if (pdf.numPages > 30) throw new Error('Maksimal 30 halaman per PDF. Pisahkan berkas menjadi beberapa lampiran.');
            const pages = [];
            let ocrPages = 0, totalLength = 0;
            for (let number = 1; number <= pdf.numPages; number++) {
                check(signal);
                update(`Membaca halaman ${number} dari ${pdf.numPages}…`);
                const page = await pdf.getPage(number);
                const content = await page.getTextContent();
                let text = content.items.map(item => (item.str || '') + (item.hasEOL ? '\n' : ' ')).join('').trim();
                const operators = await page.getOperatorList();
                const hasImage = operators.fnArray.some(op => [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintInlineImageXObject, pdfjs.OPS.paintImageMaskXObject].includes(op));
                // Sparse text with an image often means a scanned body with a digital header.
                if (text.replace(/\s/g, '').length < 40 || (hasImage && text.length < 250)) {
                    if (!worker) {
                        const ocr = await loadOcr(base);
                        check(signal);
                        worker = await ocr.createWorker('ind+eng', 1, { workerPath: `${base}/worker.min.js`,
                            corePath: `${base}/core`, langPath: `${base}/lang`, workerBlobURL: false,
                            logger: event => { if (!signal.aborted) update(`Membaca scan halaman ${number}/${pdf.numPages}… ${Math.round((event.progress || 0) * 100)}%`); },
                            errorHandler: () => {} });
                    }
                    check(signal);
                    const normal = page.getViewport({ scale: 1 });
                    const scale = Math.min(2, Math.sqrt(3500000 / (normal.width * normal.height)));
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
                    const render = page.render({ canvasContext: canvas.getContext('2d'), viewport });
                    const stopRender = () => render.cancel();
                    signal.addEventListener('abort', stopRender, { once: true });
                    try {
                        await render.promise;
                        const result = await worker.recognize(canvas);
                        text = result.data.text.trim();
                        ocrPages++;
                    } finally {
                        signal.removeEventListener('abort', stopRender);
                        canvas.width = canvas.height = 0;
                    }
                }
                check(signal);
                totalLength += text.length;
                if (totalLength > 198000) throw new Error('Isi PDF terlalu panjang. Pisahkan berkas menjadi lampiran yang lebih kecil.');
                pages.push(`[Halaman ${number}]\n${text || '(Teks tidak terbaca. Lengkapi saat pemeriksaan.)'}`);
                page.cleanup();
            }
            return { text: pages.join('\n\n'), method: ocrPages === 0 ? 'pdf-text' : ocrPages === pdf.numPages ? 'pdf-ocr' : 'pdf-mixed' };
        } finally {
            signal.removeEventListener('abort', cancel);
            if (worker) await worker.terminate().catch(() => {});
            await task.destroy().catch(() => {});
        }
    }
    async function readImage(file, update, signal, readerBase) {
        const base = readerBase || window.PROCUREMENT_DETAILS_CONFIG.readerUrl;
        let bitmap, worker, canvas;
        const cancel = () => { if (worker) worker.terminate(); };
        signal.addEventListener('abort', cancel, { once: true });
        try {
            update('Menyiapkan pembaca foto di perangkat Anda…');
            bitmap = await createImageBitmap(file);
            check(signal);
            if (bitmap.width * bitmap.height > 16000000) throw new Error('Foto melebihi 16 megapiksel. Perkecil foto sebelum membaca teks. Berkas asli tetap dapat diunggah.');
            const scale = Math.min(1, Math.sqrt(3500000 / (bitmap.width * bitmap.height)));
            canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(bitmap.width * scale));
            canvas.height = Math.max(1, Math.round(bitmap.height * scale));
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            bitmap.close(); bitmap = null;
            const ocr = await loadOcr(base);
            check(signal);
            worker = await ocr.createWorker('ind+eng', 1, { workerPath: `${base}/worker.min.js`,
                corePath: `${base}/core`, langPath: `${base}/lang`, workerBlobURL: false,
                logger: event => { if (!signal.aborted) update(`Membaca foto… ${Math.round((event.progress || 0) * 100)}%`); }, errorHandler: () => {} });
            check(signal);
            const result = await worker.recognize(canvas);
            check(signal);
            const text = result.data.text.trim();
            if (text.length > 200000) throw new Error('Teks terlalu panjang. Lengkapi teks pencarian secara manual.');
            return { text, method: 'image-ocr' };
        } finally {
            signal.removeEventListener('abort', cancel);
            if (bitmap) bitmap.close();
            if (worker) await worker.terminate().catch(() => {});
            if (canvas) canvas.width = canvas.height = 0;
        }
    }
    window.ProcurementDocumentReader = { readPdf, readImage };
})();
