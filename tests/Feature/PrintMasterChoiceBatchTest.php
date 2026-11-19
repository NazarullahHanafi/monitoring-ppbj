<?php

namespace Tests\Feature;

use App\Http\Controllers\SpMasterOptionController;
use App\Models\SpMasterOption;
use App\Models\User;
use App\Support\SpMasterOptionVersion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class PrintMasterChoiceBatchTest extends TestCase
{
    use RefreshDatabase;

    private const TYPES = ['penandatangan_sci', 'jabatan_sci', 'bidang_pr'];

    private function batch(array $input = [])
    {
        return app(SpMasterOptionController::class)->printOptions(Request::create('/', 'GET', $input + ['types' => self::TYPES]));
    }

    public function test_three_choices_use_one_bounded_select_and_match_legacy_selected_first_results(): void
    {
        $selected = [];
        foreach (self::TYPES as $type) {
            foreach (range(1, 60) as $index) {
                SpMasterOption::create(['type' => $type, 'nama' => sprintf('Batch choice %03d', $index), 'is_active' => true]);
            }
            $selected[$type] = SpMasterOption::create(['type' => $type, 'nama' => 'ZZ selected choice', 'is_active' => true])->id;
            SpMasterOption::create(['type' => $type, 'nama' => 'AAA inactive choice', 'is_active' => false]);
        }
        DB::enableQueryLog();
        DB::flushQueryLog();
        try {
            $response = $this->batch(['include_ids' => $selected]);
            $queries = DB::getQueryLog();
        } finally {
            DB::disableQueryLog();
        }
        $data = $response->getData(true);
        $this->assertSame('no-store, private', $response->headers->get('Cache-Control'));
        $this->assertSame(50, $data['limit']);
        $this->assertCount(1, $queries);
        // SQLite wraps UNION branches in SELECT * over already projected derived tables.
        $this->assertDoesNotMatchRegularExpression('/select\s+\*\s+from\s+["`]sp_master_options|count\s*\(/i', $queries[0]['query']);
        $this->assertSame(3, substr_count(strtolower($queries[0]['query']), 'limit 51'));
        foreach (self::TYPES as $type) {
            $this->assertCount(50, $data['choices'][$type]);
            $this->assertTrue($data['truncated'][$type]);
            $this->assertSame($selected[$type], $data['choices'][$type][0]['id']);
            $legacy = app(SpMasterOptionController::class)->printOptions(Request::create('/', 'GET', ['type' => $type, 'active_only' => 1, 'include_id' => $selected[$type], 'per_page' => 50]))->getData(true);
            $this->assertSame($legacy['options'], $data['choices'][$type]);
        }
    }

    public function test_empty_types_return_typed_empty_arrays_and_do_not_include_unrequested_types(): void
    {
        SpMasterOption::whereIn('type', ['penandatangan_sci', 'jabatan_sci'])->delete();
        $data = $this->batch(['types' => ['jabatan_sci', 'penandatangan_sci']])->getData(true);
        $this->assertSame(['jabatan_sci' => [], 'penandatangan_sci' => []], $data['choices']);
        $this->assertSame(['jabatan_sci' => false, 'penandatangan_sci' => false], $data['truncated']);
    }

    public function test_missing_inactive_and_wrong_type_selected_ids_are_not_injected_into_choices(): void
    {
        $inactive = SpMasterOption::create(['type' => 'penandatangan_sci', 'nama' => 'Inactive batch', 'is_active' => false]);
        $other = SpMasterOption::create(['type' => 'bidang_ip_itu', 'nama' => 'Other type batch', 'is_active' => true]);
        $data = $this->batch(['include_ids' => ['penandatangan_sci' => $inactive->id, 'jabatan_sci' => $other->id, 'bidang_pr' => 9007199254740991]])->getData(true);
        foreach (self::TYPES as $type) {
            foreach ($data['choices'][$type] as $row) {
                $this->assertSame($type, $row['type']);
                $this->assertTrue($row['is_active']);
                $this->assertNotContains($row['id'], [$inactive->id, $other->id]);
                $this->assertSame(SpMasterOptionVersion::of(SpMasterOption::findOrFail($row['id'])), $row['version']);
            }
        }
    }

    public function test_fifty_rows_are_not_marked_truncated_but_fifty_one_rows_are(): void
    {
        SpMasterOption::where('type', 'jabatan_sci')->delete();
        foreach (range(1, 50) as $index) {
            SpMasterOption::create(['type' => 'jabatan_sci', 'nama' => sprintf('Exact bound %03d', $index), 'is_active' => true]);
        }
        $first = $this->batch(['types' => ['jabatan_sci']])->getData(true);
        $this->assertCount(50, $first['choices']['jabatan_sci']);
        $this->assertFalse($first['truncated']['jabatan_sci']);
        SpMasterOption::create(['type' => 'jabatan_sci', 'nama' => 'ZZ extra choice', 'is_active' => true]);
        $second = $this->batch(['types' => ['jabatan_sci']])->getData(true);
        $this->assertCount(50, $second['choices']['jabatan_sci']);
        $this->assertTrue($second['truncated']['jabatan_sci']);
    }

    public function test_malformed_ambiguous_and_excessive_batch_parameters_never_reach_sql(): void
    {
        $cases = [['types' => null], ['types' => 'jabatan_sci'], ['types' => []], ['types' => ['x' => 'jabatan_sci']], ['types' => ['jabatan_sci', 'jabatan_sci']],
            ['types' => ['jabatan_sci', 'penandatangan_sci', 'bidang_pr', 'bidang_ip_itu']], ['types' => [['jabatan_sci']]], ['types' => ['unknown']],
            ['include_ids' => 'bad'], ['include_ids' => ['unknown' => 1]], ['include_ids' => ['jabatan_sci' => [1]]], ['include_ids' => ['jabatan_sci' => 0]],
            ['include_ids' => ['jabatan_sci' => 9007199254740992]], ['types' => ['jabatan_sci'], 'include_ids' => ['bidang_pr' => 1]]];
        foreach (['type' => 'jabatan_sci', 'q' => 'test', 'page' => 1, 'per_page' => 50, 'active_only' => 1, 'include_id' => 1] as $key => $value) {
            $cases[] = [$key => $value];
        }
        DB::enableQueryLog();
        try {
            foreach ($cases as $input) {
                DB::flushQueryLog();
                try {
                    $this->batch($input);
                    $this->fail('Malformed batch accepted');
                } catch (ValidationException) {
                }
                $this->assertSame([], DB::getQueryLog());
            }
        } finally {
            DB::disableQueryLog();
        }
    }

    public function test_choices_are_fresh_and_have_the_same_version_as_the_manager_without_mutations(): void
    {
        $row = SpMasterOption::create(['type' => 'jabatan_sci', 'nama' => 'AA current choice', 'is_active' => true]);
        $first = $this->batch(['types' => ['jabatan_sci'], 'include_ids' => ['jabatan_sci' => $row->id]])->getData(true);
        $this->assertSame(SpMasterOptionVersion::of($row), $first['choices']['jabatan_sci'][0]['version']);
        $row->update(['nama' => 'AA updated choice']);
        $second = $this->batch(['types' => ['jabatan_sci'], 'include_ids' => ['jabatan_sci' => $row->id]])->getData(true);
        $this->assertSame('AA updated choice', $second['choices']['jabatan_sci'][0]['nama']);
        $this->assertSame(SpMasterOptionVersion::of($row), $second['choices']['jabatan_sci'][0]['version']);
        $this->assertNotSame($first['choices']['jabatan_sci'][0]['version'], $second['choices']['jabatan_sci'][0]['version']);
        $this->assertDatabaseCount('activity_logs', 0);
    }

    public function test_existing_auth_department_and_read_only_guards_apply_to_batched_reads(): void
    {
        $url = route('spph.print-masters', ['types' => self::TYPES]);
        $this->getJson($url)->assertUnauthorized();
        $this->actingAs(User::factory()->create(['department' => 'operasional', 'role' => 'user']))->getJson($url)->assertForbidden();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'viewer']))->getJson($url)->assertOk()->assertHeader('Cache-Control', 'no-store, private')->assertJsonPath('limit', 50);
    }
}
