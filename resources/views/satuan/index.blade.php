@extends('layouts.app')

@section('title', 'Master Satuan')

@push('styles')
    <style>
        .satuan-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .tbl-row-hover:hover {
            background: rgba(16, 185, 129, .05);
            transition: background .15s;
        }

        .modal-overlay {
            backdrop-filter: blur(6px);
            background: rgba(0, 0, 0, .5);
        }
    </style>
@endpush

@section('content')
    <div class="space-y-6">

        {{-- HEADER --}}
        <div class="satuan-header rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <span class="text-3xl">📦</span>
                        <h1 class="text-2xl font-bold tracking-tight">Master Satuan</h1>
                    </div>
                    <p class="text-emerald-100 text-sm">Kelola satuan barang/jasa untuk SPPH</p>
                    <span class="mt-2 inline-block text-xs bg-white/20 rounded-full px-3 py-1 font-medium">
                        Total: {{ $satuans->count() }} Satuan
                    </span>
                </div>
                <button onclick="openModal('addModal')"
                    class="flex items-center gap-2 bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-all shadow-lg whitespace-nowrap">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Satuan
                </button>
            </div>
        </div>

        {{-- ALERTS --}}
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

        {{-- TABLE --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-12">
                                #</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[150px]">
                                Nama Satuan</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Keterangan</th>
                            <th
                                class="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-28">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($satuans as $i => $s)
                            <tr class="tbl-row-hover" data-id="{{ $s->id }}">
                                <td class="px-4 py-3 text-gray-400 text-xs font-mono">{{ $i + 1 }}</td>
                                <td class="px-4 py-3">
                                    <span
                                        class="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono text-xs font-bold">
                                        {{ $s->nama_satuan }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{{ $s->keterangan ?? '-' }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button
                                            onclick="openEditModal({{ $s->id }}, '{{ addslashes($s->nama_satuan) }}', '{{ addslashes($s->keterangan ?? '') }}')"
                                            class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                            title="Edit">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <form method="POST" action="{{ route('satuan.destroy', $s) }}"
                                            onsubmit="return confirmDelete(event)">
                                            @csrf @method('DELETE')
                                            <button type="submit"
                                                class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                title="Hapus">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3">
                                        <span class="text-5xl">📦</span>
                                        <p class="font-medium">Belum ada data satuan</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {{-- MODAL TAMBAH --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
            <div class="satuan-header px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Tambah Satuan</h2>
            </div>
            <form method="POST" action="{{ route('satuan.store') }}" class="p-6 space-y-4">
                @csrf
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Satuan <span
                            class="text-red-500">*</span></label>
                    <input type="text" name="nama_satuan" required placeholder="cth: Pcs, Unit, Kg..."
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Keterangan</label>
                    <input type="text" name="keterangan" placeholder="cth: Pieces / buah"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('addModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl satuan-header text-white font-bold hover:opacity-90 shadow-lg">💾
                        Simpan</button>
                </div>
            </form>
        </div>
    </div>

    {{-- MODAL EDIT --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Edit Satuan</h2>
            </div>
            <form method="POST" id="editForm" class="p-6 space-y-4">
                @csrf @method('PUT')
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Satuan <span
                            class="text-red-500">*</span></label>
                    <input type="text" name="nama_satuan" id="editNama" required
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Keterangan</label>
                    <input type="text" name="keterangan" id="editKet"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('editModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90 shadow-lg">💾
                        Update</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
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
        function openEditModal(id, nama, ket) {
            document.getElementById('editForm').action = `/satuan/${id}`;
            document.getElementById('editNama').value = nama;
            document.getElementById('editKet').value = ket;
            openModal('editModal');
        }
        function confirmDelete(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Hapus Satuan?', text: 'Data satuan akan dihapus!', icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280',
                confirmButtonText: 'Hapus!', cancelButtonText: 'Batal',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
            }).then(r => { if (r.isConfirmed) e.target.closest('form').submit(); });
            return false;
        }
    </script>
@endpush