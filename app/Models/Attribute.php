<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function categories() {
        return $this->belongsToMany(Category::class, 'category_attributes');
    }

    public function items() {
        return $this->belongsToMany(Item::class, 'item_attribute_values')
            ->withPivot('value', 'id')
            ->withTimestamps();
    }
}
