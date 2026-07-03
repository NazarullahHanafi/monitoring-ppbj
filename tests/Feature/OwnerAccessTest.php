<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OwnerAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_email_can_access_owner_center(): void
    {
        config(['app.owner_emails' => ['superadmin@sucofindo.com']]);

        $owner = User::factory()->create([
            'name' => 'Nazar',
            'email' => 'superadmin@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $this->actingAs($owner)
            ->get(route('owner.index'))
            ->assertOk()
            ->assertSee('Owner Center SIMONPR')
            ->assertSee('Health Check Sistem')
            ->assertSee('Audit Log Owner')
            ->assertSee('Backup Otomatis')
            ->assertSee('nazarullah12104@gmail.com');
    }

    public function test_other_superadmin_cannot_access_owner_center(): void
    {
        config(['app.owner_emails' => ['superadmin@sucofindo.com']]);

        $otherSuperadmin = User::factory()->create([
            'name' => 'Admin Lain',
            'email' => 'admin.lain@sucofindo.com',
            'role' => 'superadmin',
            'department' => 'umum',
        ]);

        $this->actingAs($otherSuperadmin)
            ->get(route('owner.index'))
            ->assertForbidden();
    }

    public function test_user_owner_helper_uses_configured_email(): void
    {
        config(['app.owner_emails' => ['superadmin@sucofindo.com']]);

        $owner = User::factory()->make(['email' => 'SUPERADMIN@SUCOFINDO.COM']);
        $regular = User::factory()->make(['email' => 'regular@sucofindo.com']);

        $this->assertTrue($owner->isOwner());
        $this->assertFalse($regular->isOwner());
    }
}
