<?php

namespace App\Mail;

use App\Models\PrReceiptApproval;
use App\Models\Torpr;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PrApprovalRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public Torpr $torpr;
    public PrReceiptApproval $approval;
    public string $requestedByName;
    public string $approvalUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(Torpr $torpr, PrReceiptApproval $approval, string $requestedByName)
    {
        $this->torpr = $torpr;
        $this->approval = $approval;
        $this->requestedByName = $requestedByName;
        
        // URL untuk approve langsung (optional)
        $this->approvalUrl = route('approval.pr.index');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🔔 Mohon Approve PR: ' . $this->torpr->nomor_pr,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.pr-approval-request',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}