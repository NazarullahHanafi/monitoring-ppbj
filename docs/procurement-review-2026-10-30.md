# Persetujuan selisih dan simulasi SP/SPPH

## Alur pengguna

1. Filter daftar SP/SPPH baru diterapkan lewat Enter atau **Terapkan Filter**. Mengetik, memilih PIC/vendor, menghapus satu filter, dan memilih tanggal cepat hanya menyiapkan pilihan. Reset halaman dan Export tetap merupakan tindakan eksplisit. Autocomplete PR/vendor dalam form tetap tersedia.
2. Saat menyimpan SP/SPPH, dialog simulasi menampilkan vendor, perubahan data, PR terpilih/yang dilepas, dan dampak sinkronisasi PPBJ. SP juga menampilkan nilai gabungan PR dan alokasi per PR.
3. SP yang melebihi nilai PR/gabungan PR harus diajukan dengan alasan. Nilai acuan PR terdaftar diambil dari database, bukan input browser. PR dengan acuan nol tidak melewati pengecekan ini. Referensi manual tanpa nilai acuan menampilkan peringatan bahwa anggaran belum dapat dinilai.
4. Buka **Persetujuan Selisih** di Penomoran SP (tab terpisah agar draft tetap terbuka). Akun Umum non-Viewer lain dapat menyetujui/menolak dengan catatan. Pengaju tidak dapat memutus pengajuannya sendiri.
5. Setelah disetujui, pengaju menyimpan kembali form yang sama. Persetujuan berlaku tujuh hari sejak pengajuan, sekali pakai, terikat pada pengaju, konteks SP, vendor, PR, nilai acuan, alokasi, dan rincian form. Perubahan rincian/database membutuhkan pengajuan baru. Form belum menjadi SP hanya karena pengajuan dibuat/disetujui.
6. Hapus menampilkan simulasi Sampah terlebih dahulu, lalu verifikasi sandi pembuat seperti sebelumnya. Tidak ada penghapusan permanen atau pembersihan dokumen lanjutan dalam simulasi.

## Pengamanan dan performa

- Semua endpoint berada dalam auth, departemen Umum, CSRF, read-only guard, serta pembatasan request. Edit tetap hanya untuk pembuat/PIC sesuai aturan lama.
- Checkbox `allocation_override_confirmed` lama tidak dapat melewati persetujuan. Nomor PR terdaftar tidak dapat dialihkan ke referensi manual untuk menghindari nilai acuan database.
- Pemeriksaan dan konsumsi persetujuan menggunakan row lock dalam transaksi penyimpanan SP. Gagal menyimpan membatalkan konsumsi dan auditnya. Keputusan ganda/ulang ditolak.
- Fingerprint dihitung server-side. Tidak menerima nominal, status persetujuan, identitas pengaju/reviewer atau fingerprint tepercaya dari browser. Isi dialog dan alasan di-escape.
- Persetujuan finansial tidak menggunakan cache status. Lookup memakai indeks unik `(requester_id, fingerprint)`; daftar 15 pengajuan per halaman dan eager-load nama pengguna. Preview dibatasi 20 PR / 50 item, tanpa mengambil lampiran. Tidak ada polling/animasi berat baru.
- Simulasi adalah pratinjau, bukan reservasi database. Validasi, konflik PR/nomor dan persetujuan diperiksa kembali saat menyimpan. Draft yang belum disimpan tidak dijamin bertahan jika tab di-refresh/ditutup.

## Verifikasi

- Full suite lokal: **333 tests, 1890 assertions**; JavaScript **24 tests** lulus pada 30 Oktober 2026.
- Mencakup gabungan PR, perubahan alokasi/vendor/item/nilai database, tanpa persetujuan/checkbox lama, pengaju lain, Viewer/Operasional, self-approval, kedaluwarsa, replay, rollback gagal insert, preview tanpa mutasi dan kata sandi penghapusan.
- Pengujian browser production hanya baca dan pembatalan preview. Tidak membuat/menyetujui SP atau memindahkan dokumen produksi ke Sampah untuk QA.
- Migrasi baru bersifat aditif: `2026_10_30_000002_create_sp_value_approvals_table.php`. Tidak perlu menghapus cache Redis global atau mengubah tabel transaksi lama.
