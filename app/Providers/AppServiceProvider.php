<?php

namespace App\Providers;

use Illuminate\Support\Facades\Cache;
use App\Models\PrReceiptApproval;
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Auth\Events\Logout;
use App\Models\Satuan;
use App\Observers\SatuanObserver;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => UserPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ✅ Hapus presence saat user logout
        \Event::listen(Logout::class, function (Logout $event) {
            if ($event->user && isset($event->user->id)) {
                Cache::forget('presence:user:' . $event->user->id);
            }
        });

        // View Composer untuk badge approval PR
        View::composer('layouts.app', function ($view) {
            $user = auth()->user();
            $pendingCount = 0;

            if ($user && $user->department === 'umum') {
                $pendingCount = Cache::remember(
                    'pr_receipt_pending_count',
                    now()->addSeconds(30),
                    fn() => PrReceiptApproval::where('status', 'PENDING')->count()
                );
            }

            $view->with('pendingApprovalCount', $pendingCount);
        });

        Satuan::observe(SatuanObserver::class);
    }

    public static function homeFor(?\App\Models\User $user): string
    {
        if (!$user)
            return '/login';

        return match (strtolower($user->department ?? 'umum')) {
            'operasional' => '/ops/dashboard',
            default        => '/dashboard',
        };
    }
}
