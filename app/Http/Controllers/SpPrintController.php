<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Sp;
use App\Services\SpPrintPolicy;
use App\Services\SpPrintSelection;
use App\Support\PrintPreviewFile;
use Illuminate\Http\Request;

class SpPrintController extends Controller
{
    public function confirm(Request $request, Sp $sp)
    {
        abort_if($request->user()->isReadOnly(), 403);

        return response()->json(app(SpPrintSelection::class)->confirm($request, $sp))
            ->header('Cache-Control', 'private, no-store');
    }

    public function context(Request $request, Sp $sp)
    {
        $context = app(SpPrintPolicy::class)->context($sp);
        $context['can_manage'] = ! $request->user()->isReadOnly();
        if ($request->query('signing_mode') !== null) {
            $context['selection'] = app(SpPrintPolicy::class)->validate($request, $context)['query'];
        }

        return response()->json($context)->header('Cache-Control', 'private, no-store');
    }

    private function generate(Request $request, Sp $sp): array
    {
        $selected = app(SpPrintPolicy::class)->validate($request, app(SpPrintPolicy::class)->context($sp));
        if ($selected['signing_mode'] === 'manual' || $selected['field_manual']) {
            ActivityLog::create(['user_id' => $request->user()->id, 'model_type' => Sp::class, 'model_id' => $sp->id,
                'action' => 'manual_print_selection', 'description' => 'Permintaan cetak SP dengan pilihan manual',
                'changes' => ['signer' => $selected['name'], 'title' => $selected['title'], 'reason' => $selected['manual_reason'] ?? null,
                    'owner_field' => $selected['field_name'], 'field_reason' => $selected['field_reason'], 'nilai_sp' => $selected['amount']]]);
        }

        return [$selected, app(SpController::class)->cetakSp($sp, $selected['field_name'], $selected['name'], $selected['title'])];
    }

    public function download(Request $request, Sp $sp)
    {
        return $this->generate($request, $sp)[1];
    }

    public function preview(Request $request, Sp $sp)
    {
        [$selected, $response] = $this->generate($request, $sp);
        $filename = 'SP '.preg_replace('/[^A-Za-z0-9._-]+/', '-', $sp->nomor_sp ?: (string) $sp->id).'.docx';
        $preview = PrintPreviewFile::store($response, $filename);

        return view('documents.print-preview', [
            'title' => 'Preview Cetak SP', 'eyebrow' => 'PENOMORAN SP', 'documentType' => 'DOCX',
            'documentName' => $sp->nomor_sp, 'subtitle' => $sp->deskripsi_pengadaan,
            'downloadUrl' => $preview['downloadUrl'], 'previewFrameUrl' => $preview['previewFrameUrl'], 'filename' => $preview['filename'],
            'backUrl' => route('sp.index', ['mode' => $sp->numbering_mode === 'oracle' ? 'oracle' : 'auto']),
            'meta' => ['Nomor SP' => $sp->nomor_sp, 'Nomor PR/PPBJ' => $sp->linkedPpbjLabel(), 'Vendor' => $sp->nama_vendor,
                'Dasar penandatangan' => 'Nilai SP Rp '.number_format((float) $selected['amount'], 2, ',', '.'),
                'Bidang pemilik PR' => $selected['field_name'], 'Sumber bidang' => $selected['field_manual'] ? 'Manual — '.$selected['field_reason'] : 'Pemetaan portofolio aktif',
                'Penandatangan SCI' => $selected['name'].' — '.$selected['title'],
                'Mode SCI' => $selected['signing_mode'] === 'manual' ? 'Manual — '.$selected['manual_reason'] : 'Otomatis sesuai nilai SP',
                'Link berlaku sampai' => $preview['expiresText']],
        ]);
    }
}
