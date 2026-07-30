<?php

namespace App\Http\Controllers;

use App\Services\TelegramBotService;
use Illuminate\Http\Request;

class TelegramWebhookController extends Controller
{
    public function __invoke(Request $request, string $secret, TelegramBotService $telegram)
    {
        $expectedSecret = (string) config('services.telegram.webhook_secret');

        if ($expectedSecret === '' || ! hash_equals($expectedSecret, $secret)) {
            abort(404);
        }

        $telegram->handleUpdate($request->all());

        return response()->json(['ok' => true]);
    }
}
