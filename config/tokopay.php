<?php

return [
    /*
    |--------------------------------------------------------------------------
    | TokoPay Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for TokoPay payment gateway integration.
    | Get your credentials at https://tokopay.id
    |
    */

    'merchant_id' => env('TOKOPAY_MERCHANT_ID', ''),
    'secret_key' => env('TOKOPAY_SECRET_KEY', ''),
    
    /*
    |--------------------------------------------------------------------------
    | API URLs
    |--------------------------------------------------------------------------
    */
    'base_url' => env('TOKOPAY_BASE_URL', 'https://api.tokopay.id/v1'),
    
    /*
    |--------------------------------------------------------------------------
    | Callback URL
    |--------------------------------------------------------------------------
    |
    | URL that TokoPay will call when payment status changes.
    |
    */
    'callback_url' => env('TOKOPAY_CALLBACK_URL', '/api/tokopay/callback'),
    
    /*
    |--------------------------------------------------------------------------
    | Return URL
    |--------------------------------------------------------------------------
    |
    | URL to redirect user after payment.
    |
    */
    'return_url' => env('TOKOPAY_RETURN_URL', '/deposit/success'),
];
