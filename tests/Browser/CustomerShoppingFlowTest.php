<?php

namespace Tests\Browser;

use App\Models\Item;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class CustomerShoppingFlowTest extends DuskTestCase
{
    /** @test */
    public function customer_can_add_item_to_cart()
    {
        $item = Item::where('type', 'product')
            ->where('stock', '>', 0)
            ->first();

        $this->browse(function (Browser $browser) use ($item) {
            $browser->visit('/')
                ->waitForText($item->name)
                ->click('@add-to-cart-' . $item->id) // Assuming this selector exists or I'll use a generic one
                ->waitForText('Item added to cart')
                ->click('@cart-icon')
                ->waitForText('Bag')
                ->assertSee($item->name);
        });
    }

    /** @test */
    public function customer_can_browse_categories()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->click('@category-link-1') // Browsing first category
                ->waitForText('Products')
                ->assertPathIs('/category/1'); // Adjust based on route structure
        });
    }
}
