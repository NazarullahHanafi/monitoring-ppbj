<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FeedbackController extends Controller
{
    /**
     * Terima feedback dari chatbot dan kirim ke email admin
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
            $userMessage = $validated['message'];
            $sentAt = Carbon::now()->timezone('Asia/Jakarta')->format('d M Y H:i') . ' WIB';

            Log::info('Sending feedback email', [
                'user_id' => $user->id ?? null,
                'category' => $category,
            ]);

            // ✅ FIX: Data untuk template
            $emailData = [
                'userName' => $user->name ?? 'Guest',
                'userEmail' => $user->email ?? '-',
                'userDept' => $user->department ?? '-',
                'category' => ucfirst($category),
                'userMessage' => $userMessage,
                'sentAt' => $sentAt,
            ];

            // ✅ FIX: Kirim email dengan syntax yang benar
            Mail::send('emails.feedback', $emailData, function ($m) use ($user, $category) {
                $m->from(config('mail.from.address'), config('mail.from.name'))
                    ->to('nazarullahhanafi5@gmail.com', 'Admin PPBJ')
                    ->cc(['nazarullah12104@gmail.com'])
                    ->subject("💬 [FEEDBACK - " . strtoupper($category) . "] dari " . ($user->name ?? 'Guest'));
            });


            Log::info('Feedback sent successfully');

            return response()->json([
                'success' => true,
                'message' => "✅ **Feedback Terkirim!**\n\nTerima kasih! Pesan Anda sudah dikirim ke admin. Kami akan segera menindaklanjutinya. 🙏"
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Feedback validation failed', ['errors' => $e->errors()]);

            return response()->json([
                'success' => false,
                'message' => '⚠️ Pesan terlalu pendek atau tidak valid.'
            ], 422);

        } catch (\Exception $e) {
            Log::error('Feedback send failed', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => '⚠️ Gagal mengirim feedback. Silakan coba lagi.'
            ], 500);
        }
    }
}
