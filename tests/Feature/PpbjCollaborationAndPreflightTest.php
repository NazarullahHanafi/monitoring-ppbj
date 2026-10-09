<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class PpbjCollaborationAndPreflightTest extends TestCase
{
    use RefreshDatabase;

    public function test_note_can_mention_cross_department_user_and_is_mirrored_to_team_chat(): void
    {
        $author = $this->user('umum', 'superadmin', 'Umum Author');
        $target = $this->user('operasional', 'admin', 'Operational Target');
        $ppbj = Ppbj::create(['ppbj_no' => 'PKB/PR-26/CON/TEST-01', 'uraian' => 'Pengadaan uji kolaborasi']);

        $this->actingAs($author)
            ->postJson("/ppbj-collaboration/{$ppbj->id}", [
                'body' => 'Mohon cek dokumen teknis sebelum proses dilanjutkan.',
                'mentions' => [$target->id],
            ])
            ->assertCreated()
            ->assertJsonPath('note.user_name', 'Umum Author')
            ->assertJsonPath('note.mentions.0.id', $target->id);

        $noteId = (int) DB::table('ppbj_collaboration_notes')->value('id');
        $this->assertDatabaseHas('ppbj_note_mentions', [
            'note_id' => $noteId,
            'user_id' => $target->id,
            'read_at' => null,
        ]);
        $this->assertDatabaseHas('chat_messages', [
            'user_id' => $author->id,
            'share_type' => 'ppbj',
            'share_id' => $ppbj->id,
        ]);

        $this->actingAs($target)
            ->getJson("/ppbj-collaboration/{$ppbj->id}")
            ->assertOk()
            ->assertJsonCount(1, 'notes');

        $this->assertDatabaseMissing('ppbj_note_mentions', [
            'note_id' => $noteId,
            'user_id' => $target->id,
            'read_at' => null,
        ]);
    }

    public function test_user_cannot_modify_another_users_note(): void
    {
        $author = $this->user('umum', 'admin', 'Author');
        $other = $this->user('operasional', 'admin', 'Other');
        $ppbj = Ppbj::create(['ppbj_no' => 'PKB/PR-26/CON/TEST-02']);
        $noteId = DB::table('ppbj_collaboration_notes')->insertGetId([
            'ppbj_id' => $ppbj->id,
            'user_id' => $author->id,
            'author_name' => $author->name,
            'author_department' => $author->department,
            'author_role' => $author->role,
            'body' => 'Catatan milik author.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($other)
            ->patchJson("/ppbj-collaboration/notes/{$noteId}", ['body' => 'Diubah pihak lain'])
            ->assertForbidden();
    }

    public function test_preflight_reports_detailed_blockers_and_store_rechecks_them(): void
    {
        $user = $this->user('umum', 'superadmin', 'Validator');
        $payload = [
            'ppbj_no' => 'PKB/PR-26/CON/TEST-03',
            'uraian' => 'Pengadaan validasi',
            'total_sebelum_ppn' => '1,000,000',
            'tgl_spk' => '2026-10-10',
            'promised_date' => '2026-10-09',
        ];

        $this->actingAs($user)
            ->postJson('/ppbj/preflight', $payload)
            ->assertOk()
            ->assertJsonPath('status', 'blocked')
            ->assertJsonPath('counts.error', 1)
            ->assertJsonFragment(['field' => 'promised_date']);

        $this->actingAs($user)
            ->postJson('/ppbj', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('promised_date');
    }

    private function user(string $department, string $role, string $name): User
    {
        return User::factory()->create([
            'name' => $name,
            'department' => $department,
            'role' => $role,
            'is_active' => true,
        ]);
    }
}
