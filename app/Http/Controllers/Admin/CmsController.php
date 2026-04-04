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
        $this->cmsService->updateSection($id, $request->all());
        return redirect()->back()->with('success', 'Section updated successfully.');
    }

    public function reorderSections(Request $request)
    {
        $this->cmsService->reorderSections($request->input('orders'));
        return redirect()->back()->with('success', 'Sections reordered successfully.');
    }

    public function destroySection($id)
    {
        $this->cmsService->deleteSection($id);
        return redirect()->back()->with('success', 'Section deleted successfully.');
    }
}
