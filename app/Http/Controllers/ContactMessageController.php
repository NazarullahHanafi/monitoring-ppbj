<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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

        $query = ContactMessage::query()->latest();

        if ($request->filled('status')) {
            if ($request->status === 'unread') {
                $query->whereNull('read_at');
            } elseif ($request->status === 'read') {
                $query->whereNotNull('read_at');
            }
        }

        if ($request->filled('search')) {
            $search = trim((string) $request->search);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $messages = $query->paginate(12)->withQueryString();

        $stats = [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::whereNull('read_at')->count(),
            'read' => ContactMessage::whereNotNull('read_at')->count(),
        ];

        return view('contact_messages.index', compact('messages', 'stats'));
    }

    public function toggleRead(ContactMessage $contactMessage)
    {
        $this->ensureSuperadminUmum();

        if ($contactMessage->read_at) {
            $contactMessage->forceFill([
                'read_at' => null,
                'read_by_user_id' => null,
            ])->save();
            Cache::forget('contact_messages_unread_count');

            return back()->with('success', 'Pesan ditandai belum dibaca.');
        }

        $contactMessage->forceFill([
            'read_at' => now(),
            'read_by_user_id' => auth()->id(),
        ])->save();
        Cache::forget('contact_messages_unread_count');

        return back()->with('success', 'Pesan ditandai sudah dibaca.');
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
