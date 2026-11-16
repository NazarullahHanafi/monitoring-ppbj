<?php

namespace App\Support;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

final class PpbjReportFilters
{
    private function __construct(
        public readonly string $period,
        public readonly ?CarbonImmutable $from,
        public readonly ?CarbonImmutable $until,
        public readonly array $portofolios,
        public readonly array $vendors,
        public readonly int $page,
        public readonly int $perPage,
    ) {}

    public static function fromRequest(Request $request): self
    {
        $input = $request->only(['period', 'start_date', 'end_date', 'page', 'per_page']);
        $input['period'] ??= 'monthly';
        foreach (['portofolio', 'vendor'] as $key) {
            $value = $request->input($key, $request->input($key.'s', []));
            // Legacy comma-separated scalar filters remain supported. Array
            // selections are literal names, including vendor names with commas.
            $input[$key] = is_string($value) ? explode(',', $value) : ($value ?? []);
        }
        $period = $input['period'];
        $formats = match ($period) {
            'monthly' => ['Y-m', 'Y-m-d'],
            'yearly' => ['Y', 'Y-m-d'],
            default => ['Y-m-d'],
        };
        $validated = Validator::make($input, [
            'period' => ['bail', 'required', 'string', Rule::in(['daily', 'monthly', 'yearly', 'custom'])],
            'start_date' => ['bail', 'required_if:period,custom', 'nullable', 'string', 'max:10', 'date_format:'.implode(',', $formats)],
            'end_date' => ['bail', 'required_if:period,custom', 'nullable', 'string', 'date_format:Y-m-d', Rule::when($period === 'custom', ['after_or_equal:start_date'])],
            'portofolio' => ['array', 'max:100'],
            'portofolio.*' => ['nullable', 'string', 'max:255'],
            'vendor' => ['array', 'max:100'],
            'vendor.*' => ['nullable', 'string', 'max:255'],
            'page' => ['nullable', 'integer', 'min:1', 'max:1000000'],
            'per_page' => ['nullable', 'integer', Rule::in([25, 50, 100])],
        ], [
            'start_date.date_format' => 'Tanggal atau periode awal belum valid.',
            'end_date.date_format' => 'Tanggal akhir belum valid.',
            'end_date.after_or_equal' => 'Tanggal akhir harus sama dengan atau setelah tanggal awal.',
        ])->validate();

        $from = $until = null;
        if (! empty($validated['start_date'])) {
            $value = $validated['start_date'];
            $format = match (strlen($value)) {
                4 => 'Y', 7 => 'Y-m', default => 'Y-m-d'
            };
            $from = CarbonImmutable::createFromFormat('!'.$format, $value, config('app.timezone'));
            if ($from->year < 1000 || $from->year > 9998) {
                throw ValidationException::withMessages(['start_date' => 'Gunakan tahun antara 1000 dan 9998.']);
            }
            $from = match ($period) {
                'monthly' => $from->startOfMonth(),
                'yearly' => $from->startOfYear(),
                default => $from->startOfDay(),
            };
            $until = match ($period) {
                'monthly' => $from->addMonth(),
                'yearly' => $from->addYear(),
                'custom' => CarbonImmutable::createFromFormat('!Y-m-d', $validated['end_date'], config('app.timezone'))->addDay(),
                default => $from->addDay(),
            };
            if ($until->year > 9999) {
                throw ValidationException::withMessages(['end_date' => 'Tanggal akhir di luar jangkauan yang didukung.']);
            }
        }
        $values = static fn (string $key) => collect($validated[$key])->map(fn ($value) => trim((string) $value))
            ->filter(fn ($value) => $value !== '')->unique()->values()->all();

        return new self($period, $from, $until, $values('portofolio'), $values('vendor'),
            (int) ($validated['page'] ?? 1), (int) ($validated['per_page'] ?? 50));
    }

    public function apply(Builder $query): Builder
    {
        if ($this->from) {
            $query->where('created_at', '>=', $this->from)->where('created_at', '<', $this->until);
        }
        if ($this->portofolios) {
            $query->whereIn('portofolio', $this->portofolios);
        }
        if ($this->vendors) {
            $query->whereIn('penyedia_eksternal', $this->vendors);
        }

        return $query;
    }
}
