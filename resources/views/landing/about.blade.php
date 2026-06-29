@extends('layouts.landing')

@section('title', 'About - SIMONPR')

@push('styles')
    <style>
        body, main.site-main {
            background:
                radial-gradient(circle at 12% 12%, rgba(34,211,238,.12), transparent 26rem),
                radial-gradient(circle at 86% 20%, rgba(129,140,248,.13), transparent 28rem),
                var(--bg) !important;
            font-family: 'Montserrat', sans-serif;
        }

        [data-theme="light"] body,
        [data-theme="light"] main.site-main {
            background:
                radial-gradient(circle at 12% 12%, rgba(8,145,178,.10), transparent 26rem),
                radial-gradient(circle at 86% 20%, rgba(99,102,241,.10), transparent 28rem),
                #f8fbff !important;
        }

        .agency-wrap { width:min(1180px, calc(100% - 48px)); margin:0 auto; position:relative; z-index:1; }
        .agency-hero { position:relative; overflow:hidden; padding:108px 0 68px; }
        .agency-hero::before {
            content:""; position:absolute; inset:0; opacity:.32;
            background:
                linear-gradient(90deg, var(--bg), rgba(8,13,26,.72), rgba(8,13,26,.5)),
                url('{{ asset('images/hero-building.jpg') }}') center right/cover no-repeat;
        }
        [data-theme="light"] .agency-hero::before {
            opacity:.62;
            background:
                linear-gradient(90deg, rgba(248,251,255,.98), rgba(248,251,255,.78), rgba(248,251,255,.55)),
                url('{{ asset('images/hero-building.jpg') }}') center right/cover no-repeat;
        }
        .hero-split { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(320px,.7fr); gap:56px; align-items:end; }
        .eyebrow {
            display:inline-flex; align-items:center; gap:10px; width:fit-content; padding:9px 13px;
            border:1px solid rgba(34,211,238,.25); border-radius:999px; color:var(--cyan);
            background:rgba(34,211,238,.08); font-size:.75rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase;
        }
        .eyebrow::before { content:""; width:8px; height:8px; border-radius:999px; background:#34d399; box-shadow:0 0 0 6px rgba(52,211,153,.14); }
        .hero-title {
            margin:18px 0 20px; color:var(--text); font-size:clamp(3rem,7vw,6.4rem);
            line-height:.9; letter-spacing:-.08em; font-weight:900; max-width:850px;
        }
        .hero-title span { display:block; }
        .gradient-text {
            background:linear-gradient(120deg,var(--cyan),var(--violet),#ec4899);
            -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }
        .hero-copy { color:var(--text-2); line-height:1.85; font-size:1.02rem; max-width:640px; }
        .hero-card, .glass-card {
            border:1px solid var(--border); border-radius:28px; background:rgba(255,255,255,.06);
            box-shadow:0 18px 44px rgba(0,0,0,.18); overflow:hidden;
        }
        [data-theme="light"] .hero-card,
        [data-theme="light"] .glass-card { background:rgba(255,255,255,.84); box-shadow:0 18px 44px rgba(15,23,42,.08); }
        .hero-card { padding:24px; }
        .mini-row { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:17px 0; border-bottom:1px solid var(--border); }
        .mini-row:last-child { border-bottom:none; }
        .mini-row b { color:var(--text); font-size:1.8rem; letter-spacing:-.06em; }
        .mini-row span { color:var(--text-2); font-size:.82rem; font-weight:700; line-height:1.5; text-align:right; }
        .section { padding:74px 0; }
        .intro-grid { display:grid; grid-template-columns:minmax(0,.85fr) minmax(320px,1fr); gap:24px; align-items:stretch; }
        .big-panel { padding:clamp(28px,5vw,52px); position:relative; }
        .big-panel h2 { color:var(--text); font-size:clamp(2rem,4vw,4rem); line-height:.98; letter-spacing:-.065em; margin:14px 0 18px; }
        .big-panel p { color:var(--text-2); line-height:1.85; max-width:760px; }
        .info-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
        .info-card { padding:24px; }
        .info-icon { width:50px; height:50px; border-radius:18px; display:grid; place-items:center; color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); margin-bottom:18px; }
        .info-card h3 { color:var(--text); font-size:1.05rem; margin-bottom:10px; }
        .info-card p { color:var(--text-2); line-height:1.7; font-size:.9rem; }
        .values-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; }
        .value-card { padding:26px; min-height:210px; transition:.22s ease; }
        .value-card:hover { transform:translateY(-5px); border-color:rgba(34,211,238,.28); }
        .value-no { color:var(--muted); font-size:.75rem; font-weight:900; letter-spacing:.12em; margin-bottom:24px; }
        .value-card h3 { color:var(--text); margin-bottom:10px; font-size:1.08rem; }
        .value-card p { color:var(--text-2); line-height:1.7; font-size:.9rem; }
        .cta-panel {
            display:grid; grid-template-columns:1fr auto; gap:28px; align-items:center; padding:36px;
            border-radius:30px; background:linear-gradient(135deg,rgba(34,211,238,.18),rgba(129,140,248,.16)); border:1px solid var(--border);
        }
        .cta-panel h2 { color:var(--text); font-size:clamp(1.8rem,4vw,3.4rem); line-height:1; letter-spacing:-.06em; margin-bottom:10px; }
        .cta-panel p { color:var(--text-2); line-height:1.75; }
        .btn-row { display:flex; flex-wrap:wrap; gap:12px; }
        .btn-primary, .btn-soft {
            min-height:48px; padding:0 22px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; gap:10px;
            font-weight:800; text-decoration:none; transition:.2s ease;
        }
        .btn-primary { color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); box-shadow:0 16px 34px rgba(99,102,241,.22); }
        .btn-soft { color:var(--text); border:1px solid var(--border); background:rgba(255,255,255,.06); }
        .btn-primary:hover, .btn-soft:hover { transform:translateY(-2px); }
        .reveal { opacity:0; transform:translateY(20px); transition:.65s ease; }
        .reveal.show { opacity:1; transform:none; }
        /* Koral-inspired alignment with Home */
        body,
        main.site-main {
            background: #fff !important;
        }

        [data-theme="dark"] body,
        [data-theme="dark"] main.site-main {
            background: #0e1020 !important;
        }

        .agency-hero::before {
            opacity: .92;
            background:
                linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.82) 48%, rgba(255,255,255,.48) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
        }

        [data-theme="dark"] .agency-hero::before {
            opacity: .95;
            background:
                linear-gradient(90deg, rgba(14,16,32,.95) 0%, rgba(14,16,32,.82) 48%, rgba(14,16,32,.56) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
        }

        .eyebrow {
            color: #ff6b66;
            border: 0;
            background: transparent;
            padding: 0;
            border-radius: 0;
            letter-spacing: .14em;
        }

        .eyebrow::before {
            width: 34px;
            height: 3px;
            border-radius: 999px;
            background: #ff6b66;
            box-shadow: none;
        }

        .hero-title {
            color: #111229;
            font-size: clamp(3.4rem, 8vw, 7.6rem);
            line-height: .9;
            letter-spacing: -.07em;
        }

        [data-theme="dark"] .hero-title {
            color: #f8fafc;
        }

        .gradient-text {
            background: none;
            -webkit-text-fill-color: #ff6b66;
            color: #ff6b66;
        }

        .hero-copy,
        .big-panel p,
        .info-card p,
        .value-card p,
        .cta-panel p {
            line-height: 1.9;
            font-weight: 500;
        }

        .hero-card,
        .glass-card {
            border-radius: 0;
            background: #fff;
            border: 1px solid rgba(17,18,41,.10);
            box-shadow: 0 22px 60px rgba(17,18,41,.08);
        }

        [data-theme="dark"] .hero-card,
        [data-theme="dark"] .glass-card {
            background: #171a2f;
            border-color: rgba(255,255,255,.12);
        }

        .big-panel h2,
        .cta-panel h2 {
            letter-spacing: -.055em;
            font-size: clamp(2.25rem, 4.6vw, 4.8rem);
        }

        .info-icon {
            border-radius: 0;
            background: #ff6b66;
        }

        .value-no {
            color: #ff6b66;
        }

        .btn-primary {
            border-radius: 4px;
            background: #ff6b66;
            box-shadow: 0 16px 34px rgba(255,107,102,.24);
        }

        .btn-soft {
            border-radius: 4px;
        }

        @media(max-width:900px){ .hero-split,.intro-grid,.cta-panel{grid-template-columns:1fr;} .values-grid,.info-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:640px){ .agency-wrap{width:min(100% - 28px,1180px);} .values-grid,.info-grid{grid-template-columns:1fr;} .agency-hero{padding:78px 0 48px;} }
    </style>
@endpush

@section('content')
    <section class="agency-hero">
        <div class="agency-wrap hero-split">
            <div class="reveal">
                <div class="eyebrow">Tentang SIMONPR</div>
                <h1 class="hero-title">
                    <span>Sistem kecil,</span>
                    <span class="gradient-text">dampak besar.</span>
                </h1>
                <p class="hero-copy">
                    SIMONPR dibangun untuk membantu proses support pengadaan di Cabang Pekanbaru:
                    pekerjaan lebih transparan, dokumen lebih rapi, dan status PR/PPBJ lebih mudah ditelusuri.
                </p>
            </div>
            <div class="hero-card reveal">
                <div class="mini-row"><b>PR</b><span>Tracking proses dari masuk sampai selesai</span></div>
                <div class="mini-row"><b>SPPH</b><span>Nomor dan dokumen dibuat lebih cepat</span></div>
                <div class="mini-row"><b>API</b><span>Terhubung dengan sistem arsip digital</span></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="agency-wrap intro-grid">
            <div class="glass-card big-panel reveal">
                <div class="eyebrow">Cerita sistem</div>
                <h2>Dari pekerjaan manual menjadi alur digital yang bisa dipantau.</h2>
                <p>
                    Sebelumnya, status PR/PPBJ sering harus ditanyakan ulang lewat percakapan manual.
                    SIMONPR merapikan alur itu dalam satu sistem: input PR/TORPR, approval, data vendor,
                    SPPH, Surat Pesanan, kontrak, laporan, chat tim, chatbot, hingga integrasi arsip.
                </p>
            </div>
            <div class="info-grid">
                <div class="glass-card info-card reveal">
                    <div class="info-icon"><i class="fas fa-users-gear"></i></div>
                    <h3>Kolaborasi role</h3>
                    <p>Umum, Operasional, Super Admin, dan Viewer memiliki akses sesuai kebutuhan kerja.</p>
                </div>
                <div class="glass-card info-card reveal">
                    <div class="info-icon"><i class="fas fa-signature"></i></div>
                    <h3>Tanda tangan token</h3>
                    <p>Kabid/Kacab dapat mengisi atau menandatangani melalui token/QR sesuai alur operasional.</p>
                </div>
                <div class="glass-card info-card reveal">
                    <div class="info-icon"><i class="fas fa-comments"></i></div>
                    <h3>Komunikasi tim</h3>
                    <p>Chat tim membantu koordinasi lintas fungsi tanpa keluar dari konteks pekerjaan.</p>
                </div>
                <div class="glass-card info-card reveal">
                    <div class="info-icon"><i class="fas fa-box-archive"></i></div>
                    <h3>Arsip terhubung</h3>
                    <p>Dokumen PDF dan lokasi fisik arsip bisa dicek berdasarkan nomor PR/PPBJ.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="agency-wrap">
            <div class="big-panel reveal" style="padding-left:0">
                <div class="eyebrow">Nilai utama</div>
                <h2 style="max-width:800px">Bukan hanya aplikasi, tapi cara kerja baru.</h2>
            </div>
            <div class="values-grid">
                <div class="glass-card value-card reveal"><div class="value-no">01</div><h3>Transparan</h3><p>Status PR/PPBJ dapat dilihat tanpa harus bertanya berulang.</p></div>
                <div class="glass-card value-card reveal"><div class="value-no">02</div><h3>Efisien</h3><p>Data yang sama dipakai untuk dokumen, laporan, tracking, dan arsip.</p></div>
                <div class="glass-card value-card reveal"><div class="value-no">03</div><h3>Terukur</h3><p>Progress dan SLA proses support lebih mudah dibaca dari dashboard.</p></div>
                <div class="glass-card value-card reveal"><div class="value-no">04</div><h3>Terintegrasi</h3><p>SIMONPR dapat berkomunikasi dengan sistem arsip melalui API.</p></div>
                <div class="glass-card value-card reveal"><div class="value-no">05</div><h3>Ramah user</h3><p>Role viewer dapat melihat aktivitas tanpa risiko mengubah data.</p></div>
                <div class="glass-card value-card reveal"><div class="value-no">06</div><h3>Siap direplikasi</h3><p>Konsepnya bisa diterapkan pada cabang/unit lain dengan proses serupa.</p></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="agency-wrap">
            <div class="cta-panel reveal">
                <div>
                    <h2>Lihat prosesnya langsung.</h2>
                    <p>Cari nomor PR/PPBJ melalui halaman tracking publik atau masuk ke dashboard untuk mengelola pekerjaan.</p>
                </div>
                <div class="btn-row">
                    <a href="{{ route('landing.track') }}" class="btn-primary"><i class="fas fa-search"></i> Lacak PR</a>
                    <a href="{{ route('landing.services') }}" class="btn-soft"><i class="fas fa-layer-group"></i> Lihat Fitur</a>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script>
        (function () {
            var items = document.querySelectorAll('.reveal');
            var obs = new IntersectionObserver(function(entries){
                entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('show'); obs.unobserve(entry.target); }});
            }, {threshold:.12});
            items.forEach(function(item){ obs.observe(item); });
        })();
    </script>
@endpush
