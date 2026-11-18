<?php

namespace App\Support;

use Illuminate\Validation\Rule;

class SpPaymentTerms
{
    public const MODES = ['full', 'realization'];

    public static function resolve(mixed $mode = null): string
    {
        return validator(['payment_mode' => $mode ?? 'full'], [
            'payment_mode' => ['bail', 'required', 'string', Rule::in(self::MODES)],
        ], ['payment_mode.*' => 'Pilih pembayaran 100% atau bertahap sesuai realisasi.'])->validate()['payment_mode'];
    }

    public static function label(string $mode): string
    {
        return $mode === 'realization' ? 'Bertahap sesuai realisasi pekerjaan' : '100% setelah barang diterima';
    }

    public static function opening(string $mode): string
    {
        return $mode === 'realization'
            ? 'Secara bertahap sesuai dengan realisasi pekerjaan dan dibayarkan setelah barang/jasa diterima'
            : 'Secara sekaligus 100% (Seratus Persen) dibayarkan setelah barang diterima';
    }

    public static function spClause(string $mode): string
    {
        return self::opening($mode).', dibayarkan paling lambat selama 60 (Enam Puluh) hari kalender setelah dokumen tagihan lengkap diterima oleh Keuangan dan Akuntansi dengan melampirkan:';
    }

    public static function contractSchedule(string $mode): string
    {
        return ($mode === 'realization'
            ? 'secara bertahap sesuai dengan realisasi pekerjaan dan dibayarkan setelah barang/jasa diterima'
            : 'secara sekaligus 100% (Seratus Persen) setelah barang/jasa diterima')
            .', diverifikasi, dan disetujui oleh PIHAK KESATU';
    }

    public static function contractFollowUp(string $mode, bool $withEmployer = false): string
    {
        if ($mode === 'full' && $withEmployer) {
            return 'Pembayaran dilakukan dengan cara sekaligus keseluruhan setelah seluruh pekerjaan selesai dan diterima oleh PIHAK KESATU dan Pemberi Kerja dengan benar dan dapat dipergunakan serta dipenuhinya ayat (8).';
        }

        $schedule = $mode === 'realization'
            ? 'secara bertahap sesuai dengan realisasi pekerjaan yang telah diterima dan disetujui'
            : 'secara sekaligus 100% (Seratus Persen) setelah seluruh barang/jasa diterima dan disetujui';
        $acceptance = $withEmployer ? 'PIHAK KESATU dan Pemberi Kerja' : 'KEDUA PIHAK';

        return 'Pembayaran dilakukan '.$schedule.' oleh '.$acceptance.' melalui transfer ke Rekening Bank PIHAK KEDUA serta dipenuhinya persyaratan tagihan sebagaimana dimaksud pada ayat (8).';
    }
}
