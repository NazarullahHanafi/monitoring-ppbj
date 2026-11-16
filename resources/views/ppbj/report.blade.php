@extends('layouts.app')

@section('title', 'Laporan PPBJ')

@section('content')
<div id="ppbjReport" data-read-url="{{ route('ppbj.report.data') }}" data-export-url="{{ route('ppbj.report.export') }}" data-timezone="{{ config('app.timezone') }}">
    <div class="mb-6 animate-fade-in">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Audit Report</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Laporan PPBJ</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Filter periode, portofolio, dan vendor untuk melihat total nilai PR/SP/BPG sebagai kebutuhan audit.
        </p>
    </div>

    <form id="reportFilters" method="get" action="{{ route('ppbj.report') }}" novalidate class="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 animate-slide-up">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
            <div>
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">Filter Laporan</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Portofolio dan vendor bisa dipilih lebih dari satu.</p>
            </div>
            <div class="flex flex-wrap gap-2">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20">
                    Tampilkan
                </button>
                <button type="button" data-report-reset class="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                    Reset
                </button>
                <button type="button" data-report-export class="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20">
                    Export CSV
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
            <div>
                <label for="periodType" class="report-label">Tipe Periode</label>
                <select name="period" id="periodType" class="report-input">
                    <option value="daily">Harian</option>
                    <option value="monthly" selected>Bulanan</option>
                    <option value="yearly">Tahunan</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            <div id="startDateWrapper">
                <label for="startDate" class="report-label"><span id="startDateLabel">Bulan</span></label>
                <input type="month" name="start_date" id="startDate" required value="{{ date('Y-m') }}" class="report-input">
            </div>

            <div id="endDateWrapper" class="hidden">
                <label for="endDate" class="report-label">Tanggal Akhir</label>
                <input type="date" name="end_date" id="endDate" class="report-input">
            </div>

            <div class="xl:col-span-2">
                <label for="portofolioFilter" class="report-label">Portofolio</label>
                <select name="portofolio[]" id="portofolioFilter" multiple class="report-input min-h-[92px]">
                    @foreach (($portofolios ?? collect()) as $portofolio)
                        <option value="{{ $portofolio }}">{{ $portofolio }}</option>
                    @endforeach
                </select>
                <p class="text-[11px] text-gray-400 mt-1">Tahan Ctrl untuk memilih banyak portofolio.</p>
            </div>

            <div class="xl:col-span-2">
                <label for="vendorFilter" class="report-label">Vendor / Penyedia</label>
                <select name="vendor[]" id="vendorFilter" multiple class="report-input min-h-[92px]">
                    @foreach (($vendors ?? collect()) as $vendor)
                        <option value="{{ $vendor }}">{{ $vendor }}</option>
                    @endforeach
                </select>
                <p class="text-[11px] text-gray-400 mt-1">Bisa dipilih satu atau banyak vendor.</p>
            </div>
        </div>
    </form>
    <p id="reportStatus" role="status" aria-live="polite" class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200" hidden></p>

    <div id="statsSection" class="hidden mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div class="report-stat">
                <div><p class="report-stat-label">Total Data</p><h3 id="statTotal" class="report-stat-value">0</h3></div>
                <div class="report-stat-icon bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">D</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">On Track</p><h3 id="statOnTrack" class="report-stat-value text-emerald-600 dark:text-emerald-300">0</h3></div>
                <div class="report-stat-icon bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">OK</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Warning</p><h3 id="statWarning" class="report-stat-value text-amber-600 dark:text-amber-300">0</h3></div>
                <div class="report-stat-icon bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">!</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Overdue</p><h3 id="statOverdue" class="report-stat-value text-red-600 dark:text-red-300">0</h3></div>
                <div class="report-stat-icon bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">OD</div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-4">
            <div class="report-stat">
                <div><p class="report-stat-label">Total Nilai PR</p><h3 id="statTotalValue" class="report-stat-value text-lg">Rp 0</h3></div>
                <div class="report-stat-icon bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">PR</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Total Nilai SP/SPK</p><h3 id="statTotalSpValue" class="report-stat-value text-lg">Rp 0</h3></div>
                <div class="report-stat-icon bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">SP</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Total Nilai BPG</p><h3 id="statTotalBpgValue" class="report-stat-value text-lg">Rp 0</h3></div>
                <div class="report-stat-icon bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300">BPG</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Portofolio Terlibat</p><h3 id="statTotalPortofolio" class="report-stat-value">0</h3></div>
                <div class="report-stat-icon bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">P</div>
            </div>
            <div class="report-stat">
                <div><p class="report-stat-label">Vendor Terlibat</p><h3 id="statTotalVendor" class="report-stat-value">0</h3></div>
                <div class="report-stat-icon bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">V</div>
            </div>
        </div>
    </div>

    <div id="breakdownSection" class="hidden grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
        <div class="report-card overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-bold text-gray-900 dark:text-white">Ringkasan per Portofolio</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Diurutkan dari total nilai PR terbesar.</p>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-900/70 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th class="px-4 py-3 text-left">Portofolio</th>
                            <th class="px-4 py-3 text-center">Data</th>
                            <th class="px-4 py-3 text-right">Nilai PR</th>
                            <th class="px-4 py-3 text-right">Nilai SP</th>
                        </tr>
                    </thead>
                    <tbody id="breakdownPortofolioBody" class="divide-y divide-gray-200 dark:divide-gray-700"></tbody>
                </table>
            </div>
        </div>

        <div class="report-card overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-bold text-gray-900 dark:text-white">Ringkasan per Vendor</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Membantu audit nilai pengadaan berdasarkan penyedia.</p>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-900/70 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th class="px-4 py-3 text-left">Vendor</th>
                            <th class="px-4 py-3 text-center">Data</th>
                            <th class="px-4 py-3 text-right">Nilai PR</th>
                            <th class="px-4 py-3 text-right">Nilai SP</th>
                        </tr>
                    </thead>
                    <tbody id="breakdownVendorBody" class="divide-y divide-gray-200 dark:divide-gray-700"></tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="dataSection" class="hidden report-card overflow-hidden animate-slide-up">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">Data Laporan</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Data ditampilkan per halaman. Ringkasan menghitung semua hasil; Export CSV mengunduh data lengkap.</p>
            </div>
            <span id="tableLimitInfo" class="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"></span>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr class="text-gray-600 dark:text-gray-300">
                        <th class="px-4 py-3 text-left">No PPBJ</th>
                        <th class="px-4 py-3 text-left">Tanggal</th>
                        <th class="px-4 py-3 text-left min-w-[260px]">Uraian</th>
                        <th class="px-4 py-3 text-left">Portofolio</th>
                        <th class="px-4 py-3 text-left">Buyer</th>
                        <th class="px-4 py-3 text-left min-w-[220px]">Vendor</th>
                        <th class="px-4 py-3 text-center">Status SLA</th>
                        <th class="px-4 py-3 text-center min-w-[120px]">Progress</th>
                        <th class="px-4 py-3 text-right">Nilai PR</th>
                        <th class="px-4 py-3 text-right">Nilai SP</th>
                        <th class="px-4 py-3 text-right">Nilai BPG</th>
                    </tr>
                </thead>
                <tbody id="dataTableBody" class="divide-y divide-gray-200 dark:divide-gray-700"></tbody>
            </table>
        </div>
        <nav class="p-4 flex flex-wrap items-center justify-between gap-3" aria-label="Halaman laporan">
            <label for="reportPerPage" class="text-sm">Baris per halaman
                <select id="reportPerPage" class="report-input" disabled><option value="25">25</option><option value="50" selected>50</option><option value="100">100</option></select>
            </label>
            <div class="flex flex-wrap items-center gap-3">
                <button type="button" data-report-previous class="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600" disabled>Sebelumnya</button>
                <span id="reportPageInfo" class="text-sm"></span>
                <button type="button" data-report-next class="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600" disabled>Berikutnya</button>
            </div>
        </nav>
    </div>

    <div id="loadingState" class="hidden text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Memuat data laporan...</p>
    </div>

    <div id="emptyState" class="hidden text-center py-12 report-card">
        <div class="text-5xl mb-3">-</div>
        <p class="font-semibold text-gray-700 dark:text-gray-200">Tidak ada data untuk filter yang dipilih.</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Coba longgarkan filter portofolio, vendor, atau periode.</p>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/app/ppbj-report.js') }}?v={{ filemtime(public_path('assets/app/ppbj-report.js')) }}" defer></script>

<style>
.report-label {
    display: block;
    margin-bottom: .5rem;
    font-size: .875rem;
    color: rgb(75 85 99);
}
.dark .report-label { color: rgb(209 213 219); }
.report-input {
    width: 100%;
    border-radius: .75rem;
    border: 1px solid rgb(209 213 219);
    background: white;
    padding: .625rem .75rem;
    color: rgb(17 24 39);
    outline: none;
}
.report-input:focus {
    border-color: rgb(59 130 246);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, .16);
}
.dark .report-input {
    border-color: rgb(75 85 99);
    background: rgb(31 41 55);
    color: white;
}
.report-card,
.report-stat {
    border-radius: 1rem;
    border: 1px solid rgb(243 244 246);
    background: white;
    box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
}
.dark .report-card,
.dark .report-stat {
    border-color: rgb(55 65 81);
    background: rgb(31 41 55);
}
.report-stat {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
.report-stat-label {
    font-size: .8125rem;
    color: rgb(107 114 128);
}
.dark .report-stat-label { color: rgb(156 163 175); }
.report-stat-value {
    margin-top: .25rem;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 800;
    color: rgb(17 24 39);
}
.dark .report-stat-value { color: white; }
.report-stat-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: .9rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: .8rem;
}
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in .45s ease-out forwards; }
.animate-slide-up { animation: slide-up .55s ease-out forwards; }
</style>
@endpush
