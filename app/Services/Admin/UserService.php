<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Services\BaseService;

class UserService extends BaseService
{
    public function getAllUsers($filters = [])
    {
        $query = User::withCount(['orders']);

        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('email', 'like', '%' . $filters['search'] . '%');
        }

        return $query->paginate(15);
    }

    public function toggleUserStatus($id)
    {
        $user = User::findOrFail($id);
        $user->update(['status' => $user->status === 'active' ? 'inactive' : 'active']);
        return $user;
    }

    public function getUserDetails($id)
    {
        return User::with(['orders', 'addresses'])->findOrFail($id);
    }
}
