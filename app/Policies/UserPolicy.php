<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if user can view any users
     */
    public function viewAny(User $currentUser)
    {
        return $currentUser->role === 'superadmin' 
            && $currentUser->department === 'umum';
    }

    /**
     * Determine if user can view specific user
     */
    public function view(User $currentUser, User $user)
    {
        return $currentUser->role === 'superadmin' 
            && $currentUser->department === 'umum';
    }

    /**
     * Determine if user can create users
     */
    public function create(User $currentUser)
    {
        return $currentUser->role === 'superadmin' 
            && $currentUser->department === 'umum';
    }

    /**
     * Determine if user can update users
     */
    public function update(User $currentUser, User $user)
    {
        return $currentUser->role === 'superadmin' 
            && $currentUser->department === 'umum';
    }

    /**
     * Determine if user can delete users
     */
    public function delete(User $currentUser, User $user)
    {
        // Superadmin umum bisa delete, tapi tidak bisa delete diri sendiri
        return $currentUser->role === 'superadmin' 
            && $currentUser->department === 'umum'
            && $currentUser->id !== $user->id;
    }
}