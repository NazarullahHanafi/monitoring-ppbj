@extends('layouts.app')

@section('title', 'Owner Center')

@section('content')
    <div class="max-w-7xl mx-auto space-y-6">
        <div class="relative overflow-hidden rounded-[2rem] border border-violet-200/70 dark:border-violet-500/20 bg-gradient-to-br from-slate-950 via-violet-950 to-blue-950 p-8 text-white shadow-2xl">
            <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl"></div>
            <div class="absolute -bottom-24 left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

            <div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <span class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-100">
                        👑 Owner Only
                    </span>
                    <h1 class="mt-5 text-4xl font-black tracking-tight md:text-5xl">Owner Center SIMONPR</h1>
                    <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
                        Area khusus pembuat aplikasi. Menu ini hanya muncul dan hanya bisa diakses oleh email owner yang terdaftar,
                        bukan oleh semua akun superadmin.
                    </p>
                </div>

                <div class="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Akses aktif</p>
                    <p class="mt-2 text-xl font-black">{{ $stats['owner_email'] }}</p>
                    <p class="mt-1 text-sm text-emerald-200">Terverifikasi sebagai owner aplikasi</p>
                </div>
            </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Total User</p>
                <p class="mt-3 text-3xl font-black text-gray-900 dark:text-white">{{ number_format($stats['users']) }}</p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Environment</p>
                <p class="mt-3 text-3xl font-black text-gray-900 dark:text-white">{{ strtoupper($stats['environment']) }}</p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Debug Mode</p>
                <p class="mt-3 text-3xl font-black {{ $stats['debug'] === 'OFF' ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300' }}">
                    {{ $stats['debug'] }}
                </p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Database</p>
                <p class="mt-3 truncate text-xl font-black text-gray-900 dark:text-white">{{ $stats['database'] }}</p>
            </div>
        </div>

        <div class="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 class="text-xl font-black text-gray-900 dark:text-white">Ruang fitur khusus berikutnya</h2>
            <p class="mt-3 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                Fondasi akses owner sudah siap. Nanti fitur seperti catatan developer, tombol maintenance aman,
                audit internal, atau pengaturan rahasia lain bisa ditaruh di halaman ini tanpa terlihat oleh superadmin lain.
            </p>
        </div>
    </div>
@endsection
