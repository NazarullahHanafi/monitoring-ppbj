<?php

namespace App\Support;

use App\Models\Sp;
use App\Models\Spph;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/** Shared by the document list and export; attachment text is searched only after review. */
class ProcurementDocumentSearch
{
    public static function term(Request $request): string
    {
        $request->validate(['search' => 'nullable|string|max:160']);

        return preg_replace('/\s+/u', ' ', trim((string) $request->input('search', ''))) ?? '';
    }

    private static function tokens(string $term): array
    {
        // Bound query complexity without dropping words: the last part remains a phrase.
        return $term === '' ? [] : explode(' ', $term, 6);
    }

    private static function pattern(string $token): string
    {
        return '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $token).'%';
    }

    private static function like($query, string $column, string $pattern, string $boolean = 'and'): void
    {
        // Column names originate only from the model/configuration below, never user input.
        $query->whereRaw($column." LIKE ? ESCAPE '!'", [$pattern], $boolean);
    }

    public static function apply(Builder $query, string $term): Builder
    {
        if ($term === '' || !config('procurement_search.enabled')) return self::native($query, $term);
        $model = $query->getModel();
        if (!$model instanceof Sp && !$model instanceof Spph) throw new \InvalidArgumentException('Unsupported procurement document.');
        $sp = $model instanceof Sp;
        $table = $model->getTable();
        $pivot = $sp ? 'sp_ppbj' : 'spph_ppbj';
        $key = $sp ? 'sp_id' : 'spph_id';
        $matches = app(\App\Services\ProcurementUnifiedSearch::class)->prIds($term);
        $legacy = self::legacyReference($query, $table);
        $query->where(function ($combined) use ($term, $table, $pivot, $key, $matches, $legacy) {
            $combined->where(fn ($native) => self::native($native, $term));
            $combined->orWhereIn($table.'.id', DB::table($pivot)->select($key)->whereIn('ppbj_id', clone $matches));
            $combined->orWhereExists(fn ($pr) => $pr->selectRaw('1')->from('ppbj')->whereRaw($legacy)->whereIn('ppbj.id', clone $matches));
        });
        return $query;
    }

    private static function native(Builder $query, string $term): Builder
    {
        if ($term === '') {
            return $query;
        }
        $sp = $query->getModel() instanceof Sp;
        if (! $sp && ! ($query->getModel() instanceof Spph)) {
            throw new \InvalidArgumentException('Unsupported procurement document.');
        }
        $table = $query->getModel()->getTable();
        $itemTable = $sp ? 'sp_items' : 'spph_items';
        $foreignKey = $sp ? 'sp_id' : 'spph_id';
        $legacyReference = self::legacyReference($query, $table);
        $columns = [$sp ? 'nomor_sp' : 'nomor_spph', 'nomor_pr', 'nama_vendor', 'deskripsi_pengadaan'];
        if (! $sp) {
            $columns[] = 'vendor_names';
        }

        foreach (self::tokens($term) as $token) {
            $pattern = self::pattern($token);
            $query->where(function ($match) use ($columns, $table, $itemTable, $foreignKey, $pattern, $legacyReference) {
                foreach ($columns as $column) {
                    self::like($match, $table.'.'.$column, $pattern, 'or');
                }
                $match->orWhereExists(function ($items) use ($table, $itemTable, $foreignKey, $pattern) {
                    $items->selectRaw('1')->from($itemTable)->whereColumn($itemTable.'.'.$foreignKey, $table.'.id');
                    self::like($items, $itemTable.'.nama_barang', $pattern);
                });
                $match->orWhereExists(function ($attachments) use ($table, $pattern) {
                    $attachments->selectRaw('1')->from('procurement_detail_attachments')
                        ->where('kind', $table === 'sps' ? 'sp' : 'spph')
                        ->whereColumn('document_id', $table.'.id')->whereNotNull('reviewed_at');
                    self::like($attachments, 'reviewed_text', $pattern);
                });
                $prMatch = function ($pr) use ($pattern) {
                    $pr->where(function ($fields) use ($pattern) {
                        self::like($fields, 'ppbj.ppbj_no', $pattern);
                        self::like($fields, 'ppbj.uraian', $pattern, 'or');
                    });
                };
                // All grouped PRs, not just the first one stored in nomor_pr.
                $match->orWhereHas('ppbjs', $prMatch);
                // Older documents may have a scalar PR reference without a pivot row.
                $match->orWhereExists(function ($legacy) use ($legacyReference, $prMatch) {
                    $legacy->selectRaw('1')->from('ppbj')->whereRaw($legacyReference);
                    $prMatch($legacy);
                });
            });
        }

        return $query;
    }

    public static function legacyReference(Builder $query, string $table): string
    {
        $connection = $query->getModel()->getConnection();
        if ($connection->getDriverName() !== 'mysql') {
            return 'ppbj.ppbj_no = '.$table.'.nomor_pr';
        }
        // Legacy production tables have different collations. Convert the OUTER
        // value only, leaving the unique indexed ppbj_no column untouched.
        $collation = Cache::remember('procurement-search:pr-collation:'.sha1($connection->getDatabaseName()), 86400,
            fn () => $connection->select("SHOW FULL COLUMNS FROM ppbj WHERE Field = 'ppbj_no'")[0]->Collation);
        if (! is_string($collation) || ! preg_match('/^[a-zA-Z0-9_]+$/D', $collation)) {
            throw new \LogicException('Invalid PR reference collation.');
        }
        $charset = explode('_', $collation)[0];

        return "ppbj.ppbj_no = CONVERT({$table}.nomor_pr USING {$charset}) COLLATE {$collation}";
    }

    public static function attachmentHints(Collection $documents, string $term, bool $sp): array
    {
        if ($term === '' || $documents->isEmpty()) {
            return [];
        }
        $rows = DB::table('procurement_detail_attachments')->where('kind', $sp ? 'sp' : 'spph')
            ->whereIn('document_id', $documents->modelKeys())->whereNotNull('reviewed_at')
            ->where(function ($query) use ($term) {
                foreach (self::tokens($term) as $token) {
                    self::like($query, 'reviewed_text', self::pattern($token), 'or');
                }
            })->select('id', 'document_id', 'original_name', 'reviewed_text')->orderBy('created_at')->get();
        $hints = [];
        foreach ($rows as $row) {
            if (isset($hints[$row->document_id])) {
                continue;
            }
            $text = preg_replace('/\s+/u', ' ', $row->reviewed_text) ?? '';
            $start = 0;
            foreach (self::tokens($term) as $token) {
                if (($position = mb_stripos($text, $token)) !== false) {
                    $start = max(0, $position - 45);
                    break;
                }
            }
            $hints[$row->document_id] = ['name' => $row->original_name,
                'text' => ($start > 0 ? '…' : '').mb_substr($text, $start, 180).(mb_strlen($text) > $start + 180 ? '…' : '')];
        }

        return $hints;
    }

    /** One extra query for the ten displayed documents only; never load all items. */
    public static function itemHints(Collection $documents, string $term, bool $sp): array
    {
        if ($term === '' || $documents->isEmpty()) {
            return [];
        }
        $table = $sp ? 'sp_items' : 'spph_items';
        $key = $sp ? 'sp_id' : 'spph_id';
        $tokens = self::tokens($term);
        $rows = DB::table($table)->whereIn($key, $documents->modelKeys())
            ->where(function ($query) use ($tokens) {
                foreach ($tokens as $token) {
                    self::like($query, 'nama_barang', self::pattern($token), 'or');
                }
            })->select($key)->selectRaw('MIN(nama_barang) AS matched_item')->groupBy($key)->get();
        $hints = [];
        foreach ($rows as $row) {
            // Keep paragraph/list/line boundaries readable after removing rich-text tags.
            $markup = preg_replace('/<\/?(?:p|div|li|tr|td|h[1-6]|br)\b[^>]*>/iu', ' ', $row->matched_item) ?? '';
            $plain = trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($markup), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? '');
            $start = 0;
            foreach ($tokens as $token) {
                $position = mb_stripos($plain, $token);
                if ($position !== false) {
                    $start = max(0, $position - 45);
                    if ($start > 0) {
                        $wordBoundary = mb_strpos($plain, ' ', $start);
                        if ($wordBoundary !== false && $wordBoundary < $position) {
                            $start = $wordBoundary + 1;
                        }
                    }
                    break;
                }
            }
            $hints[$row->$key] = ($start > 0 ? '…' : '').mb_substr($plain, $start, 180)
                .(mb_strlen($plain) > $start + 180 ? '…' : '');
        }

        return $hints;
    }
}
