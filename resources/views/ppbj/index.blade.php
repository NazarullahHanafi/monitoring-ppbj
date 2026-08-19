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
                <input type="text" name="search" placeholder="Cari uraian, No. PPBJ, registrasi, SPH, DO, BPG, invoice..."
                    value="{{ request('search') }}"
                    class="pl-10 px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                           placeholder-gray-400 dark:placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all">
            </div>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                Mencari di: Uraian · No. PPBJ · Registrasi Umum · SPH · Awarding/SP · SPPH/RFQ 1 · No. DO · No. BPG · No. BPB · No. Invoice
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
                <option value="JATUH TEMPO" {{ request('status_sla') === 'JATUH TEMPO' ? 'selected' : '' }}>JATUH TEMPO</option>
                <option value="OVERDUE" {{ request('status_sla') === 'OVERDUE' ? 'selected' : '' }}>OVERDUE</option>
                <option value="LENGKAP" {{ request('status_sla') === 'LENGKAP' ? 'selected' : '' }}>LENGKAP</option>
                <option value="BELUM DIHITUNG" {{ request('status_sla') === 'BELUM DIHITUNG' ? 'selected' : '' }}>BELUM DIHITUNG</option>
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

        {{-- 9. Registrasi Umum --}}
        <div class="lg:col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Registrasi Umum</label>
            <select name="general_registration" class="px-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer">
                <option value="">Semua Registrasi</option>
                <option value="registered" {{ request('general_registration') === 'registered' ? 'selected' : '' }}>Sudah Registrasi</option>
                <option value="unregistered" {{ request('general_registration') === 'unregistered' ? 'selected' : '' }}>Belum Registrasi</option>
            </select>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                Data lama tanpa nomor tetap tampil sebagai strip.
            </p>
        </div>

        {{-- 10. Tombol --}}
        <div class="lg:col-span-1 sm:col-span-2 flex items-end gap-2 mt-1">
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
        if (request('general_registration')) {
            $activeFilters[] = [
                'label' => 'Registrasi',
                'value' => request('general_registration') === 'registered' ? 'Sudah Registrasi' : 'Belum Registrasi',
                'param' => 'general_registration',
            ];
        }
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
                            'general_registration' => ['general_registration'],
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
        $hlText = static function ($text, $keyword): string {
            if (!$keyword || trim($keyword) === '') {
                return e($text);
            }
            $safe = e($text);
            $safeKw = preg_quote(e($keyword), '/');
            return (string) preg_replace(
                '/(' . $safeKw . ')/i',
                '<mark class="search-hl">$1</mark>',
                $safe
            );
        };
    @endphp

    {{-- ================= TABLE (RESPONSIVE) ================= --}}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-[1180px] w-full text-sm text-left">
                <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr class="text-gray-600 dark:text-gray-300">
                        <th class="px-4 py-3 text-left">PPBJ</th>
                        <th class="px-4 py-3 text-left">Uraian</th>
                        <th class="px-4 py-3 text-left">Portofolio</th>
                        <th class="px-4 py-3 text-left">Buyer</th>
                        <th class="px-4 py-3 text-center">Sisa SLA</th>
                        <th class="px-4 py-3 text-center">Masa Pemenuhan</th>
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
                            $isSlaComplete = method_exists($row, 'isSlaComplete')
                                ? $row->isSlaComplete()
                                : (!empty($row->awarding_sp) && !empty($row->tgl_awarding_sp) && !empty($row->tgl_spk));
                            $parseRowSlaDate = function ($date) {
                                if (! $date) return null;
                                try {
                                    return \Carbon\Carbon::parse($date)->startOfDay();
                                } catch (\Throwable) {
                                    return null;
                                }
                            };
                            $rowSlaStart = $parseRowSlaDate($row->tgl_diserahkan ?? null)
                                ?: ($parseRowSlaDate($row->tgl_terima_pr ?? null)
                                    ?: $parseRowSlaDate($row->tgl_ppbj ?? null));
                            $rowTargetDays = method_exists($row, 'slaTargetDays')
                                ? $row->slaTargetDays()
                                : App\Models\Ppbj::hitungTargetSla($row->total_sebelum_ppn ?? 0);
                            $rowRunningDays = ($rowSlaStart && $rowTargetDays > 0)
                                ? max(0, (int) $rowSlaStart->diffInDays(now()->startOfDay()))
                                : null;
                            $rowLiveRemaining = ($rowRunningDays !== null && $rowTargetDays > 0)
                                ? $rowTargetDays - $rowRunningDays
                                : null;
                            $slaMainLabel = method_exists($row, 'slaFinalLabel')
                                ? $row->slaFinalLabel()
                                : (($isSlaComplete || $isCancelled)
                                    ? ($isCancelled ? 'Dibatalkan' : 'Selesai')
                                    : (($rowLiveRemaining ?? (int) ($row->sisa_target_sla ?? 0)) . ' hari'));
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
                                $sisaSla = method_exists($row, 'slaCurrentRemainingDays')
                                    ? $row->slaCurrentRemainingDays()
                                    : ($rowLiveRemaining ?? (int) ($row->sisa_target_sla ?? 0));
                                if ($sisaSla === null) {
                                    $displayStatusSla = 'BELUM DIHITUNG';
                                    $statusColor = 'bg-slate-500';
                                } elseif ($sisaSla < 0) {
                                    $displayStatusSla = 'OVERDUE';
                                    $statusColor = 'bg-red-600';
                                } elseif ($sisaSla === 0) {
                                    $displayStatusSla = 'JATUH TEMPO';
                                    $statusColor = 'bg-orange-600';
                                } elseif ($sisaSla <= 2) {
                                    $displayStatusSla = 'WARNING';
                                    $statusColor = 'bg-yellow-500';
                                } else {
                                    $displayStatusSla = 'ON TRACK';
                                    $statusColor = 'bg-green-600';
                                }
                            }

                            $contractStatus = method_exists($row, 'contractStatusLabel')
                                ? $row->contractStatusLabel()
                                : (empty($row->tgl_spk) ? 'BELUM AKTIF' : (empty($row->promised_date) ? 'BATAS BELUM DIATUR' : 'AKTIF'));
                            $contractStatusClass = method_exists($row, 'contractStatusColorClass')
                                ? $row->contractStatusColorClass()
                                : 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600';
                            $contractExplanation = method_exists($row, 'contractExplanation')
                                ? $row->contractExplanation()
                                : 'Informasi masa pemenuhan belum tersedia.';
                            $contractRemaining = method_exists($row, 'contractRemainingDays') ? $row->contractRemainingDays() : null;
                            $contractEndDate = method_exists($row, 'contractEndDate') ? $row->contractEndDate() : null;
                            $contractEndSource = method_exists($row, 'contractEndDateSourceLabel') ? $row->contractEndDateSourceLabel() : null;
                        @endphp

                        <tr id="row_{{ $row->id }}"
                            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                                <span class="ppbj-no">{!! $hlText($row->ppbj_no, $hlKw) !!}</span>

                                @php
                                    $generalRegisteredAtLabel = '';
                                    if (!empty($row->general_registration_number)) {
                                        try {
                                            $generalRegisteredAtLabel = $row->general_registered_at
                                                ? \Carbon\Carbon::parse($row->general_registered_at)->locale('id')->translatedFormat('d M Y H:i')
                                                : '';
                                        } catch (\Throwable) {
                                            $generalRegisteredAtLabel = (string) $row->general_registered_at;
                                        }
                                    }
                                @endphp
                                <div class="mt-1 flex max-w-[210px] items-center gap-1">
                                    @if(!empty($row->general_registration_number))
                                        <button type="button"
                                            onclick="copyGeneralRegistration(@js($row->general_registration_number))"
                                            class="inline-flex min-w-0 max-w-full cursor-pointer items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-extrabold text-indigo-700 ring-1 ring-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-500/20 dark:bg-indigo-950/50 dark:text-indigo-100 dark:ring-indigo-700/70 dark:hover:bg-indigo-500 dark:hover:text-white"
                                            title="Registrasi Umum oleh {{ $row->general_registered_by_name ?: 'Umum' }}{{ $generalRegisteredAtLabel ? ' pada ' . $generalRegisteredAtLabel : '' }}">
                                            <span>Reg</span>
                                            <span class="truncate">{!! $hlText($row->general_registration_number, $hlKw) !!}</span>
                                        </button>
                                    @else
                                        <span class="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500 ring-1 ring-gray-200 dark:bg-gray-900/60 dark:text-gray-300 dark:ring-gray-700"
                                            title="Data lama atau belum diregistrasi umum">
                                            <span>Reg: —</span>
                                        </span>
                                    @endif
                                </div>

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

                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{!! $hlText($row->uraian, $hlKw) !!}</td>
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

                            <td class="px-4 py-3 text-center" title="{{ $contractExplanation }}">
                                <div class="inline-flex max-w-[170px] flex-col items-center gap-1">
                                    <span class="inline-flex items-center rounded-full px-2 py-1 text-[9px] font-extrabold ring-1 {{ $contractStatusClass }}">
                                        {{ $contractStatus }}
                                    </span>
                                    @if($contractEndDate)
                                        <span class="text-[10px] font-semibold text-slate-500 dark:text-slate-300">
                                            {{ $contractEndDate->translatedFormat('d M Y') }}
                                            @if($contractRemaining !== null && !$row->goods_confirmed_at)
                                                · {{ $contractRemaining >= 0 ? $contractRemaining . ' hari lagi' : 'lewat ' . abs($contractRemaining) . ' hari' }}
                                            @endif
                                        </span>
                                        @if($contractEndSource)
                                            <span class="text-[9px] font-bold text-slate-400 dark:text-slate-400">
                                                {{ $contractEndSource }}
                                            </span>
                                        @endif
                                    @else
                                        <span class="text-[10px] text-slate-400">Promised Date dan Closed Date kosong</span>
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
                                    <button type="button" onclick="openRealTracking({{ $row->id }})"
                                        class="inline-flex items-center gap-0.5 rounded-md bg-cyan-50 px-1.5 py-0.5 text-[9px] font-bold leading-none text-cyan-700 ring-1 ring-cyan-200 transition hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-200 dark:ring-cyan-700/60">
                                        <span>Tracking Real</span>
                                    </button>
                                    @if(!empty($row->goods_confirmed_at))
                                        <span class="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold leading-none text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-700/60"
                                            title="Dikonfirmasi oleh {{ $row->goods_confirmed_by_name ?: 'Operasional' }}">
                                            ✓ Diterima OP
                                        </span>
                                    @elseif(!empty($row->goods_arrived_at))
                                        <span class="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold leading-none text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-700/60"
                                            title="Ditandai oleh {{ $row->goods_arrived_by_name ?: 'Umum' }}">
                                            📦 Menunggu OP
                                        </span>
                                    @elseif(!$isCancelled)
                                        <button type="button" onclick="markGoodsArrived({{ $row->id }}, @js($row->ppbj_no))"
                                            class="inline-flex items-center gap-0.5 rounded-md bg-cyan-50 px-1.5 py-0.5 text-[9px] font-bold leading-none text-cyan-700 ring-1 ring-cyan-200 transition hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-200 dark:ring-cyan-700/60">
                                            📦 Barang datang
                                        </button>
                                    @endif
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
                            <td colspan="10"
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
                    'promised_date' => ['Tanggal Pemenuhan / Berakhir Kontrak', 'date'],
                    'do_no' => ['No. DO / Surat Jalan / BAST', 'text'],
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
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload Excel/CSV untuk memeriksa dan mengimpor data secara massal
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
                    <h3 class="font-semibold text-lg mb-2">Upload File Excel/CSV</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag & drop file atau klik untuk browse</p>

                    <input type="file" id="importFile" accept=".xlsx,.xls,.csv,.txt" class="hidden"
                        onchange="handleFileSelect(event)">

                    <button type="button" onclick="document.getElementById('importFile').click()"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                        <span>📁 Pilih File</span>
                    </button>

                    <div class="mt-4">
                        <a href="{{ route('ppbj.template') }}"
                            class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                            <span>📥 Download Template Excel</span>
                        </a>
                    </div>
                </div>

                <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-2">💡 Petunjuk Import:</h4>
                    <ul class="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                        <li>• Download template Excel terlebih dahulu sebagai contoh paling aman</li>
                        <li>• <strong>PPBJ No wajib diisi dan harus unik</strong> (tidak boleh duplikat)</li>
                        <li>• Format tanggal boleh <code
                                class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-200">YYYY-MM-DD</code>
                            atau <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-200">DD/MM/YYYY</code>
                        </li>
                        <li>• Angka boleh berupa 50000000, 50.000.000, atau Rp50.000.000</li>
                        <li>• Urutan kolom bebas; kolom tambahan diabaikan dan kolom opsional boleh tidak ada</li>
                        <li>• CSV boleh memakai pemisah koma, titik koma, tab, atau garis vertikal</li>
                        <li>• Kolom otomatis (SLA, Progress, dll) tidak perlu diisi</li>
                        <li>• Maksimal 10MB dan 2.000 baris per proses</li>
                    </ul>
                </div>
            </div>

            {{-- Step 2: Preview --}}
            <div id="previewStep" class="hidden">
                <div id="formatNotice"
                    class="hidden mb-4 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900 dark:border-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200">
                </div>
                <div id="importWarnings"
                    class="hidden mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                </div>
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
                                Baris bermasalah akan dilewati. Data yang valid tetap dapat diimport.
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
                        <span class="text-gray-600 dark:text-gray-400">= Dilewati dan perlu diperbaiki</span>
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

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/ppbj/ppbj.css') }}?v=20260818b">
@endpush

@push('scripts')
    @php
                $ppbjJsonData = collect($ppbj->items())->keyBy('id')->map(function ($item) {
                    $data = method_exists($item, 'toArray') ? $item->toArray() : (array) $item;
                    $isSlaComplete = method_exists($item, 'isSlaComplete') ? $item->isSlaComplete() : false;
                    if (! method_exists($item, 'isSlaComplete')) {
                        $isCancelled = strtoupper((string) ($data['status'] ?? 'ACTIVE')) === 'CANCELLED';
                        $isSlaComplete = ! $isCancelled
                            && ! empty($data['awarding_sp'])
                            && ! empty($data['tgl_awarding_sp'])
                            && ! empty($data['tgl_spk']);
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
                    $finishRaw = $data['tgl_spk'] ?? null;
                    $finishLabel = ! empty($data['tgl_spk']) ? 'Tanggal SPK / kontrak' : 'Tanggal SPK / kontrak belum tersedia';
                    $startDate = $parseDate($startRaw);
                    $finishDate = $parseDate($finishRaw);
                    $targetDays = method_exists($item, 'slaTargetDays')
                        ? $item->slaTargetDays()
                        : \App\Models\Ppbj::hitungTargetSla($data['total_sebelum_ppn'] ?? 0);
                    $data['target_sla_hari'] = $targetDays;
                    $targetDate = ($startDate && $targetDays > 0) ? $startDate->copy()->addDays($targetDays) : null;
                    $runningDays = $startDate ? max(0, (int) $startDate->copy()->startOfDay()->diffInDays(now()->startOfDay())) : null;
                    $usedDays = ($startDate && $finishDate) ? max(0, (int) $startDate->diffInDays($finishDate)) : null;
                    $finalRemainingDays = $usedDays !== null ? $targetDays - $usedDays : null;
                    $currentRemainingDays = (! $isSlaComplete && $runningDays !== null && $targetDays > 0)
                        ? $targetDays - $runningDays
                        : $finalRemainingDays;
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
                            $remaining = $currentRemainingDays ?? (int) ($data['sisa_target_sla'] ?? 0);
                            $slaExplanation = 'SLA masih berjalan dari ' . $startLabel . ' (' . $startDate->translatedFormat('d F Y') . ') sampai hari ini. Target ' . $targetDays . ' hari.' . $targetText . ' Sudah berjalan ' . ($runningDays ?? 0) . ' hari, ' . ($remaining < 0 ? 'sehingga terlambat ' . abs($remaining) . ' hari.' : 'sisa ' . $remaining . ' hari.');
                        }
                    }

                    $data['status_sla'] = $data['status_sla'] ?? ($isSlaComplete ? 'LENGKAP' : null);
                    $data['sla_is_complete'] = $isSlaComplete;
                    $data['sla_final_label'] = method_exists($item, 'slaFinalLabel')
                        ? $item->slaFinalLabel()
                        : ($isSlaComplete ? 'Selesai' : (($currentRemainingDays ?? (int) ($data['sisa_target_sla'] ?? 0)) . ' hari'));
                    $data['sla_outcome_label'] = method_exists($item, 'slaOutcomeLabel')
                        ? $item->slaOutcomeLabel()
                        : $outcomeLabel;
                    $data['sla_used_days'] = method_exists($item, 'slaUsedDays') ? $item->slaUsedDays() : $usedDays;
                    $data['sla_final_remaining_days'] = method_exists($item, 'slaFinalRemainingDays') ? $item->slaFinalRemainingDays() : $finalRemainingDays;
                    $data['sla_current_remaining_days'] = method_exists($item, 'slaCurrentRemainingDays') ? $item->slaCurrentRemainingDays() : $currentRemainingDays;
                    $data['sla_start_source_label'] = method_exists($item, 'slaStartSourceLabel') ? $item->slaStartSourceLabel() : $startLabel;
                    $data['sla_finish_source_label'] = method_exists($item, 'slaFinishSourceLabel') ? $item->slaFinishSourceLabel() : $finishLabel;
                    $data['sla_running_days'] = method_exists($item, 'slaRunningDays') ? $item->slaRunningDays() : $runningDays;
                    $data['sla_target_date_label'] = method_exists($item, 'slaTargetDateLabel') ? $item->slaTargetDateLabel() : ($targetDate ? $targetDate->translatedFormat('d F Y') : null);
                    $data['sla_explanation'] = method_exists($item, 'slaExplanation')
                        ? $item->slaExplanation()
                        : $slaExplanation;
                    $data['contract_status_label'] = method_exists($item, 'contractStatusLabel') ? $item->contractStatusLabel() : 'BELUM AKTIF';
                    $data['contract_remaining_days'] = method_exists($item, 'contractRemainingDays') ? $item->contractRemainingDays() : null;
                    $data['contract_duration_days'] = method_exists($item, 'contractDurationDays') ? $item->contractDurationDays() : null;
                    $data['contract_start_date_label'] = method_exists($item, 'contractStartDate') && $item->contractStartDate()
                        ? $item->contractStartDate()->translatedFormat('d F Y')
                        : null;
                    $data['contract_end_date_label'] = method_exists($item, 'contractEndDate') && $item->contractEndDate()
                        ? $item->contractEndDate()->translatedFormat('d F Y')
                        : null;
                    $data['contract_end_date_source_label'] = method_exists($item, 'contractEndDateSourceLabel')
                        ? $item->contractEndDateSourceLabel()
                        : null;
                    $data['contract_explanation'] = method_exists($item, 'contractExplanation')
                        ? $item->contractExplanation()
                        : 'Informasi masa pemenuhan belum tersedia.';

                    if (! empty($data['general_registered_at'])) {
                        try {
                            $data['general_registered_at'] = \Carbon\Carbon::parse($data['general_registered_at'])
                                ->locale('id')
                                ->translatedFormat('d F Y H:i');
                        } catch (\Throwable) {
                            // Biarkan apa adanya jika format tanggal dari database tidak bisa dibaca.
                        }
                    }

                    return $data;
                });
            @endphp
    @php
        $ppbjPageConfig = [
            'csrfToken' => csrf_token(),
            'importPreviewUrl' => route('ppbj.import.preview'),
            'importProcessUrl' => route('ppbj.import.process'),
            'ppbjData' => $ppbjJsonData,
        ];
    @endphp
    <script>
        window.PPBJ_PAGE_CONFIG = @json($ppbjPageConfig);
    </script>
    <script src="{{ asset('assets/ppbj/ppbj.js') }}?v=20260818b" defer></script>

@endpush
