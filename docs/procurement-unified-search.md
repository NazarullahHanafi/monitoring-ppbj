# Pencarian terpadu barang, PR, dan lampiran arsip

Panel yang sama tersedia pada Management PPBJ, Penomoran SP, dan Penomoran SPPH. Pencarian dijalankan melalui Enter/tombol Cari; mengetik tidak mengirim permintaan. Filter pencarian tabel juga memakai indeks bersama, sedangkan aturan PIC, tanggal, nominal, dan mode Oracle tetap berlaku.

Hasil dikelompokkan per PR, dilengkapi sumber, kutipan, dan tautan dokumen. Satu dokumen gabungan dapat terkait beberapa PR; hasil ini tidak menyatakan alokasi barang ke PR tertentu. Kata dicocokkan lintas kolom dalam satu sumber, tanpa bergantung pada urutan, menggunakan awalan kata. Tidak ada pencarian samar yang menebak nomor PR.

## Pemrosesan scan/foto

- PDF.js 6.5.438 membaca PDF. Halaman dengan sedikit teks atau gambar scan diteruskan ke Tesseract.js 7.0.0, bahasa Indonesia dan Inggris, dengan rotasi otomatis.
- Seluruh proses berjalan pada hosting sendiri, tanpa layanan OCR eksternal. OneDrive tetap menjadi sumber berkas arsip yang memang sudah tersimpan di sana.
- Berkas lama dan baru ditemukan melalui adapter CLI privat. Adapter memuat konfigurasi/database aplikasi arsip sendiri, dengan variabel rahasia aplikasi induk dibuang dari lingkungan proses anak. Aplikasi arsip tidak dimodifikasi.
- OCR memproses dua halaman per giliran dan menyimpan kursor. Hasil halaman yang sudah dibaca langsung bisa dicari. Halaman kosong/tidak terbaca, format yang tidak didukung, batas teks, dan kegagalan tidak dilaporkan sebagai pembacaan sempurna.
- File identik dapat memakai ulang hasil berdasarkan SHA-256. Versi yang diganti menghapus indeks lama; hasil pekerja dengan fingerprint/kursor lama ditolak.
- Hubungan PR berasal dari metadata/pivot bisnis. Jika metadata tidak memiliki PR, nomor PR yang benar-benar ada dapat dikenali dari teks scan. Hubungan tersebut diberi label untuk diperiksa; sistem tidak membuat PR atau menebak nomor yang mirip.
- Isi lampiran rincian SP/SPPH yang sudah diperiksa tetap memakai aturan pemeriksaan sebelumnya. Teks draf yang belum diperiksa tidak dimasukkan sebagai rincian bisnis yang disetujui.

## Batas beban dan akses

- Pencarian membaca indeks token berindeks B-tree, bukan membuka PDF, menjalankan OCR, atau memanggil API arsip dalam request pencarian.
- Maksimal 10 PR dan empat kutipan per PR. Query sumber dibatasi per PR agar satu paket besar tidak menghabiskan jatah hasil PR lain. Kutipan diambil dengan substring SQL yang terbatas.
- Satu pekerja memakai kunci lintas proses, prioritas CPU `nice -n 15`, dan berhenti memulai giliran baru setelah anggaran 15 detik setiap menit. Satu giliran memiliki timeout 65 detik; tidak ada pekerja OCR paralel.
- Batas berkas 30 MiB, raster 4 juta piksel, foto sumber 25 juta piksel, teks 400.000 karakter, heap Node 384 MiB, dan pengawas RSS Linux 448 MiB. Cache sementara privat dibatasi delapan berkas/100 MiB.
- Kegagalan dicoba paling banyak tiga kali dengan jeda bertingkat. Status dan kemajuan ditampilkan agar dokumen yang belum selesai tidak dianggap sudah seluruhnya bisa dicari.
- Hanya akun aktif Department Umum yang dapat mencari/membuka hasil, termasuk viewer yang memang memiliki akses baca. Akun operasional dan pengunjung ditolak. Tidak ada endpoint web untuk mengubah indeks.
- URL cloud/signature tidak dikirim dalam JSON hasil. Tautan file melewati gateway autentikasi, whitelist origin arsip, fingerprint, hubungan PR, dan metadata yang masih segar. Konten selain PDF/gambar aman/teks biasa dipaksa menjadi unduhan.
- Metadata arsip yang tidak diverifikasi selama 15 menit disembunyikan. Dokumen yang dimusnahkan/dihapus dinonaktifkan; gateway arsip juga memeriksa kondisi file saat dibuka.

## Pengoperasian

Runtime privat memerlukan Node 24+, dependensi terkunci pada `tools/procurement-ocr/package-lock.json`, serta model `ind.traineddata.gz` dan `eng.traineddata.gz` lokal. Paket tidak dipasang pada webroot.

```dotenv
PROCUREMENT_SEARCH_ENABLED=true
PROCUREMENT_SEARCH_ARCHIVE_ROOT=/path/to/archive-laravel
PROCUREMENT_OCR_NODE=/private/node/bin/node
PROCUREMENT_OCR_LANG_PATH=/private/ocr/languages
```

```sh
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
nice -n 15 php artisan procurement:search-index --sync-only --limit=200
nice -n 15 php artisan procurement:search-index --ocr-only --budget=15
```

Scheduler aplikasi menjalankan pekerja tiap menit melalui cron `schedule:run` yang sudah tersedia. Indeks/hasil OCR dapat dibangun ulang tanpa mengubah dokumen, angka pengadaan, atau file arsip aslinya. Berkas sumber tidak dihapus oleh pengindeks.

## Validasi

- Tes fitur mencakup pencarian lintas tiga tabel, ekspor, PR gabungan/legacy, teks yang sudah diperiksa, pencabutan sumber, kursor/fingerprint stale, paginasi, query baca terbatas, akses viewer/operasional/nonaktif, SSRF, dan unduhan konten aktif.
- Tes JavaScript mencakup pencarian manual, respons terlambat, reset, teks tidak tepercaya, paginasi, serta konteks hologram.
- Uji OCR menggunakan foto sintetis dan PDF tiga halaman yang benar-benar hanya berisi gambar, tanpa teks tertanam. Pembacaan lanjutan ketiga halaman diverifikasi secara lokal dan pada runtime Linux hosting.
- Pada smoke test hosting, satu proses memakai sekitar 271–372 MiB RSS. Endpoint `/up` merespons sekitar 0,094–0,136 detik sebelum/selama uji sintetis. Ini pengukuran ringan, bukan jaminan latensi seluruh situs untuk setiap beban.
- Audit npm pada dependensi OCR tidak melaporkan advisori saat persiapan rilis 10 November 2026.

Referensi primer: [API Tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/api.md), [contoh PDF.js pada Node](https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.mjs).

## Pembaruan 11 November 2026

Pembacaan dokumen memakai kombinasi teks asli PDF, analisis penempatan gambar pada halaman, dan OCR adaptif. Gambar besar pada PDF campuran tetap dibaca walaupun halaman sudah memiliki banyak teks digital. Teks asli dipertahankan dan baris identik digabungkan. Logo kecil tidak otomatis memicu OCR tambahan.

Pada bacaan sulit, pekerja dapat mencoba peningkatan kontras grayscale satu kali per giliran, jika percobaan dimulai dalam 20 detik pertama. Hasil pengganti dipakai hanya jika skor bacaan meningkat atau hasil pertama kosong. Halaman kosong tidak dipaksa menjadi hasil sukses. Batas memori/proses sebelumnya tetap berlaku; gambar asli tidak diubah.

Kolom `reading_engine` dan `reading_confidence` menyimpan metode dan skor terendah sepanjang giliran dokumen. Skor adalah perkiraan mesin, bukan persentase akurasi bisnis. Bacaan di bawah 55 ditandai perlu diperiksa; nomor PR tidak disimpulkan dari giliran dengan skor rendah. Bacaan lama tanpa skor tetap tersedia, tanpa membuat skor buatan atau mengulang OCR semua arsip. Pembaruan metadata mempertahankan kursor/hasil, sementara pergantian fingerprint mengosongkan kualitas dan teks lama.

Padanan barang Indonesia/Inggris terkurasi tersedia melalui `config/procurement_search.php`, misalnya kursi/chair dan kantor/office. Setiap kata tetap wajib cocok dalam satu sumber, tetapi boleh menggunakan padanannya. Perluasan dibatasi dan tetap menggunakan indeks awalan kata. Tidak ada layanan AI eksternal, pemindahan dokumen, atau pencocokan samar nomor PR/nominal. Padanan yang digunakan ditampilkan pada hasil. Ini pencarian istilah terkurasi, bukan pemahaman bebas seluruh bahasa.

Query kutipan memakai satu `ROW_NUMBER()` untuk seluruh PR yang terlihat, menggantikan pengulangan persilangan token pada sepuluh cabang UNION. Batas lima sumber per PR dan empat kutipan tetap dipertahankan. Memerlukan MySQL 8+, MariaDB 10.2+, atau SQLite dengan window functions; hosting diverifikasi MariaDB 10.6.28. Metadata yang dikirim dari DB dibatasi 320 karakter per kutipan. Tidak ada cache hasil lintas pengguna yang berpotensi mempertahankan izin lama.

Sinkronisasi mengambil peta nomor PR dan dokumen gabungan per batch. Term dan hubungan bisnis yang sama tidak ditulis ulang pada setiap penyegaran. Token dari teks yang melewati batas retensi tidak dimasukkan ke indeks. Pengenalan referensi PR memerlukan batas huruf/angka, sehingga `PR-2026-0012` tidak dianggap cocok dengan `XPR-2026-0012`, `PR-2026-00123`, atau `PR-2026-0012A`.

Antarmuka menampilkan ringkasan PR, durasi pencarian di server, metode pembacaan, dan peringatan bacaan kurang jelas. Tidak ada polling tambahan. Pengiriman identik yang masih berjalan digabungkan, respons terlambat diabaikan, dan pencarian dihentikan setelah 20 detik dengan opsi mencoba ulang. Kontrol tetap dapat dipakai setelah respons HTML/error atau koneksi gagal. Kartu di luar viewport memakai `content-visibility` dengan fallback tampilan normal.

Sebelum pembaruan, sampel hosting mencatat 2.537 halaman terbaca dari 20.725 halaman yang sudah diketahui, sekitar 3,16 MB teks indeks, dan pencarian hangat empat istilah sekitar 17–50 ms. Ini sampel singkat; bukan jaminan seluruh situs bebas lag. Arsip yang belum selesai tetap diproses oleh satu pekerja pada jadwal terbatas. Tidak dilakukan penghapusan arsip, perubahan dokumen bisnis, atau pemaksaan tutorial.

Audit dependensi juga menemukan enam advisori produksi pada Symfony HTTP Foundation, HTTP Kernel, dan Routing, serta satu advisori pengembangan pada YAML. Empat paket diperbarui ke 7.4.23 melalui perubahan minimum pada lockfile; versi mayor Laravel dipertahankan. Cache route harus dibangun ulang setelah pemasangan patch Routing. Referensi: [advisori resmi Routing](https://symfony.com/cve-2026-118516), [advisori resmi HTTP Kernel](https://github.com/symfony/symfony/security/advisories/GHSA-wg5q-m2ww-f3c9), dan [advisori resmi YAML](https://github.com/symfony/symfony/security/advisories/GHSA-hwfg-qwvh-2wfx).
