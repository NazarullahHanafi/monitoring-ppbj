@once
    @push('styles')
        <link rel="stylesheet" href="{{ asset('assets/app/archive-popup.css') }}?v={{ filemtime(public_path('assets/app/archive-popup.css')) }}">
    @endpush
    @push('scripts')
        <script src="{{ asset('assets/app/archive-popup.js') }}?v={{ filemtime(public_path('assets/app/archive-popup.js')) }}" defer></script>
    @endpush
@endonce
