<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index(Request $request)
    {
        $query = Service::with('provider');

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filter by provider
        if ($request->filled('provider')) {
            $query->where('provider_id', $request->provider);
        }

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'aktif') {
                $query->where('is_active', true);
            } elseif ($request->status === 'nonaktif') {
                $query->where('is_active', false);
            }
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%")
                  ->orWhere('provider_service_id', 'like', "%{$search}%");
            });
        }

        // Order by
        $query->orderBy('category')->orderBy('name');

        // Paginate
        $services = $query->paginate(15)->withQueryString();

        // Transform data
        $services->getCollection()->transform(function ($service) {
            return [
                'id' => $service->id,
                'provider_service_id' => $service->provider_service_id,
                'name' => $service->name,
                'category' => $service->category,
                'type' => $service->type,
                'original_price' => $service->original_price,
                'price' => $service->price,
                'min' => $service->min,
                'max' => $service->max,
                'refill' => $service->refill,
                'description' => $service->description,
                'is_active' => $service->is_active,
                'provider_name' => $service->provider->name ?? '-',
                'provider_id' => $service->provider_id,
            ];
        });

        // Get categories for filter
        $categories = Service::select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        // Get providers for filter
        $providers = Provider::select('id', 'name')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        // Get stats
        $totalServices = Service::count();
        $activeServices = Service::where('is_active', true)->count();

        return Inertia::render('admin/services', [
            'services' => $services,
            'categories' => $categories,
            'providers' => $providers,
            'filters' => [
                'category' => $request->category ?? '',
                'provider' => $request->provider ?? '',
                'status' => $request->status ?? '',
                'search' => $request->search ?? '',
            ],
            'stats' => [
                'total' => $totalServices,
                'active' => $activeServices,
            ],
        ]);
    }

    /**
     * Toggle service active status.
     */
    public function toggle(Service $service)
    {
        $service->is_active = !$service->is_active;
        $service->save();

        $status = $service->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', 'Layanan berhasil ' . $status);
    }

    /**
     * Update service price.
     */
    public function updatePrice(Request $request, Service $service)
    {
        $request->validate([
            'price' => 'required|numeric|min:0',
        ]);

        $service->price = $request->price;
        $service->save();

        return back()->with('success', 'Harga layanan berhasil diperbarui');
    }

    /**
     * Remove the specified service.
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Layanan berhasil dihapus');
    }

    /**
     * Bulk toggle services.
     */
    public function bulkToggle(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:services,id',
            'is_active' => 'required|boolean',
        ]);

        Service::whereIn('id', $request->ids)
            ->update(['is_active' => $request->is_active]);

        $status = $request->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', count($request->ids) . ' layanan berhasil ' . $status);
    }
}
