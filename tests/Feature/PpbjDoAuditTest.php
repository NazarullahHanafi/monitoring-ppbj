<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use App\Models\ActivityLog;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PpbjDoAuditTest extends TestCase
{
    use RefreshDatabase;

    public function test_do_change_records_timestamp_user_and_history(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/DO-AUDIT',
            'uraian' => 'Pengujian audit DO',
        ]);

        Carbon::setTestNow('2026-08-19 10:15:30');
        $ppbj->update([
            'do_no' => 'DO/001/2026',
            'do_date' => '2026-08-19',
        ]);

        $ppbj->refresh();

        $this->assertSame('DO/001/2026', $ppbj->do_no);
        $this->assertSame('2026-08-19', $ppbj->do_date?->format('Y-m-d'));
        $this->assertSame($user->id, $ppbj->do_updated_by_user_id);
        $this->assertSame('2026-08-19 10:15:30', $ppbj->do_updated_at?->format('Y-m-d H:i:s'));
        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $user->id,
            'model_type' => Ppbj::class,
            'model_id' => $ppbj->id,
            'action' => 'do_recorded',
        ]);

        Carbon::setTestNow('2026-08-19 11:20:45');
        $ppbj->update(['do_no' => 'BAST/002/2026']);

        $this->assertDatabaseHas('activity_logs', [
            'model_id' => $ppbj->id,
            'action' => 'do_updated',
        ]);

        $updatedBy = $ppbj->fresh()->doUpdatedBy()->first();
        $this->assertSame($user->id, $updatedBy?->id);
        $this->assertSame('2026-08-19 11:20:45', $ppbj->fresh()->do_updated_at?->format('Y-m-d H:i:s'));
    }

    public function test_unrelated_update_does_not_change_do_audit_time(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Carbon::setTestNow('2026-08-19 09:00:00');
        $ppbj = Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/DO-STABLE',
            'uraian' => 'Data awal',
            'do_no' => 'DO/STABLE/2026',
        ]);

        Carbon::setTestNow('2026-08-19 12:00:00');
        $ppbj->update(['uraian' => 'Data diperbarui']);

        $this->assertSame('2026-08-19 09:00:00', $ppbj->fresh()->do_updated_at?->format('Y-m-d H:i:s'));
        $this->assertSame(1, ActivityLog::query()
            ->where('model_type', Ppbj::class)
            ->where('model_id', $ppbj->id)
            ->whereIn('action', ['do_recorded', 'do_updated', 'do_cleared'])
            ->count());
    }
}
