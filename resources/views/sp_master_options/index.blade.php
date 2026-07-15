@extends('layouts.app')

@section('title', 'Master Kontrak SP')

@push('styles')
    <style>
        .master-sp-hero {
            color: #fff;
        }

        .master-sp-hero p {
            color: rgba(219, 234, 254, .95);
        }

        .master-secure-popup {
            width: min(92vw, 34rem) !important;
            padding: 1.35rem 1.45rem 1.45rem !important;
            border-radius: 1.1rem !important;
            border: 1px solid rgba(226, 232, 240, .9) !important;
            box-shadow: 0 28px 80px rgba(15, 23, 42, .28) !important;
        }

        .dark .master-secure-popup {
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%) !important;
            color: #f8fafc !important;
            border-color: rgba(71, 85, 105, .95) !important;
        }

        .master-secure-popup .swal2-icon {
            margin: .75rem auto .5rem !important;
        }

        .master-secure-popup .swal2-title {
            padding: 0 !important;
            margin: .65rem 0 1.15rem !important;
            color: #0f172a !important;
            font-size: 1.55rem !important;
            font-weight: 950 !important;
            letter-spacing: -.03em !important;
        }

        .dark .master-secure-popup .swal2-title,
        .dark .master-secure-popup .swal2-html-container {
            color: #f8fafc !important;
        }

        .master-secure-popup .swal2-html-container {
            margin: 0 !important;
            padding: 0 !important;
            color: #0f172a !important;
            overflow: visible !important;
        }

        .master-secure-popup .swal2-actions {
            gap: .75rem !important;
            margin-top: 1.3rem !important;
        }

        .master-secure-popup .swal2-confirm,
        .master-secure-popup .swal2-cancel {
            border-radius: .85rem !important;
            padding: .78rem 1.2rem !important;
            font-weight: 950 !important;
        }

        .master-delete-stack {
            display: grid;
            gap: .78rem;
            text-align: left;
        }

        .master-delete-danger,
        .master-delete-warning,
        .master-delete-lock-preview {
            border-radius: 1rem;
            padding: .95rem 1rem;
            font-size: .78rem;
            font-weight: 750;
            line-height: 1.65;
        }

        .master-delete-danger {
            background: #fff1f2;
            border: 1px solid #fca5a5;
            color: #991b1b;
        }

        .master-delete-warning {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            color: #92400e;
        }

        .master-delete-lock-preview {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            color: #334155;
        }

        .master-delete-title {
            display: flex;
            align-items: center;
            gap: .45rem;
            margin-bottom: .35rem;
            font-size: .82rem;
            font-weight: 950;
            line-height: 1.35;
        }

        .master-delete-input-wrap {
            display: grid;
            gap: .45rem;
        }

        .master-delete-input-wrap label {
            color: #0f172a;
            font-size: .82rem;
            font-weight: 950;
        }

        .master-delete-password-field {
            display: flex;
            align-items: center;
            gap: .45rem;
            min-height: 3.05rem;
            border: 1px solid #cbd5e1;
            border-radius: .9rem;
            background: #fff;
            padding: .25rem .35rem .25rem .95rem;
        }

        .master-delete-password-field input.swal2-input {
            flex: 1;
            min-width: 0;
            width: 100% !important;
            height: 2.35rem;
            margin: 0 !important;
            padding: 0 !important;
            border: 0;
            background: transparent;
            box-shadow: none !important;
            color: #0f172a;
            font-size: .95rem;
            font-weight: 800;
            outline: 0;
        }

        .master-delete-toggle {
            min-width: 4.25rem;
            border: 0;
            border-radius: .65rem;
            background: #e0f2fe;
            color: #075985;
            cursor: pointer;
            font-size: .76rem;
            font-weight: 950;
            padding: .55rem .7rem;
        }

        .master-delete-countdown {
            margin: .85rem auto .25rem;
            width: fit-content;
            min-width: 11.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #fee2e2, #ffedd5);
            border: 1px solid #fca5a5;
            color: #7f1d1d;
            font-size: 1.5rem;
            font-weight: 950;
            letter-spacing: .08em;
            padding: .75rem 1.1rem;
            text-align: center;
        }

        .master-delete-time-pill {
            display: inline-flex;
            margin-top: .35rem;
            border-radius: 999px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            color: #1e3a8a;
            font-size: .74rem;
            font-weight: 950;
            padding: .4rem .75rem;
        }

        .dark .master-delete-danger {
            background: #7f1d1d !important;
            border-color: #f87171 !important;
            color: #fff !important;
        }

        .dark .master-delete-warning {
            background: #78350f !important;
            border-color: #fbbf24 !important;
            color: #fff7ed !important;
        }

        .dark .master-delete-lock-preview,
        .dark .master-delete-password-field {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #e2e8f0 !important;
        }

        .dark .master-delete-input-wrap label,
        .dark .master-delete-password-field input.swal2-input {
            color: #fff !important;
        }

        .dark .master-delete-toggle {
            background: #2563eb !important;
            color: #fff !important;
        }

        .dark .master-delete-countdown {
            background: linear-gradient(135deg, #7f1d1d, #9a3412) !important;
            border-color: #fb7185 !important;
            color: #fff !important;
        }

        .dark .master-delete-time-pill {
            background: #172554 !important;
            border-color: #3b82f6 !important;
            color: #dbeafe !important;
        }
    </style>
@endpush

@section('content')
    @php
        $typeBadges = [
            'bidang_ip_itu' => 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
            'penandatangan_sci' => 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
            'jabatan_sci' => 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        ];
    @endphp

    <div class="space-y-6">
        <div class="master-sp-hero rounded-2xl p-6 shadow-xl bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 relative overflow-hidden">
            <div class="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
            <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">⚙️</span>
                        <h1 class="text-2xl font-extrabold tracking-tight">Master Kontrak SP</h1>
                    </div>
                    <p class="text-sm mt-1">
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

                                        <button type="button"
                                            onclick="deleteMasterOption(@js($opt->nama), @js($types[$opt->type] ?? $opt->type), @js(route('sp-master-options.destroy', $opt)))"
                                            class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition">
                                            Hapus
                                        </button>
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
            function masterDeletePad(value) {
                return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
            }

            function masterDeleteFormatDuration(seconds) {
                const safe = Math.max(0, Math.ceil(Number(seconds) || 0));
                return `${masterDeletePad(safe / 3600)}:${masterDeletePad((safe % 3600) / 60)}:${masterDeletePad(safe % 60)}`;
            }

            function masterDeleteFormatDateTime(date) {
                return new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Jakarta'
                }).format(date).replace(/\./g, ':');
            }

            function masterDeleteEscapeHtml(value) {
                return String(value ?? '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            }

            function showMasterDeleteLockCountdown(message, retryAfter, lockedUntil = null) {
                const targetTime = lockedUntil ? new Date(lockedUntil).getTime() : Date.now() + (Number(retryAfter || 900) * 1000);

                Swal.fire({
                    icon: 'error',
                    title: 'Aksi dikunci sementara',
                    html: `
                        <p class="text-sm leading-relaxed mb-4">${masterDeleteEscapeHtml(message || 'Terlalu banyak percobaan password salah.')}</p>
                        <div id="masterDeleteCountdown" class="master-delete-countdown">00:15:00</div>
                        <p class="mt-3 text-xs font-semibold opacity-90">Waktu tersisa sebelum hapus master bisa dicoba lagi.</p>
                        <div id="masterDeleteUnlockAt" class="master-delete-time-pill mt-3"></div>
                    `,
                    confirmButtonText: 'Saya mengerti',
                    confirmButtonColor: '#ef4444',
                    customClass: { popup: 'master-secure-popup' },
                    didOpen: () => {
                        const countdown = document.getElementById('masterDeleteCountdown');
                        const unlockAt = document.getElementById('masterDeleteUnlockAt');
                        const render = () => {
                            const remaining = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
                            if (countdown) countdown.textContent = masterDeleteFormatDuration(remaining);
                            if (unlockAt) unlockAt.textContent = `Bisa dicoba lagi: ${masterDeleteFormatDateTime(new Date(targetTime))} WIB`;
                        };
                        render();
                        const timer = setInterval(render, 1000);
                        Swal.getPopup().dataset.masterDeleteTimer = timer;
                    },
                    willClose: () => {
                        const timer = Swal.getPopup()?.dataset?.masterDeleteTimer;
                        if (timer) clearInterval(Number(timer));
                    }
                });
            }

            async function deleteMasterOption(nama, jenis, url) {
                const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '{{ csrf_token() }}';

                const result = await Swal.fire({
                    icon: 'warning',
                    title: 'Hapus Master Kontrak?',
                    html: `
                        <div class="master-delete-stack">
                            <div class="master-delete-danger">
                                <div class="master-delete-title">⚠️ Data master</div>
                                <div><strong>${masterDeleteEscapeHtml(jenis)}</strong></div>
                                <div>${masterDeleteEscapeHtml(nama)}</div>
                                <p class="mt-2">Data master akan dihapus permanen dan tidak muncul lagi di dropdown Penomoran SP.</p>
                            </div>
                            <div class="master-delete-warning">
                                <div class="master-delete-title">🔐 Verifikasi superadmin umum</div>
                                <p>Hapus master hanya bisa memakai password akun <strong>superadmin umum</strong> atau <strong>superadmin@sucofindo.com</strong>.</p>
                            </div>
                            <div class="master-delete-input-wrap">
                                <label for="masterDeletePassword">Password superadmin umum</label>
                                <div class="master-delete-password-field">
                                    <input id="masterDeletePassword" type="password" class="swal2-input" placeholder="Masukkan password superadmin umum">
                                    <button type="button" id="masterDeleteToggle" class="master-delete-toggle">Lihat</button>
                                </div>
                            </div>
                            <div class="master-delete-lock-preview">
                                <p>Jika salah 3 kali, aksi hapus dikunci 15 menit untuk menjaga data master tetap aman.</p>
                            </div>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Hapus Master',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#64748b',
                    focusConfirm: false,
                    customClass: { popup: 'master-secure-popup' },
                    didOpen: () => {
                        const input = document.getElementById('masterDeletePassword');
                        const toggle = document.getElementById('masterDeleteToggle');
                        input?.focus();
                        toggle?.addEventListener('click', () => {
                            input.type = input.type === 'password' ? 'text' : 'password';
                            toggle.textContent = input.type === 'password' ? 'Lihat' : 'Sembunyikan';
                        });
                    },
                    preConfirm: async () => {
                        const password = document.getElementById('masterDeletePassword')?.value || '';
                        if (!password.trim()) {
                            Swal.showValidationMessage('Password superadmin umum wajib diisi.');
                            return false;
                        }

                        try {
                            const response = await fetch(url, {
                                method: 'DELETE',
                                headers: {
                                    'X-CSRF-TOKEN': csrf,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ admin_password: password })
                            });
                            const data = await response.json().catch(() => ({}));

                            if (response.status === 429 && data.locked) {
                                return { locked: true, data };
                            }

                            if (!response.ok) {
                                Swal.showValidationMessage(data.message || 'Gagal menghapus master kontrak.');
                                return false;
                            }

                            return { ok: true, data };
                        } catch (error) {
                            Swal.showValidationMessage('Gagal menghapus master kontrak. Periksa koneksi lalu coba lagi.');
                            return false;
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });

                if (!result.isConfirmed || !result.value) return;

                if (result.value.locked) {
                    showMasterDeleteLockCountdown(result.value.data.message, result.value.data.retry_after, result.value.data.locked_until);
                    return;
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Master dihapus',
                    text: result.value.data?.message || 'Master kontrak berhasil dihapus.',
                    timer: 1400,
                    showConfirmButton: false,
                    customClass: { popup: 'master-secure-popup' }
                });

                window.location.href = result.value.data?.redirect || window.location.href;
            }

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
