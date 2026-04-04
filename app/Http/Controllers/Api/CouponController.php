<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function applyCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'order_total' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::where('code', $request->code)->where('is_active', true)->first();

        if (!$coupon) {
            return response()->json(['message' => 'Invalid or inactive coupon code.'], 422);
        }

        if (!$coupon->isValidForOrder($request->order_total)) {
            return response()->json(['message' => 'Coupon cannot be applied to this order (expiry or limit reached).'], 422);
        }

        $discount = $coupon->calculateDiscount($request->order_total);

        return response()->json([
            'coupon_id' => $coupon->id,
            'code' => $coupon->code,
            'discount_amount' => $discount,
            'new_total' => $request->order_total - $discount
        ]);
    }
}
