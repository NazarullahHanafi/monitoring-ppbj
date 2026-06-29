<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactMessageManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_contact_message_can_be_submitted(): void
    {
        $this->post('/contact', [
            'name' => 'Nazarullah Hanafi',
            'email' => 'nazarullah@example.test',
            'subject' => 'Pertanyaan SIMONPR',
            'message' => 'Mohon informasi terkait tracking PR.',
        ])->assertRedirect();

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Nazarullah Hanafi',
            'email' => 'nazarullah@example.test',
            'subject' => 'Pertanyaan SIMONPR',
        ]);
    }

    public function test_contact_messages_are_only_visible_to_umum_superadmin(): void
    {
        ContactMessage::factory()->create();

        $regularUser = User::factory()->create([
            'role' => 'user',
            'department' => 'umum',
        ]);

        $this->actingAs($regularUser)
            ->get(route('contact-messages.index'))
            ->assertForbidden();

        $superadminOperasional = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'operasional',
        ]);

        $this->actingAs($superadminOperasional)
            ->get(route('contact-messages.index'))
            ->assertForbidden();

        $superadminUmum = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $this->actingAs($superadminUmum)
            ->get(route('contact-messages.index'))
            ->assertOk();
    }

    public function test_umum_superadmin_can_delete_contact_message(): void
    {
        $superadminUmum = User::factory()->create([
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $message = ContactMessage::factory()->create([
            'subject' => 'Pesan yang akan dihapus',
        ]);

        $this->actingAs($superadminUmum)
            ->delete(route('contact-messages.destroy', $message))
            ->assertRedirect();

        $this->assertDatabaseMissing('contact_messages', [
            'id' => $message->id,
        ]);
    }
}
