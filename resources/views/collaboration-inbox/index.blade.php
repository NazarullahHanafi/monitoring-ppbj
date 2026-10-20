@extends('layouts.app')

@section('title', 'Action Inbox Kolaborasi')

@section('content')
    @php
        $department = strtolower((string) auth()->user()->department);
        $statusLabels = [
            'sent' => 'Menunggu diterima', 'acknowledged' => 'Sudah diterima',
            'in_progress' => 'Sedang dikerjakan', 'completed' => 'Selesai',
            'returned' => 'Perlu diperbaiki', 'cancelled' => 'Dibatalkan',
        ];
        $priorityLabels = ['normal' => 'Normal', 'high' => 'Tinggi', 'critical' => 'Kritis'];
        $direction = $filters['direction'] ?? 'inbox';
        $openStatuses = \App\Models\CollaborationHandover::ACTIVE_STATUSES;
    @endphp

    <div id="collaborationInbox" class="ci-shell"
        data-search-url="{{ route('collaboration-calendar.ppbj-search') }}"
        data-department="{{ $department }}">
        <section class="ci-hero">
            <div class="ci-hero__copy">
                <div class="ci-live"><span></span> COLLABORATIVE WORKSPACE</div>
                <h1>Action Inbox <em>&</em> Serah Terima</h1>
                <p>Satu ruang kerja lintas-role untuk menerima, mengerjakan, membuktikan, dan menyelesaikan setiap perpindahan pekerjaan.</p>
                <div class="ci-role-flow">
                    <span>{{ ucfirst($department) }}</span><b>⇄</b><span>{{ ucfirst($targetDepartment) }}</span>
                </div>
            </div>
            <div class="ci-hero__actions">
                <button type="button" class="ci-button ci-button--ghost" id="ciFocusButton">⛶ Mode Fokus</button>
                <button type="button" class="ci-button ci-button--primary" id="ciOpenCreate">＋ Buat Serah Terima</button>
            </div>
        </section>

        @if(session('success'))
            <div class="ci-alert ci-alert--success"><span>✓</span><div><strong>Berhasil</strong><p>{{ session('success') }}</p></div></div>
        @endif
        @if($errors->any())
            <div class="ci-alert ci-alert--danger"><span>!</span><div><strong>Perlu diperiksa</strong><p>{{ $errors->first() }}</p></div></div>
        @endif

        <section class="ci-metrics" aria-label="Ringkasan action inbox">
            <article data-tone="blue"><span>MASUK & AKTIF</span><strong>{{ (int) ($stats->inbox_open ?? 0) }}</strong><small>Untuk {{ ucfirst($department) }}</small></article>
            <article data-tone="violet"><span>TUGAS SAYA</span><strong>{{ (int) ($stats->assigned_to_me ?? 0) }}</strong><small>Ditugaskan langsung</small></article>
            <article data-tone="rose"><span>MELEWATI TARGET</span><strong>{{ (int) ($stats->overdue ?? 0) }}</strong><small>Perlu keputusan cepat</small></article>
            <article data-tone="emerald"><span>SELESAI 30 HARI</span><strong>{{ (int) ($stats->completed_recent ?? 0) }}</strong><small>Kolaborasi dituntaskan</small></article>
        </section>

        <form method="GET" class="ci-filter">
            <label class="ci-search"><span>⌕</span><input name="q" value="{{ $filters['q'] ?? '' }}" placeholder="Cari nomor PR, pekerjaan, atau isi serah terima..."></label>
            <label><span>Arah</span><select name="direction">
                <option value="inbox" @selected($direction === 'inbox')>Kotak masuk</option>
                <option value="outbox" @selected($direction === 'outbox')>Terkirim</option>
                <option value="mine" @selected($direction === 'mine')>Tugas saya</option>
                <option value="all" @selected($direction === 'all')>Semua terlihat</option>
            </select></label>
            <label><span>Status</span><select name="status">
                <option value="open">Masih aktif</option>
                @foreach($statusLabels as $value => $label)<option value="{{ $value }}" @selected(($filters['status'] ?? '') === $value)>{{ $label }}</option>@endforeach
            </select></label>
            <label><span>Prioritas</span><select name="priority">
                <option value="">Semua prioritas</option>
                @foreach($priorityLabels as $value => $label)<option value="{{ $value }}" @selected(($filters['priority'] ?? '') === $value)>{{ $label }}</option>@endforeach
            </select></label>
            <button class="ci-button ci-button--filter" type="submit">Terapkan</button>
            <a class="ci-reset" href="{{ route('collaboration-inbox.index') }}">Reset</a>
        </form>

        <div class="ci-layout">
            <main class="ci-main">
                <div class="ci-section-head">
                    <div><span>ALUR KERJA TERKENDALI</span><h2>{{ $direction === 'outbox' ? 'Serah Terima Terkirim' : ($direction === 'mine' ? 'Tugas Saya' : 'Kotak Masuk Kolaborasi') }}</h2></div>
                    <b>{{ number_format($handovers->total()) }} tugas</b>
                </div>

                <div class="ci-list">
                    @forelse($handovers as $handover)
                        @php
                            $progress = $handover->checklistProgress();
                            $isReceiver = $handover->to_department === $department;
                            $isCreatorSide = (int) $handover->created_by_user_id === (int) auth()->id()
                                || ($handover->from_department === $department && strtolower((string) auth()->user()->role) === 'superadmin');
                            $isAssignedToOther = $handover->assigned_to_user_id && $handover->assigned_to_user_id !== auth()->id() && auth()->user()->role !== 'superadmin';
                            $canWork = $isReceiver && !$isAssignedToOther && in_array($handover->status, $openStatuses, true);
                            $recordUrl = $department === 'umum'
                                ? route('ppbj.index', ['search' => $handover->ppbj?->ppbj_no])
                                : route('tracking.index', ['q' => $handover->ppbj?->ppbj_no]);
                        @endphp
                        <article class="ci-task" data-priority="{{ $handover->priority }}" data-status="{{ $handover->status }}">
                            <div class="ci-task__rail"></div>
                            <div class="ci-task__body">
                                <header class="ci-task__head">
                                    <div class="ci-task__title">
                                        <div class="ci-badges">
                                            <span class="ci-priority" data-tone="{{ $handover->priority }}">{{ $priorityLabels[$handover->priority] ?? strtoupper($handover->priority) }}</span>
                                            <span class="ci-status" data-tone="{{ $handover->status }}">{{ $statusLabels[$handover->status] ?? $handover->status }}</span>
                                            @if($handover->isOverdue())<span class="ci-overdue">Terlambat {{ $handover->due_at->diffInDays(now()) }} hari</span>@endif
                                        </div>
                                        <h3>{{ $handover->title }}</h3>
                                        <a href="{{ $recordUrl }}">{{ $handover->ppbj?->ppbj_no ?: 'Tanpa referensi PR' }} · {{ $handover->ppbj?->uraian ?: 'Data PR tidak tersedia' }}</a>
                                    </div>
                                    <div class="ci-flow"><span>{{ ucfirst($handover->from_department) }}</span><b>→</b><span>{{ ucfirst($handover->to_department) }}</span></div>
                                </header>

                                <p class="ci-task__description">{{ $handover->description }}</p>

                                <div class="ci-task__meta">
                                    <div><span>DIBUAT OLEH</span><strong>{{ $handover->creator?->name ?: 'User tidak tersedia' }}</strong><small>{{ $handover->created_at->translatedFormat('d M Y · H:i') }}</small></div>
                                    <div><span>PENANGGUNG JAWAB</span><strong>{{ $handover->assignee?->name ?: 'Belum ditentukan' }}</strong><small>{{ $handover->assignee ? ucfirst($handover->assignee->department) : 'Dapat diklaim penerima' }}</small></div>
                                    <div><span>TARGET</span><strong>{{ $handover->due_at?->translatedFormat('d M Y · H:i') ?: 'Tanpa batas waktu' }}</strong><small>{{ $handover->due_at ? $handover->due_at->diffForHumans() : 'Atur sesuai kesepakatan' }}</small></div>
                                    <div><span>CHECKLIST</span><strong>{{ $progress['checked'] }}/{{ $progress['total'] }} lengkap</strong><div class="ci-progress"><i style="width:{{ $progress['percent'] }}%"></i></div></div>
                                </div>

                                @if($handover->last_note)
                                    <div class="ci-note"><span>CATATAN TERAKHIR</span><p>{{ $handover->last_note }}</p></div>
                                @endif

                                @if(count($handover->checklist ?? []) > 0)
                                    <details class="ci-checklist" @if($handover->status === 'returned') open @endif>
                                        <summary><span>Checklist bukti serah terima</span><b>{{ $progress['percent'] }}%</b></summary>
                                        <form method="POST" action="{{ route('collaboration-inbox.checklist', $handover) }}">
                                            @csrf @method('PATCH')
                                            <input type="hidden" name="version" value="{{ $handover->version }}">
                                            <div class="ci-checklist__items">
                                                @foreach($handover->checklist as $item)
                                                    <label><input type="checkbox" name="checked[]" value="{{ $item['key'] }}" @checked($item['checked'] ?? false) @disabled(!$canWork)><span>{{ $item['label'] }}</span></label>
                                                @endforeach
                                            </div>
                                            @if($canWork)<button class="ci-mini-button" type="submit">Simpan checklist</button>@endif
                                        </form>
                                    </details>
                                @endif

                                <footer class="ci-task__footer">
                                    <div class="ci-audit"><span>Versi {{ $handover->version }}</span><span>•</span><span>Diperbarui {{ $handover->updated_at->diffForHumans() }}</span></div>
                                    <div class="ci-task__actions">
                                        <a class="ci-action ci-action--soft" href="{{ $recordUrl }}">Buka PR</a>
                                        @if($canWork && $handover->status === 'sent')
                                            <form method="POST" action="{{ route('collaboration-inbox.status', $handover) }}">@csrf @method('PATCH')<input type="hidden" name="version" value="{{ $handover->version }}"><input type="hidden" name="action" value="acknowledge"><button class="ci-action ci-action--blue">Terima tugas</button></form>
                                        @elseif($canWork && $handover->status === 'acknowledged')
                                            <form method="POST" action="{{ route('collaboration-inbox.status', $handover) }}">@csrf @method('PATCH')<input type="hidden" name="version" value="{{ $handover->version }}"><input type="hidden" name="action" value="start"><button class="ci-action ci-action--violet">Mulai kerjakan</button></form>
                                        @endif
                                        @if($canWork && in_array($handover->status, ['acknowledged','in_progress'], true))
                                            <form method="POST" action="{{ route('collaboration-inbox.status', $handover) }}">@csrf @method('PATCH')<input type="hidden" name="version" value="{{ $handover->version }}"><input type="hidden" name="action" value="complete"><button class="ci-action ci-action--green">Tandai selesai</button></form>
                                        @endif
                                        @if($canWork && in_array($handover->status, ['sent','acknowledged','in_progress'], true))
                                            <button type="button" class="ci-action ci-action--amber ci-note-action" data-action="return" data-url="{{ route('collaboration-inbox.status', $handover) }}" data-version="{{ $handover->version }}">Kembalikan</button>
                                        @endif
                                        @if($isCreatorSide && $handover->status === 'returned')
                                            <button type="button" class="ci-action ci-action--blue ci-note-action" data-action="resend" data-url="{{ route('collaboration-inbox.status', $handover) }}" data-version="{{ $handover->version }}">Kirim ulang</button>
                                        @endif
                                        @if($isCreatorSide && in_array($handover->status, ['sent','returned'], true))
                                            <form method="POST" action="{{ route('collaboration-inbox.status', $handover) }}" onsubmit="return confirm('Batalkan serah terima ini?')">@csrf @method('PATCH')<input type="hidden" name="version" value="{{ $handover->version }}"><input type="hidden" name="action" value="cancel"><button class="ci-action ci-action--danger">Batalkan</button></form>
                                        @endif
                                    </div>
                                </footer>
                            </div>
                        </article>
                    @empty
                        <div class="ci-empty"><span>✓</span><h3>Tidak ada pekerjaan pada filter ini</h3><p>Kotak kerja bersih. Ubah filter atau buat serah terima baru untuk berkolaborasi.</p></div>
                    @endforelse
                </div>
                <div class="ci-pagination">{{ $handovers->links() }}</div>
            </main>

            <aside class="ci-side">
                <section class="ci-panel ci-radar">
                    <div class="ci-panel__head"><div><span>SMART ACTION RADAR</span><h2>Saran Tindakan</h2></div><b>{{ $smartActions->count() }}</b></div>
                    <p class="ci-panel__intro">Dihitung dari kondisi data terbaru, dibatasi maksimal 12 rekomendasi, dan di-cache singkat agar server tetap ringan.</p>
                    <div class="ci-radar__list">
                        @forelse($smartActions as $action)
                            <a href="{{ $action['url'] }}" class="ci-radar-item" data-priority="{{ $action['priority'] }}">
                                <span class="ci-radar-item__dot"></span><div><small>{{ $action['number'] }}</small><strong>{{ $action['title'] }}</strong><p>{{ $action['description'] }}</p><em>{{ $action['portfolio'] ?: 'Tanpa portofolio' }} · {{ $action['owner'] ?: 'Belum ada PIC' }}</em></div><b>→</b>
                            </a>
                        @empty
                            <div class="ci-panel-empty">Tidak ada rekomendasi mendesak.</div>
                        @endforelse
                    </div>
                </section>

                <section class="ci-panel">
                    <div class="ci-panel__head"><div><span>WORKLOAD VISIBILITY</span><h2>Beban Tim {{ ucfirst($department) }}</h2></div></div>
                    <div class="ci-workload">
                        @forelse($workload as $member)
                            @php $maxLoad = max(1, (int) ($workload->max('total') ?? 1)); @endphp
                            <div><header><span>{{ $member->name }}</span><b>{{ $member->total }} aktif</b></header><i><span style="width:{{ min(100, round(($member->total / $maxLoad) * 100)) }}%"></span></i></div>
                        @empty
                            <div class="ci-panel-empty">Belum ada tugas yang ditetapkan.</div>
                        @endforelse
                    </div>
                </section>

                <section class="ci-future">
                    <span>FUTURE READY</span><h3>Fondasi yang sudah tersedia</h3>
                    <ul><li>Audit trail dan versi anti-timpa</li><li>Checklist bukti yang terukur</li><li>Skor urgensi dan workload</li><li>Siap dikembangkan ke notifikasi terjadwal</li></ul>
                </section>
            </aside>
        </div>
    </div>

    <div id="ciCreateModal" class="ci-modal" hidden>
        <section class="ci-dialog" role="dialog" aria-modal="true" aria-labelledby="ciCreateTitle">
            <header><div><span>SERAH TERIMA LINTAS-ROLE</span><h2 id="ciCreateTitle">Kirim pekerjaan ke {{ ucfirst($targetDepartment) }}</h2><p>Pilih PR, jelaskan hasil yang diharapkan, lalu tetapkan bukti pemeriksaannya.</p></div><button type="button" id="ciCloseCreate" aria-label="Tutup">×</button></header>
            <form method="POST" action="{{ route('collaboration-inbox.store') }}" id="ciCreateForm">@csrf
                <div class="ci-dialog__body">
                    <label class="ci-field ci-field--wide"><span>Cari referensi PR</span><div class="ci-pr-search"><input id="ciPrSearch" autocomplete="off" placeholder="Nomor PR, uraian, buyer, vendor..."><i>⌕</i></div><small id="ciPrSearchHint">Ketik minimal 2 karakter. Pencarian berjalan saat Anda berhenti mengetik.</small><div id="ciPrResults" class="ci-pr-results" hidden></div><input type="hidden" name="ppbj_id" id="ciPpbjId" required></label>
                    <div id="ciSelectedPr" class="ci-selected-pr" hidden><span>PR TERPILIH</span><strong id="ciSelectedPrNumber"></strong><p id="ciSelectedPrDescription"></p></div>
                    <label class="ci-field ci-field--wide"><span>Judul serah terima</span><input name="title" id="ciTitle" maxlength="140" required placeholder="Contoh: Review kelengkapan dokumen kontrak"></label>
                    <label class="ci-field ci-field--wide"><span>Hasil yang diharapkan</span><textarea name="description" maxlength="2000" rows="4" required placeholder="Jelaskan apa yang sudah dikerjakan, apa yang harus diperiksa, dan keputusan apa yang dibutuhkan."></textarea></label>
                    <label class="ci-field"><span>Prioritas</span><select name="priority" required><option value="normal">Normal</option><option value="high">Tinggi</option><option value="critical">Kritis</option></select></label>
                    <label class="ci-field"><span>Target selesai</span><input type="datetime-local" name="due_at" min="{{ now()->addMinute()->format('Y-m-d\TH:i') }}"></label>
                    <label class="ci-field ci-field--wide"><span>Penanggung jawab {{ ucfirst($targetDepartment) }}</span><select name="assigned_to_user_id"><option value="">Belum ditentukan — dapat diklaim tim</option>@foreach($users->where('department', $targetDepartment) as $user)<option value="{{ $user->id }}">{{ $user->name }} · {{ ucfirst($user->role) }}</option>@endforeach</select></label>
                    <fieldset class="ci-evidence ci-field--wide"><legend>Checklist bukti</legend><p>Pilih bukti yang wajib diverifikasi penerima sebelum tugas dapat diselesaikan.</p>
                        @foreach(['Nomor dan uraian PR sudah sesuai','Nilai PR sudah diverifikasi','Lampiran pendukung sudah lengkap','PIC dan tindak lanjut sudah jelas','Deadline sudah disepakati'] as $item)
                            <label><input type="checkbox" name="checklist_items[]" value="{{ $item }}" checked><span>{{ $item }}</span></label>
                        @endforeach
                    </fieldset>
                </div>
                <footer><button type="button" class="ci-button ci-button--ghost" id="ciCancelCreate">Batal</button><button type="submit" class="ci-button ci-button--primary">Kirim Serah Terima →</button></footer>
            </form>
        </section>
    </div>

    <div id="ciNoteModal" class="ci-modal" hidden>
        <section class="ci-dialog ci-dialog--small" role="dialog" aria-modal="true"><header><div><span>TINDAK LANJUT</span><h2 id="ciNoteTitle">Tambahkan catatan</h2><p>Catatan membantu departemen lain memahami keputusan Anda.</p></div><button type="button" id="ciCloseNote">×</button></header><form method="POST" id="ciNoteForm">@csrf @method('PATCH')<input type="hidden" name="version" id="ciNoteVersion"><input type="hidden" name="action" id="ciNoteAction"><div class="ci-dialog__body"><label class="ci-field ci-field--wide"><span>Catatan</span><textarea name="note" rows="5" maxlength="1200" required placeholder="Jelaskan bagian yang perlu ditindaklanjuti..."></textarea></label></div><footer><button type="button" class="ci-button ci-button--ghost" id="ciCancelNote">Batal</button><button class="ci-button ci-button--primary" type="submit">Simpan keputusan</button></footer></form></section>
    </div>
@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/collaboration-inbox/inbox.css') }}?v={{ filemtime(public_path('assets/collaboration-inbox/inbox.css')) }}">
@endpush

@push('scripts')
    <script src="{{ asset('assets/collaboration-inbox/inbox.js') }}?v={{ filemtime(public_path('assets/collaboration-inbox/inbox.js')) }}" defer></script>
@endpush
