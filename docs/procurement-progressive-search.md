# Pencarian bertahap dan hitung total sesuai kebutuhan

Widget pencarian terpadu pada Management PPBJ, SP, dan SPPH memuat maksimal 10 PR terlebih dahulu. Tombol **Berikutnya** tetap tersedia jika ada hasil lanjutan. **Hitung seluruh PR** menghitung total hanya atas permintaan pengguna, memakai pencarian dan filter yang terakhir diterapkan, termasuk ketika kolom sudah berisi draf baru.

## Jalur baca

- `GET /procurement/search` mempertahankan autentikasi, departemen Umum, pembatasan request, dan `Cache-Control: private, no-store`.
- `totals=deferred` memakai `simplePaginate`: mengambil maksimal 11 baris PR untuk mendeteksi halaman berikutnya, lalu memperkaya maksimal 10 kartu. `total` dan `last_page` bernilai `null`, bukan nol atau perkiraan. `has_more` menentukan navigasi.
- `totals=only` mengembalikan `total`, rencana kata, dan waktu proses. Jalur ini tidak menghitung skor relevansi, memuat provenance/buyer/vendor, mengambil cuplikan, atau membaca isi halaman OCR. Filter buyer/vendor/pembuat TOR tetap diterapkan pada query keanggotaan PR.
- Tanpa parameter, API mempertahankan total pasti dan format paginasi sebelumnya. Perhitungan total juga dipercepat dengan semijoin ke sumber yang cocok; ranking tidak lagi menjadi bagian dari query hitung. Permintaan bukti per PR (`pr`/`after`) mempertahankan perilaku sebelumnya.
- Hitungan memakai PR unik yang masih ada, sumber aktif yang masih berlaku, relasi lokal yang hidup, serta semua filter/mode kata yang sama dengan hasil. Beberapa lampiran dari satu PR tidak menggandakan total.
- Hasil tidak disimpan dalam cache baru. Penonaktifan lampiran, perubahan relasi, dan pembaruan indeks diperiksa kembali setiap request. Total adalah keadaan saat dihitung; data yang berubah dapat menggeser hasil/paginasi antarpermintaan.

Tidak ada permintaan otomatis ketika mengetik, membuka halaman, atau membuka filter. Hitungan mencegah klik ganda, dibatalkan ketika pencarian diganti/reset, dan memiliki batas tunggu 20 detik yang mencakup pembacaan JSON. Respons lama tidak boleh mengganti hasil baru. Hitungan gagal bisa dicoba lagi tanpa menghapus kartu hasil. Tidak ada OCR, layanan eksternal, migrasi, ataupun penulisan data bisnis pada alur ini.

## Validasi dan pengukuran

- Uji PHP memeriksa kesamaan urutan hasil, batas 10/11 PR, halaman kosong, scope, mode lintas dokumen, padanan/kata utuh, nomor persis, filter, deduplikasi PR, penghapusan dan kedaluwarsa sumber, izin akses, serta jalur hitung tanpa ranking/teks OCR.
- Uji JavaScript memeriksa navigasi tanpa total, hitung manual, draf filter yang terpisah, klik ganda, pembatalan, respons usang, timeout, dan respons tidak valid.
- `tests/Browser/procurement-progressive-search.cjs` memeriksa desktop terang dan ponsel gelap memakai komponen Blade dan aset sebenarnya, dengan respons jaringan fixture. Ini pengujian UI, bukan pengujian beban produksi.
- Sampel baca di server 12 November 2026: 3 kata (`kursi`, `plastik`, `pengadaan`), masing-masing 3 pengulangan. Sebelum perubahan: median 73,98 ms, 96 SELECT termasuk 9 query COUNT. Versi baru bertahap: median 57,00 ms, 87 SELECT dan nol query COUNT; hitung saja: median 4,21 ms. Versi baru dengan total langsung: median 61,97 ms.

Angka tersebut mengukur waktu aplikasi server dengan indeks yang ada dan batas waktu SQL per statement 3 detik; belum mencakup jaringan, tidak mewakili beban banyak pengguna sekaligus, dan bukan jaminan waktu untuk semua kata. Maksimal hitungan 35,09 ms dan hasil bertahap 161,02 ms pada pengukuran ini. Pengolahan seluruh arsip tetap berjalan bertahap: hasil lengkap bergantung pada halaman yang sudah masuk indeks dan mutu teks sumber.
