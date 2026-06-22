@extends('layouts.app')

@section('title', 'Approval PR (Umum)')

@section('content')
    {{-- HEADER --}}
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="text-3xl">✅</span>
            Approval Penerimaan PR
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Konfirmasi penerimaan PR oleh Department Umum
        </p>
    </div>

    {{-- ALERTS --}}
    @if(session('success'))
        <div id="alert-success"
            class="mb-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-l-4 border-green-500 flex items-start gap-3 animate-slide-in-right">
            <svg class="w-6 h-6 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="flex-1">
                <p class="font-semibold">Berhasil!</p>
                <p class="text-sm mt-1">{{ session('success') }}</p>
            </div>
            <button onclick="this.closest('#alert-success').remove()" class="text-green-500 hover:text-green-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    @endif

    @if(session('warning'))
        <div id="alert-warning"
            class="mb-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-l-4 border-yellow-500 flex items-start gap-3 animate-slide-in-right">
            <svg class="w-6 h-6 flex-shrink-0 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                </path>
            </svg>
            <div class="flex-1">
                <p class="font-semibold">Peringatan!</p>
                <p class="text-sm mt-1">{{ session('warning') }}</p>
            </div>
            <button onclick="this.closest('#alert-warning').remove()" class="text-yellow-500 hover:text-yellow-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    @endif

    @if(session('error'))
        <div id="alert-error"
            class="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-l-4 border-red-500 flex items-start gap-3 animate-slide-in-right">
            <svg class="w-6 h-6 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="flex-1">
                <p class="font-semibold">Error!</p>
                <p class="text-sm mt-1">{{ session('error') }}</p>
            </div>
            <button onclick="this.closest('#alert-error').remove()" class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    @endif

    {{-- FILTER FORM --}}
    <form method="GET"
        class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label
                    class="block text-xs font-semibold dark:bg-gray-900 text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    🔍 Cari Nomor PR
                </label>
                <input type="text" name="q" placeholder="Ketik nomor PR..." value="{{ request('q') }}"
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl
                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                   placeholder-gray-400 dark:placeholder-gray-600
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            </div>

            <div class="dark:bg-gray-900">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    📊 Status
                </label>
                <select name="status"
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl
                                                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="PENDING" @selected(request('status', 'PENDING') === 'PENDING')>⏳ PENDING</option>
                    <option value="APPROVED" @selected(request('status') === 'APPROVED')>✓ APPROVED</option>
                    <option value="REJECTED" @selected(request('status') === 'REJECTED')>✗ REJECTED</option>
                </select>
            </div>

            <div class="flex items-end gap-3">
                <button type="submit"
                    class="flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl
                                                   shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                        </path>
                    </svg>
                    Filter
                </button>
                <a href="{{ route('approval.pr.index') }}"
                    class="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl
                                                   hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
                    Reset
                </a>
            </div>
        </div>
    </form>

    {{-- TABLE --}}
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Menampilkan
                <span class="font-bold text-blue-600 dark:text-blue-400">{{ $rows->firstItem() ?? 0 }}</span>
                -
                <span class="font-bold text-blue-600 dark:text-blue-400">{{ $rows->lastItem() ?? 0 }}</span>
                dari
                <span class="font-bold text-blue-600 dark:text-blue-400">{{ $rows->total() }}</span>
                data
            </p>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full w-full">
                <thead class="bg-gray-50 border dark:bg-gray-900">
                    <tr>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Nomor PR</th>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Tujuan Pengadaan</th>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Diajukan Oleh</th>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Waktu Request</th>
                        <th
                            class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Status</th>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Diproses Oleh</th>
                        <th
                            class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Waktu Proses</th>
                        <th
                            class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Aksi</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    @forelse($rows as $row)
                        @php
                            $isResubmit = !is_null($row->previous_rejection_id);
                            $previousRejection = $isResubmit ? \App\Models\PrReceiptApproval::find($row->previous_rejection_id) : null;
                            $prDetailJson = json_encode([
                                'id' => $row->id,
                                'nomor_pr' => $row->torpr->nomor_pr ?? '-',
                                'tujuan_pengadaan' => $row->torpr->tujuan_pengadaan ?? '-',
                                'keterangan' => $row->torpr->keterangan ?? '-',
                                'requested_name' => $row->requested_name ?? '-',
                                'requested_at' => $row->requested_at?->format('d M Y H:i') ?? '-',
                                'status' => $row->status,
                                'approved_by' => $row->status === 'APPROVED' && $row->approvedBy ? $row->approvedBy->name : null,
                                'approved_at' => $row->status === 'APPROVED' ? ($row->approved_at?->format('d M Y H:i') ?? null) : null,
                                'rejected_by' => $row->status === 'REJECTED' && $row->rejectedBy ? $row->rejectedBy->name : null,
                                'rejected_at' => $row->status === 'REJECTED' ? ($row->rejected_at?->format('d M Y H:i') ?? null) : null,
                                'rejected_reason' => $row->rejected_reason ?? null,
                            ]);
                        @endphp

                        <tr
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors {{ $isResubmit ? 'bg-amber-50 dark:bg-amber-900/10' : '' }}">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    @if($isResubmit)
                                        <span
                                            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            RESUBMIT
                                        </span>
                                    @endif
                                    <span class="font-mono font-bold text-gray-900 dark:text-white">
                                        {{ $row->torpr->nomor_pr ?? '—' }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4">
                                <p class="text-sm text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
                                    {{ $row->torpr->tujuan_pengadaan ?? '—' }}
                                </p>
                                <button type="button"
                                    class="btn-detail-pr inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 border border-blue-200 dark:border-blue-800"
                                    data-pr-detail="{{ $prDetailJson }}">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                        </path>
                                    </svg>
                                    Lihat Detail
                                </button>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <div
                                        class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">
                                            {{ $row->requested_name ?? '—' }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-500">
                                            @if($row->requestedBy)
                                                {{ $row->requestedBy->name }}
                                            @else
                                                Operasional
                                            @endif
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {{ $row->requested_at?->format('d M Y H:i') ?? '—' }}
                                </div>
                            </td>

                            <td class="py-4 text-center w-1 whitespace-nowrap">
                                @if($row->status === 'PENDING')
                                    <span
                                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500 text-white">⏳
                                        PENDING</span>
                                @elseif($row->status === 'APPROVED')
                                    <span
                                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-600 text-white">✓
                                        APPROVED</span>
                                @elseif($row->status === 'REJECTED')
                                    <span
                                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-600 text-white">✗
                                        REJECTED</span>
                                @endif
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($row->status === 'APPROVED' && $row->approvedBy)
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span
                                            class="text-sm font-medium text-green-700 dark:text-green-400">{{ $row->approvedBy->name }}</span>
                                    </div>
                                @elseif($row->status === 'REJECTED' && $row->rejectedBy)
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </div>
                                        <span
                                            class="text-sm font-medium text-red-700 dark:text-red-400">{{ $row->rejectedBy->name }}</span>
                                    </div>
                                @else
                                    <span class="text-sm text-gray-400 dark:text-gray-600">—</span>
                                @endif
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($row->status === 'APPROVED')
                                    <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ $row->approved_at?->format('d M Y H:i') ?? '—' }}
                                    </div>
                                @elseif($row->status === 'REJECTED')
                                    <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ $row->rejected_at?->format('d M Y H:i') ?? '—' }}
                                    </div>
                                @else
                                    <span class="text-sm text-gray-400 dark:text-gray-600">—</span>
                                @endif
                            </td>

                            <td class="px-6 py-4 text-center">
                                @if($row->status === 'PENDING')
                                    <div class="inline-flex gap-2">
                                        <button onclick="approveReceipt({{ $row->id }})"
                                            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Setujui
                                        </button>
                                        <button onclick="rejectReceipt({{ $row->id }})"
                                            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Tolak
                                        </button>
                                    </div>
                                @else
                                    <span class="text-xs text-gray-500 dark:text-gray-600 italic">Sudah diproses</span>
                                @endif
                            </td>
                        </tr>

                        {{-- RESUBMIT HISTORY ROW --}}
                        @if($isResubmit && $previousRejection)
                            <tr
                                class="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 border-t-2 border-amber-300 dark:border-amber-700">
                                <td colspan="8" class="px-6 py-5">
                                    <div class="space-y-4">
                                        <div class="flex items-center gap-3 mb-3">
                                            <div
                                                class="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow-lg">
                                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="text-lg font-bold text-amber-900 dark:text-amber-200">📋 History Resubmit
                                                    - PR Ini Pernah Ditolak</h4>
                                                <p class="text-sm text-amber-700 dark:text-amber-400">Review kembali alasan
                                                    penolakan sebelumnya dan perbaikan yang sudah dilakukan</p>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div
                                                class="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-4">
                                                <div class="flex items-start gap-3 mb-3">
                                                    <div
                                                        class="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <p class="text-sm font-bold text-red-900 dark:text-red-200 mb-1">❌ Alasan
                                                            Penolakan Sebelumnya:</p>
                                                        <p class="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                                                            {{ $previousRejection->rejected_reason ?? 'Tidak ada alasan yang tercatat' }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="mt-3 pt-3 border-t border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-400">
                                                    <div class="flex items-center gap-2 mb-1">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                            </path>
                                                        </svg>
                                                        <strong>Ditolak oleh:</strong>
                                                        {{ $previousRejection->rejectedBy->name ?? 'Unknown' }}
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <strong>Waktu:</strong>
                                                        {{ $previousRejection->rejected_at?->format('d M Y H:i') ?? '—' }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-800 rounded-xl p-4">
                                                <div class="flex items-start gap-3 mb-3">
                                                    <div
                                                        class="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="flex-1">
                                                        <p class="text-sm font-bold text-green-900 dark:text-green-200 mb-1">✅
                                                            Perbaikan yang Sudah Dilakukan:</p>
                                                        <p class="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                                                            {{ $row->resubmit_notes ?? 'Tidak ada catatan perbaikan' }}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="mt-3 pt-3 border-t border-green-300 dark:border-green-800 text-xs text-green-700 dark:text-green-400">
                                                    <div class="flex items-center gap-2 mb-1">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                            </path>
                                                        </svg>
                                                        <strong>Diajukan ulang oleh:</strong> {{ $row->requested_name }}
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <strong>Waktu resubmit:</strong>
                                                        {{ $row->requested_at?->format('d M Y H:i') ?? '—' }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                            <div class="flex items-start gap-2">
                                                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div class="text-xs text-blue-800 dark:text-blue-300">
                                                    <p class="font-semibold mb-1">💡 Tips Review Resubmit:</p>
                                                    <ul class="space-y-0.5 ml-4 list-disc">
                                                        <li>Bandingkan alasan penolakan dengan perbaikan yang dilakukan</li>
                                                        <li>Pastikan semua poin penolakan sudah ditangani</li>
                                                        <li>Jika masih kurang, boleh reject lagi dengan alasan yang lebih spesifik
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endif

                        @if($row->status === 'REJECTED' && $row->rejected_reason && !$isResubmit)
                            <tr class="bg-red-50 dark:bg-red-900/10">
                                <td colspan="8" class="px-6 py-4">
                                    <div class="flex items-start gap-3 border-l-4 border-red-500 pl-4">
                                        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                            </path>
                                        </svg>
                                        <div class="flex-1">
                                            <p class="text-sm font-bold text-red-800 dark:text-red-300 mb-1">Alasan Penolakan:</p>
                                            <p class="text-sm text-red-700 dark:text-red-400">{{ $row->rejected_reason }}</p>
                                            <p class="text-xs text-red-600 dark:text-red-500 mt-2">
                                                <strong>Ditolak oleh:</strong> {{ $row->rejectedBy->name ?? 'Unknown' }} •
                                                <strong>Waktu:</strong> {{ $row->rejected_at?->format('d M Y H:i') ?? '—' }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endif
                    @empty
                        <tr>
                            <td colspan="8" class="px-6 py-16 text-center">
                                <div class="flex flex-col items-center gap-3">
                                    <svg class="w-16 h-16 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                        </path>
                                    </svg>
                                    <p class="text-lg font-bold text-gray-700 dark:text-gray-300">Tidak ada data PR Receipt</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-600">Belum ada request approval yang masuk
                                    </p>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-6">{{ $rows->links() }}</div>
@endsection

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        document.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-detail-pr');
            if (!btn) return;

            const data = JSON.parse(btn.dataset.prDetail);

            const nomorPr = escapeHtml(data.nomor_pr || '-');
            const tujuan = escapeHtml(data.tujuan_pengadaan || '-');
            const keterangan = escapeHtml(data.keterangan || '-');
            const requestedBy = escapeHtml(data.requested_name || '-');
            const requestedAt = escapeHtml(data.requested_at || '-');
            const status = data.status || 'PENDING';
            const rowId = data.id;

            const ketHtml = keterangan === '-'
                ? '<span class="pr-d-empty">Tidak ada keterangan</span>'
                : keterangan;

            // Status badge
            let statusBadge = '';
            if (status === 'PENDING') {
                statusBadge = '<span class="pr-d-badge pr-d-badge-pending">⏳ PENDING</span>';
            } else if (status === 'APPROVED') {
                statusBadge = '<span class="pr-d-badge pr-d-badge-approved">✓ APPROVED</span>';
            } else if (status === 'REJECTED') {
                statusBadge = '<span class="pr-d-badge pr-d-badge-rejected">✗ REJECTED</span>';
            }

            // Diproses oleh & waktu proses
            let processedBy = '—';
            let processedAt = '—';
            let processedClass = '';
            let reasonHtml = '';

            if (status === 'APPROVED') {
                processedBy = escapeHtml(data.approved_by || '—');
                processedAt = escapeHtml(data.approved_at || '—');
                processedClass = 'pr-d-footer-approved';
            } else if (status === 'REJECTED') {
                processedBy = escapeHtml(data.rejected_by || '—');
                processedAt = escapeHtml(data.rejected_at || '—');
                processedClass = 'pr-d-footer-rejected';
                if (data.rejected_reason) {
                    reasonHtml = `
                            <div class="pr-d-section">
                                <div class="pr-d-label">❌ Alasan Penolakan</div>
                                <div class="pr-d-box pr-d-box-reject">${escapeHtml(data.rejected_reason)}</div>
                            </div>
                        `;
                }
            }

            // Action buttons (only PENDING)
            let actionHtml = '';
            if (status === 'PENDING') {
                actionHtml = `
                        <div class="pr-d-actions">
                            <div class="pr-d-actions-label">Aksi</div>
                            <div class="pr-d-actions-btns">
                                <button type="button" class="pr-d-btn pr-d-btn-approve" onclick="Swal.close(); setTimeout(function(){ approveReceipt(${rowId}) }, 200)">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                    Setujui
                                </button>
                                <button type="button" class="pr-d-btn pr-d-btn-reject" onclick="Swal.close(); setTimeout(function(){ rejectReceipt(${rowId}) }, 200)">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    Tolak
                                </button>
                            </div>
                        </div>
                    `;
            } else {
                actionHtml = `
                        <div class="pr-d-actions">
                            <div class="pr-d-actions-label">Aksi</div>
                            <div class="pr-d-done">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                Sudah diproses
                            </div>
                        </div>
                    `;
            }

            const html = `
                    <div class="pr-d-wrap">
                        <div class="pr-d-nomor">
                            <div class="pr-d-nomor-label">Nomor PR</div>
                            <div class="pr-d-nomor-val">${nomorPr}</div>
                        </div>

                        <div class="pr-d-section">
                            <div class="pr-d-label">🎯 Tujuan Pengadaan</div>
                            <div class="pr-d-box">${tujuan}</div>
                        </div>

                        <div class="pr-d-section">
                            <div class="pr-d-label">📝 Keterangan Tambahan</div>
                            <div class="pr-d-box pr-d-box-sm">${ketHtml}</div>
                        </div>

                        ${reasonHtml}

                        <div class="pr-d-grid-4">
                            <div class="pr-d-footer">
                                <div class="pr-d-footer-label">Diajukan Oleh</div>
                                <div class="pr-d-footer-val">${requestedBy}</div>
                            </div>
                            <div class="pr-d-footer">
                                <div class="pr-d-footer-label">Waktu Request</div>
                                <div class="pr-d-footer-val">${requestedAt}</div>
                            </div>
                            <div class="pr-d-footer ${processedClass}">
                                <div class="pr-d-footer-label">Diproses Oleh</div>
                                <div class="pr-d-footer-val">${processedBy}</div>
                            </div>
                            <div class="pr-d-footer">
                                <div class="pr-d-footer-label">Waktu Proses</div>
                                <div class="pr-d-footer-val">${processedAt}</div>
                            </div>
                        </div>

                        <div class="pr-d-status-row">
                            <div class="pr-d-status-label">Status</div>
                            ${statusBadge}
                        </div>

                        ${actionHtml}
                    </div>
                `;

            Swal.fire({
                title: '📋 Detail Pengadaan PR',
                html: html,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    popup: 'swal2-pr-popup',
                    closeButton: 'swal2-pr-close',
                    title: 'swal2-pr-title'
                },
                backdrop: 'rgba(0,0,0,0.5)'
            });
        });

        window.approveReceipt = function (id) {
            Swal.fire({
                title: 'Approve Request?',
                html: 'Anda akan <strong>menyetujui</strong> penerimaan PR ini.<br><br>Lanjutkan?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '✓ Ya, Setujui',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Memproses...',
                        html: '<div style="display:flex;justify-content:center;"><div style="width:60px;height:60px;border:5px solid #E5E7EB;border-top-color:#10B981;border-radius:50%;animation:spin 1s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',
                        showConfirmButton: false,
                        allowOutsideClick: false
                    });
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = `/approval/pr-receipts/${id}/approve`;
                    const csrf = document.createElement('input');
                    csrf.type = 'hidden';
                    csrf.name = '_token';
                    csrf.value = '{{ csrf_token() }}';
                    form.appendChild(csrf);
                    document.body.appendChild(form);
                    form.submit();
                }
            });
        };

        window.rejectReceipt = function (id) {
            Swal.fire({
                title: 'Reject Request?',
                html: 'Anda akan <strong>menolak</strong> penerimaan PR ini.',
                input: 'textarea',
                inputLabel: 'Alasan Penolakan (Wajib)',
                inputPlaceholder: 'Contoh: PR belum diterima secara fisik, data tidak lengkap, dll.',
                inputAttributes: { 'rows': 4, 'maxlength': 255 },
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#6B7280',
                confirmButtonText: '✗ Ya, Tolak',
                cancelButtonText: 'Batal',
                preConfirm: (value) => {
                    const reason = (value || '').trim();
                    if (!reason) { Swal.showValidationMessage('Alasan penolakan wajib diisi'); return false; }
                    if (reason.length < 5) { Swal.showValidationMessage('Alasan minimal 5 karakter'); return false; }
                    return reason;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Memproses...',
                        html: '<div style="display:flex;justify-content:center;"><div style="width:60px;height:60px;border:5px solid #E5E7EB;border-top-color:#EF4444;border-radius:50%;animation:spin 1s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>',
                        showConfirmButton: false,
                        allowOutsideClick: false
                    });
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = `/approval/pr-receipts/${id}/reject`;
                    const csrf = document.createElement('input');
                    csrf.type = 'hidden';
                    csrf.name = '_token';
                    csrf.value = '{{ csrf_token() }}';
                    const reason = document.createElement('input');
                    reason.type = 'hidden';
                    reason.name = 'reason';
                    reason.value = result.value;
                    form.appendChild(csrf);
                    form.appendChild(reason);
                    document.body.appendChild(form);
                    form.submit();
                }
            });
        };

        setTimeout(() => {
            ['#alert-success', '#alert-warning', '#alert-error'].forEach(id => {
                const el = document.querySelector(id);
                if (el) {
                    el.style.transition = 'opacity 0.5s ease-out';
                    el.style.opacity = '0';
                    setTimeout(() => el.remove(), 500);
                }
            });
        }, 7000);
    </script>

    <style>
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

        .animate-slide-in-right {
            animation: slideInRight 0.4s ease-out;
        }

        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* ========== POPUP ========== */
        .swal2-pr-popup {
            width: fit-content !important;
            max-width: 640px !important;
            min-width: 340px !important;
            border-radius: 16px !important;
            padding: 0 !important;
            background: #FFFFFF !important;
            color: #111827 !important;
        }

        .dark .swal2-pr-popup {
            background: #1F2937 !important;
            color: #F9FAFB !important;
        }

        .swal2-pr-popup .swal2-header {
            padding: 20px 24px 14px !important;
            border-bottom: 1px solid #E5E7EB;
            margin: 0 !important;
        }

        .dark .swal2-pr-popup .swal2-header {
            border-bottom-color: #374151;
        }

        .swal2-pr-title {
            font-size: 17px !important;
            font-weight: 700 !important;
            color: #111827 !important;
            margin: 0 !important;
            text-align: left !important;
        }

        .dark .swal2-pr-title {
            color: #F3F4F6 !important;
        }

        .swal2-pr-popup .swal2-html-container {
            padding: 20px 24px 24px !important;
            margin: 0 !important;
            overflow: visible !important;
            text-align: left !important;
        }

        .swal2-pr-close {
            color: #9CA3AF !important;
            top: 14px !important;
            right: 18px !important;
        }

        .swal2-pr-close:hover {
            color: #374151 !important;
        }

        .dark .swal2-pr-close {
            color: #6B7280 !important;
        }

        .dark .swal2-pr-close:hover {
            color: #E5E7EB !important;
        }

        /* ========== MODAL CONTENT ========== */
        .pr-d-wrap {
            text-align: left;
            font-family: system-ui, -apple-system, sans-serif;
        }

        .pr-d-nomor {
            margin-bottom: 18px;
            padding: 14px 16px;
            background: #EFF6FF;
            border-radius: 12px;
            border-left: 4px solid #3B82F6;
        }

        .dark .pr-d-nomor {
            background: rgba(30, 58, 138, 0.15);
            border-left-color: #60A5FA;
        }

        .pr-d-nomor-label {
            font-size: 11px;
            font-weight: 700;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 3px;
        }

        .dark .pr-d-nomor-label {
            color: #9CA3AF;
        }

        .pr-d-nomor-val {
            font-size: 15px;
            font-weight: 700;
            color: #1E40AF;
            font-family: monospace;
        }

        .dark .pr-d-nomor-val {
            color: #93C5FD;
        }

        .pr-d-section {
            margin-bottom: 18px;
        }

        .pr-d-label {
            font-size: 11px;
            font-weight: 700;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .dark .pr-d-label {
            color: #9CA3AF;
        }

        .pr-d-box {
            padding: 14px 16px;
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            font-size: 14px;
            color: #1F2937;
            line-height: 1.7;
            white-space: pre-wrap;
            word-break: break-word;
            max-height: 250px;
            overflow-y: auto;
            text-align: left;
        }

        .dark .pr-d-box {
            background: #111827;
            border-color: #374151;
            color: #E5E7EB;
        }

        .pr-d-box-sm {
            max-height: 200px;
            color: #4B5563;
        }

        .dark .pr-d-box-sm {
            color: #D1D5DB;
        }

        .pr-d-box-reject {
            background: #FEF2F2;
            border-color: #FECACA;
            color: #991B1B;
        }

        .dark .pr-d-box-reject {
            background: rgba(127, 29, 29, 0.12);
            border-color: #7F1D1D;
            color: #FCA5A5;
        }

        .pr-d-empty {
            color: #9CA3AF;
            font-style: italic;
        }

        .dark .pr-d-empty {
            color: #6B7280;
        }

        /* 4-column grid for info */
        .pr-d-grid-4 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 18px;
        }

        .pr-d-footer {
            padding: 12px 14px;
            background: #F3F4F6;
            border-radius: 10px;
        }

        .dark .pr-d-footer {
            background: #111827;
        }

        .pr-d-footer-label {
            font-size: 10px;
            font-weight: 700;
            color: #9CA3AF;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .dark .pr-d-footer-label {
            color: #6B7280;
        }

        .pr-d-footer-val {
            font-size: 13px;
            font-weight: 600;
            color: #374151;
        }

        .dark .pr-d-footer-val {
            color: #E5E7EB;
        }

        .pr-d-footer-approved .pr-d-footer-val {
            color: #047857;
        }

        .dark .pr-d-footer-approved .pr-d-footer-val {
            color: #6EE7B7;
        }

        .pr-d-footer-rejected .pr-d-footer-val {
            color: #B91C1C;
        }

        .dark .pr-d-footer-rejected .pr-d-footer-val {
            color: #FCA5A5;
        }

        /* Status row */
        .pr-d-status-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            margin-bottom: 18px;
        }

        .dark .pr-d-status-row {
            background: #111827;
            border-color: #374151;
        }

        .pr-d-status-label {
            font-size: 11px;
            font-weight: 700;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            white-space: nowrap;
        }

        .dark .pr-d-status-label {
            color: #9CA3AF;
        }

        /* Badges */
        .pr-d-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
        }

        .pr-d-badge-pending {
            background: #EAB308;
        }

        .pr-d-badge-approved {
            background: #059669;
        }

        .pr-d-badge-rejected {
            background: #DC2626;
        }

        /* Actions */
        .pr-d-actions {
            margin-bottom: 0;
        }

        .pr-d-actions-label {
            font-size: 11px;
            font-weight: 700;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 10px;
        }

        .dark .pr-d-actions-label {
            color: #9CA3AF;
        }

        .pr-d-actions-btns {
            display: flex;
            gap: 10px;
        }

        .pr-d-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            color: #fff;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .pr-d-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .pr-d-btn:active {
            transform: translateY(0);
        }

        .pr-d-btn-approve {
            background: #059669;
        }

        .pr-d-btn-approve:hover {
            background: #047857;
        }

        .pr-d-btn-reject {
            background: #DC2626;
        }

        .pr-d-btn-reject:hover {
            background: #B91C1C;
        }

        .pr-d-done {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            color: #9CA3AF;
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            font-style: italic;
        }

        .dark .pr-d-done {
            color: #6B7280;
            background: #111827;
            border-color: #374151;
        }

        /* Tombol detail di tabel */
        .btn-detail-pr {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .btn-detail-pr::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent, rgba(59, 130, 246, 0.1), transparent);
            transform: translateX(-100%);
            transition: transform 0.4s ease;
        }

        .btn-detail-pr:hover::after {
            transform: translateX(100%);
        }
    </style>
@endpush