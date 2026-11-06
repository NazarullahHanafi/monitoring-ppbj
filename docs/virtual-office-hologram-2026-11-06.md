# Hologram kerja pribadi — 6 November 2026

Klik avatar sendiri atau tombol **Hologram kerja** di menu dalam game. Proyeksi 3D dan menu kaca berwarna biru kehijauan dengan aksen emas muncul di atas avatar. Saat dipilih, alat kerja membuka panel dokumen yang lebih besar di dalam kantor, termasuk pada mode layar penuh. Menu menyesuaikan posisi agar tetap terjangkau pada layar kecil; mode ringan menyediakan akses yang sama tanpa memuat scene 3D.

## Alat dan akses

- Operasional: **Tambah TOR PR**, **Daftar TOR PR**, dan **Tracking PR**. Viewer serta mode read-only tidak mendapat alat membuat TOR. Permintaan langsung ke alat create juga ditolak ketika tidak berhak.
- Umum: **Tracking PR** memakai tampilan dan data pelacakan publik yang memang tersedia bagi departemen ini. Tampilan tracking internal operasional tidak diberikan kepada Umum.
- Pemilik akun yang disembunyikan dari direktori tetap dapat memakai hologram sendiri tanpa dimasukkan ke daftar publik.

Form TOR dan tracking berasal dari halaman yang sudah ada, dengan layout ringkas khusus hologram. Penyimpanan tetap lewat endpoint TOR semula beserta validasi, CSRF, pembuat dokumen, kepemilikan edit, dan pemeriksaan role/read-only. Membuka hologram tidak membuat TOR secara otomatis. Tidak ada perubahan skema database.

## Perilaku dan privasi

Isi panel hanya dimuat pada browser pemilik, tidak disiarkan sebagai label avatar atau pesan kepada rekan. Komunikasi parent–frame hanya memuat status siap, perubahan formulir, Escape, dan aktivitas umum. Tidak mengirim nilai input, nomor PR, teks dokumen, atau tombol yang diketik. Origin, sumber frame, dan kanal navigasi diperiksa untuk menolak pesan halaman lain atau pesan yang terlambat dari dokumen lama.

Panel besar mengunci input gerak serta membersihkan tombol gerak yang tertahan, tanpa melepaskan lease kendali avatar. Halaman embedded tidak memuat app-shell kedua sehingga tidak menumpuk heartbeat atau menarik avatar ke komputer. Isian TOR yang belum disimpan mendapat konfirmasi sebelum close, kembali, reload, atau meninggalkan halaman. Setelah berhasil menyimpan, reload menuju daftar TOR, bukan membuat formulir kosong lagi. Tersedia close, kembali, muat ulang, dan tautan halaman penuh. Timeout menampilkan status yang bisa dipulihkan tanpa retry otomatis berulang.

Hanya satu proyeksi lokal, terdiri dari lima mesh dengan geometri bersama/instancing. Tidak ada tekstur atau render target tambahan. Form dan iframe belum dimuat sebelum pengguna memilih alat; ditutup dengan melepas src iframe. Scene tetap lazy-loaded, animasi tetap mengikuti reduced motion dan mode hemat, dan seluruh geometri/material dibersihkan saat scene ditutup.

## Verifikasi

**169 tes JavaScript dan 501 tes PHP lulus.** Pengujian mencakup pembatasan departemen/viewer/read-only, form asli, query tracking, lease kendali, URL dan pesan frame yang tidak tepercaya, perlindungan isian, navigasi, fallback timeout, pose/kamera lama, serta cleanup geometri. Pengujian tambahan memastikan proyeksi dapat dibuka/ditutup di dalam rumah tanpa mengganggu penggantian kostum, dan token CSRF tidak masuk ke URL pencarian GET. Regresi TOR/tracking/hologram setelah perubahan terakhir: 14 tes PHP, 84 assertions lulus.

Build berhasil. Entry kantor 86,45 kB / gzip 31,03 kB; scene lazy 676,64 kB / gzip 183,21 kB. Peringatan chunk scene >500 kB tetap ada. Pengujian render scene menggunakan renderer uji dan geometri Three.js, bukan pengukuran GPU/FPS. Percobaan membuka browser melalui konektor masih gagal dengan `Cannot read properties of undefined (reading 'timeoutMs')`; pemeriksaan visual interaktif belum dapat dilakukan.
