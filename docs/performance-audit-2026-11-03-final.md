# Audit final performa dan batas autentikasi — 3 November 2026

## Hasil dan cakupan

Perbaikan aplikasi: `851e898`, sudah dipush dan dideploy. Audit ini melanjutkan [audit 32 endpoint sebelumnya](performance-audit-2026-11-03.md), bukan pengulangan klaim bahwa semua kombinasi fitur sudah diuji.

Dua masalah nyata diperbaiki: urutan pemeriksaan akun aktif terhadap pemuatan sesi, serta pencarian arsip paket SP/SPPH yang sebelumnya menunggu setiap PR secara berurutan. Tidak ada transaksi bisnis production diubah untuk pengujian.

## Batas autentikasi

Pemeriksaan akun aktif sebelumnya berada di middleware global, sebelum cookie/sesi web selesai dimuat. Tes dengan cookie sesi sungguhan membuktikan akun nonaktif bisa lolos; tes yang hanya memakai actingAs tidak menangkap kondisi tersebut.

Pemeriksaan kini berjalan setelah StartSession dan sebelum Authenticate. Urutan middleware route SP production diverifikasi: sesi indeks 2, pemeriksaan akun aktif indeks 3, autentikasi indeks 6. Akun aktif tetap bisa mengakses fitur sesuai role; pemeriksaan tidak menambah pemuatan user kedua pada skenario cookie aktif.

Regresi mencakup cookie sesi aktif/nonaktif, respons JSON 423, redirect HTML, cookie remember-me, pembatasan Operasional/Umum, larangan tulis untuk viewer, dan tamu yang ditolak sebelum query data PPBJ pribadi. Pengujian nonaktif menggunakan database pengujian terisolasi, bukan menonaktifkan akun pengguna production.

## Pencarian arsip paket

- Maksimal 20 PR unik; metadata dibaca sekaligus dari cache dengan kunci yang tetap kompatibel.
- Lookup cloud berjalan dalam gelombang kecil, default 3 request bersamaan; konfigurasi dibatasi maksimal 4.
- Lock per PR bersifat non-blocking untuk menghindari lookup ganda antar-worker. Tidak ada antrean tunggu lock pada request pengguna.
- Anggaran mulai gelombang default 10 detik, maksimal konfigurasi 12 detik. Request yang sedang berjalan boleh menyelesaikan timeout maksimal 5 detik: ini bukan hard deadline 10 detik untuk seluruh respons.
- Hasil sukses disimpan 30–300 detik sesuai konfigurasi; kegagalan sementara 10 detik. PR yang belum sempat diperiksa tidak disimpan sebagai “tidak ada arsip”.
- Refresh mendahulukan PR yang belum diperiksa atau metadata tertua. Hasil parsial dan langkah Muat ulang ditampilkan, bukan dianggap paket lengkap.
- Popup hanya meminta metadata saat diklik; mendukung Batal, timeout 20 detik, pembatalan ketika halaman ditinggalkan, serta pengabaian hasil request lama. Pembatalan browser tidak menjamin proses PHP/cloud yang sudah berjalan langsung berhenti; batas gelombang/timeout server tetap diperlukan.
- Tidak ada prefetch file lampiran, tambahan polling, atau penambahan job ke driver queue sync.

Simulasi localhost dengan 12 PR, masing-masing respons ditunda 200 ms: berurutan **2.614,69 ms**, batch **866,98 ms**, sekitar **66,8% lebih singkat**. Server fixture mencatat 24 request untuk dua pengukuran dan puncak **3 request bersamaan**. Ini mengukur lookup metadata buatan, bukan kecepatan unduhan OneDrive atau latensi production.

Fixture dapat dijalankan ulang melalui tests/Fixtures/archive-delay-server.cjs dan archive-lookup-benchmark.php. Server hanya mengikat loopback, memiliki endpoint penghentian dan watchdog; helper pengujian sudah dihentikan.

## Profil skenario production

Tiga sampel berurutan per skenario, seluruh 39 hasil berstatus 200. Angka di bawah adalah median controller + render/JSON di CLI hosting, **bukan waktu muat HTTP/browser**. Bootstrap HTTP penuh, middleware, antrean worker, TLS, jaringan, rendering perangkat, dan transfer cloud tidak tercakup. Tidak dilakukan stress test atau flush Redis.

| Skenario | Median (ms) | Query sampel terakhir | Status |
| --- | ---: | ---: | ---: |
| ppbj.number | 35.34 | 5 | 200 |
| ppbj.nominal | 19.58 | 2 | 200 |
| ppbj.multi | 45.05 | 5 | 200 |
| ppbj.max-page | 158.80 | 5 | 200 |
| sp.goods | 52.84 | 6 | 200 |
| spph.goods | 55.45 | 4 | 200 |
| spph.six-words | 45.12 | 1 | 200 |
| command.nominal | 38.55 | 5 | 200 |
| command.number | 9.37 | 1 | 200 |
| detail.ppbj | 2.81 | 1 | 200 |
| detail.sp | 2.69 | 1 | 200 |
| detail.spph | 2.17 | 1 | 200 |
| detail.tor | 2.24 | 1 | 200 |

Pencarian barang SP/SPPH memakai “sewa” dan memberikan halaman berisi hasil. Skenario enam kata SPPH mencakup pencarian tanpa hasil, yang tetap harus dihitung dengan benar. Filter nominal dan nomor dapat menghasilkan data kosong sesuai nilai yang dicari; respons kosong bukan error.

Rincian cepat hangat memakai satu query untuk mengambil record dan memeriksa akses sebelum memakai cache. Sampel pertama masing-masing detail PPBJ/SP/SPPH/TORPR memakai 8/6/6/4 query; cache tidak berarti otorisasi dilewati.

PPBJ 100 baris menghasilkan HTML sekitar **1,23 MB** sebelum kompresi (1.232.705 byte). Default tetap 10 baris. Fitur 100 baris tidak diam-diam dihapus; pengguna pada perangkat/jaringan terbatas sebaiknya memakai 10–25 baris. Dataset hosting saat ini tidak membenarkan penambahan indeks spekulatif.

## Verifikasi rilis

- **417 tes PHP, 2.567 assertions, dan 75 tes JavaScript lulus.**
- Format PHP, sintaks JavaScript, diff check, dan lint PHP 8.3.36 pada file runtime production lulus.
- Aset archive-popup.js disalin ke webroot hosting terpisah dan dibandingkan identik. Backup aset ada di direktori privat hosting.
- Laravel optimize selesai; /up setelah deploy HTTP 200 (sampel 130 ms, bukan SLA).
- Browser production memakai sesi akun Umum yang sudah ada: daftar SP dan rincian cepat berhasil dibuka; loading arsip menampilkan tombol Batal; hasil kosong menampilkan penjelasan eksplisit.
- Popup hasil arsip diperiksa secara visual pada light dan dark. Tidak ada error JavaScript yang tercatat pada tab pemeriksaan.
- Tidak dilakukan delete, approval, perubahan vendor/nilai, atau unduhan file besar di production.

## Batas hasil audit

Perbaikan sudah teruji untuk skenario tersebut, tetapi tidak dapat menjamin nol lag/error selamanya. p95/p99 HTTP saat jam ramai, limit CPU/Entry Processes/I/O shared hosting, ekspor/cetak besar, file cloud, seluruh kombinasi filter, dan sistem Arsip terpisah belum diukur menyeluruh pada putaran ini. Gunakan laporan ini bersama audit sebelumnya; jangan menyatakan seluruh website menjadi 66,8% lebih cepat.

