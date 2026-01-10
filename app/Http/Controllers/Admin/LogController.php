<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $query = SystemLog::with('user')
            ->orderBy('created_at', 'desc');

        // Filter by type
        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by level
        if ($request->filled('level') && $request->level !== 'all') {
            $query->where('level', $request->level);
        }

        // Filter by date
        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('message', 'like', "%{$search}%")
                  ->orWhere('context', 'like', "%{$search}%");
            });
        }

        $logs = $query->paginate(20)->withQueryString();

        // Stats
        $stats = [
            'total' => SystemLog::count(),
            'info' => SystemLog::where('level', 'info')->count(),
            'warning' => SystemLog::where('level', 'warning')->count(),
            'error' => SystemLog::where('level', 'error')->count(),
        ];

        return Inertia::render('admin/logs', [
            'logs' => $logs,
            'stats' => $stats,
            'filters' => $request->only(['type', 'level', 'date', 'search']),
        ]);
    }
}
