<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Super Admin
        User::updateOrCreate(
            ['email' => 'admin@castlepets.com'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'phone' => '1234567890',
                'email_verified_at' => now(),
            ]
        );

        // 2. Staff Admin
        User::updateOrCreate(
            ['email' => 'staff@castlepets.com'],
            [
                'name' => 'Staff Member',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'phone' => '1122334455',
                'email_verified_at' => now(),
            ]
        );

        // 3. Regular Test Customer
        User::updateOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '9876543210',
                'email_verified_at' => now(),
            ]
        );

        // 4. Another Test Customer
        User::updateOrCreate(
            ['email' => 'jane@example.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '5551234567',
                'email_verified_at' => now(),
            ]
        );

        // 5. Create 20 random customers for a populated database
        User::factory(20)->create(['role' => 'customer']);
    }
}
