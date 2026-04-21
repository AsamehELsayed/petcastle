<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement(['product', 'animal']);

        return [
            'brand_id' => Brand::count() > 0 ? Brand::inRandomOrder()->first()->id : Brand::factory(),
            'name' => ucfirst($this->faker->words(3, true)),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'low_stock_threshold' => 10,
            'type' => $type,
            'status' => $this->faker->randomElement(['active', 'inactive', 'sold']),
        ];
    }

    public function animal(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'animal',
            'stock' => 1,
        ]);
    }

    public function product(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'product',
        ]);
    }
}
