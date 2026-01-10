<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentChannel;
use App\Services\TokopayService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentGatewayController extends Controller
{
    /**
     * Display payment gateway settings page.
     */
    public function index()
    {
        $channels = PaymentChannel::orderBy('category')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'code' => $channel->code,
                    'name' => $channel->name,
                    'category' => $channel->category,
                    'category_label' => $channel->category_label,
                    'provider' => $channel->provider,
                    'fee_flat' => $channel->fee_flat,
                    'fee_percent' => $channel->fee_percent,
                    'formatted_fee' => $channel->formatted_fee,
                    'min_amount' => $channel->min_amount,
                    'max_amount' => $channel->max_amount,
                    'is_active' => $channel->is_active,
                ];
            });

        // Group by category
        $groupedChannels = $channels->groupBy('category');

        // Get merchant info
        $merchantInfo = null;
        if (config('tokopay.merchant_id') && config('tokopay.secret_key')) {
            $tokopay = new TokopayService();
            $result = $tokopay->getMerchantInfo();
            if ($result['success']) {
                $merchantInfo = $result['data'];
            }
        }

        // Stats
        $stats = [
            'total' => PaymentChannel::count(),
            'active' => PaymentChannel::where('is_active', true)->count(),
            'inactive' => PaymentChannel::where('is_active', false)->count(),
        ];

        return Inertia::render('admin/payment-gateway', [
            'channels' => $channels,
            'groupedChannels' => $groupedChannels,
            'merchantInfo' => $merchantInfo,
            'stats' => $stats,
            'hasCredentials' => !empty(config('tokopay.merchant_id')) && !empty(config('tokopay.secret_key')),
        ]);
    }

    /**
     * Toggle channel active status.
     */
    public function toggle(PaymentChannel $channel)
    {
        $channel->update([
            'is_active' => !$channel->is_active,
        ]);

        $status = $channel->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', "Channel {$channel->name} berhasil {$status}.");
    }

    /**
     * Update channel fees.
     */
    public function updateFee(Request $request, PaymentChannel $channel)
    {
        $request->validate([
            'fee_flat' => 'required|numeric|min:0',
            'fee_percent' => 'required|numeric|min:0|max:100',
            'min_amount' => 'required|integer|min:1000',
            'max_amount' => 'required|integer|gt:min_amount',
        ]);

        $channel->update([
            'fee_flat' => $request->fee_flat,
            'fee_percent' => $request->fee_percent,
            'min_amount' => $request->min_amount,
            'max_amount' => $request->max_amount,
        ]);

        return back()->with('success', "Fee channel {$channel->name} berhasil diperbarui.");
    }

    /**
     * Bulk toggle channels.
     */
    public function bulkToggle(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:payment_channels,id',
            'active' => 'required|boolean',
        ]);

        PaymentChannel::whereIn('id', $request->ids)->update([
            'is_active' => $request->active,
        ]);

        $status = $request->active ? 'diaktifkan' : 'dinonaktifkan';
        $count = count($request->ids);
        return back()->with('success', "{$count} channel berhasil {$status}.");
    }

    /**
     * Test connection to TokoPay.
     */
    public function testConnection()
    {
        if (!config('tokopay.merchant_id') || !config('tokopay.secret_key')) {
            return back()->withErrors(['connection' => 'Kredensial TokoPay belum dikonfigurasi.']);
        }

        $tokopay = new TokopayService();
        $result = $tokopay->getMerchantInfo();

        if ($result['success']) {
            $balance = $result['data']['saldo'] ?? 0;
            return back()->with('success', 
                "Koneksi berhasil! Saldo: Rp " . number_format($balance, 0, ',', '.')
            );
        }

        return back()->withErrors(['connection' => $result['message'] ?? 'Gagal terhubung ke TokoPay.']);
    }

    /**
     * Sync channels from TokoPay (seed if empty).
     */
    public function syncChannels()
    {
        // Run seeder
        $seeder = new \Database\Seeders\PaymentChannelSeeder();
        $seeder->run();

        return back()->with('success', 'Channel pembayaran berhasil disinkronkan.');
    }
}
