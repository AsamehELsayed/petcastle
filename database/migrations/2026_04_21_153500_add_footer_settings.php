<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Setting;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $settings = [
            [
                'key' => 'footer_branding',
                'value' => [
                    'logo_text' => 'Pet Castle',
                    'description' => 'Premium care for your royal companions. The ultimate destination for top-quality pet food, accessories, and healthcare products.'
                ],
                'group' => 'footer'
            ],
            [
                'key' => 'footer_social',
                'value' => [
                    'facebook' => '#',
                    'instagram' => '#',
                    'twitter' => '#',
                    'youtube' => '#'
                ],
                'group' => 'footer'
            ],
            [
                'key' => 'footer_contact',
                'value' => [
                    'address' => '123 Pet Castle Avenue, Royal Pet District, New Delhi 110001',
                    'phone' => '+91 98765 43210',
                    'email' => 'support@petcastle.com'
                ],
                'group' => 'footer'
            ],
            [
                'key' => 'footer_copyright',
                'value' => '© 2026 Pet Castle. All rights reserved. Built with love for pets.',
                'group' => 'footer'
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Setting::whereIn('key', [
            'footer_branding',
            'footer_social',
            'footer_contact',
            'footer_copyright'
        ])->delete();
    }
};
