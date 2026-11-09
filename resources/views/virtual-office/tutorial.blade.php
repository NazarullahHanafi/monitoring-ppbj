<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow"><title>Panduan Kantor Virtual · SIMONPR</title>
    <link rel="stylesheet" href="{{ asset('assets/virtual-office/tutorial.css') }}?v={{ filemtime(public_path('assets/virtual-office/tutorial.css')) }}">
</head>
<body>
<header class="guide-header"><a class="brand" href="{{ route('virtual-office.tutorial.show') }}"><b>S</b><span>SIMONPR<small>THE CONNECTED CAMPUS</small></span></a><span class="account">{{ ucfirst($user->department) }} · {{ $user->isReadOnly() ? 'Viewer' : ($user->role === 'superadmin' ? 'Super Admin' : 'Anggota tim') }}</span></header>
<main class="guide-shell">
    <aside class="guide-rail" aria-label="Progres tutorial">
        <span class="eyebrow">{{ $replay ? 'PANDUAN ANDA' : 'PERKENALAN SATU KALI' }}</span>
        <h1>Kenali ruang<br>kerja Anda<span>.</span></h1>
        <p>{{ $replay ? 'Tutorial Anda sudah selesai. Baca ulang bagian yang diperlukan kapan saja.' : 'Panduan singkat sesuai akses Anda. Selesaikan setiap langkah untuk mulai menjelajah.' }}</p>
        <ol class="step-list">
            @foreach($steps as $i => $item)
            <li class="{{ $i === $step ? 'current' : ($replay || $i < $step ? 'done' : '') }}" @if($i === $step) aria-current="step" @endif>
                @if($replay)<a href="{{ route('virtual-office.tutorial.show', ['step' => $i]) }}"><span>{{ $i + 1 }}</span>{{ $item['label'] }}</a>
                @else<span>{{ $i < $step ? '✓' : $i + 1 }}</span>{{ $item['label'] }}@endif
            </li>
            @endforeach
        </ol>
        <div class="saved-note"><span aria-hidden="true">◇</span><p>{{ $replay ? 'Selesai untuk akun ini. Membaca ulang tidak mereset progres.' : 'Progres mengikuti akun Anda, termasuk saat pindah perangkat.' }}</p></div>
    </aside>
    <section class="guide-card" aria-labelledby="step-title">
        <div class="guide-art" data-visual="{{ $steps[$step]['visual'] }}" aria-hidden="true">
            <div class="art-grid"></div><div class="art-orbit"></div>
            <div class="art-campus"><div class="art-tree one"></div><div class="art-tree two"></div><div class="art-building"><span>SIMONPR</span><i></i><i></i><i></i><i></i></div><div class="art-path"></div><div class="art-person"><i></i><b></b></div></div>
            <div class="art-caption"><span>YOUR CONNECTED WORKSPACE</span><b>{{ $steps[$step]['label'] }}</b></div>
            @if($step === 1)<div class="art-keys"><span>W</span><div><span>A</span><span>S</span><span>D</span></div><small>SPACE × 2 · SHIFT · MOUSE</small></div>@endif
            @if($step === 2)<div class="art-hologram"><small>PRIVATE WORKSPACE</small><b>{{ $user->department === 'umum' ? 'PPBJ / PR / SP / SPPH' : 'TOR / PR / TRACKING' }}</b><span>◇ Hologram kerja</span></div>@endif
            @if($step === 3)<div class="art-pill">⌂ Rumah pribadi · Avatar Anda</div>@endif
            @if($step === 4)<div class="art-pill">● Tim online · Undang & bertemu</div>@endif
            @if($step === 5)<div class="art-pill">♫ Musik · Permainan · Bersantai</div>@endif
            @if($step === 6)<div class="art-pill">✓ Ruang Anda siap dijelajahi</div>@endif
        </div>
        <div class="guide-content">
            <div class="step-meta"><span class="eyebrow">{{ $steps[$step]['label'] }}</span><span>{{ sprintf('%02d', $step + 1) }} / {{ sprintf('%02d', count($steps)) }}</span></div>
            <h2 id="step-title">{{ $steps[$step]['title'] }}</h2>
            <p class="guide-description">{{ $steps[$step]['body'] }}</p>
            <div class="guide-tip"><span aria-hidden="true">✦</span><p>{{ $steps[$step]['tip'] }}</p></div>
            @if($errors->any())<p class="guide-error" role="alert">{{ $errors->first() }}</p>@endif
            <div class="guide-actions">
                @if($replay)
                    <a class="secondary" href="{{ route('virtual-office.index') }}">Kembali ke kantor</a>
                    @if($step + 1 < count($steps))<a class="primary" href="{{ route('virtual-office.tutorial.show', ['step' => $step + 1]) }}">Berikutnya <span aria-hidden="true">→</span></a>@endif
                @else
                    <span class="step-saved">{{ $step ? 'Langkah sebelumnya tersimpan' : 'Cukup satu kali untuk akun ini' }}</span>
                    <form method="POST" action="{{ route('virtual-office.tutorial.advance') }}">@csrf<input type="hidden" name="step" value="{{ $step }}"><button type="submit" class="primary">{{ $step + 1 === count($steps) ? 'Selesai & masuk kantor' : 'Saya paham, lanjut' }} <span aria-hidden="true">→</span></button></form>
                @endif
            </div>
            <progress aria-label="Progres membaca tutorial" max="{{ count($steps) }}" value="{{ $replay ? $step + 1 : $step }}">{{ $step }} dari {{ count($steps) }}</progress>
        </div>
    </section>
</main>
<footer class="guide-footer"><span>Ruang digital. Koneksi yang berarti.</span><form action="{{ route('logout') }}" method="POST">@csrf<button type="submit">Keluar akun</button></form></footer>
</body>
</html>
