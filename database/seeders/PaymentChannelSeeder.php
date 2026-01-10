<?php

namespace Database\Seeders;

use App\Models\PaymentChannel;
use Illuminate\Database\Seeder;

class PaymentChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $channels = [
            // Virtual Account
            ['code' => 'BRIVA', 'name' => 'BRI Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 1],
            ['code' => 'BCAVA', 'name' => 'BCA Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 5000, 'sort_order' => 2],
            ['code' => 'BNIVA', 'name' => 'BNI Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 3],
            ['code' => 'MANDIRIVA', 'name' => 'Mandiri Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 4],
            ['code' => 'PERMATAVA', 'name' => 'Permata Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 5],
            ['code' => 'PERMATAVAA', 'name' => 'Permata Virtual Akun 2', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 6],
            ['code' => 'CIMBVA', 'name' => 'CIMB Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 7],
            ['code' => 'DANAMONVA', 'name' => 'Danamon Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 8],
            ['code' => 'BSIVA', 'name' => 'BSI Virtual Akun', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 9],
            ['code' => 'BNCVA', 'name' => 'BNC Virtual Akun (NEO)', 'category' => 'virtual_account', 'fee_flat' => 4000, 'sort_order' => 10],
            
            // E-Money
            ['code' => 'SHOPEEPAY', 'name' => 'Shopee Pay', 'category' => 'emoney', 'fee_percent' => 2, 'sort_order' => 11],
            ['code' => 'GOPAY', 'name' => 'GoPay', 'category' => 'emoney', 'fee_percent' => 2, 'sort_order' => 12],
            ['code' => 'DANA', 'name' => 'DANA', 'category' => 'emoney', 'fee_percent' => 2, 'sort_order' => 13],
            ['code' => 'LINKAJA', 'name' => 'Link Aja', 'category' => 'emoney', 'fee_percent' => 2, 'sort_order' => 14],
            
            // QRIS
            ['code' => 'QRIS', 'name' => 'QRIS', 'category' => 'qris', 'fee_percent' => 0.7, 'sort_order' => 15],
            ['code' => 'QRISREALTIME', 'name' => 'QRIS Realtime', 'category' => 'qris', 'fee_percent' => 0.7, 'sort_order' => 16],
            ['code' => 'QRIS_REALTIME_NOBU', 'name' => 'QRIS Realtime Nobu', 'category' => 'qris', 'fee_percent' => 0.7, 'sort_order' => 17],
        ];

        foreach ($channels as $channel) {
            PaymentChannel::updateOrCreate(
                ['code' => $channel['code']],
                array_merge([
                    'provider' => 'tokopay',
                    'fee_flat' => 0,
                    'fee_percent' => 0,
                    'min_amount' => 10000,
                    'max_amount' => 10000000,
                    'is_active' => true,
                ], $channel)
            );
        }
    }
}
