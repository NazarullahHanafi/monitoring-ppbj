<?php

namespace Tests\Feature;

use App\Models\CollaborationHandover;
use App\Models\Ppbj;
use App\Models\User;
use App\Services\CollaborationActionInboxService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ActionInboxReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_assignee_or_receiver_superadmin_can_change_an_assigned_checklist(): void
    {
        [$sender, $receiver, $handover] = $this->fixture();
        foreach ([$sender, $this->user('operasional'), $this->user('operasional', 'viewer')] as $actor) {
            $this->actingAs($actor)->patchJson(route('collaboration-inbox.checklist', $handover), [
                'version' => 1, 'checked' => [1],
            ])->assertForbidden();
        }
        $this->assertSame(1, $handover->fresh()->version);
        $this->actingAs($this->user('operasional', 'superadmin'))
            ->patchJson(route('collaboration-inbox.checklist', $handover), ['version' => 1, 'checked' => [1]])
            ->assertOk()->assertJsonPath('success', true);
        $this->actingAs($receiver)->patchJson(route('collaboration-inbox.checklist', $handover), [
            'version' => 1, 'checked' => [],
        ])->assertConflict();
        $this->assertSame(2, $handover->fresh()->version);
    }

    public function test_checklist_rejects_unknown_duplicate_and_oversized_keys_and_unchanged_save_does_not_write(): void
    {
        [, $receiver, $handover] = $this->fixture();
        $this->actingAs($receiver);
        foreach ([[99], [1, 1], range(1, 9)] as $checked) {
            $this->patchJson(route('collaboration-inbox.checklist', $handover), ['version' => 1, 'checked' => $checked])->assertUnprocessable();
        }
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->patchJson(route('collaboration-inbox.checklist', $handover), ['version' => 1, 'checked' => []])
            ->assertOk()->assertJsonPath('message', 'Checklist tidak berubah.');
        $writes = collect(DB::getQueryLog())->filter(fn ($entry) => preg_match('/^\s*(insert|update|delete)\b/i', $entry['query']));
        DB::disableQueryLog();
        $this->assertCount(0, $writes);
        $this->assertSame(1, $handover->fresh()->version);
        $this->assertDatabaseMissing('activity_logs', ['model_type' => CollaborationHandover::class, 'model_id' => $handover->id]);
        $handover->update(['status' => 'completed']);
        $this->patchJson(route('collaboration-inbox.checklist', $handover), ['version' => 1, 'checked' => [1]])->assertUnprocessable();
    }

    public function test_create_checks_pr_identity_preserves_zero_label_and_supports_json_and_html(): void
    {
        $sender = $this->user('umum');
        $first = $this->ppbj('PR-FIRST');
        $second = $this->ppbj('PR-SECOND');
        $payload = ['ppbj_id' => $first->id, 'ppbj_no' => $second->ppbj_no, 'title' => 'Periksa dokumen',
            'description' => 'Periksa kelengkapan.', 'priority' => 'normal', 'checklist_items' => ['0', 'Bukti', 'Bukti']];
        $this->actingAs($sender)->postJson(route('collaboration-inbox.store'), $payload)
            ->assertUnprocessable()->assertJsonValidationErrors('ppbj_no');
        $this->assertDatabaseCount('collaboration_handovers', 0);
        $payload['ppbj_no'] = $first->ppbj_no;
        $response = $this->postJson(route('collaboration-inbox.store'), $payload)->assertCreated()
            ->assertJsonPath('success', true)->assertJsonPath('redirect_url', route('collaboration-inbox.index', ['direction' => 'outbox']));
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
        $created = CollaborationHandover::firstOrFail();
        $this->assertSame(['0', 'Bukti'], array_column($created->checklist, 'label'));
        $this->postJson(route('collaboration-inbox.store'), $payload)->assertUnprocessable();
        $this->assertDatabaseCount('collaboration_handovers', 1);
        $this->from(route('collaboration-inbox.index'))->patch(route('collaboration-inbox.status', $created), [
            'version' => 1, 'action' => 'cancel',
        ])->assertRedirect(route('collaboration-inbox.index'))->assertSessionHas('success');
        $this->assertSame('cancelled', $created->fresh()->status);
    }

    public function test_literal_filter_stable_pagination_and_minimal_projection(): void
    {
        [, $receiver, $handover] = $this->fixture();
        $handover->update(['title' => 'Bukti 50%_!\\ dokumen', 'metadata' => ['private' => 'not projected']]);
        $other = $handover->replicate();
        $other->title = 'Bukti 50xx dokumen';
        $other->public_id = null;
        $other->save();
        $response = $this->actingAs($receiver)->get(route('collaboration-inbox.index', ['q' => '%_!\\']));
        $response->assertOk();
        $rows = $response->viewData('handovers');
        $this->assertSame([$handover->id], $rows->pluck('id')->all());
        $this->assertArrayNotHasKey('metadata', $rows->first()->getAttributes());
        $this->assertFalse($rows->first()->relationLoaded('acknowledgedBy'));
        $tie = now()->startOfSecond();
        DB::table('collaboration_handovers')->update(['updated_at' => $tie]);
        $this->get(route('collaboration-inbox.index'))->assertOk()->assertViewHas('handovers', fn ($items) => $items->pluck('id')->all() === [$other->id, $handover->id]);
    }

    public function test_assignee_directory_has_one_cold_query_zero_warm_and_invalidates_only_after_commit(): void
    {
        $receiver = $this->user('operasional');
        $this->user('finance');
        $inactive = $this->user('umum');
        $inactive->update(['is_active' => false]);
        $service = app(CollaborationActionInboxService::class);
        Cache::forget($service::ASSIGNEES_KEY);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $rows = $service->assignees();
        $this->assertCount(1, DB::getQueryLog());
        $this->assertSame([$receiver->id], $rows->pluck('id')->all());
        $this->assertSame(['id', 'name', 'department', 'role'], array_keys($rows->first()->getAttributes()));
        DB::flushQueryLog();
        $service->assignees();
        $this->assertCount(0, DB::getQueryLog());
        DB::disableQueryLog();
        DB::beginTransaction();
        $receiver->update(['name' => 'Rolled back']);
        $this->assertTrue(Cache::has($service::ASSIGNEES_KEY));
        DB::rollBack();
        $this->assertTrue(Cache::has($service::ASSIGNEES_KEY));
        DB::transaction(fn () => $receiver->fresh()->update(['is_active' => false]));
        $this->assertFalse(Cache::has($service::ASSIGNEES_KEY));
        $this->assertCount(0, $service->assignees());
        DB::transaction(fn () => $inactive->update(['is_active' => true]));
        $this->assertSame([$inactive->id], $service->assignees()->pluck('id')->all());
        DB::transaction(fn () => $inactive->delete());
        $this->assertCount(0, $service->assignees());
    }

    public function test_routes_use_separate_budgets_uuid_binding_and_bounded_page(): void
    {
        $prefixes = [];
        foreach (['index' => 60, 'store' => 20, 'status' => 30, 'checklist' => 30] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName('collaboration-inbox.'.$name);
            $rules = $route->gatherMiddleware();
            $this->assertContains('auth', $rules);
            $this->assertContains('readonly.block', $rules);
            $rule = collect($rules)->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotContains($prefix, $prefixes);
            $this->assertNotEmpty($prefix);
            $prefixes[] = $prefix;
        }
        $this->actingAs($this->user('umum'));
        foreach (['0', '-1', '1000001', 'wrong'] as $page) {
            $this->getJson(route('collaboration-inbox.index', ['page' => $page]))->assertUnprocessable();
        }
        $this->patchJson('/collaboration-inbox/handovers/not-a-uuid/checklist', ['version' => 1])->assertNotFound();
    }

    private function fixture(): array
    {
        $sender = $this->user('umum');
        $receiver = $this->user('operasional');

        return [$sender, $receiver, CollaborationHandover::create([
            'ppbj_id' => $this->ppbj('PR-RELIABILITY')->id, 'title' => 'Dokumen', 'description' => 'Periksa dokumen.',
            'from_department' => 'umum', 'to_department' => 'operasional', 'status' => 'sent', 'priority' => 'normal',
            'created_by_user_id' => $sender->id, 'assigned_to_user_id' => $receiver->id,
            'checklist' => [['key' => 1, 'label' => 'Bukti', 'checked' => false]],
        ])];
    }

    private function user(string $department, string $role = 'user'): User
    {
        return User::factory()->create(['department' => $department, 'role' => $role, 'is_active' => true]);
    }

    private function ppbj(string $number): Ppbj
    {
        return Ppbj::create(['ppbj_no' => $number, 'tgl_ppbj' => today(), 'uraian' => 'Uji inbox', 'buyer' => 'Buyer',
            'portofolio' => 'PK - LAB', 'total_sebelum_ppn' => 1000, 'status' => 'ACTIVE']);
    }
}
