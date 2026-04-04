<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'data' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',

        'is_deal' => 'boolean',
        'is_trending' => 'boolean',
    ];

    public function animalDetail() {
        return $this->hasOne(AnimalDetail::class);
    }

    public function productDetail() {
        return $this->hasOne(ProductDetail::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class, 'item_categories');
    }

    public function species() {
        return $this->belongsToMany(Species::class, 'item_species');
    }

    public function attributes() {
        return $this->belongsToMany(Attribute::class, 'item_attribute_values')
            ->withPivot('value', 'id')
            ->withTimestamps();
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }



    public function brand() {
        return $this->belongsTo(Brand::class);
    }

    public function breed() {
        return $this->hasOneThrough(Breed::class, AnimalDetail::class, 'item_id', 'id', 'id', 'breed_id');
    }

    public function inventoryLogs()
    {
        return $this->hasMany(InventoryLog::class);
    }

    public function images()
    {
        return $this->hasMany(ItemImage::class);
    }

    public function getMainImageAttribute($value)
    {
        if (!$value) return null;
        if (str_starts_with($value, 'http')) return $value;
        return asset('storage/' . $value);
    }

    public function primaryImage()
    {
        return $this->hasOne(ItemImage::class)->where('is_primary', true);
    }

    public function isAvailable($quantity = 1)
    {
        if ($this->type === 'animal') {
            return $this->status !== 'sold' && $this->stock > 0 && $quantity === 1;
        }

        return $this->stock >= $quantity;
    }


}
