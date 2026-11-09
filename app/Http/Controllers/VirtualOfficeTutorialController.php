<?php

namespace App\Http\Controllers;

use App\Services\VirtualOfficeTutorial;
use Illuminate\Http\Request;

class VirtualOfficeTutorialController extends Controller
{
    public function show(Request $request, VirtualOfficeTutorial $tutorial)
    {
        $user = $request->user();
        abort_unless(VirtualOfficeTutorial::eligible($user), 403);
        return redirect()->route('virtual-office.index', ['tutorial' => 1])->header('Cache-Control', 'private, no-store');
    }

    public function start(Request $request, VirtualOfficeTutorial $tutorial)
    {
        abort_unless(VirtualOfficeTutorial::eligible($request->user()), 403);
        $request->validate(['user_id' => ['prohibited']]);
        return response()->json($tutorial->start($request->user()))->header('Cache-Control', 'private, no-store');
    }

    public function advance(Request $request, VirtualOfficeTutorial $tutorial)
    {
        abort_unless(VirtualOfficeTutorial::eligible($request->user()), 403);
        $data = $request->validate(['user_id' => ['prohibited'], 'step' => ['required', 'integer', 'between:0,6'], 'evidence' => ['required', 'array', 'max:6']]);
        $tutorial->advance($request->user(), (int) $data['step'], $data['evidence']);
        return response()->json(['step' => (int) $tutorial->progress($request->user())->step, 'completed' => $tutorial->completed($request->user())])->header('Cache-Control', 'private, no-store');
    }

    public function document(Request $request, VirtualOfficeTutorial $tutorial)
    {
        abort_unless(VirtualOfficeTutorial::eligible($request->user()), 403);
        $kind = $tutorial->documentKind($request->user());
        return response()->view('virtual-office.tutorial-document', compact('kind'))->header('Cache-Control', 'private, no-store');
    }

    public function validateDocument(Request $request, VirtualOfficeTutorial $tutorial)
    {
        abort_unless(VirtualOfficeTutorial::eligible($request->user()), 403);
        $kind = $tutorial->documentKind($request->user());
        $rules = ['user_id' => ['prohibited'], 'id' => ['prohibited'], 'kind' => ['prohibited']];
        $rules += match ($kind) {
            'ppbj' => ['ppbj_no' => ['required', 'string', 'max:255'], 'tgl_ppbj' => ['required', 'date_format:Y-m-d'], 'uraian' => ['required', 'string', 'min:5', 'max:255'], 'total_sebelum_ppn' => ['required', 'numeric', 'min:1', 'max:999999999999']],
            'pr' => ['nomor_pr' => ['required', 'string', 'max:255'], 'tujuan_pengadaan' => ['required', 'string', 'min:5', 'max:255'], 'tanggal_pr' => ['required', 'date_format:Y-m-d\TH:i'], 'jumlah_pr' => ['required', 'numeric', 'min:1', 'max:999999999999']],
            default => ['number' => ['required', 'string', 'min:3', 'max:100']],
        };
        $data = $request->validate($rules);
        // Deliberately has no business controller, model save, numbering,
        // approval, attachment, notification, or wallet side effects.
        return response()->json(['simulated' => true, 'kind' => $kind, 'data' => $data, 'token' => $tutorial->documentProof($request->user())])
            ->header('Cache-Control', 'private, no-store');
    }
}
