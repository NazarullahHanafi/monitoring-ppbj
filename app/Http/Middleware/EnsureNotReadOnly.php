<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotReadOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! method_exists($user, 'isReadOnly') || ! $user->isReadOnly()) {
            return $next($request);
        }

        if ($request->isMethodSafe() || $request->routeIs('logout', 'presence.*', 'emoji.mood', 'chat.read')) {
            return $next($request);
        }

        $message = 'Akun viewer hanya memiliki akses baca. Perubahan data tidak diizinkan.';

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'error' => $message,
            ], 403);
        }

        return back()->with('error', $message);
    }
}
