<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Species;
use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Taxonomy/Index', [
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'species' => Species::with('breeds')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $type = $request->input('type'); // category, brand, species, breed
        $model = $this->getModelByType($type);

        $request->validate([
            'name' => 'required|string',
            'species_id' => $type === 'breed' ? 'required|exists:species,id' : 'nullable',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ];
        if ($type === 'breed') {
            $data['species_id'] = $request->species_id;
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('taxonomies', 'public');
        }

        $model::create($data);
        return redirect()->back()->with('success', ucfirst($type) . ' created successfully.');
    }

    public function update(Request $request, $id)
    {
        $type = $request->input('type');
        $model = $this->getModelByType($type);
        $item = $model::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'species_id' => $type === 'breed' ? 'required|exists:species,id' : 'nullable',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ];
        if ($type === 'breed') {
            $data['species_id'] = $request->species_id;
        }

        if ($request->hasFile('image')) {
            if ($item->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($item->image);
            }
            $data['image'] = $request->file('image')->store('taxonomies', 'public');
        }

        $item->update($data);
        return redirect()->back()->with('success', ucfirst($type) . ' updated successfully.');
    }

    public function destroy(Request $request, $id)
    {
        $type = $request->input('type');
        $model = $this->getModelByType($type);
        $model::destroy($id);
        return redirect()->back()->with('success', ucfirst($type) . ' deleted successfully.');
    }

    protected function getModelByType($type)
    {
        return match ($type) {
            'category' => Category::class,
            'brand' => Brand::class,
            'species' => Species::class,
            'breed' => Breed::class,
            default => abort(400, 'Invalid taxonomy type'),
        };
    }
}
