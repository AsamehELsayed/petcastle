<?php

use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Api\CouponController;

use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{key}', [SettingController::class, 'show']);
Route::middleware('auth:sanctum')->put('/settings/{key}', [SettingController::class, 'update']);


Route::get('/pages/{slug}', [CmsController::class, 'getPage']);
Route::get('/sections/global', [CmsController::class, 'getGlobalSections']);

// Discounts & Coupons
Route::post('/apply-coupon', [CouponController::class, 'applyCoupon']);



// Inventory Management
Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/items/{id}/stock', [InventoryController::class, 'updateStock']);
    Route::get('/inventory/logs', [InventoryController::class, 'index']);
    Route::get('/inventory/low-stock', [InventoryController::class, 'lowStockAlerts']);
    Route::post('/checkout', [OrderController::class, 'checkout']);
});
