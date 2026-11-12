<dialog id="vendorDocuments" class="vd-dialog" aria-labelledby="vdTitle">
    <div class="vd-header">
        <div><p class="vd-eyebrow">DOKUMEN VENDOR · ONEDRIVE</p><h2 id="vdTitle">Lampiran vendor</h2><p data-vd-name></p></div>
        <button type="button" data-vd-close aria-label="Tutup lampiran vendor">✕</button>
    </div>
    <div class="vd-body">
        <p class="vd-note">Berkas asli disimpan di OneDrive. Nama, nomor, dan teks pencarian disimpan di sistem. Akses hanya untuk pengguna berwenang.</p>
        <p data-vd-status role="status" aria-live="polite"></p>
        <div class="vd-toolbar"><button type="button" data-vd-new @disabled($vendorDocumentsReadOnly)>＋ Tambah lampiran</button><button type="button" data-vd-refresh>Muat ulang daftar</button></div>
        <form data-vd-editor hidden>
            <h3 data-vd-editor-title>Tambah lampiran</h3>
            <div class="vd-grid">
                <label>Jenis dokumen<select name="type" required>@foreach(\App\Models\VendorDocument::TYPES as $value => $label)<option value="{{ $value }}">{{ $label }}</option>@endforeach</select></label>
                <label>Judul dokumen<input name="title" required maxlength="160" placeholder="Misalnya: NPWP perusahaan"></label>
                <label>Nomor dokumen <span>(opsional)</span><input name="document_number" maxlength="160" autocomplete="off"></label>
                <label>Berlaku sampai <span>(opsional)</span><input name="expires_at" type="date"></label>
            </div>
            <label data-vd-file-wrap>Berkas PDF, JPG, atau PNG<input name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"><small>Maksimal {{ round(($vendorDocumentMaxBytes ?? 10485760) / 1048576, 1) }} MB per berkas, mengikuti batas server. Pembaca PDF mendukung hingga 30 halaman.</small></label>
            <div class="vd-toolbar"><button type="button" data-vd-read>Baca teks PDF / scan</button><button type="button" data-vd-cancel-read hidden>Batalkan pembacaan</button></div>
            <label>Teks untuk pencarian <span>(opsional)</span><textarea name="search_text" rows="6" maxlength="200000" placeholder="Gunakan Baca teks, lalu periksa hasilnya. Anda juga dapat mengetik atau memperbaiki teks di sini."></textarea></label>
            <p class="vd-note">Pembacaan berlangsung di perangkat Anda. Scan buram atau tulisan tangan mungkin perlu dikoreksi. Berkas tetap bisa disimpan tanpa teks; jenis, judul, nama berkas, dan nomor tetap dapat dicari.</p>
            <label class="vd-check"><input name="text_confirmed" type="checkbox"> Saya telah memeriksa teks yang akan masuk pencarian.</label>
            <div class="vd-toolbar"><button type="submit" class="vd-primary" data-vd-save>Simpan ke OneDrive</button><button type="button" data-vd-cancel-editor>Batal</button></div>
        </form>
        <form data-vd-filter class="vd-toolbar vd-filter">
            <label>Cari lampiran<input name="q" maxlength="160" placeholder="Jenis, judul, nomor, atau teks dokumen"></label>
            <label>Jenis<select name="type"><option value="">Semua jenis</option>@foreach(\App\Models\VendorDocument::TYPES as $value => $label)<option value="{{ $value }}">{{ $label }}</option>@endforeach</select></label>
            <button type="submit">Cari</button><button type="button" data-vd-reset>Reset</button>
        </form>
        <div data-vd-list class="vd-list"></div>
        <div class="vd-toolbar"><button type="button" data-vd-prev hidden>Sebelumnya</button><span data-vd-page></span><button type="button" data-vd-next hidden>Berikutnya</button></div>
    </div>
</dialog>
