<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') · Hologram</title>
    <script>(()=>{let dark=false;try{const saved=localStorage.getItem('theme');dark=saved==='dark'||!saved&&matchMedia('(prefers-color-scheme: dark)').matches;if(parent!==window)dark=parent.document.documentElement.classList.contains('dark');}catch{}document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';})();</script>
    @vite(['resources/css/app.css'])
    <link rel="stylesheet" href="{{ asset('assets/vendor/ui/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/ui/select2.min.css') }}">
    @if(auth()->user()->department !== 'operasional')<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">@endif
    @stack('styles')
    <link rel="stylesheet" href="{{ asset('assets/virtual-office/hologram-frame.css') }}?v={{ filemtime(public_path('assets/virtual-office/hologram-frame.css')) }}">
</head>
<body class="office-hologram-frame bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    data-tool="{{ request()->attributes->get('office_hologram_tool', 'tracking') }}" data-dirty="{{ $errors->any() ? '1' : '0' }}" data-create="{{ request()->attributes->get('office_hologram_create') ? '1' : '0' }}" data-readonly="{{ auth()->user()->isReadOnly() || \Illuminate\Support\Facades\Cache::get('simonpr:read_only_mode', false) ? '1' : '0' }}">
    @if(auth()->user()->isReadOnly())<p class="hologram-viewer" role="status">Mode Viewer · akses baca</p>@endif
    <header class="hf-bridge hf-context">
        <div class="hf-robot" aria-hidden="true"><svg viewBox="0 0 112 120" fill="none"><ellipse class="hf-robot-orbit" cx="56" cy="108" rx="36" ry="7"/><g class="hf-robot-float"><path class="hf-robot-antenna" d="M56 24V12"/><circle cx="56" cy="10" r="4" class="hf-robot-signal"/><rect x="20" y="24" width="72" height="49" rx="19" class="hf-robot-metal"/><rect x="28" y="33" width="56" height="29" rx="11" class="hf-robot-face"/><g class="hf-robot-eyes"><path d="M39 46h9m16 0h9"/></g><path d="M50 56h12" class="hf-robot-smile"/><path d="M31 81c5-5 45-5 50 0l-5 16c-3 5-37 5-40 0z" class="hf-robot-metal"/><path d="M48 87h16" class="hf-robot-smile"/><path class="hf-robot-arm" d="M18 76 9 87m85-11 9 11"/></g></svg></div>
        <div class="hf-bridge-copy"><span>SIMONPR / DOCUMENT STUDIO</span><p>Dokumen asli · tersimpan di sistem pengadaan</p></div>
        <div class="hf-bridge-controls"><span><i></i> TERHUBUNG</span><button type="button" id="hologramThemeToggle" aria-label="Ganti mode warna dokumen">Mode warna</button></div>
    </header>
    <main class="hologram-content">@yield('content')</main>
    <script src="{{ asset('assets/vendor/ui/jquery-3.7.1.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/ui/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/ui/select2.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/app/form-ux.css') }}?v={{ filemtime(public_path('assets/app/form-ux.css')) }}">
    <script src="{{ asset('assets/app/form-ux.js') }}?v={{ filemtime(public_path('assets/app/form-ux.js')) }}" defer></script>
    @stack('scripts')
    <script src="{{ asset('assets/virtual-office/hologram-frame.js') }}?v={{ filemtime(public_path('assets/virtual-office/hologram-frame.js')) }}" defer></script>
</body>
</html>
