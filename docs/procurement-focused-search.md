# Fokus pencarian pada satu PR

Pada kartu hasil pencarian terpadu PPBJ, SP, dan SPPH, pilih **Fokus PR ini** untuk melanjutkan penelusuran dalam PR tersebut. Label PR dan tombol **Keluar fokus** selalu terlihat selama fokus aktif. Pengguna dapat mengganti kata, sumber, atau filter lalu menekan **Cari di PR ini**. Reset menghapus fokus tanpa mengirim pencarian baru.

Fokus memakai kata dan filter terakhir yang sudah diterapkan. Draf yang belum diterapkan tidak diam-diam mengganti pencarian ketika tombol fokus atau keluar fokus ditekan. Hitung total, saran kata, dan pemuatan sumber tambahan mengikuti PR yang sama. Pencarian katalog arsip Super Admin tetap merupakan pencarian terpisah.

## Query dan keamanan

- Parameter `pr_id` pada `GET /procurement/search` harus integer positif. ID adalah penyaring hasil, bukan pemberian akses. Autentikasi, departemen Umum, batas request, dan pemeriksaan sumber hidup tetap berlaku.
- Filter ID diterapkan pada query PR, hitungan, kosakata saran, dan query skor sumber. Sumber yang terhubung ke beberapa PR tidak memperluas hasil ke PR lain.
- Satu PR tidak memerlukan pemeringkatan kata antar-PR. Jalur fokus melewati agregasi tersebut; skor bukti tetap dihitung untuk mengurutkan lampiran dalam PR itu, dengan token dibatasi ke sumber yang terhubung ke PR pilihan.
- Diagnosis kata yang hilang memeriksa indeks PR pilihan. Kata yang hanya ada di PR lain tidak dinyatakan tersedia pada PR fokus. Aturan nomor/angka tetap ketat dan tidak dilonggarkan.
- PR yang sudah dihapus, lampiran tidak aktif/kedaluwarsa, serta dokumen lokal yang sudah tidak berlaku tetap dikeluarkan. ID tidak ada menghasilkan hasil kosong. `pr`/`after` untuk bukti tambahan harus tetap memenuhi `pr_id` jika fokus digunakan.
- Fokus hanya disimpan selama halaman terbuka; tidak ada penyimpanan riwayat baru, cache hasil privat, OCR sinkron, layanan eksternal, penulisan bisnis, atau migrasi baru.
- Respons usang tidak dapat mengaktifkan fokus dari kartu pencarian sebelumnya. Berpindah fokus, pencarian baru, atau Reset membatalkan pembacaan sebelumnya melalui pembatalan yang sudah ada.

## Validasi

Uji PHP memeriksa urutan bukti yang sama, relasi gabungan, filter, scope, mode kata, hitung, sumber tambahan, penghapusan PR, sumber kedaluwarsa, diagnosis kata, saran, validasi ID, dan izin pengguna. Uji JavaScript memeriksa fokus eksplisit, draf filter, query lanjutan, hitung, keluar/reset, pembatalan, ID tidak valid, serta label yang tetap berupa teks aman.

`tests/Browser/procurement-focus-search.cjs` memakai komponen Blade/aset sebenarnya dan respons fixture untuk memeriksa desktop terang dan ponsel gelap, lima request manual, perubahan kata dalam fokus, hitung, keluar fokus, dan lebar tampilan. Ini pengujian UI, bukan uji beban produksi.

Pada 12 November 2026, 16 perbandingan bergantian dalam snapshot database baca yang sama menghasilkan bukti identik. Query generik dengan filter ID PR yang sama memiliki median 28,60 ms; jalur fokus yang dioptimalkan 25,99 ms, maksimum 36,91 ms. Sampel mencakup `kursi`, `plastik`, `pengadaan`, dan `kursi plastik`. Ini waktu aplikasi server tanpa jaringan, bukan jaminan untuk semua kata atau beban pengguna. Pencarian seluruh PR tetap memakai jalur yang sudah ada; peningkatan ini khusus penelusuran dalam satu PR. Kelengkapan arsip tetap bergantung pada halaman yang sudah diproses dan mutu teks sumber.
