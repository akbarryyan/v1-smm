<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show order creation page with services from database.
     */
    public function create()
    {
        // Get all active services grouped by category
        $services = Service::where('is_active', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'provider_service_id' => $service->provider_service_id,
                    'name' => $service->name,
                    'category' => $service->category,
                    'type' => $service->type,
                    'price' => $service->price,
                    'min' => $service->min,
                    'max' => $service->max,
                    'refill' => $service->refill,
                    'description' => $service->description,
                ];
            });

        // Get unique categories
        $categories = Service::where('is_active', true)
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('orders/create', [
            'services' => $services,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'link' => 'required|string|max:500',
            'quantity' => 'required|integer|min:1',
            'comments' => 'nullable|string',
            'usernames' => 'nullable|string',
            'hashtag' => 'nullable|string|max:100',
            'username' => 'nullable|string|max:100',
            'answer_number' => 'nullable|integer|min:1',
        ]);

        $service = Service::with('provider')->findOrFail($request->service_id);

        // Validate quantity against min/max
        if ($request->quantity < $service->min || $request->quantity > $service->max) {
            return back()->withErrors([
                'quantity' => "Jumlah harus antara {$service->min} - {$service->max}",
            ]);
        }

        // Calculate total cost (price is per 1000)
        $totalCost = ($request->quantity / 1000) * $service->price;

        // Check user balance
        /** @var User $user */
        $user = $request->user();
        if ($user->balance < $totalCost) {
            return back()->withErrors([
                'balance' => 'Saldo tidak mencukupi. Silakan top up terlebih dahulu.',
            ]);
        }

        // Check if provider exists and is active
        if (!$service->provider || !$service->provider->is_active) {
            return back()->withErrors([
                'service_id' => 'Provider untuk layanan ini sedang tidak tersedia.',
            ]);
        }

        $provider = $service->provider;

        // Start transaction
        DB::beginTransaction();

        try {
            // Deduct user balance
            $previousBalance = $user->balance;
            $user->balance -= $totalCost;
            $user->save();

            // Create order record
            $order = Order::create([
                'user_id' => $user->id,
                'service_id' => $service->id,
                'provider_id' => $provider->id,
                'target' => $request->link,
                'quantity' => $request->quantity,
                'price_per_k' => $service->price,
                'total_cost' => $totalCost,
                'comments' => $request->comments,
                'usernames' => $request->usernames,
                'hashtag' => $request->hashtag,
                'username' => $request->username,
                'answer_number' => $request->answer_number,
                'status' => 'pending',
            ]);

            // Create Transaction Log (Debit)
            Transaction::create([
                'user_id' => $user->id,
                'type' => 'debit',
                'category' => 'pesanan',
                'amount' => $totalCost,
                'beginning_balance' => $previousBalance,
                'ending_balance' => $user->balance,
                'description' => "Melakukan pemesanan #{$order->id} - {$service->name}",
                'reference_type' => Order::class,
                'reference_id' => $order->id,
            ]);

            // Prepare API request body
            $apiBody = [
                'api_id' => $provider->api_id,
                'api_key' => $provider->api_key,
                'service' => $service->provider_service_id,
                'target' => $request->link,
            ];

            // Add quantity for default type (not for package or comment_replies type)
            if (!in_array($service->type, ['package', 'comment_replies'])) {
                $apiBody['quantity'] = $request->quantity;
            }

            // Add comments if provided (for Custom Comments, Comment Replies type)
            if ($request->filled('comments')) {
                $apiBody['comments'] = $request->comments;
            }

            // Add usernames if provided (for Mentions Custom List type)
            if ($request->filled('usernames')) {
                $apiBody['usernames'] = $request->usernames;
            }

            // Add hashtag if provided (for Mentions Hashtag type)
            if ($request->filled('hashtag')) {
                $apiBody['hashtag'] = $request->hashtag;
            }

            // Add username if provided (for Mentions User Followers, Comment Replies, Comment Likes type)
            if ($request->filled('username')) {
                $apiBody['username'] = $request->username;
            }

            // Add answer_number if provided (for Poll type)
            if ($request->filled('answer_number')) {
                $apiBody['answer_number'] = $request->answer_number;
            }

            // Send order to provider API
            /** @var Response $response */
            $response = Http::timeout(60)->post($provider->api_url . '/order', $apiBody);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['status']) && $data['status'] === true) {
                    // Success - update order with provider order ID
                    $providerOrderId = $data['data']['id'] ?? null;

                    $order->update([
                        'provider_order_id' => $providerOrderId,
                        'status' => 'processing',
                        'provider_response' => json_encode($data),
                        'sent_at' => now(),
                    ]);

                    DB::commit();

                    return redirect()->route('orders.index')->with('success', 
                        "Pesanan #{$order->id} berhasil dibuat! ID Provider: #{$providerOrderId}"
                    );
                } else {
                    // Provider returned error - refund user
                    $previousBalanceRefund = $user->balance;
                    $user->balance += $totalCost;
                    $user->save();

                    // Create Transaction Log (Credit/Refund)
                    Transaction::create([
                        'user_id' => $user->id,
                        'type' => 'credit',
                        'category' => 'refund',
                        'amount' => $totalCost,
                        'beginning_balance' => $previousBalanceRefund,
                        'ending_balance' => $user->balance,
                        'description' => "Refund pesanan #{$order->id} - Provider Error",
                        'reference_type' => Order::class,
                        'reference_id' => $order->id,
                    ]);

                    $order->update([
                        'status' => 'error',
                        'provider_response' => json_encode($data),
                    ]);

                    DB::commit();

                    $errorMsg = $data['msg'] ?? 'Gagal membuat pesanan di provider';
                    return back()->withErrors(['provider' => $errorMsg]);
                }
            } else {
                // HTTP error - refund user
                $previousBalanceRefund = $user->balance;
                $user->balance += $totalCost;
                $user->save();

                // Create Transaction Log (Credit/Refund)
                Transaction::create([
                    'user_id' => $user->id,
                    'type' => 'credit',
                    'category' => 'refund',
                    'amount' => $totalCost,
                    'beginning_balance' => $previousBalanceRefund,
                    'ending_balance' => $user->balance,
                    'description' => "Refund pesanan #{$order->id} - HTTP Error",
                    'reference_type' => Order::class,
                    'reference_id' => $order->id,
                ]);

                $order->update([
                    'status' => 'error',
                    'provider_response' => 'HTTP Error: ' . $response->status(),
                ]);

                DB::commit();

                return back()->withErrors([
                    'provider' => 'Gagal menghubungi provider. Silakan coba lagi.',
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'provider' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Display user's orders.
     */
    public function index(Request $request)
    {
        $query = Order::with(['service', 'provider'])
            ->where('user_id', $request->user()->id);

        // Filter by Search (ID, Target)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('target', 'like', "%{$search}%");
            });
        }

        // Filter by Year
        if ($request->filled('year')) {
            $query->whereYear('created_at', $request->year);
        }

        // Filter by Status
        if ($request->filled('status') && $request->status !== 'Status') {
             $query->where('status', strtolower($request->status));
        }

        // Filter by Service/Category (Optional, UI has it)
        if ($request->filled('category') && $request->category !== 'Filter Layanan') {
             // Assuming filtering by category in Service
             $query->whereHas('service', function ($q) use ($request) {
                 $q->where('category', $request->category);
             });
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $orders->getCollection()->transform(function ($order) {
            return [
                'id' => $order->id,
                'provider_order_id' => $order->provider_order_id,
                'service_name' => $order->service->name ?? '-',
                'category' => $order->service->category ?? '-',
                'target' => $order->target,
                'quantity' => $order->quantity,
                'total_cost' => $order->total_cost,
                'formatted_cost' => $order->formatted_total_cost,
                'status' => $order->status,
                'status_label' => $order->status_label,
                'status_color' => $order->status_color,
                'start_count' => $order->start_count,
                'remains' => $order->remains,
                'created_at' => $order->created_at->format('d M Y, H:i'),
            ];
        });

        // Calculate total spent
        $totalSpent = Order::where('user_id', $request->user()->id)
            ->whereNotIn('status', ['error', 'canceled', 'failure'])
            ->sum('total_cost');

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'totalSpent' => 'Rp ' . number_format($totalSpent, 0, ',', '.'),
            'filters' => $request->only(['search', 'year', 'status', 'category']),
        ]);
    }
}
