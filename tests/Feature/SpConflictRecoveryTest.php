<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use PDOException;
use Tests\TestCase;

class SpConflictRecoveryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create(['department' => 'umum', 'role' => 'superadmin']));
    }

    private function payload(array $extra = []): array
    {
        return $extra + ['nomor_sp' => '904/PKU-XI/SP/2026', 'tanggal_sp' => '2026-11-18', 'nilai_sp' => 1000000, 'nama_vendor' => 'Vendor uji', 'deskripsi_pengadaan' => 'Uji pemulihan konflik', 'pic' => auth()->user()->name, 'nomor_pr_type' => 'manual', 'nomor_pr' => 'MANUAL/904'];
    }

    private function sp(string $number, array $extra = []): Sp
    {
        return Sp::create($extra + ['nomor_sp' => $number, 'sequence_number' => 904, 'tanggal_sp' => '2026-11-18', 'nama_vendor' => 'Vendor asli', 'deskripsi_pengadaan' => 'Dokumen asli', 'pic' => auth()->user()->name, 'created_by_user_id' => auth()->id()]);
    }

    private function uniqueError(): UniqueConstraintViolationException
    {
        return new UniqueConstraintViolationException('sqlite', 'synthetic unique write', [], new PDOException('Synthetic unique race'));
    }

    private function transactionMock()
    {
        $mock = \Mockery::mock(DB::getFacadeRoot())->makePartial();
        DB::swap($mock);

        return $mock->shouldReceive('transaction');
    }

    public function test_create_number_race_offers_renumbering_without_repeating_a_write(): void
    {
        $this->transactionMock()->once()->andReturnUsing(function () {
            $this->sp('904/PKU-XI/SP/2026');
            throw $this->uniqueError();
        });
        $this->postJson(route('sp.store'), $this->payload())->assertStatus(409)
            ->assertJsonPath('conflict_type', 'sp_number')->assertJsonPath('renumber_allowed', true)->assertJsonValidationErrors('nomor_sp');
        $this->assertDatabaseCount('sps', 1);
        $this->assertDatabaseHas('sps', ['nama_vendor' => 'Vendor asli']);
    }

    public function test_edit_number_race_detects_another_archived_record_and_preserves_the_original(): void
    {
        $sp = $this->sp('903/PKU-XI/SP/2026');
        $this->transactionMock()->once()->andReturnUsing(function () {
            $this->sp('904/PKU-XI/SP/2026', ['deleted_at' => now()]);
            throw $this->uniqueError();
        });
        $this->putJson(route('sp.update', $sp), $this->payload())->assertStatus(409)
            ->assertJsonPath('conflict_type', 'sp_number')->assertJsonPath('renumber_allowed', true);
        $this->assertSame('903/PKU-XI/SP/2026', $sp->fresh()->nomor_sp);
        $this->assertDatabaseCount('sps', 2);
    }

    public function test_edit_unique_race_on_another_field_does_not_treat_its_own_number_as_a_conflict(): void
    {
        $sp = $this->sp('904/PKU-XI/SP/2026');
        $this->transactionMock()->once()->andThrow($this->uniqueError());
        $this->putJson(route('sp.update', $sp), $this->payload())->assertStatus(409)
            ->assertJsonPath('conflict_type', 'record')->assertJsonPath('renumber_allowed', false)->assertJsonValidationErrors('nomor_pr');
        $this->assertSame('Vendor asli', $sp->fresh()->nama_vendor);
        $this->assertDatabaseCount('sps', 1);
    }

    public function test_oracle_number_race_keeps_manual_numbering_and_never_offers_an_auto_number(): void
    {
        $this->transactionMock()->once()->andReturnUsing(function () {
            $this->sp('ORACLE-904', ['numbering_mode' => 'oracle']);
            throw $this->uniqueError();
        });
        $this->postJson(route('sp.store'), $this->payload(['nomor_sp' => 'ORACLE-904', 'oracle_mode' => '1', 'nilai_sp' => 60000000]))
            ->assertStatus(409)->assertJsonPath('conflict_type', 'sp_number')->assertJsonPath('renumber_allowed', false);
        $this->assertDatabaseCount('sps', 1);
    }

    public function test_ppbj_link_conflict_identifies_the_reference_and_does_not_offer_renumbering(): void
    {
        $ppbj = Ppbj::create(['ppbj_no' => 'PR/904', 'tgl_ppbj' => '2026-11-18', 'status' => 'ACTIVE', 'uraian' => 'Referensi uji', 'awarding_sp' => 'SP/existing', 'total_sebelum_ppn' => 2000000]);
        $this->postJson(route('sp.store'), $this->payload(['nomor_pr_type' => 'ppbj', 'nomor_prs' => [$ppbj->ppbj_no], 'nomor_pr' => null]))
            ->assertStatus(409)->assertJsonPath('conflict_type', 'ppbj')->assertJsonPath('renumber_allowed', false)->assertJsonValidationErrors('nomor_prs');
        $this->assertSame('SP/existing', $ppbj->fresh()->awarding_sp);
        $this->assertDatabaseCount('sps', 0);
    }

    public function test_non_unique_database_errors_are_not_disguised_as_number_conflicts(): void
    {
        $sp = $this->sp('904/PKU-XI/SP/2026');
        $error = new QueryException('sqlite', 'synthetic unavailable write', [], new PDOException('Synthetic unavailable'));
        $this->transactionMock()->twice()->andThrow($error);
        $this->withoutExceptionHandling();
        foreach (['create', 'edit'] as $action) {
            try {
                if ($action === 'create') {
                    $this->postJson(route('sp.store'), $this->payload(['nomor_sp' => '905/PKU-XI/SP/2026']));
                } else {
                    $this->putJson(route('sp.update', $sp), $this->payload());
                }
                $this->fail('Database failure was hidden as a numbering conflict');
            } catch (QueryException $actual) {
                $this->assertSame($error, $actual);
            }
        }
        $this->assertSame('Vendor asli', $sp->fresh()->nama_vendor);
        $this->assertDatabaseCount('sps', 1);
    }
}
