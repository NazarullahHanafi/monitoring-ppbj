<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveUser
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Struktur tabel users sudah dijamin oleh migration. Pengecekan Schema
        // di sini sebelumnya menjalankan query metadata pada setiap request.
        if (! $user) {
            return $next($request);
        }

        if ($user->is_active !== false) {
            return $next($request);
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Akun Anda sedang dikunci oleh owner sistem.',
            ], 423);
        }

        return redirect()
            ->route('login')
            ->withErrors(['email' => 'Akun Anda sedang dikunci oleh owner sistem. Hubungi admin/owner SIMONPR.']);
    }
}
