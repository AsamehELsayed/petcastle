<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnimalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalRequestController extends Controller
{
    /**
     * Display a listing of the animal requests.
     */
    public function index()
    {
        $requests = AnimalRequest::latest()->paginate(10);

        return Inertia::render('Admin/AnimalRequests/Index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Update the specified animal request.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,contacted,resolved',
        ]);

        $animalRequest = AnimalRequest::findOrFail($id);
        $animalRequest->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Status updated successfully.');
    }

    /**
     * Remove the specified animal request from storage.
     */
    public function destroy(string $id)
    {
        $animalRequest = AnimalRequest::findOrFail($id);
        $animalRequest->delete();

        return back()->with('success', 'Request deleted successfully.');
    }
}
