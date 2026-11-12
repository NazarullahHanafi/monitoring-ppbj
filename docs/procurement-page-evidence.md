# Penelusur bukti halaman

Tersedia pada hasil lampiran di pencarian pengadaan dan katalog arsip Super Admin Umum. Panel dimuat hanya setelah pengguna menekan **Telusuri**. Mengubah isian tidak mengirim permintaan; **Lanjutkan penelusuran** tetap memakai kata dan mode terakhir yang diterapkan.

- **Semua kata di halaman yang sama**: seluruh token harus muncul pada satu halaman/bagian. Tidak memperluas awalan atau sinonim.
- **Frasa tepat berurutan**: urutan dan pengulangan kata dipertahankan. Huruf besar, aksen, spasi dan tanda baca umum disetarakan; penghubung di antara angka seperti `10.5`, `1/2`, dan `2025-2026` dipertahankan sebagai satu token.
- Nomor bagian Office merupakan unit ekstraksi, bukan nomor halaman cetak. Tautan Office tidak menambahkan fragmen halaman PDF.
- Jumlah bagian yang ditelusuri dibedakan dari jumlah halaman/bagian yang sudah tersimpan. Halaman kosong yang sudah dikonfirmasi pemeriksa tidak dianggap gagal. Teks OCR bermasalah tetap diberi catatan; file asli tidak diubah.

## API dan beban kerja

`GET /procurement/search/files/{source}/evidence?q=...&mode=words|phrase&after=0`

Cursor setelah halaman nol wajib membawa `version`. Versi terikat pada file, bacaan, kata, dan mode yang diterapkan; mengganti kata atau mode harus memulai kembali dari awal.

Pakai `after` dan `version` dari respons untuk kelompok berikutnya. Perubahan file, progres bacaan, atau pemeriksaan manusia dapat menghasilkan `409`; mulai lagi dengan menghilangkan cursor/version. Endpoint memerlukan autentikasi dan departemen Umum. Pengguna biasa memerlukan relasi PR yang masih ada; hanya Super Admin Umum yang dapat menelusuri file tanpa relasi PR. File nonaktif, metadata kedaluwarsa, serta lampiran lokal dengan dokumen yang telah dihapus tidak ditampilkan. Akses baca tetap tersedia dalam mode hanya-baca.

Satu permintaan membaca metadata maksimal 21 halaman dari satu file, lalu teks maksimal 20 halaman dengan anggaran sekitar 2 MiB. Satu halaman besar yang masih dalam batas pembaca dapat diproses sendiri. Teks lama yang melebihi empat kali batas karakter halaman ditandai untuk dibuka dari sumber asli dan tidak dimuat tanpa batas. Respons hanya berisi cuplikan, catatan, dan tautan gateway; tidak berisi path privat atau URL arsip bertanda tangan.

Cursor menggunakan primary key `(source_id, page)`. Tidak ada pencarian `LIKE` pada seluruh badan OCR, proses OCR sinkron, penulisan indeks dari permintaan pencarian, atau migrasi baru. Semua respons privat dan `no-store`; tidak mengirim arsip ke layanan eksternal. Pemuatan dapat dibatalkan dan dibatalkan otomatis saat hasil pencarian direset/diganti.

## Pemeriksaan

- `php artisan test --filter=ProcurementPageEvidenceTest`
- `node --test tests/JavaScript/procurement-unified-search.test.cjs`
- `node tests/Browser/procurement-page-evidence.cjs`

Saat deployment, publikasikan controller/service/route sebelum JavaScript baru. Sinkronkan kedua aset pencarian ke webroot yang sebenarnya, lalu perbarui cache route/view. Pekerja OCR tetap berjalan menggunakan antrean dan kunci yang sudah ada.
