<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\Coupon;
use App\Models\CouponUsage;
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
            'coupon_code' => 'nullable|string',
            'payment_method' => 'required|string',
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

            // 2. Process Coupon
            $couponId = null;
            $discountAmount = 0;
            if ($request->coupon_code) {
                $coupon = Coupon::where('code', $request->coupon_code)->first();
                if ($coupon && $coupon->isValidForOrder($totalPrice)) {
                    $couponId = $coupon->id;
                    $discountAmount = $coupon->calculateDiscount($totalPrice);
                    $totalPrice -= $discountAmount;

                    // Increment used count
                    $coupon->increment('used_count');
                }
            }

            // 3. Create Order
            $order = Order::create([
                'user_id' => Auth::id(),
                'address_id' => $request->address_id,
                'coupon_id' => $couponId,
                'discount_amount' => $discountAmount,
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

            // 5. Track Coupon Usage
            if ($couponId) {
                CouponUsage::create([
                    'coupon_id' => $couponId,
                    'user_id' => Auth::id(),
                    'order_id' => $order->id,
                ]);
            }

            return response()->json([
                'message' => 'Order placed successfully.',
                'order' => $order->load('items.item')
            ], 201);
        });
    }
}
