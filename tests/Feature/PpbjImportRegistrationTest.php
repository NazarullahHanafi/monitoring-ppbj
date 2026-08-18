<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PpbjImportRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_valid_import_rows_receive_sequential_general_registration_numbers(): void
    {
        Carbon::setTestNow('2026-08-18 09:15:30');

        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0009',
            'general_registration_number' => 'REG-UMUM/2026/009',
            'general_registered_at' => now()->subDay(),
            'general_registered_by_user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->postJson(route('ppbj.import.process'), [
            'data' => [
                [
                    'row_number' => 2,
                    'ppbj_no' => 'PKB/PR-26/CON/0100',
                    'uraian' => 'Import pertama',
                    'total_sebelum_ppn' => '1.000.000',
                ],
                [
                    'row_number' => 3,
                    'ppbj_no' => 'PKB/PR-26/CON/0101',
                    'uraian' => 'Import kedua',
                    'total_sebelum_ppn' => '2.000.000',
                ],
            ],
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('imported', 2)
            ->assertJsonPath('failed', 0);

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0100',
            'general_registration_number' => 'REG-UMUM/2026/010',
            'general_registered_by_user_id' => $user->id,
            'created_by_user_id' => $user->id,
        ]);
        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0101',
            'general_registration_number' => 'REG-UMUM/2026/011',
            'general_registered_by_user_id' => $user->id,
            'created_by_user_id' => $user->id,
        ]);

        $this->assertSame(
            '2026-08-18 09:15:30',
            Ppbj::where('ppbj_no', 'PKB/PR-26/CON/0100')->firstOrFail()->general_registered_at->format('Y-m-d H:i:s')
        );

        Carbon::setTestNow();
    }

    public function test_duplicate_rows_do_not_consume_a_registration_number(): void
    {
        Carbon::setTestNow('2026-08-18 10:00:00');

        $user = User::factory()->create([
            'department' => 'umum',
            'role' => 'superadmin',
        ]);

        Ppbj::create([
            'ppbj_no' => 'PKB/PR-26/CON/0200',
            'general_registration_number' => 'REG-UMUM/2026/020',
        ]);

        $response = $this->actingAs($user)->postJson(route('ppbj.import.process'), [
            'data' => [
                ['row_number' => 2, 'ppbj_no' => 'PKB/PR-26/CON/0200'],
                ['row_number' => 3, 'ppbj_no' => 'PKB/PR-26/CON/0201'],
            ],
        ]);

        $response->assertOk()
            ->assertJsonPath('imported', 1)
            ->assertJsonPath('failed', 1);

        $this->assertDatabaseHas('ppbj', [
            'ppbj_no' => 'PKB/PR-26/CON/0201',
            'general_registration_number' => 'REG-UMUM/2026/021',
        ]);

        Carbon::setTestNow();
    }
}
