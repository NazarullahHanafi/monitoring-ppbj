<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotReadOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        $globalReadOnly = (bool) Cache::get('simonpr:read_only_mode', false);
        $userReadOnly = $user && method_exists($user, 'isReadOnly') && $user->isReadOnly();

        if (! $globalReadOnly && ! $userReadOnly) {
            return $next($request);
        }

        if ($request->isMethodSafe() || $request->routeIs('logout', 'presence.*', 'emoji.mood', 'chat.read', 'telegram.webhook')) {
            return $next($request);
        }

        $message = $globalReadOnly
            ? 'SIMONPR sedang dalam mode read-only. Aksi tambah, ubah, hapus, dan approve sementara dikunci.'
            : 'Akun viewer hanya memiliki akses baca. Perubahan data tidak diizinkan.';

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
