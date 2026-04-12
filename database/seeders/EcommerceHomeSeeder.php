<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Section;
use Illuminate\Database\Seeder;

class EcommerceHomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $page = Page::firstOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Castle Pets E-Commerce',
                'status' => 'published',
            ]
        );

        $sections = [
            [
                'key' => 'wow_hero',
                'type' => 'ecommerce_hero',
                'data' => [
                    'banner_badge' => 'BIGGEST SALE OF THE YEAR',
                    'title' => 'WOW <br /> SALE',
                    'promo_badge' => 'UP TO 70% OFF',
                    'subtitle' => 'MAR 28 - APR 5 • ALL TOP BRANDS',
                    'btn1_text' => 'Shop Now',
                    'btn1_link' => '/products',
                    'btn2_text' => 'Browse Deals',
                    'btn2_link' => '/products',
                ],
                'order' => 0,
            ],
            [
                'key' => 'coupon_strip',
                'type' => 'coupon_strip',
                'data' => [
                    'promo_highlight' => '15% OFF',
                    'code' => 'NEW15',
                    'title' => 'GET 15% OFF ON YOUR FIRST ORDER',
                ],
                'order' => 1,
            ],
            [
                'key' => 'shop_by_pet',
                'type' => 'shop_by_pet',
                'data' => [
                    'title' => 'Shop by Pet',
                    'subtitle' => 'Choose your furry, feathered or finned friend',
                ],
                'order' => 2,
            ],
            [
                'key' => 'shop_by_category',
                'type' => 'shop_by_category',
                'data' => [
                    'title' => 'Shop by Category',
                    'subtitle' => 'Everything your pet needs — food, toys, grooming & more',
                ],
                'order' => 3,
            ],
            [
                'key' => 'promo_cards',
                'type' => 'promo_cards',
                'data' => [
                    'card1_label' => 'BEST SELLER',
                    'card1_title' => 'Drools Dog Food',
                    'card1_promo' => 'Up to 40% OFF',
                    'card1_image' => 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
                    'card1_link' => '/products',
                    'card2_label' => 'PREMIUM CARE',
                    'card2_title' => 'Royal Canin',
                    'card2_promo' => 'Flat 25% OFF',
                    'card2_image' => 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
                    'card2_link' => '/products',
                ],
                'order' => 4,
            ],
            [
                'key' => 'deals_slider',
                'type' => 'deals_slider',
                'data' => [
                    'title' => 'Deals of the Day',
                    'subtitle' => "Grab them before they're gone!",
                ],
                'order' => 5,
            ],
            [
                'key' => 'trending_grid',
                'type' => 'trending_grid',
                'data' => [
                    'title' => 'Trending Now',
                    'subtitle' => 'Our most loved products this week',
                ],
                'order' => 6,
            ],
            [
                'key' => 'trust_banner',
                'type' => 'trust_banner',
                'data' => [
                    'item1_title' => 'Free Delivery',
                    'item1_desc' => 'Above 20 JD',
                    'item2_title' => 'Vet Approved',
                    'item2_desc' => '100% Genuine',
                    'item3_title' => 'Easy Returns',
                    'item3_desc' => '7 Days Return',
                    'item4_title' => '24/7 Support',
                    'item4_desc' => 'Expert Help',
                ],
                'order' => 7,
            ],
        ];

        foreach ($sections as $sectionData) {
            Section::updateOrCreate(
                ['page_id' => $page->id, 'key' => $sectionData['key']],
                array_merge($sectionData, [
                    'is_active' => true,
                    'is_deletable' => false,
                ])
            );
        }
    }
}
