# Kendali avatar dan eksplorasi — 5 November 2026

## Cara memakai

Di Ruang 3D, avatar akun sendiri dikendalikan dengan **W/A/S/D atau panah**, **Space** untuk melompat, **Shift** untuk boost, dan **E** untuk berinteraksi dengan permainan/bar terdekat. Gerak mengikuti arah kamera; diagonal dinormalisasi. Kamera otomatis mengikuti avatar setelah sesi kendali diperoleh. Tombol Ikuti saya memulihkan kamera setelah menjelajah denah. Pada ponsel tersedia tombol arah, lompat, dan boost. Stamina pulih bertahap; boost berhenti saat habis dan tersedia lagi setelah pulih.

Pengguna harus berjalan dahulu ke lapangan/meja/bar, lalu mengeklik papan tempat atau menekan E. Memilih tempat jauh hanya memberi penanda emas dan jarak tujuan. Tombol kamera mengubah pandangan tanpa memindahkan avatar. Pemilihan permainan, mulai latihan, menerima duel, pukulan jaringan, checkout, menikmati pesanan, dan aktivitas santai memeriksa kedekatan lokasi. Pembelian memakai radius grand salon yang mencakup lantai dansa. Untuk membawa makanan ke pantai, berjalan ke pantai, buka **Pesanan saya**, pilih Pantai, lalu nikmati pesanan yang sudah dibeli. Panel bekal tersedia di luar bar dan tidak menampilkan katalog/keranjang belanja baru.

Ada jalan luar kampus, pepohonan, pagar, bangku, dan pot taman di kawasan terbatas x −100..100, z −22..92. Laut dan pagar menjadi penghalang; ini bukan dunia tanpa batas. Rumah pribadi tetap bisa ditinjau melalui kamera rumah. Tidak ada perjalanan otomatis avatar pengguna menuju permainan atau pertemuan. NPC offline tetap memakai simulasi rekreasi/tidur dan dapat berjalan menuju undangan komputer.

Pengguna online yang meninggalkan ruang virtual atau membuka menu kerja kembali ditampilkan duduk di komputer. Aktivitas bar, game, atau pertemuan lama tidak mengalahkan keadaan ini. Otorisasi Tracking PR, Surat Pesanan, dan menu bisnis tetap mengikuti role aplikasi. Editor, panel permainan, input chat, kehilangan fokus, tab tersembunyi, serta mode ringan menghentikan input berjalan; mengetik WASD di formulir tidak menggerakkan karakter.

## Konsistensi posisi dan privasi

- Endpoint pilot menggunakan auth, CSRF, whitelist atribut, sesi UUID, nomor urut, dan lock per pengguna. Tidak menerima ID pengguna lain. Satu sesi aktif per akun, lease 8 detik, posisi sementara 15 menit di cache; bukan riwayat perjalanan database.
- Gerak lokal responsif disinkronkan satu request setiap sekitar 300 ms ketika bergerak, 1.200 ms saat diam, setelah request sebelumnya selesai. Frame gerak pertama mempercepat jadwal diam. Data rekan dikirim ringkas; read presence hangat tidak menambah SQL. Tidak ada timer/request bertumpuk.
- Server memeriksa batas kawasan, 198 penghalang yang sama dengan scene, sweep segmen termasuk net tipis, panjang lintasan, dan kredit kecepatan. Melompat memakai gravitasi dan tidak melewati penghalang. Prediksi lokal dikoreksi jika ditolak server. Lintasan dikirim maksimal 32 titik, bukan disimpan sebagai histori.
- Lease berakhir setelah keluar, logout, pergantian menu, atau putus koneksi. Tombstone dan generasi klien menolak paket terlambat, termasuk claim setelah leave. Tab lain tidak dapat merebut kendali aktif.
- Identitas owner tersembunyi tetap dikeluarkan dari roster/peer publik. Owner memperoleh avatar dirinya sendiri hanya dalam respons halaman pribadinya; tetap ada setelah directory refresh, dan dibersihkan saat kendali dilepas. Viewer boleh menggerakkan avatar sendiri, tetapi hak tulis bisnis/game/belanja tetap diblokir.
- Payload peer tidak mencakup session ID, kredit kecepatan, email, atau URL menu. Aktivitas menu hanya nama kategori yang sebelumnya diizinkan dan pengaturan berbagi aktivitas tetap berlaku.

## Cuaca dan kostum

Hujan menggunakan guratan air dan salju menggunakan partikel putih yang mengikuti wilayah kamera. Default lebat 3.600 partikel, ringan 650, badai 5.800; grafis hemat membatasi 900. Dua buffer GPU tetap dipakai ulang saat mengganti cuaca. Reduced motion menghentikan gerak atmosfer. Awan, gunung, aurora, rotasi cuaca, serta pilihan alps/desa/nordic tetap tersedia. Intensitas kawasan hanya dapat disimpan superadmin bidang Umum, dengan pemeriksaan versi agar dua admin tidak menimpa perubahan.

Tersedia **30 preset pakaian lengkap bergaya karakter dari lima seri**, enam per seri:

| Seri | Preset |
|---|---|
| Naruto | Naruto, Sakura, Sasuke, Kakashi, Hinata, Itachi |
| One Piece | Luffy, Zoro, Nami, Sanji, Robin, Chopper |
| Demon Slayer | Tanjiro, Nezuko, Zenitsu, Inosuke, Giyu, Shinobu |
| Dragon Ball | Goku, Vegeta, Gohan, Piccolo, Bulma, Trunks |
| My Hero Academia | Deku, Bakugo, Todoroki, Uraraka, Tsuyu, All Might |

Preset berisi rambut/penutup kepala, warna pakaian/celana, motif, dan aksesori khas yang dibuat sebagai geometri asli bergaya diorama. Editor hanya menyimpan pilihan akun sendiri melalui whitelist server; URL/model eksternal tidak diterima. Pilihan pakaian pribadi tetap tersedia. Tidak ada unduhan model, tekstur, atau musik pihak ketiga.

Referensi visual: [Naruto Official](https://naruto-official.com/en/anime/naruto1), [One Piece Official — kru Topi Jerami](https://one-piece.com/strawhatpirates/index.html), [Demon Slayer Official](https://kimetsu.com/anime/character/), [visual promosi Shonen Jump](https://sp.shonenjump.com/j/2019/01/28/190128_kimetsu001.html), [Dragon Ball Official](https://dragon-ball-official.com/), [My Hero Academia Official](https://heroaca.com/character/). Implementasi ini memiliki 30 preset, bukan seluruh karakter dalam setiap seri.

## Validasi dan batas pemeriksaan

- Suite aplikasi: **485 tes PHP, 3.501 assertions lulus**. Mencakup kepemilikan, sesi ganda/replay, teleport/net/batas kawasan, kembali ke komputer, owner privat, Viewer, geofence game/checkout, serta whitelist kostum.
- Suite JavaScript: **126 tes lulus**, mencakup fisika gerak/boost/lompat, input formulir/modal/blur, sinkronisasi satu request, paket terlambat sesudah restart, jadwal lari pertama, panel bekal tanpa perpindahan kamera, gate arena yang jauh, serta 60 geometri kostum ter-cache dengan vertex valid.
- Scene Three.js aktual diverifikasi menggunakan renderer pengujian: di bawah 750 mesh pada 24 avatar detail, collision metadata server persis sama dengan scene, kamera mobile, jalur NPC, game tidak memindahkan avatar manual, rekan di menu bisnis tetap di meja, penanda tujuan, dan avatar privat bertahan saat refresh. Buffer badai tidak dialokasikan ulang. Resource, label, audio, timer, dan frame dibersihkan saat tidak digunakan.
- Build produksi sukses; bundle utama aplikasi tetap `app-BOo76kZH.css` dan `app-C7FI9GmP.js`. Entry kantor sekitar 63,3 KB minified / 22,4 KB gzip, scene dinamis termasuk Three.js sekitar 631,5 KB / 167,4 KB gzip. Peringatan chunk Vite hanya untuk scene lazy tersebut.
- Pemeriksaan visual dan FPS GPU di browser belum dapat dilakukan karena konektor browser gagal dengan `Cannot read properties of undefined (reading 'timeoutMs')`. Pengujian geometri dan SSR bukan pengukuran FPS perangkat; tidak mengklaim bebas lag pada semua perangkat/jaringan.

Pemasangan menggunakan backup privat kode/aset/database dan tidak membutuhkan migrasi skema baru. Aset lama dipertahankan untuk tab yang masih terbuka. Data layout/kostum/collision di `resources/data` harus ikut terpasang bersama layanan PHP dan bundle.
