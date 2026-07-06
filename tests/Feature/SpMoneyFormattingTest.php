<?php

namespace Tests\Feature;

use App\Http\Controllers\SpController;
use PHPUnit\Framework\Attributes\DataProvider;
use ReflectionMethod;
use Tests\TestCase;

class SpMoneyFormattingTest extends TestCase
{
    #[DataProvider('moneyProvider')]
    public function test_sp_controller_parses_large_money_values_safely($input, float $expected): void
    {
        $controller = app(SpController::class);
        $method = new ReflectionMethod($controller, 'moneyToFloat');
        $method->setAccessible(true);

        $this->assertSame($expected, $method->invoke($controller, $input));
    }

    public function test_terbilang_keeps_miliar_for_formatted_money_strings(): void
    {
        $controller = app(SpController::class);
        $method = new ReflectionMethod($controller, 'terbilang');
        $method->setAccessible(true);

        $this->assertStringContainsString(
            'Miliar',
            $method->invoke($controller, '1.234.567.890')
        );

        $this->assertSame(
            'Enam Puluh Enam Juta Enam Ratus Ribu',
            $method->invoke($controller, '66.600.000')
        );
    }

    public function test_sp_controller_formats_large_money_values_with_indonesian_separator(): void
    {
        $controller = app(SpController::class);
        $method = new ReflectionMethod($controller, 'formatMoney');
        $method->setAccessible(true);

        $this->assertSame('1.234.567.890', $method->invoke($controller, '1.234.567.890'));
        $this->assertSame('1.234.567.890', $method->invoke($controller, '1234567890.00'));
    }

    public static function moneyProvider(): array
    {
        return [
            'formatted billion' => ['1.234.567.890', 1234567890.0],
            'decimal database billion' => ['1234567890.00', 1234567890.0],
            'indonesian decimal' => ['1.234.567.890,50', 1234567890.5],
            'jampel formatted' => ['66.600.000', 66600000.0],
        ];
    }
}
