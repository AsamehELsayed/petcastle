<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Category;
use App\Models\Brand;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class AdminFunctionalTest extends DuskTestCase
{
    /** @test */
    public function admin_can_create_a_category()
    {
        $admin = User::where('role', 'admin')->first();

        $this->browse(function (Browser $browser) use ($admin) {
            $browser->loginAs($admin)
                ->visit('/admin/categories')
                ->waitForText('Categories')
                ->click('@create-category-button') // Assuming this exists or I'll use a selector
                ->type('name', 'New Test Category')
                ->press('Save')
                ->waitForText('Category created successfully')
                ->assertSee('New Test Category');
        });
    }

    /** @test */
    public function admin_can_create_a_product()
    {
        $admin = User::where('role', 'admin')->first();
        $brand = Brand::first();
        $category = Category::first();

        $this->browse(function (Browser $browser) use ($admin, $brand, $category) {
            $browser->loginAs($admin)
                ->visit('/admin/products/create')
                ->waitForText('Add Product')
                ->type('name', 'Awesome Pet Toy')
                ->select('type', 'product')
                ->type('price', '29.99')
                ->type('stock', '100')
                ->select('brand_id', (string) $brand->id)
                ->select('categories[]', (string) $category->id) // Inertia multi-select usually uses name[]
                ->type('description', 'This is a test product created by Dusk.')
                ->press('Submit')
                ->waitForText('Item created successfully')
                ->assertPathIs('/admin/products')
                ->assertSee('Awesome Pet Toy');
        });
    }
}
