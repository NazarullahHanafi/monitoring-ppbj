# Tutorial praktik langsung di Kantor Virtual

Rilis aplikasi `f3b7ec426728c8717cf3b9e45e40faa068a10e1d`, diterapkan 9 November 2026. Menggantikan halaman tutorial bacaan pada rilis sebelumnya.

## Perilaku pengguna

`/virtual-office/tutorial` sekarang mengarahkan ke `/virtual-office?tutorial=1`. Panduan berada dalam kantor 3D yang sesungguhnya. Akun yang belum menyelesaikan tutorial mendapat panduan di kantor, termasuk saat membuka kantor langsung. Preferensi tampilan daftar tidak menghalangi latihan 3D. Tombol mulai membuka tampilan game penuh dan memfokuskan avatar.

Tujuh langkah praktik:

1. Aktifkan kendali avatar sendiri.
2. Berjalan minimal tiga meter dan mencoba lompatan. Indikator mengikuti posisi/aksi hasil physics lokal, bukan sekadar penekanan tombol. Teleport atau gerakan idle tidak dianggap latihan berjalan.
3. Buka editor avatar yang sudah ada, ubah penampilan, lalu simpan melalui endpoint profil asli. Backend memeriksa versi serta hash avatar sendiri; membuka editor atau menyimpan tampilan yang sama tidak menyelesaikan langkah. Perubahan avatar adalah pilihan pengguna yang benar-benar tersimpan.
4. Putar kamera dan coba zoom dengan mouse, sentuhan, atau tombol zoom. Perubahan kamera otomatis tidak dihitung sebagai putaran pengguna. Kamera dan physics tetap memakai sistem kantor yang sudah ada.
5. Buka proyeksi hologram di atas avatar sendiri.
6. Isi dan validasi form latihan di dalam hologram. Umum berlatih PPBJ; Operasional berlatih PR; viewer/global read-only berlatih Tracking PR. Form menampilkan nama kolom inti yang sesuai dokumen, contoh pengisian, error validasi, dan ringkasan hasil. Pengguna kembali ke avatar setelah melihat hasil.
7. Selesaikan tutorial dan lanjutkan menjelajah. Kantor dimuat kembali dengan menu hologram dokumen asli.

Petunjuk berupa satu kartu ringkas yang bisa dilipat, dengan sorotan pada kontrol terkait. Saat editor avatar terbuka, petunjuk singkat berada dalam editor; saat mengisi form, panduan ada dalam form latihan. Kartu tidak menutupi form tersebut. Pada ponsel kartu ditempatkan di atas agar tombol gerak tetap tersedia.

## Penyimpanan dan pembatasan

- Progres tetap per akun pada `virtual_office_tutorials`; migrasi baru hanya menambah kolom JSON `practice`. Tidak ada perubahan tabel bisnis.
- Panduan bacaan yang belum selesai dimulai dari praktik pertama saat pengguna menekan mulai. Akun yang sudah menyelesaikan panduan sebelumnya tetap selesai, tanpa reset otomatis. Gunakan **Lihat tutorial** untuk mencoba panduan baru kembali.
- Replay menjalankan latihan yang sama tanpa memundurkan atau mengganti timestamp penyelesaian akun. Tidak ada pencatatan ulang progres wajib saat replay. Progres latihan wajib yang belum selesai dapat dilanjutkan setelah reload/perangkat berganti.
- Langkah berurutan, klik ganda dan respons lama tetap idempoten. Request progres tidak berulang lewat polling; hanya dikirim saat mulai dan setelah tindakan langkah berhasil. Modul tutorial 5,17 KB (gzip 2,46 KB) dimuat hanya saat panduan aktif.
- Pengukuran gerak dan kamera merupakan telemetry tutorial di klien, bukan mekanisme anti-cheat atau dasar pemberian hak akses bisnis. Hak akses dokumen tetap mengikuti guard aplikasi yang sudah ada.
- Selama panduan, hologram hanya menampilkan satu alat latihan yang sesuai akses. Tautan dokumen asli dalam shell latihan disembunyikan. Rute latihan berbeda dari rute simpan bisnis; parameter latihan tidak mengubah perilaku route bisnis.
- Form latihan tidak memanggil controller penyimpanan bisnis, tidak membuat nomor registrasi, tidak menyimpan PR/PPBJ, tidak mengirim approval/notifikasi, dan tidak memotong saldo. Ini latihan alur dasar dengan kolom inti, bukan seluruh formulir pengadaan produksi.
- Bukti validasi form dienkripsi dan terikat ke akun, nonce latihan, jenis dokumen sesuai izin, serta masa berlaku 30 menit. Parent hanya menerima pesan dari origin, iframe, dan channel yang sedang aktif. Input ringkasan ditampilkan sebagai teks.
- Viewer tetap dapat menyesuaikan avatar sendiri dan menjalankan avatar, tetapi tidak mendapat izin membuat dokumen. Seluruh endpoint latihan memerlukan autentikasi, akun aktif, bidang yang berhak, dan CSRF untuk POST.

## Verifikasi

- **533 tes PHP / 4.512 assertions** lulus.
- **202 tes JavaScript** lulus. Termasuk latihan memakai physics nyata, integrasi editor avatar, gerak/zoom yang belum lengkap, kegagalan simpan dan retry, replay, lifecycle, penolakan pesan iframe palsu/lama, validasi form, sanitasi teks, dan pencegahan pengiriman form latihan ke endpoint PPBJ asli.
- Regresi scene memeriksa callback kamera dari gesture pengguna dan tombol zoom; setup kamera programatik tidak dihitung sebagai latihan putaran.
- Build produksi dan kompilasi Blade berhasil. Peringatan ukuran chunk scene >500 KB tetap ada; modul latihan tidak memasukkan scene baru atau salinan model tambahan.
- Seluruh aset rilis diperiksa SHA-256 melalui HTTPS. Health 200; endpoint privat termasuk form latihan menolak tamu dengan 401.
- Pemeriksaan runtime produksi: halaman kantor dengan `voScene`, `voTutorialCoach`, konfigurasi tujuh langkah, serta form latihan berhasil dirender untuk Umum dan Operasional. HTML kantor sekitar 93–102 KB, form latihan sekitar 2,8 KB. Link tutorial lama mengarah ke kantor dengan 302. Probe hanya membaca, dengan **0 SQL writes**, tanpa menyelesaikan tutorial atau mengubah avatar pengguna.
- Koneksi otomasi browser gagal saat memilih tab dengan error `Cannot read properties of undefined (reading 'timeoutMs')`. Karena itu tidak ada klaim uji visual manual/FPS pada browser pengguna; verifikasi frontend menggunakan fixture otomatis dan render server.

## Penerapan

Backup sebelum migrasi/kode aktif: `/home4/suc45578/deployment-artifacts/office-practice-20261109-102617`.

- `application-before.tar.gz` dan `webroot-before.tar.gz`.
- `database-before.sql`, 4.745.413 bytes, dibuat sebelum migrasi. Dump nonkosong, penanda selesai, dan izin 0600 diperiksa sebelum skrip boleh melanjutkan; direktori 0700. Berkas kredensial sementara dihapus.
- Migrasi penambahan kolom dilakukan sebelum aktivasi kode. Cache konfigurasi, route, dan view diperbarui; cache sesi dan data pengguna tidak dikosongkan. Tidak ada penandaan massal tutorial selesai.
