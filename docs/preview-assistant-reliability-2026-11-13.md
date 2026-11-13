# Keandalan preview cetak dan asisten — 13 November 2026

Lingkup: file preview SP/SPPH dan widget asisten pada layout bersama. Tidak ada perubahan data pengadaan, keputusan approval, identitas PR, isi berkas arsip, atau konfigurasi OCR/OneDrive.

## Asisten

Riwayat browser sebelumnya terus bertambah dan akhirnya melewati validasi server (maksimal 20 pesan konteks). Pesan terbaru juga ikut dalam riwayat sebelum dikirim sehingga diteruskan dua kali ke model. Sekarang hanya konteks terbaru yang dikirim: maksimal 20 pesan bagi pengguna login / 6 bagi tamu, 2.000 karakter per pesan konteks dan 12.000 karakter total. Pertanyaan aktif dikirim satu kali. Jawaban lengkap tetap ditampilkan; pembatasan berlaku pada konteks permintaan berikutnya. Cache server menyimpan setiap pertukaran dengan pesan terakhirnya, bukan menyalin ulang seluruh konteks pada setiap entri.

Satu operasi aktif mengendalikan submit, starter, balasan cepat, dan hapus riwayat. Respons JSON harus memiliki status HTTP sukses serta `success: true`. Deadline mencakup pembacaan body, bukan hanya penerimaan header; timeout tidak mengirim ulang otomatis dan mengembalikan draft. Respons lama diabaikan setelah meninggalkan halaman. Restore halaman mengaktifkan tombol dan menjelaskan hasil yang belum terverifikasi. Jawaban lokal memakai pengendali yang sama agar klik ganda tidak menggandakan balasan.

Hapus riwayat kini menyertakan CSRF dan baru mengosongkan tampilan setelah server mengonfirmasi. Kegagalan mempertahankan riwayat di layar; tamu hanya menghapus percakapan lokal. Hak akses viewer/read-only yang sudah berlaku tetap dipertahankan. Sembilan endpoint memakai prefix throttle terpisah dengan angka batas lama dipertahankan; polling notifikasi diberi batas eksplisit 60/menit.

Widget menggunakan kolom `department` yang sebenarnya; sebelumnya membaca `dept` sehingga pilihan Umum/Operasional tidak sesuai. Endpoint quick-replies yang sudah terdaftar namun belum memiliki method controller sekarang memberikan saran sesuai departemen tanpa membaca dokumen bisnis. Penyimpanan posisi widget yang tidak tersedia atau JSON-nya rusak tidak lagi menghentikan inisialisasi.

Sentuhan pada tombol widget sekarang menekan event mouse sintetis agar satu ketukan tidak membuka lalu langsung menutup widget. Diuji menggunakan sentuhan browser sebenarnya, bukan hanya viewport ponsel.

## Preview cetak

Sebelumnya sumber sementara dihapus setelah `copy()` tanpa memeriksa keberhasilannya. Sekarang preview memakai staging di direktori privat, membandingkan SHA-256, melakukan rename, mendaftarkan metadata, baru menghapus sumber. Kegagalan mempertahankan sumber dan membersihkan salinan yang belum dipublikasikan. Nama file disk memakai UUID agar judul Unicode panjang tidak melampaui batas byte filesystem; nama unduhan disimpan terpisah. Berkas baru memakai izin owner-only pada hosting Linux.

Resolusi token memeriksa UUID, akun pemilik, TTL, dan lokasi kanonis di folder pemilik. Token lama yang belum mempunyai hash tetap didukung. ETag memungkinkan browser menerima 304 tanpa mengunduh byte yang sama lagi, tetapi kepemilikan/masa berlaku diperiksa sebelum menjawab 304. Respons secara eksplisit memakai `setPrivate()` karena constructor BinaryFileResponse default dapat menetapkan public meskipun header awal berisi private. Respons memakai private/no-cache/must-revalidate; bukan cache publik yang melewati autentikasi.

Pembersihan file lewat tiga jam menggunakan iterator dan gerbang cache per pengguna sepuluh menit, menggantikan glob di setiap pembuatan preview. Ini mengurangi pemindaian direktori berulang tanpa menghapus preview yang masih aktif. Tidak ada perubahan retensi berkas arsip asli.

## Validasi dan deploy

Tes baru meliputi cache/CSRF/role asisten, konteks panjang, klik berulang, body JSON menggantung, respons rusak/HTML, kehilangan koneksi, pemulihan halaman, pembatasan tamu, preview lintas akun, signature/TTL/path, kegagalan penyimpanan, nama Unicode, dan cleanup file aktif. Browser menguji widget sebenarnya pada desktop dan ponsel. Suite PHP dan JavaScript penuh dijalankan untuk regresi.

Hasil lokal: 728 tes PHP lulus (7.063 assertion), 329 tes JavaScript lulus, serta skenario browser desktop dan sentuhan ponsel lulus. Audit Composer dan npm tidak melaporkan advisory atau dependensi ditinggalkan pada saat pemeriksaan. Ini bukan jaminan seluruh website bebas bug atau kerentanan di masa depan.

Deploy memerlukan kode, `public/assets/app/chatbot.js` pada webroot sebenarnya, serta cache route/view. Verifikasi hosting menggunakan PDF sintetis dan cache array terisolasi, tanpa menulis tabel bisnis, memanggil layanan AI, atau menghapus riwayat pengguna di cache produksi. File sintetis dibersihkan setelah pemeriksaan.
