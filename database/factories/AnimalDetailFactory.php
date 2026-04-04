<?php

namespace Database\Factories;

use App\Models\AnimalDetail;
use App\Models\Breed;
use App\Models\Item;
use App\Models\Species;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalDetailFactory extends Factory
{
    protected $model = AnimalDetail::class;

    public function definition(): array
    {
        return [
            'item_id' => Item::factory()->animal(),
            'species_id' => Species::factory(),
            'breed_id' => Breed::factory(),
            'gender' => $this->faker->randomElement(['male', 'female', 'unknown']),
            'age_months' => $this->faker->numberBetween(1, 60),
            'weight_kg' => $this->faker->randomFloat(2, 0.5, 30),
            'health_status' => 'healthy',
            'is_vaccinated' => $this->faker->boolean,
            'is_neutered' => $this->faker->boolean,
        ];
    }
}
