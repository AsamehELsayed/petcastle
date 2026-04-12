<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\ProductDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductDetailFactory extends Factory
{
    protected $model = ProductDetail::class;

    public function definition(): array
    {
        return [
            'item_id' => Item::factory()->product(),
            'manufacturer' => $this->faker->company,
            'weight_kg' => $this->faker->randomFloat(2, 0.1, 10),
            'dimensions' => $this->faker->numerify('##x##x## cm'),
            'material' => $this->faker->word,
            'expiry_date' => $this->faker->dateTimeBetween('+1 year', '+3 years'),
        ];
    }
}
