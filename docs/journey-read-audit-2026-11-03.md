# Audit pembacaan perjalanan PR dan rincian cepat - 3 November 2026

## Rilis dan perubahan

Kode aplikasi `933a564` telah diuji, dipush, dan dideploy. Audit ini melanjutkan [audit lifecycle dan cache](duplicate-lifecycle-audit-2026-11-03.md), bukan menggantikan hasil pengukuran sebelumnya.

- Indikator tahap pengadaan tidak lagi memuat model SP/SPPH hanya untuk memeriksa keberadaan. Jika referensi dokumen sudah tercatat pada PPBJ, lookup relasi dilewati. Jika belum, pemeriksaan relasi yang diperlukan digabung dalam satu query `loadExists`, tetap mengecualikan dokumen soft-deleted.
- Rincian cepat PPBJ memuat referensi SP/SPPH untuk daftar dokumen, lalu perjalanan PR menggunakan relasi tersebut tanpa membaca ulang. Isi respons dan aturan bisnis tidak diubah.
- Indeks unik `ppbj_id` pada kedua tabel pivot telah dikonfirmasi di production. Satu PR memang sudah dibatasi ke satu SP dan satu SPPH oleh skema saat ini; tidak dilakukan perubahan aturan relasi atau klaim penghematan dari daftar dokumen besar.
- GET metadata rincian/lampiran dibatasi 20 detik, termasuk pembacaan body JSON. Kegagalan menampilkan pesan dan pilihan mencoba kembali, bukan retry otomatis. Penutupan panel/pergantian dokumen membatalkan request browser; respons lama tidak boleh menimpa hasil baru. URL metadata harus same-origin.
- Cache rincian per pengguna maksimal 20 detik dan pemeriksaan otorisasi tetap dipertahankan. Tidak ditambahkan polling, library, queue job, atau timeout pada penyimpanan data bisnis maupun stream unduhan file.

Pembatalan browser tidak menjamin worker server yang sudah bekerja langsung berhenti. Timeout bukan pengganti optimasi server.

## Pengujian

- **438 tes PHP / 2.724 assertions dan 86 tes JavaScript lulus.**
- Tes baru memeriksa budget query perjalanan PR, penggunaan ulang relasi rincian cepat, cache hangat, referensi lama, dan pengecualian dokumen soft-deleted.
- Tes JavaScript memeriksa koneksi/body JSON menggantung, retry manual, respons terlambat, pergantian request, penutupan panel, pembersihan timer, dan penolakan URL metadata eksternal.
- Sintaks PHP/JavaScript, format file PHP baru/terkait, serta `git diff --check` lulus. Controller runtime lulus lint PHP hosting 8.3.36; cache config/routes/views berhasil dibangun.
- Aset workspace disalin ke webroot hosting yang terpisah dan dibandingkan dengan repository; checksum respons HTTP juga sama. Backup aset dibuat di direktori privat hosting.

## Pengukuran production sebelum/sesudah

Tiga sampel berurutan pada PR yang sama dengan SP dan SPPH aktif. Profil read-only memanggil controller perjalanan PR di CLI hosting dengan origin production eksplisit. Lookup record dilakukan sebelum pengukuran, sehingga angka tidak mencakup route binding, bootstrap HTTP penuh, middleware, TLS/jaringan, render browser, atau layanan cloud. Tidak dilakukan stress test.

| Sampel | Sebelum (ms) | Sesudah (ms) | Query sebelum/sesudah | Query relasi dokumen sebelum/sesudah |
| --- | ---: | ---: | ---: | ---: |
| 1 | 45,19 | 38,57 | 4 / 2 | 2 / 0 |
| 2 | 7,27 | 4,80 | 4 / 2 | 2 / 0 |
| 3 | 7,11 | 7,14 | 4 / 2 | 2 / 0 |

Seluruh respons HTTP 200. Median 7,27 menjadi 7,14 ms: perubahan latensi kecil, bukan percepatan drastis yang terbukti. Pengurangan query **50% pada skenario controller ini** terukur; model SP/SPPH yang dihidrasi turun dari dua menjadi nol. Sampel tersebut sudah memiliki referensi tersimpan, sehingga query relasi dapat dilewati seluruhnya. Untuk referensi kosong, tes memastikan satu query keberadaan gabungan.

Health check `/up` setelah deploy HTTP 200, satu sampel 571 ms. Ini bukan p95, SLA, atau ukuran kecepatan seluruh aplikasi.

## Browser dan batas verifikasi

Browser production akun Umum berhasil membuka rincian PPBJ yang memiliki SP/SPPH. Informasi pembuat TOR/PR, penandatangan, penerimaan Umum, nilai, dokumen terkait, serta tahap perjalanan tetap tampil. `Muat terbaru` berhasil. Panel diperiksa secara visual pada mode terang dan gelap; tidak ada error JavaScript tercatat pada tab audit. Tema dikembalikan ke kondisi awal.

Tidak dilakukan approval, delete, perubahan vendor/nilai, migrasi, atau pengujian unduhan cloud besar di production. Data bisnis tidak diubah untuk pengujian. Tidak ada flush Redis atau perubahan driver queue.

Hasil ini tidak menjamin semua kombinasi input, seluruh kode, maupun kondisi shared hosting selalu bebas lag/error. Latensi p95/p99 jam ramai, cetak/ekspor besar, dan unduhan cloud tetap membutuhkan pengukuran khusus bila keluhan berlanjut.
