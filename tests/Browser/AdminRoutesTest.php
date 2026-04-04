<?php

use App\Models\User;
use Laravel\Dusk\Browser;

test('admin can visit dashboard', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin')
            ->waitForText('Products') // adjust based on actual content
            ->assertPathIs('/admin');
    });
});

test('admin can visit products index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/products')
            ->waitForText('Add Product')
            ->assertPathIs('/admin/products');
    });
});

test('admin can visit orders index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/orders')
            ->waitForText('Orders List')
            ->assertPathIs('/admin/orders');
    });
});

test('admin can visit users index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/users')
            ->waitForText('Manage Users')
            ->assertPathIs('/admin/users');
    });
});

test('admin can visit coupons index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/coupons')
            ->waitForText('Coupons')
            ->assertPathIs('/admin/coupons');
    });
});

test('admin can visit inventory index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/inventory')
            ->waitForText('Inventory Management')
            ->assertPathIs('/admin/inventory');
    });
});

test('admin can visit categories index', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/categories')
            ->waitForText('Categories')
            ->assertPathIs('/admin/categories');
    });
});

test('admin can visit settings page', function () {
    $user = User::where('role', 'admin')->first();

    $this->browse(function (Browser $browser) use ($user) {
        $browser->loginAs($user)
            ->visit('/admin/settings')
            ->waitForText('Settings')
            ->assertPathIs('/admin/settings');
    });
});
