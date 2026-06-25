<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisableLoggingForPolling
{
    public function handle(Request $request, Closure $next)
    {
        $skipPaths = [
            'spph/presence',
            'spph/poll',
            'sp/presence',
            'sp/poll',
            'sp/presence/start',
            'sp/presence/stop',
            'chat/messages',
            'chat/read',
            'chat/mentions/unread',
            'chat/reactions',
            'chatbot/notifications/count',
            'chatbot/greeting',
            'approval/pr-receipts/pending-count',
            'torpr/receipt-status-bulk',
            'api/health-check',
            'api/ping',
        ];

        $path = '/'.ltrim($request->path(), '/');

        foreach ($skipPaths as $skipPath) {
            if (str_starts_with($path, '/'.$skipPath)) {
                // Matikan query log DB
                DB::connection()->disableQueryLog();

                break;
            }
        }

        return $next($request);
    }
}
