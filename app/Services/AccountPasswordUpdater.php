<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AccountPasswordUpdater
{
    public function update(User $actor, string $password, string $errorBag = 'default'): void
    {
        $expected = (string) $actor->getAuthPassword();
        // Hashing must not extend the row lock's duration.
        $next = ['password' => Hash::make($password), 'remember_token' => Str::random(60)];
        DB::transaction(function () use ($actor, $expected, $next, $errorBag): void {
            $current = User::query()->select(['id', 'password', 'remember_token', 'is_active', 'role'])->lockForUpdate()->findOrFail($actor->id);
            abort_unless($current->is_active && ! $current->isReadOnly(), 403);
            if (! hash_equals($expected, (string) $current->getAuthPassword())) {
                throw ValidationException::withMessages([
                    'current_password' => 'Password akun telah berubah. Masukkan password terbaru sebelum mencoba lagi.',
                ])->errorBag($errorBag)->status(409);
            }
            $current->forceFill($next)->save();
        });
        $actor->forceFill($next)->syncOriginalAttributes(array_keys($next));
    }
}
