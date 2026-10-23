<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

final class PpbjListFilters
{
    public const SEARCH_COLUMNS = ['uraian', 'ppbj_no', 'awarding_sp', 'sph', 'spph_rfq_1', 'do_no', 'bpg_no', 'bpb_no', 'no_invoice', 'general_registration_number'];

    public static function values(Request $request, string $key): array
    {
        $values = $request->input($key, []);
        $values = is_array($values) ? $values : [$values];
        if (count($values) > 50 || collect($values)->contains(fn ($value) => ! is_scalar($value) || mb_strlen((string) $value) > 5200)) {
            throw ValidationException::withMessages([$key => 'Pilih maksimal 50 pilihan yang valid.']);
        }

        return collect($values)->map(fn ($value) => trim((string) $value))->filter(fn ($value) => $value !== '')->unique()->values()->all();
    }

    public static function money(Request $request): ?array
    {
        $input = (string) $request->input('amount', '');
        $explicit = trim($input) !== '';
        $withText = false;
        if (! $explicit) {
            $input = (string) $request->input('search', '');
            if (! preg_match('/\b(rp|rupiah|nilai|juta|jt|miliar|milyar|milyard|triliun|ribu|rb)\b/u', mb_strtolower($input))) {
                if (! preg_match('/^(?:[1-9]\d{3,}|\d{1,3}(?:[.,]\d{3})+(?:,\d{1,2})?)$/', trim($input))) {
                    return null;
                }
                $withText = true;
            }
        }
        $criteria = PpbjMoneySearch::parse($input);
        if ($explicit && $criteria === null) {
            throw ValidationException::withMessages(['amount' => 'Nominal belum dikenali. Contoh: 8,375 juta, minimal 8 miliar, atau 8–10 juta.']);
        }
        if ($criteria !== null) {
            $fields = self::values($request, 'amount_fields');
            if (array_diff($fields, array_keys(PpbjMoneySearch::FIELDS))) {
                throw ValidationException::withMessages(['amount_fields' => 'Pilih nilai PR, SP atau BPG.']);
            }
            $criteria['fields'] = $fields ?: ($criteria['field'] ? [$criteria['field']] : array_keys(PpbjMoneySearch::FIELDS));
            $criteria['from_search'] = ! $explicit;
            $criteria['with_text'] = $withText;
        }

        return $criteria;
    }

    public static function apply($query, Request $request, callable $statusFilter): void
    {
        $money = self::money($request);
        $search = trim((string) $request->input('search', $request->input('uraian', '')));
        if ($money['with_text'] ?? false) {
            $query->where(function ($part) use ($search, $money) {
                foreach (self::SEARCH_COLUMNS as $column) {
                    $part->orWhere($column, 'like', '%'.$search.'%');
                }
                $part->orWhere(fn ($numeric) => PpbjMoneySearch::apply($numeric, $money, $money['fields']));
            });
        }
        if ($search !== '' && ! ($money['from_search'] ?? false)) {
            $query->where(function ($part) use ($search) {
                foreach (self::SEARCH_COLUMNS as $column) {
                    $part->orWhere($column, 'like', '%'.$search.'%');
                }
            });
        }
        if ($money && ! $money['with_text']) {
            PpbjMoneySearch::apply($query, $money, $money['fields']);
        }
        foreach (['portofolio', 'buyer'] as $field) {
            if ($values = self::values($request, $field)) {
                $query->whereIn($field, $values);
            }
        }
        if ($vendors = self::values($request, 'penyedia_eksternal')) {
            $query->where(function ($part) use ($vendors) {
                foreach ($vendors as $vendor) {
                    $part->orWhere(fn ($item) => PpbjVendorFilter::apply($item, $vendor));
                }
            });
        }
        $registrations = array_intersect(self::values($request, 'general_registration'), ['registered', 'unregistered']);
        if (count($registrations) === 1) {
            $query->where(function ($part) use ($registrations) {
                if (reset($registrations) === 'registered') {
                    $part->whereNotNull('general_registration_number')->where('general_registration_number', '!=', '');
                } else {
                    $part->whereNull('general_registration_number')->orWhere('general_registration_number', '');
                }
            });
        }
        $statuses = array_intersect(self::values($request, 'status_sla'), ['ON TRACK', 'WARNING', 'JATUH TEMPO', 'OVERDUE', 'LENGKAP', 'BELUM DIHITUNG', 'CANCELLED']);
        if ($statuses) {
            $query->where(function ($part) use ($statuses, $statusFilter) {
                foreach ($statuses as $status) {
                    $part->orWhere(fn ($item) => $statusFilter($item, $status));
                }
            });
        }
        $ranges = ['0' => [0, 0], '1-20' => [1, 20], '21-40' => [21, 40], '41-60' => [41, 60], '61-80' => [61, 80], '81-99' => [81, 99], '100' => [100, 100]];
        $progress = array_intersect(self::values($request, 'progress'), array_keys($ranges));
        if ($progress) {
            $query->where(function ($part) use ($progress, $ranges) {
                foreach ($progress as $value) {
                    $part->orWhereBetween('progres', $ranges[$value]);
                }
            });
        }
    }
}
