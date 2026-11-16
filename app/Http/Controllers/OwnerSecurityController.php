<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\SecurityDeviceSession;
use App\Models\SecurityHoneypotEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Session\ArraySessionHandler;
use Illuminate\Session\CookieSessionHandler;
use Illuminate\Session\NullSessionHandler;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;

class OwnerSecurityController extends Controller
{
    public function index(Request $request): Response
    {
        $validated = $request->validate(['page' => ['nullable', 'integer', 'min:1', 'max:1000000']]);
        $hasSessions = Schema::hasTable('security_device_sessions');
        $cutoff = now()->subMinutes((int) config('session.lifetime', 120));
        $currentHash = $this->sessionToken((string) $request->session()->getId());
        $totals = $hasSessions ? DB::table('security_device_sessions')
            ->where('last_activity_at', '>=', $cutoff)
            ->selectRaw("COUNT(*) AS active, COUNT(DISTINCT user_id) AS users, COUNT(DISTINCT NULLIF(ip_address, '')) AS ips")
            ->selectRaw('COALESCE(SUM(CASE WHEN session_hash = ? THEN 1 ELSE 0 END), 0) AS current_count', [$currentHash])
            ->first() : null;
        $sessionStats = [
            'active' => (int) ($totals->active ?? 0),
            'users' => (int) ($totals->users ?? 0),
            'ips' => (int) ($totals->ips ?? 0),
            'others' => (int) ($totals->active ?? 0) - (int) ($totals->current_count ?? 0),
        ];
        $sessions = $this->activeSessions($request, $cutoff, $currentHash, $sessionStats['active'], (int) ($validated['page'] ?? 1), $hasSessions);
        $hasHoneypot = Schema::hasTable('security_honeypot_events');
        $honeypotEvents = $hasHoneypot
            ? SecurityHoneypotEvent::query()->latest('last_seen_at')->orderByDesc('id')->limit(30)
                ->get(['id', 'ip_address', 'hit_count', 'unique_paths_count', 'sample_paths', 'first_seen_at', 'last_seen_at'])
            : collect();
        $probeTotals = $hasHoneypot ? SecurityHoneypotEvent::query()
            ->where('event_date', '>=', now()->subDays(30)->toDateString())
            ->selectRaw('COALESCE(SUM(CASE WHEN event_date = ? THEN hit_count ELSE 0 END), 0) AS today', [today()->toDateString()])
            ->selectRaw('COUNT(DISTINCT ip_address) AS sources_30d')->first() : null;

        $honeypotStats = [
            'today' => (int) ($probeTotals->today ?? 0),
            'sources_30d' => (int) ($probeTotals->sources_30d ?? 0),
            'last_seen' => $honeypotEvents->first()?->last_seen_at,
            'sensor_updated_at' => $this->sensorUpdatedAt(),
        ];

        $security = $this->securityScore($request, $hasHoneypot, $hasSessions);

        return response()->view('owner.security', [
            'security' => $security,
            'sessions' => $sessions,
            'sessionStats' => $sessionStats,
            'honeypotEvents' => $honeypotEvents,
            'honeypotStats' => $honeypotStats,
        ])->header('Cache-Control', 'private, no-store');
    }

    public function destroySession(Request $request, string $sessionToken): RedirectResponse
    {
        abort_unless(Schema::hasTable('security_device_sessions'), 404);

        $session = SecurityDeviceSession::query()
            ->where('session_hash', $sessionToken)
            ->where('last_activity_at', '>=', now()->subMinutes((int) config('session.lifetime', 120)))
            ->first();

        if (! $session) {
            return back()->with('error', 'Sesi sudah berakhir atau tidak ditemukan.');
        }

        if (hash_equals($this->sessionToken((string) $request->session()->getId()), $sessionToken)) {
            return back()->with('error', 'Sesi yang sedang digunakan tidak dapat diakhiri dari halaman ini.');
        }

        try {
            $this->destroyUnderlyingSession($request, $session);
            DB::transaction(function () use ($request, $session) {
                if (SecurityDeviceSession::query()->whereKey($session->id)->where('session_hash', $session->session_hash)->delete()) {
                    $this->recordSessionAction($request, 'owner_session_revoked', $session);
                }
            });
        } catch (\Throwable $exception) {
            report($exception);

            return back()->with('error', 'Pengakhiran sesi belum dapat dikonfirmasi. Muat ulang daftar sebelum mencoba kembali.')
                ->header('Cache-Control', 'private, no-store');
        }

        return back()->with('success', 'Sesi perangkat telah diakhiri atau sudah berakhir.')
            ->header('Cache-Control', 'private, no-store');
    }

    public function destroyOtherSessions(Request $request): RedirectResponse
    {
        abort_unless(Schema::hasTable('security_device_sessions'), 404);

        $currentHash = $this->sessionToken((string) $request->session()->getId());
        $sessions = SecurityDeviceSession::query()
            ->where('session_hash', '!=', $currentHash)
            ->where('last_activity_at', '>=', now()->subMinutes((int) config('session.lifetime', 120)))
            ->orderBy('id')->limit(101)
            ->get(['id', 'session_hash', 'session_id_encrypted', 'user_id', 'ip_address']);

        if ($sessions->isEmpty()) {
            return back()->with('success', 'Tidak ada sesi lain yang perlu diakhiri.');
        }

        $revoked = 0;
        $failed = 0;
        $hasMore = $sessions->count() > 100;
        $confirmedIds = [];

        foreach ($sessions->take(100) as $session) {
            try {
                $this->destroyUnderlyingSession($request, $session);
                $confirmedIds[] = $session->id;
            } catch (\Throwable $exception) {
                // Registry yang rusak dipertahankan agar dapat diaudit ulang.
                $failed++;
                report($exception);
            }
        }

        try {
            // Keep network calls outside the short registry/audit transaction.
            // One bounded DELETE avoids a write query for every device.
            $revoked = DB::transaction(function () use ($request, $confirmedIds, $currentHash, $failed, $hasMore) {
                $count = $confirmedIds ? SecurityDeviceSession::query()->whereIn('id', $confirmedIds)
                    ->where('session_hash', '!=', $currentHash)->delete() : 0;
                ActivityLog::create([
                    'user_id' => $request->user()->id,
                    'model_type' => 'SecuritySession',
                    'model_id' => 0,
                    'action' => 'owner_other_sessions_revoked',
                    'description' => 'Owner memproses pengakhiran sesi lain: '.$count.' selesai, '.$failed.' belum terkonfirmasi.',
                    'changes' => ['revoked_count' => $count, 'failed_count' => $failed, 'has_more' => $hasMore, 'ip' => $request->ip()],
                ]);

                return $count;
            });
        } catch (\Throwable $exception) {
            report($exception);

            return back()->with('error', 'Hasil pengakhiran sesi belum tercatat lengkap. Muat ulang daftar untuk memeriksa hasil sebelum mencoba kembali.')
                ->header('Cache-Control', 'private, no-store');
        }

        $message = $revoked.' sesi perangkat lain telah diakhiri atau sudah berakhir.';
        if ($failed > 0) {
            $message .= ' '.$failed.' sesi belum terkonfirmasi dan tetap tersedia untuk diperiksa.';
        }
        if ($hasMore) {
            $message .= ' Masih ada sesi lain. Muat ulang daftar lalu jalankan proses berikutnya (maksimal 100 sesi per proses).';
        }

        return back()->with($failed || $hasMore ? 'warning' : 'success', $message)
            ->header('Cache-Control', 'private, no-store');
    }

    private function activeSessions(Request $request, Carbon $cutoff, string $currentHash, int $total, int $page, bool $hasSessions): LengthAwarePaginator
    {
        $rows = $hasSessions ? DB::table('security_device_sessions')
            ->leftJoin('users', 'users.id', '=', 'security_device_sessions.user_id')
            ->where('security_device_sessions.last_activity_at', '>=', $cutoff)
            ->orderByRaw('CASE WHEN security_device_sessions.session_hash = ? THEN 0 ELSE 1 END', [$currentHash])
            ->orderByDesc('security_device_sessions.last_activity_at')
            ->orderByDesc('security_device_sessions.id')
            ->forPage($page, 50)
            ->get([
                'security_device_sessions.session_hash',
                'security_device_sessions.user_id',
                'security_device_sessions.ip_address',
                'security_device_sessions.user_agent',
                'security_device_sessions.last_activity_at',
                'users.name',
                'users.email',
                'users.role',
                'users.department',
            ])
            ->map(function ($session) use ($currentHash) {
                $device = $this->describeDevice((string) $session->user_agent);
                $session->is_current = hash_equals($currentHash, (string) $session->session_hash);
                $session->session_token = $session->session_hash;
                $session->browser = $device['browser'];
                $session->platform = $device['platform'];
                $session->device = $device['device'];
                $session->last_active_at = Carbon::parse($session->last_activity_at);
                unset($session->session_hash);

                return $session;
            }) : collect();

        return new LengthAwarePaginator($rows, $total, 50, $page, ['path' => $request->url()]);
    }

    private function sessionToken(string $sessionId): string
    {
        return hash_hmac('sha256', $sessionId, (string) config('app.key'));
    }

    private function destroyUnderlyingSession(Request $request, SecurityDeviceSession $session): void
    {
        $sessionId = Crypt::decryptString($session->session_id_encrypted);
        if ($sessionId === '' || ! hash_equals($session->session_hash, $this->sessionToken($sessionId))) {
            throw new RuntimeException('Device registry integrity check failed.');
        }

        $handler = $request->session()->getHandler();
        if ($handler instanceof ArraySessionHandler || $handler instanceof CookieSessionHandler || $handler instanceof NullSessionHandler) {
            throw new RuntimeException('The session driver does not support remote revocation.');
        }

        // Redis can return false for an already-expired key. Verify the outcome
        // instead of treating every false as failure or trusting every true.
        $handler->destroy($sessionId);
        if ($handler->read($sessionId) !== '') {
            throw new RuntimeException('Session storage did not confirm removal.');
        }
    }

    private function describeDevice(string $agent): array
    {
        $browser = match (true) {
            str_contains($agent, 'Edg/') => 'Microsoft Edge',
            str_contains($agent, 'OPR/') => 'Opera',
            str_contains($agent, 'Chrome/') => 'Google Chrome',
            str_contains($agent, 'Firefox/') => 'Mozilla Firefox',
            str_contains($agent, 'Safari/') => 'Safari',
            default => 'Browser tidak dikenal',
        };

        $platform = match (true) {
            str_contains($agent, 'Windows') => 'Windows',
            str_contains($agent, 'Android') => 'Android',
            str_contains($agent, 'iPhone'), str_contains($agent, 'iPad') => 'iOS/iPadOS',
            str_contains($agent, 'Mac OS X') => 'macOS',
            str_contains($agent, 'Linux') => 'Linux',
            default => 'Platform tidak dikenal',
        };

        return [
            'browser' => $browser,
            'platform' => $platform,
            'device' => preg_match('/Mobile|Android|iPhone|iPad/i', $agent) ? 'Mobile' : 'Desktop',
        ];
    }

    private function securityScore(Request $request, bool $hasHoneypot, bool $hasSessions): array
    {
        $checks = [
            ['label' => 'Akses owner berlapis', 'passed' => $request->user()->canAccessOwnerCenter(), 'weight' => 15, 'detail' => 'Email owner, superadmin, dan departemen umum wajib cocok.'],
            ['label' => 'Debug production mati', 'passed' => ! config('app.debug'), 'weight' => 15, 'detail' => 'Mencegah detail error dan konfigurasi bocor.'],
            ['label' => 'HTTPS aplikasi', 'passed' => $this->httpsEnforced(), 'weight' => 10, 'detail' => 'HTTP dipaksa pindah ke koneksi HTTPS terenkripsi.'],
            ['label' => 'Cookie session Secure', 'passed' => config('session.secure') === true, 'weight' => 10, 'detail' => 'Cookie hanya dikirim melalui HTTPS.'],
            ['label' => 'Cookie session HttpOnly', 'passed' => config('session.http_only') === true, 'weight' => 10, 'detail' => 'JavaScript tidak dapat membaca cookie autentikasi.'],
            ['label' => 'SameSite session', 'passed' => in_array(config('session.same_site'), ['lax', 'strict'], true), 'weight' => 5, 'detail' => 'Mengurangi risiko CSRF lintas situs.'],
            ['label' => 'Silent honeypot aktif', 'passed' => config('security.honeypot.enabled') && $hasHoneypot, 'weight' => 15, 'detail' => 'Scanner dicatat melalui access log tanpa memperlambat pengguna.'],
            ['label' => 'Direct PHP guard', 'passed' => $this->directPhpGuardEnabled(), 'weight' => 10, 'detail' => 'File PHP asing dihentikan sebelum masuk Laravel.'],
            ['label' => 'Encrypted session center', 'passed' => $hasSessions && ! in_array(config('session.driver'), ['array', 'cookie', 'null', null], true), 'weight' => 10, 'detail' => 'Penyimpanan sesi server diperlukan untuk kendali perangkat jarak jauh. ID sesi tetap terenkripsi.'],
        ];

        $score = collect($checks)->where('passed', true)->sum('weight');

        return [
            'score' => $score,
            'label' => $score >= 90 ? 'Sangat Baik' : ($score >= 75 ? 'Baik' : ($score >= 60 ? 'Perlu Penguatan' : 'Kritis')),
            'tone' => $score >= 90 ? 'emerald' : ($score >= 75 ? 'blue' : ($score >= 60 ? 'amber' : 'red')),
            'checks' => $checks,
        ];
    }

    private function directPhpGuardEnabled(): bool
    {
        $path = public_path('.htaccess');

        return is_readable($path)
            && str_contains((string) file_get_contents($path), '(?!index\.php$).*\.php');
    }

    private function httpsEnforced(): bool
    {
        $path = public_path('.htaccess');

        return str_starts_with(strtolower((string) config('app.url')), 'https://')
            && is_readable($path)
            && str_contains((string) file_get_contents($path), 'RewriteCond %{HTTPS} !=on');
    }

    private function sensorUpdatedAt(): ?Carbon
    {
        $path = storage_path('app/security/honeypot-cursors.json');

        return is_file($path) ? Carbon::createFromTimestamp((int) filemtime($path)) : null;
    }

    private function recordSessionAction(Request $request, string $action, object $session): void
    {
        ActivityLog::create([
            'user_id' => $request->user()->id,
            'model_type' => 'SecuritySession',
            'model_id' => $session->user_id,
            'action' => $action,
            'description' => 'Owner mengakhiri sesi user ID '.$session->user_id.' dari IP '.($session->ip_address ?: '-').'.',
            'changes' => [
                'target_user_id' => $session->user_id,
                'target_ip' => $session->ip_address,
                'owner_ip' => $request->ip(),
            ],
        ]);
    }
}
