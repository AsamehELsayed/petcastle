<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => Coupon::latest()->paginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:coupons,code',
            'type' => 'required|in:fixed,percentage',
            'value' => 'required|numeric',
            'expires_at' => 'nullable|date',
            'limit' => 'nullable|integer',
        ]);

        Coupon::create($request->all());
        return redirect()->back()->with('success', 'Coupon created successfully.');
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->update($request->all());
        return redirect()->back()->with('success', 'Coupon updated successfully.');
    }

    public function destroy($id)
    {
        Coupon::destroy($id);
        return redirect()->back()->with('success', 'Coupon deleted successfully.');
    }
}
