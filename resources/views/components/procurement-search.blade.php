@if(config('procurement_search.enabled'))
<section id="procurementUnifiedSearch" class="pus" data-endpoint="{{ route('procurement.search') }}" aria-label="Pencarian terpadu PR dan lampiran">
    <header><div><span class="pus-eyebrow">RUANG TELUSUR PENGADAAN</span><h2>Setiap barang, terhubung ke PR-nya.</h2><p>Satu tempat untuk menelusuri PPBJ, rincian SP/SPPH, dan lampiran arsip.</p></div><span class="pus-pill">PPBJ · SP · SPPH · Arsip</span></header>
    <form data-pus-form>
        <label class="pus-field"><span>Nama barang, nomor, atau isi dokumen</span><input data-pus-query type="search" maxlength="255" autocomplete="off" value="" placeholder="Contoh: kursi ergonomis, printer, alat ukur…" required></label>
        <label class="pus-scope"><span>Ditemukan di</span><select data-pus-scope><option value="all">Semua sumber</option><option value="ppbj">Management PPBJ</option><option value="sp">Rincian SP</option><option value="spph">Rincian SPPH</option><option value="archive">Lampiran arsip / OCR</option></select></label>
        <button type="submit" class="pus-primary">Cari di semua PR</button><button type="button" data-pus-reset class="pus-secondary">Reset</button>
        <details class="pus-refine"><summary>Filter lanjutan: dokumen, buyer, vendor & pembuat TOR</summary><div class="pus-refine-fields">
            <label><span>Kecocokan kata</span><select data-pus-match><option value="source">Bersamaan dalam satu dokumen</option><option value="related">Lintas dokumen dalam PR yang sama</option><option value="reference">Nomor dokumen persis</option></select></label>
            <label><span>Ketelitian kata</span><select data-pus-lexical><option value="expanded">Awalan & padanan</option><option value="exact">Kata utuh, tanpa padanan</option></select></label>
            <label><span>Urutkan hasil</span><select data-pus-sort><option value="relevance">Paling relevan</option><option value="newest">PR terbaru</option></select></label>
            <label><span>Buyer / PIC PPBJ</span><input data-pus-buyer type="search" maxlength="120" placeholder="Nama buyer" autocomplete="off"></label>
            <label><span>Vendor PPBJ, SP, atau penawaran SPPH</span><input data-pus-vendor type="search" maxlength="120" placeholder="Sebagian nama vendor" autocomplete="off"></label>
            <label><span>Pembuat TOR / PR</span><input data-pus-creator type="search" maxlength="120" placeholder="Nama pembuat TOR asli" autocomplete="off"></label>
        </div><p class="pus-note">Isi yang diperlukan, lalu klik Cari. Kata utuh mencocokkan token tanpa memperluas awalan/padanan; urutan kata tidak diwajibkan. Nomor dokumen persis mencocokkan seluruh nomor tercatat. Mode lintas dokumen: maksimal 8 kata, minimal 2 karakter per kata. Vendor penawaran belum tentu vendor terpilih.</p></details>
    </form>
    <p class="pus-note">Cari isi scan langsung dari filter pencarian menu ini atau kolom di atas. Hasil menampilkan PR, buyer, vendor, dan pembuat TOR jika tercatat. Kata yang belum ketemu dijelaskan; nomor PR, angka, dan ukuran tetap dicari utuh.</p>
    <div class="pus-summary" data-pus-summary hidden aria-label="Ringkasan hasil"></div>
    <p data-pus-status role="status" aria-live="polite" class="pus-status">Isi kolom di atas lalu tekan Enter atau klik Cari di semua PR. Scan/foto lama diproses bertahap di latar belakang.</p>
    <div data-pus-suggestions class="pus-suggestions" hidden aria-label="Saran perbaikan pencarian"></div>
    <details data-pus-progress class="pus-progress" hidden><summary>Progres pembacaan arsip</summary><p data-pus-progressinfo></p></details>
    <div data-pus-results class="pus-results"></div>
    <nav data-pus-pagination class="pus-pagination" hidden aria-label="Halaman hasil pencarian"><button type="button" data-pus-prev class="pus-secondary">← Sebelumnya</button><span data-pus-page></span><button type="button" data-pus-next class="pus-secondary">Berikutnya →</button></nav>
</section>
@once
@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/app/procurement-search.css') }}?v={{ filemtime(public_path('assets/app/procurement-search.css')) }}">
@endpush
@push('scripts')
    <script src="{{ asset('assets/app/procurement-search.js') }}?v={{ filemtime(public_path('assets/app/procurement-search.js')) }}" defer></script>
@endpush
@endonce
@endif
