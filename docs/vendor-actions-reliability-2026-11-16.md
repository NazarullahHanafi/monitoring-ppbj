# Keandalan aksi vendor — 16 November 2026

Lingkup rilis: tambah/edit vendor, perubahan status, konfirmasi hapus, cache direktori, serta pembatasan permintaan. Alur unggah/unduh OneDrive tidak diubah.

## Perubahan

- Tombol status mengirim tujuan `is_active=0/1`. Server mengunci baris selama transaksi, membaca status terbaru, dan hanya menulis jika berbeda. Mengulang permintaan yang sama tidak membalik status, memperbarui timestamp, atau membuang cache lagi. Form lama tanpa tujuan status meminta pengguna memuat ulang; server tidak menebak maksudnya.
- Cache vendor dihapus melalui event created/updated/deleted setelah commit. Transaksi yang dibatalkan mempertahankan cache; penyimpanan tanpa perubahan tidak menghapusnya. Penghapusan cache statistik tambahan di controller dihilangkan. Ini menghindari pembentukan ulang cache dari data yang belum selesai disimpan.
- Aturan dan penyusunan data tambah/edit memakai satu helper. Nilai string `0` pada kolom opsional dipertahankan. Konflik indeks unik sesudah validasi menjadi kesalahan kolom 422. Transaksi perubahan nama vendor beserta nama di SP tetap dipertahankan.
- Satu pengunci aksi di halaman menahan submit berulang, pergantian modal, dan penerapan/reset filter selama perubahan berlangsung. Pengunci dipertahankan sampai navigasi dimulai; isian dipulihkan saat gagal.
- Batas 30 detik mencakup pembacaan body respons. Tidak ada pengulangan otomatis untuk permintaan tulis. HTML/login, redirect, respons rusak, status hasil yang tidak sesuai tujuan, dan URL tujuan di luar indeks vendor ditolak sebagai hasil yang belum terkonfirmasi. Respons terlambat setelah halaman ditinggalkan diabaikan.
- Konfirmasi hapus memakai FormUX dan dapat dibatalkan. Respons JSON menjelaskan vendor yang masih memiliki SP atau lampiran, termasuk lampiran pending, tanpa menghapusnya. Alur formulir HTML tetap tersedia.
- Pembatasan departemen dan mode hanya baca dipertahankan. Halaman, tambah, edit, hapus, status, dan lookup memiliki enam prefix kuota berbeda. ID route dibatasi angka, parameter halaman divalidasi, JSON perubahan bersifat private/no-store, dan tombol kembali dibatasi ke origin aplikasi.

## Pengujian

- **806 tes PHP, 8.704 assertion lulus.** Pengujian baru mencakup permintaan status berulang tanpa SQL UPDATE tambahan, cache/timestamp tetap, validasi intent, benturan unik, commit/rollback cache, nilai `0`, perlindungan penghapusan, peran, serta isolasi kuota. Regresi perubahan nama vendor dan SP tetap lulus.
- **377 tes JavaScript lulus.** Termasuk body yang berhenti, abort meskipun fetch terlambat, CSRF, pesan validasi, respons HTML/JSON rusak, tujuan navigasi, dan filter manual.
- Browser desktop/ponsel: aksi status/hapus, pembatalan dan penolakan hapus, isian saat gagal, klik berulang, pergantian modal, respons terlambat, serta pengunci sampai navigasi. Regresi formulir simpan dan transfer/ZIP vendor juga lulus tanpa kesalahan JavaScript pada skenario tersebut.
- Pint pada empat file PHP yang berubah, pemeriksaan sintaks JavaScript, dan pemeriksaan diff lulus.
- Verifikasi kandidat dan hasil deploy wajib memakai transaksi MariaDB hanya baca dan cache array terisolasi: skema/indeks, validasi, filter literal, anggaran query daftar (maksimal empat saat dingin dan dua saat hangat), lookup (satu saat dingin dan nol saat hangat), serta middleware akses. Tidak ada aksi status, hapus, unggah, atau perubahan dokumen pengguna yang dicoba di production.

Tidak ada migrasi atau pembaruan dependency. Ini perbaikan pada jalur vendor yang diuji, bukan jaminan seluruh website bebas bug atau seluruh operasi jaringan selalu cepat.
