<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\PageController::class, 'show'])->name('home');

Route::middleware(['auth', 'customer'])->prefix('portal')->name('portal.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/product/{id}', [ProductController::class, 'show'])->name('products.show');

// Blog
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

// Animal Request
Route::get('/request-animal', [\App\Http\Controllers\AnimalRequestController::class, 'index'])->name('animal.request.create');
Route::post('/request-animal', [\App\Http\Controllers\AnimalRequestController::class, 'store'])->name('animal.request.store');

// Dynamic CMS Pages (Must be at the end)
Route::get('/{slug}', [\App\Http\Controllers\PageController::class, 'show'])->name('cms.page');
