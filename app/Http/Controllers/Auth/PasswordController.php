<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Rules\PasswordStorageLimits;
use App\Services\AccountPasswordUpdater;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request, AccountPasswordUpdater $updater): RedirectResponse
    {
        $validated = $request->validateWithBag('updatePassword', [
            'current_password' => ['bail', 'required', 'string', 'max:1024', 'not_regex:/\x00/', 'current_password'],
            'password' => ['bail', 'required', 'string', 'max:255', new PasswordStorageLimits, Password::defaults(), 'confirmed'],
        ]);

        $updater->update($request->user(), $validated['password'], 'updatePassword');

        return back()->with('status', 'password-updated');
    }
}
