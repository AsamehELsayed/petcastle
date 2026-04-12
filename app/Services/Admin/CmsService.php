<?php

namespace App\Services\Admin;

use App\Models\Page;
use App\Models\Section;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;

class CmsService extends BaseService
{
    public function getAllPages()
    {
        return Page::with('sections')->get();
    }

    public function createPage(array $data)
    {
        return Page::create($data);
    }

    public function updatePage($id, array $data)
    {
        $page = Page::findOrFail($id);
        $page->update($data);
        return $page;
    }

    public function createSection(array $data)
    {
        return Section::create($data);
    }

    public function updateSection($id, array $data)
    {
        $section = Section::findOrFail($id);
        $section->update($data);
        return $section;
    }

    public function reorderSections(array $orders)
    {
        return DB::transaction(function () use ($orders) {
            foreach ($orders as $order) {
                Section::where('id', $order['id'])->update(['order' => $order['order']]);
            }
            return true;
        });
    }

    public function deleteSection($id)
    {
        $section = Section::findOrFail($id);
        if (!$section->is_deletable) {
            throw new \Exception('This section is a system requirement and cannot be deleted.');
        }
        return $section->delete();
    }
}
