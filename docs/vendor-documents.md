# Lampiran vendor di OneDrive

Menu **Master Vendor → Lampiran** mendukung PDF/JPG/PNG sampai 10 MiB per berkas (formulir menyesuaikan batas PHP bila lebih kecil): NPWP, NIB, akta, KK, KTP, SIUP, SPPKP, izin usaha, sertifikat, rekening bank, dan kategori lainnya. Vendor tidak dapat dihapus selama mempunyai lampiran (termasuk transfer yang belum selesai); nonaktifkan vendor atau hapus lampiran secara eksplisit.

## Penyimpanan dan pemulihan

- Berkas asli berada di OneDrive yang sudah terhubung pada aplikasi arsip, di `SIMONPR-Vendor/YYYY/MM/<UUID>.<ext>`. Tidak membuat dokumen PR palsu dan tidak mengubah data arsip.
- Proses anak CLI memakai konfigurasi/key milik aplikasi arsip, dengan lingkungan terisolasi. Kredensial, item ID, cloud path, dan URL OneDrive tidak dikirim ke browser.
- Hosting hanya menyimpan metadata, teks yang dikonfirmasi, indeks kata, dan catatan aktivitas. Transfer memakai berkas sementara privat, dihapus setelah selesai/gagal; pembersihan setiap jam menghapus transfer tertinggal berumur lebih dari dua jam. Metadata/indeks tetap memakai kapasitas database.
- Simpan reservasi UUID sebelum transfer. Percobaan ulang dengan UUID, vendor, pengunggah, dan checksum yang sama menggunakan lokasi yang sama. Isi berbeda ditolak. Status `ready` hanya setelah byte hasil unduh OneDrive cocok SHA-256 dan ukuran unggahan.
- Jika respons unggah terputus, muat ulang daftar atau coba dengan berkas yang sama. Bila ternyata sudah tersimpan, formulir beralih ke pemeriksaan dengan perubahan pengguna tetap tersedia. Tidak mengulang otomatis permintaan tulis.
- Penghapusan cloud harus berhasil/404 sebelum metadata dihapus. Kegagalan mempertahankan status `deleting` untuk dicoba lagi. Penghapusan di OneDrive mengikuti recycle bin/retensi akun Microsoft, bukan penghapusan permanen dari seluruh cadangan.
- Maksimal dua proses transfer cloud fitur vendor sekaligus, tanpa antrean blocking; tiap proses dibatasi 300 detik dan berkas 10 MiB. Batas permintaan terpisah untuk daftar, detail, unggah, unduh, ubah, dan hapus. Membuka tabel atau mencari dokumen tidak menghubungi OneDrive.

## Pencarian dan pembacaan scan

Filter manual utama vendor mencakup data vendor serta dokumen `ready`. Dialog memiliki filter manual kata/jenis dan pagination 20 dokumen. Indeks kata memakai awalan kata dan semua kata kueri harus ada dalam dokumen yang sama; tidak menjalankan OCR atau memindai isi berkas ketika mencari. Daftar tidak mengambil keseluruhan kolom teks.

**Baca teks PDF / scan** berjalan di browser memakai aset PDF.js/Tesseract lokal Indonesia+Inggris. Mendukung PDF sampai 30 halaman dan foto sampai 16 megapiksel; kanvas OCR dibatasi sekitar 3,5 megapiksel, satu pembaca aktif, dan ada pembatalan/batas waktu. Berkas asli lebih panjang tetap bisa diunggah dengan metadata; untuk pembacaan, pisahkan menjadi lampiran lebih kecil. Pembacaan tidak otomatis dan tidak dikirim ke layanan OCR pihak ketiga.

Periksa/koreksi teks lalu centang konfirmasi sebelum menyimpan. Metadata langsung dapat dicari setelah unggahan terverifikasi; isi scan dapat dicari setelah teks disimpan. OCR tidak menjamin semua teks benar, khususnya foto buram atau tulisan tangan. Teks yang diketik tidak mengubah berkas asli.

## Akses dan perubahan bersamaan

Semua endpoint memerlukan login aktif dan departemen Umum, mengikuti akses menu vendor. Viewer/global read-only hanya membaca dan mengunduh. UUID selalu diperiksa terhadap vendor induk. Unduhan melewati aplikasi dengan pemeriksaan checksum, `private, no-store`, attachment disposition, dan `nosniff`; tidak membuat share link publik. MIME aktual diperiksa terpisah dari ekstensi. Nama/isi ditampilkan sebagai teks, bukan HTML.

Perubahan metadata/teks dan penghapusan memakai versi positif dari server. Kunci dokumen bersama mencegah benturan unggah, ubah, dan hapus. Log aktivitas memuat actor, vendor ID, document UUID, jenis, dan versi, tanpa teks/nomor dokumen atau token. Pencarian mengikuti hak akses menu vendor, bukan fitur pencarian dokumen publik.

## Validasi

- `php artisan test --filter='VendorDocumentsTest|VendorFiltersTest'`: hak akses, validasi berkas, retry/checksum, indeks, optimistic concurrency, isolasi batas permintaan, gagal cloud, unduh/hapus, dan pagination.
- `php tests/Browser/render-vendor-dialog.php`, lalu `node tests/Browser/vendor-documents.cjs`: tampilan desktop/ponsel dan mode gelap, XSS, filter manual, respons invalid, draft saat konflik, retry UUID, viewer, PDF/foto OCR tanpa request eksternal.
- `node tests/Browser/procurement-details.cjs`: regresi pembaca PDF native/scan dan konfirmasi lampiran SP/SPPH.
- Migrasi aditif `2026_11_12_130000_create_vendor_documents_tables`; kode lama tidak bergantung pada kedua tabel baru. Rollback aplikasi dapat mempertahankan tabel dan berkas cloud agar data pengguna tidak hilang.

Rujukan protokol: [upload Microsoft Graph](https://learn.microsoft.com/graph/api/driveitem-put-content), [delete Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/driveitem-delete?view=graph-rest-1.0).

## Perbaikan runtime web (12 November 2026)

Pada LiteSpeed, `PHP_BINARY` adalah `lsphp`, bukan executable PHP CLI. Memakainya untuk proses anak membuat adapter CLI berhenti; pengujian dari SSH saja tidak mereproduksi masalah ini. `App\Support\PhpCli` memilih kandidat CLI yang sesuai versi PHP dan memeriksa SAPI proses anak sebelum menjalankan adapter. `PROCUREMENT_PHP_CLI` dapat diisi path absolut CLI untuk konfigurasi khusus; konfigurasi yang salah tidak diam-diam diganti dengan executable web. Pemilihan yang sama dipakai adapter pencarian arsip agar jalur web konsisten.

Kegagalan memakai kode aman yang dibatasi (`runtime`, `configuration`, `busy`, `timeout`, `authentication`, `integrity`, `cloud`) dan pesan yang menjelaskan tindakan pengguna/admin. Catatan kegagalan hanya memuat operasi, document UUID, kategori, dan kelas exception; tidak menyertakan isi exception atau output proses yang mungkin berisi rahasia.

Validasi tambahan mencakup kandidat LiteSpeed, konfigurasi CLI invalid, pelepasan slot saat gagal, dan pesan runtime. Pengujian HTTP multipart di runtime LiteSpeed berhasil mengunggah PDF sintetis (201), mengunduh dan mencocokkan SHA-256, lalu menghapus berkas cloud. Data uji di database di-rollback dan pemeriksaan sementara dihapus.
