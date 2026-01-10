<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::where('is_active', true);

        // Filter by Category
        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('id', 'like', '%' . $request->search . '%');
            });
        }

        $services = $query->orderBy('category')
            ->orderBy('price')
            ->paginate(10)
            ->withQueryString();

        $categories = Service::where('is_active', true)
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('services', [
            'services' => $services,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
