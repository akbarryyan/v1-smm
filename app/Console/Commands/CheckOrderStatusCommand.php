<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\Provider;
use App\Models\Transaction;
use App\Services\ProviderService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckOrderStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:check-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check and update status of pending/processing orders from providers';

    /**
     * Execute the console command.
     */
    public function handle(ProviderService $providerService)
    {
        $this->info('Starting order status check...');

        // Get orders that need checking
        $orders = Order::whereIn('status', ['pending', 'processing'])
            ->whereNotNull('provider_id')
            ->whereNotNull('provider_order_id')
            ->get();

        if ($orders->isEmpty()) {
            $this->info('No orders to check.');
            return;
        }

        // Group by provider
        $ordersByProvider = $orders->groupBy('provider_id');

        foreach ($ordersByProvider as $providerId => $providerOrders) {
            $provider = Provider::find($providerId);
            if (!$provider) {
                continue;
            }

            $this->info("Checking provider: {$provider->name}");

            // Chunk to batches of 50
            $chunks = $providerOrders->chunk(50);

            foreach ($chunks as $chunk) {
                $providerOrderIds = $chunk->pluck('provider_order_id')->toArray();
                
                // Call API
                $results = $providerService->checkStatus($provider, $providerOrderIds);

                // Process Results
                foreach ($chunk as $order) {
                    $poid = $order->provider_order_id;
                    
                    // Results might have string or int keys. Cast just in case.
                    $data = $results[$poid] ?? $results[(string)$poid] ?? null;

                    if ($data && isset($data['status'])) {
                        $newStatus = strtolower($data['status']);
                        
                        // Map provider status to local status
                        // API: Pending, Processing, Success, Error, Partial
                        
                        if ($newStatus !== $order->status) {
                            $this->info("Order #{$order->id} status changed: {$order->status} -> {$newStatus}");
                            
                            DB::transaction(function() use ($order, $newStatus, $data) {
                                // Update count stats
                                if (isset($data['start_count'])) $order->start_count = $data['start_count'];
                                if (isset($data['remains'])) $order->remains = $data['remains'];

                                if ($newStatus === 'success') {
                                    $order->status = 'success';
                                } elseif ($newStatus === 'error' || $newStatus === 'canceled' || $newStatus === 'failure') {
                                    $order->status = 'error';
                                    // Refund FULL
                                    $this->refundOrder($order, $order->total_cost);
                                } elseif ($newStatus === 'partial') {
                                    $order->status = 'partial';
                                    // Refund Partial
                                    $remains = $data['remains'] ?? 0;
                                    if ($order->quantity > 0) {
                                        // Refund Amount = usage * rate? No, Refund = Remaining * Rate.
                                        // Formula: Refund = (Remains / Quantity) * Total Cost
                                        $refundAmount = $remains * ($order->total_cost / $order->quantity);
                                        $this->refundOrder($order, $refundAmount);
                                    }
                                } else {
                                    $order->status = $newStatus; // pending, processing
                                }
                                
                                $order->save();
                            });
                        }
                    } else {
                         if (isset($data['msg']) && stripos($data['msg'], 'tidak ditemukan') !== false) {
                              $this->warn("Order #{$order->id} (PID: $poid) not found at provider.");
                         }
                    }
                }
            }
        }

        $this->info('Order status check completed.');
    }

    private function refundOrder($order, $amount)
    {
        if ($amount <= 0) return;

        $user = $order->user;
        $previousBalance = $user->balance;
        $user->balance += $amount;
        $user->save();

        Transaction::create([
            'user_id' => $user->id,
            'type' => 'credit',
            'category' => 'refund',
            'amount' => $amount,
            'beginning_balance' => $previousBalance,
            'ending_balance' => $user->balance,
            'description' => "Refund Order #{$order->id} ({$order->status})",
            'reference_type' => Order::class,
            'reference_id' => $order->id,
        ]);
        
        Log::info("Refunded Order #{$order->id}: $amount");
    }
}
