<?php

namespace App\Services;

use App\Models\Ppbj;
use Illuminate\Support\Facades\DB;

final class PpbjDocumentNumberSync
{
    /** Update only explicit links to this PPBJ, never every document with the old number. */
    public function sync(Ppbj $ppbj, string $previousNumber, array $previousReferences = []): array
    {
        $number = (string) $ppbj->ppbj_no;
        if ($number === $previousNumber || trim($previousNumber) === '') {
            return [];
        }
        if (DB::transactionLevel() < 1) {
            throw new \LogicException('Renumbering linked documents requires a transaction.');
        }

        $changed = [];
        foreach (['sp' => ['sps', 'sp_ppbj', 'sp_id', 'nomor_sp', 'awarding_sp'],
            'spph' => ['spphs', 'spph_ppbj', 'spph_id', 'nomor_spph', 'spph_rfq_1']] as $kind => [$table, $pivot, $foreignKey, $documentNumber, $referenceField]) {
            $reference = $previousReferences[$referenceField] ?? $ppbj->$referenceField;
            $rows = DB::table($table)->where('nomor_pr', $previousNumber)
                ->where(function ($query) use ($ppbj, $table, $pivot, $foreignKey, $documentNumber, $reference) {
                    $query->whereExists(fn ($link) => $link->selectRaw('1')->from($pivot)
                        ->whereColumn($pivot.'.'.$foreignKey, $table.'.id')->where($pivot.'.ppbj_id', $ppbj->id));
                    if (filled($reference)) {
                        $query->orWhere($documentNumber, $reference);
                    }
                })->orderBy('id')->lockForUpdate()->get(['id', $documentNumber]);
            if ($rows->isEmpty()) {
                continue;
            }
            DB::table($table)->whereIn('id', $rows->pluck('id'))->where('nomor_pr', $previousNumber)
                ->update(['nomor_pr' => $number, 'updated_at' => now()]);
            $changed[$kind] = $rows->map(fn ($row) => ['id' => $row->id, 'number' => $row->$documentNumber])->all();
        }

        DB::table('activity_logs')->insert([
            'user_id' => auth()->id(), 'model_type' => Ppbj::class, 'model_id' => $ppbj->id,
            'action' => 'pr_number_corrected', 'description' => 'Nomor PR/PPBJ dan referensi dokumen terkait diselaraskan.',
            'changes' => json_encode(['previous_number' => $previousNumber, 'number' => $number, 'documents' => $changed], JSON_THROW_ON_ERROR),
            'created_at' => now(), 'updated_at' => now(),
        ]);

        return $changed;
    }
}
