<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'sku',
        'barcode',
        'weight',
        'size',
        'brand',
        'expiration_date',
    ];

    protected $casts = [
        'expiration_date' => 'date',
        'weight' => 'decimal:2',
    ];

    public function item() {
        return $this->belongsTo(Item::class);
    }
}
