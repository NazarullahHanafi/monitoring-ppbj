php

@extends('layouts.app')

@section('title', 'Management PPBJ')

@section('content')

    {{-- ================= HEADER ================= --}}

    <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <h1
                class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                📁 Management PPBJ
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Monitoring SLA & proses pengadaan</p>
        </div>

        <div class="flex gap-2 flex-wrap">
            <button type="button" onclick="openImportModal()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 px-4 py-2 font-semibold text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[.99] transition-all duration-300">
                <span>📤 Import Excel</span>
            </button>

            <button type="button" onclick="exportData()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-500 dark:to-teal-600 px-4 py-2 font-semibold text-white shadow-lg shadow-teal-500/30 dark:shadow-teal-500/20 hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[.99] transition-all duration-300">
                <span>📥 Export Excel</span>
            </button>

            <button type="button" onclick="openCreateForm()"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[.99] transition-all duration-300">
                <span>+ Tambah PPBJ</span>
            </button>
        </div>
    </div>

    {{-- ================= FILTER (RESPONSIVE) ================= --}}
    <form method="GET" id="ulala" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 transition-all duration-300">

        <input type="text" name="uraian" placeholder="Cari Uraian / PPBJ..." value="{{ request('uraian') }}" class="sm:col-span-2 lg:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       transition-all duration-200">

        <select name="portofolio" class="select2-filter px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">-- Portofolio --</option>
            @foreach($portofolios as $p)
                <option value="{{ $p }}" @selected(request('portofolio') == $p)>{{ $p }}</option>
            @endforeach
        </select>

        <select id="buyer_filter" name="buyer" class="select2-filter px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">-- Buyer --</option>
            @foreach($buyers as $b)
                <option value="{{ $b }}" @selected(request('buyer') == $b)>{{ $b }}</option>
            @endforeach
        </select>

        <select name="penyedia_eksternal" class="select2-filter px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                                                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">-- Penyedia --</option>
            @foreach($penyediaEksternals as $pe)
                <option value="{{ $pe }}" @selected(request('penyedia_eksternal') == $pe)>{{ $pe }}</option>
            @endforeach
        </select>

        <select name="status_sla" class="select2-filter px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">-- Status --</option>
            <option value="ON TRACK" @selected(request('status_sla') == 'ON TRACK')>ON TRACK</option>
            <option value="WARNING" @selected(request('status_sla') == 'WARNING')>WARNING</option>
            <option value="OVERDUE" @selected(request('status_sla') == 'OVERDUE')>OVERDUE</option>
            <option value="CANCELLED" @selected(request('status_sla') == 'CANCELLED')>CANCELLED</option>
        </select>

        <select name="progress" class="select2-filter px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">-- Progress --</option>
            <option value="0" @selected(request('progress') == '0')>0%</option>
            <option value="1-20" @selected(request('progress') == '1-20')>1–20%</option>
            <option value="21-40" @selected(request('progress') == '21-40')>21–40%</option>
            <option value="41-60" @selected(request('progress') == '41-60')>41–60%</option>
            <option value="61-80" @selected(request('progress') == '61-80')>61–80%</option>
            <option value="81-99" @selected(request('progress') == '81-99')>81–99%</option>
            <option value="100" @selected(request('progress') == '100')>100%</option>
        </select>

        <div class="flex gap-2 lg:col-span-1 sm:col-span-2">
            <button type="submit" class="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                           px-4 py-2 font-semibold text-white shadow-lg shadow-blue-500/30 
                           hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300">
                Filter
            </button>

            <a href="{{ route('ppbj.index') }}" class="w-full rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 font-semibold text-center 
                           text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 
                           hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                Reset
            </a>
        </div>
    </form>

    {{-- ================= TABLE (RESPONSIVE) ================= --}}
    <div
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300">
        <div class="overflow-x-auto">
            <table class="min-w-[980px] w-full text-sm">
                <thead
                    class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr class="text-gray-600 dark:text-gray-300">
                        <th class="px-4 py-3 text-left font-semibold">PPBJ</th>
                        <th class="px-4 py-3 text-left font-semibold">Uraian</th>
                        <th class="px-4 py-3 text-left font-semibold">Portofolio</th>
                        <th class="px-4 py-3 text-left font-semibold">Buyer</th>
                        <th class="px-4 py-3 text-center font-semibold">Sisa SLA</th>
                        <th class="px-4 py-3 text-center font-semibold">Status</th>
                        <th class="px-4 py-3 text-center font-semibold">Progress</th>
                        <th class="px-4 py-3 text-center font-semibold">Info</th>
                        <th class="px-4 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    @forelse($ppbj as $row)
                        @php
                            $progress = (int) ($row->progres ?? 0);
                            $progress = max(0, min(100, $progress));

                            $statusColor = match ($row->status_sla) {
                                'CANCELLED' => 'bg-gray-600 dark:bg-gray-500',
                                'OVERDUE' => 'bg-red-600 dark:bg-red-500',
                                'WARNING' => 'bg-yellow-500 dark:bg-yellow-600',
                                default => 'bg-green-600 dark:bg-green-500',
                            };

                            $isCancelled = (strtoupper((string) ($row->status ?? 'ACTIVE')) === 'CANCELLED');
                        @endphp

                        <tr id="row_{{ $row->id }}" class="border-t border-gray-200 dark:border-gray-700 
                                                                    hover:bg-blue-50/50 dark:hover:bg-blue-900/20 
                                                                    transition-all duration-200">
                            <td class="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                                <span class="ppbj-no">{{ $row->ppbj_no }}</span>

                                @if($isCancelled)
                                    <span
                                        class="ml-2 inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-[10px] font-bold text-gray-700 dark:text-gray-300 cancelled-pill">
                                        CANCELLED
                                    </span>
                                @else
                                    <span
                                        class="ml-2 hidden items-center rounded-full bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-[10px] font-bold text-gray-700 dark:text-gray-300 cancelled-pill">
                                        CANCELLED
                                    </span>
                                @endif
                            </td>

                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ $row->uraian }}</td>
                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ $row->portofolio }}</td>
                            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ $row->buyer }}</td>

                            <td class="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{{ $row->sisa_target_sla }} hari
                            </td>

                            <td class="px-4 py-3 text-center">
                                <span
                                    class="status-badge inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-bold text-white {{ $statusColor }} shadow-lg">
                                    {{ $row->status_sla }}
                                </span>
                            </td>

                            <td class="px-4 py-3 text-center w-44">
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1 overflow-hidden">
                                    <div class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 
                                                       transition-all duration-500 shadow-lg shadow-blue-500/50"
                                        style="width: {{ $progress }}%"></div>
                                </div>
                                <small class="text-gray-600 dark:text-gray-400 font-semibold">{{ $progress }}%</small>
                            </td>

                            <td class="px-4 py-3 text-center">
                                <button type="button" onclick="openDetail({{ $row->id }})" class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                                                   px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/30 
                                                   hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                                    Info
                                </button>
                            </td>

                            <td class="px-4 py-3 text-center">
                                @if($isCancelled)
                                    <span class="text-xs text-gray-400">—</span>
                                @else
                                    <div class="row-actions inline-flex gap-2">
                                        <button type="button" onclick="openEditForm({{ $row->id }})"
                                            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 
                                                               px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-amber-500/30 
                                                               hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300">
                                            Edit
                                        </button>

                                        <button type="button" onclick="cancelData({{ $row->id }})"
                                            class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 
                                                               px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-gray-500/30 
                                                               hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300">
                                            Cancel
                                        </button>
                                    </div>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center py-10 text-gray-500 dark:text-gray-400">
                                <div class="flex flex-col items-center gap-3">
                                    <svg class="w-16 h-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p class="text-lg font-semibold">Data tidak ditemukan</p>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    {{-- pagination bawah --}}
    <div class="mt-4">
        {{ $ppbj->links() }}
    </div>

    {{-- ================= MODAL DETAIL ================= --}}
    <div id="detailModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-50 p-4"
        onclick="closeDetail()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop border border-gray-200 dark:border-gray-700"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h2 class="font-bold text-lg text-gray-900 dark:text-gray-100">Detail PPBJ</h2>
                    <p id="detailHint" class="text-xs text-gray-500 dark:text-gray-400"></p>
                </div>
                <button type="button" onclick="closeDetail()"
                    class="text-red-500 dark:text-red-400 text-xl leading-none hover:scale-110 hover:rotate-90 transition-all duration-300">✕</button>
            </div>

            {{-- area pesan cancelled --}}
            <div id="cancelledBanner"
                class="hidden mb-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
                <div class="flex items-start gap-3">
                    <div class="mt-0.5 h-2.5 w-2.5 rounded-full bg-gray-600 dark:bg-gray-500"></div>
                    <div class="flex-1">
                        <div class="font-semibold text-gray-800 dark:text-gray-200">Data ini telah di-cancel.</div>

                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <div class="text-xs text-gray-500 dark:text-gray-500">Alasan:</div>
                            <div id="cancelReasonText" class="font-semibold text-gray-800 dark:text-gray-200">—</div>
                        </div>

                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                            Klik tombol di bawah untuk melihat isi datanya.
                        </div>

                        <div class="mt-3">
                            <button type="button" onclick="showCancelledDetail()" class="rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 
                                           px-4 py-2 text-sm font-semibold text-white shadow-lg 
                                           hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Lihat Isi Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="detailContent"
                class="hidden grid grid-cols-1 md:grid-cols-2 gap-3 text-sm max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
            </div>
        </div>
    </div>

    {{-- ================= MODAL FORM PPBJ ================= --}}
    <div id="formModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-50 p-4"
        onclick="closeForm()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop border border-gray-200 dark:border-gray-700"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <h2 id="formTitle" class="font-bold text-lg text-gray-900 dark:text-gray-100">Tambah PPBJ</h2>
                <button type="button" onclick="closeForm()"
                    class="text-gray-500 dark:text-gray-400 text-xl leading-none hover:text-red-600 dark:hover:text-red-400 hover:rotate-90 transition-all duration-300">✕</button>
            </div>

            @php
                $fields = [
                    'uraian' => ['Uraian', 'text'],
                    'note' => ['Note', 'text'],

                    'tgl_ppbj' => ['Tanggal PPBJ', 'date'],
                    'tgl_terima_pr' => ['Tanggal Terima PR', 'date'],
                    'tgl_diserahkan' => ['Tanggal Diserahkan', 'date'],

                    'spph_rfq_1' => ['SPPH / RFQ 1', 'text'],
                    'rfq_2' => ['RFQ 2', 'text'],
                    'rfq_3' => ['RFQ 3', 'text'],
                    'tgl_spph' => ['Tanggal SPPH', 'date'],
                    'closed_date' => ['Closed Date', 'date'],

                    'sph' => ['SPH', 'text'],
                    'tgl_sph' => ['Tanggal SPH', 'date'],

                    'awarding_sp' => ['Awarding SP', 'text'],
                    'tgl_awarding_sp' => ['Tanggal Awarding', 'date'],

                    'tgl_spk' => ['Tanggal SPK', 'date'],
                    'nilai_sp_spk' => ['Nilai SP/SPK', 'number'],

                    'promised_date' => ['Promised Date', 'date'],
                    'do_no' => ['DO No', 'text'],

                    'bpg_no' => ['BPG No', 'text'],
                    'nilai_bpg' => ['Nilai BPG', 'number'],
                    'tgl_bpg' => ['Tanggal BPG', 'date'],

                    'receiving_transaction' => ['Receiving Transaction', 'text'],

                    'bpb_no' => ['BPB No', 'text'],
                    'tgl_bpb' => ['Tanggal BPB', 'date'],

                    'no_invoice' => ['No Invoice', 'text'],
                    'tgl_invoice' => ['Tanggal Invoice', 'date'],

                    'total_sebelum_ppn' => ['Total Sebelum PPN', 'number'],
                    'keterangan' => ['Keterangan', 'textarea'],
                ];

                $masterFields = [
                    'portofolio' => ['Portofolio', $portofolios, 'portofolio'],
                    'buyer' => ['Buyer', $buyers, 'buyer'],
                    'metode_pengadaan' => ['Metode Pengadaan', $metodePengadaans, 'metode_pengadaan'],
                    'penyedia_eksternal' => ['Penyedia Eksternal', $penyediaEksternals, 'penyedia_eksternal'],
                ];
            @endphp

            <form id="ppbjForm" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                @csrf
                <input type="hidden" id="ppbj_id" name="id" />

                {{-- FIELD PPBJ NO (UNIQUE + ERROR MESSAGE) --}}
                <div class="md:col-span-2">
                    <label class="text-sm text-gray-600 dark:text-gray-400 font-medium">PPBJ No</label>
                    <input type="text" id="ppbj_no" name="ppbj_no" autocomplete="off" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                   transition-all duration-200">

                    <p id="err_ppbj_no" class="hidden text-xs text-red-600 dark:text-red-400 mt-1"></p>

                    <p id="hint_ppbj_no" class="hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Mengecek nomor PPBJ…
                    </p>
                </div>

                {{-- MASTER DROPDOWN (SELECT2) --}}
                @foreach($masterFields as $name => [$label, $options, $type])
                    <div>
                        <label class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $label }}</label>

                        <div class="flex gap-2">
                            <select id="{{ $name }}" name="{{ $name }}" class="select2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">-- pilih --</option>
                                @foreach($options as $opt)
                                    <option value="{{ $opt }}">{{ $opt }}</option>
                                @endforeach
                            </select>

                            <button type="button" class="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 border border-gray-300 dark:border-gray-600 
                                                   hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                                onclick="openMaster('{{ $type }}')" title="Kelola master">
                                ⚙
                            </button>
                        </div>
                    </div>
                @endforeach

                {{-- FIELD BIASA --}}
                @foreach($fields as $name => [$label, $type])
                    <div class="{{ $type === 'textarea' ? 'md:col-span-2' : '' }}">
                        <label class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $label }}</label>

                        @if($type === 'textarea')
                            <textarea id="{{ $name }}" name="{{ $name }}" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full 
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                                   transition-all duration-200" rows="3"></textarea>
                        @else
                            <input type="{{ $type }}" id="{{ $name }}" name="{{ $name }}" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full 
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                                   transition-all duration-200">
                        @endif
                    </div>
                @endforeach

                <div class="md:col-span-2 flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <button id="btnSave" type="submit" class="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                                   text-white px-4 py-2 font-semibold shadow-lg shadow-blue-500/30 
                                   hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 
                                   inline-flex items-center justify-center gap-2">
                        <span id="btnSaveText">Simpan</span>
                        <span id="btnSaveSpinner"
                            class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                    </button>
                    <button type="button" onclick="closeForm()" class="rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 font-semibold 
                                   border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200
                                   hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    {{-- ================= MODAL MASTER DATA ================= --}}
    <div id="masterModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-50 p-4"
        onclick="closeMaster()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop border border-gray-200 dark:border-gray-700"
            style="max-height: 85vh;" onclick="event.stopPropagation()">

            <div class="flex justify-between items-center mb-4">
                <h2 id="masterTitle" class="font-bold text-lg text-gray-900 dark:text-gray-100">Kelola Master</h2>
                <button type="button"
                    class="text-red-600 dark:text-red-400 text-xl hover:scale-110 hover:rotate-90 transition-all duration-300"
                    onclick="closeMaster()">✕</button>
            </div>

            <div class="flex gap-2 mb-3">
                <input id="masterInput" class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                               focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                               transition-all duration-200" placeholder="Nama baru...">
                <button type="button" class="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                               text-white px-4 rounded-lg font-semibold shadow-lg 
                               hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onclick="addMaster()">Tambah</button>
            </div>

            <div id="masterList" class="space-y-2 overflow-y-auto custom-scrollbar" style="max-height: 60vh;"></div>
        </div>
    </div>

    {{-- ================= MODAL IMPORT - FIXED ================= --}}
    <div id="importModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-50 p-4"
        onclick="closeImportModal()">
        <div class="bg-white dark:bg-gray-800 w-full max-w-6xl rounded-2xl shadow-2xl p-6 overflow-y-auto modal-pop border border-gray-200 dark:border-gray-700"
            style="max-height: 90vh;" onclick="event.stopPropagation()">

            <div class="flex items-start justify-between mb-4">
                <div>
                    <h2 class="font-bold text-lg text-gray-900 dark:text-gray-100">Import Data PPBJ</h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload file CSV untuk import data secara massal
                    </p>
                </div>
                <button type="button" onclick="closeImportModal()"
                    class="text-red-500 dark:text-red-400 text-xl leading-none hover:scale-110 hover:rotate-90 transition-all duration-300">✕</button>
            </div>

            {{-- Step 1: Upload File --}}
            <div id="uploadStep" class="animate-fade-in">
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center 
                               hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 
                               transition-all duration-300 cursor-pointer" id="dropZone">
                    <div class="text-6xl mb-4">📂</div>
                    <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">Upload File CSV</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag & drop file atau klik untuk browse</p>

                    <input type="file" id="importFile" accept=".csv,.txt" class="hidden" onchange="handleFileSelect(event)">

                    <button type="button" onclick="document.getElementById('importFile').click()" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                                   text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 
                                   hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                        <span>📁 Pilih File</span>
                    </button>

                    <div class="mt-4">
                        <a href="{{ route('ppbj.template') }}"
                            class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                            <span>📥 Download Template CSV</span>
                        </a>
                    </div>
                </div>

                <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-2">💡 Petunjuk Import:</h4>
                    <ul class="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Download template CSV terlebih dahulu</li>
                        <li>• <strong>PPBJ No wajib diisi dan harus unik</strong> (tidak boleh duplikat)</li>
                        <li>• Format tanggal: <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">YYYY-MM-DD</code>
                            (contoh: 2026-01-15)
                        </li>
                        <li>• Format angka: tanpa titik/koma (contoh: 50000000)</li>
                        <li>• Kolom otomatis (SLA, Progress, dll) tidak perlu diisi</li>
                        <li>• Maksimal ukuran file: 10MB</li>
                        <li>• File harus dalam format CSV dengan encoding UTF-8</li>
                    </ul>
                </div>
            </div>

            {{-- Step 2: Preview --}}
            <div id="previewStep" class="hidden">
                {{-- Summary --}}
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div class="text-sm text-blue-600 dark:text-blue-400">Total Baris</div>
                        <div id="totalRows" class="text-2xl font-bold text-blue-900 dark:text-blue-100">0</div>
                    </div>
                    <div
                        class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div class="text-sm text-green-600 dark:text-green-400">Valid</div>
                        <div id="validRows" class="text-2xl font-bold text-green-900 dark:text-green-100">0</div>
                    </div>
                    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div class="text-sm text-red-600 dark:text-red-400">Error</div>
                        <div id="errorRows" class="text-2xl font-bold text-red-900 dark:text-red-100">0</div>
                    </div>
                </div>

                {{-- Preview Table --}}
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                    <div class="overflow-x-auto custom-scrollbar" style="max-height: 400px;">
                        <table class="min-w-full text-xs">
                            <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0">
                                <tr class="text-gray-600 dark:text-gray-400">
                                    <th class="px-3 py-2 text-left font-semibold">Baris</th>
                                    <th class="px-3 py-2 text-left font-semibold">Status</th>
                                    <th class="px-3 py-2 text-left font-semibold">PPBJ No</th>
                                    <th class="px-3 py-2 text-left font-semibold">Uraian</th>
                                    <th class="px-3 py-2 text-left font-semibold">Buyer</th>
                                    <th class="px-3 py-2 text-left font-semibold">Total</th>
                                    <th class="px-3 py-2 text-left font-semibold">Error</th>
                                </tr>
                            </thead>
                            <tbody id="previewTableBody" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <!-- Filled by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                {{-- Actions --}}
                <div class="flex justify-between items-center">
                    <button type="button" onclick="resetImport()" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-200
                                   hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                        ← Upload Ulang
                    </button>

                    <div class="flex gap-2">
                        <button type="button" onclick="closeImportModal()" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-200
                                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                            Batal
                        </button>

                        <button type="button" id="btnProcess" onclick="processImport()" class="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 
                                       text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 
                                       hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 
                                       inline-flex items-center gap-2">
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
                    class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 dark:border-blue-400 border-t-transparent mb-4">
                </div>
                <p class="text-gray-600 dark:text-gray-400 font-semibold">Memproses file...</p>
            </div>
        </div>
    </div>


@endsection

@push('scripts')
    <script>
        // ==========================================
        // DRAG & DROP FILE UPLOAD
        // ==========================================
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('importFile');

        if (dropZone) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, preventDefaults, false);
            });

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.add('border-blue-500', 'dark:border-blue-400', 'bg-blue-50/50', 'dark:bg-blue-900/20');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.remove('border-blue-500', 'dark:border-blue-400', 'bg-blue-50/50', 'dark:bg-blue-900/20');
                }, false);
            });

            dropZone.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;

                if (files.length > 0) {
                    fileInput.files = files;
                    handleFileSelect({ target: fileInput });
                }
            }, false);

            // Click to upload
            dropZone.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                    fileInput.click();
                }
            });
        }

        window.exportData = function () {
            const form = document.getElementById('ulala');
            const formData = new FormData(form);
            const params = new URLSearchParams(formData);

            Swal.fire({
                title: 'Export Data?',
                text: 'Data akan diexport sesuai filter yang aktif',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Export',
                cancelButtonText: 'Batal',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/ppbj/export?${params.toString()}`;

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Export dimulai',
                        text: 'File akan segera didownload',
                        showConfirmButton: false,
                        timer: 2000,
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                    });
                }
            });
        };

        // ==========================================
        // IMPORT FUNCTIONALITY - FIXED
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

            if (!file) return;

            // Validasi ukuran file
            if (file.size > 10 * 1024 * 1024) { // 10MB
                toastErr('Error', 'Ukuran file maksimal 10MB');
                return;
            }

            // Validasi ekstensi
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['csv', 'txt'].includes(ext)) {
                toastErr('Error', 'Format file harus CSV atau TXT');
                return;
            }

            // Show loading
            document.getElementById('uploadStep').classList.add('hidden');
            document.getElementById('loadingStep').classList.remove('hidden');

            // Upload & preview
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('{{ route("ppbj.import.preview") }}', {
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
                console.error('Import error:', error);
                document.getElementById('loadingStep').classList.add('hidden');
                document.getElementById('uploadStep').classList.remove('hidden');
                toastErr('Error', error.message);
            }
        };

        function showPreview(result) {
            document.getElementById('loadingStep').classList.add('hidden');
            document.getElementById('previewStep').classList.remove('hidden');

            // Update summary
            document.getElementById('totalRows').textContent = result.summary.total;
            document.getElementById('validRows').textContent = result.summary.valid;
            document.getElementById('errorRows').textContent = result.summary.error;

            // Render table
            const tbody = document.getElementById('previewTableBody');
            tbody.innerHTML = '';

            result.data.forEach(row => {
                const statusBadge = row.status === 'valid'
                    ? '<span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full font-semibold">✓ Valid</span>'
                    : '<span class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full font-semibold">✗ Error</span>';

                const errorText = row.errors && row.errors.length > 0
                    ? row.errors.join(', ')
                    : '-';

                const tr = document.createElement('tr');
                tr.className = row.status === 'error'
                    ? 'bg-red-50 dark:bg-red-900/10'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50';
                tr.innerHTML = `
                    <td class="px-3 py-2 text-gray-700 dark:text-gray-300">${row.row_number}</td>
                    <td class="px-3 py-2">${statusBadge}</td>
                    <td class="px-3 py-2 font-semibold text-gray-900 dark:text-gray-100">${escapeHtml(row.ppbj_no)}</td>
                    <td class="px-3 py-2 text-gray-700 dark:text-gray-300">${escapeHtml(row.uraian || '-')}</td>
                    <td class="px-3 py-2 text-gray-700 dark:text-gray-300">${escapeHtml(row.buyer || '-')}</td>
                    <td class="px-3 py-2 text-gray-700 dark:text-gray-300">${row.total_sebelum_ppn ? formatRupiah(row.total_sebelum_ppn) : '-'}</td>
                    <td class="px-3 py-2 text-red-600 dark:text-red-400 text-xs">${escapeHtml(errorText)}</td>
                `;
                tbody.appendChild(tr);
            });

            // Disable process button if there are errors
            const hasErrors = result.summary.error > 0;
            const btnProcess = document.getElementById('btnProcess');

            if (hasErrors) {
                btnProcess.disabled = true;
                btnProcess.classList.add('opacity-50', 'cursor-not-allowed');
                toastErr('Perhatian', `Terdapat ${result.summary.error} baris dengan error. Perbaiki terlebih dahulu.`);
            } else {
                btnProcess.disabled = false;
                btnProcess.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        window.processImport = async function () {
            if (previewData.length === 0) {
                toastErr('Error', 'Tidak ada data untuk diimport');
                return;
            }

            // Filter hanya data valid
            const validData = previewData.filter(d => d.status === 'valid');

            if (validData.length === 0) {
                toastErr('Error', 'Tidak ada data valid untuk diimport');
                return;
            }

            // Confirm
            const result = await Swal.fire({
                title: 'Konfirmasi Import',
                html: `Akan mengimport <strong>${validData.length}</strong> data.<br>Lanjutkan?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Ya, Import',
                cancelButtonText: 'Batal',
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
            });

            if (!result.isConfirmed) return;

            // Show loading
            const btnProcess = document.getElementById('btnProcess');
            const btnProcessText = document.getElementById('btnProcessText');
            const btnProcessSpinner = document.getElementById('btnProcessSpinner');

            btnProcess.disabled = true;
            btnProcessText.textContent = 'Memproses...';
            btnProcessSpinner.classList.remove('hidden');

            try {
                const response = await fetch('{{ route("ppbj.import.process") }}', {
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

                // Show result
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
                    confirmButtonColor: '#10B981',
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });

                // Close modal & reload
                closeImportModal();
                setTimeout(() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('_t', Date.now());
                    window.location.href = url.toString();
                }, 500);

            } catch (error) {
                console.error('Process import error:', error);
                toastErr('Error', error.message);
            } finally {
                btnProcess.disabled = false;
                btnProcessText.textContent = '✓ Proses Import';
                btnProcessSpinner.classList.add('hidden');
            }
        };

        function formatRupiah(value) {
            return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
        }

        (function () {
            // ==== DOM refs ====
            const ppbjForm = document.getElementById('ppbjForm');
            const formModal = document.getElementById('formModal');
            const detailModal = document.getElementById('detailModal');
            const detailContent = document.getElementById('detailContent');
            const detailHint = document.getElementById('detailHint');
            const cancelledBanner = document.getElementById('cancelledBanner');
            const cancelReasonText = document.getElementById('cancelReasonText');

            const formTitle = document.getElementById('formTitle');
            const ppbjIdInput = document.getElementById('ppbj_id');

            const btnSave = document.getElementById('btnSave');
            const btnSaveSpinner = document.getElementById('btnSaveSpinner');
            const btnSaveText = document.getElementById('btnSaveText');

            const inpPpbjNo = document.getElementById('ppbj_no');
            const errPpbjNo = document.getElementById('err_ppbj_no');
            const hintPpbjNo = document.getElementById('hint_ppbj_no');

            // master modal
            const masterModal = document.getElementById('masterModal');
            const masterTitle = document.getElementById('masterTitle');
            const masterInput = document.getElementById('masterInput');
            const masterList = document.getElementById('masterList');

            // data server
            window.ppbjData = @json(collect($ppbj->items())->keyBy('id'));

            // ===== MASTER CONFIG =====
            let currentMasterType = null;

            const masterLabel = {
                buyer: 'Buyer',
                portofolio: 'Portofolio',
                metode_pengadaan: 'Metode Pengadaan',
                penyedia_eksternal: 'Penyedia Eksternal',
            };

            function escapeHtml(str) {
                return String(str ?? '').replace(/[&<>"']/g, (m) => ({
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
                }[m]));
            }

            function toastOk(title, text) {
                if (!window.Swal) return;
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: title || 'Berhasil',
                    text: text || '',
                    showConfirmButton: false,
                    timer: 2200,
                    timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });
            }

            function toastErr(title, text) {
                if (!window.Swal) return;
                let iconType = 'error';

                if (title === 'Sukses') {
                    iconType = 'success';
                }

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: iconType,
                    title: title || 'Gagal',
                    text: text || '',
                    showConfirmButton: false,
                    timer: 2600,
                    timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });
            }

            function removeDataFromTable(id) {
                const select = document.getElementById('ulala');
                const option = select.querySelector(`option[value="${id}"]`);
                if (option) {
                    option.remove();
                }
            }

            function setFieldError(elInput, elErr, message) {
                if (!elInput || !elErr) return;
                if (!message) {
                    elErr.textContent = '';
                    elErr.classList.add('hidden');
                    elInput.classList.remove('ring-2', 'ring-red-300', 'border-red-400', 'dark:ring-red-500', 'dark:border-red-500');
                    return;
                }
                elErr.textContent = message;
                elErr.classList.remove('hidden');
                elInput.classList.add('border-red-400', 'dark:border-red-500', 'ring-2', 'ring-red-300', 'dark:ring-red-500');
            }

            // ===== SELECT2 INIT =====
            function initSelect2Filter() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia!');
                    return;
                }

                // Destroy existing instances first
                $('.select2-filter').each(function () {
                    if ($(this).data('select2')) {
                        $(this).select2('destroy');
                    }
                });

                // Init dengan search box SELALU aktif
                $('.select2-filter').select2({
                    width: '100%',
                    allowClear: true,
                    minimumResultsForSearch: 0,
                    language: {
                        noResults: function () {
                            return "Tidak ada hasil";
                        },
                        searching: function () {
                            return "Mencari...";
                        }
                    }
                });

            }

            function initSelect2Modal() {
                if (!window.jQuery || !jQuery.fn.select2) {
                    console.error('jQuery atau Select2 tidak tersedia untuk modal!');
                    return;
                }

                setTimeout(() => {
                    // Destroy existing Select2 instances
                    $('#formModal .select2').each(function () {
                        if ($(this).data('select2')) {
                            $(this).select2('destroy');
                        }
                    });

                    // Inisialisasi Select2 dengan fitur search WAJIB muncul
                    $('#formModal .select2').select2({
                        width: '100%',
                        dropdownParent: $('#formModal'),
                        allowClear: true,
                        minimumResultsForSearch: 0,
                        language: {
                            noResults: function () {
                                return "Tidak ada hasil yang cocok";
                            },
                            searching: function () {
                                return "Mencari...";
                            }
                        }
                    });

                }, 100);
            }

            document.addEventListener('DOMContentLoaded', () => {
                initSelect2Filter();

                // ✅ Cleanup: hapus parameter _t dari URL setelah reload
                const url = new URL(window.location.href);
                if (url.searchParams.has('_t')) {
                    url.searchParams.delete('_t');
                    window.history.replaceState({}, '', url.toString());
                }
            });

            // =========================
            // SAVE DRAFT (biar close modal gak ilang)
            // =========================
            const DRAFT_KEY = 'ppbj_form_draft_v2';

            function getDraft() {
                try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'); }
                catch { return {}; }
            }

            function setDraft(d) {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(d || {}));
            }

            function clearDraft() {
                localStorage.removeItem(DRAFT_KEY);
            }

            function buildPayloadFromForm() {
                const payload = {};
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    payload[el.name] = (el.value === '' ? null : el.value);
                });
                return payload;
            }

            function applyPayloadToForm(payload) {
                ppbjForm.querySelectorAll('[name]').forEach(el => {
                    if (el.name === 'id') return;
                    el.value = payload?.[el.name] ?? '';
                });
            }

            // auto-save draft (debounce)
            let draftTimer = null;
            ppbjForm.addEventListener('input', () => {
                clearTimeout(draftTimer);
                draftTimer = setTimeout(() => setDraft(buildPayloadFromForm()), 300);
            });

            // ===== DETAIL =====
            let lastDetailId = null;

            window.openDetail = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                lastDetailId = id;

                const isCancelled = String(d.status ?? 'ACTIVE').toUpperCase() === 'CANCELLED';

                cancelledBanner.classList.add('hidden');
                detailContent.classList.add('hidden');

                if (isCancelled) {
                    detailHint.textContent = 'Status: CANCELLED';

                    const reason = (d.cancel_reason ?? '').toString().trim();
                    if (cancelReasonText) cancelReasonText.textContent = reason ? reason : '—';

                    cancelledBanner.classList.remove('hidden');
                } else {
                    detailHint.textContent = '';
                    renderDetail(d);
                    detailContent.classList.remove('hidden');
                }

                detailModal.classList.remove('hidden');
                detailModal.classList.add('flex');
            };

            function renderDetail(d) {
                let html = '';
                Object.entries(d).forEach(([k, v]) => {
                    html += `
                            <div class="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-3 rounded-xl 
                                        hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                                <div class="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">${escapeHtml(k)}</div>
                                <div class="font-semibold break-all text-gray-800 dark:text-gray-200">${escapeHtml(v ?? '-')}</div>
                            </div>
                        `;
                });
                detailContent.innerHTML = html;
            }

            window.showCancelledDetail = function () {
                const d = window.ppbjData?.[lastDetailId];
                if (!d) return;

                cancelledBanner.classList.add('hidden');
                renderDetail(d);
                detailContent.classList.remove('hidden');
            };

            window.closeDetail = function () {
                detailModal.classList.add('hidden');
                detailModal.classList.remove('flex');
            };

            // ===== FORM =====
            function openModal() {
                formModal.classList.remove('hidden');
                formModal.classList.add('flex');
                setTimeout(() => initSelect2Modal(), 50);
            }

            window.openCreateForm = function () {
                clearDraft();
                ppbjForm.reset();
                ppbjIdInput.value = '';
                formTitle.innerText = 'Tambah PPBJ';

                formModal.classList.remove('hidden');
                formModal.classList.add('flex');

                setTimeout(() => {
                    initSelect2Modal();
                    ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                        $(`#${f}`).val('').trigger('change');
                    });
                }, 50);
            };

            window.openEditForm = function (id) {
                const d = window.ppbjData?.[id];
                if (!d) return;

                ppbjForm.reset();
                ppbjIdInput.value = d.id;
                formTitle.innerText = 'Edit PPBJ';

                setFieldError(inpPpbjNo, errPpbjNo, null);
                if (hintPpbjNo) hintPpbjNo.classList.add('hidden');

                applyPayloadToForm(d);

                openModal();

                setTimeout(() => {
                    ['portofolio', 'buyer', 'metode_pengadaan', 'penyedia_eksternal'].forEach(f => {
                        const val = d[f] ?? '';
                        if (window.jQuery) $(`#${f}`).val(val).trigger('change');
                    });
                }, 80);
            };

            window.closeForm = function () {
                formModal.classList.add('hidden');
                formModal.classList.remove('flex');
            };

            function setSaving(isSaving) {
                if (isSaving) {
                    btnSaveSpinner.classList.remove('hidden');
                    btnSaveText.textContent = 'Menyimpan...';
                    btnSave.disabled = true;
                    btnSave.classList.add('opacity-80', 'cursor-not-allowed');
                } else {
                    btnSaveSpinner.classList.add('hidden');
                    btnSaveText.textContent = 'Simpan';
                    btnSave.disabled = false;
                    btnSave.classList.remove('opacity-80', 'cursor-not-allowed');
                }
            }

            // =========================
            // UNIQUE PPBJ NO
            // =========================
            function normalizeNo(v) {
                return String(v ?? '').trim().toUpperCase();
            }

            function existsOnPage(ppbjNo, ignoreId) {
                const needle = normalizeNo(ppbjNo);
                if (!needle) return false;

                const items = window.ppbjData || {};
                return Object.values(items).some(it => {
                    const itNo = normalizeNo(it?.ppbj_no);
                    if (!itNo) return false;
                    if (ignoreId && String(it?.id) === String(ignoreId)) return false;
                    return itNo === needle;
                });
            }

            let checkTimer = null;
            let lastChecked = '';
            let lastServerKnownDuplicate = false;

            async function checkPpbjNoUnique() {
                const id = ppbjIdInput.value || null;
                const v = (inpPpbjNo.value || '').trim();

                lastServerKnownDuplicate = false;

                if (!v) {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                    return;
                }

                if (existsOnPage(v, id)) {
                    setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada (terdeteksi di halaman ini).');
                    return;
                } else {
                    setFieldError(inpPpbjNo, errPpbjNo, null);
                }

                if (hintPpbjNo) hintPpbjNo.classList.remove('hidden');
                try {
                    const qs = new URLSearchParams({
                        ppbj_no: v,
                        ignore_id: id || ''
                    });

                    const res = await fetch(`/ppbj/check-ppbj-no?${qs.toString()}`, {
                        headers: { 'X-Requested-With': 'XMLHttpRequest' }
                    });

                    if (!res.ok) {
                        if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                        return;
                    }

                    const j = await res.json();
                    const exists = !!j?.exists;

                    if (exists) {
                        lastServerKnownDuplicate = true;
                        setFieldError(inpPpbjNo, errPpbjNo, 'No PPBJ tersebut sudah ada.');
                    } else {
                        setFieldError(inpPpbjNo, errPpbjNo, null);
                    }
                } catch (e) {
                    // silent
                } finally {
                    if (hintPpbjNo) hintPpbjNo.classList.add('hidden');
                }
            }

            function scheduleCheckUnique() {
                const now = normalizeNo(inpPpbjNo.value);
                if (!now) return;

                if (now === lastChecked) return;

                clearTimeout(checkTimer);
                checkTimer = setTimeout(async () => {
                    lastChecked = now;
                    await checkPpbjNoUnique();
                }, 350);
            }

            inpPpbjNo?.addEventListener('input', scheduleCheckUnique);
            inpPpbjNo?.addEventListener('blur', () => checkPpbjNoUnique());

            // submit create/update
            ppbjForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                await checkPpbjNoUnique();
                const hasClientError = !errPpbjNo.classList.contains('hidden');
                if (hasClientError || lastServerKnownDuplicate) {
                    toastErr('Tidak bisa disimpan', 'No PPBJ sudah ada.');
                    inpPpbjNo.focus();
                    return;
                }

                const id = ppbjIdInput.value;
                const payload = buildPayloadFromForm();

                setSaving(true);
                setFieldError(inpPpbjNo, errPpbjNo, null);

                fetch(id ? `/ppbj/${id}` : '/ppbj', {
                    method: id ? 'PUT' : 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(async (r) => {
                        if (r.ok) {
                            if (!id) clearDraft();
                            toastOk('Tersimpan', 'Data berhasil disimpan');

                            setTimeout(() => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('_t', Date.now());
                                window.location.href = url.toString();
                            }, 500);
                            return;
                        }

                        if (r.status === 422) {
                            const j = await r.json().catch(() => ({}));

                            const err = j?.errors || {};
                            const msgPpbj = (err?.ppbj_no && err.ppbj_no[0]) ? err.ppbj_no[0] : null;
                            if (msgPpbj) setFieldError(inpPpbjNo, errPpbjNo, msgPpbj);

                            toastErr('Validasi gagal', j?.message || 'Cek input Anda');
                            setSaving(false);
                            return;
                        }

                        const j = await r.json().catch(() => ({}));
                        throw new Error(j?.message || 'Request gagal');
                    })
                    .catch((e) => {
                        setSaving(false);
                        toastErr('Gagal', e?.message || 'Gagal menyimpan data');
                    });
            });

            // =========================
            // CANCEL
            // =========================
            function paintRowCancelled(id, reason) {
                const row = document.getElementById(`row_${id}`);
                if (!row) return;

                const pill = row.querySelector('.cancelled-pill');
                if (pill) pill.classList.remove('hidden');

                const badge = row.querySelector('.status-badge');
                if (badge) {
                    badge.textContent = 'CANCELLED';
                    badge.classList.remove('bg-green-600', 'bg-yellow-500', 'bg-red-600',
                        'dark:bg-green-500', 'dark:bg-yellow-600', 'dark:bg-red-500');
                    badge.classList.add('bg-gray-600', 'dark:bg-gray-500');
                }

                const actionsWrap = row.querySelector('.row-actions');
                if (actionsWrap) {
                    actionsWrap.parentElement.innerHTML = `<span class="text-xs text-gray-400">—</span>`;
                }

                if (window.ppbjData && window.ppbjData[id]) {
                    window.ppbjData[id].status = 'CANCELLED';
                    window.ppbjData[id].status_sla = 'CANCELLED';
                    window.ppbjData[id].cancel_reason = reason || window.ppbjData[id].cancel_reason || null;
                }
            }

            window.cancelData = function (id) {
                const doCancel = (reason) => fetch(`/ppbj/${id}/cancel`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ reason })
                }).then(async (r) => {
                    if (!r.ok) {
                        let msg = 'Cancel gagal';
                        try {
                            const j = await r.json();
                            msg = j?.message || msg;
                        } catch { }
                        throw new Error(msg);
                    }
                    return r.json().catch(() => ({}));
                });

                if (window.Swal) {
                    Swal.fire({
                        title: 'Cancel Data?',
                        text: 'Data tidak terhapus, hanya berubah status menjadi CANCELLED.',
                        icon: 'warning',
                        input: 'textarea',
                        inputLabel: 'Alasan cancel (wajib)',
                        inputPlaceholder: 'Contoh: PR dibatalkan / vendor tidak sanggup / revisi kebutuhan...',
                        inputAttributes: { maxlength: 500 },
                        showCancelButton: true,
                        confirmButtonColor: '#111827',
                        cancelButtonColor: '#9ca3af',
                        confirmButtonText: 'Ya, cancel',
                        cancelButtonText: 'Batal',
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
                        preConfirm: (value) => {
                            const v = (value || '').trim();
                            if (!v) {
                                Swal.showValidationMessage('Alasan cancel wajib diisi');
                                return false;
                            }
                            if (v.length < 3) {
                                Swal.showValidationMessage('Alasan minimal 3 karakter');
                                return false;
                            }
                            return v;
                        }
                    }).then((res) => {
                        if (res.isConfirmed) {
                            doCancel(res.value)
                                .then(() => {
                                    paintRowCancelled(id, res.value);
                                    toastOk('Cancelled', 'Status berhasil diubah');
                                })
                                .catch((e) => toastErr('Gagal', e.message || 'Cancel gagal'));
                        }
                    });
                } else {
                    const reason = prompt('Alasan cancel (wajib):');
                    if (!reason || !reason.trim()) return;
                    doCancel(reason.trim())
                        .then(() => {
                            paintRowCancelled(id, reason.trim());
                            alert('Berhasil cancel');
                        })
                        .catch(e => alert(e.message));
                }
            };

            // =========================
            // MASTER CRUD
            // =========================
            window.openMaster = function (type) {
                currentMasterType = type;
                masterTitle.innerText = `Kelola Master ${masterLabel[type] ?? type}`;
                masterInput.value = '';
                masterModal.classList.remove('hidden');
                masterModal.classList.add('flex');
                loadMaster();
            };

            window.closeMaster = function () {
                const masterModal = document.getElementById("masterModal");
                if (masterModal) {
                    masterModal.classList.add('hidden');
                    masterModal.classList.remove('flex');
                }
            };

            function loadMaster() {
                fetch(`/master/${currentMasterType}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        masterList.innerHTML = items.map(i => `
                                <div class="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-2 
                                            bg-white dark:bg-gray-900/50 hover:border-blue-300 dark:hover:border-blue-600 
                                            transition-all duration-200">
                                    <input class="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 w-full 
                                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                        value="${escapeHtml(i.nama)}"
                                        onkeydown="if(event.key==='Enter'){event.preventDefault();updateMaster(${i.id}, this.value)}">
                                    <button type="button"
                                        class="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 
                                               text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg 
                                               hover:shadow-xl hover:scale-105 transition-all duration-300"
                                        onclick="updateMaster(${i.id}, this.previousElementSibling.value)">Simpan</button>
                                    <button type="button"
                                        class="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 
                                               text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg 
                                               hover:shadow-xl hover:scale-105 transition-all duration-300"
                                        onclick="deleteMaster(${i.id})">Hapus</button>
                                </div>
                            `).join('');
                    });
            }

            window.addMaster = function () {
                const nama = masterInput.value.trim();
                if (!nama) return;

                fetch(`/master/${currentMasterType}`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Berhasil ditambahkan') {
                            const select = document.getElementById(currentMasterType);
                            const newOption = document.createElement("option");
                            newOption.value = escapeHtml(data.item.nama);
                            newOption.textContent = escapeHtml(data.item.nama);
                            select.appendChild(newOption);
                            select.value = newOption.value;

                            toastErr('Sukses', 'Data berhasil ditambahkan');
                            closeMaster();
                        } else {
                            toastErr('Gagal', 'Data tidak berhasil ditambahkan');
                        }
                    })
                    .catch(() => toastErr('Error', 'Terjadi kesalahan saat mengirim data'));
            };

            window.updateMaster = function (id, nama) {
                if (!nama || nama.trim() === '') {
                    toastErr('Gagal', 'Nama tidak boleh kosong');
                    return;
                }

                fetch(`/master/${currentMasterType}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ nama: nama.trim() })
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => Promise.reject(err));
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.message) {
                            toastErr('Sukses', data.message);
                            refreshDropdown(currentMasterType);
                            closeMaster();
                        } else {
                            toastErr('Gagal', data.message || 'Data tidak berhasil diperbarui');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        let message = 'Terjadi kesalahan saat mengupdate data';

                        if (error.errors) {
                            message = Object.values(error.errors).flat().join(', ');
                        } else if (error.message) {
                            message = error.message;
                        }

                        toastErr('Error', message);
                    });
            };

            window.deleteMaster = function (id) {
                Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: "Data yang dihapus tidak bisa dipulihkan!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, hapus!',
                    cancelButtonText: 'Batal',
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/master/${currentMasterType}/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    return response.json().then(err => Promise.reject(err));
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.message) {
                                    toastErr('Sukses', data.message);

                                    if (typeof removeDataFromTable === 'function') {
                                        removeDataFromTable(id);
                                    }

                                    closeMaster();
                                    refreshDropdown(currentMasterType);
                                } else {
                                    toastErr('Gagal', data.message || 'Terjadi kesalahan saat menghapus data');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                const message = error.message || 'Terjadi kesalahan saat menghapus data';
                                toastErr('Error', message);
                            });
                    }
                });
            };

            function refreshDropdown(type) {
                fetch(`/master/${type}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(r => r.json())
                    .then(items => {
                        const select = document.getElementById(type);
                        if (!select) return;

                        const currentValue = select.value;

                        select.innerHTML = `<option value="">-- pilih --</option>` +
                            items.map(i => `<option value="${escapeHtml(i.nama)}">${escapeHtml(i.nama)}</option>`).join('');

                        select.value = currentValue;

                        setTimeout(() => {
                            initSelect2Modal();
                            if (window.jQuery) $(`#${type}`).val(currentValue).trigger('change');
                        }, 100);
                    })
                    .catch(err => {
                        console.error('Error refreshing dropdown:', err);
                    });
            }

        })();
    </script>

    <style>
        /* ===== SELECT2 DARK MODE STYLING ===== */

        /* Light mode */
        .select2-container .select2-selection--single {
            height: 42px !important;
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            padding: 8px 12px !important;
            background-color: #ffffff !important;
        }

        /* Dark mode */
        .dark .select2-container .select2-selection--single {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 40px !important;
            right: 8px !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 24px !important;
            padding-left: 0 !important;
            color: #111827 !important;
        }

        .dark .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #f3f4f6 !important;
        }

        /* Search box */
        .select2-search--dropdown {
            padding: 8px;
            background: #f9fafb;
        }

        .dark .select2-search--dropdown {
            background: #1f2937;
        }

        .select2-search--dropdown .select2-search__field {
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            padding: 8px 12px !important;
            font-size: 14px;
            outline: none;
            background-color: #ffffff !important;
            color: #111827 !important;
        }

        .dark .select2-search--dropdown .select2-search__field {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f3f4f6 !important;
        }

        .select2-search--dropdown .select2-search__field:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Dropdown results */
        .select2-results__option {
            padding: 8px 12px !important;
            font-size: 14px;
        }

        .select2-results__option--highlighted {
            background-color: #3b82f6 !important;
        }

        /* Container dropdown */
        .select2-dropdown {
            border: 1px solid #d1d5db !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Modal animation */
        .modal-pop {
            animation: pop .16s ease-out;
            will-change: transform, opacity;
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
    </style>
@endpush
