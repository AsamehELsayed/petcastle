<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    /** @use HasFactory<\Database\Factories\SectionFactory> */
    use HasFactory;

    protected $fillable = [
        'page_id',
        'key',
        'type',
        'data',
        'order',
        'is_active',
        'is_deletable',
    ];

    protected $casts = [
        'data' => 'array',
        'is_active' => 'boolean',
        'is_deletable' => 'boolean',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
