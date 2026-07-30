<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Services\TelegramBotService;
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
        $this->notifyTelegramLogin($request->user(), $request->ip());

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
        $user = $request->user();
        $ip = $request->ip();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $this->notifyTelegramLogout($user, $ip);

        return redirect('/');
    }

    private function notifyTelegramLogin(?User $user, ?string $ip): void
    {
        if (! $user) {
            return;
        }

        app()->terminating(function () use ($user, $ip) {
            app(TelegramBotService::class)->notifyUserLogin($user, $ip);
        });
    }

    private function notifyTelegramLogout(?User $user, ?string $ip): void
    {
        if (! $user) {
            return;
        }

        app()->terminating(function () use ($user, $ip) {
            app(TelegramBotService::class)->notifyUserLogout($user, $ip);
        });
    }
}
