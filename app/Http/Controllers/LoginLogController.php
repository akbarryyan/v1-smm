<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LoginLogController extends Controller
{
    public function index(Request $request)
    {
        $query = LoginLog::where('user_id', Auth::id());

        // Filter by Year
        if ($request->has('year') && $request->year != '') {
             $query->whereYear('created_at', $request->year);
        } else {
             $query->whereYear('created_at', date('Y')); // Default current year or we can remove default if we want all
        }

        // Search (IP or User Agent)
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('ip_address', 'like', '%'.$request->search.'%')
                  ->orWhere('user_agent', 'like', '%'.$request->search.'%');
            });
        }

        $logs = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($log) {
                return [
                    'id' => $log->id,
                    'date' => $log->created_at->translatedFormat('d F Y H:i:s'),
                    'device' => $log->user_agent, // We can improve parsing later if needed
                    'ip' => $log->ip_address,
                ];
            });

        return Inertia::render('login-logs', [
            'logs' => $logs,
            'filters' => $request->only(['year', 'search']),
            'currentYear' => date('Y'),
        ]);
    }
}
