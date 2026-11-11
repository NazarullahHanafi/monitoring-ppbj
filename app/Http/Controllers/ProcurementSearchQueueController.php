<?php

namespace App\Http\Controllers;

use App\Models\Ppbj;
use App\Services\ProcurementOcrQueue;
use Illuminate\Support\Facades\Cache;

class ProcurementSearchQueueController extends Controller
{
    public function status()
    {
        abort_unless(config('procurement_search.enabled'), 404);

        return response()->json(['index' => Cache::get('procurement-search:progress', ['state' => 'starting'])])
            ->header('Cache-Control', 'private, no-store');
    }

    public function priority(Ppbj $ppbj, ProcurementOcrQueue $queue)
    {
        abort_unless(config('procurement_search.enabled'), 404);

        return response()->json($queue->requestPriority($ppbj))->header('Cache-Control', 'private, no-store');
    }
}
