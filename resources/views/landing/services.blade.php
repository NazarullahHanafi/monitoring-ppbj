@extends('layouts.landing')

@section('title', 'Fitur - SIMONPR')

@push('styles')
    <style>
        body, main.site-main {
            background:
                radial-gradient(circle at 14% 12%, rgba(34,211,238,.12), transparent 26rem),
                radial-gradient(circle at 82% 22%, rgba(129,140,248,.13), transparent 28rem),
                var(--bg) !important;
            font-family:'Montserrat',sans-serif;
        }
        [data-theme="light"] body,
        [data-theme="light"] main.site-main {
            background:
                radial-gradient(circle at 14% 12%, rgba(8,145,178,.10), transparent 26rem),
                radial-gradient(circle at 82% 22%, rgba(99,102,241,.10), transparent 28rem),
                #f8fbff !important;
        }
        .wrap { width:min(1180px,calc(100% - 48px)); margin:0 auto; position:relative; z-index:1; }
        .page-hero { position:relative; overflow:hidden; padding:108px 0 56px; }
        .page-hero::before {
            content:""; position:absolute; inset:0; opacity:.30;
            background:linear-gradient(90deg,var(--bg),rgba(8,13,26,.72),rgba(8,13,26,.50)), url('{{ asset('images/hero-building.jpg') }}') center right/cover no-repeat;
        }
        [data-theme="light"] .page-hero::before {
            opacity:.58;
            background:linear-gradient(90deg,rgba(248,251,255,.98),rgba(248,251,255,.78),rgba(248,251,255,.55)), url('{{ asset('images/hero-building.jpg') }}') center right/cover no-repeat;
        }
        .hero-grid { display:grid; grid-template-columns:minmax(0,1fr) 360px; gap:54px; align-items:end; }
        .eyebrow {
            display:inline-flex; align-items:center; gap:10px; width:fit-content; padding:9px 13px; border-radius:999px;
            border:1px solid rgba(34,211,238,.25); color:var(--cyan); background:rgba(34,211,238,.08);
            font-size:.75rem; font-weight:850; letter-spacing:.12em; text-transform:uppercase;
        }
        .eyebrow::before { content:""; width:8px; height:8px; border-radius:999px; background:#34d399; box-shadow:0 0 0 6px rgba(52,211,153,.14); }
        .hero-title { color:var(--text); font-size:clamp(3rem,7vw,6.2rem); line-height:.9; letter-spacing:-.08em; font-weight:900; margin:18px 0 20px; max-width:850px; }
        .gradient-text { background:linear-gradient(120deg,var(--cyan),var(--violet),#ec4899); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .hero-copy { color:var(--text-2); line-height:1.85; font-size:1.02rem; max-width:650px; }
        .hero-note {
            border:1px solid var(--border); border-radius:28px; padding:24px;
            background:rgba(255,255,255,.06); box-shadow:0 18px 44px rgba(0,0,0,.18);
        }
        [data-theme="light"] .hero-note, [data-theme="light"] .card, [data-theme="light"] .flow-panel, [data-theme="light"] .cta {
            background:rgba(255,255,255,.84); box-shadow:0 18px 44px rgba(15,23,42,.08);
        }
        .hero-note strong { display:block; color:var(--text); font-size:2.6rem; line-height:1; letter-spacing:-.07em; margin-bottom:8px; }
        .hero-note span { color:var(--text-2); line-height:1.65; font-weight:700; }
        .section { padding:74px 0; }
        .section-head { display:grid; grid-template-columns:minmax(0,.9fr) minmax(280px,.7fr); gap:34px; align-items:end; margin-bottom:30px; }
        .section-title { color:var(--text); font-size:clamp(2rem,4vw,3.6rem); line-height:.98; letter-spacing:-.065em; font-weight:900; margin:14px 0 0; }
        .section-copy { color:var(--text-2); line-height:1.85; }
        .feature-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; }
        .card, .flow-panel, .cta { border:1px solid var(--border); border-radius:28px; background:rgba(255,255,255,.06); box-shadow:0 18px 44px rgba(0,0,0,.18); }
        .card { min-height:285px; padding:26px; position:relative; overflow:hidden; transition:.22s ease; }
        .card:hover { transform:translateY(-6px); border-color:rgba(34,211,238,.28); }
        .no { color:var(--muted); font-size:.75rem; font-weight:900; letter-spacing:.12em; }
        .icon { width:54px; height:54px; border-radius:18px; display:grid; place-items:center; margin:18px 0 24px; color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); }
        .card:nth-child(2n) .icon { background:linear-gradient(135deg,#34d399,var(--cyan)); }
        .card:nth-child(3n) .icon { background:linear-gradient(135deg,#f59e0b,#ec4899); }
        .card h3 { color:var(--text); font-size:1.12rem; line-height:1.28; margin-bottom:12px; }
        .card p { color:var(--text-2); line-height:1.72; font-size:.91rem; }
        .flow-panel { padding:34px; }
        .flow-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:18px; }
        .flow-step { position:relative; padding-left:2px; }
        .flow-badge { width:58px; height:58px; border-radius:21px; display:grid; place-items:center; color:#fff; font-weight:900; background:linear-gradient(135deg,var(--cyan),var(--violet)); margin-bottom:16px; }
        .flow-step h3 { color:var(--text); font-size:1rem; margin-bottom:8px; }
        .flow-step p { color:var(--text-2); line-height:1.65; font-size:.84rem; }
        .cta { padding:36px; display:grid; grid-template-columns:1fr auto; gap:28px; align-items:center; background:linear-gradient(135deg,rgba(34,211,238,.18),rgba(129,140,248,.16)); }
        .cta h2 { color:var(--text); font-size:clamp(1.8rem,4vw,3.4rem); line-height:1; letter-spacing:-.06em; margin-bottom:10px; }
        .cta p { color:var(--text-2); line-height:1.75; }
        .btn-row { display:flex; flex-wrap:wrap; gap:12px; }
        .btn-primary,.btn-soft { min-height:48px; padding:0 22px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; gap:10px; font-weight:800; text-decoration:none; transition:.2s ease; }
        .btn-primary { color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); box-shadow:0 16px 34px rgba(99,102,241,.22); }
        .btn-soft { color:var(--text); border:1px solid var(--border); background:rgba(255,255,255,.06); }
        .btn-primary:hover,.btn-soft:hover { transform:translateY(-2px); }
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

        .page-hero::before {
            opacity: .92;
            background:
                linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.82) 48%, rgba(255,255,255,.48) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
        }

        [data-theme="dark"] .page-hero::before {
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
        .section-copy,
        .card p,
        .flow-step p,
        .cta p {
            line-height: 1.9;
            font-weight: 500;
        }

        .hero-note,
        .card,
        .flow-panel,
        .cta {
            border-radius: 0;
            background: #fff;
            border: 1px solid rgba(17,18,41,.10);
            box-shadow: 0 22px 60px rgba(17,18,41,.08);
        }

        [data-theme="dark"] .hero-note,
        [data-theme="dark"] .card,
        [data-theme="dark"] .flow-panel,
        [data-theme="dark"] .cta {
            background: #171a2f;
            border-color: rgba(255,255,255,.12);
        }

        .section-title,
        .cta h2 {
            letter-spacing: -.055em;
            font-size: clamp(2.25rem, 4.6vw, 4.8rem);
        }

        .icon,
        .card:nth-child(2n) .icon,
        .card:nth-child(3n) .icon,
        .flow-badge {
            border-radius: 0;
            background: #ff6b66;
        }

        .no {
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

        @media(max-width:980px){ .hero-grid,.section-head,.cta{grid-template-columns:1fr;} .feature-grid{grid-template-columns:1fr 1fr;} .flow-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:640px){ .wrap{width:min(100% - 28px,1180px);} .feature-grid,.flow-grid{grid-template-columns:1fr;} .page-hero{padding:78px 0 44px;} }
    </style>
@endpush

@section('content')
    <section class="page-hero">
        <div class="wrap hero-grid">
            <div class="reveal">
                <div class="eyebrow">Fitur SIMONPR</div>
                <h1 class="hero-title">Satu sistem untuk <span class="gradient-text">banyak proses.</span></h1>
                <p class="hero-copy">
                    SIMONPR menyatukan proses PR/PPBJ, approval, dokumen pengadaan, dashboard,
                    chat, chatbot, dan arsip agar pekerjaan support lebih cepat dan mudah dipantau.
                </p>
            </div>
            <div class="hero-note reveal">
                <strong>6+</strong>
                <span>modul kerja utama dalam satu alur digital yang saling terhubung.</span>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="wrap">
            <div class="section-head">
                <div class="reveal">
                    <div class="eyebrow">Modul utama</div>
                    <h2 class="section-title">Didesain mengikuti proses nyata di lapangan.</h2>
                </div>
                <p class="section-copy reveal">Setiap fitur dibuat untuk mengurangi input berulang, memperjelas status, dan membantu koordinasi antara Umum dan Operasional.</p>
            </div>

            <div class="feature-grid">
                <div class="card reveal"><div class="no">01 / TRACK</div><div class="icon"><i class="fas fa-route"></i></div><h3>Tracking PR/PPBJ</h3><p>Cari nomor PR/PPBJ dan lihat progress, timeline, status SLA, serta tanggal penting proses.</p></div>
                <div class="card reveal"><div class="no">02 / APPROVAL</div><div class="icon"><i class="fas fa-user-check"></i></div><h3>Approval PR</h3><p>Permintaan PR dari Operasional dapat diproses oleh Umum dengan status yang jelas.</p></div>
                <div class="card reveal"><div class="no">03 / DOCS</div><div class="icon"><i class="fas fa-file-signature"></i></div><h3>SPPH, SP, Kontrak</h3><p>Nomor otomatis, data vendor, item pekerjaan, dan dokumen dapat dibuat dari satu sumber data.</p></div>
                <div class="card reveal"><div class="no">04 / DASHBOARD</div><div class="icon"><i class="fas fa-chart-line"></i></div><h3>Dashboard & laporan</h3><p>Monitoring progress pengadaan, SLA, vendor, dan aktivitas bisa dibaca lebih cepat.</p></div>
                <div class="card reveal"><div class="no">05 / CHAT</div><div class="icon"><i class="fas fa-comments"></i></div><h3>Chat Tim & chatbot</h3><p>Koordinasi, mention, reaction, pencarian pesan, dan bantuan chatbot berada di sistem yang sama.</p></div>
                <div class="card reveal"><div class="no">06 / ARCHIVE</div><div class="icon"><i class="fas fa-box-archive"></i></div><h3>Integrasi arsip</h3><p>Cek PDF dokumen serta lokasi rak, tingkat, box, dan nomor fisik arsip berdasarkan nomor PR.</p></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="wrap">
            <div class="flow-panel reveal">
                <div class="flow-grid">
                    <div class="flow-step"><div class="flow-badge">1</div><h3>Input PR</h3><p>Operasional mengisi PR/TORPR dan data awal pengadaan.</p></div>
                    <div class="flow-step"><div class="flow-badge">2</div><h3>Approval</h3><p>Umum menerima, menolak, atau memproses PR dengan catatan yang jelas.</p></div>
                    <div class="flow-step"><div class="flow-badge">3</div><h3>Dokumen</h3><p>SPPH, Surat Pesanan, kontrak, dan laporan dibuat dari data yang sama.</p></div>
                    <div class="flow-step"><div class="flow-badge">4</div><h3>Tracking & arsip</h3><p>Status proses dan arsip fisik/digital dapat dicek kembali kapan saja.</p></div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="wrap">
            <div class="cta reveal">
                <div>
                    <h2>Coba tracking sekarang.</h2>
                    <p>Masukkan nomor PR/PPBJ untuk melihat bagaimana SIMONPR menampilkan informasi proses.</p>
                </div>
                <div class="btn-row">
                    <a href="{{ route('landing.track') }}" class="btn-primary"><i class="fas fa-search"></i> Lacak PR</a>
                    <a href="{{ route('landing.contact') }}" class="btn-soft"><i class="fas fa-envelope"></i> Kontak</a>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script>
        (function(){
            var items=document.querySelectorAll('.reveal');
            var obs=new IntersectionObserver(function(entries){
                entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('show'); obs.unobserve(entry.target); }});
            },{threshold:.12});
            items.forEach(function(item){ obs.observe(item); });
        })();
    </script>
@endpush
