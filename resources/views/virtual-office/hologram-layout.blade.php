<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') · Hologram</title>
    <script>document.documentElement.classList.toggle('dark',localStorage.getItem('theme')==='dark');</script>
    @vite(['resources/css/app.css'])
    <link rel="stylesheet" href="{{ asset('assets/vendor/ui/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/ui/select2.min.css') }}">
    @if(auth()->user()->department !== 'operasional')<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">@endif
    @stack('styles')
    <link rel="stylesheet" href="{{ asset('assets/virtual-office/hologram-frame.css') }}?v={{ filemtime(public_path('assets/virtual-office/hologram-frame.css')) }}">
</head>
<body class="office-hologram-frame bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    data-create="{{ request()->attributes->get('office_hologram_create') ? '1' : '0' }}" data-readonly="{{ auth()->user()->isReadOnly() || \Illuminate\Support\Facades\Cache::get('simonpr:read_only_mode', false) ? '1' : '0' }}">
    @if(auth()->user()->isReadOnly())<p class="hologram-viewer" role="status">Mode Viewer · akses baca</p>@endif
    <main class="hologram-content">@yield('content')</main>
    <script src="{{ asset('assets/vendor/ui/jquery-3.7.1.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/ui/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/ui/select2.min.js') }}"></script>
    @stack('scripts')
    <script src="{{ asset('assets/virtual-office/hologram-frame.js') }}?v={{ filemtime(public_path('assets/virtual-office/hologram-frame.js')) }}" defer></script>
</body>
</html>
