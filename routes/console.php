<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('owner:backup-email')
    ->weeklyOn(5, '02:00')
    ->timezone(config('app.timezone', 'Asia/Jakarta'))
    ->withoutOverlapping();

Schedule::command('ppbj:contract-reminders')
    ->dailyAt('07:05')
    ->timezone(config('app.timezone', 'Asia/Jakarta'))
    ->withoutOverlapping(10)
    ->onOneServer();

// Shared hosting tidak menjalankan daemon queue permanen. Worker singkat ini
// menguras email dan notifikasi Telegram tiap menit lalu berhenti, sehingga
// request web tidak menunggu koneksi eksternal dan worker PHP tetap tersedia.
Schedule::command('queue:work database --queue=notifications,telegram --stop-when-empty --tries=3 --timeout=30 --max-time=50')
    ->everyMinute()
    ->withoutOverlapping(2)
    ->runInBackground();
