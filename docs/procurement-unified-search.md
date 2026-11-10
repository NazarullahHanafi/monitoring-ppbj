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
