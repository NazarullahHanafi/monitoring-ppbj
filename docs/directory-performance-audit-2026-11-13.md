# Perbaikan direktori, dropdown, dan kuota aksi — 13 November 2026

Lingkup: pengelolaan pengguna, vendor, dropdown master/satuan, serta kuota aksi SP/SPPH. Ini pemeriksaan lanjutan pada jalur bersama; bukan klaim seluruh website bebas bug atau pengujian beban produksi.

## Temuan dan hasil

- Filter pengguna belum memvalidasi bentuk parameter dan arah pengurutan. Array pada pencarian atau arah selain asc/desc dapat menyebabkan error server. Filter sekarang divalidasi sebelum membaca daftar atau memulai CSV; nama kolom dan arah pengurutan memakai daftar yang diizinkan. Urutan menambahkan ID sebagai pembeda agar pagination stabil saat nilai utama sama.
- Tombol ekspor pengguna membawa kata pencarian dari layar, tetapi controller sebelumnya mengabaikannya. Daftar dan ekspor sekarang memakai query filter yang sama. Ekspor membaca 500 baris per batch melalui ID, tanpa OFFSET, dan membatasi ID maksimum saat permintaan diterima. Baris baru sesudah snapshot tidak ikut masuk. Perubahan/hapus baris yang sudah ada selama proses masih dapat memengaruhi hasil; ini bukan snapshot transaksi jangka panjang. Kolom password tetap tidak dipilih dan perlindungan formula CSV tetap digunakan.
- Form ukuran halaman sebelumnya mempertahankan nomor halaman lama. Sekarang ukuran baru kembali ke halaman pertama dan hanya membawa filter yang dikenali, sehingga parameter tambahan berbentuk array tidak merusak rendering field tersembunyi.
- Pencarian vendor dan pengguna memperlakukan %, _ dan ! sebagai karakter literal melalui parameter SQL terikat. Dropdown vendor menerima pencarian 0, membatasi panjang/bentuk input, dan tetap hanya memuat maksimal 20 vendor aktif. Pencarian isi dokumen vendor yang sudah tersedia tetap berjalan.
- Tiga query hitung statistik vendor menjadi satu aggregate, ditambah query distinct vendor SP yang memang diperlukan. Bentuk respons statistik dipertahankan, termasuk nol saat daftar kosong. Pembuatan/perubahan vendor SP, arsip/hapus, dan pemulihan SP menghapus cache statistik terkait.
- Dropdown vendor tanpa kata pencarian memakai satu cache dengan TTL 60 detik dan invalidasi saat akun vendor dibuat/diubah/dihapus. Kata pencarian bebas tidak membuat key cache baru, sehingga tidak menumbuhkan cache tanpa batas. Respons dropdown tetap private/no-store di browser.
- Dropdown master dan satuan memakai cache yang diperbarui melalui event model. Perubahan master buyer juga menghapus cache pemetaan buyer pada manajemen pengguna; sebelumnya pemetaan dapat tertinggal hingga TTL habis. Daftar tidak dipotong sehingga seluruh pilihan lama tetap tersedia.
- Perubahan nama vendor dan pembaruan nama vendor di SP sekarang satu transaksi. Baris vendor dikunci saat diperbarui. Jika pembaruan SP gagal, nama vendor turut dibatalkan; sebelumnya pembaruan vendor dapat terlanjur tersimpan sendiri.
- Tiga puluh sembilan endpoint vendor lookup, SP/SPPH, cetak, lampiran, ekspor, persetujuan nilai, dan pemetaan portofolio memakai prefix throttle berbeda. Angka batas tiap endpoint tetap sama. Sebelumnya throttle numerik tanpa prefix berbagi penghitung pengguna, sehingga permintaan pencarian dapat menghabiskan kuota ekspor/aksi lain. Autentikasi, department, readonly, ownership, dan konfirmasi penghapusan tetap berlaku. Endpoint lain di luar lingkup ini tidak diubah.

## Validasi

Tes regresi baru memeriksa filter rusak sebelum CSV, batas akses, ekspor 503 pengguna dalam dua query batch tanpa OFFSET, filter literal, snapshot, formula CSV, pagination, cache hangat tanpa query ulang, invalidasi master/vendor/satuan, statistik SP aktif/terarsip/pulih, rollback perubahan vendor saat kegagalan SP disimulasikan, dan isolasi kuota. Suite aplikasi juga dijalankan untuk mendeteksi regresi pada modul lain.

Audit dependency terkunci pada pemeriksaan ini: `composer audit --locked` tidak melaporkan advisory atau paket abandoned; `npm audit` melaporkan 0 kerentanan. Ini hasil daftar advisory yang tersedia saat diperiksa, bukan jaminan tidak adanya celah yang belum diketahui.

Hasil akhir lokal: **710 tes PHP / 6.920 assertions** dan **321 tes JavaScript** lulus. Pemeriksaan sintaks seluruh PHP yang diubah dan diff whitespace lulus. Tes format pada helper, controller vendor/satuan, provider, dan kedua berkas tes terkait lulus; file legacy lain tidak diformat ulang secara menyeluruh.

Tidak ada perubahan dependency, migrasi, OCR worker, berkas asli pengguna, kredensial, atau konfigurasi layanan cloud. Deploy memerlukan pembaruan kode serta route/view cache; tidak perlu build aset karena JavaScript/CSS tidak berubah. Verifikasi produksi hanya membaca data menggunakan cache array untuk proses pemeriksaan dan tidak menampilkan isi dokumen atau identitas pengguna.
