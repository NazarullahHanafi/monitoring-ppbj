<?php

namespace App\Observers;

use App\Models\Satuan;
use Illuminate\Support\Facades\Cache;

class SatuanObserver
{
    public function created(Satuan $satuan): void
    {
        Cache::forget('satuans:all');
    }

    public function updated(Satuan $satuan): void
    {
        Cache::forget('satuans:all');
    }

    public function deleted(Satuan $satuan): void
    {
        Cache::forget('satuans:all');
    }
}