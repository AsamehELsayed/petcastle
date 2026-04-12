<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Page;
use App\Models\Section;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Navbar (Global)
        Section::create([
            'key' => 'navbar',
            'type' => 'navbar',
            'data' => [
                'links' => [
                    ['title' => 'Home', 'url' => '/'],
                    ['title' => 'Shop', 'url' => '/shop'],
                    ['title' => 'About', 'url' => '/about'],
                    ['title' => 'Contact', 'url' => '/contact'],
                ]
            ],
            'order' => 0,
            'is_active' => true,
        ]);

        // 2. Home Page
        $home = Page::create([
            'title' => 'Home Page',
            'slug' => 'home',
            'status' => 'published',
        ]);

        // 3. Hero Section (Home)
        Section::create([
            'page_id' => $home->id,
            'key' => 'hero_home',
            'type' => 'hero',
            'data' => [
                'title' => 'Best Pet Store',
                'subtitle' => 'Everything your pet needs',
                'image' => 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000',
                'button' => [
                    'text' => 'Shop Now',
                    'url' => '/shop'
                ]
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        // 4. Text Content (Home)
        Section::create([
            'page_id' => $home->id,
            'key' => 'about_intro',
            'type' => 'text',
            'data' => [
                'title' => 'Welcome to Our Store',
                'content' => 'We provide the best care and products for your beloved pets. From high-quality food to fun toys, we have it all!'
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // 5. Footer (Global)
        Section::create([
            'key' => 'footer',
            'type' => 'footer',
            'data' => [
                'columns' => [
                    [
                        'title' => 'Company',
                        'links' => [
                            ['title' => 'About', 'url' => '/about'],
                            ['title' => 'Privacy Policy', 'url' => '/privacy'],
                        ]
                    ],
                    [
                        'title' => 'Support',
                        'links' => [
                            ['title' => 'Contact', 'url' => '/contact'],
                            ['title' => 'Shipping Info', 'url' => '/shipping'],
                        ]
                    ]
                ],
                'social' => [
                    ['icon' => 'facebook', 'url' => '#'],
                    ['icon' => 'instagram', 'url' => '#'],
                ]
            ],
            'order' => 100,
            'is_active' => true,
        ]);
    }
}
