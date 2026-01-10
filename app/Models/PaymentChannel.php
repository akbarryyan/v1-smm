<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentChannel extends Model
{
    protected $fillable = [
        'code',
        'name',
        'category',
        'provider',
        'fee_flat',
        'fee_percent',
        'min_amount',
        'max_amount',
        'icon',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'fee_flat' => 'decimal:2',
        'fee_percent' => 'decimal:2',
        'min_amount' => 'integer',
        'max_amount' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get category label in Indonesian.
     */
    public function getCategoryLabelAttribute(): string
    {
        return match ($this->category) {
            'virtual_account' => 'Virtual Account',
            'emoney' => 'E-Money',
            'qris' => 'QRIS',
            'retail' => 'Retail',
            default => $this->category,
        };
    }

    /**
     * Calculate fee for given amount.
     */
    public function calculateFee(int $amount): float
    {
        $percentFee = ($amount * $this->fee_percent) / 100;
        return $this->fee_flat + $percentFee;
    }

    /**
     * Get total amount including fee.
     */
    public function getTotalAmount(int $amount): float
    {
        return $amount + $this->calculateFee($amount);
    }

    /**
     * Get formatted fee display.
     */
    public function getFormattedFeeAttribute(): string
    {
        $parts = [];
        
        if ($this->fee_flat > 0) {
            $parts[] = 'Rp ' . number_format($this->fee_flat, 0, ',', '.');
        }
        
        if ($this->fee_percent > 0) {
            $parts[] = number_format($this->fee_percent, 1) . '%';
        }
        
        return count($parts) > 0 ? implode(' + ', $parts) : 'Gratis';
    }

    /**
     * Scope for active channels.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope by category.
     */
    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
