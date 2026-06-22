<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeptMiddleware
{
    public function handle(Request $request, Closure $next, string $dept): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403);
        }

        // sesuaikan nama kolom di users table: department / dept / role
        if (($user->department ?? null) !== $dept) {
            abort(403, 'Akses ditolak.');
        }

        return $next($request);
    }
}
