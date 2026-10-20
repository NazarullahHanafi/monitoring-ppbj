@extends('layouts.app')

@section('title', 'Tempat Sampah ' . $documentType)

@push('styles')
<style>
    .trash-hero{position:relative;overflow:hidden;border-radius:1.5rem;padding:1.5rem;color:#fff;background:linear-gradient(125deg,#0f172a 0%,#1d4ed8 56%,#6d28d9 100%);box-shadow:0 24px 60px rgba(30,64,175,.22)}
    .trash-hero:after{content:"";position:absolute;width:18rem;height:18rem;right:-6rem;top:-10rem;border-radius:999px;background:rgba(255,255,255,.12);filter:blur(1px)}
    .trash-card{border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff;box-shadow:0 12px 35px rgba(15,23,42,.07);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
    .trash-card:hover{transform:translateY(-2px);border-color:#93c5fd;box-shadow:0 18px 45px rgba(37,99,235,.12)}
    .dark .trash-card{border-color:#334155;background:#111827;box-shadow:0 14px 36px rgba(0,0,0,.3)}
    .dark .trash-card:hover{border-color:#3b82f6}
    .trash-chip{display:inline-flex;align-items:center;gap:.35rem;border-radius:999px;padding:.35rem .65rem;font-size:.7rem;font-weight:800;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe}
    .dark .trash-chip{background:#172554;color:#bfdbfe;border-color:#1d4ed8}
    .trash-action{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;border-radius:.8rem;padding:.7rem .9rem;font-size:.78rem;font-weight:900;transition:transform .15s ease,filter .15s ease}
    .trash-action:hover{transform:translateY(-1px);filter:brightness(1.04)}
    .trash-restore{background:linear-gradient(135deg,#2563eb,#4f46e5);color:#fff}
    .trash-force{background:#fff1f2;color:#be123c;border:1px solid #fecdd3}
    .dark .trash-force{background:#4c0519;color:#fecdd3;border-color:#9f1239}
    .trash-swal{border-radius:1.4rem!important}
    .trash-swal .swal2-input{box-sizing:border-box;width:100%;height:auto;margin:.2rem 0 .9rem;padding:.8rem .9rem;border:1px solid #cbd5e1;border-radius:.8rem;background:#fff;color:#0f172a;font-size:.85rem}
    .dark .trash-swal{background:#0f172a!important;color:#f8fafc!important}
    .dark .trash-swal .swal2-title,.dark .trash-swal .swal2-html-container{color:#f8fafc!important}
    .dark .trash-swal .swal2-input{border-color:#475569;background:#111827;color:#f8fafc}
    @media (prefers-reduced-motion:reduce){.trash-card,.trash-action{transition:none}.trash-card:hover,.trash-action:hover{transform:none}}
</style>
@endpush

@section('content')
<div class="space-y-6">
    <section class="trash-hero">
        <div class="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
                <div class="mb-2 text-xs font-black uppercase tracking-[.22em] text-cyan-200">Recovery Center</div>
                <h1 class="text-2xl font-black tracking-tight md:text-3xl">Tempat Sampah {{ $documentType }}</h1>
                <p class="mt-2 max-w-2xl text-sm leading-6 text-blue-100">Dokumen di sini tidak menghapus perjalanan PR. Pulihkan kapan saja, atau hapus permanen secara khusus setelah seluruh dampaknya dipahami.</p>
            </div>
            <a href="{{ $indexRoute }}" class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-sm font-black text-white backdrop-blur-sm hover:bg-white/25">
                <span aria-hidden="true">←</span> Kembali ke {{ $documentType }}
            </a>
        </div>
    </section>

    <div class="grid gap-4">
        @forelse($documents as $document)
            @php
                $number = $documentType === 'SP' ? $document->nomor_sp : $document->nomor_spph;
                $date = $documentType === 'SP' ? $document->tanggal_sp : $document->tanggal;
                $downstream = $document->ppbjs->filter(fn($ppbj) => filled($ppbj->awarding_sp ?? null) || filled($ppbj->do_no ?? null) || filled($ppbj->bpg_no ?? null) || filled($ppbj->no_invoice ?? null));
            @endphp
            <article class="trash-card p-5">
                <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="trash-chip">{{ $documentType }}</span>
                            <span class="trash-chip">{{ $document->ppbjs->count() }} PR terhubung</span>
                            @if($downstream->isNotEmpty())
                                <span class="inline-flex rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[.7rem] font-black text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">{{ $downstream->count() }} PR memiliki proses lanjutan</span>
                            @endif
                        </div>
                        <h2 class="mt-3 break-words font-mono text-lg font-black text-slate-900 dark:text-white">{{ $number }}</h2>
                        <p class="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{{ $document->deskripsi_pengadaan ?: 'Tanpa deskripsi' }}</p>
                        <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>Vendor: <strong class="text-slate-700 dark:text-slate-200">{{ $document->nama_vendor ?: '-' }}</strong></span>
                            <span>Tanggal: <strong class="text-slate-700 dark:text-slate-200">{{ optional($date)->format('d M Y') ?: '-' }}</strong></span>
                            <span>Diarsipkan: <strong class="text-slate-700 dark:text-slate-200">{{ optional($document->deleted_at)->format('d M Y H:i') }}</strong></span>
                        </div>
                        @if($document->ppbjs->isNotEmpty())
                            <div class="mt-3 flex flex-wrap gap-1.5">
                                @foreach($document->ppbjs->take(8) as $ppbj)
                                    <span class="rounded-lg bg-slate-100 px-2 py-1 font-mono text-[.68rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{{ $ppbj->ppbj_no }}</span>
                                @endforeach
                                @if($document->ppbjs->count() > 8)
                                    <span class="rounded-lg bg-slate-100 px-2 py-1 text-[.68rem] font-bold text-slate-500 dark:bg-slate-800">+{{ $document->ppbjs->count() - 8 }} PR</span>
                                @endif
                            </div>
                        @endif
                    </div>
                    <div class="flex shrink-0 flex-wrap gap-2">
                        <button type="button" class="trash-action trash-restore" onclick="restoreDocument(@js(route($restoreRouteName, $document->id)), @js($number))">↺ Pulihkan</button>
                        @if($canForceDelete)
                            <button type="button" class="trash-action trash-force" onclick="forceDeleteDocument(@js(route($forceDeleteRouteName, $document->id)), @js($number), {{ $downstream->isNotEmpty() ? 'true' : 'false' }})">Hapus permanen</button>
                        @endif
                    </div>
                </div>
            </article>
        @empty
            <div class="trash-card px-6 py-16 text-center">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl dark:bg-blue-950">♻</div>
                <h2 class="mt-4 text-lg font-black text-slate-900 dark:text-white">Tempat sampah kosong</h2>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Tidak ada {{ $documentType }} yang perlu dipulihkan.</p>
            </div>
        @endforelse
    </div>

    {{ $documents->links() }}
</div>
@endsection

@push('scripts')
<script>
    const trashCsrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const trashIsDark = () => document.documentElement.classList.contains('dark');
    const trashTheme = () => ({
        background: trashIsDark() ? '#0f172a' : '#ffffff',
        color: trashIsDark() ? '#f8fafc' : '#0f172a',
        customClass: { popup: 'trash-swal', confirmButton: 'rounded-xl font-black', cancelButton: 'rounded-xl font-black' }
    });

    async function trashRequest(url, method, body = {}) {
        const response = await fetch(url, {
            method,
            headers: { 'X-CSRF-TOKEN': trashCsrf, 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw Object.assign(new Error(data.message || 'Permintaan gagal diproses.'), { data, status: response.status });
        return data;
    }

    async function restoreDocument(url, number) {
        const answer = await Swal.fire({
            icon: 'question', title: 'Pulihkan dokumen?',
            html: `<div class="text-sm leading-6">Dokumen <strong>${String(number).replace(/[&<>"']/g, '')}</strong> dan seluruh relasi PR-nya akan kembali aktif.</div>`,
            showCancelButton: true, confirmButtonText: 'Ya, pulihkan', cancelButtonText: 'Batal', confirmButtonColor: '#2563eb', ...trashTheme()
        });
        if (!answer.isConfirmed) return;
        try {
            const data = await trashRequest(url, 'POST');
            await Swal.fire({ icon: 'success', title: 'Berhasil dipulihkan', text: data.message, timer: 1400, showConfirmButton: false, ...trashTheme() });
            window.location.reload();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Belum dapat dipulihkan', text: error.message, ...trashTheme() });
        }
    }

    async function forceDeleteDocument(url, number, hasDownstream) {
        const answer = await Swal.fire({
            icon: 'warning', title: 'Penghapusan permanen', width: 620,
            html: `<div class="space-y-3 text-left text-sm leading-6">
                <div class="rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100">Tindakan ini tidak dapat dibatalkan. Data PPBJ tidak ikut dihapus dan akan dipulihkan ke sumber dokumen yang masih aktif.</div>
                ${hasDownstream ? '<label class="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"><input id="trashAcknowledge" type="checkbox" class="mt-1"> <span>Saya memahami dokumen ini memiliki proses lanjutan.</span></label>' : ''}
                <label class="block font-bold">Ketik nomor dokumen</label><input id="trashConfirmation" name="permanent_delete_document_number" autocomplete="off" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" class="swal2-input" placeholder="Ketik nomor dokumen di atas">
                <label class="block font-bold">Password pemilik sistem</label><input id="trashPassword" name="permanent_delete_owner_password" type="password" autocomplete="new-password" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" class="swal2-input" placeholder="Password pemilik sistem">
            </div>`,
            showCancelButton: true, confirmButtonText: 'Hapus permanen', cancelButtonText: 'Batal', confirmButtonColor: '#e11d48', ...trashTheme(),
            preConfirm: () => {
                const confirmation = document.getElementById('trashConfirmation')?.value || '';
                const password = document.getElementById('trashPassword')?.value || '';
                const acknowledge = !hasDownstream || Boolean(document.getElementById('trashAcknowledge')?.checked);
                if (confirmation !== number) return Swal.showValidationMessage('Nomor dokumen harus sama persis.');
                if (!password) return Swal.showValidationMessage('Password wajib diisi.');
                if (!acknowledge) return Swal.showValidationMessage('Konfirmasi dampak proses lanjutan wajib dicentang.');
                return { confirmation, password, acknowledge_downstream: acknowledge };
            }
        });
        if (!answer.isConfirmed) return;
        try {
            const data = await trashRequest(url, 'DELETE', answer.value);
            await Swal.fire({ icon: 'success', title: 'Dihapus permanen', text: data.message, ...trashTheme() });
            window.location.reload();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Penghapusan ditolak', text: error.message, ...trashTheme() });
        }
    }
</script>
@endpush
