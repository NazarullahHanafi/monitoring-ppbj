<?php

namespace App\Http\Controllers;

use App\Jobs\SendFeedbackEmail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class FeedbackController extends Controller
{
    /**
     * Terima feedback dari chatbot dan masukkan pengiriman email ke antrean.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'message' => 'required|string|max:1000',
                'category' => 'nullable|string|in:keluhan,saran,pertanyaan,lainnya',
            ]);

            $user = Auth::user();
            $category = $validated['category'] ?? 'lainnya';

            $emailData = [
                'userName' => $user?->name ?? 'Guest',
                'userEmail' => $user?->email ?? '-',
                'userDept' => $user?->department ?? '-',
                'category' => ucfirst($category),
                'userMessage' => $validated['message'],
                'sentAt' => Carbon::now('Asia/Jakarta')->format('d M Y H:i').' WIB',
            ];

            SendFeedbackEmail::dispatch($emailData, $category)->afterCommit();

            Log::info('Feedback email queued successfully', [
                'user_id' => $user?->id,
                'category' => $category,
            ]);

            return response()->json([
                'success' => true,
                'message' => "✅ **Feedback Masuk Antrean!**\n\nTerima kasih! Pesan Anda sedang dikirim ke admin di belakang layar. 🙏",
            ]);
        } catch (ValidationException $exception) {
            Log::error('Feedback validation failed', ['errors' => $exception->errors()]);

            return response()->json([
                'success' => false,
                'message' => '⚠️ Pesan terlalu pendek atau tidak valid.',
            ], 422);
        } catch (Throwable $exception) {
            Log::error('Feedback queue failed', [
                'error' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => '⚠️ Gagal memasukkan feedback ke antrean. Silakan coba lagi.',
            ], 500);
        }
    }
}
