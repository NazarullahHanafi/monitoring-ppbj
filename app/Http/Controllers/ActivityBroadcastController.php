<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ActivityBroadcastController extends Controller
{
    private const MAX_ITEMS = 10;

    private const GENERAL_SCAN_LIMIT = 30;

    private const OPERATIONAL_SCAN_LIMIT = 60;

    public function __invoke(Request $request): JsonResponse
    {
        /** @var User|null $user */
        $user = $request->user();

        abort_unless($user, 401);

        $canSeeAll = $user->department === 'umum' || $user->role === 'superadmin' || $user->isOwner();
        $cacheKey = $canSeeAll
            ? 'activity_broadcast:umum:v2'
            : 'activity_broadcast:user:'.$user->id.':v2';

        $items = Cache::remember($cacheKey, now()->addSeconds(20), function () use ($user, $canSeeAll) {
            $rows = DB::table('chat_messages')
                ->where('share_type', 'procurement_journey')
                ->orderByDesc('id')
                ->limit($canSeeAll ? self::GENERAL_SCAN_LIMIT : self::OPERATIONAL_SCAN_LIMIT)
                ->get([
                    'id',
                    'user_name',
                    'message',
                    'mentions',
                    'share_data',
                    'created_at',
                ]);

            if (! $canSeeAll) {
                if ($user->department !== 'operasional') {
                    return [];
                }

                $rows = $rows->filter(fn ($row) => $this->mentionsUser($row->mentions ?? null, (int) $user->id));
            }

            return $rows
                ->map(fn ($row) => $this->formatItem($row, $user))
                ->filter()
                ->unique(fn ($item) => implode('|', [
                    $item['event_type'] ?? '',
                    $item['number'] ?? '',
                    $item['title'] ?? '',
                ]))
                ->take(self::MAX_ITEMS)
                ->values()
                ->all();
        });

        return response()->json([
            'items' => $items,
            'generated_at' => now()->toIso8601String(),
        ])->header('Cache-Control', 'private, max-age=15');
    }

    private function mentionsUser(mixed $mentions, int $userId): bool
    {
        $decoded = is_array($mentions) ? $mentions : json_decode((string) $mentions, true);

        if (! is_array($decoded)) {
            return false;
        }

        foreach ($decoded as $mention) {
            if (is_array($mention) && (int) ($mention['id'] ?? 0) === $userId) {
                return true;
            }
        }

        return false;
    }

    private function formatItem(object $row, User $user): ?array
    {
        $data = json_decode((string) ($row->share_data ?? ''), true);
        $data = is_array($data) ? $data : [];
        $meta = is_array($data['meta'] ?? null) ? $data['meta'] : [];

        $eventType = $this->clean($data['event_type'] ?? 'procurement_update');
        $title = $this->clean($data['status'] ?? $data['label'] ?? 'Update pengadaan');
        $number = $this->clean($data['nomor_pr'] ?? $data['number'] ?? $meta['document_no'] ?? null);
        $description = $this->clean($data['description'] ?? $data['title'] ?? $data['tujuan'] ?? null);
        $nextAction = $this->clean($data['next_action'] ?? null);

        if ($title === '' && $number === '' && $description === '') {
            $description = Str::limit($this->clean($row->message ?? null), 180);
        }

        if ($title === '' && $description === '') {
            return null;
        }

        $createdAt = filled($row->created_at ?? null)
            ? Carbon::parse($row->created_at)
            : now();
        $severity = $this->severity($eventType, $title);

        return [
            'id' => (int) $row->id,
            'title' => Str::limit($title ?: 'Update pengadaan', 90, ''),
            'number' => Str::limit($number, 90, ''),
            'description' => Str::limit($description, 220),
            'next_action' => Str::limit($nextAction, 220),
            'actor' => Str::limit($this->clean($row->user_name ?? 'SIMONPR') ?: 'SIMONPR', 80, ''),
            'event_type' => $eventType,
            'severity' => $severity,
            'icon' => $this->icon($eventType, $severity),
            'occurred_at' => $createdAt->toIso8601String(),
            'occurred_label' => $createdAt->translatedFormat('d M Y H:i'),
            'url' => $this->targetUrl($eventType, $number, $user),
        ];
    }

    private function targetUrl(string $eventType, string $number, User $user): string
    {
        if ($user->department === 'operasional') {
            return route('tracking.index', array_filter(['q' => $number ?: null]));
        }

        if (str_contains($eventType, 'spph')) {
            return route('spph.index', array_filter(['search' => $number ?: null]));
        }

        if (str_contains($eventType, 'sp_') || str_starts_with($eventType, 'sp')) {
            return route('sp.index', array_filter(['search' => $number ?: null]));
        }

        return route('ppbj.index', array_filter(['search' => $number ?: null]));
    }

    private function severity(string $eventType, string $title): string
    {
        $text = mb_strtolower($eventType.' '.$title);

        return match (true) {
            str_contains($text, 'overdue'),
            str_contains($text, 'terlambat'),
            str_contains($text, 'kritis'),
            str_contains($text, 'rejected'),
            str_contains($text, 'ditolak'),
            str_contains($text, 'cancel') => 'danger',
            str_contains($text, 'warning'),
            str_contains($text, 'segera'),
            str_contains($text, 'jatuh tempo') => 'warning',
            str_contains($text, 'confirmed'),
            str_contains($text, 'received'),
            str_contains($text, 'approved'),
            str_contains($text, 'diterima'),
            str_contains($text, 'selesai'),
            str_contains($text, 'lengkap') => 'success',
            default => 'info',
        };
    }

    private function icon(string $eventType, string $severity): string
    {
        return match (true) {
            str_contains($eventType, 'goods') => 'package',
            str_contains($eventType, 'spph') => 'document',
            str_contains($eventType, 'sp_') || str_starts_with($eventType, 'sp') => 'contract',
            str_contains($eventType, 'received') || str_contains($eventType, 'approved') => 'check',
            $severity === 'danger' => 'alert',
            default => 'info',
        };
    }

    private function clean(mixed $value): string
    {
        return trim(preg_replace('/\s+/u', ' ', strip_tags((string) $value)) ?? '');
    }
}
