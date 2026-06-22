<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait HasPresence
{
    abstract protected function presenceKey(): string;

    public function startPresence()
    {
        $active = Cache::get($this->presenceKey(), []);
        $active[auth()->id()] = [
            'user_id' => auth()->id(),
            'name'    => auth()->user()->name,
            'ts'      => now()->timestamp,
        ];
        Cache::put($this->presenceKey(), $active, 120);
        return response()->json(['ok' => true]);
    }

    public function stopPresence()
    {
        $active = Cache::get($this->presenceKey(), []);
        unset($active[auth()->id()]);
        Cache::put($this->presenceKey(), $active, 120);
        return response()->json(['ok' => true]);
    }

    public function getPresence()
    {
        $active = Cache::get($this->presenceKey(), []);
        $now    = now()->timestamp;
        $dirty  = false;

        foreach ($active as $uid => $u) {
            if (($now - $u['ts']) > 50) {
                unset($active[$uid]);
                $dirty = true;
            }
        }
        if ($dirty) Cache::put($this->presenceKey(), $active, 120);

        $others = array_filter($active, fn($u) => $u['user_id'] != auth()->id());

        return response()->json(['users' => array_values($others)]);
    }
}