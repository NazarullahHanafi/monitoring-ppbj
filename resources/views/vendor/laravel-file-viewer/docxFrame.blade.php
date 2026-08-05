<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Preview Dokumen Word</title>
    <style>
        :root {
            color-scheme: light;
            --bg: #eef3fb;
            --panel: #ffffff;
            --ink: #0f172a;
            --muted: #64748b;
            --line: rgba(148, 163, 184, .35);
            --blue: #2563eb;
            --blue-soft: #dbeafe;
            --danger: #ef4444;
        }

        html,
        body {
            margin: 0;
            min-height: 100%;
            background: var(--bg);
            color: var(--ink);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
            overflow: auto;
        }

        #loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            text-align: center;
        }

        .status-card {
            width: min(560px, 100%);
            border-radius: 28px;
            background: var(--panel);
            box-shadow: 0 24px 70px rgba(15, 23, 42, .18);
            padding: 34px;
            border: 1px solid var(--line);
        }

        .spinner {
            width: 54px;
            height: 54px;
            border: 5px solid var(--blue-soft);
            border-top-color: var(--blue);
            border-radius: 999px;
            margin: 0 auto 18px;
            animation: spin .85s linear infinite;
        }

        .status-icon {
            width: 64px;
            height: 64px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            margin-bottom: 16px;
            color: var(--danger);
            border: 4px solid rgba(239, 68, 68, .28);
            font-size: 32px;
            font-weight: 900;
        }

        .status-title {
            font-size: 22px;
            font-weight: 900;
            margin: 0 0 10px;
            letter-spacing: -.02em;
        }

        .status-text {
            color: var(--muted);
            line-height: 1.65;
            margin: 0 0 20px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            padding: 12px 18px;
            background: var(--blue);
            color: #fff;
            text-decoration: none;
            font-weight: 800;
            box-shadow: 0 12px 26px rgba(37, 99, 235, .28);
        }

        .docx-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 24px 0;
            background: #525659;
            min-height: 100vh;
        }

        section.docx {
            position: relative;
            overflow: hidden;
            box-shadow: 0 2px 18px rgba(0, 0, 0, .35);
        }

        .simonpr-kop-overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
            user-select: none;
        }

        section.docx > article,
        section.docx > header,
        section.docx > footer {
            position: relative;
            z-index: 1;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <div id="loading">
        <div class="status-card">
            <div class="spinner"></div>
            <h1 class="status-title">Menyiapkan preview Word...</h1>
            <p class="status-text">Dokumen sedang dirender langsung di browser. Kalau file cukup besar, proses ini bisa butuh beberapa detik.</p>
        </div>
    </div>

    <div id="content"></div>

    <script>
    (function () {
        const fileUrl = @json($fileUrl);
        const container = document.getElementById('content');
        const loading = document.getElementById('loading');

        function escapeHtml(value) {
            return String(value).replace(/[&<>"']/g, function (char) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                }[char];
            });
        }

        function loadScript(src) {
            return new Promise(function (resolve, reject) {
                const existing = document.querySelector('script[src="' + src + '"]');

                if (existing) {
                    if (existing.dataset.loaded === 'true') {
                        resolve();
                        return;
                    }

                    existing.addEventListener('load', resolve, { once: true });
                    existing.addEventListener('error', reject, { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = function () {
                    script.dataset.loaded = 'true';
                    resolve();
                };
                script.onerror = function () {
                    reject(new Error('Asset viewer gagal dimuat: ' + src));
                };

                document.head.appendChild(script);
            });
        }

        function showError(message) {
            loading.style.display = 'flex';
            loading.innerHTML =
                '<div class="status-card">' +
                    '<div class="status-icon">!</div>' +
                    '<h1 class="status-title">Preview Word belum bisa ditampilkan</h1>' +
                    '<p class="status-text">' + escapeHtml(message) + '</p>' +
                    '<a class="btn" href="' + fileUrl + '" target="_blank" rel="noopener">Buka / Unduh File</a>' +
                '</div>';
        }

        async function getDocxRenderer() {
            await loadScript(@json(asset('vendor/laravel-file-viewer/docx-preview/jszip.min.js')));
            await loadScript(@json(asset('vendor/laravel-file-viewer/docx-preview/docx-preview.min.js')));

            if (window.docx && typeof window.docx.renderAsync === 'function') {
                return window.docx.renderAsync.bind(window.docx);
            }

            try {
                const module = await import(@json(asset('vendor/laravel-file-viewer/docx-preview/docx-preview.min.mjs')));
                const renderer = module.renderAsync || (module.default && module.default.renderAsync);

                if (typeof renderer === 'function') {
                    return renderer;
                }
            } catch (error) {
                console.warn('Fallback module DOCX gagal dimuat:', error);
            }

            throw new Error('Library preview Word belum siap. Biasanya ini karena asset viewer belum terpublish, cache browser lama, atau file JavaScript viewer diblokir.');
        }

        async function makeObjectUrlFromZip(zip, filename) {
            if (!filename || !zip.file(filename)) {
                return null;
            }

            const blob = await zip.file(filename).async('blob');

            return URL.createObjectURL(blob);
        }

        async function extractKopImages(blob) {
            if (!window.JSZip || typeof window.JSZip.loadAsync !== 'function') {
                return { first: null, next: null };
            }

            try {
                const zip = await window.JSZip.loadAsync(blob);
                const mediaFiles = Object.keys(zip.files).filter(function (name) {
                    return /^word\/media\//i.test(name);
                });

                const byName = function (needle) {
                    needle = needle.toLowerCase();

                    return mediaFiles.find(function (name) {
                        return name.toLowerCase().indexOf(needle) !== -1;
                    }) || null;
                };

                const firstMedia = byName('kop_surat_halaman_1') || byName('kop_surat_sp') || null;
                const nextMedia = byName('kop_surat_lanjutan') || firstMedia;

                return {
                    first: await makeObjectUrlFromZip(zip, firstMedia),
                    next: await makeObjectUrlFromZip(zip, nextMedia)
                };
            } catch (error) {
                console.warn('Kop surat tidak bisa diekstrak dari DOCX:', error);

                return { first: null, next: null };
            }
        }

        function applyKopOverlay(kopImages) {
            if (!kopImages || (!kopImages.first && !kopImages.next)) {
                return;
            }

            const pages = container.querySelectorAll('section.docx');

            pages.forEach(function (page, index) {
                const src = index === 0 ? (kopImages.first || kopImages.next) : (kopImages.next || kopImages.first);

                if (!src || page.querySelector('.simonpr-kop-overlay')) {
                    return;
                }

                const image = document.createElement('img');
                image.src = src;
                image.alt = '';
                image.className = 'simonpr-kop-overlay';
                image.setAttribute('aria-hidden', 'true');
                page.insertBefore(image, page.firstChild);
            });
        }

        async function renderDocument() {
            try {
                const renderAsync = await getDocxRenderer();
                const response = await fetch(fileUrl, { credentials: 'same-origin' });

                if (!response.ok) {
                    throw new Error('File tidak bisa dibuka. HTTP ' + response.status);
                }

                const blob = await response.blob();
                const kopImages = await extractKopImages(blob);
                const styleContainer = document.createElement('div');
                document.head.appendChild(styleContainer);
                container.innerHTML = '';

                await renderAsync(blob, container, styleContainer, {
                    className: 'docx',
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    ignoreFonts: false,
                    breakPages: true,
                    renderHeaders: true,
                    renderFooters: true,
                    renderFootnotes: true,
                    renderEndnotes: true,
                    useBase64URL: true,
                    experimental: false,
                    debug: false
                });

                applyKopOverlay(kopImages);

                loading.style.display = 'none';
            } catch (error) {
                showError(error.message || 'Terjadi error tidak dikenal saat render dokumen.');
            }
        }

        renderDocument();
    })();
    </script>
</body>
</html>
