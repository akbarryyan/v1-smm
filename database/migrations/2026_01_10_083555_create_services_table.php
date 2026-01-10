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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained()->onDelete('cascade');
            $table->string('provider_service_id'); // ID layanan di provider
            $table->string('name');
            $table->string('category');
            $table->string('type')->default('default'); // default, package, custom_comment, etc.
            $table->decimal('original_price', 15, 2); // Harga asli dari provider
            $table->decimal('price', 15, 2); // Harga jual (original + margin)
            $table->integer('min')->default(1);
            $table->integer('max')->default(10000);
            $table->boolean('refill')->default(false);
            $table->text('description')->nullable();
            $table->string('average_time')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Unique constraint untuk provider + service id
            $table->unique(['provider_id', 'provider_service_id']);
        });

        // Add margin column to providers table
        Schema::table('providers', function (Blueprint $table) {
            $table->decimal('default_margin', 15, 2)->default(0)->after('balance');
            $table->enum('margin_type', ['fixed', 'percentage'])->default('fixed')->after('default_margin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');

        Schema::table('providers', function (Blueprint $table) {
            $table->dropColumn(['default_margin', 'margin_type']);
        });
    }
};
