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
        Schema::create('payment_channels', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // e.g., BRIVA, BCAVA, GOPAY
            $table->string('name'); // Display name
            $table->string('category'); // virtual_account, emoney, qris, retail
            $table->string('provider')->default('tokopay'); // Payment provider
            $table->decimal('fee_flat', 15, 2)->default(0); // Flat fee
            $table->decimal('fee_percent', 5, 2)->default(0); // Percentage fee
            $table->integer('min_amount')->default(10000);
            $table->integer('max_amount')->default(10000000);
            $table->string('icon')->nullable(); // Icon path or URL
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_channels');
    }
};
