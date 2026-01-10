<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deposits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('payment_channel_id')->constrained()->onDelete('cascade');
            
            // Reference & Transaction IDs
            $table->string('ref_id')->unique(); // Our reference ID
            $table->string('trx_id')->nullable(); // TokoPay transaction ID
            
            // Amounts
            $table->decimal('amount', 15, 2); // Requested amount
            $table->decimal('fee', 15, 2)->default(0); // Admin fee
            $table->decimal('total_bayar', 15, 2)->default(0); // Total to pay
            $table->decimal('total_diterima', 15, 2)->default(0); // Amount received after fee
            
            // Payment Details (depends on method)
            $table->string('nomor_va')->nullable(); // For Virtual Account
            $table->string('checkout_url')->nullable(); // For E-Money
            $table->string('qr_link')->nullable(); // For QRIS
            $table->text('qr_string')->nullable(); // QRIS string
            $table->string('pay_url')->nullable(); // General payment URL
            $table->text('panduan_pembayaran')->nullable();
            
            // Status
            $table->enum('status', ['pending', 'paid', 'expired', 'failed', 'cancelled'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            
            // Extra data
            $table->json('response_data')->nullable(); // Full API response
            
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('ref_id');
            $table->index('trx_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposits');
    }
};
