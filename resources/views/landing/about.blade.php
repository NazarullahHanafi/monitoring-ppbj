@extends('layouts.landing')

@section('title', 'About - PPBJ Management System')

@push('styles')
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<style>
:root { --r: 16px; --green: #34d399; --amber: #fbbf24; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--bg) !important; }
body {
    background: var(--bg) !important; color: var(--text);
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden; -webkit-font-smoothing: antialiased;
}
/* Kill any layout wrapper backgrounds */
main, #main, .main-content, [role="main"],
.layout-content, .page-content, .container-fluid,

h1,h2,h3,h4 { font-family: 'Montserrat', sans-serif; }

.dot-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 28px 28px;
}
.wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

/* REVEAL */
.sr { opacity:0; transform:translateY(20px); transition: opacity .55s ease, transform .55s ease; }
.sr.d1{transition-delay:.08s;} .sr.d2{transition-delay:.16s;} .sr.d3{transition-delay:.24s;}
.sr.show { opacity:1; transform:none; }

/* HERO BANNER */
.about-hero {
    position: relative; overflow: hidden;
    padding: 120px 0 80px; text-align: center;
}
.about-hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image: url('{{ asset("images/hero-building.jpg") }}');
    background-size: cover; background-position: center 30%;
}
.about-hero-bg::after {
    content:''; position: absolute; inset: 0;
    background:
        linear-gradient(180deg, rgba(8,13,26,.88) 0%, rgba(8,13,26,.75) 50%, rgba(8,13,26,.95) 100%);
}
.about-hero-inner { position: relative; z-index: 1; }
.page-tag {
    display: inline-block; font-size:.72rem; font-weight:700;
    letter-spacing:.18em; text-transform:uppercase; color:var(--cyan);
    margin-bottom:16px;
}
.about-hero h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight:800;
    line-height:1.1; letter-spacing:-.03em; margin-bottom:16px;
}
.grad { background:linear-gradient(130deg,var(--cyan),var(--violet)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.about-hero p { color:rgba(226,232,240,.65); font-size:1.05rem; max-width:480px; margin:0 auto; line-height:1.75; }

/* SHARED SECTION */
.sec { padding: 88px 0; }
.sec.surface { background: var(--surface); }
.sec-label { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--cyan); margin-bottom:10px; }
.sec-title { font-size:clamp(1.7rem,2.8vw,2.5rem); font-weight:800; letter-spacing:-.025em; line-height:1.15; margin-bottom:14px; }
.sec-sub { color:var(--muted); font-size:.97rem; line-height:1.75; }

/* WHO WE ARE */
.who-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
.who-text p { color:var(--muted); font-size:.97rem; line-height:1.8; margin-bottom:16px; }
.who-text p:last-child { margin-bottom:0; }

.trust-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 28px; position: relative;
}
.trust-card::before {
    content:''; position:absolute; top:0; left:12%; right:12%; height:1px;
    background:linear-gradient(90deg,transparent,var(--cyan),transparent);
}
.trust-item { display:flex; align-items:center; gap:14px; padding:13px 0; border-bottom:1px solid var(--border); }
.trust-item:last-child { border-bottom:none; padding-bottom:0; }
.trust-item:first-child { padding-top:0; }
.t-ic { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:.9rem; flex-shrink:0; }
.tc{background:rgba(34,211,238,.12);color:var(--cyan);}
.tv{background:rgba(129,140,248,.12);color:var(--violet);}
.tg{background:rgba(52,211,153,.12);color:var(--green);}
.t-name { font-size:.92rem; font-weight:700; margin-bottom:2px; }
.t-desc { font-size:.77rem; color:var(--muted); }

/* VISI MISI */
.vm-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.vm-card {
    background:var(--card); border:1px solid var(--border);
    border-radius:var(--r); padding:32px; position:relative; overflow:hidden;
    transition: border-color .25s, transform .25s;
}
.vm-card:hover { border-color:rgba(34,211,238,.2); transform:translateY(-3px); }
.vm-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
}
.vm-card.visi::before  { background:linear-gradient(90deg,var(--cyan),var(--violet)); }
.vm-card.misi::before  { background:linear-gradient(90deg,var(--violet),var(--green)); }
.vm-card h4 { font-size:1rem; font-weight:800; letter-spacing:.04em; text-transform:uppercase; margin-bottom:14px; }
.vm-card.visi h4 { color:var(--cyan); }
.vm-card.misi h4 { color:var(--violet); }
.vm-card p { color:var(--muted); font-size:.9rem; line-height:1.75; }
.misi-list { list-style:none; }
.misi-list li { display:flex; align-items:flex-start; gap:10px; color:var(--muted); font-size:.9rem; line-height:1.6; margin-bottom:10px; }
.misi-list li:last-child { margin-bottom:0; }
.misi-list li::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--violet); margin-top:7px; flex-shrink:0; }

/* VALUES */
.val-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.val-card {
    background:var(--card); border:1px solid var(--border);
    border-radius:var(--r); padding:28px 22px; text-align:center;
    transition:border-color .25s, transform .25s;
}
.val-card:hover { border-color:rgba(34,211,238,.18); transform:translateY(-4px); }
.val-n { font-size:.68rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
.val-ic { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; margin:0 auto 18px; }
.vi-c{background:rgba(34,211,238,.1);color:var(--cyan);}
.vi-v{background:rgba(129,140,248,.1);color:var(--violet);}
.vi-g{background:rgba(52,211,153,.1);color:var(--green);}
.vi-p{background:rgba(244,114,182,.1);color:#f472b6;}
.vi-o{background:rgba(251,146,60,.1);color:#fb923c;}
.vi-i{background:rgba(34,211,238,.1);color:var(--cyan);}
.val-card h3 { font-size:.97rem; font-weight:700; margin-bottom:8px; }
.val-card p  { color:var(--muted); font-size:.83rem; line-height:1.6; }

/* STATS ROW */
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--border); border-radius:var(--r); overflow:hidden; }
.st { padding:36px 20px; text-align:center; border-right:1px solid var(--border); transition:background .2s; }
.st:last-child{border-right:none;}
.st:hover{background:var(--surface);}
.st-n { font-family:'Montserrat',sans-serif; font-size:clamp(2rem,3vw,2.8rem); font-weight:800; line-height:1; margin-bottom:8px; }
.cn{color:var(--cyan);}.cv{color:var(--violet);}.cg{color:var(--green);}.cp{color:#f472b6;}
.st p { color:var(--muted); font-size:.8rem; }

/* RESPONSIVE */
@media(max-width:900px){ .val-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:768px){
    .who-grid{grid-template-columns:1fr; gap:32px;}
    .vm-grid{grid-template-columns:1fr;}
    .stats-row{grid-template-columns:repeat(2,1fr);}
    .st{border-bottom:1px solid var(--border);}
}
@media(max-width:480px){ .val-grid{grid-template-columns:1fr;} }


.page-shell { background: var(--bg); min-height: 100vh; position: relative; z-index: 1; }

/* ── Mobile button fix ── */
@media(max-width:600px){
    .btn-row { flex-direction:row !important; flex-wrap:wrap; gap:10px; }
    .btn-p, .btn-g, .btn-submit {
        flex: 0 0 auto; width: auto !important;
        padding: 12px 20px; font-size: .88rem;
    }
    .cta-strip .btn-row, .cta-b .btn-row { justify-content: center; }
}

/* ── Kill white backgrounds only — DO NOT touch padding ── */
/* Only force dark bg, never override padding (that breaks navbar offset) */
main, #main, #app, .main-content, .content-wrapper { background: var(--bg) !important; }
.page-shell { background: var(--bg); }

/* ══ LIGHT MODE overrides (token-based) ══ */
[data-theme="light"] .page-shell,
[data-theme="light"] main,
[data-theme="light"] section { background: var(--bg) !important; }
[data-theme="light"] .page-hero-bg::after,
[data-theme="light"] .about-hero-bg::after {
    background: linear-gradient(180deg,
        rgba(255,255,255,.88) 0%,
        rgba(255,255,255,.80) 55%,
        rgba(255,255,255,1) 100%) !important;
}
[data-theme="light"] .hero-bg::after {
    background: linear-gradient(135deg,
        rgba(255,255,255,.92) 0%,
        rgba(255,255,255,.78) 60%,
        rgba(248,250,252,.92) 100%) !important;
}
[data-theme="light"] .search-card,
[data-theme="light"] .pr-card,
[data-theme="light"] .tl-card,
[data-theme="light"] .fc,
[data-theme="light"] .hv,
[data-theme="light"] .ms,
[data-theme="light"] .fi,
[data-theme="light"] .how-card,
[data-theme="light"] .sc-card,
[data-theme="light"] .val-card,
[data-theme="light"] .wf-card,
[data-theme="light"] .contact-info-card,
[data-theme="light"] .contact-form-card,
[data-theme="light"] .not-found {
    background: var(--card) !important;
    border-color: var(--border) !important;
    box-shadow: 0 4px 24px var(--shadow);
}
[data-theme="light"] .search-input,
[data-theme="light"] .form-input,
[data-theme="light"] .form-textarea {
    background: rgba(0,0,0,.04) !important;
    border-color: var(--border) !important;
    color: var(--text) !important;
}
[data-theme="light"] .tl-body-inner { background: rgba(0,0,0,.025) !important; }
[data-theme="light"] .pr-field { background: rgba(0,0,0,.03) !important; border-color: var(--border) !important; }
[data-theme="light"] .prog-step { background: rgba(0,0,0,.02) !important; }
[data-theme="light"] .cta-b { background: var(--card) !important; }
[data-theme="light"] .sg { background: transparent !important; }
[data-theme="light"] .features,
[data-theme="light"] .how-section,
[data-theme="light"] .stats-s,
[data-theme="light"] .about-vals,
[data-theme="light"] .about-vm { background: var(--surface) !important; }
[data-theme="light"] .hero-card { background: rgba(255,255,255,.9) !important; backdrop-filter: blur(16px); }
[data-theme="light"] .modal-box,
[data-theme="light"] #suggestBox { background: var(--card) !important; }
[data-theme="light"] .suggest-row { color: var(--text) !important; }
[data-theme="light"] .suggest-row:hover { background: rgba(0,0,0,.04) !important; }
[data-theme="light"] .dot-bg { opacity: 0.6; }
[data-theme="light"] .sec-label,
[data-theme="light"] .page-tag { color: var(--cyan) !important; }
[data-theme="light"] h1, [data-theme="light"] h2,
[data-theme="light"] h3, [data-theme="light"] h4 { color: var(--text) !important; }
[data-theme="light"] p, [data-theme="light"] li { color: var(--text-2) !important; }
[data-theme="light"] .hero-title,
[data-theme="light"] .page-hero h1 { color: var(--text) !important; }
[data-theme="light"] .hero-sub,
[data-theme="light"] .page-hero p { color: var(--text-2) !important; }
[data-theme="light"] .ms-l,
[data-theme="light"] .fi-desc,
[data-theme="light"] .fc p,
[data-theme="light"] .tl-desc,
[data-theme="light"] .pr-num-label,
[data-theme="light"] .pr-field-label,
[data-theme="light"] .tl-time-val { color: var(--muted) !important; }
[data-theme="light"] .pr-num,
[data-theme="light"] .fi-name,
[data-theme="light"] .fc h3,
[data-theme="light"] .tl-title,
[data-theme="light"] .pr-field-val { color: var(--text) !important; }
[data-theme="light"] .nav-link { color: var(--text-2) !important; }
[data-theme="light"] .nav-link:hover,
[data-theme="light"] .nav-link.active { color: var(--cyan) !important; }
[data-theme="light"] .grad {
    background: linear-gradient(130deg, var(--cyan), var(--violet)) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
}

[data-theme="light"] .ms-n { -webkit-text-fill-color: var(--cyan) !important; background: none !important; color: var(--cyan) !important; }

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:rgba(34,211,238,.2);border-radius:5px;}
</style>
@endpush

@section('content')
<div class="dot-bg"></div>
<div class="page-shell">

{{-- ── HERO BANNER ── --}}
<section class="about-hero">
    <div class="about-hero-bg"></div>
    <div class="wrap about-hero-inner">
        <div class="page-tag sr">Cabang Pekanbaru</div>
        <h1 class="sr d1">Tentang <span class="grad">Sistem PPBJ</span></h1>
        <p class="sr d2">Mengenal lebih dekat platform pengadaan barang dan jasa PT Pekanbaru yang modern, transparan, dan akuntabel.</p>
    </div>
</section>

{{-- ── STATS ── --}}
<section class="sec" style="background:var(--surface); padding:56px 0;">
    <div class="wrap">
        <div class="stats-row sr">
            <div class="st"><div class="st-n cn">500+</div><p>PR Diproses</p></div>
            <div class="st"><div class="st-n cv">98%</div><p>On-time Delivery</p></div>
            <div class="st"><div class="st-n cg">24/7</div><p>System Uptime</p></div>
            <div class="st"><div class="st-n cp">100%</div><p>Compliant</p></div>
        </div>
    </div>
</section>

{{-- ── SIAPA KAMI ── --}}
<section class="sec">
    <div class="wrap">
        <div class="who-grid">
            <div class="who-text">
                <div class="sec-label sr">Tentang Kami</div>
                <h2 class="sec-title sr d1">Siapa Kami?</h2>
                <p class="sr d2">
                    SIMON PR adalah sistem informasi monitoring pengadaan barang dan jasa (PPBJ) yang dirancang khusus untuk PT Pekanbaru guna meningkatkan efisiensi dan transparansi proses procurement.
                </p>
                <p class="sr d3">
                    Dengan antarmuka modern dan alur kerja terstruktur, platform ini menghubungkan seluruh pihak terkait — dari pemohon, tim PPBJ, hingga manajemen — dalam satu ekosistem digital yang terintegrasi.
                </p>
            </div>

            <div class="sr d2">
                <div class="trust-card">
                    <div class="trust-item">
                        <div class="t-ic tc"><i class="fas fa-award"></i></div>
                        <div><div class="t-name">Trusted Platform</div><div class="t-desc">Digunakan seluruh unit Pekanbaru</div></div>
                    </div>
                    <div class="trust-item">
                        <div class="t-ic tv"><i class="fas fa-shield-alt"></i></div>
                        <div><div class="t-name">Secure & Reliable</div><div class="t-desc">Data terenkripsi dan tersimpan aman</div></div>
                    </div>
                    <div class="trust-item">
                        <div class="t-ic tg"><i class="fas fa-headset"></i></div>
                        <div><div class="t-name">24/7 Support</div><div class="t-desc">Tim siap membantu kapan saja</div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- ── VISI MISI ── --}}
<section class="sec surface">
    <div class="wrap">
        <div class="text-center" style="margin-bottom:48px">
            <div class="sec-label sr">Arah & Tujuan</div>
            <h2 class="sec-title sr d1">Visi &amp; Misi</h2>
        </div>
        <div class="vm-grid">
            <div class="vm-card visi sr">
                <h4>Visi</h4>
                <p>Menjadi platform procurement digital terdepan di lingkungan PT Pekanbaru yang mendorong efisiensi, transparansi, dan akuntabilitas penuh dalam setiap siklus pengadaan barang dan jasa.</p>
            </div>
            <div class="vm-card misi sr d1">
                <h4>Misi</h4>
                <ul class="misi-list">
                    <li>Mempercepat dan menyederhanakan proses pengadaan end-to-end</li>
                    <li>Memberikan visibilitas real-time kepada seluruh pemangku kepentingan</li>
                    <li>Memastikan kepatuhan terhadap regulasi dan kebijakan internal</li>
                    <li>Mengintegrasikan monitoring SLA untuk menjamin ketepatan waktu</li>
                </ul>
            </div>
        </div>
    </div>
</section>

{{-- ── VALUES ── --}}
<section class="sec">
    <div class="wrap">
        <div class="text-center" style="margin-bottom:48px">
            <div class="sec-label sr">Prinsip Kami</div>
            <h2 class="sec-title sr d1">Nilai &amp; Komitmen</h2>
            <p class="sec-sub sr d2" style="max-width:480px;margin:0 auto">Setiap fitur dan keputusan desain didasari oleh prinsip-prinsip berikut.</p>
        </div>
        <div class="val-grid">
            <div class="val-card sr">
                <div class="val-n">— 01</div>
                <div class="val-ic vi-c"><i class="fas fa-eye"></i></div>
                <h3>Transparansi</h3>
                <p>Setiap tahap pengadaan terdokumentasi dan dapat diakses oleh pihak yang berwenang secara real-time.</p>
            </div>
            <div class="val-card sr d1">
                <div class="val-n">— 02</div>
                <div class="val-ic vi-v"><i class="fas fa-tachometer-alt"></i></div>
                <h3>Efisiensi</h3>
                <p>Otomatisasi alur persetujuan dan notifikasi mengurangi waktu proses secara signifikan.</p>
            </div>
            <div class="val-card sr d2">
                <div class="val-n">— 03</div>
                <div class="val-ic vi-g"><i class="fas fa-balance-scale"></i></div>
                <h3>Akuntabilitas</h3>
                <p>Setiap tindakan tercatat dalam audit trail lengkap untuk keperluan pelaporan dan kepatuhan.</p>
            </div>
            <div class="val-card sr">
                <div class="val-n">— 04</div>
                <div class="val-ic vi-p"><i class="fas fa-lock"></i></div>
                <h3>Keamanan</h3>
                <p>Data dilindungi dengan enkripsi standar industri dan kontrol akses berbasis peran.</p>
            </div>
            <div class="val-card sr d1">
                <div class="val-n">— 05</div>
                <div class="val-ic vi-o"><i class="fas fa-clock"></i></div>
                <h3>Ketepatan Waktu</h3>
                <p>SLA monitoring otomatis memastikan setiap permintaan diproses sesuai batas waktu yang ditetapkan.</p>
            </div>
            <div class="val-card sr d2">
                <div class="val-n">— 06</div>
                <div class="val-ic vi-i"><i class="fas fa-sync-alt"></i></div>
                <h3>Integrasi</h3>
                <p>Sistem terhubung antar departemen sehingga alur informasi berjalan mulus tanpa hambatan.</p>
            </div>
        </div>
    </div>
</section>

</div>{{-- end .page-shell --}}

@endsection

@push('scripts')
<script>
(function(){
    var io = new IntersectionObserver(function(e){
        e.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('show'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sr').forEach(function(el){ io.observe(el); });
})();
</script>
@endpush
