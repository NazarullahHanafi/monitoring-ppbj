<dialog id="vendorDocuments" class="vd-dialog" aria-labelledby="vdTitle">
    <div class="vd-header">
        <div><p class="vd-eyebrow">DOKUMEN VENDOR · ONEDRIVE</p><h2 id="vdTitle">Lampiran vendor</h2><p data-vd-name></p></div>
        <button type="button" data-vd-close aria-label="Tutup lampiran vendor">✕</button>
    </div>
    <div class="vd-body">
        <p class="vd-note">Berkas asli disimpan di OneDrive. Nama, nomor, dan teks pencarian disimpan di sistem. Akses hanya untuk pengguna berwenang.</p>
        <p data-vd-status role="status" aria-live="polite"></p>
        <div class="vd-toolbar"><button type="button" data-vd-new @disabled($vendorDocumentsReadOnly)>＋ Tambah lampiran</button><button type="button" data-vd-refresh>Muat ulang daftar</button><button type="button" data-vd-bundle>Unduh semua · ZIP</button></div>
        <div data-vd-bundle-panel class="vd-diagnosis" hidden><p data-vd-bundle-status role="status" aria-live="polite"></p><a data-vd-bundle-link hidden>Unduh ZIP siap</a></div>
        <p data-vd-transfer-status class="vd-note" role="status" hidden></p>
        <form data-vd-editor hidden novalidate>
            <h3 data-vd-editor-title>Tambah lampiran</h3>
            <div class="vd-steps" aria-label="Tahapan lampiran"><span>01 · Pilih dokumen</span><span>02 · Periksa teks</span><span>03 · Simpan aman</span></div>
            <div class="vd-grid">
                <label>Jenis dokumen<select name="type" required>@foreach(\App\Models\VendorDocument::TYPES as $value => $label)<option value="{{ $value }}">{{ $label }}</option>@endforeach</select></label>
                <label>Judul dokumen<input name="title" required maxlength="160" placeholder="Misalnya: NPWP perusahaan"></label>
                <label>Nomor dokumen <span>(opsional)</span><input name="document_number" maxlength="160" autocomplete="off"></label>
                <label>Berlaku sampai <span>(opsional)</span><input name="expires_at" type="date"></label>
            </div>
            <label data-vd-file-wrap class="vd-upload-zone">Pilih atau letakkan dokumen di sini<input name="file" type="file" accept="{{ \App\Support\ProcurementUploadFormats::accept() }}"><small>PDF · Word · Excel · PowerPoint · OpenDocument · CSV/TXT · gambar. Maksimal {{ round(($vendorDocumentMaxBytes ?? 10485760) / 1048576, 1) }} MB per berkas.</small><span data-vd-file-info>Belum ada berkas dipilih.</span></label>
            <div class="vd-toolbar"><button type="button" data-vd-read>Baca isi dokumen</button><button type="button" data-vd-cancel-read hidden>Batalkan pembacaan</button></div>
            <label>Teks untuk pencarian <span>(opsional)</span><textarea name="search_text" rows="6" maxlength="200000" placeholder="Gunakan Baca teks, lalu periksa hasilnya. Anda juga dapat mengetik atau memperbaiki teks di sini."></textarea></label>
            <p class="vd-note">PDF/foto dibaca di perangkat; Office modern dan CSV/TXT dibaca secara terbatas di server sendiri, tanpa layanan OCR eksternal. DOC/XLS/PPT lama, RTF, dan TIFF dapat disimpan dengan teks manual. Metadata tetap dapat dicari meskipun teks belum dilengkapi.</p>
            <label class="vd-check"><input name="text_confirmed" type="checkbox"> Saya telah memeriksa teks yang akan masuk pencarian.</label>
            <div class="vd-toolbar"><button type="submit" class="vd-primary" data-vd-save>Simpan ke OneDrive</button><button type="button" data-vd-cancel-editor>Batal</button></div>
        </form>
        <form data-vd-filter class="vd-toolbar vd-filter" novalidate>
            <label>Cari lampiran<input name="q" maxlength="160" placeholder="Jenis, judul, nomor, atau teks dokumen"></label>
            <label>Jenis<select name="type"><option value="">Semua jenis</option>@foreach(\App\Models\VendorDocument::TYPES as $value => $label)<option value="{{ $value }}">{{ $label }}</option>@endforeach</select></label>
            <label>Perlu perhatian<select name="attention"><option value="">Semua dokumen</option><option value="metadata">Teks belum dilengkapi</option><option value="expiring">Habis berlaku / ≤ 30 hari</option><option value="unfinished">Transfer belum selesai</option></select></label>
            <button type="submit">Cari</button><button type="button" data-vd-reset>Reset</button>
        </form>
        <div data-vd-diagnosis class="vd-diagnosis" hidden></div>
        <div data-vd-list class="vd-list"></div>
        <div class="vd-toolbar"><button type="button" data-vd-prev hidden>Sebelumnya</button><span data-vd-page></span><button type="button" data-vd-next hidden>Berikutnya</button></div>
    </div>
</dialog>
