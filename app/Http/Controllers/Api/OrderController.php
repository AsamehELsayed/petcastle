<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\InventoryLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|in:cod',
            'phone' => 'required|string',
        ]);

        return DB::transaction(function () use ($request) {
            $totalPrice = 0;
            $itemsToProcess = [];

            // 1. Validate Stock & Calculate Total
            foreach ($request->items as $itemData) {
                $item = Item::lockForUpdate()->findOrFail($itemData['id']);

                if (!$item->isAvailable($itemData['quantity'])) {
                    throw new \Exception("Item {$item->name} is out of stock.");
                }

                $totalPrice += $item->price * $itemData['quantity'];
                $itemsToProcess[] = [
                    'item' => $item,
                    'quantity' => $itemData['quantity'],
                    'price' => $item->price,
                    'total_item_price' => $item->price * $itemData['quantity']
                ];
            }


            // 3. Create Order
            $order = Order::create([
                'user_id' => Auth::id(),
                'address_id' => $request->address_id,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'phone' => $request->phone,
            ]);

            // 4. Process Order Items & Update Inventory
            foreach ($itemsToProcess as $data) {
                $item = $data['item'];
                $quantity = $data['quantity'];

                // Create Order Item
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'quantity' => $quantity,
                    'price' => $data['price'],
                    'total' => $data['total_item_price']
                ]);

                // Reduce Stock
                $item->decrement('stock', $quantity);

                // Handle Animals
                if ($item->type === 'animal' && $item->stock == 0) {
                    $item->update(['status' => 'sold']);
                }

                // Log Inventory
                InventoryLog::create([
                    'item_id' => $item->id,
                    'type' => 'decrease',
                    'quantity' => $quantity,
                    'reason' => 'order',
                ]);
            }


            return response()->json([
                'message' => 'Order placed successfully.',
                'order' => $order->load('items.item')
            ], 201);
        });
    }
}
