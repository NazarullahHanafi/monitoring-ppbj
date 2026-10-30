# Ruang kerja pribadi PPBJ / SP / SPPH

## Pemakaian

- Tombol **Rincian cepat** pada nomor dokumen membuka panel baca-saja tanpa pindah halaman. SP/SPPH memuat barang/jasa, jumlah, harga (SP), kandidat/final vendor, dan semua PR terkait. Klik PR untuk melihat rincian, tahap perjalanan, tracking, aktivitas dan lampiran. **Rincian sebelumnya** kembali ke dokumen awal di panel yang sama.
- **Muat lampiran PR** adalah permintaan terpisah ke layanan arsip yang sudah ada. Membuka panel utama tidak memanggil layanan arsip atau mengunduh berkas. Buka/Unduh memakai archive gateway terautentikasi, bukan tautan cloud mentah.
- **Filter favorit** menyimpan kombinasi filter yang SUDAH diterapkan pada URL, bukan isian yang belum diterapkan. Tersimpan di database per akun dan per menu, dapat digunakan di perangkat lain. Maksimal 10 favorit/menu; nama yang sama memperbarui favorit. Tanggal disimpan sebagai tanggal absolut, bukan periode bergulir. Halaman pagination tidak disimpan.
- **Atur tampilan** menyediakan pilihan kolom, urutan (tombol naik/turun yang dapat dipakai dengan keyboard), dan kepadatan nyaman/ringkas. Nomor dan aksi wajib terlihat. Reset menyiapkan pilihan bawaan; tetap klik Simpan untuk menerapkannya.
- Hak Viewer tetap baca-saja untuk data bisnis. Viewer Umum boleh menyimpan preferensi tampilannya sendiri. Endpoint personal ini tidak menerima user_id lain, tidak memiliki jalur untuk mengubah transaksi dan tetap diblokir ketika maintenance penuh berlaku.

## Batas dan keamanan

- Semua endpoint perlu login dan departemen Umum, pengecekan akun aktif, CSRF (write), pembatasan request (preferensi 20/menit, detail 40/menit), dan input allowlist. Detail dicek sebelum cache dibaca, termasuk soft-delete.
- Seluruh label/data yang dimasukkan ke HTML panel di-escape. Nama barang rich-text ditampilkan sebagai teks biasa, bukan HTML yang dapat dieksekusi. Tautan lampiran hanya mengizinkan URL same-origin dari gateway.
- Preferensi memakai unique `(user_id,page)` dan row lock/transaksi. Versi optimistik mencegah tab/perangkat lama menimpa simpan terbaru; konflik mengembalikan preferensi terbaru dan meminta pengguna mengulang tindakannya.
- Menyembunyikan kolom adalah personalisasi, bukan kontrol keamanan; data yang boleh diakses tetap ditentukan server. Tidak ada data dokumen/favorit disimpan di localStorage/sessionStorage yang berisiko terbawa saat akun berganti.
- Panel memakai dialog native, focus trap browser, Escape/tombol tutup, pemulihan fokus, status pemuatan/error, animasi singkat dan dukungan reduced-motion. Tampilan responsif serta variabel warna light/dark.

## Performa, cache dan queue

- Tidak ada polling/job/background refresh baru. Detail on-demand cache privat per user/dokumen/updated_at selama 20 detik, dengan Muat terbaru yang melewati cache. Model utama selalu diperiksa agar dokumen Sampah tidak muncul dari cache lama.
- Preferensi dibaca memakai indeks unik dan cache 60 detik; cache akun/menu dihapus setelah simpan. Perangkat lain yang masih membuka halaman lama ditangani oleh versi optimistik. Tidak menambah query per baris tabel.
- Panel dibatasi 50 item (teks 2000 karakter/item), 20 PR, 50 tracking, 30 audit. Ada penjelasan jika rincian item/PR dipotong. Relasi journey memakai layanan/controller perjalanan yang telah ada, tidak membuat rumus status kedua.
- Atur kolom bekerja pada DOM halaman aktif saja dan observer hanya menyimak penambahan baris (untuk polling lama). Tidak menyimak seluruh document atau memicu loop saat mengurutkan sel. Tidak memuat rincian untuk semua baris sekaligus.
- Queue sengaja tidak dipakai untuk operasi baca dan simpan preferensi yang kecil: menambahkan job/worker justru menambah latensi dan operasional. Pekerjaan berat dan integrasi arsip tetap memakai alur yang sudah ada. Tidak menjanjikan bebas lag pada semua kondisi jaringan/server.

## Verifikasi

- Full suite lokal: **353 tes PHP / 2051 assertions** dan **31 tes JavaScript** lulus pada 30 Oktober 2026. Template Blade juga berhasil dikompilasi.

- Tes PHP: isolasi akun/menu/cache, konflik versi, limit/hapus favorit, Viewer vs transaksi, filter multi-pilihan/tanggal, input berbahaya, akun nonaktif, rincian/cache/soft-delete/legacy PR/item limit/journey, tidak ada HTTP arsip otomatis, markup tiga menu.
- Tes JavaScript: URL allowlist dan encoding, pengaturan kolom stabil setelah polling, kolom penting tidak tersembunyi, tidak ada request awal, escaping, abort/stale-response dan pembatalan panel, tanpa polling/storage persisten.
- Pengujian menemukan jalur akun nonaktif pada middleware global yang mencoba mengakses request session sebelum tersedia. Jalur tersebut diperbaiki agar tetap menolak dengan 423 alih-alih error 500; hak akses tidak dilonggarkan.
- Migrasi aditif: `2026_10_30_000003_create_user_table_preferences_table.php`. Tidak mengubah schema transaksi lama atau konfigurasi queue/cache global.
