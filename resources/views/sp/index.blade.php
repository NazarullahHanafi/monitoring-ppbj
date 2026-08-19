@extends('layouts.app')

@section('title', 'Penomoran SP')

@php
    $oracleMode = (bool) ($oracleMode ?? request('mode') === 'oracle');
    $normalSpUrl = route('sp.index', request()->except(['mode', 'oracle', 'oracle_mode', 'page']));
    $oracleSpUrl = route('sp.index', array_merge(request()->except(['page', 'oracle', 'oracle_mode']), ['mode' => 'oracle']));
@endphp

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/sp/sp.css') }}?v=20260814a">
@endpush

@section('content')
    <div class="space-y-6">

        {{-- HEADER --}}
        <div class="sp-header-gradient rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div class="relative">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <span class="text-3xl">📝</span>
                            <h1 class="text-2xl font-bold tracking-tight">{{ $oracleMode ? 'Penomoran SP Oracle' : 'Penomoran SP' }}</h1>
                        </div>
                        <p class="text-blue-100 text-sm">
                            {{ $oracleMode ? 'Surat Pesanan nilai di atas Rp50 juta — nomor dari ERP Oracle' : 'Surat Pesanan' }}
                        </p>
                        <div class="flex items-center gap-2 mt-3 flex-wrap">
                            <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">Total: <span
                                    id="totalCount">{{ $sps->total() }}</span> Data</span>
                            @if($lastNomor)
                                <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium font-mono">Terakhir:
                                    {{ $lastNomor }}</span>
                            @endif
                            <span class="flex items-center text-xs bg-green-400/20 rounded-full px-3 py-1"><span
                                    class="live-dot"></span> Live</span>
                            @if($oracleMode)
                                <span class="text-xs bg-gray-950/50 rounded-full px-3 py-1 font-semibold border border-white/20">Oracle manual</span>
                            @endif
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 shrink-0">
                        @if($oracleMode)
                            <a href="{{ $normalSpUrl }}"
                                class="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap"
                                title="Kembali ke penomoran SP otomatis">
                                <span>↩</span>
                                <span class="text-sm">SP Otomatis</span>
                            </a>
                        @else
                            <a href="{{ $oracleSpUrl }}"
                                class="flex items-center gap-2 bg-gray-950/70 hover:bg-gray-950 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/20 whitespace-nowrap shadow-lg shadow-black/20"
                                title="Masuk mode SP Oracle untuk pengadaan di atas Rp50 juta">
                                <span>🕶️</span>
                                <span class="text-sm">Oracle &gt;50 Juta</span>
                            </a>
                        @endif
                        <a href="{{ route('satuan.index') }}"
                            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap"
                            title="Master Satuan">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span class="text-sm">Satuan</span>
                        </a>
                        <a href="{{ route('vendor.index') }}"
                            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap group"
                            title="Kelola Master Vendor">
                            <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span class="text-sm">Vendor</span>
                        </a>
                        <button onclick="openModal('addModal')"
                            class="flex items-center gap-2 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-black/20 whitespace-nowrap group">
                            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            {{ $oracleMode ? 'Tambah SP Oracle' : 'Tambah SP' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        @if($oracleMode)
            <div class="rounded-2xl border p-4 shadow-sm"
                style="background: {{ $oracleMode ? 'linear-gradient(135deg, #3b2a08, #111827)' : '#fff7ed' }}; border-color: #f59e0b;">
                <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div class="min-w-0">
                        <p class="text-sm font-black" style="color:#ffffff;">Mode Oracle ERP aktif</p>
                        <p class="text-xs mt-1 leading-relaxed" style="color:#fde68a;">
                            Khusus SP bernilai di atas Rp50 juta. Nomor SP diketik manual sesuai nomor dari Oracle; field, item, vendor, PR/PPBJ, dan cetak SP tetap sama.
                        </p>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black shadow-sm" style="background:#f59e0b;color:#111827;">Manual numbering</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Nilai &gt; Rp50 Juta</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Pisah dari SP Otomatis</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Siap Audit</span>
                    </div>
                </div>
            </div>
        @endif

        {{-- PRESENCE --}}
        <div id="presenceBar" class="hidden transition-all duration-300">
            <div
                class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span class="relative flex h-2.5 w-2.5"><span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span
                        class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span></span>
                <span id="presenceText" class="text-xs font-semibold text-amber-700 dark:text-amber-400"></span>
            </div>
        </div>

        {{-- STATS BAR --}}
        @php
            $statsTotalCount = (float) data_get($stats, 'total_count', 0);
            $statsTotalNilaiSp = (float) data_get($stats, 'total_nilai_sp', 0);
            $statsTotalNilaiPr = (float) data_get($stats, 'total_nilai_pr', 0);
        @endphp
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Data</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {{ number_format($statsTotalCount, 0, ',', '.') }}
                    </p>
                </div>
            </div>
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Nilai SP</p>
                    <p class="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">Rp
                        {{ number_format($statsTotalNilaiSp, 0, ',', '.') }}
                    </p>
                </div>
            </div>
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Nilai PR</p>
                    <p class="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">Rp
                        {{ number_format($statsTotalNilaiPr, 0, ',', '.') }}
                    </p>
                </div>
            </div>
        </div>

        {{-- ALERTS --}}
        @if(session('success'))
            <div class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl"
                id="alertSuccess">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ session('success') }}</span>
                <button onclick="this.closest('[id]').remove()" class="ml-auto text-green-500 hover:text-green-700">✕</button>
            </div>
        @endif
        @if($errors->any())
            <div
                class="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                <ul class="text-sm">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
            </div>
        @endif

        {{-- FILTER BAR --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
            <div class="flex flex-col lg:flex-row gap-3">
                <div class="relative flex-1">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="searchInput" value="{{ $search ?? '' }}"
                        placeholder="Cari nomor SP, nomor PR, vendor, deskripsi..."
                        class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <span id="searchSpinner" class="absolute right-3 top-1/2 -translate-y-1/2 hidden"><svg
                            class="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg></span>
                </div>
                <select id="filterPic"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[140px]">
                    <option value="">Semua PIC</option>
                    @foreach($pics as $p)<option value="{{ $p }}" {{ (isset($pic) && $pic === $p) ? 'selected' : '' }}>
                        {{ $p }}
                    </option>@endforeach
                </select>
                <input type="date" id="dariInput" value="{{ $dari ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <input type="date" id="sampaiInput" value="{{ $sampai ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <button onclick="doExport()"
                    class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold text-sm whitespace-nowrap"><svg
                        class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>Export</button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="text-xs text-gray-400 mr-1">Quick:</span>
                    <button onclick="setQuickDate('today')" class="quick-pill">📍 Hari Ini</button>
                    <button onclick="setQuickDate('month')" class="quick-pill">📅 Bulan Ini</button>
                    <button onclick="setQuickDate('year')" class="quick-pill">📆 Tahun Ini</button>
                    <button onclick="resetDate()" class="quick-pill">🔄 Reset</button>
                </div>
                <div class="flex items-center gap-2 flex-wrap sm:ml-auto">
                    @if($search)<span
                        class="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-mono">"{{ $search }}"
                    <button onclick="clearSearch()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($pic)<span
                        class="inline-flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">PIC:
                    {{ $pic }} <button onclick="clearPic()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($dari || $sampai)<span
                        class="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">📅
                        {{ ($dari ? \Carbon\Carbon::parse($dari)->format('d/m/Y') : '...') }} –
                        {{ ($sampai ? \Carbon\Carbon::parse($sampai)->format('d/m/Y') : '...') }} <button
                    onclick="clearDate()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                </div>
            </div>
        </div>

        {{-- TABLE --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-10">
                                #</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[170px]">
                                Nomor SP</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[90px]">
                                Tgl SP</th>
                            <th
                                class="px-3 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[110px]">
                                Nilai SP</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[150px]">
                                Nomor PR</th>
                            <th
                                class="px-3 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[110px]">
                                Nilai PR</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[160px]">
                                Vendor</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Deskripsi</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-20">
                                PIC</th>
                            <th
                                class="px-3 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-32">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="spBody" class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($sps as $i => $s)
                            @php
                                $linkedPpbjNumbers = $s->linkedPpbjNumbers();
                                $linkedPpbjText = implode(' ', $linkedPpbjNumbers);
                                $canEditSp = (filled($s->created_by_user_id) && (int) $s->created_by_user_id === (int) auth()->id())
                                    || auth()->user()?->matchesOwnerLabel($s->pic);
                            @endphp
                            <tr class="tbl-row-hover" data-id="{{ $s->id }}"
                                data-search="{{ strtolower($s->nomor_sp . ' ' . $linkedPpbjText . ' ' . $s->nama_vendor . ' ' . $s->deskripsi_pengadaan) }}"
                                data-pic="{{ $s->pic }}">
                                <td class="px-3 py-3 text-gray-400 text-xs font-mono">{{ $sps->firstItem() + $i }}</td>
                                <td class="px-3 py-3">
                                    <div class="flex flex-col items-start gap-1">
                                        <span
                                            class="badge-sp inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                            title="Klik untuk salin">{{ $s->nomor_sp }}</span>
                                        @if(($s->numbering_mode ?? 'auto') === 'oracle')
                                            <span class="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white dark:bg-amber-400 dark:text-gray-950 px-2 py-0.5 text-[10px] font-bold">
                                                🕶️ Oracle &gt;50jt
                                            </span>
                                        @endif
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                                    {{ $s->tanggal_sp?->format('d/m/Y') ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-right">@if($s->nilai_sp)<span
                                class="nilai-badge text-emerald-700 dark:text-emerald-400 font-semibold">{{ 'Rp ' . number_format($s->nilai_sp, 0, ',', '.') }}</span>@else<span
                                        class="text-gray-400 text-xs">-</span>@endif</td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                                    <div class="flex flex-col gap-1">
                                        @forelse($linkedPpbjNumbers as $linkedPpbj)
                                            <span class="inline-flex w-fit rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 dark:border-slate-700 dark:bg-slate-800">{{ $linkedPpbj }}</span>
                                        @empty
                                            <span>-</span>
                                        @endforelse
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-right">@if($s->nilai_pr)<span
                                class="nilai-badge text-indigo-600 dark:text-indigo-400">{{ 'Rp ' . number_format($s->nilai_pr, 0, ',', '.') }}</span>@else<span
                                        class="text-gray-400 text-xs">-</span>@endif</td>
                                <td class="px-3 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">
                                    <div class="flex flex-col items-start gap-1">
                                        <span>{{ $s->nama_vendor }}</span>
                                        @php
                                            $vendorAudit = $spVendorAuditMap[$s->id] ?? null;
                                        @endphp
                                        @if($vendorAudit)
                                            @php
                                                $auditClass = match($vendorAudit['status'] ?? '') {
                                                    'match' => 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
                                                    'mismatch' => 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
                                                    'no_spph', 'no_vendor' => 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                                                    default => 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700',
                                                };
                                            @endphp
                                            <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-extrabold {{ $auditClass }}"
                                                title="{{ !empty($vendorAudit['vendors']) ? 'Vendor SPPH: '.implode(', ', $vendorAudit['vendors']) : ($vendorAudit['label'] ?? '') }}">
                                                {{ $vendorAudit['status'] === 'match' ? '✓' : ($vendorAudit['status'] === 'mismatch' ? '!' : 'i') }}
                                                {{ $vendorAudit['label'] ?? 'Audit vendor' }}
                                            </span>
                                        @endif
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate"
                                    title="{{ $s->deskripsi_pengadaan }}">{{ $s->deskripsi_pengadaan }}</td>
                                <td class="px-3 py-3"><span
                                        class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">{{ $s->pic }}</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button type="button" onclick="shareRecordToChat('sp', {{ $s->id }})"
                                            class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                            title="Bagikan SP ke Chat Tim" aria-label="Bagikan SP ke Chat Tim">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8m-8 4h5m8-2a8 8 0 01-8 8 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.1A8 8 0 1119 17.2" />
                                            </svg>
                                        </button>
                                        <button type="button"
                                            onclick="openArchiveAttachmentUpload({
                                                module: 'SP',
                                                nomor: @js($s->nomor_sp ?? ('SP-' . $s->id)),
                                                nomor_pr: @js($s->nomor_pr ?? ''),
                                                vendor: @js($s->nama_vendor ?? ''),
                                                url: @js(route('sp.archive-attachment', $s))
                                            })"
                                            class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30 transition-colors"
                                            title="Upload lampiran SP ke Sistem Arsip" aria-label="Upload lampiran SP ke Sistem Arsip">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.657-5.657L5.757 10.757a6 6 0 108.486 8.486L20.5 12.986" />
                                            </svg>
                                        </button>
                                        <a href="{{ route('sp.cetak.preview', $s) }}" target="_blank"
                                            class="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                                            title="Preview & simpan SP"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg></a>
                                        @if($canEditSp)
                                            <button
                                                onclick="openEditModal(
                                                    {{ $s->id }},
                                                    {{ Js::from($s->nomor_sp) }},
                                                    {{ Js::from($s->tanggal_sp?->format('Y-m-d')) }},
                                                    {{ $s->nilai_sp ?? 0 }},
                                                    {{ Js::from($s->nomor_pr ?? '') }},
                                                    {{ $s->nilai_pr ?? 0 }},
                                                    {{ Js::from($s->nama_vendor) }},
                                                    {{ Js::from($s->deskripsi_pengadaan) }},
                                                    {{ Js::from($s->pic) }},
                                                    {{ Js::from($s->sph ?? '') }},
                                                    {{ Js::from($s->tgl_sph?->format('Y-m-d')) }},
                                                    {{ Js::from($s->promised_date?->format('Y-m-d')) }},
                                                    {{ Js::from($s->rfq ?? '') }},
                                                    {{ Js::from($s->nomor_pemenang ?? '') }},
                                                    {{ Js::from($s->tanggal_pemenang?->format('Y-m-d')) }},
                                                    {{ Js::from($s->awal_kontrak?->format('Y-m-d')) }},
                                                    {{ Js::from($s->akhir_kontrak?->format('Y-m-d')) }},
                                                    {{ Js::from($s->bidang_ip_itu ?? '') }},
                                                    {{ Js::from($s->penandatangan_sci ?? '') }},
                                                    {{ Js::from($s->jabatan_sci ?? '') }},
                                                    {{ Js::from($linkedPpbjNumbers) }}
                                                )"
                                                class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                                title="Edit"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg></button>
                                        @else
                                            <button type="button"
                                                onclick="showLockedEditInfo('SP', @js($s->nomor_sp ?? ('SP-' . $s->id)), @js($s->pic ?? '-'))"
                                                class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm transition-colors"
                                                title="Edit hanya bisa dilakukan oleh pembuat SP atau user yang cocok dengan PIC"
                                                aria-label="Info edit terkunci">
                                                <span class="text-[13px] leading-none" aria-hidden="true">🔒</span>
                                            </button>
                                        @endif
                                        <button type="button"
                                            onclick="secureDeleteRecord('SP', @js($s->nomor_sp ?? ('SP-' . $s->id)), @js(route('sp.destroy', $s)))"
                                            class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                            title="Hapus SP dengan password pembuat"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg></button>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr id="emptyRow">
                                <td colspan="10" class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3"><span class="text-5xl">📝</span>
                                        <p class="font-medium">Belum ada data SP</p>
                                        <p class="text-sm">Klik <strong>Tambah SP</strong> untuk memulai</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($sps->hasPages())
                <div
                    class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan
                        {{ $sps->firstItem() }}–{{ $sps->lastItem() }} dari {{ $sps->total() }} data
                    </p>
                    {{ $sps->links() }}
                </div>
            @endif
        </div>
    </div>

    {{-- ═══ MODAL TAMBAH ═══ --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
         <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div class="sp-header-gradient px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">{{ $oracleMode ? 'Tambah SP Oracle' : 'Tambah SP Baru' }}</h2>
            </div>
            <form method="POST" action="{{ route('sp.store') }}" class="p-6 space-y-4" id="addFormSp">
                @csrf
                <input type="hidden" name="oracle_mode" value="{{ $oracleMode ? 1 : 0 }}">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor SP <span
                            class="text-red-500">*</span></label>
                    <div id="suggBoxSp" class="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
                        @if($oracleMode)
                            <span class="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-full px-3 py-1">
                                Mode Oracle: nomor SP diketik manual dari ERP
                            </span>
                        @else
                            <span class="text-xs text-gray-400 italic">Memuat saran...</span>
                        @endif
                    </div>
                    <input type="text" name="nomor_sp" id="nomorSpInput" placeholder="{{ $oracleMode ? 'Ketik nomor SP dari Oracle ERP...' : 'cth: 149/PKU-III/SP/2026' }}"
                        autocomplete="off" required
                        class="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm">
                    <div id="nomorStatusSp" class="mt-1.5 text-xs min-h-[18px] flex items-center gap-1.5"></div>
                    @if($oracleMode)
                        <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2">
                            Peringatan: pastikan nomor sudah sesuai dari Oracle karena sistem tidak membuat nomor otomatis pada mode ini.
                        </p>
                    @endif
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal
                            SP</label>
                        <input type="date" name="tanggal_sp" id="tanggalSpInput" value="{{ date('Y-m-d') }}"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai SP
                            (Rp)</label>
                        <input type="text" name="nilai_sp" id="nilaiSpInput" inputmode="numeric" placeholder="0"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <div id="addModeGuardSp" class="hidden mt-2 text-xs rounded-xl px-3 py-2 border"></div>
                    </div>
                </div>
                @if($oracleMode)
                    <div id="addOracleChecklist" class="rounded-2xl border p-3 shadow-sm"
                        style="background:#111827;border-color:#f59e0b;color:#ffffff;">
                    </div>
                @endif

                {{-- NOMOR PR DENGAN PPBJ DROPDOWN --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor PR <span
                            class="text-xs text-gray-400 font-normal">— Opsional, terhubung PPBJ</span></label>
                    <div class="flex gap-1.5 mb-1.5">
                        <button type="button" id="btnPpbjMode" onclick="setPrMode('ppbj')"
                            class="sp-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                            Pilih PPBJ</button>
                        <button type="button" id="btnManualMode" onclick="setPrMode('manual')"
                            class="sp-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                            Manual</button>
                    </div>
                    <div id="ppbjModeBox">
                        <select id="ppbjSelect" name="nomor_prs[]" multiple class="sp-ppbj-select w-full"
                            data-placeholder="Pilih No. PPBJ yang belum punya SP...">
                        </select>
                        <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Pilih maksimal 20 PPBJ untuk satu paket SP/Kontrak. Nomor pertama menjadi referensi utama.</p>
                    </div>
                    <div id="manualModeBox" class="hidden">
                        <input type="text" id="nomorPrManual" placeholder="Ketik nomor PR manual..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm"
                            autocomplete="off">
                    </div>
                    <input type="hidden" name="nomor_pr" id="nomorPrFinal">
                    <input type="hidden" name="nomor_pr_type" id="nomorPrType" value="ppbj">
                    <input type="hidden" name="vendor_mismatch_confirmed" id="addVendorMismatchConfirmed" value="0">
                    <div id="ppbjInfo"
                        class="hidden mt-1.5 p-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div id="ppbjInfoContent" class="text-xs text-sky-700 dark:text-sky-300 space-y-0.5"></div>
                        </div>
                    </div>
                    <div id="ppbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai PR
                            (Rp)</label>
                        <div id="addNilaiPrBadge" class="hidden mb-1"></div>
                        <input type="text" name="nilai_pr" id="nilaiPrInput" inputmode="numeric" placeholder="0"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">No. SPH <span
                                class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <input type="text" name="sph" id="addSph" placeholder="cth: SPH/2026/001"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl SPH <span
                                class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <input type="date" name="tgl_sph" id="addTglSph"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl Promised Date
                            <span class="text-xs text-gray-400 font-normal">— Batas penyerahan</span></label>
                        <input type="date" name="promised_date" id="addPromisedDate"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                </div>

                {{-- DATA KONTRAK LANJUTAN --}}
                <div class="rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-900/10 p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <h3 class="text-sm font-bold text-blue-700 dark:text-blue-300">Data Kontrak Lanjutan</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Diisi untuk cetak kontrak, pakta integritas, dan jaminan pelaksanaan.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">RFQ</label>
                            <input type="text" name="rfq" id="addRfq" placeholder="Contoh: 0073"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor Pemenang</label>
                            <input type="text" name="nomor_pemenang" id="addNomorPemenang" placeholder="Nomor surat penetapan pemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Pemenang</label>
                            <input type="date" name="tanggal_pemenang" id="addTanggalPemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jampel 5%</label>
                            <input type="text" id="addJampelPreview" readonly placeholder="Otomatis dari Nilai SP + PPN 11% x 5%"
                                class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-emerald-700 dark:text-emerald-400 focus:outline-none text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Awal Kontrak</label>
                            <input type="date" name="awal_kontrak" id="addAwalKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Akhir Kontrak</label>
                            <input type="date" name="akhir_kontrak" id="addAkhirKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bidang IP / ITU</label>
                            <select name="bidang_ip_itu" id="addBidangIpItu"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Bidang --</option>
                                @foreach(($bidangIpItus ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Penandatangan SCI</label>
                            <select name="penandatangan_sci" id="addPenandatanganSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Penandatangan --</option>
                                @foreach(($penandatanganScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan SCI</label>
                            <select name="jabatan_sci" id="addJabatanSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Jabatan --</option>
                                @foreach(($jabatanScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Vendor <span
                            class="text-red-500">*</span></label>
                    <select name="nama_vendor" id="vendorSelectSp" required class="vendor-select-sp w-full">
                        <option value="">-- Pilih Vendor --</option>
                    </select>
                    <div id="addSpphVendorRecommendation" class="hidden mt-2"></div>
                    <div class="mt-2">
                        <button type="button" id="toggleNewVendorSp"
                            class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition">
                            🏢 Tambah detail vendor baru
                        </button>
                    </div>
                    <div id="newVendorBoxSp"
                        class="hidden mt-3 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-4 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">🏢 Data Vendor Baru</span>
                            <button type="button" onclick="cancelNewVendor()"
                                class="text-xs text-gray-500 dark:text-gray-300 hover:text-red-500 transition">✕ Batal</button>
                        </div>
                        <div><label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Nama Vendor
                                <span class="text-red-500">*</span></label><input type="text" id="newVendorNama"
                                placeholder="PT. Nama Vendor..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                        </div>
                        <div><label
                                class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Alamat</label><textarea
                                id="newVendorAlamat" rows="2" placeholder="Jl. Contoh No. 1, Kota..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Telepon</label><input
                                    type="text" id="newVendorTelp" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Fax</label><input
                                    type="text" id="newVendorFax" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email</label><input
                                    type="email" id="newVendorEmail" placeholder="vendor@email.com"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">NPWP</label><input
                                    type="text" id="newVendorNpwp" placeholder="00.000.000.0-000.000"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Direktur / Penanggung Jawab</label><input
                                    type="text" id="newVendorDirektur" placeholder="Nama direktur..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Jabatan</label><input
                                    type="text" id="newVendorJabatan" placeholder="Direktur / Ketua / Owner..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <p class="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2">
                            Data NPWP, direktur, dan jabatan akan dipakai otomatis saat cetak kontrak/SP di atas Rp50 juta agar dokumen tidak banyak titik-titik kosong.
                        </p>
                        <div id="newVendorChecklistSp" class="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-3 py-2 text-[11px] text-sky-800 dark:text-sky-200">
                            <div class="font-black mb-1">🧭 Checklist profil vendor</div>
                            <div class="grid grid-cols-2 gap-1" data-vendor-checklist-items>
                                <span>○ Nama wajib</span><span>○ Kontak</span><span>○ NPWP</span><span>○ Penanggung jawab</span>
                            </div>
                        </div>
                        <div id="newVendorStatus" class="hidden text-xs px-3 py-2 rounded-lg"></div>
                        <button type="button" onclick="saveNewVendor()"
                            class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"><span
                                id="newVendorBtnText">💾 Simpan Vendor</span><svg id="newVendorSpinner"
                                class="hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg></button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Pengadaan
                        <span class="text-red-500">*</span></label>
                    <div id="addDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="addDeskripsi" rows="3" required
                        placeholder="Masukkan deskripsi pengadaan..."
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">PIC <span
                            class="text-red-500">*</span></label>
                    <select name="pic" required class="pic-select-sp w-full">
                        <option value="">-- Pilih PIC --</option>@foreach($pics as $picItem)<option value="{{ $picItem }}">
                            {{ $picItem }}
                        </option>@endforeach
                    </select>
                </div>
                {{-- ═══ SECTION ITEMS (TAMBAH) ═══ --}}
                <div class="items-section" style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
                    <div class="items-header"
                        style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                        <label
                            style="font-size: .78rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px;">
                            <span>📋</span> Daftar Barang / Jasa
                        </label>
                        <span id="addItemCount" style="font-size: .65rem; color: #94a3b8;">0 item</span>
                    </div>

                    <div id="addRows" class="space-y-0"></div>

                    <!-- Subtotal Display -->
                    <div id="addSubtotalDisplay" class="subtotal-display" style="display: none;">
                        <span class="subtotal-label">💰 Total Barang:</span>
                        <span id="addSubtotalValue" class="subtotal-value">Rp 0</span>
                    </div>

                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('add', null, true)" class="btn-add-row"
                            style="background: linear-gradient(135deg, #0ea5e9, #6366f1);">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Barang
                        </button>
                    </div>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('addModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl sp-header-gradient text-white font-bold hover:opacity-90 shadow-lg shadow-blue-500/30">💾
                        Simpan SP</button>
                </div>
            </form>
        </div>
    </div>

    {{-- ═══ MODAL EDIT ═══ --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Edit Data SP</h2>
            </div>
            <form method="POST" id="editFormSp" class="p-6 space-y-4">
                @csrf @method('PUT')
                <input type="hidden" id="editIdSp" value="">
                <input type="hidden" name="oracle_mode" value="{{ $oracleMode ? 1 : 0 }}">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor SP <span
                            class="text-red-500">*</span></label>
                    <input type="text" name="nomor_sp" id="editNomorSp" autocomplete="off" required
                        class="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm">
                    <div id="editNomorStatusSp" class="mt-1.5 text-xs min-h-[18px] flex items-center gap-1.5"></div>
                    @if($oracleMode)
                        <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2">
                            Mode Oracle aktif: nomor SP manual tidak akan disesuaikan otomatis berdasarkan bulan tanggal SP.
                        </p>
                    @endif
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal
                            SP</label><input type="date" name="tanggal_sp" id="editTanggalSp"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai SP
                            (Rp)</label><input type="text" name="nilai_sp" id="editNilaiSp" inputmode="numeric"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <div id="editModeGuardSp" class="hidden mt-2 text-xs rounded-xl px-3 py-2 border"></div>
                    </div>
                </div>
                @if($oracleMode)
                    <div id="editOracleChecklist" class="rounded-2xl border p-3 shadow-sm"
                        style="background:#111827;border-color:#f59e0b;color:#ffffff;">
                    </div>
                @endif
                {{-- NOMOR PR EDIT --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor PR <span
                            class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                    <div class="flex gap-1.5 mb-1.5">
                        <button type="button" id="editBtnPpbjMode" onclick="setEditPrMode('ppbj')"
                            class="sp-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                            Pilih PPBJ</button>
                        <button type="button" id="editBtnManualMode" onclick="setEditPrMode('manual')"
                            class="sp-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                            Manual</button>
                    </div>
                    <div id="editPpbjModeBox">
                        <select id="editPpbjSelect" name="nomor_prs[]" multiple class="edit-sp-ppbj-select w-full" data-placeholder="Pilih No. PPBJ...">
                        </select>
                        <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Pilih maksimal 20 PPBJ. Setiap PPBJ hanya boleh terhubung ke satu SP.</p>
                    </div>
                    <div id="editManualModeBox" class="hidden">
                        <input type="text" id="editNomorPrManual" placeholder="Ketik nomor PR manual..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm"
                            autocomplete="off">
                    </div>
                    <input type="hidden" name="nomor_pr" id="editNomorPrFinal">
                    <input type="hidden" name="nomor_pr_type" id="editNomorPrType" value="ppbj">
                    <input type="hidden" name="vendor_mismatch_confirmed" id="editVendorMismatchConfirmed" value="0">
                    <div id="editPpbjInfo"
                        class="hidden mt-1.5 p-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div id="editPpbjInfoContent" class="text-xs text-sky-700 dark:text-sky-300 space-y-0.5"></div>
                        </div>
                    </div>
                    <div id="editPpbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai PR
                            (Rp)</label>
                        <div id="editNilaiPrBadge" class="hidden mb-1"></div><input type="text" name="nilai_pr"
                            id="editNilaiPr" inputmode="numeric"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">No.
                            SPH</label><input type="text" name="sph" id="editSph" placeholder="cth: SPH/2026/001"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl
                            SPH</label><input type="date" name="tgl_sph" id="editTglSph"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl Promised
                            Date</label><input type="date" name="promised_date" id="editPromisedDate"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                </div>

                {{-- DATA KONTRAK LANJUTAN --}}
                <div class="rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-900/10 p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <h3 class="text-sm font-bold text-amber-700 dark:text-amber-300">Data Kontrak Lanjutan</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Diisi untuk cetak kontrak, pakta integritas, dan jaminan pelaksanaan.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">RFQ</label>
                            <input type="text" name="rfq" id="editRfq" placeholder="Contoh: 0073"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor Pemenang</label>
                            <input type="text" name="nomor_pemenang" id="editNomorPemenang" placeholder="Nomor surat penetapan pemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Pemenang</label>
                            <input type="date" name="tanggal_pemenang" id="editTanggalPemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jampel 5%</label>
                            <input type="text" id="editJampelPreview" readonly placeholder="Otomatis dari Nilai SP + PPN 11% x 5%"
                                class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-emerald-700 dark:text-emerald-400 focus:outline-none text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Awal Kontrak</label>
                            <input type="date" name="awal_kontrak" id="editAwalKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Akhir Kontrak</label>
                            <input type="date" name="akhir_kontrak" id="editAkhirKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bidang IP / ITU</label>
                            <select name="bidang_ip_itu" id="editBidangIpItu"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Bidang --</option>
                                @foreach(($bidangIpItus ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Penandatangan SCI</label>
                            <select name="penandatangan_sci" id="editPenandatanganSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Penandatangan --</option>
                                @foreach(($penandatanganScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan SCI</label>
                            <select name="jabatan_sci" id="editJabatanSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Jabatan --</option>
                                @foreach(($jabatanScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Vendor <span
                            class="text-red-500">*</span></label>
                    <select name="nama_vendor" id="editVendorSp" required class="edit-vendor-sp w-full">
                        <option value="">-- Pilih Vendor --</option>
                    </select>
                    <div id="editSpphVendorRecommendation" class="hidden mt-2"></div>
                </div>
                <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Pengadaan
                        <span class="text-red-500">*</span></label>
                    <div id="editDeskripsiBadge" class="hidden mb-1"></div><textarea name="deskripsi_pengadaan"
                        id="editDeskripsiSp" rows="3" required
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none text-sm"></textarea>
                </div>
                <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">PIC <span
                            class="text-red-500">*</span></label><select name="pic" id="editPicSp" required
                        class="edit-pic-sp w-full">
                        <option value="">-- Pilih PIC --</option>@foreach($pics as $picItem)<option value="{{ $picItem }}">
                            {{ $picItem }}
                        </option>@endforeach
                    </select></div>
                {{-- ═══ SECTION ITEMS (EDIT) ═══ --}}
                <div class="items-section" style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
                    <div class="items-header"
                        style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                        <label
                            style="font-size: .78rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px;">
                            <span>📋</span> Daftar Barang / Jasa
                        </label>
                        <span id="editItemCount" style="font-size: .65rem; color: #94a3b8;">0 item</span>
                    </div>

                    <div id="editRows" class="space-y-0">
                        <div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>
                    </div>

                    <!-- Subtotal Display -->
                    <div id="editSubtotalDisplay" class="subtotal-display" style="display: none;">
                        <span class="subtotal-label">💰 Total Barang:</span>
                        <span id="editSubtotalValue" class="subtotal-value">Rp 0</span>
                    </div>

                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('edit', null, true)" class="btn-add-row"
                            style="background: linear-gradient(135deg, #f59e0b, #ea580c);">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Barang
                        </button>
                    </div>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('editModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90 shadow-lg shadow-amber-500/30">💾
                        Update SP</button>
                </div>
            </form>
        </div>
    </div>
    {{-- ════════════════════════════════════════════════════════════════
    ONBOARDING TUTORIAL — SP
    ════════════════════════════════════════════════════════════════ --}}
    <div id="onboardingPopup" class="onboarding-overlay" style="display:none;">
        <div class="onboarding-card">

            {{-- ── STEP 1: Welcome ── --}}
            <div class="ob-step active" data-step="1">
                <div class="ob-header" style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#8b5cf6 100%)">
                    <div class="ob-badge">✨ Pembaruan Fitur</div>
                    <div class="ob-icon-wrap">🚀</div>
                    <div class="ob-title">SP Management Lebih Cerdas</div>
                    <div class="ob-subtitle">Input SP sekarang terhubung langsung dengan PPBJ Management</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot active" data-dot="1"></div>
                    <div class="ob-progress-dot" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num">1</span> Apa yang baru?</div>
                    <div class="ob-desc">
                        Tidak perlu lagi <strong>update PPBJ manual</strong>! Sekarang saat SP disimpan, sistem otomatis
                        mengisi data di PPBJ Management dan <strong>progress langsung naik</strong>.
                    </div>
                    <div class="ob-features">
                        <div class="ob-feature"><span class="ob-feature-icon">📋</span><span class="ob-feature-text">Pilih
                                PPBJ langsung dari dropdown</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">✍️</span><span
                                class="ob-feature-text">Deskripsi & Nilai PR otomatis terisi dari PPBJ</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">🔗</span><span class="ob-feature-text">7 field
                                PPBJ otomatis ter-update</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">📊</span><span
                                class="ob-feature-text">Progress loncat ke 60% & 80%</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">🖨️</span><span class="ob-feature-text">Cetak
                                DOCX lengkap + kop surat</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">💰</span><span class="ob-feature-text">PPN 11%
                                & terbilang otomatis</span></div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="closeOnboarding()">Lewati</button>
                    <button class="ob-btn-next" onclick="nextObStep(2)">Lihat Cara Pakai <svg fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 2: Pilih PPBJ ── --}}
            <div class="ob-step" data-step="2">
                <div class="ob-header" style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)">
                    <div class="ob-badge">📋 Langkah 1</div>
                    <div class="ob-icon-wrap">🔍</div>
                    <div class="ob-title">Pilih PPBJ dari Dropdown</div>
                    <div class="ob-subtitle">Hanya muncul PPBJ yang belum terhubung dengan SP manapun</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot active" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num">2</span> Pilih Nomor PR</div>
                    <div class="ob-desc">Klik dropdown <strong>"Nomor PR"</strong>, pilih PPBJ yang tersedia. Sistem hanya
                        menampilkan PPBJ yang <strong>belum punya SP</strong>. <strong>Deskripsi pengadaan</strong> dan
                        <strong>Nilai PR</strong> akan otomatis terisi dari data PPBJ.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Modal Tambah SP</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select highlight">
                                <svg width="14" height="14" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono">045/PKU-III/PPBJ/2026</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-select">
                                <svg width="14" height="14" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono" style="color:#94a3b8">046/PKU-III/PPBJ/2026</div>
                                    <div class="ob-sub">ATK dan Perlengkapan</div>
                                </div>
                            </div>
                            <div class="ob-demo-arrow">↓ Auto-fill dari PPBJ</div>
                            <div class="ob-demo-grid" style="gap:6px;">
                                <div class="ob-demo-field" style="flex:2;">
                                    <div class="ob-demo-field-label">Deskripsi Pengadaan</div>
                                    <div style="font-size:9px;color:#374151;line-height:1.4;" class="dark:text-gray-300">
                                        Pengadaan Laptop Kantor untuk divisi IT...</div>
                                </div>
                                <div class="ob-demo-field" style="flex:1;">
                                    <div class="ob-demo-field-label">Nilai PR</div>
                                    <div class="ob-demo-field-value">Rp 122.121.212</div>
                                </div>
                            </div>
                            <div style="display:flex;justify-content:flex-end;margin-top:4px;">
                                <span
                                    style="display:inline-flex;align-items:center;gap:3px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:99px;padding:2px 8px;font-size:7px;font-weight:700;color:#16a34a;">✨
                                    2 field auto-terisi</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(1)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="nextObStep(3)">Selanjutnya <svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 3: Auto-link & Progress ── --}}
            <div class="ob-step" data-step="3">
                <div class="ob-header" style="background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%)">
                    <div class="ob-badge">🔗 Langkah 2</div>
                    <div class="ob-icon-wrap">🔗</div>
                    <div class="ob-title">Simpan Sekali, PPBJ Auto-Update!</div>
                    <div class="ob-subtitle">7 field terisi otomatis + progress PPBJ langsung naik</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot active" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num" style="background:#22c55e">3</span> Yang terjadi
                        saat Simpan</div>
                    <div class="ob-desc">Klik <strong>"💾 Simpan SP"</strong>, lalu lihat halaman PPBJ — semua field sudah
                        terisi dan <strong>progress bar langsung loncat</strong> dari 40% ke 80%!</div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Field yang otomatis ter-update di PPBJ</div>
                        <div class="ob-demo-content" style="display:flex;flex-direction:column;gap:6px;">
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">150/PKU-V/SP/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← Awarding SP</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">07/05/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← Tgl SPK</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span class="ob-field-new">Rp
                                    122.121.212</span> <span style="font-size:7px;color:#6b7280;font-weight:600">← Nilai
                                    SP-SPK</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">099/PKU-II/KOPKAR/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← No. SPH</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span class="ob-field-new">17 Juni
                                    2026</span> <span style="font-size:7px;color:#6b7280;font-weight:600">← Promised
                                    Date</span></div>
                        </div>
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Progress PPBJ otomatis naik</div>
                        <div class="ob-demo-content">
                            <div class="ob-progress-demo">
                                <div class="ob-progress-bar-track">
                                    <div class="ob-progress-bar-fill ob-progress-jump"
                                        style="width:80%;background:linear-gradient(90deg,#22c55e,#16a34a)">
                                        <span class="bar-label">80%</span>
                                    </div>
                                </div>
                                <div class="ob-progress-steps">
                                    <span class="ps-done">✓ SPPH</span>
                                    <span class="ps-done">✓ SPH</span>
                                    <span class="ps-done">✓ Awarding</span>
                                    <span class="ps-active">✓ SPK</span>
                                    <span>BPG</span>
                                    <span>Invoice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(2)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="nextObStep(4)"
                        style="background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 4px 14px rgba(34,197,94,.4)">Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 4: Cetak SP ── --}}
            <div class="ob-step" data-step="4">
                <div class="ob-header" style="background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)">
                    <div class="ob-badge">🖨️ Langkah 3</div>
                    <div class="ob-icon-wrap">📄</div>
                    <div class="ob-title">Cetak Dokumen SP (DOCX)</div>
                    <div class="ob-subtitle">Dokumen lengkap dengan kop surat, tabel, PPN, dan terbilang</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot done" data-dot="3"></div>
                    <div class="ob-progress-dot active" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label" style="color:#f59e0b"><span class="ob-step-num"
                            style="background:#f59e0b">4</span> Klik ikon cetak di tabel</div>
                    <div class="ob-desc">Klik tombol <strong>🖨️</strong> di kolom Aksi, sistem generate file
                        <strong>.docx</strong> lengkap dengan kop surat, tabel pengadaan, perhitungan <strong>PPN
                            11%</strong>, dan <strong>terbilang</strong> dalam bahasa Indonesia.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Dokumen SP yang dihasilkan</div>
                        <div class="ob-demo-content">
                            <div class="ob-docx-preview">
                                <div class="ob-docx-kop"></div>
                                <div class="ob-docx-body">
                                    <div style="text-align:center;font-size:10px;font-weight:800;margin-bottom:2px;">SURAT
                                        PESANAN</div>
                                    <div class="ob-docx-line short"></div>
                                    <div style="display:flex;gap:4px;font-size:7px;margin-bottom:4px;">
                                        <span style="color:#6b7280">Nomor:</span>
                                        <span
                                            style="font-family:'Courier New',monospace;font-weight:700;color:#111827">150/PKU-V/SP/2026</span>
                                    </div>
                                    <div style="font-size:7px;color:#374151;margin-bottom:6px;">Kepada Yth. <strong>PT.
                                            Contoh Vendor</strong></div>
                                    <div class="ob-docx-table">
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell header num">No</div>
                                            <div class="ob-docx-table-cell header name">Nama Barang</div>
                                            <div class="ob-docx-table-cell header price">Jumlah</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num">1</div>
                                            <div class="ob-docx-table-cell name" style="font-weight:700">Pengadaan Laptop
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 122.121.212</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;color:#6b7280">Jumlah
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 122.121.212</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;color:#6b7280">PPN 11%
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 13.433.333</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;font-weight:800">TOTAL
                                            </div>
                                            <div class="ob-docx-table-cell price" style="font-weight:800;font-size:8px">Rp
                                                135.554.545</div>
                                        </div>
                                    </div>
                                    <div class="ob-docx-highlight">✨ Terbilang: "Seratus Tiga Puluh Lima Juta Lima Ratus
                                        Empat Puluh Lima Ribu Lima Ratus Empat Puluh Lima Rupiah"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(3)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="finishOnboarding()"
                        style="background:linear-gradient(135deg,#f59e0b,#ea580c);box-shadow:0 4px 14px rgba(245,158,11,.4)">🎉
                        Mulai Gunakan!</button>
                </div>
            </div>

        </div>
    </div>

    {{-- Floating Button --}}
    <button id="onboardingFloatBtn" class="ob-float-btn" style="display:none" onclick="showOnboarding()">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="ob-float-tooltip">Lihat Pembaruan SP</span>
    </button>
@endsection

@push('scripts')
    @php
        $spPageConfig = [
            'satuans' => $satuans,
            'satuanStoreUrl' => route('satuan.store'),
            'checkUrl' => route('sp.check-nomor'),
            'suggestUrl' => route('sp.suggest-nomor'),
            'pollUrl' => route('sp.poll'),
            'presenceUrl' => route('sp.presence'),
            'presenceStartUrl' => route('sp.presence.start'),
            'presenceStopUrl' => route('sp.presence.stop'),
            'ppbjOptionsUrl' => route('sp.ppbj-options'),
            'ppbjCheckUrl' => route('sp.check-ppbj'),
            'vendorSearchUrl' => route('vendor.search'),
            'vendorStoreUrl' => route('vendor.store'),
            'oracleMode' => $oracleMode,
            'autoUrl' => $normalSpUrl,
            'oracleUrl' => $oracleSpUrl,
            'lastId' => $sps->count() > 0 ? $sps->max('id') : 0,
            'firstPage' => $sps->onFirstPage(),
            'hasFilter' => (bool) (($search ?? '') || ($pic ?? '') || ($dari ?? '') || ($sampai ?? '') || $oracleMode),
            'csrfToken' => csrf_token(),
        ];
    @endphp
    <script>
        window.SP_PAGE_CONFIG = @json($spPageConfig);
    </script>
    <script src="{{ asset('assets/sp/sp.js') }}?v=20260819a" defer></script>
@endpush

@include('components.archive-upload-popup')
