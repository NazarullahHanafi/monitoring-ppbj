@once
    @push('styles')
        <link rel="stylesheet" href="{{ asset('assets/app/procurement-details.css') }}?v={{ filemtime(public_path('assets/app/procurement-details.css')) }}">
    @endpush
    @push('scripts')
        <script>
            @php
                $detailAttachmentConfig = ['baseUrl' => url('/procurement/details'), 'readerUrl' => asset('assets/document-reader/v1'), 'csrf' => csrf_token(), 'formats' => \App\Support\ProcurementUploadFormats::FORMATS];
            @endphp
            window.PROCUREMENT_DETAILS_CONFIG = @json($detailAttachmentConfig);
        </script>
        <script src="{{ asset('assets/app/attachment-intent.js') }}?v={{ filemtime(public_path('assets/app/attachment-intent.js')) }}" defer></script>
        <script src="{{ asset('assets/app/procurement-document-reader.js') }}?v={{ filemtime(public_path('assets/app/procurement-document-reader.js')) }}" defer></script>
        <script src="{{ asset('assets/app/procurement-details.js') }}?v={{ filemtime(public_path('assets/app/procurement-details.js')) }}" defer></script>
    @endpush
@endonce
