# Kantor Virtual SIMONPR — 4 November 2026

## Pengalaman yang dibuat

Menu **Kantor Virtual** tersedia bagi Umum, Operasional, dan viewer melalui sidebar desktop/mobile di `/virtual-office`. Ruangan dibuat sendiri menggunakan three.js: dua area kerja Umum/Operasional, meja dan monitor, partisi kaca, tanaman, rak buku, lounge, serta pantry kopi. Model/tekstur dari situs referensi tidak disalin. Lisensi three.js disertakan di aset publik.

Halaman menyediakan:

- Ruang 3D dengan kontrol putar/geser, zoom, reset, fokus area, jeda animasi, dan layar penuh.
- Mode ringan tanpa WebGL, pencarian/filter bidang pada daftar tim, serta jumlah online/jeda/offline.
- Klik avatar atau anggota di daftar untuk membuka detail; viewer tetap dapat membaca.
- Tombol **Sebut di Chat Tim** membuka draf mention di chat yang sudah ada. Draf lama dipertahankan, tidak ada pesan yang otomatis dikirim. Viewer dan avatar diri sendiri tidak dapat memakai aksi ini.
- Tautan langsung ke Kalender Kolaborasi dan Action Inbox.
- Warna mengikuti tema terang/gelap. Preferensi reduced-motion menghentikan animasi berulang secara default.

## Kehadiran dan animasi

Status diambil dari cache presence yang sudah ada. Heartbeat yang sama kini membawa satu boolean `idle` setelah sekitar tiga menit tanpa interaksi pada halaman; tidak ditambah request heartbeat baru. Sinyal hanya menghitung waktu sejak input, tanpa merekam isi tombol, teks, atau koordinat pointer.

- Online: duduk di meja dengan gerak mengetik ringan.
- Idle: secara deterministik minum kopi, menikmati camilan, atau tertidur di lounge.
- Offline: avatar beristirahat di lounge.

Pose merupakan ilustrasi status aplikasi, bukan aktivitas fisik yang sebenarnya, absensi, atau penilaian produktivitas. Keterangan ini tersedia pada halaman dan detail anggota. Status lintas pengguna mengikuti heartbeat dua menit dan TTL presence lima menit yang sudah ada, ditambah pembaruan feed; perubahan tidak dijanjikan instan. Avatar diri sendiri menggunakan sinyal interaksi lokal pada halaman yang sedang dibuka.

Akun owner Nazar yang sebelumnya disembunyikan tetap dikecualikan. Akun nonaktif dan department lain tidak ditampilkan. Tidak dilakukan perubahan hak akses akun atau data transaksi pengadaan.

## Anggaran performa

- Roster dibatasi 120 orang; query mengambil maksimal 122 kandidat. Directory disimpan 60 detik dan dihapus dari cache saat akun disimpan/dihapus, termasuk perubahan nama, department, dan penguncian akun.
- Directory hanya mengembalikan id, nama, dan department. Status/mood diambil dengan satu pembacaan cache massal; email, role, alamat IP, dan session tidak masuk payload feed.
- Tes feed: satu query SQL ketika directory cache kosong, nol SQL saat hangat. Angka tersebut tidak mencakup bootstrap/middleware autentikasi HTTP penuh.
- Snapshot awal disertakan di HTML sehingga tidak ada request feed saat startup. Pembaruan berikutnya setiap 45 detik setelah request sebelumnya selesai; satu request aktif, timeout 12 detik mencakup pembacaan JSON, serta pembatalan ketika tab tersembunyi/halaman ditinggalkan. Respons lama tidak menimpa data baru. 401/403 menghentikan pembaruan otomatis.
- Modul controller sekitar 10,9 KB minified / 4,6 KB gzip. Mesin+scene 3D merupakan dynamic chunk terpisah sekitar 567 KB minified / 144 KB gzip dan dimuat hanya di halaman ini saat mode 3D terlihat. Halaman lain tidak memuat three.js. Mode ringan yang sudah dipilih tidak mengunduh chunk 3D.
- Render dibatasi 30 fps, pixel ratio maksimal 1,5, maksimal 24 avatar pada scene; daftar tetap mencakup roster hingga 120. Furniture statis digabung berdasarkan material, tanpa shadow-map pass. Seluruh avatar tidak harus terlihat serentak; anggota tetap dapat dipilih dari daftar.
- Animasi dihentikan saat tab/area tidak terlihat. Mode ringan melepaskan renderer, frame, observer, geometry, material, dan texture. Tidak ditambah library server, migrasi, job queue, atau query pengadaan pada feed.

Build memberi peringatan chunk 3D lebih dari 500 KB minified; chunk tersebut sengaja dimuat secara dinamis dan tidak digabung ke entry aplikasi utama. Peringatan tidak disembunyikan dengan menaikkan ambang batas. Perangkat tanpa WebGL memakai mode ringan.

## Verifikasi

- **453 tes PHP / 2.834 assertions lulus.** Sebelas tes baru memeriksa autentikasi/department, akses viewer, owner tersembunyi, fresh presence pada warm directory, invalidasi penguncian akun, batas roster, validasi idle, isolasi loading 3D, dan pencegahan keluar dari script JSON lewat nama pengguna.
- **96 tes JavaScript lulus.** Sepuluh tes baru memeriksa pose/status, request single-flight/timeout/hidden page, nama HTML sebagai teks inert, draf chat tanpa pengiriman, perlindungan viewer, dynamic-import race, perpindahan mode ringan, pembentukan geometri, batas avatar/pixel ratio, kamera ponsel, dan pelepasan resource.
- Tes struktur HTML juga mencakup Kantor Virtual agar ID/script tidak ganda.
- Tes scene membentuk model dengan geometry three.js sebenarnya dan renderer/controls tiruan; ini memverifikasi konstruksi/model/lifecycle, **bukan render WebGL aktual atau FPS perangkat pengguna**.
- Build Vite berhasil, npm audit nol kerentanan, serta pemeriksaan format PHP terkait berhasil.

Verifikasi browser visual belum dapat diklaim: koneksi kontrol tab browser pada sesi ini bermasalah, termasuk saat mencoba membuka halaman setelah rilis. Tampilan WebGL, performa GPU, dukungan fullscreen, dan kenyamanan interaksi pada perangkat pengguna tetap memiliki batas verifikasi tersebut.

## Hasil deployment production

Rilis aplikasi **`89b1001`** sudah dipush dan dideploy. Backup kode, cache, shell, manifest, dan aset webroot tersimpan privat pada `deployment-artifacts/virtual-office-20261104-163300`. Tidak ada migrasi atau perubahan transaksi. Autoload dioptimalkan kembali dan cache config/routes/views dibangun tanpa flush Redis.

Pemeriksaan PHP hosting 8.3.36 berhasil. Dua route baru aktif. `/up` setelah deploy HTTP 200 (satu sampel sekitar 141 ms), halaman login HTTP 200, halaman kantor tanpa login diarahkan 302, dan feed tanpa login 401. CSS office, shell, stylesheet aplikasi, entry module, dan chunk 3D yang disajikan lewat HTTP memiliki SHA-256 yang sama dengan berkas repository production. Aset build lama di webroot dipertahankan untuk tab yang masih memakai HTML sebelumnya.

Profil baca controller (origin production eksplisit, tanpa login baru atau perubahan data bisnis):

| Skenario | Waktu sampel (ms) | SQL | Hasil |
| --- | ---: | ---: | --- |
| Feed pertama | 35,53 | 1 | 200, 22 anggota, payload 2.266 byte |
| Feed hangat | 1,20 | 0 | 200, tidak ada field email/role/password/IP |
| Halaman kantor Umum | 24,20 | 1 | 200, entry module ada, chunk 3D tidak dipreload |
| Halaman kantor Operasional | 6,16 | 0 | 200, entry module ada, chunk 3D tidak dipreload |

Query halaman inti tetap terjaga setelah rilis. Tiga sampel berurutan per endpoint seluruhnya berhasil; query hangat PPBJ/SP/SPPH/TORPR tetap **5/5/3/6**. Median controller/render pada sampel ini masing-masing 26,91 / 28,98 / 26,60 / 21,42 ms.

Angka profil tersebut tidak mencakup bootstrap HTTP penuh, middleware/terminate, TLS/jaringan, rendering GPU, atau FPS perangkat. Itu bukan jaminan latensi end-to-end atau performa pada semua laptop. Tidak dilakukan stress test production maupun pengiriman chat percobaan atas nama pengguna.

## Catatan penggunaan

Buka Kantor Virtual setelah login. Jika tab lama masih memakai shell sebelumnya, refresh sekali untuk menerima sinyal idle dan integrasi mention yang baru. Pengguna dapat memakai mode ringan dan jeda animasi kapan saja. Tidak ada janji seluruh perangkat/hosting selalu bebas lag; kondisi kapasitas server bersama dari audit sebelumnya tetap relevan.
