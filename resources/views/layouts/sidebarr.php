<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Monitoring PPBJ')</title>
    @vite(['resources/css/app.css','resources/js/app.js'])
    @stack('styles')
</head>
<body class="bg-gray-50">
<div class="min-h-screen flex">

    {{-- SIDEBAR --}}
    <aside class="w-64 bg-white border-r hidden md:block">
        <div class="p-5 font-bold text-lg">Monitoring PPBJ</div>

        <nav class="px-3 space-y-2">
            {{-- Menu UMUM --}}
            @if(auth()->user()?->department === 'umum')
                <a href="{{ route('ppbj.index') }}"
                   class="block px-4 py-2 rounded-lg hover:bg-gray-100 {{ request()->is('ppbj*') ? 'bg-blue-50 text-blue-700 font-semibold' : '' }}">
                    Management PPBJ
                </a>

                <a href="{{ route('approval.pr.index') }}"
                   class="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 {{ request()->is('approval/pr-receipts*') ? 'bg-blue-50 text-blue-700 font-semibold' : '' }}">
                    <span>Approval PR</span>
                    <span id="badgePendingPr" class="hidden text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">0</span>
                </a>
            @endif

            {{-- Menu OPERASIONAL --}}
            @if(auth()->user()?->department === 'operasional')
                <a href="{{ route('torpr.index') }}"
                   class="block px-4 py-2 rounded-lg hover:bg-gray-100 {{ request()->is('torpr*') ? 'bg-blue-50 text-blue-700 font-semibold' : '' }}">
                    TORPR
                </a>

                <a href="{{ route('tracking.index') }}"
                   class="block px-4 py-2 rounded-lg hover:bg-gray-100 {{ request()->is('tracking-pr*') ? 'bg-blue-50 text-blue-700 font-semibold' : '' }}">
                    Tracking PR
                </a>
            @endif
        </nav>
    </aside>

    {{-- MAIN --}}
    <main class="flex-1">
        {{-- TOPBAR --}}
        <div class="bg-white border-b px-6 py-3 flex items-center justify-between">
            <div class="text-sm text-gray-600">
                {{ auth()->user()->name }} ({{ auth()->user()->department }})
            </div>

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold">Logout</button>
            </form>
        </div>

        <div class="p-6">
            @yield('content')
        </div>
    </main>
</div>

@stack('scripts')

{{-- POLLING NOTIF (khusus UMUM) --}}
@if(auth()->user()?->department === 'umum')
<script>
(function(){
    const badge = document.getElementById('badgePendingPr');
    if(!badge) return;

    async function refresh(){
        try {
            const r = await fetch("{{ route('approval.pr.pendingCount') }}", { headers: { 'Accept':'application/json' }});
            if(!r.ok) return;
            const j = await r.json(); // { count: 3 }
            const c = Number(j.count || 0);
            badge.textContent = c;
            badge.classList.toggle('hidden', c <= 0);
        } catch(e) {}
    }

    refresh();
    setInterval(refresh, 8000); // 8 detik sekali
})();
</script>
@endif

</body>
</html>
