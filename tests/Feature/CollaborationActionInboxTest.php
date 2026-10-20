<?php

namespace Tests\Feature;

use App\Models\CollaborationHandover;
use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CollaborationActionInboxTest extends TestCase
{
    use RefreshDatabase;

    public function test_both_departments_can_open_inbox_but_unknown_department_cannot(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');
        $other = $this->user('finance');

        $this->actingAs($umum)
            ->get(route('collaboration-inbox.index'))
            ->assertOk()
            ->assertSee('Action Inbox')
            ->assertSee('Buat Serah Terima')
            ->assertSee('SMART ACTION RADAR');

        $this->actingAs($operasional)
            ->get(route('collaboration-inbox.index'))
            ->assertOk()
            ->assertSee('Action Inbox')
            ->assertSee('Umum');

        $this->actingAs($other)
            ->get(route('collaboration-inbox.index'))
            ->assertForbidden();
    }

    public function test_handover_is_cross_role_validated_audited_and_duplicate_safe(): void
    {
        $creator = $this->user('umum');
        $assignee = $this->user('operasional');
        $wrongAssignee = $this->user('umum');
        $ppbj = $this->ppbj();

        $payload = [
            'ppbj_id' => $ppbj->id,
            'title' => 'Verifikasi barang datang',
            'description' => 'Konfirmasi kesesuaian barang dengan dokumen penerimaan.',
            'priority' => 'high',
            'due_at' => now()->addDays(2)->format('Y-m-d\TH:i'),
            'assigned_to_user_id' => $assignee->id,
            'checklist_items' => ['Foto barang', 'Berita acara'],
        ];

        $this->actingAs($creator)
            ->post(route('collaboration-inbox.store'), $payload)
            ->assertRedirect(route('collaboration-inbox.index', ['direction' => 'outbox']));

        $handover = CollaborationHandover::query()->firstOrFail();
        $this->assertSame('umum', $handover->from_department);
        $this->assertSame('operasional', $handover->to_department);
        $this->assertSame($assignee->id, $handover->assigned_to_user_id);
        $this->assertCount(2, $handover->checklist);
        $this->assertDatabaseHas('activity_logs', [
            'model_type' => CollaborationHandover::class,
            'model_id' => $handover->id,
            'action' => 'handover_created',
        ]);

        $this->actingAs($creator)
            ->from(route('collaboration-inbox.index'))
            ->post(route('collaboration-inbox.store'), $payload)
            ->assertSessionHasErrors('ppbj_id');

        $this->actingAs($creator)
            ->from(route('collaboration-inbox.index'))
            ->post(route('collaboration-inbox.store'), array_merge($payload, [
                'ppbj_id' => $this->ppbj(['ppbj_no' => 'PKB/PR-26/CON/INBOX-02'])->id,
                'assigned_to_user_id' => $wrongAssignee->id,
            ]))
            ->assertSessionHasErrors('assigned_to_user_id');
    }

    public function test_receiver_flow_requires_assignee_complete_checklist_and_current_version(): void
    {
        $creator = $this->user('umum');
        $assignee = $this->user('operasional');
        $otherReceiver = $this->user('operasional');
        $handover = $this->handover($creator, $assignee);

        $this->actingAs($otherReceiver)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'acknowledge', 'version' => 1,
            ])
            ->assertForbidden();

        $this->actingAs($assignee)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'acknowledge', 'version' => 1,
            ])
            ->assertRedirect();

        $handover->refresh();
        $this->assertSame('acknowledged', $handover->status);
        $this->assertSame(2, $handover->version);

        $this->actingAs($assignee)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'complete', 'version' => 1,
            ])
            ->assertStatus(409);

        $this->actingAs($assignee)
            ->from(route('collaboration-inbox.index'))
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'complete', 'version' => 2,
            ])
            ->assertSessionHasErrors('action');

        $this->actingAs($assignee)
            ->patch(route('collaboration-inbox.checklist', $handover), [
                'version' => 2, 'checked' => [1, 2],
            ])
            ->assertRedirect();

        $this->actingAs($assignee)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'complete', 'version' => 3,
                'note' => 'Bukti lengkap dan pekerjaan diterima.',
            ])
            ->assertRedirect();

        $handover->refresh();
        $this->assertSame('completed', $handover->status);
        $this->assertSame($assignee->id, $handover->completed_by_user_id);
        $this->assertNotNull($handover->completed_at);
        $this->assertDatabaseHas('activity_logs', [
            'model_id' => $handover->id,
            'action' => 'handover_complete',
        ]);
    }

    public function test_return_resend_and_cancel_are_limited_to_the_correct_sides(): void
    {
        $creator = $this->user('umum');
        $sourcePeer = $this->user('umum');
        $sourceAdmin = $this->user('umum', 'superadmin');
        $receiver = $this->user('operasional');
        $handover = $this->handover($creator, $receiver);

        $this->actingAs($receiver)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'return', 'version' => 1, 'note' => 'Foto belum tersedia.',
            ])
            ->assertRedirect();

        $this->actingAs($sourcePeer)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'resend', 'version' => 2, 'note' => 'Sudah dilengkapi.',
            ])
            ->assertForbidden();

        $this->actingAs($creator)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'resend', 'version' => 2, 'note' => 'Sudah dilengkapi.',
            ])
            ->assertRedirect();

        $this->actingAs($sourceAdmin)
            ->patch(route('collaboration-inbox.status', $handover), [
                'action' => 'cancel', 'version' => 3,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('collaboration_handovers', [
            'id' => $handover->id,
            'status' => 'cancelled',
            'version' => 4,
        ]);
    }

    public function test_inbox_query_budget_stays_bounded_when_records_grow(): void
    {
        $umum = $this->user('umum');
        $operasional = $this->user('operasional');
        $ppbj = $this->ppbj();

        for ($index = 1; $index <= 30; $index++) {
            CollaborationHandover::query()->create([
                'title' => "Tugas kolaborasi {$index}",
                'description' => 'Pengujian query konstan.',
                'from_department' => 'operasional',
                'to_department' => 'umum',
                'priority' => $index % 3 === 0 ? 'critical' : 'normal',
                'status' => 'sent',
                'created_by_user_id' => $operasional->id,
                'ppbj_id' => $ppbj->id,
            ]);
        }

        DB::flushQueryLog();
        DB::enableQueryLog();
        $response = $this->actingAs($umum)->get(route('collaboration-inbox.index'));
        $queryCount = count(DB::getQueryLog());
        DB::disableQueryLog();

        $response->assertOk()->assertSee('Tugas kolaborasi 30');
        $this->assertLessThanOrEqual(18, $queryCount, "Action Inbox memakai {$queryCount} query.");
    }

    public function test_frontend_assets_are_event_driven_and_theme_complete(): void
    {
        $script = file_get_contents(public_path('assets/collaboration-inbox/inbox.js'));
        $styles = file_get_contents(public_path('assets/collaboration-inbox/inbox.css'));

        $this->assertStringNotContainsString('setInterval(', $script);
        $this->assertStringContainsString('AbortController', $script);
        $this->assertStringContainsString('420', $script);
        $this->assertStringContainsString('payload.meta?.shown ?? items.length', $script);
        $this->assertStringContainsString('html.dark .ci-shell', $styles);
        $this->assertStringContainsString('@media (max-width:520px)', $styles);
        $this->assertStringNotContainsString('animation: infinite', $styles);
    }

    private function user(string $department, string $role = 'user'): User
    {
        return User::factory()->create([
            'department' => $department,
            'role' => $role,
            'is_active' => true,
        ]);
    }

    private function ppbj(array $extra = []): Ppbj
    {
        return Ppbj::query()->create(array_merge([
            'ppbj_no' => 'PKB/PR-26/CON/INBOX-01',
            'tgl_ppbj' => today(),
            'uraian' => 'Pengadaan untuk serah terima lintas role',
            'buyer' => 'Buyer Uji',
            'portofolio' => 'PK - LAB',
            'total_sebelum_ppn' => 25_000_000,
            'status' => 'ACTIVE',
        ], $extra));
    }

    private function handover(User $creator, User $assignee): CollaborationHandover
    {
        return CollaborationHandover::query()->create([
            'title' => 'Konfirmasi dokumen penerimaan',
            'description' => 'Periksa bukti sebelum menyelesaikan tugas.',
            'from_department' => 'umum',
            'to_department' => 'operasional',
            'priority' => 'high',
            'status' => 'sent',
            'created_by_user_id' => $creator->id,
            'assigned_to_user_id' => $assignee->id,
            'ppbj_id' => $this->ppbj()->id,
            'checklist' => [
                ['key' => 1, 'label' => 'Foto barang', 'checked' => false],
                ['key' => 2, 'label' => 'Berita acara', 'checked' => false],
            ],
        ]);
    }
}
