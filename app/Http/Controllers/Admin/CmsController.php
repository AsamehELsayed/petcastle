<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CmsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsController extends Controller
{
    protected $cmsService;

    public function __construct(CmsService $cmsService)
    {
        $this->cmsService = $cmsService;
    }

    public function index()
    {
        $pages = $this->cmsService->getAllPages();
        return Inertia::render('Admin/CMS/Index', [
            'pages' => $pages
        ]);
    }

    public function storePage(Request $request)
    {
        $request->validate(['title' => 'required|string', 'slug' => 'required|string|unique:pages,slug']);
        $this->cmsService->createPage($request->all());
        return redirect()->back()->with('success', 'Page created successfully.');
    }

    public function updatePage(Request $request, $id)
    {
        $this->cmsService->updatePage($id, $request->all());
        return redirect()->back()->with('success', 'Page updated successfully.');
    }

    public function storeSection(Request $request)
    {
        $request->validate(['type' => 'required|string', 'page_id' => 'required|exists:pages,id']);

        $data = $request->all();

        if (empty($data['key'])) {
            $page = \App\Models\Page::find($data['page_id']);
            $data['key'] = ($page ? $page->slug : 'page') . '_' . $data['type'] . '_' . uniqid();
        }

        if (empty($data['data'])) {
            switch ($data['type']) {
                case 'hero':
                    $data['data'] = ['title' => 'Welcome', 'subtitle' => 'Description', 'button_text' => 'Shop Now', 'button_link' => '/products', 'image' => ''];
                    break;
                case 'features':
                    $data['data'] = ['title' => 'Our Features', 'features' => [['title' => 'Fast Shipping', 'description' => 'Worldwide']]];
                    break;
                case 'animal_request_hero':
                    $data['data'] = ['title' => 'YOU NAME IT, WE FIND IT.', 'subtitle' => 'Premium animal sourcing service', 'image' => '/images/animal_sourcing_hero.png'];
                    break;
                case 'text':
                default:
                    $data['data'] = ['content' => 'Add your text here'];
                    break;
            }
        }

        $this->cmsService->createSection($data);
        return redirect()->back()->with('success', 'Section added successfully.');
    }

    public function updateSection(Request $request, $id)
    {
        $data = $request->all();
        $sectionData = $data['data'] ?? [];

        // Handle image uploads within the data field
        foreach ($request->allFiles() as $key => $file) {
            // Keys usually look like 'data.image' or 'data.card1_image'
            if (strpos($key, 'data.') === 0) {
                $dataKey = substr($key, 5); // remove 'data.' prefix
                $path = $file->store('cms', 'public');
                $sectionData[$dataKey] = '/storage/' . $path;
            }
        }

        // Fix boolean values that might be sent as strings via FormData
        $booleanFields = ['only_photo', 'is_full_width', 'show_overlay'];
        foreach ($booleanFields as $field) {
            if (isset($sectionData[$field])) {
                $sectionData[$field] = filter_var($sectionData[$field], FILTER_VALIDATE_BOOLEAN);
            }
        }

        $this->cmsService->updateSection($id, [
            'data' => $sectionData,
            'is_active' => $request->boolean('is_active', true)
        ]);

        return redirect()->back()->with('success', 'Section updated successfully.');
    }

    public function reorderSections(Request $request)
    {
        $this->cmsService->reorderSections($request->input('orders'));
        return redirect()->back()->with('success', 'Sections reordered successfully.');
    }

    public function destroySection($id)
    {
        try {
            $this->cmsService->deleteSection($id);
            return redirect()->back()->with('success', 'Section deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
