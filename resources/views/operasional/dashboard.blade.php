@extends('layouts.app')

@section('title', 'Dashboard Operasional')

@push('styles')
<style>
    .glass {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .dark .glass {
        background: rgba(31, 41, 55, 0.8);
    }

    .fade-in {
        animation: fadeInUp 0.4s ease-out both;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .pulse-ring {
        animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulseRing {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .stat-card {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
        transition: left 0.5s ease;
    }

    .stat-card:hover::before {
        left: 100%;
    }

    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
    }

    .refresh-spin {
        animation: spin 1s linear;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* ================= TOP PORTOFOLIO ================= */
    .portfolio-card {
        position: relative;
        overflow: hidden;
        transition: all .35s ease;
    }

    .portfolio-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top right, rgba(59, 130, 246, .18), transparent 35%),
                    radial-gradient(circle at bottom left, rgba(139, 92, 246, .14), transparent 35%);
        opacity: .85;
        pointer-events: none;
    }

    .portfolio-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: -120%;
        width: 80%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent);
        transform: skewX(-20deg);
        animation: portfolioShine 5s ease-in-out infinite;
        pointer-events: none;
    }

    @keyframes portfolioShine {
        0%, 35% { left: -120%; }
        55%, 100% { left: 130%; }
    }

    .portfolio-item {
        position: relative;
        transition: all .25s ease;
        animation: portfolioItemIn .45s ease-out both;
    }

    .portfolio-item:hover {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 16px 30px -18px rgba(37, 99, 235, .55);
    }

    @keyframes portfolioItemIn {
        from {
            opacity: 0;
            transform: translateY(12px) scale(.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .portfolio-rank {
        box-shadow: 0 8px 20px -10px currentColor;
    }

    .portfolio-bar {
        position: relative;
        overflow: hidden;
    }

    .portfolio-bar > span {
        animation: portfolioBarGrow .9s ease-out both;
        transform-origin: left;
    }

    @keyframes portfolioBarGrow {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
    }

    .portfolio-money {
        animation: countUp .6s ease-out both;
    }

    .dark .portfolio-card {
        background: rgba(17, 24, 39, .82);
    }

    .dark .portfolio-item {
        background: rgba(31, 41, 55, .72);
        border-color: rgba(75, 85, 99, .75);
    }


    /* ================= FIX TOP PORTOFOLIO DARK / LIGHT CONTRAST ================= */
    .portfolio-metric-card,
    .portfolio-summary-box {
        background: rgba(249, 250, 251, .92) !important;
        border: 1px solid rgba(229, 231, 235, .9) !important;
        color: #111827 !important;
    }

    .portfolio-metric-label,
    .portfolio-summary-label {
        color: #6b7280 !important;
    }

    .portfolio-metric-value,
    .portfolio-summary-value {
        color: #111827 !important;
    }

    .dark .portfolio-metric-card,
    .dark .portfolio-summary-box {
        background: rgba(15, 23, 42, .96) !important;
        border-color: rgba(51, 65, 85, .95) !important;
        color: #ffffff !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
    }

    .dark .portfolio-metric-label,
    .dark .portfolio-summary-label {
        color: #cbd5e1 !important;
    }

    .dark .portfolio-metric-value,
    .dark .portfolio-summary-value,
    .dark .portfolio-metric-card div,
    .dark .portfolio-summary-box div {
        color: #ffffff !important;
    }

    .dark .portfolio-item .text-gray-500,
    .dark .portfolio-item .text-gray-400 {
        color: #cbd5e1 !important;
    }


    /* ================= FIX RANK BADGE VISIBILITY ================= */
    .portfolio-rank {
        color: #ffffff !important;
        background: linear-gradient(135deg, #2563eb, #4f46e5) !important;
        border: 1px solid rgba(255, 255, 255, .35) !important;
        box-shadow: 0 10px 22px -12px rgba(37, 99, 235, .65) !important;
    }

    .portfolio-rank.rank-1 {
        color: #78350f !important;
        background: linear-gradient(135deg, #fde68a, #f59e0b) !important;
        border-color: rgba(245, 158, 11, .45) !important;
        box-shadow: 0 10px 22px -12px rgba(245, 158, 11, .8) !important;
    }

    .portfolio-rank.rank-2 {
        color: #ffffff !important;
        background: linear-gradient(135deg, #38bdf8, #2563eb) !important;
        border-color: rgba(56, 189, 248, .55) !important;
        box-shadow: 0 10px 22px -12px rgba(56, 189, 248, .75) !important;
    }

    .portfolio-rank.rank-3 {
        color: #ffffff !important;
        background: linear-gradient(135deg, #fb923c, #c2410c) !important;
        border-color: rgba(249, 115, 22, .45) !important;
        box-shadow: 0 10px 22px -12px rgba(249, 115, 22, .75) !important;
    }

    .portfolio-rank.rank-4 {
        color: #ffffff !important;
        background: linear-gradient(135deg, #3b82f6, #4f46e5) !important;
    }

    .portfolio-rank.rank-5 {
        color: #ffffff !important;
        background: linear-gradient(135deg, #a855f7, #d946ef) !important;
    }

    .portfolio-rank.rank-6 {
        color: #ffffff !important;
        background: linear-gradient(135deg, #10b981, #0f766e) !important;
    }

    .dark .portfolio-rank.rank-1 {
        color: #78350f !important;
    }

    .dark .portfolio-rank.rank-2 {
        color: #ffffff !important;
    }


    /* ================= FIX APEXCHARTS TEXT IN DARK MODE ================= */
    .dark .apexcharts-text,
    .dark .apexcharts-title-text,
    .dark .apexcharts-subtitle-text,
    .dark .apexcharts-legend-text,
    .dark .apexcharts-datalabel-label,
    .dark .apexcharts-datalabel-value,
    .dark .apexcharts-datalabels text {
        fill: #ffffff !important;
        color: #ffffff !important;
    }

    .dark .apexcharts-pie-label,
    .dark .apexcharts-datalabel {
        fill: #ffffff !important;
    }

    .dark .apexcharts-gridline {
        stroke: rgba(148, 163, 184, .28) !important;
    }

    .dark .apexcharts-tooltip,
    .dark .apexcharts-tooltip-title {
        background: #111827 !important;
        color: #ffffff !important;
        border-color: #374151 !important;
    }


    /* ================= FIX DONUT CENTER TEXT LIGHT / DARK ================= */
    html:not(.dark) #donutStatus .apexcharts-datalabel-label,
    html:not(.dark) #donutStatus .apexcharts-datalabel-value {
        fill: #111827 !important;
        color: #111827 !important;
        opacity: 1 !important;
    }

    html:not(.dark) #donutStatus .apexcharts-legend-text {
        color: #374151 !important;
    }

    .dark #donutStatus .apexcharts-datalabel-label,
    .dark #donutStatus .apexcharts-datalabel-value {
        fill: #ffffff !important;
        color: #ffffff !important;
        opacity: 1 !important;
    }

    .dark #donutStatus .apexcharts-legend-text {
        color: #cbd5e1 !important;
    }


    /* ================= FIX PORTOFOLIO BAR COLOR STATIC ================= */
    .portfolio-bar-fill {
        display: block;
        height: 100%;
        border-radius: 9999px;
        animation: portfolioBarGrow .9s ease-out both;
        transform-origin: left;
        box-shadow: 0 0 14px rgba(59, 130, 246, .25);
    }

    .portfolio-bar-fill.rank-1 {
        background: linear-gradient(90deg, #facc15, #f59e0b) !important;
        box-shadow: 0 0 18px rgba(245, 158, 11, .45);
    }

    .portfolio-bar-fill.rank-2 {
        background: linear-gradient(90deg, #38bdf8, #2563eb) !important;
        box-shadow: 0 0 18px rgba(56, 189, 248, .45);
    }

    .portfolio-bar-fill.rank-3 {
        background: linear-gradient(90deg, #fb923c, #ea580c) !important;
        box-shadow: 0 0 18px rgba(251, 146, 60, .45);
    }

    .portfolio-bar-fill.rank-4 {
        background: linear-gradient(90deg, #60a5fa, #4f46e5) !important;
        box-shadow: 0 0 18px rgba(96, 165, 250, .45);
    }

    .portfolio-bar-fill.rank-5 {
        background: linear-gradient(90deg, #c084fc, #9333ea) !important;
        box-shadow: 0 0 18px rgba(192, 132, 252, .45);
    }

    .portfolio-bar-fill.rank-6 {
        background: linear-gradient(90deg, #34d399, #059669) !important;
        box-shadow: 0 0 18px rgba(52, 211, 153, .45);
    }

    .dark .portfolio-bar {
        background: rgba(71, 85, 105, .75) !important;
    }

</style>
@endpush

@section('content')
<div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    {{-- Header --}}
    <div class="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div class="fade-in">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-white">
                📊 Dashboard Operasional
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                <span class="inline-flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full pulse-ring mr-1"></span>
                    Real-time monitoring
                </span>
                | Ringkasan TORPR & Progress Receipt
            </p>
        </div>
        
        <div class="flex gap-2">
            {{-- Refresh Cache Button --}}
            <button type="button" onclick="refreshCache()" id="refreshBtn"
                    class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-gray-700 dark:text-gray-300 
                           bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                    title="Refresh cache data">
                <svg id="refreshIcon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span class="hidden sm:inline">Refresh</span>
            </button>

            {{-- Go to TORPR Button --}}
            <a href="{{ route('torpr.index') }}"
                class="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold 
                                          bg-green-600 hover:bg-green-700 text-white transition-all shadow-sm hover:shadow-md">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                Ke TORPR
            </a>
        </div>
    </div>

    {{-- KPI Cards --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 dark:text-white">
        @php
            $cards = [
                [
                    'id' => 'stat-total',
                    'label' => 'Total TORPR',
                    'value' => $total,
                    'icon' => '📦',
                    'hint' => 'Semua data',
                    'gradient' => 'from-blue-500 to-blue-600',
                    'shadow' => 'shadow-blue-500/30'
                ],
                [
                    'id' => 'stat-draft',
                    'label' => 'Draft',
                    'value' => $draft,
                    'icon' => '📝',
                    'hint' => 'Belum request',
                    'gradient' => 'from-gray-500 to-gray-600',
                    'shadow' => 'shadow-gray-500/30'
                ],
                [
                    'id' => 'stat-pending',
                    'label' => 'Pending',
                    'value' => $pending,
                    'icon' => '⏳',
                    'hint' => 'Menunggu approval',
                    'gradient' => 'from-yellow-500 to-amber-600',
                    'shadow' => 'shadow-yellow-500/30'
                ],
                [
                    'id' => 'stat-approved',
                    'label' => 'Approved',
                    'value' => $approved,
                    'icon' => '✅',
                    'hint' => 'Sudah diterima',
                    'gradient' => 'from-green-500 to-emerald-600',
                    'shadow' => 'shadow-green-500/30'
                ],
                [
                    'id' => 'stat-rejected',
                    'label' => 'Rejected',
                    'value' => $rejected,
                    'icon' => '⛔',
                    'hint' => 'Ditolak',
                    'gradient' => 'from-red-500 to-red-600',
                    'shadow' => 'shadow-red-500/30'
                ],
            ];
        @endphp

        @foreach($cards as $i => $c)
            <div class="stat-card glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-5 shadow-lg {{ $c['shadow'] }} fade-in"
                 style="animation-delay: {{ $i * 60 }}ms;">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ $c['label'] }}</div>
                        <div id="{{ $c['id'] }}" class="text-4xl font-extrabold mt-2 mb-1 tabular-nums bg-gradient-to-r {{ $c['gradient'] }} bg-clip-text text-transparent" 
                             data-count-to="{{ $c['value'] }}">0</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ $c['hint'] }}</div>
                    </div>
                    <div class="text-3xl opacity-80">{{ $c['icon'] }}</div>
                </div>
            </div>
        @endforeach
    </div>

    {{-- Charts Row --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {{-- Donut Chart --}}
        <div class="glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg lg:col-span-1 fade-in dark:text-white"
             style="animation-delay: 320ms;">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white">Komposisi Status</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 dark:text-white">Draft / Pending / Approved / Rejected</p>
                </div>
            </div>
            <div id="donutStatus" class="min-h-[280px]"></div>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Rata-rata pending:</span>
                    <span id="kpi-avg-hours" class="font-bold text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        {{ $avgPendingHours }}
                    </span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">jam</p>
            </div>
        </div>

        {{-- Area Chart --}}
        <div class="glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg lg:col-span-2 fade-in"
             style="animation-delay: 380ms;">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white">Trend Bulanan</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Berdasarkan tanggal PR (6 bulan terakhir)</p>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">ApexCharts</span>
                </div>
            </div>
            <div id="areaMonthly" class="min-h-[280px]"></div>
        </div>
    </div>


    {{-- Top Portofolio --}}
    @php
        $topPortofolios = collect($topPortofolios ?? []);
        $topPortfolioWinner = $topPortofolios->first();
        $maxPortfolioPr = max((int) ($topPortofolios->max('total_pr') ?? 0), 1);
        $totalPortfolioPr = (int) $topPortofolios->sum('total_pr');
        $totalPortfolioHarga = (float) $topPortofolios->sum('total_harga');

        $rankStyles = [
            ['badge' => 'from-yellow-400 to-amber-600', 'text' => 'text-amber-600 dark:text-amber-300', 'bar' => 'from-amber-400 to-yellow-500'],
            ['badge' => 'from-slate-300 to-slate-500', 'text' => 'text-slate-600 dark:text-slate-300', 'bar' => 'from-slate-400 to-slate-500'],
            ['badge' => 'from-orange-400 to-orange-700', 'text' => 'text-orange-600 dark:text-orange-300', 'bar' => 'from-orange-400 to-orange-600'],
            ['badge' => 'from-blue-500 to-indigo-600', 'text' => 'text-blue-600 dark:text-blue-300', 'bar' => 'from-blue-500 to-indigo-600'],
            ['badge' => 'from-purple-500 to-fuchsia-600', 'text' => 'text-purple-600 dark:text-purple-300', 'bar' => 'from-purple-500 to-fuchsia-600'],
            ['badge' => 'from-emerald-500 to-teal-600', 'text' => 'text-emerald-600 dark:text-emerald-300', 'bar' => 'from-emerald-500 to-teal-600'],
        ];
    @endphp

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div class="portfolio-card glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg xl:col-span-2 fade-in"
             style="animation-delay: 410ms;">
            <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800 mb-2">
                        <span class="w-2 h-2 rounded-full bg-blue-500 pulse-ring"></span>
                        Analisis Portofolio
                    </div>
                    <h3 class="font-bold text-xl text-gray-900 dark:text-white">Top Portofolio TORPR</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Berdasarkan data <span class="font-semibold">portofolio TORPR</span>, menampilkan jumlah PR, total harga PR, dan rata-rata harga PR.
                    </p>
                </div>

                <div class="text-left sm:text-right">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Total dari total top portofolio</div>
                    <div class="text-lg font-extrabold text-gray-900 dark:text-white">
                        Rp {{ number_format($totalPortfolioHarga, 0, ',', '.') }}
                    </div>
                </div>
            </div>

            <div id="top-portofolio-list" class="relative space-y-3">
                @forelse($topPortofolios as $i => $p)
                    @php
                        $style = $rankStyles[$i] ?? $rankStyles[5];
                        $percentage = round(((int) $p->total_pr / $maxPortfolioPr) * 100);
                        $percentage = max($percentage, (int) $p->total_pr > 0 ? 8 : 3);
                    @endphp

                    <div class="portfolio-item rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/80 dark:bg-gray-800/70 p-4"
                         style="animation-delay: {{ 460 + ($i * 70) }}ms;">
                        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div class="flex items-center gap-3 min-w-0 flex-1">
                                <div class="portfolio-rank rank-{{ min($i + 1, 6) }} flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-black">
                                    #{{ $i + 1 }}
                                </div>

                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2">
                                        <h4 class="font-bold text-gray-900 dark:text-white truncate" title="{{ $p->portofolio }}">
                                            {{ $p->portofolio }}
                                        </h4>
                                        @if($i === 0)
                                            <span class="shrink-0 inline-flex items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200 px-2 py-0.5 text-[10px] font-bold">
                                                🏆 Teratas
                                            </span>
                                        @endif
                                    </div>

                                    <div class="mt-2 portfolio-bar h-2.5 rounded-full bg-gray-100 dark:bg-gray-700">
                                        <span class="portfolio-bar-fill rank-{{ min($i + 1, 6) }}"
                                              style="width: {{ $percentage }}%; animation-delay: {{ 520 + ($i * 70) }}ms;"></span>
                                    </div>

                                    <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        {{ number_format($p->total_pr, 0, ',', '.') }} PR
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:w-[420px]">
                                <div class="portfolio-metric-card rounded-xl px-3 py-2">
                                    <div class="portfolio-metric-label text-[10px] uppercase font-bold">Jumlah PR</div>
                                    <div class="text-lg font-extrabold {{ $style['text'] }}">{{ number_format($p->total_pr, 0, ',', '.') }}</div>
                                </div>

                                <div class="portfolio-metric-card rounded-xl px-3 py-2">
                                    <div class="portfolio-metric-label text-[10px] uppercase font-bold">Total Harga</div>
                                    <div class="portfolio-metric-value portfolio-money text-sm font-extrabold">
                                        Rp {{ number_format($p->total_harga, 0, ',', '.') }}
                                    </div>
                                </div>

                                <div class="portfolio-metric-card rounded-xl px-3 py-2 col-span-2 sm:col-span-1">
                                    <div class="portfolio-metric-label text-[10px] uppercase font-bold">Rata-rata</div>
                                    <div class="portfolio-metric-value text-sm font-extrabold">
                                        Rp {{ number_format($p->rata_harga, 0, ',', '.') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="relative rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                        <div class="mx-auto w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                            <span class="text-2xl">🧩</span>
                        </div>
                        <p class="font-semibold text-gray-900 dark:text-white">Belum ada data portofolio</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Isi kolom portofolio di TORPR agar statistik ini muncul.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <div class="portfolio-card glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg fade-in"
             style="animation-delay: 460ms;">
            <div class="relative h-full flex flex-col">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h3 class="font-bold text-lg text-gray-900 dark:text-white">Portofolio Teratas</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ringkasan portofolio</p>
                    </div>
                    <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <span class="text-2xl">🏆</span>
                    </div>
                </div>

                @if($topPortfolioWinner)
                    <div class="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-xl shadow-blue-500/20">
                        <div class="text-xs uppercase tracking-wide text-blue-100 font-bold">Portofolio TORPR Terbanyak</div>
                        <div class="text-2xl font-black mt-2 leading-tight">{{ $topPortfolioWinner->portofolio }}</div>

                        <div class="grid grid-cols-2 gap-3 mt-5">
                            <div class="rounded-xl bg-white/15 p-3 backdrop-blur">
                                <div class="text-[10px] uppercase text-blue-100 font-bold">Jumlah PR</div>
                                <div class="text-2xl font-black">{{ number_format($topPortfolioWinner->total_pr, 0, ',', '.') }}</div>
                            </div>
                            <div class="rounded-xl bg-white/15 p-3 backdrop-blur">
                                <div class="text-[10px] uppercase text-blue-100 font-bold">Total Harga</div>
                                <div class="text-lg font-black">Rp {{ number_format($topPortfolioWinner->total_harga, 0, ',', '.') }}</div>
                            </div>
                        </div>

                        <div class="mt-4 rounded-xl bg-white/15 p-3 backdrop-blur">
                            <div class="text-[10px] uppercase text-blue-100 font-bold">Rata-rata Harga PR</div>
                            <div class="text-xl font-black">Rp {{ number_format($topPortfolioWinner->rata_harga, 0, ',', '.') }}</div>
                        </div>
                    </div>

                    <div class="mt-4 grid grid-cols-2 gap-3">
                        <div class="portfolio-summary-box rounded-2xl p-4">
                            <div class="portfolio-summary-label text-xs font-bold uppercase">Kontribusi</div>
                            <div class="portfolio-summary-value text-2xl font-black mt-1">
                                {{ $totalPortfolioPr > 0 ? round(($topPortfolioWinner->total_pr / $totalPortfolioPr) * 100) : 0 }}%
                            </div>
                            <div class="text-[11px] text-gray-500 dark:text-gray-400">dari total top portofolio</div>
                        </div>

                        <div class="portfolio-summary-box rounded-2xl p-4">
                            <div class="portfolio-summary-label text-xs font-bold uppercase">Rata-rata</div>
                            <div class="portfolio-summary-value text-lg font-black mt-1">
                                Rp {{ number_format($topPortfolioWinner->rata_harga, 0, ',', '.') }}
                            </div>
                            <div class="text-[11px] text-gray-500 dark:text-gray-400">per PR</div>
                        </div>
                    </div>
                @else
                    <div class="flex-1 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center flex flex-col items-center justify-center">
                        <div class="text-4xl mb-3">📭</div>
                        <p class="font-semibold text-gray-900 dark:text-white">Belum ada ranking</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Data akan tampil setelah portofolio TORPR diisi.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>


    {{-- Latest Rows Table --}}
    <div class="glass border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg fade-in" 
         style="animation-delay: 420ms;">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">3 data TORPR terakhir</p>
            </div>
            <a href="{{ route('torpr.index') }}" 
               class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition">
                Lihat semua
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <table class="min-w-full w-full text-sm">
                <thead class="bg-dark dark:bg-dark border-b border-gray-200 dark:border-gray-700/50">
                    <tr class="text-gray-700 dark:text-gray-300">
                        <th class="px-6 py-3 text-left font-semibold">No</th>
                        <th class="px-6 py-3 text-left font-semibold">Nomor PR</th>
                        <th class="px-6 py-3 text-left font-semibold">Tujuan Pengadaan</th>
                        <th class="px-6 py-3 text-left font-semibold">Tanggal PR</th>
                        <th class="px-6 py-3 text-center font-semibold">Status</th>
                        <th class="px-6 py-3 text-right font-semibold">Aksi</th>
                    </tr>
                </thead>
                <tbody id="latest-rows-tbody" class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    @forelse($latestRows as $r)
                        @php
                            $statusConfig = match ($r['status']) {
                                'APPROVED' => ['bg' => 'bg-green-100 dark:bg-green-900/30', 'text' => 'text-green-700 dark:text-gray-300', 'icon' => '✅'],
                                'PENDING' => ['bg' => 'bg-yellow-100 dark:bg-yellow-900/30', 'text' => 'text-yellow-700 dark:text-white', 'icon' => '⏳'],
                                'REJECTED' => ['bg' => 'bg-red-100 dark:bg-red-900/30', 'text' => 'text-red-700 dark:text-white', 'icon' => '⛔'],
                                default => ['bg' => 'bg-gray-100 dark:bg-gray-700', 'text' => 'text-gray-700 dark:text-gray-300', 'icon' => '📝']
                            };
                        @endphp
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td class="px-6 py-4 text-gray-600 dark:text-gray-400">{{ $loop->iteration }}</td>
                            <td class="px-6 py-4">
                                <span class="font-semibold text-gray-900 dark:text-gray-400">{{ $r['nomor_pr'] ?? '—' }}</span>
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                                {{ Str::limit($r['tujuan_pengadaan'] ?? '—', 50) }}
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-gray-400 tabular-nums">
                                {{ $r['tanggal_pr'] ?? '—' }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold {{ $statusConfig['bg'] }} {{ $statusConfig['text'] }} border border-gray-200 dark:border-gray-600">
                                    <span>{{ $statusConfig['icon'] }}</span>
                                    {{ $r['status'] }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="{{ route('torpr.index') }}"
                                   class="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold 
                                          bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Detail
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center">
                                <div class="flex flex-col items-center gap-3">
                                    <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-gray-900 dark:text-white font-semibold">Belum ada data TORPR</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Buat TORPR pertama Anda</p>
                                    </div>
                                    <a href="{{ route('torpr.index') }}" class="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Buat TORPR
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    {{-- Auto-refresh indicator --}}
    <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span class="inline-flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full pulse-ring mr-1"></span>
            Auto-refresh setiap 60 detik
        </span>
        <span>|</span>
        <span>Terakhir diperbarui: <span id="lastUpdated">{{ now()->format('H:i:s') }}</span></span>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

<script>
    // ================= THEME HELPER =================
    const dashboardIsDark = document.documentElement.classList.contains('dark');
    const dashboardTextColor = dashboardIsDark ? '#ffffff' : '#374151';
    const dashboardMutedColor = dashboardIsDark ? '#cbd5e1' : '#6b7280';
    const dashboardGridColor = dashboardIsDark ? 'rgba(148, 163, 184, .28)' : '#E5E7EB';
    const dashboardTooltipTheme = dashboardIsDark ? 'dark' : 'light';


    function applyDashboardApexTextColors() {
        const isDark = document.documentElement.classList.contains('dark');
        const main = isDark ? '#ffffff' : '#111827';
        const muted = isDark ? '#cbd5e1' : '#374151';

        document.querySelectorAll('.apexcharts-datalabel-label').forEach(el => {
            el.style.fill = muted;
            el.style.color = muted;
        });

        document.querySelectorAll('.apexcharts-datalabel-value').forEach(el => {
            el.style.fill = main;
            el.style.color = main;
            el.style.fontWeight = '700';
        });

        document.querySelectorAll('.apexcharts-legend-text').forEach(el => {
            el.style.color = muted;
        });

        document.querySelectorAll('.apexcharts-text').forEach(el => {
            if (!el.classList.contains('apexcharts-pie-label')) {
                el.style.fill = muted;
            }
        });
    }

    // ================= COUNT-UP ANIMATION =================
    (function () {
        const els = document.querySelectorAll('[data-count-to]');
        const dur = 800;
        const ease = t => 1 - Math.pow(1 - t, 3);

        const run = (el) => {
            const to = Number(el.getAttribute('data-count-to') || 0);
            const start = performance.now();
            const from = 0;

            function tick(now) {
                const p = Math.min(1, (now - start) / dur);
                const v = Math.round(from + (to - from) * ease(p));
                el.textContent = v.toLocaleString('id-ID');
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        };

        els.forEach(run);
    })();

    // ================= DONUT CHART =================
    let donutChart;
    (function () {
        const series = [
            {{ (int) $draft }}, 
            {{ (int) $pending }}, 
            {{ (int) $approved }}, 
            {{ (int) $rejected }}
        ];
        
        const options = {
            chart: { 
                type: 'donut', 
                height: 300,
                foreColor: dashboardTextColor,
                events: {
                    mounted: function () {
                        setTimeout(applyDashboardApexTextColors, 50);
                    },
                    updated: function () {
                        setTimeout(applyDashboardApexTextColors, 50);
                    }
                },
                animations: { 
                    enabled: true, 
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    }
                },
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 4,
                    opacity: 0.15
                }
            },
            labels: ['Draft', 'Pending', 'Approved', 'Rejected'],
            series: series,
            colors: ['#6B7280', '#EAB308', '#10B981', '#EF4444'],
            legend: { 
                position: 'bottom',
                fontSize: '13px',
                fontWeight: 600,
                labels: {
                    colors: dashboardMutedColor
                },
                markers: {
                    width: 12,
                    height: 12,
                    radius: 3
                }
            },
            dataLabels: { 
                enabled: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    colors: ['#ffffff']
                },
                dropShadow: {
                    enabled: false
                }
            },
            stroke: { 
                width: 3,
                colors: ['#fff']
            },
            plotOptions: { 
                pie: { 
                    donut: { 
                        size: '68%',
                        labels: {
                            show: true,
                            name: {
                                color: dashboardMutedColor,
                                fontSize: '16px',
                                fontWeight: 700
                            },
                            value: {
                                color: dashboardTextColor,
                                fontSize: '22px',
                                fontWeight: 800
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Total',
                                fontSize: '16px',
                                fontWeight: 700,
                                color: dashboardMutedColor,
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                }
                            }
                        }
                    }
                } 
            },
            tooltip: { 
                theme: dashboardTooltipTheme,
                y: { 
                    formatter: v => `${v.toLocaleString('id-ID')} data` 
                },
                style: {
                    fontSize: '13px'
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 250
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
        
        donutChart = new ApexCharts(document.querySelector("#donutStatus"), options);
        donutChart.render().then(() => {
            applyDashboardApexTextColors();
        });
    })();

    // ================= AREA CHART =================
    let areaChart;
    (function () {
        const labels = @json($monthlyLabels);
        const series = @json($monthlySeries);

        const options = {
            chart: { 
                type: 'area', 
                height: 300,
                foreColor: dashboardTextColor,
                toolbar: { show: false },
                animations: { 
                    enabled: true, 
                    speed: 900,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    }
                },
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 6,
                    opacity: 0.1
                }
            },
            series: [{ 
                name: 'Jumlah PR', 
                data: series 
            }],
            xaxis: { 
                categories: labels,
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500,
                        colors: dashboardMutedColor
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500,
                        colors: dashboardMutedColor
                    },
                    formatter: function (val) {
                        return Math.round(val);
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { 
                curve: 'smooth', 
                width: 3,
                colors: ['#3B82F6']
            },
            fill: { 
                type: 'gradient', 
                gradient: { 
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.05,
                    stops: [0, 90, 100]
                },
                colors: ['#3B82F6']
            },
            grid: { 
                strokeDashArray: 4,
                borderColor: dashboardGridColor,
                padding: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 10
                }
            },
            tooltip: { 
                theme: dashboardTooltipTheme,
                y: { 
                    formatter: v => `${v.toLocaleString('id-ID')} PR` 
                },
                style: {
                    fontSize: '13px'
                }
            },
            colors: ['#3B82F6'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 250
                    }
                }
            }]
        };
        
        areaChart = new ApexCharts(document.querySelector("#areaMonthly"), options);
        areaChart.render();
    })();

    // ================= AJAX AUTO-REFRESH =================
    let refreshInterval = null;

    async function refreshDashboardData() {
        try {
            const response = await fetch('{{ route("ops.dashboard.data") }}', {
                headers: { 'Accept': 'application/json' }
            });
            
            if (!response.ok) {
                console.warn('Failed to fetch dashboard data');
                return;
            }
            
            const { data } = await response.json();
            
            // Update stats with animation
            updateStatCard('stat-total', data.stats.total);
            updateStatCard('stat-draft', data.stats.draft);
            updateStatCard('stat-pending', data.stats.pending);
            updateStatCard('stat-approved', data.stats.approved);
            updateStatCard('stat-rejected', data.stats.rejected);
            
            // Update KPI
            document.getElementById('kpi-avg-hours').textContent = data.kpi.avgPendingHours;
            
            // Update charts
            if (donutChart) {
                donutChart.updateSeries([
                    data.stats.draft,
                    data.stats.pending,
                    data.stats.approved,
                    data.stats.rejected
                ]).then(() => {
                    applyDashboardApexTextColors();
                });
            }
            
            if (areaChart) {
                areaChart.updateOptions({
                    xaxis: { categories: data.chart.labels },
                    series: [{ data: data.chart.series }]
                });
            }
            
            // Update latest rows
            updateLatestRows(data.latest);

            // Update top portofolio TORPR
            if (data.topPortofolios) {
                updateTopPortofolios(data.topPortofolios);
            }
            
            // Update timestamp
            document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString('id-ID');
            
        } catch (error) {
            console.warn('Auto-refresh error:', error);
        }
    }

    function updateStatCard(id, newValue) {
        const el = document.getElementById(id);
        if (!el) return;
        
        const oldValue = parseInt(el.getAttribute('data-count-to') || 0);
        if (oldValue === newValue) return;
        
        el.setAttribute('data-count-to', newValue);
        
        // Animate
        const dur = 600;
        const start = performance.now();
        const ease = t => 1 - Math.pow(1 - t, 3);
        
        function tick(now) {
            const p = Math.min(1, (now - start) / dur);
            const v = Math.round(oldValue + (newValue - oldValue) * ease(p));
            el.textContent = v.toLocaleString('id-ID');
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }


    function formatRupiahDashboard(value) {
        const number = Number(value || 0);
        return 'Rp ' + number.toLocaleString('id-ID');
    }

    function updateTopPortofolios(rows) {
        const wrapper = document.getElementById('top-portofolio-list');
        if (!wrapper || !rows || !rows.length) return;

        const maxPr = Math.max(...rows.map(row => Number(row.total_pr || 0)), 1);
        const styles = [
            { badge: 'from-yellow-400 to-amber-600', text: 'text-amber-600 dark:text-amber-300', bar: 'from-amber-400 to-yellow-500' },
            { badge: 'from-slate-300 to-slate-500', text: 'text-slate-600 dark:text-slate-300', bar: 'from-slate-400 to-slate-500' },
            { badge: 'from-orange-400 to-orange-700', text: 'text-orange-600 dark:text-orange-300', bar: 'from-orange-400 to-orange-600' },
            { badge: 'from-blue-500 to-indigo-600', text: 'text-blue-600 dark:text-blue-300', bar: 'from-blue-500 to-indigo-600' },
            { badge: 'from-purple-500 to-fuchsia-600', text: 'text-purple-600 dark:text-purple-300', bar: 'from-purple-500 to-fuchsia-600' },
            { badge: 'from-emerald-500 to-teal-600', text: 'text-emerald-600 dark:text-emerald-300', bar: 'from-emerald-500 to-teal-600' }
        ];

        wrapper.innerHTML = rows.map((row, idx) => {
            const style = styles[idx] || styles[5];
            const totalPr = Number(row.total_pr || 0);
            const totalHarga = Number(row.total_harga || 0);
            const rataHarga = Number(row.rata_harga || 0);
            const percent = Math.max(Math.round((totalPr / maxPr) * 100), totalPr > 0 ? 8 : 3);

            return `
                <div class="portfolio-item rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/80 dark:bg-gray-800/70 p-4"
                     style="animation-delay: ${idx * 70}ms;">
                    <div class="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div class="flex items-center gap-3 min-w-0 flex-1">
                            <div class="portfolio-rank rank-${Math.min(idx + 1, 6)} flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-black">
                                #${idx + 1}
                            </div>

                            <div class="min-w-0 flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold text-gray-900 dark:text-white truncate" title="${row.portofolio || '-'}">
                                        ${row.portofolio || '-'}
                                    </h4>
                                    ${idx === 0 ? '<span class="shrink-0 inline-flex items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200 px-2 py-0.5 text-[10px] font-bold">🏆 Teratas</span>' : ''}
                                </div>

                                <div class="mt-2 portfolio-bar h-2.5 rounded-full bg-gray-100 dark:bg-gray-700">
                                    <span class="portfolio-bar-fill rank-${Math.min(idx + 1, 6)}" style="width: ${percent}%;"></span>
                                </div>

                                <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    ${totalPr.toLocaleString('id-ID')} PR
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:w-[420px]">
                            <div class="portfolio-metric-card rounded-xl px-3 py-2">
                                <div class="portfolio-metric-label text-[10px] uppercase font-bold">Jumlah PR</div>
                                <div class="text-lg font-extrabold ${style.text}">${totalPr.toLocaleString('id-ID')}</div>
                            </div>
                            <div class="portfolio-metric-card rounded-xl px-3 py-2">
                                <div class="portfolio-metric-label text-[10px] uppercase font-bold">Total Harga</div>
                                <div class="portfolio-metric-value text-sm font-extrabold">${formatRupiahDashboard(totalHarga)}</div>
                            </div>
                            <div class="portfolio-metric-card rounded-xl px-3 py-2 col-span-2 sm:col-span-1">
                                <div class="portfolio-metric-label text-[10px] uppercase font-bold">Rata-rata</div>
                                <div class="portfolio-metric-value text-sm font-extrabold">${formatRupiahDashboard(rataHarga)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function updateLatestRows(rows) {
        const tbody = document.getElementById('latest-rows-tbody');
        if (!tbody || !rows || rows.length === 0) return;
        
        const statusConfig = {
            'APPROVED': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: '✅' },
            'PENDING': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: '⏳' },
            'REJECTED': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: '⛔' },
            'DRAFT': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', icon: '📝' }
        };
        
        tbody.innerHTML = rows.map((row, idx) => {
            const config = statusConfig[row.status] || statusConfig['DRAFT'];
            const tujuan = row.tujuan_pengadaan || '—';
            const limitedTujuan = tujuan.length > 50 ? tujuan.substring(0, 50) + '...' : tujuan;
            
            return `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">${idx + 1}</td>
                    <td class="px-6 py-4">
                        <span class="font-semibold text-gray-900 dark:text-white">${row.nomor_pr || '—'}</span>
                    </td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">${limitedTujuan}</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400 tabular-nums">${row.tanggal_pr || '—'}</td>
                    <td class="px-6 py-4 text-center">
                        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.text} border border-gray-200 dark:border-gray-600">
                            <span>${config.icon}</span>
                            ${row.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a href="{{ route('torpr.index') }}"
                           class="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Detail
                        </a>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ================= MANUAL CACHE REFRESH =================
    async function refreshCache() {
        const btn = document.getElementById('refreshBtn');
        const icon = document.getElementById('refreshIcon');
        
        if (!btn || !icon) return;
        
        btn.disabled = true;
        icon.classList.add('refresh-spin');
        
        try {
            const response = await fetch('{{ route("ops.dashboard.refresh") }}', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cache Refreshed!',
                    text: 'Dashboard Telah di Update',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                throw new Error('Failed to refresh');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to refresh cache',
                confirmButtonColor: '#3B82F6'
            });
        } finally {
            setTimeout(() => {
                btn.disabled = false;
                icon.classList.remove('refresh-spin');
            }, 1000);
        }
    }

    // ================= START AUTO-REFRESH =================
    document.addEventListener('DOMContentLoaded', function() {
        // Start interval
        refreshInterval = setInterval(refreshDashboardData, 60000); // 60 seconds
        
        // Pause when page hidden
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(refreshInterval);
            } else {
                refreshInterval = setInterval(refreshDashboardData, 60000);
            }
        });
    });
</script>
@endpush