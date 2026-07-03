@extends('layouts.app')

@section('title', 'Owner Center')

@section('content')
    @php
        $safeBadge = 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-400/30';
        $warningBadge = 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-400/30';
        $quickLinks = [
            ['label' => 'Management Users', 'route' => route('users.index'), 'icon' => '👥', 'desc' => 'Kelola akun dan role'],
            ['label' => 'Pesan Contact', 'route' => route('contact-messages.index'), 'icon' => '💬', 'desc' => 'Baca pesan landing'],
            ['label' => 'Laporan PPBJ', 'route' => route('ppbj.report'), 'icon' => '📈', 'desc' => 'Analisis audit dan nilai'],
            ['label' => 'Management PPBJ', 'route' => route('ppbj.index'), 'icon' => '📁', 'desc' => 'Pantau data utama'],
            ['label' => 'Approval PR', 'route' => route('approval.pr.index'), 'icon' => '✅', 'desc' => 'Cek approval masuk'],
            ['label' => 'Akun Saya', 'route' => route('account.edit'), 'icon' => '🔐', 'desc' => 'Ganti password owner'],
        ];
    @endphp

    <div class="mx-auto max-w-7xl space-y-6 text-slate-900 dark:text-slate-100">
        <section
            class="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-950 dark:shadow-black/30">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(236,72,153,.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,.06),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.38),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(236,72,153,.28),transparent_28%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,.92))]"></div>
            <div class="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
                <div>
                    <span
                        class="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-violet-700 ring-1 ring-violet-200 dark:bg-white/10 dark:text-cyan-100 dark:ring-white/15">
                        👑 Owner Only
                    </span>
                    <h1 class="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
                        Owner Center SIMONPR
                    </h1>
                    <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                        Ruang kendali khusus pembuat aplikasi. Menu ini tidak mengikuti role superadmin biasa, tapi dikunci
                        berdasarkan email owner yang terdaftar.
                    </p>

                    <div class="mt-6 flex flex-wrap gap-3">
                        <span
                            class="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-white/10 dark:text-slate-100 dark:ring-white/10">
                            {{ $stats['owner_email'] }}
                        </span>
                        <span
                            class="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/20">
                            Akses owner aktif
                        </span>
                    </div>
                </div>

                <div
                    class="rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10">
                    <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Profil akses</p>
                    <dl class="mt-4 space-y-3 text-sm">
                        <div class="flex items-center justify-between gap-3">
                            <dt class="text-slate-500 dark:text-slate-400">Role</dt>
                            <dd class="font-black capitalize text-slate-950 dark:text-white">{{ $stats['role'] }}</dd>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <dt class="text-slate-500 dark:text-slate-400">Department</dt>
                            <dd class="font-black capitalize text-slate-950 dark:text-white">{{ $stats['department'] }}</dd>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <dt class="text-slate-500 dark:text-slate-400">Environment</dt>
                            <dd class="font-black uppercase text-slate-950 dark:text-white">{{ $stats['environment'] }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Total User</p>
                <p class="mt-3 text-4xl font-black text-slate-950 dark:text-white">{{ number_format($stats['users']) }}</p>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Akun aktif dalam sistem</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Data PPBJ</p>
                <p class="mt-3 text-4xl font-black text-slate-950 dark:text-white">{{ number_format($stats['ppbj']) }}</p>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Data pengadaan/support</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Approval Pending</p>
                <p class="mt-3 text-4xl font-black text-amber-600 dark:text-amber-300">{{ number_format($stats['pending_approvals']) }}</p>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">PR menunggu tindakan</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Debug Mode</p>
                <p class="mt-3 text-4xl font-black {{ $stats['debug'] === 'OFF' ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300' }}">
                    {{ $stats['debug'] }}
                </p>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Harus OFF di production</p>
            </div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[1fr_.85fr]">
            <div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="text-xs font-black uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">Monitoring</p>
                        <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Ringkasan modul utama</h2>
                    </div>
                    <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">Database: {{ $stats['database'] }}</span>
                </div>

                <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    @foreach([
                        ['label' => 'TORPR', 'value' => $stats['torpr'], 'color' => 'blue'],
                        ['label' => 'SPPH', 'value' => $stats['spph'], 'color' => 'emerald'],
                        ['label' => 'SP', 'value' => $stats['sp'], 'color' => 'violet'],
                        ['label' => 'Pesan Contact', 'value' => $stats['unread_contact_messages'], 'color' => 'rose'],
                    ] as $item)
                        <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-slate-700">
                            <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ $item['label'] }}</p>
                            <p class="mt-3 text-3xl font-black text-slate-950 dark:text-white">{{ number_format($item['value']) }}</p>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">User Map</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Komposisi akses</h2>

                <div class="mt-6 space-y-3">
                    @foreach($userBreakdown as $label => $value)
                        <div class="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-slate-700">
                            <span class="text-sm font-bold capitalize text-slate-700 dark:text-slate-200">{{ str_replace('_', ' ', $label) }}</span>
                            <span class="text-lg font-black text-slate-950 dark:text-white">{{ number_format($value) }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">Security</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Security checklist</h2>

                <div class="mt-6 space-y-3">
                    @foreach($securityChecks as $check)
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <h3 class="font-black text-slate-900 dark:text-white">{{ $check['label'] }}</h3>
                                <span class="rounded-full px-3 py-1 text-xs font-black ring-1 {{ $check['status'] === 'safe' ? $safeBadge : $warningBadge }}">
                                    {{ $check['value'] }}
                                </span>
                            </div>
                            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $check['description'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">Shortcut</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Akses cepat owner</h2>

                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                    @foreach($quickLinks as $link)
                        <a href="{{ $link['route'] }}"
                            class="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10">
                            <div class="flex items-center gap-3">
                                <span class="grid h-11 w-11 place-items-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">{{ $link['icon'] }}</span>
                                <div>
                                    <p class="font-black text-slate-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-200">{{ $link['label'] }}</p>
                                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ $link['desc'] }}</p>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </section>

        <section class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p class="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-600 dark:text-fuchsia-300">Rekomendasi</p>
            <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Fitur owner yang paling cocok untuk Nazar</h2>
            <div class="mt-6 grid gap-3 md:grid-cols-2">
                @foreach($recommendations as $title => $description)
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                        <h3 class="font-black text-slate-900 dark:text-white">{{ $title }}</h3>
                        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $description }}</p>
                    </div>
                @endforeach
            </div>
        </section>
    </div>
@endsection
