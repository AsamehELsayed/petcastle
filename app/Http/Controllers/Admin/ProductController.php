<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ProductsImport;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $items = $this->productService->getAllProducts($request->all());
        return Inertia::render('Admin/Products/Index', [
            'products' => $items,
            'filters' => $request->only(['search', 'category_id', 'type', 'brand_id']),
            'categories' => \App\Models\Category::all(['id', 'name']),
            'brands' => \App\Models\Brand::all(['id', 'name']),
        ]);
    }

    public function show($id)
    {
        $item = $this->productService->getProductById($id);
        return Inertia::render('Admin/Products/Show', [
            'product' => $item
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => \App\Models\Category::all(),
            'brands' => \App\Models\Brand::all(),
            'species' => \App\Models\Species::all(),
            'breeds' => \App\Models\Breed::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:animal,product',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'brand_id' => 'required|exists:brands,id',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
            'description' => 'nullable|string',
            'details' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'image|max:10240',
        ]);

        $this->productService->createProduct($validated);
        return redirect()->route('admin.products.index')->with('success', 'Item created successfully.');
    }

    public function edit($id)
    {
        $item = $this->productService->getProductById($id);
        return Inertia::render('Admin/Products/Edit', [
            'product' => $item,
            'categories' => \App\Models\Category::all(),
            'brands' => \App\Models\Brand::all(),
            'species' => \App\Models\Species::all(),
            'breeds' => \App\Models\Breed::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|in:animal,product',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'brand_id' => 'sometimes|required|exists:brands,id',
            'categories' => 'sometimes|required|array',
            'categories.*' => 'exists:categories,id',
            'description' => 'nullable|string',
            'details' => 'nullable|array',
            'details.sku' => 'nullable|string|max:255',
            'details.barcode' => 'nullable|string|max:255',
            'details.brand' => 'nullable|string|max:255',
            'details.size' => 'nullable|string|max:255',
            'details.weight' => 'nullable|numeric|min:0',
            'details.expiration_date' => 'nullable|date',
            'images' => 'nullable|array',
            'images.*' => 'image|max:10240',
        ]);

        $this->productService->updateProduct($id, $validated);
        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $this->productService->deleteProduct($id);
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
        ]);

        Excel::import(new ProductsImport, $request->file('file'));

        return redirect()->back()->with('success', 'Products imported successfully.');
    }
}
