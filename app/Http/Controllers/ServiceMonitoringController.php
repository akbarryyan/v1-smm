<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ServiceMonitoringController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with('service')
            ->where('status', 'completed')
            ->whereNotNull('completed_at');

        // Filter by Category
        if ($request->has('category') && $request->category != 'SEMUA KATEGORI' && $request->category != '') {
            $query->whereHas('service', function($q) use ($request) {
                $q->where('category', $request->category);
            });
        }

        // Filter by Service (Name)
        if ($request->has('service') && $request->service != 'SEMUA LAYANAN' && $request->service != '') {
             $query->whereHas('service', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->service . '%');
            });
        }

        $orders = $query->orderBy('completed_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($order) {
                $start = $order->sent_at ? Carbon::parse($order->sent_at) : Carbon::parse($order->created_at);
                $end = Carbon::parse($order->completed_at);
                
                // Calculate duration in human readable format
                $diff = $start->diff($end);
                $processTime = '';
                if ($diff->days > 0) $processTime .= $diff->days . ' hari ';
                if ($diff->h > 0) $processTime .= $diff->h . ' jam ';
                if ($diff->i > 0) $processTime .= $diff->i . ' menit ';
                if ($diff->s > 0 || empty($processTime)) $processTime .= $diff->s . ' detik';

                return [
                    'id' => $order->id,
                    'serviceId' => $order->service->provider_service_id ?? $order->service->id, // Use provider ID if available
                    'name' => $order->service->name,
                    'orderCount' => number_format($order->quantity),
                    'startDate' => $start->translatedFormat('d F Y'),
                    'startTime' => $start->format('H:i:s'),
                    'endDate' => $end->translatedFormat('d F Y'),
                    'endTime' => $end->format('H:i:s'),
                    'processTime' => trim($processTime),
                ];
            });

        // Get unique categories for filter
        $categories = Service::whereHas('orders', function($q) {
                $q->where('status', 'completed');
            })
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values();

        // Get unique services for filter (maybe limit to those with completed orders)
        $services = Service::whereHas('orders', function($q) {
                $q->where('status', 'completed');
            })
            ->select('name')
            ->distinct()
            ->orderBy('name')
            ->pluck('name');

        return Inertia::render('service-monitoring', [
            'monitoringData' => $orders,
            'categories' => $categories,
            'serviceNames' => $services, 
            'filters' => $request->only(['category', 'service']),
        ]);
    }
}
