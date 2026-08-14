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
            ['email' => 'operasional@sucofindo.com'],
            [
                'name' => 'Riko',
                'password' => Hash::make('SCI2026@='),
                'department' => 'operasional',
                'role' => 'superadmin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'superadmin@sucofindo.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('diadanaku12mA@'),
                'department' => 'umum',
                'role' => 'superadmin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'viewer.umum@local.test'],
            [
                'name' => 'Viewer Umum',
                'password' => Hash::make('Viewer!234'),
                'department' => 'umum',
                'role' => 'viewer',
            ]
        );

        User::updateOrCreate(
            ['email' => 'viewer.operasional@local.test'],
            [
                'name' => 'Viewer Operasional',
                'password' => Hash::make('Viewer!234'),
                'department' => 'operasional',
                'role' => 'viewer',
            ]
        );
    }
}
