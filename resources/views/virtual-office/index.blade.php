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
                <div class="vo-view-switch" role="group" aria-label="Tampilan kantor"><button type="button" id="voView3d" aria-pressed="true">◈ Ruang 3D</button><button type="button" id="voViewList" aria-pressed="false">☷ Mode ringan</button><button type="button" id="voToggleTeam" aria-pressed="true" aria-controls="voTeam">☰ Tim</button><button type="button" id="voExitFullscreen" aria-label="Keluar dari layar penuh" hidden>⛶ Keluar</button></div></div>
            <div class="vo-scene-wrap">
                <div class="vo-scene" id="voScene" role="region" aria-label="Kantor tiga dimensi. Geser untuk memutar, gulir untuk zoom. Gunakan tombol area atau daftar tim sebagai alternatif." tabindex="0"></div>
                <div class="vo-labels" id="voLabels"></div>
                <div class="vo-campus-card"><span class="vo-eyebrow">THE CONNECTED CAMPUS</span><b>Work. Play. Belong.</b><small id="voDayPhase">Kampus rekreasi · 12 permainan</small><button type="button" class="vo-text-button" id="voOpenAvatar">✦ Avatar saya</button></div>
                <div class="vo-loading" id="voLoading"><span class="vo-loader"></span><b>Menyiapkan ruang Anda</b><small>Detail kecil. Koneksi yang lebih dekat.</small></div>
                <div class="vo-light-view" id="voLightView" hidden><div class="vo-light-art" aria-hidden="true">◈</div><h2>Tim Anda, tetap terhubung.</h2><p>Mode ringan menggunakan daftar kehadiran yang sama tanpa memuat grafis 3D.</p><div class="vo-light-people" id="voLightPeople"></div></div>
                <div class="vo-scene-caption"><span class="vo-caption-line"></span><div><b>WORK TOGETHER. FEEL CLOSER.</b><small id="voSceneHint">Putar ruang dengan geser · Gulir untuk mendekat</small></div></div>
                <div class="vo-controls" role="group" aria-label="Kontrol kamera"><button type="button" id="voZoomIn" title="Perbesar" aria-label="Perbesar">+</button><button type="button" id="voZoomOut" title="Perkecil" aria-label="Perkecil">−</button><span></span><button type="button" id="voReset" title="Kembali ke sudut awal" aria-label="Reset kamera">⌂</button><button type="button" id="voMotion" title="Jeda atau lanjutkan animasi" aria-label="Jeda animasi" aria-pressed="false">Ⅱ</button></div>
            </div>
            <div class="vo-room-tabs" role="group" aria-label="Lihat area kantor">
                <button type="button" data-vo-room="all" aria-pressed="true"><span>◈</span><div><b>Seluruh kampus</b><small>Kantor & taman rekreasi</small></div></button>
                <button type="button" data-vo-room="umum" aria-pressed="false"><span>▤</span><div><b>Umum</b><small>Pengadaan & koordinasi</small></div></button>
                <button type="button" data-vo-room="operasional" aria-pressed="false"><span>⌘</span><div><b>Operasional</b><small>Ide & kolaborasi</small></div></button>
                <button type="button" data-vo-room="lounge" aria-pressed="false"><span>☕</span><div><b>The Lounge</b><small>Rehat, kopi, cerita</small></div></button>
                <button type="button" data-vo-room="residences" aria-pressed="false"><span>⌂</span><div><b>Rumah Pribadi</b><small>Satu penghuni, satu rumah</small></div></button>
            </div>
            <div class="vo-games-bar"><div><span class="vo-eyebrow">RECREATION CLUB</span><small>12 area simulasi · pilih untuk mendekat</small></div><div class="vo-game-tabs" id="voGames" role="group" aria-label="Area permainan"></div></div>
            <div class="vo-bottom"><div><span class="vo-pulse"></span><span id="voSync" role="status" aria-live="polite">Memuat kehadiran…</span></div><div><button type="button" id="voFindMe" class="vo-text-button">◎ Cari avatar saya</button><button type="button" id="voRefresh" class="vo-text-button">↻ Perbarui</button></div></div>
        </div>
        <aside class="vo-team" id="voTeam" aria-label="Tim dan detail anggota">
            <div class="vo-team-heading"><div><span class="vo-eyebrow">YOUR PEOPLE</span><h2>Di ruang kita <span id="voTotal">0</span></h2></div><span class="vo-team-orbit" aria-hidden="true">✧</span></div>
            <div class="vo-stats"><div><i class="vo-dot online"></i><b id="voOnline">0</b><span>Online</span></div><div><i class="vo-dot idle"></i><b id="voIdle">0</b><span>Jeda</span></div><div><i class="vo-dot offline"></i><b id="voOffline">0</b><span>Offline</span></div></div>
            <label class="vo-search"><span aria-hidden="true">⌕</span><input id="voSearch" type="search" placeholder="Cari teman satu tim…" autocomplete="off" maxlength="100" aria-label="Cari anggota tim"></label>
            <div class="vo-team-filter" role="group" aria-label="Filter tim"><button type="button" data-vo-filter="all" aria-pressed="true">Semua</button><button type="button" data-vo-filter="umum" aria-pressed="false">Umum</button><button type="button" data-vo-filter="operasional" aria-pressed="false">Operasional</button></div>
            <div class="vo-people" id="voPeople"></div>
            <section class="vo-person-detail" id="voDetail" hidden aria-label="Detail anggota"><button type="button" id="voCloseDetail" class="vo-close" aria-label="Tutup detail anggota">×</button><div class="vo-detail-avatar" id="voDetailAvatar"></div><small id="voDetailDept"></small><h3 id="voDetailName"></h3><p id="voDetailStatus"></p><span class="vo-detail-mood" id="voDetailMood"></span><div class="vo-menu-now"><small>MENU TERAKHIR SAAT ONLINE</small><b id="voCurrentMenu">Belum tersedia</b></div><p class="vo-illustration" id="voDetailNote"></p>
                <section class="vo-home-detail" aria-label="Rumah pribadi anggota"><span class="vo-eyebrow">A PLACE TO REST</span><h4>Rumah yang nyaman.</h4><p id="voHomeStatus"></p><div class="vo-home-amenities"><span>🛏 Kasur & selimut</span><span>❄ AC</span><span>▣ Kulkas</span><span>☕ Dapur kecil</span><span>🛋 Sofa & TV</span><span>♧ Taman</span><span>◉ Kamar mandi</span><span>✦ Lampu hangat</span></div><button type="button" class="vo-button" id="voVisitHome">⌂ Lihat rumah & interior</button><small>Rumah tertutup saat tidak dipilih. Tutup detail untuk menutup interior kembali. Semua fasilitas merupakan ilustrasi virtual.</small></section>
                <section class="vo-journal" aria-label="Riwayat menu harian"><h4>Jejak harian</h4><label>Tanggal <input type="date" id="voActivityDate" aria-label="Tanggal aktivitas"></label><button type="button" class="vo-button" id="voLoadActivity">Lihat aktivitas menu</button><p id="voActivityStatus" role="status"></p><ol id="voActivityList"></ol><small>Nama menu dan waktu kunjungan sejak fitur dipasang. Bukan durasi kerja. Maksimal 100 kunjungan per hari, tersimpan 30 hari.</small></section>
                <button type="button" class="vo-button" id="voEditOwnAvatar" hidden>✦ Ubah avatar saya</button><button type="button" class="vo-primary" id="voChat">Sebut di Chat Tim ↗</button><small id="voChatNote">Membuka draf mention; pesan dikirim setelah Anda menekan Kirim.</small></section>
            <div class="vo-team-footer"><span aria-hidden="true">✦</span><p><b>Ruang digital, koneksi nyata.</b>Pose makan, minum, atau tidur adalah ilustrasi status aplikasi, bukan aktivitas nyata atau penilaian kinerja.</p></div>
        </aside>
    </div>
    <section class="vo-avatar-editor" id="voAvatarEditor" hidden role="dialog" aria-modal="true" aria-labelledby="voAvatarTitle" tabindex="-1">
        <div class="vo-editor-card"><button type="button" class="vo-close" id="voCloseAvatar" aria-label="Tutup pengaturan avatar">×</button><span class="vo-eyebrow">YOUR DIGITAL PERSONA</span><h2 id="voAvatarTitle">Dirancang oleh Anda.</h2><p>Personalisasi avatar akun Anda. Tampilan tersimpan di semua perangkat.</p>
            <div class="vo-avatar-preview" id="voAvatarPreview" aria-label="Pratinjau avatar"></div><form id="voAvatarForm"><div class="vo-avatar-fields" id="voAvatarFields"></div>
                <label class="vo-share"><input type="checkbox" id="voShareActivity"> Bagikan menu dan riwayat kunjungan saya kepada rekan tim</label><small class="vo-privacy-note">Hanya nama menu dan waktu. Isi dokumen, pencarian, data pribadi, dan halaman pengelola tidak ditampilkan. Anda tetap bisa melihat riwayat sendiri saat berbagi dimatikan.</small>
                <p id="voAvatarStatus" role="status" aria-live="polite"></p><button type="submit" class="vo-primary" id="voSaveAvatar">Simpan avatar saya</button></form>
        </div>
    </section>
    <section class="vo-links" aria-label="Lanjutkan kolaborasi"><div><span>KEEP THE CONVERSATION GOING</span><h2>Dari bertemu, jadi bekerja bersama.</h2></div><a href="{{ route('collaboration-calendar.index') }}"><span>◷</span><div><b>Kalender bersama</b><small>Temukan waktu untuk berkolaborasi</small></div><em>↗</em></a><a href="{{ route('collaboration-inbox.index') }}"><span>⇄</span><div><b>Action Inbox</b><small>Lanjutkan serah terima pekerjaan</small></div><em>↗</em></a></section>
</div>
<script type="application/json" id="voConfig">@json($officeConfig)</script>
@endsection
@push('scripts')
@vite('resources/js/virtual-office.js')
@endpush
