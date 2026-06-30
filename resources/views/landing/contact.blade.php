@extends('layouts.landing')

@section('title', 'Contact - SIMONPR')

@push('styles')
    <link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet">
    <style>
        body, main.site-main {
            background:
                radial-gradient(circle at 14% 12%, rgba(34,211,238,.12), transparent 26rem),
                radial-gradient(circle at 84% 18%, rgba(129,140,248,.13), transparent 28rem),
                var(--bg) !important;
            font-family:'Montserrat',sans-serif;
        }
        [data-theme="light"] body,
        [data-theme="light"] main.site-main {
            background:
                radial-gradient(circle at 14% 12%, rgba(8,145,178,.10), transparent 26rem),
                radial-gradient(circle at 84% 18%, rgba(99,102,241,.10), transparent 28rem),
                #f8fbff !important;
        }
        .wrap { width:min(1180px,calc(100% - 48px)); margin:0 auto; position:relative; z-index:1; }
        .contact-hero { position:relative; overflow:hidden; padding:108px 0 54px; }
        .contact-hero::before {
            content:""; position:absolute; inset:0; opacity:.30;
            background:linear-gradient(90deg,var(--bg),rgba(8,13,26,.72),rgba(8,13,26,.50)), url('{{ asset('images/hero-building.jpg') }}') center right/cover no-repeat;
        }
        [data-theme="light"] .contact-hero::before {
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
        .hero-title { color:var(--text); font-size:clamp(3rem,7vw,6.2rem); line-height:.9; letter-spacing:-.08em; font-weight:900; margin:18px 0 20px; max-width:840px; }
        .gradient-text { background:linear-gradient(120deg,var(--cyan),var(--violet),#ec4899); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .hero-copy { color:var(--text-2); line-height:1.85; font-size:1.02rem; max-width:650px; }
        .office-card, .contact-card, .form-card, .map-card {
            border:1px solid var(--border); border-radius:28px; background:rgba(255,255,255,.06); box-shadow:0 18px 44px rgba(0,0,0,.18); overflow:hidden;
        }
        [data-theme="light"] .office-card,
        [data-theme="light"] .contact-card,
        [data-theme="light"] .form-card,
        [data-theme="light"] .map-card { background:rgba(255,255,255,.84); box-shadow:0 18px 44px rgba(15,23,42,.08); }
        .office-card { padding:24px; }
        .office-card strong { display:block; color:var(--text); font-size:1.4rem; line-height:1.2; margin-bottom:10px; }
        .office-card span { color:var(--text-2); line-height:1.7; }
        .section { padding:74px 0; }
        .contact-grid { display:grid; grid-template-columns:.78fr 1.12fr; gap:24px; align-items:start; }
        .contact-card { padding:28px; }
        .contact-card h2, .form-card h2 { color:var(--text); font-size:clamp(1.7rem,3vw,2.7rem); line-height:1; letter-spacing:-.055em; margin:14px 0 20px; }
        .info-list { display:grid; gap:14px; }
        .info-item { display:grid; grid-template-columns:48px 1fr; gap:14px; align-items:start; padding:16px 0; border-bottom:1px solid var(--border); }
        .info-item:last-child { border-bottom:none; }
        .info-icon { width:48px; height:48px; border-radius:17px; display:grid; place-items:center; color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); }
        .info-label { color:var(--muted); font-size:.72rem; font-weight:900; letter-spacing:.1em; text-transform:uppercase; margin-bottom:5px; }
        .info-value { color:var(--text); line-height:1.65; font-size:.92rem; }
        .form-card { padding:28px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .form-group { margin-bottom:16px; }
        .form-group label { display:block; color:var(--muted); font-size:.74rem; font-weight:900; letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; }
        .form-input {
            width:100%; border:1px solid var(--border); border-radius:16px; padding:14px 16px;
            background:rgba(255,255,255,.05); color:var(--text); font-family:'Montserrat',sans-serif; outline:none;
        }
        [data-theme="light"] .form-input { background:rgba(248,250,252,.85); }
        .form-input:focus { border-color:rgba(34,211,238,.42); }
        textarea.form-input { min-height:128px; resize:vertical; }
        .btn-submit, .btn-map {
            min-height:48px; padding:0 22px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; gap:10px;
            font-weight:850; text-decoration:none; border:none; cursor:pointer; color:#fff; background:linear-gradient(135deg,var(--cyan),var(--violet)); box-shadow:0 16px 34px rgba(99,102,241,.22);
        }
        .map-card { margin-top:24px; }
        .map-head { padding:24px 28px; display:flex; justify-content:space-between; gap:18px; align-items:center; border-bottom:1px solid var(--border); }
        .map-head h2 { color:var(--text); font-size:1.2rem; margin:0; }
        .map-shell { position:relative; min-height:390px; background:#08111f; }
        #sucofindoMap { width:100%; height:420px; min-height:360px; }
        .map-overlay {
            position:absolute; left:22px; bottom:22px; max-width:330px; padding:18px; border-radius:22px;
            color:#e2e8f0; background:rgba(8,13,26,.82); border:1px solid rgba(255,255,255,.12); box-shadow:0 18px 34px rgba(0,0,0,.25);
        }
        .map-overlay b { display:block; margin-bottom:6px; }
        .map-overlay span { color:#cbd5e1; line-height:1.6; font-size:.86rem; }
        .marker-pin {
            width:44px; height:44px; border-radius:16px; display:grid; place-items:center; color:#fff;
            background:linear-gradient(135deg,var(--cyan),var(--violet)); border:3px solid #fff; box-shadow:0 14px 34px rgba(0,0,0,.34);
        }
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

        .contact-hero::before {
            opacity: .92;
            background:
                linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.82) 48%, rgba(255,255,255,.48) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
        }

        [data-theme="dark"] .contact-hero::before {
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
        .office-card span,
        .info-value,
        .map-overlay span {
            line-height: 1.9;
            font-weight: 500;
        }

        .office-card,
        .contact-card,
        .form-card,
        .map-card {
            border-radius: 0;
            background: #fff;
            border: 1px solid rgba(17,18,41,.10);
            box-shadow: 0 22px 60px rgba(17,18,41,.08);
        }

        [data-theme="dark"] .office-card,
        [data-theme="dark"] .contact-card,
        [data-theme="dark"] .form-card,
        [data-theme="dark"] .map-card {
            background: #171a2f;
            border-color: rgba(255,255,255,.12);
        }

        .contact-card h2,
        .form-card h2 {
            font-size: clamp(2.15rem, 4vw, 4.25rem);
            letter-spacing: -.055em;
        }

        .info-icon,
        .marker-pin,
        .btn-submit,
        .btn-map {
            border-radius: 4px;
            background: #ff6b66;
            box-shadow: 0 16px 34px rgba(255,107,102,.22);
        }

        .form-input {
            border-radius: 4px;
        }

        @media(max-width:940px){ .hero-grid,.contact-grid{grid-template-columns:1fr;} }
        @media(max-width:640px){ .wrap{width:min(100% - 28px,1180px);} .form-row{grid-template-columns:1fr;} .contact-hero{padding:78px 0 44px;} .map-head{display:block;} .btn-map{margin-top:14px;} }
    </style>
@endpush

@section('content')
    <section class="contact-hero">
        <div class="wrap hero-grid">
            <div class="reveal">
                <div class="eyebrow">Kontak</div>
                <h1 class="hero-title">Terhubung dengan <span class="gradient-text">Sucofindo Pekanbaru.</span></h1>
                <p class="hero-copy">
                    Hubungi tim kami untuk informasi layanan, penggunaan SIMONPR, tracking PR/PPBJ,
                    atau kebutuhan koordinasi support pengadaan.
                </p>
            </div>
            <div class="office-card reveal">
                <strong>PT Sucofindo Cabang Pekanbaru</strong>
                <span>JL. Jend. A. Yani No.73, Kelurahan Padang Bulan, Senapelan, Pekanbaru City, Riau 28156. Titik peta sudah diarahkan ke lokasi kantor cabang.</span>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="wrap contact-grid">
            <div class="contact-card reveal">
                <div class="eyebrow">Informasi</div>
                <h2>Kontak utama</h2>
                <div class="info-list">
                    <div class="info-item"><div class="info-icon"><i class="fas fa-location-dot"></i></div><div><div class="info-label">Alamat</div><div class="info-value">JL. Jend. A. Yani No.73, Kelurahan Padang Bulan, Senapelan, Pekanbaru City, Riau 28156</div></div></div>
                    <div class="info-item"><div class="info-icon"><i class="fas fa-envelope"></i></div><div><div class="info-label">Email</div><div class="info-value">support@sucofindoumumpku.com</div></div></div>
                    <div class="info-item"><div class="info-icon"><i class="fas fa-clock"></i></div><div><div class="info-label">Jam kerja</div><div class="info-value">Senin - Jumat, mengikuti jam operasional kantor</div></div></div>
                    <div class="info-item"><div class="info-icon"><i class="fas fa-magnifying-glass"></i></div><div><div class="info-label">Tracking</div><div class="info-value">Gunakan menu Track PR untuk mencari nomor PR/PPBJ tanpa login.</div></div></div>
                </div>
            </div>

            <div class="form-card reveal">
                <div class="eyebrow">Kirim pesan</div>
                <h2>Butuh bantuan?</h2>
                @if(session('success'))
                    <div style="margin-bottom:18px;border:1px solid rgba(16,185,129,.25);background:rgba(16,185,129,.10);color:#047857;padding:14px 16px;border-radius:4px;font-weight:800;line-height:1.6">
                        <i class="fas fa-check-circle" style="margin-right:8px"></i>{{ session('success') }}
                    </div>
                @endif

                @if($errors->any())
                    <div style="margin-bottom:18px;border:1px solid rgba(239,68,68,.25);background:rgba(239,68,68,.10);color:#b91c1c;padding:14px 16px;border-radius:4px;font-weight:800;line-height:1.6">
                        <i class="fas fa-circle-exclamation" style="margin-right:8px"></i>Mohon lengkapi data pesan dengan benar.
                    </div>
                @endif

                <form method="POST" action="{{ route('landing.contact.store') }}">
                    @csrf
                    <input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0" aria-hidden="true">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nama</label>
                            <input class="form-input" name="name" type="text" value="{{ old('name') }}" placeholder="Nama Anda" required>
                            @error('name')<small style="display:block;margin-top:7px;color:#ef4444;font-weight:700">{{ $message }}</small>@enderror
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input class="form-input" name="email" type="email" value="{{ old('email') }}" placeholder="email@contoh.com" required>
                            @error('email')<small style="display:block;margin-top:7px;color:#ef4444;font-weight:700">{{ $message }}</small>@enderror
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Subjek</label>
                        <input class="form-input" name="subject" type="text" value="{{ old('subject') }}" placeholder="Informasi yang ingin ditanyakan" required>
                        @error('subject')<small style="display:block;margin-top:7px;color:#ef4444;font-weight:700">{{ $message }}</small>@enderror
                    </div>
                    <div class="form-group">
                        <label>Pesan</label>
                        <textarea class="form-input" name="message" placeholder="Tulis pesan Anda..." required>{{ old('message') }}</textarea>
                        @error('message')<small style="display:block;margin-top:7px;color:#ef4444;font-weight:700">{{ $message }}</small>@enderror
                    </div>
                    <button class="btn-submit" type="submit"><i class="fas fa-paper-plane"></i> Kirim Pesan</button>
                </form>
            </div>
        </div>

        <div class="wrap">
            <div class="map-card reveal">
                <div class="map-head">
                    <div>
                        <div class="eyebrow">Lokasi kantor</div>
                        <h2>PT Sucofindo Cabang Pekanbaru</h2>
                    </div>
                    <a class="btn-map" href="https://www.google.com/maps/search/?api=1&query=0.5206544258952752,101.44365607791217" target="_blank" rel="noopener">
                        <i class="fas fa-diamond-turn-right"></i> Buka Maps
                    </a>
                </div>
                <div class="map-shell">
                    <div id="sucofindoMap" role="img" aria-label="Peta lokasi PT Sucofindo Cabang Pekanbaru"></div>
                    <div class="map-overlay">
                        <b>Koordinat kantor</b>
                        <span>0.5206544258952752, 101.44365607791217</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
    <script>
        (function(){
            var items=document.querySelectorAll('.reveal');
            var obs=new IntersectionObserver(function(entries){
                entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('show'); obs.unobserve(entry.target); }});
            },{threshold:.12});
            items.forEach(function(item){ obs.observe(item); });
        })();

        (function(){
            var lng = 101.44365607791217;
            var lat = 0.5206544258952752;
            var el = document.getElementById('sucofindoMap');
            if (!el || typeof maplibregl === 'undefined') return;

            var map = new maplibregl.Map({
                container: el,
                style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
                center: [lng, lat],
                zoom: 16.5,
                pitch: 48,
                bearing: -18,
                attributionControl: false
            });

            map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
            map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

            var marker = document.createElement('div');
            marker.className = 'marker-pin';
            marker.innerHTML = '<i class="fas fa-building"></i>';

            new maplibregl.Marker({ element: marker, anchor: 'bottom' })
                .setLngLat([lng, lat])
                .setPopup(new maplibregl.Popup({ offset: 18 }).setHTML('<strong>PT Sucofindo Cabang Pekanbaru</strong><br>Pekanbaru, Riau'))
                .addTo(map);
        })();
    </script>
@endpush
