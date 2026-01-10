<?php

namespace App\Http\Controllers;

use App\Models\ServiceUpdate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceUpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ServiceUpdate::with('service');

        // Filter by Type
        if ($request->has('type') && $request->type != 'SEMUA JENIS' && $request->type != '') {
            $query->where('type', $request->type);
        }

        // Search by Service Name or ID
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('service_name', 'like', '%' . $request->search . '%')
                  ->orWhere('provider_service_id', 'like', '%' . $request->search . '%')
                  ->orWhereHas('service', function($q2) use ($request) {
                      $q2->where('name', 'like', '%' . $request->search . '%')
                         ->orWhere('id', 'like', '%' . $request->search . '%');
                  });
            });
        }

        // Filter by Date (simple exact match for now, or range later)
        if ($request->has('date') && $request->date != '') {
            $query->whereDate('created_at', $request->date);
        }

        $updates = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('service-updates', [
            'updates' => $updates,
            'filters' => $request->only(['search', 'type', 'date']),
        ]);
    }
}
