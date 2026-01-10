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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('provider_id')->nullable()->constrained()->onDelete('set null');
            
            // Provider order ID
            $table->string('provider_order_id')->nullable();
            
            // Order details
            $table->string('target'); // Link/username
            $table->integer('quantity');
            $table->decimal('price_per_k', 15, 2); // Price per 1000 at time of order
            $table->decimal('total_cost', 15, 2); // Total cost
            
            // Optional fields for special order types
            $table->text('comments')->nullable(); // For Custom Comments type
            $table->text('usernames')->nullable(); // For Mentions Custom List type
            
            // Status tracking
            $table->enum('status', [
                'pending',      // Order created, waiting to be sent to provider
                'processing',   // Sent to provider, in progress
                'completed',    // Order completed
                'partial',      // Partially completed
                'cancelled',    // Cancelled
                'refunded',     // Refunded
                'error',        // Error from provider
            ])->default('pending');
            
            // Progress tracking
            $table->integer('start_count')->default(0);
            $table->integer('current_count')->default(0);
            $table->integer('remains')->default(0);
            
            // Provider response
            $table->text('provider_response')->nullable();
            $table->string('provider_status')->nullable();
            
            // Timestamps
            $table->timestamp('sent_at')->nullable(); // When sent to provider
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'status']);
            $table->index('provider_order_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
