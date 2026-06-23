@extends('layouts.landing')

@section('title', 'Home - PPBJ Management System')

@push('styles')
    <style>
        /* ══ PAGE TOKENS (inherit from layout) ══ */
        :root {
            --r: 16px;
            --green: #34d399;
            --amber: #fbbf24;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        html,
        body,
        main {
            background: var(--bg) !important;
        }

        /* ══ UTILITIES ══ */
        .wrap {
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        .wrap-lg {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        .dot-bg {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, rgba(255, 255, 255, .04) 1px, transparent 1px);
            background-size: 28px 28px;
        }

        [data-theme="light"] .dot-bg {
            background-image: radial-gradient(circle, rgba(8, 145, 178, .06) 1px, transparent 1px);
        }

        /* ══ SCROLL REVEAL ══ */
        .sr {
            opacity: 0;
            transform: translateY(18px);
            transition: opacity .5s ease, transform .5s ease;
        }

        .sr.d1 {
            transition-delay: .08s;
        }

        .sr.d2 {
            transition-delay: .16s;
        }

        .sr.d3 {
            transition-delay: .24s;
        }

        .sr.show {
            opacity: 1;
            transform: none;
        }

        /* ══ TYPOGRAPHY ══ */
        h1,
        h2,
        h3,
        h4 {
            font-family: 'Montserrat', sans-serif;
            color: var(--text);
        }

        .grad {
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .sec-label {
            font-size: .75rem;
            font-weight: 700;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--cyan);
            margin-bottom: 10px;
        }

        .sec-title {
            font-size: clamp(1.8rem, 3vw, 2.8rem);
            font-weight: 800;
            letter-spacing: -.025em;
            margin-bottom: 14px;
            line-height: 1.15;
            color: var(--text);
        }

        .sec-sub {
            color: var(--muted);
            font-size: 1rem;
            line-height: 1.7;
            max-width: 500px;
        }

        /* ══ BUTTONS ══ */
        .btn-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .btn-p {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            padding: 13px 26px;
            border-radius: 12px;
            font-weight: 600;
            font-size: .93rem;
            text-decoration: none;
            color: #fff;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            transition: opacity .2s, transform .2s;
        }

        .btn-p:hover {
            opacity: .88;
            transform: translateY(-2px);
        }

        .btn-g {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            padding: 13px 26px;
            border-radius: 12px;
            font-weight: 600;
            font-size: .93rem;
            text-decoration: none;
            color: var(--cyan);
            background: rgba(34, 211, 238, .08);
            border: 1px solid rgba(34, 211, 238, .35);
            transition: all .2s;
        }

        .btn-g:hover {
            background: rgba(34, 211, 238, .15);
            border-color: rgba(34, 211, 238, .6);
            transform: translateY(-2px);
        }

        /* ══ HERO ══ */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 120px 0 100px;
            position: relative;
        }

        .hero-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-image: url('{{ asset("images/hero-building.jpg") }}');
            background-size: cover;
            background-position: center 30%;
            transform: scale(1.03);
        }

        .hero-bg::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(105deg, rgba(8, 13, 26, .92) 0%, rgba(8, 13, 26, .78) 50%, rgba(8, 13, 26, .62) 100%),
                linear-gradient(to top, rgba(8, 13, 26, .7) 0%, transparent 50%);
            transition: background .35s ease;
        }

        [data-theme="light"] .hero-bg::after {
            background:
                linear-gradient(105deg, rgba(255, 255, 255, .88) 0%, rgba(255, 255, 255, .75) 50%, rgba(255, 255, 255, .55) 100%),
                linear-gradient(to top, rgba(255, 255, 255, .7) 0%, transparent 50%);
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        /* ── Pure CSS hero animations ── */
        @keyframes lineUp {
            from {
                opacity: 0;
                transform: translateY(28px)
            }

            to {
                opacity: 1;
                transform: none
            }
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(14px)
            }

            to {
                opacity: 1;
                transform: none
            }
        }

        @keyframes lineGrow {
            from {
                transform: scaleX(0)
            }

            to {
                transform: scaleX(1)
            }
        }

        @keyframes fadein {
            to {
                opacity: 1
            }
        }

        .hero-title {
            font-size: clamp(2.6rem, 5vw, 4.2rem);
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -.03em;
            margin-bottom: 20px;
            color: var(--text);
        }

        .tl {
            display: block;
        }

        .tl-inner {
            display: block;
            animation: lineUp .7s cubic-bezier(.16, 1, .3, 1) both;
        }

        .tl:nth-child(1) .tl-inner {
            animation-delay: .1s;
        }

        .tl:nth-child(2) .tl-inner {
            animation-delay: .22s;
        }

        .tl:nth-child(3) .tl-inner {
            animation-delay: .34s;
        }

        .hero-accent-line {
            display: inline-block;
            position: relative;
        }

        .hero-accent-line::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--cyan), var(--violet));
            border-radius: 2px;
            transform-origin: left;
            animation: lineGrow .6s cubic-bezier(.16, 1, .3, 1) .8s both;
        }

        .hero-tag {
            font-size: .72rem;
            font-weight: 700;
            letter-spacing: .18em;
            text-transform: uppercase;
            color: var(--cyan);
            margin-bottom: 18px;
            animation: fadeUp .5s ease .05s both;
        }

        .hero-sub {
            font-size: 1rem;
            line-height: 1.8;
            max-width: 440px;
            margin-bottom: 36px;
            color: rgba(226, 232, 240, .75);
            animation: fadeUp .6s ease .5s both;
        }

        [data-theme="light"] .hero-sub {
            color: rgba(15, 23, 42, .7);
        }

        .hero-btns {
            animation: fadeUp .6s ease .75s both;
        }

        /* Hero right card */
        .hero-card {
            background: rgba(11, 18, 36, .75);
            border: 1px solid rgba(255, 255, 255, .1);
            border-radius: var(--r);
            padding: 24px;
            position: relative;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            animation: fadeUp .7s ease .35s both;
        }

        [data-theme="light"] .hero-card {
            background: rgba(255, 255, 255, .88);
            border-color: rgba(0, 0, 0, .08);
        }

        .hero-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 12%;
            right: 12%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .mini-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 18px;
        }

        .ms {
            background: rgba(255, 255, 255, .03);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 14px 10px;
            text-align: center;
        }

        [data-theme="light"] .ms {
            background: rgba(0, 0, 0, .03);
        }

        .ms-n {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .ms-l {
            font-size: .7rem;
            color: var(--muted);
            margin-top: 2px;
        }

        .fi {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 11px;
            border: 1px solid var(--border);
            margin-bottom: 8px;
            transition: border-color .2s, background .2s;
        }

        .fi:last-child {
            margin-bottom: 0;
        }

        .fi:hover {
            border-color: rgba(34, 211, 238, .2);
            background: rgba(34, 211, 238, .03);
        }

        .fi-ic {
            width: 38px;
            height: 38px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .85rem;
            flex-shrink: 0;
        }

        .ic-c {
            background: rgba(34, 211, 238, .12);
            color: var(--cyan);
        }

        .ic-v {
            background: rgba(129, 140, 248, .12);
            color: var(--violet);
        }

        .ic-g {
            background: rgba(52, 211, 153, .12);
            color: var(--green);
        }

        .fi-name {
            font-size: .88rem;
            font-weight: 600;
            color: var(--text);
        }

        .fi-desc {
            font-size: .75rem;
            color: var(--muted);
        }

        /* Scroll hint */
        .scroll-hint {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, .35);
            font-size: .7rem;
            letter-spacing: .1em;
            text-transform: uppercase;
            opacity: 0;
            animation: fadein .6s ease 1.6s forwards;
            z-index: 2;
        }

        .scroll-line {
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, rgba(34, 211, 238, .6), transparent);
            animation: scroll-drop 1.8s ease-in-out 1.6s infinite;
        }

        @keyframes scroll-drop {
            0% {
                transform: scaleY(0);
                transform-origin: top;
                opacity: 1;
            }

            50% {
                transform: scaleY(1);
                transform-origin: top;
                opacity: 1;
            }

            100% {
                transform: scaleY(1);
                transform-origin: bottom;
                opacity: 0;
            }
        }

        /* ══ FEATURES ══ */
        .features {
            padding: 90px 0;
            background: var(--surface);
            transition: background .35s;
        }

        .fh {
            text-align: center;
            margin-bottom: 56px;
        }

        .fh .sec-sub {
            margin: 0 auto;
        }

        .f-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
        }

        .fc {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--r);
            padding: 32px 26px;
            transition: border-color .25s, transform .25s, background .35s;
        }

        .fc:hover {
            border-color: rgba(34, 211, 238, .18);
            transform: translateY(-4px);
        }

        .fc-num {
            font-family: 'Montserrat', sans-serif;
            font-size: .72rem;
            font-weight: 700;
            letter-spacing: .12em;
            color: var(--muted);
            margin-bottom: 18px;
        }

        .fc-ic {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        .fc-ic.c {
            background: rgba(34, 211, 238, .1);
            color: var(--cyan);
        }

        .fc-ic.v {
            background: rgba(129, 140, 248, .1);
            color: var(--violet);
        }

        .fc-ic.g {
            background: rgba(52, 211, 153, .1);
            color: var(--green);
        }

        .fc h3 {
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: var(--text);
        }

        .fc p {
            color: var(--muted);
            font-size: .88rem;
            line-height: 1.65;
        }

        /* ══ STATS ══ */
        .stats {
            padding: 72px 0;
            background: var(--bg);
            transition: background .35s;
        }

        .sg-wrap {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border: 1px solid var(--border);
            border-radius: var(--r);
            overflow: hidden;
        }

        .sg {
            padding: 40px 24px;
            text-align: center;
            border-right: 1px solid var(--border);
            transition: background .2s;
        }

        .sg:last-child {
            border-right: none;
        }

        .sg:hover {
            background: var(--surface);
        }

        .sg-n {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(2rem, 3.5vw, 3rem);
            font-weight: 800;
            line-height: 1;
            margin-bottom: 8px;
        }

        .cn {
            color: var(--cyan);
        }

        .cv {
            color: var(--violet);
        }

        .cg {
            color: var(--green);
        }

        .cp {
            color: #f472b6;
        }

        .sg p {
            color: var(--muted);
            font-size: .83rem;
        }

        /* ══ HOW IT WORKS ══ */
        .how {
            padding: 90px 0;
            background: var(--surface);
            transition: background .35s;
        }

        .how-grid {
            display: grid;
            grid-template-columns: 1fr 1.05fr;
            gap: 72px;
            align-items: start;
        }

        .steps {
            padding-left: 32px;
            position: relative;
            margin-top: 36px;
        }

        .steps::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 8px;
            bottom: 8px;
            width: 1px;
            background: linear-gradient(to bottom, var(--cyan), var(--violet), transparent);
        }

        .step {
            position: relative;
            padding-bottom: 30px;
        }

        .step:last-child {
            padding-bottom: 0;
        }

        .step-n {
            position: absolute;
            left: -32px;
            top: 2px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1px solid var(--cyan);
            background: var(--bg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .62rem;
            font-weight: 700;
            color: var(--cyan);
            transition: background .2s, color .2s;
        }

        .step:hover .step-n {
            background: var(--cyan);
            color: var(--bg);
        }

        .step h4 {
            font-family: 'Montserrat', sans-serif;
            font-size: .95rem;
            font-weight: 700;
            margin-bottom: 5px;
            color: var(--text);
        }

        .step p {
            color: var(--muted);
            font-size: .85rem;
            line-height: 1.6;
        }

        .hv {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--r);
            padding: 28px;
            position: relative;
            transition: background .35s;
        }

        .hv::before {
            content: '';
            position: absolute;
            top: 0;
            left: 12%;
            right: 12%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--violet), transparent);
        }

        .pv-l {
            font-size: .72rem;
            font-weight: 700;
            letter-spacing: .1em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 18px;
        }

        .pi {
            margin-bottom: 16px;
        }

        .pi:last-child {
            margin-bottom: 0;
        }

        .pi-h {
            display: flex;
            justify-content: space-between;
            font-size: .8rem;
            color: var(--muted);
            margin-bottom: 6px;
        }

        .pi-h b {
            color: var(--text);
            font-weight: 600;
        }

        .pi-b {
            height: 5px;
            background: rgba(255, 255, 255, .06);
            border-radius: 5px;
            overflow: hidden;
        }

        [data-theme="light"] .pi-b {
            background: rgba(0, 0, 0, .07);
        }

        .pi-f {
            height: 100%;
            border-radius: 5px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 1.1s cubic-bezier(.16, 1, .3, 1);
        }

        .pi-f.on {
            transform: scaleX(1);
        }

        .pf-c {
            background: linear-gradient(90deg, var(--cyan), #67e8f9);
        }

        .pf-v {
            background: linear-gradient(90deg, var(--violet), #a5b4fc);
        }

        .pf-g {
            background: linear-gradient(90deg, var(--green), #6ee7b7);
        }

        .pf-p {
            background: linear-gradient(90deg, #f472b6, #fda4af);
        }

        .af {
            border-top: 1px solid var(--border);
            padding-top: 18px;
            margin-top: 22px;
        }

        .ar {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 7px 0;
            border-bottom: 1px solid var(--border);
            font-size: .8rem;
            color: var(--text);
        }

        .ar:last-child {
            border-bottom: none;
        }

        .ad {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .at {
            flex: 1;
        }

        .am {
            color: var(--muted);
            font-size: .72rem;
        }

        /* ══ CTA ══ */
        .cta-s {
            padding: 90px 0;
            background: var(--bg);
            transition: background .35s;
        }

        .cta-b {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 22px;
            padding: 64px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
            transition: background .35s, border-color .35s;
        }

        .cta-b::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
                radial-gradient(ellipse 50% 60% at 0% 50%, rgba(34, 211, 238, .05) 0%, transparent 70%),
                radial-gradient(ellipse 50% 60% at 100% 50%, rgba(129, 140, 248, .05) 0%, transparent 70%);
        }

        .cta-b::after {
            content: '';
            position: absolute;
            top: 0;
            left: 15%;
            right: 15%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent);
        }

        .cta-b .sec-sub {
            margin: 0 auto 36px;
        }

        .cta-b .btn-row {
            justify-content: center;
        }

        /* ══ RESPONSIVE ══ */
        @media(max-width:1024px) {
            .f-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .how-grid {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }

        @media(max-width:768px) {
            .hero {
                padding: 80px 0 60px;
                min-height: auto;
            }

            .hero-grid {
                grid-template-columns: 1fr;
                gap: 24px;
            }

            .hero-title {
                font-size: 2.3rem;
            }

            .hero-card {
                max-width: 100%;
            }

            .f-grid {
                grid-template-columns: 1fr;
            }

            .sg-wrap {
                grid-template-columns: repeat(2, 1fr);
            }

            .sg {
                border-bottom: 1px solid var(--border);
            }

            .cta-b {
                padding: 44px 22px;
            }
        }

        @media(max-width:600px) {
            .btn-row {
                gap: 10px;
            }

            .btn-p,
            .btn-g {
                padding: 11px 18px;
                font-size: .86rem;
            }

            .hero {
                padding: 72px 0 48px;
            }

            .hero-title {
                font-size: 1.9rem;
            }

            .hero-sub {
                font-size: .9rem;
                margin-bottom: 24px;
            }

            .hero-card {
                padding: 18px;
            }

            .mini-stats {
                gap: 7px;
            }

            .ms {
                padding: 11px 6px;
            }

            .ms-n {
                font-size: 1.15rem;
            }

            .ms-l {
                font-size: .62rem;
            }

            .fi {
                padding: 10px 12px;
            }

            .sg-wrap {
                grid-template-columns: repeat(2, 1fr);
            }

            .cta-b {
                padding: 36px 16px;
            }
        }

        @media(max-width:400px) {
            .hero-title {
                font-size: 1.7rem;
            }

            .ms-n {
                font-size: 1rem;
            }
        }

        ::-webkit-scrollbar {
            width: 5px;
        }

        ::-webkit-scrollbar-track {
            background: var(--bg);
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(34, 211, 238, .2);
            border-radius: 5px;
        }
    </style>
@endpush

@section('content')
    <div class="dot-bg"></div>

    {{-- ══ HERO ══ --}}
    <section class="hero">
        <div class="hero-bg"></div>
        <div class="wrap" style="width:100%">
            <div class="hero-grid">

                {{-- Text --}}
                <div>
                    <div class="hero-tag">Pekanbaru</div>
                    <h1 class="hero-title">
                        <span class="tl"><span class="tl-inner">Tertarik Menjadi Pelanggan</span></span>
                        <span class="tl"><span class="tl-inner"><span
                                    class="hero-accent-line grad">Pekanbaru?</span></span></span>
                    </h1>
                    <p class="hero-sub">Kami menyediakan layanan pengujian, inspeksi, sertifikasi, dan konsultasi teknis
                        terintegrasi untuk mendukung kebutuhan operasional dan kepatuhan regulasi bisnis Anda.</p>
                    <div class="btn-row hero-btns">
                        <a href="{{ route('landing.track') }}" class="btn-p"><i class="fas fa-search"></i> Lacak
                            Permohonan</a>
                        @auth
                            @php $dr = match (strtolower(auth()->user()->department ?? 'umum')) { 'operasional' => 'ops.dashboard', default => 'dashboard.indexumum'}; @endphp
                            <a href="{{ route($dr) }}" class="btn-g"><i class="fas fa-gauge"></i> Dashboard</a>
                        @else
                            <a href="{{ route('login') }}" class="btn-g"><i class="fas fa-sign-in-alt"></i> Login</a>
                        @endauth
                    </div>
                </div>

                {{-- Card --}}
                <div>
                    <div class="hero-card">
                        <div class="mini-stats">
                            <div class="ms">
                                <div class="ms-n">500+</div>
                                <div class="ms-l">Permohonan</div>
                            </div>
                            <div class="ms">
                                <div class="ms-n">98%</div>
                                <div class="ms-l">On-time</div>
                            </div>
                            <div class="ms">
                                <div class="ms-n">24/7</div>
                                <div class="ms-l">Uptime</div>
                            </div>
                        </div>
                        <div class="fi">
                            <div class="fi-ic ic-c"><i class="fas fa-flask"></i></div>
                            <div>
                                <div class="fi-name">Layanan Pengujian</div>
                                <div class="fi-desc">Laboratorium terakreditasi</div>
                            </div>
                        </div>
                        <div class="fi">
                            <div class="fi-ic ic-v"><i class="fas fa-clipboard-check"></i></div>
                            <div>
                                <div class="fi-name">Inspeksi & Sertifikasi</div>
                                <div class="fi-desc">Sesuai standar nasional & internasional</div>
                            </div>
                        </div>
                        <div class="fi">
                            <div class="fi-ic ic-g"><i class="fas fa-handshake"></i></div>
                            <div>
                                <div class="fi-name">Konsultasi Teknis</div>
                                <div class="fi-desc">Pendampingan ahli berpengalaman</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-hint">
            <div class="scroll-line"></div>Scroll
        </div>
    </section>

    {{-- ══ FEATURES ══ --}}
    <section class="features">
        <div class="wrap">
            <div class="fh">
                <div class="sec-label sr">Layanan Kami</div>
                <h2 class="sec-title sr d1">Solusi Terintegrasi<br>untuk Bisnis Anda</h2>
                <p class="sec-sub sr d2">Layanan komprehensif yang mendukung kelancaran operasional dan kepatuhan regulasi
                    perusahaan Anda.</p>
            </div>
            <div class="f-grid">
                <div class="fc sr">
                    <div class="fc-num">— 01</div>
                    <div class="fc-ic c"><i class="fas fa-flask"></i></div>
                    <h3>Pengujian Laboratorium</h3>
                    <p>Layanan pengujian kimia, fisika, mikrobiologi, dan lingkungan dengan laboratorium terakreditasi KAN
                        dan standar internasional.</p>
                </div>
                <div class="fc sr d1">
                    <div class="fc-num">— 02</div>
                    <div class="fc-ic v"><i class="fas fa-clipboard-check"></i></div>
                    <h3>Inspeksi & Sertifikasi</h3>
                    <p>Inspeksi independen dan sertifikasi produk, sistem manajemen, serta personel sesuai standar SNI, ISO,
                        dan regulasi terkait.</p>
                </div>
                <div class="fc sr d2">
                    <div class="fc-num">— 03</div>
                    <div class="fc-ic g"><i class="fas fa-chart-line"></i></div>
                    <h3>Monitoring PPBJ</h3>
                    <p>Sistem informasi pengadaan barang dan jasa terintegrasi dengan tracking real-time, monitoring SLA,
                        dan pelaporan otomatis.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ══ STATS ══ --}}
    <section class="stats">
        <div class="wrap">
            <div class="sg-wrap sr">
                <div class="sg">
                    <div class="sg-n cn">500+</div>
                    <p>Permohonan Diproses</p>
                </div>
                <div class="sg">
                    <div class="sg-n cv">98%</div>
                    <p>Ketepatan Waktu</p>
                </div>
                <div class="sg">
                    <div class="sg-n cg">24/7</div>
                    <p>Ketersediaan Sistem</p>
                </div>
                <div class="sg">
                    <div class="sg-n cp">50+</div>
                    <p>Klien Aktif</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ══ HOW IT WORKS ══ --}}
    <section class="how">
        <div class="wrap">
            <div class="how-grid">
                <div>
                    <div class="sec-label sr">Alur Layanan</div>
                    <h2 class="sec-title sr d1">Proses yang<br>Transparan</h2>
                    <p class="sec-sub sr d2">Setiap tahapan layanan terdokumentasi dan dapat dipantau secara real-time
                        melalui sistem informasi kami.</p>
                    <div class="steps sr d3">
                        <div class="step">
                            <div class="step-n">1</div>
                            <h4>Ajukan Permohonan</h4>
                            <p>Sampaikan kebutuhan pengujian, inspeksi, atau sertifikasi melalui sistem atau kontak
                                langsung.</p>
                        </div>
                        <div class="step">
                            <div class="step-n">2</div>
                            <h4>Verifikasi & Penawaran</h4>
                            <p>Tim kami memverifikasi kebutuhan dan menyusun penawaran teknis serta komersial yang
                                transparan.</p>
                        </div>
                        <div class="step">
                            <div class="step-n">3</div>
                            <h4>Pelaksanaan Layanan</h4>
                            <p>Pengerjaan dilakukan oleh tenaga ahli bersertifikat dengan proses yang terstandarisasi.</p>
                        </div>
                        <div class="step">
                            <div class="step-n">4</div>
                            <h4>Laporan & Sertifikat</h4>
                            <p>Dokumen hasil diserahkan tepat waktu dan tersimpan dalam sistem untuk kemudahan akses.</p>
                        </div>
                    </div>
                </div>
                <div class="hv sr d2">
                    <div class="pv-l">Performa Layanan</div>
                    <div class="pi">
                        <div class="pi-h"><span>Ketepatan Waktu Laporan</span><b>92%</b></div>
                        <div class="pi-b">
                            <div class="pi-f pf-c" style="width:92%"></div>
                        </div>
                    </div>
                    <div class="pi">
                        <div class="pi-h"><span>Kepuasan Pelanggan</span><b>87%</b></div>
                        <div class="pi-b">
                            <div class="pi-f pf-v" style="width:87%"></div>
                        </div>
                    </div>
                    <div class="pi">
                        <div class="pi-h"><span>Kepatuhan SLA</span><b>95%</b></div>
                        <div class="pi-b">
                            <div class="pi-f pf-g" style="width:95%"></div>
                        </div>
                    </div>
                    <div class="pi">
                        <div class="pi-h"><span>Akreditasi Terpenuhi</span><b>100%</b></div>
                        <div class="pi-b">
                            <div class="pi-f pf-p" style="width:100%"></div>
                        </div>
                    </div>
                    <div class="af">
                        <div class="pv-l" style="margin-bottom:10px">Aktivitas Terbaru</div>
                        <div class="ar"><span class="ad" style="background:var(--green)"></span><span class="at">Laporan
                                SNI-2024-089 diterbitkan</span><span class="am">2m lalu</span></div>
                        <div class="ar"><span class="ad" style="background:var(--cyan)"></span><span class="at">Permohonan
                                inspeksi baru diterima</span><span class="am">14m lalu</span></div>
                        <div class="ar"><span class="ad" style="background:var(--violet)"></span><span class="at">Pengujian
                                lab batch-045 selesai</span><span class="am">1j lalu</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ══ CTA ══ --}}
    <section class="cta-s">
        <div class="wrap">
            <div class="cta-b sr">
                <div class="sec-label" style="margin-bottom:12px">Hubungi Kami</div>
                <h2 class="sec-title" style="margin:0 auto 14px">Tertarik Menjadi<br>Pelanggan Pekanbaru?</h2>
                <p class="sec-sub" style="margin:0 auto 36px">Dapatkan layanan pengujian, inspeksi, sertifikasi, dan
                    konsultasi teknis terbaik dari tim ahli kami di Cabang Pekanbaru.</p>
                <div class="btn-row" style="justify-content:center">
                    <a href="{{ route('landing.contact') }}" class="btn-p"><i class="fas fa-envelope"></i> Hubungi Kami</a>
                    <a href="{{ route('landing.track') }}" class="btn-g"><i class="fas fa-search"></i> Lacak Permohonan</a>
                </div>
            </div>
        </div>
    </section>

@endsection

@push('scripts')
    <script>
        (function () {
            var io = new IntersectionObserver(function (e) {
                e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('show'); io.unobserve(x.target); } });
            }, { threshold: 0.08 });
            document.querySelectorAll('.sr').forEach(function (el) { io.observe(el); });

            var bio = new IntersectionObserver(function (e) {
                e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('on'); bio.unobserve(x.target); } });
            }, { threshold: 0.3 });
            document.querySelectorAll('.pi-f').forEach(function (b) { bio.observe(b); });
        })();
    </script>
@endpush
