<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Models\Sp;
use App\Models\Spph;
use App\Models\SpValueApproval;
use App\Services\SpValueApprovalService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProcurementReviewController extends Controller
{
    private function authorizeWriter(Request $request): void
    {
        abort_unless($request->user()?->department === 'umum' && ! $request->user()->isReadOnly(), 403);
    }

    private function document(Request $request, string $kind, ?int $id, bool $editing = true): Sp|Spph|null
    {
        abort_unless(in_array($kind, ['sp', 'spph'], true), 404);
        if (! $id) {
            return null;
        }
        $document = ($kind === 'sp' ? Sp::query() : Spph::query())->findOrFail($id);
        if ($editing) {
            abort_unless((int) $document->created_by_user_id === (int) $request->user()->id
                || $request->user()->matchesOwnerLabel($document->pic), 403, 'Hanya pembuat yang dapat mengedit dokumen ini.');
        }

        return $document;
    }

    public function preview(Request $request, string $kind, ?int $id = null)
    {
        $this->authorizeWriter($request);
        $request->validate(['action' => ['required', Rule::in(['save', 'delete'])]]);
        $deleting = $request->input('action') === 'delete';
        $document = $this->document($request, $kind, $id, ! $deleting);
        abort_if($deleting && ! $document, 422);
        $column = $kind === 'sp' ? 'awarding_sp' : 'spph_rfq_1';
        $number = $document?->getAttribute($kind === 'sp' ? 'nomor_sp' : 'nomor_spph');
        $oldQuery = $document ? Ppbj::query()->where($column, $number) : null;
        if ($deleting) {
            $total = (clone $oldQuery)->count();
            $old = (clone $oldQuery)->orderBy('id')->limit(20)->pluck('ppbj_no')->all();

            return response()->json([
                'title' => 'Simulasi pemindahan ke Sampah', 'document' => $number,
                'summary' => ['Dokumen dipindahkan ke Sampah, bukan dihapus permanen.',
                    'Referensi PR, nilai, vendor, dan dokumen lanjutan tetap dipertahankan.',
                    'Tetap memerlukan verifikasi kata sandi pembuat. Pemulihan tersedia di menu Sampah.'],
                'prs' => array_map(fn ($pr) => ['nomor' => $pr], $old),
                'total_prs' => $total, 'prs_truncated' => $total > count($old),
            ])->header('Cache-Control', 'private, no-store');
        }

        if ($kind === 'sp') {
            $snapshot = app(SpController::class)->reviewData($request, $document);
            $approvalService = app(SpValueApprovalService::class);
            $approval = $snapshot['requires_approval'] ? SpValueApproval::query()
                ->where('requester_id', $request->user()->id)
                ->where('fingerprint', $approvalService->fingerprint($snapshot))->first() : null;
            $approved = $approval && $approval->status === 'approved' && $approval->expires_at->isFuture();
            $selected = array_column($snapshot['prs'], 'nomor');
            $summary = ['Vendor final SP akan memperbarui penyedia eksternal pada PR terpilih.',
                'Nilai SP dibagi menurut alokasi tiap PR; tidak disalin penuh ke semua PR.'];

            return response()->json([
                'title' => 'Simulasi '.($id ? 'perubahan' : 'pembuatan').' SP',
                'document' => $snapshot['nomor_sp'], 'vendor' => $snapshot['vendor'],
                'previous_vendor' => $document?->nama_vendor,
                'previous_value' => $document?->nilai_sp,
                'summary' => $summary,
                'prs' => $snapshot['prs'], ...$this->removedPrs($oldQuery, $selected),
                'nilai_pr' => $snapshot['nilai_pr'], 'nilai_sp' => $snapshot['nilai_sp'], 'selisih' => $snapshot['selisih'],
                'requires_approval' => $snapshot['requires_approval'],
                'approved' => (bool) $approved, 'approval_status' => $approval?->status,
                'approval_expired' => (bool) $approval?->expires_at->isPast(),
                'approval_id' => $approval?->id,
                'budget_unknown' => ! $selected && $snapshot['nilai_pr'] <= 0,
                'changes' => $this->changes($request, $document, [
                    'tanggal_sp' => 'Tanggal SP', 'deskripsi_pengadaan' => 'Uraian', 'pic' => 'PIC',
                    'promised_date' => 'Batas pemenuhan', 'awal_kontrak' => 'Awal kontrak', 'akhir_kontrak' => 'Akhir kontrak',
                    'sph' => 'Nomor SPH', 'tgl_sph' => 'Tanggal SPH', 'rfq' => 'RFQ',
                    'penandatangan_sci' => 'Penandatangan SCI', 'jabatan_sci' => 'Jabatan SCI',
                ]),
            ])->header('Cache-Control', 'private, no-store');
        }

        $request->validate([
            'nomor_spph' => 'required|string|max:60', 'nomor_prs' => 'nullable|array|max:20',
            'nomor_prs.*' => 'required|string|max:100|distinct|exists:ppbj,ppbj_no',
            'nomor_pr' => 'nullable|string|max:100', 'nama_vendor' => 'nullable|string|max:255',
            'vendor_names' => 'nullable|array|max:20', 'vendor_names.*' => 'nullable|string|max:255',
        ]);
        $numbers = $request->input('nomor_pr_type', 'ppbj') === 'ppbj'
            ? (array) $request->input('nomor_prs', array_filter([$request->nomor_pr])) : [];
        $records = Ppbj::query()->whereIn('ppbj_no', $numbers)
            ->get(['ppbj_no', 'total_sebelum_ppn', 'penyedia_eksternal', 'awarding_sp']);
        $vendors = collect($request->input('vendor_names', [$request->nama_vendor]))->filter()->unique()->values();

        return response()->json([
            'title' => 'Simulasi '.($id ? 'perubahan' : 'pembuatan').' SPPH',
            'document' => $request->nomor_spph, 'vendor' => $vendors->implode(' · '),
            'previous_vendor' => $document?->nama_vendor,
            'summary' => ['SPPH menyinkronkan nomor, tanggal, dan kandidat vendor ke PR terpilih.',
                'Vendor final dari SP tetap diprioritaskan. SPPH tidak mengubah nilai kontrak SP.',
                'PR yang dilepas akan dibersihkan dari referensi SPPH ini; SP yang sudah ada tetap dipertahankan.'],
            'prs' => $records->map(fn ($pr) => [
                'nomor' => $pr->ppbj_no, 'nilai_pr' => (float) $pr->total_sebelum_ppn,
                'vendor_final' => $pr->awarding_sp ? $pr->penyedia_eksternal : null,
            ])->all(),
            ...$this->removedPrs($oldQuery, $numbers),
            'changes' => $this->changes($request, $document, ['tanggal' => 'Tanggal SPPH', 'deskripsi_pengadaan' => 'Uraian', 'pic' => 'PIC']),
        ])->header('Cache-Control', 'private, no-store');
    }

    private function removedPrs(?Builder $query, array $selected): array
    {
        if (! $query) {
            return ['removed_prs' => [], 'removed_prs_count' => 0, 'removed_prs_truncated' => false];
        }
        $remaining = (clone $query)->whereNotIn('ppbj_no', $selected);
        $total = (clone $remaining)->count();
        $sample = $remaining->orderBy('id')->limit(20)->pluck('ppbj_no')->all();

        return ['removed_prs' => $sample, 'removed_prs_count' => $total, 'removed_prs_truncated' => $total > count($sample)];
    }

    private function changes(Request $request, Sp|Spph|null $document, array $fields): array
    {
        $changes = [];
        foreach ($fields as $field => $label) {
            $before = (string) ($document?->getRawOriginal($field) ?? '');
            $after = is_scalar($request->input($field)) ? (string) $request->input($field) : '';
            if ($before !== $after) {
                $changes[] = ['label' => $label, 'before' => mb_substr(strip_tags($before), 0, 500), 'after' => mb_substr(strip_tags($after), 0, 500)];
            }
        }

        return $changes;
    }

    public function index(Request $request)
    {
        abort_unless($request->user()?->department === 'umum', 403);
        $validated = $request->validate(['status' => ['nullable', Rule::in(['pending', 'approved', 'rejected', 'consumed'])], 'page' => ['nullable', 'integer', 'min:1', 'max:1000000']]);
        $status = $validated['status'] ?? 'pending';
        $approvals = SpValueApproval::query()->with(['requester:id,name', 'reviewer:id,name'])
            ->where('status', $status)->orderByDesc('id')->paginate(15)->withQueryString();

        return view('sp.value-approvals', compact('approvals', 'status'));
    }

    public function requestApproval(Request $request, ?int $id = null)
    {
        $this->authorizeWriter($request);
        if (is_string($request->reason)) {
            $request->merge(['reason' => trim($request->reason)]);
        }
        $request->validate(['reason' => 'required|string|min:10|max:2000']);
        $document = $this->document($request, 'sp', $id);
        $snapshot = app(SpController::class)->reviewData($request, $document);
        abort_unless($snapshot['requires_approval'], 422, 'Tidak ada selisih nilai yang membutuhkan persetujuan.');
        $service = app(SpValueApprovalService::class);
        $approval = DB::transaction(function () use ($request, $snapshot, $service) {
            $row = SpValueApproval::firstOrCreate([
                'requester_id' => $request->user()->id, 'fingerprint' => $service->fingerprint($snapshot),
            ], ['snapshot' => $snapshot, 'reason' => $request->reason, 'expires_at' => now()->addDays(7)]);
            $created = $row->wasRecentlyCreated;
            $row = SpValueApproval::whereKey($row->id)->lockForUpdate()->firstOrFail();
            if ($row->status === 'consumed') {
                abort(409, 'Persetujuan ini sudah digunakan.');
            }
            if ($created || $row->status === 'rejected' || $row->expires_at->isPast()) {
                $row->update(['status' => 'pending', 'reason' => $request->reason, 'reviewer_id' => null,
                    'decision_note' => null, 'decided_at' => null, 'expires_at' => now()->addDays(7)]);
                $service->audit($request, $row, 'value_approval_requested', 'Pengajuan selisih nilai SP.');
            }

            return $row;
        }, 3);

        return response()->json(['success' => true, 'message' => 'Pengajuan #'.$approval->id.' tersedia di Persetujuan Selisih. Form SP belum disimpan. Setelah disetujui, simpan kembali rincian yang sama.', 'id' => $approval->id])->header('Cache-Control', 'private, no-store');
    }

    public function decide(Request $request, SpValueApproval $approval)
    {
        $this->authorizeWriter($request);
        if (is_string($request->decision_note)) {
            $request->merge(['decision_note' => trim($request->decision_note)]);
        }
        $request->validate(['decision' => ['required', Rule::in(['approved', 'rejected'])], 'decision_note' => 'required|string|min:5|max:2000', 'review_token' => ['nullable', 'string', 'size:64']]);
        DB::transaction(function () use ($request, $approval) {
            $row = SpValueApproval::whereKey($approval->id)->lockForUpdate()->firstOrFail();
            abort_if((int) $row->requester_id === (int) $request->user()->id, 403, 'Tidak dapat menyetujui pengajuan sendiri.');
            abort_unless($row->status === 'pending' && $row->expires_at->isFuture(), 409, 'Pengajuan telah diputuskan atau kedaluwarsa.');
            abort_unless(hash_equals(app(SpValueApprovalService::class)->reviewToken($row), (string) $request->input('review_token')), 409, 'Isi pengajuan telah berubah atau halaman perlu diperbarui. Muat ulang dan periksa kembali sebelum memutuskan.');
            $row->update(['status' => $request->decision, 'reviewer_id' => $request->user()->id,
                'decision_note' => $request->decision_note, 'decided_at' => now()]);
            app(SpValueApprovalService::class)->audit($request, $row, 'value_approval_decided', 'Keputusan persetujuan selisih SP.');
        }, 3);

        $message = 'Keputusan disimpan. Sistem tetap memeriksa ulang rincian saat SP disimpan.';
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'message' => $message])->header('Cache-Control', 'private, no-store');
        }

        return back()->with('success', $message);
    }
}
