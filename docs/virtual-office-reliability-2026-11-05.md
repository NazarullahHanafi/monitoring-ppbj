# Perbaikan alur gerak, pose, dan permainan — 5 November 2026

## Penyebab yang direproduksi

Perbaikan sebelumnya belum menutup beberapa alur pengguna. Batas prediksi empat unit dapat menjeda avatar setiap sekitar setengah detik saat berlari. Jarak dalam paket yang masih diproses juga ikut dianggap jarak yang belum dikirim. Sesudah arena ditutup, instance permainan tetap `visible(false)` ketika dibuka kembali. Hotspot permainan hanya mencakup papan kecil. Klik sasaran panahan hanya mengubah bidikan tanpa menembakkan panah. Pose santai ditolak di posisi awal karena bukan zona rekreasi bernama, dan arah rebahan harus kebetulan mempunyai ruang kosong.

## Gerak dan sinkronisasi

Konfigurasi gerak sekarang dibaca PHP dan JavaScript dari `resources/data/virtual-office-motion.json`. Interval bergerak 150 ms setelah respons sebelumnya, diam 1.200 ms, maksimal 64 titik lintasan. Kredit lintasan server sampai 12 unit mengakomodasi variasi waktu request; laju rata-rata tetap dibatasi 9,2 unit/detik. Sweep collider, batas kawasan, sesi, nomor urut, dan pemeriksaan lokasi pembelian/game tetap berlaku.

Klien membedakan jarak yang sedang dikirim dari jarak baru yang belum dikirim. Gerakan tidak dijeda hanya karena sebuah paket masih dalam perjalanan. Prediksi tetap dibatasi 10,5 unit yang belum dikirim, serta dijeda jika request benar-benar macet. Request tetap satu per satu. Status koneksi pulih ditampilkan setelah berhasil; koreksi posisi yang aman mempertahankan tombol arah yang sedang ditekan. Form teks tetap melindungi input WASD; fokus tombol HUD tidak lagi menghalangi berjalan, sedangkan Space pada tombol tetap menjalankan akses keyboard tombol.

Collision pemain masih mencegah saling menembus. Namun bila pembaruan rekan membuat dua avatar sedikit bertumpuk, pengguna dapat berjalan menjauh dan tidak terkunci di dalam capsule. Ketika stamina boost habis, avatar melambat menjadi jalan, memulihkan stamina, lalu dapat boost lagi. Tidak ada fast travel baru.

## Pose dan animasi

Empat pose bekerja pada posisi awal dan area lapang lainnya, selain rumah dan tujuan rekreasi. Untuk rebahan/tidur, sistem mencari satu dari 12 arah yang tidak mengenai furnitur atau pemain lain, tanpa memindahkan titik avatar. Area yang terlalu sempit atau avatar belum mendarat mendapat penjelasan. Lintasan bergerak berikutnya atau tombol Berdiri mengakhiri pose.

Animator bersama memberikan transisi badan, ayunan lengan/kaki, langkah lari yang lebih besar, lean saat berlari, pose melompat, napas idle/tidur, kedipan, dan posisi meditasi yang berbeda. Transisi diinterpolasi; reduced motion tetap dihormati. Metadata pose ikut dilaporkan ke UI dan disinkronkan. Bola dunia mendeteksi pemain manual yang sedang bermain, termasuk malam hari; sebelumnya hanya NPC dengan pose `playing` yang memicu geraknya.

## Klik dan siklus permainan

Papan dan seluruh permukaan arena/meja menjadi hotspot dalam mesh yang sama, tanpa menambah jumlah draw call. Klik tetap memerlukan kedekatan. Tombol **Main / interaksi (E)** menjadi alternatif. Memilih permainan yang jauh menunjukkan tujuan dan tidak lagi menarik kamera keluar dari kontrol pengguna. Tujuan yang dipilih saat scene sedang dimuat dipertahankan sampai kendali siap.

Arena yang sudah dimuat selalu mengaktifkan loop animasinya lagi ketika dibuka. Pilihan arena diserialkan dengan nomor generasi, sehingga menutup panel atau memilih permainan lain saat modul dimuat tidak mengaktifkan permainan lama. Kegagalan impor tidak lagi menghasilkan dereference `play.network` pada instance null. Mode ringan menyembunyikan HUD kendali agar tidak menawarkan tombol tanpa scene 3D.

Klik sasaran/permukaan mini-game sekarang menjalankan aksi melalui handler yang sama dengan tombol pukul/tembak. Duel tetap melalui request server dan pemeriksaan giliran/revisi; klik tidak mengubah skor jaringan secara lokal. Catur tetap memakai klik bidak/kotak, UNO memakai kartu. Panel yang jauh menyembunyikan kanvas lama dan menjelaskan cara menuju arena, sehingga tidak terlihat seperti permainan beku.

## Verifikasi

- **490 tes PHP / 3.549 assertions** lulus. Paket lari 7,2 unit per 800 ms diterima berurutan; perpindahan besar tetap ditolak dan posisi kanonis dipertahankan. Seluruh pose diterima di spawn biasa. Otorisasi, dompet, checkout, menu bisnis, dan privasi owner ikut regresi.
- **139 tes JavaScript** lulus. Tes gabungan menjalankan modul input/sinkronisasi dan fisika asli dengan jam/request terkontrol pada latency 30, 150, 400, dan 700 ms: tidak ada frame idle selama tombol lari ditahan. Pengujian dilanjutkan sampai stamina habis/pulih. Sambungan 2 detik dijeda secara terbatas tanpa kembali ke komputer.
- Mini-game asli diuji setelah tutup/buka dan pergantian seluruh 13 permainan, termasuk perpindahan saat impor tertunda. Frame panahan benar-benar maju setelah arena dibuka ulang; klik sasaran meluncurkan panah, panel tersembunyi tidak menembak.
- Raycaster Three.js aktual diuji dengan klik permukaan lapangan dari proyeksi kamera. Scene tetap di bawah 750 mesh pada kapasitas tes; pose spawn bertahan melalui polling rekan, pose dilaporkan dengan benar, dan bola pemain manual bergerak saat malam.
- Build produksi berhasil: entry kantor sekitar 67,1 KB minified / 23,6 KB gzip; scene lazy termasuk Three.js sekitar 641,8 KB / 171,3 KB gzip; game sekitar 17,8 KB / 8,1 KB gzip. Aset utama aplikasi tetap sama.
- Konektor browser kembali dicoba pada tab Kantor Virtual dan tetap gagal dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Tidak mengklaim pemeriksaan visual interaktif, FPS, atau jaminan tidak ada bug pada semua perangkat/jaringan. Tes di atas memverifikasi alur konkret yang telah direproduksi.

Pemasangan menggunakan backup privat kode/aset/data/database, tanpa migrasi skema dan tanpa membuat sesi/pesan/pesanan/bonus fiktif untuk pemeriksaan produksi. Aset lama dipertahankan bagi tab lama; pengguna perlu memuat ulang untuk mendapatkan modul yang baru.
