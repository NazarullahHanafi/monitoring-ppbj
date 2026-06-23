<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\MasterDataController;
use App\Http\Controllers\OperasionalDashboardController;
use App\Http\Controllers\PpbjController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\PrReceiptApprovalController;
use App\Http\Controllers\SatuanController;
use App\Http\Controllers\SpController;
use App\Http\Controllers\SpMasterOptionController;
use App\Http\Controllers\SpphController;
use App\Http\Controllers\TorprController;
use App\Http\Controllers\TrackingPrController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Providers\AppServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::get('/pr/sign/{token}/{type}', [TorprController::class, 'showQuickSign'])
    ->name('pr.quick-sign')
    ->middleware('throttle:20,1')
    ->where('type', 'kacab|kabid');

Route::post('/pr/sign/{token}/{type}', [TorprController::class, 'processQuickSign'])
    ->name('pr.process-quick-sign')
    ->middleware('throttle:5,1')
    ->where('type', 'kacab|kabid');

// ========================
// PUBLIC ROUTES (Landing Page)
// ========================
Route::get('/', [LandingController::class, 'index'])->name('landing.index');
Route::get('/about', [LandingController::class, 'about'])->name('landing.about');
Route::get('/services', [LandingController::class, 'services'])->name('landing.services');
Route::get('/contact', [LandingController::class, 'contact'])->name('landing.contact');

// Track PR/PPBJ (Public - No Login Required)
Route::get('/track', [TrackingPrController::class, 'landing'])->name('landing.track');
Route::get('/track/suggest', [TrackingPrController::class, 'suggest'])->name('landing.track.suggest');

// Dashboard redirect sesuai dept
Route::get('/home', function () {
    return redirect(AppServiceProvider::homeFor(auth()->user()));
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/account', [AccountController::class, 'edit'])->name('account.edit');
    Route::post('/account/password', [AccountController::class, 'updatePassword'])->name('account.password');
    Route::post('/presence/heartbeat', [App\Http\Controllers\PresenceController::class, 'heartbeat'])
        ->name('presence.heartbeat')
        ->middleware('auth');
    Route::post('/presence/mood', [PresenceController::class, 'updateMood'])->name('presence.mood');
    Route::get('/presence/mood', [PresenceController::class, 'getMood'])->name('presence.mood.get');
    Route::prefix('emoji')->name('emoji.')->middleware('auth')->group(function () {
        Route::get('/messages', [App\Http\Controllers\EmojiChatController::class, 'messages'])->name('messages');
        Route::post('/send', [App\Http\Controllers\EmojiChatController::class, 'send'])->name('send');
        Route::post('/mood', [App\Http\Controllers\EmojiChatController::class, 'setMood'])->name('mood');
        Route::get('/moods', [App\Http\Controllers\EmojiChatController::class, 'moods'])->name('moods');
    });

    // ✅ FIX: Tambahkan DisableLoggingForPolling ke /messages (endpoint polling)
    Route::prefix('chat')->name('chat.')->middleware('auth')->group(function () {
        Route::get('/messages', [App\Http\Controllers\ChatController::class, 'messages'])
            ->name('messages')
            ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class); // ← TAMBAHKAN INI
        Route::get('/mentions/unread', [App\Http\Controllers\ChatController::class, 'unreadMentions'])
            ->name('mentions.unread')
            ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class);
        Route::get('/search', [App\Http\Controllers\ChatController::class, 'search'])->name('search');
        Route::get('/reactions', [App\Http\Controllers\ChatController::class, 'reactions'])
            ->name('reactions')
            ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class);
        Route::post('/share', [App\Http\Controllers\ChatController::class, 'share'])->name('share');
        Route::post('/{id}/reaction', [App\Http\Controllers\ChatController::class, 'react'])->name('react');
        Route::post('/send', [App\Http\Controllers\ChatController::class, 'send'])->name('send');
        Route::patch('/{id}', [App\Http\Controllers\ChatController::class, 'update'])->name('update');
        Route::delete('/{id}', [App\Http\Controllers\ChatController::class, 'destroy'])->name('destroy');
    });

    Route::post('/chat/read', [ChatController::class, 'markRead'])->name('chat.read');
    Route::get('/chat/{id}/reads', [ChatController::class, 'getReads'])->name('chat.reads');
    Route::get('/chat/users', [ChatController::class, 'getUsers'])->name('chat.users');

    // ========================
    // UMUM (Dept: umum)
    // ========================
    Route::middleware(['dept:umum'])->group(function () {

        Route::prefix('satuan')->name('satuan.')->group(function () {
            Route::get('/', [SatuanController::class, 'index'])->name('index');
            Route::post('/', [SatuanController::class, 'store'])->name('store');
            Route::put('/{satuan}', [SatuanController::class, 'update'])->name('update');
            Route::delete('/{satuan}', [SatuanController::class, 'destroy'])->name('destroy');
            Route::get('/list', [SatuanController::class, 'list'])->name('list');
        });

        // ==== PPBJ ====
        Route::get('/ppbj/check-ppbj-no', [PpbjController::class, 'checkPpbjNo'])->name('ppbj.checkPpbjNo');
        Route::get('/ppbj/export', [PpbjController::class, 'export'])->name('ppbj.export');
        Route::get('/ppbj/template', [PpbjController::class, 'downloadTemplate'])->name('ppbj.template');
        Route::get('/ppbj/report', [PpbjController::class, 'reportIndex'])->name('ppbj.report');
        Route::get('/ppbj/report/data', [PpbjController::class, 'reportData'])->name('ppbj.report.data');
        Route::get('/ppbj/report/export', [PpbjController::class, 'reportExport'])->name('ppbj.report.export');

        Route::post('/ppbj/import/preview', [PpbjController::class, 'previewImport'])->name('ppbj.import.preview');
        Route::post('/ppbj/import/process', [PpbjController::class, 'processImport'])->name('ppbj.import.process');

        Route::get('/ppbj', [PpbjController::class, 'index'])->name('ppbj.index');
        Route::get('/ppbj/{id}/archive', [PpbjController::class, 'archiveStatus'])->name('ppbj.archive');
        Route::post('/ppbj', [PpbjController::class, 'store'])->name('ppbj.store');
        Route::put('/ppbj/{id}', [PpbjController::class, 'update'])->name('ppbj.update');
        Route::put('/ppbj/{id}/cancel', [PpbjController::class, 'cancel'])->name('ppbj.cancel');

        // ========================
        // SUPERADMIN MENU (Khusus Umum)
        // ========================
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::put('/users/{id}/password', [UserController::class, 'updatePassword'])->name('users.password');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('/users/export', [UserController::class, 'export'])->name('users.export');

        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
            ->name('dashboard.indexumum');

        Route::get('/dashboard/data', [DashboardController::class, 'getData'])
            ->name('dashboard.data');

        Route::post('/dashboard/refresh-cache', [DashboardController::class, 'refreshCache'])
            ->name('dashboard.refresh');

        Route::post('/master/{type}', [MasterDataController::class, 'addMaster']);
        Route::get('/master/{type}', [MasterDataController::class, 'index']);
        Route::put('/master/{type}/{id}', [MasterDataController::class, 'update']);
        Route::delete('/master/{type}/{id}', [MasterDataController::class, 'destroy']);

        // ==== Approval PR Receipt ====
        Route::get('/approval/pr-receipts', [PrReceiptApprovalController::class, 'index'])
            ->name('approval.pr.index');

        Route::post('/approval/pr-receipts/{id}/approve', [PrReceiptApprovalController::class, 'approve'])
            ->name('approval.pr.approve');

        Route::post('/approval/pr-receipts/{id}/reject', [PrReceiptApprovalController::class, 'reject'])
            ->name('approval.pr.reject');

        Route::get('/approval/pr-receipts/pending-count', [PrReceiptApprovalController::class, 'pendingCount'])
            ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
            ->name('approval.pr.pendingCount');

        Route::get('/vendor/search', [VendorController::class, 'search'])->name('vendor.search');
        Route::resource('vendor', VendorController::class)->except(['show', 'create', 'edit']);
        Route::post('vendor/{vendor}/toggle', [VendorController::class, 'toggleActive'])->name('vendor.toggle');

        // ==== Master Kontrak SP ====
        Route::resource('sp-master-options', SpMasterOptionController::class)
            ->except(['show', 'create', 'edit']);

        Route::prefix('spph')->name('spph.')->middleware('auth')->group(function () {

            // ── Halaman Utama ──
            Route::get('/', [SpphController::class, 'index'])->name('index');
            Route::post('/', [SpphController::class, 'store'])->name('store');

            // ── Export ──
            Route::get('/export', [SpphController::class, 'export'])->name('export');

            // ── Real-time (tanpa logging) ──
            Route::get('/poll', [SpphController::class, 'poll'])
                ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
                ->name('poll');
            Route::get('/presence', [SpphController::class, 'getPresence'])
                ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
                ->name('presence');
            Route::post('/presence/start', [SpphController::class, 'startPresence'])->name('presence.start');
            Route::post('/presence/stop', [SpphController::class, 'stopPresence'])->name('presence.stop');

            // ── Validasi Nomor ──
            Route::get('/check-nomor', [SpphController::class, 'checkNomor'])->name('check-nomor');
            Route::get('/suggest-nomor', [SpphController::class, 'suggestNomor'])->name('suggest-nomor');

            // ── PPBJ Dropdown ──
            Route::get('/ppbj-options', [SpphController::class, 'getPpbjOptions'])->name('ppbj-options');
            Route::get('/check-ppbj', [SpphController::class, 'checkPpbjStatus'])->name('check-ppbj');

            // ── Onboarding Tutorial ──
            Route::get('/onboarding-status', function () {
                $id = auth()->id();
                $seenKey = 'spph_onboarding_'.$id;
                $viewsKey = 'spph_onboarding_views_'.$id;
                $finishedKey = 'spph_onboarding_finished_'.$id;

                return response()->json([
                    'seen' => Cache::has($seenKey),
                    'finished' => Cache::has($finishedKey),
                    'left' => (int) Cache::get($viewsKey, 0),
                ]);
            })->name('onboarding.status');

            Route::post('/onboarding-seen', function () {
                $id = auth()->id();
                $seenKey = 'spph_onboarding_'.$id;
                $viewsKey = 'spph_onboarding_views_'.$id;
                $finishedKey = 'spph_onboarding_finished_'.$id;

                // Jangan override jika sudah finished
                if (Cache::has($finishedKey)) {
                    return response()->json(['status' => 'finished']);
                }

                Cache::forever($seenKey, true);

                // Set views HANYA jika belum ada (supaya tidak reset)
                if (! Cache::has($viewsKey)) {
                    Cache::forever($viewsKey, 3);
                }

                return response()->json(['status' => 'ok']);
            })->name('onboarding.seen');

            Route::post('/onboarding-view', function () {
                $id = auth()->id();
                $viewsKey = 'spph_onboarding_views_'.$id;
                $finishedKey = 'spph_onboarding_finished_'.$id;

                $current = (int) Cache::get($viewsKey, 0);
                $next = $current - 1;

                if ($next <= 0) {
                    // Hapus views counter
                    Cache::forget($viewsKey);
                    // Set flag FINISHED secara permanen
                    Cache::forever($finishedKey, true);

                    return response()->json(['status' => 'finished']);
                }

                Cache::forever($viewsKey, $next);

                return response()->json(['status' => 'ok', 'left' => $next]);
            })->name('onboarding.view');
        });

        // ── Resource Route (✅ Pisah agar parameter tidak bentrok) ──
        Route::prefix('spph')->name('spph.')->middleware('auth')->group(function () {
            Route::put('/{spph}', [SpphController::class, 'update'])->name('update');
            Route::delete('/{spph}', [SpphController::class, 'destroy'])->name('destroy');
            Route::get('/{spph}/cetak', [SpphController::class, 'cetakSpph'])->name('cetak');
            Route::get('/{spph}/items', [SpphController::class, 'getItems'])->name('items');
        });

        // ---- SP ----
        Route::prefix('sp')->name('sp.')->middleware('auth')->group(function () {
            Route::get('/', [SpController::class, 'index'])->name('index');
            Route::post('/', [SpController::class, 'store'])->name('store');
            Route::put('/{sp}', [SpController::class, 'update'])->name('update');
            Route::delete('/{sp}', [SpController::class, 'destroy'])->name('destroy');
            Route::get('/{sp}/items', [SpController::class, 'getItems'])->name('items');

            // Cetak SP
            Route::get('/{sp}/cetak', [SpController::class, 'cetakSp'])->name('cetak');

            // Utilities
            Route::get('/poll', [SpController::class, 'poll'])
                ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
                ->name('poll');
            Route::get('/check-nomor', [SpController::class, 'checkNomor'])->name('check-nomor');
            Route::get('/suggest-nomor', [SpController::class, 'suggestNomor'])->name('suggest-nomor');
            Route::get('/ppbj-options', [SpController::class, 'getPpbjOptions'])->name('ppbj-options');
            Route::get('/check-ppbj', [SpController::class, 'checkPpbjStatus'])->name('check-ppbj');

            Route::get('/onboarding-status', function () {
                $id = auth()->id();
                $seenKey = 'sp_onboarding_'.$id;
                $viewsKey = 'sp_onboarding_views_'.$id;
                $finishedKey = 'sp_onboarding_finished_'.$id;

                return response()->json([
                    'seen' => Cache::has($seenKey),
                    'finished' => Cache::has($finishedKey),
                    'left' => (int) Cache::get($viewsKey, 0),
                ]);
            })->name('onboarding.status');

            Route::post('/onboarding-seen', function () {
                $id = auth()->id();
                $seenKey = 'sp_onboarding_'.$id;
                $viewsKey = 'sp_onboarding_views_'.$id;
                $finishedKey = 'sp_onboarding_finished_'.$id;

                if (Cache::has($finishedKey)) {
                    return response()->json(['status' => 'finished']);
                }

                Cache::forever($seenKey, true);

                if (! Cache::has($viewsKey)) {
                    Cache::forever($viewsKey, 3);
                }

                return response()->json(['status' => 'ok']);
            })->name('onboarding.seen');

            Route::post('/onboarding-view', function () {
                $id = auth()->id();
                $viewsKey = 'sp_onboarding_views_'.$id;
                $finishedKey = 'sp_onboarding_finished_'.$id;

                $current = (int) Cache::get($viewsKey, 0);
                $next = $current - 1;

                if ($next <= 0) {
                    Cache::forget($viewsKey);
                    Cache::forever($finishedKey, true);

                    return response()->json(['status' => 'finished']);
                }

                Cache::forever($viewsKey, $next);

                return response()->json(['status' => 'ok', 'left' => $next]);
            })->name('onboarding.view');

            Route::get('/export', [SpController::class, 'export'])->name('export');

            // Presence
            Route::post('/presence/start', [SpController::class, 'startPresence'])->name('presence.start');
            Route::post('/presence/stop', [SpController::class, 'stopPresence'])->name('presence.stop');
            Route::get('/presence', [SpController::class, 'getPresence'])
                ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
                ->name('presence');
        });
    });

    // ========================
    // OPERASIONAL (Dept: operasional)
    // ========================
    Route::middleware(['dept:operasional'])->group(function () {

        // ==== TORPR CRUD ====
        Route::get('/torpr', [TorprController::class, 'index'])->name('torpr.index');
        Route::post('/torpr', [TorprController::class, 'store'])->name('torpr.store');
        Route::put('/torpr/{id}', [TorprController::class, 'update'])->name('torpr.update');

        Route::get('/torpr/{id}/json', [TorprController::class, 'showJson'])
            ->name('torpr.json');

        Route::post('/torpr/{id}/resubmit', [TorprController::class, 'resubmitRejectedPr'])->name('torpr.resubmit');

        Route::post('/torpr/{id}/request-receipt', [TorprController::class, 'requestReceipt'])
            ->name('torpr.requestReceipt');
        Route::get('/torpr/receipt-status-bulk', [TorprController::class, 'receiptStatusBulk']);

        Route::get('/torpr/{id}/receipt-status', [TorprController::class, 'receiptStatus'])
            ->name('torpr.receiptStatus');

        // ==== Tracking PR ====
        Route::get('/tracking-pr', [TrackingPrController::class, 'index'])->name('tracking.index');

        Route::get('/tracking-pr/suggest', [TrackingPrController::class, 'suggest'])
            ->name('tracking.suggest');
        Route::get('/tracking-pr/search', [TrackingPrController::class, 'search']);
        Route::get('/tracking-pr/history/{nomorPr}', [TrackingPrController::class, 'history']);
        Route::get('/tracking-pr/statistics', [TrackingPrController::class, 'statistics']);
        Route::delete('/tracking-pr/cache', [TrackingPrController::class, 'clearCache']);

        Route::get('/torpr/export/full', [TorprController::class, 'exportFull'])
            ->name('torpr.export.full');

        Route::get('/ops/dashboard', [OperasionalDashboardController::class, 'index'])
            ->name('ops.dashboard');
        Route::get('/ops/dashboard/data', [OperasionalDashboardController::class, 'getData'])
            ->name('ops.dashboard.data');

        Route::post('/ops/dashboard/refresh-cache', [OperasionalDashboardController::class, 'refreshCache'])
            ->name('ops.dashboard.refresh');

        Route::delete('/ops/dashboard/clear-cache', [OperasionalDashboardController::class, 'clearCache'])
            ->name('ops.dashboard.clear');

        Route::get('/torpr/template', [TorprController::class, 'downloadTemplate'])->name('torpr.template');
        Route::post('/torpr/import/preview', [TorprController::class, 'previewImport'])->name('torpr.import.preview');
        Route::post('/torpr/import/process', [TorprController::class, 'processImport'])->name('torpr.import.process');

        // Regenerate token (requires auth - operasional only)
        Route::middleware(['auth', 'dept:operasional'])->group(function () {
            Route::post('/pr/{id}/regenerate-token/{type}', [TorprController::class, 'regenerateSignToken'])
                ->name('pr.regenerate-token')
                ->where('type', 'kacab|kabid');

            Route::get('/pr/sign-qr/{token}/{type}', [TorprController::class, 'quickSignQr'])
                ->name('pr.quick-sign-qr')
                ->where('type', 'kacab|kabid');
        });

        Route::get('/torpr/{id}/logs', [TorprController::class, 'getLogs'])->name('torpr.logs');
    });

    // ========================
    // CHATBOT ROUTES (Authenticated Users)
    // ========================
    Route::prefix('chatbot')->group(function () {
        // Chat endpoint (available for both authenticated and guest)
        Route::post('/chat', [App\Http\Controllers\WebChatbotController::class, 'chat'])
            ->name('chatbot.web.chat')
            ->middleware('throttle:10,1')
            ->withoutMiddleware(['auth']); // Allow guest access

        Route::get('/quick-replies', [App\Http\Controllers\WebChatbotController::class, 'quickReplies'])
            ->name('chatbot.web.quick');

        Route::delete('/clear', [App\Http\Controllers\WebChatbotController::class, 'clearHistory'])
            ->name('chatbot.web.clear');

        Route::get('/greeting', [App\Http\Controllers\WebChatbotController::class, 'getGreeting'])
            ->name('chatbot.greeting');

        Route::post('/feedback', [App\Http\Controllers\FeedbackController::class, 'store'])
            ->name('chatbot.feedback');

        // ==== PR NOTIFICATIONS (Super Admin Only) ====
        Route::get('/notifications/count', [App\Http\Controllers\WebChatbotController::class, 'getNotificationCount'])
            ->middleware(\App\Http\Middleware\DisableLoggingForPolling::class)
            ->name('chatbot.notifications.count');

        Route::post('/notifications/sync', [App\Http\Controllers\WebChatbotController::class, 'syncNotifications'])
            ->middleware('dept:umum')
            ->name('chatbot.notifications.sync');

        // ==== ARTISAN COMMANDS (Super Admin Only) ====
        Route::post('/artisan/execute', [App\Http\Controllers\ArtisanCommandController::class, 'executeCommand'])
            ->name('chatbot.artisan.execute');

        Route::get('/artisan/list', [App\Http\Controllers\ArtisanCommandController::class, 'listCommands'])
            ->name('chatbot.artisan.list');

    });
});

require __DIR__.'/auth.php';
