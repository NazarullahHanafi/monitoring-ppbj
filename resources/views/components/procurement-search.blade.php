@if(config('procurement_search.enabled'))
<section id="procurementUnifiedSearch" class="pus" data-endpoint="{{ route('procurement.search') }}" data-status-endpoint="{{ route('procurement.search.status') }}" data-priority-base="{{ url('/procurement/search/prs') }}" data-csrf="{{ csrf_token() }}" data-review-base="{{ url('/procurement/search/reviews') }}" data-can-review="{{ auth()->user()?->role === 'superadmin' ? '1' : '0' }}" data-can-prioritize="{{ ! auth()->user()?->isReadOnly() && ! \Illuminate\Support\Facades\Cache::get('simonpr:read_only_mode', false) ? '1' : '0' }}" aria-label="Pencarian terpadu PR dan lampiran">
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
            <label><span>Hindari PR yang memuat kata</span><input data-pus-exclude type="search" maxlength="120" placeholder="Contoh: bekas rekondisi" autocomplete="off"><small>Maksimal 4 kata utuh. Berlaku pada semua dokumen PR dalam sumber yang dipilih.</small></label>
        </div><p class="pus-note">Isi yang diperlukan, lalu klik Cari. Kata utuh mencocokkan token tanpa memperluas awalan/padanan; urutan kata tidak diwajibkan. Nomor dokumen persis mencocokkan seluruh nomor tercatat. Mode lintas dokumen: maksimal 8 kata, minimal 2 karakter per kata. Vendor penawaran belum tentu vendor terpilih.</p></details>
    </form>
    <p class="pus-note">Cari isi scan langsung dari filter pencarian menu ini atau kolom di atas. Hasil menampilkan PR, buyer, vendor, dan pembuat TOR jika tercatat. Buka Penelusur bukti halaman pada hasil lampiran untuk mencari kemunculan lain atau frasa berurutan. Kata yang belum ketemu dijelaskan; nomor PR, angka, dan ukuran tetap dicari utuh.</p>
    <div class="pus-summary" data-pus-summary hidden aria-label="Ringkasan hasil"></div>
    <p data-pus-status role="status" aria-live="polite" class="pus-status">Isi kolom di atas lalu tekan Enter atau klik Cari di semua PR. Hasil ditampilkan bertahap; gunakan Hitung seluruh PR bila memerlukan total. Scan/foto lama diproses bertahap di latar belakang.</p>
    <div data-pus-suggestions class="pus-suggestions" hidden aria-label="Saran perbaikan pencarian"></div>
    <button type="button" data-pus-check-status class="pus-secondary pus-check-status">Cek status antrean arsip</button>
    <button type="button" data-pus-check-coverage data-coverage-endpoint="{{ route('procurement.search.coverage') }}" class="pus-secondary pus-check-status">Audit kelengkapan lampiran</button>
    @if(auth()->user()?->role === 'superadmin')
    <details class="pus-progress"><summary>Telusuri seluruh file arsip, termasuk yang belum terhubung ke PR</summary>
        <p class="pus-note">Akses Super Admin Umum. Nomor PR hanya ditampilkan jika relasinya sudah tercatat. File yang belum selesai dibaca tetap mengikuti antrean.</p>
        <form data-pus-catalog-form data-endpoint="{{ route('procurement.search.catalog') }}"><label class="pus-field"><span>Isi seluruh file arsip</span><input data-pus-catalog-query type="search" maxlength="255" required></label><button class="pus-primary" type="submit">Cari seluruh arsip</button></form>
        <p data-pus-catalog-info role="status"></p><div data-pus-catalog-rows></div><button type="button" data-pus-catalog-more class="pus-secondary" hidden>Muat 15 file berikutnya</button>
    </details>
    @endif
    <details data-pus-coverage class="pus-progress" hidden><summary>Kelengkapan arsip & rincian halaman</summary><p data-pus-coverage-info class="pus-note"></p><div data-pus-coverage-rows class="pus-related"></div><div class="pus-pagination"><button type="button" data-pus-coverage-prev class="pus-secondary">Sebelumnya</button><button type="button" data-pus-coverage-back class="pus-secondary" hidden>Daftar lampiran</button><span data-pus-coverage-page></span><button type="button" data-pus-coverage-next class="pus-secondary">Berikutnya</button></div></details>
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
