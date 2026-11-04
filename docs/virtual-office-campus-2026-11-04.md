# Kantor Virtual — kampus, avatar pribadi, dan jurnal menu

Perluasan rilis pertama: denah sekitar 86 × 70 unit dengan kantor, lounge, promenade, taman dan 12 area rekreasi. Tenis, badminton, basket, mini golf, UNO, tenis meja, biliar, catur, foosball, dart, arcade racing dan bowling memiliki denah/perabot masing-masing. Ini merupakan simulasi aktivitas avatar; belum merupakan 12 permainan multiplayer yang mengubah skor atau transaksi.

## Penggunaan

- Buka `/virtual-office`; pilih area permainan untuk mendekat. Kamera mendukung putar, geser, zoom, reset, layar penuh, panel tim yang dapat disembunyikan, dan tombol keluar layar penuh. `Escape` keluar dari perluasan layar dan menutup editor.
- Tombol **Avatar saya** membuka studio dengan pratinjau: gaya feminin/maskulin, lima rambut termasuk hijab, empat pakaian, enam warna, empat warna kulit, kacamata/headphone dan permainan favorit. Profil tersimpan per akun di server, termasuk bagi Viewer sebagai preferensi pribadi. Pengguna tidak dapat menyunting avatar akun lain. Penyimpanan antar-tab menggunakan versi dan menolak konflik.
- Avatar offline berekreasi pukul **07.00–17.00 WIB**, dengan pilihan area yang berganti berkala dan rute melalui promenade. Pukul **17.00–07.00 WIB** mereka tidur di rumah pribadi masing-masing. Avatar online tetap beranimasi di area kerja; avatar idle bersantai, minum atau makan tanpa pose tidur di sofa. Label **ONLINE / JEDA / OFFLINE** di atas kepala dan figur 3D dapat dipilih untuk melihat detail. Gerakan bersifat ilustratif dan bukan bukti aktivitas fisik, kehadiran kantor atau produktivitas.
- Detail anggota menampilkan menu terakhir yang terkonfirmasi ketika online. Sumbernya heartbeat aplikasi yang sudah ada, sehingga tidak seketika; tab tersembunyi berhenti heartbeat. Halaman di luar daftar menu aman membersihkan informasi menu, bukan membagikan alamat/isinya.
- **Lihat aktivitas menu** mengambil tanggal yang dipilih hanya saat diminta. Jurnal menampilkan kunjungan HTML sukses, nama menu dan waktunya; bukan durasi aktif atau seluruh audit bisnis. Pengulangan menu sama dalam lima menit diringkas. Maksimal 100 kunjungan terbaru per tanggal ditampilkan dengan penanda batas.
- Pengaturan **Bagikan menu dan riwayat kunjungan** dapat dimatikan pemilik akun. Rekan tidak dapat membuka jurnal privat atau melihat menu saat ini; pemilik masih dapat melihat jurnal sendiri. Akun owner yang sudah disembunyikan tetap tidak muncul dan tidak dicatat pada jurnal ini.

## Keamanan dan penyimpanan

Dua tabel tambahan: `virtual_office_profiles` (satu profil per pengguna) dan `virtual_office_visits` (indeks user/waktu). Relasi pengguna memakai foreign key dengan cascade saat akun dihapus. Migrasi bersifat tambahan dan tidak mengubah data pengadaan.

Endpoint preferensi memakai identitas sesi, CSRF, pembatasan frekuensi, enum ketat serta versi optimistis. Payload `user_id`/`id`, URL aset, dan atribut avatar di luar skema ditolak. Avatar dibuat dari geometri lokal; tidak ada unggahan, pemanggilan URL gambar pengguna atau pelacakan pihak ketiga.

Endpoint riwayat memeriksa login, departemen, akun aktif, visibilitas presence, pilihan berbagi dan rentang tanggal. Nama menu berasal dari whitelist server; URL, pencarian, ID dokumen, isi dokumen, email, IP, halaman akun, keamanan dan owner tidak disertakan. Semua respons office privat dan `no-store`. HTML hanya dicatat setelah respons sukses; feed, heartbeat, JSON dan aset tidak menambah jurnal.

Jurnal baru dimulai ketika fitur terpasang. Data historis lama tidak direkonstruksi atau diambil dari deskripsi log bisnis. Perintah `office:prune-visits` membuang kunjungan office lebih dari 30 hari, dijadwalkan setiap hari 02.30. Log audit yang sudah ada tetap mengikuti kebijakannya sendiri.

## Performa dan pengujian

Geometri denah dibatch berdasarkan material. Grafis tetap dimuat secara lazy khusus halaman office, dibatasi 24 avatar, DPR 1,5 dan maksimum animasi 30 FPS. Daftar tetap memuat maksimal 120 akun. Mode ringan tidak memerlukan grafis 3D; animasi dan pembacaan berhenti ketika halaman tersembunyi. Feed mempertahankan satu query cold-cache dan nol query warm-cache. Jurnal hanya diambil saat pengguna menekan tombol, dengan pembatalan saat anggota/tanggal berubah.

Pengujian mencakup batas waktu WIB, ukuran denah pada kamera mobile, geometri valid, pembersihan resource, perubahan mode saat lazy load, fokus permainan setelah load, pembatalan jurnal, akses preferensi milik sendiri, validasi enum/CSRF pada klien, konflik versi, izin Viewer, privasi menu/jurnal, owner tersembunyi, akun terkunci, tanggal, batas 100 entri, pencatatan HTML sukses dan retensi.

Pratinjau browser langsung belum dapat diverifikasi karena alat browser gagal membaca tab. Pengujian scene memakai Three.js asli dengan renderer pengujian; ini memeriksa geometri dan lifecycle, bukan screenshot, frame GPU nyata atau FPS perangkat pengguna.

Validasi lokal akhir: **461 tes PHP / 2.893 assertion**, **99 tes JavaScript**, build Vite berhasil, dan `git diff --check` bersih. Chunk grafis sekitar 575 KB minified / 147 KB gzip dan tetap lazy; entry office sekitar 21 KB / 8 KB gzip. Stylesheet dan entry JavaScript halaman inti tidak berubah.

## Verifikasi hosting

Rilis aplikasi `704f0b9` terpasang pada hosting PHP 8.3.36. Backup privat kode, aset dan database tersedia pada `deployment-artifacts/office-campus-20261104-170927`. Dump database sebelum migrasi 4.558.468 byte, mode file 0600 dan direktori 0700; berkas kredensial sementara sudah dihapus. Migrasi tambahan berhasil sebelum kode baru dipublikasikan. Cache aplikasi/routes/views dan autoload telah dibangun kembali. Aset lama dipertahankan di webroot untuk tab lama.

Health HTTP 200; login 200; kantor tanpa login 302; feed serta jurnal tanpa login 401. SHA-256 CSS office, shell, stylesheet aplikasi, entry office dan chunk 3D yang diunduh melalui HTTP cocok dengan berkas production. Jadwal retensi 02.30 terdaftar.

| Sampel baca controller | Waktu (ms) | SQL | Hasil |
| --- | ---: | ---: | --- |
| Feed cold-cache | 16,64 | 1 | 22 anggota, 6.059 byte, tanpa email/role/password/IP |
| Feed warm-cache | 1,61 | 0 | Semua profil avatar dan flag berbagi tersedia |
| Halaman Umum | 24,15 | 2 | Editor tersedia, chunk grafis tidak dipreload |
| Halaman Operasional | 7,06 | 1 | Editor tersedia, chunk grafis tidak dipreload |
| Jurnal sendiri | 15,28 | 2 | 200, kosong sebelum ada kunjungan nyata |

Angka tersebut merupakan sampel controller/render, bukan latensi HTTP menyeluruh atau FPS. Profil tidak menjalankan terminating middleware dan tidak membuat kunjungan palsu atau mengubah preferensi pengguna production. Pemakaian SQL per halaman bertambah satu pembacaan profil sendiri; halaman inti lain tidak memuat profil atau grafis office.

Whitelist menu juga mencakup TORPR Operasional dan Command Center. Pemutakhiran kecil whitelist diuji kembali bersama tes office. Karena autentikasi SSH GitHub pada hosting menolak key, fetch rilis memakai HTTPS repository publik tanpa mengubah remote atau menambahkan kredensial.

## Rumah pribadi — menggantikan tidur di sofa

Setiap akun dalam roster mendapatkan satu rumah sendiri, termasuk akun di luar 24 avatar yang sedang dirender. Lokasi rumah dipertahankan ketika urutan/status presence berubah. Kawasan perumahan berada di belakang kantor dan menyesuaikan hingga 120 rumah. Rumah dibentuk dari geometri instanced bersama; tidak ada tabel, request, upload atau model eksternal tambahan.

Rumah tertutup memiliki dinding, pintu, jendela dan atap miring. Interior dilengkapi kasur, bantal, selimut, lampu meja hangat, AC, kulkas/freezer, dapur kecil, sofa, TV, rak buku, kamar mandi, taman dan pagar. Pada malam hari avatar berbaring mendatar di atas kasur, matanya tertutup dan sepatunya disembunyikan. Gerakan napas ringan tetap mengikuti pengaturan jeda animasi.

Pilih **Rumah Pribadi** untuk melihat kawasan, atau klik rumah/nama penghuni. Tombol **Lihat rumah & interior** tersedia di detail anggota dan juga bekerja dari mode ringan. Hanya atap serta dua dinding rumah terpilih yang dibuka untuk memperlihatkan interior. Rumah lain tetap tertutup. Menutup detail menutup kembali rumah. Rumah anggota yang sedang online tetap dapat dilihat sebagai rumah kosong; label status tidak diubah menjadi offline.

Tampilan malam awal diarahkan ke perumahan. Kamera seluruh kampus dan kamera perumahan menghitung cakupan berdasarkan ukuran kawasan dan rasio viewport. Memilih penghuni di luar 24 figur yang dirender memprioritaskan figur tersebut agar penghuni tetap terlihat saat rumahnya dibuka.

Tes tambahan memeriksa pemilik rumah tidak tertukar, satu tempat tidur per akun, batas 120 rumah, atap/dinding selektif, posisi berbaring setinggi kasur, kamera mobile yang mencakup kawasan, fokus rumah sesudah lazy loading, serta pembersihan instance/resource. Batas verifikasi visual/GPU yang dijelaskan sebelumnya tetap berlaku.

Validasi rilis rumah: seluruh **101 tes JavaScript** dan **20 tes PHP office/struktur halaman (150 assertion)** lolos. Build Vite berhasil; chunk grafis menjadi sekitar 587 KB minified / 151 KB gzip, tetap lazy. Tidak ada migrasi database atau perubahan backend pada rilis rumah ini.
