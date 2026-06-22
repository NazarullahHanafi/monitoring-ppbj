<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torpr;

class LandingController extends Controller
{
    public function index()
    {
        return view('landing.index');
    }

    public function about()
    {
        return view('landing.about');
    }

    public function services()
    {
        return view('landing.services');
    }

    public function contact()
    {
        return view('landing.contact');
    }

    // Track PR tanpa login
    public function trackPr(Request $request)
    {
        $keyword = trim($request->get('q', ''));
        $row = null;

        if ($keyword) {
            $row = Torpr::with([
                'latestReceiptApproval.approvedBy',
                'latestReceiptApproval.rejectedBy',
                'receivedByUmum',
                'createdBy'
            ])
                ->where('nomor_pr', 'like', "%{$keyword}%")
                ->first();
        }

        return view('landing.track', compact('keyword', 'row'));
    }

    public function suggestPr(Request $request)
    {
        $q = trim($request->get('q', ''));

        if (strlen($q) < 2) {
            return response()->json(['items' => []]);
        }

        $items = Torpr::where('nomor_pr', 'like', "%{$q}%")
            ->orderByDesc('created_at')
            ->limit(8)
            ->get(['id', 'nomor_pr', 'tujuan_pengadaan as tujuan', 'tanggal_pr'])
            ->map(function ($t) {
                return [
                    'nomor_pr' => $t->nomor_pr,
                    'tujuan' => $t->tujuan,
                    'tanggal_pr' => $t->tanggal_pr ? $t->tanggal_pr->format('d M Y') : null,
                ];
            });

        return response()->json(['items' => $items]);
    }
}