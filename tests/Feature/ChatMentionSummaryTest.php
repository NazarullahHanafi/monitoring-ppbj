<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ChatMentionSummaryTest extends TestCase
{
    use RefreshDatabase;

    public function test_badge_counts_direct_and_all_mentions_without_opening_chat(): void
    {
        $target = User::factory()->create();
        $sender = User::factory()->create();
        $other = User::factory()->create();

        $this->insertMessage($sender, [['id' => $target->id, 'name' => $target->name]]);
        $this->insertMessage($sender, [['id' => 'all', 'name' => 'Semua']]);
        $this->insertMessage($sender, [['id' => $other->id, 'name' => $other->name]]);
        $this->insertMessage($target, [['id' => 'all', 'name' => 'Semua']]);

        $this->actingAs($target)
            ->getJson('/chat/mentions/unread')
            ->assertOk()
            ->assertJson([
                'count' => 2,
                'unread_count' => 3,
            ])
            ->assertJsonPath('latest_message.user_id', $sender->id);
    }

    public function test_read_mentions_are_removed_from_badge_count(): void
    {
        $target = User::factory()->create();
        $sender = User::factory()->create();
        $messageId = $this->insertMessage($sender, [
            ['id' => $target->id, 'name' => $target->name],
        ]);

        $this->actingAs($target)
            ->getJson('/chat/mentions/unread')
            ->assertOk()
            ->assertJson(['count' => 1]);

        $this->postJson('/chat/read', ['message_ids' => [$messageId]])
            ->assertOk();

        $this->getJson('/chat/mentions/unread')
            ->assertOk()
            ->assertJson([
                'count' => 0,
                'unread_count' => 0,
                'latest_message' => null,
            ]);
    }

    public function test_mention_summary_requires_authentication(): void
    {
        $this->getJson('/chat/mentions/unread')->assertUnauthorized();
    }

    private function insertMessage(User $sender, array $mentions): int
    {
        return DB::table('chat_messages')->insertGetId([
            'user_id' => $sender->id,
            'user_name' => $sender->name,
            'user_initials' => 'TS',
            'user_color' => '#6366f1',
            'message' => 'Pesan mention',
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode($mentions),
            'created_at' => now(),
        ]);
    }
}
