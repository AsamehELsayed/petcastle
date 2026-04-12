<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        $query = Item::with(['brand', 'categories', 'images'])
            ->where('status', 'active');

        // Filtering by Category
        if ($request->has('category')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filtering by Brand
        if ($request->has('brand')) {
            $query->whereHas('brand', function($q) use ($request) {
                $q->where('slug', $request->brand);
            });
        }

        // Search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sorting
        $sort = $request->get('sort', 'newest');
        switch ($sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;

            default:
                $query->latest();
                break;
        }

        $items = $query->paginate(12)->withQueryString();
        $categories = Category::whereNull('parent_id')->with('children')->get();
        $brands = \App\Models\Brand::all();

        return Inertia::render('ProductsIndex', [
            'items' => $items,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['category', 'brand', 'search', 'sort']),
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $item = Item::with(['brand', 'categories', 'productDetail', 'animalDetail', 'images'])
            ->findOrFail($id);

        $relatedItems = Item::where('id', '!=', $id)
            ->where('type', $item->type)
            ->whereHas('categories', function($q) use ($item) {
                $q->whereIn('categories.id', $item->categories->pluck('id'));
            })
            ->limit(4)
            ->get();

        return Inertia::render('ProductShow', [
            'product' => $item,
            'relatedProducts' => $relatedItems,
        ]);
    }
}
