<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PasswordStorageLimits implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value)) {
            return;
        }
        if (str_contains($value, "\0")) {
            $fail('Password tidak boleh berisi karakter null.');
        }
        if (config('hashing.driver') === 'bcrypt' && strlen($value) > 72) {
            $fail('Password maksimal 72 byte. Kurangi panjang password Anda.');
        }
    }
}
