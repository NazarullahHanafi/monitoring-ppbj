# Audit lanjutan query dan stabilitas — 3 November 2026

## Ringkasan rilis

Kode aplikasi `08b0654` sudah dipush dan dideploy, melanjutkan [audit sebelumnya](performance-audit-2026-11-03-final.md). Putaran ini memperbaiki kerja database berulang pada Tracking PR dan pencatatan perangkat, serta input pencarian yang dapat memicu server error.

Seluruh **426 tes PHP (2.628 assertions)** dan **75 tes JavaScript** lulus. Sembilan tes PHP baru menguji batas query, validasi, throttle pencatatan perangkat, pembersihan terbatas, kegagalan sementara, dan kondisi balapan.

## Perbaikan dan bukti

### Tracking PR

Nama pembuat, penerima Umum, penyetuju, penolak, dan pengaju kini diambil dalam satu query terbatas, hanya kolom id dan name. ID duplikat digabungkan; nama historis penandatangan dan fallback pembuat tetap dipertahankan. Kunci dan TTL cache tidak berubah.

Tes lima pelaku membuktikan **5 menjadi 1 query nama**. Pengukuran read-only di hosting pada record yang sama membuktikan:

| Ukuran | Sebelum | Sesudah |
| --- | ---: | ---: |
| Query total saat cache metadata kosong | 6 | 4 |
| Query nama pelaku | 3 | 1 |
| Query saat cache metadata hangat | 0 | 0 |
| Median controller dari tiga sampel metadata kosong | 4,28 ms | 4,07 ms |

Untuk perbandingan terisolasi ini, cache dialihkan ke array hanya di proses CLI pengukur. Tidak ada cache Redis production yang dihapus, sesi login yang dibuat, atau data transaksi yang diubah. “Cache metadata kosong” bukan restart PHP/server; bootstrap framework dilakukan sebelum pengukuran. Sampel pertama sebelum/sesudah 30,08/40,09 ms, dan sampel hangat 0,36/0,89 ms menunjukkan variasi runtime. Penurunan jumlah query adalah hasil yang pasti pada skenario ini, bukan bukti peningkatan drastis waktu muat seluruh website.

### Pencatatan perangkat

Registrasi/pembaruan perangkat memakai upsert atomik dengan indeks unik session_hash yang diverifikasi langsung di hosting. Tes membuktikan **3 menjadi 1 query** pada sentuhan perangkat di luar pembersihan berkala. Permintaan ulang dalam lima menit tetap tidak menjalankan SQL telemetri.

Pembersihan metadata lebih tua dari tujuh hari kini memiliki guard cache global satu jam, bukan DELETE untuk setiap perangkat. Maksimal 500 baris dipilih per putaran melalui indeks last_activity_at; kondisi umur diperiksa lagi saat DELETE agar metadata yang baru disegarkan worker lain tidak ikut dihapus. Backlog lebih dari 500 akan selesai pada putaran berikutnya, bukan dipaksakan dalam satu request. Guard bergantung pada cache bersama; jika cache hilang/tereviksi, putaran berikutnya dapat berjalan lebih awal, tetapi tetap terbatas 500.

Jika penulisan atau pembersihan gagal, guard yang relevan dilepas agar bisa mencoba lagi, tanpa menggagalkan respons pengguna. Tes mencakup kegagalan penulisan, kegagalan pembersihan, dan perangkat yang disegarkan setelah dipilih untuk dibersihkan.

ID sesi tetap terenkripsi, retensi tujuh hari dipertahankan, dan fungsi revoke sesi tidak diubah. Pembersihan ini menghapus metadata registry lama, bukan sesi login aktif. Tidak ada observer/model event khusus perangkat yang dilewati karena model tersebut tidak memilikinya.

EXPLAIN di hosting memilih indeks security_device_sessions_last_activity_at_index dengan akses range dan Using index. Tidak ada migrasi atau indeks tambahan.

### Input pencarian

Input q pada landing tracking, tracking internal, dan suggestion divalidasi sebagai string maksimal 180 karakter sebelum query. Input array sebelumnya terbukti menghasilkan 500 di tes; sekarang menghasilkan 422. Validasi suggestion berada di luar blok fallback error agar kesalahan input tidak diklasifikasikan sebagai kegagalan aplikasi.

Penghapusan cache tracking juga memvalidasi bentuk nomor setelah pemeriksaan izin Superadmin Operasional. Izin, rate limit, dan autentikasi tidak dilonggarkan. Dua GET diagnostik ke /track dan /track/suggest production mengembalikan **HTTP 422** untuk input array.

## Verifikasi lintas menu

Profil ulang 32 halaman/endpoint di hosting: tiga sampel berurutan masing-masing, seluruh **96 respons controller/render/JSON berstatus 200**. Ini bukan pengukuran HTTP browser: bootstrap HTTP, middleware, fase terminate, TLS, jaringan, render perangkat, dan transfer file cloud tidak tercakup.

Cache hosting digunakan secara normal pada profil lintas menu ini, tanpa flush Redis atau pengujian beban paralel. Angka tidak dibandingkan sebagai klaim percepatan dengan audit terdahulu karena beban hosting/cache/waktu pengukuran berbeda.

| Endpoint | Median controller + render/JSON (ms) | Query sampel terakhir | Status |
| --- | ---: | ---: | ---: |
| dashboard.indexumum | 11.49 | 0 | 200 |
| ppbj.index | 26.60 | 5 | 200 |
| sp.index | 48.75 | 5 | 200 |
| spph.index | 33.08 | 3 | 200 |
| collaboration-calendar.index | 8.57 | 1 | 200 |
| collaboration-calendar.events | 11.60 | 2 | 200 |
| collaboration-calendar.ppbj-search | 17.20 | 3 | 200 |
| collaboration-inbox.index | 14.44 | 4 | 200 |
| command-center.index | 7.22 | 0 | 200 |
| command-center.overview | 1.40 | 0 | 200 |
| command-center.reconciliation | 1.31 | 0 | 200 |
| ppbj.report | 6.74 | 0 | 200 |
| ppbj.report.data | 23.65 | 4 | 200 |
| approval.pr.index | 16.30 | 4 | 200 |
| vendor.index | 17.84 | 2 | 200 |
| sp-master-options.index | 11.41 | 3 | 200 |
| satuan.index | 15.42 | 0 | 200 |
| users.index | 25.21 | 2 | 200 |
| owner.index | 36.07 | 6 | 200 |
| owner.security.index | 26.10 | 8 | 200 |
| contact-messages.index | 12.94 | 3 | 200 |
| account.edit | 6.04 | 0 | 200 |
| tracking.index | 10.54 | 0 | 200 |
| torpr.index | 26.10 | 6 | 200 |
| ops.dashboard | 10.42 | 0 | 200 |
| command-center.search | 10.15 | 1 | 200 |
| sp.poll | 1.90 | 1 | 200 |
| spph.poll | 2.29 | 1 | 200 |
| chat.messages | 1.90 | 1 | 200 |
| chat.mentions.unread | 2.61 | 1 | 200 |
| ppbj-collaboration.mentions | 1.96 | 1 | 200 |
| activity-broadcast.feed | 1.32 | 0 | 200 |

Rencana EXPLAIN untuk query terberat pada sampel diperiksa. Agregasi/laporan dapat memindai tabel PPBJ dengan estimasi sekitar 571 baris; scan tersebut bukan otomatis masalah. Query terlama yang tercatat dalam kumpulan perwakilan ini sekitar 13,84 ms. Tidak ditambahkan indeks spekulatif atau cache pengguna yang berpotensi mengabaikan izin.

## Pemeriksaan production dan batasan

- Lint kedua file runtime pada PHP hosting 8.3.36 lulus; cache config/routes/views Laravel berhasil dibangun.
- Pemeriksaan format file baru/middleware, sintaks controller, dan git diff check lulus.
- Cache dan session hosting Redis; APP_DEBUG false. Tidak diubah untuk mengejar benchmark.
- Snapshot antrean: 0 pending jobs dan 0 failed jobs. Registry monitoring hari pemeriksaan: 0 slow/error paths tercatat. Ini bukan bukti tidak pernah terjadi lambat/error.
- /up setelah rilis HTTP 200, sampel 107 ms; bukan SLA atau p95.
- Browser production dengan akun Umum berhasil membuka daftar dan rincian cepat PPBJ. Tracking publik mempertahankan nama pembuat, penandatangan historis, penerima, dan urutan status. Tema terang/gelap diperiksa; tidak ada error JavaScript tercatat pada tab audit.
- Tidak ada approval, delete dokumen, perubahan nilai/vendor, stress test, atau unduhan lampiran besar di production untuk audit ini. Navigasi browser hanya memicu pencatatan sesi normal aplikasi.

Audit ini selesai untuk cakupan tersebut, bukan jaminan nol lag/error selamanya atau audit keamanan menyeluruh. p95/p99 HTTP pada jam ramai, limit CPU/Entry Processes/I/O hosting, cetak/ekspor besar, seluruh kombinasi filter, layanan cloud, dan sistem Arsip terpisah tetap membutuhkan pengukuran tersendiri jika ada keluhan konkret.

