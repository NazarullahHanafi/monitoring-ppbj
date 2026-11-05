# Kantor Virtual — Rivage Club, 5 November 2026

## Cara menggunakan

Pada `/virtual-office`, buka **Main & ajak teman**, **Bar & restoran**, atau **Musik saya**. Tombol area permainan juga membuka arena yang dapat dimainkan. Klub dan chat tetap tersedia di layar penuh maupun mode ringan.

- Tersedia 13 mini-game: panahan, biliar, badminton, tenis, tenis meja, foosball, basket, mini golf, bowling, dart, balap arcade, UNO latihan, dan catur latihan. Arena dimainkan di kanvas 2D yang terhubung dengan area/alat avatar di kampus 3D. Biliar memakai stik, tumbukan bola, gesekan, pantulan, dan lubang; panahan memakai anak panah dengan waktu terbang/gravitasi. Catur mencakup validasi skak, skakmat, pat, rokade, en passant, dan promosi otomatis menjadi menteri. UNO adalah aturan latihan dua pemain tanpa mekanisme challenge Wild +4.
- Badminton, tenis, tenis meja, dan foosball mendukung **duel giliran langsung**, disinkron server setiap 2,5 detik. Ini bukan simulasi multiplayer frame-per-frame. Pengguna online harus menerima undangan; undangan kedaluwarsa 3 menit. Pertandingan berlaku maksimal 30 menit. Lawan offline langsung tersedia sebagai **NPC**; akun manusia tidak mendapat undangan, tidak dianggap online, dan tidak diubah. Game lainnya merupakan latihan lokal melawan komputer atau sasaran fisika, tanpa hadiah saldo.
- Bar/restoran menyediakan 44 menu dengan harga berbeda: masakan Prancis, bakery/dessert, minuman tanpa alkohol, nasi Padang, ayam pop, rendang, dan lainnya. Pesanan tersimpan milik akun sendiri; pilih **Nikmati** untuk menggunakan satu porsi. Tujuan: bar, pantai, taman, teras pegunungan, lounge. Piring/cangkir tampil selama 15 menit. Perpindahan menggunakan navigasi kampus dan menghindari furnitur/net. Avatar yang berangkat dari rumah tiba melalui pintu masuk kampus sebelum berjalan.
- Saldo adalah **uang virtual permainan**, bukan layanan pembayaran. Bonus $1.000 diberikan pada Login event atau akses klub pertama di hari tersebut, sekali per kalender WIB. Tidak ada transfer, pembelian saldo, pembayaran nyata, perjudian, atau penarikan uang. Hari tanpa login/kunjungan klub tidak dikreditkan retroaktif.
- Musik: enam pola instrumental orisinal disintesis lokal (pop, rock, jazz café, lo-fi, acoustic, tropical). Lagu pribadi dapat diputar dari berkas audio perangkat sampai 60 MB tanpa upload. Klik Putar diperlukan; volume pribadi dan jeda tersedia. Halaman yang tidak aktif menghentikan audio dan animasi mini-game.
- Klik avatar online untuk membuka kolom pesan langsung, tanpa berpindah ke Chat Tim. Pesan hanya dapat dibaca pengirim/penerima, termasuk gelembung di atas kepala. Riwayat dibatasi 40 pesan terakhir dalam tujuh hari; pembersihan harian `office:prune-messages`. Pertemuan tatap muka lama juga menggunakan penyimpanan privat baru, tidak lagi membuat mention publik.

## Keamanan dan integritas

Semua endpoint memerlukan autentikasi dan pembatasan request. Akun inactive, departemen lain, Viewer, serta mode read-only tidak dapat melakukan mutasi. Viewer tetap dapat memakai musik dan latihan lokal. Preferensi privasi owner tersembunyi tetap berlaku; owner tidak dimasukkan ke roster, undangan, atau chat avatar.

`virtual_office_wallets` diserialisasi dengan row lock. Bonus unik berdasarkan pengguna/tanggal, tercatat pada ledger, dan tidak diberikan dalam mode read-only. Harga hanya berasal dari katalog server. Order memakai UUID idempotensi; retry identik tidak mengurangi saldo lagi, payload berbeda ditolak. Saldo tidak cukup membatalkan seluruh transaksi. `virtual_office_servings` membuat retry penggunaan porsi aman, termasuk setelah order habis. Saldo/pesanan/transaksi hanya dikembalikan kepada pemilik.

Pesan mempunyai pengirim dari sesi, penerima yang diverifikasi aktif/terlihat/online, UUID idempotensi, panjang 350 karakter, dan tampilan `textContent`. Query selalu dibatasi kedua sisi kepemilikan; menebak target bukan akses ke percakapan orang lain. Endpoint pertemuan lama tetap memerlukan kesiapan tatap muka kedua peserta.

Game memakai mutex cache, peserta terikat sesi, persetujuan hanya penerima, nomor revisi, giliran, serta perhitungan skor di server. Klien tidak mengirim skor. NPC tidak mengubah kehadiran atau dompet akun yang diwakilinya. Tidak ada hadiah uang untuk skor latihan yang dihitung lokal.

## Performa dan validasi

- 475 tes PHP lulus, 3.034 assertions; 116 tes JavaScript lulus.
- Uji mencakup bonus harian pada pergantian WIB, retry order/porsi, saldo tidak cukup, harga palsu, IDOR, peran, read-only, pesan privat/XSS, undangan/penolakan/giliran/revisi/NPC, fisika permainan, langkah catur, audio tanpa autoplay, dan penghentian timer.
- Uji Three.js memakai geometri sebenarnya dengan renderer pengujian: maksimal 24 avatar detail, mesh di bawah 750, semua koordinat valid, rute lima tujuan santai, NPC dari rumah ke panahan, cakupan kamera ponsel sampai pantai, semua 12 titik pertemuan, serta disposal resource/frame.
- Build sukses. Bundle aplikasi utama tidak berubah; scene Three.js, mini-game, dan musik dimuat terpisah sesuai kebutuhan. Mini-game maksimal 30 FPS; poll tunggal dibatalkan saat halaman tidak aktif. Poll pesan/game dikecualikan dari penghitung traffic biasa.
- Bundle kantor sekitar 44,5 KB minified / 15,5 KB gzip; mini-game 17,8 KB / 8,0 KB; musik 2,3 KB / 1,3 KB; scene 608,4 KB / 158,7 KB termasuk Three.js. Peringatan ukuran chunk Vite berasal dari scene dinamis tersebut.
- Pemeriksaan browser/screenshot dan FPS GPU perangkat belum dapat dilakukan: konektor browser gagal saat membuka tab dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Tes geometri dan interaksi tidak menggantikan pemeriksaan visual GPU.

## Verifikasi produksi

Rilis aplikasi `0c945720b340574983a3cec4c0d9edaab8cbdefd` berhasil dipasang di `https://sucofindoumumpku.com/virtual-office` pada 5 November 2026. Migrasi kelima tabel sukses pada PHP 8.3.36. Autoload/config/event/route/view cache dibangun ulang. Lima aset CSS/JS terverifikasi SHA-256 terhadap berkas repository. `/up` HTTP 200; endpoint presence/live/messages/game/recreation mengembalikan 401 tanpa login.

Pemeriksaan server terautentikasi tanpa mengirim pesan, membuat undangan/pesanan, memberi saldo buatan, atau heartbeat palsu:

| Pemeriksaan | Waktu proses layanan | SQL |
|---|---:|---:|
| Presence dingin, 22 anggota / 7.832 byte | 8,66 ms | 2 |
| Presence hangat | 1,44 ms | 0 |
| Render halaman Umum | 32,64 ms | 3 |
| Render halaman Operasional | 7,97 ms | 1 |
| Poll pesan | 16,36 ms | 1 |
| Poll permainan kosong | 1,54 ms | 0 |
| Baca dompet melalui layanan, tanpa pemberian bonus | 4,15 ms | 3 |

Ini waktu pemrosesan PHP pada server, bukan latency jaringan atau FPS browser. Render memastikan ID panel unik dan modul scene/game/musik tetap lazy. Katalog terverifikasi 44 item.

Backup privat sebelum migrasi: `/home4/suc45578/deployment-artifacts/office-club-20261105-093315` (direktori 700), mencakup kode/aset/cache dan database 4.587.565 byte (600). Berkas kredensial dump sementara telah dihapus. Aset di webroot diterbitkan sebelum manifest; aset versi lama tetap tersedia bagi tab yang masih terbuka. Migrasi bersifat aditif dan tidak menghapus data lama.
