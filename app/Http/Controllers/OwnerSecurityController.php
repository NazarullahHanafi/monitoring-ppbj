<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\SecurityDeviceSession;
use App\Models\SecurityHoneypotEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\View\View;

class OwnerSecurityController extends Controller
{
    public function index(Request $request): View
    {
        $sessions = $this->activeSessions($request);
        $honeypotEvents = Schema::hasTable('security_honeypot_events')
            ? SecurityHoneypotEvent::query()->latest('last_seen_at')->limit(30)->get()
            : collect();

        $honeypotStats = [
            'today' => Schema::hasTable('security_honeypot_events')
                ? (int) SecurityHoneypotEvent::query()->whereDate('event_date', today())->sum('hit_count')
                : 0,
            'sources_30d' => Schema::hasTable('security_honeypot_events')
                ? SecurityHoneypotEvent::query()->where('event_date', '>=', now()->subDays(30)->toDateString())->distinct()->count('ip_address')
                : 0,
            'last_seen' => $honeypotEvents->first()?->last_seen_at,
            'sensor_updated_at' => $this->sensorUpdatedAt(),
        ];

        $security = $this->securityScore($request);

        return view('owner.security', [
            'security' => $security,
            'sessions' => $sessions,
            'sessionStats' => [
                'active' => $sessions->count(),
                'users' => $sessions->pluck('user_id')->filter()->unique()->count(),
                'ips' => $sessions->pluck('ip_address')->filter()->unique()->count(),
            ],
            'honeypotEvents' => $honeypotEvents,
            'honeypotStats' => $honeypotStats,
        ]);
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

        $this->destroyUnderlyingSession($session);
        $session->delete();
        $this->recordSessionAction($request, 'owner_session_revoked', $session);

        return back()->with('success', 'Sesi perangkat berhasil diakhiri.');
    }

    public function destroyOtherSessions(Request $request): RedirectResponse
    {
        abort_unless(Schema::hasTable('security_device_sessions'), 404);

        $currentHash = $this->sessionToken((string) $request->session()->getId());
        $sessions = SecurityDeviceSession::query()
            ->where('session_hash', '!=', $currentHash)
            ->where('last_activity_at', '>=', now()->subMinutes((int) config('session.lifetime', 120)))
            ->get();

        if ($sessions->isEmpty()) {
            return back()->with('success', 'Tidak ada sesi lain yang perlu diakhiri.');
        }

        $revoked = 0;

        foreach ($sessions as $session) {
            try {
                $this->destroyUnderlyingSession($session);
                $session->delete();
                $revoked++;
            } catch (\Throwable) {
                // Registry yang rusak dipertahankan agar dapat diaudit ulang.
            }
        }

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'model_type' => 'SecuritySession',
            'model_id' => null,
            'action' => 'owner_other_sessions_revoked',
            'description' => 'Owner mengakhiri '.$revoked.' sesi perangkat lain.',
            'changes' => ['revoked_count' => $revoked, 'ip' => $request->ip()],
        ]);

        return back()->with('success', $revoked.' sesi perangkat lain berhasil diakhiri.');
    }

    private function activeSessions(Request $request)
    {
        if (! Schema::hasTable('security_device_sessions')) {
            return collect();
        }

        $cutoff = now()->subMinutes((int) config('session.lifetime', 120));
        $currentHash = $this->sessionToken((string) $request->session()->getId());

        return DB::table('security_device_sessions')
            ->leftJoin('users', 'users.id', '=', 'security_device_sessions.user_id')
            ->where('security_device_sessions.last_activity_at', '>=', $cutoff)
            ->orderByDesc('security_device_sessions.last_activity_at')
            ->limit(100)
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
            });
    }

    private function sessionToken(string $sessionId): string
    {
        return hash_hmac('sha256', $sessionId, (string) config('app.key'));
    }

    private function destroyUnderlyingSession(SecurityDeviceSession $session): void
    {
        $sessionId = Crypt::decryptString($session->session_id_encrypted);
        app('session')->driver()->getHandler()->destroy($sessionId);
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

    private function securityScore(Request $request): array
    {
        $checks = [
            ['label' => 'Akses owner berlapis', 'passed' => $request->user()->canAccessOwnerCenter(), 'weight' => 15, 'detail' => 'Email owner, superadmin, dan departemen umum wajib cocok.'],
            ['label' => 'Debug production mati', 'passed' => ! config('app.debug'), 'weight' => 15, 'detail' => 'Mencegah detail error dan konfigurasi bocor.'],
            ['label' => 'HTTPS aplikasi', 'passed' => $this->httpsEnforced(), 'weight' => 10, 'detail' => 'HTTP dipaksa pindah ke koneksi HTTPS terenkripsi.'],
            ['label' => 'Cookie session Secure', 'passed' => config('session.secure') === true, 'weight' => 10, 'detail' => 'Cookie hanya dikirim melalui HTTPS.'],
            ['label' => 'Cookie session HttpOnly', 'passed' => config('session.http_only') === true, 'weight' => 10, 'detail' => 'JavaScript tidak dapat membaca cookie autentikasi.'],
            ['label' => 'SameSite session', 'passed' => in_array(config('session.same_site'), ['lax', 'strict'], true), 'weight' => 5, 'detail' => 'Mengurangi risiko CSRF lintas situs.'],
            ['label' => 'Silent honeypot aktif', 'passed' => config('security.honeypot.enabled') && Schema::hasTable('security_honeypot_events'), 'weight' => 15, 'detail' => 'Scanner dicatat melalui access log tanpa memperlambat pengguna.'],
            ['label' => 'Direct PHP guard', 'passed' => $this->directPhpGuardEnabled(), 'weight' => 10, 'detail' => 'File PHP asing dihentikan sebelum masuk Laravel.'],
            ['label' => 'Encrypted session center', 'passed' => Schema::hasTable('security_device_sessions'), 'weight' => 10, 'detail' => 'Mendukung Redis/database; ID session disimpan terenkripsi dan tidak tampil di browser.'],
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
