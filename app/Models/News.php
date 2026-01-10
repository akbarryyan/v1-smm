<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'content',
        'type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getTypeLabelAttribute(): string
    {
        return match ($this->type) {
            'announcement' => 'Pengumuman',
            'update' => 'Update',
            'promo' => 'Promo',
            'maintenance' => 'Maintenance',
            default => 'Berita',
        };
    }

    public function getTypeColorAttribute(): string
    {
        return match ($this->type) {
            'announcement' => 'bg-blue-100 text-blue-700',
            'update' => 'bg-emerald-100 text-emerald-700',
            'promo' => 'bg-amber-100 text-amber-700',
            'maintenance' => 'bg-rose-100 text-rose-700',
            default => 'bg-slate-100 text-slate-700',
        };
    }
}
