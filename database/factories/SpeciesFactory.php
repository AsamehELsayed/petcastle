<?php

namespace Database\Factories;

use App\Models\Species;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SpeciesFactory extends Factory
{
    protected $model = Species::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->word;
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence,
        ];
    }
}
