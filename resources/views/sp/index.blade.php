@extends('layouts.app')

@section('title', 'Penomoran SP')

@php
    $oracleMode = (bool) ($oracleMode ?? request('mode') === 'oracle');
    $normalSpUrl = route('sp.index', request()->except(['mode', 'oracle', 'oracle_mode', 'page']));
    $oracleSpUrl = route('sp.index', array_merge(request()->except(['page', 'oracle', 'oracle_mode']), ['mode' => 'oracle']));
@endphp

@push('styles')
    <style>
        .secure-delete-popup {
            border: 1px solid rgba(226, 232, 240, .9) !important;
            border-radius: 1rem !important;
            box-shadow: 0 28px 80px rgba(15, 23, 42, .28) !important;
        }

        .dark .secure-delete-popup {
            background: #0f172a !important;
            color: #f8fafc !important;
            border-color: rgba(71, 85, 105, .95) !important;
        }

        .secure-delete-popup .swal2-title,
        .secure-delete-popup .swal2-html-container {
            color: #0f172a !important;
        }

        .dark .secure-delete-popup .swal2-title,
        .dark .secure-delete-popup .swal2-html-container {
            color: #f8fafc !important;
        }

        .secure-delete-danger,
        .secure-delete-warning,
        .secure-delete-lock-preview {
            border-radius: .9rem;
            padding: .8rem .9rem;
            font-size: .78rem;
            font-weight: 800;
            line-height: 1.6;
            text-align: left;
        }

        .secure-delete-danger {
            background: #fff1f2;
            border: 1px solid #fca5a5;
            color: #991b1b;
        }

        .secure-delete-danger-title {
            color: #7f1d1d;
            font-weight: 950;
            margin-bottom: .25rem;
        }

        .secure-delete-warning {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            color: #92400e;
        }

        .secure-delete-lock-preview {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            color: #334155;
        }

        .secure-delete-lock-preview strong {
            color: #0f172a;
            font-weight: 950;
        }

        .secure-delete-password-label {
            display: block;
            margin: .65rem 0 .45rem;
            color: #0f172a;
            font-size: .88rem;
            font-weight: 900;
            text-align: left;
        }

        .secure-delete-password-field {
            display: flex;
            align-items: center;
            gap: .45rem;
            border: 1px solid #cbd5e1;
            border-radius: .85rem;
            background: #fff;
            padding: .2rem .25rem .2rem .75rem;
        }

        .secure-delete-password-field input {
            flex: 1;
            min-width: 0;
            height: 2.35rem;
            border: 0;
            outline: 0;
            background: transparent;
            color: #0f172a;
            font-size: .95rem;
            font-weight: 800;
        }

        .secure-delete-toggle {
            border: 0;
            border-radius: .65rem;
            background: #e0f2fe;
            color: #075985;
            cursor: pointer;
            font-size: .76rem;
            font-weight: 950;
            padding: .55rem .7rem;
        }

        .secure-delete-countdown {
            margin: .85rem auto .25rem;
            width: fit-content;
            min-width: 11.5rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #fee2e2, #ffedd5);
            border: 1px solid #fca5a5;
            color: #7f1d1d;
            font-size: 1.5rem;
            font-weight: 950;
            letter-spacing: .08em;
            padding: .75rem 1.1rem;
            text-align: center;
        }

        .secure-delete-time-pill {
            display: inline-flex;
            margin-top: .35rem;
            border-radius: 999px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            color: #1e3a8a;
            font-size: .74rem;
            font-weight: 950;
            padding: .4rem .75rem;
        }

        .dark .secure-delete-danger {
            background: #7f1d1d !important;
            border-color: #f87171 !important;
            color: #fff !important;
        }

        .dark .secure-delete-danger-title,
        .dark .secure-delete-lock-preview strong {
            color: #fff !important;
        }

        .dark .secure-delete-warning {
            background: #78350f !important;
            border-color: #fbbf24 !important;
            color: #fff7ed !important;
        }

        .dark .secure-delete-lock-preview,
        .dark .secure-delete-password-field {
            background: #1e293b !important;
            border-color: #475569 !important;
            color: #e2e8f0 !important;
        }

        .dark .secure-delete-password-label,
        .dark .secure-delete-password-field input {
            color: #fff !important;
        }

        .dark .secure-delete-toggle {
            background: #2563eb !important;
            color: #fff !important;
        }

        .dark .secure-delete-countdown {
            background: linear-gradient(135deg, #7f1d1d, #9a3412) !important;
            border-color: #fb7185 !important;
            color: #fff !important;
        }

        .dark .secure-delete-time-pill {
            background: #172554 !important;
            border-color: #3b82f6 !important;
            color: #dbeafe !important;
        }

        .secure-delete-popup {
            width: min(92vw, 34rem) !important;
            padding: 1.35rem 1.45rem 1.45rem !important;
        }

        .secure-delete-popup .swal2-icon {
            margin: .75rem auto .5rem !important;
        }

        .secure-delete-popup .swal2-title {
            padding: 0 !important;
            margin: .65rem 0 1.15rem !important;
            font-size: 1.55rem !important;
            font-weight: 950 !important;
            letter-spacing: -.03em !important;
        }

        .secure-delete-popup .swal2-html-container {
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
        }

        .secure-delete-popup .swal2-actions {
            gap: .75rem !important;
            margin-top: 1.3rem !important;
        }

        .secure-delete-popup .swal2-confirm,
        .secure-delete-popup .swal2-cancel {
            border-radius: .85rem !important;
            padding: .78rem 1.2rem !important;
            font-weight: 950 !important;
        }

        .secure-delete-stack {
            display: grid;
            gap: .78rem;
            text-align: left;
        }

        .secure-delete-danger,
        .secure-delete-warning,
        .secure-delete-lock-preview {
            display: block;
            margin: 0;
            padding: .95rem 1rem;
            border-radius: 1rem;
        }

        .secure-delete-danger-title,
        .secure-delete-warning-title {
            display: flex;
            align-items: center;
            gap: .45rem;
            margin-bottom: .35rem;
            font-size: .82rem;
            font-weight: 950;
            line-height: 1.35;
        }

        .secure-delete-danger p,
        .secure-delete-warning p,
        .secure-delete-lock-preview p {
            margin: 0;
            font-size: .78rem;
            font-weight: 750;
            line-height: 1.65;
        }

        .secure-delete-input-wrap {
            display: grid;
            gap: .45rem;
            margin-top: .1rem;
        }

        .secure-delete-password-label {
            margin: 0;
            font-size: .82rem;
            line-height: 1.4;
        }

        .secure-delete-password-field {
            margin: 0;
            min-height: 3.05rem;
            padding: .25rem .35rem .25rem .95rem;
        }

        .secure-delete-password-field input.swal2-input {
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            padding: 0 !important;
        }

        .secure-delete-toggle {
            min-width: 4.25rem;
        }

        .dark .secure-delete-popup {
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%) !important;
        }

        /* ════════════════════════════════════════════════════════════
                                                               ITEMS SECTION (SP) - dengan animasi
                                                               ════════════════════════════════════════════════════════════ */
        .items-section {
            position: relative;
        }

        .sticky-add-wrap {
            position: sticky;
            bottom: 0;
            z-index: 20;
            display: flex;
            justify-content: flex-end;
            padding: 8px 0 2px;
            margin-top: 6px;
            background: linear-gradient(to top, var(--sticky-bg, #fff) 70%, transparent);
            pointer-events: none;
        }

        /* ── FIX BUG 6: btn-add-row — tambahkan color, border, cursor, border-radius, display, gap ── */
        .sticky-add-wrap .btn-add-row {
            pointer-events: auto;
            padding: 8px 14px;
            font-size: .75rem;
            box-shadow: 0 4px 12px rgba(14, 165, 233, .35);
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-weight: 600;
        }

        #addModal .sticky-add-wrap {
            --sticky-bg: #fff;
        }

        .dark #addModal .sticky-add-wrap {
            --sticky-bg: #1f2937;
        }

        #editModal .sticky-add-wrap {
            --sticky-bg: #fff;
        }

        .dark #editModal .sticky-add-wrap {
            --sticky-bg: #1f2937;
        }

        /* ── Item Row dengan Animasi ── */
        .item-row {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px 12px 10px;
            position: relative;
            transition: all .3s cubic-bezier(.4, 0, .2, 1);
            margin-top: 10px;
            animation: itemSlideIn .4s cubic-bezier(.4, 0, .2, 1) forwards;
            opacity: 0;
            transform: translateY(-10px);
        }

        @keyframes itemSlideIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .item-row:hover {
            box-shadow: 0 4px 12px rgba(14, 165, 233, .08);
            border-color: #bae6fd;
        }

        .dark .item-row {
            background: #111827;
            border-color: #374151;
        }

        .dark .item-row:hover {
            border-color: #0369a1;
            box-shadow: 0 4px 12px rgba(14, 165, 233, .12);
        }

        /* Animasi hapus */
        .item-row.removing {
            animation: itemSlideOut .35s cubic-bezier(.4, 0, .2, 1) forwards;
        }

        @keyframes itemSlideOut {
            to {
                opacity: 0;
                transform: translateX(30px) scale(.95);
                max-height: 0;
                padding: 0;
                margin: 0;
                border-width: 0;
                overflow: hidden;
            }
        }

        .row-badge {
            position: absolute;
            top: -9px;
            left: 12px;
            background: linear-gradient(135deg, #0ea5e9, #6366f1);
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 10px;
            border-radius: 99px;
            box-shadow: 0 2px 6px rgba(14, 165, 233, .3);
        }

        .btn-rm {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #fee2e2;
            color: #dc2626;
            font-size: 16px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            transition: all .2s;
            opacity: .6;
        }

        .btn-rm:hover {
            opacity: 1;
            background: #fecaca;
            transform: scale(1.1) rotate(90deg);
        }

        .item-label {
            font-size: .68rem;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 4px;
            display: block;
            letter-spacing: .3px;
            text-transform: uppercase;
        }

        .dark .item-label {
            color: #94a3b8;
        }

        /* ── Grid 4 kolom untuk SP ── */
        .item-grid-sp {
            display: grid;
            grid-template-columns: 120px 80px 1fr 1fr;
            gap: 6px;
        }

        /* ── FIX BUG 7: m-input & m-select — tambahkan border, background, color, width, dark mode ── */
        .item-grid-sp .m-input,
        .item-grid-sp .m-select {
            padding: 5px 7px;
            font-size: .72rem;
            border-radius: 6px;
            width: 100%;
            border: 1px solid #e2e8f0;
            background: white;
            color: #111827;
            outline: none;
            transition: border-color .2s, box-shadow .2s;
        }

        .item-grid-sp .m-input:focus,
        .item-grid-sp .m-select:focus {
            border-color: #0ea5e9;
            box-shadow: 0 0 0 2px rgba(14, 165, 233, .12);
        }

        .dark .item-grid-sp .m-input,
        .dark .item-grid-sp .m-select {
            background: #374151;
            border-color: #4b5563;
            color: #f3f4f6;
        }

        .dark .item-grid-sp .m-input:focus,
        .dark .item-grid-sp .m-select:focus {
            border-color: #0ea5e9;
        }

        /* ── Subtotal dengan animasi ── */
        .subtotal-display {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            border: 1px solid #86efac;
            border-radius: 8px;
            padding: 6px 10px;
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all .3s;
        }

        .dark .subtotal-display {
            background: linear-gradient(135deg, #052e16, #064e3b);
            border-color: #166534;
        }

        .subtotal-display.updated {
            animation: subtotalPulse .5s ease;
        }

        /* ── FIX BUG 8: tambahkan animasi untuk per-row subtotal ── */
        .subtotal-value.updated {
            animation: subtotalPulse .5s ease;
        }

        @keyframes subtotalPulse {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.02);
                box-shadow: 0 0 0 4px rgba(34, 197, 94, .2);
            }

            100% {
                transform: scale(1);
            }
        }

        .subtotal-label {
            font-size: .7rem;
            font-weight: 600;
            color: #166534;
        }

        .dark .subtotal-label {
            color: #86efac;
        }

        .subtotal-value {
            font-family: 'Courier New', monospace;
            font-size: .85rem;
            font-weight: 800;
            color: #059669;
        }

        .dark .subtotal-value {
            color: #34d399;
        }

        /* ── Rich Text Editor (sama seperti SPPH) ── */
        .rt-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 1px;
            padding: 3px 4px;
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-bottom: none;
            border-radius: 7px 7px 0 0;
            align-items: center;
        }

        .dark .rt-toolbar {
            background: #2d3748;
            border-color: #4b5563;
        }

        .rt-group {
            display: flex;
            align-items: center;
            gap: 1px;
        }

        .rt-sep {
            width: 1px;
            height: 18px;
            background: #d1d5db;
            margin: 0 2px;
            flex-shrink: 0;
        }

        .dark .rt-sep {
            background: #4b5563;
        }

        .rt-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 2px 5px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            border: 1px solid transparent;
            color: #374151;
            background: transparent;
            line-height: 1.3;
            transition: all .12s;
            min-width: 22px;
            height: 22px;
            white-space: nowrap;
            user-select: none;
        }

        .dark .rt-btn {
            color: #d1d5db;
        }

        .rt-btn:hover {
            background: #e5e7eb;
            border-color: #d1d5db;
        }

        .dark .rt-btn:hover {
            background: #4b5563;
        }

        .rt-btn.rt-active {
            background: #dbeafe;
            border-color: #93c5fd;
            color: #1d4ed8;
        }

        .dark .rt-btn.rt-active {
            background: #1e3a8a;
            border-color: #3b82f6;
            color: #93c5fd;
        }

        .rt-editor {
            min-height: 60px !important;
            max-height: 150px !important;
            overflow-y: auto;
            padding: 5px 8px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 7px 7px;
            font-size: .75rem;
            line-height: 1.45;
            outline: none;
            background: white;
            color: #111827;
            word-break: break-word;
        }

        .dark .rt-editor {
            background: #374151;
            border-color: #4b5533;
            color: #f3f4f6;
        }

        .rt-editor:focus {
            border-color: #0ea5e9;
            box-shadow: 0 0 0 2px rgba(14, 165, 233, .12);
        }

        .rt-editor b,
        .rt-editor strong {
            font-weight: 700;
        }

        .rt-editor i,
        .rt-editor em {
            font-style: italic;
        }

        .rt-editor u {
            text-decoration: underline;
        }

        .rt-editor:empty:before {
            content: attr(data-ph);
            color: #9ca3af;
            pointer-events: none;
        }

        .rt-editor ol,
        .rt-editor ul {
            margin: 2px 0;
            padding-left: 22px;
        }

        .rt-editor ol {
            list-style-type: decimal;
        }

        .rt-editor ul {
            list-style-type: disc;
        }

        .rt-editor li {
            margin: 1px 0;
            line-height: 1.45;
        }

        .rt-editor li::marker {
            font-size: .75rem;
        }

        /* ── Harga input special styling ── */
        .harga-input {
            font-family: 'Courier New', monospace;
            font-weight: 600;
            text-align: right;
            letter-spacing: .3px;
        }

        .harga-input::placeholder {
            font-weight: 400;
            letter-spacing: 0;
            font-family: inherit;
        }

        .sp-header-gradient {
            background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%);
        }

        .badge-sp {
            font-family: 'Courier New', monospace;
            font-size: .78rem;
            font-weight: 700;
            cursor: pointer;
            transition: opacity .15s;
        }

        .badge-sp:hover {
            opacity: .7;
        }

        .tbl-row-hover:hover {
            background: rgba(14, 165, 233, .04);
            transition: background .15s;
        }

        .new-row-flash {
            animation: rowFlashSp 1.5s ease-out;
        }

        @keyframes rowFlashSp {
            0% {
                background: rgba(14, 165, 233, .25);
            }

            100% {
                background: transparent;
            }
        }

        .modal-overlay {
            backdrop-filter: blur(6px);
            background: rgba(0, 0, 0, .5);
        }

        .live-dot {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            animation: livePulse 1.5s infinite;
            display: inline-block;
            margin-right: 5px;
            flex-shrink: 0;
        }

        @keyframes livePulse {

            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }

            50% {
                opacity: .4;
                transform: scale(1.4);
            }
        }

        .nomor-input-ok {
            border-color: #22c55e !important;
        }

        .nomor-input-error {
            border-color: #ef4444 !important;
        }

        .nomor-input-warn {
            border-color: #f59e0b !important;
        }

        .nomor-status-ok {
            color: #16a34a;
        }

        .nomor-status-error {
            color: #dc2626;
        }

        .nomor-status-warn {
            color: #d97706;
        }

        .suggest-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 3px 10px;
            border-radius: 99px;
            font-size: .72rem;
            font-family: 'Courier New', monospace;
            font-weight: 700;
            cursor: pointer;
            border: 1.5px dashed #0ea5e9;
            color: #0369a1;
            background: #f0f9ff;
            transition: all .2s;
        }

        .dark .suggest-pill {
            color: #7dd3fc;
            background: #0c1a2e;
            border-color: #0ea5e9;
        }

        .suggest-pill:hover {
            background: #e0f2fe;
            transform: translateY(-1px);
        }

        .dark .suggest-pill:hover {
            background: #0f2744;
        }

        .nilai-badge {
            font-family: 'Courier New', monospace;
            font-size: .75rem;
        }

        .rupiah-input {
            font-family: 'Courier New', monospace;
            font-weight: 600;
            letter-spacing: .3px;
        }

        .quick-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: .7rem;
            font-weight: 600;
            border: 1px solid #e5e7eb;
            color: #6b7280;
            background: #fff;
            transition: all .15s;
            cursor: pointer;
            white-space: nowrap;
        }

        .dark .quick-pill {
            border-color: #4b5563;
            color: #9ca3af;
            background: #374151;
        }

        .quick-pill:hover {
            background: #f3f4f6;
            color: #374151;
            border-color: #d1d5db;
        }

        .dark .quick-pill:hover {
            background: #4b5563;
            color: #f3f4f6;
            border-color: #6b7280;
        }

        /* ── PPBJ Mode Toggle ── */
        .sp-pr-mode-btn {
            background: #f9fafb;
            border-color: #e5e7eb;
            color: #6b7280;
        }

        .dark .sp-pr-mode-btn {
            background: #374151;
            border-color: #4b5563;
            color: #9ca3af;
        }

        .sp-pr-mode-btn:hover {
            background: #f3f4f6;
            color: #374151;
        }

        .dark .sp-pr-mode-btn:hover {
            background: #4b5563;
            color: #f3f4f6;
        }

        .sp-pr-mode-btn.active-mode {
            background: #0ea5e9 !important;
            border-color: #0ea5e9 !important;
            color: white !important;
            box-shadow: 0 2px 6px rgba(14, 165, 233, 0.3);
        }

        /* ── PPBJ Select2 ── */
        .sp-ppbj-select+.select2-container--default .select2-selection--single {
            border-color: #e5e7eb !important;
            background-color: #fff !important;
        }

        .dark .sp-ppbj-select+.select2-container--default .select2-selection--single {
            background-color: #111827 !important;
            border-color: #374151 !important;
        }

        .sp-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #111827 !important;
            font-family: 'Courier New', monospace;
            font-weight: 600;
        }

        .dark .sp-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important;
        }

        /* ── Edit PPBJ Select2 ── */
        .edit-sp-ppbj-select+.select2-container--default .select2-selection--single {
            border-color: #f59e0b !important;
            background-color: #fffbeb !important;
        }

        .dark .edit-sp-ppbj-select+.select2-container--default .select2-selection--single {
            background-color: #451a03 !important;
            border-color: #b45309 !important;
        }

        .edit-sp-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #b45309 !important;
            font-family: 'Courier New', monospace;
            font-weight: 600;
        }

        .dark .edit-sp-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #fcd34d !important;
        }

        /* ── Select2 Dropdown ── */
        .select2-results__option strong {
            font-family: 'Courier New', monospace;
            color: #0369a1;
        }

        .dark .select2-results__option strong {
            color: #f3f4f6 !important;
        }

        .select2-results__option--highlighted[aria-selected] {
            background-color: #0ea5e9 !important;
        }

        .select2-results__option--highlighted[aria-selected] strong {
            color: #ffffff !important;
        }

        .dark .select2-results__option--highlighted[aria-selected] {
            background-color: #0369a1 !important;
        }

        .dark .select2-results__option--highlighted[aria-selected] strong {
            color: #ffffff !important;
        }

        .dark .select2-container--default .select2-selection--single {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important;
        }

        .dark .select2-dropdown {
            background-color: #1f2937 !important;
            border-color: #374151 !important;
        }

        .dark .select2-results__option {
            color: #f3f4f6 !important;
            background-color: #1f2937 !important;
        }

        .dark .select2-search--dropdown .select2-search__field {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        /* ── Auto-fill Badge ── */
        .deskripsi-autofill-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 3px 10px;
            border-radius: 6px;
            font-size: .68rem;
            font-weight: 600;
            background: #eef2ff;
            color: #4338ca;
            border: 1px solid #c7d2fe;
            animation: fadeSlideIn .3s ease-out;
        }

        .dark .deskripsi-autofill-badge {
            background: #312e81;
            color: #a5b4fc;
            border-color: #4338ca;
        }

        .deskripsi-autofill-badge button {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 0;
            margin-left: 2px;
            opacity: .6;
            transition: opacity .15s;
        }

        .deskripsi-autofill-badge button:hover {
            opacity: 1;
        }

        @keyframes fadeSlideIn {
            from {
                opacity: 0;
                transform: translateY(-4px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ── Dark mode select2 ── */
        .dark .select2-container--default .select2-selection--single .select2-selection__placeholder {
            color: #9ca3af !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__arrow b {
            border-color: #9ca3af transparent transparent transparent !important;
        }

        .dark .select2-results__option[aria-selected=true] {
            background-color: #374151 !important;
            color: #e5e7eb !important;
        }

        /* ════════════════════════════════════════════════════════════
                                                                                                                                                                       ONBOARDING TUTORIAL (SP)
                                                                                                                                                                       ════════════════════════════════════════════════════════════ */
        .onboarding-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(0, 0, 0, .7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            animation: obFadeIn .5s ease forwards;
        }

        @keyframes obFadeIn {
            to {
                opacity: 1;
            }
        }

        @keyframes obFadeOut {
            to {
                opacity: 0;
                transform: scale(.95);
            }
        }

        .onboarding-overlay.closing {
            animation: obFadeOut .4s ease forwards;
        }

        .onboarding-card {
            background: white;
            border-radius: 24px;
            width: 100%;
            max-width: 580px;
            overflow: hidden;
            box-shadow: 0 40px 100px -20px rgba(0, 0, 0, .5);
            transform: scale(.9);
            animation: obSlideUp .5s ease .1s forwards;
            position: relative;
        }

        .dark .onboarding-card {
            background: #1f2937;
        }

        @keyframes obSlideUp {
            to {
                transform: scale(1);
            }
        }

        .ob-header {
            position: relative;
            padding: 36px 28px 22px;
            text-align: center;
            overflow: hidden;
        }

        .ob-header::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 0;
        }

        .ob-header::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -30%;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, .1);
            border-radius: 50%;
            z-index: 1;
        }

        .ob-header * {
            position: relative;
            z-index: 2;
        }

        .ob-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, .2);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, .3);
            color: white;
            font-size: 10px;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 99px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 14px;
        }

        .ob-icon-wrap {
            width: 76px;
            height: 76px;
            margin: 0 auto 14px;
            background: rgba(255, 255, 255, .2);
            backdrop-filter: blur(4px);
            border: 2px solid rgba(255, 255, 255, .3);
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            animation: obFloat 3s ease-in-out infinite;
        }

        @keyframes obFloat {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-8px);
            }
        }

        .ob-title {
            font-size: 20px;
            font-weight: 800;
            color: white;
            margin-bottom: 5px;
            line-height: 1.3;
        }

        .ob-subtitle {
            font-size: 12px;
            color: rgba(255, 255, 255, .85);
            font-weight: 400;
        }

        .ob-progress {
            display: flex;
            gap: 6px;
            padding: 14px 28px 0;
        }

        .ob-progress-dot {
            flex: 1;
            height: 4px;
            border-radius: 99px;
            background: #e5e7eb;
            transition: all .4s ease;
        }

        .dark .ob-progress-dot {
            background: #374151;
        }

        .ob-progress-dot.active {
            background: linear-gradient(90deg, #0ea5e9, #6366f1);
        }

        .ob-progress-dot.done {
            background: #22c55e;
        }

        .ob-body {
            padding: 24px 28px 20px;
        }

        .ob-step-label {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 700;
            color: #0ea5e9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .dark .ob-step-label {
            color: #7dd3fc;
        }

        .ob-step-label .ob-step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background: #0ea5e9;
            color: white;
            border-radius: 6px;
            font-size: 10px;
        }

        .dark .ob-step-label .ob-step-num {
            background: #0369a1;
        }

        .ob-desc {
            font-size: 13px;
            color: #374151;
            line-height: 1.7;
            margin-bottom: 16px;
        }

        .dark .ob-desc {
            color: #d1d5db;
        }

        .ob-desc strong {
            color: #0369a1;
            font-weight: 700;
        }

        .dark .ob-desc strong {
            color: #7dd3fc;
        }

        .ob-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 14px;
        }

        .ob-feature {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 10px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }

        .dark .ob-feature {
            background: #082f49;
            border-color: #0c4a6e;
        }

        .ob-feature-icon {
            font-size: 16px;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .ob-feature-text {
            font-size: 10.5px;
            color: #075985;
            font-weight: 600;
            line-height: 1.4;
        }

        .dark .ob-feature-text {
            color: #7dd3fc;
        }

        .ob-demo {
            background: #f8fafc;
            border: 1.5px solid #e2e8f0;
            border-radius: 14px;
            overflow: hidden;
            margin-bottom: 16px;
        }

        .dark .ob-demo {
            background: #111827;
            border-color: #1f2937;
        }

        .ob-demo-title {
            font-size: 9px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 8px 14px 0;
        }

        .ob-demo-content {
            padding: 10px 14px 14px;
        }

        .ob-demo-select {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 6px;
            transition: all .3s ease;
        }

        .dark .ob-demo-select {
            background: #1f2937;
            border-color: #374151;
        }

        .ob-demo-select.highlight {
            border-color: #0ea5e9;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, .15);
        }

        .ob-demo-select .ob-mono {
            font-family: 'Courier New', monospace;
            font-weight: 700;
            font-size: 12px;
            color: #111827;
        }

        .dark .ob-demo-select .ob-mono {
            color: #f3f4f6;
        }

        .ob-demo-select .ob-sub {
            font-size: 10px;
            color: #94a3b8;
        }

        .ob-demo-arrow {
            text-align: center;
            color: #22c55e;
            font-size: 16px;
            padding: 1px 0;
            animation: obBounce 1.5s ease infinite;
        }

        @keyframes obBounce {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(3px);
            }
        }

        .ob-demo-textarea {
            background: white;
            border: 2px dashed #22c55e;
            border-radius: 10px;
            padding: 8px 12px;
            font-size: 11px;
            color: #374151;
            line-height: 1.5;
            position: relative;
        }

        .dark .ob-demo-textarea {
            background: #1f2937;
            border-color: #22c55e;
            color: #d1d5db;
        }

        .ob-auto-badge {
            position: absolute;
            top: -9px;
            right: 8px;
            background: #22c55e;
            color: white;
            font-size: 8px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 99px;
            animation: obPulse 2s ease infinite;
        }

        @keyframes obPulse {

            0%,
            100% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, .4);
            }

            50% {
                box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
            }
        }

        .ob-demo-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 8px;
            align-items: center;
        }

        .ob-demo-field {
            background: white;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            padding: 8px 10px;
        }

        .dark .ob-demo-field {
            background: #1f2937;
            border-color: #374151;
        }

        .ob-demo-field-label {
            font-size: 8px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: .5px;
            margin-bottom: 3px;
        }

        .ob-demo-field-value {
            font-family: 'Courier New', monospace;
            font-size: 11px;
            font-weight: 700;
            color: #22c55e;
        }

        .ob-demo-link-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0ea5e9;
            font-size: 18px;
        }

        .ob-footer {
            padding: 0 28px 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
        }

        .ob-btn-skip {
            padding: 9px 14px;
            border-radius: 12px;
            border: 1.5px solid #e5e7eb;
            background: white;
            color: #6b7280;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all .2s;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }

        .dark .ob-btn-skip {
            background: #374151;
            border-color: #4b5563;
            color: #9ca3af;
        }

        .ob-btn-skip:hover {
            background: #f3f4f6;
        }

        .dark .ob-btn-skip:hover {
            background: #4b5563;
        }

        .ob-btn-next {
            padding: 9px 18px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #0ea5e9, #6366f1);
            color: white;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all .2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            box-shadow: 0 4px 14px rgba(14, 165, 233, .4);
        }

        .ob-btn-next:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(14, 165, 233, .5);
        }

        .ob-btn-next:active {
            transform: translateY(0);
        }

        .ob-btn-next svg {
            width: 14px;
            height: 14px;
        }

        .ob-float-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9998;
            width: 50px;
            height: 50px;
            border-radius: 16px;
            background: linear-gradient(135deg, #0ea5e9, #6366f1);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(14, 165, 233, .4);
            transition: all .3s ease;
            animation: obFloatBtn 3s ease-in-out infinite;
        }

        @keyframes obFloatBtn {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-4px);
            }
        }

        .ob-float-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 30px rgba(14, 165, 233, .5);
        }

        .ob-float-btn svg {
            width: 22px;
            height: 22px;
        }

        .ob-float-tooltip {
            position: absolute;
            right: 58px;
            top: 50%;
            transform: translateY(-50%);
            background: #1f2937;
            color: white;
            font-size: 11px;
            font-weight: 600;
            padding: 7px 12px;
            border-radius: 10px;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0, 0, 0, .2);
            opacity: 0;
            pointer-events: none;
            transition: all .2s;
        }

        .ob-float-btn:hover .ob-float-tooltip {
            opacity: 1;
        }

        .ob-float-tooltip::after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-left-color: #1f2937;
            border-right: none;
        }

        .ob-step {
            display: none;
        }

        .ob-step.active {
            display: block;
            animation: obStepIn .4s ease;
        }

        @keyframes obStepIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .ob-confetti {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 10;
        }

        .ob-confetti-piece {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            top: -10px;
            animation: obConfettiFall 3s ease-in forwards;
        }

        @keyframes obConfettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }

            100% {
                transform: translateY(400px) rotate(720deg);
                opacity: 0;
            }
        }

        /* ── SP Onboarding: Progress Bar Demo ── */
        .ob-progress-demo {
            background: white;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 12px;
        }

        .dark .ob-progress-demo {
            background: #1f2937;
            border-color: #374151;
        }

        .ob-progress-demo-label {
            font-size: 8px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: .5px;
            margin-bottom: 6px;
        }

        .ob-progress-bar-track {
            height: 10px;
            background: #e5e7eb;
            border-radius: 99px;
            overflow: hidden;
            position: relative;
        }

        .dark .ob-progress-bar-track {
            background: #374151;
        }

        .ob-progress-bar-fill {
            height: 100%;
            border-radius: 99px;
            transition: width 1s ease;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        .ob-progress-bar-fill .bar-label {
            font-size: 7px;
            font-weight: 800;
            color: white;
            padding-right: 4px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, .3);
        }

        .ob-progress-jump {
            animation: obJumpBar 1.5s ease infinite;
        }

        @keyframes obJumpBar {

            0%,
            100% {
                transform: scaleY(1);
            }

            50% {
                transform: scaleY(1.3);
            }
        }

        .ob-progress-steps {
            display: flex;
            justify-content: space-between;
            margin-top: 4px;
            font-size: 7px;
            font-weight: 600;
            color: #94a3b8;
        }

        .ob-progress-steps .ps-done {
            color: #22c55e;
        }

        .ob-progress-steps .ps-active {
            color: #0ea5e9;
            font-weight: 800;
        }

        /* ── SP Onboarding: DOCX Preview ── */
        .ob-docx-preview {
            background: white;
            border: 1.5px solid #d1d5db;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .06);
        }

        .dark .ob-docx-preview {
            background: #111827;
            border-color: #374151;
        }

        .ob-docx-kop {
            height: 28px;
            background: linear-gradient(90deg, #1e40af, #1e3a8a);
            position: relative;
        }

        .ob-docx-kop::after {
            content: 'KOP SURAT PT. SUCOFINDO';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 7px;
            color: rgba(255, 255, 255, .6);
            font-weight: 700;
            letter-spacing: 1px;
        }

        .ob-docx-body {
            padding: 8px 10px;
        }

        .ob-docx-line {
            height: 2px;
            background: #e5e7eb;
            margin: 4px 0;
            border-radius: 1px;
        }

        .dark .ob-docx-line {
            background: #374151;
        }

        .ob-docx-line.short {
            width: 60%;
        }

        .ob-docx-line.medium {
            width: 80%;
        }

        .ob-docx-line.bold {
            height: 3px;
            background: #111827;
        }

        .dark .ob-docx-line.bold {
            background: #f3f4f6;
        }

        .ob-docx-table {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            overflow: hidden;
            margin: 6px 0;
        }

        .dark .ob-docx-table {
            border-color: #4b5563;
        }

        .ob-docx-table-row {
            display: flex;
            border-bottom: 1px solid #e5e7eb;
        }

        .dark .ob-docx-table-row {
            border-color: #374151;
        }

        .ob-docx-table-row:last-child {
            border-bottom: none;
        }

        .ob-docx-table-cell {
            padding: 3px 6px;
            font-size: 7px;
        }

        .ob-docx-table-cell.header {
            background: #f3f4f6;
            font-weight: 700;
        }

        .dark .ob-docx-table-cell.header {
            background: #1f2937;
        }

        .ob-docx-table-cell.num {
            width: 20px;
            text-align: center;
        }

        .ob-docx-table-cell.name {
            flex: 1;
        }

        .ob-docx-table-cell.price {
            width: 70px;
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 700;
            color: #059669;
        }

        .ob-docx-highlight {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            background: #fef3c7;
            border: 1px solid #fde68a;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 7px;
            color: #92400e;
            font-weight: 600;
            margin-top: 4px;
        }

        /* ── SP Onboarding: Field Update Demo ── */
        .ob-field-update {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 3px 0;
        }

        .ob-field-arrow {
            color: #22c55e;
            font-size: 10px;
        }

        .ob-field-old {
            font-size: 9px;
            color: #dc2626;
            text-decoration: line-through;
            font-family: 'Courier New', monospace;
            background: #fef2f2;
            padding: 1px 5px;
            border-radius: 4px;
            border: 1px solid #fecaca;
        }

        .ob-field-new {
            font-size: 9px;
            color: #16a34a;
            font-weight: 700;
            font-family: 'Courier New', monospace;
            background: #f0fdf4;
            padding: 1px 5px;
            border-radius: 4px;
            border: 1px solid #bbf7d0;
            animation: obFieldGlow 2s ease infinite;
        }

        @keyframes obFieldGlow {

            0%,
            100% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }

            50% {
                box-shadow: 0 0 0 4px rgba(34, 197, 94, .2);
            }
        }
    </style>
@endpush

@section('content')
    <div class="space-y-6">

        {{-- HEADER --}}
        <div class="sp-header-gradient rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div class="relative">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <span class="text-3xl">📝</span>
                            <h1 class="text-2xl font-bold tracking-tight">{{ $oracleMode ? 'Penomoran SP Oracle' : 'Penomoran SP' }}</h1>
                        </div>
                        <p class="text-blue-100 text-sm">
                            {{ $oracleMode ? 'Surat Pesanan nilai di atas Rp50 juta — nomor dari ERP Oracle' : 'Surat Pesanan' }}
                        </p>
                        <div class="flex items-center gap-2 mt-3 flex-wrap">
                            <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">Total: <span
                                    id="totalCount">{{ $sps->total() }}</span> Data</span>
                            @if($lastNomor)
                                <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium font-mono">Terakhir:
                                    {{ $lastNomor }}</span>
                            @endif
                            <span class="flex items-center text-xs bg-green-400/20 rounded-full px-3 py-1"><span
                                    class="live-dot"></span> Live</span>
                            @if($oracleMode)
                                <span class="text-xs bg-gray-950/50 rounded-full px-3 py-1 font-semibold border border-white/20">Oracle manual</span>
                            @endif
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 shrink-0">
                        @if($oracleMode)
                            <a href="{{ $normalSpUrl }}"
                                class="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap"
                                title="Kembali ke penomoran SP otomatis">
                                <span>↩</span>
                                <span class="text-sm">SP Otomatis</span>
                            </a>
                        @else
                            <a href="{{ $oracleSpUrl }}"
                                class="flex items-center gap-2 bg-gray-950/70 hover:bg-gray-950 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/20 whitespace-nowrap shadow-lg shadow-black/20"
                                title="Masuk mode SP Oracle untuk pengadaan di atas Rp50 juta">
                                <span>🕶️</span>
                                <span class="text-sm">Oracle &gt;50 Juta</span>
                            </a>
                        @endif
                        <a href="{{ route('satuan.index') }}"
                            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap"
                            title="Master Satuan">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span class="text-sm">Satuan</span>
                        </a>
                        <a href="{{ route('vendor.index') }}"
                            class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-xl transition-all backdrop-blur-sm border border-white/30 whitespace-nowrap group"
                            title="Kelola Master Vendor">
                            <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span class="text-sm">Vendor</span>
                        </a>
                        <button onclick="openModal('addModal')"
                            class="flex items-center gap-2 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-black/20 whitespace-nowrap group">
                            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            {{ $oracleMode ? 'Tambah SP Oracle' : 'Tambah SP' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        @if($oracleMode)
            <div class="rounded-2xl border p-4 shadow-sm"
                style="background: {{ $oracleMode ? 'linear-gradient(135deg, #3b2a08, #111827)' : '#fff7ed' }}; border-color: #f59e0b;">
                <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div class="min-w-0">
                        <p class="text-sm font-black" style="color:#ffffff;">Mode Oracle ERP aktif</p>
                        <p class="text-xs mt-1 leading-relaxed" style="color:#fde68a;">
                            Khusus SP bernilai di atas Rp50 juta. Nomor SP diketik manual sesuai nomor dari Oracle; field, item, vendor, PR/PPBJ, dan cetak SP tetap sama.
                        </p>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black shadow-sm" style="background:#f59e0b;color:#111827;">Manual numbering</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Nilai &gt; Rp50 Juta</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Pisah dari SP Otomatis</span>
                        <span class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-black border" style="background:#1f2937;color:#ffffff;border-color:#f59e0b;">Siap Audit</span>
                    </div>
                </div>
            </div>
        @endif

        {{-- PRESENCE --}}
        <div id="presenceBar" class="hidden transition-all duration-300">
            <div
                class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span class="relative flex h-2.5 w-2.5"><span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span
                        class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span></span>
                <span id="presenceText" class="text-xs font-semibold text-amber-700 dark:text-amber-400"></span>
            </div>
        </div>

        {{-- STATS BAR --}}
        @php
            $statsTotalCount = (float) data_get($stats, 'total_count', 0);
            $statsTotalNilaiSp = (float) data_get($stats, 'total_nilai_sp', 0);
            $statsTotalNilaiPr = (float) data_get($stats, 'total_nilai_pr', 0);
        @endphp
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Data</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {{ number_format($statsTotalCount, 0, ',', '.') }}
                    </p>
                </div>
            </div>
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Nilai SP</p>
                    <p class="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">Rp
                        {{ number_format($statsTotalNilaiSp, 0, ',', '.') }}
                    </p>
                </div>
            </div>
            <div
                class="bg-white dark:bg-gray-800 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center"><svg
                        class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg></div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Total Nilai PR</p>
                    <p class="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">Rp
                        {{ number_format($statsTotalNilaiPr, 0, ',', '.') }}
                    </p>
                </div>
            </div>
        </div>

        {{-- ALERTS --}}
        @if(session('success'))
            <div class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl"
                id="alertSuccess">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ session('success') }}</span>
                <button onclick="this.closest('[id]').remove()" class="ml-auto text-green-500 hover:text-green-700">✕</button>
            </div>
        @endif
        @if($errors->any())
            <div
                class="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                <ul class="text-sm">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
            </div>
        @endif

        {{-- FILTER BAR --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
            <div class="flex flex-col lg:flex-row gap-3">
                <div class="relative flex-1">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="searchInput" value="{{ $search ?? '' }}"
                        placeholder="Cari nomor SP, nomor PR, vendor, deskripsi..."
                        class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <span id="searchSpinner" class="absolute right-3 top-1/2 -translate-y-1/2 hidden"><svg
                            class="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg></span>
                </div>
                <select id="filterPic"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[140px]">
                    <option value="">Semua PIC</option>
                    @foreach($pics as $p)<option value="{{ $p }}" {{ (isset($pic) && $pic === $p) ? 'selected' : '' }}>
                        {{ $p }}
                    </option>@endforeach
                </select>
                <input type="date" id="dariInput" value="{{ $dari ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <input type="date" id="sampaiInput" value="{{ $sampai ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <button onclick="doExport()"
                    class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold text-sm whitespace-nowrap"><svg
                        class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>Export</button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="text-xs text-gray-400 mr-1">Quick:</span>
                    <button onclick="setQuickDate('today')" class="quick-pill">📍 Hari Ini</button>
                    <button onclick="setQuickDate('month')" class="quick-pill">📅 Bulan Ini</button>
                    <button onclick="setQuickDate('year')" class="quick-pill">📆 Tahun Ini</button>
                    <button onclick="resetDate()" class="quick-pill">🔄 Reset</button>
                </div>
                <div class="flex items-center gap-2 flex-wrap sm:ml-auto">
                    @if($search)<span
                        class="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-mono">"{{ $search }}"
                    <button onclick="clearSearch()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($pic)<span
                        class="inline-flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">PIC:
                    {{ $pic }} <button onclick="clearPic()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($dari || $sampai)<span
                        class="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">📅
                        {{ ($dari ? \Carbon\Carbon::parse($dari)->format('d/m/Y') : '...') }} –
                        {{ ($sampai ? \Carbon\Carbon::parse($sampai)->format('d/m/Y') : '...') }} <button
                    onclick="clearDate()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                </div>
            </div>
        </div>

        {{-- TABLE --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-10">
                                #</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[170px]">
                                Nomor SP</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[90px]">
                                Tgl SP</th>
                            <th
                                class="px-3 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[110px]">
                                Nilai SP</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[150px]">
                                Nomor PR</th>
                            <th
                                class="px-3 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[110px]">
                                Nilai PR</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[160px]">
                                Vendor</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Deskripsi</th>
                            <th
                                class="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-20">
                                PIC</th>
                            <th
                                class="px-3 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-32">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="spBody" class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($sps as $i => $s)
                            @php($canEditSp = (filled($s->created_by_user_id) && (int) $s->created_by_user_id === (int) auth()->id()) || auth()->user()?->matchesOwnerLabel($s->pic))
                            <tr class="tbl-row-hover" data-id="{{ $s->id }}"
                                data-search="{{ strtolower($s->nomor_sp . ' ' . $s->nomor_pr . ' ' . $s->nama_vendor . ' ' . $s->deskripsi_pengadaan) }}"
                                data-pic="{{ $s->pic }}">
                                <td class="px-3 py-3 text-gray-400 text-xs font-mono">{{ $sps->firstItem() + $i }}</td>
                                <td class="px-3 py-3">
                                    <div class="flex flex-col items-start gap-1">
                                        <span
                                            class="badge-sp inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                            title="Klik untuk salin">{{ $s->nomor_sp }}</span>
                                        @if(($s->numbering_mode ?? 'auto') === 'oracle')
                                            <span class="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white dark:bg-amber-400 dark:text-gray-950 px-2 py-0.5 text-[10px] font-bold">
                                                🕶️ Oracle &gt;50jt
                                            </span>
                                        @endif
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                                    {{ $s->tanggal_sp?->format('d/m/Y') ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-right">@if($s->nilai_sp)<span
                                class="nilai-badge text-emerald-700 dark:text-emerald-400 font-semibold">{{ 'Rp ' . number_format($s->nilai_sp, 0, ',', '.') }}</span>@else<span
                                        class="text-gray-400 text-xs">-</span>@endif</td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                                    {{ $s->nomor_pr ?? '-' }}
                                </td>
                                <td class="px-3 py-3 text-right">@if($s->nilai_pr)<span
                                class="nilai-badge text-indigo-600 dark:text-indigo-400">{{ 'Rp ' . number_format($s->nilai_pr, 0, ',', '.') }}</span>@else<span
                                        class="text-gray-400 text-xs">-</span>@endif</td>
                                <td class="px-3 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">
                                    <div class="flex flex-col items-start gap-1">
                                        <span>{{ $s->nama_vendor }}</span>
                                        @php($vendorAudit = $spVendorAuditMap[$s->id] ?? null)
                                        @if($vendorAudit)
                                            @php($auditClass = match($vendorAudit['status'] ?? '') {
                                                'match' => 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
                                                'mismatch' => 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
                                                'no_spph', 'no_vendor' => 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                                                default => 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700',
                                            })
                                            <span class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-extrabold {{ $auditClass }}"
                                                title="{{ !empty($vendorAudit['vendors']) ? 'Vendor SPPH: '.implode(', ', $vendorAudit['vendors']) : ($vendorAudit['label'] ?? '') }}">
                                                {{ $vendorAudit['status'] === 'match' ? '✓' : ($vendorAudit['status'] === 'mismatch' ? '!' : 'i') }}
                                                {{ $vendorAudit['label'] ?? 'Audit vendor' }}
                                            </span>
                                        @endif
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate"
                                    title="{{ $s->deskripsi_pengadaan }}">{{ $s->deskripsi_pengadaan }}</td>
                                <td class="px-3 py-3"><span
                                        class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">{{ $s->pic }}</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button type="button" onclick="shareRecordToChat('sp', {{ $s->id }})"
                                            class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                            title="Bagikan SP ke Chat Tim" aria-label="Bagikan SP ke Chat Tim">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8m-8 4h5m8-2a8 8 0 01-8 8 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.1A8 8 0 1119 17.2" />
                                            </svg>
                                        </button>
                                        <button type="button"
                                            onclick="openArchiveAttachmentUpload({
                                                module: 'SP',
                                                nomor: @js($s->nomor_sp ?? ('SP-' . $s->id)),
                                                nomor_pr: @js($s->nomor_pr ?? ''),
                                                vendor: @js($s->nama_vendor ?? ''),
                                                url: @js(route('sp.archive-attachment', $s))
                                            })"
                                            class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30 transition-colors"
                                            title="Upload lampiran SP ke Sistem Arsip" aria-label="Upload lampiran SP ke Sistem Arsip">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.657-5.657L5.757 10.757a6 6 0 108.486 8.486L20.5 12.986" />
                                            </svg>
                                        </button>
                                        <a href="{{ route('sp.cetak.preview', $s) }}" target="_blank"
                                            class="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                                            title="Preview & simpan SP"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg></a>
                                        @if($canEditSp)
                                            <button
                                                onclick="openEditModal(
                                                    {{ $s->id }},
                                                    {{ Js::from($s->nomor_sp) }},
                                                    {{ Js::from($s->tanggal_sp?->format('Y-m-d')) }},
                                                    {{ $s->nilai_sp ?? 0 }},
                                                    {{ Js::from($s->nomor_pr ?? '') }},
                                                    {{ $s->nilai_pr ?? 0 }},
                                                    {{ Js::from($s->nama_vendor) }},
                                                    {{ Js::from($s->deskripsi_pengadaan) }},
                                                    {{ Js::from($s->pic) }},
                                                    {{ Js::from($s->sph ?? '') }},
                                                    {{ Js::from($s->tgl_sph?->format('Y-m-d')) }},
                                                    {{ Js::from($s->promised_date?->format('Y-m-d')) }},
                                                    {{ Js::from($s->rfq ?? '') }},
                                                    {{ Js::from($s->nomor_pemenang ?? '') }},
                                                    {{ Js::from($s->tanggal_pemenang?->format('Y-m-d')) }},
                                                    {{ Js::from($s->awal_kontrak?->format('Y-m-d')) }},
                                                    {{ Js::from($s->akhir_kontrak?->format('Y-m-d')) }},
                                                    {{ Js::from($s->bidang_ip_itu ?? '') }},
                                                    {{ Js::from($s->penandatangan_sci ?? '') }},
                                                    {{ Js::from($s->jabatan_sci ?? '') }}
                                                )"
                                                class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                                title="Edit"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg></button>
                                        @else
                                            <button type="button"
                                                onclick="showLockedEditInfo('SP', @js($s->nomor_sp ?? ('SP-' . $s->id)), @js($s->pic ?? '-'))"
                                                class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm transition-colors"
                                                title="Edit hanya bisa dilakukan oleh pembuat SP atau user yang cocok dengan PIC"
                                                aria-label="Info edit terkunci">
                                                <span class="text-[13px] leading-none" aria-hidden="true">🔒</span>
                                            </button>
                                        @endif
                                        <button type="button"
                                            onclick="secureDeleteRecord('SP', @js($s->nomor_sp ?? ('SP-' . $s->id)), @js(route('sp.destroy', $s)))"
                                            class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                            title="Hapus SP dengan password pembuat"><svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg></button>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr id="emptyRow">
                                <td colspan="10" class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3"><span class="text-5xl">📝</span>
                                        <p class="font-medium">Belum ada data SP</p>
                                        <p class="text-sm">Klik <strong>Tambah SP</strong> untuk memulai</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($sps->hasPages())
                <div
                    class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan
                        {{ $sps->firstItem() }}–{{ $sps->lastItem() }} dari {{ $sps->total() }} data
                    </p>
                    {{ $sps->links() }}
                </div>
            @endif
        </div>
    </div>

    {{-- ═══ MODAL TAMBAH ═══ --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
         <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div class="sp-header-gradient px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">{{ $oracleMode ? 'Tambah SP Oracle' : 'Tambah SP Baru' }}</h2>
            </div>
            <form method="POST" action="{{ route('sp.store') }}" class="p-6 space-y-4" id="addFormSp">
                @csrf
                <input type="hidden" name="oracle_mode" value="{{ $oracleMode ? 1 : 0 }}">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor SP <span
                            class="text-red-500">*</span></label>
                    <div id="suggBoxSp" class="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
                        @if($oracleMode)
                            <span class="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-full px-3 py-1">
                                Mode Oracle: nomor SP diketik manual dari ERP
                            </span>
                        @else
                            <span class="text-xs text-gray-400 italic">Memuat saran...</span>
                        @endif
                    </div>
                    <input type="text" name="nomor_sp" id="nomorSpInput" placeholder="{{ $oracleMode ? 'Ketik nomor SP dari Oracle ERP...' : 'cth: 149/PKU-III/SP/2026' }}"
                        autocomplete="off" required
                        class="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm">
                    <div id="nomorStatusSp" class="mt-1.5 text-xs min-h-[18px] flex items-center gap-1.5"></div>
                    @if($oracleMode)
                        <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2">
                            Peringatan: pastikan nomor sudah sesuai dari Oracle karena sistem tidak membuat nomor otomatis pada mode ini.
                        </p>
                    @endif
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal
                            SP</label>
                        <input type="date" name="tanggal_sp" id="tanggalSpInput" value="{{ date('Y-m-d') }}"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai SP
                            (Rp)</label>
                        <input type="text" name="nilai_sp" id="nilaiSpInput" inputmode="numeric" placeholder="0"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <div id="addModeGuardSp" class="hidden mt-2 text-xs rounded-xl px-3 py-2 border"></div>
                    </div>
                </div>
                @if($oracleMode)
                    <div id="addOracleChecklist" class="rounded-2xl border p-3 shadow-sm"
                        style="background:#111827;border-color:#f59e0b;color:#ffffff;">
                    </div>
                @endif

                {{-- NOMOR PR DENGAN PPBJ DROPDOWN --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor PR <span
                            class="text-xs text-gray-400 font-normal">— Opsional, terhubung PPBJ</span></label>
                    <div class="flex gap-1.5 mb-1.5">
                        <button type="button" id="btnPpbjMode" onclick="setPrMode('ppbj')"
                            class="sp-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                            Pilih PPBJ</button>
                        <button type="button" id="btnManualMode" onclick="setPrMode('manual')"
                            class="sp-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                            Manual</button>
                    </div>
                    <div id="ppbjModeBox">
                        <select id="ppbjSelect" class="sp-ppbj-select w-full"
                            data-placeholder="Pilih No. PPBJ yang belum punya SP...">
                            <option value=""></option>
                        </select>
                    </div>
                    <div id="manualModeBox" class="hidden">
                        <input type="text" id="nomorPrManual" placeholder="Ketik nomor PR manual..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm"
                            autocomplete="off">
                    </div>
                    <input type="hidden" name="nomor_pr" id="nomorPrFinal">
                    <input type="hidden" name="vendor_mismatch_confirmed" id="addVendorMismatchConfirmed" value="0">
                    <div id="ppbjInfo"
                        class="hidden mt-1.5 p-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div id="ppbjInfoContent" class="text-xs text-sky-700 dark:text-sky-300 space-y-0.5"></div>
                        </div>
                    </div>
                    <div id="ppbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai PR
                            (Rp)</label>
                        <div id="addNilaiPrBadge" class="hidden mb-1"></div>
                        <input type="text" name="nilai_pr" id="nilaiPrInput" inputmode="numeric" placeholder="0"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">No. SPH <span
                                class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <input type="text" name="sph" id="addSph" placeholder="cth: SPH/2026/001"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl SPH <span
                                class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <input type="date" name="tgl_sph" id="addTglSph"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl Promised Date
                            <span class="text-xs text-gray-400 font-normal">— Batas penyerahan</span></label>
                        <input type="date" name="promised_date" id="addPromisedDate"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    </div>
                </div>

                {{-- DATA KONTRAK LANJUTAN --}}
                <div class="rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-900/10 p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <h3 class="text-sm font-bold text-blue-700 dark:text-blue-300">Data Kontrak Lanjutan</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Diisi untuk cetak kontrak, pakta integritas, dan jaminan pelaksanaan.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">RFQ</label>
                            <input type="text" name="rfq" id="addRfq" placeholder="Contoh: 0073"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor Pemenang</label>
                            <input type="text" name="nomor_pemenang" id="addNomorPemenang" placeholder="Nomor surat penetapan pemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Pemenang</label>
                            <input type="date" name="tanggal_pemenang" id="addTanggalPemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jampel 5%</label>
                            <input type="text" id="addJampelPreview" readonly placeholder="Otomatis dari Nilai SP + PPN 11% x 5%"
                                class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-emerald-700 dark:text-emerald-400 focus:outline-none text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Awal Kontrak</label>
                            <input type="date" name="awal_kontrak" id="addAwalKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Akhir Kontrak</label>
                            <input type="date" name="akhir_kontrak" id="addAkhirKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bidang IP / ITU</label>
                            <select name="bidang_ip_itu" id="addBidangIpItu"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Bidang --</option>
                                @foreach(($bidangIpItus ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Penandatangan SCI</label>
                            <select name="penandatangan_sci" id="addPenandatanganSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Penandatangan --</option>
                                @foreach(($penandatanganScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan SCI</label>
                            <select name="jabatan_sci" id="addJabatanSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                <option value="">-- Pilih Jabatan --</option>
                                @foreach(($jabatanScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Vendor <span
                            class="text-red-500">*</span></label>
                    <select name="nama_vendor" id="vendorSelectSp" required class="vendor-select-sp w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)<option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                        <option value="__tambah__">➕ Tambah Vendor Baru...</option>
                    </select>
                    <div id="addSpphVendorRecommendation" class="hidden mt-2"></div>
                    <div class="mt-2">
                        <button type="button" id="toggleNewVendorSp"
                            class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition">
                            🏢 Tambah detail vendor baru
                        </button>
                    </div>
                    <div id="newVendorBoxSp"
                        class="hidden mt-3 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-4 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">🏢 Data Vendor Baru</span>
                            <button type="button" onclick="cancelNewVendor()"
                                class="text-xs text-gray-500 dark:text-gray-300 hover:text-red-500 transition">✕ Batal</button>
                        </div>
                        <div><label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Nama Vendor
                                <span class="text-red-500">*</span></label><input type="text" id="newVendorNama"
                                placeholder="PT. Nama Vendor..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                        </div>
                        <div><label
                                class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Alamat</label><textarea
                                id="newVendorAlamat" rows="2" placeholder="Jl. Contoh No. 1, Kota..."
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Telepon</label><input
                                    type="text" id="newVendorTelp" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Fax</label><input
                                    type="text" id="newVendorFax" placeholder="0761-xxxxx"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email</label><input
                                    type="email" id="newVendorEmail" placeholder="vendor@email.com"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">NPWP</label><input
                                    type="text" id="newVendorNpwp" placeholder="00.000.000.0-000.000"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Direktur / Penanggung Jawab</label><input
                                    type="text" id="newVendorDirektur" placeholder="Nama direktur..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                            <div><label
                                    class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Jabatan</label><input
                                    type="text" id="newVendorJabatan" placeholder="Direktur / Ketua / Owner..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                            </div>
                        </div>
                        <p class="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2">
                            Data NPWP, direktur, dan jabatan akan dipakai otomatis saat cetak kontrak/SP di atas Rp50 juta agar dokumen tidak banyak titik-titik kosong.
                        </p>
                        <div id="newVendorChecklistSp" class="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-3 py-2 text-[11px] text-sky-800 dark:text-sky-200">
                            <div class="font-black mb-1">🧭 Checklist profil vendor</div>
                            <div class="grid grid-cols-2 gap-1" data-vendor-checklist-items>
                                <span>○ Nama wajib</span><span>○ Kontak</span><span>○ NPWP</span><span>○ Penanggung jawab</span>
                            </div>
                        </div>
                        <div id="newVendorStatus" class="hidden text-xs px-3 py-2 rounded-lg"></div>
                        <button type="button" onclick="saveNewVendor()"
                            class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"><span
                                id="newVendorBtnText">💾 Simpan Vendor</span><svg id="newVendorSpinner"
                                class="hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg></button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Pengadaan
                        <span class="text-red-500">*</span></label>
                    <div id="addDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="addDeskripsi" rows="3" required
                        placeholder="Masukkan deskripsi pengadaan..."
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">PIC <span
                            class="text-red-500">*</span></label>
                    <select name="pic" required class="pic-select-sp w-full">
                        <option value="">-- Pilih PIC --</option>@foreach($pics as $picItem)<option value="{{ $picItem }}">
                            {{ $picItem }}
                        </option>@endforeach
                    </select>
                </div>
                {{-- ═══ SECTION ITEMS (TAMBAH) ═══ --}}
                <div class="items-section" style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
                    <div class="items-header"
                        style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                        <label
                            style="font-size: .78rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px;">
                            <span>📋</span> Daftar Barang / Jasa
                        </label>
                        <span id="addItemCount" style="font-size: .65rem; color: #94a3b8;">0 item</span>
                    </div>

                    <div id="addRows" class="space-y-0"></div>

                    <!-- Subtotal Display -->
                    <div id="addSubtotalDisplay" class="subtotal-display" style="display: none;">
                        <span class="subtotal-label">💰 Total Barang:</span>
                        <span id="addSubtotalValue" class="subtotal-value">Rp 0</span>
                    </div>

                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('add')" class="btn-add-row"
                            style="background: linear-gradient(135deg, #0ea5e9, #6366f1);">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Barang
                        </button>
                    </div>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('addModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl sp-header-gradient text-white font-bold hover:opacity-90 shadow-lg shadow-blue-500/30">💾
                        Simpan SP</button>
                </div>
            </form>
        </div>
    </div>

    {{-- ═══ MODAL EDIT ═══ --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                <h2 class="text-white font-bold text-lg">Edit Data SP</h2>
            </div>
            <form method="POST" id="editFormSp" class="p-6 space-y-4">
                @csrf @method('PUT')
                <input type="hidden" id="editIdSp" value="">
                <input type="hidden" name="oracle_mode" value="{{ $oracleMode ? 1 : 0 }}">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor SP <span
                            class="text-red-500">*</span></label>
                    <input type="text" name="nomor_sp" id="editNomorSp" autocomplete="off" required
                        class="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm">
                    <div id="editNomorStatusSp" class="mt-1.5 text-xs min-h-[18px] flex items-center gap-1.5"></div>
                    @if($oracleMode)
                        <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2">
                            Mode Oracle aktif: nomor SP manual tidak akan disesuaikan otomatis berdasarkan bulan tanggal SP.
                        </p>
                    @endif
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal
                            SP</label><input type="date" name="tanggal_sp" id="editTanggalSp"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai SP
                            (Rp)</label><input type="text" name="nilai_sp" id="editNilaiSp" inputmode="numeric"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <div id="editModeGuardSp" class="hidden mt-2 text-xs rounded-xl px-3 py-2 border"></div>
                    </div>
                </div>
                @if($oracleMode)
                    <div id="editOracleChecklist" class="rounded-2xl border p-3 shadow-sm"
                        style="background:#111827;border-color:#f59e0b;color:#ffffff;">
                    </div>
                @endif
                {{-- NOMOR PR EDIT --}}
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor PR <span
                            class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                    <div class="flex gap-1.5 mb-1.5">
                        <button type="button" id="editBtnPpbjMode" onclick="setEditPrMode('ppbj')"
                            class="sp-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                            Pilih PPBJ</button>
                        <button type="button" id="editBtnManualMode" onclick="setEditPrMode('manual')"
                            class="sp-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                            Manual</button>
                    </div>
                    <div id="editPpbjModeBox">
                        <select id="editPpbjSelect" class="edit-sp-ppbj-select w-full" data-placeholder="Pilih No. PPBJ...">
                            <option value=""></option>
                        </select>
                    </div>
                    <div id="editManualModeBox" class="hidden">
                        <input type="text" id="editNomorPrManual" placeholder="Ketik nomor PR manual..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none font-mono text-sm"
                            autocomplete="off">
                    </div>
                    <input type="hidden" name="nomor_pr" id="editNomorPrFinal">
                    <input type="hidden" name="vendor_mismatch_confirmed" id="editVendorMismatchConfirmed" value="0">
                    <div id="editPpbjInfo"
                        class="hidden mt-1.5 p-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div id="editPpbjInfoContent" class="text-xs text-sky-700 dark:text-sky-300 space-y-0.5"></div>
                        </div>
                    </div>
                    <div id="editPpbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nilai PR
                            (Rp)</label>
                        <div id="editNilaiPrBadge" class="hidden mb-1"></div><input type="text" name="nilai_pr"
                            id="editNilaiPr" inputmode="numeric"
                            class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">No.
                            SPH</label><input type="text" name="sph" id="editSph" placeholder="cth: SPH/2026/001"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl
                            SPH</label><input type="date" name="tgl_sph" id="editTglSph"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                    <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tgl Promised
                            Date</label><input type="date" name="promised_date" id="editPromisedDate"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>
                </div>

                {{-- DATA KONTRAK LANJUTAN --}}
                <div class="rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-900/10 p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <h3 class="text-sm font-bold text-amber-700 dark:text-amber-300">Data Kontrak Lanjutan</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Diisi untuk cetak kontrak, pakta integritas, dan jaminan pelaksanaan.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">RFQ</label>
                            <input type="text" name="rfq" id="editRfq" placeholder="Contoh: 0073"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nomor Pemenang</label>
                            <input type="text" name="nomor_pemenang" id="editNomorPemenang" placeholder="Nomor surat penetapan pemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Pemenang</label>
                            <input type="date" name="tanggal_pemenang" id="editTanggalPemenang"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jampel 5%</label>
                            <input type="text" id="editJampelPreview" readonly placeholder="Otomatis dari Nilai SP + PPN 11% x 5%"
                                class="rupiah-input w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-emerald-700 dark:text-emerald-400 focus:outline-none text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Awal Kontrak</label>
                            <input type="date" name="awal_kontrak" id="editAwalKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Akhir Kontrak</label>
                            <input type="date" name="akhir_kontrak" id="editAkhirKontrak"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bidang IP / ITU</label>
                            <select name="bidang_ip_itu" id="editBidangIpItu"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Bidang --</option>
                                @foreach(($bidangIpItus ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Penandatangan SCI</label>
                            <select name="penandatangan_sci" id="editPenandatanganSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Penandatangan --</option>
                                @foreach(($penandatanganScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan SCI</label>
                            <select name="jabatan_sci" id="editJabatanSci"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                                <option value="">-- Pilih Jabatan --</option>
                                @foreach(($jabatanScis ?? []) as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Vendor <span
                            class="text-red-500">*</span></label>
                    <select name="nama_vendor" id="editVendorSp" required class="edit-vendor-sp w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)
                            <option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                    </select>
                    <div id="editSpphVendorRecommendation" class="hidden mt-2"></div>
                </div>
                <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Pengadaan
                        <span class="text-red-500">*</span></label>
                    <div id="editDeskripsiBadge" class="hidden mb-1"></div><textarea name="deskripsi_pengadaan"
                        id="editDeskripsiSp" rows="3" required
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none text-sm"></textarea>
                </div>
                <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">PIC <span
                            class="text-red-500">*</span></label><select name="pic" id="editPicSp" required
                        class="edit-pic-sp w-full">
                        <option value="">-- Pilih PIC --</option>@foreach($pics as $picItem)<option value="{{ $picItem }}">
                            {{ $picItem }}
                        </option>@endforeach
                    </select></div>
                {{-- ═══ SECTION ITEMS (EDIT) ═══ --}}
                <div class="items-section" style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
                    <div class="items-header"
                        style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                        <label
                            style="font-size: .78rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px;">
                            <span>📋</span> Daftar Barang / Jasa
                        </label>
                        <span id="editItemCount" style="font-size: .65rem; color: #94a3b8;">0 item</span>
                    </div>

                    <div id="editRows" class="space-y-0">
                        <div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>
                    </div>

                    <!-- Subtotal Display -->
                    <div id="editSubtotalDisplay" class="subtotal-display" style="display: none;">
                        <span class="subtotal-label">💰 Total Barang:</span>
                        <span id="editSubtotalValue" class="subtotal-value">Rp 0</span>
                    </div>

                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('edit')" class="btn-add-row"
                            style="background: linear-gradient(135deg, #f59e0b, #ea580c);">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Barang
                        </button>
                    </div>
                </div>
                <div class="flex gap-3 pt-2">
                    <button type="button" onclick="closeModal('editModal')"
                        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">Batal</button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90 shadow-lg shadow-amber-500/30">💾
                        Update SP</button>
                </div>
            </form>
        </div>
    </div>
    {{-- ════════════════════════════════════════════════════════════════
    ONBOARDING TUTORIAL — SP
    ════════════════════════════════════════════════════════════════ --}}
    <div id="onboardingPopup" class="onboarding-overlay" style="display:none;">
        <div class="onboarding-card">

            {{-- ── STEP 1: Welcome ── --}}
            <div class="ob-step active" data-step="1">
                <div class="ob-header" style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#8b5cf6 100%)">
                    <div class="ob-badge">✨ Pembaruan Fitur</div>
                    <div class="ob-icon-wrap">🚀</div>
                    <div class="ob-title">SP Management Lebih Cerdas</div>
                    <div class="ob-subtitle">Input SP sekarang terhubung langsung dengan PPBJ Management</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot active" data-dot="1"></div>
                    <div class="ob-progress-dot" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num">1</span> Apa yang baru?</div>
                    <div class="ob-desc">
                        Tidak perlu lagi <strong>update PPBJ manual</strong>! Sekarang saat SP disimpan, sistem otomatis
                        mengisi data di PPBJ Management dan <strong>progress langsung naik</strong>.
                    </div>
                    <div class="ob-features">
                        <div class="ob-feature"><span class="ob-feature-icon">📋</span><span class="ob-feature-text">Pilih
                                PPBJ langsung dari dropdown</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">✍️</span><span
                                class="ob-feature-text">Deskripsi & Nilai PR otomatis terisi dari PPBJ</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">🔗</span><span class="ob-feature-text">7 field
                                PPBJ otomatis ter-update</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">📊</span><span
                                class="ob-feature-text">Progress loncat ke 60% & 80%</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">🖨️</span><span class="ob-feature-text">Cetak
                                DOCX lengkap + kop surat</span></div>
                        <div class="ob-feature"><span class="ob-feature-icon">💰</span><span class="ob-feature-text">PPN 11%
                                & terbilang otomatis</span></div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="closeOnboarding()">Lewati</button>
                    <button class="ob-btn-next" onclick="nextObStep(2)">Lihat Cara Pakai <svg fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 2: Pilih PPBJ ── --}}
            <div class="ob-step" data-step="2">
                <div class="ob-header" style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)">
                    <div class="ob-badge">📋 Langkah 1</div>
                    <div class="ob-icon-wrap">🔍</div>
                    <div class="ob-title">Pilih PPBJ dari Dropdown</div>
                    <div class="ob-subtitle">Hanya muncul PPBJ yang belum terhubung dengan SP manapun</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot active" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num">2</span> Pilih Nomor PR</div>
                    <div class="ob-desc">Klik dropdown <strong>"Nomor PR"</strong>, pilih PPBJ yang tersedia. Sistem hanya
                        menampilkan PPBJ yang <strong>belum punya SP</strong>. <strong>Deskripsi pengadaan</strong> dan
                        <strong>Nilai PR</strong> akan otomatis terisi dari data PPBJ.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Modal Tambah SP</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select highlight">
                                <svg width="14" height="14" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono">045/PKU-III/PPBJ/2026</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-select">
                                <svg width="14" height="14" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono" style="color:#94a3b8">046/PKU-III/PPBJ/2026</div>
                                    <div class="ob-sub">ATK dan Perlengkapan</div>
                                </div>
                            </div>
                            <div class="ob-demo-arrow">↓ Auto-fill dari PPBJ</div>
                            <div class="ob-demo-grid" style="gap:6px;">
                                <div class="ob-demo-field" style="flex:2;">
                                    <div class="ob-demo-field-label">Deskripsi Pengadaan</div>
                                    <div style="font-size:9px;color:#374151;line-height:1.4;" class="dark:text-gray-300">
                                        Pengadaan Laptop Kantor untuk divisi IT...</div>
                                </div>
                                <div class="ob-demo-field" style="flex:1;">
                                    <div class="ob-demo-field-label">Nilai PR</div>
                                    <div class="ob-demo-field-value">Rp 122.121.212</div>
                                </div>
                            </div>
                            <div style="display:flex;justify-content:flex-end;margin-top:4px;">
                                <span
                                    style="display:inline-flex;align-items:center;gap:3px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:99px;padding:2px 8px;font-size:7px;font-weight:700;color:#16a34a;">✨
                                    2 field auto-terisi</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(1)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="nextObStep(3)">Selanjutnya <svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 3: Auto-link & Progress ── --}}
            <div class="ob-step" data-step="3">
                <div class="ob-header" style="background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%)">
                    <div class="ob-badge">🔗 Langkah 2</div>
                    <div class="ob-icon-wrap">🔗</div>
                    <div class="ob-title">Simpan Sekali, PPBJ Auto-Update!</div>
                    <div class="ob-subtitle">7 field terisi otomatis + progress PPBJ langsung naik</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot active" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label"><span class="ob-step-num" style="background:#22c55e">3</span> Yang terjadi
                        saat Simpan</div>
                    <div class="ob-desc">Klik <strong>"💾 Simpan SP"</strong>, lalu lihat halaman PPBJ — semua field sudah
                        terisi dan <strong>progress bar langsung loncat</strong> dari 40% ke 80%!</div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Field yang otomatis ter-update di PPBJ</div>
                        <div class="ob-demo-content" style="display:flex;flex-direction:column;gap:6px;">
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">150/PKU-V/SP/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← Awarding SP</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">07/05/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← Tgl SPK</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span class="ob-field-new">Rp
                                    122.121.212</span> <span style="font-size:7px;color:#6b7280;font-weight:600">← Nilai
                                    SP-SPK</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span
                                    class="ob-field-new">099/PKU-II/KOPKAR/2026</span> <span
                                    style="font-size:7px;color:#6b7280;font-weight:600">← No. SPH</span></div>
                            <div class="ob-field-update"><svg class="ob-field-arrow" width="10" height="10" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> <span class="ob-field-old">(kosong)</span> <span class="ob-field-new">17 Juni
                                    2026</span> <span style="font-size:7px;color:#6b7280;font-weight:600">← Promised
                                    Date</span></div>
                        </div>
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Progress PPBJ otomatis naik</div>
                        <div class="ob-demo-content">
                            <div class="ob-progress-demo">
                                <div class="ob-progress-bar-track">
                                    <div class="ob-progress-bar-fill ob-progress-jump"
                                        style="width:80%;background:linear-gradient(90deg,#22c55e,#16a34a)">
                                        <span class="bar-label">80%</span>
                                    </div>
                                </div>
                                <div class="ob-progress-steps">
                                    <span class="ps-done">✓ SPPH</span>
                                    <span class="ps-done">✓ SPH</span>
                                    <span class="ps-done">✓ Awarding</span>
                                    <span class="ps-active">✓ SPK</span>
                                    <span>BPG</span>
                                    <span>Invoice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(2)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="nextObStep(4)"
                        style="background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 4px 14px rgba(34,197,94,.4)">Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg></button>
                </div>
            </div>

            {{-- ── STEP 4: Cetak SP ── --}}
            <div class="ob-step" data-step="4">
                <div class="ob-header" style="background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)">
                    <div class="ob-badge">🖨️ Langkah 3</div>
                    <div class="ob-icon-wrap">📄</div>
                    <div class="ob-title">Cetak Dokumen SP (DOCX)</div>
                    <div class="ob-subtitle">Dokumen lengkap dengan kop surat, tabel, PPN, dan terbilang</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot done" data-dot="3"></div>
                    <div class="ob-progress-dot active" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label" style="color:#f59e0b"><span class="ob-step-num"
                            style="background:#f59e0b">4</span> Klik ikon cetak di tabel</div>
                    <div class="ob-desc">Klik tombol <strong>🖨️</strong> di kolom Aksi, sistem generate file
                        <strong>.docx</strong> lengkap dengan kop surat, tabel pengadaan, perhitungan <strong>PPN
                            11%</strong>, dan <strong>terbilang</strong> dalam bahasa Indonesia.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Dokumen SP yang dihasilkan</div>
                        <div class="ob-demo-content">
                            <div class="ob-docx-preview">
                                <div class="ob-docx-kop"></div>
                                <div class="ob-docx-body">
                                    <div style="text-align:center;font-size:10px;font-weight:800;margin-bottom:2px;">SURAT
                                        PESANAN</div>
                                    <div class="ob-docx-line short"></div>
                                    <div style="display:flex;gap:4px;font-size:7px;margin-bottom:4px;">
                                        <span style="color:#6b7280">Nomor:</span>
                                        <span
                                            style="font-family:'Courier New',monospace;font-weight:700;color:#111827">150/PKU-V/SP/2026</span>
                                    </div>
                                    <div style="font-size:7px;color:#374151;margin-bottom:6px;">Kepada Yth. <strong>PT.
                                            Contoh Vendor</strong></div>
                                    <div class="ob-docx-table">
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell header num">No</div>
                                            <div class="ob-docx-table-cell header name">Nama Barang</div>
                                            <div class="ob-docx-table-cell header price">Jumlah</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num">1</div>
                                            <div class="ob-docx-table-cell name" style="font-weight:700">Pengadaan Laptop
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 122.121.212</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;color:#6b7280">Jumlah
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 122.121.212</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;color:#6b7280">PPN 11%
                                            </div>
                                            <div class="ob-docx-table-cell price">Rp 13.433.333</div>
                                        </div>
                                        <div class="ob-docx-table-row">
                                            <div class="ob-docx-table-cell num"></div>
                                            <div class="ob-docx-table-cell name" style="font-size:6px;font-weight:800">TOTAL
                                            </div>
                                            <div class="ob-docx-table-cell price" style="font-weight:800;font-size:8px">Rp
                                                135.554.545</div>
                                        </div>
                                    </div>
                                    <div class="ob-docx-highlight">✨ Terbilang: "Seratus Tiga Puluh Lima Juta Lima Ratus
                                        Empat Puluh Lima Ribu Lima Ratus Empat Puluh Lima Rupiah"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(3)"><svg fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" style="width:14px;height:14px;vertical-align:middle;margin-right:3px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg> Kembali</button>
                    <button class="ob-btn-next" onclick="finishOnboarding()"
                        style="background:linear-gradient(135deg,#f59e0b,#ea580c);box-shadow:0 4px 14px rgba(245,158,11,.4)">🎉
                        Mulai Gunakan!</button>
                </div>
            </div>

        </div>
    </div>

    {{-- Floating Button --}}
    <button id="onboardingFloatBtn" class="ob-float-btn" style="display:none" onclick="showOnboarding()">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="ob-float-tooltip">Lihat Pembaruan SP</span>
    </button>
@endsection

@push('scripts')

    <script>
        const SATUANS = @json($satuans);
        const SATUAN_STORE_URL = '{{ route("satuan.store") }}';
        const ADD_SATUAN_VALUE = '__add_satuan__';
        const ITEMS_API = '/sp/';
        const CHECK_URL_SP = '{{ route('sp.check-nomor') }}';
        const SUGGEST_URL_SP = '{{ route('sp.suggest-nomor') }}';
        const POLL_URL_SP = '{{ route('sp.poll') }}';
        const PRESENCE_URL = '{{ route('sp.presence') }}';
        const PRESENCE_START = '{{ route('sp.presence.start') }}';
        const PRESENCE_STOP = '{{ route('sp.presence.stop') }}';
        const PPBJ_OPTIONS_URL = '{{ route('sp.ppbj-options') }}';
        const PPBJ_CHECK_URL = '{{ route('sp.check-ppbj') }}';
        const ORACLE_MODE_SP = {{ $oracleMode ? 'true' : 'false' }};
        const SP_AUTO_URL = @json($normalSpUrl);
        const SP_ORACLE_URL = @json($oracleSpUrl);

        let lastIdSp = {{ $sps->count() > 0 ? $sps->max('id') : 0 }};
        let pollTimer = null, checkTimer = null, searchTimer = null, presenceTimer = null, heartbeatTimer = null, modalOpen = false;
        let currentPrMode = 'ppbj', currentEditPrMode = 'ppbj';
        const IS_FIRST_PAGE = {{ $sps->onFirstPage() ? 'true' : 'false' }};
        const HAS_FILTER = {{ ($search ?? '') || ($pic ?? '') || ($dari ?? '') || ($sampai ?? '') || $oracleMode ? 'true' : 'false' }};

        // ── FIX BUG 2: Flag untuk mencegah change handler PPBJ menimpa field saat load edit ──
        let _suppressEditPpbjChange = false;

        // ═══════════════════════════════════════
        // PR MODE TOGGLE
        // ═══════════════════════════════════════
        function updatePrFinalValue() {
            $('#nomorPrFinal').val(currentPrMode === 'ppbj' ? ($('#ppbjSelect').val() || '') : ($('#nomorPrManual').val() || '').trim());
        }
        function updateEditPrFinalValue() {
            $('#editNomorPrFinal').val(currentEditPrMode === 'ppbj' ? ($('#editPpbjSelect').val() || '') : ($('#editNomorPrManual').val() || '').trim());
        }

        function setPrMode(mode) {
            currentPrMode = mode;
            const $badge = $('#addDeskripsiBadge');
            const $deskripsi = $('#addDeskripsi');
            const $nilaiPrBadge = $('#addNilaiPrBadge');
            const $nilaiPr = $('#nilaiPrInput');

            if (mode === 'ppbj') {
                $('#ppbjModeBox').removeClass('hidden');
                $('#manualModeBox').addClass('hidden');
                $('#btnPpbjMode').addClass('active-mode');
                $('#btnManualMode').removeClass('active-mode');
                $('#nomorPrManual').val('');
                $('#ppbjSelect').val(null).trigger('change');
                if ($deskripsi.length) $deskripsi.val('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                if ($nilaiPr.length) $nilaiPr.val('');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                updatePrFinalValue();
            } else {
                $('#ppbjModeBox').addClass('hidden');
                $('#manualModeBox').removeClass('hidden');
                $('#btnPpbjMode').removeClass('active-mode');
                $('#btnManualMode').addClass('active-mode');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                const s = $('#ppbjSelect').val();
                if (s) { $('#ppbjSelect').val(null).trigger('change'); }
                $('#nomorPrManual').val('');
                renderSpphVendorRecommendation('add', [], null);
                updatePrFinalValue();
            }
        }

        function setEditPrMode(mode) {
            currentEditPrMode = mode;
            const $badge = $('#editDeskripsiBadge');
            const $deskripsi = $('#editDeskripsiSp');
            const $nilaiPrBadge = $('#editNilaiPrBadge');
            const $nilaiPr = $('#editNilaiPr');

            if (mode === 'ppbj') {
                $('#editPpbjModeBox').removeClass('hidden');
                $('#editManualModeBox').addClass('hidden');
                $('#editBtnPpbjMode').addClass('active-mode');
                $('#editBtnManualMode').removeClass('active-mode');
                $('#editNomorPrManual').val('');
                $('#editPpbjSelect').val(null).trigger('change');
                if ($deskripsi.length) $deskripsi.val('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                if ($nilaiPr.length) $nilaiPr.val('');
                $('#editPpbjInfo').addClass('hidden');
                $('#editPpbjStatus').html('');
                updateEditPrFinalValue();
            } else {
                $('#editPpbjModeBox').addClass('hidden');
                $('#editManualModeBox').removeClass('hidden');
                $('#editBtnPpbjMode').removeClass('active-mode');
                $('#editBtnManualMode').addClass('active-mode');
                $('#editPpbjInfo').addClass('hidden');
                $('#editPpbjStatus').html('');
                if ($badge.length) $badge.addClass('hidden').html('');
                if ($nilaiPrBadge.length) $nilaiPrBadge.addClass('hidden').html('');
                const s = $('#editPpbjSelect').val();
                if (s) { $('#editPpbjSelect').val(null).trigger('change'); }
                $('#editNomorPrManual').val('');
                renderSpphVendorRecommendation('edit', [], null);
                updateEditPrFinalValue();
            }
        }

        // ═══════════════════════════════════════
        // PPBJ SELECT2
        // ═══════════════════════════════════════
        function initPpbjSelect2(selector, infoId, statusId, contentId, onChangeCb, deskripsiId, badgeId) {
            const $sel = $(selector);
            const vendorPrefix = selector === '.edit-sp-ppbj-select' ? 'edit' : 'add';
            $sel.select2({
                placeholder: $sel.data('placeholder') || 'Pilih No. PPBJ...',
                allowClear: true, width: '100%', minimumInputLength: 0,
                ajax: { url: PPBJ_OPTIONS_URL, dataType: 'json', delay: 300, data: p => ({ q: p.term || '' }), processResults: d => ({ results: d.results }), cache: true },
                templateResult: item => {
                    if (item.loading) return 'Mencari...';
                    const $c = $('<div>').append($('<strong class="font-mono">').text(item.id));
                    if (item.uraian) $c.append($('<br>')).append($('<small>').text(item.uraian).css({ color: '#6b7280' }));
                    if (!item.has_spph) $c.append(' <span style="color:#f59e0b;font-size:10px">⚠️ Belum SPPH</span>');
                    if (item.spph_vendors && item.spph_vendors.length) $c.append(' <span style="color:#10b981;font-size:10px">✓ ' + item.spph_vendors.length + ' vendor SPPH</span>');
                    return $c;
                },
                templateSelection: item => item.id ? $('<span class="font-mono font-semibold">').text(item.id) : item.text
            });
            $sel.on('change', function (e) {
                // ── FIX BUG 2: Cek flag suppress — abaikan handler saat load edit modal ──
                if (e._suppressCustom) {
                    if (onChangeCb) onChangeCb();
                    return;
                }

                const val = $(this).val();
                const $info = $('#' + infoId), $status = $('#' + statusId), $content = $('#' + contentId);
                const $deskripsi = deskripsiId ? $('#' + deskripsiId) : null;
                const $badge = badgeId ? $('#' + badgeId) : null;
                if (onChangeCb) onChangeCb(val);
                if (!val) {
                    $info.addClass('hidden'); $status.html('');
                    if ($badge) $badge.addClass('hidden').html('');
                    if ($deskripsi) $deskripsi.val('');
                    const $npb2 = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                    if ($npb2) $npb2.addClass('hidden').html('');
                    const $npInput2 = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                    if ($npInput2) $npInput2.val('');
                    renderSpphVendorRecommendation(vendorPrefix, [], null);
                    return;
                }
                $status.html('<span class="text-gray-400">🔄 Memeriksa...</span>');
                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                    $status.html('');
                    if (d.status === 'available') {
                        $status.html('<span class="text-green-600 dark:text-green-400">✅ PPBJ tersedia — akan otomatis terhubung</span>');
                        $info.removeClass('hidden');
                        let html = `<div><strong>Uraian:</strong> ${d.uraian || '-'}</div>`;
                        if (d.portofolio) html += `<div><strong>Portofolio:</strong> ${d.portofolio}</div>`;
                        if (d.buyer) html += `<div><strong>Buyer:</strong> ${d.buyer}</div>`;
                        if (d.total_sebelum_ppn) html += `<div><strong>Nilai PR (PPBJ):</strong> Rp ${number_format_dots(d.total_sebelum_ppn)}</div>`;
                        if (d.spph_nomor) html += `<div><strong>SPPH:</strong> <span class="font-mono">${escapedHtml(d.spph_nomor)}</span></div>`;
                        if (d.spph_vendors && d.spph_vendors.length) html += `<div><strong>Vendor SPPH:</strong> ${d.spph_vendors.map(v => escapedHtml(v)).join(', ')}</div>`;
                        if (d.warnings && d.warnings.length) html += `<div class="text-amber-600 dark:text-amber-400">⚠️ ${d.warnings.join(', ')}</div>`;
                        $content.html(html);
                        renderSpphVendorRecommendation(vendorPrefix, d.spph_vendors || [], d.spph_nomor || null);
                        if ($deskripsi && d.uraian) {
                            $deskripsi.val(d.uraian);
                            showDeskBadge($badge, d.uraian);
                        }
                        if (d.total_sebelum_ppn) {
                            const $nilaiPr = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            const $nilaiPrBadge = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($nilaiPr.length) {
                                $nilaiPr.val(formatRupiahFromNumber(d.total_sebelum_ppn));
                                showDeskBadge($nilaiPrBadge, 'Rp ' + number_format_dots(d.total_sebelum_ppn));
                            }
                        } else {
                            const $npb = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($npb) $npb.addClass('hidden').html('');
                            const $npInput = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            if ($npInput && !d.total_sebelum_ppn) $npInput.val('');
                        }
                    } else if (d.status === 'already_linked') {
                        $status.html(`<span class="text-amber-600 dark:text-amber-400">⚠️ ${d.message}</span>`);
                        $info.removeClass('hidden');
                        let linkedHtml = '';
                        if (d.uraian) linkedHtml += `<div><strong>Uraian:</strong> ${d.uraian}</div>`;
                        if (d.total_sebelum_ppn) linkedHtml += `<div><strong>Nilai PR (PPBJ):</strong> Rp ${number_format_dots(d.total_sebelum_ppn)}</div>`;
                        if (d.spph_nomor) linkedHtml += `<div><strong>SPPH:</strong> <span class="font-mono">${escapedHtml(d.spph_nomor)}</span></div>`;
                        if (d.spph_vendors && d.spph_vendors.length) linkedHtml += `<div><strong>Vendor SPPH:</strong> ${d.spph_vendors.map(v => escapedHtml(v)).join(', ')}</div>`;
                        $content.html(linkedHtml);
                        renderSpphVendorRecommendation(vendorPrefix, d.spph_vendors || [], d.spph_nomor || null);
                        if (!linkedHtml) $info.addClass('hidden');
                        if ($deskripsi && d.uraian) {
                            $deskripsi.val(d.uraian);
                            showDeskBadge($badge, d.uraian);
                        }
                        if (d.total_sebelum_ppn) {
                            const $nilaiPr = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            const $nilaiPrBadge = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($nilaiPr.length) {
                                $nilaiPr.val(formatRupiahFromNumber(d.total_sebelum_ppn));
                                showDeskBadge($nilaiPrBadge, 'Rp ' + number_format_dots(d.total_sebelum_ppn));
                            }
                        } else {
                            const $npb = selector === '.sp-ppbj-select' ? $('#addNilaiPrBadge') : $('#editNilaiPrBadge');
                            if ($npb) $npb.addClass('hidden').html('');
                            const $npInput = selector === '.sp-ppbj-select' ? $('#nilaiPrInput') : $('#editNilaiPr');
                            if ($npInput && !d.total_sebelum_ppn) $npInput.val('');
                        }
                    } else if (d.status === 'cancelled') {
                        $status.html(`<span class="text-red-600 dark:text-red-400">❌ ${d.message}</span>`); $info.addClass('hidden');
                        renderSpphVendorRecommendation(vendorPrefix, [], null);
                    } else { $status.html('<span class="text-blue-600">📝 Manual</span>'); $info.addClass('hidden'); if ($badge) $badge.addClass('hidden').html(''); renderSpphVendorRecommendation(vendorPrefix, [], null); }
                }).fail(() => { $status.html('<span class="text-red-600">❌ Gagal</span>'); $info.addClass('hidden'); renderSpphVendorRecommendation(vendorPrefix, [], null); });
            });
        }

        function showDeskBadge($b, uraian, existing) {
            if (!$b) return;
            const t = uraian.length > 50 ? uraian.substring(0, 50) + '...' : uraian;
            const l = existing ? 'ℹ️ Deskripsi sudah ada' : '✨ Auto-filled dari PPBJ';
            $b.html(`<span class="deskripsi-autofill-badge"><span>${l}: "${escapedHtml(t)}"</span><button type="button" onclick="$(this).closest('.deskripsi-autofill-badge').remove()" title="Hapus">✕</button></span>`).removeClass('hidden');
        }
        function escapedHtml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

        const spphVendorState = {
            add: { vendors: [], spphNomor: null },
            edit: { vendors: [], spphNomor: null }
        };

        function normalizeVendorName(value) {
            return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
        }

        function getSelectedVendorForPrefix(prefix) {
            return prefix === 'edit' ? ($('#editVendorSp').val() || '') : ($('#vendorSelectSp').val() || '');
        }

        function getVendorRecommendationTarget(prefix) {
            return prefix === 'edit' ? $('#editSpphVendorRecommendation') : $('#addSpphVendorRecommendation');
        }

        function selectRecommendedSpphVendor(prefix, vendor) {
            const selector = prefix === 'edit' ? '#editVendorSp' : '#vendorSelectSp';
            const $select = $(selector);
            if ($select.find(`option[value="${vendor}"]`).length === 0) {
                const marker = prefix === 'edit' ? null : $select.find('option[value="__tambah__"]');
                const option = new Option(vendor, vendor, true, true);
                if (marker && marker.length) marker.before(option); else $select.append(option);
            }
            $select.val(vendor).trigger('change');
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input) input.value = '0';
        }

        function renderSpphVendorRecommendation(prefix, vendors, spphNomor) {
            const $box = getVendorRecommendationTarget(prefix);
            spphVendorState[prefix] = {
                vendors: Array.isArray(vendors) ? vendors.filter(Boolean) : [],
                spphNomor: spphNomor || null
            };
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input) input.value = '0';

            if (!$box.length || !spphVendorState[prefix].vendors.length) {
                $box.addClass('hidden').html('');
                return;
            }

            const selected = normalizeVendorName(getSelectedVendorForPrefix(prefix));
            const isMatched = selected && spphVendorState[prefix].vendors.some(v => normalizeVendorName(v) === selected);
            const badgeClass = isMatched
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100'
                : selected
                    ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100'
                    : 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-900/30 dark:text-sky-100';

            const vendorButtons = spphVendorState[prefix].vendors.map(v => `
                <button type="button"
                    data-spph-vendor="${escapedHtml(v)}"
                    data-spph-prefix="${prefix}"
                    class="rounded-full border border-current/20 bg-white/70 dark:bg-slate-950/30 px-2.5 py-1 text-[11px] font-extrabold hover:scale-[1.02] transition">
                    ${escapedHtml(v)}
                </button>
            `).join('');

            $box.removeClass('hidden').html(`
                <div class="rounded-2xl border ${badgeClass} p-3 shadow-sm">
                    <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div class="text-xs font-black uppercase tracking-wide">Rekomendasi vendor dari SPPH</div>
                            <div class="mt-0.5 text-[11px] font-semibold opacity-80">
                                ${spphNomor ? `SPPH: <span class="font-mono">${escapedHtml(spphNomor)}</span>` : 'Vendor ini tercatat pada SPPH terkait.'}
                            </div>
                        </div>
                        <span class="rounded-full px-2 py-1 text-[10px] font-black ${isMatched ? 'bg-emerald-600 text-white' : selected ? 'bg-amber-500 text-white' : 'bg-sky-600 text-white'}">
                            ${isMatched ? 'Sesuai' : selected ? 'Perlu konfirmasi' : 'Pilih salah satu'}
                        </span>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1.5">${vendorButtons}</div>
                    ${selected && !isMatched ? '<div class="mt-2 text-[11px] font-bold">Vendor yang dipilih berbeda dari SPPH. Sistem akan minta konfirmasi sebelum disimpan.</div>' : ''}
                </div>
            `);
        }

        function updateSpphVendorRecommendation(prefix) {
            renderSpphVendorRecommendation(prefix, spphVendorState[prefix].vendors, spphVendorState[prefix].spphNomor);
        }

        function confirmVendorMismatchBeforeSubmit(prefix, form, event) {
            const state = spphVendorState[prefix] || { vendors: [] };
            if (!state.vendors || !state.vendors.length) return false;
            const input = document.getElementById(prefix === 'edit' ? 'editVendorMismatchConfirmed' : 'addVendorMismatchConfirmed');
            if (input && input.value === '1') return false;

            const selectedVendor = getSelectedVendorForPrefix(prefix);
            const isMatched = state.vendors.some(v => normalizeVendorName(v) === normalizeVendorName(selectedVendor));
            if (!selectedVendor || isMatched) return false;

            event.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Vendor berbeda dari SPPH',
                html: `
                    <div class="text-left text-sm leading-relaxed">
                        <p class="mb-2">Vendor yang dipilih: <strong>${escapedHtml(selectedVendor)}</strong></p>
                        <p class="mb-2">Vendor pada SPPH ${state.spphNomor ? `<strong>${escapedHtml(state.spphNomor)}</strong>` : 'terkait'}:</p>
                        <ul class="list-disc pl-5">${state.vendors.map(v => `<li><strong>${escapedHtml(v)}</strong></li>`).join('')}</ul>
                        <p class="mt-3">Apakah Anda yakin tetap memilih vendor yang berbeda?</p>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Ya, tetap simpan',
                cancelButtonText: 'Pilih ulang vendor',
                confirmButtonColor: '#f59e0b',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#111827'
            }).then(result => {
                if (result.isConfirmed) {
                    if (input) input.value = '1';
                    form.requestSubmit();
                }
            });
            return true;
        }

        // ═══════════════════════════════════════
        // FILTER HELPERS
        // ═══════════════════════════════════════
        function getFilterParams() { const p = new URLSearchParams(); const q = document.getElementById('searchInput').value.trim(); const pic = document.getElementById('filterPic').value; const d = document.getElementById('dariInput').value; const s = document.getElementById('sampaiInput').value; if (q) p.set('search', q); if (pic) p.set('pic', pic); if (d) p.set('dari', d); if (s) p.set('sampai', s); if (ORACLE_MODE_SP) p.set('mode', 'oracle'); return p.toString(); }
        function doSearch() { const qs = getFilterParams(); window.location.href = qs ? `/sp?${qs}` : '/sp'; }
        function doExport() { const qs = getFilterParams(); window.location.href = qs ? `/sp/export?${qs}` : '/sp/export'; }
        function clearSearch() { document.getElementById('searchInput').value = ''; doSearch(); }
        function clearPic() { document.getElementById('filterPic').value = ''; doSearch(); }
        function clearDate() { document.getElementById('dariInput').value = ''; document.getElementById('sampaiInput').value = ''; doSearch(); }
        function setQuickDate(t) { const dr = document.getElementById('dariInput'), sp = document.getElementById('sampaiInput'), n = new Date(), y = n.getFullYear(), m = String(n.getMonth() + 1).padStart(2, '0'), d = String(n.getDate()).padStart(2, '0'); if (t === 'today') { dr.value = `${y}-${m}-${d}`; sp.value = `${y}-${m}-${d}`; } else if (t === 'month') { dr.value = `${y}-${m}-01`; sp.value = `${y}-${m}-${new Date(y, n.getMonth() + 1, 0).getDate()}`; } else if (t === 'year') { dr.value = `${y}-01-01`; sp.value = `${y}-12-31`; } doSearch(); }
        function resetDate() { clearDate(); }

        // ═══════════════════════════════════════
        // PRESENCE
        // ═══════════════════════════════════════
        async function sendPresence(a) { try { await fetch(a, { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content } }); } catch { } }
        async function pollPresence() { try { const r = await fetch(PRESENCE_URL); if (!r.ok) return; const d = await r.json(); const b = document.getElementById('presenceBar'), t = document.getElementById('presenceText'); if (d.users.length > 0) { t.innerHTML = d.users.map(u => `<strong>${escapedHtml(u.name)}</strong>`).join(', ') + ' sedang menambahkan SP<span class="animate-pulse">...</span>'; b.classList.remove('hidden'); } else b.classList.add('hidden'); } catch { } }
        function startHeartbeat() { if (heartbeatTimer) return; sendPresence(PRESENCE_START); heartbeatTimer = setInterval(() => sendPresence(PRESENCE_START), 15000); }
        function stopHeartbeat() { if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; } sendPresence(PRESENCE_STOP); }

        // ═══════════════════════════════════════
        // MODAL
        // ═══════════════════════════════════════
        function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById(id).classList.add('flex'); document.body.style.overflow = 'hidden'; modalOpen = true; startHeartbeat(); }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); document.getElementById(id).classList.remove('flex'); document.body.style.overflow = ''; modalOpen = false; stopHeartbeat(); }
        function secureDeletePad(value) {
            return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
        }

        function secureDeleteFormatDuration(seconds) {
            const safe = Math.max(0, Math.ceil(Number(seconds) || 0));
            return `${secureDeletePad(safe / 3600)}:${secureDeletePad((safe % 3600) / 60)}:${secureDeletePad(safe % 60)}`;
        }

        function secureDeleteFormatDateTime(date) {
            return new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            }).format(date).replace(/\./g, ':');
        }

        function secureDeleteEscapeHtml(value) {
            return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }

        function showSecureDeleteLockCountdown(message, retryAfter, lockedUntil = null) {
            const targetTime = lockedUntil ? new Date(lockedUntil).getTime() : Date.now() + (Number(retryAfter || 900) * 1000);

            Swal.fire({
                icon: 'error',
                title: 'Aksi dikunci sementara',
                html: `
                    <p class="text-sm leading-relaxed mb-4">${secureDeleteEscapeHtml(message || 'Terlalu banyak percobaan password salah.')}</p>
                    <div id="secureDeleteCountdown" class="secure-delete-countdown">00:15:00</div>
                    <p class="mt-3 text-xs font-semibold opacity-90">Waktu tersisa sebelum tombol hapus bisa dicoba lagi.</p>
                    <div id="secureDeleteUnlockAt" class="secure-delete-time-pill mt-3"></div>
                `,
                confirmButtonText: 'Saya mengerti',
                confirmButtonColor: '#ef4444',
                customClass: { popup: 'secure-delete-popup' },
                didOpen: () => {
                    const countdown = document.getElementById('secureDeleteCountdown');
                    const unlockAt = document.getElementById('secureDeleteUnlockAt');
                    const render = () => {
                        const remaining = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
                        if (countdown) countdown.textContent = secureDeleteFormatDuration(remaining);
                        if (unlockAt) unlockAt.textContent = `Bisa dicoba lagi: ${secureDeleteFormatDateTime(new Date(targetTime))} WIB`;
                    };
                    render();
                    const timer = setInterval(render, 1000);
                    Swal.getPopup().dataset.secureDeleteTimer = timer;
                },
                willClose: () => {
                    const timer = Swal.getPopup()?.dataset?.secureDeleteTimer;
                    if (timer) clearInterval(Number(timer));
                }
            });
        }

        async function showLockedEditInfo(label, nomor, pic) {
            const safeNomor = nomor || '-';
            const safePic = pic || '-';
            const followUpText = `Mohon bantuan update ${label} ${safeNomor}. Data ini terkunci karena hanya pembuat/PIC (${safePic}) yang bisa melakukan edit demi menjaga audit trail.`;

            const result = await Swal.fire({
                icon: 'info',
                title: `Edit ${label} terkunci`,
                html: `
                    <div class="text-left space-y-3">
                        <div class="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
                            <div class="text-xs font-bold uppercase tracking-wide text-blue-600">Data</div>
                            <div class="mt-1 font-semibold">${secureDeleteEscapeHtml(safeNomor)}</div>
                        </div>
                        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                            <div class="text-xs font-bold uppercase tracking-wide text-amber-600">PIC / Pemilik data</div>
                            <div class="mt-1 font-semibold">${secureDeleteEscapeHtml(safePic)}</div>
                        </div>
                        <p class="text-sm leading-relaxed text-slate-600">
                            Untuk menjaga audit trail, edit hanya bisa dilakukan oleh pembuat data
                            atau user yang identitasnya cocok dengan PIC. Jika perlu perubahan,
                            follow up ke PIC/pembuat data agar riwayat tetap aman.
                        </p>
                    </div>
                `,
                confirmButtonText: 'Mengerti',
                showDenyButton: true,
                denyButtonText: 'Copy info follow up',
                confirmButtonColor: '#2563eb',
                denyButtonColor: '#0f172a',
                customClass: {
                    popup: 'rounded-3xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-bold',
                    denyButton: 'rounded-xl px-5 py-2.5 font-bold'
                }
            });

            if (result.isDenied) {
                await navigator.clipboard.writeText(followUpText);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Info follow up disalin',
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        }

        async function secureDeleteRecord(label, nomor, url) {
            const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '{{ csrf_token() }}';

            const result = await Swal.fire({
                icon: 'warning',
                title: `Hapus ${label}?`,
                html: `
                    <div class="secure-delete-stack">
                    <div class="secure-delete-danger">
                        <div class="secure-delete-danger-title">⚠️ Data: ${secureDeleteEscapeHtml(nomor)}</div>
                        <p>Data ${label} akan dihapus permanen. Relasi ke PPBJ akan disesuaikan bila data ini terhubung.</p>
                    </div>
                    <div class="secure-delete-warning">
                        <div class="secure-delete-warning-title">🔐 Verifikasi password</div>
                        <p>Masukkan <strong>password pembuat ${label}</strong>. Untuk data lama tanpa catatan pembuat, gunakan password user yang sedang login.</p>
                    </div>
                    <div class="secure-delete-input-wrap">
                    <label class="secure-delete-password-label" for="secureDeletePassword">Password pembuat ${label}</label>
                    <div class="secure-delete-password-field">
                        <input id="secureDeletePassword" type="password" class="swal2-input" placeholder="Masukkan password pembuat ${label}">
                        <button type="button" id="secureDeleteToggle" class="secure-delete-toggle">Lihat</button>
                    </div>
                    </div>
                    <div class="secure-delete-lock-preview"><p>Jika salah 3 kali, aksi hapus dikunci 15 menit untuk menjaga keamanan data.</p></div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: `Ya, Hapus ${label}`,
                cancelButtonText: 'Batal',
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#64748b',
                focusConfirm: false,
                customClass: { popup: 'secure-delete-popup' },
                didOpen: () => {
                    const input = document.getElementById('secureDeletePassword');
                    const toggle = document.getElementById('secureDeleteToggle');
                    input?.focus();
                    toggle?.addEventListener('click', () => {
                        input.type = input.type === 'password' ? 'text' : 'password';
                        toggle.textContent = input.type === 'password' ? 'Lihat' : 'Sembunyikan';
                    });
                },
                preConfirm: async () => {
                    const password = document.getElementById('secureDeletePassword')?.value || '';
                    if (!password.trim()) {
                        Swal.showValidationMessage('Password wajib diisi.');
                        return false;
                    }

                    try {
                        const response = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': csrf,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ creator_password: password })
                        });
                        const data = await response.json().catch(() => ({}));

                        if (response.status === 429 && data.locked) {
                            return { locked: true, data };
                        }

                        if (!response.ok) {
                            Swal.showValidationMessage(data.message || `Gagal menghapus ${label}.`);
                            return false;
                        }

                        return { ok: true, data };
                    } catch (error) {
                        Swal.showValidationMessage(`Gagal menghapus ${label}. Periksa koneksi lalu coba lagi.`);
                        return false;
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (!result.isConfirmed || !result.value) return;

            if (result.value.locked) {
                showSecureDeleteLockCountdown(result.value.data.message, result.value.data.retry_after, result.value.data.locked_until);
                return;
            }

            await Swal.fire({
                icon: 'success',
                title: `${label} dihapus`,
                text: result.value.data?.message || `Data ${label} berhasil dihapus.`,
                timer: 1400,
                showConfirmButton: false,
                customClass: { popup: 'secure-delete-popup' }
            });
            window.location.reload();
        }

        document.getElementById('spBody').addEventListener('click', function (e) {
            const b = e.target.closest('.badge-sp');
            if (b) { navigator.clipboard.writeText(b.textContent.trim()); Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Nomor disalin!', showConfirmButton: false, timer: 1500, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }); }
        });

        // ═══════════════════════════════════════
        // RUPIAH FORMAT
        // ═══════════════════════════════════════
        function formatRupiah(v) { let n = v.replace(/\D/g, ''); if (n === '') return ''; n = n.replace(/^0+/, '') || '0'; return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function stripRupiah(v) { return v.replace(/\./g, '') || ''; }
        function formatRupiahFromNumber(n) { if (!n || n === 0) return ''; return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function number_format_dots(n) { if (!n && n !== 0) return '-'; return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
        function initRupiahInput(id) { const el = document.getElementById(id); el.addEventListener('input', function () { const p = this.selectionStart, o = this.value.length; this.value = formatRupiah(this.value); this.setSelectionRange(p + this.value.length - o, p + this.value.length - o); }); el.addEventListener('paste', function () { setTimeout(() => { this.value = formatRupiah(this.value); }, 0); }); }

        function calculateJampelFromNilaiSpInput(inputId) {
            const el = document.getElementById(inputId);
            if (!el) return 0;
            const nilaiSp = parseFloat(stripRupiah(el.value || '0')) || 0;
            const totalDenganPpn = nilaiSp + (nilaiSp * 0.11);
            return Math.round(totalDenganPpn * 0.05);
        }

        function updateJampelPreview(prefix) {
            const inputId = prefix === 'edit' ? 'editNilaiSp' : 'nilaiSpInput';
            const previewId = prefix === 'edit' ? 'editJampelPreview' : 'addJampelPreview';
            const preview = document.getElementById(previewId);
            if (!preview) return;
            const jampel = calculateJampelFromNilaiSpInput(inputId);
            preview.value = jampel > 0 ? 'Rp ' + number_format_dots(jampel) : '';
        }

        function getSpModeGuardValue(prefix) {
            const inputId = prefix === 'edit' ? 'editNilaiSp' : 'nilaiSpInput';
            const rowsId = prefix === 'edit' ? 'editRows' : 'addRows';
            const inputValue = parseFloat(stripRupiah(document.getElementById(inputId)?.value || '0')) || 0;
            if (inputValue > 0) return inputValue;

            let itemsTotal = 0;
            document.getElementById(rowsId)?.querySelectorAll('.subtotal-value').forEach(el => {
                itemsTotal += parseFloat(el.textContent.replace(/[^\d]/g, '')) || 0;
            });
            return itemsTotal;
        }

        function updateSpModeGuard(prefix) {
            const box = document.getElementById(prefix === 'edit' ? 'editModeGuardSp' : 'addModeGuardSp');
            if (!box) return true;

            const value = getSpModeGuardValue(prefix);
            box.className = 'hidden mt-2 text-xs rounded-xl px-3 py-2 border';
            box.innerHTML = '';

            if (!value) return true;

            if (ORACLE_MODE_SP && value <= 50000000) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-red-50 dark:bg-red-900/25 border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 font-semibold';
                box.innerHTML = '⚠️ Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.';
                return false;
            }

            if (!ORACLE_MODE_SP && value > 50000000) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-semibold';
                box.innerHTML = '🕶️ Nilai SP di atas Rp50.000.000 harus dibuat lewat mode Oracle ERP agar tidak tercampur dengan penomoran otomatis.';
                return false;
            }

            if (ORACLE_MODE_SP) {
                box.className = 'mt-2 text-xs rounded-xl px-3 py-2 border bg-emerald-50 dark:bg-emerald-900/25 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-200 font-semibold';
                box.innerHTML = '✅ Nilai sesuai untuk mode Oracle ERP.';
            }

            return true;
        }

        // ═══════════════════════════════════════
        // NOMOR CHECK
        // ═══════════════════════════════════════
        function setStatus(inputEl, statusEl, state, msg) { inputEl.classList.remove('nomor-input-ok', 'nomor-input-error', 'nomor-input-warn'); statusEl.innerHTML = ''; if (!msg) return; const i = { ok: '✅', duplicate: '❌', warn: '⚠️', checking: '🔄' }, c = { ok: 'nomor-status-ok', duplicate: 'nomor-status-error', warn: 'nomor-status-warn', checking: 'text-gray-400' }, b = { ok: 'nomor-input-ok', duplicate: 'nomor-input-error', warn: 'nomor-input-warn' }; if (b[state]) inputEl.classList.add(b[state]); statusEl.innerHTML = `<span class="${c[state] || ''}">${i[state] || ''} ${msg}</span>`; }

        const SP_MODE_DRAFT_KEY = 'simonpr_sp_mode_switch_draft';

        function isDarkModeActive() {
            return document.documentElement.classList.contains('dark');
        }

        function setSpModeGuardBox(box, type, title, body, actionLabel = null, actionMode = null, prefix = 'add') {
            const dark = isDarkModeActive();
            const palettes = {
                danger: {
                    bg: dark ? '#3f1218' : '#fff1f2',
                    border: dark ? '#f87171' : '#fecdd3',
                    title: dark ? '#ffffff' : '#881337',
                    body: dark ? '#fecaca' : '#be123c',
                    iconBg: '#dc2626',
                    buttonBg: '#dc2626',
                    buttonHover: '#b91c1c'
                },
                warning: {
                    bg: dark ? '#3b2a08' : '#fff7ed',
                    border: dark ? '#f59e0b' : '#fed7aa',
                    title: dark ? '#ffffff' : '#7c2d12',
                    body: dark ? '#fde68a' : '#9a3412',
                    iconBg: '#f59e0b',
                    buttonBg: '#f59e0b',
                    buttonHover: '#d97706'
                },
                success: {
                    bg: dark ? '#0f2f25' : '#ecfdf5',
                    border: dark ? '#34d399' : '#a7f3d0',
                    title: dark ? '#ffffff' : '#064e3b',
                    body: dark ? '#bbf7d0' : '#047857',
                    iconBg: '#059669',
                    buttonBg: '#059669',
                    buttonHover: '#047857'
                }
            };
            const palette = palettes[type] || palettes.warning;
            const actionHtml = actionLabel && actionMode
                ? `<button type="button" onclick="switchSpModeWithDraft('${prefix}', '${actionMode}')" class="mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-extrabold shadow-sm transition text-white" style="background:${palette.buttonBg}" onmouseenter="this.style.background='${palette.buttonHover}'" onmouseleave="this.style.background='${palette.buttonBg}'">
                        <span>↗</span><span>${actionLabel}</span>
                   </button>`
                : '';

            box.className = 'mt-3 rounded-2xl border p-3 shadow-sm transition-all';
            box.style.background = palette.bg;
            box.style.borderColor = palette.border;
            box.style.color = palette.title;
            box.innerHTML = `
                <div class="flex gap-3">
                    <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style="background:${palette.iconBg}">${type === 'success' ? '✓' : '!'}</div>
                    <div class="min-w-0">
                        <div class="text-sm font-black leading-snug" style="color:${palette.title}">${title}</div>
                        <div class="mt-1 text-xs font-semibold leading-relaxed" style="color:${palette.body}">${body}</div>
                        ${actionHtml}
                    </div>
                </div>
            `;
        }

        function collectSpModeDraft(prefix) {
            const isEdit = prefix === 'edit';
            const val = id => document.getElementById(id)?.value || '';
            const selected = selector => $(selector).val() || '';

            return {
                expiresAt: Date.now() + (10 * 60 * 1000),
                nomor_pr: val(isEdit ? 'editNomorPrFinal' : 'nomorPrFinal') || val(isEdit ? 'editNomorPrManual' : 'nomorPrManual'),
                ppbj_id: selected(isEdit ? '#editPpbjSelect' : '#ppbjSelect'),
                tanggal_sp: val(isEdit ? 'editTanggalSp' : 'tanggalSpInput'),
                nilai_sp: val(isEdit ? 'editNilaiSp' : 'nilaiSpInput'),
                nilai_pr: val(isEdit ? 'editNilaiPr' : 'nilaiPrInput'),
                deskripsi: val(isEdit ? 'editDeskripsiSp' : 'addDeskripsi'),
                sph: val(isEdit ? 'editSph' : 'addSph'),
                tgl_sph: val(isEdit ? 'editTglSph' : 'addTglSph'),
                promised_date: val(isEdit ? 'editPromisedDate' : 'addPromisedDate'),
                rfq: val(isEdit ? 'editRfq' : 'addRfq'),
                nomor_pemenang: val(isEdit ? 'editNomorPemenang' : 'addNomorPemenang'),
                tanggal_pemenang: val(isEdit ? 'editTanggalPemenang' : 'addTanggalPemenang'),
                awal_kontrak: val(isEdit ? 'editAwalKontrak' : 'addAwalKontrak'),
                akhir_kontrak: val(isEdit ? 'editAkhirKontrak' : 'addAkhirKontrak'),
                bidang_ip_itu: val(isEdit ? 'editBidangIpItu' : 'addBidangIpItu'),
                penandatangan_sci: val(isEdit ? 'editPenandatanganSci' : 'addPenandatanganSci'),
                jabatan_sci: val(isEdit ? 'editJabatanSci' : 'addJabatanSci')
            };
        }

        function switchSpModeWithDraft(prefix, mode) {
            try {
                sessionStorage.setItem(SP_MODE_DRAFT_KEY, JSON.stringify(collectSpModeDraft(prefix)));
            } catch (err) {
                console.warn('[SP] gagal menyimpan draft pindah mode:', err);
            }
            window.location.href = mode === 'oracle' ? SP_ORACLE_URL : SP_AUTO_URL;
        }

        function restoreSpModeDraftToAdd() {
            let draft = null;
            try {
                const raw = sessionStorage.getItem(SP_MODE_DRAFT_KEY);
                if (!raw) return;
                draft = JSON.parse(raw);
                sessionStorage.removeItem(SP_MODE_DRAFT_KEY);
            } catch (err) {
                sessionStorage.removeItem(SP_MODE_DRAFT_KEY);
                return;
            }

            if (!draft || !draft.expiresAt || draft.expiresAt < Date.now()) return;
            const set = (id, value) => {
                const el = document.getElementById(id);
                if (el && value !== undefined && value !== null && value !== '') el.value = value;
            };

            set('tanggalSpInput', draft.tanggal_sp);
            set('nilaiSpInput', draft.nilai_sp);
            set('nilaiPrInput', draft.nilai_pr);
            set('addDeskripsi', draft.deskripsi);
            set('addSph', draft.sph);
            set('addTglSph', draft.tgl_sph);
            set('addPromisedDate', draft.promised_date);
            set('addRfq', draft.rfq);
            set('addNomorPemenang', draft.nomor_pemenang);
            set('addTanggalPemenang', draft.tanggal_pemenang);
            set('addAwalKontrak', draft.awal_kontrak);
            set('addAkhirKontrak', draft.akhir_kontrak);
            set('addBidangIpItu', draft.bidang_ip_itu);
            set('addPenandatanganSci', draft.penandatangan_sci);
            set('addJabatanSci', draft.jabatan_sci);

            if (draft.ppbj_id) {
                setPrMode('ppbj');
                $('#ppbjSelect').val(draft.ppbj_id).trigger('change');
            } else if (draft.nomor_pr) {
                setPrMode('manual');
                $('#nomorPrManual').val(draft.nomor_pr);
                $('#nomorPrFinal').val(draft.nomor_pr);
            }

            updateJampelPreview('add');
            updateSpModeGuard('add');
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Draft dipulihkan setelah pindah mode',
                showConfirmButton: false,
                timer: 2600,
                timerProgressBar: true,
                background: isDarkModeActive() ? '#111827' : '#ffffff',
                color: isDarkModeActive() ? '#f9fafb' : '#111827'
            });
        }

        updateSpModeGuard = function (prefix) {
            const box = document.getElementById(prefix === 'edit' ? 'editModeGuardSp' : 'addModeGuardSp');
            if (!box) return true;

            const value = getSpModeGuardValue(prefix);
            box.className = 'hidden mt-2 text-xs rounded-xl px-3 py-2 border';
            box.style.cssText = '';
            box.innerHTML = '';

            if (!value) {
                updateOracleReadinessChecklist(prefix);
                return true;
            }

            if (ORACLE_MODE_SP && value <= 50000000) {
                setSpModeGuardBox(
                    box,
                    'danger',
                    'Nilai belum sesuai untuk Mode Oracle ERP',
                    'Mode Oracle dipakai untuk SP di atas Rp50.000.000. Jika nilai ini memang di bawah batas tersebut, pindahkan ke mode SP Otomatis agar penomoran tetap rapi.',
                    'Kembali ke SP Otomatis',
                    'auto',
                    prefix
                );
                updateOracleReadinessChecklist(prefix);
                return false;
            }

            if (!ORACLE_MODE_SP && value > 50000000) {
                setSpModeGuardBox(
                    box,
                    'warning',
                    'Nilai masuk kategori Oracle ERP',
                    'SP di atas Rp50.000.000 sebaiknya memakai nomor dari Oracle ERP. Klik tombol di bawah untuk pindah mode tanpa kehilangan draft yang sudah diisi.',
                    'Pindah ke Mode Oracle',
                    'oracle',
                    prefix
                );
                updateOracleReadinessChecklist(prefix);
                return false;
            }

            if (ORACLE_MODE_SP) {
                setSpModeGuardBox(
                    box,
                    'success',
                    'Nilai sesuai untuk Mode Oracle ERP',
                    'Nomor SP dapat diketik manual sesuai nomor yang diterbitkan dari Oracle. Data tetap masuk ke daftar Oracle dan tidak bercampur dengan SP Otomatis.'
                );
            }

            updateOracleReadinessChecklist(prefix);
            return true;
        };

        function getOracleReadiness(prefix) {
            const isEdit = prefix === 'edit';
            const formSelector = isEdit ? '#editFormSp' : '#addFormSp';
            const nomorSp = document.getElementById(isEdit ? 'editNomorSp' : 'nomorSpInput')?.value?.trim() || '';
            const nilaiSp = getSpModeGuardValue(prefix);
            const nomorPr = document.getElementById(isEdit ? 'editNomorPrFinal' : 'nomorPrFinal')?.value?.trim() || '';
            const vendor = isEdit ? $('#editVendorSp').val() : $('#vendorSelectSp').val();
            const pic = isEdit ? $('#editPicSp').val() : $('.pic-select-sp').val();
            const itemReady = Array.from(document.querySelectorAll(`${isEdit ? '#editRows' : '#addRows'} .rt-editor`))
                .some(editor => (editor.textContent || '').trim().length > 0);

            return [
                { label: 'Nomor SP Oracle sudah diisi manual', ok: nomorSp.length > 0 },
                { label: 'Nilai SP di atas Rp50.000.000', ok: nilaiSp > 50000000 },
                { label: 'Nomor PR/PPBJ sudah terhubung atau diisi', ok: nomorPr.length > 0 },
                { label: 'Vendor dan PIC sudah dipilih', ok: !!vendor && vendor !== '__tambah__' && !!pic },
                { label: 'Minimal 1 item barang/jasa sudah ditulis', ok: itemReady }
            ];
        }

        function updateOracleReadinessChecklist(prefix) {
            if (!ORACLE_MODE_SP) return;
            const box = document.getElementById(prefix === 'edit' ? 'editOracleChecklist' : 'addOracleChecklist');
            if (!box) return;

            const items = getOracleReadiness(prefix);
            const readyCount = items.filter(item => item.ok).length;
            const total = items.length;
            const allReady = readyCount === total;

            box.style.background = isDarkModeActive() ? '#111827' : '#fff7ed';
            box.style.borderColor = allReady ? '#34d399' : '#f59e0b';
            box.style.color = isDarkModeActive() ? '#ffffff' : '#111827';
            box.innerHTML = `
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <div class="text-sm font-black" style="color:${isDarkModeActive() ? '#ffffff' : '#111827'}">Checklist Kesiapan Oracle</div>
                        <div class="mt-1 text-xs font-semibold" style="color:${isDarkModeActive() ? '#fde68a' : '#92400e'}">
                            ${readyCount}/${total} syarat siap. Checklist ini membantu mencegah nomor Oracle salah mode sebelum disimpan.
                        </div>
                    </div>
                    <span class="shrink-0 rounded-full px-3 py-1 text-[11px] font-black" style="background:${allReady ? '#10b981' : '#f59e0b'};color:${allReady ? '#ffffff' : '#111827'}">
                        ${allReady ? 'Siap simpan' : 'Perlu cek'}
                    </span>
                </div>
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${items.map(item => `
                        <div class="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold"
                            style="background:${item.ok ? (isDarkModeActive() ? '#064e3b' : '#ecfdf5') : (isDarkModeActive() ? '#1f2937' : '#ffffff')};border-color:${item.ok ? '#34d399' : '#f59e0b'};color:${item.ok ? (isDarkModeActive() ? '#d1fae5' : '#065f46') : (isDarkModeActive() ? '#fef3c7' : '#92400e')}">
                            <span class="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                                style="background:${item.ok ? '#10b981' : '#f59e0b'};color:${item.ok ? '#ffffff' : '#111827'}">${item.ok ? '✓' : '!'}</span>
                            <span>${item.label}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function getSuggestionUrlSp() { const url = new URL(SUGGEST_URL_SP, window.location.origin); const tanggal = document.getElementById('tanggalSpInput')?.value; if (tanggal) url.searchParams.set('tanggal', tanggal); return url.toString(); }
        async function loadSuggestionsSp() { const box = document.getElementById('suggBoxSp'); try { const r = await fetch(getSuggestionUrlSp()); const d = await r.json(); box.innerHTML = d.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${d.last}</span> →</span>` : `<span class="text-xs text-gray-400 mr-1">Saran:</span>`; d.suggestions.forEach(s => { const p = document.createElement('span'); p.className = 'suggest-pill'; p.innerHTML = `✨ ${s}`; p.onclick = () => { document.getElementById('nomorSpInput').value = s; document.getElementById('nomorSpInput').dispatchEvent(new Event('input')); }; box.appendChild(p); }); } catch { box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>'; } }

        getSuggestionUrlSp = function () {
            const url = new URL(SUGGEST_URL_SP, window.location.origin);
            const tanggal = document.getElementById('tanggalSpInput')?.value;
            if (tanggal) url.searchParams.set('tanggal', tanggal);
            if (ORACLE_MODE_SP) url.searchParams.set('oracle_mode', '1');
            return url.toString();
        };

        loadSuggestionsSp = async function () {
            const box = document.getElementById('suggBoxSp');
            if (!box) return;
            if (ORACLE_MODE_SP) {
                box.innerHTML = `<span class="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-full px-3 py-1">Mode Oracle: nomor SP diketik manual dari ERP</span>`;
                return;
            }

            try {
                const r = await fetch(getSuggestionUrlSp());
                const d = await r.json();
                box.innerHTML = d.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${d.last}</span> →</span>` : `<span class="text-xs text-gray-400 mr-1">Saran:</span>`;
                d.suggestions.forEach(s => {
                    const p = document.createElement('span');
                    p.className = 'suggest-pill';
                    p.innerHTML = `✨ ${s}`;
                    p.onclick = () => {
                        document.getElementById('nomorSpInput').value = s;
                        document.getElementById('nomorSpInput').dispatchEvent(new Event('input'));
                    };
                    box.appendChild(p);
                });
            } catch {
                box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>';
            }
        };

        function attachNomorCheck(inputId, statusId, getExcludeId, dateInputId = null) {
            const input = document.getElementById(inputId), status = document.getElementById(statusId);
            const runCheck = () => {
                const v = input.value.trim();
                if (!v) { setStatus(input, status, null, ''); return; }
                setStatus(input, status, 'checking', 'Memeriksa...');
                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    try {
                        const url = new URL(CHECK_URL_SP, window.location.origin);
                        url.searchParams.set('nomor', v);
                        url.searchParams.set('exclude_id', getExcludeId());
                        if (ORACLE_MODE_SP) url.searchParams.set('oracle_mode', '1');
                        const tanggal = dateInputId ? document.getElementById(dateInputId)?.value : '';
                        if (tanggal) url.searchParams.set('tanggal', tanggal);
                        const r = await fetch(url.toString());
                        const d = await r.json();
                        if (d.normalized_nomor && input.value.trim() !== d.normalized_nomor) {
                            input.value = d.normalized_nomor;
                        }
                        if (d.status === 'duplicate') setStatus(input, status, 'duplicate', d.message);
                        else if (d.warning) setStatus(input, status, 'warn', d.warning);
                        else {
                            setStatus(input, status, 'ok', 'Tersedia ✓');
                            setTimeout(() => { if (status.textContent.includes('Tersedia')) setStatus(input, status, null, ''); }, 400);
                        }
                    } catch { setStatus(input, status, null, ''); }
                }, 400);
            };
            input.addEventListener('input', runCheck);
            if (dateInputId) document.getElementById(dateInputId)?.addEventListener('change', runCheck);
        }

        // ═══════════════════════════════════════
        // OPEN EDIT MODAL
        // ═══════════════════════════════════════
        function openEditModal(
            id,
            nomor,
            tgl,
            nilaiSp,
            nomorPr,
            nilaiPr,
            vendor,
            deskripsi,
            pic,
            sph,
            tglSph,
            promisedDate,
            rfq,
            nomorPemenang,
            tanggalPemenang,
            awalKontrak,
            akhirKontrak,
            bidangIpItu,
            penandatanganSci,
            jabatanSci
        ) {
            document.getElementById('editFormSp').action = `/sp/${id}`;
            document.getElementById('editIdSp').value = id;
            document.getElementById('editNomorSp').value = nomor;
            document.getElementById('editTanggalSp').value = tgl || '';
            document.getElementById('editNilaiSp').value = formatRupiahFromNumber(nilaiSp);
            document.getElementById('editSph').value = (sph === 'null' || !sph) ? '' : sph;
            document.getElementById('editTglSph').value = tglSph || '';
            document.getElementById('editPromisedDate').value = promisedDate || '';
            document.getElementById('editRfq').value = rfq || '';
            document.getElementById('editNomorPemenang').value = nomorPemenang || '';
            document.getElementById('editTanggalPemenang').value = tanggalPemenang || '';
            document.getElementById('editAwalKontrak').value = awalKontrak || '';
            document.getElementById('editAkhirKontrak').value = akhirKontrak || '';
            document.getElementById('editBidangIpItu').value = bidangIpItu || '';
            document.getElementById('editPenandatanganSci').value = penandatanganSci || '';
            document.getElementById('editJabatanSci').value = jabatanSci || '';
            updateJampelPreview('edit');
            updateSpModeGuard('edit');
            document.getElementById('editDeskripsiBadge').classList.add('hidden');
            document.getElementById('editDeskripsiBadge').innerHTML = '';
            document.getElementById('editNilaiPrBadge').classList.add('hidden');
            document.getElementById('editNilaiPrBadge').innerHTML = '';

            editIdx = 5000;
            document.getElementById('editRows').innerHTML = '<div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>';
            document.getElementById('editSubtotalDisplay').style.display = 'none';
            document.getElementById('editItemCount').textContent = '0 item';

            // ── Reset UI PPBJ tanpa clear field (pakai helper khusus) ──
            _resetEditPpbjUiOnly();

            // ── Isi field SETELAH reset UI, urutan ini penting ──
            document.getElementById('editDeskripsiSp').value = deskripsi;
            document.getElementById('editNilaiPr').value = formatRupiahFromNumber(nilaiPr);

            // Set PPBJ dropdown — hanya untuk tampilan, tidak timpa field
            if (nomorPr && nomorPr !== 'null' && nomorPr.trim()) {
                // Toggle UI ke mode PPBJ (tanpa clear field)
                _switchEditPpbjUiOnly('ppbj');

                $.get(PPBJ_CHECK_URL, { ppbj_no: nomorPr }, function (d) {
                    if (d.status === 'available' || d.status === 'already_linked') {
                        const o = new Option(
                            nomorPr + (d.uraian ? ' — ' + d.uraian.substring(0, 40) : ''),
                            nomorPr, true, true
                        );
                        $('#editPpbjSelect').append(o).trigger({ type: 'change', _suppressCustom: true });
                        updateEditPrFinalValue();
                        $('#editPpbjStatus').html('<span class="text-green-600 dark:text-green-400">✅ Terhubung dengan PPBJ</span>');
                        renderSpphVendorRecommendation('edit', d.spph_vendors || [], d.spph_nomor || null);
                    } else {
                        _switchEditPpbjUiOnly('manual');
                        $('#editNomorPrManual').val(nomorPr);
                        updateEditPrFinalValue();
                        renderSpphVendorRecommendation('edit', [], null);
                    }
                }).fail(() => {
                    _switchEditPpbjUiOnly('manual');
                    $('#editNomorPrManual').val(nomorPr);
                    updateEditPrFinalValue();
                    renderSpphVendorRecommendation('edit', [], null);
                });
            } else {
                _switchEditPpbjUiOnly('ppbj');
                $('#editNomorPrFinal').val('');
                renderSpphVendorRecommendation('edit', [], null);
            }

            const $ev = $('#editVendorSp'), $ep = $('#editPicSp');
            if ($ev.find(`option[value="${vendor}"]`).length === 0) {
                $ev.append(new Option(vendor, vendor, true, true));
            }
            $ev.val(vendor).trigger('change');
            $ep.val(pic).trigger('change');
            document.getElementById('editNomorSp').dispatchEvent(new Event('input'));
            openModal('editModal');
            loadEditItems(id);
            setTimeout(() => updateOracleReadinessChecklist('edit'), 150);
        }

        // ── Helper: reset state PPBJ tanpa menyentuh field deskripsi/nilaiPr ──
        function _resetEditPpbjUiOnly() {
            $('#editPpbjSelect').val(null).trigger('change');
            $('#editNomorPrManual').val('');
            $('#editPpbjInfo').addClass('hidden');
            $('#editPpbjStatus').html('');
            $('#editNomorPrFinal').val('');
            $('#editVendorMismatchConfirmed').val('0');
            renderSpphVendorRecommendation('edit', [], null);
        }

        // ── Helper: toggle UI mode PPBJ/manual tanpa clear field ──
        function _switchEditPpbjUiOnly(mode) {
            currentEditPrMode = mode;
            if (mode === 'ppbj') {
                $('#editPpbjModeBox').removeClass('hidden');
                $('#editManualModeBox').addClass('hidden');
                $('#editBtnPpbjMode').addClass('active-mode');
                $('#editBtnManualMode').removeClass('active-mode');
            } else {
                $('#editPpbjModeBox').addClass('hidden');
                $('#editManualModeBox').removeClass('hidden');
                $('#editBtnPpbjMode').removeClass('active-mode');
                $('#editBtnManualMode').addClass('active-mode');
            }
        }

        // ═══════════════════════════════════════
        // POLLING
        // ═══════════════════════════════════════
        async function pollNow() {
            if (!IS_FIRST_PAGE || HAS_FILTER) return;
            try {
                const r = await fetch(`${POLL_URL_SP}?last_id=${lastIdSp}`, { headers: { 'Accept': 'application/json' } });
                if (!r.ok) return;
                const data = await r.json();
                if (data.rows && data.rows.length > 0) {
                    const tbody = document.getElementById('spBody');
                    const empty = document.getElementById('emptyRow');
                    if (empty) empty.remove();
                    data.rows.forEach(row => {
                        if (document.querySelector(`tr[data-id="${row.id}"]`)) return;
                        lastIdSp = Math.max(lastIdSp, row.id);
                        const tr = document.createElement('tr');
                        tr.className = 'tbl-row-hover new-row-flash';
                        tr.dataset.id = row.id;
                        tr.dataset.pic = row.pic;
                        tr.dataset.search = `${row.nomor_sp} ${row.nomor_pr} ${row.nama_vendor} ${row.deskripsi_pengadaan}`.toLowerCase();
                        tr.innerHTML = `
                                                        <td class="px-3 py-3 text-gray-400 text-xs font-mono">—</td>
                                                        <td class="px-3 py-3"><span class="badge-sp inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">${escapedHtml(row.nomor_sp)}</span></td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs">${escapedHtml(row.tanggal_sp)}</td>
                                                        <td class="px-3 py-3 text-right"><span class="nilai-badge text-emerald-700 dark:text-emerald-400 font-semibold">${escapedHtml(row.nilai_sp)}</span></td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">${escapedHtml(row.nomor_pr)}</td>
                                                        <td class="px-3 py-3 text-right"><span class="nilai-badge text-indigo-600 dark:text-indigo-400">${escapedHtml(row.nilai_pr)}</span></td>
                                                        <td class="px-3 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">${escapedHtml(row.nama_vendor)}</td>
                                                        <td class="px-3 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate">${escapedHtml(row.deskripsi_pengadaan)}</td>
                                                        <td class="px-3 py-3"><span class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">${escapedHtml(row.pic)}</span></td>
                                                        <td class="px-3 py-3 text-center"><button type="button" onclick="shareRecordToChat('sp', ${Number(row.id)})" class="px-2 py-1 rounded-lg text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-semibold" title="Bagikan SP ke Chat Tim">💬</button></td>`;
                        tbody.insertBefore(tr, tbody.firstChild);
                        Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: `📝 SP baru: ${row.nomor_sp}`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    });
                    const c = document.getElementById('totalCount');
                    if (c) c.textContent = parseInt(c.textContent) + data.rows.length;
                }
            } catch { }
        }

        // ═══════════════════════════════════════
        // VENDOR BARU INLINE
        // ═══════════════════════════════════════
        const VENDOR_STORE_URL = '{{ route('vendor.store') }}';
        const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').content;

        function cancelNewVendor() { $('#vendorSelectSp').val('').trigger('change'); document.getElementById('newVendorBoxSp').classList.add('hidden'); resetNewVendorForm(); }
        function resetNewVendorForm() { ['newVendorNama', 'newVendorAlamat', 'newVendorTelp', 'newVendorFax', 'newVendorEmail', 'newVendorNpwp', 'newVendorDirektur', 'newVendorJabatan'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; }); setVendorStatus('', ''); updateVendorProfileChecklistSp(); }
        function setVendorStatus(msg, type) { const el = document.getElementById('newVendorStatus'); if (!msg) { el.classList.add('hidden'); return; } el.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700', 'dark:bg-red-900/30', 'dark:text-red-400', 'dark:bg-green-900/30', 'dark:text-green-400'); if (type === 'error') el.classList.add('bg-red-100', 'dark:bg-red-900/30', 'text-red-700', 'dark:text-red-400'); else el.classList.add('bg-green-100', 'dark:bg-green-900/30', 'text-green-700', 'dark:text-green-400'); el.textContent = msg; }

        function updateVendorProfileChecklistSp() {
            const box = document.getElementById('newVendorChecklistSp');
            const target = box?.querySelector('[data-vendor-checklist-items]');
            if (!target) return;

            const filled = id => (document.getElementById(id)?.value || '').trim().length > 0;
            const checks = [
                ['Nama wajib', filled('newVendorNama')],
                ['Kontak', filled('newVendorTelp') || filled('newVendorEmail')],
                ['NPWP', filled('newVendorNpwp')],
                ['Penanggung jawab', filled('newVendorDirektur') && filled('newVendorJabatan')],
            ];

            target.innerHTML = checks.map(([label, ok]) =>
                `<span class="${ok ? 'text-emerald-700 dark:text-emerald-300 font-black' : 'text-slate-500 dark:text-slate-300'}">${ok ? '✓' : '○'} ${escapedHtml(label)}</span>`
            ).join('');
        }

        async function saveNewVendor() {
            const nama = document.getElementById('newVendorNama').value.trim();
            const alamat = document.getElementById('newVendorAlamat').value.trim();
            const telp = document.getElementById('newVendorTelp').value.trim();
            const fax = document.getElementById('newVendorFax').value.trim();
            const email = document.getElementById('newVendorEmail').value.trim();
            const npwp = document.getElementById('newVendorNpwp').value.trim();
            const direktur = document.getElementById('newVendorDirektur').value.trim();
            const jabatan = document.getElementById('newVendorJabatan').value.trim();
            if (!nama) { setVendorStatus('❌ Nama vendor wajib diisi!', 'error'); document.getElementById('newVendorNama').focus(); return; }
            document.getElementById('newVendorBtnText').textContent = 'Menyimpan...';
            document.getElementById('newVendorSpinner').classList.remove('hidden');
            setVendorStatus('', '');
            try {
                const fd = new FormData();
                fd.append('_token', CSRF_TOKEN);
                fd.append('nama_vendor', nama);
                if (alamat) fd.append('alamat', alamat);
                if (telp) fd.append('telepon', telp);
                if (fax) fd.append('fax', fax);
                if (email) fd.append('email', email);
                if (npwp) fd.append('npwp', npwp);
                if (direktur) fd.append('direktur', direktur);
                if (jabatan) fd.append('jabatan', jabatan);
                fd.append('is_active', '1');
                const res = await fetch(VENDOR_STORE_URL, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
                const data = await res.json();
                if (!res.ok) {
                    const msgs = data.errors ? Object.values(data.errors).flat().join(', ') : (data.message || 'Gagal menyimpan vendor.');
                    setVendorStatus('❌ ' + msgs, 'error'); return;
                }
                const newOption = new Option(data.nama_vendor, data.nama_vendor, true, true);
                $('#vendorSelectSp').find('option[value="__tambah__"]').before(newOption);
                $('#vendorSelectSp').val(data.nama_vendor).trigger('change');
                document.getElementById('newVendorBoxSp').classList.add('hidden');
                resetNewVendorForm();
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `✅ Vendor "${data.nama_vendor}" berhasil ditambahkan!`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
            } catch (err) { setVendorStatus('❌ Terjadi kesalahan koneksi.', 'error'); }
            finally { document.getElementById('newVendorBtnText').textContent = '💾 Simpan Vendor'; document.getElementById('newVendorSpinner').classList.add('hidden'); }
        }

        // ═══════════════════════════════════════
        // MANUAL INPUT CHECK (ADD)
        // ═══════════════════════════════════════
        $('#nomorPrManual').on('input', function () {
            updatePrFinalValue();
            const val = $(this).val().trim();
            const $status = $('#ppbjStatus');
            const $badge = $('#addDeskripsiBadge');
            const $input = $(this);
            if (!val) { $status.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '' }); return; }
            clearTimeout(window._prManualCheck);
            window._prManualCheck = setTimeout(() => {
                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                    if (d.status === 'available') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.</p></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'already_linked') {
                        $status.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong></div></div></div>`);
                        $input.css({ 'border-color': '#f59e0b' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'cancelled') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                    } else {
                        $status.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Manual — aman</span></div></div>`);
                        $input.css({ 'border-color': '#22c55e' });
                        $badge.addClass('hidden').html('');
                    }
                }).fail(() => { $status.html('<span class="text-gray-400 text-sm">📝 Tidak bisa memeriksa</span>'); $input.css({ 'border-color': '' }); });
            }, 500);
        });
        $('#nomorPrManual').on('blur', function () { if (!$(this).val().trim()) { $(this).css({ 'border-color': '' }); $('#ppbjStatus').html(''); } });

        // ═══════════════════════════════════════
        // MANUAL INPUT CHECK (EDIT)
        // ═══════════════════════════════════════
        $('#editNomorPrManual').on('input', function () {
            updateEditPrFinalValue();
            const val = $(this).val().trim();
            const $status = $('#editPpbjStatus');
            const $badge = $('#editDeskripsiBadge');
            const $input = $(this);
            if (!val) { $status.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '' }); return; }
            clearTimeout(window._editPrManualCheck);
            window._editPrManualCheck = setTimeout(() => {
                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                    if (d.status === 'available') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"📋 Pilih PPBJ"</strong>.</p></div></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                        $badge.addClass('hidden').html('');
                    } else if (d.status === 'already_linked') {
                        $status.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="text-amber-700 dark:text-amber-300"><strong class="text-sm">⚠️ ${d.message}</strong></div></div>`);
                        $input.css({ 'border-color': '#f59e0b' });
                    } else if (d.status === 'cancelled') {
                        $status.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="text-red-700 dark:text-red-300"><strong class="text-sm">❌ ${d.message}</strong></div></div>`);
                        $input.css({ 'border-color': '#ef4444' });
                    } else {
                        $status.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Manual — aman</span></div></div>`);
                        $input.css({ 'border-color': '#22c55e' });
                        $badge.addClass('hidden').html('');
                    }
                }).fail(() => { $status.html('<span class="text-gray-400 text-sm">📝 Tidak bisa memeriksa</span>'); $input.css({ 'border-color': '' }); });
            }, 500);
        });
        $('#editNomorPrManual').on('blur', function () { if (!$(this).val().trim()) { $(this).css({ 'border-color': '' }); $('#editPpbjStatus').html(''); } });

        // ════════════════════════════════════════════════════════════
        // ONBOARDING TUTORIAL (SP)
        // ════════════════════════════════════════════════════════════
        let obCurrentStep = 1, isFirstOpen = true, obFinished = false;
        function getCsrfToken() { const m = document.querySelector('meta[name="csrf-token"]'); return m ? m.content : ''; }

        function showOnboarding() {
            try {
                if (obFinished) return;
                const popup = document.getElementById('onboardingPopup');
                if (!popup) return;
                obCurrentStep = 1;
                updateObSteps();
                popup.style.display = 'flex';
                popup.classList.remove('closing');
                document.body.style.overflow = 'hidden';
                if (!isFirstOpen) {
                    fetch('/sp/onboarding-view?t=' + Date.now(), { method: 'POST', headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' } })
                        .then(r => r.json()).then(data => { if (data.status === 'finished') { obFinished = true; } }).catch(() => { });
                }
                isFirstOpen = false;
            } catch (e) { console.error('[OB] Error:', e); }
        }

        function closeOnboarding() {
            try {
                const popup = document.getElementById('onboardingPopup');
                if (!popup) return;
                popup.classList.add('closing');
                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.classList.remove('closing');
                    document.body.style.overflow = '';
                    if (obFinished) { hideFloatBtn(); } else { showFloatBtn(); }
                }, 400);
                fetch('/sp/onboarding-seen?t=' + Date.now(), { method: 'POST', headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' } }).catch(() => { });
            } catch (e) { console.error('[OB] Error:', e); }
        }

        function finishOnboarding() {
            try {
                const card = document.querySelector('.onboarding-card');
                if (card) {
                    const confetti = document.createElement('div');
                    confetti.className = 'ob-confetti';
                    const colors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'];
                    for (let i = 0; i < 30; i++) {
                        const p = document.createElement('div');
                        p.className = 'ob-confetti-piece';
                        p.style.left = Math.random() * 100 + '%';
                        p.style.background = colors[Math.floor(Math.random() * colors.length)];
                        p.style.animationDelay = Math.random() * 0.5 + 's';
                        p.style.animationDuration = (2 + Math.random() * 2) + 's';
                        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                        confetti.appendChild(p);
                    }
                    card.appendChild(confetti);
                }
                setTimeout(() => closeOnboarding(), 600);
            } catch (e) { closeOnboarding(); }
        }

        function nextObStep(s) { obCurrentStep = s; updateObSteps(); }
        function prevObStep(s) { obCurrentStep = s; updateObSteps(); }
        function updateObSteps() {
            document.querySelectorAll('.ob-step').forEach(el => { el.classList.remove('active'); if (parseInt(el.dataset.step) === obCurrentStep) el.classList.add('active'); });
            document.querySelectorAll('.ob-progress-dot').forEach(dot => { const n = parseInt(dot.dataset.dot); dot.classList.remove('active', 'done'); if (n < obCurrentStep) dot.classList.add('done'); if (n === obCurrentStep) dot.classList.add('active'); });
        }

        function showFloatBtn() { const b = document.getElementById('onboardingFloatBtn'); if (b && !obFinished) { b.style.display = 'flex'; b.style.visibility = 'visible'; } }
        function hideFloatBtn() { const b = document.getElementById('onboardingFloatBtn'); if (b) { b.style.display = 'none'; b.style.visibility = 'hidden'; } }

        async function checkOnboardingStatus() {
            try {
                const r = await fetch('/sp/onboarding-status?t=' + Date.now(), { headers: { 'X-CSRF-TOKEN': getCsrfToken() } });
                if (!r.ok) return;
                const data = await r.json();
                if (data.finished) { hideFloatBtn(); return; }
                if (!data.seen) { setTimeout(() => showOnboarding(), 1200); return; }
                if (data.seen && data.left > 0) { showFloatBtn(); return; }
                hideFloatBtn();
            } catch (e) { console.error('[OB] Error:', e); }
        }

        // ════════════════════════════════════════════════════════════
        // RICH TEXT EDITOR (SP)
        // ════════════════════════════════════════════════════════════
        const RT_FONTS = ['Arial', 'Times New Roman', 'Calibri', 'Courier New', 'Verdana', 'Tahoma'];
        const rtSavedSel = {};
        let sizeDebounce = {};

        function rtSaveSel(edId) {
            try {
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    const ed = document.getElementById(edId);
                    if (ed && ed.contains(sel.anchorNode))
                        rtSavedSel[edId] = sel.getRangeAt(0).cloneRange();
                }
            } catch (e) { }
        }

        function rtRestoreSel(edId) {
            try {
                const ed = document.getElementById(edId);
                if (!ed || !rtSavedSel[edId]) return false;
                const range = rtSavedSel[edId];
                if (!ed.contains(range.startContainer) || !ed.contains(range.endContainer)) {
                    delete rtSavedSel[edId];
                    return false;
                }
                ed.focus();
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return true;
            } catch (e) {
                return false;
            }
        }

        function buildRtToolbar(edId) {
            return `<div class="rt-toolbar" data-rt="${edId}">
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="bold" title="Tebal"><b>B</b></button>
                                                        <button type="button" class="rt-btn" data-cmd="italic" title="Miring"><i>I</i></button>
                                                        <button type="button" class="rt-btn" data-cmd="underline" title="Garis Bawah"><u>U</u></button>
                                                        <button type="button" class="rt-btn" data-cmd="strikeThrough" title="Coret"><s>S</s></button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="justifyLeft" title="Rata Kiri" style="font-size:10px">◁</button>
                                                        <button type="button" class="rt-btn" data-cmd="justifyCenter" title="Rata Tengah" style="font-size:10px">◧</button>
                                                        <button type="button" class="rt-btn" data-cmd="justifyRight" title="Rata Kanan" style="font-size:10px">▷</button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="insertUnorderedList" title="Bullet" style="font-size:11px">•≡</button>
                                                        <button type="button" class="rt-btn" data-cmd="insertOrderedList" title="Number" style="font-size:10px">1.</button>
                                                    </div>
                                                    <div class="rt-sep"></div>
                                                    <div class="rt-group">
                                                        <button type="button" class="rt-btn" data-cmd="undo" title="Undo" style="font-size:10px">↩</button>
                                                        <button type="button" class="rt-btn" data-cmd="redo" title="Redo" style="font-size:10px">↪</button>
                                                    </div>
                                                </div>`;
        }

        function initRt(editorId) {
            const ed = document.getElementById(editorId);
            const tb = document.querySelector(`[data-rt="${editorId}"]`);
            if (!ed || !tb) return;

            ed.addEventListener('mouseup', () => rtSaveSel(editorId));
            ed.addEventListener('keyup', () => rtSaveSel(editorId));

            tb.querySelectorAll('[data-cmd]').forEach(btn => {
                btn.addEventListener('mousedown', e => {
                    e.preventDefault();
                    try { document.execCommand(btn.dataset.cmd, false, null); } catch (e2) { }
                    syncHidden(editorId);
                    rtSaveSel(editorId);
                });
            });

            ['keyup', 'mouseup', 'click', 'input'].forEach(ev => {
                ed.addEventListener(ev, () => syncHidden(editorId));
            });

            ed.addEventListener('paste', e => {
                e.preventDefault();
                const html = (e.clipboardData || window.clipboardData).getData('text/html');
                if (html) {
                    document.execCommand('insertHTML', false, html.replace(/<\/?(meta|link|style|script)[^>]*>/gi, ''));
                } else {
                    document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
                }
                syncHidden(editorId);
            });
        }

        function syncHidden(editorId) {
            const ed = document.getElementById(editorId);
            const hd = document.getElementById('hid-' + editorId);
            if (ed && hd) hd.value = ed.innerHTML;
        }

        function syncAll(formEl) {
            formEl.querySelectorAll('.rt-editor').forEach(ed => syncHidden(ed.id));
        }

        function setRt(editorId, html) {
            const ed = document.getElementById(editorId);
            if (ed) {
                ed.innerHTML = html || '';
                syncHidden(editorId);
            }
        }

        // ════════════════════════════════════════════════════════════
        // ITEMS MANAGEMENT (SP)
        // ════════════════════════════════════════════════════════════
        let addIdx = 0, editIdx = 5000;

        function buildSatOpts(s) {
            const options = (typeof SATUANS !== 'undefined' ? SATUANS : []).map(v =>
                `<option value="${escapedHtml(v)}"${v === s ? ' selected' : ''}>${escapedHtml(v)}</option>`
            ).join('');
            return `${options}<option value="${ADD_SATUAN_VALUE}">+ Tambah satuan baru...</option>`;
        }

        function normalizeSatuanName(value) {
            return String(value || '').trim().replace(/\s+/g, ' ');
        }

        function refreshSatuanSelects(targetSelect = null, selectedValue = '') {
            document.querySelectorAll('select[name$="[satuan]"]').forEach(select => {
                const keep = select === targetSelect ? selectedValue : select.value;
                select.innerHTML = `<option value="">-- Pilih --</option>${buildSatOpts(keep)}`;
                if (keep && keep !== ADD_SATUAN_VALUE) select.value = keep;
            });
        }

        async function quickAddSatuan(selectEl) {
            const previousValue = selectEl.dataset.previousValue || '';
            const result = await Swal.fire({
                title: 'Tambah satuan baru',
                html: '<div class="text-sm text-slate-600 dark:text-slate-300">Masukkan satuan baru tanpa membuka menu master. Praktis, sat-set, audit tetap rapi.</div>',
                input: 'text',
                inputPlaceholder: 'Contoh: Roll',
                showCancelButton: true,
                confirmButtonText: 'Simpan Satuan',
                cancelButtonText: 'Batal',
                customClass: { popup: 'rounded-2xl' },
                inputValidator: value => {
                    const name = normalizeSatuanName(value);
                    if (!name) return 'Nama satuan wajib diisi.';
                    if (name.length > 100) return 'Nama satuan maksimal 100 karakter.';
                    if (SATUANS.some(v => normalizeSatuanName(v).toLowerCase() === name.toLowerCase())) return 'Satuan ini sudah ada.';
                    return null;
                }
            });

            if (!result.isConfirmed) {
                selectEl.value = previousValue;
                return;
            }

            const satuanName = normalizeSatuanName(result.value);

            try {
                const response = await fetch(SATUAN_STORE_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                    },
                    body: new URLSearchParams({ nama_satuan: satuanName })
                });

                if (!response.ok) {
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error?.message || error?.errors?.nama_satuan?.[0] || 'Satuan gagal disimpan.');
                }

                if (!SATUANS.some(v => normalizeSatuanName(v).toLowerCase() === satuanName.toLowerCase())) {
                    SATUANS.push(satuanName);
                    SATUANS.sort((a, b) => String(a).localeCompare(String(b), 'id', { sensitivity: 'base' }));
                }

                refreshSatuanSelects(selectEl, satuanName);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Satuan "${satuanName}" ditambahkan`, showConfirmButton: false, timer: 2200 });
            } catch (error) {
                selectEl.value = previousValue;
                Swal.fire('Gagal menambah satuan', error.message || 'Silakan coba lagi.', 'error');
            }
        }

        function formatRupiahInput(v) {
            let n = String(v).replace(/\D/g, '');
            if (n === '') return '';
            n = n.replace(/^0+/, '') || '0';
            return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        function calculateRowSubtotal(mode, idx) {
            const prefix = mode === 'add' ? 'add' : 'edit';
            const jumlahInput = document.getElementById(`${prefix}-${idx}-jumlah`);
            const hargaInput = document.getElementById(`${prefix}-${idx}-harga`);
            const subtotalEl = document.getElementById(`${prefix}-${idx}-subtotal`);

            if (!jumlahInput || !hargaInput || !subtotalEl) return;

            const jumlah = parseFloat(jumlahInput.value.replace(/\./g, '')) || 0;
            const harga = parseFloat(hargaInput.value.replace(/\./g, '')) || 0;
            const subtotal = jumlah * harga;

            subtotalEl.textContent = subtotal > 0 ? 'Rp ' + formatRupiahInput(subtotal.toString()) : '-';
            subtotalEl.classList.remove('updated');
            void subtotalEl.offsetWidth;
            subtotalEl.classList.add('updated');

            updateGrandTotal(mode);
        }

        function updateGrandTotal(mode) {
            const prefix = mode === 'add' ? 'add' : 'edit';
            const wrapper = document.getElementById(`${prefix}Rows`);
            const displayEl = document.getElementById(`${prefix}SubtotalDisplay`);
            const valueEl = document.getElementById(`${prefix}SubtotalValue`);
            const countEl = document.getElementById(`${prefix}ItemCount`);

            if (!wrapper || !displayEl || !valueEl) return;

            let grandTotal = 0;
            let itemCount = 0;

            wrapper.querySelectorAll('.item-row').forEach(row => {
                const subtotalText = row.querySelector('.subtotal-value');
                if (subtotalText) {
                    const val = subtotalText.textContent.replace(/[^\d]/g, '');
                    grandTotal += parseFloat(val) || 0;
                }
                itemCount++;
            });

            if (itemCount > 0) {
                displayEl.style.display = 'flex';
                valueEl.textContent = 'Rp ' + formatRupiahInput(grandTotal.toString());
                // ── FIX BUG 8: Animasikan container (.subtotal-display), bukan hanya value ──
                displayEl.classList.remove('updated');
                void displayEl.offsetWidth;
                displayEl.classList.add('updated');
            } else {
                displayEl.style.display = 'none';
            }

            if (countEl) countEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
            updateSpModeGuard(mode);
        }

        function addRow(mode, item = null) {
            const wrapper = document.getElementById(mode === 'add' ? 'addRows' : 'editRows');
            const idx = mode === 'add' ? addIdx++ : editIdx++;
            const prefix = mode === 'add' ? 'add' : 'edit';
            const rowNum = wrapper.querySelectorAll('.item-row').length + 1;
            const edId = `rt-${prefix}-${idx}`;

            const jumlah = item?.jumlah || '';
            // ── FIX BUG 5: Format harga dari database ──
            const harga = item?.harga_satuan
                ? formatRupiahInput(String(Math.round(parseFloat(String(item.harga_satuan).replace(/\./g, '').replace(',', '.')))))
                : '';
            const subtotal = item?.subtotal
                ? parseFloat(String(item.subtotal).replace(/\./g, '').replace(',', '.'))
                : 0;

            const rowHtml = `
                                            <div class="item-row" data-idx="${idx}" data-mode="${mode}">
                                                <span class="row-badge">${rowNum}</span>
                                                <button type="button" class="btn-rm" onclick="removeRowSp(this)" title="Hapus baris">×</button>

                                                <div class="mt-1">
                                                    <span class="item-label">Nama Barang / Jasa</span>
                                                    ${buildRtToolbar(edId)}
                                                    <div class="rt-editor" contenteditable="true" id="${edId}"
                                                         data-ph="Ketik nama barang / jasa..."
                                                         onfocus="rtSaveSel('${edId}')"
                                                         oninput="updateOracleReadinessChecklist('${mode}')"></div>
                                                    <input type="hidden" name="items[${idx}][nama_barang]" id="hid-${edId}">
                                                </div>

                                                <div class="item-grid-sp mt-2">
                                                    <div>
                                                        <span class="item-label">Satuan</span>
                                                        <select name="items[${idx}][satuan]" class="m-select">
                                                            <option value="">— Pilih —</option>
                                                            ${buildSatOpts(item?.satuan || '')}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Qty</span>
                                                        <input type="text" name="items[${idx}][jumlah]" id="${prefix}-${idx}-jumlah"
                                                               value="${jumlah}" placeholder="1"
                                                               class="m-input" style="text-align:center"
                                                               oninput="calculateRowSubtotal('${mode}', ${idx})">
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Harga Satuan</span>
                                                        <input type="text" name="items[${idx}][harga_satuan]" id="${prefix}-${idx}-harga"
                                                               value="${harga}" placeholder="0"
                                                               class="m-input harga-input"
                                                               oninput="this.value=formatRupiahInput(this.value);calculateRowSubtotal('${mode}', ${idx})">
                                                    </div>
                                                    <div>
                                                        <span class="item-label">Subtotal</span>
                                                        <div id="${prefix}-${idx}-subtotal" class="subtotal-value"
                                                             style="font-size:.78rem; padding:5px 7px; background:#f0fdf4; border-radius:6px; border:1px solid #bbf7d0;">
                                                            ${subtotal > 0 ? 'Rp ' + formatRupiahInput(subtotal.toString()) : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;

            wrapper.insertAdjacentHTML('beforeend', rowHtml);
            initRt(edId);

            if (item?.nama_barang) {
                setRt(edId, item.nama_barang);
            }

            updateGrandTotal(mode);

            const newRow = wrapper.lastElementChild;
            if (newRow) {
                newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function removeRowSp(btn) {
            const row = btn.closest('.item-row');
            const wrapper = row.closest('#addRows, #editRows');
            const mode = row.dataset.mode || 'add';

            if (wrapper.querySelectorAll('.item-row').length <= 1) {
                Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Minimal 1 baris!', showConfirmButton: false, timer: 2000 });
                return;
            }

            const editor = row.querySelector('.rt-editor');
            if (editor) {
                const edId = editor.id;
                delete rtSavedSel[edId];
                if (sizeDebounce[edId]) { clearTimeout(sizeDebounce[edId]); delete sizeDebounce[edId]; }
            }

            row.classList.add('removing');
            setTimeout(() => { row.remove(); renumber(wrapper); updateGrandTotal(mode); }, 350);
        }

        function renumber(w) {
            w.querySelectorAll('.item-row .row-badge').forEach((b, i) => {
                b.textContent = i + 1;
                b.style.transform = 'scale(1.2)';
                setTimeout(() => { b.style.transform = 'scale(1)'; }, 150);
                b.style.transition = 'transform .15s';
            });
        }

        // ── FIX BUG 9: Tambahkan parameter err pada catch ──
        async function loadEditItems(spId) {
            try {
                const r = await fetch(`/sp/${spId}/items`, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
                });
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                document.getElementById('editRows').innerHTML = '';
                (data.length ? data : [null]).forEach(item => addRow('edit', item));
            } catch (err) {
                console.error('[SP] loadEditItems error:', err);
                document.getElementById('editRows').innerHTML = '<p class="text-red-500 text-xs p-2">Gagal memuat data barang.</p>';
            }
        }

        // ═══════════════════════════════════════
        // INIT
        // ═══════════════════════════════════════
        $(document).ready(function () {
            const cfg = ph => ({ placeholder: ph, allowClear: true, width: '100%' });
            $('#vendorSelectSp option[value="__tambah__"]').remove();
            $('.vendor-select-sp').select2(cfg('-- Pilih Vendor --'));
            $('.pic-select-sp').select2(cfg('-- Pilih PIC --'));
            $('.edit-vendor-sp').select2(cfg('-- Pilih Vendor --'));
            $('.edit-pic-sp').select2(cfg('-- Pilih PIC --'));

            // Init PPBJ Select2
            initPpbjSelect2('.sp-ppbj-select', 'ppbjInfo', 'ppbjStatus', 'ppbjInfoContent', () => updatePrFinalValue(), 'addDeskripsi', 'addDeskripsiBadge');
            initPpbjSelect2('.edit-sp-ppbj-select', 'editPpbjInfo', 'editPpbjStatus', 'editPpbjInfoContent', () => updateEditPrFinalValue(), 'editDeskripsiSp', 'editDeskripsiBadge');

            // Init rupiah
            initRupiahInput('nilaiSpInput');
            initRupiahInput('nilaiPrInput');
            initRupiahInput('editNilaiSp');
            initRupiahInput('editNilaiPr');

            $('#nilaiSpInput').on('input paste', () => setTimeout(() => { updateJampelPreview('add'); updateSpModeGuard('add'); }, 0));
            $('#editNilaiSp').on('input paste', () => setTimeout(() => { updateJampelPreview('edit'); updateSpModeGuard('edit'); }, 0));
            $('#addFormSp').on('input change', 'input, select, textarea', () => setTimeout(() => updateOracleReadinessChecklist('add'), 0));
            $('#editFormSp').on('input change', 'input, select, textarea', () => setTimeout(() => updateOracleReadinessChecklist('edit'), 0));
            $(document).on('focus', 'select[name$="[satuan]"]', function () {
                this.dataset.previousValue = this.value || '';
            });
            $(document).on('change', 'select[name$="[satuan]"]', function () {
                if (this.value === ADD_SATUAN_VALUE) {
                    quickAddSatuan(this);
                } else {
                    this.dataset.previousValue = this.value || '';
                }
            });
            $('#toggleNewVendorSp').on('click', function () {
                const box = document.getElementById('newVendorBoxSp');
                if (!box) return;
                box.classList.toggle('hidden');
                if (!box.classList.contains('hidden')) {
                    updateVendorProfileChecklistSp();
                    setTimeout(() => document.getElementById('newVendorNama')?.focus(), 50);
                }
            });
            $('#newVendorBoxSp').on('input', 'input, textarea', updateVendorProfileChecklistSp);
            $('#vendorSelectSp, .pic-select-sp, #editVendorSp, #editPicSp, #ppbjSelect, #editPpbjSelect')
                .on('change select2:select select2:clear', () => {
                    setTimeout(() => {
                        updateOracleReadinessChecklist('add');
                        updateOracleReadinessChecklist('edit');
                    }, 0);
                });

            // Tombol Tambah
            document.querySelector('button[onclick="openModal(\'addModal\')"]').addEventListener('click', () => {
                loadSuggestionsSp();
                document.getElementById('nomorSpInput').value = '';
                document.getElementById('nilaiSpInput').value = '';
                document.getElementById('nilaiPrInput').value = '';
                document.getElementById('addSph').value = '';
                document.getElementById('addTglSph').value = '';
                document.getElementById('addPromisedDate').value = '';
                document.getElementById('addRfq').value = '';
                document.getElementById('addNomorPemenang').value = '';
                document.getElementById('addTanggalPemenang').value = '';
                document.getElementById('addAwalKontrak').value = '';
                document.getElementById('addAkhirKontrak').value = '';
                document.getElementById('addBidangIpItu').value = '';
                document.getElementById('addPenandatanganSci').value = '';
                document.getElementById('addJabatanSci').value = '';
                updateJampelPreview('add');
                addIdx = 0;
                document.getElementById('addRows').innerHTML = '';
                document.getElementById('addSubtotalDisplay').style.display = 'none';
                document.getElementById('addItemCount').textContent = '0 item';
                $('#addModeGuardSp').addClass('hidden').html('');
                addRow('add');
                for (let k in rtSavedSel) { if (k.startsWith('rt-add-')) delete rtSavedSel[k]; }
                for (let k in sizeDebounce) { if (k.startsWith('rt-add-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }
                setStatus(document.getElementById('nomorSpInput'), document.getElementById('nomorStatusSp'), null, '');
                $('#addDeskripsi').val('');
                $('#addDeskripsiBadge').addClass('hidden').html('');
                $('#addNilaiPrBadge').addClass('hidden').html('');
                setPrMode('ppbj');
                $('#ppbjSelect').val(null).trigger('change');
                $('#nomorPrManual').val('');
                $('#ppbjInfo').addClass('hidden');
                $('#ppbjStatus').html('');
                $('#nomorPrFinal').val('');
                $('#addVendorMismatchConfirmed').val('0');
                document.getElementById('newVendorBoxSp')?.classList.add('hidden');
                resetNewVendorForm();
                renderSpphVendorRecommendation('add', [], null);
                restoreSpModeDraftToAdd();
                updateOracleReadinessChecklist('add');
            });

            // Vendor toggle
            $('#vendorSelectSp').on('change', function () {
                if ($(this).val() === '__tambah__') { document.getElementById('newVendorBoxSp').classList.remove('hidden'); document.getElementById('newVendorNama').focus(); }
                else { document.getElementById('newVendorBoxSp').classList.add('hidden'); resetNewVendorForm(); }
                updateSpphVendorRecommendation('add');
            });
            $('#editVendorSp').on('change', function () {
                updateSpphVendorRecommendation('edit');
            });
            $(document).on('click', '[data-spph-vendor]', function () {
                selectRecommendedSpphVendor($(this).data('spph-prefix'), $(this).data('spph-vendor'));
            });

            // Nomor check
            attachNomorCheck('nomorSpInput', 'nomorStatusSp', () => 0, 'tanggalSpInput');
            attachNomorCheck('editNomorSp', 'editNomorStatusSp', () => document.getElementById('editIdSp').value || 0, 'editTanggalSp');
            document.getElementById('tanggalSpInput')?.addEventListener('change', loadSuggestionsSp);

            // ── FIX BUG 4 & Guard submit TAMBAH ──
            document.getElementById('addFormSp').addEventListener('submit', function (e) {
                const $nomorStatus = $('#nomorStatusSp');
                if ($nomorStatus.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor Duplikat!', text: 'Nomor SP sudah digunakan.', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                updatePrFinalValue();
                if (confirmVendorMismatchBeforeSubmit('add', this, e)) {
                    return;
                }
                if (!updateSpModeGuard('add')) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Mode penomoran tidak sesuai',
                        text: ORACLE_MODE_SP ? 'Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.' : 'Nilai SP di atas Rp50.000.000 harus dibuat melalui mode Oracle ERP.',
                        icon: 'warning',
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                    });
                    return;
                }
                document.getElementById('nilaiSpInput').value = stripRupiah(document.getElementById('nilaiSpInput').value);
                document.getElementById('nilaiPrInput').value = stripRupiah(document.getElementById('nilaiPrInput').value);

                // ── FIX BUG 4: Strip titik dari semua harga_satuan item sebelum submit ──
                this.querySelectorAll('input[name*="[harga_satuan]"]').forEach(inp => {
                    inp.value = stripRupiah(inp.value);
                });

                syncAll(this);

                const $ppbjStatusEl = $('#ppbjStatus');
                if (currentPrMode === 'manual') {
                    const mv = $('#nomorPrManual').val().trim();
                    if (mv && ($ppbjStatusEl.html().includes('ada di database PPBJ') || $ppbjStatusEl.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.`, icon: 'warning', confirmButtonColor: '#0ea5e9', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if ($ppbjStatusEl.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                }
            });

            // ── FIX BUG 3 & 4 & Guard submit EDIT ──
            document.getElementById('editFormSp').addEventListener('submit', function (e) {
                // ── FIX BUG 3: Cek nomor SP duplikat di form edit ──
                if ($('#editNomorStatusSp').html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor Duplikat!', text: 'Nomor SP sudah digunakan.', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }

                updateEditPrFinalValue();
                if (confirmVendorMismatchBeforeSubmit('edit', this, e)) {
                    return;
                }
                if (!updateSpModeGuard('edit')) {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Mode penomoran tidak sesuai',
                        text: ORACLE_MODE_SP ? 'Nilai SP harus di atas Rp50.000.000 karena Anda berada di mode Oracle ERP.' : 'Nilai SP di atas Rp50.000.000 harus dibuat melalui mode Oracle ERP.',
                        icon: 'warning',
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                    });
                    return;
                }
                document.getElementById('editNilaiSp').value = stripRupiah(document.getElementById('editNilaiSp').value);
                document.getElementById('editNilaiPr').value = stripRupiah(document.getElementById('editNilaiPr').value);

                // ── FIX BUG 4: Strip titik dari semua harga_satuan item sebelum submit ──
                this.querySelectorAll('input[name*="[harga_satuan]"]').forEach(inp => {
                    inp.value = stripRupiah(inp.value);
                });

                syncAll(this);

                const $editPpbjStatusEl = $('#editPpbjStatus');
                if (currentEditPrMode === 'manual') {
                    const mv = $('#editNomorPrManual').val().trim();
                    if (mv && ($editPpbjStatusEl.html().includes('ada di database PPBJ') || $editPpbjStatusEl.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Gunakan mode <strong>"📋 Pilih PPBJ"</strong> agar otomatis terhubung.`, icon: 'warning', confirmButtonColor: '#0ea5e9', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if ($editPpbjStatusEl.html().includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                }
            });

            // Search
            document.getElementById('searchInput').addEventListener('input', function () {
                document.getElementById('searchSpinner').classList.remove('hidden');
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => { document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }, 500);
            });
            document.getElementById('searchInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(searchTimer); document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); } });
            document.getElementById('filterPic').addEventListener('change', doSearch);
            document.getElementById('dariInput').addEventListener('change', doSearch);
            document.getElementById('sampaiInput').addEventListener('change', doSearch);

            // Polling
            if (IS_FIRST_PAGE && !HAS_FILTER && !document.hidden) { pollNow(); pollTimer = setInterval(pollNow, 30000); }

            // Presence
            if (!document.hidden) { pollPresence(); presenceTimer = setInterval(pollPresence, 30000); }
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) { clearInterval(pollTimer); clearInterval(presenceTimer); }
                else {
                    if (IS_FIRST_PAGE && !HAS_FILTER) { pollNow(); pollTimer = setInterval(pollNow, 30000); }
                    pollPresence(); presenceTimer = setInterval(pollPresence, 30000);
                }
            });
            window.addEventListener('beforeunload', () => {
                if (modalOpen) { const fd = new FormData(); fd.append('_token', document.querySelector('meta[name="csrf-token"]').content); navigator.sendBeacon(PRESENCE_STOP, fd); }
            });
            checkOnboardingStatus();
        });
    </script>
@endpush

@include('components.archive-upload-popup')
