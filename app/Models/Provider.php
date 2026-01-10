<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'api_url',
        'api_id',
        'api_key',
        'status',
        'is_active',
        'balance',
        'default_margin',
        'margin_type',
        'services_count',
        'response_time',
        'last_check',
        'last_sync',
        'notes',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'balance' => 'decimal:2',
        'default_margin' => 'decimal:2',
        'last_check' => 'datetime',
        'last_sync' => 'datetime',
    ];

    protected $hidden = [
        'api_key',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($provider) {
            if (empty($provider->slug)) {
                $provider->slug = Str::slug($provider->name);
            }
        });
    }

    /**
     * Get the services for the provider.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Get masked API key for display.
     */
    public function getMaskedApiKeyAttribute(): string
    {
        $key = $this->api_key;
        if (strlen($key) <= 8) {
            return str_repeat('*', strlen($key));
        }
        return substr($key, 0, 4) . str_repeat('*', strlen($key) - 8) . substr($key, -4);
    }

    /**
     * Get human-readable response time.
     */
    public function getResponseTimeFormattedAttribute(): string
    {
        if (!$this->response_time) {
            return '-';
        }
        if ($this->response_time < 1000) {
            return $this->response_time . 'ms';
        }
        return round($this->response_time / 1000, 1) . 's';
    }

    /**
     * Get human-readable last check time.
     */
    public function getLastCheckFormattedAttribute(): string
    {
        if (!$this->last_check) {
            return 'Belum pernah';
        }
        return $this->last_check->diffForHumans();
    }

    /**
     * Calculate price with margin.
     */
    public function calculatePriceWithMargin(float $originalPrice, ?float $margin = null, ?string $type = null): float
    {
        $margin = $margin ?? $this->default_margin;
        $type = $type ?? $this->margin_type;

        if ($type === 'percentage') {
            return $originalPrice + ($originalPrice * ($margin / 100));
        }

        return $originalPrice + $margin;
    }
}
