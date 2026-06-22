<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ArtisanCommandController extends Controller
{
    /**
     * Whitelist commands yang diperbolehkan untuk keamanan
     */
    protected $allowedCommands = [
        'cache:clear' => 'Membersihkan application cache',
        'config:clear' => 'Membersihkan configuration cache',
        'view:clear' => 'Membersihkan compiled views',
        'route:clear' => 'Membersihkan route cache',
        'optimize:clear' => 'Membersihkan semua cache (config, view, route, compiled)',
        'config:cache' => 'Cache konfigurasi untuk performa',
        'route:cache' => 'Cache routes untuk performa',
        'view:cache' => 'Compile semua Blade templates',
        'optimize' => 'Optimize aplikasi (cache config & routes)',
    ];

    /**
     * Execute artisan command via chatbot
     * 
     * SECURITY: Hanya Super Admin (dept: umum) yang boleh akses!
     */
    public function executeCommand(Request $request)
    {
        try {
            // ===================================
            // 1. SECURITY CHECK - Super Admin Only!
            // ===================================
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => '🔒 Anda harus login untuk menggunakan fitur ini.'
                ], 401);
            }

            $user = Auth::user();
            
            // Cek apakah user adalah Super Admin (dept: umum)
            if ($user->role !== 'superadmin' || $user->department !== 'umum') {
                Log::warning('Unauthorized artisan command attempt', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'dept' => $user->department,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => '⛔ **Akses Ditolak!**

Fitur ini hanya untuk **Super Admin** (Bagian Umum).

Departemen Anda: `' . strtoupper($user->department ?? '-') . '`

Jika Anda memerlukan command ini dijalankan, silakan hubungi bagian Umum.'
                ], 403);
            }

            // ===================================
            // 2. VALIDATE & PARSE COMMAND
            // ===================================
            $message = trim($request->input('message', ''));
            
            // Extract command dari message
            $command = $this->extractCommand($message);
            
            if (!$command) {
                return response()->json([
                    'success' => false,
                    'message' => '❓ Command tidak dikenali.

**Format yang benar:**
- `php artisan cache:clear`
- `artisan view:clear`
- `run optimize`
- Atau ketik: **"list commands"** untuk melihat daftar command yang tersedia.'
                ]);
            }

            // ===================================
            // 3. SECURITY CHECK - Whitelist Command
            // ===================================
            if (!isset($this->allowedCommands[$command])) {
                Log::warning('Attempted to run non-whitelisted command', [
                    'command' => $command,
                    'user_id' => $user->id,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => '⚠️ **Command Tidak Diizinkan!**

Command: `' . $command . '`

**Alasan keamanan:** Hanya command tertentu yang diperbolehkan.

Ketik **"list commands"** untuk melihat command yang tersedia.'
                ]);
            }

            // ===================================
            // 4. EXECUTE COMMAND
            // ===================================
            Log::info('Executing artisan command via chatbot', [
                'command' => $command,
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip()
            ]);

            // Execute command
            Artisan::call($command);
            $output = Artisan::output();

            // Log success
            Log::info('Artisan command executed successfully', [
                'command' => $command,
                'user_id' => $user->id,
                'output' => $output
            ]);

            return response()->json([
                'success' => true,
                'message' => $this->formatSuccessResponse($command, $output),
                'command_executed' => $command,
                'is_artisan_command' => true
            ]);

        } catch (\Exception $e) {
            Log::error('Artisan command execution failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => '❌ **Error saat menjalankan command!**

Command mungkin gagal dieksekusi.

Silakan coba lagi atau hubungi developer. Detail teknis telah dicatat di log.'
            ], 500);
        }
    }

    /**
     * Get list of available commands
     */
    public function listCommands(Request $request)
    {
        // Check if user is Super Admin
        if (!Auth::check() || Auth::user()->role !== 'superadmin' || Auth::user()->department !== 'umum') {
            return response()->json([
                'success' => false,
                'message' => '⛔ Hanya Super Admin yang dapat melihat daftar command.'
            ], 403);
        }

        $commandList = "🔧 **Daftar Command Yang Tersedia**\n\n";
        $commandList .= "**Cache Management:**\n";
        $commandList .= "• `cache:clear` - " . $this->allowedCommands['cache:clear'] . "\n";
        $commandList .= "• `config:clear` - " . $this->allowedCommands['config:clear'] . "\n";
        $commandList .= "• `view:clear` - " . $this->allowedCommands['view:clear'] . "\n";
        $commandList .= "• `route:clear` - " . $this->allowedCommands['route:clear'] . "\n";
        $commandList .= "• `optimize:clear` - " . $this->allowedCommands['optimize:clear'] . "\n\n";
        
        $commandList .= "**Performance Optimization:**\n";
        $commandList .= "• `config:cache` - " . $this->allowedCommands['config:cache'] . "\n";
        $commandList .= "• `route:cache` - " . $this->allowedCommands['route:cache'] . "\n";
        $commandList .= "• `view:cache` - " . $this->allowedCommands['view:cache'] . "\n";
        $commandList .= "• `optimize` - " . $this->allowedCommands['optimize'] . "\n\n";
        
        $commandList .= "**Cara Pakai:**\n";
        $commandList .= "Ketik salah satu format berikut:\n";
        $commandList .= "• `php artisan cache:clear`\n";
        $commandList .= "• `artisan view:clear`\n";
        $commandList .= "• `run optimize`\n";
        $commandList .= "• `jalankan config:clear`\n\n";
        
        $commandList .= "💡 **Tips:** Gunakan `optimize:clear` untuk clear semua cache sekaligus!";

        return response()->json([
            'success' => true,
            'message' => $commandList,
            'is_command_list' => true
        ]);
    }

    /**
     * Extract artisan command from message
     */
    protected function extractCommand(string $message): ?string
    {
        $message = strtolower(trim($message));

        // Pattern 1: "php artisan cache:clear"
        if (preg_match('/php\s+artisan\s+([a-z:]+)/', $message, $matches)) {
            return $matches[1];
        }

        // Pattern 2: "artisan view:clear"
        if (preg_match('/artisan\s+([a-z:]+)/', $message, $matches)) {
            return $matches[1];
        }

        // Pattern 3: "run optimize" / "jalankan cache:clear"
        if (preg_match('/(run|jalankan|execute)\s+([a-z:]+)/', $message, $matches)) {
            return $matches[2];
        }

        // Pattern 4: Direct command "cache:clear"
        foreach ($this->allowedCommands as $cmd => $desc) {
            if (strpos($message, $cmd) !== false) {
                return $cmd;
            }
        }

        return null;
    }

    /**
     * Format success response message
     */
    protected function formatSuccessResponse(string $command, string $output): string
    {
        $description = $this->allowedCommands[$command] ?? 'Command executed';
        
        $response = "✅ **Command Berhasil Dijalankan!**\n\n";
        $response .= "**Command:** `php artisan {$command}`\n";
        $response .= "**Deskripsi:** {$description}\n";
        $response .= "**Status:** Success ✓\n";
        $response .= "**User:** " . Auth::user()->email . "\n";
        $response .= "**Waktu:** " . now()->format('d M Y H:i:s') . "\n";
        
        // Add output if available and not too long
        if (!empty(trim($output)) && strlen($output) < 200) {
            $response .= "\n**Output:**\n```\n{$output}\n```";
        }

        $response .= "\n\n💡 **Info:** Perubahan akan langsung berlaku di sistem.";

        // Add specific notes for certain commands
        switch ($command) {
            case 'config:clear':
                $response .= "\n⚠️ **Note:** Config dari .env sekarang sudah di-reload.";
                break;
            case 'cache:clear':
                $response .= "\n⚠️ **Note:** Application cache sudah dibersihkan.";
                break;
            case 'view:clear':
                $response .= "\n⚠️ **Note:** Compiled Blade templates sudah dihapus.";
                break;
            case 'optimize:clear':
                $response .= "\n⚠️ **Note:** Semua cache (config, view, route, compiled) sudah dibersihkan.";
                break;
            case 'optimize':
                $response .= "\n⚠️ **Note:** Aplikasi sudah di-optimize untuk production.";
                break;
        }

        return $response;
    }
}
