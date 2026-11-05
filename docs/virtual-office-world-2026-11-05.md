# Kantor Virtual — kawasan, cuaca, kamera dan pertemuan

Kawasan kini memiliki padang rumput, hutan rendah poligon, pegunungan bersalju dan awan. Pilihan global **Alpen Eropa / desa hangat / Nordik** menyesuaikan palet lanskap serta atap rumah. Rumah pribadi dan fasilitas pada rilis sebelumnya tetap tersedia.

## Pengelolaan kawasan

Hanya akun dengan `role === superadmin` dan `department === umum` dapat menyimpan pengaturan kawasan. Endpoint memeriksa keduanya di server; menyembunyikan tombol bukan pengaman utama. Mode read-only global tetap mengunci penyimpanan. Pilihan dibatasi enum, checkbox dan interval; tidak ada URL aset, skrip atau unggahan dari pengelola.

Cuaca virtual dapat dipilih **otomatis, cerah, hujan, salju, aurora, kabut**. Default otomatis berganti setiap **3 jam**, dengan opsi 2/3/4/6 jam. Semua klien memakai slot waktu server yang sama; label pergantian menyebut WIB. Cuaca merupakan suasana visual aplikasi. Pengelola dapat menyalakan/mematikan awan dan pegunungan, serta memilih jumlah partikel ringan/sedang.

Satu tabel tambahan `virtual_office_world` menyimpan JSON pengaturan dan nomor versi. Penyimpanan serentak memakai transaksi, row lock, dan penolakan versi kedaluwarsa (409). Perubahan diterima klien lain pada pembaruan otomatis berikutnya. Preferensi grafis hemat/standar tetap pribadi per perangkat; akun lain tidak mendapat hak mengubah kawasan bersama.

## Kamera dan gerakan

Tersedia **Orbit kawasan**, **Ikuti avatar**, dan **Potret dekat**. Pilih anggota tim untuk menentukan target kamera. Follow menjaga sasaran ketika figur berjalan, mendukung putaran dan zoom dengan damping, serta membatasi jarak dekat. Kamera follow/portrait menyesuaikan jarak sebelum tembok atau perabot utama; tampilan rumah terpilih tetap membuka atap/dinding seperti sebelumnya.

Perpindahan berjalan memakai grid A* dengan jarak aman, pemeriksaan segmen untuk menahan tembus objek tipis, serta penghitungan ulang jalur ketika figur lain menghalangi. Tembok, partisi, meja kerja, meja permainan, net, sofa, counter, rak, tanaman besar dan sejumlah pembatas lapangan didaftarkan sebagai penghalang. Posisi duduk dan berbaring merupakan pose khusus pada kursi/kasur. Pergantian status tidur/online dapat menempatkan figur di lokasi aktivitas baru; navigasi digunakan pada gerakan berjalan yang dianimasikan.

## Bertemu dan chat langsung

1. Pilih rekan online dan tekan **Undang bertatap muka**.
2. Rekan perlu membuka Kantor Virtual dan menerima undangannya. Undangan kedaluwarsa setelah 3 menit. Satu akun mempunyai paling banyak satu undangan/pertemuan pada satu waktu.
3. Setelah diterima, kedua figur menuju salah satu dari 12 tempat bertemu di promenade dan saling menghadap. Pemeriksaan kesiapan dikirim masing-masing klien, bukan menganggap penerimaan sebagai figur sudah tiba. Mode jeda/reduced-motion dapat memakai posisi pertemuan statis.
4. Kolom pesan tersedia setelah keduanya terhubung dan siap. Pesan baru disimpan melalui `ChatController::send` yang sudah ada, dengan mention rekan dan pemeriksaan rate limit yang sama.
5. **Pesan terlihat di Chat Tim; ini bukan kanal pribadi.** Panel office mengambil mention publik kedua peserta sejak pertemuan dimulai dan mengikuti penghapusan per pengguna. Isi dirender melalui `textContent`.

Pembaruan berlangsung setiap **3 detik** saat ada undangan/pertemuan, dan **8 detik** saat tidak ada. Ada batas waktu request, single-flight, pembatalan saat halaman tersembunyi, penanganan sesi berakhir, serta backoff ketika rate limit tercapai. Ini menggunakan polling singkat yang sesuai hosting saat ini. Lease klien 20 detik dan kesiapan 12 detik menghentikan pengiriman ketika peserta meninggalkan kantor virtual. Kehadiran aplikasi tetap bersumber dari heartbeat, bukan dari cuaca atau gerak figur. Pertemuan berakhir maksimal 30 menit atau dapat dibatalkan/diakhiri peserta.

Undangan, lease, tempat bertemu dan kesiapan bersifat sementara di cache; tidak ada tabel pesan baru. Hanya penerima boleh menerima/menolak. UUID pertemuan harus cocok dengan sesi pengguna. Viewer, akun nonaktif, departemen lain dan owner yang disembunyikan tidak dapat dipakai untuk mengirim melalui pertemuan. Akun yang tidak ikut tidak menerima data undangan atau stream pesan pertemuan melalui endpoint live. Chat Tim biasa tetap mengikuti hak akses dan perilakunya yang sudah ada.

## Performa dan validasi

Gunung, hutan dan awan dibatch. Hujan/salju memakai satu buffer 800 titik yang digunakan ulang, dengan default hemat 320 titik; aurora memakai geometri kecil yang sama saat diperbarui. Tidak ada lampu tambahan per rumah, model eksternal atau layanan cuaca pihak ketiga. Grafis tetap lazy dan page-only; CSS/JS aplikasi utama tidak berubah. Resolusi GPU dibatasi 1,5 DPR, mode hemat menjadi 1 DPR. Animasi berhenti ketika halaman/tab tidak terlihat. Perangkat kecil atau kapasitas rendah mendapat pilihan hemat secara default, yang bisa diubah sendiri.

Feed cold-cache memakai dua query terbatas (direktori dan pengaturan kawasan), lalu nol query SQL saat cache hangat. Endpoint live tanpa pertemuan memakai cache setelah pengaturan dimuat. Pertemuan aktif menambah pemeriksaan peserta dan satu pembacaan pesan terbatas. Tidak dilakukan stress test hosting atau pengiriman pesan percobaan production atas nama pengguna.

Pengujian mencakup role/departemen pengelola, read-only, konflik versi, enum, undangan online, penerima, pihak luar, Viewer, owner tersembunyi, lease, kesiapan kedua peserta, integrasi Chat Tim, kedaluwarsa, rendering teks berbahaya, lifecycle request, siklus cuaca, resource grafis, penghalang tipis, posisi kamera, dan seluruh 12 tempat pertemuan. Pengujian Three.js memakai geometri asli dan renderer pengujian. Browser langsung pada sesi ini masih gagal membaca halaman; belum ada pengukuran FPS GPU nyata atau verifikasi screenshot pada perangkat pengguna.

Validasi lokal: seluruh **467 tes PHP (2.950 assertion)** dan **108 tes JavaScript** lolos. Build Vite berhasil. Entry office sekitar 30 KB minified / 11 KB gzip; chunk 3D sekitar 604 KB / 157 KB gzip dan tetap lazy. Pemeriksaan role/pertemuan dan build diulang setelah perbaikan akhir yang relevan.

## Hasil pemasangan hosting

Rilis `ed2a2b4` telah dipasang pada PHP 8.3.36. Backup privat sebelum migrasi ada di `deployment-artifacts/office-world-20261105-085928`: kode, aset, cache dan dump database 4.582.541 byte. Mode direktori 0700 dan dump 0600; kredensial backup sementara sudah dihapus. Migrasi tabel tambahan selesai sebelum kode baru diterbitkan. Cache config/routes/views dan autoload dibangun ulang; aset lama tetap tersedia untuk tab lama.

Health HTTP 200. Feed kehadiran dan endpoint live tanpa login mengembalikan 401. SHA-256 CSS office, entry module serta chunk grafis yang disajikan lewat HTTP cocok dengan repository production. Sembilan route office terdaftar, dan cache lock yang dipakai undangan tersedia.

| Sampel baca controller/service | Waktu (ms) | SQL | Hasil |
| --- | ---: | ---: | --- |
| Feed cold-cache | 8,38 | 2 | 22 anggota, 7.420 byte, cuaca auto / 3 jam |
| Feed warm-cache | 1,54 | 0 | Payload yang sama |
| Halaman Umum | 36,13 | 2 | Panel admin sesuai role; kamera dan pertemuan tersedia |
| Halaman Operasional | 10,80 | 1 | Panel pengelola tersembunyi; kamera dan pertemuan tersedia |
| Live akun pasif | 14,83 | 0 | Tidak ada undangan/pesan, tidak membuat lease pertemuan |

Sampel tidak mencakup bootstrap HTTP penuh, jaringan, terminating middleware, maupun GPU. Profil live memakai akun yang tidak memenuhi syarat pertemuan sehingga tidak memalsukan lease/kehadiran peserta aktif. Tidak ada undangan, perubahan pengaturan, atau pesan production yang dibuat untuk pengujian. Render kedua departemen memakai entry module terbaru dan tidak mem-preload chunk Three.js.
