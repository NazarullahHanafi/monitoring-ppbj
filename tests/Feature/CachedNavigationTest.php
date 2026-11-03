<?php

namespace Tests\Feature;

use App\Models\Ppbj;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class CachedNavigationTest extends TestCase
{
    use RefreshDatabase;

    public function test_command_center_cached_actions_do_not_capture_an_origin(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        Ppbj::create(['ppbj_no' => 'CACHE-NAVIGATION', 'uraian' => 'Overdue purchase',
            'total_sebelum_ppn' => 1000, 'tgl_terima_pr' => now()->subDays(40), 'status' => 'ACTIVE']);
        URL::forceRootUrl('https://audit.invalid');
        $first = $this->getJson('/command-center/overview')->assertOk();
        $expected = ['ppbj' => '/ppbj?search=CACHE-NAVIGATION', 'spph' => '/spph?search=CACHE-NAVIGATION', 'sp' => '/sp?search=CACHE-NAVIGATION'];
        $this->assertSame($expected, $first->json('risks.0.action_urls'));
        URL::forceRootUrl('https://production.example');
        $this->getJson('/command-center/overview')->assertOk()->assertJsonPath('risks.0.action_urls', $expected);
        $this->getJson('/command-center/reconciliation')->assertOk()->assertJsonPath('results.0.action_urls', $expected);
    }
}
