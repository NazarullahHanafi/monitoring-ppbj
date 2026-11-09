<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeTutorial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficeTutorialTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['virtual_office.tutorial_required' => true]);
    }

    private function person(array $data = []): User
    {
        return User::factory()->create($data + ['department' => 'umum', 'role' => 'user', 'is_active' => true]);
    }

    public function test_first_navigation_requires_the_guide_and_resumes_without_loading_the_game(): void
    {
        $user = $this->person();
        $this->actingAs($user)->get(route('dashboard'))->assertRedirect(route('virtual-office.tutorial.show'));
        $this->get(route('virtual-office.index'))->assertRedirect(route('virtual-office.tutorial.show'));
        $this->get(route('virtual-office.tutorial.show'))->assertOk()->assertSee('PERKENALAN SATU KALI')
            ->assertSee('Kantor Anda, dalam ruang baru.')->assertDontSee('voScene')->assertDontSee('virtual-office-scene')->assertDontSee('app-shell.js');
        $this->post(route('virtual-office.tutorial.advance'), ['step' => 0])->assertRedirect(route('virtual-office.tutorial.show'));
        $this->get(route('virtual-office.tutorial.show', ['step' => 6]))->assertOk()->assertSee('Anda yang memegang kendali.')->assertDontSee('Semua siap. Selamat datang.');
        $this->assertDatabaseHas('virtual_office_tutorials', ['user_id' => $user->id, 'step' => 1, 'completed_at' => null]);
    }

    public function test_completion_is_per_account_survives_cache_and_sessions_and_replay_never_resets_it(): void
    {
        $user = $this->person();
        $other = $this->person();
        $this->actingAs($user);
        for ($step = 0; $step < 7; $step++) $this->post(route('virtual-office.tutorial.advance'), ['step' => $step])->assertRedirect(route($step === 6 ? 'virtual-office.index' : 'virtual-office.tutorial.show'));
        $completed = app(VirtualOfficeTutorial::class)->progress($user)->completed_at;
        $this->assertNotNull($completed);
        Cache::flush();$this->flushSession();$this->actingAs($user);
        $this->get(route('virtual-office.index'))->assertOk()->assertSee('Lihat tutorial')->assertSee('vo-tutorial-link');
        $this->get(route('virtual-office.tutorial.show', ['step' => 2]))->assertOk()->assertSee('Pengadaan dari ruang Anda')->assertSee('Kembali ke kantor');
        $this->post(route('virtual-office.tutorial.advance'), ['step' => 0])->assertRedirect(route('virtual-office.index'));
        $this->assertSame($completed, app(VirtualOfficeTutorial::class)->progress($user)->completed_at);
        $this->assertSame(7, (int) app(VirtualOfficeTutorial::class)->progress($user)->step);
        $this->actingAs($other)->get(route('virtual-office.index'))->assertRedirect(route('virtual-office.tutorial.show'));
        $this->assertDatabaseCount('virtual_office_tutorials', 1);
        $this->assertFalse(app(VirtualOfficeTutorial::class)->completed($other));
    }

    public function test_steps_cannot_be_skipped_or_saved_for_another_account_and_repeated_clicks_are_idempotent(): void
    {
        $user = $this->person();$other = $this->person();$this->actingAs($user);
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 6])->assertStatus(409);
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 0, 'user_id' => $other->id])->assertUnprocessable();
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 7])->assertUnprocessable();
        $this->post(route('virtual-office.tutorial.advance'), ['step' => 0])->assertRedirect();
        $this->post(route('virtual-office.tutorial.advance'), ['step' => 0])->assertRedirect();
        $this->assertDatabaseHas('virtual_office_tutorials', ['user_id' => $user->id, 'step' => 1, 'completed_at' => null]);
        $this->assertDatabaseMissing('virtual_office_tutorials', ['user_id' => $other->id]);
    }

    public function test_guide_matches_department_and_viewer_without_granting_business_write_access(): void
    {
        foreach ([['umum', 'user', 'Pengadaan dari ruang Anda'], ['operasional', 'user', 'TOR / PR dari ruang Anda'], ['umum', 'viewer', 'Ruang kerja untuk akses baca']] as [$department, $role, $title]) {
            $user = $this->person(compact('department', 'role'));$this->actingAs($user);
            for ($i = 0; $i < 2; $i++) $this->post(route('virtual-office.tutorial.advance'), ['step' => $i])->assertRedirect();
            $this->get(route('virtual-office.tutorial.show'))->assertOk()->assertSee($title);
        }
        Cache::put('simonpr:read_only_mode', true, 300);
        $this->post(route('virtual-office.tutorial.advance'), ['step' => 2])->assertRedirect();
        $this->postJson(route('ppbj.store'), [])->assertForbidden();
        $this->assertDatabaseCount('ppbj', 0);
    }

    public function test_guests_inactive_and_other_departments_cannot_advance_the_tutorial(): void
    {
        $this->get(route('virtual-office.tutorial.show'))->assertRedirect(route('login'));
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 0])->assertUnauthorized();
        $this->actingAs($this->person(['department' => 'lainnya']))->get(route('virtual-office.tutorial.show'))->assertForbidden();
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 0])->assertForbidden();
        $this->actingAs($this->person(['is_active' => false]))->postJson(route('virtual-office.tutorial.advance'), ['step' => 0])->assertStatus(423);
        $this->assertDatabaseCount('virtual_office_tutorials', 0);
    }

    public function test_gate_leaves_polling_saves_security_and_exports_untouched(): void
    {
        $user = $this->person();$this->actingAs($user);
        $this->getJson(route('virtual-office.presence'))->assertOk();
        $this->get(route('profile.edit'))->assertOk();
        $this->getJson(route('virtual-office.index'))->assertOk();
        $this->postJson(route('virtual-office.avatar'), [])->assertUnprocessable();
        $this->get(route('ppbj.template'))->assertOk();
        $this->assertDatabaseCount('virtual_office_tutorials', 0);
    }

    public function test_completed_navigation_uses_a_cached_hint_but_database_remains_authoritative_after_cache_loss(): void
    {
        $user = $this->person();$service = app(VirtualOfficeTutorial::class);
        for ($i = 0; $i < 7; $i++) $service->advance($user, $i);
        DB::enableQueryLog();DB::flushQueryLog();
        $this->assertTrue($service->completed($user));
        $this->assertCount(0, DB::getQueryLog());
        DB::disableQueryLog();Cache::flush();
        $this->assertTrue($service->completed($user));
    }
}
