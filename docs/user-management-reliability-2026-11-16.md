# Keandalan manajemen pengguna — 16 November 2026

Lingkup: enam route manajemen pengguna yang sudah aktif, yaitu daftar, tambah, edit, ubah password, hapus, dan ekspor. Tidak ada perubahan akun production dalam pengujian, migrasi, atau pembaruan dependency.

## Perbaikan

- Enam route memeriksa kebijakan Superadmin Umum sebelum menjalankan controller. Pengecekan policy pada controller tetap dipertahankan. ID mutasi dibatasi angka dan rentang integer positif. Kuota terpisah per pengguna: daftar 60, tambah 10, edit 20, password 10, hapus 10, dan ekspor 10 per menit; filter/ekspor tidak menghabiskan kuota ubah password.
- Admin tidak dapat menurunkan role atau memindahkan departemen akunnya sendiri dari Umum melalui formulir edit. Ini menjaga akses pengelolaan yang sebelumnya bisa terputus. Penghapusan akun sendiri tetap ditolak policy.
- Validasi tambah/edit memakai helper bersama. Email dinormalisasi sebelum pemeriksaan unik, dan benturan unik setelah validasi menjadi pesan kolom 422. Aturan email RFC/DNS dipertahankan.
- Password divalidasi sebelum hashing: minimal delapan karakter, kombinasi huruf besar/kecil/angka, tanpa byte null, maksimal 255 karakter, dan maksimal 72 byte bila driver bcrypt digunakan. Batas byte juga berlaku untuk karakter multibyte. Hash dihitung sebelum transaksi SQL agar transaksi tidak menunggu proses hashing.
- Log kegagalan hanya menyimpan kelas exception dan kode, tanpa pesan exception yang dapat memuat query atau hash. Respons perubahan bersifat private/no-store. Respons sukses tetap mempertahankan kontrak `success` dan `message`.
- JavaScript dipisahkan dari Blade menjadi aset dengan versi file. Satu pengunci menangani tambah/edit/password/hapus, termasuk saat konfirmasi, koneksi lambat, dan menunggu navigasi. Deadline 30 detik mencakup body respons. Tidak ada pengiriman ulang otomatis untuk aksi tulis; respons terlambat setelah halaman ditinggalkan diabaikan.
- FormUX menampilkan validasi dan konfirmasi hapus tanpa dialog browser bawaan. Nama pengguna dan pesan server ditampilkan sebagai teks. Isian dipertahankan saat gagal; password dibersihkan saat dialog ditutup atau perubahan berhasil. Form menggunakan POST eksplisit, sehingga kegagalan JavaScript tidak mengirim password melalui query URL.
- Generator memakai `crypto.getRandomValues`, rejection sampling, dan Fisher–Yates untuk password 16 karakter dengan seluruh kelompok karakter wajib. Tidak ada fallback ke `Math.random`. Kegagalan clipboard tidak menghalangi penggunaan password. Password tidak disisipkan ke HTML notifikasi; hasil clipboard yang terlambat tidak mengganti status formulir baru.

## Bukti pengujian

- Suite PHP: **814 tes / 8.865 assertion lulus** setelah penyesuaian kuota ekspor. Sesudah penambahan fallback POST, delapan tes terkait dijalankan lagi dan lulus dengan 163 assertion.
- Suite JavaScript: **384 tes lulus**, termasuk deadline body, pembatalan dengan hasil terlambat, respons HTML/redirect/JSON rusak, CSRF, serta generator dan rejection sampling.
- Browser desktop/ponsel menggunakan markup modal dari Blade: validasi, generator dan clipboard gagal, formulir tetap berisi saat gagal, penguncian klik berulang, method spoofing PUT, penolakan hapus, pesan literal, pembersihan password, dan penguncian sampai navigasi. Browser diulang setelah fallback POST ditambahkan dan lulus tanpa kesalahan JavaScript pada skenario tersebut.
- Tes PHP memeriksa batas ASCII/multibyte bcrypt dan byte null, normalisasi/benturan email, perlindungan role/departemen sendiri, log yang disanitasi, readonly, batas akses, dan isolasi kuota. DNS eksternal diisolasi pada tes; aturan production tidak dihapus.
- Pint pada file PHP yang berubah, pemeriksaan sintaks JavaScript, dan diff whitespace lulus.
- Verifikasi rilis wajib memakai cache array terisolasi dan transaksi MariaDB hanya baca: skema/indeks email, proyeksi daftar tanpa password/token, anggaran query daftar (maksimal empat saat dingin dan dua saat hangat), aturan password, ID tidak sah, policy, dan middleware enam route. Tidak ada percobaan membuat/mengubah/menghapus akun atau password production.

Perubahan ini memperbaiki jalur manajemen pengguna yang diuji. Waktu DNS, jaringan, dan fitur lain di luar lingkup ini tetap memiliki pengaruh terhadap pengalaman pengguna; ini bukan jaminan seluruh situs bebas masalah.
