<?php

namespace Tests\Unit;

use App\Support\LetterheadLayout;
use PHPUnit\Framework\TestCase;

class LetterheadLayoutTest extends TestCase
{
    public function test_professional_body_spacing_is_shared_by_sp_and_spph_generators(): void
    {
        $this->assertSame(2250, LetterheadLayout::BODY_TOP_TWIPS);

        $spSource = file_get_contents(dirname(__DIR__, 2).'/app/Http/Controllers/SpController.php');
        $spphSource = file_get_contents(dirname(__DIR__, 2).'/app/Http/Controllers/SpphController.php');

        $this->assertNotFalse($spSource);
        $this->assertNotFalse($spphSource);
        $this->assertStringNotContainsString("'marginTop' => 1750", $spSource);
        $this->assertStringNotContainsString("'marginTop' => 2500", $spSource);
        $this->assertStringNotContainsString('w:top="1750"', $spSource);
        $this->assertStringNotContainsString("'marginTop' => 1900", $spphSource);
        $this->assertGreaterThanOrEqual(8, substr_count($spSource, 'LetterheadLayout::BODY_TOP_TWIPS'));
        $this->assertStringContainsString('LetterheadLayout::BODY_TOP_TWIPS', $spphSource);
    }
}
