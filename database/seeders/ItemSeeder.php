<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Species;
use App\Models\Breed;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\AnimalDetail;
use App\Models\ProductDetail;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Species & Breeds
        $dog = Species::create(['name' => 'Dog']);
        $cat = Species::create(['name' => 'Cat']);

        $retriever = Breed::create(['name' => 'Golden Retriever', 'species_id' => $dog->id]);
        $siamese = Breed::create(['name' => 'Siamese', 'species_id' => $cat->id]);

        // 2. Create Categories
        $petsCategory = Category::create(['name' => 'Pets']);
        $foodCategory = Category::create(['name' => 'Food']);
        $dryFoodCategory = Category::create(['name' => 'Dry Food', 'parent_id' => $foodCategory->id]);

        // 3. Create Attributes
        $flavorAttr = Attribute::create(['name' => 'Flavor', 'code' => 'flavor']);
        $bagWeightAttr = Attribute::create(['name' => 'Bag Weight', 'code' => 'bag_weight']);

        // Link Attributes to Categories
        $dryFoodCategory->attributes()->attach([$flavorAttr->id, $bagWeightAttr->id]);

        // 4. Create an Animal
        $puppyItem = Item::create([
            'name' => 'Golden Retriever Puppy',
            'description' => 'A very playful and friendly puppy.',
            'price' => 800.00,
            'type' => 'animal',
            'data' => [
                'notes' => 'friendly animal',
                'extra_features' => ['soft fur', 'trained']
            ]
        ]);

        $puppyItem->animalDetail()->create([
            'species_id' => $dog->id,
            'breed_id' => $retriever->id,
            'age' => '3 months',
            'gender' => 'Male',
            'color' => 'Golden',
            'weight' => 15.5,
            'vaccinated' => true,
            'trained' => false,
        ]);
        
        $puppyItem->categories()->attach($petsCategory);
        $puppyItem->species()->attach($dog);

        // 5. Create a Product
        $dryFoodItem = Item::create([
            'name' => 'Premium Dry Dog Food',
            'description' => 'Nutritious dry food for adult dogs.',
            'price' => 45.99,
            'type' => 'product',
            'data' => [
                'ingredients' => ['Chicken', 'Rice', 'Vitamins']
            ]
        ]);

        $dryFoodItem->productDetail()->create([
            'sku' => 'DOG-FOOD-001',
            'barcode' => '1234567890123',
            'weight' => 20.0,
            'brand' => 'PetNutrition',
            'expiration_date' => now()->addYear(),
        ]);

        $dryFoodItem->categories()->attach([$foodCategory->id, $dryFoodCategory->id]);
        $dryFoodItem->species()->attach($dog);
        
        $dryFoodItem->attributes()->attach($flavorAttr->id, ['value' => 'Chicken & Rice']);
        $dryFoodItem->attributes()->attach($bagWeightAttr->id, ['value' => '20 lbs']);
    }
}
