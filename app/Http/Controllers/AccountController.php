<?php

namespace App\Http\Controllers;

use App\Rules\PasswordStorageLimits;
use App\Services\AccountPasswordUpdater;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AccountController extends Controller
{
    public function edit(): View
    {
        return view('account.edit');
    }

    public function updatePassword(Request $request, AccountPasswordUpdater $updater): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['bail', 'required', 'string', 'max:1024', 'not_regex:/\x00/', 'current_password'],
            'password' => [
                'bail',
                'required',
                'string',
                'max:255',
                'min:8',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                new PasswordStorageLimits,
            ],
        ], [
            'current_password.current_password' => 'Password lama salah.',
            'password.confirmed' => 'Konfirmasi password tidak sama.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.regex' => 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka.',
        ]);

        $updater->update($request->user(), $validated['password']);
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Password berhasil diperbarui.'])->header('Cache-Control', 'private, no-store');
        }

        return back()->with('status', 'Password berhasil diperbarui.');
    }
}
