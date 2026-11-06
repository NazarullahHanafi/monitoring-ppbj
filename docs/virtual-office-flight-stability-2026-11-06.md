# Stabilitas lompatan, terbang, dan visual dokumen hologram

Lompatan berulang dapat dikoreksi server meski avatar sempat mendarat: pembaruan posisi 150 ms terkadang tidak menangkap satu frame saat menyentuh tanah. Validasi sekarang memeriksa pendaratan pada seluruh jejak gerak yang sudah diperiksa tabrakannya. Timer udara dimulai ulang setelah pendaratan tersebut; batas kecepatan, jarak, waktu udara, dan dua lompatan tetap berlaku. Pose naik/turun mengikuti kecepatan vertikal dengan transisi mendarat yang singkat.

Terbang yang diizinkan jurus kini memakai ketinggian penghalang di browser dan server. Kaki harus melewati puncak rumah, tembok, atau net beserta jarak aman sebelum avatar boleh melintas. Di bawahnya penghalang tetap padat. Area kampus dan batas ketinggian 18 tetap berlaku. Status akses udara diturunkan server dari penerbangan sah, bukan input pengguna. Mode Kurama tetap tidak dapat memalsukan penerbangan.

Rumah mempunyai batas atap bersama untuk tabrakan. Mode yang berakhir di atas rumah mendarat pada atap; avatar dapat melompat dari atap, berjalan ke tepi, lalu turun ke tanah. Akses udara berakhir saat mencapai permukaan biasa. Melintas tinggi di atas rumah tidak lagi memicu kamera interior. Atap memakai volume pembatas konservatif, bukan simulasi permukaan genteng miring.

Isi dokumen hologram mendapat palet kaca biru kehijauan dengan aksen emas, grid lembut, robot SVG dengan animasi melayang/berkedip, dan pengatur tema terang/gelap. Robot juga hadir pada header form TOR. Teks, kolom isian, tabel, select2, dan hero tracking mengikuti palet dokumen. Animasi CSS menghormati reduced motion. Tidak menambah request polling atau objek animasi pada scene. Form, penyimpanan, batas departemen, kepemilikan, CSRF, dan privasi hologram tetap menggunakan alur yang sudah ada.

## Verifikasi

- Jejak fisika asli browser: 360 frame lompatan berulang / 60 paket; 720 frame terbang, membatalkan mode, berdiri dan melompat di atap, lalu turun / 120 paket. Jejak diputar ulang melalui endpoint server dan dibandingkan dengan fisika browser.
- Regresi meliputi net/tembok pada ketinggian rendah, mode tanpa izin terbang, kedaluwarsa/cooldown jurus, dua lompatan, animasi mendarat, interior, privasi, dan izin dokumen.
- Pasangan warna utama/sekunder/aksen emas dengan tiga permukaan dan warna teks tombol diuji memiliki rasio kontras minimal 4,5:1 pada kedua tema. Ini pemeriksaan palet, bukan seluruh piksel tampilan.
- Konektor browser masih gagal memilih tab dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Pemeriksaan visual interaktif serta FPS GPU belum dapat dilakukan; hasil pengujian kode tidak menjamin tidak ada bug pada semua perangkat.

Seluruh **175 tes JavaScript** dan **503 tes PHP (4.091 assertions)** lulus. Build berhasil: entry kantor 86,45 kB / gzip 31,03 kB, scene lazy 678,01 kB / gzip 183,63 kB. Peringatan chunk scene >500 kB masih ada. Animasi robot tidak menambah dependensi atau aset gambar.

## Produksi

Rilis `cc6a6d6b1bda45673876b56538d83b24b8abb046` sudah dipasang. SHA-256 CSS/frame JS, entry kantor, scene, permainan, musik, dan CSS kantor cocok dengan respons HTTPS publik. Health 200; endpoint pribadi hologram dan kantor memberi 401 bagi tamu. Pemeriksaan server juga memastikan lintasan tinggi bebas, volume atap rendah padat, dan terbang di atas rumah tidak dianggap interior.

Render owner, anggota Umum, serta Operasional berhasil (200). Semua dokumen mempunyai robot dan tombol tema, tanpa sidebar/app-shell kedua. Umum tetap mendapat scope tracking publik, Operasional memakai form TOR asli. Sampel proses server: create 46,39 ms / 6 query, daftar 23,72 ms / 6 query, tracking Operasional 5,77 ms / 0 query, presence warm 2,10 ms / 0 query. Angka ini bukan waktu muat browser atau FPS.

Backup kode/aset dan database berada di `/home4/suc45578/deployment-artifacts/office-flight-stability-20261106-115114`; dump 4.669.331 byte, izin direktori 700, dump 600, kredensial sementara dihapus. Tidak ada migrasi. Pemeriksaan produksi tidak membuat TOR, pesanan, kehadiran, atau grant jurus.
