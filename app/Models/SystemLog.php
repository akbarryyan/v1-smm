<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SystemLog extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'level',
        'message',
        'context',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function log(string $type, string $level, string $message, ?string $context = null, ?array $meta = null, ?int $userId = null): self
    {
        return self::create([
            'user_id' => $userId,
            'type' => $type,
            'level' => $level,
            'message' => $message,
            'context' => $context,
            'meta' => $meta,
        ]);
    }

    public static function info(string $type, string $message, ?string $context = null, ?array $meta = null, ?int $userId = null): self
    {
        return self::log($type, 'info', $message, $context, $meta, $userId);
    }

    public static function warning(string $type, string $message, ?string $context = null, ?array $meta = null, ?int $userId = null): self
    {
        return self::log($type, 'warning', $message, $context, $meta, $userId);
    }

    public static function error(string $type, string $message, ?string $context = null, ?array $meta = null, ?int $userId = null): self
    {
        return self::log($type, 'error', $message, $context, $meta, $userId);
    }
}
