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
            ->assertSee('assets/app/app-shell.js', false);

        $appShell = file_get_contents(public_path('assets/app/app-shell.js'));
        $this->assertStringContainsString('Mood check dulu', $appShell);
        $this->assertStringContainsString('allowOutsideClick: false', $appShell);
        $this->assertStringContainsString('allowEscapeKey: false', $appShell);
        $this->assertStringContainsString('showCloseButton: false', $appShell);
    }
}
