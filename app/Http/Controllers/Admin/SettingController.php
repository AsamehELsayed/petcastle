<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $this->settingService->getAllSettings()
        ]);
    }

    public function update(Request $request)
    {
        $this->settingService->updateSettings($request->all());
        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    public function invalidateCache()
    {
        $this->settingService->invalidateCache();
        return redirect()->back()->with('success', 'Cache cleared successfully.');
    }
}
