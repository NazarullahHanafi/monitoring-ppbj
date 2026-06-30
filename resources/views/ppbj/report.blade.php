@extends('layouts.app')

@section('title', 'Laporan PPBJ')

@section('content')
    <div class="mb-6 animate-fade-in">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Audit Report</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Laporan PPBJ</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Filter periode, portofolio, dan vendor untuk melihat total nilai PR/SP/BPG sebagai kebutuhan audit.
        </p>
    </div>

    <div class="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 animate-slide-up">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
            <div>
                <h3 class="font-bold text-lg text-gray-900 dark:text-white">Filter Laporan</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Portofolio dan vendor bisa dipilih lebih dari satu.</p>
            </div>
            <div class="flex flex-wrap gap-2">
                <button type="button" onclick="loadReport()" class="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20">
                    Tampilkan
                </button>
                <button type="button" onclick="resetReportFilter()" class="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                    Reset
                </button>
                <button type="button" onclick="exportReport()" class="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20">
                    Export CSV
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
            <div>
                <label class="report-label">Tipe Periode</label>
                <select id="periodType" class="report-input">
                    <option value="daily">Harian</option>
                    <option value="monthly" selected>Bulanan</option>
                    <option value="yearly">Tahunan</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            <div id="startDateWrapper">
                <label class="report-label"><span id="startDateLabel">Bulan</span></label>
                <input type="month" id="startDate" value="{{ date('Y-m') }}" class="report-input">
            </div>

            <div id="endDateWrapper" class="hidden">
                <label class="report-label">Tanggal Akhir</label>
                <input type="date" id="endDate" class="report-input">
            </div>

            <div class="xl:col-span-2">
                <label class="report-label">Portofolio</label>
                <select id="portofolioFilter" multiple class="report-input min-h-[92px]">
                    @foreach (($portofolios ?? collect()) as $portofolio)
                        <option value="{{ $portofolio }}">{{ $portofolio }}</option>
                    @endforeach
                </select>
                <p class="text-[11px] text-gray-400 mt-1">Tahan Ctrl untuk memilih banyak portofolio.</p>
            </div>

            <div class="xl:col-span-2">
                <label class="report-label">Vendor / Penyedia</label>
                <select id="vendorFilter" multiple class="report-input min-h-[92px]">
                    @foreach (($vendors ?? collect()) as $vendor)
                        <option value="{{ $vendor }}">{{ $vendor }}</option>
                    @endforeach
                </select>
                <p class="text-[11px] text-gray-400 mt-1">Bisa dipilih satu atau banyak vendor.</p>
            </div>
        </div>
    </div>

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
                <p class="text-xs text-gray-500 dark:text-gray-400">Maksimal 1.000 baris ditampilkan. Export CSV untuk data lengkap.</p>
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
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
(function() {
    const periodType = document.getElementById('periodType');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const endDateWrapper = document.getElementById('endDateWrapper');
    const startDateLabel = document.getElementById('startDateLabel');

    periodType.addEventListener('change', function() {
        const type = this.value;

        if (type === 'daily') {
            startDate.type = 'date';
            startDate.value = today();
            startDateLabel.textContent = 'Tanggal';
            endDateWrapper.classList.add('hidden');
        } else if (type === 'monthly') {
            startDate.type = 'month';
            startDate.value = today().slice(0, 7);
            startDateLabel.textContent = 'Bulan';
            endDateWrapper.classList.add('hidden');
        } else if (type === 'yearly') {
            startDate.type = 'number';
            startDate.value = new Date().getFullYear();
            startDate.min = 2020;
            startDate.max = 2100;
            startDateLabel.textContent = 'Tahun';
            endDateWrapper.classList.add('hidden');
        } else {
            startDate.type = 'date';
            startDate.value = today();
            startDateLabel.textContent = 'Tanggal Mulai';
            endDateWrapper.classList.remove('hidden');
            endDate.value = today();
        }
    });

    window.loadReport = async function() {
        const params = reportParams();

        hideReportSections();
        document.getElementById('loadingState').classList.remove('hidden');

        try {
            const response = await fetch(`{{ route('ppbj.report.data') }}?${params}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Gagal memuat data laporan');
            }

            const result = await response.json();
            document.getElementById('loadingState').classList.add('hidden');

            if (!result.data || result.data.length === 0) {
                document.getElementById('emptyState').classList.remove('hidden');
                return;
            }

            renderStats(result.stats || {});
            renderBreakdown(result.breakdown || {});
            renderTable(result.data || [], result.stats || {});

            document.getElementById('statsSection').classList.remove('hidden');
            document.getElementById('breakdownSection').classList.remove('hidden');
            document.getElementById('dataSection').classList.remove('hidden');
        } catch (error) {
            document.getElementById('loadingState').classList.add('hidden');
            Swal.fire({
                icon: 'error',
                title: 'Laporan gagal dimuat',
                text: error.message || 'Terjadi kesalahan saat memuat laporan.'
            });
        }
    };

    window.exportReport = function() {
        window.location.href = `{{ route('ppbj.report.export') }}?${reportParams()}`;
    };

    window.resetReportFilter = function() {
        periodType.value = 'monthly';
        periodType.dispatchEvent(new Event('change'));
        clearMultiSelect('portofolioFilter');
        clearMultiSelect('vendorFilter');
        loadReport();
    };

    function reportParams() {
        const period = periodType.value;
        let start = startDate.value;

        if (period === 'yearly' && start) {
            start = `${start}-01-01`;
        }

        const params = new URLSearchParams({
            period: period,
            start_date: start || '',
            end_date: endDate.value || ''
        });

        appendMulti(params, 'portofolio[]', selectedValues('portofolioFilter'));
        appendMulti(params, 'vendor[]', selectedValues('vendorFilter'));

        return params;
    }

    function hideReportSections() {
        ['statsSection', 'breakdownSection', 'dataSection', 'emptyState'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
    }

    function renderStats(stats) {
        setText('statTotal', stats.total || 0);
        setText('statOnTrack', stats.on_track || 0);
        setText('statWarning', stats.warning || 0);
        setText('statOverdue', stats.overdue || 0);
        setText('statTotalValue', formatRupiah(stats.total_value));
        setText('statTotalSpValue', formatRupiah(stats.total_sp_value));
        setText('statTotalBpgValue', formatRupiah(stats.total_bpg_value));
        setText('statTotalPortofolio', stats.total_portofolio || 0);
        setText('statTotalVendor', stats.total_vendor || 0);
    }

    function renderBreakdown(breakdown) {
        renderBreakdownTable('breakdownPortofolioBody', breakdown.portofolio || [], 'Belum ada portofolio');
        renderBreakdownTable('breakdownVendorBody', breakdown.vendor || [], 'Belum ada vendor');
    }

    function renderBreakdownTable(bodyId, rows, emptyLabel) {
        const tbody = document.getElementById(bodyId);
        tbody.innerHTML = '';

        if (!rows.length) {
            tbody.innerHTML = `<tr><td colspan="4" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">${emptyLabel}</td></tr>`;
            return;
        }

        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors';
            tr.innerHTML = `
                <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">${escapeHtml(row.label || '-')}</td>
                <td class="px-4 py-3 text-center text-gray-600 dark:text-gray-300">${Number(row.total || 0).toLocaleString('id-ID')}</td>
                <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">${formatRupiah(row.total_value)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300">${formatRupiah(row.total_sp_value)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderTable(data, stats) {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = '';
        setText('tableLimitInfo', `${data.length.toLocaleString('id-ID')} dari ${Number(stats.total || data.length).toLocaleString('id-ID')} data`);

        data.forEach((row, index) => {
            const statusColor = {
                'ON TRACK': 'bg-emerald-600',
                'WARNING': 'bg-amber-500',
                'OVERDUE': 'bg-red-600',
                'CANCELLED': 'bg-gray-600'
            }[row.status_sla] || 'bg-gray-500';

            const progress = Math.max(0, Math.min(100, Number(row.progres || 0)));
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors animate-fade-in';
            tr.style.animationDelay = `${Math.min(index, 12) * 0.03}s`;
            tr.innerHTML = `
                <td class="px-4 py-3 font-bold text-gray-900 dark:text-white whitespace-nowrap">${escapeHtml(row.ppbj_no || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatDate(row.created_at)}</td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">${escapeHtml(row.uraian || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.portofolio || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.buyer || '-')}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${escapeHtml(row.penyedia_eksternal || '-')}</td>
                <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold text-white ${statusColor}">
                        ${escapeHtml(row.status_sla || '-')}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="h-2 rounded-full bg-blue-600 transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                    <small class="text-gray-600 dark:text-gray-400">${progress}%</small>
                </td>
                <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">${formatRupiah(row.total_sebelum_ppn)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatRupiah(row.nilai_sp_spk)}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">${formatRupiah(row.nilai_bpg)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function selectedValues(id) {
        return Array.from(document.getElementById(id).selectedOptions).map(option => option.value).filter(Boolean);
    }

    function appendMulti(params, key, values) {
        values.forEach(value => params.append(key, value));
    }

    function clearMultiSelect(id) {
        Array.from(document.getElementById(id).options).forEach(option => option.selected = false);
    }

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    function formatRupiah(value) {
        return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    function today() {
        return new Date().toISOString().split('T')[0];
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[char]));
    }

    loadReport();
})();
</script>

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
