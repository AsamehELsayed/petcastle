<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseEnhancementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Brands
        \App\Models\Brand::updateOrCreate(['slug' => 'royal-canin'], ['name' => 'Royal Canin', 'logo' => 'https://via.placeholder.com/150?text=Royal+Canin']);
        \App\Models\Brand::updateOrCreate(['slug' => 'pedigree'], ['name' => 'Pedigree', 'logo' => 'https://via.placeholder.com/150?text=Pedigree']);

        // 2. Species
        $dog = \App\Models\Species::updateOrCreate(['name' => 'Dog']);
        $cat = \App\Models\Species::updateOrCreate(['name' => 'Cat']);

        // 3. Breeds
        \App\Models\Breed::updateOrCreate(['name' => 'German Shepherd', 'species_id' => $dog->id]);
        \App\Models\Breed::updateOrCreate(['name' => 'Husky', 'species_id' => $dog->id]);
        \App\Models\Breed::updateOrCreate(['name' => 'Retriever', 'species_id' => $dog->id]);

        \App\Models\Breed::updateOrCreate(['name' => 'Siamese', 'species_id' => $cat->id]);
        \App\Models\Breed::updateOrCreate(['name' => 'Persian', 'species_id' => $cat->id]);
    }
}
