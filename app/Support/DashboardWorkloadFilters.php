<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

final class DashboardWorkloadFilters
{
    /** Resolve equivalent form inputs to one date range and one cache identity. */
    public static function fromRequest(Request $request): array
    {
        $rules = [
            'bw_filter' => ['nullable', Rule::in(['all', 'today', 'week', 'month', 'year', 'custom'])],
            'bw_bulan' => ['nullable', 'integer', 'between:1,12'],
            'bw_tahun' => ['nullable', 'integer', 'between:1900,9999'],
            'bw_tgl_dari' => ['nullable', 'date_format:Y-m-d'],
            'bw_tgl_sampai' => ['nullable', 'date_format:Y-m-d'],
        ];
        if ($request->filled('bw_tgl_dari')) {
            $rules['bw_tgl_sampai'][] = 'after_or_equal:bw_tgl_dari';
        }
        $values = $request->validate($rules);
        $mode = $values['bw_filter'] ?? 'all';
        $now = now();
        $year = (int) ($values['bw_tahun'] ?? $now->year);
        $month = (int) ($values['bw_bulan'] ?? $now->month);
        [$from, $through] = match ($mode) {
            'today' => [$now->copy(), $now->copy()],
            'week' => [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()],
            'month' => [Carbon::create($year, $month, 1), Carbon::create($year, $month, 1)->endOfMonth()],
            'year' => [Carbon::create($year, 1, 1), Carbon::create($year, 12, 31)],
            'custom' => [filled($values['bw_tgl_dari'] ?? null) ? Carbon::parse($values['bw_tgl_dari']) : null,
                filled($values['bw_tgl_sampai'] ?? null) ? Carbon::parse($values['bw_tgl_sampai']) : null],
            default => [null, null],
        };

        return [
            'mode' => $mode,
            'from' => $from?->format('Y-m-d'),
            // An exclusive next-day boundary works with DATE and DATETIME columns.
            'until' => $through?->copy()->addDay()->format('Y-m-d'),
        ];
    }
}
