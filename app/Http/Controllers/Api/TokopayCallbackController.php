<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Services\TokopayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TokopayCallbackController extends Controller
{
    public function handle(Request $request, TokopayService $tokopayService)
    {
        // 1. Log incoming callback
        Log::info('Tokopay Callback Received', $request->all());

        // 2. Allowed IP Validation (Optional but recommended)
        $allowedIps = ['178.128.104.179'];
        $clientIp = $request->ip();
        
        // Note: In local dev/ngrok, IP might differ. skipping strict check for dev unless prod.
        // if (!in_array($clientIp, $allowedIps) && app()->isProduction()) {
        //     Log::warning("Callback from unauthorized IP: $clientIp");
        //     return response()->json(['status' => false, 'message' => 'Unauthorized IP'], 403);
        // }

        $data = $request->all();
        $refId = $data['reff_id'] ?? null;
        $signature = $data['signature'] ?? null;
        $status = $data['status'] ?? null;

        if (!$refId || !$signature) {
            return response()->json(['status' => false, 'message' => 'Invalid Payload'], 400);
        }

        // 3. Verify Signature
        // Formula: md5(merchant_id:secret:ref_id)
        // TokopayService has generateSignature($refId) matching this.
        // Let's manually verify here to be sure or use service helper.
        $generatedSignature = md5(config('tokopay.merchant_id') . ':' . config('tokopay.secret_key') . ':' . $refId);

        if ($signature !== $generatedSignature) {
            Log::error("Invalid Signature for REF: $refId. Received: $signature, Expected: $generatedSignature");
            return response()->json(['status' => false, 'message' => 'Invalid Signature'], 400);
        }

        // 4. Find Deposit
        $deposit = Deposit::where('ref_id', $refId)->first();

        if (!$deposit) {
            Log::error("Deposit not found REF: $refId");
            return response()->json(['status' => false, 'message' => 'Deposit not found'], 404);
        }

        // 5. Process Status
        // Status from image: "Success" or "Completed"
        if (in_array($status, ['Success', 'Completed'])) {
            if ($deposit->status !== 'paid') {
                $deposit->update([
                    'status' => 'paid',
                    'paid_at' => now(),
                    'response_data' => array_merge($deposit->response_data ?? [], ['callback' => $data]),
                ]);

                // 6. Add Balance to User
                $user = $deposit->user;
                $previousBalance = $user->balance;
                $user->balance += $deposit->total_diterima; // Add 'total_diterima' (amount without fee)
                $user->save();

                Log::info("Deposit $refId PAID. User {$user->id} balance updated: $previousBalance -> {$user->balance}");
            }
        } elseif ($status === 'Expired' || $status === 'Failed') {
            if ($deposit->status !== 'paid') {
                $deposit->update([
                    'status' => strtolower($status),
                    'response_data' => array_merge($deposit->response_data ?? [], ['callback' => $data]),
                ]);
            }
        }

        // 7. Return expected JSON response
        return response()->json(['status' => true]);
    }
}
