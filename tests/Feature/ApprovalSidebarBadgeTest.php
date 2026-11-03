<?php

namespace Tests\Feature;

use App\Models\User;
use DOMDocument;
use DOMXPath;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class ApprovalSidebarBadgeTest extends TestCase
{
    use RefreshDatabase;

    public function test_each_sidebar_has_only_one_badge_shared_by_initial_render_and_polling(): void
    {
        $this->actingAs(User::factory()->create(['department' => 'umum']));
        foreach ([54, 0] as $count) {
            Cache::put('pr_receipt_pending_count', $count, 30);
            $html = $this->get(route('sp.index'))->assertOk()->getContent();
            $document = new DOMDocument;
            @$document->loadHTML('<?xml encoding="UTF-8">'.$html);
            $xpath = new DOMXPath($document);
            foreach (['badgePendingPr', 'badgePendingPrMobile'] as $id) {
                $nodes = $xpath->query('//*[@id="'.$id.'"]');
                $this->assertSame(1, $nodes->length);
                $badge = $nodes->item(0);
                $this->assertSame((string) $count, trim($badge->textContent));
                $this->assertSame($count === 0, in_array('hidden', explode(' ', $badge->getAttribute('class')), true));
                $link = $badge->parentNode;
                $this->assertSame('a', $link->nodeName);
                $this->assertSame(route('approval.pr.index'), $link->getAttribute('href'));
                // A second server-rendered number beside the polling badge was
                // the duplicate that appeared when returning to the browser.
                $numbers = $xpath->query('.//span[normalize-space(text())="'.$count.'"]', $link);
                $this->assertSame(1, $numbers->length);
            }
        }
    }
}
