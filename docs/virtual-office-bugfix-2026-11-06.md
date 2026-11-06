# Perbaikan kestabilan kantor virtual — 6 November 2026

Rilis ini hanya memperbaiki bug. Tidak ada tambahan permainan, kostum, atau aturan ekonomi. Validasi gerak dan otorisasi server tidak diubah.

## Temuan dan perbaikan

- **Avatar kaku saat jurus:** timestamp event server dibandingkan dengan timestamp yang telah dikonversi ke waktu browser. Saat jam berbeda, event yang sama membuat ulang efek dan mengulang pose setiap frame. Deduplikasi kini memakai timestamp server secara konsisten, mengabaikan snapshot lama, dan tidak mengulang efek lokal setelah acknowledgement. Efek remote memakai umur event sebenarnya.
- **Transformasi dan kamera terulang:** estimasi waktu menggunakan titik tengah pengiriman/penerimaan dan sampel respons dengan latensi terendah dalam periode satu menit. Grant yang sudah kedaluwarsa tidak dihidupkan lagi oleh koreksi jam. Jurus singkat tidak menimpa pose terbang atau mendarat.
- **Informasi rumah sulit ditutup:** tombol × melekat di bagian atas panel ketika digulir. Escape menutup editor/panel teratas atau detail sebelum keluar dari fullscreen fallback. Pembaruan presence dan hasil lazy loading tidak membuka kembali rumah yang sudah ditutup. Request jurnal dibatalkan saat detail ditutup atau anggota terpilih hilang dari direktori.
- **Pratinjau rumah meninggalkan kamera:** kamera, target, mode, batas zoom, dan transisi sebelumnya disimpan sekali dan dipulihkan saat detail ditutup. Membuka pratinjau berulang tidak menimpa titik kembali. Posisi avatar tetap mengikuti kendali pengguna.
- **Kamera mengarah ke posisi lama:** saat kendali diambil kembali, posisi visual avatar diperbarui sebelum kamera dibingkai. Keluar rumah memulihkan kamera relatif terhadap perpindahan avatar selama di dalam rumah. Inersia drag lama dibersihkan sebelum transisi kamera; mode orbit mengembalikan FOV yang benar. Fallback penghalang menghormati batas jarak interior.
- **Pose berkedip saat polling:** sinkronisasi roster tidak mereset skala mata avatar manual. Reduced motion menyelesaikan transisi kamera yang sedang berjalan, sehingga kamera tidak tertinggal di antara dua posisi.

## Verifikasi lokal

- Seluruh tes JavaScript: **160 lulus**, termasuk refresh panel yang sudah ditutup.
- Regresi mencakup selisih jam ±2 jam, acknowledgement lokal, snapshot lama, deadline transformasi, inersia OrbitControls asli, batas zoom interior, pergantian avatar dalam rumah, posisi saat reclaim, pratinjau rumah berulang, pose santai, gerak berlatensi, collision, fullscreen, dan pembersihan resource.
- Build Vite berhasil. Entry kantor 82,02 kB / gzip 29,52 kB; scene lazy 674,27 kB / gzip 182,26 kB. Peringatan chunk scene >500 kB tetap ada; modul scene tetap dimuat secara lazy.
- Seluruh tes PHP: **496 lulus, 3.677 assertions**. Aturan collision, batas kendali, autentikasi, privasi, serta fitur bisnis yang ada tetap lulus.

## Pemeriksaan produksi

Perbaikan aplikasi `c1f388646752cd00e28375d80434d35acca4b075` sudah diterapkan ke cPanel. SHA-256 CSS dan seluruh chunk kantor yang diperiksa sama antara server aplikasi dan respons HTTPS publik. Health endpoint memberi **200**; endpoint live, presence, pesan, permainan, dan recreation memberi **401** untuk tamu.

Render halaman owner, anggota umum, dan operasional berhasil dengan status 200. ID detail, tombol tutup, dan tombol lihat rumah tersedia tepat sekali. Pemeriksaan privasi owner, konfigurasi kendali, 203 collider, dan lazy loading tetap lulus. Sampel presence warm 1,75 ms tanpa query; render anggota 10,99 ms dan operasional 9,41 ms, masing-masing satu query. Angka ini waktu pemrosesan server pada satu sampel, bukan waktu muat atau FPS browser.

Backup sebelum rilis: `/home4/suc45578/deployment-artifacts/office-bugfix-20261106-091421`. Backup mencakup kode, aset, dan dump database 4.653.804 byte. Direktori berizin 700, dump 600, dan berkas kredensial sementara sudah dihapus. Tidak ada migrasi skema atau perubahan konfigurasi keamanan. Pemeriksaan tidak membuat sesi kehadiran, pesanan, atau grant jurus percobaan di produksi.

Pemeriksaan visual interaktif belum berhasil: browser terdeteksi, tetapi membuka tab mengembalikan `Cannot read properties of undefined (reading 'timeoutMs')`. Pengujian scene memakai geometri Three.js dan renderer uji; ini bukan verifikasi FPS, GPU, atau tampilan langsung pada browser pengguna. Hasil pengujian tidak menjadi jaminan bebas seluruh bug pada semua perangkat dan kondisi jaringan.
