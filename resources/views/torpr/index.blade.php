@extends('layouts.app')

@section('title', 'TORPR (Operasional)')


@push('styles')
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <style>
        .torpr-page,
        .torpr-page button,
        .torpr-page input,
        .torpr-page select,
        .torpr-page textarea {
            font-family: 'Montserrat', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* ===== SELECT2 TORPR - dibuat menyatu dengan style input Tailwind ===== */
        .select2-container {
            width: 100% !important;
            font-size: 0.875rem;
        }

        .select2-container--default .select2-selection--single {
            height: 42px !important;
            min-height: 42px !important;
            border: 1px solid #000000 !important;
            border-radius: 0.5rem !important;
            background-color: #ffffff !important;
            transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease;
            outline: none !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            height: 42px !important;
            line-height: 42px !important;
            padding-left: 0.75rem !important;
            padding-right: 2.5rem !important;
            color: #111827 !important;
            font-weight: 400;
        }

        .select2-container--default .select2-selection--single .select2-selection__placeholder {
            color: #9ca3af !important;
            font-weight: 400;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 40px !important;
            right: 0.55rem !important;
            top: 0 !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__clear {
            float: right !important;
            height: 40px !important;
            line-height: 40px !important;
            margin-right: 2rem !important;
            color: #6b7280 !important;
            font-size: 1rem !important;
            font-weight: 700 !important;
        }

        /* ===== SELECT2 MULTIPLE UNTUK FILTER PORTOFOLIO ===== */
        .select2-container--default .select2-selection--multiple {
            min-height: 42px !important;
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            background-color: #ffffff !important;
            padding: 0.25rem 0.35rem !important;
            transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease;
            outline: none !important;
        }

        .select2-container--default .select2-selection--multiple .select2-selection__rendered {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            gap: 0.25rem !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .select2-container--default .select2-selection--multiple .select2-selection__choice {
            display: inline-flex !important;
            align-items: center !important;
            max-width: 100% !important;
            margin: 0.125rem !important;
            border: 1px solid #bfdbfe !important;
            border-radius: 9999px !important;
            background-color: #eff6ff !important;
            color: #1d4ed8 !important;
            padding: 0.15rem 0.55rem 0.15rem 1.45rem !important;
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            line-height: 1.35rem !important;
        }

        .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
            left: 0.45rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            border-right: 0 !important;
            color: #2563eb !important;
            font-weight: 900 !important;
        }

        .select2-container--default .select2-selection--multiple .select2-search--inline .select2-search__field {
            height: 28px !important;
            line-height: 28px !important;
            margin: 0 !important;
            color: #111827 !important;
            font-size: 0.875rem !important;
        }

        .select2-container--default.select2-container--focus .select2-selection--multiple,
        .select2-container--default.select2-container--open .select2-selection--multiple,
        .select2-container--default.select2-container--focus .select2-selection--single,
        .select2-container--default.select2-container--open .select2-selection--single {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25) !important;
        }

        .select2-dropdown {
            border: 1px solid #d1d5db !important;
            border-radius: 0.75rem !important;
            overflow: hidden !important;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18) !important;
            z-index: 10000 !important;
            background: #ffffff !important;
        }

        .select2-search--dropdown {
            padding: 0.65rem !important;
            background: #ffffff !important;
        }

        .select2-container--default .select2-search--dropdown .select2-search__field {
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            padding: 0.55rem 0.7rem !important;
            outline: none !important;
            color: #111827 !important;
            background: #ffffff !important;
        }

        .select2-container--default .select2-search--dropdown .select2-search__field:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.18) !important;
        }

        .select2-results__option {
            padding: 0.6rem 0.8rem !important;
            color: #111827;
        }

        .select2-container--default .select2-results__option--highlighted[aria-selected] {
            background-color: #2563eb !important;
            color: #ffffff !important;
        }

        .select2-container--default .select2-results__option--selected {
            background-color: #eff6ff !important;
            color: #1d4ed8 !important;
            font-weight: 600;
        }

        /* ===== DARK MODE ===== */
        .dark .select2-container--default .select2-selection--single {
            background-color: #111827 !important;
            border-color: #374151 !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #ffffff !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__placeholder,
        .dark .select2-container--default .select2-selection--single .select2-selection__clear {
            color: #9ca3af !important;
        }

        .dark .select2-container--default .select2-selection--multiple {
            background-color: #111827 !important;
            border-color: #374151 !important;
        }

        .dark .select2-container--default .select2-selection--multiple .select2-selection__choice {
            border-color: #1e3a8a !important;
            background-color: rgba(30, 58, 138, 0.45) !important;
            color: #dbeafe !important;
        }

        .dark .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
            color: #bfdbfe !important;
        }

        .dark .select2-container--default .select2-selection--multiple .select2-search--inline .select2-search__field {
            color: #ffffff !important;
        }

        .dark .select2-dropdown {
            background-color: #111827 !important;
            border-color: #374151 !important;
            color: #f9fafb !important;
        }

        .dark .select2-search--dropdown {
            background-color: #111827 !important;
        }

        .dark .select2-container--default .select2-search--dropdown .select2-search__field {
            background-color: #0f172a !important;
            border-color: #374151 !important;
            color: #ffffff !important;
        }

        .dark .select2-results__option {
            color: #f9fafb !important;
        }

        .dark .select2-container--default .select2-results__option--selected {
            background-color: #1f2937 !important;
            color: #ffffff !important;
        }

        .dark .select2-container--default .select2-results__option--highlighted[aria-selected] {
            background-color: #2563eb !important;
            color: #ffffff !important;
        }

        /* ===== FORM GUIDANCE NOTICE ===== */
        .form-guidance-card {
            position: relative;
            overflow: hidden;
            animation: formNoticeEnter .45s ease-out;
        }

        .form-guidance-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.08) 35%, rgba(255,255,255,.28) 50%, rgba(255,255,255,.08) 65%, transparent 100%);
            transform: translateX(-120%);
            animation: formNoticeShimmer 3.6s linear infinite;
            pointer-events: none;
        }

        .form-guidance-icon {
            animation: formNoticePulse 2s ease-in-out infinite;
        }

        .form-guidance-item {
            animation: formNoticeItem .35s ease-out both;
        }

        .form-guidance-item:nth-child(1) { animation-delay: .05s; }
        .form-guidance-item:nth-child(2) { animation-delay: .1s; }
        .form-guidance-item:nth-child(3) { animation-delay: .15s; }
        .form-guidance-item:nth-child(4) { animation-delay: .2s; }
        .form-guidance-item:nth-child(5) { animation-delay: .25s; }
        .form-guidance-item:nth-child(6) { animation-delay: .3s; }

        @keyframes formNoticeEnter {
            0% { opacity: 0; transform: translateY(-10px) scale(.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes formNoticeShimmer {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(140%); }
        }

        @keyframes formNoticePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }

        @keyframes formNoticeItem {
            0% { opacity: 0; transform: translateX(-6px); }
            100% { opacity: 1; transform: translateX(0); }
        }

        /* ===== FORCE WHITE TEXT FOR FORM GUIDANCE IN DARK MODE ===== */
        .dark #formGuidanceBox,
        .dark #formGuidanceBox p,
        .dark #formGuidanceBox li,
        .dark #formGuidanceBox span,
        .dark #formGuidanceBox strong,
        .dark #formGuidanceBox h3,
        .dark #formGuidanceBox ol,
        .dark #formGuidanceBox div {
            color: #ffffff !important;
        }

        .dark #formGuidanceBox .text-sky-100,
        .dark #formGuidanceBox .text-sky-200,
        .dark #formGuidanceBox .text-sky-300,
        .dark #formGuidanceBox .text-gray-200,
        .dark #formGuidanceBox .text-slate-100,
        .dark #formGuidanceBox .text-slate-200 {
            color: #ffffff !important;
        }

        .dark #formGuidanceBox #formGuidanceMessage,
        .dark #formGuidanceBox #formGuidanceList,
        .dark #formGuidanceBox #formGuidanceList span {
            color: #ffffff !important;
            opacity: 1 !important;
        }

        .dark #formGuidanceBox #formGuidanceSubtitle {
            color: #ffffff !important;
            opacity: .95 !important;
        }

        .dark #formGuidanceBox #formGuidanceBadge {
            color: #ffffff !important;
            background-color: rgba(37, 99, 235, .35) !important;
            border-color: rgba(147, 197, 253, .45) !important;
        }

        .dark #formGuidanceBox .rounded-xl {
            background-color: rgba(15, 23, 42, .96) !important;
        }

        .dark #formGuidanceBox .rounded-lg {
            color: #ffffff !important;
        }

        /* ===== TORPR COMPACT ACTIONS & ALERT CONTRAST ===== */
        .torpr-action-stack {
            gap: .35rem;
        }

        .torpr-action-row {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .35rem;
            flex-wrap: wrap;
        }

        .torpr-action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .25rem;
            min-height: 1.85rem;
            padding: .38rem .58rem;
            border-radius: .62rem;
            font-size: .68rem;
            line-height: 1;
            font-weight: 800;
            white-space: nowrap;
            transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
        }

        .torpr-action-btn:hover {
            transform: translateY(-1px);
            filter: brightness(1.03);
        }

        .torpr-action-btn:active {
            transform: scale(.96);
        }

        .torpr-action-btn svg {
            width: .82rem;
            height: .82rem;
        }

        .torpr-action-btn.is-disabled {
            cursor: not-allowed;
            opacity: .75;
            transform: none;
            filter: none;
        }

        .torpr-action-btn.is-locked {
            background: #334155 !important;
            border: 1px solid rgba(148, 163, 184, .58) !important;
            color: #ffffff !important;
            box-shadow: 0 10px 22px rgba(51, 65, 85, .18);
        }

        .torpr-action-btn.is-locked:hover {
            background: #1e293b !important;
            color: #ffffff !important;
        }

        .torpr-action-btn.is-pending {
            background: #fef3c7 !important;
            border: 1px solid #f59e0b !important;
            color: #92400e !important;
        }

        .torpr-action-btn.is-pending:hover {
            background: #fde68a !important;
            color: #78350f !important;
        }

        html.dark .torpr-action-btn.is-locked,
        .dark .torpr-action-btn.is-locked {
            background: #f8fafc !important;
            border-color: #e2e8f0 !important;
            color: #0f172a !important;
        }

        html.dark .torpr-action-btn.is-locked:hover,
        .dark .torpr-action-btn.is-locked:hover {
            background: #e2e8f0 !important;
            color: #020617 !important;
        }

        html.dark .torpr-action-btn.is-pending,
        .dark .torpr-action-btn.is-pending {
            background: #78350f !important;
            border-color: #fbbf24 !important;
            color: #fff7ed !important;
        }

        .torpr-request-center-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .55rem;
            min-height: 2.65rem;
            border-radius: .75rem;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #0f172a;
            padding: .55rem 1rem;
            font-weight: 900;
            box-shadow: 0 12px 28px rgba(15, 23, 42, .1);
            transition: transform .15s ease, background .15s ease, box-shadow .15s ease;
        }

        .torpr-request-center-button:hover {
            background: #f8fafc;
            transform: translateY(-1px);
            box-shadow: 0 16px 34px rgba(15, 23, 42, .16);
        }

        .torpr-request-count-badge {
            display: inline-flex;
            min-width: 1.35rem;
            height: 1.35rem;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            background: #dc2626;
            color: #ffffff;
            padding: 0 .38rem;
            font-size: .72rem;
            font-weight: 950;
            line-height: 1;
            box-shadow: 0 10px 18px rgba(220, 38, 38, .28);
        }

        html.dark .torpr-request-center-button,
        .dark .torpr-request-center-button {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #ffffff !important;
        }

        html.dark .torpr-request-center-button:hover,
        .dark .torpr-request-center-button:hover {
            background: #334155 !important;
        }

        html.dark .torpr-request-count-badge,
        .dark .torpr-request-count-badge {
            background: #ef4444 !important;
            color: #ffffff !important;
        }

        .torpr-edit-request-card {
            border-radius: 1rem;
            border: 1px solid #bfdbfe;
            background: #dbeafe;
            color: #172554;
            padding: .95rem;
            text-align: left;
            font-size: .84rem;
            line-height: 1.65;
            font-weight: 700;
        }

        .torpr-edit-request-card strong {
            color: #172554;
            font-weight: 950;
        }

        .torpr-edit-request-template {
            margin-top: .7rem;
            border-radius: .9rem;
            border: 1px dashed #93c5fd;
            background: #ffffff;
            color: #0f172a;
            padding: .8rem;
            text-align: left;
            font-size: .8rem;
            line-height: 1.6;
            font-weight: 650;
        }

        .torpr-edit-request-help {
            margin: .25rem 0 .55rem;
            color: #475569;
            font-size: .76rem;
            font-weight: 800;
            line-height: 1.55;
        }

        .torpr-edit-request-reason {
            min-height: 6.2rem;
            width: 100%;
            resize: vertical;
            border-radius: .9rem;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #0f172a;
            padding: .85rem;
            font-size: .86rem;
            font-weight: 700;
            line-height: 1.6;
        }

        .torpr-edit-request-reason::placeholder {
            color: #64748b;
        }

        html.dark .torpr-edit-request-card,
        .dark .torpr-edit-request-card {
            background: #172554 !important;
            border-color: #60a5fa !important;
            color: #eff6ff !important;
        }

        html.dark .torpr-edit-request-card strong,
        .dark .torpr-edit-request-card strong {
            color: #ffffff !important;
        }

        html.dark .torpr-edit-request-template,
        .dark .torpr-edit-request-template {
            background: #0f172a !important;
            border-color: #475569 !important;
            color: #f8fafc !important;
        }

        html.dark .torpr-edit-request-help,
        .dark .torpr-edit-request-help {
            color: #cbd5e1 !important;
        }

        html.dark .torpr-edit-request-reason,
        .dark .torpr-edit-request-reason {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #ffffff !important;
        }

        html.dark .torpr-edit-request-reason::placeholder,
        .dark .torpr-edit-request-reason::placeholder {
            color: #cbd5e1 !important;
        }

        .torpr-request-center-row {
            border-radius: 1rem;
            border: 1px solid #dbeafe;
            background: #ffffff;
            color: #0f172a;
            padding: .9rem;
            box-shadow: 0 12px 30px rgba(15, 23, 42, .08);
        }

        html.dark .torpr-request-center-row,
        .dark .torpr-request-center-row {
            background: #111827 !important;
            border-color: #334155 !important;
            color: #f8fafc !important;
        }

        .torpr-request-center-note {
            border-radius: 1.1rem;
            border: 1px solid #bfdbfe;
            background: #dbeafe;
            color: #172554;
            padding: .95rem;
            font-size: .86rem;
            font-weight: 800;
            line-height: 1.65;
        }

        .torpr-request-center-title {
            margin-bottom: .55rem;
            color: #0f172a;
            font-size: .9rem;
            font-weight: 950;
        }

        .torpr-request-center-empty {
            border-radius: 1rem;
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            color: #334155;
            padding: .95rem;
            font-size: .86rem;
            font-weight: 800;
        }

        .torpr-request-center-pr {
            color: #0f172a;
            font-weight: 950;
        }

        .torpr-request-center-sub {
            margin-top: .25rem;
            color: #475569;
            font-size: .78rem;
            font-weight: 800;
        }

        .torpr-request-center-meta {
            margin-top: .65rem;
            color: #334155;
            font-size: .75rem;
            line-height: 1.55;
            font-weight: 800;
        }

        .torpr-request-center-reason {
            margin-top: .7rem;
            border-radius: .85rem;
            border: 1px solid #bfdbfe;
            background: #eff6ff;
            color: #1e3a8a;
            padding: .75rem;
            font-size: .78rem;
            font-weight: 800;
            line-height: 1.55;
        }

        .torpr-request-center-actions {
            display: flex;
            flex-shrink: 0;
            gap: .5rem;
        }

        .torpr-request-center-actions button {
            border-radius: .75rem;
            padding: .55rem .85rem;
            color: #ffffff;
            font-size: .75rem;
            font-weight: 950;
            transition: transform .15s ease, filter .15s ease;
        }

        .torpr-request-center-actions button:hover {
            transform: translateY(-1px);
            filter: brightness(1.04);
        }

        .torpr-request-center-approve {
            background: #16a34a;
        }

        .torpr-request-center-reject {
            background: #dc2626;
        }

        .torpr-request-status {
            display: inline-flex;
            height: fit-content;
            align-items: center;
            border-radius: 999px;
            padding: .35rem .8rem;
            font-size: .72rem;
            font-weight: 950;
            text-transform: uppercase;
        }

        .torpr-request-status.is-approved {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }

        .torpr-request-status.is-rejected {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }

        .torpr-request-status.is-pending {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
        }

        html.dark .torpr-request-center-note,
        .dark .torpr-request-center-note {
            background: #172554 !important;
            border-color: #60a5fa !important;
            color: #dbeafe !important;
        }

        html.dark .torpr-request-center-title,
        .dark .torpr-request-center-title,
        html.dark .torpr-request-center-pr,
        .dark .torpr-request-center-pr {
            color: #ffffff !important;
        }

        html.dark .torpr-request-center-empty,
        .dark .torpr-request-center-empty {
            background: #0f172a !important;
            border-color: #334155 !important;
            color: #e2e8f0 !important;
        }

        html.dark .torpr-request-center-sub,
        .dark .torpr-request-center-sub,
        html.dark .torpr-request-center-meta,
        .dark .torpr-request-center-meta {
            color: #cbd5e1 !important;
        }

        html.dark .torpr-request-center-reason,
        .dark .torpr-request-center-reason {
            background: #172554 !important;
            border-color: #3b82f6 !important;
            color: #eff6ff !important;
        }

        html.dark .torpr-request-status.is-approved,
        .dark .torpr-request-status.is-approved {
            background: #064e3b !important;
            color: #d1fae5 !important;
            border-color: #10b981 !important;
        }

        html.dark .torpr-request-status.is-rejected,
        .dark .torpr-request-status.is-rejected {
            background: #7f1d1d !important;
            color: #fee2e2 !important;
            border-color: #ef4444 !important;
        }

        html.dark .torpr-request-status.is-pending,
        .dark .torpr-request-status.is-pending {
            background: #78350f !important;
            color: #fff7ed !important;
            border-color: #f59e0b !important;
        }

        .torpr-delete-popup {
            border: 1px solid rgba(226, 232, 240, .9) !important;
            box-shadow: 0 28px 80px rgba(15, 23, 42, .28) !important;
        }

        .dark .torpr-delete-popup {
            background: #0f172a !important;
            color: #f8fafc !important;
            border-color: rgba(71, 85, 105, .95) !important;
            box-shadow: 0 28px 80px rgba(0, 0, 0, .65) !important;
        }

        .torpr-delete-popup .swal2-title,
        .torpr-delete-popup .swal2-html-container,
        .torpr-delete-popup .swal2-input-label {
            color: #0f172a !important;
        }

        .dark .torpr-delete-popup .swal2-title,
        .dark .torpr-delete-popup .swal2-html-container,
        .dark .torpr-delete-popup .swal2-input-label {
            color: #f8fafc !important;
        }

        .torpr-delete-popup .swal2-input {
            height: 2.7rem !important;
            border-radius: .8rem !important;
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
        }

        .dark .torpr-delete-popup .swal2-input {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #ffffff !important;
        }

        .dark .torpr-delete-popup .swal2-input::placeholder {
            color: #94a3b8 !important;
        }

        .torpr-delete-danger,
        .torpr-delete-warning {
            border-radius: .9rem;
            padding: .85rem;
            font-size: .82rem;
            font-weight: 700;
            line-height: 1.65;
            text-align: left;
        }

        .torpr-delete-danger {
            background: #fff1f2;
            border: 1px solid #fca5a5;
            color: #991b1b;
        }

        .torpr-delete-danger-title {
            color: #7f1d1d;
            font-weight: 900;
            margin-bottom: .25rem;
        }

        .torpr-delete-warning {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            color: #92400e;
        }

        .torpr-delete-warning strong {
            color: #78350f;
            font-weight: 900;
        }

        html.dark .torpr-delete-danger,
        .dark .torpr-delete-danger {
            background: #7f1d1d !important;
            border-color: #f87171 !important;
            color: #ffffff !important;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
        }

        html.dark .torpr-delete-danger-title,
        .dark .torpr-delete-danger-title {
            color: #ffffff !important;
        }

        html.dark .torpr-delete-warning,
        .dark .torpr-delete-warning {
            background: #78350f !important;
            border-color: #fbbf24 !important;
            color: #fff7ed !important;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
        }

        html.dark .torpr-delete-warning strong,
        .dark .torpr-delete-warning strong {
            color: #ffffff !important;
        }

        .torpr-password-wrap {
            margin-top: .65rem;
            text-align: left;
        }

        .torpr-password-label {
            display: block;
            margin-bottom: .45rem;
            color: #0f172a;
            font-size: .9rem;
            font-weight: 800;
        }

        .torpr-password-field {
            display: flex;
            align-items: center;
            gap: .45rem;
            border: 1px solid #cbd5e1;
            border-radius: .85rem;
            background: #ffffff;
            padding: .2rem .25rem .2rem .75rem;
        }

        .torpr-password-field input {
            flex: 1;
            min-width: 0;
            border: 0;
            outline: none;
            background: transparent;
            color: #0f172a;
            font-size: .95rem;
            font-weight: 700;
            height: 2.35rem;
        }

        .torpr-password-field input::placeholder {
            color: #94a3b8;
            font-weight: 600;
        }

        .torpr-password-toggle {
            border: 0;
            border-radius: .65rem;
            background: #e0f2fe;
            color: #075985;
            cursor: pointer;
            font-size: .78rem;
            font-weight: 900;
            padding: .55rem .7rem;
            transition: .18s ease;
        }

        .torpr-password-toggle:hover {
            background: #bae6fd;
            transform: translateY(-1px);
        }

        .torpr-password-help {
            margin-top: .45rem;
            color: #64748b;
            font-size: .72rem;
            font-weight: 700;
            line-height: 1.45;
        }

        html.dark .torpr-password-label,
        .dark .torpr-password-label {
            color: #f8fafc !important;
        }

        html.dark .torpr-password-field,
        .dark .torpr-password-field {
            background: #1e293b !important;
            border-color: #64748b !important;
            box-shadow: 0 0 0 1px rgba(148, 163, 184, .12);
        }

        html.dark .torpr-password-field input,
        .dark .torpr-password-field input {
            color: #ffffff !important;
        }

        html.dark .torpr-password-field input::placeholder,
        .dark .torpr-password-field input::placeholder {
            color: #cbd5e1 !important;
        }

        html.dark .torpr-password-toggle,
        .dark .torpr-password-toggle {
            background: #2563eb !important;
            color: #ffffff !important;
        }

        html.dark .torpr-password-toggle:hover,
        .dark .torpr-password-toggle:hover {
            background: #1d4ed8 !important;
        }

        html.dark .torpr-password-help,
        .dark .torpr-password-help {
            color: #cbd5e1 !important;
        }

        .torpr-lock-countdown {
            margin: .85rem auto .25rem;
            width: fit-content;
            min-width: 11.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #fee2e2, #ffedd5);
            border: 1px solid #fca5a5;
            color: #7f1d1d;
            font-size: 1.65rem;
            font-weight: 950;
            letter-spacing: .08em;
            padding: .75rem 1.1rem;
            text-align: center;
            box-shadow: 0 14px 35px rgba(239, 68, 68, .18);
        }

        .torpr-time-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .35rem;
            margin-top: .35rem;
            border-radius: 999px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            color: #1e3a8a;
            font-size: .76rem;
            font-weight: 900;
            padding: .4rem .75rem;
        }

        .torpr-lock-preview {
            margin-top: .5rem;
            border-radius: .9rem;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            color: #334155;
            font-size: .76rem;
            font-weight: 800;
            line-height: 1.55;
            padding: .7rem .85rem;
            text-align: left;
        }

        .torpr-lock-preview strong {
            color: #0f172a;
            font-weight: 950;
        }

        .torpr-lock-preview-row {
            display: flex;
            align-items: flex-start;
            gap: .45rem;
        }

        .torpr-lock-preview-row + .torpr-lock-preview-row {
            margin-top: .35rem;
        }

        .torpr-lock-caption {
            color: #475569;
            font-size: .82rem;
            font-weight: 700;
            line-height: 1.55;
            text-align: center;
        }

        html.dark .torpr-lock-countdown,
        .dark .torpr-lock-countdown {
            background: linear-gradient(135deg, #7f1d1d, #9a3412) !important;
            border-color: #fb7185 !important;
            color: #ffffff !important;
            box-shadow: 0 14px 35px rgba(248, 113, 113, .2);
        }

        html.dark .torpr-time-pill,
        .dark .torpr-time-pill {
            background: #172554 !important;
            border-color: #3b82f6 !important;
            color: #dbeafe !important;
        }

        html.dark .torpr-lock-preview,
        .dark .torpr-lock-preview {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #e2e8f0 !important;
        }

        html.dark .torpr-lock-preview strong,
        .dark .torpr-lock-preview strong {
            color: #ffffff !important;
        }

        html.dark .torpr-lock-caption,
        .dark .torpr-lock-caption {
            color: #e2e8f0 !important;
        }

        .torpr-info-timeline {
            position: relative;
        }

        .torpr-info-timeline::before {
            content: '';
            position: absolute;
            left: 13px;
            top: 18px;
            bottom: 18px;
            width: 2px;
            background: linear-gradient(180deg, #3b82f6, #10b981, #f59e0b);
            opacity: .38;
        }

        .torpr-info-step {
            position: relative;
            padding-left: 42px;
        }

        .torpr-info-dot {
            position: absolute;
            left: 0;
            top: 2px;
            width: 28px;
            height: 28px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 22px rgba(15, 23, 42, .15);
        }

        .dark .torpr-info-dot {
            box-shadow: 0 10px 22px rgba(0, 0, 0, .38);
        }

    </style>
@endpush

@section('content')
<div class="torpr-page">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between animate-slide-down">
        <div>
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">📄 TORPR</h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">
                Input TOR & PR (Operasional) + Request penerimaan Umum
                @if(isset($isHeavy) && $isHeavy)
                    <span
                        class="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded text-xs font-semibold">
                        ⚡ Mode Performa Tinggi
                    </span>
                @endif
            </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
            <button type="button" onclick="openTorprEditRequestCenter()"
                class="torpr-request-center-button group active:scale-95">
                <span class="text-lg">🔐</span>
                <span>Req Edit</span>
                @if(($incomingEditRequests->count() + $outgoingEditRequests->where('status', 'pending')->count()) > 0)
                    <span class="torpr-request-count-badge" aria-label="Jumlah request edit aktif">
                        {{ $incomingEditRequests->count() + $outgoingEditRequests->where('status', 'pending')->count() }}
                    </span>
                @endif
            </button>

            {{-- Import Button --}}
            <button type="button" onclick="openImportModal()"
                class="group inline-flex items-center gap-2 rounded-lg
                                                                                                                                                                                                                                                                                                              bg-blue-100 text-blue-800
                                                                                                                                                                                                                                                                                                              hover:bg-blue-200 hover:shadow-md
                                                                                                                                                                                                                                                                                                              dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600
                                                                                                                                                                                                                                                                                                              px-4 py-2 font-semibold transition-all active:scale-95">
                <span class="opacity-70 group-hover:opacity-100 transition text-xl">📤</span>
                <span class="text-blue-900 dark:text-white">Import Excel</span>
            </button>

            {{-- Export Button with Confirmation --}}
            <button type="button" onclick="confirmExport()"
                class="group inline-flex items-center gap-2 rounded-lg
                                                                                                                                                                                                                                                                                                              bg-blue-100 text-blue-800
                                                                                                                                                                                                                                                                                                              hover:bg-blue-200 hover:shadow-md
                                                                                                                                                                                                                                                                                                              dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600
                                                                                                                                                                                                                                                                                                              px-4 py-2 font-semibold transition-all active:scale-95">
                <span class="opacity-70 group-hover:opacity-100 transition text-xl">📥</span>
                <span class="text-blue-900 dark:text-white">Export Full</span>
            </button>

            {{-- Add Button --}}
            <button type="button" onclick="openCreateForm()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 hover:shadow-lg active:scale-95 transition-all">
                <span>+ Tambah TORPR</span>
            </button>
        </div>
    </div>

    @php
        $selectedPortofolios = array_values(array_filter(array_map('trim', (array) request('portofolio', []))));
    @endphp

    {{-- Filter Form --}}
    <form method="GET" id="filterForm"
        class="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 animate-fade-in">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">

            {{-- Search Input --}}
            <div class="md:col-span-2 lg:col-span-2">
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    🔍 Cari
                </label>
                <input type="text" name="q" placeholder="Nomor PR / Tujuan / Portofolio..." value="{{ request('q') }}"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                   placeholder-gray-400 dark:placeholder-gray-600
                                                                                                                                                                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
            </div>

            {{-- Status Receipt --}}
            <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    📊 Status
                </label>
                <select name="receipt_status"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                    <option value="">Semua Status</option>
                    <option value="PENDING" {{ request('receipt_status') === 'PENDING' ? 'selected' : '' }}>⏳PENDING</option>
                    <option value="APPROVED" {{ request('receipt_status') === 'APPROVED' ? 'selected' : '' }}>✓ APPROVED
                    </option>
                    <option value="REJECTED" {{ request('receipt_status') === 'REJECTED' ? 'selected' : '' }}>✗ REJECTED
                    </option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    🧩 Portofolio
                </label>
                <select name="portofolio[]" multiple class="select2-torpr-filter-portofolio w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                               bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                    data-placeholder="Pilih satu / beberapa portofolio...">
                    @foreach(($portofolios ?? []) as $p)
                        <option value="{{ $p }}" {{ in_array($p, $selectedPortofolios, true) ? 'selected' : '' }}>{{ $p }}</option>
                    @endforeach
                </select>
                <p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                    Bisa pilih 1, 2, 3, atau banyak portofolio sekaligus.
                </p>
            </div>

            <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    👤 Pemilik Data
                </label>
                <select name="data_owner"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                    <option value="">Semua Data</option>
                    <option value="me" {{ request('data_owner') === 'me' ? 'selected' : '' }}>Data Saya Saja</option>
                </select>
            </div>

            @auth
                @if(auth()->user()->department === 'operasional' && auth()->user()->role === 'superadmin')
                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ✍️ Status TTD
                        </label>
                        <select name="sign_status"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                                                                                                                                                                                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                                                                                                                                                                                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                            <option value="">Semua Status</option>
                            <option value="unsigned_kabid" {{ request('sign_status') === 'unsigned_kabid' ? 'selected' : '' }}>
                                ⏳ Belum TTD Kabid
                            </option>
                            <option value="unsigned_kacab" {{ request('sign_status') === 'unsigned_kacab' ? 'selected' : '' }}>
                                ⏳ Belum TTD Kacab
                            </option>
                            <option value="signed_all" {{ request('sign_status') === 'signed_all' ? 'selected' : '' }}>
                                ✓ Sudah Lengkap
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ⚠️ Kelengkapan Data
                        </label>
                        <select name="incomplete_data"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                                                                                                                                                                                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                                                                                                                                                                                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                            <option value="">Semua Data</option>
                            <option value="1" {{ request('incomplete_data') === '1' ? 'selected' : '' }}>
                                ❗ Data Tidak Lengkap
                            </option>
                        </select>
                    </div>
                @endif
            @endauth

            {{-- Date Filter Type --}}
            <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    📅 Filter Tanggal
                </label>
                <select name="date_filter" id="dateFilterType" onchange="toggleDateInputs(this.value)"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                    <option value="">Semua Tanggal</option>
                    <option value="today" {{ request('date_filter') === 'today' ? 'selected' : '' }}>Hari Ini</option>
                    <option value="yesterday" {{ request('date_filter') === 'yesterday' ? 'selected' : '' }}>Kemarin</option>
                    <option value="last7days" {{ request('date_filter') === 'last7days' ? 'selected' : '' }}>7 Hari Terakhir
                    </option>
                    <option value="last30days" {{ request('date_filter') === 'last30days' ? 'selected' : '' }}>30 Hari
                        Terakhir</option>
                    <option value="this_month" {{ request('date_filter') === 'this_month' ? 'selected' : '' }}>Bulan Ini
                    </option>
                    <option value="last_month" {{ request('date_filter') === 'last_month' ? 'selected' : '' }}>Bulan Lalu
                    </option>
                    <option value="this_year" {{ request('date_filter') === 'this_year' ? 'selected' : '' }}>Tahun Ini
                    </option>
                    <option value="custom" {{ request('date_filter') === 'custom' ? 'selected' : '' }}>Custom Range</option>
                </select>
            </div>

            {{-- Date From (Hidden by default) --}}
            <div id="dateFromContainer" class="{{ request('date_filter') === 'custom' ? '' : 'hidden' }}">
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    📆 Dari Tanggal
                </label>
                <input type="date" name="date_from" id="dateFrom" value="{{ request('date_from') }}"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
            </div>

            {{-- Date To (Hidden by default) --}}
            <div id="dateToContainer" class="{{ request('date_filter') === 'custom' ? '' : 'hidden' }}">
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    📆 Sampai Tanggal
                </label>
                <input type="date" name="date_to" id="dateTo" value="{{ request('date_to') }}"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                                                                                                                                                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                                                                                                                                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
            </div>
        </div>

        {{-- Action Buttons --}}
        <div class="flex flex-col sm:flex-row gap-2 mt-4">
            <button type="submit"
                class="flex-1 sm:flex-initial px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg
                                                                                                                                                                                               shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                    </path>
                </svg>
                Filter
            </button>

            <a href="{{ route('torpr.index') }}"
                class="flex-1 sm:flex-initial px-6 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg
                                                                                                                                                                                               hover:bg-gray-300 dark:hover:bg-gray-700 transition-all active:scale-95 inline-flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                    </path>
                </svg>
                Reset
            </a>

            {{-- Active Filter Badge --}}
            @if(request()->hasAny(['q', 'receipt_status', 'portofolio', 'date_filter']))
                <div
                    class="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-lg
                                                                                                                                                                                                                                                                                                                                                                                inline-flex items-center justify-center gap-2 text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Filter Aktif
                </div>
            @endif
        </div>

        {{-- Active Filters Display --}}
        @if(request()->hasAny(['q', 'receipt_status', 'portofolio', 'date_filter']))
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap gap-2">
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-400 py-1">Filter Aktif:</span>

                    @if(request('q'))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                            🔍 "{{ request('q') }}"
                        </span>
                    @endif

                    @if(request('receipt_status'))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                            📊 {{ request('receipt_status') }}
                        </span>
                    @endif

                    @if(!empty($selectedPortofolios))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium">
                            🧩 {{ implode(', ', $selectedPortofolios) }}
                        </span>
                    @endif

                    @if(request('data_owner') === 'me')
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-xs font-medium">
                            👤 Data Saya
                        </span>
                    @endif

                    @if(request('sign_status'))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-xs font-medium">
                            ✍️ TTD: {{ str_replace('_', ' ', request('sign_status')) }}
                        </span>
                    @endif

                    @if(request('incomplete_data'))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-medium">
                            ❗ Data Tidak Lengkap
                        </span>
                    @endif

                    @if(request('date_filter'))
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                            📅 {{ ucwords(str_replace('_', ' ', request('date_filter'))) }}
                            @if(request('date_filter') === 'custom' && request('date_from') && request('date_to'))
                                : {{ \Carbon\Carbon::parse(request('date_from'))->format('d M Y') }} -
                                {{ \Carbon\Carbon::parse(request('date_to'))->format('d M Y') }}
                            @endif
                        </span>
                    @endif
                </div>
            </div>
        @endif
    </form>
    {{-- Table --}}
    <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
        {{-- Pagination Info & Controls (Top) --}}
        <div
            class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 bg-gray-50 dark:bg-gray-800">
            <div class="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan
                <span class="font-semibold text-gray-900 dark:text-white">{{ $rows->firstItem() ?? 0 }}</span>
                -
                <span class="font-semibold text-gray-900 dark:text-white">{{ $rows->lastItem() ?? 0 }}</span>
                dari
                <span class="font-semibold text-gray-900 dark:text-white">{{ $rows->total() }}</span>
                data
            </div>

            {{-- Per Page Selector --}}
            <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600 dark:text-gray-400">Tampilkan:</label>
                <select onchange="changePerPage(this.value)"
                    class="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                    <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25</option>
                    <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50</option>
                    <option value="100" {{ request('per_page') == 100 ? 'selected' : '' }}>100</option>
                </select>
            </div>
        </div>

        {{-- Table Content --}}
        <div class="overflow-x-auto">
            <table class="min-w-[1260px] w-full text-sm table-fixed">
                <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr class="text-gray-700 dark:text-white">
                        <th class="px-4 py-3 text-left">Nomor PR</th>
                        <th class="px-4 py-3 text-left">Tujuan</th>
                        <th class="px-4 py-3 text-left">Portofolio</th>
                        <th class="px-4 py-3 text-right">Harga PR</th>
                        <th class="px-4 py-3 text-left">Tanggal PR</th>
                        <th class="px-4 py-3 text-center">Receipt</th>
                        <th class="px-4 py-3 text-center">Action</th>
                        <th class="px-4 py-3 text-center">QR TTD</th>
                    </tr>
                </thead>

                <tbody
                    class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
                    @forelse($rows as $r)
                        @php
                            // ✅ Data sudah FLAT dari Query Builder
                            $receipt = $r->approval_status ?? ($r->received_at ? 'APPROVED' : null);
                            $badge = match ($receipt) {
                                'APPROVED' => 'bg-green-600',
                                'REJECTED' => 'bg-red-600',
                                'PENDING' => 'bg-yellow-500',
                                default => 'bg-gray-400',
                            };

                            $locked = in_array($receipt, ['PENDING', 'APPROVED', 'REJECTED'], true);
                            $isCreator = (int) $r->created_by_user_id === (int) auth()->id();
                            $creatorName = $r->creator_name ?: 'Pembuat PR';
                            $creatorContact = $r->creator_email ?: 'email belum tercatat';
                            $safeNomorPr = trim((string) ($r->nomor_pr ?? '')) !== '' ? $r->nomor_pr : 'Nomor PR belum diisi';
                            $editAccessRequest = $editAccessRequests->get($r->id);
                            $hasApprovedEditAccess = $editAccessRequest
                                && $editAccessRequest->status === 'approved'
                                && $editAccessRequest->expires_at
                                && $editAccessRequest->expires_at->isFuture();
                            $hasPendingEditRequest = $editAccessRequest && $editAccessRequest->status === 'pending';
                            $editPermissionLog = $editPermissionLogs->get($r->id);
                            $editPermissionAt = $editPermissionLog?->created_at
                                ? \Carbon\Carbon::parse($editPermissionLog->created_at)->timezone('Asia/Jakarta')->format('d M Y H:i:s') . ' WIB'
                                : '-';
                            $editPermissionBy = $editPermissionLog?->user?->name ?: 'user';
                            $editPermissionTitle = $editPermissionLog
                                ? "Diedit dengan izin oleh {$editPermissionBy} pada {$editPermissionAt}"
                                : '';

                            // ✅ Sama seperti filter Kelengkapan Data: hanya Superadmin Operasional
                            $canRequestUmum = auth()->check()
                                && auth()->user()->department === 'operasional'
                                && auth()->user()->role === 'superadmin';
                            $isSuperadminOps = $canRequestUmum;

                            // ✅ Semua field wajib lengkap dulu sebelum Request Umum
                            $missingRequestFields = [];
                            if (empty(trim((string) ($r->tujuan_pengadaan ?? '')))) $missingRequestFields[] = 'Tujuan Pengadaan';
                            if (empty(trim((string) ($r->portofolio ?? '')))) $missingRequestFields[] = 'Portofolio';
                            if (empty(trim((string) ($r->nomor_pr ?? '')))) $missingRequestFields[] = 'Nomor PR';
                            if (empty($r->tanggal_pr)) $missingRequestFields[] = 'Tanggal PR';
                            if (empty($r->jumlah_pr) || (float) $r->jumlah_pr <= 0) $missingRequestFields[] = 'Harga PR';
                            if (empty($r->tgl_ttd_kabid_pr)) $missingRequestFields[] = 'Tanggal Ttd Kabid PR';
                            if (empty($r->tgl_ttd_kacab_pr)) $missingRequestFields[] = 'Tanggal Ttd Kacab PR';

                            $isRequestIncomplete = !empty($missingRequestFields);
                            $missingRequestText = implode(', ', $missingRequestFields);
                        @endphp

                        <tr class="{{ isset($isHeavy) && $isHeavy ? '' : 'animate-slide-in' }} transition-colors"
                            data-row-id="{{ $r->id }}" {{-- ✅ ATTRIBUT UNTUK KABID --}}
                            data-token-kabid="{{ $r->sign_token_kabid }}"
                            data-signed-kabid="{{ $r->tgl_ttd_kabid_pr ? '1' : '0' }}"
                            data-name-kabid="{{ $r->signed_by_kabid_name ?? '' }}"
                            data-date-kabid="{{ $r->tgl_ttd_kabid_pr ? \Carbon\Carbon::parse($r->tgl_ttd_kabid_pr)->format('d M Y H:i') : '' }}"
                            {{-- ✅ ATTRIBUT UNTUK KACAB --}} data-token-kacab="{{ $r->sign_token_kacab }}"
                            data-signed-kacab="{{ $r->tgl_ttd_kacab_pr ? '1' : '0' }}"
                            data-name-kacab="{{ $r->signed_by_kacab_name ?? '' }}"
                            data-date-kacab="{{ $r->tgl_ttd_kacab_pr ? \Carbon\Carbon::parse($r->tgl_ttd_kacab_pr)->format('d M Y H:i') : '' }}"
                            style="{{ isset($isHeavy) && !$isHeavy ? 'animation-delay: ' . ($loop->index * 0.03) . 's' : '' }}">

                            {{-- Nomor PR + Tombol Info --}}
                            <td class="px-4 py-3 text-gray-900 dark:text-white">
                                <div class="flex items-start gap-2">
                                    <button type="button" onclick="openInfoPrModal({{ $r->id }})"
                                        title="Lihat informasi PR {{ $r->nomor_pr ?? '' }}"
                                        class="group relative mt-0.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg
                                                       border border-blue-700 bg-blue-600 px-2.5 text-xs font-bold text-white
                                                       shadow-md shadow-blue-500/30 transition-all duration-300
                                                       hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40
                                                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                                       dark:border-blue-400/40 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400 dark:focus:ring-offset-gray-900">
                                        <span
                                            class="absolute inset-0 rounded-lg bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
                                        <svg class="relative h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <!-- <span class="relative leading-none">Info</span> -->
                                    </button>

                                    <div class="flex min-w-0 flex-col gap-1">
                                        <span class="font-mono font-semibold text-gray-900 dark:text-white">
                                            {{ $r->nomor_pr ?? '—' }}
                                        </span>
                                        @if($editPermissionLog)
                                            <span title="{{ $editPermissionTitle }}"
                                                class="inline-flex w-fit items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-black text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/70 dark:text-violet-100 dark:ring-violet-500/60">
                                                🔓 Diedit dengan izin
                                            </span>
                                        @endif
                                    </div>
                                </div>
                            </td>

                            {{-- Tujuan --}}
                            <td class="px-4 py-3 max-w-xs truncate text-gray-900 dark:text-white"
                                title="{{ $r->tujuan_pengadaan }}">
                                {{ $r->tujuan_pengadaan ?? '—' }}
                            </td>

                            {{-- Portofolio --}}
                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">
                                @if(!empty($r->portofolio))
                                            <span class="inline-flex max-w-[190px] items-center overflow-hidden rounded-full
                                       bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700
                                       ring-1 ring-slate-200
                                       dark:bg-gray-900 dark:text-white dark:ring-gray-700" title="{{ $r->portofolio }}">
                                                <span class="truncate">
                                                    {{ $r->portofolio }}
                                                </span>
                                            </span>
                                @else
                                            <span class="inline-flex items-center rounded-full
                                       bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500
                                       ring-1 ring-gray-200
                                       dark:bg-gray-900 dark:text-gray-500 dark:ring-gray-700">
                                                —
                                            </span>
                                @endif
                            </td>

                            {{-- Harga PR --}}
                            <td class="px-4 py-3 text-right whitespace-nowrap">
                                @if(!is_null($r->jumlah_pr) && $r->jumlah_pr !== '')
                                    <span class="inline-flex items-center justify-end rounded-lg
                                                 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700
                                                 ring-1 ring-emerald-100
                                                 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800/70">
                                        Rp {{ number_format((float) $r->jumlah_pr, 0, ',', '.') }}
                                    </span>
                                @else
                                    <span class="text-gray-400 dark:text-gray-500">—</span>
                                @endif
                            </td>

                            {{-- Tanggal TOR --}}

                            {{-- Tanggal PR --}}
                            <td class="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">
                                {{ $r->tanggal_pr ? \Carbon\Carbon::parse($r->tanggal_pr)->format('d M Y H:i') : '—' }}
                            </td>

                            {{-- Receipt Status --}}
                            <td class="px-4 py-3 text-center">
                                <span
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white {{ $badge }}"
                                    data-receipt-badge>
                                    {{ $receipt ?? '—' }}
                                </span>
                                <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-1" data-receipt-sub>
                                    @if($receipt === 'APPROVED')
                                        diterima: {{ $r->received_by_name ?? 'Umum' }}
                                    @elseif($receipt === 'REJECTED')
                                        ditolak: {{ $r->approved_by_name ?? 'Umum' }}
                                    @elseif($receipt === 'PENDING')
                                        menunggu umum
                                    @else
                                        —
                                    @endif
                                </div>
                            </td>

                            {{-- Action --}}
                            <td class="px-4 py-3 text-center">
                                <div class="torpr-action-stack flex flex-col items-center">
                                    <button type="button" onclick="showLogModal({{ $r->id }})"
                                        class="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-medium transition-all">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Log
                                    </button>
                                    <button type="button" onclick="shareRecordToChat('pr', {{ $r->id }})"
                                        class="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-600 dark:text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-xs font-bold transition-all active:scale-95"
                                        title="Kirim follow up cepat PR ini ke Chat Tim">
                                        <span aria-hidden="true">💬</span>
                                        Follow Up
                                    </button>
                                    @if(!$locked)
                                        <div class="torpr-action-row">
                                            @if($isSuperadminOps || $isCreator || $hasApprovedEditAccess)
                                                <button type="button" onclick="openEditForm({{ $r->id }})"
                                                    class="torpr-action-btn bg-amber-500 text-white shadow-sm shadow-amber-500/20 hover:bg-amber-600 dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    {{ $isSuperadminOps ? 'Edit' : ($isCreator ? 'Edit' : 'Edit Izin') }}
                                                </button>
                                            @elseif($hasPendingEditRequest)
                                                <button type="button" onclick="openTorprEditRequestCenter()"
                                                    title="Request edit untuk PR ini masih menunggu pembuat PR."
                                                    class="torpr-action-btn is-pending">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Menunggu
                                                </button>
                                            @else
                                                <button type="button"
                                                    onclick="requestTorprEditAccess({{ $r->id }}, @js($safeNomorPr), @js($creatorName), @js($creatorContact))"
                                                    title="Edit terkunci. Request izin edit ke pembuat PR."
                                                    class="torpr-action-btn is-locked">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V8a5 5 0 10-10 0v3H6a2 2 0 00-2 2v6a2 2 0 002 2zm3-10V8a3 3 0 116 0v3" />
                                                    </svg>
                                                    Req Edit
                                                </button>
                                            @endif

                                            <button type="button"
                                                onclick="deleteTorprDraft({{ $r->id }}, @js($safeNomorPr))"
                                                title="Hapus hanya tersedia sebelum PR diajukan ke Umum. Wajib memakai password pembuat PR."
                                                class="torpr-action-btn bg-red-600 text-white shadow-sm shadow-red-500/20 hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-500">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v2H9V5a1 1 0 011-1z" />
                                                </svg>
                                                Hapus
                                            </button>

                                            @if($canRequestUmum)
                                                @if($isRequestIncomplete)
                                                    <button type="button" disabled
                                                        title="Wajib dilengkapi: {{ $missingRequestText }}"
                                                        class="torpr-action-btn is-disabled bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                                                        Lengkapi Data
                                                    </button>
                                                @else
                                                    <button type="button" onclick="requestReceipt({{ $r->id }})"
                                                        class="torpr-action-btn bg-blue-600 text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400">
                                                        Request Umum
                                                    </button>
                                                @endif
                                            @endif
                                        </div>
                                    @else
                                        <span class="text-xs text-gray-500 dark:text-white italic">
                                            @if($receipt === 'PENDING')
                                                (menunggu umum)
                                            @elseif($receipt === 'APPROVED')
                                                (sudah diterima)
                                            @elseif($receipt === 'REJECTED')
                                                <div class="text-xs space-y-2">
                                                    <div class="font-semibold text-red-600 dark:text-red-400">Ditolak</div>
                                                    @if($r->rejected_reason)
                                                        <div
                                                            class="mt-1 text-gray-600 dark:text-white text-left bg-red-50 dark:bg-gray-800 p-2 rounded">
                                                            <strong class="text-red-700 dark:text-white">Alasan:</strong><br>
                                                            {{ $r->rejected_reason }}
                                                        </div>
                                                    @endif

                                                    @if($canRequestUmum)
                                                        @if($isRequestIncomplete)
                                                            <button type="button" disabled
                                                                title="Wajib dilengkapi: {{ $missingRequestText }}"
                                                                class="torpr-action-btn is-disabled mt-2 bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                                                                Lengkapi Data
                                                            </button>
                                                        @else
                                                            {{-- ✅ RESUBMIT BUTTON --}}
                                                            <button type="button"
                                                                onclick="openResubmitModal({{ $r->id }}, '{{ addslashes($r->rejected_reason ?? '') }}')"
                                                                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-all active:scale-95 mt-2">
                                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                                </svg>
                                                                Ajukan Ulang
                                                            </button>
                                                        @endif
                                                    @endif
                                                </div>
                                            @endif
                                        </span>
                                    @endif
                                </div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="flex flex-col gap-2">
                                    @if($receipt === 'PENDING')
                                        {{-- STATUS: PENDING --}}
                                        <div
                                            class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                            <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span class="text-xs font-semibold text-amber-700 dark:text-amber-300">Menunggu
                                                Umum</span>
                                        </div>
                                    @elseif($receipt === 'APPROVED')
                                        {{-- STATUS: APPROVED --}}
                                        <div
                                            class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span class="text-xs font-semibold text-green-700 dark:text-green-300">Diterima
                                                Umum</span>
                                        </div>
                                    @elseif($receipt === 'REJECTED')
                                        {{-- STATUS: REJECTED --}}
                                        <div
                                            class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span class="text-xs font-semibold text-red-700 dark:text-red-300">Ditolak Umum</span>
                                        </div>
                                    @else
                                        {{-- DEFAULT: TAMPILKAN QR CODES --}}
                                        @if($r->sign_token_kabid)
                                            <div class="relative group">
                                                <button
                                                    type="button"
                                                    data-qr-trigger
                                                    data-pr-id="{{ $r->id }}"
                                                    data-qr-type="kabid"
                                                    data-qr-token="{{ $r->sign_token_kabid }}"
                                                    data-nomor-pr="{{ $r->nomor_pr }}"
                                                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   {{ $r->tgl_ttd_kabid_pr ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50' }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   transition-all">
                                                    @if($r->tgl_ttd_kabid_pr)
                                                        <svg class="w-3 h-3 dark:text-white" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        <h1 class="dark:text-white">TTD Kabid</h1>
                                                    @else
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                                            </path>
                                                        </svg>
                                                        QR Kabid
                                                    @endif
                                                </button>

                                                @if($r->tgl_ttd_kabid_pr)
                                                    <div
                                                        class="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                                                        <div class="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                            {{ $r->signed_by_kabid_name ?? 'Signed' }}<br>
                                                            {{ \Carbon\Carbon::parse($r->tgl_ttd_kabid_pr)->format('d M Y H:i') }}
                                                        </div>
                                                    </div>
                                                @endif
                                            </div>
                                        @endif

                                        @if($r->sign_token_kacab)
                                            <div class="relative group">
                                                <button
                                                    type="button"
                                                    data-qr-trigger
                                                    data-pr-id="{{ $r->id }}"
                                                    data-qr-type="kacab"
                                                    data-qr-token="{{ $r->sign_token_kacab }}"
                                                    data-nomor-pr="{{ $r->nomor_pr }}"
                                                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   {{ $r->tgl_ttd_kacab_pr ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50' }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   transition-all">
                                                    @if($r->tgl_ttd_kacab_pr)
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        TTD Kacab
                                                    @else
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                                                            </path>
                                                        </svg>
                                                        QR Kacab
                                                    @endif
                                                </button>

                                                @if($r->tgl_ttd_kacab_pr)
                                                    <div
                                                        class="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                                                        <div class="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                            {{ $r->signed_by_kacab_name ?? 'Signed' }}<br>
                                                            {{ \Carbon\Carbon::parse($r->tgl_ttd_kacab_pr)->format('d M Y H:i') }}
                                                        </div>
                                                    </div>
                                                @endif
                                            </div>
                                        @endif

                                        @if(!$r->sign_token_kabid && !$r->sign_token_kacab)
                                            <span class="text-xs text-gray-400 dark:text-white italic text-center">
                                                No QR
                                            </span>
                                        @endif
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-10 text-gray-500 dark:text-gray-400">
                                <div class="flex flex-col items-center gap-3">
                                    <svg class="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                        </path>
                                    </svg>
                                    <span class="text-lg font-medium dark:text-white">Tidak ada data</span>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    {{-- Pagination Links (Bottom) --}}
    <div class="mt-6">
        {{ $rows->links() }}
    </div>

    {{-- ================= MODAL INFO PR ================= --}}
    <div id="infoPrModal"
        class="fixed inset-0 hidden items-center justify-center z-[9999] bg-slate-950/60 backdrop-blur-sm info-backdrop"
        onclick="closeInfoPrModal()">
        <div id="infoPrCard"
            class="info-modal-pop info-card-glow relative mx-3 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 sm:mx-4"
            onclick="event.stopPropagation()">

            <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div class="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl"></div>

            <div
                class="relative border-b border-gray-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-5 text-white dark:border-gray-800">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <div
                            class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
                            <span class="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                            Detail Informasi PR
                        </div>
                        <h2 id="infoPrTitle" class="mt-3 text-xl font-extrabold tracking-tight">Memuat...</h2>
                        <p id="infoPrSubtitle" class="mt-1 text-sm text-blue-100">Mengambil data dari baris yang dipilih</p>
                    </div>

                    <button type="button" onclick="closeInfoPrModal()"
                        class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:rotate-90 hover:bg-white/20 active:scale-95">
                        ✕
                    </button>
                </div>
            </div>

            <div class="relative max-h-[68vh] overflow-y-auto p-5 text-gray-900 dark:text-gray-100">
                <div id="infoPrLoading" class="hidden py-10 text-center">
                    <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600">
                    </div>
                    <p class="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">Memuat detail PR...</p>
                </div>

                <div id="infoPrContent" class="space-y-5">
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div
                            class="info-shine rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-900/50 dark:bg-blue-900/20">
                            <p class="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">Nomor
                                PR</p>
                            <p id="infoNoPr"
                                class="mt-2 break-words font-mono text-base font-bold text-gray-900 dark:text-white">—</p>
                        </div>

                        <div
                            class="rounded-xl border border-indigo-100 bg-indigo-50 p-3 dark:border-indigo-900/50 dark:bg-indigo-900/20">
                            <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                                Portofolio</p>
                            <p id="infoPortofolio"
                                class="mt-2 break-words text-base font-bold text-gray-900 dark:text-white">—</p>
                        </div>

                        <div
                            class="rounded-xl border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-900/20">
                            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                                Tanggal PR</p>
                            <p id="infoTanggal" class="mt-2 text-base font-bold text-gray-900 dark:text-white">—</p>
                        </div>

                        <div
                            class="rounded-xl border border-indigo-100 bg-indigo-50 p-3 dark:border-indigo-900/50 dark:bg-indigo-900/20">
                            <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                                Jumlah PR</p>
                            <p id="infoJumlah" class="mt-2 text-base font-bold text-gray-900 dark:text-white">—</p>
                        </div>
                    </div>

                    <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/80">
                        <div class="mb-2 flex items-center gap-2">
                            <span
                                class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">📌</span>
                            <p class="text-sm font-bold text-gray-700 dark:text-white">Tujuan Pengadaan</p>
                        </div>
                        <p id="infoTujuan"
                            class="whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-relaxed text-gray-700 shadow-sm dark:bg-gray-900 dark:text-white">
                            —</p>
                    </div>

                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div
                            class="rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Receipt</p>
                            <div class="mt-3 flex flex-col gap-2">
                                <span id="infoReceiptBadge"
                                    class="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold text-white bg-gray-400">—</span>
                                <span id="infoReceiptSub" class="text-xs text-gray-500 dark:text-gray-400">—</span>
                            </div>
                        </div>

                        <div
                            class="rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">TTD
                                Kabid</p>
                            <div class="mt-3 flex flex-col gap-2">
                                <span id="infoKabidBadge"
                                    class="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold">—</span>
                                <span id="infoKabidMeta" class="text-xs text-gray-500 dark:text-gray-400">—</span>
                            </div>
                        </div>

                        <div
                            class="rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">TTD
                                Kacab</p>
                            <div class="mt-3 flex flex-col gap-2">
                                <span id="infoKacabBadge"
                                    class="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold">—</span>
                                <span id="infoKacabMeta" class="text-xs text-gray-500 dark:text-gray-400">—</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/70">
                        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p class="text-xs font-black uppercase tracking-wide text-blue-600 dark:text-blue-300">
                                    Timeline Audit Detail
                                </p>
                                <h3 class="mt-1 text-sm font-black text-slate-950 dark:text-white">
                                    Jejak proses PR sampai diterima Umum
                                </h3>
                                <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    Arsip sengaja tidak ditampilkan di sini agar timeline fokus ke proses PR.
                                </p>
                            </div>
                            <span id="infoTimelineCount"
                                class="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
                                0 tahap
                            </span>
                        </div>
                        <div id="infoTimeline" class="torpr-info-timeline mt-4 space-y-4">
                            <div class="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                Timeline akan muncul setelah data dimuat.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="relative flex justify-end gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900">
                <button type="button" onclick="closeInfoPrModal()"
                    class="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-300 active:scale-95 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    Tutup
                </button>
            </div>
        </div>
    </div>

    {{-- ================= MODAL IMPORT ================= --}}
    <div id="importModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white dark:bg-gray-800 w-full max-w-6xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 90vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <div>
                    <h2
                        class="font-bold text-xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent dark:text-white">
                        Import Data TORPR
                    </h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload file Excel untuk import data secara
                        massal</p>
                </div>
                <button type="button" onclick="closeImportModal()"
                    class="text-red-500 dark:text-red-400 text-2xl leading-none hover:scale-110 hover:rotate-90 transition-all duration-300">✕</button>
            </div>

            {{-- Step 1: Upload File --}}
            <div id="uploadStep" class="animate-fade-in">
                <div
                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all duration-300">
                    <div class="text-7xl mb-4 animate-bounce-subtle">📂</div>
                    <h3 class="font-semibold text-lg mb-2 dark:text-white">Upload File Excel</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag & drop file atau klik untuk browse</p>

                    <input type="file" id="importFile" accept=".xlsx,.xls,.csv" class="hidden"
                        onchange="handleFileSelect(event)">

                    <button type="button" onclick="document.getElementById('importFile').click()"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 active:scale-95 transition">
                        <span>📁 Pilih File</span>
                    </button>


                    <div class="mt-4">
                        <a href="{{ route('torpr.template') }}"
                            class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 font-semibold hover:underline">
                            <span>📥 Download Template Excel</span>
                        </a>
                    </div>
                </div>

                <div
                    class="mt-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <span class="text-lg">💡</span> Petunjuk Import:
                    </h4>
                    <ul class="text-xs text-blue-800 dark:text-white space-y-1">
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span>Download template Excel terlebih dahulu</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span><strong>Tujuan Pengadaan dan Nomor PR wajib diisi</strong>; Portofolio mengikuti master
                                PPBJ</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span>Format tanggal: <code
                                    class="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-200">YYYY-MM-DD HH:MM:SS</code>
                                atau <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">YYYY-MM-DD</code></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span>Format angka: tanpa titik/koma (contoh: 5000000)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span>Maksimal ukuran file: 10MB</span>
                        </li>
                    </ul>
                </div>
            </div>

            {{-- Step 2: Preview --}}
            <div id="previewStep" class="hidden">
                {{-- Summary Cards --}}
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div
                        class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 transform hover:scale-105 transition-all">
                        <div class="text-sm text-blue-600 dark:text-white font-medium">Total Baris</div>
                        <div id="totalRows" class="text-3xl font-bold text-blue-900 dark:text-blue-200 mt-1">0</div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 rounded-lg p-4 transform hover:scale-105 transition-all">
                        <div class="text-sm text-green-600 dark:text-green-400 font-medium">✓ Valid</div>
                        <div id="validRows" class="text-3xl font-bold text-green-900 dark:text-green-200 mt-1">0</div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-4 transform hover:scale-105 transition-all">
                        <div class="text-sm text-red-600 dark:text-red-400 font-medium">✗ Error</div>
                        <div id="errorRows" class="text-3xl font-bold text-red-900 dark:text-red-200 mt-1">0</div>
                    </div>
                </div>

                {{-- Error Alert --}}
                <div id="errorAlert"
                    class="hidden mb-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 p-4 rounded-lg shadow-md animate-shake">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <svg class="h-6 w-6 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-semibold text-red-800 dark:text-red-200">
                                Ditemukan <span id="errorCount" class="text-lg font-bold">0</span> baris dengan error
                            </h3>
                            <p class="text-xs text-red-700 dark:text-red-300 mt-1">
                                Perbaiki data di baris yang error sebelum melakukan import. Scroll ke bawah untuk melihat
                                detail error.
                            </p>
                        </div>
                    </div>
                </div>

                {{-- Preview Table --}}
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4 shadow-lg">
                    <div class="overflow-x-auto" style="max-height: 500px;">
                        <table class="w-full text-xs"> {{-- CHANGED: min-w-full → w-full --}}
                            <thead
                                class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 sticky top-0 z-10 shadow-sm">
                                <tr class="text-gray-700 dark:text-gray-300">
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 80px;">
                                        Baris</th>
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 100px;">
                                        Status</th>
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 180px;">
                                        Nomor PR</th>
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 250px;">
                                        Tujuan</th>
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 180px;">
                                        Portofolio</th>
                                    <th class="px-3 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-600"
                                        style="width: 150px;">
                                        Jumlah PR</th>
                                    <th class="px-3 py-3 text-left font-semibold" style="width: auto;">Detail Error</th>
                                    {{-- CHANGED: Remove min-width, use auto --}}
                                </tr>
                            </thead>
                            <tbody id="previewTableBody"
                                class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                <!-- Filled by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                {{-- Legend --}}
                <div class="mb-4 flex items-center gap-4 text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div class="flex items-center gap-2">
                        <span
                            class="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-semibold shadow-sm">✓
                            Valid</span>
                        <span class="text-gray-600 dark:text-gray-400">= Data siap diimport</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span
                            class="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full font-semibold shadow-sm">✗
                            Error</span>
                        <span class="text-gray-600 dark:text-gray-400">= Harus diperbaiki</span>
                    </div>
                </div>

                {{-- Actions --}}
                <div
                    class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" onclick="resetImport()"
                        class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all inline-flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Upload Ulang
                    </button>

                    <div class="flex gap-2 w-full sm:w-auto">
                        <button type="button" onclick="closeImportModal()"
                            class="flex-1 sm:flex-initial px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                            Batal
                        </button>

                        <button type="button" id="btnProcess" onclick="processImport()"
                            class="flex-1 sm:flex-initial px-6 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 hover:shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2">
                            <span id="btnProcessText">✓ Proses Import</span>
                            <span id="btnProcessSpinner"
                                class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        </button>
                    </div>
                </div>
            </div>

            {{-- Loading State --}}
            <div id="loadingStep" class="hidden text-center py-12">
                <div
                    class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mb-4">
                </div>
                <p class="text-gray-600 dark:text-gray-400 animate-pulse">Memproses file...</p>
            </div>
        </div>
    </div>
    {{-- ================= MODAL FORM PPBJ ================= --}}
    <div id="formModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop text-gray-900 dark:text-gray-100"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <h2 id="formTitle" class="font-bold text-lg text-gray-800 dark:text-white">Tambah TORPR</h2>
                <button type="button" onclick="closeForm()"
                    class="text-gray-500 dark:text-gray-300 text-xl leading-none hover:text-gray-800 dark:hover:text-white hover:rotate-90 transition-all duration-300">✕</button>
            </div>

            <form id="torprForm" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                @csrf
                <input type="hidden" id="torpr_id" name="id" />

                <div id="formGuidanceBox"
                    class="form-guidance-card md:col-span-2 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-4 shadow-sm dark:border-sky-700/60 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
                    <div class="relative flex items-start gap-3">
                        <div class="form-guidance-icon mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-500/20 dark:bg-sky-500">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>

                        <div class="relative min-w-0 flex-1">
                            <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 id="formGuidanceTitle" class="text-sm font-bold text-sky-900 dark:text-white">
                                        Informasi Pengisian PR Operasional
                                    </h3>
                                    <p id="formGuidanceSubtitle" class="text-xs text-sky-700 dark:text-white/90">
                                        Harap lengkapi seluruh data PR sebelum diajukan ke Umum.
                                    </p>
                                </div>
                                <span id="formGuidanceBadge"
                                    class="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-200 backdrop-blur dark:bg-sky-500/15 dark:text-white dark:ring-sky-400/30">
                                    Wajib Dibaca
                                </span>
                            </div>

                            <div class="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_.9fr]">
                                <div class="rounded-xl bg-white/75 p-3 ring-1 ring-sky-100 backdrop-blur dark:bg-slate-800/95 dark:ring-slate-700 dark:shadow-inner">
                                    <p id="formGuidanceMessage" class="text-sm leading-6 text-gray-700 dark:text-white">
                                        Anda adalah user operasional. Mohon isi seluruh data PR secara lengkap dan benar.
                                    </p>

                                    <ul id="formGuidanceList" class="mt-3 space-y-2 text-sm text-gray-700 dark:text-white">
                                        <li class="form-guidance-item flex items-start gap-2">
                                            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✓</span>
                                            <span>Lengkapi <strong>Tujuan Pengadaan</strong>, <strong>Portofolio</strong>, <strong>Nomor PR</strong>, <strong>Tanggal PR</strong>, dan <strong>Harga / Jumlah PR</strong>.</span>
                                        </li>
                                        <li class="form-guidance-item flex items-start gap-2">
                                            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✓</span>
                                            <span>Kolom <strong>Ttd Kabid PR</strong> juga harus diisi sebelum PR bisa diproses lebih lanjut.</span>
                                        </li>
                                        <li class="form-guidance-item flex items-start gap-2">
                                            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">!</span>
                                            <span>Untuk <strong>user operasional</strong>, kolom <strong>Ttd Kacab PR</strong> tidak perlu diisi karena hanya menjadi kewenangan <strong>Superadmin Operasional</strong>.</span>
                                        </li>
                                        <li class="form-guidance-item flex items-start gap-2">
                                            <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">✕</span>
                                            <span>Jika ada data wajib yang kosong, tombol <strong>Request Umum</strong> tidak akan tersedia.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="rounded-xl bg-sky-950 px-4 py-3 text-sky-50 shadow-inner dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
                                    <div class="flex items-center gap-2 text-sm font-semibold">
                                        <svg class="h-5 w-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 17v-2a4 4 0 014-4h6"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 7l6 6-6 6"></path>
                                        </svg>
                                        Alur Singkat
                                    </div>
                                    <ol class="mt-3 space-y-2 text-xs leading-5 text-sky-100/95">
                                        <li><strong>1.</strong> Isi data PR secara lengkap.</li>
                                        <li><strong>2.</strong> Pastikan format nomor PR dan nominal sudah benar.</li>
                                        <li><strong>3.</strong> Lengkapi Ttd Kabid PR.</li>
                                        <li><strong>4.</strong> Superadmin Operasional dapat melanjutkan proses Request Umum setelah data lengkap.</li>
                                    </ol>
                                    <div class="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[11px] leading-5 text-sky-100 ring-1 ring-white/10 dark:bg-slate-800/90 dark:text-white dark:ring-slate-700">
                                        <strong>Catatan:</strong> Informasi ini tampil saat tambah maupun edit PR agar pengisian data tetap konsisten dan tidak ada kolom wajib yang terlewat.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Tujuan Pengadaan --}}
                <div class="md:col-span-2">
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Tujuan Pengadaan</label>
                    <input type="text" id="tujuan_pengadaan" name="tujuan_pengadaan"
                        placeholder="Contoh: Pengadaan Alat Tulis Kantor (Wajib Diisi)"
                        class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
                    <p id="err_tujuan_pengadaan" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- Portofolio --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Portofolio</label>
                    <select id="portofolio" name="portofolio"
                        class="select2-torpr-portofolio border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800"
                        data-placeholder="Cari / pilih portofolio...">
                        <option value="">-- Pilih Portofolio --</option>
                        @foreach(($portofolios ?? []) as $p)
                            <option value="{{ $p }}">{{ $p }}</option>
                        @endforeach
                    </select>
                    <p id="err_portofolio" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- Nomor PR --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Nomor PR</label>
                    <input type="text" id="nomor_pr" name="nomor_pr" placeholder="Contoh: PR/2026/001 (Harus Unik)"
                        style="text-transform: uppercase;"
                        class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
                    <p id="err_nomor_pr" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- Tanggal PR --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Tanggal PR</label>
                    <input type="datetime-local" id="tanggal_pr" name="tanggal_pr"
                        class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
                    <p id="err_tanggal_pr" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- Jumlah PR --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Jumlah PR</label>
                    <input type="text" id="jumlah_pr" name="jumlah_pr" oninput="formatInputCurrency(this)"
                        onblur="blurInputCurrency(this)" placeholder="Contoh: 1.500.000.00"
                        class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
                    <p id="err_jumlah_pr" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- TTD Kabid PR --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Ttd Kabid PR</label>
                    <input type="datetime-local" id="tgl_ttd_kabid_pr" name="tgl_ttd_kabid_pr"
                        class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">
                    <p id="err_tgl_ttd_kabid_pr" class="hidden text-xs text-red-600 mt-1"></p>
                </div>

                {{-- TTD Kacab PR --}}
                <div>
                    <label class="text-sm text-gray-600 dark:text-gray-300 font-medium">Ttd Kacab PR</label>
                    <input type="datetime-local" id="tgl_ttd_kacab_pr" name="tgl_ttd_kacab_pr" class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all
                                               bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800">

                    {{-- Pesan Peringatan (Default Tersembunyi) --}}
                    <p id="warn_ttd_kacab"
                        class="hidden text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                            </path>
                        </svg>
                        <span>Anda tidak memiliki akses untuk mengisi kolom ini.</span>
                    </p>
                </div>

                <div class="md:col-span-2 flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <button type="submit"
                        class="rounded-lg bg-green-600 text-white px-4 py-2 font-semibold transition-all active:scale-95 hover:bg-green-700">
                        <span id="btnSaveText">Simpan</span>
                        <span id="btnSaveSpinner"
                            class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                    </button>

                    <button type="button" onclick="closeForm()"
                        class="rounded-lg bg-red-600 text-white px-4 py-2 font-semibold transition-all active:scale-95 hover:bg-red-700">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div id="resubmitModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 backdrop-blur-sm"
        onclick="closeResubmitModal()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <div>
                    <h2 class="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-2">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Ajukan Ulang PR yang Ditolak
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Pastikan sudah memperbaiki sesuai alasan
                        penolakan</p>
                </div>
                <button type="button" onclick="closeResubmitModal()"
                    class="text-gray-500 dark:text-gray-300 text-xl leading-none hover:text-gray-800 dark:hover:text-white hover:rotate-90 transition-all duration-300">
                    ✕
                </button>
            </div>

            {{-- Alert Rejection Reason --}}
            <div class="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div class="flex-1">
                        <h4 class="font-semibold text-red-800 dark:text-red-300 mb-1">Alasan Penolakan dari Umum:</h4>
                        <p id="resubmitRejectionReason" class="text-sm text-red-700 dark:text-red-400 leading-relaxed"></p>
                    </div>
                </div>
            </div>

            <form id="resubmitForm" onsubmit="handleResubmit(event)">
                <input type="hidden" id="resubmitTorprId">

                <div class="space-y-4">
                    {{-- Nama Pengaju --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nama Pengaju (Operasional) <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="resubmitName" required minlength="2"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-white"
                            placeholder="Nama Anda">
                    </div>

                    {{-- Catatan Perbaikan --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Catatan Perbaikan <span class="text-red-500">*</span>
                        </label>
                        <textarea id="resubmitNotes" required minlength="10" rows="4"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-white resize-none"
                            placeholder="Jelaskan perbaikan yang sudah Anda lakukan untuk mengatasi alasan penolakan di atas..."></textarea>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimal 10 karakter</p>
                    </div>
                </div>

                {{-- Warning Box --}}
                <div
                    class="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="text-sm text-amber-800 dark:text-amber-300">
                            <p class="font-semibold mb-1">Pastikan data sudah diperbaiki!</p>
                            <p>PR akan masuk ke antrian review Umum lagi. Mohon pastikan semua perbaikan sesuai alasan
                                penolakan sudah dilakukan.</p>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                    <button type="button" onclick="closeResubmitModal()"
                        class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span id="btnResubmitText">Ajukan Ulang</span>
                        <span id="btnResubmitSpinner"
                            class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div id="qrModal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50 backdrop-blur-sm"
        onclick="closeQRModal()">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
            onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white" id="qrModalTitle">QR Code TTD</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" id="qrModalSubtitle"></p>
                </div>
                <button onclick="closeQRModal()"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            {{-- QR Code Container --}}
            <div class="bg-white rounded-xl p-4 mb-4 flex justify-center" id="qrCodeContainer">
                <div class="text-center">
                    <div id="qrCodeImage" class="inline-block"></div>
                    <p class="text-xs text-gray-500 mt-2">Scan dengan HP untuk TTD</p>
                </div>
            </div>

            {{-- Info --}}
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                <div class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div class="text-xs text-blue-800 dark:text-blue-300">
                        <p class="font-semibold mb-1">Cara Penggunaan:</p>
                        <ol class="list-decimal ml-4 space-y-1">
                            <li>Scan QR Code dengan kamera HP</li>
                            <li>Masukkan nama penanda tangan</li>
                            <li>Klik "Setujui & Tandatangani"</li>
                            <li>Timestamp otomatis tercatat!</li>
                        </ol>
                    </div>
                </div>
            </div>

            {{-- Actions --}}
            <div class="flex gap-2">
                <button onclick="printQR()"
                    class="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                                                                                                                                                                               text-gray-700 dark:text-white rounded-lg font-medium transition text-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z">
                        </path>
                    </svg>
                    Print
                </button>
                <button onclick="closeQRModal()"
                    class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm">
                    Tutup
                </button>
            </div>
        </div>
    </div>
    {{-- ================= MODAL LOG ACTIVITY (FIXED Z-INDEX) ================= --}}
    <div id="logModal" class="fixed inset-0 hidden items-center justify-center p-4"
        style="background-color: rgba(0,0,0,0.6); z-index: 99999; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);"
        onclick="closeLogModal()">

        {{-- Card Container --}}
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            onclick="event.stopPropagation()">

            {{-- Header (Sticky) --}}
            <div class="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                        </path>
                    </svg>
                    Riwayat Aktivitas
                </h3>
                <button onclick="closeLogModal()"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            {{-- Content Area (Scrollable) --}}
            <div id="logContent" class="flex-1 overflow-y-auto p-5">
                <div class="text-center text-gray-400 py-8">Memuat data...</div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
    <script>
        (function () { var s = localStorage.getItem('theme'), d = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches; document.documentElement.classList.toggle('dark', s === 'dark' || (!s && d)) })();
    </script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    <script>
        const canAccessKacab = {{ auth()->user()->role === 'superadmin' && auth()->user()->department === 'operasional' ? 'true' : 'false' }};

        function escapeHtml(str) {
            return String(str ?? '').replace(/[&<>"']/g, (m) => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m]));
        }

        function initTorprSelect2() {
            if (!window.jQuery || !$.fn.select2) return;

            $('.select2-torpr-filter-portofolio').select2({
                placeholder: 'Pilih satu / beberapa portofolio...',
                allowClear: true,
                width: '100%',
                closeOnSelect: false,
                minimumResultsForSearch: 0,
                language: {
                    noResults: function () { return 'Tidak ada portofolio'; },
                    searching: function () { return 'Mencari...'; }
                }
            });

            $('.select2-torpr-portofolio').select2({
                placeholder: 'Cari / pilih portofolio...',
                allowClear: false,
                width: '100%',
                dropdownParent: $('#formModal'),
                minimumResultsForSearch: 0
            });
        }

        $(document).ready(function () {
            initTorprSelect2();
        });

        (function () {
            // Check if redirected from QR sign with auto_request parameter
            const urlParams = new URLSearchParams(window.location.search);
            const autoRequestId = urlParams.get('auto_request');

            if (autoRequestId) {
                // Remove parameter from URL (clean up)
                window.history.replaceState({}, document.title, window.location.pathname);

                // Show request prompt
                setTimeout(() => {
                    showAutoRequestPrompt(autoRequestId);
                }, 500);
            }
        })();

        window.showLogModal = function (id) {
            const modal = document.getElementById('logModal');
            const content = document.getElementById('logContent');

            // 1. Pindahkan modal langsung ke <body> (keluar dari kontainer layout)
            // Ini menghilangkan masalah z-index terjebak di dalam div parent
            document.body.appendChild(modal);

            // 2. Tampilkan modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // 3. Kunci scroll background
            document.body.style.overflow = 'hidden';

            // Reset konten
            content.innerHTML = '<div class="text-center text-gray-400 py-8">Memuat data...</div>';

            // Fetch data log (kode fetch sama seperti sebelumnya)
            fetch(`/torpr/${id}/logs`)
                .then(r => r.json())
                .then(data => {
                    if (data.length === 0) {
                        content.innerHTML = '<div class="text-center text-gray-400 py-8">Tidak ada riwayat aktivitas.</div>';
                        return;
                    }

                    const columnLabels = {
                        'tujuan_pengadaan': 'Tujuan Pengadaan', 'portofolio': 'Portofolio', 'nomor_pr': 'Nomor PR',
                        'tanggal_pr': 'Tanggal PR', 'jumlah_pr': 'Jumlah PR',
                        'tgl_ttd_kabid_pr': 'Tgl TTD Kabid', 'tgl_ttd_kacab_pr': 'Tgl TTD Kacab',
                    };

                    let html = '<div class="relative">';
                    html += '<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>';

                    data.forEach(log => {
                        // ... (Logika ikon & warna sama persis seperti kode sebelumnya) ...
                        let icon = '📝'; let color = 'bg-gray-400';
                        if (log.action.includes('created')) { icon = '➕'; color = 'bg-green-500'; }
                        if (log.action.includes('updated')) { icon = '✏️'; color = 'bg-blue-500'; }
                        if (log.action.includes('approved')) { icon = '✅'; color = 'bg-green-600'; }
                        if (log.action.includes('rejected')) { icon = '❌'; color = 'bg-red-500'; }
                        if (log.action.includes('requested')) { icon = '📨'; color = 'bg-yellow-500'; }
                        if (log.action.includes('signed')) { icon = '✍️'; color = 'bg-purple-500'; }

                        let changesHtml = '';
                        if (log.changes) {
                            changesHtml = '<div class="mt-2 space-y-1">';
                            for (const [key, val] of Object.entries(log.changes)) {
                                let colName = escapeHtml(columnLabels[key] || key);
                                let oldVal = val.old ?? '(kosong)';
                                let newVal = val.new ?? '(kosong)';

                                if (key === 'jumlah_pr') {
                                    if (val.old) oldVal = 'Rp ' + parseFloat(val.old).toLocaleString('id-ID');
                                    if (val.new) newVal = 'Rp ' + parseFloat(val.new).toLocaleString('id-ID');
                                }

                                oldVal = escapeHtml(oldVal);
                                newVal = escapeHtml(newVal);

                                changesHtml += `
                                            <div class="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded border dark:border-gray-700">
                                                <span class="font-semibold text-gray-700 dark:text-gray-300">${colName}</span>
                                                <div class="flex flex-col sm:flex-row sm:items-center gap-1 mt-1">


                                                    <span class="text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded text-[11px]" 
                                                          style="text-decoration: line-through; text-decoration-color: #ef4444; text-decoration-thickness: 2px;">
                                                        ${oldVal}
                                                    </span>


                                                    <span class="hidden sm:block text-gray-400">→</span>


                                                    <span class="text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-1 rounded text-[11px]">
                                                        ${newVal}
                                                    </span>
                                                </div>
                                            </div>
                                        `;
                            }
                            changesHtml += '</div>';
                        }

                        html += `
                                                                    <div class="relative pl-10 pb-6">
                                                                        <div class="absolute left-2 w-5 h-5 rounded-full ${color} flex items-center justify-center text-xs text-white border-2 border-white dark:border-gray-800">${icon}</div>
                                                                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                                                                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                                                                                <span class="font-semibold text-sm text-gray-900 dark:text-white">${escapeHtml(log.user?.name || 'System')}</span>
                                                                                <span class="text-[11px] text-gray-400 whitespace-nowrap">${new Date(log.created_at).toLocaleString('id-ID')}</span>
                                                                            </div>
                                                                            <p class="text-sm text-gray-700 dark:text-gray-300">${escapeHtml(log.description || '')}</p>
                                                                            ${changesHtml}
                                                                        </div>
                                                                    </div>`;
                    });

                    html += '</div>';
                    content.innerHTML = html;
                });
        }

        window.closeLogModal = function () {
            const modal = document.getElementById('logModal');

            // Sembunyikan
            modal.classList.add('hidden');
            modal.classList.remove('flex');

            // Buka kunci scroll
            document.body.style.overflow = '';
        }


        // ==========================================
        // MODAL INFO PR - DETAIL BARIS DENGAN ANIMASI
        // ==========================================
        function formatInfoRupiah(value) {
            if (value === null || value === undefined || value === '') return '—';

            const number = Number(String(value).replace(/[^0-9.-]/g, ''));
            if (!Number.isFinite(number)) return value || '—';

            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(number);
        }

        function formatInfoDate(value) {
            if (!value) return '—';

            const normalized = String(value).replace(' ', 'T');
            const date = new Date(normalized);

            if (Number.isNaN(date.getTime())) return value;

            return date.toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function setInfoText(id, value) {
            const el = document.getElementById(id);
            if (el) el.textContent = value || '—';
        }

        function setReceiptInfo(status, subText) {
            const badge = document.getElementById('infoReceiptBadge');
            if (!badge) return;

            const cleanStatus = (status || '—').trim();
            const statusClass = {
                'APPROVED': 'bg-green-600 text-white',
                'REJECTED': 'bg-red-600 text-white',
                'PENDING': 'bg-yellow-500 text-white',
                '—': 'bg-gray-400 text-white'
            }[cleanStatus] || 'bg-gray-400 text-white';

            badge.className = `inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${statusClass}`;
            badge.textContent = cleanStatus;
            setInfoText('infoReceiptSub', subText || '—');
        }

        function setSignInfo(prefix, signed, name, date) {
            const badge = document.getElementById(`info${prefix}Badge`);
            const meta = document.getElementById(`info${prefix}Meta`);
            if (!badge || !meta) return;

            if (signed) {
                badge.className = 'inline-flex w-fit items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300';
                badge.textContent = '✓ Sudah TTD';
                meta.textContent = `${name || 'Signed'}${date ? ' • ' + date : ''}`;
            } else {
                badge.className = 'inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300';
                badge.textContent = 'Belum TTD';
                meta.textContent = 'Belum ada tanda tangan';
            }
        }

        function renderInfoTimeline(events = []) {
            const wrapper = document.getElementById('infoTimeline');
            const counter = document.getElementById('infoTimelineCount');
            if (!wrapper) return;

            if (!events.length) {
                wrapper.innerHTML = `
                    <div class="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                        Timeline akan muncul setelah data dimuat.
                    </div>
                `;
                if (counter) counter.textContent = '0 tahap';
                return;
            }

            const doneCount = events.filter((event) => event.done).length;
            if (counter) counter.textContent = `${doneCount}/${events.length} tahap`;

            wrapper.innerHTML = events.map((event) => {
                const tone = event.done
                    ? (event.type === 'danger'
                        ? 'bg-red-500 text-white ring-red-100 dark:ring-red-900/40'
                        : event.type === 'warning'
                            ? 'bg-amber-500 text-white ring-amber-100 dark:ring-amber-900/40'
                            : 'bg-emerald-500 text-white ring-emerald-100 dark:ring-emerald-900/40')
                    : 'bg-white text-slate-400 ring-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-slate-700';

                const titleColor = event.done
                    ? 'text-slate-950 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400';

                return `
                    <div class="torpr-info-step relative flex gap-3">
                        <div class="torpr-info-dot ${tone}">${event.icon || (event.done ? '✓' : '•')}</div>
                        <div class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                            <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p class="text-sm font-black ${titleColor}">${escapeHtml(event.title || '-')}</p>
                                <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">${escapeHtml(event.time || 'Belum ada waktu')}</span>
                            </div>
                            <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">${escapeHtml(event.description || '-')}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function buildInfoTimeline(data, receiptStatus, receiptSub) {
            const approval = data?.latest_approval || {};
            const approvalStatus = String(approval.status || receiptStatus || '').toUpperCase();
            const isRejected = approvalStatus.includes('REJECTED');
            const isApproved = approvalStatus.includes('APPROVED') || !!data?.received_at;
            const isPending = approvalStatus.includes('PENDING');

            const kabidName = data?.signed_by_kabid_name || 'Kabid';
            const kacabName = data?.signed_by_kacab_name || 'Kacab';

            return [
                {
                    done: !!(data?.created_at || data?.tanggal_pr),
                    icon: '1',
                    title: 'PR dibuat / dicatat',
                    time: formatInfoDate(data?.created_at || data?.tanggal_pr),
                    description: data?.nomor_pr ? `Nomor PR: ${data.nomor_pr}` : 'Nomor PR belum tersedia.',
                },
                {
                    done: !!data?.tgl_ttd_kabid_pr,
                    icon: '2',
                    title: 'Tanda tangan Kepala Bidang',
                    time: formatInfoDate(data?.tgl_ttd_kabid_pr),
                    description: data?.tgl_ttd_kabid_pr
                        ? `Ditandatangani oleh ${kabidName}.`
                        : 'Masih menunggu tanda tangan Kepala Bidang.',
                },
                {
                    done: !!data?.tgl_ttd_kacab_pr,
                    icon: '3',
                    title: 'Tanda tangan Kepala Cabang',
                    time: formatInfoDate(data?.tgl_ttd_kacab_pr),
                    description: data?.tgl_ttd_kacab_pr
                        ? `Ditandatangani oleh ${kacabName}.`
                        : 'Masih menunggu tanda tangan Kepala Cabang.',
                },
                {
                    done: !!approval.requested_at,
                    icon: '4',
                    title: 'Request penerimaan ke Umum',
                    time: formatInfoDate(approval.requested_at),
                    description: approval.requested_name
                        ? `Diajukan oleh ${approval.requested_name}.`
                        : 'Belum ada request penerimaan ke Umum.',
                    type: isPending ? 'warning' : undefined,
                },
                {
                    done: isApproved || isRejected,
                    icon: isRejected ? '!' : '5',
                    title: isRejected ? 'Request ditolak Umum' : 'PR diterima Umum',
                    time: formatInfoDate(data?.received_at || approval.approved_at || approval.rejected_at),
                    description: isRejected
                        ? `Alasan: ${approval.rejected_reason || 'Tidak ada alasan yang dicatat.'}`
                        : (isApproved
                            ? `Status: ${receiptSub || 'PR sudah dikonfirmasi diterima Umum.'}`
                            : 'Menunggu review dan konfirmasi dari Umum.'),
                    type: isRejected ? 'danger' : (isPending ? 'warning' : undefined),
                },
            ];
        }

        window.openInfoPrModal = async function (id) {
            const modal = document.getElementById('infoPrModal');
            const card = document.getElementById('infoPrCard');
            const loading = document.getElementById('infoPrLoading');
            const content = document.getElementById('infoPrContent');
            const row = document.querySelector(`tr[data-row-id="${id}"]`);

            if (!modal) return;

            document.body.appendChild(modal);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            card?.classList.remove('info-modal-out');
            document.body.style.overflow = 'hidden';

            loading?.classList.remove('hidden');
            content?.classList.add('opacity-40', 'pointer-events-none');

            setInfoText('infoPrTitle', 'Memuat...');
            setInfoText('infoPrSubtitle', 'Mengambil data dari baris yang dipilih');
            setInfoText('infoNoPr', '—');
            setInfoText('infoPortofolio', '—');
            setInfoText('infoTanggal', '—');
            setInfoText('infoJumlah', '—');
            setInfoText('infoTujuan', '—');
            setReceiptInfo('—', '—');
            setSignInfo('Kabid', false, '', '');
            setSignInfo('Kacab', false, '', '');
            renderInfoTimeline([]);

            const receiptStatus = row?.querySelector('[data-receipt-badge]')?.textContent?.trim() || '—';
            const receiptSub = row?.querySelector('[data-receipt-sub]')?.textContent?.trim() || '—';
            const signedKabid = row?.dataset?.signedKabid === '1';
            const signedKacab = row?.dataset?.signedKacab === '1';

            try {
                const response = await fetch(`/torpr/${id}/json`, {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                if (!response.ok) {
                    let message = 'Gagal mengambil informasi PR.';
                    if (response.status === 403) message = 'Akses ditolak untuk membuka informasi PR ini.';
                    if (response.status === 404) message = 'Data PR tidak ditemukan atau sudah berubah.';
                    if (response.status >= 500) message = 'Server gagal mengambil informasi PR. Silakan refresh halaman.';
                    throw new Error(`${message} (HTTP ${response.status})`);
                }

                const data = await response.json();

                setInfoText('infoPrTitle', data.nomor_pr || 'Nomor PR belum diisi');
                setInfoText('infoPrSubtitle', 'Informasi lengkap dari PR yang dipilih');
                setInfoText('infoNoPr', data.nomor_pr || '—');
                setInfoText('infoPortofolio', data.portofolio || '—');
                setInfoText('infoTanggal', formatInfoDate(data.tanggal_pr));
                setInfoText('infoJumlah', formatInfoRupiah(data.jumlah_pr));
                setInfoText('infoTujuan', data.tujuan_pengadaan || '—');

                setReceiptInfo(receiptStatus, receiptSub);
                setSignInfo('Kabid', signedKabid || !!data.tgl_ttd_kabid_pr, row?.dataset?.nameKabid || '', row?.dataset?.dateKabid || formatInfoDate(data.tgl_ttd_kabid_pr));
                setSignInfo('Kacab', signedKacab || !!data.tgl_ttd_kacab_pr, row?.dataset?.nameKacab || '', row?.dataset?.dateKacab || formatInfoDate(data.tgl_ttd_kacab_pr));
                renderInfoTimeline(buildInfoTimeline(data, receiptStatus, receiptSub));
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Membuka Info',
                    text: error.message || 'Terjadi kesalahan saat mengambil informasi PR.',
                    confirmButtonColor: '#EF4444'
                });
                closeInfoPrModal();
            } finally {
                loading?.classList.add('hidden');
                content?.classList.remove('opacity-40', 'pointer-events-none');
            }
        };

        window.closeInfoPrModal = function () {
            const modal = document.getElementById('infoPrModal');
            const card = document.getElementById('infoPrCard');
            if (!modal) return;

            card?.classList.add('info-modal-out');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                card?.classList.remove('info-modal-out');
                document.body.style.overflow = '';
            }, 140);
        };

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                const modal = document.getElementById('infoPrModal');
                if (modal && !modal.classList.contains('hidden')) {
                    closeInfoPrModal();
                }
            }
        });

        // Event listener ESC keyboard
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                // Cari modal yang sedang terbuka
                const logModal = document.getElementById('logModal');
                if (logModal && !logModal.classList.contains('hidden')) {
                    closeLogModal();
                }
            }
        });

        // ==========================================
        // FUNGSI FORMAT RUPIAH UNTUK INPUT
        // ==========================================

        // 1. Format saat mengetik (Live Formatting)
        window.formatInputCurrency = function (input) {
            // Ambil hanya angka dan titik
            let value = input.value.replace(/[^0-9.]/g, '');

            // Cek jika ada titik desimal
            let parts = value.split('.');

            // Format bagian integer (sebelum titik) dengan koma pemisah ribuan
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Gabungkan kembali
            input.value = parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
        };

        // 2. Format saat keluar dari input (Blur) - Paksa 2 desimal
        window.blurInputCurrency = function (input) {
            if (input.value === '') return;

            // Hapus koma untuk hitung
            let raw = input.value.replace(/,/g, '');
            let num = parseFloat(raw);

            if (!isNaN(num)) {
                // Format final: 2 digit desimal paksa (111,111.00)
                input.value = num.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        };

        // 3. Helper untuk Format Tampilan (Bisa dipakai di tempat lain)
        window.formatRupiahGlobal = function (angka) {
            let number = parseFloat(angka);
            if (isNaN(number)) return "";
            return number.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };

        async function showAutoRequestPrompt(prId) {
            // Fetch PR data
            let prNo = 'Nomor PR belum diisi';

            const result = await Swal.fire({
                title: '📨 Request PR ke Umum',
                html: `
                                                                                                                                                    <div class="text-left space-y-3">
                                                                                                                                                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                                                                                                                                                            <p class="text-sm text-green-800">
                                                                                                                                                                <strong>✓ Anda sudah login sebagai Operasional</strong>
                                                                                                                                                            </p>
                                                                                                                                                        </div>

                                                                                                                                                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                                                                                                                            <p class="text-sm font-semibold text-blue-900 mb-2">
                                                                                                                                                                Kirim PR ke Umum untuk approval?
                                                                                                                                                            </p>
                                                                                                                                                            <p class="text-xs text-blue-700">
                                                                                                                                                                PR akan dikirim ke department Umum untuk di-review.
                                                                                                                                                            </p>
                                                                                                                                                        </div>

                                                                                                                                                        <div class="mt-3">
                                                                                                                                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                                                                                                                                Nama Pengaju:
                                                                                                                                                            </label>
                                                                                                                                                            <input 
                                                                                                                                                                type="text" 
                                                                                                                                                                id="requesterName" 
                                                                                                                                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                                                                                                                                placeholder="Nama Anda"
                                                                                                                                                                required>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '📤 Kirim Sekarang',
                cancelButtonText: 'Batal',
                reverseButtons: true,
                preConfirm: () => {
                    const name = document.getElementById('requesterName').value.trim();
                    if (!name || name.length < 2) {
                        Swal.showValidationMessage('Nama wajib diisi (min 2 karakter)');
                        return false;
                    }
                    return name;
                }
            });

            if (result.isConfirmed) {
                const requesterName = result.value;

                // Show loading
                Swal.fire({
                    title: 'Mengirim ke Umum...',
                    html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false
                });

                try {
                    const response = await fetch(`/torpr/${prId}/request-receipt`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            requested_name: requesterName + ' (via QR)'
                        })
                    });

                    const data = await response.json();

                    if (!data.ok) {
                        throw new Error(data.message || 'Gagal mengirim request');
                    }

                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Dikirim!',
                        html: `
                                                                                                                                                            <div class="space-y-2">
                                                                                                                                                                <p class="text-green-700">✅ PR dikirim ke Umum</p>
                                                                                                                                                                <p class="text-xs text-gray-600 mt-3">Menunggu approval dari department Umum</p>
                                                                                                                                                            </div>
                                                                                                                                                        `,
                        confirmButtonColor: '#10B981'
                    });

                    // Reload to show updated status
                    location.reload();

                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Gagal Kirim Request',
                        text: error.message,
                        confirmButtonColor: '#EF4444'
                    });
                }
            }
        }

        let currentQRData = {};

        const showQRWarning = (message) => {
            if (window.Swal) {
                Swal.fire({
                    icon: 'warning',
                    title: 'QR belum bisa dibuka',
                    text: message,
                    confirmButtonColor: '#2563EB'
                });
                return;
            }

            alert(message);
        };

        window.showQRModal = function (prId, type, token, nomorPr) {
            const safeType = ['kabid', 'kacab'].includes(type) ? type : '';
            const safeToken = String(token || '').trim();

            if (!safeType) {
                showQRWarning('Jenis tanda tangan tidak valid.');
                return;
            }

            if (!safeToken) {
                showQRWarning('Token QR belum tersedia. Silakan generate ulang token tanda tangan.');
                return;
            }

            currentQRData = { prId, type: safeType, token: safeToken, nomorPr };

            const modal = document.getElementById('qrModal');
            const title = document.getElementById('qrModalTitle');
            const subtitle = document.getElementById('qrModalSubtitle');
            const qrContainer = document.getElementById('qrCodeImage');

            if (!modal || !title || !subtitle || !qrContainer) {
                console.error('Elemen modal QR tidak ditemukan.');
                showQRWarning('Komponen modal QR tidak ditemukan. Silakan refresh halaman.');
                return;
            }

            const typeLabel = safeType === 'kabid' ? 'Kepala Bidang' : 'Kepala Cabang';
            title.textContent = `QR Code TTD ${typeLabel}`;
            subtitle.textContent = `PR: ${nomorPr || '-'}`;

            const qrApiBaseUrl = @json(url('/pr/sign-qr'));
            const qrApiUrl = `${qrApiBaseUrl}/${encodeURIComponent(safeToken)}/${safeType}`;

            qrContainer.innerHTML = `
                <img
                    src="${qrApiUrl}"
                    alt="QR Code ${typeLabel}"
                    class="w-48 h-48"
                    onerror="this.outerHTML='<div class=&quot;w-48 h-48 flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4 text-center text-xs font-semibold text-red-700&quot;>QR gagal dimuat. Token mungkin kedaluwarsa.</div>'"
                >
            `;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        };

        document.addEventListener('click', function (event) {
            const button = event.target.closest('[data-qr-trigger]');
            if (!button) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            window.showQRModal(
                button.dataset.prId,
                button.dataset.qrType,
                button.dataset.qrToken,
                button.dataset.nomorPr
            );
        });

        window.closeQRModal = function () {
            const modal = document.getElementById('qrModal');
            if (!modal) return;
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        window.printQR = function () {
            const { prId, nomorPr } = currentQRData;
            const row = document.querySelector(`[data-row-id="${prId}"]`);

            if (!row) {
                alert('Data tidak ditemukan');
                return;
            }

            // ✅ HELPER: Generate konten berdasarkan status TTD
            const generateContent = (type) => {
                const label = type === 'kabid' ? 'Kepala Bidang' : 'Kepala Cabang';
                const isSigned = row.dataset['signed' + type.charAt(0).toUpperCase() + type.slice(1)] === '1';
                const signerName = row.dataset['name' + type.charAt(0).toUpperCase() + type.slice(1)];
                const signerDate = row.dataset['date' + type.charAt(0).toUpperCase() + type.slice(1)];
                const safeSignerName = escapeHtml(signerName || label);
                const safeSignerDate = escapeHtml(signerDate || '');

                if (isSigned) {
                    // ✅ JIKA SUDAH TTD: Tampilkan pesan sukses
                    return `
                                                                                                                                    <div style="
                                                                                                                                        width: 200px; 
                                                                                                                                        height: 200px; 
                                                                                                                                        border: 2px solid #10B981; 
                                                                                                                                        background: #ECFDF5; 
                                                                                                                                        border-radius: 12px;
                                                                                                                                        display: flex; 
                                                                                                                                        flex-direction: column; 
                                                                                                                                        justify-content: center; 
                                                                                                                                        align-items: center; 
                                                                                                                                        text-align: center;
                                                                                                                                        padding: 15px;
                                                                                                                                        margin: 10px auto;
                                                                                                                                    ">
                                                                                                                                        <div style="font-size: 40px; color: #10B981; margin-bottom: 10px;">✓</div>
                                                                                                                                        <div style="font-weight: bold; color: #047857; font-size: 14px;">SUDAH TTD</div>
                                                                                                                                        <div style="font-size: 12px; color: #065F46; margin-top: 5px; font-weight: 600;">
                                                                                                                                            ${safeSignerName}
                                                                                                                                        </div>
                                                                                                                                        <div style="font-size: 10px; color: #6B7280; margin-top: 3px;">
                                                                                                                                            ${safeSignerDate}
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                `;
                } else {
                    // ✅ JIKA BELUM TTD: Tampilkan QR Code
                    const qrUrl = generateQRUrl(prId, type);
                    if (!qrUrl) return '<p style="color:red; font-size:10px;">Error: Token tidak ditemukan</p>';

                    return `
                                                                                                                                    <img src="${qrUrl}" alt="QR ${label}" style="width: 200px; height: 200px; margin: 10px 0;">
                                                                                                                                    <div style="
                                                                                                                                        background: #f3f4f6; 
                                                                                                                                        padding: 8px; 
                                                                                                                                        margin-top: 5px; 
                                                                                                                                        border-radius: 6px;
                                                                                                                                        font-size: 11px;
                                                                                                                                        color: #374151;
                                                                                                                                        font-weight: 600;
                                                                                                                                    ">
                                                                                                                                        SCAN UNTUK TTD
                                                                                                                                    </div>
                                                                                                                                `;
                }
            };

            // Generate konten untuk masing-masing role
            const contentKabid = generateContent('kabid');
            const contentKacab = generateContent('kacab');

            // Buka window print
            const printWindow = window.open('', '_blank');
            const safeNomorPr = escapeHtml(nomorPr || '');
            printWindow.document.write(`
                                                                                                                            <!DOCTYPE html>
                                                                                                                            <html>
                                                                                                                            <head>
                                                                                                                                <title>QR Purchase Request - ${safeNomorPr}</title>
                                                                                                                                <style>
                                                                                                                                    * { margin: 0; padding: 0; box-sizing: border-box; }
                                                                                                                                    body {
                                                                                                                                        font-family: Arial, sans-serif;
                                                                                                                                        padding: 20px;
                                                                                                                                        background: white;
                                                                                                                                    }
                                                                                                                                    .container { max-width: 800px; margin: 0 auto; }
                                                                                                                                    .header {
                                                                                                                                        text-align: center;
                                                                                                                                        margin-bottom: 25px;
                                                                                                                                        padding-bottom: 15px;
                                                                                                                                        border-bottom: 2px solid #000;
                                                                                                                                    }
                                                                                                                                    h1 { font-size: 22px; margin-bottom: 5px; }
                                                                                                                                    h2 { font-size: 16px; color: #555; font-weight: normal; }
                                                                                                                                    .qr-grid {
                                                                                                                                        display: grid;
                                                                                                                                        grid-template-columns: 1fr 1fr;
                                                                                                                                        gap: 30px;
                                                                                                                                        margin: 20px 0;
                                                                                                                                    }
                                                                                                                                    .qr-box {
                                                                                                                                        border: 1px solid #E5E7EB;
                                                                                                                                        padding: 20px;
                                                                                                                                        text-align: center;
                                                                                                                                        background: #FAFAFA;
                                                                                                                                        border-radius: 10px;
                                                                                                                                    }
                                                                                                                                    .qr-box h3 {
                                                                                                                                        margin-bottom: 15px;
                                                                                                                                        font-size: 14px;
                                                                                                                                        color: #111;
                                                                                                                                    }
                                                                                                                                    .instructions {
                                                                                                                                        background: #F9FAFB;
                                                                                                                                        border: 1px solid #E5E7EB;
                                                                                                                                        padding: 15px;
                                                                                                                                        margin-top: 20px;
                                                                                                                                        font-size: 11px;
                                                                                                                                        border-radius: 8px;
                                                                                                                                    }
                                                                                                                                    .instructions strong { display: block; margin-bottom: 8px; }
                                                                                                                                    .instructions ol { margin-left: 20px; }
                                                                                                                                    .instructions li { margin: 4px 0; color: #4B5563; }
                                                                                                                                    @media print {
                                                                                                                                        body { padding: 0; }
                                                                                                                                        .no-print { display: none; }
                                                                                                                                    }
                                                                                                                                </style>
                                                                                                                            </head>
                                                                                                                            <body>
                                                                                                                                <div class="container">
                                                                                                                                    <div class="header">
                                                                                                                                        <h1>QR PURCHASE REQUEST</h1>
                                                                                                                                        <h2>Nomor: ${safeNomorPr}</h2>
                                                                                                                                    </div>

                                                                                                                                    <div class="qr-grid">
                                                                                                                                        <!-- Kolom Kabid -->
                                                                                                                                        <div class="qr-box">
                                                                                                                                            <h3>📝 KEPALA BIDANG</h3>
                                                                                                                                            ${contentKabid}
                                                                                                                                        </div>

                                                                                                                                        <!-- Kolom Kacab -->
                                                                                                                                        <div class="qr-box">
                                                                                                                                            <h3>👔 KEPALA CABANG</h3>
                                                                                                                                            ${contentKacab}
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                    <div class="instructions">
                                                                                                                                        <strong>📱 Petunjuk:</strong>
                                                                                                                                        <ol>
                                                                                                                                            <li>Scan QR Code yang tersedia menggunakan kamera HP.</li>
                                                                                                                                            <li>Jika sudah ada tanda "SUDAH TTD", berarti pihak tersebut sudah menyetujui.</li>
                                                                                                                                            <li>Pastikan semua pihak sudah TTD sebelum melanjutkan proses.</li>
                                                                                                                                        </ol>
                                                                                                                                        <p style="margin-top: 15px; color: #9CA3AF; text-align: right;">
                                                                                                                                            Dicetak: ${new Date().toLocaleString('id-ID')}
                                                                                                                                        </p>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </body>
                                                                                                                            </html>
                                                                                                                        `);

            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => printWindow.print(), 250);
        };

        function generateQRUrl(prId, type) {
            const row = document.querySelector(`[data-row-id="${prId}"]`);
            if (!row) return '';

            // Ambil token dari dataset (data-token-kabid -> dataset.tokenKabid)
            const token = row.dataset['token' + type.charAt(0).toUpperCase() + type.slice(1)];
            if (!token) return '';

            return `${window.location.origin}/pr/sign-qr/${encodeURIComponent(token)}/${type}`;
        }

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeQRModal();
            }
        });

        function toggleDateInputs(value) {
            const dateFromContainer = document.getElementById('dateFromContainer');
            const dateToContainer = document.getElementById('dateToContainer');

            if (value === 'custom') {
                dateFromContainer.classList.remove('hidden');
                dateToContainer.classList.remove('hidden');
            } else {
                dateFromContainer.classList.add('hidden');
                dateToContainer.classList.add('hidden');
                // Clear custom date values
                document.getElementById('dateFrom').value = '';
                document.getElementById('dateTo').value = '';
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            const dateFilter = document.getElementById('dateFilterType').value;
            toggleDateInputs(dateFilter);
        });

        function changePerPage(value) {
            const url = new URL(window.location.href);
            url.searchParams.set('per_page', value);
            url.searchParams.set('page', '1'); // Reset ke halaman 1
            window.location.href = url.toString();
        }

        window.openResubmitModal = function (torprId, rejectionReason) {
            document.getElementById('resubmitTorprId').value = torprId;
            document.getElementById('resubmitRejectionReason').textContent = rejectionReason || 'Tidak ada alasan yang diberikan';
            document.getElementById('resubmitForm').reset();
            document.getElementById('resubmitTorprId').value = torprId; // Set again after reset

            const modal = document.getElementById('resubmitModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };

        window.closeResubmitModal = function () {
            const modal = document.getElementById('resubmitModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        };

        window.handleResubmit = async function (event) {
            event.preventDefault();

            const torprId = document.getElementById('resubmitTorprId').value;
            const name = document.getElementById('resubmitName').value.trim();
            const notes = document.getElementById('resubmitNotes').value.trim();

            // ✅ VALIDATION
            if (!name || name.length < 2) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Nama Wajib Diisi',
                    text: 'Silakan masukkan nama pengaju minimal 2 karakter',
                    confirmButtonColor: '#10B981'
                });
                return;
            }

            if (!notes || notes.length < 10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Catatan Perbaikan Wajib',
                    text: 'Jelaskan perbaikan yang sudah dilakukan minimal 10 karakter',
                    confirmButtonColor: '#10B981'
                });
                return;
            }

            // ✅ CONFIRMATION DOUBLE CHECK
            const confirm1 = await Swal.fire({
                title: '⚠️ Konfirmasi Perbaikan',
                html: `
                                                                                                                                                                                            <div class="text-left space-y-3">
                                                                                                                                                                                                <p class="text-gray-700 dark:text-gray-300">Apakah Anda sudah <strong>memperbaiki semua</strong> sesuai alasan penolakan dari Umum?</p>
                                                                                                                                                                                                <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded border-l-4 border-red-500">
                                                                                                                                                                                                    <p class="text-sm text-red-800 dark:text-red-300 font-semibold">Alasan Penolakan:</p>
                                                                                                                                                                                                    <p class="text-sm text-red-700 dark:text-red-400 mt-1">${document.getElementById('resubmitRejectionReason').textContent}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                                                                                                                                                                                                    <p class="text-sm text-green-800 dark:text-green-300 font-semibold">Catatan Perbaikan Anda:</p>
                                                                                                                                                                                                    <p class="text-sm text-green-700 dark:text-green-400 mt-1">${notes}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '✓ Ya, Sudah Diperbaiki',
                cancelButtonText: '✗ Belum, Batalkan',
                customClass: {
                    popup: 'text-left'
                }
            });

            if (!confirm1.isConfirmed) return;

            // ✅ SECOND CONFIRMATION
            const confirm2 = await Swal.fire({
                title: '📨 Kirim Pengajuan Ulang?',
                html: `
                                                                                                                                                                                            <p class="text-gray-700 dark:text-gray-300 mb-3">PR akan dikirim ke Umum untuk direview lagi.</p>
                                                                                                                                                                                            <p class="text-sm text-gray-600 dark:text-gray-400">Pastikan data sudah benar sebelum melanjutkan.</p>
                                                                                                                                                                                        `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '📤 Ya, Kirim Sekarang',
                cancelButtonText: 'Batal'
            });

            if (!confirm2.isConfirmed) return;

            // ✅ SHOW LOADING
            const btnText = document.getElementById('btnResubmitText');
            const btnSpinner = document.getElementById('btnResubmitSpinner');
            btnText.textContent = 'Mengirim...';
            btnSpinner.classList.remove('hidden');

            try {
                const response = await fetch(`/torpr/${torprId}/resubmit`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        requested_name: name,
                        resubmit_notes: notes
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Gagal mengajukan ulang PR');
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Diajukan Ulang!',
                    html: `
                                                                                                                                                                                                <p class="text-gray-700 dark:text-gray-300">PR telah dikirim ke Umum untuk direview lagi.</p>
                                                                                                                                                                                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Tunggu approval dari Umum.</p>                                                                                                                                          `,
                    confirmButtonColor: '#10B981'
                });

                closeResubmitModal();
                location.reload();

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.message || 'Terjadi kesalahan saat mengajukan ulang PR',
                    confirmButtonColor: '#EF4444'
                });
            } finally {
                btnText.textContent = 'Ajukan Ulang';
                btnSpinner.classList.add('hidden');
            }
        };

        // Close modal on ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeResubmitModal();
            }
        });

        // ==========================================
        // EXPORT CONFIRMATION
        // ==========================================
        window.confirmExport = function () {
            Swal.fire({
                title: 'Export Data TORPR?',
                text: 'Anda akan mengexport semua data TORPR yang sesuai dengan filter aktif.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Export',
                cancelButtonText: 'Batal',
                allowOutsideClick: true,
                allowEscapeKey: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const params = new URLSearchParams(window.location.search);
                    window.location.href = `/torpr/export/full?${params.toString()}`;

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Export dimulai!',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        };

        // ==========================================
        // IMPORT FUNCTIONALITY
        // ==========================================
        let previewData = [];

        window.openImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            resetImport();
        };

        window.closeImportModal = function () {
            const modal = document.getElementById('importModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resetImport();
        };

        window.resetImport = function () {
            document.getElementById('uploadStep').classList.remove('hidden');
            document.getElementById('previewStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('importFile').value = '';
            previewData = [];
        };

        window.handleFileSelect = async function (event) {
            const file = event.target.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            // Validasi ukuran file
            if (file.size > 10 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Terlalu Besar',
                    text: 'Ukuran file maksimal 10MB',
                    confirmButtonColor: '#EF4444'
                });
                return;
            }

            // Validasi ekstensi
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['xlsx', 'xls', 'csv'].includes(ext)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format File Salah',
                    text: 'Format file harus Excel (.xlsx, .xls) atau CSV',
                    confirmButtonColor: '#EF4444'
                });
                return;
            }

            // Show loading
            document.getElementById('uploadStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.remove('hidden');

            // Upload & preview
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('{{ route("torpr.import.preview") }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal memproses file');
                }

                if (!result.success) {
                    throw new Error(result.message);
                }

                // Store data
                previewData = result.data;

                // Show preview
                showPreview(result);

            } catch (error) {
                console.error('Error during import:', error);
                document.getElementById('loadingStep').classList.add('hidden');
                document.getElementById('uploadStep').classList.remove('hidden');

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Import',
                    text: error.message,
                    confirmButtonColor: '#EF4444'
                });
            }
        };

        // ===== REPLACE showPreview function di JavaScript =====

        function showPreview(result) {
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('previewStep').classList.remove('hidden');

            // Update Summary
            document.getElementById('totalRows').textContent = result.summary.total;
            document.getElementById('validRows').textContent = result.summary.valid;
            document.getElementById('errorRows').textContent = result.summary.error;

            // Show/Hide Alert
            const errorAlert = document.getElementById('errorAlert');
            const errorCount = document.getElementById('errorCount');

            if (result.summary.error > 0) {
                errorAlert.classList.remove('hidden');
                errorCount.textContent = result.summary.error;
            } else {
                errorAlert.classList.add('hidden');
            }

            // Pisahkan Error dan Valid
            const errorRows = result.data.filter(d => d.status === 'error');
            const validRows = result.data.filter(d => d.status === 'valid');
            const displayData = [...errorRows, ...validRows];

            // Render Table
            const tbody = document.getElementById('previewTableBody');
            tbody.innerHTML = '';

            const formatRupiah = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');
            const escapeHtml = (str) => String(str ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

            // ✅ FIX: Tampilkan success message HANYA jika semua valid
            if (errorRows.length === 0) {
                const successMsg = document.createElement('tr');
                successMsg.innerHTML = `
                                                                                                                                                                                                                                            <td colspan="7" class="px-4 py-6 text-center bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 font-semibold animate-fade-in">
                                                                                                                                                                                                                                                ✅ Semua data valid! Tidak ditemukan error. Klik "Proses Import" untuk melanjutkan.
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                        `;
                tbody.appendChild(successMsg);
            }

            displayData.forEach((row, index) => {
                const isError = row.status === 'error';

                const statusBadge = isError
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-md uppercase tracking-wide">
                                                                                                                                                                                                                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                                                                                                                                                                                                ERROR
                                                                                                                                                                                                                                               </span>`
                    : `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded uppercase">
                                                                                                                                                                                                                                                ✓ VALID
                                                                                                                                                                                                                                               </span>`;

                // ✅ FIX: Render Detail Error dengan proper handling
                let errorHtml = '<span class="text-gray-400 italic text-xs">-</span>';
                if (row.errors && row.errors.length > 0) {
                    errorHtml = '<div class="space-y-1">';
                    row.errors.forEach(err => {
                        errorHtml += `<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-2 py-1.5 rounded text-xs font-medium leading-snug">
                                                                                                                                                                                                                                                    ⚠️ ${escapeHtml(err)}
                                                                                                                                                                                                                                                </div>`;
                    });
                    errorHtml += '</div>';
                }

                const tr = document.createElement('tr');

                if (isError) {
                    tr.className = 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-b border-red-200 dark:border-red-800 transition-all';
                } else {
                    tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 transition-all';
                }

                tr.innerHTML = `
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                                                                                                                                                                                                                                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-bold ${isError ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}">
                                                                                                                                                                                                                                                    ${row.row_number}
                                                                                                                                                                                                                                                </span>
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                                                                                                                                                                                                                                                ${statusBadge}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 font-mono text-xs border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-red-900 dark:text-red-300 font-bold' : 'text-gray-700 dark:text-gray-300'}">
                                                                                                                                                                                                                                                ${escapeHtml(row.nomor_pr || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 ${isError ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400'}" title="${escapeHtml(row.tujuan_pengadaan)}">
                                                                                                                                                                                                                                                ${escapeHtml(row.tujuan_pengadaan || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" title="${escapeHtml(row.portofolio)}">
                                                                                                                                                                                                                                                ${escapeHtml(row.portofolio || '-')}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 text-xs border-r border-gray-200 dark:border-gray-700 text-right font-mono">
                                                                                                                                                                                                                                                ${row.jumlah_pr ? formatRupiah(row.jumlah_pr) : '-'}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                            <td class="px-3 py-3 align-top">
                                                                                                                                                                                                                                                ${errorHtml}
                                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                                        `;

                tbody.appendChild(tr);
            });

            // ✅ FIX: Button Logic yang Benar
            const hasErrors = result.summary.error > 0;
            const btnProcess = document.getElementById('btnProcess');

            if (hasErrors) {
                // --- STATE ERROR ---
                btnProcess.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all bg-red-600 text-white border-red-300 cursor-not-allowed opacity-60";
                btnProcess.disabled = true;
                btnProcess.innerHTML = `
                                                                                                                                                                                                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                                                                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                                                                                                                                                                                                            </svg>
                                                                                                                                                                                                                                            <span>Perbaiki Error Dulu</span>
                                                                                                                                                                                                                                        `;
            } else {
                // --- STATE NORMAL ---
                btnProcess.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95";
                btnProcess.disabled = false;
                btnProcess.innerHTML = `
                                                                                                                                                                                                                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                                                                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                                                                                                                                                                                            </svg>
                                                                                                                                                                                                                                            <span id="btnProcessText">Proses Import</span>
                                                                                                                                                                                                                                            <span id="btnProcessSpinner" class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                                                                                                                                                                                                                        `;
            }
        }

        window.processImport = async function () {
            if (previewData.length === 0) {
                Swal.fire('Error', 'Tidak ada data untuk diimport', 'error');
                return;
            }

            const validData = previewData.filter(d => d.status === 'valid');

            if (validData.length === 0) {
                Swal.fire('Error', 'Tidak ada data valid untuk diimport', 'error');
                return;
            }

            const result = await Swal.fire({
                title: 'Konfirmasi Import',
                html: `Akan mengimport <strong>${validData.length}</strong> data TORPR.<br>Lanjutkan?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Import',
                cancelButtonText: 'Batal'
            });

            if (!result.isConfirmed) return;

            const btnProcess = document.getElementById('btnProcess');
            const btnProcessText = document.getElementById('btnProcessText');
            const btnProcessSpinner = document.getElementById('btnProcessSpinner');

            btnProcess.disabled = true;
            btnProcessText.textContent = 'Memproses...';
            btnProcessSpinner.classList.remove('hidden');

            try {
                const response = await fetch('{{ route("torpr.import.process") }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ data: validData })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal import data');
                }

                let message = `Berhasil import ${result.imported} data`;
                if (result.failed > 0) {
                    message += `\nGagal: ${result.failed} data`;
                    if (result.errors && result.errors.length > 0) {
                        message += '\n\nError:\n' + result.errors.join('\n');
                    }
                }

                await Swal.fire({
                    title: 'Import Selesai',
                    text: message,
                    icon: result.failed > 0 ? 'warning' : 'success',
                    confirmButtonColor: '#10B981'
                });

                closeImportModal();
                setTimeout(() => location.reload(), 500);

            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            } finally {
                btnProcess.disabled = false;
                btnProcessText.textContent = '✓ Proses Import';
                btnProcessSpinner.classList.add('hidden');
            }
        };
        // ==========================================
        // FORM CRUD FUNCTIONALITY
        // ==========================================
        (function () {
            const formModal = document.getElementById('formModal');
            const torprForm = document.getElementById('torprForm');
            const formTitle = document.getElementById('formTitle');
            const torprId = document.getElementById('torpr_id');

            const btnSaveText = document.getElementById('btnSaveText');
            const btnSaveSpinner = document.getElementById('btnSaveSpinner');

            function setSaving(x) {
                if (x) {
                    btnSaveSpinner.classList.remove('hidden');
                    btnSaveText.textContent = 'Menyimpan...';
                } else {
                    btnSaveSpinner.classList.add('hidden');
                    btnSaveText.textContent = 'Simpan';
                }
            }

            function clearErrors() {
                torprForm.querySelectorAll('p[id^="err_"]').forEach(p => {
                    p.textContent = '';
                    p.classList.add('hidden');
                });
                torprForm.querySelectorAll('input, textarea, select').forEach(el => {
                    el.classList.remove('ring-2', 'ring-red-200', 'border-red-400');
                });
            }

            function showFieldError(field, message) {
                const p = document.getElementById('err_' + field);
                const input = torprForm.querySelector('[name="' + field + '"]');
                if (p) {
                    p.textContent = message;
                    p.classList.remove('hidden');
                }
                if (input) {
                    input.classList.add('border-red-400', 'ring-2', 'ring-red-200');
                }
            }

            function wireRealtimeClear() {
                torprForm.querySelectorAll('input, textarea, select').forEach(el => {
                    el.addEventListener('input', () => {
                        const p = document.getElementById('err_' + el.name);
                        if (p) {
                            p.textContent = '';
                            p.classList.add('hidden');
                        }
                        el.classList.remove('ring-2', 'ring-red-200', 'border-red-400');
                    });
                });
            }
            wireRealtimeClear();

            // ✅ Auto UPPERCASE untuk Nomor PR
            const nomorPrInput = document.getElementById('nomor_pr');
            if (nomorPrInput) {
                nomorPrInput.addEventListener('input', function () {
                    const start = this.selectionStart;
                    const end = this.selectionEnd;
                    this.value = this.value.toUpperCase();
                    this.setSelectionRange(start, end);
                });
            }

            function updateFormGuidance(mode = 'create') {
                const titleEl = document.getElementById('formGuidanceTitle');
                const subtitleEl = document.getElementById('formGuidanceSubtitle');
                const messageEl = document.getElementById('formGuidanceMessage');
                const badgeEl = document.getElementById('formGuidanceBadge');
                const listEl = document.getElementById('formGuidanceList');
                const boxEl = document.getElementById('formGuidanceBox');
                if (!titleEl || !subtitleEl || !messageEl || !badgeEl || !listEl || !boxEl) return;

                const isEdit = mode === 'edit';

                titleEl.textContent = isEdit
                    ? 'Informasi Edit PR Operasional'
                    : 'Informasi Pengisian PR Operasional';

                subtitleEl.textContent = isEdit
                    ? 'Pastikan perubahan data tetap lengkap sebelum PR diproses ke Umum.'
                    : 'Harap lengkapi seluruh data PR sebelum diajukan ke Umum.';

                if (canAccessKacab) {
                    badgeEl.textContent = 'Superadmin Operasional';
                    messageEl.innerHTML = 'Anda login sebagai <strong>Superadmin Operasional</strong>. Mohon pastikan data PR lengkap, akurat, dan siap diproses. Kolom <strong>Ttd Kacab PR</strong> tersedia untuk Anda, namun seluruh kolom utama tetap harus dilengkapi terlebih dahulu.';
                    listEl.innerHTML = "<li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Tujuan Pengadaan</strong>, <strong>Portofolio</strong>, <strong>Nomor PR</strong>, <strong>Tanggal PR</strong>, dan <strong>Harga / Jumlah PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Ttd Kabid PR</strong>. Bila diperlukan, Anda juga dapat melengkapi <strong>Ttd Kacab PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300\">!</span><span>Tombol <strong>Request Umum</strong> hanya tersedia untuk <strong>Superadmin Operasional</strong> saat semua data wajib sudah lengkap.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300\">✕</span><span>Jika masih ada kolom wajib kosong, PR tidak dapat diajukan ke Umum.</span></li>";
                } else {
                    badgeEl.textContent = 'User Operasional';
                    messageEl.innerHTML = 'Anda login sebagai <strong>User Operasional</strong>. Mohon isi semua data PR secara lengkap dan benar. Khusus kolom <strong>Ttd Kacab PR</strong>, kolom tersebut <strong>tidak perlu Anda isi</strong> karena hanya bisa dilengkapi oleh <strong>Superadmin Operasional</strong>.';
                    listEl.innerHTML = "<li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Tujuan Pengadaan</strong>, <strong>Portofolio</strong>, <strong>Nomor PR</strong>, <strong>Tanggal PR</strong>, dan <strong>Harga / Jumlah PR</strong>.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300\">✓</span><span>Lengkapi <strong>Ttd Kabid PR</strong> agar PR siap diproses pada tahap berikutnya.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300\">!</span><span>Kolom <strong>Ttd Kacab PR</strong> akan dikunci untuk Anda dan tidak perlu diisi.</span></li><li class=\"form-guidance-item flex items-start gap-2\"><span class=\"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300\">✕</span><span>Jika ada data wajib kosong, tombol <strong>Request Umum</strong> tidak akan muncul / tidak bisa diproses.</span></li>";
                }

                boxEl.classList.remove('animate-pulse');
                void boxEl.offsetWidth;
                boxEl.classList.add('animate-pulse');
                setTimeout(() => boxEl.classList.remove('animate-pulse'), 900);
            }

            function openModal(title) {
                formTitle.textContent = title;
                formModal.classList.remove('hidden');
                formModal.classList.add('flex');
            }

            window.openCreateForm = function () {
                torprForm.reset();
                torprId.value = '';
                if (window.jQuery) $('#portofolio').val('').trigger('change');
                clearErrors();
                openModal('Tambah TORPR');
                updateFormGuidance('create');

                // ✅ DISABLE FIELD KACAB JIKA TIDAK BERHAK
                const inputKacab = document.getElementById('tgl_ttd_kacab_pr');
                const warnKacab = document.getElementById('warn_ttd_kacab');

                if (!canAccessKacab) {
                    inputKacab.disabled = true;
                    inputKacab.classList.add('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                    warnKacab.classList.remove('hidden'); // Tampilkan pesan
                } else {
                    inputKacab.disabled = false;
                    inputKacab.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                    warnKacab.classList.add('hidden'); // Sembunyikan pesan
                }
            }

            // ==========================================
            // OPEN EDIT FORM - OPTIMIZED DENGAN LOADING INDICATOR
            // ==========================================
            window.openEditForm = async function (id) {
                clearErrors();

                // ✅ TAMPILKAN LOADING DULU SEBELUM FETCH
                Swal.fire({
                    title: 'Memuat data...',
                    html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        // Start fetching data IMMEDIATELY setelah Swal muncul
                        fetchAndPopulateEditForm(id);
                    }
                });
            }

            // ✅ PISAHKAN LOGIC FETCH KE FUNCTION TERPISAH
            async function fetchAndPopulateEditForm(id) {
                try {
                    const r = await fetch(`/torpr/${id}/json`, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest' // ✅ Tambahkan header
                        }
                    });

                    if (!r.ok) throw new Error('Gagal mengambil data TORPR.');

                    const d = await r.json();

                    // ✅ TUTUP LOADING SWAL
                    Swal.close();

                    // ✅ POPULATE FORM
                    const torprForm = document.getElementById('torprForm');
                    const torprId = document.getElementById('torpr_id');

                    torprForm.reset();
                    torprId.value = d.id;

                    Object.keys(d).forEach(k => {
                        const el = torprForm.querySelector('[name="' + k + '"]');
                        if (!el) return;

                        // ✅ LOGIC BARU UNTUK FORMAT
                        if (k === 'jumlah_pr') {
                            // Jika kolom jumlah_pr, format sebagai Rupiah
                            el.value = d[k] ? formatRupiahGlobal(d[k]) : '';
                        }
                        else if (el.type === 'datetime-local' && d[k]) {
                            const datetime = d[k].replace(' ', 'T').substring(0, 16);
                            el.value = datetime;
                        } else {
                            el.value = (d[k] ?? '');
                        }
                    });

                    if (window.jQuery) $('#portofolio').val(d.portofolio || '').trigger('change');

                    const inputKacab = document.getElementById('tgl_ttd_kacab_pr');
                    const warnKacab = document.getElementById('warn_ttd_kacab');

                    if (!canAccessKacab) {
                        inputKacab.disabled = true;
                        inputKacab.classList.add('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                        warnKacab.classList.remove('hidden');
                    } else {
                        inputKacab.disabled = false;
                        inputKacab.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'cursor-not-allowed');
                        warnKacab.classList.add('hidden');
                    }

                    // ✅ BUKA MODAL EDIT
                    const formModal = document.getElementById('formModal');
                    const formTitle = document.getElementById('formTitle');

                    formTitle.textContent = 'Edit TORPR';
                    updateFormGuidance('edit');
                    formModal.classList.remove('hidden');
                    formModal.classList.add('flex');

                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: e.message || 'Gagal membuka data',
                        confirmButtonColor: '#EF4444'
                    });
                }
            }

            window.closeForm = function () {
                formModal.classList.add('hidden');
                formModal.classList.remove('flex');
            }

            async function submitTorpr(url, method, payload) {
                clearErrors();

                // Validasi Tujuan Pengadaan
                if (!payload.tujuan_pengadaan || payload.tujuan_pengadaan.trim() === '') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Tujuan Pengadaan Wajib',
                        text: 'Kolom Tujuan Pengadaan harus diisi sebelum menyimpan.',
                        confirmButtonColor: '#F59E0B'
                    });
                    const inputTujuan = torprForm.querySelector('[name="tujuan_pengadaan"]');
                    if (inputTujuan) inputTujuan.classList.add('border-red-400', 'ring-2', 'ring-red-200');
                    return;
                }

                setSaving(true);

                try {
                    const r = await fetch(url, {
                        method,
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const isJson = (r.headers.get('content-type') || '').includes('application/json');
                    const j = isJson ? await r.json().catch(() => ({})) : {};

                    if (r.status === 422) {
                        const errs = j.errors || {};
                        Object.keys(errs).forEach(field => {
                            showFieldError(field, errs[field]?.[0] || 'Input tidak valid');
                        });

                        if (errs.tujuan_pengadaan) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Validasi Gagal',
                                text: 'Tujuan Pengadaan wajib diisi.',
                                confirmButtonColor: '#EF4444'
                            });
                        } else if (errs.nomor_pr && errs.nomor_pr.length) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Nomor PR sudah ada',
                                text: errs.nomor_pr[0],
                                confirmButtonColor: '#F59E0B'
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Validasi gagal',
                                text: j.message || 'Periksa input yang berwarna merah.',
                                confirmButtonColor: '#EF4444'
                            });
                        }

                        setSaving(false);
                        return;
                    }

                    if (!r.ok) {
                        throw new Error(j?.message || 'Gagal menyimpan. Terjadi kesalahan server.');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Data berhasil disimpan.',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'animate-scale-in'
                        }
                    }).then(() => location.reload());
                } catch (err) {
                    setSaving(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: err.message || 'Gagal menyimpan',
                        confirmButtonColor: '#EF4444'
                    });
                }
            }

            torprForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const id = torprId.value;
                const payload = {};

                torprForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;

                    let val = el.value;

                    // ✅ FIX: Jika kolom jumlah_pr, hapus koma pemisah ribuan
                    if (el.name === 'jumlah_pr') {
                        val = val.replace(/,/g, ''); // "1,000.00" -> "1000.00"
                    }

                    payload[el.name] = (val === '' ? null : val);
                });

                submitTorpr(id ? `/torpr/${id}` : '/torpr', id ? 'PUT' : 'POST', payload);
            });

            function padTorprTime(value) {
                return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
            }

            function formatTorprLockTime(seconds) {
                const safeSeconds = Math.max(0, Math.ceil(Number(seconds) || 0));
                const hours = Math.floor(safeSeconds / 3600);
                const minutes = Math.floor((safeSeconds % 3600) / 60);
                const remainSeconds = safeSeconds % 60;

                return `${padTorprTime(hours)}:${padTorprTime(minutes)}:${padTorprTime(remainSeconds)}`;
            }

            function formatTorprFullDateTime(date = new Date()) {
                return new Intl.DateTimeFormat('id-ID', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Jakarta',
                }).format(date);
            }

            const torprIncomingEditRequests = @js($incomingEditRequests->map(function ($req) {
                return [
                    'id' => $req->id,
                    'nomor_pr' => $req->torpr?->nomor_pr ?: 'Nomor PR belum diisi',
                    'tujuan' => $req->torpr?->tujuan_pengadaan ?: '-',
                    'requester' => $req->requester?->name ?: 'User',
                    'email' => $req->requester?->email ?: '-',
                    'reason' => $req->reason ?: '-',
                    'created_at' => $req->created_at?->timezone('Asia/Jakarta')->format('d M Y H:i:s') . ' WIB',
                ];
            })->values());

            const torprOutgoingEditRequests = @js($outgoingEditRequests->map(function ($req) {
                return [
                    'id' => $req->id,
                    'nomor_pr' => $req->torpr?->nomor_pr ?: 'Nomor PR belum diisi',
                    'tujuan' => $req->torpr?->tujuan_pengadaan ?: '-',
                    'owner' => $req->owner?->name ?: 'Pembuat PR',
                    'status' => $req->status,
                    'reason' => $req->reason ?: '-',
                    'created_at' => $req->created_at?->timezone('Asia/Jakarta')->format('d M Y H:i:s') . ' WIB',
                    'reviewed_at' => $req->reviewed_at?->timezone('Asia/Jakarta')->format('d M Y H:i:s') . ' WIB',
                    'expires_at' => $req->expires_at?->timezone('Asia/Jakarta')->format('d M Y H:i:s') . ' WIB',
                    'review_note' => $req->review_note ?: '-',
                ];
            })->values());

            window.requestTorprEditAccess = async function (id, nomorPr, creatorName, creatorContact) {
                const safeNomor = nomorPr || 'Nomor PR belum diisi';
                const safeCreator = creatorName || 'Pembuat PR';
                const safeContact = creatorContact || 'kontak belum tercatat';

                const result = await Swal.fire({
                    icon: 'info',
                    title: 'Edit PR terkunci',
                    html: `
                        <div class="torpr-edit-request-card">
                            <div><strong>Data:</strong> ${escapeHtml(safeNomor)}</div>
                            <div><strong>Pembuat:</strong> ${escapeHtml(safeCreator)}</div>
                            <div><strong>Kontak:</strong> ${escapeHtml(safeContact)}</div>
                            <div class="mt-2">
                                Edit hanya bisa dilakukan oleh pembuat PR supaya riwayat data tetap jelas.
                                Jika user lain perlu mengubah data, gunakan request edit dulu ke pembuat PR.
                            </div>
                        </div>
                        <div class="torpr-edit-request-template">
                            <strong>Alasan request edit <span class="text-red-500">*</span></strong><br>
                            <p class="torpr-edit-request-help">
                                Wajib diisi minimal 10 karakter agar pembuat PR tahu bagian mana yang perlu dibuka untuk diedit.
                            </p>
                            <textarea id="torprEditRequestReason" class="torpr-edit-request-reason" minlength="10" maxlength="500" placeholder="Contoh: Mohon izin edit karena nilai PR perlu disesuaikan dengan dokumen terbaru."></textarea>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Kirim Request',
                    cancelButtonText: 'Tutup',
                    confirmButtonColor: '#16a34a',
                    cancelButtonColor: '#64748b',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading(),
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    preConfirm: async () => {
                        const reason = document.getElementById('torprEditRequestReason')?.value?.trim() || '';
                        if (reason.length < 10) {
                            Swal.showValidationMessage('Alasan request edit wajib diisi minimal 10 karakter.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr/${id}/request-edit`, {
                                method: 'POST',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({ reason }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                const firstError = data.errors
                                    ? Object.values(data.errors).flat()[0]
                                    : null;
                                Swal.showValidationMessage(firstError || data.message || 'Request edit gagal dikirim.');
                                return false;
                            }

                            return data;
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    },
                });

                if (result.isConfirmed && result.value?.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Request terkirim',
                        text: result.value.message || 'Request edit sudah masuk ke menu Req Edit pembuat PR.',
                        timer: 1600,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'torpr-delete-popup',
                            title: 'torpr-delete-title',
                            htmlContainer: 'torpr-delete-html',
                        },
                    }).then(() => location.reload());
                }
            }

            function statusBadgeClass(status) {
                if (status === 'approved') return 'is-approved';
                if (status === 'rejected') return 'is-rejected';
                return 'is-pending';
            }

            window.reviewTorprEditRequest = async function (id, decision) {
                const result = await Swal.fire({
                    icon: decision === 'approve' ? 'success' : 'warning',
                    title: decision === 'approve' ? 'Setujui request edit?' : 'Tolak request edit?',
                    input: 'textarea',
                    inputPlaceholder: decision === 'approve'
                        ? 'Catatan opsional untuk requester...'
                        : 'Wajib isi alasan penolakan minimal 10 karakter...',
                    inputLabel: decision === 'approve'
                        ? 'Catatan persetujuan (opsional)'
                        : 'Alasan penolakan (wajib)',
                    inputAttributes: decision === 'reject'
                        ? { minlength: 10, maxlength: 500 }
                        : { maxlength: 500 },
                    showCancelButton: true,
                    confirmButtonText: decision === 'approve' ? 'Setujui 24 Jam' : 'Tolak',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: decision === 'approve' ? '#16a34a' : '#dc2626',
                    cancelButtonColor: '#64748b',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    preConfirm: async (review_note) => {
                        const cleanNote = (review_note || '').trim();
                        if (decision === 'reject' && cleanNote.length < 10) {
                            Swal.showValidationMessage('Alasan penolakan wajib diisi minimal 10 karakter.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr-edit-requests/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({ decision, review_note: cleanNote }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                const firstError = data.errors
                                    ? Object.values(data.errors).flat()[0]
                                    : null;
                                Swal.showValidationMessage(firstError || data.message || 'Gagal memproses request.');
                                return false;
                            }

                            return data;
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    },
                });

                if (result.isConfirmed && result.value?.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: result.value.message,
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(() => location.reload());
                }
            }

            window.openTorprEditRequestCenter = function () {
                const incomingHtml = torprIncomingEditRequests.length
                    ? torprIncomingEditRequests.map(req => `
                        <div class="torpr-request-center-row">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div class="torpr-request-center-pr">${escapeHtml(req.nomor_pr)}</div>
                                    <div class="torpr-request-center-sub">${escapeHtml(req.tujuan)}</div>
                                    <div class="torpr-request-center-meta">
                                        Requester: <strong>${escapeHtml(req.requester)}</strong> (${escapeHtml(req.email)})<br>
                                        Masuk: ${escapeHtml(req.created_at)}
                                    </div>
                                    <div class="torpr-request-center-reason">
                                        ${escapeHtml(req.reason)}
                                    </div>
                                </div>
                                <div class="torpr-request-center-actions">
                                    <button type="button" onclick="reviewTorprEditRequest(${req.id}, 'approve')" class="torpr-request-center-approve">Setujui</button>
                                    <button type="button" onclick="reviewTorprEditRequest(${req.id}, 'reject')" class="torpr-request-center-reject">Tolak</button>
                                </div>
                            </div>
                        </div>
                    `).join('')
                    : '<div class="torpr-request-center-empty">Belum ada request edit masuk.</div>';

                const outgoingHtml = torprOutgoingEditRequests.length
                    ? torprOutgoingEditRequests.map(req => `
                        <div class="torpr-request-center-row">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div class="torpr-request-center-pr">${escapeHtml(req.nomor_pr)}</div>
                                    <div class="torpr-request-center-sub">${escapeHtml(req.tujuan)}</div>
                                    <div class="torpr-request-center-meta">
                                        Pembuat: <strong>${escapeHtml(req.owner)}</strong><br>
                                        Request: ${escapeHtml(req.created_at)}
                                        ${req.reviewed_at ? `<br>Diproses: ${escapeHtml(req.reviewed_at)}` : ''}
                                        ${req.expires_at ? `<br>Izin aktif sampai: ${escapeHtml(req.expires_at)}` : ''}
                                    </div>
                                    <div class="torpr-request-center-reason">Alasan: ${escapeHtml(req.reason)}</div>
                                    ${req.review_note && req.review_note !== '-' ? `<div class="torpr-request-center-meta">Catatan: ${escapeHtml(req.review_note)}</div>` : ''}
                                </div>
                                <span class="torpr-request-status ${statusBadgeClass(req.status)}">${escapeHtml(req.status)}</span>
                            </div>
                        </div>
                    `).join('')
                    : '<div class="torpr-request-center-empty">Belum ada riwayat request edit keluar.</div>';

                Swal.fire({
                    title: '🔐 Pusat Req Edit TORPR',
                    html: `
                        <div class="space-y-5 text-left">
                            <div class="torpr-request-center-note">
                                Izin edit bersifat spesifik per PR dan aktif 24 jam setelah disetujui. Untuk PR lain, user harus request lagi.
                            </div>
                            <div>
                                <div class="torpr-request-center-title">Request Masuk untuk Data Saya</div>
                                <div class="space-y-3">${incomingHtml}</div>
                            </div>
                            <div>
                                <div class="torpr-request-center-title">Riwayat Request Saya</div>
                                <div class="space-y-3">${outgoingHtml}</div>
                            </div>
                        </div>
                    `,
                    width: 900,
                    confirmButtonText: 'Tutup',
                    confirmButtonColor: '#2563eb',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                });
            }

            function showTorprDeleteLockCountdown(message, retryAfter, lockedUntil = null) {
                let remainingSeconds = Math.max(1, Math.ceil(Number(retryAfter) || (15 * 60)));
                let timer = null;
                const canRetryAt = lockedUntil ? new Date(lockedUntil) : new Date(Date.now() + (remainingSeconds * 1000));

                Swal.fire({
                    icon: 'error',
                    title: 'Aksi dikunci sementara',
                    html: `
                        <div class="torpr-lock-caption">
                            ${escapeHtml(message || 'Password salah 3 kali. Silakan coba lagi setelah waktu tunggu selesai.')}
                        </div>
                        <div id="torprLockCountdown" class="torpr-lock-countdown">${formatTorprLockTime(remainingSeconds)}</div>
                        <div class="torpr-lock-caption">
                            Waktu tersisa sebelum tombol hapus bisa dicoba lagi.
                        </div>
                        <div class="torpr-time-pill">
                            Bisa dicoba lagi: ${escapeHtml(formatTorprFullDateTime(canRetryAt))} WIB
                        </div>
                    `,
                    confirmButtonText: 'Saya mengerti',
                    confirmButtonColor: '#dc2626',
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    didOpen: () => {
                        const countdownEl = document.getElementById('torprLockCountdown');
                        timer = setInterval(() => {
                            remainingSeconds = Math.max(0, remainingSeconds - 1);
                            if (countdownEl) {
                                countdownEl.textContent = formatTorprLockTime(remainingSeconds);
                            }

                            if (remainingSeconds <= 0) {
                                clearInterval(timer);
                                timer = null;
                                if (countdownEl) {
                                    countdownEl.textContent = '00:00';
                                }
                            }
                        }, 1000);
                    },
                    willClose: () => {
                        if (timer) {
                            clearInterval(timer);
                        }
                    }
                });
            }

            window.deleteTorprDraft = async function (id, nomorPr) {
                const result = await Swal.fire({
                    icon: 'warning',
                    title: 'Hapus draft PR?',
                    html: `
                        <div class="text-left space-y-3">
                            <div class="torpr-delete-danger">
                                <div class="torpr-delete-danger-title">Data: ${escapeHtml(nomorPr || 'Nomor PR belum diisi')}</div>
                                <div>
                                    Hapus hanya bisa untuk PR yang belum pernah diajukan ke Umum.
                                    Jika sudah pernah request, sistem akan menolak agar riwayat audit tetap aman.
                                </div>
                            </div>
                            <div class="torpr-delete-warning">
                                Masukkan <strong>password user pembuat PR</strong>. Jika user lain ingin menghapus,
                                user tersebut tetap harus mengetahui password pembuat PR.
                            </div>
                            <div class="torpr-lock-preview">
                                <div class="torpr-lock-preview-row">
                                    <span>⏱️</span>
                                    <span>Jika password salah 3 kali, tombol hapus dikunci selama <strong>${formatTorprLockTime(15 * 60)}</strong>.</span>
                                </div>
                                <div class="torpr-lock-preview-row">
                                    <span>🔓</span>
                                    <span>Jam akses ulang yang pasti akan muncul setelah tombol hapus benar-benar terkunci.</span>
                                </div>
                            </div>
                            <div class="torpr-password-wrap">
                                <label for="torprCreatorPassword" class="torpr-password-label">Password pembuat PR</label>
                                <div class="torpr-password-field">
                                    <input
                                        id="torprCreatorPassword"
                                        type="password"
                                        placeholder="Masukkan password pembuat PR"
                                        autocomplete="current-password"
                                        autocapitalize="off"
                                    >
                                    <button type="button" id="toggleTorprPassword" class="torpr-password-toggle">Lihat</button>
                                </div>
                                <div class="torpr-password-help">
                                    Jika salah 3 kali, aksi hapus akan dikunci 15 menit demi keamanan data.
                                </div>
                            </div>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Hapus Draft',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#dc2626',
                    cancelButtonColor: '#64748b',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading(),
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                    didOpen: () => {
                        const input = document.getElementById('torprCreatorPassword');
                        const toggle = document.getElementById('toggleTorprPassword');

                        input?.focus();
                        toggle?.addEventListener('click', () => {
                            const isPassword = input.type === 'password';
                            input.type = isPassword ? 'text' : 'password';
                            toggle.textContent = isPassword ? 'Sembunyi' : 'Lihat';
                        });
                    },
                    preConfirm: async () => {
                        const password = document.getElementById('torprCreatorPassword')?.value || '';

                        if (!password || !password.trim()) {
                            Swal.showValidationMessage('Password pembuat PR wajib diisi.');
                            return false;
                        }

                        try {
                            const response = await fetch(`/torpr/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                                body: JSON.stringify({
                                    creator_password: password,
                                }),
                            });

                            const data = await response.json().catch(() => ({}));

                            if (response.status === 429 || data.locked) {
                                return {
                                    locked: true,
                                    message: data.message || 'Aksi hapus dikunci sementara karena terlalu banyak percobaan.',
                                    retry_after: data.retry_after || (15 * 60),
                                    locked_until: data.locked_until || null,
                                };
                            }

                            if (!response.ok) {
                                Swal.showValidationMessage(data.message || 'Gagal menghapus draft PR.');
                                return false;
                            }

                            return {
                                ok: true,
                                message: data.message || 'Draft PR berhasil dihapus.',
                            };
                        } catch (error) {
                            Swal.showValidationMessage(error.message || 'Koneksi gagal. Coba lagi.');
                            return false;
                        }
                    }
                });

                if (result.dismiss) return;

                if (result.value?.locked) {
                    showTorprDeleteLockCountdown(result.value.message, result.value.retry_after, result.value.locked_until);
                    return;
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Draft terhapus',
                    text: result.value?.message || 'Draft PR berhasil dihapus.',
                    timer: 1400,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'torpr-delete-popup',
                        title: 'torpr-delete-title',
                        htmlContainer: 'torpr-delete-html',
                    },
                }).then(() => location.reload());
            }

            window.requestReceipt = async function (id) {

                const res = await Swal.fire({
                    title: '📨 Request penerimaan Umum?',
                    text: 'Operasional hanya mengajukan. Umum yang akan approve.',
                    icon: 'info',
                    input: 'text',
                    inputLabel: 'Nama pengaju (Operasional)',
                    inputPlaceholder: 'Contoh: Andi',
                    showCancelButton: true,
                    confirmButtonText: '📤 Kirim Request',
                    cancelButtonText: '✖ Batal',
                    confirmButtonColor: '#3B82F6',
                    cancelButtonColor: '#6B7280',
                    showCloseButton: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    preConfirm: (v) => {
                        const x = (v || '').trim();
                        if (!x) {
                            Swal.showValidationMessage('Nama wajib diisi');
                            return false;
                        }
                        return x;
                    }
                });

                // ❗ kalau user cancel / close / klik luar / ESC → stop total
                if (res.dismiss) return;

                try {
                    // loading modal
                    Swal.fire({
                        title: 'Mengirim Request...',
                        html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCloseButton: false
                    });

                    const r = await fetch(`/torpr/${id}/request-receipt`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ requested_name: res.value })
                    });

                    const isJson = (r.headers.get('content-type') || '').includes('application/json');
                    const j = isJson ? await r.json().catch(() => ({})) : {};

                    if (!r.ok) {
                        throw new Error(j?.message || 'Request gagal');
                    }

                    await Swal.fire({
                        icon: 'success',
                        title: 'Terkirim!',
                        text: 'Menunggu persetujuan Umum.',
                        confirmButtonColor: '#10B981'
                    });

                    location.reload();

                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: err.message || 'Request gagal',
                        confirmButtonColor: '#EF4444'
                    });
                }
            };


            // Tambahkan ini di bagian bawah script
            document.getElementById('importModal').addEventListener('click', function (e) {
                // Hanya tutup jika klik di background (bukan di konten modal)
                if (e.target === this) {
                    closeImportModal();
                }
            });

            // ==========================================
            // AUTO REFRESH RECEIPT STATUS
            // ==========================================
            async function refreshReceiptBadges() {
                const rows = document.querySelectorAll('[data-row-id]');
                if (!rows.length) return;

                const ids = [...rows].map(r => r.dataset.rowId);

                try {
                    const r = await fetch(`/torpr/receipt-status-bulk?ids=${ids.join(',')}`);
                    if (!r.ok) return;
                    const data = await r.json();

                    rows.forEach(tr => {
                        const j = data[tr.dataset.rowId];
                        if (!j) return;

                        const badge = tr.querySelector('[data-receipt-badge]');
                        const sub = tr.querySelector('[data-receipt-sub]');

                        const status = j.status ?? '—';
                        badge.textContent = status;
                        badge.className = "inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white " +
                            (status === "APPROVED" ? "bg-green-600" :
                                status === "REJECTED" ? "bg-red-600" :
                                    status === "PENDING" ? "bg-yellow-500" : "bg-gray-400");

                        if (status === "APPROVED")
                            sub.textContent = "diterima: " + (j.approved_by || "Umum");
                        else if (status === "REJECTED")
                            sub.textContent = "ditolak";
                        else if (status === "PENDING")
                            sub.textContent = "menunggu umum";
                        else
                            sub.textContent = "—";
                    });
                } catch (e) {
                    console.error('Refresh error:', e);
                }
            }

            const isHeavy = {{ isset($isHeavy) && $isHeavy ? 'true' : 'false' }};
            if (!isHeavy) {
                setInterval(refreshReceiptBadges, 60000);
            }
        })();
    </script>

    <style>
        /* Tambahkan di file CSS Anda */
        .swal-export-container {
            z-index: 99999 !important;
        }

        .swal2-container {
            z-index: 99999 !important;
        }

        /* Pastikan backdrop juga bisa diklik */
        .swal2-backdrop-show {
            z-index: 99998 !important;
        }

        .swal2-confirm,
        .swal2-cancel {
            position: relative;
            z-index: 99999 !important;
            pointer-events: auto !important;
        }

        /* Hindari event blocking */
        .swal2-popup {
            pointer-events: auto !important;
        }

        /* ==========================================
                                                                                                                                                                                                                                                                                           ANIMATIONS & TRANSITIONS
                                                                                                                                                                                                                                                                                        ========================================== */

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounceSubtle {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-5px);
            }
        }

        @keyframes pulseSubtle {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.8;
            }
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            10%,
            30%,
            50%,
            70%,
            90% {
                transform: translateX(-5px);
            }

            20%,
            40%,
            60%,
            80% {
                transform: translateX(5px);
            }
        }

        @keyframes pop {
            from {
                transform: translateY(8px) scale(.99);
                opacity: 0;
            }

            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }

        .animate-slide-down {
            animation: slideDown 0.5s ease-out;
        }

        .animate-fade-in {
            animation: fadeIn 0.4s ease-out;
        }

        .animate-scale-in {
            animation: scaleIn 0.3s ease-out;
        }

        .animate-slide-in {
            animation: slideIn 0.4s ease-out;
        }

        .animate-slide-in-left {
            animation: slideInLeft 0.3s ease-out;
        }

        .animate-slide-in-right {
            animation: slideInRight 0.3s ease-out;
        }

        .animate-bounce-subtle {
            animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
            animation: pulseSubtle 2s ease-in-out infinite;
        }

        .animate-shake {
            animation: shake 0.5s ease-in-out;
        }

        .modal-pop {
            animation: pop .16s ease-out;
            will-change: transform, opacity;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-track {
            background: #1f2937;
        }

        .dark ::-webkit-scrollbar-thumb {
            background: #4b5563;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
        }

        /* Backdrop blur enhancement */
        .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }

        /* Gradient text */
        .bg-gradient-to-r {
            background-clip: text;
            -webkit-background-clip: text;
        }

        /* Hover scale effect */
        .hover\:scale-105:hover {
            transform: scale(1.05);
        }

        .hover\:scale-110:hover {
            transform: scale(1.1);
        }

        /* Active scale effect */
        .active\:scale-95:active {
            transform: scale(0.95);
        }

        /* Transition all */
        .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
        }

        /* Custom shadows */
        .shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Focus ring */
        .focus\:ring-2:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }

        /* Loading spinner enhancement */
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .animate-spin {
            animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {

            /* Stack filter inputs vertically on mobile */
            #filterForm .grid {
                grid-template-columns: 1fr !important;
            }

            /* Full width buttons on mobile */
            #filterForm button,
            #filterForm a {
                width: 100%;
            }

            /* Adjust date inputs */
            input[type="date"] {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
        }

        @media (max-width: 640px) {

            /* Smaller text on very small screens */
            #filterForm label {
                font-size: 0.7rem;
            }

            #filterForm input,
            #filterForm select {
                font-size: 0.875rem;
                padding: 0.5rem;
            }
        }



        /* Info PR Modal Animation */
        @keyframes infoBackdropIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes infoModalIn {
            from {
                opacity: 0;
                transform: translateY(18px) scale(.94);
                filter: blur(8px);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        @keyframes infoModalOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            to {
                opacity: 0;
                transform: translateY(12px) scale(.96);
            }
        }

        .info-backdrop {
            animation: infoBackdropIn .18s ease-out;
        }

        .info-modal-pop {
            animation: infoModalIn .28s cubic-bezier(.16, 1, .3, 1);
            will-change: transform, opacity, filter;
        }

        .info-modal-out {
            animation: infoModalOut .14s ease-in forwards;
        }

        .info-card-glow::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 1rem;
            padding: 1px;
            background: linear-gradient(135deg, rgba(59, 130, 246, .55), rgba(16, 185, 129, .35), rgba(99, 102, 241, .55));
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        .info-shine {
            position: relative;
            overflow: hidden;
        }

        .info-shine::after {
            content: '';
            position: absolute;
            top: 0;
            left: -120%;
            height: 100%;
            width: 60%;
            transform: skewX(-20deg);
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .55), transparent);
            animation: infoShine 2.8s ease-in-out infinite;
        }

        @keyframes infoShine {

            0%,
            45% {
                left: -120%;
            }

            100% {
                left: 140%;
            }
        }

        #nomor_pr {
            text-transform: uppercase;
        }
    </style>
@endpush
