<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProviderController extends Controller
{
    /**
     * Display a listing of providers.
     */
    public function index()
    {
        $providers = Provider::orderBy('created_at', 'desc')->get()->map(function ($provider) {
            return [
                'id' => $provider->id,
                'name' => $provider->name,
                'slug' => $provider->slug,
                'api_url' => $provider->api_url,
                'api_id' => $provider->api_id,
                'api_key_masked' => $provider->masked_api_key,
                'status' => $provider->status,
                'is_active' => $provider->is_active,
                'balance' => $provider->balance,
                'default_margin' => $provider->default_margin,
                'margin_type' => $provider->margin_type,
                'services_count' => $provider->services_count,
                'response_time' => $provider->response_time_formatted,
                'last_check' => $provider->last_check_formatted,
                'last_sync' => $provider->last_sync ? $provider->last_sync->diffForHumans() : 'Belum pernah',
                'created_at' => $provider->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('admin/providers', [
            'providers' => $providers,
        ]);
    }

    /**
     * Store a newly created provider.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'api_url' => 'required|url|max:255',
            'api_id' => 'nullable|string|max:255',
            'api_key' => 'required|string|max:255',
            'default_margin' => 'nullable|numeric|min:0',
            'margin_type' => 'nullable|in:fixed,percentage',
        ]);

        $provider = Provider::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'api_url' => rtrim($request->api_url, '/'),
            'api_id' => $request->api_id,
            'api_key' => $request->api_key,
            'default_margin' => $request->default_margin ?? 0,
            'margin_type' => $request->margin_type ?? 'fixed',
            'status' => 'offline',
            'is_active' => true,
        ]);

        return back()->with('success', 'Provider ' . $provider->name . ' berhasil ditambahkan');
    }

    /**
     * Update the specified provider.
     */
    public function update(Request $request, Provider $provider)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'api_url' => 'required|url|max:255',
            'api_id' => 'nullable|string|max:255',
            'api_key' => 'nullable|string|max:255',
            'default_margin' => 'nullable|numeric|min:0',
            'margin_type' => 'nullable|in:fixed,percentage',
        ]);

        $data = [
            'name' => $request->name,
            'api_url' => rtrim($request->api_url, '/'),
            'api_id' => $request->api_id,
            'default_margin' => $request->default_margin ?? $provider->default_margin,
            'margin_type' => $request->margin_type ?? $provider->margin_type,
        ];

        // Only update API key if provided
        if ($request->filled('api_key')) {
            $data['api_key'] = $request->api_key;
        }

        $provider->update($data);

        return back()->with('success', 'Provider ' . $provider->name . ' berhasil diperbarui');
    }

    /**
     * Remove the specified provider.
     */
    public function destroy(Provider $provider)
    {
        $name = $provider->name;
        $provider->delete();

        return back()->with('success', 'Provider ' . $name . ' berhasil dihapus');
    }

    /**
     * Toggle provider active status.
     */
    public function toggle(Provider $provider)
    {
        $provider->is_active = !$provider->is_active;
        $provider->save();

        $status = $provider->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', 'Provider ' . $provider->name . ' berhasil ' . $status);
    }

    /**
     * Test connection to provider API using profile/balance endpoint.
     */
    public function testConnection(Provider $provider)
    {
        $startTime = microtime(true);

        try {
            // Make request to profile/balance endpoint
            /** @var Response $response */
            $response = Http::timeout(30)->post($provider->api_url . '/profile', [
                'api_id' => $provider->api_id,
                'api_key' => $provider->api_key,
            ]);

            $endTime = microtime(true);
            $responseTime = (int)(($endTime - $startTime) * 1000);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['status']) && $data['status'] === true) {
                    $balance = $data['data']['balance'] ?? 0;
                    $username = $data['data']['username'] ?? '-';
                    $fullName = $data['data']['full_name'] ?? '-';

                    // Success - update provider status and balance
                    $provider->update([
                        'status' => $responseTime < 2000 ? 'online' : 'warning',
                        'response_time' => $responseTime,
                        'balance' => $balance,
                        'last_check' => now(),
                    ]);

                    $balanceFormatted = 'Rp ' . number_format($balance, 0, ',', '.');

                    return back()->with('success', "Koneksi berhasil! Username: {$username} | Saldo: {$balanceFormatted} | Response: {$responseTime}ms");
                } else {
                    // API returned error
                    $provider->update([
                        'status' => 'offline',
                        'response_time' => $responseTime,
                        'last_check' => now(),
                    ]);

                    $msg = $data['msg'] ?? 'API mengembalikan error';
                    return back()->withErrors(['connection' => $msg]);
                }
            } else {
                $provider->update([
                    'status' => 'offline',
                    'last_check' => now(),
                ]);

                return back()->withErrors(['connection' => 'HTTP Error: ' . $response->status()]);
            }
        } catch (\Exception $e) {
            $provider->update([
                'status' => 'offline',
                'last_check' => now(),
            ]);

            return back()->withErrors(['connection' => 'Connection failed: ' . $e->getMessage()]);
        }
    }

    /**
     * Sync services from provider API with margin.
     */
    public function syncServices(Request $request, Provider $provider)
    {
        $request->validate([
            'margin' => 'nullable|numeric|min:0',
            'margin_type' => 'nullable|in:fixed,percentage',
        ]);

        $margin = $request->margin ?? $provider->default_margin;
        $marginType = $request->margin_type ?? $provider->margin_type;

        try {
            /** @var Response $response */
            $response = Http::timeout(60)->post($provider->api_url . '/services', [
                'api_id' => $provider->api_id,
                'api_key' => $provider->api_key,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['status']) && $data['status'] === true && isset($data['data'])) {
                    $services = $data['data'];
                    $count = count($services);
                    $synced = 0;

                    foreach ($services as $serviceData) {
                        $originalPrice = (float) ($serviceData['price'] ?? 0);
                        
                        // Calculate price with margin
                        $finalPrice = $provider->calculatePriceWithMargin($originalPrice, $margin, $marginType);

                        Service::updateOrCreate(
                            [
                                'provider_id' => $provider->id, 
                                'provider_service_id' => $serviceData['id']
                            ],
                            [
                                'name' => $serviceData['name'] ?? 'Unknown Service',
                                'category' => $serviceData['category'] ?? 'Uncategorized',
                                'type' => $serviceData['type'] ?? 'default',
                                'original_price' => $originalPrice,
                                'price' => $finalPrice,
                                'min' => $serviceData['min'] ?? 1,
                                'max' => $serviceData['max'] ?? 10000,
                                'refill' => ($serviceData['refill'] ?? 0) == 1,
                                'description' => $serviceData['description'] ?? null,
                                'average_time' => $serviceData['average_time'] ?? null,
                                'is_active' => true,
                            ]
                        );
                        $synced++;
                    }

                    // Update provider with services count and margin
                    $provider->update([
                        'services_count' => $synced,
                        'default_margin' => $margin,
                        'margin_type' => $marginType,
                        'last_sync' => now(),
                        'status' => 'online',
                    ]);

                    $marginInfo = $marginType === 'percentage' 
                        ? $margin . '%' 
                        : 'Rp ' . number_format($margin, 0, ',', '.');

                    return back()->with('success', 'Berhasil sync ' . $synced . ' layanan dengan margin ' . $marginInfo);
                } else {
                    $msg = $data['msg'] ?? 'Gagal mengambil data layanan';
                    return back()->withErrors(['sync' => $msg]);
                }
            } else {
                return back()->withErrors(['sync' => 'HTTP Error: ' . $response->status()]);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['sync' => 'Sync failed: ' . $e->getMessage()]);
        }
    }

    /**
     * Check balance from provider API.
     */
    public function checkBalance(Provider $provider)
    {
        try {
            /** @var Response $response */
            $response = Http::timeout(30)->post($provider->api_url . '/balance', [
                'api_id' => $provider->api_id,
                'api_key' => $provider->api_key,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['status']) && $data['status'] === true && isset($data['data']['balance'])) {
                    $balance = $data['data']['balance'];

                    $provider->update([
                        'balance' => $balance,
                        'last_check' => now(),
                    ]);

                    return back()->with('success', 'Saldo provider: Rp ' . number_format($balance, 0, ',', '.'));
                } else {
                    $msg = $data['msg'] ?? 'Gagal mengambil saldo';
                    return back()->withErrors(['balance' => $msg]);
                }
            } else {
                return back()->withErrors(['balance' => 'HTTP Error: ' . $response->status()]);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['balance' => 'Check balance failed: ' . $e->getMessage()]);
        }
    }
}
