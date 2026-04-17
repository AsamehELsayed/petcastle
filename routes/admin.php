<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CouponController;

use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CmsController;
use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Products
    Route::resource('products', ProductController::class);
    Route::post('products/import', [ProductController::class, 'import'])->name('products.import');

    // Orders
    Route::resource('orders', OrderController::class)->only(['index', 'show', 'update']);

    // Users
    Route::resource('users', UserController::class)->only(['index', 'show', 'update']);

    // Coupons
    Route::resource('coupons', CouponController::class);



    // Inventory
    Route::get('inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::put('inventory/{id}', [InventoryController::class, 'update'])->name('inventory.update');
    Route::get('inventory/logs', [InventoryController::class, 'logs'])->name('inventory.logs');

    // Taxonomy (Brands, Species, Breeds)
    Route::resource('categories', CategoryController::class);

    // CMS
    Route::get('cms', [CmsController::class, 'index'])->name('cms.index');
    Route::post('cms/pages', [CmsController::class, 'storePage'])->name('cms.pages.store');
    Route::put('cms/pages/{id}', [CmsController::class, 'updatePage'])->name('cms.pages.update');
    Route::post('cms/sections', [CmsController::class, 'storeSection'])->name('cms.sections.store');
    Route::put('cms/sections/{id}', [CmsController::class, 'updateSection'])->name('cms.sections.update');
    Route::post('cms/sections/reorder', [CmsController::class, 'reorderSections'])->name('cms.sections.reorder');
    Route::delete('cms/sections/{id}', [CmsController::class, 'destroySection'])->name('cms.sections.destroy');

    // Logs
    Route::get('logs/activity', [LogController::class, 'activity'])->name('logs.activity');
    Route::get('logs/errors', [LogController::class, 'errors'])->name('logs.errors');

    // Blog
    Route::resource('blog', BlogPostController::class);

    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
});
