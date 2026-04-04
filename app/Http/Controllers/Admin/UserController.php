<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $users = $this->userService->getAllUsers($request->all());
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    public function show($id)
    {
        $user = $this->userService->getUserDetails($id);
        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->userService->toggleUserStatus($id);
        return redirect()->back()->with('success', 'User status updated successfully.');
    }
}
