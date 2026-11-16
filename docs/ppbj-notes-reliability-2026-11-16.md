# Catatan kolaborasi PPBJ: performa dan keandalan

Audit lanjutan dari baseline `8d97352`. Lingkup perubahan adalah panel catatan/mention PPBJ, direktori mention, dan batas permintaannya. Tidak ada migrasi, dependensi baru, perubahan approval, atau perubahan isi arsip.

## Perubahan

Validasi mention sebelumnya memakai `exists` pada setiap anggota array, lalu membaca nama user lagi. Sekarang tipe, duplikasi, dan batas 20 tetap divalidasi; seluruh ID kemudian diperiksa dan dibaca lewat satu query user aktif. User nonaktif/tidak ditemukan menghasilkan 422 sebelum transaksi, dan mention diri sendiri tidak membuat notifikasi. Hasil tanpa mention tidak memerlukan query direktori. Perilaku notifikasi saat pengguna benar-benar mengirim catatan tetap dipertahankan.

Direktori mention memakai cache 300 detik yang sudah ada, dengan invalidasi tambahan saat akun disimpan/dihapus. Pembacaan direktori hangat tidak mengulang query user. Pembaruan last-seen melalui raw SQL tetap tidak menyalakan event invalidasi tersebut. Tidak ada cache global yang di-flush.

Panel tetap hanya membaca 50 catatan terakhir. Respons menambahkan `total_notes`; jumlah keseluruhan dihitung terpisah hanya saat jendela mencapai 50. Ini mencegah badge jumlah catatan yang sebelumnya turun menjadi 50 meskipun ada lebih banyak catatan. Badge unread tidak dikurangi berulang saat PR yang sama dibuka kembali.

Pembacaan catatan dan inbox sekarang memiliki controller pembatalan sendiri. Berpindah PR, menutup panel, atau meninggalkan halaman membatalkan pembacaan lama; identitas operasi diperiksa sebelum hasil/error mengubah panel. Halaman dari bfcache mengambil ulang data. Deadline 30 detik mencakup body JSON, dan hasil lama tetap diabaikan meskipun transport tidak menghormati abort.

Draft dipisahkan menurut ID PR, disimpan hanya di memori tab, maksimal 20 draft. Berpindah PR tidak membawa teks/mention milik PR sebelumnya. Penyimpanan berhasil menghapus draft PR tersebut; kegagalan tetap mempertahankan isian. Draft tidak bertahan setelah reload atau tab ditutup.

Satu penjaga mutasi menahan pengiriman, edit, hapus, dan pergantian panel selama perubahan berjalan. Klik/submit berulang tidak mengirim write kedua. Pembatalan dialog atau error memulihkan kontrol. Kegagalan jaringan/timeout/5xx diberi status belum terkonfirmasi dan tidak diulang otomatis. Setelah tambah berhasil, catatan dari respons server langsung ditampilkan tanpa GET tambahan. Edit/hapus tetap memuat ulang daftar setelah konfirmasi server agar jendela catatan kembali benar.

Lima endpoint catatan memakai prefix throttle berbeda dengan batas lama tetap 60/60/30/30/20 per menit untuk inbox/baca/tambah/edit/hapus. Membaca tidak lagi menghabiskan jatah simpan/hapus. Respons JSON diberi `private, no-store`, hak mengubah catatan dan middleware read-only tetap berlaku, serta teks pengguna tetap di-escape pada renderer. URL aset `ppbj.js` memakai filemtime agar pembukaan halaman berikutnya mengambil versi kode yang berubah.

## Validasi

- 772 tes PHP lulus, 8.137 assertion.
- 353 tes JavaScript lulus, termasuk timeout body, pembatalan, error otorisasi, validasi, CSRF, dan respons tidak lengkap.
- Browser memakai markup Blade panel dan kode IIFE asli dari `ppbj.js`, pada desktop serta ponsel sentuh. Diuji isolasi draft, respons PR lama, penutupan inbox saat request berjalan, angka total lebih dari 50, pengurangan badge sekali, klik ganda tambah/edit/hapus, batal hapus, error server/izin, CSRF, dan tidak ada GET ulang setelah tambah berhasil. Pengujian memakai data sintetis; tidak mengirim pesan production.
- Pint pada empat berkas PHP perubahan/tes, parser JavaScript, dan `git diff --check` lulus.
- Rencana verifikasi hosting memuat kandidat sebelum fast-forward, memakai transaksi read-only/cache array, dan memeriksa resolver batch, inbox, prefix limiter, serta checksum aset. Karena GET panel memang menandai mention dibaca, endpoint tersebut diperiksa lewat mode `DB::pretend`; tidak ada mention pengguna yang ditandai dibaca untuk pengujian.

Penjaga mutasi hanya berlaku pada satu halaman, bukan deduplikasi lintas tab/perangkat. Konflik edit bersamaan antar-tab masih mengikuti perilaku backend yang ada; perubahan ini tidak menambahkan version field atau mengubah kontrak edit lama. Jumlah di panel mengikuti snapshot saat dibuka dan penambahan lokal yang sudah dikonfirmasi, bukan pembaruan real time dari user lain. Hasil pengujian ini tidak menjamin seluruh website bebas bug atau kerentanan.
