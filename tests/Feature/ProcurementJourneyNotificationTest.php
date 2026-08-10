<?php

namespace Tests\Feature;

use App\Models\Torpr;
use App\Models\User;
use App\Services\ProcurementJourneyService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ProcurementJourneyNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_progress_notification_mentions_creator_and_shows_pr_description(): void
    {
        $creator = User::factory()->create(['name' => 'Zikri']);
        $actor = User::factory()->create(['name' => 'Umum']);

        Torpr::query()->create([
            'created_by_user_id' => $creator->id,
            'nomor_pr' => 'PKB/PR-26/CON/0466',
            'tujuan_pengadaan' => 'Pengadaan printer operasional',
            'portofolio' => 'IT - FERS',
            'jumlah_pr' => 12500000,
        ]);

        $sent = app(ProcurementJourneyService::class)->notifyByPrNumber(
            'PKB/PR-26/CON/0466',
            'sp.updated',
            'Surat Pesanan diperbarui',
            'Data SP 366/PKU-VIII/SP/2026 diperbarui oleh Umum.',
            [
                'progress' => 'Update SP/Kontrak',
                'vendors' => ['KOPERASI KARYAWAN SUCOFINDO CABANG PEKANBARU'],
                'document_no' => '366/PKU-VIII/SP/2026',
            ],
            $actor
        );

        $this->assertTrue($sent);

        $message = DB::table('chat_messages')->first();
        $this->assertNotNull($message);
        $this->assertStringContainsString('Untuk: @Zikri', $message->message);
        $this->assertStringContainsString('Deskripsi: Pengadaan printer operasional', $message->message);
        $this->assertStringContainsString('Aksi berikutnya:', $message->message);

        $shareData = json_decode($message->share_data, true);
        $this->assertSame('Update Progress PR', $shareData['label']);
        $this->assertSame('PKB/PR-26/CON/0466', $shareData['number']);
        $this->assertSame('Pengadaan printer operasional', $shareData['title']);
        $this->assertSame('@Zikri', $shareData['fields'][0]['value']);
    }
}
