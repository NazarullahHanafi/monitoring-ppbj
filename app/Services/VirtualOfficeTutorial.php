<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

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

    public function advance(User $user, int $expected): void
    {
        DB::transaction(function () use ($user, $expected) {
            $now = now();
            DB::table('virtual_office_tutorials')->insertOrIgnore(['user_id' => $user->id, 'step' => 0, 'created_at' => $now, 'updated_at' => $now]);
            $row = DB::table('virtual_office_tutorials')->where('user_id', $user->id)->lockForUpdate()->first();
            // Repeated clicks, a stale tab, or replay cannot reset completion.
            if ($row->completed_at || $expected < $row->step) return;
            abort_unless($expected === (int) $row->step, 409, 'Selesaikan langkah tutorial secara berurutan.');
            $next = $expected + 1;
            DB::table('virtual_office_tutorials')->where('user_id', $user->id)->update([
                'step' => $next, 'completed_at' => $next === count($this->steps($user)) ? $now : null, 'updated_at' => $now,
            ]);
        }, 3);
        if ($this->progress($user)?->completed_at) Cache::put($this->key($user), true, 86400);
    }

    private function key(User $user): string
    {
        return 'office:tutorial:completed:'.$user->id;
    }

    public function steps(User $user): array
    {
        $readOnly = $user->isReadOnly() || Cache::get('simonpr:read_only_mode', false);
        $work = $user->department === 'operasional'
            ? ['TOR / PR dari ruang Anda', 'Buka Hologram kerja di atas avatar. Pilih Tambah TOR / PR untuk membuat pengajuan, Daftar TOR / PR untuk meninjau dokumen, atau Tracking PR untuk mengikuti prosesnya. Hak akses dan validasi dokumen tetap mengikuti akun Anda.']
            : ['Pengadaan dari ruang Anda', 'Buka Hologram kerja di atas avatar. Bidang Umum dapat menambah PPBJ, membuka daftar PPBJ, Approval PR, SPPH, SP, dan Tracking PR sesuai kewenangannya. Form hologram terhubung ke dokumen yang sama dengan menu utama.'];
        if ($readOnly) $work = ['Ruang kerja untuk akses baca', 'Buka Hologram kerja untuk melihat daftar dokumen dan Tracking PR sesuai bidang Anda. Akun viewer atau mode read-only tidak dapat menambah, mengubah, menyetujui, atau menghapus dokumen.'];
        return [
            ['label' => 'Selamat datang', 'title' => 'Kantor Anda, dalam ruang baru.', 'body' => 'Menu Kantor Virtual ada di navigasi SIMONPR. Di sini Anda dapat bekerja melalui hologram, menemui rekan, dan beristirahat di kawasan virtual. Panduan wajib ini cukup diselesaikan satu kali untuk akun Anda, termasuk jika Anda berganti perangkat.', 'tip' => 'Progres tersimpan setiap kali Anda menekan “Saya paham, lanjut”. Jika terputus, lanjutkan dari langkah terakhir.', 'visual' => 'campus'],
            ['label' => 'Gerak & kamera', 'title' => 'Anda yang memegang kendali.', 'body' => 'Pilih Kendali → Kendalikan avatar. Gunakan W A S D atau tombol panah untuk berjalan, Shift untuk berlari, dan Space untuk lompat; tekan lagi untuk lompat kedua. Geser mouse untuk memutar kamera, gulir atau tombol + / − untuk zoom. Tombol rumah pada kamera mengembalikan sudut awal.', 'tip' => 'Aktifkan Game penuh untuk layar penuh. Panel Kendali, Tim, dan Informasi bisa dibuka atau ditutup. Di ponsel, gunakan tombol sentuh. Tembok dan perabot tetap membatasi gerak avatar.', 'visual' => 'controls'],
            ['label' => 'Hologram kerja', 'title' => $work[0], 'body' => $work[1], 'tip' => 'Isi dokumen hanya terlihat oleh Anda. Simpan perubahan sebelum menutup atau berganti halaman; membuka hologram tidak memberi hak akses tambahan.', 'visual' => 'hologram'],
            ['label' => 'Avatar & rumah', 'title' => 'Ruang pribadi, milik Anda.', 'body' => 'Buka Avatar & kostum untuk menyesuaikan avatar sendiri. Gunakan Rumah saya untuk mencari lokasi rumah, berjalan ke pintu, lalu pilih Buka pintu. Berjalan masuk untuk melihat interior; untuk keluar, kembali ke pintu. Jika pintu tertutup, buka kembali melalui panel Kendali.', 'tip' => 'Anda hanya dapat menyesuaikan avatar sendiri dan membuka pintu rumah sendiri. Aktivitas tidur atau rekreasi avatar offline merupakan ilustrasi, bukan aktivitas nyata atau penilaian kinerja.', 'visual' => 'home'],
            ['label' => 'Rekan & percakapan', 'title' => 'Temui orangnya, mulai ceritanya.', 'body' => 'Buka Tim untuk mencari rekan, atau klik avatarnya. Untuk percakapan langsung, undang rekan yang sedang online dan tunggu persetujuannya. Pesan dikirim setelah kedua avatar bertemu; percakapan dan gelembung pesan mengikuti sesi tersebut.', 'tip' => $user->isReadOnly() ? 'Akun viewer dapat melihat kehadiran tim. Percakapan dan aksi interaktif mengikuti pembatasan akses baca.' : 'Anda dapat mengatur berbagi aktivitas pada pengaturan avatar. Status dan menu rekan mengikuti pengaturan privasinya; pesan langsung hanya untuk kedua peserta.', 'visual' => 'people'],
            ['label' => 'Rehat & fasilitas', 'title' => 'Sediakan waktu untuk rehat.', 'body' => 'Berjalan ke papan permainan lalu klik atau tekan E untuk berinteraksi. Permainan berpasangan memerlukan ajakan dan persetujuan rekan online. Buka Informasi untuk bar & restoran, musik, pilihan bersantai, serta mode grafis Hemat jika perangkat terasa berat.', 'tip' => $readOnly ? 'Pembelian dan permainan yang mengubah data tidak tersedia dalam akses baca. Anda tetap dapat menjelajahi kawasan sesuai izin akun.' : 'Saldo, menu makanan, senjata, dan permainan adalah bagian dari simulasi virtual. Periksa harga sebelum membeli. Untuk bersantai, datang ke tempatnya, pilih pose, lalu tekan Bersantai.', 'visual' => 'leisure'],
            ['label' => 'Siap menjelajah', 'title' => 'Semua siap. Selamat datang.', 'body' => 'Setelah menekan tombol selesai, Anda langsung masuk ke Kantor Virtual. Panduan wajib tidak akan muncul lagi untuk akun ini. Kapan pun diperlukan, pilih Lihat tutorial di navigasi atau Tutorial dalam game untuk membacanya kembali.', 'tip' => VirtualOfficeWorld::canConfigure($user) ? 'Sebagai Super Admin bidang Umum, Anda juga dapat membuka Informasi → Atur kawasan untuk mengelola tema dan cuaca. Pengguna lain tidak memiliki izin ini.' : 'Gunakan menu utama SIMONPR kapan pun Anda ingin kembali bekerja. Ketika pindah ke menu kerja, avatar akan mengikuti status aplikasi.', 'visual' => 'ready'],
        ];
    }
}
