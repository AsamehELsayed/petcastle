<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomeMarketingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = \App\Models\Item::take(25)->get();
        
        foreach ($items as $index => $item) {
            $isTrending = $index % 3 === 0;
            $isDeal = $index % 4 === 0;
            
            $item->update([
                'is_trending' => $isTrending,
                'is_deal' => $isDeal,
                'original_price' => $isDeal ? $item->price * 1.25 : null,
            ]);
        }
    }
}
