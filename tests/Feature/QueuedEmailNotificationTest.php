<?php

namespace Tests\Feature;

use App\Jobs\SendFeedbackEmail;
use App\Jobs\SendPrNotificationEmail;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class QueuedEmailNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_feedback_email_is_queued_without_waiting_for_smtp(): void
    {
        Queue::fake();

        $user = User::factory()->create([
            'name' => 'Nazar',
            'department' => 'Umum',
        ]);

        $response = $this->actingAs($user)->postJson(route('chatbot.feedback'), [
            'message' => 'Mohon tambahkan informasi status pengadaan.',
            'category' => 'saran',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true);

        Queue::assertPushedOn('notifications', SendFeedbackEmail::class, function ($job) use ($user) {
            return $job->connection === 'database'
                && $job->category === 'saran'
                && $job->emailData['userEmail'] === $user->email;
        });
    }

    public function test_pr_notification_email_is_queued_without_waiting_for_smtp(): void
    {
        Queue::fake();

        $result = app(NotificationService::class)->sendEmailNotification(
            [
                'pr_no' => 'PKB/PR-26/CON/0001',
                'description' => 'Pengadaan alat tulis',
            ],
            'umum@example.com',
            ['cc@example.com', 'cc@example.com'],
            'Nazar',
        );

        $this->assertTrue($result['success']);
        $this->assertSame(['cc@example.com'], $result['cc']);

        Queue::assertPushedOn('notifications', SendPrNotificationEmail::class, function ($job) {
            return $job->connection === 'database'
                && $job->toEmail === 'umum@example.com'
                && $job->ccEmails === ['cc@example.com']
                && $job->prData['pr_no'] === 'PKB/PR-26/CON/0001';
        });
    }
}
