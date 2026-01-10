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
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('api_url');
            $table->string('api_id')->nullable();
            $table->string('api_key');
            $table->enum('status', ['online', 'warning', 'offline'])->default('offline');
            $table->boolean('is_active')->default(true);
            $table->decimal('balance', 15, 2)->default(0);
            $table->integer('services_count')->default(0);
            $table->integer('response_time')->nullable(); // in milliseconds
            $table->timestamp('last_check')->nullable();
            $table->timestamp('last_sync')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
