<?php

namespace App\Console\Commands;

use App\Models\SecurityHoneypotEvent;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ScanHoneypotAccessLog extends Command
{
    protected $signature = 'security:scan-honeypot {--log=* : Apache access log path}';

    protected $description = 'Read new Apache access-log lines and aggregate silent honeypot probes';

    public function handle(): int
    {
        if (! config('security.honeypot.enabled', true) || ! Schema::hasTable('security_honeypot_events')) {
            return self::SUCCESS;
        }

        $logs = array_values(array_unique(array_filter(
            $this->option('log') ?: config('security.honeypot.access_logs', []),
            static fn ($path) => is_string($path) && $path !== ''
        )));

        $state = $this->loadCursorState();
        $groups = [];
        $readLines = 0;

        foreach ($logs as $log) {
            $readLines += $this->scanFile($log, $state, $groups);
        }

        $this->saveCursorState($state);
        $stored = $this->storeGroups($groups);

        SecurityHoneypotEvent::query()
            ->where('event_date', '<', now()->subDays(max(7, (int) config('security.honeypot.retention_days', 90)))->toDateString())
            ->delete();

        $this->components->info("Honeypot selesai: {$readLines} baris baru, {$stored} sumber mencurigakan diperbarui.");

        return self::SUCCESS;
    }

    private function scanFile(string $path, array &$state, array &$groups): int
    {
        clearstatcache(true, $path);

        if (! is_file($path) || ! is_readable($path)) {
            return 0;
        }

        $size = (int) filesize($path);
        $identity = (string) (@fileinode($path) ?: $path);
        $key = sha1($path);
        $saved = $state[$key] ?? [];
        $sameFile = ($saved['identity'] ?? null) === $identity;
        $savedOffset = (int) ($saved['offset'] ?? 0);
        $offset = $sameFile && $savedOffset <= $size ? $savedOffset : 0;

        if (! $sameFile && $size > (int) config('security.honeypot.initial_read_bytes', 1048576)) {
            $offset = $size - (int) config('security.honeypot.initial_read_bytes', 1048576);
        }

        $handle = fopen($path, 'rb');

        if (! $handle) {
            return 0;
        }

        fseek($handle, $offset);

        // Saat mulai dari tengah file, buang potongan baris pertama.
        if ($offset > 0 && ! $sameFile) {
            fgets($handle);
        }

        $count = 0;

        while (($line = fgets($handle)) !== false) {
            $count++;
            $this->collectSuspiciousLine($line, $groups);
        }

        $state[$key] = [
            'path' => $path,
            'identity' => $identity,
            'offset' => ftell($handle),
            'scanned_at' => now()->toIso8601String(),
        ];

        fclose($handle);

        return $count;
    }

    private function collectSuspiciousLine(string $line, array &$groups): void
    {
        if (preg_match('/^(?<ip>\S+) \S+ \S+ \[(?<time>[^\]]+)\] "(?<method>[A-Z]+) (?<path>\S+) [^"]+" (?<status>\d{3}) \S+(?: "[^"]*" "(?<agent>[^"]*)")?/', $line, $match) !== 1) {
            return;
        }

        $path = parse_url($match['path'], PHP_URL_PATH) ?: $match['path'];

        if (! $this->isHoneypotPath($path)) {
            return;
        }

        try {
            $seenAt = Carbon::createFromFormat('d/M/Y:H:i:s O', $match['time']);
        } catch (\Throwable) {
            $seenAt = now();
        }

        $key = $seenAt->toDateString().'|'.$match['ip'];
        $group = $groups[$key] ?? [
            'event_date' => $seenAt->toDateString(),
            'ip_address' => $match['ip'],
            'hit_count' => 0,
            'paths' => [],
            'statuses' => [],
            'methods' => [],
            'user_agent' => null,
            'first_seen_at' => $seenAt,
            'last_seen_at' => $seenAt,
        ];

        $group['hit_count']++;
        $group['paths'][$path] = true;
        $group['statuses'][$match['status']] = ($group['statuses'][$match['status']] ?? 0) + 1;
        $group['methods'][$match['method']] = ($group['methods'][$match['method']] ?? 0) + 1;
        $group['user_agent'] = filled($match['agent'] ?? null) ? $match['agent'] : $group['user_agent'];
        $group['first_seen_at'] = $seenAt->lt($group['first_seen_at']) ? $seenAt : $group['first_seen_at'];
        $group['last_seen_at'] = $seenAt->gt($group['last_seen_at']) ? $seenAt : $group['last_seen_at'];
        $groups[$key] = $group;
    }

    private function isHoneypotPath(string $path): bool
    {
        $path = strtolower('/'.ltrim($path, '/'));

        if ($path === '/index.php') {
            return false;
        }

        return preg_match(
            '#/(?:wp-admin|wp-content|wp-includes)(?:/|$)|/(?:xmlrpc|wp-login|wp-config)\.php(?:/|$)|/(?:\.env|\.git|\.svn|\.hg)(?:/|$)|\.php(?:/|$)#',
            $path
        ) === 1;
    }

    private function storeGroups(array $groups): int
    {
        foreach ($groups as $group) {
            DB::transaction(function () use ($group) {
                $event = SecurityHoneypotEvent::query()
                    ->lockForUpdate()
                    ->firstOrNew([
                        'event_date' => $group['event_date'],
                        'ip_address' => $group['ip_address'],
                    ]);

                $paths = array_values(array_unique(array_merge(
                    $event->sample_paths ?? [],
                    array_keys($group['paths'])
                )));

                $event->hit_count = (int) $event->hit_count + $group['hit_count'];
                $event->unique_paths_count = max((int) $event->unique_paths_count, count($paths));
                $event->sample_paths = array_slice($paths, -50);
                $event->statuses = $this->mergeCounters($event->statuses ?? [], $group['statuses']);
                $event->methods = $this->mergeCounters($event->methods ?? [], $group['methods']);
                $event->user_agent = $group['user_agent'] ?: $event->user_agent;
                $event->first_seen_at = ! $event->first_seen_at || $group['first_seen_at']->lt($event->first_seen_at)
                    ? $group['first_seen_at']
                    : $event->first_seen_at;
                $event->last_seen_at = ! $event->last_seen_at || $group['last_seen_at']->gt($event->last_seen_at)
                    ? $group['last_seen_at']
                    : $event->last_seen_at;
                $event->save();
            });
        }

        return count($groups);
    }

    private function mergeCounters(array $current, array $incoming): array
    {
        foreach ($incoming as $key => $value) {
            $current[(string) $key] = (int) ($current[(string) $key] ?? 0) + (int) $value;
        }

        ksort($current);

        return $current;
    }

    private function loadCursorState(): array
    {
        $path = $this->cursorPath();

        if (! is_readable($path)) {
            return [];
        }

        return json_decode((string) file_get_contents($path), true) ?: [];
    }

    private function saveCursorState(array $state): void
    {
        $path = $this->cursorPath();
        $directory = dirname($path);

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        file_put_contents($path, json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
    }

    private function cursorPath(): string
    {
        return storage_path('app/security/honeypot-cursors.json');
    }
}
