<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpPortfolioFieldMap extends Model
{
    protected $fillable = ['portfolio', 'portfolio_key', 'field_id', 'is_active', 'updated_by_user_id'];

    protected $casts = ['is_active' => 'boolean'];

    public static function key(string $value): string
    {
        return mb_strtoupper(preg_replace('/\s+/u', ' ', trim($value)) ?? '');
    }

    public function field()
    {
        return $this->belongsTo(SpMasterOption::class, 'field_id');
    }

    public function version(): string
    {
        return hash('sha256', json_encode([$this->portfolio, $this->portfolio_key, $this->field_id, $this->is_active, $this->getRawOriginal('updated_at')]));
    }
}
