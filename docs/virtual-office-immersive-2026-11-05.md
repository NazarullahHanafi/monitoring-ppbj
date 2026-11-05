# Pose, layar penuh, gerak, jurus, dan interior — 5 November 2026

## Perbaikan pose

Pemeriksaan ruang rebahan sebelumnya memakai arah negatif Z, sedangkan rotasi tubuh negatif X menempatkan kepala ke arah positif Z. Pemeriksaan arah dan posisi alas sekarang mengikuti geometri tubuh sebenarnya. Jika pose panjang tidak muat, planner mencari titik lapang dalam radius maksimal 3,2 meter yang dapat dicapai tanpa melewati collider atau pemain lain, kemudian avatar berjalan ke sana. Tidak ada teleport. Rute yang terhalang berhenti setelah empat detik dengan pesan. Tombol gerak membatalkan pose meskipun arah gerak terhalang.

Pilihan sebelum claim kendali disimpan dan diterapkan sekali setelah claim berhasil. Pilihan saat melompat menunggu mendarat. Duduk, rebahan, tidur, dan meditasi tetap dibedakan; polling rekan tidak membatalkan pose. Area yang seluruhnya terhalang tetap memberikan penjelasan, bukan memaksakan tubuh melalui furnitur.

## Tampilan game

Mode native fullscreen maupun fallback mengisi seluruh viewport dengan scene. Header, tim, kendali/pose, serta informasi cuaca/fasilitas menjadi overlay; pembukaan panel tidak mengecilkan kanvas. Tim dapat dibuka-tutup di desktop maupun ponsel. HUD kendali tersembunyi saat masuk game penuh dan dapat dibuka melalui **Kendali & pose**. **Informasi & fasilitas** menampilkan cuaca, pengaturan, klub, musik, dan pesanan. **Avatar & kostum** membuka editor milik sendiri dari dalam layar game. Masuk fullscreen dari mode ringan membuka mode 3D.

## Lompat dan collision

Space dapat ditekan dua kali, dengan pelepasan di antaranya. Menahan tombol tidak mengulang lompat. Tekanan ketiga saat masih di udara diabaikan; mendarat mengembalikan dua jatah. Pagar pendek bertag `scenic-fence`, `home-fence`, dan `grand-bar-wall` dengan tinggi maksimal 1,4 dapat dilewati hanya setelah kaki benar-benar lebih tinggi daripada penghalang. Net, meja, dinding tinggi, pintu tertutup, dan batas kawasan tetap solid.

Trail sekarang memuat x/y/z; PHP dan JavaScript memeriksa ketinggian pada interval perpotongan segmen dengan collider. Nilai lama tanpa y tetap diterima sebagai lintasan datar. Server membatasi y hingga 3,2, laju vertikal, durasi udara 1.700 ms, jarak dan kecepatan horizontal, sesi, serta nomor urut. Fixture `tests/Fixtures/virtual-office-double-jump.json` berasal dari fisika klien asli: tes JavaScript mereproduksi fixture persis, lalu tes PHP memainkan ulang seluruh paket melalui endpoint agar perubahan aturan kedua sisi tidak diam-diam bertentangan.

## Jurus kostum

Seluruh 30 kostum mempunyai dua atau tiga jurus yang dapat dipilih melalui tombol atau Q/R/T. Naruto mempunyai Rasengan, Seribu Bayangan, dan aura chakra; karakter lain mempunyai pilihan sesuai karakternya, misalnya Chidori, Kamehameha, pernapasan air, dan es/api. Efek dan geometri dibuat sendiri dengan Three.js. Jurus merupakan aksi visual sosial tanpa damage, perubahan skor, atau pemotongan uang.

Katalog bersama menjadi whitelist server. Server membaca kostum tersimpan saat cast baru, memeriksa UUID idempoten dan cooldown, serta membagikan jenis/timestamp jurus melalui pilot publik tanpa membocorkan ID sesi atau ID cast. Efek berlangsung 3,8 detik, maksimal empat efek bersamaan, dan hanya satu set enam bayangan visual sekaligus. Bayangan memakai ulang geometri kostum; penempatan awal menghindari penghalang, dan bayangan/beam tetap di tempat cast. Panjang beam dibatasi segmen collision. Pose tangan ikut berubah; berjalan/lompat/istirahat tetap mempunyai prioritas animasi yang sesuai. Reduced motion dan mode hemat mengurangi gerak/jumlah partikel. Efek kadaluarsa dan geometrinya dibersihkan saat scene dilepas.

## Interior rumah

Berjalan masuk ke rumah sendiri mengaktifkan tampilan interior: hanya rumah itu, avatar sendiri, lampu, dan efek miliknya yang terlihat. Rumah lain dan kampus disembunyikan; atap serta dinding depan dibuka untuk kamera. Kamera mengikuti avatar dengan rentang 1,7–8 meter dan FOV 58. Koordinat serta collision dunia tetap sama dan pintu tetap memerlukan akses pemilik. Mengganti kostum di dalam tidak membuat avatar pengganti menghilang. Berjalan keluar mengembalikan lingkungan dan kamera sebelumnya. Pengaturan cuaca tidak mengganti latar interior.

## Validasi

- Seluruh **493 tes PHP / 3.597 assertions** lulus, termasuk lintasan lompat asli, batas udara, pemeriksaan jurus/kostum, idempotensi, dan cooldown.
- Seluruh **149 tes JavaScript** lulus: input/claim pose, arah kepala, pencarian ruang, dua jatah lompat, collision ketinggian, fixture lintas klien/server, fullscreen/fallback/panel, efek terikat dan kadaluarsa, isolasi/restorasi interior, pergantian kostum di rumah, serta semua regresi sebelumnya.
- Build produksi berhasil. Entry kantor 75,56 KB / 27,29 KB gzip; scene lazy termasuk Three.js 651,06 KB / 174,87 KB gzip. Mini-game dan musik tetap lazy. Aset utama aplikasi tidak berubah. Peringatan ukuran scene Vite tetap ada; build tidak gagal.
- Konektor browser dapat membaca inventaris tab, tetapi membuka tab pemeriksaan kembali gagal dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Tidak mengklaim verifikasi visual WebGL, native fullscreen nyata, atau FPS perangkat. Tes native fullscreen di atas memeriksa controller dengan API fullscreen terkontrol.

Rilis menggunakan backup privat kode/aset/data/database tanpa migrasi skema. Pemeriksaan produksi hanya membaca/render server dan memeriksa endpoint tamu, tanpa membuat avatar, sesi, pesanan, jurus, atau bonus fiktif.

## Hasil pemasangan produksi

Commit aplikasi `f662b0ee4fb0be49b2ee8429f9a8e29ef349b8ea` terpasang melalui fast-forward. Autoload Composer dan optimize Laravel berhasil. Hash SHA-256 CSS, entry kantor, scene, play, dan music yang diunduh lewat HTTPS sesuai dengan rilis. Health check `/up` merespons 200; lima endpoint baca privat merespons 401 untuk tamu.

Render server menghasilkan HTTP 200 untuk owner, member Umum, dan Operasional, masing-masing 53,92 / 16,01 / 14,62 ms dengan 3 / 1 / 1 query. Snapshot presence cold 9,71 ms dengan satu query; warm 1,86 ms tanpa query. Ini sampel waktu server, bukan FPS atau waktu muat browser. Semua ID panel/kontrol baru tersedia tepat sekali, data terdiri atas 30 kostum dari lima seri, 43 jurus dengan 31 pemetaan termasuk avatar biasa, serta 203 collider. Privasi owner dan lazy loading modul tetap lolos pemeriksaan.

Backup sebelum rilis berada di `/home4/suc45578/deployment-artifacts/office-immersive-20261105-162508`, mencakup kode/aset/data dan database 4.626.684 byte. Direktori berizin 700 dan dump 600; kredensial dump sementara sudah dihapus. Tidak ada perubahan skema database.
