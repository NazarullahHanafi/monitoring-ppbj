# Lampiran rincian SPPH dan SP

Form tambah/edit mendeteksi rujukan lampiran pada deskripsi dan rincian barang, misalnya “terlampir”, “dilampirkan”, “lihat lampiran”, “rincian menyusul”, dan beberapa padanan Inggris. Negasi eksplisit seperti “tanpa lampiran” tidak membuat pengingat. Deteksi memakai aturan bahasa yang dapat diperiksa, bukan model generatif.

Pengguna bisa mengunggah sekarang atau memilih “Saya lengkapi nanti”. Simpan tetap diperbolehkan. Tabel menampilkan status rincian belum diunggah, menyusul, perlu diperiksa, atau bisa dicari. Lampiran dapat dilengkapi dari tombol pada kolom deskripsi. Status juga dikenali pada dokumen lama tanpa mengubah data transaksi lama.

## Pembacaan dan pencarian

- Word `.docx`: XML dokumen dibaca langsung di server; baris dan kolom tabel dipertahankan sebagai baris dan tab. Gambar tertanam dalam Word belum diproses otomatis. Word `.doc` perlu disimpan ulang sebagai `.docx`.
- PDF digital: PDF.js mengambil teks per halaman. Halaman dengan teks sedikit, atau gambar dengan teks digital sedikit, dialihkan ke OCR Tesseract WebAssembly Indonesia/Inggris di perangkat pengguna. PDF campuran diproses per halaman. Heuristik ini bukan jaminan semua area gambar dalam PDF campuran terbaca.
- Seluruh script, worker, core, font, dan data bahasa disajikan dari domain sendiri. Tidak ada layanan AI eksternal, API berbayar, atau pengiriman dokumen ke penyedia model.
- Batas: 10 MB per berkas, 30 halaman untuk pembacaan PDF, 200.000 karakter teks, 5 lampiran per dokumen. Pembacaan PDF dapat dibatalkan. Bila pembaca tidak tersedia atau gagal, berkas dapat diunggah dan teks diperiksa/dilengkapi kemudian.
- Teks hasil pembacaan belum masuk pencarian sampai pengguna menekan **Konfirmasi isi untuk pencarian**. Hasil pembacaan asli tetap disimpan terpisah dari teks yang diperiksa. Pemeriksaan memakai versi untuk mencegah penimpaan perubahan dari tab lain.
- Pencarian daftar dan ekspor memakai `ProcurementDocumentSearch` yang sama, termasuk isi lampiran yang telah diperiksa. Hasil menampilkan nama sumber dan cuplikan teks. Angka transaksi, harga, item cetak, dan penomoran tidak otomatis diubah dari hasil pembacaan.
- Ini belum mencakup pencarian vektor/semantik, penyamaan barang lintas transaksi, perbandingan harga otomatis, atau percakapan RAG.

## Penyimpanan dan akses

File berada pada disk `local` privat dan hanya diunduh melalui route autentikasi Department Umum. Unggah, periksa, tunda, dan hapus mengikuti kepemilikan pembuat/PIC serta mode read-only. Dokumen dalam Sampah tidak dapat diakses melalui endpoint lampiran. Aktivitas unggah/periksa/hapus dicatat tanpa menyalin isi berkas ke log.

Upload sebelum nomor dokumen disimpan memakai token UUID milik pengguna dan modul yang sama. Token diklaim dalam transaksi penyimpanan SPPH/SP. Token modul lain, pengguna lain, dokumen lain, dan token kedaluwarsa ditolak. Jadwal `procurement:prune-detail-drafts` membersihkan hanya upload yang belum ditautkan dan berumur lebih dari dua hari. Lampiran dokumen tersimpan tidak ikut dibersihkan.

Tidak ada request arsip atau pembacaan file saat membuka daftar. Ringkasan tambahan dibatasi pada sepuluh dokumen halaman aktif; pencarian memakai EXISTS. Cuplikan lampiran hanya dimuat ketika ada kata pencarian. Fitur ini terpisah dari tombol upload ke Sistem Arsip yang sudah ada.

## Build dan verifikasi

`npm ci` lalu `npm run build` membangun aplikasi dan menyiapkan runtime pembaca dengan `scripts/prepare-procurement-reader.mjs`. Hasil `public/assets/document-reader/v1` tidak disimpan dalam Git; deploy perlu menerbitkan direktori tersebut beserta aset halaman. Manifest berisi SHA-256 seluruh aset dan lisensi disertakan. Jangan mengganti versi paket pembaca tanpa mengganti versi direktori runtime dan config bila format API/cache berubah.

Verifikasi lokal: 558 tes PHP (4.957 assertions) lulus; 67 tes JavaScript terkait lolos. Build berhasil; audit npm tidak menemukan kerentanan saat pemeriksaan. Suite JavaScript penuh tidak selesai karena proses `virtual-office-ui.test.cjs` yang tidak terkait tetap hidup; proses tersebut dihentikan dan tes pengadaan dijalankan terpisah.

`npm run test:document-reader` menjalankan Chrome headless dengan berkas uji sintetis: pilihan tunda dan guard simpan, PDF digital, PDF hasil scan, pemeriksaan hasil, tampilan terang/gelap/ponsel, serta pengecekan tidak ada request eksternal dari pembaca. Default menggunakan Chrome Windows; `BROWSER_EXECUTABLE` dapat menunjuk executable lain. Di sistem lain, siapkan browser Playwright terlebih dahulu. Endpoint PHP diuji terpisah dengan database sementara dan disk palsu; fixture HTTP browser tidak memakai transaksi produksi.
