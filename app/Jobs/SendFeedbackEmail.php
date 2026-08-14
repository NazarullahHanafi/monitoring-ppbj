<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendFeedbackEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $timeout = 30;

    /** @var array<int, int> */
    public array $backoff = [10, 30, 60];

    /** @param array<string, string> $emailData */
    public function __construct(
        public readonly array $emailData,
        public readonly string $category,
    ) {
        $this->onConnection('database');
        $this->onQueue('notifications');
    }

    public function handle(): void
    {
        Mail::send('emails.feedback', $this->emailData, function ($message): void {
            $message->from(config('mail.from.address'), config('mail.from.name'))
                ->to('nazarullahhanafi5@gmail.com', 'Admin PPBJ')
                ->cc(['nazarullah12104@gmail.com'])
                ->subject('💬 [FEEDBACK - '.strtoupper($this->category).'] dari '.$this->emailData['userName']);
        });

        Log::info('Feedback email sent from queue', [
            'user_email' => $this->emailData['userEmail'] ?? '-',
            'category' => $this->category,
        ]);
    }

    public function failed(?Throwable $exception): void
    {
        Log::error('Queued feedback email failed permanently', [
            'user_email' => $this->emailData['userEmail'] ?? '-',
            'category' => $this->category,
            'error' => $exception?->getMessage(),
        ]);
    }
}
