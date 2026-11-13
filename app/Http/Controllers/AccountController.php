<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function edit()
    {
        return view('account.edit');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['bail', 'required', 'string', 'max:1024', 'current_password'],
            'password' => [
                'bail',
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if (config('hashing.driver') === 'bcrypt' && strlen($value) > 72) {
                        $fail('Password maksimal 72 byte. Kurangi panjang password Anda.');
                    }
                },
            ],
        ], [
            'current_password.current_password' => 'Password lama salah.',
            'password.confirmed' => 'Konfirmasi password tidak sama.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka.',
        ]);

        $user = $request->user();

        $user->password = Hash::make($request->password);
        $user->save();

        return back()->with('status', 'Password berhasil diperbarui.');
    }
}
