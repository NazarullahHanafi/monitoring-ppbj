<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PrNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    /** @param array<string, mixed> $prData */
    public function __construct(
        public array $prData,
        public string $senderName = 'PPBJ System',
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.address'), config('mail.from.name')),
            subject: '🔔 [PR PENDING] '.$this->prData['pr_no'].' - Menunggu Approval Anda',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pr-notification',
            with: [
                'prData' => $this->prData,
                'senderName' => $this->senderName,
            ],
        );
    }
}
