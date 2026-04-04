<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryLog extends Model
{
    protected $fillable = ['item_id', 'type', 'quantity', 'reason'];

    public $timestamps = false;

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
