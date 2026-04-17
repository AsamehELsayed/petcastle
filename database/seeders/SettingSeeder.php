<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'key' => 'general',
                'group' => 'general',
                'value' => [
                    'site_name' => 'Pet Store',
                    'currency' => 'EGP',
                    'logo' => '/logo.png',
                ],
            ],
            [
                'key' => 'shipping',
                'group' => 'shipping',
                'value' => [
                    'default_fee' => 50,
                    'free_shipping_threshold' => 1000,
                ],
            ],
            [
                'key' => 'contact',
                'group' => 'contact',
                'value' => [
                    'email' => 'support@petstore.com',
                    'phone' => '01000000000',
                    'address' => 'Cairo, Egypt',
                ],
            ],
            [
                'key' => 'seo_home',
                'group' => 'seo',
                'value' => [
                    'title' => 'Best Pet Store',
                    'description' => 'Buy pets and pet supplies online',
                ],
            ],
            [
                'key' => 'whatsapp_enabled',
                'group' => 'WhatsApp',
                'value' => '1',
            ],
            [
                'key' => 'whatsapp_number',
                'group' => 'WhatsApp',
                'value' => '+201000000000',
            ],
            [
                'key' => 'whatsapp_message',
                'group' => 'WhatsApp',
                'value' => 'Hello! I have a question about your pets.',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
