<?php

namespace App\Http\Controllers;

use App\Models\PaymentChannel;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
    /**
     * Display deposit page with payment channels.
     */
    public function index()
    {
        $channels = PaymentChannel::where('is_active', true)
            ->orderBy('category')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'code' => $channel->code,
                    'name' => $channel->name,
                    'category' => $channel->category,
                    'category_label' => $channel->category_label,
                    'fee_flat' => $channel->fee_flat,
                    'fee_percent' => $channel->fee_percent,
                    'formatted_fee' => $channel->formatted_fee,
                    'min_amount' => $channel->min_amount,
                    'max_amount' => $channel->max_amount,
                ];
            });

        // Group by category
        $groupedChannels = $channels->groupBy('category');

        return Inertia::render('deposit', [
            'channels' => $channels,
            'groupedChannels' => $groupedChannels,
        ]);
    }
    /**
     * Create a new deposit.
     */
    public function store(\Illuminate\Http\Request $request, \App\Services\TokopayService $tokopayService)
    {
        $request->validate([
            'channel_id' => 'required|exists:payment_channels,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $channel = PaymentChannel::findOrFail($request->channel_id);
        $amount = $request->amount;

        // Validation min/max
        if ($amount < $channel->min_amount || $amount > $channel->max_amount) {
            return back()->withErrors(['amount' => 'Jumlah deposit tidak sesuai dengan batas minimal/maksimal.']);
        }

        // Calculate fees
        $fee = $channel->fee_flat + ($amount * $channel->fee_percent / 100);
        $totalBayar = $amount + $fee;
        
        // Buat ID unik
        $refId = 'DEP' . date('YmdHis') . rand(100, 999);

        try {
            // Create pending deposit
            $deposit = \App\Models\Deposit::create([
                'user_id' => Auth::id(),
                'payment_channel_id' => $channel->id,
                'ref_id' => $refId,
                'amount' => $amount,
                'fee' => $fee,
                'total_bayar' => $totalBayar,
                'total_diterima' => $amount, // Logika bonus bisa ditambahkan di sini
                'status' => 'pending',
            ]);

            // Request to TokoPay
            // We send the 'amount' (nominal saldo yang diinginkan), TokoPay adds fee automatically
            $response = $tokopayService->createSimpleOrder($refId, $amount, $channel->code);

            if ($response['success']) {
                $data = $response['data'];
                
                // Update deposit with response data
                $deposit->update([
                    'trx_id' => $data['trx_id'] ?? null,
                    'nomor_va' => $data['nomor_va'] ?? null,
                    'pay_url' => $data['pay_url'] ?? null,
                    'checkout_url' => $data['checkout_url'] ?? null,
                    'qr_link' => $data['qr_link'] ?? null,
                    'qr_string' => $data['qr_string'] ?? null,
                    
                    // Update exact figures from gateway response
                    'total_bayar' => $data['total_bayar'] ?? $totalBayar,
                    'total_diterima' => $data['total_diterima'] ?? $amount,
                    'fee' => ($data['total_bayar'] ?? $totalBayar) - ($data['total_diterima'] ?? $amount),
                    
                    'response_data' => $response['raw_response'] ?? [],
                ]);

                return redirect()->route('deposit.show', $deposit->ref_id)
                    ->with('success', 'Permintaan deposit berhasil dibuat. Silakan lakukan pembayaran.');
            } else {
                $deposit->update(['status' => 'failed']);
                return back()->withErrors(['error' => 'Gagal membuat deposit: ' . $response['message']]);
            }

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan sistem: ' . $e->getMessage()]);
        }
    }

    /**
     * Show deposit detail.
     */
    public function show($refId)
    {
        $deposit = \App\Models\Deposit::with('channel')
            ->where('ref_id', $refId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('deposit/show', [
            'deposit' => $deposit,
        ]);
    }

    /**
     * Check deposit status manually.
     */
    public function checkStatus($refId, \App\Services\TokopayService $tokopayService)
    {
        $deposit = \App\Models\Deposit::with('channel')
            ->where('ref_id', $refId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Use the same createSimpleOrder method as it acts as status check for existing refs
        $response = $tokopayService->createSimpleOrder($deposit->ref_id, $deposit->amount, $deposit->channel->code);

        if ($response['success']) {
            $data = $response['data'];
            
            // Map status TokoPay to status local
            $status = strtolower($data['status'] ?? 'pending');
            $localStatus = 'pending';
            
            if ($status === 'success') {
                $localStatus = 'paid';
            } elseif ($status === 'expired') {
                $localStatus = 'expired';
            } elseif ($status === 'failed') {
                $localStatus = 'failed';
            }

            $updateData = [
                'status' => $localStatus,
                'response_data' => $response['raw_response'] ?? [],
            ];
            
            if ($localStatus === 'paid' && !$deposit->paid_at) {
                $updateData['paid_at'] = now();
                
                // TODO: Add User Balance here
            }

            $deposit->update($updateData);

            return back()->with('success', 'Status status berhasil diperbarui: ' . $data['status']);
        }

        return back()->withErrors(['error' => 'Gagal mengecek status: ' . ($response['message'] ?? 'Unknown error')]);
    }
}
