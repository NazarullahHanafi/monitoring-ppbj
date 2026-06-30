@extends('layouts.app')

@section('title', 'Penomoran SPPH')

@push('styles')
    <style>
        /* ── Sticky Add Button di dalam modal ── */
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

        .sticky-add-wrap .btn-add-row {
            pointer-events: auto;
            padding: 8px 14px;
            font-size: .75rem;
            box-shadow: 0 4px 12px rgba(99, 102, 241, .35);
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

        .onboarding-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            animation: obFadeIn 0.5s ease forwards;
        }

        @keyframes obFadeIn {
            to {
                opacity: 1;
            }
        }

        @keyframes obFadeOut {
            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        .onboarding-overlay.closing {
            animation: obFadeOut 0.4s ease forwards;
        }

        .onboarding-card {
            background: white;
            border-radius: 24px;
            width: 100%;
            max-width: 560px;
            overflow: hidden;
            box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            animation: obSlideUp 0.5s ease 0.1s forwards;
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

        /* ── Header ── */
        .ob-header {
            position: relative;
            padding: 40px 32px 24px;
            text-align: center;
            overflow: hidden;
        }

        .ob-header::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a855f7 100%);
            z-index: 0;
        }

        .ob-header::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -30%;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
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
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 11px;
            font-weight: 700;
            padding: 5px 14px;
            border-radius: 99px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
        }

        .ob-icon-wrap {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
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
            font-size: 22px;
            font-weight: 800;
            color: white;
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .ob-subtitle {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
            font-weight: 400;
        }

        /* ── Progress Bar ── */
        .ob-progress {
            display: flex;
            gap: 6px;
            padding: 16px 32px 0;
        }

        .ob-progress-dot {
            flex: 1;
            height: 4px;
            border-radius: 99px;
            background: #e5e7eb;
            transition: all 0.4s ease;
        }

        .dark .ob-progress-dot {
            background: #374151;
        }

        .ob-progress-dot.active {
            background: linear-gradient(90deg, #6366f1, #a855f7);
        }

        .ob-progress-dot.done {
            background: #22c55e;
        }

        /* ── Body / Content ── */
        .ob-body {
            padding: 28px 32px 24px;
        }

        .ob-step-label {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            font-weight: 700;
            color: #6366f1;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
        }

        .dark .ob-step-label {
            color: #a5b4fc;
        }

        .ob-step-label .ob-step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background: #6366f1;
            color: white;
            border-radius: 6px;
            font-size: 10px;
        }

        .dark .ob-step-label .ob-step-num {
            background: #4338ca;
        }

        .ob-desc {
            font-size: 14px;
            color: #374151;
            line-height: 1.7;
            margin-bottom: 20px;
        }

        .dark .ob-desc {
            color: #d1d5db;
        }

        .ob-desc strong {
            color: #4338ca;
            font-weight: 700;
        }

        .dark .ob-desc strong {
            color: #a5b4fc;
        }

        /* ── Demo Box ── */
        .ob-demo {
            background: #f8fafc;
            border: 1.5px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 20px;
        }

        .dark .ob-demo {
            background: #111827;
            border-color: #1f2937;
        }

        .ob-demo-title {
            font-size: 10px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 10px 16px 0;
        }

        .ob-demo-content {
            padding: 12px 16px 16px;
        }

        /* Demo Elements */
        .ob-demo-select {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
            position: relative;
            transition: all 0.3s ease;
        }

        .dark .ob-demo-select {
            background: #1f2937;
            border-color: #374151;
        }

        .ob-demo-select.highlight {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .ob-demo-select .ob-mono {
            font-family: 'Courier New', monospace;
            font-weight: 700;
            font-size: 13px;
            color: #111827;
        }

        .dark .ob-demo-select .ob-mono {
            color: #f3f4f6;
        }

        .ob-demo-select .ob-sub {
            font-size: 11px;
            color: #94a3b8;
        }

        .ob-demo-arrow {
            text-align: center;
            color: #22c55e;
            font-size: 18px;
            padding: 2px 0;
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
            padding: 10px 14px;
            font-size: 12px;
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
            top: -10px;
            right: 10px;
            background: #22c55e;
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 99px;
            animation: obPulse 2s ease infinite;
        }

        @keyframes obPulse {

            0%,
            100% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            }

            50% {
                box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
            }
        }

        .ob-demo-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .ob-demo-field {
            background: white;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 12px;
        }

        .dark .ob-demo-field {
            background: #1f2937;
            border-color: #374151;
        }

        .ob-demo-field-label {
            font-size: 9px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .ob-demo-field-value {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: 700;
            color: #22c55e;
        }

        .ob-demo-link-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 0;
            color: #6366f1;
            font-size: 20px;
        }

        /* ── Footer ── */
        .ob-footer {
            padding: 0 32px 28px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            /* ✅ Rata kanan */
            gap: 10px;
            /* ✅ Gap diperkecil */
        }

        .ob-btn-skip {
            padding: 10px 16px;
            /* ✅ Padding lebih kecil */
            border-radius: 12px;
            border: 1.5px solid #e5e7eb;
            background: white;
            color: #6b7280;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            /* ✅ Inline flex, bukan memenuhi lebar */
            align-items: center;
            gap: 6px;
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
            padding: 10px 20px;
            /* ✅ Padding lebih kecil */
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            /* ✅ Inline flex */
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        }

        .ob-btn-next:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        .ob-btn-next:active {
            transform: translateY(0);
        }

        .ob-btn-next svg {
            width: 16px;
            height: 16px;
        }

        /* ── Floating Info Button ── */
        .ob-float-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9998;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
            transition: all 0.3s ease;
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
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
        }

        .ob-float-btn svg {
            width: 24px;
            height: 24px;
        }

        .ob-float-tooltip {
            position: absolute;
            right: 62px;
            top: 50%;
            transform: translateY(-50%);
            background: #1f2937;
            color: white;
            font-size: 12px;
            font-weight: 600;
            padding: 8px 14px;
            border-radius: 10px;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            opacity: 0;
            pointer-events: none;
            transition: all 0.2s;
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

        /* ── Step Transition ── */
        .ob-step {
            display: none;
        }

        .ob-step.active {
            display: block;
            animation: obStepIn 0.4s ease;
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

        /* ── Confetti (final step) ── */
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

        /* ── Features List ── */
        .ob-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 16px;
        }

        .ob-feature {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 12px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
        }

        .dark .ob-feature {
            background: #052e16;
            border-color: #166534;
        }

        .ob-feature-icon {
            font-size: 18px;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .ob-feature-text {
            font-size: 11px;
            color: #166534;
            font-weight: 600;
            line-height: 1.4;
        }

        .dark .ob-feature-text {
            color: #86efac;
        }

        /* ── Auto-Fill Deskripsi Indicator ── */
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

        /* ── PR Mode Toggle ── */
        .pr-mode-btn,
        .edit-pr-mode-btn {
            background: #f9fafb;
            border-color: #e5e7eb;
            color: #6b7280;
        }

        .dark .pr-mode-btn,
        .dark .edit-pr-mode-btn {
            background: #374151;
            border-color: #4b5563;
            color: #9ca3af;
        }

        .pr-mode-btn:hover,
        .edit-pr-mode-btn:hover {
            background: #f3f4f6;
            color: #374151;
        }

        .dark .pr-mode-btn:hover,
        .dark .edit-pr-mode-btn:hover {
            background: #4b5563;
            color: #f3f4f6;
        }

        .pr-mode-btn.active-mode,
        .edit-pr-mode-btn.active-mode {
            background: #6366f1 !important;
            border-color: #6366f1 !important;
            color: white !important;
            box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
        }

        /* ── PPBJ Select Styling (ADD) ── */
        .ppbj-select+.select2-container--default .select2-selection--single {
            border-color: #e5e7eb !important;
            background-color: #fff !important;
            /* ← Putih polos */
        }

        .dark .ppbj-select+.select2-container--default .select2-selection--single {
            background-color: #111827 !important;
            border-color: #374151 !important;
        }

        .ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #111827 !important;
            /* ← Warna teks hitam, bukan biru */
            font-family: 'Courier New', monospace;
            font-weight: 600;
        }

        .dark .ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important;
        }

        /* ── PPBJ Select Styling (EDIT) ── */
        .edit-ppbj-select+.select2-container--default .select2-selection--single {
            border-color: #f59e0b !important;
            background-color: #fffbeb !important;
        }

        .dark .edit-ppbj-select+.select2-container--default .select2-selection--single {
            background-color: #451a03 !important;
            border-color: #b45309 !important;
        }

        .edit-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #b45309 !important;
            font-family: 'Courier New', monospace;
            font-weight: 600;
        }

        .dark .edit-ppbj-select+.select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #fcd34d !important;
        }

        /* ── Select2 dropdown result ── */
        .select2-results__option strong {
            font-family: 'Courier New', monospace;
            color: #4338ca;
        }

        .dark .select2-results__option strong {
            color: #f3f4f6 !important;
            /* ← Teks putih untuk nomor PPBJ */
        }

        .spph-header-gradient {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)
        }

        .badge-nomor {
            font-family: 'Courier New', monospace;
            font-size: .78rem;
            font-weight: 700;
            letter-spacing: .3px;
            cursor: pointer;
            transition: opacity .15s
        }

        .badge-nomor:hover {
            opacity: .7
        }

        .tbl-row-hover:hover {
            background: rgba(99, 102, 241, .04);
            transition: background .15s
        }

        .new-row-flash {
            animation: rowFlash 1.5s ease-out
        }

        @keyframes rowFlash {
            0% {
                background: rgba(99, 102, 241, .25)
            }

            100% {
                background: transparent
            }
        }

        .modal-overlay {
            backdrop-filter: blur(6px);
            background: rgba(0, 0, 0, .5)
        }

        .modal-box {
            background: white;
            border-radius: 16px;
            box-shadow: 0 25px 60px -12px rgba(0, 0, 0, .25);
            width: 100%;
            max-width: 520px;
            max-height: 82vh;
            overflow-y: auto;
            position: relative
        }

        .dark .modal-box {
            background: #1f2937
        }

        .modal-box::-webkit-scrollbar {
            width: 4px
        }

        .modal-box::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, .3);
            border-radius: 2px
        }

        .modal-head {
            padding: 14px 18px;
            border-radius: 16px 16px 0 0;
            position: sticky;
            top: 0;
            z-index: 10
        }

        .modal-head h2 {
            font-size: .95rem;
            font-weight: 700;
            color: white
        }

        .modal-body {
            padding: 16px 18px 18px
        }

        .modal-body .form-group {
            margin-bottom: 12px
        }

        .modal-body .form-group:last-child {
            margin-bottom: 0
        }

        .modal-body label {
            display: block;
            font-size: .75rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px
        }

        .dark .modal-body label {
            color: #d1d5db
        }

        .modal-body .m-input,
        .modal-body .m-select,
        .modal-body .m-textarea {
            width: 100%;
            padding: 7px 10px;
            border-radius: 8px;
            border: 1.5px solid #e5e7eb;
            background: #fff;
            color: #111827;
            font-size: .8rem;
            outline: none;
            transition: border-color .15s
        }

        .dark .modal-body .m-input,
        .dark .modal-body .m-select,
        .dark .modal-body .m-textarea {
            background: #374151;
            border-color: #4b5563;
            color: #f3f4f6
        }

        .dark .modal-body .m-input::placeholder,
        .dark .modal-body .m-select::placeholder,
        .dark .modal-body .m-textarea::placeholder {
            color: #9ca3af;
            opacity: 0.8;
        }

        .modal-body .m-input:focus,
        .modal-body .m-select:focus,
        .modal-body .m-textarea:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, .12)
        }

        .modal-body .m-input.mono {
            font-family: 'Courier New', monospace
        }

        .modal-body .m-textarea {
            resize: none
        }

        .modal-body .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px
        }

        .modal-body .btn-row {
            display: flex;
            gap: 8px;
            padding-top: 10px
        }

        .modal-body .btn-row button {
            flex: 1;
            padding: 8px 12px;
            border-radius: 10px;
            font-size: .8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all .15s;
            border: none
        }

        .modal-body .btn-cancel {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #e5e7eb !important
        }

        .dark .modal-body .btn-cancel {
            background: #374151;
            color: #d1d5db;
            border-color: #4b5563 !important
        }

        .modal-body .btn-cancel:hover {
            background: #e5e7eb
        }

        .dark .modal-body .btn-cancel:hover {
            background: #4b5563
        }

        .modal-body .btn-save {
            color: white;
            box-shadow: 0 2px 8px rgba(99, 102, 241, .3)
        }

        .modal-body .btn-save:hover {
            opacity: .9;
            transform: translateY(-1px)
        }

        .modal-body .btn-save:active {
            transform: translateY(0)
        }

        .live-dot {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            animation: livePulse 1.5s infinite;
            display: inline-block;
            margin-right: 5px;
            flex-shrink: 0
        }

        @keyframes livePulse {

            0%,
            100% {
                opacity: 1;
                transform: scale(1)
            }

            50% {
                opacity: .4;
                transform: scale(1.4)
            }
        }

        .nomor-input-ok {
            border-color: #22c55e !important
        }

        .nomor-input-error {
            border-color: #ef4444 !important
        }

        .nomor-input-warn {
            border-color: #f59e0b !important
        }

        .nomor-status-ok {
            color: #16a34a
        }

        .nomor-status-error {
            color: #dc2626
        }

        .nomor-status-warn {
            color: #d97706
        }

        .suggest-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 99px;
            font-size: .68rem;
            font-family: 'Courier New', monospace;
            font-weight: 700;
            cursor: pointer;
            border: 1.5px dashed #8b5cf6;
            color: #7c3aed;
            background: #f5f3ff;
            transition: all .2s
        }

        .dark .suggest-pill {
            color: #c4b5fd;
            background: #2e1065;
            border-color: #7c3aed
        }

        .suggest-pill:hover {
            background: #ede9fe;
            transform: translateY(-1px)
        }

        .dark .suggest-pill:hover {
            background: #3b1fa3
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
            white-space: nowrap
        }

        .dark .quick-pill {
            border-color: #4b5563;
            color: #9ca3af;
            background: #374151
        }

        .quick-pill:hover {
            background: #f3f4f6;
            color: #374151;
            border-color: #d1d5db
        }

        .dark .quick-pill:hover {
            background: #4b5533;
            color: #f3f4f6;
            border-color: #6b7280
        }

        .dark .select2-container--default .select2-selection--single {
            background-color: #374151 !important;
            border-color: #4b5563 !important
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important
        }

        .dark .select2-dropdown {
            background-color: #1f2937 !important;
            border-color: #374151 !important
        }

        .dark .select2-results__option {
            color: #f3f4f6 !important;
            /* ← Teks putih untuk uraian */
            background-color: #1f2937 !important;
            /* ← Background gelap */
        }

        .select2-results__option--highlighted[aria-selected] {
            background-color: #6366f1 !important;
            /* Background ungu */
        }

        .select2-results__option--highlighted[aria-selected] strong {
            color: #ffffff !important;
            /* PPBJ No = Putih */
        }

        .select2-results__option--highlighted[aria-selected] small {
            color: #111827 !important;
            /* Uraian = Hitam */
        }

        .dark .select2-results__option--highlighted[aria-selected] {
            background-color: #4f46e5 !important;
            /* Background ungu sedikit gelap */
        }

        .dark .select2-results__option--highlighted[aria-selected] strong {
            color: #ffffff !important;
            /* PPBJ No = Putih */
        }

        .dark .select2-results__option--highlighted[aria-selected] small {
            color: #ffffff !important;
            /* Uraian = Hitam */
        }

        .dark .select2-search--dropdown .select2-search__field {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important
        }

        .item-row {
            background: #fafafa;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 10px 10px 8px;
            position: relative;
            transition: box-shadow .2s;
            margin-top: 8px
        }

        .dark .item-row {
            background: #111827;
            border-color: #374151
        }

        .item-row:hover {
            box-shadow: 0 1px 4px rgba(0, 0, 0, .06)
        }

        .row-badge {
            position: absolute;
            top: -8px;
            left: 10px;
            background: #6366f1;
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 1px 7px;
            border-radius: 99px
        }

        .btn-rm {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fee2e2;
            color: #dc2626;
            font-size: 14px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            transition: background .15s
        }

        .btn-rm:hover {
            background: #fecaca
        }

        .item-label {
            font-size: .68rem;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 3px;
            display: block
        }

        .dark .item-label {
            color: #9ca3af
        }

        .item-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 6px
        }

        .item-grid .m-input,
        .item-grid .m-select {
            padding: 5px 7px;
            font-size: .72rem;
            border-radius: 6px
        }

        .items-section {
            border-top: 1px solid #e5e7eb;
            padding-top: 10px;
            margin-top: 4px
        }

        .dark .items-section {
            border-top-color: #374151
        }

        .items-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px
        }

        .items-header label {
            font-size: .75rem;
            font-weight: 600;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 5px
        }

        .dark .items-header label {
            color: #d1d5db
        }

        .btn-add-row {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: .68rem;
            font-weight: 700;
            color: white;
            border: none;
            cursor: pointer;
            transition: all .15s
        }

        .btn-add-row:hover {
            opacity: .9;
            transform: translateY(-1px)
        }

        .modal-box .select2-container--default .select2-selection--single {
            height: 34px !important;
            border-radius: 8px !important;
            border: 1.5px solid #e5e7eb !important;
            padding: 2px 8px !important
        }

        .modal-box .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 30px !important;
            font-size: .8rem !important
        }

        .modal-box .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 30px !important
        }

        .dark .modal-box .select2-container--default .select2-selection--single {
            background-color: #374151 !important;
            border-color: #4b5563 !important
        }

        .modal-box .select2-selection__placeholder {
            font-size: .8rem !important
        }

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
            position: relative;
        }

        .dark .rt-btn {
            color: #d1d5db;
        }

        .rt-btn:hover {
            background: #e5e7eb;
            border-color: #d1d5db;
        }

        .dark .rt-btn:hover {
            background: #4b5533;
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

        .rt-font-select {
            height: 22px;
            padding: 0 2px;
            border-radius: 4px;
            font-size: 10px;
            border: 1px solid #e5e7eb;
            background: #fff;
            color: #374151;
            cursor: pointer;
            max-width: 90px;
            outline: none;
        }

        .dark .rt-font-select {
            background: #374151;
            border-color: #4b5563;
            color: #d1d5db;
        }

        .rt-size-wrap {
            display: inline-flex;
            align-items: stretch;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            height: 22px;
            vertical-align: middle
        }

        .dark .rt-size-wrap {
            background: #374151;
            border-color: #4b5533
        }

        .rt-size-input {
            width: 32px;
            height: 100%;
            border: none;
            outline: none;
            font-size: 10px;
            font-weight: 600;
            text-align: center;
            background: transparent;
            color: #111827;
            padding: 0 2px
        }

        .dark .rt-size-input {
            color: #f3f4f6
        }

        .rt-size-arrows {
            display: flex;
            flex-direction: column;
            width: 18px;
            border-left: 1px solid #e5e7eb;
            flex-shrink: 0;
            cursor: pointer
        }

        .dark .rt-size-arrows {
            border-color: #4b5533
        }

        .rt-size-arrows .arr-up,
        .rt-size-arrows .arr-dn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            line-height: 1;
            color: #6b7280;
            transition: all .12s;
            user-select: none;
            padding: 0;
            margin: 0
        }

        .rt-size-arrows .arr-up:hover,
        .rt-size-arrows .arr-dn:hover {
            background: #d1d5db;
            color: #111827
        }

        .dark .rt-size-arrows .arr-up:hover,
        .dark .rt-size-arrows .arr-dn:hover {
            background: #4b5533;
            color: #f3f4f6
        }

        .rt-size-arrows .arr-up {
            border-bottom: 1px solid #e5e7eb
        }

        .dark .rt-size-arrows .arr-up {
            border-color: #4b5533
        }

        .rt-color-wrap {
            position: relative;
            width: 22px;
            height: 22px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
            cursor: pointer;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .dark .rt-color-wrap {
            border-color: #4b5533;
        }

        .rt-color-wrap input[type="color"] {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 32px;
            height: 32px;
            border: none;
            padding: 0;
            cursor: pointer;
            background: transparent;
            opacity: 0;
        }

        .rt-color-icon {
            font-size: 11px;
            font-weight: 800;
            pointer-events: none;
            line-height: 1;
            margin-top: 1px;
        }

        .rt-color-bar {
            width: 14px;
            height: 3px;
            border-radius: 1px;
            pointer-events: none;
            margin-top: 1px;
            flex-shrink: 0;
        }

        .rt-hl-wrap {
            position: relative;
            width: 22px;
            height: 22px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
            cursor: pointer;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dark .rt-hl-wrap {
            border-color: #4b5533;
        }

        .rt-hl-wrap input[type="color"] {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 32px;
            height: 32px;
            border: none;
            padding: 0;
            cursor: pointer;
            opacity: 0;
        }

        .rt-case-wrap {
            position: relative;
            display: inline-flex;
        }

        .rt-case-menu {
            display: none;
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
            z-index: 9999;
            min-width: 160px;
            overflow: hidden;
        }

        .dark .rt-case-menu {
            background: #1f2937;
            border-color: #374151;
        }

        .rt-case-menu.open {
            display: block;
        }

        .rt-case-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 5px 10px;
            font-size: 11px;
            cursor: pointer;
            color: #374151;
            transition: background .1s;
        }

        .dark .rt-case-item {
            color: #d1d5db;
        }

        .rt-case-item:hover {
            background: #f3f4f6;
        }

        .dark .rt-case-item:hover {
            background: #374151;
        }

        .rt-lh-select {
            height: 22px;
            padding: 0 2px;
            border-radius: 4px;
            font-size: 10px;
            border: 1px solid #e5e7eb;
            background: #fff;
            color: #374151;
            cursor: pointer;
            width: 52px;
            outline: none;
        }

        .dark .rt-lh-select {
            background: #374151;
            border-color: #4b5533;
            color: #d1d5db;
        }

        .rt-editor {
            min-height: 70px !important;
            max-height: 200px !important;
            overflow-y: auto;
            padding: 5px 8px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 7px 7px;
            font-size: .78rem;
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
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, .12);
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

        .rt-btn svg {
            display: block;
            width: 12px;
            height: 12px;
        }
    </style>
@endpush

@section('content')
    <div class="space-y-6">

        {{-- ── HEADER ─────────────────────────────────────────────── --}}
        <div
            class="spph-header-gradient rounded-2xl p-6 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <span class="text-3xl">📋</span>
                        <h1 class="text-2xl font-bold tracking-tight">Penomoran SPPH</h1>
                    </div>
                    <p class="text-purple-100 text-sm">Surat Permintaan Penawaran Harga</p>
                    <div class="flex items-center gap-2 mt-3 flex-wrap">
                        <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">Total: <span
                                id="totalCount">{{ $spphs->total() }}</span> Data</span>
                        @if($lastNomor)
                            <span class="text-xs bg-white/20 rounded-full px-3 py-1 font-medium font-mono">Terakhir:
                                {{ $lastNomor }}</span>
                        @endif
                        <span class="flex items-center text-xs bg-green-400/20 rounded-full px-3 py-1"><span
                                class="live-dot"></span> Live</span>
                    </div>
                </div>
                <div class="flex items-center gap-2.5 shrink-0">
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
                    <button onclick="openAddModal()"
                        class="flex items-center gap-2 bg-white text-purple-700 font-bold px-5 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg shadow-black/20 whitespace-nowrap group">
                        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah SPPH
                    </button>
                </div>
            </div>
        </div>

        {{-- ── PRESENCE ─────────────────────────────────────────────── --}}
        <div id="presenceBar" class="hidden">
            <div
                class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span class="relative flex h-2.5 w-2.5">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span id="presenceText" class="text-xs font-semibold text-amber-700 dark:text-amber-400"></span>
            </div>
        </div>

        {{-- ── ALERTS ──────────────────────────────────────────────── --}}
        @if(session('success'))
            <div
                class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ session('success') }}</span>
                <button onclick="this.closest('div').remove()" class="ml-auto text-green-500 hover:text-green-700">✕</button>
            </div>
        @endif
        @if($errors->any())
            <div
                class="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                <ul class="text-sm">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
            </div>
        @endif

        {{-- ── FILTER BAR ──────────────────────────────────────────── --}}
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
                        placeholder="Cari nomor SPPH, nomor PR, vendor, deskripsi..."
                        class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                    <span id="searchSpinner" class="absolute right-3 top-1/2 -translate-y-1/2 hidden">
                        <svg class="w-4 h-4 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </span>
                </div>
                <select id="filterPic"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm min-w-[140px]">
                    <option value="">Semua PIC</option>
                    @foreach($pics as $p)<option value="{{ $p }}" {{ (isset($pic) && $pic === $p) ? 'selected' : '' }}>
                        {{ $p }}
                    </option>@endforeach
                </select>
                <select id="filterVendor"
                    class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm min-w-[190px]">
                    <option value="">Semua Vendor</option>
                    @foreach($vendors as $v)
                        <option value="{{ $v->nama_vendor }}" {{ (isset($vendorFilter) && $vendorFilter === $v->nama_vendor) ? 'selected' : '' }}>
                            {{ $v->nama_vendor }}
                        </option>
                    @endforeach
                </select>
                <input type="date" id="dariInput" value="{{ $dari ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <input type="date" id="sampaiInput" value="{{ $sampai ?? '' }}"
                    class="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <button onclick="doExport()"
                    class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold text-sm whitespace-nowrap"
                    title="Export CSV">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>Export
                </button>
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
                        class="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-mono">"{{ $search }}"
                    <button onclick="clearSearch()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($pic)<span
                        class="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">PIC:
                    {{ $pic }} <button onclick="clearPic()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                    @if($vendorFilter)<span
                        class="inline-flex items-center gap-1 text-xs bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">Vendor:
                    {{ $vendorFilter }} <button onclick="clearVendor()" class="hover:text-red-500 ml-0.5">x</button></span>@endif
                    @if($dari || $sampai)<span
                        class="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">📅
                        {{ ($dari ? \Carbon\Carbon::parse($dari)->format('d/m/Y') : '...') }} –
                        {{ ($sampai ? \Carbon\Carbon::parse($sampai)->format('d/m/Y') : '...') }} <button
                    onclick="clearDate()" class="hover:text-red-500 ml-0.5">✕</button></span>@endif
                </div>
            </div>
        </div>

        {{-- ── TABLE ───────────────────────────────────────────────── --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-10">
                                #</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[190px]">
                                Nomor SPPH</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[100px]">
                                Tanggal</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[160px]">
                                Nomor PR</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[180px]">
                                Nama Vendor</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Deskripsi</th>
                            <th
                                class="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-20">
                                PIC</th>
                            <th
                                class="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-28">
                                Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="spphBody" class="divide-y divide-gray-100 dark:divide-gray-700">
                        @forelse($spphs as $i => $s)
                            @php($vendorList = $s->print_vendor_names)
                            <tr class="tbl-row-hover" data-id="{{ $s->id }}" data-pic="{{ $s->pic }}"
                                data-search="{{ strtolower($s->nomor_spph . ' ' . $s->nomor_pr . ' ' . implode(' ', $vendorList) . ' ' . $s->deskripsi_pengadaan) }}">
                                <td class="px-4 py-3 text-gray-400 text-xs font-mono">{{ $spphs->firstItem() + $i }}</td>
                                <td class="px-4 py-3"><span
                                        class="badge-nomor inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                        title="Klik untuk salin">{{ $s->nomor_spph }}</span></td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                                    {{ $s->tanggal?->format('d/m/Y') ?? '-' }}
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                                    {{ $s->nomor_pr ?? '-' }}
                                </td>
                                <td class="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">
                                    <div class="flex flex-wrap gap-1">
                                        @if(count($vendorList) > 1)
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-semibold">
                                                {{ count($vendorList) }} vendor
                                            </span>
                                        @endif
                                        @foreach($vendorList as $vendorName)
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                                                {{ $vendorName }}
                                            </span>
                                        @endforeach
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate"
                                    title="{{ $s->deskripsi_pengadaan }}">{{ $s->deskripsi_pengadaan }}</td>
                                <td class="px-4 py-3"><span
                                        class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">{{ $s->pic }}</span>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button type="button" onclick="shareRecordToChat('spph', {{ $s->id }})"
                                            class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                            title="Bagikan SPPH ke Chat Tim" aria-label="Bagikan SPPH ke Chat Tim">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8m-8 4h5m8-2a8 8 0 01-8 8 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.1A8 8 0 1119 17.2" />
                                            </svg>
                                        </button>
                                        <a href="{{ route('spph.cetak', ['spph' => $s, 'vendor' => $vendorList[0] ?? $s->nama_vendor]) }}" target="_blank"
                                            class="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                                            title="Cetak SPPH vendor utama">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                        </a>
                                        @if(count($vendorList) > 1)
                                            <a href="{{ route('spph.cetak-semua-vendor', $s) }}" target="_blank"
                                                class="px-2 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                                                title="Cetak semua vendor sekaligus dalam ZIP">
                                                ZIP
                                            </a>
                                            <select onchange="if(this.value){ window.open(this.value, '_blank'); this.value=''; }"
                                                class="text-[11px] rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-200 px-1.5 py-1"
                                                title="Cetak SPPH per vendor">
                                                <option value="">Cetak vendor...</option>
                                                @foreach($vendorList as $vendorName)
                                                    <option value="{{ route('spph.cetak', ['spph' => $s, 'vendor' => $vendorName]) }}">{{ $vendorName }}</option>
                                                @endforeach
                                            </select>
                                        @endif
                                        <button
                                            onclick="openEditModal({{ $s->id }}, @js($s->nomor_spph), @js($s->tanggal?->format('Y-m-d')), @js($s->nomor_pr ?? ''), @js($vendorList), @js($s->deskripsi_pengadaan), @js($s->pic))"
                                            class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                                            title="Edit">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <form method="POST" action="{{ route('spph.destroy', $s) }}"
                                            onsubmit="return confirmDelete(event)">
                                            @csrf @method('DELETE')
                                            <button type="submit"
                                                class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                title="Hapus">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr id="emptyRow">
                                <td colspan="8" class="px-4 py-16 text-center text-gray-400 dark:text-gray-500">
                                    <div class="flex flex-col items-center gap-3"><span class="text-5xl">📋</span>
                                        <p class="font-medium">Belum ada data SPPH</p>
                                        <p class="text-sm">Klik <strong>Tambah SPPH</strong> untuk memulai</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            @if($spphs->hasPages())
                <div
                    class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan
                        {{ $spphs->firstItem() }}–{{ $spphs->lastItem() }} dari {{ $spphs->total() }} data
                    </p>
                    {{ $spphs->links() }}
                </div>
            @endif
        </div>
    </div>

    {{-- ════════════════════════════════════════════════════════════════
    MODAL TAMBAH
    ════════════════════════════════════════════════════════════════ --}}
    <div id="addModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="modal-box">
            <div class="modal-head spph-header-gradient">
                <h2>Tambah SPPH Baru</h2>
            </div>
            <form method="POST" action="{{ route('spph.store') }}" class="modal-body" id="addForm">
                @csrf
                <div class="form-group">
                    <label>Nomor SPPH <span class="text-red-500">*</span></label>
                    <div id="suggBox" class="flex flex-wrap gap-1.5 mb-1.5 min-h-[20px]"><span
                            class="text-xs text-gray-400 italic">Memuat saran...</span></div>
                    <input type="text" name="nomor_spph" id="nomorSpphInput" placeholder="cth: 128/PKU-III/SPPH/2026"
                        autocomplete="off" required class="m-input mono" style="border-width:2px">
                    <div id="nomorStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tanggal <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal" value="{{ date('Y-m-d') }}" required class="m-input">
                    </div>
                    <div class="form-group">
                        <label>Nomor PR <span class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <div class="flex gap-1.5 mb-1.5">
                            <button type="button" id="btnPpbjMode" onclick="setPrMode('ppbj')"
                                class="pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                                Pilih PPBJ</button>
                            <button type="button" id="btnManualMode" onclick="setPrMode('manual')"
                                class="pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                                Manual</button>
                        </div>
                        {{-- ❌ HAPUS name="nomor_pr" dari select --}}
                        <div id="ppbjModeBox">
                            <select id="ppbjSelect" class="ppbj-select w-full"
                                data-placeholder="Pilih No. PPBJ yang belum punya SPPH...">
                                <option value=""></option>
                            </select>
                        </div>
                        {{-- ❌ HAPUS name dari input manual --}}
                        <div id="manualModeBox" class="hidden">
                            <input type="text" id="nomorPrManual" placeholder="Ketik nomor PR manual, cth: PR/2026/001"
                                class="m-input mono" autocomplete="off">
                        </div>
                        {{-- ✅ HANYA hidden field ini yang punya name --}}
                        <input type="hidden" name="nomor_pr" id="nomorPrFinal">
                        <input type="hidden" name="nomor_pr_type" id="nomorPrType" value="ppbj">
                        <div id="ppbjInfo"
                            class="hidden mt-1.5 p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                            <div class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div id="ppbjInfoContent" class="text-xs text-indigo-700 dark:text-indigo-300 space-y-0.5">
                                </div>
                            </div>
                        </div>
                        <div id="ppbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Nama Vendor <span class="text-red-500">*</span></label>
                    <select name="vendor_names[]" id="vendorSelect" required multiple class="vendor-select w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)<option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                        <option value="__tambah__">➕ Tambah Vendor Baru...</option>
                    </select>
                    <div id="newVendorBox" class="hidden mt-1"><input type="text" name="vendor_baru"
                            placeholder="Nama vendor baru..." class="m-input" style="border-color:#a78bfa"></div>
                </div>

                <div class="form-group">
                    <label>Deskripsi Pengadaan <span class="text-red-500">*</span></label>
                    <div id="addDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="addDeskripsi" rows="2" required
                        placeholder="Masukkan deskripsi pengadaan..." class="m-textarea"></textarea>
                </div>

                <div class="form-group">
                    <label>PIC <span class="text-red-500">*</span></label>
                    <select name="pic" required class="pic-select w-full">
                        <option value="">-- Pilih PIC --</option>
                        @foreach($pics as $picItem)<option value="{{ $picItem }}">{{ $picItem }}</option>@endforeach
                    </select>
                </div>

                <div class="items-section">
                    <div class="items-header">
                        <label><span>📋</span> Daftar Barang / Jasa</label>
                    </div>
                    <div id="addRows" class="space-y-0"></div>
                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('add')" class="btn-add-row" style="background:#6366f1"><svg
                                class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>Tambah Barang</button>
                    </div>
                </div>

                <div class="btn-row">
                    <button type="button" onclick="closeModal('addModal')" class="btn-cancel">Batal</button>
                    <button type="submit" class="btn-save spph-header-gradient">💾 Simpan</button>
                </div>
            </form>
        </div>
    </div>

    {{-- ════════════════════════════════════════════════════════════════
    MODAL EDIT
    ════════════════════════════════════════════════════════════════ --}}
    <div id="editModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div class="modal-box">
            <div class="modal-head bg-gradient-to-r from-amber-500 to-orange-500">
                <h2>Edit Data SPPH</h2>
            </div>
            <form method="POST" id="editForm" class="modal-body">
                @csrf @method('PUT')
                <input type="hidden" id="editId">
                <div class="form-group">
                    <label>Nomor SPPH <span class="text-red-500">*</span></label>
                    <input type="text" name="nomor_spph" id="editNomor" autocomplete="off" required class="m-input mono"
                        style="border-width:2px">
                    <div id="editNomorStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Tanggal <span class="text-red-500">*</span></label>
                        <input type="date" name="tanggal" id="editTanggal" required class="m-input">
                    </div>
                    <div class="form-group">
                        <label>Nomor PR <span class="text-xs text-gray-400 font-normal">— Opsional</span></label>
                        <div class="flex gap-1.5 mb-1.5">
                            <button type="button" id="editBtnPpbjMode" onclick="setEditPrMode('ppbj')"
                                class="edit-pr-mode-btn active-mode px-3 py-1 rounded-lg text-xs font-semibold transition-all border">📋
                                Pilih PPBJ</button>
                            <button type="button" id="editBtnManualMode" onclick="setEditPrMode('manual')"
                                class="edit-pr-mode-btn px-3 py-1 rounded-lg text-xs font-semibold transition-all border">✏️
                                Manual</button>
                        </div>
                        {{-- ❌ HAPUS name="nomor_pr" dari select --}}
                        <div id="editPpbjModeBox">
                            <select id="editPpbjSelect" class="edit-ppbj-select w-full"
                                data-placeholder="Pilih No. PPBJ...">
                                <option value=""></option>
                            </select>
                        </div>
                        {{-- ❌ HAPUS name dari input manual --}}
                        <div id="editManualModeBox" class="hidden">
                            <input type="text" id="editNomorPrManual" placeholder="Ketik nomor PR manual..."
                                class="m-input mono" autocomplete="off">
                        </div>
                        {{-- ✅ HANYA hidden field ini yang punya name --}}
                        <input type="hidden" name="nomor_pr" id="editNomorPrFinal">
                        <input type="hidden" name="nomor_pr_type" id="editNomorPrType" value="ppbj">
                        <div id="editPpbjInfo"
                            class="hidden mt-1.5 p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                            <div class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div id="editPpbjInfoContent"
                                    class="text-xs text-indigo-700 dark:text-indigo-300 space-y-0.5"></div>
                            </div>
                        </div>
                        <div id="editPpbjStatus" class="mt-0.5 text-xs min-h-[14px] flex items-center gap-1"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Nama Vendor <span class="text-red-500">*</span></label>
                    <select name="vendor_names[]" id="editVendor" required multiple class="edit-vendor-select w-full">
                        <option value="">-- Pilih Vendor --</option>
                        @foreach($vendors as $v)<option value="{{ $v->nama_vendor }}">{{ $v->nama_vendor }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label>Deskripsi Pengadaan <span class="text-red-500">*</span></label>
                    <div id="editDeskripsiBadge" class="hidden mb-1"></div>
                    <textarea name="deskripsi_pengadaan" id="editDeskripsi" rows="2" required class="m-textarea"></textarea>
                </div>
                <div class="form-group">
                    <label>PIC <span class="text-red-500">*</span></label>
                    <select name="pic" id="editPic" required class="edit-pic-select w-full">
                        <option value="">-- Pilih PIC --</option>
                        @foreach($pics as $picItem)<option value="{{ $picItem }}">{{ $picItem }}</option>@endforeach
                    </select>
                </div>

                <div class="items-section">
                    <div class="items-header">
                        <label><span>📋</span> Daftar Barang / Jasa</label>
                    </div>
                    <div id="editRows" class="space-y-0">
                        <div class="text-center py-4 text-gray-400 text-xs animate-pulse">Membuka data...</div>
                    </div>
                    <div class="sticky-add-wrap">
                        <button type="button" onclick="addRow('edit')" class="btn-add-row" style="background:#f59e0b"><svg
                                class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4v16m8-8H4" />
                            </svg>Tambah Barang</button>
                    </div>
                </div>

                <div class="btn-row">
                    <button type="button" onclick="closeModal('editModal')" class="btn-cancel">Batal</button>
                    <button type="submit" class="btn-save bg-gradient-to-r from-amber-500 to-orange-500"
                        style="box-shadow:0 2px 8px rgba(245,158,11,.3)">💾 Update</button>
                </div>
            </form>
        </div>
    </div>
    {{-- ════════════════════════════════════════════════════════════════
    ONBOARDING TUTORIAL POPUP
    ════════════════════════════════════════════════════════════════ --}}
    <div id="onboardingPopup" class="onboarding-overlay" style="display:none;">
        <div class="onboarding-card">
            <!-- STEP 1: Welcome -->
            <div class="ob-step active" data-step="1">
                <div class="ob-header">
                    <div class="ob-badge">✨ Pembaruan Fitur</div>
                    <div class="ob-icon-wrap">🚀</div>
                    <div class="ob-title">Integrasi PPBJ Otomatis</div>
                    <div class="ob-subtitle">Sekarang input SPPH lebih cepat dan otomatis terhubung dengan PPBJ</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot active" data-dot="1"></div>
                    <div class="ob-progress-dot" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num">1</span>
                        Apa yang baru?
                    </div>
                    <div class="ob-desc">
                        Tidak perlu lagi <strong>input data 2 kali</strong>! Sistem sekarang secara otomatis menghubungkan
                        SPPH dengan PPBJ Management.
                    </div>
                    <div class="ob-features">
                        <div class="ob-feature">
                            <span class="ob-feature-icon">📋</span>
                            <span class="ob-feature-text">Pilih PPBJ langsung dari dropdown</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">✍️</span>
                            <span class="ob-feature-text">Deskripsi otomatis terisi</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">🔗</span>
                            <span class="ob-feature-text">No. SPPH otomatis ke PPBJ</span>
                        </div>
                        <div class="ob-feature">
                            <span class="ob-feature-icon">📊</span>
                            <span class="ob-feature-text">Progress PPBJ otomatis naik</span>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="closeOnboarding()">Lewati</button>
                    <button class="ob-btn-next" onclick="nextObStep(2)">
                        Lihat Cara Pakai
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 2: Pilih PPBJ -->
            <div class="ob-step" data-step="2">
                <div class="ob-header" style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);">
                    <div class="ob-badge">📋 Langkah 1</div>
                    <div class="ob-icon-wrap">🔍</div>
                    <div class="ob-title">Pilih PPBJ dari Dropdown</div>
                    <div class="ob-subtitle">Hanya muncul PPBJ yang belum punya nomor SPPH</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot active" data-dot="2"></div>
                    <div class="ob-progress-dot" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num">2</span>
                        Pilih Nomor PR
                    </div>
                    <div class="ob-desc">
                        Klik dropdown <strong>"Nomor PR"</strong>, lalu pilih PPBJ yang tersedia. Sistem hanya menampilkan
                        PPBJ yang <strong>belum terhubung</strong> dengan SPPH manapun.
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Preview: Modal Tambah SPPH</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select highlight">
                                <svg width="16" height="16" fill="none" stroke="#6366f1" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono">PR/2026/001</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-select">
                                <svg width="16" height="16" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <div class="ob-mono" style="color:#94a3b8">PR/2026/002</div>
                                    <div class="ob-sub">ATK dan Perlengkapan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(1)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="nextObStep(3)">
                        Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 3: Auto-fill Deskripsi -->
            <div class="ob-step" data-step="3">
                <div class="ob-header" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
                    <div class="ob-badge">✍️ Langkah 2</div>
                    <div class="ob-icon-wrap">⚡</div>
                    <div class="ob-title">Deskripsi Otomatis Terisi!</div>
                    <div class="ob-subtitle">Uraian PPBJ langsung mengisi deskripsi pengadaan</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot active" data-dot="3"></div>
                    <div class="ob-progress-dot" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label">
                        <span class="ob-step-num" style="background:#22c55e">3</span>
                        Auto-fill Aktif
                    </div>
                    <div class="ob-desc">
                        Setelah memilih PPBJ, <strong>deskripsi pengadaan</strong> akan otomatis terisi sesuai uraian dari
                        data PPBJ. Kamu tinggal lanjut ke langkah berikutnya!
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Auto-fill dalam aksi</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-select" style="border-color:#22c55e">
                                <div>
                                    <div class="ob-mono" style="color:#22c55e">✓ PR/2026/001</div>
                                    <div class="ob-sub">Pengadaan Laptop Kantor</div>
                                </div>
                            </div>
                            <div class="ob-demo-arrow">↓ Otomatis terisi</div>
                            <div class="ob-demo-textarea" style="border-color:#22c55e">
                                <span class="ob-auto-badge">✨ AUTO-FILL</span>
                                Pengadaan Laptop Kantor untuk divisi IT, spesifikasi minimal Intel Core i5, RAM 8GB, SSD
                                256GB, include carry case dan mouse wireless.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(2)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="nextObStep(4)"
                        style="background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 4px 14px rgba(34,197,94,0.4)">
                        Selanjutnya
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- STEP 4: Auto-link ke PPBJ -->
            <div class="ob-step" data-step="4">
                <div class="ob-header" style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);">
                    <div class="ob-badge">🔗 Langkah 3</div>
                    <div class="ob-icon-wrap">🔗</div>
                    <div class="ob-title">Otomatis Terhubung ke PPBJ!</div>
                    <div class="ob-subtitle">Sekali klik Simpan, data PPBJ langsung terupdate</div>
                </div>
                <div class="ob-progress">
                    <div class="ob-progress-dot done" data-dot="1"></div>
                    <div class="ob-progress-dot done" data-dot="2"></div>
                    <div class="ob-progress-dot done" data-dot="3"></div>
                    <div class="ob-progress-dot active" data-dot="4"></div>
                </div>
                <div class="ob-body">
                    <div class="ob-step-label" style="color:#f59e0b">
                        <span class="ob-step-num" style="background:#f59e0b">4</span>
                        Sinkronisasi Otomatis
                    </div>
                    <div class="ob-desc">
                        Saat kamu klik <strong>"Simpan"</strong>, sistem otomatis mengisi <strong>Nomor SPPH</strong> dan
                        <strong>Tanggal SPPH</strong> di halaman PPBJ Management. <strong>Progress PPBJ juga otomatis
                            naik!</strong>
                    </div>
                    <div class="ob-demo">
                        <div class="ob-demo-title">Yang terjadi di belakang layar</div>
                        <div class="ob-demo-content">
                            <div class="ob-demo-grid">
                                <div class="ob-demo-field">
                                    <div class="ob-demo-field-label">Halaman SPPH</div>
                                    <div style="font-size:11px;color:#6b7280;margin-bottom:4px">Klik "💾 Simpan"</div>
                                    <div
                                        style="font-family:'Courier New',monospace;font-size:11px;color:#111827;font-weight:600">
                                        128/PKU-III/SPPH/2026</div>
                                </div>
                                <div style="display:flex;align-items:center;justify-content:center">
                                    <div class="ob-demo-link-arrow">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ob-demo-field" style="border-color:#22c55e">
                                    <div class="ob-demo-field-label">PPBJ Management</div>
                                    <div style="font-size:10px;color:#22c55e;font-weight:700;margin-bottom:6px">✅ Terupdate
                                        Otomatis</div>
                                    <div style="display:flex;gap:8px">
                                        <div>
                                            <div style="font-size:9px;color:#94a3b8">No. SPPH</div>
                                            <div class="ob-demo-field-value">128/PKU-III/SPPH/2026</div>
                                        </div>
                                        <div>
                                            <div style="font-size:9px;color:#94a3b8">Tgl SPPH</div>
                                            <div class="ob-demo-field-value">06/05/2026</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style="margin-top:10px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px">
                                <span style="font-size:16px">📊</span>
                                <span style="font-size:11px;color:#92400e;font-weight:600">Progress PPBJ naik otomatis
                                    karena status sudah terhubung SPPH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ob-footer">
                    <button class="ob-btn-skip" onclick="prevObStep(3)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style="width:16px;height:16px;vertical-align:middle;margin-right:4px">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <button class="ob-btn-next" onclick="finishOnboarding()"
                        style="background:linear-gradient(135deg,#f59e0b,#ea580c);box-shadow:0 4px 14px rgba(245,158,11,0.4)">
                        🎉 Mulai Gunakan!
                    </button>
                </div>
            </div>
        </div>
    </div>

    {{-- ═══ Floating Button (muncul setelah tutorial selesai) ═══ --}}
    <button id="onboardingFloatBtn" class="ob-float-btn" style="display:none" onclick="showOnboarding()">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="ob-float-tooltip">Lihat Pembaruan</span>
    </button>
@endsection

@push('scripts')
    <script>
        // ════════════════════════════════════════════════════════════
        // CONFIG
        // ════════════════════════════════════════════════════════════
        const ONBOARDING_SEEN = {{ $onboardingSeen ? 'true' : 'false' }};
        const CHECK_URL = '{{ route("spph.check-nomor") }}';
        const SUGGEST_URL = '{{ route("spph.suggest-nomor") }}';
        const POLL_URL = '{{ route("spph.poll") }}';
        const PRESENCE_URL = '{{ route("spph.presence") }}';
        const PRES_START = '{{ route("spph.presence.start") }}';
        const PRES_STOP = '{{ route("spph.presence.stop") }}';
        const ITEMS_BASE = '/spph/';
        const PPBJ_OPTIONS_URL = '{{ route("spph.ppbj-options") }}';
        const PPBJ_CHECK_URL = '{{ route("spph.check-ppbj") }}';
        const SATUANS = @json($satuans);

        let lastId = {{ $spphs->count() > 0 ? $spphs->max('id') : 0 }};
        let pollTimer = null, checkTimer = null, searchTimer = null, presTimer = null, hbTimer = null;
        let modalOpen = false, addIdx = 0, editIdx = 5000;
        let currentPrMode = 'ppbj', currentEditPrMode = 'ppbj';
        const IS_FIRST = {{ $spphs->onFirstPage() ? 'true' : 'false' }};
        const HAS_FILTER = {{ (($search ?? '') || ($pic ?? '') || ($dari ?? '') || ($sampai ?? '')) ? 'true' : 'false' }};

        // ════════════════════════════════════════════════════════════
        // HELPERS
        // ════════════════════════════════════════════════════════════
        function escapedHtml(str) {
            return String(str || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function showDeskripsiBadge($badge, uraian, isExisting = false) {
            if (!$badge || !$badge.length) return;
            const truncated = uraian.length > 50 ? uraian.substring(0, 50) + '...' : uraian;
            const label = isExisting ? 'ℹ️ Deskripsi sudah ada' : '✨ Auto-filled dari PPBJ';
            $badge.html(
                `<span class="deskripsi-autofill-badge">` +
                `<span>${label}: "${escapedHtml(truncated)}"</span>` +
                `<button type="button" onclick="clearDeskripsiAutoFill('${$badge.attr('id')}')" title="Hapus badge">✕</button>` +
                `</span>`
            ).removeClass('hidden');
        }

        function clearDeskripsiAutoFill(badgeId) {
            const $badge = $('#' + badgeId);
            if ($badge && $badge.length) $badge.addClass('hidden').html('');
        }

        // ════════════════════════════════════════════════════════════
        // UPDATE PR FINAL VALUE
        // ════════════════════════════════════════════════════════════
        function updatePrFinalValue() {
            const val = currentPrMode === 'ppbj'
                ? ($('#ppbjSelect').val() || '')
                : ($('#nomorPrManual').val() || '').trim();
            $('#nomorPrFinal').val(val);
        }

        function updateEditPrFinalValue() {
            const val = currentEditPrMode === 'ppbj'
                ? ($('#editPpbjSelect').val() || '')
                : ($('#editNomorPrManual').val() || '').trim();
            $('#editNomorPrFinal').val(val);
        }

        // ════════════════════════════════════════════════════════════
        // PR MODE TOGGLE
        // ════════════════════════════════════════════════════════════
        function setPrMode(mode) {
            currentPrMode = mode;
            const $ppbjBox = $('#ppbjModeBox');
            const $manualBox = $('#manualModeBox');
            const $btnPpbj = $('#btnPpbjMode');
            const $btnManual = $('#btnManualMode');
            const $info = $('#ppbjInfo');
            const $status = $('#ppbjStatus');
            const $badge = $('#addDeskripsiBadge');
            const $deskripsi = $('#addDeskripsi');

            if (mode === 'ppbj') {
                $ppbjBox.removeClass('hidden');
                $manualBox.addClass('hidden');
                $btnPpbj.addClass('active-mode');
                $btnManual.removeClass('active-mode');
                $('#nomorPrType').val('ppbj');
                $('#nomorPrManual').val('');
                $('#ppbjSelect').val(null).trigger('change.select2');

                const manualVal = $('#nomorPrManual').val().trim();
                if (manualVal) {
                    $('#nomorPrManual').val('');
                    $('#ppbjSelect').append(new Option(manualVal, manualVal, true, true)).trigger('change');
                } else {
                    $deskripsi.val('');
                    $badge.addClass('hidden').html('');
                    updatePrFinalValue();
                }
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $info.addClass('hidden');
                $status.html('');
                $('#nomorPrType').val('manual');

                $('#ppbjSelect').val(null).trigger('change.select2');
                $('#nomorPrManual').val('');
                $('#nomorPrFinal').val('');

                const selectVal = $('#ppbjSelect').val();
                if (selectVal) {
                    const ppbjNo = selectVal;
                    $('#ppbjSelect').val(null).trigger('change');
                    $('#nomorPrManual').val('');
                    $('#nomorPrFinal').val('');

                    $status.html(
                        `<span class="text-red-600 dark:text-red-400 flex items-center gap-1">` +
                        `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">` +
                        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>` +
                        `</svg>` +
                        `<strong>Peringatan:</strong> Nomor <span class="font-mono">${escapedHtml(ppbjNo)}</span> ada di database PPBJ! ` +
                        `Gunakan mode <strong>"Pilih PPBJ"</strong> agar otomatis terhubung.</span>`
                    );

                    $info.addClass('hidden');
                    $badge.addClass('hidden').html('');

                    const $manualInput = $('#nomorPrManual');
                    $manualInput.css({ 'border-color': '#ef4444', 'background-color': '#fef2f2' });
                    setTimeout(() => { $manualInput.css({ 'border-color': '', 'background-color': '' }); }, 3000);
                } else {
                    $status.html('');
                }
                updatePrFinalValue();
            }
        }

        function setEditPrMode(mode) {
            currentEditPrMode = mode;
            const $ppbjBox = $('#editPpbjModeBox');
            const $manualBox = $('#editManualModeBox');
            const $btnPpbj = $('#editBtnPpbjMode');
            const $btnManual = $('#editBtnManualMode');
            const $info = $('#editPpbjInfo');
            const $status = $('#editPpbjStatus');
            const $badge = $('#editDeskripsiBadge');
            const $deskripsi = $('#editDeskripsi');

            if (mode === 'ppbj') {
                $ppbjBox.removeClass('hidden');
                $manualBox.addClass('hidden');
                $btnPpbj.addClass('active-mode');
                $btnManual.removeClass('active-mode');
                $('#editNomorPrType').val('ppbj');
                $('#editNomorPrManual').val('');
                $('#editPpbjSelect').val(null).trigger('change.select2');

                const manualVal = $('#editNomorPrManual').val().trim();
                if (manualVal) {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: manualVal }, function (data) {
                        if (data.status === 'available' || data.status === 'already_linked') {
                            $('#editNomorPrManual').val('');
                            const o = new Option(manualVal, manualVal, true, true);
                            o.uraian = data.uraian;
                            o.text = manualVal + (data.uraian ? ' — ' + data.uraian.substring(0, 40) : '');
                            $('#editPpbjSelect').append(o).trigger('change');

                            if ($deskripsi && data.uraian) {
                                $deskripsi.val(data.uraian);
                                showDeskripsiBadge($badge, data.uraian, data.status === 'already_linked');
                            }
                        } else {
                            $('#editNomorPrManual').val('');
                            $('#editPpbjSelect').val(null).trigger('change.select2');
                            $deskripsi.val('');
                            $badge.addClass('hidden').html('');
                            updateEditPrFinalValue();
                        }
                    }).fail(() => {
                        $('#editNomorPrManual').val('');
                        $('#editPpbjSelect').val(null).trigger('change.select2');
                        updateEditPrFinalValue();
                    });
                } else {
                    updateEditPrFinalValue();
                }
            } else {
                $ppbjBox.addClass('hidden');
                $manualBox.removeClass('hidden');
                $btnPpbj.removeClass('active-mode');
                $btnManual.addClass('active-mode');
                $('#editNomorPrType').val('manual');

                $('#editPpbjSelect').val(null).trigger('change.select2');
                $('#editNomorPrManual').val('');
                $('#editNomorPrFinal').val('');

                const selectVal = $('#editPpbjSelect').val();
                if (selectVal) {
                    const ppbjNo = selectVal;
                    $('#editPpbjSelect').val(null).trigger('change.select2');
                    $('#editNomorPrManual').val('');
                    $('#editNomorPrFinal').val('');

                    $status.html(
                        `<span class="text-red-600 dark:text-red-400 flex items-center gap-1">` +
                        `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">` +
                        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>` +
                        `</svg>` +
                        `<strong>Peringatan:</strong> Nomor <span class="font-mono">${escapedHtml(ppbjNo)}</span> ada di database PPBJ! ` +
                        `Gunakan mode <strong>"Pilih PPBJ"</strong> agar otomatis terhubung.</span>`
                    );

                    $info.addClass('hidden');
                    $badge.addClass('hidden').html('');

                    const $manualInput = $('#editNomorPrManual');
                    $manualInput.css({ 'border-color': '#ef4444', 'background-color': '#fef2f2' });
                    setTimeout(() => { $manualInput.css({ 'border-color': '', 'background-color': '' }); }, 3000);
                } else {
                    $status.html('');
                }
                updateEditPrFinalValue();
            }
        }

        // ════════════════════════════════════════════════════════════
        // PPBJ SELECT2 (✅ SCOPE SUDAH DIPERBAIKI)
        // ════════════════════════════════════════════════════════════
        function initPpbjSelect2(selector, infoBoxId, statusId, contentId, onChangeCb, deskripsiFieldId, badgeContainerId) {
            const $select = $(selector);

            // ✅ FIX: Tambahkan flag untuk mencegah auto-clear saat loading
            let isLoadingEdit = false;

            // Expose method untuk set flag
            if (selector.includes('edit')) {
                window['_editPpbjLoading'] = false;
            }

            $select.select2({
                placeholder: $select.data('placeholder') || 'Pilih No. PPBJ...',
                allowClear: true,
                width: '100%',
                minimumInputLength: 0,
                ajax: {
                    url: PPBJ_OPTIONS_URL,
                    dataType: 'json',
                    delay: 300,
                    data: p => ({ q: p.term || '' }),
                    processResults: d => ({ results: d.results }),
                    cache: true
                },
                templateResult: item => {
                    if (item.loading) return 'Mencari...';
                    const $c = $('<div>').append($('<strong class="font-mono">').text(item.id));
                    if (item.uraian) $c.append($('<br>')).append($('<small>').text(item.uraian).css({ color: '#6b7280' }));
                    return $c;
                },
                templateSelection: item => {
                    if (!item.id) return item.text || 'Pilih No. PPBJ...';
                    return $('<span class="font-mono font-semibold">').text(item.id);
                }
            });

            $select.on('change', function () {
                const val = $(this).val();
                const $info = $('#' + infoBoxId);
                const $status = $('#' + statusId);
                const $content = $('#' + contentId);
                const $deskripsi = deskripsiFieldId ? $('#' + deskripsiFieldId) : null;
                const $badge = badgeContainerId ? $('#' + badgeContainerId) : null;

                if (onChangeCb) onChangeCb(val);

                if (!val) {
                    $info.addClass('hidden');
                    $status.html('');
                    // ✅ FIX: JANGAN kosongkan deskripsi jika tidak ada nilai yang dipilih
                    // Hanya kosongkan badge, biarkan deskripsi tetap
                    if ($badge) $badge.addClass('hidden').html('');
                    return;
                }

                $status.html('<span class="text-gray-400">🔄 Memeriksa...</span>');

                $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (data) {
                    $status.html('');
                    if (data.status === 'available') {
                        $status.html('<span class="text-green-600 dark:text-green-400">✅ PPBJ tersedia — akan otomatis terhubung</span>');
                        $info.removeClass('hidden');
                        $content.html(
                            `<div><strong>Uraian:</strong> ${data.uraian || '-'}</div>` +
                            `${data.portofolio ? `<div><strong>Portofolio:</strong> ${data.portofolio}</div>` : ''}` +
                            `${data.buyer ? `<div><strong>Buyer:</strong> ${data.buyer}</div>` : ''}`
                        );
                        // ✅ FIX: Hanya auto-fill deskripsi jika deskripsi KOSONG
                        // Jangan timpa jika sudah ada isi (misal saat edit)
                        if ($deskripsi && data.uraian && !$deskripsi.val().trim()) {
                            $deskripsi.val(data.uraian);
                            showDeskripsiBadge($badge, data.uraian);
                        } else if ($deskripsi && data.uraian && $deskripsi.val().trim()) {
                            // Deskripsi sudah ada isi, tampilkan badge info saja
                            showDeskripsiBadge($badge, data.uraian, true);
                        }
                    } else if (data.status === 'already_linked') {
                        $status.html(`<span class="text-amber-600 dark:text-amber-400">⚠️ ${data.message}</span>`);
                        $info.addClass('hidden');
                        // ✅ FIX: Sama, jangan timpa jika sudah ada isi
                        if ($deskripsi && data.uraian && !$deskripsi.val().trim()) {
                            $deskripsi.val(data.uraian);
                            showDeskripsiBadge($badge, data.uraian, true);
                        }
                    } else if (data.status === 'cancelled') {
                        $status.html(`<span class="text-red-600 dark:text-red-400">❌ ${data.message}</span>`);
                        $info.addClass('hidden');
                    } else {
                        $status.html('<span class="text-blue-600 dark:text-blue-400">📝 Nomor PR manual</span>');
                        $info.addClass('hidden');
                        if ($badge) $badge.addClass('hidden').html('');
                    }
                }).fail(() => {
                    $status.html('<span class="text-red-600">❌ Gagal memeriksa</span>');
                    $info.addClass('hidden');
                });
            });
        }

        // ════════════════════════════════════════════════════════════
        // FILTER HELPERS
        // ════════════════════════════════════════════════════════════
        function getQS() {
            const p = new URLSearchParams();
            const q = document.getElementById('searchInput').value.trim();
            const pic = document.getElementById('filterPic').value;
            const vendor = document.getElementById('filterVendor').value;
            const d = document.getElementById('dariInput').value;
            const s = document.getElementById('sampaiInput').value;
            if (q) p.set('search', q); if (pic) p.set('pic', pic); if (vendor) p.set('vendor', vendor); if (d) p.set('dari', d); if (s) p.set('sampai', s);
            return p.toString();
        }
        function doSearch() { const qs = getQS(); window.location.href = qs ? `/spph?${qs}` : '/spph'; }
        function doExport() { const qs = getQS(); window.location.href = qs ? `/spph/export?${qs}` : '/spph/export'; }
        function clearSearch() { document.getElementById('searchInput').value = ''; doSearch(); }
        function clearPic() { document.getElementById('filterPic').value = ''; doSearch(); }
        function clearVendor() { document.getElementById('filterVendor').value = ''; doSearch(); }
        function clearDate() { document.getElementById('dariInput').value = ''; document.getElementById('sampaiInput').value = ''; doSearch(); }
        function setQuickDate(t) {
            const d = document.getElementById('dariInput'), s = document.getElementById('sampaiInput'), n = new Date(), y = n.getFullYear(), m = String(n.getMonth() + 1).padStart(2, '0'), dd = String(n.getDate()).padStart(2, '0');
            if (t === 'today') { d.value = `${y}-${m}-${dd}`; s.value = `${y}-${m}-${dd}`; }
            else if (t === 'month') { d.value = `${y}-${m}-01`; s.value = `${y}-${m}-${new Date(y, n.getMonth() + 1, 0).getDate()}`; }
            else if (t === 'year') { d.value = `${y}-01-01`; s.value = `${y}-12-31`; }
            doSearch();
        }
        function resetDate() { clearDate(); }

        // ════════════════════════════════════════════════════════════
        // MODAL
        // ════════════════════════════════════════════════════════════
        function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById(id).classList.add('flex'); document.body.style.overflow = 'hidden'; modalOpen = true; startHb(); }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); document.getElementById(id).classList.remove('flex'); document.body.style.overflow = ''; modalOpen = false; stopHb(); }

        function openAddModal() {
            addIdx = 0;
            document.getElementById('addRows').innerHTML = '';
            addRow('add');
            document.getElementById('addForm').reset();
            document.getElementById('nomorStatus').innerHTML = '';

            $('#addDeskripsi').val('');
            $('#addDeskripsiBadge').addClass('hidden').html('');

            setPrMode('ppbj');
            $('#ppbjSelect').val(null).trigger('change');
            $('#nomorPrManual').val('');
            $('#ppbjInfo').addClass('hidden');
            $('#ppbjStatus').html('');
            $('#nomorPrFinal').val('');
            $('#nomorPrType').val('ppbj');

            for (let k in rtSavedSel) { if (k.startsWith('rt-a-')) delete rtSavedSel[k]; }
            for (let k in sizeDebounce) { if (k.startsWith('rt-a-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }

            loadSuggestions();
            openModal('addModal');
        }

        async function openEditModal(id, nomor, tgl, nomorPr, vendorNames, deskripsi, pic) {
            document.getElementById('editForm').action = `/spph/${id}`;
            document.getElementById('editId').value = id;
            document.getElementById('editNomor').value = nomor;
            document.getElementById('editTanggal').value = tgl || '';

            // ✅ FIX: Simpan deskripsi asli dari database
            const originalDeskripsi = deskripsi || '';
            document.getElementById('editDeskripsi').value = originalDeskripsi;

            $('#editDeskripsiBadge').addClass('hidden').html('');

            $('#editPpbjSelect').val(null).trigger('change.select2');
            $('#editNomorPrManual').val('');
            $('#editPpbjInfo').addClass('hidden');
            $('#editPpbjStatus').html('');
            $('#editNomorPrFinal').val('');

            if (nomorPr && nomorPr !== 'null' && nomorPr.trim()) {
                $.get(PPBJ_CHECK_URL, { ppbj_no: nomorPr }, function (data) {
                    if (data.status === 'available' || data.status === 'already_linked') {
                        setEditPrMode('ppbj');

                        const o = new Option(nomorPr, nomorPr, true, true);
                        o.is_ppbj = true;
                        o.text = nomorPr + (data.uraian ? ' — ' + data.uraian.substring(0, 40) : '');
                        o.uraian = data.uraian;
                        $('#editPpbjSelect').append(o).trigger('change');

                        // ✅ FIX: Gunakan uraian PPBJ jika ada, JIKA TIDAK gunakan deskripsi asli dari DB
                        if (data.uraian) {
                            $('#editDeskripsi').val(data.uraian);
                            showDeskripsiBadge($('#editDeskripsiBadge'), data.uraian, data.status === 'already_linked');
                        } else {
                            // ✅ Jika PPBJ tidak punya uraian, PERTAHANKAN deskripsi dari database!
                            $('#editDeskripsi').val(originalDeskripsi);
                        }
                    } else {
                        setEditPrMode('manual');
                        $('#editNomorPrManual').val(nomorPr);
                        updateEditPrFinalValue();

                        // ✅ Pastikan deskripsi tetap dari database
                        $('#editDeskripsi').val(originalDeskripsi);
                    }
                }).fail(() => {
                    setEditPrMode('manual');
                    $('#editNomorPrManual').val(nomorPr);
                    updateEditPrFinalValue();

                    // ✅ Pastikan deskripsi tetap dari database saat gagal
                    $('#editDeskripsi').val(originalDeskripsi);
                });
            } else {
                setEditPrMode('ppbj');
            }

            const $ev = $('#editVendor'), $pc = $('#editPic');
            const vendorsForEdit = Array.isArray(vendorNames) ? vendorNames : [vendorNames].filter(Boolean);
            vendorsForEdit.forEach(vendor => {
                if (vendor && $ev.find(`option[value="${vendor}"]`).length === 0) {
                    $ev.append(new Option(vendor, vendor, true, true));
                }
            });
            $ev.val(vendorsForEdit).trigger('change');
            $pc.val(pic).trigger('change');
            document.getElementById('editNomor').dispatchEvent(new Event('input'));
            editIdx = 5000;
            document.getElementById('editRows').innerHTML = '...';

            for (let k in rtSavedSel) { if (k.startsWith('rt-e-')) delete rtSavedSel[k]; }
            for (let k in sizeDebounce) { if (k.startsWith('rt-e-')) { clearTimeout(sizeDebounce[k]); delete sizeDebounce[k]; } }

            openModal('editModal');
            await loadEditItems(id);
        }

        async function loadEditItems(spphId) {
            try {
                const r = await fetch(`${ITEMS_BASE}${spphId}/items`); const data = await r.json();
                document.getElementById('editRows').innerHTML = '';
                (data.length ? data : [null]).forEach(item => addRow('edit', item));
            } catch { document.getElementById('editRows').innerHTML = '<p class="text-red-500 text-xs p-2">Gagal memuat data barang.</p>'; }
        }

        function confirmDelete(e) {
            e.preventDefault();
            Swal.fire({ title: 'Hapus SPPH?', text: 'Data akan dihapus permanen!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Hapus!', cancelButtonText: 'Batal', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' }).then(r => { if (r.isConfirmed) e.target.closest('form').submit(); });
            return false;
        }

        // ════════════════════════════════════════════════════════════
        // RICH TEXT EDITOR
        // ════════════════════════════════════════════════════════════
        const RT_FONTS = ['Arial', 'Times New Roman', 'Calibri', 'Courier New', 'Verdana', 'Tahoma', 'Georgia', 'Cambria', 'Segoe UI', 'Consolas', 'Trebuchet MS'];
        const RT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 48, 56, 64, 72, 96];
        const rtSavedSel = {}; let sizeDebounce = {};

        function rtSaveSel(edId) { try { const sel = window.getSelection(); if (sel.rangeCount > 0) { const ed = document.getElementById(edId); if (ed && ed.contains(sel.anchorNode)) rtSavedSel[edId] = sel.getRangeAt(0).cloneRange(); } } catch (e) { } }
        function rtRestoreSel(edId) { try { const ed = document.getElementById(edId); if (!ed || !rtSavedSel[edId]) return false; const range = rtSavedSel[edId]; if (!ed.contains(range.startContainer) || !ed.contains(range.endContainer)) { delete rtSavedSel[edId]; return false; } ed.focus(); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); return true; } catch (e) { return false; } }

        function buildRtToolbar(edId) {
            const fontOpts = RT_FONTS.map(f => `<option value="${f}">${f}</option>`).join('');
            return `<div class="rt-toolbar" data-rt="${edId}"><div class="rt-group"><select class="rt-font-select" title="Font" onchange="rtApplyFont(this,'${edId}')"><option value="">Font...</option>${fontOpts}</select></div><div class="rt-sep"></div><div class="rt-group"><div class="rt-size-wrap" title="Ukuran Font"><input type="text" class="rt-size-input" value="9" id="sz-${edId}" onkeydown="rtSizeKey(event,'${edId}')" oninput="rtSizeInput('${edId}')" onfocus="rtSaveSel('${edId}')"><div class="rt-size-arrows"><div class="arr-up" onmousedown="event.preventDefault();rtSizeStep('${edId}',1)">▲</div><div class="arr-dn" onmousedown="event.preventDefault();rtSizeStep('${edId}',-1)">▼</div></div></div></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="bold" title="Tebal"><b>B</b></button><button type="button" class="rt-btn" data-cmd="italic" title="Miring"><i>I</i></button><button type="button" class="rt-btn" data-cmd="underline" title="Garis Bawah"><u>U</u></button><button type="button" class="rt-btn" data-cmd="strikeThrough" title="Coret"><s>S</s></button></div><div class="rt-sep"></div><div class="rt-group"><div class="rt-color-wrap" title="Warna Teks" onclick="document.getElementById('tc-${edId}').click()"><span class="rt-color-icon">A</span><span class="rt-color-bar" id="tcBar-${edId}" style="background:#000000"></span><input type="color" id="tc-${edId}" value="#000000" oninput="rtApplyColor(this,'${edId}','fore')"></div><div class="rt-hl-wrap" title="Highlight" onclick="document.getElementById('hl-${edId}').click()"><span style="font-size:11px;font-weight:700;pointer-events:none">ab</span><input type="color" id="hl-${edId}" value="#FFFF00" oninput="rtApplyColor(this,'${edId}','bg')"></div></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="justifyLeft" title="Rata Kiri"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="0" y="4" width="9" height="1.5" rx=".5"/><rect x="0" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyCenter" title="Rata Tengah"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="2.5" y="4" width="9" height="1.5" rx=".5"/><rect x="1.5" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyRight" title="Rata Kanan"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="5" y="4" width="9" height="1.5" rx=".5"/><rect x="3" y="8" width="11" height="1.5" rx=".5"/></svg></button><button type="button" class="rt-btn" data-cmd="justifyFull" title="Rata Kiri-Kanan"><svg viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="0" width="14" height="1.5" rx=".5"/><rect x="0" y="4" width="14" height="1.5" rx=".5"/><rect x="0" y="8" width="14" height="1.5" rx=".5"/></svg></button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="insertUnorderedList" title="Bullet" style="font-size:12px">•≡</button><button type="button" class="rt-btn" data-cmd="insertOrderedList" title="Number" style="font-size:10px">1.</button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="undo" title="Undo"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 106-5.5H5"/><polyline points="2,4.5 5,7.5 5,4.5"/></svg></button><button type="button" class="rt-btn" data-cmd="redo" title="Redo"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8a5.5 5.5 0 11-6-5.5H11"/><polyline points="14,4.5 11,7.5 11,4.5"/></svg></button></div><div class="rt-sep"></div><div class="rt-group"><button type="button" class="rt-btn" data-cmd="removeFormat" title="Hapus Format" style="font-size:9px">✕fmt</button></div></div>`;
        }

        function rtApplyFont(sel, edId) { if (!sel.value) return; if (!rtRestoreSel(edId)) { sel.value = ''; return; } document.execCommand('fontName', false, sel.value); sel.value = ''; rtSaveSel(edId); syncHidden(edId); }
        function rtSizeInput(edId) { clearTimeout(sizeDebounce[edId]); sizeDebounce[edId] = setTimeout(() => { const inp = document.getElementById('sz-' + edId); if (!inp) return; let v = parseInt(inp.value, 10); if (!isNaN(v) && v > 0 && v <= 500) rtApplySizeToSaved(edId, v); }, 250); }
        function rtSizeKey(e, edId) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(sizeDebounce[edId]); const inp = document.getElementById('sz-' + edId); if (!inp) return; let v = parseInt(inp.value, 10); if (isNaN(v) || v < 1) v = 9; if (v > 500) v = 500; inp.value = v; rtRestoreSel(edId); } if (e.key === 'ArrowUp') { e.preventDefault(); rtSizeStep(edId, 1); } if (e.key === 'ArrowDown') { e.preventDefault(); rtSizeStep(edId, -1); } if (e.key === 'Escape') { e.preventDefault(); rtRestoreSel(edId); } }
        function rtSizeStep(edId, dir) { const inp = document.getElementById('sz-' + edId); if (!inp) return; let c = parseInt(inp.value, 10) || 9; c = Math.max(1, Math.min(500, c + dir)); inp.value = c; rtApplySizeToSaved(edId, c); }
        function rtApplySizeToSaved(edId, pt) { if (!rtSavedSel[edId]) return; const ed = document.getElementById(edId); if (!ed) return; try { const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rtSavedSel[edId]); if (sel.isCollapsed) sel.selectAllChildren(ed); const range = sel.getRangeAt(0), frag = range.extractContents(), w = document.createElement('span'); w.style.fontSize = pt + 'pt'; w.appendChild(frag); w.querySelectorAll('span').forEach(i => { i.style.removeProperty('font-size'); if (!i.style.cssText && !i.className && !i.id) { const p = i.parentNode; while (i.firstChild) p.insertBefore(i.firstChild, i); i.remove(); } }); w.querySelectorAll('font[size]').forEach(f => { const p = f.parentNode; while (f.firstChild) p.insertBefore(f.firstChild, f); f.remove(); }); range.insertNode(w); const nr = document.createRange(); nr.selectNodeContents(w); sel.removeAllRanges(); sel.addRange(nr); rtSavedSel[edId] = nr.cloneRange(); syncHidden(edId); } catch (e) { } }
        function rtApplyColor(input, edId, type) { if (!rtRestoreSel(edId)) return; if (type === 'fore') { const b = document.getElementById('tcBar-' + edId); if (b) b.style.background = input.value; document.execCommand('foreColor', false, input.value); } else { try { document.execCommand('hiliteColor', false, input.value); } catch (e) { document.execCommand('backColor', false, input.value); } } rtSaveSel(edId); syncHidden(edId); }

        function updateTbState(tb, edId) { const cmds = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'insertUnorderedList', 'insertOrderedList']; const ed = edId ? document.getElementById(edId) : null; const sel = window.getSelection(); const node = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : null; const el = node ? (node.nodeType === 3 ? node.parentElement : node) : null; tb.querySelectorAll('[data-cmd]').forEach(btn => { const cmd = btn.dataset.cmd; if (!cmds.includes(cmd)) return; let st = false; try { st = document.queryCommandState(cmd); } catch (e) { } if (!st && ed && el && ed.contains(el)) { if (cmd === 'subscript') st = !!el.closest('sub'); if (cmd === 'superscript') st = !!el.closest('sup'); } btn.classList.toggle('rt-active', st); }); if (edId) { try { const inp = document.getElementById('sz-' + edId); if (inp && document.activeElement !== inp && el && ed && ed.contains(el)) { const fs = window.getComputedStyle(el).fontSize; if (fs) { const px = parseFloat(fs), pt = Math.round(px * 0.75); if (!isNaN(pt) && pt > 0) inp.value = RT_SIZES.reduce((p, c) => Math.abs(c - pt) < Math.abs(p - pt) ? c : p); } } } catch (e) { } } }

        function initRt(editorId) {
            const ed = document.getElementById(editorId), tb = document.querySelector(`[data-rt="${editorId}"]`); if (!ed || !tb) return;
            ed.addEventListener('mouseup', () => rtSaveSel(editorId)); ed.addEventListener('keyup', () => rtSaveSel(editorId));
            tb.querySelectorAll('[data-cmd]').forEach(btn => { btn.addEventListener('mousedown', e => { e.preventDefault(); if (document.activeElement && document.activeElement.id === 'sz-' + editorId) { clearTimeout(sizeDebounce[editorId]); rtRestoreSel(editorId); } try { document.execCommand(btn.dataset.cmd, false, null); } catch (e2) { } syncHidden(editorId); requestAnimationFrame(() => updateTbState(tb, editorId)); rtSaveSel(editorId); }); });
            ['keyup', 'mouseup', 'click', 'input'].forEach(ev => ed.addEventListener(ev, () => { syncHidden(editorId); updateTbState(tb, editorId); }));
            ed.addEventListener('paste', e => { e.preventDefault(); const html = (e.clipboardData || window.clipboardData).getData('text/html'); if (html) { document.execCommand('insertHTML', false, html.replace(/<\/?(meta|link|style|script)[^>]*>/gi, '')); } else { document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain')); } syncHidden(editorId); });
            const inp = document.getElementById('sz-' + editorId); if (inp) inp.value = '9';
        }

        function syncHidden(editorId) { const ed = document.getElementById(editorId), hd = document.getElementById('hid-' + editorId); if (ed && hd) hd.value = ed.innerHTML; }
        function syncAll(formEl) { formEl.querySelectorAll('.rt-editor').forEach(ed => syncHidden(ed.id)); }
        function setRt(editorId, html) { const ed = document.getElementById(editorId); if (ed) { ed.innerHTML = html || ''; syncHidden(editorId); } }

        function removeRow(btn) {
            const row = btn.closest('.item-row'), wrapper = row.closest('#addRows, #editRows');
            if (wrapper.querySelectorAll('.item-row').length <= 1) { Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Minimal 1 baris!', showConfirmButton: false, timer: 2000 }); return; }
            const editor = row.querySelector('.rt-editor'); if (editor) { const edId = editor.id; delete rtSavedSel[edId]; if (sizeDebounce[edId]) { clearTimeout(sizeDebounce[edId]); delete sizeDebounce[edId]; } }
            row.remove(); renumber(wrapper);
        }

        function buildSatOpts(s) { return SATUANS.map(v => `<option value="${escapedHtml(v)}"${v === s ? ' selected' : ''}>${escapedHtml(v)}</option>`).join(''); }
        function addRow(mode, item = null) {
            const wrapper = document.getElementById(mode === 'add' ? 'addRows' : 'editRows'), idx = mode === 'add' ? addIdx++ : editIdx++;
            const ns = mode === 'add' ? 'a' : 'e', rowNum = wrapper.querySelectorAll('.item-row').length + 1, edId = `rt-${ns}-${idx}`;
            wrapper.insertAdjacentHTML('beforeend', `<div class="item-row" data-idx="${idx}"><span class="row-badge">${rowNum}</span><button type="button" class="btn-rm" onclick="removeRow(this)">×</button><div class="mt-1.5"><span class="item-label">Nama Barang / Jasa</span>${buildRtToolbar(edId)}<div class="rt-editor" contenteditable="true" id="${edId}" data-ph="Ketik nama barang / jasa..."></div><input type="hidden" name="items[${idx}][nama_barang]" id="hid-${edId}"></div><div class="item-grid mt-1.5"><div><span class="item-label">Satuan</span><select name="items[${idx}][satuan]" class="m-select" style="width:100%"><option value="">— Pilih —</option>${buildSatOpts(item?.satuan || '')}</select></div><div><span class="item-label">Jumlah</span><input type="text" name="items[${idx}][jumlah]" value="${escapedHtml(item?.jumlah || '')}" placeholder="cth: 10" class="m-input"></div><div><span class="item-label">Tgl. Pemenuhan</span><input type="date" name="items[${idx}][tgl_pemenuhan]" value="${escapedHtml(item?.tgl_pemenuhan ? item.tgl_pemenuhan.substring(0, 10) : '')}" class="m-input"></div></div></div>`);
            renumber(wrapper); initRt(edId); if (item?.nama_barang) setRt(edId, item.nama_barang);
        }
        function renumber(w) { w.querySelectorAll('.item-row .row-badge').forEach((b, i) => b.textContent = i + 1); }

        // ════════════════════════════════════════════════════════════
        // NOMOR CHECK
        // ════════════════════════════════════════════════════════════
        function setStatus(inp, stEl, state, msg) { inp.classList.remove('nomor-input-ok', 'nomor-input-error', 'nomor-input-warn'); stEl.innerHTML = ''; if (!msg) return; const ic = { ok: '✅', duplicate: '❌', warn: '⚠️', checking: '🔄' }, cl = { ok: 'nomor-status-ok', duplicate: 'nomor-status-error', warn: 'nomor-status-warn', checking: 'text-gray-400' }, bd = { ok: 'nomor-input-ok', duplicate: 'nomor-input-error', warn: 'nomor-input-warn' }; if (bd[state]) inp.classList.add(bd[state]); stEl.innerHTML = `<span class="${cl[state] || ''}">${ic[state] || ''} ${escapedHtml(msg)}</span>`; }
        function attachCheck(inputId, statusId, getExcId) { const inp = document.getElementById(inputId), st = document.getElementById(statusId); inp.addEventListener('input', () => { const v = inp.value.trim(); if (!v) { setStatus(inp, st, null, ''); return; } setStatus(inp, st, 'checking', 'Memeriksa...'); clearTimeout(checkTimer); checkTimer = setTimeout(async () => { try { const r = await fetch(`${CHECK_URL}?nomor=${encodeURIComponent(v)}&exclude_id=${getExcId()}`); const d = await r.json(); if (d.status === 'duplicate') setStatus(inp, st, 'duplicate', d.message); else if (d.warning) setStatus(inp, st, 'warn', d.warning); else { setStatus(inp, st, 'ok', 'Tersedia ✓'); setTimeout(() => { if (st.textContent.includes('tersedia')) setStatus(inp, st, null, ''); }, 2000); } } catch { setStatus(inp, st, null, ''); } }, 400); }); }
        async function loadSuggestions() { const box = document.getElementById('suggBox'); try { const r = await fetch(SUGGEST_URL), data = await r.json(); box.innerHTML = data.last ? `<span class="text-xs text-gray-400 dark:text-gray-500 mr-1">Terakhir: <span class="font-mono font-semibold">${data.last}</span> →</span>` : '<span class="text-xs text-gray-400 mr-1">Saran:</span>'; data.suggestions.forEach(s => { const p = document.createElement('span'); p.className = 'suggest-pill'; p.textContent = '✨ ' + s; p.onclick = () => { document.getElementById('nomorSpphInput').value = s; document.getElementById('nomorSpphInput').dispatchEvent(new Event('input')); }; box.appendChild(p); }); } catch { box.innerHTML = '<span class="text-xs text-gray-400">Tidak bisa memuat saran</span>'; } }

        // ════════════════════════════════════════════════════════════
        // PRESENCE & HEARTBEAT
        // ════════════════════════════════════════════════════════════
        async function sendPres(url) { try { await fetch(url, { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content } }); } catch { } }
        async function pollPres() { try { const r = await fetch(PRESENCE_URL); if (!r.ok) return; const data = await r.json(), bar = document.getElementById('presenceBar'), txt = document.getElementById('presenceText'); if (data.users.length > 0) { txt.innerHTML = data.users.map(u => `<strong>${escapedHtml(u.name)}</strong>`).join(', ') + ' sedang menambahkan SPPH<span class="animate-pulse">...</span>'; bar.classList.remove('hidden'); } else { bar.classList.add('hidden'); } } catch { } }
        function startHb() { if (hbTimer) return; sendPres(PRES_START); hbTimer = setInterval(() => sendPres(PRES_START), 15000); }
        function stopHb() { if (hbTimer) { clearInterval(hbTimer); hbTimer = null; } sendPres(PRES_STOP); }

        // ════════════════════════════════════════════════════════════
        // POLLING
        // ════════════════════════════════════════════════════════════
        async function pollNow() {
            if (!IS_FIRST || HAS_FILTER) return;
            try {
                const r = await fetch(`${POLL_URL}?last_id=${lastId}`, { headers: { 'Accept': 'application/json' } });
                if (!r.ok) return;
                const data = await r.json();
                if (!data.rows?.length) return;

                const tbody = document.getElementById('spphBody');
                document.getElementById('emptyRow')?.remove();
                data.rows.forEach(row => {
                    if (document.querySelector(`tr[data-id="${Number(row.id)}"]`)) return;
                    lastId = Math.max(lastId, Number(row.id));
                    const tr = document.createElement('tr');
                    tr.className = 'tbl-row-hover new-row-flash';
                    tr.dataset.id = Number(row.id);
                    tr.dataset.pic = String(row.pic || '');
                    const vendorCount = Number(row.vendor_count || 1);
                    const vendorBadge = vendorCount > 1 ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-semibold mr-1">${vendorCount} vendor</span>` : '';
                    tr.innerHTML = `<td class="px-4 py-3 text-gray-400 text-xs font-mono">—</td><td class="px-4 py-3"><span class="badge-nomor inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">${escapedHtml(row.nomor_spph)}</span></td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">${escapedHtml(row.tanggal || '-')}</td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">${escapedHtml(row.nomor_pr)}</td><td class="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium text-xs">${escapedHtml(row.nama_vendor)}</td><td class="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs max-w-xs truncate">${escapedHtml(row.deskripsi_pengadaan)}</td><td class="px-4 py-3"><span class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">${escapedHtml(row.pic)}</span></td><td class="px-4 py-3 text-center"><button type="button" onclick="shareRecordToChat('spph', ${Number(row.id)})" class="px-2 py-1 rounded-lg text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-semibold" title="Bagikan SPPH ke Chat Tim">💬</button></td>`;
                    if (tr.children[4]) {
                        tr.children[4].innerHTML = vendorBadge + escapedHtml(row.vendor_label || row.nama_vendor);
                    }
                    tbody.insertBefore(tr, tbody.firstChild);
                    Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: `📋 SPPH baru: ${String(row.nomor_spph || '')}`, showConfirmButton: false, timer: 3000, timerProgressBar: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                });
                const c = document.getElementById('totalCount');
                if (c) c.textContent = parseInt(c.textContent) + data.rows.length;
            } catch { }
        }

        // ════════════════════════════════════════════════════════════
        // ONBOARDING TUTORIAL
        // ════════════════════════════════════════════════════════════
        let obCurrentStep = 1;
        let isFirstOpen = true;
        let obFinished = false;

        function getCsrfToken() {
            const meta = document.querySelector('meta[name="csrf-token"]');
            return meta ? meta.content : '';
        }

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
                    fetch('/spph/onboarding-view?t=' + Date.now(), {
                        method: 'POST',
                        headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' }
                    }).then(r => r.json()).then(data => {
                        if (data.status === 'finished') { obFinished = true; }
                    }).catch(() => { });
                }
                isFirstOpen = false;
            } catch (e) { console.error('[OB] Error showOnboarding:', e); }
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
                fetch('/spph/onboarding-seen?t=' + Date.now(), {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Content-Type': 'application/json' }
                }).catch(() => { });
            } catch (e) { console.error('[OB] Error closeOnboarding:', e); }
        }

        function finishOnboarding() {
            try {
                const card = document.querySelector('.onboarding-card');
                if (card) {
                    const confetti = document.createElement('div');
                    confetti.className = 'ob-confetti';
                    const colors = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];
                    for (let i = 0; i < 30; i++) {
                        const piece = document.createElement('div');
                        piece.className = 'ob-confetti-piece';
                        piece.style.left = Math.random() * 100 + '%';
                        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                        piece.style.animationDelay = Math.random() * 0.5 + 's';
                        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
                        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                        confetti.appendChild(piece);
                    }
                    card.appendChild(confetti);
                }
                setTimeout(() => closeOnboarding(), 600);
            } catch (e) { closeOnboarding(); }
        }

        function nextObStep(step) { obCurrentStep = step; updateObSteps(); }
        function prevObStep(step) { obCurrentStep = step; updateObSteps(); }

        function updateObSteps() {
            document.querySelectorAll('.ob-step').forEach(el => {
                el.classList.remove('active');
                if (parseInt(el.dataset.step) === obCurrentStep) el.classList.add('active');
            });
            document.querySelectorAll('.ob-progress-dot').forEach(dot => {
                const dotNum = parseInt(dot.dataset.dot);
                dot.classList.remove('active', 'done');
                if (dotNum < obCurrentStep) dot.classList.add('done');
                if (dotNum === obCurrentStep) dot.classList.add('active');
            });
        }

        function showFloatBtn() {
            const btn = document.getElementById('onboardingFloatBtn');
            if (btn && !obFinished) { btn.style.display = 'flex'; btn.style.visibility = 'visible'; }
        }

        function hideFloatBtn() {
            const btn = document.getElementById('onboardingFloatBtn');
            if (btn) { btn.style.display = 'none'; btn.style.visibility = 'hidden'; }
        }

        async function checkOnboardingStatus() {
            try {
                const response = await fetch('/spph/onboarding-status?t=' + Date.now(), { headers: { 'X-CSRF-TOKEN': getCsrfToken() } });
                if (!response.ok) return;
                const data = await response.json();
                if (data.finished) { hideFloatBtn(); return; }
                if (!data.seen) { setTimeout(() => showOnboarding(), 1000); return; }
                if (data.seen && data.left > 0) { showFloatBtn(); return; }
                hideFloatBtn();
            } catch (e) { console.error('[OB] Error:', e); }
        }

        // ════════════════════════════════════════════════════════════
        // INIT
        // ════════════════════════════════════════════════════════════
        $(document).ready(function () {
            initPpbjSelect2('.ppbj-select', 'ppbjInfo', 'ppbjStatus', 'ppbjInfoContent', () => updatePrFinalValue(), 'addDeskripsi', 'addDeskripsiBadge');
            initPpbjSelect2('.edit-ppbj-select', 'editPpbjInfo', 'editPpbjStatus', 'editPpbjInfoContent', () => updateEditPrFinalValue(), 'editDeskripsi', 'editDeskripsiBadge');

            $('#vendorSelect option[value=""], #vendorSelect option[value="__tambah__"], #editVendor option[value=""]').remove();
            $('#newVendorBox').remove();

            const cfg = ph => ({ placeholder: ph, allowClear: true, width: '100%', minimumResultsForSearch: 8 });
            const vendorCfg = ph => ({ placeholder: ph, allowClear: true, width: '100%', tags: true, tokenSeparators: ['|'], minimumResultsForSearch: 0 });
            $('.vendor-select').select2(vendorCfg('-- Pilih satu atau banyak vendor --'));
            $('.pic-select').select2(cfg('-- Pilih PIC --'));
            $('.edit-vendor-select').select2(vendorCfg('-- Pilih satu atau banyak vendor --'));
            $('.edit-pic-select').select2(cfg('-- Pilih PIC --'));

            // MANUAL INPUT CHECK (ADD)
            $('#nomorPrManual').on('input', function () {
                updatePrFinalValue();
                const val = $(this).val().trim();
                const $s = $('#ppbjStatus');
                const $badge = $('#addDeskripsiBadge');
                const $input = $(this);

                if (!val) { $s.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '', 'background-color': '' }); return; }

                clearTimeout(window._prManualCheck);
                window._prManualCheck = setTimeout(() => {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                        if (d.status === 'available') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1 text-red-600 dark:text-red-400">Jangan tambahkan manual. Klik tombol <strong class="text-red-800 dark:text-red-200">"📋 Pilih PPBJ"</strong> di atas.</p></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'already_linked') {
                            $s.html(`<div class="p-2 bg-amber-50 dark:bg-amber-800 border border-amber-200 dark:border-amber-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong><p class="text-xs mt-1 text-amber-600 dark:text-amber-400">PPBJ ini sudah terhubung dengan SPPH lain.</p></div></div></div>`);
                            $input.css({ 'border-color': '#f59e0b' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'cancelled') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else {
                            $s.html(`<div class="p-2 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Nomor PR manual — aman</span></div></div>`);
                            $input.css({ 'border-color': '#22c55e' }); $badge.addClass('hidden').html('');
                        }
                    }).fail(() => { $s.html(`<div class="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"><span class="text-sm text-gray-500 dark:text-gray-400">📝 Tidak bisa memeriksa status</span></div>`); $input.css({ 'border-color': '', 'background-color': '' }); });
                }, 500);
            });

            $('#nomorPrManual').on('blur', function () {
                if (!$(this).val().trim()) { $(this).css({ 'border-color': '', 'background-color': '' }); $('#ppbjStatus').html(''); }
            });

            // MANUAL INPUT CHECK (EDIT)
            $('#editNomorPrManual').on('input', function () {
                updateEditPrFinalValue();
                const val = $(this).val().trim();
                const $s = $('#editPpbjStatus');
                const $badge = $('#editDeskripsiBadge');
                const $input = $(this);

                if (!val) { $s.html(''); $badge.addClass('hidden').html(''); $input.css({ 'border-color': '', 'background-color': '' }); return; }

                clearTimeout(window._editPrManualCheck);
                window._editPrManualCheck = setTimeout(() => {
                    $.get(PPBJ_CHECK_URL, { ppbj_no: val }, function (d) {
                        if (d.status === 'available') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">⚠️ Nomor ini ada di database PPBJ!</strong><p class="text-xs mt-1">Gunakan mode <strong>"Pilih PPBJ"</strong>.</p></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'already_linked') {
                            $s.html(`<div class="p-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="text-amber-700 dark:text-amber-300"><strong class="block text-sm">⚠️ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#f59e0b' }); $badge.addClass('hidden').html('');
                        } else if (d.status === 'cancelled') {
                            $s.html(`<div class="p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg><div class="text-red-700 dark:text-red-300"><strong class="block text-sm">❌ ${d.message}</strong></div></div></div>`);
                            $input.css({ 'border-color': '#ef4444' }); $badge.addClass('hidden').html('');
                        } else {
                            $s.html(`<div class="p-2 bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center gap-2"><svg class="w-4 h-4 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm font-semibold text-green-700 dark:text-green-300">📝 Nomor PR manual — aman</span></div></div>`);
                            $input.css({ 'border-color': '#22c55e' }); $badge.addClass('hidden').html('');
                        }
                    }).fail(() => { $s.html(`<div class="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"><span class="text-sm text-gray-500 dark:text-gray-400">📝 Tidak bisa memeriksa</span></div>`); $input.css({ 'border-color': '', 'background-color': '' }); });
                }, 500);
            });

            $('#editNomorPrManual').on('blur', function () {
                if (!$(this).val().trim()) { $(this).css({ 'border-color': '', 'background-color': '' }); $('#editPpbjStatus').html(''); }
            });

            attachCheck('nomorSpphInput', 'nomorStatus', () => 0);
            attachCheck('editNomor', 'editNomorStatus', () => document.getElementById('editId').value || 0);

            document.getElementById('addForm').addEventListener('submit', function (e) {
                syncAll(this);
                updatePrFinalValue();
                if (document.getElementById('nomorStatus').innerHTML.includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'Nomor SPPH Duplikat!', icon: 'error', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
                if (currentPrMode === 'manual') {
                    const manualVal = $('#nomorPrManual').val().trim();
                    const $status = $('#ppbjStatus');
                    if (manualVal && ($status.html().includes('ada di database PPBJ') || $status.html().includes('⚠️') || $status.html().includes('sudah terhubung'))) {
                        e.preventDefault();
                        Swal.fire({ title: '⚠️ Nomor PR Tidak Valid untuk Manual!', html: `Nomor <strong class="font-mono">${manualVal}</strong> ada di database PPBJ.<br><br>Gunakan mode <strong>"📋 Pilih PPBJ"</strong>.`, icon: 'warning', confirmButtonColor: '#6366f1', confirmButtonText: 'Mengerti', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                        return;
                    }
                }
                if (document.getElementById('ppbjStatus').innerHTML.includes('❌')) {
                    e.preventDefault();
                    Swal.fire({ title: 'PPBJ Tidak Valid!', icon: 'warning', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                    return;
                }
            });

            document.getElementById('editForm').addEventListener('submit', function (e) { syncAll(this); updateEditPrFinalValue(); });

            document.getElementById('spphBody').addEventListener('click', function (e) {
                const b = e.target.closest('.badge-nomor');
                if (b) {
                    navigator.clipboard.writeText(b.textContent.trim());
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Nomor disalin!', showConfirmButton: false, timer: 1500, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' });
                }
            });

            document.getElementById('searchInput').addEventListener('input', function () {
                document.getElementById('searchSpinner').classList.remove('hidden');
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => { document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }, 500);
            });
            document.getElementById('searchInput').addEventListener('keydown', function (e) {
                if (e.key === 'Enter') { e.preventDefault(); clearTimeout(searchTimer); document.getElementById('searchSpinner').classList.add('hidden'); doSearch(); }
            });

            document.getElementById('filterPic').addEventListener('change', doSearch);
            document.getElementById('filterVendor').addEventListener('change', doSearch);
            document.getElementById('dariInput').addEventListener('change', doSearch);
            document.getElementById('sampaiInput').addEventListener('change', doSearch);

            if (IS_FIRST && !HAS_FILTER && !document.hidden) { pollNow(); pollTimer = setInterval(pollNow, 15000); }
            if (!document.hidden) { pollPres(); presTimer = setInterval(pollPres, 15000); }
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) { clearInterval(pollTimer); clearInterval(presTimer); }
                else {
                    if (IS_FIRST && !HAS_FILTER) { pollNow(); pollTimer = setInterval(pollNow, 15000); }
                    pollPres(); presTimer = setInterval(pollPres, 15000);
                }
            });
            window.addEventListener('beforeunload', () => {
                if (modalOpen) {
                    const fd = new FormData();
                    fd.append('_token', document.querySelector('meta[name="csrf-token"]').content);
                    navigator.sendBeacon(PRES_STOP, fd);
                }
            });

            checkOnboardingStatus();
        });
    </script>
@endpush
