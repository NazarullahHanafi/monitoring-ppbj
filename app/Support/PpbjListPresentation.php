<?php

namespace App\Support;

use App\Models\Ppbj;

/** A request-local snapshot shared by the list and its detail/edit popup. */
final class PpbjListPresentation
{
    public static function make(Ppbj $ppbj): array
    {
        $data = $ppbj->toArray();
        $start = $ppbj->contractStartDate();
        $end = $ppbj->contractEndDate();
        $handover = $ppbj->handoverDate();
        $remaining = $ppbj->slaFinalRemainingDays();
        $status = $ppbj->status_sla;
        $contractStatus = $ppbj->contractStatusLabel();

        return array_replace($data, [
            'target_sla_hari' => $ppbj->slaTargetDays(),
            'status_sla' => $status,
            'sla_is_complete' => $ppbj->isSlaComplete(),
            'sla_final_label' => $ppbj->slaFinalLabel(),
            'sla_outcome_label' => $ppbj->slaOutcomeLabel(),
            'sla_used_days' => $ppbj->slaUsedDays(),
            'sla_final_remaining_days' => $remaining,
            'sla_current_remaining_days' => $ppbj->slaCurrentRemainingDays(),
            'sla_start_source_label' => $ppbj->slaStartSourceLabel(),
            'sla_finish_source_label' => $ppbj->slaFinishSourceLabel(),
            'sla_running_days' => $ppbj->slaRunningDays(),
            'sla_target_date_label' => $ppbj->slaTargetDateLabel(),
            'sla_explanation' => $ppbj->slaExplanation(),
            'sla_outcome_tone' => $remaining === null ? 'neutral' : ($remaining < 0 ? 'late' : 'ahead'),
            'status_tone' => match ($status) {
                'CANCELLED' => 'cancelled', 'LENGKAP' => 'complete',
                'OVERDUE' => 'overdue', 'JATUH TEMPO' => 'due',
                'WARNING' => 'warning', 'ON TRACK' => 'on-track',
                default => 'neutral',
            },
            'contract_status_label' => $contractStatus,
            'contract_status_tone' => match ($contractStatus) {
                'SANGAT KRITIS', 'BERAKHIR HARI INI' => 'very-critical',
                'KRITIS' => 'critical',
                'MELEWATI BATAS', 'TANGGAL TIDAK VALID', 'SERAH TERIMA TERLAMBAT' => 'danger',
                'DOKUMEN SERAH TERIMA BELUM LENGKAP', 'SEGERA BERAKHIR', 'BATAS BELUM DIATUR' => 'warning',
                'SERAH TERIMA SELESAI' => 'success', 'AKTIF' => 'active',
                default => 'neutral',
            },
            'contract_remaining_days' => $ppbj->contractRemainingDays(),
            'contract_duration_days' => $ppbj->contractDurationDays(),
            'contract_start_date_label' => $start?->translatedFormat('d F Y'),
            'contract_end_date_label' => $end?->translatedFormat('d F Y'),
            'contract_end_short_label' => $end?->translatedFormat('d M Y'),
            'contract_end_date_source_label' => $ppbj->contractEndDateSourceLabel(),
            'contract_explanation' => $ppbj->contractExplanation(),
            'handover_is_complete' => $ppbj->isHandoverComplete(),
            'handover_date_label' => $handover?->translatedFormat('d F Y'),
            'handover_deviation_days' => $ppbj->handoverDeviationDays(),
            'handover_performance_label' => $ppbj->handoverPerformanceLabel(),
            'general_registered_at' => $ppbj->general_registered_at?->locale('id')->translatedFormat('d F Y H:i'),
        ]);
    }
}
