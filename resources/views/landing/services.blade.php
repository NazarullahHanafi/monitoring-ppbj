@extends('layouts.landing')

@section('title', 'Services - PPBJ Management System')

@push('styles')
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

<style>
:root { --r: 16px; --green: #34d399; --amber: #fbbf24; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--bg) !important; }
body {
    background: var(--bg) !important; color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden; -webkit-font-smoothing: antialiased;
}
/* Kill any layout wrapper backgrounds */
main, #main, .main-content, [role="main"],
.layout-content, .page-content, .container-fluid,

h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }

.dot-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 28px 28px;
}
.wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

/* REVEAL */
.sr { opacity:0; transform:translateY(20px); transition: opacity .55s ease, transform .55s ease; }
.sr.d1{transition-delay:.08s;} .sr.d2{transition-delay:.16s;}
.sr.d3{transition-delay:.24s;} .sr.d4{transition-delay:.32s;}
.sr.show { opacity:1; transform:none; }

/* HERO BANNER */
.page-hero {
    position: relative; overflow: hidden;
    padding: 120px 0 80px; text-align: center;
}
.page-hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image: url('{{ asset("images/download.jpg") }}');
    background-size: cover; background-position: center 30%;
}
.page-hero-bg::after {
    content:''; position: absolute; inset: 0;
    background: linear-gradient(180deg,
        rgba(8,13,26,.88) 0%,
        rgba(8,13,26,.75) 50%,
        rgba(8,13,26,.95) 100%);
}
.page-hero-inner { position: relative; z-index: 1; }
.page-tag {
    display: inline-block; font-size:.72rem; font-weight:700;
    letter-spacing:.18em; text-transform:uppercase; color:var(--cyan); margin-bottom:16px;
}
.page-hero h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight:800;
    line-height:1.1; letter-spacing:-.03em; margin-bottom:16px;
}
.grad { background:linear-gradient(130deg,var(--cyan),var(--violet)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.page-hero p { color:rgba(226,232,240,.65); font-size:1.05rem; max-width:480px; margin:0 auto; line-height:1.75; }

/* SHARED */
.sec { padding: 88px 0; }
.sec.surface { background: var(--surface); }
.sec-label { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--cyan); margin-bottom:10px; }
.sec-title { font-size:clamp(1.7rem,2.8vw,2.5rem); font-weight:800; letter-spacing:-.025em; line-height:1.15; margin-bottom:14px; }
.sec-sub { color:var(--muted); font-size:.97rem; line-height:1.75; }

/* SERVICE GRID */
.svc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }

.svc-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 32px 26px; position: relative;
    overflow: hidden;
    transition: border-color .25s, transform .25s, box-shadow .25s;
}
.svc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,.3);
}
/* Top accent bar */
.svc-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    transition: opacity .25s;
}
.svc-card:hover::before { opacity: 1; }
.svc-card.c1::before { background:linear-gradient(90deg,var(--cyan),var(--violet)); }
.svc-card.c2::before { background:linear-gradient(90deg,var(--violet),var(--indigo)); }
.svc-card.c3::before { background:linear-gradient(90deg,var(--green),var(--cyan)); }
.svc-card.c4::before { background:linear-gradient(90deg,var(--amber),#f97316); }
.svc-card.c5::before { background:linear-gradient(90deg,var(--rose),#f97316); }
.svc-card.c6::before { background:linear-gradient(90deg,var(--indigo),var(--violet)); }

/* Hover: border color per card */
.svc-card.c1:hover { border-color:rgba(34,211,238,.25); }
.svc-card.c2:hover { border-color:rgba(129,140,248,.25); }
.svc-card.c3:hover { border-color:rgba(52,211,153,.25); }
.svc-card.c4:hover { border-color:rgba(251,191,36,.25); }
.svc-card.c5:hover { border-color:rgba(248,113,113,.25); }
.svc-card.c6:hover { border-color:rgba(167,139,250,.25); }

.svc-num { font-size:.68rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:20px; }
.svc-ic { width:50px; height:50px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-bottom:22px; }
.i1{background:rgba(34,211,238,.1);  color:var(--cyan);}
.i2{background:rgba(129,140,248,.1); color:var(--violet);}
.i3{background:rgba(52,211,153,.1);  color:var(--green);}
.i4{background:rgba(251,191,36,.1);  color:var(--amber);}
.i5{background:rgba(248,113,113,.1); color:var(--rose);}
.i6{background:rgba(167,139,250,.1); color:var(--indigo);}

.svc-card h3 { font-size:1.05rem; font-weight:700; margin-bottom:10px; }
.svc-card > p { color:var(--muted); font-size:.88rem; line-height:1.65; margin-bottom:20px; }

.svc-list { list-style:none; display:flex; flex-direction:column; gap:7px; }
.svc-list li {
    display:flex; align-items:center; gap:9px;
    font-size:.82rem; color:var(--muted);
}
.svc-list li::before {
    content:''; width:5px; height:5px; border-radius:50%;
    flex-shrink:0;
}
.c1 .svc-list li::before { background:var(--cyan); }
.c2 .svc-list li::before { background:var(--violet); }
.c3 .svc-list li::before { background:var(--green); }
.c4 .svc-list li::before { background:var(--amber); }
.c5 .svc-list li::before { background:var(--rose); }
.c6 .svc-list li::before { background:var(--indigo); }

/* WORKFLOW SECTION */
.flow-wrap { position:relative; }
.flow-line {
    position:absolute; top:24px; left:calc(24px + (100% - 48px) / 8);
    right:calc(24px + (100% - 48px) / 8);
    height:1px; background:linear-gradient(90deg,var(--cyan),var(--violet),var(--green));
    z-index:0;
}
.flow-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; position:relative; z-index:1; }
.flow-step { text-align:center; padding: 0 8px; }
.flow-dot {
    width:48px; height:48px; border-radius:50%; margin:0 auto 16px;
    display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-size:.85rem; font-weight:800;
    border:2px solid; position:relative; background:var(--bg);
    transition: background .25s, color .25s;
}
.flow-step:hover .flow-dot { color:var(--bg) !important; }
.fd1{border-color:var(--cyan); color:var(--cyan);}    .flow-step:hover .fd1{background:var(--cyan);}
.fd2{border-color:var(--violet);color:var(--violet);}  .flow-step:hover .fd2{background:var(--violet);}
.fd3{border-color:var(--green); color:var(--green);}   .flow-step:hover .fd3{background:var(--green);}
.fd4{border-color:#f472b6;      color:#f472b6;}         .flow-step:hover .fd4{background:#f472b6;}
.flow-step h4 { font-size:.92rem; font-weight:700; margin-bottom:6px; }
.flow-step p  { color:var(--muted); font-size:.8rem; line-height:1.55; }

/* CTA STRIP */
.cta-strip {
    background:var(--card); border:1px solid var(--border);
    border-radius:22px; padding:56px 40px; text-align:center; position:relative; overflow:hidden;
}
.cta-strip::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:
        radial-gradient(ellipse 50% 60% at 0% 50%, rgba(34,211,238,.05) 0%, transparent 70%),
        radial-gradient(ellipse 50% 60% at 100% 50%, rgba(129,140,248,.05) 0%, transparent 70%);
}
.cta-strip::after {
    content:''; position:absolute; top:0; left:15%; right:15%; height:1px;
    background:linear-gradient(90deg,transparent,var(--cyan),var(--violet),transparent);
}
.cta-strip h2 { font-size:clamp(1.6rem,2.5vw,2.2rem); font-weight:800; letter-spacing:-.025em; margin-bottom:12px; }
.cta-strip p  { color:var(--muted); font-size:.97rem; max-width:460px; margin:0 auto 32px; line-height:1.7; }
.btn-row { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
.btn-p {
    display:inline-flex; align-items:center; gap:9px; padding:13px 26px;
    border-radius:12px; font-weight:600; font-size:.93rem; text-decoration:none; color:#fff;
    background:linear-gradient(130deg,var(--cyan),var(--violet));
    transition:opacity .2s, transform .2s;
}
.btn-p:hover { opacity:.88; transform:translateY(-2px); }
.btn-g {
    display:inline-flex; align-items:center; gap:9px; padding:13px 26px;
    border-radius:12px; font-weight:600; font-size:.93rem; text-decoration:none;
    color:var(--cyan); background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.35);
    transition:background .2s, border-color .2s, transform .2s;
}
.btn-g:hover { background:rgba(34,211,238,.15); border-color:rgba(34,211,238,.6); transform:translateY(-2px); }

/* RESPONSIVE */
@media(max-width:960px) { .svc-grid{grid-template-columns:repeat(2,1fr);} .flow-grid{grid-template-columns:repeat(2,1fr);} .flow-line{display:none;} }
@media(max-width:600px) { .svc-grid{grid-template-columns:1fr;} .flow-grid{grid-template-columns:1fr;} .cta-strip{padding:40px 22px;} }


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

{{-- HERO --}}
<section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="wrap page-hero-inner">
        <div class="page-tag sr">Layanan Platform</div>
        <h1 class="sr d1">Fitur &amp; <span class="grad">Layanan</span></h1>
        <p class="sr d2">Solusi lengkap untuk mengelola seluruh siklus pengadaan barang dan jasa PT Pekanbaru secara digital.</p>
    </div>
</section>

{{-- SERVICE CARDS --}}
<section class="sec">
    <div class="wrap">
        <div class="text-center" style="margin-bottom:52px">
            <div class="sec-label sr">Apa yang Kami Tawarkan</div>
            <h2 class="sec-title sr d1">Layanan Lengkap PPBJ</h2>
            <p class="sec-sub sr d2" style="max-width:500px;margin:0 auto">Setiap modul dirancang untuk menjawab tantangan nyata dalam proses pengadaan.</p>
        </div>

        <div class="svc-grid">
            <div class="svc-card c1 sr">
                <div class="svc-num">— 01</div>
                <div class="svc-ic i1"><i class="fas fa-file-alt"></i></div>
                <h3>TOR Management</h3>
                <p>Kelola Terms of Reference dengan workflow approval terstruktur, version control, dan histori lengkap.</p>
                <ul class="svc-list">
                    <li>Digital approval workflow</li>
                    <li>Version control otomatis</li>
                    <li>Audit trail lengkap</li>
                </ul>
            </div>

            <div class="svc-card c2 sr d1">
                <div class="svc-num">— 02</div>
                <div class="svc-ic i2"><i class="fas fa-receipt"></i></div>
                <h3>PR Processing</h3>
                <p>Proses Purchase Request otomatis dengan routing approval cerdas dan notifikasi real-time di setiap tahap.</p>
                <ul class="svc-list">
                    <li>Automated workflow routing</li>
                    <li>Real-time status tracking</li>
                    <li>Notifikasi email & sistem</li>
                </ul>
            </div>

            <div class="svc-card c3 sr d2">
                <div class="svc-num">— 03</div>
                <div class="svc-ic i3"><i class="fas fa-chart-line"></i></div>
                <h3>PPBJ Monitoring</h3>
                <p>Monitor seluruh progres PPBJ dengan dashboard analytics interaktif dan SLA tracking per tahap.</p>
                <ul class="svc-list">
                    <li>Dashboard analytics interaktif</li>
                    <li>SLA monitoring otomatis</li>
                    <li>Progress tracking visual</li>
                </ul>
            </div>

            <div class="svc-card c4 sr">
                <div class="svc-num">— 04</div>
                <div class="svc-ic i4"><i class="fas fa-bell"></i></div>
                <h3>Smart Notifications</h3>
                <p>Notifikasi otomatis untuk setiap update penting — dari persetujuan hingga peringatan deadline.</p>
                <ul class="svc-list">
                    <li>Email alerts otomatis</li>
                    <li>Deadline reminders</li>
                    <li>Status update real-time</li>
                </ul>
            </div>

            <div class="svc-card c5 sr d1">
                <div class="svc-num">— 05</div>
                <div class="svc-ic i5"><i class="fas fa-file-export"></i></div>
                <h3>Reporting &amp; Export</h3>
                <p>Generate laporan komprehensif dan ekspor data dalam berbagai format sesuai kebutuhan pelaporan.</p>
                <ul class="svc-list">
                    <li>Export Excel &amp; PDF</li>
                    <li>Laporan custom per periode</li>
                    <li>Filter &amp; segmentasi data</li>
                </ul>
            </div>

            <div class="svc-card c6 sr d2">
                <div class="svc-num">— 06</div>
                <div class="svc-ic i6"><i class="fas fa-users-cog"></i></div>
                <h3>User Management</h3>
                <p>Kelola pengguna, role, dan hak akses dengan sistem otorisasi berbasis departemen yang fleksibel.</p>
                <ul class="svc-list">
                    <li>Role-based access control</li>
                    <li>Department segregation</li>
                    <li>Activity & access logs</li>
                </ul>
            </div>
        </div>
    </div>
</section>

{{-- WORKFLOW --}}
<section class="sec surface">
    <div class="wrap">
        <div class="text-center" style="margin-bottom:52px">
            <div class="sec-label sr">Alur Kerja</div>
            <h2 class="sec-title sr d1">Proses Pengadaan<br>dari Awal hingga Selesai</h2>
        </div>
        <div class="flow-wrap sr d2">
            <div class="flow-line"></div>
            <div class="flow-grid">
                <div class="flow-step">
                    <div class="flow-dot fd1">01</div>
                    <h4>Buat TOR</h4>
                    <p>Pemohon mengisi template TOR dan mengajukan kebutuhan pengadaan.</p>
                </div>
                <div class="flow-step">
                    <div class="flow-dot fd2">02</div>
                    <h4>Submit PR</h4>
                    <p>Purchase Request diteruskan ke jalur approval sesuai nilai dan kategori.</p>
                </div>
                <div class="flow-step">
                    <div class="flow-dot fd3">03</div>
                    <h4>Proses PPBJ</h4>
                    <p>Tim PPBJ menjalankan proses dengan monitoring SLA di setiap milestone.</p>
                </div>
                <div class="flow-step">
                    <div class="flow-dot fd4">04</div>
                    <h4>Penyelesaian</h4>
                    <p>Kontrak selesai, laporan tersimpan otomatis dan siap untuk audit.</p>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="sec">
    <div class="wrap">
        <div class="cta-strip sr">
            <h2>Siap Menggunakan Sistem?</h2>
            <p>Lacak status PR Anda atau masuk ke dashboard untuk memulai pengelolaan pengadaan yang lebih efisien.</p>
            <div class="btn-row">
                <a href="{{ route('landing.track') }}" class="btn-p">
                    <i class="fas fa-search"></i> Lacak PR Sekarang
                </a>
                <a href="{{ route('landing.contact') }}" class="btn-g">
                    <i class="fas fa-envelope"></i> Hubungi Kami
                </a>
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
    },{ threshold:0.1 });
    document.querySelectorAll('.sr').forEach(function(el){ io.observe(el); });
})();
</script>
@endpush