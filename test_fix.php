<?php

use App\Models\Item;
use App\Models\Brand;
use App\Services\Admin\ProductService;
use Illuminate\Support\Facades\Schema;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Ensure we have a brand
$brand = Brand::first() ?? Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);

// Test 3: Via Service (should now succeed after my fixes)
$service = app(ProductService::class);
$data = [
    'name' => 'Service Test FINAL ' . time(),
    'type' => 'product', 'price' => 10.00, 'stock' => 5, 'brand_id' => $brand->id,
    'description' => 'Test description',
    'categories' => [],
    'details' => ['material' => 'Wood'],
];

try {
    $item = $service->createProduct($data);
    echo "SERVICE_TEST_PASSED: " . $item->id . "\n";
    $item->delete();
} catch (\Exception $e) {
    echo "SERVICE_TEST_FAILED: " . $e->getMessage() . "\n";
}
