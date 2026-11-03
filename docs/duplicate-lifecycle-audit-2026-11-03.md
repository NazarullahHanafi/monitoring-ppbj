# Audit duplikasi, lifecycle, dan navigasi cache — 3 November 2026

## Rilis dan cakupan

Perubahan aplikasi `65b3177` dan `0d2e1e1` sudah dipush dan dideploy. Audit ini melanjutkan [audit performa sebelumnya](performance-audit-2026-11-03-follow-up.md) dan perbaikan badge Approval PR `80b7a33`.

Fokus: duplikasi struktur HTML/script, penumpukan pekerjaan browser, ketepatan saran Action Inbox, serta tautan di cache lintas host/role. Ini bukan klaim seluruh baris kode, seluruh kombinasi input, seluruh tabel, atau seluruh keadaan UI telah terbukti bebas bug.

## Temuan yang diperbaiki

### Lifecycle teks informasi berjalan

Sebelumnya timer awal dapat memulai request ketika tab tersembunyi, request tidak memiliki timeout/pembatalan, dan klik next/previous cepat dapat meninggalkan beberapa callback animasi. Tes mereproduksi empat callback frame tertunda setelah pergantian item cepat.

Kini komponen memiliki satu timer pemuatan, satu request aktif dengan timeout 15 detik, dan satu rangkaian requestAnimationFrame. Request/timer/frame dibatalkan saat tab disembunyikan atau halaman ditinggalkan. Respons/frame lama tidak boleh menimpa penggantinya. BFCache/pageshow dapat memulihkan proses yang dibatalkan tanpa membuka kembali banner yang sudah ditutup pengguna.

Jeda awal lima detik, cache sessionStorage satu menit per pengguna, rotasi reduced-motion, dan perilaku muncul lagi setelah reload dipertahankan. Tidak ditambahkan polling feed periodik atau library baru. Pembatalan browser tidak menjamin worker server yang sudah bekerja langsung berhenti.

### Konsistensi Action Inbox

- Query radar Umum sebelumnya tidak memilih nominal dan tanggal awal SLA yang dibutuhkan perhitungan prioritas. PR terlambat dapat tampil sebagai high, bukan critical. Kolom acuan kini dimuat dalam query yang sama, tanpa lookup tambahan per baris.
- Nomor DO yang terisi tetapi tanggal DO kosong sebelumnya dapat mendapat saran melengkapi invoice. Kini tetap diarahkan ke serah terima yang belum lengkap.
- Tautan radar Operasional ke TORPR sebelumnya memakai parameter search, padahal controller TORPR membaca q. Kini navigasi benar-benar memfilter PR yang dipilih.
- Batas tujuh hari pemenuhan menggunakan batas eksklusif tanggal hari kedelapan, sehingga seluruh hari ketujuh tercakup tanpa fungsi DATE pada kolom.
- Batas kandidat 24, hasil 12, serta cache 45 detik tetap dipertahankan. Tes radar Umum membuktikan satu query saat cache kosong dan nol saat cache hangat.

### Navigasi cache lintas host dan role

Pemeriksaan browser menemukan tautan radar tersimpan sebagai localhost setelah profil CLI membangun request relatif. Ini terjadi karena URL absolut dihasilkan di dalam cache bersama, sehingga host pengisi cache ikut tersimpan. Proses profil diperbaiki untuk membangun request dengan origin production yang eksplisit; hasil akhir memverifikasi host sucofindoumumpku.com.

Tautan radar dan action_urls Command Center kini berupa path relatif. Cache overview/reconciliation tetap memakai kunci yang cocok dengan invalidasi aplikasi; dua cache tersebut disegarkan secara terarah saat deploy, bukan flush Redis. Namespace radar diperbarui untuk tidak memakai tautan lama.

Feed informasi menyimpan konten bersama, lalu membentuk ulang tautan untuk departemen penerima setelah cache dibaca. Ini juga memperbaiki kasus cache hangat antara Umum dan Superadmin Operasional: penerima Operasional mendapat Tracking PR, bukan tautan menu Umum. Entri cache lama dengan URL absolut ditimpa pada respons; cache browser feed memakai versi baru.

Tes lintas-host memakai origin tiruan di dalam test kernel, tanpa menghubungi domain tersebut. Otorisasi dan visibilitas konten tidak diperluas. URL QR/tracking publik yang memerlukan URL absolut tidak diubah.

## Pemeriksaan duplikasi

Tes HTML hasil render mencakup PPBJ, SP, SPPH, Kalender Kolaborasi, Action Inbox, Approval PR, Owner Center, TORPR, dan Tracking PR dengan dua record dokumen contoh. Tidak ditemukan ID nonkosong yang ganda atau script src identik yang dimuat dua kali pada skenario tersebut.

Tes JavaScript memastikan inisialisasi broadcast kedua tidak membuat request/listener baru, tab tersembunyi tidak memuat feed, request lama tidak menimpa hasil baru, animasi cepat tidak menumpuk, serta reduced-motion/BFCache tetap berfungsi.

Di browser production, DOM Action Inbox sesudah script berjalan menunjukkan nol ID duplikat, satu komponen broadcast, dan satu elemen badge Approval PR desktop. Badge pada widget berbeda tidak otomatis berarti data ganda; badge chatbot adalah indikator terpisah dari badge navigasi Approval PR.

## Verifikasi

- **435 tes PHP, 2.694 assertions, dan 82 tes JavaScript lulus.**
- Format PHP, sintaks JavaScript, diff check, serta lint file runtime dengan PHP hosting 8.3.36 lulus.
- Cache config/routes/views berhasil dibangun. Aset broadcast disalin ke webroot hosting yang terpisah, dibandingkan identik, dan checksum respons HTTP dikonfirmasi sama dengan repository.
- Backup aset tersedia di direktori privat hosting.
- /up setelah rilis terakhir HTTP 200, sampel 165 ms; bukan SLA atau p95.
- Browser akun Umum berhasil memuat Action Inbox. Tautan radar/feed yang diperiksa tetap menuju domain production. Teks berjalan aktif, berhenti saat panel dibuka, panel light/dark terbaca, dan tidak ada error JavaScript tercatat pada tab audit. Tema dikembalikan ke kondisi semula.
- Tidak dilakukan approval, delete dokumen, perubahan nilai/vendor, migrasi, stress test paralel, atau unduhan cloud besar di production.

## Profil halaman setelah rilis terakhir

Tiga sampel berurutan per skenario, seluruh 24 respons berhasil. Angka berikut adalah median **controller + render/JSON di CLI hosting**, tidak termasuk bootstrap HTTP penuh, middleware/terminate, TLS, jaringan, render perangkat, atau file cloud. Data bisnis hanya dibaca; cache aplikasi dapat terisi normal. Origin request CLI ditetapkan ke domain production, bukan localhost.

| Skenario | Median (ms) | Query sampel hangat terakhir | Status |
| --- | ---: | ---: | ---: |
| dashboard.indexumum@umum | 16.43 | 0 | 200 |
| ppbj.index@umum | 40.68 | 5 | 200 |
| sp.index@umum | 28.51 | 5 | 200 |
| spph.index@umum | 28.97 | 3 | 200 |
| collaboration-inbox.index@umum | 18.28 | 4 | 200 |
| collaboration-inbox.index@operasional | 11.28 | 4 | 200 |
| torpr.index@operasional | 19.57 | 6 | 200 |
| activity-broadcast.feed@umum | 2.24 | 0 | 200 |

Budget hangat PPBJ/SP/SPPH tetap 5/5/3 query; feed hangat nol query. Tidak ada bukti untuk menyatakan semua menu menjadi jauh lebih cepat dari angka ini: beban hosting, perubahan data oleh pengguna, dan kedaluwarsa cache memengaruhi sampel. Manfaat yang terbukti adalah pekerjaan browser lebih terkontrol, perhitungan saran benar, dan navigasi cache tidak terikat host/role pengisi.

Nol lag/error selamanya tidak dapat dijamin. Latensi p95/p99 pada jam ramai, limit shared hosting, cetak/ekspor besar, layanan cloud, serta sistem Arsip terpisah masih memerlukan pengukuran khusus bila ada keluhan konkret.

