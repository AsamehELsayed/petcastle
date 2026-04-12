<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\ProductDetail;
use App\Models\AnimalDetail;
use App\Models\Species;
use App\Models\Breed;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        // Create Categories
        $categories = Category::factory(5)->create();

        // Create Brands
        $brands = Brand::factory(3)->create();

        // Create Products
        Item::factory(5)
            ->product()
            ->has(ProductDetail::class)
            ->create()
            ->each(function ($item) use ($categories) {
                $item->categories()->attach($categories->random(2));
            });

        // Create Animals
        Item::factory(5)
            ->animal()
            ->has(AnimalDetail::class)
            ->create()
            ->each(function ($item) use ($categories) {
                $item->categories()->attach($categories->random(1));
            });
    }
}
