<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function animalDetails() {
        return $this->hasMany(AnimalDetail::class);
    }

    public function breeds() {
        return $this->hasMany(Breed::class);
    }

    public function items() {
        return $this->belongsToMany(Item::class, 'item_species');
    }
}
