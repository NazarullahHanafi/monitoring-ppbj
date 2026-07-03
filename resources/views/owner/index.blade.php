@extends('layouts.app')

@section('title', 'Owner Center')

@section('content')
    @php
        $badgeClass = [
            'safe' => 'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/30',
            'warning' => 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/30',
            'danger' => 'bg-red-100 text-red-800 ring-red-200 dark:bg-red-400/10 dark:text-red-200 dark:ring-red-400/30',
        ];

        $quickLinks = [
            ['label' => 'Management Users', 'route' => route('users.index'), 'icon' => '👥', 'desc' => 'Kelola akun dan role'],
            ['label' => 'Pesan Contact', 'route' => route('contact-messages.index'), 'icon' => '💬', 'desc' => 'Baca pesan landing'],
            ['label' => 'Laporan PPBJ', 'route' => route('ppbj.report'), 'icon' => '📈', 'desc' => 'Analisis audit dan nilai'],
            ['label' => 'Management PPBJ', 'route' => route('ppbj.index'), 'icon' => '📁', 'desc' => 'Pantau data utama'],
            ['label' => 'Approval PR', 'route' => route('approval.pr.index'), 'icon' => '✅', 'desc' => 'Cek approval masuk'],
            ['label' => 'Akun Saya', 'route' => route('account.edit'), 'icon' => '🔐', 'desc' => 'Ganti password owner'],
        ];
    @endphp

    <div class="mx-auto max-w-7xl space-y-6 text-slate-900 dark:text-white">
        <section class="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-violet-50 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:shadow-black/30">
            <div class="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
                <div>
                    <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-violet-700 ring-1 ring-violet-200 dark:bg-slate-900 dark:text-cyan-200 dark:ring-slate-700">
                        👑 Owner Only
                    </span>
                    <h1 class="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
                        Owner Center SIMONPR
                    </h1>
                    <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                        Ruang kendali khusus pembuat aplikasi. Area ini dikunci berdasarkan email owner, jadi tidak otomatis
                        terbuka untuk semua superadmin.
                    </p>

                    <div class="mt-6 flex flex-wrap gap-3">
                        <span class="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700">
                            {{ $stats['owner_email'] }}
                        </span>
                        <span class="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/30">
                            Akses owner aktif
                        </span>
                    </div>
                </div>

                <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Profil akses</p>
                    <dl class="mt-4 space-y-3 text-sm">
                        @foreach([
                            'Role' => $stats['role'],
                            'Department' => $stats['department'],
                            'Environment' => $stats['environment'],
                        ] as $label => $value)
                            <div class="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950">
                                <dt class="font-semibold text-slate-500 dark:text-slate-400">{{ $label }}</dt>
                                <dd class="font-black capitalize text-slate-950 dark:text-white">{{ $value }}</dd>
                            </div>
                        @endforeach
                    </dl>
                </div>
            </div>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @foreach([
                ['label' => 'Total User', 'value' => number_format($stats['users']), 'desc' => 'Akun aktif dalam sistem', 'color' => 'text-slate-950 dark:text-white'],
                ['label' => 'Data PPBJ', 'value' => number_format($stats['ppbj']), 'desc' => 'Data pengadaan/support', 'color' => 'text-slate-950 dark:text-white'],
                ['label' => 'Approval Pending', 'value' => number_format($stats['pending_approvals']), 'desc' => 'PR menunggu tindakan', 'color' => 'text-amber-600 dark:text-amber-300'],
                ['label' => 'Debug Mode', 'value' => $stats['debug'], 'desc' => 'Harus OFF di production', 'color' => $stats['debug'] === 'OFF' ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'],
            ] as $card)
                <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ $card['label'] }}</p>
                    <p class="mt-3 text-4xl font-black {{ $card['color'] }}">{{ $card['value'] }}</p>
                    <p class="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">{{ $card['desc'] }}</p>
                </div>
            @endforeach
        </section>

        <section class="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Health Check Sistem</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Kesehatan aplikasi</h2>

                <div class="mt-6 grid gap-3 md:grid-cols-2">
                    @foreach($healthChecks as $check)
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <h3 class="font-black text-slate-900 dark:text-white">{{ $check['label'] }}</h3>
                                <span class="rounded-full px-3 py-1 text-xs font-black ring-1 {{ $badgeClass[$check['status']] ?? $badgeClass['warning'] }}">
                                    {{ $check['value'] }}
                                </span>
                            </div>
                            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $check['description'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Backup Otomatis</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Database backup email</h2>

                <div class="mt-6 space-y-3">
                    <div class="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:ring-emerald-400/30">
                        <p class="text-sm font-black text-emerald-800 dark:text-emerald-200">Jadwal aktif</p>
                        <p class="mt-1 text-2xl font-black text-emerald-900 dark:text-emerald-100">{{ $stats['backup_schedule'] }}</p>
                    </div>
                    <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
                        <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Email tujuan</p>
                        <p class="mt-2 break-all text-lg font-black text-slate-950 dark:text-white">{{ $stats['backup_email'] }}</p>
                    </div>
                    <div class="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-100 dark:ring-amber-400/30">
                        Cron cPanel tetap perlu aktif: <code class="font-black">php artisan schedule:run</code> setiap menit.
                    </div>
                </div>
            </div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[1fr_.85fr]">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">Audit Log Owner</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Aktivitas terbaru</h2>

                <div class="mt-6 space-y-3">
                    @forelse($auditLogs as $log)
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                            <div class="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p class="font-black text-slate-900 dark:text-white">{{ $log->description ?: $log->action }}</p>
                                    <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        {{ $log->user?->name ?? 'System' }} • {{ $log->created_at?->format('d M Y H:i') }}
                                    </p>
                                </div>
                                <span class="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700">
                                    {{ $log->action }}
                                </span>
                            </div>
                        </div>
                    @empty
                        <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                            Belum ada activity log yang tercatat.
                        </div>
                    @endforelse
                </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">Shortcut</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Akses cepat owner</h2>

                <div class="mt-6 grid gap-3">
                    @foreach($quickLinks as $link)
                        <a href="{{ $link['route'] }}"
                            class="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10">
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

        <section class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Security</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Security checklist</h2>

                <div class="mt-6 space-y-3">
                    @foreach($securityChecks as $check)
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <h3 class="font-black text-slate-900 dark:text-white">{{ $check['label'] }}</h3>
                                <span class="rounded-full px-3 py-1 text-xs font-black ring-1 {{ $badgeClass[$check['status']] ?? $badgeClass['warning'] }}">
                                    {{ $check['value'] }}
                                </span>
                            </div>
                            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $check['description'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-700 dark:text-fuchsia-300">Rekomendasi Lanjutan</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Fitur berikutnya untuk Nazar</h2>
                <div class="mt-6 grid gap-3">
                    @foreach($recommendations as $title => $description)
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                            <h3 class="font-black text-slate-900 dark:text-white">{{ $title }}</h3>
                            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $description }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    </div>
@endsection
