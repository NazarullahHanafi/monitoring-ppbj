# Kalender Kolaborasi: keandalan pencarian dan tombol

Audit lanjutan dari baseline `c12d9a4`. Lingkup perubahan adalah Kalender Kolaborasi; hasil ini tidak menyatakan seluruh website bebas bug atau kerentanan.

## Masalah dan perbaikan

- Permintaan bulan/PR/perjalanan lama sebelumnya hanya dibatalkan setelah pemeriksaan cache. Berpindah kembali ke hasil cache atau menghapus kata kunci dapat membuat respons lama menimpa tampilan baru. Setiap alur sekarang membatalkan operasi sebelumnya sebelum memakai cache, dan memeriksa identitas operasi sebelum mengubah data, error, atau indikator loading.
- Cache browser sebelumnya bertahan sepanjang umur tab. Sekarang TTL 60 detik, dengan batas tetap 8 rentang kalender, 20 pencarian PR, dan 12 perjalanan. Mutasi berhasil mengosongkan ketiganya. Ini mengurangi permintaan berulang tanpa menyimpan hasil tanpa batas; bukan sinkronisasi real time antaruser.
- Pembacaan dibatalkan saat pagehide. Halaman yang dipulihkan dari bfcache mengambil ulang data. Timer pencarian tertunda dibersihkan saat reset/tutup/pindah halaman.
- Semua fetch dibatasi 30 detik, termasuk pembacaan body JSON. Transport yang mengabaikan abort tetap tidak dapat menerapkan hasil lama. Kegagalan tidak menghapus data terakhir yang berhasil dibaca. Error sesi, CSRF, izin, dan batas permintaan ditampilkan dengan pesan yang sesuai.
- Simpan, ubah status, dan hapus menggunakan satu penjaga mutasi per halaman. Klik/submit berulang tidak mengirim write kedua; penutupan/pergantian form/detail ditahan selama write. Pembatalan konfirmasi dan kegagalan memulihkan tombol. Timeout/network/5xx diberi status belum terkonfirmasi dan tidak diulang otomatis. Backend version guard yang sudah ada dipertahankan; tidak ada retry otomatis terhadap konflik 409 atau perubahan versi form secara diam-diam.
- Filter tanggal akhir tanpa tanggal awal sekarang diterima. Rentang terbalik/tanggal tidak sah tetap ditolak sebelum query pencarian.
- Pencarian memperlakukan `%`, `_`, dan `!` sebagai karakter literal melalui parameter binding dan `ESCAPE '!'`, termasuk ranking awalan dan nama penerima. Mendukung SQLite pengujian dan MariaDB hosting; parameter tidak disisipkan sebagai kode SQL. Hasil tetap maksimal 12, relasi hanya dimuat sekali per jenis.
- Tujuh endpoint kalender sebelumnya berbagi key numeric throttle bawaan. Prefix per aksi memisahkan baca agenda, pencarian, perjalanan, tambah, edit, status, dan hapus; batas per menit tetap 90/60/60/20/30/40/20. Tes menghabiskan batas tambah dengan payload invalid, memastikan 429 masih berlaku sementara pencarian dan baca tetap berjalan.
- JSON pencarian, agenda, dan perjalanan diberi `private, no-store` agar cache HTTP perantara tidak menyimpan data pengguna. Cache browser internal tetap dibatasi TTL tersebut. Otorisasi department/policy dan mode read-only tidak dilonggarkan.

## Validasi

- Regresi penuh: 765 tes PHP / 7.990 assertion lulus sebelum penambahan pemisahan throttle; setelah perubahan route, 24 tes fitur terkait / 185 assertion lulus, termasuk satu regresi throttle baru.
- Regresi penuh JavaScript: 347 lulus; satu kasus perjalanan ditambahkan sesudahnya, dan seluruh 7 kasus kalender final lulus.
- Browser memakai konten Blade serta CSS/JS asli dengan data sintetis, pada desktop dan ponsel sentuh. Diuji klik ganda simpan/status/hapus, batal hapus, konflik, kegagalan server, draft tetap tersimpan di form, CSRF, reset pencarian saat request berjalan, pergantian filter kembali ke cache, dan teks HTML tidak menjadi elemen aktif.
- Pint lulus pada controller, tes PHP, dan routes; `git diff --check` dan parser JavaScript lulus.
- Prosedur production: backup privat, allowlist berkas, kandidat diperiksa sebelum fast-forward, transaksi database read-only dan cache array terisolasi, verifikasi akhir eksplisit, checksum aset webroot, HTTP health/login dan endpoint tanpa sesi. Tidak ada migrasi, dependensi baru, pengubahan dokumen bisnis, atau pengiriman pesan untuk pengujian.

Pembatasan: penjaga mutasi di browser mencegah permintaan tumpang tindih dari satu halaman, bukan idempotency lintas tab/perangkat. Jika write kehilangan konfirmasi, pengguna diminta memeriksa agenda sebelum mengirim ulang. Cache dan optimasi permintaan tidak menjamin kecepatan seragam pada semua kondisi hosting/jaringan.
