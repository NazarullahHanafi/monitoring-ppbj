<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use App\Support\ProcurementWorkspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ProcurementWorkspaceTest extends TestCase
{
    use RefreshDatabase;

    private function user(array $attributes = []): User
    {
        return User::factory()->create($attributes + ['department' => 'umum', 'role' => 'user']);
    }

    private function favorite(array $filters = ['search' => 'kursi'], int $version = 0, string $name = 'Kursi kantor'): array
    {
        return ['action' => 'favorite_save', 'version' => $version, 'name' => $name, 'filters' => $filters];
    }

    private function saveUrl(string $page = 'sp'): string
    {
        return route('procurement.workspace.save', ['page' => $page]);
    }

    private function document(string $kind = 'sp'): Sp|Spph
    {
        $data = ['sequence_number' => 900, 'nama_vendor' => 'Vendor aman', 'deskripsi_pengadaan' => 'Perlengkapan kantor', 'pic' => 'Nazar'];

        return $kind === 'sp' ? Sp::create($data + ['nomor_sp' => '900/PKU-X/SP/2026', 'nilai_sp' => 1000000, 'tanggal_sp' => '2026-10-30'])
            : Spph::create($data + ['nomor_spph' => '900/PKU-X/SPPH/2026', 'tanggal' => '2026-10-30', 'vendor_names' => ['Vendor aman', 'Vendor kedua']]);
    }

    public function test_preferences_are_private_per_user_and_page_with_cached_reads(): void
    {
        $one = $this->user();
        $two = $this->user();
        $this->actingAs($one)->postJson($this->saveUrl(), $this->favorite())->assertOk()->assertJsonPath('version', 1);
        $this->assertSame('Kursi kantor', ProcurementWorkspace::state($one->id, 'sp')['settings']['favorites'][0]['name']);
        $this->assertSame([], ProcurementWorkspace::state($two->id, 'sp')['settings']['favorites']);
        $this->assertSame([], ProcurementWorkspace::state($one->id, 'spph')['settings']['favorites']);
        DB::enableQueryLog();
        DB::flushQueryLog();
        ProcurementWorkspace::state($one->id, 'sp');
        $this->assertCount(0, DB::getQueryLog());
        DB::disableQueryLog();
        $this->actingAs($two)->postJson($this->saveUrl(), $this->favorite(['search' => 'meja']))->assertOk();
        $this->assertSame('kursi', ProcurementWorkspace::state($one->id, 'sp')['settings']['favorites'][0]['filters']['search']);
    }

    public function test_stale_device_cannot_overwrite_newer_settings_and_rename_is_idempotent(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $first = $this->postJson($this->saveUrl(), $this->favorite())->assertOk()->json();
        $this->postJson($this->saveUrl(), $this->favorite(['search' => 'lost'], 0))->assertStatus(409)->assertJsonPath('settings.favorites.0.filters.search', 'kursi');
        $second = $this->postJson($this->saveUrl(), $this->favorite(['search' => 'kursi baru'], 1, 'KURSI KANTOR'))->assertOk()->json();
        $this->assertCount(1, $second['settings']['favorites']);
        $this->assertSame($first['settings']['favorites'][0]['id'], $second['settings']['favorites'][0]['id']);
        $this->assertSame('kursi baru', ProcurementWorkspace::state($user->id, 'sp')['settings']['favorites'][0]['filters']['search']);
    }

    public function test_favorite_limit_empty_filter_delete_and_foreign_id_isolation(): void
    {
        $one = $this->user();
        $two = $this->user();
        $this->actingAs($one);
        for ($i = 0; $i < 10; $i++) {
            $this->postJson($this->saveUrl(), $this->favorite([], $i, 'Favorit '.$i))->assertOk();
        }
        $this->postJson($this->saveUrl(), $this->favorite([], 10, 'Favorit sebelas'))->assertStatus(422);
        $id = ProcurementWorkspace::state($one->id, 'sp')['settings']['favorites'][0]['id'];
        $this->actingAs($two)->postJson($this->saveUrl(), ['action' => 'favorite_delete', 'favorite_id' => $id, 'version' => 0])->assertOk();
        $this->assertCount(10, ProcurementWorkspace::state($one->id, 'sp')['settings']['favorites']);
        $this->actingAs($one)->postJson($this->saveUrl(), ['action' => 'favorite_delete', 'favorite_id' => $id, 'version' => 10])->assertOk()->assertJsonCount(9, 'settings.favorites');
    }

    public function test_viewer_can_personalize_but_business_write_permissions_are_unchanged(): void
    {
        $viewer = $this->user(['role' => 'viewer']);
        $layout = ProcurementWorkspace::defaults('ppbj')['layout'];
        $layout['visible'] = ['number', 'description', 'actions'];
        $layout['density'] = 'compact';
        $this->actingAs($viewer)->postJson($this->saveUrl('ppbj'), ['action' => 'layout', 'version' => 0, 'layout' => $layout])->assertOk();
        $this->actingAs($viewer)->postJson(route('ppbj.store'), ['ppbj_no' => 'SHOULD-NOT-SAVE'])->assertForbidden();
        $this->assertDatabaseCount('ppbj', 0);
    }

    public function test_layout_rejects_hidden_essential_columns_duplicates_unknown_fields_and_user_spoofing(): void
    {
        $this->actingAs($this->user());
        $layout = ProcurementWorkspace::defaults('sp')['layout'];
        foreach ([array_replace($layout, ['visible' => ['description', 'actions']]),
            array_replace($layout, ['order' => array_fill(0, 10, 'number')]),
            array_replace($layout, ['visible' => ['number', 'actions', 'password']]),
            array_replace($layout, ['density' => 'huge'])] as $invalid) {
            $this->postJson($this->saveUrl(), ['action' => 'layout', 'version' => 0, 'layout' => $invalid])->assertStatus(422);
        }
        $this->postJson($this->saveUrl(), $this->favorite() + ['user_id' => 999])->assertStatus(422)->assertJsonValidationErrors('user_id');
        $this->assertDatabaseCount('user_table_preferences', 0);
    }

    public function test_favorite_filters_are_validated_and_multi_select_dates_are_preserved(): void
    {
        $this->actingAs($this->user());
        foreach ([['redirect' => 'https://evil.example'], ['search' => ['nested']], ['dari' => 'not-a-date'], ['search' => str_repeat('x', 161)], ['mode' => 'owner']] as $invalid) {
            $this->postJson($this->saveUrl(), $this->favorite($invalid))->assertStatus(422);
        }
        $filters = ['portofolio' => ['A', 'B'], 'buyer' => ['Nazar'], 'date_type' => 'monthly', 'date_month' => '2026-10', 'amount' => '8 juta'];
        $this->postJson($this->saveUrl('ppbj'), $this->favorite($filters))->assertOk()->assertJsonPath('settings.favorites.0.filters.portofolio', ['A', 'B'])
            ->assertJsonPath('settings.favorites.0.filters.date_month', '2026-10');
    }

    public function test_guests_operasional_and_inactive_users_cannot_access_other_department_workspace(): void
    {
        $sp = $this->document();
        $url = route('procurement.quick-detail', ['kind' => 'sp', 'id' => $sp->id]);
        $this->getJson($url)->assertUnauthorized();
        $this->postJson($this->saveUrl(), $this->favorite())->assertUnauthorized();
        $this->actingAs($this->user(['department' => 'operasional']))->getJson($url)->assertForbidden();
        $this->postJson($this->saveUrl(), $this->favorite())->assertForbidden();
        $this->actingAs($this->user(['is_active' => false]))->getJson($url)->assertStatus(423);
    }

    public function test_sp_spph_details_include_items_grouped_pr_and_candidates_without_archive_network(): void
    {
        Http::preventStrayRequests();
        $this->actingAs($this->user(['role' => 'viewer']));
        $pr = Ppbj::create(['ppbj_no' => 'PR/QUICK/1', 'uraian' => 'Uraian PR', 'tgl_ppbj' => '2026-10-30', 'total_sebelum_ppn' => 2000000, 'portofolio' => 'LAB', 'buyer' => 'Nazar']);
        foreach (['sp', 'spph'] as $kind) {
            $document = $this->document($kind);
            $document->ppbjs()->sync([$pr->id => ['urutan' => 1]]);
            $document->items()->create(['urutan' => 1, 'nama_barang' => '<p>Kursi <b>kantor</b></p>', 'jumlah' => '2', 'satuan' => 'Unit', 'harga_satuan' => 500000, 'subtotal' => 1000000]);
            $response = $this->getJson(route('procurement.quick-detail', ['kind' => $kind, 'id' => $document->id]))->assertOk()
                ->assertJsonPath('number', $document->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph'))->assertJsonPath('items.0.name', 'Kursi kantor')
                ->assertJsonPath('prs.0.number', $pr->ppbj_no)->assertJsonPath('prs.0.buyer', 'Nazar');
            $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
            if ($kind === 'spph') {
                $response->assertJsonFragment(['label' => 'Semua kandidat vendor', 'value' => 'Vendor aman · Vendor kedua']);
            }
            $this->assertStringNotContainsString('password', $response->getContent());
        }
        Http::assertNothingSent();
    }

    public function test_detail_cache_is_bounded_fresh_bypasses_and_soft_deleted_documents_are_not_served(): void
    {
        $this->actingAs($this->user());
        $sp = $this->document();
        $item = $sp->items()->create(['urutan' => 1, 'nama_barang' => 'Kursi lama', 'jumlah' => '1']);
        $url = route('procurement.quick-detail', ['kind' => 'sp', 'id' => $sp->id]);
        $this->getJson($url)->assertOk()->assertJsonPath('items.0.name', 'Kursi lama');
        DB::enableQueryLog();
        DB::flushQueryLog();
        $this->getJson($url)->assertOk();
        $this->assertCount(0, collect(DB::getQueryLog())->filter(fn ($query) => str_contains($query['query'], 'from "sp_items"')));
        DB::disableQueryLog();
        $item->update(['nama_barang' => 'Kursi terbaru']);
        $this->getJson($url)->assertJsonPath('items.0.name', 'Kursi lama');
        $this->getJson($url.'?fresh=1')->assertJsonPath('items.0.name', 'Kursi terbaru');
        $item->update(['nama_barang' => 'Kursi setelah TTL']);
        $this->travel(21)->seconds();
        $this->getJson($url)->assertJsonPath('items.0.name', 'Kursi setelah TTL');
        $sp->delete();
        $this->getJson($url)->assertNotFound();
    }

    public function test_manual_legacy_pr_and_item_limits_are_explicit(): void
    {
        $this->actingAs($this->user());
        $sp = $this->document();
        $sp->update(['nomor_pr' => 'MANUAL-QUICK']);
        $url = route('procurement.quick-detail', ['kind' => 'sp', 'id' => $sp->id]);
        $this->getJson($url)->assertJsonPath('manual_pr', 'MANUAL-QUICK')->assertJsonCount(0, 'items');
        $pr = Ppbj::create(['ppbj_no' => 'MANUAL-QUICK', 'tgl_ppbj' => '2026-10-30']);
        for ($i = 1; $i <= 52; $i++) {
            $sp->items()->create(['urutan' => $i, 'nama_barang' => 'Barang '.$i, 'jumlah' => '1']);
        }
        $this->getJson($url.'?fresh=1')->assertOk()->assertJsonCount(50, 'items')->assertJsonPath('items_truncated', true)->assertJsonPath('prs.0.id', $pr->id);
    }

    public function test_ppbj_detail_has_journey_and_documents_and_never_fetches_attachments_automatically(): void
    {
        Http::preventStrayRequests();
        $this->actingAs($this->user());
        $pr = Ppbj::create(['ppbj_no' => 'PR/QUICK/FLOW', 'uraian' => 'Perjalanan lengkap', 'tgl_ppbj' => '2026-10-30', 'tgl_terima_pr' => '2026-10-30', 'no_invoice' => 'INV-QUICK', 'tgl_invoice' => '2026-10-30']);
        $sp = $this->document();
        $sp->ppbjs()->sync([$pr->id => ['urutan' => 1]]);
        $this->getJson(route('procurement.quick-detail', ['kind' => 'ppbj', 'id' => $pr->id]))->assertOk()->assertJsonCount(7, 'stages')
            ->assertJsonPath('documents.0.kind', 'sp')->assertJsonPath('stages.6.done', true)->assertJsonFragment(['label' => 'No. Invoice', 'value' => 'INV-QUICK']);
        Http::assertNothingSent();
    }

    public function test_workspace_markup_is_present_on_each_list_with_no_polling_added(): void
    {
        $this->actingAs($this->user());
        foreach (['sp', 'spph', 'ppbj'] as $kind) {
            $this->get(route($kind.'.index'))->assertOk()->assertSee('data-workspace-table="'.$kind.'"', false)->assertSee('Filter favorit')->assertSee('Atur tampilan');
        }
        $script = file_get_contents(public_path('assets/app/procurement-workspace.js'));
        $this->assertStringNotContainsString('setInterval', $script);
        $this->assertStringContainsString('new AbortController()', $script);
        $this->assertStringNotContainsString('localStorage', $script);
    }
}
