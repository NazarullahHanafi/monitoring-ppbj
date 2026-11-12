<?php

namespace App\Exceptions;

class VendorCloudException extends \RuntimeException
{
    public function __construct(public readonly string $reason)
    {
        parent::__construct(match ($reason) {
            'configuration' => 'Koneksi OneDrive belum tersedia. Administrator perlu memeriksa pengaturan penyimpanan.',
            'runtime' => 'Proses penyimpanan belum dapat dijalankan di server. Administrator perlu memeriksa PHP CLI.',
            'busy' => 'Transfer OneDrive sedang penuh. Tunggu sebentar lalu coba lagi dengan berkas yang sama.',
            'timeout' => 'OneDrive belum merespons tepat waktu. Muat ulang daftar sebelum mencoba lagi dengan berkas yang sama.',
            'authentication' => 'Koneksi akun OneDrive perlu diperiksa atau dihubungkan ulang oleh administrator.',
            'integrity' => 'Integritas berkas di OneDrive belum terverifikasi. Berkas belum dinyatakan tersimpan; coba lagi dengan berkas yang sama.',
            default => 'OneDrive belum berhasil memproses berkas. Muat ulang daftar lalu coba lagi dengan berkas yang sama.',
        });
    }
}
