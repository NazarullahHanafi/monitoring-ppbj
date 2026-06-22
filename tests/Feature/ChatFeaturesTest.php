<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ChatFeaturesTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_add_change_and_remove_a_reaction(): void
    {
        $sender = User::factory()->create();
        $reactor = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Mohon diperiksa');

        $this->actingAs($reactor)
            ->postJson("/chat/{$messageId}/reaction", ['emoji' => '👍'])
            ->assertOk()
            ->assertJsonPath('status', 'added')
            ->assertJsonPath('reactions.0.emoji', '👍')
            ->assertJsonPath('reactions.0.count', 1)
            ->assertJsonPath('reactions.0.mine', true);

        $this->postJson("/chat/{$messageId}/reaction", ['emoji' => '❤️'])
            ->assertOk()
            ->assertJsonPath('status', 'changed')
            ->assertJsonPath('reactions.0.emoji', '❤️');

        $this->postJson("/chat/{$messageId}/reaction", ['emoji' => '❤️'])
            ->assertOk()
            ->assertJsonPath('status', 'removed')
            ->assertJsonCount(0, 'reactions');

        $this->assertDatabaseMissing('chat_reactions', [
            'message_id' => $messageId,
            'user_id' => $reactor->id,
        ]);
    }

    public function test_reaction_summary_combines_users_and_marks_my_reaction(): void
    {
        $sender = User::factory()->create();
        $first = User::factory()->create();
        $second = User::factory()->create();
        $messageId = $this->insertMessage($sender, 'Setuju?');

        $this->actingAs($first)->postJson("/chat/{$messageId}/reaction", ['emoji' => '👍'])->assertOk();
        $this->actingAs($second)->postJson("/chat/{$messageId}/reaction", ['emoji' => '👍'])->assertOk();

        $this->getJson("/chat/reactions?message_ids={$messageId}")
            ->assertOk()
            ->assertJsonPath("reactions.{$messageId}.0.emoji", '👍')
            ->assertJsonPath("reactions.{$messageId}.0.count", 2)
            ->assertJsonPath("reactions.{$messageId}.0.mine", true);
    }

    public function test_search_finds_message_text_and_sender_name(): void
    {
        $viewer = User::factory()->create();
        $sender = User::factory()->create(['name' => 'Budi Pengadaan']);
        $other = User::factory()->create();

        $this->insertMessage($sender, 'Dokumen kontrak sudah selesai');
        $this->insertMessage($other, 'Pesan yang tidak cocok');

        $this->actingAs($viewer)
            ->getJson('/chat/search?q=kontrak')
            ->assertOk()
            ->assertJsonPath('count', 1)
            ->assertJsonPath('messages.0.user_name', 'Budi Pengadaan')
            ->assertJsonPath('messages.0.message', 'Dokumen kontrak sudah selesai');

        $this->getJson('/chat/search?q=Budi')
            ->assertOk()
            ->assertJsonPath('count', 1);
    }

    public function test_chat_features_require_authentication_and_validate_input(): void
    {
        $user = User::factory()->create();
        $messageId = $this->insertMessage($user, 'Pesan aman');

        $this->getJson('/chat/search?q=aman')->assertUnauthorized();
        $this->postJson("/chat/{$messageId}/reaction", ['emoji' => '👍'])->assertUnauthorized();

        $this->actingAs($user)
            ->getJson('/chat/search?q=a')
            ->assertUnprocessable();
        $this->postJson("/chat/{$messageId}/reaction", ['emoji' => '🚀'])
            ->assertUnprocessable();
    }

    public function test_authenticated_layout_contains_chat_feature_controls(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/account')
            ->assertOk()
            ->assertSee('id="cpSearchBtn"', false)
            ->assertSee('id="cpNotifyBtn"', false)
            ->assertSee('id="ctxReactions"', false)
            ->assertSee('id="cpSearchPanel"', false);
    }

    private function insertMessage(User $sender, string $message): int
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
            'created_at' => now(),
        ]);
    }
}
