@push('styles')
<link rel="stylesheet" href="{{ asset('assets/app/procurement-workspace.css') }}?v={{ filemtime(public_path('assets/app/procurement-workspace.css')) }}">
@endpush
<dialog id="wsDialog" class="ws-dialog" aria-labelledby="wsDialogTitle">
    <header class="ws-header"><div><span class="ws-eyebrow">{{ ($workspaceConfig['detailOnly'] ?? false) ? 'PROGRES PENGADAAN' : 'RUANG KERJA PERSONAL' }}</span><h2 id="wsDialogTitle">Rincian cepat</h2></div><button type="button" data-ws-close aria-label="Tutup panel" autofocus>✕</button></header>
    <div id="wsStatus" class="ws-status" role="status" aria-live="polite"></div>
    <div id="wsBody" class="ws-body"></div>
</dialog>
@push('scripts')
<script type="application/json" id="wsConfig">@json($workspaceConfig)</script>
<script src="{{ asset('assets/app/procurement-workspace.js') }}?v={{ filemtime(public_path('assets/app/procurement-workspace.js')) }}" defer></script>
@endpush
