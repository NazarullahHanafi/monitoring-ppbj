<?php

namespace Tests\Feature;

use Tests\TestCase;

class PublicTrackingTokenTest extends TestCase
{
    public function test_public_track_query_redirects_to_encrypted_token_url(): void
    {
        $nomor = 'PKB/PR-26/CON/0401';

        $response = $this->get('/track?q=' . urlencode($nomor));

        $response->assertRedirect();

        $location = $response->headers->get('Location');

        $this->assertNotNull($location);
        $this->assertStringContainsString('/track/t/', $location);
        $this->assertStringNotContainsString('PKB', $location);
        $this->assertStringNotContainsString('0401', $location);
    }

    public function test_public_track_post_redirects_to_encrypted_token_url(): void
    {
        $nomor = 'PKB/PR-26/CON/0401';

        $response = $this->post('/track', ['q' => $nomor]);

        $response->assertRedirect();

        $location = $response->headers->get('Location');

        $this->assertNotNull($location);
        $this->assertStringContainsString('/track/t/', $location);
        $this->assertStringNotContainsString('PKB', $location);
        $this->assertStringNotContainsString('0401', $location);
    }

    public function test_invalid_public_tracking_token_returns_to_search_page(): void
    {
        $response = $this->get('/track/t/token-rusak');

        $response->assertRedirect(route('landing.track'));
    }
}
