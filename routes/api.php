<?php

use App\Http\Controllers\Api\CmsController;

use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{key}', [SettingController::class, 'show']);
Route::middleware('auth:sanctum')->put('/settings/{key}', [SettingController::class, 'update']);


Route::get('/pages/{slug}', [CmsController::class, 'getPage']);
Route::get('/sections/global', [CmsController::class, 'getGlobalSections']);




// Inventory Management
Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/items/{id}/stock', [InventoryController::class, 'updateStock']);
    Route::get('/inventory/logs', [InventoryController::class, 'index']);
    Route::get('/inventory/low-stock', [InventoryController::class, 'lowStockAlerts']);
    Route::get('/addresses', [\App\Http\Controllers\Api\AddressController::class, 'index']);
    Route::post('/addresses', [\App\Http\Controllers\Api\AddressController::class, 'store']);
    Route::post('/checkout', [OrderController::class, 'checkout']);
});
