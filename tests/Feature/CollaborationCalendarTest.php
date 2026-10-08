<?php

namespace Tests\Feature;

use App\Models\CollaborationEvent;
use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CollaborationCalendarTest extends TestCase
{
    use RefreshDatabase;

    public function test_umum_and_operasional_can_open_calendar_but_unknown_department_cannot(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');
        $other = $this->user('finance');

        $this->actingAs($umum)
            ->get(route('collaboration-calendar.index'))
            ->assertOk()
            ->assertSee('Collaborative Calendar')
            ->assertSee('Kalender Kolaborasi');

        $this->actingAs($operasional)
            ->get(route('collaboration-calendar.index'))
            ->assertOk()
            ->assertSee('Operasional')
            ->assertSee('Umum');

        $this->actingAs($other)
            ->get(route('collaboration-calendar.index'))
            ->assertForbidden();
    }

    public function test_cross_role_event_is_visible_and_department_event_stays_private(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');

        $shared = $this->createEvent($umum, ['title' => 'Review Bersama', 'audience' => 'all']);
        $private = $this->createEvent($umum, ['title' => 'Internal Umum', 'audience' => 'umum']);

        $response = $this->actingAs($operasional)->getJson(route('collaboration-calendar.events', [
            'start' => today()->startOfMonth()->subWeek()->toDateString(),
            'end' => today()->startOfMonth()->addDays(41)->toDateString(),
        ]));

        $response->assertOk()
            ->assertJsonFragment(['id' => $shared->public_id, 'title' => 'Review Bersama'])
            ->assertJsonMissing(['id' => $private->public_id, 'title' => 'Internal Umum']);
    }

    public function test_event_creation_is_validated_audited_and_uses_public_uuid(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');
        $ppbj = $this->ppbj();

        $response = $this->actingAs($umum)->postJson(route('collaboration-calendar.store'), [
            'title' => 'Konfirmasi kesiapan BAST',
            'description' => 'Operasional mengonfirmasi hasil pekerjaan sebelum Umum melengkapi arsip.',
            'starts_at' => today()->setHour(9)->toIso8601String(),
            'ends_at' => today()->setHour(10)->toIso8601String(),
            'all_day' => false,
            'priority' => 'high',
            'status' => 'planned',
            'audience' => 'all',
            'assignee_id' => $operasional->id,
            'ppbj_no' => $ppbj->ppbj_no,
        ]);

        $response->assertCreated()
            ->assertJsonPath('event.title', 'Konfirmasi kesiapan BAST')
            ->assertJsonPath('event.assignee.id', $operasional->id)
            ->assertJsonPath('event.ppbj.ppbj_no', $ppbj->ppbj_no)
            ->assertJsonPath('event.version', 1);

        $publicId = $response->json('event.id');
        $this->assertMatchesRegularExpression('/^[0-9a-f-]{36}$/', $publicId);
        $this->assertDatabaseHas('collaboration_events', ['public_id' => $publicId, 'creator_id' => $umum->id]);
        $this->assertDatabaseHas('activity_logs', ['action' => 'calendar_event_created', 'user_id' => $umum->id]);
    }

    public function test_assignee_can_update_status_but_cannot_edit_or_delete_event(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');
        $event = $this->createEvent($umum, ['assignee_id' => $operasional->id, 'audience' => 'all']);

        $this->actingAs($operasional)
            ->patchJson(route('collaboration-calendar.status', $event), [
                'status' => 'in_progress',
                'version' => 1,
            ])
            ->assertOk()
            ->assertJsonPath('event.status', 'in_progress')
            ->assertJsonPath('event.version', 2);

        $payload = $this->eventPayload(['title' => 'Tidak Boleh Diubah', 'version' => 2]);
        $this->actingAs($operasional)
            ->patchJson(route('collaboration-calendar.update', $event), $payload)
            ->assertForbidden();

        $this->actingAs($operasional)
            ->deleteJson(route('collaboration-calendar.destroy', $event), ['version' => 2])
            ->assertForbidden();
    }

    public function test_optimistic_lock_prevents_two_users_overwriting_the_same_version(): void
    {
        $creator = $this->user('umum');
        $event = $this->createEvent($creator);

        $this->actingAs($creator)
            ->patchJson(route('collaboration-calendar.update', $event), $this->eventPayload([
                'title' => 'Versi Pertama',
                'version' => 1,
            ]))
            ->assertOk()
            ->assertJsonPath('event.version', 2);

        $this->actingAs($creator)
            ->patchJson(route('collaboration-calendar.update', $event), $this->eventPayload([
                'title' => 'Versi Kedaluwarsa',
                'version' => 1,
            ]))
            ->assertStatus(409);

        $this->assertDatabaseHas('collaboration_events', ['id' => $event->id, 'title' => 'Versi Pertama', 'version' => 2]);
    }

    public function test_system_deadlines_are_generated_in_a_constant_query_budget(): void
    {
        $umum = $this->user('umum');
        $this->ppbj([
            'tgl_diserahkan' => today()->subDays(3),
            'promised_date' => today()->addDays(5),
            'tgl_spk' => today()->subDay(),
            'total_sebelum_ppn' => 25_000_000,
        ]);

        DB::flushQueryLog();
        DB::enableQueryLog();
        $response = $this->actingAs($umum)->getJson(route('collaboration-calendar.events', [
            'start' => today()->subDays(10)->toDateString(),
            'end' => today()->addDays(31)->toDateString(),
        ]));
        $queryCount = count(DB::getQueryLog());
        DB::disableQueryLog();

        $response->assertOk()
            ->assertJsonFragment(['source' => 'sla'])
            ->assertJsonFragment(['source' => 'contract'])
            ->assertJsonFragment(['source' => 'milestone']);
        $this->assertLessThanOrEqual(6, $queryCount, "Calendar memakai {$queryCount} query.");
    }

    public function test_pr_journey_is_detailed_secure_and_available_to_both_roles(): void
    {
        $creator = $this->user('operasional');
        $receiver = $this->user('umum');
        $other = $this->user('finance');
        $ppbj = $this->ppbj([
            'created_by_user_id' => $creator->id,
            'general_registration_number' => 'REG-UMUM/2026/999',
            'general_registered_at' => now()->subDays(8),
            'general_registered_by_user_id' => $receiver->id,
            'tgl_terima_pr' => today()->subDays(8),
            'spph_rfq_1' => '999/PKU-X/SPPH/2026',
            'tgl_spph' => today()->subDays(7),
            'awarding_sp' => '999/PKU-X/SP/2026',
            'tgl_spk' => today()->subDays(4),
            'nilai_sp_spk' => 9_500_000,
            'do_no' => 'BAST-999',
            'do_date' => today()->subDay(),
            'bpg_no' => 'BPG-999',
            'tgl_bpg' => today(),
            'no_invoice' => 'INV-999',
            'tgl_invoice' => today(),
        ]);
        $spph = Spph::query()->create([
            'nomor_spph' => '999/PKU-X/SPPH/2026',
            'sequence_number' => 999,
            'tanggal' => today()->subDays(7),
            'nomor_pr' => $ppbj->ppbj_no,
            'nama_vendor' => 'Vendor Uji',
            'deskripsi_pengadaan' => $ppbj->uraian,
            'pic' => $receiver->name,
            'created_by_user_id' => $receiver->id,
        ]);
        $sp = Sp::query()->create([
            'nomor_sp' => '999/PKU-X/SP/2026',
            'sequence_number' => 999,
            'tanggal_sp' => today()->subDays(4),
            'nilai_sp' => 9_500_000,
            'nomor_pr' => $ppbj->ppbj_no,
            'nama_vendor' => 'Vendor Uji',
            'deskripsi_pengadaan' => $ppbj->uraian,
            'pic' => $receiver->name,
            'created_by_user_id' => $receiver->id,
        ]);
        $ppbj->spphs()->attach($spph->id, ['urutan' => 1]);
        $ppbj->sps()->attach($sp->id, ['urutan' => 1]);

        DB::flushQueryLog();
        DB::enableQueryLog();
        $response = $this->actingAs($receiver)
            ->getJson(route('collaboration-calendar.journey', $ppbj));
        $queryCount = count(DB::getQueryLog());
        DB::disableQueryLog();

        $response->assertOk()
            ->assertJsonPath('record.ppbj_no', $ppbj->ppbj_no)
            ->assertJsonPath('record.registration_number', 'REG-UMUM/2026/999')
            ->assertJsonPath('stages.0.actor.name', $creator->name)
            ->assertJsonPath('stages.0.actor.department', 'operasional')
            ->assertJsonPath('stages.1.actor.name', $receiver->name)
            ->assertJsonPath('stages.2.documents.0.actor.name', $receiver->name)
            ->assertJsonPath('stages.4.documents.0.number', '999/PKU-X/SP/2026')
            ->assertJsonPath('stages.7.state', 'done')
            ->assertJsonPath('stages.7.summary', 'Invoice tercatat dengan nomor INV-999.');
        $this->assertLessThanOrEqual(18, $queryCount, "Journey memakai {$queryCount} query.");

        $this->actingAs($creator)
            ->getJson(route('collaboration-calendar.journey', $ppbj))
            ->assertOk();

        $this->actingAs($other)
            ->getJson(route('collaboration-calendar.journey', $ppbj))
            ->assertForbidden();
    }

    public function test_pr_finder_returns_bounded_detailed_and_filtered_results(): void
    {
        $umum = $this->user('umum');
        $receiver = $this->user('umum');
        $other = $this->user('finance');
        $match = $this->ppbj([
            'ppbj_no' => 'PKB/PR-26/CON/9876',
            'uraian' => 'Pengadaan alat laboratorium khusus',
            'portofolio' => 'PK - LAB',
            'buyer' => 'Buyer Uji',
            'tgl_ppbj' => '2026-10-02',
            'tgl_terima_pr' => '2026-10-03',
            'general_registered_by_user_id' => $receiver->id,
            'general_registration_number' => 'REG-UMUM/2026/9876',
            'total_sebelum_ppn' => 1375000000,
            'penyedia_eksternal' => 'Vendor Laboratorium',
        ]);
        $this->ppbj([
            'ppbj_no' => 'PKB/PR-26/CON/9877',
            'uraian' => 'Pengadaan kendaraan',
            'portofolio' => 'PROPERTY',
            'tgl_ppbj' => '2026-09-01',
        ]);

        DB::flushQueryLog();
        DB::enableQueryLog();
        $response = $this->actingAs($umum)->getJson(route('collaboration-calendar.ppbj-search', [
            'q' => 'laboratorium',
            'portfolio' => 'PK - LAB',
            'receiver_id' => $receiver->id,
            'date_from' => '2026-10-01',
            'date_to' => '2026-10-31',
        ]));
        $queryCount = count(DB::getQueryLog());
        DB::disableQueryLog();

        $response->assertOk()
            ->assertJsonCount(1, 'results')
            ->assertJsonPath('results.0.id', $match->id)
            ->assertJsonPath('results.0.ppbj_no', 'PKB/PR-26/CON/9876')
            ->assertJsonPath('results.0.description', 'Pengadaan alat laboratorium khusus')
            ->assertJsonPath('results.0.portfolio', 'PK - LAB')
            ->assertJsonPath('results.0.receiver.name', $receiver->name)
            ->assertJsonPath('results.0.value', 'Rp 1.375.000.000')
            ->assertJsonPath('results.0.pr_date', '02 Okt 2026');
        $this->assertLessThanOrEqual(4, $queryCount, "PR finder memakai {$queryCount} query.");

        $this->actingAs($other)
            ->getJson(route('collaboration-calendar.ppbj-search', ['q' => 'laboratorium']))
            ->assertForbidden();
    }

    private function user(string $department): User
    {
        return User::factory()->create([
            'department' => $department,
            'role' => 'user',
            'is_active' => true,
        ]);
    }

    private function createEvent(User $creator, array $extra = []): CollaborationEvent
    {
        return CollaborationEvent::create(array_merge([
            'title' => 'Sinkronisasi PR',
            'description' => 'Agenda kolaborasi lintas role.',
            'starts_at' => today()->setHour(9),
            'ends_at' => today()->setHour(10),
            'all_day' => false,
            'priority' => 'normal',
            'status' => 'planned',
            'audience' => 'all',
            'creator_id' => $creator->id,
            'version' => 1,
        ], $extra));
    }

    private function eventPayload(array $extra = []): array
    {
        return array_merge([
            'title' => 'Agenda Diperbarui',
            'description' => 'Catatan baru.',
            'starts_at' => today()->setHour(9)->toIso8601String(),
            'ends_at' => today()->setHour(10)->toIso8601String(),
            'all_day' => false,
            'priority' => 'normal',
            'status' => 'planned',
            'audience' => 'all',
            'assignee_id' => null,
            'ppbj_no' => null,
            'version' => 1,
        ], $extra);
    }

    private function ppbj(array $extra = []): Ppbj
    {
        return Ppbj::query()->create(array_merge([
            'ppbj_no' => 'PKB/PR-26/CON/0999',
            'tgl_ppbj' => today(),
            'uraian' => 'Pengadaan kolaboratif kalender',
            'buyer' => 'Nazar',
            'total_sebelum_ppn' => 10_000_000,
            'status' => 'ACTIVE',
        ], $extra));
    }
}
