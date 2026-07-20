<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ChatHistoryEditingSharingTest extends TestCase
{
    use RefreshDatabase;

    public function test_messages_are_paginated_and_older_history_can_be_loaded(): void
    {
        $user = User::factory()->create();

        for ($number = 1; $number <= 65; $number++) {
            $this->insertMessage($user, 'Pesan '.$number, now()->addSeconds($number));
        }

        $latest = $this->actingAs($user)->getJson('/chat/messages')
            ->assertOk()
            ->assertJsonCount(40, 'messages')
            ->assertJsonPath('has_more', true)
            ->json();

        $this->assertSame('Pesan 26', $latest['messages'][0]['message']);
        $this->assertSame('Pesan 65', $latest['messages'][39]['message']);

        $older = $this->getJson('/chat/messages?before='.$latest['oldest_id'])
            ->assertOk()
            ->assertJsonCount(25, 'messages')
            ->assertJsonPath('has_more', false)
            ->json();

        $this->assertSame('Pesan 1', $older['messages'][0]['message']);
        $this->assertSame('Pesan 25', $older['messages'][24]['message']);
    }

    public function test_sending_new_messages_does_not_delete_old_history(): void
    {
        $user = User::factory()->create();

        for ($number = 1; $number <= 200; $number++) {
            $this->insertMessage($user, 'Arsip '.$number);
        }

        $this->actingAs($user)
            ->postJson('/chat/send', ['message' => 'Pesan ke-201'])
            ->assertCreated();

        $this->assertSame(201, DB::table('chat_messages')->count());
    }

    public function test_sender_can_edit_a_recent_message(): void
    {
        $sender = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Pesan awal');

        $this->actingAs($sender)
            ->patchJson('/chat/'.$messageId, ['message' => 'Pesan yang diperbarui'])
            ->assertOk()
            ->assertJsonPath('message.message', 'Pesan yang diperbarui')
            ->assertJsonPath('message.can_edit', true)
            ->assertJsonPath('message.edited_at', fn ($value) => is_string($value) && $value !== '');

        $this->assertDatabaseHas('chat_messages', [
            'id' => $messageId,
            'message' => 'Pesan yang diperbarui',
        ]);
    }

    public function test_other_users_and_expired_messages_cannot_be_edited(): void
    {
        $sender = User::factory()->create();
        $other = User::factory()->create();
        $recentId = $this->insertMessage($sender, 'Milik pengirim');
        $expiredId = $this->insertMessage($sender, 'Sudah lama', now()->subMinutes(16));

        $this->actingAs($other)
            ->patchJson('/chat/'.$recentId, ['message' => 'Diubah orang lain'])
            ->assertForbidden();

        $this->actingAs($sender)
            ->patchJson('/chat/'.$expiredId, ['message' => 'Terlambat diubah'])
            ->assertForbidden();
    }

    public function test_sender_can_delete_recent_message_before_six_hour_window(): void
    {
        $sender = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Pesan boleh dihapus', now()->subHours(5));

        $this->actingAs($sender)
            ->deleteJson('/chat/'.$messageId)
            ->assertOk()
            ->assertJsonPath('deleted', $messageId);

        $this->assertDatabaseMissing('chat_messages', ['id' => $messageId]);
    }

    public function test_sender_cannot_delete_message_after_six_hour_window(): void
    {
        $sender = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Pesan sudah lama', now()->subHours(7));

        $this->actingAs($sender)
            ->deleteJson('/chat/'.$messageId)
            ->assertForbidden()
            ->assertJsonPath('error', 'Batas waktu hapus pesan 6 jam sudah berakhir');

        $this->assertDatabaseHas('chat_messages', ['id' => $messageId]);

        $this->getJson('/chat/messages')
            ->assertOk()
            ->assertJsonPath('messages.0.can_delete', false);
    }

    public function test_receiver_can_hide_incoming_message_without_deleting_it_for_sender(): void
    {
        $sender = User::factory()->create();
        $receiver = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Pesan masuk untuk penerima');

        $this->actingAs($receiver)
            ->getJson('/chat/messages')
            ->assertOk()
            ->assertJsonPath('messages.0.can_delete', true);

        $this->actingAs($receiver)
            ->deleteJson('/chat/'.$messageId)
            ->assertOk()
            ->assertJsonPath('deleted', $messageId)
            ->assertJsonPath('mode', 'for_me');

        $this->assertDatabaseHas('chat_messages', ['id' => $messageId]);
        $this->assertDatabaseHas('chat_message_deletions', [
            'message_id' => $messageId,
            'user_id' => $receiver->id,
        ]);

        $this->actingAs($receiver)
            ->getJson('/chat/messages')
            ->assertOk()
            ->assertJsonCount(0, 'messages');

        $this->actingAs($sender)
            ->getJson('/chat/messages')
            ->assertOk()
            ->assertJsonPath('messages.0.id', $messageId);
    }

    public function test_authorized_departments_can_share_pr_spph_and_sp_snapshots(): void
    {
        $operasional = User::factory()->create(['department' => 'operasional']);
        $umum = User::factory()->create(['department' => 'umum']);
        $prId = DB::table('torprs')->insertGetId([
            'tujuan_pengadaan' => 'Pengadaan alat inspeksi',
            'portofolio' => 'Peralatan',
            'nomor_pr' => 'PR-001',
            'tanggal_pr' => '2026-06-22',
            'jumlah_pr' => 15000000,
            'created_by_user_id' => $operasional->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $spphId = DB::table('spphs')->insertGetId([
            'nomor_spph' => 'SPPH-001',
            'sequence_number' => 1,
            'tanggal' => '2026-06-22',
            'nomor_pr' => 'PR-SPPH-001',
            'nama_vendor' => 'Vendor Satu',
            'deskripsi_pengadaan' => 'Permintaan harga alat inspeksi',
            'pic' => 'Nazar',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $spId = DB::table('sps')->insertGetId([
            'nomor_sp' => 'SP-001',
            'sequence_number' => 1,
            'tanggal_sp' => '2026-06-22',
            'nilai_sp' => 14500000,
            'nomor_pr' => 'PR-SP-001',
            'nilai_pr' => 15000000,
            'nama_vendor' => 'Vendor Satu',
            'deskripsi_pengadaan' => 'Pesanan alat inspeksi',
            'pic' => 'Nazar',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($operasional)
            ->postJson('/chat/share', ['type' => 'pr', 'id' => $prId])
            ->assertCreated()
            ->assertJsonPath('message.share_data_parsed.label', 'PR')
            ->assertJsonPath('message.share_data_parsed.number', 'PR-001');

        $this->actingAs($umum)
            ->postJson('/chat/share', ['type' => 'spph', 'id' => $spphId])
            ->assertCreated()
            ->assertJsonPath('message.share_data_parsed.label', 'SPPH');

        $this->postJson('/chat/share', ['type' => 'sp', 'id' => $spId])
            ->assertCreated()
            ->assertJsonPath('message.share_data_parsed.label', 'SP')
            ->assertJsonPath('message.share_data_parsed.fields.2.value', 'Rp 14.500.000');

        $this->assertDatabaseHas('chat_messages', ['share_type' => 'pr', 'share_id' => $prId]);
        $this->assertDatabaseHas('chat_messages', ['share_type' => 'spph', 'share_id' => $spphId]);
        $this->assertDatabaseHas('chat_messages', ['share_type' => 'sp', 'share_id' => $spId]);
    }

    public function test_users_cannot_share_records_outside_their_department(): void
    {
        $umum = User::factory()->create(['department' => 'umum']);

        $this->actingAs($umum)
            ->postJson('/chat/share', ['type' => 'pr', 'id' => 1])
            ->assertForbidden();
    }

    public function test_team_chat_can_search_and_send_pr_ppbj_followups(): void
    {
        $user = User::factory()->create(['department' => 'umum']);
        $prId = DB::table('torprs')->insertGetId([
            'tujuan_pengadaan' => 'Pengadaan jasa kalibrasi tahunan',
            'portofolio' => 'CON',
            'nomor_pr' => 'PKB/PR-26/CON/0401',
            'tanggal_pr' => '2026-07-01',
            'jumlah_pr' => 125000000,
            'tgl_ttd_kabid_pr' => '2026-07-02',
            'created_by_user_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('ppbj')->insert([
            'ppbj_no' => 'PKB/PR-26/CON/0401',
            'tgl_ppbj' => '2026-07-01',
            'uraian' => 'Monitoring pengadaan jasa kalibrasi',
            'portofolio' => 'CON',
            'buyer' => 'Nazar',
            'penyedia_eksternal' => 'Vendor Kalibrasi',
            'metode_pengadaan' => 'Penunjukan Langsung',
            'total_sebelum_ppn' => 125000000,
            'progres' => 45,
            'status' => 'ACTIVE',
            'status_sla' => 'On Progress',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user)
            ->getJson('/chat/followups?q=0401')
            ->assertOk()
            ->assertJsonFragment(['number' => 'PKB/PR-26/CON/0401'])
            ->assertJsonFragment(['status' => 'Menunggu TTD Kacab']);

        $this->postJson('/chat/followup', ['type' => 'pr', 'id' => $prId])
            ->assertCreated()
            ->assertJsonPath('message.share_type', 'followup_pr')
            ->assertJsonPath('message.share_data_parsed.label', 'FOLLOW UP PR')
            ->assertJsonPath('message.share_data_parsed.number', 'PKB/PR-26/CON/0401');

        $this->assertDatabaseHas('chat_messages', [
            'share_type' => 'followup_pr',
            'share_id' => $prId,
        ]);
    }

    public function test_layout_exposes_history_edit_and_share_controls(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/account')
            ->assertOk()
            ->assertSee('id="ctxEdit"', false)
            ->assertSee('id="cpFullscreenBtn"', false)
            ->assertSee('id="cpMinimizeBtn"', false)
            ->assertSee('chat-panel.fullscreen', false)
            ->assertSee('chat-panel.minimized', false)
            ->assertSee('Muat pesan lebih lama')
            ->assertSee('shareRecordToChat', false)
            ->assertSee('/@ PR');
    }

    private function insertMessage(User $sender, string $message, $createdAt = null): int
    {
        return DB::table('chat_messages')->insertGetId([
            'user_id' => $sender->id,
            'user_name' => $sender->name,
            'user_initials' => 'TS',
            'user_color' => '#6366f1',
            'message' => $message,
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => null,
            'created_at' => $createdAt ?? now(),
        ]);
    }
}
