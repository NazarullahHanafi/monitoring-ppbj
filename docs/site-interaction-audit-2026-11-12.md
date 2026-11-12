# Performa dan interaksi bersama — 12 November 2026

Lingkup perubahan: ekspor CSV SP/SPPH, chat tim pada shell semua halaman, lifecycle cache direktori pengguna, dan perlindungan pengiriman formulir biasa pada layout aplikasi/hologram. Pemeriksaan regresi mencakup fitur lain melalui suite aplikasi; ini tidak merupakan jaminan seluruh sistem bebas bug atau aman dari semua ancaman.

## Ekspor

Sebelumnya SP/SPPH memanggil `get()` untuk semua dokumen sebelum mengirim respons, termasuk semua rincian SP. Kini snapshot membatasi ID maksimum saat permintaan diterima, lalu generator membaca 200 dokumen per batch dengan cursor, tanpa OFFSET. Urutan SP memakai sequence dan ID sebagai pembeda; urutan SPPH memakai ID. Nilai sequence sama maupun kosong tidak menyebabkan baris terlewat. Baris baru setelah snapshot tidak disisipkan ke ekspor berjalan. Pengubahan/hapus dokumen yang sudah ada selama streaming tetap dapat memengaruhi ekspor; ini bukan snapshot transaksi database jangka panjang.

SP menentukan header rincian lewat `EXISTS` dan eager-load item hanya per batch bila diperlukan. Pemilihan kolom dibatasi pada kolom laporan. Filter tanggal/PIC/vendor yang rusak ditolak sebelum CSV dimulai. Filter pencarian, auto/Oracle, soft delete, nama semua vendor, format tanggal, dan perlindungan formula CSV tetap dipertahankan. Penggunaan memori kini mengikuti ukuran batch serta rincian dalam batch, bukan seluruh jumlah dokumen. Dokumen dengan jumlah item sangat besar masih dapat menambah penggunaan memori.

## Chat dan query

Cursor `since` mengambil 40 pesan berikutnya secara menaik; sebelumnya mengambil 40 pesan terbaru sehingga lonjakan lebih dari 40 pesan dapat melewati bagian tengah. Riwayat awal/`before` tetap memakai urutan lama. Browser mengejar maksimal tiga halaman per rangkaian, dengan satu permintaan aktif. Pengiriman sendiri, share, dan follow-up tidak boleh menaikkan cursor baca melewati pesan orang lain. Penyisipan DOM menjaga urutan dan mencegah duplikasi saat respons kirim bertemu polling.

Ringkasan tanda baca digabung dari dua query menjadi satu aggregate terikat ID. `chat/read` menerima maksimal 40 ID positif, hanya menulis untuk pesan orang lain yang masih terlihat; pesan tersembunyi, aktivitas sistem, pesan sendiri, dan ID tidak tersedia tidak menambah tanda baca. Cursor tidak sah ditolak. Pencarian menggunakan parameter terikat dan memperlakukan `%`/`_` sebagai karakter biasa.

Pencarian lama dibatalkan saat diganti/dikosongkan/ditutup. Dropdown mention menggunakan satu promise untuk permintaan direktori yang bersamaan. Semua read bersama dibatalkan saat tab tersembunyi atau halaman ditinggalkan, dengan deadline tetap 20 detik dan hasil terlambat diabaikan. Cache direktori hanya memuat pengguna aktif. Perubahan/penghapusan akun menghapus cache terkait; listener cache sekarang mengembalikan void agar kegagalan `Cache::forget` menemukan key tidak menghentikan listener model lain.

Lima belas endpoint chat mempunyai batas permintaan per pengguna dengan prefix berbeda; polling, pencarian, baca, dan aksi tidak saling menghabiskan kuota. Anggaran yang sudah ada dipertahankan dan endpoint yang belum dibatasi mendapat batas eksplisit. ID pada route edit/hapus/reaksi harus berupa angka. Kontrol autentikasi, departemen, readonly, dan kepemilikan tetap berlaku.

## Formulir

`FormUX` menahan submit kedua untuk formulir biasa yang mengubah data, memberi status busy, dan mempertahankan seluruh input tersembunyi serta nama/nilai tombol submit. Tombol tidak dinonaktifkan secara native karena dapat menghilangkan data dari request. Formulir AJAX/konfirmasi yang memanggil preventDefault mengelola lifecycle sendiri; filter GET dan target tab baru tidak dibekukan. Status dilepas saat kembali lewat BFCache atau sesudah 60 detik, tanpa mengirim ulang otomatis. Ini melengkapi validasi/aturan transaksi server; bukan pengganti idempotensi server. Halaman khusus dapat memilih `data-ux-native-guard="off"`.

## Validasi

`SiteInteractionPerformanceTest` memeriksa ekspor 425 dokumen per modul dalam tiga query batch, urutan stabil, baris baru tidak masuk, perlindungan formula, filter/role, burst 93 pesan tanpa kehilangan, tanda baca, cache akun, observer, dan isolasi kuota. Pengujian JavaScript memeriksa pembatalan read, respons terlambat, deduplikasi permintaan, dan batas pengejaran chat. Browser desktop/ponsel memeriksa data tombol/input tetap terkirim, klik ganda, BFCache, formulir AJAX, dan urutan pesan.

Audit `composer audit --locked` dan `npm audit` tidak melaporkan advisory pada dependensi terkunci saat pemeriksaan. Hasil tersebut bukan jaminan tidak adanya kerentanan yang belum dilaporkan. Tidak ada pembaruan dependensi atau migrasi database pada perubahan ini. Deploy memerlukan publikasi `app-shell.js`, `form-ux.js`, `form-ux.css` ke webroot sebenarnya dan pembaruan cache route/view. Uji produksi tidak mengirim chat atau mengubah dokumen pengguna.
