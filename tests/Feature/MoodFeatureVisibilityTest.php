<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class MoodFeatureVisibilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_mood_is_hidden_and_disabled_only_for_nazar_superadmin_umum(): void
    {
        $nazar = User::factory()->create([
            'name' => 'Nazar',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        Cache::put('presence:mood:'.$nazar->id, '😄', now()->addMinutes(10));

        $this->assertFalse($nazar->shouldDisplayMoodFeature());

        $this->actingAs($nazar)
            ->get('/dashboard')
            ->assertOk()
            ->assertDontSee('id="myMoodFloat"', false)
            ->assertDontSee('id="btnChangeMood"', false)
            ->assertSee('moodEnabled: false', false);

        $this->actingAs($nazar)
            ->postJson('/presence/mood', ['mood' => '😄'])
            ->assertOk()
            ->assertJsonPath('mood', null)
            ->assertJsonPath('disabled', true);

        $this->actingAs($nazar)
            ->postJson('/emoji/mood', ['mood' => '😄'])
            ->assertOk()
            ->assertJsonPath('mood', null)
            ->assertJsonPath('disabled', true);

        $this->assertNull(Cache::get('presence:mood:'.$nazar->id));
    }

    public function test_other_accounts_keep_the_mood_feature(): void
    {
        $otherSuperadmin = User::factory()->create([
            'name' => 'Admin Umum',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $this->assertTrue($otherSuperadmin->shouldDisplayMoodFeature());

        $this->actingAs($otherSuperadmin)
            ->get('/dashboard')
            ->assertOk()
            ->assertSee('id="myMoodFloat"', false)
            ->assertSee('id="btnChangeMood"', false)
            ->assertSee('moodEnabled: true', false);

        $this->actingAs($otherSuperadmin)
            ->postJson('/presence/mood', ['mood' => '😄'])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('mood', '😄');
    }

    public function test_nazar_with_a_different_role_is_not_excluded(): void
    {
        $regularNazar = User::factory()->create([
            'name' => 'Nazar',
            'role' => 'user',
            'department' => 'umum',
        ]);

        $this->assertTrue($regularNazar->shouldDisplayMoodFeature());
    }
}
