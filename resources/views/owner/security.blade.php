@extends('layouts.app')

@section('title', 'Security Center Owner')

@section('content')
    <div class="mx-auto max-w-7xl space-y-6 text-slate-900 dark:text-slate-100">
        @if(session('success'))
            <div class="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-bold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
                {{ session('success') }}
            </div>
        @endif
        @if(session('error'))
            <div class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
                {{ session('error') }}
            </div>
        @endif

        <section class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-xl dark:border-slate-700">
            <div class="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div class="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>
                <div class="relative">
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-300 ring-1 ring-cyan-400/30">Owner Security</span>
                        <span class="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300 ring-1 ring-emerald-400/30">Nazar • Superadmin Umum</span>
                    </div>
                    <h1 class="mt-5 text-3xl font-black tracking-tight md:text-5xl">Security Command Center</h1>
                    <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                        Sensor honeypot senyap, kendali sesi perangkat, dan posture keamanan dalam satu pusat kendali privat.
                    </p>
                    <a href="{{ route('owner.index') }}" class="mt-6 inline-flex rounded-xl bg-white/10 px-4 py-2 text-sm font-black ring-1 ring-white/20 transition hover:bg-white/20">← Kembali ke Owner Center</a>
                </div>

                <div class="relative flex items-center gap-5 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                    <div class="grid h-32 w-32 place-items-center rounded-full p-3" style="background: conic-gradient(#22c55e {{ $security['score'] }}%, rgba(255,255,255,.12) 0)">
                        <div class="grid h-full w-full place-items-center rounded-full bg-slate-950 text-center">
                            <div>
                                <div class="text-4xl font-black">{{ $security['score'] }}</div>
                                <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">dari 100</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font-black uppercase tracking-widest text-slate-400">Security Score</p>
                        <p class="mt-1 text-2xl font-black">{{ $security['label'] }}</p>
                        <p class="mt-2 max-w-40 text-xs leading-5 text-slate-400">Dihitung dari kontrol keamanan aktif, bukan angka dekoratif.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @foreach([
                ['label' => 'Probe hari ini', 'value' => number_format($honeypotStats['today']), 'desc' => 'request mencurigakan', 'color' => 'text-red-600 dark:text-red-300'],
                ['label' => 'Sumber 30 hari', 'value' => number_format($honeypotStats['sources_30d']), 'desc' => 'IP unik terdeteksi', 'color' => 'text-amber-600 dark:text-amber-300'],
                ['label' => 'Sesi aktif', 'value' => number_format($sessionStats['active']), 'desc' => $sessionStats['users'].' user login', 'color' => 'text-blue-600 dark:text-blue-300'],
                ['label' => 'IP perangkat', 'value' => number_format($sessionStats['ips']), 'desc' => 'IP sesi berbeda', 'color' => 'text-violet-600 dark:text-violet-300'],
            ] as $card)
                <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <p class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ $card['label'] }}</p>
                    <p class="mt-3 text-4xl font-black {{ $card['color'] }}">{{ $card['value'] }}</p>
                    <p class="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ $card['desc'] }}</p>
                </div>
            @endforeach
        </section>

        <section class="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Security Score</p>
                <h2 class="mt-2 text-2xl font-black">Kontrol keamanan aktif</h2>
                <div class="mt-5 space-y-3">
                    @foreach($security['checks'] as $check)
                        <div class="flex gap-3 rounded-2xl border p-4 {{ $check['passed'] ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/5' : 'border-amber-200 bg-amber-50 dark:border-amber-400/20 dark:bg-amber-400/5' }}">
                            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black {{ $check['passed'] ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white' }}">{{ $check['passed'] ? '✓' : '!' }}</span>
                            <div class="min-w-0">
                                <div class="flex flex-wrap items-center gap-2">
                                    <h3 class="font-black">{{ $check['label'] }}</h3>
                                    <span class="rounded-full bg-white px-2 py-1 text-[10px] font-black text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-700">+{{ $check['weight'] }} poin</span>
                                </div>
                                <p class="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{{ $check['detail'] }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-black uppercase tracking-[0.2em] text-red-700 dark:text-red-300">Silent Honeypot</p>
                        <h2 class="mt-2 text-2xl font-black">Radar pemindaian otomatis</h2>
                        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Membaca log secara asinkron; scanner tetap menerima 404 tanpa mengetahui bahwa aktivitasnya direkam.</p>
                    </div>
                    <div class="rounded-2xl bg-slate-100 px-4 py-3 text-right text-xs font-bold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                        <div>Sensor terakhir</div>
                        <div class="mt-1 text-slate-950 dark:text-white">{{ $honeypotStats['sensor_updated_at']?->diffForHumans() ?? 'Menunggu scheduler' }}</div>
                    </div>
                </div>

                <div class="mt-5 max-h-[620px] space-y-3 overflow-y-auto pr-1">
                    @forelse($honeypotEvents as $event)
                        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                            <div class="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p class="font-mono text-sm font-black text-slate-950 dark:text-white">{{ $event->ip_address }}</p>
                                    <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ $event->first_seen_at?->format('d M Y H:i:s') }} – {{ $event->last_seen_at?->format('H:i:s') }}</p>
                                </div>
                                <div class="flex gap-2">
                                    <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700 dark:bg-red-400/10 dark:text-red-200">{{ number_format($event->hit_count) }} probe</span>
                                    <span class="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700 dark:bg-violet-400/10 dark:text-violet-200">{{ number_format($event->unique_paths_count) }} URL</span>
                                </div>
                            </div>
                            <details class="mt-3">
                                <summary class="cursor-pointer text-xs font-black text-blue-700 dark:text-blue-300">Lihat contoh target</summary>
                                <div class="mt-3 space-y-1">
                                    @foreach(array_slice($event->sample_paths ?? [], 0, 8) as $path)
                                        <p class="break-all rounded-lg bg-white px-3 py-2 font-mono text-[11px] text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">{{ $path }}</p>
                                    @endforeach
                                </div>
                            </details>
                        </article>
                    @empty
                        <div class="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                            <p class="font-black">Belum ada probe yang direkam</p>
                            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Scheduler akan membaca access log setiap menit.</p>
                        </div>
                    @endforelse
                </div>
            </div>
        </section>

        <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p class="text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">Pusat Sesi & Perangkat</p>
                    <h2 class="mt-2 text-2xl font-black">Perangkat yang sedang login</h2>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Sesi aktif berdasarkan masa session {{ config('session.lifetime') }} menit. Pengakhiran sesi tercatat di audit log.</p>
                </div>
                @if($sessions->where('is_current', false)->isNotEmpty())
                    <form method="POST" action="{{ route('owner.security.sessions.destroy-others') }}" onsubmit="return confirm('Akhiri seluruh sesi lain? Semua user selain sesi owner saat ini harus login kembali.')">
                        @csrf
                        @method('DELETE')
                        <button class="rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-700">Akhiri Semua Sesi Lain</button>
                    </form>
                @endif
            </div>

            <div class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                <table class="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
                    <thead class="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                        <tr>
                            <th class="px-4 py-3">User</th>
                            <th class="px-4 py-3">Perangkat</th>
                            <th class="px-4 py-3">IP</th>
                            <th class="px-4 py-3">Aktivitas</th>
                            <th class="px-4 py-3 text-right">Kontrol</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                        @forelse($sessions as $session)
                            <tr>
                                <td class="px-4 py-4">
                                    <p class="font-black">{{ $session->name ?? 'User terhapus' }}</p>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ $session->email ?? '-' }} • {{ $session->role }}/{{ $session->department }}</p>
                                </td>
                                <td class="px-4 py-4">
                                    <p class="font-bold">{{ $session->browser }} • {{ $session->device }}</p>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ $session->platform }}</p>
                                </td>
                                <td class="px-4 py-4 font-mono text-xs font-bold">{{ $session->ip_address ?: '-' }}</td>
                                <td class="px-4 py-4">
                                    <p class="font-bold">{{ $session->last_active_at->diffForHumans() }}</p>
                                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ $session->last_active_at->format('d M Y H:i:s') }}</p>
                                </td>
                                <td class="px-4 py-4 text-right">
                                    @if($session->is_current)
                                        <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">Sesi Ini</span>
                                    @else
                                        <form method="POST" action="{{ route('owner.security.sessions.destroy', $session->session_token) }}" onsubmit="return confirm('Akhiri sesi perangkat ini?')">
                                            @csrf
                                            @method('DELETE')
                                            <button class="rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-700 ring-1 ring-red-200 transition hover:bg-red-100 dark:bg-red-400/10 dark:text-red-200 dark:ring-red-400/30">Akhiri Sesi</button>
                                        </form>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="5" class="px-4 py-10 text-center font-semibold text-slate-500 dark:text-slate-400">Belum ada sesi login aktif.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </section>
    </div>
@endsection
