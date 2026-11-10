<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('office:prune-visits', function () {
    $count = \Illuminate\Support\Facades\DB::table('virtual_office_visits')->where('visited_at', '<', now()->subDays(30))->delete();
    $this->info("Pruned {$count} old virtual-office visits.");
})->purpose('Keep only 30 days of coarse virtual-office menu visits');

Schedule::command('office:prune-visits')->dailyAt('02:30')->withoutOverlapping();

Artisan::command('office:prune-messages', function () {
    $count = \Illuminate\Support\Facades\DB::table('virtual_office_messages')->where('created_at', '<', now()->subDays(7))->delete();
    $this->info("Pruned {$count} old virtual-office messages.");
})->purpose('Keep only seven days of private virtual-office conversations');
Schedule::command('office:prune-messages')->dailyAt('02:40')->withoutOverlapping();

Artisan::command('procurement:prune-detail-drafts', function () {
    $count = 0;
    \App\Models\ProcurementDetailAttachment::whereNull('document_id')->where('created_at', '<', now()->subDays(2))
        ->chunkById(100, function ($attachments) use (&$count) {
            foreach ($attachments as $attachment) {
                $path = \Illuminate\Support\Facades\DB::transaction(function () use ($attachment) {
                    $draft = \App\Models\ProcurementDetailAttachment::whereKey($attachment->id)->whereNull('document_id')->lockForUpdate()->first();
                    if (! $draft) return null;
                    $path = $draft->path;
                    $draft->delete();
                    return $path;
                });
                if ($path) { \Illuminate\Support\Facades\Storage::disk('local')->delete($path); $count++; }
            }
        });
    $this->info("Pruned {$count} unattached detail drafts older than two days.");
})->purpose('Remove only expired, unclaimed procurement detail uploads');
Schedule::command('procurement:prune-detail-drafts')->dailyAt('02:50')->withoutOverlapping();

Schedule::command('owner:backup-email')
    ->weeklyOn(5, '02:00')
    ->timezone(config('app.timezone', 'Asia/Jakarta'))
    ->withoutOverlapping();

Schedule::command('ppbj:contract-reminders')
    ->dailyAt('07:05')
    ->timezone(config('app.timezone', 'Asia/Jakarta'))
    ->withoutOverlapping(10)
    ->onOneServer();

// Membaca access log di belakang layar. Request scanner tetap dihentikan
// Apache sehingga sensor keamanan ini tidak menambah waktu respons pengguna.
Schedule::command('security:scan-honeypot')
    ->everyMinute()
    ->withoutOverlapping(2)
    ->runInBackground();

// One low-priority worker; OCR never runs in a user's upload/search request.
Schedule::exec('nice -n 15 '.escapeshellarg(PHP_BINARY).' '.escapeshellarg(base_path('artisan')).' procurement:search-index --budget=15')
    ->everyMinute()->when(fn () => PHP_OS_FAMILY !== 'Windows' && config('procurement_search.enabled'))->withoutOverlapping(5)->runInBackground();

// Shared hosting tidak menjalankan daemon queue permanen. Worker singkat ini
// menguras email dan notifikasi Telegram tiap menit lalu berhenti, sehingga
// request web tidak menunggu koneksi eksternal dan worker PHP tetap tersedia.
Schedule::command('queue:work database --queue=notifications,telegram --stop-when-empty --tries=3 --timeout=30 --max-time=50')
    ->everyMinute()
    ->withoutOverlapping(2)
    ->runInBackground();
