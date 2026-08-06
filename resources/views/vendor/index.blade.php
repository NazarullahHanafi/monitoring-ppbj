@extends('layouts.app')

@section('title', 'Master Vendor')

@push('styles')
    <style>
        .vendor-header-gradient {
            background: linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #6366f1 100%);
        }

        .modal-overlay {
            backdrop-filter: blur(6px);
            background: rgba(0, 0, 0, .5);
        }

        .tbl-row-hover:hover {
            background: rgba(16, 185, 129, .04);
            transition: background .15s;
        }

        .row-inactive {
            opacity: .45;
        }

        .row-inactive:hover {
            opacity: .7;
        }

        .stat-card {
            transition: transform .15s;
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }
    </style>
@endpush

@section('content')
    <div class="space-y-6">

        {{-- HEADER --}}
        <div
            class="vendor-header-gradient rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <span class="text-3xl">🏢</span>
                        <h1 class="text-2xl font-bold tracking-tight">Master Vendor</h1>
                    </div>
                    <p class="text-emerald-100 text-sm">Kelola data vendor beserta alamat & kontak</p>
                </div>
                <div class="flex items-center gap-2.5 shrink-0">
                    <a href="javascript:history.back()"
                        class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap group">
                        <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span class="text-sm">Back</span>
                    </a>
                    <button onclick="openModal('addModal')"
                        class="flex items-center gap-2 bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/20 whitespace-nowrap group">
                        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Vendor
                    </button>
                </div>
            </div>
        </div>

        {{-- STATS --}}
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
                class="stat-card bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400">Total Vendor</p>
                <p class="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {{ number_format($stats['total'], 0, ',', '.') }}</p>
            </div>
            <div
                class="stat-card bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400">Aktif</p>
                <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {{ number_format($stats['active'], 0, ',', '.') }}</p>
            </div>
            <div
                class="stat-card bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400">Nonaktif</p>
                <p class="text-xl font-bold text-gray-400">
                    {{ number_format($stats['inactive'], 0, ',', '.') }}</p>
            </div>
            <div
                class="stat-card bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400">Punya SP</p>
                <p class="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {{ number_format($stats['dengan_sp'], 0, ',', '.') }}</p>
            </div>
        </div>

        {{-- ALERTS --}}
        @if(session('success'))
            <div id="alertSuccess"
                class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ session('success') }}</span>
                <button onclick="this.closest('div').remove()"
                    class="ml-auto text-green-500 hover:text-green-700">✕</button>
            </div>
        @endif

        @if($errors->any())
            <div
                class="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                </svg>
                <ul class="text-sm">
                    @foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach
                </ul>
            </div>
        @endif

        {{-- FILTER --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="searchInput" value="{{ $search }}"
                        placeholder="Cari nama vendor, alamat, telepon, email, NPWP, penandatangan, jabatan..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                </div>
                @if($search)
                    <button onclick="window.location.href='{{ route('vendor.index') }}'"
                        class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold text-sm whitespace-nowrap">
                        🔄 Reset
                    </button>
                @endif
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
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[200px]">
                                Nama Vendor</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[220px]">
                                Alamat</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[120px]">
                                Telepon</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[100px]">
                                Fax</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[160px]">
                                Email</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[140px]">
                                NPWP</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[170px]">
                                Penandatangan</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[130px]">
                                Jabatan</th>
                            <th
                                class="px-3 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-24">
                                Status</th>
                            <th
                                class="px-3 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-36">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($vendors as $i => $v)
                            <tr class="tbl-row-hover {{ !$v->is_active ? 'row-inactive' : '' }}">
                                <td class="px-3 py-3 text-gray-400 text-xs font-mono">
                                    {{ $vendors->firstItem() + $i }}
                                </td>
                                <td class="px-3 py-3">
                                    <div class="font-semibold text-gray-800 dark:text-gray-100">
                                        {{ $v->nama_vendor }}</div>
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate"
                                    title="{{ $v->alamat }}">
                                    {{ $v->alamat ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs font-mono">
                                    {{ $v->telepon ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs font-mono">
                                    {{ $v->fax ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-xs">
                                    @if($v->email)
                                        <a href="mailto:{{ $v->email }}"
                                            class="text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-[180px]"
                                            title="{{ $v->email }}">{{ $v->email }}</a>
                                    @else
                                        <span class="text-gray-400">-</span>
                                    @endif
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs font-mono">
                                    {{ $v->npwp ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs">
                                    {{ $v->direktur ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs">
                                    {{ $v->jabatan ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-center">
                                    @if($v->is_active)
                                        <span
                                            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Aktif
                                        </span>
                                    @else
                                        <span
                                            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Off
                                        </span>
                                    @endif
                                </td>
                                <td class="px-3 py-3">
                                    <div class="flex items-center justify-center gap-1">
                                        {{-- TOGGLE --}}
                                        <form method="POST"
                                            action="{{ route('vendor.toggle', $v) }}">
                                            @csrf
                                            <button type="submit"
                                                class="p-1.5 rounded-lg {{ $v->is_active ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30' }} transition-colors"
                                                title="{{ $v->is_active ? 'Nonaktifkan' : 'Aktifkan' }}">
                                                @if($v->is_active)
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                    </svg>
                                                @else
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                @endif
                                            </button>
                                        </form>
                                        {{-- EDIT --}}
                                        <button
                                            onclick="openEditModal({{ $v->id }},{{ Js::from($v->nama_vendor) }},{{ Js::from($v->alamat) }},{{ Js::from($v->telepon) }},{{ Js::from($v->fax) }},{{ Js::from($v->email) }},{{ Js::from($v->npwp) }},{{ Js::from($v->direktur) }},{{ Js::from($v->jabatan) }},{{ $v->is_active ? 1 : 0 }})"
                                            class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                            title="Edit">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        {{-- HAPUS --}}
                                        <form method="POST"
                                            action="{{ route('vendor.destroy', $v) }}"
                                            onsubmit="return confirmDelete(event)">
                                            @csrf @method('DELETE')
                                            <button type="submit"
                                                class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                title="Hapus">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="11"
                                    class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3">
                                        <span class="text-5xl">🏢</span>
                                        <p class="font-medium">Belum ada data vendor</p>
                                        <p class="text-sm">Klik <strong>Tambah Vendor</strong> untuk
                                            memulai</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($vendors->hasPages())
                <div
                    class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Menampilkan {{ $vendors->firstItem() }}–{{ $vendors->lastItem() }} dari
                        {{ $vendors->total() }} vendor
                    </p>
                    {{ $vendors->links() }}
                </div>
            @endif
        </div>
    </div>

    {{-- ═══════════════════ MODAL TAMBAH ═══════════════════ --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div class="vendor-header-gradient px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Tambah Vendor Baru</h2>
            </div>
            <form method="POST" action="{{ route('vendor.store') }}" class="p-6 space-y-4" id="addVendorForm">
                @csrf
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama
                        Vendor <span class="text-red-500">*</span></label>
                    <input type="text" name="nama_vendor" id="addNamaVendor" required
                        placeholder="PT. Nama Vendor..."
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Alamat</label>
                    <textarea name="alamat" id="addAlamatVendor" rows="3"
                        placeholder="Jl. Contoh No. 1, Kota..."
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Telepon</label>
                        <input type="text" name="telepon" id="addTelpVendor" placeholder="0761-xxxxx"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Fax</label>
                        <input type="text" name="fax" id="addFaxVendor" placeholder="0761-xxxxx"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                    </div>
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" name="email" id="addEmailVendor" placeholder="vendor@contoh.com"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">NPWP</label>
                    <input type="text" name="npwp" id="addNpwpVendor" placeholder="Contoh: 01.234.567.8-999.000"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Penandatangan</label>
                        <input type="text" name="direktur" id="addDirekturVendor" placeholder="Nama penandatangan..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan</label>
                        <input type="text" name="jabatan" id="addJabatanVendor" placeholder="Direktur / Ketua / Manager..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="is_active" id="addIsActive" value="1" checked
                        class="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
                    <label for="addIsActive"
                        class="text-sm font-semibold text-gray-700 dark:text-gray-300">Vendor Aktif</label>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('addModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl vendor-header-gradient text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-500/30">💾
                        Simpan</button>
                </div>
            </form>
        </div>
    </div>

    {{-- ═══════════════════ MODAL EDIT ═══════════════════ --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Edit Vendor</h2>
            </div>
            <form method="POST" id="editFormVendor" class="p-6 space-y-4">
                @csrf @method('PUT')
                <input type="hidden" id="editVendorId" value="">
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama
                        Vendor <span class="text-red-500">*</span></label>
                    <input type="text" name="nama_vendor" id="editNamaVendor" required
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Alamat</label>
                    <textarea name="alamat" id="editAlamatVendor" rows="3"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none text-sm"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Telepon</label>
                        <input type="text" name="telepon" id="editTelpVendor"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Fax</label>
                        <input type="text" name="fax" id="editFaxVendor"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" name="email" id="editEmailVendor"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">NPWP</label>
                    <input type="text" name="npwp" id="editNpwpVendor"
                        placeholder="Contoh: 01.234.567.8-999.000"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Penandatangan</label>
                        <input type="text" name="direktur" id="editDirekturVendor"
                            placeholder="Nama penandatangan..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan</label>
                        <input type="text" name="jabatan" id="editJabatanVendor"
                            placeholder="Direktur / Ketua / Manager..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="is_active" id="editIsActive" value="1"
                        class="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500">
                    <label for="editIsActive"
                        class="text-sm font-semibold text-gray-700 dark:text-gray-300">Vendor Aktif</label>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('editModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90 shadow-lg shadow-amber-500/30">💾
                        Update</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // ===== MODAL =====
        function openModal(id) {
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
            document.getElementById(id).classList.remove('flex');
            document.body.style.overflow = '';
        }

        // ===== EDIT MODAL =====
        function openEditModal(id, nama, alamat, telepon, fax, email, npwp, direktur, jabatan, isActive) {
            document.getElementById('editFormVendor').action = `/vendors/${id}`;
            document.getElementById('editVendorId').value = id;
            document.getElementById('editNamaVendor').value = nama;
            document.getElementById('editAlamatVendor').value = alamat || '';
            document.getElementById('editTelpVendor').value = telepon || '';
            document.getElementById('editFaxVendor').value = fax || '';
            document.getElementById('editEmailVendor').value = email || '';
            document.getElementById('editNpwpVendor').value = npwp || '';
            document.getElementById('editDirekturVendor').value = direktur || '';
            document.getElementById('editJabatanVendor').value = jabatan || '';
            document.getElementById('editIsActive').checked = isActive == 1;
            openModal('editModal');
        }

        // ===== DELETE =====
        function confirmDelete(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Hapus Vendor?',
                text: 'Data vendor akan dihapus permanen!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Batal',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
            }).then(r => {
                if (r.isConfirmed) e.target.closest('form').submit();
            });
            return false;
        }

        // ===== SEARCH =====
        let searchTimer = null;
        const searchInput = document.getElementById('searchInput');
        const vendorIndexUrl = @json(route('vendor.index'));

        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                const q = this.value.trim();
                window.location.href = q ? `${vendorIndexUrl}?search=${encodeURIComponent(q)}` : vendorIndexUrl;
            }, 400);
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimer);
                const q = this.value.trim();
                window.location.href = q ? `${vendorIndexUrl}?search=${encodeURIComponent(q)}` : vendorIndexUrl;
            }
        });

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('button[onclick="openModal(\'addModal\')"]').addEventListener('click', () => {
                document.getElementById('addVendorForm').reset();
                document.getElementById('addIsActive').checked = true;
            });

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('search')) {
                searchInput.focus();
                searchInput.select();
            }
        });
    </script>
@endpush
