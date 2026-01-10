<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'provider_id',
        'provider_order_id',
        'target',
        'quantity',
        'price_per_k',
        'total_cost',
        'comments',
        'usernames',
        'hashtag',
        'username',
        'answer_number',
        'status',
        'start_count',
        'current_count',
        'remains',
        'provider_response',
        'provider_status',
        'sent_at',
        'completed_at',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price_per_k' => 'decimal:2',
        'total_cost' => 'decimal:2',
        'start_count' => 'integer',
        'current_count' => 'integer',
        'remains' => 'integer',
        'answer_number' => 'integer',
        'sent_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the service for this order.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the provider for this order.
     */
    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    /**
     * Get status badge color.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'amber',
            'processing' => 'blue',
            'completed' => 'emerald',
            'partial' => 'orange',
            'cancelled' => 'slate',
            'refunded' => 'purple',
            'error' => 'rose',
            default => 'slate',
        };
    }

    /**
     * Get status label in Indonesian.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Menunggu',
            'processing' => 'Diproses',
            'completed' => 'Selesai',
            'partial' => 'Sebagian',
            'cancelled' => 'Dibatalkan',
            'refunded' => 'Dikembalikan',
            'error' => 'Error',
            default => 'Unknown',
        };
    }

    /**
     * Get formatted total cost.
     */
    public function getFormattedTotalCostAttribute(): string
    {
        return 'Rp ' . number_format($this->total_cost, 0, ',', '.');
    }
}
