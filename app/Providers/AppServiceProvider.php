<?php

namespace App\Providers;

use App\Models\ContactMessage;
use App\Models\PrReceiptApproval;
use App\Models\Satuan;
use App\Models\User;
use App\Observers\SatuanObserver;
use App\Policies\UserPolicy;
use App\Support\CacheBatch;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

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
                Cache::forget('presence:user:'.$event->user->id);
            }
        });

        // View Composer untuk badge approval PR
        View::composer('layouts.app', function ($view) {
            $user = auth()->user();
            $pendingCount = 0;
            $unreadContactMessageCount = 0;

            if ($user && $user->department === 'umum') {
                $loaders = [
                    'pr_receipt_pending_count' => fn () => PrReceiptApproval::where('status', 'PENDING')->count(),
                ];

                if ($user->role === 'superadmin') {
                    $loaders['contact_messages_unread_count'] = fn () => ContactMessage::whereNull('read_at')->count();
                }

                $counts = CacheBatch::remember($loaders, 30);
                $pendingCount = (int) ($counts['pr_receipt_pending_count'] ?? 0);
                $unreadContactMessageCount = (int) ($counts['contact_messages_unread_count'] ?? 0);
            }

            $view->with('pendingApprovalCount', $pendingCount);
            $view->with('unreadContactMessageCount', $unreadContactMessageCount);
        });

        Satuan::observe(SatuanObserver::class);
    }

    public static function homeFor(?\App\Models\User $user): string
    {
        if (! $user) {
            return '/login';
        }

        return match (strtolower($user->department ?? 'umum')) {
            'operasional' => '/ops/dashboard',
            default => '/dashboard',
        };
    }
}
