# Audit performa SIMONPR — 3 November 2026

## Ringkasan

Audit membaca 32 halaman/endpoint production, masing-masing tiga sampel berurutan. Seluruh 96 respons controller/render/JSON pada pengukuran ulang berstatus 200. Ini bukan pengujian seluruh kombinasi filter, seluruh query ad-hoc, atau seluruh aplikasi Sistem Arsip.

Runtime saat pemeriksaan: PHP CLI 8.3.36; cache Redis; session Redis; APP_DEBUG false. Snapshot antrean menunjukkan 0 pekerjaan menunggu dan 0 failed jobs. Driver queue global masih sync; tidak diubah tanpa kesiapan worker. OPcache CLI yang mati tidak dipakai sebagai kesimpulan konfigurasi PHP web.

Perubahan aplikasi: `f55a95a`, dari baseline `5d454c8`.

## Perubahan yang terukur dan diuji

1. Presence heartbeat memakai satu request aktif, timeout 20 detik, pembatalan saat halaman disembunyikan/ditinggalkan, dan pemulihan sesudah Back/Forward Cache. Hasil request lama tidak boleh menimpa hasil request penggantinya. Interval normal 120 detik tidak dipercepat.
2. Refresh status penerimaan TORPR dibatasi 100 ID unik, tidak berjalan pada tab tersembunyi atau halaman berat, tidak saling menumpuk, dan pulih setelah timeout/error/BFCache. Tidak ada request tambahan saat render awal.
3. Badge chatbot memperoleh timeout dan pembatalan request; respons yang sudah kedaluwarsa diabaikan. Interval normal 120 detik dipertahankan.
4. Refresh badge approval mengirim header XMLHttpRequest yang diwajibkan controller. Sebelumnya request shell hanya mengirim Accept sehingga endpoint menolaknya dengan 404. Kontrak akses Umum/Operasional tidak diubah. Cache hit polling ulang diuji tanpa query count kedua.
5. Cache pilihan penyedia PPBJ tidak lagi dibuang hanya karena deskripsi/tanggal/nilai SP atau SPPH diedit. Create, perubahan nama/vendor_names, delete dan restore tetap menginvalidasi daftar. Tes menunjukkan pembacaan opsi sesudah edit deskripsi tidak menjalankan query.
6. Snapshot Owner Center menyatukan enam hitungan user menjadi satu agregasi dan memakai kembali agregasi modul/pending approval. Setiap modul dipindai sekali per snapshot; pengecekan kolom sekaligus menggantikan metadata terpisah. Total SP/SPPH tetap mengecualikan soft-delete; angka pembuatan bulanan tetap mempertahankan semantik sebelumnya yang mencakup dokumen yang belakangan dihapus.
7. Health-check cache Owner hanya membaca kembali nilai satu kali. Cache snapshot tetap satu menit; tidak diperpanjang untuk mengejar benchmark.

Owner Center pada sampel pertama: **63 → 36 query** (sekitar 43% lebih sedikit). Query hangat tetap 6. Penghematan query cold ini tidak berarti seluruh website menjadi 43% lebih cepat.

## Metode dan hasil

Angka merupakan median tiga sampel **controller + render/JSON di CLI production**, bukan waktu muat browser atau p95 HTTP. Bootstrap HTTP penuh, middleware, antrean worker, TLS, transfer jaringan, rendering perangkat, dan transfer file cloud tidak termasuk. Cache terisi secara normal; tidak ada flush Redis, stress test paralel, perubahan transaksi bisnis, atau pembuatan sesi login production.

Sampel diambil pada hosting bersama pada waktu berbeda. Halaman yang tidak diubah dapat lebih cepat maupun lebih lambat karena variasi beban dan cache. Khusus SP, median sampel setelah deploy lebih tinggi; query hangat tetap 5. Jangan menyatakan semua menu meningkat drastis berdasarkan tabel ini.

| Endpoint | Median sebelum (ms) | Median sesudah (ms) | Query sampel hangat terakhir |
| --- | ---: | ---: | ---: |
| dashboard.indexumum | 12.61 | 16.87 | 0 |
| ppbj.index | 39.39 | 30.72 | 5 |
| sp.index | 30.92 | 45.06 | 5 |
| spph.index | 27.71 | 26.29 | 3 |
| collaboration-calendar.index | 10.86 | 13.34 | 1 |
| collaboration-calendar.events | 11.54 | 12.17 | 2 |
| collaboration-calendar.ppbj-search | 16.35 | 20.30 | 3 |
| collaboration-inbox.index | 16.93 | 19.95 | 4 |
| command-center.index | 9.36 | 6.30 | 0 |
| command-center.overview | 1.45 | 1.38 | 0 |
| command-center.reconciliation | 1.35 | 1.43 | 0 |
| ppbj.report | 7.35 | 12.25 | 0 |
| ppbj.report.data | 26.69 | 27.80 | 4 |
| approval.pr.index | 22.21 | 14.67 | 4 |
| vendor.index | 12.19 | 20.56 | 2 |
| sp-master-options.index | 19.49 | 18.67 | 3 |
| satuan.index | 9.72 | 15.85 | 0 |
| users.index | 21.44 | 33.95 | 2 |
| owner.index | 34.76 | 26.38 | 6 |
| owner.security.index | 27.01 | 26.12 | 8 |
| contact-messages.index | 20.36 | 20.15 | 3 |
| account.edit | 9.56 | 6.36 | 0 |
| tracking.index | 9.88 | 10.81 | 0 |
| torpr.index | 28.19 | 19.09 | 6 |
| ops.dashboard | 9.42 | 9.86 | 0 |
| command-center.search | 10.87 | 10.37 | 1 |
| sp.poll | 2.32 | 2.59 | 1 |
| spph.poll | 2.15 | 2.59 | 1 |
| chat.messages | 2.34 | 2.78 | 1 |
| chat.mentions.unread | 2.19 | 2.38 | 1 |
| ppbj-collaboration.mentions | 2.15 | 2.07 | 1 |
| activity-broadcast.feed | 1.36 | 1.36 | 0 |

## Verifikasi

- 403 tes Laravel lulus; 71 tes JavaScript lulus.
- Pemeriksaan format PHP, sintaks JavaScript, sintaks PHP 8.3 production, serta diff check lulus.
- Regresi baru: request lambat/tidak selesai, timeout, hasil lama, tab tersembunyi, BFCache, batas 100 ID, cache penyedia tetap hangat dan invalidasi relevan, kontrak AJAX approval dan pembatasan departemen, serta konsistensi agregasi Owner/soft-delete.
- Aset app-shell.js, chatbot.js, torpr.js disalin ke webroot hosting terpisah dan dibandingkan identik dengan repository. Backup aset disimpan di direktori privat hosting.
- Endpoint /up setelah deploy memberikan HTTP 200. Aset shell HTTP 200 dengan kompresi Brotli dan Cache-Control public, max-age=604800, stale-while-revalidate=86400.
- Browser production dengan akun Umum memuat PPBJ, Owner Center, SP, SPPH; tabel SP/SPPH tetap sepuluh baris. Pemeriksaan tema dark/light dilakukan tanpa mengubah transaksi.
- Registry monitoring aplikasi pada 2–3 November saat pemeriksaan tidak memuat slow_pages/error_pages. Ini hanya kondisi metrik yang tersimpan, bukan bukti bahwa tidak pernah ada error atau latency di perangkat pengguna.

## Batasan dan tindak lanjut

Tidak ada jaminan nol lag/error pada semua perangkat atau semua waktu. p95/p99 HTTP nyata, CPU/Entry Processes/I/O akun hosting saat jam ramai, download cloud, ekspor besar, dan rendering dokumen tetap memerlukan pengukuran tersendiri. Tidak dilakukan stress test production atau penonaktifan autentikasi, validasi, rate limit, maupun audit keamanan.

PPBJ/SP/SPPH hangat tetap 5/5/3 query. Anggaran query tidak bertambah untuk optimasi ini. Prioritas perbaikan sekarang adalah menghindari request menumpuk dan rebuild cache yang tidak perlu, bukan menambah cache untuk menyembunyikan query yang sudah cepat atau menambahkan indeks tanpa bukti.

