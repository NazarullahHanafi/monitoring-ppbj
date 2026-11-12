<?php

namespace App\Services;

use App\Models\Sp;
use App\Models\Spph;
use App\Models\Torpr;
use App\Support\ProcurementDocumentSearch;
use App\Support\ProcurementSearchText;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/** Live business context; never infer creators or awarded vendors from OCR text. */
class ProcurementSearchContext
{
    public function apply(Builder $query, array $filters): void
    {
        if (isset($filters['pr_id'])) {
            $query->where('ppbj.id', (int) $filters['pr_id']);
        }
        foreach (['buyer', 'vendor', 'creator'] as $field) {
            $value = trim((string) ($filters[$field] ?? ''));
            if ($value === '') {
                continue;
            }
            // Literal contains matching for names, bounded independently from OCR tokens.
            $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $value).'%';
            if ($field === 'buyer') {
                $query->whereRaw("ppbj.buyer LIKE ? ESCAPE '!'", [$pattern]);
            } elseif ($field === 'creator') {
                $tors = Torpr::query()->selectRaw('1')->whereRaw(ProcurementDocumentSearch::legacyReference(Torpr::query(), 'torprs'))
                    ->whereHas('createdBy', fn ($user) => $user->whereRaw("name LIKE ? ESCAPE '!'", [$pattern]));
                $query->whereExists($tors->toBase());
            } else {
                $query->where(function ($vendors) use ($pattern) {
                    $vendors->whereRaw("ppbj.penyedia_eksternal LIKE ? ESCAPE '!'", [$pattern]);
                    foreach (['sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
                        $table = (new $class)->getTable();
                        $documents = $class::query()->selectRaw('1')->where(function ($names) use ($table, $kind, $pattern) {
                            $names->whereRaw($table.".nama_vendor LIKE ? ESCAPE '!'", [$pattern]);
                            if ($kind === 'spph') {
                                // Search decoded JSON values, not JSON's escaped quotes/Unicode.
                                $json = "CASE WHEN JSON_VALID({$table}.vendor_names) THEN {$table}.vendor_names ELSE '[]' END";
                                if ($names->getConnection()->getDriverName() === 'mysql') {
                                    $names->orWhereRaw("JSON_SEARCH({$json}, 'one', CONVERT(? USING utf8mb4) COLLATE utf8mb4_unicode_ci, '!', '$[*]') IS NOT NULL", [$pattern]);
                                } else {
                                    $names->orWhereExists(fn ($candidate) => $candidate->selectRaw('1')->fromRaw("json_each({$json}) AS context_vendor")
                                        ->where('context_vendor.type', 'text')->whereRaw("context_vendor.value LIKE ? ESCAPE '!'", [$pattern]));
                                }
                            }
                        })->where(function ($links) use ($class, $table, $kind) {
                            $links->whereExists(fn ($pivot) => $pivot->selectRaw('1')->from($kind.'_ppbj')
                                ->whereColumn($kind.'_ppbj.'.$kind.'_id', $table.'.id')->whereColumn($kind.'_ppbj.ppbj_id', 'ppbj.id'))
                                ->orWhereRaw(ProcurementDocumentSearch::legacyReference($class::query(), $table));
                        });
                        $vendors->orWhereExists($documents->toBase());
                    }
                });
            }
        }
    }

    public function forPrs(Collection $prs): array
    {
        if ($prs->isEmpty()) {
            return [];
        }
        $provenance = collect(app(ProcurementProvenanceService::class)->forPrs($prs))
            ->keyBy(fn ($row) => mb_strtolower(trim($row['number'])));
        $documents = [];
        foreach (['sp' => Sp::class, 'spph' => Spph::class] as $kind => $class) {
            $table = (new $class)->getTable();
            $number = $kind === 'sp' ? 'nomor_sp' : 'nomor_spph';
            $date = $kind === 'sp' ? 'tanggal_sp' : 'tanggal';
            $columns = ['ppbj.id as ppbj_id', $table.'.id', $table.'.'.$number.' as number', $table.'.nama_vendor as vendor', $table.'.pic', $table.'.'.$date.' as date'];
            $base = $class::query()->whereIn('ppbj.id', $prs->modelKeys())->select($columns)
                ->selectRaw($kind === 'spph' ? $table.'.vendor_names as candidates' : 'NULL as candidates');
            $pivot = (clone $base)->join($kind.'_ppbj as context_link', 'context_link.'.$kind.'_id', '=', $table.'.id')->join('ppbj', 'ppbj.id', '=', 'context_link.ppbj_id');
            $legacy = (clone $base)->join('ppbj', fn ($join) => $join->whereRaw(ProcurementDocumentSearch::legacyReference($class::query(), $table)))
                ->whereNotExists(fn ($link) => $link->selectRaw('1')->from($kind.'_ppbj')
                    ->whereColumn($kind.'_ppbj.'.$kind.'_id', $table.'.id')->whereColumn($kind.'_ppbj.ppbj_id', 'ppbj.id'));
            // Bound rows in SQL when legacy and grouped links coexist; no N+1 queries.
            $ranked = DB::query()->fromSub($pivot->unionAll($legacy)->toBase(), 'context_documents')->select('*')
                ->selectRaw('ROW_NUMBER() OVER (PARTITION BY ppbj_id ORDER BY date DESC, id DESC) AS context_rank');
            $documents[$kind] = DB::query()->fromSub($ranked, 'ranked_context')->where('context_rank', '<=', 6)->orderBy('ppbj_id')->orderBy('context_rank')->get()->groupBy('ppbj_id');
        }

        return $prs->mapWithKeys(function ($pr) use ($provenance, $documents) {
            $info = $provenance->get(mb_strtolower(trim($pr->ppbj_no)));
            $related = [];
            $truncated = false;
            foreach ($documents as $kind => $groups) {
                $rows = $groups->get($pr->id, collect());
                $truncated = $truncated || $rows->count() > 5;
                foreach ($rows->take(5) as $row) {
                    $candidates = json_decode($row->candidates ?? '[]', true);
                    $vendors = collect(array_merge([$row->vendor], is_array($candidates) ? $candidates : []))
                        ->filter(fn ($name) => is_string($name) && trim($name) !== '')->unique()->take(20)
                        ->map(fn ($name) => mb_substr(ProcurementSearchText::plain($name), 0, 240))->values()->all();
                    $related[] = ['kind' => $kind, 'number' => $row->number, 'vendors' => $vendors,
                        'pic' => $row->pic, 'date' => $row->date];
                }
            }

            return [$pr->id => ['buyer' => $pr->buyer, 'vendor' => $pr->penyedia_eksternal,
                'creator' => $info['creator'] ?? 'Pembuat TOR/PR belum dapat ditelusuri',
                'recorded_at' => $pr->getRawOriginal('tgl_ppbj'), 'status' => $pr->status,
                'progress' => $pr->progres, 'registration' => $pr->general_registration_number,
                'documents' => $related, 'documents_truncated' => $truncated, 'provenance' => $info]];
        })->all();
    }

    public function torMetadata(Collection $prs): Collection
    {
        return Torpr::query()->whereIn('nomor_pr', $prs->pluck('ppbj_no'))->select([
            'id', 'nomor_pr', 'tujuan_pengadaan', 'portofolio', 'created_by_user_id',
        ])->with('createdBy:id,name')->get()->mapWithKeys(fn ($tor) => [mb_strtolower(trim($tor->nomor_pr)) => ProcurementSearchText::plain(implode(' ', [$tor->createdBy?->name, $tor->portofolio, $tor->tujuan_pengadaan]))]);
    }
}
