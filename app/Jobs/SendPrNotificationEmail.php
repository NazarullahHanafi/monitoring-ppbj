<?php

namespace App\Jobs;

use App\Mail\PrNotificationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendPrNotificationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $timeout = 30;

    /** @var array<int, int> */
    public array $backoff = [10, 30, 60];

    /**
     * @param  array<string, mixed>  $prData
     * @param  array<int, string>  $ccEmails
     */
    public function __construct(
        public readonly array $prData,
        public readonly string $toEmail,
        public readonly array $ccEmails = [],
        public readonly string $senderName = 'PPBJ System',
    ) {
        $this->onConnection('database');
        $this->onQueue('notifications');
    }

    public function handle(): void
    {
        Mail::to($this->toEmail)
            ->cc($this->ccEmails)
            ->send(new PrNotificationMail($this->prData, $this->senderName));

        Log::info('PR notification email sent from queue', [
            'pr_no' => $this->prData['pr_no'] ?? '-',
            'to' => $this->toEmail,
            'cc' => $this->ccEmails,
        ]);
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('Queued PR notification email failed permanently', [
            'pr_no' => $this->prData['pr_no'] ?? '-',
            'to' => $this->toEmail,
            'error' => $exception?->getMessage(),
        ]);
    }
}
