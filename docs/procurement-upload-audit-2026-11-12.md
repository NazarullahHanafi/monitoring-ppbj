# Audit unggah, pencarian dokumen, dan validasi UI — 12 November 2026

## Lingkup

Lampiran vendor, lampiran rincian SP/SPPH, tambah/edit vendor, dan tampilan validasi formulir aplikasi termasuk halaman hologram. Tidak ada klaim bebas bug untuk seluruh aplikasi atau klaim teknologi pertama di dunia.

## Perubahan

- Satu daftar format `ProcurementUploadFormats`: PDF; DOC/DOCX; XLS/XLSX; PPT/PPTX; ODT/ODS/ODP; TXT/CSV/RTF; JPG/JPEG/PNG/WebP/GIF/BMP/TIF/TIFF (21 ekstensi). Maksimal 10 MiB, dengan batas formulir vendor mengikuti batas PHP yang lebih rendah.
- `ProcurementUploadInspector` memeriksa isi asli, ekstensi, dan struktur, tidak mempercayai MIME dari browser. Tidak menerima program/script atau mengganti semua aturan menjadi wildcard. Pemeriksaan Office mencakup struktur yang diperlukan, deklarasi XML/entity (termasuk UTF-16), makro/tipe aktif, path traversal, enkripsi, jumlah bagian, dan batas ekspansi ZIP. Tidak mengekstrak arsip ke direktori publik dan tidak menjalankan makro atau rumus.
- `ProcurementOfficeReader` membaca teks/tabel DOCX (termasuk header/footer/catatan kaki), XLSX (semua worksheet dengan nama dan shared/inline strings), PPTX, OpenDocument, dan CSV/TXT. XML dibaca berurutan, akses DTD/entity dinonaktifkan. Dua slot pembaca global, tanpa antrean blocking. Batas: 40 MiB total bagian ZIP, 2.000 bagian, 100 sheet/slide/bagian terpilih, 50.000 sel, 200.000 karakter teks; XML terpilih sampai 8 MiB, body Word untuk parser lama sampai 2 MiB. Melampaui kapasitas baca tidak menghilangkan kemampuan menyimpan berkas dengan metadata/teks manual.
- PDF dan gambar tetap dibaca di perangkat dengan aset lokal; OCR tidak berjalan ketika pengguna mencari. DOC/XLS/PPT biner lama, RTF dan TIFF dapat diunggah dengan teks manual. Kualitas OCR harus diperiksa pengguna; dukungan unggah bukan jaminan seluruh format bisa diekstraksi otomatis.
- Dokumen vendor tetap disimpan di OneDrive melalui adapter CLI yang diverifikasi, dengan checksum, retry UUID, dan unduhan privat. Penyimpanan asli SP/SPPH mengikuti mekanisme yang sudah ada; perubahan ini tidak memindahkan arsip lama atau mengganti penyimpanan modul lain.
- Pencarian vendor menampilkan cuplikan sampai 240 karakter saat kata dicari. Bila hasil kosong, diagnosis maksimal delapan kata dilakukan hanya dalam vendor dan filter aktif; tombol saran memperluas pencarian hanya setelah diklik. Tidak ada perluasan otomatis filter nomor PR. Filter perhatian: teks belum dilengkapi, masa berlaku habis/dalam 30 hari, transfer belum selesai. Pagination 20 dokumen tetap berlaku; teks penuh tidak dikirim pada daftar awal.
- `form-ux.js` menampilkan ringkasan dan pesan di dekat kolom, mengelola fokus/ARIA, serta menahan popup validasi browser melalui event `invalid`. Validasi server tetap aktif. Dialog konfirmasi lampiran memakai tampilan aplikasi, bukan `window.confirm`. Peringatan browser saat meninggalkan halaman dengan perubahan belum tersimpan tetap dipertahankan karena hanya browser yang dapat melindungi navigasi tersebut.
- Unggah vendor mendukung drag/drop satu berkas, informasi nama/ukuran, indikator proses, dan teks yang tetap tersedia ketika berkas diganti atau simpan gagal. Kesalahan validasi server dipetakan ke kolom. Penggantian teks memerlukan konfirmasi.
- Tambah/edit vendor memakai respons JSON, menjaga nilai setelah validasi server gagal, dan membekukan kontrol selama penyimpanan. Respons/sumber navigasi diperiksa sebelum berpindah halaman. Checkbox nonaktif mengirim nilai `0` secara eksplisit; sebelumnya checkbox yang tidak dicentang memakai default `true`.

## Pengujian

`ProcurementUploadFormatsTest` mencakup berkas Office dan gambar nyata, struktur rusak, entity, makro, traversal, ekspansi berlebih, pembacaan tanpa cloud, kuota, isolasi vendor, cuplikan/diagnosis, dan unggah ke adapter OneDrive. `ProcurementDetailAttachmentTest` memeriksa bahwa Excel/CSV/foto dapat diunggah, ditinjau, lalu ditemukan pada SP dan SPPH. `VendorFiltersTest` melindungi filter manual, respons simpan, pilihan nonaktif, dan duplikasi nama.

Playwright: `vendor-documents.cjs`, `vendor-save.cjs`, `form-ux.cjs`, `procurement-details.cjs`, dan `procurement-attachment-recovery.cjs` memakai aset sebenarnya untuk desktop/ponsel, validasi tanpa popup native, konfirmasi, koreksi teks saat konflik, pembacaan PDF/foto, retry, dan respons rusak. Modul pencarian/pengaturan tetap memiliki pengujian regresi terpisah.

Pemasangan memerlukan penyalinan aset baru ke webroot yang sebenarnya dan cache route/view. Tidak memerlukan migrasi database atau pemasangan dependensi. Uji produksi memakai berkas sintetis dan transaksi database yang di-rollback; berkas cloud uji dihapus setelah diverifikasi.

Rujukan desain: [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html), [Microsoft Compound File Header](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-cfb/05060311-bfce-4b12-874d-71fd4ce63aea).
