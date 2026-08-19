<?php

namespace Tests\Unit;

use App\Models\Ppbj;
use Carbon\Carbon;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class PpbjSlaContractTest extends TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    public static function targetProvider(): array
    {
        return [
            'kosong' => [null, 0],
            'nol' => [0, 0],
            'tepat 50 juta' => [50_000_000, 10],
            'di atas 50 juta' => [50_000_001, 14],
        ];
    }

    #[DataProvider('targetProvider')]
    public function test_target_sla_mengikuti_nilai_pr(mixed $value, int $expected): void
    {
        $this->assertSame($expected, Ppbj::hitungTargetSla($value));
    }

    public function test_sla_baru_selesai_setelah_semua_field_kontrak_terisi(): void
    {
        $ppbj = new Ppbj([
            'awarding_sp' => '001/PKU/VIII/SP/2026',
            'tgl_awarding_sp' => '2026-08-08',
        ]);

        $this->assertFalse($ppbj->isSlaComplete());

        $ppbj->tgl_spk = '2026-08-09';

        $this->assertTrue($ppbj->isSlaComplete());
    }

    public function test_sla_selesai_lebih_cepat_dihitung_dari_tanggal_spk(): void
    {
        $ppbj = new Ppbj([
            'total_sebelum_ppn' => 25_000_000,
            'tgl_diserahkan' => '2026-08-01',
            'awarding_sp' => '001/PKU/VIII/SP/2026',
            'tgl_awarding_sp' => '2026-08-07',
            'tgl_spk' => '2026-08-08',
        ]);

        $this->assertSame(10, $ppbj->slaTargetDays());
        $this->assertSame(7, $ppbj->slaUsedDays());
        $this->assertSame(3, $ppbj->slaFinalRemainingDays());
        $this->assertSame('Lebih cepat 3 hari', $ppbj->slaOutcomeLabel());
        $this->assertStringContainsString('Realisasi 7 hari', $ppbj->slaExplanation());
    }

    public function test_sla_berjalan_menggunakan_hari_ini_tanpa_mengubah_database(): void
    {
        Carbon::setTestNow('2026-08-06 09:00:00');

        $ppbj = new Ppbj([
            'total_sebelum_ppn' => 75_000_000,
            'tgl_terima_pr' => '2026-08-01',
        ]);

        $this->assertSame(14, $ppbj->slaTargetDays());
        $this->assertSame(5, $ppbj->slaRunningDays());
        $this->assertSame(9, $ppbj->slaCurrentRemainingDays());
        $this->assertSame('ON TRACK', $ppbj->status_sla);
    }

    public function test_status_masa_pemenuhan_memberi_reminder_profesional(): void
    {
        Carbon::setTestNow('2026-08-10 09:00:00');

        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
            'promised_date' => '2026-08-17',
        ]);

        $this->assertSame(16, $ppbj->contractDurationDays());
        $this->assertSame(7, $ppbj->contractRemainingDays());
        $this->assertSame('SANGAT KRITIS', $ppbj->contractStatusLabel());
        $this->assertStringContainsString('tersisa 7 hari', $ppbj->contractExplanation());

        $ppbj->setRawAttributes(array_merge($ppbj->getAttributes(), [
            'goods_confirmed_at' => '2026-08-11 10:00:00',
        ]));

        $this->assertSame('SANGAT KRITIS', $ppbj->contractStatusLabel());
        $this->assertStringContainsString('belum dinyatakan selesai', $ppbj->contractExplanation());
    }

    public function test_serah_terima_selesai_lebih_cepat_berdasarkan_nomor_dan_tanggal_do(): void
    {
        Carbon::setTestNow('2026-08-25 09:00:00');

        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
            'promised_date' => '2026-08-20',
            'do_no' => 'BAST/001/2026',
            'do_date' => '2026-08-18',
        ]);

        $this->assertTrue($ppbj->isHandoverComplete());
        $this->assertNull($ppbj->contractRemainingDays());
        $this->assertSame(-2, $ppbj->handoverDeviationDays());
        $this->assertSame('LEBIH CEPAT 2 HARI', $ppbj->handoverPerformanceLabel());
        $this->assertSame('SERAH TERIMA SELESAI', $ppbj->contractStatusLabel());
        $this->assertStringContainsString('lebih cepat 2 hari', $ppbj->contractExplanation());
    }

    public function test_serah_terima_terlambat_memakai_closed_date_sebagai_fallback(): void
    {
        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
            'closed_date' => '2026-08-20',
            'do_no' => 'DO/002/2026',
            'do_date' => '2026-08-23',
        ]);

        $this->assertSame(3, $ppbj->handoverDeviationDays());
        $this->assertSame('TERLAMBAT 3 HARI', $ppbj->handoverPerformanceLabel());
        $this->assertSame('SERAH TERIMA TERLAMBAT', $ppbj->contractStatusLabel());
        $this->assertStringContainsString('Closed Date (fallback)', $ppbj->contractExplanation());
    }

    public function test_nomor_atau_tanggal_do_saja_belum_menyelesaikan_serah_terima(): void
    {
        $onlyNumber = new Ppbj([
            'promised_date' => '2026-08-20',
            'do_no' => 'DO/003/2026',
        ]);
        $onlyDate = new Ppbj([
            'promised_date' => '2026-08-20',
            'do_date' => '2026-08-19',
        ]);

        $this->assertFalse($onlyNumber->isHandoverComplete());
        $this->assertFalse($onlyDate->isHandoverComplete());
        $this->assertSame('DOKUMEN SERAH TERIMA BELUM LENGKAP', $onlyNumber->contractStatusLabel());
        $this->assertSame('DOKUMEN SERAH TERIMA BELUM LENGKAP', $onlyDate->contractStatusLabel());
    }

    public function test_promised_date_menjadi_prioritas_batas_pemenuhan(): void
    {
        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
            'promised_date' => '2026-08-20',
            'closed_date' => '2026-08-25',
        ]);

        $this->assertSame('2026-08-20', $ppbj->contractEndDate()?->toDateString());
        $this->assertSame('Promised Date', $ppbj->contractEndDateSourceLabel());
    }

    public function test_promised_date_diserialisasi_dalam_format_input_html_date(): void
    {
        $ppbj = new Ppbj([
            'promised_date' => '2026-09-19',
        ]);

        $this->assertSame('2026-09-19', $ppbj->toArray()['promised_date']);
    }

    public function test_closed_date_dipakai_sebagai_fallback_jika_promised_date_kosong(): void
    {
        Carbon::setTestNow('2026-08-10 09:00:00');

        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
            'closed_date' => '2026-08-25',
        ]);

        $this->assertSame('2026-08-25', $ppbj->contractEndDate()?->toDateString());
        $this->assertSame('Closed Date (fallback)', $ppbj->contractEndDateSourceLabel());
        $this->assertSame(15, $ppbj->contractRemainingDays());
        $this->assertStringContainsString('Closed Date (fallback)', $ppbj->contractExplanation());
    }

    public function test_masa_pemenuhan_tidak_dihitung_jika_kedua_tanggal_kosong(): void
    {
        $ppbj = new Ppbj([
            'tgl_spk' => '2026-08-01',
        ]);

        $this->assertNull($ppbj->contractEndDate());
        $this->assertNull($ppbj->contractEndDateSourceLabel());
        $this->assertNull($ppbj->contractRemainingDays());
        $this->assertNull($ppbj->contractDurationDays());
        $this->assertSame('BATAS BELUM DIATUR', $ppbj->contractStatusLabel());
    }
}
