<?php

namespace App\Policies;

use App\Models\CollaborationEvent;
use App\Models\User;

class CollaborationEventPolicy
{
    public function update(User $user, CollaborationEvent $event): bool
    {
        return $this->isSuperadmin($user) || $event->creator_id === $user->id;
    }

    public function updateStatus(User $user, CollaborationEvent $event): bool
    {
        return $this->update($user, $event) || $event->assignee_id === $user->id;
    }

    public function delete(User $user, CollaborationEvent $event): bool
    {
        return $this->update($user, $event);
    }

    private function isSuperadmin(User $user): bool
    {
        return strtolower(trim((string) $user->role)) === 'superadmin';
    }
}
