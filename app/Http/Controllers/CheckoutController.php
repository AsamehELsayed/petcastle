<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $addresses = $user ? $user->addresses : [];

        return Inertia::render('Ecommerce/Checkout', [
            'initialAddresses' => $addresses,
        ]);
    }
}
