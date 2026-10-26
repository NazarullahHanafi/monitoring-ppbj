<?php

namespace Tests\Unit;

use App\Models\Ppbj;
use App\Support\PpbjListPresentation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class PpbjListCacheTest extends TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function row(int $id = 1): Ppbj
    {
        $row = new class extends Ppbj
        {
            public int $calculations = 0;

            public function contractStatusLabel(): string
            {
                $this->calculations++;

                return parent::contractStatusLabel();
            }
        };
        $row->setRawAttributes([
            'id' => $id, 'ppbj_no' => 'CACHE/PR/'.$id, 'status' => 'ACTIVE',
            'total_sebelum_ppn' => 1000000, 'tgl_terima_pr' => '2026-10-20',
            'tgl_spk' => '2026-10-21', 'promised_date' => '2026-11-20',
            'general_registered_at' => '2026-10-20 09:00:00',
        ]);

        return $row;
    }

    public function test_warm_cache_reuses_labels_and_keeps_current_user_fields_fresh(): void
    {
        Carbon::setTestNow('2026-10-26 10:00:00');
        $row = $this->row();
        $row->collaboration_unread_count = 3;
        $row->do_updated_by_name = 'User A';
        $first = PpbjListPresentation::forPage(collect([$row]));
        $this->assertSame(1, $row->calculations);

        $row->collaboration_unread_count = 0;
        $row->collaboration_note_count = 5;
        $row->do_updated_by_name = 'User B';
        $second = PpbjListPresentation::forPage(collect([$row]));
        $this->assertSame(1, $row->calculations, 'Warm labels must not repeat SLA/contract calculations.');
        $this->assertSame($first[1]['contract_status_label'], $second[1]['contract_status_label']);
        $this->assertSame(0, $second[1]['collaboration_unread_count']);
        $this->assertSame(5, $second[1]['collaboration_note_count']);
        $this->assertSame('User B', $second[1]['do_updated_by_name']);
        $this->assertSame(PpbjListPresentation::make($row), $second[1]);
    }

    public function test_changed_data_and_new_day_cannot_reuse_stale_labels(): void
    {
        Carbon::setTestNow('2026-10-26 23:59:00');
        $row = $this->row();
        $first = PpbjListPresentation::forPage(collect([$row]))[1];

        // Even bulk SQL writes without a new updated_at/model event change the fingerprint.
        $row->promised_date = '2026-10-27';
        $changed = PpbjListPresentation::forPage(collect([$row]))[1];
        $this->assertSame(2, $row->calculations);
        $this->assertNotSame($first['contract_remaining_days'], $changed['contract_remaining_days']);
        $this->assertSame(1, $changed['contract_remaining_days']);

        Carbon::setTestNow('2026-10-27 00:01:00');
        $nextDay = PpbjListPresentation::forPage(collect([$row]))[1];
        $this->assertSame(3, $row->calculations);
        $this->assertSame(0, $nextDay['contract_remaining_days']);
        $this->assertSame('BERAKHIR HARI INI', $nextDay['contract_status_label']);
    }

    public function test_cache_expiry_empty_page_and_mixed_warm_cold_rows(): void
    {
        Carbon::setTestNow('2026-10-26 10:00:00');
        $this->assertTrue(PpbjListPresentation::forPage(collect())->isEmpty());
        $first = $this->row();
        $second = $this->row(2);
        PpbjListPresentation::forPage(collect([$first]));
        $page = PpbjListPresentation::forPage(collect([$first, $second]));
        $this->assertSame([1, 2], $page->keys()->all());
        $this->assertSame(1, $first->calculations);
        $this->assertSame(1, $second->calculations);

        Carbon::setTestNow('2026-10-26 10:05:01');
        PpbjListPresentation::forPage(collect([$first]));
        $this->assertSame(2, $first->calculations);
        Cache::flush();
    }
}
