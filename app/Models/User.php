<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department',
        'is_active',
        'gender',
        'buyer_name',
        'last_seen_at',
        'last_login_ip',
        'last_seen_ip',
        'locked_at',
        'locked_by',
        'locked_reason',
    ];

    public function isReadOnly(): bool
    {
        return strtolower((string) $this->role) === 'viewer';
    }

    public function isOwner(): bool
    {
        $ownerEmails = config('app.owner_emails', []);
        $email = strtolower(trim((string) $this->email));

        return $email !== '' && in_array($email, $ownerEmails, true);
    }

    public function ownerIdentityKeys(): array
    {
        return collect([
            $this->name,
            $this->buyer_name,
            strtok((string) $this->email, '@'),
        ])
            ->map(fn ($value) => self::normalizeOwnerLabel($value))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    public function matchesOwnerLabel(mixed $label): bool
    {
        $labelKey = self::normalizeOwnerLabel($label);

        if ($labelKey === '') {
            return false;
        }

        foreach ($this->ownerIdentityKeys() as $identityKey) {
            if ($labelKey === $identityKey) {
                return true;
            }

            if (strlen($labelKey) >= 3 && str_contains($identityKey, $labelKey)) {
                return true;
            }

            if (strlen($identityKey) >= 3 && str_contains($labelKey, $identityKey)) {
                return true;
            }
        }

        return false;
    }

    public static function normalizeOwnerLabel(mixed $value): string
    {
        $value = trim(mb_strtolower((string) $value));

        if ($value === '') {
            return '';
        }

        return preg_replace('/[^a-z0-9]+/u', '', $value) ?: '';
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_active' => 'boolean',
            'last_seen_at' => 'datetime',
            'locked_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
