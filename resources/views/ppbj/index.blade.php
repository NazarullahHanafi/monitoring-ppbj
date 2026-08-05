@extends('layouts.app')

@section('title', 'Management PPBJ')

@section('content')

    {{-- ================= HEADER ================= --}}
    <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">📁 Management PPBJ</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Monitoring SLA & proses pengadaan</p>
        </div>

        <div class="flex gap-2 flex-wrap">
            <button type="button" onclick="openImportModal()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[.99] transition">
                <span>📤 Import Excel</span>
            </button>

            <button type="button" onclick="exportData()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[.99] transition">
                <span>📥 Export Excel</span>
            </button>

            <button type="button" onclick="openCreateForm()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[.99] transition">
                <span>+ Tambah PPBJ</span>
            </button>
        </div>
    </div>

    {{-- ================= FILTER (RESPONSIVE & MODERN) ================= --}}
    <form method="GET" id="ulala"
        class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 items-start">

        {{-- 1. Search --}}
        <div class="lg:col-span-2 sm:col-span-2 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pencarian</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</div>
                <input type="text" name="search" placeholder="Cari uraian, No. PPBJ, SPH, DO, BPG, invoice..."
                    value="{{ request('search') }}"
                    class="pl-10 px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                           placeholder-gray-400 dark:placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all">
            </div>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                Mencari di: Uraian · No. PPBJ · SPH · Awarding/SP · SPPH/RFQ 1 · No. DO · No. BPG · No. BPB · No. Invoice
            </p>
        </div>

        {{-- 2. Filter Tanggal: Tipe --}}
        <div class="lg:col-span-1 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Filter
                Tanggal</label>
            <select id="date_type" name="date_type" onchange="toggleDateInputs()"
                class="px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg
                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer appearance-none"
                style="background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');background-position:right .7rem top 50%;background-size:.65rem;background-repeat:no-repeat">
                <option value="">Semua Tanggal</option>
                <option value="daily" {{ request('date_type') == 'daily' ? 'selected' : '' }}>📅 Hari Tertentu</option>
                <option value="monthly" {{ request('date_type') == 'monthly' ? 'selected' : '' }}>📆 Bulan Tertentu</option>
                <option value="yearly" {{ request('date_type') == 'yearly' ? 'selected' : '' }}>🗓 Tahun Tertentu</option>
                <option value="range" {{ request('date_type') == 'range' ? 'selected' : '' }}>📅 Custom Range</option>
            </select>
        </div>

        {{-- 3. Input Tanggal Dinamis --}}
        <div class="lg:col-span-2 sm:col-span-1 relative min-h-[42px]">
            <div id="input-daily" class="date-input-group hidden h-full">
                <input type="date" name="date_day" value="{{ request('date_day') }}" class="w-full h-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            </div>
            <div id="input-monthly" class="date-input-group hidden h-full">
                <input type="month" name="date_month" value="{{ request('date_month') }}" class="w-full h-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            </div>
            <div id="input-yearly" class="date-input-group hidden h-full">
                <input type="number" name="date_year" value="{{ request('date_year') }}" placeholder="Tahun (cth: 2024)"
                    min="2000" max="2099" class="w-full h-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            </div>
            <div id="input-range" class="date-input-group hidden grid grid-cols-2 gap-2 h-full">
                <div class="relative">
                    <input type="date" name="date_start" value="{{ request('date_start') }}" class="w-full h-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded
                                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                               focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span class="absolute -bottom-4 left-0 text-[10px] text-gray-400">Dari</span>
                </div>
                <div class="relative">
                    <input type="date" name="date_end" value="{{ request('date_end') }}" class="w-full h-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded
                                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                               focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span class="absolute -bottom-4 left-0 text-[10px] text-gray-400">Sampai</span>
                </div>
            </div>
            <div id="date-placeholder" class="absolute inset-0 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500
                                       select-none bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-dashed
                                       border-gray-300 dark:border-gray-600 pointer-events-none">
                Pilih tipe tanggal...
            </div>
        </div>

        {{-- 4. Portofolio (tetap pakai Select2) --}}
        <div class="lg:col-span-1 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Portofolio</label>
            <select name="portofolio"
                class="select2-filter px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                <option value="">Semua</option>
                @foreach($portofolios as $p)
                    <option value="{{ $p }}" @selected(request('portofolio') == $p)>{{ $p }}</option>
                @endforeach
            </select>
        </div>

        {{-- 5. Buyer (tetap pakai Select2) --}}
        <div class="lg:col-span-1 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Buyer</label>
            <select name="buyer"
                class="select2-filter px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                <option value="">Semua</option>
                @foreach($buyers as $b)
                    <option value="{{ $b }}" @selected(request('buyer') == $b)>{{ $b }}</option>
                @endforeach
            </select>
        </div>

        {{-- 6. Status SLA --}}
        <div class="lg:col-span-1 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</label>
            <select name="status_sla" class="px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer
                       appearance-none"
                style="background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');background-position:right .7rem top 50%;background-size:.65rem;background-repeat:no-repeat">
                <option value="">Semua</option>
                <option value="ON TRACK" {{ request('status_sla') === 'ON TRACK' ? 'selected' : '' }}>ON TRACK</option>
                <option value="WARNING" {{ request('status_sla') === 'WARNING' ? 'selected' : '' }}>WARNING</option>
                <option value="OVERDUE" {{ request('status_sla') === 'OVERDUE' ? 'selected' : '' }}>OVERDUE</option>
                <option value="LENGKAP" {{ request('status_sla') === 'LENGKAP' ? 'selected' : '' }}>LENGKAP</option>
                <option value="CANCELLED" {{ request('status_sla') === 'CANCELLED' ? 'selected' : '' }}>CANCELLED</option>
            </select>
        </div>

        {{-- 7. Progress --}}
        <div class="lg:col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Progress</label>
            <select name="progress" class="px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer
                   appearance-none"
                style="background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');background-position:right .7rem top 50%;background-size:.65rem;background-repeat:no-repeat">
                <option value="">Semua Progress</option>
                <option value="0" {{ request('progress') === '0' ? 'selected' : '' }}>0%</option>
                <option value="1-20" {{ request('progress') === '1-20' ? 'selected' : '' }}>1% – 20%</option>
                <option value="21-40" {{ request('progress') === '21-40' ? 'selected' : '' }}>21% – 40%</option>
                <option value="41-60" {{ request('progress') === '41-60' ? 'selected' : '' }}>41% – 60%</option>
                <option value="61-80" {{ request('progress') === '61-80' ? 'selected' : '' }}>61% – 80%</option>
                <option value="81-99" {{ request('progress') === '81-99' ? 'selected' : '' }}>81% – 99%</option>
                <option value="100" {{ request('progress') === '100' ? 'selected' : '' }}>100%</option>
            </select>
        </div>

        {{-- 8. Penyedia (tetap pakai Select2 karena datanya banyak) --}}
        <div class="lg:col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Penyedia</label>
            <select name="penyedia_eksternal"
                class="select2-filter px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                <option value="">Semua</option>
                @foreach($penyediaEksternals as $pe)
                    <option value="{{ $pe }}" @selected(request('penyedia_eksternal') == $pe)>{{ $pe }}</option>
                @endforeach
            </select>
        </div>

        {{-- 9. Tombol --}}
        <div class="lg:col-span-3 sm:col-span-2 flex items-end gap-2 mt-1">
            <button type="submit"
                class="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Terapkan Filter
            </button>
            <a href="{{ route('ppbj.index') }}"
                class="px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                                       text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm">
                Reset
            </a>
        </div>

    </form>

    @php
        $progressLabels = [
            '0' => '0%',
            '1-20' => '1% – 20%',
            '21-40' => '21% – 40%',
            '41-60' => '41% – 60%',
            '61-80' => '61% – 80%',
            '81-99' => '81% – 99%',
            '100' => '100%',
        ];

        $activeFilters = [];

        if (request('search'))
            $activeFilters[] = ['label' => 'Cari', 'value' => '"' . request('search') . '"', 'param' => 'search'];
        if (request('portofolio'))
            $activeFilters[] = ['label' => 'Portofolio', 'value' => request('portofolio'), 'param' => 'portofolio'];
        if (request('buyer'))
            $activeFilters[] = ['label' => 'Buyer', 'value' => request('buyer'), 'param' => 'buyer'];
        if (request('status_sla'))
            $activeFilters[] = ['label' => 'Status', 'value' => request('status_sla'), 'param' => 'status_sla'];
        if (request('progress'))
            $activeFilters[] = ['label' => 'Progress', 'value' => $progressLabels[request('progress')] ?? request('progress'), 'param' => 'progress'];
        if (request('penyedia_eksternal'))
            $activeFilters[] = ['label' => 'Penyedia', 'value' => request('penyedia_eksternal'), 'param' => 'penyedia_eksternal'];
        if (request('date_type') && (request('date_day') || request('date_month') || request('date_year') || request('date_start'))) {
            $dateVal = match (request('date_type')) {
                'daily' => request('date_day'),
                'monthly' => request('date_month'),
                'yearly' => request('date_year'),
                'range' => request('date_start') . ' s/d ' . request('date_end'),
                default => '',
            };
            $activeFilters[] = ['label' => 'Tanggal', 'value' => $dateVal, 'param' => 'date_type'];
        }
    @endphp

    @if(count($activeFilters) > 0)
        <div class="mb-4 flex flex-wrap items-center gap-2">
            <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {{ count($activeFilters) }} Filter Aktif
            </span>

            @foreach($activeFilters as $f)
                @php
                    $removeParams = request()->except(
                        match ($f['param']) {
                            'search' => ['search'],
                            'portofolio' => ['portofolio'],
                            'buyer' => ['buyer'],
                            'status_sla' => ['status_sla'],
                            'progress' => ['progress'],
                            'penyedia_eksternal' => ['penyedia_eksternal'],
                            'date_type' => ['date_type', 'date_day', 'date_month', 'date_year', 'date_start', 'date_end'],
                            default => [$f['param']],
                        }
                    );
                    $removeUrl = route('ppbj.index') . (count($removeParams) ? '?' . http_build_query($removeParams) : '');
                @endphp
                <span
                    class="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-full text-xs font-semibold
                                                                                                                                                                                                                                                 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200
                                                                                                                                                                                                                                                 border border-blue-200 dark:border-blue-700shadow-sm">
                    <span class="text-blue-500 dark:text-blue-400 font-normal">{{ $f['label'] }}:</span>
                    <span class="max-w-[160px] truncate">{{ $f['value'] }}</span>
                    <a href="{{ $removeUrl }}" title="Hapus filter ini"
                        class="ml-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                                                                                                                                                                                                                                  bg-blue-200 dark:bg-blue-700 hover:bg-red-500 dark:hover:bg-red-600
                                                                                                                                                                                                                                                  text-blue-700 dark:text-blue-200 hover:text-white
                                                                                                                                                                                                                                                  transition-colors duration-150">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </a>
                </span>
            @endforeach

            <a href="{{ route('ppbj.index') }}"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                                                                                                                                                                  bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
                                                                                                                                                                  border border-red-200 dark:border-red-800
                                                                                                                                                                  hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset Semua
            </a>
        </div>
    @endif

    @if(!empty($searchContext))
        @php
            $kw = $searchContext['keyword'];
            $matchedFields = $searchContext['matched_fields'];
            $allFields = $searchContext['all_fields'];
            $hasMatch = count($matchedFields) > 0;
            $totalResults = $ppbj->total();
        @endphp
        <div class="mb-4 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-gray-900 p-4">
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0 mt-0.5">
                    <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                </div>

                <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                        @if($hasMatch)
                            Menampilkan <span class="font-bold">{{ number_format($totalResults) }}</span> hasil untuk
                            "<span class="font-bold italic">{{ $kw }}</span>"
                        @else
                            Tidak ada hasil untuk "<span class="font-bold italic">{{ $kw }}</span>"
                        @endif
                    </div>

                    @if($hasMatch)
                        <div class="text-xs text-blue-700 dark:text-blue-300 mb-2.5">
                            Ditemukan di kolom:
                            <span class="font-semibold">{{ implode(', ', $matchedFields) }}</span>
                        </div>
                    @else
                        <div class="text-xs text-blue-600 dark:text-blue-400 mb-2.5">
                            Pencarian dilakukan di semua kolom di bawah ini, namun tidak ada yang cocok.
                        </div>
                    @endif

                    <div class="flex flex-wrap gap-1.5">
                        @foreach($allFields as $fieldLabel)
                                @php $isMatch = in_array($fieldLabel, $matchedFields); @endphp
                                <span
                                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold
                                                                                                                                                                                                                            {{ $isMatch
                            ? 'bg-blue-600 text-white ring-1 ring-blue-400'
                            : 'bg-gray-700 dark:bg-gray-600 text-gray-400 dark:text-gray-300 ring-1 ring-gray-500 dark:ring-gray-500' }}">
                                    @if($isMatch)
                                        <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    @else
                                        <svg class="w-2.5 h-2.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    @endif
                                    {{ $fieldLabel }}
                                </span>
                        @endforeach
                    </div>

                    @if(!$hasMatch)
                        <div class="mt-2.5 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Coba gunakan kata kunci yang lebih umum atau periksa ejaan.
                            <a href="{{ route('ppbj.index') }}"
                                class="underline font-semibold hover:text-blue-800 dark:hover:text-blue-200">Reset pencarian</a>
                        </div>
                    @endif
                </div>

                <a href="{{ route('ppbj.index', request()->except('search')) }}" title="Hapus pencarian"
                    class="flex-shrink-0 mt-0.5 rounded-full p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </a>
            </div>
        </div>
    @endif

    @php
        $hlKw = $searchContext['keyword'] ?? null;

        function hlText($text, $keyword): string
        {
            if (!$keyword || trim($keyword) === '')
                return e($text);
            $safe = e($text);
            $safeKw = preg_quote(e($keyword), '/');
            return preg_replace(
                '/(' . $safeKw . ')/i',
                '<mark class="search-hl">$1</mark>',
                $safe
            );
        }
    @endphp

    {{-- ================= TABLE (RESPONSIVE) ================= --}}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-[980px] w-full text-sm text-left">
                <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr class="text-gray-600 dark:text-gray-300">
                        <th class="px-4 py-3 text-left">PPBJ</th>
                        <th class="px-4 py-3 text-left">Uraian</th>
                        <th class="px-4 py-3 text-left">Portofolio</th>
                        <th class="px-4 py-3 text-left">Buyer</th>
                        <th class="px-4 py-3 text-center">Sisa SLA</th>
                        <th class="px-4 py-3 text-center">Status</th>
                        <th class="px-4 py-3 text-center">Progress</th>
                        <th class="px-4 py-3 text-center">Info</th>
                        <th class="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    @forelse($ppbj as $row)
                        @php
                            $progress = (int) ($row->progres ?? 0);
                            $progress = max(0, min(100, $progress));
                            $isCancelled = (strtoupper((string) ($row->status ?? 'ACTIVE')) === 'CANCELLED');
                            $isSlaComplete = method_exists($row, 'isSlaComplete') ? $row->isSlaComplete() : ($progress === 100 && !empty($row->no_invoice));
                            $slaMainLabel = method_exists($row, 'slaFinalLabel') ? $row->slaFinalLabel() : (($isSlaComplete || $isCancelled) ? ($isCancelled ? 'Dibatalkan' : 'Selesai') : (($row->sisa_target_sla ?? 0) . ' hari'));
                            $slaOutcomeLabel = method_exists($row, 'slaOutcomeLabel') ? $row->slaOutcomeLabel() : null;
                            $slaOutcomeClass = method_exists($row, 'slaOutcomeColorClass')
                                ? $row->slaOutcomeColorClass()
                                : 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600';
                            $slaExplanation = method_exists($row, 'slaExplanation')
                                ? $row->slaExplanation()
                                : ($isSlaComplete
                                    ? 'Pekerjaan sudah lengkap. Perhitungan SLA berhenti.'
                                    : 'SLA masih berjalan sampai hari ini.');

                            if ($isCancelled) {
                                $displayStatusSla = 'CANCELLED';
                                $statusColor = 'bg-gray-600';
                            } elseif ($isSlaComplete) {
                                $displayStatusSla = 'LENGKAP';
                                $statusColor = 'bg-blue-600';
                            } else {
                                $sisaSla = (int) ($row->sisa_target_sla ?? 0);
                                if ($sisaSla <= 0) {
                                    $displayStatusSla = 'OVERDUE';
                                    $statusColor = 'bg-red-600';
                                } elseif ($sisaSla <= 2) {
                                    $displayStatusSla = 'WARNING';
                                    $statusColor = 'bg-yellow-500';
                                } else {
                                    $displayStatusSla = 'ON TRACK';
                                    $statusColor = 'bg-green-600';
                                }
                            }
                        @endphp

                        <tr id="row_{{ $row->id }}"
                            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                                <span class="ppbj-no">{!! hlText($row->ppbj_no, $hlKw) !!}</span>

                                @if($isCancelled)
                                    <span
                                        class="ml-2 inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-600 px-2 py-0.5 text-[10px] font-bold text-gray-700 dark:text-gray-300 cancelled-pill">
                                        CANCELLED
                                    </span>
                                @else
                                    <span
                                        class="ml-2 hidden items-center rounded-full bg-gray-200 dark:bg-gray-600 px-2 py-0.5 text-[10px] font-bold text-gray-700 dark:text-gray-300 cancelled-pill">
                                        CANCELLED
                                    </span>
                                @endif
                            </td>

                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{!! hlText($row->uraian, $hlKw) !!}</td>
                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ $row->portofolio }}</td>
                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ $row->buyer }}</td>

                            <td class="px-4 py-3 text-center" title="{{ $slaExplanation }}">
                                <div class="inline-flex flex-col items-center gap-1">
                                    <span class="font-semibold text-gray-700 dark:text-gray-200">{{ $slaMainLabel }}</span>
                                    @if($slaOutcomeLabel)
                                        <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 {{ $slaOutcomeClass }}">
                                            {{ $slaOutcomeLabel }}
                                        </span>
                                    @endif
                                </div>
                            </td>

                            <td class="px-4 py-3 text-center">
                                <span
                                    class="status-badge inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-bold text-white {{ $statusColor }}">
                                    {{ $displayStatusSla }}
                                </span>
                            </td>

                            <td class="px-4 py-3 text-center w-44">
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1 overflow-hidden">
                                    <div class="h-2 rounded-full bg-blue-600 transition-all duration-500"
                                        style="width: {{ $progress }}%"></div>
                                </div>
                                <small class="text-gray-600 dark:text-gray-400">{{ $progress }}%</small>
                            </td>

                            <td class="px-4 py-3 text-center">
                                <div class="inline-flex flex-col items-center gap-1">
                                    <button type="button" onclick="openDetail({{ $row->id }})"
                                        class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">
                                        Info
                                    </button>
                                    <button type="button" data-archive-status data-ppbj-id="{{ $row->id }}"
                                        onclick="openArchiveDetail({{ $row->id }})"
                                        class="inline-flex items-center gap-0.5 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600">
                                        <span class="h-1 w-1 rounded-full bg-slate-400"></span>
                                        Cek Arsip
                                    </button>
                                </div>
                            </td>

                            <td class="px-4 py-3 text-center">
                                @if($isCancelled)
                                    <span class="text-xs text-gray-400">—</span>
                                @else
                                    <div class="row-actions inline-flex gap-2">
                                        <button type="button" onclick="openEditForm({{ $row->id }})"
                                            class="inline-flex items-center justify-center rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition">
                                            Edit
                                        </button>

                                        <button type="button" onclick="cancelData({{ $row->id }})"
                                            class="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition">
                                            Cancel
                                        </button>
                                    </div>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9"
                                class="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                                Data tidak ditemukan
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    {{-- pagination bawah --}}
    <div class="mt-4">
        {{ $ppbj->links() }}
    </div>

    {{-- ================= MODAL DETAIL ================= --}}
    <div id="detailModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50" onclick="closeDetail()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h2 class="font-bold text-lg">Detail PPBJ</h2>
                    <p id="detailHint" class="text-xs text-gray-500 dark:text-gray-400"></p>
                </div>
                <button type="button" onclick="closeDetail()"
                    class="text-red-500 dark:text-red-400 text-xl leading-none hover:scale-105 transition">✕</button>
            </div>

            <div id="cancelledBanner"
                class="hidden mb-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4">
                <div class="flex items-start gap-3">
                    <div class="mt-0.5 h-2.5 w-2.5 rounded-full bg-gray-600 dark:bg-gray-500"></div>
                    <div class="flex-1">
                        <div class="font-semibold text-gray-800 dark:text-gray-200">Data ini telah di-cancel.</div>

                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <div class="text-xs text-gray-500 dark:text-gray-500">Alasan:</div>
                            <div id="cancelReasonText" class="font-semibold text-gray-800 dark:text-gray-200">—</div>
                        </div>

                        <div class="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
                            <div class="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                                <div class="text-gray-500 dark:text-gray-400">Dicancel oleh</div>
                                <div id="cancelledByText" class="font-bold text-gray-900 dark:text-gray-100">—</div>
                            </div>
                            <div class="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                                <div class="text-gray-500 dark:text-gray-400">Password diverifikasi</div>
                                <div id="cancelVerifiedByText" class="font-bold text-gray-900 dark:text-gray-100">—</div>
                            </div>
                            <div class="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                                <div class="text-gray-500 dark:text-gray-400">Waktu cancel</div>
                                <div id="cancelledAtText" class="font-bold text-gray-900 dark:text-gray-100">—</div>
                            </div>
                        </div>

                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                            Klik tombol di bawah untuk melihat isi datanya.
                        </div>

                        <div class="mt-3">
                            <button type="button" onclick="showCancelledDetail()"
                                class="rounded-lg bg-gray-800 dark:bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-black dark:hover:bg-gray-500 transition">
                                Lihat Isi Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="detailContent"
                class="hidden grid grid-cols-1 md:grid-cols-2 gap-3 text-sm max-h-[65vh] overflow-y-auto pr-2">
            </div>

            <div id="detailArchiveCard"
                class="hidden mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900/60">
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div class="flex items-start gap-3">
                        <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-white">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 13h6m-6 4h6m-1-14v5h5"></path>
                            </svg>
                        </span>
                        <div>
                            <div class="flex flex-wrap items-center gap-2">
                                <p class="text-sm font-bold text-gray-800 dark:text-white">Arsip &amp; Laporan PR</p>
                                <span id="detailArchiveBadge"
                                    class="inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:bg-gray-700 dark:text-gray-200">
                                    Memeriksa
                                </span>
                            </div>
                            <p id="detailArchiveMessage" class="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                Menghubungi sistem arsip...
                            </p>
                        </div>
                    </div>
                    <button id="detailArchiveRefresh" type="button" onclick="refreshCurrentPpbjArchive()"
                        class="hidden rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        Periksa ulang
                    </button>
                </div>
                <div id="detailArchiveDocuments" class="mt-3 hidden space-y-2"></div>
            </div>
        </div>
    </div>

    {{-- ================= MODAL FORM PPBJ ================= --}}
    <div id="formModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <h2 id="formTitle" class="font-bold text-lg">Tambah PPBJ</h2>
                <button type="button" onclick="closeForm()"
                    class="text-gray-500 dark:text-gray-400 text-xl leading-none hover:text-gray-800 dark:hover:text-white transition">✕</button>
            </div>

            @php
                $fields = [
                    'uraian' => ['Uraian', 'text'],
                    'note' => ['Note', 'text'],
                    'total_sebelum_ppn' => ['Total Sebelum PPN', 'currency'],
                    'tgl_ppbj' => ['Tanggal PPBJ', 'date'],
                    'tgl_terima_pr' => ['Tanggal Terima PR', 'date'],
                    'tgl_diserahkan' => ['Tanggal Diserahkan', 'date'],
                    'spph_rfq_1' => ['SPPH / RFQ 1', 'text'],
                    'rfq_2' => ['RFQ 2', 'text'],
                    'rfq_3' => ['RFQ 3', 'text'],
                    'tgl_spph' => ['Tanggal SPPH', 'date'],
                    'closed_date' => ['Closed Date', 'date'],
                    'sph' => ['SPH', 'text'],
                    'tgl_sph' => ['Tanggal SPH', 'date'],
                    'awarding_sp' => ['Awarding/SP/Kontrak', 'text'],
                    'tgl_awarding_sp' => ['Tanggal Awarding', 'date'],
                    'pemenang' => ['No. Pengumuman Pemenang', 'text'],
                    'tgl_pemenang' => ['Tanggal Pemenang', 'date'],
                    'tgl_spk' => ['Tanggal SPK', 'date'],
                    'nilai_sp_spk' => ['Nilai SP/SPK', 'currency'],
                    'promised_date' => ['Promised Date', 'date'],
                    'do_no' => ['DO No', 'text'],
                    'bpg_no' => ['BPG No', 'text'],
                    'nilai_bpg' => ['Nilai BPG', 'currency'],
                    'tgl_bpg' => ['Tanggal BPG', 'date'],
                    'receiving_transaction' => ['Receiving Transaction', 'text'],
                    'bpb_no' => ['BPB No', 'text'],
                    'tgl_bpb' => ['Tanggal BPB', 'date'],
                    'no_invoice' => ['No Invoice', 'text'],
                    'tgl_invoice' => ['Tanggal Invoice', 'date'],
                    'keterangan' => ['Keterangan', 'textarea'],
                ];

                $masterFields = [
                    'portofolio' => ['Portofolio', $portofolios, 'portofolio'],
                    'buyer' => ['Buyer', $buyers, 'buyer'],
                    'metode_pengadaan' => ['Metode Pengadaan', $metodePengadaans, 'metode_pengadaan'],
                    'penyedia_eksternal' => ['Penyedia Eksternal', $penyediaEksternals, 'penyedia_eksternal'],
                ];

                $canFullManageMaster = auth()->user()?->role === 'superadmin' && auth()->user()?->department === 'umum';
                $canCreatePenyediaEksternal = auth()->user()?->department === 'umum' && auth()->user()?->role !== 'viewer';
            @endphp

            <form id="ppbjForm" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                @csrf
                <input type="hidden" id="ppbj_id" name="id" />

                <div class="md:col-span-2">
                    <label class="text-sm text-gray-600 dark:text-gray-400">PPBJ No</label>
                    <input type="text" id="ppbj_no" name="ppbj_no" autocomplete="off"
                        class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200">

                    <p id="err_ppbj_no" class="hidden text-xs text-red-600 mt-1"></p>

                    <p id="hint_ppbj_no" class="hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Mengecek nomor PPBJ…
                    </p>
                </div>

                @foreach($masterFields as $name => [$label, $options, $type])
                    <div>
                        <label class="text-sm text-gray-600 dark:text-gray-400">{{ $label }}</label>

                        <div class="flex gap-2">
                            <select id="{{ $name }}" name="{{ $name }}"
                                class="select2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200">
                                <option value="">-- pilih --</option>
                                @foreach($options as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>

                            @if($canFullManageMaster || ($type === 'penyedia_eksternal' && $canCreatePenyediaEksternal))
                            <button type="button"
                                class="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                onclick="openMaster('{{ $type }}')" title="Kelola master">
                                ⚙
                            </button>
                            @endif
                        </div>
                    </div>
                @endforeach

                @foreach($fields as $name => [$label, $type])
                    <div class="{{ $type === 'textarea' ? 'md:col-span-2' : '' }}">
                        <label class="text-sm text-gray-600 dark:text-gray-400">{{ $label }}</label>

                        @if($type === 'textarea')
                            <textarea id="{{ $name }}" name="{{ $name }}"
                                class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                rows="3"></textarea>
                        @elseif($type === 'currency')
                            <input type="text" id="{{ $name }}" name="{{ $name }}" data-type="currency"
                                class="currency-input border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 text-left"
                                placeholder="123,456,789.00" autocomplete="off">
                        @else
                            <input type="{{ $type }}" id="{{ $name }}" name="{{ $name }}"
                                class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200">
                        @endif
                    </div>
                @endforeach

                <div class="md:col-span-2 flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <button id="btnSave" type="submit"
                        class="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center gap-2">
                        <span id="btnSaveText">Simpan</span>
                        <span id="btnSaveSpinner"
                            class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                    </button>
                    <button type="button" onclick="closeForm()"
                        class="rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 font-semibold border border-transparent dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    {{-- ================= MODAL MASTER DATA ================= --}}
    <div id="masterModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 w-full max-w-xl rounded-2xl shadow-xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex justify-between items-center mb-4">
                <h2 id="masterTitle" class="font-bold text-lg">Kelola Master</h2>
                <button type="button" class="text-red-600 dark:text-red-400 text-xl hover:scale-105 transition"
                    onclick="closeMaster()">✕</button>
            </div>

            <div class="flex gap-2 mb-3">
                <input id="masterInput"
                    class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nama baru...">
                <button type="button"
                    class="bg-blue-600 text-white px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onclick="addMaster()">Tambah</button>
            </div>

            <div id="masterList" class="space-y-2 overflow-y-auto" style="max-height: 60vh;"></div>
        </div>
    </div>

    {{-- ================= MODAL IMPORT ================= --}}
    <div id="importModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 w-full max-w-6xl rounded-2xl shadow-xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 90vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <div>
                    <h2 class="font-bold text-lg">Import Data PPBJ</h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload file CSV untuk import data secara massal
                    </p>
                </div>
                <button type="button" onclick="closeImportModal()"
                    class="text-red-500 dark:text-red-400 text-xl leading-none hover:scale-105 transition">✕</button>
            </div>

            {{-- Step 1: Upload File --}}
            <div id="uploadStep" class="animate-fade-in">
                <div
                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition">
                    <div class="text-6xl mb-4">📂</div>
                    <h3 class="font-semibold text-lg mb-2">Upload File CSV</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag & drop file atau klik untuk browse</p>

                    <input type="file" id="importFile" accept=".xlsx,.xls,.csv" class="hidden"
                        onchange="handleFileSelect(event)">

                    <button type="button" onclick="document.getElementById('importFile').click()"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                        <span>📁 Pilih File</span>
                    </button>

                    <div class="mt-4">
                        <a href="{{ route('ppbj.template') }}"
                            class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                            <span>📥 Download Template CSV</span>
                        </a>
                    </div>
                </div>

                <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-2">💡 Petunjuk Import:</h4>
                    <ul class="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                        <li>• Download template CSV terlebih dahulu</li>
                        <li>• <strong>PPBJ No wajib diisi dan harus unik</strong> (tidak boleh duplikat)</li>
                        <li>• Format tanggal: <code
                                class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-200">YYYY-MM-DD</code>
                            (contoh: 2026-01-15)
                        </li>
                        <li>• Format angka: tanpa titik/koma (contoh: 50000000)</li>
                        <li>• Kolom otomatis (SLA, Progress, dll) tidak perlu diisi</li>
                        <li>• Maksimal ukuran file: 10MB</li>
                    </ul>
                </div>
            </div>

            {{-- Step 2: Preview --}}
            <div id="previewStep" class="hidden">
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div class="text-sm text-blue-600 dark:text-blue-400">Total Baris</div>
                        <div id="totalRows" class="text-2xl font-bold text-blue-900 dark:text-blue-200">0</div>
                    </div>
                    <div
                        class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div class="text-sm text-green-600 dark:text-green-400">✓ Valid</div>
                        <div id="validRows" class="text-2xl font-bold text-green-900 dark:text-green-200">0</div>
                    </div>
                    <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div class="text-sm text-red-600 dark:text-red-400">✗ Error</div>
                        <div id="errorRows" class="text-2xl font-bold text-red-900 dark:text-red-200">0</div>
                    </div>
                </div>

                <div id="errorAlert" class="hidden mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-semibold text-red-800 dark:text-red-200">
                                Ditemukan <span id="errorCount">0</span> baris dengan error
                            </h3>
                            <p class="text-xs text-red-700 dark:text-red-300 mt-1">
                                Perbaiki data di baris yang error sebelum melakukan import.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                    <div class="overflow-x-auto" style="max-height: 500px;">
                        <table class="w-full text-xs">
                            <thead class="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                                <tr class="text-gray-700 dark:text-gray-300">
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-16">
                                        Baris</th>
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-24">
                                        Status</th>
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-32">
                                        PPBJ No</th>
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-48">
                                        Uraian</th>
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-32">
                                        Buyer</th>
                                    <th
                                        class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600 w-32">
                                        Total</th>
                                    <th class="px-3 py-3 text-left font-semibold w-auto min-w-[300px]">Detail Error</th>
                                </tr>
                            </thead>
                            <tbody id="previewTableBody"
                                class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mb-4 flex items-center gap-4 text-xs">
                    <div class="flex items-center gap-2">
                        <span
                            class="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-semibold">✓
                            Valid</span>
                        <span class="text-gray-600 dark:text-gray-400">= Data siap diimport</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span
                            class="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full font-semibold">✗
                            Error</span>
                        <span class="text-gray-600 dark:text-gray-400">= Harus diperbaiki</span>
                    </div>
                </div>

                <div
                    class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" onclick="resetImport()"
                        class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition inline-flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Upload Ulang
                    </button>

                    <div class="flex gap-2 w-full sm:w-auto">
                        <button type="button" onclick="closeImportModal()"
                            class="flex-1 sm:flex-initial px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold border border-transparent dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            Batal
                        </button>

                        <button type="button" id="btnProcess" onclick="processImport()"
                            class="flex-1 sm:flex-initial px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 hover:shadow-lg transition inline-flex items-center justify-center gap-2">
                            <span id="btnProcessText">✓ Proses Import</span>
                            <span id="btnProcessSpinner"
                                class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        </button>
                    </div>
                </div>
            </div>

            {{-- Loading State --}}
            <div id="loadingStep" class="hidden text-center py-12">
                <div
                    class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4">
                </div>
                <p class="text-gray-600 dark:text-gray-400">Memproses file...</p>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        // ==========================================
        // GLOBAL HELPER FUNCTIONS
        // ==========================================

        function escapeHtml(str) {
            return String(str ?? '').replace(/[&<>"']/g, (m) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
            }[m]));
        }

        function formatRupiah(value) {
            return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
        }

        function toastOk(title, text) {
            if (!window.Swal) return;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: title || 'Berhasil',
                text: text || '',
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true
            });
        }

        function toastErr(title, text) {
            if (!window.Swal) return;
            let iconType = 'error';
            if (title === 'Sukses') iconType = 'success';

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: iconType,
                title: title || 'Gagal',
                text: text || '',
                showConfirmButton: false,
                timer: 2600,
                timerProgressBar: true
            });
        }

        // ==========================================
        // EXPORT FUNCTIONALITY
        // ==========================================
        window.exportData = function () {
            const form = document.getElementById('ulala');
            const formData = new FormData(form);
            const params = new URLSearchParams(formData);

            Swal.fire({
                title: 'Export Data?',
                text: 'Data akan diexport sesuai filter yang aktif',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Export',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/ppbj/export?${params.toString()}`;
                    toastOk('Export dimulai', 'File akan segera didownload');
                }
            });
        };

        // ==========================================
        // IMPORT FUNCTIONALITY
        // ==========================================
        let previewData = [];

        window.openImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            resetImport();
        };

        window.closeImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resetImport();
        };

        window.resetImport = function () {
            document.getElementById('uploadStep').classList.remove('hidden');
            document.getElementById('previewStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('importFile').value = '';
            previewData = [];
        };

        window.handleFileSelect = async function (event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validasi ukuran file
            if (file.size > 10 * 1024 * 1024) {
                toastErr('Error', 'Ukuran file maksimal 10MB');
                return;
            }

            // Validasi ekstensi
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['xlsx', 'xls', 'csv'].includes(ext)) {
                toastErr('Error', 'Format file harus Excel (.xlsx, .xls) atau CSV');
                return;
            }

            // Show loading
            document.getElementById('uploadStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.remove('hidden');

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('{{ route("ppbj.import.preview") }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal memproses file');
                }

                if (!result.success) {
                    throw new Error(result.message);
                }

                // Store data
                previewData = result.data;

                // Show preview
                renderImportPreview(result);

            } catch (error) {
                document.getElementById('loadingStep').classList.add('hidden');
                document.getElementById('uploadStep').classList.remove('hidden');
                toastErr('Error', error.message);
            }
        };

        // ==========================================
        // RENDER IMPORT PREVIEW (SINGLE FUNCTION)
        // ==========================================
        function renderImportPreview(result) {
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('previewStep').classList.remove('hidden');

            // Update Summary
            document.getElementById('totalRows').textContent = result.summary.total;
            document.getElementById('validRows').textContent = result.summary.valid;
            document.getElementById('errorRows').textContent = result.summary.error;

            // Show/Hide Alert Box
            const errorAlert = document.getElementById('errorAlert');
            const errorCount = document.getElementById('errorCount');

            if (result.summary.error > 0) {
                errorAlert.classList.remove('hidden');
                errorAlert.className = "mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded animate-pulse";
                errorCount.textContent = result.summary.error;
            } else {
                errorAlert.classList.add('hidden');
            }

            // Pisahkan Error dan Valid, lalu gabungkan (Error duluan)
            const errorRows = result.data.filter(d => d.status === 'error');
            const validRows = result.data.filter(d => d.status === 'valid');
            const displayData = [...errorRows, ...validRows];

            // Render Table
            const tbody = document.getElementById('previewTableBody');
            tbody.innerHTML = '';

            // Tampilkan pesan jika semua valid
            if (errorRows.length === 0) {
                const successMsg = document.createElement('tr');
                successMsg.innerHTML = `
                                                                            <td colspan="7" class="px-4 py-6 text-center bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 font-semibold">
                                                                                ✅ Semua data valid! Tidak ditemukan error.
                                                                            </td>
                                                                        `;
                tbody.appendChild(successMsg);
            }

            displayData.forEach((row, index) => {
                const isError = row.status === 'error';

                const statusBadge = isError
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-md uppercase tracking-wide">
                                                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                                ERROR
                                                                               </span>`
                    : `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded uppercase">
                                                                                ✓ Valid
                                                                               </span>`;

                // Format Error Message
                let errorHtml = '<span class="text-gray-400 italic text-xs">-</span>';
                if (row.errors && row.errors.length > 0) {
                    errorHtml = '<div class="space-y-1">';
                    row.errors.forEach(err => {
                        errorHtml += `<div class="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 p-2 rounded shadow-sm text-sm font-medium leading-snug">
                                                                                    ${escapeHtml(err)}
                                                                                </div>`;
                    });
                    errorHtml += '</div>';
                }

                const tr = document.createElement('tr');

                if (isError) {
                    tr.className = 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-b-2 border-red-200 dark:border-red-800 transition-all';
                    tr.style.animation = `fadeIn 0.3s ease-out forwards ${index * 0.05}s`;
                } else {
                    tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 transition-all opacity-75';
                }

                tr.innerHTML = `
                                                                            <td class="px-4 py-3 text-center border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                                                                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-bold ${isError ? 'bg-red-600 text-white shadow-lg ring-2 ring-red-300 dark:ring-red-700' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}">
                                                                                    ${row.row_number}
                                                                                </span>
                                                                            </td>
                                                                            <td class="px-3 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                                                                                ${statusBadge}
                                                                            </td>
                                                                            <td class="px-4 py-3 font-mono text-sm border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-red-900 dark:text-red-300 font-bold' : 'text-gray-700 dark:text-gray-300'} whitespace-nowrap">
                                                                                ${escapeHtml(row.ppbj_no || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-600 dark:text-gray-400'} truncate max-w-[200px]" title="${escapeHtml(row.uraian)}">
                                                                                ${escapeHtml(row.uraian || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                                                ${escapeHtml(row.buyer || '-')}
                                                                            </td>
                                                                            <td class="px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 text-right font-mono text-gray-700 dark:text-gray-300">
                                                                                ${row.total_sebelum_ppn ? formatRupiah(row.total_sebelum_ppn) : '-'}
                                                                            </td>
                                                                            <td class="px-4 py-3 align-top w-1/3 min-w-[400px]">
                                                                                ${errorHtml}
                                                                            </td>
                                                                        `;

                tbody.appendChild(tr);
            });

            // Tombol Process Logic
            const hasErrors = result.summary.error > 0;
            const btnProcess = document.getElementById('btnProcess');

            if (hasErrors) {
                btnProcess.disabled = true;
                btnProcess.classList.add('opacity-50', 'cursor-not-allowed');
                btnProcess.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                btnProcess.classList.add('bg-gray-500');
                btnProcess.innerHTML = `🚫 Perbaiki Error Dulu`;

                // Auto scroll ke bagian tabel error
                const tableContainer = document.querySelector('#previewStep .overflow-x-auto');
                if (tableContainer) {
                    tableContainer.scrollTop = 0;
                    const firstRow = tbody.querySelector('tr');
                    if (firstRow) {
                        firstRow.classList.add('ring-4', 'ring-red-400', 'dark:ring-red-600');
                        setTimeout(() => {
                            firstRow.classList.remove('ring-4', 'ring-red-400', 'dark:ring-red-600');
                        }, 1000);
                    }
                }
            } else {
                btnProcess.disabled = false;
                btnProcess.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-500');
                btnProcess.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                btnProcess.innerHTML = `
                                                                            <span id="btnProcessText">✓ Proses Import</span>
                                                                            <span id="btnProcessSpinner" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                                                        `;
            }
        }

        window.processImport = async function () {
            if (previewData.length === 0) {
                toastErr('Error', 'Tidak ada data untuk diimport');
                return;
            }

            const validData = previewData.filter(d => d.status === 'valid');

            if (validData.length === 0) {
                toastErr('Error', 'Tidak ada data valid untuk diimport');
                return;
            }

            const result = await Swal.fire({
                title: 'Konfirmasi Import',
                html: `Akan mengimport <strong>${validData.length}</strong> data.<br>Lanjutkan?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Import',
                cancelButtonText: 'Batal'
            });

            if (!result.isConfirmed) return;

            const btnProcess = document.getElementById('btnProcess');
            const btnProcessText = document.getElementById('btnProcessText');
            const btnProcessSpinner = document.getElementById('btnProcessSpinner');

            btnProcess.disabled = true;
            btnProcessText.textContent = 'Memproses...';
            btnProcessSpinner.classList.remove('hidden');

            try {
                const response = await fetch('{{ route("ppbj.import.process") }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ data: validData })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal import data');
                }

                let message = `Berhasil import ${result.imported} data`;
                if (result.failed > 0) {
                    message += `\nGagal: ${result.failed} data`;
                    if (result.errors && result.errors.length > 0) {
                        message += '\n\nError:\n' + result.errors.join('\n');
                    }
                }

                await Swal.fire({
                    title: 'Import Selesai',
                    text: message,
                    icon: result.failed > 0 ? 'warning' : 'success',
                    confirmButtonColor: '#10B981'
                });

                closeImportModal();
                setTimeout(() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('_t', Date.now());
                    window.location.href = url.toString();
                }, 500);

            } catch (error) {
                toastErr('Error', error.message);
            } finally {
                btnProcess.disabled = false;
                btnProcessText.textContent = '✓ Proses Import';
                btnProcessSpinner.classList.add('hidden');
            }
        };

        // ==========================================
        // MAIN APPLICATION (IIFE)
        // ==========================================
        (function () {
            // ==== DOM refs ====
            const ppbjForm = document.getElementById('ppbjForm');
            const formModal = document.getElementById('formModal');
            const detailModal = document.getElementById('detailModal');
            const detailContent = document.getElementById('detailContent');
            const detailHint = document.getElementById('detailHint');
            const cancelledBanner = document.getElementById('cancelledBanner');
            const cancelReasonText = document.getElementById('cancelReasonText');
            const cancelledByText = document.getElementById('cancelledByText');
            const cancelVerifiedByText = document.getElementById('cancelVerifiedByText');
            const cancelledAtText = document.getElementById('cancelledAtText');
            const detailArchiveCard = document.getElementById('detailArchiveCard');

            const formTitle = document.getElementById('formTitle');
            const ppbjIdInput = document.getElementById('ppbj_id');

            const btnSave = document.getElementById('btnSave');
            const btnSaveSpinner = document.getElementById('btnSaveSpinner');
            const btnSaveText = document.getElementById('btnSaveText');

            const inpPpbjNo = document.getElementById('ppbj_no');
            const errPpbjNo = document.getElementById('err_ppbj_no');
            const hintPpbjNo = document.getElementById('hint_ppbj_no');

            // master modal
            const masterModal = document.getElementById('masterModal');
            const masterTitle = document.getElementById('masterTitle');
            const masterInput = document.getElementById('masterInput');
            const masterList = document.getElementById('masterList');

            // data server
            @php
                $ppbjJsonData = collect($ppbj->items())->keyBy('id')->map(function ($item) {
                    $data = method_exists($item, 'toArray') ? $item->toArray() : (array) $item;
                    $isSlaComplete = method_exists($item, 'isSlaComplete') ? $item->isSlaComplete() : false;
                    if (! method_exists($item, 'isSlaComplete')) {
                        $isCancelled = strtoupper((string) ($data['status'] ?? 'ACTIVE')) === 'CANCELLED';
                        $isSlaComplete = ! $isCancelled
                            && (int) ($data['progres'] ?? 0) === 100
                            && ! empty($data['no_invoice']);
                    }

                    $parseDate = function ($date) {
                        if (! $date) {
                            return null;
                        }

                        try {
                            return \Carbon\Carbon::parse($date);
                        } catch (\Throwable) {
                            return null;
                        }
                    };

                    $startRaw = $data['tgl_diserahkan'] ?: ($data['tgl_terima_pr'] ?: ($data['tgl_ppbj'] ?? null));
                    $startLabel = ! empty($data['tgl_diserahkan'])
                        ? 'Tanggal diserahkan ke Umum'
                        : (! empty($data['tgl_terima_pr'])
                            ? 'Tanggal terima PR'
                            : (! empty($data['tgl_ppbj']) ? 'Tanggal PPBJ / PR' : 'Tanggal awal belum tersedia'));
                    $finishRaw = $data['tgl_invoice'] ?: ($data['tgl_bpb'] ?: ($data['tgl_bpg'] ?: ($data['updated_at'] ?? null)));
                    $finishLabel = ! empty($data['tgl_invoice'])
                        ? 'Tanggal invoice'
                        : (! empty($data['tgl_bpb'])
                            ? 'Tanggal BPB'
                            : (! empty($data['tgl_bpg'])
                                ? 'Tanggal BPG'
                                : (! empty($data['updated_at']) ? 'Tanggal update terakhir' : 'Tanggal selesai belum tersedia')));
                    $startDate = $parseDate($startRaw);
                    $finishDate = $parseDate($finishRaw);
                    $targetDays = (int) ($data['target_sla_hari'] ?? 0);
                    $targetDate = ($startDate && $targetDays > 0) ? $startDate->copy()->addDays($targetDays) : null;
                    $runningDays = $startDate ? max(0, (int) $startDate->diffInDays(now())) : null;
                    $usedDays = ($startDate && $finishDate) ? max(0, (int) $startDate->diffInDays($finishDate)) : null;
                    $finalRemainingDays = $usedDays !== null ? $targetDays - $usedDays : null;
                    $outcomeLabel = null;

                    if ($isSlaComplete) {
                        if ($finalRemainingDays === null) {
                            $outcomeLabel = 'SLA berhenti';
                        } elseif ($finalRemainingDays < 0) {
                            $outcomeLabel = 'Terlambat ' . abs($finalRemainingDays) . ' hari';
                        } elseif ($finalRemainingDays > 0) {
                            $outcomeLabel = 'Lebih cepat ' . $finalRemainingDays . ' hari';
                        } else {
                            $outcomeLabel = 'Tepat SLA';
                        }
                    }

                    $slaExplanation = $isSlaComplete
                        ? 'Pekerjaan sudah lengkap. Perhitungan SLA berhenti.'
                        : 'SLA masih berjalan sampai hari ini.';

                    if ($startDate && $targetDays > 0) {
                        $targetText = $targetDate ? ' Target selesai maksimal ' . $targetDate->translatedFormat('d F Y') . '.' : '';

                        if ($isSlaComplete && $finishDate && $usedDays !== null && $finalRemainingDays !== null) {
                            $result = $finalRemainingDays > 0
                                ? 'selesai lebih awal ' . $finalRemainingDays . ' hari dari target'
                                : ($finalRemainingDays < 0
                                    ? 'selesai terlambat ' . abs($finalRemainingDays) . ' hari dari target'
                                    : 'selesai tepat sesuai target SLA');
                            $slaExplanation = 'SLA dihitung dari ' . $startLabel . ' (' . $startDate->translatedFormat('d F Y') . ') sampai ' . $finishLabel . ' (' . $finishDate->translatedFormat('d F Y') . '). Target ' . $targetDays . ' hari.' . $targetText . ' Realisasi ' . $usedDays . ' hari, sehingga ' . $result . '.';
                        } elseif (! $isSlaComplete) {
                            $remaining = (int) ($data['sisa_target_sla'] ?? 0);
                            $slaExplanation = 'SLA masih berjalan dari ' . $startLabel . ' (' . $startDate->translatedFormat('d F Y') . ') sampai hari ini. Target ' . $targetDays . ' hari.' . $targetText . ' Sudah berjalan ' . ($runningDays ?? 0) . ' hari, ' . ($remaining < 0 ? 'sehingga terlambat ' . abs($remaining) . ' hari.' : 'sisa ' . $remaining . ' hari.');
                        }
                    }

                    $data['status_sla'] = $data['status_sla'] ?? ($isSlaComplete ? 'LENGKAP' : null);
                    $data['sla_is_complete'] = $isSlaComplete;
                    $data['sla_final_label'] = method_exists($item, 'slaFinalLabel')
                        ? $item->slaFinalLabel()
                        : ($isSlaComplete ? 'Selesai' : ((int) ($data['sisa_target_sla'] ?? 0)) . ' hari');
                    $data['sla_outcome_label'] = method_exists($item, 'slaOutcomeLabel')
                        ? $item->slaOutcomeLabel()
                        : $outcomeLabel;
                    $data['sla_used_days'] = method_exists($item, 'slaUsedDays') ? $item->slaUsedDays() : $usedDays;
                    $data['sla_final_remaining_days'] = method_exists($item, 'slaFinalRemainingDays') ? $item->slaFinalRemainingDays() : $finalRemainingDays;
                    $data['sla_start_source_label'] = method_exists($item, 'slaStartSourceLabel') ? $item->slaStartSourceLabel() : $startLabel;
                    $data['sla_finish_source_label'] = method_exists($item, 'slaFinishSourceLabel') ? $item->slaFinishSourceLabel() : $finishLabel;
                    $data['sla_running_days'] = method_exists($item, 'slaRunningDays') ? $item->slaRunningDays() : $runningDays;
                    $data['sla_target_date_label'] = method_exists($item, 'slaTargetDateLabel') ? $item->slaTargetDateLabel() : ($targetDate ? $targetDate->translatedFormat('d F Y') : null);
                    $data['sla_explanation'] = method_exists($item, 'slaExplanation')
                        ? $item->slaExplanation()
                        : $slaExplanation;

                    return $data;
                });
            @endphp
            window.ppbjData = @json($ppbjJsonData);

            // ===== MASTER CONFIG =====
            let currentMasterType = null;

            const masterLabel = {
                buyer: 'Buyer',
                portofolio: 'Portofolio',
                metode_pengadaan: 'Metode Pengadaan',
                penyedia_eksternal: 'Penyedia Eksternal',
            };

            // ===== UTILITY FUNCTIONS =====
            function setFieldError(elInput, elErr, message) {
                if (!elInput || !elErr) return;
                if (!message) {
                    elErr.textContent = '';
                    elErr.classList.add('hidden');
                    elInput.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
                    return;
                }
                elErr.textContent = message;
                elErr.classList.remove('hidden');
                elInput.classList.add('border-red-400', 'ring-2', 'ring-red-300');
            }

            function formatCurrency(input) {
                let value = input.value.replace(/[^\d.]/g, '');
                let parts = value.split('.');
                let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                let decimalPart = parts[1] || '';

                if (parts.length > 1) {
                    decimalPart = decimalPart.substring(0, 2);
                    input.value = integerPart + '.' + decimalPart;
                } else {
                    input.value = integerPart;
                }
            }

            function formatPpbjAuditDate(value) {
                if (!value) return '—';

                const date = new Date(value);
                if (Number.isNaN(date.getTime())) return value;

                return date.toLocaleString('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });
            }

            function toCurrencyString(val) {
                if (!val) return '';
                let num = parseFloat(val);
                if (isNaN(num)) return '';
                return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            function parseToRupiahDisplay(val) {
                if (!val) return '-';
                let num = parseFloat(val);
                if (isNaN(num)) return '-';
                return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            // ===== SELECT2 INIT =====
            // ===== SELECT2 INIT (DIPERBAIKI: Retain Value) =====
            function initSelect2Filter() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia!');
                    return;
                }

                // ✅ STEP 1: Simpan semua value SEBELUM apapun terjadi
                const savedValues = {};
                document.querySelectorAll('select.select2-filter').forEach(function (el) {
                    if (el.name) {
                        savedValues[el.name] = el.value;
                    }
                });

                // ✅ STEP 2: Destroy hanya yang BENAR-BENAR sudah di-init Select2
                document.querySelectorAll('select.select2-filter.select2-hidden-accessible').forEach(function (el) {
                    try {
                        jQuery(el).select2('destroy');
                    } catch (e) {
                        // Ignore error
                    }
                });

                // ✅ STEP 3: Init Select2
                jQuery('.select2-filter').select2({
                    width: '100%',
                    allowClear: true,
                    minimumResultsForSearch: 0,
                    language: {
                        noResults: function () { return "Tidak ada hasil"; },
                        searching: function () { return "Mencari..."; }
                    }
                });

                // ✅ STEP 4: Restore value SETELAH init
                Object.keys(savedValues).forEach(function (name) {
                    var val = savedValues[name];
                    if (val !== null && val !== undefined && val !== '') {
                        var $el = jQuery('select.select2-filter[name="' + name + '"]');
                        if ($el.length) {
                            $el.val(val).trigger('change.select2');
                        }
                    }
                });
            }

            function initSelect2Modal() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia untuk modal!');
                    return;
                }

                setTimeout(() => {
                    // Simpan value sebelum destroy
                    const savedValues = {};
                    $('#formModal .select2').each(function () {
                        const name = this.name;
                        if (name) {
                            savedValues[name] = $(this).val();
                        }
                    });

                    // Destroy yang sudah ada
                    $('#formModal .select2').each(function () {
                        if ($(this).hasClass('select2-hidden-accessible')) {
                            try {
                                $(this).select2('destroy');
                            } catch (e) { }
                        }
                    });

                    // Init
                    $('#formModal .select2').select2({
                        width: '100%',
                        dropdownParent: $('#formModal'),
                        allowClear: true,
                        minimumResultsForSearch: 0,
                        language: {
                            noResults: function () { return "Tidak ada hasil yang cocok"; },
                            searching: function () { return "Mencari..."; }
                        }
                    });

                    // Restore value
                    $('#formModal .select2').each(function () {
                        const name = this.name;
                        if (name && savedValues[name] !== undefined && savedValues[name] !== null && savedValues[name] !== '') {
                            $(this).val(savedValues[name]).trigger('change.select2');
                        }
                    });
                }, 100);
            }

            // ===== TOGGLE DATE INPUTS =====
            window.toggleDateInputs = function () {
                const type = document.getElementById('date_type').value;
                const groups = document.querySelectorAll('.date-input-group');
                const placeholder = document.getElementById('date-placeholder');

                groups.forEach(g => g.classList.add('hidden'));

                if (!type) {
                    placeholder.classList.remove('hidden');
                } else {
                    placeholder.classList.add('hidden');
                    const activeInput = document.getElementById('input-' + type);
                    if (activeInput) {
                        activeInput.classList.remove('hidden');
                        const firstInput = activeInput.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }
                }
            };

            // ===== INIT ON DOM READY =====
            document.addEventListener('DOMContentLoaded', () => {
                toggleDateInputs();
                initSelect2Filter();

                // Cleanup: hapus parameter _t dari URL setelah reload
                const url = new URL(window.location.href);
                if (url.searchParams.has('_t')) {
                    url.searchParams.delete('_t');
                    window.history.replaceState({}, '', url.toString());
                }
            });

            // =========================
            // DRAFT MANAGEMENT
            // =========================
            const DRAFT_KEY = 'ppbj_form_draft_v2';

            function getDraft() {
                try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'); }
                catch { return {}; }
            }

            function setDraft(d) {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(d || {}));
            }

            function clearDraft() {
                localStorage.removeItem(DRAFT_KEY);
            }

            function buildPayloadFromForm() {
                const payload = {};
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    payload[el.name] = (el.value === '' ? null : el.value);
                });
                return payload;
            }

            function applyPayloadToForm(payload) {
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    el.value = payload?.[el.name] ?? '';
                });
            }

            // auto-save draft (debounce)
            let draftTimer = null;
            ppbjForm.addEventListener('input', () => {
                clearTimeout(draftTimer);
                draftTimer = setTimeout(() => setDraft(buildPayloadFromForm()), 300);
            });

            // =========================
            // DETAIL MODAL
            // =========================
            let lastDetailId = null;

            const archiveStateUi = {
                loading: {
                    label: 'Memeriksa',
                    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                    row: 'bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800',
                    dot: 'bg-blue-500 animate-pulse'
                },
                available: {
                    label: 'Arsip tersedia',
                    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                    row: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800',
                    dot: 'bg-emerald-500'
                },
                empty: {
                    label: 'Belum ada arsip',
                    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                    row: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800',
                    dot: 'bg-amber-500'
                },
                unconfigured: {
                    label: 'Belum terhubung',
                    badge: 'bg-slate-200 text-slate-600 dark:bg-gray-700 dark:text-gray-200',
                    row: 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600',
                    dot: 'bg-slate-400'
                },
                unavailable: {
                    label: 'Tidak dapat diperiksa',
                    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                    row: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800',
                    dot: 'bg-red-500'
                }
            };

            function setArchiveState(state, message, ppbjId) {
                const ui = archiveStateUi[state] || archiveStateUi.unavailable;
                const badge = document.getElementById('detailArchiveBadge');
                const messageEl = document.getElementById('detailArchiveMessage');
                const refresh = document.getElementById('detailArchiveRefresh');
                const documents = document.getElementById('detailArchiveDocuments');
                const rowBadge = document.querySelector(`[data-archive-status][data-ppbj-id="${ppbjId}"]`);

                if (badge) {
                    badge.className = `inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${ui.badge}`;
                    badge.textContent = ui.label;
                }
                if (messageEl) messageEl.textContent = message || ui.label;
                if (refresh) refresh.classList.toggle('hidden', state === 'loading' || state === 'unconfigured');
                if (documents) {
                    documents.replaceChildren();
                    documents.classList.add('hidden');
                }
                if (rowBadge) {
                    rowBadge.className = `inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold leading-none ring-1 transition ${ui.row}`;
                    rowBadge.replaceChildren();
                    const dot = document.createElement('span');
                    dot.className = `h-1 w-1 rounded-full ${ui.dot}`;
                    rowBadge.append(dot, document.createTextNode(ui.label));
                }
            }

            function formatArchiveDate(value) {
                if (!value) return null;
                const date = new Date(String(value).replace(' ', 'T'));
                if (Number.isNaN(date.getTime())) return String(value);

                return date.toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            function formatArchiveLocation(location) {
                if (!location || typeof location !== 'object') return null;
                if (location.label) return location.label;

                const parts = [];
                if (location.rak) {
                    parts.push(location.rak);
                } else if (location.rak_number) {
                    parts.push(`Rak ${location.rak_number}`);
                }
                if (location.tingkat) parts.push(`Tingkat ${location.tingkat}`);
                if (location.box) parts.push(`Box ${location.box}`);
                if (location.box_code) parts.push(`Kode ${location.box_code}`);

                return parts.filter(Boolean).join(' • ') || null;
            }

            function renderArchiveDocuments(documents, packages = []) {
                const list = document.getElementById('detailArchiveDocuments');
                if (!list || !Array.isArray(documents) || !documents.length) return;

                if (Array.isArray(packages) && packages.length) {
                    packages.forEach((packageItem) => {
                        if (!packageItem?.package_download_url) return;

                        const packageCard = document.createElement('div');
                        packageCard.className = 'flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-700/50 dark:bg-emerald-900/20';

                        const info = document.createElement('div');
                        info.className = 'min-w-0 flex-1';

                        const title = document.createElement('p');
                        title.className = 'text-sm font-bold text-emerald-900 dark:text-emerald-100';
                        title.textContent = 'Paket arsip lengkap PR/PPBJ';

                        const meta = document.createElement('p');
                        meta.className = 'mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-200';
                        const fileCount = Number(packageItem.file_count || 0);
                        meta.textContent = [
                            packageItem.document_number || packageItem.name || 'Paket arsip',
                            fileCount ? `${fileCount} file siap audit` : null,
                        ].filter(Boolean).join(' • ');

                        info.append(title, meta);

                        const link = document.createElement('a');
                        link.href = packageItem.package_download_url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'inline-flex shrink-0 items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700';
                        link.textContent = 'ZIP Paket';

                        packageCard.append(info, link);
                        list.append(packageCard);
                    });
                }

                documents.forEach((documentItem) => {
                    const item = document.createElement('div');
                    item.className = 'flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800';

                    const info = document.createElement('div');
                    info.className = 'min-w-0 flex-1';
                    const name = document.createElement('p');
                    name.className = 'truncate text-sm font-semibold text-gray-800 dark:text-white';
                    name.textContent = documentItem.name || 'Dokumen arsip';
                    const meta = document.createElement('p');
                    meta.className = 'mt-1 text-[11px] text-gray-500 dark:text-gray-400';
                    meta.textContent = [documentItem.type, documentItem.size, formatArchiveDate(documentItem.date)]
                        .filter(Boolean).join(' • ') || 'Dokumen';
                    info.append(name, meta);

                    const locationText = formatArchiveLocation(documentItem.location);
                    if (locationText) {
                        const location = document.createElement('p');
                        location.className = 'mt-1 inline-flex flex-wrap items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-200';
                        location.textContent = `Lokasi fisik: ${locationText}`;
                        info.append(location);
                    }

                    item.append(info);

                    const previewUrl = documentItem.preview_url || documentItem.download_url;
                    if (previewUrl) {
                        const link = document.createElement('a');
                        link.href = previewUrl;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'inline-flex shrink-0 items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700';
                        link.textContent = 'Preview';
                        item.append(link);
                    }

                    list.append(item);
                });

                list.classList.remove('hidden');
            }

            async function loadPpbjArchive(id, fresh = false) {
                setArchiveState('loading', 'Menghubungi sistem arsip menggunakan nomor PPBJ/PR...', id);

                try {
                    const response = await fetch(`/ppbj/${id}/archive${fresh ? '?refresh=1' : ''}`, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    if (!response.ok) throw new Error('Status arsip gagal diperiksa.');

                    const archive = await response.json();
                    setArchiveState(archive.state, archive.message, id);
                    renderArchiveDocuments(archive.documents || [], archive.packages || []);
                } catch (error) {
                    setArchiveState('unavailable', error.message || 'Sistem arsip sedang tidak dapat dihubungi.', id);
                }
            }

            window.openDetail = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                lastDetailId = id;
                const isCancelled = String(d.status ?? 'ACTIVE').toUpperCase() === 'CANCELLED';

                cancelledBanner.classList.add('hidden');
                detailContent.classList.add('hidden');
                detailArchiveCard?.classList.add('hidden');

                if (isCancelled) {
                    detailHint.textContent = 'Status: CANCELLED';
                    const reason = (d.cancel_reason ?? '').toString().trim();
                    if (cancelReasonText) cancelReasonText.textContent = reason ? reason : '—';
                    if (cancelledByText) cancelledByText.textContent = d.cancelled_by_name || '—';
                    if (cancelVerifiedByText) cancelVerifiedByText.textContent = d.cancel_verified_by_name || '—';
                    if (cancelledAtText) cancelledAtText.textContent = formatPpbjAuditDate(d.cancelled_at);
                    cancelledBanner.classList.remove('hidden');
                } else {
                    detailHint.textContent = '';
                    renderDetail(d);
                    detailContent.classList.remove('hidden');
                }

                detailModal.classList.remove('hidden');
                detailModal.classList.add('flex');
            };

            window.openArchiveDetail = function (id) {
                window.openDetail(id);
                detailArchiveCard?.classList.remove('hidden');
                loadPpbjArchive(id);
                setTimeout(() => detailArchiveCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            };

            window.refreshCurrentPpbjArchive = function () {
                if (lastDetailId) loadPpbjArchive(lastDetailId, true);
            };

            function renderDetail(d) {
                let html = '';
                const currencyKeys = ['total_sebelum_ppn', 'nilai_sp_spk', 'nilai_bpg'];
                const hiddenDetailKeys = new Set([
                    'sla_is_complete',
                    'sla_final_label',
                    'sla_outcome_label',
                    'sla_used_days',
                    'sla_final_remaining_days',
                    'sla_start_source_label',
                    'sla_finish_source_label',
                    'sla_running_days',
                    'sla_target_date_label',
                    'sla_explanation',
                ]);
                const detailLabelMap = {
                    ppbj_no: 'Nomor PPBJ / PR',
                    tgl_ppbj: 'Tanggal PPBJ / PR',
                    tgl_terima_pr: 'Tanggal Terima PR',
                    uraian: 'Uraian',
                    portofolio: 'Portofolio',
                    buyer: 'Buyer',
                    total_sebelum_ppn: 'Nilai PR',
                    target_sla_hari: 'Target SLA',
                    sisa_target_sla: 'Sisa SLA',
                    realisasi_sla: 'Realisasi SLA',
                    status_sla: 'Status SLA',
                    progres: 'Progress',
                    no_invoice: 'Nomor Invoice',
                    tgl_invoice: 'Tanggal Invoice',
                    penyedia_eksternal: 'Penyedia Eksternal',
                    nilai_sp_spk: 'Nilai SP/SPK',
                    nilai_bpg: 'Nilai BPG',
                };
                const slaResultLabel = d.sla_outcome_label || (d.sla_is_complete ? 'SLA berhenti' : d.sla_final_label || '-');
                const slaResultClass = d.sla_is_complete
                    ? 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-500/30'
                    : (Number(d.sisa_target_sla || 0) < 0
                        ? 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30'
                        : 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30');

                html += `
                    <div class="md:col-span-2 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 shadow-sm dark:border-blue-500/30 dark:from-blue-950/40 dark:via-gray-800 dark:to-emerald-950/30">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">Audit SLA</div>
                                <div class="mt-1 text-base font-black text-gray-900 dark:text-white">Ringkasan perhitungan sisa SLA</div>
                            </div>
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${slaResultClass}">
                                ${escapeHtml(slaResultLabel)}
                            </span>
                        </div>

                        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Target</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.target_sla_hari ?? '-')} hari</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Deadline</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_target_date_label || '-')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mulai hitung</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_start_source_label || '-')}</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">${d.sla_is_complete ? 'Realisasi' : 'Berjalan'}</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml((d.sla_is_complete ? d.sla_used_days : d.sla_running_days) ?? '-')} hari</div>
                            </div>
                            <div class="rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                                <div class="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status hitung</div>
                                <div class="mt-1 text-sm font-black text-slate-900 dark:text-white">${escapeHtml(d.sla_final_label || '-')}</div>
                            </div>
                        </div>

                        <p class="mt-4 rounded-xl border border-blue-100 bg-white/75 p-3 text-sm font-semibold leading-relaxed text-slate-700 dark:border-blue-500/20 dark:bg-gray-950/30 dark:text-slate-200">
                            ${escapeHtml(d.sla_explanation || 'Penjelasan SLA belum tersedia.')}
                        </p>
                    </div>
                `;

                Object.entries(d).forEach(([k, v]) => {
                    if (k === 'id') return;
                    if (hiddenDetailKeys.has(k)) return;

                    let displayVal = v ?? '-';
                    if (currencyKeys.includes(k) && v !== null) {
                        displayVal = parseToRupiahDisplay(v);
                    }
                    if (k === 'sisa_target_sla') {
                        const parts = [
                            d.sla_final_label || (v !== null && v !== undefined ? `${v} hari` : '-'),
                            d.sla_outcome_label || null,
                        ].filter(Boolean);
                        displayVal = parts.join(' • ');
                    }
                    if (k === 'realisasi_sla' && d.sla_is_complete && d.sla_used_days !== null && d.sla_used_days !== undefined) {
                        displayVal = `${d.sla_used_days} hari`;
                    }
                    if (k === 'target_sla_hari' && v !== null && v !== undefined && v !== '-') {
                        displayVal = `${v} hari`;
                    }
                    if (k === 'progres' && v !== null && v !== undefined && v !== '-') {
                        displayVal = `${v}%`;
                    }

                    html += `
                                                                                <div class="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-xl">
                                                                                    <div class="text-[11px] text-gray-500 dark:text-gray-400">${escapeHtml(detailLabelMap[k] || k)}</div>
                                                                                    <div class="font-semibold break-all text-gray-800 dark:text-gray-200">${escapeHtml(displayVal)}</div>
                                                                                </div>
                                                                            `;
                });
                detailContent.innerHTML = html;
            }

            window.showCancelledDetail = function () {
                const d = window.ppbjData?.[lastDetailId];
                if (!d) return;

                cancelledBanner.classList.add('hidden');
                renderDetail(d);
                detailContent.classList.remove('hidden');
            };

            window.closeDetail = function () {
                detailModal.classList.add('hidden');
                detailModal.classList.remove('flex');
            };

            // =========================
            // FORM MODAL
            // =========================
            window.openCreateForm = function () {
                Swal.fire({
                    html: `
                                                                                <div class="ppbj-warning-wrapper">
                                                                                    <div class="ppbj-warning-icon-wrap">
                                                                                        <div class="ppbj-warning-ring"></div>
                                                                                        <div class="ppbj-warning-icon">⚠️</div>
                                                                                    </div>

                                                                                    <h3 class="ppbj-warning-title">Perhatian Sebelum Menambah PPBJ</h3>

                                                                                    <div class="ppbj-warning-card">
                                                                                        <div class="ppbj-warning-row">
                                                                                            <div class="ppbj-warning-step">1</div>
                                                                                            <p>Silahkan cek di 
                                                                                            <a href="/approval/pr-receipts" target="_blank" class="ppbj-warning-link">Menu Approval PR</a> 
                                                                                            terlebih dahulu
                                                                                        </p>
                                                                                        </div>
                                                                                        <div class="ppbj-warning-row">
                                                                                            <div class="ppbj-warning-step">2</div>
                                                                                            <p>Pastikan <strong>nomor PR</strong> yang akan digunakan sudah ada</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="ppbj-warning-alert">
                                                                                        <div class="ppbj-warning-alert-icon">🚫</div>
                                                                                        <p>Jangan sampai anda mengabaikan langkah ini!</p>
                                                                                    </div>
                                                                                </div>
                                                                            `,
                    showConfirmButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Mengerti',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: 'ppbj-swal-popup',
                        confirmButton: 'ppbj-swal-btn'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearDraft();
                        ppbjForm.reset();
                        ppbjIdInput.value = '';
                        formTitle.innerText = 'Tambah PPBJ';

                        formModal.classList.remove('hidden');
                        formModal.classList.add('flex');

                        setTimeout(() => {
                            initSelect2Modal();
                            ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                                $(`#${f}`).val('').trigger('change');
                            });
                        }, 50);
                    }
                });
            };

            window.openEditForm = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                ppbjForm.reset();
                ppbjIdInput.value = d.id;
                formTitle.innerText = 'Edit PPBJ';

                setFieldError(inpPpbjNo, errPpbjNo, null);
                if (hintPpbjNo) hintPpbjNo.classList.add('hidden');

                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;

                    if (el.classList.contains('currency-input')) {
                        el.value = toCurrencyString(d[el.name]);
                    } else {
                        el.value = d[el.name] ?? '';
                    }
                });

                formModal.classList.remove('hidden');
                formModal.classList.add('flex');
                setTimeout(() => {
                    initSelect2Modal();
                    ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                        $(`#${f}`).val(d[f] ?? '').trigger('change');
                    });
                }, 50);
            };

            window.closeForm = function () {
                removeApprovalWarning();
                formModal.classList.add('hidden');
                formModal.classList.remove('flex');
            };

            function setSaving(isSaving) {
                if (isSaving) {
                    btnSaveSpinner.classList.remove('hidden');
                    btnSaveText.textContent = 'Menyimpan...';
                    btnSave.disabled = true;
                    btnSave.classList.add('opacity-80', 'cursor-not-allowed');
                } else {
                    btnSaveSpinner.classList.add('hidden');
                    btnSaveText.textContent = 'Simpan';
                    btnSave.disabled = false;
                    btnSave.classList.remove('opacity-80', 'cursor-not-allowed');
                }
            }

            // =========================
            // UNIQUE PPBJ NO CHECK
            // =========================
            function normalizeNo(v) {
                return String(v ?? '').trim().toUpperCase();
            }

            function existsOnPage(ppbjNo, ignoreId) {
                const needle = normalizeNo(ppbjNo);
                if (!needle) return false;
                const items = window.ppbjData || {};
                return Object.values(items).some(it => {
                    const itNo = normalizeNo(it?.ppbj_no);
                    if (!itNo) return false;
                    if (ignoreId && String(it?.id) === String(ignoreId)) return false;
                    return itNo === needle;
                });
            }

            let checkTimer = null;
            let lastChecked = '';
            let lastServerKnownDuplicate = false;
            let approvalWarningBanner = null;

            function showApprovalWarning(data) {
                removeApprovalWarning();

                const statusLabel = {
                    'PENDING': { text: 'MENUNGGU PERSETUJUAN UMUM', icon: '⏳', color: 'amber' },
                };
                const s = statusLabel[data.approval_status] ?? { text: data.approval_status ?? '—', icon: '⚠️', color: 'amber' };

                const palette = {
                    amber: {
                        wrap: 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 dark:border-amber-600',
                        title: 'text-amber-800 dark:text-amber-200',
                        body: 'text-amber-700 dark:text-amber-300',
                        badge: 'bg-amber-100 dark:bg-amber-800/60 text-amber-800 dark:text-amber-200',
                        link: 'text-amber-800 dark:text-amber-200 underline font-bold hover:opacity-80',
                    },
                    green: {
                        wrap: 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600',
                        title: 'text-green-800 dark:text-green-200',
                        body: 'text-green-700 dark:text-green-300',
                        badge: 'bg-green-100 dark:bg-green-800/60 text-green-800 dark:text-green-200',
                        link: 'text-green-800 dark:text-green-200 underline font-bold hover:opacity-80',
                    },
                    red: {
                        wrap: 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600',
                        title: 'text-red-800 dark:text-red-200',
                        body: 'text-red-700 dark:text-red-300',
                        badge: 'bg-red-100 dark:bg-red-800/60 text-red-800 dark:text-red-200',
                        link: 'text-red-800 dark:text-red-200 underline font-bold hover:opacity-80',
                    },
                };
                const c = palette[s.color] ?? palette.amber;

                const banner = document.createElement('div');
                banner.id = 'approvalWarningBanner';
                banner.className = `md:col-span-2 rounded-xl border-l-4 p-4 mt-1 ${c.wrap}`;
                banner.style.animation = 'pop .18s ease-out';

                banner.innerHTML = `
                                                                            <div class="flex items-start gap-3">
                                                                                <div class="text-2xl flex-shrink-0 mt-0.5 select-none">${s.icon}</div>
                                                                                <div class="flex-1 min-w-0 space-y-3">
                                                                                    <div class="font-bold text-sm ${c.title}">
                                                                                        Nomor ini sudah terdaftar di Menu Approval PR
                                                                                    </div>
                                                                                    <div class="text-xs ${c.body} space-y-1">
                                                                                        <div class="flex flex-wrap items-center gap-2">
                                                                                            <span>Status Approval:</span>
                                                                                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${c.badge}">
                                                                                                ${s.icon} ${s.text}
                                                                                            </span>
                                                                                        </div>
                                                                                        ${data.requested_by ? `<div>Diajukan oleh: <strong>${escapeHtml(data.requested_by)}</strong></div>` : ''}
                                                                                        ${data.requested_at ? `<div>Tanggal pengajuan: <strong>${escapeHtml(data.requested_at)}</strong></div>` : ''}
                                                                                        ${data.rejected_reason ? `<div class="mt-1 italic">Alasan ditolak: <strong>${escapeHtml(data.rejected_reason)}</strong></div>` : ''}
                                                                                    </div>
                                                                                    <div class="rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-3 text-xs ${c.body} space-y-2">
                                                                                        <div class="font-bold ${c.title}">📋 Alur SOP yang Benar:</div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                                                                                            <span>Tim Operasional mengajukan PR ke bagian Umum</span>
                                                                                        </div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                                                                                            <span>Umum menyetujui / menolak PR di
                                                                                                <a href="/approval/pr-receipts" target="_blank" class="${c.link}">Menu Approval PR ↗</a>
                                                                                            </span>
                                                                                        </div>
                                                                                        <div class="flex items-start gap-2">
                                                                                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                                                                                            <span>Setelah disetujui, data PPBJ akan <strong>otomatis terbuat</strong> oleh sistem</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex items-center gap-2 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-3 py-2.5">
                                                                                        <span class="text-base flex-shrink-0">🚫</span>
                                                                                        <span class="text-xs font-bold text-red-700 dark:text-red-300">
                                                                                        Nomor ini sedang <u>menunggu persetujuan Umum</u>. Setelah disetujui,
                                                                                        PPBJ akan otomatis terbuat — tidak perlu tambah manual.
                                                                                    </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        `;

                const ppbjNoWrapper = inpPpbjNo.closest('[class*="col-span"]') ?? inpPpbjNo.parentElement;
                ppbjNoWrapper.insertAdjacentElement('afterend', banner);
                approvalWarningBanner = banner;
            }

            function removeApprovalWarning() {
                const old = document.getElementById('approvalWarningBanner');
                if (old) old.remove();
                approvalWarningBanner = null;
            }

            async function checkPpbjNoUnique() {
                const id = ppbjIdInput.value || null;
                const v = (inpPpbjNo.value || '').trim();

                lastServerKnownDuplicate = false;
                removeApprovalWarning();

                if (!v) {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                    return;
                }

                if (existsOnPage(v, id)) {
                    setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada (terdeteksi di halaman ini).');
                    return;
                } else {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                }

                if (hintPpbjNo) hintPpbjNo.classList.remove('hidden');

                try {
                    const qs = new URLSearchParams({ ppbj_no: v, ignore_id: id || '' });
                    const res = await fetch(`/ppbj/check-ppbj-no?${qs.toString()}`, {
                        headers: { 'X-Requested-With': 'XMLHttpRequest' }
                    });

                    if (!res.ok) return;

                    const j = await res.json();

                    if (j?.exists_in_approval) {
                        lastServerKnownDuplicate = true;
                        setFieldError(inpPpbjNo, errPpbjNo, 'Nomor ini sudah terdaftar di Approval PR. Lihat panduan di bawah.');
                        showApprovalWarning(j.approval_detail ?? {});
                        return;
                    }

                    if (j?.exists) {
                        lastServerKnownDuplicate = true;
                        setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada.');
                    } else {
                        setFieldError(inpPpbjNo, errPpbjNo, null);
                    }

                } catch (e) {
                    // silent
                } finally {
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                }
            }

            function scheduleCheckUnique() {
                const now = normalizeNo(inpPpbjNo.value);
                if (!now) return;
                if (now === lastChecked) return;

                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    lastChecked = now;
                    await checkPpbjNoUnique();
                }, 350);
            }

            inpPpbjNo?.addEventListener('input', scheduleCheckUnique);
            inpPpbjNo?.addEventListener('blur', () => checkPpbjNoUnique());

            // Currency input handler
            document.addEventListener('input', function (e) {
                if (e.target.classList.contains('currency-input')) {
                    formatCurrency(e.target);
                }
            });

            // =========================
            // FORM SUBMIT
            // =========================
            ppbjForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                await checkPpbjNoUnique();
                const hasClientError = !errPpbjNo.classList.contains('hidden');
                if (hasClientError || lastServerKnownDuplicate) {
                    toastErr('Tidak bisa disimpan', 'No PPBJ sudah ada.');
                    inpPpbjNo.focus();
                    return;
                }

                const id = ppbjIdInput.value;
                const payload = buildPayloadFromForm();

                setSaving(true);
                setFieldError(inpPpbjNo, errPpbjNo, null);

                fetch(id ? `/ppbj/${id}` : '/ppbj', {
                    method: id ? 'PUT' : 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(async (r) => {
                        if (r.ok) {
                            if (!id) clearDraft();
                            toastOk('Tersimpan', 'Data berhasil disimpan');

                            setTimeout(() => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('_t', Date.now());
                                window.location.href = url.toString();
                            }, 500);
                            return;
                        }

                        if (r.status === 422) {
                            const j = await r.json().catch(() => ({}));
                            const err = j?.errors || {};
                            const msgPpbj = (err?.ppbj_no && err.ppbj_no[0]) ? err.ppbj_no[0] : null;
                            if (msgPpbj) setFieldError(inpPpbjNo, errPpbjNo, msgPpbj);
                            toastErr('Validasi gagal', j?.message || 'Cek input Anda');
                            setSaving(false);
                            return;
                        }

                        const j = await r.json().catch(() => ({}));
                        throw new Error(j?.message || 'Request gagal');
                    })
                    .catch((e) => {
                        setSaving(false);
                        toastErr('Gagal', e?.message || 'Gagal menyimpan data');
                    });
            });

            // =========================
            // CANCEL FUNCTIONALITY
            // =========================
            function paintRowCancelled(id, reason, audit = {}) {
                const row = document.getElementById(`row_${id}`);
                if (!row) return;

                const pill = row.querySelector('.cancelled-pill');
                if (pill) pill.classList.remove('hidden');

                const badge = row.querySelector('.status-badge');
                if (badge) {
                    badge.textContent = 'CANCELLED';
                    badge.classList.remove('bg-green-600', 'bg-yellow-500', 'bg-red-600');
                    badge.classList.add('bg-gray-600');
                }

                const actionsWrap = row.querySelector('.row-actions');
                if (actionsWrap) {
                    actionsWrap.parentElement.innerHTML = `<span class="text-xs text-gray-400">—</span>`;
                }

                if (window.ppbjData && window.ppbjData[id]) {
                    window.ppbjData[id].status = 'CANCELLED';
                    window.ppbjData[id].status_sla = 'CANCELLED';
                    window.ppbjData[id].cancel_reason = reason || window.ppbjData[id].cancel_reason || null;
                    window.ppbjData[id].cancelled_at = audit.cancelled_at || window.ppbjData[id].cancelled_at || null;
                    window.ppbjData[id].cancelled_by_user_id = audit.cancelled_by_user_id || window.ppbjData[id].cancelled_by_user_id || null;
                    window.ppbjData[id].cancel_verified_by_user_id = audit.cancel_verified_by_user_id || window.ppbjData[id].cancel_verified_by_user_id || null;
                    window.ppbjData[id].cancelled_by_name = audit.cancelled_by_name || window.ppbjData[id].cancelled_by_name || '—';
                    window.ppbjData[id].cancel_verified_by_name = audit.cancel_verified_by_name || window.ppbjData[id].cancel_verified_by_name || '—';
                }
            }

            window.cancelData = function (id) {
                const doCancel = (reason, creatorPassword) => fetch(`/ppbj/${id}/cancel`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ reason, creator_password: creatorPassword })
                }).then(async (r) => {
                    const body = await r.json().catch(() => ({}));

                    if (!r.ok) {
                        let msg = body?.message || 'Cancel gagal';

                        if (body?.locked_until) {
                            const unlockAt = new Date(body.locked_until);
                            if (!Number.isNaN(unlockAt.getTime())) {
                                msg += ` Bisa dicoba lagi: ${unlockAt.toLocaleString('id-ID', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false,
                                })}.`;
                            }
                        }

                        throw new Error(msg);
                    }

                    return body;
                });

                if (window.Swal) {
                    const isDark = document.documentElement.classList.contains('dark');
                    const popupBg = isDark ? '#111827' : '#ffffff';
                    const textColor = isDark ? '#f8fafc' : '#111827';
                    const mutedColor = isDark ? '#cbd5e1' : '#475569';
                    const inputBg = isDark ? '#1f2937' : '#f8fafc';
                    const borderColor = isDark ? '#475569' : '#cbd5e1';

                    Swal.fire({
                        title: 'Cancel Data?',
                        icon: 'warning',
                        html: `
                            <div style="text-align:left;display:grid;gap:12px;color:${textColor};font-family:Montserrat,Inter,system-ui,sans-serif">
                                <div style="border:1px solid ${isDark ? '#7f1d1d' : '#fecaca'};background:${isDark ? '#450a0a' : '#fff1f2'};color:${isDark ? '#fecaca' : '#991b1b'};border-radius:14px;padding:12px 14px;font-size:13px;line-height:1.55">
                                    <strong>Data tidak dihapus permanen.</strong><br>
                                    Status akan berubah menjadi <strong>CANCELLED</strong> agar riwayat audit tetap aman.
                                </div>

                                <label for="ppbjCancelReason" style="font-weight:800;font-size:13px">Alasan cancel <span style="color:#ef4444">*</span></label>
                                <textarea id="ppbjCancelReason" maxlength="500" placeholder="Contoh: PR dibatalkan / vendor tidak sanggup / revisi kebutuhan..." style="width:100%;min-height:96px;resize:vertical;border-radius:14px;border:1px solid ${borderColor};background:${inputBg};color:${textColor};padding:12px 14px;outline:none"></textarea>

                                <label for="ppbjCancelPassword" style="font-weight:800;font-size:13px">Password pembuat PPBJ <span style="color:#ef4444">*</span></label>
                                <div style="display:flex;gap:8px;align-items:center;border-radius:14px;border:1px solid ${borderColor};background:${inputBg};padding:6px">
                                    <input id="ppbjCancelPassword" type="password" placeholder="Masukkan password pembuat PPBJ" style="flex:1;min-width:0;border:0;background:transparent;color:${textColor};padding:8px;outline:none">
                                    <button type="button" id="ppbjCancelTogglePassword" style="border:0;border-radius:10px;background:#2563eb;color:white;padding:8px 12px;font-weight:800;font-size:12px;cursor:pointer">Lihat</button>
                                </div>

                                <div style="border:1px solid ${isDark ? '#92400e' : '#fed7aa'};background:${isDark ? '#431407' : '#fffbeb'};color:${isDark ? '#fed7aa' : '#92400e'};border-radius:14px;padding:10px 12px;font-size:12px;line-height:1.5">
                                    Jika salah 3 kali, aksi cancel akan dikunci 15 menit demi keamanan data.
                                </div>
                            </div>
                        `,
                        showCancelButton: true,
                        confirmButtonColor: '#dc2626',
                        cancelButtonColor: '#9ca3af',
                        confirmButtonText: 'Ya, cancel',
                        cancelButtonText: 'Batal',
                        background: popupBg,
                        color: textColor,
                        didOpen: () => {
                            const passwordInput = document.getElementById('ppbjCancelPassword');
                            const toggle = document.getElementById('ppbjCancelTogglePassword');
                            const reasonInput = document.getElementById('ppbjCancelReason');
                            if (reasonInput) reasonInput.focus();
                            if (toggle && passwordInput) {
                                toggle.addEventListener('click', () => {
                                    const shown = passwordInput.type === 'text';
                                    passwordInput.type = shown ? 'password' : 'text';
                                    toggle.textContent = shown ? 'Lihat' : 'Tutup';
                                });
                            }
                        },
                        preConfirm: () => {
                            const reason = (document.getElementById('ppbjCancelReason')?.value || '').trim();
                            const password = (document.getElementById('ppbjCancelPassword')?.value || '').trim();

                            if (!reason) {
                                Swal.showValidationMessage('Alasan cancel wajib diisi');
                                return false;
                            }
                            if (reason.length < 3) {
                                Swal.showValidationMessage('Alasan minimal 3 karakter');
                                return false;
                            }
                            if (!password) {
                                Swal.showValidationMessage('Password pembuat PPBJ wajib diisi');
                                return false;
                            }

                            Swal.showLoading();

                            return doCancel(reason, password)
                                .then((data) => ({ reason, data }))
                                .catch((e) => {
                                    Swal.showValidationMessage(e.message || 'Cancel gagal');
                                    return false;
                                });
                        }
                    }).then((res) => {
                        if (res.isConfirmed && res.value?.reason) {
                            paintRowCancelled(id, res.value.reason, res.value.data || {});
                            toastOk('Cancelled', 'Status berhasil diubah');
                        }
                    });
                } else {
                    const reason = prompt('Alasan cancel (wajib):');
                    if (!reason || !reason.trim()) return;
                    const password = prompt('Password pembuat PPBJ (wajib):');
                    if (!password) return;
                    doCancel(reason.trim(), password)
                        .then((data) => {
                            paintRowCancelled(id, reason.trim(), data || {});
                            alert('Berhasil cancel');
                        })
                        .catch(e => alert(e.message));
                }
            };

            // =========================
            // MASTER CRUD
            // =========================
            window.openMaster = function (type) {
                currentMasterType = type;
                masterTitle.innerText = `Kelola Master ${masterLabel[type] ?? type}`;
                masterInput.value = '';
                masterModal.classList.remove('hidden');
                masterModal.classList.add('flex');
                loadMaster();
            };

            window.closeMaster = function () {
                if (masterModal) {
                    masterModal.classList.add('hidden');
                    masterModal.classList.remove('flex');
                }
            };

            function loadMaster() {
                fetch(`/master/${currentMasterType}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        masterList.innerHTML = items.map(i => `
                                                                                    <div class="flex items-center gap-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl p-2">
                                                                                        <input class="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                                                            value="${escapeHtml(i.nama)}"
                                                                                            onkeydown="if(event.key==='Enter'){event.preventDefault();updateMaster(${i.id}, this.value)}">
                                                                                        <button type="button"
                                                                                            class="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                                                                            onclick="updateMaster(${i.id}, this.previousElementSibling.value)">Simpan</button>
                                                                                        <button type="button"
                                                                                            class="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                                                                                            onclick="deleteMaster(${i.id})">Hapus</button>
                                                                                    </div>
                                                                                `).join('');
                    });
            }

            window.addMaster = function () {
                const nama = masterInput.value.trim();
                if (!nama) return;

                fetch(`/master/${currentMasterType}`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Berhasil ditambahkan') {
                            const select = document.getElementById(currentMasterType);
                            const newOption = document.createElement("option");
                            newOption.value = escapeHtml(data.item.nama);
                            newOption.textContent = escapeHtml(data.item.nama);
                            select.appendChild(newOption);
                            select.value = newOption.value;

                            toastErr('Sukses', 'Data berhasil ditambahkan');
                            closeMaster();
                        } else {
                            toastErr('Gagal', 'Data tidak berhasil ditambahkan');
                        }
                    })
                    .catch(() => toastErr('Error', 'Terjadi kesalahan saat mengirim data'));
            };

            window.updateMaster = function (id, nama) {
                if (!nama || nama.trim() === '') {
                    toastErr('Gagal', 'Nama tidak boleh kosong');
                    return;
                }

                fetch(`/master/${currentMasterType}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama: nama.trim() })
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => Promise.reject(err));
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.message) {
                            toastErr('Sukses', data.message);
                            refreshDropdown(currentMasterType);
                            closeMaster();
                        } else {
                            toastErr('Gagal', data.message || 'Data tidak berhasil diperbarui');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        let message = 'Terjadi kesalahan saat mengupdate data';
                        if (error.errors) {
                            message = Object.values(error.errors).flat().join(', ');
                        } else if (error.message) {
                            message = error.message;
                        }
                        toastErr('Error', message);
                    });
            };

            window.deleteMaster = function (id) {
                Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: "Data yang dihapus tidak bisa dipulihkan!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, hapus!',
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/master/${currentMasterType}/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    return response.json().then(err => Promise.reject(err));
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.message) {
                                    toastErr('Sukses', data.message);
                                    closeMaster();
                                    refreshDropdown(currentMasterType);
                                } else {
                                    toastErr('Gagal', data.message || 'Terjadi kesalahan saat menghapus data');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                const message = error.message || 'Terjadi kesalahan saat menghapus data';
                                toastErr('Error', message);
                            });
                    }
                });
            };

            function refreshDropdown(type) {
                fetch(`/master/${type}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        const select = document.getElementById(type);
                        if (!select) return;

                        const currentValue = select.value;
                        select.innerHTML = `<option value="">-- pilih --</option>` +
                            items.map(i => `<option value="${escapeHtml(i.nama)}">${escapeHtml(i.nama)}</option>`).join('');
                        select.value = currentValue;

                        setTimeout(() => {
                            initSelect2Modal();
                            if (window.jQuery) $(`#${type}`).val(currentValue).trigger('change');
                        }, 100);
                    })
                    .catch(err => {
                        console.error('Error refreshing dropdown:', err);
                    });
            }

        })();
    </script>

    <style>
        mark.search-hl {
            background-color: #fef08a;
            color: #713f12;
            border-radius: 2px;
            padding: 0 2px;
            font-weight: 600;
        }

        .dark mark.search-hl {
            background-color: #854d0e;
            color: #fef9c3;
        }

        /* Select2 styling */
        .select2-container .select2-selection--single {
            height: 42px !important;
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            padding: 8px 12px !important;
            background-color: #fff;
            color: #111827;
        }

        /* PPBJ Warning Popup */
        .ppbj-swal-popup {
            border-radius: 20px !important;
            padding: 0 !important;
            max-width: 440px !important;
            width: 92vw !important;
        }

        .ppbj-swal-popup.swal2-show {
            animation: ppbjPopIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .ppbj-swal-popup.swal2-hide {
            animation: swal2-hide 0.2s ease-in forwards !important;
        }

        @keyframes ppbjPopIn {
            0% {
                opacity: 0;
                transform: scale(0.85) translateY(20px);
            }

            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .ppbj-warning-wrapper {
            padding: 32px 28px 24px;
            text-align: center;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .ppbj-warning-icon-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .ppbj-warning-icon {
            font-size: 42px;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3));
            animation: ppbjIconBounce 0.6s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes ppbjIconBounce {
            0% {
                transform: scale(0) rotate(-15deg);
            }

            100% {
                transform: scale(1) rotate(0deg);
            }
        }

        .ppbj-warning-ring {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid #fbbf24;
            opacity: 0.25;
            animation: ppbjRingPulse 2s ease-in-out infinite;
        }

        @keyframes ppbjRingPulse {

            0%,
            100% {
                transform: scale(1);
                opacity: 0.25;
            }

            50% {
                transform: scale(1.15);
                opacity: 0.08;
            }
        }

        .ppbj-warning-title {
            font-size: 17px;
            font-weight: 700;
            color: #111827;
            margin: 0 0 18px;
            line-height: 1.4;
            animation: ppbjFadeUp 0.5s 0.15s both;
        }

        @keyframes ppbjFadeUp {
            0% {
                opacity: 0;
                transform: translateY(12px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .ppbj-warning-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px 18px;
            margin-bottom: 16px;
            text-align: left;
            animation: ppbjFadeUp 0.5s 0.25s both;
        }

        .ppbj-warning-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 6px 0;
        }

        .ppbj-warning-row+.ppbj-warning-row {
            border-top: 1px dashed #cbd5e1;
            margin-top: 6px;
            padding-top: 12px;
        }

        .ppbj-warning-step {
            flex-shrink: 0;
            width: 26px;
            height: 26px;
            border-radius: 8px;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: #fff;
            font-size: 12px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1px;
        }

        .ppbj-warning-row p {
            margin: 0;
            font-size: 13.5px;
            color: #475569;
            line-height: 1.55;
        }

        .ppbj-warning-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            transition: color 0.2s ease;
        }

        .ppbj-warning-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 2px;
            background: #2563eb;
            border-radius: 2px;
            opacity: 0.4;
            transition: opacity 0.2s ease;
        }

        .ppbj-warning-link:hover {
            color: #1d4ed8;
        }

        .ppbj-warning-link:hover::after {
            opacity: 1;
        }

        .ppbj-warning-alert {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 12px 16px;
            text-align: left;
            animation: ppbjFadeUp 0.5s 0.35s both, ppbjAlertShake 0.4s 0.9s ease-in-out;
        }

        @keyframes ppbjAlertShake {

            0%,
            100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-4px);
            }

            40% {
                transform: translateX(4px);
            }

            60% {
                transform: translateX(-3px);
            }

            80% {
                transform: translateX(3px);
            }
        }

        .ppbj-warning-alert-icon {
            font-size: 18px;
            flex-shrink: 0;
        }

        .ppbj-warning-alert p {
            margin: 0;
            font-size: 13px;
            font-weight: 700;
            color: #dc2626;
            line-height: 1.4;
        }

        .ppbj-swal-btn {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
            color: #fff !important;
            font-size: 15px !important;
            font-weight: 700 !important;
            padding: 13px 40px !important;
            border-radius: 12px !important;
            border: none !important;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35) !important;
            letter-spacing: 0.3px;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
            margin-bottom: 8px !important;
            cursor: pointer !important;
        }

        .ppbj-swal-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45) !important;
        }

        .ppbj-swal-btn:active {
            transform: translateY(0) scale(0.98) !important;
        }

        /* Dark Mode */
        .dark .ppbj-swal-popup {
            background: #1e293b !important;
        }

        .dark .ppbj-warning-title {
            color: #f1f5f9;
        }

        .dark .ppbj-warning-card {
            background: #0f172a;
            border-color: #334155;
        }

        .dark .ppbj-warning-row p {
            color: #94a3b8;
        }

        .dark .ppbj-warning-row+.ppbj-warning-row {
            border-color: #334155;
        }

        .dark .ppbj-warning-step {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
        }

        .dark .ppbj-warning-link {
            color: #60a5fa;
        }

        .dark .ppbj-warning-link::after {
            background: #60a5fa;
        }

        .dark .ppbj-warning-link:hover {
            color: #93bbfd;
        }

        .dark .ppbj-warning-alert {
            background: rgba(220, 38, 38, 0.08);
            border-color: rgba(220, 38, 38, 0.25);
        }

        .dark .ppbj-warning-alert p {
            color: #fca5a5;
        }

        .dark .ppbj-warning-ring {
            border-color: #fbbf24;
        }

        .dark .ppbj-swal-btn {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25) !important;
        }

        .dark .ppbj-swal-btn:hover {
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35) !important;
        }

        /* Select2 Dark Mode */
        .dark .select2-container .select2-selection--single {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__arrow b {
            border-color: #9ca3af transparent transparent transparent !important;
        }

        .dark .select2-dropdown {
            background-color: #1f2937 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        .dark .select2-results__option {
            color: #f3f4f6 !important;
        }

        .dark .select2-results__option--highlighted {
            background-color: #2563eb !important;
            color: white !important;
        }

        .dark .select2-search--dropdown {
            background: #374151;
        }

        .dark .select2-search--dropdown .select2-search__field {
            background-color: #1f2937 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        /* Modal animation */
        .modal-pop {
            animation: pop .16s ease-out;
            will-change: transform, opacity;
        }

        @keyframes pop {
            from {
                transform: translateY(8px) scale(.99);
                opacity: 0;
            }

            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(5px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Responsive */
        @media (max-width: 480px) {
            .ppbj-swal-popup {
                width: 96vw !important;
                border-radius: 16px !important;
            }

            .ppbj-warning-wrapper {
                padding: 24px 18px 18px;
            }

            .ppbj-warning-icon {
                font-size: 34px;
            }

            .ppbj-warning-ring {
                width: 64px;
                height: 64px;
            }

            .ppbj-warning-title {
                font-size: 15px;
            }

            .ppbj-warning-card {
                padding: 12px 14px;
            }

            .ppbj-warning-row p {
                font-size: 12.5px;
            }

            .ppbj-warning-step {
                width: 22px;
                height: 22px;
                font-size: 11px;
                border-radius: 6px;
            }

            .ppbj-warning-alert {
                padding: 10px 12px;
                gap: 8px;
            }

            .ppbj-warning-alert p {
                font-size: 12px;
            }

            .ppbj-swal-btn {
                font-size: 14px !important;
                padding: 11px 32px !important;
                border-radius: 10px !important;
            }
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 40px !important;
            right: 8px !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 24px !important;
            padding-left: 0 !important;
            color: #111827 !important;
        }

        .select2-search--dropdown {
            padding: 8px;
            background: #f9fafb;
        }

        .select2-search--dropdown .select2-search__field {
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            padding: 8px 12px !important;
            font-size: 14px;
            outline: none;
            color: #111827;
        }

        .select2-search--dropdown .select2-search__field:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .select2-results__option {
            padding: 8px 12px !important;
            font-size: 14px;
            color: #111827;
        }

        .select2-results__option--highlighted {
            background-color: #3b82f6 !important;
            color: white !important;
        }

        .select2-dropdown {
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            background-color: #fff;
        }
    </style>
@endpush
