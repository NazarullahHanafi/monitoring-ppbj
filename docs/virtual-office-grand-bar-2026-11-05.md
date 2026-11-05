# Grand Salon & Éclipse — 5 November 2026

## Masalah request saat bermain dan memilih menu

Penyebab dikonfirmasi pada implementasi `ThrottleRequests` Laravel di repository: throttle numerik tanpa prefix memakai signature pengguna yang sama untuk berbagai endpoint. Akibatnya, polling kantor, game, pembelian, dan beberapa halaman lain ikut menghabiskan penghitung yang sama meskipun angka batasnya berbeda.

Seluruh endpoint kantor yang sebelumnya menggunakan throttle numerik sekarang memakai limiter bernama `virtual-office`, dengan key terpisah untuk setiap **pengguna + nama route**, namespace baru `office-v2`. Penghitung lama tidak perlu dihapus dan tidak ikut memblokir kantor. Batas longgar untuk penggunaan normal: GET 600/menit per endpoint, pukulan game 900, aksi umum 180, undangan dan konfigurasi kawasan 30. Pembatasan tetap melindungi server dari request ekstrem. Respons 429 yang sebenarnya memberikan pesan Indonesia dan `Retry-After`.

Klien tidak lagi memulai dua polling tambahan setelah setiap pukulan, perpindahan, penggunaan porsi, atau pembelian. Respons mutasi digunakan langsung. Poll lama tidak dapat menimpa revisi game yang lebih baru; pesan tetap dapat diterima selama pengguna aktif memukul. Pemilihan kategori, pencarian, favorit, serta perubahan keranjang berlangsung lokal tanpa request. Pemuatan dompet digabung jika bersamaan dan digunakan ulang selama 60 detik; tersedia tombol Perbarui saldo.

## Grand Salon dan diskotik

Maison du Rivage diperluas menjadi grand salon dengan lantai marmer, kolom dan lengkung berwarna emas, meja bar panjang, rak botol, stool, chandelier kristal, sofa lounge, meja percakapan, serta papan La Carte. Counter dan papan menu bisa diklik untuk membuka menu bar.

Éclipse memiliki DJ booth, turntable, mixer, speaker, lantai dansa berwarna, bola disko, dan cahaya ambient lembut. Tombol Salon & bar / Éclipse mengarahkan kamera dan avatar; karakter dapat berdansa. Tidak ada strobe atau autoplay musik. Efek atmosfer bisa dimatikan pengguna dan otomatis disederhanakan pada grafis hemat atau reduced motion. Musik tetap memakai pilihan pribadi yang sudah ada.

Interior menggunakan tampilan 3D bergaya diorama dengan bagian depan terbuka agar furnitur dan avatar terlihat. Geometri bangunan/furnitur digabung berdasarkan material; tidak menambah shadow pass atau video. Penggabungan geometri mata avatar mengurangi 24 mesh pada kapasitas penuh, sehingga scene tetap di bawah 750 mesh dan 24 avatar detail. Kamera dan navigasi kampus tetap digunakan, termasuk collision meja, booth, speaker, kolom, dinding, serta jalur menuju lantai dansa.

## Pemesanan dan fitur tambahan

Panel bar mempunyai identitas grand salon, ilustrasi interior berbasis CSS, kartu menu dengan kategori/deskripsi/harga, favorit pada perangkat, pencarian, serta keranjang. Tetap 44 menu, termasuk Prancis dan Nusantara. Harga seluruhnya dolar virtual.

Keranjang menerima maksimal 20 pilihan, masing-masing 1–10 porsi. **Menambah menu tidak memotong saldo.** Satu checkout membayar seluruh keranjang dalam satu transaksi database. Wallet di-lock, harga dihitung dari katalog server, saldo dan kapasitas pesanan diperiksa dahulu, lalu seluruh order/struk/ledger dibuat bersama. Tidak ada pembayaran parsial jika saldo kurang atau validasi gagal. UUID pembayaran dan fingerprint keranjang mencegah debit ganda serta perubahan payload pada retry. Urutan line item tidak memengaruhi idempotensi.

Nomor pembayaran yang belum terkonfirmasi disimpan lokal bersama keranjang. Keranjang dikunci sampai hasil diketahui; pengguna bisa memperbarui saldo atau mengirim ulang pembayaran yang sama secara aman, termasuk setelah reload. Respons penolakan definitif membuka kembali keranjang. Riwayat sepuluh struk hanya dikembalikan kepada pemilik; user lain tidak dapat mengambil struk atau memakai nomor checkout orang lain.

Pesanan tersimpan tetap dinikmati melalui tombol Nikmati, termasuk dibawa ke pantai, taman, teras, lounge, atau Éclipse. Avatar mempertahankan batas durasi aktivitas 15 menit saat scene dibuat ulang. Saldo harian, aturan Viewer/read-only, kepemilikan avatar, dan privasi owner tersembunyi tetap berlaku.

## Verifikasi

- **479 tes PHP lulus, 3.456 assertions; 119 tes JavaScript lulus.**
- Regresi nyata: penghitung numerik lama sudah jenuh, lalu 60 pukulan + 120 polling + 25 pembelian + checkout tetap sukses. Polling tidak menghabiskan jatah dompet/pembelian. Limiter masing-masing pengguna dan route diverifikasi terpisah.
- Checkout mencakup retry, urutan item berubah, payload berubah, IDOR, harga palsu, item duplikat, saldo kurang, tidak ada pembelian parsial, dan Viewer.
- Uji klien memastikan kategori/favorit/keranjang tidak mengirim request, pemuatan akun bersamaan digabung, serta retry setelah reload mempertahankan UUID pembayaran.
- Geometri Three.js aktual diuji dengan renderer pengujian: scene di bawah 750 mesh, hotspot counter/menu ada, cahaya lembut bisa dimatikan, kamera mencakup kampus, rute bar/disko/tujuan santai tercapai, dan resource/frame dibersihkan.
- Build produksi sukses. Bundle utama aplikasi tetap sama; kantor sekitar 51,6 KB minified / 18,5 KB gzip, scene lazy termasuk Three.js sekitar 615,2 KB / 161,5 KB. Peringatan chunk Vite berasal dari scene dinamis tersebut.
- Pemeriksaan visual/GPU browser masih terhambat konektor `Cannot read properties of undefined (reading 'timeoutMs')`, termasuk saat menghubungkan tab website yang sudah terbuka. Tidak mengklaim screenshot atau pengukuran FPS perangkat.

Pemasangan menggunakan migrasi aditif `virtual_office_tabs`, backup privat sebelum perubahan, dan aset ber-hash sebelum manifest. Hasil produksi dicatat setelah pemasangan.
