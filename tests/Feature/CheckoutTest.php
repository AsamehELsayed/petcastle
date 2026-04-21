<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_requires_authentication()
    {
        $response = $this->postJson('/api/checkout', []);
        $response->assertStatus(401);
    }

    public function test_checkout_validates_required_fields()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->postJson('/api/checkout', []);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['address_id', 'items', 'payment_method', 'phone']);
    }

    public function test_checkout_only_allows_cod_payment_method()
    {
        $user = User::factory()->create();
        $address = Address::factory()->create(['user_id' => $user->id]);
        $item = Item::factory()->create(['stock' => 10, 'price' => 100]);

        $response = $this->actingAs($user)->postJson('/api/checkout', [
            'address_id' => $address->id,
            'items' => [['id' => $item->id, 'quantity' => 1]],
            'payment_method' => 'credit_card', // Invalid
            'phone' => '0790000000'
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['payment_method']);
    }

    public function test_successful_checkout_with_cod()
    {
        $user = User::factory()->create();
        $address = Address::factory()->create(['user_id' => $user->id]);
        $item = Item::factory()->create(['stock' => 10, 'price' => 100]);

        $response = $this->actingAs($user)->postJson('/api/checkout', [
            'address_id' => $address->id,
            'items' => [['id' => $item->id, 'quantity' => 2]],
            'payment_method' => 'cod',
            'phone' => '0790000000'
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('message', 'Order placed successfully.');

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'address_id' => $address->id,
            'payment_method' => 'cod',
            'total_price' => 200,
            'status' => 'pending'
        ]);

        $this->assertEquals(8, $item->fresh()->stock);
    }
}
