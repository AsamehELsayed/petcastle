<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the customer dashboard.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Customer/Dashboard', [
            'user' => $request->user(),
            'orderCount' => $request->user()->orders()->count(),
            'recentOrders' => $request->user()->orders()->latest()->limit(5)->get(),
        ]);
    }
}
