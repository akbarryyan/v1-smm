<?php

namespace App\Services;

use App\Models\Provider;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\Response;

class ProviderService
{
    /**
     * Check status of orders
     *
     * @param Provider $provider
     * @param array $providerOrderIds Array of provider order IDs
     * @return array
     */
    public function checkStatus(Provider $provider, array $providerOrderIds)
    {
        if (empty($providerOrderIds)) {
            return [];
        }

        try {
            // Join IDs with comma
            $ids = implode(',', $providerOrderIds);

            // Determine endpoint. If api_url ends with /, remove it.
            $url = rtrim($provider->api_url, '/') . '/status';

            /** @var Response $response */
            $response = Http::asForm()->post($url, [
                'api_id' => $provider->api_id,
                'api_key' => $provider->api_key,
                'id' => $ids,
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                // Logic based on Image 3: "Respon Sukses (Massal)" and "Respon Sukses (Single)"
                if (isset($result['status']) && $result['status'] === true) {
                     if (isset($result['orders'])) {
                         return $result['orders']; // Map: "1107" => { status: "Processing", ... }
                     } elseif (isset($result['data'])) {
                         // Single order response
                         $data = $result['data'];
                         return [
                             $data['id'] => $data
                         ];
                     }
                }
            }

            Log::error("Provider Check Status Failed: " . $provider->name, [
                'ids' => $ids,
                'response' => $response->body()
            ]);

            return [];

        } catch (\Exception $e) {
            Log::error("Provider Check Status Exception: " . $e->getMessage());
            return [];
        }
    }
}
