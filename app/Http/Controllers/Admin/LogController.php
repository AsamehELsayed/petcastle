<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ErrorLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    public function activity(Request $request)
    {
        $logs = ActivityLog::with('user')
            ->when($request->user_id, function ($query, $id) {
                return $query->where('user_id', $id);
            })
            ->when($request->action, function ($query, $action) {
                return $query->where('action', $action);
            })
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Logs/Activity', [
            'logs' => $logs,
            'filters' => $request->only(['user_id', 'action']),
        ]);
    }

    public function errors(Request $request)
    {
        $logs = ErrorLog::with('user')
            ->when($request->search, function ($query, $search) {
                return $query->where('message', 'like', '%' . $search . '%')
                             ->orWhere('file', 'like', '%' . $search . '%');
            })
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Logs/Errors', [
            'logs' => $logs,
            'filters' => $request->only(['search']),
        ]);
    }
}
