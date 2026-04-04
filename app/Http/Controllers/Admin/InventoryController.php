<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\InventoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    protected $inventoryService;

    public function __construct(InventoryService $inventoryService)
    {
        $this->inventoryService = $inventoryService;
    }

    public function index(Request $request)
    {
        $stock = $this->inventoryService->getStockList($request->all());
        return Inertia::render('Admin/Inventory/Index', [
            'stock' => $stock,
            'filters' => $request->only(['search', 'low_stock']),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'stock' => 'required|integer',
            'action' => 'required|string',
        ]);

        $this->inventoryService->updateStock($id, $request->stock, $request->action);
        return redirect()->back()->with('success', 'Stock updated successfully.');
    }

    public function logs(Request $request)
    {
        $logs = $this->inventoryService->getInventoryLogs($request->all());
        return Inertia::render('Admin/Inventory/Logs', [
            'logs' => $logs
        ]);
    }
}
