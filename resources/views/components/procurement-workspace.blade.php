@php
    $workspaceState = \App\Support\ProcurementWorkspace::state((int)auth()->id(), $workspacePage);
    $workspaceConfig = ['page'=>$workspacePage,'columns'=>\App\Support\ProcurementWorkspace::COLUMNS[$workspacePage],
        'filterKeys'=>\App\Support\ProcurementWorkspace::FILTERS[$workspacePage], 'state'=>$workspaceState,
        'filterLabels'=>['search'=>'Pencarian','uraian'=>'Uraian','amount'=>'Nominal','amount_fields'=>'Jenis nilai','portofolio'=>'Portofolio','buyer'=>'Buyer',
            'penyedia_eksternal'=>'Penyedia','general_registration'=>'Registrasi Umum','status_sla'=>'Status SLA','progress'=>'Progress','date_type'=>'Jenis tanggal',
            'date_day'=>'Tanggal PR','date_month'=>'Bulan PR','date_year'=>'Tahun PR','date_start'=>'Tanggal mulai','date_end'=>'Tanggal akhir','per_page'=>'Baris per halaman',
            'pic'=>'PIC','vendor'=>'Vendor','dari'=>'Tanggal mulai','sampai'=>'Tanggal akhir','mode'=>'Mode penomoran'],
        'saveUrl'=>route('procurement.workspace.save',['page'=>$workspacePage])];
@endphp
@push('styles')
<link rel="stylesheet" href="{{ asset('assets/app/procurement-workspace.css') }}?v={{ filemtime(public_path('assets/app/procurement-workspace.css')) }}">
@endpush
<section class="ws-toolbar" aria-label="Ruang kerja tabel pribadi">
    <div><span class="ws-eyebrow">RUANG KERJA ANDA</span><p>Rincian cepat, filter favorit, dan tabel sesuai kebutuhan.</p></div>
    <div class="ws-buttons">
        <button type="button" data-ws-open="favorites">☆ Filter favorit <span id="wsFavoriteCount">{{ count($workspaceState['settings']['favorites']) }}</span></button>
        <button type="button" data-ws-open="layout">☷ Atur tampilan</button>
    </div>
</section>
<dialog id="wsDialog" class="ws-dialog" aria-labelledby="wsDialogTitle">
    <header class="ws-header"><div><span class="ws-eyebrow">RUANG KERJA PERSONAL</span><h2 id="wsDialogTitle">Rincian cepat</h2></div><button type="button" data-ws-close aria-label="Tutup panel" autofocus>✕</button></header>
    <div id="wsStatus" class="ws-status" role="status" aria-live="polite"></div>
    <div id="wsBody" class="ws-body"></div>
</dialog>
@push('scripts')
<script type="application/json" id="wsConfig">@json($workspaceConfig)</script>
<script src="{{ asset('assets/app/procurement-workspace.js') }}?v={{ filemtime(public_path('assets/app/procurement-workspace.js')) }}" defer></script>
@endpush
