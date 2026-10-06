@extends('layouts.app')

@section('title', 'Pusat Kendali Pengadaan')

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/command-center/command-center.css') }}?v={{ filemtime(public_path('assets/command-center/command-center.css')) }}">
@endpush

@section('content')
<div id="commandCenter" class="cc-shell"
    data-overview-url="{{ route('command-center.overview') }}"
    data-search-url="{{ route('command-center.search') }}"
    data-ask-url="{{ route('command-center.ask') }}"
    data-reconciliation-url="{{ route('command-center.reconciliation') }}"
    data-journey-url="{{ url('/command-center/journey') }}">
    <section class="cc-hero">
        <div class="cc-orb cc-orb-a"></div><div class="cc-orb cc-orb-b"></div>
        <div class="cc-hero-copy">
            <div class="cc-kicker"><span class="cc-live-dot"></span> MONITORING EKSEKUTIF · DATA TERINTEGRASI</div>
            <h1>Pusat Kendali <span>Pengadaan</span></h1>
            <p>Ringkasan proses, risiko, nilai, kontrak, dan perjalanan pengadaan dalam satu tampilan.</p>
            <div class="cc-updated">Sinkronisasi terakhir: <strong id="ccUpdated">menyiapkan data…</strong></div>
        </div>
        <div class="cc-hero-actions">
            <button type="button" class="cc-button cc-button-ghost" id="ccFullscreen">⛶ Layar Penuh</button>
            <a class="cc-button cc-button-light" href="{{ route('command-center.meeting.pdf') }}">↓ Brief PDF</a>
            <a class="cc-button cc-button-light" href="{{ route('command-center.meeting.excel') }}">↓ Brief Excel</a>
            <button type="button" class="cc-button cc-button-primary" id="ccRefresh">↻ Refresh</button>
        </div>
    </section>

    <section class="cc-intelligence">
        <div class="cc-search-block">
            <span class="cc-search-icon">⌕</span>
            <input id="ccSearchInput" autocomplete="off" placeholder="Cari apa pun: nomor PR, catatan, vendor, dokumen, tanggal, status, atau nilai…">
            <button type="button" id="ccSearchButton">Temukan</button>
        </div>
        <div class="cc-ask-block">
            <span class="cc-ai-mark">✦</span>
            <input id="ccAskInput" autocomplete="off" placeholder="Tanya SIMONPR: PR apa yang belum SP? Kontrak mana segera habis?">
            <button type="button" id="ccAskButton">Analisis</button>
        </div>
        <div class="cc-chips">
            <button data-question="Tampilkan pengadaan terlambat">Pengadaan terlambat</button>
            <button data-question="Tampilkan PR belum SP">Belum ada SP</button>
            <button data-question="Kontrak yang segera habis">Kontrak segera habis</button>
            <button data-question="Pengadaan yang selesai lengkap">Sudah lengkap</button>
            <button data-search-query="10 nilai PR terbesar">10 Nilai PR Terbesar</button>
            <button type="button" class="cc-chip-audit" id="ccReconciliationButton">Rekonsiliasi PR–Invoice</button>
        </div>
    </section>

    <section class="cc-stat-grid" id="ccStats">
        @foreach(['Total Pengadaan','Sedang Aktif','Risk Tinggi','Kontrak Kritis','Nilai PR','Efisiensi'] as $label)
            <article class="cc-stat cc-skeleton"><span>{{ $label }}</span><strong>—</strong><small>Memuat ringkasan</small></article>
        @endforeach
    </section>

    <section class="cc-panel cc-flow-panel">
        <div class="cc-panel-head"><div><span class="cc-eyebrow">RINGKASAN PROSES</span><h2>Alur Pengadaan End-to-End</h2></div><span class="cc-panel-note">Klik hasil pencarian untuk membuka perjalanan lengkap</span></div>
        <div class="cc-flow" id="ccFlow"></div>
    </section>

    <div class="cc-main-grid">
        <section class="cc-panel cc-risk-panel">
            <div class="cc-panel-head"><div><span class="cc-eyebrow cc-red">PRIORITAS & RISIKO</span><h2>Pengadaan yang Perlu Ditangani</h2></div><span class="cc-count" id="ccRiskCount">0 risiko</span></div>
            <div class="cc-risk-list" id="ccRisks"><div class="cc-empty">Menganalisis risiko pengadaan…</div></div>
        </section>
        <section class="cc-panel cc-contract-panel">
            <div class="cc-panel-head"><div><span class="cc-eyebrow cc-amber">KENDALI KONTRAK</span><h2>Masa Pemenuhan Terdekat</h2></div></div>
            <div class="cc-contract-list" id="ccContracts"><div class="cc-empty">Membaca tanggal kontrak…</div></div>
        </section>
    </div>

    <section class="cc-panel cc-trend-panel">
        <div class="cc-panel-head"><div><span class="cc-eyebrow">TREN BULANAN</span><h2>Aktivitas Pengadaan Enam Bulan</h2></div><span class="cc-panel-note">Berdasarkan tanggal data dibuat</span></div>
        <div class="cc-trend" id="ccTrend"></div>
    </section>
</div>

<div class="cc-modal" id="ccResultsModal" aria-hidden="true">
    <div class="cc-modal-backdrop" data-close-modal></div>
    <div class="cc-modal-card cc-results-card">
        <button class="cc-modal-close" data-close-modal>×</button>
        <span class="cc-eyebrow">PENCARIAN TERPADU</span><h2 id="ccResultsTitle">Hasil Pencarian</h2>
        <p id="ccResultsSummary" class="cc-modal-summary"></p>
        <div id="ccResults" class="cc-result-list"></div>
    </div>
</div>

<div class="cc-modal" id="ccJourneyModal" aria-hidden="true">
    <div class="cc-modal-backdrop" data-close-modal></div>
    <div class="cc-modal-card cc-journey-card">
        <button class="cc-modal-close" data-close-modal>×</button>
        <div id="ccJourney"><div class="cc-empty">Menyiapkan digital passport…</div></div>
    </div>
</div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/command-center/command-center.js') }}?v={{ filemtime(public_path('assets/command-center/command-center.js')) }}" defer></script>
@endpush
