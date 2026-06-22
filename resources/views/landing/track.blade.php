@extends('layouts.landing')

@section('title', 'Track PR - PPBJ Management System')

@push('styles')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet">

    <style>
        :root {
            --r: 16px;
            --green: #34d399;
            --amber: #fbbf24;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        /* Force dark everywhere — override the landing layout */
        html {
            background: var(--bg) !important;
        }

        body {
            background: var(--bg) !important;
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        main,
        #main,
        .main,
        [role="main"],
        .layout-content,
        .page-content,
        .content,
        section:not(.page-hero) {
            background: var(--bg);
        }

        h1,
        h2,
        h3,
        h4 {
            font-family: 'Syne', sans-serif;
        }

        /* Dot BG */
        .dot-bg {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, rgba(255, 255, 255, .04) 1px, transparent 1px);
            background-size: 28px 28px;
        }

        /* Page shell — dark from top to bottom */
        .page-shell {
            background: var(--bg);
            min-height: 100vh;
            position: relative;
            z-index: 1;
        }

        .wrap {
            max-width: 880px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        .wrap-lg {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        /* REVEAL */
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

        /* ══════════════ HERO ══════════════ */
        .page-hero {
            position: relative;
            overflow: hidden;
            padding: 110px 0 120px;
            text-align: center;
            background: transparent;
        }

        .page-hero-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-image: url('{{ asset("images/download.jpg") }}');
            background-size: cover;
            background-position: center 30%;
        }

        .page-hero-bg::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg,
                    rgba(8, 13, 26, .9) 0%,
                    rgba(8, 13, 26, .82) 55%,
                    rgba(8, 13, 26, 1) 100%);
        }

        .hero-inner {
            position: relative;
            z-index: 1;
        }

        .page-tag {
            display: inline-block;
            font-size: .72rem;
            font-weight: 700;
            letter-spacing: .18em;
            text-transform: uppercase;
            color: var(--cyan);
            margin-bottom: 14px;
        }

        .page-hero h1 {
            font-size: clamp(2.2rem, 4.5vw, 3.4rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -.03em;
            margin-bottom: 14px;
        }

        .grad {
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .page-hero p {
            color: rgba(226, 232, 240, .6);
            font-size: 1rem;
            max-width: 440px;
            margin: 0 auto 0;
            line-height: 1.75;
        }

        /* ══════════════ SEARCH CARD ══════════════ */
        .search-section {
            background: var(--bg);
            padding: 0 0 56px;
            position: relative;
            z-index: 2;
            margin-top: -56px;
        }

        .search-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 28px 32px;
            position: relative;
            overflow: visible;
            box-shadow: 0 24px 60px rgba(0, 0, 0, .5);
        }

        .search-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 10%;
            right: 10%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent);
        }

        .search-row {
            display: flex;
            gap: 12px;
        }

        .search-input-wrap {
            flex: 1;
            position: relative;
        }

        .search-ic {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--muted);
            pointer-events: none;
            font-size: .9rem;
        }

        .search-input {
            width: 100%;
            padding: 14px 16px 14px 44px;
            background: rgba(255, 255, 255, .04);
            border: 1px solid var(--border);
            border-radius: 12px;
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            font-size: .95rem;
            outline: none;
            transition: border-color .2s, background .2s;
        }

        .search-input::placeholder {
            color: var(--muted);
        }

        .search-input:focus {
            border-color: rgba(34, 211, 238, .4);
            background: rgba(34, 211, 238, .03);
        }

        .btn-track {
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 700;
            font-family: 'Syne', sans-serif;
            font-size: .93rem;
            color: #fff;
            border: none;
            cursor: pointer;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            transition: opacity .2s, transform .2s;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn-track:hover {
            opacity: .88;
            transform: translateY(-2px);
        }

        /* Suggest */
        #suggestBox {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: var(--card);
            border: 1px solid rgba(34, 211, 238, .2);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, .4);
            z-index: 100;
        }

        #suggestBox.hidden {
            display: none;
        }

        #suggestList {
            max-height: 280px;
            overflow-y: auto;
        }

        .suggest-row {
            width: 100%;
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border);
            background: transparent;
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            transition: background .15s;
            display: block;
        }

        .suggest-row:last-child {
            border-bottom: none;
        }

        .suggest-row:hover,
        .suggest-row.active {
            background: rgba(34, 211, 238, .06);
        }

        .suggest-pr {
            font-weight: 600;
            font-size: .9rem;
        }

        .suggest-sub {
            font-size: .75rem;
            color: var(--muted);
            margin-top: 2px;
        }

        .suggest-hint {
            padding: 10px 16px;
            font-size: .75rem;
            color: var(--muted);
            border-top: 1px solid var(--border);
        }

        /* Chips */
        .chips-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-top: 18px;
        }

        .chip-label {
            font-size: .78rem;
            color: var(--muted);
        }

        .chip {
            padding: 5px 12px;
            border-radius: 8px;
            font-size: .78rem;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid;
            transition: background .2s;
        }

        .chip-c {
            color: var(--cyan);
            border-color: rgba(34, 211, 238, .25);
            background: rgba(34, 211, 238, .07);
        }

        .chip-v {
            color: var(--violet);
            border-color: rgba(129, 140, 248, .25);
            background: rgba(129, 140, 248, .07);
        }

        .chip-c:hover {
            background: rgba(34, 211, 238, .15);
        }

        .chip-v:hover {
            background: rgba(129, 140, 248, .15);
        }

        .btn-info {
            margin-left: auto;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: .78rem;
            font-weight: 700;
            background: linear-gradient(130deg, #f59e0b, #f97316);
            color: #fff;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            transition: opacity .2s, transform .2s;
            position: relative;
        }

        .btn-info:hover {
            opacity: .88;
            transform: translateY(-1px);
        }

        .info-ping {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--rose);
        }

        .info-ping::before {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 50%;
            background: rgba(248, 113, 113, .5);
            animation: blink 1.8s ease-in-out infinite;
        }

        @keyframes blink {

            0%,
            100% {
                opacity: 1
            }

            50% {
                opacity: 0
            }
        }

        /* ══════════════ RESULT SECTION ══════════════ */
        .result-section {
            background: var(--bg);
            padding: 0 0 80px;
        }

        /* PR Info Card — premium */
        .pr-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }

        /* Gradient accent top bar */
        .pr-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--cyan), var(--violet), var(--green));
        }

        /* Decorative bg number */
        .pr-card::after {
            content: 'PR';
            position: absolute;
            right: 28px;
            top: 50%;
            transform: translateY(-50%);
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 6rem;
            line-height: 1;
            color: rgba(255, 255, 255, .025);
            pointer-events: none;
            letter-spacing: -.05em;
        }

        .pr-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 24px;
            gap: 16px;
            flex-wrap: wrap;
        }

        .pr-num-label {
            font-size: .68rem;
            font-weight: 700;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 6px;
        }

        .pr-num {
            font-size: clamp(1.4rem, 3vw, 2rem);
            font-weight: 800;
            letter-spacing: -.025em;
            line-height: 1;
        }

        .pr-badge {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: .78rem;
            font-weight: 700;
            white-space: nowrap;
            background: rgba(52, 211, 153, .1);
            border: 1px solid rgba(52, 211, 153, .25);
            color: var(--green);
        }

        .pr-badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--green);
            animation: blink 2s ease-in-out infinite;
        }

        .pr-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .pr-field {
            background: rgba(255, 255, 255, .02);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 14px 16px;
        }

        .pr-field-label {
            font-size: .68rem;
            font-weight: 700;
            letter-spacing: .1em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 5px;
        }

        .pr-field-val {
            font-size: .93rem;
            font-weight: 600;
        }

        /* ══════════════ TIMELINE CARD ══════════════ */
        .tl-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
        }

        .tl-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }

        .tl-header-ic {
            width: 40px;
            height: 40px;
            border-radius: 11px;
            flex-shrink: 0;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .9rem;
            color: #fff;
        }

        .tl-header h3 {
            font-size: 1.15rem;
            font-weight: 800;
        }

        /* TL Item */
        .tl-item {
            display: flex;
            gap: 0;
            position: relative;
            opacity: 0;
            transform: translateX(-14px);
            transition: opacity .5s ease, transform .5s ease;
        }

        .tl-item.show {
            opacity: 1;
            transform: none;
        }

        /* Time column */
        .tl-time {
            width: 100px;
            flex-shrink: 0;
            padding-right: 16px;
            padding-top: 10px;
            text-align: right;
        }

        .tl-time-val {
            font-size: .72rem;
            color: var(--muted);
            line-height: 1.5;
        }

        /* Spine */
        .tl-spine {
            width: 44px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .tl-dot {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            flex-shrink: 0;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .82rem;
            border: 2px solid;
            transition: transform .2s;
        }

        .tl-item:hover .tl-dot {
            transform: scale(1.1);
        }

        .td-done {
            background: rgba(52, 211, 153, .12);
            border-color: var(--green);
            color: var(--green);
        }

        .td-wait {
            background: rgba(251, 191, 36, .1);
            border-color: var(--amber);
            color: var(--amber);
        }

        .td-reject {
            background: rgba(248, 113, 113, .1);
            border-color: var(--rose);
            color: var(--rose);
        }

        .tl-line {
            flex: 1;
            width: 1px;
            min-height: 20px;
            background: linear-gradient(to bottom, var(--border), transparent);
        }

        /* Body */
        .tl-body {
            flex: 1;
            padding: 0 0 24px 16px;
        }

        .tl-body-inner {
            background: rgba(255, 255, 255, .025);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 18px 22px;
            transition: border-color .2s, background .2s, transform .2s;
        }

        .tl-item:hover .tl-body-inner {
            border-color: rgba(34, 211, 238, .14);
            background: rgba(34, 211, 238, .025);
            transform: translateX(3px);
        }

        .tl-title {
            font-weight: 700;
            font-size: .97rem;
            margin-bottom: 7px;
        }

        .tl-desc {
            font-size: .85rem;
            color: var(--muted);
            line-height: 1.75;
        }

        .tl-desc strong {
            color: var(--text);
            font-weight: 600;
        }

        .tl-status {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 12px;
            padding: 4px 12px;
            border-radius: 999px;
            font-size: .72rem;
            font-weight: 700;
        }

        .ts-done {
            background: rgba(52, 211, 153, .1);
            border: 1px solid rgba(52, 211, 153, .2);
            color: var(--green);
        }

        .ts-wait {
            background: rgba(251, 191, 36, .1);
            border: 1px solid rgba(251, 191, 36, .2);
            color: var(--amber);
        }

        .ts-rej {
            background: rgba(248, 113, 113, .1);
            border: 1px solid rgba(248, 113, 113, .2);
            color: var(--rose);
        }

        /* Action buttons */
        .action-row {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 24px;
        }

        .btn-sec {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: .9rem;
            text-decoration: none;
            cursor: pointer;
            border: none;
            transition: background .2s, transform .2s;
            font-family: 'DM Sans', sans-serif;
        }

        .btn-back {
            background: rgba(255, 255, 255, .05);
            color: var(--text);
            border: 1px solid var(--border);
        }

        .btn-back:hover {
            background: rgba(255, 255, 255, .09);
            transform: translateY(-2px);
        }

        .btn-print {
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            color: #fff;
        }

        .btn-print:hover {
            opacity: .88;
            transform: translateY(-2px);
        }

        /* ══════════════ NOT FOUND ══════════════ */
        .not-found {
            max-width: 640px;
            margin: 0 auto 72px;
            background: var(--card);
            border: 1px solid rgba(251, 191, 36, .2);
            border-radius: var(--r);
            padding: 48px;
            text-align: center;
        }

        .nf-ic {
            width: 64px;
            height: 64px;
            background: rgba(251, 191, 36, .1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 18px;
            color: var(--amber);
            font-size: 1.5rem;
        }

        .not-found h3 {
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 10px;
        }

        .not-found p {
            color: var(--muted);
            font-size: .9rem;
            line-height: 1.7;
        }

        /* ══════════════ HOW-TO ══════════════ */
        .how-section {
            background: var(--bg);
            padding: 72px 0 88px;
        }

        .how-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            margin-top: 40px;
        }

        .how-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--r);
            padding: 28px 22px;
            text-align: center;
            transition: border-color .25s, transform .25s;
        }

        .how-card:hover {
            border-color: rgba(34, 211, 238, .2);
            transform: translateY(-4px);
        }

        .how-num {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            margin: 0 auto 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1rem;
        }

        .hn1 {
            background: rgba(34, 211, 238, .12);
            color: var(--cyan);
        }

        .hn2 {
            background: rgba(129, 140, 248, .12);
            color: var(--violet);
        }

        .hn3 {
            background: rgba(52, 211, 153, .12);
            color: var(--green);
        }

        .how-card h4 {
            font-size: .97rem;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .how-card p {
            color: var(--muted);
            font-size: .85rem;
            line-height: 1.6;
        }

        /* ══════════════ INFO MODAL ══════════════ */
        .modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 999;
            background: rgba(0, 0, 0, .75);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-overlay.open {
            display: flex;
        }

        .modal-box {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 22px;
            max-width: 820px;
            width: 100%;
            overflow: hidden;
            animation: pop .35s cubic-bezier(.16, 1, .3, 1);
        }

        @keyframes pop {
            from {
                opacity: 0;
                transform: scale(.94) translateY(14px)
            }

            to {
                opacity: 1;
                transform: none
            }
        }

        .modal-head {
            padding: 24px 28px;
            background: linear-gradient(130deg, rgba(34, 211, 238, .1), rgba(129, 140, 248, .1));
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }

        .modal-head-left {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .modal-head-ic {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            flex-shrink: 0;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            color: #fff;
        }

        .modal-head h3 {
            font-size: 1.1rem;
            font-weight: 800;
        }

        .modal-head p {
            font-size: .8rem;
            color: var(--muted);
            margin-top: 2px;
        }

        .btn-close {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid var(--border);
            background: rgba(255, 255, 255, .05);
            color: var(--muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .85rem;
            transition: background .2s, color .2s, transform .25s;
        }

        .btn-close:hover {
            background: rgba(255, 255, 255, .1);
            color: var(--text);
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 24px 28px;
            max-height: 62vh;
            overflow-y: auto;
        }

        .modal-body

        /* ── Kill white backgrounds only — DO NOT touch padding ── */
        /* Only force dark bg, never override padding (that breaks navbar offset) */
        main,
        #main,
        #app,
        .main-content,
        .content-wrapper {
            background: var(--bg) !important;
        }

        .page-shell {
            background: var(--bg);
        }

        /* ══ LIGHT MODE overrides (token-based) ══ */
        [data-theme="light"] .page-shell,
        [data-theme="light"] main,
        [data-theme="light"] section {
            background: var(--bg) !important;
        }

        [data-theme="light"] .page-hero-bg::after,
        [data-theme="light"] .about-hero-bg::after {
            background: linear-gradient(180deg,
                    rgba(255, 255, 255, .88) 0%,
                    rgba(255, 255, 255, .80) 55%,
                    rgba(255, 255, 255, 1) 100%) !important;
        }

        [data-theme="light"] .hero-bg::after {
            background: linear-gradient(135deg,
                    rgba(255, 255, 255, .92) 0%,
                    rgba(255, 255, 255, .78) 60%,
                    rgba(248, 250, 252, .92) 100%) !important;
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
            background: rgba(0, 0, 0, .04) !important;
            border-color: var(--border) !important;
            color: var(--text) !important;
        }

        [data-theme="light"] .tl-body-inner {
            background: rgba(0, 0, 0, .025) !important;
        }

        [data-theme="light"] .pr-field {
            background: rgba(0, 0, 0, .03) !important;
            border-color: var(--border) !important;
        }

        [data-theme="light"] .prog-step {
            background: rgba(0, 0, 0, .02) !important;
        }

        [data-theme="light"] .cta-b {
            background: var(--card) !important;
        }

        [data-theme="light"] .sg {
            background: transparent !important;
        }

        [data-theme="light"] .features,
        [data-theme="light"] .how-section,
        [data-theme="light"] .stats-s,
        [data-theme="light"] .about-vals,
        [data-theme="light"] .about-vm {
            background: var(--surface) !important;
        }

        [data-theme="light"] .hero-card {
            background: rgba(255, 255, 255, .9) !important;
            backdrop-filter: blur(16px);
        }

        [data-theme="light"] .modal-box,
        [data-theme="light"] #suggestBox {
            background: var(--card) !important;
        }

        [data-theme="light"] .suggest-row {
            color: var(--text) !important;
        }

        [data-theme="light"] .suggest-row:hover {
            background: rgba(0, 0, 0, .04) !important;
        }

        [data-theme="light"] .dot-bg {
            opacity: 0.6;
        }

        [data-theme="light"] .sec-label,
        [data-theme="light"] .page-tag {
            color: var(--cyan) !important;
        }

        [data-theme="light"] h1,
        [data-theme="light"] h2,
        [data-theme="light"] h3,
        [data-theme="light"] h4 {
            color: var(--text) !important;
        }

        [data-theme="light"] p,
        [data-theme="light"] li {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .hero-title,
        [data-theme="light"] .page-hero h1 {
            color: var(--text) !important;
        }

        [data-theme="light"] .hero-sub,
        [data-theme="light"] .page-hero p {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .ms-l,
        [data-theme="light"] .fi-desc,
        [data-theme="light"] .fc p,
        [data-theme="light"] .tl-desc,
        [data-theme="light"] .pr-num-label,
        [data-theme="light"] .pr-field-label,
        [data-theme="light"] .tl-time-val {
            color: var(--muted) !important;
        }

        [data-theme="light"] .pr-num,
        [data-theme="light"] .fi-name,
        [data-theme="light"] .fc h3,
        [data-theme="light"] .tl-title,
        [data-theme="light"] .pr-field-val {
            color: var(--text) !important;
        }

        [data-theme="light"] .nav-link {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .nav-link:hover,
        [data-theme="light"] .nav-link.active {
            color: var(--cyan) !important;
        }

        [data-theme="light"] .grad {
            background: linear-gradient(130deg, var(--cyan), var(--violet)) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }

        [data-theme="light"] .ms-n {
            -webkit-text-fill-color: var(--cyan) !important;
            background: none !important;
            color: var(--cyan) !important;
        }

        ::-webkit-scrollbar {
            width: 5px;
        }

        .modal-body::-webkit-scrollbar-track {
            background: transparent;
        }

        .modal-body::-webkit-scrollbar-thumb {
            background: rgba(34, 211, 238, .2);
            border-radius: 5px;
        }

        .prog-step {
            display: flex;
            gap: 16px;
            padding: 16px;
            border-radius: 14px;
            margin-bottom: 10px;
            border-left: 3px solid;
            border-top: 1px solid var(--border);
            border-right: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
            transition: transform .2s;
        }

        .prog-step:hover {
            transform: translateX(4px);
        }

        .prog-step:last-child {
            margin-bottom: 0;
        }

        .prog-step.p0 {
            border-left-color: var(--muted);
            background: rgba(100, 116, 139, .04);
        }

        .prog-step.p20 {
            border-left-color: var(--rose);
            background: rgba(248, 113, 113, .04);
        }

        .prog-step.p40 {
            border-left-color: var(--amber);
            background: rgba(251, 191, 36, .04);
        }

        .prog-step.p60 {
            border-left-color: var(--cyan);
            background: rgba(34, 211, 238, .04);
        }

        .prog-step.p80 {
            border-left-color: var(--violet);
            background: rgba(129, 140, 248, .04);
        }

        .prog-step.p100 {
            border-left-color: var(--green);
            background: rgba(52, 211, 153, .04);
        }

        .prog-badge {
            width: 52px;
            height: 52px;
            border-radius: 13px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: .88rem;
        }

        .pb0 {
            background: rgba(100, 116, 139, .15);
            color: var(--muted);
        }

        .pb20 {
            background: rgba(248, 113, 113, .15);
            color: var(--rose);
        }

        .pb40 {
            background: rgba(251, 191, 36, .15);
            color: var(--amber);
        }

        .pb60 {
            background: rgba(34, 211, 238, .15);
            color: var(--cyan);
        }

        .pb80 {
            background: rgba(129, 140, 248, .15);
            color: var(--violet);
        }

        .pb100 {
            background: rgba(52, 211, 153, .15);
            color: var(--green);
        }

        .prog-info h4 {
            font-size: .93rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .prog-info p {
            font-size: .83rem;
            color: var(--muted);
            line-height: 1.6;
        }

        .prog-sub {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: .72rem;
            margin-top: 7px;
        }

        .tips-box {
            background: rgba(34, 211, 238, .05);
            border: 1px solid rgba(34, 211, 238, .15);
            border-radius: 12px;
            padding: 18px 20px;
            margin-top: 20px;
            display: flex;
            gap: 14px;
        }

        .tips-box ul {
            list-style: none;
        }

        .tips-box li {
            font-size: .83rem;
            color: var(--muted);
            line-height: 1.65;
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }

        .tips-box li::before {
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--cyan);
            flex-shrink: 0;
            margin-top: 7px;
        }

        .modal-foot {
            padding: 18px 28px;
            border-top: 1px solid var(--border);
        }

        .btn-understand {
            width: 100%;
            padding: 13px;
            border-radius: 12px;
            font-family: 'Syne', sans-serif;
            font-weight: 700;
            font-size: .95rem;
            cursor: pointer;
            border: none;
            color: #fff;
            background: linear-gradient(130deg, var(--cyan), var(--violet));
            transition: opacity .2s, transform .2s;
        }

        .btn-understand:hover {
            opacity: .88;
            transform: translateY(-1px);
        }

        /* ══════════════ RESPONSIVE ══════════════ */
        @media(max-width:768px) {
            .search-row {
                flex-direction: column;
            }

            .pr-grid {
                grid-template-columns: 1fr;
            }

            .tl-time {
                display: none;
            }

            .how-grid {
                grid-template-columns: 1fr;
            }

            .action-row {
                flex-direction: column;
                align-items: stretch;
            }

            .chips-row {
                flex-wrap: wrap;
            }

            .btn-info {
                margin-left: 0;
            }
        }

        @media(max-width:480px) {

            .search-card,
            .pr-card,
            .tl-card {
                padding: 22px 18px;
            }

            .modal-head,
            .modal-body,
            .modal-foot {
                padding-left: 18px;
                padding-right: 18px;
            }
        }


        /* ── Kill white backgrounds only — DO NOT touch padding ── */
        html {
            background: var(--bg) !important;
        }

        body {
            margin: 0 !important;
            padding: 0 !important;
            background: var(--bg) !important;
        }

        /* Only force dark bg, never override padding (that breaks navbar offset) */
        main,
        #main,
        #app,
        .main-content,
        .content-wrapper {
            background: var(--bg) !important;
        }

        .page-shell {
            background: var(--bg);
        }

        /* ══ LIGHT MODE overrides (token-based) ══ */
        [data-theme="light"] .page-shell,
        [data-theme="light"] main,
        [data-theme="light"] section {
            background: var(--bg) !important;
        }

        [data-theme="light"] .page-hero-bg::after,
        [data-theme="light"] .about-hero-bg::after {
            background: linear-gradient(180deg,
                    rgba(255, 255, 255, .88) 0%,
                    rgba(255, 255, 255, .80) 55%,
                    rgba(255, 255, 255, 1) 100%) !important;
        }

        [data-theme="light"] .hero-bg::after {
            background: linear-gradient(135deg,
                    rgba(255, 255, 255, .92) 0%,
                    rgba(255, 255, 255, .78) 60%,
                    rgba(248, 250, 252, .92) 100%) !important;
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
            background: rgba(0, 0, 0, .04) !important;
            border-color: var(--border) !important;
            color: var(--text) !important;
        }

        [data-theme="light"] .tl-body-inner {
            background: rgba(0, 0, 0, .025) !important;
        }

        [data-theme="light"] .pr-field {
            background: rgba(0, 0, 0, .03) !important;
            border-color: var(--border) !important;
        }

        [data-theme="light"] .prog-step {
            background: rgba(0, 0, 0, .02) !important;
        }

        [data-theme="light"] .cta-b {
            background: var(--card) !important;
        }

        [data-theme="light"] .sg {
            background: transparent !important;
        }

        [data-theme="light"] .features,
        [data-theme="light"] .how-section,
        [data-theme="light"] .stats-s,
        [data-theme="light"] .about-vals,
        [data-theme="light"] .about-vm {
            background: var(--surface) !important;
        }

        [data-theme="light"] .hero-card {
            background: rgba(255, 255, 255, .9) !important;
            backdrop-filter: blur(16px);
        }

        [data-theme="light"] .modal-box,
        [data-theme="light"] #suggestBox {
            background: var(--card) !important;
        }

        [data-theme="light"] .suggest-row {
            color: var(--text) !important;
        }

        [data-theme="light"] .suggest-row:hover {
            background: rgba(0, 0, 0, .04) !important;
        }

        [data-theme="light"] .dot-bg {
            opacity: 0.6;
        }

        [data-theme="light"] .sec-label,
        [data-theme="light"] .page-tag {
            color: var(--cyan) !important;
        }

        [data-theme="light"] h1,
        [data-theme="light"] h2,
        [data-theme="light"] h3,
        [data-theme="light"] h4 {
            color: var(--text) !important;
        }

        [data-theme="light"] p,
        [data-theme="light"] li {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .hero-title,
        [data-theme="light"] .page-hero h1 {
            color: var(--text) !important;
        }

        [data-theme="light"] .hero-sub,
        [data-theme="light"] .page-hero p {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .ms-l,
        [data-theme="light"] .fi-desc,
        [data-theme="light"] .fc p,
        [data-theme="light"] .tl-desc,
        [data-theme="light"] .pr-num-label,
        [data-theme="light"] .pr-field-label,
        [data-theme="light"] .tl-time-val {
            color: var(--muted) !important;
        }

        [data-theme="light"] .pr-num,
        [data-theme="light"] .fi-name,
        [data-theme="light"] .fc h3,
        [data-theme="light"] .tl-title,
        [data-theme="light"] .pr-field-val {
            color: var(--text) !important;
        }

        [data-theme="light"] .nav-link {
            color: var(--text-2) !important;
        }

        [data-theme="light"] .nav-link:hover,
        [data-theme="light"] .nav-link.active {
            color: var(--cyan) !important;
        }

        [data-theme="light"] .grad {
            background: linear-gradient(130deg, var(--cyan), var(--violet)) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }

        [data-theme="light"] .ms-n {
            -webkit-text-fill-color: var(--cyan) !important;
            background: none !important;
            color: var(--cyan) !important;
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

        @media print {

            nav,
            footer,
            .search-section,
            .action-row,
            .modal-overlay,
            .dot-bg {
                display: none !important;
            }

            .page-hero {
                display: none !important;
            }

            .pr-card,
            .tl-card {
                background: #fff !important;
                color: #000 !important;
                border: 1px solid #ddd !important;
            }
        }
    </style>
@endpush

@section('content')

    {{-- Wrap everything in dark shell --}}
    <div class="page-shell">
        <div class="dot-bg"></div>

        {{-- ═══ HERO ═══ --}}
        <section class="page-hero">
            <div class="page-hero-bg"></div>
            <div class="wrap-lg hero-inner">
                <div class="page-tag sr">Monitoring Real-time</div>
                <h1 class="sr d1">Track <span class="grad">Purchase Request</span></h1>
                <p class="sr d2">Monitor status dan progres pengadaan Anda secara langsung tanpa perlu login.</p>
            </div>
        </section>

        {{-- ═══ SEARCH ═══ --}}
        <section class="search-section">
            <div class="wrap">
                <div class="search-card sr">
                    <form method="GET" action="{{ route('landing.track') }}" autocomplete="off">
                        <div class="search-row">
                            <div class="search-input-wrap">
                                <span class="search-ic"><i class="fas fa-search"></i></span>
                                <input type="text" id="qInput" name="q" value="{{ $keyword }}"
                                    placeholder="Masukkan Nomor PR (contoh: 0021/26)" class="search-input" autofocus>
                                <div id="suggestBox" class="hidden">
                                    <div id="suggestList"></div>
                                    <div id="suggestHint" class="suggest-hint">Ketik minimal 2 karakter...</div>
                                </div>
                            </div>
                            <button type="submit" class="btn-track">
                                <i class="fas fa-search"></i> Track
                            </button>
                        </div>
                    </form>
                    <div class="chips-row">
                        <span class="chip-label">Contoh:</span>
                        <button type="button" onclick="searchPr('0021/26')" class="chip chip-c">0021/26</button>
                        <button type="button" onclick="searchPr('PR-2024-001')" class="chip chip-v">PR-2024-001</button>
                        <button type="button" onclick="toggleModal()" class="btn-info">
                            <span class="info-ping"></span>
                            <i class="fas fa-lightbulb"></i> Info Progress
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {{-- ═══ NOT FOUND ═══ --}}
        @if($keyword && !$row)
            <section class="result-section">
                <div class="wrap">
                    <div class="not-found sr">
                        <div class="nf-ic"><i class="fas fa-search"></i></div>
                        <h3>PR Tidak Ditemukan</h3>
                        <p>PR dengan nomor <strong style="color:var(--text)">{{ $keyword }}</strong> tidak ditemukan dalam
                            sistem.<br>Pastikan nomor PR sudah benar atau hubungi admin.</p>
                    </div>
                </div>
            </section>
        @endif

        {{-- ═══ RESULT ═══ --}}
        @if($row)
            @php
                $events = [];

                // 1. PR Dibuat
                if ($row->nomor_pr && $row->tanggal_pr) {
                    $desc = 'PR telah dibuat oleh: <strong>' . e($row->createdBy?->name ?? 'Tidak Diketahui') . '</strong>';
                    if ($row->jumlah_pr) {
                        $desc .= '<br><strong>Jumlah PR:</strong> Rp ' . number_format($row->jumlah_pr, 0, ',', '.');
                    }
                    $events[] = [
                        'time' => optional($row->tanggal_pr)->format('d M Y H:i') ?? '-',
                        'title' => 'PR Dibuat',
                        'desc' => $desc,
                        'icon' => 'fa-file-alt',
                        'type' => 'done',
                    ];
                }

                // 2. TTD Kabid
                if ($row->tgl_ttd_kabid_pr) {
                    $signerName = $row->signed_by_kabid_name ?? 'Kepala Bidang';
                    $method = is_null($row->sign_token_kabid) ? 'via QR' : 'Manual';
                    $events[] = [
                        'time' => $row->tgl_ttd_kabid_pr->format('d M Y H:i'),
                        'title' => 'Disetujui Kepala Bidang',
                        'desc' => '<strong>Penandatangan:</strong> ' . e($signerName) . ' <span style="color:var(--muted);font-size:.78rem">(' . $method . ')</span>',
                        'icon' => 'fa-user-check',
                        'type' => 'done',
                    ];
                }

                // 3. TTD Kacab
                if ($row->tgl_ttd_kacab_pr) {
                    $signerName = $row->signed_by_kacab_name ?? 'Kepala Cabang';
                    $method = is_null($row->sign_token_kacab) ? 'via QR' : 'Manual';
                    $events[] = [
                        'time' => $row->tgl_ttd_kacab_pr->format('d M Y H:i'),
                        'title' => 'Disetujui Kepala Cabang',
                        'desc' => '<strong>Penandatangan:</strong> ' . e($signerName) . ' <span style="color:var(--muted);font-size:.78rem">(' . $method . ')</span>',
                        'icon' => 'fa-user-tie',
                        'type' => 'done',
                    ];
                }

                $latest = $row->latestReceiptApproval;

                // 4. PENDING
                if ($latest && $latest->status === 'PENDING') {
                    $reqAt = $latest->requested_at
                        ? \Carbon\Carbon::parse($latest->requested_at)->format('d M Y H:i')
                        : '-';
                    $events[] = [
                        'time' => $reqAt,
                        'title' => 'Menunggu Persetujuan Bagian Umum',
                        'desc' => 'Request dikirim oleh: <strong>' . e($latest->requested_name) . '</strong>',
                        'icon' => 'fa-clock',
                        'type' => 'wait',
                    ];
                }

                // 5. REJECTED
                if ($latest && $latest->status === 'REJECTED') {
                    $rejectedByName = $latest->rejectedBy?->name ?? 'Unknown';
                    $rejectedAt = $latest->rejected_at ?? $latest->approved_at ?? $latest->updated_at;
                    $events[] = [
                        'time' => optional($rejectedAt)->format('d M Y H:i') ?? '-',
                        'title' => 'Ditolak oleh Bagian Umum',
                        'desc' => '<strong>Ditolak oleh:</strong> ' . e($rejectedByName) . '<br><strong>Alasan:</strong> ' . e($latest->rejected_reason ?? 'Tidak ada alasan yang diberikan'),
                        'icon' => 'fa-times-circle',
                        'type' => 'reject',
                    ];
                }

                // 6. Diterima Umum
                if ($row->received_at) {
                    $approvedBy = $latest?->approvedBy?->name ?? $row->receivedByUmum?->name ?? 'Umum';
                    $events[] = [
                        'time' => $row->received_at->format('d M Y H:i'),
                        'title' => 'PR Diterima Bagian Umum',
                        'desc' => 'Diterima oleh: <strong>' . e($approvedBy) . '</strong>',
                        'icon' => 'fa-inbox',
                        'type' => 'done',
                    ];

                    // 7. PPBJ
                    $ppbj = \App\Models\Ppbj::where('ppbj_no', $row->nomor_pr)->first();
                    if ($ppbj) {
                        $descParts = [];
                        if ($ppbj->buyer) {
                            $descParts[] = '<strong>Buyer:</strong> ' . e($ppbj->buyer);
                        }
                        if ($ppbj->status_sla) {
                            $slaIcon = match ($ppbj->status_sla) {
                                'ON TRACK' => '🟢',
                                'WARNING' => '🟡',
                                'OVERDUE' => '🔴',
                                'CANCELLED' => '⚫',
                                default => '⚪',
                            };
                            $descParts[] = '<strong>Status SLA:</strong> ' . $slaIcon . ' ' . e($ppbj->status_sla);
                        }
                        if ($ppbj->sisa_target_sla !== null) {
                            $sisaText = $ppbj->sisa_target_sla > 0
                                ? $ppbj->sisa_target_sla . ' hari tersisa'
                                : '<span style="color:var(--rose)">Terlambat ' . abs($ppbj->sisa_target_sla) . ' hari</span>';
                            $descParts[] = '<strong>Sisa Target:</strong> ' . $sisaText;
                        }
                        if ($ppbj->metode_pengadaan) {
                            $descParts[] = '<strong>Metode:</strong> ' . e($ppbj->metode_pengadaan);
                        }
                        if ($ppbj->portofolio) {
                            $descParts[] = '<strong>Portfolio:</strong> ' . e($ppbj->portofolio);
                        }
                        if ($ppbj->cancel_reason) {
                            $descParts[] = '<strong>Alasan Cancel:</strong> ' . e($ppbj->cancel_reason);
                        }

                        $pType = $ppbj->progres == 100
                            ? 'done'
                            : ($ppbj->sisa_target_sla < 0 ? 'reject' : 'wait');

                        $events[] = [
                            'time' => $ppbj->updated_at->format('d M Y H:i'),
                            'title' => 'Progres PPBJ: ' . $ppbj->progres . '%',
                            'desc' => implode('<br>', $descParts),
                            'icon' => $ppbj->progres == 100 ? 'fa-check-double' : 'fa-spinner',
                            'type' => $pType,
                        ];
                    }
                }
            @endphp

            <section class="result-section">
                <div class="wrap">

                    {{-- PR Card --}}
                    <div class="pr-card sr">
                        <div class="pr-top">
                            <div>
                                <div class="pr-num-label">Nomor PR</div>
                                <div class="pr-num">{{ $row->nomor_pr }}</div>
                            </div>
                            <div class="pr-badge">
                                <span class="pr-badge-dot"></span> Active
                            </div>
                        </div>
                        <div class="pr-grid">
                            <div class="pr-field">
                                <div class="pr-field-label">Tujuan Pengadaan</div>
                                <div class="pr-field-val">{{ $row->tujuan_pengadaan ?? '-' }}</div>
                            </div>
                            <div class="pr-field">
                                <div class="pr-field-label">Tanggal PR</div>
                                <div class="pr-field-val">{{ $row->tanggal_pr ? $row->tanggal_pr->format('d M Y H:i') : '-' }}
                                </div>
                            </div>
                            @if($row->jumlah_pr)
                                <div class="pr-field">
                                    <div class="pr-field-label">Jumlah PR</div>
                                    <div class="pr-field-val" style="color:var(--cyan)">Rp
                                        {{ number_format($row->jumlah_pr, 0, ',', '.') }}</div>
                                </div>
                            @endif
                            <div class="pr-field">
                                <div class="pr-field-label">Dibuat Oleh</div>
                                <div class="pr-field-val">{{ $row->createdBy?->name ?? 'Tidak Diketahui' }}</div>
                            </div>
                        </div>
                    </div>

                    {{-- Timeline --}}
                    <div class="tl-card sr d1">
                        <div class="tl-header">
                            <div class="tl-header-ic"><i class="fas fa-history"></i></div>
                            <h3>Timeline Progress</h3>
                        </div>

                        @foreach($events as $i => $event)
                            @php
                                $dotClass = match ($event['type']) { 'wait' => 'td-wait', 'reject' => 'td-reject', default => 'td-done'};
                                $statClass = match ($event['type']) { 'wait' => 'ts-wait', 'reject' => 'ts-rej', default => 'ts-done'};
                                $statText = match ($event['type']) { 'wait' => '<i class="fas fa-hourglass-half"></i> Dalam Proses', 'reject' => '<i class="fas fa-times"></i> Ditolak', default => '<i class="fas fa-check"></i> Selesai'};
                            @endphp
                            <div class="tl-item" style="transition-delay:{{ $i * 0.09 }}s">
                                <div class="tl-time">
                                    <div class="tl-time-val">{{ $event['time'] }}</div>
                                </div>
                                <div class="tl-spine">
                                    <div class="tl-dot {{ $dotClass }}">
                                        <i class="fas {{ $event['icon'] }}"></i>
                                    </div>
                                    @if(!$loop->last)
                                        <div class="tl-line"></div>
                                    @endif
                                </div>
                                <div class="tl-body">
                                    <div class="tl-body-inner">
                                        <div class="tl-title">{{ $event['title'] }}</div>
                                        <div class="tl-desc">{!! $event['desc'] !!}</div>
                                        <span class="tl-status {{ $statClass }}">{!! $statText !!}</span>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    {{-- Actions --}}
                    <div class="action-row sr d2">
                        <a href="{{ route('landing.track') }}" class="btn-sec btn-back">
                            <i class="fas fa-arrow-left"></i> Cari PR Lain
                        </a>
                        <button onclick="window.print()" class="btn-sec btn-print">
                            <i class="fas fa-print"></i> Print Timeline
                        </button>
                    </div>

                </div>
            </section>
        @endif

        {{-- ═══ HOW-TO (no keyword) ═══ --}}
        @if(!$keyword)
            <section class="how-section">
                <div class="wrap-lg">
                    <div style="text-align:center">
                        <div class="sr"
                            style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--cyan);margin-bottom:10px">
                            Panduan</div>
                        <h2 class="sr d1"
                            style="font-family:'Syne',sans-serif;font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:800;letter-spacing:-.025em;margin-bottom:0">
                            Cara Tracking PR</h2>
                    </div>
                    <div class="how-grid">
                        <div class="how-card sr">
                            <div class="how-num hn1">1</div>
                            <h4>Masukkan Nomor PR</h4>
                            <p>Ketik nomor PR Anda di kolom pencarian di atas.</p>
                        </div>
                        <div class="how-card sr d1">
                            <div class="how-num hn2">2</div>
                            <h4>Klik Track</h4>
                            <p>Tekan tombol Track atau Enter untuk memulai pencarian.</p>
                        </div>
                        <div class="how-card sr d2">
                            <div class="how-num hn3">3</div>
                            <h4>Lihat Timeline</h4>
                            <p>Monitor seluruh progres PR Anda secara real-time.</p>
                        </div>
                    </div>
                </div>
            </section>
        @endif

    </div>{{-- end .page-shell --}}

    {{-- ═══ INFO MODAL ═══ --}}
    <div class="modal-overlay" id="infoModal" onclick="closeModal(event)">
        <div class="modal-box" onclick="event.stopPropagation()">
            <div class="modal-head">
                <div class="modal-head-left">
                    <div class="modal-head-ic"><i class="fas fa-info-circle"></i></div>
                    <div>
                        <h3>Panduan Status Progress</h3>
                        <p>Memahami setiap tahap perjalanan PR Anda</p>
                    </div>
                </div>
                <button class="btn-close" onclick="toggleModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="prog-step p0">
                    <div class="prog-badge pb0">0%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-inbox" style="color:var(--muted);margin-right:7px"></i>PR Diterima</h4>
                        <p>PR sudah diterima oleh divisi Umum tetapi <strong>belum diproses</strong>. Menunggu antrian.</p>
                        <div class="prog-sub" style="color:var(--muted)"><i class="fas fa-clock"></i> Menunggu Proses</div>
                    </div>
                </div>
                <div class="prog-step p20">
                    <div class="prog-badge pb20">20%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-bell" style="color:var(--rose);margin-right:7px"></i>Tender Dibuka</h4>
                        <p>PR sudah dibuka tender tetapi <strong>belum ada respons</strong> dari vendor.</p>
                        <div class="prog-sub" style="color:var(--rose)"><i class="fas fa-hourglass-half"></i> Menunggu
                            Penawaran Vendor</div>
                    </div>
                </div>
                <div class="prog-step p40">
                    <div class="prog-badge pb40">40%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-file-invoice" style="color:var(--amber);margin-right:7px"></i>SPH Diterima</h4>
                        <p>Sudah mendapat Surat Penawaran Harga tetapi <strong>belum awarding</strong>.</p>
                        <div class="prog-sub" style="color:var(--amber)"><i class="fas fa-chart-line"></i> Evaluasi
                            Penawaran</div>
                    </div>
                </div>
                <div class="prog-step p60">
                    <div class="prog-badge pb60">60%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-award" style="color:var(--cyan);margin-right:7px"></i>Awarding Selesai</h4>
                        <p>Vendor pemenang sudah ditentukan tetapi <strong>belum cetak kontrak</strong>.</p>
                        <div class="prog-sub" style="color:var(--cyan)"><i class="fas fa-file-contract"></i> Persiapan
                            Kontrak</div>
                    </div>
                </div>
                <div class="prog-step p80">
                    <div class="prog-badge pb80">80%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-file-signature" style="color:var(--violet);margin-right:7px"></i>Kontrak Terbit
                        </h4>
                        <p>Kontrak diterbitkan dan ditandatangani, tetapi <strong>belum terima barang</strong>.</p>
                        <div class="prog-sub" style="color:var(--violet)"><i class="fas fa-shipping-fast"></i> Menunggu
                            Pengiriman</div>
                    </div>
                </div>
                <div class="prog-step p100">
                    <div class="prog-badge pb100">100%</div>
                    <div class="prog-info">
                        <h4><i class="fas fa-check-circle" style="color:var(--green);margin-right:7px"></i>Selesai — BPG
                            Terbit</h4>
                        <p>PR <strong>sudah selesai</strong>! Barang diterima dan BPG sudah terbit.</p>
                        <div class="prog-sub" style="color:var(--green)"><i class="fas fa-check-double"></i> Proses Selesai
                            ✓</div>
                    </div>
                </div>
                <div class="tips-box">
                    <i class="fas fa-lightbulb" style="color:var(--cyan);font-size:1.2rem;flex-shrink:0;margin-top:2px"></i>
                    <div>
                        <div style="font-size:.82rem;font-weight:700;color:var(--text);margin-bottom:8px">Tips Monitoring PR
                        </div>
                        <ul>
                            <li>Progress update otomatis setiap ada perubahan status</li>
                            <li>Track PR kapan saja tanpa perlu login</li>
                            <li>Jika progress stuck, hubungi divisi Umum untuk info lebih lanjut</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-foot">
                <button class="btn-understand" onclick="toggleModal()"><i class="fas fa-check"
                        style="margin-right:8px"></i>Saya Mengerti</button>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script>
        function searchPr(v) { document.getElementById('qInput').value = v; document.querySelector('form').submit(); }
        function toggleModal() {
            var m = document.getElementById('infoModal');
            m.classList.toggle('open');
            document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
        }
        function closeModal(e) { if (e.target === document.getElementById('infoModal')) toggleModal(); }
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.getElementById('infoModal').classList.contains('open')) toggleModal(); });

        (function () {
            /* Scroll reveal */
            var io = new IntersectionObserver(function (e) {
                e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('show'); io.unobserve(x.target); } });
            }, { threshold: 0.08 });
            document.querySelectorAll('.sr').forEach(function (el) { io.observe(el); });

            /* Timeline stagger */
            var tio = new IntersectionObserver(function (e) {
                e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('show'); tio.unobserve(x.target); } });
            }, { threshold: 0.05 });
            document.querySelectorAll('.tl-item').forEach(function (el) { tio.observe(el); });

            /* Suggest */
            var input = document.getElementById('qInput'),
                box = document.getElementById('suggestBox'),
                list = document.getElementById('suggestList'),
                hint = document.getElementById('suggestHint'),
                t = null, ai = -1, items = [];
            function open() { box.classList.remove('hidden'); }
            function close() { box.classList.add('hidden'); ai = -1; }
            function esc(s) { return String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
            function render() {
                list.innerHTML = '';
                if (!items.length) { list.innerHTML = '<div class="suggest-hint">Tidak ada hasil.</div>'; return; }
                items.forEach(function (it, idx) {
                    var r = document.createElement('button');
                    r.type = 'button'; r.className = 'suggest-row' + (idx === ai ? ' active' : '');
                    r.innerHTML = '<div class="suggest-pr">' + esc(it.nomor_pr) + '</div><div class="suggest-sub">' + esc(it.tujuan || '-') + '</div>';
                    r.addEventListener('click', function () { sel(idx); });
                    list.appendChild(r);
                });
            }
            function sel(idx) { var it = items[idx]; if (!it) return; input.value = it.nomor_pr; close(); input.closest('form').submit(); }
            async function fetchS(q) {
                try { var r = await fetch("{{ route('landing.track.suggest') }}" + "?q=" + encodeURIComponent(q), { headers: { 'Accept': 'application/json' } }); if (!r.ok) return []; var j = await r.json().catch(function () { return {}; }); return Array.isArray(j.items) ? j.items : []; } catch (e) { return []; }
            }
            input.addEventListener('input', function () {
                var q = input.value.trim();
                if (t) clearTimeout(t);
                if (q.length < 2) { items = []; hint.textContent = 'Ketik minimal 2 karakter...'; render(); close(); return; }
                hint.textContent = 'Mencari...'; open();
                t = setTimeout(async function () { items = await fetchS(q); hint.textContent = items.length ? 'Pilih salah satu nomor PR.' : 'Tidak ada hasil.'; ai = -1; render(); open(); }, 300);
            });
            input.addEventListener('keydown', function (e) {
                if (box.classList.contains('hidden')) return;
                if (e.key === 'ArrowDown') { e.preventDefault(); ai = Math.min(items.length - 1, ai + 1); render(); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); ai = Math.max(0, ai - 1); render(); }
                else if (e.key === 'Enter' && ai >= 0) { e.preventDefault(); sel(ai); }
                else if (e.key === 'Escape') { close(); }
            });
            document.addEventListener('click', function (e) { if (!box.contains(e.target) && e.target !== input) close(); });
            input.addEventListener('focus', function () { if (items.length) open(); });
        })();
    </script>
@endpush