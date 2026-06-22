@extends('layouts.app')

@section('title', 'Dashboard PPBJ')

@section('content')
<div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

    {{-- ========== HEADER ========== --}}
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <span class="text-2xl">📊</span>
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard PPBJ</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Ringkasan monitoring SLA & progress pengadaan</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="refreshDashboard()"
                    class="hidden sm:inline-flex items-center gap-2 px-3 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-sm transition-all duration-200 active:scale-95 text-sm border border-gray-200 dark:border-gray-600">
                    <span id="refreshIcon">🔄</span>
                    <span>Refresh</span>
                </button>
                <a href="{{ route('ppbj.index') }}"
                    class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-95">
                    <span>Ke Management PPBJ</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>

    {{-- ========== STATS CARDS ROW 1 ========== --}}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 card-animate">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">📦</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">ALL</span>
            </div>
            <div class="text-3xl font-bold text-gray-900 dark:text-white counter mb-1" data-target="{{ $stats['total'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Total PPBJ</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Semua data</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.05s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">🔄</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">ACTIVE</span>
            </div>
            <div class="text-3xl font-bold text-gray-900 dark:text-white counter mb-1" data-target="{{ $stats['active'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Sedang Berjalan</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Belum selesai</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.1s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">✅</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">LENGKAP</span>
            </div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 counter mb-1" data-target="{{ $stats['lengkap'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Lengkap</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Progress 100% + Invoice</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.15s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">🚫</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">CANCEL</span>
            </div>
            <div class="text-3xl font-bold text-gray-500 dark:text-gray-400 counter mb-1" data-target="{{ $stats['cancelled'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Dibatalkan</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Status cancelled</div>
        </div>
    </div>

    {{-- ========== STATS CARDS ROW 2 ========== --}}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.2s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">📗</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">SLA</span>
            </div>
            <div class="text-3xl font-bold text-emerald-600 dark:text-emerald-400 counter mb-1" data-target="{{ $stats['on_track'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">On Track</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Sesuai jadwal</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.25s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">⚠️</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">SLA</span>
            </div>
            <div class="text-3xl font-bold text-amber-600 dark:text-amber-400 counter mb-1" data-target="{{ $stats['warning'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Warning</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Perlu perhatian</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.3s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">🔴</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">SLA</span>
            </div>
            <div class="text-3xl font-bold text-red-600 dark:text-red-400 counter mb-1" data-target="{{ $stats['overdue'] ?? 0 }}">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Overdue</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Melewati batas SLA</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 card-animate" style="animation-delay:.35s">
            <div class="flex items-start justify-between mb-3">
                <div class="text-3xl">📈</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">AVG</span>
            </div>
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {{ number_format($stats['avg_progress'] ?? 0, 1) }}%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Rata-rata Progress</div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div class="h-1.5 rounded-full bg-purple-500 transition-all duration-1000"
                    style="width: {{ min(100, $stats['avg_progress'] ?? 0) }}%"></div>
            </div>
        </div>
    </div>

    {{-- ========== CHARTS ROW ========== --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 chart-card">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Komposisi Status</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">On Track / Warning / Overdue / Lengkap / Cancelled</p>
            </div>
            <div class="flex items-center justify-center" style="height: 280px;">
                <canvas id="statusChart"></canvas>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2 chart-card" style="animation-delay:.1s">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">PPBJ per Bulan</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Berdasarkan tanggal dibuat (6 bulan terakhir)</p>
            </div>
            <div style="height: 280px;">
                <canvas id="monthlyChart"></canvas>
            </div>
        </div>
    </div>

    {{-- ========== TOP STATS ========== --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Top 5 Buyers</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Buyer dengan PPBJ terbanyak</p>
            </div>
            <div class="space-y-3">
                @forelse($topBuyers ?? [] as $index => $buyer)
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 top-item">
                        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-sm">
                            {{ $index + 1 }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white truncate">{{ $buyer->buyer ?? 'Unknown' }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">Buyer</div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ $buyer->total ?? 0 }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">PPBJ</div>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div class="text-4xl mb-2">📊</div>
                        <p class="text-sm">Belum ada data buyer</p>
                    </div>
                @endforelse
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Top 5 Portofolio</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Portofolio dengan PPBJ terbanyak</p>
            </div>
            <div class="space-y-3">
                @forelse($topPortofolios ?? [] as $index => $porto)
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 top-item">
                        <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center font-bold text-sm">
                            {{ $index + 1 }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white truncate">{{ $porto->portofolio ?? 'Unknown' }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">Portofolio</div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ $porto->total ?? 0 }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">PPBJ</div>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div class="text-4xl mb-2">📂</div>
                        <p class="text-sm">Belum ada data portofolio</p>
                    </div>
                @endforelse
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Top 5 Penyedia</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Penyedia eksternal terbanyak</p>
            </div>
            <div class="space-y-3">
                @forelse($topPenyedias ?? [] as $index => $penyedia)
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 top-item">
                        <div class="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center font-bold text-sm">
                            {{ $index + 1 }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white truncate">{{ $penyedia->penyedia_eksternal ?? 'Unknown' }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">Penyedia</div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ $penyedia->total ?? 0 }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">PPBJ</div>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div class="text-4xl mb-2">🏢</div>
                        <p class="text-sm">Belum ada data penyedia</p>
                    </div>
                @endforelse
            </div>
        </div>
    </div>

    {{-- ========== WORKLOAD PER BUYER ========== --}}

    {{-- FIX #3: $activeBulan default ke bulan sekarang (bukan null) --}}
    @php
        $activeFilter    = request('bw_filter', 'all');
        $activeBulan     = (int) request('bw_bulan', now()->month);   // ← FIX: default now()->month
        $activeTahun     = (int) request('bw_tahun', now()->year);
        $activeTglDari   = request('bw_tgl_dari', '');
        $activeTglSampai = request('bw_tgl_sampai', '');

        $bulanList = [
            1=>'Januari', 2=>'Februari', 3=>'Maret',     4=>'April',
            5=>'Mei',     6=>'Juni',     7=>'Juli',       8=>'Agustus',
            9=>'September',10=>'Oktober',11=>'November',  12=>'Desember',
        ];
        $tahunList = range(now()->year, 2022, -1);

        // Label badge filter aktif — FIX: pakai null coalescing aman
        $filterLabel = match($activeFilter) {
            'today'  => 'Hari ini (' . now()->format('d/m/Y') . ')',
            'week'   => now()->startOfWeek()->format('d/m') . ' – ' . now()->endOfWeek()->format('d/m/Y'),
            'month'  => ($bulanList[$activeBulan] ?? 'Bulan') . ' ' . $activeTahun,
            'year'   => 'Tahun ' . $activeTahun,
            'custom' => ($activeTglDari ?: '?') . ' s/d ' . ($activeTglSampai ?: '?'),
            default  => 'Semua Data',
        };
    @endphp

    <div
        x-data="{
            showFilter: false,
            filterMode: '{{ $activeFilter }}',
            bulan: '{{ $activeBulan }}',
            tahun: '{{ $activeTahun }}',
            tglDari: '{{ $activeTglDari }}',
            tglSampai: '{{ $activeTglSampai }}',

            applyFilter() {
                const url = new URL(window.location.href);
                url.searchParams.set('bw_filter', this.filterMode);
                url.searchParams.set('bw_tahun',  this.tahun);
                if (this.filterMode === 'month') {
                    url.searchParams.set('bw_bulan', this.bulan);
                } else {
                    url.searchParams.delete('bw_bulan');
                }
                if (this.filterMode === 'custom') {
                    url.searchParams.set('bw_tgl_dari',   this.tglDari);
                    url.searchParams.set('bw_tgl_sampai', this.tglSampai);
                } else {
                    url.searchParams.delete('bw_tgl_dari');
                    url.searchParams.delete('bw_tgl_sampai');
                }
                window.location.href = url.toString();
            },

            resetFilter() {
                const url = new URL(window.location.href);
                ['bw_filter','bw_bulan','bw_tahun','bw_tgl_dari','bw_tgl_sampai'].forEach(k => url.searchParams.delete(k));
                window.location.href = url.toString();
            }
        }"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6"
    >
        {{-- HEADER --}}
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap items-center justify-between gap-3">

                {{-- Title --}}
                <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        👤 Workload per Buyer
                    </h3>
                    <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {{ $buyerWorkload['total_buyers'] ?? 0 }} buyer —
                            distribusi beban kerja & status SLA
                            <span class="text-gray-400 dark:text-gray-600 text-xs">· filter: tgl_ppbj</span>
                        </p>
                        @if($activeFilter !== 'all')
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                {{ $filterLabel }}
                            </span>
                        @endif
                    </div>
                </div>

                {{-- Controls --}}
                <div class="flex items-center gap-3">
                    {{-- Legend --}}
                    <div class="hidden md:flex items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>On Track</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>Warning</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>Overdue</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Lengkap</span>
                    </div>
                    <div class="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-600"></div>

                    {{-- Filter button --}}
                    <button
                        @click="showFilter = !showFilter"
                        :class="showFilter
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-600'"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
                        </svg>
                        <span x-text="showFilter ? 'Tutup Filter' : 'Filter Periode'"></span>
                        @if($activeFilter !== 'all')
                            <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
                        @endif
                    </button>

                    {{-- Reset --}}
                    @if($activeFilter !== 'all')
                        <button
                            @click="resetFilter()"
                            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:border-red-400 hover:text-red-500 transition-all duration-200"
                            title="Reset filter"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Reset
                        </button>
                    @endif
                </div>
            </div>

            {{-- FILTER PANEL --}}
            <div
                x-show="showFilter"
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0 -translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100 translate-y-0"
                x-transition:leave-end="opacity-0 -translate-y-2"
                class="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600"
            >
                {{-- Quick filters --}}
                <div class="mb-4">
                    <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2.5">
                        Pilih Periode <span class="font-normal normal-case tracking-normal text-gray-400">— berdasarkan Tanggal PPBJ (tgl_ppbj)</span>
                    </p>
                    <div class="flex flex-wrap gap-2">
                        @foreach([
                            ['all',    '🗂️', 'Semua Data'],
                            ['today',  '📅', 'Hari Ini'],
                            ['week',   '📆', 'Minggu Ini'],
                            ['month',  '🗓️', 'Per Bulan'],
                            ['year',   '📊', 'Per Tahun'],
                            ['custom', '✏️', 'Custom'],
                        ] as [$val, $icon, $label])
                            <button
                                @click="filterMode = '{{ $val }}'"
                                :class="filterMode === '{{ $val }}'
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-600'"
                                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-all duration-150"
                            >
                                <span>{{ $icon }}</span>
                                <span>{{ $label }}</span>
                            </button>
                        @endforeach
                    </div>
                </div>

                {{-- Conditional inputs --}}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[60px]">

                    {{-- Semua data --}}
                    <div x-show="filterMode === 'all'" x-transition class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Menampilkan seluruh data PPBJ tanpa filter periode
                    </div>

                    {{-- Today --}}
                    <div x-show="filterMode === 'today'" x-transition class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        PPBJ dengan <strong>tgl_ppbj</strong> = hari ini ({{ now()->format('d/m/Y') }})
                    </div>

                    {{-- Week --}}
                    <div x-show="filterMode === 'week'" x-transition class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        PPBJ dengan <strong>tgl_ppbj</strong> antara
                        {{ now()->startOfWeek()->format('d/m/Y') }} — {{ now()->endOfWeek()->format('d/m/Y') }}
                    </div>

                    {{-- Month: bulan + tahun --}}
                    <div x-show="filterMode === 'month'" x-transition class="sm:col-span-2 lg:col-span-1 flex gap-2">
                        <div class="flex-1">
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Bulan</label>
                            <select x-model="bulan"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                @foreach($bulanList as $num => $nama)
                                    <option value="{{ $num }}" {{ $activeBulan == $num ? 'selected' : '' }}>{{ $nama }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="w-28">
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tahun</label>
                            <select x-model="tahun"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                @foreach($tahunList as $yr)
                                    <option value="{{ $yr }}" {{ $activeTahun == $yr ? 'selected' : '' }}>{{ $yr }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    {{-- Year --}}
                    <div x-show="filterMode === 'year'" x-transition class="w-36">
                        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tahun</label>
                        <select x-model="tahun"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            @foreach($tahunList as $yr)
                                <option value="{{ $yr }}" {{ $activeTahun == $yr ? 'selected' : '' }}>{{ $yr }}</option>
                            @endforeach
                        </select>
                    </div>

                    {{-- Custom date range --}}
                    <div x-show="filterMode === 'custom'" x-transition class="sm:col-span-2 flex gap-2 items-end">
                        <div class="flex-1">
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Dari Tanggal (tgl_ppbj)</label>
                            <input type="date" x-model="tglDari"
                                value="{{ $activeTglDari }}"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        </div>
                        <div class="flex-shrink-0 pb-2.5 text-gray-400 font-bold">s/d</div>
                        <div class="flex-1">
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Sampai Tanggal (tgl_ppbj)</label>
                            <input type="date" x-model="tglSampai"
                                :min="tglDari"
                                value="{{ $activeTglSampai }}"
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        </div>
                    </div>
                </div>

                {{-- Action buttons --}}
                <div class="mt-4 flex items-center justify-end gap-2">
                    <button @click="showFilter = false"
                        class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Batal
                    </button>
                    <button @click="applyFilter()"
                        class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all duration-150 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        Terapkan Filter
                    </button>
                </div>
            </div>
        </div>

        {{-- TABLE --}}
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        <th class="px-5 py-3 text-left w-10">#</th>
                        <th class="px-4 py-3 text-left min-w-[150px]">Buyer</th>
                        <th class="px-4 py-3 text-left min-w-[180px]">Beban Kerja</th>
                        <th class="px-4 py-3 text-center w-20">Total</th>
                        <th class="px-4 py-3 text-center w-24"><span class="text-emerald-600 dark:text-emerald-400">On Track</span></th>
                        <th class="px-4 py-3 text-center w-24"><span class="text-amber-500">Warning</span></th>
                        <th class="px-4 py-3 text-center w-24"><span class="text-red-500">Overdue</span></th>
                        <th class="px-4 py-3 text-center w-24"><span class="text-blue-500">Lengkap</span></th>
                        <th class="px-4 py-3 text-center w-28">Avg Progress</th>
                        <th class="px-4 py-3 text-center w-24">Risiko</th>
                        <th class="px-4 py-3 text-right min-w-[140px]">
                            <div>Nilai Pengadaan</div>
                            <div class="text-[10px] font-normal text-gray-400 normal-case tracking-normal">total_sebelum_ppn</div>
                        </th>
                        <th class="px-4 py-3 text-right min-w-[140px]">
                            <div>Nilai Realisasi</div>
                            <div class="text-[10px] font-normal text-gray-400 normal-case tracking-normal">nilai_sp_spk</div>
                        </th>
                        <th class="px-4 py-3 text-right min-w-[110px]">
                            <div>Efisiensi</div>
                            <div class="text-[10px] font-normal text-gray-400 normal-case tracking-normal">estimasi − realisasi</div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($buyerWorkload['buyers'] ?? [] as $index => $bw)
                        @php
                            $riskColor = match($bw['risk_level']) {
                                'high'   => ['bg'=>'bg-red-100 dark:bg-red-900/30','text'=>'text-red-700 dark:text-red-300','label'=>'🔴 Tinggi','row'=>'hover:bg-red-50/40 dark:hover:bg-red-900/10'],
                                'medium' => ['bg'=>'bg-amber-100 dark:bg-amber-900/30','text'=>'text-amber-700 dark:text-amber-300','label'=>'🟡 Sedang','row'=>'hover:bg-amber-50/40 dark:hover:bg-amber-900/10'],
                                default  => ['bg'=>'bg-emerald-100 dark:bg-emerald-900/30','text'=>'text-emerald-700 dark:text-emerald-300','label'=>'🟢 Rendah','row'=>'hover:bg-gray-50 dark:hover:bg-gray-700/30'],
                            };
                            $total      = $bw['total_aktif'];
                            $pctLengkap = $total > 0 ? round(($bw['lengkap']  / $total) * 100) : 0;
                            $pctOT      = $total > 0 ? round(($bw['on_track'] / $total) * 100) : 0;
                            $pctWarn    = $total > 0 ? round(($bw['warning']  / $total) * 100) : 0;
                            $pctOD      = $total > 0 ? round(($bw['overdue']  / $total) * 100) : 0;
                            $pctOT      = min($pctOT, 100 - $pctLengkap - $pctWarn - $pctOD);
                            $pctReal    = $bw['total_nilai'] > 0 ? min(100, round(($bw['total_realisasi'] / $bw['total_nilai']) * 100)) : 0;
                            $isHemat    = $bw['efisiensi'] >= 0;
                        @endphp
                        <tr class="transition-colors duration-150 {{ $riskColor['row'] }}">

                            <td class="px-5 py-4 text-center">
                                <span class="text-xs font-bold text-gray-300 dark:text-gray-600">{{ $index + 1 }}</span>
                            </td>

                            <td class="px-4 py-4">
                                <div class="flex items-center gap-2.5">
                                    <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br
                                        {{ $bw['risk_level'] === 'high' ? 'from-red-400 to-rose-600' : ($bw['risk_level'] === 'medium' ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-600') }}
                                        flex items-center justify-center text-white text-xs font-black shadow-sm">
                                        {{ strtoupper(substr($bw['buyer'], 0, 2)) }}
                                    </div>
                                    <div>
                                        <div class="font-bold text-gray-900 dark:text-white">{{ $bw['buyer'] }}</div>
                                        <div class="text-xs text-gray-400 dark:text-gray-500">{{ $total }} PPBJ</div>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="flex-1 flex h-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 min-w-[100px]"
                                        title="Lengkap: {{ $bw['lengkap'] }} | On Track: {{ $bw['on_track'] }} | Warning: {{ $bw['warning'] }} | Overdue: {{ $bw['overdue'] }}">
                                        @if($pctLengkap > 0)<div class="bg-blue-500 h-full" style="width:{{ $pctLengkap }}%"></div>@endif
                                        @if($pctOT > 0)<div class="bg-emerald-500 h-full" style="width:{{ $pctOT }}%"></div>@endif
                                        @if($pctWarn > 0)<div class="bg-amber-400 h-full" style="width:{{ $pctWarn }}%"></div>@endif
                                        @if($pctOD > 0)<div class="bg-red-500 h-full" style="width:{{ $pctOD }}%"></div>@endif
                                    </div>
                                    <span class="text-[11px] text-gray-400 w-8 text-right tabular-nums">{{ $bw['bar_pct'] }}%</span>
                                </div>
                            </td>

                            <td class="px-4 py-4 text-center">
                                <span class="text-base font-black text-gray-900 dark:text-white">{{ $total }}</span>
                            </td>

                            <td class="px-4 py-4 text-center">
                                @if($bw['on_track'] > 0)
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold text-sm">{{ $bw['on_track'] }}</span>
                                @else<span class="text-gray-300 dark:text-gray-600">—</span>@endif
                            </td>

                            <td class="px-4 py-4 text-center">
                                @if($bw['warning'] > 0)
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold text-sm">{{ $bw['warning'] }}</span>
                                @else<span class="text-gray-300 dark:text-gray-600">—</span>@endif
                            </td>

                            <td class="px-4 py-4 text-center">
                                @if($bw['overdue'] > 0)
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold text-sm animate-pulse">{{ $bw['overdue'] }}</span>
                                @else<span class="text-gray-300 dark:text-gray-600">—</span>@endif
                            </td>

                            <td class="px-4 py-4 text-center">
                                @if($bw['lengkap'] > 0)
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm">{{ $bw['lengkap'] }}</span>
                                @else<span class="text-gray-300 dark:text-gray-600">—</span>@endif
                            </td>

                            <td class="px-4 py-4 text-center">
                                <div class="flex flex-col items-center gap-1">
                                    <span class="text-sm font-black text-gray-900 dark:text-white tabular-nums">{{ number_format($bw['avg_progress'], 1) }}%</span>
                                    <div class="w-14 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                        <div class="h-1.5 rounded-full {{ $bw['avg_progress'] >= 80 ? 'bg-blue-500' : ($bw['avg_progress'] >= 40 ? 'bg-emerald-500' : 'bg-gray-400') }}"
                                            style="width:{{ min(100,$bw['avg_progress']) }}%"></div>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-4 text-center">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold {{ $riskColor['bg'] }} {{ $riskColor['text'] }}">
                                    {{ $riskColor['label'] }}
                                </span>
                            </td>

                            <td class="px-4 py-4 text-right">
                                @php
                                    $n = $bw['total_nilai'];
                                    echo '<div class="text-sm font-bold text-gray-700 dark:text-gray-300 tabular-nums">';
                                    if ($n >= 1_000_000_000)     echo 'Rp ' . number_format($n/1_000_000_000, 2) . ' M';
                                    elseif ($n >= 1_000_000)     echo 'Rp ' . number_format($n/1_000_000, 1) . ' jt';
                                    elseif ($n > 0)              echo 'Rp ' . number_format($n, 0, ',', '.');
                                    else                         echo '—';
                                    echo '</div><div class="text-[10px] text-gray-400 mt-0.5">Estimasi</div>';
                                @endphp
                            </td>

                            <td class="px-4 py-4 text-right">
                                @if($bw['total_realisasi'] > 0)
                                    @php
                                        $r = $bw['total_realisasi'];
                                        echo '<div class="text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">';
                                        if ($r >= 1_000_000_000)     echo 'Rp ' . number_format($r/1_000_000_000, 2) . ' M';
                                        elseif ($r >= 1_000_000)     echo 'Rp ' . number_format($r/1_000_000, 1) . ' jt';
                                        else                         echo 'Rp ' . number_format($r, 0, ',', '.');
                                        echo '</div>';
                                    @endphp
                                    <div class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                                        <div class="h-1 rounded-full {{ $pctReal > 100 ? 'bg-red-500' : 'bg-indigo-500' }}" style="width:{{ $pctReal }}%"></div>
                                    </div>
                                    <div class="text-[10px] text-gray-400 mt-0.5 tabular-nums">{{ $pctReal }}% dari estimasi</div>
                                @else
                                    <span class="text-sm text-gray-300 dark:text-gray-600">—</span>
                                    <div class="text-[10px] text-gray-400 mt-0.5">Belum ada SPK</div>
                                @endif
                            </td>

                            <td class="px-4 py-4 text-right">
                                @if($bw['total_realisasi'] > 0 && $bw['total_nilai'] > 0)
                                    @php
                                        $e = abs($bw['efisiensi']);
                                        echo '<div class="text-sm font-black tabular-nums ' . ($isHemat ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400') . '">';
                                        echo $isHemat ? '+' : '-';
                                        if ($e >= 1_000_000_000)     echo 'Rp ' . number_format($e/1_000_000_000, 2) . ' M';
                                        elseif ($e >= 1_000_000)     echo 'Rp ' . number_format($e/1_000_000, 1) . ' jt';
                                        else                         echo 'Rp ' . number_format($e, 0, ',', '.');
                                        echo '</div>';
                                    @endphp
                                    <div class="text-[10px] font-bold mt-0.5 {{ $isHemat ? 'text-emerald-500' : 'text-red-500' }}">
                                        {{ $isHemat ? '▼ Hemat ' : '▲ Lebih ' }}{{ abs($bw['efisiensi_pct']) }}%
                                    </div>
                                @else
                                    <span class="text-gray-300 dark:text-gray-600 text-sm">—</span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="13" class="px-6 py-16 text-center">
                                <div class="text-5xl mb-3">🔍</div>
                                <p class="text-gray-500 dark:text-gray-400 font-semibold">Tidak ada data untuk periode ini</p>
                                <p class="text-gray-400 dark:text-gray-500 text-sm mt-1">Coba ubah filter periode</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>

                {{-- Footer Summary --}}
                @if(count($buyerWorkload['buyers'] ?? []) > 0)
                    @php
                        $bColl        = collect($buyerWorkload['buyers']);
                        $sumAktif     = $bColl->sum('total_aktif');
                        $sumOT        = $bColl->sum('on_track');
                        $sumWarn      = $bColl->sum('warning');
                        $sumOD        = $bColl->sum('overdue');
                        $sumLen       = $bColl->sum('lengkap');
                        $sumNilai     = $bColl->sum('total_nilai');
                        $sumRealisasi = $bColl->sum('total_realisasi');
                        $sumEf        = $sumNilai - $sumRealisasi;
                        $sumEfPct     = $sumNilai > 0 ? round(($sumEf / $sumNilai) * 100, 1) : 0;
                        $avgProg      = $bColl->avg('avg_progress');

                        // helper closure untuk format di tfoot
                        $fmt = function(float $v): string {
                            if ($v >= 1_000_000_000) return 'Rp ' . number_format($v/1_000_000_000, 2) . ' M';
                            if ($v >= 1_000_000)     return 'Rp ' . number_format($v/1_000_000, 1) . ' jt';
                            if ($v > 0)              return 'Rp ' . number_format($v, 0, ',', '.');
                            return '—';
                        };
                    @endphp
                    <tfoot>
                        <tr class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700/40 font-semibold text-sm border-t-2 border-gray-200 dark:border-gray-600">
                            <td colspan="3" class="px-5 py-3.5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wide">
                                Total · {{ $buyerWorkload['total_buyers'] }} buyer
                            </td>
                            <td class="px-4 py-3.5 text-center font-black text-gray-900 dark:text-white text-base">{{ $sumAktif }}</td>
                            <td class="px-4 py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">{{ $sumOT }}</td>
                            <td class="px-4 py-3.5 text-center font-bold text-amber-500">{{ $sumWarn }}</td>
                            <td class="px-4 py-3.5 text-center font-bold text-red-600 dark:text-red-400">{{ $sumOD }}</td>
                            <td class="px-4 py-3.5 text-center font-bold text-blue-600 dark:text-blue-400">{{ $sumLen }}</td>
                            <td class="px-4 py-3.5 text-center text-gray-700 dark:text-gray-300">{{ number_format($avgProg,1) }}%</td>
                            <td class="px-4 py-3.5"></td>
                            <td class="px-4 py-3.5 text-right font-bold text-gray-700 dark:text-gray-300">{{ $fmt($sumNilai) }}</td>
                            <td class="px-4 py-3.5 text-right font-bold text-indigo-600 dark:text-indigo-400">
                                {{ $sumRealisasi > 0 ? $fmt($sumRealisasi) : '—' }}
                            </td>
                            <td class="px-4 py-3.5 text-right">
                                @if($sumRealisasi > 0 && $sumNilai > 0)
                                    <div class="font-black {{ $sumEf >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400' }}">
                                        {{ $sumEf >= 0 ? '+' : '-' }}{{ $fmt(abs($sumEf)) }}
                                    </div>
                                    <div class="text-[10px] font-bold {{ $sumEf >= 0 ? 'text-emerald-500' : 'text-red-500' }}">
                                        {{ $sumEf >= 0 ? '▼ Hemat ' : '▲ Lebih ' }}{{ abs($sumEfPct) }}%
                                    </div>
                                @else
                                    <span class="text-gray-400">—</span>
                                @endif
                            </td>
                        </tr>
                    </tfoot>
                @endif
            </table>
        </div>

        {{-- Footer bar --}}
        <div class="px-6 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>🔴 Angka overdue berkedip = perlu tindak lanjut segera · Filter berdasarkan <code class="bg-gray-200 dark:bg-gray-600 px-1 rounded">tgl_ppbj</code></span>
            <a href="{{ route('ppbj.index') }}" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Kelola PPBJ →
            </a>
        </div>
    </div>

    {{-- ========== RECENT ACTIVITIES ========== --}}
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="mb-4 flex items-center justify-between">
            <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">5 PPBJ terakhir diupdate</p>
            </div>
            <a href="{{ route('ppbj.index') }}" class="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Lihat Semua →
            </a>
        </div>
        <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
            @forelse($recentActivities ?? [] as $activity)
                @php
                    $isCancelled = strtoupper($activity->status ?? 'ACTIVE') === 'CANCELLED';
                    $isLengkap   = !$isCancelled && (int)$activity->progres === 100 && !empty($activity->no_invoice);
                    $displaySla  = $activity->status_sla ?? 'ON TRACK';

                    $slaColor = match(true) {
                        $isCancelled             => 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
                        $isLengkap               => 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
                        $displaySla === 'OVERDUE' => 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
                        $displaySla === 'WARNING' => 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
                        default                  => 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
                    };
                    $dotColor = match(true) {
                        $isCancelled             => 'bg-gray-400',
                        $isLengkap               => 'bg-blue-500',
                        $displaySla === 'OVERDUE' => 'bg-red-500',
                        $displaySla === 'WARNING' => 'bg-amber-500',
                        default                  => 'bg-emerald-500',
                    };
                @endphp
                <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 activity-item">
                    <div class="flex-shrink-0 mt-1.5">
                        <div class="w-2 h-2 rounded-full {{ $dotColor }}"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2 mb-1">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-gray-900 dark:text-white text-sm">{{ $activity->ppbj_no ?? 'N/A' }}</span>
                                @if($isCancelled)
                                    <span class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">CANCELLED</span>
                                @elseif($isLengkap)
                                    <span class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">LENGKAP</span>
                                @endif
                            </div>
                            <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {{ \Carbon\Carbon::parse($activity->updated_at ?? now())->diffForHumans() }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">{{ $activity->uraian ?? 'No description' }}</p>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md {{ $slaColor }}">
                                {{ $isCancelled ? 'CANCELLED' : ($isLengkap ? 'LENGKAP' : $displaySla) }}
                            </span>
                            @if(!$isCancelled)
                                <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                    {{ $activity->progres ?? 0 }}%
                                </span>
                            @endif
                            <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">{{ $activity->buyer ?? 'N/A' }}</span>
                        </div>
                    </div>
                </div>
            @empty
                <div class="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div class="text-5xl mb-3">🕐</div>
                    <p class="text-sm">Belum ada aktivitas</p>
                </div>
            @endforelse
        </div>
    </div>

</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<style>
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    .card-animate  { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
    .chart-card    { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .top-item      { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; }
    .activity-item { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; }

    .custom-scrollbar::-webkit-scrollbar       { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; }
</style>

<script>
(function () {
    const isDark    = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#9ca3af' : '#6b7280';
    const gridColor = isDark ? 'rgba(75,85,99,.3)' : 'rgba(229,231,235,.5)';
    const bgColor   = isDark ? '#1f2937' : '#ffffff';

    // ── Counter animation ──────────────────────────────────
    function animateCounter(el) {
        const target    = parseInt(el.getAttribute('data-target')) || 0;
        const duration  = 1000;
        const increment = target / (duration / 16);
        let current     = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // ── Stagger animations ─────────────────────────────────
    document.querySelectorAll('.top-item').forEach((el, i) => {
        el.style.animationDelay = `${0.5 + i * 0.08}s`;
    });
    document.querySelectorAll('.activity-item').forEach((el, i) => {
        el.style.animationDelay = `${0.6 + i * 0.05}s`;
    });

    // ── Chart data ─────────────────────────────────────────
    const slaData     = @json($slaDistribution ?? []);
    const monthlyData = @json($monthlyDistribution ?? []);

    // ── Status Donut Chart ─────────────────────────────────
    const statusCanvas = document.getElementById('statusChart');
    if (statusCanvas && slaData?.labels?.length) {
        const colorMap = {
            'ON TRACK'  : 'rgba(16,  185, 129, .85)',
            'WARNING'   : 'rgba(245, 158,  11, .85)',
            'OVERDUE'   : 'rgba(239,  68,  68, .85)',
            'LENGKAP'   : 'rgba(59,  130, 246, .85)',
            'CANCELLED' : 'rgba(156, 163, 175, .85)',
        };
        const bgColors = slaData.labels.map(l => colorMap[l] ?? 'rgba(156,163,175,.85)');

        new Chart(statusCanvas, {
            type: 'doughnut',
            data: {
                labels  : slaData.labels,
                datasets: [{
                    data            : slaData.values,
                    backgroundColor : bgColors,
                    borderWidth     : 0,
                    hoverOffset     : 10,
                }],
            },
            options: {
                responsive         : true,
                maintainAspectRatio: true,
                cutout             : '60%',
                animation          : { animateRotate: true, duration: 1500 },
                plugins: {
                    legend: {
                        position : 'bottom',
                        labels   : {
                            color        : textColor,
                            padding      : 12,
                            font         : { size: 11, family: 'Inter, sans-serif' },
                            usePointStyle: true,
                            generateLabels(chart) {
                                return chart.data.labels.map((label, i) => ({
                                    text     : `${label} (${chart.data.datasets[0].data[i]})`,
                                    fillStyle: chart.data.datasets[0].backgroundColor[i],
                                    hidden   : false,
                                    index    : i,
                                }));
                            },
                        },
                    },
                    tooltip: {
                        backgroundColor: bgColor,
                        titleColor     : textColor,
                        bodyColor      : textColor,
                        borderColor    : gridColor,
                        borderWidth    : 1,
                        padding        : 12,
                        callbacks: {
                            label(ctx) {
                                const total      = ctx.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total ? Math.round((ctx.raw / total) * 100) : 0;
                                return `${ctx.label}: ${ctx.raw} (${percentage}%)`;
                            },
                        },
                    },
                },
            },
        });
    }

    // ── Monthly Line Chart ─────────────────────────────────
    const monthlyCanvas = document.getElementById('monthlyChart');
    if (monthlyCanvas && monthlyData?.labels?.length) {
        const maxVal   = Math.max(...monthlyData.values, 1);
        const yAxisMax = Math.ceil(maxVal * 1.2);

        new Chart(monthlyCanvas, {
            type: 'line',
            data: {
                labels  : monthlyData.labels,
                datasets: [{
                    label                : 'Jumlah PPBJ',
                    data                 : monthlyData.values,
                    borderColor          : 'rgba(59,130,246,1)',
                    backgroundColor      : 'rgba(59,130,246,.1)',
                    borderWidth          : 3,
                    fill                 : true,
                    tension              : 0.4,
                    pointRadius          : 5,
                    pointBackgroundColor : 'rgba(59,130,246,1)',
                    pointBorderColor     : '#fff',
                    pointBorderWidth     : 2,
                    pointHoverRadius     : 7,
                }],
            },
            options: {
                responsive         : true,
                maintainAspectRatio: false,
                animation          : { duration: 1500, easing: 'easeInOutQuart' },
                plugins: {
                    legend : { display: false },
                    tooltip: {
                        backgroundColor: bgColor,
                        titleColor     : textColor,
                        bodyColor      : textColor,
                        borderColor    : gridColor,
                        borderWidth    : 1,
                        padding        : 12,
                        displayColors  : false,
                        callbacks      : { label: ctx => `${ctx.parsed.y} PPBJ` },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max        : yAxisMax,
                        ticks      : { color: textColor, stepSize: 1, precision: 0 },
                        grid       : { color: gridColor, drawBorder: false },
                    },
                    x: {
                        ticks: { color: textColor, font: { size: 11 } },
                        grid : { display: false },
                    },
                },
            },
        });
    }

    // ── Refresh Dashboard ──────────────────────────────────
    window.refreshDashboard = async function () {
        const icon = document.getElementById('refreshIcon');
        if (icon) icon.textContent = '⏳';
        try {
            const res = await fetch('{{ route("dashboard.refresh") }}', {
                method  : 'POST',
                headers : {
                    'X-CSRF-TOKEN'    : '{{ csrf_token() }}',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            if (res.ok) {
                setTimeout(() => window.location.reload(), 300);
            }
        } catch (e) {
            if (icon) icon.textContent = '🔄';
            console.error('Refresh failed:', e);
        }
    };
})();
</script>
@endpush