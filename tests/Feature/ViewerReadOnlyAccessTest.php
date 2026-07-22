<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class ViewerReadOnlyAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_viewer_can_save_required_daily_mood(): void
    {
        $viewer = User::factory()->create([
            'role' => 'viewer',
            'department' => 'umum',
        ]);

        $this->actingAs($viewer)
            ->postJson('/presence/mood', ['mood' => '😄'])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('mood', '😄');

        $this->assertSame('😄', Cache::get('presence:mood:'.$viewer->id));
    }

    public function test_viewer_cannot_send_or_quick_mood_chat(): void
    {
        $viewer = User::factory()->create([
            'role' => 'viewer',
            'department' => 'umum',
        ]);
        $target = User::factory()->create([
            'role' => 'user',
            'department' => 'umum',
        ]);

        $this->actingAs($viewer)
            ->postJson('/chat/send', ['message' => 'Viewer mencoba kirim'])
            ->assertForbidden()
            ->assertJsonPath('success', false);

        $this->actingAs($viewer)
            ->postJson('/chat/quick-mood', [
                'target_user_id' => $target->id,
                'mood' => '😴',
            ])
            ->assertForbidden()
            ->assertJsonPath('success', false);
    }

    public function test_viewer_layout_contains_mandatory_mood_modal_rules(): void
    {
        $viewer = User::factory()->create([
            'role' => 'viewer',
            'department' => 'umum',
        ]);

        $this->actingAs($viewer)
            ->get('/dashboard')
            ->assertOk()
            ->assertSee('Mode Viewer')
            ->assertSee('Mood check dulu')
            ->assertSee('allowOutsideClick: false', false)
            ->assertSee('allowEscapeKey: false', false)
            ->assertSee('showCloseButton: false', false);
    }
}
