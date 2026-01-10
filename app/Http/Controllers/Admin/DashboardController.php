<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Service;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Calculate stats with comparison to last 30 days
        $now = Carbon::now();
        $thirtyDaysAgo = $now->copy()->subDays(30);
        $sixtyDaysAgo = $now->copy()->subDays(60);

        // Total Users (only role 'user', exclude admins)
        $totalUsers = User::where('role', 'user')->count();
        $usersLast30 = User::where('role', 'user')->where('created_at', '>=', $thirtyDaysAgo)->count();
        $usersPrev30 = User::where('role', 'user')->whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
        $usersChange = $usersPrev30 > 0 ? (($usersLast30 - $usersPrev30) / $usersPrev30) * 100 : 0;

        // Total Orders
        $totalOrders = Order::count();
        $ordersLast30 = Order::where('created_at', '>=', $thirtyDaysAgo)->count();
        $ordersPrev30 = Order::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
        $ordersChange = $ordersPrev30 > 0 ? (($ordersLast30 - $ordersPrev30) / $ordersPrev30) * 100 : 0;

        // Total Revenue (from deposits/topups)
        $totalRevenue = Transaction::where('category', 'deposit')
            ->where('type', 'credit')
            ->sum('amount');
        $revenueLast30 = Transaction::where('category', 'deposit')
            ->where('type', 'credit')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->sum('amount');
        $revenuePrev30 = Transaction::where('category', 'deposit')
            ->where('type', 'credit')
            ->whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])
            ->sum('amount');
        $revenueChange = $revenuePrev30 > 0 ? (($revenueLast30 - $revenuePrev30) / $revenuePrev30) * 100 : 0;

        // Active Services
        $activeServices = Service::where('is_active', true)->count();
        $totalServices = Service::count();
        $servicesChange = $totalServices > 0 ? (($activeServices / $totalServices) * 100) - 100 : 0;

        $stats = [
            'totalUsers' => $totalUsers,
            'usersChange' => round($usersChange, 1),
            'totalOrders' => $totalOrders,
            'ordersChange' => round($ordersChange, 1),
            'totalRevenue' => $totalRevenue,
            'revenueChange' => round($revenueChange, 1),
            'activeServices' => $activeServices,
            'servicesChange' => round($servicesChange, 1),
        ];

        // Recent Orders
        $recentOrders = Order::with(['user', 'service', 'provider'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'service' => $order->service?->name ?? 'N/A',
                    'user' => $order->user?->email ?? 'N/A',
                    'quantity' => $order->quantity,
                    'status' => $order->status,
                    'status_label' => $order->status_label,
                    'provider' => $order->provider?->name ?? 'N/A',
                    'date' => $order->created_at->translatedFormat('d M Y'),
                ];
            });

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}
