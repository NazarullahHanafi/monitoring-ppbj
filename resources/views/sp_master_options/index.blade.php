@extends('layouts.app')

@section('title', 'Master Kontrak SP')

@section('content')
    @php
        $typeBadges = [
            'bidang_ip_itu' => 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
            'penandatangan_sci' => 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
            'jabatan_sci' => 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        ];
    @endphp

    <div class="space-y-6">
        <div class="rounded-2xl p-6 text-dark shadow-xl bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 relative overflow-hidden">
            <div class="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
            <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">⚙️</span>
                        <h1 class="text-2xl font-bold">Master Kontrak SP</h1>
                    </div>
                    <p class="text-dark text-sm mt-1">
                        Kelola Bidang IP/ITU, Penandatangan SCI, dan Jabatan SCI untuk dropdown Penomoran SP.
                    </p>
                </div>

                <button type="button" onclick="openAddModal()"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 px-5 py-3 font-bold shadow-lg hover:bg-blue-50 dark:hover:bg-blue-600 transition">
                    <span>+</span>
                    Tambah Master
                </button>
            </div>
        </div>

        @if(session('success'))
            <div class="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-green-700 dark:text-green-300 font-semibold">
                {{ session('success') }}
            </div>
        @endif

        @if($errors->any())
            <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-red-700 dark:text-red-300">
                <ul class="list-disc pl-5 text-sm">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div class="text-xs text-gray-500 dark:text-gray-400">Total Master</div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ number_format($stats['total']) }}</div>
            </div>
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div class="text-xs text-gray-500 dark:text-gray-400">Bidang IP / ITU</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ number_format($stats['bidang_ip_itu']) }}</div>
            </div>
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div class="text-xs text-gray-500 dark:text-gray-400">Penandatangan SCI</div>
                <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ number_format($stats['penandatangan_sci']) }}</div>
            </div>
            <div class="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div class="text-xs text-gray-500 dark:text-gray-400">Jabatan SCI</div>
                <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ number_format($stats['jabatan_sci']) }}</div>
            </div>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
            <form method="GET" action="{{ route('sp-master-options.index') }}" class="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div class="md:col-span-2">
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Cari Master</label>
                    <input type="text" name="search" value="{{ $search }}" placeholder="Cari nama master..."
                        class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Jenis</label>
                    <select name="type"
                        class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Semua Jenis</option>
                        @foreach($types as $key => $label)
                            <option value="{{ $key }}" @selected($type === $key)>{{ $label }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="flex items-end gap-2">
                    <button type="submit" class="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition">
                        Filter
                    </button>
                    <a href="{{ route('sp-master-options.index') }}" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        Reset
                    </a>
                </div>
            </form>
        </div>

        <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400 w-14">#</th>
                            <th class="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400 min-w-[190px]">Jenis</th>
                            <th class="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Nama</th>
                            <th class="px-4 py-3 text-center text-xs font-bold uppercase text-gray-500 dark:text-gray-400 w-32">Status</th>
                            <th class="px-4 py-3 text-center text-xs font-bold uppercase text-gray-500 dark:text-gray-400 w-36">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($options as $i => $opt)
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td class="px-4 py-3 text-gray-400 font-mono text-xs">{{ $options->firstItem() + $i }}</td>
                                <td class="px-4 py-3">
                                    <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold {{ $typeBadges[$opt->type] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' }}">
                                        {{ $types[$opt->type] ?? $opt->type }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">{{ $opt->nama }}</td>
                                <td class="px-4 py-3 text-center">
                                    @if($opt->is_active)
                                        <span class="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-xs font-bold text-green-700 dark:text-green-300">Aktif</span>
                                    @else
                                        <span class="inline-flex rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-300">Nonaktif</span>
                                    @endif
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex justify-center gap-2">
                                        <button type="button"
                                            onclick="openEditModal({{ $opt->id }}, @js($opt->type), @js($opt->nama), {{ $opt->is_active ? 1 : 0 }})"
                                            class="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition">
                                            Edit
                                        </button>

                                        <form action="{{ route('sp-master-options.destroy', $opt) }}" method="POST" onsubmit="return confirm('Yakin hapus master ini?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition">
                                                Hapus
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="px-4 py-12 text-center text-gray-500 dark:text-gray-400">Data master belum ada.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="p-4 border-t border-gray-100 dark:border-gray-700">
                {{ $options->links() }}
            </div>
        </div>
    </div>

    <div id="addModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
                <h2 class="font-bold">Tambah Master Kontrak</h2>
            </div>

            <form action="{{ route('sp-master-options.store') }}" method="POST" class="p-5 space-y-4">
                @csrf
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jenis Master</label>
                    <select name="type" required class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">-- pilih jenis --</option>
                        @foreach($types as $key => $label)
                            <option value="{{ $key }}" @selected($type === $key)>{{ $label }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                    <input type="text" name="nama" required placeholder="Masukkan nama master..." class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <input type="checkbox" name="is_active" value="1" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    Aktif
                </label>

                <div class="flex gap-2 pt-2">
                    <button type="button" onclick="closeAddModal()" class="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Batal</button>
                    <button type="submit" class="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition">Simpan</button>
                </div>
            </form>
        </div>
    </div>

    <div id="editModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-4 text-white">
                <h2 class="font-bold">Edit Master Kontrak</h2>
            </div>

            <form id="editForm" method="POST" class="p-5 space-y-4">
                @csrf
                @method('PUT')

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jenis Master</label>
                    <select name="type" id="editType" required class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">-- pilih jenis --</option>
                        @foreach($types as $key => $label)
                            <option value="{{ $key }}">{{ $label }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                    <input type="text" name="nama" id="editNama" required class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
                </div>

                <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <input type="checkbox" name="is_active" id="editActive" value="1" class="rounded border-gray-300 text-amber-600 focus:ring-amber-500">
                    Aktif
                </label>

                <div class="flex gap-2 pt-2">
                    <button type="button" onclick="closeEditModal()" class="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Batal</button>
                    <button type="submit" class="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-600 transition">Update</button>
                </div>
            </form>
        </div>
    </div>

    @push('scripts')
        <script>
            function openAddModal() {
                const modal = document.getElementById('addModal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }

            function closeAddModal() {
                const modal = document.getElementById('addModal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }

            function openEditModal(id, type, nama, isActive) {
                const form = document.getElementById('editForm');
                form.action = `/sp-master-options/${id}`;
                document.getElementById('editType').value = type || '';
                document.getElementById('editNama').value = nama || '';
                document.getElementById('editActive').checked = Number(isActive) === 1;

                const modal = document.getElementById('editModal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }

            function closeEditModal() {
                const modal = document.getElementById('editModal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeAddModal();
                    closeEditModal();
                }
            });

            document.getElementById('addModal')?.addEventListener('click', function(e) {
                if (e.target === this) closeAddModal();
            });

            document.getElementById('editModal')?.addEventListener('click', function(e) {
                if (e.target === this) closeEditModal();
            });
        </script>
    @endpush
@endsection
