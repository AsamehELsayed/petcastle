<?php

namespace Database\Factories;

use App\Models\Breed;
use App\Models\Species;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BreedFactory extends Factory
{
    protected $model = Breed::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->word;
        return [
            'species_id' => Species::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence,
        ];
    }
}
