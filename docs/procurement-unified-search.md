# Pencarian terpadu barang, PR, dan lampiran arsip

Panel yang sama tersedia pada Management PPBJ, Penomoran SP, dan Penomoran SPPH. Pencarian dijalankan melalui Enter/tombol Cari; mengetik tidak mengirim permintaan. Filter pencarian tabel juga memakai indeks bersama, sedangkan aturan PIC, tanggal, nominal, dan mode Oracle tetap berlaku.

Hasil dikelompokkan per PR, dilengkapi sumber, kutipan, dan tautan dokumen. Satu dokumen gabungan dapat terkait beberapa PR; hasil ini tidak menyatakan alokasi barang ke PR tertentu. Kata dicocokkan lintas kolom dalam satu sumber, tanpa bergantung pada urutan, menggunakan awalan kata. Dalam frasa biasa, kata yang belum ditemukan pada indeks sumber berizin dijelaskan dan kata yang tersedia tetap dicari. Query dengan nomor, angka, ukuran, kutipan, atau operator tetap mewajibkan semua kata. Tidak ada pencarian samar yang menebak nomor PR.

## Pemrosesan scan/foto

- PDF.js 6.5.438 membaca PDF. Halaman dengan sedikit teks atau gambar scan diteruskan ke Tesseract.js 7.0.0, bahasa Indonesia dan Inggris, dengan rotasi otomatis.
- Seluruh proses berjalan pada hosting sendiri, tanpa layanan OCR eksternal. OneDrive tetap menjadi sumber berkas arsip yang memang sudah tersimpan di sana.
- Berkas lama dan baru ditemukan melalui adapter CLI privat. Adapter memuat konfigurasi/database aplikasi arsip sendiri, dengan variabel rahasia aplikasi induk dibuang dari lingkungan proses anak. Aplikasi arsip tidak dimodifikasi.
- OCR memproses dua halaman per giliran dan menyimpan kursor. Hasil halaman yang sudah dibaca langsung bisa dicari. Halaman kosong/tidak terbaca, format yang tidak didukung, batas teks, dan kegagalan tidak dilaporkan sebagai pembacaan sempurna.
- File identik dapat memakai ulang hasil berdasarkan SHA-256. Versi yang diganti menghapus indeks lama; hasil pekerja dengan fingerprint/kursor lama ditolak.
- Hubungan PR berasal dari metadata/pivot bisnis. Jika metadata tidak memiliki PR, nomor PR yang benar-benar ada dapat dikenali dari teks scan. Hubungan tersebut diberi label untuk diperiksa; sistem tidak membuat PR atau menebak nomor yang mirip.
- Isi lampiran rincian SP/SPPH yang sudah diperiksa tetap memakai aturan pemeriksaan sebelumnya. Teks draf yang belum diperiksa tidak dimasukkan sebagai rincian bisnis yang disetujui.

## Batas beban dan akses

- Pencarian membaca indeks token berindeks B-tree, bukan membuka PDF, menjalankan OCR, atau memanggil API arsip dalam request pencarian.
- Maksimal 10 PR dan empat kutipan per PR. Query sumber dibatasi per PR agar satu paket besar tidak menghabiskan jatah hasil PR lain. Kutipan diambil dengan substring SQL yang terbatas.
- Satu pekerja memakai kunci lintas proses, prioritas CPU `nice -n 15`, dan berhenti memulai giliran baru setelah anggaran 15 detik setiap menit. Satu giliran memiliki timeout 65 detik; tidak ada pekerja OCR paralel.
- Batas berkas 30 MiB, raster 4 juta piksel, foto sumber 25 juta piksel, ringkasan sumber 400.000 karakter, heap Node 384 MiB, dan pengawas RSS Linux 448 MiB. Teks scan lengkap disimpan per halaman, maksimal satu juta karakter per halaman dengan penanda jika batas tercapai. Cache sementara privat dibatasi delapan berkas/100 MiB.
- Kegagalan dicoba paling banyak tiga kali dengan jeda bertingkat. Status dan kemajuan ditampilkan agar dokumen yang belum selesai tidak dianggap sudah seluruhnya bisa dicari.
- Hanya akun aktif Department Umum yang dapat mencari/membuka hasil, termasuk viewer yang memang memiliki akses baca. Akun operasional dan pengunjung ditolak. Tidak ada endpoint web untuk mengubah indeks.
- URL cloud/signature tidak dikirim dalam JSON hasil. Tautan file melewati gateway autentikasi, whitelist origin arsip, fingerprint, hubungan PR, dan metadata yang masih segar. Konten selain PDF/gambar aman/teks biasa dipaksa menjadi unduhan.
- Metadata arsip yang tidak diverifikasi selama 15 menit disembunyikan. Dokumen yang dimusnahkan/dihapus dinonaktifkan; gateway arsip juga memeriksa kondisi file saat dibuka.

## Pengoperasian

Runtime privat memerlukan Node 24+, dependensi terkunci pada `tools/procurement-ocr/package-lock.json`, serta model `ind.traineddata.gz` dan `eng.traineddata.gz` lokal. Paket tidak dipasang pada webroot.

```dotenv
PROCUREMENT_SEARCH_ENABLED=true
PROCUREMENT_SEARCH_ARCHIVE_ROOT=/path/to/archive-laravel
PROCUREMENT_OCR_NODE=/private/node/bin/node
PROCUREMENT_OCR_LANG_PATH=/private/ocr/languages
```

```sh
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
nice -n 15 php artisan procurement:search-index --sync-only --limit=200
nice -n 15 php artisan procurement:search-index --ocr-only --budget=15
```

Scheduler aplikasi menjalankan pekerja tiap menit melalui cron `schedule:run` yang sudah tersedia. Indeks/hasil OCR dapat dibangun ulang tanpa mengubah dokumen, angka pengadaan, atau file arsip aslinya. Berkas sumber tidak dihapus oleh pengindeks.

## Validasi

- Tes fitur mencakup pencarian lintas tiga tabel, ekspor, PR gabungan/legacy, teks yang sudah diperiksa, pencabutan sumber, kursor/fingerprint stale, paginasi, query baca terbatas, akses viewer/operasional/nonaktif, SSRF, dan unduhan konten aktif.
- Tes JavaScript mencakup pencarian manual, respons terlambat, reset, teks tidak tepercaya, paginasi, serta konteks hologram.
- Uji OCR menggunakan foto sintetis dan PDF tiga halaman yang benar-benar hanya berisi gambar, tanpa teks tertanam. Pembacaan lanjutan ketiga halaman diverifikasi secara lokal dan pada runtime Linux hosting.
- Pada smoke test hosting, satu proses memakai sekitar 271–372 MiB RSS. Endpoint `/up` merespons sekitar 0,094–0,136 detik sebelum/selama uji sintetis. Ini pengukuran ringan, bukan jaminan latensi seluruh situs untuk setiap beban.
- Audit npm pada dependensi OCR tidak melaporkan advisori saat persiapan rilis 10 November 2026.

Referensi primer: [API Tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/api.md), [contoh PDF.js pada Node](https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.mjs).

## Pembaruan 11 November 2026

Pembacaan dokumen memakai kombinasi teks asli PDF, analisis penempatan gambar pada halaman, dan OCR adaptif. Gambar besar pada PDF campuran tetap dibaca walaupun halaman sudah memiliki banyak teks digital. Teks asli dipertahankan dan baris identik digabungkan. Logo kecil tidak otomatis memicu OCR tambahan.

Pada bacaan sulit, pekerja dapat mencoba peningkatan kontras grayscale satu kali per giliran, jika percobaan dimulai dalam 20 detik pertama. Hasil pengganti dipakai hanya jika skor bacaan meningkat atau hasil pertama kosong. Halaman kosong tidak dipaksa menjadi hasil sukses. Batas memori/proses sebelumnya tetap berlaku; gambar asli tidak diubah.

Kolom `reading_engine` dan `reading_confidence` menyimpan metode dan skor terendah sepanjang giliran dokumen. Skor adalah perkiraan mesin, bukan persentase akurasi bisnis. Bacaan di bawah 55 ditandai perlu diperiksa; nomor PR tidak disimpulkan dari giliran dengan skor rendah. Bacaan lama tanpa skor tetap tersedia, tanpa membuat skor buatan atau mengulang OCR semua arsip. Pembaruan metadata mempertahankan kursor/hasil, sementara pergantian fingerprint mengosongkan kualitas dan teks lama.

Padanan barang Indonesia/Inggris terkurasi tersedia melalui `config/procurement_search.php`, misalnya kursi/chair dan kantor/office. Setiap kata tetap wajib cocok dalam satu sumber, tetapi boleh menggunakan padanannya. Perluasan dibatasi dan tetap menggunakan indeks awalan kata. Tidak ada layanan AI eksternal, pemindahan dokumen, atau pencocokan samar nomor PR/nominal. Padanan yang digunakan ditampilkan pada hasil. Ini pencarian istilah terkurasi, bukan pemahaman bebas seluruh bahasa.

Query kutipan memakai satu `ROW_NUMBER()` untuk seluruh PR yang terlihat, menggantikan pengulangan persilangan token pada sepuluh cabang UNION. Batas lima sumber per PR dan empat kutipan tetap dipertahankan. Memerlukan MySQL 8+, MariaDB 10.2+, atau SQLite dengan window functions; hosting diverifikasi MariaDB 10.6.28. Metadata yang dikirim dari DB dibatasi 320 karakter per kutipan. Tidak ada cache hasil lintas pengguna yang berpotensi mempertahankan izin lama.

Sinkronisasi mengambil peta nomor PR dan dokumen gabungan per batch. Term dan hubungan bisnis yang sama tidak ditulis ulang pada setiap penyegaran. Teks bisnis mengikuti batas retensinya; scan memakai indeks halaman lengkap yang terpisah dari ringkasan sumber. Pengenalan referensi PR memerlukan batas huruf/angka, sehingga `PR-2026-0012` tidak dianggap cocok dengan `XPR-2026-0012`, `PR-2026-00123`, atau `PR-2026-0012A`.

Antarmuka menampilkan ringkasan PR, durasi pencarian di server, metode pembacaan, dan peringatan bacaan kurang jelas. Tidak ada polling tambahan. Pengiriman identik yang masih berjalan digabungkan, respons terlambat diabaikan, dan pencarian dihentikan setelah 20 detik dengan opsi mencoba ulang. Kontrol tetap dapat dipakai setelah respons HTML/error atau koneksi gagal. Kartu di luar viewport memakai `content-visibility` dengan fallback tampilan normal.

Sebelum pembaruan, sampel hosting mencatat 2.537 halaman terbaca dari 20.725 halaman yang sudah diketahui, sekitar 3,16 MB teks indeks, dan pencarian hangat empat istilah sekitar 17–50 ms. Ini sampel singkat; bukan jaminan seluruh situs bebas lag. Arsip yang belum selesai tetap diproses oleh satu pekerja pada jadwal terbatas. Tidak dilakukan penghapusan arsip, perubahan dokumen bisnis, atau pemaksaan tutorial.

Audit dependensi juga menemukan enam advisori produksi pada Symfony HTTP Foundation, HTTP Kernel, dan Routing, serta satu advisori pengembangan pada YAML. Empat paket diperbarui ke 7.4.23 melalui perubahan minimum pada lockfile; versi mayor Laravel dipertahankan. Cache route harus dibangun ulang setelah pemasangan patch Routing. Referensi: [advisori resmi Routing](https://symfony.com/cve-2026-118516), [advisori resmi HTTP Kernel](https://github.com/symfony/symfony/security/advisories/GHSA-wg5q-m2ww-f3c9), dan [advisori resmi YAML](https://github.com/symfony/symfony/security/advisories/GHSA-hwfg-qwvh-2wfx).

## Kata nyasar dan cakupan halaman lengkap

Contoh `wefwefwefwe plastik` menampilkan hasil `plastik` jika hanya kata itu tersedia dalam indeks sumber yang aktif, belum kedaluwarsa, sesuai filter sumber, dan terkait PR yang masih ada. UI menjelaskan: “Kata ‘wefwefwefwe’ belum ketemu di indeks sumber ini, cuy. Tapi ‘plastik’ ketemu!” Ketidakadaan di indeks tidak membuktikan kata itu tidak ada pada halaman yang belum terbaca. Kata yang tersedia secara terpisah tetap harus cocok bersama dalam satu sumber; sistem tidak diam-diam mengklaim dua dokumen terpisah sebagai satu kecocokan. Nomor PR, angka, ukuran, ekspresi dengan kutipan/operator tetap dicari utuh.

Pengecekan ketersediaan kata menggunakan satu query `EXISTS`/UNION berindeks, maksimal 16 kata, tanpa OCR atau pembukaan PDF dalam request pencarian. Filter tabel dan ekspor memakai aturan yang sama. Kata yang dipakai dan belum ditemukan dikembalikan sebagai `query.used`/`query.missing`, sementara query asli tetap ada pada input.

Migrasi `2026_11_11_020000_create_procurement_search_passages.php` menambahkan penyimpanan teks per halaman, posisi halaman pertama pada indeks token, serta revisi pembaca. Ringkasan sumber tetap dibatasi 400.000 karakter untuk kompatibilitas dan beban ringan; mencapai batas ringkasan tidak menghentikan pembacaan/indeks scan. Pemotongan 12.000 token per giliran dihapus. Teks OCR diperlakukan literal, sehingga teks seperti `<SPESIALTEKNIS>` tidak hilang karena dianggap tag HTML. Tampilan tetap memakai text node dan sorotan `mark` yang aman.

Kutipan mengambil maksimal 320 karakter dari halaman yang memuat kata cocok, lalu menampilkan kutipan ringkas dan nomor halaman. Tautan PDF membawa `#page=N` ke gateway autentikasi; URL bertanda tangan tetap privat. Hanya sumber pada kartu yang terlihat yang dimuat, bukan seluruh teks dokumen. File duplikat menyalin seluruh halaman secara bertahap, bukan hanya ringkasannya.

Teks hasil lama dipindahkan ke halaman tanpa mengulang OCR, maksimal delapan halaman per langkah dan empat langkah per eksekusi, dalam bagian anggaran pekerja yang dibatasi. Sumber lama yang berhenti pada batas ringkasan dilanjutkan dari giliran terakhirnya. Kegagalan pembaca lama mendapat kesempatan terbatas pada revisi baru. Kegagalan berikutnya mencoba satu halaman per giliran dengan raster 3 juta, lalu 2 juta piksel. Jumlah halaman dikirim sebagai metadata privat sebelum OCR, sehingga tetap dapat diketahui jika proses dihentikan oleh batas sumber daya.

Satu halaman rusak tidak menghentikan pembacaan halaman-halaman sesudahnya. Jika sebuah halaman tetap melampaui sumber daya setelah tiga percobaan, halaman tersebut dicatat sebagai bermasalah dan halaman berikutnya diteruskan. Dokumen itu tetap berstatus perlu diperiksa; tidak dianggap telah terbaca sempurna. PDF terkunci/rusak dan file di atas batas aman memiliki alasan yang ditampilkan. Jaminan pembacaan 100% untuk scan buram, teks tulisan tangan, file hilang/terkunci, atau format yang tidak didukung tidak diberikan. Bahasa OCR yang terpasang tetap Indonesia dan Inggris.

Progres membedakan halaman yang sudah diproses, total halaman yang sudah terpetakan, halaman bermasalah, dan arsip yang belum memiliki relasi PR. Rincian ditempatkan dalam panel yang dapat dibuka/tutup, agar pesan hasil pencarian tetap ringkas. Arsip tanpa relasi PR yang valid tidak dipasangkan ke PR secara spekulatif dan tidak diperluas aksesnya melalui gateway.

## Filter scan dan konteks pengadaan

Pencarian isi scan tetap tersedia melalui `search` pada filter Management PPBJ, Penomoran SP, dan Penomoran SPPH, termasuk ekspor yang memakai filter tersebut. Kolom ruang telusur menambahkan penyaring opsional buyer PPBJ, vendor, dan pembuat TOR/PR. Kata isi dokumen dan semua penyaring digabungkan (AND), sedangkan vendor diperiksa pada PPBJ, SP aktif, dan kandidat SPPH aktif, termasuk relasi gabungan dan nomor PR legacy. Penyaring nama memakai parameter terikat dan karakter `%`, `_`, `!` diperlakukan literal. Pencarian hanya dijalankan saat Enter/Cari; perubahan pilihan belum diterapkan sampai pengguna mengirimkannya. Paginasi memakai pilihan yang sudah diterapkan, reset membersihkan semuanya.

Setiap kartu memuat buyer, vendor dengan label sumbernya, dan pembuat TOR/PR asli. Panel rincian tertutup secara default berisi tanggal, registrasi, status/progres tercatat, pembuat TOR, pencatat PPBJ, riwayat penerimaan/persetujuan terakhir, nama/tanggal penandatangan yang tercatat, serta PIC dan vendor SP/SPPH terkait. Data asal memakai `ProcurementProvenanceService` yang sama dengan rincian cepat. Pembuat TOR tidak disimpulkan dari buyer/pencatat PPBJ, dan kandidat penawaran tidak diberi label vendor terpilih. Token tanda tangan, lampiran, dan seluruh isi scan tidak dimuat sebagai profil hasil.

Konteks selalu dibaca dari catatan bisnis terbaru untuk maksimal 10 PR. Dua query dokumen yang dibatasi `ROW_NUMBER()` mengambil paling banyak enam SP dan enam SPPH per PR, lalu menampilkan lima masing-masing dengan penanda pemotongan. Cabang pivot dan legacy tidak menggandakan dokumen yang sama. Pencarian indeks tetap memiliki batas sumber/kutipan sebelumnya. Tidak ada query per kartu, polling, OCR saat pencarian, atau dependensi baru.

Nama pembuat TOR dan tujuan pengadaan turut disinkronkan secara batch ke metadata PPBJ agar dapat ditelusuri dari ketiga menu. Perubahan nama, penghapusan TOR, dan pergantian pembuat dibawa pada putaran sinkronisasi berikutnya; filter khusus pembuat membaca relasi asli secara langsung. Bagian nama ditempatkan sebelum uraian panjang agar tidak hilang akibat batas metadata. Scan yang sudah terbaca tidak diulang ketika metadata bisnis berubah.

Pembaca menggunakan segmentasi halaman otomatis (PSM 3) untuk dokumen bertabel, beberapa kolom, dan label tersebar. Pada hasil dengan skor di bawah 55, satu percobaan kontras yang sebelumnya tersedia juga mencoba segmentasi teks tersebar (PSM 11); pengganti hanya diterima bila skornya lebih baik atau hasil awal kosong. Jatah percobaan, batas raster/memori, timeout, dan satu pekerja tetap berlaku. Ini meningkatkan cara membaca tata letak, bukan jaminan semua scan pasti akurat. Hasil lama dipertahankan, dan pembacaan lanjutan memakai metode baru. Rujukan: [mode segmentasi resmi Tesseract](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#page-segmentation-method), [parameter API Tesseract.js](https://github.com/naptha/tesseract.js/blob/master/docs/api.md#workersetparametersparams-jobid).

Nama kandidat vendor SPPH dicocokkan pada nilai JSON yang sudah didekode, sehingga tanda kutip, aksen, backslash, serta karakter literal persen/garis bawah tidak hilang karena encoding JSON. MariaDB/MySQL memakai [JSON_SEARCH](https://mariadb.com/docs/server/reference/sql-functions/special-functions/json-functions/json_search) dengan escape tetap dan collation Unicode; SQLite memakai nilai teks dari json_each. JSON lama yang tidak valid diperlakukan sebagai daftar kosong.

## Relevansi, pencarian lintas dokumen, dan saran ejaan

Hasil ruang telusur kini diurutkan berdasarkan relevansi, dengan opsi PR terbaru tetap tersedia. Nomor PR persis mendapat prioritas; sumber dengan referensi dokumen persis, relasi PR yang tercatat, status pembacaan, serta mutu bacaan mendapat bobot bukti yang berbeda. Bobot adalah aturan prioritas diskret, bukan peluang kebenaran atau persentase akurasi. Sumber yang nomornya baru disimpulkan dari OCR tetap diberi label untuk diperiksa. Jika bobot setara, ID PR terbaru menjadi pemutus sehingga paginasi stabil.

Pilihan default tetap mengharuskan kata bersamaan dalam satu sumber. Mode opsional `match=related` dapat menggabungkan kata yang ditemukan pada dokumen berbeda dengan relasi PR yang sama. Sebagai contoh, sensor pada scan dan kalibrasi pada SP dapat menemukan satu PR yang menghubungkan kedua sumber. Hasil tidak menggabungkan dua PR berbeda. Setiap sumber menampilkan `matched_words` sebagai bukti kata yang memang terdapat dalam indeks sumber itu. Relasi dokumen gabungan tidak dianggap sebagai bukti alokasi setiap barang kepada salah satu PR.

Kelayakan mode lintas dokumen dihitung dari UNION lookup per kata, masing-masing menghasilkan PR unik, lalu GROUP BY/HAVING untuk memastikan seluruh kata yang digunakan tercakup. Ini menghindari ledakan kombinasi semijoin pada optimizer untuk kata yang sangat umum. Maksimal delapan kata dan minimal dua karakter per kata diterapkan sebelum SQL; rangkaian lebih dari empat potongan huruf yang semuanya sangat pendek juga ditolak dengan pesan perbaikan. Mode satu sumber tetap mendukung maksimal 16 kata dan pencarian kode singkat. Kata yang tidak ada tetap dijelaskan mengikuti aturan pencarian sebelumnya, dan angka/kode tidak diperlonggar.

Saran ejaan memakai jarak edit Levenshtein ditambah penanganan satu pertukaran huruf berdampingan. Ini saran opsional berbasis kamus indeks nyata, bukan penggantian otomatis atau pemahaman semantik bebas. Contoh plastikk/palstik dapat menyarankan plastik hanya jika kata tersebut tersedia pada sumber aktif, relasi PR yang masih ada, pilihan sumber, dan filter buyer/vendor/pembuat yang berlaku. Nomor, spesifikasi angka, operator, tanda baca, dan pencarian berkutip tidak diberi koreksi. Kata yang sudah dikenal tetapi tidak ditemukan bersamaan tidak dianggap salah ketik.

Pemeriksaan dibatasi pada tiga kata belum dikenal, panjang 4–24 karakter, paling banyak dua query kandidat berindeks berisi 80 kata per kata masukan, dua saran per kata, dan empat saran keseluruhan. Kandidat mencakup penghapusan/salah urut huruf, istilah terkurasi terdekat, dan awalan kata. Pengguna menekan tombol saran untuk mengirim pencarian baru; filter yang sudah diterapkan dipertahankan, dan draf filter belum terkirim dikembalikan ke pilihan yang dipakai. Tidak ada fetch saat mengetik, polling tambahan, cache lintas pengguna, OCR saat pencarian, atau dependensi baru.

Uji pra-rilis pada MariaDB memakai kode privat terpisah, query baca saja, dan batas dua detik per statement. Penelusuran hangat empat istilah sekitar 43–65 ms, saran ejaan 5–6 ms, kombinasi positif kursi kantor lintas dokumen sekitar 101–119 ms, dan delapan kata umum sekitar 281–311 ms pada sampel tersebut. Pola huruf satuan ditolak sebelum SQL. EXPLAIN memperlihatkan range pada PRIMARY indeks token untuk kamus saran; tidak ada pemindaian seluruh isi OCR. Hasil dan latensi berubah mengikuti beban hosting serta kemajuan indeks arsip. Seluruh arsip belum selesai dibaca; kualitas scan dan batas aman pembaca tetap berlaku.

Referensi primer: [Levenshtein PHP](https://www.php.net/manual/en/function.levenshtein.php), [EXPLAIN FORMAT=JSON MariaDB](https://mariadb.com/docs/server/reference/sql-statements/administrative-sql-statements/analyze-and-explain-statements/explain-format-json).

## Ketelitian dan penelusuran seluruh sumber cocok

Filter lanjutan menyediakan `lexical=exact`: setiap kata harus cocok dengan token utuh yang dinormalisasi oleh indeks. Mode ini tidak memperluas awalan/padanan, tidak menghapus kata yang tidak ditemukan, dan tidak memberi koreksi ejaan. Urutan atau kedekatan kata tidak diwajibkan; ini bukan pencarian frasa. Pilihan berlaku untuk kecocokan satu sumber maupun lintas dokumen pada PR yang sama. Penanda kata dan halaman bukti mengikuti ketelitian yang dipilih. Default tetap awalan dan padanan terkurasi.

Mode `match=reference` mencari seluruh nomor referensi dokumen tercatat, bukan potongan nomor atau nomor yang kebetulan muncul dalam isi dokumen. Huruf besar/kecil mengikuti collation basis data; `%`, `_`, `!`, dan backslash tetap karakter literal. Query memakai parameter terikat dan `LIKE ... ESCAPE '!'` tanpa wildcard tambahan, dengan indeks B-tree `(reference, active)` melalui migrasi `2026_11_11_030000`. Tidak memindai isi scan, mengulang OCR, atau menebak halaman lokasi referensi. Sumber dan filter buyer/vendor/pembuat tetap berlaku. Rujukan: [LIKE dan ESCAPE MariaDB](https://mariadb.com/docs/server/reference/sql-functions/string-functions/like).

Kartu awal tetap menampilkan maksimal empat sumber agar ringan. Jika ada sumber cocok lainnya, panel **Telusuri sumber lainnya pada PR ini** menyediakan tombol pemuatan delapan sumber per permintaan. API memakai `pr` dan cursor ID sumber `after`, sehingga penghapusan sumber sebelum cursor tidak menggeser halaman berikutnya. Setiap permintaan tetap memeriksa PR yang masih ada, kecocokan kata, scope, filter, keaktifan, relasi, dan kesegaran arsip. Urutan tambahan berdasarkan ID; bukti awal berdasarkan relevansi dan tidak digandakan. Sumber yang baru masuk dengan ID sebelum cursor memerlukan pencarian ulang; penelusuran bukan snapshot transaksi lintas permintaan.

Permintaan bukti memuat paling banyak satu PR, delapan kutipan terbatas, dan satu baris penanda lanjut. Profil penanggung jawab tidak dimuat ulang. Panel memakai pilihan yang sudah diterapkan, bukan draf filter. Tidak ada request saat mengetik, membuka panel, atau polling. Klik berulang disatukan; kesalahan dapat dicoba ulang pada cursor yang sama; pencarian baru/reset membatalkan permintaan sebelumnya dan mengabaikan respons terlambat. Teks tetap memakai DOM text nodes, file melalui gateway privat yang sama, dan respons `private, no-store`. Penelusuran sumber mencakup sumber yang cocok dan sudah tersedia di indeks, bukan jaminan seluruh halaman/scan lama selesai dibaca.

## Pengecualian dan saran dengan konteks

Filter lanjutan `exclude` menerima maksimal empat kata utuh, minimal dua karakter per kata, total input maksimal 120 karakter. Jika salah satu kata tersebut ada pada sumber aktif dan segar yang terkait dengan PR dalam scope terpilih, PR itu dikeluarkan seluruhnya dari hasil. Contoh: mencari kursi dengan pengecualian bekas menghapus PR dengan kata bekas pada salah satu sumber yang dipilih, termasuk dokumen berbeda dari dokumen yang memuat kursi. Bekasnya dan padanan used tidak otomatis dikecualikan. Penelusuran memakai indeks token dan relasi PR, bukan LIKE pada isi OCR. Sumber kedaluwarsa, tidak aktif, atau tanpa relasi tidak mengecualikan PR. Kata di sumber yang belum diindeks belum dapat dipakai sebagai pengecualian.

Pengecualian ikut diperiksa pada kartu, paginasi, pemuatan bukti berikutnya, kamus saran, dan konfirmasi saran. Filter tabel dan ruang telusur tetap independen: tidak ada penyalinan query atau request pencarian barang saat membuka hasil filter tabel.

Deteksi salah ketik menambahkan kandidat penggantian atau penyisipan huruf pada dua posisi awal, selain penghapusan, transposisi, padanan terkurasi, dan rentang awalan yang sebelumnya tersedia. Kandidat memakai lookup token berindeks dengan batas 80 baris per query dan dua query per kata; tidak memindai isi scan atau menjalankan OCR. Daftar tetap dibatasi tiga kata belum dikenal dan empat saran; batas kandidat berarti tidak setiap typo dijamin ditemukan.

Sebelum ditampilkan, maksimal empat usulan diperiksa dalam satu query UNION/EXISTS yang hanya membaca indeks dan catatan PR. Semua kata pada usulan harus cocok tanpa penghapusan kata yang tidak ditemukan: dalam satu sumber untuk mode source, atau sumber-sumber pada PR yang sama untuk mode related. Scope, buyer/vendor/pembuat TOR, keaktifan sumber, kesegaran arsip, dan pengecualian tetap berlaku. Tidak memuat profil, kutipan, atau file untuk memeriksa usulan. Saran selalu memerlukan klik pengguna; angka, nomor, pencarian bertanda baca/berkutip, serta mode kata utuh/referensi persis tetap tidak dikoreksi. Usulan untuk beberapa typo sekaligus dapat kosong sampai sebagian kata diperbaiki karena konfirmasi tidak memperlonggar kata lainnya.

## Peringkat ketepatan kata dan bukti lokasinya

Pada pencarian awalan/padanan dengan urutan relevansi, nomor PR persis tetap menjadi prioritas pertama. Sumber dengan referensi persis mendapat prioritas berikutnya. Setelah itu, jumlah kata masukan yang cocok utuh lebih diutamakan daripada awalan langsung dan padanan terkurasi. Kata berulang tidak menambah bobot. Status sumber, kejelasan relasi, tipe dokumen, dan kualitas bacaan tetap menjadi pemutus berikutnya. Peringkat PR memakai skor sumber terkuat; ini bukan persentase akurasi atau kesimpulan bahwa semua kata berada dalam satu barang/baris. Mode lintas dokumen tetap memastikan seluruh kata ada pada PR yang sama, walaupun sumber terkuat hanya memuat sebagian kata tersebut.

Statistik ketepatan dihitung dari satu agregat indeks token, tanpa UNION per dokumen atau pembacaan isi OCR. Agregat dipakai bersama untuk semua kandidat PR, dan pemeringkatan sumber tetap dibatasi lima sumber per PR untuk menampilkan empat. Urutan PR terbaru melewati peringkat kata untuk PR, tetapi sumber di dalam kartu masih dipilih berdasarkan ketepatan. Mode kata utuh, referensi persis, dan permintaan cursor satu PR melewati agregat tambahan yang tidak diperlukan. Tidak ada migrasi, perubahan OCR, cache lintas pengguna, atau dependensi baru.

Setiap sumber menyediakan panel tertutup **Bukti kecocokan per kata**. Panel menunjukkan kata masukan, token yang benar-benar cocok, jenis kecocokan (utuh/awalan/padanan), dan lokasi pertama yang tercatat untuk token terpilih. Kata utuh dipilih sebelum awalan/padanan. `first_page=0` ditampilkan sebagai data dokumen; NULL sebagai lokasi belum tercatat; nilai positif menyediakan tautan gateway privat dengan `#page`. Referensi persis tidak dibuatkan bukti halaman yang tidak diketahui.

Panel tidak mengambil file atau melakukan request ketika dibuka. Satu query batched mengambil maksimal 16 bukti per sumber untuk maksimal 40 sumber awal (delapan sumber pada cursor). Data bukti juga dipakai untuk memilih kutipan: halaman yang mendukung paling banyak lokasi kata terpilih, lalu halaman paling awal. Hanya kutipan terbatas untuk halaman-halaman tersebut dibaca. Ini peta lokasi pertama dari indeks yang sudah tersedia, bukan daftar semua kemunculan kata atau pencarian frasa berurutan. Sumber belum selesai dibaca tetap mengikuti progres dan batas kualitas pembaca sebelumnya.

## Deteksi terbaru dan antrean prioritas yang adil

Sinkronisasi arsip memeriksa batch cursor biasa sekaligus maksimal 20 ID terbaru per jenis dalam satu proses bridge. Hasil digabung dan dideduplikasi, maksimal 200 baris. Cursor `last` dan `has_more` hanya berasal dari batch biasa, sehingga arsip baru tidak membuat arsip lama terlewati. Penggantian file lama tetap ditemukan oleh putaran biasa; perubahan pada 20 ID terbaru juga ditemukan melalui pemeriksaan terbaru. Jika unggahan baru melebihi 20 ID sebelum satu putaran, sebagian masih mengikuti putaran biasa. Tidak ada perubahan pada aplikasi arsip atau pemindaian seluruh file.

Migrasi `2026_11_11_040000` menambahkan `queued_at`, `priority_until`, dan `priority_pages` beserta indeks prioritas. Sumber baru/versi baru yang aktif memperoleh jendela prioritas 15 menit hingga empat halaman awal. Sinkronisasi tanpa perubahan tidak memperpanjang prioritas atau mengulang OCR. Sumber lama saat migrasi tetap memiliki nilai NULL/default; seluruh backlog tidak mendadak diberi prioritas.

Pemilih antrean tetap memakai satu pekerja dan lock `procurement-search:worker`. Dua giliran memilih sumber prioritas yang belum mencapai batas halaman, diikuti satu giliran sumber paling lama belum diproses. Nomor giliran disimpan dalam cache agar restart CLI per menit tidak mereset pembagian. Jika tidak ada prioritas, pekerja langsung mengerjakan antrean biasa. Batas memori, proses, jumlah halaman, anggaran 15 detik sebelum memulai pekerjaan berikutnya, backoff, dan batas percobaan tetap berlaku. Satu pembacaan yang telah dimulai tetap dapat berjalan sampai timeout proses yang sudah tersedia. Ini mempercepat kesempatan membaca halaman awal, bukan SLA selesai dalam satu menit atau jaminan semua halaman langsung tersedia.

Panel **Kesiapan lampiran PR ini** menyediakan tombol **Dahulukan lampiran PR ini** bagi pengguna Umum yang bukan viewer saat mode baca saja tidak aktif. Endpoint POST dilindungi CSRF, departemen, mode baca saja, throttle enam per menit, dan cooldown bersama lima menit per PR. Permintaan memilih maksimal tiga sumber terkait yang aktif, segar, dapat dicoba, serta tidak sedang backoff; jendela berlaku 15 menit hingga empat halaman berikutnya, maksimal halaman 2000. Ia tidak mereset percobaan, mengubah file/dokumen bisnis, melewati akses, mengaktifkan file terhapus, atau menjalankan OCR dalam request. Status/rincian hasil dipakai setelah pencarian ulang; respons terlambat setelah reset tidak mengganti tampilan. Membatalkan request browser tidak menjamin permintaan prioritas yang sudah diterima server ikut dibatalkan.

Tombol **Cek status antrean arsip** memuat snapshot status terakhir secara manual tanpa mengubah kata pencarian maupun kartu hasil. Snapshot menyebut jumlah yang siap antre, jumlah prioritas, progres pembacaan, dan waktu pembaruan. Jika lebih dari tiga menit, UI memberi tahu bahwa snapshot terlambat diperbarui. Tidak ada polling atau perkiraan waktu selesai yang dibuat-buat. API GET hanya membaca cache, memakai respons private/no-store, tidak mengungkap nama file, dan tetap dapat dibaca viewer Umum. File yang masih menunggu sinkronisasi belum tercakup dalam angka antrean tersebut.

## Audit cakupan dan pemulihan antrean

Migrasi `2026_11_11_050000` menambah catatan audit cakupan, kode kegagalan, putaran pemulihan sumber, serta percobaan perbaikan halaman. Migrasi tidak menghapus file asli, teks indeks, atau dokumen bisnis. Pekerja mengaudit maksimal 10 sumber aktif per putaran. `--audit-only --limit=50` memeriksa maksimal 50 sumber dengan lock pekerja yang sama, tanpa menjalankan OCR. Cursor audit berputar melintasi seluruh sumber aktif; proses pemeriksaan membandingkan jumlah halaman yang diketahui dengan nomor halaman yang benar-benar tersimpan, bukan hanya cursor terakhir.

Halaman yang hilang mengembalikan cursor ke celah pertama, dengan teks halaman sesudahnya tetap tersimpan dan dapat dicari. Pekerja melewati halaman yang sudah tersimpan sehingga tidak menimpa teksnya ketika memperbaiki celah. Halaman kosong yang belum berhasil dibaca memperoleh maksimal dua percobaan perbaikan tambahan. Halaman dengan teks tetapi skor rendah tetap dapat dicari dan ditandai perlu pemeriksaan; sistem tidak mengganti bacaan itu secara spekulatif. Skor sumber dihitung kembali dari halaman yang tersimpan setelah perbaikan, agar skor nol lama tidak bertahan setelah halaman berhasil dipulihkan.

Halaman dari pembaca sebelum revisi 2 ditandai `legacy_unverified`; bagian terakhir ringkasan lama yang pernah terpotong ditandai `legacy_truncated`. Teks itu tetap dapat dicari, tetapi tidak dilewati sebagai halaman yang telah lengkap. Masing-masing memperoleh maksimal dua percobaan pembacaan ulang. Hasil kosong tidak boleh menghapus teks lama. Duplikat dari pembaca lama tidak dijadikan jalan pintas validasi. Kegagalan validasi ulang Office mempertahankan backoff dan alasan gagal; file yang melewati batas permanen tidak dikembalikan berulang-ulang ke status siap proses.

Kegagalan sementara seperti memori, timeout, penghentian sumber daya, checksum, perubahan sumber, dan kegagalan pembaca generik memperoleh maksimal tiga putaran pemulihan tambahan, masing-masing maksimal tiga percobaan. Percobaan ketiga pada kegagalan sementara menunggu satu hari sebelum putaran berikutnya. Batas keselamatan dan satu pekerja tetap berlaku; retry tidak berjalan tanpa batas. PDF terkunci/rusak, batas ukuran/halaman, dan format yang tidak didukung tetap membutuhkan penanganan file. Sumber yang tidak berhasil setelah jatah pemulihan tetap muncul dalam audit, bukan diam-diam dianggap selesai.

Dokumen TXT/CSV dan XML Office dibaca sampai batas ekstraksi aman 8 MiB, maksimal 1.000 entri ZIP, kemudian dibagi pada batas kata menjadi bagian teks dengan batas panjang per bagian yang sudah tersedia. Indeks menyimpan setiap bagian, termasuk setelah ringkasan 400.000 karakter. Batas tersebut menghentikan ekstraksi dengan alasan yang jelas, bukan menghasilkan sukses dari teks yang terpotong. Catatan kaki/akhir, komentar, header/footer Word dan catatan slide ikut dibaca. Gambar tertanam pada Office ditandai `office_images`: teks native tetap tersedia, tetapi gambar itu belum diproses OCR. Konversi ke PDF atau pemeriksaan manusia masih diperlukan. Bagian teks Office tidak diberi tautan nomor halaman fisik yang tidak diketahui. Semua bacaan Office revisi lama divalidasi ulang sekali karena pembaca lama belum memeriksa gambar dan kelengkapan ini; cache duplikat Office lama tidak digunakan untuk melewati validasi.

Tombol **Audit kelengkapan lampiran** membuka daftar 25 file per halaman dan rincian 25 nomor halaman/bagian per halaman, termasuk nomor yang belum tersimpan. Masalah didahulukan dan tanggal audit ditampilkan. Endpoint hanya menerima sumber aktif, segar, dan memiliki hubungan PR yang masih ada, dilindungi autentikasi/departemen/throttle, serta memakai private/no-store. Request ini hanya membaca metadata/ukuran teks, tidak mengerjakan OCR atau mengambil seluruh isi dokumen. Tidak ada pemuatan otomatis, polling, atau perubahan filter/hasil pencarian saat melihat audit. Reset membatalkan request dan mengabaikan respons terlambat; seluruh nama, catatan, dan alasan tampil sebagai teks aman.

Status **Seluruh halaman diproses otomatis** berarti seluruh nomor halaman yang diketahui mempunyai hasil tersimpan tanpa masalah yang terdeteksi. Status itu bukan bukti setiap karakter sudah akurat. Scan buram, tulisan tangan, bahasa di luar model terpasang, file rusak, dan bagian yang belum didukung tetap dapat memerlukan pembacaan manusia. Semua lampiran belum tentu selesai pada saat rilis: antrean lama diteruskan bertahap untuk menjaga beban hosting.
