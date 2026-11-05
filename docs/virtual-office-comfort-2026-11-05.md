# Perbaikan gerak, kamera, bar, dan rumah — 5 November 2026

## Perbaikan bug

Avatar yang kadang tampil kembali di komputer saat berlari mempunyai jalur kegagalan yang teridentifikasi di kode: respons koreksi posisi HTTP 422 memanggil `releasePilot()`, lalu scene mengembalikan avatar ke pose meja sebelum claim berikutnya. Respons koreksi sekarang menyertakan posisi kanonis yang aman; klien mereset fisika avatar yang sama tanpa melepas kendali atau mengganti mode kamera. Tombol Kendalikan avatar yang ditekan kembali saat sudah aktif juga tidak lagi membatalkan flag claim.

Prediksi gerak dijeda setelah sekitar empat unit lintasan belum dikonfirmasi, sebelum melampaui kredit jarak server lima unit. Ini mengakomodasi request lambat tanpa terus bergerak ke posisi yang pasti ditolak. Tidak ada request paralel baru. Lease sementara diperpanjang menjadi 20 detik agar deadline jaringan delapan detik dan retry tidak memutus kehadiran manual terlalu dini; keluar halaman, logout, dan menu kerja tetap melepaskan lease secara eksplisit. Sliding di sudut memakai satu sumbu yang segmennya valid agar server tidak menolak diagonal yang memotong sudut net/meja.

Zoom yang menyusut mempunyai penyebab terpisah: posisi kamera OrbitControls dipendekkan permanen ketika ray kamera terhalang, sehingga frame berikutnya memulai dari jarak yang sudah pendek. Resolusi benturan sekarang hanya diterapkan pada frame yang dirender, sementara posisi dan orientasi pilihan pengguna dipertahankan. Jika ruang terlalu sempit, kamera memilih pandangan yang lebih tinggi. Batas jarak follow 3,8 unit dan potret 2,8 unit; tombol zoom juga menghormati batas dan membatalkan easing lama. Hit-test klik menggunakan kamera yang benar-benar dirender, sehingga tombol tempat tetap sesuai posisi visual.

## Bersantai

HUD menyediakan empat pose: **Duduk santai, Rebahan, Tidur santai, Meditasi**. Berjalan ke pantai, taman, teras, lounge, bar, atau masuk rumah sendiri; pilih pose lalu tekan **Bersantai**. Pose disinkronkan melalui payload pilot dan tetap menunjukkan pengguna online. Tombol **Berdiri** atau gerakan berjalan mengakhiri pose.

Rebahan/tidur memerlukan ruang kosong di belakang avatar; penyangga alas memakai satu InstancedMesh bersama, tanpa satu draw call tambahan per pengguna. Avatar tidak dipindahkan ke komputer atau titik rekreasi lain saat pose dipilih. Tombol aktivitas santai pada panel pesanan juga menghasilkan pose duduk yang terlihat.

## Kehidupan di bar

Bar diisi enam NPC asli bergaya diorama: dua pelayan perempuan **Nia dan Clara**, bartender **Adrien**, **DJ Luc**, dan dua tamu. Detail mencakup rambut, wajah, pakaian, apron, name badge, baki dan gelas. Gerak idle lembut berhenti pada reduced motion/jeda. Label pelayan menyebut **NPC**, dan karakter ini tidak menambah jumlah pengguna online, database pengguna, chat, atau dompet. Mengeklik pelayan membuka fasilitas bar/disko melalui geofence yang sama dengan tempatnya. Posisi NPC memiliki collider agar avatar pengguna tidak menembusnya.

## Masuk ke rumah sendiri

1. Tekan **Rumah saya** untuk menunjukkan pintu rumah dengan penanda emas. Jalan samping kantor menghubungkan kampus ke jalan perumahan; tombol tersebut tidak memindahkan avatar.
2. Berjalan mendekati pintu. **Buka pintu** aktif di dekat pintu rumah sendiri; tombol E atau klik pintu juga dapat digunakan.
3. Setelah pintu berayun terbuka, berjalan masuk dengan kontrol biasa. Atap/depan rumah ditampilkan secara cutaway ketika penghuni berada di dalam, dan lantai avatar mengikuti ketinggian interior.
4. Tekan **Tutup pintu** dari dalam atau dekat pintu. Menutup ditolak ketika avatar masih tepat di ambang agar tidak terkunci di dalam collider. Pintu dapat dibuka kembali dari dalam.

Alamat rumah memakai slot server yang mempertahankan reservasi akun nonaktif. Kapasitas 128 alamat; hanya petak yang dialokasikan yang dibangun dan memiliki collider. Rumah tanpa penghuni yang terlihat merupakan reservasi, bukan pengguna online. Batas kawasan diperluas sampai z −216. Template collider rumah dipakai bersama PHP/JavaScript untuk dinding, pintu, kasur, kulkas, dapur, sofa, meja, TV, kamar mandi, rak dan pagar. Pengujian mencakup baris pertama sampai terakhir.

Endpoint pintu memerlukan auth, CSRF, UUID sesi aktif, akun aktif/bidang yang diizinkan, kepemilikan rumah, dan kedekatan. Tidak menerima ID rumah atau pengguna lain. Membuka pintu sendiri tidak membuat pintu rumah lain dapat dilewati. NPC simulasi mempunyai akses keluar melalui pintu rumahnya sendiri selama berjalan; akses tersebut tidak diberikan kepada kendali pengguna. Identitas owner tersembunyi tetap tidak dimasukkan ke roster publik.

Tidak ada migrasi atau penulisan data bisnis baru. Posisi, pintu, dan pose tetap sementara di cache. Presence dingin kini menggunakan sampai tiga query terbatas untuk alamat, directory dan konfigurasi dunia; hangat tetap nol SQL. Pemeriksaan gerak di kampus tidak membaca cache alamat untuk setiap segmen; rumah menggunakan kandidat baris/kolom terdekat dan satu pembacaan jumlah petak per instance layanan.

## Verifikasi

- **488 tes PHP / 3.532 assertions** lulus; setelah optimasi pembacaan collider, seluruh 46 tes kantor / 776 assertions juga lulus.
- **131 tes JavaScript** lulus. Regresi mencakup 422 tanpa pelepasan avatar, request lambat, tombol kendali berulang, perpotongan sudut, kamera terhalang 500 frame tanpa penyusutan zoom, pintu, kepemilikan, furniture, dan pose.
- Scene aktual dengan renderer pengujian tetap di bawah 750 mesh pada 24 avatar detail ditambah enam NPC. Template collider statis 203 kotak cocok persis dengan scene. Interior, pintu berengsel, NPC keluar rumah, empat pose, alas bersama, dan pembersihan resource diuji.
- Build berhasil: entry kantor sekitar 65,3 KB minified / 23,1 KB gzip; scene lazy termasuk Three.js sekitar 640,3 KB / 170,7 KB gzip. Aset utama aplikasi tetap sama. Peringatan Vite untuk scene lebih dari 500 KB tetap merupakan chunk lazy tersebut.
- Browser telah dicoba kembali pada tab Kantor Virtual, tetapi konektor gagal dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Pemeriksaan visual interaktif dan FPS GPU belum dapat dilakukan; tes geometri/SSR tidak menggantikannya.

Rilis dipasang dengan backup privat kode, aset, `resources/data`, dan database. Aset sebelumnya dipertahankan di webroot agar tab lama tetap dapat memuat dependensinya. Pengguna perlu memuat ulang halaman untuk memperoleh kode klien baru.
