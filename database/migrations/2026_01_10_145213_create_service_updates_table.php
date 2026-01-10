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
        Schema::create('service_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            // Store service name/id explicitly in case service is deleted/nullified
            $table->string('service_name')->nullable();
            $table->string('provider_service_id')->nullable(); 
            
            $table->string('type'); // 'Nonaktif', 'Perubahan Data', 'Harga Naik', 'Harga Turun', 'Layanan Baru'
            $table->text('description');
            $table->decimal('old_price', 15, 2)->nullable();
            $table->decimal('new_price', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_updates');
    }
};
