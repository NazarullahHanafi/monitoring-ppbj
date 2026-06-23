@extends('layouts.landing')

@section('title', 'Contact - PPBJ Management System')

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
.sr.d1{transition-delay:.08s;} .sr.d2{transition-delay:.16s;}
.sr.d3{transition-delay:.24s;} .sr.d4{transition-delay:.32s;}
.sr.show { opacity:1; transform:none; }

/* HERO */
.page-hero {
    position: relative; overflow: hidden;
    padding: 120px 0 80px; text-align: center;
}
.page-hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image: url('{{ asset("images/hero-building.jpg") }}');
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
    font-size: clamp(2.4rem,5vw,3.8rem); font-weight:800;
    line-height:1.1; letter-spacing:-.03em; margin-bottom:16px;
}
.grad { background:linear-gradient(130deg,var(--cyan),var(--violet)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.page-hero p { color:rgba(226,232,240,.65); font-size:1.05rem; max-width:480px; margin:0 auto; line-height:1.75; }

/* CONTACT SECTION */
.contact-sec { padding: 88px 0; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; align-items: start; }

/* INFO SIDE */
.info-head { margin-bottom: 36px; }
.sec-label { font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--cyan); margin-bottom:10px; }
.sec-title { font-size:clamp(1.7rem,2.8vw,2.4rem); font-weight:800; letter-spacing:-.025em; line-height:1.15; }

.info-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 18px 0; border-bottom: 1px solid var(--border);
}
.info-item:first-child { padding-top: 0; }
.info-item:last-child  { border-bottom: none; padding-bottom: 0; }
.ii-ic {
    width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: .9rem;
    margin-top: 2px;
}
.ic-c{background:rgba(34,211,238,.12); color:var(--cyan);}
.ic-v{background:rgba(129,140,248,.12); color:var(--violet);}
.ic-g{background:rgba(52,211,153,.12);  color:var(--green);}
.ic-a{background:rgba(251,191,36,.12);  color:var(--amber);}
.ii-label { font-size:.72rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:5px; }
.ii-val   { font-size:.9rem; color:var(--text); line-height:1.7; }

/* FORM SIDE */
.form-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 36px; position: relative; overflow: hidden;
}
.form-card::before {
    content:''; position: absolute; top:0; left:12%; right:12%; height:1px;
    background: linear-gradient(90deg,transparent,var(--cyan),var(--violet),transparent);
}
.form-card h3 { font-size:1.3rem; font-weight:800; margin-bottom:28px; }

.form-group { margin-bottom: 18px; }
.form-group:last-of-type { margin-bottom: 24px; }
.form-group label {
    display: block; font-size:.78rem; font-weight:600;
    letter-spacing:.04em; color:var(--muted); margin-bottom:8px;
    text-transform: uppercase;
}
.form-input {
    width: 100%; padding: 12px 16px;
    background: rgba(255,255,255,.04); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text); font-family: 'Montserrat', sans-serif;
    font-size: .93rem; outline: none;
    transition: border-color .2s, background .2s;
}
.form-input::placeholder { color: var(--muted); }
.form-input:focus { border-color: rgba(34,211,238,.4); background: rgba(34,211,238,.03); }
textarea.form-input { resize: vertical; min-height: 110px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.btn-submit {
    width: 100%; padding: 14px;
    background: linear-gradient(130deg, var(--cyan), var(--violet));
    color: #fff; font-family: 'Montserrat', sans-serif; font-size: .95rem; font-weight: 700;
    border: none; border-radius: 12px; cursor: pointer;
    letter-spacing: .02em; transition: opacity .2s, transform .2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
}
.btn-submit:hover { opacity: .88; transform: translateY(-2px); }

/* MAP CARD */
.map-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); overflow: hidden; margin-top: 88px;
}
.map-card-head {
    padding: 24px 28px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
}
.map-card-head .sec-label { margin-bottom: 0; }
.map-card iframe { width: 100%; height: 300px; border: none; display: block; filter: invert(.9) hue-rotate(180deg) saturate(.6); }

/* RESPONSIVE */
@media(max-width:768px){
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .form-card { padding: 28px 20px; }
    .contact-sec { padding: 60px 0; }
}


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
        <div class="page-tag sr">Hubungi Kami</div>
        <h1 class="sr d1">Kontak &amp; <span class="grad">Lokasi</span></h1>
        <p class="sr d2">Kami siap membantu. Kirim pesan atau kunjungi kantor kami di Pekanbaru, Riau.</p>
    </div>
</section>

{{-- CONTACT --}}
<section class="contact-sec">
    <div class="wrap">
        <div class="contact-grid">

            {{-- INFO --}}
            <div>
                <div class="info-head">
                    <div class="sec-label sr">Informasi Kontak</div>
                    <h2 class="sec-title sr d1">Cara Menghubungi<br>Tim Kami</h2>
                </div>

                <div class="sr d2">
                    <div class="info-item">
                        <div class="ii-ic ic-c"><i class="fas fa-envelope"></i></div>
                        <div>
                            <div class="ii-label">Email</div>
                            <div class="ii-val">
                                pekanbaru.co.id<br>
                                support@pekanbaru.co.id
                            </div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="ii-ic ic-v"><i class="fas fa-phone"></i></div>
                        <div>
                            <div class="ii-label">Telepon</div>
                            <div class="ii-val">
                                (0761) 123 456<br>
                                +62 812 3456 7890
                            </div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="ii-ic ic-g"><i class="fas fa-location-dot"></i></div>
                        <div>
                            <div class="ii-label">Alamat</div>
                            <div class="ii-val">
                                Jl. Ahmad Yani No. 1<br>
                                Pekanbaru, Riau 28156
                            </div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="ii-ic ic-a"><i class="fas fa-clock"></i></div>
                        <div>
                            <div class="ii-label">Jam Kerja</div>
                            <div class="ii-val">
                                Senin – Jumat: 08.00 – 17.00 WIB<br>
                                Sabtu – Minggu: Tutup
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- FORM --}}
            <div class="form-card sr d2">
                <h3>Kirim Pesan</h3>
                <form>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nama</label>
                            <input type="text" class="form-input" placeholder="Nama lengkap">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-input" placeholder="email@anda.com">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Subjek</label>
                        <input type="text" class="form-input" placeholder="Topik pesan Anda">
                    </div>
                    <div class="form-group">
                        <label>Pesan</label>
                        <textarea class="form-input" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                    </div>
                    <button type="submit" class="btn-submit">
                        <i class="fas fa-paper-plane"></i> Kirim Pesan
                    </button>
                </form>
            </div>

        </div>

        {{-- MAP --}}
        <div class="map-card sr">
            <div class="map-card-head">
                <i class="fas fa-map-pin" style="color:var(--cyan)"></i>
                <span class="sec-label">Lokasi Kantor — PT Cabang Pekanbaru</span>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.660193534937!2d101.44569731475403!3d0.5070649640095782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a946c7b8b4d1%3A0x1e9a43fb3fca0e8c!2sPT%20Sucofindo%20Pekanbaru!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
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
