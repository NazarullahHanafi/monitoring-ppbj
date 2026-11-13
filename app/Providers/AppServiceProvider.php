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
        // Numeric throttle middleware shares a user signature across routes. Office
        // polling and actions need separate budgets, including from legacy pages.
        \Illuminate\Support\Facades\RateLimiter::for('virtual-office', function (\Illuminate\Http\Request $request) {
            $route = $request->route()?->getName() ?? $request->path();
            $maximum = $request->isMethodSafe() ? 600 : match ($route) {
                'virtual-office.game.hit', 'virtual-office.pilot', 'virtual-office.combat.attack', 'virtual-office.combat.fire' => 900,
                'virtual-office.game.invite', 'virtual-office.meetings.invite', 'virtual-office.world' => 30,
                default => 180,
            };

            return \Illuminate\Cache\RateLimiting\Limit::perMinute($maximum)
                ->by('office-v2:'.($request->user()?->id ?? $request->ip()).':'.$route)
                ->response(fn ($request, $headers) => response()->json([
                    'message' => 'Aktivitas sangat cepat. Silakan lanjutkan setelah jeda singkat.',
                    'retry_after' => (int) ($headers['Retry-After'] ?? 1),
                ], 429, $headers)->header('Cache-Control', 'private, no-store'));
        });
        \Event::listen(\Illuminate\Auth\Events\Login::class, function ($event) {
            if ($event->user instanceof User) {
                app(\App\Services\VirtualOfficeRecreation::class)->daily($event->user);
            }
        });
        // Directory contains presentation fields only; heartbeat's raw SQL last-seen
        // updates do not invalidate it. Account edits/locks do invalidate it.
        // Cache::forget(false) must not become an event listener's return value:
        // Laravel interprets false as a request to stop later listeners.
        User::saved(function (): void {
            Cache::forget(\App\Services\VirtualOfficePresence::DIRECTORY_KEY);
            Cache::forget('chat:mention_users:v2');
        });
        User::deleted(function (): void {
            Cache::forget(\App\Services\VirtualOfficePresence::DIRECTORY_KEY);
            Cache::forget(\App\Services\VirtualOfficeHomes::KEY);
            Cache::forget('chat:mention_users:v2');
        });
        User::created(function (): void {
            Cache::forget(\App\Services\VirtualOfficeHomes::KEY);
        });
        // ✅ Hapus presence saat user logout
        \Event::listen(Logout::class, function (Logout $event) {
            if ($event->user && isset($event->user->id)) {
                Cache::forget('presence:user:'.$event->user->id);
                Cache::forget(\App\Services\VirtualOfficePilot::lease($event->user->id));
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

        foreach ([
            \App\Models\MasterBuyer::class => ['buyer', 'master_buyers', 'master_buyers_for_user_mapping'],
            \App\Models\MasterPortofolio::class => ['portofolio', 'master_portofolios'],
            \App\Models\MasterMetodePengadaan::class => ['metode_pengadaan', 'master_metode_pengadaan'],
            \App\Models\MasterPenyediaEksternal::class => ['penyedia_eksternal', 'master_penyedia_eksternal'],
        ] as $model => $keys) {
            $forget = static function () use ($keys): void {
                Cache::forget('master:dropdown:v1:'.$keys[0]);
                foreach (array_slice($keys, 1) as $key) {
                    Cache::forget($key);
                }
            };
            $model::saved($forget);
            $model::deleted($forget);
        }
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
