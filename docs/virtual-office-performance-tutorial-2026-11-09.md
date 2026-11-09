# Performa, tutorial akun, dan kamera Kantor Virtual

Tanggal: 9 November 2026. Rilis aplikasi: `48dc11560e37a9aba7203e22f6cf3de8c7b923a6`. Sudah diterapkan ke https://sucofindoumumpku.com.

## Perubahan

- Pembaruan gerak mengambil posisi publik pemain dari jalur khusus `pilotPeers()`. Sebelumnya setiap paket gerak menyusun seluruh snapshot kehadiran, termasuk mood, menu kerja, pertemuan, rekreasi, dan dunia, lalu membuang sebagian besar hasilnya. Pembacaan sekarang menggunakan **3 kunci cache per avatar, sebelumnya 8** (62,5% lebih sedikit kunci, bukan pengurangan jumlah request HTTP). Direktori tetap dibatasi 120 orang, memakai invalidasi yang sama, dan menyembunyikan akun privat. Kehadiran dan lease tetap diperiksa; ID sesi tidak dikirim ke klien. Interval sinkronisasi, validasi gerak, dan collision avatar tetap sama.
- Animasi bola menghitung permainan aktif satu kali per frame. Loop setiap bola tidak lagi menyalin dan memindai seluruh daftar avatar serta menghitung waktu siang/malam berulang kali.
- Kamera mempertahankan arah putaran dan kemiringan yang dipilih pengguna saat terhalang. Koreksi tabrakan hanya mengubah radius secara bertahap; tidak mencari sudut overhead atau menyimpan vektor arah lama ketika melewati pintu. Zoom pilihan pengguna dipertahankan oleh OrbitControls dan jarak nyaman mengikuti mode rumah/avatar/transformasi.
- Tutorial wajib tujuh langkah untuk akun aktif bidang Umum dan Operasional. Materi kerja menyesuaikan bidang, viewer/read-only, dan Super Admin Umum. Panduan mencakup menu kantor, gerak/kamera/fullscreen, hologram dokumen, avatar/rumah, percakapan/privasi, fasilitas, dan cara membuka ulang.
- Navigasi halaman mengarahkan akun yang belum selesai ke tutorial. Penyimpanan dokumen, polling JSON/AJAX, ekspor, autentikasi, profil, dan pusat keamanan tidak disela. Pengguna yang sedang membuka halaman lama akan mendapat panduan pada navigasi halaman berikutnya.
- Progres tersimpan di tabel `virtual_office_tutorials`, satu baris dengan primary key `user_id`, bukan localStorage. Langkah harus berurutan; klik ulang atau tab lama tidak mengulang langkah, dan waktu selesai tidak ditimpa. Status selesai tetap berlaku sesudah logout, pindah perangkat, cache hilang, atau perubahan bidang. Tidak ada reset otomatis versi tutorial. Akun baru mengikuti tutorialnya sendiri.
- Setelah langkah terakhir pengguna masuk ke Kantor Virtual. Tombol **Lihat tutorial** tersedia di navigasi, dan **Tutorial** tersedia dalam game. Pembacaan ulang tidak mengubah progres/penyelesaian.
- Tutorial dirender tanpa JavaScript aplikasi, polling, font eksternal, atau unduhan mesin 3D. Cache selesai merupakan petunjuk selama satu hari; database tetap sumber status seumur akun. Konfigurasi `VIRTUAL_OFFICE_TUTORIAL_REQUIRED` aktif secara default. Suite lama menonaktifkan gate melalui phpunit.xml; suite tutorial mengaktifkannya secara eksplisit.

## Pengukuran server

Pemeriksaan langsung, tanpa uji beban atau perubahan data bisnis:

- Cache dan sesi Redis; debug nonaktif; konfigurasi dan route tercache.
- Host shared: 60 inti, load average sekitar 29; RAM tersedia sekitar 33 GB. Load ini sendiri tidak membuktikan overload aplikasi.
- Filesystem `/home4`: **96% terpakai**, sekitar 16 GB tersedia. Ini filesystem host bersama. Backup milik aplikasi sekitar 377 MB dan log aplikasi sekitar 2 MB pada pemeriksaan awal, sehingga membersihkan folder tersebut bukan penyelesaian kapasitas host. Kapasitas perlu ditinjau penyedia hosting; belum dilakukan penghapusan backup atau data pengguna.
- Metrik aplikasi hari pemeriksaan tidak berisi catatan halaman lambat/error. Ini terbatas cakupan dan masa simpan monitor, bukan jaminan tidak pernah ada perlambatan.
- Sampel awal access log: 1.837 request dari 8 November 19:49 sampai 9 November 09:29 +0700. Ada 642 request gerak kantor dan 120 polling kantor lainnya; log diproses sebagai agregat tanpa menampilkan IP, akun, isi pesan, atau query.

Pembandingan fungsi baca pada **proses CLI server yang sama**, cache hangat, masing-masing 20 sampel:

| Jalur | Median | P95 | Total SQL |
| --- | ---: | ---: | ---: |
| Referensi lama: snapshot penuh lalu memilih posisi | 1,728 ms | 2,996 ms | 0 |
| Jalur posisi baru | 0,827 ms | 0,873 ms | 0 |
| Snapshot kehadiran penuh | 1,698 ms | 1,784 ms | 0 |

Median jalur baca posisi pada sampel ini sekitar 52% lebih rendah. Saat pengukuran tidak ada pilot aktif dalam hasil publik; pengukuran tidak membuat avatar palsu. Ini tidak mengukur keseluruhan request gerak, antrean PHP worker, performa GPU, koneksi pengguna, atau waktu muat seluruh website. Sampel HTTP sesudah rilis: `/up` 200 dengan TTFB 73 ms, `/login` 200 dengan TTFB 84 ms, diukur dari host server, bukan perangkat pengguna.

## Validasi

- Seluruh **530 pengujian PHP, 4.394 assertions** lulus.
- Seluruh **192 pengujian JavaScript** lulus. Termasuk gerakan dengan latensi 30–700 ms, pembatasan prediksi saat koneksi macet, lompatan, rumah, transformasi, kamera, panel, dan siklus hidup polling. Regresi kamera baru memeriksa arah mouse selama halangan dan masa pemulihannya serta respons zoom dalam rumah.
- Uji tutorial: wajib pada navigasi pertama, resume, akun terpisah, cache/sesi dibersihkan, replay tanpa reset, langkah tidak bisa dilompati, forged user ID ditolak, klik ulang idempoten, materi bidang/viewer, akun terkunci/asing/tamu, dan penyimpanan bisnis viewer tetap dilarang.
- Uji peers membandingkan hasil baru dengan visibility snapshot lama untuk lease hilang, offline, ID presence tidak cocok, dan sanitasi data. Tidak memuat dunia dan tidak menjalankan SQL pada cache hangat. Regresi akun owner tersembunyi juga tetap lulus.
- Blade berhasil dikompilasi; build Vite produksi berhasil. Peringatan chunk scene >500 kB tetap ada; scene tetap dimuat sesuai kebutuhan dan tidak dimuat oleh tutorial.
- Semua aset rilis diverifikasi SHA-256 melalui HTTPS terhadap file server. Health 200. Endpoint privat termasuk tutorial menolak tamu dengan 401; POST tanpa CSRF ke tutorial, pilot, combat, dan PPBJ ditolak 419.
- Render tutorial langsung di runtime produksi berhasil untuk Umum dan Operasional, sekitar 4,1 KB HTML tanpa bundle game. Gate akun yang belum selesai benar dan pemeriksaan tidak menandai tutorial pengguna selesai.
- **Verifikasi visual langsung dengan browser belum dapat dilakukan** karena koneksi otomasi browser gagal. Pengujian geometri dan kamera memakai fixture otomatis; tidak ada klaim FPS atau uji visual manual pada perangkat pengguna.

## Penerapan dan backup

Direktori privat: `/home4/suc45578/deployment-artifacts/office-performance-20261109-093617`.

- Arsip kode sebelum rilis: `application-before.tar.gz` (termasuk konfigurasi dan bootstrap), serta `webroot-before.tar.gz`.
- Skrip awal salah mencocokkan nama environment variable direktori backup; dump sebelum rilis tidak terbentuk. PHP CLI melaporkan error tetapi mengembalikan exit code nol sehingga langkah berikutnya berjalan. Rilis hanya menambah tabel tutorial; tidak mengubah tabel/data bisnis yang ada.
- Setelah kejadian, dibuat dan diverifikasi `database-after-additive-migration.sql`, **4.741.044 bytes**, SHA-256 `6d7171e2b1ba6e1d103fdd7293c27dc1fbd9d18bcad5651c4c5edb1f5310d8eb`. Status mysqldump, header, penanda selesai, dan izin diverifikasi. Direktori 0700, dump 0600; berkas kredensial sementara sudah dihapus. Dump ini dibuat sesudah penambahan tabel, bukan sebelum rilis. Backup database rilis sebelumnya tetap disimpan.
- Skrip diperbaiki agar nama variabel konsisten dan keberadaan dump nonkosong diperiksa oleh shell sebelum migrasi dapat berjalan. Helper backup pengganti memakai penanganan error eksplisit dengan exit nonnol.
- Migrasi hanya menambah `virtual_office_tutorials`, dijalankan sebelum kode baru diaktifkan. Optimasi konfigurasi, route, dan view diperbarui. Cache Redis pengguna dan sesi tidak dikosongkan. Tidak ada penandaan massal tutorial selesai atau manipulasi akun pengguna.

Helper lokal berada di `tmp/` dan helper server berada di `deployment-artifacts`, bukan webroot. Folder lokal lain yang sudah tidak terlacak sebelum tugas tidak dimasukkan ke rilis.
