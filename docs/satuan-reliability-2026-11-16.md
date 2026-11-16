# Keandalan master satuan dan tambah cepat SP/SPPH

Perubahan 16 November 2026 memperbaiki alur satuan tanpa migrasi atau perubahan data pengadaan yang sudah tersimpan.

- Respons simpan wajib berupa JSON sukses yang sah. Halaman login, redirect, atau respons tanpa data satuan tidak lagi dianggap berhasil.
- SP dan SPPH memakai satu modul tambah cepat. Nama dari server digunakan sebagai nilai pilihan; satuan lama pada baris lain dan saat membuka dokumen tetap dipertahankan meskipun sudah dihapus dari master.
- Satu dialog/permintaan tambah cepat pada satu waktu. Submit dan reset formulir induk ditahan selama proses. Batas 30 detik mencakup pembacaan respons; permintaan tulis tidak diulang otomatis ketika hasilnya belum pasti.
- Tombol edit membaca atribut HTML yang di-escape, bukan menyisipkan nama/keterangan ke kode JavaScript. Keterangan mendukung baris baru; nilai `0` tidak lagi berubah menjadi kosong.
- Master satuan memakai validasi FormUX, mempertahankan isian saat gagal, konfirmasi hapus yang dapat dibatalkan, dan pengunci sampai navigasi selesai agar klik berulang tidak mengirim perubahan ganda.
- Konflik indeks unik setelah validasi menghasilkan kesalahan kolom 422. Batas nama 100 dan keterangan 255 mengikuti skema. Pengguna Umum biasa tetap dapat menambah satuan; pembatasan departemen dan mode hanya baca tetap berlaku.
- Penghapusan cache dilakukan sekali oleh observer. Direktori halaman mengambil tiga kolom; dropdown hanya mengambil nama. Kedua direktori memakai cache satu jam dan diperbarui setelah perubahan model.
- Lima anggaran permintaan terpisah: halaman 60, tambah 30, ubah 30, hapus 20, dropdown 90 per menit per pengguna. Respons JSON bersifat private/no-store. Tombol kembali hanya mengarah ke origin aplikasi.

## Verifikasi

- PHPUnit: **799 lulus, 8.537 assertion**. Termasuk pengujian benturan unik setelah validasi, perlindungan akses, invalidasi cache, batas kolom, dan nilai `0`.
- JavaScript: **370 lulus**, termasuk timeout saat body respons terhenti, hasil terlambat setelah pindah halaman, HTML/redirect, pelestarian pilihan lama, dan pembatalan.
- Playwright: master satuan desktop/ponsel, tambah cepat dari potongan fungsi SP dan SPPH, serta delapan skenario simpan SP/SPPH (tambah/edit, sukses/HTML). Tidak ada kesalahan JavaScript browser pada skenario tersebut.
- Pint diperiksa untuk controller, route, dan feature test yang berubah; sintaks keempat aset JavaScript diperiksa.
- Verifikasi rilis di MariaDB production wajib memakai transaksi hanya baca dan cache array terisolasi: satu query direktori saat dingin, nol query saat hangat, batas kolom/indeks unik, validasi, mode hanya baca, dan anggaran permintaan. Tidak ada uji tulis pada data pengguna.

Pengujian ini mencakup alur satuan dan regresi yang disebutkan, bukan jaminan bahwa setiap fitur di seluruh situs bebas masalah. Kecepatan jaringan/OneDrive dan pembacaan arsip tidak diubah oleh rilis ini.
