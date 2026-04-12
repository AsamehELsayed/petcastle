<?php

namespace App\Services\Admin;

use App\Models\Setting;
use App\Services\BaseService;
use Illuminate\Support\Facades\Cache;

class SettingService extends BaseService
{
    public function getAllSettings()
    {
        return Setting::all()->groupBy('group');
    }

    public function updateSetting($key, $value)
    {
        $setting = Setting::where('key', $key)->firstOrFail();
        $setting->update(['value' => $value]);
        
        Cache::forget('settings.' . $key);
        return $setting;
    }

    public function updateSettings(array $settings)
    {
        foreach ($settings as $key => $value) {
            $this->updateSetting($key, $value);
        }
        
        Cache::forget('settings_all');
        return true;
    }

    public function invalidateCache()
    {
        Cache::flush(); // Or more specifically flush settings cache
        return true;
    }
}
