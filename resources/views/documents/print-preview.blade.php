<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Preview Dokumen' }} - SIMONPR</title>
    <link rel="icon" href="{{ asset('images/logo4.png') }}" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #eef4ff;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --line: #dbe7ff;
            --primary: #2563eb;
            --primary2: #7c3aed;
            --accent: #06b6d4;
            --success: #10b981;
            --danger: #ef4444;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #0b1220;
                --card: #111c2e;
                --text: #f8fafc;
                --muted: #b7c5d9;
                --line: #263752;
                --primary: #60a5fa;
                --primary2: #a78bfa;
                --accent: #22d3ee;
            }
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at 12% 16%, rgba(34,211,238,.18), transparent 28%),
                radial-gradient(circle at 85% 8%, rgba(168,85,247,.20), transparent 30%),
                linear-gradient(135deg, var(--bg), #f8fbff 48%, var(--bg));
            color: var(--text);
            padding: 34px 18px;
        }
        @media (prefers-color-scheme: dark) {
            body { background: radial-gradient(circle at 12% 16%, rgba(34,211,238,.12), transparent 28%), radial-gradient(circle at 85% 8%, rgba(168,85,247,.14), transparent 30%), linear-gradient(135deg, #07101f, #10182a 50%, #07101f); }
        }
        .wrap { width: min(1100px, 100%); margin: 0 auto; }
        .hero {
            overflow: hidden;
            border-radius: 28px;
            background: linear-gradient(135deg, #2563eb, #7c3aed 54%, #db2777);
            color: white;
            box-shadow: 0 24px 70px rgba(37, 99, 235, .25);
        }
        .hero-inner { padding: 28px 30px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .eyebrow { letter-spacing: .22em; font-size: 12px; font-weight: 900; opacity:.86; }
        h1 { margin: 10px 0 8px; font-size: clamp(28px, 4vw, 46px); line-height: 1.05; font-weight: 900; }
        .hero p { margin: 0; max-width: 740px; line-height: 1.7; font-weight: 600; opacity: .92; }
        .type-pill { flex:0 0 auto; width: 110px; height: 110px; border-radius: 28px; display:grid; place-items:center; background: rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.28); font-size: 24px; font-weight: 900; box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
        .grid { display:grid; grid-template-columns: .9fr 1.35fr; gap: 22px; margin-top: 22px; }
        .card { background: color-mix(in srgb, var(--card) 94%, transparent); border:1px solid var(--line); border-radius: 26px; box-shadow: 0 22px 70px rgba(15,23,42,.10); }
        .side { padding: 24px; }
        .main { padding: 26px; min-height: 430px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; position:relative; overflow:hidden; }
        .main::before { content:""; position:absolute; width:380px; height:380px; border-radius:50%; background:linear-gradient(135deg, rgba(37,99,235,.14), rgba(219,39,119,.10)); filter: blur(4px); top:-130px; right:-120px; }
        .doc-icon { width:96px; height:116px; border-radius:22px; background:linear-gradient(135deg, var(--primary), var(--primary2)); color:white; display:grid; place-items:center; font-weight:900; font-size:24px; box-shadow:0 20px 45px rgba(37,99,235,.25); position:relative; z-index:1; }
        .doc-icon::after { content:""; position:absolute; top:0; right:0; border-top:26px solid rgba(255,255,255,.55); border-left:26px solid transparent; border-radius:0 20px 0 8px; }
        .main h2 { position:relative; z-index:1; margin:22px 0 8px; font-size: 30px; line-height:1.18; }
        .main .desc { position:relative; z-index:1; color: var(--muted); line-height:1.75; max-width:680px; font-weight:600; }
        .meta-title { font-size:12px; letter-spacing:.14em; color:var(--muted); font-weight:900; text-transform:uppercase; margin-bottom:16px; }
        .meta-list { display:grid; gap:12px; }
        .meta-item { padding:14px 15px; border-radius:18px; border:1px solid var(--line); background: color-mix(in srgb, var(--card) 84%, var(--bg)); }
        .meta-label { color:var(--muted); font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
        .meta-value { font-size:14px; font-weight:800; line-height:1.45; word-break:break-word; }
        .actions { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:26px; position:relative; z-index:1; }
        .btn { border:0; border-radius:16px; padding:14px 18px; font-family:inherit; font-weight:900; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:.18s ease; }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary { color:white; background:linear-gradient(135deg, #2563eb, #7c3aed); box-shadow:0 15px 30px rgba(37,99,235,.25); }
        .btn-soft { color:var(--text); background: color-mix(in srgb, var(--card) 86%, var(--bg)); border:1px solid var(--line); }
        .btn-success { color:white; background:linear-gradient(135deg, #059669, #06b6d4); box-shadow:0 15px 30px rgba(16,185,129,.20); }
        .note { margin-top:18px; border-radius:18px; padding:14px 16px; background:rgba(14,165,233,.10); border:1px solid rgba(14,165,233,.28); color:var(--muted); font-size:13px; line-height:1.7; font-weight:700; }
        .status { min-height:22px; margin-top:14px; color:var(--muted); font-weight:800; font-size:13px; }
        .status.ok { color: var(--success); }
        .status.err { color: var(--danger); }
        @media (max-width: 820px) {
            .hero-inner { align-items:flex-start; flex-direction:column; }
            .grid { grid-template-columns:1fr; }
            .type-pill { width:86px; height:86px; border-radius:22px; }
        }
    </style>
</head>
<body>
    <main class="wrap">
        <section class="hero">
            <div class="hero-inner">
                <div>
                    <div class="eyebrow">{{ $eyebrow ?? 'SIMONPR DOCUMENT' }}</div>
                    <h1>{{ $title ?? 'Preview Dokumen' }}</h1>
                    <p>Dokumen tidak langsung di-download. Silakan cek informasinya dulu, lalu pilih <strong>Simpan ke Folder</strong> untuk Save As modern atau pakai Download biasa jika browser tidak mendukung.</p>
                </div>
                <div class="type-pill">{{ $documentType ?? 'DOCX' }}</div>
            </div>
        </section>

        <section class="grid">
            <aside class="card side">
                <div class="meta-title">Detail dokumen</div>
                <div class="meta-list">
                    @foreach(($meta ?? []) as $label => $value)
                        <div class="meta-item">
                            <div class="meta-label">{{ $label }}</div>
                            <div class="meta-value">{{ $value }}</div>
                        </div>
                    @endforeach
                </div>
                <div class="note">
                    Tips: fitur Save As paling mulus di Chrome/Edge pada HTTPS. Jika tombol modern tidak tersedia, sistem otomatis memakai download biasa.
                </div>
            </aside>

            <section class="card main">
                <div class="doc-icon">{{ $documentType ?? 'DOCX' }}</div>
                <h2>{{ $documentName ?? 'Dokumen siap dicetak' }}</h2>
                <p class="desc">{{ $subtitle ?? 'File siap dibuat dari data SIMONPR.' }}</p>

                <div class="actions">
                    <button type="button" class="btn btn-success" id="saveAsBtn">💾 Simpan ke Folder</button>
                    <a class="btn btn-primary" id="downloadBtn" href="{{ $downloadUrl }}">⬇️ Download Biasa</a>
                    <a class="btn btn-soft" href="{{ $backUrl ?? url()->previous() }}">← Kembali</a>
                </div>
                <div class="status" id="saveStatus"></div>
            </section>
        </section>
    </main>

    <script>
        const downloadUrl = @json($downloadUrl);
        const fallbackFilename = @json($filename ?? 'dokumen.docx');
        const statusEl = document.getElementById('saveStatus');
        const saveAsBtn = document.getElementById('saveAsBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        function setStatus(message, type = '') {
            statusEl.textContent = message || '';
            statusEl.className = 'status ' + type;
        }

        function filenameFromDisposition(header) {
            if (!header) return fallbackFilename;
            const utf = header.match(/filename\\*=UTF-8''([^;]+)/i);
            if (utf) return decodeURIComponent(utf[1].replace(/['"]/g, ''));
            const normal = header.match(/filename="?([^";]+)"?/i);
            return normal ? normal[1] : fallbackFilename;
        }

        async function fetchDocument() {
            setStatus('Menyiapkan dokumen dari server SIMONPR...');
            const response = await fetch(downloadUrl, {
                credentials: 'same-origin',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });

            if (!response.ok) {
                throw new Error('Dokumen gagal dibuat. Status: ' + response.status);
            }

            const blob = await response.blob();
            return {
                blob,
                filename: filenameFromDisposition(response.headers.get('Content-Disposition')),
            };
        }

        async function saveWithPicker() {
            const { blob, filename } = await fetchDocument();

            if (!window.showSaveFilePicker) {
                setStatus('Browser belum mendukung Save As modern. Menggunakan download biasa...', 'err');
                const objectUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = objectUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
                return;
            }

            const extension = filename.split('.').pop()?.toLowerCase() || 'docx';
            const accept = extension === 'zip'
                ? { 'application/zip': ['.zip'] }
                : { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] };

            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{ description: extension === 'zip' ? 'ZIP Archive' : 'Word Document', accept }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            setStatus('Berhasil disimpan. Mantap, file sudah masuk folder pilihan user ✅', 'ok');
        }

        saveAsBtn?.addEventListener('click', async () => {
            saveAsBtn.disabled = true;
            try {
                await saveWithPicker();
            } catch (error) {
                if (error && error.name === 'AbortError') {
                    setStatus('Penyimpanan dibatalkan user.');
                } else {
                    setStatus(error?.message || 'Gagal menyimpan dokumen.', 'err');
                }
            } finally {
                saveAsBtn.disabled = false;
            }
        });

        downloadBtn?.addEventListener('click', () => {
            setStatus('Download biasa dimulai. Jika browser disetel “Ask where to save”, user bisa pilih folder.');
        });
    </script>
</body>
</html>
