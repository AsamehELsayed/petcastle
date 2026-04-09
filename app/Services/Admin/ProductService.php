<?php

namespace App\Services\Admin;

use App\Models\Item;
use App\Models\ItemImage;
use App\Models\AnimalDetail;
use App\Models\ProductDetail;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductService extends BaseService
{
    public function getAllProducts($filters = [])
    {
        $query = Item::with(['categories', 'brand', 'species', 'breed']);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->where('categories.id', $filters['category_id']);
            });
        }

        if (!empty($filters['brand_id'])) {
            $query->where('brand_id', $filters['brand_id']);
        }

        $perPage = $filters['per_page'] ?? 25;
        return $query->latest()->paginate($perPage);
    }

    public function createProduct(array $data)
    {
        $categories = \Illuminate\Support\Arr::pull($data, 'categories', []);
        $images = \Illuminate\Support\Arr::pull($data, 'images', []);
        $details = \Illuminate\Support\Arr::pull($data, 'details', []);
        $species = \Illuminate\Support\Arr::pull($data, 'species', []);

        try {
            return DB::transaction(function () use ($data, $categories, $images, $details, $species) {
                $item = Item::create($data);

                if (!empty($categories)) {
                    $item->categories()->sync($categories);
                }

                if (!empty($species)) {
                    $item->species()->sync($species);
                }

                if ($item->type === 'animal') {
                    // Map age_months to age if age is not present
                    if (!isset($details['age']) && isset($details['age_months'])) {
                        $details['age'] = $details['age_months'] . ' months';
                    }
                    $item->animalDetail()->create(array_merge($details, ['item_id' => $item->id]));
                } else {
                    $item->productDetail()->create(array_merge($details, ['item_id' => $item->id]));
                }

                if (!empty($images)) {
                    $this->handleImages($item, $images);
                }

                return $item->fresh(['categories', 'species', 'animalDetail', 'productDetail', 'images']);
            });
        } catch (\Exception $e) {
            \Log::error("Error creating product: " . $e->getMessage());
            throw $e;
        }
    }

    public function updateProduct($id, array $data)
    {
        $categories = \Illuminate\Support\Arr::pull($data, 'categories');
        $species = \Illuminate\Support\Arr::pull($data, 'species');
        $images = \Illuminate\Support\Arr::pull($data, 'images', []);
        $details = \Illuminate\Support\Arr::pull($data, 'details');

        try {
            return DB::transaction(function () use ($id, $data, $categories, $species, $images, $details) {
                $item = Item::findOrFail($id);

                if ($categories !== null) {
                    $item->categories()->sync($categories);
                }

                if ($species !== null) {
                    $item->species()->sync($species);
                }

                $item->update($data);

                if ($details !== null) {
                    if ($item->type === 'animal') {
                        if (!isset($details['age']) && isset($details['age_months'])) {
                            $details['age'] = $details['age_months'] . ' months';
                        }
                        $item->animalDetail()->updateOrCreate(['item_id' => $item->id], $details);
                    } else {
                        $item->productDetail()->updateOrCreate(['item_id' => $item->id], $details);
                    }
                }

                if (!empty($images)) {
                    $this->handleImages($item, $images);
                }

                return $item->fresh(['categories', 'species', 'animalDetail', 'productDetail', 'images']);
            });
        } catch (\Exception $e) {
            \Log::error("Error updating product {$id}: " . $e->getMessage());
            throw $e;
        }
    }

    private function handleImages(Item $item, array $images)
    {
        foreach ($images as $index => $image) {
            $path = $image->store('products', 'public');
            $item->images()->create([
                'path' => $path,
                'is_primary' => $index === 0 && !$item->images()->where('is_primary', true)->exists(),
            ]);

            // Set the first image as main_image if not already set
            if ($index === 0 && empty($item->main_image)) {
                $item->update(['main_image' => $path]);
            }
        }
    }

    public function deleteProduct($id)
    {
        $item = Item::findOrFail($id);
        return $item->delete();
    }

    public function getProductById($id)
    {
        return Item::with([
            'categories', 
            'brand', 
            'species', 
            'breed', 
            'animalDetail.species', 
            'animalDetail.breed', 
            'productDetail', 
            'images'
        ])->findOrFail($id);
    }
}
