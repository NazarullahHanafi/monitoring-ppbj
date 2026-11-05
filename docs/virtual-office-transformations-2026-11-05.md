# Transformasi lengkap dan penerbangan — 5 November 2026

## Bentuk dan referensi

Susanoo sebelumnya berjenis `aura`, sehingga hanya mengeluarkan cincin ungu selama 3,8 detik. Sekarang mode transformasi terpisah dari efek jurus singkat. Sasuke berubah menjadi model lengkap: kaki, pelindung lutut, zirah berlapis, pinggang, lengan, topeng, tanduk, permata dahi, pedang, dan dua sayap berlapis yang bergerak saat terbang. Itachi memakai varian warna oranye tanpa kemampuan terbang; Kakashi memakai varian biru bersayap.

Referensi siluet Susanoo diperiksa dari [render Perfect Susanoo](https://www.deviantart.com/blinkjisooxps/art/NSUNS4-Sasuke-perfect-susanoo-835770137). Konteks warna/motif Kurama dan Susanoo juga diperiksa pada [situs resmi Naruto](https://naruto-official.com/en/news/01_1359). Referensi Kurama berbentuk rubah dengan sembilan ekor diperiksa melalui pencarian gambar. Geometri runtime dibuat sendiri dengan Three.js; gambar/model referensi tidak dipasang sebagai aset website.

Kurama mempunyai tubuh rubah, moncong, telinga runcing, mata merah, pola wajah, taring, cakar, dan tepat sembilan ekor melengkung yang bergerak. Preview CPU lokal pertama memperlihatkan celah antarsegmen ekor; model diperbaiki menjadi tube kontinu yang melengkung dan mengecil ke ujung, kemudian dirender ulang untuk pemeriksaan siluet. Susanoo memakai 27 mesh dan Kurama 26 mesh setelah detail statis digabung per material/joint. Joint sayap, ekor, lengan, dan kaki tetap dapat dianimasikan. Preview CPU bukan verifikasi shader WebGL atau FPS.

Katalog kini memuat 53 jurus dan 13 mode transformasi yang digunakan oleh 16 kostum dari lima seri. Pilihannya mencakup Susanoo, Kurama, Super Saiyan, Gear 5, Monster Point, Awakened Demon, Hinokami Awakened, Awakened Piccolo, Full Cowling, Cluster, dan Half-Cold Half-Hot beserta varian Susanoo. Gear 5 mengubah bagian pakaian menjadi putih; Super Saiyan mengganti siluet rambut; mode humanoid tertentu memperbesar tubuh atau menambah tanduk, pola, dan cahaya. Material kostum asli dipulihkan ketika mode selesai dan material pengguna lain tidak diubah.

## Durasi dan kontrol

Mode mulai setelah server mengesahkan cast berdasarkan kostum tersimpan, bukan berdasarkan jam atau permintaan durasi dari klien. Durasi tepat 60.000 ms. Mode aktif tetap ada saat pengguna mengeluarkan jurus biasa; efek singkat tidak mengganti transformasi. Panel menampilkan nama, sisa waktu, progress, kontrol terbang jika sesuai, dan tombol akhiri. Cooldown transformasi 80 detik dihitung sejak aktivasi, sehingga setelah durasi penuh berakhir tersisa 20 detik pemulihan. Membatalkan lebih awal tidak menghapus cooldown. Claim ulang kendali mempertahankan batas pemulihan.

- Sasuke: **T** untuk Susanoo. Naruto: **T** untuk Kurama. Karakter lain mengikuti label Q/R/T pada tombol jurusnya.
- Mode yang memiliki kemampuan terbang memakai **F** untuk terbang/mendarat, **Space** untuk naik, dan **C** untuk turun. Kurama dan mode darat tidak diberi penerbangan palsu.
- Batas tinggi penerbangan 18 meter; laju naik/turun 4 meter/detik. Boost horizontal dan stamina tetap mengikuti aturan sebelumnya. Collision horizontal dan batas kawasan tetap berlaku, termasuk di udara; mode ini tidak memberi izin menembus dinding/net atau terbang melintasi penghalang tersebut. Pagar rendah mengikuti aturan vault yang sudah ada.
- Akhir mode di udara memicu pendaratan perlahan. Server memberi tenggang pendaratan maksimal enam detik dengan batas kecepatan vertikal dan larangan naik kembali. Paket yang sudah dikirim sebelum mode habis mempunyai satu tenggang singkat agar latensi tidak langsung mengoreksi gerak yang sah.

Transformasi besar memerlukan area lapang di luar rumah. Radius gerak mengikuti mode; query collider rumah juga diperluas sesuai radius. Kamera menyesuaikan framing dan jarak minimum sehingga bentuk lengkap tidak terpotong oleh zoom avatar manusia. Label tampil di atas kepala model besar, menunjukkan mode dan status terbang; model juga dapat diklik untuk memilih pemiliknya. Masuk rumah atau menyimpan kostum lain mengakhiri mode. Form milik rekan dibaca dari heartbeat publik, termasuk saat pengguna baru memasuki kawasan.

## Sinkronisasi dan batas

State publik hanya membagikan nama mode, waktu aktivasi/kedaluwarsa/pemulihan, dan status terbang. ID sesi, nonce cast, serta kostum internal validasi tidak ikut dibagikan. State penerbangan harus berasal dari mode bersayap/terbang yang masih sah; payload `flight=true` tanpa grant ditolak. Cast ulang idempoten tidak memperpanjang durasi. Tombol cast yang masih menunggu respons tidak menumpuk cast baru. Kegagalan pembatalan memakai jeda retry, bukan request berulang tanpa jeda. Respons lama tidak menghidupkan mode yang sudah dibatalkan pengguna.

Mode selesai membersihkan mesh/geometri/material miliknya, memulihkan tubuh dan pakaian asli, serta mengembalikan framing kamera. Penghapusan avatar, mode ringan, dan pelepasan kendali membersihkan transformasi. Rekan di luar jarak 55 meter memakai tampilan avatar dasar agar model besar yang jauh tidak menambah beban render; metadata mode tetap ada. Reduced motion dan mode hemat tetap dihormati. Tidak ada perubahan damage, skor, dompet, pesanan, atau otorisasi menu bisnis.

## Verifikasi

- **496 tes PHP, 3.677 assertions** lulus, termasuk replay lintasan lama, durasi 60 detik, hover dengan grant, transisi expiry, pendaratan, larangan Kurama terbang, whitelist kostum, jurus biasa saat mode aktif, idempotensi, serta pembatalan/claim yang tidak memperbarui deadline.
- **153 tes JavaScript** lulus. Seluruh model mempunyai vertex finite dan kurang dari 40 mesh; dua sayap dan sembilan ekor benar-benar berubah rotasi. Mode bertahan melewati efek biasa, kedaluwarsa tepat waktu, dan mengembalikan material/scale/visibilitas. Scene Three.js aktual menguji framing Susanoo, polling tanpa duplikasi, naik di atas tinggi lompat biasa, pembatalan dengan respons lama, dan pendaratan sampai tanah. Input F/C menghormati modal; kegagalan cancel tidak memutar request tanpa jeda.
- Build produksi berhasil: entry kantor 81,39 KB / 29,30 KB gzip; scene lazy termasuk Three.js 673,13 KB / 181,90 KB gzip. Mini-game, musik, dan aset utama aplikasi tetap sama. Peringatan ukuran scene Vite tidak menggagalkan build.
- Konektor browser masih gagal membuka tab baru dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Verifikasi visual dilakukan melalui proyeksi geometri dan rasterisasi CPU lokal; tidak mengklaim pengujian browser interaktif, WebGL nyata, atau FPS perangkat.

Pemasangan memakai backup privat kode/aset/data/database dan tidak membutuhkan migrasi skema. Pemeriksaan produksi tidak membuat sesi/avatar/cast/pesanan/bonus fiktif. Tab lama memerlukan muat ulang agar mendapatkan model dan kontrol baru.

## Hasil produksi

Commit aplikasi `143d1bfe98c45fd6236c6bc20b095909740ed039` terpasang melalui fast-forward. Lint PHP 8.3, autoload Composer, dan optimize Laravel berhasil. Hash SHA-256 CSS, entry kantor, scene, play, dan music melalui HTTPS identik dengan aset rilis. `/up` merespons 200; lima endpoint baca privat merespons 401 untuk tamu.

Render server owner, member Umum, dan Operasional menghasilkan HTTP 200, masing-masing 36,58 / 10,93 / 11,12 ms dengan 3 / 1 / 1 query. Presence cold 9,90 ms dengan dua query; warm 1,70 ms tanpa query. Ini sampel pemrosesan server, bukan waktu muat atau FPS browser. Seluruh ID panel mode tersedia tepat sekali; konfigurasi produksi mempunyai 13 mode, durasi 60/cooldown 80 detik, 53 jurus, batas terbang 18 meter, serta izin terbang Susanoo dan larangan terbang Kurama yang benar. Privasi owner dan lazy loading tetap lolos.

Backup sebelum rilis: `/home4/suc45578/deployment-artifacts/office-transformations-20261105-170622`, mencakup kode/aset/data dan dump database 4.628.846 byte. Direktori berizin 700, dump 600; berkas kredensial sementara sudah dihapus. Tidak ada migrasi skema.
