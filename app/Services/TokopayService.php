<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TokopayService
{
    protected string $merchantId;
    protected string $secretKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->merchantId = config('tokopay.merchant_id');
        $this->secretKey = config('tokopay.secret_key');
        $this->baseUrl = config('tokopay.base_url');
    }

    /**
     * Generate signature for API request.
     */
    protected function generateSignature(string $refId): string
    {
        return md5($this->merchantId . ':' . $this->secretKey . ':' . $refId);
    }

    /**
     * Create a simple order (deposit) using GET request.
     *
     * @param string $refId Unique reference ID
     * @param int $nominal Amount in IDR
     * @param string $channel Payment channel code (e.g., BRIVA, GOPAY)
     * @return array
     */
    public function createSimpleOrder(string $refId, int $nominal, string $channel): array
    {
        try {
            /** @var Response $response */
            $response = Http::timeout(60)->get($this->baseUrl . '/order', [
                'merchant' => $this->merchantId,
                'secret' => $this->secretKey,
                'ref_id' => $refId,
                'nominal' => $nominal,
                'metode' => $channel,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                Log::info('TokoPay Simple Order Created', [
                    'ref_id' => $refId,
                    'channel' => $channel,
                    'response' => $data,
                ]);

                return [
                    'success' => $data['status'] === 'Success',
                    'data' => $data['data'] ?? [],
                    'message' => $data['status'] ?? 'Unknown error',
                    'raw_response' => $data,
                ];
            }

            Log::error('TokoPay Simple Order Failed', [
                'ref_id' => $refId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [
                'success' => false,
                'data' => [],
                'message' => 'HTTP Error: ' . $response->status(),
            ];
        } catch (\Exception $e) {
            Log::error('TokoPay Exception', [
                'ref_id' => $refId,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'data' => [],
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Create a simple order (deposit).
     *
     * @param string $refId Unique reference ID
     * @param int $nominal Amount in IDR
     * @param string $channel Payment channel code (e.g., BRIVA, GOPAY)
     * @return array
     */
    public function createOrder(string $refId, int $nominal, string $channel): array
    {
        return $this->createSimpleOrder($refId, $nominal, $channel);
    }

    /**
     * Create order with items (for detailed transactions).
     *
     * @param string $refId Unique reference ID
     * @param int $nominal Amount in IDR
     * @param string $channel Payment channel code
     * @param array $items Array of items
     * @return array
     */
    public function createOrderWithItems(string $refId, int $nominal, string $channel, array $items = []): array
    {
        $signature = $this->generateSignature($refId);

        try {
            $payload = [
                'merchant_id' => $this->merchantId,
                'signature' => $signature,
                'ref_id' => $refId,
                'nominal' => $nominal,
                'kode_channel' => $channel,
            ];

            if (!empty($items)) {
                $payload['items'] = $items;
            }

            /** @var Response $response */
            $response = Http::timeout(30)->post($this->baseUrl . '/order', $payload);

            if ($response->successful()) {
                $data = $response->json();

                return [
                    'success' => $data['status'] === 'Success',
                    'data' => $data['data'] ?? [],
                    'message' => $data['status'] ?? 'Unknown error',
                ];
            }

            return [
                'success' => false,
                'data' => [],
                'message' => 'HTTP Error: ' . $response->status(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'data' => [],
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check order status.
     *
     * @param string $refId Reference ID
     * @return array
     */
    public function checkStatus(string $refId): array
    {
        $signature = $this->generateSignature($refId);

        try {
            /** @var Response $response */
            $response = Http::timeout(30)->post($this->baseUrl . '/order/status', [
                'merchant_id' => $this->merchantId,
                'signature' => $signature,
                'ref_id' => $refId,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                return [
                    'success' => true,
                    'data' => $data['data'] ?? [],
                    'status' => $data['data']['status'] ?? 'unknown',
                ];
            }

            return [
                'success' => false,
                'data' => [],
                'status' => 'error',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'data' => [],
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get merchant info/balance.
     *
     * @return array
     */
    public function getMerchantInfo(): array
    {
        $signature = md5($this->merchantId . ':' . $this->secretKey);

        try {
            /** @var Response $response */
            $response = Http::timeout(30)->post($this->baseUrl . '/merchant/info', [
                'merchant_id' => $this->merchantId,
                'signature' => $signature,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                return [
                    'success' => $data['status'] === 'Success',
                    'data' => $data['data'] ?? [],
                    'message' => $data['status'] ?? 'Unknown',
                ];
            }

            return [
                'success' => false,
                'data' => [],
                'message' => 'HTTP Error: ' . $response->status(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'data' => [],
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Verify callback signature.
     *
     * @param array $data Callback data
     * @return bool
     */
    public function verifyCallback(array $data): bool
    {
        if (!isset($data['signature']) || !isset($data['ref_id'])) {
            return false;
        }

        $expectedSignature = $this->generateSignature($data['ref_id']);
        return hash_equals($expectedSignature, $data['signature']);
    }
}
