<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $this->recordSuccessfulLogin($request);

        return redirect()->intended(\App\Providers\AppServiceProvider::homeFor($request->user()));

    }

    private function recordSuccessfulLogin(Request $request): void
    {
        $user = $request->user();

        if (! $user || ! Schema::hasTable('users')) {
            return;
        }

        $updates = [];

        if (Schema::hasColumn('users', 'last_seen_at')) {
            $updates['last_seen_at'] = now();
        }

        if (Schema::hasColumn('users', 'last_login_ip')) {
            $updates['last_login_ip'] = $request->ip();
        }

        if (Schema::hasColumn('users', 'last_seen_ip')) {
            $updates['last_seen_ip'] = $request->ip();
        }

        if (! empty($updates)) {
            DB::table('users')
                ->where('id', $user->id)
                ->update($updates);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
