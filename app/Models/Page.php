<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'status',
    ];

    public function sections()
    {
        return $this->hasMany(Section::class)->orderBy('order');
    }

    public function activeSections()
    {
        return $this->sections()->where('is_active', true);
    }
}
