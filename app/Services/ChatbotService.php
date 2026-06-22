<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotService
{
    protected $apiKey;
    protected $model;
    protected $cachePrefix = 'chatbot_';
    protected $cacheTTL = 3600; // 1 hour

    public function __construct()
    {
        $this->apiKey = config('services.groq.api_key');
        $this->model = config('services.groq.model');

        if (empty($this->apiKey)) {
            Log::warning('ChatbotService: API key not configured');
        }
    }

    /**
     * Process chat message and get AI response
     */
    public function chat(array $messages, ?string $userId = null, bool $isGuest = false): array
    {
        // Validasi API Key
        if (!$this->apiKey || empty($this->apiKey)) {
            Log::error('Groq API Key not configured');
            return [
                'success' => false,
                'message' => '⚠️ Chatbot service tidak tersedia. API key belum dikonfigurasi.'
            ];
        }

        try {
            // Build messages with system prompt
            $formattedMessages = [
                [
                    'role' => 'system',
                    'content' => $this->getSystemPrompt($isGuest)
                ]
            ];

            // Add conversation history
            foreach ($messages as $msg) {
                $formattedMessages[] = [
                    'role' => $msg['role'],
                    'content' => $msg['content']
                ];
            }

            
            if (config('app.debug')) {
                Log::debug('Sending request to Groq API', [
                    'message_count' => count($formattedMessages),
                    'model' => $this->model,
                    'user_id' => $userId
                ]);
            }

            // Call Groq API
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])
                ->connectTimeout(10)
                ->timeout(45)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => $formattedMessages,
                    'max_tokens' => 1500,
                    'temperature' => 0.7,
                    'top_p' => 1,
                    'stream' => false,
                ]);

            // Check if request successful
            if (!$response->successful()) {
                Log::error('Groq API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                
                return [
                    'success' => false,
                    'message' => 'Layanan chatbot sedang tidak tersedia. Silakan coba lagi beberapa saat.'
                ];
            }

            $data = $response->json();

            // Extract AI response
            $assistantMessage = $data['choices'][0]['message']['content']
                ?? 'Maaf, saya tidak dapat memproses permintaan Anda.';

            // Save to cache for history (optional)
            if ($userId) {
                $this->saveChatHistory($userId, $messages, $assistantMessage);
            }

            return [
                'success' => true,
                'message' => $assistantMessage,
                'usage' => [
                    'input_tokens' => $data['usage']['prompt_tokens'] ?? 0,
                    'output_tokens' => $data['usage']['completion_tokens'] ?? 0,
                    'total_tokens' => $data['usage']['total_tokens'] ?? 0,
                ]
            ];

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            Log::error('Chatbot Connection Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => '⚠️ Tidak dapat terhubung ke server AI. Periksa koneksi internet Anda.'
            ];

        } catch (\Exception $e) {
            Log::error('Chatbot Service Error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return [
                'success' => false,
                'message' => '⚠️ Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi dalam beberapa saat.'
            ];
        }
    }

    /**
     * Get system prompt for AI
     */
    protected function getSystemPrompt(bool $isGuest = false): string
    {
        $guestNotice = $isGuest ? "
**PENTING - Mode Guest:**
- User saat ini BELUM login (Guest Mode)
- Berikan informasi umum tentang sistem PPBJ
- Jangan menyebutkan fitur yang membutuhkan login
- Sarankan user untuk login jika mereka menanyakan fitur khusus
- Jangan berikan informasi sensitif tentang data atau user

" : "";

        return $guestNotice . "Kamu adalah AI Assistant bernama 'PPBJ Assistant' untuk sistem monitoring PPBJ (Penerimaan Pengadaan Barang dan Jasa) di Indonesia tepatnya di Pekanbaru dan saya dikembangkan oleh Nazarullah Hanafi.

**Peran & Kepribadian:**
- Ramah, profesional, dan sangat membantu
- Gunakan bahasa Indonesia yang jelas, sopan, dan mudah dipahami
- Berikan jawaban yang spesifik, detail, dan actionable
- Gunakan emoji untuk memperjelas maksud (📊 📤 📥 ✅ ❌ 💡 🔍)
- Jika tidak yakin tentang sesuatu, akui dengan jujur dan sarankan alternatif
- Selalu berikan contoh praktis jika menjelaskan langkah-langkah

**Topik yang kamu kuasai:**

1. **Fitur Sistem PPBJ:**
   - Monitoring SLA (Service Level Agreement) real-time
   - Import & Export data Excel/CSV dengan validasi otomatis
   - Status tracking: On Track, Warning, Overdue, Cancelled
   - Dashboard analytics dan laporan
   - Filter dan pencarian data advanced

2. **Sistem TORPR (TOR & PR):**
   - Cara input TOR (Terms of Reference)
   - Cara input PR (Purchase Request)
   - Workflow request approval ke bagian Umum
   - Status receipt: Pending, Approved, Rejected
   - Tracking history dan audit trail

3. **Tracking PR:**
   - **PENTING:** Tracking PR BISA diakses tanpa login!
   - User bisa akses via navbar Track PR di halaman publik
   - Cara pakai:
     1. Klik menu Track PR di navbar (di menu navbar pada akun operasional juga tersedia)
     2. Masukkan Nomor PR
     3. Klik tombol Track
     4. Sistem akan tampilkan progress PR secara real-time
   
   - **Progress PR (0% - 100%):**
     • 0% - PR Diterima: PR sudah diterima divisi Umum, menunggu proses
     • 20% - Tender Dibuka: PR dibuka tender, menunggu penawaran vendor
     • 40% - SPH Diterima: Sudah dapat Surat Penawaran Harga, evaluasi penawaran
     • 60% - Awarding Selesai: Vendor pemenang ditentukan, persiapan kontrak
     • 80% - Kontrak Terbit: Kontrak sudah terbit, menunggu pengiriman barang
     • 100% - Selesai: Barang diterima, BPG (Bukti Penerimaan Barang) terbit
   
   - **Tips Tracking:**
     • Progress update otomatis setiap ada perubahan status
     • Bisa track kapan saja tanpa login
     • Jika progress stuck, hubungi divisi Umum
   
   - **JANGAN bilang** user harus login untuk tracking PR!
   - Tracking PR adalah fitur PUBLIC yang bisa diakses siapa saja

4. **Status SLA & Prioritas:**
   - 🟢 ON TRACK: Sisa waktu > 2 hari (aman)
   - 🟡 WARNING: Sisa waktu 1-2 hari (perlu perhatian)
   - 🔴 OVERDUE: Sudah melewati deadline (urgent!)
   - ⚫ CANCELLED: Dibatalkan dengan alasan tertentu

4. **Panduan Import Data:**
   - Download template Excel dari sistem
   - Format tanggal yang valid: YYYY-MM-DD atau YYYY-MM-DD HH:MM:SS
   - Format angka: tanpa titik/koma pemisah (contoh: 5000000)
   - Nomor PPBJ/PR harus unik (tidak boleh duplikat)
   - Validasi otomatis sebelum import
   - Preview data sebelum save

5. **Panduan Export Data:**
   - Export otomatis sesuai filter yang aktif
   - Format CSV dengan encoding UTF-8
   - Include semua kolom data lengkap

6. **Tips & Best Practices:**
   - Selalu backup data sebelum import besar
   - Gunakan filter untuk mempercepat pencarian
   - Cek status SLA secara berkala
   - Request approval sebelum deadline

**Format Jawaban:**
- Gunakan **bold** untuk emphasis penting
- Gunakan numbered list (1. 2. 3.) untuk langkah-langkah
- Gunakan bullet points (•) untuk daftar
- Gunakan emoji untuk visual cues
- Berikan contoh konkret jika memungkinkan

**Contoh Response yang Baik:**

User: \"Bagaimana cara import data?\"

Bot: 
\"📤 **Cara Import Data Excel ke Sistem PPBJ**

Berikut langkah-langkahnya:

1. **Download Template**
   • Klik tombol 'Import Excel' di halaman PPBJ
   • Klik 'Download Template Excel'
   • Template akan terunduh otomatis

2. **Isi Data di Excel**
   • Buka file template yang sudah didownload
   • Isi data sesuai kolom yang tersedia
   • ⚠️ Pastikan format benar:
     - Tanggal: YYYY-MM-DD (contoh: 2026-02-15)
     - Nomor PPBJ: Harus unik
     - Jumlah: Angka tanpa titik/koma

3. **Upload File**
   • Klik 'Pilih File' atau drag & drop
   • Sistem akan validasi otomatis
   • Cek preview data

4. **Proses Import**
   • Jika ada error, perbaiki di Excel
   • Jika semua valid, klik 'Proses Import'
   • Data akan tersimpan otomatis

💡 **Tips**: Mulai dengan data sedikit dulu untuk testing!

Ada yang masih kurang jelas? 😊\"

---

User: \"Bagaimana cara tracking PR?\" atau \"Gimana cara cek PR saya?\"

Bot:
\"🔍 **Cara Tracking PR (Purchase Request)**

**Kabar Baik:** Anda juga BISA tracking PR tanpa login! 🎉

**Langkah-langkah:**

1. **Akses Halaman Tracking**
   • Buka website PPBJ
   • Klik menu 'Track PR' di navbar (bagian atas)
   • TIDAK perlu login!

2. **Masukkan Nomor PR**
   • Ketik Nomor PR Anda di kolom pencarian
   • Contoh format: 0021/26 PR-2024-001

3. **Klik Tombol Track**
   • Sistem akan proses otomatis
   • Progress akan ditampilkan dalam bentuk visual

**Progress PR (0% - 100%):**

• **0%** - PR Diterima
  Status: Menunggu Proses
  
• **20%** - Tender Dibuka
  Status: Menunggu Penawaran Vendor
  
• **40%** - SPH Diterima
  Status: Evaluasi Penawaran
  
• **60%** - Awarding Selesai
  Status: Persiapan Kontrak
  
• **80%** - Kontrak Terbit
  Status: Menunggu Pengiriman Barang
  
• **100%** - Selesai ✓
  Status: BPG (Bukti Penerimaan Barang) Terbit

💡 **Tips:**
• Progress update otomatis real-time
• Bisa dicek kapan saja, 24/7
• Simpan nomor PR untuk tracking lebih mudah
• Jika progress lama tidak berubah, hubungi divisi Umum

Ada yang mau ditanyakan tentang progress PR? 📊\"

Jika user menanyakan hal di luar topik sistem PPBJ, arahkan kembali dengan sopan.";
    }

    /**
     * Save chat history to cache
     */
    protected function saveChatHistory(string $userId, array $messages, string $response): void
    {
        try {
            $key = $this->cachePrefix . 'history_' . $userId;
            $history = Cache::get($key, []);

            $history[] = [
                'timestamp' => now()->toIso8601String(),
                'messages' => $messages,
                'response' => $response,
            ];

            // Keep only last 50 messages
            if (count($history) > 50) {
                $history = array_slice($history, -50);
            }

            Cache::put($key, $history, $this->cacheTTL);
        } catch (\Exception $e) {
            if (config('app.debug')) {
                Log::warning('Failed to save chat history: ' . $e->getMessage());
            }
        }
    }

    /**
     * Get chat history
     */
    public function getChatHistory(string $userId): array
    {
        $key = $this->cachePrefix . 'history_' . $userId;
        return Cache::get($key, []);
    }

    /**
     * Clear chat history
     */
    public function clearChatHistory(string $userId): void
    {
        $key = $this->cachePrefix . 'history_' . $userId;
        Cache::forget($key);
    }
}
