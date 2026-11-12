# Audit interaksi pengadaan — 12 November 2026

Pemeriksaan terarah mencakup lampiran rincian SP/SPPH, pencarian terpadu, navigasi hasil, dan preferensi tabel. Pengujian regresi aplikasi juga dijalankan untuk alur yang sudah ada, termasuk filter, export, simpan dokumen, hak akses, dan Kantor Virtual. Ini catatan cakupan dan bukti pemeriksaan, bukan klaim bahwa setiap kemungkinan kondisi produksi telah diuji.

| Temuan | Penyebab | Perbaikan |
| --- | --- | --- |
| Koreksi lampiran lain dapat hilang saat satu lampiran dikonfirmasi/ditambah | Render ulang membaca teks awal dari respons, tanpa menyimpan draf tiap lampiran | Draf dalam memori per ID lampiran; hanya draf yang berhasil dikonfirmasi/dihapus yang dibersihkan. Kotak teks dibekukan selama operasi. |
| Respons HTML, sesi berubah, atau JSON tidak lengkap dapat merusak daftar lokal | Respons dianggap berhasil sebelum bentuk data dan versi diperiksa | Validasi respons sebelum perubahan state; pengakuan konfirmasi harus memiliki ID yang sama, versi bertambah, dan status diperiksa. Tidak ada pengiriman ulang otomatis. |
| Tombol pembatalan tidak bekerja saat memuat/konfirmasi | Tombol tampil untuk semua operasi, tetapi hanya pembaca PDF lokal yang dapat dibatalkan | Pembatalan hanya tampil selama pembacaan lokal. Operasi server ditunggu dengan batas waktu. |
| Tombol simpan preferensi dapat terkunci jika respons/body menggantung | Tidak ada batas tunggu pada POST preferensi | Tenggat 30 detik meliputi header dan JSON; state versi tidak berubah pada respons gagal/tidak lengkap. Kontrol kembali tersedia dan hasil terlambat diabaikan. |
| Hasil/navigasi lama dapat terbawa ke query baru yang gagal | Kriteria aktif berganti, tetapi kartu dan nomor halaman sebelumnya tetap tersedia | Sembunyikan kartu/navigasi lama saat membaca dan saat gagal; navigasi dikunci sampai respons berhasil. Tombol Coba ulang mempertahankan halaman dan filter permintaan gagal. |
| Permintaan berbeda dapat menghabiskan jatah tombol lain | Middleware throttle numerik memakai signature pengguna yang sama tanpa prefix fungsi | Pisahkan 14 penghitung untuk pencarian, status/bukti/coverage/katalog, pemeriksaan, prioritas, file, preferensi, dan operasi lampiran. Angka batas dan masa tunggu tetap sama. |

## Fitur pemulihan

- **Muat ulang daftar lampiran** tersedia untuk dokumen yang sudah tersimpan. Metadata dimuat saat diklik; koreksi lokal pada lampiran yang masih ada tetap berada di kotak teks. Pengguna diminta mencocokkannya dengan versi terbaru sebelum mengonfirmasi. Tidak ada penggabungan atau penimpaan otomatis pada konflik versi.
- **Coba ulang pencarian** tersedia setelah kegagalan. Query, sumber, filter, fokus PR, dan nomor halaman mengikuti permintaan yang gagal, bukan draf baru yang belum diterapkan. Reset/pencarian baru membatalkan tombol pemulihan yang lama.
- Tenggat pembacaan tetap 20 detik untuk pencarian, 30 detik untuk permintaan lampiran biasa/preferensi, dan 120 detik untuk unggahan. Pembatalan/deadline tetap menyelesaikan proses UI walaupun JSON tidak selesai dibaca.
- Draf hanya hidup dalam dialog yang terbuka. Menutup dengan membuang perubahan, reload halaman, atau menutup browser tidak menyimpan koreksi yang belum dikonfirmasi. Peringatan penutupan tetap berlaku. Lampiran sementara belum tertaut tetap mengikuti alur unggah/simpan dokumen yang sudah ada.

## Bukti validasi

- Pengujian PHP membuktikan pencarian, unggah, konfirmasi, hapus, dan penandaan menyusul tidak lagi berbagi anggaran permintaan. Batas unggah tetap menolak request ke-11, sementara pengguna lain dan konfirmasi tetap dapat berjalan.
- Regresi unggah Word/PDF SP/SPPH, draf/tertambat, memakai versi yang dikembalikan upload untuk langsung konfirmasi; pengujian ini sekarang berjalan dengan middleware throttle aktif.
- Pengujian browser memakai aset sebenarnya dan fixture jaringan: draf dua lampiran, konfirmasi tertunda, konflik versi, muat ulang, upload dengan HTML/JSON rusak, upload berikutnya, body menggantung, desktop dan ponsel. Tidak ada pengiriman ulang otomatis.
- Pengujian browser pencarian memeriksa kegagalan halaman kedua, penyembunyian kartu lama secara visual, coba ulang dengan filter/halaman sama, fokus PR, hitung total, dan bukti halaman. Uji simpan SP/SPPH dan pembacaan PDF biasa/scan juga dijalankan.
- Pengujian JavaScript memeriksa tenggat body JSON, respons terlambat, pemulihan preferensi, dan pelestarian versi saat pengakuan simpan tidak lengkap.

Pembaruan ini tidak menambah polling, OCR sinkron, cache hasil privat, atau proses baru pada server. Query pencarian tetap memakai indeks dan hasil bertahap yang ada. Pengukuran waktu pencarian terdahulu bukan jaminan latensi di semua kondisi; perubahan ini terutama memperbaiki kegagalan interaksi dan mengurangi request ulang akibat jatah yang saling bertabrakan. Pemrosesan arsip lama tetap bertahap.
