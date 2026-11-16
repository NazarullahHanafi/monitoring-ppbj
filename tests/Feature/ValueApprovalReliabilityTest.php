<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\SpValueApproval;
use App\Models\User;
use App\Services\SpValueApprovalService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ValueApprovalReliabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_changed_reason_snapshot_expiry_and_missing_token_cannot_be_decided_from_an_old_page(): void
    {
        $requester = $this->user();
        $reviewer = $this->user();
        $this->actingAs($reviewer);
        foreach (['reason' => 'Alasan pengajuan berubah.', 'snapshot' => ['nomor_sp' => 'SP-CHANGED'], 'expires_at' => now()->addDays(2)] as $field => $value) {
            $row = $this->approval($requester);
            $token = $this->token($row);
            $row->update([$field => $value]);
            $this->postJson(route('sp.value-approvals.decide', $row), $this->decision($token))->assertConflict();
            $this->assertSame('pending', $row->fresh()->status);
            $this->assertDatabaseMissing('activity_logs', ['model_type' => SpValueApproval::class, 'model_id' => $row->id]);
        }
        $row = $this->approval($requester);
        $this->postJson(route('sp.value-approvals.decide', $row), ['decision' => 'approved', 'decision_note' => 'Dasar sudah diverifikasi.'])->assertConflict();
        $this->postJson(route('sp.value-approvals.decide', $row), $this->decision(str_repeat('a', 64)))->assertConflict();
    }

    public function test_current_review_token_allows_one_decision_with_private_json_and_audit(): void
    {
        $requester = $this->user();
        $reviewer = $this->user();
        $row = $this->approval($requester);
        $payload = $this->decision($this->token($row));
        $this->actingAs($requester)->postJson(route('sp.value-approvals.decide', $row), $payload)->assertForbidden();
        $this->actingAs($reviewer)->postJson(route('sp.value-approvals.decide', $row), $payload)->assertOk()->assertJsonPath('success', true)->assertHeader('Cache-Control', 'no-store, private');
        $this->assertDatabaseHas('sp_value_approvals', ['id' => $row->id, 'status' => 'approved', 'reviewer_id' => $reviewer->id]);
        $this->postJson(route('sp.value-approvals.decide', $row), $payload)->assertConflict();
        $this->assertSame(1, DB::table('activity_logs')->where('model_type', SpValueApproval::class)->where('model_id', $row->id)->where('action', 'value_approval_decided')->count());
        $row = $this->approval($requester);
        $this->from(route('sp.value-approvals'))->post(route('sp.value-approvals.decide', $row), $this->decision($this->token($row), 'rejected'))->assertRedirect(route('sp.value-approvals'))->assertSessionHas('success');
    }

    public function test_large_legacy_references_have_bounded_samples_and_explicit_totals_without_mutation(): void
    {
        $actor = $this->user();
        $this->actingAs($actor);
        $sp = Sp::create(['nomor_sp' => 'SP-LEGACY', 'sequence_number' => 1, 'nama_vendor' => 'Vendor', 'pic' => $actor->name, 'created_by_user_id' => $actor->id, 'deskripsi_pengadaan' => 'Legacy']);
        $spph = Spph::create(['nomor_spph' => 'SPPH-LEGACY', 'tanggal' => today(), 'deskripsi_pengadaan' => 'Legacy', 'sequence_number' => 1, 'nama_vendor' => 'Vendor', 'pic' => $actor->name, 'created_by_user_id' => $actor->id]);
        foreach (range(1, 47) as $index) {
            Ppbj::create(['ppbj_no' => 'PR-LEGACY-'.$index, 'tgl_ppbj' => today(), 'uraian' => 'Legacy', 'total_sebelum_ppn' => 1000, 'awarding_sp' => $sp->nomor_sp, 'spph_rfq_1' => $spph->nomor_spph]);
        }
        foreach (['sp' => $sp, 'spph' => $spph] as $kind => $document) {
            DB::enableQueryLog();
            DB::flushQueryLog();
            $this->postJson(route('procurement.review', ['kind' => $kind, 'id' => $document->id]), ['action' => 'delete'])->assertOk()->assertJsonCount(20, 'prs')->assertJsonPath('total_prs', 47)->assertJsonPath('prs_truncated', true)->assertHeader('Cache-Control', 'no-store, private');
            $queries = collect(DB::getQueryLog())->pluck('query');
            DB::disableQueryLog();
            $this->assertCount(0, $queries->filter(fn ($sql) => preg_match('/^\s*(insert|update|delete)\b/i', $sql)));
            $this->assertTrue($queries->contains(fn ($sql) => str_contains($sql, '"ppbj_no"') && str_contains($sql, 'limit 20')));
        }
        $this->postJson(route('procurement.review', ['kind' => 'spph', 'id' => $spph->id]), ['action' => 'save', 'nomor_spph' => 'SPPH-LEGACY', 'nama_vendor' => 'Vendor', 'nomor_pr_type' => 'manual'])
            ->assertOk()->assertJsonCount(20, 'removed_prs')->assertJsonPath('removed_prs_count', 47)->assertJsonPath('removed_prs_truncated', true);
        $this->assertNotSoftDeleted('sps', ['id' => $sp->id]);
        $this->assertNotSoftDeleted('spphs', ['id' => $spph->id]);
        $this->assertSame(47, Ppbj::where('awarding_sp', 'SP-LEGACY')->count());
    }

    public function test_expiry_boundary_cannot_consume_an_approval(): void
    {
        $this->travelTo(now()->startOfSecond());
        $actor = $this->user();
        $reviewer = $this->user();
        $snapshot = ['requires_approval' => true, 'synthetic' => true];
        $service = app(SpValueApprovalService::class);
        $row = SpValueApproval::create(['requester_id' => $actor->id, 'reviewer_id' => $reviewer->id, 'fingerprint' => $service->fingerprint($snapshot), 'snapshot' => $snapshot, 'reason' => 'Boundary check', 'status' => 'approved', 'expires_at' => now()]);
        $request = \Illuminate\Http\Request::create('/sp', 'POST');
        $request->setUserResolver(fn () => $actor);
        try {
            $service->consume($request, $snapshot);
            $this->fail('Expired approval consumed.');
        } catch (\Illuminate\Http\Exceptions\HttpResponseException $error) {
            $this->assertSame(422, $error->getResponse()->getStatusCode());
        }
        $this->assertSame('approved', $row->fresh()->status);
    }

    public function test_list_defaults_empty_status_to_pending_uses_bounded_queries_and_keeps_roles_and_budgets(): void
    {
        $actor = $this->user();
        $reviewer = $this->user();
        foreach (range(1, 22) as $index) {
            $this->approval($actor);
        }
        $this->actingAs($reviewer);
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->get(route('sp.value-approvals', ['status' => '']))->assertOk()->assertViewHas('status', 'pending')->assertViewHas('approvals', fn ($rows) => $rows->count() === 15)->assertSee('name="review_token"', false);
        $this->assertLessThanOrEqual(6, count(DB::getQueryLog()));
        DB::disableQueryLog();
        foreach ([0, 'bad', ['bad'], 1000001] as $page) {
            $this->getJson(route('sp.value-approvals', compact('page')))->assertUnprocessable();
        }
        $prefixes = [];
        foreach (['procurement.review' => 30, 'sp.value-approvals' => 60, 'sp.value-approvals.request' => 10, 'sp.value-approvals.decide' => 20] as $name => $limit) {
            $route = app('router')->getRoutes()->getByName($name);
            $rules = $route->gatherMiddleware();
            foreach (['auth', 'dept:umum', 'readonly.block'] as $required) {
                $this->assertContains($required, $rules);
            }
            $rule = collect($rules)->first(fn ($item) => str_starts_with($item, 'throttle:'));
            [$actual, $minutes, $prefix] = explode(',', substr($rule, 9));
            $this->assertSame((string) $limit, $actual);
            $this->assertSame('1', $minutes);
            $this->assertNotContains($prefix, $prefixes);
            $this->assertNotEmpty($prefix);
            $prefixes[] = $prefix;
        }
        $row = SpValueApproval::firstOrFail();
        foreach ([['umum', 'viewer'], ['operasional', 'user']] as [$department, $role]) {
            $this->actingAs(User::factory()->create(compact('department', 'role')))->postJson(route('sp.value-approvals.decide', $row), $this->decision($this->token($row)))->assertForbidden();
        }
    }

    private function token(SpValueApproval $row): string
    {
        return app(SpValueApprovalService::class)->reviewToken($row->fresh());
    }

    private function decision(string $token, string $decision = 'approved'): array
    {
        return ['decision' => $decision, 'decision_note' => 'Dasar keputusan telah diperiksa.', 'review_token' => $token];
    }

    private function user(): User
    {
        return User::factory()->create(['department' => 'umum', 'role' => 'user']);
    }

    private function approval(User $actor): SpValueApproval
    {
        $snapshot = ['nomor_sp' => 'SP-TEST', 'nilai_pr' => 1000, 'nilai_sp' => 1200, 'selisih' => 200, 'vendor' => 'Vendor', 'tanggal_sp' => null, 'item_count' => 0, 'prs' => [], 'nomor_pr_manual' => 'PR-TEST'];

        return SpValueApproval::create(['requester_id' => $actor->id, 'fingerprint' => hash('sha256', (string) \Illuminate\Support\Str::uuid()), 'snapshot' => $snapshot, 'reason' => 'Alasan pengajuan awal.', 'status' => 'pending', 'expires_at' => now()->addDays(7)]);
    }
}
