# Kamera, proyeksi hologram, dan perlengkapan virtual

Kamera follow sekarang meredam perubahan sudut saat penghalang sempit memaksa sudut atas. Jeda pelepasan 350 ms mencegah kamera berganti sudut pada setiap frame di ambang pintu. Kecepatan transisi dibatasi dan follow mengikuti waktu frame. Zoom pilihan pengguna tetap disimpan oleh OrbitControls; batas dekat interior dinaikkan menjadi 2,6 agar wajah tidak memenuhi layar. Transisi dapat sesaat melewati penghalang saat sudut disesuaikan; ini bukan sistem kamera fisik dengan volume sapuan penuh.

Hologram menggunakan latar frame transparan sehingga kawasan terlihat di sela panel, sinar proyektor lebih jelas, scan line, radar berbentuk instancing, cahaya tepi, dan animasi pembukaan. Area teks dokumen tetap mempunyai permukaan berkontras tinggi. Proyeksi 3D tetap lima mesh tanpa tekstur/render target baru; reduced motion menonaktifkan pemindaian bergerak.

## Toko dan permainan pertarungan

Bot **KAIA** menjual perlengkapan di **ATLAS Armory**, posisi x=52/z=35 di sisi timur kampus. Buka ATLAS → petunjuk ke bot → berjalan ke toko → beli → pasang. Harga virtual: Pulse Pistol $250, Nova Rifle $650, Prism Shotgun $550, Aurora Sniper $900. Pembelian memotong dompet yang sudah ada, tersimpan lintas login, dan tidak menggandakan debit saat respons diulang. Toko tidak memberi bonus harian kedua; memakai layanan bonus harian yang sudah ada.

Klik avatar aktif untuk memilih target. **V** atau tombol Tembak memakai senjata terpasang. Saat bersenjata, pemilihan target menjaga kamera sendiri dan tidak otomatis membuka chat. Mode Susanoo menyediakan **G / Panah Indra**, mode Kurama **G / Bijūdama**. Efek dibatasi delapan proyektil aktif, menggunakan geometri/material bersama, dan dibersihkan setelah selesai. Tidak menambah polling; kesehatan dan efek memakai sinkronisasi pilot yang sudah berjalan. Pertarungan memakai pemeriksaan hit langsung server dengan visual proyektil, bukan simulasi balistik atau ledakan area.

Server menentukan harga, kepemilikan, damage, cooldown, mode aktif, jarak tiga dimensi, serta garis pandang. Tembok, net, atap, dan perabot menahan tembakan sesuai tinggi lintasan. Rumah pada permukaan tanah, dokumen hologram, serta perisai respawn merupakan area aman. Hanya avatar yang aktif mengirim posisi di kantor virtual dapat ditargetkan; akun offline, viewer, terkunci, dan owner yang disembunyikan tidak menjadi target. Toko dan serangan dikunci pada mode read-only.

HP habis berarti kalah dalam permainan: avatar langsung ditempatkan di rumahnya dengan 100 HP dan perisai 8 detik, senjata disimpan, serta transformasi diakhiri. Kedua penyerang/target memakai mutex pilot dalam urutan ID yang sama sehingga gerak dan serangan tidak menimpa respawn. Penanda respawn harus diakui browser sebelum menerima gerakan berikutnya. Paket sebelum kalah tidak dapat mengembalikan avatar ke lokasi lama. Browser versi sebelum rilis tidak dapat diserang sampai diperbarui agar tidak terjebak tanpa dukungan penanda ini.

Inventory memakai satu tabel tambahan `virtual_office_weapons`; wallet/ledger tetap layanan yang sama dengan transaksi dan row lock. Tidak menghapus atau mengubah kolom data lama. Pembayaran virtual tidak memakai uang nyata. Serangan dibatasi cooldown dan budget route tersendiri; permintaan menyertakan CSRF. Respons tidak memuat session/lease pilot, email, atau isi dokumen.

## Referensi visual

Adaptasi game mengambil bentuk panah chakra Susanoo dari [Indra's Arrow](https://naruto.fandom.com/wiki/Indra%27s_Arrow) dan bola energi dari [Tailed Beast Ball](https://naruto.fandom.com/wiki/Tailed_Beast_Ball). Ini geometri prosedural buatan proyek, bukan model resmi anime.

## Verifikasi

Seluruh **180 tes JavaScript** dan **510 tes PHP (4.150 assertions)** lulus. Pengujian mencakup transisi kamera berulang, batas zoom dan inersia, render scene, cleanup geometri/material, transaksi/idempotensi, role dan read-only, pembatasan mode jurus, penghalang/jarak, cooldown, perisai, serta paket gerak lama setelah respawn. Build berhasil: entry kantor 92,60 kB / gzip 32,96 kB; scene lazy 682,92 kB / gzip 185,60 kB. Peringatan chunk >500 kB tetap ada. Scene dasar tetap di bawah 750 mesh pada pengujian 24 avatar rinci; hanya tiga collider toko/NPC ditambahkan (total metadata 206).

## Produksi

Rilis `de3b7236b0b418334fb0699cb7e08d43f2c60a99` sudah dipasang. Migrasi inventaris berhasil pada PHP server 8.3.36. SHA-256 aset publik combat/hologram, entry kantor, scene, permainan dan musik cocok dengan kode build. Health 200; endpoint combat, hologram dan kantor menolak tamu dengan 401. Budget GET combat 600/menit, serangan 900/menit, pembelian 180/menit, terpisah dari gerak.

Render owner, anggota Umum dan Operasional berhasil. UI toko/kesehatan/jurus mengikuti izin; identitas owner tetap privat. Scope tracking dan form TOR asli tetap lolos pemeriksaan tanpa sidebar/app-shell kedua. Metadata fisik 206 collider cocok dengan scene, posisi berdiri di depan toko bebas dan counter padat. Sampel proses server: kantor anggota 12,55 ms / 1 query, tracking Operasional 3,42 ms / 0 query, presence warm 1,87 ms / 0 query. Ini bukan waktu muat browser atau FPS.

Backup kode/aset dan database: `/home4/suc45578/deployment-artifacts/office-armory-camera-20261106-150359`, dump 4.670.284 byte, direktori 700 dan dump 600. Kredensial sementara dihapus. Hanya migrasi tabel inventaris baru yang dijalankan; rollback kode tidak menghapus tabel inventaris. Pemeriksaan produksi tidak membuat pesanan/dokumen, menembak pemain, atau memberi grant/sesi kehadiran buatan.

Konektor browser masih gagal memilih tab dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Tampilan interaktif dan FPS GPU belum diverifikasi langsung. Pengujian otomatis tidak menjamin bebas bug pada seluruh perangkat atau koneksi.
