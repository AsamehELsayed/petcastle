<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show($slug = 'home')
    {
        $page = Page::where('slug', $slug)->with('activeSections')->first();

        // If 'home' page doesn't exist yet, we can either seed it or just return a blank page object
        if (!$page && $slug !== 'home') {
            abort(404);
        }

        // Fetch data needed for dynamic ecommerce blocks
        $categories = \App\Models\Category::whereNull('parent_id')->with('children')->get();
        $brands = \App\Models\Brand::limit(6)->get();
        $species = \App\Models\Species::with('breeds')->get();
        
        $deals = \App\Models\Item::where('is_deal', true)
            ->with(['primaryImage', 'brand'])
            ->limit(10)
            ->get();
            
        $bestSellers = \App\Models\Item::where('is_trending', true)
            ->with(['primaryImage', 'brand', 'categories'])
            ->limit(12)
            ->get();

        $items = \App\Models\Item::with(['primaryImage', 'brand', 'categories'])->latest()->get();
        $animals = \App\Models\Item::where('type', 'animal')->with(['primaryImage', 'brand', 'animalDetail'])->latest()->get();

        return Inertia::render('EcommerceHome', [
            'page' => $page,
            'categories' => $categories,
            'brands' => $brands,
            'species' => $species,
            'items' => $items,
            'animals' => $animals,
            'deals' => $deals,
            'bestSellers' => $bestSellers,
            'slug' => $slug,
        ]);
    }
}
