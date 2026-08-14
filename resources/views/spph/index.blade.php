@extends('layouts.app')

@section('title', 'Penomoran SPPH')

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/spph/spph.css') }}?v=20260814a">
@endpush

@section('content')
    <div class="space-y-6">

        {{-- ── HEADER ─────────────────────────────────────────────── --}}
        <div
            class="spph-header-gradient rounded-2xl p-6 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <span class="text-3xl">📋</span>
                        <h1 class="text-2xl font-bold tracking-tight">Penomoran SPPH</h1>
                    </div>
                    <p class="text-purple-100 text-sm">Surat Permintaan Penawaran Harga</p>
                    <div class="flex items-center gap-2 mt-3 flex-wrap">
                        <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">Total: <span
                                id="totalCount">{{ $spphs->total() }}</span> Data</span>
                        @if($lastNomor)
                            <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium font-mono">Terakhir:
                                {{ $lastNomor }}</span>
                        @endif
                        <span class="flex items-center text-xs bg-green-400/20 rounded-full px-3 py-1"><span
                                class="live-dot"></span> Live</span>
                    </div>
                </div>
                <div class="flex items-center gap-2.5 shrink-0">
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
                    <button onclick="openAddModal()"
                        class="flex items-center gap-2 bg-white text-purple-700 font-bold px-5 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg shadow-black/20 whitespace-nowrap group">
                        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah SPPH
                    </button>
                </div>
            </div>
        </div>

        {{-- ── PRESENCE ─────────────────────────────────────────────── --}}
        <div id="presenceBar" class="hidden">
            <div
                class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span class="relative flex h-2.5 w-2.5">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span id="presenceText" class="text-xs font-semibold text-amber-700 dark:text-amber-400"></span>
            </div>
        </div>

        {{-- ── ALERTS ──────────────────────────────────────────────── --}}
        @if(session('success'))
            <div
                class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ session('success') }}</span>
                <button onclick="this.closest('div').remove()" class="ml-auto text-green-500 hover:text-green-700">✕</button>
            </div>
        @endif
        @if($errors->any())
            <div
                class="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                <ul class="text-sm">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
            </div>
        @endif

        {{-- ── FILTER BAR ──────────────────────────────────────────── --}}
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
                        placeholder="Cari nomor SPPH, nomor PR, vendor, deskripsi..."
                        class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                    <span id="searchSpinner" class="absolute right-3 top-1/2 -translate-y-1/2 hidden">
                        <svg class="w-4 h-4 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </span>
                </div>
                <select id="filterPic"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm min-w-[140px]">
                    <option value="">Semua PIC</option>
                    @foreach($pics as $p)<option value="{{ $p }}" {{ (isset($pic) && $pic === $p) ? 'selected' : '' }}>
                        {{ $p }}
                    </option>@endforeach
                </select>
                <select id="filterVendor"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm min-w-[190px]">
                    <option value="">Semua Vendor</option>
                    @foreach($vendors as $v)
                        <option value="{{ $v->nama_vendor }}" {{ (isset($vendorFilter) && $vendorFilter === $v->nama_vendor) ? 'selected' : '' }}>
                            {{ $v->nama_vendor }}
                        </option>
                    @endforeach
                </select>
                <input type="date" id="dariInput" value="{{ $dari ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <input type="date" id="sampaiInput" value="{{ $sampai ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <button onclick="doExport()"
                    class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold text-sm whitespace-nowrap"
                    title="Export CSV">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>Export
                </button>
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
                        class="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-mono">"{{ $search }}"
                    <button onclick="clearSearch()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($pic)<span
                        class="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">PIC:
                    {{ $pic }} <button onclick="clearPic()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($vendorFilter)<span
                        class="inline-flex items-center gap-1 text-xs bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">Vendor:
                    {{ $vendorFilter }} <button onclick="clearVendor()" class="hover:text-red-500 ml-0.5">x</button></span>@endif
                    @if($dari || $sampai)<span
                        class="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">📅
                        {{ ($dari ? \Carbon\Carbon::parse($dari)->format('d/m/Y') : '...') }} –
                        {{ ($sampai ? \Carbon\Carbon::parse($sampai)->format('d/m/Y') : '...') }} <button
                    onclick="clearDate()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                </div>
            </div>
        </div>

        {{-- ── TABLE ───────────────────────────────────────────────── --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-10">
                                #</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[190px]">
                                Nomor SPPH</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[100px]">
                                Tanggal</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[160px]">
                                Nomor PR</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[180px]">
                                Nama Vendor</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Deskripsi</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-20">
                                PIC</th>
                            <th
                                class="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-[260px] min-w-[240px]">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="spphBody" class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($spphs as $i => $s)
                            @php
                                $vendorList = $s->print_vendor_names;
                                $canEditSpph = (filled($s->created_by_user_id) && (int) $s->created_by_user_id === (int) auth()->id()) || auth()->user()?->matchesOwnerLabel($s->pic);
                            @endphp
                            <tr class="tbl-row-hover" data-id="{{ $s->id }}" data-pic="{{ $s->pic }}"
                                data-search="{{ strtolower($s->nomor_spph . ' ' . $s->nomor_pr . ' ' . implode(' ', $vendorList) . ' ' . $s->deskripsi_pengadaan) }}">
                                <td class="px-4 py-3 text-gray-400 text-xs font-mono">{{ $spphs->firstItem() + $i }}</td>
                                <td class="px-4 py-3"><span
                                        class="badge-nomor inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                        title="Klik untuk salin">{{ $s->nomor_spph }}</span></td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                                    {{ $s->tanggal?->format('d/m/Y') ?? '-' }}
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                                    {{ $s->nomor_pr ?? '-' }}
                                </td>
                                <td class="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">
                                    <div class="flex flex-wrap gap-1">
                                        @if(count($vendorList) > 1)
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-semibold">
                                                {{ count($vendorList) }} vendor
                                            </span>
                                        @endif
                                        @foreach($vendorList as $vendorName)
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                                                {{ $vendorName }}
                                            </span>
                                        @endforeach
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate"
                                    title="{{ $s->deskripsi_pengadaan }}">{{ $s->deskripsi_pengadaan }}</td>
                                <td class="px-4 py-3"><span
                                        class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">{{ $s->pic }}</span>
                                </td>
                                <td class="px-4 py-3 w-[260px] min-w-[240px]">
                                    <div class="flex flex-wrap items-center justify-center gap-1.5 max-w-[250px] mx-auto">
                                        <button type="button" onclick="shareRecordToChat('spph', {{ $s->id }})"
                                            class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                            title="Bagikan SPPH ke Chat Tim" aria-label="Bagikan SPPH ke Chat Tim">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8m-8 4h5m8-2a8 8 0 01-8 8 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.1A8 8 0 1119 17.2" />
                                            </svg>
                                        </button>
                                        <button type="button"
                                            onclick="openArchiveAttachmentUpload({
                                                module: 'SPPH',
                                                nomor: @js($s->nomor_spph ?? ('SPPH-' . $s->id)),
                                                nomor_pr: @js($s->nomor_pr ?? ''),
                                                vendor: @js(implode(', ', $vendorList)),
                                                url: @js(route('spph.archive-attachment', $s))
                                            })"
                                            class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30 transition-colors"
                                            title="Upload lampiran SPPH ke Sistem Arsip" aria-label="Upload lampiran SPPH ke Sistem Arsip">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.657-5.657L5.757 10.757a6 6 0 108.486 8.486L20.5 12.986" />
                                            </svg>
                                        </button>
                                        <a href="{{ route('spph.cetak.preview', ['spph' => $s, 'vendor' => $vendorList[0] ?? $s->nama_vendor]) }}" target="_blank"
                                            onclick="event.preventDefault(); openSpphPrint(this.href);"
                                            class="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                                            title="Preview & simpan SPPH vendor utama">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                        </a>
                                        @if(count($vendorList) > 1)
                                            <a href="{{ route('spph.cetak-semua-vendor.preview', $s) }}" target="_blank"
                                                onclick="event.preventDefault(); openSpphPrint(this.href);"
                                                class="px-2 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                                                title="Preview & simpan semua vendor sekaligus dalam ZIP">
                                                ZIP
                                            </a>
                                            <select onchange="openSpphSelectedVendor(this);"
                                                class="w-[150px] sm:w-[170px] max-w-full text-[11px] rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-200 px-2 py-1.5 truncate"
                                                style="width: 170px; max-width: 170px;"
                                                title="Cetak SPPH per vendor">
                                                <option value="">Cetak vendor...</option>
                                                @foreach($vendorList as $vendorName)
                                                    <option value="{{ route('spph.cetak.preview', ['spph' => $s, 'vendor' => $vendorName]) }}">{{ $vendorName }}</option>
                                                @endforeach
                                            </select>
                                        @endif
                                        @if($canEditSpph)
                                            <button
                                                onclick="openEditModal({{ $s->id }}, @js($s->nomor_spph), @js($s->tanggal?->format('Y-m-d')), @js($s->nomor_pr ?? ''), @js($vendorList), @js($s->deskripsi_pengadaan), @js($s->pic))"
                                                class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                                title="Edit">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        @else
                                            <button type="button"
                                                onclick="showLockedEditInfo('SPPH', @js($s->nomor_spph ?? ('SPPH-' . $s->id)), @js($s->pic ?? '-'))"
                                                class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm transition-colors"
                                                title="Edit hanya bisa dilakukan oleh pembuat SPPH atau user yang cocok dengan PIC"
                                                aria-label="Info edit terkunci">
                                                <span class="text-[13px] leading-none" aria-hidden="true">🔒</span>
                                            </button>
                                        @endif
                                        <button type="button"
                                            onclick="secureDeleteRecord('SPPH', @js($s->nomor_spph ?? ('SPPH-' . $s->id)), @js(route('spph.destroy', $s)))"
                                            class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                            title="Hapus SPPH dengan password pembuat">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr id="emptyRow">
                                <td colspan="8" class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3"><span class="text-5xl">📋</span>
                                        <p class="font-medium">Belum ada data SPPH</p>
                                        <p class="text-sm">Klik <strong>Tambah SPPH</strong> untuk memulai</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($spphs->hasPages())
                <div
                    class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan
                        {{ $spphs->firstItem() }}–{{ $spphs->lastItem() }} dari {{ $spphs->total() }} data
                    </p>
                    {{ $spphs->links() }}
                </div>
            @endif
        </div>
    </div>

    {{-- ════════════════════════════════════════════════════════════════
    MODAL TAMBAH
    ════════════════════════════════════════════════════════════════ --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="modal-box">
            <div class="modal-head spph-header-gradient">
                <h2>Tambah SPPH Baru</h2>
            </div>
            <form method="POST" action="{{ route('spph.store') }}" class="modal-body" id="addForm">
                @csrf
                <div class="form-group">
                    <label>Nomor SPPH <span class="text-red-500">*</span></label>
                    <div id="suggBox" class="flex flex-wrap gap-1.5 mb-1.5 min-h-[20px]"><span
                            class="text-xs text-gray-400 italic">Memuat saran...</span></div>
                    <input type="text" name="nomor_spph" id="nomorSpphInput" placeholder="cth: 128/PKU-III/SPPH/2026"
                        autocomplete="off" required class="m-input mono" style="border-width:2px">
                    <div id="nomorStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tanggal <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal" id="tanggalSpphInput" value="{{ date('Y-m-d') }}" required class="m-input">
                    </div>
                    <div class="form-group">
                        <label>Nomor PR <span class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <div class="flex gap-1.5 mb-1.5">
                            <button type="button" id="btnPpbjMode" onclick="setPrMode('ppbj')"
                                class="pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                                Pilih PPBJ</button>
                            <button type="button" id="btnManualMode" onclick="setPrMode('manual')"
                                class="pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                                Manual</button>
                        </div>
                        {{-- ❌ HAPUS name="nomor_pr" dari select --}}
                        <div id="ppbjModeBox">
                            <select id="ppbjSelect" class="ppbj-select w-full"
                                data-placeholder="Pilih No. PPBJ yang belum punya SPPH...">
                                <option value=""></option>
                            </select>
                        </div>
                        {{-- ❌ HAPUS name dari input manual --}}
                        <div id="manualModeBox" class="hidden">
                            <input type="text" id="nomorPrManual" placeholder="Ketik nomor PR manual, cth: PR/2026/001"
                                class="m-input mono" autocomplete="off">
                        </div>
                        {{-- ✅ HANYA hidden field ini yang punya name --}}
                        <input type="hidden" name="nomor_pr" id="nomorPrFinal">
                        <input type="hidden" name="nomor_pr_type" id="nomorPrType" value="ppbj">
                        <div id="ppbjInfo"
                            class="hidden mt-1.5 p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                            <div class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div id="ppbjInfoContent" class="text-xs text-indigo-700 dark:text-indigo-300 space-y-0.5">
                                </div>
                            </div>
                        </div>
                        <div id="ppbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Nama Vendor <span class="text-red-500">*</span></label>
                    <select name="vendor_names[]" id="vendorSelect" required multiple class="vendor-select w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)<option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                        <option value="__tambah__">➕ Tambah Vendor Baru...</option>
                    </select>
                    <div id="vendorUsagePanel" class="vendor-usage-panel hidden"></div>
                    <div class="mt-2">
                        <button type="button" id="toggleNewVendorSpph"
                            class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition">
                            🏢 Tambah detail vendor baru
                        </button>
                    </div>
                    <div id="newVendorBoxSpph"
                        class="hidden mt-3 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-4 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">🏢 Data Vendor Baru</span>
                            <button type="button" onclick="cancelNewVendorSpph()"
                                class="text-xs text-gray-500 dark:text-gray-300 hover:text-red-500 transition">✕ Batal</button>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Nama Vendor <span class="text-red-500">*</span></label>
                            <input type="text" id="newSpphVendorNama" placeholder="PT. Nama Vendor..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Alamat</label>
                            <textarea id="newSpphVendorAlamat" rows="2" placeholder="Jl. Contoh No. 1, Kota..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Telepon</label>
                                <input type="text" id="newSpphVendorTelp" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Fax</label>
                                <input type="text" id="newSpphVendorFax" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Email</label>
                                <input type="email" id="newSpphVendorEmail" placeholder="vendor@email.com"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">NPWP</label>
                                <input type="text" id="newSpphVendorNpwp" placeholder="00.000.000.0-000.000"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Direktur / Penanggung Jawab</label>
                                <input type="text" id="newSpphVendorDirektur" placeholder="Nama direktur..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Jabatan</label>
                                <input type="text" id="newSpphVendorJabatan" placeholder="Direktur / Ketua / Owner..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <p class="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2">
                            Data lengkap vendor akan tersimpan ke master vendor dan otomatis bisa dipakai saat cetak SPPH/SP/kontrak.
                        </p>
                        <div id="newSpphVendorChecklist" class="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-3 py-2 text-[11px] text-sky-800 dark:text-sky-200">
                            <div class="font-black mb-1">🧭 Checklist profil vendor</div>
                            <div class="grid grid-cols-2 gap-1" data-vendor-checklist-items>
                                <span>○ Nama wajib</span><span>○ Kontak</span><span>○ NPWP</span><span>○ Penanggung jawab</span>
                            </div>
                        </div>
                        <div id="newSpphVendorStatus" class="hidden text-xs px-3 py-2 rounded-lg"></div>
                        <button type="button" onclick="saveNewVendorSpph()"
                            class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition">
                            <span id="newSpphVendorBtnText">💾 Simpan Vendor</span>
                            <svg id="newSpphVendorSpinner" class="hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Deskripsi Pengadaan <span class="text-red-500">*</span></label>
                    <div id="addDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="addDeskripsi" rows="2" required
                        placeholder="Masukkan deskripsi pengadaan..." class="m-textarea"></textarea>
                </div>

                <div class="form-group">
                    <label>PIC <span class="text-red-500">*</span></label>
                    <select name="pic" required class="pic-select w-full">
                        <option value="">-- Pilih PIC --</option>
                        @foreach($pics as $picItem)<option value="{{ $picItem }}">{{ $picItem }}</option>@endforeach
                    </select>
                </div>

                <div class="items-section">
                    <div class="items-header">
                        <label><span>📋</span> Daftar Barang / Jasa</label>
                    </div>
                    <div id="addRows" class="space-y-0"></div>
                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('add')" class="btn-add-row" style="background:#6366f1"><svg
                                class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>Tambah Barang</button>
                    </div>
                </div>

                <div class="btn-row">
                    <button type="button" onclick="closeModal('addModal')" class="btn-cancel">Batal</button>
                    <button type="submit" class="btn-save spph-header-gradient">💾 Simpan</button>
                </div>
            </form>
        </div>
    </div>

    {{-- ════════════════════════════════════════════════════════════════
    MODAL EDIT
    ════════════════════════════════════════════════════════════════ --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="modal-box">
            <div class="modal-head bg-gradient-to-r from-amber-500 to-orange-500">
                <h2>Edit Data SPPH</h2>
            </div>
            <form method="POST" id="editForm" class="modal-body">
                @csrf @method('PUT')
                <input type="hidden" id="editId">
                <div class="form-group">
                    <label>Nomor SPPH <span class="text-red-500">*</span></label>
                    <input type="text" name="nomor_spph" id="editNomor" autocomplete="off" required class="m-input mono"
                        style="border-width:2px">
                    <div id="editNomorStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tanggal <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal" id="editTanggal" required class="m-input">
                    </div>
                    <div class="form-group">
                        <label>Nomor PR <span class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <div class="flex gap-1.5 mb-1.5">
                            <button type="button" id="editBtnPpbjMode" onclick="setEditPrMode('ppbj')"
                                class="edit-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                                Pilih PPBJ</button>
                            <button type="button" id="editBtnManualMode" onclick="setEditPrMode('manual')"
                                class="edit-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                                Manual</button>
                        </div>
                        {{-- ❌ HAPUS name="nomor_pr" dari select --}}
                        <div id="editPpbjModeBox">
                            <select id="editPpbjSelect" class="edit-ppbj-select w-full"
                                data-placeholder="Pilih No. PPBJ...">
                                <option value=""></option>
                            </select>
                        </div>
                        {{-- ❌ HAPUS name dari input manual --}}
                        <div id="editManualModeBox" class="hidden">
                            <input type="text" id="editNomorPrManual" placeholder="Ketik nomor PR manual..."
                                class="m-input mono" autocomplete="off">
                        </div>
                        {{-- ✅ HANYA hidden field ini yang punya name --}}
                        <input type="hidden" name="nomor_pr" id="editNomorPrFinal">
                        <input type="hidden" name="nomor_pr_type" id="editNomorPrType" value="ppbj">
                        <div id="editPpbjInfo"
                            class="hidden mt-1.5 p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                            <div class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div id="editPpbjInfoContent"
                                    class="text-xs text-indigo-700 dark:text-indigo-300 space-y-0.5"></div>
                            </div>
                        </div>
                        <div id="editPpbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Nama Vendor <span class="text-red-500">*</span></label>
                    <select name="vendor_names[]" id="editVendor" required multiple class="edit-vendor-select w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)<option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                    </select>
                    <div id="editVendorUsagePanel" class="vendor-usage-panel hidden"></div>
                </div>
                <div class="form-group">
                    <label>Deskripsi Pengadaan <span class="text-red-500">*</span></label>
                    <div id="editDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="editDeskripsi" rows="2" required class="m-textarea"></textarea>
                </div>
                <div class="form-group">
                    <label>PIC <span class="text-red-500">*</span></label>
                    <select name="pic" id="editPic" required class="edit-pic-select w-full">
                        <option value="">-- Pilih PIC --</option>
                        @foreach($pics as $picItem)<option value="{{ $picItem }}">{{ $picItem }}</option>@endforeach
                    </select>
                </div>

                <div class="items-section">
                    <div class="items-header">
                        <label><span>📋</span> Daftar Barang / Jasa</label>
                    </div>
                    <div id="editRows" class="space-y-0">
                        <div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>
                    </div>
                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('edit')" class="btn-add-row" style="background:#f59e0b"><svg
                                class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>Tambah Barang</button>
                    </div>
                </div>

                <div class="btn-row">
                    <button type="button" onclick="closeModal('editModal')" class="btn-cancel">Batal</button>
                    <button type="submit" class="btn-save bg-gradient-to-r from-amber-500 to-orange-500"
                        style="box-shadow:0 2px 8px rgba(245,158,11,.3)">💾 Update</button>
                </div>
            </form>
        </div>
    </div>
    {{-- ════════════════════════════════════════════════════════════════
    ONBOARDING TUTORIAL POPUP
    ════════════════════════════════════════════════════════════════ --}}
    <div id="onboardingPopup" class="onboarding-overlay" style="display:none;">
        <div class="onboarding-card">
            <!-- STEP 1: Welcome -->
            <div class="ob-step active" data-step="1">
                <div class="ob-header">
                    <div class="ob-badge">✨ Pembaruan Fitur</div>
                    <div class="ob-icon-wrap">🚀</div>
                    <div class="ob-title">Integrasi PPBJ Otomatis</div>
                    <div class="ob-subtitle">Sekarang input SPPH lebih cepat dan otomatis terhubung dengan PPBJ</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot active" data-dot="1"></div>
                    <div class="ob-progress-dot" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num">1</span>
                        Apa yang baru?
                    </div>
                    <div class="ob-desc">
                        Tidak perlu lagi <strong>input data 2 kali</strong>! Sistem sekarang secara otomatis menghubungkan
                        SPPH dengan PPBJ Management.
                    </div>
                    <div class="ob-features">
                        <div class="ob-feature">
                            <span class="ob-feature-icon">📋</span>
                            <span class="ob-feature-text">Pilih PPBJ langsung dari dropdown</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">✍️</span>
                            <span class="ob-feature-text">Deskripsi otomatis terisi</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">🔗</span>
                            <span class="ob-feature-text">No. SPPH otomatis ke PPBJ</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">📊</span>
                            <span class="ob-feature-text">Progress PPBJ otomatis naik</span>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="closeOnboarding()">Lewati</button>
                    <button class="ob-btn-next" onclick="nextObStep(2)">
                        Lihat Cara Pakai
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 2: Pilih PPBJ -->
            <div class="ob-step" data-step="2">
                <div class="ob-header" style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);">
                    <div class="ob-badge">📋 Langkah 1</div>
                    <div class="ob-icon-wrap">🔍</div>
                    <div class="ob-title">Pilih PPBJ dari Dropdown</div>
                    <div class="ob-subtitle">Hanya muncul PPBJ yang belum punya nomor SPPH</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot active" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num">2</span>
                        Pilih Nomor PR
                    </div>
                    <div class="ob-desc">
                        Klik dropdown <strong>"Nomor PR"</strong>, lalu pilih PPBJ yang tersedia. Sistem hanya menampilkan
                        PPBJ yang <strong>belum terhubung</strong> dengan SPPH manapun.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Modal Tambah SPPH</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select highlight">
                                <svg width="16" height="16" fill="none" stroke="#6366f1" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono">PR/2026/001</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-select">
                                <svg width="16" height="16" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono" style="color:#94a3b8">PR/2026/002</div>
                                    <div class="ob-sub">ATK dan Perlengkapan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(1)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="nextObStep(3)">
                        Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 3: Auto-fill Deskripsi -->
            <div class="ob-step" data-step="3">
                <div class="ob-header" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
                    <div class="ob-badge">✍️ Langkah 2</div>
                    <div class="ob-icon-wrap">⚡</div>
                    <div class="ob-title">Deskripsi Otomatis Terisi!</div>
                    <div class="ob-subtitle">Uraian PPBJ langsung mengisi deskripsi pengadaan</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot active" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num" style="background:#22c55e">3</span>
                        Auto-fill Aktif
                    </div>
                    <div class="ob-desc">
                        Setelah memilih PPBJ, <strong>deskripsi pengadaan</strong> akan otomatis terisi sesuai uraian dari
                        data PPBJ. Kamu tinggal lanjut ke langkah berikutnya!
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Auto-fill dalam aksi</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select" style="border-color:#22c55e">
                                <div>
                                    <div class="ob-mono" style="color:#22c55e">✓ PR/2026/001</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-arrow">↓ Otomatis terisi</div>
                            <div class="ob-demo-textarea" style="border-color:#22c55e">
                                <span class="ob-auto-badge">✨ AUTO-FILL</span>
                                Pengadaan Laptop Kantor untuk divisi IT, spesifikasi minimal Intel Core i5, RAM 8GB, SSD
                                256GB, include carry case dan mouse wireless.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(2)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="nextObStep(4)"
                        style="background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 4px 14px rgba(34,197,94,0.4)">
                        Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 4: Auto-link ke PPBJ -->
            <div class="ob-step" data-step="4">
                <div class="ob-header" style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);">
                    <div class="ob-badge">🔗 Langkah 3</div>
                    <div class="ob-icon-wrap">🔗</div>
                    <div class="ob-title">Otomatis Terhubung ke PPBJ!</div>
                    <div class="ob-subtitle">Sekali klik Simpan, data PPBJ langsung terupdate</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot done" data-dot="3"></div>
                    <div class="ob-progress-dot active" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label" style="color:#f59e0b">
                        <span class="ob-step-num" style="background:#f59e0b">4</span>
                        Sinkronisasi Otomatis
                    </div>
                    <div class="ob-desc">
                        Saat kamu klik <strong>"Simpan"</strong>, sistem otomatis mengisi <strong>Nomor SPPH</strong> dan
                        <strong>Tanggal SPPH</strong> di halaman PPBJ Management. <strong>Progress PPBJ juga otomatis
                            naik!</strong>
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Yang terjadi di belakang layar</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-grid">
                                <div class="ob-demo-field">
                                    <div class="ob-demo-field-label">Halaman SPPH</div>
                                    <div style="font-size:11px;color:#6b7280;margin-bottom:4px">Klik "💾 Simpan"</div>
                                    <div
                                        style="font-family:'Courier New',monospace;font-size:11px;color:#111827;font-weight:600">
                                        128/PKU-III/SPPH/2026</div>
                                </div>
                                <div style="display:flex;align-items:center;justify-content:center">
                                    <div class="ob-demo-link-arrow">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ob-demo-field" style="border-color:#22c55e">
                                    <div class="ob-demo-field-label">PPBJ Management</div>
                                    <div style="font-size:10px;color:#22c55e;font-weight:700;margin-bottom:6px">✅ Terupdate
                                        Otomatis</div>
                                    <div style="display:flex;gap:8px">
                                        <div>
                                            <div style="font-size:9px;color:#94a3b8">No. SPPH</div>
                                            <div class="ob-demo-field-value">128/PKU-III/SPPH/2026</div>
                                        </div>
                                        <div>
                                            <div style="font-size:9px;color:#94a3b8">Tgl SPPH</div>
                                            <div class="ob-demo-field-value">06/05/2026</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style="margin-top:10px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px">
                                <span style="font-size:16px">📊</span>
                                <span style="font-size:11px;color:#92400e;font-weight:600">Progress PPBJ naik otomatis
                                    karena status sudah terhubung SPPH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(3)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="finishOnboarding()"
                        style="background:linear-gradient(135deg,#f59e0b,#ea580c);box-shadow:0 4px 14px rgba(245,158,11,0.4)">
                        🎉 Mulai Gunakan!
                    </button>
                </div>
            </div>
        </div>
    </div>

    {{-- ═══ Floating Button (muncul setelah tutorial selesai) ═══ --}}
    <button id="onboardingFloatBtn" class="ob-float-btn" style="display:none" onclick="showOnboarding()">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="ob-float-tooltip">Lihat Pembaruan</span>
    </button>
@endsection

@push('scripts')
    @php
        $spphPageConfig = [
            'onboardingSeen' => $onboardingSeen,
            'checkUrl' => route('spph.check-nomor'),
            'suggestUrl' => route('spph.suggest-nomor'),
            'pollUrl' => route('spph.poll'),
            'presenceUrl' => route('spph.presence'),
            'presenceStartUrl' => route('spph.presence.start'),
            'presenceStopUrl' => route('spph.presence.stop'),
            'ppbjOptionsUrl' => route('spph.ppbj-options'),
            'ppbjCheckUrl' => route('spph.check-ppbj'),
            'satuans' => $satuans,
            'satuanStoreUrl' => route('satuan.store'),
            'vendorUsageStatsUrl' => route('spph.vendor-usage-stats'),
            'vendorStoreUrl' => route('vendor.store'),
            'lastId' => $spphs->count() > 0 ? $spphs->max('id') : 0,
            'firstPage' => $spphs->onFirstPage(),
            'hasFilter' => (bool) (($search ?? '') || ($pic ?? '') || ($vendorFilter ?? '') || ($dari ?? '') || ($sampai ?? '')),
            'csrfToken' => csrf_token(),
        ];
    @endphp
    <script>
        window.SPPH_PAGE_CONFIG = @json($spphPageConfig);
    </script>
    <script src="{{ asset('assets/spph/spph.js') }}?v=20260814a" defer></script>
@endpush

@include('components.archive-upload-popup')
