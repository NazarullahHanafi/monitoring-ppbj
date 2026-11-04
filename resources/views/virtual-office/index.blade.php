@extends('layouts.app')
@section('title', 'Kantor Virtual · SIMONPR')
@push('styles')
<link rel="stylesheet" href="{{ asset('assets/virtual-office/office.css') }}?v={{ filemtime(public_path('assets/virtual-office/office.css')) }}">
@endpush
@section('content')
<div class="vo" id="virtualOffice">
    <header class="vo-heading">
        <div><div class="vo-eyebrow"><span></span> SIMONPR <b>/</b> CONNECTED WORKSPACE</div>
            <h1>Kantor Virtual<span>.</span></h1><p>Satu ruang untuk terhubung, berkolaborasi, dan rehat sejenak.</p></div>
        <div class="vo-heading-actions"><span class="vo-live"><i></i> Kehadiran tim</span><button type="button" class="vo-button" id="voFullscreen" aria-label="Layar penuh kantor virtual">⛶ <span>Layar penuh</span></button></div>
    </header>
    <div class="vo-workspace" id="voWorkspace">
        <div class="vo-main">
            <div class="vo-stage-header"><div class="vo-location"><span class="vo-location-mark">S</span><div><b>PEKANBARU HQ</b><small>Ruang kolaborasi SUCOFINDO</small></div></div>
                <div class="vo-view-switch" role="group" aria-label="Tampilan kantor"><button type="button" id="voView3d" aria-pressed="true">◈ Ruang 3D</button><button type="button" id="voViewList" aria-pressed="false">☷ Mode ringan</button></div></div>
            <div class="vo-scene-wrap">
                <div class="vo-scene" id="voScene" role="region" aria-label="Kantor tiga dimensi. Geser untuk memutar, gulir untuk zoom. Gunakan tombol area atau daftar tim sebagai alternatif." tabindex="0"></div>
                <div class="vo-labels" id="voLabels"></div>
                <div class="vo-loading" id="voLoading"><span class="vo-loader"></span><b>Menyiapkan ruang Anda</b><small>Detail kecil. Koneksi yang lebih dekat.</small></div>
                <div class="vo-light-view" id="voLightView" hidden><div class="vo-light-art" aria-hidden="true">◈</div><h2>Tim Anda, tetap terhubung.</h2><p>Mode ringan menggunakan daftar kehadiran yang sama tanpa memuat grafis 3D.</p><div class="vo-light-people" id="voLightPeople"></div></div>
                <div class="vo-scene-caption"><span class="vo-caption-line"></span><div><b>WORK TOGETHER. FEEL CLOSER.</b><small id="voSceneHint">Putar ruang dengan geser · Gulir untuk mendekat</small></div></div>
                <div class="vo-controls" role="group" aria-label="Kontrol kamera"><button type="button" id="voZoomIn" title="Perbesar" aria-label="Perbesar">+</button><button type="button" id="voZoomOut" title="Perkecil" aria-label="Perkecil">−</button><span></span><button type="button" id="voReset" title="Kembali ke sudut awal" aria-label="Reset kamera">⌂</button><button type="button" id="voMotion" title="Jeda atau lanjutkan animasi" aria-label="Jeda animasi" aria-pressed="false">Ⅱ</button></div>
            </div>
            <div class="vo-room-tabs" role="group" aria-label="Lihat area kantor">
                <button type="button" data-vo-room="all" aria-pressed="true"><span>◈</span><div><b>Seluruh kantor</b><small>Ruang untuk semua</small></div></button>
                <button type="button" data-vo-room="umum" aria-pressed="false"><span>▤</span><div><b>Umum</b><small>Pengadaan & koordinasi</small></div></button>
                <button type="button" data-vo-room="operasional" aria-pressed="false"><span>⌘</span><div><b>Operasional</b><small>Ide & kolaborasi</small></div></button>
                <button type="button" data-vo-room="lounge" aria-pressed="false"><span>☕</span><div><b>The Lounge</b><small>Rehat, kopi, cerita</small></div></button>
            </div>
            <div class="vo-bottom"><div><span class="vo-pulse"></span><span id="voSync" role="status" aria-live="polite">Memuat kehadiran…</span></div><button type="button" id="voRefresh" class="vo-text-button">↻ Perbarui</button></div>
        </div>
        <aside class="vo-team" aria-label="Tim dan detail anggota">
            <div class="vo-team-heading"><div><span class="vo-eyebrow">YOUR PEOPLE</span><h2>Di ruang kita <span id="voTotal">0</span></h2></div><span class="vo-team-orbit" aria-hidden="true">✧</span></div>
            <div class="vo-stats"><div><i class="vo-dot online"></i><b id="voOnline">0</b><span>Online</span></div><div><i class="vo-dot idle"></i><b id="voIdle">0</b><span>Jeda</span></div><div><i class="vo-dot offline"></i><b id="voOffline">0</b><span>Offline</span></div></div>
            <label class="vo-search"><span aria-hidden="true">⌕</span><input id="voSearch" type="search" placeholder="Cari teman satu tim…" autocomplete="off" maxlength="100" aria-label="Cari anggota tim"></label>
            <div class="vo-team-filter" role="group" aria-label="Filter tim"><button type="button" data-vo-filter="all" aria-pressed="true">Semua</button><button type="button" data-vo-filter="umum" aria-pressed="false">Umum</button><button type="button" data-vo-filter="operasional" aria-pressed="false">Operasional</button></div>
            <div class="vo-people" id="voPeople"></div>
            <section class="vo-person-detail" id="voDetail" hidden aria-label="Detail anggota"><button type="button" id="voCloseDetail" class="vo-close" aria-label="Tutup detail anggota">×</button><div class="vo-detail-avatar" id="voDetailAvatar"></div><small id="voDetailDept"></small><h3 id="voDetailName"></h3><p id="voDetailStatus"></p><span class="vo-detail-mood" id="voDetailMood"></span><p class="vo-illustration" id="voDetailNote"></p><button type="button" class="vo-primary" id="voChat">Sebut di Chat Tim ↗</button><small id="voChatNote">Membuka draf mention; pesan dikirim setelah Anda menekan Kirim.</small></section>
            <div class="vo-team-footer"><span aria-hidden="true">✦</span><p><b>Ruang digital, koneksi nyata.</b>Pose makan, minum, atau tidur adalah ilustrasi status aplikasi, bukan aktivitas nyata atau penilaian kinerja.</p></div>
        </aside>
    </div>
    <section class="vo-links" aria-label="Lanjutkan kolaborasi"><div><span>KEEP THE CONVERSATION GOING</span><h2>Dari bertemu, jadi bekerja bersama.</h2></div><a href="{{ route('collaboration-calendar.index') }}"><span>◷</span><div><b>Kalender bersama</b><small>Temukan waktu untuk berkolaborasi</small></div><em>↗</em></a><a href="{{ route('collaboration-inbox.index') }}"><span>⇄</span><div><b>Action Inbox</b><small>Lanjutkan serah terima pekerjaan</small></div><em>↗</em></a></section>
</div>
<script type="application/json" id="voConfig">@json($officeConfig)</script>
@endsection
@push('scripts')
@vite('resources/js/virtual-office.js')
@endpush
