<?php

namespace App\Console\Commands;

use App\Models\Ppbj;
use App\Services\ProcurementJourneyService;
use App\Services\TelegramBotService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class SendContractFulfillmentReminders extends Command
{
    protected $signature = 'ppbj:contract-reminders {--force : Abaikan penanda reminder yang sudah pernah dikirim}';

    protected $description = 'Kirim reminder masa pemenuhan SP/kontrak ke pembuat PR dan ringkasan owner.';

    public function handle(ProcurementJourneyService $journey, TelegramBotService $telegram): int
    {
        $reminders = [];
        $sent = 0;

        Ppbj::query()
            ->select([
                'id', 'ppbj_no', 'uraian', 'tgl_spk', 'promised_date',
                'goods_confirmed_at', 'status', 'awarding_sp', 'tgl_awarding_sp',
            ])
            ->whereNotNull('tgl_spk')
            ->whereNotNull('promised_date')
            ->whereNull('goods_confirmed_at')
            ->where(function ($query) {
                $query->whereNull('status')->orWhere('status', '!=', 'CANCELLED');
            })
            ->whereDate('promised_date', '<=', now()->addDays(30)->toDateString())
            ->orderBy('id')
            ->chunkById(100, function ($rows) use ($journey, &$reminders, &$sent) {
                foreach ($rows as $ppbj) {
                    $remaining = $ppbj->contractRemainingDays();

                    if ($remaining === null || ! $this->isReminderMilestone($remaining)) {
                        continue;
                    }

                    $milestone = $remaining < 0 ? 'overdue' : (string) $remaining;
                    $cacheKey = 'ppbj_contract_reminder:' . $ppbj->id . ':' . $milestone;

                    if (! $this->option('force') && ! Cache::add($cacheKey, true, now()->addYear())) {
                        continue;
                    }

                    $status = $ppbj->contractStatusLabel();
                    $deadline = $ppbj->contractEndDate()?->translatedFormat('d F Y') ?: '-';
                    $timing = $remaining < 0
                        ? 'telah melewati batas ' . abs($remaining) . ' hari'
                        : ($remaining === 0 ? 'berakhir hari ini' : 'tersisa ' . $remaining . ' hari');

                    $journey->notifyByPrNumber(
                        $ppbj->ppbj_no,
                        'contract_fulfillment_reminder',
                        'Reminder Pemenuhan SP/Kontrak',
                        "Batas pemenuhan {$deadline}; {$timing}.",
                        [
                            'document_no' => $ppbj->awarding_sp,
                            'description' => $ppbj->uraian,
                            'progress' => $status,
                            'promised_date' => $ppbj->promised_date,
                            'remaining_days' => $remaining,
                        ]
                    );

                    $reminders[] = [
                        'number' => (string) $ppbj->ppbj_no,
                        'description' => (string) ($ppbj->uraian ?: '-'),
                        'deadline' => $deadline,
                        'timing' => $timing,
                        'status' => $status,
                    ];
                    $sent++;
                }
            });

        if ($reminders !== []) {
            $telegram->notifyContractFulfillmentReminders($reminders);
        }

        $this->info("Reminder masa pemenuhan terkirim: {$sent}");

        return self::SUCCESS;
    }

    private function isReminderMilestone(int $remaining): bool
    {
        return in_array($remaining, [30, 14, 7, 3, 1, 0, -1], true);
    }
}
