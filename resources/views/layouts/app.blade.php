<!doctype html>
<html lang="id" class="bg-gray-50 dark:bg-gray-900">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Monitoring PPBJ')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    {{-- UI vendor assets are served locally so rendering is not blocked by CDN/DNS latency. --}}
    <script src="{{ asset('assets/vendor/ui/jquery-3.7.1.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/vendor/ui/sweetalert2.min.css') }}">
    <script src="{{ asset('assets/vendor/ui/sweetalert2.all.min.js') }}"></script>
    <script>
        (function () {
            function installSweetAlertDurationGuard() {
                if (!window.Swal || window.Swal.__simonprDurationGuard) return;

                var originalFire = window.Swal.fire.bind(window.Swal);

                window.Swal.fire = function () {
                    var args = Array.prototype.slice.call(arguments);

                    if (args.length === 1 && args[0] && typeof args[0] === 'object') {
                        var options = Object.assign({}, args[0]);
                        var icon = String(options.icon || '').toLowerCase();
                        var currentTimer = Number(options.timer || 0);

                        if (options.toast === true) {
                            var toastMinimum = (icon === 'error' || icon === 'warning') ? 6500 : 4500;
                            if (!currentTimer || currentTimer < toastMinimum) {
                                options.timer = toastMinimum;
                            }
                            if (options.timerProgressBar !== false) {
                                options.timerProgressBar = true;
                            }
                        } else if (icon && options.showConfirmButton === false && currentTimer > 0) {
                            var modalMinimum = (icon === 'error' || icon === 'warning') ? 6500 : 4500;
                            if (currentTimer < modalMinimum) {
                                options.timer = modalMinimum;
                            }
                            if (options.timerProgressBar !== false) {
                                options.timerProgressBar = true;
                            }
                        }

                        args[0] = options;
                    }

                    return originalFire.apply(window.Swal, args);
                };

                window.Swal.__simonprDurationGuard = true;
            }

            installSweetAlertDurationGuard();
        })();
    </script>
    <link rel="icon" href="{{ asset('images/logo4.png') }}" type="image/x-icon">
    <link href="{{ asset('assets/vendor/ui/select2.min.css') }}" rel="stylesheet">
    <script>
        (function () {
            var root = document.documentElement;
            var savedTheme = localStorage.getItem('theme');
            var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            var useDark = savedTheme === 'dark' || (!savedTheme && systemDark);

            function applyTheme(mode) {
                var isDark = mode === 'dark';
                root.classList.toggle('dark', isDark);
                root.style.colorScheme = isDark ? 'dark' : 'light';
            }

            window.setThemeMode = function (mode) {
                var nextMode = mode === 'dark' ? 'dark' : 'light';

                localStorage.setItem('theme', nextMode);
                applyTheme(nextMode);

                document.dispatchEvent(new CustomEvent('app:theme-changed', {
                    detail: { mode: nextMode }
                }));

                if (window.jQuery) {
                    window.jQuery('.select2-hidden-accessible').trigger('change.select2');
                }
            };

            window.toggleThemeMode = function () {
                window.setThemeMode(root.classList.contains('dark') ? 'light' : 'dark');
            };

            window.getThemeMode = function () {
                return root.classList.contains('dark') ? 'dark' : 'light';
            };

            applyTheme(useDark ? 'dark' : 'light');
        })();
    </script>
    <script src="{{ asset('assets/vendor/ui/select2.min.js') }}"></script>
    @stack('styles')

</head>

<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    @if(auth()->user()?->isReadOnly())
        <div class="readonly-viewer-banner" role="status">
            <span>👁️</span>
            <span>Mode Viewer: akun ini hanya dapat melihat data, tanpa akses ubah/simpan/hapus.</span>
        </div>
    @endif

    <div class="min-h-screen flex">
        {{-- SIDEBAR DESKTOP --}}
        <aside id="sidebarDesktop"
            class="hidden md:flex md:flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 w-64 shadow-xl shadow-gray-200/20 dark:shadow-black/20">
            <div
                class="px-5 py-4 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50">
                <div
                    class="font-bold text-lg whitespace-nowrap text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span class="text-2xl">📊</span><span class="sidebar-text dark:text-white mt-1">Monitoring
                        PPBJ</span>
                </div>
                <button type="button" id="btnToggleSidebar" title="Toggle Sidebar"
                    class="toggle-btn p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"><svg
                        class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg></button>
            </div>
            <nav class="px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar flex-1">
                @if(auth()->user()?->department === 'umum')
                    <a href="{{ route('dashboard.indexumum') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('dashboard*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📊</span><span class="nav-text font-medium">Dashboard</span></a>
                    <a href="{{ route('ppbj.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ppbj*') && !request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📁</span><span class="nav-text font-medium">Management PPBJ</span></a>
                    <a href="{{ route('ppbj.report') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📈</span><span class="nav-text font-medium">Laporan</span></a>
                    <a href="{{ route('spph.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('spph*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📋</span><span class="nav-text font-medium">Penomoran SPPH</span></a>
                    <a href="{{ route('sp.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ (request()->is('sp') || request()->is('sp/*')) ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📝</span><span class="nav-text font-medium">Penomoran SP</span></a>
                    <div class="pt-3 mt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                        <div
                            class="flex items-center gap-3 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                            <span class="icon-box text-lg">MD</span>
                            <span class="nav-text">Master Data</span>
                            <span
                                class="nav-text ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">Referensi</span>
                        </div>
                        <a href="{{ route('sp-master-options.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-2.5 rounded-xl {{ request()->is('sp-master-options*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                            <span class="icon-box text-xl">⚙️</span>
                            <span class="nav-text font-medium">Master Kontrak SP</span>
                        </a>
                        <a href="{{ route('vendor.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-2.5 rounded-xl {{ request()->is('vendors*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                            <span class="icon-box text-xl">🏢</span>
                            <span class="nav-text font-medium">Vendor</span>
                        </a>
                        <a href="{{ route('satuan.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-2.5 rounded-xl {{ request()->is('satuan*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                            <span class="icon-box text-xl">📦</span>
                            <span class="nav-text font-medium">Satuan</span>
                        </a>
                    </div>
                    <a href="{{ route('approval.pr.index') }}"
                        class="nav-item group flex items-center justify-between gap-3 px-4 py-3 rounded-xl {{ request()->is('approval/pr-receipts*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                        <div class="flex items-center gap-3"><span class="icon-box text-xl">✅</span><span
                                class="nav-text font-medium">Approval
                                PR</span>@if(isset($pendingApprovalCount) && $pendingApprovalCount > 0)<span
                                class="ml-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-800 animate-bounce">{{ $pendingApprovalCount }}</span>@endif
                        </div>
                        <span id="badgePendingPr"
                            class="badge-pulse hidden text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full shadow-lg shadow-red-500/30">0</span>
                    </a>
                    @if(auth()->user()->role === 'superadmin')
                        <a href="{{ route('users.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('users*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👥</span><span class="nav-text font-medium">Management Users</span></a>
                    @endif
                    @if(auth()->user()?->isOwner())
                        <a href="{{ route('owner.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('owner*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-300' }}">
                            <span class="icon-box text-xl">👑</span>
                            <span class="nav-text font-medium">Owner Center</span>
                        </a>
                    @endif
                    @if(auth()->user()->role === 'superadmin')
                        <a href="{{ route('contact-messages.index') }}"
                            class="nav-item group flex items-center justify-between gap-3 px-4 py-3 rounded-xl {{ request()->is('contact-messages*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                            <div class="flex items-center gap-3">
                                <span class="icon-box text-xl">💬</span>
                                <span class="nav-text font-medium">Pesan Contact</span>
                            </div>
                            @if(($unreadContactMessageCount ?? 0) > 0)
                                <span class="nav-text text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full">{{ $unreadContactMessageCount }}</span>
                            @endif
                        </a>
                    @endif
                    <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                            href="{{ route('account.edit') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👤</span><span class="nav-text font-medium">Management
                                Akun</span></a></div>
                @endif
                @if(auth()->user()?->department === 'operasional')
                    <a href="{{ route('ops.dashboard') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ops/dashboard') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📊</span><span class="nav-text font-medium">Dashboard</span></a>
                    <a href="{{ route('torpr.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('torpr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">🧾</span><span class="nav-text font-medium">TORPR</span></a>
                    <a href="{{ route('tracking.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('tracking-pr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">🛰️</span><span class="nav-text font-medium">Tracking PR</span></a>
                    <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                            href="{{ route('account.edit') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👤</span><span class="nav-text font-medium">Management
                                Akun</span></a></div>
                @endif
            </nav>
        </aside>

        {{-- SIDEBAR MOBILE --}}
        <div id="sidebarMobileWrapper" class="fixed inset-0 z-50 hidden md:hidden">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="overlayCloseMobile"></div>
            <aside id="sidebarMobile"
                class="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-2xl transform -translate-x-full">
                <div
                    class="px-5 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div class="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><span
                            class="text-2xl">📊</span> Monitoring PPBJ</div>
                    <button id="btnCloseMobile"
                        class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all hover:rotate-90"><svg
                            class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg></button>
                </div>
                <nav class="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
                    @if(auth()->user()?->department === 'umum')
                        <a href="{{ route('dashboard.indexumum') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('dashboard*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📊</span><span
                                    class="font-medium">Dashboard</span></span></a>
                        <a href="{{ route('ppbj.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ppbj*') && !request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📁</span><span
                                    class="font-medium">Management PPBJ</span></span></a>
                        <a href="{{ route('ppbj.report') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📈</span><span
                                    class="font-medium">Laporan</span></span></a>
                        <a href="{{ route('spph.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('spph*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📋</span><span
                                    class="font-medium">Penomoran SPPH</span></span></a>
                        <a href="{{ route('sp.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('sp') || request()->is('sp/*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📝</span><span
                                    class="font-medium">Penomoran SP</span></span></a>
                        <div class="pt-3 mt-2 border-t border-gray-200/70 dark:border-gray-700/70">
                            <div
                                class="flex items-center justify-between px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                                <span>Master Data</span>
                                <span
                                    class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">Referensi</span>
                            </div>
                            <a href="{{ route('sp-master-options.index') }}"
                                class="nav-item block px-4 py-2.5 rounded-xl {{ request()->is('sp-master-options*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}">
                                <span class="flex items-center gap-3"><span class="text-xs font-black">SP</span><span
                                        class="font-medium">Master Kontrak SP</span></span>
                            </a>
                            <a href="{{ route('vendor.index') }}"
                                class="nav-item block px-4 py-2.5 rounded-xl {{ request()->is('vendors*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' }}">
                                <span class="flex items-center gap-3"><span class="text-xs font-black">VD</span><span
                                        class="font-medium">Vendor</span></span>
                            </a>
                            <a href="{{ route('satuan.index') }}"
                                class="nav-item block px-4 py-2.5 rounded-xl {{ request()->is('satuan*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' }}">
                                <span class="flex items-center gap-3"><span class="text-xs font-black">ST</span><span
                                        class="font-medium">Satuan</span></span>
                            </a>
                        </div>
                        <a href="{{ route('approval.pr.index') }}"
                            class="nav-item flex items-center justify-between px-4 py-3 rounded-xl {{ request()->is('approval/pr-receipts*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">✅</span><span
                                    class="font-medium">Approval PR</span></span><span id="badgePendingPrMobile"
                                class="badge-pulse hidden text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full">0</span></a>
                        @if(auth()->user()->role === 'superadmin')
                            <a href="{{ route('users.index') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('users*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👥</span><span
                                        class="font-medium">Management Users</span></span></a>
                        @endif
                        @if(auth()->user()?->isOwner())
                            <a href="{{ route('owner.index') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('owner*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20' }}">
                                <span class="flex items-center gap-3"><span class="text-xl">👑</span><span
                                        class="font-medium">Owner Center</span></span>
                            </a>
                        @endif
                        @if(auth()->user()->role === 'superadmin')
                            <a href="{{ route('contact-messages.index') }}"
                                class="nav-item flex items-center justify-between px-4 py-3 rounded-xl {{ request()->is('contact-messages*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}">
                                <span class="flex items-center gap-3"><span class="text-xl">💬</span><span
                                        class="font-medium">Pesan Contact</span></span>
                                @if(($unreadContactMessageCount ?? 0) > 0)
                                    <span class="text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full">{{ $unreadContactMessageCount }}</span>
                                @endif
                            </a>
                        @endif
                        <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                                href="{{ route('account.edit') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👤</span><span
                                        class="font-medium">Management Akun</span></span></a></div>
                    @endif
                    @if(auth()->user()?->department === 'operasional')
                        <a href="{{ route('ops.dashboard') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ops/dashboard') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📊</span><span
                                    class="font-medium">Dashboard</span></span></a>
                        <a href="{{ route('torpr.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('torpr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">🧾</span><span
                                    class="font-medium">TORPR</span></span></a>
                        <a href="{{ route('tracking.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('tracking-pr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">🛰️</span><span
                                    class="font-medium">Tracking PR</span></span></a>
                        <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                                href="{{ route('account.edit') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👤</span><span
                                        class="font-medium">Management Akun</span></span></a></div>
                    @endif
                </nav>
            </aside>
        </div>

        {{-- MAIN --}}
        <main id="mainContent" class="flex-1 min-w-0">
            <div
                class="bg-white dark:bg-gray-800 md:bg-white/80 dark:md:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 md:border-gray-200/50 dark:md:border-gray-800/50 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sticky top-0 z-40">
                <div class="flex items-center gap-2 md:gap-3">
                    <button type="button" id="btnOpenMobile" title="Menu"
                        class="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-all"><svg
                            class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg></button>
                    <div class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        {{ auth()->user()->name }} <span class="text-gray-400">|</span> <span
                            class="text-blue-600 dark:text-blue-400 capitalize">{{ auth()->user()->department }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 sm:gap-3">
                    <div class="presence-wrap" id="presenceWrap">
                        <button type="button" class="presence-trigger" id="presenceTrigger"
                            title="Lihat siapa yang online">
                            @php
                                $colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];
                                $myColor = $colors[auth()->id() % count($colors)];
                                $myInitials = strtoupper(mb_substr(auth()->user()->name, 0, 1));
                                if (strpos(auth()->user()->name, ' ') !== false) {
                                    $pp = explode(' ', auth()->user()->name);
                                    $myInitials = strtoupper(mb_substr($pp[0], 0, 1) . mb_substr($pp[1], 0, 1));
                                }
                            @endphp
                            <div class="avatar-stack hidden sm:flex" id="avatarStack">
                                <div class="av" style="background:{{ $myColor }}">{{ $myInitials }}</div>
                            </div>
                            <div class="online-indicator">
                                <span class="green-dot"></span>
                                <span class="hidden sm:inline">Online</span>
                                <span id="onlineCountLabel"
                                    class="font-bold text-indigo-600 dark:text-indigo-400">1</span>
                                <span id="myMoodFloat" class="my-mood-float hidden"></span>
                            </div>
                        </button>
                        <div class="presence-panel" id="presencePanel">
                            <div class="pp-header"><span class="green-dot"></span><span class="pp-title">Sedang
                                    Online</span><span class="pp-count" id="ppCount">1</span></div>
                            <div class="pp-list" id="ppList">
                                <div class="pp-row me">
                                    <div class="pp-av" style="background:{{ $myColor }}">{{ $myInitials }}</div>
                                    <div class="pp-info">
                                        <div class="pp-name">{{ auth()->user()->name }}</div>
                                        <div class="pp-dept">{{ auth()->user()->department }}</div>
                                    </div><span class="pp-me-tag">Kamu</span>
                                </div>
                            </div>
                            <div class="pp-footer"><button type="button" class="pp-footer-btn" id="btnChangeMood">✏️
                                    Ganti mood</button></div>
                        </div>
                    </div>
                    <button type="button" class="chat-trigger" id="chatTrigger" title="Chat Tim">
                        <span class="chat-trigger-icon">💬</span>
                        <span class="chat-trigger-badge" id="chatBadge">0</span>
                        <span class="chat-trigger-mention" id="chatMentionBadge">@</span>
                    </button>
                    <button id="themeToggle" type="button" title="Toggle theme"
                        class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                        <div class="transition-transform duration-500 rotate-0 dark:rotate-180"><span
                                class="dark:hidden text-xl">🌙</span><span class="hidden dark:inline text-xl">☀️</span>
                        </div>
                    </button>
                    <a href="/"
                        class="p-2.5 md:px-4 md:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg group"><svg
                            class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10z" />
                        </svg><span class="hidden md:inline">Dashboard</span></a>
                    <form method="POST" action="{{ route('logout') }}">@csrf<button type="submit"
                            class="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-semibold text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2 group"><span
                                class="hidden sm:inline">Logout</span><svg
                                class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg></button></form>
                </div>
            </div>
            <div class="p-4 sm:p-6 animate-fade-in">@yield('content')</div>
        </main>
    </div>

    {{-- CONTEXT MENU --}}
    <div class="ctx-menu" id="ctxMenu">
        <div class="ctx-reactions" id="ctxReactions"></div>
        <div class="ctx-item" id="ctxReply"><span class="ctx-icon">↩️</span>Balas</div>
        <div class="ctx-item" id="ctxEdit"><span class="ctx-icon">✏️</span>Edit Pesan</div>
        <div class="ctx-item" id="ctxMention"><span class="ctx-icon">🏷️</span>Tag @Nama</div>
        <div class="ctx-item danger" id="ctxDelete"><span class="ctx-icon">🗑️</span>Hapus Pesan</div>
    </div>

    {{-- CHAT PANEL --}}
    <div class="chat-panel" id="chatPanel">
        <div class="cp-head">
            <div class="cp-head-info">
                <div class="cp-title">💬 Chat Tim</div>
                <div class="cp-sub" id="cpOnlineCount">Memuat...</div>
            </div>
            <button type="button" class="cp-head-action" id="cpSearchBtn" title="Cari pesan" aria-label="Cari pesan">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpNotifyBtn" title="Aktifkan notifikasi dan suara" aria-label="Notifikasi chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .53-.21 1.04-.59 1.41L4 17h5m6 0a3 3 0 0 1-6 0"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpFullscreenBtn" title="Layar penuh" aria-label="Buka chat layar penuh">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpMinimizeBtn" title="Minimize" aria-label="Minimize chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
            </button>
            <span class="cp-head-mention" id="cpHeadMention" title="Lihat pesan yang menandai">@</span>
            <button type="button" class="cp-close" id="btnCloseChat" title="Tutup">✕</button>
        </div>
        <div class="cp-search-panel" id="cpSearchPanel">
            <div class="cp-search-row">
                <input type="search" class="cp-search-input" id="cpSearchInput" maxlength="100" placeholder="Cari isi pesan atau nama..." autocomplete="off">
                <button type="button" class="cp-search-cancel" id="cpSearchClose">Tutup</button>
            </div>
            <div class="cp-search-status" id="cpSearchStatus">Ketik minimal 2 karakter.</div>
            <div class="cp-search-results" id="cpSearchResults"></div>
        </div>
        <div class="cp-messages custom-scrollbar" id="cpMessages">
            <div class="cp-empty" id="cpEmpty">
                <div class="cp-empty-icon">💬</div>
                <div class="cp-empty-text">Belum ada pesan.<br>Mulai percakapan sekarang!</div>
            </div>
        </div>
        <div class="cp-typing" id="cpTyping"></div>
        <div class="cp-reply-bar" id="cpReplyBar">
            <span class="cp-reply-bar-icon">↩</span>
            <span class="cp-reply-text" id="cpReplyText">Membalas pesan</span>
            <button type="button" class="cp-reply-close" id="btnCancelReply" title="Batal">✕</button>
        </div>
        <div class="cp-input-wrap" id="cpInputWrap">
            <div class="mention-dd" id="mentionDd">
                <div class="mention-dd-header">Tag seseorang</div>
                <div id="mentionDdList"></div>
            </div>
            <div class="followup-dd" id="followupDd">
                <div class="followup-dd-header">
                    <span>Follow up PR/PPBJ</span>
                    <small>Ketik /@ lalu pilih data</small>
                </div>
                <div id="followupDdList"></div>
            </div>
            <div class="cp-emoji-row" id="cpEmojiRow"></div>
            <div class="cp-input-row">
                <textarea class="cp-textarea" id="cpInput" placeholder="Ketik pesan... (Enter kirim)" rows="1"
                    maxlength="500"></textarea>
                <button type="button" class="cp-send" id="cpSendBtn" title="Kirim" disabled><svg id="sendIconSvg"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg></button>
            </div>
            <div class="cp-char" id="cpChar">0/500</div>
        </div>
    </div>

    @stack('scripts')

    <script>
        window.APP_SHELL_CONFIG = Object.freeze({
            presenceHeartbeatUrl: @json(route('presence.heartbeat')),
            presenceMoodGetUrl: @json(route('presence.mood.get')),
            presenceMoodUrl: @json(route('presence.mood')),
            userId: @json((int) auth()->id()),
            userGender: @json(auth()->user()->gender ?? null),
            userName: @json(auth()->user()->name ?? 'User')
        });
    </script>
    <script src="{{ asset('assets/app/app-shell.js') }}?v={{ filemtime(public_path('assets/app/app-shell.js')) }}"></script>
    <script>
        @if(auth()->user()?->department === 'umum')
            (function () { var url = '{{ route('approval.pr.pendingCount') }}', b1 = document.getElementById('badgePendingPr'), b2 = document.getElementById('badgePendingPrMobile'), t = null; function refresh() { fetch(url, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { var c = Number(d.count || 0);[b1, b2].forEach(function (b) { if (b) { b.textContent = c; if (c > 0) b.classList.remove('hidden'); else b.classList.add('hidden') } }) }).catch(function () { }) } function schedule() { if (!t) t = setInterval(refresh, 60000) } document.addEventListener('visibilitychange', function () { if (document.hidden) { clearInterval(t); t = null } else { refresh(); schedule() } }); if (!document.hidden) schedule() })();
        @endif

        @if(auth()->user()?->isReadOnly())
            (function () {
                var message = 'Akun viewer hanya memiliki akses baca. Perubahan data tidak diizinkan.';

                function notifyReadOnly() {
                    if (window.Swal) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Mode Viewer',
                            text: message,
                            confirmButtonColor: '#2563eb'
                        });
                    } else {
                        alert(message);
                    }
                }

                function isLogoutAction(action) {
                    return (action || '').toLowerCase().indexOf('/logout') !== -1;
                }

                document.querySelectorAll('form').forEach(function (form) {
                    var action = form.getAttribute('action') || '';
                    var method = (form.getAttribute('method') || 'get').toLowerCase();
                    var spoofedMethod = form.querySelector('input[name="_method"]');
                    var unsafe = method !== 'get' || !!spoofedMethod;

                    if (!unsafe || isLogoutAction(action)) return;

                    form.dataset.readonlyBlocked = '1';
                    form.addEventListener('submit', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        notifyReadOnly();
                    }, true);

                    form.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (button) {
                        button.classList.add('readonly-locked');
                        button.setAttribute('title', message);
                    });
                });

                document.querySelectorAll('[onclick*="delete"], [onclick*="Delete"], [onclick*="approve"], [onclick*="Approve"], [onclick*="reject"], [onclick*="Reject"]').forEach(function (element) {
                    element.classList.add('readonly-locked');
                    element.setAttribute('title', message);
                    element.addEventListener('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        notifyReadOnly();
                    }, true);
                });
            })();
        @endif

    </script>


    @include('components.chatbot')
</body>

</html>
