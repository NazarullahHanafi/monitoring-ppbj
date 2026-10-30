# Pencarian barang/jasa SP dan SPPH

- Pencarian daftar dan ekspor memakai `ProcurementDocumentSearch` yang sama.
- Sumber: nomor SP/SPPH, nomor PR, vendor (termasuk kandidat SPPH), deskripsi dokumen, rincian `nama_barang` item, serta nomor/uraian semua PPBJ terkait. Referensi PR lama tanpa pivot juga didukung.
- Kata `kursi` dapat menemukan SP/SPPH berjudul umum seperti “Perlengkapan kantor” jika item atau uraian PR-nya berisi kursi. Nomor dokumen dan PR tetap ditampilkan pada hasil. Bila rincian item cocok, tampil satu cuplikan teks maksimal 180 karakter.
- Beberapa kata dikombinasikan AND, masing-masing dapat cocok di sumber yang berbeda. `rapat kursi` dapat menemukan item “Kursi rapat”. Tidak menambahkan AI, sinonim otomatis, OCR atau pencarian isi berkas lampiran.
- Tetap manual lewat Enter/Terapkan Filter. Tidak ada request pencarian saat mengetik atau polling baru. Filter PIC/vendor/tanggal, mode Oracle, dan pengecualian dokumen Sampah tetap berlaku.
- Pencarian memakai bound parameters dan wildcard `%`/`_` yang di-escape sebagai teks literal. Input maksimal 160 karakter; maksimal enam kelompok kondisi (sisa kata tetap menjadi frasa terakhir, tidak dibuang).
- Pencarian SQL memakai EXISTS, bukan memuat semua dokumen/item ke PHP. Pagination tetap 10 dokumen. Cuplikan hanya memerlukan satu query agregat untuk dokumen pada halaman aktif, dan tidak dijalankan jika pencarian kosong. SP export eager-load items agar tidak N+1.
- FK item dan pivot serta nomor PR telah berindeks. Pencarian substring pada teks bukan full-text index; pertumbuhan dataset tetap perlu dimonitor. Tidak mengklaim semua pencarian memakai indeks teks.
- Kolom nomor PR pada tabel lama production memakai collation berbeda. Helper mengambil metadata collation PR sekali (cache 24 jam), lalu mengonversi nilai luar, bukan kolom PR berindeks. Tidak mengubah schema, data, atau collation tabel.

## Pengujian

`ProcurementDocumentSearchTest`: nama item bertag HTML, kata terbalik, PR gabungan kedua, referensi lama, filter/mode/Sampah, kesamaan ekspor dan daftar, wildcard literal, injeksi SQL, kueri cuplikan terbatas, serta input invalid.

Production QA menggunakan query baca-saja dan filter browser; tidak membuat/mengubah transaksi atau mengunduh lampiran bisnis untuk pengujian.

Hasil: 341 tes aplikasi dan 25 tes JavaScript lulus; delapan tes pencarian (54 assertions) mencakup perapian cuplikan rich-text dan filter `0` yang tetap menghentikan polling daftar. Pencarian `kursi` pada database production menemukan enam SP dan enam SPPH. Sampel query hangat: SP sekitar 7 ms, SPPH sekitar 12–13 ms; ini waktu query contoh, bukan jaminan waktu muat halaman/jaringan. Kondisi cold-start pada sampel sekitar 70–86 ms. MySQL dapat memilih materialisasi/full scan pada tabel kecil untuk pencarian substring; indeks relasi tetap tersedia.

Browser production: Enter pada SP dan Terapkan Filter pada SPPH berhasil, cuplikan dan nomor PR/dokumen muncul, serta tema terang/gelap diperiksa. Mengetik tidak menavigasi sebelum diterapkan. Pemisah paragraf/baris rich-text dipertahankan sebagai spasi pada cuplikan agar kata tidak menempel.
