<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'species_id',
        'breed_id',
        'age',
        'gender',
        'color',
        'weight',
        'vaccinated',
        'trained',
        'health_status',
    ];

    protected $casts = [
        'vaccinated' => 'boolean',
        'trained' => 'boolean',
        'weight' => 'decimal:2',
    ];

    public function item() {
        return $this->belongsTo(Item::class);
    }

    public function species() {
        return $this->belongsTo(Species::class);
    }

    public function breed() {
        return $this->belongsTo(Breed::class);
    }
}
