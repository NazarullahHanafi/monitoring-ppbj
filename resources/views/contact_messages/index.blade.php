@extends('layouts.app')

@section('title', 'Pesan Contact')

@push('styles')
    <style>
        .cm-page {
            padding: 1.5rem;
            color: #111827;
        }

        .dark .cm-page {
            color: #f9fafb;
        }

        .cm-shell {
            display: grid;
            gap: 1.25rem;
        }

        .cm-hero {
            border: 1px solid #dbeafe;
            border-radius: 1.5rem;
            background:
                radial-gradient(circle at 92% 10%, rgba(37, 99, 235, .12), transparent 22rem),
                linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
            box-shadow: 0 18px 45px rgba(15, 23, 42, .08);
            padding: 1.5rem;
        }

        .dark .cm-hero {
            border-color: rgba(96, 165, 250, .24);
            background:
                radial-gradient(circle at 92% 10%, rgba(96, 165, 250, .18), transparent 22rem),
                linear-gradient(135deg, #0f172a 0%, #111827 100%);
            box-shadow: 0 18px 45px rgba(0, 0, 0, .25);
        }

        .cm-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(320px, 520px);
            gap: 1.25rem;
            align-items: end;
        }

        .cm-kicker {
            display: inline-flex;
            align-items: center;
            gap: .55rem;
            border: 1px solid #bfdbfe;
            border-radius: 999px;
            background: #eff6ff;
            color: #1d4ed8;
            font-size: .72rem;
            font-weight: 900;
            letter-spacing: .12em;
            text-transform: uppercase;
            padding: .45rem .8rem;
            margin-bottom: .9rem;
        }

        .dark .cm-kicker {
            border-color: rgba(96, 165, 250, .28);
            background: rgba(37, 99, 235, .16);
            color: #bfdbfe;
        }

        .cm-title {
            margin: 0;
            color: #0f172a;
            font-size: clamp(2rem, 4vw, 3.25rem);
            line-height: 1;
            letter-spacing: -.05em;
            font-weight: 950;
        }

        .dark .cm-title {
            color: #ffffff;
        }

        .cm-subtitle {
            margin: .85rem 0 0;
            max-width: 44rem;
            color: #475569;
            font-size: .95rem;
            line-height: 1.8;
            font-weight: 600;
        }

        .dark .cm-subtitle {
            color: #cbd5e1;
        }

        .cm-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: .85rem;
        }

        .cm-stat {
            border: 1px solid #e5e7eb;
            border-radius: 1.15rem;
            background: rgba(255, 255, 255, .82);
            padding: 1rem;
        }

        .dark .cm-stat {
            border-color: rgba(148, 163, 184, .22);
            background: rgba(15, 23, 42, .62);
        }

        .cm-stat-label {
            color: #64748b;
            font-size: .72rem;
            font-weight: 900;
            letter-spacing: .09em;
            text-transform: uppercase;
        }

        .dark .cm-stat-label {
            color: #94a3b8;
        }

        .cm-stat-value {
            margin-top: .35rem;
            color: #0f172a;
            font-size: 2rem;
            line-height: 1;
            font-weight: 950;
        }

        .dark .cm-stat-value {
            color: #ffffff;
        }

        .cm-stat.unread {
            border-color: #fecaca;
            background: #fff1f2;
        }

        .cm-stat.unread .cm-stat-label,
        .cm-stat.unread .cm-stat-value {
            color: #dc2626;
        }

        .dark .cm-stat.unread {
            border-color: rgba(248, 113, 113, .28);
            background: rgba(127, 29, 29, .24);
        }

        .dark .cm-stat.unread .cm-stat-label,
        .dark .cm-stat.unread .cm-stat-value {
            color: #fca5a5;
        }

        .cm-stat.read {
            border-color: #bbf7d0;
            background: #f0fdf4;
        }

        .cm-stat.read .cm-stat-label,
        .cm-stat.read .cm-stat-value {
            color: #047857;
        }

        .dark .cm-stat.read {
            border-color: rgba(52, 211, 153, .28);
            background: rgba(6, 78, 59, .24);
        }

        .dark .cm-stat.read .cm-stat-label,
        .dark .cm-stat.read .cm-stat-value {
            color: #86efac;
        }

        .cm-alert {
            border: 1px solid #bbf7d0;
            border-radius: 1rem;
            background: #f0fdf4;
            color: #047857;
            padding: .9rem 1rem;
            font-weight: 800;
        }

        .dark .cm-alert {
            border-color: rgba(52, 211, 153, .28);
            background: rgba(6, 78, 59, .22);
            color: #86efac;
        }

        .cm-panel,
        .cm-message {
            border: 1px solid #e5e7eb;
            border-radius: 1.35rem;
            background: #ffffff;
            box-shadow: 0 12px 30px rgba(15, 23, 42, .06);
        }

        .dark .cm-panel,
        .dark .cm-message {
            border-color: rgba(148, 163, 184, .22);
            background: #111827;
            box-shadow: 0 12px 30px rgba(0, 0, 0, .24);
        }

        .cm-panel {
            padding: 1rem;
        }

        .cm-filter {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 190px auto;
            gap: .75rem;
            align-items: center;
        }

        .cm-input,
        .cm-select {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 1rem;
            background: #f9fafb;
            color: #111827;
            padding: .85rem 1rem;
            font-size: .88rem;
            outline: none;
        }

        .cm-input:focus,
        .cm-select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, .12);
        }

        .dark .cm-input,
        .dark .cm-select {
            border-color: rgba(148, 163, 184, .28);
            background: #0f172a;
            color: #f8fafc;
        }

        .cm-actions {
            display: flex;
            gap: .6rem;
            flex-wrap: wrap;
        }

        .cm-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .45rem;
            border-radius: 1rem;
            border: 1px solid transparent;
            padding: .82rem 1.05rem;
            font-size: .84rem;
            font-weight: 900;
            text-decoration: none;
            cursor: pointer;
            transition: .18s ease;
            white-space: nowrap;
        }

        .cm-btn:hover {
            transform: translateY(-1px);
        }

        .cm-btn.primary {
            background: #2563eb;
            color: #ffffff;
        }

        .cm-btn.secondary {
            border-color: #d1d5db;
            background: #ffffff;
            color: #374151;
        }

        .cm-btn.danger {
            border-color: #fecaca;
            background: #fff;
            color: #dc2626;
        }

        .dark .cm-btn.secondary {
            border-color: rgba(148, 163, 184, .28);
            background: #0f172a;
            color: #e5e7eb;
        }

        .dark .cm-btn.danger {
            border-color: rgba(248, 113, 113, .32);
            background: #0f172a;
            color: #fca5a5;
        }

        .cm-list {
            display: grid;
            gap: 1rem;
        }

        .cm-message {
            overflow: hidden;
        }

        .cm-message.unread {
            border-color: #93c5fd;
            box-shadow: 0 12px 34px rgba(37, 99, 235, .12);
        }

        .dark .cm-message.unread {
            border-color: rgba(96, 165, 250, .55);
        }

        .cm-message-head {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 1rem;
            align-items: start;
            border-bottom: 1px solid #e5e7eb;
            background: #f8fafc;
            padding: 1.05rem 1.2rem;
        }

        .cm-message.unread .cm-message-head {
            background: #eff6ff;
        }

        .dark .cm-message-head {
            border-color: rgba(148, 163, 184, .18);
            background: #0f172a;
        }

        .dark .cm-message.unread .cm-message-head {
            background: rgba(30, 64, 175, .20);
        }

        .cm-sender {
            display: flex;
            align-items: center;
            gap: .85rem;
            min-width: 0;
        }

        .cm-avatar {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 1rem;
            display: grid;
            place-items: center;
            background: #2563eb;
            color: #ffffff;
            font-weight: 950;
            flex: 0 0 auto;
        }

        .cm-name {
            color: #111827;
            font-weight: 950;
            line-height: 1.2;
        }

        .dark .cm-name {
            color: #ffffff;
        }

        .cm-email {
            color: #2563eb;
            font-size: .78rem;
            font-weight: 800;
            text-decoration: none;
        }

        .dark .cm-email {
            color: #93c5fd;
        }

        .cm-meta {
            display: flex;
            justify-content: flex-end;
            gap: .5rem;
            flex-wrap: wrap;
        }

        .cm-badge {
            border-radius: 999px;
            padding: .38rem .65rem;
            font-size: .68rem;
            font-weight: 950;
            letter-spacing: .04em;
            text-transform: uppercase;
        }

        .cm-badge.new {
            background: #fee2e2;
            color: #dc2626;
        }

        .cm-badge.done {
            background: #dcfce7;
            color: #047857;
        }

        .cm-badge.time {
            background: #ffffff;
            color: #64748b;
            border: 1px solid #e5e7eb;
        }

        .dark .cm-badge.new {
            background: rgba(127, 29, 29, .45);
            color: #fca5a5;
        }

        .dark .cm-badge.done {
            background: rgba(6, 78, 59, .45);
            color: #86efac;
        }

        .dark .cm-badge.time {
            background: #111827;
            border-color: rgba(148, 163, 184, .18);
            color: #cbd5e1;
        }

        .cm-message-body {
            padding: 1.2rem;
        }

        .cm-subject {
            margin: 0;
            color: #111827;
            font-size: 1.15rem;
            font-weight: 950;
            line-height: 1.35;
        }

        .dark .cm-subject {
            color: #ffffff;
        }

        .cm-text {
            margin-top: .9rem;
            border-radius: 1rem;
            background: #f9fafb;
            color: #374151;
            padding: 1rem;
            font-size: .9rem;
            line-height: 1.75;
            white-space: pre-line;
        }

        .dark .cm-text {
            background: #0f172a;
            color: #d1d5db;
        }

        .cm-foot {
            display: flex;
            justify-content: space-between;
            gap: .9rem;
            flex-wrap: wrap;
            border-top: 1px solid #e5e7eb;
            padding: 1rem 1.2rem;
            color: #64748b;
            font-size: .76rem;
            font-weight: 700;
        }

        .dark .cm-foot {
            border-color: rgba(148, 163, 184, .18);
            color: #94a3b8;
        }

        .cm-empty {
            border: 1px dashed #cbd5e1;
            border-radius: 1.35rem;
            background: #ffffff;
            padding: 3rem 1.2rem;
            text-align: center;
        }

        .dark .cm-empty {
            border-color: rgba(148, 163, 184, .28);
            background: #111827;
        }

        .cm-empty-icon {
            width: 4rem;
            height: 4rem;
            margin: 0 auto 1rem;
            display: grid;
            place-items: center;
            border-radius: 1.25rem;
            background: #f1f5f9;
            font-size: 1.7rem;
        }

        .dark .cm-empty-icon {
            background: #0f172a;
        }

        @media (max-width: 1024px) {
            .cm-hero-grid,
            .cm-filter {
                grid-template-columns: 1fr;
            }

            .cm-stats {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (max-width: 640px) {
            .cm-page {
                padding: 1rem;
            }

            .cm-stats,
            .cm-message-head {
                grid-template-columns: 1fr;
            }

            .cm-meta {
                justify-content: flex-start;
            }

            .cm-actions {
                width: 100%;
            }

            .cm-btn {
                flex: 1 1 auto;
            }
        }
    </style>
@endpush

@section('content')
    <div class="cm-page">
        <div class="cm-shell">
            <section class="cm-hero">
                <div class="cm-hero-grid">
                    <div>
                        <div class="cm-kicker">
                            <span>💬</span>
                            <span>Inbox Landing</span>
                        </div>
                        <h1 class="cm-title">Pesan Contact</h1>
                        <p class="cm-subtitle">
                            Semua pesan dari halaman Contact SIMONPR masuk ke sini. Menu ini hanya muncul dan hanya
                            dapat diakses oleh akun <strong>Superadmin Umum</strong>.
                        </p>
                    </div>

                    <div class="cm-stats">
                        <div class="cm-stat">
                            <div class="cm-stat-label">Total</div>
                            <div class="cm-stat-value">{{ number_format($stats['total']) }}</div>
                        </div>
                        <div class="cm-stat unread">
                            <div class="cm-stat-label">Belum Dibaca</div>
                            <div class="cm-stat-value">{{ number_format($stats['unread']) }}</div>
                        </div>
                        <div class="cm-stat read">
                            <div class="cm-stat-label">Dibaca</div>
                            <div class="cm-stat-value">{{ number_format($stats['read']) }}</div>
                        </div>
                    </div>
                </div>
            </section>

            @if(session('success'))
                <div class="cm-alert">{{ session('success') }}</div>
            @endif

            <section class="cm-panel">
                <form method="GET" action="{{ route('contact-messages.index') }}" class="cm-filter">
                    <input id="search" name="search" value="{{ request('search') }}" class="cm-input"
                        placeholder="Cari nama, email, subjek, atau isi pesan...">

                    <select name="status" class="cm-select">
                        <option value="">Semua status</option>
                        <option value="unread" @selected(request('status') === 'unread')>Belum dibaca</option>
                        <option value="read" @selected(request('status') === 'read')>Sudah dibaca</option>
                    </select>

                    <div class="cm-actions">
                        <button class="cm-btn primary" type="submit">
                            <i class="fas fa-filter"></i>
                            Filter
                        </button>
                        <a href="{{ route('contact-messages.index') }}" class="cm-btn secondary">Reset</a>
                    </div>
                </form>
            </section>

            <section class="cm-list">
                @forelse($messages as $message)
                    <article class="cm-message {{ $message->read_at ? '' : 'unread' }}">
                        <div class="cm-message-head">
                            <div class="cm-sender">
                                <div class="cm-avatar">{{ strtoupper(mb_substr($message->name, 0, 1)) }}</div>
                                <div style="min-width:0">
                                    <div class="cm-name">{{ $message->name }}</div>
                                    <a class="cm-email" href="mailto:{{ $message->email }}">{{ $message->email }}</a>
                                </div>
                            </div>

                            <div class="cm-meta">
                                @if(!$message->read_at)
                                    <span class="cm-badge new">Baru</span>
                                @else
                                    <span class="cm-badge done">Dibaca</span>
                                @endif
                                <span class="cm-badge time">{{ $message->created_at->format('d M Y H:i') }}</span>
                            </div>
                        </div>

                        <div class="cm-message-body">
                            <h2 class="cm-subject">{{ $message->subject }}</h2>
                            <div class="cm-text">{{ $message->message }}</div>
                        </div>

                        <div class="cm-foot">
                            <div>
                                IP: {{ $message->ip_address ?: '-' }}
                                @if($message->read_at)
                                    <span style="margin-left:.75rem">Dibaca: {{ $message->read_at->format('d M Y H:i') }}</span>
                                @endif
                            </div>

                            <div class="cm-actions">
                                <form method="POST" action="{{ route('contact-messages.read', $message) }}">
                                    @csrf
                                    @method('PUT')
                                    <button type="submit" class="cm-btn secondary">
                                        {{ $message->read_at ? 'Tandai Belum Dibaca' : 'Tandai Dibaca' }}
                                    </button>
                                </form>
                                <form method="POST" action="{{ route('contact-messages.destroy', $message) }}"
                                    onsubmit="return confirm('Yakin hapus pesan contact ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="cm-btn danger">Hapus</button>
                                </form>
                            </div>
                        </div>
                    </article>
                @empty
                    <div class="cm-empty">
                        <div class="cm-empty-icon">📭</div>
                        <h2 class="cm-subject">Belum ada pesan</h2>
                        <p class="cm-subtitle" style="margin-left:auto;margin-right:auto">
                            Pesan dari halaman Contact akan muncul di sini.
                        </p>
                    </div>
                @endforelse
            </section>

            <div>
                {{ $messages->links() }}
            </div>
        </div>
    </div>
@endsection
