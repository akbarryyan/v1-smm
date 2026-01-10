<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_id',
        'provider_service_id',
        'name',
        'category',
        'type',
        'original_price',
        'price',
        'min',
        'max',
        'refill',
        'description',
        'average_time',
        'is_active',
    ];

    protected $casts = [
        'original_price' => 'decimal:2',
        'price' => 'decimal:2',
        'refill' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the provider that owns the service.
     */
    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    /**
     * Calculate margin amount.
     */
    public function getMarginAttribute(): float
    {
        return $this->price - $this->original_price;
    }

    /**
     * Calculate margin percentage.
     */
    public function getMarginPercentageAttribute(): float
    {
        if ($this->original_price <= 0) {
            return 0;
        }
        return round((($this->price - $this->original_price) / $this->original_price) * 100, 2);
    }
}
