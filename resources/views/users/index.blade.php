@extends('layouts.app')

@section('title', 'Management Users')

@push('styles')
    <style>
        /* Password Strength Indicator */
        .password-strength-meter {
            height: 4px;
            background: #e5e7eb;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 8px;
        }

        .password-strength-bar {
            height: 100%;
            transition: all 0.3s ease;
            border-radius: 2px;
        }

        .strength-weak {
            width: 33%;
            background: #ef4444;
        }

        .strength-medium {
            width: 66%;
            background: #f59e0b;
        }

        .strength-strong {
            width: 100%;
            background: #10b981;
        }

        .password-suggestion {
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .error-message {
            animation: shake 0.3s ease;
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            75% {
                transform: translateX(5px);
            }
        }
    </style>
@endpush

@section('content')
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
        {{-- ================= HEADER ================= --}}
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">👥 Management Users</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Kelola akun & password pengguna sistem</p>
            </div>

            <div class="flex gap-2">
                {{-- Export Button --}}
                <a href="{{ route('users.export', request()->query()) }}"
                    class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold stroke-white dark:text-white shadow-lg bg-green to-emerald-600 hover:from-emerald-600 hover:to-green-500 active:scale-95 transition-all duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="hidden sm:inline">Export CSV</span>
                    <span class="sm:hidden">Export</span>
                </a>

                {{-- Add User Button --}}
                <button type="button" onclick="openAddUserModal()"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[.99] transition border border-blue-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Tambah User</span>
                </button>
            </div>
        </div>

        {{-- ================= STATISTICS CARDS ================= --}}
        @if(isset($stats))
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {{-- Total Users --}}
                <div
                    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ $stats->total ?? 0 }}</p>
                        </div>
                        <div
                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <svg class="w-7 h-7 stroke-white dark:text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- Umum Department --}}
                <div
                    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Dept. Umum</p>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ $stats->umum_count ?? 0 }}</p>
                        </div>
                        <div
                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <svg class="w-7 h-7 stroke-white dark:text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- Operasional Department --}}
                <div
                    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Dept. Operasional</p>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                {{ $stats->operasional_count ?? 0 }}
                            </p>
                        </div>
                        <div
                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                            <svg class="w-7 h-7 stroke-white dark:text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- Superadmin --}}
                <div
                    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Superadmin</p>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ $stats->superadmin_count ?? 0 }}
                            </p>
                        </div>
                        <div
                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <svg class="w-7 h-7 stroke-white dark:text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- Viewer / Read Only --}}
                <div
                    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Viewer</p>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ $stats->viewer_count ?? 0 }}
                            </p>
                        </div>
                        <div
                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <svg class="w-7 h-7 stroke-white dark:text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        @endif

        {{-- ================= FILTER & SEARCH ================= --}}
        <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-4 mb-4">
            <form method="GET" action="{{ route('users.index') }}" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                {{-- Search --}}
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Cari User
                    </label>
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Nama atau email..."
                        class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                </div>

                {{-- Department Filter --}}
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Department
                    </label>
                    <select name="department"
                        class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                        <option value="">Semua</option>
                        <option value="umum" {{ request('department') === 'umum' ? 'selected' : '' }}>Umum</option>
                        <option value="operasional" {{ request('department') === 'operasional' ? 'selected' : '' }}>
                            Operasional</option>
                    </select>
                </div>

                {{-- Role Filter --}}
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Role
                    </label>
                    <select name="role"
                        class="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                        <option value="">Semua</option>
                        <option value="superadmin" {{ request('role') === 'superadmin' ? 'selected' : '' }}>Superadmin
                        </option>
                        <option value="user" {{ request('role') === 'user' ? 'selected' : '' }}>User</option>
                        <option value="viewer" {{ request('role') === 'viewer' ? 'selected' : '' }}>Viewer / Read Only
                        </option>
                    </select>
                </div>

                {{-- Buttons --}}
                <div class="md:col-span-4 flex gap-2">
                    <button type="submit"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <i class="fas fa-filter"></i> Filter
                    </button>
                    <a href="{{ route('users.index') }}"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                        <i class="fas fa-redo"></i> Reset
                    </a>
                </div>
            </form>
        </div>

        {{-- ================= TABLE LIST USERS ================= --}}
        <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {{-- Per Page & Total --}}
            <div
                class="px-6 py-4 bg-gray-50/50 dark:bg-gray-700/30 border-b border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Menampilkan <span class="font-bold text-gray-900 dark:text-white">{{ $users->firstItem() ?? 0 }}</span>
                    - <span class="font-bold text-gray-900 dark:text-white">{{ $users->lastItem() ?? 0 }}</span> dari <span
                        class="font-bold text-gray-900 dark:text-white">{{ $users->total() }}</span> users
                </div>
                <form method="GET" action="{{ route('users.index') }}" class="flex items-center gap-2">
                    @foreach(request()->except('per_page') as $key => $value)
                        <input type="hidden" name="{{ $key }}" value="{{ $value }}">
                    @endforeach

                    <label class="text-sm text-gray-600 dark:text-gray-400">Per halaman:</label>
                    <select name="per_page" onchange="this.form.submit()"
                        class="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all">
                        <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                        <option value="25" {{ request('per_page', 25) == 25 ? 'selected' : '' }}>25</option>
                        <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50</option>
                        <option value="100" {{ request('per_page') == 100 ? 'selected' : '' }}>100</option>
                    </select>
                </form>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50/50 dark:bg-gray-700/30 border-b border-gray-200/50 dark:border-gray-700/50">
                        <tr class="text-gray-700 dark:text-gray-300">
                            <th class="px-6 py-4 text-left font-semibold">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Nama
                                </div>
                            </th>
                            <th class="px-6 py-4 text-left font-semibold">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </div>
                            </th>
                            <th class="px-6 py-4 text-center font-semibold">Role</th>
                            <th class="px-6 py-4 text-center font-semibold">Department</th>
                            <th class="px-6 py-4 text-center font-semibold">Buyer Terkait</th>
                            <th class="px-6 py-4 text-center font-semibold">Dibuat</th>
                            <th class="px-6 py-4 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        @forelse($users as $user)
                            <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                                id="user-row-{{ $user->id }}">
                                {{-- Name --}}
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center stroke-white dark:text-white font-bold shadow-lg">
                                            {{ strtoupper(substr($user->name, 0, 1)) }}
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-900 dark:text-white">{{ $user->name }}</div>
                                            @if($user->id === auth()->id())
                                                <span class="text-xs text-blue-600 dark:text-blue-400 font-medium">(Anda)</span>
                                            @endif
                                        </div>
                                    </div>
                                </td>

                                {{-- Email --}}
                                <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {{ $user->email }}
                                    </div>
                                </td>

                                {{-- Role --}}
                                <td class="px-6 py-4 text-center">
                                    @if($user->role === 'superadmin')
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            SUPERADMIN
                                        </span>
                                    @elseif($user->role === 'viewer')
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            VIEWER
                                        </span>
                                    @else
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            USER
                                        </span>
                                    @endif
                                </td>

                                {{-- Department --}}
                                <td class="px-6 py-4 text-center">
                                    @if($user->department === 'umum')
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            UMUM
                                        </span>
                                    @else
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            OPERASIONAL
                                        </span>
                                    @endif
                                </td>

                                {{-- Buyer Mapping --}}
                                <td class="px-6 py-4 text-center">
                                    @if(!empty($user->buyer_name))
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {{ $user->buyer_name }}
                                        </span>
                                    @else
                                        <span class="text-xs text-gray-400 dark:text-gray-500">Belum dipetakan</span>
                                    @endif
                                </td>

                                {{-- Created At --}}
                                <td class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    {{ \Carbon\Carbon::parse($user->created_at)->format('d M Y') }}
                                </td>

                                {{-- Actions --}}
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center gap-2">
                                        {{-- Edit Button --}}
                                        <button type="button"
                                            onclick="openEditModal({{ $user->id }}, @js($user->name), @js($user->email), @js($user->role), @js($user->department), @js($user->buyer_name))"
                                            class="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200
                                                                           bg-blue-600 hover:bg-blue-700 text-white border border-blue-700
                                                                           dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-500
                                                                           shadow-sm hover:shadow-md active:scale-95"
                                            title="Edit data user">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span class="hidden sm:inline">Edit</span>
                                        </button>

                                        {{-- Password Button --}}
                                        <button type="button"
                                            onclick="openPasswordModal({{ $user->id }}, '{{ addslashes($user->name) }}')" class="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200
                                                                           bg-amber-500 hover:bg-amber-600 text-white border border-amber-600
                                                                           dark:bg-amber-600 dark:hover:bg-amber-700 dark:border-amber-500
                                                                           shadow-sm hover:shadow-md active:scale-95"
                                            title="Ubah password">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                            <span class="hidden sm:inline">Password</span>
                                        </button>

                                        {{-- Delete Button --}}
                                        @if($user->id !== auth()->id())
                                            <button type="button"
                                                onclick="deleteUser({{ $user->id }}, '{{ addslashes($user->name) }}')" class="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200
                                                                                       bg-red-600 hover:bg-red-700 text-white border border-red-700
                                                                                       dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-500
                                                                                       shadow-sm hover:shadow-md active:scale-95"
                                                title="Hapus user">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span class="hidden sm:inline">Hapus</span>
                                            </button>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="text-center py-16 text-gray-500 dark:text-gray-400">
                                    <div class="flex flex-col items-center gap-4">
                                        <div
                                            class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Belum ada user
                                                terdaftar</p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Tambahkan user pertama
                                                untuk memulai</p>
                                            <button onclick="openAddUserModal()"
                                                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Tambah User
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Pagination --}}
            @if($users->hasPages())
                <div class="px-6 py-4 bg-gray-50/50 dark:bg-gray-700/30 border-t border-gray-200/50 dark:border-gray-700/50">
                    {{ $users->links() }}
                </div>
            @endif
        </div>
    </div>
    {{-- ================= MODAL TAMBAH USER ================= --}}
    <div id="addUserModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4"
        onclick="closeAddUserModal()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
            onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    <svg class="inline w-5 h-5 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Tambah User Baru
                </h3>
                <button onclick="closeAddUserModal()"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form id="addUserForm" onsubmit="handleAddUser(event)">
                @csrf
                <div class="space-y-4">
                    {{-- Name --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nama Lengkap <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" id="addName" required minlength="3"
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Min. 3 karakter">
                        <p class="text-xs text-gray-500 mt-1" id="addNameError"></p>
                    </div>

                    {{-- Email --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email <span class="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" id="addEmail" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="user@example.com">
                        <p class="text-xs text-gray-500 mt-1" id="addEmailError"></p>
                    </div>

                    {{-- Role --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Role <span class="text-red-500">*</span>
                        </label>
                        <select name="role" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="user">User</option>
                            <option value="viewer">Viewer / Read Only</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>

                    {{-- Department --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department <span class="text-red-500">*</span>
                        </label>
                        <select name="department" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="umum">Umum</option>
                            <option value="operasional">Operasional</option>
                        </select>
                    </div>

                    {{-- Buyer Mapping --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Buyer Terkait
                        </label>
                        <select name="buyer_name"
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">-- Tidak dipetakan --</option>
                            @foreach($masterBuyers as $buyer)
                                <option value="{{ $buyer }}">{{ $buyer }}</option>
                            @endforeach
                        </select>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Dipakai untuk mengisi kolom Buyer PPBJ saat user Umum approve PR.
                        </p>
                    </div>

                    {{-- Password with Strength Checker --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <input type="password" name="password" id="addPassword" required minlength="8"
                                oninput="checkPasswordStrength('addPassword', 'addPasswordStrength')"
                                class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-10"
                                placeholder="Min. 8 karakter">
                            <button type="button" onclick="togglePassword('addPassword')"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>

                        {{-- Password Strength Indicator --}}
                        <div class="password-strength-meter">
                            <div id="addPasswordStrength" class="password-strength-bar"></div>
                        </div>
                        <p class="text-xs mt-1" id="addPasswordText">
                            <span class="text-gray-500">Minimal 8 karakter dengan huruf besar, kecil, dan angka</span>
                        </p>

                        {{-- Generate Password Button --}}
                        <button type="button" onclick="generatePassword('addPassword', 'addPasswordStrength')"
                            class="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Generate Password Aman
                        </button>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-2">
                    <button type="button" onclick="closeAddUserModal()"
                        class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 font-medium shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>

    {{-- ================= MODAL EDIT USER ================= --}}
    <div id="editUserModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4"
        onclick="closeEditUserModal()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
            onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    <svg class="inline w-5 h-5 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Data User
                </h3>
                <button onclick="closeEditUserModal()"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form id="editUserForm" onsubmit="handleEditUser(event)">
                @csrf
                @method('PUT')
                <input type="hidden" id="editUserId">

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nama Lengkap <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" id="editName" required minlength="3"
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email <span class="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" id="editEmail" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Role <span class="text-red-500">*</span>
                        </label>
                        <select name="role" id="editRole" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="user">User</option>
                            <option value="viewer">Viewer / Read Only</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department <span class="text-red-500">*</span>
                        </label>
                        <select name="department" id="editDept" required
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="umum">Umum</option>
                            <option value="operasional">Operasional</option>
                        </select>
                    </div>

                    {{-- Buyer Mapping --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Buyer Terkait
                        </label>
                        <select name="buyer_name" id="editBuyerName"
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                            <option value="">-- Tidak dipetakan --</option>
                            @foreach($masterBuyers as $buyer)
                                <option value="{{ $buyer }}">{{ $buyer }}</option>
                            @endforeach
                        </select>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Jika diisi, nilai ini dipakai sebagai Buyer PPBJ. Jika kosong, sistem memakai nama user.
                        </p>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-2">
                    <button type="button" onclick="closeEditUserModal()"
                        class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 font-medium shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>

    {{-- ================= MODAL UBAH PASSWORD ================= --}}
    <div id="passwordModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4"
        onclick="closePasswordModal()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-6" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    <svg class="inline w-5 h-5 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Ubah Password
                </h3>
                <button onclick="closePasswordModal()"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Untuk user: <span id="targetUserName" class="font-bold text-gray-900 dark:text-white"></span>
            </p>

            <form id="passwordForm" onsubmit="handlePasswordChange(event)">
                @csrf
                @method('PUT')
                <input type="hidden" id="passwordUserId">

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password Baru <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="password" name="password" id="changePassword" required minlength="8"
                            oninput="checkPasswordStrength('changePassword', 'changePasswordStrength')"
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-10"
                            placeholder="Min. 8 karakter">
                        <button type="button" onclick="togglePassword('changePassword')"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>

                    <div class="password-strength-meter">
                        <div id="changePasswordStrength" class="password-strength-bar"></div>
                    </div>
                    <p class="text-xs mt-1" id="changePasswordText">
                        <span class="text-gray-500">Minimal 8 karakter dengan huruf besar, kecil, dan angka</span>
                    </p>

                    <button type="button" onclick="generatePassword('changePassword', 'changePasswordStrength')"
                        class="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Generate Password Aman
                    </button>
                </div>

                <div class="flex justify-end gap-2">
                    <button type="button" onclick="closePasswordModal()"
                        class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition flex items-center gap-2 font-medium shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Ganti Password
                    </button>
                </div>
            </form>
        </div>
    </div>

    @push('scripts')
        <script>
            // ================= PASSWORD STRENGTH CHECKER =================
            function checkPasswordStrength(inputId, strengthId) {
                const password = document.getElementById(inputId).value;
                const strengthBar = document.getElementById(strengthId);
                const textId = inputId + 'Text';
                const textElement = document.getElementById(textId);

                let strength = 0;
                let feedback = [];

                // Length check
                if (password.length >= 8) strength++;
                else feedback.push('minimal 8 karakter');

                // Uppercase check
                if (/[A-Z]/.test(password)) strength++;
                else feedback.push('huruf besar');

                // Lowercase check
                if (/[a-z]/.test(password)) strength++;
                else feedback.push('huruf kecil');

                // Number check
                if (/[0-9]/.test(password)) strength++;
                else feedback.push('angka');

                // Special character check (bonus)
                if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

                // Update UI
                strengthBar.className = 'password-strength-bar';

                if (strength === 0) {
                    strengthBar.classList.add('strength-weak');
                    strengthBar.style.width = '0%';
                    if (textElement) {
                        textElement.innerHTML = '<span class="text-gray-500">Mulai ketik password...</span>';
                    }
                } else if (strength <= 2) {
                    strengthBar.classList.add('strength-weak');
                    if (textElement) {
                        textElement.innerHTML = `<span class="text-red-500">⚠️ Lemah - Tambahkan: ${feedback.join(', ')}</span>`;
                    }
                } else if (strength <= 3) {
                    strengthBar.classList.add('strength-medium');
                    if (textElement) {
                        textElement.innerHTML = `<span class="text-orange-500">⚡ Sedang - Tambahkan: ${feedback.join(', ')}</span>`;
                    }
                } else {
                    strengthBar.classList.add('strength-strong');
                    if (textElement) {
                        textElement.innerHTML = '<span class="text-green-500">✅ Kuat - Password aman!</span>';
                    }
                }
            }

            // ================= GENERATE SECURE PASSWORD =================
            function generatePassword(inputId, strengthId) {
                const length = 12;
                const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const lowercase = 'abcdefghijklmnopqrstuvwxyz';
                const numbers = '0123456789';
                const special = '!@#$%^&*';

                let password = '';

                // Ensure at least one of each type
                password += uppercase[Math.floor(Math.random() * uppercase.length)];
                password += lowercase[Math.floor(Math.random() * lowercase.length)];
                password += numbers[Math.floor(Math.random() * numbers.length)];
                password += special[Math.floor(Math.random() * special.length)];

                // Fill the rest randomly
                const allChars = uppercase + lowercase + numbers + special;
                for (let i = password.length; i < length; i++) {
                    password += allChars[Math.floor(Math.random() * allChars.length)];
                }

                // Shuffle the password
                password = password.split('').sort(() => Math.random() - 0.5).join('');

                // Set to input and show
                const input = document.getElementById(inputId);
                input.type = 'text';
                input.value = password;

                // Check strength
                checkPasswordStrength(inputId, strengthId);

                // Copy to clipboard
                navigator.clipboard.writeText(password).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Generated!',
                        html: `<code class="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded text-lg font-mono">${password}</code><br><small class="text-gray-500 mt-2 block">✅ Sudah dicopy ke clipboard</small>`,
                        timer: 3000,
                        showConfirmButton: false
                    });
                });
            }

            // ================= TOGGLE PASSWORD VISIBILITY =================
            function togglePassword(inputId) {
                const input = document.getElementById(inputId);
                input.type = input.type === 'password' ? 'text' : 'password';
            }

            // ================= MODAL FUNCTIONS =================
            function openAddUserModal() {
                document.getElementById('addUserModal').classList.remove('hidden');
                document.getElementById('addUserModal').classList.add('flex');
            }

            function closeAddUserModal() {
                document.getElementById('addUserModal').classList.add('hidden');
                document.getElementById('addUserModal').classList.remove('flex');
                document.getElementById('addUserForm').reset();
                document.getElementById('addPasswordStrength').className = 'password-strength-bar';
            }

            function openEditModal(id, name, email, role, department, buyerName) {
                document.getElementById('editUserId').value = id;
                document.getElementById('editName').value = name;
                document.getElementById('editEmail').value = email;
                document.getElementById('editRole').value = role;
                document.getElementById('editDept').value = department;
                document.getElementById('editBuyerName').value = buyerName || '';

                document.getElementById('editUserModal').classList.remove('hidden');
                document.getElementById('editUserModal').classList.add('flex');
            }

            function closeEditUserModal() {
                document.getElementById('editUserModal').classList.add('hidden');
                document.getElementById('editUserModal').classList.remove('flex');
            }

            function openPasswordModal(id, name) {
                document.getElementById('passwordUserId').value = id;
                document.getElementById('targetUserName').innerText = name;

                document.getElementById('passwordModal').classList.remove('hidden');
                document.getElementById('passwordModal').classList.add('flex');
            }

            function closePasswordModal() {
                document.getElementById('passwordModal').classList.add('hidden');
                document.getElementById('passwordModal').classList.remove('flex');
                document.getElementById('passwordForm').reset();
                document.getElementById('changePasswordStrength').className = 'password-strength-bar';
            }

            // ================= AJAX FORM HANDLERS =================
            async function handleAddUser(event) {
                event.preventDefault();
                const form = event.target;
                const formData = new FormData(form);

                try {
                    const response = await fetch('{{ route("users.store") }}', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                        },
                        body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: data.message,
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        // Show validation errors
                        let errorMessage = data.message || 'Terjadi kesalahan';

                        if (data.errors) {
                            errorMessage = Object.values(data.errors).flat().join('<br>');
                        }

                        Swal.fire({
                            icon: 'error',
                            title: 'Validasi Gagal!',
                            html: errorMessage,
                            confirmButtonColor: '#3B82F6'
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Terjadi kesalahan saat menyimpan data',
                        confirmButtonColor: '#3B82F6'
                    });
                }
            }

            async function handleEditUser(event) {
                event.preventDefault();
                const form = event.target;
                const userId = document.getElementById('editUserId').value;
                const formData = new FormData(form);

                // ✅ CRITICAL FIX: Add _method for Laravel PUT request
                formData.append('_method', 'PUT');

                try {
                    const response = await fetch(`/users/${userId}`, {
                        method: 'POST',  // Laravel method spoofing requires POST
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                        },
                        body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: data.message,
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        let errorMessage = data.message || 'Terjadi kesalahan';

                        if (data.errors) {
                            errorMessage = Object.values(data.errors).flat().join('<br>');
                        }

                        Swal.fire({
                            icon: 'error',
                            title: 'Validasi Gagal!',
                            html: errorMessage,
                            confirmButtonColor: '#3B82F6'
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Terjadi kesalahan saat update data',
                        confirmButtonColor: '#3B82F6'
                    });
                }
            }

            async function handlePasswordChange(event) {
                event.preventDefault();
                const form = event.target;
                const userId = document.getElementById('passwordUserId').value;
                const formData = new FormData(form);

                try {
                    const response = await fetch(`/users/${userId}/password`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                        },
                        body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: data.message,
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            closePasswordModal();
                        });
                    } else {
                        let errorMessage = data.message || 'Terjadi kesalahan';

                        if (data.errors) {
                            errorMessage = Object.values(data.errors).flat().join('<br>');
                        }

                        Swal.fire({
                            icon: 'error',
                            title: 'Validasi Gagal!',
                            html: errorMessage,
                            confirmButtonColor: '#3B82F6'
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Terjadi kesalahan saat mengubah password',
                        confirmButtonColor: '#3B82F6'
                    });
                }
            }

            async function deleteUser(id, name) {
                const result = await Swal.fire({
                    title: 'Konfirmasi Hapus',
                    html: `Apakah Anda yakin ingin menghapus user <strong>${name}</strong>?<br><small class="text-gray-500">Aksi ini tidak dapat dibatalkan</small>`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#EF4444',
                    cancelButtonColor: '#6B7280',
                    confirmButtonText: 'Ya, Hapus!',
                    cancelButtonText: 'Batal'
                });

                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`/users/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                'Accept': 'application/json',
                            }
                        });

                        const data = await response.json();

                        if (data.success) {
                            const row = document.getElementById(`user-row-${id}`);
                            row.style.opacity = '0';
                            row.style.transform = 'translateX(-100%)';
                            row.style.transition = 'all 0.3s ease';

                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Terhapus!',
                                    text: data.message,
                                    timer: 2000,
                                    showConfirmButton: false
                                }).then(() => {
                                    window.location.reload();
                                });
                            }, 300);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Gagal!',
                                html: data.message,
                                confirmButtonColor: '#3B82F6'
                            });
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Terjadi kesalahan saat menghapus user',
                            confirmButtonColor: '#3B82F6'
                        });
                    }
                }
            }

            // ================= CLOSE MODAL ON ESC =================
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    closeAddUserModal();
                    closeEditUserModal();
                    closePasswordModal();
                }
            });
        </script>
    @endpush
@endsection
