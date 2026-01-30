<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Item extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'item';

    protected $fillable = [
        'content',
        'priority',
        'is_completed',
        'category_id',
        'user_id',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getIsCompletedAttribute($value): string
    {
        return $value == 1 ? 'Completed' : 'Incomplete';
    }

    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';

    public function priorities(): array
    {
        return [
            self::PRIORITY_LOW,
            self::PRIORITY_MEDIUM,
            self::PRIORITY_HIGH,
        ];
    }

    public function setPriorityAttribute($value): void
    {
        $value = strtolower($value);
        if (in_array($value, self::priorities())) {
            $this->attributes['priority'] = $value;
        } else {
            $this->attributes['priority'] = self::PRIORITY_LOW;
        }
    }

    public function getPriorityAttribute($value): string
    {
        return ucfirst($value);
    }

}
