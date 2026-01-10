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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['credit', 'debit']);
            $table->string('category'); // deposit, order, refund, etc.
            $table->decimal('amount', 15, 2);
            $table->decimal('beginning_balance', 15, 2);
            $table->decimal('ending_balance', 15, 2);
            $table->string('description');
            $table->nullableMorphs('reference'); // reference_type, reference_id
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
