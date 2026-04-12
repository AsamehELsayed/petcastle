<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\ActivityLog;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;

class OrderService extends BaseService
{
    public function getAllOrders($filters = [])
    {
        $query = Order::with(['user', 'items', 'coupon']);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['search'])) {
            $query->where('id', 'like', '%' . $filters['search'] . '%');
        }

        return $query->paginate(15);
    }

    public function updateOrderStatus($id, $status)
    {
        try {
            return DB::transaction(function () use ($id, $status) {
                $order = Order::findOrFail($id);
                $oldStatus = $order->status;
                $order->update(['status' => $status]);

                ActivityLog::create([
                    'user_id' => auth()->id(),
                    'action' => 'updated_order_status',
                    'model_type' => Order::class,
                    'model_id' => $order->id,
                    'description' => "Order #{$order->id} status changed from {$oldStatus} to {$status}",
                ]);

                return $order;
            });
        } catch (\Exception $e) {
            \Log::error("Error updating order {$id} status: " . $e->getMessage());
            throw $e;
        }
    }

    public function getOrderDetails($id)
    {
        return Order::with(['user', 'items', 'coupon', 'address'])->findOrFail($id);
    }
}
