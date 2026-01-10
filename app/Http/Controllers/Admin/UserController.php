<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Only show users with role 'user' (exclude admins)
        $query->where('role', 'user');

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'aktif') {
                $query->whereNull('suspended_at');
            } elseif ($request->status === 'suspended') {
                $query->whereNotNull('suspended_at');
            }
        }

        // Search by name, email, or ID
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%");
            });
        }

        // Order by latest
        $query->orderBy('created_at', 'desc');

        // Paginate
        $users = $query->paginate(10)->withQueryString();

        // Get stats (only for role user)
        $totalUsers = User::where('role', 'user')->count();
        $activeUsers = User::where('role', 'user')->whereNull('suspended_at')->count();
        $suspendedUsers = User::where('role', 'user')->whereNotNull('suspended_at')->count();

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => [
                'status' => $request->status ?? '',
                'search' => $request->search ?? '',
            ],
            'stats' => [
                'total' => $totalUsers,
                'active' => $activeUsers,
                'suspended' => $suspendedUsers,
            ],
        ]);
    }

    /**
     * Add balance to user.
     */
    public function addBalance(Request $request, User $user)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string|max:255',
        ]);

        $user->balance += $request->amount;
        $user->save();

        // TODO: Create transaction log
        // Transaction::create([
        //     'user_id' => $user->id,
        //     'type' => 'credit',
        //     'amount' => $request->amount,
        //     'note' => $request->note ?? 'Penambahan saldo oleh admin',
        // ]);

        return back()->with('success', 'Saldo berhasil ditambahkan sebesar Rp ' . number_format($request->amount, 0, ',', '.'));
    }

    /**
     * Subtract balance from user.
     */
    public function subtractBalance(Request $request, User $user)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string|max:255',
        ]);

        if ($user->balance < $request->amount) {
            return back()->withErrors(['amount' => 'Saldo tidak mencukupi']);
        }

        $user->balance -= $request->amount;
        $user->save();

        // TODO: Create transaction log

        return back()->with('success', 'Saldo berhasil dikurangi sebesar Rp ' . number_format($request->amount, 0, ',', '.'));
    }

    /**
     * Suspend user account.
     */
    public function suspend(User $user)
    {
        $user->suspended_at = now();
        $user->save();

        return back()->with('success', 'Akun ' . $user->name . ' berhasil di-suspend');
    }

    /**
     * Unsuspend user account.
     */
    public function unsuspend(User $user)
    {
        $user->suspended_at = null;
        $user->save();

        return back()->with('success', 'Akun ' . $user->name . ' berhasil diaktifkan kembali');
    }
}
