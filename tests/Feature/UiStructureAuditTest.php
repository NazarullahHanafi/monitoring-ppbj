<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\User;
use DOMDocument;
use DOMXPath;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UiStructureAuditTest extends TestCase
{
    use RefreshDatabase;

    public function test_main_pages_do_not_render_duplicate_ids_or_load_the_same_script_twice(): void
    {
        config(['app.owner_emails' => ['owner-audit@example.com']]);
        $general = User::factory()->create(['department' => 'umum', 'role' => 'superadmin', 'email' => 'owner-audit@example.com']);
        $operational = User::factory()->create(['department' => 'operasional']);
        foreach (range(1, 2) as $number) {
            Ppbj::create(['ppbj_no' => 'AUDIT/UI/'.$number, 'uraian' => 'Structure audit '.$number,
                'total_sebelum_ppn' => 1000000, 'tgl_ppbj' => '2026-11-03']);
            $document = ['sequence_number' => $number, 'nama_vendor' => 'Audit vendor', 'pic' => 'Audit', 'deskripsi_pengadaan' => 'Structure audit'];
            Sp::create($document + ['nomor_sp' => 'AUDIT/UI/SP/'.$number, 'tanggal_sp' => '2026-11-03']);
            Spph::create($document + ['nomor_spph' => 'AUDIT/UI/SPPH/'.$number, 'tanggal' => '2026-11-03']);
        }
        $issues = [];
        foreach ([
            ['ppbj.index', $general], ['sp.index', $general], ['spph.index', $general],
            ['collaboration-calendar.index', $general], ['collaboration-inbox.index', $general],
            ['approval.pr.index', $general], ['owner.index', $general],
            ['torpr.index', $operational], ['tracking.index', $operational],
        ] as [$name, $user]) {
            $html = $this->actingAs($user)->get(route($name))->assertOk()->getContent();
            $document = new DOMDocument;
            @$document->loadHTML('<?xml encoding="UTF-8">'.$html);
            $xpath = new DOMXPath($document);
            foreach (['//*[@id]' => 'id', '//script[@src]' => 'src'] as $selector => $attribute) {
                $counts = [];
                foreach ($xpath->query($selector) as $node) {
                    $value = trim($node->getAttribute($attribute));
                    if ($value !== '') {
                        $counts[$value] = ($counts[$value] ?? 0) + 1;
                    }
                }
                $duplicates = array_filter($counts, fn ($count) => $count > 1);
                if ($duplicates !== []) {
                    $issues[$name][$attribute] = $duplicates;
                }
            }
        }
        $this->assertSame([], $issues, json_encode($issues, JSON_PRETTY_PRINT));
    }
}
