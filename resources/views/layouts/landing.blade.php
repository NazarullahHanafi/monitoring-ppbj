<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'PPBJ Management System')</title>

    {{-- NO Tailwind CDN — all styling is custom CSS --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="icon" href="{{ asset('images/logo4.png') }}" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    {{-- Set theme BEFORE paint — prevents flash --}}
    <script>
        (function(){
            var t = localStorage.getItem('ppbj-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
        })();
    </script>

    <style>
    /* ══ THEME TOKENS ══ */
    :root, [data-theme="dark"] {
        --bg:         #080d1a;
        --surface:    #0d1426;
        --card:       #111b30;
        --nav-bg:     rgba(8,13,26,.88);
        --nav-border: rgba(255,255,255,.07);
        --footer-bg:  #060b16;
        --text:       #e2e8f0;
        --text-2:     #94a3b8;
        --muted:      #64748b;
        --border:     rgba(255,255,255,.08);
        --cyan:       #22d3ee;
        --violet:     #818cf8;
        --shadow:     0 4px 24px rgba(0,0,0,.5);
    }
    [data-theme="light"] {
        --bg:         #ffffff;
        --surface:    #f1f5f9;
        --card:       #ffffff;
        --nav-bg:     rgba(255,255,255,.95);
        --nav-border: rgba(0,0,0,.09);
        --footer-bg:  #1e2a4a;
        --text:       #0f172a;
        --text-2:     #334155;
        --muted:      #64748b;
        --border:     rgba(0,0,0,.09);
        --cyan:       #0891b2;
        --violet:     #6366f1;
        --shadow:     0 4px 24px rgba(0,0,0,.1);
    }

    /* ══ GLOBAL RESET ══ */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { background: var(--bg); }
    body {
        background: var(--bg);
        color: var(--text);
        font-family: 'Montserrat', sans-serif;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        transition: background .35s ease, color .35s ease;
    }
    main.site-main {
        padding-top: 64px;
        background: var(--bg);
        transition: background .35s ease;
    }

    /* ══ CINEMATIC CURTAIN ══ */
    #theme-curtain {
        position: fixed; inset: 0; z-index: 9999;
        pointer-events: none;
        background: radial-gradient(circle at var(--cx,50%) var(--cy,50%),
            rgba(34,211,238,.6) 0%, rgba(129,140,248,.4) 40%, transparent 70%);
        opacity: 0;
    }
    #theme-curtain.flash {
        animation: curtain .5s ease forwards;
    }
    @keyframes curtain {
        0%   { opacity:0; transform:scale(.5); }
        40%  { opacity:1; transform:scale(1); }
        100% { opacity:0; transform:scale(1); }
    }

    /* ══ NAVBAR ══ */
    .nav-bar {
        position: fixed; top:0; left:0; right:0; z-index:1000;
        height: 64px;
        background: var(--nav-bg);
        border-bottom: 1px solid var(--nav-border);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        transition: background .35s, border-color .35s;
    }
    .nav-inner {
        width: min(100% - 56px, 1600px); margin: 0 auto;
        height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }

    /* Logo */
    .nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; flex-shrink:0; }
    .nav-logo-ic {
        width:42px; height:42px; border-radius:12px;
        background: #fff;
        display:flex; align-items:center; justify-content:center;
        padding:6px; overflow:hidden; flex-shrink:0;
        box-shadow: 0 8px 22px rgba(15,23,42,.12);
        transition: transform .2s, box-shadow .2s;
    }
    .nav-logo-img { width:100%; height:100%; object-fit:contain; display:block; }
    .nav-logo:hover .nav-logo-ic { transform: scale(1.1) rotate(-5deg); }
    .nav-logo-name {
        font-family:'Montserrat',sans-serif; font-weight:900; font-size:1rem;
        color: var(--text);
        white-space:nowrap;
        letter-spacing:-.03em;
    }

    /* Links */
    .nav-links { display:flex; align-items:center; gap:2px; margin-left:auto; margin-right:auto; }
    .nav-link {
        padding:7px 13px; border-radius:9px; font-size:.875rem; font-weight:500;
        text-decoration:none; color:var(--text-2); white-space:nowrap;
        transition: color .2s, background .2s;
    }
    .nav-link:hover  { color:var(--text); background:rgba(34,211,238,.07); }
    .nav-link.active { color:var(--cyan); background:rgba(34,211,238,.1); }

    /* Right side */
    .nav-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }

    /* Theme toggle pill */
    .theme-wrap { display:flex; align-items:center; gap:7px; }
    .theme-label {
        font-size:.72rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
        color:var(--muted); white-space:nowrap; user-select:none;
        display:flex; align-items:center; gap:5px;
        transition: color .3s;
    }
    .theme-btn {
        position:relative; width:50px; height:27px; border-radius:999px;
        border:1.5px solid var(--nav-border);
        background:rgba(128,128,128,.15);
        cursor:pointer; outline:none; flex-shrink:0;
        transition: border-color .3s, background .3s;
    }
    .theme-btn:hover { border-color:var(--cyan); }
    .theme-thumb {
        position:absolute; top:2.5px; left:2.5px;
        width:19px; height:19px; border-radius:50%;
        background: linear-gradient(135deg,var(--cyan),var(--violet));
        display:flex; align-items:center; justify-content:center;
        font-size:.58rem; color:#fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.3);
        transition: transform .35s cubic-bezier(.34,1.56,.64,1);
        pointer-events:none;
    }
    [data-theme="light"] .theme-thumb { transform: translateX(23px); }
    .t-icon-dark  { position:absolute; transition: opacity .25s; }
    .t-icon-light { position:absolute; opacity:0; transition: opacity .25s; }
    [data-theme="light"] .t-icon-dark  { opacity:0; }
    [data-theme="light"] .t-icon-light { opacity:1; }

    /* CTA buttons */
    .nav-cta {
        display:inline-flex; align-items:center; gap:8px; padding:8px 18px;
        border-radius:10px; font-size:.875rem; font-weight:600;
        text-decoration:none; color:#fff; white-space:nowrap;
        background: linear-gradient(130deg,var(--cyan),var(--violet));
        transition: opacity .2s, transform .2s;
    }
    .nav-cta:hover { opacity:.88; transform:translateY(-1px); }
    .nav-cta-ghost {
        display:inline-flex; align-items:center; gap:8px; padding:7px 16px;
        border-radius:10px; font-size:.875rem; font-weight:600;
        text-decoration:none; color:var(--cyan); white-space:nowrap;
        background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.25);
        transition: background .2s, transform .2s;
    }
    .nav-cta-ghost:hover { background:rgba(34,211,238,.15); transform:translateY(-1px); }

    /* Burger */
    .nav-burger {
        display:none; flex-direction:column; gap:5px; cursor:pointer;
        padding:8px; border-radius:9px; border:1px solid var(--nav-border);
        background:rgba(128,128,128,.07); transition:background .2s;
    }
    .nav-burger:hover { background:rgba(128,128,128,.14); }
    .b-line { width:20px; height:1.5px; background:var(--text); border-radius:2px; transition: all .3s; }

    /* ══ MOBILE MENU ══ */
    .mobile-menu {
        display:none; position:fixed; top:64px; left:0; right:0; z-index:999;
        background:var(--nav-bg); border-bottom:1px solid var(--nav-border);
        backdrop-filter:blur(20px); padding:12px 20px 20px;
        transition: background .35s;
    }
    .mobile-menu.open { display:block; }
    .mobile-link {
        display:block; padding:11px 14px; border-radius:10px; margin-bottom:4px;
        font-size:.93rem; font-weight:500; text-decoration:none; color:var(--text-2);
        transition: color .2s, background .2s;
    }
    .mobile-link:hover  { color:var(--text); background:rgba(34,211,238,.07); }
    .mobile-link.active { color:var(--cyan); background:rgba(34,211,238,.1); }
    .mobile-theme-row {
        display:flex; align-items:center; justify-content:space-between;
        padding:11px 14px; border-radius:10px; margin-bottom:4px;
        background:rgba(128,128,128,.05); border:1px solid var(--border);
    }
    .mobile-theme-label { font-size:.88rem; font-weight:500; color:var(--text-2); }
    .mobile-cta {
        display:block; margin-top:10px; padding:13px; border-radius:10px;
        text-align:center; font-size:.93rem; font-weight:700; text-decoration:none; color:#fff;
        background: linear-gradient(130deg,var(--cyan),var(--violet));
    }

    /* ══ FOOTER ══ */
    .site-footer {
        background: var(--footer-bg);
        border-top: 1px solid rgba(255,255,255,.07);
        font-family: 'Montserrat', sans-serif;
        transition: background .35s, border-color .35s, color .35s;
    }
    .footer-inner { max-width:1200px; margin:0 auto; padding:56px 24px 32px; }
    .footer-grid { display:grid; grid-template-columns:1.4fr repeat(3,1fr); gap:40px; margin-bottom:40px; }
    .footer-logo { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .footer-logo-ic {
        width:42px; height:42px; border-radius:12px;
        background:#fff;
        display:flex; align-items:center; justify-content:center; padding:6px; overflow:hidden;
        box-shadow: 0 8px 22px rgba(15,23,42,.12);
    }
    .footer-logo-img { width:100%; height:100%; object-fit:contain; display:block; }
    .footer-logo-name { font-family:'Montserrat',sans-serif; font-weight:900; font-size:1rem; color:var(--text); letter-spacing:-.03em; }
    .footer-desc { font-family:'Montserrat',sans-serif; font-size:.83rem; font-weight:500; color:var(--text-2); line-height:1.7; max-width:260px; }
    .footer-col h4 {
        font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:700;
        letter-spacing:.1em; text-transform:uppercase; color:var(--text); margin-bottom:16px;
    }
    .footer-col ul { list-style:none; }
    .footer-col li { margin-bottom:10px; }
    .footer-col li a {
        font-family:'Montserrat',sans-serif;
        font-size:.85rem;
        font-weight:500;
        color:var(--text-2);
        text-decoration:none;
        transition:color .2s, transform .2s;
        display:inline-flex;
    }
    .footer-col li a:hover { color:var(--cyan); }
    .footer-col li span {
        font-family:'Montserrat',sans-serif;
        font-size:.85rem;
        font-weight:500;
        color:var(--text-2);
        display:flex;
        align-items:center;
        gap:8px;
        line-height:1.55;
    }
    .footer-col li span i { color:var(--cyan); font-size:.8rem; width:14px; }
    .f-divider { border:none; border-top:1px solid rgba(255,255,255,.07); margin:0 0 24px; }
    .f-copy { font-family:'Montserrat',sans-serif; text-align:center; font-size:.8rem; font-weight:500; color:var(--muted); }
    .f-copy span { color:var(--cyan); }
    [data-theme="light"] .site-footer {
        background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
        border-top-color: rgba(15,23,42,.10);
    }
    [data-theme="light"] .footer-logo-name,
    [data-theme="light"] .footer-col h4 {
        color: #0f172a;
    }
    [data-theme="light"] .footer-desc,
    [data-theme="light"] .footer-col li a,
    [data-theme="light"] .footer-col li span {
        color: #334155;
    }
    [data-theme="light"] .footer-col li a:hover {
        color: var(--cyan);
    }
    [data-theme="light"] .f-divider {
        border-top-color: rgba(15,23,42,.10);
    }
    [data-theme="light"] .f-copy {
        color: #475569;
    }

    /* ══ RESPONSIVE ══ */
    @media(max-width:900px) { .footer-grid { grid-template-columns:1fr 1fr; gap:28px; } }
    @media(max-width:768px) {
        .nav-links, .nav-cta, .nav-cta-ghost { display:none !important; }
        .theme-label { display:none; }
        .nav-burger { display:flex; }
        .footer-grid { grid-template-columns:1fr 1fr; gap:24px; }
    }
    @media(max-width:480px) {
        .footer-grid { grid-template-columns:1fr; }
        .footer-inner { padding:40px 20px 24px; }
        .nav-logo-name { font-size:.88rem; }
    }
    </style>

    @stack('styles')
</head>
<body>

<div id="theme-curtain"></div>

{{-- NAVBAR --}}
<nav class="nav-bar">
    <div class="nav-inner">
        <a href="{{ route('landing.index') }}" class="nav-logo">
            <div class="nav-logo-ic">
                <img src="{{ asset('images/logo4.png') }}" alt="Logo Sucofindo" class="nav-logo-img">
            </div>
            <span class="nav-logo-name">SUCOFINDO</span>
        </a>

        <div class="nav-links">
            <a href="{{ route('landing.index') }}"    class="nav-link {{ request()->routeIs('landing.index')    ? 'active':'' }}">Home</a>
            <a href="{{ route('landing.about') }}"    class="nav-link {{ request()->routeIs('landing.about')    ? 'active':'' }}">About</a>
            <a href="{{ route('landing.services') }}" class="nav-link {{ request()->routeIs('landing.services') ? 'active':'' }}">Services</a>
            <a href="{{ route('landing.track') }}"    class="nav-link {{ request()->routeIs('landing.track')    ? 'active':'' }}">
                <i class="fas fa-search" style="font-size:.75rem;margin-right:3px"></i>Track PR
            </a>
            <a href="{{ route('landing.contact') }}"  class="nav-link {{ request()->routeIs('landing.contact')  ? 'active':'' }}">Contact</a>
        </div>

        <div class="nav-right">
            @auth
                @php
                    $dashboardUrl = match(strtolower(auth()->user()->department ?? 'umum')) {
                        'operasional' => route('ops.dashboard'),
                        default       => route('dashboard.indexumum'),
                    };
                @endphp
                <a href="{{ $dashboardUrl }}" class="nav-cta-ghost">
                    <i class="fas fa-gauge"></i> Dashboard
                </a>
            @else
                <a href="{{ route('login') }}" class="nav-cta">
                    <i class="fas fa-sign-in-alt"></i> Login
                </a>
            @endauth

            <div class="theme-wrap">
                <span class="theme-label">
                    <i id="themeLabelIcon" class="fas fa-moon"></i>
                    <span id="themeLabelText">Dark</span>
                </span>
                <button class="theme-btn" id="themeToggle" aria-label="Toggle theme" title="Toggle dark/light mode">
                    <div class="theme-thumb">
                        <i class="fas fa-moon  t-icon-dark"></i>
                        <i class="fas fa-sun   t-icon-light"></i>
                    </div>
                </button>
            </div>

            <button class="nav-burger" id="navBurger" aria-label="Menu">
                <span class="b-line"></span>
                <span class="b-line"></span>
                <span class="b-line"></span>
            </button>
        </div>
    </div>
</nav>

{{-- MOBILE MENU --}}
<div class="mobile-menu" id="mobileMenu">
    <a href="{{ route('landing.index') }}"    class="mobile-link {{ request()->routeIs('landing.index')    ? 'active':'' }}"><i class="fas fa-home"       style="width:18px;margin-right:8px"></i>Home</a>
    <a href="{{ route('landing.about') }}"    class="mobile-link {{ request()->routeIs('landing.about')    ? 'active':'' }}"><i class="fas fa-info-circle" style="width:18px;margin-right:8px"></i>About</a>
    <a href="{{ route('landing.services') }}" class="mobile-link {{ request()->routeIs('landing.services') ? 'active':'' }}"><i class="fas fa-cogs"        style="width:18px;margin-right:8px"></i>Services</a>
    <a href="{{ route('landing.track') }}"    class="mobile-link {{ request()->routeIs('landing.track')    ? 'active':'' }}"><i class="fas fa-search"      style="width:18px;margin-right:8px"></i>Track PR</a>
    <a href="{{ route('landing.contact') }}"  class="mobile-link {{ request()->routeIs('landing.contact')  ? 'active':'' }}"><i class="fas fa-envelope"    style="width:18px;margin-right:8px"></i>Contact</a>

    <div class="mobile-theme-row">
        <span class="mobile-theme-label"><i class="fas fa-palette" style="margin-right:8px;color:var(--cyan)"></i>Tampilan</span>
        <button class="theme-btn" id="themeToggleMobile" aria-label="Toggle theme">
            <div class="theme-thumb">
                <i class="fas fa-moon  t-icon-dark"></i>
                <i class="fas fa-sun   t-icon-light"></i>
            </div>
        </button>
    </div>

    @auth
        <a href="{{ $dashboardUrl }}" class="mobile-cta"><i class="fas fa-gauge" style="margin-right:8px"></i>Dashboard</a>
    @else
        <a href="{{ route('login') }}" class="mobile-cta"><i class="fas fa-sign-in-alt" style="margin-right:8px"></i>Login</a>
    @endauth
</div>

{{-- CONTENT --}}
<main class="site-main">
    @yield('content')
</main>

{{-- FOOTER --}}
<footer class="site-footer">
    <div class="footer-inner">
        <div class="footer-grid">
            <div>
                <div class="footer-logo">
                    <div class="footer-logo-ic">
                        <img src="{{ asset('images/logo4.png') }}" alt="Logo Sucofindo" class="footer-logo-img">
                    </div>
                    <span class="footer-logo-name">SUCOFINDO</span>
                </div>
                <p class="footer-desc">Platform manajemen pengadaan barang dan jasa PT Cabang Pekanbaru yang efisien dan terintegrasi.</p>
            </div>
            <div class="footer-col">
                <h4>Navigasi</h4>
                <ul>
                    <li><a href="{{ route('landing.index') }}">Home</a></li>
                    <li><a href="{{ route('landing.about') }}">About</a></li>
                    <li><a href="{{ route('landing.services') }}">Services</a></li>
                    <li><a href="{{ route('landing.track') }}">Track PR</a></li>
                    <li><a href="{{ route('landing.contact') }}">Contact</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Layanan</h4>
                <ul>
                    <li><span>TOR Management</span></li>
                    <li><span>PR Processing</span></li>
                    <li><span>PPBJ Monitoring</span></li>
                    <li><span>SLA Tracking</span></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Kontak</h4>
                <ul>
                    <li><span><i class="fas fa-envelope"></i> ppbj@co.id</span></li>
                    <li><span><i class="fas fa-phone"></i> (0761) 123 456</span></li>
                    <li><span><i class="fas fa-location-dot"></i> JL. Jend. A. Yani No.73, Kelurahan Padang Bulan, Senapelan, Pekanbaru City, Riau 28156</span></li>
                    <li><span><i class="fas fa-clock"></i> Sen–Jum 08:00–17:00</span></li>
                </ul>
            </div>
        </div>
        <hr class="f-divider">
        <p class="f-copy">&copy; {{ date('Y') }} <span>SIMON PR</span> — PT Cabang Pekanbaru. All rights reserved.</p>
    </div>
</footer>

<script>
(function(){
    var html    = document.documentElement;
    var curtain = document.getElementById('theme-curtain');

    function getTheme(){ return html.getAttribute('data-theme') || 'dark'; }

    function setLabel(t){
        var txt = document.getElementById('themeLabelText');
        var ico = document.getElementById('themeLabelIcon');
        if(txt) txt.textContent = t === 'light' ? 'Light' : 'Dark';
        if(ico) ico.className  = t === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    function applyTheme(t, btn){
        /* Cinematic ripple from button position */
        if(curtain && btn){
            var r = btn.getBoundingClientRect();
            var cx = Math.round((r.left + r.width/2)  / window.innerWidth  * 100);
            var cy = Math.round((r.top  + r.height/2) / window.innerHeight * 100);
            curtain.style.setProperty('--cx', cx + '%');
            curtain.style.setProperty('--cy', cy + '%');
            curtain.classList.remove('flash');
            void curtain.offsetWidth;
            curtain.classList.add('flash');
        }
        html.setAttribute('data-theme', t);
        localStorage.setItem('ppbj-theme', t);
        setLabel(t);
    }

    function toggle(btn){
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark', btn);
    }

    /* Init label */
    setLabel(getTheme());

    /* Bind both toggles */
    ['themeToggle','themeToggleMobile'].forEach(function(id){
        var el = document.getElementById(id);
        if(el) el.addEventListener('click', function(){ toggle(this); });
    });

    /* Burger */
    var burger = document.getElementById('navBurger');
    var mmenu  = document.getElementById('mobileMenu');
    if(burger && mmenu){
        var lines = burger.querySelectorAll('.b-line');
        burger.addEventListener('click', function(){
            mmenu.classList.toggle('open');
            var open = mmenu.classList.contains('open');
            if(lines[0]) lines[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
            if(lines[1]) lines[1].style.opacity   = open ? '0' : '';
            if(lines[2]) lines[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
        });
        mmenu.querySelectorAll('a').forEach(function(a){
            a.addEventListener('click', function(){
                mmenu.classList.remove('open');
                lines[0].style.transform=''; lines[1].style.opacity=''; lines[2].style.transform='';
            });
        });
    }

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
        a.addEventListener('click', function(e){
            e.preventDefault();
            var t = document.querySelector(this.getAttribute('href'));
            if(t) t.scrollIntoView({behavior:'smooth'});
        });
    });
})();
</script>

@stack('scripts')
@include('components.chatbot')
</body>
</html>
