<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryLog;
use App\Models\Item;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $logs = InventoryLog::with('item:id,name,type')
            ->latest()
            ->paginate(15);

        return response()->json($logs);
    }

    public function updateStock(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer',
            'reason' => 'required|string',
            'type' => 'required|in:increase,decrease',
        ]);

        $item = Item::findOrFail($itemId);
        $oldStock = $item->stock;

        if ($request->type === 'increase') {
            $item->stock += $request->quantity;
        } else {
            if ($item->stock < $request->quantity) {
                return response()->json(['message' => 'Insufficient stock to decrease by this amount.'], 422);
            }
            $item->stock -= $request->quantity;
        }

        if ($item->type === 'animal' && $item->stock == 0) {
            $item->status = 'sold';
        }

        $item->save();

        InventoryLog::create([
            'item_id' => $item->id,
            'type' => $request->type,
            'quantity' => $request->quantity,
            'reason' => $request->reason,
        ]);

        return response()->json([
            'message' => 'Stock updated successfully.',
            'old_stock' => $oldStock,
            'new_stock' => $item->stock
        ]);
    }

    public function lowStockAlerts()
    {
        $items = Item::whereRaw('stock <= low_stock_threshold')->get();
        return response()->json($items);
    }
}
