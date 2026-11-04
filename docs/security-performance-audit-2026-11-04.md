# Audit keamanan dan performa SIMONPR — 4 November 2026

## Temuan dan perubahan

Audit meliputi dependency aplikasi/build, batas autentikasi dan department, gateway arsip, aturan webroot, konfigurasi runtime, query 32 endpoint, serta tes regresi yang tersedia. Audit ini bukan pengujian seluruh kemungkinan serangan, penetration test eksternal, atau stress test production.

### 1. Pembaruan dependency keamanan

Baseline `composer audit --locked`: **13 advisory pada tujuh paket**. Baseline `npm audit`: **11 paket terdampak** (1 critical, 8 high, 2 moderate; angka ini paket, bukan jumlah advisory individual).

| Paket Composer | Sebelum | Sesudah |
| --- | --- | --- |
| laravel/framework | 12.62.0 | 12.71.0 |
| league/commonmark | 2.10.0 | 2.10.7 |
| league/flysystem | 3.34.0 | 3.36.0 |
| phpoffice/phpspreadsheet | 5.9.0 | 5.10.0 |
| symfony/http-foundation | 7.4.13 | 7.4.22 |
| symfony/mime | 7.4.13 | 7.4.22 |
| symfony/yaml | 7.4.13 | 7.4.22 |

Pembaruan Composer dibatasi ke tujuh paket tersebut dengan minimal changes; tidak ada paket yang ditambahkan/dihapus. npm diperbaiki tanpa force/major upgrade. Aset Vite dibangun ulang (Vite 7.3.7).

Hasil audit dependency lokal setelah pembaruan: **0 advisory Composer, 0 kerentanan npm**, tidak ada paket Composer abandoned yang dilaporkan. Ini berarti tidak ada advisory yang diketahui oleh sumber audit saat pemeriksaan, bukan bukti bahwa dependency bebas seluruh celah yang belum diketahui.

Contoh sumber resmi yang diperiksa: [Laravel TokenGuard](https://github.com/laravel/framework/security/advisories/GHSA-f9x3-7vq9-cph6), [PhpSpreadsheet XML scanner](https://github.com/PHPOffice/PhpSpreadsheet/security/advisories/GHSA-3x94-m842-937c), dan [Symfony HeaderUtils](https://symfony.com/cve-2026-108082). SIMONPR terkonfigurasi menggunakan guard **session**, sehingga prasyarat celah TokenGuard tidak terlihat aktif di konfigurasi yang diperiksa. Patch tetap diterapkan. Tidak dilakukan pengiriman payload eksploit ke production; audit ini tidak menyimpulkan telah terjadi pembobolan.

### 2. Batas akses gateway arsip

Endpoint metadata `torpr/my-progress/archive` sudah membatasi Operasional ke PR yang dibuatnya. Gateway file sebelumnya hanya memeriksa login dan target URL arsip; pengguna Operasional yang mengetahui nomor PR/file dapat melewati pembatasan endpoint metadata itu.

Gateway kini memeriksa department dan kepemilikan PR **sebelum** membaca metadata API/cache atau melakukan request file. Preview, download, dan package memakai pemeriksaan yang sama. Umum dan viewer Umum tetap dapat membaca; pembuat Operasional tetap dapat membuka arsip PR-nya. Department lain ditolak. Tidak ada perubahan ownership atau isi dokumen.

Tes baru membuktikan penolakan PR pengguna lain pada ketiga jenis aksi, penolakan department lain sebelum layanan arsip dipanggil, serta unduhan pembuat/viewer yang tetap berhasil.

### 3. File sensitif di webroot dan metrik scanner

Aturan Apache kini menolak dotfile termasuk varian backup `.env`, file log/error_log, dump SQL/SQLite, dan ekstensi backup. `.well-known/acme-challenge` serta aset build tetap diizinkan. Tes memeriksa pola penolakan dan pengecualian aset/ACME.

Baseline HTTP hosting **sudah menolak** contoh `.env.production.backup` dan `error_log` dengan 403. Perubahan ini memperkuat aturan aplikasi dan konsistensi penolakan, bukan bukti bahwa kedua file tersebut sebelumnya terbuka untuk umum.

Monitoring juga mengenali probe dotfile backup agar tidak dihitung sebagai traffic pengguna atau memicu alert yang menyesatkan. Tidak ada tambahan polling/query halaman dari perubahan ini. Query kepemilikan hanya ditambahkan ketika pengguna Operasional membuka gateway arsip.

## Pengujian lokal

- Baseline: 438 tes PHP / 2.724 assertions dan 86 tes JavaScript lulus.
- Setelah perubahan: **442 tes PHP / 2.755 assertions dan 86 tes JavaScript lulus**.
- Tes gateway, integrasi arsip, dan scanner terarah: 16 tes / 96 assertions lulus.
- Composer validate, package discovery, format PHP terkait, build Vite, dan diff check berhasil.
- Tes PHP memakai SQLite in-memory; tidak melakukan reset, seeding, approval, atau delete pada database production.

## Konfigurasi dan kondisi hosting yang diperiksa

- PHP CLI 8.3.36; Laravel baseline 12.62.0.
- APP_ENV production, debug nonaktif, config/routes cached.
- Redis untuk cache dan session; cookie Secure + HttpOnly + SameSite=Lax.
- Header HSTS, nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy, serta CSP terlihat pada respons login.
- CSP masih mengizinkan inline/eval dan sejumlah CDN agar sesuai frontend yang ada. Migrasi ke nonce/self-hosted assets memerlukan pekerjaan tersendiri; keberadaan CSP tidak berarti semua risiko XSS hilang.
- Queue default sync; tabel jobs/failed_jobs kosong saat snapshot. Angka nol tidak membuktikan seluruh integrasi selalu bebas masalah, dan driver tidak diubah dalam audit ini.
- File `.env` 0600. Storage root ditemukan 0777 dan ditinjau untuk menghapus izin tulis bagi other setelah backup.
- Partisi server bersama: **95% terpakai, sekitar 17 GB tersedia** pada snapshot. Ini mencakup seluruh partisi hosting, bukan hanya akun SIMONPR. Aplikasi SIMONPR sekitar 146 MB; backup akun sekitar 1,5 GB. Tidak dilakukan penghapusan backup atau aplikasi lain.
- Load average sekitar 20–23 pada mesin dengan 60 CPU logis. Angka load sendiri tidak cukup untuk menyimpulkan CPU jenuh; limit akun CPU/Entry Processes/I/O dan p95 jam ramai belum tersedia dari pemeriksaan ini.
- Tidak terlihat berkas log harian baru setelah 26 Oktober pada daftar yang diperiksa. Absennya log baru/metrik error tidak membuktikan tidak pernah ada error pengguna.

## Profil performa sebelum rilis

32 endpoint × tiga sampel berurutan, seluruh 96 respons controller berhasil (200). Request profil memakai origin production eksplisit. Profil hanya membaca data bisnis dan dapat mengisi cache aplikasi secara normal. Tidak ada pengujian paralel/stress test.

| Endpoint | Rata-rata tiga sampel (ms) | Query sampel hangat |
| --- | ---: | ---: |
| dashboard.indexumum | 28,39 | 0 |
| ppbj.index | 68,56 | 5 |
| sp.index | 55,33 | 5 |
| spph.index | 31,26 | 3 |
| torpr.index | 22,26 | 6 |
| collaboration-inbox.index | 18,36 | 4 |
| ppbj.report.data | 34,15 | 4 |
| command-center.search | 10,85 | 1 |
| sp.poll | 2,29 | 1 |
| spph.poll | 3,36 | 1 |

Angka adalah controller + render/JSON pada CLI hosting; tidak mencakup bootstrap HTTP, middleware/terminate, TLS/jaringan, render browser, maupun transfer cloud. Sampel HTTP HEAD baseline `/up` sekitar 202 ms dan `/login` 105 ms dari hosting; ini bukan hasil browser pengguna, p95, SLA, atau bukti seluruh halaman selalu di bawah satu detik.

Tidak ada bukti yang mengharuskan menambah indeks atau merombak query daftar yang sudah terjaga anggarannya. Fokus perubahan rilis ini adalah patch keamanan dan pembatasan akses; tidak diklaim ada percepatan drastis seluruh website.

## Rilis dan verifikasi production

Status deployment serta pengukuran setelah rilis dicatat setelah pemeriksaan selesai. Browser terdeteksi tetapi koneksi kontrol tab gagal setelah percobaan pemulihan; tidak ada klaim verifikasi visual light/dark pada audit ini. Pemeriksaan hosting dilanjutkan melalui SSH yang sudah terotorisasi, HTTP, serta profil controller.

## Batas dan tindak lanjut

Prioritas operasional tersisa: pantau kapasitas partisi bersama dan limit akun hosting saat keluhan terjadi; ukur p95/p99 HTTP dari perangkat/jaringan pengguna; uji alur cloud/cetak besar secara khusus bila ada kasus konkret. Audit ini tidak mengukur seluruh tenant, tidak menjamin nol lag/error, dan tidak mengubah password, driver queue/session, maupun data transaksi production.
