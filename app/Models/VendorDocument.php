<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VendorDocument extends Model
{
    public const TYPES = ['npwp' => 'NPWP', 'nib' => 'NIB', 'akta' => 'Akta', 'kk' => 'Kartu Keluarga', 'ktp' => 'KTP', 'siup' => 'SIUP', 'sppkp' => 'SPPKP', 'izin' => 'Izin usaha', 'sertifikat' => 'Sertifikat', 'rekening' => 'Rekening bank', 'lainnya' => 'Lainnya'];

    public $incrementing = false;

    protected $keyType = 'string';

    protected $guarded = [];

    protected $hidden = ['cloud_item_id', 'cloud_etag', 'cloud_path', 'checksum', 'search_text', 'staged_file'];

    protected $attributes = ['version' => 1, 'status' => 'pending'];

    protected function casts(): array
    {
        return ['expires_at' => 'date:Y-m-d', 'version' => 'integer', 'size' => 'integer', 'vendor_id' => 'integer', 'uploaded_by' => 'integer',
            'transfer_attempts' => 'integer', 'transfer_after' => 'datetime', 'transfer_expires_at' => 'datetime'];
    }

    public static function terms(string $text): array
    {
        $text = mb_strtolower(class_exists(\Normalizer::class) ? \Normalizer::normalize($text, \Normalizer::FORM_KC) : $text);
        preg_match_all('/[\pL\pN]{1,100}/u', $text, $matches);

        return array_values(array_unique($matches[0]));
    }

    public function reindex(): void
    {
        DB::table('vendor_document_terms')->where('document_id', $this->id)->delete();
        $terms = self::terms(implode(' ', [$this->type, self::TYPES[$this->type], $this->title, $this->document_number, $this->original_name, $this->search_text]));
        foreach (array_chunk($terms, 400) as $chunk) {
            DB::table('vendor_document_terms')->insert(array_map(fn ($term) => ['document_id' => $this->id, 'term' => $term], $chunk));
        }
    }

    public function scopeSearch(Builder $query, string $search): void
    {
        foreach (self::terms($search) as $term) {
            $query->whereExists(fn ($q) => $q->selectRaw('1')->from('vendor_document_terms as vdt')
                ->whereColumn('vdt.document_id', 'vendor_documents.id')->where('vdt.term', 'like', $term.'%'));
        }
        if (self::terms($search) === [] && trim($search) !== '') {
            $query->whereRaw('1 = 0');
        }
    }
}
