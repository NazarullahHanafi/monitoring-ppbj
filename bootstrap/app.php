<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\DeptMiddleware;
use App\Http\Middleware\CachePublicGuestResponse;
use App\Http\Middleware\DisableLoggingForPolling;
use App\Http\Middleware\EnsureActiveUser;
use App\Http\Middleware\EnsureNotReadOnly;
use App\Http\Middleware\EnsureNotSoftMaintenance;
use App\Http\Middleware\EnsureOwnerAccess;
use App\Http\Middleware\MonitorPerformance;
use App\Http\Middleware\SecurityHeaders;
use App\Http\Middleware\TrackAuthenticatedDevice;
use App\Services\TelegramBotService;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'dept' => DeptMiddleware::class,
            'guest.page_cache' => CachePublicGuestResponse::class,
            'owner' => EnsureOwnerAccess::class,
            'readonly.block' => EnsureNotReadOnly::class,
        ]);

        $middleware->prepend(DisableLoggingForPolling::class);
        $middleware->prepend(EnsureNotSoftMaintenance::class);
        // Session cookies must be decrypted and loaded before checking account
        // status. A global check ran before StartSession and missed locked users.
        $middleware->web(append: [EnsureActiveUser::class]);
        $middleware->prependToPriorityList(\Illuminate\View\Middleware\ShareErrorsFromSession::class, EnsureActiveUser::class);
        $middleware->append(SecurityHeaders::class);
        $middleware->append(MonitorPerformance::class);
        $middleware->append(TrackAuthenticatedDevice::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->report(function (\Throwable $e) {
            try {
                $request = request();
                $user = $request?->user();

                app(TelegramBotService::class)->notifyApplicationError($e, [
                    'path' => $request?->fullUrl(),
                    'method' => $request?->method(),
                    'ip' => $request?->ip(),
                    'user' => $user ? trim(($user->name ?: 'User').' <'.$user->email.'>') : 'guest',
                ]);
            } catch (\Throwable) {
                // Jangan pernah biarkan alert Telegram membuat error baru.
            }
        });
    })->create();
