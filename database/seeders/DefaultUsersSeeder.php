<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DefaultUsersSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'umum@local.test'],
            [
                'name' => 'Akun Umum',
                'password' => Hash::make('Password!234'),
                'department' => 'umum',
                'role' => 'user',
            ]
        );

        User::updateOrCreate(
            ['email' => 'operasional@local.test'],
            [
                'name' => 'Akun Operasional',
                'password' => Hash::make('Password!234'),
                'department' => 'operasional',
                'role' => 'user',
            ]
        );

        User::updateOrCreate(
            ['email' => 'superadmin@local.test'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Password!234'),
                'department' => 'umum',
                'role' => 'superadmin',
            ]
        );
    }
}
