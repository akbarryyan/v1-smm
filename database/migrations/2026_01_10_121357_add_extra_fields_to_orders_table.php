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
        Schema::table('orders', function (Blueprint $table) {
            // For Mentions Hashtag type
            $table->string('hashtag')->nullable()->after('usernames');
            
            // For Mentions User Followers, Comment Replies, Comment Likes
            $table->string('username')->nullable()->after('hashtag');
            
            // For Poll type
            $table->integer('answer_number')->nullable()->after('username');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['hashtag', 'username', 'answer_number']);
        });
    }
};
