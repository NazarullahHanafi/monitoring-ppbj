# Pesan Contact: filter, performa daftar, dan aksi yang konsisten

Audit lanjutan dari baseline `85f1b97`. Lingkup putaran ini adalah pesan masuk Contact dan pengiriman formulir Contact. Tidak ada perubahan dokumen pengadaan, approval, arsip, migrasi, atau dependensi.

## Perbaikan

- Filter menerima teks maksimal 160 karakter, status read/unread, dan nomor halaman yang valid. Input array, status tidak dikenal, dan nomor halaman yang tidak sesuai ditolak sebelum query daftar. `%`, `_`, dan `!` diperlakukan sebagai karakter literal dengan parameter binding dan `ESCAPE '!'`. Kata kunci kosong setelah trim tidak membuat pencarian `LIKE '%%'`.
- Ringkasan total/read/unread tetap satu agregasi. Saat tidak ada pencarian teks, hasil ringkasan sekaligus menjadi total pagination, termasuk saat filter status dipakai. Ini menghilangkan query COUNT pagination tambahan: maksimal dua query sumber untuk daftar berisi data, satu bila kosong. Pencarian teks tetap maksimal tiga query sumber. Angka ini mengukur controller daftar, tidak mencakup query shell/layout bersama.
- Pagination tetap 12 pesan, dengan urutan created_at lalu id descending agar timestamp yang sama tidak membuat urutan berubah. Kolom yang tidak dipakai, termasuk user_agent, tidak dibaca untuk daftar.
- Tombol baca mengirim tujuan eksplisit `read=1` atau `read=0`. Update bersyarat berdasarkan primary key dan status terkini menjaga pengiriman berulang tetap idempoten. Pengulangan tandai dibaca tidak mengganti waktu/bagian user pembaca pertama; pengulangan tandai belum dibaca tidak mengubah updated_at. Badge cache hanya dihapus saat status benar-benar berubah.
- Action route lama tetap tersedia sebagai delegasi ke metode setRead agar penggantian route cache tidak menghilangkan nama action. Halaman lama yang masih terbuka tanpa field tujuan mendapat pesan untuk memuat ulang, tanpa menebak atau membalik status terbaru.
- Konfirmasi hapus dan penjaga aksi dipindahkan ke aset berversi filemtime. Satu aksi memegang kendali sampai navigasi selesai; klik berulang atau aksi lain tidak mengirim request kedua. Isian tersembunyi CSRF, override PUT/DELETE, dan tujuan status tetap dikirim. Pembatalan/komponen konfirmasi gagal/pageshow mengembalikan kontrol sesuai keadaan awal.
- Konfirmasi menggunakan teks biasa pada SweetAlert atau dialog FormUX yang sudah tersedia. Isi pengirim/subjek tidak dipasang sebagai HTML. Tidak ada fallback browser confirm. Jika kedua komponen tidak tersedia, penghapusan ditahan dengan informasi inline. Error/status proses ditampilkan melalui textContent.
- Deadline penjaga navigasi 60 detik melepaskan kontrol dengan status belum terkonfirmasi, tanpa retry otomatis. Pagehide membatalkan kepemilikan dialog agar jawaban lama tidak dapat mengirim form setelah halaman dipulihkan.
- Public Contact tetap dibatasi lima request per menit dengan prefix sendiri, terpisah dari endpoint publik lain. Baca/status/hapus admin memakai prefix berbeda dengan batas 60/30/20. Pembatasan tetap aktif; hak Superadmin Umum dan middleware read-only tetap berlaku.

## Validasi

- Regresi penuh: 784 tes PHP / 8.253 assertion dan 359 tes JavaScript lulus. Setelah penambahan delegasi action lama, 22 tes fitur terkait / 163 assertion diulang dan lulus.
- Browser desktop dan ponsel sentuh memakai aset aksi/FormUX asli serta CSS halaman. Diuji Enter/Filter/Reset, tidak ada pencarian otomatis ketika mengetik, satu POST saat submit ganda, encoding CSRF/method/read, batal dan setuju hapus, dialog ganda, komponen konfirmasi tidak tersedia, serta teks menyerupai HTML tidak menjadi elemen aktif.
- Tes fitur memeriksa pengurangan query, pagination saat timestamp sama, projection, pencarian literal, input cacat, replay tujuan status oleh admin lain, metadata pembaca yang dipertahankan, halaman lama, role/read-only, dan isolasi throttle.
- Pint, parser JavaScript, dan `git diff --check` lulus. Prosedur production menggunakan backup, allowlist berkas, pemeriksaan kandidat sebelum fast-forward, transaksi database read-only/cache array, checksum aset webroot, dan HTTP health/login/akses tanpa sesi. Tidak ada pengiriman Contact atau perubahan status/hapus pesan production untuk pengujian.

Update status eksplisit tidak menyediakan version lock lintas-tab: dua tindakan berlawanan yang sengaja dikirim tetap mengikuti urutan eksekusi database. Query pencarian substring tetap membaca kandidat dari database, sehingga waktu aktual bergantung jumlah data dan hosting. Pengujian ini tidak menjamin seluruh website bebas bug atau kerentanan.
