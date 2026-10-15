<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

final class PrNumberConflictService
{
    /**
     * Cari penggunaan nomor PR pada dokumen proses yang sudah tersimpan.
     *
     * Pemeriksaan dijalankan hanya ketika user menekan tombol Setujui. Semua
     * pencarian memakai equality pada kolom berindeks/unik agar tetap ringan.
     */
    public function inspect(string $prNumber, int $torprId, ?int $approvalId = null): array
    {
        $prNumber = trim($prNumber);

        if ($prNumber === '') {
            return $this->emptyResult($prNumber);
        }

        $sources = [];
        $ppbj = DB::table('ppbj')
            ->select(['id', 'ppbj_no', 'uraian', 'buyer', 'status'])
            ->where('ppbj_no', $prNumber)
            ->first();

        if ($ppbj) {
            $sources[] = [
                'key' => 'ppbj',
                'label' => 'Management PPBJ',
                'count' => 1,
                'records' => [[
                    'id' => (int) $ppbj->id,
                    'document_no' => (string) $ppbj->ppbj_no,
                    'description' => (string) ($ppbj->uraian ?: 'Data PPBJ sudah tersedia.'),
                    'meta' => trim(implode(' · ', array_filter([
                        $ppbj->buyer ? 'Buyer: '.$ppbj->buyer : null,
                        $ppbj->status ? 'Status: '.$ppbj->status : null,
                    ]))),
                ]],
            ];
        }

        $ppbjId = $ppbj ? (int) $ppbj->id : null;
        $spphIds = $this->linkedDocumentIds('spph_ppbj', 'spph_id', $ppbjId);
        $spIds = $this->linkedDocumentIds('sp_ppbj', 'sp_id', $ppbjId);

        $spphs = DB::table('spphs')
            ->select(['id', 'nomor_spph', 'nomor_pr', 'deskripsi_pengadaan', 'nama_vendor'])
            ->where(function ($query) use ($prNumber, $spphIds): void {
                $query->where('nomor_pr', $prNumber);
                if ($spphIds !== []) {
                    $query->orWhereIn('id', $spphIds);
                }
            })
            ->orderByDesc('id')
            ->limit(5)
            ->get();

        if ($spphs->isNotEmpty()) {
            $sources[] = [
                'key' => 'spph',
                'label' => 'Penomoran SPPH',
                'count' => $spphs->count(),
                'records' => $spphs->map(fn ($spph) => [
                    'id' => (int) $spph->id,
                    'document_no' => (string) $spph->nomor_spph,
                    'description' => (string) ($spph->deskripsi_pengadaan ?: 'Dokumen SPPH'),
                    'meta' => $spph->nama_vendor ? 'Vendor: '.$spph->nama_vendor : '',
                ])->values()->all(),
            ];
        }

        $sps = DB::table('sps')
            ->select(['id', 'nomor_sp', 'nomor_pr', 'deskripsi_pengadaan', 'nama_vendor'])
            ->where(function ($query) use ($prNumber, $spIds): void {
                $query->where('nomor_pr', $prNumber);
                if ($spIds !== []) {
                    $query->orWhereIn('id', $spIds);
                }
            })
            ->orderByDesc('id')
            ->limit(5)
            ->get();

        if ($sps->isNotEmpty()) {
            $sources[] = [
                'key' => 'sp',
                'label' => 'Penomoran SP',
                'count' => $sps->count(),
                'records' => $sps->map(fn ($sp) => [
                    'id' => (int) $sp->id,
                    'document_no' => (string) $sp->nomor_sp,
                    'description' => (string) ($sp->deskripsi_pengadaan ?: 'Dokumen SP/Kontrak'),
                    'meta' => $sp->nama_vendor ? 'Vendor: '.$sp->nama_vendor : '',
                ])->values()->all(),
            ];
        }

        $previousApproval = DB::table('pr_receipt_approvals')
            ->select(['id', 'approved_at'])
            ->where('torpr_id', $torprId)
            ->where('status', 'APPROVED')
            ->when($approvalId, fn ($query) => $query->where('id', '!=', $approvalId))
            ->latest('id')
            ->first();

        if ($previousApproval) {
            $sources[] = [
                'key' => 'approval',
                'label' => 'Riwayat Approval PR',
                'count' => 1,
                'records' => [[
                    'id' => (int) $previousApproval->id,
                    'document_no' => $prNumber,
                    'description' => 'Nomor PR ini pernah disetujui sebelumnya.',
                    'meta' => $previousApproval->approved_at
                        ? 'Disetujui: '.date('d/m/Y H:i', strtotime((string) $previousApproval->approved_at))
                        : '',
                ]],
            ];
        }

        return [
            'has_conflicts' => $sources !== [],
            'pr_number' => $prNumber,
            'source_count' => count($sources),
            'record_count' => array_sum(array_column($sources, 'count')),
            'sources' => $sources,
        ];
    }

    private function linkedDocumentIds(string $table, string $foreignKey, ?int $ppbjId): array
    {
        if (! $ppbjId) {
            return [];
        }

        return DB::table($table)
            ->where('ppbj_id', $ppbjId)
            ->pluck($foreignKey)
            ->map(fn ($id) => (int) $id)
            ->all();
    }

    private function emptyResult(string $prNumber): array
    {
        return [
            'has_conflicts' => false,
            'pr_number' => $prNumber,
            'source_count' => 0,
            'record_count' => 0,
            'sources' => [],
        ];
    }
}
