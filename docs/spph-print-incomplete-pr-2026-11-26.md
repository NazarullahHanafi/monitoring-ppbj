# Cetak SPPH ketika PR belum terhubung atau nilainya belum lengkap

SPPH yang belum mempunyai PR/PPBJ terhubung, termasuk nomor PR legacy yang belum ditemukan di Management PPBJ, sebelumnya tidak dapat melewati konfirmasi cetak. Penguncian nilai juga berlaku pada mode manual di browser dan server.

Saat nilai PR belum dapat dijadikan dasar rekomendasi, konfirmasi sekarang membuka pilihan manual dari master aktif. Nama dan jabatan harus dipilih secara eksplisit; rekomendasi di bawah ambang tidak dipilih sebagai pengganti nilai yang belum diketahui. Alasan awal menjelaskan bahwa PR belum terhubung/nilainya belum lengkap dan tetap dapat disunting. Tombol Lanjut Preview tersedia, dengan pemeriksaan ulang pilihan sebelum navigasi.

Server menerima pilihan manual untuk kondisi tersebut, tetap memeriksa departemen Umum, tipe dan status master aktif, alasan, label pilihan, serta fingerprint. Mode otomatis tetap memerlukan nilai PR dan master rekomendasi yang lengkap. Tampilan metadata dan audit membedakan nilai belum diketahui dari Rp0; proses cetak tidak mengubah PR atau relasinya.

Validasi mencakup PR tidak terhubung/nomor legacy tidak ditemukan, nilai nol/negatif, gabungan dengan nilai sebagian kosong, seluruh endpoint preview dan unduh (Word satu vendor serta ZIP semua vendor), master tidak aktif/salah tipe, fingerprint lama, serta aturan otomatis pada ambang nilai yang berlaku. Uji browser memakai aset dan SweetAlert sebenarnya dengan fixture jaringan lokal pada desktop terang dan ponsel gelap; memastikan pilihan awal kosong, tombol preview terjangkau dan nilai pilihan bertahan hingga navigasi. Pembacaan hanya terjadi saat cetak dibuka: satu konteks, satu permintaan pilihan master gabungan, dan satu pemeriksaan ulang.

Pemasangan dibatasi pada policy cetak SPPH, controller SPPH, dan aset konfirmasi. Kandidat serta hasil pemasangan diperiksa melalui transaksi database read-only dan aktor sintetis, tanpa mencetak dokumen nyata atau menambah audit pengguna. Backup privat dibuat sebelum pemasangan; aset webroot diperiksa checksum-nya. Tidak memerlukan migrasi, pembaruan dependency, atau pengosongan cache global.
