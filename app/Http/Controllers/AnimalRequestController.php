<?php

namespace App\Http\Controllers;

use App\Models\AnimalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalRequestController extends Controller
{
    /**
     * Display the animal request form.
     */
    public function index()
    {
        $page = \App\Models\Page::where('slug', 'request-animal')->with('activeSections')->first();

        return Inertia::render('AnimalRequest', [
            'page' => $page,
        ]);
    }

    /**
     * Store a new animal request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'animal_type' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        AnimalRequest::create([
            'name' => $validated['name'],
            'contact' => $validated['contact'],
            'animal_type' => $validated['animal_type'],
            'description' => $validated['description'],
            'status' => 'pending',
        ]);
        
        return back()->with('success', 'Your request has been received! Our team will contact you soon.');
    }
}
