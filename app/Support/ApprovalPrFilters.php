<?php

namespace App\Support;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ApprovalPrFilters
{
    public static function fromRequest(Request $request): array
    {
        $values = $request->validate([
            'q' => 'nullable|string|max:160',
            'status' => 'nullable|string|max:20',
            'portofolio' => 'nullable|string|max:255',
            'dari' => 'nullable|date_format:Y-m-d',
            'sampai' => ['nullable', 'date_format:Y-m-d', ...($request->filled('dari') ? ['after_or_equal:dari'] : [])],
            'submission' => 'nullable|in:first,resubmit',
            'nilai_min' => 'nullable|numeric|min:0|max:9999999999999999.99|decimal:0,2',
            'nilai_max' => ['nullable', 'numeric', 'min:0', 'max:9999999999999999.99', 'decimal:0,2', ...($request->filled('nilai_min') ? ['gte:nilai_min'] : [])],
        ], [
            'nilai_max.gte' => 'Nilai PR maksimum harus lebih besar atau sama dengan nilai PR minimum.',
        ], [
            'nilai_min' => 'nilai PR minimum',
            'nilai_max' => 'nilai PR maksimum',
        ]);
        $status = strtoupper(trim($values['status'] ?? 'PENDING'));

        return [
            'q' => preg_replace('/\s+/u', ' ', trim($values['q'] ?? '')) ?? '',
            'status' => in_array($status, ['PENDING', 'APPROVED', 'REJECTED', 'ALL'], true) ? $status : 'PENDING',
            'portofolio' => trim($values['portofolio'] ?? ''),
            'dari' => $values['dari'] ?? '',
            'sampai' => $values['sampai'] ?? '',
            'submission' => $values['submission'] ?? '',
            'nilai_min' => $values['nilai_min'] ?? '',
            'nilai_max' => $values['nilai_max'] ?? '',
        ];
    }

    public static function apply(Builder $query, array $filters): Builder
    {
        $table = $query->getModel()->getTable();
        if ($filters['status'] !== 'ALL') {
            $query->where($table.'.status', $filters['status']);
        }
        if ($filters['portofolio'] !== '') {
            $query->whereHas('torpr', fn ($pr) => $pr->where('portofolio', $filters['portofolio']));
        }
        if ($filters['nilai_min'] !== '' || $filters['nilai_max'] !== '') {
            $query->whereHas('torpr', function ($pr) use ($filters): void {
                if ($filters['nilai_min'] !== '') {
                    $pr->where('jumlah_pr', '>=', $filters['nilai_min']);
                }
                if ($filters['nilai_max'] !== '') {
                    $pr->where('jumlah_pr', '<=', $filters['nilai_max']);
                }
            });
        }
        // Keep the timestamp column usable by an index, including the entire end date.
        if ($filters['dari'] !== '') {
            $query->where($table.'.requested_at', '>=', $filters['dari'].' 00:00:00');
        }
        if ($filters['sampai'] !== '') {
            $query->where($table.'.requested_at', '<', Carbon::parse($filters['sampai'])->addDay()->format('Y-m-d').' 00:00:00');
        }
        if ($filters['submission'] === 'first') {
            $query->whereNull($table.'.previous_rejection_id');
        } elseif ($filters['submission'] === 'resubmit') {
            $query->whereNotNull($table.'.previous_rejection_id');
        }

        // Every word must match; words can appear in different fields and in any order.
        // Six groups bound query size; remaining words form one phrase rather than being discarded.
        foreach ($filters['q'] === '' ? [] : explode(' ', $filters['q'], 6) as $word) {
            $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $word).'%';
            $query->where(function ($match) use ($table, $pattern): void {
                foreach (['requested_name', 'rejected_reason', 'resubmit_notes'] as $column) {
                    $match->orWhereRaw($table.'.'.$column." LIKE ? ESCAPE '!'", [$pattern]);
                }
                $match->orWhereHas('torpr', fn ($pr) => self::matchColumns($pr, ['nomor_pr', 'tujuan_pengadaan', 'portofolio'], $pattern));
                $match->orWhereHas('requestedBy', fn ($user) => self::matchColumns($user, ['name', 'email', 'department'], $pattern));
                // Search only the actor who actually processed this particular decision.
                $match->orWhere(function ($approved) use ($table, $pattern): void {
                    $approved->where($table.'.status', 'APPROVED')->whereHas('approvedBy', fn ($user) => self::matchColumns($user, ['name'], $pattern));
                });
                $match->orWhere(function ($rejected) use ($table, $pattern): void {
                    $rejected->where($table.'.status', 'REJECTED')->whereHas('rejectedBy', fn ($user) => self::matchColumns($user, ['name'], $pattern));
                });
            });
        }

        return $query;
    }

    private static function matchColumns(Builder $query, array $columns, string $pattern): void
    {
        $query->where(function ($fields) use ($columns, $pattern): void {
            foreach ($columns as $column) {
                $fields->orWhereRaw($fields->getModel()->getTable().'.'.$column." LIKE ? ESCAPE '!'", [$pattern]);
            }
        });
    }

    public static function statusLabel(string $status): string
    {
        return match ($status) {
            'ALL' => 'Semua status',
            'APPROVED' => 'Sudah Disetujui',
            'REJECTED' => 'Ditolak',
            default => 'Belum Approval / Menunggu',
        };
    }

    public static function summary(array $filters): string
    {
        $parts = ['Status: '.self::statusLabel($filters['status']), 'Pencarian: '.($filters['q'] !== '' ? $filters['q'] : 'Semua')];
        if ($filters['portofolio'] !== '') {
            $parts[] = 'Portofolio: '.$filters['portofolio'];
        }
        if ($filters['dari'] !== '' || $filters['sampai'] !== '') {
            $parts[] = 'Waktu pengajuan: '.($filters['dari'] ?: 'Awal').' s.d. '.($filters['sampai'] ?: 'Sekarang');
        }
        if ($filters['submission'] !== '') {
            $parts[] = $filters['submission'] === 'first' ? 'Pengajuan pertama' : 'Pengajuan ulang';
        }
        if ($filters['nilai_min'] !== '') {
            $parts[] = 'Nilai PR minimum: Rp '.number_format((float) $filters['nilai_min'], 2, ',', '.');
        }
        if ($filters['nilai_max'] !== '') {
            $parts[] = 'Nilai PR maksimum: Rp '.number_format((float) $filters['nilai_max'], 2, ',', '.');
        }

        return implode(' · ', $parts);
    }
}
