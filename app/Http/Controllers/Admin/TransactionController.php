<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with('user')
            ->orderBy('created_at', 'desc');

        // Filter by type/category
        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('category', $request->type);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $transactions = $query->paginate(15)->withQueryString();

        // Stats
        $stats = [
            'totalTopup' => Transaction::where('category', 'deposit')
                ->where('type', 'credit')
                ->sum('amount'),
            'totalOrder' => Transaction::where('category', 'order')
                ->where('type', 'debit')
                ->sum('amount'),
            'totalRefund' => Transaction::where('category', 'refund')
                ->where('type', 'credit')
                ->sum('amount'),
        ];

        return Inertia::render('admin/transactions', [
            'transactions' => $transactions,
            'stats' => $stats,
            'filters' => $request->only(['type', 'date_from', 'date_to', 'search']),
        ]);
    }
}
