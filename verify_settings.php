<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Cache;

echo "Testing setting() helper...\n";

// Test general.site_name
$siteName = setting('general.site_name');
echo "Site Name: " . $siteName . "\n";

// Test shipping.default_fee
$shippingFee = setting('shipping.default_fee');
echo "Shipping Fee: " . $shippingFee . "\n";

// Test non-existent key
$nonExistent = setting('non.existent', 'default_value');
echo "Non-existent: " . $nonExistent . "\n";

// Test caching (checking if cache exists)
$cacheKey = "setting_general";
if (Cache::has($cacheKey)) {
    echo "Cache exists for 'general'\n";
} else {
    echo "Cache MISS for 'general' (Check if Cache::rememberForever worked)\n";
}
