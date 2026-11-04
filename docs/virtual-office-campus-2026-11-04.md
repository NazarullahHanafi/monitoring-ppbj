# Kantor Virtual — kampus, avatar pribadi, dan jurnal menu

Perluasan rilis pertama: denah sekitar 86 × 70 unit dengan kantor, lounge, promenade, taman dan 12 area rekreasi. Tenis, badminton, basket, mini golf, UNO, tenis meja, biliar, catur, foosball, dart, arcade racing dan bowling memiliki denah/perabot masing-masing. Ini merupakan simulasi aktivitas avatar; belum merupakan 12 permainan multiplayer yang mengubah skor atau transaksi.

## Penggunaan

- Buka `/virtual-office`; pilih area permainan untuk mendekat. Kamera mendukung putar, geser, zoom, reset, layar penuh, panel tim yang dapat disembunyikan, dan tombol keluar layar penuh. `Escape` keluar dari perluasan layar dan menutup editor.
- Tombol **Avatar saya** membuka studio dengan pratinjau: gaya feminin/maskulin, lima rambut termasuk hijab, empat pakaian, enam warna, empat warna kulit, kacamata/headphone dan permainan favorit. Profil tersimpan per akun di server, termasuk bagi Viewer sebagai preferensi pribadi. Pengguna tidak dapat menyunting avatar akun lain. Penyimpanan antar-tab menggunakan versi dan menolak konflik.
- Avatar offline berekreasi pukul **07.00–17.00 WIB**, dengan pilihan area yang berganti berkala dan rute melalui promenade. Pukul **17.00–07.00 WIB** mereka pulang/beristirahat di lounge. Avatar online tetap beranimasi di area kerja. Label **ONLINE / JEDA / OFFLINE** di atas kepala dan figur 3D dapat dipilih untuk melihat detail. Gerakan bersifat ilustratif dan bukan bukti aktivitas fisik, kehadiran kantor atau produktivitas.
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
