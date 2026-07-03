<?php

namespace App\Console\Commands;

use App\Models\ActivityLog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use RuntimeException;
use Symfony\Component\Process\Process;

class EmailOwnerBackup extends Command
{
    protected $signature = 'owner:backup-email {--to= : Email tujuan backup}';

    protected $description = 'Create a compressed database backup and email it to the application owner.';

    public function handle(): int
    {
        $recipient = (string) ($this->option('to') ?: config('app.owner_backup_email'));

        if (! filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            $this->error('Email tujuan backup tidak valid.');

            return self::FAILURE;
        }

        try {
            $backupPath = $this->createDatabaseBackup();
            $this->sendBackupEmail($recipient, $backupPath);
            $this->cleanupOldBackups();
            $this->writeActivityLog($recipient, $backupPath);

            $this->info('Backup berhasil dikirim ke '.$recipient);

            return self::SUCCESS;
        } catch (\Throwable $e) {
            report($e);
            $this->error('Backup gagal: '.$e->getMessage());

            return self::FAILURE;
        }
    }

    private function createDatabaseBackup(): string
    {
        $connectionName = config('database.default');
        $connection = config("database.connections.{$connectionName}");

        if (! in_array($connection['driver'] ?? '', ['mysql', 'mariadb'], true)) {
            throw new RuntimeException('Backup otomatis saat ini hanya mendukung MySQL/MariaDB.');
        }

        $backupDir = storage_path('app/owner-backups');

        if (! is_dir($backupDir) && ! mkdir($backupDir, 0750, true) && ! is_dir($backupDir)) {
            throw new RuntimeException('Folder backup tidak dapat dibuat.');
        }

        $stamp = now()->format('Ymd_His');
        $database = (string) $connection['database'];
        $safeDatabase = Str::slug($database, '_');
        $sqlPath = $backupDir.DIRECTORY_SEPARATOR."simonpr_{$safeDatabase}_{$stamp}.sql";
        $gzPath = $sqlPath.'.gz';

        $args = [
            (string) config('app.owner_backup_mysqldump_path', 'mysqldump'),
            '--single-transaction',
            '--quick',
            '--routines',
            '--triggers',
            '--default-character-set=utf8mb4',
            '--user='.(string) $connection['username'],
        ];

        if (! empty($connection['unix_socket'])) {
            $args[] = '--socket='.(string) $connection['unix_socket'];
        } else {
            $args[] = '--host='.(string) $connection['host'];
            $args[] = '--port='.(string) $connection['port'];
        }

        $args[] = $database;

        $command = implode(' ', array_map('escapeshellarg', $args)).' > '.escapeshellarg($sqlPath);
        $process = Process::fromShellCommandline($command, null, [
            'MYSQL_PWD' => (string) ($connection['password'] ?? ''),
        ]);
        $process->setTimeout(300);
        $process->run();

        if (! $process->isSuccessful() || ! is_file($sqlPath) || filesize($sqlPath) === 0) {
            @unlink($sqlPath);
            throw new RuntimeException(trim($process->getErrorOutput() ?: $process->getOutput() ?: 'mysqldump gagal.'));
        }

        file_put_contents($gzPath, gzencode((string) file_get_contents($sqlPath), 9));
        @unlink($sqlPath);

        if (! is_file($gzPath) || filesize($gzPath) === 0) {
            throw new RuntimeException('File backup terkompresi gagal dibuat.');
        }

        return $gzPath;
    }

    private function sendBackupEmail(string $recipient, string $backupPath): void
    {
        $subject = 'Backup Database SIMONPR - '.now()->format('d M Y H:i');
        $body = implode(PHP_EOL, [
            'Halo Nazar,',
            '',
            'Terlampir backup database SIMONPR otomatis.',
            'Waktu backup: '.now()->timezone(config('app.timezone'))->format('d M Y H:i:s').' WIB',
            'Environment: '.app()->environment(),
            'File: '.basename($backupPath),
            'Ukuran: '.$this->humanSize((int) filesize($backupPath)),
            '',
            'Catatan keamanan: backup ini hanya berisi dump database terkompresi, bukan file .env.',
        ]);

        Mail::raw($body, function ($message) use ($recipient, $subject, $backupPath) {
            $message->to($recipient)
                ->subject($subject)
                ->attach($backupPath, [
                    'as' => basename($backupPath),
                    'mime' => 'application/gzip',
                ]);
        });
    }

    private function cleanupOldBackups(): void
    {
        $days = max(1, (int) config('app.owner_backup_retention_days', 35));
        $backupDir = storage_path('app/owner-backups');
        $threshold = now()->subDays($days)->timestamp;

        foreach (glob($backupDir.DIRECTORY_SEPARATOR.'*.sql.gz') ?: [] as $file) {
            if (is_file($file) && filemtime($file) < $threshold) {
                @unlink($file);
            }
        }
    }

    private function writeActivityLog(string $recipient, string $backupPath): void
    {
        if (! Schema::hasTable('activity_logs')) {
            return;
        }

        ActivityLog::create([
            'user_id' => null,
            'model_type' => 'System',
            'model_id' => 0,
            'action' => 'owner_backup_email_sent',
            'description' => 'Backup database otomatis dikirim ke email owner.',
            'changes' => [
                'recipient' => $recipient,
                'file' => basename($backupPath),
                'size' => filesize($backupPath),
                'sent_at' => now()->toDateTimeString(),
            ],
        ]);
    }

    private function humanSize(int $bytes): string
    {
        if ($bytes >= 1024 * 1024) {
            return round($bytes / 1024 / 1024, 2).' MB';
        }

        return round($bytes / 1024, 2).' KB';
    }
}
