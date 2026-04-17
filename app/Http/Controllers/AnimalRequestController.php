<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalRequestController extends Controller
{
    /**
     * Store a new animal request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'animal_type' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // In a real scenario, we would save to a table or send an email.
        // For now, we simulate a successful submission.
        
        return back()->with('success', 'Your request has been received! Our team will contact you soon.');
    }
}
