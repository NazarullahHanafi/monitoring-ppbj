@if(config('procurement_search.enabled'))
<section id="procurementUnifiedSearch" class="pus" data-endpoint="{{ route('procurement.search') }}" aria-label="Pencarian terpadu PR dan lampiran">
    <header><div><span class="pus-eyebrow">SATU PENCARIAN · SELURUH PENGADAAN</span><h2>Temukan barang. Langsung tahu PR-nya.</h2><p>Telusuri PPBJ, rincian SP/SPPH, dan isi scan/foto di arsip dari sini.</p></div><span class="pus-pill">PPBJ · SP · SPPH · Arsip</span></header>
    <form data-pus-form>
        <label class="pus-field"><span>Nama barang, nomor, atau isi dokumen</span><input data-pus-query type="search" maxlength="255" autocomplete="off" value="{{ request('search', '') }}" placeholder="Contoh: kursi ergonomis, printer, alat ukur…" required></label>
        <label class="pus-scope"><span>Ditemukan di</span><select data-pus-scope><option value="all">Semua sumber</option><option value="ppbj">Management PPBJ</option><option value="sp">Rincian SP</option><option value="spph">Rincian SPPH</option><option value="archive">Lampiran arsip / OCR</option></select></label>
        <button type="submit" class="pus-primary">Cari di semua PR</button><button type="button" data-pus-reset class="pus-secondary">Reset</button>
    </form>
    <p class="pus-note">Pencarian dijalankan setelah Enter atau klik Cari. Satu dokumen dapat terkait beberapa PR; lihat sumbernya untuk memastikan rincian barang.</p>
    <p data-pus-status role="status" aria-live="polite" class="pus-status">Hasil lintas menu akan muncul di sini. Scan/foto lama diproses bertahap di latar belakang.</p>
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
