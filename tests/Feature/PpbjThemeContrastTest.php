<?php

namespace Tests\Feature;

use Tests\TestCase;

class PpbjThemeContrastTest extends TestCase
{
    public function test_table_status_badges_use_semantic_tones_instead_of_dynamic_tailwind_colors(): void
    {
        $view = file_get_contents(resource_path('views/ppbj/index.blade.php'));
        $script = file_get_contents(public_path('assets/ppbj/ppbj.js'));

        $this->assertStringContainsString('data-status-tone="{{ $statusTone }}"', $view);
        $this->assertStringContainsString("\$statusTone = 'on-track'", $view);
        $this->assertStringContainsString("\$statusTone = 'complete'", $view);
        $this->assertStringContainsString("\$statusTone = 'warning'", $view);
        $this->assertStringContainsString("\$statusTone = 'due'", $view);
        $this->assertStringContainsString("\$statusTone = 'overdue'", $view);
        $this->assertStringContainsString("badge.dataset.statusTone = 'cancelled'", $script);
        $this->assertStringNotContainsString('{{ $statusColor }}', $view);
    }

    public function test_every_status_tone_has_explicit_light_and_dark_contrast_rules(): void
    {
        $style = file_get_contents(public_path('assets/ppbj/ppbj.css'));

        foreach (['on-track', 'complete', 'warning', 'due', 'overdue', 'neutral', 'cancelled'] as $tone) {
            $selector = ".status-badge[data-status-tone=\"{$tone}\"]";

            $this->assertStringContainsString($selector, $style);
            $this->assertStringContainsString("html.dark {$selector}", $style);
        }

        $this->assertStringContainsString('background-color: #047857 !important;', $style);
        $this->assertStringContainsString('color: #ffffff !important;', $style);
    }
}
