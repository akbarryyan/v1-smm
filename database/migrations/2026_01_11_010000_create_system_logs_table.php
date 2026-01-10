<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('system_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type'); // api, error, admin, system
            $table->string('level'); // info, warning, error
            $table->text('message');
            $table->string('context')->nullable(); // Provider API, Payment Gateway, Admin Activity, etc.
            $table->json('meta')->nullable(); // Additional data
            $table->timestamps();

            $table->index('type');
            $table->index('level');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_logs');
    }
};
