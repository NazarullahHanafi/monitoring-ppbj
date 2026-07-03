<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureOwnerAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->isOwner()) {
            Log::warning('Owner-only area access denied', [
                'user_id' => $user?->id,
                'email' => $user?->email,
                'path' => $request->path(),
                'ip' => $request->ip(),
            ]);

            abort(403, 'Area ini hanya dapat diakses oleh owner aplikasi.');
        }

        return $next($request);
    }
}
