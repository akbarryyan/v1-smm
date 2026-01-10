<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BalanceController extends Controller
{
    public function mutations(Request $request)
    {
        $query = Transaction::where('user_id', Auth::id());

        // Filter by Year
        if ($request->has('year') && $request->year != '') {
            $query->whereYear('created_at', $request->year);
        } else {
             $query->whereYear('created_at', date('Y'));
        }

        // Filter by Category
        if ($request->has('category') && $request->category != 'Kategori' && $request->category != '') {
            $query->where('category', $request->category);
        }

        // Filter by Type
        if ($request->has('type') && $request->type != 'Mutasi' && $request->type != '') {
            $type = '';
            if ($request->type === 'Kredit (CR)') $type = 'credit';
            if ($request->type === 'Debet (DB)') $type = 'debit';
            
            if ($type) {
                $query->where('type', $type);
            }
        }
        
        // Search
        if ($request->has('search') && $request->search != '') {
             $query->where('description', 'like', '%'.$request->search.'%');
        }

        $mutations = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'date' => $item->created_at->translatedFormat('d F Y H:i:s'),
                    'category' => ucfirst($item->category),
                    'description' => $item->description,
                    'amount' => $item->amount,
                    'type' => $item->type,
                    'initialBalance' => number_format($item->beginning_balance, 0, ',', '.'),
                    'finalBalance' => number_format($item->ending_balance, 0, ',', '.'),
                ];
            });

        // Calculate Totals for the selected year
        $year = $request->year ?: date('Y');
        $creditTotal = Transaction::where('user_id', Auth::id())
            ->whereYear('created_at', $year)
            ->where('type', 'credit')
            ->sum('amount');
            
        $debitTotal = Transaction::where('user_id', Auth::id())
            ->whereYear('created_at', $year)
            ->where('type', 'debit')
            ->sum('amount');

        return Inertia::render('balance/mutations', [
            'mutations' => $mutations,
            'creditTotal' => number_format($creditTotal, 0, ',', '.'),
            'debitTotal' => number_format($debitTotal, 0, ',', '.'),
            'filters' => $request->only(['year', 'category', 'type', 'search']),
            'currentYear' => $year,
        ]);
    }
}
