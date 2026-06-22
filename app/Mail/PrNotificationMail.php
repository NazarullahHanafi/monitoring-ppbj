<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class PrNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $prData;
    public array $ccEmails;
    public string $senderName;

    public function __construct(array $prData, array $ccEmails = [], string $senderName = 'PPBJ System')
    {
        $this->prData = $prData;
        $this->ccEmails = $ccEmails;
        $this->senderName = $senderName;
    }

    public function envelope(): Envelope
    {
        $ccAddresses = [];
        foreach ($this->ccEmails as $email) {
            $ccAddresses[] = new Address(trim($email));
        }

        return new Envelope(
            from: new Address(config('mail.from.address'), config('mail.from.name')),
            to: [new Address('nazarullahhanafi5@gmail.com', 'Bagian Umum - Nazarullah')],
            cc: $ccAddresses,
            subject: '🔔 [PR PENDING] ' . $this->prData['pr_no'] . ' - Menunggu Approval Anda',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pr-notification',
            with: [
                'prData' => $this->prData,
                'senderName' => $this->senderName,
            ]
        );
    }
}
