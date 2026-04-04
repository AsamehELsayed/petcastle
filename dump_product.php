<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$id = 16;
$item = \App\Models\Item::with(['categories', 'brand', 'species', 'breed', 'animalDetail.species', 'animalDetail.breed', 'productDetail', 'images'])->find($id);

if ($item) {
    echo json_encode($item, JSON_PRETTY_PRINT);
} else {
    echo "Item not found";
}
