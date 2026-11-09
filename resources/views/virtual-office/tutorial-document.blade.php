<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="csrf-token" content="{{ csrf_token() }}"><meta name="robots" content="noindex,nofollow">
<title>Latihan {{ $kind === 'tracking' ? 'Tracking PR' : strtoupper($kind) }} · Hologram</title>
<link rel="stylesheet" href="{{ asset('assets/virtual-office/tutorial-document.css') }}?v={{ filemtime(public_path('assets/virtual-office/tutorial-document.css')) }}">
</head><body data-kind="{{ $kind }}" data-endpoint="{{ route('virtual-office.tutorial.document.validate', [], false) }}">
<header><span class="practice-badge">◇ HOLOGRAM / PRAKTIK LANGSUNG</span><h1>{{ $kind === 'tracking' ? 'Telusuri perjalanan contoh PR.' : 'Susun '.strtoupper($kind).' pertama Anda.' }}</h1><p>Mode latihan · Anda mencoba alur pengisian. Contoh ini tidak dikirim ke pengadaan dan tidak memakai nomor dokumen asli.</p></header>
<main><section class="practice-form-panel" aria-labelledby="practice-title"><div class="practice-top"><h2 id="practice-title">{{ $kind === 'tracking' ? 'Nomor contoh' : 'Data pengajuan latihan' }}</h2><button type="button" id="practiceExample">Isi contoh</button></div>
<p class="practice-hint">{{ $kind === 'tracking' ? 'Ketik nomor contoh atau pilih Isi contoh, lalu telusuri tahapannya.' : 'Coba isi sendiri atau gunakan Isi contoh. Kolom bertanda * wajib diisi; perbaiki kesalahan yang ditampilkan sebelum melanjutkan.' }}</p>
<form id="practiceForm" method="POST" action="{{ route('virtual-office.tutorial.document.validate') }}">@csrf
@if($kind === 'ppbj')
    <label>No. PPBJ *<input name="ppbj_no" required maxlength="255" autocomplete="off" placeholder="Contoh: LATIHAN/PPBJ/001"></label>
    <label>Tanggal PPBJ *<input name="tgl_ppbj" required type="date"></label>
    <label>Uraian pengadaan *<textarea name="uraian" required minlength="5" maxlength="255" rows="3" placeholder="Misalnya pengadaan alat kerja untuk tim"></textarea></label>
    <label>Total sebelum PPN (Rp) *<input name="total_sebelum_ppn" required type="number" min="1" max="999999999999" step="0.01" placeholder="2500000"></label>
@elseif($kind === 'pr')
    <label>Nomor PR *<input name="nomor_pr" required maxlength="255" autocomplete="off" placeholder="Contoh: LATIHAN/PR/001"></label>
    <label>Tanggal PR *<input name="tanggal_pr" required type="datetime-local"></label>
    <label>Tujuan pengadaan *<textarea name="tujuan_pengadaan" required minlength="5" maxlength="255" rows="3" placeholder="Misalnya perlengkapan inspeksi operasional"></textarea></label>
    <label>Jumlah / nilai PR (Rp) *<input name="jumlah_pr" required type="number" min="1" max="999999999999" step="0.01" placeholder="2500000"></label>
@else
    <label>Nomor PR / PPBJ contoh *<input name="number" required minlength="3" maxlength="100" autocomplete="off" placeholder="LATIHAN/PR/001"></label>
    <p class="practice-viewer">Akses baca · Latihan ini hanya menelusuri contoh. Anda tidak membuat atau menyetujui dokumen.</p>
@endif
<p id="practiceError" class="practice-error" role="alert"></p><button id="practiceSubmit" type="submit" class="practice-primary">{{ $kind === 'tracking' ? 'Telusuri contoh' : 'Validasi & simpan latihan' }}</button>
</form></section>
<section id="practiceResult" class="practice-result" hidden tabindex="-1" aria-labelledby="result-title"><span class="practice-badge">✓ LATIHAN BERHASIL</span><h2 id="result-title">{{ $kind === 'tracking' ? 'Contoh perjalanan pengajuan.' : 'Pengisian Anda lolos validasi latihan.' }}</h2><dl id="practiceSummary"></dl>
    <ol class="practice-timeline"><li>Pengajuan PR</li><li>Pemeriksaan / persetujuan</li><li>Proses PPBJ</li><li>SPPH / SP sesuai proses</li></ol>
    <p>Ini hasil simulasi. Tidak ada dokumen, nomor registrasi, persetujuan, atau notifikasi pengadaan yang dibuat. Setelah tutorial selesai, menu hologram kembali memakai data asli.</p>
    <button type="button" id="practiceReturn" class="practice-primary">Lanjut ke avatar saya →</button>
</section></main>
<script src="{{ asset('assets/virtual-office/tutorial-document.js') }}?v={{ filemtime(public_path('assets/virtual-office/tutorial-document.js')) }}" defer></script>
</body></html>
