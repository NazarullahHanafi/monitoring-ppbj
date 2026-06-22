@extends('layouts.app')

@section('title', 'Laporan PPBJ')

@section('content')

    {{-- ================= HEADER ================= --}}
    <div class="mb-6 animate-fade-in">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">📊 Laporan PPBJ</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Laporan periodik data pengadaan</p>
    </div>

    {{-- ================= FILTER PERIODE ================= --}}
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 animate-slide-up">
        <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Filter Periode</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            {{-- Tipe Periode --}}
            <div>
                <label class="text-sm text-gray-600 dark:text-gray-300 mb-2 block">Tipe Periode</label>
                <select id="periodType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="daily">Harian</option>
                    <option value="monthly" selected>Bulanan</option>
                    <option value="yearly">Tahunan</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            {{-- Tanggal Mulai --}}
            <div id="startDateWrapper">
                <label class="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                    <span id="startDateLabel">Bulan</span>
                </label>
                <input type="month" id="startDate" value="{{ date('Y-m') }}" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
            </div>

            {{-- Tanggal Akhir (untuk custom) --}}
            <div id="endDateWrapper" class="hidden">
                <label class="text-sm text-gray-600 dark:text-gray-300 mb-2 block">Tanggal Akhir</label>
                <input type="date" id="endDate" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
            </div>

            {{-- Tombol --}}
            <div class="flex items-end gap-2">
                <button type="button" onclick="loadReport()" 
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95">
                    Tampilkan
                </button>
                <button type="button" onclick="exportReport()" 
                    class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 active:scale-95">
                    📥 Export
                </button>
            </div>
        </div>
    </div>

    {{-- ================= STATISTIK ================= --}}
    <div id="statsSection" class="hidden mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {{-- Total Data --}}
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Data</p>
                        <h3 id="statTotal" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</h3>
                    </div>
                    <div class="text-4xl opacity-80">📋</div>
                </div>
            </div>

            {{-- On Track --}}
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700" style="animation-delay: 0.1s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">On Track</p>
                        <h3 id="statOnTrack" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</h3>
                    </div>
                    <div class="text-4xl opacity-80">✅</div>
                </div>
            </div>

            {{-- Warning --}}
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700" style="animation-delay: 0.2s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Warning</p>
                        <h3 id="statWarning" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</h3>
                    </div>
                    <div class="text-4xl opacity-80">⚠️</div>
                </div>
            </div>

            {{-- Overdue --}}
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700" style="animation-delay: 0.3s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                        <h3 id="statOverdue" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</h3>
                    </div>
                    <div class="text-4xl opacity-80">🔴</div>
                </div>
            </div>
        </div>

        {{-- Additional Stats --}}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Nilai Pengadaan</p>
                        <h3 id="statTotalValue" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">Rp 0</h3>
                    </div>
                    <div class="text-4xl">💰</div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Rata-rata Progress</p>
                        <h3 id="statAvgProgress" class="text-2xl font-bold text-gray-900 dark:text-white mt-1">0%</h3>
                    </div>
                    <div class="text-4xl">📈</div>
                </div>
            </div>
        </div>
    </div>

    {{-- ================= TABEL DATA ================= --}}
    <div id="dataSection" class="hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Data Laporan</h3>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr class="text-gray-600 dark:text-gray-300">
                        <th class="px-4 py-3 text-left">No PPBJ</th>
                        <th class="px-4 py-3 text-left">Tanggal</th>
                        <th class="px-4 py-3 text-left">Uraian</th>
                        <th class="px-4 py-3 text-left">Buyer</th>
                        <th class="px-4 py-3 text-center">Status SLA</th>
                        <th class="px-4 py-3 text-center">Progress</th>
                        <th class="px-4 py-3 text-right">Total (Rp)</th>
                    </tr>
                </thead>
                <tbody id="dataTableBody" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <!-- Data akan diisi via JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    {{-- Loading State --}}
    <div id="loadingState" class="hidden text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Memuat data...</p>
    </div>

    {{-- Empty State --}}
    <div id="emptyState" class="hidden text-center py-12">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-gray-600 dark:text-gray-400">Tidak ada data untuk periode yang dipilih</p>
    </div>

@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
(function() {
    const periodType = document.getElementById('periodType');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const startDateWrapper = document.getElementById('startDateWrapper');
    const endDateWrapper = document.getElementById('endDateWrapper');
    const startDateLabel = document.getElementById('startDateLabel');

    // Update input type based on period
    periodType.addEventListener('change', function() {
        const type = this.value;
        
        if (type === 'daily') {
            startDate.type = 'date';
            startDate.value = new Date().toISOString().split('T')[0];
            startDateLabel.textContent = 'Tanggal';
            endDateWrapper.classList.add('hidden');
        } else if (type === 'monthly') {
            startDate.type = 'month';
            startDate.value = new Date().toISOString().slice(0, 7);
            startDateLabel.textContent = 'Bulan';
            endDateWrapper.classList.add('hidden');
        } else if (type === 'yearly') {
            startDate.type = 'number';
            startDate.value = new Date().getFullYear();
            startDate.min = 2020;
            startDate.max = 2100;
            startDateLabel.textContent = 'Tahun';
            endDateWrapper.classList.add('hidden');
        } else if (type === 'custom') {
            startDate.type = 'date';
            startDate.value = new Date().toISOString().split('T')[0];
            startDateLabel.textContent = 'Tanggal Mulai';
            endDateWrapper.classList.remove('hidden');
            endDate.value = new Date().toISOString().split('T')[0];
        }
    });

    window.loadReport = async function() {
        const period = periodType.value;
        let start = startDate.value;
        const end = endDate.value;

        // Konversi tahun ke format date
        if (period === 'yearly') {
            start = `${start}-01-01`;
        }

        const params = new URLSearchParams({
            period: period,
            start_date: start,
            end_date: end
        });

        // Show loading
        document.getElementById('statsSection').classList.add('hidden');
        document.getElementById('dataSection').classList.add('hidden');
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('loadingState').classList.remove('hidden');

        try {
            const response = await fetch(`/ppbj/report/data?${params}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Gagal memuat data');

            const result = await response.json();

            // Hide loading
            document.getElementById('loadingState').classList.add('hidden');

            if (result.data.length === 0) {
                document.getElementById('emptyState').classList.remove('hidden');
                return;
            }

            // Update statistics
            document.getElementById('statTotal').textContent = result.stats.total;
            document.getElementById('statOnTrack').textContent = result.stats.on_track;
            document.getElementById('statWarning').textContent = result.stats.warning;
            document.getElementById('statOverdue').textContent = result.stats.overdue;
            document.getElementById('statTotalValue').textContent = formatRupiah(result.stats.total_value);
            document.getElementById('statAvgProgress').textContent = Math.round(result.stats.avg_progress || 0) + '%';

            // Show stats
            document.getElementById('statsSection').classList.remove('hidden');

            // Render table
            renderTable(result.data);
            document.getElementById('dataSection').classList.remove('hidden');

        } catch (error) {
            document.getElementById('loadingState').classList.add('hidden');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Gagal memuat laporan'
            });
        }
    };

    function renderTable(data) {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = '';

        data.forEach((row, index) => {
            const statusColor = {
                'ON TRACK': 'bg-green-600',
                'WARNING': 'bg-yellow-500',
                'OVERDUE': 'bg-red-600',
                'CANCELLED': 'bg-gray-600'
            }[row.status_sla] || 'bg-gray-600';

            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors';
            tr.style.animationDelay = `${index * 0.05}s`;
            tr.classList.add('animate-fade-in');

            tr.innerHTML = `
                <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">${row.ppbj_no || '-'}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${formatDate(row.created_at)}</td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">${row.uraian || '-'}</td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${row.buyer || '-'}</td>
                <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-bold text-white ${statusColor}">
                        ${row.status_sla}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="h-2 rounded-full bg-blue-600 transition-all duration-500" style="width: ${row.progres}%"></div>
                    </div>
                    <small class="text-gray-600 dark:text-gray-400">${row.progres}%</small>
                </td>
                <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">${formatRupiah(row.total_sebelum_ppn)}</td>
            `;

            tbody.appendChild(tr);
        });
    }

    window.exportReport = function() {
        const period = periodType.value;
        let start = startDate.value;
        const end = endDate.value;

        if (period === 'yearly') {
            start = `${start}-01-01`;
        }

        const params = new URLSearchParams({
            period: period,
            start_date: start,
            end_date: end
        });

        window.location.href = `/ppbj/report/export?${params}`;
    };

    function formatRupiah(value) {
        return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    // Auto load report on page load
    loadReport();
})();
</script>

<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scale-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

.animate-slide-up {
    animation: slide-up 0.6s ease-out forwards;
}

.animate-scale-in {
    animation: scale-in 0.5s ease-out forwards;
}
</style>
@endpush