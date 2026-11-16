<?php

namespace App\Http\Controllers;

use App\Services\MaintenanceCommandGate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Output\NullOutput;
use Throwable;

class ArtisanCommandController extends Controller
{
    private const COMMANDS = [
        'cache:clear' => 'Membersihkan application cache',
        'config:clear' => 'Membersihkan configuration cache',
        'view:clear' => 'Membersihkan compiled views',
        'route:clear' => 'Membersihkan route cache',
        'optimize:clear' => 'Membersihkan cache optimasi aplikasi',
        'config:cache' => 'Cache konfigurasi',
        'route:cache' => 'Cache routes',
        'view:cache' => 'Compile Blade templates',
        'optimize' => 'Membangun cache optimasi aplikasi',
    ];

    public function executeCommand(Request $request): JsonResponse
    {
        if ($denied = $this->accessDenied()) {
            return $denied;
        }

        $validator = Validator::make($request->only('message'), ['message' => 'bail|required|string|max:200']);
        if ($validator->fails()) {
            return $this->reply([
                'success' => false,
                'message' => 'Isi satu perintah lengkap, maksimal 200 karakter.',
                'errors' => $validator->errors()->toArray(),
            ], 422);
        }

        $command = self::parseCommand($validator->validated()['message']);
        if ($command === null) {
            return $this->reply([
                'success' => false,
                'message' => 'Perintah belum dijalankan. Ketik satu perintah utuh, misalnya `php artisan view:clear`, tanpa kalimat tambahan, opsi, atau perintah lain. Ketik **list commands** untuk daftar perintah.',
            ], 422);
        }

        try {
            $result = app(MaintenanceCommandGate::class)->run(function () use ($command) {
                Log::info('Chatbot maintenance command started', ['command' => $command, 'user_id' => Auth::id()]);
                // Do not buffer or expose command output: it can contain server paths/configuration.
                $exitCode = Artisan::call($command, [], new NullOutput);
                Log::log($exitCode === 0 ? 'info' : 'error', 'Chatbot maintenance command finished', [
                    'command' => $command, 'user_id' => Auth::id(), 'exit_code' => $exitCode,
                ]);

                return $exitCode;
            });

            if ($result['state'] === 'busy') {
                return $this->reply(['success' => false, 'message' => 'Pemeliharaan lain masih berjalan. Tunggu sampai selesai sebelum mencoba lagi.'], 409);
            }
            if ($result['state'] === 'limited') {
                return $this->reply(['success' => false, 'message' => 'Batas pemeliharaan server tercapai. Coba lagi sebentar.'], 429)
                    ->header('Retry-After', (string) $result['retry_after']);
            }
            if ($result['exit_code'] !== 0) {
                return $this->reply(['success' => false, 'message' => 'Perintah tidak selesai dengan sukses. Periksa log server sebelum mencoba lagi.'], 500);
            }

            return $this->reply([
                'success' => true,
                'message' => "**Perintah berhasil dijalankan**\n\n`php artisan {$command}`\n".self::COMMANDS[$command],
                'command_executed' => $command,
                'is_artisan_command' => true,
            ]);
        } catch (Throwable $error) {
            Log::error('Chatbot maintenance command failed', [
                'command' => $command, 'user_id' => Auth::id(), 'exception_type' => get_class($error),
            ]);

            return $this->reply(['success' => false, 'message' => 'Pemeliharaan gagal diproses. Periksa log server sebelum mencoba lagi.'], 500);
        }
    }

    public function listCommands(Request $request): JsonResponse
    {
        if ($denied = $this->accessDenied()) {
            return $denied;
        }

        $message = "**Perintah pemeliharaan yang tersedia**\n\n";
        foreach (self::COMMANDS as $command => $description) {
            $message .= "- `{$command}` — {$description}\n";
        }
        $message .= "\nKetik satu perintah lengkap: `php artisan view:clear`, `artisan view:clear`, `jalankan view:clear`, atau `view:clear`.\nPemeliharaan berjalan satu per satu, maksimal 5 per menit untuk seluruh admin pada server ini. Jalankan hanya saat diperlukan; penghapusan cache membuat permintaan berikutnya membangun cache kembali.";

        return $this->reply(['success' => true, 'message' => $message, 'is_command_list' => true]);
    }

    public static function parseCommand(string $message): ?string
    {
        // Anchor the entire input. Questions, negations, arguments and multiple lines never execute.
        if (! preg_match('/\A(?:(?:php[ \t]+)?artisan[ \t]+|(?:run|jalankan|execute)[ \t]+)?([a-z]+(?::[a-z]+)?)\z/i', trim($message, " \t"), $matches)) {
            return null;
        }
        $command = strtolower($matches[1]);

        return isset(self::COMMANDS[$command]) ? $command : null;
    }

    private function accessDenied(): ?JsonResponse
    {
        $user = Auth::user();
        if (! $user || $user->role !== 'superadmin' || $user->department !== 'umum') {
            return $this->reply(['success' => false, 'message' => 'Akses perintah server hanya untuk Superadmin Umum.'], $user ? 403 : 401);
        }

        return null;
    }

    private function reply(array $payload, int $status = 200): JsonResponse
    {
        return response()->json($payload, $status)->header('Cache-Control', 'no-store, private');
    }
}
