<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page;
use App\Models\Section;
use Illuminate\Support\Facades\Cache;

class CmsController extends Controller
{
    public function getPage($slug)
    {
        $page = Cache::remember("cms_page_{$slug}", 3600, function () use ($slug) {
            return Page::where('slug', $slug)
                ->where('status', 'published')
                ->with(['activeSections' => function ($query) {
                    $query->orderBy('order');
                }])
                ->first();
        });

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json([
            'page' => $page->slug,
            'title' => $page->title,
            'sections' => $page->activeSections
        ]);
    }

    public function getGlobalSections()
    {
        $sections = Cache::remember("cms_global_sections", 3600, function () {
            return Section::whereNull('page_id')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();
        });

        return response()->json([
            'sections' => $sections
        ]);
    }
}
