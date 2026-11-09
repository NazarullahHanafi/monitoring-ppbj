<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\VirtualOfficeAvatar;
use App\Services\VirtualOfficeTutorial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class VirtualOfficeTutorialTest extends TestCase
{
    use RefreshDatabase;
    use \Tests\Concerns\PlacesOfficeAvatar;

    protected function setUp(): void { parent::setUp();config(['virtual_office.tutorial_required' => true]); }
    private function person(array $data = []): User { return User::factory()->create($data + ['department' => 'umum', 'role' => 'user', 'is_active' => true]); }
    private function advance(int $step, array $evidence) { return $this->postJson(route('virtual-office.tutorial.advance'), compact('step', 'evidence')); }
    private function changeAvatar(User $user): void
    {
        $avatar = VirtualOfficeAvatar::sanitize(null, $user->gender, $user->id);$avatar['color'] = $avatar['color'] === 'navy' ? 'rose' : 'navy';
        $this->postJson(route('virtual-office.avatar'), ['avatar' => $avatar, 'share_activity' => true, 'version' => 0])->assertOk();
    }
    private function documentData(User $user): array
    {
        return match(app(VirtualOfficeTutorial::class)->documentKind($user)) {
            'ppbj' => ['ppbj_no' => 'LATIHAN/PPBJ/001', 'tgl_ppbj' => '2026-11-09', 'uraian' => 'Peralatan kerja tim', 'total_sebelum_ppn' => 2500000],
            'pr' => ['nomor_pr' => 'LATIHAN/PR/001', 'tanggal_pr' => '2026-11-09T09:00', 'tujuan_pengadaan' => 'Perlengkapan inspeksi operasional', 'jumlah_pr' => 2500000],
            default => ['number' => 'LATIHAN/PR/001'],
        };
    }
    private function practice(User $user, int $through = 6): void
    {
        $this->actingAs($user)->postJson(route('virtual-office.tutorial.start'))->assertOk();$this->placeAvatar($user);
        $events = ['control', 'move', 'avatar', 'camera', 'hologram', 'document', 'finish'];
        for ($step = 0; $step <= $through; $step++) {
            $evidence = ['event' => $events[$step]];
            if ($step === 1) $evidence += ['distance' => 3.2, 'jump' => .6];
            if ($step === 2) $this->changeAvatar($user);
            if ($step === 3) $evidence += ['orbit' => .3, 'zoom' => .2];
            if ($step === 4) $evidence['opened'] = true;
            if ($step === 5) $evidence['token'] = $this->postJson(route('virtual-office.tutorial.document.validate'), $this->documentData($user))->assertOk()->assertJsonPath('simulated', true)->json('token');
            $this->advance($step, $evidence)->assertOk()->assertJsonPath('step', $step + 1);
        }
    }

    public function test_first_navigation_opens_the_actual_office_with_an_interactive_coach_and_no_redirect_loop(): void
    {
        $user = $this->person();$this->actingAs($user)->get(route('dashboard'))->assertRedirect(route('virtual-office.tutorial.show'));
        $this->get(route('virtual-office.tutorial.show'))->assertRedirect(route('virtual-office.index', ['tutorial' => 1]));
        $this->get(route('virtual-office.index'))->assertOk()->assertSee('voScene')->assertSee('voTutorialCoach')->assertSee('PRAKTIK LANGSUNG')->assertDontSee('Saya paham, lanjut');
        $this->postJson(route('virtual-office.tutorial.start'))->assertOk()->assertJsonPath('step', 0);
        $this->placeAvatar($user);$this->advance(0, ['event' => 'control'])->assertOk()->assertJsonPath('step', 1);
        $this->postJson(route('virtual-office.tutorial.start'))->assertJsonPath('step', 1);
        $this->assertDatabaseHas('virtual_office_tutorials', ['user_id' => $user->id, 'step' => 1, 'completed_at' => null]);
    }

    public function test_buttons_alone_cannot_complete_tasks_and_steps_cannot_be_skipped(): void
    {
        $user = $this->person();$other = $this->person();$this->actingAs($user);
        $this->postJson(route('virtual-office.tutorial.start'), ['user_id' => $other->id])->assertUnprocessable();
        $this->postJson(route('virtual-office.tutorial.start'))->assertOk();
        $this->advance(0, ['event' => 'control'])->assertStatus(409);
        $this->placeAvatar($user);$this->advance(0, ['event' => 'control'])->assertOk();
        $this->advance(0, ['event' => 'control'])->assertOk()->assertJsonPath('step', 1);
        $this->advance(6, ['event' => 'finish'])->assertStatus(409);
        $this->postJson(route('virtual-office.tutorial.advance'), ['step' => 1])->assertUnprocessable();
        $this->advance(1, ['event' => 'move', 'distance' => 1, 'jump' => .6])->assertUnprocessable();
        $this->advance(1, ['event' => 'move', 'distance' => 4, 'jump' => 0])->assertUnprocessable();
        $this->advance(1, ['event' => 'move', 'distance' => 4, 'jump' => .6])->assertOk();
        $this->advance(2, ['event' => 'avatar'])->assertUnprocessable();
        $this->assertDatabaseMissing('virtual_office_tutorials', ['user_id' => $other->id]);
    }

    public function test_actual_avatar_save_and_camera_evidence_are_required_before_hologram(): void
    {
        $user = $this->person();$this->practice($user, 1);
        $this->advance(2, ['event' => 'avatar'])->assertUnprocessable();$this->changeAvatar($user);
        $this->advance(2, ['event' => 'avatar'])->assertOk();
        $this->advance(3, ['event' => 'camera', 'orbit' => .3, 'zoom' => 0])->assertUnprocessable();
        $this->advance(3, ['event' => 'camera', 'orbit' => .3, 'zoom' => .2])->assertOk();
        $this->advance(4, ['event' => 'hologram'])->assertUnprocessable();
        $this->advance(4, ['event' => 'hologram', 'opened' => true])->assertOk();
    }

    public function test_document_practice_is_department_specific_validates_inputs_and_never_creates_business_records(): void
    {
        foreach (['umum', 'operasional'] as $department) {
            $user = $this->person(compact('department'));$this->practice($user, 4);
            $kind = $department === 'umum' ? 'ppbj' : 'pr';
            $this->get(route('virtual-office.tutorial.document'))->assertOk()->assertSee('Mode latihan')->assertSee($kind === 'ppbj' ? 'name="ppbj_no"' : 'name="tujuan_pengadaan"', false)->assertDontSee('action="'.route('ppbj.store').'"', false);
            $this->postJson(route('virtual-office.tutorial.document.validate'), [])->assertUnprocessable();
            $this->advance(5, ['event' => 'document', 'token' => 'forged'])->assertUnprocessable();
            $proof = $this->postJson(route('virtual-office.tutorial.document.validate'), $this->documentData($user))->assertOk()->assertJsonPath('kind', $kind)->json('token');
            $this->advance(5, ['event' => 'document', 'token' => $proof])->assertOk()->assertJsonPath('step', 6);
        }
        $this->assertDatabaseCount('ppbj', 0);$this->assertDatabaseCount('torprs', 0);
    }

    public function test_document_proof_is_bound_to_its_account_and_expires(): void
    {
        $first = $this->person();$second = $this->person();$this->practice($first, 4);
        $proof = $this->postJson(route('virtual-office.tutorial.document.validate'), $this->documentData($first))->assertOk()->json('token');
        $this->practice($second, 4);$this->advance(5, ['event' => 'document', 'token' => $proof])->assertUnprocessable();
        $this->actingAs($first);$this->travel(31)->minutes();$this->advance(5, ['event' => 'document', 'token' => $proof])->assertUnprocessable();
    }

    public function test_viewer_and_global_read_only_use_tracking_practice_without_business_write_permission(): void
    {
        foreach ([false, true] as $global) {
            Cache::put('simonpr:read_only_mode', $global);$user = $this->person(['role' => $global ? 'user' : 'viewer']);$this->practice($user, 4);
            $this->get(route('virtual-office.tutorial.document'))->assertOk()->assertSee('Akses baca')->assertDontSee('name="ppbj_no"', false);
            $this->postJson(route('virtual-office.tutorial.document.validate'), ['ppbj_no' => 'FORGED'])->assertUnprocessable();
            $this->postJson(route('virtual-office.tutorial.document.validate'), ['number' => 'LATIHAN/PR/001'])->assertOk()->assertJsonPath('kind', 'tracking');
            $this->postJson(route('ppbj.store'), [])->assertForbidden();
        }
        $this->assertDatabaseCount('ppbj', 0);
    }

    public function test_lifetime_completion_survives_cache_and_sessions_and_manual_replay_does_not_reset_it(): void
    {
        $user = $this->person();$other = $this->person();$this->practice($user);
        $completed = app(VirtualOfficeTutorial::class)->progress($user)->completed_at;$this->assertNotNull($completed);
        Cache::flush();$this->flushSession();$this->actingAs($user);
        $this->get(route('virtual-office.index'))->assertOk()->assertDontSee('id="voTutorialCoach"', false)->assertSee('Lihat tutorial');
        $this->get(route('virtual-office.index', ['tutorial' => 1]))->assertOk()->assertSee('voTutorialCoach');
        $this->postJson(route('virtual-office.tutorial.start'))->assertOk()->assertJsonPath('replay', true)->assertJsonPath('step', 0);
        $this->assertSame($completed, app(VirtualOfficeTutorial::class)->progress($user)->completed_at);
        $this->assertSame(7, (int) app(VirtualOfficeTutorial::class)->progress($user)->step);
        $this->actingAs($other)->get(route('dashboard'))->assertRedirect(route('virtual-office.tutorial.show'));
    }

    public function test_reading_only_completion_is_kept_and_unfinished_old_guides_start_with_real_practice(): void
    {
        $done = $this->person();$unfinished = $this->person();$stamp = now()->subDay()->format('Y-m-d H:i:s');
        DB::table('virtual_office_tutorials')->insert([['user_id' => $done->id, 'step' => 7, 'completed_at' => $stamp], ['user_id' => $unfinished->id, 'step' => 4, 'completed_at' => null]]);
        $this->actingAs($done)->postJson(route('virtual-office.tutorial.start'))->assertOk()->assertJsonPath('replay', true);
        $this->assertDatabaseHas('virtual_office_tutorials', ['user_id' => $done->id, 'completed_at' => $stamp, 'practice' => null]);
        $this->actingAs($unfinished)->postJson(route('virtual-office.tutorial.start'))->assertOk()->assertJsonPath('step', 0)->assertJsonPath('replay', false);
    }

    public function test_guests_inactive_and_other_departments_cannot_use_practice_endpoints(): void
    {
        $this->get(route('virtual-office.tutorial.show'))->assertRedirect(route('login'));
        $this->postJson(route('virtual-office.tutorial.start'))->assertUnauthorized();
        $this->actingAs($this->person(['department' => 'lainnya']))->get(route('virtual-office.tutorial.document'))->assertForbidden();
        $this->postJson(route('virtual-office.tutorial.start'))->assertForbidden();
        $this->actingAs($this->person(['is_active' => false]))->postJson(route('virtual-office.tutorial.start'))->assertStatus(423);
        $this->assertDatabaseCount('virtual_office_tutorials', 0);
    }

    public function test_gate_leaves_polling_saves_profile_and_exports_untouched(): void
    {
        $this->actingAs($this->person());$this->getJson(route('virtual-office.presence'))->assertOk();$this->get(route('profile.edit'))->assertOk();
        $this->postJson(route('virtual-office.avatar'), [])->assertUnprocessable();$this->get(route('ppbj.template'))->assertOk();
        $this->assertDatabaseCount('virtual_office_tutorials', 0);
    }

    public function test_optional_tutorial_never_redirects_new_or_unfinished_accounts_and_manual_practice_can_be_exited(): void
    {
        config(['virtual_office.tutorial_required' => false]);
        foreach ([false, true] as $unfinished) {
            $user = $this->person();
            if ($unfinished) app(VirtualOfficeTutorial::class)->start($user);
            $this->actingAs($user)->get(route('dashboard.indexumum'))->assertOk();
            $this->get(route('ppbj.index'))->assertOk();
            $this->get(route('virtual-office.index'))->assertOk()->assertDontSee('id="voTutorialCoach"', false)->assertSee('Lihat tutorial');
            $this->get(route('virtual-office.index', ['tutorial' => 1]))->assertOk()->assertSee('id="voTutorialCoach"', false)->assertSee('Keluar tutorial');
            $this->get(route('virtual-office.index'))->assertOk()->assertDontSee('id="voTutorialCoach"', false);
            $this->assertFalse(app(VirtualOfficeTutorial::class)->completed($user));
        }
    }
}
