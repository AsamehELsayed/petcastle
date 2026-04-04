<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Arr;

if (!function_exists('setting')) {
    /**
     * Get the value of a setting.
     *
     * @param string $key The setting key (can use dot notation for JSON values, e.g., 'general.site_name')
     * @param mixed $default Default value if not found
     * @return mixed
     */
    function setting($key, $default = null)
    {
        $segments = explode('.', $key);
        $rootKey = $segments[0];

        $setting = Cache::rememberForever("setting_{$rootKey}", function () use ($rootKey) {
            return Setting::where('key', $rootKey)->first();
        });

        if (!$setting) {
            return $default;
        }

        if (count($segments) > 1) {
            return Arr::get($setting->value, implode('.', array_slice($segments, 1)), $default);
        }

        return $setting->value;
    }
}
