@extends('layouts.app')
@section('title', 'Persetujuan Selisih Nilai SP')
@push('styles')
<link rel="stylesheet" href="{{ asset('assets/app/procurement-review.css') }}?v={{ filemtime(public_path('assets/app/procurement-review.css')) }}">
@endpush
@section('content')
<div class="pr-review">
    <header class="pr-hero">
        <h1>Persetujuan Selisih Nilai SP</h1>
        <p>Ditinjau akun Umum lain, sebelum SP disimpan. Persetujuan berlaku 7 hari untuk rincian yang sama dan hanya dapat digunakan sekali.</p>
        <a href="{{ route('sp.index') }}" class="pr-secondary" style="color:#fff;border:1px solid #a5b4fc;display:inline-block;padding:8px 14px;border-radius:10px;margin-top:12px">Kembali ke Penomoran SP</a>
    </header>
    @if(session('success')) <div class="pr-card" role="status">{{ session('success') }}</div> @endif
    @if($errors->any()) <div class="pr-alert" role="alert">{{ $errors->first() }}</div> @endif
    <form method="GET" class="pr-card pr-actions">
        <label for="approvalStatus">Status pengajuan</label>
        <select name="status" id="approvalStatus" style="width:auto">
            @foreach(['pending'=>'Menunggu', 'approved'=>'Disetujui', 'rejected'=>'Ditolak', 'consumed'=>'Sudah digunakan'] as $key=>$label)
                <option value="{{ $key }}" @selected($status === $key)>{{ $label }}</option>
            @endforeach
        </select>
        <button type="submit" class="pr-primary">Terapkan Filter</button>
    </form>
    @forelse($approvals as $approval)
        @php($data = $approval->snapshot)
        <article class="pr-card">
            <h2>#{{ $approval->id }} · {{ $data['nomor_sp'] }}</h2>
            <p>{{ $data['description'] ?? '' }}</p>
            <p class="pr-muted">Diajukan {{ $approval->requester?->name ?? 'Pengguna' }} · {{ $approval->created_at->format('d M Y H:i') }} · Berlaku sampai {{ $approval->expires_at->format('d M Y H:i') }} {{ $approval->expires_at->isPast() ? '(kedaluwarsa)' : '' }}</p>
            <div class="pr-metrics">
                <div>PR / gabungan PR<strong>Rp {{ number_format($data['nilai_pr'], 2, ',', '.') }}</strong></div>
                <div>Nilai SP<strong>Rp {{ number_format($data['nilai_sp'], 2, ',', '.') }}</strong></div>
                <div>Selisih lebih<strong>Rp {{ number_format($data['selisih'], 2, ',', '.') }}</strong></div>
            </div>
            <p><strong>Vendor:</strong> {{ $data['vendor'] }}</p>
            <p class="pr-muted">Tanggal SP: {{ $data['tanggal_sp'] ?: 'Belum diisi' }} · {{ $data['item_count'] }} baris item</p>
            @foreach($data['prs'] as $pr)
                <div class="pr-row">{{ $pr['nomor'] }} · PR Rp {{ number_format($pr['nilai_pr'], 2, ',', '.') }} · Alokasi SP Rp {{ number_format($pr['alokasi'], 2, ',', '.') }}</div>
            @endforeach
            @if(empty($data['prs'])) <p>Referensi manual: {{ $data['nomor_pr_manual'] ?: 'Tanpa nomor PR' }}. Nilai PR diisi manual dan perlu diverifikasi.</p> @endif
            <div class="pr-alert"><strong>Alasan pengajuan</strong><p class="pr-reason">{{ $approval->reason }}</p></div>
            @if($approval->decision_note)
                <p class="pr-muted">Ditinjau oleh {{ $approval->reviewer?->name ?? 'Pengguna' }} · {{ $approval->decided_at?->format('d M Y H:i') }}</p>
                <p class="pr-reason">{{ $approval->decision_note }}</p>
            @endif
            @if($approval->status === 'pending' && $approval->expires_at->isFuture() && !auth()->user()->isReadOnly())
                @if((int)$approval->requester_id === (int)auth()->id())
                    <p class="pr-muted">Menunggu akun Umum lain. Pengaju tidak dapat menyetujui pengajuannya sendiri. Setelah disetujui, simpan kembali form SP dengan rincian yang sama.</p>
                @else
                    <form method="POST" action="{{ route('sp.value-approvals.decide', $approval) }}">
                        @csrf
                        <label for="note-{{ $approval->id }}">Catatan keputusan (wajib)</label>
                        <textarea id="note-{{ $approval->id }}" name="decision_note" minlength="5" maxlength="2000" rows="2" required placeholder="Hasil pemeriksaan dan dasar keputusan"></textarea>
                        <div class="pr-actions">
                            <button name="decision" value="approved" class="pr-primary">Setujui selisih</button>
                            <button name="decision" value="rejected" class="pr-secondary">Tolak pengajuan</button>
                        </div>
                    </form>
                @endif
            @endif
        </article>
    @empty
        <div class="pr-card">Tidak ada pengajuan pada status ini.</div>
    @endforelse
    {{ $approvals->links() }}
</div>
@endsection
