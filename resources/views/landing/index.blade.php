@extends('layouts.landing')

@section('title', 'SIMONPR - Monitoring PPBJ Sucofindo Pekanbaru')

@push('styles')
    <style>
        :root {
            --koral-coral: #ff6b66;
            --koral-coral-2: #ff8a7a;
            --koral-purple: #7c4dff;
            --koral-cyan: #5ee7f8;
            --koral-ink: #111229;
            --koral-deep: #332348;
            --koral-soft: #f7f8fb;
            --koral-line: rgba(17, 18, 41, .10);
        }

        body,
        main.site-main {
            font-family: 'Montserrat', sans-serif;
            background: #ffffff !important;
            color: var(--koral-ink);
        }

        [data-theme="dark"] body,
        [data-theme="dark"] main.site-main {
            background: #0e1020 !important;
            color: #f8fafc;
        }

        .k-wrap {
            width: min(1590px, calc(100% - 96px));
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .k-wrap-sm {
            width: min(1280px, calc(100% - 96px));
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .k-section {
            position: relative;
            padding: 92px 0;
            overflow: hidden;
        }

        .k-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: var(--koral-coral);
            font-size: .78rem;
            font-weight: 900;
            letter-spacing: .12em;
            text-transform: uppercase;
        }

        .k-eyebrow::before {
            content: "";
            width: 34px;
            height: 3px;
            border-radius: 999px;
            background: var(--koral-coral);
        }

        .k-title {
            color: var(--koral-ink);
            font-size: clamp(2.6rem, 5.8vw, 6.2rem);
            line-height: .96;
            letter-spacing: -.065em;
            font-weight: 900;
            margin: 18px 0 20px;
        }

        .k-title .muted {
            color: rgba(17, 18, 41, .35);
        }

        .k-copy {
            color: #4b4d63;
            line-height: 1.9;
            font-size: 1.04rem;
            font-weight: 500;
        }

        .k-btn-row {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            align-items: center;
        }

        .k-btn,
        .k-btn-outline {
            min-height: 52px;
            padding: 0 25px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-decoration: none;
            font-weight: 900;
            font-size: .88rem;
            letter-spacing: .02em;
            transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .k-btn {
            color: #fff;
            background: var(--koral-coral);
            box-shadow: 0 18px 35px rgba(255, 107, 102, .26);
        }

        .k-btn-outline {
            color: var(--koral-ink);
            border: 2px solid rgba(17, 18, 41, .12);
            background: #fff;
        }

        .k-btn:hover,
        .k-btn-outline:hover {
            transform: translateY(-3px);
        }

        .k-hero {
            position: relative;
            min-height: calc(100vh - 64px);
            display: flex;
            align-items: center;
            padding: 90px 0 72px;
            background:
                radial-gradient(circle at 86% 22%, rgba(255, 107, 102, .12), transparent 23rem),
                linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%);
            overflow: hidden;
        }

        .k-hero::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            background:
                linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.82) 48%, rgba(255,255,255,.46) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
            opacity: .92;
        }

        .k-hero .k-wrap {
            z-index: 1;
        }

        .k-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(420px, .82fr);
            gap: 70px;
            align-items: center;
        }

        .k-hero-title {
            color: var(--koral-ink);
            font-size: clamp(3.55rem, 8.2vw, 8.15rem);
            line-height: .9;
            letter-spacing: -.072em;
            font-weight: 900;
            margin: 18px 0 22px;
        }

        .k-hero-title span {
            display: block;
        }

        .k-type-line {
            margin: 8px 0 28px;
            color: var(--koral-ink);
            font-size: clamp(1.7rem, 3.35vw, 3.55rem);
            line-height: 1.05;
            letter-spacing: -.045em;
            font-weight: 900;
        }

        .k-type-chip {
            display: inline-block;
            min-width: 235px;
            padding: 3px 12px 5px;
            color: #fff;
            background: var(--koral-coral);
        }

        .k-type-caret {
            display: inline-block;
            width: 4px;
            height: .9em;
            margin-left: 8px;
            background: var(--koral-ink);
            vertical-align: -.08em;
            animation: kBlink .8s steps(1) infinite;
        }

        @keyframes kBlink {
            50% { opacity: 0; }
        }

        .k-hero-copy {
            max-width: 710px;
            margin-bottom: 32px;
            color: #44465a;
            line-height: 1.92;
            font-size: 1.06rem;
            font-weight: 500;
        }

        .k-hero-art {
            position: relative;
            min-height: 590px;
        }

        .k-hero-dashboard {
            position: absolute;
            right: 0;
            top: 70px;
            width: min(520px, 100%);
            padding: 28px;
            border-radius: 28px;
            background: rgba(255, 255, 255, .88);
            border: 1px solid rgba(17, 18, 41, .10);
            box-shadow: 0 32px 80px rgba(17, 18, 41, .16);
        }

        .k-hero-dashboard::before {
            content: "";
            position: absolute;
            inset: -24px -22px auto auto;
            width: 150px;
            height: 150px;
            border-radius: 999px;
            background: var(--koral-coral);
            opacity: .18;
            z-index: -1;
        }

        .k-hero-dashboard-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 24px;
        }

        .k-hero-dashboard-title {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .k-hero-dashboard-logo {
            width: 46px;
            height: 46px;
            border-radius: 15px;
            display: grid;
            place-items: center;
            color: #fff;
            background: var(--koral-coral);
            box-shadow: 0 12px 28px rgba(255, 107, 102, .26);
        }

        .k-hero-dashboard-title b {
            display: block;
            color: var(--koral-ink);
            font-size: 1.05rem;
            line-height: 1.2;
        }

        .k-hero-dashboard-title span {
            display: block;
            color: #6b6d7e;
            font-size: .78rem;
            font-weight: 700;
            margin-top: 3px;
        }

        .k-hero-dashboard-badge {
            color: #fff;
            background: var(--koral-purple);
            border-radius: 999px;
            padding: 8px 11px;
            font-size: .72rem;
            font-weight: 900;
        }

        .k-hero-progress {
            display: grid;
            gap: 14px;
        }

        .k-hero-progress-row {
            display: grid;
            grid-template-columns: 46px 1fr auto;
            gap: 14px;
            align-items: center;
            padding: 14px;
            border: 1px solid #eef0f5;
            border-radius: 18px;
            background: #fff;
        }

        .k-hero-progress-row i {
            width: 46px;
            height: 46px;
            display: grid;
            place-items: center;
            color: #fff;
            border-radius: 15px;
            background: var(--koral-coral);
        }

        .k-hero-progress-row:nth-child(2) i {
            background: var(--koral-purple);
        }

        .k-hero-progress-row:nth-child(3) i {
            background: #22c55e;
        }

        .k-hero-progress-row b {
            display: block;
            color: var(--koral-ink);
            font-size: .94rem;
            margin-bottom: 6px;
        }

        .k-hero-progress-line {
            height: 8px;
            border-radius: 999px;
            background: #eef0f5;
            overflow: hidden;
        }

        .k-hero-progress-line span {
            display: block;
            width: var(--w, 50%);
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--koral-coral), var(--koral-purple));
        }

        .k-hero-progress-row em {
            color: var(--koral-coral);
            font-style: normal;
            font-weight: 900;
            font-size: .82rem;
        }

        .k-hero-mini {
            position: absolute;
            left: 0;
            bottom: 70px;
            width: 250px;
            padding: 20px;
            border-radius: 22px;
            background: var(--koral-ink);
            color: #fff;
            box-shadow: 0 28px 70px rgba(17, 18, 41, .18);
        }

        .k-hero-mini strong {
            display: block;
            font-size: 2rem;
            line-height: 1;
            margin-bottom: 8px;
            letter-spacing: -.05em;
        }

        .k-hero-mini span {
            color: rgba(255, 255, 255, .72);
            line-height: 1.55;
            font-weight: 600;
            font-size: .86rem;
        }

        .k-blob {
            position: absolute;
            right: 12px;
            top: 86px;
            width: 470px;
            height: 390px;
            border-radius: 44% 56% 58% 42% / 38% 42% 58% 62%;
            background: linear-gradient(135deg, var(--koral-coral), var(--koral-coral-2));
            transform: rotate(15deg);
            box-shadow: 0 35px 70px rgba(255, 107, 102, .20);
            animation: blobFloat 6s ease-in-out infinite;
        }

        @keyframes blobFloat {
            0%, 100% { transform: rotate(15deg) translateY(0); }
            50% { transform: rotate(11deg) translateY(-18px); }
        }

        .k-stripe-circle {
            position: absolute;
            right: 345px;
            top: 180px;
            width: 155px;
            height: 155px;
            border-radius: 999px;
            background: repeating-linear-gradient(20deg, var(--koral-purple) 0 5px, transparent 5px 11px);
            opacity: .95;
        }

        .k-soft-dot {
            position: absolute;
            right: 300px;
            top: 124px;
            width: 62px;
            height: 62px;
            border-radius: 999px;
            background: rgba(94, 231, 248, .35);
        }

        .k-slashes {
            position: absolute;
            right: 132px;
            top: 286px;
            width: 86px;
            height: 64px;
            transform: rotate(20deg);
        }

        .k-slashes::before,
        .k-slashes::after,
        .k-slashes span {
            content: "";
            position: absolute;
            top: 0;
            width: 8px;
            height: 76px;
            background: #fff;
        }

        .k-slashes::before { left: 8px; }
        .k-slashes span { left: 30px; }
        .k-slashes::after { left: 52px; }

        .k-star {
            position: absolute;
            right: 490px;
            top: 410px;
            color: var(--koral-coral);
            font-size: 4.4rem;
            font-weight: 900;
            line-height: 1;
            transform: rotate(18deg);
        }

        .k-squiggle {
            position: absolute;
            right: 360px;
            top: 420px;
            width: 88px;
            height: 34px;
        }

        .k-squiggle::before {
            content: "~~~";
            color: var(--koral-purple);
            font-size: 3.4rem;
            font-weight: 900;
            letter-spacing: -13px;
        }

        .k-wire-card {
            position: absolute;
            left: 0;
            bottom: 34px;
            width: 310px;
            padding: 22px;
            border-radius: 18px;
            background: #fff;
            border: 1px solid var(--koral-line);
            box-shadow: 0 30px 70px rgba(17, 18, 41, .10);
        }

        .k-wire-card b {
            display: block;
            color: var(--koral-ink);
            font-size: 1.08rem;
            margin-bottom: 12px;
        }

        .k-wire-line {
            height: 9px;
            border-radius: 999px;
            background: #eef0f5;
            margin: 10px 0;
            overflow: hidden;
        }

        .k-wire-line span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--koral-coral), var(--koral-purple));
        }

        .k-nav-tabs {
            padding: 62px 0 36px;
            background: #fff;
        }

        .k-tab-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 34px;
            padding-bottom: 62px;
            border-bottom: 3px solid #eef0f5;
        }

        .k-tab-item small {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 48px;
            height: 30px;
            margin-bottom: 16px;
            color: #fff;
            background: var(--koral-coral);
            border-radius: 5px;
            font-weight: 900;
            font-size: .82rem;
        }

        .k-tab-item {
            width: 100%;
            padding: 0;
            border: 0;
            background: transparent;
            text-align: left;
            font: inherit;
            cursor: pointer;
        }

        .k-tab-item h2 {
            color: var(--koral-ink);
            font-size: clamp(2rem, 3.4vw, 3.35rem);
            line-height: 1;
            letter-spacing: -.055em;
            font-weight: 900;
            transition: color .2s ease;
        }

        .k-tab-item.active h2,
        .k-tab-item:hover h2 {
            color: var(--koral-coral);
        }

        .k-business-copy {
            will-change: opacity, transform;
            transition:
                opacity .54s cubic-bezier(.76, 0, .24, 1),
                transform .54s cubic-bezier(.76, 0, .24, 1);
        }

        .k-business-copy.is-leaving {
            opacity: 0;
            transform: translateX(180px);
        }

        .k-business-copy.is-entering {
            opacity: 0;
            transform: translateX(180px);
        }

        .k-business {
            background: #fff;
            padding: 40px 0 100px;
        }

        .k-business-grid {
            display: grid;
            grid-template-columns: minmax(0, .9fr) minmax(420px, .8fr);
            gap: 80px;
            align-items: center;
            overflow: hidden;
        }

        .k-business-grid.is-leaving {
            pointer-events: none;
        }

        .k-business-grid.is-leaving .k-business-copy,
        .k-business-grid.is-leaving .k-system-art {
            opacity: 0;
            transform: translateX(220px);
        }

        .k-business-grid.is-entering .k-business-copy,
        .k-business-grid.is-entering .k-system-art {
            opacity: 0;
            transform: translateX(220px);
        }

        .k-business h2 {
            color: var(--koral-purple);
            font-size: clamp(2.05rem, 3.85vw, 3.45rem);
            line-height: 1.08;
            letter-spacing: -.045em;
            font-weight: 900;
            margin-bottom: 26px;
        }

        .k-business p {
            color: #3f4050;
            font-size: 1.04rem;
            line-height: 1.92;
            font-weight: 500;
            margin-bottom: 20px;
        }

        .k-system-art {
            position: relative;
            min-height: 430px;
            will-change: opacity, transform;
            transition:
                opacity .54s cubic-bezier(.76, 0, .24, 1),
                transform .54s cubic-bezier(.76, 0, .24, 1);
        }

        .k-system-art.is-leaving {
            opacity: 0;
            transform: translateX(210px);
        }

        .k-system-art.is-entering {
            opacity: 0;
            transform: translateX(210px);
        }

        .k-tab-list {
            list-style: none;
            display: grid;
            gap: 14px;
            margin: 28px 0;
            padding: 0;
        }

        .k-tab-list li {
            display: flex;
            align-items: center;
            gap: 14px;
            color: #3f4050;
            font-size: 1.04rem;
            font-weight: 600;
            letter-spacing: -.01em;
        }

        .k-tab-list i {
            width: 28px;
            color: var(--koral-coral);
            font-size: 1.1rem;
        }

        .k-tab-button {
            min-height: 42px;
            padding: 0 28px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background: var(--koral-coral);
            text-decoration: none;
            font-size: .82rem;
            font-weight: 900;
            letter-spacing: .04em;
            text-transform: uppercase;
            box-shadow: 0 14px 28px rgba(255, 107, 102, .22);
        }

        .k-system-art .k-blob {
            top: 10px;
            right: 40px;
            width: 430px;
            height: 330px;
        }

        .k-system-art .k-stripe-circle {
            top: 115px;
            right: 330px;
            width: 150px;
            height: 150px;
        }

        .k-system-art .k-slashes {
            top: 150px;
            right: 158px;
        }

        .k-system-art .k-soft-dot {
            top: 60px;
            right: 320px;
        }

        .k-art-layer {
            display: none;
            position: absolute;
            inset: 0;
        }

        .k-art-layer.active {
            display: block;
            animation: kArtLayerIn .72s cubic-bezier(.2, .85, .2, 1) both;
        }

        @keyframes kArtLayerIn {
            0% {
                opacity: 0;
                transform: translateX(82px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .k-art-system-card {
            position: absolute;
            right: 35px;
            top: 40px;
            width: 430px;
            padding: 28px;
            background: #fff;
            border: 1px solid var(--koral-line);
            box-shadow: 0 30px 80px rgba(17, 18, 41, .12);
        }

        .k-art-system-card::before {
            content: "";
            position: absolute;
            inset: -28px -30px auto auto;
            width: 145px;
            height: 145px;
            border-radius: 999px;
            background: var(--koral-coral);
            z-index: -1;
            opacity: .9;
        }

        .k-art-system-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
        }

        .k-art-system-head b {
            color: var(--koral-ink);
            font-size: 1.25rem;
        }

        .k-art-status {
            color: #fff;
            background: var(--koral-purple);
            padding: 7px 10px;
            border-radius: 999px;
            font-size: .72rem;
            font-weight: 900;
        }

        .k-art-row {
            display: grid;
            grid-template-columns: 46px 1fr 48px;
            gap: 14px;
            align-items: center;
            padding: 14px 0;
            border-top: 1px solid #eef0f5;
        }

        .k-art-row i {
            width: 46px;
            height: 46px;
            display: grid;
            place-items: center;
            color: #fff;
            background: var(--koral-coral);
        }

        .k-art-row span {
            display: block;
            height: 9px;
            border-radius: 999px;
            background: #eef0f5;
            overflow: hidden;
        }

        .k-art-row span::before {
            content: "";
            display: block;
            width: var(--w, 60%);
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--koral-coral), var(--koral-purple));
        }

        .k-art-row small {
            color: var(--koral-coral);
            font-weight: 900;
        }

        .k-art-chair {
            position: absolute;
            right: 78px;
            top: 74px;
            width: 250px;
            height: 230px;
            border-radius: 34px 34px 17px 17px;
            background: linear-gradient(135deg, #ffb4a8, var(--koral-coral));
            box-shadow: 0 34px 70px rgba(255, 107, 102, .20);
        }

        .k-art-chair::before {
            content: "";
            position: absolute;
            left: -84px;
            top: -72px;
            width: 86px;
            height: 86px;
            border-radius: 999px;
            background: radial-gradient(circle at 30% 30%, #fff7db, var(--koral-coral));
        }

        .k-art-chair::after {
            content: "";
            position: absolute;
            right: -68px;
            bottom: -62px;
            width: 104px;
            height: 104px;
            border-radius: 999px;
            background: radial-gradient(circle at 35% 25%, #fff7db, var(--koral-coral));
        }

        .k-art-chair-legs {
            position: absolute;
            right: 105px;
            top: 282px;
            width: 190px;
            height: 130px;
            background:
                linear-gradient(100deg, transparent 0 23%, #b88718 23% 27%, transparent 27% 48%, #b88718 48% 52%, transparent 52% 73%, #b88718 73% 77%, transparent 77%);
        }

        .k-art-chair-ring {
            position: absolute;
            right: 0;
            top: 304px;
            width: 96px;
            height: 96px;
            border-radius: 999px;
            border: 14px solid #b88718;
            box-shadow: inset 0 0 0 5px rgba(255, 255, 255, .45);
        }

        .k-art-leaf {
            position: absolute;
            right: 4px;
            top: 165px;
            width: 170px;
            height: 170px;
            background: repeating-linear-gradient(130deg, transparent 0 10px, #b88718 10px 14px, transparent 14px 26px);
            clip-path: polygon(10% 50%, 100% 0, 58% 54%, 100% 100%);
            opacity: .85;
        }

        .k-art-mission-ring {
            position: absolute;
            right: 100px;
            top: 36px;
            width: 330px;
            height: 330px;
            border-radius: 999px;
            border: 10px solid var(--koral-coral);
        }

        .k-art-mission-striped {
            position: absolute;
            right: 28px;
            top: 218px;
            width: 185px;
            height: 185px;
            border-radius: 999px;
            background: repeating-linear-gradient(135deg, var(--koral-coral) 0 11px, transparent 11px 24px);
        }

        .k-art-spark {
            position: absolute;
            color: var(--koral-coral);
            font-size: 4rem;
            font-weight: 900;
            line-height: 1;
        }

        .k-art-spark.one { right: 390px; top: 40px; }
        .k-art-spark.two { right: 300px; top: 88px; transform: scale(.75); }

        .k-art-video {
            position: absolute;
            right: 0;
            top: 58px;
            width: 560px;
            max-width: 100%;
            aspect-ratio: 16/9;
            background:
                linear-gradient(90deg, rgba(17, 18, 41, .15), rgba(17, 18, 41, .05)),
                url('{{ asset('images/hero-building.jpg') }}') center / cover no-repeat;
            box-shadow: 0 34px 80px rgba(17, 18, 41, .14);
        }

        .k-art-video::after {
            content: "\f04b";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 84px;
            height: 62px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            padding-left: 4px;
            color: #fff;
            background: rgba(17, 18, 41, .88);
            font-size: 1.55rem;
        }

        .k-dark-values {
            position: relative;
            padding: 95px 0;
            background: var(--koral-deep);
            color: #fff;
            overflow: hidden;
        }

        .k-dark-values::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: .17;
            background:
                linear-gradient(120deg, transparent 0 18%, rgba(94, 231, 248, .35) 18% 19%, transparent 19% 42%, rgba(255, 107, 102, .30) 42% 43%, transparent 43%),
                radial-gradient(circle at 55% 55%, rgba(255, 255, 255, .14), transparent 22rem);
        }

        .k-value-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .k-value-card {
            min-height: 340px;
            padding: 42px 36px;
            border-left: 1px solid rgba(94, 231, 248, .18);
        }

        .k-value-card:first-child {
            border-left: none;
        }

        .k-value-card strong {
            display: block;
            color: var(--koral-cyan);
            font-size: clamp(2.8rem, 4.4vw, 4.7rem);
            line-height: 1;
            letter-spacing: -.045em;
            margin-bottom: 28px;
        }

        .k-value-card h3 {
            color: #fff;
            font-size: clamp(1.7rem, 2.45vw, 2.65rem);
            line-height: 1.08;
            letter-spacing: -.045em;
            margin-bottom: 22px;
            font-weight: 900;
        }

        .k-value-card p {
            color: rgba(255, 255, 255, .78);
            line-height: 1.8;
            font-weight: 500;
            font-size: 1rem;
        }

        .k-build-line {
            padding: 92px 0 76px;
            background: #fff;
        }

        .k-build-title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            color: var(--koral-ink);
            font-size: clamp(2.65rem, 4.9vw, 5.25rem);
            line-height: 1;
            letter-spacing: -.06em;
            font-weight: 900;
        }

        .k-logo-mark {
            position: relative;
            width: 82px;
            height: 82px;
            flex: 0 0 auto;
        }

        .k-logo-mark::before {
            content: "";
            position: absolute;
            inset: 7px 10px 13px 18px;
            border-radius: 999px;
            background: var(--koral-coral);
        }

        .k-logo-mark::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 9px;
            width: 70px;
            height: 42px;
            background: repeating-linear-gradient(135deg, transparent 0 8px, #111229 8px 11px, transparent 11px 17px);
        }

        .k-build-type {
            display: inline-block;
            padding: 5px 14px 9px;
            color: #fff;
            background: var(--koral-coral);
            min-width: 300px;
        }

        .k-modules {
            padding: 92px 0;
            background: var(--koral-soft);
        }

        .k-module-head {
            display: grid;
            grid-template-columns: minmax(0, .9fr) minmax(280px, .7fr);
            gap: 46px;
            align-items: end;
            margin-bottom: 42px;
        }

        .k-module-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
        }

        .k-module-card {
            min-height: 265px;
            padding: 30px;
            background: #fff;
            border: 1px solid var(--koral-line);
            border-radius: 0;
            box-shadow: 0 18px 55px rgba(17, 18, 41, .06);
            transition: transform .22s ease, box-shadow .22s ease;
        }

        .k-module-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 28px 70px rgba(17, 18, 41, .10);
        }

        .k-module-card i {
            width: 58px;
            height: 58px;
            display: grid;
            place-items: center;
            margin-bottom: 26px;
            color: #fff;
            background: var(--koral-coral);
            font-size: 1.2rem;
        }

        .k-module-card:nth-child(2n) i {
            background: var(--koral-purple);
        }

        .k-module-card h3 {
            color: var(--koral-ink);
            font-size: 1.28rem;
            line-height: 1.25;
            margin-bottom: 12px;
            font-weight: 900;
            letter-spacing: -.025em;
        }

        .k-module-card p {
            color: #55576a;
            line-height: 1.82;
            font-weight: 500;
        }

        .k-cta {
            padding: 94px 0;
            background: #fff;
        }

        .k-cta-box {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 42px;
            align-items: center;
            padding: 54px;
            background: var(--koral-ink);
            color: #fff;
        }

        .k-cta-box h2 {
            color: #fff;
            font-size: clamp(2.5rem, 4.85vw, 5.15rem);
            line-height: .98;
            letter-spacing: -.06em;
            font-weight: 900;
            margin-bottom: 14px;
        }

        .k-cta-box p {
            color: rgba(255, 255, 255, .75);
            line-height: 1.86;
            font-size: 1.03rem;
            font-weight: 500;
            max-width: 760px;
        }

        .k-cta-box .k-btn-outline {
            color: #fff;
            border-color: rgba(255, 255, 255, .20);
            background: transparent;
        }

        [data-theme="dark"] .k-hero {
            background:
                radial-gradient(circle at 86% 22%, rgba(255, 107, 102, .12), transparent 23rem),
                linear-gradient(180deg, #0e1020 0%, #121528 100%);
        }

        [data-theme="dark"] .k-hero::before {
            background:
                linear-gradient(90deg, rgba(14,16,32,.94) 0%, rgba(14,16,32,.80) 48%, rgba(14,16,32,.54) 100%),
                url('{{ asset('images/hero-building.jpg') }}') center right / cover no-repeat;
            opacity: .95;
        }

        [data-theme="dark"] .k-nav-tabs,
        [data-theme="dark"] .k-business,
        [data-theme="dark"] .k-build-line,
        [data-theme="dark"] .k-cta {
            background: #0e1020;
        }

        [data-theme="dark"] .k-modules {
            background: #121528;
        }

        [data-theme="dark"] .k-title,
        [data-theme="dark"] .k-hero-title,
        [data-theme="dark"] .k-type-line,
        [data-theme="dark"] .k-build-title,
        [data-theme="dark"] .k-module-card h3 {
            color: #f8fafc;
        }

        [data-theme="dark"] .k-tab-item h2 {
            color: #f8fafc;
        }

        [data-theme="dark"] .k-tab-item.active h2,
        [data-theme="dark"] .k-tab-item:hover h2 {
            color: var(--koral-coral);
        }

        [data-theme="dark"] .k-title .muted {
            color: rgba(248, 250, 252, .36);
        }

        [data-theme="dark"] .k-copy,
        [data-theme="dark"] .k-hero-copy,
        [data-theme="dark"] .k-business p,
        [data-theme="dark"] .k-tab-list li,
        [data-theme="dark"] .k-module-card p {
            color: #cbd5e1;
        }

        [data-theme="dark"] .k-business h2 {
            color: #a78bfa;
        }

        [data-theme="dark"] .k-tab-grid {
            border-bottom-color: rgba(255, 255, 255, .12);
        }

        [data-theme="dark"] .k-btn-outline,
        [data-theme="dark"] .k-wire-card,
        [data-theme="dark"] .k-art-system-card,
        [data-theme="dark"] .k-hero-dashboard,
        [data-theme="dark"] .k-hero-progress-row,
        [data-theme="dark"] .k-module-card {
            color: #f8fafc;
            background: #171a2f;
            border-color: rgba(255, 255, 255, .12);
        }

        [data-theme="dark"] .k-wire-card b,
        [data-theme="dark"] .k-art-system-head b,
        [data-theme="dark"] .k-hero-dashboard-title b,
        [data-theme="dark"] .k-hero-progress-row b {
            color: #f8fafc;
        }

        [data-theme="dark"] .k-hero-dashboard-title span {
            color: #cbd5e1;
        }

        [data-theme="dark"] .k-wire-line,
        [data-theme="dark"] .k-art-row {
            border-color: rgba(255, 255, 255, .10);
        }

        [data-theme="dark"] .k-wire-line,
        [data-theme="dark"] .k-art-row span,
        [data-theme="dark"] .k-hero-progress-line {
            background: rgba(255, 255, 255, .12);
        }

        [data-theme="dark"] .k-type-caret {
            background: #f8fafc;
        }

        [data-theme="dark"] .k-logo-mark::after {
            background: repeating-linear-gradient(135deg, transparent 0 8px, #f8fafc 8px 11px, transparent 11px 17px);
        }

        [data-theme="dark"] .k-cta-box {
            background: #171a2f;
        }

        [data-theme="dark"] .k-cta-box .k-btn-outline {
            background: transparent;
        }

        .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity .65s ease, transform .65s ease;
        }

        .reveal.show {
            opacity: 1;
            transform: none;
        }

        .delay-1 { transition-delay: .08s; }
        .delay-2 { transition-delay: .16s; }

        @media (max-width: 1100px) {
            .k-wrap,
            .k-wrap-sm {
                width: min(100% - 48px, 1280px);
            }

            .k-hero-grid,
            .k-business-grid,
            .k-module-head,
            .k-cta-box {
                grid-template-columns: 1fr;
            }

            .k-hero-art {
                min-height: 450px;
            }

            .k-tab-grid,
            .k-value-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .k-module-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 720px) {
            .k-wrap,
            .k-wrap-sm {
                width: min(100% - 28px, 1280px);
            }

            .k-hero {
                min-height: auto;
                padding: 74px 0 48px;
            }

            .k-hero-title {
                font-size: clamp(3.2rem, 18vw, 5rem);
            }

            .k-type-chip,
            .k-build-type {
                min-width: 0;
            }

            .k-hero-art,
            .k-system-art {
                min-height: 340px;
                transform: scale(.78);
                transform-origin: top center;
                margin-bottom: -80px;
            }

            .k-tab-grid,
            .k-value-grid,
            .k-module-grid {
                grid-template-columns: 1fr;
            }

            .k-value-card {
                min-height: auto;
                border-left: none;
                border-top: 1px solid rgba(94, 231, 248, .18);
            }

            .k-value-card:first-child {
                border-top: none;
            }

            .k-cta-box {
                padding: 32px 24px;
            }
        }
    </style>
@endpush

@section('content')
    <section class="k-hero">
        <div class="k-wrap k-hero-grid">
            <div class="reveal">
                <div class="k-eyebrow">Digital Support Procurement</div>
                <h1 class="k-hero-title">
                    <span>SIMONPR</span>
                    <span>for smarter</span>
                    <span>support.</span>
                </h1>
                <div class="k-type-line">
                    We build amazing
                    <span class="k-type-chip" id="homeTypewriter">tracking</span><span class="k-type-caret"></span>
                </div>
                <p class="k-hero-copy">
                    Sistem monitoring PR/PPBJ untuk membantu Divisi Umum dan Operasional memantau
                    approval, SPPH, Surat Pesanan, kontrak, laporan, chat tim, chatbot, sampai integrasi arsip.
                </p>
                <div class="k-btn-row">
                    <a href="{{ route('landing.track') }}" class="k-btn">
                        <i class="fas fa-magnifying-glass"></i> Lacak PR/PPBJ
                    </a>
                    @auth
                        @php
                            $dashboardRoute = match (strtolower(auth()->user()->department ?? 'umum')) {
                                'operasional' => 'ops.dashboard',
                                default => 'dashboard.indexumum',
                            };
                        @endphp
                        <a href="{{ route($dashboardRoute) }}" class="k-btn-outline">
                            <i class="fas fa-gauge-high"></i> Dashboard
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="k-btn-outline">
                            <i class="fas fa-right-to-bracket"></i> Login
                        </a>
                    @endauth
                </div>
            </div>

            <div class="k-hero-art reveal delay-1" aria-hidden="true">
                <div class="k-hero-dashboard">
                    <div class="k-hero-dashboard-head">
                        <div class="k-hero-dashboard-title">
                            <div class="k-hero-dashboard-logo"><i class="fas fa-chart-line"></i></div>
                            <div>
                                <b>SIMONPR Live Board</b>
                                <span>Monitoring PR/PPBJ Pekanbaru</span>
                            </div>
                        </div>
                        <span class="k-hero-dashboard-badge">ONLINE</span>
                    </div>
                    <div class="k-hero-progress">
                        <div class="k-hero-progress-row">
                            <i class="fas fa-route"></i>
                            <div>
                                <b>Tracking PR/PPBJ</b>
                                <div class="k-hero-progress-line"><span style="--w:78%"></span></div>
                            </div>
                            <em>78%</em>
                        </div>
                        <div class="k-hero-progress-row">
                            <i class="fas fa-file-signature"></i>
                            <div>
                                <b>SPPH & SP Otomatis</b>
                                <div class="k-hero-progress-line"><span style="--w:64%"></span></div>
                            </div>
                            <em>64%</em>
                        </div>
                        <div class="k-hero-progress-row">
                            <i class="fas fa-box-archive"></i>
                            <div>
                                <b>Integrasi Arsip</b>
                                <div class="k-hero-progress-line"><span style="--w:100%"></span></div>
                            </div>
                            <em>OK</em>
                        </div>
                    </div>
                </div>
                <div class="k-hero-mini">
                    <strong>1 Data</strong>
                    <span>Dipakai untuk tracking, dokumen, laporan, chat, chatbot, dan arsip.</span>
                </div>
            </div>
        </div>
    </section>

    <section class="k-nav-tabs">
        <div class="k-wrap-sm">
            <div class="k-tab-grid reveal">
                <button type="button" class="k-tab-item active" data-koral-tab="system" aria-pressed="true">
                    <small>01</small>
                    <h2>Our System</h2>
                </button>
                <button type="button" class="k-tab-item" data-koral-tab="values" aria-pressed="false">
                    <small>02</small>
                    <h2>Our Values</h2>
                </button>
                <button type="button" class="k-tab-item" data-koral-tab="mission" aria-pressed="false">
                    <small>03</small>
                    <h2>Our Mission</h2>
                </button>
                <button type="button" class="k-tab-item" data-koral-tab="strategy" aria-pressed="false">
                    <small>04</small>
                    <h2>Our Strategy</h2>
                </button>
            </div>
        </div>
    </section>

    <section class="k-business">
        <div class="k-wrap-sm k-business-grid">
            <div class="reveal k-business-copy" id="kBusinessCopy">
                <h2 id="kBusinessTitle">How SIMONPR works as one system</h2>
                <p id="kBusinessP1">
                    SIMONPR menghubungkan proses PR/PPBJ dari input Operasional, approval Umum,
                    dokumen SPPH/SP/kontrak, tracking, sampai pengecekan arsip.
                </p>
                <p id="kBusinessP2">
                    Semua modul dirancang agar data tidak tercecer. Nomor PR/PPBJ menjadi pintu utama
                    untuk melihat status, dokumen, komunikasi, dan lokasi fisik arsip.
                </p>
                <ul class="k-tab-list" id="kBusinessList">
                    <li><i class="fas fa-route"></i><span>Tracking PR/PPBJ publik dan internal</span></li>
                    <li><i class="fas fa-file-signature"></i><span>SPPH, SP, dan kontrak dari data yang sama</span></li>
                    <li><i class="fas fa-box-archive"></i><span>Arsip PDF dan lokasi fisik terhubung</span></li>
                </ul>
                <a href="{{ route('landing.services') }}" class="k-tab-button" id="kBusinessButton">Explore System</a>
            </div>
            <div class="k-system-art reveal delay-1" aria-hidden="true">
                <div class="k-art-layer" data-koral-art="values">
                    <div class="k-art-chair"></div>
                    <div class="k-art-leaf"></div>
                    <div class="k-art-chair-legs"></div>
                    <div class="k-art-chair-ring"></div>
                </div>

                <div class="k-art-layer active" data-koral-art="system">
                    <div class="k-art-system-card">
                        <div class="k-art-system-head">
                            <b>SIMONPR Board</b>
                            <span class="k-art-status">ONLINE</span>
                        </div>
                        <div class="k-art-row">
                            <i class="fas fa-route"></i>
                            <span style="--w:75%"></span>
                            <small>75%</small>
                        </div>
                        <div class="k-art-row">
                            <i class="fas fa-file-signature"></i>
                            <span style="--w:58%"></span>
                            <small>58%</small>
                        </div>
                        <div class="k-art-row">
                            <i class="fas fa-box-archive"></i>
                            <span style="--w:100%"></span>
                            <small>OK</small>
                        </div>
                    </div>
                </div>

                <div class="k-art-layer" data-koral-art="mission">
                    <div class="k-art-mission-ring"></div>
                    <div class="k-art-mission-striped"></div>
                    <div class="k-art-spark one">*</div>
                    <div class="k-art-spark two">*</div>
                </div>

                <div class="k-art-layer" data-koral-art="strategy">
                    <div class="k-art-video"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="k-dark-values">
        <div class="k-wrap-sm">
            <div class="k-value-grid">
                <div class="k-value-card reveal">
                    <strong>01</strong>
                    <h3>Transparent</h3>
                    <p>Status PR/PPBJ bisa dilihat tanpa harus bertanya berulang ke banyak pihak.</p>
                </div>
                <div class="k-value-card reveal delay-1">
                    <strong>02</strong>
                    <h3>Integrated</h3>
                    <p>Approval, dokumen, tracking, chat, chatbot, dan arsip berjalan dalam satu ekosistem.</p>
                </div>
                <div class="k-value-card reveal delay-2">
                    <strong>03</strong>
                    <h3>Automated</h3>
                    <p>Nomor SPPH, Surat Pesanan, kontrak, dan laporan dapat dibuat dari data yang sama.</p>
                </div>
                <div class="k-value-card reveal delay-2">
                    <strong>04</strong>
                    <h3>Traceable</h3>
                    <p>PDF, rak, tingkat, box, dan nomor fisik arsip bisa dicek dari nomor PR/PPBJ.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="k-build-line">
        <div class="k-wrap-sm">
            <h2 class="k-build-title reveal">
                <span class="k-logo-mark" aria-hidden="true"></span>
                <span>We build amazing</span>
                <span class="k-build-type" id="homeBuildType">approval</span>
            </h2>
        </div>
    </section>

    <section class="k-modules">
        <div class="k-wrap-sm">
            <div class="k-module-head">
                <div class="reveal">
                    <div class="k-eyebrow">Main Modules</div>
                    <h2 class="k-title">Built for real support process.</h2>
                </div>
                <p class="k-copy reveal delay-1">
                    Modul SIMONPR disusun mengikuti alur pekerjaan di kantor: input, approval,
                    dokumen, monitoring, komunikasi, dan pencarian arsip.
                </p>
            </div>

            <div class="k-module-grid">
                <div class="k-module-card reveal">
                    <i class="fas fa-route"></i>
                    <h3>Tracking PR/PPBJ</h3>
                    <p>Cari nomor PR/PPBJ dan lihat status, timeline, progress, serta tanggal proses.</p>
                </div>
                <div class="k-module-card reveal delay-1">
                    <i class="fas fa-user-check"></i>
                    <h3>Approval PR</h3>
                    <p>Operasional mengirim permintaan, Umum memproses penerimaan atau penolakan.</p>
                </div>
                <div class="k-module-card reveal delay-2">
                    <i class="fas fa-file-signature"></i>
                    <h3>SPPH / SP / Kontrak</h3>
                    <p>Dokumen dapat dibuat lebih cepat dengan data vendor, item, dan nomor otomatis.</p>
                </div>
                <div class="k-module-card reveal">
                    <i class="fas fa-comments"></i>
                    <h3>Chat Tim</h3>
                    <p>Koordinasi lebih cepat dengan mention, reaction, edit pesan, pencarian, dan notifikasi.</p>
                </div>
                <div class="k-module-card reveal delay-1">
                    <i class="fas fa-robot"></i>
                    <h3>Chatbot Assistant</h3>
                    <p>Bantuan cepat untuk status PR/PPBJ, approval, statistik, reminder, dan ringkasan.</p>
                </div>
                <div class="k-module-card reveal delay-2">
                    <i class="fas fa-box-archive"></i>
                    <h3>Archive API</h3>
                    <p>SIMONPR terhubung ke sistem arsip untuk cek PDF dan lokasi fisik dokumen.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="k-cta">
        <div class="k-wrap-sm">
            <div class="k-cta-box reveal">
                <div>
                    <h2>Ready to track your PR?</h2>
                    <p>
                        Masukkan nomor PR/PPBJ untuk melihat status proses. Atau masuk ke dashboard
                        untuk mengelola pekerjaan sesuai role dan department pengguna.
                    </p>
                </div>
                <div class="k-btn-row">
                    <a href="{{ route('landing.track') }}" class="k-btn">
                        <i class="fas fa-magnifying-glass"></i> Track PR
                    </a>
                    <a href="{{ route('landing.contact') }}" class="k-btn-outline">
                        <i class="fas fa-envelope"></i> Contact
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script>
        (function () {
            var revealItems = document.querySelectorAll('.reveal');
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('show');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12 });
                revealItems.forEach(function (item) { observer.observe(item); });
            } else {
                revealItems.forEach(function (item) { item.classList.add('show'); });
            }

            var tabData = {
                system: {
                    title: 'How SIMONPR works as one system',
                    p1: 'SIMONPR menghubungkan proses PR/PPBJ dari input Operasional, approval Umum, dokumen SPPH/SP/kontrak, tracking, sampai pengecekan arsip.',
                    p2: 'Semua modul dirancang agar data tidak tercecer. Nomor PR/PPBJ menjadi pintu utama untuk melihat status, dokumen, komunikasi, dan lokasi fisik arsip.',
                    button: 'Explore System',
                    href: '{{ route('landing.services') }}',
                    art: 'system',
                    list: [
                        ['fa-route', 'Tracking PR/PPBJ publik dan internal'],
                        ['fa-file-signature', 'SPPH, SP, dan kontrak dari data yang sama'],
                        ['fa-box-archive', 'Arsip PDF dan lokasi fisik terhubung']
                    ]
                },
                values: {
                    title: 'How SIMONPR supports daily work',
                    p1: 'SIMONPR membuat proses support pengadaan lebih terlihat: dari PR/TORPR masuk, approval oleh Umum, pembuatan SPPH dan SP, sampai monitoring status selesai.',
                    p2: 'Data tidak lagi tersebar di banyak catatan manual. Nomor PR/PPBJ menjadi kunci untuk membaca status proses, dokumen, laporan, komunikasi, dan arsip digital maupun fisik.',
                    button: 'Track PR',
                    href: '{{ route('landing.track') }}',
                    art: 'values',
                    list: [
                        ['fa-shield-halved', 'PR/PPBJ lebih transparan dan mudah dilacak'],
                        ['fa-database', 'Data dokumen dan status tersimpan dalam satu alur'],
                        ['fa-check', 'Arsip digital dan fisik bisa dicek dari nomor PR']
                    ]
                },
                mission: {
                    title: 'Our mission is making procurement support transparent',
                    p1: 'Misi SIMONPR adalah membantu user mengetahui posisi PR/PPBJ secara cepat, jelas, dan mudah dipahami tanpa harus menanyakan status berulang kali.',
                    p2: 'Sistem ini juga membantu Divisi Umum membuat nomor SPPH, Surat Pesanan, kontrak, laporan, dan pengecekan arsip dari data yang lebih terstruktur.',
                    button: 'See Mission',
                    href: '{{ route('landing.about') }}',
                    art: 'mission',
                    list: [
                        ['fa-eye', 'Membuat status PR lebih terlihat'],
                        ['fa-clock', 'Mengurangi waktu tanya-jawab manual'],
                        ['fa-chart-line', 'Membantu evaluasi progress dan SLA']
                    ]
                },
                strategy: {
                    title: 'Our strategy is simple: one data, many outputs',
                    p1: 'Strateginya adalah menggunakan satu data utama PR/PPBJ untuk banyak kebutuhan: approval, tracking, dokumen otomatis, laporan, chat, chatbot, dan arsip.',
                    p2: 'Dengan pola ini, SIMONPR bisa dikembangkan lebih lanjut dan direplikasi ke cabang atau unit lain yang memiliki proses support pengadaan serupa.',
                    button: 'View Strategy',
                    href: '{{ route('landing.contact') }}',
                    art: 'strategy',
                    list: [
                        ['fa-layer-group', 'Satu data digunakan untuk banyak keluaran'],
                        ['fa-robot', 'Chatbot dan chat tim mempercepat koordinasi'],
                        ['fa-code-branch', 'Mudah dikembangkan dan direplikasi']
                    ]
                }
            };

            var tabButtons = document.querySelectorAll('[data-koral-tab]');
            var slideGrid = document.querySelector('.k-business-grid');
            var copyBox = document.getElementById('kBusinessCopy');
            var artBox = document.querySelector('.k-system-art');
            var artLayers = document.querySelectorAll('[data-koral-art]');
            var titleEl = document.getElementById('kBusinessTitle');
            var p1El = document.getElementById('kBusinessP1');
            var p2El = document.getElementById('kBusinessP2');
            var listEl = document.getElementById('kBusinessList');
            var buttonEl = document.getElementById('kBusinessButton');

            tabButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    var key = button.getAttribute('data-koral-tab');
                    var data = tabData[key];
                    if (!data || !titleEl || !p1El || !p2El) return;

                    tabButtons.forEach(function (item) {
                        item.classList.toggle('active', item === button);
                        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
                    });

                    if (slideGrid) slideGrid.classList.add('is-leaving');
                    if (copyBox) copyBox.classList.add('is-leaving');
                    if (artBox) artBox.classList.add('is-leaving');

                    setTimeout(function () {
                        titleEl.textContent = data.title;
                        p1El.textContent = data.p1;
                        p2El.textContent = data.p2;
                        if (buttonEl) {
                            buttonEl.textContent = data.button;
                            buttonEl.setAttribute('href', data.href || '#');
                        }
                        if (listEl && Array.isArray(data.list)) {
                            listEl.innerHTML = data.list.map(function (item) {
                                return '<li><i class="fas ' + item[0] + '"></i><span>' + item[1] + '</span></li>';
                            }).join('');
                        }
                        artLayers.forEach(function (layer) {
                            layer.classList.toggle('active', layer.getAttribute('data-koral-art') === data.art);
                        });
                        if (slideGrid) {
                            slideGrid.classList.remove('is-leaving');
                            slideGrid.classList.add('is-entering');
                        }
                        if (copyBox) {
                            copyBox.classList.remove('is-leaving');
                            copyBox.classList.add('is-entering');
                        }
                        if (artBox) {
                            artBox.classList.remove('is-leaving');
                            artBox.classList.add('is-entering');
                        }

                        window.requestAnimationFrame(function () {
                            window.requestAnimationFrame(function () {
                                if (slideGrid) slideGrid.classList.remove('is-entering');
                                if (copyBox) copyBox.classList.remove('is-entering');
                                if (artBox) artBox.classList.remove('is-entering');
                            });
                        });
                    }, 520);
                });
            });

            var words = ['tracking', 'approval', 'arsip', 'dashboard', 'chatbot'];
            var targets = [
                document.getElementById('homeTypewriter'),
                document.getElementById('homeBuildType')
            ].filter(Boolean);
            var wordIndex = 0;
            var charIndex = 0;
            var deleting = false;

            function tick() {
                var word = words[wordIndex];
                var text = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
                targets.forEach(function (target) { target.textContent = text || '\u00a0'; });

                if (!deleting && charIndex > word.length + 1) {
                    deleting = true;
                    setTimeout(tick, 950);
                    return;
                }

                if (deleting && charIndex < 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    charIndex = 0;
                    setTimeout(tick, 180);
                    return;
                }

                setTimeout(tick, deleting ? 52 : 86);
            }

            tick();
        })();
    </script>
@endpush
