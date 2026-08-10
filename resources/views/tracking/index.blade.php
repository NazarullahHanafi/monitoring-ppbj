@extends('layouts.app')

@section('title', 'Tracking PR & PPBJ')

@push('styles')
    <style>
        .timeline {
            margin-top: 1.5rem;
            position: relative;
        }

        .tl-row {
            display: grid;
            grid-template-columns: 130px 28px 1fr;
            gap: 1rem;
            align-items: flex-start;
            margin: 1rem 0;
            animation: fadeInUp 0.4s ease-out backwards;
        }

        .tl-row:nth-child(1) {
            animation-delay: 0.05s;
        }

        .tl-row:nth-child(2) {
            animation-delay: 0.1s;
        }

        .tl-row:nth-child(3) {
            animation-delay: 0.15s;
        }

        .tl-row:nth-child(4) {
            animation-delay: 0.2s;
        }

        .tl-row:nth-child(5) {
            animation-delay: 0.25s;
        }

        .tl-row:nth-child(6) {
            animation-delay: 0.3s;
        }

        .tl-row:nth-child(7) {
            animation-delay: 0.35s;
        }

        .tl-row:nth-child(8) {
            animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tl-time {
            font-size: 0.75rem;
            color: #6b7280;
            font-weight: 500;
            text-align: right;
            padding-top: 4px;
        }

        .tl-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #d1d5db;
            position: relative;
            margin-top: 4px;
            box-shadow: 0 0 0 4px rgba(209, 213, 219, 0.2);
            transition: all 0.3s ease;
        }

        .tl-dot.done {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
        }

        .tl-dot.pending {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .tl-dot.rejected {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
        }

        .tl-dot.info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .tl-dot.skipped {
            background: linear-gradient(135deg, #9ca3af, #6b7280);
            box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.2);
        }

        @keyframes pulse {

            0%,
            100% {
                box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
            }

            50% {
                box-shadow: 0 0 0 8px rgba(245, 158, 11, 0.1);
            }
        }

        .tl-dot::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 7px;
            width: 2px;
            height: calc(100% + 24px);
            background: linear-gradient(to bottom, #e5e7eb, transparent);
        }

        .tl-row:last-child .tl-dot::after {
            display: none;
        }

        .tl-card {
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }

        .dark .tl-card {
            background: rgba(31, 41, 55, 0.8);
            border-color: rgba(75, 85, 99, 0.5);
        }

        .tl-card:hover {
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        #suggestBox {
            animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .suggest-item {
            transition: all 0.15s ease;
        }

        .suggest-item:hover,
        .suggest-item.suggest-active {
            background: #eff6ff !important;
            transform: translateX(2px);
        }

        .dark .suggest-item:hover,
        .dark .suggest-item.suggest-active {
            background: rgba(37, 99, 235, 0.24) !important;
            color: #ffffff !important;
            transform: translateX(2px);
        }

        .dark .suggest-item:hover .suggest-title,
        .dark .suggest-item.suggest-active .suggest-title {
            color: #ffffff !important;
        }

        .dark .suggest-item:hover .suggest-desc,
        .dark .suggest-item.suggest-active .suggest-desc,
        .dark .suggest-item:hover .suggest-date,
        .dark .suggest-item.suggest-active .suggest-date {
            color: #dbeafe !important;
        }

        .dark #suggestBox {
            background: #111827 !important;
            border-color: #374151 !important;
        }

        .dark #suggestList {
            background: #111827 !important;
        }

        .source-badge-pr {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
        }

        .source-badge-ppbj {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
        }

        .progress-ring-circle {
            transition: stroke-dashoffset 0.5s ease;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }

        .info-card {
            background: linear-gradient(135deg, #f9fafb, #f3f4f6);
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 0.75rem;
            transition: all 0.2s ease;
        }

        .info-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .dark .info-card {
            background: linear-gradient(135deg, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5));
            border-color: rgba(75, 85, 99, 0.5);
        }

        .tracking-story-shell {
            border: 1px solid rgba(147, 197, 253, 0.55);
            background:
                radial-gradient(circle at top left, rgba(59, 130, 246, 0.14), transparent 30%),
                linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(239, 246, 255, 0.82));
            border-radius: 1.25rem;
            padding: 1rem;
            box-shadow: 0 16px 38px rgba(37, 99, 235, 0.08);
        }

        .dark .tracking-story-shell {
            border-color: rgba(96, 165, 250, 0.34);
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.22), transparent 32%),
                linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(17, 24, 39, 0.9));
            box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
        }

        .tracking-story-strip {
            display: flex;
            gap: 0.85rem;
            overflow-x: auto;
            padding: 0.25rem 0.1rem 0.35rem;
            scroll-snap-type: x proximity;
        }

        .tracking-story-strip::-webkit-scrollbar {
            height: 7px;
        }

        .tracking-story-strip::-webkit-scrollbar-thumb {
            background: rgba(96, 165, 250, 0.45);
            border-radius: 999px;
        }

        .tracking-story-card {
            min-width: 168px;
            scroll-snap-align: start;
            border: 1px solid rgba(226, 232, 240, 0.95);
            background: rgba(255, 255, 255, 0.88);
            border-radius: 1rem;
            padding: 0.85rem;
            cursor: pointer;
            transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .tracking-story-card:hover {
            transform: translateY(-3px);
            border-color: rgba(59, 130, 246, 0.55);
            box-shadow: 0 14px 28px rgba(37, 99, 235, 0.13);
        }

        .dark .tracking-story-card {
            border-color: rgba(71, 85, 105, 0.85);
            background: rgba(30, 41, 59, 0.86);
        }

        .tracking-story-ring {
            width: 46px;
            height: 46px;
            border-radius: 999px;
            padding: 3px;
            background: linear-gradient(135deg, #2563eb, #8b5cf6, #ec4899);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 24px rgba(79, 70, 229, 0.25);
        }

        .tracking-story-ring.is-pending {
            background: linear-gradient(135deg, #f59e0b, #fb923c, #ef4444);
        }

        .tracking-story-ring.is-rejected {
            background: linear-gradient(135deg, #ef4444, #be123c, #7f1d1d);
        }

        .tracking-story-inner {
            width: 100%;
            height: 100%;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            color: #1d4ed8;
            font-size: 0.95rem;
            font-weight: 900;
        }

        .dark .tracking-story-inner {
            background: #0f172a;
            color: #bfdbfe;
        }

        .tracking-story-progress {
            height: 5px;
            overflow: hidden;
            border-radius: 999px;
            background: rgba(148, 163, 184, 0.22);
        }

        .tracking-story-progress span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, #2563eb, #22c55e);
        }

        @keyframes countUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .stat-number {
            animation: countUp 0.5s ease-out;
        }

        .tab-btn {
            transition: all 0.2s ease;
            position: relative;
        }

        .tab-btn::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: transparent;
            border-radius: 3px 3px 0 0;
            transition: all 0.2s ease;
        }

        .tab-btn.active::after {
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }

        .tab-btn.active {
            color: #1e40af;
            font-weight: 600;
        }

        .dark .tab-btn.active {
            color: #60a5fa;
        }

        /* Step indicator */
        .step-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            font-size: 10px;
            font-weight: 700;
        }

        .step-badge.completed {
            background: #10b981;
            color: white;
        }

        .step-badge.current {
            background: #f59e0b;
            color: white;
        }

        .step-badge.pending {
            background: #e5e7eb;
            color: #6b7280;
        }

        .dark .step-badge.pending {
            background: #374151;
            color: #9ca3af;
        }
    </style>
@endpush

@section('content')
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
        {{-- Header --}}
        <div class="mb-6">
            <h1
                class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:text-white bg-clip-text text-transparent">
                📍 Tracking PR & PPBJ
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Lacak status PR dan PPBJ secara real-time dengan timeline lengkap
            </p>
            <div class="flex flex-wrap gap-3 mt-3">
                <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                    Cari Nomor PR
                </span>
                <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                    Cari Nomor PPBJ
                </span>
            </div>
        </div>

        {{-- Search Form --}}
        {{-- Search Form - STICKY --}}
        <form method="GET"
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-6 flex flex-col sm:flex-row gap-4 sticky top-0 z-40"
            autocomplete="off" id="searchForm">

            <div class="w-full relative flex-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Nomor PR / PPBJ
                </label>
                <div class="flex gap-2">
                    <input type="text" id="qInput" name="q" value="{{ $keyword }}"
                        placeholder="Masukkan nomor PR atau PPBJ..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                                              bg-white dark:bg-gray-700 dark:text-white
                                                              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                                              transition-all shadow-sm">

                    {{-- Tombol Clear --}}
                    @if($keyword)
                        <button type="button" onclick="clearSearch()"
                            class="flex-shrink-0 px-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                                                                       bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400
                                                                                       hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 
                                                                                       hover:border-red-300 dark:hover:border-red-800 transition-all"
                            title="Hapus pencarian">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    @endif
                </div>

                <div id="suggestBox"
                    class="hidden absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                    style="top: 100%;">
                    <div id="suggestList" class="max-h-80 overflow-y-auto"></div>
                    <div id="suggestHint"
                        class="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex items-center gap-2">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Ketik minimal 2 karakter untuk mencari PR atau PPBJ...
                    </div>
                </div>
            </div>

            <div class="flex items-end">
                <button type="submit"
                    class="sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold stroke-white dark:text-white
                                                           bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                                                           transition-all shadow-md shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Cari
                </button>
            </div>
        </form>

        {{-- ============================================ --}}
        {{-- NOT FOUND / LIKE RESULTS STATE --}}
        {{-- ============================================ --}}
        @if($keyword && !$row && !$ppbj)

            {{-- Jika ada like results (>1), tampilkan pilihan --}}
            @if($likeResults && count($likeResults) > 1)
                <div class="rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-6">
                    <div class="flex flex-col items-center gap-4 mb-6">
                        <div class="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="text-center">
                            <p class="text-lg font-semibold text-yellow-900 dark:text-yellow-200">Ditemukan
                                {{ count($likeResults) }} Hasil
                            </p>
                            <p class="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                Nomor "<span class="font-bold">{{ $keyword }}</span>" cocok dengan beberapa data. Silakan pilih
                                salah satu:
                            </p>
                        </div>
                    </div>

                    <div class="space-y-2">
                        @foreach($likeResults as $idx => $item)
                            <a href="{{ route('tracking.index', ['q' => $item['nomor']]) }}"
                                class="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group">
                                <div class="flex items-center gap-3 flex-1 min-w-0">
                                    <span
                                        class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase {{ $item['type'] === 'pr' ? 'source-badge-pr' : 'source-badge-ppbj' }}">
                                        {{ $item['type_label'] }}
                                    </span>
                                    <span
                                        class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {{ $item['nomor'] }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-3 flex-shrink-0">
                                    <span class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                                        {{ Str::limit($item['tujuan'], 40) }}
                                    </span>
                                    <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>

                {{-- Jika tidak ada hasil sama sekali --}}
            @else
                <div class="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
                    <div class="flex flex-col items-center gap-3">
                        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-lg font-semibold text-red-900 dark:text-red-200">Data Tidak Ditemukan</p>
                            <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                                Nomor <span class="font-bold">{{ $keyword }}</span> tidak ditemukan di database PR maupun PPBJ.
                            </p>
                            <p class="text-xs text-red-600 dark:text-red-400 mt-2">
                                💡 Tips: Ketik minimal 2 karakter dan pilih dari dropdown yang muncul.
                            </p>
                        </div>
                    </div>
                </div>
            @endif
        @endif

        {{-- ============================================ --}}
        {{-- PPBJ TRACKING RESULT --}}
        {{-- ============================================ --}}
        @if($ppbj && $sourceType === 'ppbj')
            @php
                // ✅ SAFE DATE HELPER - cegah error format() on string
                $fmtDate = function ($date, $format = 'd M Y') {
                    if (!$date)
                        return '-';
                    try {
                        if ($date instanceof \Carbon\Carbon)
                            return $date->format($format);
                        return \Carbon\Carbon::parse($date)->format($format);
                    } catch (\Exception $e) {
                        return '-';
                    }
                };
                // Build tahapan for timeline
                $tahapan = [];

                $tahapan[] = [
                    'step' => 1,
                    'name' => 'SPPH / RFQ',
                    'field' => 'spph_rfq_1',
                    'value' => $ppbj->spph_rfq_1,
                    'date' => $ppbj->tgl_spph,
                    'icon' => '📨',
                    'completed' => !empty($ppbj->spph_rfq_1),
                ];

                $tahapan[] = [
                    'step' => 2,
                    'name' => 'SPH',
                    'field' => 'sph',
                    'value' => $ppbj->sph,
                    'date' => $ppbj->tgl_sph,
                    'icon' => '📋',
                    'completed' => !empty($ppbj->sph),
                ];

                $tahapan[] = [
                    'step' => 3,
                    'name' => 'Awarding SP',
                    'field' => 'awarding_sp',
                    'value' => $ppbj->awarding_sp,
                    'date' => $ppbj->tgl_awarding_sp,
                    'icon' => '✍️',
                    'completed' => !empty($ppbj->awarding_sp),
                ];

                $tahapan[] = [
                    'step' => 4,
                    'name' => 'SPK',
                    'field' => 'tgl_spk',
                    'value' => $ppbj->tgl_spk,
                    'date' => $ppbj->tgl_spk,
                    'icon' => '📄',
                    'completed' => !empty($ppbj->tgl_spk),
                ];

                $tahapan[] = [
                    'step' => 5,
                    'name' => 'BPG (Selesai)',
                    'field' => 'bpg_no',
                    'value' => $ppbj->bpg_no,
                    'date' => $ppbj->tgl_bpg,
                    'icon' => '✅',
                    'completed' => !empty($ppbj->bpg_no),
                ];

                // Find current step
                $currentStep = 0;
                foreach ($tahapan as $t) {
                    if ($t['completed']) {
                        $currentStep = $t['step'];
                    } else {
                        break;
                    }
                }
                $nextStep = $currentStep < 5 ? $currentStep + 1 : 0;

                // Build timeline events
                $ppbjEvents = [];

                // 1. PPBJ Dibuat
                $ppbjEvents[] = [
                    'time' => $fmtDate($ppbj->tgl_ppbj) !== '-' ? $fmtDate($ppbj->tgl_ppbj) : $fmtDate($ppbj->created_at, 'd M Y H:i'),
                    'title' => 'PPBJ Dibuat',
                    'desc' => '
                                                                                                                                                                        <div class="space-y-2">
                                                                                                                                                                            <div class="flex items-center gap-2">
                                                                                                                                                                                <span class="text-blue-600 dark:text-blue-400 font-semibold">Dibuat oleh:</span>
                                                                                                                                                                                <span class="font-medium">' . e($ppbj->createdBy?->name ?? 'Bagian Umum') . '</span>
                                                                                                                                                                            </div>
                                                                                                                                                                            ' . ($ppbj->tgl_terima_pr ? '<div class="text-xs text-gray-500 dark:text-gray-400">PR diterima: ' . $fmtDate($ppbj->tgl_terima_pr) . '</div>' : '') . '
                                                                                                                ' . ($ppbj->tgl_diserahkan ? '<div class="text-xs text-gray-500 dark:text-gray-400">Diserahkan ke pengadaan: ' . $fmtDate($ppbj->tgl_diserahkan) . '</div>' : '') . '
                                                                                                                                                                        </div>',
                    'done' => true,
                    'status' => 'info',
                ];

                // 2. Uraian (jika ada)
                if ($ppbj->uraian) {
                    $ppbjEvents[] = [
                        'time' => '-',
                        'title' => 'Uraian Kebutuhan',
                        'desc' => '<div class="text-sm text-gray-700 dark:text-gray-300">' . nl2br(e($ppbj->uraian)) . '</div>',
                        'done' => true,
                        'status' => 'info',
                    ];
                }

                // 3-7. Tahapan
                foreach ($tahapan as $t) {
                    if ($t['completed']) {
                        $extraInfo = '';

                        // Additional info per tahapan
                        if ($t['step'] == 1 && ($ppbj->rfq_2 || $ppbj->rfq_3)) {
                            $extraInfo = '<div class="mt-2 text-xs text-gray-500 dark:text-gray-400">';
                            if ($ppbj->rfq_2)
                                $extraInfo .= 'RFQ 2: ' . e($ppbj->rfq_2) . '<br>';
                            if ($ppbj->rfq_3)
                                $extraInfo .= 'RFQ 3: ' . e($ppbj->rfq_3);
                            $extraInfo .= '</div>';
                        }

                        if ($t['step'] == 4 && $ppbj->nilai_sp_spk) {
                            $extraInfo = '<div class="mt-2 text-sm">
                                                                                                                                                                                <span class="text-gray-500 dark:text-gray-400">Nilai SP/SPK:</span> 
                                                                                                                                                                                <span class="font-semibold text-green-600 dark:text-green-400">Rp ' . number_format($ppbj->nilai_sp_spk, 0, ',', '.') . '</span>
                                                                                                                                                                            </div>';
                            if ($ppbj->promised_date) {
                                $extraInfo .= '<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Promised Date: ' . $fmtDate($ppbj->promised_date) . '</div>';
                            }
                        }

                        if ($t['step'] == 5 && $ppbj->nilai_bpg) {
                            $extraInfo = '<div class="mt-2 text-sm">
                                                                                                                                                                                <span class="text-gray-500 dark:text-gray-400">Nilai BPG:</span> 
                                                                                                                                                                                <span class="font-semibold">Rp ' . number_format($ppbj->nilai_bpg, 0, ',', '.') . '</span>
                                                                                                                                                                            </div>';
                        }

                        $ppbjEvents[] = [
                            'time' => $fmtDate($t['date']),
                            'title' => $t['icon'] . ' Tahap ' . $t['step'] . ': ' . $t['name'],
                            'desc' => '
                                                                                                                                                                                <div class="space-y-1">
                                                                                                                                                                                    <div class="flex items-center gap-2">
                                                                                                                                                                                        <span class="step-badge completed">✓</span>
                                                                                                                                                                                        <span class="font-medium text-green-700 dark:text-green-400">Selesai</span>
                                                                                                                                                                                    </div>
                                                                                                                                                                                    <div class="text-sm text-gray-600 dark:text-gray-400">
                                                                                                                                                                                        ' . e($t['value']) . '
                                                                                                                                                                                    </div>
                                                                                                                                                                                    ' . $extraInfo . '
                                                                                                                                                                                </div>',
                            'done' => true,
                            'status' => 'done',
                        ];
                    }
                }

                // Next step indicator
                if ($nextStep > 0 && $ppbj->status !== 'CANCELLED') {
                    $nextTahap = $tahapan[$nextStep - 1];
                    $ppbjEvents[] = [
                        'time' => '-',
                        'title' => $nextTahap['icon'] . ' Tahap ' . $nextTahap['step'] . ': ' . $nextTahap['name'],
                        'desc' => '
                                                                                                                                                                            <div class="flex items-center gap-2">
                                                                                                                                                                                <span class="step-badge current">
                                                                                                                                                                                    <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                                                                                                                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                                                                                                                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                                                                                                                    </svg>
                                                                                                                                                                                </span>
                                                                                                                                                                                <span class="font-medium text-yellow-700 dark:text-yellow-400">Menunggu kelengkapan dokumen</span>
                                                                                                                                                                            </div>',
                        'done' => false,
                        'status' => 'pending',
                    ];
                }

                // Invoice info (jika ada)
                if ($ppbj->no_invoice) {
                    $ppbjEvents[] = [
                        'time' => $fmtDate($ppbj->tgl_invoice),
                        'title' => '🧾 Invoice',
                        'desc' => '
                                                                                                                                                                            <div class="space-y-1">
                                                                                                                                                                                <div class="font-medium">' . e($ppbj->no_invoice) . '</div>
                                                                                                                                                                                ' . ($ppbj->tgl_invoice ? '<div class="text-xs text-gray-500 dark:text-gray-400">Tanggal: ' . $fmtDate($ppbj->tgl_invoice) . '</div>' : '') . '
                                                                                                                                                                            </div>',
                        'done' => true,
                        'status' => 'done',
                    ];
                }

                // Cancel reason (jika ada)
                if ($ppbj->cancel_reason) {
                    $ppbjEvents[] = [
                        'time' => $fmtDate($ppbj->updated_at, 'd M Y H:i'),
                        'title' => '🚫 PPBJ Dibatalkan',
                        'desc' => '<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"><div class="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Alasan:</div><div class="text-sm text-red-900 dark:text-red-100">' . e($ppbj->cancel_reason) . '</div></div>',
                        'done' => true,
                        'status' => 'rejected',
                    ];
                }
            @endphp

            <div
                class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                {{-- Header --}}
                <div class="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white/20 backdrop-blur">
                                    PPBJ
                                </span>
                                @if($ppbj->linked_pr)
                                    <span
                                        class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/30 backdrop-blur">
                                        🔗 Terkait PR
                                    </span>
                                @endif
                                @if($ppbj->status === 'CANCELLED')
                                    <span
                                        class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/40 backdrop-blur">
                                        CANCELLED
                                    </span>
                                @elseif($ppbj->status_sla === 'LENGKAP')
                                    <span
                                        class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/40 backdrop-blur">
                                        LENGKAP
                                    </span>
                                @endif
                            </div>
                            <div class="text-2xl font-bold text-gray dark:text-white">{{ $ppbj->ppbj_no }}</div>
                            @if($ppbj->uraian)
                                <div class="text-sm mt-1 line-clamp-2 text-gray-800 dark:text-purple-200">
                                    {{ Str::limit($ppbj->uraian, 100) }}</div>
                            @endif
                        </div>

                        <div class="text-right">
                            <div class="text-xs text-purple-200 mb-2">Progress</div>
                            <div class="relative w-20 h-20">
                                <svg class="w-20 h-20" viewBox="0 0 36 36">
                                    <path class="text-white/20"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none" stroke="currentColor" stroke-width="2.5" />
                                    <path class="progress-ring-circle text-white" stroke-dasharray="{{ $ppbj->progres }}, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-lg font-bold">{{ $ppbj->progres }}%</span>
                                    <span class="text-[9px] text-purple-200">{{ $currentStep }}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Quick Steps --}}
                    <div class="mt-4 pt-4 border-t border-white/20">
                        <div class="flex items-center justify-between gap-1">
                            @foreach($tahapan as $t)
                                <div class="flex-1 flex flex-col items-center gap-1.5">
                                    <div class="step-badge {{ $t['completed'] ? 'completed' : ($t['step'] === $nextStep ? 'current' : 'pending') }}"
                                        style="width:26px;height:26px;font-size:11px;">
                                        @if($t['completed']) ✓ @else {{ $t['step'] }} @endif
                                    </div>
                                    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
                                        <span style="font-size:14px;line-height:1;">{{ $t['icon'] }}</span>
                                        <span
                                            style="display:block;font-size:9px;font-weight:700;color:#312e81;background:rgba(255,255,255,0.92);padding:1px 6px;border-radius:4px;white-space:nowrap;letter-spacing:0.02em;">
                                            {{ $t['name'] }}
                                        </span>
                                    </div>
                                </div>
                                @if(!$loop->last)
                                    <div
                                        class="flex-shrink-0 w-4 h-0.5 {{ $t['completed'] && $tahapan[$loop->index + 1]['completed'] ? 'bg-green-400' : 'bg-white/20' }} self-start mt-3">
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                </div>

                {{-- Stats Cards --}}
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div class="info-card">
                            <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Total Nilai</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white stat-number">
                                Rp {{ number_format($ppbj->total_sebelum_ppn ?? 0, 0, ',', '.') }}
                            </div>
                        </div>

                        <div class="info-card">
                            <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Status SLA</div>
                            @php
                                $slaColors = [
                                    'ON TRACK' => 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                                    'WARNING' => 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                                    'OVERDUE' => 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                                    'LENGKAP' => 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                                    'CANCELLED' => 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
                                ];
                            @endphp
                            <span
                                class="inline-flex px-2 py-0.5 rounded-full text-xs font-bold {{ $slaColors[$ppbj->status_sla] ?? 'bg-gray-100 text-gray-600' }}">
                                {{ $ppbj->status_sla }}
                            </span>
                        </div>

                        <div class="info-card">
                            <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Sisa Target SLA
                            </div>
                            @php
                                $sisaColor = ($ppbj->sisa_target_sla ?? 0) > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                                $sisaText = ($ppbj->sisa_target_sla ?? 0) > 0
                                    ? $ppbj->sisa_target_sla . ' hari'
                                    : 'Terlambat ' . abs($ppbj->sisa_target_sla ?? 0) . ' hari';
                            @endphp
                            <div class="text-lg font-bold {{ $sisaColor }}">{{ $sisaText }}</div>
                            <div class="text-[10px] text-gray-400">Target: {{ $ppbj->target_sla_hari ?? 0 }} hari</div>
                        </div>

                        <div class="info-card">
                            <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Realisasi</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ $ppbj->persentase_realisasi ?? 0 }}%
                            </div>
                            <div class="text-[10px] text-gray-400">{{ $ppbj->realisasi_sla ?? 0 }} hari</div>
                        </div>
                    </div>
                </div>

                {{-- Story Progress ala status WhatsApp --}}
                @if(!empty($ppbjEvents))
                    <div class="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="tracking-story-shell">
                            <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <div class="text-[11px] font-black uppercase tracking-[0.18em] text-purple-600 dark:text-purple-300">Story Progress</div>
                                    <div class="text-lg font-black text-gray-900 dark:text-white">Status berjalan dari awal sampai selesai</div>
                                </div>
                                <div class="text-xs font-semibold text-gray-500 dark:text-gray-300">Ringkas, cepat, dan mudah dibaca user</div>
                            </div>
                            <div class="tracking-story-strip mt-4">
                                @foreach($ppbjEvents as $storyIndex => $story)
                                    @php
                                        $plainDesc = trim(preg_replace('/\s+/', ' ', strip_tags((string) ($story['desc'] ?? ''))));
                                        $storyRingClass = match ($story['status'] ?? 'done') {
                                            'pending' => 'is-pending',
                                            'rejected' => 'is-rejected',
                                            default => '',
                                        };
                                        $storyWidth = count($ppbjEvents) > 0 ? min(100, max(18, (int) round((($storyIndex + 1) / count($ppbjEvents)) * 100))) : 0;
                                    @endphp
                                    <button type="button" class="tracking-story-card text-left"
                                        onclick="showTrackingStory(@js($story['title'] ?? 'Story Progress'), @js($story['time'] ?? '-'), @js($plainDesc ?: 'Belum ada detail tambahan.'))">
                                        <div class="flex items-start gap-3">
                                            <span class="tracking-story-ring {{ $storyRingClass }}">
                                                <span class="tracking-story-inner">{{ $storyIndex + 1 }}</span>
                                            </span>
                                            <span class="min-w-0 flex-1">
                                                <span class="block text-sm font-black text-gray-900 dark:text-white line-clamp-2">{{ $story['title'] ?? '-' }}</span>
                                                <span class="mt-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-300">{{ $story['time'] ?? '-' }}</span>
                                            </span>
                                        </div>
                                        <div class="tracking-story-progress mt-3"><span style="width: {{ $storyWidth }}%"></span></div>
                                    </button>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endif

                @if(!empty($ppbj->goods_arrived_at) || !empty($ppbj->promised_date))
                    <div class="px-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-800/60 dark:bg-indigo-950/25">
                            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div class="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Status Barang / Pekerjaan</div>
                                    <div class="mt-1 text-base font-black text-gray-900 dark:text-white">
                                        @if(!empty($ppbj->goods_confirmed_at))
                                            Sudah dikonfirmasi diterima Operasional
                                        @elseif(!empty($ppbj->goods_arrived_at))
                                            Umum sudah menandai barang/pekerjaan datang
                                        @elseif(!empty($ppbj->promised_date))
                                            Menunggu target kedatangan/penyelesaian
                                        @else
                                            Status kedatangan belum tersedia
                                        @endif
                                    </div>
                                    <div class="mt-2 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        @if(!empty($ppbj->promised_date))
                                            <span class="rounded-full bg-white px-3 py-1 font-semibold ring-1 ring-indigo-100 dark:bg-gray-900/60 dark:ring-indigo-800/50">
                                                Target: {{ $ppbj->promised_date->translatedFormat('d F Y') }}
                                            </span>
                                        @endif
                                        @if(!empty($ppbj->goods_arrived_at))
                                            <span class="rounded-full bg-white px-3 py-1 font-semibold ring-1 ring-emerald-100 dark:bg-gray-900/60 dark:ring-emerald-800/50">
                                                Datang: {{ $ppbj->goods_arrived_at->format('d M Y H:i') }}
                                                @if(!empty($ppbj->goods_arrived_by_name))
                                                    oleh {{ $ppbj->goods_arrived_by_name }}
                                                @endif
                                            </span>
                                        @endif
                                        @if(!empty($ppbj->goods_confirmed_at))
                                            <span class="rounded-full bg-white px-3 py-1 font-semibold ring-1 ring-blue-100 dark:bg-gray-900/60 dark:ring-blue-800/50">
                                                Konfirmasi: {{ $ppbj->goods_confirmed_at->format('d M Y H:i') }}
                                                @if(!empty($ppbj->goods_confirmed_by_name))
                                                    oleh {{ $ppbj->goods_confirmed_by_name }}
                                                @endif
                                            </span>
                                        @endif
                                    </div>
                                    @if(!empty($ppbj->goods_arrived_note) || !empty($ppbj->goods_confirmed_note))
                                        <div class="mt-3 rounded-xl border border-indigo-100 bg-white/80 p-3 text-xs leading-relaxed text-gray-700 dark:border-indigo-800/50 dark:bg-gray-900/50 dark:text-gray-200">
                                            @if(!empty($ppbj->goods_arrived_note))
                                                <div><span class="font-bold">Catatan Umum:</span> {{ $ppbj->goods_arrived_note }}</div>
                                            @endif
                                            @if(!empty($ppbj->goods_confirmed_note))
                                                <div class="mt-1"><span class="font-bold">Catatan Operasional:</span> {{ $ppbj->goods_confirmed_note }}</div>
                                            @endif
                                        </div>
                                    @endif
                                </div>

                                @if(!empty($ppbj->goods_arrived_at) && empty($ppbj->goods_confirmed_at))
                                    <button type="button"
                                        onclick="confirmGoodsArrival({{ (int) $ppbj->id }}, @js($ppbj->ppbj_no))"
                                        class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                                        <span>✓</span>
                                        Konfirmasi Diterima
                                    </button>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif

                {{-- Tabs --}}
                <div class="border-b border-gray-200 dark:border-gray-700">
                    <div class="flex">
                        <button type="button" onclick="switchTab('timeline')" id="tab-timeline"
                            class="tab-btn active px-6 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            📅 Timeline ({{ count($ppbjEvents) }})
                        </button>
                        <button type="button" onclick="switchTab('detail')" id="tab-detail"
                            class="tab-btn px-6 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            📋 Detail Lengkap
                        </button>
                    </div>
                </div>

                {{-- Timeline Content --}}
                <div id="content-timeline" class="p-6">
                    <div class="timeline">
                        @foreach($ppbjEvents as $e)
                            <div class="tl-row">
                                <div class="tl-time">{{ $e['time'] }}</div>
                                <div class="tl-dot {{ $e['status'] }}"></div>
                                <div class="tl-card">
                                    <div class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        {{ $e['title'] }}
                                    </div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {!! $e['desc'] !!}
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- Detail Content --}}
                <div id="content-detail" class="p-6 hidden">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {{-- Info Utama --}}
                        <div class="space-y-4">
                            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span
                                    class="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs">📋</span>
                                Informasi Utama
                            </h3>

                            <div class="space-y-3">
                                @if($ppbj->buyer)
                                    <div
                                        class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                        <span class="text-sm text-gray-500 dark:text-gray-400">Buyer</span>
                                        <span
                                            class="text-sm font-medium text-gray-900 dark:text-white text-right">{{ $ppbj->buyer }}</span>
                                    </div>
                                @endif

                                @if($ppbj->metode_pengadaan)
                                    <div
                                        class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                        <span class="text-sm text-gray-500 dark:text-gray-400">Metode Pengadaan</span>
                                        <span
                                            class="text-sm font-medium text-gray-900 dark:text-white text-right">{{ $ppbj->metode_pengadaan }}</span>
                                    </div>
                                @endif

                                @if($ppbj->penyedia_eksternal)
                                    <div
                                        class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                        <span class="text-sm text-gray-500 dark:text-gray-400">Penyedia Eksternal</span>
                                        <span
                                            class="text-sm font-medium text-gray-900 dark:text-white text-right">{{ $ppbj->penyedia_eksternal }}</span>
                                    </div>
                                @endif

                                @if($ppbj->portofolio)
                                    <div
                                        class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                        <span class="text-sm text-gray-500 dark:text-gray-400">Portofolio</span>
                                        <span
                                            class="text-sm font-medium text-gray-900 dark:text-white text-right">{{ $ppbj->portofolio }}</span>
                                    </div>
                                @endif

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Total Sebelum PPn</span>
                                    <span class="text-sm font-bold text-gray-900 dark:text-white">Rp
                                        {{ number_format($ppbj->total_sebelum_ppn ?? 0, 0, ',', '.') }}</span>
                                </div>
                            </div>
                        </div>

                        {{-- Dokumen --}}
                        <div class="space-y-4">
                            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span
                                    class="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs">📄</span>
                                Dokumen & Nilai
                            </h3>

                            <div class="space-y-3">
                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Nilai SP/SPK</span>
                                    <span
                                        class="text-sm font-bold {{ $ppbj->nilai_sp_spk ? 'text-green-600 dark:text-green-400' : 'text-gray-400' }}">
                                        {{ $ppbj->nilai_sp_spk ? 'Rp ' . number_format($ppbj->nilai_sp_spk, 0, ',', '.') : '-' }}
                                    </span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Nilai BPG</span>
                                    <span
                                        class="text-sm font-bold {{ $ppbj->nilai_bpg ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400' }}">
                                        {{ $ppbj->nilai_bpg ? 'Rp ' . number_format($ppbj->nilai_bpg, 0, ',', '.') : '-' }}
                                    </span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">No. Invoice</span>
                                    <span
                                        class="text-sm font-medium {{ $ppbj->no_invoice ? 'text-gray-900 dark:text-white' : 'text-gray-400' }}">{{ $ppbj->no_invoice ?? '-' }}</span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">DO No</span>
                                    <span
                                        class="text-sm font-medium {{ $ppbj->do_no ? 'text-gray-900 dark:text-white' : 'text-gray-400' }}">{{ $ppbj->do_no ?? '-' }}</span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">BPB No</span>
                                    <span
                                        class="text-sm font-medium {{ $ppbj->bpb_no ? 'text-gray-900 dark:text-white' : 'text-gray-400' }}">{{ $ppbj->bpb_no ?? '-' }}</span>
                                </div>

                                <div class="flex justify-between items-start py-2">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Receiving Transaction</span>
                                    <span
                                        class="text-sm font-medium {{ $ppbj->receiving_transaction ? 'text-gray-900 dark:text-white' : 'text-gray-400' }}">{{ $ppbj->receiving_transaction ?? '-' }}</span>
                                </div>
                            </div>
                        </div>

                        {{-- Tanggal --}}
                        <div class="space-y-4">
                            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span
                                    class="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs">📅</span>
                                Tanggal Penting
                            </h3>

                            <div class="space-y-3">
                                @php
                                    $dates = [
                                        ['Tgl PPBJ', $ppbj->tgl_ppbj],
                                        ['Tgl Terima PR', $ppbj->tgl_terima_pr],
                                        ['Tgl Diserahkan', $ppbj->tgl_diserahkan],
                                        ['Tgl SPPH', $ppbj->tgl_spph],
                                        ['Tgl SPH', $ppbj->tgl_sph],
                                        ['Tgl Awarding SP', $ppbj->tgl_awarding_sp],
                                        ['Tgl SPK', $ppbj->tgl_spk],
                                        ['Promised Date', $ppbj->promised_date],
                                        ['Tgl BPG', $ppbj->tgl_bpg],
                                        ['Tgl BPB', $ppbj->tgl_bpb],
                                        ['Tgl Invoice', $ppbj->tgl_invoice],
                                    ];
                                @endphp
                                @foreach($dates as $d)
                                    <div
                                        class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ $d[0] }}</span>
                                        <span
                                            class="text-sm font-medium {{ $d[1] ? 'text-gray-900 dark:text-white' : 'text-gray-400' }}">{{ $d[1]?->format('d M Y') ?? '-' }}</span>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        {{-- SLA & Progress --}}
                        <div class="space-y-4">
                            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span
                                    class="w-6 h-6 rounded bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-xs">⏱️</span>
                                SLA & Progress
                            </h3>

                            <div class="space-y-3">
                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Target SLA</span>
                                    <span
                                        class="text-sm font-bold text-gray-900 dark:text-white">{{ $ppbj->target_sla_hari ?? 0 }}
                                        hari</span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Realisasi SLA</span>
                                    <span
                                        class="text-sm font-bold text-gray-900 dark:text-white">{{ $ppbj->realisasi_sla ?? 0 }}
                                        hari</span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Sisa Target</span>
                                    <span class="text-sm font-bold {{ $sisaColor }}">{{ $sisaText }}</span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Time Left</span>
                                    <span
                                        class="text-sm font-medium {{ ($ppbj->time_left ?? 0) >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400' }}">
                                        {{ ($ppbj->time_left ?? 0) >= 0 ? $ppbj->time_left . ' hari' : 'Terlambat ' . abs($ppbj->time_left) . ' hari' }}
                                    </span>
                                </div>

                                <div
                                    class="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700/50">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">QT Left</span>
                                    <span
                                        class="text-sm font-medium {{ ($ppbj->qt_left ?? 0) >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400' }}">
                                        {{ ($ppbj->qt_left ?? 0) >= 0 ? $ppbj->qt_left . ' hari' : 'Lewat ' . abs($ppbj->qt_left) . ' hari' }}
                                    </span>
                                </div>

                                <div class="flex justify-between items-start py-2">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">% Realisasi</span>
                                    <span
                                        class="text-sm font-bold text-gray-900 dark:text-white">{{ $ppbj->persentase_realisasi ?? 0 }}%</span>
                                </div>
                            </div>

                            @if($ppbj->keterangan)
                                <div
                                    class="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Keterangan</div>
                                    <div class="text-sm text-gray-700 dark:text-gray-300">{{ nl2br(e($ppbj->keterangan)) }}</div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endif

        {{-- ============================================ --}}
        {{-- PR TRACKING RESULT --}}
        {{-- ============================================ --}}
        @if($row && $sourceType === 'pr')
            @php
                $events = [];

                if ($row->nomor_pr && $row->tanggal_pr) {
                    $desc = 'PR telah dibuat oleh: <strong>' . e($row->createdBy?->name ?? 'Tidak Diketahui') . '</strong>';
                    if ($row->jumlah_pr) {
                        $desc .= '<br><strong>Jumlah PR:</strong> Rp ' . number_format($row->jumlah_pr, 0, ',', '.');
                    }
                    $events[] = [
                        'time' => optional($row->tanggal_pr)->format('d M Y H:i') ?? '-',
                        'title' => 'PR Dibuat',
                        'desc' => $desc,
                        'done' => true,
                        'status' => 'done',
                    ];
                }

                if ($row->tgl_ttd_kabid_pr) {
                    $events[] = [
                        'time' => $row->tgl_ttd_kabid_pr->format('d M Y H:i'),
                        'title' => 'PR Disetujui Kabid',
                        'desc' => sprintf('<strong>Penandatangan:</strong> %s <span class="text-xs text-gray-500 dark:text-gray-400">(%s)</span>', e($row->signed_by_kabid_name ?? 'Kepala Bidang'), is_null($row->sign_token_kabid) ? 'via QR' : 'Manual'),
                        'done' => true,
                        'status' => 'done',
                    ];
                }

                if ($row->tgl_ttd_kacab_pr) {
                    $events[] = [
                        'time' => $row->tgl_ttd_kacab_pr->format('d M Y H:i'),
                        'title' => 'PR Disetujui Kacab',
                        'desc' => sprintf('<strong>Penandatangan:</strong> %s <span class="text-xs text-gray-500 dark:text-gray-400">(%s)</span>', e($row->signed_by_kacab_name ?? 'Kepala Cabang'), is_null($row->sign_token_kacab) ? 'via QR' : 'Manual'),
                        'done' => true,
                        'status' => 'done',
                    ];
                }

                $latest = $row->latestReceiptApproval;

                if ($latest && $latest->status === 'PENDING') {
                    $events[] = [
                        'time' => $latest->requested_at ? \Carbon\Carbon::parse($latest->requested_at)->format('d M Y H:i') : '-',
                        'title' => 'Menunggu Persetujuan Umum',
                        'desc' => sprintf('Request dikirim oleh <strong>%s</strong> dan menunggu approval Bagian Umum.', e($latest->requested_name ?? 'Unknown')),
                        'done' => false,
                        'status' => 'pending',
                    ];
                }

                if ($latest && $latest->status === 'REJECTED') {
                    $rejectedAt = $latest->rejected_at ?? $latest->approved_at ?? $latest->updated_at;
                    $events[] = [
                        'time' => optional($rejectedAt)->format('d M Y H:i') ?? '-',
                        'title' => 'Ditolak oleh Bagian Umum',
                        'desc' => '<div class="space-y-2"><div class="flex items-center gap-2"><span class="text-red-600 dark:text-red-400 font-semibold">Ditolak oleh:</span><span class="font-medium">' . e($latest->rejectedBy?->name ?? 'Unknown') . '</span></div><div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"><div class="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Alasan:</div><div class="text-sm text-red-900 dark:text-red-100">' . e($latest->rejection_reason ?? $latest->rejected_reason ?? 'Tidak ada alasan') . '</div></div></div>',
                        'done' => true,
                        'status' => 'rejected',
                    ];
                }

                if ($row->received_at) {
                    $approvedBy = $latest?->approvedBy?->name ?? $row->receivedByUmum?->name ?? 'Bagian Umum';
                    $events[] = [
                        'time' => $row->received_at->format('d M Y H:i'),
                        'title' => 'PR Diterima oleh Bagian Umum',
                        'desc' => '<div class="flex items-center gap-2"><span class="text-green-600 dark:text-green-400 font-semibold">Diterima oleh:</span><span class="font-medium">' . e($approvedBy) . '</span></div>',
                        'done' => true,
                        'status' => 'done',
                    ];

                    $ppbjData = $row->linked_ppbj ?? null;
                    if ($ppbjData) {
                        $progressStatus = $ppbjData->progres == 100 ? 'done' : 'pending';
                        $ppbjHtml = '<div class="space-y-3 mt-1">';
                        $ppbjHtml .= '<div class="space-y-1"><div class="flex justify-between text-xs"><span class="font-semibold">Progress PPBJ</span><span class="font-bold text-blue-600 dark:text-blue-400">' . $ppbjData->progres . '%</span></div><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"><div class="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full" style="width: ' . $ppbjData->progres . '%"></div></div></div>';
                        $ppbjHtml .= '<div class="grid grid-cols-2 gap-2">';
                        if ($ppbjData->buyer)
                            $ppbjHtml .= '<div class="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-200 dark:border-gray-600"><div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Buyer</div><div class="text-xs font-semibold truncate">' . e($ppbjData->buyer) . '</div></div>';
                        if ($ppbjData->status_sla) {
                            $slaB = match ($ppbjData->status_sla) { 'ON TRACK' => 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 'WARNING' => 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', 'OVERDUE' => 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', 'LENGKAP' => 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 'CANCELLED' => 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', default => 'bg-gray-100 text-gray-700'};
                            $ppbjHtml .= '<div class="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-200 dark:border-gray-600"><div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Status SLA</div><span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ' . $slaB . '">' . e($ppbjData->status_sla) . '</span></div>';
                        }
                        if ($ppbjData->sisa_target_sla !== null) {
                            $sC = ($ppbjData->sisa_target_sla > 0) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                            $sT = ($ppbjData->sisa_target_sla > 0) ? $ppbjData->sisa_target_sla . ' hari tersisa' : 'Terlambat ' . abs($ppbjData->sisa_target_sla) . ' hari';
                            $ppbjHtml .= '<div class="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-200 dark:border-gray-600"><div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Sisa Waktu</div><div class="text-xs font-bold ' . $sC . '">' . $sT . '</div></div>';
                        }
                        if ($ppbjData->metode_pengadaan)
                            $ppbjHtml .= '<div class="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-200 dark:border-gray-600"><div class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Metode</div><div class="text-xs font-medium truncate">' . e($ppbjData->metode_pengadaan) . '</div></div>';
                        $ppbjHtml .= '</div>';
                        if ($ppbjData->cancel_reason)
                            $ppbjHtml .= '<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"><div class="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Alasan Cancel:</div><div class="text-sm text-red-900 dark:text-red-100">' . e($ppbjData->cancel_reason) . '</div></div>';
                        $ppbjHtml .= '</div>';
                        $events[] = [
                            'time' => $ppbjData->updated_at?->format('d M Y H:i') ?? '-',
                            'title' => 'Progress PPBJ',
                            'desc' => $ppbjHtml,
                            'done' => $ppbjData->progres == 100,
                            'status' => $progressStatus,
                        ];
                    }
                }
            @endphp

            <div
                class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                {{-- PR Header --}}
                <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white/20 backdrop-blur">Purchase
                                    Request</span>
                            </div>
                            <div class="text-2xl font-bold flex items-center gap-3">
                                {{ $row->nomor_pr }}
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-white/20">📊
                                    {{ count($events) }}</span>
                            </div>
                            @if($row->tujuan_pengadaan)
                                <div class="text-blue-200 text-sm mt-1">{{ $row->tujuan_pengadaan }}</div>
                            @endif
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-blue-200 mb-2">Status</div>
                            @php
                                $lastEvent = end($events);
                                $sc = match ($lastEvent['status'] ?? 'pending') {
                                    'done' => ['bg' => 'bg-green-500/30', 'icon' => '✅'],
                                    'pending' => ['bg' => 'bg-yellow-500/30', 'icon' => '⏳'],
                                    'rejected' => ['bg' => 'bg-red-500/30', 'icon' => '⛔'],
                                    default => ['bg' => 'bg-white/20', 'icon' => '📝']
                                };
                            @endphp
                            <span
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold {{ $sc['bg'] }} border border-white/20">
                                {{ $sc['icon'] }}
                                {{ $lastEvent['status'] === 'done' ? 'Selesai' : ($lastEvent['status'] === 'rejected' ? 'Ditolak' : 'Proses') }}
                            </span>
                        </div>
                    </div>
                    @if($row->jumlah_pr)
                        <div class="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div>
                                <div class="text-[10px] text-blue-200 uppercase font-bold">Nilai PR</div>
                                <div class="text-lg font-bold">Rp {{ number_format($row->jumlah_pr, 0, ',', '.') }}</div>
                            </div>
                            <div>
                                <div class="text-[10px] text-blue-200 uppercase font-bold">Tanggal</div>
                                <div class="text-sm">{{ $row->tanggal_pr?->format('d M Y') ?? '-' }}</div>
                            </div>
                            <div>
                                <div class="text-[10px] text-blue-200 uppercase font-bold">Dibuat Oleh</div>
                                <div class="text-sm">{{ $row->createdBy?->name ?? '-' }}</div>
                            </div>
                        </div>
                    @endif
                </div>

                {{-- Story Progress ala status WhatsApp --}}
                @if(!empty($events))
                    <div class="px-6 pt-6">
                        <div class="tracking-story-shell">
                            <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <div class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">Story Progress</div>
                                    <div class="text-lg font-black text-gray-900 dark:text-white">Cerita singkat perjalanan PR ini</div>
                                </div>
                                <div class="text-xs font-semibold text-gray-500 dark:text-gray-300">Klik kartu untuk lihat ringkasannya</div>
                            </div>
                            <div class="tracking-story-strip mt-4">
                                @foreach($events as $storyIndex => $story)
                                    @php
                                        $plainDesc = trim(preg_replace('/\s+/', ' ', strip_tags((string) ($story['desc'] ?? ''))));
                                        $storyRingClass = match ($story['status'] ?? 'done') {
                                            'pending' => 'is-pending',
                                            'rejected' => 'is-rejected',
                                            default => '',
                                        };
                                        $storyWidth = count($events) > 0 ? min(100, max(18, (int) round((($storyIndex + 1) / count($events)) * 100))) : 0;
                                    @endphp
                                    <button type="button" class="tracking-story-card text-left"
                                        onclick="showTrackingStory(@js($story['title'] ?? 'Story Progress'), @js($story['time'] ?? '-'), @js($plainDesc ?: 'Belum ada detail tambahan.'))">
                                        <div class="flex items-start gap-3">
                                            <span class="tracking-story-ring {{ $storyRingClass }}">
                                                <span class="tracking-story-inner">{{ $storyIndex + 1 }}</span>
                                            </span>
                                            <span class="min-w-0 flex-1">
                                                <span class="block text-sm font-black text-gray-900 dark:text-white line-clamp-2">{{ $story['title'] ?? '-' }}</span>
                                                <span class="mt-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-300">{{ $story['time'] ?? '-' }}</span>
                                            </span>
                                        </div>
                                        <div class="tracking-story-progress mt-3"><span style="width: {{ $storyWidth }}%"></span></div>
                                    </button>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endif

                {{-- Reminder PR Macet --}}
                @if(!empty($row->stuck_reminders))
                    <div class="px-6 pt-6">
                        <div class="grid md:grid-cols-3 gap-3">
                            @foreach($row->stuck_reminders as $reminder)
                                @php
                                    $reminderClass = match ($reminder['level'] ?? 'info') {
                                        'danger' => 'border-red-200 bg-red-50 text-red-900 dark:border-red-800/70 dark:bg-red-900/20 dark:text-red-100',
                                        'warning' => 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/70 dark:bg-amber-900/20 dark:text-amber-100',
                                        'success' => 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-900/20 dark:text-emerald-100',
                                        default => 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/70 dark:bg-blue-900/20 dark:text-blue-100',
                                    };
                                    $reminderIcon = match ($reminder['level'] ?? 'info') {
                                        'danger' => '🚨',
                                        'warning' => '⏳',
                                        'success' => '✅',
                                        default => '💡',
                                    };
                                @endphp
                                <div class="rounded-xl border p-4 {{ $reminderClass }}">
                                    <div class="flex items-start gap-3">
                                        <div class="text-xl">{{ $reminderIcon }}</div>
                                        <div>
                                            <div class="font-bold text-sm">{{ $reminder['title'] }}</div>
                                            <div class="text-xs mt-1 opacity-80">{{ $reminder['message'] }}</div>
                                            @if(!is_null($reminder['days'] ?? null))
                                                <div class="text-[11px] font-bold mt-2 opacity-70">Sudah {{ $reminder['days'] }} hari</div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

                {{-- Audit Detail --}}
                @if(!empty($row->audit_details))
                    <div class="px-6 pt-6">
                        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/40 p-5">
                            <div class="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <div class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Audit Trail Detail</div>
                                    <div class="text-lg font-bold text-gray-900 dark:text-white">Jejak proses PR tanpa data arsip</div>
                                </div>
                                <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ count($row->audit_details) }} event</span>
                            </div>
                            <div class="grid md:grid-cols-2 gap-3">
                                @foreach($row->audit_details as $audit)
                                    @php
                                        $auditClass = match ($audit['status'] ?? 'done') {
                                            'pending' => 'border-amber-200 dark:border-amber-800/60',
                                            'rejected' => 'border-red-200 dark:border-red-800/60',
                                            default => 'border-emerald-200 dark:border-emerald-800/60',
                                        };
                                    @endphp
                                    <div class="rounded-xl border {{ $auditClass }} bg-white dark:bg-gray-800/70 p-4">
                                        <div class="text-[11px] font-bold text-gray-500 dark:text-gray-400">{{ $audit['time'] }}</div>
                                        <div class="mt-1 font-semibold text-gray-900 dark:text-white">{{ $audit['title'] }}</div>
                                        <div class="mt-1 text-xs text-gray-600 dark:text-gray-300">{{ $audit['desc'] }}</div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endif

                {{-- Timeline --}}
                <div class="p-6">
                    <div class="timeline">
                        @foreach($events as $e)
                            <div class="tl-row">
                                <div class="tl-time">{{ $e['time'] }}</div>
                                <div class="tl-dot {{ $e['status'] }}"></div>
                                <div class="tl-card">
                                    <div class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        {{ $e['title'] }}
                                        @if($e['status'] === 'done')
                                            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7" />
                                            </svg>
                                        @elseif($e['status'] === 'pending')
                                            <svg class="w-4 h-4 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                </path>
                                            </svg>
                                        @elseif($e['status'] === 'rejected')
                                            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        @endif
                                    </div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{!! $e['desc'] !!}</div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        @endif
    </div>
@endsection

@push('scripts')
    <script>
        window.showTrackingStory = function (title, time, description) {
            const safe = (value) => {
                const div = document.createElement('div');
                div.textContent = value || '';
                return div.innerHTML;
            };

            Swal.fire({
                title: safe(title),
                html: `
                    <div class="text-left rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950 dark:border-blue-800 dark:bg-blue-950/45 dark:text-blue-100">
                        <div class="mb-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100 dark:bg-gray-900 dark:text-blue-200 dark:ring-blue-800">
                            ${safe(time)}
                        </div>
                        <div class="leading-relaxed">${safe(description)}</div>
                    </div>
                `,
                confirmButtonText: 'Oke, paham',
                confirmButtonColor: '#2563eb',
                customClass: {
                    popup: 'rounded-3xl',
                    title: 'text-gray-900 dark:text-white',
                },
            });
        };

        window.confirmGoodsArrival = async function (id, ppbjNo) {
            const safeText = (value) => {
                const div = document.createElement('div');
                div.textContent = value || '';
                return div.innerHTML;
            };

            const result = await Swal.fire({
                title: 'Konfirmasi barang diterima?',
                html: `
                    <div class="text-left rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
                        <div class="font-black">PR/PPBJ: ${safeText(ppbjNo)}</div>
                        <div class="mt-1 text-xs leading-relaxed opacity-80">Konfirmasi ini akan masuk ke timeline tracking dan memberi tahu Bagian Umum melalui chat tim.</div>
                    </div>
                `,
                input: 'textarea',
                inputPlaceholder: 'Catatan opsional, contoh: barang diterima lengkap oleh user...',
                showCancelButton: true,
                confirmButtonText: 'Ya, sudah diterima',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#64748b',
                reverseButtons: true,
            });

            if (!result.isConfirmed) return;

            try {
                const response = await fetch(`/ppbj/${id}/goods-confirmed`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    },
                    body: JSON.stringify({ note: result.value || '' }),
                });
                const data = await response.json().catch(() => ({}));

                if (!response.ok || !data.ok) {
                    throw new Error(data.message || 'Konfirmasi gagal disimpan.');
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Sudah dikonfirmasi',
                    text: 'Operasional sudah mengonfirmasi barang/pekerjaan diterima.',
                    timer: 1700,
                    showConfirmButton: false,
                });
                window.location.reload();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal konfirmasi',
                    text: error.message || 'Terjadi kendala saat menyimpan konfirmasi.',
                });
            }
        };

        function clearSearch() {
            const input = document.getElementById('qInput');
            input.value = '';
            input.closest('form').submit();
        }

        (function () {
            const input = document.getElementById('qInput');
            const box = document.getElementById('suggestBox');
            const list = document.getElementById('suggestList');
            const hint = document.getElementById('suggestHint');

            let debounceTimer = null;
            let activeIndex = -1;
            let items = [];

            function openBox() { box.classList.remove('hidden'); }
            function closeBox() { box.classList.add('hidden'); activeIndex = -1; }
            function escapeHtml(str) { const d = document.createElement('div'); d.textContent = str || ''; return d.innerHTML; }

            function getSourceBadge(type) {
                return type === 'ppbj'
                    ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase source-badge-ppbj">PPBJ</span>'
                    : '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase source-badge-pr">PR</span>';
            }

            function render() {
                list.innerHTML = '';
                if (!items.length) {
                    list.innerHTML = '<div class="px-4 py-5 text-center text-gray-500 dark:text-gray-400"><svg class="w-7 h-7 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p class="text-sm">Tidak ada hasil</p></div>';
                    return;
                }
                items.forEach((item, idx) => {
                    const row = document.createElement('button');
                    row.type = 'button';
                    row.className = `suggest-item w-full text-left px-4 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 focus:outline-none ${idx === activeIndex ? 'suggest-active bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-blue-900/20'}`;
                    const ic = item.source_type === 'ppbj' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400';
                    const svg = item.source_type === 'ppbj'
                        ? '<svg class="w-4 h-4 flex-shrink-0 ' + ic + '" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
                        : '<svg class="w-4 h-4 flex-shrink-0 ' + ic + '" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>';
                    row.innerHTML = `<div class="flex items-start justify-between gap-3"><div class="flex-1 min-w-0"><div class="suggest-title font-semibold text-gray-900 dark:text-white flex items-center gap-2">${svg}<span class="truncate">${escapeHtml(item.nomor)}</span>${getSourceBadge(item.source_type)}</div><div class="suggest-desc text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">${escapeHtml(item.tujuan)}</div></div><div class="flex-shrink-0 text-right"><div class="suggest-date text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">${escapeHtml(item.tanggal || '')}</div></div></div>`;
                    row.addEventListener('click', () => selectItem(idx));
                    list.appendChild(row);
                });
            }

            function selectItem(idx) { const item = items[idx]; if (!item) return; input.value = item.nomor; closeBox(); input.closest('form').submit(); }

            async function fetchSuggest(query) {
                try {
                    const res = await fetch("{{ route('tracking.suggest') }}?q=" + encodeURIComponent(query), { headers: { 'Accept': 'application/json' } });
                    if (!res.ok) return [];
                    const data = await res.json();
                    return Array.isArray(data.items) ? data.items : [];
                } catch (e) { return []; }
            }

            input.addEventListener('input', () => {
                const q = input.value.trim();
                if (debounceTimer) clearTimeout(debounceTimer);
                if (q.length < 2) { items = []; hint.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Ketik minimal 2 karakter...'; render(); closeBox(); return; }
                hint.innerHTML = '<svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Mencari...';
                openBox();
                debounceTimer = setTimeout(async () => {
                    items = await fetchSuggest(q);
                    const prC = items.filter(i => i.source_type === 'pr').length;
                    const ppC = items.filter(i => i.source_type === 'ppbj').length;
                    let h = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
                    if (items.length) { h += 'Ditemukan: '; if (prC) h += `<b class="text-blue-600 dark:text-blue-400">${prC} PR</b>`; if (prC && ppC) h += ' & '; if (ppC) h += `<b class="text-purple-600 dark:text-purple-400">${ppC} PPBJ</b>`; } else { h += 'Tidak ada hasil'; }
                    hint.innerHTML = h; activeIndex = -1; render(); openBox();
                }, 300);
            });

            input.addEventListener('keydown', (e) => {
                if (box.classList.contains('hidden')) return;
                if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(items.length - 1, activeIndex + 1); render(); list.children[activeIndex]?.scrollIntoView({ block: 'nearest' }); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(0, activeIndex - 1); render(); list.children[activeIndex]?.scrollIntoView({ block: 'nearest' }); }
                else if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); selectItem(activeIndex); }
                else if (e.key === 'Escape') { closeBox(); }
            });

            document.addEventListener('click', (e) => { if (!box.contains(e.target) && e.target !== input) closeBox(); });
            input.addEventListener('focus', () => { if (items.length && input.value.trim().length >= 2) openBox(); });
        })();

        function switchTab(name) {
            document.querySelectorAll('[id^="content-"]').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById('content-' + name).classList.remove('hidden');
            document.getElementById('tab-' + name).classList.add('active');
        }
    </script>
@endpush
