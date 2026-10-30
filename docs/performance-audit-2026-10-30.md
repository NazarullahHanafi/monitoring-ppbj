# Audit performa SIMONPR — 30 Oktober 2026

## Ruang lingkup dan metode

Audit aplikasi pada repository SIMONPR ini, bukan audit terpisah seluruh aplikasi Sistem Arsip, infrastruktur penyedia hosting, atau OneDrive. Pemeriksaan meliputi 25 halaman/endpoint awal, diperluas menjadi 32 endpoint baca-saja, metadata seluruh 42 tabel database aplikasi, dan 81 bentuk query representatif menggunakan EXPLAIN pada baseline. Ini bukan jaminan setiap kombinasi filter atau setiap query ad-hoc telah dijalankan.

Tiga sampel controller + render/JSON dijalankan berurutan per endpoint di production, dengan akun yang sesuai departemen dan sesi audit sementara di memori. Tidak ada stress test paralel, penyimpanan transaksi uji, pengiriman chat, atau pengubahan akun. Cache aplikasi yang normal boleh terisi; Redis tidak di-flush. Pengujian aksi tulis/regresi memakai SQLite terisolasi, bukan transaksi production.

Angka di bawah merupakan **median tiga sampel proses controller + render/JSON**. Tidak termasuk bootstrap HTTP penuh, antrean PHP worker, middleware, TLS, transfer jaringan, download cloud, rendering browser, atau latensi perangkat. Sampel pertama dapat mengalami cache dingin, sehingga angka bukan p95/p99 dan bukan perbandingan beban terkontrol. Variasi pada menu yang tidak diubah tidak boleh dianggap sebagai hasil optimasi kode.

Runtime production saat audit: PHP CLI 8.3.36, cache redis, session redis. OPcache tersedia; kondisi PHP web worker tidak disimpulkan hanya dari CLI.

## Hasil menu dan endpoint

| Endpoint | Sebelum (ms) | Sesudah (ms) | Query pada sampel hangat terakhir |
| --- | ---: | ---: | ---: |
| dashboard.indexumum | 11.19 | 23.93 | 0 |
| ppbj.index | 154.57 | 30.17 | 6 |
| sp.index | 54.39 | 39.01 | 5 |
| spph.index | 70.46 | 40.64 | 3 |
| collaboration-calendar.index | 9.27 | 8.56 | 1 |
| collaboration-calendar.events | 164.03 | 21.70 | 2 |
| collaboration-calendar.ppbj-search | 12.02 | 13.09 | 3 |
| collaboration-inbox.index | 15.49 | 18.46 | 4 |
| command-center.index | 8.58 | 6.13 | 0 |
| command-center.overview | 1.31 | 1.25 | 0 |
| command-center.reconciliation | 1.35 | 6.06 | 0 |
| ppbj.report | 9.95 | 6.35 | 0 |
| ppbj.report.data | 162.87 | 23.89 | 4 |
| approval.pr.index | 14.91 | 22.83 | 4 |
| vendor.index | 13.09 | 23.62 | 2 |
| sp-master-options.index | 15.44 | 12.28 | 3 |
| satuan.index | 10.18 | 10.94 | 0 |
| users.index | 29.36 | 19.63 | 2 |
| owner.index | 22.69 | 21.82 | 6 |
| owner.security.index | 23.64 | 24.00 | 8 |
| contact-messages.index | 24.90 | 12.00 | 3 |
| account.edit | 6.93 | 6.57 | 0 |
| tracking.index | 7.25 | 8.68 | 0 |
| torpr.index | 24.05 | 16.91 | 6 |
| ops.dashboard | 8.77 | 6.84 | 0 |
| command-center.search | 11.71 | 9.57 | 1 |
| sp.poll | 1.80 | 1.85 | 1 |
| spph.poll | 1.69 | 2.37 | 1 |
| chat.messages | 1.74 | 2.27 | 1 |
| chat.mentions.unread | 3.68 | 3.34 | 1 |
| ppbj-collaboration.mentions | 1.51 | 1.86 | 1 |
| activity-broadcast.feed | 1.21 | 1.41 | 0 |

Semua 32 endpoint pada pengukuran ulang memberikan status 200. Hasil utama yang sesuai dengan perubahan kode: kalender sistem sekitar 87% lebih cepat pada median sampel; laporan data sekitar 85% lebih cepat. Jangan menafsirkan ini sebagai peningkatan 87% untuk seluruh website.

## Perubahan yang diterapkan

1. Kalender: cache hasil perhitungan agenda sistem selama maksimal 300 detik. Query kandidat tetap membaca data terbaru. Kunci memakai fingerprint seluruh atribut terpilih, rentang, source, departemen, tanggal hari ini, locale, timezone, dan URL. Perubahan langsung via SQL ikut mengubah fingerprint, meskipun updated_at tidak diperbarui. Agenda kustom/private dan izin pengguna tetap dihitung langsung, tidak dibagi melalui cache.
2. Kalender: filter tanggal PR memakai perbandingan kolom tanggal langsung; pemilihan source hanya memuat kandidat tanggal yang relevan.
3. Laporan: Query Builder menggantikan hidrasi model per baris. Sebelumnya accessor SLA dijalankan ketika JSON dibuat padahal tanggal yang diperlukannya tidak ada dalam projection. Baris laporan sekarang menggunakan snapshot status tersimpan yang sama dengan kartu agregat. Management PPBJ tetap memakai SLA live; laporan ini bukan perubahan semua statistik menjadi live.
4. Pesan contact: tiga COUNT independen disatukan menjadi satu agregasi. Query menu hangat turun dari 5 menjadi 3, tanpa menunda pembaruan status baca.
5. Owner/security: pemeriksaan keberadaan tabel honeypot tidak diulang; filter tanggal tidak membungkus kolom dengan DATE(). Audit log terakhir hanya mengambil created_at; perhitungan hari menggunakan rentang yang bisa memakai indeks.
6. SP/SPPH: single-flight guard untuk polling data dan presence, tidak mengirim polling saat tab tersembunyi, timer startup dibersihkan, heartbeat editor dihentikan saat tersembunyi/pagehide dan dipulihkan saat kembali. BFCache/pageshow tidak membuat polling berhenti permanen atau interval ganda.
7. URL JavaScript SP/SPPH memakai filemtime agar browser tidak menyimpan kode polling lama setelah deploy.
8. Migrasi defensif menambah indeks lookup ppbj_real_trackings(ppbj_id,id) pada schema production lama yang hanya mempunyai primary key, serta activity_logs(created_at,id). Existing left-prefix index tidak diduplikasi. Tidak ada data atau indeks lama yang dihapus.

Kode aplikasi awal audit: 4f9f9f6. Optimasi utama: ad2ad7a. Aset publik disalin ke webroot hosting dan diverifikasi identik dengan repository. Backup aset disimpan di direktori privat hosting. Migrasi penambahan indeks selesai sekitar 182 ms.

EXPLAIN sesudah deploy menunjukkan pencarian log terakhir memakai activity_created_id_index, covering index, estimasi 1 baris; baseline memilih full scan/filesort pada sekitar 884 baris estimasi.

## Inventaris seluruh tabel

Estimasi baris berasal dari information_schema, **bukan COUNT aktual**; angka InnoDB dapat berbeda cukup jauh. Tidak perlu menjalankan COUNT pada setiap tabel hanya untuk inventaris.

| Tabel | Estimasi baris sebelum | Ukuran data + indeks (MiB) |
| --- | ---: | ---: |
| chat_messages | 542 | 1.66 |
| ppbj | 571 | 1.30 |
| activity_logs | 884 | 0.47 |
| sps | 322 | 0.38 |
| chat_reads | 2099 | 0.38 |
| spphs | 260 | 0.33 |
| torprs | 285 | 0.31 |
| collaboration_handovers | 0 | 0.20 |
| pr_receipt_approvals | 263 | 0.19 |
| collaboration_events | 0 | 0.16 |
| users | 23 | 0.16 |
| spph_items | 239 | 0.13 |
| security_honeypot_events | 164 | 0.13 |
| sp_ppbj | 322 | 0.13 |
| cache | 34 | 0.09 |
| security_device_sessions | 42 | 0.09 |
| torpr_edit_requests | 1 | 0.09 |
| sp_items | 177 | 0.09 |
| chat_message_deletions | 0 | 0.08 |
| contact_messages | 37 | 0.06 |
| chat_reactions | 6 | 0.06 |
| ppbj_note_mentions | 0 | 0.06 |
| spph_ppbj | 222 | 0.06 |
| vendors | 31 | 0.05 |
| sessions | 0 | 0.05 |
| ppbj_collaboration_notes | 0 | 0.05 |
| sp_master_options | 19 | 0.03 |
| master_buyer | 4 | 0.03 |
| satuans | 19 | 0.03 |
| master_portofolio | 34 | 0.03 |
| emoji_messages | 0 | 0.03 |
| jobs | 0 | 0.03 |
| master_penyedia_eksternal | 14 | 0.03 |
| failed_jobs | 0 | 0.03 |
| master_metode_pengadaan | 3 | 0.03 |
| cache_locks | 0 | 0.02 |
| migrations | 47 | 0.02 |
| job_batches | 0 | 0.02 |
| ppbj_real_trackings | 16 | 0.02 |
| create_user_presences | 0 | 0.02 |
| master_penyedia_eksternal_table | 0 | 0.02 |
| password_reset_tokens | 0 | 0.02 |

Indeks sebelum: 220; sesudah: 222. Terdapat kelompok indeks dengan urutan kolom sama berikut. Belum dihapus: sebagian unique/primary/constraint-bearing, dan penghapusan perlu evaluasi tersendiri terhadap prefix length, jenis indeks, foreign key, dan penggunaan rute lain.

| Tabel / kolom | Nama indeks berulang |
| --- | --- |
| ppbj / status,progres,sisa_target_sla | idx_combo_filter, idx_ppbj_status_progress_sla |
| ppbj / tgl_ppbj | idx_ppbj_calendar_ppbj, idx_tgl_ppbj |
| ppbj / tgl_terima_pr | idx_ppbj_calendar_received, idx_tgl_terima_pr |
| ppbj / ppbj_no | idx_ppbj_no, ppbj_ppbj_no_unique |
| ppbj / spph_rfq_1 | idx_ppbj_spph_rfq, idx_ppbj_spph_rfq_1 |
| spphs / nama_vendor | idx_spphs_nama_vendor, idx_spphs_vendor |
| spphs / nomor_pr | idx_spphs_nomor_pr, spphs_nomor_pr_unique |
| spphs / nomor_spph | idx_spphs_nomor_spph, spphs_nomor_spph_unique |
| spphs / sequence_number | idx_spphs_sequence, idx_spphs_sequence_number |
| sps / nomor_pr | idx_sps_nomor_pr, sps_nomor_pr_unique |
| torprs / id | idx_id_desc, PRIMARY |
| torprs / nomor_pr | torprs_nomor_pr_index, torprs_nomor_pr_unique |

## Verifikasi dan batasan

- 320 tes Laravel lulus; 15 tes JavaScript lulus; pemeriksaan sintaks JS dan format PHP lulus.
- Regresi baru mencakup cache hangat, perubahan SQL langsung, pergantian hari, isolasi departemen/private agenda, laporan tanpa hidrasi model, konsistensi status baris/kartu, agregasi contact, migrasi idempotent/legacy schema, query plan indeks, dan polling lambat/error/tab tersembunyi.
- Pengujian skala yang sudah tersedia tetap memeriksa ribuan baris PPBJ/TORPR dengan pagination dan anggaran query tetap.
- Pemeriksaan browser dilakukan pada production dengan akun Umum; tidak mengubah transaksi untuk menguji create/edit/delete.
- Rendering berat PDF/Word/Excel, transfer lampiran cloud besar, dan batas konkurensi hosting tidak diuji dengan stress test production. Pembuatan dokumen dan download tetap on-demand; penyempurnaan throughput membutuhkan pengukuran file dan worker tersendiri.
- Lookup umum dan list utama sudah memakai batas/pagination. Query global agregasi dan substring LIKE lintas banyak kolom masih dapat memerlukan scan; pada ukuran saat audit query representatif cepat, tetapi jangan menjanjikan biaya tetap ketika data menjadi jutaan.
- Host memperlihatkan 60 CPU dan load sekitar 19 saat salah satu pemeriksaan. Itu metrik mesin bersama, bukan bukti akun ini sedang CPU-throttled. Batas LVE/Entry Processes/I/O akun dan p95 HTTP pengguna belum diukur.
- Tidak ada pengurangan autentikasi, rate-limit, audit keamanan, atau validasi bisnis untuk mengejar angka benchmark.

## Tindak lanjut yang layak dipantau

Pantau p95 HTTP nyata dan error 5xx saat jam ramai, resource usage akun hosting (CPU/EP/I/O), serta latensi arsip/cloud terpisah. Jika data membesar, pertimbangkan pencarian exact/prefix terindeks sebelum substring fallback, pagination server-side laporan di atas 1000 baris, dan antrean untuk ekspor besar. Konsolidasi indeks berulang dilakukan setelah memverifikasi constraint dan manfaat; jangan menambah indeks pada setiap kolom tanpa query plan.
