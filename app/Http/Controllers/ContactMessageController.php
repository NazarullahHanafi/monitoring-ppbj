<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        if ($request->filled('website')) {
            return back()->with('success', 'Pesan berhasil dikirim. Terima kasih sudah menghubungi kami.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'max:5000'],
        ], [
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'subject.required' => 'Subjek wajib diisi.',
            'message.required' => 'Pesan wajib diisi.',
        ]);

        ContactMessage::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);
        Cache::forget('contact_messages_unread_count');

        return back()->with('success', 'Pesan berhasil dikirim. Admin akan menindaklanjuti secepatnya.');
    }

    public function index(Request $request)
    {
        $this->ensureSuperadminUmum();

        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:160'],
            'status' => ['nullable', Rule::in(['unread', 'read'])],
            'page' => ['nullable', 'integer', 'min:1', 'max:1000000'],
        ], [
            'search.string' => 'Kata pencarian harus berupa teks.',
            'search.max' => 'Kata pencarian maksimal 160 karakter.',
            'status.in' => 'Pilih status pesan yang tersedia.',
            'page.integer' => 'Nomor halaman tidak valid.',
            'page.min' => 'Nomor halaman dimulai dari 1.',
            'page.max' => 'Nomor halaman terlalu besar.',
        ]);
        $search = trim($filters['search'] ?? '');
        $status = $filters['status'] ?? '';
        $query = ContactMessage::query()->latest('created_at')->latest('id');

        if ($status === 'unread') {
            $query->whereNull('read_at');
        } elseif ($status === 'read') {
            $query->whereNotNull('read_at');
        }

        if ($search !== '') {
            $pattern = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $search).'%';
            $query->where(function ($q) use ($pattern) {
                foreach (['name', 'email', 'subject', 'message'] as $column) {
                    $q->orWhereRaw($column." LIKE ? ESCAPE '!'", [$pattern]);
                }
            });
        }

        $summary = ContactMessage::query()
            ->selectRaw('COUNT(*) as total, SUM(CASE WHEN read_at IS NULL THEN 1 ELSE 0 END) as unread')
            ->first();
        $stats = [
            'total' => (int) $summary->total,
            'unread' => (int) $summary->unread,
            'read' => (int) $summary->total - (int) $summary->unread,
        ];

        // Without a text search, the summary already contains the exact page total.
        $total = $search === '' ? $stats[match ($status) {
            'read' => 'read', 'unread' => 'unread', default => 'total',
        }] : null;
        $messages = $query->paginate(12, [
            'id', 'name', 'email', 'subject', 'message', 'ip_address', 'created_at', 'read_at',
        ], 'page', null, $total)->withQueryString();

        return view('contact_messages.index', compact('messages', 'stats'));
    }

    // Keep the existing action available while older route caches are replaced.
    public function toggleRead(Request $request, ContactMessage $contactMessage)
    {
        return $this->setRead($request, $contactMessage);
    }

    public function setRead(Request $request, ContactMessage $contactMessage)
    {
        $this->ensureSuperadminUmum();

        // Old open pages do not include the desired status. Refresh gracefully
        // instead of guessing an intent and toggling a potentially newer state.
        if (! $request->has('read')) {
            return back()->with('error', 'Halaman pesan sudah diperbarui. Muat ulang halaman, lalu pilih status pesan kembali.');
        }
        $validated = $request->validate(['read' => ['required', 'boolean']], [
            'read.required' => 'Pilih status pesan yang ingin disimpan.',
            'read.boolean' => 'Status pesan tidak valid. Muat ulang halaman dan coba kembali.',
        ]);
        $read = (bool) $validated['read'];
        $query = ContactMessage::whereKey($contactMessage->id);
        $changed = ($read ? $query->whereNull('read_at') : $query->whereNotNull('read_at'))
            ->update([
                'read_at' => $read ? now() : null,
                'read_by_user_id' => $read ? auth()->id() : null,
            ]);

        if ($changed) {
            Cache::forget('contact_messages_unread_count');
        }

        return back()->with('success', $read ? 'Pesan ditandai sudah dibaca.' : 'Pesan ditandai belum dibaca.');
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $this->ensureSuperadminUmum();

        $contactMessage->delete();
        Cache::forget('contact_messages_unread_count');

        return back()->with('success', 'Pesan contact berhasil dihapus.');
    }

    private function ensureSuperadminUmum(): void
    {
        $user = auth()->user();

        abort_unless(
            $user && $user->role === 'superadmin' && $user->department === 'umum',
            403,
            'Menu ini hanya dapat diakses oleh Superadmin Umum.'
        );
    }
}
