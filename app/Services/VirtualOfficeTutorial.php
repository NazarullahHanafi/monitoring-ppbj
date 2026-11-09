<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class VirtualOfficeTutorial
{
    public static function eligible(User $user): bool
    {
        return $user->is_active && in_array($user->department, ['umum', 'operasional'], true);
    }

    public function completed(User $user): bool
    {
        if (Cache::get($this->key($user)) === true) return true;
        $completed = DB::table('virtual_office_tutorials')->where('user_id', $user->id)->whereNotNull('completed_at')->exists();
        if ($completed) Cache::put($this->key($user), true, 86400);
        return $completed;
    }

    public function progress(User $user): ?object
    {
        return DB::table('virtual_office_tutorials')->where('user_id', $user->id)->first();
    }

    public function documentKind(User $user): string
    {
        return $user->isReadOnly() || Cache::get('simonpr:read_only_mode', false) ? 'tracking' : ($user->department === 'umum' ? 'ppbj' : 'pr');
    }

    public function configuration(User $user, bool $requested = false): array
    {
        if (!$requested && !config('virtual_office.tutorial_required')) return ['active' => false];
        $completed = $this->completed($user);
        if ($completed && !$requested) return ['active' => false];
        $row = $this->progress($user);
        $practice = json_decode($row?->practice ?? '{}', true);
        $kind = $this->documentKind($user);
        return ['active' => true, 'replay' => $completed, 'step' => $completed || empty($practice['interactive']) ? 0 : min(6, (int) $row->step),
            'steps' => $this->steps($user), 'documentKind' => $kind,
            'startUrl' => route('virtual-office.tutorial.start', [], false), 'advanceUrl' => route('virtual-office.tutorial.advance', [], false),
            'practiceTool' => ['id' => ['pr' => 'create', 'ppbj' => 'ppbj-create', 'tracking' => 'tracking'][$kind],
                'title' => $kind === 'tracking' ? 'Latihan Tracking PR' : 'Latihan tambah '.strtoupper($kind),
                'description' => 'Coba isi dan validasi contoh, tanpa mengirim dokumen sungguhan.',
                'url' => route('virtual-office.tutorial.document', [], false)]];
    }

    public function start(User $user): array
    {
        DB::transaction(function () use ($user) {
            $now = now();
            DB::table('virtual_office_tutorials')->insertOrIgnore(['user_id' => $user->id, 'step' => 0, 'created_at' => $now, 'updated_at' => $now]);
            $row = DB::table('virtual_office_tutorials')->where('user_id', $user->id)->lockForUpdate()->first();
            if ($row->completed_at) return;
            $practice = json_decode($row->practice ?? '{}', true);
            if (!empty($practice['interactive'])) return;
            $avatar = $this->avatar($user);
            // Resume unfinished reading-only guides at the first practical task.
            // Completed accounts retain their lifetime completion timestamp.
            DB::table('virtual_office_tutorials')->where('user_id', $user->id)->update(['step' => 0, 'practice' => json_encode([
                'interactive' => 1, 'nonce' => (string) Str::uuid(), 'avatar_version' => $avatar['version'], 'avatar_hash' => $avatar['hash'],
            ]), 'updated_at' => $now]);
        }, 3);
        return $this->configuration($user, true);
    }

    public function advance(User $user, int $expected, array $evidence = []): void
    {
        DB::transaction(function () use ($user, $expected, $evidence) {
            $row = DB::table('virtual_office_tutorials')->where('user_id', $user->id)->lockForUpdate()->first();
            abort_unless($row, 409, 'Mulai latihan di Kantor Virtual terlebih dahulu.');
            if ($row->completed_at || $expected < $row->step) return;
            $practice = json_decode($row->practice ?? '{}', true);
            abort_unless(!empty($practice['interactive']) && $expected === (int) $row->step, 409, 'Selesaikan latihan secara berurutan.');
            $id = $this->steps($user)[$expected]['id'];
            $rules = ['event' => ['required', Rule::in([$id])]];
            if ($id === 'move') $rules += ['distance' => ['required', 'numeric', 'between:3,1000'], 'jump' => ['required', 'numeric', 'between:0.25,18']];
            if ($id === 'camera') $rules += ['orbit' => ['required', 'numeric', 'between:0.12,1000'], 'zoom' => ['required', 'numeric', 'between:0.1,1000']];
            if ($id === 'hologram') $rules['opened'] = ['required', 'accepted'];
            Validator::make($evidence, $rules)->validate();
            if (in_array($id, ['control', 'move'], true)) abort_unless(VirtualOfficePilot::current($user->id), 409, 'Aktifkan kendali avatar dan coba lagi.');
            if ($id === 'avatar') {
                $avatar = $this->avatar($user);
                abort_unless($avatar['version'] > $practice['avatar_version'] && $avatar['hash'] !== $practice['avatar_hash'], 422, 'Ubah salah satu pilihan avatar lalu simpan avatar Anda.');
            }
            if ($id === 'document') {
                try { $proof = json_decode(Crypt::decryptString($evidence['token'] ?? ''), true, 512, JSON_THROW_ON_ERROR); }
                catch (\Throwable) { abort(422, 'Selesaikan form latihan di hologram terlebih dahulu.'); }
                abort_unless(($proof['user'] ?? null) === $user->id && ($proof['nonce'] ?? null) === $practice['nonce']
                    && ($proof['kind'] ?? null) === $this->documentKind($user) && ($proof['expires'] ?? 0) >= now()->timestamp, 422, 'Buka dan selesaikan kembali form latihan Anda.');
            }
            $next = $expected + 1;$now = now();
            DB::table('virtual_office_tutorials')->where('user_id', $user->id)->update([
                'step' => $next, 'completed_at' => $next === 7 ? $now : null, 'updated_at' => $now,
            ]);
        }, 3);
        if ($this->progress($user)?->completed_at) Cache::put($this->key($user), true, 86400);
    }

    public function documentProof(User $user): string
    {
        $row = $this->progress($user);$practice = json_decode($row?->practice ?? '{}', true);
        abort_unless($row?->completed_at || (!empty($practice['interactive']) && (int) $row->step === 5), 409, 'Ikuti latihan sampai langkah form dokumen terlebih dahulu.');
        return Crypt::encryptString(json_encode(['user' => $user->id, 'kind' => $this->documentKind($user),
            'nonce' => $practice['nonce'] ?? 'replay', 'expires' => now()->addMinutes(30)->timestamp]));
    }

    private function avatar(User $user): array
    {
        $row = DB::table('virtual_office_profiles')->where('user_id', $user->id)->first();
        $avatar = VirtualOfficeAvatar::sanitize($row?->avatar, $user->gender, $user->id);
        return ['hash' => hash('sha256', json_encode($avatar)), 'version' => (int) ($row?->version ?? 0)];
    }

    private function key(User $user): string { return 'office:tutorial:completed:'.$user->id; }

    public function steps(User $user): array
    {
        $kind = $this->documentKind($user);
        return [
            ['id' => 'control', 'title' => 'Ini avatar Anda. Ayo kendalikan.', 'body' => 'Tekan Mulai praktik. Kamera akan mengikuti avatar Anda di dunia 3D ini.', 'action' => 'Mulai praktik', 'target' => 'voScene'],
            ['id' => 'move', 'title' => 'Jalan, lalu coba melompat.', 'body' => 'Berjalan sedikit dengan W A S D / panah, lalu tekan Space untuk melompat. Di ponsel gunakan tombol gerak dan Lompat. Petunjuk ini mengikuti gerakan avatar Anda.', 'action' => 'Fokus ke avatar', 'target' => 'voScene'],
            ['id' => 'avatar', 'title' => 'Coba penampilan pilihan Anda.', 'body' => 'Buka Avatar & kostum, ubah baju, warna, rambut, bentuk avatar, atau karakter. Lihat pratinjaunya lalu tekan Simpan avatar saya. Perubahan ini berlaku untuk avatar Anda sendiri.', 'action' => 'Ubah avatar saya', 'target' => 'voGameAvatar'],
            ['id' => 'camera', 'title' => 'Temukan sudut yang nyaman.', 'body' => 'Geser mouse di dunia 3D untuk memutar kamera, lalu gulir untuk zoom. Di ponsel, geser dan cubit layar. Tombol + / − juga dapat dipakai untuk zoom.', 'action' => 'Fokus kamera', 'target' => 'voScene'],
            ['id' => 'hologram', 'title' => 'Buka ruang kerja di atas kepala.', 'body' => 'Klik tombol Hologram kerja yang disorot. Proyeksi akan muncul di atas avatar Anda. Selama tutorial, menu dokumen memakai ruang latihan.', 'action' => 'Buka hologram kerja', 'target' => 'voHologramOpen'],
            ['id' => 'document', 'title' => $kind === 'tracking' ? 'Coba menelusuri contoh PR.' : 'Coba tambah '.strtoupper($kind).' melalui hologram.', 'body' => $kind === 'tracking'
                ? 'Pilih Latihan Tracking PR, masukkan nomor contoh, lalu telusuri alurnya. Akun baca tidak diberi izin menambah dokumen.'
                : 'Pilih menu latihan di hologram. Isi form contoh, tekan Validasi & simpan latihan, lihat ringkasannya, lalu kembali ke avatar. Dokumen latihan tidak masuk daftar pengadaan.', 'action' => 'Tampilkan menu latihan', 'target' => 'voHologramTools'],
            ['id' => 'finish', 'title' => 'Anda sudah mencobanya langsung.', 'body' => 'Berjalan, melompat, mengganti avatar, mengatur kamera, dan mencoba hologram sudah selesai. Setelah selesai, menu kerja kembali terhubung ke dokumen asli. Pilih Lihat tutorial kapan saja untuk praktik ulang.', 'action' => 'Selesai & lanjut menjelajah', 'target' => 'voScene'],
        ];
    }
}
