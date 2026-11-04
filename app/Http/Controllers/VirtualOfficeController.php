<?php

namespace App\Http\Controllers;

use App\Services\VirtualOfficePresence;
use Illuminate\Http\Request;

class VirtualOfficeController extends Controller
{
    public function index(Request $request, VirtualOfficePresence $presence)
    {
        $this->authorizeDepartment($request);

        $officeConfig = ['initial' => $presence->snapshot($request->user()),
            'feedUrl' => route('virtual-office.presence', [], false), 'canChat' => ! $request->user()->isReadOnly()];

        return response()->view('virtual-office.index', compact('officeConfig'))
            ->header('Cache-Control', 'private, no-store');
    }

    public function presence(Request $request, VirtualOfficePresence $presence)
    {
        $this->authorizeDepartment($request);

        return response()->json($presence->snapshot($request->user()))->header('Cache-Control', 'private, no-store');
    }

    private function authorizeDepartment(Request $request): void
    {
        abort_unless(in_array($request->user()?->department, ['umum', 'operasional'], true), 403);
    }
}
