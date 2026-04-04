<?php

namespace App\Services\Admin;

use App\Models\Item;
use App\Models\InventoryLog;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;

class InventoryService extends BaseService
{
    public function getStockList($filters = [])
    {
        $query = Item::with(['categories', 'brand']);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['low_stock'])) {
            $query->where('stock', '<=', DB::raw('stock_threshold'));
        }

        $perPage = $filters['per_page'] ?? 25;
        return $query->paginate($perPage);
    }

    public function updateStock($id, $quantity, $action = 'adjustment')
    {
        return DB::transaction(function () use ($id, $quantity, $action) {
            $item = Item::findOrFail($id);
            $oldStock = $item->stock;
            $item->update(['stock' => $quantity]);

            InventoryLog::create([
                'item_id' => $item->id,
                'action_type' => $action,
                'change_amount' => $quantity - $oldStock,
                'new_stock' => $quantity,
                'user_id' => auth()->id(),
            ]);

            return $item;
        });
    }

    public function getInventoryLogs($filters = [])
    {
        $query = InventoryLog::with(['item', 'user']);

        if (!empty($filters['item_id'])) {
            $query->where('item_id', $filters['item_id']);
        }

        $perPage = $filters['per_page'] ?? 25;
        return $query->latest()->paginate($perPage);
    }
}
