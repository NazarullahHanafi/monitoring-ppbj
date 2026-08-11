<?php

namespace App\Services;

use App\Models\Torpr;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ProcurementJourneyService
{
    public function notifyGeneral(
        string $eventType,
        string $title,
        string $body,
        array $meta = [],
        ?User $actor = null
    ): bool {
        $documentNo = $this->cleanText($meta['document_no'] ?? null) ?: 'Dokumen manual';
        $description = $this->cleanText($meta['description'] ?? null) ?: $this->cleanText($meta['tujuan'] ?? null) ?: 'Update proses pengadaan';
        $dedupeKey = 'procurement_journey_notify_general:' . sha1($eventType . '|' . $documentNo . '|' . $body);

        if (Cache::has($dedupeKey)) {
            return false;
        }

        Cache::put($dedupeKey, true, now()->addSeconds(90));

        $actor = $actor ?: auth()->user();
        $nextAction = $this->nextActionHint($eventType, $meta);
        $message = $this->buildGeneralMessage($title, $body, $meta, $nextAction);

        $payload = [
            'user_id' => $actor?->id,
            'user_name' => $actor?->name ?: 'SIMONPR',
            'user_initials' => $this->initials($actor?->name ?: 'SP'),
            'user_color' => $this->colorFor($actor?->id ?: crc32($eventType)),
            'message' => $message,
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode([], JSON_UNESCAPED_UNICODE),
            'created_at' => now(),
        ];

        if (Schema::hasColumn('chat_messages', 'share_type')) {
            $payload['share_type'] = 'procurement_journey';
        }

        if (Schema::hasColumn('chat_messages', 'share_id')) {
            $payload['share_id'] = null;
        }

        if (Schema::hasColumn('chat_messages', 'share_data')) {
            $payload['share_data'] = json_encode([
                'label' => 'Update SP Manual',
                'number' => $documentNo,
                'title' => $description,
                'description' => $description,
                'status' => $title,
                'next_action' => $nextAction,
                'event_type' => $eventType,
                'meta' => $meta,
                'fields' => array_values(array_filter([
                    ['label' => 'Status', 'value' => $title],
                    ['label' => 'Progress', 'value' => $this->cleanText($meta['progress'] ?? null) ?: '-'],
                    ['label' => 'Dokumen', 'value' => $documentNo],
                    ['label' => 'Vendor', 'value' => $this->vendorText($meta['vendors'] ?? []) ?: '-'],
                ], fn ($field) => ($field['value'] ?? '-') !== '-')),
            ], JSON_UNESCAPED_UNICODE);
        }

        try {
            DB::table('chat_messages')->insert($payload);

            return true;
        } catch (\Throwable $e) {
            Log::warning('Procurement journey general chat notification failed', [
                'event_type' => $eventType,
                'document_no' => $documentNo,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    public function notifyByPrNumber(
        ?string $prNumber,
        string $eventType,
        string $title,
        string $body,
        array $meta = [],
        ?User $actor = null
    ): bool {
        $safePrNumber = $this->safePrNumber($prNumber);
        $torpr = $this->findTorpr($safePrNumber);

        if (! $torpr || ! $torpr->createdBy) {
            Log::info('Procurement journey notification skipped because PR creator was not found', [
                'event_type' => $eventType,
                'nomor_pr' => $safePrNumber,
                'document_no' => $this->cleanText($meta['document_no'] ?? null),
            ]);

            return false;
        }

        $dedupeKey = 'procurement_journey_notify:' . sha1($eventType . '|' . $safePrNumber . '|' . $body);
        if (Cache::has($dedupeKey)) {
            return false;
        }

        Cache::put($dedupeKey, true, now()->addSeconds(90));

        $actor = $actor ?: auth()->user() ?: $torpr->createdBy;
        $description = $this->cleanText($torpr->tujuan_pengadaan) ?: 'Deskripsi pengadaan belum diisi';
        $creatorName = $this->cleanText($torpr->createdBy->name) ?: 'Pembuat PR';
        $nextAction = $this->nextActionHint($eventType, $meta);
        $message = $this->buildMessage($safePrNumber, $title, $body, $meta, $torpr, $nextAction);

        $payload = [
            'user_id' => $actor?->id ?: $torpr->createdBy->id,
            'user_name' => $actor?->name ?: 'SIMONPR',
            'user_initials' => $this->initials($actor?->name ?: 'SP'),
            'user_color' => $this->colorFor($actor?->id ?: crc32($eventType)),
            'message' => $message,
            'reply_to' => null,
            'reply_preview' => null,
            'reply_user' => null,
            'mentions' => json_encode([[
                'id' => $torpr->createdBy->id,
                'name' => $torpr->createdBy->name,
            ]], JSON_UNESCAPED_UNICODE),
            'created_at' => now(),
        ];

        if (Schema::hasColumn('chat_messages', 'share_type')) {
            $payload['share_type'] = 'procurement_journey';
        }

        if (Schema::hasColumn('chat_messages', 'share_id')) {
            $payload['share_id'] = $torpr->id;
        }

        if (Schema::hasColumn('chat_messages', 'share_data')) {
            $payload['share_data'] = json_encode([
                'label' => 'Update Progress PR',
                'number' => $safePrNumber,
                'title' => $description,
                'nomor_pr' => $safePrNumber,
                'tujuan' => $description,
                'description' => $description,
                'creator' => $creatorName,
                'status' => $title,
                'next_action' => $nextAction,
                'event_type' => $eventType,
                'meta' => $meta,
                'fields' => array_values(array_filter([
                    ['label' => 'Pembuat PR', 'value' => '@'.$creatorName],
                    ['label' => 'Status', 'value' => $title],
                    ['label' => 'Progress', 'value' => $this->cleanText($meta['progress'] ?? null) ?: '-'],
                    ['label' => 'Dokumen', 'value' => $this->cleanText($meta['document_no'] ?? null) ?: '-'],
                ], fn ($field) => ($field['value'] ?? '-') !== '-')),
            ], JSON_UNESCAPED_UNICODE);
        }

        try {
            DB::table('chat_messages')->insert($payload);
            Cache::forget('chat:unread_count:' . $torpr->createdBy->id);

            return true;
        } catch (\Throwable $e) {
            Log::warning('Procurement journey chat notification failed', [
                'event_type' => $eventType,
                'nomor_pr' => $safePrNumber,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    private function findTorpr(?string $prNumber): ?Torpr
    {
        if (blank($prNumber)) {
            return null;
        }

        return Torpr::with('createdBy')
            ->where('nomor_pr', $prNumber)
            ->latest('id')
            ->first();
    }

    private function buildMessage(
        string $prNumber,
        string $title,
        string $body,
        array $meta,
        ?Torpr $torpr = null,
        ?string $nextAction = null
    ): string
    {
        $creatorName = $this->cleanText($torpr?->createdBy?->name);
        $description = $this->cleanText($torpr?->tujuan_pengadaan);

        $parts = ["📣 Update Progress: {$title}"];

        if ($creatorName) {
            $parts[] = '👤 Untuk: @'.$creatorName;
        }

        $parts[] = "🔎 PR/PPBJ: {$prNumber}";

        if ($description) {
            $parts[] = '📝 Deskripsi: '.$description;
        }

        $parts[] = 'ℹ️ '.$this->cleanText($body);

        if (! empty($meta['progress'])) {
            $parts[] = '📊 Progress: ' . $this->cleanText($meta['progress']);
        }

        $vendorText = $this->vendorText($meta['vendors'] ?? []);
        if ($vendorText) {
            $parts[] = '🏢 Vendor: ' . $vendorText;
        }

        if (! empty($meta['document_no'])) {
            $parts[] = '📄 Dokumen: ' . $this->cleanText($meta['document_no']);
        }

        $quickTag = $this->quickTag($prNumber, $this->cleanText($meta['document_no'] ?? null));
        if ($quickTag) {
            $parts[] = '🏷️ Tag cepat: '.$quickTag;
        }

        if (! empty($meta['note'])) {
            $parts[] = '🗒️ Catatan: ' . $this->cleanText($meta['note']);
        }

        if ($nextAction) {
            $parts[] = '➡️ Aksi berikutnya: '.$nextAction;
        }

        return implode("\n", array_filter($parts));
    }

    private function buildGeneralMessage(
        string $title,
        string $body,
        array $meta,
        ?string $nextAction = null
    ): string {
        $documentNo = $this->cleanText($meta['document_no'] ?? null);
        $description = $this->cleanText($meta['description'] ?? null) ?: $this->cleanText($meta['tujuan'] ?? null);

        $parts = ["📣 Update Progress: {$title}"];

        if ($documentNo) {
            $parts[] = '📄 Dokumen: '.$documentNo;
        }

        if ($description) {
            $parts[] = '📝 Deskripsi: '.$description;
        }

        $parts[] = 'ℹ️ '.$this->cleanText($body);

        if (! empty($meta['progress'])) {
            $parts[] = '📊 Progress: '.$this->cleanText($meta['progress']);
        }

        $vendorText = $this->vendorText($meta['vendors'] ?? []);
        if ($vendorText) {
            $parts[] = '🏢 Vendor: '.$vendorText;
        }

        $quickTag = $this->quickTag(null, $documentNo);
        if ($quickTag) {
            $parts[] = '🏷️ Tag cepat: '.$quickTag;
        }

        if ($nextAction) {
            $parts[] = '➡️ Aksi berikutnya: '.$nextAction;
        }

        return implode("\n", array_filter($parts));
    }

    private function nextActionHint(string $eventType, array $meta): string
    {
        $needle = mb_strtolower($eventType.' '.(string) ($meta['progress'] ?? '').' '.(string) ($meta['document_no'] ?? ''));

        return match (true) {
            str_contains($needle, 'spph') => 'Cek penawaran vendor, pilih kandidat terbaik, lalu lanjutkan ke SP jika sudah siap.',
            str_contains($needle, 'sp') || str_contains($needle, 'kontrak') => 'Pantau estimasi barang/jasa datang dan lengkapi invoice atau lampiran saat pekerjaan selesai.',
            str_contains($needle, 'barang') || str_contains($needle, 'arriv') => 'Konfirmasi penerimaan di operasional agar status PR tercatat lengkap sampai serah terima.',
            str_contains($needle, 'arsip') || str_contains($needle, 'lampiran') => 'Review lampiran di arsip dan pastikan dokumen pendukung sudah sesuai kebutuhan audit.',
            default => 'Pantau tracking PR dan gunakan follow up chat kalau progress mulai berhenti terlalu lama.',
        };
    }

    private function cleanText(mixed $value): string
    {
        return trim(preg_replace('/\s+/u', ' ', (string) $value) ?? '');
    }

    private function vendorText(mixed $vendors): string
    {
        if (! is_array($vendors)) {
            return $this->cleanText($vendors);
        }

        return implode(', ', array_slice(array_values(array_filter(array_map(
            fn ($vendor) => $this->cleanText($vendor),
            $vendors
        ))), 0, 6));
    }

    private function quickTag(?string $prNumber, ?string $documentNo): string
    {
        $tags = [];

        if ($prNumber) {
            $tail = preg_replace('/\D+/', '', $prNumber);
            if ($tail) {
                $tags[] = '#PR'.substr($tail, -4);
            }
        }

        if ($documentNo) {
            $seq = preg_replace('/^(\d+).*/', '$1', $documentNo);
            if ($seq && ($seq !== $documentNo || ctype_digit((string) $seq))) {
                $tags[] = '#SP'.$seq;
            }
        }

        return implode(' ', array_unique($tags));
    }

    private function safePrNumber(?string $number): string
    {
        $number = trim((string) $number);

        return $number !== '' ? $number : 'PR belum bernomor';
    }

    private function initials(string $name): string
    {
        $words = preg_split('/\s+/', trim($name)) ?: [];
        $initials = '';

        foreach ($words as $word) {
            if ($word !== '') {
                $initials .= mb_substr($word, 0, 1);
            }
            if (mb_strlen($initials) >= 2) {
                break;
            }
        }

        return mb_strtoupper($initials ?: 'SP');
    }

    private function colorFor(int|string $seed): string
    {
        $colors = ['#2563eb', '#7c3aed', '#db2777', '#f97316', '#059669', '#0891b2', '#dc2626'];

        return $colors[abs((int) crc32((string) $seed)) % count($colors)];
    }
}
